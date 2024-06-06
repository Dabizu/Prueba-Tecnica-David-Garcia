const app = Vue.createApp({
    data() {
        return {
            nombre:"",
            monto: 0,
            apuestan: 0,
            resultador: 0,
            numero:0
        }
    },
    methods: {
        numeroAleatorio() {
            fetch('https://localhost:7168/numeroAleatorio', {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data[0])
                    //numero
                    document.getElementById("numero").innerText = data[0]
                    //par o impar
                    if ((data[0] % 2) == 0) {
                        document.getElementById("parImpar").innerText = "par";
                    } else {
                        document.getElementById("parImpar").innerText = "impar";
                    }
                    //color rojo o negro
                    if (data[1] === "rojo") {
                        document.getElementById("colores").style.backgroundColor = "red";
                    }
                    if (data[1] === "negro") {
                        document.getElementById("colores").style.backgroundColor = "black";
                    }
                    //apartado de realizacion de apuestas

                    //apuestas denumero
                    this.apuestaNumero(data[0])
                    //apuesta par e impar
                    this.apuestaParImpar()
                    //apuesta color
                    this.apuestaColor(data[1])

                });
        },
        apuestaNumero(data) {
            if (parseInt(document.getElementById("numeroApuesta").innerText) === data && data === document.getElementById("colorApostar").innerText) {
                document.getElementById("numeroResultado").innerText = "gano saco el triple";
                //var montoSumar = document.getElementById("apuesta").innerText;
                //var montoApostadoMitad = parseInt(montoSumar) + parseInt(montoSumar) + parseInt(montoSumar);
                //var monto = document.getElementById("monto").value;
                //var resultado = montoApostadoMitad + parseInt(monto);
                //document.getElementById("monto").innerText = resultado;
                this.monto=this.monto+this.apuestan+this.apuestan+this.apuestan
            } else {
                document.getElementById("numeroResultado").innerText = "no gano intentelo de nuevo";
            }
        },
        apuestaParImpar() {
            if (document.getElementById("parImpar").innerText === document.getElementById("parImparApuesta").innerText) {
                document.getElementById("parImparResultado").innerText = "saco el " + document.getElementById("parImparApuesta").innerText + " apostado";
                //var montoSumar = document.getElementById("apuesta").innerText;
                //var montoApostadoMitad = parseInt(montoSumar) + parseInt(montoSumar);
                this.monto=this.monto+this.apuestan;
            } else {
                document.getElementById("parImparResultado").innerText = "no gano intetelo d enuevo";
            }
        },
        apuestaColor(data) {
            if (data === document.getElementById("colorApostar").innerText) {
                document.getElementById("coloresResultado").innerText = "ganaste sacaste el color apostado";
                //mitad del monto apostado
                //var montoSumar = document.getElementById("apuesta").innerText;
                //var montoApostadoMitad = parseInt(montoSumar) / 2;
                //var num = parseInt(montoSumar) + montoApostadoMitad;
                this.resultador = this.apuestan/2;
                this.monto=this.monto+this.resultador;
                console.log("monto a ganar color: "+this.monto)

        
            } else {
                document.getElementById("coloresResultado").innerText = "no gano intentelo de nuevo";
            }
        
        },

        guardar() {
            var nombre = document.getElementById("nombre").value;
            var montoModificado = document.getElementById("monto").value;
            var formData = new FormData();
            //formData.append('id', 0);
            formData.append('nombre', nombre);
            formData.append('dinero', parseInt(montoModificado));
            fetch('https://localhost:7168/modificacion', {
                method: "PUT",
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data == true) {
                        alert("se guardado la partida")
                        /*
                        desaparecerbuscarAgregar()
                        aparecerRuleta()
                        document.getElementById("nombre").value=nombre;
                        document.getElementById("monto").value=montonuevo;*/
                    } else {
                        alert("hubo un problema al guardar");
                    }
                });
        },
        buscarSaldo() {
            var nombre = document.getElementById("nombreBuscar").value;
            fetch('https://localhost:7168/buscaMonto?nombre=' + nombre, {
                method: "POST"
            })
                .then(response => response.status != 204 ? response.json() : false)
                .then(data => {
                    console.log(data)
                    if (data != false) {
                        console.log(data.nombre)
                        desaparecerbuscarAgregar()
                        aparecerRuleta()
                        //document.getElementById("nombre").value = data.nombre;
                        //document.getElementById("monto").value = data.dinero;
                        this.nombre=data.nombre;
                        this.monto=data.dinero
                    } else {
                        var nombreBuscar = document.getElementById("nombreBuscar").value;
                        document.getElementById("buscarAgregar").innerHTML = "";
                        var plantilla = '<br><br>' +
                            '<h3 style="color: aliceblue;">no se encuentra en la lista de usuario Registrate </h3>' +
                            '<div class="input-group input-group-sm mb-3">' +
                            '<span class="input-group-text" id="inputGroup-sizing-sm">Nombre</span>' +
                            '<input type="text" id="nombreBuscar" class="form-control" aria-label="Sizing example input"aria-describedby="inputGroup-sizing-sm" readonly>' +
                            '</div>' +
                            '<div class="input-group input-group-sm mb-3">' +
                            '<span class="input-group-text" id="inputGroup-sizing-sm">Monto nuevo</span>' +
                            '<input type="text" id="montonuevo" class="form-control" aria-label="Sizing example input"aria-describedby="inputGroup-sizing-sm">' +
                            '</div>' +
                            '<button type="button" class="btn btn-primary" onclick="registrarUsuario()">registrar usuario</button>';
                        document.getElementById("buscarAgregar").innerHTML = plantilla;
                        document.getElementById("nombreBuscar").value = nombreBuscar;
                    }
                });
        },
        dameNumero(numero2) {
            //document.getElementById("numeroApuesta").innerText = numero;
            this.numero=numero2
            console.log(this.numero)
        },
        apuesta(cantidad) {
            //document.getElementById("apuesta").innerText = cantidad;
            this.apuestan=cantidad;
        }
        /*,
        apuestaColor(data) {
            if (data === document.getElementById("colorApostar").innerText) {
                document.getElementById("coloresResultado").innerText = "ganaste sacaste el color apostado";
                //mitad del monto apostado
                var montoSumar = document.getElementById("apuesta").innerText;
                var montoApostadoMitad = parseInt(montoSumar) / 2;
                var num = parseInt(montoSumar) + montoApostadoMitad;
        
            } else {
                document.getElementById("coloresResultado").innerText = "no gano intentelo de nuevo";
            }
        
        }*/
    }
});
app.mount('#app');

//console.log("hola");
var play = document.getElementById("play");

function aparecerPlay() {
    play.style.display = "block";
}

function desaparecerPlay() {
    play.style.display = "none";
}

function animacionActivar() {
    play.style.cssText = "animation: animarPlay 2s"
    setTimeout(() => {
        play.style.cssText = "";
        desaparecerPlay()
        aparecerbuscarAgregar()
    }, 2000);
}
var ruleta = document.getElementById("ruleta");

function aparecerRuleta() {
    ruleta.style.display = "block";
}

function desaparecerRuleta() {
    ruleta.style.display = "none";
}
desaparecerRuleta()
/*
function apuesta(cantidad) {
    document.getElementById("apuesta").innerText = cantidad;

}*/
/*
function dameNumero(numero) {
    document.getElementById("numeroApuesta").innerText = numero;
}*/

function dameParImparApuesta(parImpar) {
    document.getElementById("parImparApuesta").innerText = parImpar
}

function dameColorApostar(color) {
    document.getElementById("colorApostar").innerText = color;
}

var buscarAgregar = document.getElementById("buscarAgregar");

function aparecerbuscarAgregar() {
    buscarAgregar.style.display = "block";
}

function desaparecerbuscarAgregar() {
    buscarAgregar.style.display = "none";
}
desaparecerbuscarAgregar()


function numeroAleatorio() {
    fetch('https://localhost:7168/numeroAleatorio', {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            //numero
            document.getElementById("numero").innerText = data[0]
            //par o impar
            if ((data[0] % 2) == 0) {
                document.getElementById("parImpar").innerText = "par";
            } else {
                document.getElementById("parImpar").innerText = "impar";
            }
            //color rojo o negro
            if (data[1] === "rojo") {
                document.getElementById("colores").style.backgroundColor = "red";
            }
            if (data[1] === "negro") {
                document.getElementById("colores").style.backgroundColor = "black";
            }
            //apartado de realizacion de apuestas

            //apuestas denumero
            apuestaNumero(data[0])
            //apuesta par e impar
            apuestaParImpar()
            //apuesta color
            apuestaColor(data[1])

        });
}
numeroAleatorio()
/*
function apuestaNumero(data) {
    if (parseInt(document.getElementById("numeroApuesta").innerText) === data && data === document.getElementById("colorApostar").innerText) {
        document.getElementById("numeroResultado").innerText = "gano saco el triple";
        var montoSumar = document.getElementById("apuesta").innerText;
        var montoApostadoMitad = parseInt(montoSumar) + parseInt(montoSumar) + parseInt(montoSumar);
        var monto = document.getElementById("monto").value;
        var resultado = montoApostadoMitad + parseInt(monto);
        document.getElementById("monto").innerText = resultado;
    } else {
        document.getElementById("numeroResultado").innerText = "no gano intentelo de nuevo";
    }
}
function apuestaParImpar() {
    if (document.getElementById("parImpar").innerText === document.getElementById("parImparApuesta").innerText) {
        document.getElementById("parImparResultado").innerText = "saco el " + document.getElementById("parImparApuesta").innerText + " apostado";
        var montoSumar = document.getElementById("apuesta").innerText;
        var montoApostadoMitad = parseInt(montoSumar) + parseInt(montoSumar);
    } else {
        document.getElementById("parImparResultado").innerText = "no gano intetelo d enuevo";
    }
}
function apuestaColor(data) {
    if (data === document.getElementById("colorApostar").innerText) {
        document.getElementById("coloresResultado").innerText = "ganaste sacaste el color apostado";
        //mitad del monto apostado
        var montoSumar = document.getElementById("apuesta").innerText;
        var montoApostadoMitad = parseInt(montoSumar) / 2;
        var num = parseInt(montoSumar) + montoApostadoMitad;
        console.log("monto a ganar color: "+num)

    } else {
        document.getElementById("coloresResultado").innerText = "no gano intentelo de nuevo";
    }

}*/

function buscarSaldo() {
    var nombre = document.getElementById("nombreBuscar").value;
    fetch('https://localhost:7168/buscaMonto?nombre=' + nombre, {
        method: "POST"
    })
        .then(response => response.status != 204 ? response.json() : false)
        .then(data => {
            console.log(data)
            if (data != false) {
                console.log(data.nombre)
                desaparecerbuscarAgregar()
                aparecerRuleta()
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("monto").value = data.dinero;
            } else {
                var nombreBuscar = document.getElementById("nombreBuscar").value;
                document.getElementById("buscarAgregar").innerHTML = "";
                var plantilla = '<br><br>' +
                    '<h3 style="color: aliceblue;">no se encuentra en la lista de usuario Registrate </h3>' +
                    '<div class="input-group input-group-sm mb-3">' +
                    '<span class="input-group-text" id="inputGroup-sizing-sm">Nombre</span>' +
                    '<input type="text" id="nombreBuscar" class="form-control" aria-label="Sizing example input"aria-describedby="inputGroup-sizing-sm" readonly>' +
                    '</div>' +
                    '<div class="input-group input-group-sm mb-3">' +
                    '<span class="input-group-text" id="inputGroup-sizing-sm">Monto nuevo</span>' +
                    '<input type="text" id="montonuevo" class="form-control" aria-label="Sizing example input"aria-describedby="inputGroup-sizing-sm">' +
                    '</div>' +
                    '<button type="button" class="btn btn-primary" onclick="registrarUsuario()">registrar usuario</button>';
                document.getElementById("buscarAgregar").innerHTML = plantilla;
                document.getElementById("nombreBuscar").value = nombreBuscar;
            }
        });
}
/*
function guardar() {
    var nombre = document.getElementById("nombre").value;
    var montoModificado = document.getElementById("monto").value;
    var formData = new FormData();
    //formData.append('id', 0);
    formData.append('nombre', nombre);
    formData.append('dinero', parseInt(montoModificado));
    fetch('https://localhost:7168/modificacion', {
        method: "PUT",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data == true) {
                alert("se guardado la partida")
            } else {
                alert("hubo un problema al guardar");
            }
        });
}*/

function registrarUsuario() {
    var nombre = document.getElementById("nombreBuscar").value;
    var montonuevo = document.getElementById("montonuevo").value;
    //var datos={id: 0, nombre: nombre, dinero: montonuevo}
    //var nuevojson=JSON.stringify();
    var formData = new FormData();
    formData.append('id', 0);
    formData.append('nombre', nombre);
    formData.append('dinero', parseInt(montonuevo));

    fetch('https://localhost:7168/registrar', {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data == true) {
                alert("se a registrado un usuario")
                desaparecerbuscarAgregar()
                aparecerRuleta()
                document.getElementById("nombre").value = nombre;
                document.getElementById("monto").value = montonuevo;
            } else {
                alert("hubo un problema al registrar");
            }
        });
}

function jugada() {

}