const APIURL = "http://localhost:3000/api/products";



addPanier();

async function addPanier(){

    let panier = [];

    try{
        if (localStorage.getItem('panier')){
            panier = JSON.parse(localStorage.getItem('panier'));
        }

        if (panier.length >= 1){
            localStorage.getItem('panier', JSON.stringify(panier));
            for (i=0; i < panier.length; i++) { //Tant que panier est supérieur à i
                const result = await fetch(APIURL + '/' + panier[i].id.split('-')[0]);
                const article = await result.json();
                const cart__items = document.getElementById("cart__items");

                let cart__item = document.createElement('article');
                let cart__item__img = document.createElement('div');
                let cart__item__imgimg = document.createElement("img"); 

                let cart__item__content = document.createElement('div');
                let cart__item__content__titlePrice = document.createElement("div");
                let cart__item__content__titlePrice__h2 = document.createElement("h2");
                let cart__item__content__titlePrice__p = document.createElement("p");

                let cart__item__content__settings = document.createElement("div");
                let cart__item__content__settings__quantity = document.createElement('div');
                let cart__item__content__settings__color = document.createElement('div');
                let cart__item__content__settings__p = document.createElement("p");
                let cart__item__content__settings__input = document.createElement("input");
                let cart__item__content__settings__delete = document.createElement("div");
                let cart__item__content__settings__delete__p = document.createElement("button");

                cart__items.appendChild(cart__item);

                cart__item.appendChild(cart__item__img);
                cart__item.appendChild(cart__item__content);

                cart__item__img.appendChild(cart__item__imgimg);

                cart__item__content.appendChild(cart__item__content__titlePrice);
                cart__item__content.appendChild(cart__item__content__settings__color);
                cart__item__content.appendChild(cart__item__content__settings);
                


                cart__item__content__titlePrice.appendChild(cart__item__content__titlePrice__h2);
                cart__item__content__titlePrice.appendChild(cart__item__content__titlePrice__p);

                cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
                cart__item__content__settings.appendChild(cart__item__content__settings__delete);


                cart__item__content__settings__quantity.appendChild(cart__item__content__settings__p);
                cart__item__content__settings__quantity.appendChild(cart__item__content__settings__input);


                cart__item__content__settings__delete.appendChild(cart__item__content__settings__delete__p);

                cart__item.classList.add('cart__item');
                cart__item__img.classList.add('cart__item__img');
                cart__item__content.classList.add('cart__item__content');
                cart__item__content__titlePrice.classList.add('cart__item__content__titlePrice');
                cart__item__content__settings.classList.add('cart__item__content__settings');
                cart__item__content__settings__quantity.classList.add('cart__item__content__settings__quantity');
                cart__item__content__settings__input.classList.add('itemQuantity');
                cart__item__content__settings__delete.classList.add('cart__item__content__settings__delete');
                cart__item__content__settings__delete__p.classList.add('deleteItem');

                cart__item__content__settings__quantity.setAttribute('id', 'cart__item__content__settings__p');
                cart__item__content__settings__input.setAttribute('id', 'itemQuantity');

                


                cart__item.setAttribute('data-id', article._id);
                cart__item.setAttribute('data-colors', panier[i].colors);


                cart__item__imgimg.setAttribute('alt', article.altTxt);
                
                cart__item__imgimg.src = article.imageUrl;
                cart__item__content__titlePrice__h2.innerHTML  = article.name;
                cart__item__content__titlePrice__p.innerHTML = article.price + ' $';
                cart__item__content__settings__color.innerHTML = 'Couleur : ' + panier[i].colors;
                cart__item__content__settings__p.innerHTML = 'Qté : ' + panier[i].quantity;
                cart__item__content__settings__delete__p.innerHTML = 'Supprimer';
                cart__item__content__settings__delete__p.setAttribute('onclick', "vider('"+panier[i].id+"', '"+panier[i].colors+"');")


                let colors = panier[i].colors; 
                
                let varId = panier[i].id;      

                cart__item__content__settings__input.addEventListener('change', function (event) {

                            let quantity = document.getElementsByClassName('itemQuantity');
                            
                            cart__item__content__settings__p.innerHTML = 'Qté : ' + event.target.value ;

            
                            
                            let idcart = varId + '-' + colors;
                            localStorage.setItem(
                                'panier',
                                    JSON.stringify(
                                        [
                                            ...JSON.parse(localStorage.getItem('panier')).filter(i => i.reference !== idcart),
                                            {
                                                id: varId, 
                                                reference: idcart,
                                                quantity: parseInt(event.target.value), 
                                                colors: colors,
                                                price: article.price
                                            }
                                        ]
                                    )
                                ) 



                            const cartQty = document.getElementById('totalQuantity');
                            cartQty.innerHTML = totalQty();
                            
                            function totalQty(){
                                if (localStorage.getItem('panier') !== null){
                                    const panierQty = localStorage.getItem('panier');
                                    const total = JSON.parse(panierQty).reduce(function(a, b){
                                        if(b.quantity){ 
                                            return parseInt(a) + parseInt(b.quantity);
                                        }
                                    },0);
                                    return total;
                                }
                                return 0;
                            }
                            
                            const cartTotal = document.getElementById('totalPrice');
                             const total = JSON.parse(localStorage.getItem('panier')).reduce(function(a, b){
                            if(b.quantity){ 
                                console.log(b.quantity);
                                console.log(b.price);


                                return parseInt(a) + (parseInt(b.price) * parseInt(b.quantity))
                            }
                                },0);
                            cartTotal.innerHTML = total;
                });

                const cartTotal = document.getElementById('totalPrice');
                const total = JSON.parse(localStorage.getItem('panier')).reduce(function(a, b){
                    if(b.quantity){ 
                        return a + (parseInt(b.price) * parseInt(b.quantity))
                    }
                },0);
                cartTotal.innerHTML = total;
            }
        }
    }
    catch(error){ 
        alert(error)
    }
}
    
const vider = (id, colors) => {
    let varId = id + '-' + colors;
    const data = JSON.parse(localStorage.getItem("panier"))
    localStorage.setItem("panier", JSON.stringify(data.filter(i => i.reference !== varId)))
    window.location.reload()
}

const cartQty = document.getElementById('totalQuantity');
cartQty.innerHTML = totalQty();

function totalQty(){
    if (localStorage.getItem('panier') !== null){
        const panierQty = localStorage.getItem('panier');
        const total = JSON.parse(panierQty).reduce(function(a, b){
            if(b.quantity){ 
                return parseInt(a) + parseInt(b.quantity);
            }
        },0);
        return total;
    }
    return 0;
}

function validateForm() {
    let buttonValidation = document.getElementById('order');
     buttonValidation.addEventListener('click', function () { 
    
    })
}


    function sendOrder(){
        var firstName = document.getElementById("firstName");
        var lastName = document.getElementById("lastName");
        var address = document.getElementById("address");
        var city = document.getElementById("city");
        var email = document.getElementById("email");

        var regFirstName = document.getElementById("firstName").value;
        var regLastName = document.getElementById("lastName").value;
        var regAddress = document.getElementById("address").value;
        var regCity = document.getElementById("city").value;
        var regEmail = document.getElementById("email").value;

        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        const namesRegex = /^[a-zA-Z]+$/

        if      (!(
            namesRegex.test(regFirstName)
            && namesRegex.test(regLastName)
            && emailRegex.test(regEmail)
            && regAddress.length > 6
            && regCity.length > 1
            ))  
                {
                    alert("Veuillez remplir les champs correctements avant de procéder au paiemenhhht")
                    return false;
                } 



        const orderData = {
            firstName:firstName.value ||"",
            lastName:lastName.value ||"",
            address:address.value ||"",
            city:city.value ||"",
            email:email.value ||"",        
        };
        // console.log(JSON.parse(localStorage.getItem('panier')).map((e) => e.id));
        fetch(APIURL + '/order', {
            method:"POST",
            body: JSON.stringify({
                contact:orderData, 
                products:JSON.parse(localStorage.getItem('panier')).map((e) => e.id)
            }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
        
        .then((result) => result.json())
        .then((json) => {
            localStorage.removeItem('panier')
            window.location.href = `${window.location.origin}/front/html/confirmation.html?orderId=${json.orderId}`
            
        })
        

        .catch((error) => {
            alert(error)
        })
        

    }



