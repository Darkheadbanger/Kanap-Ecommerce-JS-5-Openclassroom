(() => {
    let panierData = getPanierData()
    let panierAchatMeuble = getPanierAchatMeuble(panierData)
    displayPanier()

    if (document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
})()

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("danger-btn") //On récupère la classe button, j'utilie getElementByClassName au lieu de ById car ID est unique donc 1 fois alors j'aimerais plus tard pouvoir effacer plusieurs achats.
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) { // On boucle tous les buttons à l'interieur de la carte, donc on peut effacer ce qui se trouve dans la carte column
        let button = removeCartItemButtons[i]
        button.addEventListener("click", function(event) {// l'event à un property target qui va permetttre de remonter à tous les elements pour les effacer
            console.log("click")
            let buttonEffacer = event.target
            buttonEffacer.parentElement.parentElement.parentElement.remove()
        })
    }
}

function getPanierData() {

}

function getPanierAchatMeuble(panierData) {

}

function displayPanier() {

}