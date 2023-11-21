const calculator = document.querySelector('.calculator')
// below are children of calculator so we replace document wit calc
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', event => {
    // Stopping border etc from being clicked
    if (!event.target.closest('button')) return

    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    // const type = key.dataset.type;
    const { type } = key.dataset;
    // above is a destructuring assignment
    const { previousKeyType } = calculator.dataset;
   
    // Is this a number key?
    if (type === 'number') {
        // was "key.dataset.type" now becomes just type because of the const
         // 0 in the display is actually a string hence '0'
        if (displayValue === '0') {
            display.textContent = keyValue;
        } else if (previousKeyType === 'operator') {
            display.textContent = keyValue;
        } else {
            // This is concatenating strings not adding numbers
            display.textContent = displayValue + keyValue;
        }

        // calculator.dataset.previousKeyType = 'number';
        // Can move down as it is reused and would change to "type"
    }
   

    // Is this an operator key?
    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
        operatorKeys.forEach(el => {el.dataset.state = ''});
        key.dataset.state = 'selected';
        
        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    // Is this an equal key?
    if (type === 'equal') {
        // Perform a calculation
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = parseInt(displayValue);

        // let result = '';
        
        // if (operator === 'plus') result = firstNumber + secondNumber;
        // if (operator === 'minus') result = firstNumber - secondNumber;
        // if (operator === 'times') result = firstNumber * secondNumber;
        // if (operator === 'divide') result = firstNumber / secondNumber;
        
        display.textContent = calculate(firstNumber, operator, secondNumber);
    }

    calculator.dataset.previousKeyType = type;
})

function calculate (firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    let result = '';   
    if (operator === 'plus') return firstNumber + secondNumber;
    if (operator === 'minus') return firstNumber - secondNumber;
    if (operator === 'times') return firstNumber * secondNumber;
    //edge case for dividing by zero
    // if (operator === 'divide') return firstNumber / secondNumber;
    // Check if the second number is zero before performing division
    if (operator === 'divide') {
        if (secondNumber === 0) {
            return "Cannot divide by zero";
        }
        return firstNumber / secondNumber;
    }
    return result;
}