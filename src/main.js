import { initializeCarousel } from "./mainPage/carousel.js";
import { initializePersonSelector } from "./mainPage/personSelector.js";
import { initializeDateInput } from "./mainPage/datePicker.js";
import { addSearchButtonListener } from "./mainPage/searchButton.js";
import { initializeSignInOut, toggleSignInOut } from "./mainPage/modalUserEntry.js";

document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializePersonSelector(6);
    initializeDateInput();
    addSearchButtonListener();
    initializeSignInOut();
    toggleSignInOut();
});
