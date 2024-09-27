function capwords(str) {
  return str
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capwords, capitalize };
