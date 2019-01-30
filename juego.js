var canvas = document.getElementById("juego"),
    ctx = canvas.getContext("2d"),
    fondo, imgNave, imgDisparo, imgNaveE, intervalo, iniciar = false,
    teclado=[], enemigos=[],
    disparosNave=[], disparosEnemigos=[],
    nave={x:880, y:465, ancho:30, alto:30, cont:0},
    texto={cont:-1, titulo:"", subtitulo:""},
    juego={estado:"iniciando"}, puntos={cont:0},
    anchoCanvas =canvas.width = 940, altoCanvas =canvas.height = 500;

function cargarBase() {
    fondo = new Image(); fondo.src = "space.jpg";
    imgNave = new Image(); imgNave.src = "nave.png";
    imgNaveE = new Image(); imgNaveE.src = "naveEnemiga.png";
    imgDisparo = new Image(); imgDisparo.src = "mine.png";
    var btnSave = document.getElementById("btnSave");
    btnSave.disabled=true;
}

// Background
function DF() { 
    ctx.drawImage(fondo, 0, 0);
}

// Ship
function DN() {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.drawImage(imgNave, nave.x, nave.y, nave.ancho, nave.alto);
    ctx.restore();
} function DDN() {
    ctx.save();
    ctx.fillStyle = "white";
    for (var i in disparosNave) {
        var d = disparosNave[i];
        ctx.fillRect(d.x, d.y, d.ancho, d.alto);
    }
    ctx.restore();
} function MN() {
    if (teclado[37]) {nave.x -= 10;if (nave.x < -30) nave.x = canvas.width}
    if (teclado[39]) {nave.x += 10;if(nave.x > canvas.width) nave.x = -30}
    if (teclado[32]) {
        if (!teclado.fuego) {
            fuego();
            teclado.fuego = true;
        }
    } else teclado.fuego = false;
} function MDN() {
    for (var i in disparosNave) {
        var d = disparosNave[i];
        d.y -= 10;
    }
    disparosNave = disparosNave.filter(function(d){
        return d.y > -25;
    });
}

// Ships Enemies
function DNE() {
    ctx.save();
    for (var i in enemigos) {
        var e = enemigos[i];
        if (e.estado == "vivo") ctx.fillStyle = "red";
        if (e.estado == "muerto") ctx.fillStyle = "black";
        ctx.drawImage(imgNaveE, e.x, e.y, e.ancho, e.alto);
    }
    ctx.restore();
    if (juego.estado == "iniciando") {
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 2; j++) {
                enemigos.push({x:10+(i*35), y:10+(j*35), ancho:30, alto:30, cont:0, estado:"vivo"});
            }
        } juego.estado = "jugando";
    }
} function DDE() {
    ctx.save();
    ctx.fillStyle = "yellow";
    for (var i in disparosEnemigos) {
        var d = disparosEnemigos[i];
        ctx.drawImage(imgDisparo, d.x , d.y, d.ancho, d.alto);
    }
    ctx.restore();
} function MNE() {
    function agregrarD() {return {x:e.x, y:e.y, ancho:15, alto:15, cont:0};}
    for (var i in enemigos) {
        var e = enemigos[i];
        if (!e) continue;
        if (e && e.estado == "vivo") {
            e.cont++;
            e.x += Math.sin(e.cont * Math.PI / 105)*6;
            if (azar(0, enemigos.length * 5) == 5) {
                disparosEnemigos.push(agregrarD(e));
            }
        }
        if (e && e.estado == "hit") {
            e.cont++;
            if (e.cont >= 1) {e.estado = "muerto";e.cont=0;}
        }
    }
    enemigos = enemigos.filter(function(e){
        if (e && e.estado != "muerto") return true; return false;
    });    
} function MDE() {
    for (var i in disparosEnemigos) {
        var d = disparosEnemigos[i];
        d.y += 10;
    }
    disparosEnemigos = disparosEnemigos.filter(function(d){
        return d.y < canvas.height;
    });
}

// Others function
function Fpuntos(point) {
    document.getElementById("puntoss").value = point;
    var score = document.getElementById("puntos"); 
    score.innerText = point;
}
function checkC() {
    for (var i in disparosNave) {
        var d = disparosNave[i];
        for (var j in enemigos) {
            var e = enemigos[j];
            if (hit(d, e)) {
                e.estado = "hit";e.cont=0; var point = ++puntos.cont;
                Fpuntos(point);
            }
        }
    }
    for (var i in disparosEnemigos) {
        var d = disparosEnemigos[i];
        if (hit(d, nave)) {
            nave.estado = "hit";
            var point = puntos.cont--;
            Fpuntos(point);
        }
    }
}
function hit(d, n) {
    var hit = false;
    if (n.x <= d.x && n.x + n.ancho >= d.x + d.ancho) {
        if (n.y <= d.y && n.y + n.alto >= d.y + d.alto) {
            hit = true;
        }
    }
    if (d.x <= n.x && d.x + d.ancho >= n.x + n.ancho) {
        if (d.y <= n.y && d.y + d.alto >= n.y + n.alto) {
            hit = true;
        }
    }
    return hit;
}
function EJ() {
    if (teclado[80]) {
        var btn = document.getElementById("btnPause");
        if (iniciar) {
            document.body.style.animation = "300s linear infinite moverSpace"
            btn.innerText = "Reanudar";
            window.clearInterval(intervalo);
            iniciar = false;
        }
    }
    if (juego.estado == "jugando" && enemigos.length == 0) {
        juego.estado = "terminado";
        texto.titulo = "Tu puntuación es: "+puntos.cont;
        texto.subtitulo = "Tecla 'R' para reiniciar y tener un mejor desempeño. ";
        texto.cont = 0;
    }
    if (texto.cont >= 0) {
        texto.cont++;
    }
    if (juego.estado == "terminado" && teclado[82]) {
        juego.estado = "iniciando";
        puntos.cont = 0;
        var point = puntos.cont = 0;
        Fpuntos(point);
        texto.cont=-1;
    }
}
function azar(top, bot) {var pos = top - bot, a = Math.random()*pos, a = Math.floor(a);return parseInt(bot)+a}
function fuego() {
    disparosNave.push({x:nave.x, y:nave.y, ancho:7, alto:7});
}
function eventos() {
    evento(document, "keydown", function(e){
        teclado[e.keyCode] = true;
    });
    evento(document, "keyup", function(e){
        teclado[e.keyCode] = false;
    });
    function evento(doc, ev, fun) {
        doc.addEventListener(ev, fun, true);
    }
} function DT() {
    if (texto.cont == -1) return;
    var alfa = texto.cont / 50.0;
    if (alfa > 1) {
        for (var e in enemigos) {
            delete enemigos[e];
        }
    }
    ctx.save();
    ctx.globalAlpha = alfa;
    if (juego.estado == "terminado") {
        ctx.fillStyle = "white";
        ctx.font = "Bold 40pt Arial";
        ctx.fillText(texto.titulo, 100, 100);
        ctx.font = "14pt Arial";
        ctx.fillText(texto.subtitulo, 200, 200);
    }
    ctx.restore();
}

function frameLoop() {
    // Background+
    DF();
    // Status Game
    EJ();
    // Ship
    DN(); DDN(); MN(); MDN();
    // Ships Enemies
    DNE(); DDE(); MNE(); MDE();
    // Check Contact
    checkC();
    // Text
    DT();
}

window.addEventListener("load", init);
function init() {
    eventos();
    cargarBase();
}

document.getElementById("btnPause").addEventListener("click", function(){
    if (iniciar) {
        var btnSave = document.getElementById("btnSave");
        btnSave.disabled=false;
        window.clearInterval(intervalo);
        document.body.style.animation = "300s linear infinite moverSpace";
        this.innerText = "Reanudar";
        this.blur();
        this.style.background = "#2c244d";
        this.style.color = "#fff";
        iniciar = false;
    } else {
        var btnSave = document.getElementById("btnSave");
        btnSave.disabled=false;
        intervalo = window.setInterval(frameLoop, 1000/55);
        document.body.style.animation = "5s linear infinite moverSpace";
        this.innerText = "Pausar (P)";
        this.blur();
        this.style.background = "#D2D2D2";
        this.style.color = "#000";
        iniciar = true;
    }
});