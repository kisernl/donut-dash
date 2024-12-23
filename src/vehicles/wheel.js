import * as THREE from "three";
import { zoom } from "../constants.js";

export function Wheel() {
  const wheel = new THREE.Mesh(
    new THREE.BoxGeometry(12 * zoom, 33 * zoom, 12 * zoom),
    new THREE.MeshLambertMaterial({ color: 0x333333, flatShading: true })
  );
  wheel.position.z = 6 * zoom;
  return wheel;
}
