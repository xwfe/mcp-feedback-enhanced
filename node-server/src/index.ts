import express from 'express';
import path from 'path';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = process.env.PORT || 8765;

// Static assets from existing Python project
const staticRoot = path.join(__dirname, '..', '..', 'src', 'mcp_feedback_enhanced', 'web', 'static');
const templateRoot = path.join(__dirname, '..', '..', 'src', 'mcp_feedback_enhanced', 'web', 'templates');

app.use('/static', express.static(staticRoot));

app.get('/', (_req, res) => {
  res.sendFile(path.join(templateRoot, 'index.html'));
});

// Placeholder API routes
app.get('/api/translations', (_req, res) => {
  res.json({});
});

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server, path: '/ws' });
wss.on('connection', ws => {
  ws.on('message', () => {
    // Echo for now
    ws.send('ACK');
  });
});
