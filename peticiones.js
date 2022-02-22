

const cargarTipos = async () => {

    try {

        const url = "http://201.140.116.237/services/tipo.php"
        await axios
            .get(url)
            .then((res) => {
                llenarCombos(res.data);
            })
            .catch((err) => {
                console.log("Surgio un error en la petición")
                return false;
            });

    }
    catch (error) {
        console.log("Surgio un Error");
        return false;
    }

    return true;
}

function llenarCombos(data) {

    for (let item of data) {

        document.getElementById("tipo").innerHTML += `<option value="${item.tipo}">${item.descripcion}</option>`



    }

}

const cargarTablaVentas = async () => {

    const urlVentas = "http://201.140.116.237/services/ventas.php";

    try {
        await axios
            .get(urlVentas)
            .then((res) => {
                dibujarTabla(res.data);
            })
            .catch((err) => {
                console.log("Error en petición");
                return false;
            })
    } catch (err) {
        console.log("Error");
        return false;
    }
    return true;
}

function dibujarTabla(data) {

    //Limpiar Tabla
    document.getElementById("ventas").innerHTML = ``;

    //Sacar el tipo de combox
    let tipo = document.getElementById("tipo").value;


    for (let item of data) {

        if (item.tipo == tipo) {
            document.getElementById("ventas").innerHTML += `
        
        <tr>
        <td>${item.folio}</td>
        <td>${item.tipo}</td>
        <td>${item.precio}</td>
        <td>${item.descuento}</td>
        <td>${item.total}</td>
        <td>${item.fechapago}</td>
        <td>${item.giro}</td>
         </tr>
        
        `
        }


    }

}

const inicia = async () => {

    if (await cargarTipos() == true) {
        cargarTablaVentas();
        console.log("Termino con exito");
    }
    else {
        console.log("Error")
    }


}


inicia();

