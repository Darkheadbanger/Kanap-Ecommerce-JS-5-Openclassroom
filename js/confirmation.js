(() => {
    let confirmData = getConfirmData()
    displayData(confirmData)

    if(document.readyState == "loading"){
        document.addEventListener("DOMContentLoaded", ready)
    }else {
        ready()
    }
})()
//Recuperer les données envoyés depuis la page panier, et on affiche dans la page confirmation
function ready(){

}

function getConfirmData(){

}

function displayData(confirmData){

}

/*
//Une funciton pour récuperer le localStorage pour pouvoir reutiliser plus tard
function getConfirmData(){
    let setConfirmData = localStorage.getItem("userName")
    console.log(setConfirmData)

    let setConfirDataParsed = JSON.parse(setConfirmData)
    console.log(setConfirDataParsed)

    if(!setConfirmData){
        console.log("Le panier est vide")
    }

    return setConfirDataParsed
}

function displayData(confirmData){
    /*for (let i = 0; i < confirmData.length; i++) {
        const element = confirmData[i];
        
    }
}*/