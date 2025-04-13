const express = require("express");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeInMemoryStore } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { BufferJSON } = require("@whiskeysockets/baileys");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

let qrImage = "";
let sessionBase64 = "";

app.get("/", (req, res) => {
  res.render("index", { qrImage, sessionBase64 });
});

const startSocket = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: undefined,
    browser: ["Mr Tech", "Chrome", "1.0.0"]
  });

  sock.ev.on("connection.update", async ({ connection, qr }) => {
    if (qr) {
      qrImage = await qrcode.toDataURL(qr);
    }
    if (connection === "open") {
      const session = {
        creds: sock.authState.creds,
        keys: {}
      };

      for (let [key, value] of Object.entries(sock.authState.keys)) {
        session.keys[key] = await value;
      }

      const encoded = Buffer.from(JSON.stringify(session, BufferJSON.replacer)).toString("base64");
      sessionBase64 = encoded;

      console.log("Mr Tech session generated!");
    }
  });

  sock.ev.on("creds.update", saveCreds);
};

startSocket();

app.listen(PORT, () => {
  console.log("Mr Tech Session Generator running on http://localhost:" + PORT);
});
