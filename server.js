const express = require('express');
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino'); // logger module

const app = express();
const PORT = process.env.PORT || 3000;

// Path to auth file
const { state, saveState } = useSingleFileAuthState('./session.json');

// Logger
const logger = P({ level: 'silent' }); // or use 'info' for logs

// Socket connection
const startSock = () => {
  const sock = makeWASocket({
    auth: state,
    logger, // this fixes the undefined logger error
    printQRInTerminal: true
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
      // reconnect if not logged out
      if (shouldReconnect) {
        startSock();
      }
    } else if (connection === 'open') {
      console.log('Connected');
    }
  });

  sock.ev.on('creds.update', saveState);
};

startSock();

app.get('/', (req, res) => {
  res.send('Mr Tech Session Generator is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
