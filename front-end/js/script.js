const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// Abrir / Fechar menu
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Fechar ao clicar no overlay
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Desktop: abre ao passar o mouse
menuBtn.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }
});

// Fecha quando mouse sai do sidebar (desktop)
sidebar.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
});