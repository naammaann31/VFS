const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const crypto = require('crypto');
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
const APP_SECRET = process.env.APP_SECRET;

// Enable CORS for frontend Vite development & production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// We only need raw body for the webhook. Standard body parser for the rest.
app.use(express.json({ 
  limit: '50mb',
  verify: (req, res, buf, encoding) => {
    // Only save the raw body on the webhook route so we don't interfere with API routes
    if (req.originalUrl.startsWith('/webhook')) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
}));
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
  // Validate X-Hub-Signature-256 header if an App Secret is provided
  if (APP_SECRET) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
      return res.status(403).send('Missing signature');
    }

    const expectedSignature = 'sha256=' + crypto.createHmac('sha256', APP_SECRET).update(req.rawBody || '').digest('hex');
    if (signature !== expectedSignature) {
      console.error('Signature validation failed.');
      return res.status(403).send('Invalid signature');
    }
  }

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
      
      // If someone types "Hi", "Hello", "Start", or the specific trigger phrase, start the flow
      const userText = message.text?.body?.toLowerCase().trim() || '';
      const triggerPhrases = ['hi', 'hello', 'start', 'hey', 'hello, i would like free counselling on my study abroad options'];
      
      if (message.type === 'text' && triggerPhrases.includes(userText)) {
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
