export async function updateRoomAndGuests(roomDetails, dates) {
    const { id, bookedDates} = roomDetails;
    console.log('Updating room and guests:', id, bookedDates);
    const updatedBookedDates = [...new Set([...bookedDates, ...dates])].sort((a, b) => new Date(a) - new Date(b));
    console.log('Updated booked dates:', updatedBookedDates);

    const roomResponse = await fetch(`http://localhost:3000/rooms/${id}`);
    if (!roomResponse.ok) {
        console.error(`Room with ID ${id} not found`);
        return;
    }
    
    await fetch(`http://localhost:3000/rooms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookedDates: updatedBookedDates})
    });

    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    currentUser = await fetch(`http://localhost:3000/users/${currentUser.id}`).then(response => response.json());
    console.log('Current user:', currentUser);
    if (currentUser) {

        const userBooking = currentUser.bookings.find(booking => booking.roomId === id);
        if (userBooking) {
            userBooking.bookedDates = [...new Set([...userBooking.bookedDates, ...dates])].sort((a, b) => new Date(a) - new Date(b));
        } else {
            currentUser.bookings.push({ 
                roomId: id,
                roomName: roomDetails.name,
                bookedDates: dates.sort((a, b) => new Date(a) - new Date(b))
            });
        }

        await fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookings: currentUser.bookings })
        });
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Booking successful! Your booking has been confirmed. Thank you for choosing us!');
    }
}