import { getParkData, parkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

// get park data
const parkData = getParkData();

// set header and footer
setHeaderFooter(parkData);

// build intro + info cards
const main = document.querySelector("#main");
main.innerHTML = `
  <section class="intro">
    <h1>Welcome to ${parkData.fullName}</h1>
    <p>${parkData.description}</p>
  </section>
  <section class="info">
    ${parkInfoLinks.map((link) => mediaCardTemplate(link)).join("")}
  </section>
`;


  
