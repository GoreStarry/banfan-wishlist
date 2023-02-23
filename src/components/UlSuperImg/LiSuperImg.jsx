import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { useTexture, View } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import PlaneFitContainer from "../PlaneFitContainer";

const LiSuperImg = ({ track, texture }) => {
  const ref = useRef();

  const { size } = useThree();

  useEffect(() => {
    setTimeout(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: track.current,
            start: "20% bottom",
            end: "70% bottom",
            scrub: true,
            markers: true,
          },
        })
        .addLabel("start")
        .fromTo(
          ref.current.position,
          {
            y: 6,
          },
          {
            y: 0,
            ease: "linear",
            // onUpdate: () => {
            //   console.log(ref.current.position);
            // },
          },
          "start"
        )
        .fromTo(
          ref.current.material,
          {
            uOpacity: 0,
          },
          {
            uOpacity: 1,
            // duration: 0.1,
          },
          "start"
        );
    }, 300);
    return () => {};
  }, []);

  return (
    <View track={track}>
      <mesh ref={ref}>
        <PlaneFitContainer texture={texture} heightSegments={10} />
        <curveShaderMaterial
          uTexture={texture}
          uResolution={[size.width / 100, size.height / 100]} // geo 長寬
          uDimensions={[size.width / 100, size.height / 100]} // 圖片長寬
          transparent="true"
        />
      </mesh>
    </View>
  );
};

LiSuperImg.propTypes = {};

export default LiSuperImg;
