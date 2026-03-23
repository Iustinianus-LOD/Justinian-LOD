(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    mobileMenu();
    imageModal();
    csvTabs();
  });

  function mobileMenu() {
    const nav = document.querySelector(".navmenu");
    const toggleBtn = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".navmenu ul");
    const navLinks = document.querySelectorAll("#navmenu a");

    if (!nav || !toggleBtn || !navList) return;

    function openMenu() {
      nav.classList.add("is-open");
      navList.style.display = "flex";
      document.body.classList.add("no-scroll");
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.textContent = "✕";
    }

    function closeMenu() {
      nav.classList.remove("is-open");
      navList.style.display = "";
      document.body.classList.remove("no-scroll");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.textContent = "☰";
    }

    function toggleMenu() {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  function imageModal() {
    const triggers = document.querySelectorAll(".item-img-trigger");
    if (!triggers.length) return;

    const modal = document.createElement("div");
    modal.className = "item-img-modal";
    modal.innerHTML = `
      <div class="item-img-modal__content" role="dialog" aria-modal="true" aria-label="Image preview">
        <button class="item-img-modal__close" type="button" aria-label="Close image preview">×</button>
        <img class="item-img-modal__img" src="" alt="">
      </div>
    `;

    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".item-img-modal__img");
    const closeBtn = modal.querySelector(".item-img-modal__close");

    function openModal(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || "";
      modal.classList.add("is-open");
      document.body.classList.add("no-scroll");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modalImg.src = "";
      modalImg.alt = "";
      document.body.classList.remove("no-scroll");
    }

    triggers.forEach(trigger => {
      trigger.addEventListener("click", function () {
        const src = this.dataset.img;
        const alt = this.dataset.alt || "";
        if (src) openModal(src, alt);
      });
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  function csvTabs() {
    const tabButtons = document.querySelectorAll(".csv-item");
    const tables = document.querySelectorAll(".csv-table");

    if (!tabButtons.length || !tables.length) return;

    tabButtons.forEach(button => {
      button.addEventListener("click", function () {
        const targetId = this.dataset.target;
        if (!targetId) return;

        tabButtons.forEach(btn => btn.classList.remove("active"));
        tables.forEach(table => table.classList.remove("active"));

        this.classList.add("active");

        const targetTable = document.getElementById(targetId);
        if (targetTable) {
          targetTable.classList.add("active");
        }
      });
    });
  }
})();