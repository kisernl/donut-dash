import { addTime } from "./timer";

let nextCheckpoint = 10; // The first checkpoint is at lane 10
let checkpointIncrement = 5; // Additional lanes needed for each subsequent checkpoint

export function checkpointAdd(currentLane) {
  if (currentLane >= nextCheckpoint) {
    addTime(5); // Add 5 seconds to the timer
    console.log(`Checkpoint reached at lane ${currentLane}!`);
    checkpointIncrement += 5;

    // Update the next checkpoint
    nextCheckpoint = currentLane + checkpointIncrement;

    console.log(
      `Next checkpoint will be at lane ${nextCheckpoint}. Increment: ${checkpointIncrement}`
    );
  }
}
