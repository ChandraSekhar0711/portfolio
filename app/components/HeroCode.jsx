import * as motion from "motion/react-client";
import { fadeUp, stagger } from "@/app/lib/motion";

const CODE_LINES = [
  { key: "frontend", label: "frontend", value: '["React", "Next.js"]' },
  { key: "backend", label: "backend", value: '["Node.js", "Python"]' },
  { key: "cloud", label: "cloud", value: '["AWS"]' },
  { key: "devops", label: "devops", value: '["Docker", "CI/CD"]' },
];

const HeroCode = () => {
  return (
    <motion.div
      variants={stagger(0.08, 0.3)}
      initial="hidden"
      animate="show"
      className="relative rounded-2xl border border-border bg-card shadow-card overflow-hidden font-mono text-sm"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-secondary">
        <span className="w-3 h-3 rounded-full bg-danger/70" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-warning/70" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-success/70" aria-hidden="true" />
        <span className="ml-3 text-xs text-text-muted">engineer.js</span>
      </div>

      <div className="p-6 leading-7">
        <p className="text-text-secondary">
          <span className="text-accent-2">const</span> engineer = {"{"}
        </p>
        {CODE_LINES.map((line) => (
          <motion.p key={line.key} variants={fadeUp} className="pl-4 text-text-secondary">
            <span className="text-text">{line.label}</span>:{" "}
            <span className="text-accent">{line.value}</span>,
          </motion.p>
        ))}
        <p className="text-text-secondary">
          {"}"}
          <span className="inline-block w-2 h-4 ml-1 bg-accent align-middle animate-pulse" aria-hidden="true" />
        </p>
      </div>
    </motion.div>
  );
};

export default HeroCode;
