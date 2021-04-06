(() => {
    let confirmData = getConfirmData()
    displayData(confirmData)

    if(document.readyState == "loading"){
        document.addEventListener("DOMContentLoaded", ready)
    }else {
        ready(confirmData)
    }
})()

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
    for (let i = 0; i < confirmData.length; i++) {
        const element = confirmData[i];
        
    }
}