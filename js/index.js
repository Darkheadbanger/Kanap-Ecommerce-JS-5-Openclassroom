(async function() {
  const meubles = await getMeubles()
  for (meuble of meubles) {
    displayMeuble(meuble)
  }
})()


function getMeubles() {
  return fetch("http://localhost:3000/api/furniture")
    .then((responseHttp) => responseHttp.json())
    .then((meubles) => meubles)
    .catch((error) => {
        alert(error)
      })
}



function displayMeuble(meuble) {
  const templateElt = document.getElementById("templateArticle")
  const cloneElt = document.importNode(templateElt.content, true)

  cloneElt.getElementById("blog__image").src = meuble.imageUrl
  cloneElt.getElementById("blog__title").textContent = meuble.name
  cloneElt.getElementById("blog__body").textContent = meuble.price

  document.getElementById("main").appendChild(cloneElt)
}