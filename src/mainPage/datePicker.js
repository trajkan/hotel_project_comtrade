import { formatDate } from '../utils/helpers.js';

// functions to initialize the date picker. For this task we have finally chosen the pickaday library

// function to initialize the date picker
export function initializeDateInput() {
    const fromDateInput = document.getElementById('fromDate'); // get the input field for the start date
    const toDateInput = document.getElementById('toDate'); // get the input field for the end date

    let today = new Date(); // get the today's date
    let tomorrow = new Date(today); // get the tomorrow's by first taking today's date and then adding one day on next row
    tomorrow.setDate(tomorrow.getDate() + 1); // add one day to the tomorrow's date

    const fromDatePicker = new Pikaday({ // create a new instance of the Pikaday date picker for the start date
        field: fromDateInput, // set the field to the input field for the start date
        format: 'YYYY-MM-DD',   // set the format of the date
        defaultDate: today, // set the default date to today
        setDefaultDate: true, // setting the defaultdate to initial date
        minDate: today, // set the minimum date to today so the calendar will not show the past dates
        theme: 'pikaday-dark', // set the theme of the date picker
        onSelect: function(date) { // set the onSelect event handler, i.e what should happen when a date is selected
            const selectedDate = this.getDate(); // get the selected date
            fromDateInput.value = formatDate(selectedDate); // take the selected date and format it to the desired format and set it as the value of the input field
            updateStartDate(selectedDate); // call the updateStartDate function with the selected date as the argument
            // this.show(); // show the date picker
        }
    });

    const toDatePicker = new Pikaday({ // create a new instance of the Pikaday date picker for the end date
        field: toDateInput, // set the field to the input field for the end date
        format: 'YYYY-MM-DD', // set the format of the date
        defaultDate: tomorrow, // set the default date to tomorrow
        setDefaultDate: true, // setting the defaultdate to initial date
        minDate: tomorrow, // set the minimum date to tomorrow so we cannot chose dates before tomorrow for the end date
        theme: 'pikaday-dark', // set the theme of the date picker
        onSelect: function(date) { // set the onSelect event handler, i.e what should happen when a date is selected
            const selectedDate = this.getDate(); // get the selected date
            toDateInput.value = formatDate(selectedDate); // take the selected date and format it to the desired format and set it as the value of the input field
            updateEndDate(selectedDate); // call the updateEndDate function with the selected date as the argument
            // this.show(); // keep the date picker open after selection (does not work!!!)
        }
    });

    updateStartDate(fromDatePicker.getDate()); // call the updateStartDate function with the selected date as the argument
    fromDateInput.value = formatDate(fromDatePicker.getDate()); // set the value of the input field for the start date to the formatted date
    toDateInput.value = formatDate(toDatePicker.getDate()); // set the value of the input field for the end date to the formatted date

    // function to update the start date in datepicker, it also updates the range between the start and end date
    function updateStartDate(selectedDate) {
        fromDatePicker.setStartRange(selectedDate); // set the start range of the from date picker to the selected date
        toDatePicker.setStartRange(selectedDate); // set the start range of the to date picker to the selected date

        const nextDay = new Date(selectedDate); // get the selected date and set it as nextDay
        nextDay.setDate(nextDay.getDate() + 1); // we now make nextday the day after the selected date
        toDatePicker.setMinDate(nextDay); // in the to date picker e set the minDate to the nexteday as we dont want the to date to be the same date as the from date

        if (toDatePicker.getDate() < nextDay) { // if the fromdate is after the todate we set the todate to the nextday to get a valid range, without this the shown todate can be before the selected from date!
            toDatePicker.setDate(nextDay); // set the to date picker to the next day
            toDateInput.value = formatDate(nextDay); //set the shown value in the toDate form to the nextday
        }
    }

    // function to update the end date in datepicker, it also updates the range between the start and end date
    function updateEndDate(selectedDate) {
        fromDatePicker.setEndRange(selectedDate); //when we select a todate theb we want to updarte the fromdate picker so that ti mathcs the correct range
        fromDatePicker.setMaxDate(selectedDate); // we also set the maxdate of the fromdate picker to the selected date, so that we cannot select fromdate after the todate
        toDatePicker.setEndRange(selectedDate); // we also set the endrange of the todate picker to the selected date
    }
}