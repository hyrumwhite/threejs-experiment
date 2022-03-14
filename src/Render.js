import { Clock, WebGLRenderer, Camera } from "three";
import { Camera } from "./components/Camera.js";

const updates = [];
const buckets = {};
const cameras = [];
const refs = {};
let currentCamera = null;
let renderer = null;
let currentScene = null;
/**
 *
 * @param {{node:any, beforeAdd: Function, update: Function}} component
 */
export const render = (component) => {
  let constructorParams = component.params || [];
  let node = new component.node(...constructorParams);
  if (node instanceof Camera) {
    if (component.active) {
      setCamera(node);
    }
    cameras.push(node);
  }
  if (component.beforeAdd) {
    component.beforeAdd.call(node);
  }
  if (component.update) {
    updates.push(component.update.bind(node));
  }
  if (component.tag) {
    if ([component.tag]) {
      buckets[component.tag].push(node);
    } else {
      buckets[component.tag] = [node];
    }
  }
  if (component.ref) {
    if (refs[component.ref]) {
      if (refs instanceof Array) {
        refs[component.ref].push(node);
      } else {
        refs[component.ref] = [node];
      }
    }
    refs[component.ref] = node;
  }
  if (component.children) {
    for (let child of component.children) {
      const childNode = render(child);
      node.add(childNode);
      if (child.added) {
        child.added.call(childNode, node);
      }
    }
  }
  return node;
};

export const setCamera = (camera) => {
  currentCamera = camera;
};
export const setCurrentScene = (scene) => {
  currentScene = scene;
};

export const initialize = ({ scene }) => {
  if (scene) {
    setCurrentScene(scene);
  }
  renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  window.addEventListener(
    "resize",
    () => {
      currentCamera.aspect = window.innerWidth / window.innerHeight;
      currentCamera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );
  window.addEventListener("set-active-camera", ({ detail: camera }) => {
    setCamera(camera);
  });
};

const clock = new Clock();
export const tick = () => {
  if (currentCamera == null || currentScene == null) {
    console.error("no camera or scene set");
    return;
  }
  requestAnimationFrame(() => {
    let delta = clock.getDelta();
    for (let update of updates) {
      update({
        scene: currentScene,
        camera: currentCamera,
        setCamera,
        delta,
        buckets,
        namedComponents,
        refs,
      });
    }
    renderer.render(currentScene, currentCamera);
    tick();
  });
};
