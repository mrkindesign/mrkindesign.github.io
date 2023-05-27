const gallery = document.querySelector(".gallery");

fetch("photos.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((photo) => {
      const imageElement = document.createElement("img");
      imageElement.src = photo.url;
      imageElement.alt = photo.title;
      imageElement.addEventListener("click", openModal);
      gallery.appendChild(imageElement);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function openModal(event) {
  const imageUrl = event.target.src;

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalImage = document.createElement("img");
  modalImage.src = imageUrl;

  modalContent.appendChild(modalImage);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.addEventListener("click", closeModal);
}

function closeModal(event) {
  if (event.target.classList.contains("modal")) {
    event.target.remove();
  }
}
