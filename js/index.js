(async function () {
    const meubles = await getMeubles();
    for(const meuble of meubles) {
        displayMeubles()
    }
})

function getMeubles() {
    return fetch("http://localhost:3000/api/furniture")
        .then(function(response) {
            /*
            let myVarr = JSON.parse(this.response)
            response.myVarr()*/
            response.json()
        })
        
        .then(function(meubles) {
            return meubles
        })
        .catch(function(error) {
            alert(error)
            document.getElementById('main').textContent = "Error :("
        })
}


function displayMeubles(meuble) {
    const templateELT = document.getElementById('templateMeuble')
    const cloneELT = document.importNode(templateELT,contentEditable, true)

    cloneELT.document.getElementById('blog__image').textContent = meuble.imageurl
    cloneELT.document.getElementById('blog__title').textContent = meuble.name
    cloneELT.document.getElementById('blog__price').textContent = meuble.price

    document.getElementById("main").appendChild(cloneELT)
}

/*
function displayMeubles(meuble){
    document.getElementById("templateArticle").innerHTML += `
    <div class="row">
    <div class="col-12 col-lg-4 mx-lg-6 mt-lg-5 mt-3">
      <div class="card mb-4 mb-lg-0 border-primary shadow-lg rounded">
        <!--<template id="template">-->
          <article class="card-body">
            <img id="image" src=""/>
            <h2 class="h4" id="blog__title"></h2>
            <div class="d-flex justify-content-between">
              <p class="h5" id="blog__price"></p>
              <div class="d-flex justify-content-start">
                <a href="produit.html" class="btn btn-wood stretched-link">Voir le détail du produit</a>
              </div>
            </div>
          </article>  
        <!--</template>-->
      </div>
    </div>
  </div> 
*/