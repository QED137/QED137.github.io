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
const menuButton = document.querySelector(".menu-btn"); // Select the button
const container = document.querySelector(".container");

// Function to toggle the menu
function toggleMenu() {
  container.classList.toggle("change");

  // Change button text dynamically
  if (menuButton) {
    if (container.classList.contains("change")) {
      menuButton.textContent = "Go Back";
    } else {
      menuButton.textContent = "Take a Look";
    }
  }
}

// Add event listener to the button inside the menu icon
menuButton.addEventListener("click", toggleMenu);

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.project-btn');

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const url = this.getAttribute('data-github-url');
          if (url) {
              window.open(url, '_blank');
          }
      });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
          backToTop.classList.add("show");
      } else {
          backToTop.classList.remove("show");
      }
  });

  backToTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  });
});
