// ========== MAIN MENU HANDLER ==========
function mainMenuHandler(ev) {
    let target = ev.target;
  
    const nav = document.querySelector(".global-nav");
    nav.classList.toggle("show");
  
    // Make sure we're interacting with the actual button
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }
  
    const isOpen = nav.classList.contains("show");
    target.setAttribute("aria-expanded", isOpen);
  
    console.log("Main menu toggled:", isOpen);
  }
  
  
  // ========== SUBMENU HANDLER ==========
  function subMenuHandler(ev) {
    const li = ev.currentTarget.closest("li");
    const submenu = li.querySelector(".global-nav__submenu");
    const icon = ev.currentTarget.querySelector(".icon");
  
    submenu.classList.toggle("show");
    icon.classList.toggle("rotate");
  }
  
  
  // ========== ENABLE NAVIGATION ==========
  export default function enableNavigation() {
    // Delay until DOM updates from setHeaderFooter are complete
    requestAnimationFrame(() => {
  
      const menuButton = document.querySelector("#global-nav-toggle");
      const subMenuToggles = document.querySelectorAll(".global-nav__split-button__toggle");
  
      if (!menuButton) {
        console.warn("Menu toggle not found");
        return;
      }
  
      console.log("Enabling navigation… found", subMenuToggles.length, "submenu buttons");
  
      // Enable main menu toggle
      menuButton.addEventListener("click", mainMenuHandler);
  
      // Enable submenu toggles
      subMenuToggles.forEach((toggle) => {
        toggle.addEventListener("click", subMenuHandler);
      });
  
    });
  }
  
