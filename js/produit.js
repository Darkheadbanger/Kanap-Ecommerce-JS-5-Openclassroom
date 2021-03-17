const meubleId = (new URL(document.location)).searchParams.get('id')


(async () => {
    const meubleData = await getMeubleData(meubleId)
    displayMeuble(meubleData)
})()


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
    
    /*let to_hide = select[select.selectedIndex]
    if(to_hide === select[meubleData.meubleId["5beaadda1c9d440000a57d98"]]){
        to_hide.setAttribute('hidden', 'hidden')
    }else{
        to_hide.removeAttr("hidden")
    }*/
    
    // Evenement pour ajouter le produit au panier au moment de clique "ajouter au pannier"
    //document.getElementById('buttonAdd').onclick('click', async (event) => {
    document.getElementById('buttonAdd').addEventListener ('click', async (event) => {
        //addArticleToCharts(event, meubleData)
        event.preventDefault()
        let meublesPanier = getAAddToCharts()
        //event.stopPropagation()
    }
)

function getAAddToCharts () {
    // Creation du panier, si le panier exist alors c'est bon, si non on donne un message qu'il nexiste pas et on en crée un autre
    let utilisateurPanier = JSON.parse(localStorage.getItem('utilisateurPanier')) || []

    /*
    if (localStorage.getItem("utilisateurPannier")) {
        console.log("Le panier existe");
    } else { // le panier n'existe pas, on en créer une
        console.log("Le panier n'existe");
        let panierInit = []; // panier qui s'initialise à 0 donc dynamique 
        localStorage.setItem("utilisateurPannier", JSON.stringify(panierInit)); // On crée un pannier
    }*/

    //tableau et objet demandé par l'API pour la commande

    let contact
    let meublesPanier = {id:meubleId}
    //ajouter les produits dans le panier

    utilisateurPanier.push(meublesPanier)
    localStorage.setItem("utilisateurPanier", JSON.stringify(utilisateurPanier))
    console.log("Le produit a été ajouté au panier")

    // Creation une fonction si le produit 
} }