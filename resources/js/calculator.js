import {add, subtract, multiply, divide} from "./math.js";

function styleButtons() {
    let buttons = document.querySelectorAll("button");
    for(const button of buttons) {
        if(button.textContent.length <= 3) {
            button.style.fontSize = "150%";
        }
    }
}

function operate(num1, operator, num2) {
    let result;
    switch(operator) {
        case '+':
            result = add(num1, num2);
        break;
        case '-':
            result = subtract(num1, num2);
        break;
        case '*':
            result = multiply(num1, num2);
        break;
        case '/':
            result = divide(num1, num2);
        break;
        default:
            result = "#INVALID";
    }
    return result;
}

styleButtons();