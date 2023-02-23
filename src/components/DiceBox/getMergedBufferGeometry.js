import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"

export default function getMergedBufferGeometry(scene) {
  const geometryArray = []

  scene.traverse(function (child) {
    if (child.isMesh) {
      // console.log(child)
      geometryArray.push(child.geometry)
    }
  })

  const bufferGeometry = mergeBufferGeometries(geometryArray, true)

  return bufferGeometry
}
