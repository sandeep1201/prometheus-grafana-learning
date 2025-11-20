/**
 * Phase 2: Application Metrics
 * 
 * Sample Node.js Express application with Prometheus metrics
 * 
 * This app demonstrates:
 * - HTTP request metrics (counter, histogram)
 * - Custom business metrics (gauge)
 * - Exposing /metrics endpoint for Prometheus
 */

import express from 'express';
import { Registry, Counter, Histogram, Gauge } from 'prom-client';

const app = express();
const PORT = process.env.PORT || 4000;

// Create a registry to register metrics
const register = new Registry();

// Register default metrics (CPU, memory, etc.)
// These are collected automatically by prom-client

// Custom Metrics
// ======================================================================

// 1. HTTP Request Counter - Counts total HTTP requests
const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// 2. HTTP Request Duration Histogram - Measures request latency
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Custom buckets for latency distribution
  registers: [register]
});

// 3. Active Connections Gauge - Current number of active connections
const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register]
});

// 4. Custom Business Metric - Example: Items in Cart (for demo)
const itemsInCart = new Gauge({
  name: 'items_in_cart',
  help: 'Number of items in shopping cart',
  labelNames: ['user_id'],
  registers: [register]
});

// Middleware to track metrics
app.use((req, res, next) => {
  // Increment active connections
  activeConnections.inc();

  // Record start time
  const startTime = Date.now();

  // Track response finish
  res.on('finish', () => {
    // Decrement active connections
    activeConnections.dec();

    // Calculate duration
    const duration = (Date.now() - startTime) / 1000;

    // Record metrics
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    });

    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    }, duration);
  });

  next();
});

app.use(express.json());

// Routes
// ======================================================================

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Sample App with Prometheus Metrics!',
    endpoints: {
      home: '/',
      health: '/health',
      api: '/api/data',
      metrics: '/metrics'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API endpoint with some processing
app.get('/api/data', async (req, res) => {
  // Simulate some processing time
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200));
  
  res.json({
    data: [
      { id: 1, name: 'Item 1', value: 100 },
      { id: 2, name: 'Item 2', value: 200 },
      { id: 3, name: 'Item 3', value: 300 }
    ],
    timestamp: new Date().toISOString()
  });
});

// Post endpoint (for creating data)
app.post('/api/data', (req, res) => {
  // Simulate processing
  setTimeout(() => {
    res.status(201).json({
      message: 'Data created successfully',
      data: req.body,
      timestamp: new Date().toISOString()
    });
  }, 100);
});

// Demo endpoint to update custom metric (items in cart)
app.post('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;
  
  // Update the custom gauge metric
  if (items !== undefined) {
    itemsInCart.set({ user_id: userId }, items);
  }
  
  res.json({
    message: `Cart updated for user ${userId}`,
    items: items,
    timestamp: new Date().toISOString()
  });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    res.status(500).end(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Metrics available at http://localhost:${PORT}/metrics`);
  console.log(`\n📝 Available endpoints:`);
  console.log(`   GET  /              - Home`);
  console.log(`   GET  /health        - Health check`);
  console.log(`   GET  /api/data      - Get data`);
  console.log(`   POST /api/data      - Create data`);
  console.log(`   POST /api/cart/:id  - Update cart (custom metric)`);
  console.log(`   GET  /metrics       - Prometheus metrics`);
});

