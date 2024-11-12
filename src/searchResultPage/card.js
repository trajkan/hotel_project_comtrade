import { parseDate } from './filters.js';
import { handleBookNowClick } from './modalBooking.js';

export function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  const imagePath = '../../images/rooms/'
  card.innerHTML = `
    <div class="card-body">
        <div class="card-image">
            <img src="${imagePath + data.image}" alt="${data.name}" />
        </div>
        <div class="card-info">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <a href="#" class="more-info">More Info >> </a>
            <div class="cost-and-button">
              <div class="details">
                <span><i class="fa-solid fa-user-group"></i>${data.maxOccupancy}</span>
                <span><i class="fas fa-dollar-sign"></i>${data.price}</span>
                <span><i class="fas fa-bed"></i>${data.bedType}</span>
              </div>
              <div class="total-cost">Total Cost: $0</div>
              <button class="book-now-btn">Book Now</button>
            </div>
        </div>
    </div>
  `;

  // Add event listener to calculate total cost
  const totalCostDiv = card.querySelector('.total-cost');
  const fromDate = parseDate(sessionStorage.getItem('fromDate'));
  const toDate = parseDate(sessionStorage.getItem('toDate'));
  const numDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
  const totalCost = numDays * data.price;
  totalCostDiv.textContent = `Total Cost: $${totalCost}`;

  const moreInfoLink = card.querySelector('.more-info');
  moreInfoLink.addEventListener('click', (event) => {
    event.preventDefault();
    showMoreInfo(card, data, moreInfoLink);
  });

  const bookNowBtn = card.querySelector('.book-now-btn');
  bookNowBtn.addEventListener('click', () => {
    sessionStorage.setItem('totalCost', totalCost);
    handleBookNowClick(data);
  });

  return card;
}

// function parseDate(dateString) {
//   const [day, month, year] = dateString.split('/').map(Number);
//   return new Date(year, month - 1, day); // month is 0-based in JavaScript Date
// }

function showMoreInfo(card, data, moreInfoLink) {
  const moreInfoDiv = document.createElement('div');
  moreInfoDiv.classList.add('more-info-div');
  const characteristicsHTML = Object.entries(data.roomCharacteristics).map(([key, value]) => {
    return `
      <div class="characteristic">
        ${value}
        <div class="text">${key}</div>
      </div>
    `;
  }).join('');
  moreInfoDiv.innerHTML = `
    <span class="close-btn">&times;</span>
    <div class="more-info-content">
      <h3>Additional Information</h3>
      <div class="characteristics-grid">
        ${characteristicsHTML}
      </div>
    </div>
  `;
  card.appendChild(moreInfoDiv);
  moreInfoLink.classList.add('disabled');
  moreInfoLink.style.pointerEvents = 'none';

  const closeBtn = moreInfoDiv.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    moreInfoDiv.remove();
    moreInfoLink.classList.remove('disabled');
    moreInfoLink.style.pointerEvents = 'auto';
  });
}