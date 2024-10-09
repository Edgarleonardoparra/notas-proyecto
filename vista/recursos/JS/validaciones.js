const formCreate = document.getElementById('form-create');
const formUpdate = document.getElementById('form-update');
const listaNotas = document.getElementById('lista-notas');

// Función para obtener todas las notas
async function obtenerNotas() {
    const response = await fetch('http://localhost:3000/api/notas');
    const notas = await response.json();
    listaNotas.innerHTML = '';
    notas.forEach(nota => {
        const li = document.createElement('li');
        li.textContent = `${nota.titulo}: ${nota.contenido}`;
        listaNotas.appendChild(li);
    });
}

// Función para crear una nueva nota
formCreate.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    await fetch('http://localhost:3000/api/notas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, contenido }),
    });

    obtenerNotas();
    formCreate.reset();
});

// Función para actualizar una nota
formUpdate.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('idNota').value;
    const nuevoTitulo = document.getElementById('nuevoTitulo').value;
    const nuevoContenido = document.getElementById('nuevoContenido').value;

    await fetch(`http://localhost:3000/api/notas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: nuevoTitulo, contenido: nuevoContenido }),
    });

    obtenerNotas();
    formUpdate.reset();
});

// Obtener todas las notas al cargar la página
document.addEventListener('DOMContentLoaded', obtenerNotas);