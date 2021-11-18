const { DateTime } = require("luxon");
const util = require('util')
const CleanCSS = require("clean-css");
const urlFor = require('./utils/imageUrl');

//Import filters
const longDateFilter = require('./filters/long-date-filter.js');
const mediumDateFilter = require('./filters/medium-date-filter.js');
const shortDateFilter = require('./filters/short-date-filter.js');
const markdownFilter = require('./filters/markdown-filter.js');
const w3DateFilter = require('./filters/w3-date-filter.js');
const currencyFilter = require('./filters/currency-filter.js');

module.exports = function(eleventyConfig) {

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
   });

   eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toDateString()
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('longDateFilter', longDateFilter);
  eleventyConfig.addFilter('mediumDateFilter', mediumDateFilter);
  eleventyConfig.addFilter('shortDateFilter', shortDateFilter);
  eleventyConfig.addFilter('markdownFilter', markdownFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
  eleventyConfig.addFilter('currencyFilter', currencyFilter);

  eleventyConfig.addShortcode('imageUrlFor', (image, width = "400") => {
    return urlFor(image)
      .width(width)
      .auto('format')
  });

  eleventyConfig.addShortcode('croppedUrlFor', (image, width, height) => {
    return urlFor(image)
      .width(width)
      .height(height)
      .auto('format')
  });

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  eleventyConfig.addFilter("markdownify", function(value) {
    const md = new markdownIt(options)
    return md.render(value)
  });

  eleventyConfig.addPassthroughCopy('images');

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}
