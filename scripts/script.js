document.addEventListener("DOMContentLoaded", function () {
  // Menu Toggle Logic
  const menuIcon = document.querySelector(".menu-icon");
  const menuButton = document.querySelector(".menu-btn"); 
  const container = document.querySelector(".container");

  function toggleMenu() {
      container.classList.toggle("change");
      if (menuButton) {
          menuButton.textContent = container.classList.contains("change") ? "Go Back" : "Take a Look";
      }
  }

  if (menuButton) {
      menuButton.addEventListener("click", toggleMenu);
  }

  // Open GitHub project links
  document.querySelectorAll(".project-btn").forEach(button => {
      button.addEventListener("click", function () {
          const url = this.getAttribute("data-github-url");
          if (url) {
              window.open(url, "_blank");
          }
      });
  });

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top");

  function handleScroll() {
      if (window.scrollY > 300) {
          backToTop.classList.add("show");
      } else {
          backToTop.classList.remove("show");
      }
  }

  function smoothScrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (backToTop) {
      backToTop.addEventListener("click", function (event) {
          event.preventDefault();
          smoothScrollToTop();
      });

      window.addEventListener("scroll", handleScroll);
  }
});

