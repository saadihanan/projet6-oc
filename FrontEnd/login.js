/* Compte de Sophie Bluel:

email: sophie.bluel@test.tld
password: S0phie 

*/

const formulaire = document.getElementById("form-login");
console.log(formulaire);
const ErreurMessage = document.getElementById("erreur-message");
//console.log(ErreurMessage);
async function Login(email, password) {
  const User = {
    email: email,
    password: password,
  };
  //console.log(User);

  const optionRequete = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(User),
  };
  try {
    const response = await fetch(
      "http://localhost:5678/api/users/login",
      optionRequete
    );
    const resultat = await response.json();
    const token = resultat.token;
    localStorage.setItem("token", token);
    //console.log(resultat);

    if (response.status === 200) {
      console.log("Authentification réussie");
      window.location.href = "./index.html"; //redirection vers page d'accueil
      localStorage.setItem("isLoggedIn", true); // stocke l'etat de connexion
    } else {
      ErreurMessage.textContent =
        "Erreur dans l’identifiant ou le mot de passe";
      ErreurMessage.style.color = "red";
      ErreurMessage.style.textAlign = "center";
      console.log(
        "Echec de l'authentification : erreur dans le mot de passe ou l'email."
      );
    }
  } catch (error) {
    console.error(
      "Erreur dans l’identifiant ou le mot de passe " + error.message
    );
  }
}

formulaire.addEventListener("submit", (event) => {
  event.preventDefault(); //empeche le comportement par defaut de submit

  let BaliseEmail = document.getElementById("email");
  let email = BaliseEmail.value;
  let BalisePassword = document.getElementById("password");
  let password = BalisePassword.value;
  // console.log(email);
  //console.log(password);

  Login(email, password);
});
