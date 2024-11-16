
// this part initializes the person selector in the search form
export function initializePersonSelector(maxNumOfPersons) {
    const numPersonsSelect = document.getElementById('numPersons'); // get the element for setting the number of persons
    for (let i = 1; i <= maxNumOfPersons; i++) { // loop through the number of persons and create an option for each
        const option = document.createElement('option'); // create an option element
        option.value = i;   // set the value of the option
        option.textContent = i; // set the text content of the option
        numPersonsSelect.appendChild(option); // append the option to the select element
    }
}