//Creamos URL
const apiUrl = 'https://rickandmortyapi.com/api/character/';
var personajes = []
// Consumimos la API con un fecth asincrono.
// Función para obtener los datos de la API y mostrar las tarjetas
async function obtenerYMostrarTarjetas() {
    try {
        await fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                // Tomar solo los primeros 15 objetos del array de datos
                const primeros15Datos = data.results.slice(0, 15);
                console.log(primeros15Datos)
                // Crear las tarjetas con los datos obtenidos
                actualizarSelectConPersonajes(primeros15Datos);
                personajes = primeros15Datos;
                crearTarjeta()
            });
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error.message);
    }
}

function crearTarjeta() {
    personajes.forEach(personaje => {
        const part = `
         <div class="flex flex-col m-4">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${personaje.image}" class="w-full max-h-full object-cover img-zoom transition-all duration-500">
            <div class="p-3 absolute transition-shadow mb-2">
              <h2 class="text-lg text-center font-semibold">${personaje.name}</h2>
              </div>
              </div>
              `
        const articulo = document.createRange().createContextualFragment(part)
        const main = document.getElementById("personajes")
        main.append(articulo)
    });
}
// Recoremos cada uno de los personajes insertandolos 
function actualizarSelectConPersonajes(personajes) {
    const selectFiltro = document.getElementById('filtro');
    selectFiltro.innerHTML = ''; // Limpiar opciones anteriores

    // Añadir opción "Todos"
    const optionTodos = document.createElement('option');
    optionTodos.value = 'todos';
    optionTodos.textContent = 'Todos';
    selectFiltro.appendChild(optionTodos);

    // Llenar el select con opciones de nombres de personajes
    personajes.forEach(personaje => {
        const option = document.createElement('option');
        option.value = personaje.name.toLowerCase();
        option.textContent = personaje.name;
        selectFiltro.appendChild(option);
    });
}

// Evento de cambio en el select
document.getElementById('filtro').addEventListener('change', function () {
    const nombreFiltro = this.value;
    mostrarTarjetasFiltradas(nombreFiltro);
});

// Función para mostrar las tarjetas filtradas según el nombre seleccionado
async function mostrarTarjetasFiltradas(nombreFiltro) {
    try {

        // Filtrar los personajes según el nombre seleccionado
        const personajesFiltrados = personajes.filter(personaje => {
            return nombreFiltro === 'todos' || personaje.name.toLowerCase() === nombreFiltro;

            // Mostrar las tarjetas filtradas

        });
        crearTarjetaFiltrada(personajesFiltrados);


    } catch (error) {
        console.error('Error al mostrar las tarjetas filtradas:', error.message);
    }
}

// Función para mostrar las tarjetas de personajes
function crearTarjetaFiltrada(personajes) {
    const main = document.getElementById("personajes")

    main.innerHTML = ''; // Limpiar contenido anterior
    personajes.forEach(personaje => {
        const part = `
        <div class="flex justify-center items-center m-4 h-auto">
        <div class="w-full max-w-md">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${personaje.image}" class="w-full object-cover img-zoom transition-all duration-500">
            <div class="p-3 absolute transition-shadow">
              <h2 class="text-lg text-center font-semibold">${personaje.name}</h2>
            </div>
          </div>
        </div>
      </div>
             `
        const personajesSection = document.getElementById('personajes');
      
        // Quitamos las clases específicas del elemento
        personajesSection.classList.remove('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'gap-3');
        const articulo = document.createRange().createContextualFragment(part)
        if (personajes.length > 1) {
            personajesSection.classList.add('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'gap-3', 'h-auto');
        }
        const main = document.getElementById("personajes")
        main.append(articulo)

    });

}

function Menu(e) {
    let list = document.querySelector('ul');
    e.name === 'menu' ? (e.name = "close", list.classList.add('top-[75px]'), list.classList.add('opacity-100'), list.classList.add('z-auto')) : (e.name = "menu", list.classList.remove('top-[75px]'), list.classList.remove('opacity-100'))
}

obtenerYMostrarTarjetas()