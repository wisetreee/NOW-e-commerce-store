"use client";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
    if (active && Math.abs(mx) > 100) {
      const newIndex = activeIndex + (xDir > 0 ? -1 : 1);
      if (newIndex >= 0 && newIndex < images.length) {
        setActiveIndex(newIndex);
      }
      cancel();
    } else {
      api.start({ x: active ? mx : 0, immediate: active });
    }
  });

  return (
    <div className="relative overflow-hidden w-full h-full bg-white brightness-95 hover:brightness-90 duration-300 ease-in-out">
      {/* Слайды */}
      <animated.div
        {...bind()}
        className="flex h-full"
        style={{
          x,
          touchAction: "none",
          cursor: "grab",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-full aspect-square flex-shrink-0 "
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.3s ease",
            }}
          >
            <Image
              src={img}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality="100"
              priority
              alt={`Slide ${index + 1}`}
              className="absolute object-cover"
            />
          </div>
        ))}
      </animated.div>

      {/* Навигационные точки */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-2  ${
              index === activeIndex ? "bg-content_1" : "bg-content_3"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;