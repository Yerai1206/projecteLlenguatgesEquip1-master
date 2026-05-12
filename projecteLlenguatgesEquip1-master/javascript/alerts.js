// alerts.js - Alerts de bienvenida/aviso según la página actual

(function () {
    var pagina = window.location.pathname.split("/").pop();

    var mensajes = {
        "index.html":        "¡Bienvenido a la wiki de Terraria!",
        "armas.html":        "Demasiados objetos",
        "herramientas.html": "Demasiados objetos",
        "armaduras.html":    "Demasiados objetos",
        "biomas.html":       "Que bonitos paisajes",
        "jefes.html":        "Cuidado con los ojos",
        "minerales.html":    "Como brilla!",
        "npcs.html":         "Socializacion!"
    };

    // Alert de bienvenida al cargar la página
    if (mensajes[pagina]) {
        window.addEventListener("load", function () {
            alert(mensajes[pagina]);
        });
    }
})();