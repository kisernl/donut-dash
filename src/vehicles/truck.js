import * as THREE from "three";
import { Texture } from "../texture.js";
import { vehicleColors, zoom } from "../constants.js";
import { Wheel } from "./wheel.js";

const truckFrontTexture = new Texture(30, 30, [{ x: 15, y: 0, w: 10, h: 30 }]);
const truckRightSideTexture = new Texture(25, 30, [
  { x: 0, y: 15, w: 10, h: 10 },
]);
const truckLeftSideTexture = new Texture(25, 30, [
  { x: 0, y: 5, w: 10, h: 10 },
]);

export function Truck() {
  const truck = new THREE.Group();
  const color = vehicleColors[Math.floor(Math.random() * vehicleColors.length)];

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(100 * zoom, 25 * zoom, 5 * zoom),
    new THREE.MeshLambertMaterial({ color: 0xb4c6fc, flatShading: true })
  );
  base.position.z = 10 * zoom;
  truck.add(base);

  const cargo = new THREE.Mesh(
    new THREE.BoxGeometry(75 * zoom, 35 * zoom, 40 * zoom),
    new THREE.MeshLambertMaterial({ color: 0xb4c6fc, flatShading: true })
  );

  cargo.position.x = 15 * zoom;
  cargo.position.z = 30 * zoom;
  cargo.castShadow = true;
  cargo.receiveShadow = true;
  truck.add(cargo);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(25 * zoom, 30 * zoom, 30 * zoom),
    [
      new THREE.MeshPhongMaterial({
        color,
        emissive: color, // Adds a glow effect of the same color
        emissiveIntensity: 0.15,
        flatShading: true,
      }),
      new THREE.MeshPhongMaterial({
        color,
        emissive: color, // Adds a glow effect of the same color
        emissiveIntensity: 0.15,
        flatShading: true,
        map: truckFrontTexture,
      }),
      new THREE.MeshPhongMaterial({
        color,
        emissive: color, // Adds a glow effect of the same color
        emissiveIntensity: 0.15,
        flatShading: true,
        map: truckRightSideTexture,
      }),
      new THREE.MeshPhongMaterial({
        color,
        emissive: color, // Adds a glow effect of the same color
        emissiveIntensity: 0.15,
        flatShading: true,
        map: truckLeftSideTexture,
      }),
      new THREE.MeshPhongMaterial({
        color,
        emissive: color, // Adds a glow effect of the same color
        emissiveIntensity: 0.15,
        flatShading: true,
      }),
      new THREE.MeshPhongMaterial({
        color,
        emissive: color, // Adds a glow effect of the same color
        emissiveIntensity: 0.15,
        flatShading: true,
      }),
    ]
  );
  cabin.position.x = -40 * zoom;
  cabin.position.z = 20 * zoom;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  truck.add(cabin);

  const frontWheel = new Wheel();
  frontWheel.position.x = -38 * zoom;
  truck.add(frontWheel);

  const middleWheel = new Wheel();
  middleWheel.position.x = -10 * zoom;
  truck.add(middleWheel);

  const backWheel = new Wheel();
  backWheel.position.x = 30 * zoom;
  truck.add(backWheel);

  return truck;
}
