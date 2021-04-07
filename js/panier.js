(() => {
    let cliqueLocalStorageData = getCliqueLocalStorageData()
    displayData(cliqueLocalStorageData)
    updateTotalPrice(cliqueLocalStorageData)
    checkForm()
    console.log(checkForm)

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
        let formId = document.getElementById("formId")
        formId.addEventListener("submit", (event) => {
            //event.preventDefault()
            confirmData(cliqueLocalStorageData)
            goToConfirmationPage()
            checkForm()
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
    //checkForm()// recuperation du fonction checkForm et ses variables
    let getLocalStorageToConfirm = getCliqueLocalStorageData()
    const arrayForm = '[]'
    let formNom = document.getElementById("name").value
    let formPrenom = document.getElementById("Prenom").value
    let formAdresse = document.getElementById("adresse").value
    let formVille = document.getElementById("ville").value
    let formMail = document.getElementById("email").value


    for (let i = 0; i < cliqueLocalStorageData.length; i++) {
        const element = cliqueLocalStorageData[i];
        /*
        const formArrayConfirm = { // toutes les données que je vais pusheer à la page confirmation je les gardes ici
            leId:element.id,
        }
        console.log(arrayForm)
        console.log(formArrayConfirm)
        */

        let postData = {
            contact: {
            firstName: formPrenom,
            lastName: formNom,
            address: formAdresse,
            city:formVille,
            email:formMail
           },
    
            products: [element.id]//ajout Id des tous les produits
        }

        console.log(postData)
        /*
        if(formArrayConfirm){
            let arraySend = getLocalStorageToConfirm.push(formArrayConfirm)
            console.log(arraySend)
        }else{
            let array = arrayForm.push(arrayForm)
            console.log(array)
        }*/
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
    const stringTest = /[a-zA-Z]/
    console.log(stringTest)
    const numberTest = /[0-9]/
    console.log(numberTest)
    //ici, test de mail
    const emailTest = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    console.log(emailTest)
    const specialCharTest = /[$-/:-?{-~!"^_`\[\]]/
    console.log(specialCharTest)
    //message pour dire si le formulaire ne corresponds pas 
    let messageTest = []
    //Recuperation de chaque form
    let formNom = document.getElementById("name").value.trim()//La méthode trim() permet de retirer les blancs en début et fin de chaîne
    console.log(formNom)
    let formPrenom = document.getElementById("Prenom").value.trim()
    let formAdresse = document.getElementById("adresse").value.trim()
    let formVille = document.getElementById("ville").value.trim()
    let formMail = document.getElementById("email").value.trim()

    //valid and invalid nom
    const validNom = document.querySelector(".validNom")
    const invalidNom = document.querySelector(".invalidNom")
    console.log(validNom, invalidNom)
    //valid and invalid preom
    const validPrenom = document.querySelector(".validPrenom")
    const invalidPrenom = document.querySelector(".invalidPrenom")
    console.log(validPrenom, invalidPrenom)
    //valid and invalid Nom
    const validAdresse = document.querySelector(".validAdresse")
    const invalidAdresse = document.querySelector(".invalidAdresse")
    console.log(validAdresse, invalidAdresse)
    //valid and invalid Nom
    const validVille = document.querySelector(".validVille")
    const invalidVille = document.querySelector(".invalidVille")
    console.log(validVille, invalidVille)
    //valid and invalid Nom
    const validMail = document.querySelector(".validMail")
    const invalidMail = document.querySelector(".invalidMail")
    console.log(validMail, invalidMail)

    if(stringTest.test(formNom) === false){
        //messageTest = messageTest + "\n" + "Vérifiez/renseigner votre nom"
        invalidNom.textContent = messageTest + "\n" + "Vérifiez/renseigner votre nom"
    }else{
        //if(numberTest.test(formPrenom) == true || emailTest.test(formPrenom) == true || specialCharTest.test(formPrenom) == true || messageTest == "")
        //validNom.textContent = messageTest + "\n" + "Le nom est ok"
        console.log("Le nom est OK")
    }

    if(stringTest.test(formPrenom) === false){
        //messageTest = messageTest + "\n" + "Vérifiez/renseigner votre nom"
        invalidPrenom.textContent = messageTest + "\n" + "Vérifiez/renseigner votre prénom"
    }else{
        console.log("Le prenom est OK")
    }
    
    //Check adresse si c'est ok et pas de numéro spéciale
    if(specialCharTest.test(formAdresse) == true || emailTest.test(formAdresse) === false || messageTest === ""){
        invalidAdresse.textContent = messageTest + "\n" + "Vérifiez/renseigner votre adresse"
    }else{
        console.log("L'adresse est OK") 
    }
    //check la ville
    if(specialCharTest.test(formVille) == true || emailTest.test(formVille) == true || numberTest.test(formVille) == true || formVille == ""){
        invalidVille.textContent = messageTest + "\n" + "Vérifiez/renseigner votre ville"
    }else{
        console.log("La ville est ok")
    }
    //check email
    if(emailTest.test(formMail) == false){
        invalidMail.textContent = messageTest + "\n" + "Vérifiez/renseigner votre email"
    }else{
        console.log("La mail est ok")
        
    }
    
    // si l'un de ces champs n'est pas bon; on montre le message d'alert plus la raison
    if(messageTest != ""){
        alert("il est necessaire de " + "\n" + messageTest)
    }
}

function goToConfirmationPage(){
    window.location.href = `${window.location.origin}/panier.html?confirmation.html`
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