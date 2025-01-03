import { initializeValues, animate, move, restartGame } from "./gamePlay.js";
import { modal } from "./modal.js";
import { renderer } from "./renderer.js";
import { startCountdown } from "./timer.js";

modal;

initializeValues();

document.body.appendChild(renderer.domElement);

// first iteration for starting timer below
// document.addEventListener("DOMContentLoaded", startCountdown);

// second iteration for starting timer
// document.addEventListener("keydown", startCountdown);

// updated to prevent timer starting from pressing enter to close modal
document.addEventListener("keydown", (event) => {
  const allowedKeys = ["ArrowUp", "ArrowRight", "ArrowLeft"];
  if (allowedKeys.includes(event.key)) {
    startCountdown();
  }
});

const controls = document.querySelectorAll(".arrow-btn");
controls.forEach((button) => {
  button.addEventListener("click", () => startCountdown(controls));
});

// document.querySelector("#retry").addEventListener("click", () => {
//   counterDOM.innerHTML = "0";
//   lanes.forEach((lane) => scene.remove(lane.mesh));
//   initializeValues();
//   endDOM.style.visibility = "hidden";
// });
restartGame();

document
  .getElementById("forward")
  .addEventListener("click", () => move("forward"));
document
  .getElementById("backward")
  .addEventListener("click", () => move("backward"));
document.getElementById("left").addEventListener("click", () => move("left"));
document.getElementById("right").addEventListener("click", () => move("right"));

window.addEventListener("keydown", (event) => {
  // arrow keys on keyboard
  if (event.keyCode == "38") {
    move("forward");
  } else if (event.keyCode == "40") {
    move("backward");
  } else if (event.keyCode == "37") {
    move("left");
  } else if (event.keyCode == "39") {
    move("right");
  }
});

requestAnimationFrame(animate);
