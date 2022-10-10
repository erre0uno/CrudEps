/*
let afiliados=[{
    tipoId:"CEDULA DE CIUDANIA",
    numero:12345,
    paciente:"test test",
    ciudad:"CALI",
    fecha:"calle dos",
    correo:"test@test.com",
    postal:"121212",
    especialidad:"RESPONSABLE DE IVA"},
    ];
saveLocal("Empleadores", afiliados);
*/

var afiliadosDefault = [
    {tipoId: "CEDULA DE CIUDANIA", numero: 1, paciente: "juan test", ciudad:"MEDELLIN", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
    {tipoId: "OTRA", numero: 2, paciente: "pedro test", ciudad:"MEDELLIN", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "REGIMEN ESPECIAL"},
    {tipoId: "CEDULA DE EXTRANJERIA", numero: 3, paciente: "test test", ciudad:"CALI", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
    {tipoId: "OTRA", numero: 4, paciente: "maria test", ciudad:"CALI", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
    {tipoId: "REGISTRO CIVIL", numero: 5, paciente: "mile test", ciudad:"BARRANQUILLA", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "REGIMEN ESPECIAL"},
    {tipoId: "OTRA", numero: 6, paciente: "juancho test", ciudad:"CALI", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
    {tipoId: "CEDULA DE EXTRANJERIA", numero: 7, paciente: "test test", ciudad:"BOGOTA", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "REGIMEN ESPECIAL"},
    {tipoId: "REGISTRO CIVIL", numero: 8, paciente: "estiven test", ciudad:"BOGOTA", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
    {tipoId: "OTRA", numero: 9, paciente: "mauricio test", ciudad:"BOGOTA", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "REGIMEN ESPECIAL"},
    {tipoId: "CEDULA DE CIUDANIA", numero: 10, paciente: "paula test", ciudad:"BARRANQUILLA", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
    {tipoId: "REGISTRO CIVIL", numero: 11, paciente: "diana test", ciudad:"CALI", fecha: "avenida", correo:"test@test.com", postal:"998877", especialidad: "RESPONSABLE DE IVA"},
];
saveLocal("Empleadores", afiliadosDefault);


var especialidad = [
    { id: 1, nombre: "RESPONSABLE DE IVA"},
    { id: 2, nombre: "PERSONA NATURAL RESPONSABLE DE IVA"},
    { id: 3, nombre: "REGIMEN ESPECIAL"},
    { id: 4, nombre: "PERSONA NATURAL NO RESPONSABLE DE IVA"},
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

let ciudades = [
    { id: 1, nombre: "CALI"},
    { id: 2, nombre: "BOGOTA"},
    { id: 3, nombre: "MEDELLIN"},
    { id: 4, nombre: "BARRANQUILLA"},
];
saveLocal("Ciudades", ciudades);


/* ################################################ * */
//  FUNCIONES DE CRUD
/* ################################################ * */

/*
paciente x ciudad
fecha x direccion

SELECT especialidad x regimen

ADD select ciudad
*/

//Create
function crearAfiliado() {
    
    let tipoId = document.getElementById('tipoId');
    tipoId = tipoId.options[tipoId.value - 1].text;
    
    let numero = parseInt(document.getElementById('numero').value);
    let paciente = document.getElementById('paciente').value;
    let ciudad = document.getElementById('ciudad');
    ciudad = ciudad.options[ciudad.value - 1].text;
    let fecha = document.getElementById('fecha').value;
    let correo = document.getElementById('correo').value;
    let postal = document.getElementById('postal').value;
    let especialidad = document.getElementById('especialidad');
    especialidad = especialidad.options[especialidad.value - 1].text;
    let terminos = document.getElementById('terminos').value;


    if (tipoId != "" && numero != "" && paciente != "" && fecha != "" && especialidad != "" && ciudad != "" && correo != "" && postal != "" && terminos === "true" ) {
        let afiliado = { tipoId, numero, paciente,ciudad, fecha,correo,postal,especialidad };

        if (getLocal("Empleadores") === null) {
            let afiliados = [];
            afiliados.push(afiliado);
            saveLocal("Empleadores", afiliados);

        } else {
            let afiliados = getLocal("Empleadores");
            afiliados.push(afiliado);
            saveLocal("Empleadores", afiliados);
        }
        limpiarFormulario()
        swal("Listo!", "Empleador creado con exito!", "success");
        diplayTerminos('false');
        $('#myModal').modal('hide'); // abrir
    }
    else {
        swal("Upps!", "Ingresa todos los campos \ y acepta los terminos !!", "error");
    }
    diplayTerminos('false');
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
    let tipoIdValue = document.getElementById('tipoId').value;
    let numero = parseInt(document.getElementById('numero').value);
    let paciente = document.getElementById('paciente').value;
    let ciudadValue = document.getElementById('ciudad').value;
    let fecha = document.getElementById('fecha').value;
    let correo = document.getElementById('correo').value;
    let postal = document.getElementById('postal').value;
    let especialidadValue = document.getElementById('especialidad').value;

    //search afiliado
    let index = buscarAfiliado(parseInt(id));
    if (index != -1) {

        //get name to option with your index of list tipoI and especialidad in local storage
        tipoIdValue = tipoId[tipoIdValue - 1].nombre;
        ciudadValue = ciudades[ciudadValue - 1].nombre;
        especialidadValue = especialidad[especialidadValue - 1].nombre;

        //set values update with ID
        afiliados[index].tipoId = tipoIdValue;
        afiliados[index].numero = numero;
        afiliados[index].paciente = paciente;
        afiliados[index].ciudad = ciudadValue;
        afiliados[index].fecha = fecha;
        afiliados[index].correo = correo;
        afiliados[index].postal = postal;
        afiliados[index].especialidad = especialidadValue;

        //save json Empleadores update!!
        saveLocal("Empleadores", afiliados);

        setTimeout(limpiarFormulario(),1000);
        listarAfiliados();
        cancelarActualizacion();
        swal("Listo!", "Registro ha sido actualizado !", "success");
        $('#myModal').modal('hide'); // abrir
    }
    else {
        cancelarActualizacion();
        swal("Upps!", "Empleador no encontrado !", "error");
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
    $('#myModal').modal('hide'); // abrir
    limpiarFormulario();
    loadAfiliados();
}

// dado un id busca y muestra sus datos en el formulario
function mostrarAfiliadoId(pid) {
    $('#myModal').modal('show'); // abrir
    let id = parseInt(pid);
    let tipoId = document.getElementById('tipoId');
    let numero = document.getElementById('numero');
    let paciente = document.getElementById('paciente');
    let ciudad = document.getElementById('ciudad');
    let fecha = document.getElementById('fecha');
    let correo = document.getElementById('correo');
    let postal = document.getElementById('postal');
    let especialidad = document.getElementById('especialidad');

    let index = buscarAfiliado(id);
    if (index != -1) {
        afiliados = getLocal("Empleadores");
        tipoId.value = parseInt(buscarTipoId(afiliados[index].tipoId));
        numero.value = afiliados[index].numero;
        paciente.value = afiliados[index].paciente;
        ciudad.value = parseInt(buscarCiudad(afiliados[index].ciudad));
        fecha.value = afiliados[index].fecha;
        correo.value = afiliados[index].correo;
        postal.value = afiliados[index].postal;
        especialidad.value = parseInt(buscarEspecialidad(afiliados[index].especialidad));
    }
    else {
        limpiarFormulario();
        swal("Upps!", "Empleador no encontrado !", "error");
    }
}

//Funciones aux obtener el value de los select correspondientes
function buscarTipoId(nombre) {
    tipos = getLocal("TipoId");
    index = tipos.findIndex(obj => obj.nombre == nombre);
    return index + 1;
}
//Funciones aux obtener el value de los select correspondientes
function buscarCiudad(nombre) {
    tipos = getLocal("Ciudades");
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
        afiliados = getLocal("Empleadores");
        afiliados.splice(index, 1);
        console.log(afiliados);
        saveLocal("Empleadores", afiliados);
        limpiarFormulario();
        listarAfiliados();
        swal("Listo!", "Empleador id: " + id + " eliminado con exito !", "success");
    }
    else {
        limpiarClientes();
        swal("Upps!", "Empleador no encontrado !", "error");
    }
}

// Print
async function listarAfiliados() {
    let afiliados = getLocal("Empleadores");
    if (afiliados != null) {
        document.getElementById("tbodyAfiliados").innerHTML = " ";

        for (let i = 0; i < afiliados.length; i++) {
            var tipoId = afiliados[i].tipoId;
            var numero = afiliados[i].numero;
            var paciente = afiliados[i].paciente;
            var ciudad = afiliados[i].ciudad;
            var fecha = afiliados[i].fecha;
            var correo = afiliados[i].correo;
            var postal = afiliados[i].postal;
            var especialidad = afiliados[i].especialidad;

            if (numero != undefined) {
                document.getElementById("tbodyAfiliados").innerHTML +=
                    `<tr>
                    <td>${tipoId}</td>
                    <td>${numero}</td>
                    <td>${paciente}</td>
                    <td>${ciudad}</td>
                    <td>${fecha}</td>
                    <td>${correo}</td>
                    <td>${postal}</td>
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
    var afiliados = getLocal("Empleadores");
    index = afiliados.findIndex(obj => obj.numero == pid);
    console.log("empleador encontrado: " + index)
    return index;
}

//clean form afiliado
function limpiarFormulario() {
    let numero = document.getElementById("numero");
    let paciente = document.getElementById("paciente");
    let fecha = document.getElementById("fecha");
    let correo = document.getElementById("correo");
    let postal = document.getElementById("postal");
    numero.value = "";
    paciente.value = "";
    fecha.value="";
    correo.value="";
    postal.value="";
    loadAfiliados();
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

//load options in field select ciudad 
function CargarCiudades() {
    let tipoId = getLocal("Ciudades");
    if (tipoId != null) {

        document.getElementById("ciudad").innerHTML = "";

        for (let i = 0; i < tipoId.length; i++) {
            var id = tipoId[i].id;
            var nombre = tipoId[i].nombre;

            if (id != undefined) {
                document.getElementById("ciudad").innerHTML +=
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
    CargarTipoId();
    CargarCiudades();
    CargarEspecialidad();
    listarAfiliados();
}


//swal("Listo!", "Cliente creado con exito!", "success");
//swal("Upps!", "Cliente creado con exito!", "error");
// "warning", "error", "success" and "info".

