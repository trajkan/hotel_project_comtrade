export function filteredRooms(rooms, fromDate, toDate, numPersons){
    let filteredRooms = rooms;
    // filteredRooms = filterByOccupancy(filteredRooms, numPersons);
    filteredRooms = filterByDate(filteredRooms, fromDate, toDate);
    return filteredRooms;
}

function filterByDate(rooms, fromDate, toDate){
    const from = parseDate(fromDate);
    const to = parseDate(toDate);
    const filteredRooms = rooms.filter(room => {
        return room.bookedDates.every(date => {
            const bookeDate = parseDate(date);
            return bookeDate < from || bookeDate > to;
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

export function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JavaScript Date
  }
