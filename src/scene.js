import * as THREE from "three";
// import { chicken as character } from "./items/chicken";
import { donut as character } from "./items/donut";
// import { ghost as character } from "./items/ghost";
import { hemiLight, dirLight, backLight } from "./light";

export const scene = new THREE.Scene();
scene.add(character);
scene.add(hemiLight);
scene.add(dirLight);
scene.add(backLight);
