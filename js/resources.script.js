window.addEventListener('scroll', () => {
    if (window.scrollY > 750) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
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
            // Close it, and suppress hover until the mouse leaves
            wrapper.classList.remove('open');
            wrapper.classList.add('force-closed');
        } else {
            wrapper.classList.add('open');
            wrapper.classList.remove('force-closed');
        }
    });

    // Re-enable hover behavior after the mouse leaves
    wrapper.addEventListener('mouseleave', () => {
        wrapper.classList.remove('force-closed');
    });
});

// Click anywhere outside closes any open dropdown
document.addEventListener('click', e => {
    dropdowns.forEach(wrapper => {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
});