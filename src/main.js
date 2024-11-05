

// const myCarousel = new bootstrap.Carousel('#carouselExampleIndicators', {
//     interval: 3000, // Set interval to 3000 ms (3 seconds)
//     ride: 'carousel' // Automatically start the carousel
// });

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the library on the carousel element
    const myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'), {
        interval: 3000, // Set interval to 3000 ms (3 seconds)
        ride: 'carousel' // Automatically start the carousel
    });

    const numPersonsSelected = document.getElementById('numPersons');
    const numPersonsMax = 6;
    for (let i = 1; i <= numPersonsMax; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        numPersonsSelected.appendChild(option);
        console.log('HERE', numPersonsSelected)
    }
});