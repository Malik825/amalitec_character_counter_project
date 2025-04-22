// Simple animation for counters
export function animateCounter(element, newValue) {
  element.style.transform = "scale(1.1)";
  setTimeout(() => {
    element.textContent = newValue;
    element.style.transform = "";
  }, 150);
}
