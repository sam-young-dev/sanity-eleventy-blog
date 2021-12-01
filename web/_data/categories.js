const groq = require("groq");
const client = require("../utils/sanityClient.js");
const overlayDrafts = require("../utils/overlayDrafts");

const hasToken = !!client.config().token;

function generateCategory(category) {
  return {
    ...category,
  };
}

async function getCategories() {
  const filter = groq`*[_type == "category"]`;
  const projection = groq`{
    // grab category data
    ...,
    // grab posts that reference category id
   "posts": *[_type == "post" && references(^._id)]{
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "categories": categories[]{
        "title": ^->title,
        "slug": ^->slug.current
      }
    }
  }`;
  const query = [filter, projection].join(" ");
  const docs = await client.fetch(query).catch((err) => console.error(err));
  const categories = docs.map(generateCategory);
  const reducedCategories = overlayDrafts(hasToken, categories);

  console.log(reducedCategories);
  return reducedCategories;
}

module.exports = getCategories;
