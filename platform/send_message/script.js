const userSelector = document.getElementById('userSelector');
const mediaSelector = document.getElementById('mediaSelector');
var selectedClient = null;
var selectedMedia = null;

const onLoadScript = () => {
  cargarUsuarios();
}

const setClient = (clientID, elemetClicked) => {
  userOptionsList = document.querySelectorAll('#userSelector .userOption');
  selectedClient = clientID;

  userOptionsList.forEach(userOption => {
    userOption.classList.remove('active');
  });

  elemetClicked.classList.add('active');

  cargarMedios(clientID);
  console.log('Cliente seleccionado:', selectedClient);
}  

const setMedia = (mediaID) => {
  selectedMedia = mediaID;
  console.log('Media seleccionado:', selectedMedia);
}

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
        preview = `<video src="${medium.file_url}" style="width: 100px;"></video>`;
      }else if (medium.file_type === 'imagen'){
        preview = `<img src="${medium.file_url}" style="width: 100px;"></img>`;
      }else{
        preview = `<p>Archivo no soportado</p>`;
      }

      mediaOptions += `        
        <div id="Medio_${medium._id}" class="mediaOption" onclick="setMedia('${medium._id}')">
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

onLoadScript();
// //Función para la Lista de clientes
// function listaClienteDropdown() {
//   const dropdown = document.getElementById('clienteDropdown');
//   dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

//   const clienteContainer = document.querySelector('.clienteL-container');
//   if (clienteContainer.textContent.trim() === "Seleccionar cliente") {
//     obtenerListaClientes(); 
//   }
// }

// function selectCliente(cliente) {
//   const clienteContainer = document.querySelector('.clienteL-container');
//   clienteContainer.textContent = cliente.nombre + ' ' + cliente.apellidos;

// }

// function obtenerListaClientes() {
//   fetch("https://api-ultrashare.juankicr.dev/client/list")
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Error al obtener la lista de clientes.");
//       }
//       return response.json();
//     })
//     .then(data => {
//       const clientesDropdown = document.getElementById("clienteDropdown");
//       clientesDropdown.innerHTML = ''; 
//       const clients = data.clients;
//       clients.forEach(cliente => {
//         const clienteElement = document.createElement("div");
//         clienteElement.classList.add("cliente-dropdown-item");
//         clienteElement.textContent = `${cliente.nombre} ${cliente.apellidos}`;
//         clienteElement.onclick = () => selectCliente(cliente);
//         clientesDropdown.appendChild(clienteElement);
//       });
//     })
//     .catch(error => console.error("Error al obtener la lista de clientes:", error));
// }
