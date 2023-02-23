import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import PropTypes from "prop-types";

import {
  View,
  Preload,
  OrbitControls,
  PerspectiveCamera,
  CameraShake,
  PivotControls,
  Environment,
  Center,
} from "@react-three/drei";
import useRefs from "react-use-refs";
import cx from "classnames";

import "../../styles/reset.min.css";
import "../../styles/global.scss";

import Canvas from "../Canvas";
import Description from "../Description";
import LiGame from "../LiGame";
import UlSuperImg from "../UlSuperImg";
import DiceBox from "../DiceBox";

import useInitGSAP from "../../helpers/useInitGSAP.js";

import {
  useUniversalScrollTrigger,
  useIsomorphicLayoutEffect,
  useResize,
  useDetectProblemBrowser,
} from "../../../../react-use-universal-scrollTrigger/dist/index.es.js";

import "../../styles/reset.min.css";
import "../../styles/global.scss";

import sty from "./IndexContainer.module.scss";

const data = [
  {
    title: "WAYFARERS",
    subtitle: "",
    image: require("../../images/pic6484574.webp"),
    user_name: "高爾",
    description:
      "冠廷不買，我有什麼辦法？冠廷不買，我有什麼辦法？冠廷不買，我有什麼辦法？",
  },
  {
    title: "ARK NOVA",
    subtitle: "",
    image: require("../../images/pic6293412.webp"),
    user_name: "高爾",
    description: "冠廷不買，我有什麼辦法？ ",
  },
];

const IndexContainer = ({ children }) => {
  const ref = useRef();
  const refSmoother = useRef();
  const [isInitMount, setIsInitMount] = useState(false);

  useEffect(() => {
    setIsInitMount(true);
    return () => {};
  }, []);

  const { height, width, styleHeight, isUnderPadMode, isFB } = useResize();

  useInitGSAP({ isUnderPadMode, refSmoother, isInitMount, styleHeight });

  return (
    <>
      <div ref={ref} className={sty.IndexContainer} style={styleHeight}>
        <Description />
        <div className={sty.container}>
          {data.map((data, index) => (
            <LiGame key={data.title} index={index} {...data} />
          ))}
        </div>
      </div>
      <div className={sty.Canvas}>
        <Canvas eventSource={ref}>
          <UlSuperImg data={data} isUnderPadMode={isUnderPadMode} />
          <Suspense fallback={null}>
            <DiceBox />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

IndexContainer.propTypes = {};

export default IndexContainer;
