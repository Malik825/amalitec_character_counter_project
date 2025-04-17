document.addEventListener("DOMContentLoaded", (e) => {
    const textInput = document.getElementById("text-input");
    const charCountDisplay = document.getElementById("character-count");
    const wordCountDisplay = document.getElementById("word-count");
    const sentenceCountDisplay = document.getElementById("sentence-count");
    const excludeSpacesCheckbox = document.getElementById("exclude-spaces");
    const readingTimeDisplay = document.querySelector(".app-time span");
    const letterDensityContainer = document.querySelector(".progress-row");
    const themeToggleButton = document.querySelector(".theme");
    const body = document.body;
    const characterLimitInput = document.getElementById("character-limit");
    const characterLimitCheckbox = document.querySelector(
        ".char-limit input[type='checkbox']"
    );

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

    const themeIcon = document.createElement("img");
    themeIcon.alt = "Theme Toggle Icon";
    themeToggleButton.appendChild(themeIcon); // Append the icon to the button

    const setTheme = (theme) => {
        body.classList.remove("light-theme", "dark-theme");
        body.classList.add(theme);
        
        logoImage.src =
            theme === "dark-theme"
                ? "./assets/images/logo-dark-theme.svg"
                : "./assets/images/logo-light-theme.svg";

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
            errorMessage.classList.add("fade-in"); // Add animation class
        } else {
            errorMessage.style.opacity = 0; // Fade out effect
            setTimeout(() => {
                errorMessage.style.display = "none"; // Hide after fade out
            }, 300); // Match duration of the CSS transition
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
                <div class="progress-bar">
                    <div class="progress-width" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">${count} (${percentage}%)</div>
            `;
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