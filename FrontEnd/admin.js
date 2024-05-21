const modal = document.querySelector(".modal-body");
const closeModal = document.querySelector(".modal-close");
const ajoutImg = document.querySelector(".modal-ajout");
const suppImg = document.querySelector(".modal-supp");
const btnModal = document.querySelector(".modal-btn");
const modal2 = document.querySelector(".modal2-body");
const imageUpload = document.querySelector(".btn-ajout-photo");
const gallery = document.querySelector(".gallery");
const gallery2 = document.querySelector(".gallery2");
const closeModal2 = document.querySelector(".modal2-close");
const overlayModal = document.querySelector(".modal-container");
const overlayModal2 = document.querySelector(".modal2-container");
const iconePrecedent = document.getElementById("precedent");

//MODE ADMINISTRATEUR : Login OK//
function updateLogin() {
  const logStatus = document.querySelector(".login-link");
  //console.log(logStatus);
  const token = localStorage.getItem("token");
  //console.log(tokken);
  const boutonModifierModal = document.querySelector(".modal-btn");
  const barreEdition = document.querySelector(".barreEdition");
  const boutonModifier2 = document.querySelector(".btn-modifier");
  const boutonModif = document.querySelector(".btn-modifier2");
  const filter = document.querySelector(".filter");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    logStatus.innerHTML = "logout";
    boutonModifierModal.style.display = "block";
    boutonModif.style.display = "block";
    barreEdition.style.display = "flex";
    boutonModifier2.style.display = "block";
    filter.style.display = "none";
    //cliquer sur Logout pour se déconnecter//
    logStatus.addEventListener("click", () => {
      localStorage.clear("token");
      console.log("déconnecter");
    });
  } else {
    // Masquer les éléments lorsque la connexion échoue//
    boutonModifierModal.style.display = "none";
    boutonModif.style.display = "none";
    barreEdition.style.display = "none";
    boutonModifier2.style.display = "none";
    filter.style.display = "flex";
  }
}
updateLogin();

// FONCTION POUR LES MODALES//

//Fonction : Afficher/Disparaitre la premiere modale//
function afficherPremiereModal() {
  overlayModal.style.display = "block";
  modal.style.display = "block";
}
function closePremiereModal() {
  overlayModal.style.display = "none";
  modal.style.display = "none";
}
btnModal.addEventListener("click", afficherPremiereModal); //Afficher
//Fermer la premiere modale (icone "close", clic exterieur)//
closeModal.addEventListener("click", closePremiereModal);
overlayModal.addEventListener("click", closePremiereModal);
modal.addEventListener("click", function (event) {
  event.stopPropagation();
});

//Fonction Afficher/Disparaitre la deuxieme modale//
function afficherDeuxiemeModal() {
  overlayModal2.style.display = "block";
  modal2.style.display = "flex";
}

function closeDeuxiemeModal() {
  overlayModal2.style.display = "none";
  modal2.style.display = "none";
}
//Passer de la première modale à la deuxieme//
ajoutImg.addEventListener("click", () => {
  afficherDeuxiemeModal();
  closePremiereModal();
});
//Fermer la deuxieme modale (icone "close" clic exterieur)//
closeModal2.addEventListener("click", closeDeuxiemeModal);
overlayModal2.addEventListener("click", closeDeuxiemeModal);
modal2.addEventListener("click", function (event) {
  event.stopPropagation();
});
//Retour a la premiere modale avec la flèche "precedent"//
iconePrecedent.addEventListener("click", () => {
  closeDeuxiemeModal();
  afficherPremiereModal();
});

// MODALE 2 : menu déroulant : (categories) //
function displayListeDeroulante(categories) {
  //console.log(categories);
  const listeDeroulante = document.querySelector(".categoriesModal2");
  //console.log(listeDeroulante);
  categories.forEach((category) => {
    const options = document.createElement("option");
    options.innerText = category.name;
    options.value = category.id;
    // console.log(options);
    listeDeroulante.appendChild(options);
  });
}

// MODALE 1 : afficher les projets //
async function displayModalImg(works) {
  const gallery2 = document.querySelector(".gallery2");
  gallery2.innerHTML = "";
  works.forEach((work) => {
    const figureElement2 = document.createElement("figure");
    const workImg = document.createElement("img");
    workImg.src = work.imageUrl;
    workImg.dataset.indexId = work.id;
    const workP = document.createElement("p");
    workP.innerText = "éditer";
    const iconeDelet = document.createElement("div");
    iconeDelet.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    iconeDelet.classList.add("iconeDelet");
    iconeDelet.setAttribute("data-id", work.id);

    //FONCTION : Suppression d'une image avec l'icone "cobeille" //
    async function deleteWorks(id) {
      const token = window.localStorage.getItem("token");
      //console.log(token);

      await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Suppression réussie");
          } else if (response.status === 401) {
            console.log("Unauthorized");
          }
        })
        .catch((error) => {
          console.log(
            "Une erreur s'est produite lors de la suppression :",
            error
          );
        });
      const works = await getWorks();
      const categories = await getCategories();
      displayModalImg(works);
      displayWorks(works);
    }

    iconeDelet.addEventListener("click", (event) => {
      event.preventDefault();
      const id = event.currentTarget.getAttribute("data-id");
      deleteWorks(id);
    });

    //// SUPPRIMER des deux galeries(index et modale)////
    suppImg.addEventListener("click", (event) => {
      event.preventDefault();
      gallery2.innerHTML = "";
      gallery.innerHTML = "";
    });
    const firstFigure = document.querySelector(".gallery2 figure:first-child");
    if (firstFigure && !firstFigure.querySelector(".iconePosition")) {
      const iconePosition = document.createElement("div");
      iconePosition.innerHTML =
        '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
      iconePosition.classList.add("iconePosition");
      firstFigure.appendChild(iconePosition);
    }

    gallery2.appendChild(figureElement2);
    figureElement2.appendChild(workImg);
    figureElement2.appendChild(workP);
    figureElement2.appendChild(iconeDelet);
  });
}

const imageInput = document.getElementById("image_uploads");
const titleInput = document.querySelector(".titreModal2");
const categoryInput = document.querySelector(".categoriesModal2");
const boutonValider = document.getElementById("boutonValider");
const errorTitre = document.querySelector(".error-title");

//console.log(imageInput);
//console.log(titleInput);
//console.log(categoryInput);
//console.log(boutonValider);

//CHANGEMENT de couleur du bouton "Valider"//
function validationColor(event) {
  event.preventDefault();
  if (imageInput.files.length > 0 && titleInput.value.trim() !== "") {
    boutonValider.style.background = "#1D6154";
    boutonValider.style.color = "white";
    errorTitre.style.display = "none";
  } else {
    errorTitre.style.display = "block";
  }
}

imageInput.addEventListener("change", validationColor);

//PREVISUALISATION de l'image selectionnée//
imageInput.addEventListener("change", function () {
  const iconePrevisuel = document.getElementById("icone_previsuel");
  const imgPrevisuel = document.getElementById("imagePreview");
  const btnPrevisuel = document.querySelector(".btn-ajout-photo");

  const file = imageInput.files[0]; //recupère l'image selectionnée//
  if (file) {
    //VERIFICATION : si une image est selectionnée//
    const reader = new FileReader();
    reader.onload = function (event) {
      iconePrevisuel.style.display = "none";
      imgPrevisuel.src = event.target.result;
      imgPrevisuel.style.display = "flex";
      btnPrevisuel.style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    imgPrevisuel.src = "#";
    imgPrevisuel.style.display = "none";
  }
});

titleInput.addEventListener("input", validationColor);
const form = document.getElementById("modalForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const image = imageInput.files[0];
  const title = titleInput.value.trim();
  const categoryId = categoryInput.value;

  //console.log("image:", image);
  // console.log("titre:", title);
  //console.log("categories:", categoryId);

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", categoryId);

  if (image && title && categoryId) {
    sendFormData(formData, token);
  }
});

//FONCTION : Ajout d'une image//
async function sendFormData(formData, token) {
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Ajout réussi");
      } else if (response.status === 401) {
        console.log("Non autorisé");
      }
    })
    .catch((error) => {
      console.log("Une erreur s'est produite lors de l'ajout :", error);
    });

  const works = await getWorks();
  displayModalImg(works);
  displayWorks(works);
}

//INITIALISATION de l'affichage (galerie et catégorie)//
async function init() {
  const works = await getWorks();
  const categories = await getCategories();
  displayWorks(works);
  displayModalImg(works);
  displayListeDeroulante(categories);
}

init();
