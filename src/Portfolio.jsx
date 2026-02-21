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

export default function SaiArvindPortfolio() {

  const [activeSection, setActiveSection] = useState("OVERVIEW");
  
  const formRef = useRef();
  const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_obo7wp7",     // ✅ your service ID
      "template_vxm8oyb",      // ✅ replace with template ID
      formRef.current,
      "RcjRcMbd_c4u1Hicl"      // ✅ replace with public key
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

  /* ========= ACTIVE NAV ========= */
useEffect(() => {

  let ticking = false;

  const handleScroll = () => {

    if (!ticking) {

      window.requestAnimationFrame(() => {

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

        setActiveSection(closestSection);

        ticking = false;

      });

      ticking = true;
    }
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
  <div className={styles.backgroundFX}>
    </div>

{/* ================= NAV ================= */}
<header className={styles.globalHeader}>

<div className={styles.logo}>
SAI ARVIND VS  | B.E, MSc Computer Science
</div>

<nav className={styles.navDock}>
{sections.map(sec => (
<div
key={sec}
onClick={()=>scrollToSection(sec)}
className={`${styles.navItem}
${activeSection===sec?styles.activeNav:""}`}
>
{sec}
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
<main className={styles.mainLayout}>

{/* ========= HERO ========= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{once:true}}
ref={sectionRefs.current.OVERVIEW}
data-section="OVERVIEW"
className={styles.heroSection}
>

<img src="/IMG_6784.JPG.jpeg"
className={styles.heroImage}
/>

<h1>SAI ARVIND VS</h1>
<p className={styles.heroStatement}>
I don’t want to be just another software engineer.
I want to be a builder of things that matter,
a creator of experiences that resonate,
and a catalyst for innovation that shapes the future.
With a passion for technology and a drive to make an impact,
I am on a mission to build products that not only solve problemss problems
but also inspire and empower people around the world.
</p>

<div className={styles.socialRow}>
<a href="https://github.com/Saiarvind24"><img src="./github-icon-2.svg"/></a>
<a href="https://www.linkedin.com/in/sai-arvind-vs-5051b421b/"><img src="./linkedln logo 1.png"/></a>
<a href="https://www.youtube.com/@SAMUSIQ"><img src="./youtube logo.png"/></a>
<a href="https://www.instagram.com/ft_sai_arvind/"><img src="./pngwing.com (3).png"/></a>
<a href="https://open.spotify.com/artist/1ynHbHmxY8pnVWAv9B8e4f?si=ne0oFUgDS7-KiXQ9v6qeIg"><img src="./pngwing.com.png"/></a>
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
<img src="./lingo 1.jpg"/>
<img src="./lingo 2.jpg"/>
<img src="./lingo 3.jpg"/>
<img src="./lingo 4.jpg"/>
<img src="./lingo 6.jpg"/>
<img src="./lingo 7.jpg"/>
</div>
</div>

<h2>
Cloud-native multilingual communication platform using
Spring Boot & Azure AI with resilient architecture
and automated testing pipelines.
</h2>

</div>

<div className={styles.projectDivider}></div>


{/* ===== REAL TIME AI ===== */}
<div className={styles.projectShowcase}>


<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
  Real-Time Visual AI Inference</h1>
  </div>

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

<h2 className={styles.realtimeProjectText}>
CUDA accelerated multimodal inference system enabling
real-time visual understanding through optimized GPU execution.
</h2>

</div>

<div className={styles.projectDivider}></div>
<div className={styles.projectShowcase}>


<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
Medical Assistant Chatbot
</h1>
</div>

<div className={styles.textProjectCard}>

<p className={styles.projectText}>
Designed and developed an intelligent medical assistant
focused on seamless human–computer interaction through a
responsive React interface. The system integrates Natural
Language Processing models trained using TensorFlow,
enabling accurate understanding and resolution of user
health queries.
</p>

<p className={styles.projectText}>
Emotion-aware conversational responses were implemented
using Transformer architectures and OpenAI APIs, allowing
adaptive behaviour based on detected user sentiment while
maintaining structured deployment and long-term
operational reliability.
</p>

<div className={styles.techStack}>
  <div className={styles.techInnerBox}>

<h2 className={styles.techTitle}>Tech Stack</h2>

<div className={styles.techList}>
  <span>NLP</span>
  <span>React</span>
  <span>TensorFlow</span>
  <span>Transformers</span>
  <span>OpenAI API</span>
</div>
</div>

</div>

<div className={styles.projectDivider}></div>

<div className={styles.projectShowcase}>

<div className={styles.projectTitleBox}>
  <h1 className={styles.projectTitle}>
    High-Availability Ticketing Platform
  </h1>
</div>

<div className={styles.textProjectCard}>

<p className={styles.projectText}>
Engineered a production-grade ticketing platform for a
large-scale university cultural event supporting over
5,000 global attendees. The system was developed across
the full software lifecycle, beginning from requirement
analysis through live-site deployment and operational
monitoring.
</p>

<p className={styles.projectText}>
Close collaboration with stakeholders enabled iterative
feature refinement including secure checkout workflows
and real-time ticket generation. The infrastructure was
deployed on AWS using Elastic Load Balancing and
Auto Scaling, achieving consistent service stability
and 99.9% uptime during high-concurrency launches.
</p>

<p className={styles.projectText}>
Comprehensive deployment documentation and recovery
procedures were authored to ensure rapid incident
response and long-term maintainability of the service.
</p>

<div className={styles.techStack}>
  <div className={styles.techInnerBox}>
<h2 className={styles.techTitle}>Tech Stack</h2>
<div className={styles.techList}>
<span>AWS</span>
<span>System Design</span>
<span>Distributed Systems</span>
<span>Live Operations</span>
</div>
</div>
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

<p className={styles.artistParagraph}>
A multidisciplinary professional operating at the intersection of technology, creativity, and music.
With a strong academic foundation in Computer Science, I specialize in engineering scalable digital
solutions while expressing artistic depth as a trained musician and keyboardist.

My journey uniquely combines analytical problem-solving with creative expression,
enabling me to bridge structured engineering principles with human-centered artistic experiences.
From performing classical symphonic compositions to designing and developing production-grade software systems,
my work reflects a consistent commitment to innovation, precision, and continuous growth.

<p>
Beyond software engineering, I actively engage global audiences
through platforms such as YouTube and Spotify, where technology
and music converge to deliver meaningful storytelling and creative expression.
I strive to build solutions and experiences that not only solve complex
problems but also inspire, connect, and create lasting impact.

Driven by curiosity and craftsmanship, I aim to merge engineering excellence,
artistic vision, and innovation into a unified creative philosophy.
</p>
</p>

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
<p>— Sai Arvind</p>
</p>
</div>

<div className={styles.achievementCard}>
<div className={styles.achievementCard3}>
<img src="./pngwing.com.png"/>
</div>
<h3>500K+ Streams</h3>
<p>
Global digital distribution impact.Independently scaled a music production project to 500,000+ total streams.</p>
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
