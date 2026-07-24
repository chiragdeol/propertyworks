import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in seconds
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.2,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
