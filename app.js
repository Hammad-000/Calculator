const display = document.getElementById("display");
let currentInput = "0";

// Update the display with currentInput
function updateDisplay() {
  display.textContent = currentInput;
}

// Clear the display
function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

// Append value to the current input
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

// Evaluate the current input as a mathematical expression
function calculateResult() {
  try {
    currentInput = new Function('return ' + currentInput)();
  } catch (err) {
    currentInput = "Error";
  }
  updateDisplay();
}

// Event listener for button clicks
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

// Event listener for keyboard events
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9+\-*/.]$/.test(key)) {
    appendToDisplay(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault(); // Prevent the default Enter key behavior (e.g., form submission)
    calculateResult();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay();
  } else if (key.toLowerCase() === "c" || key === "Escape") {
    clearDisplay();
  }
});