console.log("JS CARGADO OK");

const contenedor = document.getElementById("contenedorNoticias");
const btn = document.getElementById("btnRefrescar");

const API = "https://gnews.io/api/v4/top-headlines?token=551bf90578da390840fee6fd9fe21332&lang=es";

async function cargarNoticias() {
    contenedor.innerHTML = "<p>Cargando noticias...</p>";

    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("Error con la API");
        }

        const datos = await res.json();

        if (!datos.articles || datos.articles.length === 0) {
            contenedor.innerHTML = "<p>No hay noticias disponibles</p>";
            return;
        }

        mostrarNoticias(datos.articles);

    } catch (error) {
        contenedor.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function mostrarNoticias(noticias) {
    contenedor.innerHTML = "";

    noticias.forEach(n => {
        const div = document.createElement("div");
        div.className = "noticia";
        div.innerHTML = `
            <h2 onclick="window.open('${n.url}', '_blank')">${n.title}</h2>
            <p>${n.description || "Sin descripción"}</p>
        `;
        contenedor.appendChild(div);
    });
}

btn.addEventListener("click", cargarNoticias);

cargarNoticias();
