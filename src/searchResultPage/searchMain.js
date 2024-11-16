import { createCard } from './card.js';
import { fetchData } from '../api/search.js';

document.addEventListener('DOMContentLoaded', async function() {

    const fromDate = sessionStorage.getItem('fromDate');
    const toDate = sessionStorage.getItem('toDate');
    const numPersons = sessionStorage.getItem('numPersons');
    let rooms = await fetchData(fromDate, toDate, numPersons);
    creatHeader(rooms);
    createCards(rooms);
    updateBookNowButtons();

    function creatHeader(rooms){
        const header = document.querySelector('header');
        const h1 = document.createElement('h1');
        h1.innerText = `Found ${rooms.length} Available Rooms`;
        header.appendChild(h1);
    }
    function createCards(rooms){
        const cardContainer = document.querySelector('.card-container');
        rooms.forEach(room => {
            const card = createCard(room);
            cardContainer.appendChild(card);
        });
    }
    function updateBookNowButtons() {
        const currentUser = sessionStorage.getItem('currentUser');
        const bookNowButtons = document.querySelectorAll('.book-now-btn');

        console.log('Current User:', currentUser);
        console.log('Book Now Buttons:', bookNowButtons);
    
        bookNowButtons.forEach(button => {
            if (currentUser) {
                console.log('User is signed in');
                button.disabled = false;
                button.textContent = 'Book Now';
            } else {
                console.log('User is not signed in');
                button.disabled = true;
                button.textContent = 'Sign in to book';
            }
        });
    }
});






