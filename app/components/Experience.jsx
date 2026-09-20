import * as motion from "motion/react-client";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";
import { experience } from "@/app/lib/data/experience";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import Card from "./Card";

const Experience = () => {
  return (
    <SectionWrapper id="experience" className="bg-bg-secondary/40">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        subtitle="Where I've worked and what I've built."
      />

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden sm:block" aria-hidden="true" />

        <motion.ul
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-8"
        >
          {experience.map((job) => (
            <motion.li key={job.company} variants={fadeUp} className="relative sm:pl-14">
              <span className="absolute left-0 top-2 hidden sm:flex w-10 h-10 rounded-full bg-accent/10 border border-accent/30 items-center justify-center">
                <Briefcase className="w-4 h-4 text-accent" aria-hidden="true" />
              </span>

              <Card className="p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text">{job.role}</h3>
                    <p className="text-accent font-medium">{job.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 text-sm text-text-muted shrink-0">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {job.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {job.location} · {job.type}
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 mb-5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-text-secondary leading-relaxed flex gap-2.5">
                      <span className="text-accent mt-1.5">▪</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-bg-secondary border border-border text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
