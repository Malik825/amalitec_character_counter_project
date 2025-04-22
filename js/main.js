import { setupCounter } from "./module/counter.js";
import { setupLimitChecker } from "./module/limitChecker.js";

// Get DOM elements once
const elements = {
  textInput: document.getElementById("text-input"),
  charCountEl: document.getElementById("character-count"),
  wordCountEl: document.getElementById("word-count"),
  sentenceCountEl: document.getElementById("sentence-count"),
  excludeSpaces: document.getElementById("exclude-spaces"),
  limitInput: document.getElementById("character-limit"),
  limitCheckbox: document.querySelector(".limit-checkbox"),
  messageEl: document.createElement("div"),
};

// Create message container
elements.messageEl.className = "counter-message";
document.querySelector(".counter-container").appendChild(elements.messageEl);

// Initialize features
document.addEventListener("DOMContentLoaded", () => {
  const counter = setupCounter(elements);
  const limitChecker = setupLimitChecker(elements);

  // Connect counter to limit checker
  elements.textInput.addEventListener("input", () => {
    const { chars } = counter.updateAll();
    limitChecker.checkLimit(chars);
  });
});
