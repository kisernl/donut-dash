import * as THREE from "three";
import { treeHeights, zoom } from "../constants.js";

export function Tree() {
  const tree = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(15 * zoom, 15 * zoom, 20 * zoom),
    new THREE.MeshPhongMaterial({ color: 0x4d2926, flatShading: true })
  );
  trunk.position.z = 10 * zoom;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  tree.add(trunk);
  const height = treeHeights[Math.floor(Math.random() * treeHeights.length)];
  const crown = new THREE.Mesh(
    new THREE.BoxGeometry(30 * zoom, 30 * zoom, height * zoom),
    new THREE.MeshLambertMaterial({
      color: 0x3e6e14,
      emissive: 0x3e6e14, // Adds a glow effect of the same color
      emissiveIntensity: 0.5,
      flatShading: true,
    })
  );
  crown.position.z = (height / 2 + 20) * zoom;
  crown.castShadow = true;
  crown.receiveShadow = false;
  tree.add(crown);

  return tree;
}
