document.addEventListener("DOMContentLoaded", async function () {
  const defaulUrl = "https://rickandmortyapi.com/api";
  const page = 1;
  try {
    const root = document.querySelector("#cards_container");
    root.innerHTML = "";

    const response = await fetch(defaulUrl + "/character?page=" + page);
    const data = await response.json();

    data.results.map((c) => {
      const divCharacter = document.createElement("div");
      divCharacter.className = "card";
      divCharacter.innerHTML += `
        <div class='img_container'>
        <img src="${c.image}" alt="${c.name} image" />
        </div>
        <div class='info_container'>
          <h2>${c.name}</h2>
          <span>
          <span class='status_icon_${c.status}'></span>
          ${c.status} - ${c.species}
          </span>
          <span>
            Last known location: 
            <span>
              ${c.location.name}
            </span>
          </span>
        </div>
      `;
      root.appendChild(divCharacter);
    });
  } catch (error) {
    console.error(error);
  }
});
