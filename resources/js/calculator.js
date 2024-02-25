import {add, subtract, multiply, divide} from "./math.js";

const MAX_LEN = 10;

/**
 * Attach the event listeners to all buttons
 * relevant to calculator functionality.
 */
function enableCalculator() {
    // Activate UI buttons
    let buttons = document.querySelectorAll("button");
    for(const button of buttons) {

        button.addEventListener("click", (event) => {
            updateDisplay(button.textContent);
        });

        // Make short text larger
        if(button.textContent.length <= 3) {
            button.style.fontSize = "150%";
        }
    }

    // Activate keyboard support
    document.addEventListener("keydown", (event) => {
        if(event.key.match(/[0-9]|\.|\+|\-|x/g)) {
            updateDisplay(event.key);
        } else {
            switch(event.key) {
                case "*":
                    updateDisplay("x");
                break;
                case "/":
                    updateDisplay("÷");
                break;
                case "Enter":
                    updateDisplay("ENTER");
                break;
                case "Backspace":
                    back();
                break;
                case "Escape":
                    clear();
                break;
            }
        }
    });
}

/**
 * Update the calculator display based on the user's
 * input on the calculator.
 * @param {string} text The text attached to the calculator input.
 */
function updateDisplay(text) {
    const display = document.querySelector(".calculator-display");
    if(display.textContent.charAt(0) === "#") {
        clear();
    }
    switch(text) {
        case "(-)":
            display.textContent = display.textContent + "-";
        break;
        case "CLEAR":
            clear();
        break;
        case "BACK":
            back();
        break;
        case "ENTER":
            let parts = display.textContent.split("");
            let expr = combineNumbers(parts);
            display.textContent = evaluateExpression(expr);
        break;
        default:
            if(display.textContent.length < MAX_LEN)  {
                display.textContent = display.textContent + text;
            }
    }
}

/**
 * Clear the text in the calculator display.
 */
function clear() {
    const display = document.querySelector(".calculator-display");
    display.textContent = "";
}

/**
 * Remove the last character in the calculator display.
 */
function back() {
    const display = document.querySelector(".calculator-display");
    const text = display.textContent;
    display.textContent = text === "#INVALID" ? "" : text.substring(0, text.length - 1);
}

/**
 * Combine all consecutive digits in the given expression
 * into one number. Also attaches negatives and decimals.
 * @param {array} expr The full expression in the calculator display.
 * @returns The expression after combination.
 */
function combineNumbers(expr) {
    let newExpr = [...expr];
    for(let i = 0; i < newExpr.length - 1; i++) {
        let j = i + 1;
        let hasDecimal = false; let isNegative = false;

        if(newExpr[i] == "-") {
            isNegative = i === 0 ? checkNegative([null].concat(newExpr.slice(0,2))) : 
                checkNegative(newExpr.slice(i-1,i+2));
            if(isNegative) {
                // Combine negative number and shorten the array
                newExpr[i+1] = newExpr[i] + newExpr[i+1];
                newExpr[i] = null;
                newExpr = newExpr.filter((val) => {
                    return val !== null;
                });
                // i--; j--;
            }
        }
        
        while(newExpr[i].match(/\-?[0-9]|\./g) && j < newExpr.length && newExpr[j].match(/[0-9]|\./g)) {

            if(newExpr[j] === ".") {
                if(hasDecimal) {
                    return "#INVALID";
                } else {
                    hasDecimal = true;
                }
            }

            // Combine the numbers and shorten the array
            newExpr[i] = newExpr[i] + newExpr[j];
            newExpr[j] = null;
            newExpr = newExpr.filter((val) => {
                return val !== null;
            });
        }
    }

    return newExpr;
}

/**
 * Determines if a minus sign in an expression is meant to
 * represent a negative number instead of subtraction.
 * @param {array} expr A slice of the expression in the calculator display.
 * @returns true if the minus sign represents a negative number, else false
 */
function checkNegative(expr) {
    return (expr[2].match(/[0-9]/g) !== null && expr[1] == "-" &&
        (expr[0] === null || (expr[0] !== null && expr[0].match(/\+|\-$|x|÷/g) !== null)));
}

/**
 * Parse the mathematical expression and perform each operation left-to-right.
 * @param {array} expr The full expression in the calculator display
 * @returns A number for a valid operation, else an error message.
 */
function evaluateExpression(expr) {
    if(expr === "#INVALID") return expr;
    try {
        while(expr.length >= 3) {
            let res = operate(parseFloat(expr[0]), expr[1], parseFloat(expr[2]));
            expr[2] = res;
            expr.shift();
            expr.shift();
        }
        if(expr.length != 1) {
            throw new Error("#INVALID");
        }
        return expr[0];
    } catch(error) {
        console.log(error);
        return "#INVALID";
    }
}

/**
 * Perform a mathematical operation given two numbers and an operator.
 * @param {float} num1 
 * @param {char} operator 
 * @param {float} num2 
 * @returns The result of the operation if it is valid, else an error message.
 */
function operate(num1, operator, num2) {
    let result;
    switch(operator) {
        case '+':
            result = add(num1, num2);
        break;
        case '-':
            result = subtract(num1, num2);
        break;
        case 'x':
            result = multiply(num1, num2);
        break;
        case '÷':
            if(num2 === 0) return "#DIV BY 0";
            result = divide(num1, num2);
        break;
        default:
            throw new Error("#INVALID");
    }
    return isNaN(result) ? "#INVALID" : result;
}

enableCalculator();