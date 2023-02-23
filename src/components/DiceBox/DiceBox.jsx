import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";

import { MathUtils } from "three";
import { useThree } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
  Debug,
} from "@react-three/rapier";
import {
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  Lightformer,
  View,
} from "@react-three/drei";

import getMergedBufferGeometry from "./getMergedBufferGeometry.js";
import useStore from "../../store/useRecruitStore.js";

const COUNT = 50;

const DiceBox = React.memo(() => {
  // const { height, width } = { height: 7, width: 4 }; // useThree((state) => state.viewport);
  const { height, width } = useThree((state) => state.viewport);
  const sizeMin = width;
  const diceSize = height < width ? width / 20 : height / 20;

  const refOpeningBox = useStore((state) => state.refs.refOpeningBox);

  return (
    <View track={refOpeningBox}>
      <Physics gravity={[0, -4, 0]}>
        {/* <Debug /> */}
        <Dice
          sizeMin={sizeMin}
          diceSize={diceSize}
          height={height}
          width={width}
        />
        {/* 地板 */}
        <RigidBody
          position={[0, -height / 2 - 1, 0]}
          type="fixed"
          colliders="false"
        >
          <CuboidCollider restitution={0.1} args={[1000, 1, 1000]} />
        </RigidBody>
        <RigidBody
          position={[0, 0, -diceSize * 10]}
          type="fixed"
          colliders="false"
        >
          <CuboidCollider restitution={0.1} args={[1000, 1000, 1]} />
        </RigidBody>
        <RigidBody
          position={[0, 0, diceSize * 1]}
          type="fixed"
          colliders="false"
        >
          <CuboidCollider restitution={0.1} args={[1000, 1000, 1]} />
        </RigidBody>
        <RigidBody
          position={[width / 2 + 2, 0, 0]}
          type="fixed"
          colliders="false"
        >
          <CuboidCollider restitution={0.1} args={[1, 1000, 1000]} />
        </RigidBody>
        <RigidBody
          position={[-width / 2 - 2, 0, 0]}
          type="fixed"
          colliders="false"
        >
          <CuboidCollider restitution={0.1} args={[1, 1000, 1000]} />
        </RigidBody>
      </Physics>
    </View>
  );
});

DiceBox.propTypes = {};

export default DiceBox;

function Dice({ sizeMin, diceSize, height, width }) {
  const ref = useRef();
  const api = useRef();
  const { scene, nodes, materials } = useGLTF(require("./Dice3-01.glb"));

  const createBody = useCallback(
    () => ({
      key: Math.random(),
      position: [
        Math.random() * width - width / 2,
        Math.random() * height * 2 + height,
        -Math.random(),
      ],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ],
      scale: [diceSize, diceSize, diceSize],
      // scale: [0.5 + Math.random(), 0.5 + Math.random(), 0.5 + Math.random()],
    }),
    []
  );

  const [bodies, setBodies] = useState(() =>
    Array.from({
      length: COUNT,
    }).map(() => createBody())
  );

  return (
    <>
      <OrbitControls
      // autoRotate
      // autoRotateSpeed={0.1}
      // enablePan={false}
      // enableZoom={false}
      // minPolarAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI / 4}
      />
      <ambientLight intensity={0.5} color="white" />
      <InstancedRigidBodies instances={bodies} ref={api} colliders="cuboid">
        <instancedMesh
          ref={ref}
          castShadow
          args={[nodes.dice.geometry, materials.White, COUNT]}
          count={bodies.length}
        >
          {/* <group dispose={null}>
            <group scale={5}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                // material={materials["Dice 1"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube_1.geometry}
                material={materials["Dice 2"]}
              />
            </group>
          </group> */}
        </instancedMesh>
      </InstancedRigidBodies>
    </>
  );
}
