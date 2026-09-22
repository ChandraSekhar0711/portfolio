import * as motion from "motion/react-client";
import { GraduationCap, Award } from "lucide-react";
import { fadeUp, scaleIn, viewportOnce } from "@/app/lib/motion";
import { education, certifications } from "@/app/lib/data/education";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";
import Card from "./Card";
import Image from "next/image";
import portfolioImage from "../../assets/portfolio.jpg";

const About = () => {
  return (
    <SectionWrapper id="about">
      <SectionHeading eyebrow="Introduction" title="About Me" />

      <div className="flex w-full flex-col lg:flex-row items-center gap-16 lg:gap-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="w-56 sm:w-72 shrink-0"
        >
          <Card
            hover={true}
            className="relative aspect-9/12 w-full overflow-hidden text-text-muted"
          >
            <Image src={portfolioImage} alt="Portrait of Chandra Sekhar Rao" fill className="object-cover" />
          </Card>
        </motion.div>

        <div className="flex-1 flex flex-col gap-5">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-text-secondary leading-relaxed"
          >
            I&apos;m a software engineer with around 5 years of experience working across frontend
            development, full-stack applications, cloud infrastructure and production engineering. My
            primary focus is building modern web applications with React.js, JavaScript and Next.js. I
            also work with Node.js, Python, REST APIs, AWS and cloud-native technologies.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-text-secondary leading-relaxed"
          >
            Alongside application development, I&apos;ve worked with CI/CD pipelines, Docker, Git and
            production support, giving me a broader understanding of how software moves from
            development to production and how systems are maintained reliably. I enjoy solving
            practical engineering problems, improving user experiences, and continuously learning.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-4 mt-2"
          >
            <Card className="p-5 flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-text text-sm">{education.degree}</h3>
                <p className="text-text-muted text-sm mt-0.5">
                  {education.school}, {education.location}
                </p>
              </div>
            </Card>
            {certifications.map((cert) => (
              <Card key={cert.title} className="p-5 flex items-start gap-3">
                <Award className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-text text-sm">{cert.title}</h3>
                  <p className="text-text-muted text-sm mt-0.5">{cert.issuer}</p>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
