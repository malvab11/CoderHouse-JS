export function renderSongs(songs) {
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = "";

  songs.forEach((song, index) => {
    const minutes = Math.floor(song.duration / 60);
    const seconds = String(song.duration % 60).padStart(2, "0");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="cursor-pointer play-song" 
          data-url="${song.preview || ""}" 
          data-title="${song.title}" 
          data-artist="${song.artist}" 
          data-cover="${song.cover}">
        <div class="flex items-center gap-3">
          <img src="${
            song.cover || "https://placehold.co/150x150?text=No+Cover"
          }" class="rounded w-10 h-10"/>
          <div>
            <div class="font-bold">${song.title}</div>
            <div class="text-sm opacity-50">${song.artist}</div>
          </div>
        </div>
      </td>
      <td>${song.album || "—"}</td>
      <td>${song.date || "—"}</td>
      <td>${minutes}:${seconds}</td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll(".play-song").forEach((el) => {
    el.addEventListener("click", () => {
      const { url, title, artist, cover } = el.dataset;
      if (!url) {
        alert("Esta canción no tiene preview disponible.");
        return;
      }
      const event = new CustomEvent("playSong", {
        detail: { url, title, artist, cover },
      });
      document.dispatchEvent(event);
    });
  });
}

export function renderPlaylists(playlists) {
  const container = document.querySelector(".card-grid");
  container.innerHTML = "";

  playlists.forEach((playlist) => {
    const card = document.createElement("div");
    card.className =
      "card bg-base-200 shadow-xl hover:bg-base-300 cursor-pointer transition";
    card.innerHTML = `
      <figure><img src="${playlist.image}" alt="${playlist.title}" /></figure>
      <div class="card-body">
        <h3 class="card-title">${playlist.title}</h3>
        <p class="text-sm">${playlist.desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}
