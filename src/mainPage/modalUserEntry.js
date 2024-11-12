import { validateSignInForm, validateSignUpForm } from './validation.js';
import { signUpUser, signInUser } from '../api/auth.js';
import { createModal } from '../utils/baseModal.js';

export function initializeSignInOut() {
    const signInElement = document.getElementById('signInElement');
    const signOutElement = document.getElementById('signOutElement');
    console.log('Sign-in element:', signInElement);
    console.log('Sign-out element:', signOutElement);

    if (signInElement) {
        signInElement.addEventListener('click', (event) => {
            event.preventDefault();
            signInModal(); // Open the sign-in modal
        });
    }

    if (signOutElement) {
        signOutElement.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('currentUser'); // Sign out the user
            toggleSignInOut(); // Update visibility
            console.log('User signed out successfully');
        });
    }
}

export function toggleSignInOut() {
    const currentUser = sessionStorage.getItem('currentUser');
    const signInElement = document.getElementById('signInElement');
    const signOutElement = document.getElementById('signOutElement');

    if (signInElement && signOutElement) {
        if (currentUser) {
            signInElement.classList.add('d-none');
            signOutElement.classList.remove('d-none');
        } else {
            signInElement.classList.remove('d-none');
            signOutElement.classList.add('d-none');
        }
    }
}

function signInModal() {
    // Close any existing sign-in modal before opening a new one
    const existingSignInModal = document.getElementById('signInModal');
    if (existingSignInModal) {
        const closeButton = existingSignInModal.querySelector('.btn-close');
        if (closeButton) closeButton.click();
    }

    // Create and show the sign-in modal
    createModal({
        id: 'signInModal',
        title: 'Sign In',
        bodyContent: `
            <div id="signInErrorMessage" class="alert alert-danger d-none" role="alert">
                <!-- Error messages will appear here -->
            </div>
            <form id="signInForm">
                <div class="mb-3">
                    <input type="email" class="form-control" id="email" placeholder="Email Address..." required>
                    <div class="invalid-feedback">Please enter a valid email.</div>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="password-sign-in" placeholder="Password..." required>
                    <div class="invalid-feedback">Password must be at least 6 characters long.</div>
                </div>
            </form>
            <div class="text-center mt-3">
                <p class="mb-1">Don't have an account?</p>
                <a href="#" class="text-primary" id="signUpLink">Sign Up</a>
            </div>
        `,
        footerButtons: [
            { type: 'button', class: 'btn-secondary', text: 'Cancel', dataDismiss: 'modal' },
            { type: 'submit', class: 'btn-primary', text: 'Sign In', form: 'signInForm' }
        ],
        onModalShow: () => {
            const signInForm = document.getElementById('signInForm');
            signInForm.addEventListener('submit', async function(event) {
                console.log('Sign-in form submitted');
                event.preventDefault();
                if (validateSignInForm()) {
                    const email = document.getElementById('email').value;
                    const password = document.getElementById('password-sign-in').value;

                    const result = await signInUser(email, password);
                    if (result.success) {
                        console.log('User signed in successfully:', result.user);
                        sessionStorage.setItem("currentUser", JSON.stringify(result.user));
                        toggleSignInOut();
                        const bootstrapModal = bootstrap.Modal.getInstance(document.getElementById('signInModal'));
                        bootstrapModal.hide();
                    } else {
                        console.log('User sign-in failed:', result.message);
                        const errorMessage = document.getElementById('signInErrorMessage');
                        if (errorMessage) {
                            errorMessage.textContent = result.message;
                            errorMessage.classList.remove('d-none');  // Make sure it's visible
                        }
                    }
                } else {
                    console.log('Sign-in form validation failed');
                }
            });
            // Attach the sign-up listener after the modal is shown
            const signUpLink = document.getElementById('signUpLink');
            signUpLink.addEventListener('click', function(event) {
                event.preventDefault();
                signUpModal();
            });
        }
    });
}

function signUpModal() {
    // Close the sign-in modal before opening the sign-up modal
    const signInModal = document.getElementById('signInModal');
    if (signInModal) {
        const closeButton = signInModal.querySelector('.btn-close');
        if (closeButton) closeButton.click();
    }

    // Create and show the sign-up modal
    createModal({
        id: 'signUpModal',
        title: 'Sign Up',
        bodyContent: `
            <form id="signUpForm">
                <div class="mb-3">
                    <input type="text" class="form-control" id="firstName" placeholder="First Name" required>
                    <div class="invalid-feedback">First name is required.</div>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" id="lastName" placeholder="Last Name" required>
                    <div class="invalid-feedback">Last name is required.</div>
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" id="signUpEmail" placeholder="Email Address" required>
                    <div class="invalid-feedback">Please enter a valid email.</div>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="password-sign-up" placeholder="Password" required>
                    <div class="invalid-feedback">Password must be at least 6 characters long.</div>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" required>
                    <div class="invalid-feedback">Passwords do not match.</div>
                </div>
            </form>
        `,
        footerButtons: [
            { type: 'button', class: 'btn-secondary', text: 'Close', dataDismiss: 'modal' },
            { type: 'submit', class: 'btn-primary', text: 'Sign Up', form: 'signUpForm' }
        ],
        onModalShow: () => {
            const signUpForm = document.getElementById('signUpForm');
            signUpForm.addEventListener('submit', async function(event) {
                event.preventDefault();
                if (validateSignUpForm()) {
                    console.log('Sign-up form validated successfully');
                    // Submit form or handle success here
                    const userData = {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        email: document.getElementById('signUpEmail').value,
                        password: document.getElementById('password-sign-up').value,
                        bookings: []
                    };
                    const result = await signUpUser(userData);
                    if (result) {
                        console.log('User signed up successfully:', result);
                        // Proceed with form submission or additional processing
                    } else {
                        console.log('User sign-up failed');
                    }
                } else {
                    console.log('Sign-up form validation failed');
                }
            });
            // Add the hidden.bs.modal event listener to clean up on close
            const modalElement = document.getElementById('signUpModal');
            modalElement.addEventListener('hidden.bs.modal', function() {
                modalElement.remove();
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
            });
        }
    });
}

// function createModal({ id, title, bodyContent, footerButtons, onModalShow }) {
//     // Check if modal already exists
//     if (!document.getElementById(id)) {
//         const modalHtml = `
//             <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
//                 <div class="modal-dialog">
//                     <div class="modal-content">
//                         <div class="modal-header">
//                             <h5 class="modal-title" id="${id}Label">${title}</h5>
//                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div class="modal-body">
//                             ${bodyContent}
//                         </div>
//                         <div class="modal-footer">
//                             ${footerButtons.map(button => `
//                                 <button type="${button.type}" class="btn ${button.class}" ${button.dataDismiss ? `data-bs-dismiss="${button.dataDismiss}"` : ''} ${button.form ? `form="${button.form}"` : ''}>${button.text}</button>
//                             `).join('')}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//         document.body.insertAdjacentHTML('beforeend', modalHtml);
//     }


//     const modalElement = document.getElementById(id);
//     const bootstrapModal = new bootstrap.Modal(modalElement);
//     bootstrapModal.show();

//     if (onModalShow) onModalShow();
// }

