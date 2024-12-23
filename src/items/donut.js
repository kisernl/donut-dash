import * as THREE from "three";
import { zoom } from "../constants.js";

export function Donut() {
  const donut = new THREE.Group();

  // Donut body (torus shape)
  const body = new THREE.Mesh(
    new THREE.TorusGeometry(10 * zoom, 5 * zoom, 16, 100), // Torus (ring) geometry
    new THREE.MeshPhongMaterial({
      color: 0xf5a623,
      emissive: 0xf5a623, // Adds a glow effect of the same color
      emissiveIntensity: 0.25,
      flatShading: true,
    }) // Donut color (light orange)
  );
  body.position.z = 10 * zoom;
  body.castShadow = true;
  body.receiveShadow = true;
  donut.add(body);

  // Glaze (slightly larger torus)
  const glaze = new THREE.Mesh(
    new THREE.TorusGeometry(10.2 * zoom, 5 * zoom, 16, 100),
    new THREE.MeshStandardMaterial({
      color: 0xff69b4, // Hot pink
      emissive: 0xff69b4, // Adds a glow effect of the same color
      emissiveIntensity: 0.25, // Controls the brightness of the emissive glow
      flatShading: true, // Keeps flat shading
    })
    // new THREE.MeshPhongMaterial({ color: 0xff69b4, flatShading: true }) // Glaze color (pink)
  );
  glaze.position.z = 10.1 * zoom; // Slightly offset to sit above the body
  glaze.castShadow = true;
  glaze.receiveShadow = true;
  donut.add(glaze);

  return donut;
}

export const donut = new Donut();
