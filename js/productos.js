let pagina = document.querySelector("#pagina");
pagina = pagina.text;

let item, item2;

const botones_agregar = document.getElementsByClassName("boton");
const botones_eliminar = document.getElementsByClassName("boton__eliminar");
const carrito_navegador = document.querySelector("#navegador_carrito");

const guardarDatos = (datos) =>{

    if(sessionStorage.getItem(datos[0].nombre) === null){
        datos.forEach((dato) =>{
            sessionStorage.setItem(dato.nombre, 0);
            sessionStorage.setItem(dato.nombre+"_precio", dato.precio);
        })

    }

    ajustarCantidad();

    configurarBotones();

}

const obtenerDatos = () =>{
    let path = "";

    if(pagina.includes("Fuentes")){
        path = "../data/datos_fuentes.json";
    }
    else if(pagina.includes("Almacenamiento")){
        path = "../data/datos_almacenamiento.json";
    }
    else if(pagina.includes("Mothers")){
        path = "../data/datos_mothers.json";
    }
    else if(pagina.includes("Placas")){
        path = "../data/datos_placas.json";
    }
    else if(pagina.includes("Procesadores")){
        path = "../data/datos_procesadores.json";
    }
    else if(pagina.includes("RAM")){
        path = "../data/datos_ram.json";
    }

    fetch(path)
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



const ajustarCantidad = () => {
    item = document.getElementsByClassName("producto");
    for(let i = 0; i < item.length; i++){
        item2 = item[i].getElementsByClassName("producto__texto");
        item2[2].innerHTML= `${sessionStorage.getItem(item2[0].innerHTML)}`;
    }
    let cantidad = Number(sessionStorage.getItem("cantidad_productos"));
    if(cantidad <= 0){
        carrito_navegador.innerHTML = `Carrito de compras`;
    }
    else{
        carrito_navegador.innerHTML = `Carrito de compras (${cantidad})`;
    }
}

const configurarBotones = () => {
    item = document.getElementsByClassName("producto");
    for(let i = 0; i < item.length; i++){
        let cantidad;
        botones_agregar[i].onclick = () => {
            item2 = item[i].getElementsByClassName("producto__texto");
            cantidad = Number(sessionStorage.getItem(item2[0].innerHTML));
            sessionStorage.removeItem(item2[0].innerHTML);
            sessionStorage.setItem(item2[0].innerHTML, cantidad+1);

            cantidad = Number(sessionStorage.getItem("cantidad_productos"));
            sessionStorage.removeItem("cantidad_productos");
            sessionStorage.setItem("cantidad_productos", cantidad+1);
            ajustarCantidad();
        }
        botones_eliminar[i].onclick = () => {
            item2 = item[i].getElementsByClassName("producto__texto");
            if(Number(sessionStorage.getItem(item2[0].innerHTML)) > 0){
                cantidad = Number(sessionStorage.getItem(item2[0].innerHTML));
                sessionStorage.removeItem(item2[0].innerHTML);
                sessionStorage.setItem(item2[0].innerHTML, cantidad-1);

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

}


obtenerDatos();







