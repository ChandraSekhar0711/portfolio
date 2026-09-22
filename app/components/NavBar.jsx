"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FolderKanban,
  House,
  Mail,
  Code2,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { personal } from "@/app/lib/data/personal";

const NAV_LINKS = [
  { href: "#top", label: "Home", id: "top", icon: House },
  { href: "#experience", label: "Experience", id: "experience", icon: BriefcaseBusiness },
  { href: "#projects", label: "Projects", id: "projects", icon: FolderKanban },
  { href: "#skills", label: "Skills", id: "skills", icon: Code2 },
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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.15, 0.4, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => link.id === activeId)
  );

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
        className="fixed inset-x-4 bottom-3 z-50 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="relative mx-auto h-[68px] max-w-[390px]">
          <div className="absolute inset-x-0 bottom-0 h-[58px] rounded-[1.7rem] border border-border bg-card/95 shadow-[0_-10px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl" />

          <div
            className="pointer-events-none absolute left-0 top-0 h-[68px] w-1/5 transition-transform duration-300"
            style={{ transform: "translateX(" + activeIndex * 100 + "%)" }}
          >
            <div className="absolute left-1/2 top-0 h-[58px] w-[58px] -translate-x-1/2 rounded-full border border-accent/40 bg-bg shadow-[0_0_0_7px_var(--bg),0_8px_24px_rgba(0,0,0,0.35)]" />
            <div className="absolute left-1/2 top-[10px] h-[44px] w-[44px] -translate-x-1/2 rounded-full bg-accent text-accent-ink shadow-glow" />
          </div>

          <ul className="relative grid h-[68px] grid-cols-5 items-end">
            {NAV_LINKS.map((link, index) => {
              const Icon = link.icon;
              const active = activeId === link.id;

              return (
                <li key={link.href} className="flex h-[58px] items-center justify-center">
                  <a
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      "relative flex h-full w-full flex-col items-center justify-center gap-1 text-[9px] font-medium transition-all duration-300 " +
                      (active ? "text-accent" : "text-text-muted hover:text-text")
                    }
                  >
                    <span
                      className={
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 " +
                        (active ? "-translate-y-3 text-accent-ink" : "")
                      }
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className={active ? "mt-[-8px]" : ""}>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
