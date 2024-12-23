import {
  positionWidth,
  zoom,
  laneTypes,
  columns,
  boardWidth,
  laneSpeeds,
  stepTime,
  characterSize,
} from "./constants";
import { Grass } from "./terrain/grass";
import { scene } from "./scene";
import { Tree } from "./items/tree";
import { Road } from "./terrain/road";
import { Truck } from "./vehicles/truck";
import { Car } from "./vehicles/car";
// import { chicken as character } from "./items/chicken";
import { donut as character } from "./items/donut";
// import { ghost as character } from "./items/ghost";
import {
  camera,
  initialCameraPositionY,
  initialCameraPositionX,
} from "./camera";
import {
  dirLight,
  initialDirLightPositionX,
  initialDirLightPositionY,
} from "./light";
import { renderer } from "./renderer";

export const counterDOM = document.getElementById("counter");
export const endDOM = document.getElementById("end");
import { addTime, timesUp } from "./timer";
import { checkpointAdd } from "./checkpoint";

let lanes;
let currentLane;
let currentColumn;
let previousTimestamp;
let startMoving;
let moves;
let stepStartTimestamp;

export const generateLanes = () =>
  [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((index) => {
      const lane = new Lane(index);
      lane.mesh.position.y = index * positionWidth * zoom;
      scene.add(lane.mesh);
      return lane;
    })
    .filter((lane) => lane.index >= 0);

export const addLane = () => {
  const index = lanes.length;
  const lane = new Lane(index);
  lane.mesh.position.y = index * positionWidth * zoom;
  scene.add(lane.mesh);
  lanes.push(lane);
};

export function Lane(index) {
  this.index = index;
  this.type =
    index <= 0
      ? "field"
      : laneTypes[Math.floor(Math.random() * laneTypes.length)];

  switch (this.type) {
    case "field": {
      this.type = "field";
      this.mesh = new Grass();
      break;
    }
    case "forest": {
      this.mesh = new Grass();
      this.occupiedPositions = new Set();
      this.trees = [1, 2, 3, 4].map(() => {
        const tree = new Tree();
        let position;
        do {
          position = Math.floor(Math.random() * columns);
        } while (this.occupiedPositions.has(position));
        this.occupiedPositions.add(position);
        tree.position.x =
          (position * positionWidth + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        this.mesh.add(tree);
        return tree;
      });
      break;
    }
    case "car": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;
      const occupiedPositions = new Set();
      this.vehicles = [1, 2, 3].map(() => {
        const vehicle = new Car();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 2);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vehicle.position.x =
          (position * positionWidth * 2 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vehicle.rotation.z = Math.PI;
        this.mesh.add(vehicle);
        return vehicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
    case "truck": {
      this.mesh = new Road();
      this.direction = Math.random() >= 0.5;

      const occupiedPositions = new Set();
      this.vehicles = [1, 2].map(() => {
        const vehicle = new Truck();
        let position;
        do {
          position = Math.floor((Math.random() * columns) / 3);
        } while (occupiedPositions.has(position));
        occupiedPositions.add(position);
        vehicle.position.x =
          (position * positionWidth * 3 + positionWidth / 2) * zoom -
          (boardWidth * zoom) / 2;
        if (!this.direction) vehicle.rotation.z = Math.PI;
        4;
        this.mesh.add(vehicle);
        return vehicle;
      });

      this.speed = laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
      break;
    }
  }
}

export const initializeValues = () => {
  lanes = generateLanes();
  currentLane = 0;
  currentColumn = Math.floor(columns / 2);
  previousTimestamp = null;
  startMoving = false;
  moves = [];
  stepStartTimestamp;
  character.position.x = 0;
  character.position.y = 0;
  camera.position.y = initialCameraPositionY;
  camera.position.x = initialCameraPositionX;
  dirLight.position.x = initialDirLightPositionX;
  dirLight.position.y = initialDirLightPositionY;
};

let gameOver = false;
if (timesUp) gameOver = true;

// let checkpointModulus = 5; // Start with 5th lane as the first checkpoint
// let checkpointCount = 0; // To track how many checkpoints you've passed

let checkpointModulus = 5; // Start with 5th lane as the first checkpoint
let checkpointCount = 1; // To track how many checkpoints you've passed

export function animate(timestamp) {
  requestAnimationFrame(animate);

  if (!previousTimestamp) previousTimestamp = timestamp;
  const delta = timestamp - previousTimestamp;
  previousTimestamp = timestamp;

  lanes.forEach((lane) => {
    if (lane.type === "car" || lane.type === "truck") {
      const aBitBeforeTheBeginningOfLane =
        (-boardWidth * zoom) / 2 - positionWidth * 2 * zoom;
      const aBitAfterTheEndOfLane =
        (boardWidth * zoom) / 2 + positionWidth * 2 * zoom;
      lane.vehicles.forEach((vehicle) => {
        if (lane.direction) {
          vehicle.position.x =
            vehicle.position.x < aBitBeforeTheBeginningOfLane
              ? aBitAfterTheEndOfLane
              : (vehicle.position.x -= (lane.speed / 16) * delta);
        } else {
          vehicle.position.x =
            vehicle.position.x > aBitAfterTheEndOfLane
              ? aBitBeforeTheBeginningOfLane
              : (vehicle.position.x += (lane.speed / 16) * delta);
        }
      });
    }
  });

  // Check for checkpoint logic

  checkpointAdd(currentLane);
  // if (currentLane % checkpointModulus === 0 && currentLane !== 0) {
  //   const increaseCheckpoint = () => (checkpointModulus += 10);
  //   checkpointCount++;
  //   increaseCheckpoint;
  //   // checkpointModulus += 5; // Increment checkpointModulus by 5
  //   addTime(5); // Add time logic
  //   console.log(
  //     `Checkpoint ${checkpointCount} reached at lane ${currentLane}. Next checkpoint at ${checkpointModulus}`
  //   );
  // }

  if (!gameOver && !timesUp) {
    if (startMoving) {
      stepStartTimestamp = timestamp;
      startMoving = false;
    }

    if (stepStartTimestamp) {
      const moveDeltaTime = timestamp - stepStartTimestamp;
      const moveDeltaDistance =
        Math.min(moveDeltaTime / stepTime, 1) * positionWidth * zoom;
      const jumpDeltaDistance =
        Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) * 8 * zoom;
      switch (moves[0]) {
        case "forward": {
          const positionY =
            currentLane * positionWidth * zoom + moveDeltaDistance;
          camera.position.y = initialCameraPositionY + positionY;
          dirLight.position.y = initialDirLightPositionY + positionY;
          character.position.y = positionY; // initial position for character is 0

          character.position.z = jumpDeltaDistance;
          break;
        }
        case "backward": {
          const positionY =
            currentLane * positionWidth * zoom - moveDeltaDistance;
          camera.position.y = initialCameraPositionY + positionY;
          dirLight.position.y = initialDirLightPositionY + positionY;
          character.position.y = positionY; // initial position for character is 0

          character.position.z = jumpDeltaDistance;
          break;
        }
        case "left": {
          const positionX =
            (currentColumn * positionWidth + positionWidth / 2) * zoom -
            (boardWidth * zoom) / 2 -
            moveDeltaDistance;
          camera.position.x = initialCameraPositionX + positionX;
          dirLight.position.x = initialDirLightPositionX + positionX;
          character.position.x = positionX; // initial character position set to 0
          character.position.z = jumpDeltaDistance;
          break;
        }
        case "right": {
          const positionX =
            (currentColumn * positionWidth + positionWidth / 2) * zoom -
            (boardWidth * zoom) / 2 +
            moveDeltaDistance;
          camera.position.x = initialCameraPositionX + positionX;
          dirLight.position.x = initialDirLightPositionX + positionX;
          character.position.x = positionX; // initial character position set to 0
          character.position.z = jumpDeltaDistance;
          break;
        }
      }
      // after a step is complete/ended
      if (moveDeltaTime > stepTime) {
        switch (moves[0]) {
          case "forward": {
            currentLane++;
            counterDOM.innerHTML = currentLane;
            break;
          }
          case "backward": {
            currentLane--;
            counterDOM.innerHTML = currentLane;
            break;
          }
          case "left": {
            currentColumn--;
            break;
          }
          case "right": {
            currentColumn++;
            break;
          }
        }
        moves.shift();
        // following code restarts counter if more steps are taken otherwise stops stepping
        stepStartTimestamp = moves.length === 0 ? null : timestamp;
      }
    }
  }

  // Hit test below
  if (
    lanes[currentLane].type === "car" ||
    lanes[currentLane].type === "truck"
  ) {
    const characterMinX = character.position.x - (characterSize * zoom) / 2;
    const characterMaxX = character.position.x + (characterSize * zoom) / 2;
    const vehicleLength = { car: 60, truck: 105 }[lanes[currentLane].type];
    lanes[currentLane].vehicles.forEach((vehicle) => {
      const carMinX = vehicle.position.x - (vehicleLength * zoom) / 2;
      const carMaxX = vehicle.position.x + (vehicleLength * zoom) / 2;
      if (characterMaxX > carMinX && characterMinX < carMaxX) {
        gameOver = true;
        endDOM.style.visibility = "visible";
      }
    });
  }
  if (timesUp) {
    gameOver = true;
    endDOM.style.visibility = "visible";
  }

  renderer.render(scene, camera);
}

export function move(direction) {
  const finalPositions = moves.reduce(
    (position, move) => {
      // console.log(`Processing move: ${move}, current position:`, position);
      if (move === "forward")
        return { lane: position.lane + 1, column: position.column };
      if (move === "backward")
        return { lane: position.lane - 1, column: position.column };
      if (move === "left")
        return { lane: position.lane, column: position.column - 1 };
      if (move === "right")
        return { lane: position.lane, column: position.column + 1 };
    },
    { lane: currentLane, column: currentColumn }
  );

  if (direction === "forward") {
    if (
      lanes[finalPositions.lane + 1].type === "forest" &&
      lanes[finalPositions.lane + 1].occupiedPositions.has(
        finalPositions.column
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
    addLane();
  } else if (direction === "backward") {
    if (finalPositions.lane === 0) return;
    if (
      lanes[finalPositions.lane - 1].type === "forest" &&
      lanes[finalPositions.lane - 1].occupiedPositions.has(
        finalPositions.column
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
  } else if (direction === "left") {
    if (finalPositions.column === 0) return;
    if (
      lanes[finalPositions.lane].type === "forest" &&
      lanes[finalPositions.lane].occupiedPositions.has(
        finalPositions.column - 1
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
  } else if (direction === "right") {
    if (finalPositions.column === columns - 1) return;
    if (
      lanes[finalPositions.lane].type === "forest" &&
      lanes[finalPositions.lane].occupiedPositions.has(
        finalPositions.column + 1
      )
    )
      return;
    if (!stepStartTimestamp) startMoving = true;
  }

  // Check if the player has reached a checkpoint (when moving forward)
  // let checkpointModulus = 5; // Start with 5th lane as the first checkpoint
  // let checkpointCount = 0; // To track how many checkpoints you've passed
  // console.log("before: ", checkpointModulus);

  // if (
  //   direction === "forward" &&
  //   finalPositions.lane % checkpointModulus === 0 &&
  //   finalPositions.lane !== 0
  // ) {
  //   checkpointCount++; // Increment checkpoint count
  //   checkpointModulus += 5; // Increase modulus for next checkpoint
  //   addTime(5);
  //   console.log(
  //     `Checkpoint ${checkpointCount} reached at lane ${finalPositions.lane}! Next checkpoint at lane multiple of ${checkpointModulus}`
  //   );
  // }

  // console.log("after: ", checkpointModulus);

  moves.push(direction);
}

export const restartGame = document
  .querySelector("#retry")
  .addEventListener("click", () => {
    window.location.reload(); // this was simplest method to reset game
    // counterDOM.innerHTML = "0";
    // lanes.forEach((lane) => scene.remove(lane.mesh));
    // initializeValues();
    // gameOver = false;
    // endDOM.style.visibility = "hidden";
  });
