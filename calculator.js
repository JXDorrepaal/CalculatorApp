/* Basic calculator app

    Calculator specifications:
    Create a calculator for the browser, with the restriction that no calculations may take place in the browser.
    Calculations must be done on the server. 
    JavaScript, C#(or some other object oriented language are allowed to be used.
    It must be responsive, so it should work well on both mobile and desktop. */

class CalculatorApp {
    constructor(firstInputText, secondInputText) {
        this.firstInputText = firstInputText;
        this.secondInputText = secondInputText;
        this.clearInput();
    }

    // clears the output display of all input
    clearInput() {
        this.firstInput = '';
        this.secondInput = '';
        this.operators = undefined;
    }

    // deletes the last input
    deleteInput() {
        this.secondInput = this.secondInput.toString().slice(0, -1);
    }

    // appends input to output display each time user clicks a number button
    appendInput(input) {
        // prevents multiple decimals to be added to output display
        if (input === '.' && this.secondInput.includes('.')) return;
        // need to convert to string otherwise values will be added rather than appended
        this.secondInput = this.secondInput.toString() + input.toString();
    }

    // adds operator to output display
    AppendOperators(operators) {
        if (this.secondInput === '') return;
        if (this.firstInput !== '') {
            this.calculate();
        }
        this.operators = operators;
        this.firstInput = this.secondInput;
        this.secondInput = '';
    }

    // calculates user input
    calculate() {
        let calculate;
        // parseFloat parses a string argument and returns a floating point number
        const first = parseFloat(this.firstInput);
        const second = parseFloat(this.secondInput);
        // if prevents code from running if user clicks equals without input
        if (isNaN(first) || isNaN(second)) return;
        switch (this.operators) {
            case '/':
                calculate = first / second;
                break;
            case 'x':
                calculate = first * second;
                break;
            case '-':
                calculate = first - second;
                break;
            case '+':
                calculate = first + second;
                break;
            default:
                return;
        }
        this.secondInput = calculate;
        this.firstInput = '';
        this.operators = undefined;
    }

    // updates the output display
    updateOutput() {
        this.secondInputText.innerText =
            this.outputInput(this.secondInput);
        // displays first value if no operator is chosen
        if (this.operators != null) {
            this.firstInputText.innerText =
                // displays value and operator to upper output display
                `${this.outputInput(this.firstInput)} ${this.operators}`;
        } else {
            this.firstInputText.innerText = '';
        }
    }

    // returns input and converts to display value
    outputInput(input) {
        const floatValue = parseFloat(input);
        if (isNaN(floatValue)) return '';
        // adds coma's to numbers
        return floatValue.toLocaleString('en');
    }
}

// querySelectorAll gets that all elements match data- attribute
const numbersButtons = document.querySelectorAll('[data-numbers]');
const operatorsButtons = document.querySelectorAll('[data-operators]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const firstInputText = document.querySelector('[data-first-input]');
const secondInputText = document.querySelector('[data-second-input]');

const calculator = new CalculatorApp(firstInputText, secondInputText);


// for each loop to add event listener to the number buttons
numbersButtons.forEach(buttons => {
    buttons.addEventListener('click', () => {
        calculator.appendInput(buttons.innerText);
        calculator.updateOutput();
    })
})

// for each loop to add event listener to the operator buttons
operatorsButtons.forEach(buttons => {
    buttons.addEventListener('click', () => {
        calculator.AppendOperators(buttons.innerText);
        calculator.updateOutput();
    })
})

// adds event listener to the clear button
clearButton.addEventListener('click', buttons => {
    calculator.clearInput();
    calculator.updateOutput();
})

// adds event listener to the delete button
deleteButton.addEventListener('click', buttons => {
    calculator.deleteInput();
    calculator.updateOutput();
})

// adds event listener to the equals button
equalsButton.addEventListener('click', buttons => {
    calculator.calculate();
    calculator.updateOutput();
})





