import { createModal } from "../utils/baseModal.js";

export function initializeProfileModal() {
    const profileIconButton = document.getElementById('profileIconButton');
    if (profileIconButton) {
        profileIconButton.addEventListener('click', (event) => {
            event.preventDefault();
            profileModal();
        });
    }
}


export function updateProfileIcon() {
    const currentUser = sessionStorage.getItem('currentUser');
    const profileIconContainer = document.getElementById('profileIconContainer');

    if (profileIconContainer) {
        if (currentUser) {
            profileIconContainer.style.display = 'block';
        } else {
            profileIconContainer.style.display = 'none';
        }
    }
}

export function profileModal() {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // if (currentUser) {
    //     document.getElementById('profileFirstName').textContent = currentUser.firstName;
    //     document.getElementById('profileLastName').textContent = currentUser.lastName;
    //     document.getElementById('profileEmail').textContent = currentUser.email;
    // }
    const existingProfileModal = document.getElementById('profileModal');
    if (existingProfileModal) {
        existingProfileModal.remove();
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    }

    createModal({
        id: 'profileModal',
        title: 'Your Profile',
        bodyContent: `
            <div>
                <p><strong>First Name:</strong> <span id="profileFirstName"></span></p>
                <p><strong>Last Name:</strong> <span id="profileLastName"></span></p>
                <p><strong>Email:</strong> <span id="profileEmail"></span></p>
            </div>
        `,
        footerButtons: [
            { type: 'button', class: 'btn-secondary', text: 'Close', dataDismiss: 'modal' }
        ],
        onModalShow: () => {
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            if (currentUser) {
                document.getElementById('profileFirstName').textContent = currentUser.firstName;
                document.getElementById('profileLastName').textContent = currentUser.lastName;
                document.getElementById('profileEmail').textContent = currentUser.email;
            }
        }
    });
}

// Initialize profile icon and modal
document.addEventListener('DOMContentLoaded', () => {
    updateProfileIcon();
    initializeProfileModal();

    // const profileIconButton = document.getElementById('profileIconButton');
    // if (profileIconButton) {
    //     profileIconButton.addEventListener('click', showProfileModal);
    // }
});