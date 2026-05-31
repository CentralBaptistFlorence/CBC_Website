/* ===========================
   Central Baptist Church
   Shared Include Loader
   
   Loads header.html and footer.html
   into any page that has:
     <div id="header-placeholder"></div>
     <div id="footer-placeholder"></div>
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  // Load header
  const headerEl = document.getElementById("header-placeholder");
  if (headerEl) {
    fetch("header.html")
      .then((res) => res.text())
      .then((html) => {
        headerEl.innerHTML = html;
        highlightActiveNav();
        initHamburger();
      });
  }

  // Load footer
  const footerEl = document.getElementById("footer-placeholder");
  if (footerEl) {
    fetch("footer.html")
      .then((res) => res.text())
      .then((html) => {
        footerEl.innerHTML = html;
      });
  }
});

// Highlight the current page in the nav
function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".header-nav a");
  const aboutPages = ["about.html", "staff.html", "mission.html"];
  const ministryPages = ["kids.html", "youth.html"];

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
    if (link.classList.contains("nav-dropdown-trigger") && aboutPages.includes(currentPage) && href === "about.html") {
      link.classList.add("active");
    }
    if (link.classList.contains("nav-dropdown-trigger") && ministryPages.includes(currentPage) && href === "#") {
      link.classList.add("active");
    }
  });
}

// Mobile hamburger menu
function initHamburger() {
  const hamburger = document.getElementById("nav-hamburger");
  const mainNav = document.getElementById("main-nav");

  if (!hamburger || !mainNav) return;

  hamburger.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("nav-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll(".nav-dropdown-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = trigger.closest(".nav-dropdown");
        if (parent) parent.classList.toggle("mobile-open");
      }
    });
  });

  mainNav.querySelectorAll("a:not(.nav-dropdown-trigger)").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("nav-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}
