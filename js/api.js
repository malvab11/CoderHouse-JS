const BASE = "https://itunes.apple.com";
const api = (path) => `${BASE}${path}`;

export function formatDuration(sec) {
  const min = Math.floor((sec || 0) / 60);
  const s = (sec || 0) % 60;
  return `${min}:${String(s).padStart(2, "0")}`;
}

function mapTrack(t, i = 0) {
  return {
    number: i + 1,
    id: t.trackId,
    title: t.trackName,
    artist: t.artistName ?? "Desconocido",
    album: t.collectionName ?? "—",
    date: t.releaseDate?.split("T")[0] ?? "N/A",
    duration: Math.floor((t.trackTimeMillis ?? 0) / 1000),
    cover: t.artworkUrl100
      ? t.artworkUrl100.replace("100x100bb", "300x300bb")
      : "https://placehold.co/300x300?text=Sin+Cover",
    preview: t.previewUrl || null,
  };
}

export async function searchTracks(query, limit = 30) {
  try {
    const res = await fetch(
      api(
        `/search?term=${encodeURIComponent(
          query
        )}&entity=musicTrack&limit=${limit}&country=us`
      )
    );
    const data = await res.json();
    return (data?.results ?? []).map((t, i) => mapTrack(t, i));
  } catch (err) {
    console.error("Error buscando tracks:", err);
    return [];
  }
}

export async function fetchSongs(limit = 20) {
  return searchTracks("top hits", limit);
}

export async function fetchPlaylists(limit = 8) {
  return [
    {
      id: 1,
      title: "Pop Hits",
      image: "https://placehold.co/200x200?text=Pop+Hits",
      desc: "Lo mejor del pop 🎤",
    },
    {
      id: 2,
      title: "Chill Vibes",
      image: "https://placehold.co/200x200?text=Chill+Vibes",
      desc: "Relájate y concéntrate 🧘‍♂️",
    },
    {
      id: 3,
      title: "Workout",
      image: "https://placehold.co/200x200?text=Workout",
      desc: "Energía para entrenar 💪",
    },
    {
      id: 4,
      title: "Retro Classics",
      image: "https://placehold.co/200x200?text=Retro+Classics",
      desc: "80s & 90s vibes 🎸",
    },
  ].slice(0, limit);
}
