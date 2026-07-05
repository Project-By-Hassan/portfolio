import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import svgPaths from "./imports/svg-6sovak61ez";
import imgAdobeExpressFile31 from "figma:asset/7ba16f5335969b66c314f7955ee4897ab548acd6.png";

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
                  className={`font-normal text-[16px] md:text-[18px] transition-colors duration-200 ${
                    activeSection === item.id ? 'text-[#f8f7f9]' : 'text-[#f8f7f9]/60 hover:text-[#f8f7f9]'
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

function SocialIcon({ type }: { type: 'instagram' | 'twitter' }) {
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

function IconLink({ type, href }: { type: 'github' | 'linkedin' | 'whatsapp'; href: string }) {
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
    { school: 'University Of Rasul', detail: 'BSAI (Bachelor of Science in Artificial Intelligence) — 3rd Semester, CGPA 3.5' },
    { school: 'Superior College Gojra', detail: 'Intermediate — 85%' },
    { school: 'Govt. High School Rukkan', detail: 'Matric — 90%' },
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
              <motion.div
                key={edu.school}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={i}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="rounded-xl p-4 -ml-4 hover:bg-white/[0.04] transition-colors duration-200"
              >
                <h4 className="font-extrabold text-[20px] md:text-[22px] text-[rgba(248,247,249,0.85)] mb-1">
                  {edu.school}
                </h4>
                <p className="font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] leading-[1.5]">
                  {edu.detail}
                </p>
              </motion.div>
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
              title="GRAPHIC DESIGNER"
              period="Card Maker — 2022"
              description="Worked as a Graphic Designer at Card Maker, creating visual designs and card layouts, sharpening my skills in visual composition, branding, and creative software tools."
            />
            <ExperienceItem
              index={1}
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

/* ---------- projects ---------- */

function ProjectsSection() {
  const projects = [
    {
      title: "DocuMine",
      period: "AI Document Intelligence Tool",
      description: "DocuMine is an AI-powered tool that extracts text and data straight out of PDF documents. It pulls out key details automatically and offers a range of features for organizing, searching, and analysing document content — turning messy PDFs into usable information in seconds.",
      link: "https://docu-mine.streamlit.app/"
    },
    {
      title: "PDF Insight Extractor",
      period: "AI PDF Analysis Tool",
      description: "Another AI-driven PDF tool built to read through documents and surface the important information inside them, making it easy to extract and review insights from PDF files without manually scanning through pages.",
      link: "https://appoc-ultra-v11-oryvdsbusa67tzdphcyrjc.streamlit.app/"
    },
    {
      title: "Py30 — 30 Day Python Challenge",
      period: "Learning Platform",
      description: "A complete 30-day Python learning challenge platform featuring daily lessons, quizzes, and hands-on projects — designed to take a learner from the basics of Python to building real projects, one day at a time.",
      link: "https://py30day.streamlit.app/"
    },
    {
      title: "Relational Normalization Oracle",
      period: "Database Learning Tool",
      description: "A unique interactive tool that helps students and developers understand database normalization concepts step by step, making a traditionally tricky database topic much easier to grasp.",
      link: "https://relational-normalization-oracle.streamlit.app/"
    },
    {
      title: "AI Resume Maker",
      period: "AI-Powered Resume Builder",
      description: "An AI-powered resume builder that generates a professional, ATS-optimized resume in just 2 minutes, with multiple templates to choose from — helping job seekers create high-scoring resumes instantly.",
      link: "https://ai-resume-maker-v2.streamlit.app"
    },
    {
      title: "QR Attendance System",
      period: "University Project",
      description: "An online attendance system that uses QR codes to record student attendance quickly and accurately. Built as a university project, it streamlines the attendance process and reduces manual errors, making it highly practical for real classroom use.",
      link: ""
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectItem key={project.title} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ title, period, description, link, index }: { title: string; period: string; description: string; link?: string; index: number }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} custom={index}
      whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="max-w-4xl relative rounded-xl p-5 -ml-5 border border-transparent hover:border-white/10"
    >
      <div className="pl-8 relative">
        <TimelineDot />
        {link ? (
          <a
            href={link}
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
      </div>
    </motion.div>
  );
}

/* ---------- certifications ---------- */

function CertificationsSection() {
  const certifications = [
    { title: "GRAPHIC DESIGNING", year: "2022", organization: "Skillsider" },
    { title: "AFFILIATE MARKETING", year: "2022", organization: "Skillsider" }
  ];

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Certifications</SectionHeading>

        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} custom={index}
              whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="max-w-4xl relative rounded-xl p-5 -ml-5"
            >
              <div className="pl-8 relative">
                <TimelineDot />
                <h3 className="font-extrabold text-[20px] md:text-[22px] text-[rgba(248,247,249,0.85)] mb-1">{cert.title}</h3>
                <p className="font-extralight text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)] mb-2">{cert.year}</p>
                <p className="font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.5)]">{cert.organization}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
            href="mailto:hasnipbx144741@gmail.com"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="rounded-2xl border border-white/10 hover:border-white/20 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
          >
            <span className="block font-extrabold text-[18px] text-[rgba(248,247,249,0.85)] mb-1">Email</span>
            <span className="block font-medium text-[18px] md:text-[20px] text-[rgba(248,247,249,0.6)]">
              hasnipbx144741@gmail.com
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

/* ---------- app ---------- */

export default function App() {
  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white overflow-x-hidden">
      <ScrollProgressBar />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactsSection />
      </main>
    </div>
  );
}
