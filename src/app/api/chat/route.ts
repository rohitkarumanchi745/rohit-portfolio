import { NextResponse } from 'next/server';

const PORTFOLIO_CONTEXT = `
You are Spuff, Rohit Karumanchi's AI assistant. Answer questions about Rohit's portfolio professionally and comprehensively.

# ROHIT'S PROFILE

**Name**: Rohit Karumanchi
**Email**: rkkarumanchi98@gmail.com
**GitHub**: https://github.com/rohitkarumanchi745
**LinkedIn**: https://www.linkedin.com/in/rohit-karumanchi/
**Education**: Master's in Computer Information Technology and Management, University of Texas at Dallas
**Current Role**: Software Engineer (Full Stack + Data) at Neiman Marcus Group (2023-Present)
**Open to**: Data / Backend / ML Platform roles

# CORE STRENGTHS

1. **Software Engineering & Distributed Systems** - Expert in designing and building distributed systems at scale. Proficient in Rust, Python, and Java for high-performance backend services. Deep understanding of system design patterns including horizontal scaling, caching strategies, message queues, and event-driven architectures. Experience with microservices, API design (REST, GraphQL, gRPC), and building fault-tolerant systems.

2. **Data Engineering** - Expert in building production streaming/batch pipelines with Kafka, Spark, Databricks, Airflow, Snowflake, and dbt. Strong in big data processing with PySpark and Scala. Hands-on with Kafka consumer groups, offset management, exactly-once semantics, and partition strategies.

3. **Backend Development** - Proficient in building scalable backend systems with Rust/Axum, FastAPI, GraphQL, Python, Java, and Spring Boot. Experienced in database design (PostgreSQL, DynamoDB, Redis), connection pooling, query optimization, and data modeling.

4. **ML/AI Engineering** - Skilled in PyTorch, ONNX Runtime, LangChain, LangGraph, and MCP Server for AI agent workflows. Built production ML systems for computer vision (face detection, liveness verification) and recommendation systems.

5. **Cloud & Infrastructure** - Strong deployment skills with AWS, Azure, Kubernetes, Docker, and CI/CD pipelines. Experience with reliability engineering, observability (Prometheus/Grafana), and infrastructure as code (Terraform).

# PROFESSIONAL EXPERIENCE

**Neiman Marcus Group** - Software Engineer (Full Stack + Data) | 2023-Present
- Designs and builds large-scale, high-performance data and AI-adjacent systems supporting customer-facing analytics, operational intelligence, and internal decision-making platforms
- Work sits at the intersection of distributed systems, data engineering, and applied ML—translating complex business requirements into reliable, production-grade solutions at enterprise scale
- Technologies: Kafka, Spark/Databricks, Snowflake, Airflow, Azure/AWS

**NNR Global Logistics** - Previous Role
- Worked on data-intensive systems handling large volumes of operational and logistics data
- Helped modernize pipelines and improve reliability across critical workflows
- Strengthened foundation in software engineering best practices, scalability, and building systems that perform under real-world constraints

Quote: "AI-focused Software Engineer passionate about building scalable, high-impact data and intelligence platforms. I enjoy working with modern data platforms, cloud infrastructure, and AI-driven architectures, motivated by problems where engineering rigor directly translates into measurable business impact."

# PROJECTS

## 1. Nava (Full Stack Dating App with ML) - FEATURED PROJECT
**Subtitle**: FastAPI + GraphQL + React Native + Kubernetes + FL/RL + PyTorch + OpenCV
**GitHub**: https://github.com/rohitkarumanchi745/telugu-dating-backend-main

**Details**:
- Built production full-stack dating app: FastAPI/GraphQL backend, React Native/Expo mobile app, Rust MCP server for real-time matchmaking
- Deployed on Kubernetes with Docker, orchestrated ML pipelines using Airflow and Ray on Anyscale for distributed PyTorch model training
- Implemented CNN models with PyTorch + OpenCV for real-time selfie verification and face authentication on mobile devices
- Built Federated Learning and Reinforcement Learning for privacy-preserving recommendations with on-device model deployment
- Integrated Vector DB for semantic profile matching and Streamlit analytics dashboard with Data Fusion pipelines for user behavior analysis
- Designed microservices with OTP/JWT auth, profile management, and production-grade error handling

**Tech Stack**: FastAPI, GraphQL, React Native/Expo, PyTorch, CNN, OpenCV, Vector DB, Kubernetes, Docker, Rust, MCP Server, FL/RL, Airflow, Ray/Anyscale, Streamlit, Data Fusion, Postgres

## 2. Real-time Retail Data Platform
**Subtitle**: Kafka → Spark/Databricks → Snowflake, with SLAs + Observability

**Details**:
- Built streaming + batch pipelines powering order/shipment/fraud analytics
- Improved pipeline reliability through monitoring, alerting, and backfill strategy
- Partnered with stakeholders to turn ambiguous needs into scalable data products

**Tech Stack**: Kafka, Spark/Databricks, Snowflake, Airflow, Azure/AWS

## 3. Supply Chain & Inventory Analytics Platform
**Subtitle**: Real-time shipping, inventory optimization, and SLA monitoring at scale

**Details**:
- Built real-time supply chain analytics pipelines tracking shipments, inventory levels, and warehouse operations across multiple distribution centers
- Implemented SLA monitoring dashboards with automated alerting for delivery delays, stock-outs, and fulfillment bottlenecks
- Developed inventory optimization models to predict demand, reduce carrying costs, and improve order fulfillment rates
- Created end-to-end visibility for shipping status, route optimization, and delivery time predictions using historical data and ML

**Tech Stack**: Kafka, Spark, Snowflake, dbt, Airflow, Power BI, Python, SQL, Predictive Analytics

# SKILLS & TECHNOLOGIES

**Data Engineering**: Kafka, Spark, PySpark, Scala, Databricks, Airflow, Snowflake, dbt, Data Fusion, Ray/Anyscale, SQS, Kinesis, Big Data

**Full Stack**: Python, Java, Rust, React, TypeScript, FastAPI, GraphQL, React Native/Expo, REST, JWT/Auth, gRPC, Next.js, Microfrontend Architecture

**Systems & Infrastructure**: MCP Server, Postgres, Redis, Docker, Kubernetes, Microservices

**Cloud/DevOps**: Azure, AWS, Git, GitHub, CI/CD, Prometheus/Grafana, Streamlit

**ML/Computer Vision**: PyTorch, CNN, OpenCV, Federated Learning, RL, On-Device ML, Vector DBs, RecSys, Model Deployment

**Analytics & BI**: Power BI, Tableau, Streamlit, Data Visualization

# INSTRUCTIONS
- Answer questions professionally and comprehensively
- Highlight Rohit's strengths and real-world impact
- Use specific examples from projects when relevant
- Keep responses concise but informative (2-4 sentences for simple questions, more detail for complex ones)
- If asked about strengths/expertise, provide structured breakdown
- Always be helpful and encouraging about Rohit's capabilities
`;

// Smart keyword-based fallback responses
function getSmartResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  // Strengths & expertise
  if (lowerMsg.includes("strong") || lowerMsg.includes("strength") || lowerMsg.includes("expertise") || lowerMsg.includes("specialize") || lowerMsg.includes("good at") || lowerMsg.includes("expert")) {
    return "Rohit's core strengths are:\n\n🔷 Software Engineering & Distributed Systems - Expert in designing and building distributed systems at scale. Proficient in Rust, Python, and Java for high-performance backend services. Deep understanding of system design patterns including horizontal scaling, caching strategies, message queues, and event-driven architectures.\n\n🔷 Data Engineering - Expert in building production streaming/batch pipelines with Kafka, Spark, Databricks, Airflow, Snowflake, and dbt. Hands-on with Kafka consumer groups, offset management, exactly-once semantics, and partition strategies.\n\n🔷 Backend Development - Proficient in building scalable backend systems with Rust/Axum, FastAPI, GraphQL, Python, Java, and Spring Boot. Experienced in database design (PostgreSQL, DynamoDB, Redis), connection pooling, and query optimization.\n\n🔷 ML/AI Engineering - Skilled in PyTorch, ONNX Runtime, LangChain, LangGraph, and MCP Server for AI agent workflows. Built production ML systems for computer vision and recommendation systems.\n\n🔷 Cloud & Infrastructure - Strong deployment skills with AWS, Azure, Kubernetes, Docker, and CI/CD pipelines. Experience with reliability engineering and observability (Prometheus/Grafana).";
  }

  // Data engineering
  if (lowerMsg.includes("data engineer") || lowerMsg.includes("pipeline") || lowerMsg.includes("kafka") || lowerMsg.includes("spark") || lowerMsg.includes("databricks") || lowerMsg.includes("snowflake") || lowerMsg.includes("airflow")) {
    return "Rohit is a strong Data Engineer! He builds production streaming and batch pipelines using Kafka → Spark/Databricks → Snowflake. His data engineering stack includes PySpark, Scala, Airflow, dbt, SQS, Kinesis, Data Fusion, and Ray/Anyscale for distributed processing. He's experienced in reliability engineering with SLA monitoring, alerting, and observability. At Neiman Marcus, he powers real-time retail analytics for order/shipment/fraud detection at scale.";
  }

  // Full stack
  if (lowerMsg.includes("full stack") || lowerMsg.includes("backend") || lowerMsg.includes("frontend") || lowerMsg.includes("fastapi") || lowerMsg.includes("graphql") || lowerMsg.includes("react native") || lowerMsg.includes("microservice")) {
    return "Rohit excels at Full Stack Development! His backend expertise includes FastAPI, GraphQL, REST APIs, gRPC, Python, Java, and Rust. On the frontend, he builds mobile apps with React Native/Expo and web apps with React, TypeScript, and Next.js. He's experienced in microservices architecture, microfrontend architecture, JWT/Auth, Docker, Kubernetes, Postgres, and Redis. His Nava dating app showcases end-to-end full-stack skills with production deployment!";
  }

  // Nava project
  if (lowerMsg.includes("nava") || lowerMsg.includes("dating")) {
    return "Nava is Rohit's flagship full-stack dating app with ML! It's a production-grade mobile app built with:\n• Backend: FastAPI + GraphQL APIs, Rust MCP server for real-time matchmaking\n• Mobile: React Native/Expo with smooth UX\n• ML/CV: PyTorch CNN models + OpenCV for real-time selfie verification and face authentication on-device\n• Privacy: Federated Learning & Reinforcement Learning for privacy-preserving recommendations\n• Data: Vector DB for semantic profile matching, Streamlit analytics dashboard, Data Fusion pipelines\n• Infra: Deployed on Kubernetes with Docker, Airflow + Ray/Anyscale for distributed ML training\n• Auth: JWT/OTP authentication with production-grade error handling\n\nCheck out the repo on his GitHub!";
  }

  // Projects overview
  if (lowerMsg.includes("project")) {
    return "Rohit has built impressive projects showcasing end-to-end skills:\n\n1️⃣ Nava (Full Stack Dating App with ML) - FastAPI, GraphQL, React Native, PyTorch, CNN, OpenCV, Federated Learning, Kubernetes. Real-time selfie verification and privacy-preserving recommendations!\n\n2️⃣ Real-time Retail Data Platform - Kafka→Spark/Databricks→Snowflake pipeline powering order/shipment/fraud analytics with SLAs and observability.\n\n3️⃣ Supply Chain & Inventory Analytics Platform - Real-time shipping tracking, SLA monitoring, inventory optimization, and delivery predictions at scale.\n\nWhich project would you like to know more about?";
  }

  // Experience
  if (lowerMsg.includes("experience") || lowerMsg.includes("neiman") || lowerMsg.includes("work") || lowerMsg.includes("job")) {
    return "Rohit is a Software Engineer (Full Stack + Data) at Neiman Marcus Group (2023-Present). His responsibilities include:\n• Building and operating streaming + batch data pipelines for retail analytics at scale\n• Improving system reliability through monitoring, alerting, and operational playbooks\n• Working cross-functionally with stakeholders to deliver production data products\n• Powering downstream analytics for order/shipment/fraud detection\n• Technologies: Kafka, Spark/Databricks, Snowflake, Airflow, Azure/AWS\n\nHe builds scalable data platforms and production-grade backend systems that drive real business impact!";
  }

  // Skills
  if (lowerMsg.includes("skill") || lowerMsg.includes("tech") || lowerMsg.includes("stack")) {
    return "Rohit has a comprehensive tech stack across multiple domains:\n\n📊 Data Engineering: Kafka, Spark, PySpark, Scala, Databricks, Airflow, Snowflake, dbt, Data Fusion, Ray/Anyscale, SQS, Kinesis, Big Data\n\n💻 Full Stack: Python, Java, Rust, React, TypeScript, FastAPI, GraphQL, React Native/Expo, REST, JWT/Auth, gRPC, Next.js, Microfrontend Architecture\n\n🔧 Systems & Infrastructure: MCP Server, Postgres, Redis, Docker, Kubernetes, Microservices\n\n☁️ Cloud/DevOps: Azure, AWS, Git, GitHub, CI/CD, Prometheus/Grafana, Streamlit\n\n🤖 ML/Computer Vision: PyTorch, CNN, OpenCV, Federated Learning, RL, On-Device ML, Vector DBs, RecSys, Model Deployment\n\n📈 Analytics & BI: Power BI, Tableau, Streamlit, Data Visualization";
  }

  // Contact
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach") || lowerMsg.includes("hire")) {
    return "You can reach Rohit at:\n📧 Email: rkkarumanchi98@gmail.com (preferred)\n💼 GitHub: github.com/rohitkarumanchi745\n\nHe's open to Data / Backend / ML Platform roles! If you send a role link, he'll reply with relevant projects and impact. Email is the best way to connect!";
  }

  // Education
  if (lowerMsg.includes("education") || lowerMsg.includes("degree") || lowerMsg.includes("university") || lowerMsg.includes("college") || lowerMsg.includes("master") || lowerMsg.includes("school") || lowerMsg.includes("utd") || lowerMsg.includes("ut dallas") || lowerMsg.includes("texas")) {
    return "Rohit holds a Master's degree in Computer Information Technology and Management from the University of Texas at Dallas (UT Dallas). This graduate program combines technical computer science skills with business management fundamentals, providing him with both deep technical expertise and business acumen—perfect for bridging the gap between engineering and product impact!";
  }

  // About/Who
  if (lowerMsg.includes("who") || lowerMsg.includes("about") || lowerMsg.includes("introduce") || lowerMsg.includes("tell me")) {
    return "Rohit Karumanchi is a Software Engineer (Full Stack + Data) with strong expertise in:\n• Data Engineering - Building production streaming/batch pipelines with Kafka, Spark, Databricks, Snowflake\n• Full Stack Development - FastAPI, GraphQL, React Native, Python, Java, Rust, microservices\n• ML/Computer Vision - PyTorch, CNN models, OpenCV, Federated Learning, on-device ML\n• Cloud & DevOps - Azure, AWS, Kubernetes, Docker, CI/CD, observability\n\nHe holds a Master's in Computer Information Technology and Management from UT Dallas and currently works at Neiman Marcus Group building scalable data platforms and ML-enabled products. Open to Data / Backend / ML Platform roles!\n\nAsk me about his strengths, projects, or specific technologies!";
  }

  // Default
  return "Rohit Karumanchi is a Software Engineer (Full Stack + Data) currently at Neiman Marcus Group. I can help you learn more about his experience in data engineering, ML, and full-stack development. Try asking about:\n• His core strengths and expertise\n• The Nava dating app project\n• His work at Neiman Marcus\n• His education and background\n• Specific technologies (Kafka, Spark, React Native, PyTorch, etc.)\n• How to contact him";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Try Claude (Anthropic) first if API key is available
    if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'sk-ant-your-key-here') {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            system: PORTFOLIO_CONTEXT,
            messages: [
              { role: 'user', content: message }
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.content[0].text;
          return NextResponse.json({ response: aiResponse });
        }

        // If Claude fails, fall through to OpenAI or keyword-based
        console.log('Claude API unavailable, trying fallback');
      } catch (claudeError) {
        console.log('Claude error, trying fallback:', claudeError);
      }
    }

    // Try OpenAI as secondary option if API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here') {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: PORTFOLIO_CONTEXT },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0].message.content;
          return NextResponse.json({ response: aiResponse });
        }

        console.log('OpenAI API unavailable, using fallback responses');
      } catch (openaiError) {
        console.log('OpenAI error, using fallback:', openaiError);
      }
    }

    // Use smart keyword-based responses as fallback
    const smartResponse = getSmartResponse(message);
    return NextResponse.json({ response: smartResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { response: "I'm here to help! Ask me about Rohit's experience, projects, or skills. You can also email him directly at rkkarumanchi98@gmail.com!" },
      { status: 200 } // Return 200 with fallback message instead of error
    );
  }
}
