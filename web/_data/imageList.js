const groq = require('groq')
const client = require('../utils/sanityClient.js')
const overlayDrafts = require('../utils/overlayDrafts')

const hasToken = !!client.config().token

async function getImages () {
  const filter = groq`*[_type == "images"]`
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const reducedImages = overlayDrafts(hasToken, docs)

  // console.log(reducedImages);
  return reducedImages;
}

module.exports = getImages
