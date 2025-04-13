const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const P = require('pino'); // <-- Add this line

const logger = P({ level: 'silent' }); // or 'info' if you want logs

const sock = makeWASocket({
  auth: state,
  logger // <-- Add this line
});
