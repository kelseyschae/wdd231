import "../css/style.css"; 
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");

  if (!menuButton) {
    console.warn("Menu button not found.");
    return;
  }

  const nav = document.querySelector(".global-nav");

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
    nav.classList.toggle("show");

    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    const expanded = nav.classList.contains("show");
    target.setAttribute("aria-expanded", expanded);

    console.log("toggle");
  });
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);

  // Load header/footer FIRST so the toggle button exists
  setHeaderFooter(parkData);

  // THEN enable the menu
  enableNavigation();  // ← moved here (the fix)

  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();
