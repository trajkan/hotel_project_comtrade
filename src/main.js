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

// function toggleSignInOut() {
//     const currentUser = sessionStorage.getItem('currentUser');
//     const signInElement = document.getElementById('signInElement');
//     const signOutElement = document.getElementById('signOutElement');
//     console.log('Current user:', currentUser);
//     console.log('Sign-in element:', signInElement);
//     console.log('Sign-out element:', signOutElement);
//     if (currentUser) {
//         console.log('User signed in:', currentUser);
//         signInElement.classList.add('d-none');
//         signOutElement.classList.remove('d-none');
//     } else {
//         signInElement.classList.remove('d-none');
//         signOutElement.classList.add('d-none');
//     }
// }

// // Sign-out functionality
// const signOutElement = document.getElementById('signOutElement');
// if (signOutElement) {
//     signOutElement.addEventListener('click', () => {
//         sessionStorage.removeItem('currentUser');
//         toggleSignInOut();
//         console.log('User signed out successfully');
//     });
// } else {
//     console.error('Sign-out element not found in the DOM.');
// }
