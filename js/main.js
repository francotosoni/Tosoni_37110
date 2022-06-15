const carrito_navegador = document.querySelector("#navegador_carrito");

const inicializarStorage = () => {
    if(sessionStorage.getItem("cantidad_productos") === null){
        sessionStorage.setItem("cantidad_productos", 0);
    }
}

const ajustarCantidad = () => {
    if(sessionStorage.getItem("cantidad_productos") == 0){
        carrito_navegador.innerHTML = `Carrito de compras`;
    }
    else{
        carrito_navegador.innerHTML = `Carrito de compras (${sessionStorage.getItem("cantidad_productos")})`;
    }
}

inicializarStorage();
ajustarCantidad();