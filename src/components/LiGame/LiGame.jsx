import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import useStore from "../../store/useRecruitStore.js";

import sty from "./LiGame.module.scss";

const LiGame = ({ title, subtitle, image, user_name, description, index }) => {
  const refImage = useRef();
  useEffect(() => {
    useStore.getState().addSuperImageRef(title, refImage);
    return () => {};
  }, []);

  return (
    <div
      className={cx(sty.LiGame, {
        [sty.LiGame__right]: index % 2,
      })}
    >
      <div
        className={cx(sty.box__img, {
          [sty.box__img_right]: index % 2,
        })}
      >
        <div ref={refImage} className={sty.box__view_target}></div>
        <img src={image} alt="" />
      </div>
      <div className={sty.box__info}>
        <div className={sty.box__description}>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <div className={sty.box__desc}>
            <img className={sty.img__user} src={require("./gore.jpg")} />
            <p className={sty.p}>
              {user_name}：「{description}」
            </p>
          </div>
        </div>
        <button className={sty.btn__submit}>我願意借拌飯玩！</button>
      </div>
    </div>
  );
};

LiGame.propTypes = {};

export default LiGame;
