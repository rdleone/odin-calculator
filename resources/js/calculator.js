import {add, subtract, multiply, divide} from "./math.js";
const OPERATORS = ["+", "-", "x", "÷"];

function enableButtons() {
    let buttons = document.querySelectorAll("button");
    for(const button of buttons) {

        button.addEventListener("click", (event) => {
            updateDisplay(button.textContent);
        })

        // Make short text larger
        if(button.textContent.length <= 3) {
            button.style.fontSize = "150%";
        }
    }
}

function updateDisplay(text) {
    const display = document.querySelector(".calculator-display");
    if(display.textContent.charAt(0) === "#") {
        clear();
    }
    switch(text) {
        case "CLEAR":
            clear();
        break;
        case "ENTER":
            let parts = display.textContent.split("");
            let expr = combineNumbers(parts);
            display.textContent = evaluateExpression(expr);
        break;
        default:
            if(display.textContent.length < 10)  {
                display.textContent = display.textContent + text;
            }
    }
}

function clear() {
    const display = document.querySelector(".calculator-display");
    display.textContent = "";
}

function combineNumbers(expr) {
    let newExpr = expr;
    for(let i = 0; i < newExpr.length - 1; i++) {
        let j = i + 1;
        while(newExpr[i].match(/[0-9]/g) && j < newExpr.length && newExpr[j].match(/[0-9]/g)) {
            newExpr[i] = newExpr[i] + newExpr[j];
            newExpr[j] = null;
            newExpr = newExpr.filter((val) => {
                return val !== null;
            });
        }
    }

    return newExpr;
}

function evaluateExpression(expr) {
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

// function evaluateExpression(expr) {
//     // Base case
//     if(expr.length <= 3) {
//         try {
//             return operate(parseFloat(expr[0]), expr[1], parseFloat(expr[2]));
//         } catch(error) {
//             console.log(error);
//             return ("#INVALID");
//         }
//     }

//     return evaluateExpression(expr.slice(0, expr.length - 2));
// }

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

enableButtons();