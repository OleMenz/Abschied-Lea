(() => {
  const wall = document.getElementById("cat-wall");
  if (!wall) return;

  // Echte Katzenbilder (Wikimedia Commons) – direkte Datei-Links via Special:FilePath
  // Du kannst jederzeit weitere ergänzen.
  const catUrls = [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cat%20March%202010-1a.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Tabby%20cat%20with%20visible%20nictitating%20membrane.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Savannah%20Cat%20portrait.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kittyply%20edit1.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cat%20poster%201.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Black_cat_%28Felis_catus%29.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Closeup_of_cat.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cat%20%28Felis%20catus%29%20sleeping.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cat%20in%20grass.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/European_shorthair_cat.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Cat_poster_2.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Tabby_cat_portrait.jpg"
  ];

  function shuffledCopy(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Wie viele Kacheln? Grob abhängig von Viewport + etwas Puffer.
  function tileCount() {
    const tile = window.matchMedia("(max-width: 520px)").matches ? 148 : 190;
    const cols = Math.ceil(window.innerWidth / tile);
    const rows = Math.ceil(window.innerHeight / tile);
    return Math.min(120, cols * rows + cols); // Deckel, damit es nicht zu schwer wird
  }

  function buildWall() {
    wall.innerHTML = "";

    const count = tileCount();
    const pool = shuffledCopy(catUrls);

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      const src = pool[i % pool.length];

      img.loading = "lazy";
      img.decoding = "async";
      img.alt = "";
      img.referrerPolicy = "no-referrer"; // reduziert Ärger mit manchen Hosts
      img.src = src;

      wall.appendChild(img);
    }
  }

  // Initial + bei Resize neu aufbauen (debounced)
  let t = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(t);
    t = window.setTimeout(buildWall, 160);
  });

  buildWall();
})();
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  if (!card) return;

  card.style.opacity = "0";
  card.style.transform = "translateY(10px)";

  requestAnimationFrame(() => {
    card.style.transition = "opacity 500ms ease, transform 500ms ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });
});
