// DOM elements selection
const resultText = document.getElementById("text"); // Field to display the current result
const oldResultText = document.getElementById("oldResult"); // Field to display the previous result
const buttons = document.querySelectorAll("button"); // Selecting all buttons

// Calculation variables
let oldNumber = "0"; // Previous number
let currentNumber = "0"; // Current number
let currentSign = ""; // Current operator

let isEqual = false; // Indicates whether the equal button has been pressed

// Keyboard event
document.addEventListener("keydown", OnKeyPress);

// Adding event listeners to buttons
buttons.forEach((btn) => btn.addEventListener("click", OnButtonPress));

/**
 * Refreshes the result display
 */
function RefreshResult() {
  oldResultText.style.opacity = oldNumber === "0" ? "0" : "1";
  resultText.innerText = currentNumber;
  oldResultText.innerText = isEqual ? oldNumber : oldNumber + ` ${currentSign}`;
}

/**
 * Function to add a number to currentNumber
 * @param {number} number - The number to add
 */
function AddNumber(number) {
  if (currentNumber.length > 7) return; // Limits the number of digits
  currentNumber =
    currentNumber === "0" ? number.toString() : currentNumber + number;
  RefreshResult();
}

/**
 * Function to handle function buttons
 * @param {string} func - The function to execute (AC, +/-, %)
 */
function FunctionButton(func) {
  switch (func) {
    case "AC":
      currentNumber = "0";
      oldNumber = "0";
      currentSign = "";
      break;

    case "+/-":
      currentNumber = `-${currentNumber}`;
      break;

    case "%":
      currentNumber = (parseFloat(currentNumber) / 100).toString();
      break;
  }
  RefreshResult();
}

/**
 * Function to handle the equal button
 */
function EqualButton() {
  if (currentSign === "") return;

  switch (currentSign) {
    case "+":
      currentNumber = (
        parseFloat(oldNumber) + parseFloat(currentNumber)
      ).toString();
      break;

    case "-":
      currentNumber = (
        parseFloat(oldNumber) - parseFloat(currentNumber)
      ).toString();
      break;

    case "×":
      currentNumber = (
        parseFloat(oldNumber) * parseFloat(currentNumber)
      ).toString();
      break;

    case "÷":
      currentNumber = (
        parseFloat(oldNumber) / parseFloat(currentNumber)
      ).toString();
      break;
  }
  isEqual = true;
  oldNumber = currentNumber;
  RefreshResult();
  isEqual = false;
}

/**
 * Function to handle operator buttons
 * @param {string} sign - The operator (+, -, ×, ÷)
 */
function SignButton(sign) {
  currentSign = sign;
  oldNumber = currentNumber;
  currentNumber = "0";
  RefreshResult();
}

/**
 * Handles keyboard key press events
 * @param {KeyboardEvent} e - The key press event
 */
function OnKeyPress(e) {
  if (!isNaN(parseFloat(e.key))) {
    AddNumber(parseFloat(e.key));
  }

  switch (e.key) {
    case "+":
      SignButton("+");
      break;

    case "/":
      SignButton("÷");
      break;

    case "*":
      SignButton("×");
      break;

    case "-":
      SignButton("-");
      break;

    case "Enter":
      EqualButton();
      break;

    case ".":
      currentNumber += ".";
      RefreshResult();
      break;

    case "Backspace":
      FunctionButton("AC");
      break;

    case "%":
      FunctionButton("%");
      break;
  }
}

/**
 * Handles button click events
 * @param {MouseEvent} e - The button click event
 */
function OnButtonPress(e) {
  const { target } = e;
  const dataType = target.getAttribute("data-type");

  switch (dataType) {
    case "num":
      AddNumber(parseFloat(target.innerText));
      break;

    case "func":
      FunctionButton(target.innerText);
      break;

    case "sign":
      SignButton(target.innerText);
      break;

    case "other":
      currentNumber += ".";
      RefreshResult();
      break;

    case "equal":
      EqualButton();
      break;
  }
}
