    
    (async function(){
        const meubles = await getMeubles(); // await pour dire on attends que la promesse du fonction getMeubles tenir ses promesses ou echoue ses promesses
        afficherArticles();
    })

    async function getMeubles() { // je crée une fonction qui va chercher l'API du meuble
        return fetch("http://localhost:3000/api/furniture") // je récupère les données API directement dans son URL via HTTPS et puis je retourne tous les fêtch c'est à dire la fonction qui récupère les articles meubles
            .then(function(reponseBodyHttp) { // On atache une fonction qui va executer le corps de HTTP API
                return reponseBodyHttp.json() // on tran,forme en JSON
            })
            .then(function(meubles) {// on reècupère le then d'avant  pour récupèrer les articles dans l'API
                return meubles; 
            })
            .catch(function(error) { // Parfois l'API ne fonctionne donc je cfrée une fonctionne catch pour capturer les erreurs
                alert(error);
            })
    }

    async function afficherArticles() { // pour afficheer l'article 
        document.getElementById("main").innerHTML = '<article class="card mb-4 mb-lg-0 border-primary shadow-lg rounded"> <div class="card-body"> <h5 class="card-title">Devenez diplômé</h5> <p class="card-text">De zéro à héros, obtenez un diplôme en informatique.</p> </div> </article>'
    }

    