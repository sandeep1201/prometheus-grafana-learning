# Phase 4: Alerting 🚨

Learn how to set up alerting with Prometheus Alertmanager, create alert rules, and configure notification channels.

## 📚 What You'll Learn

- **Prometheus Alertmanager** - How to handle and route alerts
- **Alert Rules** - Writing PromQL expressions to trigger alerts
- **Alert Routing** - Grouping and routing alerts by severity
- **Notification Channels** - Configuring where alerts are sent
- **Alert Lifecycle** - Understanding alert states (firing, resolved, pending)

## 🎯 Key Concepts

### Alertmanager
- **Purpose**: Handles alert routing, grouping, silencing, and inhibition
- **Port**: 9093 (http://localhost:9093)
- **Features**:
  - Groups similar alerts together
  - Routes alerts to different receivers based on labels
  - Suppresses duplicate alerts
  - Handles alert silencing

### Alert Rules
- **Location**: `prometheus/alerts.yml`
- **Format**: YAML with PromQL expressions
- **Structure**:
  - **Groups**: Collections of related alert rules
  - **Rules**: Individual alert conditions
  - **Labels**: Metadata attached to alerts
  - **Annotations**: Human-readable alert descriptions

### Alert States
- **Pending**: Condition is met, but `for` duration hasn't elapsed
- **Firing**: Condition is met and `for` duration has passed
- **Resolved**: Condition is no longer met

## 🏗️ Architecture

```
Application → Prometheus → Alertmanager → Notifications
     ↓            ↓              ↓
  Metrics    Alert Rules    Routing Rules
```

1. **Application** exposes metrics
2. **Prometheus** scrapes metrics and evaluates alert rules
3. **Alertmanager** receives alerts and routes them
4. **Notifications** are sent to configured channels

## 🚀 Quick Start

1. **Start all services**:
   ```bash
   cd phase4-alerting
   docker compose up -d
   ```

2. **Verify services are running**:
   - **App**: http://localhost:4000
   - **Prometheus**: http://localhost:9090
   - **Alertmanager**: http://localhost:9093
   - **Grafana**: http://localhost:3001 (admin/admin)

3. **Check alert rules**:
   - Go to Prometheus UI → Alerts tab
   - You should see all defined alert rules

4. **Check Alertmanager**:
   - Go to http://localhost:9093
   - View active alerts, silences, and status

## 📋 Alert Rules Overview

### 1. High Latency Alerts

#### HighP95Latency
- **Trigger**: p95 latency > 0.5s for 2 minutes
- **Severity**: Warning
- **Use Case**: Monitor typical worst-case user experience

#### HighP99Latency
- **Trigger**: p99 latency > 1.0s for 2 minutes
- **Severity**: Critical
- **Use Case**: Monitor extreme outliers

#### HighAverageLatency
- **Trigger**: Average latency > 0.3s for 3 minutes
- **Severity**: Warning
- **Use Case**: Overall system performance

### 2. High Error Rate Alerts

#### HighErrorRate
- **Trigger**: 5xx error rate > 5% for 2 minutes
- **Severity**: Critical
- **Use Case**: Server errors indicating system problems

#### High4xxErrorRate
- **Trigger**: 4xx error rate > 10% for 3 minutes
- **Severity**: Warning
- **Use Case**: Client errors (bad requests, not found, etc.)

### 3. Application Health Alerts

#### ApplicationDown
- **Trigger**: Application is down for 1 minute
- **Severity**: Critical
- **Use Case**: Service availability

#### NoRequestsReceived
- **Trigger**: No requests for 5 minutes
- **Severity**: Warning
- **Use Case**: Detect traffic issues

#### HighActiveConnections
- **Trigger**: Active connections > 100 for 2 minutes
- **Severity**: Warning
- **Use Case**: Resource usage monitoring

### 4. Request Rate Alerts

#### SuddenDropInRequestRate
- **Trigger**: Request rate drops > 50% compared to 15 minutes ago
- **Severity**: Warning
- **Use Case**: Detect traffic anomalies

#### VeryHighRequestRate
- **Trigger**: Request rate > 100 req/s for 2 minutes
- **Severity**: Warning
- **Use Case**: Detect traffic spikes

## 🔧 Configuration Files

### `prometheus/alerts.yml`
Contains all alert rule definitions. Each rule has:
- **Alert name**: Unique identifier
- **Expr**: PromQL expression that triggers the alert
- **For**: Duration the condition must be true before firing
- **Labels**: Metadata (severity, component, etc.)
- **Annotations**: Human-readable messages

### `alertmanager/config.yml`
Configures how Alertmanager handles alerts:
- **Route**: How alerts are routed to receivers
- **Receivers**: Where alerts are sent (email, Slack, webhook, etc.)
- **Inhibit Rules**: Suppress certain alerts when others are firing
- **Grouping**: Group similar alerts together

## 🧪 Testing Alerts

### Test 1: Trigger High Latency Alert

1. **Generate slow requests**:
   ```bash
   # Make requests that take longer than 0.5s
   for i in {1..50}; do
     curl "http://localhost:4000/api/data" &
   done
   ```

2. **Check Prometheus Alerts**:
   - Go to http://localhost:9090/alerts
   - Look for "HighP95Latency" alert
   - Wait 2 minutes for it to fire

3. **Check Alertmanager**:
   - Go to http://localhost:9093
   - View the alert in the "Active" tab

### Test 2: Trigger Error Rate Alert

1. **Generate errors** (modify app temporarily or use a script):
   ```bash
   # This would require modifying the app to return 500 errors
   # Or use a load testing tool
   ```

2. **Check alerts** in Prometheus and Alertmanager

### Test 3: Stop Application

1. **Stop the app**:
   ```bash
   docker compose stop app
   ```

2. **Wait 1 minute**, then check:
   - Prometheus alerts → "ApplicationDown" should fire
   - Alertmanager → Alert should appear

3. **Restart the app**:
   ```bash
   docker compose start app
   ```

4. **Wait a few minutes** → Alert should resolve

## 📊 Viewing Alerts

### Prometheus UI
- **URL**: http://localhost:9090/alerts
- **Shows**: All alert rules and their current state
- **States**: Inactive, Pending, Firing

### Alertmanager UI
- **URL**: http://localhost:9093
- **Tabs**:
  - **Alerts**: Currently firing alerts
  - **Silences**: Temporarily suppressed alerts
  - **Status**: Alertmanager configuration and status
  - **Groups**: Alert groups

### Grafana
- **URL**: http://localhost:3001
- **Alerting**: Go to Alerting → Alert Rules
- **Dashboards**: Can also show alert states in panels

## 🔔 Notification Channels

### Current Setup (Development)
- **Webhook**: Configured but pointing to localhost (for testing)
- **Console**: Alerts are logged by Alertmanager

### Production Setup

#### Email Notifications
Uncomment and configure in `alertmanager/config.yml`:
```yaml
global:
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'alerts@example.com'
  smtp_auth_username: 'your-email@gmail.com'
  smtp_auth_password: 'your-app-password'

receivers:
  - name: 'critical'
    email_configs:
      - to: 'oncall@example.com'
        headers:
          Subject: '🚨 CRITICAL: {{ .GroupLabels.alertname }}'
```

#### Slack Notifications
Add to receivers in `alertmanager/config.yml`:
```yaml
receivers:
  - name: 'critical'
    slack_configs:
      - api_url: 'YOUR_SLACK_WEBHOOK_URL'
        channel: '#alerts-critical'
        title: '🚨 Critical Alert'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
```

#### PagerDuty, OpsGenie, etc.
See [Alertmanager documentation](https://prometheus.io/docs/alerting/latest/configuration/) for more notification channels.

## 🎓 Understanding Alert Rules

### Basic Structure
```yaml
groups:
  - name: group_name
    interval: 30s  # How often to evaluate
    rules:
      - alert: AlertName
        expr: promql_expression  # Condition
        for: 2m                  # Duration before firing
        labels:
          severity: warning      # Metadata
        annotations:
          summary: "Alert summary"
          description: "Detailed description"
```

### PromQL Expressions

**Example: High Latency**
```promql
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
) > 0.5
```
- Calculates p95 latency
- Triggers if > 0.5 seconds

**Example: Error Rate**
```promql
sum(rate(http_requests_total{status_code=~"5.."}[5m])) /
sum(rate(http_requests_total[5m])) > 0.05
```
- Calculates percentage of 5xx errors
- Triggers if > 5%

## 🔍 Alert Routing

### Route Tree
Alerts are routed based on labels:
- **severity: critical** → `critical` receiver
- **severity: warning** → `warning` receiver
- **default** → `default` receiver

### Grouping
Alerts are grouped by:
- `alertname`
- `cluster`
- `service`

This prevents alert spam - similar alerts are grouped together.

### Inhibition
If `ApplicationDown` is firing, other alerts for the same instance are suppressed (inhibited).

## 🛠️ Common Tasks

### View Active Alerts
```bash
# Via Prometheus API
curl http://localhost:9090/api/v1/alerts

# Via Alertmanager API
curl http://localhost:9093/api/v2/alerts
```

### Create a Silence
1. Go to http://localhost:9093
2. Click "New Silence"
3. Set matchers (e.g., `alertname=HighP95Latency`)
4. Set duration
5. Click "Create"

### Reload Alert Rules
```bash
# Send SIGHUP to Prometheus
docker compose kill -s SIGHUP prometheus

# Or restart
docker compose restart prometheus
```

## 📝 Best Practices

1. **Set Appropriate Thresholds**
   - Start conservative, adjust based on real data
   - Use percentiles (p95, p99) for latency

2. **Use `for` Duration**
   - Prevents flapping alerts
   - 2-5 minutes is typical

3. **Label Alerts Properly**
   - Use `severity` (critical, warning, info)
   - Use `component` (latency, errors, availability)

4. **Write Clear Annotations**
   - `summary`: Short description
   - `description`: Detailed information with values

5. **Group Related Alerts**
   - Prevents alert fatigue
   - Makes it easier to understand issues

6. **Test Your Alerts**
   - Verify they fire when expected
   - Verify they resolve when conditions improve

## 🐛 Troubleshooting

### Alerts Not Firing
1. Check Prometheus → Alerts tab
2. Verify alert rule syntax: `promtool check rules alerts.yml`
3. Check if condition is actually met
4. Verify `for` duration has elapsed

### Alerts Not Reaching Alertmanager
1. Check Prometheus config has `alerting.alertmanagers` configured
2. Check Alertmanager is running: `docker compose ps`
3. Check Prometheus logs: `docker compose logs prometheus`

### Too Many Alerts
1. Increase `group_interval` in Alertmanager config
2. Increase `repeat_interval` for less frequent notifications
3. Use inhibition rules to suppress related alerts

## 📚 Next Steps

After mastering Phase 4, you can:
- **Phase 5**: Advanced Features (Service Discovery, Recording Rules, Exporters)
- **Customize**: Add more alert rules for your specific use case
- **Integrate**: Set up real notification channels (Slack, PagerDuty, etc.)
- **Optimize**: Fine-tune thresholds and routing based on real data

## 🔗 Useful Links

- [Prometheus Alerting Documentation](https://prometheus.io/docs/alerting/latest/overview/)
- [Alertmanager Configuration](https://prometheus.io/docs/alerting/latest/configuration/)
- [Alerting Best Practices](https://prometheus.io/docs/practices/alerting/)
- [PromQL Cheat Sheet](https://promlabs.com/promql-cheat-sheet/)

---

**Remember**: Good alerting is about finding the right balance - you want to be notified of real issues without being overwhelmed by noise!

