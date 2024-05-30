function closePreview(travelId) {
  let activePreview = document.querySelector(`.preview[data-target="${travelId}"]`);
  if (activePreview) {
    activePreview.classList.remove('active');
    previewContainer.style.display = 'none';
  }
}