//AFFICHAGE de la galerie//
async function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    works.forEach((work) => {
      const figureElement = document.createElement("figure");
      figureElement.setAttribute("id", work.id);
      const workImg = document.createElement("img");
      workImg.src = work.imageUrl;
      const workId = document.createElement("figcaption");
      workId.innerText = work.title;
  
      gallery.appendChild(figureElement);
      figureElement.appendChild(workImg);
      figureElement.appendChild(workId);
    });
  }
  //AFFICHAGE ET FILTRAGE par catégories//
  async function displayCategories(categories) {
    const filter = document.querySelector(".filter");
    //console.log(categories);
    categories.unshift({ name: "Tous", id: "0" });
    categories.forEach((category) => {
      const Element = document.createElement("p");
      Element.innerText = category.name;
      Element.setAttribute("data-id", category.id);
      if (category.id === "0") {
        Element.style.color = "white";
        Element.style.backgroundColor = "#1D6154";
      }
      Element.addEventListener("click", async (event) => {
        const allElements = document.querySelectorAll(".filter p");
        allElements.forEach((color) => {
          color.style.color = "#1D6154";
          color.style.backgroundColor = "white";
        });
        Element.style.color = "white";
        Element.style.backgroundColor = "#1D6154";
  
        const works = await getWorks();
        console.log(works);
        console.log(event.target.getAttribute("data-id"));
        const filterWorks =
          event.target.getAttribute("data-id") === "0"
            ? works
            : works.filter(
                (work) => work.categoryId == event.target.getAttribute("data-id")
              );
        console.log(filterWorks);
        displayWorks(filterWorks);
      });
      filter.appendChild(Element);
    });
  }
  
  //INITIALISATION de l'affichage (galerie et catégorie)//
  async function init() {
    const works = await getWorks();
    const categories = await getCategories();
    displayWorks(works);
    await displayCategories(categories);
  }
  init();
  