import { restartGame } from "./gamePlay";

let timesUp = false;

let timeStarted = false;

export function startCountdown() {
  if (timeStarted) return;
  const timerElement = document.getElementById("timer");
  let timeLeft = 15; // Start time in seconds
  timeStarted = true; // prevents function from running on every keystroke or button click

  function updateTimer() {
    timerElement.textContent = timeLeft; // Update the displayed time
    if (timeLeft <= 0) {
      clearInterval(interval); // Stop the timer
      timerElement.textContent = "Time's up!"; // Optional message when done
      timesUp = true;
    } else {
      timeLeft--; // Decrease timeLeft by 1
    }
  }

  const interval = setInterval(updateTimer, 1000); // Run updateTimer every 1 second
  updateTimer(); // Run once immediately to display initial time
}

export { timesUp };

// Start the countdown when the page loads (added to main js file)
// document.addEventListener("DOMContentLoaded", startCountdown);
