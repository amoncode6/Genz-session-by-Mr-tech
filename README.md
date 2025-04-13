# Mr Tech Session Generator

![Mr Tech Logo](https://via.placeholder.com/350x100.png?text=Mr+Tech+Session+Generator)

A clean and secure WhatsApp Session Generator using Baileys — made for the **Mr Tech** bot system. Generate base64 sessions by scanning a QR code, secured with admin-only access.

---

## Features

- Scan QR to generate WhatsApp session
- Outputs session in base64 format (ready for your bot)
- Admin-only access via secret key
- Dark UI theme with Mr Tech branding
- Deployable directly on [Render](https://render.com)

---

## Demo

Visit your deployed URL like this:

```
https://your-app-name.onrender.com/?key=mrtech123
```

---

## Deploy to Render

1. [Create an account at Render](https://render.com)
2. Upload this code to a GitHub repo
3. On Render, click **"New Web Service"**
4. Connect your GitHub and select the repo
5. Use the following settings:

```
Build Command:  npm install
Start Command:  npm start
Node Version:   18+
```

6. Access your bot at:  
   `https://your-app-name.onrender.com/?key=mrtech123`

---

## Customize

- Change the admin key in `server.js`:
```js
if (adminKey !== "mrtech123") {
  return res.send("Access Denied");
}
```

---

## License

Free to use, remix, and launch — just don’t remove the **Mr Tech** spirit!

---
Built with love by [Mr Tech]
