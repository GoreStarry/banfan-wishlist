import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Suspense,
  useMemo,
} from "react";
import useWindowSize from "react-use/lib/useWindowSize.js";
import { isIOS } from "react-device-detect";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export default function useResize() {
  const refMemoWindowWidth = useRef(false);

  const { width: widthWindow } = useWindowSize();
  const [heightWindow, setHeightWindow] = useState();
  const [isUnderPadMode, setIsUnderPadMode] = useState();
  const [isFB, setIsFB] = useState();

  useIsomorphicLayoutEffect(() => {
    setIsFB(checkIsFBWebview());
    setHeightWindow(window.innerHeight);
    setIsUnderPadMode(
      widthWindow < heightWindow || widthWindow < 1000 || isIOS
    );
    return () => {};
  }, []);

  useEffect(() => {
    if (
      refMemoWindowWidth.current &&
      refMemoWindowWidth.current !== widthWindow
    ) {
      window.location.reload();
    } else {
      refMemoWindowWidth.current = widthWindow;
    }
    return () => {};
  }, [widthWindow]);

  const styleHeight = useMemo(() => {
    if (!isFB) {
      return null;
    } else {
      return {
        "--vh": `${(heightWindow + 90) * 0.01}px`,
      };
    }
  }, [isFB]);

  return {
    isUnderPadMode,
    styleHeight,
    isFB,
  };
}

function checkIsFBWebview() {
  if (typeof window === "undefined") return null;
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return (
    ua.indexOf("FBAN") > -1 ||
    ua.indexOf("FBAV") > -1 ||
    ua.indexOf("Instagram") > -1
  );
}
