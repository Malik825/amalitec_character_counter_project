import { countCharacters, countWords, countSentences } from '../helpers/counters';
import { animateCounter } from '../helpers/animations';

export function setupCounter(elements) {
  function updateAll() {
    const text = elements.textInput.value;
    const excludeSpaces = elements.excludeSpaces.checked;
    
    // Update counts
    const chars = countCharacters(text, excludeSpaces);
    const words = countWords(text);
    const sentences = countSentences(text);
    
    // Display with animation
    animateCounter(elements.charCountEl, chars);
    animateCounter(elements.wordCountEl, words);
    animateCounter(elements.sentenceCountEl, sentences);
    
    return { chars, words, sentences };
  }

  // Set up event listeners
  elements.textInput.addEventListener('input', updateAll);
  elements.excludeSpaces.addEventListener('change', updateAll);

  // Initial update
  updateAll();
}