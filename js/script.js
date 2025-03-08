document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    function toggleMenu() {
        menu.classList.toggle('show');
        overlay.classList.toggle('show');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});