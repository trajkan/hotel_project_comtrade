import { filteredRooms } from '../searchResultPage/filters.js';

export async function fetchData(fromDate, toDate, numPersons){
    try{
        const response = await fetch('http://localhost:3000/rooms');
        const result = await response.json();
        const filtRooms = filteredRooms(result, fromDate, toDate, numPersons);
        return filtRooms;
    } catch(err){
        console.error(err);
    }
}

