// Récupération des données du local storage
let addProduct = JSON.parse(localStorage.getItem("productUser"));
const apiUrl = "http://localhost:3000/api/products/";
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

// Modification de la quantité entre le panier et local storage

function changeBasket(product) {
  const inputBasket = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < inputBasket.length; i++) {
    inputBasket[i].addEventListener("change", (e) => {
      addProduct[i].Quantity = e.target.value;
      if (addProduct[i].Quantity == 0 || addProduct.Quantity > 100) {
        alert("Merci de choisir une quantité entre 1 et 100");
        location.reload();
      } else {
        localStorage.setItem("productUser", JSON.stringify(addProduct));
      }
    });
  }
}

basketDisplay();

//---------------------------------------------

// Comportement lors du formulaire de commande

// Regex prénom/nom : (/^[a-zA-Z0-9_.-]*$/)
// Regex mail : (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);
const form = document.querySelector("form");

const firstNameChecker = (value) => {
  console.log(value);
  const errorFirstName = document.getElementById("firstNameErrorMsg");
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorFirstName.textContent =
      "Le prénom doit faire entre 3 et 20 caractères";
    return false;
  } else if (
    !value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
  ) {
    errorFirstName.textContent =
      "Le prénom ne doit pas contenir de caractères spéciaux";
    return false;
  } else {
    errorFirstName.textContent = "";
    return true;
  }
};
const lastNameChecker = (value) => {
  console.log(value);
  const errorLastName = document.getElementById("lastNameErrorMsg");
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorLastName.textContent = "Le nom doit faire entre 3 et 20 caractères";
  } else if (
    !value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
  ) {
    errorLastName.textContent =
      "Le nom ne doit pas contenir de caractères spéciaux";
    return false;
  } else {
    errorLastName.textContent = "";
    return true;
  }
};
const addressChecker = (value) => {
  console.log(value);
  const errorAddress = document.getElementById("addressErrorMsg");
  if (value.length === 0) {
    errorAddress.textContent =
      "Ce champ est obligatoire (vous ne pouvez pas le laisser vide)";
  } else if (!value.match(/^[a-zA-Z0-9\s,'-]*$/)) {
    errorAddress.textContent =
      "L'adresse ne doit pas contenir de caractères spéciaux";
    return false;
  } else {
    errorAddress.textContent = "";
    return true;
  }
};
const cityChecker = (value) => {
  console.log(value);
  const errorCity = document.getElementById("cityErrorMsg");
  if (value.length === 0) {
    errorCity.textContent =
      "Ce champ est obligatoire (vous ne pouvez pas le laisser vide";
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorCity.textContent =
      "La ville ne doit pas contenir de caractères spéciaux";
    return false;
  } else {
    errorCity.textContent = "";
    return true;
  }
};
const emailChecker = (value) => {
  console.log(value);
  const errorEmail = document.getElementById("emailErrorMsg");
  if (value.length === 0) {
    errorEmail.textContent =
      "Ce champ est obligatoire (vous ne pouvez pas le laisser vide)";
  } else if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)) {
    errorEmail.textContent = "L'adresse mail n'est pas valide";
    return false;
  } else {
    errorEmail.textContent = "";
    return true;
  }
};
const confirmChecker = (value) => {
  console.log(value);
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // Test la valeur des inputs
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "submit":
        confirmChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

// Envoyer les informations dans un objet

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    firstNameChecker &&
    lastNameChecker &&
    addressChecker &&
    cityChecker &&
    emailChecker
  ) {
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    // Redirection vers la page de confirmation
    form.href = `./cart.html?id=${basket._id}`;
  } else {
    alert("Veuillez remplir correctement les champs");
  }
});
