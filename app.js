const display = document.getElementById("display");
let currentInput = "0";

function updateDisplay() {
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function appendToDisplay(value) {
  if (value === "." && currentInput.includes(".")) {
    return;
  }

  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function calculateResult() {
  try {
    currentInput = new Function('return ' + currentInput)();
  } catch (err) {
    currentInput = "Error";
  }
  updateDisplay();
}


document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculateResult();
    } else {
      appendToDisplay(value);
    }
  });
});


document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9+\-*/.]$/.test(key)) {
    appendToDisplay(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay();
  } else if (key.toLowerCase() === "c" || key === "Escape") {
    clearDisplay();
  }
});
