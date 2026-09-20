import * as motion from "motion/react-client";
import { fadeUp, stagger, viewportOnce } from "@/app/lib/motion";
import { personal } from "@/app/lib/data/personal";

const STATS = [
  { value: personal.yearsExperience, label: "Years Experience" },
  { value: "React / Next.js", label: "Primary Focus" },
  { value: "Full Stack", label: "Development" },
  { value: "AWS Certified", label: "Cloud" },
];

const Stats = () => {
  return (
    <section className="w-full px-[6%] sm:px-[10%] py-16 border-y border-border bg-bg-secondary/40">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <p className="text-2xl sm:text-3xl font-bold text-text">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
