export function setupLimitChecker(elements) {
  function checkLimit(chars) {
    if (!elements.limitCheckbox.checked) return;

    const limit = parseInt(elements.limitInput.value);
    if (isNaN(limit)) return;

    if (chars >= limit) {
      const message =
        chars === limit
          ? `Character limit of ${limit} reached!`
          : `Limit exceeded by ${chars - limit}`;
      showMessage(message, "error");
    }
  }

  function showMessage(text, type) {
    elements.messageEl.textContent = text;
    elements.messageEl.className = `${type}-message`;
  }

  // Toggle limit input visibility
  elements.limitCheckbox.addEventListener("change", () => {
    elements.limitInput.style.display = elements.limitCheckbox.checked
      ? "block"
      : "none";
  });

  return { checkLimit };
}
