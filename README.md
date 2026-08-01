# 📖 The Dictionary — Editorial Audio Reference

A refined, editorial dictionary web application featuring resilient multi-tier audio pronunciations, clean serif typography, and real-time word lookups.

🚀 **Live Demo**: [https://dictionary-app-omega-eight.vercel.app](https://dictionary-app-omega-eight.vercel.app)

---

## ✨ Features

- 📰 **Editorial Aesthetic**: Paper-white background `#FDFBF7`, high-contrast serif typography, and crisp borders.
- 🔊 **Resilient Audio Pronunciation Pipeline**:
  1. **Primary**: High-quality MP3 audio from the Free Dictionary API.
  2. **Secondary Fallback**: Server-side proxy endpoint (`/api/audio`) routing Google TTS requests to bypass browser CORS/404 blocks.
  3. **Tertiary Fallback**: Native browser Web Speech API (`window.speechSynthesis`).
- 📚 **Multi-Entry Word Consolidation**: Merges homonyms, multiple parts of speech (`noun`, `verb`, `adjective`), and duplicate phonetics into a single cohesive view.
- 🔗 **Interactive Navigation**: Clickable synonyms and antonyms for instant cross-reference lookups.
- ⚡ **Search History & Shortcuts**: Remembers recent lookups with `Escape` key shortcut support.

---

## 🛠️ Tech Stack

- **Framework**: SvelteKit (Svelte 5 Runes)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Language**: TypeScript
- **Deployment**: Vercel (`@sveltejs/adapter-vercel`)

---

## 🚀 Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/dictionary-app.git
cd dictionary-app
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build & Preview Production
```bash
npm run build
npm run preview
```

---

## 📄 License

MIT
