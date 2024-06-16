const resultText = document.getElementById("text");
const oldResultText = document.getElementById("oldResult");
const buttons = document.querySelectorAll("button");

let oldNumber = "0";
let currentNumber = "0";
let currentSign = "";

let isEqual = false;

document.addEventListener("keydown", OnKeyPress);

buttons.forEach((btn) => btn.addEventListener("click", OnButtonPress));

function RefreshResult() {
  if (oldNumber === "0") oldResultText.style.opacity = "0";
  else oldResultText.style.opacity = "1";

  resultText.innerText = currentNumber;
  if (isEqual) oldResultText.innerText = oldNumber;
  else oldResultText.innerText = oldNumber + ` ${currentSign}`;
}

/**
 * Function for add number in currebtNumber
 * @param {Number} number
 */
function AddNumber(number) {
  if (currentNumber.length > 7) return;
  if (currentNumber !== "0") currentNumber += number.toString();
  else currentNumber = number.toString();
  RefreshResult();
}

function FunctionButton(func) {
  switch (func) {
    case "AC":
      currentNumber = "0";
      oldNumber = "0";
      currentSign = "";
      break;

    case "+/-":
      currentNumber = (-parseFloat(currentNumber)).toString();
      break;

    case "%":
      currentNumber = parseFloat(currentNumber) / 100;
      break;
  }

  RefreshResult();
}

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

function SignButton(sign) {
  currentSign = sign;
  oldNumber = currentNumber;
  currentNumber = "0";
  RefreshResult();
}

function OnKeyPress(e) {
  console.log(e);
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

function OnButtonPress(e) {
  switch (e.target.getAttribute("data-type")) {
    case "num":
      AddNumber(e.target.innerText);
      break;

    case "func":
      FunctionButton(e.target.innerText);
      break;

    case "sign":
      SignButton(e.target.innerText);
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
