(() => {
    let cliqueLocalStorageData = getCliqueLocalStorageData()
    displayData(cliqueLocalStorageData)

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
        button.addEventListener("click", effacerElementCart)// l'event à un property target qui va permetttre de remonter à tous les elements pour les effacer
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
    updateTotalPrce()
    console.log(quantity)
    input.value = quantity //Une fois la quantité validé, on l'as reinjecte dans l'input value
    return quantity
}

function effacerElementCart(event) {
    let buttonEffacer = event.target // tous les buttons qu'on clique, on peut effacer
    buttonEffacer.parentElement.parentElement.remove()
    
    updateTotalPrce()// je l'ai mis là pour dire que si on efface tout le produit le prix deviens 0
}

function updateTotalPrce(){
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartCol = cartItemContainer.getElementsByClassName("col-achat")
    let total = 0
    for (let i = 0; i < cartCol.length; i++) {
        let cartCols = cartCol[i]; // si j'utilise ne foncitionne pas
        let priceElement = document.getElementsByClassName("blog__price")[0]
        let quantityElement = document.getElementsByClassName("quantity")[0]
        //let prix = parseFloat(priceElement.innerText.replace('$', '')) // On récupère le texte qui se trouve à l'intérieur de la variable priceElement ce qui veut dire le prix
        let prix = parseFloat(priceElement.innerText.replace('$', '')) // On récupère le texte qui
        let quantity = quantityElement.value
        console.log(prix, quantity)
        total = 0 + (prix * quantity)
    }
    let totalPrice = document.getElementsByClassName("total-prix")[0]
    totalPrice.innerText = '$' + total
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
    let structMeubleData = localStorage.getItem('structMeubleData')

    // Verification qu'il ne soit pas vide
    if (!structMeubleData) {
        console.log("Oups, le panier est vide")
        structMeubleData = '{}'
    }
    
    console.log(structMeubleData)
    let parseStructMeubleJSON = JSON.parse(structMeubleData)
    return parseStructMeubleJSON
}

function displayData(cliqueLocalStorageData) {
    // méthode template pour clonner le même balise HTML, pareil comme la page index

    // pour chaque element appellé, on va pouvoir boucler les elements donc d'ajouter dynamiquement les elements
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const clique = cliqueLocalStorageData[i];
        const templateAdd = getElementById("templateAdd")
        const cloneAdd = document.importNode(templateAdd.content, true)
        cloneAdd.getElementById("blog__image").src = clique.imageUrl
        cloneAdd.getElementById("blog__title").textContent = clique.name
        cloneAdd.getElementById("blog__color").value = clique.color
        cloneAdd.getElementById("blog__quantity").value = clique.quantity
        cloneAdd.getElementById("price__blog").textContent = clique.price
    
        document.getElementById("productsAddCenter").appendChild(cloneAdd)
    }
}