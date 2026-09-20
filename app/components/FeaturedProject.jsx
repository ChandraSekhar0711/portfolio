import Image from "next/image";
import * as motion from "motion/react-client";
import { CheckCircle2, Circle, Clock, Github, ExternalLink, ImageOff } from "lucide-react";
import { fadeUp, scaleIn, stagger, viewportOnce } from "@/app/lib/motion";
import { featuredProject } from "@/app/lib/data/projects";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import Card from "./Card";
import Button from "./Button";

const STATUS_ICON = {
  done: <CheckCircle2 className="w-4 h-4 text-success" aria-hidden="true" />,
  "in-progress": <Clock className="w-4 h-4 text-warning" aria-hidden="true" />,
  planned: <Circle className="w-4 h-4 text-text-muted" aria-hidden="true" />,
};

const STATUS_LABEL = {
  done: "Done",
  "in-progress": "In Progress",
  planned: "Planned",
};

const FeaturedProject = () => {
  if (!featuredProject) return null;
  const project = featuredProject;

  return (
    <SectionWrapper id="featured-project">
      <SectionHeading eyebrow="Featured Project" title={project.title} subtitle={project.description} />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start"
      >
        <motion.div variants={scaleIn}>
          {project.images.length === 0 && (
            <Card hover={false} className="aspect-video flex flex-col items-center justify-center gap-2 text-text-muted">
              <ImageOff className="w-8 h-8" aria-hidden="true" />
              <p className="text-sm">Screenshots coming soon</p>
            </Card>
          )}

          {project.images.length === 1 && (
            <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-secondary">
                <span className="w-3 h-3 rounded-full bg-danger/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-warning/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-success/70" aria-hidden="true" />
              </div>
              <div className="relative aspect-video">
                <Image src={project.images[0]} alt={`${project.title} screenshot`} fill className="object-cover" />
              </div>
            </div>
          )}

          {project.images.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {project.images.map((src) => (
                <div key={src} className="relative aspect-video rounded-xl overflow-hidden border border-border">
                  <Image src={src} alt={`${project.title} screenshot`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          <span className="w-max text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-warning/10 text-warning border border-warning/30">
            {project.status}
          </span>

          <p className="text-text-secondary leading-relaxed">{project.overview}</p>

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

          <Card hover={false} className="p-5">
            <h3 className="text-sm font-semibold text-text mb-3">Build Progress</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.statusSteps.map((step) => (
                <li key={step.label} className="flex items-center gap-2 text-sm text-text-secondary">
                  {STATUS_ICON[step.state]}
                  <span>{step.label}</span>
                  <span className="text-xs text-text-muted ml-auto">{STATUS_LABEL[step.state]}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button href={project.github} variant="outline" icon={Github}>
              GitHub
            </Button>
            <Button href={project.demo} variant="primary" icon={ExternalLink}>
              Live Demo
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default FeaturedProject;
