import '@testing-library/jest-dom';

// Mock any global browser APIs if needed
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};