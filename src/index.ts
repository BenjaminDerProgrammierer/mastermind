import "./game.css";
import { setPeg, unsetPeg, getColor, setSelected, makeResults, setResults, dialog, createBackButton, createNextButton } from "./helpers";
export const colors = ["red", "blue", "green", "yellow", "white", "black"];

const game = document.getElementById("game") as HTMLDivElement;
const rows: HTMLDivElement[] = [];
const pegs: HTMLDivElement[][] = [];
const results: HTMLDivElement[][] = [];
const solution: string[] = [];

// status variables
let currentRow = 11;
let currentPeg = 0;

function createGame() {
  if (document.getElementsByClassName("row").length !== 0) return; 
  // Create the solution
  for (let i = 0; i < 4; i++) {
    solution.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  console.log("The solution is: ", solution);

  // Create the game board
  for (let i = 0; i < 12; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "pegs");
    rows.push(row);

    const rowPegs: HTMLDivElement[] = [];
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("div");
      rowPegs.push(cell);
      cell.classList.add("peg");
      row.appendChild(cell);
    }
    pegs.push(rowPegs);

    const resultCell = document.createElement("div");
    resultCell.classList.add("results");

    const rowResults: HTMLDivElement[] = [];
    for (let j = 0; j < 4; j++) {
      const result = document.createElement("div");
      rowResults.push(result);
      result.classList.add("result", "white");
      resultCell.appendChild(result);
    }
    results.push(rowResults);
    row.appendChild(resultCell);

    game.appendChild(row);
  }

  // color picker
  const colorPicker = document.createElement("div");
  colorPicker.classList.add("pegs");
  colorPicker.classList.add("color-picker");
  for (const color of colors) {
    const colorCell = document.createElement("div");
    colorCell.classList.add("peg");
    colorCell.classList.add(color);
    colorCell.addEventListener("click", () => {
      setPeg(pegs[currentRow][currentPeg], color);
      if (currentPeg < 4) {
        currentPeg++;
      }
      if (currentPeg < 4) {
        setSelected(pegs[currentRow][currentPeg]); // select the next peg
      } else {
        setSelected(null);
      }
    });
    colorPicker.appendChild(colorCell);
  }

  colorPicker.appendChild(createBackButton());
  colorPicker.appendChild(createNextButton());

  document.getElementById("app")!.appendChild(colorPicker);

  function adjustColorPickerPosition() {
    colorPicker.style.top = rows[currentRow].offsetTop + "px";
    colorPicker.style.left = (rows[currentRow].offsetLeft + rows[currentRow].offsetWidth + 20) + "px";
  }
  window.addEventListener("resize", adjustColorPickerPosition);
  adjustColorPickerPosition();

  // select the first peg
  setSelected(pegs[currentRow][currentPeg]);
}

createGame();

export function okClick() {
  if (currentPeg === 4) {
    const result = makeResults(pegs[currentRow].map(getColor), solution)
    const colorPicker = document.querySelector(".color-picker") as HTMLDivElement;
    setResults(results[currentRow], result)
    if (result.every(color => color === "green")) {
      colorPicker.style.display = "none";
      setSelected(null);
      dialog.open("You win!", "Congratulations! You have won the game. You needed " + (11 - currentRow + 1) + " guesses to solve the puzzle.");
    } else if (currentRow > 0) {
      currentRow = (currentRow - 1 + 12) % 12;
      currentPeg = 0;
      colorPicker.style.top = rows[currentRow].offsetTop + "px";
      setSelected(pegs[currentRow][currentPeg]); // select the next peg
    } else {
      colorPicker.style.display = "none";
      dialog.open("Game over!", "You have run out of guesses. The solution was " + solution.join(", "));
    }
  }

}

export function backClick() {
  if (currentPeg !== 0) {
    currentPeg--;
    unsetPeg(pegs[currentRow][currentPeg]);
    setSelected(pegs[currentRow][currentPeg]); // select the previous peg
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
      document.querySelector(`.color-picker > *:nth-child(${event.key})`)?.dispatchEvent(new MouseEvent("click"));
      break;
    case "Backspace":
      backClick();
      break;
    case "Enter":
      okClick();
      break;
    case "Escape":
      dialog.close();
      break;
  }
});
