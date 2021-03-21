(async () => {
    const meubleId = getMeubleId() // Chercher l'identifation avec get depuis l'URL
    const meubleData = await getMeubleData(meubleId)
    displayMeuble(meubleData)
    //buttonAndInput(meubleData)

    if(document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    }else{
        ready(meubleData)
    }
})()

function getMeubleId() {
    // L'extraction de l'ID pour idenitifier quel lien on a cliquer et plus tard pour afficher le bon API (qui se trouve dans ID)

    //let params = (new URL(document.location)).searchParams// new pour créer une autre instance qu'on peut retourner plus tard
    //let id = params.get('id')

    return (new URL(document.location)).searchParams.get('id')
    //console.log(location)
}

function getMeubleData(meubleId) { // je crée une fetch pour chercher les données l'API et eventuellement l'API avec ID pour n'afficher qu'un seul donnée donc celui qui à le bon ID
    return fetch(`http://localhost:3000/api/furniture/${meubleId}`) // j'imagine que la variable meubleId va injecter l'ID dans l'url donc chercher la bonne Id de l'API
        .then((responseHttp) => responseHttp.json())
        .catch((Error) => {
            alert(Error) + document.getElementById(`Error :(`)
        })
}

function displayMeuble(meubleData) { //j'imagine, Je vais afficher la bonne donnée que l'utilisateur à cliqué, directement modifier le DOM mais pas clonner comme da,ns la page index car il y en a qu'une seule donnée à afficher
    document.getElementById('blog__image').src = meubleData.imageUrl
    document.getElementById('blog__title').textContent = meubleData.name
    document.getElementById('blog__description').textContent = meubleData.description
    document.getElementById('blog__price').textContent = meubleData.price / 100 + " €"
    document.getElementById('blog__option0').textContent = meubleData.varnish[0]
    document.getElementById('blog__option1').textContent = meubleData.varnish[1]
    document.getElementById('blog__option2').textContent = meubleData.varnish[2]
}

function ready(meubleData) {
    // Evenement pour ajouter le produit au panier au moment de clique "ajouter au pannier"
    //document.getElementById('buttonAdd').onclick('click', async (event) => {

    const buttonAjout = document.getElementById('buttonAdd')
    buttonAjout.addEventListener('click', async (event) => {
        //addArticleToCharts(event, meubleData)
        //const productsMeuble = await getMeubleProduits()
        //event.stopPropagation()
        event.preventDefault()
        let ajoutMeuble = await getAjoutMeuble(meubleData, event)

        //getUpdatePrice()
        // Une fonction pour aller à la page shopping avec le ID et le nom

        quantityChanged(event)// Pour que si on choisit l'input value, l'input value et le prix va changer dans la page order
    })

    //ici pour input value pour dire aux utilisateurs que l'utilisateur ne peut choisir au moins 1 produit et non negative ou autre choses que le nombre
    let quantityInput = document.getElementsByClassName("cart-quantity-input")
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener("change", (event) => {
            quantityChanged(event)
        })
    }
}

function getAjoutMeuble(meubleData, event) {

    /*L'utilisateur à besoin d'un panier dans le localStorage de son navigateur
Vérifier si le panier existe dans le localStorage, sinon le créer et l'envoyer dans le localStorage au premier chargement du site quelque soit la page*/

    buttonAjout = event.target

    if(localStorage.getItem("userPanier")){
        console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
    }else{
        console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
          //Le panier est un tableau de produits
          let panierInit = [];
          localStorage.setItem("userPanier", JSON.stringify(panierInit));
      };
    
          //Tableau et objet demandé par l'API pour la commande
          let contact;
          let products = [];
    
        //L'user a maintenant un panier
        let userPanier = JSON.parse(localStorage.getItem("userPanier"));

        userPanier.push(meubleData._id);
        localStorage.setItem("userPanier", JSON.stringify(userPanier))
        console.log("Administration : le produit a été ajouté au panier")
        console.log(userPanier)    /*L'user a maintenant un panier*/

    // dire si il y a au moins un meuble alors on incremente d'autres meubles si non on ajoute un meuble dans le panier
      /*
    for (let i = 0; i < userPanier.length; i++) { // si on touche le bouton ajouter au panier plus de 1 fois alors on multiplie le prix avec le nombre lui même si non on ne multiplie qu'avec 1
        let meublePanier = userPanier[i];
        const price = document.getElementById('blog__price').innerText = meubleData.price / 100 + " €"
        if (userPanier.length >= 1) {
            meublePanier.incremente++,
                total = meublePanier * price
        } else if (userPanier.length === 1) {
            total = price * 1
        }
    }*/
}

function quantityChanged(event) { //Lier l'input value au bouton pour dire si on choisi l'input plus de un alors si on clique le bouton ajouter le panier, il va avoir 2 produits qui va se mettre au localStorage et le prix se mutiplie en rapport avec le nombre choisi sur l'input value
    let input = event.target

    /*let containerAchat = document.getElementById("container-achat")
    let rowAchat = containerAchat.getElementById("row-achat")*/
    let colAchat = document.getElementById("col-achat")
    for (let i = 0; i < colAchat.length; i++) {
        const quantityAchat = colAchat[i];
        let quantityElement = quantityAchat.getElementsByClassName("cart-quantity-input")[0]
        let quantity = quantityElement.value
        if(isNaN(quantity) || quantity <= 0 || quantity > 100) { // Si le nombre n'est pas un chiffre ou le nombre est inférieur à 0 alors l'utilisateur n'as pas le droit de choisir si non il faut minimum 1 meuble
            quantity = 1
        }
    }

    console.log(input)
    console.log(quantity)
    console.log(quantityElement)
    console.log(quantityAchat)
    //getUpdatePrice()// Si on choisit la quantité de l'input le prix va changer en arrière plan et si on clique "ajouter au panier, le prix et la quantité va changer dans la page order"
}