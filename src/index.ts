// Stage -1: Game board with color picker and dialog
import "./game.css";

const game = document.getElementById("game") as HTMLDivElement;
const rows: HTMLDivElement[] = [];
const pegs: HTMLDivElement[][] = [];
const results: HTMLDivElement[][] = [];
const colors = ["red", "blue", "green", "yellow", "white", "black"];

const dialog = {
  dialog: document.getElementById("dialog") as HTMLDialogElement,
  heading: document.querySelector("#dialog h1") as HTMLHeadingElement,
  message: document.querySelector("#dialog p") as HTMLParagraphElement,
  closeButton: document.querySelector("#dialog .close") as HTMLButtonElement,
  open: function(heading: string, message: string) {
    this.heading.textContent = heading;
    this.message.textContent = message;
    this.dialog.classList.add("open");
  },
  close: function() {
    this.dialog.classList.remove("open");
  }
}

dialog.closeButton?.addEventListener("click", () => {
  dialog.close();
});

let currentRow = 11;

for (let i = 0; i < 12; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("pegs");
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
    result.classList.add("result");
    result.classList.add("white");
    resultCell.appendChild(result);
  }
  results.push(rowResults);
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
  colorPicker.appendChild(colorCell);
}

const back = document.createElement("div");
back.classList.add("button");
back.innerHTML = "<span>🔙</span>";
colorPicker.appendChild(back);

const ok = document.createElement("div");
ok.classList.add("button");
ok.innerHTML = "<span>✔️</span>";
colorPicker.appendChild(ok);

function adjustColorPickerPosition() {
  colorPicker.style.top = rows[currentRow].offsetTop + "px";
  colorPicker.style.left = (rows[currentRow].offsetLeft + rows[currentRow].offsetWidth + 20) + "px";
}
window.addEventListener("resize", adjustColorPickerPosition);
adjustColorPickerPosition();

document.getElementById("app")!.appendChild(colorPicker);
