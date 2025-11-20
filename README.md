# Prometheus & Grafana Learning Journey 📊

A progressive learning project to master Prometheus and Grafana by building a complete monitoring solution, step by step.

## 📚 Learning Path

This project is structured as a series of phases, each building upon the previous one. Each phase introduces new concepts and features of Prometheus and Grafana.

### Phase 1: Setup & Basics ✅
- Set up Prometheus server
- Set up Grafana
- Configure Prometheus to scrape itself
- Create your first Grafana dashboard
- Understand PromQL basics

### Phase 2: Application Metrics ✅
- Instrument a Node.js application with metrics
- Add custom metrics (counters, gauges, histograms)
- Expose /metrics endpoint
- Configure Prometheus to scrape application
- View metrics in Prometheus

### Phase 3: Grafana Dashboards ✅
- Build comprehensive dashboards
- Create different panel types (Time Series, Stat, Gauge, Table, Heatmap)
- Use PromQL queries for visualization
- Add dashboard variables (Method, Route, Status Code)
- Dashboard best practices
- Pre-built dashboard with all panel types included

### Phase 4: Alerting 🚧
- Set up Prometheus Alertmanager
- Create alert rules
- Configure notification channels
- Test alerts
- Grafana alerting

### Phase 5: Advanced Features 🚧
- Service discovery
- Recording rules
- Exporters (Node Exporter)
- Long-term storage
- Multi-service monitoring

## 🛠️ Tech Stack

- **Prometheus** - Metrics collection and storage
- **Grafana** - Visualization and dashboards
- **Alertmanager** - Alert handling and routing
- **Node.js** - Sample application
- **Docker & Docker Compose** - Containerized deployment

## 📦 Prerequisites

- Docker and Docker Compose installed
- Basic understanding of command line
- Basic understanding of HTTP endpoints

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prometheus-grafana-learning
   ```

2. **Start Phase 1**
   ```bash
   cd phase1-setup-basics
   docker compose up -d
   ```

3. **Access the services**
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3001 (default: admin/admin)

## 📖 Phase Guide

Each phase has its own directory with:
- Configuration files
- Documentation
- Step-by-step instructions
- Example dashboards (where applicable)

See [PHASES.md](./PHASES.md) for detailed phase documentation.

## 🎯 Learning Goals

By the end of this journey, you'll know how to:
- ✅ Set up and configure Prometheus
- ✅ Create and manage Grafana dashboards
- ✅ Instrument applications with custom metrics
- ✅ Write PromQL queries
- ✅ Set up alerting and notifications
- ✅ Monitor multiple services
- ✅ Use best practices for observability

## 📚 Learning Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/)

## 🤝 Contributing

This is a learning project! Feel free to:
- Fork and experiment
- Add your own phases
- Share your learnings
- Suggest improvements

## 📄 License

MIT


