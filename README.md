# IRONIQ.fit (GitHub-ready, no Netlify)

This repo is a clean starting point for **IRONIQ.fit**:
- ✅ No Netlify config or redirects
- ✅ GitHub Pages deploy workflow included
- ✅ Email-based login (Supabase Auth) wired in

## 1) Local setup
```bash
npm install
npm run start
```

## 2) Configure Supabase (email login)
1. Create a project in Supabase.
2. Copy your **Project URL** and **anon key**.
3. Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

In Supabase:
- Enable **Email** provider
- (Optional) Require email confirmation
- Add redirect URLs for auth (if you use magic links later)

## 3) Deploy to GitHub Pages
1. Push this repo to GitHub.
2. In GitHub: **Settings → Pages**
   - Source: **GitHub Actions**
3. Add repository variables/secrets:
   - (none required for this static deploy)
4. Push to `main` and the workflow will deploy.

## 4) Custom domain (IRONIQ.fit)
After Pages deploy works:
- In GitHub: **Settings → Pages → Custom domain** set to `ironiq.fit`
- Add DNS records at your registrar (see GitHub docs).

## Scripts
- `npm run start` - Expo dev server
- `npm run web` - Web dev
- `npm run export:web` - Static export into `dist/`

