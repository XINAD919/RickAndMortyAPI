document.addEventListener("DOMContentLoaded", async function () {
  try {
    const defaulUrl = "https://rickandmortyapi.com/api";
    let minPage = 1;
    let maxPage = 42;
    let currentPage = minPage;
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");
    const Page = document.querySelector("#showPage");
    Page.textContent = `${currentPage}`;
    const root = document.querySelector("#cards_container");
    root.innerHTML = "";

    const removeModal = () => {
      const modal = document.querySelector(".modal_container");
      if (modal) {
        modal.remove();
      }
    };

    const showModal = async (id) => {
      const response = await fetch(defaulUrl + `/character/${id}`);
      const data = await response.json();
      const episode = await fetch(data.episode[0]).then((response) =>
        response.json()
      );

      const modalContainer = document.createElement("div");
      modalContainer.className = "modal_container";

      modalContainer.innerHTML = `
      <div id="close_button">
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="modal_image_container">
        <img src="${data.image}" alt="${data.name} image" />
      </div>
      <div class="modal_info_container">
        <h2>${data.name}</h2>
        <span>Gender: <span>${data.gender}</span></span>
        <span>Species: <span>${data.species}</span></span>
        <span class="status">
          Status: <span class="status_icon_${data.status}"></span>
          <span>${data.status}</span>
        </span>
        <span>Origin: <span>${data.origin.name}</span></span>
        <span>Last known location: <span>${data.location.name}</span></span>
        <span>Num episodes in which appears: <span>${data.episode.length}</span></span>
            <div class="section">
             <span class='text-gray'> First seen in: </span>
             <span> ${episode.name} </span>
           </div>
      </div>
    `;

      root.appendChild(modalContainer);

      const closeButton = modalContainer.querySelector("#close_button");

      // función de cerrar el modal mediante el boton
      closeButton.addEventListener("click", () => {
        modalContainer.classList.add("close");
        const overlay = document.querySelector(".overlay");
        overlay.remove();
      });

      // overlay del modal
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      document.body.appendChild(overlay);

      // al dar click en el overlay se cierra el modal
      overlay.addEventListener("click", () => {
        modalContainer.classList.add("close");
        overlay.remove();
      });
    };

    const getData = async ({ currentPage }) => {
      const response = await fetch(
        defaulUrl + "/character?page=" + currentPage
      );
      const data = await response.json();
      root.innerHTML = "";
      data.results.map(async (c) => {
        const divCharacter = document.createElement("div");
        divCharacter.className = "card";
        const episode = await fetch(c.episode[0]).then((response) =>
          response.json()
        );
        const handleClick = async (id) => {
          removeModal();
          await showModal(id);
        };

        divCharacter.innerHTML += `
         <div class="img_container">
           <img src="${c.image}" alt="${c.name} image" />
         </div>
         <div class="info_container">
           <h2 class='character_name'></h2>
           <div class="section">
             <span class="status_icon_${c.status}"></span>
             <span>
  
             ${c.status} - ${c.species}
             </span>
           </div>
           <div class="section">
             <span  class='text-gray'> Last known location: </span>
             <span> ${c.location.name} </span>
           </div>
           <div class="section">
             <span class='text-gray'> First seen in: </span>
             <span> ${episode.name} </span>
           </div>
         </div>
       `;
        const h2Element = divCharacter.querySelector(".character_name");
        h2Element.textContent = c.name;
        h2Element.addEventListener("click", () => handleClick(c.id));
        root.appendChild(divCharacter);
      });
    };

    await getData({ currentPage });

    // evento para accion next de cambio de pagina
    nextBtn.addEventListener("click", function () {
      if (currentPage < maxPage) {
        currentPage++;
        Page.textContent = `${currentPage}`;
        getData({ currentPage });
      }
    });

    // evento para accion previous de cambio de pagina
    prevBtn.addEventListener("click", function () {
      if (currentPage > minPage) {
        currentPage--;
        Page.textContent = `${currentPage}`;
        getData({ currentPage });
      }
    });
  } catch (error) {
    console.error(error);
  }
});
