# System Design Points Added to Portfolio

A single system design bullet point has been added to each project and the experience section.

---

## What Was Added

### **For All 4 Projects:**

Each project now has one additional bullet point starting with "System Design:" that summarizes key architectural decisions:

#### **Project 1: Nava (Full Stack Dating App with ML)**
- **System Design:** Microservices architecture with event-driven async messaging, multi-tier data layer (Postgres/Vector DB/Redis), distributed ML training pipeline with Federated Learning, GraphQL API gateway for unified client access, and comprehensive observability via Streamlit dashboards.

#### **Project 2: Real-time Retail Data Platform**
- **System Design:** Lambda architecture for streaming/batch processing, multi-tier data storage (hot/warm/cold paths), API gateway pattern with FastAPI/GraphQL, SLA-driven reliability with self-healing backfills, Kubernetes service mesh with auto-scaling, and hybrid cloud deployment strategy.

#### **Project 3: Supply Chain & Inventory Analytics**
- **System Design:** Event sourcing pattern for inventory state changes, multi-region active-active replication with eventual consistency, predictive analytics pipeline with ARIMA/Prophet models, circuit breaker pattern for 3PL integrations, data mesh approach for domain products, and real-time SLA alerting with tiered escalation.

#### **Project 4: Interactive 3D Portfolio (This Site!)**
- **System Design:** Hybrid SSR/CSR rendering strategy for SEO and performance, BFF pattern with Next.js API routes proxying external services, CDN-optimized delivery with CloudFront edge caching, stateless architecture for horizontal scalability, and zero-downtime deployments via PM2 cluster mode with health checks.

---

### **For Experience Section:**

Added one system design bullet point to Neiman Marcus role:

- **System Design:** Kafka-based event streaming with exactly-once semantics, Spark Structured Streaming for real-time aggregations, circuit breaker pattern for external APIs with dead letter queues, service mesh with REST/GraphQL APIs and distributed tracing, star schema data modeling in Snowflake with SCD Type 2, and comprehensive observability via Prometheus/Grafana/PagerDuty.

---

## Why This Matters

### **For Recruiters/Hiring Managers:**

1. **Shows System Thinking**: Each project now explicitly highlights architectural patterns and design decisions
2. **Technical Depth**: References industry-standard patterns (Lambda, Event Sourcing, Circuit Breaker, API Gateway, Service Mesh, Data Mesh, BFF)
3. **Production Focus**: Emphasizes reliability, observability, scalability, and operational excellence
4. **Concise Format**: Single bullet point per project makes it easy to scan and understand the architecture

### **Key Patterns Highlighted:**

- **Microservices Architecture**
- **Event-driven Architecture**
- **Lambda Architecture** (streaming + batch)
- **Event Sourcing**
- **Circuit Breaker Pattern**
- **API Gateway Pattern**
- **BFF (Backend-for-Frontend)**
- **Service Mesh**
- **Data Mesh**
- **Multi-tier Storage**
- **Hybrid SSR/CSR Rendering**
- **SLA-driven Design**

---

## Technical Concepts Referenced

The system design points demonstrate knowledge of:

- **Streaming:** Kafka, Spark Structured Streaming, exactly-once semantics
- **Databases:** PostgreSQL, Snowflake (star schema, SCD Type 2), Redis, Vector DB
- **ML Infrastructure:** Ray/Anyscale, Federated Learning, distributed training, on-device inference
- **Reliability:** Circuit breakers, dead letter queues, self-healing backfills, idempotent design
- **Observability:** Prometheus, Grafana, PagerDuty, Streamlit dashboards, distributed tracing
- **Cloud/DevOps:** Kubernetes auto-scaling, CloudFront CDN, PM2 cluster mode, zero-downtime deployments
- **API Patterns:** REST, GraphQL, BFF pattern, API gateway
- **Data Engineering:** Multi-tier storage (hot/warm/cold), data mesh, predictive analytics (ARIMA/Prophet)
- **Web Performance:** Hybrid SSR/CSR, CDN edge caching, stateless architecture

---

## Build Status

```
✓ Compiled successfully in 2.7s
✓ Running TypeScript
✓ Generating static pages (6/6) in 198.2ms
✓ Finalizing page optimization

Route (app)
┌ ○ /                (Static)
├ ○ /_not-found      (Static)
├ ƒ /api/chat        (Dynamic)
└ ƒ /api/contact     (Dynamic)
```

**Zero errors, zero warnings** - Production ready!

---

## How to View

1. Navigate to http://localhost:3001
2. Scroll to **Experience** section → See the last bullet point about system design
3. Scroll to **Projects** section → Each project's last bullet point highlights system design
4. Notice the consistent "System Design:" prefix for easy identification

---

## Files Modified

- `/Users/rohit/rohit-portfolio/src/app/page.tsx` - Added one system design bullet point to each project and the experience section

---

**Your portfolio now showcases the "how" behind the "what" - demonstrating architectural thinking alongside implementation!**
