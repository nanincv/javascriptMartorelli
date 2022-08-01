//URL API
const API_GOOGLE = 'https://books.googleapis.com/books/v1/volumes?q=';
const API_GOOGLE_FREE = 'https://books.googleapis.com/books/v1/volumes?q=fantastic&filter=free-ebooks&max-results=20&startIndex=10';
/// Localsotrage Con Operador OR
//const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
// busqueda y fetch

const buscarLibro = () => {
  let search =  document.getElementById("search").value;
	document.getElementById("results").innerHTML = ""
    fetch(API_GOOGLE  + search)
  .then((resp)=>{
    console.log(resp);
    return resp.json();
  })
// mando al localstorage la búsqueda...
  .then(librosresultado=> {
    localStorage.setItem('resultados', JSON.stringify(librosresultado));
    console.log (librosresultado);
    result(librosresultado);      
  }) 
  .catch (err => {
    /* uh oh, we have error. */
    document.getElementById('results').innerHTML = "nada por aqui";

  })
}

//pinto resultados en dom
const result = (libros) => {	   
  for(i=0;i<10;i++){
	let libro = libros.items[i].volumeInfo;	
  let libroId = libros.items[i].id;	
	document.getElementById("results").innerHTML +=  `
        <div data-aos="flip-left" id= "libro${libroId}" class="card m-2 " style="width: 15rem;">
            <img src= ${libro.imageLinks?.thumbnail} class="card-img-top">
          <div class="card-body">
            <h4> ${libro.title}</h4>
              <h6 class="card-title text-success">Autor: ${libro.authors}</h5>
              <small class="text-muted"> ID &nbsp; ${libroId} </small>
                <p class="card-text">⭐${libro.averageRating}  </p>
                <p class="card-text text-secondary">Género: ${libro.categories}</p>
                <a href= ${libro.infoLink} class="btn btn-primary">Ver info</a>
                <button id="fav${libroId}" onclick="afav" class="btn btn-primary"> 🤍 </button>
          </div>
        </div>`;  

      }//fin result

   // mandar a favoritos..(no me salió)
   //const afav = () => { };
} 
//activo búsqueda botón        
button.addEventListener ("click", () => {
  buscarLibro();
  search.value = '';
  localStorage.clear()
});

//Contenido Derecho Libros gratis
let ebooksGratis = document.getElementById('favoritosbox');

//fetch de libros gratis 1
const librosgratis = () => {
  fetch (API_GOOGLE_FREE)
  .then ((resp) => {
    console.log (resp);
    return resp.json();
  }) .then (freeresults=> {
    console.log (freeresults);
    gratuitos (freeresults);
}).catch(error => {
  console.log('Ups hubo un error');
})
}

  const gratuitos = (ebooks) => {
    for (i=0;i<7;i++) {
      let ebook = ebooks.items[i].volumeInfo;	
      const element = document.createElement('div');
      element.innerHTML += 
      ` <div  class="libro-free" style="width: 15rem;">
            <img src= ${ebook.imageLinks.thumbnail} ">
          <div class="card-body">
            <h5> ${ebook.title}</h5>
              <p class="card-title text-success">by ${ebook.authors}</p>
                <a href= ${ebook.canonicalVolumeLink} class="btn btn-outline-warning">Leer ahora</a>
          </div>
        </div>`;  

        ebooksGratis.append(element); 
    }
}
  librosgratis();

