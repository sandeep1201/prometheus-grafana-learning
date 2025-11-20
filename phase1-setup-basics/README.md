# Phase 1: Setup & Basics

Welcome to Phase 1! In this phase, you'll set up Prometheus and Grafana and create your first dashboard.

## 🎯 Learning Goals

- Understand what Prometheus and Grafana are
- Set up Prometheus server
- Set up Grafana
- Configure Prometheus to scrape itself
- Create your first Grafana dashboard
- Learn basic PromQL concepts

## 🚀 Quick Start

1. **Start the services**
   ```bash
   docker compose up -d
   ```

2. **Access the services**
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3001 (using port 3001 to avoid conflicts)
     - Username: `admin`
     - Password: `admin`

3. **Verify Prometheus is working**
   - Go to http://localhost:9090
   - Click on "Status" → "Targets"
   - You should see `prometheus` target is UP

4. **Verify Grafana is working**
   - Go to http://localhost:3001
   - Login with admin/admin
   - Go to "Configuration" → "Data Sources"
   - You should see "Prometheus" data source is configured

## 📚 What You'll Learn

### 1. Prometheus Concepts

**Metrics**: Numerical measurements over time
- Example: `http_requests_total` - Total number of HTTP requests

**Time Series**: A series of data points over time
- Example: CPU usage at different times: `cpu_usage{instance="server1"} = [50, 52, 48, ...]`

**Scraping**: How Prometheus collects metrics
- Prometheus periodically fetches metrics from targets
- Default interval: 15 seconds

**PromQL**: Prometheus Query Language
- Query metrics: `http_requests_total`
- Filter: `http_requests_total{method="GET"}`
- Rate: `rate(http_requests_total[5m])`

### 2. Grafana Concepts

**Dashboards**: Collections of panels (visualizations)
**Panels**: Individual graphs, tables, gauges, etc.
**Data Sources**: Where Grafana gets data from (Prometheus, databases, etc.)
**Variables**: Dynamic filters for dashboards

## 🛠️ Configuration Files

### `prometheus/prometheus.yml`
- Main Prometheus configuration
- Defines scrape targets (who to collect metrics from)
- Global settings (scrape interval, etc.)

### `grafana/provisioning/datasources/prometheus.yml`
- Auto-provision Prometheus as a data source
- Grafana will automatically connect to Prometheus

### `grafana/provisioning/dashboards/default.yml`
- Auto-load dashboards from `/var/lib/grafana/dashboards`
- Any dashboard JSON files will be automatically available

## 📝 Exercises

### Exercise 1: Explore Prometheus
1. Go to http://localhost:9090
2. Click "Graph" tab
3. Type `up` in the query box and click "Execute"
4. See all targets and their status (1 = up, 0 = down)

### Exercise 2: Try PromQL Queries
Try these queries in Prometheus:
- `up` - Shows which targets are up
- `prometheus_http_requests_total` - HTTP requests to Prometheus
- `rate(prometheus_http_requests_total[5m])` - Rate of requests per second

### Exercise 3: Create Your First Dashboard
1. Go to Grafana (http://localhost:3001)
2. Click "+" → "Create" → "Dashboard"
3. Click "Add visualization"
4. Select "Prometheus" as data source
5. Enter query: `up`
6. Click "Apply"
7. Save your dashboard

## ✅ Success Criteria

By the end of Phase 1, you should:
- ✅ Prometheus and Grafana running successfully
- ✅ Prometheus scraping itself (visible in Targets)
- ✅ Grafana connected to Prometheus data source
- ✅ Created your first dashboard
- ✅ Understand basic Prometheus and Grafana concepts

## 🔍 Troubleshooting

**Prometheus not starting?**
- Check logs: `docker compose logs prometheus`
- Verify `prometheus.yml` syntax

**Grafana can't connect to Prometheus?**
- Check if Prometheus is running: `docker compose ps`
- Verify network: Both services should be on `monitoring` network

**Dashboards not showing?**
- Check Grafana logs: `docker compose logs grafana`
- Verify dashboard files are in `grafana/dashboards/`

**To stop services:**
```bash
docker compose down
```

**To view logs:**
```bash
docker compose logs -f
```

## 🎯 Next Steps

Once you're comfortable with Phase 1:
- Move to **Phase 2: Application Metrics**
- Learn to instrument a Node.js application
- Add custom metrics to your app

## 📖 Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [PromQL Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)


