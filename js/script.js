window.addEventListener('scroll', () => {
    if (window.scrollY > 750) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});
const accept = document.getElementById("green-btn-2");
const popup = document.getElementById('popup');
const container = document.getElementById('container');

accept.addEventListener('click', () => {
    popup.style.display = 'none';
    container.classList.remove('blurred');
});


function detectMacOSVersion() {
  const ua = navigator.userAgent;
  const platform = navigator.platform || '';

  const isMac = /Mac/.test(platform) || /Macintosh/.test(ua);

  if (!isMac) {
    return { isMac: false, version: null, versionName: null };
  }

  const match = ua.match(/Mac OS X (\d+)[_.](\d+)(?:[_.](\d+))?/);

  if (!match) {
    return { isMac: true, version: null, versionName: 'Unknown' };
  }

  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = match[3] ? parseInt(match[3], 10) : 0;

  const versionString = `${major}.${minor}.${patch}`;

  const versionNames = {
    '10.15': 'Catalina',
    '10.14': 'Mojave',
    '10.13': 'High Sierra',
    '10.12': 'Sierra',
    '11': 'Big Sur',
    '12': 'Monterey',
    '13': 'Ventura',
    '14': 'Sonoma',
    '15': 'Sequoia',
    '16': 'Tahoe'
  };

  let versionName;
  if (major >= 11) {
    versionName = versionNames[String(major)] || 'Unknown (Modern macOS)';
  } else {
    versionName = versionNames[`${major}.${minor}`] || 'Unknown (Older macOS)';
  }

  return {
    isMac: true,
    version: versionString,
    major,
    minor,
    patch,
    versionName
  };
}


window.addEventListener('load', () => {
  const macInfo = detectMacOSVersion();
  console.log('macOS detection result:', macInfo);


  if (macInfo.isMac) {
    popup.style.display = 'block';
    container.classList.add('blurred');
    console.log(`Detected macOS ${macInfo.versionName} (${macInfo.version})`);
    document.dispatchEvent(new CustomEvent('macOSDetected', { detail: macInfo }));
  }
  else{
    popup.style.display = 'none';
    container.classList.remove('blurred');
  }
});
