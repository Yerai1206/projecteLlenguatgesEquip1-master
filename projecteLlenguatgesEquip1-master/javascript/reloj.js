// reloj.js - Muestra fecha y hora en tiempo real en todas las páginas

(function() {
    function iniciarReloj() {
        var reloj = document.createElement("div");
        reloj.id = "reloj";
        reloj.style.cssText = "position:fixed;top:155px;left:50%;transform:translateX(-50%);" +
            "background-color:rgba(56,37,22,0.85);border:2px solid #966b4b;border-radius:20px;" +
            "padding:6px 18px;display:flex;align-items:center;gap:10px;" +
            "font-family:Andy,sans-serif;font-size:15px;color:#ffd59e;" +
            "white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.7);z-index:9999;letter-spacing:0.5px;";

        document.body.appendChild(reloj);

        var diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
        var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                     "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

        function pad(n) { return String(n).padStart(2,"0"); }

        function actualizar() {
            var ahora = new Date();
            var fecha = diasSemana[ahora.getDay()] + ", " +
                        pad(ahora.getDate()) + " de " +
                        meses[ahora.getMonth()] + " de " +
                        ahora.getFullYear();
            var hora = pad(ahora.getHours()) + ":" +
                       pad(ahora.getMinutes()) + ":" +
                       pad(ahora.getSeconds());

            reloj.innerHTML =
                '<span style="color:#ffd59e;">&#128197; ' + fecha + '</span>' +
                '<span style="color:#966b4b;font-size:18px;"> | </span>' +
                '<span style="color:#ffe4b5;font-weight:bold;">&#9200; ' + hora + '</span>';
        }

        actualizar();
        setInterval(actualizar, 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarReloj);
    } else {
        iniciarReloj();
    }
})();