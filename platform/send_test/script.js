alert("Hola test enviado!");

//función para enviar mensaje de test:
async function enviarMensajeTest() {
    const message = document.querySelector('.textArea1').value; 
  
    const data = { "message": message }; 
  
    const url = 'https://api-ultrashare.juankicr.dev/service/send/test';
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
            alert(responseData.message);
  
        } else {
            alert("Ocurrió un error: " + responseData.message);
        }
  
    } catch (error) {
        alert("Ocurrió un error: " + error.message);
    }
  }
  