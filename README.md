# Repair Studio
server/: Express + Valkey (Aiven) + pdfkit + nodemailer, deployed to Vercel as a serverless function.
client/: Expo (React Native + TypeScript + NativeWind/Tailwind); the web build deploys to Vercel.

1. Aiven: create a Valkey service, copy its Service URI into server/.env as VALKEY_URL (rediss://...).
2. `cd server && npm i && cp .env.example .env && npm start`  (API on :4000)
3. `cd client && npm i && npx expo install --fix && cp .env.example .env && npm run web`
4. Vercel: import the repo twice (root directory `server`, then `client`). Add the env vars from each .env.example.
   Set EXPO_PUBLIC_API to https://<server-project>.vercel.app/api and SITE_URL to the client URL.
Sitemap: <server>/sitemap.xml. RSS: <server>/api/rss/<slug>.xml. PDF: <server>/api/orders/<id>/pdf

## v2 additions
- `python3 tools/gen_glb.py` regenerates the five GLB buildings in client/public/models (pure Python, no Blender).
- `/` is the 3D stage (web), `/scene/:slug` the scene page, `/home` the former home, plus `/ads` and `/gallery`.
- Gallery filters run on the server with sharp (`/api/gallery/img?filter=&src=`), only for govsim.pythonanywhere.com images.

## v3
- Scenes are `scene-01`..`scene-05` (cottage, industrial, loft apartment, commercial tower, skyscraper). Models: client/public/models/scene-0N.glb; images scene-0N-image-01..40.jpg (placeholders, replace freely).
- Put your own files in client/public/models: banner-image-01.jpg, banner-image-02.jpg, apartment-floor-template-01/02/03/04/06.jpg.
- Catalogue and translations are generated into client/src/data/catalog.ts and client/src/lib/strings.ts; the client no longer needs the API to show pages.




