import * as THREE from "three";
import { zoom } from "../constants.js";

export function Ghost() {
  const ghost = new THREE.Group();

  // Body (using a sphere to create a rounded ghost body)
  const bodyRadius = 15 * zoom;
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(bodyRadius, 32, 32),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      opacity: 0.7,
      transparent: true,
      flatShading: true,
    })
  );
  body.position.y = bodyRadius; // Position body so the bottom sits on the ground
  body.castShadow = true;
  body.receiveShadow = true;
  ghost.add(body);

  // Bottom "tails" (using a series of spheres or cones to simulate flowing ghost tails)
  const tailGeometry = new THREE.SphereGeometry(bodyRadius / 2, 16, 16);

  for (let i = 0; i < 3; i++) {
    const tail = new THREE.Mesh(
      tailGeometry,
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        opacity: 0.5,
        transparent: true,
        flatShading: true,
      })
    );
    tail.position.set(
      Math.random() * 10 - 5, // Randomly place them around the body
      -bodyRadius / 2 - i * 5 * zoom,
      Math.random() * 10 - 5
    );
    ghost.add(tail);
  }

  // Eyes (using small black spheres for a ghostly look)
  const eyeGeometry = new THREE.SphereGeometry(3 * zoom, 8, 8);
  const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-5 * zoom, bodyRadius * 1.5, 8 * zoom);
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(5 * zoom, bodyRadius * 1.5, 8 * zoom);

  ghost.add(leftEye);
  ghost.add(rightEye);

  return ghost;
}

export const ghost = new Ghost();
