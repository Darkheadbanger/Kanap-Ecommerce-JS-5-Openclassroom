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
    document.getElementById('buttonAdd').onclick = (event) => {
        //addArticleToCharts(event, meubleData)
        addArticleToCharts(meubleData, event)
        event.preventDefault()
        //event.stopPropagation()
    }
}

function addArticleToCharts (meubleData, event) {
    // Creation du panier, si le panier exist alors c'est bon, si non on donne un message qu'il nexiste pas et on en crée un autre
    let utilisateurPannier = JSON.parse(localStorage.getItem('utilisateurPanier'))

    if (localStorage.getItem("utilisateurPannier")) {
        console.log("Le panier existe");
    } else { // le panier n'existe pas, on en créer une
        console.log("Le panier n'existe");
        let panierInit = []; // panier qui s'initialise à 0 donc dynamique 
        localStorage.setItem("utilisateurPannier", JSON.stringify(panierInit)); // On crée un pannier
    }

    //ajouter les produits dans le pannier


}

/*
class CartObject {
    get meuble() { // On récupère depuis le format JSON et on pose en format JS
        return JSON.parse(localStorage.getItem("utilisateurPannier"));
    }

    //Ici on utilise le set pour déposer
    set meuble(meubles) {
        localStorage.setItem("utilisateurPannier", JSON.stringify(meubles))
    }

    addMeuble(meubleObject) {
        let meubles = this.meubles
        // Consta le produit deja sur le panier reçois, le meuble id
        const produitDejaSurLePanier = !!meubles[meubleObject.meubleId] //meubleId ou _id
        console.log(addmeuble)
    }

    /*
    creationPannier() {
        if (localStorage.getItem("utilisateurPannier")) {
            console.log("Le panier existe");
        } else { // le panier n'existe pas, on en créer une
            console.log("Le panier n'existe");
            let panierInit = []; // panier qui s'initialise à 0 donc dynamique 
            localStorage.setItem("utilisateurPannier", JSON.stringify(panierInit)); // On crée un pannier
        }
    }
    
}

const Cart = new CartObject ()*/
