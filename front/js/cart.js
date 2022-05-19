// Récupération des données du local storage
let addProduct = JSON.parse(localStorage.getItem("productUser"));
const apiUrl = "http://localhost:3000/api/products/";
let basketProduct;
let basket;

// Récupération des informations complémentaires au localstorage
async function fetchBasket(id) {
  await fetch(apiUrl)
    .then((data) => data.json())
    .then(function (data) {
      for (baskets of data) {
        basket = data;
      }
    });
  console.log(baskets);
  return basket;
}

// Conditions si le panier est vide
async function basketDisplay() {
  await fetchBasket();
  if (addProduct === null || addProduct.length === 0) {
    let basketEmpty = document.createElement("article");
    basketEmpty = document
      .querySelector("#cart__items")
      .appendChild(basketEmpty);
    basketEmpty.innerText = "Votre panier est vide";
  }
  // Afficher les produits du localstorage au panier
  else {
    for (let product in addProduct) {
      baskets = basket.find((d) => d._id === addProduct[product].ID);
      // création de l'article
      let basketArticle = document.createElement("article");
      basketArticle = document
        .querySelector("#cart__items")
        .appendChild(basketArticle);
      basketArticle.classList.add("cart__item");
      basketArticle.dataset.id = addProduct[product].ID;
      basketArticle.dataset.color = addProduct[product].Color;
      console.log(addProduct[product]);

      // création de la div qui contient la balise img

      const divBasket = document.createElement("div");
      basketArticle.appendChild(divBasket);
      divBasket.classList.add("cart__item__img");

      const imgBasket = document.createElement("img");
      divBasket.appendChild(imgBasket);
      imgBasket.src = baskets.imageUrl;
      imgBasket.alt = baskets.altTxt;

      // Création de la div "container"
      const divContainer = document.createElement("div");
      basketArticle.appendChild(divContainer);
      divContainer.classList.add("cart__item__content");

      // Création de la div contenu h2, description, p
      const divContent = document.createElement("div");
      divContainer.appendChild(divContent);
      divContent.classList.add("cart__item__content__description");

      const divTitle = document.createElement("h2");
      divContent.appendChild(divTitle);
      divTitle.innerText = baskets.name;
      const divTxt = document.createElement("p");
      divContent.appendChild(divTxt);
      divTxt.innerText = addProduct[product].Color;
      const divTxt2 = document.createElement("p");
      divContent.appendChild(divTxt2);
      divTxt2.innerText = baskets.price + " € ";

      // Création des settings

      const divSettingsContainer = document.createElement("div");
      divContainer.appendChild(divSettingsContainer);
      divSettingsContainer.classList.add("cart__content__settings");

      const divSettings = document.createElement("div");
      divSettingsContainer.appendChild(divSettings);
      divSettings.classList.add("cart__content__settings__quantity");

      const divQuantity = document.createElement("p");
      divSettings.appendChild(divQuantity);
      divQuantity.innerText = "Qté : " + addProduct[product].Quantity;

      const divInput = document.createElement("input");
      divSettings.appendChild(divInput);
      divInput.classList.add("itemQuantity");
      divInput.setAttribute("type", "number");
      divInput.setAttribute("name", "itemQuantity");
      divInput.min = "1";
      divInput.max = "100";
      divInput.value = addProduct[product].Quantity;

      // div supprimer

      const divDelete = document.createElement("div");
      divSettingsContainer.appendChild(divDelete);
      divDelete.classList.add("cart__item__content__settings__delete");

      const divDeleteTxt = document.createElement("p");
      divDelete.appendChild(divDeleteTxt);
      divDeleteTxt.classList.add("deleteItem");
      divDeleteTxt.innerText = "Supprimer";
    }
  }
  changeBasket();
}
