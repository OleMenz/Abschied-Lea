(() => {
  const wall = document.getElementById("cat-wall");
  if (!wall) return;

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
