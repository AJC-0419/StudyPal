document.addEventListener('DOMContentLoaded', () => {
    const accept = document.getElementById("green-btn-2");
    const popup = document.getElementById('popup');
    const container = document.getElementById('container');
    const body = document.body;

    if (!accept || !popup || !container) {
        console.warn('Popup elements not found in DOM.');
        return;
    }

    accept.addEventListener('click', () => {
        popup.style.display = 'none';
        container.classList.remove('blurred');
        body.style.overflow = 'visible';
    });



    window.addEventListener('scroll', () => {
        document.body.classList.toggle('scrolled', window.scrollY > 750);
    });

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

    window.addEventListener('load', () => {
        const macInfo = detectMacOSVersion();
        console.log('macOS detection result:', macInfo);

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
});