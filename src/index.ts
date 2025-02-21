import "./game.css";
import { setPeg, unsetPeg, setSelected, colors } from "./helpers";

const game = document.getElementById("game") as HTMLDivElement;
const rows: HTMLDivElement[] = [];
const pegs: HTMLDivElement[][] = [];
const results: HTMLDivElement[][] = [];

let currentRow = 11;
let currentPeg = 0;

for (let i = 0; i < 12; i++) {
  const row = document.createElement("div");
  rows.push(row);
  row.classList.add("row");
  row.classList.add("pegs");

  const rowPegs: HTMLDivElement[] = [];
  pegs.push(rowPegs);
  for (let j = 0; j < 4; j++) {
    const cell = document.createElement("div");
    rowPegs.push(cell);
    cell.classList.add("peg");
    row.appendChild(cell);
  }

  const resultCell = document.createElement("div");
  resultCell.classList.add("results");

  const rowResults: HTMLDivElement[] = [];
  results.push(rowResults);
  for (let j = 0; j < 4; j++) {
    const result = document.createElement("div");
    rowResults.push(result);
    result.classList.add("result");
    result.classList.add("white");
    resultCell.appendChild(result);
  }

  row.appendChild(resultCell);

  game.appendChild(row);
}

const colorPicker = document.createElement("div");
colorPicker.classList.add("pegs");
colorPicker.classList.add("color-picker");
for (const color of colors) {
  const colorCell = document.createElement("div");
  colorCell.classList.add("peg");
  colorCell.classList.add(color);
  colorCell.addEventListener("click", () => {
    setPeg(pegs[currentRow][currentPeg], color);
    if (currentPeg !== 4) {
      currentPeg++;
      setSelected(pegs[currentRow][currentPeg]); // select the next peg
    }
  });
  colorPicker.appendChild(colorCell);
}

const back = document.createElement("div");
back.classList.add("button");
back.innerHTML = "<span>🔙</span>";
back.addEventListener("click", () => {
  if (currentPeg !== 0) {
    currentPeg--;
    unsetPeg(pegs[currentRow][currentPeg]);
    setSelected(pegs[currentRow][currentPeg]); // select the previous peg
  }
});
colorPicker.appendChild(back);
const ok = document.createElement("div");
ok.classList.add("button");
ok.innerHTML = "<span>✔️</span>";
ok.addEventListener("click", () => {
  if (currentPeg === 4) {
    currentRow = (currentRow - 1 + 12) % 12;
    currentPeg = 0;
    colorPicker.style.top = rows[currentRow].offsetTop + "px";
    setSelected(pegs[currentRow][currentPeg]); // select the next peg
  }
});
colorPicker.appendChild(ok);

colorPicker.style.top = rows[currentRow].offsetTop + "px";
colorPicker.style.left = (rows[currentRow].offsetLeft + rows[currentRow].offsetWidth + 20) + "px";

document.getElementById("app")!.appendChild(colorPicker);

// select the first peg
setSelected(pegs[currentRow][currentPeg]);