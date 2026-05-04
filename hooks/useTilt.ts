"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useReducedMotion, useSpring, type MotionValue } from "framer-motion";

type TiltValues = {
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
    isEnabled: boolean;
};

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };
const MAX_ANGLE = 8;

// SSR-safe touch detection sans setState
const subscribe = (cb: () => void) => {
    const mq = window.matchMedia("(hover: none)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia("(hover: none)").matches;
const getServerSnapshot = () => false;

export function useTilt(): TiltValues {
    const reduce = useReducedMotion();
    const isTouch = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const isEnabled = !reduce && !isTouch;

    const rotateX = useSpring(0, SPRING);
    const rotateY = useSpring(0, SPRING);

      const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isEnabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * MAX_ANGLE * 2);
      rotateY.set(x * MAX_ANGLE * 2);
    },
    [isEnabled, rotateX, rotateY],
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave, isEnabled };
}