module.exports = value => {
  return '$' + (value / 100).toFixed(2);
}