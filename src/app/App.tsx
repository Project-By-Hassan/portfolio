/// <reference path="../vite-env-pdf.d.ts" />
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, type Variants, AnimatePresence } from 'framer-motion';
import svgPaths from "./imports/svg-6sovak61ez";
import imgAdobeExpressFile31 from "figma:asset/7ba16f5335969b66c314f7955ee4897ab548acd6.png";

// Certificate image imports
import certAiFundamentals from '../assets/certificate/AI FUNDAMENTALS.png';
import certAiAppBuilding from '../assets/certificate/AI FOR APP BUILDING.png';
import certAiResearch from '../assets/certificate/AI FOR RESEARCH AND INSIGHTS.png';
import certAiBrainstorming from '../assets/certificate/AI FOR BRAINSTORMING AND PLANNING.png';
import certAiDataAnalysis from '../assets/certificate/AI FOR DATA ANALYSIS.png';
import certAiContentCreation from '../assets/certificate/AI FOR CONTENT CREATION.png';
import certAiWriting from '../assets/certificate/AI FOR WRITING AND COMMUNICATING.png';
import certWebDev from '../assets/certificate/WEB DEVELOPMENT.png';
import certCanva from '../assets/certificate/GRAPHICAL DESIGNING.png';
import certVideoEditing from '../assets/certificate/VIDEO EDITING.png';
import certAffiliate from '../assets/certificate/DIGISTORE24.png';

// Project screenshot imports
import resumeBuilderImage from '../assets/projects/resumebuilder.png';
import proDocImage from '../assets/projects/prodoc.png';
import docuMineImage from '../assets/projects/documine.png';
import scholarAiImage from '../assets/projects/scholarai.png';
import animatedImage from '../assets/projects/AI&Full-stack.png';
import pyQuestImage from '../assets/projects/pyquest30.png';
import qrAttendanceImage from '../assets/projects/qrattendance.png';
import normalizationImage from '../assets/projects/normalization.png';

// Education transcript imports
import transcriptBachelor from '../assets/educations/BACHELOR.png';
import transcriptInter from '../assets/educations/12TH.jpg';
import transcriptMatric from '../assets/educations/10TH.jpg';

/* ---------- shared animation variants ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08 },
  }),
};

/* ---------- scroll progress bar ---------- */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
    />
  );
}

/* ---------- navigation ---------- */

function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contacts', label: 'Contacts' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1f1f1f]/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`font-normal text-[16px] md:text-[18px] transition-colors duration-200 ${activeSection === item.id ? 'text-[#f8f7f9]' : 'text-[#f8f7f9]/60 hover:text-[#f8f7f9]'
                    }`}
                >
                  {item.label}
                </button>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <div className="h-11 w-px bg-[#f8f7f9]/30" />
            <div className="flex gap-6">
              <SocialIcon type="instagram" />
              <SocialIcon type="twitter" />
              <IconLink type="github" href="https://github.com/Project-By-Hassan" />
              <IconLink type="linkedin" href="https://www.linkedin.com/in/hassan-raza-410a4b419" />
              <IconLink type="whatsapp" href="https://wa.me/923187755408" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function SocialIcon({ type }: { type: string }) {
  const getPath = () => {
    if (type === 'instagram') {
      return (
        <>
          <path d={svgPaths.p4fdb300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p39557800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M17.5 6.5H17.51" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </>
      );
    }
    return <path d={svgPaths.p3350a500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.15, rotate: -6 }}
      whileTap={{ scale: 0.9 }}
      className="text-[#f8f7f9]/80 hover:text-[#f8f7f9] transition-colors duration-200"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        {getPath()}
      </svg>
    </motion.button>
  );
}

function IconLink({ type, href }: { type: string; href: string }) {
  const renderIcon = () => {
    if (type === 'github') {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path
            d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.6 2.7 5.5 3 5.5 3a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 9.4c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
        </svg>
      );
    }
    if (type === 'linkedin') {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path
            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
          <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.34 0-7.87 3.53-7.87 7.87 0 1.39.36 2.74 1.05 3.93L4 20l4.3-1.13a7.86 7.86 0 0 0 3.75.96h.003c4.34 0 7.87-3.53 7.87-7.87a7.85 7.85 0 0 0-2.32-5.64zm-5.55 12.1h-.003a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.48.65.66-2.42-.16-.25a6.53 6.53 0 0 1-1-3.48c0-3.62 2.95-6.57 6.58-6.57a6.53 6.53 0 0 1 4.65 1.93 6.53 6.53 0 0 1 1.93 4.65c0 3.62-2.95 6.55-6.57 6.55zm3.6-4.91c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.45.1-.13.2-.51.64-.62.77-.12.13-.23.15-.43.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.1.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34h-.38c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.67s.72 1.94.82 2.07c.1.13 1.4 2.15 3.4 3.01.48.2.85.33 1.14.42.48.15.91.13 1.26.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23z" />
      </svg>
    );
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, rotate: -6 }}
      whileTap={{ scale: 0.9 }}
      className="text-[#f8f7f9]/80 hover:text-[#f8f7f9] transition-colors duration-200"
    >
      {renderIcon()}
    </motion.a>
  );
}

/* ---------- hero ---------- */

function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[905px] h-[897px]"
        >
          <svg className="w-full h-full" viewBox="0 0 1417 1409">
            <defs>
              <filter id="blur" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="128" />
              </filter>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f0abfc" />
              </linearGradient>
            </defs>
            <ellipse cx="708.5" cy="704.5" rx="452.5" ry="448.5" fill="url(#heroGradient)" filter="url(#blur)" />
          </svg>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="space-y-4">
            <p className="font-bold text-[20px] md:text-[24px] text-[#f8f7f9]/90 tracking-wide">
              HI, I'M HASSAN RAZA
            </p>
            <h1 className="font-bold text-[46px] sm:text-[64px] lg:text-[84px] leading-[1.05] tracking-tight text-[#f8f7f9]">
              I'M AN{' '}
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI DEVELOPER
              </span>
            </h1>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}>
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative border-2 border-[#f8f7f9] px-8 py-4 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-transparent"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative font-bold text-[20px] md:text-[24px] text-[#f8f7f9] transition-colors duration-300">
                VIEW MY PROJECTS
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right content - Profile image */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="absolute -inset-3 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-2xl blur-2xl" />
            <div
              className="relative w-full h-[520px] sm:h-[600px] lg:h-[760px] bg-cover bg-center bg-no-repeat rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
              style={{ backgroundImage: `url('${imgAdobeExpressFile31}')` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- section heading (reused) ---------- */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUp}
      className="mb-12 flex items-center gap-6"
    >
      <h2 className="font-bold text-[56px] sm:text-[72px] lg:text-[96px] text-[#f8f7f9]">
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        style={{ originX: 0 }}
        className="hidden md:block h-[3px] flex-1 rounded-full bg-gradient-to-r from-indigo-400/60 via-purple-400/40 to-transparent"
      />
    </motion.div>
  );
}

/* ---------- timeline dot (reused, glowing/pulsing) ---------- */

function TimelineDot() {
  return (
    <div className="absolute left-[-9px] top-[12px] w-[15px] h-[15px]">
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full rounded-full bg-gradient-to-br from-indigo-300 to-purple-300"
        style={{ filter: 'blur(0.3px)' }}
      />
    </div>
  );
}

/* ---------- about ---------- */

function AboutSection() {
  const education = [
    {
      school: 'University Of Rasul',
      period: '2025 — Present',
      detail: 'BSAI (Bachelor of Science in Artificial Intelligence) — 3rd Semester, CGPA 3.69',
      transcript: transcriptBachelor
    },
    {
      school: 'Superior College Gojra',
      period: '2022 — 2024',
      detail: 'Intermediate — 85%',
      transcript: transcriptInter
    },
    {
      school: 'Govt. High School Rukkan',
      period: '2020 — 2022',
      detail: 'Matric — 90%',
      transcript: transcriptMatric
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>About me</SectionHeading>

        <div className="max-w-4xl space-y-6">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={0}
            className="font-normal text-[19px] md:text-[22px] text-[rgba(248,247,249,0.6)] leading-[1.6]"
          >
            I'm a passionate BSAI (Bachelor of Science in Artificial Intelligence) student at University of Rasul, working as an AI/ML Developer, Python Developer, and Graphic Designer with a strong interest in building AI assistants and intelligent applications.
          </motion.p>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={1}
            className="font-normal text-[19px] md:text-[22px] text-[rgba(248,247,249,0.6)] leading-[1.6]"
          >
            I love turning ideas into working AI-powered products — from document intelligence tools to resume builders and learning platforms. I'm constantly exploring machine learning, automation, and practical AI applications, while sharpening my skills in Python development and clean, user-friendly design. Always eager to learn, build, and take on new challenges in the world of Artificial Intelligence.
          </motion.p>
        </div>

        {/* Education */}
        <div className="mt-20">
          <motion.h3
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-bold text-[22px] text-[#f8f7f9] mb-8 tracking-wide"
          >
            EDUCATION
          </motion.h3>
          <div className="max-w-4xl space-y-3">
            {education.map((edu, i) => (
              <motion.a
                key={edu.school}
                href={edu.transcript}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={i}
                whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.04)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group flex items-start justify-between gap-4 rounded-xl p-4 -ml-4 border border-transparent hover:border-white/10 transition-all duration-200 cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-extrabold text-[20px] md:text-[22px] text-[rgba(248,247,249,0.85)] group-hover:text-white transition-colors duration-200">
                      {edu.school}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                      {edu.period}
                    </span>
                  </div>
                  <p className="font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
                    {edu.detail}
                  </p>
                </div>
                <div className="shrink-0 mt-1 flex items-center gap-1 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  <span>View Transcript</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-20">
          <motion.h3
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-bold text-[22px] text-[#f8f7f9] mb-8 tracking-wide"
          >
            EXPERIENCE
          </motion.h3>
          <div className="space-y-10">
            <ExperienceItem
              index={0}
              title="AI & SOFTWARE DEVELOPER"
              period="Freelance / Independent Projects — 2024 - Present"
              description="Architected and deployed production-ready Artificial Intelligence applications and full-stack systems. Specialized in building custom automated workflows, LLM integrations, and interactive web tools utilizing the Python ecosystem, C++, and Streamlit. Deployed scalable solutions including intelligent document analysis parsers, automated API middleware, and interactive user interfaces."
            />
            <ExperienceItem
              index={1}
              title="FULL-STACK & AUTOMATION DEVELOPER"
              period="Open-Source Contributions / Remote Contracts — 2025 - 2026"
              description="Designed and developed comprehensive end-to-end automation systems, including secure WhatsApp automation frameworks and custom database optimization engines. Focused on structuring relational normalization solutions, integrating robust webhook architectures (n8n/Green-API), and designing responsive front-end dashboard interfaces with an emphasis on seamless user experience and state management."
            />
            <ExperienceItem
              index={2}
              title="GRAPHIC DESIGNER"
              period="Card Maker — 2022"
              description="Worked as a Graphic Designer at Card Maker, creating visual designs and card layouts, sharpening my skills in visual composition, branding, and creative software tools."
            />
            <ExperienceItem
              index={3}
              title="AFFILIATE MARKETER"
              period="Skillsider — 2023"
              description="Worked as an Affiliate Marketer at Skillsider, promoting products and services, building marketing strategies, and gaining hands-on experience in digital marketing and audience growth."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ title, period, description, index }: { title: string; period: string; description: string; index: number }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={index}
      whileHover={{ x: 8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="max-w-4xl relative pl-8"
    >
      <TimelineDot />
      <h4 className="font-extrabold text-[20px] md:text-[22px] text-[rgba(248,247,249,0.85)] mb-1">{title}</h4>
      <p className="font-extralight text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] mb-3">{period}</p>
      <p className="font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] leading-[1.6] max-w-3xl">{description}</p>
    </motion.div>
  );
}

/* ---------- skills ---------- */

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      custom={index}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative rounded-2xl p-5 bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden group"
    >
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <div className="relative">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-[16px] text-[rgba(248,247,249,0.85)]">{name}</span>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-300">{level}%</span>
        </div>

        {/* Track */}
        <div className="h-[6px] rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
          />
        </div>
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  const skills = [
    { name: 'Python Programming', level: 95 },
    { name: 'C++ Programming', level: 85 },
    { name: 'AI & Machine Learning', level: 90 },
    { name: 'Next.js', level: 88 },
    { name: 'Full-Stack Web Dev', level: 85 },
    { name: 'Database Design', level: 90 },
    { name: 'Automation Architecture', level: 87 },
    { name: 'n8n & APIs', level: 85 },
    { name: 'GitHub Management', level: 90 },
    { name: 'Flet Development', level: 80 },
    { name: 'Graphic Design', level: 78 },
    { name: 'Affiliate Marketing', level: 75 },
    { name: 'Prompting', level: 92 },
    { name: 'Streamlit', level: 88 },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>My Skills</SectionHeading>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- projects ---------- */

function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'Resume Builder Pro',
      period: 'AI Resume Builder',
      description: 'A polished AI-powered resume creation platform that helps users generate professional, tailored resumes quickly with a smooth and intuitive Streamlit experience.',
      image: resumeBuilderImage,
      liveLink: 'https://ai-resume-maker-v2.streamlit.app',
      tags: ['AI', 'Streamlit', 'Python', 'Resume Builder']
    },
    {
      id: 2,
      title: 'ProDoc Ultra v11',
      period: 'Document Analysis Platform',
      description: 'An advanced document intelligence workspace for reviewing and extracting insights from business and academic files through AI-assisted workflows.',
      image: proDocImage,
      liveLink: 'https://appoc-ultra-v11-oryvdsbusa67tzdphcyrjc.streamlit.app',
      tags: ['Document Analysis', 'AI', 'System Panel', 'Python']
    },
    {
      id: 3,
      title: 'DocuMine Ultra v12',
      period: 'PDF Analysis System',
      description: 'A next-generation PDF analysis experience built to extract text, surface structure, and organize document content with AI-powered assistance.',
      image: docuMineImage,
      liveLink: 'https://docu-mine.streamlit.app',
      tags: ['PDF Analysis', 'AI-Powered', 'Text Extraction', 'Python']
    },
    {
      id: 4,
      title: 'ScholarAI Scholarship Application Assistant',
      period: 'Academic Support Platform',
      description: 'An intelligent scholarship assistant that helps students prepare and organize academic applications with structured guidance and AI support.',
      image: scholarAiImage,
      liveLink: 'https://scholarai-for-students.streamlit.app',
      tags: ['Education', 'AI', 'Academic Documents', 'Streamlit']
    },
    {
      id: 5,
      title: 'AI & Software Architecture',
      period: 'Interactive Systems Showcase',
      description: 'A visually rich interactive app that demonstrates full-stack software ideas, neural network concepts, and modern Python ecosystem capabilities.',
      image: animatedImage,
      liveLink: 'https://animated.streamlit.app',
      tags: ['Full-Stack Systems', 'Neural Networks', 'Python Ecosystem', 'Interactive Web']
    },
    {
      id: 6,
      title: 'PyQuest 30',
      period: '30-Day Python Learning Journey',
      description: 'A structured 30-day learning experience designed to guide beginners through Python fundamentals with daily lessons and practical exercises.',
      image: pyQuestImage,
      liveLink: 'https://py30day.streamlit.app',
      tags: ['Python Programming', '30-Day Learning', 'Education']
    },
    {
      id: 7,
      title: 'QR & Online Attendance System (UOR)',
      period: 'Smart University Attendance Portal',
      description: 'A practical attendance platform that uses QR-based check-ins to streamline student participation and reduce manual recordkeeping.',
      image: qrAttendanceImage,
      liveLink: 'https://qr-and-online-attendance-system.streamlit.app',
      tags: ['Smart Attendance Portal', 'QR Code', 'University Project']
    },
    {
      id: 8,
      title: 'Academic Relational Normalization Guide & Assistant',
      period: 'Database Learning Assistant',
      description: 'An interactive guide for understanding database normalization concepts with AI-assisted explanations and dataset uploads for hands-on learning.',
      image: normalizationImage,
      liveLink: 'https://relational-normalization-oracle.streamlit.app',
      tags: ['Database Normalization', 'AI Guide', 'Dataset Upload']
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ title, period, description, liveLink, tags, image, index }: { title: string; period: string; description: string; liveLink?: string; tags?: string[]; image?: string; index: number }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} custom={index}
      whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="max-w-4xl relative rounded-xl p-5 -ml-5 border border-transparent hover:border-white/10"
    >
      <div className="pl-8 relative">
        <TimelineDot />
        {liveLink ? (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-extrabold text-[20px] md:text-[22px] text-[rgba(248,247,249,0.85)] mb-1 hover:text-white transition-colors duration-200"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-indigo-300 to-purple-300 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-[background-size] duration-300 pb-1">
              {title}
            </span>
            <motion.span
              className="inline-block"
              initial={{ x: 0, opacity: 0.6 }}
              whileHover={{ x: 4, opacity: 1 }}
            >
              →
            </motion.span>
          </a>
        ) : (
          <h3 className="font-extrabold text-[20px] md:text-[22px] text-[rgba(248,247,249,0.85)] mb-1">{title}</h3>
        )}
        <p className="font-extralight text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] mb-3">{period}</p>
        <p className="font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] leading-[1.6] max-w-3xl">{description}</p>

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[rgba(248,247,249,0.65)]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {image && (
          <div className="mt-4 overflow-hidden rounded-lg border border-white/10 max-w-[320px]">
            <img src={image} alt={title} className="h-auto w-full object-cover" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- certifications ---------- */

function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const certifications = [
    {
      title: "AI Fundamentals",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiFundamentals,
      category: "AI & Machine Learning"
    },
    {
      title: "AI for App Building",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiAppBuilding,
      category: "AI & Machine Learning"
    },
    {
      title: "AI for Research and Insights",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiResearch,
      category: "AI & Machine Learning"
    },
    {
      title: "AI for Brainstorming and Planning",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiBrainstorming,
      category: "AI & Machine Learning"
    },
    {
      title: "AI for Data Analysis",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiDataAnalysis,
      category: "AI & Machine Learning"
    },
    {
      title: "AI for Content Creation",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiContentCreation,
      category: "AI & Machine Learning"
    },
    {
      title: "AI for Writing and Communicating",
      organization: "Google & Coursera",
      year: "2026",
      link: certAiWriting,
      category: "AI & Machine Learning"
    },
    {
      title: "Complete Professional Website Development",
      organization: "Skillsider",
      year: "2023",
      link: certWebDev,
      category: "Development & Media"
    },
    {
      title: "Canva Course (From Beginner to Pro)",
      organization: "Skillsider",
      year: "2022",
      link: certCanva,
      category: "Development & Media"
    },
    {
      title: "CapCut Mobile Video Editing",
      organization: "Skillsider",
      year: "2022",
      link: certVideoEditing,
      category: "Development & Media"
    },
    {
      title: "Digistore24 Affiliate Marketing",
      organization: "Skillsider",
      year: "2022",
      link: certAffiliate,
      category: "Development & Media"
    }
  ];

  const categories = ["All", "AI & Machine Learning", "Development & Media"];

  const filteredCerts = certifications.filter(
    (cert) => activeCategory === "All" || cert.category === activeCategory
  );

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Certifications</SectionHeading>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${activeCategory === category
                  ? 'text-white border border-transparent'
                  : 'text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.01]'
                }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="active-cert-category"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {category}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                className="group relative flex flex-col rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Certificate image thumbnail */}
                <div className="relative h-44 overflow-hidden bg-white/5 shrink-0">
                  <img
                    src={cert.link}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f]/50 to-transparent" />
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-[#f8f7f9]/80 border border-white/5">
                      {cert.category}
                    </span>
                    <span className="text-xs font-light text-white/40">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-[16px] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300 leading-snug mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium text-white/50 mb-4">
                    {cert.organization}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200 mt-auto pt-4 border-t border-white/5">
                    <span>View Certificate</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- contacts ---------- */

function ContactsSection() {
  return (
    <section id="contacts" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Contacts</SectionHeading>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}
          className="max-w-4xl grid sm:grid-cols-2 gap-4"
        >
          <motion.a
            href="mailto:inbox.hraza@gmail.com"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="rounded-2xl border border-white/10 hover:border-white/20 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
          >
            <span className="block font-extrabold text-[18px] text-[rgba(248,247,249,0.85)] mb-1">Email</span>
            <span className="block font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.6)]">
              inbox.hraza@gmail.com
            </span>
          </motion.a>

          <motion.a
            href="tel:+923187755408"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="rounded-2xl border border-white/10 hover:border-white/20 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
          >
            <span className="block font-extrabold text-[18px] text-[rgba(248,247,249,0.85)] mb-1">Phone</span>
            <span className="block font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.6)]">
              +92 318 7755408
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ResumeDownloadSection() {
  return (
    <section className="pb-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-8 md:p-10 shadow-[0_0_80px_rgba(99,102,241,0.12)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.25),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.18),_transparent_40%)]" />

          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300/80">Professional Portfolio</p>
              <h3 className="font-extrabold text-[26px] md:text-[32px] text-[rgba(248,247,249,0.95)] mb-3">
                Download My Resume
              </h3>
              <p className="font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.6)] leading-[1.7]">
                A concise overview of my experience in AI, software engineering, automation, and modern product development.
              </p>
            </div>

            <motion.a
              href="/resume.pdf"
              download="Hassan-Raza-Resume.pdf"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-indigo-400/30 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-6 py-3 text-[16px] font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-300/50 hover:shadow-indigo-400/20"
            >
              <span>Download PDF</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- app ---------- */

export default function App() {
  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white overflow-x-hidden">
      <ScrollProgressBar />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactsSection />
        <ResumeDownloadSection />
      </main>
    </div>
  );
}
