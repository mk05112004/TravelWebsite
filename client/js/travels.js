const submit = document.getElementById('submit-travel');
const newButton = document.getElementById('new-button');
const canvasTitle = document.querySelector('.offcanvas-title');
canvasTitle.textContent = 'New Travel';
let mode = 'create';
let selectedId = '';

const SERVER_URL = 'https://travel-website-rb63.onrender.com';

const buttons = `
<div class="btns">
  <button
    type="button"
    class="btn btn-outline-danger delete-btn"
    data-bs-toggle="modal"
    data-bs-target="#deleteModal"
  >
    delete
  </button>
  <button
    type="button"
    class="btn btn-outline-primary update-btn"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasRight"
    aria-controls="offcanvasRight"
  >
    update
  </button>
</div>
`;

const setListeners = (card) => {
  const deleteButton = card.querySelector('.delete-btn');
  const updateButton = card.querySelector('.update-btn');
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'));

  deleteButton.addEventListener('click', () => {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.querySelector(
      '.modal-body'
    ).textContent = `Are you sure you want to delete ${
      card.querySelector('.name').textContent
    } travel?`;
    deleteModal
      .querySelector('.modal-footer .btn-danger')
      .addEventListener('click', () => {
        const token = localStorage.getItem('token');
        fetch(`${SERVER_URL}/api/v1/travels/${card.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          fetchTravels();
          modal.hide();
        });
      });
  });
  updateButton.addEventListener('click', () => {
    const offcanvasRight = document.getElementById('offcanvasRight');
    const form = offcanvasRight.querySelector('form');
    selectedId = card.id;
    form.querySelector('#name').value = card.querySelector('.name').textContent;
    form.querySelector('#description').value =
      card.querySelector('.description').textContent;
    form.querySelector('#image').value =
      card.querySelector('.card-img-top').src;
    form.querySelector('#date').value = card.querySelector('.date').textContent;
    form.querySelector('#duration').value =
      card.querySelector('.duration').textContent;
    form.querySelector('#transportation').value =
      card.querySelector('.transportation').textContent;
    form.querySelector('#state').value = card
      .querySelector('.location')
      .textContent.split(', ')[0];
    form.querySelector('#city').value = card
      .querySelector('.location')
      .textContent.split(', ')[1];
    form.querySelector('#price').value =
      card.querySelector('.price').textContent;
    canvasTitle.textContent = 'Update Travel';
    mode = 'update';
  });
};

const createCard = (travel) => {
  const {
    _id,
    image,
    name,
    description,
    duration,
    durationUnit,
    state,
    city,
    transportation,
    startDate,
    price,
    currency,
  } = travel;
  const card = document.createElement('div');
  card.id = _id;
  card.className = 'col';
  console.log(travel);
  const travelCard = `
  <div class="card">
    <img src=${image} class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="name">${name}</h5>
      <p class="description">${description}</p>
      <div class="mb-3 tags">
        <span class="tag">
          <i class="fa-solid fa-sun"></i>
          <span class="duration">${duration} ${durationUnit}</span>
        </span>
        <span class="tag">
          <i class="fa-solid fa-${transportation}"></i>
          <span class="transportation">${transportation}</span>
        </span>
      </div>
      <div class="details">
        <p class="mb-1">
          Location: <span class="location">${state}, ${city}</span>
        </p>
        <p class="mb-1">
          Start Date: <span class="date">${startDate}</span>
        </p>
        <p class="mb-2">Price: <span class="price">${price} ${currency}</span></p>
      </div>
      ${buttons}
    </div>
  </div>`;
  card.innerHTML = travelCard;
  return card;
};

const createTravel = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const travel = {};
  formData.forEach((value, key) => {
    if (key === 'duration') {
      const duration = value.split(' ');
      travel[key] = duration[0];
      travel['durationUnit'] = duration[1];
      return;
    }
    if (key === 'price') {
      const price = value.split(' ');
      travel[key] = price[0];
      travel['currency'] = price[1];
      return;
    }
    travel[key] = value;
  });
  fetch(`${SERVER_URL}/api/v1/travels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(travel),
  }).then(() => {
    fetchTravels();
  });
};

const updateTravel = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const travel = {};
  formData.forEach((value, key) => {
    if (key === 'duration') {
      const duration = value.split(' ');
      travel[key] = duration[0];
      travel['durationUnit'] = duration[1];
      return;
    }
    if (key === 'price') {
      const price = value.split(' ');
      travel[key] = price[0];
      travel['currency'] = price[1];
      return;
    }
    travel[key] = value;
  });
  fetch(`${SERVER_URL}/api/v1/travels/${selectedId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(travel),
  }).then(() => {
    fetchTravels();
  });
};

const fetchTravels = () => {
  fetch(`${SERVER_URL}/api/v1/travels`)
    .then((response) => response.json())
    .then((data) => {
      const { data: travels } = data;
      const travelsContainer = document.getElementById('travels-container');
      travelsContainer.innerHTML = '';
      travels.forEach((travel) => {
        const card = createCard(travel);
        setListeners(card);
        travelsContainer.appendChild(card);
      });
    });
};

fetchTravels();

newButton.addEventListener('click', () => {
  const form = document.getElementById('form');
  form.reset();
  canvasTitle.textContent = 'New Travel';
  mode = 'create';
});

submit.addEventListener('click', (e) => {
  if (mode === 'create') {
    createTravel(e);
  } else {
    updateTravel(e);
  }
});
