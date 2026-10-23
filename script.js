const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function setMenuOpen(isOpen) {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) setMenuOpen(false);
  });
}

const filterButtons = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project[data-category]");
const projectGroups = document.querySelectorAll(".project-category");
const workCount = document.querySelector(".work-count");

function filterProjects(category) {
  let visibleCount = 0;
  projects.forEach((project) => {
    const isVisible = category === "all" || project.dataset.category === category;
    project.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  projectGroups.forEach((group) => {
    group.hidden = !group.querySelector(".project:not([hidden])");
  });
  if (workCount) workCount.textContent = `${String(visibleCount).padStart(2, "0")} projects`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    if (!category) return;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    filterProjects(category);
  });
});
filterProjects("all");
