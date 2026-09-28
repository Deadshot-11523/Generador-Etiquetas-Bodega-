// Función para agregar una nueva fila de producto
function agregarProducto() {
    const contenedor = document.getElementById('lista-productos');
    const primeraFila = contenedor.querySelector('.producto-item');
    
    // Clonar la primera fila
    const nuevaFila = primeraFila.cloneNode(true);

    // Limpiar los valores de la nueva fila
    nuevaFila.querySelector('select').value = 'ekipment.jpg';
    nuevaFila.querySelector('input[name="codigo"]').value = '';
    nuevaFila.querySelector('input[name="nombre"]').value = '';
    nuevaFila.querySelector('input[name="cantidad"]').value = '1';
    
    // Mostrar el botón de eliminar
    nuevaFila.querySelector('.btn-eliminar').style.display = 'block';

    contenedor.appendChild(nuevaFila);
    actualizarBotonesEliminar();
}

// Función para eliminar una fila
function eliminarFila(btn) {
    const fila = btn.closest('.producto-item');
    fila.remove();
    actualizarBotonesEliminar();
}

// Muestra u oculta los botones de eliminar si hay más de 1 fila
function actualizarBotonesEliminar() {
    const filas = document.querySelectorAll('.producto-item');
    filas.forEach((fila) => {
        const btnEliminar = fila.querySelector('.btn-eliminar');
        if (filas.length > 1) {
            btnEliminar.style.display = 'block';
        } else {
            btnEliminar.style.display = 'none';
        }
    });
}

// Función principal que procesa la generación e impresión de etiquetas (Reemplazo de PHP)
function generarEtiquetas(event) {
    event.preventDefault(); // Evita recargar la página

    const filas = document.querySelectorAll('.producto-item');
    const contenedorEtiquetas = document.getElementById('contenedor-etiquetas');
    
    // Limpiar etiquetas generadas previamente
    contenedorEtiquetas.innerHTML = '';

    // Recorrer cada producto registrado en el formulario
    filas.forEach(fila => {
        const empresa = fila.querySelector('select').value;
        const codigo = fila.querySelector('input[name="codigo"]').value;
        const nombre = fila.querySelector('input[name="nombre"]').value;
        const cantidad = parseInt(fila.querySelector('input[name="cantidad"]').value) || 1;

        // Determinar la clase del borde según la opción elegida
        let claseBorde = 'borde-ekipment';
        if (empresa.toLowerCase().includes('hoverd')) {
            claseBorde = 'borde-hoverd';
        } else if (empresa.toLowerCase().includes('atp')) {
            claseBorde = 'borde-atp';
        } else if (empresa.toLowerCase().includes('proyectos')) {
            claseBorde = 'borde-proyectos';
        }

        // Repetir la etiqueta según la cantidad del producto
        for (let i = 0; i < cantidad; i++) {
            const etiquetaHTML = `
                <div class="etiqueta-box ${claseBorde}">
                    <div class="info-seccion">
                        <div class="nombre-producto">${nombre.toUpperCase()}</div>
                        <div class="codigo-producto">${codigo.toUpperCase()}</div>
                    </div>
                    <div class="logo-seccion">
                        <img src="${empresa}" alt="Logo Marca">
                    </div>
                </div>
            `;

            // Insertar la etiqueta creada en la vista de impresión
            contenedorEtiquetas.innerHTML += etiquetaHTML;
        }
    });

    // Cambiar de la vista de formulario a la vista de impresión
    document.getElementById('vista-formulario').style.display = 'none';
    document.getElementById('vista-impresion').style.display = 'block';

    // Abrir el diálogo de impresión automáticamente
    window.print();
}

// Función para volver al formulario sin borrar los datos ingresados
function volverAlFormulario() {
    document.getElementById('vista-impresion').style.display = 'none';
    document.getElementById('vista-formulario').style.display = 'block';
}