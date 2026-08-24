const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { handleMessage, triggerStart } = require('./botLogic');

// API Routes
const authRoutes = require('./src/routes/authRoutes');
const mockTestRoutes = require('./src/routes/mockTestRoutes');
const attemptRoutes = require('./src/routes/attemptRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Enable CORS for frontend Vite development & production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded audio files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Vectra Foreign Services Full Mock Test & Bot API'
  });
});

// Mock Test Platform APIs
app.use('/api/auth', authRoutes);
app.use('/api/mock-tests', mockTestRoutes);
app.use('/api', attemptRoutes);
app.use('/api/admin', adminRoutes);

// Webhook Verification (Required by Meta)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// Receiving WhatsApp Messages
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      
      // If someone types "Hi", "Hello", "Start", trigger the start flow
      if (message.type === 'text' && 
          ['hi', 'hello', 'start', 'hey'].includes(message.text.body.toLowerCase().trim())) {
         await triggerStart(message.from);
      } else {
         // Pass other messages to the state machine
         await handleMessage(message);
      }
    }
    // Return a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Vectra Server is listening on port ${PORT}`);
  console.log(`📁 Mock Test API: http://localhost:${PORT}/api/mock-tests`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook`);
});
