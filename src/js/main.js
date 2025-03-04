/*** Burger Menu */
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".header__burger");
    const nav = document.querySelector(".header__nav");

    burger.addEventListener("click", function () {
        nav.classList.toggle("active");
        burger.classList.toggle("active");
    });
});
