
// FETCH LIBrOS
const insertarLibrosAJAX = () => {
  fetch('./libros.json') 
    .then(respuesta => respuesta.json())
    .then(resultados => {
      console.log(resultados);
      for (const libro of resultados) {
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
          <p class="precio">$${libro.precio}</p>`;
        contenidoLibro.onclick = () => {seleccionarLibro(libro)};
        listadoProductos.appendChild(contenidoLibro);
      }
    }).catch(error => {
      alert('No hay resultados');
    }).finally()
}

insertarLibrosAJAX();

