const container = document.getElementById("container");
const close  = document.getElementById("close");
const popup = document.getElementById("popup");
const accept = document.getElementById("green-btn-2");
const shareSitepack = document.getElementById("share-sitepack");


close.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('blurred');
});

accept.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('blurred');
});

shareSitepack.addEventListener('click', () => {
    popup.style.display = 'block';
    container.classList.add('blurred');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 750) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});