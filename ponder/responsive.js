const btn = document.querySelector(".menu-btn");
const menu = document.querySelector("nav");

btn.addEventListener("click", ToggleMenu);

function ToggleMenu() {
    menu.classList.toggle("hide");
    btn.classList.toggle("change");
}