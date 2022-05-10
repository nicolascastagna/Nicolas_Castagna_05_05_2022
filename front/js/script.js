const kanapContainer = document.querySelector(".items");
const apiUrl = "http://localhost:3000/api/products/";

// Récupéré les données de l'API et intégré les éléments sur la page d'accueil
async function fetchKanap() {
  await fetch(apiUrl)
    .then((res) => res.json())
    .then(function (data) {
      const kanapArray = data;

      for (let kanapArrays of kanapArray) {
        const kanapLink = document.createElement("a");
        kanapLink.href = `./product.html?id=${kanapArrays._id}`;
        kanapContainer.appendChild(kanapLink);

        const kanapArticle = document.createElement("article");
        kanapLink.appendChild(kanapArticle);

        const kanapImg = document.createElement("img");
        kanapImg.alt = kanapArrays.altTxt;
        kanapImg.src = kanapArrays.imageUrl;
        kanapArticle.appendChild(kanapImg);

        const kanapTitle = document.createElement("h3");
        kanapTitle.classList.add("productName");
        kanapTitle.innerText = kanapArrays.name;
        kanapArticle.appendChild(kanapTitle);

        const kanapDescription = document.createElement("p");
        kanapDescription.classList.add("productDescription");
        kanapDescription.innerText = kanapArrays.description;
        kanapArticle.appendChild(kanapDescription);

        console.log(kanapArrays._id);
      }
    });
}

fetchKanap();
