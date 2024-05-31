document.querySelector("#one ul").addEventListener("click", function (e) {
  if (e.target.className == "delete") var p = e.target.parentElement;
  var pp = p.parentElement;
  console.log(p.classList);
  p.classList.add("strike");
  console.log(p.classList);
  setTimeout(() => {
  pp.removeChild(p);
  console.log(p.classList);
  }, 500);
});

function AddEle() {
  var ff = document.forms;
  var f = ff["myform"];

  f.addEventListener("click", (g) => {
    g.preventDefault();
    f.reset();
  });

  var q = document.querySelector('#myform input[type="text"]');

  var main = document.createElement("li");
  var tp = document.createElement("p");
  var tbtn = document.createElement("button");
  var ull = document.getElementById("unlist");

  ull.appendChild(main);
  main.appendChild(tp);
  main.appendChild(tbtn);

  tp.textContent = q.value;
  tbtn.innerHTML = "✔";
  tbtn.className = "delete";
}

// Preloader Misc
addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader-finish");
  const interval = setInterval(() => {
    preloader.remove();
  }, 900);
});
