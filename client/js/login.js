const submit = document.getElementById('submit');
const errorMessage = document.getElementById('error-message');
const SERVER_URL = 'https://travel-website-rb63.onrender.com';

const signIn = () => {
  fetch(`${SERVER_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        errorMessage.textContent = 'Invalid credentials';
        errorMessage.style.visibility = 'visible';
        return;
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const {
        data: { user, token },
      } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      if (user.role === 'admin') {
        window.location.pathname = '/schools-dashboard.html';
        return;
      }
      window.location.href = '/tours.html';
    });
};

submit.addEventListener('click', signIn);
