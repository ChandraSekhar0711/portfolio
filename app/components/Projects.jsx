"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { fadeUp, viewportOnce } from "@/app/lib/motion";
import { projects } from "@/app/lib/data/projects";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import MobileProjectStack from "./MobileProjectStack";
import ProjectShowcase from "./ProjectShowcase";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SectionWrapper id="projects" className="bg-bg-secondary/40">
      <SectionHeading
        eyebrow="My Portfolio"
        title="Projects"
        subtitle="A closer look at what I'm building. Scroll to explore each project."
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <ProjectShowcase projects={projects} />
      </motion.div>

      <MobileProjectStack
        projects={projects}
        onOpen={setSelectedProject}
      />

      <div className="lg:hidden">
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </SectionWrapper>
  );
};

export default Projects;
