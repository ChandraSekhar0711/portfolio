"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const cardSpring = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.7,
};

function ProjectCard({ project, index, activeIndex, total, onSelect }) {
  const isActive = index === activeIndex;
  const relative = (index - activeIndex + total) % total;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      className={[
        "absolute left-0 top-0 w-full text-left",
        "rounded-[1.75rem] border bg-card shadow-card",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isActive
          ? "z-30 border-accent shadow-glow"
          : "z-10 border-border hover:border-accent/50",
      ].join(" ")}
      animate={{
        y: isActive ? 0 : 30 + relative * 22,
        scale: isActive ? 1 : Math.max(0.9, 0.96 - relative * 0.025),
        opacity: isActive ? 1 : Math.max(0.45, 0.78 - relative * 0.12),
      }}
      transition={cardSpring}
      style={{ pointerEvents: isActive ? "auto" : "auto" }}
    >
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="p-5 sm:p-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-bg-secondary">
            {project.images?.[0] ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-text-muted">
                No preview available
              </div>
            )}

            <span className="absolute left-3 top-3 rounded-full border border-border bg-bg/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary backdrop-blur">
              {project.status}
            </span>
          </div>
        </div>

        <div className="flex min-h-full flex-col justify-center border-t border-border p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Project {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-text">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {project.tagline}
              </p>
            </div>

            <span className="shrink-0 rounded-lg bg-accent/15 px-3 py-2 text-xs font-bold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="border-t border-border p-5 sm:p-6">
          <h4 className="mb-3 text-sm font-semibold text-text">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-bg-secondary/50 px-2.5 py-1 text-xs text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border p-5 sm:p-6 lg:border-l">
          <h4 className="mb-2 text-sm font-semibold text-text">My Contribution</h4>
          <p className="line-clamp-4 text-sm leading-relaxed text-text-secondary">
            {project.contribution || "Designed and developed the project end to end."}
          </p>
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
      className="flex h-full min-h-0 flex-col"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {project.status}
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-text">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
            {project.tagline}
          </p>
        </div>

        <span className="shrink-0 text-xs font-semibold tracking-[0.18em] text-text-muted">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5 flex shrink-0 gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl bg-text px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
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
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>

      <div className="my-5 border-t border-border" />

      <div className="min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-width:thin]">
        <div className="space-y-6">
          <section>
            <h4 className="mb-2 text-base font-semibold text-text">Overview</h4>
            <p className="text-sm leading-7 text-text-secondary">
              {project.overview || project.description}
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-base font-semibold text-text">About the Project</h4>
            <p className="text-sm leading-7 text-text-secondary">
              {project.description}
            </p>
          </section>

          {project.problem && (
            <section>
              <h4 className="mb-2 text-base font-semibold text-text">Problem</h4>
              <p className="text-sm leading-7 text-text-secondary">
                {project.problem}
              </p>
            </section>
          )}

          {project.solution && (
            <section>
              <h4 className="mb-2 text-base font-semibold text-text">Solution</h4>
              <p className="text-sm leading-7 text-text-secondary">
                {project.solution}
              </p>
            </section>
          )}

          {project.features?.length > 0 && (
            <section>
              <h4 className="mb-3 text-base font-semibold text-text">Key Features</h4>
              <ul className="space-y-2">
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
      <div className="grid min-h-[650px] grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] gap-7">
        <div className="relative min-h-[650px] pb-2 pt-2">
          <div className="relative h-[600px] w-full">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                activeIndex={activeIndex}
                total={projects.length}
                onSelect={setActiveIndex}
              />
            ))}
          </div>

          <p className="mt-3 text-center text-xs tracking-wide text-text-muted">
            Click a project to view its details
          </p>
        </div>

        <div className="min-h-[650px] rounded-[1.75rem] border border-border bg-card/80 p-7 shadow-card backdrop-blur-xl sm:p-8">
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
