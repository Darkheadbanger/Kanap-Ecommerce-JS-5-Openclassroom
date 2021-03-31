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
}

function effacerElementCart(event) {
    let buttonEffacer = event.target // tous les buttons qu'on clique, on peut effacer
    effacerLogique(event) // Pour effacer le localStorage
    setTimeout(function () {
        buttonEffacer.parentElement.parentElement.parentElement.parentElement.remove()
    },300)
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
    console.log(totalPrice)*/
    
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
    
    console.log(panierGetStorageData)

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
        const templateAdd = document.querySelector(".templateAdd")
        const cloneAdd = document.importNode(templateAdd.content, true)
        cloneAdd.getElementById("blog__color").textContent = localStorageClick.color
        cloneAdd.getElementById("blog__image").src = localStorageClick.imageUrl
        cloneAdd.getElementById("blog__quantity").textContent = localStorageClick.quantity
        cloneAdd.getElementById("price__blog").textContent = localStorageClick.price / 100 + " €"
        cloneAdd.getElementById("blog__title").textContent = localStorageClick.name
        document.getElementById("productsAddCenter").appendChild(cloneAdd)
    }
    /*
    let idElement = userPanier.find(leId => leId._id === '_id')
    console.log(idElement)*/

    //si le produit (nom) est déjà sur le panier, alors on ajoute pas une autre produit plus bas mais on ajoute un de plus dans input value
}