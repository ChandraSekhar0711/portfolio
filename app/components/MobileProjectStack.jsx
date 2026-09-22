"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const spring = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.7,
};

const positions = {
  "-2": { y: -445, x: 18, width: "88%", scale: 0.9 },
  "-1": { y: -370, x: 8, width: "94%", scale: 0.95 },
  "0": { y: -295, x: 0, width: "100%", scale: 1 },
  "1": { y: 300, x: 8, width: "94%", scale: 0.95 },
  "2": { y: 375, x: 18, width: "88%", scale: 0.9 },
};

export default function MobileProjectStack({ projects, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects?.length) return null;

  const goNext = () =>
    setActiveIndex((current) => Math.min(current + 1, projects.length - 1));

  const goPrevious = () =>
    setActiveIndex((current) => Math.max(current - 1, 0));

  return (
    <div className="lg:hidden">
      <div className="relative h-[800px] w-full overflow-visible">
        {projects.map((project, index) => {
          const relative = index - activeIndex;
          const isActive = relative === 0;
          const isVisible = Math.abs(relative) <= 2;
          const position = positions[String(relative)];

          return (
            <motion.button
              key={project.slug}
              type="button"
              onClick={() => {
                if (isActive) {
                  onOpen(project);
                } else {
                  setActiveIndex(index);
                }
              }}
              className={[
                "absolute left-1/2 top-1/2 overflow-hidden text-left",
                "rounded-2xl border bg-card shadow-card",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive
                  ? "h-[590px] border-accent shadow-glow"
                  : "h-[74px] border-border",
                !isVisible ? "pointer-events-none" : "",
              ].join(" ")}
              style={{
                width: position?.width || "88%",
                marginLeft: position
                  ? "-" + parseFloat(position.width) / 2 + "%"
                  : "-44%",
                zIndex: 20 - Math.abs(relative),
              }}
              animate={{
                x: position?.x || 0,
                y: position?.y || 0,
                scale: position?.scale || 0.88,
                opacity: isVisible ? (isActive ? 1 : 0.7) : 0,
              }}
              transition={spring}
              drag={isActive ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.18}
              onDragEnd={
                isActive
                  ? (_, info) => {
                      if (
                        Math.abs(info.offset.y) < 70 &&
                        Math.abs(info.velocity.y) < 450
                      ) {
                        return;
                      }

                      if (info.offset.y < 0 || info.velocity.y < -450) {
                        goNext();
                      } else {
                        goPrevious();
                      }
                    }
                  : undefined
              }
            >
              {isActive ? (
                <div className="p-3.5">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-bg-secondary">
                    {project.images?.[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        sizes="92vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-text-muted">
                        No preview available
                      </div>
                    )}

                    <span className="absolute left-2.5 top-2.5 rounded-full border border-border bg-bg/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary backdrop-blur">
                      {project.status}
                    </span>

                    <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold tracking-tight text-text">
                    {project.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">
                    {project.tagline}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-bg-secondary/50 px-2 py-0.5 text-[10px] text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                    Tap for full details
                  </p>
                </div>
              ) : (
                <div className="flex h-[74px] items-center gap-3 px-3.5">
                  <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-bg-secondary">
                    {project.images?.[0] && (
                      <Image
                        src={project.images[0]}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-accent/80">
                      Project {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="truncate text-sm font-semibold text-text">
                      {project.title}
                    </h3>
                  </div>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-secondary text-[10px] font-semibold text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <p className="mt-2 text-center text-[10px] tracking-wide text-text-muted">
        Swipe up/down or tap a card
      </p>
    </div>
  );
}
