// const menuIcon = document.querySelector(".menu-icon");
// const container = document.querySelector(".container");

// menuIcon.addEventListener("click", () => {
//   container.classList.toggle("change");
// });
// document.addEventListener('DOMContentLoaded', function() {
//   const buttons = document.querySelectorAll('.project-btn');

//   buttons.forEach(button => {
//       button.addEventListener('click', function() {
//           const url = this.getAttribute('data-github-url');
//           if (url) {
//               window.open(url, '_blank');
//           }
//       });
//   });
// });
// function goBack() {
//   window.history.back();
// }
const menuIcon = document.querySelector(".menu-icon");
const menuText = document.querySelector(".menu-text"); // Select menu text
const container = document.querySelector(".container");

// Function to toggle the menu
function toggleMenu() {
  container.classList.toggle("change");

  // Change menu text dynamically
  if (menuText) {
    menuText.classList.toggle("active");
    
    // Change text depending on the menu state
    if (container.classList.contains("change")) {
      menuText.textContent = "Go Back";
    } else {
      menuText.textContent = "Explore";
    }
  }
}

// Add event listener to both menu icon and text
menuIcon.addEventListener("click", toggleMenu);
menuText.addEventListener("click", toggleMenu);
