import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Portfolio.module.css";
import emailjs from "@emailjs/browser";

const sections = [
  "OVERVIEW",
  "PROJECTS",
  "EDUCATION",
  "CERTIFICATIONS",
  "CASESTUDIES",
  "SKILLS",
  "ARTIST_ACHIEVEMENTS",
  "ENQUIRY",
];

const navLabels = {
  OVERVIEW: "Overview",
  PROJECTS: "Projects",
  EDUCATION: "Education",
  CERTIFICATIONS: "Certifications",
  CASESTUDIES: "Case Studies",
  SKILLS: "Skills",
  ARTIST_ACHIEVEMENTS: "Artist",
  ENQUIRY: "Contact",
};

const bootLines = [
  "> Booting Sai Arvind System...",
  "> Loading Problem Solving Modules...",
  "> Initializing Scalable Architecture Thinking...",
  "> Connecting Creativity Engine...",
  "> Running Clean Code Protocols...",
  "> Ready.",
];

export default function SaiArvindPortfolio() {

  const [activeSection, setActiveSection] = useState("OVERVIEW");
  const [expanded, setExpanded] = useState(false);
  const [showAwsBar, setShowAwsBar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bootPhase, setBootPhase] = useState("boot");
  const [visibleLines, setVisibleLines] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const formRef = useRef();
  const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_obo7wp7",
      "template_vxm8oyb",
      formRef.current,
      "RcjRcMbd_c4u1Hicl"
    )
    .then(
      () => {
        alert("Message Sent Successfully ✅");
        formRef.current.reset();
      },
      (error) => {
        console.error(error);
        alert("Failed to send message ❌");
      }
    );
};

  const sectionRefs = useRef(
    sections.reduce((acc, sec) => {
      acc[sec] = React.createRef();
      return acc;
    }, {})
  );

  const scrollToSection = (section) => {
    sectionRefs.current[section].current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  /* ========= BOOT SEQUENCE ========= */
  useEffect(() => {
    const lineTimers = bootLines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 500)
    );
    const awsTimer = setTimeout(() => setBootPhase("aws"), 3000);
    const fadeTimer = setTimeout(() => setBootPhase("fadeout"), 4500);
    const doneTimer = setTimeout(() => setLoading(false), 5000);
    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(awsTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  /* ========= ACTIVE NAV ========= */
useEffect(() => {

  let ticking = false;
  let lastScrollY = window.scrollY;
  let currentSectionRef = "OVERVIEW";

  const handleScroll = () => {

    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {

      const scrollMiddle = window.innerHeight / 2;

      let closestSection = "OVERVIEW";
      let smallestDistance = Infinity;

      sections.forEach(sec => {

        const element =
          sectionRefs.current[sec]?.current;

        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionCenter =
          rect.top + rect.height / 2;

        const distance =
          Math.abs(scrollMiddle - sectionCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestSection = sec;
        }
      });

      if (currentSectionRef !== closestSection) {
        currentSectionRef = closestSection;
        setActiveSection(closestSection);
      }

      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY + 8) {
        setShowAwsBar(false);
      }
      else if (currentScroll < lastScrollY - 8) {
        setShowAwsBar(true);
      }

      lastScrollY = currentScroll;
      ticking = false;

    });
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  return () =>
    window.removeEventListener("scroll", handleScroll);

}, []);
  const fade = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
<div className={styles.cyberContainer}>

  {/* ================= BOOT SCREEN ================= */}
  {loading && (
    <div className={`${styles.bootOverlay} ${bootPhase === "fadeout" ? styles.bootFadeOut : ""}`}>
      {bootPhase === "boot" && (
        <div className={styles.bootTerminal}>
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={`${styles.bootLine} ${i < visibleLines ? styles.bootLineVisible : ""} ${line === "> Ready." ? styles.bootReady : ""}`}
            >
              {line}
            </div>
          ))}
        </div>
      )}
      {bootPhase === "aws" && (
        <div className={styles.bootAwsMessage}>
          This Site is Deployed on AWS Cloud Infrastructure
        </div>
      )}
    </div>
  )}

  {/* ================= LIGHTBOX ================= */}
  {lightboxSrc && (
    <div className={styles.lightboxOverlay} onClick={() => setLightboxSrc(null)}>
      <button className={styles.lightboxClose} onClick={() => setLightboxSrc(null)}>&times;</button>
      <img src={lightboxSrc} className={styles.lightboxImage} onClick={(e) => e.stopPropagation()} />
    </div>
  )}

  <div className={styles.backgroundFX}>
    </div>

<div
  className={`${styles.awsBar} ${
    showAwsBar ? styles.showBar : styles.hideBar
  }`}
>
  <div className="awsBarInner">
    This Site is Deployed on AWS Cloud Infrastructure!
  </div>
</div>

{ /* ================= NAV ================= */ }
<header className={styles.globalHeader}>

<button
className={styles.hamburger}
onClick={() => setMenuOpen(prev => !prev)}
aria-label="Toggle menu"
>
{menuOpen ? "✕" : "☰"}
</button>

<nav className={`${styles.navDock} ${menuOpen ? styles.navOpen : ""}`}>
{sections.map(sec => (
<div
key={sec}
onClick={() => { scrollToSection(sec); setMenuOpen(false); }}
className={`${styles.navItem}
${activeSection===sec?styles.activeNav:""}`}
>
{navLabels[sec]}
</div>
))}
</nav>

<button
className={styles.hireBtn}
onClick={()=>scrollToSection("ENQUIRY")}
>
HIRE ME
</button>
</header>



{/* ================= MAIN ================= */}
<main
className={`${styles.mainLayout}
${showAwsBar ? styles.awsOffset : ""}`}
>


{/* ========= HERO ========= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{once:true}}
ref={sectionRefs.current.OVERVIEW}
data-section="OVERVIEW"
className={`${styles.heroSection}
${showAwsBar ? styles.heroOffset : ""}`}
>

<div className={styles.heroCard}>

<img src="/IMG_6784.JPG.jpeg"
className={styles.heroImage}
/>

<h1>SAI ARVIND VS</h1>
<p className={styles.heroStatement}>
I don't want to be just another software engineer.
I want to be a builder of things that matter,
a creator of experiences that resonate,
and a catalyst for innovation that shapes the future.
With a passion for technology and a drive to make an impact,
I am on a mission to build products that not only solve problems
but also inspire and empower people around the world.
</p>

<div className={styles.socialRow}>
<a href="https://github.com/Saiarvind24"><img src="./github-icon-2.svg"/></a>
<a href="https://www.linkedin.com/in/sai-arvind-vs-5051b421b/"><img src="./linkedln logo 1.png"/></a>
<a href="https://www.youtube.com/@SAMUSIQ"><img src="./youtube logo.png"/></a>
<a href="https://www.instagram.com/ft_sai_arvind/"><img src="./pngwing.com (3).png"/></a>
<a href="https://open.spotify.com/artist/1ynHbHmxY8pnVWAv9B8e4f?si=ne0oFUgDS7-KiXQ9v6qeIg"><img src="./pngwing.com.png"/></a>
</div>

</div>

</motion.section>


{/* ================= PROJECTS ================= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{once:true}}
ref={sectionRefs.current.PROJECTS}
data-section="PROJECTS"
className={styles.glassCard}
>

<h1 className={styles.sectionTitle}>
What I've Been Building?
</h1>

{/* ===== LINGOBRIDGE ===== */}
<div className={styles.projectShowcase}>

<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
  LingoBridge</h1>
  </div>

<div className={styles.mediaWrapper}>
<div className={styles.mediaGlow}></div>

<div className={styles.projectGallery}>
<img src="./lingo 1.jpg" onClick={() => setLightboxSrc("./lingo 1.jpg")}/>
<img src="./lingo 2.jpg" onClick={() => setLightboxSrc("./lingo 2.jpg")}/>
<img src="./lingo 3.jpg" onClick={() => setLightboxSrc("./lingo 3.jpg")}/>
<img src="./lingo 4.jpg" onClick={() => setLightboxSrc("./lingo 4.jpg")}/>
<img src="./lingo 6.jpg" onClick={() => setLightboxSrc("./lingo 6.jpg")}/>
<img src="./lingo 7.jpg" onClick={() => setLightboxSrc("./lingo 7.jpg")}/>
</div>
</div>

<div className={styles.projectContentBox}>
<p className={styles.projectBodyText}>
After months of "quick fixes" that were anything but quick, endless coffee-fueled debugging sessions,
and questioning every life decision that led us here – we finally built LingoBridge, a multilingual
communication platform which is fully functional.
</p>

<div className={styles.projectFeatureList}>
<p>🌐 Real-time translation for text, audio & docs</p>
<p>🎙️ Speech-to-text with instant translation</p>
<p>📄 Document & media uploads with transcripts & translations</p>
<p>🔒 OTP-based registration, custom language settings, per-user chat deletion</p>
<p>⚡ Translation latency reduced by ~60% using Azure Cognitive Services</p>
<p>✅ ~95% accuracy in testing</p>
</div>

<div className={styles.tagRow}>
  <span className={styles.tag}>Spring Boot</span>
  <span className={styles.tag}>Azure AI</span>
  <span className={styles.tag}>REST APIs</span>
  <span className={styles.tag}>CI/CD</span>
  <span className={styles.tag}>Cloud Native</span>
  <span className={styles.tag}>Speech-to-Text</span>
</div>
</div>

</div>

<div className={styles.projectDivider}></div>


{/* ===== REAL TIME AI ===== */}
<div className={styles.projectShowcase}>


<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
  Real-Time Visual AI Inference</h1>
  </div>

<div className={styles.projectContentBox}>

<div className={styles.projectContentLeft}>
<div className={styles.mediaWrapper}>
<div className={styles.mediaGlow}></div>
<motion.video
className={styles.projectMedia}
autoPlay
loop
muted
playsInline
initial={{opacity:0}}
whileInView={{opacity:1}}
transition={{duration:.8}}
>
<source src="./Linkdn post .mov" type="video/mp4"/>
</motion.video>
</div>
</div>

<div className={styles.projectContentRight}>
<p className={styles.projectBodyText}>
The objective was to architect a low-latency system where the AI could continuously analyze
a video stream and provide immediate, relevant descriptions of the scene.
</p>

<div className={styles.projectTechDetails}>
<h4>Technical Architecture</h4>
<ul>
<li><strong>Backend:</strong> llama.cpp serves as the high-performance inference engine. By offloading the model's 33 layers entirely to an NVIDIA RTX 3050 GPU, the system achieves rapid response times.</li>
<li><strong>AI Model:</strong> The implementation uses HuggingFace's SmolVLM-500M, a compact and effective multimodal model for this vision-language task.</li>
<li><strong>Frontend:</strong> The user interface is built with React and Vite. It manages the webcam feed, sends frames to the local server, and displays the AI-generated captions.</li>
<li><strong>API & Connection:</strong> Engineered the API communication between frontend and backend, resolving Cross-Origin Resource Sharing (CORS) challenges to ensure a stable connection.</li>
</ul>
</div>

<p className={styles.projectBodyText}>
This project provided a practical deep dive into the end-to-end deployment of AI models,
from compiling the C++ backend with CMake and CUDA to building a responsive full-stack application.
It underscores the growing potential of powerful, private, and locally-run AI.
</p>

<div className={styles.tagRow}>
  <span className={styles.tag}>Python</span>
  <span className={styles.tag}>CUDA</span>
  <span className={styles.tag}>GPU Computing</span>
  <span className={styles.tag}>Computer Vision</span>
  <span className={styles.tag}>LLM</span>
  <span className={styles.tag}>React</span>
  <span className={styles.tag}>C++</span>
  <span className={styles.tag}>CMake</span>
</div>
</div>

</div>
</div>

<div className={styles.projectDivider}></div>

{/* ===== MEDICAL CHATBOT ===== */}
<div className={styles.projectShowcase}>

<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
Medical Assistant Chatbot
</h1>
</div>

<div className={styles.textProjectGrid}>

<div className={styles.textProjectBox}>
<p className={styles.textProjectDesc}>
Designed and developed an intelligent medical assistant focused on seamless
human–computer interaction through a responsive React interface. The system
integrates Natural Language Processing models trained using TensorFlow,
enabling accurate understanding and resolution of user health queries.
Emotion-aware conversational responses were implemented using Transformer
architectures and OpenAI APIs, allowing adaptive behaviour based on detected
user sentiment while maintaining structured deployment and long-term
operational reliability.
</p>
<div className={styles.tagRow}>
  <span className={styles.tag}>NLP</span>
  <span className={styles.tag}>React</span>
  <span className={styles.tag}>TensorFlow</span>
  <span className={styles.tag}>Transformers</span>
  <span className={styles.tag}>OpenAI API</span>
</div>
</div>

</div>

</div>

<div className={styles.projectDivider}></div>

{/* ===== FREELANCE ===== */}
<div className={styles.projectShowcase}>

<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
    Freelance Software Engineer
  </h1>
</div>

<div className={styles.textProjectGrid}>

<div className={styles.textProjectBox}>
<h3 className={styles.textProjectTitle}>Freelance Software Engineer</h3>
<span className={styles.textProjectMeta}>Independent Client Delivery | Jan 2023 – Jun 2024</span>

<div className={styles.subProject}>
  <h4 className={styles.subProjectTitle}>Ticketing Platform — AWS Cloud System</h4>
  <span className={styles.subProjectRole}>Head of Core Committee</span>
  <p className={styles.textProjectDesc}>
    Led end-to-end build of a serverless-inspired AWS event platform — owning authentication,
    authorization, messaging queues, error handling, and distributed data persistence, with a
    celebrity announcement driving unexpected viral demand. Architected a highly available AWS
    system with Stripe payment gateway, NoSQL data persistence, deployment automation, and Docker —
    implemented system monitoring, performance optimisation, and infrastructure scaling to absorb
    a 45x surge to 90,000 users with zero downtime.
  </p>
  <div className={styles.tagRow}>
    <span className={styles.tag}>AWS</span>
    <span className={styles.tag}>EC2</span>
    <span className={styles.tag}>ELB</span>
    <span className={styles.tag}>Docker</span>
    <span className={styles.tag}>Stripe</span>
    <span className={styles.tag}>NoSQL</span>
    <span className={styles.tag}>Auto Scaling</span>
  </div>
</div>

<div className={styles.subProjectDivider}></div>

<div className={styles.subProject}>
  <h4 className={styles.subProjectTitle}>Farmvalli Organics — Cloud-Based E-Commerce Platform</h4>
  <p className={styles.textProjectDesc}>
    Owned delivery of a globally distributed client platform — responsible for enterprise API design,
    relational and NoSQL data persistence, authentication flows, and translating business requirements
    into scalable backend architecture. Delivered well-tested, documented code using Java, Python,
    Node.js, REST APIs, and Jenkins CI/CD — implementing error handling, secure authentication,
    messaging-driven workflows, and agile delivery with continuous improvement of system performance
    and maintainability.
  </p>
  <div className={styles.tagRow}>
    <span className={styles.tag}>Java</span>
    <span className={styles.tag}>Python</span>
    <span className={styles.tag}>Node.js</span>
    <span className={styles.tag}>REST APIs</span>
    <span className={styles.tag}>CI/CD</span>
    <span className={styles.tag}>Jenkins</span>
  </div>
</div>

</div>

</div>

</div>

</motion.section>
{/* ================= EDUCATION ================= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{ once:true }}
ref={sectionRefs.current.EDUCATION}
data-section="EDUCATION"
className={styles.glassCard}
>

<h2 className={styles.sectionTitle}>Education</h2>

<div className={styles.educationGrid}>

{/* ===== UCD ===== */}
<div className={styles.educationCard}>
<div className={styles.educationLogo}>
<div className={styles.educationLogo1}>
<img src="./university-college-dublin4379.jpg" alt="UCD"/>
</div>
</div>

<div className={styles.educationContent}>
<h3>University College Dublin, Ireland</h3>
<h4>MSc Computer Science  | CGPA: 3.29/4.2 - 2:1</h4>


<p>
Key Modules – Software Engineering, Generative AI, Cloud Computing, ML In Python, Ds in Python, Data
Programming With R, Big Data Programming, Information Visualisation
</p>

<span>2024 — 2025</span>
</div>

</div>


{/* ===== UNDERGRAD ===== */}
<div className={styles.educationCard}>

<div className={styles.educationLogo}>
<img src="./kcg logo.jpg" alt="Engineering College"/>
</div>

<div className={styles.educationContent}>
<h3>KCG College Of Technology(Anna University), Chennai, India</h3>
<h4>B.E Computer Science & Engineering | CGPA: 7.9/10 - 2:1</h4>

<p>
Key Modules – Object-oriented Programming, Artificial Intelligence, Cloud Computing, ML, Probability and
queuing theory, Data Structures, DBMS, Distributed Systems
</p>

<span>2020 — 2024</span>
</div>

</div>
</div>
</motion.section>


{/* ================= CERTIFICATIONS ================= */}
<motion.section
variants={fade}
whileInView="visible"
viewport={{ once: true }}
ref={sectionRefs.current.CERTIFICATIONS}
data-section="CERTIFICATIONS"
className={styles.glassCard}
>

<h2 className={styles.sectionTitle}>Certifications</h2>

<div className={styles.certGrid}>

{/* AMAZON */}
<div className={styles.certCard}>
  <div className={styles.certLogoWrapper}>
  <img src="./Amazon_orange.png" alt="Amazon"/>
  </div>
  <h3>Amazon Certified Junior Software Developer(Ongoing)</h3>
  <p>
    Industry-aligned certification covering professional
    software engineering practices, cloud-native development,
    debugging workflows, and production-ready system design.
  </p>
</div>

{/* LINKEDIN */}
<div className={styles.certCard}>

  <div className={styles.certLogoWrapper}>
  <img src="./Linkedin learning logo.png" alt="LinkedIn Learning"/>
  </div>
  <h3>LinkedIn Learning — Java Engineering Track</h3>
  <p>
    Completed advanced learning paths including Java,
    Data Structures, Java Collections Framework,
    Lambdas & Streams, and enterprise programming concepts.
  </p>
</div>

{/* ORACLE JAVA */}
<div className={styles.certCard}>
  <div className={styles.certLogoWrapper1}>
  <img src="./Oracle-Symbol.png" alt="Oracle"/>
  </div>
  <h3>Oracle Java Foundations</h3>
  <p>
    Strong foundation in object-oriented programming,
    JVM fundamentals, core Java syntax, and
    software development best practices.
  </p>
</div>

{/* UCD */}
<div className={styles.certCard}>
    <div className={styles.certLogoWrapper2}>
  <img src="./university-college-dublin4379.jpg" alt="UCD"/>
  </div>
  <h3>UCD Advantage Award</h3>
  <p>
    Recognition for active participation in leadership,
    innovation initiatives, professional development,
    and university engagement activities.
  </p>
</div>

{/* NASA */}
<div className={styles.certCard}>
  <div className={styles.certLogoWrapper3}>
  <img src="./NASA_Wormball_logo.png" alt="NASA"/>
  </div>
  <h3>NASA Space Apps Challenge</h3>
  <p>
    Participated in global innovation challenge developing
    data-driven climate visualization systems using
    real-world scientific datasets.
  </p>
</div>

</div>

</motion.section>

{/* ================= CASE STUDY ================= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{ once:true }}
ref={sectionRefs.current.CASESTUDIES}
data-section="CASESTUDIES"
className={styles.glassCard}
>

<h2 className={styles.sectionTitle}>
Case Studies
</h2>

<div className={styles.caseStudyBox}>

<h3>Engineering Deep Dives — Coming Soon</h3>

<p>
Detailed architectural breakdowns of production systems,
including scalability decisions, system design trade-offs,
performance optimization strategies, and real-world
deployment learnings will be published here.
</p>

<p className={styles.comingSoon}>
🚧 Case studies currently under preparation.
</p>

</div>

</motion.section>

{/* ================= SKILLS ================= */}
<motion.section
  variants={fade}
  whileInView="visible"
  ref={sectionRefs.current.SKILLS}
  data-section="SKILLS"
  className={styles.glassCard}
>
<div className={styles.skillTitle}>
<h2>Tech Stack</h2>
</div>

<div className={styles.skillGrid}>

{/* JAVA */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./Java.png" alt="Java"/>
  </div>
  <h3>Java</h3>
</div>

{/* PYTHON */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./Python.png" alt="Python"/>
  </div>
  <h3>Python</h3>
</div>

{/* JAVASCRIPT */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./Javascript.png" alt="JavaScript"/>
  </div>
  <h3>JavaScript</h3>
</div>

{/* HTML */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./htmllogo.png" alt="HTML"/>
  </div>
  <h3>HTML</h3>
</div>

{/* CSS */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./csslogo.png" alt="CSS"/>
  </div>
  <h3>CSS</h3>
</div>

{/* REACT */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./React.png" alt="React"/>
  </div>
  <h3>React</h3>
</div>

{/* MONGODB */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./mongodblogo.png" alt="MongoDB"/>
  </div>
  <h3>MongoDB</h3>
</div>
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./sql.png" alt="Mysql"/>
  </div>
  <h3>Mysql</h3>
</div>

{/* AWS */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./awslogo.png" alt="AWS"/>
  </div>
  <h3>AWS</h3>
</div>

{/* AZURE */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./Microsoft_Azure_Logo.png" alt="Azure"/>
  </div>
  <h3>Azure</h3>
</div>

{/* DOCKER */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./docker.png" alt="Docker"/>
  </div>
  <h3>Docker</h3>
</div>

{/* GIT */}
<div className={styles.skillCard}>
  <div className={styles.skillLogoWrapper}>
    <img src="./Git.png" alt="Git"/>
  </div>
  <h3>Git</h3>
</div>

</div>

</motion.section>

{/* ================= ACHIEVEMENTS ================= */}
<motion.section
variants={fade}
whileInView="visible"
viewport={{ once:true }}
ref={sectionRefs.current.ARTIST_ACHIEVEMENTS}
data-section="ARTIST ACHIEVEMENTS"
className={styles.artistSection}
>




{/* ================= ARTIST INTRO ================= */}
<div className={styles.artistIntroBox}>

  <h2 className={styles.sectionTitle}>
    Artist & Achievements
  </h2>

  {/* TEXT CONTAINER */}
  <div
    className={`${styles.artistParagraph} ${
      expanded ? styles.expanded : ""
    }`}
  >

    <p>
      A multidisciplinary professional operating at the intersection
      of technology, creativity, and music. With a strong academic
      foundation in Computer Science, I specialize in engineering
      scalable digital solutions while expressing artistic depth
      as a trained musician and keyboardist.
    </p>

    <p>
      My journey uniquely combines analytical problem-solving with
      creative expression, enabling me to bridge structured engineering
      principles with human-centered artistic experiences. From
      performing classical symphonic compositions to designing and
      developing production-grade software systems, my work reflects
      a commitment to innovation, precision, and growth.
    </p>

    <p>
      Beyond software engineering, I actively engage global audiences
      through platforms such as YouTube and Spotify where technology
      and music converge to deliver meaningful storytelling and
      creative expression. Driven by curiosity and craftsmanship,
      I aim to merge engineering excellence, artistic vision,
      and innovation into a unified creative philosophy.
    </p>

  </div>

  {/* BUTTON */}
  <button
    type="button"
    className={styles.readMoreBtn}
    onClick={() => setExpanded(prev => !prev)}
  >
    {expanded ? "Show Less" : "Read More"}
  </button>

</div>


{/* ================= ACHIEVEMENTS ================= */}
<div className={styles.achievementGrid}>

<div className={styles.achievementCard}>
  <div className={styles.achievementCard1}>
<img src="./India_Br.webp"/>
</div>
<h3>India Book of Records</h3>
<h4>MOST PEOPLE PLAYING MOZART SYMPHONY 25 (1ST MOVEMENT) ON KEYBOARD</h4>
<p>
Kalaimani S. Sathish Kumar of Chennai, Tamil Nadu, organised an event in
which a total of 75 people, including V.S. Sai Arvind, performed Mozart
Symphony 25 (1st Movement) on electronic keyboard, on April 28, 2013,
at Kumara Raja Muthaiah Hall, Chennai, Tamil Nadu.
</p>
</div>

<div className={styles.achievementCard}>
  <div className={styles.achievementCard2}>
<img src="./trinity_college_london_logo_1.png"/>
</div>
<h3>Trinity College London</h3>
<p>
I take pride in the successful completion, from Grade 1 to Grade 7, with merit certifications awarded by Trinity College of London. This achievement reflects my dedication to musical excellence and consistent progress in mastering the keyboard,
</p>
<p className={styles.quoteText}>— Sai Arvind</p>
</div>

<div className={styles.achievementCard}>
<div className={styles.achievementCard3}>
<img src="./pngwing.com.png"/>
</div>
<h3>500K+ Streams</h3>
<p>
Global digital distribution impact. Independently scaled a music production project to 500,000+ total streams.</p>
<p>Global Content Distribution: Successfully reached listeners in 123 countries, with high engagement in the USA, UK, and India.</p>
</div>


<div className={styles.achievementCard}>
  <div className={styles.achievementCard4}>
<img src="./VijayTakkarLogo.webp.png"/>
<img src="./TTF.png"/>
</div>
<h3>Vijay Television – Vijay Takkar</h3>
<p>
KCG Band secured finalist status among 50 statewide teams and
achieved Runner-Up position in televised finals.
</p>
</div>

</div>

</motion.section>


{/* ================= CINEMATIC VIDEO ================= */}
<section className={styles.artistVideoSection}>

<video
autoPlay
loop
muted
playsInline
className={styles.artistVideo}
>
<source src="./Web Video 2(main).mp4" type="video/mp4"/>
</video>

</section>

{/* ================= RESUME ================= */}
<section className={styles.resumeWrapper}>
<div className={styles.resumeCard}>
<h2>Download Resume</h2>

<a
href="/Sai Arvind General Resume.pdf"
download
className={styles.resumeBtn}
>
DOWNLOAD CV
</a>

</div>
</section>


{/* ================= CONTACT ================= */}
<motion.section
variants={fade}
whileInView="visible"
ref={sectionRefs.current.ENQUIRY}
data-section="ENQUIRY"
className={`${styles.glassCard} ${styles.contactSection}`}
>

<div className={styles.contactCard}>

<h2>Contact / Hire</h2>

<form
ref={formRef}
onSubmit={sendEmail}
className={styles.cyberForm}
>

<input name="user_name" placeholder="Name" required />
<input name="user_email" placeholder="Email" required />
<textarea name="message" placeholder="Message" required />

<button type="submit">
SEND MESSAGE
</button>

</form>

</div>

</motion.section>

<footer className={styles.footerGlass}>
  <p className={styles.footerText}>
    © 2026 — Designed & Developed by
    <span> Sai Arvind</span>
  </p>

  <p className={styles.footerSub}>
    All Rights Reserved
  </p>
</footer>

</main>
</div>
);
}
