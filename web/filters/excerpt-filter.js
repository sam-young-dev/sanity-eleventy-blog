module.exports = function (post) {
  const content = post.replace(/(<([^>]+)>)/gi, "");
  return content.substr(0, content.lastIndexOf(" ", 200)) + "...";

  // return content.substr(0, 100) + '...';
}