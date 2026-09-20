import { Github, Linkedin, Code2, Mail } from "lucide-react";
import { personal } from "@/app/lib/data/personal";
import Tooltip from "./Tooltip";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: personal.links.github, icon: Github },
  { label: "LinkedIn", href: personal.links.linkedin, icon: Linkedin },
  { label: "LeetCode", href: personal.links.leetcode, icon: Code2 },
];

const Footer = () => {
  return (
    <footer className="w-full px-[6%] sm:px-[10%] py-12 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-text">{personal.shortName}</p>
            <p className="text-sm text-text-muted mt-0.5">{personal.role}</p>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mt-3 justify-center sm:justify-start"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {personal.email}
            </a>
          </div>

          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <Tooltip key={link.label} label={link.label} position="top">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors"
                >
                  <link.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-6 text-sm text-text-muted">
          <p>© 2026 Chandra Sekhar Rao Thogiri. All rights reserved.</p>
          <p>Built with React / Next.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
