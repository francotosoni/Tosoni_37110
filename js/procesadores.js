let productos = [];

const guardarDatos = (datos) =>{

    datos.forEach((dato) =>{
        productos.push({nombre: dato.nombre, cantidad: 0, precio: dato.precio});
    })

    inicializarStorage();
    inicializarArray();

    configurarBotones();

}

const obtenerDatos = () =>{
    fetch("../data/datos_procesadores.json")
    .then((res)=>{
        return res.json();
    })
    .then((datos) =>{
        guardarDatos(datos);
    })
    .catch((err) =>{
        console.log("ERROR");
    })

    return true;
}

const botones_agregar = document.getElementsByClassName("boton");
const botones_eliminar = document.getElementsByClassName("boton__eliminar");
const boton_comprar = document.querySelector("#boton_comprar");
const carrito_navegador = document.querySelector("#navegador_carrito");

let item, item2;

const inicializarStorage = () => {
    if(sessionStorage.getItem(productos[0].nombre) === null){
        for(const producto of productos){
            sessionStorage.setItem(producto.nombre, producto.cantidad);
        }
    }
}

const ajustarCantidad = () => {
    item = document.getElementsByClassName("producto");
    for(let i = 0; i < productos.length; i++){
        item2 = item[i].getElementsByClassName("producto__texto");
        item2[2].innerHTML= `${productos[i].cantidad}`;
    }
    let cantidad = Number(sessionStorage.getItem("cantidad_productos"));
    if(cantidad <= 0){
        carrito_navegador.innerHTML = `Carrito de compras`;
    }
    else{
        carrito_navegador.innerHTML = `Carrito de compras (${cantidad})`;
    }
}

const comprar = () => {
    let productosConImpuestos = productos.map(item => item.precio*1.21);
     
    Swal.fire(`El valor final de los productos incluyuendo los impuestos: \n\n${productos[0].nombre} x ${productos[0].cantidad} = $${(productosConImpuestos[0]*productos[0].cantidad)}\n${productos[1].nombre} x ${productos[1].cantidad} = $${(productosConImpuestos[1]*productos[1].cantidad)}\n${productos[2].nombre} x ${productos[2].cantidad} = $${(productosConImpuestos[2]*productos[2].cantidad)}\n${productos[3].nombre} x ${productos[3].cantidad} = $${(productosConImpuestos[3]*productos[3].cantidad)}\n${productos[4].nombre} x ${productos[4].cantidad} = $${(productosConImpuestos[4]*productos[4].cantidad)}\n\nEl total es $${(productosConImpuestos[4]*productos[4].cantidad)+(productosConImpuestos[3]*productos[3].cantidad)+(productosConImpuestos[2]*productos[2].cantidad)+(productosConImpuestos[1]*productos[1].cantidad)+(productosConImpuestos[0]*productos[0].cantidad)}\n\n¡Vuelva pronto!`);
    for(let i = 0; i < 5; i++){
        sessionStorage.removeItem(i);
        productos[i].cantidad = 0;
        sessionStorage.setItem(i, productos[i].cantidad);
    }
    ajustarCantidad();
}


const inicializarArray = () => {
    for(let i = 0; i < productos.length; i++){
        productos[i].cantidad = sessionStorage.getItem(productos[i].nombre);
    }
    ajustarCantidad();
}

const configurarBotones = () => {
    for(let i = 0; i < productos.length; i++){
        let cantidad;
        botones_agregar[i].onclick = () => {
            productos[i].cantidad++;
            sessionStorage.removeItem(productos[i].nombre);
            sessionStorage.setItem(productos[i].nombre, productos[i].cantidad);

            cantidad = Number(sessionStorage.getItem("cantidad_productos"));
            sessionStorage.removeItem("cantidad_productos");
            sessionStorage.setItem("cantidad_productos", cantidad+1);
            ajustarCantidad();
        }
        botones_eliminar[i].onclick = () => {
            if(productos[i].cantidad > 0){
                productos[i].cantidad--;
                sessionStorage.removeItem(productos[i].nombre);
                sessionStorage.setItem(productos[i].nombre, productos[i].cantidad);

                cantidad = Number(sessionStorage.getItem("cantidad_productos"));
                sessionStorage.removeItem("cantidad_productos");
                sessionStorage.setItem("cantidad_productos", cantidad-1);
                ajustarCantidad();
            }
            else
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡No tienes productos de este tipo para eliminar!',
            })
        }
    }

    /*boton_comprar.onclick = () => {
        comprar();    
    }*/
}


obtenerDatos();








