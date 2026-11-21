import { useState, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import {
  Container,
  Heading,
  Numeral,
  Section,
  Button,
  ButtonLink,
  Arrow,
} from "../components/brand";
import {
  DrawLine,
  EASE_OUT,
  Item,
  Reveal,
  Stagger,
  StepTile,
  useIsMobile,
} from "../motion";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Department = "All" | "Engineering" | "Design" | "Marketing";

interface Role {
  id: string;
  title: string;
  department: "Engineering" | "Design" | "Marketing";
  seniority: string;
  location: string;
  workMode: "On-Site" | "Hybrid" | "Remote-First";
  clearance: string;
  summary: string;
  mandate: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  milestones: { month: string; deliverable: string }[];
  tags: string[];
}

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const ROLES: Role[] = [
  {
    id: "staff-distributed-systems",
    title: "Staff Distributed Systems Engineer",
    department: "Engineering",
    seniority: "Staff / Principal",
    location: "Chittagong, Bangladesh / Hybrid / Global Remote",
    workMode: "Hybrid",
    clearance: "Sovereign Background Verification",
    summary:
      "Architect, validate, and scale distributed consensus engines, offline-first sync pipelines, and sovereign data center clusters engineered to withstand geopolitical network disruptions.",
    mandate:
      "Modern public institutions and critical conglomerates cannot depend on black-box commercial clouds with extraterritorial jurisdiction. You will own the distributed consensus protocols and bare-metal orchestration engines that power nation-scale registries and air-gapped operational workloads under statutory custody.",
    responsibilities: [
      "Design fault-tolerant distributed consensus mechanisms that guarantee mathematical data consistency across intermittent, air-gapped, and high-latency sovereign network partitions.",
      "Build deterministic storage engines and automated zero-downtime replication pipelines handling multi-million citizen records with zero data loss.",
      "Implement custom Linux kernel tuning, eBPF telemetry collectors, and network namespace isolation for statutory GovCloud deployments.",
      "Eliminate third-party cloud dependencies by authoring bare-metal provisioning and Kubernetes cluster orchestration runbooks.",
      "Lead formal technical architecture reviews, schema definitions (OpenAPI 3.1 / typed gRPC), and chaos engineering failure simulations.",
    ],
    qualifications: [
      "7+ years of deep experience in systems programming using Go, Rust, or modern C++ in high-concurrency environments.",
      "Demonstrated mastery of distributed consensus algorithms (Raft, Paxos), vector clocks, and Conflict-Free Replicated Data Types (CRDTs).",
      "Comprehensive understanding of Linux systems internals, TCP/IP socket tuning, eBPF telemetry, memory profiling, and SIMD optimizations.",
      "Production experience operating air-gapped or bare-metal infrastructure (Talos Linux, bare-metal Kubernetes, or dedicated GovCloud enclaves).",
      "Strict commitment to contract-first architecture, explicit type safety, and zero external runtime API telemetry leaks.",
    ],
    preferred: [
      "Prior track record contributing to open-source distributed databases, storage engines, or container runtimes.",
      "Experience with statutory compliance auditing, post-quantum encryption readiness, or defense communications protocols.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Audit and benchmark our air-gapped cryptographic sync engine under 100k concurrent synthetic simulated node partitions.",
      },
      {
        month: "Month 02",
        deliverable:
          "Ship an eBPF-based low-overhead latency observability daemon for bare-metal GovCloud clusters.",
      },
      {
        month: "Month 03",
        deliverable:
          "Author the architectural blueprint and reference implementation for the next-generation sovereign civil registry pipeline.",
      },
    ],
    tags: ["Rust", "Go", "Distributed Consensus", "eBPF", "Raft", "Bare-Metal", "GovCloud"],
  },
  {
    id: "principal-security-cryptography",
    title: "Principal Security & Cryptographic Architect",
    department: "Engineering",
    seniority: "Principal / Technical Lead",
    location: "Chittagong, Bangladesh / Hybrid / Global Remote",
    workMode: "Hybrid",
    clearance: "Statutory Security Clearable",
    summary:
      "Lead cryptographic architecture, Hardware Security Module (HSM) integrations, post-quantum readiness, and statutory zero-trust access boundaries across all government platforms.",
    mandate:
      "Sovereignty is meaningless if cryptographic custody is outsourced. You will engineer the cryptographic custody frameworks ensuring sovereign clients retain exclusive custody of encryption keys, root certificate authorities, and immutable audit ledgers.",
    responsibilities: [
      "Engineer cryptographic custody models ensuring clients retain exclusive sovereignty over encryption keys, root CAs, and audit logs.",
      "Integrate and certify PKCS#11 interfaces with Hardware Security Modules (YubiHSM, Thales Luna, AWS CloudHSM) for identity and licensing platforms.",
      "Architect mutual TLS (mTLS) zero-trust service meshes with ephemeral cryptographic certificates and deterministic access revocation.",
      "Conduct forensic code audits, mathematical verification of cryptographic algorithms, and red-team penetration benchmarks against state-sponsored threat vectors.",
      "Design mathematically verifiable tamper-evident audit ledgers that prove data integrity to parliamentary and statutory oversight committees.",
    ],
    qualifications: [
      "8+ years in enterprise security engineering, applied cryptography, or defense-grade information assurance.",
      "Deep fluency in cryptographic primitives (AES-GCM, Ed25519, ChaCha20-Poly1305, Dilithium/Kyber post-quantum candidates).",
      "Proven experience with HSM interfaces, OpenSSL/BoringSSL internals, PKI architecture, and TPM 2.0 attestation.",
      "Strong background in vulnerability research, reverse engineering, OWASP Top 10, and statutory compliance (ISO 27001, SOC 2 Type II, national data protection acts).",
      "Ability to communicate rigorous cryptographic trade-offs directly to ministerial CIOs and technical steering committees.",
    ],
    preferred: [
      "Master's or Ph.D. in Computer Science, Applied Mathematics, or Cryptography.",
      "Published research in secure multi-party computation, zero-knowledge proofs, or post-quantum key exchange.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Complete an end-to-end cryptographic threat model of our offline-sync and key custody architecture.",
      },
      {
        month: "Month 02",
        deliverable:
          "Deploy an automated HSM-backed key rotation and attestation daemon with automated failover.",
      },
      {
        month: "Month 03",
        deliverable:
          "Formalize Synapstream's Post-Quantum Cryptographic Migration Roadmap for sovereign client contracts.",
      },
    ],
    tags: ["Cryptography", "HSM", "Zero-Trust", "PKI", "mTLS", "Rust", "Post-Quantum"],
  },
  {
    id: "lead-product-designer",
    title: "Lead Institutional Product Designer",
    department: "Design",
    seniority: "Lead / Principal",
    location: "Chittagong, Bangladesh / Hybrid / Global Remote",
    workMode: "Hybrid",
    clearance: "Standard Non-Disclosure & Code Covenant",
    summary:
      "Own product design for mission-critical institutional dashboards, statutory citizen portals, and dense operational telemetry interfaces that cannot tolerate user error.",
    mandate:
      "Government software does not have to look like archaic bureaucracy. You will define the visual and interaction standard for national software platforms—combining the density of a Bloomberg terminal with the effortless precision of Swiss typographic architecture.",
    responsibilities: [
      "Architect multi-tier UI systems that synthesize millions of data points into legible, error-proof operational workflows for civil servants and enterprise operators.",
      "Establish and govern the Synapstream Design System (tokens, components, typography scales, contrast algorithms) bridging Figma and React 19 / Tailwind.",
      "Design accessibility-first user journeys compliant with strict WCAG 2.2 AAA standards across low-bandwidth environments, screen readers, and multi-lingual scripts.",
      "Conduct deep domain-modeling interviews with institutional stakeholders, mapping intricate legal requirements into frictionless interaction states.",
      "Partner directly with staff engineers to review CSS implementations, ensuring sub-pixel visual fidelity, zero layout shift, and tactile interactive feedback.",
    ],
    qualifications: [
      "6+ years designing complex SaaS, data-dense applications, financial terminals, or government enterprise platforms.",
      "Flawless command of Figma (Variables, Auto-Layout, Component Sets, Token Studio) and a deep understanding of CSS Grid / Flexbox mechanics.",
      "Uncompromising obsession with typography, information hierarchy, data visualization, and micro-interactions.",
      "Demonstrated experience designing for high-stakes environments where cognitive overload causes operational failure.",
      "Portfolio showcasing shipped, complex applications with documented design rationale and edge-case mapping.",
    ],
    preferred: [
      "Working knowledge of React, Tailwind CSS, and Git version control to inspect or contribute directly to design system repositories.",
      "Experience designing localized interfaces for non-Latin scripts (Arabic, Bengali, Cyrillic) and right-to-left layout mechanics.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Unify and publish the Synapstream Institutional Design Token specification across Figma and React.",
      },
      {
        month: "Month 02",
        deliverable:
          "Redesign the telemetry and node-management console for our sovereign cloud deployment suite.",
      },
      {
        month: "Month 03",
        deliverable:
          "Establish the institutional accessibility test suite guaranteeing WCAG AAA compliance across all future deliverables.",
      },
    ],
    tags: ["Design Systems", "Figma", "Data Density", "WCAG AAA", "Typography", "Tokens"],
  },
  {
    id: "creative-technologist-3d",
    title: "Senior Creative Technologist & 3D Spatial Designer",
    department: "Design",
    seniority: "Senior / Specialist",
    location: "Chittagong, Bangladesh / Hybrid / Global Remote",
    workMode: "Remote-First",
    clearance: "Standard Non-Disclosure & Code Covenant",
    summary:
      "Bridge high-end digital art and performance engineering. Build real-time 3D web visualizations, custom GLSL shaders, and interactive spatial artifacts that visually define our platforms.",
    mandate:
      "We believe technology should feel physical, palpable, and grounded. You will turn abstract distributed infrastructure and air-gapped cryptographic topologies into mesmerizing, interactive 3D digital artifacts that run smoothly at 60fps across any browser.",
    responsibilities: [
      "Author high-performance WebGL, Three.js, and GLSL shader pipelines that render at 60fps across both high-end desktop workstations and mobile hardware.",
      "Design bespoke procedural visuals, dot-matrix halftones, topological terrain meshes, and interactive 3D spatial node maps.",
      "Collaborate with product designers and frontend architects to integrate interactive canvas elements into clean, semantic React component hierarchies.",
      "Optimize 3D assets, draw calls, vertex counts, and memory buffers to prevent frame drops and battery drain on low-spec hardware.",
      "Continuously push the creative aesthetic boundaries of institutional technology, transforming abstract sovereign code into tactile digital monuments.",
    ],
    qualifications: [
      "4+ years of professional experience in Creative Technology, WebGL, Three.js, or GLSL shader development.",
      "Deep understanding of 3D math (linear algebra, vector projection, quaternions, raymarching, trigonometric transforms).",
      "Fluency in modern TypeScript, React, Vite, and performance profiling via Chrome DevTools and Spector.js.",
      "Solid foundations in 3D modeling tools (Blender, Houdini) with expertise in baking PBR maps and optimizing glTF/GLB models.",
      "Portfolio featuring live, interactive web graphics that demonstrate exceptional aesthetic taste and buttery-smooth frame rates.",
    ],
    preferred: [
      "Experience with WebGPU API and compute shaders for particle physics simulations.",
      "Knowledge of generative design, parametric architectural algorithms, and physical computing.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Build a high-performance WebGL topology visualizer demonstrating real-time air-gapped node connectivity.",
      },
      {
        month: "Month 02",
        deliverable:
          "Ship 3 interactive canvas artifacts showcasing sovereign encryption key states and tensor junction routing.",
      },
      {
        month: "Month 03",
        deliverable:
          "Create an automated rendering pipeline that converts complex network architecture diagrams into lightweight 3D interactive models.",
      },
    ],
    tags: ["WebGL", "Three.js", "GLSL Shaders", "3D Math", "Blender", "TypeScript"],
  },
  {
    id: "head-of-technical-marketing",
    title: "Head of Institutional & Technical Product Marketing",
    department: "Marketing",
    seniority: "Director / Lead",
    location: "Chittagong, Bangladesh / Hybrid / Global Remote",
    workMode: "Hybrid",
    clearance: "Statutory Security Clearable",
    summary:
      "Lead strategic positioning, commercial narrative, and technical collateral communicating Synapstream's sovereign value proposition to government ministries, enterprise CIOs, and defense executives.",
    mandate:
      "Selling institutional digital infrastructure is not consumer growth marketing. You will craft the intellectual arguments, benchmark dossiers, and statutory narratives that convince national authorities to abandon legacy vendor lock-in and adopt sovereign engineering systems.",
    responsibilities: [
      "Own the positioning framework and commercial narrative that differentiates Synapstream from legacy IT consultancies and opaque software vendors.",
      "Author authoritative technical architecture whitepapers, sovereign cloud benchmark reports, and executive briefing dossiers.",
      "Partner with solution architects to dissect complex institutional RFPs and translate sovereign technical capabilities into compelling winning proposals.",
      "Develop high-impact launch campaigns for major platform releases, sovereign LLM frameworks, and air-gapped infrastructure toolkits.",
      "Build relationships with defense analysts, government procurement directors, and technology journalists covering data sovereignty and national infrastructure.",
    ],
    qualifications: [
      "7+ years in technical product marketing, product strategy, or solutions marketing within enterprise B2B, cloud infrastructure, or cybersecurity.",
      "Exceptional writing and narrative capability; ability to synthesize complex distributed systems and cryptographic concepts into crystal-clear prose.",
      "Demonstrated experience engaging with institutional buyers, public sector procurement processes, or regulated industries.",
      "Strong technical literacy; comfortable reading architectural blueprints, API contracts, and security whitepapers.",
      "Track record of authoring industry-recognized research papers or leading landmark product launches.",
    ],
    preferred: [
      "Background in computer engineering or technical pre-sales before moving into product marketing.",
      "Familiarity with national digital sovereignty frameworks in South Asia, the Middle East, or the European Union.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Publish the 'Sovereign Cloud & National Infrastructure Benchmark 2026' research paper.",
      },
      {
        month: "Month 02",
        deliverable:
          "Overhaul our institutional RFP narrative kit and architecture briefing decks for ministry stakeholders.",
      },
      {
        month: "Month 03",
        deliverable:
          "Launch the dedicated marketing campaign for Synapstream's Air-Gapped Machine Intelligence platform.",
      },
    ],
    tags: ["Product Marketing", "Institutional Strategy", "GovTech", "Whitepapers", "Positioning", "RFPs"],
  },
  {
    id: "senior-technical-content-devrel",
    title: "Senior Technical Content & Developer Relations Strategist",
    department: "Marketing",
    seniority: "Senior / Lead",
    location: "Chittagong, Bangladesh / Hybrid / Global Remote",
    workMode: "Remote-First",
    clearance: "Standard Non-Disclosure & Code Covenant",
    summary:
      "Own the developer-facing voice of Synapstream. Author deep engineering postmortems, architectural case studies, reproducible benchmarks, and technical documentation.",
    mandate:
      "The best marketing for an engineering firm is unassailable technical truth. You will write deep, peer-reviewed engineering analyses that software architects and systems programmers actually bookmark, cite, and respect.",
    responsibilities: [
      "Write authoritative, highly technical engineering articles dissecting real architectural challenges (e.g., eBPF network observability, zero-copy deserialization, Byzantine fault tolerance).",
      "Collaborate with staff engineers to extract institutional learnings, producing reproducible benchmarks and open-source documentation.",
      "Direct Synapstream's technical publication, newsletter, and academic symposium presentations.",
      "Build and nurture relationships with prominent open-source maintainers, systems programming communities, and computer science researchers.",
      "Produce technical video walkthroughs and interactive architectural code tours explaining our contract-first and air-gapped deployments.",
    ],
    qualifications: [
      "5+ years in technical writing, developer advocacy, or software engineering with a demonstrable portfolio of published technical essays.",
      "Working ability to read and understand code in Go, Rust, or TypeScript and execute benchmark suites.",
      "Clear, rigorous writing style free of marketing buzzwords, fluff, or hand-waving; commitment to mathematical precision.",
      "Active engagement in technical communities (Hacker News, Lobsters, specialized systems programming forums).",
      "Experience producing technical diagrams, architecture schemas, and developer onboarding guides.",
    ],
    preferred: [
      "Previous software engineering experience before transitioning into developer relations or technical content strategy.",
      "Familiarity with interactive documentation tools, MDX pipelines, and technical diagramming using Mermaid or SVG.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Publish a landmark technical deep-dive on 'Engineering Air-Gapped Consensus: Lessons from Sovereign Registry Deployments.'",
      },
      {
        month: "Month 02",
        deliverable:
          "Establish the Synapstream Engineering Journal with a bi-weekly cadence of peer-reviewed technical essays.",
      },
      {
        month: "Month 03",
        deliverable:
          "Co-author a reproducible benchmark study comparing private sovereign LLM inference latency against public API gateways.",
      },
    ],
    tags: ["DevRel", "Technical Writing", "Architecture Essays", "Benchmarks", "Systems Programming"],
  },
];

const CULTURE_TENETS = [
  {
    n: 1,
    title: "Zero Corporate Theater",
    tag: "Autonomy",
    summary:
      "We have no product managers translating requirements through five layers of bureaucracy. Engineers, designers, and strategists work directly with client stakeholders in focused, autonomous vertical slices.",
  },
  {
    n: 2,
    title: "Statutory Craftsmanship",
    tag: "High Bar",
    summary:
      "We treat software as long-lived civil infrastructure. Every line of code is reviewed for type safety, memory leak vectors, algorithmic complexity, and mathematical citation accuracy before merge.",
  },
  {
    n: 3,
    title: "100% IP Handover",
    tag: "Integrity",
    summary:
      "We take pride in transferring full codebase repositories, schemas, and operational runbooks directly to client custody. We do not build lock-in traps; we build durable institutional capability.",
  },
  {
    n: 4,
    title: "Dedicated Sovereign R&D",
    tag: "Mastery",
    summary:
      "Unrestricted hardware allocations, dedicated air-gapped testbeds, private cloud compute quotas, and continuous research stipends so your technical craft never stagnates.",
  },
];

const SELECTION_STEPS = [
  {
    step: "01",
    name: "Portfolio & Systems Assessment",
    duration: "48-Hour Turnaround",
    description:
      "We review your real codebase repositories, design systems, or technical whitepapers. No generic automated leetcode quizzes; we evaluate architectural taste and depth.",
  },
  {
    step: "02",
    name: "Architectural Deep-Dive",
    duration: "60-Minute Discussion",
    description:
      "A technical conversation with our engineering or design leads exploring trade-offs, failure modes, data integrity, and real-world system bottlenecks you have solved.",
  },
  {
    step: "03",
    name: "Paid Collaborative Slice",
    duration: "2-Week Vertical Slice",
    description:
      "A fully compensated, real-world mini project where we build together. Experience our codebase, daily cadence, and technical standards before making a mutual commitment.",
  },
  {
    step: "04",
    name: "Sovereign Covenant & Offer",
    duration: "Final Sign-Off",
    description:
      "Comprehensive transparent offer, IP covenants, clear career milestone trajectory, and hardware provisioning tailored to your exact workflow requirements.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CAREERS COMPONENT                             */
/* -------------------------------------------------------------------------- */

export function Careers() {
  const isMobile = useIsMobile();
  const [selectedDept, setSelectedDept] = useState<Department>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRole, setExpandedRole] = useState<string | null>("staff-distributed-systems");
  const [applyingRole, setApplyingRole] = useState<Role | null>(null);

  // Application form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileUrl: "",
    portfolioUrl: "",
    note: "",
  });

  const filteredRoles = ROLES.filter((role) => {
    const matchesDept = selectedDept === "All" || role.department === selectedDept;
    const matchesSearch =
      searchQuery.trim() === "" ||
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      role.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setApplyingRole(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        profileUrl: "",
        portfolioUrl: "",
        note: "",
      });
    }, 2800);
  };

  return (
    <div className="pt-24 lg:pt-32">
      {/* -------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                      */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal delay={0.05}>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver">
                Careers & Institutional Craft
              </span>
            </Reveal>

            <h1 className="mt-6 text-[34px] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[50px] md:text-[64px]">
              Architecting long-lived systems demands non-negotiable standards.
            </h1>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-[66ch] text-[16px] sm:text-[18px] leading-[1.75] text-mist text-pretty">
                We do not build disposable software, bloated agency prototypes, or opaque consumer AI wrappers.
                Synapstream engineers critical digital infrastructure, sovereign GovCloud platforms, and air-gapped
                machine intelligence for national institutions and enterprise conglomerates. We are hiring engineers,
                designers, and marketing strategists who value rigorous systems thinking, absolute craft precision,
                and permanent institutional ownership.
              </p>
            </Reveal>

            {/* Quick Metrics */}
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
                {[
                  { metric: "Zero", label: "Corporate Theater", sub: "Autonomous vertical slices" },
                  { metric: "100%", label: "IP Handover", sub: "Zero client vendor lock-in" },
                  { metric: "Air-Gapped", label: "Isolated Testbeds", sub: "Dedicated physical hardware" },
                  { metric: "Elite", label: "Compensation Band", sub: "Top-tier regional compensation" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="tile-sm border border-line bg-obsidian/70 p-4 sm:p-5"
                  >
                    <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {stat.metric}
                    </span>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-400">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. CULTURE & ENGINEERING COVENANTS                                   */}
      {/* -------------------------------------------------------------------- */}
      <Section id="culture" className="border-t border-hairline bg-[#040404]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Engineering Culture
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[38px]">
              How We Work & What We Value
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver text-justify [text-align-last:center]">
              We have eliminated the friction, political theater, and superficial metrics that plague
              traditional tech companies. We optimize strictly for high-velocity craft, verifiable correctness,
              and intellectual honesty.
            </p>
          </div>

          <Stagger
            as="div"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CULTURE_TENETS.map((t, idx) => (
              <Item key={t.n}>
                <StepTile
                  as="article"
                  hover
                  delay={idx * 0.08}
                  className="tile-lg flex h-full flex-col justify-between border border-line bg-obsidian p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Numeral n={t.n} className="text-2xl text-white" />
                      <span className="tile-xs border border-line bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-silver">
                        {t.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em] text-white">
                      {t.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-mist">
                      {t.summary}
                    </p>
                  </div>
                </StepTile>
              </Item>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. OPEN POSITIONS SECTION                                            */}
      {/* -------------------------------------------------------------------- */}
      <Section id="open-roles" className="border-t border-hairline">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                Active Requisitions
              </span>
              <Heading as="h2" className="mt-3 text-[28px] sm:text-[40px]">
                Open Institutional Roles
              </Heading>
              <p className="mt-2 text-sm text-silver">
                Showing {filteredRoles.length} of {ROLES.length} open positions across Engineering, Design, and Marketing.
              </p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(["All", "Engineering", "Design", "Marketing"] as Department[]).map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`tile-xs px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    selectedDept === dept
                      ? "border-white bg-white text-black font-semibold shadow-[0_0_16px_rgba(255,255,255,0.2)]"
                      : "border-line bg-obsidian text-silver hover:border-white/40 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex items-center gap-3 border border-line bg-obsidian/80 px-4 py-3">
            <svg
              className="size-4 shrink-0 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by role title, technical keywords, or focus area (e.g. Rust, Shaders, GovCloud)..."
              className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="font-mono text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Role Cards List */}
          <div className="mt-8 space-y-6">
            {filteredRoles.length === 0 ? (
              <div className="tile border border-line bg-obsidian/60 p-12 text-center">
                <p className="font-mono text-sm text-neutral-400">
                  No active roles match your search criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDept("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 font-mono text-xs text-white underline underline-offset-4"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredRoles.map((role) => {
                const isExpanded = expandedRole === role.id;
                return (
                  <div
                    key={role.id}
                    className={`tile border transition-all duration-300 ${
                      isExpanded
                        ? "border-white/35 bg-obsidian shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
                        : "border-line bg-obsidian/70 hover:border-white/20"
                    }`}
                  >
                    {/* Header Bar */}
                    <div
                      className="cursor-pointer p-6 sm:p-8"
                      onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="tile-xs border border-line bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-silver">
                              {role.department}
                            </span>
                            <span className="font-mono text-xs text-neutral-400">
                              • {role.seniority}
                            </span>
                            <span className="font-mono text-xs text-neutral-400">
                              • {role.workMode}
                            </span>
                          </div>
                          <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-white">
                            {role.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setApplyingRole(role);
                            }}
                            className="tile-xs border border-white bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
                          >
                            Apply Now
                          </button>
                          <span className="font-mono text-xs uppercase tracking-wider text-silver flex items-center gap-1.5">
                            {isExpanded ? "Hide Details" : "Full Specs"}
                            <svg
                              className={`size-3.5 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-[14.5px] leading-relaxed text-mist">
                        {role.summary}
                      </p>

                      {/* Tag Strip */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tile-xs border border-line/60 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Deep-Dive Specifications */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE_OUT }}
                          className="overflow-hidden border-t border-line bg-black/40"
                        >
                          <div className="p-6 sm:p-10 space-y-8">
                            {/* Operational Mandate */}
                            <div>
                              <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                                The Operational Mandate
                              </span>
                              <p className="mt-2 text-[15px] leading-relaxed text-white">
                                {role.mandate}
                              </p>
                            </div>

                            {/* Two-Column Specs */}
                            <div className="grid gap-8 lg:grid-cols-2">
                              {/* Responsibilities */}
                              <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                                  Core Responsibilities
                                </span>
                                <ul className="mt-3 space-y-2.5">
                                  {role.responsibilities.map((r, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-mist"
                                    >
                                      <span className="font-mono text-xs text-white shrink-0 mt-0.5">
                                        [0{i + 1}]
                                      </span>
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Technical Profile */}
                              <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                                  Required Qualifications
                                </span>
                                <ul className="mt-3 space-y-2.5">
                                  {role.qualifications.map((q, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-mist"
                                    >
                                      <span className="size-1.5 rounded-full bg-white shrink-0 mt-2" />
                                      <span>{q}</span>
                                    </li>
                                  ))}
                                </ul>

                                {role.preferred.length > 0 && (
                                  <div className="mt-6 pt-4 border-t border-line/60">
                                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                                      Differentiating Experience
                                    </span>
                                    <ul className="mt-2 space-y-1.5">
                                      {role.preferred.map((p, i) => (
                                        <li
                                          key={i}
                                          className="text-xs text-neutral-400 leading-relaxed"
                                        >
                                          • {p}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* First 90 Days Milestones */}
                            <div className="border-t border-line pt-6">
                              <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                                First 90 Days Architectural Milestones
                              </span>
                              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                {role.milestones.map((m) => (
                                  <div
                                    key={m.month}
                                    className="border border-line bg-obsidian/80 p-4"
                                  >
                                    <span className="font-mono text-xs font-semibold text-white">
                                      {m.month}
                                    </span>
                                    <p className="mt-2 text-xs leading-relaxed text-silver">
                                      {m.deliverable}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-6">
                              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                                <span>Location: {role.location}</span>
                                <span>•</span>
                                <span>Clearance: {role.clearance}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setApplyingRole(role)}
                                className="w-full sm:w-auto tile-sm border border-white bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
                              >
                                Submit Application for {role.title}
                              </button>
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. THE SELECTION PROCESS                                             */}
      {/* -------------------------------------------------------------------- */}
      <Section id="process" className="border-t border-hairline bg-[#040404]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
              Engineering Selection
            </span>
            <Heading as="h2" className="mt-4 text-[26px] sm:text-[38px]">
              A Rigorous, Respectful Hiring Process
            </Heading>
            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-silver text-justify [text-align-last:center]">
              We respect your time. Our hiring pipeline is designed by senior practitioners to evaluate
              real architectural thinking and code quality without automated puzzle tests or generic recruiter screens.
            </p>
          </div>

          <div className="mt-14 space-y-4">
            {SELECTION_STEPS.map((s) => (
              <div
                key={s.step}
                className="tile-sm grid gap-6 border border-line bg-obsidian p-6 sm:p-8 transition-colors hover:border-white/30 md:grid-cols-[100px_1fr_200px] md:items-center"
              >
                <div className="flex items-center gap-3 md:block">
                  <Numeral n={s.step} className="text-3xl text-white" />
                  <span className="block font-mono text-xs text-neutral-400 md:mt-1">
                    {s.duration}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-mist">
                    {s.description}
                  </p>
                </div>
                <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                    Evaluation Format
                  </span>
                  <p className="mt-1 font-semibold text-white">Peer Evaluation</p>
                </div>
              </div>
            ))}
          </div>

          {/* General Open Application Box */}
          <div className="tile mt-14 border border-line bg-obsidian p-8 sm:p-12 text-center md:text-left">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-silver">
                  Unconventional Profiles
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.015em] text-white">
                  Don't see your exact role listed?
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mist">
                  We frequently create bespoke roles for exceptional systems programmers, cryptographic
                  researchers, and technical writers whose depth exceeds standard job descriptions.
                  Send us your public code repositories, architecture RFCs, or technical portfolios.
                </p>
              </div>
              <div className="shrink-0">
                <a
                  href="mailto:careers@synapstream.com?subject=Unconventional%20Application%20%E2%80%94%20Synapstream"
                  className="tile-sm inline-flex items-center gap-2 border border-white bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
                >
                  <span>Inquire Directly</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. APPLICATION MODAL / DRAWER                                        */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {applyingRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!formSubmitted) setApplyingRole(null);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <m.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="relative w-full max-w-2xl border border-white/20 bg-obsidian p-6 sm:p-10 shadow-2xl z-10 my-8"
            >
              <div className="flex items-start justify-between border-b border-line pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-silver">
                    Application Dossier
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                    {applyingRole.title}
                  </h3>
                  <span className="mt-1 block font-mono text-xs text-neutral-400">
                    Department: {applyingRole.department} • {applyingRole.location}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setApplyingRole(null)}
                  disabled={formSubmitted}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-white text-black font-bold">
                    ✓
                  </div>
                  <h4 className="mt-4 text-xl font-semibold text-white">
                    Dossier Received
                  </h4>
                  <p className="mx-auto mt-2 max-w-md text-sm text-mist leading-relaxed">
                    Thank you, {formData.name}. Your application for {applyingRole.title} has been logged
                    directly into our engineering backlog. A technical lead will review your submission within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Engineer / Alex Smith"
                        className="mt-1.5 w-full border border-line bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                        Primary Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="mt-1.5 w-full border border-line bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                        Phone / Signal
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1..."
                        className="mt-1.5 w-full border border-line bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                        GitHub / LinkedIn / Portfolio URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.profileUrl}
                        onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="mt-1.5 w-full border border-line bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                      Technical Highlight or Standout Project URL
                    </label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      placeholder="Link to specific pull request, whitepaper, shader, or case study"
                      className="mt-1.5 w-full border border-line bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                      Why Synapstream? (Brief technical rationale)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Share a brief overview of your background with sovereign systems, distributed architectures, high-density UI, or institutional marketing..."
                      className="mt-1.5 w-full border border-line bg-black/60 p-3 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyingRole(null)}
                      className="px-4 py-2 font-mono text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="tile-sm border border-white bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-neutral-200"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
