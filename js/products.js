(async () => {
    const meubleId = getMeubleId() // Chercher l'identifation avec get depuis l'URL
    const meubleData = await getMeubleData(meubleId)
    displayMeuble(meubleData)
    
    if (document.readyState == 'loading') { //Une fois que la page se télécharge le bouton va être pret aant les autres car si les boutons fonctionne après les autres, cela peut apporter des prpblèmes aux utilisateurs
        document.addEventListener('DOMContentLoaded', ready)
    } else {
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

    for (let i = 0; i < meubleData.varnish.length; i++) {
        const varnish = meubleData.varnish[i];
        document.getElementById("selectOption").innerHTML += 
        `
        <option value="`+ varnish +`">`+ varnish +`</option>
        `
        // On peut faire ${meubleData.varnish[0]}
    }
}

function ready(meubleData) {
    // Evenement pour ajouter le produit au panier au moment de clique "ajouter au pannier"
    const buttonAjout = document.getElementById('buttonAdd')
    buttonAjout.addEventListener('click', (event) => {
        event.preventDefault()
        //let ajoutMeuble = await getAjoutMeuble(meubleData, event)
        getAjoutMeuble(meubleData)
        goToRedirectionToPanier(meubleData.name)
        console.log(pageSuivantProduitName)
        // Une fonction pour aller à la page shopping avec le ID et le nom
    })
    //ici pour input value pour dire aux utilisateurs que l'utilisateur ne peut choisir au moins 1 produit et non negative ou autre choses que le nombre
    let quantityInput = document.getElementById('quantity')
    quantityInput.addEventListener("change", quantityChanged)
}

function quantityChanged(event) { //Lier l'input value au bouton pour dire si on choisi l'input plus de un alors si on clique le bouton ajouter le panier, il va avoir 2 produits qui va se mettre au localStorage et le prix se mutiplie en rapport avec le nombre choisi sur l'input value
    let input = event.target
    let quantity = parseInt(input.value)
    // si l'utilisateur choisi un nombre 0 ou moins ou pas un nombre alors le nombre va automatiquement revenir à 1, et si l'utilisateur choisi le nombre plus de 100 alors le chiffre va revenir à 100
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1
    } else if (quantity > 100) {
        quantity = 100
    }
    console.log(quantity)

    input.value = quantity //Une fois la quantité validé, on l'as reinjecte dans l'input value

    return quantity
}

function getAjoutMeuble(meubleData) {
    if (localStorage.getItem("userPanier")) {
        console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
    } else {
        console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
        //Le panier est un tableau de produits
        let panierInit = [];
        localStorage.setItem("userPanier", JSON.stringify(panierInit));
    };

    //L'user a maintenant un panier
    let userPanier = JSON.parse(localStorage.getItem("userPanier"))
    console.log(userPanier)
    let panierVide = '[]'
    console.log(panierVide)

    let quantityElement = document.getElementById('quantity').value // On récupère la quantité de value input
    let quantityElementParsed = parseInt(quantityElement)
    console.log(quantityElementParsed)

    const structMeuble = // toutes les données pusher dans le localStorage, je les garde ici
    {
        name:meubleData.name,
        id:meubleData._id,
        quantity:quantityElementParsed,
        color:document.getElementById("selectOption").value,
        price:meubleData.price,
        imageUrl:meubleData.imageUrl
    }

    let produitFiltre = userPanier.filter(meuble => meuble.id === structMeuble.id && meuble.color === structMeuble.color)
    //si le localStorage est vide on envoie rien
    console.log(produitFiltre)
    if(!userPanier)
    {
        panierVide.push(panierVide)
    }
    else// si il n'y a rien dans le panier, on envoie toutes les données
    {
        if(produitFiltre.length === 0){
            userPanier.push(structMeuble)
        }
        else// si le produit est déjà existant et on envoie une autre produit avec le même id et couleur alors on ne multiplie pas une autre row du même element mais on ajoute la quantité
        {   
            userPanier.find(element => { // si on choisit 5 quanitité, dans la page panier nous rotourne 25 comme si c'est 5 inout * 5 produits. ON peut ajouter
            if(element === produitFiltre[0]){
                element.quantity += structMeuble.quantity
            }
            })
        }
    }

    localStorage.setItem("userPanier", JSON.stringify(userPanier))
    console.log("Administration : le produit a été ajouté au panier")
    console.log(userPanier) /*L'user a maintenant un panier*/
}

function goToRedirectionToPanier(meubleDataNname){
    window.location.href = `${window.location.origin}/panier.html?dernierProduitAjouter:=${meubleDataNname}`
}