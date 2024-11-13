export function addSearchButtonListener() {
    const searchButton = document.querySelector('.btn-primary');
    searchButton.addEventListener('click', function(event) {
        event.preventDefault();

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