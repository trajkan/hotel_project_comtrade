import { createModal } from '../utils/baseModal.js';
import { formatDate } from '../utils/helpers.js';
import { updateRoomAndGuests } from '../api/bookRooms.js';

// let confirmButton;

export function handleBookNowClick(roomData) {
    // Assuming `room` contains the room details (e.g., name, price, etc.)
    const { id, name, price, description, image, bookedDates } = roomData;
    const fromDate = sessionStorage.getItem('fromDate');
    const toDate = sessionStorage.getItem('toDate');
    const totalCost = sessionStorage.getItem('totalCost');
       // Open the booking modal with the room's details
    createBookingModal({id, name, image, bookedDates, fromDate, toDate, totalCost});
}

function createBookingModal(roomDetails) {
    console.log('Creating booking modal');
    const imagePath = `../../images/rooms/${roomDetails.image}`;
    // Create and show the modal
    createModal({
        id: 'bookingModal',
        title: `Book: ${roomDetails.name}`,
        bodyContent: `
            <div class="text-center">
                <img src="${imagePath}" alt="${roomDetails.name}" class="img-fluid mb-3">
                <p><strong>Total Cost: </strong>$${roomDetails.totalCost}</p>
                <p><strong>Booked Dates: </strong>From ${roomDetails.fromDate} to ${roomDetails.toDate}</p>
            </div>
        `,
        footerButtons: [
            { type: 'button', class: 'btn-secondary', text: 'Cancel', dataDismiss: 'modal' },
            { type: 'button', class: 'btn-primary', text: 'Confirm', dataDismiss: 'modal' }
        ]
    });

    const modalElement = document.getElementById('bookingModal');

    const showListener = () => {
        const confirmButton = modalElement.querySelector('.btn-primary');
        if (confirmButton) {
            const confirmBookingListener = () => handleConfirmBooking(roomDetails); // Create a closure
            confirmButton.addEventListener('click', confirmBookingListener);

            const cleanupListeners = () => {
                confirmButton.removeEventListener('click', confirmBookingListener); // Remove the click listener
                modalElement.removeEventListener('shown.bs.modal', showListener); // Remove the 'shown' listener
                modalElement.removeEventListener('hidden.bs.modal', cleanupListeners); // Remove the 'hidden' listener
            };
            modalElement.addEventListener('hidden.bs.modal', cleanupListeners, { once: true });
        } else {
            console.error('Confirm button not found in DOM');
        }
    };

    modalElement.addEventListener('shown.bs.modal', showListener);


}

async function handleConfirmBooking(roomDetails) {
    console.log('Booking confirmed:', roomDetails);
    const { name, image, fromDate, toDate, totalCost } = roomDetails;


    if (!fromDate || !toDate) {
        console.error("Booking dates are missing in sessionStorage.");
        return;
    }


    // Check for adjacent dates
    const allDatesInRange = getDatesInRange(fromDate, toDate);
    console.log('All dates in range:', allDatesInRange);

    // Update the server with the booking
    await updateRoomAndGuests(roomDetails, allDatesInRange);

    // Close the modal after booking
    const modal = document.getElementById('bookingModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) bootstrapModal.hide();

}

function getDatesInRange(fromDate, toDate) {
    // Directly create Date objects from the YYYY-MM-DD strings
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const dateRange = [];

    // Generate dates from start to end
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dateRange.push(formatDate(d));
    }
    return dateRange;
}



