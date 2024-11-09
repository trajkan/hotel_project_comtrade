export function initializePersonSelector(maxNumOfPersons) {
    const numPersonsSelect = document.getElementById('numPersons');
    for (let i = 1; i <= maxNumOfPersons; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        numPersonsSelect.appendChild(option);
    }
}