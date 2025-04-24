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
  updateThemeIcon,
  toggleTheme
} from "../js/functions.js";

/**
 * @jest-environment jsdom
 */

describe("Text Analysis Functions", () => {
  describe("countCharacters", () => {
    test("counts characters including spaces when excludeSpaces is false", () => {
      // Basic cases
      expect(countCharacters("hello", false)).toBe(5);
      expect(countCharacters("hello world", false)).toBe(11);
      
      // Edge cases
      expect(countCharacters("  hello  ", false)).toBe(9);
      expect(countCharacters("", false)).toBe(0);
      expect(countCharacters("h@llo w0rld!", false)).toBe(12);
      expect(countCharacters("hello\tworld\nnewline", false)).toBe(19); // Counts \t and \n as 1 char each

      
      // Stress test
      const longString = "a".repeat(10000);
      expect(countCharacters(longString, false)).toBe(10000);
      
      // Invalid inputs
      expect(countCharacters(null, false)).toBe(0);
      expect(countCharacters(undefined, false)).toBe(0);
    });
  
    test("counts characters excluding spaces when excludeSpaces is true", () => {
      expect(countCharacters("hello", true)).toBe(5);
      expect(countCharacters("hello world", true)).toBe(10);
      expect(countCharacters("  h e l l o  ", true)).toBe(5);
      expect(countCharacters("   ", true)).toBe(0);
    });
  
    test("handles special characters and numbers", () => {
      expect(countCharacters("123!@#", false)).toBe(6);
      expect(countCharacters("123!@#", true)).toBe(6);
    });
  });

  describe("countWords", () => {
    test("counts words in normal strings", () => {
      expect(countWords("hello")).toBe(1);
      expect(countWords("hello world")).toBe(2);
      expect(countWords("one two three four")).toBe(4);
    });

    test("handles multiple spaces between words", () => {
      expect(countWords("hello   world")).toBe(2);
      expect(countWords("  hello   world  ")).toBe(2);
      expect(countWords("   a   b   c   ")).toBe(3);
    });

    test("returns 0 for empty strings or strings with only spaces", () => {
      expect(countWords("")).toBe(0);
      expect(countWords("   ")).toBe(0);
      expect(countWords("\n\t")).toBe(0);
    });

    test("handles punctuation attached to words", () => {
      expect(countWords("hello, world!")).toBe(2);
      expect(countWords("test... this")).toBe(2);
    });
  });

  describe('countSentences', () => {
    test('returns 0 for empty string', () => {
      expect(countSentences('')).toBe(0);
    });
  
    test('returns 0 for whitespace-only string', () => {
      expect(countSentences('   ')).toBe(0);
      expect(countSentences('\n\t')).toBe(0);
    });
  
    test('counts basic sentences', () => {
      expect(countSentences('Hello. World!')).toBe(2);
      expect(countSentences('Is this a test? Yes! It is.')).toBe(3);
    });
  
    test('handles sentences without ending punctuation', () => {
      expect(countSentences('Hello world')).toBe(1);
      expect(countSentences('This is a test')).toBe(1);
    });
  
    test('handles multiple punctuation marks', () => {
      expect(countSentences('Wait... Really?!')).toBe(2);
      expect(countSentences('First... Second... Third!')).toBe(3);
    });
  
    test('handles abbreviations (Dr., Mr., etc.)', () => {
      expect(countSentences('Dr. Smith is here. Mr. Jones left.')).toBe(2);
      expect(countSentences('Please contact Prof. Johnson.')).toBe(1);
    });
  
  
  
    test('handles mixed content', () => {
      expect(countSentences('Hello! How are you? I am fine.')).toBe(3);
      expect(countSentences('Test... test? Test!')).toBe(3);
    });
  
  
  });

  describe("calculateReadingTime", () => {
    test("returns 'Less than 1 minute' for 0 words", () => {
      expect(calculateReadingTime(0)).toBe("Less than 1 minute");
    });

    test("returns singular minute for exactly 200 words", () => {
      expect(calculateReadingTime(200)).toBe("1 minute");
    });

    test("returns plural minutes for more than 200 words", () => {
      expect(calculateReadingTime(201)).toBe("2 minutes");
      expect(calculateReadingTime(400)).toBe("2 minutes");
      expect(calculateReadingTime(401)).toBe("3 minutes");
    });

    test("rounds up to nearest minute", () => {
      expect(calculateReadingTime(1)).toBe("1 minute");
      expect(calculateReadingTime(199)).toBe("1 minute");
      expect(calculateReadingTime(200)).toBe("1 minute");
      expect(calculateReadingTime(201)).toBe("2 minutes");
    });
  });

  describe("analyzeLetterFrequency", () => {
    test("analyzes letter frequency correctly", () => {
      const result = analyzeLetterFrequency("hello");
      expect(result).toEqual([
        { char: "l", count: 2, percent: "40.00" },
        { char: "h", count: 1, percent: "20.00" },
        { char: "e", count: 1, percent: "20.00" },
        { char: "o", count: 1, percent: "20.00" },
      ]);
    });

    test("ignores non-alphabetic characters", () => {
      const result = analyzeLetterFrequency("h1e2l3l4o!");
      expect(result).toEqual([
        { char: "l", count: 2, percent: "40.00" },
        { char: "h", count: 1, percent: "20.00" },
        { char: "e", count: 1, percent: "20.00" },
        { char: "o", count: 1, percent: "20.00" },
      ]);
    });

    test("returns empty array for empty string or no letters", () => {
      expect(analyzeLetterFrequency("")).toEqual([]);
      expect(analyzeLetterFrequency("123!@#")).toEqual([]);
    });

    test("is case insensitive", () => {
      const result = analyzeLetterFrequency("Hello HELLO");
      expect(result).toEqual([
        { char: "l", count: 4, percent: "40.00" },
        { char: "h", count: 2, percent: "20.00" },
        { char: "e", count: 2, percent: "20.00" },
        { char: "o", count: 2, percent: "20.00" },
      ]);
    });
  });

  describe("checkCharacterLimit", () => {
    test("returns 'ok' when 10% or more remaining", () => {
      expect(checkCharacterLimit(90, 100)).toEqual({
        status: "ok",
        remaining: 10,
      });
      expect(checkCharacterLimit(91, 100)).toEqual({
        status: "ok",
        remaining: 9,
      });
    });
    
    test("returns 'warning' when less than 10% remaining", () => {
      expect(checkCharacterLimit(95, 100)).toEqual({
        status: "warning",
        remaining: 5,
      });
    });
  });

  describe("Animation Helpers", () => {
    let mockElement;

    beforeAll(() => {
      // Set up our document body
      document.body.innerHTML = `
        <div id="test-element"></div>
      `;
    });

    beforeEach(() => {
      // Reset mock element before each test
      mockElement = document.getElementById("test-element");
      mockElement.innerHTML = "";
      mockElement.style = {};
    });

    describe("animateCounter", () => {
      test("immediately updates text content", () => {
        animateCounter(mockElement, 5, 10);
        expect(mockElement.textContent).toBe("10"); // Now passes
      });
    });

    describe("animateColorChange", () => {
      test("applies color transition style", () => {
        animateColorChange(mockElement, "red");
        expect(mockElement.style.transition).toBe("color 0.5s ease");
        expect(mockElement.style.color).toBe("red");
      });
    });

    describe("animateMessage", () => {
      test("shows message with animation when show is true", () => {
        animateMessage(mockElement, true);
        
        // Immediate style changes
        expect(mockElement.style.display).toBe("flex");
        expect(mockElement.style.opacity).toBe("0");
        expect(mockElement.style.transform).toBe("translateY(-10px)");
        expect(mockElement.style.transition).toBe("all 0.3s ease");
        
        // Verify the timeout behavior (using Jest fake timers)
        jest.useFakeTimers();
        animateMessage(mockElement, true);
        jest.advanceTimersByTime(20); // Advance past the 10ms timeout
        
        expect(mockElement.style.opacity).toBe("1");
        expect(mockElement.style.transform).toBe("translateY(0)");
        jest.useRealTimers();
      });

      test("hides message with animation when show is false", () => {
        // First show the element
        mockElement.style.display = "flex";
        mockElement.style.opacity = "1";
        mockElement.style.transform = "translateY(0)";
        
        animateMessage(mockElement, false);
        
        // Immediate style changes
        expect(mockElement.style.opacity).toBe("0");
        expect(mockElement.style.transform).toBe("translateY(-10px)");
        
        // Verify the timeout behavior
        jest.useFakeTimers();
        animateMessage(mockElement, false);
        jest.advanceTimersByTime(310); // Advance past the 300ms timeout
        
        expect(mockElement.style.display).toBe("none");
        jest.useRealTimers();
      });
    });
  });
  describe("Theme Functionality", () => {
    let mockLocalStorage;
    let originalBodyClass;
    let mockThemeIcon;
  
    beforeEach(() => {
      // Store original body class
      originalBodyClass = document.body.className;
      
      // Mock localStorage
      mockLocalStorage = {};
      global.localStorage = {
        getItem: jest.fn((key) => mockLocalStorage[key]),
        setItem: jest.fn((key, value) => { mockLocalStorage[key] = value; })
      };
  
      // Mock theme icon
      mockThemeIcon = {
        src: '',
        style: {
          transform: '',
          transition: ''
        },
        updateThemeIcon: updateThemeIcon // Attach the function to the mock
      };
    });
  
    afterEach(() => {
      // Restore original body class
      document.body.className = originalBodyClass;
      jest.clearAllMocks();
    });
  
  
  
    describe("updateThemeIcon", () => {
      test("sets moon icon for light theme", () => {
        updateThemeIcon.call(mockThemeIcon, "light-theme");
        expect(mockThemeIcon.src).toBe("./assets/images/icon-moon.svg");
      });
  
      test("sets sun icon for dark theme", () => {
        updateThemeIcon.call(mockThemeIcon, "dark-theme");
        expect(mockThemeIcon.src).toBe("./assets/images/icon-sun.svg");
      });
    });
  
    
});
})