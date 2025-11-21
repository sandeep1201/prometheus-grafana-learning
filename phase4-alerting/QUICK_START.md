# Phase 4: Quick Start Guide 🚀

Get up and running with Prometheus Alerting in 5 minutes!

## ⚡ Quick Start

```bash
# 1. Navigate to phase4 directory
cd phase4-alerting

# 2. Start all services
docker compose up -d

# 3. Wait for services to start (30 seconds)
sleep 30

# 4. Verify services are running
docker compose ps
```

## 🌐 Access Points

- **Application**: http://localhost:4000
- **Prometheus**: http://localhost:9090
- **Alertmanager**: http://localhost:9093
- **Grafana**: http://localhost:3001 (admin/admin)

## ✅ Verify Setup

1. **Check Prometheus**:
   - Go to http://localhost:9090/alerts
   - You should see all alert rules listed

2. **Check Alertmanager**:
   - Go to http://localhost:9093
   - Should show "No alerts" (normal if no alerts are firing)

3. **Check Application**:
   - Go to http://localhost:4000
   - Should see welcome message

## 🧪 Quick Test

**Trigger a test alert**:

```bash
# Generate some traffic
for i in {1..50}; do
  curl -s "http://localhost:4000/api/data" > /dev/null &
done
```

**Check alerts**:
1. Go to http://localhost:9090/alerts
2. Wait 2-3 minutes
3. Check if any alerts fire (depends on latency)

## 📚 Next Steps

1. **Read the README**: `README.md` for comprehensive guide
2. **Test alerts**: `ALERT_TESTING_GUIDE.md` for detailed testing
3. **Explore UIs**: Check Prometheus and Alertmanager interfaces
4. **Customize**: Modify alert rules in `prometheus/alerts.yml`

## 🛑 Stop Services

```bash
docker compose down
```

## 🔄 Restart Services

```bash
docker compose restart
```

## 📊 View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f prometheus
docker compose logs -f alertmanager
docker compose logs -f app
```

---

**That's it!** You're ready to explore Prometheus Alerting! 🎉

