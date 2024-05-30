const submit = document.getElementById('submit-school');
const newButton = document.getElementById('new-button');
const canvasTitle = document.querySelector('.offcanvas-title');
canvasTitle.textContent = 'New School';
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

// document.addEventListener('DOMContentLoaded', function () {
//   const submitBtn = document.getElementById('delete-submit');
//   const modal = new bootstrap.Modal(document.getElementById('deleteModal'));

//   submitBtn.addEventListener('click', function () {
//     // Close the modal
//     modal.hide();
//   });
// });

const setListeners = (card) => {
  const deleteButton = card.querySelector('.delete-btn');
  const updateButton = card.querySelector('.update-btn');
  const studentsBtn = card.querySelector('.students-btn');
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'));

  studentsBtn.onclick = () => {
    localStorage.setItem('school-id', card.id);
    window.location.pathname = '/client/students-dashboard.html';
  };
  deleteButton.addEventListener('click', () => {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.querySelector(
      '.modal-body'
    ).textContent = `Are you sure you want to delete ${
      card.querySelector('.card-title').textContent
    }?`;
    deleteModal
      .querySelector('.modal-footer .btn-danger')
      .addEventListener('click', () => {
        const token = localStorage.getItem('token');
        fetch(`${SERVER_URL}/api/v1/schools/${card.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          fetchSchools();
          modal.hide();
        });
      });
  });
  updateButton.addEventListener('click', () => {
    const offcanvasRight = document.getElementById('offcanvasRight');
    const form = offcanvasRight.querySelector('form');
    selectedId = card.id;
    form.querySelector('#name').value =
      card.querySelector('.card-title').textContent;
    form.querySelector('#email').value =
      card.querySelector('.card-email').textContent;
    form.querySelector('#phone').value =
      card.querySelector('.card-phone').textContent;
    form.querySelector('#state').value = card
      .querySelector('.card-address')
      .textContent.split(', ')[0];
    form.querySelector('#city').value = card
      .querySelector('.card-address')
      .textContent.split(', ')[1];
    form.querySelector('#image').value =
      card.querySelector('.card-img-top').src;
    canvasTitle.textContent = 'Update School';
    mode = 'update';
  });
};

const createCard = (school) => {
  const { _id, image, name, email, phone, students, state, city } = school;
  const card = document.createElement('div');
  card.id = _id;
  card.className = 'col';
  console.log(school);
  const schoolCard = `
  <div class="card school-card">
    <img
      src="${
        image ||
        'https://th.bing.com/th/id/R.bd4149bf62d2ee103f6a450a867b9eec?rik=xf1VuRrIpl4cGQ&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fRTG%2fEkr%2fRTGEkrogc.png&ehk=2cAsAgDSAERtqCnxotoQNZ5%2b6tANj6gR%2belIZGEI%2fow%3d&risl=&pid=ImgRaw&r=0'
      }"
      class="card-img-top"
      alt="school logo"
    />
    <div class="card-body">
      <div class="body-header">
        <h5 class="card-title">${name}</h5>
        <button class="btn students-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
      </div>
      <p class="card-address">${state}, ${city}</p>
      <span class="card-email">${email}</span>
      <span class="card-phone">${phone}</span>
      <p>Number of students: <span class="card-students">${students}</span></p>
      ${buttons}
    </div>
  </div>`;
  card.innerHTML = schoolCard;
  return card;
};

const createSchool = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const school = {};
  formData.forEach((value, key) => {
    school[key] = value;
  });
  fetch(`${SERVER_URL}/api/v1/schools`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(school),
  }).then(() => {
    fetchSchools();
  });
};

const updateSchool = (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const school = {};
  formData.forEach((value, key) => {
    school[key] = value;
  });
  fetch(`${SERVER_URL}/api/v1/schools/${selectedId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(school),
  }).then(() => {
    fetchSchools();
  });
};

const fetchSchools = () => {
  const token = localStorage.getItem('token');
  fetch(`${SERVER_URL}/api/v1/schools`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { data: schools } = data;
      const schoolsContainer = document.getElementById('schools-container');
      schoolsContainer.innerHTML = '';
      schools.forEach((school) => {
        const card = createCard(school);
        setListeners(card);
        schoolsContainer.appendChild(card);
      });
    });
};

fetchSchools();

newButton.addEventListener('click', () => {
  const form = document.getElementById('form');
  form.reset();
  canvasTitle.textContent = 'New School';
  mode = 'create';
});

submit.addEventListener('click', (e) => {
  if (mode === 'create') {
    createSchool(e);
  } else {
    updateSchool(e);
  }
});
