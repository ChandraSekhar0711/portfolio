import * as motion from "motion/react-client";
import { ArrowRight, ArrowDown } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";
import { techEcosystem } from "@/app/lib/data/techEcosystem";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import Card from "./Card";

const TechStack = () => {
  return (
    <SectionWrapper id="tech-ecosystem" className="bg-bg-secondary/40">
      <SectionHeading
        eyebrow="How it fits together"
        title="Technology Ecosystem"
        subtitle="A rough map of how the pieces I work with connect, from browser to cloud."
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col lg:flex-row items-stretch gap-3"
      >
        {techEcosystem.map((layer, index) => (
          <motion.div key={layer.layer} variants={fadeUp} className="flex items-center gap-3 flex-1">
            <Card className="p-5 w-full" hover={false}>
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">
                {layer.layer}
              </p>
              <div className="flex flex-col gap-1">
                {layer.items.map((item) => (
                  <span key={item} className="text-sm text-text-secondary">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
            {index < techEcosystem.length - 1 && (
              <span className="text-text-muted shrink-0" aria-hidden="true">
                <ArrowRight className="w-4 h-4 hidden lg:block" />
                <ArrowDown className="w-4 h-4 lg:hidden" />
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default TechStack;
