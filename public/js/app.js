const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "Loading ...";

  fetch(`http://localhost:3000/weathers?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      messageOne.textContent = data.address;
      messageTwo.textContent = data.forecast;
    })
    .catch((err) => {
      messageOne.textContent = err;
    });
});
