"use client";

import About from "./About";
import Hero from "./Hero";
import Projects from "./Projects";
import Services from "./Services";
import TechStack from "./TechStack";
import TopArticles from "./TopArticles";
import ContactMe from "./ContactMe";
import React, { Suspense } from "react";
import ExperienceSection from "./Experince";
import Proof from "./Proof";
import CaseStudy from "./CaseStudy";

// Dynamic import for heavy components
const Spotlight = React.lazy(() => import("../ui/animated-background"));

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <Spotlight />
      </Suspense>
      <Hero id="home" />
      <Proof id="proof" />
      <Services id="services" />
      <CaseStudy id="casestudy" />
      <TechStack id="techstack" />
      <About id="about" />
      <ExperienceSection id="experience" />
      <Projects id="projects" />
      <TopArticles id="toparticles" />
      <ContactMe id="contact" />
    </>
  );
}
