// variables
const carrito = document.querySelector("#carrito");    // # "id en el index"
const contenedorCarrito = document.querySelector ("#lista-carrito tbody");      //donde se van a colocar los elementos
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");  // Btn ya que es un boton
const listaCursos = document.querySelector("#lista-cursos"); // no siempre hace falta la palabra "const"
let articulosCarrito = [];

        //los event listeners serian los botones.. los que recibe el html
cargarEventListener(); // mando a llamar la funcion de abajo
function cargarEventListener (){                            // registro los events listener
    listaCursos.addEventListener ("click", agregarCurso) // cuando agregas un curso apretando "Agregar al Carrito"
    //eliminar cursos del carrito
    carrito.addEventListener("click", eliminarCurso);
    //vaciar carrito completo
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = [];  //reseteamos el arreglo
        limpiarHTML(); //eliminamos todo el html
    })
}

//funciones abajo de variables
//function agregarCurso(e){            //agrego la funcion de arriba "agregarCurso" (creada por mi)
//console.log (e.target.classList)    // con esta funcion, clickeo donde quiero y me dice la clase del mismo (en consola)
//}

function agregarCurso(e) {          // "e" es para prevenir el event bubbling, no solo el div lista-cursos, sino el boton
    e.preventDefault();     // para que no te lleve arriba, iniciando el enlace
    if(e.target.classList.contains("agregar-carrito")){ // solo cuando tenga (en length en este caso) "agregar-carrito"
        const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    }
}

//funcion elimina curso del carrito
function eliminarCurso (e) {
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter ( curso => curso.id !== cursoId);
        carritoHTML(); // iterar sobre el carrito y mostrar su html   
    }; 
}



//funcion lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);         // agarra todo lo del curso.. toda la info en la consola.. un renglon
    //creando un objeto con toda la info del curso en la consola
    const infoCurso = {
        imagen: curso.querySelector ("img").src  ,   // aca tengo la src en la web
        titulo: curso.querySelector("h4").textContent  , //quiero el texto en esta parte.. el tituo
        precio: curso.querySelector(".precio span").textContent,        // cada curso tiene un id en el index
        id: curso.querySelector("a").getAttribute ("data-id"),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map ( curso => {  //map itera los elementos del carrito (busca)
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;   //retorna el objeto actualizado
            }else{
                return curso;   //retorna los objetos que no son duplicados (imagen, etc)
            }
        } );
        articulosCarrito = [...cursos];
    } else {
      articulosCarrito = [...articulosCarrito, infoCurso];  //arreglamos el arreglo del carrito
    }
  //agrega elementos al carrito en la web.. la tabla
  articulosCarrito = [...articulosCarrito];  //tomo copia del carrito (vacio), tomo la referencia del articulo anterior
  console.log(articulosCarrito);
  carritoHTML();
}

//muestra el carrito de compras en el html los nuevos objetos(cursos)

function carritoHTML (){

    //limpiar el HTML pra que no aparezcan 1, 12, 123, 1234, etc
    limpiarHTML ();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
            const  { imagen, titulo, precio, cantidad, id} = curso;     //saco el "curso." de todos los td (como curso.imagen)
            const row = document.createElement('tr');
        row.innerHTML = `
      <td> 
        <img src="${curso.imagen}" width="100"></td>        
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
