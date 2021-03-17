class MeubleObject {
    get meubles() {
        // Creation du panier, si le panier exist alors c'est bon, si non on donne un message qu'il nexiste pas et on en crée un autre au chargement
        let getUtilisateurPanier = JSON.parse(localStorage.getItem('getUtilisateurPanier') || `{}`);
        console.log(getUtilisateurPanier);
    }

    set meubles(meubmesData) {
        //let meubleInit = []
        let meubleInit = [meubleData];

        let setUtilisateurPanier = localStorage.setItem("getUtilisateurPanier", JSON.stringify(meubleInit));
        console.log(setUtilisateurPanier);
    }

    ajouterMeuble(meubleData) {
        let products = this.products

        const meubleDejaAuPanier = !!products[meubleData.meubleId]

        if (meubleDejaAuPanier) {
            //on ajoute la Quanitité
            products[meubleData.meubleId].quantity++ // quantity ++
        }else{ // si le panier est vide donc le meuble n'est pas encore au panier
            products[meubleData.meubleId] = {
                quantity = 1,
                meubleData,
            }
        }
        this.products = products
    }

    getProductQuantity(meubleId) {
        const products = this.products
        return products[meubleId].quantity
    }

    updateProductQuantity(meubleId, quantity) {
        const products = this.products
        products[meubleId].quantity = quantity
        console.log(products)
    }

    getTotalPrice(){
        const products = this.products
        const totalPrice = Object.values(products).reduce((acc, curr) => {
            return acc + (curr.price + curr.quantity) / 100
        }, 0)
        return totalPrice
    }
}

const meubleObj = new MeubleObject()

