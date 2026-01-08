"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamically import 3D scene - only loads when scrolled into view
const Scene3D = dynamic(() => import('./components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 rounded-3xl">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Loading 3D scene...</p>
      </div>
    </div>
  )
});

const projects = [
  {
    title: "Amaravati - Smart City Mobility Platform",
    subtitle: "",
    points: [],
    stack: [],
    link: "#",
    linkText: "Coming Soon",
    comingSoon: true,
    location: "Amaravati, Andhra Pradesh",
    cycleImage: true,
  },
  {
    title: "Nava - High-Performance Dating Platform",
    subtitle: "Distributed systems architecture for real-time social connections at scale",
    points: [
      "Architected a multi-layer backend in Rust using Axum, designed for horizontal scaling with stateless API servers and shared state via Redis. Implemented connection pooling (SQLx + PgBouncer patterns) and async I/O throughout using Tokio runtime to handle 10K+ concurrent connections per node.",
      "Built a GraphQL API with async-graphql featuring DataLoader for batched database queries (solving N+1), field-level authorization, and automatic schema introspection. Designed efficient data models with JSONB for flexible attributes, composite indexes for query optimization, and read replicas awareness.",
      "Designed a WebSocket pub/sub system with in-memory broadcast channels per chat room, supporting typing indicators, read receipts, and message fanout. Extended to WebRTC signaling for video/voice calls, managing session state, offer/answer exchange, ICE candidate relay, and graceful disconnection handling.",
      "Integrated ONNX Runtime (tract) for low-latency inference: face detection, liveness verification, and embedding extraction. Built a similarity search layer using cosine distance on face embeddings to detect duplicate/fraudulent accounts. Designed for CPU-bound workloads with async offloading to prevent blocking.",
      "Implemented a preference-based matching algorithm with compatibility scoring across multiple dimensions (interests, location, preferences). Added geo-filtering with distance calculations, bloom filters for seen-user deduplication, and configurable ranking weights for AI-assisted discovery.",
      "Designed tiered subscription system with feature gating via JWT claims, including premium unlocks (unlimited swipes, read receipts, advanced filters). Implemented student verification flow with discount tiers and expiration handling. Role-based access control at resolver level.",
      "Added Prometheus metrics for request latency histograms, active connections, cache hit rates, and error budgets. Implemented structured tracing with correlation IDs across services. Health endpoints with deep dependency checks (DB, Redis, ML models) for orchestrator probes.",
      "React Native/Expo mobile app with real-time sync. Kubernetes deployment with Docker multi-stage builds, CI/CD pipelines, and MCP server integration for customer service analytics.",
    ],
    stack: ["Rust/Axum", "async-graphql", "WebSocket", "WebRTC", "ONNX Runtime", "Tokio", "SQLx/Postgres", "Redis", "Prometheus", "Docker", "Kubernetes", "React Native", "PyTorch", "OpenCV", "Vector DB", "MCP Server"],
    link: "https://github.com/rohitkarumanchi745/telugu-dating-backend-main",
    linkText: "Repo",
    featured: true,
  },
  {
    title: "Real-time Retail Data Platform (Full Stack)",
    subtitle: "End-to-end data platform: Kafka → Spark/Databricks → Snowflake + React Dashboard with SLAs + Observability",
    points: [
      "Built full-stack retail analytics platform: Streaming/batch pipelines (Kafka, Spark, Snowflake) + React/TypeScript dashboard for real-time order/shipment/fraud monitoring.",
      "Developed REST APIs with FastAPI and GraphQL for data access, serving analytics to multiple frontend applications and downstream systems.",
      "Implemented SLA monitoring dashboards with Prometheus/Grafana, automated alerting with PagerDuty, and self-healing backfill strategies for pipeline reliability.",
      "Created real-time analytics UI with React, TypeScript, and Recharts for business stakeholders to track KPIs, order fulfillment rates, and fraud detection metrics.",
      "Built microservices architecture with Docker/Kubernetes for scalable deployment across Azure/AWS, with CI/CD pipelines using GitHub Actions.",
      "Partnered cross-functionally with product, analytics, and engineering teams to turn ambiguous business needs into production-grade data products.",
      "System Design: Lambda architecture for streaming/batch processing, multi-tier data storage (hot/warm/cold paths), API gateway pattern with FastAPI/GraphQL, SLA-driven reliability with self-healing backfills, Kubernetes service mesh with auto-scaling, and hybrid cloud deployment strategy.",
    ],
    stack: ["Kafka", "Spark/Databricks", "Snowflake", "Airflow", "FastAPI", "GraphQL", "React", "TypeScript", "Recharts", "Prometheus/Grafana", "Docker", "Kubernetes", "Azure/AWS", "CI/CD"],
    link: "#",
    linkText: "Architecture",
  },
  {
    title: "Supply Chain & Inventory Analytics Platform",
    subtitle: "Real-time shipping, inventory optimization, and SLA monitoring at scale",
    points: [
      "Built real-time supply chain analytics pipelines tracking shipments, inventory levels, and warehouse operations across multiple distribution centers.",
      "Implemented SLA monitoring dashboards with automated alerting for delivery delays, stock-outs, and fulfillment bottlenecks.",
      "Developed inventory optimization models to predict demand, reduce carrying costs, and improve order fulfillment rates.",
      "Created end-to-end visibility for shipping status, route optimization, and delivery time predictions using historical data and ML.",
      "System Design: Event sourcing pattern for inventory state changes, multi-region active-active replication with eventual consistency, predictive analytics pipeline with ARIMA/Prophet models, circuit breaker pattern for 3PL integrations, data mesh approach for domain products, and real-time SLA alerting with tiered escalation.",
    ],
    stack: ["Kafka", "Spark", "Snowflake", "dbt", "Airflow", "Power BI", "Python", "SQL", "Predictive Analytics"],
    link: "#",
    linkText: "Details",
  },
  {
    title: "Interactive 3D Portfolio with AI Chatbot (This Site!)",
    subtitle: "Next.js + Three.js + OpenAI + AWS EC2 - Mobile-first responsive portfolio",
    points: [
      "Built full-stack interactive portfolio with Next.js 16, Three.js/React Three Fiber for 3D graphics, featuring custom building model with dynamic lighting, floating tech icons, and dark/light mode adaptation.",
      "Implemented mobile-first responsive design optimized for iOS, Android, and iPad with hamburger navigation, touch controls, performance optimizations (lazy loading, hardware-accelerated animations, reduced particle counts on mobile), and fast load times under 3s.",
      "Integrated OpenAI-powered AI chatbot (Spuff) using GPT API for real-time Q&A with streaming responses, and contact form with email validation via Resend API.",
      "Deployed on AWS EC2 with Nginx reverse proxy, SSL/TLS (Let's Encrypt), CloudFront CDN, Route 53 DNS, CI/CD via GitHub Actions, and PM2 process management.",
      "System Design: Hybrid SSR/CSR rendering for SEO, BFF pattern with Next.js API routes, lazy-loaded 3D scene with Suspense, hardware-accelerated CSS transforms, CDN edge caching, and zero-downtime deployments.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Three.js", "React Three Fiber", "OpenAI API", "Resend", "Tailwind CSS", "AWS EC2", "Nginx", "CloudFront", "Route 53", "Let's Encrypt", "PM2", "GitHub Actions"],
    link: "https://rohitkarumanchi.com",
    linkText: "Live Site",
  },
];

const skills = [
  { group: "Data Engineering", items: ["Kafka", "Spark", "PySpark", "Scala", "Databricks", "Airflow", "Snowflake", "dbt", "Data Fusion", "Ray/Anyscale", "SQS", "Kinesis", "Big Data", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra", "DynamoDB", "SQL", "NoSQL", "Data Modeling", "ETL/ELT", "Data Pipelines", "Stream Processing", "Batch Processing", "Data Warehousing", "Data Lakes", "Schema Design", "Query Optimization"] },
  { group: "Full Stack", items: ["Python", "Java", "Rust", "C#", "React", "TypeScript", "FastAPI", "GraphQL", "React Native/Expo", "REST", "JWT/Auth", "gRPC", "Next.js", "Microfrontend Architecture", "ASP.NET Core", "Entity Framework", "Azure Functions", "SignalR"] },
  { group: "Systems & Infrastructure", items: ["MCP Server", "Postgres", "Redis", "Docker", "Kubernetes", "Microservices"] },
  { group: "Cloud/DevOps", items: ["AWS EC2", "AWS Amplify", "CloudFront", "Route 53", "Azure", "Nginx", "Let's Encrypt", "PM2", "Git", "GitHub", "GitHub Actions", "CI/CD", "Prometheus/Grafana", "Resend"] },
  { group: "AI/ML & Computer Vision", items: ["PyTorch", "CNN", "OpenCV", "Federated Learning", "RL", "LangChain", "LangGraph", "FAISS", "LLaMA", "AWS Bedrock", "AWS SageMaker", "Cortex Analyst", "Cortex LLM", "Agentic AI", "Vector DBs", "RecSys", "On-Device ML", "Model Deployment"] },
  { group: "IDEs & AI Coding Tools", items: ["Cursor", "VS Code", "PyCharm", "Xcode", "Vibe Coder", "Claude Code", "GitHub Copilot", "OpenAI", "Claude", "Gemini", "Kimi AI", "Amazon Q", "Prompt Engineering"] },
  { group: "3D Graphics & UI", items: ["Three.js", "React Three Fiber", "WebGL", "Tailwind CSS", "Responsive Design", "Glass-morphism", "Animations"] },
  { group: "Analytics & BI", items: ["Power BI", "Tableau", "Streamlit", "Data Visualization"] },
  { group: "Agile & Project Management", items: ["Jira", "Agile/Scrum", "Sprint Planning", "Kanban", "Confluence", "Story Estimation", "Retrospectives"] },
];

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-white/10">
          <div className="flex flex-col gap-4 p-6">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-base text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About Me
            </a>
            <a
              href="#experience"
              onClick={() => setIsOpen(false)}
              className="text-base text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="text-base text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-base text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Only initialize messages when chat is first opened
  useEffect(() => {
    if (isOpen && !isInitialized) {
      setMessages([{ role: "assistant", content: "Hi! I'm Spuff, Rohit's AI assistant. Ask me anything about his experience, projects, or skills!" }]);
      setIsInitialized(true);
    }
  }, [isOpen, isInitialized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to basic response if API fails
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try asking again or email Rohit directly at rkkarumanchi98@gmail.com!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-purple-500/70 active:scale-95"
      >
        {isOpen ? (
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto z-50 flex h-[450px] sm:h-[500px] w-auto sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-300 dark:border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 sm:p-4">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-base sm:text-lg font-bold text-white">S</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">Spuff</h3>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">AI Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto p-3 sm:p-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 ${msg.role === "user" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"}`}>
                  <p className="text-xs sm:text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-slate-300 dark:border-white/10 p-3 sm:p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder={isLoading ? "Thinking..." : "Ask about Rohit..."}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-purple-500/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 sm:px-4 py-2 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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

export default function Home() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Scroll to top on page load - with delay for mobile
  useEffect(() => {
    // Clear any hash from URL that might cause scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Additional scroll after delays to ensure mobile layout is ready
    const timer1 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    const timer2 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Client-side email validation
    const emailLower = contactForm.email.toLowerCase();
    const allowedDomains = ['@gmail.com', '@outlook.com', '@hotmail.com', '@live.com'];
    const isValidDomain = allowedDomains.some(domain => emailLower.endsWith(domain));

    if (!isValidDomain) {
      setSubmitMessage('Please use a Gmail or Outlook email address (e.g., yourname@gmail.com or yourname@outlook.com)');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send email via API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent to Rohit. He will get back to you soon!');
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitMessage(data.error || 'Failed to send message. Please email directly at rkkarumanchi98@gmail.com');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Failed to send message. Please email directly at rkkarumanchi98@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/10 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Rohit Karumanchi
            </h2>
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <a href="#about" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                About Me
              </a>
              <a href="#experience" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Get in Touch
              </a>
            </div>
            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* Animated grid background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Grid lines - adapts to theme */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.12)_2px,transparent_2px),linear-gradient(90deg,rgba(139,92,246,0.12)_2px,transparent_2px)] dark:bg-[linear-gradient(rgba(139,92,246,0.15)_2px,transparent_2px),linear-gradient(90deg,rgba(139,92,246,0.15)_2px,transparent_2px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]"
             style={{ animation: 'gridMove 25s linear infinite' }} />

        {/* Floating particles - optimized for performance */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const size = 2 + (i % 4);
            const left = (i * 13.7) % 100;
            const top = (i * 17.3) % 100;
            const duration = 15 + (i % 10);
            const delay = (i % 5);
            return (
              <div
                key={i}
                className="absolute rounded-full bg-purple-400/50 dark:bg-purple-400/60 shadow-lg shadow-purple-400/40 dark:shadow-purple-400/50"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `float ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Light rays - optimized for performance */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => {
            const width = 150 + (i * 12.5);
            const left = (i * 12.5) % 100;
            const top = (i * 11.7) % 100;
            const rotation = (i * 45) % 360;
            const duration = 3 + (i % 2);
            const delay = (i % 3);
            return (
              <div
                key={i}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-purple-400/35 dark:via-purple-400/40 to-transparent shadow-lg shadow-purple-400/25 dark:shadow-purple-400/30"
                style={{
                  width: `${width}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: `rotate(${rotation}deg)`,
                  animation: `shimmer ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Floating Tech Icons - Removed for cleaner look */}

        {/* Additional glow spots - Reduced for better performance */}
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          {[...Array(3)].map((_, i) => {
            const size = 240 + (i * 50);
            const left = (i * 35) % 100;
            const top = (i * 30) % 100;
            const duration = 6 + (i * 2);
            const delay = i;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-purple-400/10 dark:bg-purple-500/8 blur-3xl will-change-transform"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `pulse ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Add animations to global styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(80px, 80px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(20px, 20px) scale(1.8);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0;
            transform: translateX(-200%) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateX(200%) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
          }
        }
      `}} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-20">
        {/* HERO */}
        <section id="about" className="relative">
          {/* Background gradient blur effects - purple/blue like Wope */}
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
          <div className="absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-blue-600 opacity-20 blur-3xl" />
          <div className="absolute top-40 left-1/2 h-80 w-80 rounded-full bg-violet-600 opacity-15 blur-3xl" />

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Right: 3D Scene */}
            <div className="relative h-[280px] sm:h-[350px] lg:h-[600px] order-first lg:order-last">
              <Scene3D />
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-center z-10">
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-300/50 dark:border-white/5">
                  <span className="hidden sm:inline">🖱️ Drag to explore • Auto-rotating</span>
                  <span className="sm:hidden">👆 Touch to explore</span>
                </p>
              </div>
            </div>

            {/* Left: Text content */}
            <div className="relative space-y-5 sm:space-y-8 z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-emerald-400 shadow-lg backdrop-blur-sm mx-auto lg:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open to Data / Backend / ML Platform roles</span>
              </div>

              <h1 className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent">
                Rohit Karumanchi
              </h1>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
                Empowering innovation through scalable data platforms, intelligent systems, and next-generation ML solutions that drive real-world impact.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <a className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95" href="#contact">
                  <span className="relative z-10 font-semibold">Contact Me</span>
                </a>
                <a className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95" href="/resume.pdf" target="_blank" rel="noreferrer">
                  <span className="relative z-10 font-semibold hidden sm:inline">Resume (PDF)</span>
                  <span className="relative z-10 font-semibold sm:hidden">Resume</span>
                </a>
                <a className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95" href="https://www.linkedin.com/in/rohit-karumanchi/" target="_blank" rel="noreferrer">
                  <span className="relative z-10 font-semibold">LinkedIn</span>
                </a>
                <a className="rounded-xl border-2 border-slate-300 dark:border-white/10 bg-slate-200/50 dark:bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-slate-400 dark:hover:border-white/20 hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95" href="https://github.com/rohitkarumanchi745" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mt-12 sm:mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 sm:p-8 lg:p-10 md:backdrop-blur-sm">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-600 opacity-20 blur-3xl hidden md:block" />

            <div className="relative">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Neiman Marcus Group</h3>
                  <div className="mt-2 text-base sm:text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Software Engineer (Full Stack + Data)</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-300 w-fit">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  2023–Present
                </div>
              </div>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-200 border-l-4 border-purple-500 pl-3 sm:pl-4 italic">
                I build scalable data platforms and production-grade backend systems—streaming pipelines, reliability engineering, and ML-enabled products that power real-world business impact.
              </p>

              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {[
                  "Built real-time data platform using Kafka, Spark, and Snowflake for retail analytics serving over 100 users across the organization.",
                  "Designed AI Merchandising Copilot with FastAPI and LangGraph, cutting item setup time by 65% and reducing errors from 14% to 3%.",
                  "Delivered $1.5M in shipping operations savings while improving associate efficiency by 250% through automated workflows.",
                  "Built ML pipelines with Python, TensorFlow, and SageMaker, driving over $5M in annual cost savings through supply chain optimization.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                    <svg className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="mt-12 sm:mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 p-6 sm:p-8 lg:p-10 md:backdrop-blur-sm">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-600 opacity-20 blur-3xl hidden md:block" />

            <div className="relative">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* UT Dallas Logo */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 relative">
                    <img
                      src="/UT_Dallas_2_Color_Emblem_-_SVG_Brand_Identity_File.svg.png"
                      alt="UT Dallas Logo"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">University of Texas at Dallas</h3>
                    <div className="mt-2 text-base sm:text-lg font-medium bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Master's in Computer Information Technology and Management</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 w-fit">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                  Graduate Degree
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-16 sm:mt-24 lg:mt-32">
          <div className="mb-8 sm:mb-12 text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Projects</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">Projects that show real system thinking: build, ship, operate.</p>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {projects.map((p, idx) => (
              <div key={p.title} className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-6 lg:p-8 md:backdrop-blur-sm transition-all ${
                idx === 0
                  ? "border-purple-300 dark:border-purple-500/30 bg-gradient-to-br from-purple-100/60 via-blue-100/60 to-slate-100/60 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-slate-900/20 shadow-xl shadow-purple-300/20 dark:shadow-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-400/40 dark:hover:shadow-purple-500/40"
                  : "border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:border-slate-400 dark:hover:border-white/20 hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-300/20 dark:hover:shadow-purple-500/20"
              }`}>
                {/* Animated gradient background - stronger for Nava */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 transition-opacity ${
                  idx === 0 ? "group-hover:opacity-30" : "group-hover:opacity-100"
                }`} />

                {/* Coming Soon badge for Amaravati */}
                {idx === 0 && (
                  <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-green-500 to-emerald-500 px-12 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Coming Soon
                  </div>
                )}

                {/* Featured badge for Nava */}
                {p.featured && (
                  <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-orange-500 to-pink-500 px-12 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Featured
                  </div>
                )}

                <div className="relative">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className={`mb-2 inline-block rounded-lg px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold ${
                        idx === 0
                          ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-700 dark:text-purple-300 shadow-md"
                          : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300"
                      }`}>
                        PROJECT {String(idx + 1).padStart(2, '0')}
                      </div>
                      <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                        idx === 0
                          ? "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                          : p.featured
                          ? "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                          : "text-slate-900 dark:text-white"
                      }`}>
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span className="mt-2 inline-block rounded-lg bg-orange-500/20 border border-orange-500/30 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-orange-600 dark:text-orange-400">
                          In Progress • App Store Launch Pending
                        </span>
                      )}
                      {p.comingSoon && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-green-600 dark:text-green-400">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Coming Soon
                          </span>
                          {p.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {p.location}
                            </span>
                          )}
                          {p.cycleImage && (
                            <span className="inline-flex items-center gap-1.5 text-2xl sm:text-3xl" title="Smart Bicycle Platform">
                              🚴‍♂️
                            </span>
                          )}
                        </div>
                      )}
                      <div className={`mt-2 text-sm sm:text-base ${
                        idx === 0 ? "text-slate-700 dark:text-slate-200 font-medium" : "text-slate-600 dark:text-slate-300"
                      }`}>{p.subtitle}</div>
                    </div>

                    <a
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all active:scale-95 ${
                        idx === 0
                          ? "border-purple-500/50 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                          : "border-slate-300 dark:border-white/10 bg-slate-200/70 dark:bg-white/5 text-slate-900 dark:text-white hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
                      }`}
                      href={p.link}
                      target={p.link.startsWith("http") ? "_blank" : undefined}
                      rel={p.link.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {p.linkText}
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                    {p.points.map((pt, ptIdx) => (
                      <li key={pt} className={`flex items-start gap-2 sm:gap-3 text-sm sm:text-base ${
                        idx === 0 ? "text-slate-700 dark:text-slate-200" : "text-slate-600 dark:text-slate-300"
                      } ${
                        ptIdx >= 3 ? "hidden md:flex" : ""
                      }`}>
                        <svg className={`mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                          idx === 0 ? "text-purple-400" : "text-purple-400"
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                    {p.stack.map((s, stackIdx) => (
                      <span key={s} className={`rounded-full border px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all ${
                        idx === 0
                          ? "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-200 hover:border-purple-500/50 hover:bg-purple-500/20 hover:scale-105"
                          : "border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-purple-500/50 hover:bg-slate-200 dark:hover:bg-white/10"
                      } ${
                        stackIdx >= 8 ? "hidden md:inline-block" : ""
                      }`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-16 sm:mt-24 lg:mt-32">
          <div className="mb-8 sm:mb-12 text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Skills & Technologies</h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-auto">
            {skills.map((s, idx) => {
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
                "from-green-500 to-emerald-500",
                "from-indigo-500 to-violet-500",
                "from-yellow-500 to-orange-500",
                "from-rose-500 to-pink-500",
                "from-teal-500 to-cyan-500",
                "from-violet-500 to-purple-500"
              ];

              // Bento grid span patterns for visual interest
              const spanClasses = [
                "col-span-2", // Data Engineering - wide
                "col-span-2", // Full Stack - wide (expanded with Microsoft stack)
                "col-span-1", // Systems & Infrastructure
                "col-span-2", // Cloud/DevOps - wide
                "col-span-2", // AI/ML - wide
                "col-span-2", // IDEs & AI Coding Tools - wide
                "col-span-1", // 3D Graphics & UI
                "col-span-1", // Analytics & BI
                "col-span-2", // Agile & Project Management - wide
              ];

              // Individual hover styles for each card
              const hoverStyles = [
                "hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/40 dark:hover:shadow-blue-500/30",
                "hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/30",
                "hover:border-orange-400 dark:hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/40 dark:hover:shadow-orange-500/30",
                "hover:border-green-400 dark:hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/40 dark:hover:shadow-green-500/30",
                "hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/40 dark:hover:shadow-indigo-500/30",
                "hover:border-yellow-400 dark:hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/40 dark:hover:shadow-yellow-500/30",
                "hover:border-rose-400 dark:hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/40 dark:hover:shadow-rose-500/30",
                "hover:border-teal-400 dark:hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/40 dark:hover:shadow-teal-500/30",
                "hover:border-violet-400 dark:hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/40 dark:hover:shadow-violet-500/30",
              ];

              return (
                <div
                  key={s.group}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3 sm:p-5 md:backdrop-blur-sm transition-all duration-150 hover:bg-white dark:hover:bg-white/10 hover:scale-[1.02] flex flex-col ${spanClasses[idx]} ${hoverStyles[idx]}`}
                >
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradients[idx]} opacity-10 blur-2xl transition-all duration-150 group-hover:opacity-40 group-hover:scale-150`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]} opacity-0 transition-opacity duration-150 group-hover:opacity-[0.08]`} />

                  <div className="relative flex flex-col h-full">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex-shrink-0">{s.group}</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 content-start flex-1">
                      {s.items.map((it) => (
                        <span key={it} className="rounded-md border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] lg:text-xs font-medium text-slate-700 dark:text-slate-300 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-slate-200 dark:hover:bg-white/10 hover:scale-105 h-fit whitespace-nowrap">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-16 sm:mt-24 lg:mt-32">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-300 dark:border-white/10 bg-gradient-to-br from-purple-50 via-slate-50 to-blue-50 dark:from-purple-900/50 dark:via-slate-900/50 dark:to-blue-900/50 p-6 sm:p-8 lg:p-12 md:backdrop-blur-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl hidden md:block" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-600 opacity-30 blur-3xl hidden md:block" />

            <div className="relative">
              <div className="mb-8 sm:mb-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Get In Touch</h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 px-4">
                  Interested in working together? Fill out the form below and I'll get back to you soon!
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="mx-auto max-w-xl space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                    placeholder="yourname@gmail.com"
                  />
                  <p className="mt-1 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">Only Gmail or Outlook addresses accepted</p>
                  <p className="mt-1 text-[10px] sm:text-xs text-slate-500 dark:text-slate-500">Or email directly: <a href="mailto:rkkarumanchi98@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">rkkarumanchi98@gmail.com</a></p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Phone Number <span className="text-slate-400">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white dark:focus:bg-white/10 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white dark:focus:bg-white/10 transition-all resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hi..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !contactForm.name.trim() || !contactForm.email.trim()}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/70 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitMessage && (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 sm:px-4 py-2.5 sm:py-3 text-center text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                    {submitMessage}
                  </div>
                )}
              </form>

              {/* Social Links */}
              <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
                <a className="rounded-xl border-2 border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-slate-400 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95" href="mailto:rkkarumanchi98@gmail.com">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </span>
                </a>
                <a className="rounded-xl border-2 border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-slate-400 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95" href="https://www.linkedin.com/in/rohit-karumanchi/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="rounded-xl border-2 border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:border-slate-400 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95" href="https://github.com/rohitkarumanchi745" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-20 pb-10 text-center text-sm text-slate-600 dark:text-slate-500">
          © {new Date().getFullYear()} Rohit Karumanchi
        </footer>
      </div>

      {/* Spuff Chatbot */}
      <Chatbot />
    </main>
  );
}
