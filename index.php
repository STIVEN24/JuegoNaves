<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Juego de naves">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="juego.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <title>Juego de naves</title>
    </head>
    <body>
        
        <div class="content-juego">
            <div class="menu" id="menu">
                <p>Puntos: <span id="puntos">0</span></p>
                <div>
                    <button id="btnPause">Click aquí para comenzar</button>
                    <button id="btnVol">Volumen on</button>
                    <button id="btnFullScreen">FullScreen</button>
                </div>
            </div>
            <canvas class="juego" id="juego"></canvas>
        </div>
        <div class="menu-derecha">
            <form method="POST">
                <input type="text" name="usuario" id="usuario">
                <input type="text" name="puntos"  value="0" id="puntoss">
                <button id="btnSave" type="submit">Save</button>
            </form>
            <div class="mostrar" id="mostrar">
                <h2>Top points</h2>
                
            </div>
        </div>
        
        <script src="juego.js"></script>
        <script src="juego-jquery.js"></script>
    </body>
</html>