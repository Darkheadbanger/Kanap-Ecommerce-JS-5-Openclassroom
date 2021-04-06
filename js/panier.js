(() => {
    let cliqueLocalStorageData = getCliqueLocalStorageData()
    displayData(cliqueLocalStorageData)
    updateTotalPrice(cliqueLocalStorageData)
    checkForm()

    if (document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready(cliqueLocalStorageData)
    }
})()

function ready(cliqueLocalStorageData) {
    document.addEventListener("DOMContentLoaded", () => {
        let removeCartItemButtons = document.getElementsByClassName("danger-btn") //On récupère la classe button, j'utilie getElementByClassName au lieu de ById car ID est unique donc 1 fois alors j'aimerais plus tard pouvoir effacer plusieurs achats.
        console.log(removeCartItemButtons)
        for (let i = 0; i < removeCartItemButtons.length; i++) { // On boucle tous les buttons à l'interieur de la carte, donc on peut effacer ce qui se trouve dans la carte column
            let button = removeCartItemButtons[i]
            button.addEventListener("click", (e) => {
                //e.data=i
                effacerElementCart(e)
                panierVide(cliqueLocalStorageData)// pour afficher un message "panier vide" si le panier est egal à 
                // pour afficher un message "panier vide" si le panier est egal à 
           })// l'event à un property target qui va permetttre de remonter à tous les elements pour les effacer
        }
    
    })
    document.addEventListener("DOMContentLoaded", () => {// à chaque fois que la page se télécharge
        let formId = document.getElementById("formId")
        formId.addEventListener("submit", (event) => {
            event.preventDefault()
            confirmData(cliqueLocalStorageData)
            goToConfirmationPage()
        })
    })
}

function effacerElementCart(event) {
    let buttonEffacer = event.target // tous les buttons qu'on clique, on peut effacer
    effacerLogique(event)
    setTimeout(() => {
        buttonEffacer.remove()//
    },300)
}

function effacerLogique(event) {
    let donnéeEffacer = event.data // declencheur de l'évenement
    console.log(donnéeEffacer)
    let localStorageData = getCliqueLocalStorageData() // la function de récuperation de données button "ajouter au panier"
    localStorageData.splice(donnéeEffacer, 1)
    localStorage.setItem("userPanier", JSON.stringify(localStorageData))
    window.location.reload()
}

function panierVide(cliqueLocalStorageData){// function pour dire si le panier est vide (=== 0) alors on montre un message "panier est vide" si non (differents de 0 ou !== 0) alors on montre la commande
    /*let messageVide = event.target
    console.log(messageVide)*/
    /* à chaque fois que le produit est effacer, il verifie la taille du panier est egale à 0, si c'est egale à 0 on affiche un text content "panier est vide".
    Cette div est en display none, et passe en display block à ce moment là/
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const showHidden = cliqueLocalStorageData[i];
        if(showHidden === 0){
            let none = document.getElementById("container-achat").style.display = "none"
            console.log(none)
            document.getElementById("container__tout").innerHTML =
            `
            <div class="jumbotron jumbotron-fluid bg-success">
                <div class="container">
                <p class="lead">Votre panier est vide, retournez à l'accueil!</p>
                </div>
            </div>
            `
        }else{// if(hiddenShowProducts !== 0)
            let block = document.getElementById("container__tout").style.display = "block"
            console.log(block)
        }    
    }*/
}

function updateTotalPrice(cliqueLocalStorageData){ //le parametre cliqueLocalStorageData est le variable d'une fonction qui permet de récuperer les données du localStorage
    let total = 0
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {// Ici, je récupère le prix et la quantité input directeent du localstorage et je multiplie les deux pour avoir le résultat
        const element = cliqueLocalStorageData[i];
        let elementQuantity = element.quantity
        let elementPrix = element.price / 100
        total = total + (elementQuantity * elementPrix)
        document.getElementById("prix__total").textContent = total + " €"
    }
}

function getCliqueLocalStorageData(){

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

function confirmData(cliqueLocalStorageData){ // pour envoyer à la page de confirmation, le paramètre est une copie de la fonction qui appelle (setItem) le localStorage du produit 
    //event.preventDefault()
    //let confirmMeubleData = getCliqueLocalStorageData()
    let getLocalStorageToConfirm = getCliqueLocalStorageData()
    const arrayForm = '[]'

    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const element = cliqueLocalStorageData[i];

        const formArrayConfirm = { // toutes les données que je vais pusheer à la page confirmation je les gardes ici
            leId:element.id,
            lePrice:element.price,
            leName: document.getElementById("name").value,
        }
        console.log(arrayForm)
        console.log(formArrayConfirm)
        
        if(formArrayConfirm){
            let arraySend = getLocalStorageToConfirm.push(formArrayConfirm)
            console.log(arraySend)
        }else{
            let array = arrayForm.push(arrayForm)
            console.log(array)
        }
    }
}

function displayData(cliqueLocalStorageData) { // ici pour clonner le produit dans le panier
    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const localStorageClick = cliqueLocalStorageData[i];
        const templateAdd = document.querySelector(".templateAdd")
        const cloneAdd = document.importNode(templateAdd.content, true)
        cloneAdd.getElementById("blog__color").textContent = localStorageClick.color
        cloneAdd.getElementById("blog__image").src = localStorageClick.imageUrl
        cloneAdd.getElementById("blog__quantity").textContent = localStorageClick.quantity
        cloneAdd.getElementById("price__blog").textContent = localStorageClick.price / 100 + " €"
        cloneAdd.getElementById("blog__title").textContent = localStorageClick.name
        document.getElementById("productsAddCenter").appendChild(cloneAdd)
    }
}

function checkForm(){
    // Ici, on va comparer le regex et ce que l'utilisateur écris sur le formulaire

    //Regex
    let stringTest = new RegExp("^[a-zA-Z]")
    let numberTest = new RegExp('^[0-9]+$')
    //ici, test de mail
    let emailTest = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let specialCharTest = /[$-/:-?{-~!"^_`\[\]]/

    //message pour dire si le formulaire ne corresponds pas 
    let messageTest = ""

    //Recuperation de chaque form
    let formNom = document.getElementById("name").value
    let formAdresse = document.getElementById("adresse").value
    let formCodePostal = document.getElementById("codePostal").value
    let formVille = document.getElementById("ville").value
    let formMail = document.getElementById("email").value

    //une condition pour dire si chaque form est juste et on ne rentre pas n'importe quoi
    // nom, interdiction de nomnbre et de characteres spéciaux
    if(specialCharTest.test(formNom) == true || numberTest.test(formNom) || formNom == ""){
        messageTest = "Vérifiez/renseigner votre nom"
    }else{
        console.log("Le nom/prenom est OK")
    }
    //Check adresse si c'est ok et pas de numéro spéciale
    if(specialCharTest.test(formAdresse) == true || formAdresse == ""){
        messageTest = "Verifier votre adresse"
    }else{
        console.log("L'adresse est OK") 
    }
    //check adresse postale, uniquement le nombre
    if(specialCharTest.test(formCodePostal) == true || stringTest.test(formCodePostal) == true || emailTest.test(formCodePostal) == true || formCodePostal == ""){
        messageTest = "verifiez votre code postale"
    }else{
        console.log("Le code postale est ok")
    }
    //check la ville
    if(specialCharTest.test(formVille) == true || emailTest.test(formVille) == true || numberTest.test(formVille) == true || formVille == ""){
        messageTest = "Verfiez votre ville"
    }else{
        console.log("La ville est ok")
    }
    //check email
    if(stringTest.test(formMail) == true || numberTest.test(formMail) || specialCharTest.test(formMail) == true || formail == ""){
        messageTest = "Berifiez votre mail!"
    }else{
        console.log("Mail OK")
    }
}

function goToConfirmationPage(){
    //window.location.href = `${window.location.origin}/panier.html?confirmation.html`

}

function prepareFormData(){
    let formNom = document.getElementById("name").value

    let postData = {
        contact: {
           firstName: "",
           lastName: formNom,
           address: "",
          city:"" ,
           email:""
       },

        products: []//ajout Id des tous les produits
    }
}