(() => {
    displayPanier()

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
        button.addEventListener("click", function(event) {// l'event à un property target qui va permetttre de remonter à tous les elements pour les effacer
            console.log("click")
            let buttonEffacer = event.target // tous les buttons qu'on clique, on peut effacer
            buttonEffacer.parentElement.parentElement.remove()
            updateTotalPrce()
        })
    }
    /* fonctionelle
    let removeCartItemButtonsAll = document.getElementsByClassName("danger-btn-first") //On récupère la classe button, j'utilie getElementByClassName au lieu de ById car ID est unique donc 1 fois alors j'aimerais plus tard pouvoir effacer plusieurs achats.
    console.log(removeCartItemButtonsAll)
    for (let i = 0; i < removeCartItemButtonsAll.length; i++) { // On boucle tous les buttons à l'interieur de la carte, donc on peut effacer ce qui se trouve dans la carte column
        let button = removeCartItemButtonsAll[i]
        button.addEventListener("click", function(event) {// l'event à un property target qui va permetttre de remonter à tous les elements pour les effacer
            console.log("click")
            let buttonEffacer = event.target
            buttonEffacer.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()//Pour tout enlever
        })
    }*/
}

function updateTotalPrce(){
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartCol = cartItemContainer.getElementsByClassName("col-achat")
    let total = 0
    for (let i = 0; i < cartCol.length; i++) {
        let cols = cartCol[i];
        let priceElement = cols.getElementsByClassName("blog__price")[0]
        let quantityElement = cols.getElementsByClassName("blog_quantity")[0]
        //let prix = parseFloat(priceElement.innerText.replace('$', '')) // On récupère le texte qui se trouve à l'intérieur de la variable priceElement ce qui veut dire le prix
        let prix = priceElement.innerText
        let quantity = quantityElement.value
        console.log(prix, quantity)
        total = total + (prix * quantity)
    }
    let totalPrice = document.getElementsByClassName("total-prix")[0]
    totalPrice.innerText = '$' + total
}

function displayPanier() {

}