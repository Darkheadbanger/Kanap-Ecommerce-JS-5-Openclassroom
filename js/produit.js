(async () => {
    const meubleId = await getMeubleId() // Chercher l'identifation avec get depuis l'URL
    const meubleData = await getMeubleData(meubleId) //request API avec l'argument meubleId pour ne chercher qu'une seule meuble dans l'API car il y a ID
    afficherMeuble(meubleData)
})()

function getMeubleId(){
    //paramsURL
}

function getMeubleData(meubleId){
    return fetch(`http://localhost:3000/api/furniture/${meubleId}`)// meubleId est l'argument qui va apporteer l'id de l'API
        .then(async (response) => {
            response.json()
            })
        //.then(async (meubleData) => meubleData())
        .catch((error) => {
            alert(error) + `Error :(`
        })
}

function afficherMeuble(meubleData) {
    document.getElementById("blog__image").src = meubleData.imageUrl
    document.getElementById("blog__title").textContent = meubleData.name
    document.getElementById("blog__description").textContent = meubleData
    document.getElementById("blog__price").textContent = meubleData //Si le prix est égal à 1 alors le prix reste si le prix est supérieur à 1 alors le prix est multiplier par le nombre si non error
    document.getElementById("blog__choix").textContent = meubleData
    document.getElementById("blog__choix").textContent = meubleData

 } 