// botón se llama btnAgregar
//   otro id contadorProductos
//id totalProductos  y id totalNumero
//campo pprducto=  Name
// Campo cantidad = Number
// alertValidacionesTexto
// alertValidaciones
// precioTotal y PrecioNumero
// id tabla = tablaListaCompras

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("precioTotal");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal= document.getElementById("productosTotal");
let precioTotal = document.getElementById("totalPrecio")
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;
let precio = 0;
let cantidad = 0;
let idTimeout;
let datos= []; //new array();
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");





//genera un precio aleatorio
    function getPrecio(){
        return Math.floor(Math.random() *50 *100) / 100;
    }

    //validar nombre con función ternaria
    function validarNombre(){
        return(txtNombre.value.length>=2)?true:false;
    }

    function validarCantidad(){
        if(txtNumber.value.length ==0){
            return false;
        }
        if(isNaN(txtNumber.value)){
            return false;
        }
        if(parseFloat(txtNumber.value)<=0){
            return false;
        }
        return true;
    }

btnAgregar.addEventListener ("click", function(e){
    e.preventDefault();
    clearTimeout(idTimeout);
    alertValidacionesTexto.innerHTML="";
    if ((! validarNombre()) || (! validarCantidad())) {
        let lista ="<ul>"; 
        if(! validarNombre()){
            txtNombre.style.border = "red thin solid";
            lista += "<li> Se debe escribir un nombre válido </li>";
        }//if validad nombre
        if(! validarCantidad()){
            txtNumber.style.border = "red thin solid";
            lista += "<li> Se debe escribir una cantidad válida </li>";
        }//if validad cantidad
        lista += "</ul>";
        
        alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
        alertValidaciones.style.display = "block";
        idTimeout = setTimeout(function(){
            alertValidaciones.styles.display="none";
        }, 5000);
        return false;
    }//if validaciones
    txtNumber.style.border = "";
    txtNombre.style.border = "";
    alertValidaciones.style.display="none";
    contador ++;
    contadorProductos.innerHTML = contador;
    cantidad = parseFloat(txtNumber.value);
    totalEnProductos += cantidad;
    productosTotal.innerHTML = totalEnProductos;
    precio = getPrecio();
    costoTotal += precio *cantidad;
    precioTotal.innerHTML ="$" +costoTotal.toFixed(2);

    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem ("costoTotal",costoTotal);

    let row = `<tr>
    <th> ${contador}</th>
    <td> ${txtNombre.value} </td>
    <td> ${txtNumber.value} </td>
    <td>$ ${precio} </td>
    </tr>`;
    cuerpoTabla[0].insertAdjacentHTML("beforeend", row);

    let elemento = `{
         "id": ${contador},
         "nombre": "${txtNombre.value}",
         "cantidad": ${txtNumber.value},
         "precio":${precio} 
    }`;
    
    datos.push(JSON.parse(elemento));
    //console.log(datos);
    localStorage.setItem("datos", JSON.stringify(datos));

    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
});//click botonAgregar
     
txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});
txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    event.target.value = event.target.value.trim(); //target de donde se originó el evento
});
   
window.addEventListener("load",function(event){
   
    let tmp =localStorage.getItem("contadorProductos");
    if (tmp!=null) {
        contador=parseInt(tmp);
        contadorProductos.innerHTML=contador;
    }//if

 tmp= localStorage.getItem("totalEnProductos");
if (tmp!=null) {
    totalEnProductos=parseInt(tmp);
    productosTotal.innerHTML = totalEnProductos;
}//if


tmp= localStorage.getItem ("costoTotal");
if (tmp!=null) {
    costoTotal=parseFloat(tmp);
    precioTotal.innerHTML ="$" + costoTotal.toFixed(2);
}//if


tmp= localStorage.getItem("datos");
if(tmp !=null){
    datos = JSON.parse(tmp);
    datos.forEach(element =>{
        cuerpoTabla[0].innerHTML += `<tr>
        <th> ${element.id}</th>
        <td> ${element.nombre} </td>
        <td> ${element.cantidad} </td>
        <td>$ ${element.precio} </td>
        </tr>`;
    });
}
});
btnClear.addEventListener("click",function(event){
    contador=0;
    contadorProductos.innerHTML = contador;
    totalEnProductos=0;
    productosTotal.innerHTML=totalEnProductos;
    costoTotal=0;
    precioTotal.innerHTML ="$" +costoTotal.toFixed(2);
    cuerpoTabla[0].innerHTML="";

    localStorage.removeItem("contadorProductos");
    localStorage.removeItem("totalProductos");
    localStorage.removeItem("costoTotal");
    localStorage.removeItem("datos");

    localStorage.clear();

});
