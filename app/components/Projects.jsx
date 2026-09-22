"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";
import { projects } from "@/app/lib/data/projects";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectCardStack from "./ProjectCardStack";

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
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <ProjectCardStack
          projects={projects}
          renderCard={(project) => (
            <ProjectCard project={project} onOpen={setSelectedProject} />
          )}
        />
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionWrapper>
  );
};

export default Projects;
