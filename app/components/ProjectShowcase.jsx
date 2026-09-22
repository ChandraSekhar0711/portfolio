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

function ProjectCard({ project, index, activeIndex, onSelect }) {
  const isActive = index === activeIndex;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      className={[
        "absolute inset-0 w-full text-left rounded-[1.6rem] border bg-card shadow-card",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isActive ? "z-20 border-accent shadow-glow" : "z-10 pointer-events-none border-border",
      ].join(" ")}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.985 }}
      transition={spring}
      aria-hidden={!isActive}
    >
      <div className="p-5 sm:p-6">
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
          <span className="absolute left-4 top-4 rounded-full border border-border bg-bg/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary backdrop-blur">
            {project.status}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1.5 max-w-xl text-xs leading-6 text-text-secondary">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
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

  return (
    <div className="hidden lg:block">
      <div className="grid min-h-[590px] grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)] gap-6">
        <div className="relative min-h-[590px]">
          <div className="relative h-[540px] w-full">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            ))}

            <div className="absolute right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col overflow-hidden rounded-l-xl border border-border bg-bg/90 backdrop-blur">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={"View " + project.title}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "flex h-12 w-12 items-center justify-center border-b border-border text-xs font-semibold tracking-[0.12em] transition-all last:border-b-0",
                      isActive
                        ? "bg-accent text-white"
                        : "text-text-muted hover:bg-accent/10 hover:text-accent",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-center text-xs tracking-wide text-text-muted">
            Select a project
          </p>
        </div>

        <div className="h-[540px] min-h-0 overflow-hidden rounded-[1.75rem] border border-border bg-card/80 p-7 shadow-card backdrop-blur-xl sm:p-8">
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
