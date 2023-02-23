import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

const CanvasContainer = ({
  children,
  canvasBgColor,
  onCreated,
  ...restProps
}) => {
  const [isMount, setIsMount] = useState();
  return (
    <Canvas
      ref={setIsMount}
      alpha="true" // enable transparent effect
      shadows
      gl={
        {
          // preserveDrawingBuffer: true  // 當要繪製下載出圖時使用
        }
      }
      dpr={window.devicePixelRatio}
      onCreated={({ camera, gl, scene, viewport }) => {
        // refCanvas.current = gl.domElement;
        if (canvasBgColor && canvasBgColor !== "transparent") {
          scene.background = new THREE.Color(canvasBgColor);
        } else {
          scene.background = null;
          gl.setClearColor(0x000000, 0);
        }
        onCreated && onCreated();
      }}
      {...restProps}
    >
      {/* {isMount && <Perf position="top-left" />} */}
      {children}
    </Canvas>
  );
};

CanvasContainer.propTypes = {};

export default CanvasContainer;
