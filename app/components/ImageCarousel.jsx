"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tooltip from "./Tooltip";

const ImageCarousel = ({ images, alt }) => {
  const [index, setIndex] = useState(0);

  if (!images?.length) return null;

  const goTo = (next) => setIndex((next + images.length) % images.length);

  return (
    <div
      className="relative aspect-video bg-bg-secondary overflow-hidden group/carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      tabIndex={images.length > 1 ? 0 : -1}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(index - 1);
        if (event.key === "ArrowRight") goTo(index + 1);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Image src={images[index]} alt={alt} fill className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <Tooltip
            label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 focus-within:opacity-100 transition-opacity"
          >
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-bg/80 backdrop-blur border border-border text-text hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
          </Tooltip>
          <Tooltip
            label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 focus-within:opacity-100 transition-opacity"
          >
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-bg/80 backdrop-blur border border-border text-text hover:text-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </Tooltip>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-accent" : "w-1.5 bg-bg/70 border border-border"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
