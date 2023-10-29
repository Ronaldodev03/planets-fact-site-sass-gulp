/*-------------------------------------------------------- menu-mobile controller --------------------------------------------------------*/
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visiblity = nav.getAttribute("data-visible");
  if (visiblity === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

/*------------------------------------------------------- menu-active -------------------------------------------------------*/
// Obtén todos los elementos <li> dentro de la lista
const listaItems = document.querySelectorAll(".header__ul li");

// Itera sobre cada elemento <li> y agrega un evento de clic
listaItems.forEach(function (item) {
  item.addEventListener("click", function () {
    // Elimina la clase "line-indicators--active" de todos los elementos
    listaItems.forEach(function (li) {
      li.classList.remove("line-indicators--active");
    });

    // Agrega la clase "line-indicators--active" solo al elemento clickeado
    item.classList.add("line-indicators--active");

    const visiblity = nav.getAttribute("data-visible");
    if (visiblity === "true") {
      nav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  });
});

/*-------------------------------------------------------- main__tabs classes controller --------------------------------------------------------*/

/////////////function for adding the active class to clicked tab
function handleTabClick(event) {
  const clickedTab = event.currentTarget;
  const mainTabs = document.querySelector(".main__tabs");
  const tabs = mainTabs.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.classList.remove("tab--active");
    tab.classList.remove("line-tabs-indicators--active");
  });
  clickedTab.classList.add("line-tabs-indicators--active");
  clickedTab.classList.add("tab--active");
}
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabClick);
});

/*---------------------------------------------------------- changing data ----------------------------------------------------------*/

fetch("./src/data.json")
  .then((response) => response.json())
  .then((data) => {
    // function for updating data with navBar and tabs
    function updatePlanetInfo(index) {
      const planet = data[index];

      const activeNav = document.querySelector(".line-tabs-indicators--active");
      const activeNavId = activeNav.id;
      document.getElementById("name").textContent = planet.name;
      document.getElementById("image").src = planet.images.planet;
      document.getElementById("image-mobile").src = planet.images.planet;
      document.getElementById("content").textContent =
        planet[activeNavId].content;
      document.getElementById("source").href = planet.overview.source;
      document.getElementById("rotation").textContent = planet.rotation;
      document.getElementById("revolution").textContent = planet.revolution;
      document.getElementById("radius").textContent = planet.radius;
      document.getElementById("temperature").textContent = planet.temperature;
      document.documentElement.style.setProperty(
        "--planet-color",
        `${planet.color}`
      );
      //updating with tabs
      const activeTab = document.querySelector(".tab--active");
      const active = activeTab.id;
      if (active === "overview") {
        document.getElementById("image").src = planet.images.planet;
        document.getElementById("content").textContent = planet[active].content;
        document.getElementById("image-mobile").src = planet.images.planet;
      } else if (active === "structure") {
        document.getElementById("image").src = planet.images.internal;
        document.getElementById("content").textContent = planet[active].content;
        document.getElementById("image-mobile").src = planet.images.internal;
      } else {
        document.getElementById("image").src = planet.images.planet;
        document.getElementById("content").textContent = planet.geology.content;
        document.getElementById("image-mobile").src = planet.images.planet;
        document.getElementById("image-geology").src = planet.images.geology;
        document.getElementById("image-geology-mobile").src =
          planet.images.geology;
      }
    }

    //getting the index
    const planetListItems = document.querySelectorAll(".nav-li");
    planetListItems.forEach((li, index) => {
      li.addEventListener("click", function () {
        updatePlanetInfo(index);
      });
    });

    // function for updating data with tabs
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const activeNavItem = document.querySelector(
          ".nav-li.line-indicators--active"
        );
        //index of nav-li with active class
        const index = Array.from(activeNavItem.parentNode.children).indexOf(
          activeNavItem
        );
        const planet = data[index];
        const tabId = tab.id;
        if (tab.id === "overview") {
          document.getElementById("image").src = planet.images.planet;
          document.getElementById("content").textContent =
            planet[tabId].content;
          document.getElementById("image-mobile").src = planet.images.planet;
          document.getElementById("image-geology").classList.add("hidden");
          document
            .getElementById("image-geology-mobile")
            .classList.add("hidden");
        } else if (tab.id === "structure") {
          document.getElementById("image").src = planet.images.internal;
          document.getElementById("content").textContent =
            planet[tabId].content;
          document.getElementById("image-mobile").src = planet.images.internal;
          document.getElementById("image-geology").classList.add("hidden");
          document
            .getElementById("image-geology-mobile")
            .classList.add("hidden");
        } else {
          document.getElementById("image").src = planet.images.planet;
          document.getElementById("content").textContent =
            planet.geology.content;
          document.getElementById("image-mobile").src = planet.images.planet;
          document.getElementById("image-geology").src = planet.images.geology;
          document.getElementById("image-geology-mobile").src =
            planet.images.geology;
          document.getElementById("image-geology").classList.remove("hidden");
          document
            .getElementById("image-geology-mobile")
            .classList.remove("hidden");
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });
