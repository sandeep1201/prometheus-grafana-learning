# Phase 2: Application Metrics

Welcome to Phase 2! In this phase, you'll learn how to add custom metrics to a Node.js application and configure Prometheus to scrape them.

## 🎯 Learning Goals

- Instrument a Node.js application with Prometheus metrics
- Understand different metric types (Counter, Gauge, Histogram)
- Create custom business metrics
- Expose `/metrics` endpoint
- Configure Prometheus to scrape application metrics
- View application metrics in Prometheus and Grafana

## 🚀 Quick Start

1. **Start all services**
   ```bash
   docker compose up -d
   ```

2. **Access the services**
   - **Application**: http://localhost:4000
   - **Metrics Endpoint**: http://localhost:4000/metrics
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3001 (admin/admin)

3. **Generate some traffic**

   **Option 1: Use Postman Collection (Recommended)**
   - Import `postman_collection.json` into Postman
   - The collection is pre-configured with all endpoints and example payloads
   - Use Postman's Collection Runner to generate load automatically
   
   **Option 2: Use cURL commands**
   ```bash
   # Make some requests to generate metrics
   curl http://localhost:4000/
   curl http://localhost:4000/api/data
   curl -X POST http://localhost:4000/api/data -H "Content-Type: application/json" -d '{"name":"test"}'
   ```

4. **View metrics in Prometheus**
   - Go to http://localhost:9090
   - Click "Status" → "Targets"
   - You should see `sample-app` target is UP
   - Try querying: `http_requests_total`

## 📚 What You'll Learn

### 1. Metric Types in Prometheus

#### **Counter** - Monotonically Increasing Value
- Example: Total number of HTTP requests
- Use case: Counting events that only go up
- Can't decrease, only reset to zero

```javascript
const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
```

#### **Gauge** - Value That Goes Up and Down
- Example: Current CPU usage, active connections
- Use case: Values that can increase or decrease
- Can set, increment, decrement

```javascript
const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});
```

#### **Histogram** - Distribution of Measurements
- Example: Request latency, response sizes
- Use case: Measuring distributions over time
- Automatically creates buckets for percentiles

```javascript
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5] // Custom buckets
});
```

### 2. Labels and Filtering

Labels are key-value pairs that allow filtering and grouping:
- `method`: HTTP method (GET, POST, etc.)
- `route`: API endpoint
- `status_code`: HTTP status code
- `user_id`: User identifier (for business metrics)

**Query examples in PromQL:**
```promql
# All requests
http_requests_total

# Only GET requests
http_requests_total{method="GET"}

# Requests to specific route
http_requests_total{route="/api/data"}

# Successful requests
http_requests_total{status_code="200"}
```

### 3. The /metrics Endpoint

- Exposes metrics in Prometheus format
- Prometheus scrapes this endpoint periodically
- Format: `metric_name{label="value"} metric_value`

**Example output:**
```
http_requests_total{method="GET",route="/",status_code="200"} 42
http_request_duration_seconds_bucket{method="GET",route="/",le="0.1"} 35
active_connections 3
```

## 🛠️ Application Structure

```
app/
├── src/
│   └── index.js          # Express app with metrics
├── package.json          # Dependencies (express, prom-client)
└── Dockerfile            # Container configuration
```

## 📊 Available Metrics

### HTTP Metrics (Automatic)
- `http_requests_total` - Total HTTP requests by method, route, status
- `http_request_duration_seconds` - Request latency distribution

### Custom Metrics
- `active_connections` - Current number of active connections
- `items_in_cart` - Number of items in cart (by user_id)

## 📮 Postman Collection

A complete Postman collection is included: `postman_collection.json`

### How to Use:

1. **Import into Postman**
   - Open Postman
   - Click "Import"
   - Select `postman_collection.json`
   - The collection will be imported with all endpoints pre-configured

2. **Collection Structure**
   - **Basic Endpoints**: Home, Health Check, Metrics
   - **API Endpoints**: GET/POST data endpoints
   - **Custom Metrics**: Update cart for different users
   - **Generate Load**: Use for load testing

3. **Using Collection Runner** (Generate Load)
   - Click on the collection name
   - Click "Run"
   - Select requests to run
   - Set iterations (e.g., 10, 50, 100)
   - Set delay between requests (optional)
   - Click "Run" to execute
   - This will generate metrics automatically!

4. **Variable**
   - `baseUrl`: Defaults to `http://localhost:4000`
   - Change it if your app runs on a different port

### Quick Start with Postman:
1. Import `postman_collection.json`
2. Start services: `docker compose up -d`
3. Run "Health Check" to verify app is running
4. Run multiple requests from "Generate Load" folder
5. Check `/metrics` endpoint to see metrics
6. View in Prometheus: http://localhost:9090

## 📝 Exercises

### Exercise 1: Explore Metrics Endpoint
1. Go to http://localhost:4000/metrics
2. See the raw Prometheus metrics format
3. Identify different metric types (counter, gauge, histogram)

### Exercise 2: Generate Traffic and View Metrics
1. Make multiple requests to different endpoints:
   ```bash
   curl http://localhost:4000/
   curl http://localhost:4000/api/data
   curl http://localhost:4000/health
   ```
2. Go to Prometheus (http://localhost:9090)
3. Query: `http_requests_total` - See total requests
4. Query: `http_requests_total{method="GET"}` - Only GET requests
5. Query: `rate(http_requests_total[5m])` - Requests per second

### Exercise 3: View Request Duration
1. Query: `http_request_duration_seconds`
2. Query: `histogram_quantile(0.95, http_request_duration_seconds)` - 95th percentile
3. Query: `rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])` - Average duration

### Exercise 4: Custom Business Metric
1. Update cart metric:
   ```bash
   curl -X POST http://localhost:4000/api/cart/user123 \
     -H "Content-Type: application/json" \
     -d '{"items": 5}'
   ```
2. Query in Prometheus: `items_in_cart`
3. Query: `items_in_cart{user_id="user123"}`

### Exercise 5: Create a Grafana Dashboard
1. Go to Grafana (http://localhost:3001)
2. Create new dashboard
3. Add panel with query: `rate(http_requests_total[5m])`
4. Add panel with query: `http_request_duration_seconds`
5. Save your dashboard

## ✅ Success Criteria

By the end of Phase 2, you should:
- ✅ Application running with custom metrics
- ✅ `/metrics` endpoint exposing Prometheus format
- ✅ Prometheus scraping application successfully
- ✅ Different metric types understood and implemented
- ✅ Labels used for filtering and grouping
- ✅ Metrics visible in Prometheus UI
- ✅ Basic Grafana dashboard created

## 🔍 Troubleshooting

**Application not starting?**
- Check logs: `docker compose logs app`
- Verify Node.js version and dependencies

**Metrics not appearing in Prometheus?**
- Check Prometheus targets: http://localhost:9090/targets
- Verify app is accessible: `curl http://localhost:4000/metrics`
- Check Prometheus configuration: `prometheus/prometheus.yml`

**Can't see metrics in Grafana?**
- Verify Grafana is connected to Prometheus
- Check data source configuration
- Try querying: `up{job="sample-app"}` (should return 1)

## 🎯 Next Steps

Once comfortable with Phase 2:
- Move to **Phase 3: Grafana Dashboards**
- Learn to build comprehensive dashboards
- Create beautiful visualizations

## 📖 Resources

- [Prometheus Metric Types](https://prometheus.io/docs/concepts/metric_types/)
- [PromQL Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [prom-client Documentation](https://github.com/siimon/prom-client)

