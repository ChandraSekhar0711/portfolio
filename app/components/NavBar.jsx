"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Tooltip from "./Tooltip";
import { personal } from "@/app/lib/data/personal";
import { drawerPanel } from "@/app/lib/motion";

const NAV_LINKS = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#resume", label: "Resume", id: "resume" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg/80 backdrop-blur-lg border-b border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 lg:px-8 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
              CS
            </span>
            <span className="font-semibold text-text hidden sm:inline">Chandra Sekhar</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeId === link.id
                      ? "text-accent bg-accent/10 font-medium"
                      : "text-text-secondary hover:text-text"
                  }`}
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
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-ink text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Resume
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Tooltip label="Open menu" className="md:hidden">
              <button
                className="w-9 h-9 flex items-center justify-center text-text"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </Tooltip>          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.ul
              key="drawer"
              variants={drawerPanel}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-card border-l border-border flex flex-col gap-2 py-20 px-8 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <Tooltip label="Close menu" position="bottom" className="absolute right-6 top-6">
                <button
                  className="w-9 h-9 flex items-center justify-center text-text"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </Tooltip>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className={`block py-2.5 text-lg transition-colors ${
                      activeId === link.id ? "text-accent font-medium" : "text-text hover:text-accent"
                    }`}
                    href={link.href}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
