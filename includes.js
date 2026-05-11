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
    // Highlight "About Us" trigger for any about sub-page
    if (link.classList.contains("nav-dropdown-trigger") && aboutPages.includes(currentPage) && href === "about.html") {
      link.classList.add("active");
    }
    // Highlight "Our Ministries" trigger for any ministry sub-page
    if (link.classList.contains("nav-dropdown-trigger") && ministryPages.includes(currentPage) && href === "#") {
      link.classList.add("active");
    }
  });
}
