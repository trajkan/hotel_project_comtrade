import { formatDate } from '../utils/helpers.js';

export function initializeDateInput() {
    const fromDateInput = document.getElementById('fromDate');
    const toDateInput = document.getElementById('toDate');

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const fromDatePicker = new Pikaday({
        field: fromDateInput,
        format: 'YYYY-MM-DD',
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

    const toDatePicker = new Pikaday({
        field: toDateInput,
        format: 'YYYY-MM-DD',
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

    function updateStartDate(selectedDate) {
        fromDatePicker.setStartRange(selectedDate);
        toDatePicker.setStartRange(selectedDate);

        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        toDatePicker.setMinDate(nextDay);

        if (toDatePicker.getDate() < nextDay) {
            toDatePicker.setDate(nextDay);
            toDateInput.value = formatDate(nextDay);
        }
    }

    function updateEndDate(selectedDate) {
        fromDatePicker.setEndRange(selectedDate);
        fromDatePicker.setMaxDate(selectedDate);
        toDatePicker.setEndRange(selectedDate);
    }
}