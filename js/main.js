import {
  countCharacters,
  countWords,
  countSentences,
  calculateReadingTime,
  analyzeLetterFrequency,
  checkCharacterLimit,
  animateCounter,
  animateColorChange,
  animateMessage,
} from "./functions.js";

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const textInput = document.getElementById("text-input");
  const charCount = document.getElementById("character-count");
  const wordCount = document.getElementById("word-count");
  const sentenceCount = document.getElementById("sentence-count");
  const excludeSpaces = document.getElementById("exclude-spaces");
  const readingTime = document.querySelector(".app-time span");
  const letterContainer = document.querySelector(".progress-row");
  const themeButton = document.querySelector(".theme");
  const limitInput = document.getElementById("character-limit");
  const limitCheckbox = document.querySelector(
    ".char-limit input[type='checkbox']"
  );
  const seeMoreBtn = document.querySelector(".see-more-progress");
  const themeIcon = document.getElementById("theme-icon");
  const counterDisplay = document.createElement("div");

  // Create message elements
  const warningMsg = document.createElement("div");
  warningMsg.className = "warning-message";
  warningMsg.style.display = "none";

  const errorMsg = document.createElement("div");
  errorMsg.className = "error-message";
  errorMsg.style.display = "none";

  // Create container for messages
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.appendChild(warningMsg);
  messageContainer.appendChild(errorMsg);
  textInput.parentElement.appendChild(messageContainer);

  // Add counter display
  counterDisplay.className = "counter-display";
  textInput.parentElement.appendChild(counterDisplay);

  // Set initial theme
  let currentTheme = localStorage.getItem("theme") || "light-theme";
  document.body.className = currentTheme;
  updateThemeIcon();

  // Animation variables
  let lastCharCount = 0;
  let lastWordCount = 0;
  let lastSentenceCount = 0;

  // Set up event listeners
  function setupListeners() {
    textInput.addEventListener("input", function () {
      updateAll();
      animateTextInput();
    });
    excludeSpaces.addEventListener("change", updateAll);
    limitCheckbox.addEventListener("change", toggleLimit);
    themeButton.addEventListener("click", toggleTheme);
    seeMoreBtn.addEventListener("click", toggleLetters);
    limitInput.addEventListener("input", updateAll);
  }

  // Update all counts and displays
  function updateAll() {
    const text = textInput.value;
    const excludeSpacesChecked = excludeSpaces.checked;
    const limitEnabled = limitCheckbox.checked;
    const limit = parseInt(limitInput.value) || 0;

    // Update character count with animation
    let chars = countCharacters(text, excludeSpacesChecked);
    animateCounter(charCount, lastCharCount, chars);
    lastCharCount = chars;

    // Update word count with animation
    const words = countWords(text);
    animateCounter(wordCount, lastWordCount, words);
    lastWordCount = words;

    // Update sentence count with animation
    const sentences = countSentences(text);
    animateCounter(sentenceCount, lastSentenceCount, sentences);
    lastSentenceCount = sentences;

    // Update reading time
    readingTime.textContent = calculateReadingTime(words);

    // Update character counter display
    updateCounterDisplay(chars, limitEnabled ? limit : null);

    // Check character limit if enabled
    if (limitEnabled && limit > 0) {
      handleLimitCheck(chars, limit);
    } else {
      resetLimitStyles();
    }

    // Update letter frequency display
    updateLetters();
  }

  // Handle limit checking and UI updates
  function handleLimitCheck(chars, limit) {
    const result = checkCharacterLimit(chars, limit);

    if (result.status === "limit-reached" || result.status === "limit-exceeded") {
      textInput.classList.add("error-border");
      
      const message =
        result.status === "limit-reached"
          ? `Character limit of ${limit} reached!`
          : `Character limit of ${limit} exceeded by ${result.exceededBy}`;

      errorMsg.textContent = message;
      animateMessage(errorMsg, true);
      warningMsg.style.display = "none";
      textInput.classList.remove("warning-border");

      textInput.style.animation = "pulseError 0.5s 2";
      setTimeout(() => {
        textInput.style.animation = "";
      }, 1000);

      // Truncate text if exceeded
      if (result.status === "limit-exceeded") {
        truncateText(limit);
      }
    } else if (result.status === "warning") {
      textInput.classList.add("warning-border");
      warningMsg.textContent = `Warning: Only ${result.remaining} characters remaining`;
      animateMessage(warningMsg, true);
      errorMsg.style.display = "none";
      textInput.classList.remove("error-border");

      textInput.style.animation = "pulseWarning 0.5s 1";
      setTimeout(() => {
        textInput.style.animation = "";
      }, 500);
    } else {
      resetLimitStyles();
    }
  }

  // Truncate text to the limit
  function truncateText(limit) {
    if (excludeSpaces.checked) {
      let truncated = "";
      let count = 0;
      for (let char of textInput.value) {
        if (char !== " ") count++;
        if (count > limit) break;
        truncated += char;
      }
      textInput.value = truncated;
    } else {
      textInput.value = textInput.value.substring(0, limit);
    }
    updateAll();
  }

  // Animate the text input on typing
  function animateTextInput() {
    textInput.style.transform = "scale(1.01)";
    textInput.style.transition = "transform 0.1s ease";
    setTimeout(() => {
      textInput.style.transform = "scale(1)";
    }, 100);
  }

  // Update character counter display with animation
  function updateCounterDisplay(currentChars, limit) {
    if (limit) {
      counterDisplay.textContent = `${currentChars}/${limit}`;
      counterDisplay.style.display = "block";

      // Animate color change based on usage
      const usagePercent = (currentChars / limit) * 100;
      if (usagePercent >= 90) {
        animateColorChange(counterDisplay, "red");
      } else if (usagePercent >= 75) {
        animateColorChange(counterDisplay, "orange");
      } else {
        animateColorChange(counterDisplay, "green");
      }
    } else {
      counterDisplay.textContent = `${currentChars}`;
      animateColorChange(counterDisplay, "inherit");
    }
  }

  // Reset all limit-related styles
  function resetLimitStyles() {
    if (
      textInput.classList.contains("error-border") ||
      textInput.classList.contains("warning-border")
    ) {
      textInput.classList.remove("error-border", "warning-border");
      animateMessage(warningMsg, false);
      animateMessage(errorMsg, false);
    }
  }

  // Letter frequency with animations
  function updateLetters() {
    const letters = analyzeLetterFrequency(textInput.value);
    showLetters(letters);
  }

  function showLetters(letters) {
    letterContainer.innerHTML = "";

    const showAll = seeMoreBtn.textContent.includes("Less");
    const toShow = showAll ? letters : letters.slice(0, 5);

    toShow.forEach((letter, index) => {
      const row = document.createElement("div");
      row.className = "row progress align";
      row.style.opacity = "0";
      row.style.transform = "translateX(-20px)";
      row.style.transition = `all 0.3s ease ${index * 0.1}s`;

      row.innerHTML = `
          <span>${letter.char.toUpperCase()}</span>
          <div class="progress-bar">
            <div class="progress-width" style="width: ${letter.percent}%"></div>
          </div>
          <div class="progress-text">${letter.count} (${letter.percent}%)</div>
        `;

      letterContainer.appendChild(row);

      // Animate each row in
      setTimeout(() => {
        row.style.opacity = "1";
        row.style.transform = "translateX(0)";
      }, 10);
    });

    seeMoreBtn.style.display = letters.length > 5 ? "block" : "none";
  }

  // Toggle character limit input with animation
  function toggleLimit() {
    if (limitCheckbox.checked) {
      limitInput.style.display = "block";
      limitInput.style.opacity = "0";
      limitInput.style.transform = "translateY(-10px)";
      limitInput.style.transition = "all 0.3s ease";

      setTimeout(() => {
        limitInput.style.opacity = "1";
        limitInput.style.transform = "translateY(0)";
      }, 10);
    } else {
      limitInput.style.opacity = "0";
      limitInput.style.transform = "translateY(-10px)";
      setTimeout(() => {
        limitInput.style.display = "none";
      }, 300);
    }
    updateAll();
  }

  // Theme toggle with animation
  function toggleTheme() {
    themeIcon.style.transform = "rotate(180deg)";
    themeIcon.style.transition = "transform 0.5s ease";

    setTimeout(() => {
      currentTheme =
        currentTheme === "light-theme" ? "dark-theme" : "light-theme";
      document.body.className = currentTheme;
      localStorage.setItem("theme", currentTheme);
      updateThemeIcon();

      themeIcon.style.transform = "rotate(0deg)";
    }, 250);
  }

  function updateThemeIcon() {
    themeIcon.src =
      currentTheme === "light-theme"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg";
  }

  // Toggle letter density view with animation
  function toggleLetters() {
    if (seeMoreBtn.textContent.includes("More")) {
      seeMoreBtn.textContent = "Show Less";
      seeMoreBtn.style.transform = "scale(1.1)";
      seeMoreBtn.style.transition = "transform 0.3s ease";
      setTimeout(() => {
        seeMoreBtn.style.transform = "scale(1)";
      }, 300);
    } else {
      seeMoreBtn.textContent = "See More";
    }
    updateLetters();
  }

  // Initialize everything
  setupListeners();
  updateAll();
});