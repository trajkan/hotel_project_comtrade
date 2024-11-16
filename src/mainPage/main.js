import { initializeCarousel } from "./carousel.js";
import { initializePersonSelector } from "./personSelector.js";
import { initializeDateInput } from "./datePicker.js";
import { addSearchButtonListener } from "./searchButton.js";
import { initializeSignInOut, toggleSignInOut } from "./modalUserEntry.js";

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializePersonSelector(6);
    initializeDateInput();
    addSearchButtonListener();
    initializeSignInOut();
    toggleSignInOut();
});
