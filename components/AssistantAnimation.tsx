"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * The left-panel illustration — plays the provided developer_animation.lottie
 * file (a real dotLottie asset, in /public/animations). @lottiefiles/dotlottie-react
 * is used instead of the classic `lottie-react` because a `.lottie` file is a
 * zipped dotLottie container, not a raw Lottie JSON — lottie-react can't play
 * it directly.
 *
 * To swap in a different animation, drop a new `.lottie` (or `.json`) file in
 * /public/animations and update the `src` below.
 */
export default function AssistantAnimation() {
  return (
    <div className="h-64 w-64 md:h-80 md:w-80">
      <DotLottieReact
        src="/animations/developer_animation.lottie"
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  );
}
