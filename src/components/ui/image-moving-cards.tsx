"use client";

import React from "react";
import { cn } from "@/utils/cn";

export const ImageMovingCards = ({
  items,
  className,
  onImageClick,
  speedSeconds = 20,
  slideWidthPx = 260,
}: {
  items: {
    img: string;
    alt: string;
  }[];
  className?: string;
  onImageClick?: (imgSrc: string) => void;
  speedSeconds?: number; // total duration for one loop
  slideWidthPx?: number; // width of each slide tile
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const cycleRef = React.useRef<HTMLDivElement | null>(null);
  const [repeats, setRepeats] = React.useState<number>(2);

  React.useEffect(() => {
    const setCycle = () => {
      if (cycleRef.current && trackRef.current && containerRef.current) {
        const cycleWidth = cycleRef.current.getBoundingClientRect().width;
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const neededRepeats = Math.max(2, Math.ceil((containerWidth + cycleWidth) / cycleWidth));
        setRepeats(neededRepeats);
        trackRef.current.style.setProperty("--cycle", `${cycleWidth}px`);
        trackRef.current.style.setProperty("animation", `marqueePX var(--duration) linear infinite`);
        trackRef.current.style.setProperty("--duration", `${speedSeconds}s`);
      }
    };
    setCycle();
    window.addEventListener("resize", setCycle);
    return () => window.removeEventListener("resize", setCycle);
  }, [items, speedSeconds, slideWidthPx]);

  const renderCycle = (prefix: string) => (
    <div className="flex items-center gap-0">
      {items.map((item, idx) => (
        <div
          key={`${prefix}-${item.alt}-${idx}`}
          className="flex-none h-48 p-0 m-0 rounded-xl border-2 border-white/30 bg-black/10 overflow-hidden shadow-lg hover:border-white/50 transition-all duration-300"
          style={{ width: `${slideWidthPx}px` }}
        >
          <img
            src={item.img}
            alt={item.alt}
            className="w-full h-full object-cover cursor-pointer select-none transition-transform duration-200 hover:scale-[1.03]"
            draggable={false}
            onClick={() => onImageClick && onImageClick(item.img)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden hide-scrollbar", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent dark:from-black/90" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-black/80 via-black/30 to-transparent dark:from-black/90" />

      <div ref={trackRef} className="flex w-max items-center gap-0 will-change-transform">
        <div ref={cycleRef} className="flex items-center gap-0">
          {renderCycle("m0").props.children}
        </div>
        {Array.from({ length: repeats - 1 }).map((_, i) => (
          <React.Fragment key={`rep-${i}`}>{renderCycle(`m${i + 1}`)}</React.Fragment>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueePX {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--cycle))); }
        }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
