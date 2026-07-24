import { Variants } from "framer-motion";

// Smooth easing — feels like iOS spring but in CSS bezier
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = (delay: number = 0, duration: number = 0.45): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: EASE_OUT,
    },
  },
});

export const fadeInDown = (delay: number = 0, duration: number = 0.45): Variants => ({
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: EASE_OUT,
    },
  },
});

export const fadeInLeft = (delay: number = 0, duration: number = 0.45): Variants => ({
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: EASE_OUT,
    },
  },
});

export const fadeInRight = (delay: number = 0, duration: number = 0.45): Variants => ({
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: EASE_OUT,
    },
  },
});

export const scaleUp = (delay: number = 0, duration: number = 0.45): Variants => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: EASE_OUT,
    },
  },
});

export const staggerContainer = (
  staggerChildren: number = 0.06,
  delayChildren: number = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Infinite float — gentle, smooth, GPU-friendly
export const floatTransition = {
  y: {
    duration: 3.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  },
};

export const floatingVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: floatTransition,
  },
};

// Card hover — spring physics for buttery feel
export const cardHoverTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
};

export const cardHoverProps = {
  whileHover: {
    y: -6,
    scale: 1.02,
    boxShadow: "0 16px 32px rgba(212, 161, 58, 0.12), 0 6px 20px rgba(0, 27, 79, 0.06)",
  },
  transition: cardHoverTransition,
};
