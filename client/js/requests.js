let selectedId = '';

const SERVER_URL = 'https://travel-website-rb63.onrender.com';

const buttons = `
<td class="last-column">
  <button
    type="button"
    class="btn btn-success accept-btn"
  >
    Accept
  </button>
  <button
    type="button"
    class="btn btn-danger reject-btn"
  >
    Reject
  </button>
</td>
`;

const updateReservation = (row, status) => {
  const reservationId = row.id;
  const travelId = row.dataset['travelId'];
  const token = localStorage.getItem('token');
  fetch(
    `${SERVER_URL}/api/v1/travels/${travelId}/reservations/${reservationId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  ).then(() => {
    fetchReservations();
  });
};

const setListeners = (row) => {
  const acceptButton = row.querySelector('.accept-btn');
  const rejectButton = row.querySelector('.reject-btn');

  acceptButton.addEventListener('click', () =>
    updateReservation(row, 'approved')
  );

  rejectButton.addEventListener('click', () =>
    updateReservation(row, 'rejected')
  );
};

const createRow = (reservation) => {
  const { _id, user, travel } = reservation;
  const row = document.createElement('tr');
  row.id = _id;
  row.dataset['travelId'] = travel._id;
  const reservationRow = `
    <td class="student">${user.firstName} ${user.lastName}</td>
    <td class="phone" style="text-align: left;">${user.phone}</td>
    <td class="travel">${travel.name}</td>
    <td class="location">${travel.state} ${travel.city}</td>
    <td class="date">${travel.startDate}</td>
    <td class="price" style="text-align: left;">${travel.price}</td>
    ${buttons}
    `;
  row.innerHTML = reservationRow;
  return row;
};

const fetchReservations = () => {
  const status = 'pending';
  const token = localStorage.getItem('token');
  fetch(`${SERVER_URL}/api/v1/reservations?status=${status}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { data: reservations } = data;
      const reservationsTable = document.getElementById('reservations-table');
      reservationsTable.innerHTML = '';
      reservations.forEach((reservation) => {
        const row = createRow(reservation);
        setListeners(row);
        reservationsTable.appendChild(row);
      });
      const table = $('#table').DataTable();
    });
};

fetchReservations();
