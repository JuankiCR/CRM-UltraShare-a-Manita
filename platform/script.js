function navegateTo (route, linkClicked) {
  checkUser();
  const appContent = document.getElementById('contentWrapper');
  setClicledLnks(linkClicked);
  switch (route) {
    case 'LoadImage':
      fetch('upload_image/index.html')
        .then(response => response.text())
        .then(data => appContent.innerHTML = data);
      break;

    case 'SendMessage':
      fetch('send_message/index.html')
        .then(response => response.text())
        .then(data => appContent.innerHTML = data);
      break;

    case 'TestMessage':
      fetch('send_test/index.html')
        .then(response => response.text())
        .then(data => appContent.innerHTML = data);
      break;

    default:
      fetch('dashboard/index.html')
        .then(response => response.text())
        .then(data => appContent.innerHTML = data);
  }
}

const setClicledLnks = (linkClicked) => {
  const links = document.querySelectorAll('.navLink');
  links.forEach(link => {
    link.classList.remove('active');
  });
  linkClicked.classList.add('active');
}

const checkUser = () => {
  const user = JSON.parse(localStorage.getItem('userD'));
  if (!user) {
    window.location.href = '/';
  }
}