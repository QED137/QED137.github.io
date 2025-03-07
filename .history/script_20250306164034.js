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
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const menuButton = document.querySelector(".menu-btn"); // Button inside menu icon
  const mobileNav = document.querySelector(".navigation"); // Mobile navigation menu
  const container = document.querySelector(".container");

  // Function to toggle the menu
  function toggleMenu() {
    mobileNav.classList.toggle("active"); // Toggle navigation visibility

    // Change button text dynamically
    if (menuButton) {
      menuButton.textContent = mobileNav.classList.contains("active")
        ? "Go Back"
        : "Take a Look";
    }
  }

  // Add event listener to the menu button (only if it exists)
  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking a navigation link
  document.querySelectorAll(".navigation a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      if (menuButton) {
        menuButton.textContent = "Take a Look";
      }
    });
  });

  // Handle project buttons opening GitHub links
  const projectButtons = document.querySelectorAll(".project-btn");

  projectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const url = this.getAttribute("data-github-url");
      if (url) {
        window.open(url, "_blank");
      }
    });
  });
});
