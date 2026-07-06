"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const experience = {
  company: "Neiman Marcus Group",
  role: "Software Engineer (Full Stack + Data)",
  period: "2023 — Present",
  summary:
    "I design and build large-scale, high-performance data and AI-adjacent systems supporting customer-facing analytics, operational intelligence, and internal decision-making platforms. My work sits at the intersection of distributed systems, data engineering, and applied ML.",
  metrics: [
    { value: "$1.5M+", label: "Shipping Savings", detail: "Real-time Kafka streaming pipelines optimizing carrier selection & route efficiency" },
    { value: "250%", label: "Efficiency Gain", detail: "Spark/Databricks automation replacing manual ETL with orchestrated data pipelines" },
    { value: "$5M+", label: "Annual Cost Savings", detail: "ML-powered fraud detection & predictive analytics reducing chargebacks & losses" },
  ],
  points: [
    "Design and build large-scale data and AI-adjacent systems supporting customer-facing analytics and operational intelligence",
    "Translate complex business requirements into reliable, production-grade solutions operating at enterprise scale",
    "Partner with stakeholders across business units to translate requirements into scalable, production-grade data products",
    "Power downstream analytics for fraud detection, demand forecasting, and inventory optimization using ML models",
  ],
  stack: ["Java", "Spring Boot", "Kafka", "React Native", "Kubernetes", "AWS", "Terraform", "Python", "TensorFlow", "SageMaker"],
};

const priorExperience = {
  company: "NNR Global Logistics",
  role: "Software / Data Engineering",
  summary:
    "Tackled large-scale data challenges and contributed to modernizing pipelines across critical logistics workflows — sharpening the fundamentals of building reliable, scalable systems.",
};

const education = {
  school: "University of Texas at Dallas",
  degree: "Master's in Software Engineering",
  logo: "/UT_Dallas_2_Color_Emblem_-_SVG_Brand_Identity_File.svg.png",
};

const projects = [
  {
    title: "Nava — High-Performance Dating Platform",
    subtitle: "Distributed systems architecture for real-time social connections at scale",
    points: [
      "Rust/Axum backend engineered for 10K+ concurrent connections per node using Tokio async runtime, stateless horizontal scaling with Redis shared state, and SQLx connection pooling with PgBouncer patterns.",
      "GraphQL API layer with async-graphql DataLoader (N+1 elimination), field-level auth, JSONB flexible schemas, composite indexes, and read replica routing for query optimization.",
      "Real-time messaging via WebSocket pub/sub with broadcast channels, typing indicators, and read receipts. WebRTC signaling server for video/voice with ICE candidate relay and session state management.",
      "ML pipeline using ONNX Runtime (tract) for face detection, liveness verification, and embedding extraction. Vector similarity search with cosine distance for fraud detection and duplicate account prevention.",
      "Intelligent matching engine with multi-dimensional compatibility scoring, geo-filtering, bloom filters for seen-user deduplication, and configurable ranking weights for AI-assisted discovery.",
      "Production infrastructure: Prometheus metrics (latency histograms, error budgets), distributed tracing with correlation IDs, Kubernetes on Docker multi-stage builds, and MCP server for analytics.",
    ],
    metrics: [
      { value: "10K+", label: "Concurrent Users" },
      { value: "<50ms", label: "P99 Latency" },
      { value: "99.9%", label: "Match Accuracy" },
    ],
    stack: ["Rust/Axum", "async-graphql", "WebSocket", "WebRTC", "ONNX Runtime", "Tokio", "SQLx/Postgres", "Redis", "Prometheus", "Docker", "Kubernetes", "React Native", "PyTorch", "OpenCV", "Vector DB", "MCP Server"],
    link: "https://github.com/rohitkarumanchi745/telugu-dating-backend-main",
    linkText: "Repository",
    featured: true,
    status: "In Progress — App Store Launch Pending",
  },
  {
    title: "Supply Chain & Inventory Analytics Platform",
    subtitle: "Event-driven inventory tracking with Kafka consumer groups, offset management, and predictive ML models",
    points: [
      "Kafka consumers with manual offset commits, partition rebalancing handlers, and dead letter queues across 50+ inventory event topics.",
      "Exactly-once semantics using Kafka transactions and idempotent producers for critical inventory adjustments across distribution centers.",
      "ARIMA and Prophet forecasting models for demand prediction, integrated with Airflow DAGs for daily retraining and feature store updates in Snowflake.",
      "dbt transformation layer with incremental models, SCD Type 2 snapshots, and data quality tests with Great Expectations.",
    ],
    metrics: [
      { value: "50+", label: "Event Topics" },
      { value: "99.99%", label: "Data Accuracy" },
      { value: "15%", label: "Stockout Reduction" },
    ],
    stack: ["Kafka", "Kafka Streams", "Spark", "Snowflake", "dbt", "Airflow", "ARIMA/Prophet", "Python", "SQL"],
    link: null,
    linkText: null,
  },
  {
    title: "AI-Powered Order Fulfillment Platform",
    subtitle: "Python microservices with FastAPI, LangGraph agents, and MCP Server for intelligent order orchestration",
    points: [
      "FastAPI microservices for order lifecycle management on DynamoDB, with GSI query patterns and Streams CDC to downstream analytics.",
      "LangGraph multi-agent workflows for intelligent order routing, exception handling, and customer communication with human-in-the-loop checkpoints.",
      "LangChain RAG pipelines with Pinecone vector stores for order history retrieval and context-aware support automation.",
      "MCP Server integration exposing inventory APIs, shipping calculators, and order status endpoints as callable tools for AI agents.",
    ],
    metrics: [
      { value: "40%", label: "Faster Routing" },
      { value: "85%", label: "Auto-Resolution" },
      { value: "<100ms", label: "API Latency" },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "LangChain", "MCP Server", "DynamoDB", "Pinecone", "LangSmith", "Prometheus", "Kubernetes"],
    link: null,
    linkText: null,
  },
  {
    title: "Interactive 3D Portfolio with AI Chatbot",
    subtitle: "This site — Next.js, Three.js, and an OpenAI-powered assistant on AWS",
    points: [
      "Next.js 16 with React Three Fiber 3D graphics, mobile-first responsive design, and load times under 3 seconds.",
      "OpenAI-powered chatbot (Spuff) with streaming responses, plus a validated contact pipeline via Resend.",
      "AWS deployment with CloudFront CDN, Route 53, SSL, and CI/CD via GitHub Actions — hybrid SSR/CSR rendering for SEO.",
    ],
    metrics: [
      { value: "<3s", label: "Load Time" },
      { value: "100", label: "Lighthouse" },
      { value: "24/7", label: "Uptime" },
    ],
    stack: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "OpenAI API", "Tailwind CSS", "AWS", "CloudFront", "GitHub Actions"],
    link: "https://github.com/rohitkarumanchi745/rohit-portfolio",
    linkText: "Source",
  },
];

const skills = [
  { group: "Data Engineering", items: ["Kafka", "Spark", "PySpark", "Databricks", "Airflow", "Snowflake", "dbt", "DataFusion", "Ray/Anyscale", "Kinesis", "PostgreSQL", "MongoDB", "Redis", "Cassandra", "DynamoDB", "Stream Processing", "Data Warehousing", "Schema Design", "Query Optimization"] },
  { group: "Full Stack", items: ["Python", "Java", "Rust", "C#", "React", "TypeScript", "Next.js", "FastAPI", "GraphQL", "React Native/Expo", "gRPC", "REST", "ASP.NET Core", "Azure Functions"] },
  { group: "AI/ML & Agents", items: ["PyTorch", "TensorFlow", "LangChain", "LangGraph", "MCP Servers", "FAISS", "Vector DBs", "RAG", "Federated Learning", "RL", "On-Device ML", "AWS Bedrock", "SageMaker", "OpenCV", "RecSys"] },
  { group: "Cloud & Infrastructure", items: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform", "Nginx", "CloudFront", "Route 53", "GitHub Actions", "CI/CD", "Prometheus/Grafana", "Microservices"] },
  { group: "3D & Frontend Craft", items: ["Three.js", "React Three Fiber", "WebGL", "Tailwind CSS", "Responsive Design", "Animations"] },
  { group: "Analytics & Collaboration", items: ["Power BI", "Tableau", "Streamlit", "Jira", "Agile/Scrum", "Confluence"] },
];

const socials = {
  github: "https://github.com/rohitkarumanchi745",
  linkedin: "https://www.linkedin.com/in/rohit-karumanchi/",
  email: "mailto:rkkarumanchi98@gmail.com",
};

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Interaction primitives                                              */
/* ------------------------------------------------------------------ */

function Spotlight() {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background: `radial-gradient(620px at ${pos.x}px ${pos.y}px, rgba(139, 92, 246, 0.075), transparent 80%)`,
      }}
    />
  );
}

function CircuitBackdrop() {
  // vertical "data packets" travel down grid traces (grid = 72px cells)
  const vBeams = [
    { left: "calc(72px * 2)", dur: "13s", delay: "0s", cyan: false },
    { left: "calc(72px * 5)", dur: "17s", delay: "-6s", cyan: true },
    { left: "calc(72px * 9)", dur: "11s", delay: "-3s", cyan: false },
    { left: "calc(100vw - 72px * 3)", dur: "15s", delay: "-9s", cyan: false },
    { left: "calc(100vw - 72px * 6)", dur: "19s", delay: "-1s", cyan: true },
    { left: "calc(100vw - 72px * 1)", dur: "12s", delay: "-7s", cyan: false },
  ];
  // horizontal packets ride the cross-traces
  const hBeams = [
    { top: "calc(72px * 3)", dur: "21s", delay: "-4s", cyan: false },
    { top: "calc(72px * 7)", dur: "16s", delay: "-11s", cyan: true },
    { top: "calc(72px * 11)", dur: "24s", delay: "-2s", cyan: false },
  ];
  // glowing solder points on intersections
  const nodes = [
    { left: "calc(72px * 2 - 1px)", top: "calc(72px * 3 - 1px)", dur: "3.2s", delay: "0s" },
    { left: "calc(72px * 5 - 1px)", top: "calc(72px * 7 - 1px)", dur: "4.1s", delay: "-1s" },
    { left: "calc(72px * 9 - 1px)", top: "calc(72px * 3 - 1px)", dur: "3.7s", delay: "-2s" },
    { left: "calc(100vw - 72px * 3 - 1px)", top: "calc(72px * 7 - 1px)", dur: "4.5s", delay: "-0.5s" },
    { left: "calc(100vw - 72px * 6 - 1px)", top: "calc(72px * 11 - 1px)", dur: "3.4s", delay: "-1.6s" },
    { left: "calc(100vw - 72px * 1 - 1px)", top: "calc(72px * 5 - 1px)", dur: "4.8s", delay: "-2.4s" },
  ];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora" style={{ left: "-12vw", top: "-18vw", background: "radial-gradient(circle, #8b5cf6, transparent 65%)" }} />
      <div className="aurora" style={{ right: "-15vw", bottom: "-20vw", background: "radial-gradient(circle, #22d3ee, transparent 65%)", animationDelay: "-20s" }} />
      {vBeams.map((b, i) => (
        <span key={`v${i}`} className={`beam-v ${b.cyan ? "beam-cyan" : ""}`} style={{ left: b.left, animationDuration: b.dur, animationDelay: b.delay }} />
      ))}
      {hBeams.map((b, i) => (
        <span key={`h${i}`} className={`beam-h ${b.cyan ? "beam-cyan" : ""} hidden md:block`} style={{ top: b.top, animationDuration: b.dur, animationDelay: b.delay }} />
      ))}
      {nodes.map((n, i) => (
        <span key={`n${i}`} className="node-dot hidden md:block" style={{ left: n.left, top: n.top, animationDuration: n.dur, animationDelay: n.delay }} />
      ))}
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ */
/*  Chatbot                                                             */
/* ------------------------------------------------------------------ */

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isOpen && !isInitialized) {
      setMessages([{ role: "assistant", content: "Hi! I'm Spuff, Rohit's AI assistant. Ask me anything about his experience, projects, or skills!" }]);
      setIsInitialized(true);
    }
  }, [isOpen, isInitialized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now. Please try asking again or email Rohit directly at rkkarumanchi98@gmail.com!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Spuff"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-violet-400/30 bg-[#12101d]/90 text-violet-300 shadow-[0_0_30px_-6px_rgba(139,92,246,0.55)] backdrop-blur transition-all hover:scale-105 hover:border-violet-400/60 hover:text-violet-200 active:scale-95"
      >
        {isOpen ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-4 right-4 z-50 flex h-[460px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e17]/95 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-6 sm:w-[380px]">
          <div className="flex items-center gap-3 border-b border-white/10 bg-violet-500/10 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 font-mono text-sm font-bold text-violet-300">S</div>
            <div>
              <h3 className="text-sm font-semibold text-white">Spuff</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">AI Assistant</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-violet-600/80 text-white"
                      : "border border-white/10 bg-white/5 text-slate-300"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder={isLoading ? "Thinking..." : "Ask about Rohit..."}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                aria-label="Send"
                className="rounded-xl border border-violet-400/40 bg-violet-500/20 px-4 py-2 text-violet-200 transition-all hover:bg-violet-500/30 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Section header                                                      */
/* ------------------------------------------------------------------ */

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="section-label">
        <span className="text-slate-600">{index} /</span> {title}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-700/60 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const activeSection = useScrollSpy(navItems.map((n) => n.id));
  useReveal();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleContactSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitMessage("");

      const emailLower = contactForm.email.toLowerCase();
      const allowedDomains = ["@gmail.com", "@outlook.com", "@hotmail.com", "@live.com"];
      const isValidDomain = allowedDomains.some((domain) => emailLower.endsWith(domain));

      if (!isValidDomain) {
        setSubmitMessage("Please use a Gmail or Outlook email address (e.g., yourname@gmail.com)");
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactForm),
        });
        const data = await response.json();
        if (response.ok) {
          setSubmitMessage("Thank you! Your message has been sent. Rohit will get back to you soon.");
          setContactForm({ name: "", email: "", phone: "", message: "" });
        } else {
          setSubmitMessage(data.error || "Failed to send message. Please email directly at rkkarumanchi98@gmail.com");
        }
      } catch {
        setSubmitMessage("Failed to send message. Please email directly at rkkarumanchi98@gmail.com");
      } finally {
        setIsSubmitting(false);
      }
    },
    [contactForm]
  );

  return (
    <main className="relative z-10 min-h-screen">
      <CircuitBackdrop />
      <Spotlight />

      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-8 lg:px-16">
        {/* ------------------------------------------------ left rail */}
        <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3.5 py-1.5">
              <span className="status-dot h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] tracking-wider text-emerald-300/90">
                Open to Data / Backend / ML Platform roles
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Rohit
              <br />
              Karumanchi
              <span className="text-violet-400">.</span>
            </h1>

            <h2 className="mt-4 font-mono text-sm tracking-wide text-violet-300/90">
              <span className="text-slate-600">$</span> software engineer — data · backend · AI
              <span className="cursor-blink text-violet-400">▍</span>
            </h2>

            <p className="mt-6 max-w-sm leading-relaxed text-slate-400">
              I build <span className="text-slate-200">large-scale data platforms</span> and{" "}
              <span className="text-slate-200">AI systems</span> that ship — from Kafka pipelines
              moving millions of events to agents that reason over them.
            </p>

            <nav className="mt-14 hidden lg:block" aria-label="Section navigation">
              <ul className="space-y-4">
                {navItems.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="group flex items-center gap-4">
                      <span
                        className={`h-px transition-all duration-300 ${
                          activeSection === item.id
                            ? "w-16 bg-violet-400"
                            : "w-8 bg-slate-700 group-hover:w-12 group-hover:bg-slate-400"
                        }`}
                      />
                      <span
                        className={`font-mono text-xs tracking-[0.25em] uppercase transition-colors ${
                          activeSection === item.id ? "text-white" : "text-slate-600 group-hover:text-slate-300"
                        }`}
                      >
                        <span className="mr-1 text-slate-700">0{i + 1}</span>
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-12 flex items-center gap-5 pb-10 lg:mt-0 lg:pb-0">
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-500 transition-all hover:-translate-y-0.5 hover:text-white">
              <GitHubIcon className="h-6 w-6" />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-500 transition-all hover:-translate-y-0.5 hover:text-white">
              <LinkedInIcon className="h-6 w-6" />
            </a>
            <a href={socials.email} aria-label="Email" className="text-slate-500 transition-all hover:-translate-y-0.5 hover:text-white">
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </header>

        {/* ------------------------------------------------ right column */}
        <div className="lg:w-[54%] lg:py-20">
          {/* about */}
          <section id="about" className="reveal scroll-mt-24 pt-16 lg:pt-0">
            <SectionHeader index="01" title="About" />

            <div className="glass mb-8 overflow-hidden !rounded-2xl">
              {/* terminal chrome */}
              <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 font-mono text-[11px] tracking-wider text-slate-500">rohit@dev — zsh</span>
              </div>
              {/* terminal body */}
              <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
                <div>
                  <span className="text-emerald-400">➜</span> <span className="text-slate-500">~</span>{" "}
                  <span className="text-slate-300">whoami</span>
                  <p className="mt-1 text-slate-400">
                    rohit — software engineer <span className="text-slate-600">(data · backend · AI)</span>
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400">➜</span> <span className="text-slate-500">~</span>{" "}
                  <span className="text-slate-300">current --focus</span>
                  <p className="mt-1 text-violet-300">
                    [ <span className="text-slate-400">kafka-pipelines</span>,{" "}
                    <span className="text-slate-400">langgraph-agents</span>,{" "}
                    <span className="text-slate-400">low-bit-llms</span> ]
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400">➜</span> <span className="text-slate-500">~</span>{" "}
                  <span className="text-slate-300">uptime --career</span>
                  <p className="mt-1 text-slate-400">
                    shipping @ <span className="text-cyan-300">neiman-marcus-group</span> since 2023 · load avg:{" "}
                    <span className="text-emerald-400">healthy</span>
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400">➜</span> <span className="text-slate-500">~</span>{" "}
                  <span className="cursor-blink text-violet-400">▍</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 leading-relaxed text-slate-400">
              <p>
                I&apos;m an <span className="text-slate-200">AI-focused software engineer</span> who
                enjoys the deep end: distributed systems, data engineering, and applied ML. Right now
                I design and deploy large-scale, high-performance data and AI systems at{" "}
                <span className="text-violet-300">Neiman Marcus Group</span>, supporting both
                customer-facing analytics and internal decision-making platforms.
              </p>
              <p>
                Before that, I worked at <span className="text-slate-200">NNR Global Logistics</span>,
                tackling large-scale data challenges and modernizing pipelines across critical
                workflows — where I learned that reliability is a feature users feel.
              </p>
              <p>
                I hold a Master&apos;s in Software Engineering from the{" "}
                <span className="text-slate-200">University of Texas at Dallas</span>, and I&apos;m
                driven to explore what&apos;s next in data engineering and AI — whether building with
                founders, collaborating with domain experts, or shipping products that scale.{" "}
                <span className="text-violet-300">Let&apos;s build something that matters.</span>
              </p>
            </div>
          </section>

          {/* experience */}
          <section id="experience" className="reveal scroll-mt-24 pt-24">
            <SectionHeader index="02" title="Experience" />

            <div className="glass p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-white">{experience.company}</h3>
                  <p className="mt-1 font-mono text-sm text-violet-300/90">{experience.role}</p>
                </div>
                <span className="font-mono text-xs tracking-wider text-slate-500">{experience.period}</span>
              </div>

              <p className="mt-4 border-l-2 border-violet-500/40 pl-4 text-sm italic leading-relaxed text-slate-400">
                {experience.summary}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {experience.metrics.map((m) => (
                  <div key={m.label} className="group rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-violet-400/40">
                    <div className="font-mono text-2xl font-bold text-violet-300">{m.value}</div>
                    <div className="mt-1 text-xs font-medium text-slate-300">{m.label}</div>
                    <div className="mt-2 text-[11px] leading-snug text-slate-500">{m.detail}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-2.5">
                {experience.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="mt-1 text-violet-400">▹</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {experience.stack.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="glass p-6">
                <h3 className="text-base font-semibold text-white">{priorExperience.company}</h3>
                <p className="mt-1 font-mono text-xs text-slate-500">{priorExperience.role} · prior</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{priorExperience.summary}</p>
              </div>

              <div className="glass flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/90 p-1.5">
                  <Image src={education.logo} alt="UT Dallas" width={48} height={48} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{education.school}</h3>
                  <p className="mt-1 text-sm leading-snug text-slate-400">{education.degree}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-amber-400/80">Graduate Degree</p>
                </div>
              </div>
            </div>
          </section>

          {/* projects */}
          <section id="projects" className="reveal scroll-mt-24 pt-24">
            <SectionHeader index="03" title="Projects" />

            <div className="space-y-5">
              {projects.map((project) => (
                <div key={project.title} className={`glass p-6 sm:p-8 ${project.featured ? "border-violet-400/25" : ""}`}>
                  {project.featured && (
                    <span className="mb-3 inline-block rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-violet-300">
                      Featured Build
                    </span>
                  )}

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
                      {project.status && (
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-amber-400/80">{project.status}</p>
                      )}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline inline-flex items-center gap-1 font-mono text-xs text-violet-300 transition-colors hover:text-violet-200"
                      >
                        {project.linkText} <ArrowIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {project.metrics.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-6">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-xl font-bold text-violet-300">{m.value}</div>
                          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-500">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.points.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {(project.featured ? project.points : project.points.slice(0, 4)).map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                          <span className="mt-1 text-violet-400">▹</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.stack.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="chip">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* coming soon */}
              <div className="glass flex items-center justify-between border-dashed p-6 opacity-80">
                <div>
                  <h3 className="text-base font-semibold text-slate-300">Amaravati — Smart City Mobility Platform</h3>
                  <p className="mt-1 font-mono text-xs text-slate-500">Amaravati, Andhra Pradesh</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Coming Soon
                </span>
              </div>
            </div>
          </section>

          {/* stack */}
          <section id="stack" className="reveal scroll-mt-24 pt-24">
            <SectionHeader index="04" title="Stack" />
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((group) => (
                <div key={group.group} className="glass p-5">
                  <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-violet-300/80">
                    {group.group}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="chip !text-[0.65rem]">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* contact */}
          <section id="contact" className="reveal scroll-mt-24 pt-24 pb-20">
            <SectionHeader index="05" title="Contact" />

            <div className="glass p-6 sm:p-10">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  that matters.
                </span>
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                I&apos;m eager to make meaningful impact across healthcare, fintech, social good — or
                the next big thing. My inbox is always open.
              </p>

              <form onSubmit={handleContactSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/50"
                />
                <input
                  type="email"
                  required
                  placeholder="Email (Gmail / Outlook)"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/50"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/50 sm:col-span-2"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="What are we building?"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/50 sm:col-span-2"
                />
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl border border-violet-400/50 bg-violet-500/15 px-6 py-3 font-mono text-sm text-violet-200 shadow-[0_0_24px_-8px_rgba(139,92,246,0.6)] transition-all hover:bg-violet-500/25 hover:shadow-[0_0_32px_-6px_rgba(139,92,246,0.7)] active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending…" : "Send message →"}
                  </button>
                  <a href={socials.email} className="link-underline font-mono text-xs text-slate-400 hover:text-slate-200">
                    or email directly
                  </a>
                </div>
                {submitMessage && (
                  <p className="text-sm text-violet-300 sm:col-span-2">{submitMessage}</p>
                )}
              </form>
            </div>

            <footer className="mt-14 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-wider text-slate-600">
                Designed &amp; built by Rohit Karumanchi
              </p>
              <p className="font-mono text-[11px] tracking-wider text-slate-700">
                Next.js × Three.js × Tailwind — grown slowly · shipped ripe
              </p>
            </footer>
          </section>
        </div>
      </div>

      <Chatbot />
    </main>
  );
}
