const button = document.querySelector("#burger");
const menu = document.querySelector("#overlay");

button.addEventListener("click", () => {
    button.classList.toggle('hamburger--active');
    menu.classList.toggle('overlay--active');
});