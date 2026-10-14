const juegosSection = document.querySelector(".juegos");
const errorSpan = document.getElementById("errorSpan");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const apiURL = "https://www.cheapshark.com/api/1.0/deals?title=";

async function getJuegos(titulo) {
  try {
    errorSpan.innerHTML = "";

    const res = await fetch(apiURL + titulo);
    
    const juegos = await res.json();
    return juegos;

  } catch (e) {
    errorSpan.innerHTML = `¡Algo salió mal! Error: ${e.message}`;
  }
}

async function renderJuegos(tituloBuscado = "Batman") {
  const juegos = await getJuegos(tituloBuscado);

  if (!juegos || juegos.length === 0) {
    juegosSection.innerHTML = "<p class='text-center text-dark'>No se encontraron juegos con ese nombre.</p>";
    return;
  }

  let template = "";

  juegos.forEach((juego) => {
    template += `
      <div class="juego">
        <img src="${juego.thumb}" alt="${juego.title}">
        <h3>${juego.title}</h3>
        <p>Precio Oferta: <strong>$${juego.salePrice} USD</strong></p>
        <p>Precio Normal: $${juego.normalPrice} USD</p>
      </div>
    `;
  });
  juegosSection.innerHTML = template;
}

searchBtn.addEventListener("click", () => {
  const textoBuscado = searchInput.value.trim();
  if (textoBuscado !== "") {
    renderJuegos(textoBuscado);
  }
});

renderJuegos("Batman");