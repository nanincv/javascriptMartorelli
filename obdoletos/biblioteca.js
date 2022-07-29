//URL API

const API_GOOGLE = 'https://books.googleapis.com/books/v1/volumes?q=';

 // Búsqueda, fetch y resultados
const buscarLibro = () => {
	let search =  document.getElementById("search").value
	document.getElementById("results").innerHTML = ""
    fetch(API_GOOGLE  + search)
  .then((resp)=>{
    return resp.json();
  })
  .then(resultados=> {
    console.log(resultados);  
    for (const libros of resultados){
      let libro = libros.items[i].volumeInfo;	
      document.getElementById("results").innerHTML +=  `
            <div class="card m-2 " style="width: 15rem;">
            <img src="${libro.imageLinks.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4>${libro.title}</h4>
              <h6 class="card-title text-success">Autor: ${libro.authors[0]}</h5>
              <p class="card-text">⭐${libro.averageRating}  </p>
              <p class="card-text text-secondary">Género: ${libro.categories}</p>
              <a href="${libro.infoLink}" class="btn btn-primary">Ver info</a>
              <button id="aFav${libro.title}, ${libro.autor} " class="btn btn-primary" onClick="seleccionarLibro()">🤍 fav</button>
            </div>
          </div>`;            
   }    
  
});
}

button.addEventListener("click", () => {
  buscarLibro();
});

