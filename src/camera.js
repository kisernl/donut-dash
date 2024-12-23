import * as THREE from "three";

export const distance = 500;
export const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  0.1,
  10000
);

camera.rotation.x = (50 * Math.PI) / 180;
camera.rotation.y = (20 * Math.PI) / 180;
camera.rotation.z = (10 * Math.PI) / 180;

export const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
export const initialCameraPositionX =
  Math.tan(camera.rotation.y) *
  Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);

camera.position.y = initialCameraPositionY;
camera.position.x = initialCameraPositionX;
camera.position.z = distance;
