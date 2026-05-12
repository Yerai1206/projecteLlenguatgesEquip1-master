// funciones.js - Tooltip, Banner, Ctrl+C fondo, Modal, Selects encadenados

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       2. TOOLTIP SOBRE LISTAS
       ========================================== */
    var listas = document.querySelectorAll("ul li");
    var tooltip = document.createElement("div");
    tooltip.id = "tooltip-custom";
    tooltip.style.cssText =
        "position:fixed;background:rgba(56,37,22,0.95);color:#ffd59e;" +
        "border:2px solid #966b4b;border-radius:8px;padding:6px 12px;" +
        "font-family:Andy,sans-serif;font-size:13px;pointer-events:none;" +
        "z-index:9999;display:none;max-width:220px;box-shadow:0 2px 8px rgba(0,0,0,0.6);";
    document.body.appendChild(tooltip);

    listas.forEach(function (li) {
        li.addEventListener("mouseenter", function (e) {
            tooltip.textContent = "⚔️ " + li.textContent.trim().substring(0, 60) + (li.textContent.trim().length > 60 ? "…" : "");
            tooltip.style.display = "block";
        });
        li.addEventListener("mousemove", function (e) {
            tooltip.style.left = (e.clientX + 14) + "px";
            tooltip.style.top  = (e.clientY + 14) + "px";
        });
        li.addEventListener("mouseleave", function () {
            tooltip.style.display = "none";
        });
    });


    /* ==========================================
       4. CTRL+C → CAMBIAR FONDO ALEATORIO
       ========================================== */
    var coloresFondo = [
        "#966b4b", "#5a3a21", "#2d4a1e", "#1a2a4a",
        "#4a1a1a", "#2a3a2a", "#6b4a2a", "#3a2a5a"
    ];

    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.key === "c") {
            var actual = document.body.style.backgroundColor;
            var disponibles = coloresFondo.filter(function (c) { return c !== actual; });
            var nuevo = disponibles[Math.floor(Math.random() * disponibles.length)];
            document.body.style.backgroundColor = nuevo;
            document.documentElement.style.backgroundColor = nuevo;
        }
    });


    /* ==========================================
       5. MODAL
       ========================================== */
    var modalTrigger = document.getElementById("btn-abrir-modal");
    var modal        = document.getElementById("modal-objeto");
    var modalCerrar  = document.getElementById("modal-cerrar");
    var modalForm    = document.getElementById("modal-form");

    if (modalTrigger && modal) {
        modalTrigger.addEventListener("click", function () {
            modal.style.display = "flex";
        });
        modalCerrar.addEventListener("click", function () {
            modal.style.display = "none";
        });
        modal.addEventListener("click", function (e) {
            if (e.target === modal) modal.style.display = "none";
        });
        modalForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var nombre = document.getElementById("modal-nombre").value;
            var tipo   = document.getElementById("modal-tipo").value;
            var desc   = document.getElementById("modal-desc").value;
            alert("✅ Objeto añadido:\n\nNombre: " + nombre + "\nTipo: " + tipo + "\nDescripción: " + desc);
            modal.style.display = "none";
            modalForm.reset();
        });
    }


    /* ==========================================
       6. SELECTS ENCADENADOS
       ========================================== */
    var select1 = document.getElementById("select-categoria");
    var select2 = document.getElementById("select-elemento");
    var imgResultado = document.getElementById("select-imagen");
    var textoResultado = document.getElementById("select-texto");

    if (select1 && select2 && imgResultado) {

        // Datos: categoría → elementos → {imagen, texto}
        var datos = {
            "Armas": {
                "Excalibur":    { img: "../img/Excalibur.webp",           texto: "La Excalibur es una espada mágica de Hardmode fabricada con Hallowed Bars." },
                "Varita Mágica":{ img: "../img/Wand_of_Sparking.webp",    texto: "La Varita de Chispas es el arma mágica más básica del juego." },
                "Ojo de Cthulhu":{ img: "../img/The_Eye_of_Cthulhu.webp", texto: "El Ojo de Cthulhu es uno de los primeros jefes invocables de Terraria." }
            },
            "Herramientas": {
                "Pico de Hierro": { img: "../img/Iron_Pickaxe.png",   texto: "El pico de hierro es la segunda herramienta de minería del juego." },
                "Hacha de Hierro":{ img: "../img/Iron_Axe.webp",      texto: "La hacha de hierro permite talar árboles con mayor eficiencia." },
                "Martillo":       { img: "../img/Iron_Hammer.webp",   texto: "El martillo sirve para romper paredes y dar forma a los bloques." }
            },
            "Árboles": {
                "Árbol Normal": { img: "../img/TREE.webp", texto: "Los árboles normales son la principal fuente de madera del juego." },
                "Árbol Jungla": { img: "../img/TREE.webp", texto: "Los árboles de jungla proporcionan madera de jungla de color verde oscuro." }
            }
        };

        // Rellenar select1
        Object.keys(datos).forEach(function (cat) {
            var opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            select1.appendChild(opt);
        });

        function rellenarSelect2(categoria) {
            select2.innerHTML = '<option value="">-- Elige un elemento --</option>';
            imgResultado.src = "";
            imgResultado.style.display = "none";
            if (textoResultado) textoResultado.textContent = "";
            if (!categoria || !datos[categoria]) return;
            Object.keys(datos[categoria]).forEach(function (elem) {
                var opt = document.createElement("option");
                opt.value = elem;
                opt.textContent = elem;
                select2.appendChild(opt);
            });
        }

        select1.addEventListener("change", function () {
            rellenarSelect2(this.value);
        });

        select2.addEventListener("change", function () {
            var cat  = select1.value;
            var elem = this.value;
            if (cat && elem && datos[cat] && datos[cat][elem]) {
                imgResultado.src = datos[cat][elem].img;
                imgResultado.style.display = "block";
                imgResultado.alt = elem;
                if (textoResultado) textoResultado.textContent = datos[cat][elem].texto;
            } else {
                imgResultado.style.display = "none";
                if (textoResultado) textoResultado.textContent = "";
            }
        });
    }

});


    /* ==========================================
       3. BANNER DE IMÁGENES (carrusel)
       ========================================== */
    var slides    = document.querySelectorAll(".banner-slide");
    var btnPrev   = document.getElementById("banner-prev");
    var btnNext   = document.getElementById("banner-next");
    var dotsWrap  = document.getElementById("banner-dots");

    if (slides.length > 0 && btnPrev && btnNext) {
        var actual = 0;

        // Crear dots
        slides.forEach(function (_, i) {
            var dot = document.createElement("span");
            dot.className = "banner-dot" + (i === 0 ? " dot-activo" : "");
            dot.addEventListener("click", function () { irA(i); });
            dotsWrap.appendChild(dot);
        });

        function irA(idx) {
            slides[actual].classList.remove("activo");
            dotsWrap.children[actual].classList.remove("dot-activo");
            actual = (idx + slides.length) % slides.length;
            slides[actual].classList.add("activo");
            dotsWrap.children[actual].classList.add("dot-activo");
        }

        btnPrev.addEventListener("click", function () { irA(actual - 1); });
        btnNext.addEventListener("click", function () { irA(actual + 1); });

        // Auto-avance cada 4 segundos
        setInterval(function () { irA(actual + 1); }, 4000);
    }