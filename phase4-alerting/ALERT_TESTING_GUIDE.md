# Alert Testing Guide 🧪

A practical guide to testing your Prometheus alerts and understanding how they work.

## 🎯 Testing Strategy

Test each alert type to ensure:
1. ✅ Alerts fire when conditions are met
2. ✅ Alerts resolve when conditions improve
3. ✅ Alert routing works correctly
4. ✅ Notifications are sent (if configured)

## 📋 Prerequisites

1. **Start all services**:
   ```bash
   cd phase4-alerting
   docker compose up -d
   ```

2. **Verify services are running**:
   - App: http://localhost:4000
   - Prometheus: http://localhost:9090
   - Alertmanager: http://localhost:9093

3. **Open monitoring UIs**:
   - Prometheus Alerts: http://localhost:9090/alerts
   - Alertmanager: http://localhost:9093

## 🧪 Test Cases

### Test 1: High P95 Latency Alert

**Goal**: Trigger `HighP95Latency` alert by generating slow requests.

**Steps**:

1. **Generate traffic with delays**:
   ```bash
   # Create a script to make slow requests
   for i in {1..100}; do
     curl -s "http://localhost:4000/api/data" > /dev/null &
   done
   ```

2. **Monitor in Prometheus**:
   - Go to http://localhost:9090/alerts
   - Find "HighP95Latency"
   - Watch it go from "Inactive" → "Pending" → "Firing"

3. **Check Alertmanager**:
   - Go to http://localhost:9093
   - Alert should appear in "Alerts" tab

4. **Verify resolution**:
   - Stop generating traffic
   - Wait a few minutes
   - Alert should resolve automatically

**Expected Result**: Alert fires when p95 latency > 0.5s for 2 minutes.

---

### Test 2: High Error Rate Alert

**Goal**: Trigger `HighErrorRate` alert by generating 5xx errors.

**Steps**:

1. **Modify app temporarily** (or use a test endpoint):
   ```bash
   # If you have a test endpoint that returns 500 errors
   for i in {1..50}; do
     curl -s "http://localhost:4000/api/error" > /dev/null &
   done
   ```

2. **Or create a test script**:
   ```bash
   # Create test-error.sh
   #!/bin/bash
   for i in {1..100}; do
     curl -X POST "http://localhost:4000/api/invalid" \
       -H "Content-Type: application/json" \
       -d '{"invalid": "data"}' &
   done
   ```

3. **Monitor alerts**:
   - Check Prometheus → Alerts
   - Check Alertmanager → Alerts

**Expected Result**: Alert fires when 5xx error rate > 5% for 2 minutes.

---

### Test 3: Application Down Alert

**Goal**: Trigger `ApplicationDown` alert by stopping the application.

**Steps**:

1. **Stop the application**:
   ```bash
   docker compose stop app
   ```

2. **Wait 1 minute**, then check:
   - Prometheus → Alerts → "ApplicationDown" should be "Firing"
   - Alertmanager → Alerts → Alert should appear

3. **Restart the application**:
   ```bash
   docker compose start app
   ```

4. **Wait a few minutes**:
   - Alert should automatically resolve
   - Check Alertmanager → Resolved alerts

**Expected Result**: Alert fires when app is down for 1 minute, resolves when app comes back.

---

### Test 4: High Active Connections Alert

**Goal**: Trigger `HighActiveConnections` alert by generating many concurrent connections.

**Steps**:

1. **Generate many concurrent requests**:
   ```bash
   # Create many connections that stay open
   for i in {1..150}; do
     curl -s "http://localhost:4000/api/data" &
     sleep 0.1
   done
   ```

2. **Monitor**:
   - Check Prometheus → Alerts
   - Check the `active_connections` metric in Prometheus

**Expected Result**: Alert fires when active connections > 100 for 2 minutes.

---

### Test 5: No Requests Received Alert

**Goal**: Trigger `NoRequestsReceived` alert by stopping all traffic.

**Steps**:

1. **Stop all traffic** (if any is running)

2. **Wait 5 minutes**

3. **Check alerts**:
   - Prometheus → Alerts → "NoRequestsReceived" should fire

4. **Generate traffic again**:
   ```bash
   curl http://localhost:4000/
   ```

5. **Wait a few minutes**:
   - Alert should resolve

**Expected Result**: Alert fires when no requests for 5 minutes.

---

### Test 6: Alert Routing (Severity-based)

**Goal**: Verify alerts are routed correctly based on severity.

**Steps**:

1. **Trigger a critical alert** (e.g., HighP99Latency):
   ```bash
   # Generate very slow requests
   for i in {1..200}; do
     curl -s "http://localhost:4000/api/data" > /dev/null &
   done
   ```

2. **Trigger a warning alert** (e.g., HighP95Latency):
   ```bash
   # Generate moderately slow requests
   for i in {1..100}; do
     curl -s "http://localhost:4000/api/data" > /dev/null &
   done
   ```

3. **Check Alertmanager**:
   - Go to http://localhost:9093
   - Check "Groups" tab
   - Verify alerts are grouped by severity

**Expected Result**: Critical alerts go to `critical` receiver, warnings to `warning` receiver.

---

### Test 7: Alert Inhibition

**Goal**: Verify that when `ApplicationDown` fires, other alerts are inhibited.

**Steps**:

1. **Stop the application**:
   ```bash
   docker compose stop app
   ```

2. **Wait for ApplicationDown to fire** (1 minute)

3. **Check Alertmanager**:
   - Go to http://localhost:9093
   - Check "Status" tab → "Inhibition Rules"
   - Other alerts for the same instance should be suppressed

**Expected Result**: When ApplicationDown fires, other alerts for the same instance are inhibited.

---

### Test 8: Alert Grouping

**Goal**: Verify that similar alerts are grouped together.

**Steps**:

1. **Trigger multiple alerts of the same type**:
   ```bash
   # Generate traffic to multiple routes
   for i in {1..50}; do
     curl -s "http://localhost:4000/" > /dev/null &
     curl -s "http://localhost:4000/api/data" > /dev/null &
     curl -s "http://localhost:4000/health" > /dev/null &
   done
   ```

2. **Check Alertmanager**:
   - Go to http://localhost:9093
   - Check "Groups" tab
   - Similar alerts should be grouped together

**Expected Result**: Alerts with the same `alertname` are grouped to prevent spam.

---

## 🔍 Monitoring During Tests

### Prometheus Queries

**Check current latency**:
```promql
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)
```

**Check error rate**:
```promql
sum(rate(http_requests_total{status_code=~"5.."}[5m])) /
sum(rate(http_requests_total[5m]))
```

**Check active connections**:
```promql
active_connections
```

**Check request rate**:
```promql
sum(rate(http_requests_total[5m]))
```

### Alert States

- **Inactive**: Condition is not met
- **Pending**: Condition is met, but `for` duration hasn't elapsed
- **Firing**: Condition is met and alert is active

## 📊 Verification Checklist

After running tests, verify:

- [ ] Alerts fire when conditions are met
- [ ] Alerts resolve when conditions improve
- [ ] Alert labels are correct (severity, component)
- [ ] Alert annotations are readable
- [ ] Alerts are routed correctly in Alertmanager
- [ ] Alert grouping works (similar alerts grouped)
- [ ] Inhibition rules work (suppress related alerts)
- [ ] Alert states transition correctly (Inactive → Pending → Firing → Resolved)

## 🐛 Troubleshooting Tests

### Alert Not Firing

1. **Check if condition is met**:
   - Query the PromQL expression directly in Prometheus
   - Verify the value exceeds the threshold

2. **Check `for` duration**:
   - Alert won't fire until `for` duration has elapsed
   - Check Prometheus → Alerts → "Pending" state

3. **Check alert rule syntax**:
   ```bash
   docker compose exec prometheus promtool check rules /etc/prometheus/alerts.yml
   ```

### Alert Not Resolving

1. **Check if condition is still met**:
   - Query the PromQL expression
   - Verify the value is below the threshold

2. **Wait longer**:
   - Alerts resolve when condition is no longer met
   - May take a few evaluation cycles

### Too Many Alerts

1. **Adjust thresholds**:
   - Make thresholds less sensitive
   - Increase `for` duration

2. **Use grouping**:
   - Ensure alerts are properly grouped
   - Check Alertmanager grouping configuration

## 💡 Tips

1. **Start with one alert at a time**
   - Easier to understand what's happening
   - Less overwhelming

2. **Use Prometheus UI to verify conditions**
   - Query the alert expression directly
   - See if it's actually exceeding the threshold

3. **Check Alertmanager UI regularly**
   - See how alerts are grouped
   - Understand routing behavior

4. **Test resolution**
   - Don't just test firing, test resolution too
   - Verify alerts clear when conditions improve

5. **Document your findings**
   - Note which alerts work well
   - Note which need adjustment

---

**Happy Testing!** 🎉

