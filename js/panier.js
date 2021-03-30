(() => {
    let cliqueLocalStorageData = getCliqueLocalStorageData()
    displayData(cliqueLocalStorageData)
    updateTotalPrice(cliqueLocalStorageData)

    if (document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
})()

function ready() {
    let removeCartItemButtons = document.getElementsByClassName("danger-btn") //On récupère la classe button, j'utilie getElementByClassName au lieu de ById car ID est unique donc 1 fois alors j'aimerais plus tard pouvoir effacer plusieurs achats.
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) { // On boucle tous les buttons à l'interieur de la carte, donc on peut effacer ce qui se trouve dans la carte column
        let button = removeCartItemButtons[i]
        button.addEventListener("click", function (e) {
            //e.data=i
            effacerElementCart(e)
        })// l'event à un property target qui va permetttre de remonter à tous les elements pour les effacer
        
    }
    //non fonctionelle
    let quantityInputs = document.getElementById("blog__quantity")
    quantityInputs.addEventListener("change", quantityChanged)
}

//non fonctionelle
function quantityChanged(event) {
    let input = event.target
    let quantity = parseInt(input.value)
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1
    } else if (quantity > 100) {
        quantity = 100
    }
    updateTotalPrice()
    console.log(quantity)
    input.value = quantity //Une fois la quantité validé, on l'as reinjecte dans l'input value
    return quantity
}

function effacerElementCart(event) {
    let buttonEffacer = event.target // tous les buttons qu'on clique, on peut effacer
    effacerLogique(event) // Pour effacer le localStorage
    setTimeout(function () {
        buttonEffacer.parentElement.parentElement.parentElement.parentElement.remove()
    },300)
    updateTotalPrice()// je l'ai mis là pour dire que si on efface tout le produit le prix deviens 0
}

function effacerLogique(event) {
    let donnéeEffacer = event.data // declencheur de l'évenement
    console.log(donnéeEffacer)
    let localStorageData = getCliqueLocalStorageData() // la function de récuperation de données button "ajouter au panier"
    localStorageData.splice(donnéeEffacer, 1)
    localStorage.setItem("userPanier", JSON.stringify(localStorageData))
    window.location.reload()
}

function updateTotalPrice(cliqueLocalStorageData){

    getCliqueLocalStorageData()
    total = 0
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const localStoragePrice = cliqueLocalStorageData[i];
        let quantityElement = parseInt(localStoragePrice.quantity)
        let priceElement = localStoragePrice.price
        let quantity = quantityElement.innerText
        let price = priceElement.value
        total = total + (quantity * price)

        /*document.getElementById("blog__quantity").value = localStoragePrice.quantity
        document.getElementById("price__blog").textContent = localStoragePrice.price / 100 + " €"*/
    }


    //let priceElement = cliqueLocalStorageData.find(prix => prix.price)
    /*
    total = 0
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const locaStorageData = cliqueLocalStorageData[i];
        let priceElement = parseInt(locaStorageData.price)
        let quantityElement = locaStorageData.quantity
        let price = priceElement.innerText
        let quantity = quantityElement.value
        console.log(price, quantity)
        total = total + (price * quantity)
    }
    let totalEmplacement = document.getElementById('prix-total')
    totalEmplacement =  total

    /*
    //let rowAchat = document.getElementByclassName("row-achat")[0]
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartCol = cartItemContainer.getElementsByClassName("col-achat")//[0]
    let total = 0
    for (let i = 0; i < cartCol.length; i++) {
        const row = cartCol[i]; // si j'utilise ne foncitionne pas
        let priceElement = document.getElementsByClassName("blog__price")[0]
        let quantityElement = document.getElementsByClassName("quantity")[0]
        //let prix = parseFloat(priceElement.innerText.replace('$', '')) // On récupère le texte qui se trouve à l'intérieur de la variable priceElement ce qui veut dire le prix
        let prix = parseFloat(priceElement.innerText) // On récupère le texte qui
        let quantity = quantityElement.value
        console.log(prix, quantity)
        total = 0 + (prix * quantity)
    }
    //let totalPrice = cartItemContainer.getElementsByClassName("total-prix")[0]
    //let totalPrice = cartItemContainer.querySelector(".total-prix")

    let totalPrice = document.getElementById("prix-total")

    totalPrice.innerText = total + "€"
    console.log(totalPrice)
    */
}

function getCliqueLocalStorageData(){

    if (localStorage.getItem("structMeuble")) {
        console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
    } else {
        console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
        //Le panier est un tableau de produits
        let panierInit = [];
        localStorage.setItem("structMeuble", JSON.stringify(panierInit));
    };

    // Je réucpere les données de localStorage
    let panierGetStorageData = localStorage.getItem('userPanier')

    // Verification qu'il ne soit pas vide
    if (!panierGetStorageData) {
        console.log("Oups, le panier est vide")
    }

    let parseStructMeubleJSON = JSON.parse(panierGetStorageData)

    return parseStructMeubleJSON
}

function displayData(cliqueLocalStorageData) {
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const localStorageClick = cliqueLocalStorageData[i];
        const templateAdd = document.getElementById("templateAdd")
        const cloneAdd = document.importNode(templateAdd.content, true)
        let getColor = (textContent = localStorageClick.color)
        cloneAdd.getElementById("blog__color").innerHTML += 
            `
            <option value="`+ getColor +`">`+ getColor +`</option>
            `
        cloneAdd.getElementById("blog__image").src = localStorageClick.imageUrl
        cloneAdd.getElementById("blog__quantity").value = localStorageClick.quantity
        cloneAdd.getElementById("price__blog").textContent = localStorageClick.price / 100 + " €"
        cloneAdd.getElementById("blog__title").textContent = localStorageClick.name
    
        document.getElementById("productsAddCenter").appendChild(cloneAdd)
    }
    //si le produit (nom) est déjà sur le panier, alors on ajoute pas une autre produit plus bas mais on ajoute un de plus dans input value
}