export function initializeCarousel() {
    const myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'), {
        interval: 3000,
        ride: 'carousel'
    });
}