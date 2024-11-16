
// Here we add a listener to the search button on the main page. 
// When the search button is clicked, we check if the number of persons input is valid. 
// If it is not, we add the 'is-invalid' class to the input. If it is valid, we remove the 'is-invalid' class. 
// We then get the values of the from date, to date, and number of persons inputs and store them in session storage. 
// Finally, we redirect the user to the search results page.

export function addSearchButtonListener() {
    const searchButton = document.querySelector('.btn-primary'); // get the search button
    searchButton.addEventListener('click', function(event) { // add an event listener for the click event
        event.preventDefault(); // prevent the default behavior of the form submission

        const numPersonsInput = document.getElementById('numPersons');
        if (!numPersonsInput.checkValidity()) {
            event.stopPropagation();
            numPersonsInput.classList.add('is-invalid');
            return;
        } else {
            numPersonsInput.classList.remove('is-invalid');
        }

        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;

        const numPersons = numPersonsInput.value;
        sessionStorage.setItem('fromDate', fromDate);
        sessionStorage.setItem('toDate', toDate);
        sessionStorage.setItem('numPersons', numPersons);

        window.location.href = '/src/searchResultPage/searchResults.html';
    });

    const numPersonsInput = document.getElementById('numPersons');
    numPersonsInput.addEventListener('change', function() {
        if (numPersonsInput.checkValidity()) {
            numPersonsInput.classList.remove('is-invalid');
        }
    });
}