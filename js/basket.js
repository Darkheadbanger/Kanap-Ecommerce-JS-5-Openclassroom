(async () => {
    let cliqueAjoutMeubleLocalStorage = await getCliqueAjoutMeubleLocalStorage()
    addDisplayPanier(cliqueAjoutMeubleLocalStorage)

    if (document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
})()

function ready() {
    let removeCartItemButtons = document.getElementsByClassName("danger-btn")
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener("click", effacerElementCart)
    }
    //non fonctionelle
    let quantityInputs = document.getElementById("blog__quantity")
    quantityInputs.addEventListener("change", quantityChanged)
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