let usuarios= [{
    nombre:"admin",
    password:"admin"},
    ];
saveLocal("Usuarios",usuarios);

function login(){
    let user= document.getElementById("usuario").value;
    let pass= document.getElementById("password").value;

    let buscar= buscarUser(user,pass); 
    if(buscar != -1 && buscar != -2 ){
        swal("Listo!", " Listo vamos allá !!", "success");
        redireccionar();
    }else if(buscar === -1){
        swal("Upps!", "usuario no registrado !!", "error");
    }else if(buscar === -2){
        swal("Upps!", "contraseña no valida !!", "error");       
    }else{
        swal("Upps!", "no se pudo procesar tu solicitud !!", "error");
    }
}


function buscarUser(nombre,pass) {
    let usuarios = getLocal("Usuarios");
    console.log(usuarios);
    let index = usuarios.findIndex(obj => obj.nombre === nombre);
    if(index != -1){
        if(usuarios[index].password === pass){
            return index;
        }else{
            return -2;
        }
    }
    else{
        return -1;
    }
}


function crearUsuario(){
    let nombre = document.getElementById('modalUsuario').value;
    let password = document.getElementById('modalPassword').value;
    if (nombre != "" && password != "" ) {
        let user = { nombre, password};

        if (localStorage.getItem("Usuarios") === null) {
            let usuarios = []
            usuarios.push(user);
            saveLocal("Usuarios",usuarios);
        } else {
            let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
            usuarios.push(user);
            saveLocal("Usuarios",usuarios);
        }
        document.getElementById("formModal").reset();
        swal("Listo!", "Usuario creado con exito!", "success");
        $('#myModal').modal('hide');
    }
    else {
        document.getElementById("formModal").reset();
        swal("Upps!", "Ingresa todos los campos !!", "error");
    }
}

function redireccionar(){
    setTimeout(
        function(){
            window.location.href="main.html"
        }
    ,2000);
}

function loadpage(){
    //let boton = document,getElementById("login");
}