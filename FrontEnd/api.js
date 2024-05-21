//Fonctions asynchrones de base pour effectuer des requêtes vers l'API//

const baseUrl = "http://localhost:5678/api";

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  //  console.log(data)
  return data;
}

async function getCategories() {
  const response2 = await fetch("http://localhost:5678/api/categories");
  const data2 = await response2.json();
  //console.log(data2)
  return data2;
}


