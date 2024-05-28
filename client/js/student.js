const submit = document.getElementById('submit-student');
const newButton = document.querySelector('.new-button');
const schoolId = localStorage.getItem('school-id');
const levelButtons = document.querySelectorAll(
  '.nav-pills .nav-item .nav-link'
);
const canvasTitle = document.querySelector('.offcanvas-title');
canvasTitle.textContent = 'New School';
let mode = 'create';
let selectedId = '';
let selectedLevel = 'P1';

const SERVER_URL = 'http://localhost:3000';

const buttons = `
<td class="last-column">
  <button
    type="button"
    class="btn btn-primary update-btn"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasRight"
    aria-controls="offcanvasRight"
  >
    Update
  </button>
  <button
    type="button"
    class="btn btn-danger delete-btn"
    data-bs-toggle="modal"
    data-bs-target="#deleteModal"
  >
    Remove
  </button>
</td>
`;

// document.addEventListener('DOMContentLoaded', function () {
//   const submitBtn = document.getElementById('delete-submit');
//   const modal = new bootstrap.Modal(document.getElementById('deleteModal'));

//   submitBtn.addEventListener('click', function () {
//     // Close the modal
//     modal.hide();
//   });
// });

const setListeners = (row) => {
  const deleteButton = row.querySelector('.delete-btn');
  const updateButton = row.querySelector('.update-btn');
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'));

  deleteButton.addEventListener('click', () => {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.querySelector(
      '.modal-body'
    ).textContent = `Are you sure you want to delete ${
      row.querySelector('.first-name').textContent
    }'s account?`;
    deleteModal
      .querySelector('.modal-footer .btn-danger')
      .addEventListener('click', () => {
        fetch(`${SERVER_URL}/api/v1/schools/${schoolId}/users/${row.id}`, {
          method: 'DELETE',
        }).then(() => {
          fetchStudents();
          modal.hide();
        });
      });
  });
  updateButton.addEventListener('click', () => {
    const offcanvasRight = document.getElementById('offcanvasRight');
    const form = offcanvasRight.querySelector('form');
    selectedId = row.id;
    form.querySelector('#first-name').value =
      row.querySelector('.first-name').textContent;
    form.querySelector('#last-name').value =
      row.querySelector('.last-name').textContent;
    form.querySelector('#email').value =
      row.querySelector('.email').textContent;
    form.querySelector('#phone').value =
      row.querySelector('.phone').textContent;
    form.querySelector('#state').value = row.dataset.state;
    form.querySelector('#city').value = row.dataset.city;
    form.querySelector('#level').value = row.dataset.level;
    canvasTitle.textContent = 'Update Student Account';
    mode = 'update';
  });
};

const createRow = (student) => {
  const { _id, firstName, lastName, email, phone, state, city, level } =
    student;
  const row = document.createElement('tr');
  row.id = _id;
  row.dataset.state = state;
  row.dataset.city = city;
  row.dataset.level = level;
  const studentRow = `
    <td class="first-name">${firstName}</td>
    <td class="last-name">${lastName}</td>
    <td class="email">${email}</td>
    <td class="phone" style="text-align: left;">${phone}</td>
    ${buttons}
    `;
  row.innerHTML = studentRow;
  return row;
};

const createStudent = (e) => {
  e.preventDefault();
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const student = {};
  formData.forEach((value, key) => {
    student[key] = value;
  });
  fetch(`${SERVER_URL}/api/v1/schools/${schoolId}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  }).then(() => {
    fetchStudents();
  });
};

const updateStudent = (e) => {
  e.preventDefault();
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const student = {};
  formData.forEach((value, key) => {
    student[key] = value;
  });
  fetch(`${SERVER_URL}/api/v1/schools/${schoolId}/users/${selectedId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  }).then(() => {
    fetchStudents();
  });
};

const fetchStudents = () => {
  fetch(`${SERVER_URL}/api/v1/schools/${schoolId}/users?level=${selectedLevel}`)
    .then((response) => response.json())
    .then((data) => {
      const { data: students } = data;
      const studentsTable = document.getElementById('students-table');
      studentsTable.innerHTML = '';
      students.forEach((student) => {
        const row = createRow(student);
        setListeners(row);
        studentsTable.appendChild(row);
      });
      const table = $('#table').DataTable();
    });
};

fetchStudents();

levelButtons.forEach((levelButton) => {
  levelButton.addEventListener('click', (e) => {
    levelButtons.forEach((btn) => {
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    selectedLevel = e.target.dataset.level;
    fetchStudents();
  });
});

newButton.addEventListener('click', () => {
  const form = document.getElementById('form');
  form.reset();
  canvasTitle.textContent = 'New Student';
  mode = 'create';
});

submit.addEventListener('click', (e) => {
  if (mode === 'create') {
    createStudent(e);
  } else {
    updateStudent(e);
  }
});
