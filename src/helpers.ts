import { colors } from './settings';

/**
 * Sets the peg as selected by updating its class list.
 * @param peg - The HTMLDivElement representing the peg.
 */
export function setSelected(peg: HTMLDivElement | null) {
  document.querySelectorAll('.selected').forEach((peg) => {
    peg.classList.remove('selected');
  });
  if (peg) {
    peg.classList.add('selected');
  }
}

/**
 * Gets the color of the peg by checking its class list.
 * @param peg - The HTMLDivElement representing the peg.
 * @returns The color of the peg.
 */
export function getColor(peg: HTMLDivElement): string {
  for (const color of colors) {
    if (peg.classList.contains(color)) {
      return color;
    }
  }
  return '';
}

/**
 * Makes the results for the given colors and solution.
 * @param givenColors - The colors that are given.
 * @param solution - The solution colors.
 * @returns The results for the given colors.
 */
export function makeResults(givenColors: string[], solution: string[]) {
  const results: string[] = [];

  for (let i = 0; i < 4; i++) {
    if (givenColors[i] === solution[i]) {
      results.push('green');
    } else {
      for (let j = 0; j < 4; j++) {
        if (givenColors[i] === solution[j]) {
          results.push('yellow');
          break;
        } else if (j === 3) {
          results.push('red');
        }
      }
    }
  }
  results.sort((a, b) => a.localeCompare(b));

  return results;
}

/**
 * The dialog for displaying messages to the user.
 * Use dialog.open(heading, message) to show the dialog.
 * Use dialog.close() to hide the dialog.
 */
export const dialog = {
  dialog: document.getElementById('dialog') as HTMLDialogElement,
  heading: document.querySelector('#dialog h1') as HTMLHeadingElement,
  message: document.querySelector('#dialog p') as HTMLParagraphElement,
  closeButton: document.querySelector('#dialog .close') as HTMLButtonElement,
  open: function (heading: string, message: string) {
    this.heading.textContent = heading;
    this.message.textContent = message;
    this.dialog.classList.add('open');
    console.log('Dialog opened: ', heading, message);
  },
  close: function () {
    this.dialog.classList.remove('open');
  },
};

dialog.closeButton?.addEventListener('click', () => {
  dialog.close();
});
