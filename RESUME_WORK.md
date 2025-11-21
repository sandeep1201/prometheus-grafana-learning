# Resume Work - Prompt for New Cursor Session

Use this prompt when continuing work on this project in a new Cursor session.

## 📋 Quick Resume Prompt

Copy and paste this into a new Cursor chat:

```
I'm working on a progressive Prometheus & Grafana learning project. The repo is at https://github.com/sandeep1201/prometheus-grafana-learning.

**Current Status:**
- ✅ Phase 1: Setup & Basics (Prometheus + Grafana setup)
- ✅ Phase 2: Application Metrics (Node.js app with Prometheus metrics, custom counters/gauges/histograms)
- ✅ Phase 3: Grafana Dashboards (comprehensive dashboard with p50/p95/p99 percentiles, variables, different panel types)
- ✅ Phase 4: Alerting (Prometheus Alertmanager, alert rules, notification channels, alert routing)
- 🎯 **Next: Phase 5: Advanced Features** (Service discovery, recording rules, exporters)

**Project Structure:**
- `phase1-setup-basics/` - Basic Prometheus + Grafana setup
- `phase2-application-metrics/` - Node.js app with metrics instrumentation
- `phase3-grafana-dashboards/` - Complete Grafana dashboard with percentiles visualization

**Current Setup:**
- Docker Compose setup (app + Prometheus + Grafana)
- App runs on port 4000, Prometheus on 9090, Grafana on 3001
- Dashboard UID for Prometheus datasource: Check via Grafana API or Configuration UI (might be different on new setup)
- Metrics include: http_requests_total, http_request_duration_seconds, active_connections, items_in_cart

**What I want to do next:**
Continue with Phase 5: Advanced Features. Help me set up service discovery, recording rules, exporters (Node Exporter), and explore long-term storage options.

Please help me proceed with Phase 5.
```

## 📝 Short Version

```
I'm continuing a Prometheus & Grafana learning project. Repo: https://github.com/sandeep1201/prometheus-grafana-learning

**Completed:** Phases 1-4 (Setup, Application Metrics, Grafana Dashboards, Alerting)
**Next:** Phase 5: Advanced Features (Service discovery, recording rules, exporters)

Help me set up Phase 5: Advanced Features.
```

## 🔍 Context Files to Review

1. **`PHASES.md`** - Complete project plan with all phases
2. **`README.md`** - Project overview and getting started
3. **`phase3-grafana-dashboards/README.md`** - Details about Phase 3 implementation
4. **`phase3-grafana-dashboards/PERCENTILES_GUIDE.md`** - Guide on p50, p95, p99 percentiles
5. **`phase2-application-metrics/README.md`** - Details about Phase 2 (metrics)

## 🎯 Key Information

### Docker Services
- **App**: `sample-app` on port 4000
- **Prometheus**: on port 9090
- **Grafana**: on port 3001 (admin/admin)

### Quick Start
```bash
cd phase3-grafana-dashboards  # or phase4-alerting when ready
docker compose up -d
```

### Metrics Available
- `http_requests_total` - Counter (total HTTP requests)
- `http_request_duration_seconds` - Histogram (request latency)
- `active_connections` - Gauge (current active connections)
- `items_in_cart` - Gauge (business metric by user_id)

### Dashboard Info
- **Dashboard Name**: "Application Metrics Dashboard"
- **Dashboard UID**: `app-metrics`
- **Panels**: Gauge, Stat, Time Series, Table, Heatmap
- **Variables**: HTTP Method, Route, Status Code (all with "All" option)

## 📚 What's Been Completed

### Phase 1: Setup & Basics ✅
- Docker Compose setup
- Prometheus scraping configuration
- Grafana provisioning (datasources, dashboards)

### Phase 2: Application Metrics ✅
- Node.js Express app with prom-client
- Custom metrics (Counter, Gauge, Histogram)
- `/metrics` endpoint
- Postman collection for testing

### Phase 3: Grafana Dashboards ✅
- Comprehensive dashboard with 7 panels
- Multiple panel types (Gauge, Stat, Time Series, Table, Heatmap)
- Dashboard variables for filtering
- Percentile visualization (p50, p95, p99, avg)
- Percentiles guide and exercises
- Troubleshooting guide

### Phase 4: Alerting ✅
- Prometheus Alertmanager setup
- Alert rules (high latency, error rate, health, traffic)
- Alert routing and grouping
- Notification channel configuration
- Alert testing guide

## 🚀 Next Steps (Phase 5: Advanced Features)

1. Service discovery
2. Recording rules
3. Exporters (Node Exporter)
4. Long-term storage
5. Multi-service monitoring

## 🔗 Useful Links

- **Repository**: https://github.com/sandeep1201/prometheus-grafana-learning
- **Prometheus UI**: http://localhost:9090
- **Grafana UI**: http://localhost:3001
- **App**: http://localhost:4000

## 💡 Tips for Resuming

1. **Check current status**: Review `PHASES.md` to see what's done
2. **Start services**: `docker compose up -d` in the current phase directory
3. **Verify setup**: Check Prometheus targets and Grafana datasource
4. **Generate traffic**: Use Postman collection to generate metrics
5. **Check logs**: `docker compose logs <service>` if issues

---

**Last Updated**: Phase 4 completed (Alerting)


