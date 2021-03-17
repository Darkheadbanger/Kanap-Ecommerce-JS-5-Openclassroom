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
            inputNumberMeuble(ajoutMeuble)
            // Une fonction pour aller à la page shopping avec le ID et le nom
        }
    )
}

function getAjoutMeuble(meubleData) {
    // Creation du panier, si le panier exist alors c'est bon, si non on donne un message qu'il nexiste pas et on en crée un autre au chargement
    let utilisateurPanier = JSON.parse(localStorage.getItem("utilisateurPanier") || `{}`)
    console.log(utilisateurPanier)

    //Ici pour pouvoir ajouter au tableau via push donc les données d'avant ne disparaissent pas
    utilisateurPanier.push(meubleData)

    //ajouter les produits dans le panier
    localStorage.setItem("utilisateurPanier", JSON.stringify(utilisateurPanier))
    console.log(utilisateurPanier)
    
    

    //si meuble est déjç présent on ajoute +1, si non on met une quantité

    if(utilisateurPanier.length >= 1)
        utilisateurPanier.i++ //Si il y a au moins 1 produit dans le panier on incremente 1, si non on ajoute 1 meuble
    
    return utilisateurPanier
}

function inputNumberMeuble(ajoutMeuble){// Liaison entre input number au ajouter au panier pour que si je choisi la quantité, le prix change 

}