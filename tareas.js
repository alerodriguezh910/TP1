const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
}

class Tarea {
    constructor(titulo, descripcion = "") {
        this.id = Date.now();
        this.titulo = titulo;
        this.descripcion = descripcion; 
        this.estado = "Pendiente"; 
        this.creada = new Date(); 
    }
}

let tareas = [];

// Menú principal
async function menuPrincipal() {
    let opcion;
    do {
        opcion = await preguntar(
            "\n MENÚ PRINCIPAL\n" +
            "1. Ver Mis Tareas\n" +
            "2. Buscar una Tarea\n" +
            "3. Agregar una Tarea\n" +
            "4. Editar una Tarea\n" +
            "0. Salir\n\n" +
            "Elige una opción: "
        );

        switch (opcion) {
            case "1":
                await menuVerTareas();
                break;
            case "2":
                await buscarTarea();
                break;
            case "3":
                await agregarTarea();
                break;
            case "4":
                await editarTarea();
                break;
            case "0":
                console.log("Saliendo del programa...");
                break;
            default:
                console.log("Opción no válida");
        }
    } while (opcion !== "0");

    rl.close();
}

// Submenú de tareas
async function menuVerTareas() {
    let opcion;
    do {
        opcion = await preguntar(
            "\n VER TAREAS\n" +
            "1. Todas\n" +
            "2. Pendientes\n" +
            "3. En curso\n" +
            "4. Terminadas\n" +
            "0. Volver\n\n" +
            "Elige una opción: "
        );

        switch (opcion) {
            case "1":
                mostrarTareas("Todas");
                break;
            case "2":
                mostrarTareas("Pendiente");
                break;
            case "3":
                mostrarTareas("En curso");
                break;
            case "4":
                mostrarTareas("Terminada");
                break;
            case "0":
                break;
            default:
                console.log("Opción no válida");
        }
    } while (opcion !== "0");
}

// Agregar tarea
async function agregarTarea() {
    const titulo = await preguntar("Título de la tarea: ");
    const descripcion = await preguntar("Descripción (opcional): ");

    if (titulo) {
        const nueva = new Tarea(titulo, descripcion);
        tareas.push(nueva);
        console.log("Tarea agregada:", nueva);
    } else {
        console.log("El título no puede estar vacío.");
    }
}

// Mostrar tareas
function mostrarTareas(filtro) {
    console.log(`\n📋 Listado de tareas (${filtro}):`);
    let lista = tareas;

    if (filtro !== "Todas") {
        lista = tareas.filter((t) => t.estado === filtro);
    }

    if (lista.length === 0) {
        console.log(" No hay tareas en esta categoría.");
        return;
    }

    lista.forEach((t) => {
        console.log(
            `[${t.id}] ${t.titulo} - ${t.estado}\n   ${t.descripcion || ""}\n`
        );
    });
}

// Buscar tarea
async function buscarTarea() {
    const texto = await preguntar("Ingresa texto para buscar: ");
    const resultados = tareas.filter((t) =>
        t.titulo.toLowerCase().includes(texto.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log("No se encontraron tareas.");
    } else {
        console.log("Resultados:");
        resultados.forEach((t) =>
            console.log(`[${t.id}] ${t.titulo} - ${t.estado}`)
        );
    }
}

// Editar tarea
async function editarTarea() {
    const id = Number(await preguntar("Ingresa el ID de la tarea a editar: "));
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
        console.log("No existe esa tarea.");
        return;
    }

    const nuevoTitulo = await preguntar(
        `Título actual: ${tarea.titulo}\nNuevo título (vacío = no cambiar): `
    );
    const nuevaDesc = await preguntar(
        `Descripción actual: ${tarea.descripcion}\nNueva descripción (vacío = no cambiar): `
    );
    const nuevoEstado = await preguntar(
        `Estado actual: ${tarea.estado}\nNuevo estado (Pendiente, En curso, Terminada): `
    );

    if (nuevoTitulo) tarea.titulo = nuevoTitulo;
    if (nuevaDesc) tarea.descripcion = nuevaDesc;
    if (["Pendiente", "En curso", "Terminada"].includes(nuevoEstado)) {
        tarea.estado = nuevoEstado;
    }

    console.log("Tarea actualizada:", tarea);
}

menuPrincipal();