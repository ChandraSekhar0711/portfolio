"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 450;

function StackCard({
  project,
  index,
  currentIndex,
  total,
  renderCard,
  onNext,
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-420, 0, 420], [-10, 0, 10]);

  const relativeIndex = (index - currentIndex + total) % total;
  const isTop = relativeIndex === 0;

  useEffect(() => {
    if (!isTop) {
      animate(x, 0, {
        type: "spring",
        stiffness: 360,
        damping: 34,
        mass: 0.55,
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
        stiffness: 420,
        damping: 30,
        mass: 0.5,
      });
      return;
    }

    const direction = info.offset.x > 0 ? 1 : -1;

    await animate(x, direction * 900, {
      type: "spring",
      stiffness: 300,
      damping: 32,
      mass: 0.65,
      velocity: info.velocity.x,
    });

    onNext();
  };

  const scale =
    relativeIndex === 0 ? 1 : relativeIndex === 1 ? 0.94 : 0.89;
  const y =
    relativeIndex === 0 ? 0 : relativeIndex === 1 ? 20 : 38;
  const stackRotate =
    relativeIndex === 0 ? 0 : relativeIndex % 2 === 0 ? -2 : 2;

  return (
    <motion.li
      className="absolute left-1/2 top-1/2 w-[min(68vw,520px)] -translate-x-1/2 -translate-y-1/2 list-none"
      style={{
        x,
        rotate: isTop ? rotate : stackRotate,
        zIndex: total - relativeIndex,
      }}
      animate={{
        y,
        scale,
        opacity: relativeIndex < 3 ? 1 : 0,
      }}
      transition={{
        y: {
          type: "spring",
          stiffness: 340,
          damping: 34,
          mass: 0.6,
        },
        scale: {
          type: "spring",
          stiffness: 340,
          damping: 34,
          mass: 0.6,
        },
        opacity: {
          duration: 0.18,
          ease: "easeOut",
        },
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.16}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{
        scale: 1.01,
        cursor: "grabbing",
      }}
    >
      <div className="overflow-hidden rounded-2xl">
        {renderCard(project)}
      </div>
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
    <div className="relative mx-auto h-[500px] w-full max-w-4xl overflow-visible touch-pan-y sm:h-[540px]">
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

      <p className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs tracking-wide text-text-muted">
        Swipe the top card
      </p>
    </div>
  );
}
