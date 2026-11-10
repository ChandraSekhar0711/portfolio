"use client";

import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import TechStack from "./components/TechStack";
import FeaturedProject from "./components/FeaturedProject";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Model from "./components/Model";

export default function Home() {
  const [selectedView, setSelectedView] = useState(null);

  if (!selectedView) {
    return <Model onSelect={setSelectedView} />;
  }

  return (
    <>
      <NavBar />
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Skills />
      <TechStack />
      <FeaturedProject />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}
