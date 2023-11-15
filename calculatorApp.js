class CalculatorApp {
    constructor(previousText, currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.allClear();
    }

    // clears the output display of all data
    allClear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = undefined;
    }

    // deletes the last output display value 
    deleteValue() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    // appends number to output display each time user clicks a number button
    appendValue(number) {
        // prevents multiple decimals to be added to output display
        if (number === '.' && this.currentValue.includes('.')) return;
        // need to convert to string otherwise values will be added rather than appended
        this.currentValue = this.currentValue.toString() + number.toString();
    }

    // adds operator to output display
    addOperator(operator) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    // calculates user input
    calculate() {
        let calculation;
        // parseFloat parses a string argument and returns a floating point number
        const previous = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        // if prevents code from running if user clicks equals without input
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operator) {
            case '/':
                calculation = previous / current;
                break;
            case 'x':
                calculation = previous * current;
                break;
            case '-':
                calculation = previous - current;
                break;
            case '+':
                calculation = previous + current;
                break;
            default:
                return;
        }
        this.currentValue = calculation;
        this.operator = undefined;
        this.previousValue = '';
    }

    // returns number and converts to display value
    getOutputNumber(number){
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '';
        // adds coma's to numbers
        return floatNumber.toLocaleString('en');
    }

    // updates the output display
    updateOutput() {
        this.currentText.innerText =
            this.getOutputNumber(this.currentValue);
        // displays previous value if no operator is chosen
        if (this.operator != null) {
            this.previousText.innerText =
                // displays value and operator to upper output display
                `${this.getOutputNumber(this.previousValue)} ${this.operator}`;
        } else {
            this.previousText.innerText = '';
        }
    }
}

// querySelectorAll gets all elements that match data- attribute
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousText = document.querySelector('[data-previous-value]');
const currentText = document.querySelector('[data-current-value]');

const calculator = new CalculatorApp(previousText, currentText);

// for each loop to add event listener to the number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendValue(button.innerText);
        calculator.updateOutput();
    })
})

// for each loop to add event listener to the operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperator(button.innerText);
        calculator.updateOutput();
    })
})

// adds event listener to the equals button
equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateOutput();
})

// adds event listener to the clear button
clearButton.addEventListener('click', button => {
    calculator.allClear();
    calculator.updateOutput();
})

// adds event listener to the delete button
deleteButton.addEventListener('click', button => {
    calculator.deleteValue();
    calculator.updateOutput();
})
