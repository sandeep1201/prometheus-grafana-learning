# Phase-by-Phase Learning Guide 📚

This document tracks your learning journey through Prometheus and Grafana. Each phase builds on the previous one.

## Phase 1: Setup & Basics ✅

**Goal**: Set up Prometheus and Grafana, understand core concepts

**What you'll learn**:
- Setting up Prometheus server
- Setting up Grafana
- Basic Prometheus configuration
- Creating your first dashboard
- Understanding metrics and time series

**Key Concepts**:
- **Prometheus** - Metrics collection and storage
- **Grafana** - Visualization platform
- **Scraping** - How Prometheus collects metrics
- **PromQL** - Prometheus Query Language
- **Time Series** - Data points over time

**Files**:
- `phase1-setup-basics/docker-compose.yml`
- `phase1-setup-basics/prometheus/prometheus.yml`
- `phase1-setup-basics/grafana/dashboards/`

**Run it**:
```bash
cd phase1-setup-basics
docker-compose up -d
```

---

## Phase 2: Application Metrics 🚧

**Goal**: Add custom metrics to an application

**What you'll learn**:
- Instrumenting Node.js applications
- Custom metric types (Counter, Gauge, Histogram)
- Exposing /metrics endpoint
- Configuring Prometheus scraping
- Labeling and metadata

**Key Concepts**:
- **Prometheus Client** - Library for instrumenting apps
- **Counter** - Monotonically increasing metric
- **Gauge** - Value that goes up and down
- **Histogram** - Distribution of measurements
- **Labels** - Key-value pairs for filtering

**Files**:
- `phase2-application-metrics/app/`
- `phase2-application-metrics/prometheus/prometheus.yml`

**Run it**:
```bash
cd phase2-application-metrics
docker-compose up -d
```

---

## Phase 3: Grafana Dashboards 🚧

**Goal**: Build comprehensive dashboards in Grafana

**What you'll learn**:
- Creating dashboards in Grafana
- Panel types (Graph, Stat, Table, Gauge)
- Writing PromQL queries
- Dashboard variables and templating
- Best practices for dashboards

**Key Concepts**:
- **Dashboards** - Collections of panels
- **Panels** - Individual visualizations
- **Variables** - Dynamic dashboard filtering
- **PromQL** - Querying metrics
- **Visualization** - Graphs, gauges, heatmaps

**Files**:
- `phase3-grafana-dashboards/grafana/dashboards/`
- `phase3-grafana-dashboards/grafana/provisioning/`

**Run it**:
```bash
cd phase3-grafana-dashboards
docker-compose up -d
```

---

## Phase 4: Alerting 🚧

**Goal**: Set up alerting with Prometheus and Grafana

**What you'll learn**:
- Prometheus Alertmanager
- Creating alert rules
- Notification channels (Email, Slack, etc.)
- Alert evaluation and routing
- Grafana alerting

**Key Concepts**:
- **Alertmanager** - Handles alert routing
- **Alert Rules** - Conditions that trigger alerts
- **Notification Channels** - Where alerts are sent
- **Alert Grouping** - Reducing alert noise
- **Silencing** - Temporarily disable alerts

**Files**:
- `phase4-alerting/prometheus/alerts.yml`
- `phase4-alerting/alertmanager/config.yml`

**Run it**:
```bash
cd phase4-alerting
docker-compose up -d
```

---

## Phase 5: Advanced Features 🚧

**Goal**: Learn advanced monitoring features

**What you'll learn**:
- Service discovery
- Recording rules
- Exporters (Node Exporter, etc.)
- Long-term storage
- Multi-service monitoring

**Key Concepts**:
- **Service Discovery** - Automatic target discovery
- **Recording Rules** - Pre-computed queries
- **Exporters** - Metrics from external systems
- **Federation** - Prometheus hierarchy
- **Long-term Storage** - Extended retention

**Files**:
- `phase5-advanced-features/`
- `phase5-advanced-features/node-exporter/`

**Run it**:
```bash
cd phase5-advanced-features
docker-compose up -d
```

---

## How to Use This Guide

1. **Read the phase description** - Understand what you'll learn
2. **Read the documentation** - Study the configuration files
3. **Run the phase** - Execute docker-compose and see it in action
4. **Experiment** - Modify configurations and try variations
5. **Move to next phase** - Once comfortable, proceed

## Tips for Learning

- **Don't rush**: Take time to understand each concept
- **Experiment**: Try changing configurations and see what happens
- **Read errors**: Error messages often teach you a lot
- **Check documentation**: Prometheus and Grafana docs are excellent
- **Build incrementally**: Each phase adds new complexity gradually

## Progress Tracking

- [ ] Phase 1: Setup & Basics
- [ ] Phase 2: Application Metrics
- [ ] Phase 3: Grafana Dashboards
- [ ] Phase 4: Alerting
- [ ] Phase 5: Advanced Features

