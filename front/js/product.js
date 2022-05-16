// Paramétrage de l'URL sur l'ID du produit
let params = new URL(document.location).searchParams;
let id = params.get("id");
const newUrl = "http://localhost:3000/api/products/" + id;

// Récupération des données de l'api et affichage du produit voulu
function getProduct(product) {
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
  saveBasket(product);
}

// Déclaration de la variable panier

const addBasket = document.getElementById("addToCart");

// Création d'une alerte lors de l'ajout d'un produit

const alert = () => {
  window.alert("Le produit a bien été ajouté au panier");
};

// Vérification si pris en compte les choix en couleur et le nombre

function saveBasket(product) {
  addBasket.addEventListener("click", (e) => {
    const colorBasket = document.getElementById("colors");
    const inputBasket = document.getElementById("quantity");

    if (
      colorBasket.value !== "" &&
      inputBasket.value != 0 &&
      inputBasket.value <= 100
    ) {
      // Création de l'objet pour le local storage

      let productId = id;
      let productQuantity = inputBasket.value;
      let productColor = colorBasket.value;

      const obj = {
        ID: productId,
        Quantity: productQuantity,
        Color: productColor,
      };

      // Transformation la chaine de caractères en données
      let kanapStorage = JSON.parse(localStorage.getItem("productUser"));

      // Condition s'il existe le même ID et couleur

      if (kanapStorage) {
        productBasket = kanapStorage.find(
          (p) => p.ID === productId && p.Color === productColor
        );

        // Incrémenter la quantité si même produit

        if (productBasket) {
          let allQuantity =
            parseInt(obj.Quantity) + parseInt(productBasket.Quantity);
          productBasket.Quantity = allQuantity;
          localStorage.setItem("productUser", JSON.stringify(kanapStorage));
          alert();
        }

        // Si le produit est différent de l'id
        else {
          kanapStorage.push(obj);
          localStorage.setItem("productUser", JSON.stringify(kanapStorage));
          alert();
        }
      }

      // Si le local storage est vide, ajout des données
      else {
        kanapStorage = [];
        kanapStorage.push(obj);
        localStorage.setItem("productUser", JSON.stringify(kanapStorage));
        alert();
      }
    }
  });
}
getProduct();
