// -------- CONSTANTE Libros
const libros = [
  
  {id:1, titulo: "El Hobbit",  autor: "J.R Tolkien", genero: "Novela fantástica",precio:"20",imagen:"img/bookmp.jpg"},
  {id:2, titulo: "1984",  autor: "George Orwell", genero: "Ficción distópica",precio:"20",imagen:"img/bookmp.jpg"},
  {id:3, titulo: "El mundo perdido",  autor: "Arthur Conan Doyle", genero: "Ciencia ficcón",precio:"20",imagen:"img/bookmp.jpg"},
  {id:4, titulo: "Cuentos de la selva",  autor: "Horacio Quiroga", genero: "Cuento",precio:"20",imagen:"img/bookmp.jpg"},
  {id:5, titulo: "A sangre fría",  autor: "Truman Capote", genero: "Policial",precio:"20",imagen:"img/bookmp.jpg"},
  ];

/* 
let canasta = []; // Va a  LocalStorage
let canastaStorage = JSON.parse(localStorage.getItem('canasta')); 
*/

/// Con Operador OR
const canasta = JSON.parse(localStorage.getItem('canasta')) || []

///Popup Sweetalert
function modalpop(){
  Swal.fire({
    title: 'Nuevo Ebook!',
    text: 'No te pierdas este estreno!',
    imageUrl: 'img/bookmp.jpg',
    imageWidth: 250,
    imageHeight: 250,
    imageAlt: 'No te lo pierdas',
  })
}

setTimeout(modalpop, 2000);


// DOM
const listadoProductos = document.getElementById("listado");
const precioElementos = document.getElementsByClassName("precio");
const contenedorCanasta = document.getElementById("canasta");
const botonBorrar = document.getElementById ("borrarCanasta");
//const buscadorProducto = document.getElementById('buscador-producto'); Todavía no programo buscador


// Funcion añadir al carrito
const seleccionarLibro = (libro) => {
  insertarCanasta(libro);
  canasta.push(libro);
  localStorage.setItem('canasta', JSON.stringify(canasta));
}

/* 
  function eliminarCarrito() {
    canasta = [];
    localStorage.removeItem("carritoEnStorage");

    document.getElementById("carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}
*/


// Libos en la canasta "Selección"
const insertarCanasta = (libro) => {
  const contenedor = document.createElement('div');
  contenedor.classList = 'producto-canasta';
  contenedor.id = libro.id;
  contenedor.innerHTML = `<img src="${libro.imagen}">
  <div class="descripcion-producto">
  <p>  Ebook: ${libro.titulo}</p>
  <p>  ${libro.autor},${libro.genero} </p>
  <b> $ ${libro.precio}</b>
  </div>`;

  contenedorCanasta.append(contenedor);
}

//Funcion borrar selección

function borrarTodo(canasta)
{
    document.getElementById("canasta").innerHTML = "";
    localStorage.clear();
}

botonBorrar.onclick = function() { borrarTodo(); 
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu selección fue borrada con éxito',
    showConfirmButton: false,
    timer: 1500
  })};

//canasta.length === 0 && alert("Tu canasta está vacío!");

// &&  window.localStorage.clear();

// Tarjetas de libros en la biblioteca "Biblioteca"
const insertarProductos = () => {
  for (const libro of libros) {
    let contenidoLibro = document.createElement("li");
    contenidoLibro.className = "producto";
    contenidoLibro.id = libro.id;
    contenidoLibro.innerHTML = `
      <div class="imagen-producto">
        <img src="${libro.imagen}" alt="">
      </div>
      <h3>${libro.titulo}</h3>
      <p class="nombre">${libro.autor}</p>
      <p class="nombre">${libro.genero}</p>
      <p class="precio">$${libro.precio}</p>
      <button id="Seleccionar">Agregar</button>`;//Este botón no funciona, el click es en todo el libro Sigo después

    contenidoLibro.onclick = () => {seleccionarLibro(libro)};
    listadoProductos.appendChild(contenidoLibro);
  }
}

// Esto lo copié tal cual...estoy procensándolo
const verficarStorage = () => {
  console.log(canastaStorage);
  if (!!canastaStorage && canastaStorage.length > 0) {
    for (const producto of canastaStorage) {
      console.log(producto);
      insertarCanasta(producto);
    }
  }
}


insertarProductos();
verficarStorage();

