"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useRef, useState } from "react";

function ProjectDetails({ project }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {project.status}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
            {project.tagline}
          </p>
        </div>
        <span className="shrink-0 text-sm font-medium text-text-muted">
          {project.duration}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-width:thin]">
        <div className="space-y-4 text-sm leading-relaxed">
          {project.overview && (
            <div>
              <h4 className="mb-1 font-semibold text-text">Overview</h4>
              <p className="text-text-secondary">{project.overview}</p>
            </div>
          )}

          {project.problem && (
            <div>
              <h4 className="mb-1 font-semibold text-text">Problem</h4>
              <p className="text-text-secondary">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <h4 className="mb-1 font-semibold text-text">Solution</h4>
              <p className="text-text-secondary">{project.solution}</p>
            </div>
          )}

          {project.features?.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold text-text">Key Features</h4>
              <ul className="space-y-1.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-text-secondary">
                    <span className="mt-1 text-accent">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.contribution && (
            <div>
              <h4 className="mb-1 font-semibold text-text">My Contribution</h4>
              <p className="text-text-secondary">{project.contribution}</p>
            </div>
          )}

          <div>
            <h4 className="mb-2 font-semibold text-text">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-bg-secondary px-2.5 py-1 text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex shrink-0 items-center gap-4 border-t border-border pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
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
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectShowcase({ projects }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(
      projects.length - 1,
      Math.floor(progress * projects.length)
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  if (!projects?.length) return null;

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: projects.length * 85 + "vh" }}
    >
      <div className="sticky top-24 h-[calc(100vh-8rem)]">
        <div className="relative flex h-full min-h-[620px] items-center overflow-hidden rounded-[2rem] border border-border bg-card/80 p-6 shadow-card backdrop-blur sm:p-8">
          <div className="grid h-full w-full grid-cols-[minmax(0,1.25fr)_minmax(360px,0.9fr)] gap-8">
            <div className="flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, scale: 0.97, x: 24 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-lg">
                    {activeProject.images?.[0] ? (
                      <Image
                        src={activeProject.images[0]}
                        alt={activeProject.title}
                        fill
                        sizes="(min-width: 1280px) 58vw, 52vw"
                        className="object-cover"
                        priority={activeIndex === 0}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-text-muted">
                        No preview available
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full border border-border bg-bg/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text-secondary backdrop-blur">
                      {activeProject.status}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-h-0 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full"
                >
                  <ProjectDetails project={activeProject} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-7 right-7 flex items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.18em] text-text-muted">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-text-muted">/</span>
            <span className="text-xs font-semibold tracking-[0.18em] text-text-muted">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute right-0 top-8 flex flex-col overflow-hidden rounded-l-2xl border-y border-l border-border bg-bg/70 backdrop-blur">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={[
                  "border-b border-border px-3 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] last:border-b-0",
                  "transition-colors duration-300 [writing-mode:vertical-rl]",
                  index === activeIndex
                    ? "bg-accent text-white"
                    : "text-text-muted",
                ].join(" ")}
              >
                {String(index + 1).padStart(2, "0")} {project.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
