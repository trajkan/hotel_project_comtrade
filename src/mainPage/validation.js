export function validateSignInForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password-sign-in');
    let valid = true;

    if (!email.value || !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('is-invalid');
        valid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    if (!password.value) {
        password.classList.add('is-invalid');
        valid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    return valid;
}

export function validateSignUpForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('signUpEmail');
    const password = document.getElementById('password-sign-up');
    const confirmPassword = document.getElementById('confirmPassword');
    let isValid = true;

    if (!firstName.value) {
        firstName.classList.add('is-invalid');
        isValid = false;
    } else {
        firstName.classList.remove('is-invalid');
    }

    if (!lastName.value) {
        lastName.classList.add('is-invalid');
        isValid = false;
    } else {
        lastName.classList.remove('is-invalid');
    }

    if (!email.value || !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    if (!password.value) {
        console.log('Password is empty', password.value);
        password.classList.add('is-invalid');
        isValid = false;
    } else if (password.value.length < 6) {
        console.log('Password is too short');
        password.classList.add('is-invalid');
        password.nextElementSibling.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
        password.nextElementSibling.textContent = ''; // Clear any previous error message
    }

    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        isValid = false;
    } else {
        confirmPassword.classList.remove('is-invalid');
    }

    return isValid;
}