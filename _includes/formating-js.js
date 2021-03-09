fetch("http://sunmon.github.io/", {
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
    // return response.text();
  })
  .then(function (myJson) {
    console.log(myJson);
    // console.log(JSON.stringify(myJson));
  });
