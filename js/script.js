document.addEventListener('DOMContentLoaded', () => {
    const accept = document.getElementById("green-btn-2");
    const popup = document.getElementById('popup');
    const container = document.getElementById('container');
    const body = document.body;
    const closebtn = document.querySelectorAll('.close');
    const mobileView = document.getElementById('mobile-view');
    const dropdowns = document.querySelectorAll('.dropdown-wrapper');
    const hidePages = document.querySelectorAll('.mobile-hidden-pages');

    function detectMacOSVersion() {
        const ua = navigator.userAgent;
        const platform = navigator.platform || '';
        const isMac = /Mac/.test(platform) || /Macintosh/.test(ua);

        if (!isMac) return { isMac: false, version: null, versionName: null };

        const match = ua.match(/Mac OS X (\d+)[_.](\d+)(?:[_.](\d+))?/);
        if (!match) return { isMac: true, version: null, versionName: 'Unknown' };

        const major = parseInt(match[1], 10);
        const minor = parseInt(match[2], 10);
        const patch = match[3] ? parseInt(match[3], 10) : 0;
        const versionString = `${major}.${minor}.${patch}`;

        const versionNames = {
            '10.15': 'Catalina', '10.14': 'Mojave', '10.13': 'High Sierra', '10.12': 'Sierra',
            '11': 'Big Sur', '12': 'Monterey', '13': 'Ventura', '14': 'Sonoma', '15': 'Sequoia', '16': 'Tahoe'
        };

        const versionName = major >= 11
            ? (versionNames[String(major)] || 'Unknown (Modern macOS)')
            : (versionNames[`${major}.${minor}`] || 'Unknown (Older macOS)');

        return { isMac: true, version: versionString, major, minor, patch, versionName };
    }

    var isMacDetected = false; 

 
    window.addEventListener('load', () => {
        const macInfo = detectMacOSVersion();
        console.log('macOS detection result:', macInfo);
        isMacDetected = macInfo.isMac;

        if (macInfo.isMac) {
            popup.style.display = 'block';
            container.classList.add('blurred');
            body.style.overflow = 'hidden';
            document.dispatchEvent(new CustomEvent('macOSDetected', { detail: macInfo }));
        } else {
            popup.style.display = 'none';
            container.classList.remove('blurred');
            body.style.overflow = 'visible';
        }
    });

   
    function checkMobileView() {
        var screenWidth = window.innerWidth;
        console.log('Current screen width:', screenWidth);
        if (screenWidth < 420) {
            popup.style.display = 'none';
            container.classList.add('blurred');
            body.style.overflow = 'hidden';
            hidePages.forEach(page => {
                page.style.display = 'none';
            });
           
        } else {
            popup.style.display = isMacDetected ? 'block' : 'none';
            container.classList.toggle('blurred', isMacDetected);
            body.style.overflow = isMacDetected ? 'hidden' : 'visible';
             hidePages.forEach(page => {
                page.style.display = 'intial';
               
            });
        }
       
    }
   

    window.addEventListener('load', checkMobileView);
    window.addEventListener('resize', checkMobileView);


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




   closebtn.forEach(btn => {
        btn.addEventListener('click', () => {
            if (mobileView.style.display !== 'none') {
                mobileView.style.display = 'none';
            }
            popup.style.display = 'none';
            container.classList.remove('blurred');
            body.style.overflow = 'visible';
        });
    });

 container.addEventListener('click', () => {
            const mobileVisible = getComputedStyle(mobileView).display !== 'none';
            if (container.classList.contains('blurred') && mobileVisible) {
                popup.style.display = 'none';
                mobileView.style.display = 'none';
                container.classList.remove('blurred');
                body.style.overflow = 'visible';    
            }
        });


    accept.addEventListener('click', () => {
        popup.style.display = 'none';
        container.classList.remove('blurred');
        body.style.overflow = 'visible';
    });

    window.addEventListener('scroll', () => {
         document.body.classList.toggle('scrolled', window.scrollY > 750);

        
    });
});

