class Calculator{
    constructor(currentOperandTextElement,previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number){ 
        if (number === '.' && this.currentOperand.includes('.')) 
            return
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
        
    
    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(this.currentOperand)) return 
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '×':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
        
            default:
                return
        }
        this.currentOperand =computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0} )
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }


    updateDisplay(){
        if (this.currentOperandTextElement.innerText.length >= 18 && this.operation !== this.delete()) {
            alert('You have entered the maximum digits')
        } else {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
            if(this.operation != null){
                this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
            }else{
                this.previousOperandTextElement.innerText = ''
            }
        }
     
     
    }
}






const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const clear = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous]');
const currentOperandTextElement = document.querySelector('[data-current]');




const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})
clear.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})