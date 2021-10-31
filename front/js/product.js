const APIURL = "http://localhost:3000/api/products"; // Stockage du lien de l'API dans une constante
const urlParams = new URL(window.location); // Récupération de l'URL de la page produit
const idUrl = urlParams.searchParams.get('id'); // Récupération de l'ID présente dans l'URL de la page produit

getProduct(idUrl);

async function getProduct(product){ // Récupération du produit auprès de l'API par méthode fetch
    try{
        const result = await fetch(APIURL + '/' + product); 
        const article = await result.json();
        display(article); // Appel de la fonction display pour créer le produit dynamiquement
    }
    catch(error){
        console.error(error);
    }
}

function display (product){ // Création des produits par modulation dynamique du DOM
    const item__img = document.getElementById("item__img");
    const title__title = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");

    let item__imgimg = document.createElement('img');

    item__img.appendChild(item__imgimg);

    item__imgimg.setAttribute('alt', "");
    item__imgimg.alt = product.altTxt;

    item__imgimg.src = product.imageUrl;
    title__title.innerHTML = product.name;
    price.innerHTML = product.price;
    cart__item = product
    description.innerHTML = product.description;

    let atc = document.getElementById('addToCart');

    atc.onclick = (e) => {
        addTC(e, product._id, product.price);
    }

    product.colors.forEach(element => {
        const colors = document.getElementById('colors');
        let option = document.createElement('option')
        colors.appendChild(option);
        option.innerHTML = element;
    });
}

    function addTC (e, id, price){ // Création de la fonction d'ajout au panier
        e.preventDefault(); // On indique à la fonction de ne pas se lancer par défault à l'ouverture de la page
        const panier = localStorage.getItem('panier');
        const quantity = document.getElementById('quantity').value;
        const color = document.getElementById('colors').value;
        let colors = color; 
        let varId = id + '-' + colors;
        console.log(id);
        if (panier == null){
            localStorage.setItem(
                'panier',
                JSON.stringify(
                    [
                        {id: id, reference: varId, quantity: quantity, colors:color, price: price}
                    ]
                )
            )
        }
        else{
            let varId = id + '-' + colors
            if(JSON.parse(panier).filter(e => e.reference === varId).length > 0){
                if(JSON.parse(panier).filter(e => e.reference === varId)[0].colors === color){
                    colors = JSON.parse(panier).filter(e => e.reference === varId)[0].colors;
                }
                else{
                    colors = color;
                }
            }
            localStorage.setItem(
                'panier',
                JSON.stringify(
                    [
                        ...JSON.parse(localStorage.getItem('panier')).filter(I => I.reference !== varId),

                        {
                            id: id, reference: varId,
                            quantity: JSON.parse(panier).filter(e => e.reference === varId).length > 0 ?
                                      parseInt(JSON.parse(panier).filter(e => e.reference === varId)[0].quantity)+parseInt(quantity)
                            :quantity, 
                            colors: colors,
                            price: price
                        }
                    ]
                )
            )
        }
    }