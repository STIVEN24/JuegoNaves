<?php
define("host","localhost");
define("user","root");
define("pass","");
define("name","juego_naves");

$mysqli = new mysqli(host, user, pass, name);

$username = $_POST["usuario"] ;
$puntos = $_POST["puntos"];

$sql = "INSERT INTO account(username, points) VALUES('".$username."','".$puntos."');";

$mysqli->query($sql);
?>