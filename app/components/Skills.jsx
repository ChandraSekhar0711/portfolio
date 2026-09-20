import * as motion from "motion/react-client";
import { Code2, Server, Database, Cloud, Wrench } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";
import { skillGroups } from "@/app/lib/data/skills";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import Card from "./Card";

const ICONS = { Code2, Server, Database, Cloud, Wrench };

const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        eyebrow="Toolbox"
        title="Skills"
        subtitle="Grouped by where I use them, not ranked by arbitrary percentages."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {skillGroups.map((group) => {
          const Icon = ICONS[group.icon];
          return (
            <motion.div key={group.category} variants={fadeUp} whileHover={{ y: -4 }}>
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold text-text">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-bg-secondary border border-border text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
};

export default Skills;
