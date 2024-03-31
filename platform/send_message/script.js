const userSelector = document.getElementById('userSelector');
const mediaSelector = document.getElementById('mediaSelector');
const messageTextarea = document.getElementById('message');
const sendButton = document.getElementById('sendButton');
var selectedClient = null;
var selectedMedia = null;

const onLoadScript = () => {
  cargarUsuarios();
}

// Ocultar el botón 
sendButton.style.display = 'none';

// Función para mostrar u ocultar el botón según las condiciones
function cambiarEstadoBoton() {

  if (selectedClient !== null && selectedMedia !== null && messageTextarea.value.trim() !== '') {
    sendButton.style.display = 'block'; // Mostrar el botón 
  } else {
    sendButton.style.display = 'none'; 
  }
}

// Agregar evento de escucha al textarea
messageTextarea.addEventListener('input', cambiarEstadoBoton);

//Selección del cliente:
const setClient = (clientID, elemetClicked) => {
  userOptionsList = document.querySelectorAll('#userSelector .userOption');
  selectedClient = clientID;

  userOptionsList.forEach(userOption => {
    userOption.classList.remove('active');
  });

  elemetClicked.classList.add('active');

  cargarMedios(clientID);
  console.log('Cliente seleccionado:', selectedClient);
  cambiarEstadoBoton();
}  

//Selección del archivo seleccionado:
const setMedia = (mediaID,elemetClicked) => {
  mediaOptionsList = document.querySelectorAll('#mediaSelector .mediaOption');
  selectedMedia = mediaID;
  mediaOptionsList.forEach(mediaOption => {
    mediaOption.classList.remove('active');
  });
  elemetClicked.classList.add('active');

  console.log('Archivo seleccionado:', selectedMedia);
  cambiarEstadoBoton();
}

//Función que muestra la lista de usuarios
const cargarUsuarios = () => {
  let apiURL = 'https://api-ultrashare.juankicr.dev/client/list';

  fetch(apiURL).then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar los usuarios');
    }
    return response.json();
  }).then(data => {
    const users = data.clients;
    let userOptions = '';
    users.forEach(user => {
      userOptions += `        
        <div id="Usuario_${user._id}" class="userOption" onclick="setClient('${user._id}', this)"> 
          <p>${user.nombre} ${user.apellidos}</p>
        </div>
      `;
    });
    userSelector.innerHTML = userOptions;
  }).catch(error => {
    console.error('Error al cargar los usuarios:', error);
  });
}

//Función para mostrar los archivos
const cargarMedios = (client_id) => {
  let apiURL = `https://api-ultrashare.juankicr.dev/client/media/list`;

  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar los medios');
    }
    return response.json();
  }).then(data => {
    const media = data.archivos;
    let mediaOptions = '';
    let preview = '';
    media.forEach(medium => {
      if (medium.file_type === 'video') {
        preview = `<video src="${medium.file_url}" style="width: 215px;"></video>`;
      }else if (medium.file_type === 'imagen'){
        preview = `<img src="${medium.file_url}" style="width: 215px;"></img>`;
      }else{
        preview = `<p>Archivo no soportado</p>`;
      }

      mediaOptions += `        
        <div id="Medio_${medium._id}" class="mediaOption" onclick="setMedia('${medium._id}', this)">
          ${preview}
          <p>${medium.file_type} ${medium._id}</p>
        </div>
      `;
    });
    mediaSelector.innerHTML = mediaOptions;
  }).catch(error => {
    console.error('Error al cargar los medios:', error);
  });
}

/*Función para mandar en consola el contenido de textarea, el cliente seleccionado, y el archivo seleccionado*/
function sendMessage() {
  console.log('Contenido en el textarea: ', messageTextarea.value);
  console.log('Cliente seleccionado:', selectedClient);
  console.log('Archivo seleccionado:', selectedMedia);
}

sendButton.addEventListener('click', sendMessage);


onLoadScript();
