<<<<<<< HEAD
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
=======
document.addEventListener("DOMContentLoaded", (e) => {
  const textInput = document.getElementById("text-input");
  const charCountDisplay = document.getElementById("character-count");
  const wordCountDisplay = document.getElementById("word-count");
  const sentenceCountDisplay = document.getElementById("sentence-count");
  const excludeSpacesCheckbox = document.getElementById("exclude-spaces");
  const readingTimeDisplay = document.querySelector(".app-time span");
  const letterDensityContainer = document.querySelector(".progress-row");
  const themeToggleButton = document.getElementById("theme-toggler");
  const body = document.body;
  const characterLimitInput = document.getElementById("character-limit");
  const characterLimitCheckbox = document.getElementById("set-limit-checkbox");

  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  errorMessage.style.color = "#fe8159";
  errorMessage.style.display = "none";
  errorMessage.style.opacity = 0; // Start hidden

  const errorIcon = document.createElement("img");
  errorIcon.src = "./assets/images/icon-info.svg"; // Path to your error icon
  errorIcon.alt = "Error Icon";
  errorIcon.style.width = "20px";
  errorIcon.style.marginRight = "8px";

  errorMessage.appendChild(errorIcon);
  textInput.parentElement.appendChild(errorMessage);

  const logoImage = document.getElementById("logo-image");
  const letterDensityData = [];
  let showAll = false;

  const setTheme = (theme) => {
    body.classList.remove("light-theme", "dark-theme");
    body.classList.add(theme);

    logoImage.src =
      theme === "dark-theme"
        ? "./assets/images/logo-dark-theme.svg"
        : "./assets/images/logo-light-theme.svg";

    const themeIcon = document.getElementById("theme-icon");
    themeIcon.src =
      theme === "dark-theme"
        ? "./assets/images/icon-sun.svg" // Light icon for dark theme
        : "./assets/images/icon-moon.svg"; // Dark icon for light theme

    localStorage.setItem("theme", theme);
  };

  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark-theme"
      : "light-theme");

  setTheme(currentTheme);

  const updateCounts = () => {
    const text = textInput.value;
    const countCharacters = (text) => {
      return excludeSpacesCheckbox.checked
        ? text.replace(/\s/g, "").length
        : text.length;
    };
    const characterCount = countCharacters(text);
    charCountDisplay.innerText = characterCount;

    const limit = parseInt(characterLimitInput.value) || Infinity;
    if (characterCount > limit) {
      textInput.value = text.substring(0, limit);
      charCountDisplay.innerText = limit;
      errorMessage.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Error Icon" style="width: 20px; margin-right: 8px;"> Character limit of ${limit} exceeded!`;
      errorMessage.style.display = "flex";
      errorMessage.style.opacity = 1; // Fade in effect
    } else {
      errorMessage.style.opacity = 0; // Fade out effect
      setTimeout(() => {
        errorMessage.style.display = "none"; // Hide after fade out
      }, 300);
    }

    const countWords = (text) => {
      return text.trim().split(/\s+/).filter(Boolean);
    };
    const wordsArray = countWords(text);
    wordCountDisplay.innerText = wordsArray.length;

    const countSentences = (text) => {
      return text.trim().split(/[.?!]/).filter(Boolean).length;
    };
    sentenceCountDisplay.innerText = countSentences(text);

    const readingTime = Math.ceil(wordsArray.length / 200);
    readingTimeDisplay.innerText =
      readingTime > 0 ? `${readingTime} minute(s)` : "Less than 1 minute";
  };

  const updateLetterDensity = () => {
    let text = textInput.value.toLowerCase().replace(/[^a-z]/g, "");
    const countLetters = {};
    for (let letter of text) {
      countLetters[letter] = (countLetters[letter] || 0) + 1;
    }
    letterDensityData.length = 0;
    letterDensityContainer.innerHTML = "";

    for (let [letter, count] of Object.entries(countLetters)) {
      letterDensityData.push({
        letter,
        count,
        percentage: ((count / text.length) * 100).toFixed(2),
      });
    }

    displayLetterDensity();
  };

  const displayLetterDensity = () => {
    letterDensityContainer.innerHTML = "";

    const lettersToShow = showAll
      ? letterDensityData
      : letterDensityData.slice(0, 5);
    lettersToShow.forEach(({ letter, count, percentage }) => {
      const progressRow = document.createElement("div");
      progressRow.classList.add("row", "progress", "align");
      progressRow.innerHTML = `
                <span>${letter.toUpperCase()}</span>
>>>>>>> f9b2bc6f0df8b79e5598a51761bc25f0be18a0f5
                <div class="progress-bar">
                    <div class="progress-width" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">${item.count} (${percentage}%)</div>
            `;
<<<<<<< HEAD
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
  
=======
      letterDensityContainer.appendChild(progressRow);
    });

    const showMoreButton = document.querySelector(".see-more-progress");
    showMoreButton.style.display =
      letterDensityData.length > 5 ? "block" : "none";
    showMoreButton.innerText = showAll ? "Show Less" : "See More";
  };

  textInput.addEventListener("keyup", (e) => {
    updateCounts();
    updateLetterDensity();
  });

  characterLimitCheckbox.addEventListener("change", (e) => {
    characterLimitInput.style.display = e.target.checked ? "block" : "none";
    const hint = document.querySelector(".hint");
    hint.style.display = e.target.checked ? "block" : "none";
  });

  themeToggleButton.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark-theme")
      ? "light-theme"
      : "dark-theme";
    setTheme(newTheme);
  });

  const seeMoreButton = document.querySelector(".see-more-progress");
  seeMoreButton.addEventListener("click", () => {
    showAll = !showAll;
    displayLetterDensity();
  });

  updateLetterDensity();
});
>>>>>>> f9b2bc6f0df8b79e5598a51761bc25f0be18a0f5
