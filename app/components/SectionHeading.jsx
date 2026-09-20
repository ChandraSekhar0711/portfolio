import * as motion from "motion/react-client";
import { fadeUp, viewportOnce } from "@/app/lib/motion";

const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }) => {
  const alignment = align === "left" ? "text-left mx-0" : "text-center mx-auto";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`mb-14 max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">{title}</h2>
      {subtitle && <p className="text-text-secondary mt-4 leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;
