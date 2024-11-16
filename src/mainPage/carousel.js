//initialization of the carousel by setting its interval time
export function initializeCarousel() {
    const myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'), {
        interval: 3000,
        ride: 'carousel'
    });
}