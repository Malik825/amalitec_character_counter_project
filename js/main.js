document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const textInput = document.getElementById("text-input");
  const characterCount = document.getElementById("character-count");
  const wordCount = document.getElementById("word-count");
  const sentenceCount = document.getElementById("sentence-count");
  const excludeSpacesCheckbox = document.getElementById("exclude-spaces");
  const setCharacterLimitCheckbox = document.getElementById(
    "set-character-limit"
  );
  const characterLimitInput = document.getElementById("character-limit");
  const themeToggler = document.getElementById("theme-icon");
  const logoImage = document.getElementById("logo-image");
  const readingTimeElement = document.querySelector(".app-time span");
  const seeMoreButton = document.querySelector(".see-more-progress");
  const progressRow = document.querySelector(".progress-row");
  const errorMessageElement = document.getElementById("error-message");

  // Info icon path
  const infoIconPath = "./assets/images/icon-info.svg"; // Update with your actual path

  // Theme variables
  const lightThemeLogo = "./assets/images/logo-light-theme.svg";
  const darkThemeLogo = "./assets/images/logo-dark-theme.svg";
  const sunIcon = "./assets/images/icon-sun.svg";
  const moonIcon = "./assets/images/icon-moon.svg";

  // Initialize theme from localStorage or default to light
  const currentTheme = localStorage.getItem("theme") || "light-theme";
  document.body.className = currentTheme;
  updateThemeIcon(currentTheme);
  updateLogo(currentTheme);

  // Hide character limit input by default
  characterLimitInput.style.display = "none";

  // Initialize error message visibility
  errorMessageElement.style.opacity = 0;
  errorMessageElement.style.transition = "opacity 0.3s ease";

  // Event Listeners
  textInput.addEventListener("input", updateCounts);
  excludeSpacesCheckbox.addEventListener("change", updateCounts);
  setCharacterLimitCheckbox.addEventListener("change", toggleCharacterLimit);
  characterLimitInput.addEventListener("input", handleCharacterLimit);
  themeToggler.addEventListener("click", toggleTheme);
  seeMoreButton.addEventListener("click", toggleLetterDensity);

  // Initialize counts
  updateCounts();

  function updateCounts() {
    let text = textInput.value;

    // Update character count
    let chars = text.length;
    if (excludeSpacesCheckbox.checked) {
      text = text.replace(/\s/g, "");
      chars = text.length;
    }
    characterCount.textContent = chars;

    // Update word count
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    wordCount.textContent = words;

    // Update sentence count
    const sentences =
      text.trim() === ""
        ? 0
        : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    sentenceCount.textContent = sentences.toString().padStart(2, "0");

    // Update reading time
    const readingTime = Math.ceil(words / 200);
    readingTimeElement.textContent = `${readingTime} minute${
      readingTime !== 1 ? "s" : ""
    }`;

    // Error validation and limit enforcement
    errorMessageElement.textContent = ""; // Clear previous errors
    errorMessageElement.style.opacity = 0;
    textInput.classList.remove("error-border");

    if (setCharacterLimitCheckbox.checked) {
      const limit = parseInt(characterLimitInput.value);
      if (!isNaN(limit)) {
        textInput.setAttribute("maxlength", limit);
        if (chars > limit) {
          errorMessageElement.innerHTML = `<img src="${infoIconPath}" alt="Error Icon" style="width: 20px; margin-right: 8px;"> Character limit exceeded by ${
            chars - limit
          }`;
          errorMessageElement.style.opacity = 1;
          textInput.classList.add("error-border");
        } else if (chars === limit) {
          errorMessageElement.innerHTML = `<img src="${infoIconPath}" alt="Error Icon" style="width: 20px; margin-right: 8px;"> Limit reached: your text is exactly ${limit} characters.`;
          errorMessageElement.style.opacity = 1;
          textInput.classList.add("error-border");
        }
      } else {
        textInput.removeAttribute("maxlength");
      }
    } else {
      textInput.removeAttribute("maxlength");
    }

    // Update letter density
    updateLetterDensity(textInput.value);
  }

  function toggleCharacterLimit() {
    const isChecked = setCharacterLimitCheckbox.checked;

    // Show or hide the input field
    characterLimitInput.style.display = isChecked ? "block" : "none";

    errorMessageElement.textContent = ""; // Clear error when hiding
    errorMessageElement.style.opacity = 0;

    updateCounts();
  }

  function handleCharacterLimit() {
    const limit = parseInt(characterLimitInput.value);
    errorMessageElement.textContent = ""; // Clear old errors
    errorMessageElement.style.opacity = 0;

    if (isNaN(limit) || limit <= 0) {
      errorMessageElement.innerHTML = `<img src="${infoIconPath}" alt="Error Icon" style="width: 20px; margin-right: 8px;"> Please enter a valid number`;
      errorMessageElement.style.opacity = 1;
      return;
    }

    updateCounts();
  }

  function toggleTheme() {
    const newTheme = document.body.classList.contains("light-theme")
      ? "dark-theme"
      : "light-theme";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    updateLogo(newTheme);
  }

  function updateThemeIcon(theme) {
    themeToggler.src = theme === "light-theme" ? moonIcon : sunIcon;
  }

  function updateLogo(theme) {
    logoImage.src = theme === "light-theme" ? lightThemeLogo : darkThemeLogo;
  }

  function updateLetterDensity(text) {
    progressRow.innerHTML = "";

    if (text.trim() === "") return;

    const cleanText = text.toLowerCase().replace(/[^a-z]/g, "");
    if (cleanText.length === 0) return;

    const frequency = {};
    for (const char of cleanText) {
      frequency[char] = (frequency[char] || 0) + 1;
    }

    const sortedLetters = Object.keys(frequency)
      .map((char) => ({ char, count: frequency[char] }))
      .sort((a, b) => b.count - a.count);

    const isExpanded = seeMoreButton.getAttribute("data-expanded") === "true";
    const lettersToShow = isExpanded
      ? sortedLetters
      : sortedLetters.slice(0, 5);

    lettersToShow.forEach((item) => {
      const percentage = ((item.count / cleanText.length) * 100).toFixed(2);

      const progressElement = document.createElement("div");
      progressElement.className = "progress row align";
      progressElement.innerHTML = `
              <span>${item.char.toUpperCase()}</span>
              <div class="progress-bar">
                  <div class="progress-width" style="width: ${percentage}%"></div>
              </div>
              <div class="progress-text">${item.count} (${percentage}%)</div>
          `;
      progressRow.appendChild(progressElement);
    });
  }

  function toggleLetterDensity() {
    const isExpanded = seeMoreButton.getAttribute("data-expanded") === "true";
    seeMoreButton.setAttribute("data-expanded", (!isExpanded).toString());

    if (!isExpanded) {
      seeMoreButton.innerHTML = "See Less <span>&lt;</span>";
    } else {
      seeMoreButton.innerHTML = "See More <span>&gt;</span>";
    }

    updateCounts();
  }
});
