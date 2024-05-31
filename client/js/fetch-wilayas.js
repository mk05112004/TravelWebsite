const fetchWilayas = () => {
  fetch('/data/wilayas.json')
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById('state');
      data.forEach((wilaya) => {
        const option = document.createElement('option');
        option.value = wilaya.name;
        option.text = wilaya.name;
        select.appendChild(option);
      });
    });
};

fetchWilayas();
