let audio = new Audio();
let isPlaying = false;

export function initPlayer() {
  const playBtn = document.querySelector(".play-btn");
  const titleEl = document.querySelector(".song-info h4");
  const artistEl = document.querySelector(".song-info p");
  const coverEl = document.querySelector(".song-info img");
  const volumeSlider = document.querySelector(".volume input");

  audio.volume = 0.7;

  document.addEventListener("playSong", (e) => {
    const { url, title, artist, cover } = e.detail;
    if (!url) return;

    audio.pause();
    audio.src = url;
    audio.play().catch((err) => console.error("Error reproduciendo:", err));
    isPlaying = true;

    playBtn.textContent = "⏸️";
    titleEl.textContent = title || "Desconocido";
    artistEl.textContent = artist || "—";
    coverEl.src = cover || "https://placehold.co/150x150?text=Sin+Cover";
    coverEl.style.width = "100px";
    coverEl.style.height = "100px";
    coverEl.style.borderRadius = "12px";
    coverEl.style.objectFit = "cover";
  });

  playBtn.addEventListener("click", () => {
    if (!audio.src) return;
    if (isPlaying) {
      audio.pause();
      playBtn.textContent = "▶️";
    } else {
      audio.play().catch((err) => console.error("Error reproduciendo:", err));
      playBtn.textContent = "⏸️";
    }
    isPlaying = !isPlaying;
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.textContent = "▶️";
  });
}
