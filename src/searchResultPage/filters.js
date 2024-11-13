export function filteredRooms(rooms, fromDate, toDate, numPersons){
    let filteredRooms = rooms;
    filteredRooms = filterByDate(filteredRooms, fromDate, toDate);
    return filteredRooms;
}

function filterByDate(rooms, fromDate, toDate){
    const filteredRooms = rooms.filter(room => {
        return room.bookedDates.every(date => {
            return date < fromDate || date > toDate;
        });
    });
    return filteredRooms;
}

function filterByOccupancy(rooms, numPersons){
    const filteredRooms = rooms.filter(room => {
        return room.maxOccupancy >= numPersons;
    });
    return filteredRooms;
}
