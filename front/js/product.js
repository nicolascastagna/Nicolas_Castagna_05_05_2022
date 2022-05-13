// Paramétrage de l'URL sur l'ID du produit
let params = new URL(document.location).searchParams;
let id = params.get("id");
const newUrl = "http://localhost:3000/api/products/" + id;

// Récupération des données de l'api et affichage du produit voulu
function getProduct() {
  fetch(newUrl)
    .then((res) => res.json())
    .then(function (id) {
      console.log(id._id);

      let productImg = document.createElement("img");
      productImg = document.querySelector(".item__img").appendChild(productImg);
      productImg.classList.add("item__img");
      productImg.src = id.imageUrl;
      productImg.alt = id.altTxt;

      const productTitle = document.getElementById("title");
      productTitle.innerText = id.name;

      const productPrice = document.getElementById("price");
      productPrice.innerHTML = id.price;

      const productDescription = document.getElementById("description");
      productDescription.innerHTML += id.description;

      for (let color of id.colors) {
        const selectColors = document.getElementById("colors");
        const optionSelectors = document.createElement("option");
        optionSelectors.appendChild(document.createTextNode(color));
        optionSelectors.value = color;
        selectColors.appendChild(optionSelectors);
      }
    });
}

// Déclaration des variables panier
const input = document.getElementById("quantity");
const addBasket = document.getElementById("addToCart");

// Vérification si pris en compte les choix en couleur et le nombre

addBasket.addEventListener("click", (e) => {
  const colorBasket = document.getElementById("colors");
  console.log(colorBasket.value);
  if (colorBasket.value) {
  } else {
    console.log("pas de couleur selectionné");
  }
  const inputBasket = document.getElementById("quantity");
  if (inputBasket.value > 0 && inputBasket.value <= 100) {
    console.log(inputBasket.value);
  } else {
    console.log("erreur");
  }