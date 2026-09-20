"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";
import { projects } from "@/app/lib/data/projects";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SectionWrapper id="projects" className="bg-bg-secondary/40">
      <SectionHeading
        eyebrow="My Portfolio"
        title="Projects"
        subtitle="A closer look at what I'm building. Click a card for the full story."
      />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={fadeUp}>
            <ProjectCard project={project} onOpen={setSelectedProject} />
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionWrapper>
  );
};

export default Projects;
