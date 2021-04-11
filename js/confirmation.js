(() => {
    let confirmDatas = getConfirmData()
    displayData(confirmDatas)
})()

function getConfirmData(){
    let recevoirSessionStorage = sessionStorage.getItem("order")//sessionStorage
    let parsedSessionStorage = JSON.parse(recevoirSessionStorage)

    //Si il n'y a rien dans la page confirmation, on se dirige vers l'index automatiquement
    if(!recevoirSessionStorage){
        document.location.href = "index.html"
    }else{
        parsedSessionStorage
        console.log(parsedSessionStorage)
        sessionStorage.removeItem('order')// ici pour dire une fois qu'on quitte la page confirmation, le sessionStorage disparasse
    }

    return parsedSessionStorage
}

function displayData(confirmDatas){
    const templateAdd = document.getElementById("confirmTemplate")
    const cloneAdd = document.importNode(templateAdd.content, true)
    cloneAdd.getElementById("blog__prenom").textContent = confirmDatas.contact.firstName + " !"
    let parsedNumber = confirmDatas.products.reduce((sum, item) => sum += item.price, 0)
    cloneAdd.getElementById("blog__price").textContent = (parsedNumber / 100) + " €"
    cloneAdd.getElementById("blog__order__id").textContent = confirmDatas.orderId
    document.getElementById("sectionTemplate").appendChild(cloneAdd)
}