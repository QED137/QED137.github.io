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

// Add event listener to both the menu icon and the menu text
menuIcon.addEventListener("click", toggleMenu);
menuText.addEventListener("click", toggleMenu);
// Handle project buttons (your existing code)
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

// Function to go back in history
function goBack() {
  window.history.back();
}
