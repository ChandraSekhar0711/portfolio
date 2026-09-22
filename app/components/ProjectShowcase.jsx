"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const spring = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.7,
};

function ProjectCard({
  project,
  index,
  currentIndex,
  total,
  onSelect,
  onNext,
}) {
  const relative = (index - currentIndex + total) % total;
  const isActive = relative === 0;
  const isVisible = relative <= 2;

  const x = relative * 22;
  const y = relative * 22;
  const scale = 1 - relative * 0.025;

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (isActive) return;
        onSelect(index);
      }}
      className={[
        "absolute left-0 top-0 h-full w-full text-left",
        "rounded-[1.5rem] border bg-card shadow-card",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isActive
          ? "border-accent shadow-glow"
          : "border-border",
        !isVisible ? "pointer-events-none" : "",
      ].join(" ")}
      style={{
        zIndex: total - relative,
        transformOrigin: "top left",
      }}
      animate={{
        x,
        y,
        scale,
        opacity: isVisible ? 1 : 0,
      }}
      transition={spring}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      whileDrag={isActive ? { cursor: "grabbing" } : undefined}
      onDragEnd={
        isActive
          ? (_, info) => {
              const shouldAdvance =
                Math.abs(info.offset.x) > 90 ||
                Math.abs(info.velocity.x) > 500;

              if (shouldAdvance) {
                onNext();
              }
            }
          : undefined
      }
    >
      {isActive ? (
        <div className="p-4 sm:p-5">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-bg-secondary">
            {project.images?.[0] ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(min-width: 1280px) 45vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-text-muted">
                No preview available
              </div>
            )}

            <span className="absolute left-3 top-3 rounded-full border border-border bg-bg/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-secondary backdrop-blur">
              {project.status}
            </span>

            <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white shadow-lg">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-3 min-w-0">
            <h3 className="text-xl font-bold tracking-tight text-text">
              {project.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-text-secondary">
              {project.tagline}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-bg-secondary/50 px-2 py-0.5 text-[11px] text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary text-xs font-semibold text-text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
    </motion.button>
  );
}

function ProjectDetails({ project, index, total }) {
  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin] overscroll-contain"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {project.status}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-text">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl text-xs leading-6 text-text-secondary">
            {project.tagline}
          </p>
        </div>

        <span className="shrink-0 text-xs font-semibold tracking-[0.18em] text-text-muted">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 flex shrink-0 gap-2.5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-text px-4 py-2 text-xs font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Code
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>

      <div className="my-4 border-t border-border" />

      <div className="min-w-0">
        <div className="space-y-4">
          <section>
            <h4 className="mb-1.5 text-sm font-semibold text-text">Overview</h4>
            <p className="text-xs leading-6 text-text-secondary">
              {project.overview || project.description}
            </p>
          </section>

          {project.features?.length > 0 && (
            <section>
              <h4 className="mb-1.5 text-xs font-semibold text-text">Key Features</h4>
              <ul className="space-y-1.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="mt-1 text-accent">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.problem && (
            <section>
              <h4 className="mb-2 text-base font-semibold text-text">Problem</h4>
              <p className="text-sm leading-7 text-text-secondary">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <h4 className="mb-2 text-base font-semibold text-text">Solution</h4>
              <p className="text-sm leading-7 text-text-secondary">{project.solution}</p>
            </section>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-secondary/40 p-3">
          <h4 className="mb-2 text-xs font-semibold text-text">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-2 py-0.5 text-[11px] text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-secondary/40 p-4">
          <h4 className="mb-2 text-sm font-semibold text-text">My Contribution</h4>
          <p className="text-sm leading-relaxed text-text-secondary">
            {project.contribution || "Designed and developed the project end to end."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectShowcase({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects?.length) return null;

  const activeProject = projects[activeIndex];

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  return (
    <div className="hidden lg:block">
      <div className="grid h-[760px] grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)] gap-6">
        <div className="relative h-[760px] min-h-0">
          <div className="relative h-[720px] w-full overflow-visible">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                currentIndex={activeIndex}
                total={projects.length}
                onSelect={setActiveIndex}
                onNext={showNext}
              />
            ))}
          </div>

          <p className="mt-2 text-center text-xs tracking-wide text-text-muted">
            Drag or click a card to explore
          </p>
        </div>

        <div className="h-[760px] min-h-0 overflow-hidden rounded-[1.75rem] border border-border bg-card/80 p-7 shadow-card backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            <ProjectDetails
              key={activeProject.slug}
              project={activeProject}
              index={activeIndex}
              total={projects.length}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
