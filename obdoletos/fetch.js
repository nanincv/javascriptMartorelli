// -------- CONSTANTES NEGOCIO
let productosSugeridos = [];

// -------- CONSTANTES ELEMENTOS DEL DOM
const sugeridos = document.getElementById("sugeridos");
const listadoProductos = document.getElementById("listado");
const precioElementos = document.getElementsByClassName("precio");
const buscadorProducto = document.getElementById('buscador-producto');

// -------- FUNCIONES 
const clickProducto = (producto) => {
  const _producto = new ProductoEnCanasta(producto);
  insertarCanasta(_producto);
  actualizarStorage(canasta);
}

const insertarProductosEnElDom = (productos) => {
  for (const producto of productos) {
    let contenidoProducto = document.createElement("li");
    contenidoProducto.className = "producto";
    contenidoProducto.id = producto.id;
    contenidoProducto.innerHTML = `
      <div class="imagen-producto">
        <img src="${producto.imagen}" alt="">
      </div>
      <p class="nombre">${producto.nombre}</p>
      <p class="precio">$${producto.precio}</p>
      `;
    contenidoProducto.onclick = () => {clickProducto(producto)};

    listadoProductos.appendChild(contenidoProducto);
  }
}
/* 
// FETCH PRODUCTOS CON PROMESAS
const insertarProductos = () => {
  listadoProductos.innerHTML = 'Cargando...';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = true;
      if (res) {
        resolve(productos);
      } else {
        reject(400);
      }
    }, 2000)
  })
}
*/

// FETCH PRODUCTOS
const insertarProductosAJAX = () => {
  fetch('./productos.json')
    .then(respuesta => respuesta.json())
    .then(resultados => {
      console.log(resultados);
      for (const producto of resultados) {
        let contenidoProducto = document.createElement("li");
        contenidoProducto.className = "producto";
        contenidoProducto.id = producto.id;
        contenidoProducto.innerHTML = `
          <div class="imagen-producto">
            <img src="${producto.imagen}" alt="">
          </div>
          <p class="nombre">${producto.nombre}</p>
          <p class="precio">$${producto.precio}</p>
          `;
        contenidoProducto.onclick = () => {clickProducto(producto)};
    
        listadoProductos.appendChild(contenidoProducto);
      }
      //consumo de la respuesta del API
    }).catch(error => {
      alert('No hay resultados');
    }).finally()
}

// FETCH PRODUCTOS CON ASYNC/AWAIT
const insertarProductosAsync = async () => {
  try {
    const respuesta = await fetch('./productos.json');
    const resultados = await respuesta.json();
    insertarProductosEnElDom(resultados.productos);
    productosSugeridos = resultados.sugeridos;
  } catch {
    alert('Error!!!');
  } finally { // opcional

  }
}

insertarProductosAsync();
// insertarProductosAJAX();

const insertartBusquedasSugeridad = () => {
  for (const sugerido of productosSugeridos) {
    const li = document.createElement('li');
    li.classList.add('sugerido');
    li.innerHTML = sugerido;
    sugeridos.append(li);
  }
}

const quitarBusquedasSugeridas = () => {
  sugeridos.innerHTML = '';
}

const verficarStorage = () => {
  if (!!canastaStorage && canastaStorage.length > 0) {
    for (const producto of canastaStorage) {
      insertarProductoAlDOM(new ProductoEnCanasta(producto));
    }
  }
}

//CÓDIGO
verficarStorage();

buscadorProducto.onfocus = () => insertartBusquedasSugeridad();
buscadorProducto.onblur = () => quitarBusquedasSugeridas();