# Troubleshooting Dashboard Not Showing Data

If you're not seeing data in the Grafana dashboard, follow these steps:

## 🔍 Step-by-Step Troubleshooting

### 1. Verify Services Are Running
```bash
cd phase3-grafana-dashboards
docker compose ps
```

All three services should be UP:
- `sample-app` (port 4000)
- `prometheus` (port 9090)
- `grafana` (port 3001)

### 2. Check Application Metrics Endpoint
```bash
curl http://localhost:4000/metrics
```

You should see metrics like:
- `http_requests_total`
- `http_request_duration_seconds_bucket`
- `active_connections`
- `items_in_cart`

### 3. Verify Prometheus Can Scrape the App

Go to: **http://localhost:9090/targets**

You should see:
- `sample-app` target is **UP** (green)
- Last scrape was recent (< 30 seconds ago)

If it's DOWN:
- Check logs: `docker compose logs prometheus`
- Verify app is accessible: `curl http://localhost:4000/health`

### 4. Test Prometheus Has Data

In Prometheus UI (http://localhost:9090), try these queries:

```promql
# Should return data
http_requests_total

# Should return request rate
rate(http_requests_total[5m])
```

If queries return "No data points", continue to step 5.

### 5. Generate Traffic

Generate some HTTP requests to create metrics:

```bash
# Using curl
for i in {1..20}; do
  curl http://localhost:4000/
  curl http://localhost:4000/api/data
  curl -X POST http://localhost:4000/api/data \
    -H "Content-Type: application/json" \
    -d '{"name":"test"}'
  sleep 1
done
```

Or use the Postman collection:
- Import `postman_collection.json` into Postman
- Run requests multiple times

### 6. Check Grafana Dashboard Time Range

**This is often the issue!**

1. Open Grafana dashboard: http://localhost:3001
2. Click the time picker (top right)
3. Set to: **"Last 15 minutes"** or **"Last 5 minutes"**
4. Click "Apply"

The default might be showing a time range with no data.

### 7. Verify Grafana Data Source

1. Go to: **Configuration → Data Sources** (gear icon)
2. Click **Prometheus**
3. Click **"Test"** button
4. Should show: "Data source is working"

If it fails:
- Check URL: Should be `http://prometheus:9090`
- Check network connectivity between Grafana and Prometheus

### 8. Check Dashboard Queries

The dashboard queries should match your metrics. Verify:

1. Open dashboard
2. Click on a panel → **Edit**
3. Check the query:
   - Should be: `rate(http_requests_total[$__rate_interval])`
   - Not something like: `rate(http_requests_total[5m])` (might be too strict)

4. Check **Legend** format matches your labels:
   - `{{method}} {{route}}` is correct

### 9. Check Prometheus Labels

Your metrics have these labels:
- `job="sample-app"`
- `instance="sample-application"`
- `app="sample-app"`
- `phase="phase3"`

Queries in Grafana should work with or without these labels.

### 10. Refresh Dashboard

1. Click the **refresh** button (top right) or press `Ctrl+R` / `Cmd+R`
2. Dashboard should auto-refresh every 10 seconds (configured)

## 🎯 Quick Fix Checklist

✅ **All services running?**
```bash
docker compose ps
```

✅ **App exposing metrics?**
```bash
curl http://localhost:4000/metrics | grep http_requests_total
```

✅ **Prometheus scraping?**
- Visit: http://localhost:9090/targets
- Should see `sample-app` as UP

✅ **Prometheus has data?**
- Visit: http://localhost:9090
- Query: `http_requests_total`

✅ **Grafana time range correct?**
- Set to "Last 15 minutes"

✅ **Grafana connected to Prometheus?**
- Configuration → Data Sources → Test

✅ **Generate recent traffic?**
- Make some HTTP requests to the app

## 🐛 Common Issues

### Issue: "No data" in all panels
**Solution:**
- Check time range (most common!)
- Generate traffic
- Verify Prometheus has data

### Issue: Only some panels show data
**Solution:**
- Check individual panel queries
- Verify metric names match (check `/metrics` endpoint)
- Check if metric type is correct (counter vs gauge vs histogram)

### Issue: Prometheus target is DOWN
**Solution:**
- Check app is running: `curl http://localhost:4000/health`
- Check Docker network: Services must be on same network
- Check Prometheus config: `prometheus/prometheus.yml`

### Issue: Dashboard loads but shows "No data points found"
**Solution:**
- Time range issue - adjust to "Last 15 minutes"
- No traffic - generate some requests
- Query issue - check panel queries match metric names

## 🔧 Still Not Working?

1. **Check logs:**
   ```bash
   docker compose logs app
   docker compose logs prometheus
   docker compose logs grafana
   ```

2. **Restart services:**
   ```bash
   docker compose restart
   ```

3. **Verify dashboard JSON:**
   - Dashboard file: `grafana/dashboards/application-metrics.json`
   - Check queries are correct

4. **Test direct PromQL in Grafana:**
   - Go to Explore (compass icon)
   - Query: `rate(http_requests_total[5m])`
   - If this works, the dashboard queries should work too

## ✅ Success Indicators

You should see:
- ✅ Request rate graph showing lines
- ✅ Active connections stat showing a number
- ✅ Request duration graph with percentiles
- ✅ Tables showing status codes and metrics
- ✅ Heatmap showing latency distribution

---

**Still having issues?** Check the logs and verify each step above!


