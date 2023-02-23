import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useLayoutEffect,
  Suspense,
} from "react";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export default function useShaderMaterial(
  name,
  vert,
  frag,
  shaderMaterialProps
) {
  const ShaderMaterial = shaderMaterial(
    shaderMaterialProps, // drei 的 shaderMaterial 會直接串進 uniforms
    // vertex shader
    vert,
    // fragment shader
    frag
  );
  extend({ [name]: ShaderMaterial });

  return ShaderMaterial;
}
