alert("Hole mensaje enviado!");

//Función para la Lista de clientes
function listaClienteDropdown() {
  const dropdown = document.getElementById('clienteDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

  const clienteContainer = document.querySelector('.clienteL-container');
  if (clienteContainer.textContent.trim() === "Seleccionar cliente") {
    obtenerListaClientes(); 
  }
}


function selectCliente(cliente) {
  const clienteContainer = document.querySelector('.clienteL-container');
  clienteContainer.textContent = cliente.nombre + ' ' + cliente.apellidos;

}

function obtenerListaClientes() {
  fetch("https://api-ultrashare.juankicr.dev/client/list")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener la lista de clientes.");
      }
      return response.json();
    })
    .then(data => {
      const clientesDropdown = document.getElementById("clienteDropdown");
      clientesDropdown.innerHTML = ''; 
      const clients = data.clients;
      clients.forEach(cliente => {
        const clienteElement = document.createElement("div");
        clienteElement.classList.add("cliente-dropdown-item");
        clienteElement.textContent = `${cliente.nombre} ${cliente.apellidos}`;
        clienteElement.onclick = () => selectCliente(cliente);
        clientesDropdown.appendChild(clienteElement);
      });
    })
    .catch(error => console.error("Error al obtener la lista de clientes:", error));
}

