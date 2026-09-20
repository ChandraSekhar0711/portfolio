"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Github, ExternalLink } from "lucide-react";
import { modalBackdrop, modalPanel } from "@/app/lib/motion";
import Button from "./Button";
import Tooltip from "./Tooltip";
import ImageCarousel from "./ImageCarousel";

const SECTIONS = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
];

const ProjectModal = ({ project, onClose }) => {
  const panelRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    previousFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          variants={modalBackdrop}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            variants={modalPanel}
            initial="hidden"
            animate="show"
            exit="exit"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-glow"
          >
            <Tooltip label="Close" position="bottom" className="absolute right-4 top-4 z-10">
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-bg-secondary text-text-secondary hover:text-accent transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </Tooltip>

            {project.images?.length > 0 && (
              <ImageCarousel
                key={project.slug}
                images={project.images}
                alt={`${project.title} screenshot`}
              />
            )}

            <div className="p-6 sm:p-8">
              <h2 id="project-modal-title" className="text-2xl font-bold text-text mb-1">
                {project.title}
              </h2>
              <p className="text-text-secondary mb-5">{project.tagline}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.demo && (
                  <Button href={project.demo} variant="primary" icon={ExternalLink} size="md">
                    Live Demo
                  </Button>
                )}
                {project.github && (
                  <Button href={project.github} variant="outline" icon={Github} size="md">
                    GitHub
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-5">
                {SECTIONS.map(
                  (section) =>
                    project[section.key] && (
                      <div key={section.key}>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-1.5">
                          {section.label}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">{project[section.key]}</p>
                      </div>
                    )
                )}

                {project.features?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                      Key Features
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm text-text-secondary flex gap-2">
                          <span className="text-accent mt-1">▪</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-bg-secondary border border-border text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.contribution && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-1.5">
                      My Contribution
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{project.contribution}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-1.5">
                    Current Status
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{project.status}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
