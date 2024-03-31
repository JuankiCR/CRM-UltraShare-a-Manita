function navegateTo(route, linkClicked) {
  checkUser();
  const appContent = document.getElementById('contentWrapper');
  setClicledLnks(linkClicked);
  switch (route) {
    case 'LoadImage':
      fetchPageAndScript('upload_image/index.html', 'upload_image/script.js', appContent);
      break;

    case 'SendMessage':
      fetchPageAndScript('send_message/index.html', 'send_message/script.js', appContent);
      break;

    case 'TestMessage':
      fetchPageAndScript('send_test/index.html', 'send_test/script.js', appContent);
      break;

    default:
      fetchPageAndScript('dashboard/index.html', 'dashboard/script.js', appContent);
  }
}

function fetchPageAndScript(pageURL, scriptURL, container) {
  fetch(pageURL)
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;
      loadScript(scriptURL); // Cargar el script después de cargar el HTML
    });
}

function loadScript(scriptURL) {
  const script = document.createElement('script');
  script.src = scriptURL;
  document.body.appendChild(script);
}

function setClicledLnks(linkClicked) {
  const links = document.querySelectorAll('.navLink');
  links.forEach(link => {
    link.classList.remove('active');
  });
  linkClicked.classList.add('active');
}

function checkUser() {
  const user = JSON.parse(localStorage.getItem('userD'));
  if (!user) {
    window.location.href = '/';
  }
}

window.onload = function() {
  navegateTo('Dashboard', document.getElementById('Dashboard'));
};

