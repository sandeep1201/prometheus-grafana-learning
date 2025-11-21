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
docker compose up -d
```

---

## Phase 2: Application Metrics ✅

**Goal**: Add custom metrics to an application

**What you'll learn**:
- Instrumenting Node.js applications with prom-client
- Custom metric types (Counter, Gauge, Histogram)
- Exposing /metrics endpoint
- Configuring Prometheus scraping
- Labeling and metadata

**Key Concepts**:
- **prom-client** - Prometheus client library for Node.js
- **Counter** - Monotonically increasing metric (total requests)
- **Gauge** - Value that goes up and down (active connections)
- **Histogram** - Distribution of measurements (request latency)
- **Labels** - Key-value pairs for filtering (method, route, status_code)
- **Registry** - Collection of metrics
- **/metrics endpoint** - Exposes metrics in Prometheus format

**Files**:
- `phase2-application-metrics/app/src/index.js` - Express app with metrics
- `phase2-application-metrics/prometheus/prometheus.yml` - Scrape configuration

**Run it**:
```bash
cd phase2-application-metrics
docker compose up -d
```

---

## Phase 3: Grafana Dashboards ✅

**Goal**: Build comprehensive dashboards in Grafana

**What you'll learn**:
- Creating dashboards in Grafana
- Panel types (Time Series, Stat, Table, Gauge, Heatmap)
- Writing PromQL queries
- Dashboard variables and templating
- Best practices for dashboards

**Key Concepts**:
- **Dashboards** - Collections of panels
- **Panels** - Individual visualizations (graphs, gauges, tables, heatmaps)
- **Variables** - Dynamic dashboard filtering (method, route, status_code)
- **PromQL** - Querying metrics (rate, histogram_quantile, label_values)
- **Visualization** - Choosing the right panel type for the metric

**Files**:
- `phase3-grafana-dashboards/grafana/dashboards/application-metrics.json` - Pre-built dashboard
- `phase3-grafana-dashboards/grafana/provisioning/` - Auto-provisioning config

**Pre-built Dashboard Includes**:
- Gauge panel (Request Rate)
- Stat panel (Active Connections)
- Time series graphs (Request Rate, Latency)
- Table panels (Status Codes, Business Metrics)
- Heatmap (Request Duration Distribution)
- Dashboard variables (Method, Route, Status Code)

**Run it**:
```bash
cd phase3-grafana-dashboards
docker compose up -d
```

---

## Phase 4: Alerting ✅

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
- `phase4-alerting/prometheus/alerts.yml` - Alert rule definitions
- `phase4-alerting/alertmanager/config.yml` - Alertmanager routing configuration
- `phase4-alerting/README.md` - Comprehensive guide
- `phase4-alerting/ALERT_TESTING_GUIDE.md` - Testing guide

**Alert Rules Included**:
- High Latency (p95, p99, average)
- High Error Rate (5xx, 4xx)
- Application Health (down, no traffic, high connections)
- Request Rate (sudden drops, spikes)

**Run it**:
```bash
cd phase4-alerting
docker compose up -d
```

**Access Points**:
- Prometheus: http://localhost:9090/alerts
- Alertmanager: http://localhost:9093
- Grafana: http://localhost:3001

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
docker compose up -d
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

- [x] Phase 1: Setup & Basics
- [x] Phase 2: Application Metrics
- [x] Phase 3: Grafana Dashboards
- [x] Phase 4: Alerting
- [ ] Phase 5: Advanced Features


