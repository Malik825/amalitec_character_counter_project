export function setupCounter(elements) {
    let state = {
      lastCharCount: 0,
      lastWordCount: 0,
      lastSentenceCount: 0
    };
  
    function countCharacters(text, excludeSpaces) {
      return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
    }
  
    function countWords(text) {
      return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    }
  
    function countSentences(text) {
      return text.trim() === "" ? 0 : text.split(/[.?!]/).filter(s => s.trim().length > 0).length;
    }
  
    function updateAll() {
      const text = elements.textInput.value;
      const excludeSpaces = elements.excludeSpaces.checked;
      
      // Update counts
      const chars = updateCharCount(text, excludeSpaces);
      const words = updateWordCount(text);
      const sentences = updateSentenceCount(text);
      
      // Update reading time
      updateReadingTime(words);
    }
  
    function updateCharCount(text, excludeSpaces) {
      const chars = countCharacters(text, excludeSpaces);
      elements.animateCounter(elements.charCountEl, state.lastCharCount, chars);
      state.lastCharCount = chars;
      return chars;
    }
  
    // ... other update functions
  
    return {
      init: function() {
        elements.textInput.addEventListener("input", updateAll);
        elements.excludeSpaces.addEventListener("change", updateAll);
        updateAll();
      },
      counexport function setupLimitChecker(elements) {
        function checkLimit(chars, limit) {
          const remaining = limit - chars;
          const warningThreshold = Math.floor(limit * 0.1);
      
          if (chars >= limit) {
            showError(chars === limit 
              ? `Character limit of ${limit} reached!` 
              : `Character limit of ${limit} exceeded by ${chars - limit}`
            );
            return false;
          } 
          else if (remaining <= warningThreshold) {
            showWarning(`Warning: Only ${remaining} characters remaining`);
            return true;
          }
          resetMessages();
          return true;
        }
      
        function showError(message) {
          elements.errorEl.textContent = message;
          elements.animateMessage(elements.errorEl, true);
          elements.textInput.classList.add("error-border");
        }
      
        // ... other helper functions
      
        return {
          checkLimit,
          showError,
          showWarning,
          resetMessages
        };
      }tCharacters, // Expose for testing
      countWords,
      countSentences
    };
  }