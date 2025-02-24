import "./game.css";
import { setPeg, unsetPeg, setSelected, colors, getColor, makeResults, setResults } from "./helpers";

const game = document.getElementById("game") as HTMLDivElement;
const rows: HTMLDivElement[] = [];
const pegs: HTMLDivElement[][] = [];
const results: HTMLDivElement[][] = [];

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

const solution: string[] = [];
for (let i = 0; i < 4; i++) {
  solution.push(colors[Math.floor(Math.random() * colors.length)]);
}
console.log("The solution is: ", solution);

let currentRow = 11;
let currentPeg = 0;

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
    const result = makeResults(pegs[currentRow].map(getColor), solution)
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
});
colorPicker.appendChild(ok);

colorPicker.style.top = rows[currentRow].offsetTop + "px";
colorPicker.style.left = (rows[currentRow].offsetLeft + rows[currentRow].offsetWidth + 20) + "px";

document.getElementById("app")!.appendChild(colorPicker);

// select the first peg
setSelected(pegs[currentRow][currentPeg]);

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
      back.dispatchEvent(new MouseEvent("click"));
      break;
    case "Enter":
      ok.dispatchEvent(new MouseEvent("click"));
      break;
    case "Escape":
      dialog.close();
      break;  
  }
});
