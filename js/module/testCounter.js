// textCounterUtils.js

// Counting functions
function countCharacters(text, excludeSpaces) {
    return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
  }
  
  function countWords(text) {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  }
  
  function countSentences(text) {
    return text.trim() === "" 
      ? 0 
      : text.split(/[.?!]/).filter((s) => s.trim().length > 0).length;
  }
  
  // Reading time calculation
  function calculateReadingTime(words) {
    const minutes = Math.ceil(words / 200);
    return minutes > 0
      ? `${minutes} minute${minutes !== 1 ? "s" : ""}`
      : "Less than 1 minute";
  }
  
  // Character limit checking
  function checkCharacterLimit(chars, limit) {
    const remaining = limit - chars;
    const warningThreshold = Math.floor(limit * 0.1);
  
    if (chars >= limit) {
      return {
        type: "error",
        message: chars === limit
          ? `Character limit of ${limit} reached!`
          : `Character limit of ${limit} exceeded by ${chars - limit}`,
      };
    } else if (remaining <= warningThreshold) {
      return {
        type: "warning",
        message: `Warning: Only ${remaining} characters remaining`,
      };
    }
    return null;
  }
  
  // Letter frequency analysis
  function analyzeLetterFrequency(text) {
    const cleanText = text.toLowerCase().replace(/[^a-z]/g, "");
    const letters = {};
  
    for (let char of cleanText) {
      letters[char] = (letters[char] || 0) + 1;
    }
  
    const sortedLetters = Object.entries(letters)
      .map(([char, count]) => ({
        char,
        count,
        percent: cleanText.length > 0 
          ? ((count / cleanText.length) * 100).toFixed(2) 
          : "0.00",
      }))
      .sort((a, b) => b.count - a.count);
  
    return sortedLetters;
  }
  
  // Theme functions
  function getCurrentTheme() {
    return localStorage.getItem("theme") || "light-theme";
  }
  
  function toggleTheme(currentTheme) {
    return currentTheme === "light-theme" ? "dark-theme" : "light-theme";
  }
  
  function getThemeIcon(currentTheme) {
    return currentTheme === "light-theme"
      ? "./assets/images/icon-moon.svg"
      : "./assets/images/icon-sun.svg";
  }
  
  // Export all functions
  export {
    countCharacters,
    countWords,
    countSentences,
    calculateReadingTime,
    checkCharacterLimit,
    analyzeLetterFrequency,
    getCurrentTheme,
    toggleTheme,
    getThemeIcon
  };