/*
var afiliados = [{
    tipoId: "OTRA",
    numero: 1,
    paciente: "test test",
    fecha: "2022-11-09",
    especialidad: "ODONTOLOGIA"
},
];
saveLocal("Afiliados", afiliados);
*/

var afiliadosDefault = [
    {tipoId: "CEDULA DE CIUDANIA", numero: 1, paciente: "juan test", fecha: "2022-10-10T09:38", especialidad: "GINECOLOGIA"},
    {tipoId: "OTRA", numero: 2, paciente: "pedro test", fecha: "2022-10-10T09:38", especialidad: "ODONTOLOGIA"},
    {tipoId: "CEDULA DE EXTRANJERIA", numero: 3, paciente: "test test", fecha: "2022-10-10T09:38", especialidad: "MEDICO GENERAL"},
    {tipoId: "OTRA", numero: 4, paciente: "maria test", fecha: "2022-10-10T09:38", especialidad: "OFTALMOLOGIA"},
    {tipoId: "REGISTRO CIVIL", numero: 5, paciente: "mile test", fecha: "2022-10-10T09:38", especialidad: "ODONTOLOGIA"},
    {tipoId: "OTRA", numero: 6, paciente: "juancho test", fecha: "2022-10-10T09:38", especialidad: "MEDICO GENERAL"},
    {tipoId: "CEDULA DE EXTRANJERIA", numero: 7, paciente: "test test", fecha: "2022-10-10T09:38", especialidad: "ODONTOLOGIA"},
    {tipoId: "REGISTRO CIVIL", numero: 8, paciente: "estiven test", fecha: "2022-10-10T09:38", especialidad: "MEDICO GENERAL"},
    {tipoId: "OTRA", numero: 9, paciente: "mauricio test", fecha: "2022-10-10T09:38", especialidad: "ODONTOLOGIA"},
    {tipoId: "CEDULA DE CIUDANIA", numero: 10, paciente: "paula test", fecha: "2022-10-10T09:38", especialidad: "PEDIATRIA"},
    {tipoId: "REGISTRO CIVIL", numero: 11, paciente: "diana test", fecha: "2022-10-10T09:38", especialidad: "PEDIATRIA"},
];
saveLocal("Afiliados", afiliadosDefault);


var especialidad = [
    { id: 1, nombre: "MEDICO GENERAL" },
    { id: 2, nombre: "OFTALMOLOGIA" },
    { id: 3, nombre: "PEDIATRIA" },
    { id: 4, nombre: "GINECOLOGIA" },
    { id: 5, nombre: "ODONTOLOGIA" },
];
saveLocal("Especialidad", especialidad);

var tipoId = [
    { id: 1, nombre: "CEDULA DE CIUDANIA" },
    { id: 2, nombre: "CEDULA DE EXTRANJERIA" },
    { id: 3, nombre: "TARJETA DE IDENTIDAD" },
    { id: 4, nombre: "REGISTRO CIVIL" },
    { id: 5, nombre: "OTRA" },
];
saveLocal("TipoId", tipoId);

/* ################################################ * */
//  FUNCIONES DE CRUD
/* ################################################ * */


//Create
function crearAfiliado() {
    let tipoId = document.getElementById('tipoId');
    tipoId = tipoId.options[tipoId.value - 1].text;

    let numero = parseInt(document.getElementById('numero').value);
    let paciente = document.getElementById('paciente').value;
    let fecha = document.getElementById('fecha').value;
    let especialidad = document.getElementById('especialidad');
    especialidad = especialidad.options[especialidad.value - 1].text;
    let terminos = document.getElementById('terminos').value;


    if (tipoId != "" && numero != "" && paciente != "" && fecha != "" && especialidad != "" && terminos === "true") {
        let afiliado = { tipoId, numero, paciente, fecha, especialidad };

        if (getLocal("Afiliados") === null) {
            let afiliados = [];
            afiliados.push(afiliado);
            saveLocal("Afiliados", afiliados);

        } else {
            let afiliados = getLocal("Afiliados");
            afiliados.push(afiliado);
            saveLocal("Afiliados", afiliados);

        }
        limpiarFormulario()
        swal("Listo!", "Afiliado creado con exito!", "success");
        diplayTerminos('false')
        $('#myModal').modal('hide'); // abrir

    }
    else {
        swal("Upps!", "Ingresa todos los campos y \n acepta los terminos !!", "error");
    }
    diplayTerminos('false')
    loadAfiliados();

}

// despliega los datos en el form antes de guardar los cambios
function editarAfiliadoById(pid) {
    $('#myModal').modal('show'); // abrir
    mostrarAfiliadoId(pid);
    let bcrear = document.getElementById('crear');
    bcrear.style.display = "none";

    let breset = document.getElementById('reset');
    breset.style.display = "none";

    let bguardar = document.getElementById('guardarCambios');
    bguardar.style.display = "inline-block";

    let bcancelar = document.getElementById('cancelar');
    bcancelar.style.display = "inline-block";

    bguardar.addEventListener("click", function() {
        guardarAfiliadoById(pid);
    });
}

//guarda los datos del afiliado actualizado
function guardarAfiliadoById(pid) {

    let id = parseInt(pid);
    let numero = parseInt(document.getElementById('numero').value);
    let tipoIdValue = document.getElementById('tipoId').value;
    let paciente = document.getElementById('paciente').value;
    let fecha = document.getElementById('fecha').value;
    let especialidadValue = document.getElementById('especialidad').value;

    //search afiliado
    let index = buscarAfiliado(parseInt(id));
    if (index != -1) {

        //get name to option with your index of list tipoI and especialidad in local storage
        tipoIdValue = tipoId[tipoIdValue - 1].nombre;
        especialidadValue = especialidad[especialidadValue - 1].nombre;

        //set values update with ID
        afiliados[index].tipoId = tipoIdValue;
        afiliados[index].numero = numero;
        afiliados[index].paciente = paciente;
        afiliados[index].fecha = fecha;
        afiliados[index].especialidad = especialidadValue;

        //save json Afiliados update!!
        saveLocal("Afiliados", afiliados);

        limpiarFormulario();
        listarAfiliados();
        cancelarActualizacion();
        swal("Listo!", "Registro ha sido actualizado !", "success");
        $('#myModal').modal('hide'); // abrir

    }
    else {
        cancelarActualizacion();
        swal("Upps!", "Cliente no encontrado !", "error");
    }
}

// hide buttons for update
function cancelarActualizacion() {
    let bcrear = document.getElementById('crear');
    bcrear.style.display = "inline-block";

    let breset = document.getElementById('reset');
    breset.style.display = "inline-block";

    let bguardar = document.getElementById('guardarCambios');
    bguardar.style.display = "none";

    let bcancelar = document.getElementById('cancelar');
    bcancelar.style.display = "none";
    limpiarFormulario();
    loadAfiliados();
    $('#myModal').modal('hide'); // abrir
}

// dado un id busca y muestra sus datos en el formulario
function mostrarAfiliadoId(pid) {
    $('#myModal').modal('show'); // abrir
    let id = parseInt(pid);
    let numero = document.getElementById('numero');
    let tipoId = document.getElementById('tipoId');
    let paciente = document.getElementById('paciente');
    let fecha = document.getElementById('fecha');
    let especialidad = document.getElementById('especialidad');

    let index = buscarAfiliado(id);
    if (index != -1) {
        afiliados = getLocal("Afiliados");
        tipoId.value = parseInt(buscarTipoId(afiliados[index].tipoId));
        numero.value = afiliados[index].numero;
        paciente.value = afiliados[index].paciente;
        fecha.value = afiliados[index].fecha;
        especialidad.value = parseInt(buscarEspecialidad(afiliados[index].especialidad));
    }
    else {
        limpiarFormulario();
        swal("Upps!", "Cliente no encontrado !", "error");
    }
}

//Funciones aux obtener el value de los select correspondientes
function buscarTipoId(nombre) {
    tipos = getLocal("TipoId");
    index = tipos.findIndex(obj => obj.nombre == nombre);
    return index + 1;
}
//Funciones aux obtener el value de los select correspondientes
function buscarEspecialidad(nombre) {
    tipos = getLocal("Especialidad");
    index = tipos.findIndex(obj => obj.nombre == nombre);
    return index + 1;
}

//Delete
function eliminarAfiliadoById(pid) {
    // get id to search afiliado
    let id = parseInt(pid);
    //search user by id and return index
    let index = parseInt(buscarAfiliado(id));
    if (index != -1) {
        afiliados = getLocal("Afiliados");
        afiliados.splice(index, 1);
        console.log(afiliados);
        saveLocal("Afiliados", afiliados);
        limpiarFormulario();
        listarAfiliados();
        swal("Listo!", "Afiliado id:" + id + " eliminado con exito !", "success");
    }
    else {
        limpiarClientes();
        swal("Upps!", "Afiliado no encontrado !", "error");
    }
}

// Print
async function listarAfiliados() {
    let afiliados = getLocal("Afiliados");
    if (afiliados != null) {
        document.getElementById("tbodyAfiliados").innerHTML = "";

        for (let i = 0; i < afiliados.length; i++) {
            var tipoId = afiliados[i].tipoId;
            var numero = afiliados[i].numero;
            var paciente = afiliados[i].paciente;
            var fecha = afiliados[i].fecha;
            var especialidad = afiliados[i].especialidad;

            if (numero != undefined) {
                document.getElementById("tbodyAfiliados").innerHTML +=
                    `<tr>
                    <td>${tipoId}</td>
                    <td>${numero}</td>
                    <td>${paciente}</td>
                    <td>${fecha}</td>
                    <td>${especialidad}</td>
                    <td>
                        <div id="botones">
                            <button type="button" class="btn btn-warning" onclick="editarAfiliadoById(${numero})">
                                <i class="fa-regular fa-pen-to-square"></i></button>
                            <button type="button" class="btn btn-info" onclick="mostrarAfiliadoId(${numero})">
                                <i class="fa-solid fa-circle-info"></i></button>
                            <button type="button" class="btn btn-danger" onclick="eliminarAfiliadoById(${numero})">
                                <i class="fa-solid fa-trash-can"></i></button>
                        </div>                   
                    </td>
                </tr>`
            }
        }
    }
}

// search afiliado by id
function buscarAfiliado(pid) {
    var afiliados = getLocal("Afiliados");
    index = afiliados.findIndex(obj => obj.numero == pid);
    console.log("afiliado encontrado: " + index)
    return index;
}

//clean form afiliado
function limpiarFormulario() {
    let numero = document.getElementById("numero");
    let paciente = document.getElementById("paciente");
    numero.value = "";
    paciente.value = "";
    loadAfiliados();
}

// load field date
function loadDate() {
    let date = new Date();
    y = date.getFullYear();
    //Mes
    m = date.getMonth() + 1;
    if (m < 10) { m = "0" + m }
    //Día
    d = date.getDate();
    if (d < 10) { d = "0" + d }
    document.getElementById("fecha").value = y + "-" + m + "-" + d;
}



//load options in field select tipo identificacion
function CargarTipoId() {
    let tipoId = getLocal("TipoId");
    if (tipoId != null) {

        document.getElementById("tipoId").innerHTML = " ";

        for (let i = 0; i < tipoId.length; i++) {
            var id = tipoId[i].id;
            var nombre = tipoId[i].nombre;

            if (id != undefined) {
                document.getElementById("tipoId").innerHTML +=
                    `<option value="${id}">${nombre}</option>`
            }
        }
    }
}

//load options in field select especialidad
function CargarEspecialidad() {
    let especialidad = getLocal("Especialidad");

    if (especialidad != null) {

        document.getElementById("especialidad").innerHTML = " ";

        for (let i = 0; i < especialidad.length; i++) {
            var id = especialidad[i].id;
            var nombre = especialidad[i].nombre;
            if (id != undefined) {
                document.getElementById("especialidad").innerHTML +=
                    `<option value="${id}">${nombre}</option>`
            }
        }
    }
}

function diplayTerminos(p){
    let terminos =document.getElementById("bloqueTerminos");
    if (p==='true'){
        terminos.style.display="inline-block";
    }else{
        terminos.style.display="none";
    }
}  


/* ################################################ * */
// FUNCION AUX INICIALIZA DATOS DEL FORMULARIO
/* ################################################ * */


function loadAfiliados() {
    loadDate();
    CargarTipoId();
    CargarEspecialidad();
    listarAfiliados();
}


//swal("Listo!", "Cliente creado con exito!", "success");
//swal("Upps!", "Cliente creado con exito!", "error");
// "warning", "error", "success" and "info".

