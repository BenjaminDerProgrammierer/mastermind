// Status 2025-07-04; (Felix, Maximilian, Philipp) Felix, (anderer) Philipp, Raphael
import './style.css';
import { colors } from './settings';
import { dialog, getColor, makeResults, setSelected } from './helpers';

const game = document.getElementById('game') as HTMLDivElement;

const pegs: HTMLDivElement[][] = [];
const results: HTMLDivElement[][] = [];

let currentRow = 11;
let currentCell = 0;

// Generate random solution sequence
const solution: string[] = [];

for (let i = 0; i < 4; i++) {
  let numColors = colors.length;
  let randomNumber = Math.floor(Math.random() * numColors);
  let randomColor = colors[randomNumber];
  solution.push(randomColor);
}

console.log('Lösung: ' + solution.join(', '));

// Build the game board
const rows: HTMLDivElement[] = [];

for (let i = 0; i < 12; i++) {
  const row = document.createElement('div');
  row.classList.add('row', 'pegs');
  rows.push(row);

  // 4 game pegs
  const rowPegs: HTMLDivElement[] = [];
  for (let j = 0; j < 4; j++) {
    const rowPeg = document.createElement('div');
    rowPeg.classList.add('peg');
    rowPegs.push(rowPeg);
    row.appendChild(rowPeg);
  }
  pegs.push(rowPegs);

  // 4 result cells
  const resultCell = document.createElement('div');
  resultCell.classList.add('results');

  const rowResults: HTMLDivElement[] = [];
  for (let j = 0; j < 4; j++) {
    const rowResult = document.createElement('div');
    rowResult.classList.add('result', 'white');
    rowResults.push(rowResult);
    resultCell.appendChild(rowResult);
  }
  results.push(rowResults);
  row.appendChild(resultCell);

  game.appendChild(row);
}

const colorPicker = document.createElement('div');
colorPicker.classList.add('pegs', 'color-picker');
// colors
for (const color of colors) {
  const colorCell = document.createElement('div');
  colorCell.classList.add('peg', color);
  colorCell.onclick = () => {
    let peg = pegs[currentRow][currentCell];
    peg.classList.remove(...colors);
    peg.classList.add(color);
    if (currentCell < 4) {
      currentCell++;
      setSelected(pegs[currentRow][currentCell]);
    } else {
      setSelected(null);
    }
  };
  colorPicker.appendChild(colorCell);
}

// buttons
const back = document.createElement('div');
back.classList.add('button');
back.innerHTML = '<span>⬅️</span>';
back.onclick = () => {
  if (currentCell != 0) {
    currentCell--;
    let peg = pegs[currentRow][currentCell];
    peg.classList.remove(...colors);
    setSelected(peg);
  }
};
colorPicker.appendChild(back);

const next = document.createElement('div');
next.classList.add('button');
next.innerHTML = '<span>☑️</span>';
next.onclick = () => {
  if (currentCell == 4) {
    const result = makeResults(pegs[currentRow].map(getColor), solution);
    const colorPicker = document.querySelector(
      '.color-picker'
    ) as HTMLDivElement;

    results[currentRow].forEach((element, index) => {
      const color = result[index];
      if (color) {
        element.classList.remove(...colors);
        element.classList.add(color);
      }
    });

    if (result.every((color) => color === 'green')) {
      colorPicker.style.display = 'none';
      setSelected(null);
      dialog.open(
        'You win!',
        'Congratulations! You have won the game. You needed ' +
          (11 - currentRow + 1) +
          ' guesses to solve the puzzle.'
      );
    } else if (currentRow == 0) {
      colorPicker.style.display = 'none';
      setSelected(null);
      dialog.open(
        'Game over!',
        'You have run out of guesses. The solution was ' + solution.join(', ')
      );
    } else {
      currentRow--;
      currentCell = 0;
      updateOffset();
      setSelected(pegs[currentRow][currentCell]);
    }
  }
};
colorPicker.appendChild(next);

document.getElementById('app')!.appendChild(colorPicker);

function updateOffset() {
  colorPicker.style.top = rows[currentRow].offsetTop + 2 + 'px';
  colorPicker.style.left =
    rows[currentRow].offsetLeft + rows[currentRow].offsetWidth + 10 + 'px';
}
window.onresize = updateOffset;
updateOffset();

setSelected(pegs[currentRow][currentCell]);

// Keybinds
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
      document
        .querySelector(`.color-picker > *:nth-child(${event.key})`)
        ?.dispatchEvent(new MouseEvent('click'));
      break;
    case 'Backspace':
      document
        .querySelectorAll('.button')[0]
        .dispatchEvent(new MouseEvent('click'));
      break;
    case 'Enter':
      document
        .querySelectorAll('.button')[1]
        .dispatchEvent(new MouseEvent('click'));
      break;
    case 'Escape':
      dialog.close();
      break;
  }
});
