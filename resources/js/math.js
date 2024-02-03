const MAX_NUM_LEN = 9;

export function add(x, y) {
    return x + y;
}

export function subtract(x, y) {
    return x - y;
}

export function multiply(x, y) {
    return x * y;
}

export function divide(x, y) {
    if(y === 0) return "#DIV BY 0";
    const quotient = x / y;
    return quotient.toString().length > MAX_NUM_LEN 
        ? roundFloat(quotient) : quotient;
}

/**
 * Rounds a float so that it fits properly in the calculator display.
 * @param {number} x - A valid float
 * @returns float
 */
function roundFloat(x) {
    const parts = x.toString().split(".");
    return parseFloat(x.toFixed(MAX_NUM_LEN - parts[0].length));
}