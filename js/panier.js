(() => {
    let cliqueAjoutMeubleLocalStorage = getCliqueAjoutMeubleLocalStorage()
    addDisplayPanier(ajoutMeubleLocalStorage)

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

    if(JSON.parse(localStorage.getItem("userPanier")).length > 0){
        buttonEffacer.parentElement.parentElement.remove()
    }else{
        document.getElementById("container-tout")//.remove()
    }

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

function getCliqueAjoutMeubleLocalStorage(){
    /*On vérifie si un produit est dans un panier ou pas
    if(JSON.parse(localStorage.getItem("userPanier")).length == 0){
        document.getElementById("container-tout").remove()
    }
    JSON.parse(localStorage.getItem("userPanier"));
    JSON.parse(localStorage.getItem("structureMeuble"));
    */
    /* Recuperation des données localStorage*/

    updateTotalPrce()// à chaque fois que l'utilisateur clique sur "ajouter au panier" et le produit s'ajoute à la page panier, alors le prix peut changer dynamiquement

}

function addDisplayPanier(ajoutMeubleLocalStorage) {
    //document.getElementById("blog__image").src = meubleLocalStorage.imageUrl
    let colItems = document.getElementsByClassName("col-achat")
    let meubleDejaAjouter = colItems.getElementsByClassName("blog__name") // pour éviter que le produit déjà ajouté s'ajoute
    for (let i = 0; i < meubleDejaAjouter.length; i++) {
        let nameExist = meubleDejaAjouter[i].innerText = ajoutMeubleLocalStorage.name
        if(nameExist === name){
            //alert('Produit déjà sous le panier')
            return
        }
    }
    // le code en haut pour dire que si le produit est déjà sur le panier, si l'utilisateur reclique sur "ajouter au panier", le même produit ne peut pas s'ajouter en dessous le même produit

    const templateAdd = getElementById("templateAdd")
    const cloneAdd = document.importNode(templateAdd.content, true)
    cloneAdd.getElementById("blog__image").src = ajoutMeubleLocalStorage.imageUrl
    cloneAdd.getElementById("blog__color").value = ajoutMeubleLocalStorage.blog__color
    cloneAdd.getElementById("blog__quantity").value = ajoutMeubleLocalStorage.quantity
    cloneAdd.getElementById("price__blog").textContent = ajoutMeubleLocalStorage.price
    const name = cloneAdd.getElementById("blog__title").textContent = ajoutMeubleLocalStorage.name

    document.getElementById("productsAddCenter").appendChild(cloneAdd)

    eraseAfterClick()
    //colItems.document.getElementByclassName("danger-btn")[0].addEventListener("click", effacerElementCart) // J'imagine après qu'on ajoute le produit, le bouton effacer ne peut pas fonctionner car le bouton effacer fonctionne uniquement après que lapage se télécharge
    quantityUpdateAfterClick() // J'imagine que la quantité ne fonctionne pas après que le produit s'ajoute, alors j'ajoute et j'appelle la fonctionne ajouter quantité pour pour povuvoir ajouter la quantité après clique donc le prix dynamique dépend du prix
}

function eraseAfterClick(){
    let colItems = document.getElementsByClassName("col-achat")
    colItems.getElementByclassName("danger-btn")[0].addEventListener("click", effacerElementCart) // J'imagine après qu'on ajoute le produit, le bouton effacer ne peut pas fonctionner car le bouton effacer fonctionne uniquement après que lapage se télécharge
}

function quantityUpdateAfterClick(){
    let colItems = document.getElementsByClassName("col-achat")
    colItems.getElementsByClassName("quantity").addEventListener("change", quantityChanged)
}