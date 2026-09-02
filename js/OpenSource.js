const container = document.getElementById("container");
const close  = document.getElementById("close");
const popup = document.getElementById("popup");
const accept = document.getElementById("green-btn-2");
const shareSitepack = document.getElementById("share-sitepack");
const file = document.getElementsByName("html");
const body = document.body;


close.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('blurred');
    body.style.overflow = 'visible';
});

accept.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('blurred');
    body.style.overflow = 'visible';
});

shareSitepack.addEventListener('click', () => {
    popup.style.display = 'block';
    container.classList.add('blurred');
    body.style.overflow = 'hidden';
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 750) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});