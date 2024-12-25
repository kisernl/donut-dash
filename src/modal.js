export const modal = (window.onload = () => {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("close-modal");
  // const modalContent = document.querySelector(".modal-content");

  // Show the modal on page load
  modal.classList.add("active");

  // Close the modal when the close button is clicked
  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close the modal on background click
  modal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // // Prevent modal-content click from closing the modal
  // modalContent.addEventListener("click", (event) => {
  //   event.stopPropagation();
  // });

  // code below closes modal with enter key BUT bug to fix - arrow keys still function while modal is active
  // document.addEventListener("keydown", (event) => {
  //   if (event.key === "Enter") {
  //     modal.classList.remove("active");
  //   }
  //   closeModal();
  // });

  // Close the modal on any key press
  document.addEventListener("keydown", () => {
    modal.classList.remove("active");
  });
});
