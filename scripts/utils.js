// Abrir una ventana emergente
export function openModal(modal) {
  if (modal.classList.contains("popup")) {
    modal.classList.add("popup_opened");
  } else {
    modal.style.display = "flex";
    modal.classList.add("modal_opened");
  }
  document.addEventListener("keydown", closeByEscape);
}

// Cerrar una ventana emergente
export function closeModal(modal) {
  if (modal.classList.contains("popup")) {
    modal.classList.remove("popup_opened");
  } else {
    modal.style.display = "none";
    modal.classList.remove("modal_opened");
  }
  document.removeEventListener("keydown", closeByEscape);
}

// Cerrar con tecla Escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    const openedModal = document.querySelector(".modal_opened");

    if (openedPopup) {
      closeModal(openedPopup);
    } else if (openedModal) {
      closeModal(openedModal);
    }
  }
}
