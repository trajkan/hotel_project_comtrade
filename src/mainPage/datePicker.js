
export function initializeDateInput() {
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Initialize the From Date picker
    const fromDatePicker = new Pikaday({
        field: fromDateInput,
        format: 'DD/MM/YYYY',
        defaultDate: today,
        setDefaultDate: true,
        minDate: today,
        theme: 'pikaday-dark',
        onSelect: function(date) {
            const selectedDate = this.getDate();
            fromDateInput.value = formatDate(selectedDate);
            updateStartDate(selectedDate);
            this.show();
        }
    });

    // Initialize the To Date picker
    const toDatePicker = new Pikaday({
        field: toDateInput,
        format: 'DD/MM/YYYY',
        defaultDate: tomorrow,
        setDefaultDate: true,
        minDate: tomorrow,
        theme: 'pikaday-dark',
        onSelect: function(date) {
            const selectedDate = this.getDate();
            toDateInput.value = formatDate(selectedDate);
            updateEndDate(selectedDate);
            this.show();
        }
    });

    updateStartDate(fromDatePicker.getDate()); 
    fromDateInput.value = formatDate(fromDatePicker.getDate());
    toDateInput.value = formatDate(toDatePicker.getDate());

    // Update Start Date
    function updateStartDate(selectedDate) {
        fromDatePicker.setStartRange(selectedDate);
        toDatePicker.setStartRange(selectedDate);
        // toDatePicker.setMinDate(selectedDate);

        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        toDatePicker.setMinDate(nextDay);

        if (toDatePicker.getDate() < nextDay) {
            toDatePicker.setDate(nextDay);
            toDateInput.value = formatDate(nextDay);
        }
    }

    // Update End Date
    function updateEndDate(selectedDate) {
        fromDatePicker.setEndRange(selectedDate);
        fromDatePicker.setMaxDate(selectedDate);
        toDatePicker.setEndRange(selectedDate);
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}