//URL API

const API_GOOGLE = 'https://books.googleapis.com/books/v1/volumes?q=';

/// Localsotrage Con Operador OR
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

//Añadir a Fav
const seleccionarLibro = (libro) => {
  insertarFav (libro);
  favoritos.push (libro);
  localStorage.setItem('favoritos', JSON.stringify (favoritos));
}

//lista de favoritos dom
const insertarFav = (libro) => {
  const contenedor = document.createElement ('div');
  contenedor.title = libro.title;
  contenedor.innerHTML =  `
  <div class="card m-2 " style="width: 15rem;">
      <img src="${libro.imageLinks?.thumbnail}"class="card-img-top">
    <div class="card-body">
      <h4>${libro.title}</h4>
        <h6 class="card-title text-success">Autor: ${libro.authors}</h5>
          <p class="card-text">⭐${libro.averageRating}  </p>
          <p class="card-text text-secondary">Género: ${libro.categories}</p>
          <a href="${libro.infoLink}" class="btn btn-primary">Ver info</a>
        <button id="aFav" type="button" class="btn btn-primary">🤍 fav</button>
    </div>
  </div>`; 

  favoritosbox.append (contenedor);

}


// busqueda y fetch
const buscarLibro = () => { 
	let search =  document.getElementById("search").value
	document.getElementById("results").innerHTML = ""
    fetch(API_GOOGLE  + search)
  .then((resp)=>{
    return resp.json();
  })
  .then(data=> {
    console.log(data);
    result(data);   
  }) 
  .catch (err => {
    /* uh oh, we have error. */
    document.getElementById('results').innerHTML = "nada por aqui";

  })
}
//pinta resultados en dom
const result = (libros) => {	   
	for(i=0;i<10;i++){
	let libro = libros.items[i].volumeInfo	
	document.getElementById("results").innerHTML +=  `
        <div class="card m-2 " style="width: 15rem;">
            <img src="${libro.imageLinks?.thumbnail}"class="card-img-top">
          <div class="card-body">
            <h4>${libro.title}</h4>
              <h6 class="card-title text-success">Autor: ${libro.authors}</h5>
                <p class="card-text">⭐${libro.averageRating}  </p>
                <p class="card-text text-secondary">Género: ${libro.categories}</p>
                <a href="${libro.infoLink}" class="btn btn-primary">Ver info</a>
                <button onclick="toFav" type="button" class="btn btn-primary">🤍</button>
          </div>
        </div>`;   

    } 
    
	}
//Quiero mandar a fav los libros
  const toFav = () => {
    
  };
  
button.addEventListener("click", () => {
  buscarLibro();
});


/* 
//boton jorge
productosIndex.forEach(productoArray => {
  let botonCard = document.getElementById(`producto${productoArray.id}`).lastElementChild.lastElementChild
  
  botonCard.addEventListener("click", () =>{
      const productoCarrito = new Producto (productoArray.id, productoArray.nombre, productoArray.genero, productoArray.edad, productoArray.color, productoArray.precio, productoArray.stock, productoArray.imagen);
      carrito.push(productoCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito))
  })
})
*/