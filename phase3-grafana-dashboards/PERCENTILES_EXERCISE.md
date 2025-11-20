# Hands-On Exercise: Exploring Percentiles

Practice exercises to understand p50, p95, p99 with your actual dashboard.

## 🎯 Exercise 1: Understand the Difference

### Step 1: Generate Mixed Traffic

Run these commands to generate requests with different latencies:

```bash
# Fast requests (home page - typically fast)
for i in {1..50}; do curl -s http://localhost:4000/ > /dev/null; done

# Medium requests (API data - has some processing delay)
for i in {1..30}; do curl -s http://localhost:4000/api/data > /dev/null; done

# Slow requests (POST with processing)
for i in {1..20}; do curl -s -X POST http://localhost:4000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}' > /dev/null; done
```

### Step 2: Observe in Prometheus

1. Go to http://localhost:9090
2. Try these queries:

**Average latency:**
```promql
rate(http_request_duration_seconds_sum{job="sample-app"}[5m]) / 
rate(http_request_duration_seconds_count{job="sample-app"}[5m])
```

**p50 (median):**
```promql
histogram_quantile(0.50, 
  sum(rate(http_request_duration_seconds_bucket{job="sample-app"}[5m])) by (le)
)
```

**p95:**
```promql
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{job="sample-app"}[5m])) by (le)
)
```

**p99:**
```promql
histogram_quantile(0.99, 
  sum(rate(http_request_duration_seconds_bucket{job="sample-app"}[5m])) by (le)
)
```

### Step 3: Compare the Values

**Question:** What's the difference between:
- Average vs p50?
- p50 vs p95?
- p95 vs p99?

**What to observe:**
- Is the average close to p50? (should be)
- Is there a big gap between p50 and p95? (small gaps are better)
- Is p99 much higher? (might indicate outliers)

## 🎯 Exercise 2: Route-Specific Percentiles

### Step 1: Generate Traffic to Specific Routes

```bash
# Only home route
for i in {1..100}; do curl -s http://localhost:4000/ > /dev/null; done

# Wait 10 seconds, then do API route
sleep 10
for i in {1..100}; do curl -s http://localhost:4000/api/data > /dev/null; done
```

### Step 2: Compare Routes

In Prometheus, query:

```promql
# p95 for all routes
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{job="sample-app"}[5m])) by (le, route)
)
```

**Question:** Which route has higher p95? Why?

**Expected:**
- `/` route should be faster (simple response)
- `/api/data` might be slower (has processing delay)

### Step 3: Filter by Route in Grafana

1. Go to your dashboard
2. Use the "Route" variable filter
3. Select different routes
4. Compare p50, p95, p99 for each route

## 🎯 Exercise 3: Spot the Outlier

### Step 1: Generate an Outlier

```bash
# Normal traffic
for i in {1..100}; do curl -s http://localhost:4000/ > /dev/null; done

# One very slow request (by adding delay in your app code)
# Or just generate a burst of slow requests
for i in {1..5}; do 
  curl -s http://localhost:4000/api/data > /dev/null
  sleep 0.5  # Simulate slow requests
done
```

### Step 2: Observe the Impact

**Query in Prometheus:**

```promql
# See the full distribution
rate(http_request_duration_seconds_bucket{job="sample-app"}[5m])
```

**Question:**
- Does p50 change much? (probably not)
- Does p95 change? (maybe a little)
- Does p99 change? (probably yes!)
- Does the average change? (probably yes)

**Key insight:** Outliers affect averages and p99 more than p50 and p95.

## 🎯 Exercise 4: Create Your Own Percentile Query

### Task: Add p99.9 to Your Dashboard

1. **Open Grafana Dashboard**
   - Go to "Application Metrics Dashboard"
   - Click "Edit" (pencil icon)

2. **Add a new query to "Request Duration (Latency)" panel:**
   - Click on the panel
   - Click "Edit"
   - In the query section, click "+ Query"
   - Enter:

```promql
histogram_quantile(0.999, 
  sum(rate(http_request_duration_seconds_bucket{job="sample-app",method=~"$method"}[5m])) by (le, method, route)
)
```

3. **Set the legend format:**
   - Legend: `p99.9 - {{method}} {{route}}`

4. **Choose a color** (e.g., dark red for p99.9)

5. **Save the panel**

6. **Observe:**
   - How does p99.9 compare to p95 and p99?
   - Is the gap large or small?

## 🎯 Exercise 5: Set Up an Alert

### Task: Alert When p95 Exceeds Threshold

1. **In Grafana, go to Alerting**
   - Click "Alerting" → "Alert rules"

2. **Create a new rule:**
   - Name: "High p95 Latency"
   - Condition: `histogram_quantile(0.95, ...) > 0.5` (500ms)
   - Evaluate every: 1 minute
   - For: 5 minutes

3. **Test it:**
   - Generate some slow requests
   - See if the alert triggers

## 🎯 Exercise 6: Compare Percentiles by Method

### Task: Understand GET vs POST Latency

1. **In Prometheus, query:**

```promql
# p95 by HTTP method
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{job="sample-app"}[5m])) by (le, method)
)
```

2. **Generate different types of requests:**

```bash
# GET requests (should be fast)
for i in {1..50}; do curl -s http://localhost:4000/api/data > /dev/null; done

# POST requests (might be slower)
for i in {1..50}; do curl -s -X POST http://localhost:4000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}' > /dev/null; done
```

3. **Compare in Grafana:**
   - Use "HTTP Method" variable filter
   - Select "GET" vs "POST"
   - Compare their p50, p95, p99

**Question:** Why might POST be slower than GET?

## 📊 Quick Reference: PromQL Queries

### Basic Percentiles

```promql
# p50
histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# p75
histogram_quantile(0.75, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# p95
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# p99
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# p99.9
histogram_quantile(0.999, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

### Filtered by Label

```promql
# p95 for specific route
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{route="/api/data"}[5m])) by (le)
)

# p95 by method
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, method)
)

# p95 by route and method
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route, method)
)
```

### Average (for comparison)

```promql
rate(http_request_duration_seconds_sum[5m]) / 
rate(http_request_duration_seconds_count[5m])
```

## 🎯 Challenge: Custom Percentile Dashboard

### Create a new panel showing:

1. **p50, p75, p95, p99, p99.9** all on one graph
2. **Color code them:**
   - p50: Green (good)
   - p75: Yellow (acceptable)
   - p95: Orange (warning)
   - p99: Red (problem)
   - p99.9: Dark red (critical)

3. **Add thresholds:**
   - Green: < 100ms
   - Yellow: 100-200ms
   - Orange: 200-500ms
   - Red: > 500ms

4. **Observe:**
   - When does each percentile cross thresholds?
   - What does this tell you about your system?

## 📚 Answers to Common Questions

### Q: Why is p95 higher than p50?
**A:** Because p95 includes the slowest 5% of requests. If p50 is 100ms and p95 is 500ms, it means half of requests are fast (≤100ms) but 5% are much slower (up to 500ms).

### Q: Should p95 always be close to p50?
**A:** Ideally yes! Large gaps indicate inconsistent performance. Small gaps mean consistent, predictable latency.

### Q: What's a good p95 target for web APIs?
**A:** Depends on your use case:
- **Critical APIs**: < 100ms
- **Standard APIs**: < 200-300ms
- **Batch operations**: < 1-2 seconds

### Q: Why use histogram_quantile instead of direct calculation?
**A:** Prometheus stores data in buckets, not individual values. `histogram_quantile` interpolates between buckets to estimate the percentile value.

---

**Ready to explore?** Start with Exercise 1 and work your way through. Each exercise builds on the previous one!

