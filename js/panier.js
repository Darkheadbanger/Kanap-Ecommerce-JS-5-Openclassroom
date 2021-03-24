const { ready } = require("jquery")

(async () => {
    let panierData = getPanierData()
    let panierAchatMeuble = getPanierAchatMeuble(panierData)
    displayPanier()  

    if(document.readyState == "loading"){
        document.addEventListener("DOMContentLoaded", ready)
    }else{
        ready()
    }
})()

function ready(){

}

function getPanierData() {

}

function getPanierAchatMeuble(panierData){

}

function displayPanier(){

}