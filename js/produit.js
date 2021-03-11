(async function() {
    const meubleId = await getMeubleId()// Chercher l'identifation avec get depuis l'URL
    const meubleData = await getMeubleData(meubleId) //request API avec l'argument meubleId pour ne chercher qu'une seule API car il y a ID
    afficherMeuble(meubleData)
})()