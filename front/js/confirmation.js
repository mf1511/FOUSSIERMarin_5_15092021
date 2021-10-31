const urlParams = new URL(window.location); // Récupération de l'URL de la page sur laquelle nous nous rendons en cliquant sur le bouton commander
const idUrl = urlParams.searchParams.get('orderId'); // Récupération de l'ID présente dans l'URL

const validation = document.getElementById("orderId"); // Localisation de l'objet à modifier

validation.innerHTML = idUrl; // Modification de l'objet HTML avec la constante idUrl récupérée