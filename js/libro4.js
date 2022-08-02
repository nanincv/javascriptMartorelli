//URL API
const API_GOOGLE = 'https://books.googleapis.com/books/v1/volumes?q=';
const API_GOOGLE_FREE = 'https://books.googleapis.com/books/v1/volumes?q=fantastic&filter=free-ebooks&max-results=20&startIndex=10';
/// Localsotrage Con Operador OR
//const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
// busqueda y fetch

const buscarLibro = () => {
  let search =  document.getElementById("search").value;
  if (search.length == 0 ) { 
    Swal.fire('Por favor ingresá el título de un libro o un autor');
}
else {
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
}

//pinto resultados en dom
const result = (libros) => {	   
  for(i=0;i<20;i++){
	let libro = libros.items[i].volumeInfo ;	
  let venta = libros.items[i].saleInfo;
  let libroId = libros.items[i].id;	
  //armo la tarjeta verificando los valores con nullish y acc.condicional
	document.getElementById("results").innerHTML +=  `
        <div data-aos="flip-left" id= "libro${libroId}" class="card m-2 " style="width: 15rem;">
            <img src= ${libro.imageLinks?.thumbnail} class="card-img-top">
          <div class="card-body">
          <small class="text-muted"> ID &nbsp; ${libroId} </small>
            <h5> ${libro.title}</h5>
              <h6 class="card-title text-success">Autor: ${libro.authors}</h6>
               <p class="card-text">${venta.saleability ?? "" } </p> 
               <p class="card-text">${venta.listPrice?.currencyCode || "" } ${venta.listPrice?.amount || "" } </p> 
                <p class="card-text">⭐${libro.averageRating ?? ""} </p>
                <p class="card-text text-secondary">Género: ${libro.categories}</p>
                <a href= ${libro.infoLink} class="btn btn-primary">Ver info</a>
                <button id="fav${libroId}" onclick="afav" class="btn btn-primary"> 🤍 </button>
          </div>
        </div>`;  

      }//fin result

   // mandar a favoritos..(no me salió)
   //const afav = () => { };
} 
//activo búsqueda con botón       

button.onclick = () => {
    buscarLibro();
    search.value = '';
  }

//Contenido Derecho Libros gratis
let ebooksGratis = document.getElementById('favoritosbox');

//fetch de libros gratis 
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

  const ATA = () => { alert ('esta')};
  
///Popup Sweetalert GITHUB REGALO
function modalpop(){
  Swal.fire({
    title: '<h4>Tenés una cuenta de Github?</h4><p style="font-size:15px;">Ingresá tu usuario y llevate un regalo especial</p>',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `Hola ${result.value.login}!`,
        imageUrl: result.value.avatar_url,
        html:
          'Tengo este ebook de regalo para vos<br>, ' +
          '<div class="libro-free"><img src="https://covers.zlibcdn2.com/covers299/books/b1/0d/8c/b10d8cb3ee92d824079354706a827f8c.jpg" width="50px;"></img><br>' + '<h5>Javascript Awesomness: Aprendé a escribir javascript de una manera increíble<br>' +
          '<a href="https://es.ar1lib.org/dl/3429030/4fd607" download="proposed_file_name">Descargar Regalo</a></h5></div>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText:
          'No gracias',
        cancelButtonAriaLabel: ''
      })
    }
  })
}


setTimeout(modalpop, 2000);

