// URL de tu Backend (Asegúrate que tu python main.py esté corriendo)
const API_URL = "http://136.113.178.153/calcular";

const form = document.getElementById('formulario-calculo');
const resultadoDiv = document.getElementById('resultado');
const errorMsg = document.getElementById('error-msg');

const valorResistencia = document.getElementById('valor-resistencia');
const textoClasificacion = document.getElementById('texto-clasificacion');
const semaforo = document.getElementById('semaforo');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Obtener datos del formulario
    const datos = {
        tipo_acero: parseFloat(document.getElementById('tipo_acero').value),
        temperatura: parseFloat(document.getElementById('temperatura').value),
        reduccion: parseFloat(document.getElementById('reduccion').value)
    };

    try {
        // Ocultar errores previos
        errorMsg.classList.add('hidden');
        resultadoDiv.classList.add('hidden');

        // 2. Enviar petición al Backend (POST)
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error("Error en el servidor o datos inválidos");
        }

        const data = await respuesta.json();

        // 3. Mostrar Resultados
        valorResistencia.innerText = `${data.resistencia} MPa`;
        textoClasificacion.innerText = `Clasificación: ${data.clasificacion}`;
        
        // Cambiar color del semáforo
        semaforo.style.backgroundColor = data.color_semaforo;

        // Hacer visible la caja de resultados
        resultadoDiv.classList.remove('hidden');

    } catch (error) {
        console.error("Falló la conexión:", error);
        errorMsg.innerText = "⚠️ No se pudo conectar con el servidor. Asegúrate de ejecutar 'python main.py'.";
        errorMsg.classList.remove('hidden');
    }
});