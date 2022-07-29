
//URL API
const API_GOOGLE = "https://www.googleapis.com/books/v1/volumes?q=key=AIzaSyAXKQ6TfCc0La3QhEZtKwiYEvOte-HrZD8" + search;

// DOM
const contenedor = document.querySelector("#contenedor");
/* 
function bookSearch(){
	var search =  document.getElementById("search").value
	document.getElementById("results").innerHTML = ""
*/

function bookSearch(){
	var search =  document.getElementById("search").value
	document.getElementById("results").innerHTML = ""
 
  fetch(API_GOOGLE)
  .then((resp)=>{
    console.log (resp);
    return resp.json();
  })
  .then(data => {
    console.log(data);
    result(data); 
    
    for(i=0;i<100;i++){
        var jdata = data.items[i].volumeInfo	

        document.getElementById("results").innerHTML += 
        
        
        
        
        "<div><div><h2>" + jdata.title "</h2>""<h3>" + jdata.authors[0] + "</h3>" + "<h4>" + jdata.publishedDate + "</h4></div>" + "<div class='col-sm-4'><img src='" + jdata.imageLinks.thumbnail + "'></div><a  target='_blank' href='" + jdata.infoLink + "'><button class='btn btn-primary'>Learn More</button></a></div>"
 }

  })
  .catch()
}

document.getElementById('button').addEventListener('click', bookSearch, false)
