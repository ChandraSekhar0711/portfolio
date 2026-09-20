import * as motion from "motion/react-client";
import { Github, Linkedin, Code2, ArrowRight, Download } from "lucide-react";
import { fadeUp, fadeIn, scaleIn, stagger } from "@/app/lib/motion";
import { personal } from "@/app/lib/data/personal";
import Button from "./Button";
import HeroCode from "./HeroCode";
import Tooltip from "./Tooltip";

const Hero = () => {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen flex items-center px-[6%] sm:px-[10%] pt-32 pb-20"
    >
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex w-max items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-text-secondary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {personal.availability}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.1] text-text"
          >
            Frontend Engineer building scalable, reliable and{" "}
            <span className="text-gradient">user-focused web experiences.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-xl text-text-secondary text-lg leading-relaxed">
            Software engineer with around {personal.yearsExperience} years of experience building modern
            web applications and production systems using React.js, JavaScript, Next.js, Node.js, Python
            and AWS.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 mt-2">
            <Button href="#projects" variant="primary" size="lg" icon={ArrowRight}>
              View Projects
            </Button>
            <Button href={personal.resumeUrl} download variant="outline" size="lg" icon={Download}>
              Download Resume
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              Contact Me
            </Button>
          </motion.div>

          <motion.div variants={fadeIn} className="flex items-center gap-4 mt-2">
            <Tooltip label="GitHub">
              <a
                href={personal.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            </Tooltip>
            <Tooltip label="LinkedIn">
              <a
                href={personal.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </Tooltip>
            <Tooltip label="LeetCode">
              <a
                href={personal.links.leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode profile"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
              >
                <Code2 className="w-4 h-4" aria-hidden="true" />
              </a>
            </Tooltip>
          </motion.div>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate="show" className="w-full">
          <HeroCode />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
