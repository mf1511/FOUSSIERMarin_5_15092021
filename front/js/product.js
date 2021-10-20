const APIURL = "http://localhost:3000/api/products";

const urlParams = new URL(window.location);
const idUrl = urlParams.searchParams.get('id');


getProduct(idUrl);

async function getProduct(product){
    try{
        const result = await fetch(APIURL + '/' + product);
        const article = await result.json();
        display(article);
    }
    catch(error){
        console.error(error);
    }
}

function display (product){
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



    function addTC (e, id, price){
        e.preventDefault();
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
                        {id: varId, quantity: quantity, colors:color, price: price}
                    ]
                )
            )
        }
        else{
            let varId = id + '-' + colors
            if(JSON.parse(panier).filter(e => e.id === varId).length > 0){
                if(JSON.parse(panier).filter(e => e.id === varId)[0].colors === color){
                    colors = JSON.parse(panier).filter(e => e.id === varId)[0].colors;
                }
                else{
                    colors = color;
                }
                console.log(JSON.parse(panier).filter(e => e.id === varId)[0].colors);

            }

            localStorage.setItem(
                'panier',
                JSON.stringify(
                    [
                        ...JSON.parse(localStorage.getItem('panier')).filter(I => I.id !== varId),

                        {
                            id: varId,
                            quantity: JSON.parse(panier).filter(e => e.id === varId).length > 0 ?
                                      parseInt(JSON.parse(panier).filter(e => e.id === varId)[0].quantity)+parseInt(quantity)
                            :quantity, 
                            colors: colors,
                            price: price
                        }
                    ]
                )

            )
        }

    }
