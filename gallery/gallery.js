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

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "X";
  closeButton.classList.add("close-button");

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalImage);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add("show");
  }, 100);

  modal.addEventListener("click", closeModal);
  closeButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Zastaví šíření události
    closeModal(event);
  });
}

function closeModal(event) {
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("close-button")
  ) {
    const modal = event.target.classList.contains("modal")
      ? event.target
      : event.target.parentElement.parentElement;
    modal.classList.remove("show");
    modal.classList.add("hide");

    modal.addEventListener("transitionend", () => {
      modal.remove();
    });
  }
}
