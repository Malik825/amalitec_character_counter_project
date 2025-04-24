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
} from "./functions.js";

/**
 * @jest-environment jsdom
 */

describe("Text Analysis Functions", () => {
  describe("countCharacters", () => {
    test("counts characters including spaces when excludeSpaces is false", () => {
      expect(countCharacters("hello", false)).toBe(5);
      expect(countCharacters("hello world", false)).toBe(11);
      expect(countCharacters("  hello  ", false)).toBe(9);
      expect(countCharacters("", false)).toBe(0);
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

  describe("countSentences", () => {
    test("counts sentences with standard punctuation", () => {
      expect(countSentences("Hello. World!")).toBe(2);
      expect(countSentences("Is this a test? Yes! It is.")).toBe(3);
      expect(countSentences("First... Second... Third!")).toBe(3);
    });

    test("counts single sentence without ending punctuation", () => {
      expect(countSentences("Hello world")).toBe(1);
      expect(countSentences("This is a test")).toBe(1);
    });

    test("returns 0 for empty strings or strings without sentence content", () => {
      expect(countSentences("")).toBe(0);
      expect(countSentences("   ")).toBe(0);
      expect(countSentences("... ! ?")).toBe(0);
    });

    // test("handles complex cases with abbreviations", () => {
    //   expect(countSentences("Dr. Smith is here. Mr. Jones too!")).toBe(2);
    //   expect(countSentences("This is a test... wait, no!")).toBe(2);
    // });
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
    test("returns 'ok' when under limit", () => {
      expect(checkCharacterLimit(5, 10)).toEqual({
        status: "ok",
        remaining: 5,
      });
      expect(checkCharacterLimit(90, 100)).toEqual({
        status: "ok",
        remaining: 10,
      });
    });

    test("returns 'warning' when within 10% of limit", () => {
      expect(checkCharacterLimit(91, 100)).toEqual({
        status: "warning",
        remaining: 9,
      });
      expect(checkCharacterLimit(99, 100)).toEqual({
        status: "warning",
        remaining: 1,
      });
    });

    test("returns 'limit-reached' when exactly at limit", () => {
      expect(checkCharacterLimit(100, 100)).toEqual({
        status: "limit-reached",
        remaining: 0,
        exceededBy: 0,
      });
    });

    test("returns 'limit-exceeded' when over limit", () => {
      expect(checkCharacterLimit(101, 100)).toEqual({
        status: "limit-exceeded",
        remaining: 0,
        exceededBy: 1,
      });
      expect(checkCharacterLimit(150, 100)).toEqual({
        status: "limit-exceeded",
        remaining: 0,
        exceededBy: 50,
      });
    });

    test("handles null limit (no limit)", () => {
      expect(checkCharacterLimit(50, null)).toEqual({
        status: "ok",
        remaining: null,
      });
      expect(checkCharacterLimit(1000, null)).toEqual({
        status: "ok",
        remaining: null,
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
      test("updates element text and applies animation styles when values differ", () => {
        animateCounter(mockElement, 5, 10);
        
        // Immediate style changes
        expect(mockElement.style.transform).toBe("translateY(-5px)");
        expect(mockElement.style.opacity).toBe("0.5");
        expect(mockElement.style.transition).toBe("all 0.3s ease");
        
        // Final value is set (even if animation hasn't completed)
        expect(mockElement.textContent).toBe("10");
      });

      test("updates text without animation when values are equal", () => {
        animateCounter(mockElement, 5, 5);
        expect(mockElement.textContent).toBe("5");
        expect(mockElement.style.transform).toBe("");
        expect(mockElement.style.opacity).toBe("");
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
});