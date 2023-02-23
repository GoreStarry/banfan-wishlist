import React, { useRef, useState, useCallback, useEffect } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

import gsap from "gsap";

import store from "../store/useRecruitStore";

import ScrollTrigger from "../../plugin/gsap-shockingly-green/esm/ScrollTrigger.js";
import ScrollToPlugin from "../../plugin/gsap-shockingly-green/esm/ScrollToPlugin.js";
import ScrollSmoother from "../../plugin/gsap-shockingly-green/esm/ScrollSmoother.js";
// import { lockScroll, unLockScroll } from "../../helper/lockBodyScroll.js";

export default function useInitGSAP({
  isUnderPadMode,
  refSmoother,
  styleHeight,
}) {
  store.getState().addRefs({ refSmoother });

  useEffect(() => {
    if (styleHeight) {
      ScrollTrigger.refresh();
    }
    return () => {};
  }, [styleHeight]);

  useIsomorphicLayoutEffect(() => {
    // lockScroll();
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollToPlugin
      // GSDevTools
    );

    ScrollTrigger.config({ ignoreMobileResize: true });
    // ScrollTrigger.normalizeScroll(true)

    // lockScroll(refSmoother);

    return () => {};
  }, [isUnderPadMode]);
}
