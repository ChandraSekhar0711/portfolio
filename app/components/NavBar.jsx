"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { personal } from "@/app/lib/data/personal";

const NAV_LINKS = [
  { href: "#top", label: "Home", id: "top", icon: House },
  { href: "#about", label: "About", id: "about", icon: UserRound },
  { href: "#experience", label: "Experience", id: "experience", icon: BriefcaseBusiness },
  { href: "#skills", label: "Skills", id: "skills", icon: Code2 },
  { href: "#projects", label: "Projects", id: "projects", icon: FolderKanban },
  { href: "#contact", label: "Contact", id: "contact", icon: Mail },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={
          "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 " +
          (isScrolled
            ? "bg-bg/80 py-3 backdrop-blur-lg lg:border-b lg:border-border"
            : "bg-transparent py-5")
        }
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-bold text-accent">
              CS
            </span>
            <span className="hidden font-semibold text-text sm:inline">
              Chandra Sekhar
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={
                    "rounded-full px-4 py-2 text-sm transition-colors " +
                    (activeId === link.id
                      ? "bg-accent/10 font-medium text-accent"
                      : "text-text-secondary hover:text-text")
                  }
                  aria-current={activeId === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href={personal.resumeUrl}
              download
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 lg:inline-flex"
            >
              Resume
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-border bg-card/90 px-2 py-2 shadow-glow backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <ul className="grid grid-cols-6 items-center">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const active = activeId === link.id;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "mx-0.5 flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[9px] font-medium transition-all " +
                    (active
                      ? "bg-accent/10 text-accent"
                      : "text-text-muted hover:text-text")
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
