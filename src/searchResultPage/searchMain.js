import { createCard } from './card.js';
import { fetchData } from '../api/search.js';

document.addEventListener('DOMContentLoaded', async function() {

    const fromDate = sessionStorage.getItem('fromDate');
    const toDate = sessionStorage.getItem('toDate');
    const numPersons = sessionStorage.getItem('numPersons');
    let rooms = await fetchData(fromDate, toDate, numPersons);
    creatHeader(rooms);
    createCards(rooms);

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
});






