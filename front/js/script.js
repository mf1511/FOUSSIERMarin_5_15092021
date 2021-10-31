const APIURL = "http://localhost:3000/api/products"; // Stockage du lien API dans une constante

getProduct();

async function getProduct(){ // Récupération des produits auprès de l'API par méthode fetch
    try{
        const result = await fetch(APIURL);
        const article = await result.json();
        article.forEach(element => {
            display(element) // Appel de la fonction display pour créer les produits dynamiquement
        });
    }
    catch(error){
        console.error(error);
    }
}

function display(product){ // Affichage des produits par modulation dynamique du DOM 
    const items = document.getElementById("items");

    let a = document.createElement('a');
    let article = document.createElement('article');
    let img = document.createElement('img');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');

    items.appendChild(a);
    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    h3.classList.add('productName');
    p.classList.add('productDescription');

    img.setAttribute('alt', "");
    

    a.href = window.location.origin + "/front/html/product.html?id=" + product._id; // Redirection vers le produit choisi via son ID respective
    article.id = product._id;
    h3.innerHTML = product.name;
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    p.innerHTML = product.description;
}