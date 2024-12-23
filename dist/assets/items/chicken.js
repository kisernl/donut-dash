import * as THREE from "three";
import { characterSize, zoom } from "../constants.js";

export function Chicken() {
  const chicken = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(
      characterSize * zoom,
      characterSize * zoom,
      20 * zoom
    ),
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })
  );
  body.position.z = 10 * zoom;
  body.castShadow = true;
  body.receiveShadow = true;
  chicken.add(body);

  const rowel = new THREE.Mesh(
    new THREE.BoxGeometry(2 * zoom, 4 * zoom, 2 * zoom),
    new THREE.MeshLambertMaterial({ color: 0xf0619a, flatShading: true })
  );
  rowel.position.z = 21 * zoom;
  rowel.castShadow = true;
  rowel.receiveShadow = false;
  chicken.add(rowel);

  return chicken;
}

export const chicken = new Chicken();
