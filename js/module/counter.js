export function countChars(text, excludeSpaces = false) {
    return excludeSpaces ? text.replace(/\s/g, '').length : text.length;
  }
  
  export function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }
  
  export function countSentences(text) {
    return text.trim() ? text.split(/[.?!]+/).filter(s => s.trim()).length : 0;
  }