document.addEventListener("DOMContentLoaded", async function () {
  try {
    const defaulUrl = "https://rickandmortyapi.com/api";
    let minPage = 1;
    let maxPage = 42;
    let currentPage = minPage;
    const prevBtn = document.querySelector("#PrevBtn");
    const nextBtn = document.querySelector("#NextBtn");
    const Page = document.querySelector("#showPage");
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
      const modalContainer = document.querySelector(".modal_container");
      const episode = await fetch(data.episode[0]).then((response) =>
        response.json()
      );
      // Si el modal ya existe, actualiza su contenido
      if (modalContainer) {
        const modalImage = modalContainer.querySelector(
          ".modal_image_container img"
        );
        const modalInfo = modalContainer.querySelector(".modal_info_container");

        modalImage.src = data.image;
        modalImage.alt = data.name;

        modalInfo.innerHTML = `
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
    `;

        modalContainer.classList.remove("close"); // Asegúrate de que el modal esté abierto
      } else {
        // Si el modal no existe, se créa y agrega el contenido
        const newModalContainer = document.createElement("div");
        newModalContainer.className = "modal_container";

        newModalContainer.innerHTML = `
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

        root.appendChild(newModalContainer);

        const closeButton = newModalContainer.querySelector("#close_button");
        closeButton.addEventListener("click", () => {
          newModalContainer.classList.add("close");
          const overlay = document.querySelector(".overlay");
          overlay.remove();
        });

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
          newModalContainer.classList.add("close");
          overlay.remove();
        });
      }
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

    nextBtn.addEventListener("click", function () {
      if (currentPage < maxPage) {
        currentPage++;
        getData({ currentPage });
      }
    });

    prevBtn.addEventListener("click", function () {
      if (currentPage > minPage) {
        currentPage--;
        getData({ currentPage });
      }
    });
  } catch (error) {
    console.error(error);
  }
});
