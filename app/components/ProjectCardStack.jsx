"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const SWIPE_DISTANCE = 100;
const SWIPE_VELOCITY = 500;

function StackCard({ project, index, currentIndex, total, renderCard, onNext }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);

  const relativeIndex = (index - currentIndex + total) % total;
  const isTop = relativeIndex === 0;

  useEffect(() => {
    if (!isTop) {
      animate(x, 0, {
        type: "spring",
        stiffness: 320,
        damping: 30,
      });
    }
  }, [isTop, x]);

  const handleDragEnd = async (_, info) => {
    if (!isTop) return;

    const shouldSwipe =
      Math.abs(info.offset.x) > SWIPE_DISTANCE ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;

    if (!shouldSwipe) {
      animate(x, 0, {
        type: "spring",
        stiffness: 400,
        damping: 28,
      });
      return;
    }

    const direction = info.offset.x > 0 ? 1 : -1;

    await animate(x, direction * 900, {
      type: "spring",
      stiffness: 260,
      damping: 28,
      velocity: info.velocity.x,
    });

    onNext();
    x.set(0);
  };

  const scale = isTop ? 1 : relativeIndex === 1 ? 0.94 : 0.9;
  const y = isTop ? 0 : relativeIndex === 1 ? 24 : 42;
  const stackRotate = isTop ? 0 : relativeIndex % 2 === 0 ? -2 : 2;

  return (
    <motion.li
      className="absolute left-1/2 top-1/2 w-[min(78vw,620px)] -translate-x-1/2 -translate-y-1/2 list-none"
      style={{
        x,
        rotate: isTop ? rotate : stackRotate,
        y,
        scale,
        zIndex: total - relativeIndex,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
      animate={{
        opacity: relativeIndex < 3 ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 30,
      }}
    >
      {renderCard(project)}
    </motion.li>
  );
}

export default function ProjectCardStack({ projects, renderCard }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects?.length) return null;

  const total = projects.length;

  const handleNext = () => {
    setCurrentIndex((current) => (current + 1) % total);
  };

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-4xl overflow-visible touch-pan-y">
      <ul className="relative m-0 h-full w-full list-none p-0">
        {projects.map((project, index) => (
          <StackCard
            key={project.slug}
            project={project}
            index={index}
            currentIndex={currentIndex}
            total={total}
            renderCard={renderCard}
            onNext={handleNext}
          />
        ))}
      </ul>

      <p className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs tracking-wide text-text-muted">
        Swipe the top card
      </p>
    </div>
  );
}
