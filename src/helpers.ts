/**
 * The colors that are available for the pegs.
 */
export const colors = ["red", "blue", "green", "yellow", "white", "black"];

/**
 * Sets the color of the peg by updating its class list.
 * @param peg - The HTMLDivElement representing the peg.
 * @param color - The color to set for the peg.
 * @example
 * for (const row of pegs) {
 *   for (const peg of row) {
 *     setPeg(peg, "red");
 *   }
 * }
 */
export function setPeg(peg: HTMLDivElement, color: string) {
    unsetPeg(peg);
    peg.classList.add(color);
}

export function setSelected(peg: HTMLDivElement) {
    document.querySelectorAll(".selected").forEach((peg) => {
        peg.classList.remove("selected");
    });
    peg.classList.add("selected");
}

export function unsetPeg(peg: HTMLDivElement) {
    peg.classList.remove(...colors);
}