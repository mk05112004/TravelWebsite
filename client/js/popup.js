let previewContainer = document.querySelector('.tours-preview');
let previewBox = previewContainer.querySelectorAll('.preview');
let kawther = document.querySelectorAll('.tm_tours_box_1');

const SERVER_URL = 'http://localhost:3000';

console.log(kawther);
kawther.forEach((tm_tours_box_1) => {
  tm_tours_box_1.onclick = () => {
    previewContainer.style.display = 'flex';
    let name = tm_tours_box_1.getAttribute('data-name');
    previewBox.forEach((preview) => {
      let target = preview.getAttribute('data-target');
      if (name == target) {
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach((close) => {
  close.querySelector('.fa-times').onclick = () => {
    close.classList.remove('active');
    previewContainer.style.display = 'none';
  };
});

const createCard = (travel) => {
  const {
    name,
    description,
    image,
    startDate,
    duration,
    durationUnit,
    price,
    currency,
  } = travel;

  const cardContent = `
<img src=${image} alt="image" class="img-responsive">
<div class="tm_tours_box_1-info">
  <div class="tm_tours_box_1-info-left">
    <p class="text-uppercase margin-bottom-20">${name}</p>
    <p class="gray-text"><i class="fa fa-calendar"></i>${startDate}</p>
  </div>
  <div class="tm_tours_box_1-info-right">
    <p class="gray-text tours-1-description"><i class="fa fa-quote-left"></i> ${description} <i class="fa fa-quote-right"></i></p>
  </div>
</div>
<div class="tm_tours_box_1-link">
  <div class="tm_tours_box_1-link-left">
    Duration: ${duration} ${durationUnit}
  </div>
  <a href="#" class="tm_tours_box_1-link-right">
    ${price} ${currency}							
  </a>							
</div>
`;

  return cardContent;
};

const fetchTravels = () => {
  const cardsContainer = document.getElementById('reveal');
  fetch(`${SERVER_URL}/api/v1/travels`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.data.forEach((travel) => {
        const travelCard = document.createElement('div');
        const card = document.createElement('div');
        travelCard.classList.add('col-md-6', 'col-sm-6', 'col-xs-12');
        card.id = travel.id
        card.dataset.rating = travel.rating
        card.classList.add('tm_tours_box_1');
        const cardContent = createCard(travel);
        card.innerHTML = cardContent;
        cardsContainer.appendChild(card);
      });
    });
};

fetchTravels();
