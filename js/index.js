(async function () {
    const articles = await getArticles()
    for ( const article of articles) {
        displayArticles(articles)
    }
})()

function getArticles() {
    return fetch("http://localhost:3000/api/furniture")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(articles) {
            return articles
        })
        .catch(function(error) {
            alert(error)
            document.getElementById("main").textContent = "Error :("
        })
}

function displayArticles(article) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("blog__image").textContent = article.image
    cloneElt.getElementById("blog__title").textContent = article.title
    cloneElt.getElementById("blog__price").textContent = article.price


    document.getElementById("main").appendChild(cloneElt)
}