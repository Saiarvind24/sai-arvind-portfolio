import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./Portfolio.module.css";
import emailjs from "@emailjs/browser";
import { Reveal, RevealGroup, RevealItem } from "./components/Reveal";

const sections = [
  "OVERVIEW",
  "ORGLIDE",
  "ARCHITECTURE",
  "PROJECTS",
  "EDUCATION",
  "CERTIFICATIONS",
  "SKILLS",
  "ARTIST_ACHIEVEMENTS",
  "ENQUIRY",
];

const navLabels = {
  OVERVIEW: "Overview",
  ORGLIDE: "ORGLIDE",
  ARCHITECTURE: "Architecture",
  PROJECTS: "Projects",
  EDUCATION: "Education",
  CERTIFICATIONS: "Certifications",
  SKILLS: "Skills",
  ARTIST_ACHIEVEMENTS: "Artist",
  ENQUIRY: "Contact",
};

const bootLines = [
  "> Booting ORGLIDE Platform Console...",
  "> Loading Enterprise AI Governance Modules...",
  "> Initializing Distributed Compliance Intelligence...",
  "> Connecting Multi-Tenant Trust Infrastructure...",
  "> Verifying Immutable Audit Chains...",
  "> Ready.",
];

const orglideProblemSpace = [
  {
    title: "Fragmented Compliance Workflows",
    desc: "Compliance lives across spreadsheets, shared drives, email threads, and a graveyard of disconnected SaaS tools. ORGLIDE collapses that surface area into a single governance plane."
  },
  {
    title: "Audit Chaos",
    desc: "Audit prep becomes a multi-week scramble to reconstruct who approved what, when, and with which evidence. ORGLIDE keeps that lineage continuously, not retroactively."
  },
  {
    title: "Opaque AI Decisions",
    desc: "Most AI systems can't explain why they fired, what context they used, or what version of policy was in effect. ORGLIDE binds every AI decision to evidence, prompt, model, and policy snapshot."
  },
  {
    title: "No Organizational Memory",
    desc: "Every control review starts from zero. ORGLIDE's compliance memory accumulates precedent — past decisions become first-class context for the next ones."
  },
  {
    title: "Regulatory Reporting Overhead",
    desc: "Quarterly reporting becomes a multi-team firefight. ORGLIDE reconstructs the compliance timeline deterministically from event-sourced audit chains."
  },
  {
    title: "Untraceable AI Workflows",
    desc: "Black-box AI pipelines can't survive enterprise scrutiny. Every ORGLIDE worker emits correlation-tagged lifecycle events end-to-end."
  },
  {
    title: "Siloed Operational Tooling",
    desc: "DevOps, GRC, legal, and engineering each run their own dashboards. ORGLIDE consolidates pipeline health, governance posture, and evidence state into one operator console."
  },
  {
    title: "Compliance Drift",
    desc: "Controls degrade silently as systems evolve. ORGLIDE's continuous AI review surfaces drift the moment evidence stops matching policy."
  }
];

const orglideCapabilities = [
  { tag: "Tenant Fabric",      title: "Tenant Isolation",                desc: "Per-tenant data, key, and event-scope boundaries enforced at every service edge. No cross-tenant leakage paths by construction." },
  { tag: "Access",             title: "RBAC & Org Policy",               desc: "Organization-aware role and permission model with policy snapshots captured into the audit chain on every privileged action." },
  { tag: "Trust",              title: "Immutable Audit Chains",          desc: "Append-only, hash-linked audit records spanning AI dispatch, worker completion, human action, and policy state." },
  { tag: "AI Governance",      title: "AI Pipeline Governance",          desc: "Schema-versioned event contracts, deterministic worker dispatch, and policy-aware guardrails on every AI execution." },
  { tag: "Intelligence",       title: "Compliance Intelligence",         desc: "Continuous AI review of controls, evidence, and obligations — surfaces gaps before they become audit findings." },
  { tag: "Retention",          title: "Retention Policies",              desc: "Per-tenant, per-class retention windows with cryptographic enforcement at the storage and audit layers." },
  { tag: "Legal",              title: "Legal Hold Workflows",            desc: "Tamper-evident legal hold that overrides retention and freezes lineage across documents, decisions, and audit segments." },
  { tag: "Explainability",     title: "AI Decision Traceability",        desc: "Every AI output links back to model, prompt, policy version, retrieved context, and evidence — fully reconstructable." },
  { tag: "Evidence",           title: "Evidence Correlation",            desc: "Documents, controls, and AI decisions are joined through correlation/causation IDs into a coherent compliance graph." },
  { tag: "Replay",             title: "Event Replay",                    desc: "Event-sourced AiJob lifecycle enables deterministic replay of any historical pipeline run for audit or postmortem." },
  { tag: "Bus",                title: "Kafka Event Bus",                 desc: "EventEnvelope topology with in-process fallback. Workers stay transport-agnostic; brokers are an implementation detail." },
  { tag: "Orchestration",      title: "AI Worker Orchestration",         desc: "AiOrchestrationService dispatches matching, review, memory, and forecast workers with per-job state tracking." },
  { tag: "Tracing",            title: "Cross-Service Correlation IDs",   desc: "Every request, event, worker, and side-effect carries correlationId/causationId — full distributed traces by default." },
  { tag: "Telemetry",          title: "Observability Streams",           desc: "STOMP/WebSocket /topic/ai-pipeline streams surface live job deltas, throughput, and health to operator dashboards." },
  { tag: "Memory",             title: "Vector Compliance Memory",        desc: "Pluggable EmbeddingProvider + VectorStoreProvider with pgvector backing. Hot-swap providers without changing call sites." },
  { tag: "Console",            title: "Governance Dashboards",           desc: "Operator-grade dashboards for compliance posture, AI pipeline state, evidence coverage, and tenant-level drift." },
  { tag: "Forecast",           title: "AI Forecasting",                  desc: "AiForecastWorker projects compliance gap risk and control-degradation trajectories from organizational history." },
  { tag: "RAG",                title: "Retrieval-Augmented Compliance",  desc: "RAG pipelines retrieve only policy-scoped, tenant-scoped context — eliminating cross-context contamination." },
  { tag: "Documents",          title: "Secure Document Infrastructure",  desc: "Encrypted, lineage-tracked document service with signed retrieval and AI-decision back-references." },
  { tag: "Realtime",           title: "WebSocket Intelligence Streams",  desc: "Live operator telemetry over STOMP — pipeline state propagates to the UI without polling." },
  { tag: "Reliability",        title: "Retry + DLQ Fabric",              desc: "Configurable retries, dead-letter routing, and graceful UI degradation — the platform never crashes when an AI step delays." },
  { tag: "Integrity",          title: "Tamper-Evident Logging",          desc: "Hash-linked log segments make any tampering with audit history immediately detectable." },
  { tag: "Crypto",             title: "Cryptographic Integrity",         desc: "Content addressing for evidence, signed retrieval URLs, and verifiable audit segment hashes." },
  { tag: "Timeline",           title: "Compliance Timeline Reconstruction", desc: "Reconstruct the exact compliance state of any tenant at any point in time, directly from the event log." },
  { tag: "Guardrails",         title: "Policy-Aware AI Guardrails",      desc: "AI execution is gated against the tenant's active policy snapshot — never against drifted assumptions." },
  { tag: "Isolation",          title: "Multi-Tenant Context Isolation",  desc: "Tenant context is propagated through every layer — service, worker, vector query, and audit segment." }
];

const orglidePrinciples = [
  { title: "Deterministic AI over black-box automation",    desc: "Every AI step is replayable with the same model, prompt, policy, and context. No magic." },
  { title: "Governance before automation",                  desc: "Workflows automate only what governance can verify, log, and reconstruct." },
  { title: "Auditability by default",                       desc: "Audit isn't a feature — it's a side-effect of every action the platform takes." },
  { title: "Event-driven everything",                       desc: "All state transitions flow through the EventEnvelope bus so the system stays composable and replayable." },
  { title: "Operational intelligence as infrastructure",    desc: "Telemetry, traces, and health aren't dashboards — they're a first-class subsystem." },
  { title: "Compliance memory accumulates",                 desc: "Every closed control strengthens the next one through vector-backed organizational memory." },
  { title: "Explainable AI execution",                      desc: "Every AI output links back to inputs, policy version, and retrieval set — full reconstructability." },
  { title: "Replayable systems",                            desc: "Event sourcing on AI lifecycle and audit chains makes any historical state reachable on demand." },
  { title: "Infrastructure-grade reliability",              desc: "Backoff, DLQs, and graceful degradation — the UI never crashes on AI failure." },
  { title: "Tenant isolation first",                        desc: "Tenancy is enforced structurally, not by convention. There are no shared mutable surfaces between tenants." },
  { title: "Traceability over assumptions",                 desc: "If it can't be traced, it didn't happen. Every action carries correlation and causation IDs." }
];

const orglideRoadmap = [
  { phase: "Now",     title: "Governance Core",            desc: "Multi-tenant fabric, AI orchestration, immutable audit chains, compliance memory, secure evidence infrastructure." },
  { phase: "Next",    title: "Autonomous Governance Agents", desc: "Policy-aware agents that monitor control health, propose remediations, and execute under deterministic guardrails." },
  { phase: "Next",    title: "Real-Time Regulatory Adaptation", desc: "Continuous ingestion of regulatory deltas; policy snapshots auto-update with full audit lineage." },
  { phase: "Soon",    title: "Multi-Region Compliance Fabric", desc: "Region-scoped data plane with cross-region governance plane — data residency without sacrificing visibility." },
  { phase: "Soon",    title: "Enterprise Policy Simulation", desc: "Dry-run any policy change against historical evidence to forecast pass/fail impact before activation." },
  { phase: "Horizon", title: "AI Risk Forecasting",        desc: "Trajectory models for control degradation, drift velocity, and audit exposure based on organizational telemetry." },
  { phase: "Horizon", title: "Compliance Graph Intelligence", desc: "Cross-entity knowledge graph linking controls, evidence, AI decisions, and obligations into queryable lineage." },
  { phase: "Horizon", title: "Agentic Audit Systems",      desc: "Continuous, autonomous audit agents that reconstruct compliance posture without human intervention." },
  { phase: "Horizon", title: "Trust Scoring Engine",       desc: "Quantitative trust scores per control, tenant, and AI subsystem — a directly auditable trust signal." },
  { phase: "Horizon", title: "Cross-Enterprise Governance Networks", desc: "Federated governance attestations between organizations — verifiable trust beyond a single tenant boundary." }
];

const orglideArchitecture = [
  {
    title: "Multi-Tenant Platform",
    desc: "Tenant-scoped data isolation, organization-level RBAC, and per-tenant key contexts across every service boundary.",
    tag: "Platform Core"
  },
  {
    title: "Event-Driven Orchestration",
    desc: "Kafka-backed EventEnvelope bus with in-process fallback, correlation/causation tracing, and worker fan-out for AI pipelines.",
    tag: "Distributed Systems"
  },
  {
    title: "AI Orchestration Engine",
    desc: "AiOrchestrationService coordinates matching, review, memory, and forecast workers — each tracked via the AiJob lifecycle.",
    tag: "AI Infrastructure"
  },
  {
    title: "pgvector + RAG Memory",
    desc: "Vector-native compliance memory using pluggable EmbeddingProvider + VectorStoreProvider abstractions. Hot-swap providers without touching call sites.",
    tag: "Retrieval Intelligence"
  },
  {
    title: "AI Governance Layer",
    desc: "Policy-aware AI guardrails, schema-versioned event contracts, and deterministic re-runs over historical evidence.",
    tag: "Governance"
  },
  {
    title: "Immutable Audit Chains",
    desc: "Append-only audit trail with cryptographic integrity, tamper-evident hashing, and full replay across the compliance timeline.",
    tag: "Trust Infrastructure"
  },
  {
    title: "Real-Time Intelligence",
    desc: "STOMP/WebSocket streams on /topic/ai-pipeline surface live job lifecycle deltas, health, throughput, and per-correlation traces.",
    tag: "Observability"
  },
  {
    title: "Secure Document Infrastructure",
    desc: "Encrypted document service with virus scanning hooks, signed retrieval, and lineage tied to every AI decision made against it.",
    tag: "Security Fabric"
  },
  {
    title: "Compliance Memory Engine",
    desc: "AiComplianceMemoryService accumulates organizational precedent — every closed control becomes context for the next one.",
    tag: "Organizational Memory"
  },
  {
    title: "Governance Operations",
    desc: "Retention policies, legal hold, deletion workflows, and operational dashboards designed for regulated enterprise tenants.",
    tag: "Operations"
  },
  {
    title: "Distributed Observability",
    desc: "/api/ai-pipeline health, metrics, and job introspection — operational visibility without ever reading the broker directly.",
    tag: "SRE"
  },
  {
    title: "Resilience & Retry Fabric",
    desc: "Backoff retries, dead-letter routing, and graceful UI degradation — the platform never crashes when an AI step is delayed.",
    tag: "Reliability"
  }
];

export default function SaiArvindPortfolio() {

  const [activeSection, setActiveSection] = useState("OVERVIEW");
  const [expanded, setExpanded] = useState(false);
  const [showAwsBar, setShowAwsBar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bootPhase, setBootPhase] = useState("boot");
  const [visibleLines, setVisibleLines] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

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

      setScrolled(currentScroll > 24);

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

{/* ================= SCROLL PROGRESS ================= */}
<motion.div
  className={styles.scrollProgress}
  style={{ scaleX: progressScaleX }}
/>

{ /* ================= NAV ================= */ }
<header className={`${styles.globalHeader} ${scrolled ? styles.headerScrolled : ""}`}>

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

<p className={styles.heroRole}>
  Founder &amp; Lead Platform Engineer at <span className={styles.heroRoleAccent}>ORGLIDE</span>
</p>

<p className={styles.heroStatement}>
Building enterprise-grade AI infrastructure for compliance,
governance, and organizational intelligence. ORGLIDE is a
multi-tenant SaaS platform engineered around event-driven
AI orchestration, immutable audit chains, pgvector-backed
compliance memory, and a real-time intelligence engine —
the trust infrastructure modern regulated enterprises actually need.
</p>

<div className={styles.heroCtaRow}>
  <a href="https://www.orglide.com" target="_blank" rel="noreferrer" className={styles.heroCtaPrimary}>
    Visit ORGLIDE →
  </a>
  <a href="https://www.linkedin.com/company/orglide/" target="_blank" rel="noreferrer" className={styles.heroCtaSecondary}>
    ORGLIDE on LinkedIn
  </a>
</div>

<div className={styles.socialRow}>
<a href="https://www.orglide.com" target="_blank" rel="noreferrer" title="ORGLIDE"><img src="/Orglide Design logo.png" alt="ORGLIDE" className={styles.socialOrglideImg}/></a>
<a href="https://github.com/Saiarvind24"><img src="./github-icon-2.svg"/></a>
<a href="https://www.linkedin.com/in/sai-arvind-vs-5051b421b/"><img src="./linkedln logo 1.png"/></a>
<a href="https://www.youtube.com/@SAMUSIQ"><img src="./youtube logo.png"/></a>
<a href="https://www.instagram.com/ft_sai_arvind/"><img src="./pngwing.com (3).png"/></a>
<a href="https://open.spotify.com/artist/1ynHbHmxY8pnVWAv9B8e4f?si=ne0oFUgDS7-KiXQ9v6qeIg"><img src="./pngwing.com.png"/></a>
</div>

</div>

</motion.section>


{/* ================= ORGLIDE FLAGSHIP ================= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{once:true}}
ref={sectionRefs.current.ORGLIDE}
data-section="ORGLIDE"
className={styles.orglideSection}
>
  <div className={styles.orglideGrid}>
    <div className={styles.orglideHeaderRow}>
      <div className={styles.orglideMarkBox}>
        <div className={styles.orglideLogoFrame}>
          <img src="/Orglide Design logo.png" alt="ORGLIDE" className={styles.orglideLogoImg}/>
        </div>
        <div className={styles.orglideMarkMeta}>
          <span className={styles.orglideName}>ORGLIDE</span>
          <span className={styles.orglideWordmark}>Enterprise AI Governance Platform</span>
        </div>
      </div>
      <div className={styles.orglideRoleBox}>
        <span className={styles.orglideRole}>Founder &amp; Lead Platform Engineer</span>
        <span className={styles.orglideTimeline}>2025 — Present · Ireland</span>
      </div>
    </div>

    {/* SaaS tagline banner */}
    <div className={styles.saasBanner}>
      <div className={styles.saasBannerInner}>
        <span className={styles.saasBannerMain}>SOFTWARE&nbsp;AS&nbsp;A</span>
        <span className={styles.saasBannerStrike}>SERVICE</span>
        <span className={styles.saasBannerSub}>SOLUTION</span>
      </div>

      <span className={styles.saasBannerCaption}>
        Multi-tenant. Governance-native. Built for regulated AI at enterprise scale.
      </span>
    </div>

    <h2 className={styles.orglideTagline}>
      The trust infrastructure for enterprise AI — governance, compliance,
      and operational intelligence in one platform.
    </h2>

    <p className={styles.orglideLead}>
      ORGLIDE is an enterprise AI governance platform engineered for
      regulated industries. It unifies AI orchestration, immutable audit
      chains, vector-native compliance memory, secure evidence
      infrastructure, and real-time operational telemetry into a single
      multi-tenant trust fabric. I architected and engineered the
      platform end-to-end — distributed services, deterministic AI
      execution, governance systems, document security, observability
      streams, and the operational intelligence layer that connects them.
    </p>

    <div className={styles.orglideCtaRow}>
      <a href="https://www.orglide.com" target="_blank" rel="noreferrer" className={styles.orglideBtnPrimary}>
        Visit orglide.com
      </a>
      <a href="https://www.linkedin.com/company/orglide/" target="_blank" rel="noreferrer" className={styles.orglideBtnSecondary}>
        Company on LinkedIn
      </a>
      <a href="#ARCHITECTURE"
         onClick={(e)=>{e.preventDefault(); scrollToSection("ARCHITECTURE");}}
         className={styles.orglideBtnGhost}>
        View Platform Architecture ↓
      </a>
    </div>

    <RevealGroup className={styles.orglidePillarGrid} stagger={0.07}>
      <RevealItem className={styles.orglidePillar}>
        <span className={styles.pillarLabel}>What is ORGLIDE</span>
        <p>An enterprise AI platform that unifies compliance operations,
        AI governance, evidence management, and organizational intelligence
        into a single multi-tenant trust fabric.</p>
      </RevealItem>
      <RevealItem className={styles.orglidePillar}>
        <span className={styles.pillarLabel}>Why I built it</span>
        <p>Enterprises run compliance on spreadsheets, email threads, and
        disconnected SaaS tools. ORGLIDE replaces that with a platform that
        thinks — pulling AI, evidence, audit, and policy into one coherent system.</p>
      </RevealItem>
      <RevealItem className={styles.orglidePillar}>
        <span className={styles.pillarLabel}>AI Compliance Copilot</span>
        <p>An AI layer that reviews controls, matches requirements to
        evidence, forecasts gaps, and accumulates organizational memory
        so every prior decision strengthens the next one.</p>
      </RevealItem>
      <RevealItem className={styles.orglidePillar}>
        <span className={styles.pillarLabel}>Secure Evidence Infrastructure</span>
        <p>Encrypted, lineage-tracked document infrastructure with retention,
        legal hold, and signed retrieval — every artifact tied to the AI
        decision and audit chain it informs.</p>
      </RevealItem>
      <RevealItem className={styles.orglidePillar}>
        <span className={styles.pillarLabel}>Immutable Audit Chains</span>
        <p>Append-only, tamper-evident audit trail with correlation IDs
        spanning every AI dispatch, worker completion, and human action
        across the platform.</p>
      </RevealItem>
      <RevealItem className={styles.orglidePillar}>
        <span className={styles.pillarLabel}>Organizational Intelligence Layer</span>
        <p>Real-time operational telemetry, AI pipeline health, and
        cross-tenant governance posture — surfaced through a System
        Intelligence console built for operators, not just dashboards.</p>
      </RevealItem>
    </RevealGroup>

    <div className={styles.orglideMetricsStrip}>
      <div className={styles.orglideMetric}>
        <span className={styles.metricValue}>Multi-Tenant</span>
        <span className={styles.metricLabel}>Governance Architecture</span>
      </div>
      <div className={styles.orglideMetric}>
        <span className={styles.metricValue}>Event-Driven</span>
        <span className={styles.metricLabel}>AI Orchestration</span>
      </div>
      <div className={styles.orglideMetric}>
        <span className={styles.metricValue}>Real-Time</span>
        <span className={styles.metricLabel}>Operational Intelligence</span>
      </div>
      <div className={styles.orglideMetric}>
        <span className={styles.metricValue}>Immutable</span>
        <span className={styles.metricLabel}>Audit + Evidence Chain</span>
      </div>
      <div className={styles.orglideMetric}>
        <span className={styles.metricValue}>Vector-Native</span>
        <span className={styles.metricLabel}>Compliance Memory</span>
      </div>
    </div>


    {/* ===== ENTERPRISE PROBLEM SPACE ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>ENTERPRISE PROBLEM SPACE</span>
      <h3 className={styles.subTitle}>What enterprise compliance actually looks like — and why it breaks.</h3>
      <p className={styles.subLead}>
        Regulated enterprises don't have a compliance product problem.
        They have a compliance architecture problem. Governance is scattered
        across tools that don't talk to each other, audit posture is
        reconstructed manually under pressure, and AI is being deployed
        faster than the surrounding trust infrastructure can keep up.
        ORGLIDE replaces that fragmented surface area with a single,
        event-driven trust fabric.
      </p>
      <RevealGroup className={styles.problemGrid} stagger={0.06}>
        {orglideProblemSpace.map((p, i) => (
          <RevealItem key={i} className={styles.problemCard}>
            <h4 className={styles.problemTitle}>{p.title}</h4>
            <p className={styles.problemDesc}>{p.desc}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>


    {/* ===== WHY ORGLIDE EXISTS — FOUNDER VISION ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>WHY ORGLIDE EXISTS</span>
      <h3 className={styles.subTitle}>Trust infrastructure is becoming a tier-zero enterprise concern.</h3>
      <div className={styles.visionGrid}>
        <p className={styles.visionPara}>
          Enterprise compliance tooling was built for a world where
          governance moved at the speed of quarterly reviews. AI moves
          continuously, deploys daily, and makes decisions inside workflows
          that no human will manually re-verify. The gap between how fast
          AI ships and how slowly governance reconstructs itself is the
          single largest unaddressed enterprise risk today.
        </p>
        <p className={styles.visionPara}>
          AI governance can't be a wrapper. It has to be the substrate —
          deterministic execution, evidence-linked decisions, replayable
          pipelines, and policy snapshots captured at the moment of action.
          ORGLIDE was built on that conviction: governance, audit, and
          AI are not three products. They are one platform.
        </p>
        <p className={styles.visionPara}>
          Organizational intelligence is the missing primitive. Every
          control review, every audit response, every AI decision is a
          fact the organization should never have to re-derive. ORGLIDE's
          compliance memory turns those facts into continuously
          accumulating context — making the platform smarter with every
          decision the organization makes.
        </p>
        <p className={styles.visionPara}>
          Trust infrastructure will become as foundational to enterprise
          AI as identity infrastructure became to enterprise SaaS.
          That is the category ORGLIDE is built for.
        </p>
      </div>
    </div>


    {/* ===== ENTERPRISE CAPABILITIES MATRIX ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>ENTERPRISE CAPABILITIES MATRIX</span>
      <h3 className={styles.subTitle}>The platform surface area, in full.</h3>
      <p className={styles.subLead}>
        A capability matrix engineered for regulated enterprises and
        high-assurance AI environments. Every capability is a first-class
        subsystem — not a feature flag, not a roadmap entry.
      </p>
      <RevealGroup className={styles.capGrid} stagger={0.04}>
        {orglideCapabilities.map((c, i) => (
          <RevealItem key={i} className={styles.capCard}>
            <span className={styles.capTag}>{c.tag}</span>
            <h4 className={styles.capTitle}>{c.title}</h4>
            <p className={styles.capDesc}>{c.desc}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>


    {/* ===== PLATFORM ENGINEERING ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>PLATFORM ENGINEERING</span>
      <h3 className={styles.subTitle}>How the platform is engineered underneath.</h3>
      <div className={styles.engineeringGrid}>
        <div className={styles.engineeringCol}>
          <h4 className={styles.engineeringHeader}>Distributed Systems Design</h4>
          <p>Service boundaries are drawn around tenant context, not domain
          accident. Every cross-boundary call carries correlationId,
          causationId, tenant, actor, and policy version — making the
          platform deterministically traceable end-to-end.</p>

          <h4 className={styles.engineeringHeader}>Service Orchestration</h4>
          <p>AiOrchestrationService coordinates worker fan-out, lifecycle
          tracking, and result aggregation through the EventEnvelope bus.
          Workers are transport-agnostic; Kafka and in-process delivery
          are swappable without touching business logic.</p>

          <h4 className={styles.engineeringHeader}>Deterministic AI Execution</h4>
          <p>Every AI dispatch captures a snapshot of model, prompt, policy,
          retrieved context, and tenant state. Re-running the same job
          deterministically reproduces the same decision — a hard
          requirement for regulated AI.</p>

          <h4 className={styles.engineeringHeader}>Asynchronous Processing</h4>
          <p>AI workloads run asynchronously through the AiJob lifecycle
          (PENDING → PROCESSING → COMPLETED | RETRYING | FAILED). The UI
          surfaces job state in real time over STOMP without ever blocking
          on the AI path.</p>
        </div>

        <div className={styles.engineeringCol}>
          <h4 className={styles.engineeringHeader}>Resilience Engineering</h4>
          <p>Backoff retries, configurable max attempts, dead-letter
          routing, and graceful UI degradation. AI delays surface as
          "analysis delayed" — the platform never crashes on a failed
          model call.</p>

          <h4 className={styles.engineeringHeader}>Tenant Isolation</h4>
          <p>Tenancy is enforced structurally — at the data layer, the
          vector layer, the event bus, and the audit segment layer. Cross-
          tenant access paths don't exist by construction.</p>

          <h4 className={styles.engineeringHeader}>Observability-First Design</h4>
          <p>Health, throughput, job state, and per-correlation traces are
          exposed via /api/ai-pipeline. Operators get distributed visibility
          without ever reading the broker directly.</p>

          <h4 className={styles.engineeringHeader}>Replayability &amp; Event Sourcing</h4>
          <p>The audit chain and AiJob log are append-only event streams.
          Any historical compliance state is reconstructable; any past AI
          pipeline run is replayable. The system has no "lost yesterday."</p>
        </div>
      </div>
    </div>


    {/* ===== AI GOVERNANCE DEEP DIVE ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>AI GOVERNANCE</span>
      <h3 className={styles.subTitle}>Governance-native AI execution.</h3>
      <p className={styles.subLead}>
        AI inside ORGLIDE doesn't run in a vacuum. Every decision is
        bound to a policy snapshot, an evidence set, a tenant context,
        and an audit segment. The result: AI workflows that survive
        enterprise scrutiny — and reconstruct themselves on demand.
      </p>
      <RevealGroup className={styles.governanceGrid} stagger={0.05}>
        <RevealItem className={styles.governanceCard}>
          <h4>Policy-Aware AI Execution</h4>
          <p>Every AI dispatch is evaluated against the tenant's active
          policy snapshot. Drift between when a policy was written and
          when an AI decision was made is observable, not invisible.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>Evidence-Linked Decisions</h4>
          <p>Every AI output references the exact documents, controls,
          and prior decisions it consumed — making the decision graph
          fully reconstructable for audit.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>Audit Reconstruction</h4>
          <p>Audit segments are hash-linked and event-sourced. Any past
          compliance state is rebuildable directly from the log —
          no manual reconstruction, no quarterly scramble.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>AI Lifecycle Tracking</h4>
          <p>Every AI job moves through a tracked lifecycle with
          PENDING / PROCESSING / COMPLETED / RETRYING / FAILED states
          and durable error context — never a silent failure.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>AI Orchestration Tracing</h4>
          <p>CorrelationId / causationId thread every dispatch through
          fan-out workers and downstream effects. A single upload's
          full pipeline is queryable in one trace.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>Compliance Memory Accumulation</h4>
          <p>AiComplianceMemoryService ingests closed decisions into a
          vector-backed memory layer. Future controls retrieve precedent
          as context — governance compounds with use.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>Enterprise Explainability</h4>
          <p>Every decision can be opened: which model, which prompt,
          which retrieved context, which policy version, which tenant.
          Explainability is structural, not bolted on.</p>
        </RevealItem>
        <RevealItem className={styles.governanceCard}>
          <h4>Deterministic Re-Runs</h4>
          <p>Re-dispatching an AI job against the same captured inputs
          and policy snapshot produces the same decision. Regulator-grade
          reproducibility, by design.</p>
        </RevealItem>
      </RevealGroup>
    </div>


    {/* ===== SYSTEM INTELLIGENCE / OBSERVABILITY ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>SYSTEM INTELLIGENCE</span>
      <h3 className={styles.subTitle}>Operational telemetry built like a serious infrastructure platform.</h3>
      <RevealGroup className={styles.observabilityGrid} stagger={0.06}>
        <RevealItem className={styles.obsCard}>
          <span className={styles.obsLabel}>LIVE TELEMETRY</span>
          <p>STOMP / WebSocket streams on <code>/topic/ai-pipeline</code>
          push job lifecycle deltas to operator dashboards in real time.</p>
        </RevealItem>
        <RevealItem className={styles.obsCard}>
          <span className={styles.obsLabel}>PIPELINE THROUGHPUT</span>
          <p><code>/api/ai-pipeline/metrics</code> exposes counts by
          status, event type, and p-avg latency across the worker fleet.</p>
        </RevealItem>
        <RevealItem className={styles.obsCard}>
          <span className={styles.obsLabel}>AI JOB HEALTH</span>
          <p><code>/api/ai-pipeline/health</code> surfaces transport,
          provider, and worker readiness — operational liveness for the
          entire AI plane.</p>
        </RevealItem>
        <RevealItem className={styles.obsCard}>
          <span className={styles.obsLabel}>EVENT TRACING</span>
          <p><code>/api/ai-pipeline/jobs/correlation/&#123;id&#125;</code>
          traces a single upload's full fan-out across workers and
          downstream effects.</p>
        </RevealItem>
        <RevealItem className={styles.obsCard}>
          <span className={styles.obsLabel}>QUEUE MONITORING</span>
          <p>Per-worker backpressure, retry state, and DLQ visibility —
          surfaced at the operator layer, not buried in the broker.</p>
        </RevealItem>
        <RevealItem className={styles.obsCard}>
          <span className={styles.obsLabel}>INCIDENT RECONSTRUCTION</span>
          <p>Correlation-tagged event history lets operators reconstruct
          the exact sequence of any historical incident from the log.</p>
        </RevealItem>
      </RevealGroup>
    </div>


    {/* ===== SECURITY + TRUST ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>SECURITY &amp; TRUST FABRIC</span>
      <h3 className={styles.subTitle}>Enterprise-grade controls, end to end.</h3>
      <RevealGroup className={styles.trustGrid} stagger={0.05}>
        <RevealItem className={styles.trustCard}>
          <h4>Encryption</h4>
          <p>Documents and evidence are encrypted at rest with tenant-
          scoped key contexts; retrieval URLs are signed and short-lived.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Signed Retrieval</h4>
          <p>Every document and audit segment access produces a signed,
          auditable retrieval record — no anonymous access paths exist.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Document Lineage</h4>
          <p>Every artifact is back-referenced to the AI decisions and
          audit segments it informs — a complete evidence DAG.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Tamper Evidence</h4>
          <p>Hash-linked audit segments make any historical mutation
          immediately and cryptographically detectable.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Audit Integrity</h4>
          <p>Append-only event log with verifiable segment hashes —
          regulator-grade integrity guarantees, not aspirational ones.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Tenant Security</h4>
          <p>Tenant context is enforced at the service, storage, vector,
          and audit layers — there is no shared mutable surface.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Retention Enforcement</h4>
          <p>Per-tenant retention windows enforced at storage and audit
          boundaries with cryptographic deletion attestations.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Evidence Immutability</h4>
          <p>Evidence segments are content-addressed and chained — any
          rewrite produces a divergent hash trail, never silent edits.</p>
        </RevealItem>
        <RevealItem className={styles.trustCard}>
          <h4>Secure Evidence Lifecycle</h4>
          <p>Ingest → classify → link → retain → legal-hold → delete —
          each stage emits an audit record on the immutable chain.</p>
        </RevealItem>
      </RevealGroup>
    </div>


    {/* ===== ENGINEERING PRINCIPLES ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>ENGINEERING PRINCIPLES</span>
      <h3 className={styles.subTitle}>The non-negotiables we build against.</h3>
      <RevealGroup className={styles.principleGrid} stagger={0.05}>
        {orglidePrinciples.map((p, i) => (
          <RevealItem key={i} className={styles.principleCard}>
            <span className={styles.principleNum}>{String(i+1).padStart(2,"0")}</span>
            <h4 className={styles.principleTitle}>{p.title}</h4>
            <p className={styles.principleDesc}>{p.desc}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>


    {/* ===== FOUNDER IMPACT ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>FOUNDER IMPACT</span>
      <h3 className={styles.subTitle}>What I built — and own — inside the platform.</h3>
      <RevealGroup className={styles.impactList} stagger={0.04}>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Architected the ORGLIDE platform end-to-end — service topology, event contracts, AI lifecycle, governance layer, and operator surface.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Engineered the distributed backend — service boundaries, tenant context propagation, and EventEnvelope orchestration across the AI pipeline.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Designed the governance architecture — policy snapshots, audit segments, hash-linked chains, and reconstructable compliance state.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Built the AI orchestration pipeline — AiOrchestrationService, worker fan-out, AiJob lifecycle, retry fabric, and deterministic re-runs.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Implemented observability infrastructure — /api/ai-pipeline health, metrics, jobs, correlation traces, and STOMP telemetry streams.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Designed the compliance memory system — vector-backed precedent layer powered by pluggable Embedding/VectorStore providers (pgvector).</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Engineered the multi-tenant trust infrastructure — structural tenant isolation across data, vector, event, and audit planes.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Developed the operational intelligence layer — System Intelligence console exposing AI pipeline state, throughput, and governance posture.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Designed event-driven AI execution — schema-versioned EventEnvelope, deterministic dispatch, transport-agnostic workers.</p></RevealItem>
        <RevealItem className={styles.impactItem}><span>◆</span><p>Created the enterprise audit infrastructure — immutable, append-only, hash-linked audit chains with full timeline reconstruction.</p></RevealItem>
      </RevealGroup>
    </div>


    {/* ===== ROADMAP ===== */}
    <div className={styles.orglideSubsection}>
      <span className={styles.subKicker}>PLATFORM ROADMAP</span>
      <h3 className={styles.subTitle}>Where ORGLIDE is going next.</h3>
      <RevealGroup className={styles.roadmapGrid} stagger={0.06}>
        {orglideRoadmap.map((r, i) => (
          <RevealItem key={i} className={styles.roadmapCard}>
            <span className={`${styles.roadmapPhase} ${styles[`phase_${r.phase.toLowerCase()}`]}`}>{r.phase}</span>
            <h4 className={styles.roadmapTitle}>{r.title}</h4>
            <p className={styles.roadmapDesc}>{r.desc}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>


    {/* ===== ENTERPRISE CTA ===== */}
    <div className={styles.enterpriseCta}>
      <div className={styles.enterpriseCtaInner}>
        <span className={styles.subKicker}>BUILD WITH US</span>
        <h3 className={styles.enterpriseCtaTitle}>
          Building trust infrastructure for enterprise AI.
        </h3>
        <p className={styles.enterpriseCtaDesc}>
          Designed for regulated industries operating at scale.
          Governance-native AI systems for the next generation of enterprises.
          Operational intelligence, compliance memory, and AI governance —
          unified in one platform.
        </p>
        <div className={styles.enterpriseCtaBtns}>
          <a href="https://www.orglide.com" target="_blank" rel="noreferrer" className={styles.orglideBtnPrimary}>Visit orglide.com →</a>
          <a href="https://www.linkedin.com/company/orglide/" target="_blank" rel="noreferrer" className={styles.orglideBtnSecondary}>ORGLIDE on LinkedIn</a>
          <a href="#ENQUIRY" onClick={(e)=>{e.preventDefault(); scrollToSection("ENQUIRY");}} className={styles.orglideBtnGhost}>Talk to the Founder</a>
        </div>
      </div>
    </div>

  </div>
</motion.section>


{/* ================= ARCHITECTURE HIGHLIGHTS ================= */}
<motion.section
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{once:true}}
ref={sectionRefs.current.ARCHITECTURE}
data-section="ARCHITECTURE"
className={styles.glassCard}
>
  <span className={styles.sectionKicker}>PLATFORM ARCHITECTURE</span>
  <h2 className={styles.sectionTitle}>How ORGLIDE Is Engineered</h2>
  <p className={styles.sectionLead}>
    A distributed, event-driven AI platform built around tenant isolation,
    deterministic AI orchestration, and an audit-grade trust fabric.
    Every subsystem is designed to survive enterprise scrutiny — security,
    compliance, observability, and resilience are first-class concerns.
  </p>

  <RevealGroup className={styles.archGrid} stagger={0.05}>
    {orglideArchitecture.map((a, i) => (
      <RevealItem key={i} className={styles.archCard}>
        <span className={styles.archTag}>{a.tag}</span>
        <h3 className={styles.archCardTitle}>{a.title}</h3>
        <p className={styles.archCardDesc}>{a.desc}</p>
      </RevealItem>
    ))}
  </RevealGroup>

  <div className={styles.archCtaBox}>
    <div>
      <h3 className={styles.archCtaTitle}>Let's build enterprise AI systems.</h3>
      <p className={styles.archCtaDesc}>
        If you're operating in regulated industries — finance, healthcare,
        infra, public sector — and need a serious AI governance and
        compliance fabric, ORGLIDE is the platform we're building for you.
      </p>
    </div>
    <div className={styles.archCtaBtns}>
      <a href="https://www.orglide.com" target="_blank" rel="noreferrer" className={styles.orglideBtnPrimary}>orglide.com</a>
      <a href="https://www.linkedin.com/company/orglide/" target="_blank" rel="noreferrer" className={styles.orglideBtnSecondary}>LinkedIn</a>
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

<span className={styles.sectionKicker}>SELECTED WORK</span>
<h1 className={styles.sectionTitle}>
Other Engineering Work
</h1>
<p className={styles.sectionLead}>
Alongside ORGLIDE, a selection of platforms, AI systems, and
client engagements I've architected and shipped.
</p>

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
