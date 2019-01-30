$(document).ready(function(){
    var score;
    setInterval(function(){
        score = $("#puntos").val();
        // console.log(score);
    },3000/10);

    // salvar puntos
$("form").submit(function(e){
    e.preventDefault();
        var usu = $("#usuario").val();
        var puntos = $("#puntoss").val();

        $.ajax({
            url : "register.php",
            type : "POST",
            data : "usuario="+usu+"&puntos="+puntos,
            success : function(msg) {
                obtenerD();
            }
        });
    });
    function obtenerD() {
        $.ajax({
            url : "mostrar.php",
            method : "POST",
            success : function(data) {
                $("#mostrar").html(data)
            }
        });
    } obtenerD();
    
});