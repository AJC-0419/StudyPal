  window.addEventListener('scroll', () => {
         document.body.classList.toggle('scrolled', window.scrollY > 750);
         dropdowns.forEach(wrapper => {
            if (wrapper.classList.contains('open')) {
                wrapper.classList.remove('open');
            }
    });
});
const dropdowns = document.querySelectorAll('.dropdown-wrapper');

dropdowns.forEach(wrapper => {
    const arrow = wrapper.querySelector('.arrow-down');
    if (!arrow) return;

    arrow.addEventListener('click', () => {
        const isShowing =
            wrapper.classList.contains('open') ||
            (wrapper.matches(':hover') && !wrapper.classList.contains('force-closed'));

        if (isShowing) {

            wrapper.classList.remove('open');
            wrapper.classList.add('force-closed');
        } else {
            wrapper.classList.add('open');
            wrapper.classList.remove('force-closed');
        }
    });


    wrapper.addEventListener('mouseleave', () => {
        wrapper.classList.remove('force-closed');
    });
});

document.addEventListener('click', e => {
    dropdowns.forEach(wrapper => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
});