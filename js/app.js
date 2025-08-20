import { searchTracks, fetchPlaylists } from "./api.js";
import { renderSongs, renderPlaylists } from "./ui.js";
import { initSearch } from "./search.js";
import { initPlayer } from "./player.js";

document.addEventListener("DOMContentLoaded", async () => {
  initSearch();
  initPlayer();

  const defaultSongs = await searchTracks("top hits");
  renderSongs(defaultSongs);

  const playlists = await fetchPlaylists();
  renderPlaylists(playlists);
});
