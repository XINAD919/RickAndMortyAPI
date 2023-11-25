document.addEventListener("DOMContentLoaded", async function () {
  const defaulUrl = "https://rickandmortyapi.com/api";
  const page = 1;
  try {
    const root = document.querySelector("#cards_container");
    root.innerHTML = "";

    const response = await fetch(defaulUrl + "/character?page=" + page);
    const data = await response.json();

    data.results.map(async (c) => {
      const divCharacter = document.createElement("div");
      divCharacter.className = "card";
      const episode = await fetch(c.episode[0]).then((response) =>
        response.json()
      );
      divCharacter.innerHTML += `
        <div class="img_container">
          <img src="${c.image}" alt="${c.name} image" />
        </div>
        <div class="info_container">
          <h2 class=''>${c.name}</h2>
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
      root.appendChild(divCharacter);
    });
  } catch (error) {
    console.error(error);
  }
});
