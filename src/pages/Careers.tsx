import { useState, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import {
  Container,
  Heading,
  Numeral,
  Section,
  Arrow,
} from "../components/brand";
import {
  EASE_OUT,
  Item,
  Stagger,
  StepTile,
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
    id: "full-stack-engineer",
    title: "Full-Stack Software Engineer",
    department: "Engineering",
    seniority: "Mid-Level (2–4 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Hybrid",
    clearance: "Standard Background Verification",
    summary:
      "Build and maintain user-facing web applications and backend APIs, delivering end-to-end features from database schemas to responsive frontend interfaces.",
    mandate:
      "You will work across the full stack—developing intuitive React interfaces, typed API endpoints, and scalable database schemas for mission-critical client applications. We focus on clean code, automated test coverage, and responsive performance.",
    responsibilities: [
      "Develop responsive, accessible web interfaces using React, TypeScript, and modern CSS frameworks like Tailwind.",
      "Design and implement RESTful and typed API endpoints backed by PostgreSQL and Node.js or Go.",
      "Write comprehensive unit, integration, and end-to-end tests to maintain high software reliability.",
      "Collaborate with product designers in Figma to turn wireframes into pixel-perfect, accessible interactive components.",
      "Participate in peer code reviews, sprint planning, and architectural discussions to uphold engineering standards.",
    ],
    qualifications: [
      "2–4 years of full-stack web development experience using TypeScript, React, and Node.js or Go.",
      "Strong proficiency in SQL schema design, migrations, and query optimization with relational databases (PostgreSQL/MySQL).",
      "Demonstrated understanding of web performance fundamentals, responsive layout patterns, and modern state management.",
      "Experience building and consuming structured APIs with contract-first tooling (OpenAPI, tRPC, or REST).",
      "Familiarity with Git version control, CI/CD pipelines, and containerization using Docker.",
    ],
    preferred: [
      "Experience with modern build tools (Vite, Next.js) and cloud deployment platforms.",
      "Contributions to open-source software or public technical side projects.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Onboard onto our core repository, ship your first full-stack feature to production, and refine our end-to-end test suite.",
      },
      {
        month: "Month 02",
        deliverable:
          "Lead the development of a real-time notification service and optimize database query latency for high-traffic dashboards.",
      },
      {
        month: "Month 03",
        deliverable:
          "Architect and deliver a reusable component module for customer analytics with automated documentation and unit tests.",
      },
    ],
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
  },
  {
    id: "backend-systems-engineer",
    title: "Backend & Systems Engineer",
    department: "Engineering",
    seniority: "Mid-Level (3–5 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Hybrid",
    clearance: "Standard Background Verification",
    summary:
      "Design and scale reliable backend microservices, background job workers, and database architectures for high-throughput enterprise platforms.",
    mandate:
      "You will own the core business logic, asynchronous task queues, and data storage layers that power institutional client workflows. We emphasize zero-downtime migrations, latency reduction, and predictable system behavior.",
    responsibilities: [
      "Build resilient backend services and background job processors using Go, Python, or Rust.",
      "Architect reliable database schemas, indexes, and caching strategies using PostgreSQL, Redis, and event streams.",
      "Implement structured telemetry, distributed tracing, and health checks to maintain high service observability.",
      "Automate deployment pipelines and manage containerized workloads across cloud and on-premise Kubernetes clusters.",
      "Profile memory usage, CPU hotspots, and database connection pools to eliminate performance bottlenecks.",
    ],
    qualifications: [
      "3–5 years of professional backend development experience in Go, Python, or Rust.",
      "Deep understanding of relational database internals, transaction isolation levels, indexing, and connection pooling.",
      "Familiarity with message queues and event-driven patterns (RabbitMQ, Kafka, or Redis Streams).",
      "Practical experience with Linux server administration, Docker containerization, and basic Kubernetes operations.",
      "Strong commitment to automated testing, defensive programming, and clean error handling.",
    ],
    preferred: [
      "Experience with gRPC, Protocol Buffers, and microservice communication patterns.",
      "Familiarity with cloud platforms (AWS, GCP) and Infrastructure as Code using Terraform.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Familiarize yourself with the backend architecture, set up local development environments, and resolve priority performance tickets.",
      },
      {
        month: "Month 02",
        deliverable:
          "Migrate an existing synchronous data processing pipeline to an asynchronous event-driven queue with retry policies.",
      },
      {
        month: "Month 03",
        deliverable:
          "Implement comprehensive OpenTelemetry instrumentation across primary microservices to establish latency baselines.",
      },
    ],
    tags: ["Go", "Python", "PostgreSQL", "Redis", "Docker", "Linux", "REST APIs"],
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    seniority: "Mid-Level (2–4 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Remote-First",
    clearance: "Standard Background Verification",
    summary:
      "Craft fast, accessible, and responsive user interfaces using React, TypeScript, and modern CSS, ensuring sub-second page loads and tactile user feedback.",
    mandate:
      "You will translate complex data sets and multifaceted workflows into clean, accessible web applications. You care deeply about layout precision, smooth transitions, mobile responsiveness, and Core Web Vitals.",
    responsibilities: [
      "Build accessible, performant UI components using React 19, TypeScript, and Tailwind CSS.",
      "Ensure high visual consistency and compliance with WCAG 2.1 AA accessibility guidelines.",
      "Collaborate with product designers to review Figma designs and implement interactive micro-animations with Motion.",
      "Optimize client-side bundle sizes, code splitting, and caching to achieve high Lighthouse performance scores.",
      "Write unit and integration tests using Vitest and React Testing Library for core user interaction flows.",
    ],
    qualifications: [
      "2–4 years of specialized frontend engineering experience with modern React and TypeScript.",
      "Mastery of CSS, Flexbox, CSS Grid, responsive design patterns, and utility-first styling.",
      "Solid grasp of DOM rendering cycles, client-side caching, and asynchronous data fetching patterns.",
      "Demonstrated portfolio or GitHub projects showing high visual attention to detail and clean component code.",
      "Experience collaborating in agile environments with design handoffs in Figma.",
    ],
    preferred: [
      "Experience with Next.js, Vite, or modern static site generation workflows.",
      "Understanding of animation libraries (Motion/Framer Motion, CSS animations) and canvas basics.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Audit the existing UI component library, improve responsive styling for tablet/mobile viewports, and add missing component tests.",
      },
      {
        month: "Month 02",
        deliverable:
          "Deliver a modular data table component supporting client-side filtering, sorting, and pagination with zero layout shift.",
      },
      {
        month: "Month 03",
        deliverable:
          "Improve page load times across primary dashboards by optimizing assets, implementing dynamic code-splitting, and tuning Web Vitals.",
      },
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion", "Accessibility"],
  },
  {
    id: "product-designer",
    title: "Product Designer (UI/UX)",
    department: "Design",
    seniority: "Mid-Level (2–4 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Hybrid",
    clearance: "Standard Non-Disclosure Agreement",
    summary:
      "Design intuitive user experiences, wireframes, and high-fidelity interfaces for enterprise dashboards, web portals, and collaboration tools.",
    mandate:
      "Enterprise software should be intuitive, elegant, and efficient. You will turn intricate workflows and dense information architectures into effortless, user-centric experiences that operators love to use daily.",
    responsibilities: [
      "Create user journey maps, wireframes, interactive prototypes, and production-ready visual designs in Figma.",
      "Maintain and expand the company design system, including color palettes, typography scales, components, and variables.",
      "Partner closely with frontend engineers during handoffs to ensure accurate implementation of design tokens and responsive layouts.",
      "Conduct user testing sessions and analyze feedback to identify friction points and iterate on product usability.",
      "Advocate for accessibility, usability best practices, and clean typographic hierarchy across all digital products.",
    ],
    qualifications: [
      "2–4 years of product design experience working on web applications, SaaS tools, or internal enterprise software.",
      "Expertise in Figma (Auto-Layout, Component Sets, Variables, Interactive Prototyping).",
      "Strong foundational knowledge of typography, layout spacing, color theory, and UX heuristics.",
      "Basic understanding of HTML/CSS capabilities and constraints to collaborate effectively with software engineers.",
      "A portfolio demonstrating user-centered design thinking, wireframing processes, and polished final interfaces.",
    ],
    preferred: [
      "Experience conducting qualitative user interviews or usability test sessions.",
      "Knowledge of design tokens integration with frontend codebases (Tailwind or CSS variables).",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Familiarize yourself with product roadmaps, conduct a design audit of current application screens, and identify usability quick-wins.",
      },
      {
        month: "Month 02",
        deliverable:
          "Redesign the user onboarding flow and account settings dashboard, producing interactive Figma prototypes and user testing notes.",
      },
      {
        month: "Month 03",
        deliverable:
          "Publish an updated component library specification with standardized button variants, form states, and modal patterns.",
      },
    ],
    tags: ["Figma", "UI/UX", "Design Systems", "Prototyping", "User Research", "Wireframing"],
  },
  {
    id: "brand-visual-designer",
    title: "Brand & Visual Designer",
    department: "Design",
    seniority: "Junior / Mid-Level (1–3 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Hybrid",
    clearance: "Standard Non-Disclosure Agreement",
    summary:
      "Craft compelling visual identities, marketing assets, presentation decks, and web graphics that visually communicate Synapstream's engineering ethos.",
    mandate:
      "You will shape how the world perceives Synapstream. From editorial web graphics and social campaign visuals to client presentations and brand collateral, you will establish a cohesive, modern visual language.",
    responsibilities: [
      "Design graphic assets, hero banners, and vector illustrations for company websites, blog articles, and social media.",
      "Build polished presentation decks and technical case study templates for enterprise sales and client meetings.",
      "Develop short interface motion graphics, animated badges, and GIFs to showcase product features.",
      "Maintain brand consistency across marketing collateral, internal documents, and digital properties.",
      "Collaborate with the marketing team to brainstorm visual concepts for product feature announcements and newsletters.",
    ],
    qualifications: [
      "1–3 years of visual design, brand design, or graphic design experience in a digital agency or tech startup.",
      "Proficiency in Figma and Adobe Creative Suite (Illustrator, Photoshop, After Effects).",
      "Sharp aesthetic eye for Swiss typography, grid alignment, minimalism, and digital layout compositions.",
      "Ability to translate abstract technical topics into clean, engaging visual metaphors.",
      "A strong visual portfolio showcasing branding, editorial layout, and digital design work.",
    ],
    preferred: [
      "Experience creating short video animations or motion graphics for web products.",
      "Familiarity with 3D modeling tools (Blender or Spline) for simple web illustrations.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Audit existing brand assets, organize a centralized graphic repository, and design a refreshed presentation deck template.",
      },
      {
        month: "Month 02",
        deliverable:
          "Create a series of custom editorial illustrations and social assets for our upcoming technical blog launch.",
      },
      {
        month: "Month 03",
        deliverable:
          "Design an interactive brand guidelines guide covering typography rules, color usage, icon sets, and asset export standards.",
      },
    ],
    tags: ["Brand Design", "Visual Identity", "Figma", "Illustrator", "Typography", "Motion"],
  },
  {
    id: "product-marketing-specialist",
    title: "Product Marketing Specialist",
    department: "Marketing",
    seniority: "Mid-Level (2–4 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Hybrid",
    clearance: "Standard Background Verification",
    summary:
      "Drive go-to-market strategies, product messaging, customer case studies, and feature launch campaigns for enterprise software solutions.",
    mandate:
      "You will connect our technical capabilities with client business needs. You will turn complex software engineering achievements into crisp positioning, sales collateral, and compelling customer narratives.",
    responsibilities: [
      "Develop core product messaging and positioning frameworks for Synapstream's software engineering services and products.",
      "Interview clients and engineering leads to author detailed customer success stories and technical case studies.",
      "Manage product launch plans across company blog channels, social media, email newsletters, and press outlets.",
      "Conduct competitor analysis and market research to identify product differentiation opportunities.",
      "Create sales enablement materials, including one-pagers, capability decks, and feature walkthroughs for enterprise prospects.",
    ],
    qualifications: [
      "2–4 years of product marketing, marketing communications, or content marketing experience in B2B tech or SaaS.",
      "Clear, concise copywriting and editing skills with a focus on value propositions rather than empty buzzwords.",
      "Ability to comprehend technical engineering concepts and translate them into benefits for business decision-makers.",
      "Experience managing cross-functional project timelines for campaigns and product feature announcements.",
      "Analytical mindset with comfort tracking campaign engagement, website traffic, and reader retention.",
    ],
    preferred: [
      "Prior experience in a software consultancy, B2B SaaS startup, or technical marketing agency.",
      "Familiarity with email marketing tools, CMS platforms, and basic analytics dashboards (Google Analytics, PostHog).",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Interview key engineering leads to understand our service offerings and audit all current marketing collateral.",
      },
      {
        month: "Month 02",
        deliverable:
          "Draft, design, and publish two comprehensive enterprise case studies highlighting client deliverables.",
      },
      {
        month: "Month 03",
        deliverable:
          "Launch a structured quarterly feature release campaign with coordinated blog announcements and sales one-pagers.",
      },
    ],
    tags: ["Product Marketing", "B2B SaaS", "Case Studies", "Content Strategy", "Go-To-Market"],
  },
  {
    id: "technical-content-writer",
    title: "Technical Content Writer",
    department: "Marketing",
    seniority: "Mid-Level (2–4 Years)",
    location: "Chittagong, Bangladesh / Hybrid / Remote",
    workMode: "Remote-First",
    clearance: "Standard Non-Disclosure Agreement",
    summary:
      "Write in-depth technical blog posts, architectural breakdowns, API documentation, and engineering guides for developers and technology leaders.",
    mandate:
      "Great engineering speaks for itself when clearly explained. You will interview engineers, read source code, and write technical articles that practitioners respect, learn from, and share across the developer community.",
    responsibilities: [
      "Write clear, engaging engineering blog posts, technical deep-dives, and architectural explainers.",
      "Author and maintain developer documentation, getting-started guides, and release notes for client deliverables.",
      "Partner with frontend and backend developers to extract interesting technical challenges and turn them into public case studies.",
      "Manage the company engineering blog editorial calendar and coordinate peer reviews with technical staff.",
      "Monitor industry trends in distributed systems, web performance, and developer tooling to propose timely article topics.",
    ],
    qualifications: [
      "2–4 years of experience writing technical content, developer documentation, or engineering blog articles.",
      "Ability to read and understand code (e.g., JavaScript/TypeScript, Python, or Go) to accurately describe technical implementations.",
      "Demonstrated portfolio of published articles, blog posts, or technical documentation.",
      "Meticulous attention to spelling, grammar, code formatting, and explanatory clarity.",
      "Curiosity about modern software architectures, databases, and frontend frameworks.",
    ],
    preferred: [
      "Background in computer science, software engineering, or technical journalism.",
      "Experience writing Markdown, MDX, and using static site generators.",
    ],
    milestones: [
      {
        month: "Month 01",
        deliverable:
          "Publish two technical blog articles exploring recent engineering challenges and establish a weekly editorial calendar.",
      },
      {
        month: "Month 02",
        deliverable:
          "Create a standardized documentation template for future engineering handoffs and client deliverable guides.",
      },
      {
        month: "Month 03",
        deliverable:
          "Collaborate with the frontend team to publish an interactive tutorial on modern responsive web design and performance.",
      },
    ],
    tags: ["Technical Writing", "Documentation", "Blogging", "Developer Guides", "Content Strategy"],
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
      "We treat software as long-lived civil infrastructure. Every line of code is reviewed for type safety, maintainability, algorithmic efficiency, and clear test coverage before merge.",
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
    title: "Dedicated R&D Time",
    tag: "Mastery",
    summary:
      "Modern hardware setups, cloud compute credits, continuous learning allowances, and dedicated research time so your technical skills and craft continuously evolve.",
  },
];

const SELECTION_STEPS = [
  {
    step: "01",
    name: "Portfolio & Systems Assessment",
    duration: "48-Hour Turnaround",
    description:
      "We review your real codebase repositories, design systems, or technical writing. No generic automated leetcode quizzes; we evaluate architectural taste and depth.",
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
    name: "Mutual Agreement & Offer",
    duration: "Final Sign-Off",
    description:
      "Transparent offer terms, intellectual property ownership agreements, clear career progression milestones, and hardware provisioning tailored to your workflow.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CAREERS COMPONENT                             */
/* -------------------------------------------------------------------------- */

export function Careers() {
  const [selectedDept, setSelectedDept] = useState<Department>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRole, setExpandedRole] = useState<string | null>("full-stack-engineer");
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
      {/* 1. OPEN POSITIONS SECTION                                            */}
      {/* -------------------------------------------------------------------- */}
      <section id="open-roles" className="pt-8 pb-16 md:pt-14 md:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h1" className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.02em]">
              Open Roles
            </Heading>
            <p className="mt-2.5 text-sm sm:text-base text-silver">
              Explore open positions across Engineering, Design, and Marketing.
            </p>

            {/* Department Filter Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {(["All", "Engineering", "Design", "Marketing"] as Department[]).map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`tile-xs px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    selectedDept === dept
                      ? "border-white bg-white text-black font-semibold shadow-[0_0_16px_rgba(255,255,255,0.2)]"
                      : "border-line bg-obsidian text-silver hover:border-white/40 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="mt-5 flex items-center gap-3 border border-line bg-obsidian/80 px-4 py-3 transition-colors focus-within:border-white/50">
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
                placeholder="Search by title, technology, or keyword..."
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
          </div>

          {/* Role Cards List */}
          <div className="mt-12 sm:mt-16 space-y-6">
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
                    className={`tile border transition-all duration-300 bg-white text-black ${
                      isExpanded
                        ? "border-neutral-300 shadow-[0_20px_50px_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.12)]"
                        : "border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-neutral-400 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
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
                            <span className="tile-xs border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-800 font-semibold">
                              {role.department}
                            </span>
                            <span className="font-mono text-xs text-neutral-500">
                              • {role.seniority}
                            </span>
                            <span className="font-mono text-xs text-neutral-500">
                              • {role.workMode}
                            </span>
                          </div>
                          <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-black">
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
                            className="tile-xs border border-black bg-black px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-neutral-800"
                          >
                            Apply Now
                          </button>
                          <span className="font-mono text-xs uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5 transition-colors">
                            {isExpanded ? "Hide Details" : "Full Specs"}
                            <svg
                              className={`size-3.5 text-neutral-600 transition-transform duration-300 ${
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

                      <p className="mt-4 text-[14.5px] leading-relaxed text-neutral-600">
                        {role.summary}
                      </p>

                      {/* Tag Strip */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tile-xs border border-neutral-200 bg-neutral-100/90 px-2 py-0.5 font-mono text-[10px] text-neutral-700"
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
                          className="overflow-hidden border-t border-neutral-200 bg-[#f9f9fa] text-black"
                        >
                          <div className="p-6 sm:p-10 space-y-8">
                            {/* Operational Mandate */}
                            <div>
                              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold">
                                The Operational Mandate
                              </span>
                              <p className="mt-2 text-[15px] leading-relaxed text-neutral-900">
                                {role.mandate}
                              </p>
                            </div>

                            {/* Two-Column Specs */}
                            <div className="grid gap-8 lg:grid-cols-2">
                              {/* Responsibilities */}
                              <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold">
                                  Core Responsibilities
                                </span>
                                <ul className="mt-3 space-y-2.5">
                                  {role.responsibilities.map((r, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-neutral-700"
                                    >
                                      <span className="font-mono text-xs text-black font-semibold shrink-0 mt-0.5">
                                        [0{i + 1}]
                                      </span>
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Technical Profile */}
                              <div className="space-y-3">
                                <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold">
                                  Required Qualifications
                                </span>
                                <ul className="mt-3 space-y-2.5">
                                  {role.qualifications.map((q, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-3 text-[13.5px] leading-relaxed text-neutral-700"
                                    >
                                      <span className="size-1.5 rounded-full bg-black shrink-0 mt-2" />
                                      <span>{q}</span>
                                    </li>
                                  ))}
                                </ul>

                                {role.preferred.length > 0 && (
                                  <div className="mt-6 pt-4 border-t border-neutral-200">
                                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                                      Differentiating Experience
                                    </span>
                                    <ul className="mt-2 space-y-1.5">
                                      {role.preferred.map((p, i) => (
                                        <li
                                          key={i}
                                          className="text-xs text-neutral-600 leading-relaxed"
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
                            <div className="border-t border-neutral-200 pt-6">
                              <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 font-semibold">
                                First 90 Days Architectural Milestones
                              </span>
                              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                {role.milestones.map((m) => (
                                  <div
                                    key={m.month}
                                    className="border border-neutral-200 bg-white p-4 shadow-sm"
                                  >
                                    <span className="font-mono text-xs font-semibold text-black">
                                      {m.month}
                                    </span>
                                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                                      {m.deliverable}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-6">
                              <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                                <span>Location: {role.location}</span>
                                <span>•</span>
                                <span>Clearance: {role.clearance}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setApplyingRole(role)}
                                className="w-full sm:w-auto tile-sm border border-black bg-black px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-neutral-800"
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
      {/* 3. THE SELECTION PROCESS                                             */}
      {/* -------------------------------------------------------------------- */}
      <Section id="process" className="border-t border-hairline">
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
                      placeholder="Share a brief overview of your background with web applications, distributed backends, UI/UX design, or technical marketing..."
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
