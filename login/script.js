async function enviarFormulario() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const data = { email, password };

    const url = 'https://api-ultrashare.juankicr.dev/auth/user/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const responseData = await response.json();

        if (responseData.message === "Login success") {

            const nombre = responseData.user.nombre;
            const apellidos = responseData.user.apellidos;
            const token = responseData.user.token;
            const userD = {
                "nombre": nombre,
                "apellidos": apellidos,
                "token": token
            };
            localStorage.setItem("userD", JSON.stringify(userD));

            window.location.href = `/platform/`;

        } else {
            alert("Datos incorrectos. Por favor, inténtalo de nuevo.");
            
        }
    } catch (error) {
        alert("Ocurrió un error: " + error.message);
    }
}