const SERVER_URL = 'https://travel-website-rb63.onrender.com';

const fetchTravels = () => {
  const bookingCard = document.querySelector('.booking-card');
  fetch(`${SERVER_URL}/api/v1/travels`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const travelName = bookingCard.querySelector('.name');
      const travelDesc = bookingCard.querySelector('.description');
      const travelImg = bookingCard.querySelector('.travel-img');
      const travelDuration = bookingCard.querySelector('.travel-duration');
      const travelTransp = bookingCard.querySelector('.travel-transp');
      const { data: travels } = data;
      const {
        image,
        name,
        description,
        duration,
        durationUnit,
        transportation,
      } = travels[0];

      travelName.textContent = name;
      travelDesc.textContent = description;
      travelImg.src = image;
      travelDuration.textContent = `${duration} ${durationUnit}`;
      travelTransp.textContent = transportation;
    });
};

fetchTravels()
