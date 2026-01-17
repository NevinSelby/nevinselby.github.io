# Nevin John Selby - AI & Cloud Portfolio

A production-grade, high-performance portfolio website built for Nevin John Selby, an AI & Cloud Engineer. This project showcases a premium "System-Level Engineering" aesthetic using modern web technologies.

## 🚀 Key Features

*   **Modern Aesthetic**: Glassmorphism, deep blue/black theme, and fluid animations.
*   **Performance First**: Built with Vite, scoring 90+ on Lighthouse.
*   **AI Chatbot**: A client-side RAG-like chatbot powered by Fuse.js to answer questions about Nevin's experience and projects.
*   **Fully Responsive**: optimized for all devices.
*   **SEO Optimized**: Dynamic meta tags and OpenGraph support.
*   **GitHub Pages Ready**: Configured for easy static deployment.

## 🛠️ Tech Stack

*   **Framework**: React 19 + TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS v3 + CSS Modules for Glass effects
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Routing**: React Router (HashRouter)
*   **Search**: Fuse.js

## 📦 Project Structure

```bash
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout wrapper
│   ├── ui/           # Reusable primitives (Buttons, Cards, Chips)
│   └── chat/         # Chatbot widget and logic
├── content/          # Data layer (Resume, Projects, Skills)
├── hooks/            # Custom hooks (useChat)
├── pages/            # Page views
└── styles/           # Global styles
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:5173`      |
| `npm run build`           | Build for production to `./dist`                 |
| `npm run preview`         | Preview production build locally                 |

## 🚀 Deployment

This project includes a **GitHub Actions** workflow for automated deployment.

1.  Push code to `main` branch.
2.  The workflow `.github/workflows/deploy.yml` will trigger.
3.  The site will be built and deployed to the `gh-pages` branch.
4.  Enable GitHub Pages in repository settings and select `gh-pages` as source.

## 📝 Content Management

To update the portfolio content (Resume, Projects, etc.), simply edit:
`src/content/data.ts`

This file acts as the single source of truth for the entire website, including the Chatbot's knowledge base.
