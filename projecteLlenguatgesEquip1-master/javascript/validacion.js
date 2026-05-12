document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        let valido = true;
        let mensajes = [];

        const marcarError = (campo, mensaje) => {
            campo.classList.add("error");
            mensajes.push(mensaje);
            valido = false;
        };

        form.querySelectorAll(".error").forEach(c => c.classList.remove("error"));

        const nombre     = document.getElementById("nombres");
        const apellidos  = document.getElementById("apellidos");
        const correo     = document.getElementById("correo");
        const horas      = document.getElementById("horas_juego");
        const fecha      = document.getElementById("fecha_registro");
        const clase      = document.getElementById("clase_favorita");
        const telefono   = document.getElementById("tlf");
        const contrasena = document.getElementById("contrasena");

        if (!nombre.value.match(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,50}$/))
            marcarError(nombre, "El nombre debe tener mínimo 3 letras y solo caracteres válidos.");
        if (!apellidos.value.match(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,50}$/))
            marcarError(apellidos, "Los apellidos deben tener mínimo 3 letras.");
        if (!correo.value.includes("@") || !correo.value.includes("."))
            marcarError(correo, "El correo electrónico no es válido.");
        if (horas.value === "" || horas.value < 0 || horas.value > 9999)
            marcarError(horas, "Las horas deben ser un número entre 0 y 9999.");
        if (!fecha.value)
            marcarError(fecha, "Debes seleccionar una fecha.");
        if (clase.value.trim().length < 3)
            marcarError(clase, "La clase favorita debe tener al menos 3 caracteres.");
        if (!telefono.value.match(/^[\d\s\+\-]{7,15}$/))
            marcarError(telefono, "El teléfono debe tener entre 7 y 15 caracteres válidos.");
        if (contrasena.value.length < 8)
            marcarError(contrasena, "La contraseña debe tener mínimo 8 caracteres.");

        if (!valido) {
            e.preventDefault();
            alert("⚠️ Corrige los siguientes errores:\n\n" + mensajes.join("\n"));
        } else {
            e.preventDefault();
            alert("✅ ¡Datos enviados correctamente! Gracias por unirte a la aventura.");
            form.reset();
        }
    });
});