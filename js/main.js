// Core counting functions (export these for testing)
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

export function calculateReadingTime(wordCount) {
  const minutes = Math.ceil(wordCount / 200);
  return minutes > 0
    ? `${minutes} minute${minutes !== 1 ? "s" : ""}`
    : "Less than 1 minute";
}

export function checkCharacterLimit(currentChars, limit) {
  if (limit === null || limit === undefined) return { status: 'ok' };
  
  const remaining = limit - currentChars;
  const warningThreshold = Math.floor(limit * 0.1);

  if (currentChars >= limit) {
    return {
      status: 'error',
      message: currentChars === limit
        ? `Character limit of ${limit} reached!`
        : `Character limit of ${limit} exceeded by ${currentChars - limit}`
    };
  } else if (remaining <= warningThreshold) {
    return {
      status: 'warning',
      message: `Warning: Only ${remaining} characters remaining`
    };
  }
  
  return { status: 'ok' };
}

export function calculateLetterFrequency(text) {
  const cleanedText = text.toLowerCase().replace(/[^a-z]/g, "");
  const letters = {};

  for (let char of cleanedText) {
    letters[char] = (letters[char] || 0) + 1;
  }

  return Object.entries(letters)
    .map(([char, count]) => ({
      char,
      count,
      percent: cleanedText.length > 0 
        ? ((count / cleanedText.length) * 100).toFixed(2) 
        : "0.00",
    }))
    .sort((a, b) => b.count - a.count);
}

// DOM-related functions (not exported, for app use only)
function animateCounter(element, oldValue, newValue) {
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

function updateCounterDisplay(counterDisplay, currentChars, limit) {
  if (limit) {
    counterDisplay.textContent = `${currentChars}/${limit}`;
    counterDisplay.style.display = "block";

    const usagePercent = (currentChars / limit) * 100;
    if (usagePercent >= 90) {
      counterDisplay.style.color = "red";
    } else if (usagePercent >= 75) {
      counterDisplay.style.color = "orange";
    } else {
      counterDisplay.style.color = "green";
    }
  } else {
    counterDisplay.textContent = `${currentChars}`;
    counterDisplay.style.color = "inherit";
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const textInput = document.getElementById("text-input");
  const charCount = document.getElementById("character-count");
  const wordCount = document.getElementById("word-count");
  const sentenceCount = document.getElementById("sentence-count");
  const excludeSpaces = document.getElementById("exclude-spaces");
  const readingTime = document.querySelector(".app-time span");
  const counterDisplay = document.createElement("div");
  counterDisplay.className = "counter-display";
  textInput.parentElement.appendChild(counterDisplay);

  // Track previous values for animations
  let lastCharCount = 0;
  let lastWordCount = 0;
  let lastSentenceCount = 0;

  // Update all metrics
  function updateAll() {
    const text = textInput.value;
    const excludeSpacesChecked = excludeSpaces.checked;

    // Get counts using our testable functions
    const chars = countCharacters(text, excludeSpacesChecked);
    const words = countWords(text);
    const sentences = countSentences(text);
    const readingTimeText = calculateReadingTime(words);

    // Update displays with animation
    animateCounter(charCount, lastCharCount, chars);
    lastCharCount = chars;

    animateCounter(wordCount, lastWordCount, words);
    lastWordCount = words;

    animateCounter(sentenceCount, lastSentenceCount, sentences);
    lastSentenceCount = sentences;

    // Update reading time
    readingTime.textContent = readingTimeText;

    // Update counter display
    updateCounterDisplay(counterDisplay, chars, null);
  }

  // Set up event listeners
  textInput.addEventListener("input", updateAll);
  excludeSpaces.addEventListener("change", updateAll);

  // Initial update
  updateAll();
});