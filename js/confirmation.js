(() => {
    let confirmDatas = getConfirmData()
    displayData(confirmDatas)

    getData()
    if (document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready()
    }
})()
//Recuperation du localStorage
function getData(){
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

// au moment de clique pour revenir à l'index, on efface le localStorage du panier
function ready(){
    document.addEventListener("DOMContentLoaded", () => {
        let btn = document.getElementById("return__btn")
        btn.addEventListener("click", () => {
            window.localStorage.removeItem('userPanier');
        })
    })
}

function getConfirmData(){
    let recevoirSessionStorage = sessionStorage.getItem("order")//sessionStorage
    let parsedSessionStorage = JSON.parse(recevoirSessionStorage)

    //Si il n'y a rien dans la page confirmation, on se dirige vers l'index automatiquement
    if(!recevoirSessionStorage){
        document.location.href = "index.html"
        alert("error")
    }else{
        parsedSessionStorage
        console.log(parsedSessionStorage)
        sessionStorage.removeItem('order')// ici pour dire une fois qu'on quitte la page confirmation, le sessionStorage disparasse
        //alert(error)
    }

    return parsedSessionStorage
}

function displayData(confirmDatas){
    const templateAdd = document.getElementById("confirmTemplate")
    const cloneAdd = document.importNode(templateAdd.content, true)
    cloneAdd.getElementById("blog__prenom").textContent = `${confirmDatas.contact.firstName} !` //confirmDatas.contact.firstName + " !"
    let parsedNumber = confirmDatas.products.reduce((sum, item) => sum += item.price, 0)
    cloneAdd.getElementById("blog__price").textContent = `${(parsedNumber / 100)} €`//(parsedNumber / 100) + " €"
    cloneAdd.getElementById("blog__order__id").textContent = confirmDatas.orderId
    document.getElementById("sectionTemplate").appendChild(cloneAdd)
}