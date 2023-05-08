class Calculator {
  private previousElementTextElement: HTMLElement;
  private currentElementTextElement: HTMLElement;
  private operator: string;
  constructor(
    previousElementTextElement: HTMLElement,
    currentElementTextElement: HTMLElement,
  ) {
    this.previousElementTextElement = previousElementTextElement;
    this.currentElementTextElement = currentElementTextElement;
    this.operator = "";
  }

  public compute(inputSymbol?: string): void {
    if (previousElementTextElement.innerText === "" && inputSymbol) {
      this.previousElementTextElement.innerText =
        this.currentElementTextElement.innerText + " " + inputSymbol;
      this.currentElementTextElement.innerText = "";
      this.operator = inputSymbol;
      return;
    }
    let result;
    switch (this.operator) {
      case "+":
        result =
          parseFloat(previousElementTextElement.innerText) +
          parseFloat(currentElementTextElement.innerText);
        this.operator = "";
        break;

      case "-":
        result =
          parseFloat(previousElementTextElement.innerText) -
          parseFloat(currentElementTextElement.innerText);
        this.operator = "";
        break;
      case "*":
        result =
          parseFloat(previousElementTextElement.innerText) *
          parseFloat(currentElementTextElement.innerText);
        this.operator = "";
        break;
      case "/":
        // handle the case of divide by 0 later
        const firstOperand = parseFloat(previousElementTextElement.innerText);
        const secondOperand = parseFloat(currentElementTextElement.innerText);
        if (secondOperand) result = firstOperand / secondOperand;
        else result = "Can't divide by zero";
        this.operator = "";
        break;
      default:
        return;
    }

    // case for equal(=)
    if (!inputSymbol) {
      this.previousElementTextElement.innerText = "";
      this.currentElementTextElement.innerText = result.toString();
    } else {
      this.previousElementTextElement.innerText =
        result.toString() + " " + inputSymbol;
      this.currentElementTextElement.innerText = "";
      this.operator = inputSymbol;
    }
  }

  public delete(): void {
    if (!this.currentElementTextElement.innerText) return;
    this.currentElementTextElement.innerText =
      this.currentElementTextElement.innerText.slice(0, -1);
  }

  public clearAll(): void {
    this.previousElementTextElement.innerText = "";
    this.currentElementTextElement.innerText = "";
  }

  public updateText(num: string): void {
    currentElementTextElement.innerText += num;
  }
}

// handle the number and decimal point button click
const numberButtonCollection = document.querySelectorAll("[data-number]");
let numberButtons = Array.from(numberButtonCollection);
numberButtons.map((numberButton: Element): void => {
  numberButton.addEventListener("click", (event): void => {
    const button = event.target as HTMLButtonElement;

    calculator.updateText(button.innerText);
  });
});

// handle the operator(+,-,/,*) buttons click
const operatorButtonCollection = document.querySelectorAll("[data-operator]");
let operatorButtons = Array.from(operatorButtonCollection);
operatorButtons.map((operatorButton): void => {
  operatorButton.addEventListener("click", (event): void => {
    const button = event.target as HTMLButtonElement;
    calculator.compute(button.innerText);
  });
});

// handle the equal button click
const equalButton = document.querySelector("[data-equal]");
equalButton?.addEventListener("click", () => {
  calculator.compute();
});

// handle the AC button click
const allClearButton = document.querySelector("[data-clear-all]");
allClearButton?.addEventListener("click", () => {
  calculator.clearAll();
});

// handle the DEL button click
const deleteButton = document.querySelector("[data-delete]");
deleteButton?.addEventListener("click", () => {
  calculator.delete();
});

// previous operand element
const previousElementTextElement = document.querySelector(
  "[data-previous-operand]",
) as HTMLElement;

// current operand element
const currentElementTextElement = document.querySelector(
  "[data-current-operand]",
) as HTMLElement;

// instanciate the calculator
const calculator = new Calculator(
  previousElementTextElement,
  currentElementTextElement,
);
