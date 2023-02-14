const { hash } = window.location;
const message = atob(hash.replace("#", ""));
if (message) {
  document.querySelector("#third").classList.remove("hide");
  document.querySelector("#first").classList.add("hide");
  document.querySelector("#second").classList.add("hide");
  document.querySelector("h1").innerHTML = message;
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("input");
  //   console.log();
  document.querySelector("#first").classList.add("hide");
  document.querySelector("#second").classList.remove("hide");
  const encrypted = btoa(input.value);
  const link = document.querySelector("#linkSelect");
  link.value = `${window.location}#${encrypted}`;
  link.select();
});

// Link to hosted site
// https://secret-message-gamma-six.vercel.app
