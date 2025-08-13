const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click",()=>{
    container.classList.add("toggle");
});


//Script para Inicio de Sesión 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que se recargue la página

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Datos simulados de administrador
        const users = [
            { email: 'admin@storage.com', password: '123456', role: 'admin'},
            { email: 'usuario@storage.com', password: '654321', role: 'user'}
        ];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (user.role === 'admin') {
                window.location.href = 'Admin.html';
        } else if (user.role === 'user') {
            window.location.href = 'Usuario.html';
        }
    } else {
            alert('Correo o contraseña incorrectos');
        }
    });
});

//Script para menu despegable
function toggleMenu(event) {
    event.preventDefault();
    const menu = event.currentTarget.nextElementSibling;
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';

    // Cierra el menú si se hace clic fuera
    document.addEventListener('click', function closeMenu(e) {
        if (!event.currentTarget.parentElement.contains(e.target)) {
            menu.style.display = 'none';
            document.removeEventListener('click', closeMenu);
        }
    });
}

//Script Corazon
function palpitarCorazon(event) {
    event.preventDefault();

    const container = document.getElementById('heartContainer');
    
    // Crea un nuevo corazón animado
    const heart = document.createElement('div');
    heart.classList.add('corazon-palpitante');
    heart.textContent = '💙';
    
    container.innerHTML = ''; // Borra corazones anteriores
    container.appendChild(heart);

    // Elimina el corazón después de la animación (opcional)
    setTimeout(() => {
        heart.remove();
    }, 800);
}

//Script Contrato
function crearContrato(event) {
  event.preventDefault(); // Evita que el formulario se envíe normalmente

  const nombre = document.getElementById("nombre").value;
  const inicio = document.getElementById("fechaInicio").value;
  const termino = document.getElementById("fechaTermino").value;
  const almacen = document.getElementById("almacen").value;

  if (almacen === "Seleccionar") {
    alert("Por favor selecciona un tipo de almacén.");
    return;
  }

  const contenido = 
`==============================
        CONTRATO DE RENTA
==============================

Nombre del Cliente: ${nombre}

Fecha de Inicio: ${inicio}
Fecha de Término: ${termino}

Espacio Rentado: ${almacen}

Términos:
- El cliente se compromete a utilizar el espacio únicamente para fines lícitos.
- La renta deberá pagarse según los términos acordados con la empresa Self Storage.
- El incumplimiento de estos términos puede resultar en la cancelación del contrato.

Gracias por confiar en Self Storage CDMX.

____________________________________
Firma del cliente (digital o física)`;

  // Crear y descargar el archivo .txt
  const blob = new Blob([contenido], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Contrato_SelfStorage.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Asigna el evento al formulario si aún no lo hiciste en HTML
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#nuevo-contrato form");
  if (form) {
    form.addEventListener("submit", crearContrato);
  }
});


// Script para generar reportes
function generarReporte(tipo) {
  console.log(`Generando reporte: ${tipo}`);
  alert(`📊 Se ha generado el reporte: ${tipo}`);
}

function exportarReporte(formato) {
  console.log(`Exportando en formato: ${formato}`);
  alert(`💾 Reporte exportado como: ${formato.toUpperCase()}`);
}

function generarReportePorFechas() {
  const desde = document.querySelector('input[type="date"]:nth-of-type(1)').value;
  const hasta = document.querySelector('input[type="date"]:nth-of-type(2)').value;

  if (!desde || !hasta) {
    alert("⚠️ Por favor selecciona ambas fechas.");
    return;
  }

  console.log(`Generando reporte desde ${desde} hasta ${hasta}`);
  alert(`📆 Reporte generado del ${desde} al ${hasta}`);
}

//Script cambiar disponibilidad almacenes
function cambiarDisponibilidad(btn, cambio) {
  const productTxt = btn.closest('.product-txt');
  const disponibleSpan = productTxt.querySelector('.disponible');

  // Si ya no existe el span (porque se convirtió en "Sin Disponibilidad"), lo reconstruimos
  if (!disponibleSpan) {
    // Reconstruir el contenido del <p> con span = 0
    const p = productTxt.querySelector('p');
    p.innerHTML = `<b><span class="disponible">0</span> en Disponibilidad</b>`;
  }

  const span = productTxt.querySelector('.disponible');
  let actual = parseInt(span.textContent);
  let nuevo = actual + cambio;

  if (nuevo < 0) nuevo = 0;
  span.textContent = nuevo;

  // Cambiar visualmente a "Sin Disponibilidad" si es 0
  if (nuevo === 0) {
    span.parentElement.innerHTML = `<b>Sin Disponibilidad</b>`;
  }
}