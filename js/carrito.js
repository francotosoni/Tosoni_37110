const carrito_navegador = document.querySelector("#navegador_carrito");
const contenedor = document.querySelector(".carrito");
const boton_contenedor = document.querySelector(".inicio");
const botones_agregar = document.getElementsByClassName("carrito_boton_agregar");
const botones_eliminar = document.getElementsByClassName("carrito_boton_eliminar");
const botones_borrar = document.getElementsByClassName("carrito_boton_borrar");

const inicializarStorage = () => {
    if(sessionStorage.getItem("cantidad_productos") === null){
        sessionStorage.setItem("cantidad_productos", 0);
    }
}

const configurarBotones = () => {
    item = document.getElementsByClassName("carrito__producto");
    for(let i = 0; i < item.length; i++){
        let cantidad;
        botones_agregar[i].onclick = () => {
            item2 = item[i].getElementsByClassName("carrito__nombre");
            cantidad = Number(sessionStorage.getItem(item2[0].innerHTML));
            sessionStorage.removeItem(item2[0].innerHTML);
            sessionStorage.setItem(item2[0].innerHTML, cantidad+1);

            cantidad = Number(sessionStorage.getItem("cantidad_productos"));
            sessionStorage.removeItem("cantidad_productos");
            sessionStorage.setItem("cantidad_productos", cantidad+1);

            cantidad = item.length;
            for(let i = cantidad-1; i >= 0; i--)
                contenedor.removeChild(item[i]);
            
            item = document.getElementsByClassName("comprar__bloque");
            boton_contenedor.removeChild(item[0]);    

            ajustarCantidad();
        }
        botones_eliminar[i].onclick = () => {
            item2 = item[i].getElementsByClassName("carrito__nombre");
            if(Number(sessionStorage.getItem(item2[0].innerHTML)) > 0){
                cantidad = Number(sessionStorage.getItem(item2[0].innerHTML));
                sessionStorage.removeItem(item2[0].innerHTML);
                sessionStorage.setItem(item2[0].innerHTML, cantidad-1);

                cantidad = Number(sessionStorage.getItem("cantidad_productos"));
                sessionStorage.removeItem("cantidad_productos");
                sessionStorage.setItem("cantidad_productos", cantidad-1);

                cantidad = item.length;
                for(let i = cantidad-1; i >= 0; i--)
                    contenedor.removeChild(item[i]);

                item = document.getElementsByClassName("comprar__bloque");
                boton_contenedor.removeChild(item[0]);

                ajustarCantidad();
            }
        }

        botones_borrar[i].onclick = () => {
            item2 = item[i].getElementsByClassName("carrito__nombre");

            let cantidad_eliminada = Number(sessionStorage.getItem(item2[0].innerHTML));
            sessionStorage.removeItem(item2[0].innerHTML);
            sessionStorage.setItem(item2[0].innerHTML, 0);

            cantidad = Number(sessionStorage.getItem("cantidad_productos"));
            sessionStorage.removeItem("cantidad_productos");
            sessionStorage.setItem("cantidad_productos", cantidad-cantidad_eliminada);

            cantidad = item.length;
            for(let i = cantidad-1; i >= 0; i--)
                contenedor.removeChild(item[i]);
            
            item = document.getElementsByClassName("comprar__bloque");
            boton_contenedor.removeChild(item[0]);

            ajustarCantidad();
        }


    }

        const boton_comprar = document.querySelector(".boton__comprar");
        boton_comprar.onclick = () => {
            comprar();    
        }
}

let documentFragment = document.createDocumentFragment();

const ajustarCantidad = () => {
    if(sessionStorage.getItem("cantidad_productos") == 0){
        carrito_navegador.innerHTML = `Carrito de compras`;
        let span = document.createElement("SPAN");
        span.classList.add(`carrito__texto`);
        span.innerHTML = "No hay elementos en el carrito";
        contenedor.appendChild(span);

        let a = document.createElement("A");
        a.classList.add(`enlace__productos`);
        a.setAttribute("href","../pages/productos_procesadores.html");
        a.innerHTML = "Seguir comprando";
        contenedor.appendChild(a);
    }
    else{
        carrito_navegador.innerHTML = `Carrito de compras (${sessionStorage.getItem("cantidad_productos")})`;

        for(let i = 0; i < sessionStorage.length; i++){
            if(sessionStorage.getItem(sessionStorage.key(i)) != 0 && sessionStorage.key(i) != "cantidad_productos" && sessionStorage.key(i).includes("precio") == false && sessionStorage.key(i) != "IsThisFirstTime_Log_From_LiveServer"){

                let div = document.createElement("DIV");
                div.classList.add(`carrito__producto`);

                let span = document.createElement("SPAN");
                span.classList.add(`carrito__nombre`);
                span.innerHTML = sessionStorage.key(i);
                div.appendChild(span);

                let dinero = document.createElement("SPAN");
                dinero.classList.add(`carrito__precio`);
                let precio = Number(sessionStorage.getItem(sessionStorage.key(i))) * Number(sessionStorage.getItem(sessionStorage.key(i)+"_precio"));
                dinero.innerHTML = `$ ${new Intl.NumberFormat('de-DE').format(precio)}`;
                div.appendChild(dinero);

                let div_cantidad = document.createElement("DIV");
                div_cantidad.classList.add(`carrito__especificacion`);

                let boton_eliminar = document.createElement("button");
                boton_eliminar.classList.add(`carrito_boton_eliminar`);
                boton_eliminar.innerHTML = "-";
                div_cantidad.appendChild(boton_eliminar);

                let span_cantidad = document.createElement("SPAN");
                span_cantidad.classList.add(`carrito__cantidad`);
                span_cantidad.innerHTML = sessionStorage.getItem(sessionStorage.key(i));
                div_cantidad.appendChild(span_cantidad);

                let boton_agregar = document.createElement("button");
                boton_agregar.classList.add(`carrito_boton_agregar`);
                boton_agregar.innerHTML = "+";
                div_cantidad.appendChild(boton_agregar);

                div.appendChild(div_cantidad);

                let boton_borrar = document.createElement("button");
                boton_borrar.classList.add(`carrito_boton_borrar`);
                boton_borrar.innerHTML = "X";
                div.appendChild(boton_borrar);

                documentFragment.appendChild(div);               

            }

        }

        let div = document. createElement("DIV");
        div.classList.add("comprar__bloque");

        let boton = document.createElement("button");
        boton.classList.add("boton__comprar");
        boton.innerHTML = "Comprar";
        div.appendChild(boton);

        boton_contenedor.appendChild(div);

        contenedor.appendChild(documentFragment);

        configurarBotones();
    }

}

inicializarStorage();
ajustarCantidad();


const comprar = () => {
     
    item = document.getElementsByClassName("carrito__producto");

    let total = 0;

    for(let i = 0; i < item.length; i++){
        item2 = item[i].getElementsByClassName("carrito__nombre");
        let nombre = item2[0].innerHTML;

        total += (Number(sessionStorage.getItem(nombre)) * Number(sessionStorage.getItem(nombre+"_precio")));

    }

    Swal.fire(`¡Felicidades! Se ha concretado la compra. <br><br> El total con impuestos incluidos es $ ${new Intl.NumberFormat('de-DE').format(total)}`);
    
    for(let i = sessionStorage.length - 1; i >= 0; i--){
        if(sessionStorage.getItem(sessionStorage.key(i)) != 0 && sessionStorage.key(i).includes("precio") == false && sessionStorage.key(i) != "IsThisFirstTime_Log_From_LiveServer"){
            
            let nombre = sessionStorage.key(i);
            sessionStorage.removeItem(nombre);
            sessionStorage.setItem(nombre, 0);
        }
    }

    cantidad = item.length;
    for(let i = cantidad-1; i >= 0; i--)
        contenedor.removeChild(item[i]);
            
    item = document.getElementsByClassName("comprar__bloque");
    boton_contenedor.removeChild(item[0]);

    ajustarCantidad();
}