import { useState, useEffect } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface ProgressiveImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  videoLook?: boolean;
  animationType?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export default function ProgressiveImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  videoLook = false,
  animationType = 1,
  initial,
  animate,
  whileInView,
  whileHover,
  transition,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Video look interactive state
  const [isPlaying, setIsPlaying] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"play" | "pause" | null>(null);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    if (!videoLook) return;
    e.stopPropagation();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    setFeedbackType(nextState ? "play" : "pause");
    setShowFeedback(true);
  };

  useEffect(() => {
    if (!showFeedback) return;
    const timer = setTimeout(() => {
      setShowFeedback(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [showFeedback]);

  return (
    <div
      onClick={videoLook ? handleTogglePlay : undefined}
      className={`relative overflow-hidden ${containerClassName} ${videoLook ? "cursor-pointer select-none group/video" : ""}`}
    >
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 z-10 animate-shimmer bg-slate-100 w-full h-full"
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} ${
          videoLook
            ? `animate-video-kb-${animationType} ${!isPlaying ? "animation-paused" : ""}`
            : ""
        }`}
        initial={
          typeof initial === "object"
            ? { opacity: 0, ...initial }
            : { opacity: 0 }
        }
        animate={
          typeof animate === "object"
            ? { opacity: isLoaded ? 1 : 0, ...animate }
            : { opacity: isLoaded ? 1 : 0 }
        }
        whileInView={videoLook ? undefined : whileInView}
        whileHover={videoLook ? undefined : whileHover}
        transition={transition || { duration: 0.5, ease: "easeOut" }}
        {...props}
      />

      {/* Cinematic Video Look Overlays */}
      {videoLook && isLoaded && (
        <>
          {/* Bottom Loop progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black/30 z-20">
            <div
              className={`h-full bg-gradient-to-r from-[#d4a13a] via-[#e2b45a] to-[#d4a13a] animate-video-progress ${
                !isPlaying ? "animation-paused" : ""
              }`}
            />
          </div>

          {/* Toggle Control Button (Bottom Right) - No background blur */}
          <button
            onClick={handleTogglePlay}
            className="absolute bottom-4 right-4 z-25 p-2 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white cursor-pointer transition-all active:scale-95 shadow-md flex items-center justify-center opacity-0 group-hover/video:opacity-100"
            aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-white stroke-none" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white stroke-none translate-x-[0.5px]" />
            )}
          </button>

          {/* Static Center Play Icon (Only when paused) - minimal blur */}
          {!isPlaying && !showFeedback && (
            <div className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-14 h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white shadow-lg"
              >
                <Play className="w-5.5 h-5.5 fill-white stroke-none translate-x-[1.5px]" />
              </motion.div>
            </div>
          )}

          {/* Toggle Feedback Popup (YouTube style) - no blur */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white">
                  {feedbackType === "play" ? (
                    <Play className="w-7 h-7 fill-white stroke-none translate-x-[1px]" />
                  ) : (
                    <Pause className="w-7 h-7 fill-white stroke-none" />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
