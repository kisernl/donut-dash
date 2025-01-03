import * as THREE from "three";
import { boardWidth, positionWidth, zoom } from "../constants.js";

export function Road() {
  const road = new THREE.Group();
  const createSection = (color) =>
    new THREE.Mesh(
      new THREE.PlaneGeometry(boardWidth * zoom, positionWidth * zoom),
      new THREE.MeshPhongMaterial({ color })
    );

  const middle = createSection(0x454a59);
  middle.receiveShadow = true;
  road.add(middle);

  const left = createSection(0x393d49);
  left.position.x = -boardWidth * zoom;
  road.add(left);

  const right = createSection(0x393d49);
  right.position.x = boardWidth * zoom;
  road.add(right);

  return road;
}
