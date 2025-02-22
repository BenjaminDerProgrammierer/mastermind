/**
 * The colors that are available for the pegs.
 */
export const colors = ["red", "blue", "green", "yellow", "white", "black"];

/**
 * Sets the color of the peg by updating its class list.
 * @param peg - The HTMLDivElement representing the peg.
 * @param color - The color to set for the peg.
 */
export function setPeg(peg: HTMLDivElement, color: string) {
    unsetPeg(peg);
    peg.classList.add(color);
}

/**
 * Sets the peg as selected by updating its class list.
 * @param peg - The HTMLDivElement representing the peg.
 */
export function setSelected(peg: HTMLDivElement) {
    document.querySelectorAll(".selected").forEach((peg) => {
        peg.classList.remove("selected");
    });
    peg.classList.add("selected");
}

/**
 * Unsets the color of the peg by removing all colors from its class list.
 * @param peg - The HTMLDivElement representing the peg.
 */
export function unsetPeg(peg: HTMLDivElement) {
    peg.classList.remove(...colors);
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
    return "";
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
            results.push("green");
        } else {
            for (let j = 0; j < 4; j++) {
                if (givenColors[i] === solution[j]) {
                    results.push("yellow");
                    break;
                } else if (j === 3) {
                    results.push("red");
                }
            }
        }
    }
    results.sort();

    return results;
}

/**
 * Sets the results for the result elements and colors.
 * @param resultElements - The HTMLDivElement representing the results.
 * @param colors - The colors to set for the results.
 */
export function setResults(resultElements: HTMLDivElement[], colors: string[]) {
    resultElements.forEach((element, index) => {
        const color = colors[index];
        if (color) {
            setPeg(element, color);
        }
    });
}
