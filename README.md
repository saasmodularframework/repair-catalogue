# Repair Studio

---



![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---
## Architecture Overview

* **`server/`**: Powered by Express, keyvaluedatabase, `pdfkit`, and `nodemailer`, and deployed to Vercel as a serverless function architecture.
* **`client/`**: Developed with Expo, React Native, TypeScript, and Tailwind, with the web build target being deployed directly to Vercel.

---

## Setup & Deployment Workflow

1. **Database Provisioning**: A keyvaluedatabase service is created, and its connection URI is copied into `server/.env` under the variable.
2. **Server Initialization**: Dependencies are installed within the `server` directory, environment configurations are copied from `.env.example`, and the API is initiated on port `4000`:
   ```bash
   cd server && npm i && cp .env.example .env && npm start
   ```

---

## System Endpoints & Routing

- **Sitemap**: `<server>/sitemap.xml`
- **RSS**: `<server>/api/rss/<slug>.xml`
- **PDF Format**: `<server>/api/orders/<id>/pdf`
