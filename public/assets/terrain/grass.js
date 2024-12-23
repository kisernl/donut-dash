import * as THREE from "three";
import { boardWidth, positionWidth, zoom } from "../constants.js";

export function Grass() {
  const grass = new THREE.Group();
  const createSection = (color) =>
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        boardWidth * zoom,
        positionWidth * zoom,
        3 * zoom
      ),
      new THREE.MeshPhongMaterial({ color })
    );

  const middle = createSection(0xbaf455);
  middle.receiveShadow = true;
  grass.add(middle);

  const left = createSection(0x99c846);
  left.receiveShadow = true;
  grass.add(left);

  const right = createSection(0x99c846);
  right.receiveShadow = true;
  grass.add(right);

  grass.position.z = 1.5 * zoom;
  return grass;
}
