

const inputNumero = document.getElementById("input-number");
const btnAgregar = document.getElementById("btn-agregar");
const tablaFrecuencias = document.getElementById("tabla-frecuencias");

let lista = [];

btnAgregar.addEventListener("click", agregar);

inputNumero.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        agregar();
    }
})  




function agregar() {
    const numero = parseInt(inputNumero.value);
    const isExistNum = lista.some(element => element.valor === numero);

    if (inputNumero.value.length === 0 ) {
    } else {
        if (isExistNum) {
            lista = lista.map(element => {
                if (element.valor === numero) {
                    return {
                        valor: element.valor,
                        cantidad: element.cantidad += 1,
                    }
                }
                return element
            })
        } else {
            lista.push({
                valor: numero,
                cantidad: 1
            })
        }

    }
    inputNumero.value = null;
    lista.sort((a, b) => a.valor - b.valor);
    printLista();
    printTablaFrecuencias();

}


function printLista() {

    document.getElementById('elementos').innerHTML = "";

    lista.forEach(element => {

        for (let i = 0; i < element.cantidad ; i++) {
            const td = document.createElement("td");
            td.innerHTML = element.valor;
            document.getElementById('elementos').appendChild(td);
        }

    });

}

function printTablaFrecuencias() {
    let acomulado = 0;
    let nElementos = 0;
    lista.forEach(element => {
        nElementos += element.cantidad;
    })

    tablaFrecuencias.innerHTML = "";
    lista.forEach(element => {
        const fila = document.createElement("tr");
        const celdas = [];

        for (let i = 0; i < 7; i++) {
            celdas.push(document.createElement("td"));
        }
        acomulado += element.cantidad;
        celdas[0].innerHTML = element.valor;
        celdas[1].innerHTML = element.cantidad;
        celdas[2].innerHTML = acomulado;
        celdas[3].innerHTML = parseFloat(element.cantidad / nElementos);
        celdas[4].innerHTML = parseFloat(acomulado / nElementos);
        celdas[5].innerHTML = "%" + (element.cantidad / nElementos) * 100;
        celdas[6].innerHTML = "%" + (acomulado / nElementos) * 100;


        for (let i = 0; i < celdas.length; i++) {
            fila.append(celdas[i]);
        }

        tablaFrecuencias.appendChild(fila);
    });
}