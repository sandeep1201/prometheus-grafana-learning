# Understanding Percentiles: p50, p95, p99

A comprehensive guide to understanding latency percentiles in monitoring and Prometheus.

## 📊 What Are Percentiles?

**Percentiles** tell you the value below which a certain percentage of observations fall.

### Simple Explanation:

Imagine you have 100 requests with different latencies:
- **p50 (median)**: 50% of requests are faster than this value, 50% are slower
- **p95**: 95% of requests are faster than this value, only 5% are slower
- **p99**: 99% of requests are faster than this value, only 1% are slower

### Example:

If your **p95 latency is 200ms**, it means:
- 95% of requests completed in ≤ 200ms
- Only 5% of requests took longer than 200ms

## 🎯 Why Percentiles Matter

### Average vs Percentiles

**Average (Mean)** can be misleading:
```
Requests: [10ms, 15ms, 12ms, 20ms, 5000ms]
Average: (10 + 15 + 12 + 20 + 5000) / 5 = 1011ms
```
- One slow request skews the average
- Doesn't tell you about distribution

**Percentiles** show the real picture:
```
p50: 15ms  (half of requests are ≤ 15ms)
p95: 5000ms (95% are ≤ 5000ms, 5% are this slow)
```
- Shows actual user experience
- Reveals outliers (slow requests)

### Real-World Example

**E-commerce Site:**
- **Average response time**: 500ms (looks good!)
- **p95 response time**: 5000ms (uh oh!)
- **Reality**: 95% of users get fast responses, but 5% experience very slow pages
- **p95** shows the worst experience for most users

## 📈 Percentiles in Prometheus

### Histograms

Prometheus uses **histograms** to track distributions:

```javascript
// In your app (index.js)
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // Custom buckets
});
```

### How Histograms Work

Prometheus automatically creates multiple time series:

**Raw buckets:**
```
http_request_duration_seconds_bucket{le="0.1"} 120
http_request_duration_seconds_bucket{le="0.3"} 250
http_request_duration_seconds_bucket{le="0.5"} 380
http_request_duration_seconds_bucket{le="1"}   450
http_request_duration_seconds_bucket{le="+Inf"} 500
```

**What this means:**
- `le="0.1"` means "less than or equal to 0.1 seconds"
- 120 requests took ≤ 0.1 seconds
- 250 requests took ≤ 0.3 seconds
- 130 requests took between 0.1 and 0.3 seconds (250 - 120)
- 500 total requests

### Calculating Percentiles with PromQL

#### p50 (50th percentile - Median)
```promql
histogram_quantile(0.50, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, method, route)
)
```

#### p95 (95th percentile)
```promql
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, method, route)
)
```

#### p99 (99th percentile)
```promql
histogram_quantile(0.99, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, method, route)
)
```

### How `histogram_quantile` Works

1. **Takes the quantile** (0.50, 0.95, 0.99)
2. **Groups by `le` (less than or equal)** - the bucket boundaries
3. **Calculates rate** over time window
4. **Interpolates** between buckets to find the percentile

## 📊 Visualizing Percentiles

### In Your Dashboard

The "Request Duration (Latency)" panel shows:
- **p50** (green line) - Median latency
- **p95** (yellow line) - 95th percentile
- **p99** (red line) - 99th percentile  
- **avg** (blue line) - Average latency

### What to Look For

**Healthy System:**
```
p50: 100ms
p95: 200ms
p99: 500ms
avg: 120ms
```
- Percentiles are close to average
- Small gap between p50 and p99
- Most users have consistent experience

**Problem System:**
```
p50: 100ms
p95: 3000ms
p99: 8000ms
avg: 500ms
```
- Large gap between p50 and p95/p99
- Average is misleading (looks OK)
- Small percentage of requests are very slow
- **Action needed**: Investigate what's causing slow requests

## 🎯 Common Percentiles Explained

### p50 (Median)
- **50% of requests are faster**
- Most common value
- Less affected by outliers
- **Use for**: Typical user experience

### p95
- **95% of requests are faster**
- Only 5% are slower
- Industry standard for SLOs (Service Level Objectives)
- **Use for**: Setting performance targets
- **Example**: "95% of requests must complete in < 200ms"

### p99
- **99% of requests are faster**
- Only 1% are slower
- Catches edge cases and outliers
- **Use for**: Identifying worst-case scenarios
- **Example**: "99% of requests must complete in < 1000ms"

### p99.9 (99.9th percentile)
- **99.9% of requests are faster**
- Only 0.1% are slower
- Catches very rare edge cases
- **Use for**: Extreme outlier detection

## 💡 Practical Examples

### Example 1: API Response Times

```promql
# p50 - Most users experience this
histogram_quantile(0.50, 
  sum(rate(http_request_duration_seconds_bucket{route="/api/data"}[5m])) by (le)
)
# Result: 0.15 seconds (150ms)

# p95 - 95% of users experience this or better
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket{route="/api/data"}[5m])) by (le)
)
# Result: 0.45 seconds (450ms)

# p99 - Worst case for 99% of users
histogram_quantile(0.99, 
  sum(rate(http_request_duration_seconds_bucket{route="/api/data"}[5m])) by (le)
)
# Result: 1.2 seconds (1200ms)
```

**Interpretation:**
- Most users (50%) get responses in 150ms
- 95% get responses in 450ms or less
- Only 1% experience > 1200ms

### Example 2: Database Query Times

```promql
# p95 database query time
histogram_quantile(0.95,
  sum(rate(db_query_duration_seconds_bucket[5m])) by (le, query_type)
)
```

### Example 3: Page Load Times

```promql
# p95 page load time
histogram_quantile(0.95,
  sum(rate(page_load_duration_seconds_bucket[5m])) by (le, page_type)
)
```

## 🔍 Understanding the Difference

### Scenario: E-commerce Checkout

**Request latencies:**
- 100 requests: 50ms each
- 10 requests: 200ms each
- 1 request: 5000ms (timeout)

**Metrics:**
```
Total: 111 requests
Average: (100×50 + 10×200 + 5000) / 111 = 156ms
p50: 50ms (most requests are fast)
p95: 200ms (95% are ≤ 200ms)
p99: 5000ms (that one timeout)
```

**Takeaway:**
- **Average** (156ms) looks acceptable
- **p95** (200ms) is good
- **p99** (5000ms) reveals a serious problem
- **Action**: Fix that timeout issue!

## 📊 Percentiles in Your Dashboard

### Current Implementation

In `application-metrics.json`, you have:

```json
{
  "expr": "histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket{job=\"sample-app\",method=~\"$method\"}[5m])) by (le, method, route))",
  "legendFormat": "p50 - {{method}} {{route}}"
},
{
  "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job=\"sample-app\",method=~\"$method\"}[5m])) by (le, method, route))",
  "legendFormat": "p95 - {{method}} {{route}}"
},
{
  "expr": "histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket{job=\"sample-app\",method=~\"$method\"}[5m])) by (le, method, route))",
  "legendFormat": "p99 - {{method}} {{route}}"
}
```

### What to Monitor

1. **p50** - Should be low (fast typical response)
2. **p95** - Your SLO target (e.g., < 200ms)
3. **p99** - Worst acceptable case (e.g., < 1000ms)
4. **Gap between p50 and p99** - Smaller is better

## 🎯 Best Practices

### Setting SLOs (Service Level Objectives)

**Example SLO:**
- "95% of API requests must complete in < 200ms"
- Monitor: `histogram_quantile(0.95, ...) < 0.2`

### Alerting

**Alert when p95 exceeds threshold:**
```promql
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
) > 0.5  # 500ms
```

### Bucket Selection

**Good buckets** for web APIs (seconds):
```javascript
[0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
```

**Your current buckets:**
```javascript
[0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
```

**Why it matters:**
- More buckets = More accurate percentiles
- But more buckets = More storage
- Balance between accuracy and efficiency

## 🔬 Hands-On Exercise

### Test Percentiles in Prometheus

1. **Generate different request latencies:**
   ```bash
   # Fast requests
   for i in {1..100}; do curl http://localhost:4000/; done
   
   # Some slow requests
   for i in {1..10}; do curl http://localhost:4000/api/data; done
   ```

2. **Query in Prometheus** (http://localhost:9090):
   ```promql
   # p50
   histogram_quantile(0.50, 
     sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
   )
   
   # p95
   histogram_quantile(0.95, 
     sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
   )
   
   # p99
   histogram_quantile(0.99, 
     sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
   )
   ```

3. **Compare with average:**
   ```promql
   rate(http_request_duration_seconds_sum[5m]) / 
   rate(http_request_duration_seconds_count[5m])
   ```

4. **Visualize in Grafana:**
   - Go to your dashboard
   - Watch p50, p95, p99, and avg lines
   - See how they differ

## 📚 Key Takeaways

1. **Percentiles > Average** for understanding user experience
2. **p95** is the industry standard for SLOs
3. **Large gaps** between percentiles indicate problems
4. **Histograms** make percentile calculation possible
5. **Monitor multiple percentiles** to see the full picture

## 🔗 Further Reading

- [Prometheus Histograms](https://prometheus.io/docs/practices/histograms/)
- [Understanding Latency Percentiles](https://www.brendangregg.com/blog/2015-03-17/understanding-latency-percentiles.html)
- [SLOs and Percentiles](https://sre.google/workbook/slo-document/)

---

**Remember:** Percentiles tell you what your users actually experience, not just averages!

