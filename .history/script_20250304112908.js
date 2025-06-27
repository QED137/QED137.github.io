const menuIcon = document.querySelector(".menu-icon");
const menuText = document.querySelector(".menu-text");
const container = document.querySelector(".container");

menuIcon.addEventListener("click", () => {
  container.classList.toggle("change");

  // Toggle class to show/hide "Explore" text dynamically
  if (menuText) {
    menuText.classList.toggle("active");
  }
});

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
