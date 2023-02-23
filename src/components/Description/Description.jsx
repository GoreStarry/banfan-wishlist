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
import RevealText from "../../../../react-use-universal-scrollTrigger/dist/RevealText.es.js";
import TextTransition from "../../../../react-use-universal-scrollTrigger/dist/TextTransition.es.js";

import sty from "./Description.module.scss";

const Description = ({ children }) => {
  const refOpeningBox = useRef();

  useEffect(() => {
    useStore.getState().addRefs({refOpeningBox});

    return () => {};
  }, []);

  return (
    <div className={cx(sty.Description)}>
      <section ref={refOpeningBox}>
        <RevealText className={sty.title}>
          錢錢有限🤧，拌飯需要你的一臂之力💪
        </RevealText>
      </section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <div>
        <p>錢錢有限🤧，拌飯需要你的一臂之力💪</p>
        <p>
          如果你有收藏以下這些，我們很感興趣的桌遊 🤩
          而且！你又剛好願意借給我們體驗 🥹
        </p>
        <p>我們願意提供店到店的往返運費，拜託借給我們玩玩看！🙏</p>
        <p>歡迎再聯絡時準備一段話 🖌（無論是對這款遊戲，或是對我們話）</p>
        <p>
          我們會在節目中向大家分享這段話🎙️，並與大家分享～
          這段原本可能不屬於我們的桌遊人生體驗 ❤️
        </p>
        <p>（但基於我們秉持的真誠性，無法保證對該款遊戲給予正向評價。）</p>
      </div>
    </div>
  );
};

Description.propTypes = {};

export default Description;
