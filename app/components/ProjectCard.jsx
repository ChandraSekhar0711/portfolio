"use client";

import Image from "next/image";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";

const ProjectCard = ({ project, onOpen }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      className="group relative rounded-2xl border border-border bg-card shadow-card overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-video bg-bg-secondary flex items-center justify-center overflow-hidden">
        {project.images?.[0] ? (
          <Image src={project.images[0]} alt="" fill className="object-cover" />
        ) : (
          <UtensilsCrossed
            className="w-10 h-10 text-accent/40"
            aria-hidden="true"
          />
        )}
        <span className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-bg/90 backdrop-blur border border-border text-text-secondary">
          {project.status}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-text">{project.title}</h3>
          <ArrowUpRight
            className="w-4 h-4 text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-bg-secondary border border-border text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
