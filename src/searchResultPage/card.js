

export function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  const imagePath = '../../images/rooms/'
  console.log(imagePath + data.image);
  card.innerHTML = `
    <div class="card-body">
        <img src="${imagePath + data.image}" alt="${data.name}" />
        <h2>${data.name}</h2>
        <p>${data.description}</p>
    </div>
  `;
  return card;
}