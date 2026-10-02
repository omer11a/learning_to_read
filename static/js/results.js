const fullComparisons = [
  ["p10-r01", "A single, delicate pink flower"],
  ["p10-r02", "Red wine pouring into a glass"],
  ["p10-r03", "A curly-haired woman with a relaxed expression in a bubble bath"],
  ["p10-r04", "A Canon EOS camera on a wooden surface"],
  ["p10-r05", "Two white swans floating on calm water"],
  ["p10-r06", "A close-up portrait of three diverse young women"],
  ["p29-r06", "Two hands clinking green and orange drinks"],
  ["p29-r07", "A black-and-white portrait of a shirtless man with his hands on his cheeks"],
  ["p28-r01", "A dirt road marked with the word ‘START’"],
  ["p28-r02", "Three women surrounded by rows of rubber duckies"],
  ["p28-r03", "A woman in a striped dress sitting on a concrete ledge"],
  ["p28-r04", "A vibrant geothermal pool"],
  ["p28-r05", "The word ‘SALE’ spelled in white tiles"],
  ["p28-r06", "A man standing in water with a fishing rod"],
  ["p28-r07", "A hand wiping ‘Happy Birthday’ from a chalkboard"],
  ["p29-r01", "A double-exposure photograph of a violinist"],
  ["p29-r02", "A hand holding a Yashica 35mm camera"],
  ["p29-r03", "A couple walking along a serene beach"],
  ["p29-r04", "A neon sign reading ‘SWEET DREAMS ARE MADE OF THIS’"],
  ["p29-r05", "Two pelicans seen through a circular lens"]
];

const methods = [
  ["reference", "Reference"],
  ["vanilla", "Vanilla"],
  ["repa", "REPA"],
  ["haste", "HASTE"],
  ["sra", "SRA"],
  ["ours", "Ours (CoAl)"]
];

const assetVersion = "20261001b";

document.querySelectorAll(".teaser-card").forEach(card => {
  card.addEventListener("click", () => {
    const revealed = card.getAttribute("aria-pressed") === "true";
    card.setAttribute("aria-pressed", String(!revealed));
  });
});

const attentionSvg = document.querySelector(".all-to-all-lines");
if (attentionSvg) {
  const tokenCenters = [90, 210, 330, 450, 550, 670, 790, 910];
  const svgNamespace = "http://www.w3.org/2000/svg";
  tokenCenters.forEach((sourceX, sourceIndex) => {
    tokenCenters.forEach(targetX => {
      const line = document.createElementNS(svgNamespace, "line");
      line.setAttribute("x1", String(sourceX));
      line.setAttribute("y1", "4");
      line.setAttribute("x2", String(targetX));
      line.setAttribute("y2", "256");
      line.setAttribute("class", sourceIndex < 4 ? "prompt-connection" : "image-connection");
      attentionSvg.appendChild(line);
    });
  });
}

function image(path, alt, className = "") {
  const figure = document.createElement("figure");
  figure.className = className;
  const img = document.createElement("img");
  img.src = path;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  figure.appendChild(img);
  return figure;
}

function renderFullComparisons() {
  const root = document.getElementById("full-comparison-gallery");
  const fragment = document.createDocumentFragment();
  fullComparisons.forEach(([folder, prompt]) => {
    const card = document.createElement("article");
    card.className = "comparison-card";
    const title = document.createElement("h3");
    title.textContent = `“${prompt}”`;
    card.appendChild(title);
    const scroll = document.createElement("div");
    scroll.className = "comparison-scroll";
    const grid = document.createElement("div");
    grid.className = "comparison-grid";
    methods.forEach(([key, label]) => {
      const item = image(`static/images/comparisons/full/${folder}/${key}.webp?v=${assetVersion}`, `${label} result for ${prompt}`, `comparison-item ${key === "ours" ? "ours" : ""}`);
      const caption = document.createElement("figcaption");
      caption.textContent = label;
      item.appendChild(caption);
      grid.appendChild(item);
    });
    scroll.appendChild(grid);
    card.appendChild(scroll);
    fragment.appendChild(card);
  });
  root.appendChild(fragment);
}

renderFullComparisons();

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");

document.querySelectorAll(".gallery-panel").forEach(panel => {
  panel.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    lightboxImage.src = target.src;
    lightboxImage.alt = target.alt;
    lightboxCaption.textContent = target.alt;
    lightbox.showModal();
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
