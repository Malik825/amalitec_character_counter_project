// Count characters (with/without spaces)
export function countCharacters(text, excludeSpaces = false) {
    return excludeSpaces ? text.replace(/\s/g, '').length : text.length;
  }
  
  // Count words (handles multiple spaces)
  export function countWords(text) {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  }
  
  // Count sentences
  export function countSentences(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.length;
  }