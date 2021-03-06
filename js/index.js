    
    const reponseJuste=false;

    (async function(){
        const articles = await getArticles();
        afficherArticles();
    })

    async function getArticles() {
        fetch("http://localhost:3000/api/furniture")
            .then(function(reponseBodyHttp) {
                return reponseBodyHttp.json()
            })
            .then(function(articles) {
                console.log(articles);
            })
    }

    async function afficheArticles() { // pour afficheer l'article 
        return ""; 
    }

    