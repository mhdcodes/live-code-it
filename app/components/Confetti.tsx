"use client";

import { useWindowSize } from "usehooks-ts";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const { width, height } = useWindowSize();
  return <ReactConfetti width={width} height={height} />;
};

export default Confetti;
