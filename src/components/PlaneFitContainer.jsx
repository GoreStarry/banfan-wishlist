import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import { useThree } from "@react-three/fiber";
import { fit } from "object-fit-math";

export default function PlaneFitContainer({
  texture,
  widthSegments = 1,
  heightSegments = 1,
}) {
  const sizeViewport = useThree((state) => state.viewport);
  const sizeImg = texture.source.data;

  const { width, height } = useMemo(
    () => fit(sizeViewport, sizeImg, "contain"),
    [sizeViewport, sizeImg]
  );

  return (
    <planeGeometry
      attach="geometry"
      args={[width * 0.8, height * 0.8, widthSegments, heightSegments]}
    />
  );
}
