const materiales = JSON.parse(localStorage.getItem('materiales')) || [
    { nombre: "Cartón A5", precio: 240 },
    { nombre: "Cartón A4", precio: 300 },
    { nombre: "Laminado", precio: 55.20 },
    { nombre: "Cartulina 180 A4", precio: 112 },
    { nombre: "Cartulina 150 A4", precio: 56 },
    { nombre: "Cartulina 120 A4", precio: 48 },
    { nombre: "Cartulina 180 Oficio", precio: 78 },
    { nombre: "Cartulina 150 Oficio", precio: 66 },
    { nombre: "Cartulina 120 Oficio", precio: 52 },
    { nombre: "Cartulina 210 Oficio", precio: 108 },
    { nombre: "Cartulina 240 Oficio", precio: 211.20 },
    { nombre: "Cartulina 180 A3", precio: 224 },
    { nombre: "Hoja Interior", precio: 16 },
    { nombre: "Impresión Alta Calidad", precio: 80 },
    { nombre: "Impresión Estándar", precio: 20 },
    { nombre: "Tinta Negro", precio: 6.67 },
    { nombre: "Tinta Color", precio: 13.33 },
    { nombre: "Pegamento", precio: 375 },
    { nombre: "Elástico", precio: 266.67 },
    { nombre: "Eyelet Común", precio: 60 },
    { nombre: "Eyelet Top", precio: 83.33 },
    { nombre: "Dije con Marca", precio: 800 },
    { nombre: "Bolsas", precio: 250 },
    { nombre: "Esquinero", precio: 80 },
    { nombre: "Pestañas", precio: 50 },
    { nombre: "Hojas Kraf A4", precio: 30 },
    { nombre: "Hojas Kraf A3", precio: 61 },
    { nombre: "Papel Autoadhesivo A4", precio: 180 },
    { nombre: "Papel Vegetal", precio: 100 },
    { nombre: "Anillas 19", precio: 320 },
    { nombre: "Anillas 22", precio: 370 },
    { nombre: "Anillas 25", precio: 470 },
    { nombre: "Anillas 28", precio: 800 },
    { nombre: "Anillas 32", precio: 1000 },
    { nombre: "Anillas 38", precio: 1300 },
    { nombre: "Cartón Blando Oficio", precio: 60 },
    { nombre: "Cartulina Brillante", precio: 120 },
    { nombre: "Cartulina Brillante Autoadhesiva", precio: 180 },
    { nombre: "Cartulina Gespiada 50x70", precio: 143.75 }
    // Agrega el resto de los materiales aquí...
];

// Función para generar los campos de actualización de precios
function generarCamposPrecios() {
    const container = document.getElementById('price-update-container');
    container.innerHTML = ''; // Limpiar contenido previo

    materiales.forEach((material, index) => {
        const savedPrice = localStorage.getItem(`precio-${material.nombre}`) || material.precio;

        const campo = document.createElement('div');
        campo.classList.add('material-price-field');
        campo.innerHTML = `
            <label for="nuevo-precio-${index}">${material.nombre}:</label>
            <input type="number" id="nuevo-precio-${index}" value="${savedPrice}" step="0.01">
        `;

        container.appendChild(campo);
    });
}

// Guardar los precios actualizados
document.getElementById('save-prices-btn').addEventListener('click', () => {
    materiales.forEach((material, index) => {
        const nuevoPrecio = parseFloat(document.getElementById(`nuevo-precio-${index}`).value);
        localStorage.setItem(`precio-${material.nombre}`, nuevoPrecio);
        materiales[index].precio = nuevoPrecio; // Actualizar el precio en la lista local
    });
    localStorage.setItem('materiales', JSON.stringify(materiales)); // Guardar los materiales actualizados
    alert('Precios guardados correctamente.');
});

// Función para añadir un nuevo material
document.getElementById('add-material-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío del formulario

    const nuevoNombre = document.getElementById('nuevo-material-nombre').value.trim();
    const nuevoPrecio = parseFloat(document.getElementById('nuevo-material-precio').value);

    if (nuevoNombre && nuevoPrecio > 0) {
        materiales.push({ nombre: nuevoNombre, precio: nuevoPrecio });
        localStorage.setItem('materiales', JSON.stringify(materiales)); // Guardar el nuevo material en localStorage
        generarCamposPrecios(); // Volver a generar los campos con el nuevo material
        alert('Material añadido correctamente.');

        // Limpiar los campos del formulario
        document.getElementById('add-material-form').reset();
    } else {
        alert('Por favor, ingresa un nombre y un precio válido.');
    }
});

window.onload = generarCamposPrecios;
