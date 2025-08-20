import { searchTracks } from "./api.js";
import { renderSongs } from "./ui.js";

export function initSearch() {
  const input = document.querySelector(".search-bar input");

  async function doSearch() {
    const query = input.value.trim();
    if (!query) return;
    const songs = await searchTracks(query);
    renderSongs(songs);
  }

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") doSearch();
  });
}
