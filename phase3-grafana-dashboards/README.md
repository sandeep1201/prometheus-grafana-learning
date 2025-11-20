# Phase 3: Grafana Dashboards

Welcome to Phase 3! In this phase, you'll learn how to create comprehensive Grafana dashboards with different visualization types and best practices.

## 🎯 Learning Goals

- Create professional Grafana dashboards
- Understand different panel types (graphs, gauges, tables, heatmaps, stat panels)
- Write PromQL queries for visualization
- Use dashboard variables for filtering and templating
- Organize dashboards effectively
- Apply dashboard best practices

## 🚀 Quick Start

1. **Start all services**
   ```bash
   docker compose up -d
   ```

2. **Access the services**
   - **Application**: http://localhost:4000
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3001 (admin/admin)

3. **View the pre-built dashboard**
   - Go to http://localhost:3001
   - Login with admin/admin
   - Click "Dashboards" → "Browse"
   - Open "Application Metrics Dashboard"

4. **Generate some traffic**
   - Use Postman collection: `postman_collection.json`
   - Or use curl to make requests
   - Watch metrics appear in real-time on the dashboard

## 📊 Dashboard Overview

The **Application Metrics Dashboard** includes:

### Panel Types Showcased:

1. **Gauge Panel** - Request Rate (req/sec)
   - Visual gauge showing current request rate
   - Color thresholds (green/yellow/red)

2. **Stat Panel** - Active Connections
   - Current number of active connections
   - Large number display with color coding

3. **Time Series Graph** - Request Rate by Method
   - Line graph showing request rate over time
   - Stacked by HTTP method (GET, POST, etc.)
   - Uses dashboard variables for filtering

4. **Time Series Graph** - Request Duration (Latency)
   - Shows p50, p95, p99 percentiles
   - Average latency line
   - Stacked area chart

5. **Table Panel** - Total Requests by Status Code
   - Summary table of requests grouped by status code
   - Instant query (current values)

6. **Heatmap Panel** - Request Duration Distribution
   - Heatmap showing latency distribution over time
   - X-axis: Time
   - Y-axis: Latency buckets
   - Color intensity: Request count

7. **Table Panel** - Business Metrics (Items in Cart)
   - Custom business metric table
   - Shows items in cart by user_id

### Dashboard Variables

Three variables are configured for interactive filtering:

1. **HTTP Method** - Filter by GET, POST, etc.
   - Query: `label_values(http_requests_total, method)`
   - Multi-select enabled

2. **Route** - Filter by API route
   - Query: `label_values(http_requests_total, route)`
   - Multi-select enabled

3. **Status Code** - Filter by HTTP status
   - Query: `label_values(http_requests_total, status_code)`
   - Multi-select enabled

## 📚 What You'll Learn

### 1. Panel Types in Grafana

#### **Time Series** - Line/Area Graphs
- Best for: Trends over time, multiple metrics comparison
- Example: Request rate over time, latency percentiles
- Options: Line/area/bar, stacking, fill opacity

#### **Stat Panel** - Large Number Display
- Best for: Single important metric (current value)
- Example: Active connections, total requests
- Options: Value mode, graph mode, orientation

#### **Gauge** - Circular/Semi-circular Gauge
- Best for: Metrics with thresholds (health status)
- Example: Request rate, CPU usage
- Options: Min/max values, thresholds, orientation

#### **Table** - Tabular Data
- Best for: Detailed breakdowns, instant queries
- Example: Requests by status code, top endpoints
- Options: Column alignment, cell formatting, sorting

#### **Heatmap** - 2D Color Intensity Map
- Best for: Distribution over time (histograms)
- Example: Request duration distribution, error rates by time
- Options: Bucket configuration, color schemes

#### **Bar Gauge** - Horizontal/Vertical Bars
- Best for: Comparing multiple values
- Example: Request count by endpoint

### 2. PromQL Queries Used

#### **Request Rate**
```promql
rate(http_requests_total[$__rate_interval])
```
- Calculates requests per second
- `$__rate_interval` is a Grafana variable (auto-adjusted)

#### **Request Rate by Method**
```promql
rate(http_requests_total{method=~"$method"}[5m])
```
- Filters by method variable
- `=~` is regex match for multi-select

#### **Percentiles (p50, p95, p99)**
```promql
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, method, route))
```
- Calculates 95th percentile latency
- Uses histogram buckets with `histogram_quantile`

#### **Average Duration**
```promql
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```
- Calculates average latency
- Sum of durations divided by count

#### **Instant Query (Current Values)**
```promql
http_requests_total{status_code=~"$status_code"}
```
- Gets current (instant) values
- Used in table panels

### 3. Dashboard Variables

Variables allow dynamic filtering without editing queries:

**Variable Types:**
- **Query**: Values from Prometheus query (most common)
  - Example: `label_values(http_requests_total, method)`
- **Custom**: Manually defined values
- **Text**: Free-form text input
- **Interval**: Time range intervals

**Variable Options:**
- **Multi-select**: Allow selecting multiple values
- **Include All**: Add "All" option to select everything
- **Regex**: Filter variable values with regex

**Using Variables in Queries:**
- `$variable` - Single select
- `$variable=~"$variable"` - Multi-select with regex

### 4. Dashboard Best Practices

#### **Layout**
- ✅ Use grid layout (24 columns standard)
- ✅ Group related panels
- ✅ Use consistent panel sizes
- ✅ Leave whitespace for readability

#### **Naming**
- ✅ Clear, descriptive panel titles
- ✅ Use units in panel titles or axes
- ✅ Consistent naming conventions

#### **Visualization**
- ✅ Choose appropriate panel types
- ✅ Use colors meaningfully (thresholds, status)
- ✅ Avoid too many series on one graph (split if needed)
- ✅ Set appropriate time ranges and refresh intervals

#### **Performance**
- ✅ Use appropriate time ranges (don't query too far back)
- ✅ Set dashboard refresh interval (10s, 30s, 1m)
- ✅ Use recording rules for complex queries
- ✅ Limit instant queries (use time range queries when possible)

#### **Organization**
- ✅ Use folders to organize dashboards
- ✅ Add tags for categorization
- ✅ Add descriptions to dashboards and panels
- ✅ Use dashboard links for navigation

## 📝 Exercises

### Exercise 1: Explore the Dashboard
1. Open "Application Metrics Dashboard" in Grafana
2. Change dashboard variables (Method, Route, Status Code)
3. Observe how panels update in real-time
4. Hover over graphs to see tooltips
5. Click and drag to zoom into time ranges

### Exercise 2: Modify a Panel
1. Click on a panel title → "Edit"
2. Change the query to filter by a specific route
3. Modify visualization options (line width, colors)
4. Save the panel
5. Observe the changes

### Exercise 3: Create a New Panel
1. Click "Add panel" → "Add new panel"
2. Choose "Time series" panel type
3. Write a PromQL query:
   ```promql
   sum(rate(http_requests_total[5m])) by (status_code)
   ```
4. Set legend: `{{status_code}}`
5. Change visualization: "Bar chart"
6. Add panel title: "Requests by Status Code"
7. Save the dashboard

### Exercise 4: Create Dashboard Variable
1. Go to Dashboard Settings (gear icon)
2. Click "Variables" → "New variable"
3. Configure:
   - Name: `user_id`
   - Type: `Query`
   - Query: `label_values(items_in_cart, user_id)`
   - Multi-select: Enabled
   - Include All: Enabled
4. Save and use `$user_id` in a panel query:
   ```promql
   items_in_cart{user_id=~"$user_id"}
   ```

### Exercise 5: Create a Business Metrics Dashboard
1. Create a new dashboard
2. Add panels for:
   - Total items in all carts (sum)
   - Items in cart by user (table)
   - Cart value trends over time
3. Add variable for user_id filtering
4. Save as "Business Metrics Dashboard"

### Exercise 6: Dashboard Comparison
1. Create two versions of a panel:
   - One with 5-minute time range
   - One with 1-hour time range
2. Place them side by side
3. Observe how different time ranges show different patterns
4. Adjust refresh intervals (10s vs 1m)

## ✅ Success Criteria

By the end of Phase 3, you should:
- ✅ Dashboard loaded and displaying metrics correctly
- ✅ Understand different panel types and when to use them
- ✅ Know how to write PromQL queries for visualization
- ✅ Understand dashboard variables and templating
- ✅ Created at least one custom panel
- ✅ Applied dashboard best practices
- ✅ Dashboards organized and easy to navigate

## 🔍 Troubleshooting

**Dashboard not loading?**
- Check Grafana logs: `docker compose logs grafana`
- Verify Prometheus data source is configured
- Check dashboard JSON syntax

**No data in panels?**
- Verify app is running: `curl http://localhost:4000/health`
- Check Prometheus targets: http://localhost:9090/targets
- Generate traffic using Postman collection
- Verify time range is correct

**Variables not working?**
- Check variable query syntax in Prometheus UI
- Verify metric labels exist
- Use `label_values(metric_name, label_name)` format

**Performance issues?**
- Reduce time range (shorter periods)
- Increase refresh interval
- Simplify queries
- Use recording rules for complex calculations

## 🎯 Next Steps

Once comfortable with Phase 3:
- Move to **Phase 4: Alerting**
- Learn to set up alerts based on dashboard metrics
- Configure Alertmanager for notifications

## 📖 Resources

- [Grafana Dashboard Documentation](https://grafana.com/docs/grafana/latest/dashboards/)
- [PromQL Query Language](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Panel Types](https://grafana.com/docs/grafana/latest/panels/panel-overview/)
- [Dashboard Best Practices](https://grafana.com/docs/grafana/latest/best-practices/)

## 📂 Files Structure

```
phase3-grafana-dashboards/
├── app/                          # Sample application (from Phase 2)
│   ├── src/
│   │   └── index.js             # Express app with metrics
│   ├── package.json
│   └── Dockerfile
├── prometheus/
│   └── prometheus.yml           # Prometheus configuration
├── grafana/
│   ├── provisioning/
│   │   ├── datasources/
│   │   │   └── prometheus.yml   # Auto-configure Prometheus datasource
│   │   └── dashboards/
│   │       └── default.yml      # Auto-load dashboards
│   └── dashboards/
│       └── application-metrics.json  # Pre-built dashboard
├── docker-compose.yml           # All services
├── postman_collection.json      # API testing collection
└── README.md                    # This file
```

---

**Happy Dashboard Building! 📊**

