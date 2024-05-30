let previewContainer = document.querySelector('.tours-preview');
let previewBox = previewContainer.querySelectorAll('.preview');
let kawther = document.querySelectorAll('.tm_tours_box_1');
console.log(kawther);
kawther.forEach(tm_tours_box_1 => {
  tm_tours_box_1.onclick = () => {
    previewContainer.style.display = 'flex';
    let name = tm_tours_box_1.getAttribute('data-name');
    previewBox.forEach(preview => {
      let target = preview.getAttribute('data-target');
      if (name == target) {
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close => {
  close.querySelector('.fa-times').onclick = () => {
    close.classList.remove('active');
    previewContainer.style.display = 'none';
  };
});



//reserve button
let reserveButton = document.querySelector('.cart');
reserveButton.addEventListener('click', reserveTour);
//reserveTour
function reserveTour() {
  // Close the popup
  let activePreview = document.querySelector('.preview.active');
  activePreview.classList.remove('active');
  previewContainer.style.display = 'none';

  // Make the API request
  let travelId = activePreview.getAttribute('data-id');
  fetch(`http://localhost:3000/api/v1/travels/${travelId}/reservations`, {
    method: 'POST'
  })
  .then(response => {
    // Handle the response
  })
  .catch(error => {
    console.error(error);
  });
}