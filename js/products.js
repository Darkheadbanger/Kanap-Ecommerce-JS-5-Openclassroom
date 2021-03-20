(async () => {
    const meubleId = getMeubleId() // Chercher l'identifation avec get depuis l'URL
    const meubleData = await getMeubleData(meubleId)
    displayMeuble(meubleData)
    buttonAndInput(meubleData)
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
    const price = document.getElementById('blog__price').textContent = meubleData.price / 100 + " €"
    document.getElementById('blog__option0').textContent = meubleData.varnish[0]
    document.getElementById('blog__option1').textContent = meubleData.varnish[1]
    document.getElementById('blog__option2').textContent = meubleData.varnish[2]

    // Evenement pour ajouter le produit au panier au moment de clique "ajouter au pannier"
    //document.getElementById('buttonAdd').onclick('click', async (event) => {
}

function buttonAndInput(meubleData) {
    const buttonAjout = document.getElementById('buttonAdd')
    buttonAjout.addEventListener('click', (event) => {
        //addArticleToCharts(event, meubleData)
        //const productsMeuble = await getMeubleProduits()
        //event.stopPropagation()
        event.preventDefault()
        const ajoutMeuble = getAjoutMeuble(meubleData)
        //getUpadePrice()
        // Une fonction pour aller à la page shopping avec le ID et le nom
    })

    //ici pour input value pour dire aux utilisateurs que l'utilisateur ne peut choisir au moins 1 produit et non negative ou autre choses que le nombre
    let quantityInput = document.getElementById("cart-quantity-input")
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
    }
    input.addEventListener("change", function(event) {
        changeQuantite()
    })
}

function getAjoutMeuble(meubleData) {
    //L'user a maintenant un panier
    let userPanier = JSON.parse(localStorage.getItem("userPanier") || [])

    //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
    userPanier.push(meubleData._id);
    localStorage.setItem("userPanier", JSON.stringify(userPanier))
    console.log("Administration : le produit a été ajouté au panier")
    console.log(userPanier)

    // dire si il y a au moins un meuble alors on incremente d'autres meubles si non on ajoute un meuble dans le panier

    for (let i = 0; i < userPanier.length; i++) { // si on touche le bouton ajouter au panier plus de 1 fois alors on multiplie le prix avec le nombre lui même si non on ne multiplie qu'avec 1
        let meublePanier = userPanier[i];
        const price = document.getElementById('blog__price').innerText = meubleData.price / 100 + " €"
        if (userPanier >= 1) {
            meublePanier.incremente++,
                total = meublePanier * price
        } else {
            total = price * 1
        }
    }
}

/*
function getUpadePrice() { //Lier l'input value au bouton pour dire si on choisi l'input plus de un alors si on clique le bouton ajouter le panier, il va avoir 2 produits qui va se mettre au localStorage et le prix se mutiplie en rapport avec le nombre choisi sur l'input value

}

/* Pour la page order, le bouton enlever, si on clique le bnouton enlever le prix descends
function getMeublePricing(ajoutMeuble) { //la function qui permet de lier select option au prix, c'est a dire si je choisi deux le prix va doubler etc. Si je clique 2 fois, la page panier va doubler de sa quantité
    //let cartContainer = document.getElementsByClassName("cart-container")[0]
    let cartContainer = document.getElementById("cart-container")[0]
    let cartRows = cartContainer.getElementById("cart-rows")
    let totalPrice = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementById("blog__price")
        let quantityElement = cartRow.getElementById("cart-quantity-input")[0]
        let quantity = quantityElement.value
        totalPrice = (priceElement * quantity)    
    }
    document.getElementById("blog__price").innerText = totalPrice
}*/