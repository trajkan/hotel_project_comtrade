import { createCard } from './card.js';
import { filteredRooms } from './filters.js';
document.addEventListener('DOMContentLoaded', async function() {

    const fromDate = sessionStorage.getItem('fromDate');
    const toDate = sessionStorage.getItem('toDate');
    const numPersons = sessionStorage.getItem('numPersons');
    let rooms = await fetchData();
    creatHeader(rooms);
    createCards(rooms);

    

    async function fetchData(){
        try{
            const response = await fetch('../../data/rooms.json');
            const result = await response.json();
            const filtRooms = filteredRooms(result.rooms, fromDate, toDate, numPersons);
            return filtRooms;
        } catch(err){
            console.error(err);
        }
    }

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






