// Récupérer dans l'URL le numéro de commande
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Affichage du numéro de commande

let getOrder = document.getElementById("orderId");
getOrder.textContent = id;

// Effacer les données du localstorage

localStorage.removeItem("productUser");
