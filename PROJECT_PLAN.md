# Prometheus & Grafana Learning Project 📊

A progressive learning project to master Prometheus and Grafana by building a real monitoring system.

## 🎯 Project Overview

**Goal**: Build a full-stack monitoring solution with Prometheus and Grafana

**What we'll build**:
- A sample application with custom metrics
- Prometheus server to scrape and store metrics
- Grafana dashboards to visualize metrics
- Alert rules for notifications
- Complete observability stack

---

## 📚 Learning Path

### Phase 1: Setup & Basics
**Goal**: Set up Prometheus and Grafana, understand core concepts

**What you'll learn**:
- What is Prometheus and why use it?
- What is Grafana and why use it?
- Architecture: Prometheus, Grafana, and Application
- Basic concepts: Metrics, Time Series, Scraping, Queries

**Tasks**:
1. Set up Prometheus server
2. Set up Grafana
3. Configure Prometheus to scrape itself (default metrics)
4. Create your first Grafana dashboard
5. Understand PromQL basics

**Deliverables**:
- ✅ Prometheus running and scraping metrics
- ✅ Grafana connected to Prometheus
- ✅ First dashboard showing basic metrics

---

### Phase 2: Application Metrics
**Goal**: Add custom metrics to an application

**What you'll learn**:
- Instrumenting applications with metrics
- Custom metric types (Counter, Gauge, Histogram, Summary)
- Exposing metrics endpoints
- Labeling and metadata

**Tasks**:
1. Create a simple Node.js/Spring Boot app
2. Add Prometheus client libraries
3. Create custom metrics (request count, response time, etc.)
4. Expose /metrics endpoint
5. Configure Prometheus to scrape the app

**Deliverables**:
- ✅ Application with custom metrics
- ✅ Prometheus scraping application metrics
- ✅ Metrics visible in Prometheus UI

---

### Phase 3: Grafana Dashboards
**Goal**: Build comprehensive dashboards in Grafana

**What you'll learn**:
- Grafana dashboard creation
- Panel types (Graph, Stat, Table, Gauge, etc.)
- PromQL queries for visualization
- Dashboard variables and templating
- Dashboard best practices

**Tasks**:
1. Create application health dashboard
2. Build performance metrics dashboard
3. Add custom panels and visualizations
4. Use dashboard variables for filtering
5. Organize dashboards in folders

**Deliverables**:
- ✅ Multiple dashboards for different views
- ✅ Rich visualizations and graphs
- ✅ Interactive dashboards with variables

---

### Phase 4: Alerting
**Goal**: Set up alerting with Prometheus and Grafana

**What you'll learn**:
- Prometheus Alertmanager
- Alert rules and conditions
- Notification channels (Email, Slack, etc.)
- Alert evaluation and grouping
- Grafana alerting (alternative approach)

**Tasks**:
1. Configure Alertmanager
2. Create alert rules (high CPU, errors, slow requests, etc.)
3. Set up notification channels
4. Test alerts
5. Fine-tune alert rules

**Deliverables**:
- ✅ Alertmanager configured
- ✅ Alert rules defined
- ✅ Notifications working
- ✅ Alert testing completed

---

### Phase 5: Advanced Features
**Goal**: Learn advanced monitoring features

**What you'll learn**:
- Service discovery
- Recording rules
- Federation
- Long-term storage
- Exporters for external systems

**Tasks**:
1. Set up service discovery (optional)
2. Create recording rules for performance
3. Explore exporters (Node Exporter, etc.)
4. Set up long-term storage (optional)
5. Multi-service monitoring

**Deliverables**:
- ✅ Advanced Prometheus configuration
- ✅ Recording rules for optimized queries
- ✅ Monitoring multiple services
- ✅ Complete observability stack

---

## 🛠️ Tech Stack

### Core Components
- **Prometheus** - Metrics collection and storage
- **Grafana** - Visualization and dashboards
- **Alertmanager** - Alert handling and routing

### Application (Your Choice)
- **Option 1**: Node.js + Express (JavaScript/TypeScript)
- **Option 2**: Spring Boot (Java)
- **Option 3**: Python + Flask/FastAPI

### Deployment
- **Docker** - Containerized deployment
- **Docker Compose** - Multi-container orchestration

---

## 📁 Project Structure

```
prometheus-grafana-learning/
├── README.md
├── PROJECT_PLAN.md
├── docker-compose.yml          # All services
├── prometheus/
│   ├── prometheus.yml          # Prometheus config
│   └── alerts.yml              # Alert rules
├── grafana/
│   ├── dashboards/             # Dashboard JSON files
│   └── provisioning/           # Auto-provisioning config
├── alertmanager/
│   └── config.yml              # Alertmanager config
├── app/                        # Your application
│   ├── src/
│   ├── package.json / pom.xml
│   └── Dockerfile
└── docs/                       # Documentation
    ├── phase1-setup.md
    ├── phase2-metrics.md
    └── ...
```

---

## 🎯 Success Criteria

### By Phase 1:
- ✅ Prometheus and Grafana running
- ✅ Basic understanding of metrics
- ✅ First dashboard created

### By Phase 2:
- ✅ Application instrumented with metrics
- ✅ Custom metrics exposed and scraped
- ✅ Metrics visible in Prometheus

### By Phase 3:
- ✅ Multiple dashboards created
- ✅ Visualizations working
- ✅ Dashboards are useful and informative

### By Phase 4:
- ✅ Alerts configured and working
- ✅ Notifications being sent
- ✅ Alert rules are meaningful

### By Phase 5:
- ✅ Complete monitoring solution
- ✅ Multiple services monitored
- ✅ Production-ready setup

---

## 🚀 Quick Start Plan

### Step 1: Environment Setup
- Install Docker and Docker Compose
- Create project directory structure
- Set up basic configuration files

### Step 2: Phase 1 Implementation
- Configure Prometheus
- Configure Grafana
- Test connection
- Create first dashboard

### Step 3: Phase 2 Implementation
- Choose application stack
- Create sample application
- Add metrics instrumentation
- Configure scraping

### Step 4: Continue progressively...
- Build dashboards (Phase 3)
- Set up alerting (Phase 4)
- Advanced features (Phase 5)

---

## 📖 Learning Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Prometheus Best Practices](https://prometheus.io/docs/practices/)

---

## 🤔 Questions to Consider

Before we start implementing:

1. **Application Choice**: 
   - Node.js/Express? (Easy to start)
   - Spring Boot? (You already know Java)
   - Python/Flask? (Simple and clear)

2. **Deployment**:
   - Docker Compose (recommended for learning)
   - Local installation
   - Cloud deployment

3. **Focus Areas**:
   - Emphasis on Prometheus queries (PromQL)?
   - Emphasis on Grafana dashboards?
   - Emphasis on alerting?
   - Equal focus on all?

---

## ✅ Next Steps

1. **Decide on application stack** (Node.js recommended for quick start)
2. **Create project structure**
3. **Set up Docker Compose** with Prometheus + Grafana
4. **Implement Phase 1** (Basic setup)
5. **Progress through phases** step by step

---

**Ready to start? Let's build an amazing monitoring solution!** 🚀


