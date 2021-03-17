(async () => {
    const meubleId = getMeubleId() // Chercher l'identifation avec get depuis l'URL
    const meubleData = await getMeubleData(meubleId)
    displayMeuble(meubleData)
})()

function getMeubleId(){
    // L'extraction de l'ID pour idenitifier quel lien on a cliquer et plus tard pour afficher le bon API (qui se trouve dans ID)
    
    //let params = (new URL(document.location)).searchParams// new pour créer une autre instance qu'on peut retourner plus tard
    //let id = params.get('id')
    
    return (new URL(document.location)).searchParams.get('id')
    //console.log(location)
}

function getMeubleData(meubleId) { // je crée une fetch pour chercher les données l'API et eventuellement l'API avec ID pour n'afficher qu'un seul donnée donc celui qui à le bon ID
    return fetch(`http://localhost:3000/api/furniture/${meubleId}`)// j'imagine que la variable meubleId va injecter l'ID dans l'url donc chercher la bonne Id de l'API
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
    
    // Evenement pour ajouter le produit au panier au moment de clique "ajouter au pannier"
    //document.getElementById('buttonAdd').onclick('click', async (event) => {
        document.getElementById('buttonAdd').addEventListener ('click', async (event) => {
            //addArticleToCharts(event, meubleData)
            //const productsMeuble = await getMeubleProduits()
            //event.stopPropagation()
            event.preventDefault()
            const ajoutMeuble = getAjoutMeuble(meubleData)
            // Une fonction pour aller à la page shopping avec le ID et le nom
        }
    )
}

function getAjoutMeuble(meubleData){
    // Creation du panier, si le panier exist alors c'est bon, si non on donne un message qu'il nexiste pas et on en crée un autre au chargement
    let getUtilisateurPanier = JSON.parse(localStorage.getItem('getUtilisateurPanier') || `{}`)
    console.log(getUtilisateurPanier)
    //return JSON.parse(localStorage.getItem('getUtilisateurPanier')) || []
    /*
    if (localStorage.getItem("utilisateurPanier")) {
        console.log("Le panier existe");
    } else { // le panier n'existe pas, on en créer une
        console.log("Le panier n'existe");
        let panierInit = []; // panier qui s'initialise à 0 donc dynamique 
        localStorage.setItem("utilisateurPanier", JSON.stringify(panierInit)); // On crée un pannier
    }*/

    //lire les valeurs dans le localStorage; settLocalStorage
    /*let meubleData = []
    let setUtilisateurPanier = localStorage.setItem("getUtilisateurPanier", JSON.stringify(meubleData))
    console.log(setUtilisateurPanier)*/

    //let meubleInit = []
    let meubleInit = [meubleData]

    let setUtilisateurPanier = localStorage.setItem("getUtilisateurPanier", JSON.stringify(meubleInit))
    console.log(setUtilisateurPanier)

    
}


/*
function getMeubleProduits () {
    // Creation du panier, si le panier exist alors c'est bon, si non on donne un message qu'il nexiste pas et on en crée un autre
    
    if (localStorage.getItem("utilisateurPanier")) {
        console.log("Le panier existe");
    } else { // le panier n'existe pas, on en créer une
        console.log("Le panier n'existe");
        let panierInit = []; // panier qui s'initialise à 0 donc dynamique 
        localStorage.setItem("utilisateurPanier", JSON.stringify(panierInit)); // On crée un pannier
    }

    //tableau et objet demandé par l'API pour la commande

    let contact 
    let productsMeuble = []

    let utilisateurPanier = JSON.parse(localStorage.getItem('utilisateurPanier')) || []

    //ajouter les produits dans le panier

    utilisateurPanier.push(productsMeuble)
    localStorage.setItem("utilisateurPanier", JSON.stringify(utilisateurPanier))
    console.log("Le produit a été ajouté au panier")

    // Creation une fonction si le produit 
} */