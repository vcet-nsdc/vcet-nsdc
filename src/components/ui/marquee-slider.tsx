"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const images: { src: string; alt: string }[] = [
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop", alt: "Event 1" },
  { src: "https://images.unsplash.com/photo-1551836022-b069f8f560d6?q=80&w=1200&auto=format&fit=crop", alt: "Event 2" },
  { src: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop", alt: "Event 3" },
  { src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop", alt: "Event 4" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", alt: "Event 5" },
];

export default function MarqueeSlider() {
  const duplicated = useMemo(() => [...images, ...images], []);
  const [loaded, setLoaded] = useState(0);
  const isReady = loaded >= 3; // wait for first few images to be ready

  const handleLoaded = useCallback(() => {
    setLoaded((c) => c + 1);
  }, []);

  return (
    <section className="image-slider" style={{ opacity: isReady ? 1 : 0, transition: "opacity .3s ease" }}>
      <div className="slider-track" style={{ animationPlayState: isReady ? 'running' : 'paused' }}>
        {duplicated.map((img, idx) => (
          <div className="slide" key={idx}>
            <div className="imgWrap">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 60vw, 400px"
                priority={idx < 3}
                loading={idx < 3 ? 'eager' : 'lazy'}
                quality={85}
                onLoadingComplete={handleLoaded}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .image-slider {
          overflow: hidden;
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, rgba(74,34,147,0.35), rgba(127,69,219,0.25));
          padding: 40px 0;
          border-radius: 16px;
        }

        .slider-track {
          display: flex;
          gap: 24px;
          will-change: transform;
          animation: scroll 10s linear infinite;
        }

        .slide {
          width: 400px;
          flex-shrink: 0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
          transition: transform 0.3s ease;
        }

        .slide:hover { transform: scale(1.07); }

        .imgWrap { position: relative; width: 100%; height: 250px; }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .slide { width: 250px; }
          .imgWrap { height: 160px; }
        }
      `}</style>
    </section>
  );
}


