import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import PropTypes from "prop-types";
import { useTexture, View } from "@react-three/drei";

import LiSuperImg from "./LiSuperImg";
import useStore from "../../store/useRecruitStore.js";

import useShaderMaterial from "./useShaderMaterial";
import vertexShader from "./shaders/vert.glsl";
import fragmentShader from "./shaders/frag.glsl";

const UlSuperImg = ({ data, isUnderPadMode }) => {
  const mapSuperImageRef = useStore((state) => state.mapSuperImageRef);

  const listSuperImageRef = useMemo(
    () => Object.entries(mapSuperImageRef),
    [mapSuperImageRef]
  );
  const textures = useTexture(
    listSuperImageRef.length === data.length
      ? data.map(({ image }) => image)
      : []
  );

  const cusShaderMaterial = useShaderMaterial(
    "CurveShaderMaterial",
    vertexShader,
    fragmentShader,
    {
      uTexture: null, // WebGL2 texture 在 uniform 是保留字
      uResolution: [0, 0], // geo 長寬
      uDimensions: [0, 0], // 圖片長寬
      uRoundCenter: [0, 0, isUnderPadMode ? -25 : -20], // ?
      uRoundIntensity: isUnderPadMode ? 0.35 : 0.5,
      uMouseOver: [0, 0.5],
      uOpacity: 1,
      uDarkColor: [1, 1, 1],
      uScrollProgress: 0,
    }
  );

  return listSuperImageRef.length < data.length ? null : (
    <Suspense fallback={null}>
      {listSuperImageRef.map(([key, ref], index) => (
        <LiSuperImg
          key={key}
          track={ref}
          name={key}
          texture={textures[index]}
        />
      ))}
    </Suspense>
  );
};

UlSuperImg.propTypes = {};

export default UlSuperImg;
