

export function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${data.image}" alt="${data.name}" />
    <div class="card-body">
      <h2>${data.name}</h2>
      <p>${data.description}</p>
    </div>
  `;
  return card;
}