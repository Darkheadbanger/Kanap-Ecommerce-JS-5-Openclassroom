main();

    function main() {
        const articles = getArticles(); // on recupere l'article grace a la fonction getArticle
        afficheArticles(articles);// pour afficher les articles
    };

    async function getArticles() { // la fonction getgetTousLesArticles pour recuperer de l'article directmement de l'API
        fetch("http://localhost:3000/api/furniture")// utilisation de fetch pour chercher l'API avec l'url API
            .then(function(httpBodyResponse) { // on attache la fonction qui va s'executer une fois qu'il a récuperer les données
                return httpBodyResponse.json() //on traduit lebody en json
            })
            .then(function(articles) {// on retourne lebody JSON dans le then suivant ici
                console.log(articles)
            });
    }

    async function afficheArticles() { // pour afficheer l'article 
        return ""; 
    }