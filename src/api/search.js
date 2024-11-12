import { filteredRooms } from '../searchResultPage/filters.js';

export async function fetchData(fromDate, toDate, numPersons){
    try{
        const response = await fetch('../../data/rooms.json');
        const result = await response.json();
        const filtRooms = filteredRooms(result.rooms, fromDate, toDate, numPersons);
        return filtRooms;
    } catch(err){
        console.error(err);
    }
}