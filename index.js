// Obtener la lista de materiales desde localStorage o usar valores por defecto
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
// Función para generar dinámicamente las tarjetas de materiales
function generarTarjetas() {
    const container = document.getElementById('material-card-container');
    container.innerHTML = ''; // Limpiar contenido previo

    materiales.forEach((material, index) => {
        const savedPrice = localStorage.getItem(`precio-${material.nombre}`) || material.precio;
        const card = document.createElement('div');
        card.classList.add('material-card');
        card.innerHTML = `
            <h3>${material.nombre}</h3>
            <p>Precio por unidad: $<span id="precio-${index}">${parseFloat(savedPrice).toFixed(2)}</span></p>
            <label class="switch">
                <input type="checkbox" class="toggle-material" id="toggle-${index}">
                <span class="slider"></span>
            </label>
            <div class="input-container" id="input-container-${index}" style="display: none;">
                <label for="cantidad-${index}">Cantidad:</label>
                <input type="number" id="cantidad-${index}" min="1" value="1">
            </div>
        `;
        container.appendChild(card);

        // Agregar el evento de cambio al checkbox para mostrar/ocultar el campo de cantidad
        document.getElementById(`toggle-${index}`).addEventListener('change', function () {
            const inputContainer = document.getElementById(`input-container-${index}`);
            if (this.checked) {
                inputContainer.style.display = 'block'; // Mostrar el campo de cantidad
            } else {
                inputContainer.style.display = 'none'; // Ocultar el campo de cantidad
            }
        });
    });
}

// Llamar a la función para generar las tarjetas al cargar la página
window.onload = generarTarjetas;

document.getElementById('calculate-costs-btn').addEventListener('click', () => {
    let totalCost = 0;
    let hasError = false;

    document.querySelectorAll('.material-card').forEach((card, index) => {
        const isChecked = card.querySelector('.toggle-material').checked;
        if (isChecked) {
            const cantidadField = card.querySelector(`#cantidad-${index}`).value;
            const cantidad = parseFloat(cantidadField);

            // Verificar si la cantidad es un número válido y mayor a 0
            if (isNaN(cantidad) || cantidad <= 0) {
                alert(`La cantidad para ${materiales[index].nombre} no es válida.`);
                hasError = true;
                return; // Detener el bucle si hay un error
            }

            const precioUnidad = parseFloat(document.getElementById(`precio-${index}`).innerText);
            if (isNaN(precioUnidad)) {
                alert(`El precio por unidad para ${materiales[index].nombre} no es válido.`);
                hasError = true;
                return;
            }

            totalCost += precioUnidad * cantidad;
        }
    });

    if (hasError) {
        return; // Detener la ejecución si hay un error
    }

    const margenField = document.getElementById('margen').value;
    const margen = parseFloat(margenField) / 100;

    if (isNaN(margen)) {
        alert("El margen no es válido.");
        return;
    }

    const precioVenta = totalCost / (1 - margen);
    const ganancia = precioVenta - totalCost;

    document.getElementById('costo-total').innerText = `Costo Total: $${totalCost.toFixed(2)}`;
    document.getElementById('precio-venta').innerText = `Precio de Venta: $${precioVenta.toFixed(2)}`;
    document.getElementById('ganancia').innerText = `Ganancia: $${ganancia.toFixed(2)}`;
});