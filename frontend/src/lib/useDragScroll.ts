"use client";

import { useRef, useState, type MouseEvent } from "react";

/**
 * Mengaktifkan geser (drag-to-scroll) pakai mouse di desktop
 * selain swipe jari di HP/iPad dan trackpad.
 */
export function useDragScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    down: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const [dragging, setDragging] = useState(false);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !ref.current) return;
    state.current = {
      down: true,
      startX: e.pageX - ref.current.offsetLeft,
      scrollLeft: ref.current.scrollLeft,
      moved: false,
    };
    setDragging(true);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!state.current.down || !ref.current) return;
    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - state.current.startX;
    if (Math.abs(walk) > 6) {
      state.current.moved = true;
    }
    if (state.current.moved) {
      e.preventDefault();
      ref.current.scrollLeft = state.current.scrollLeft - walk;
    }
  };

  const stopDragging = () => {
    if (!state.current.down) return;
    state.current.down = false;
    setDragging(false);
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  };

  return {
    ref,
    dragging,
    dragProps: {
      onMouseDown,
      onMouseMove,
      onMouseUp: stopDragging,
      onMouseLeave: stopDragging,
      onClickCapture,
    },
  };
}
