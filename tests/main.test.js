import {
    countCharacters,
    countWords,
    countSentences,
    calculateReadingTime,
    checkCharacterLimit,
    calculateLetterFrequency
  } from '../test/main.js';
  
  describe('Text Analyzer Functions', () => {
    test('countCharacters counts correctly', () => {
      expect(countCharacters('hello')).toBe(5);
      expect(countCharacters('hello world')).toBe(11);
      expect(countCharacters('hello world', true)).toBe(10);
    });
  
    test('countWords counts correctly', () => {
      expect(countWords('hello world')).toBe(2);
      expect(countWords('')).toBe(0);
      expect(countWords('  extra   spaces  ')).toBe(2);
    });
  
    test('countSentences counts correctly', () => {
      expect(countSentences('Hello. World!')).toBe(2);
      expect(countSentences('Is this a test? Yes.')).toBe(2);
      expect(countSentences('Hello.. World!')).toBe(2);
    });
  
    test('calculateReadingTime works', () => {
      expect(calculateReadingTime(200)).toBe('1 minute');
      expect(calculateReadingTime(400)).toBe('2 minutes');
      expect(calculateReadingTime(50)).toBe('Less than 1 minute');
    });
  
    test('checkCharacterLimit works', () => {
      // No limit
      expect(checkCharacterLimit(10, null)).toEqual({ status: 'ok' });
      
      // Under limit
      expect(checkCharacterLimit(5, 10)).toEqual({ status: 'ok' });
      
      // Warning threshold
      expect(checkCharacterLimit(9, 10)).toEqual({
        status: 'warning',
        message: 'Warning: Only 1 characters remaining'
      });
      
      // At limit
      expect(checkCharacterLimit(10, 10)).toEqual({
        status: 'error',
        message: 'Character limit of 10 reached!'
      });
      
      // Over limit
      expect(checkCharacterLimit(12, 10)).toEqual({
        status: 'error',
        message: 'Character limit of 10 exceeded by 2'
      });
    });
  
    test('calculateLetterFrequency works', () => {
      const result = calculateLetterFrequency('hello');
      expect(result).toEqual([
        { char: 'l', count: 2, percent: '40.00' },
        { char: 'h', count: 1, percent: '20.00' },
        { char: 'e', count: 1, percent: '20.00' },
        { char: 'o', count: 1, percent: '20.00' }
      ]);
    });
  });