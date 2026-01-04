"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('./components/Scene3D'), { ssr: false });

const projects = [
  {
    title: "Nava (Full Stack Dating App with ML)",
    subtitle: "FastAPI + GraphQL + React Native + Kubernetes + FL/RL + PyTorch + OpenCV",
    points: [
      "Built production full-stack dating app: FastAPI/GraphQL backend, React Native/Expo mobile app, Rust MCP server for real-time matchmaking.",
      "Deployed on Kubernetes with Docker, orchestrated ML pipelines using Airflow and Ray on Anyscale for distributed PyTorch model training.",
      "Implemented CNN models with PyTorch + OpenCV for real-time selfie verification and face authentication on mobile devices.",
      "Built Federated Learning and Reinforcement Learning for privacy-preserving recommendations with on-device model deployment.",
      "Integrated Vector DB for semantic profile matching and Streamlit analytics dashboard with Data Fusion pipelines for user behavior analysis.",
      "Designed microservices with OTP/JWT auth, profile management, and production-grade error handling.",
    ],
    stack: ["FastAPI", "GraphQL", "React Native/Expo", "PyTorch", "CNN", "OpenCV", "Vector DB", "Kubernetes", "Docker", "Rust", "MCP Server", "FL/RL", "Airflow", "Ray/Anyscale", "Streamlit", "Data Fusion", "Postgres"],
    link: "https://github.com/rohitkarumanchi745/telugu-dating-backend-main",
    linkText: "Repo",
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
    ],
    stack: ["Kafka", "Spark", "Snowflake", "dbt", "Airflow", "Power BI", "Python", "SQL", "Predictive Analytics"],
    link: "#",
    linkText: "Details",
  },
];

const skills = [
  { group: "Data Engineering", items: ["Kafka", "Spark", "PySpark", "Scala", "Databricks", "Airflow", "Snowflake", "dbt", "Data Fusion", "Ray/Anyscale", "SQS", "Kinesis", "Big Data"] },
  { group: "Full Stack", items: ["Python", "Java", "Rust", "React", "TypeScript", "FastAPI", "GraphQL", "React Native/Expo", "REST", "JWT/Auth", "gRPC", "Next.js", "Microfrontend Architecture"] },
  { group: "Systems & Infrastructure", items: ["MCP Server", "Postgres", "Redis", "Docker", "Kubernetes", "Microservices"] },
  { group: "Cloud/DevOps", items: ["Azure", "AWS", "Git", "GitHub", "CI/CD", "Prometheus/Grafana", "Streamlit"] },
  { group: "ML/Computer Vision", items: ["PyTorch", "CNN", "OpenCV", "Federated Learning", "RL", "On-Device ML", "Vector DBs", "RecSys", "Model Deployment"] },
  { group: "Analytics & BI", items: ["Power BI", "Tableau", "Streamlit", "Data Visualization"] },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Spuff, Rohit's AI assistant. Ask me anything about his experience, projects, or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-110 hover:shadow-xl hover:shadow-purple-500/70"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-lg font-bold">S</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Spuff</h3>
              <p className="text-xs text-slate-400">AI Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "border border-white/10 bg-white/5 text-slate-300"}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder={isLoading ? "Thinking..." : "Ask about Rohit..."}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
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
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you! Your message has been received. Rohit will get back to you soon!');
      setContactForm({ name: '', email: '', phone: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Rohit Karumanchi
            </h2>
            <div className="flex gap-6">
              <a href="#about" className="text-sm text-slate-300 hover:text-white transition-colors">
                About Me
              </a>
              <a href="#experience" className="text-sm text-slate-300 hover:text-white transition-colors">
                Experience
              </a>
              <a href="#projects" className="text-sm text-slate-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-sm text-slate-300 hover:text-white transition-colors">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated grid background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Grid lines - much brighter */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.15)_2px,transparent_2px),linear-gradient(90deg,rgba(139,92,246,0.15)_2px,transparent_2px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]"
             style={{ animation: 'gridMove 25s linear infinite' }} />

        {/* Floating particles - brighter and more visible */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const size = 2 + (i % 4);
            const left = (i * 13.7) % 100;
            const top = (i * 17.3) % 100;
            const duration = 15 + (i % 10);
            const delay = (i % 5);
            return (
              <div
                key={i}
                className="absolute rounded-full bg-purple-400/60 shadow-lg shadow-purple-400/50"
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

        {/* Light rays - much brighter and longer */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => {
            const width = 150 + (i * 12.5);
            const left = (i * 12.5) % 100;
            const top = (i * 11.7) % 100;
            const rotation = (i * 45) % 360;
            const duration = 3 + (i % 2);
            const delay = (i % 3);
            return (
              <div
                key={i}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent shadow-lg shadow-purple-400/30"
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

        {/* Additional glow spots */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => {
            const size = 200 + (i * 33);
            const left = (i * 16.7) % 100;
            const top = (i * 14.3) % 100;
            const duration = 5 + (i % 5);
            const delay = (i % 3);
            return (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500/10 blur-3xl"
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20">
        {/* HERO */}
        <section id="about" className="relative">
          {/* Background gradient blur effects - purple/blue like Wope */}
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
          <div className="absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-blue-600 opacity-20 blur-3xl" />
          <div className="absolute top-40 left-1/2 h-80 w-80 rounded-full bg-violet-600 opacity-15 blur-3xl" />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left: Text content */}
            <div className="relative space-y-8 z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 shadow-lg backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to Data / Backend / ML Platform roles
              </div>

              <h1 className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                Rohit Karumanchi
              </h1>

              <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
                Empowering innovation through scalable data platforms, intelligent systems, and next-generation ML solutions that drive real-world impact.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50" href="#contact">
                  <span className="relative z-10 font-semibold">Contact Me</span>
                </a>
                <a className="rounded-xl border-2 border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10" href="/resume.pdf">
                  Resume (PDF)
                </a>
                <a className="rounded-xl border-2 border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10" href="https://github.com/rohitkarumanchi745" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="rounded-xl border-2 border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10" href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right: 3D Scene */}
            <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm shadow-2xl">
              <Scene3D />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs text-slate-400 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                  🖱️ Drag to explore • Auto-rotating
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-600 opacity-20 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white">Neiman Marcus Group</h3>
                  <div className="mt-2 text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Software Engineer (Full Stack + Data)</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-semibold text-blue-300">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  2023–Present
                </div>
              </div>

              <p className="mt-6 text-lg leading-relaxed text-slate-200 border-l-4 border-purple-500 pl-4 italic">
                I build scalable data platforms and production-grade backend systems—streaming pipelines, reliability engineering, and ML-enabled products that power real-world business impact.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Built and operated streaming + batch pipelines for retail analytics.",
                  "Improved reliability with monitoring, alerting, and operational playbooks.",
                  "Worked cross-functionally to deliver data products used by downstream teams.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-32">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">Projects</h2>
            <p className="mt-4 text-lg text-slate-400">Projects that show real system thinking: build, ship, operate.</p>
          </div>

          <div className="grid gap-8">
            {projects.map((p, idx) => (
              <div key={p.title} className={`group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-all ${
                idx === 0
                  ? "border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-slate-900/20 shadow-xl shadow-purple-500/20 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/40"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20"
              }`}>
                {/* Animated gradient background - stronger for Nava */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 transition-opacity ${
                  idx === 0 ? "group-hover:opacity-30" : "group-hover:opacity-100"
                }`} />

                {/* Featured badge for Nava */}
                {idx === 0 && (
                  <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-orange-500 to-pink-500 px-12 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Featured
                  </div>
                )}

                <div className="relative">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className={`mb-2 inline-block rounded-lg px-3 py-1 text-xs font-semibold ${
                        idx === 0
                          ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 shadow-md"
                          : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300"
                      }`}>
                        PROJECT {String(idx + 1).padStart(2, '0')}
                      </div>
                      <h3 className={`text-2xl font-bold ${
                        idx === 0
                          ? "bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                          : "text-white"
                      }`}>
                        {p.title}
                        {idx === 0 && (
                          <span className="ml-3 inline-block rounded-lg bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-xs font-semibold text-orange-400">
                            In Progress • App Store Launch Pending
                          </span>
                        )}
                      </h3>
                      <div className={`mt-2 text-base ${
                        idx === 0 ? "text-slate-200 font-medium" : "text-slate-300"
                      }`}>{p.subtitle}</div>
                    </div>

                    <a
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all ${
                        idx === 0
                          ? "border-purple-500/50 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                          : "border-white/10 bg-white/5 text-white hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600"
                      }`}
                      href={p.link}
                      target={p.link.startsWith("http") ? "_blank" : undefined}
                      rel={p.link.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {p.linkText}
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className={`flex items-start gap-3 ${
                        idx === 0 ? "text-slate-200" : "text-slate-300"
                      }`}>
                        <svg className={`mt-1 h-5 w-5 flex-shrink-0 ${
                          idx === 0 ? "text-purple-400" : "text-purple-400"
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className={`rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all ${
                        idx === 0
                          ? "border-purple-500/30 bg-purple-500/10 text-purple-200 hover:border-purple-500/50 hover:bg-purple-500/20 hover:scale-105"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-purple-500/50 hover:bg-white/10"
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
        <section id="skills" className="mt-32">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">Skills & Technologies</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s, idx) => {
              const gradients = [
                "from-blue-500 to-cyan-500",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
                "from-green-500 to-emerald-500",
                "from-indigo-500 to-violet-500",
                "from-rose-500 to-pink-500"
              ];
              return (
                <div key={s.group} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradients[idx]} opacity-10 blur-2xl transition-opacity group-hover:opacity-30`} />

                  <div className="relative">
                    <h3 className="text-xl font-bold text-white">{s.group}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <span key={it} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
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
        <section id="contact" className="mt-32">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/50 via-slate-900/50 to-blue-900/50 p-12 backdrop-blur-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600 opacity-30 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-600 opacity-30 blur-3xl" />

            <div className="relative">
              <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white">Get In Touch</h2>
                <p className="mt-4 text-lg text-slate-300">
                  Interested in working together? Fill out the form below and I'll get back to you soon!
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="mx-auto max-w-xl space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/70 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitMessage && (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-center text-sm text-emerald-400">
                    {submitMessage}
                  </div>
                )}
              </form>

              {/* Social Links */}
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a className="rounded-xl border-2 border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10" href="mailto:rkkarumanchi98@gmail.com">
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </span>
                </a>
                <a className="rounded-xl border-2 border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10" href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="rounded-xl border-2 border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10" href="https://github.com/rohitkarumanchi745" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-20 pb-10 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Rohit Karumanchi
        </footer>
      </div>

      {/* Spuff Chatbot */}
      <Chatbot />
    </main>
  );
}
