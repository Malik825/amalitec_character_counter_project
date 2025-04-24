// Counting functions
export function countCharacters(text, excludeSpaces) {
  return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
}

export function countWords(text) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export function countSentences(text) {
  return text.trim() === ""
    ? 0
    : text.split(/[.?!]/).filter((s) => s.trim().length > 0).length;
}

// Text analysis functions
export function calculateReadingTime(words) {
  const minutes = Math.ceil(words / 200);
  return minutes > 0
    ? `${minutes} minute${minutes !== 1 ? "s" : ""}`
    : "Less than 1 minute";
}

export function analyzeLetterFrequency(text) {
  const cleanedText = text.toLowerCase().replace(/[^a-z]/g, "");
  const letters = {};

  for (let char of cleanedText) {
    letters[char] = (letters[char] || 0) + 1;
  }

  return Object.entries(letters)
    .map(([char, count]) => ({
      char,
      count,
      percent:
        cleanedText.length > 0
          ? ((count / cleanedText.length) * 100).toFixed(2)
          : "0.00",
    }))
    .sort((a, b) => b.count - a.count);
}

// Limit checking functions
export function checkCharacterLimit(chars, limit) {
  if (limit === null) return { status: "ok", remaining: null };
  
  const remaining = limit - chars;
  const warningThreshold = Math.floor(limit * 0.1);

  if (chars >= limit) {
    return {
      status: chars === limit ? "limit-reached" : "limit-exceeded",
      remaining: 0,
      exceededBy: chars > limit ? chars - limit : 0,
    };
  } else if (remaining <= warningThreshold) {
    return { status: "warning", remaining };
  }
  return { status: "ok", remaining };
}

// Animation helpers
export function animateCounter(element, oldValue, newValue) {
  if (oldValue !== newValue) {
    element.style.transform = "translateY(-5px)";
    element.style.opacity = "0.5";
    element.style.transition = "all 0.3s ease";

    setTimeout(() => {
      element.textContent = newValue;
      element.style.transform = "translateY(0)";
      element.style.opacity = "1";
    }, 150);
  } else {
    element.textContent = newValue;
  }
}

export function animateColorChange(element, newColor) {
  element.style.transition = "color 0.5s ease";
  element.style.color = newColor;
}

export function animateMessage(element, show) {
  if (show) {
    element.style.display = "flex";
    element.style.opacity = "0";
    element.style.transform = "translateY(-10px)";
    element.style.transition = "all 0.3s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 10);
  } else {
    element.style.opacity = "0";
    element.style.transform = "translateY(-10px)";
    setTimeout(() => {
      element.style.display = "none";
    }, 300);
  }
}