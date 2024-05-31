function changePos() {
  let toppos = 0;
  let leftpos = 0;
  let count = 0;
  const urlParams = new URLSearchParams(window.location.search);
  const hardness = parseInt(urlParams.get("level"));

  let delay;

  if (hardness === 1) {
    delay = 2000;
  } else if (hardness === 2) {
    delay = 1000;
  } else if (hardness === 3) {
    delay = 500;
  }
  console.log(delay);

  const interval = setInterval(() => {
    toppos = Math.floor(Math.random() * 1000 + 100);
    leftpos = Math.floor(Math.random() * 1000 + 100);

    document.getElementById("img1").style.top = "" + toppos + "px";
    document.getElementById("img1").style.left = "" + leftpos + "px";

    count++;

    if (count === 100) {
      clearInterval(interval);
    }
  }, delay);
  var points = 0;
  img1.addEventListener("click", () => {
    points++;
    document.querySelector("p").innerHTML = points;
    if (points == 10) {
      window.location.href = "win.html";
    }
  });
}
function startGame(level) {
  window.location.href = "game.html?level=" + level;
}
