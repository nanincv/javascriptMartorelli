//URL API
const API_GOOGLE = 'https://books.googleapis.com/books/v1/volumes?q=';

/// Localsotrage Con Operador OR
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []


// busqueda y fetch
const buscarLibro = () => { 
	let search =  document.getElementById("search").value
	document.getElementById("results").innerHTML = ""
    fetch(API_GOOGLE  + search)
  .then((resp)=>{
    console.log(resp);
    return resp.json();
  })
  .then(librosresultado=> {
    console.log(librosresultado);
    result(librosresultado);   
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
                <button onclick="toFav()" 
              type="button" class="btn btn-primary">🤍</button>
          </div>
        </div>`;   
    }    
	}  
button.addEventListener("click", () => {
  buscarLibro();
});

//

