const form = document.getElementById("formEstudiante");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const edadInput = document.getElementById("edad");
const carreraSelect = document.getElementById("carrera");

const contador = document.getElementById("contador");
const tablaBody = document.querySelector("#tablaEstudiantes tbody");
const sinResultados = document.getElementById("sinResultados");

const btnLimpiar = document.getElementById("btnLimpiar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

let estudiantes = [];

// funcion para actualizar contador
function actualizarContador() {
    contador.textContent = `${estudiantes.length} Estudiante${estudiantes.length !== 1 ? 's' : ''}`;
}

// función para limpiar el formulario
function limpiarFormulario() {
    form.reset();
}

// función para renderizar la tabla
function renderizarTabla() {
    // limpiar tbody
    tablaBody.innerHTML = '';

    if(estudiantes.length === 0){
        tablaBody.appendChild(sinResultados);
    } else {
        estudiantes.forEach((est, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${est.nombre}</td>
                <td>${est.apellido}</td>
                <td>${est.email}</td>
                <td>${est.edad}</td>
                <td>${est.carrera}</td>
                <td><button class="eliminar">Eliminar</button></td>
            `;

            // eliminar un estudiante
            tr.querySelector(".eliminar").addEventListener("click", () => {
                estudiantes.splice(index, 1);
                renderizarTabla();
                actualizarContador();
            });

            tablaBody.appendChild(tr);
        });
    }
}

// agregar estudiante
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // valida que sea mayor de edad
    if(edadInput.value < 18 || edadInput.value > 100){
        alert("La edad debe estar entre 18 y 100 años");
        return;
    }

    const nuevoEstudiante = {
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
        edad: edadInput.value,
        carrera: carreraSelect.options[carreraSelect.selectedIndex].text
    };

    estudiantes.push(nuevoEstudiante);

    renderizarTabla();
    actualizarContador();
    limpiarFormulario();
});

// limpia
btnLimpiar.addEventListener("click", () => {
    limpiarFormulario();
});

// borro 
btnBorrarTodo.addEventListener("click", () => {
    if(estudiantes.length > 0 && confirm("¿Deseas borrar todos los estudiantes?")){
        estudiantes = [];
        renderizarTabla();
        actualizarContador();
    }
});

renderizarTabla();
actualizarContador();