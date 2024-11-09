import { createCard } from './card.js';
document.addEventListener('DOMContentLoaded', function() {

    const fromDate = sessionStorage.getItem('fromDate');
    const toDate = sessionStorage.getItem('toDate');
    const numPersons = sessionStorage.getItem('numPersons');
    let rooms = fetchData();
    console.log('rooms', rooms);
    createCards(rooms);

    

    async function fetchData(){
        const imagePath = '../../images/rooms/';
        try{
            const response = await fetch('../../data/rooms.json');
            const result = await response.json();
            const filtRooms = filteredRooms(result.rooms, fromDate, toDate, numPersons);
            console.log('rooms', filtRooms);
            return filtRooms;
        } catch(err){
            console.error(err);
        }
    }

    function createCards(rooms){
        const cardContainer = document.querySelector('.card-container');
        rooms.forEach(room => {
            const card = createCard(room);
            cardContainer.appendChild(card);
        });
    }


});




function filteredRooms(rooms, fromDate, toDate, numPersons){
    const filteredRooms = rooms.filter(room => {
        return room.maxOccupancy >= numPersons;
    });
    return filteredRooms;
}

