import { FileText, Download } from "lucide-react";
import { personal } from "@/app/lib/data/personal";
import SectionWrapper from "./SectionWrapper";
import Card from "./Card";
import Button from "./Button";

const HIGHLIGHTS = [
  "React.js",
  "JavaScript",
  "Next.js",
  "Node.js",
  "Python",
  "AWS",
  "CI/CD",
  "Docker",
  "Git",
  "Production Engineering",
];

const Resume = () => {
  return (
    <SectionWrapper id="resume">
      <Card hover={false} className="p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-text mb-3">Experience, skills and projects — in one place.</h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto lg:mx-0">
            My full resume covers my experience at Tata Consultancy Services, technical skills and
            education in more detail.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
            {HIGHLIGHTS.map((item) => (
              <span
                key={item}
                className="text-xs font-medium px-3 py-1 rounded-full bg-bg-secondary border border-border text-text-secondary"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button href={personal.resumeUrl} variant="outline" icon={FileText} size="lg">
              View Resume
            </Button>
            <Button href={personal.resumeUrl} download variant="primary" icon={Download} size="lg">
              Download Resume
            </Button>
          </div>
        </div>
      </Card>
    </SectionWrapper>
  );
};

export default Resume;
