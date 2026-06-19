# Основы ML — Базовый курс анализа

Interactive visual explanations of core machine learning and deep learning concepts, inspired by [MLU-Explain](https://mlu-explain.github.io/).

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)

## Features

- **24 interactive articles** covering ML Fundamentals and Deep Learning
- **EN/RU language toggle** — full bilingual support for all article titles, headings, and conclusions
- **Interactive visualizations** — beeswarm plots, ROC curves, decision trees, heatmaps, and architecture diagrams
- **KaTeX math rendering** — beautiful mathematical formulas throughout
- **Parallax hero** with animated background and smooth scrolling
- **Progress bar** — reading progress indicator on article pages
- **Framer Motion animations** — smooth entry animations and micro-interactions
- **Responsive design** — works on mobile, tablet, and desktop

## Articles

### ML Fundamentals (14 articles)

| # | Article |
|---|---------|
| 1 | Neural Networks |
| 2 | Equality of Odds |
| 3 | Logistic Regression |
| 4 | Linear Regression |
| 5 | Reinforcement Learning |
| 6 | ROC & AUC |
| 7 | Cross-Validation |
| 8 | Train, Test & Validation Sets |
| 9 | Precision & Recall |
| 10 | Random Forest |
| 11 | Decision Trees |
| 12 | Bias-Variance Tradeoff |
| 13 | Double Descent (Visual) |
| 14 | Double Descent (Mathematical) |

### Deep Learning (10 articles)

| # | Article |
|---|---------|
| 15 | Convolutional Neural Networks |
| 16 | RNNs & LSTMs |
| 17 | Generative Adversarial Networks |
| 18 | Transformers & Self-Attention |
| 19 | Autoencoders & VAEs |
| 20 | Attention Mechanisms |
| 21 | Batch Normalization |
| 22 | Dropout & Regularization |
| 23 | Transfer Learning |
| 24 | Vanishing & Exploding Gradients |

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.6 | Type safety |
| Vite | 6 | Build tool |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11 | Animations |
| Recharts | 2.13 | Data visualization |
| KaTeX | 0.17 | Math rendering |
| react-router-dom | 6.28 | Client-side routing |
| lucide-react | 0.460 | Icons |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mlu_dl

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Type-check and build
npm run build

# Preview the production build locally
npm run preview
```

The built files will be in the `dist/` directory.

## Project Structure

```
mlu_dl/
├── public/
│   ├── favicon.svg          # Custom neural network favicon
│   └── thumbnails/          # SVG article thumbnails
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   └── icons/
│   ├── context/
│   │   └── LanguageContext.tsx  # EN/RU i18n system
│   ├── data/
│   │   └── articles.ts      # All 24 articles with bilingual content
│   ├── pages/
│   │   ├── ArticlePage.tsx  # Article rendering engine
│   │   └── Landing.tsx      # Home page
│   ├── App.tsx              # Router + layout
│   ├── index.css            # Global styles + Tailwind
│   └── main.tsx             # Entry point
├── index.html
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## i18n (Internationalization)

The app supports **English** and **Russian** via a React Context-based translation system:

- **UI text** (navbar, buttons, labels) — translated via `t()` function from `LanguageContext`
- **Article content** — `titleRu`, `subtitleRu`, `headingRu`, `conclusionRu` fields on each article
- **Block-level translations** — optional `htmlRu`, `labelRu`, `titleRu`, `textRu`, `noteRu` fields on content blocks
- **Toggle** — EN|RU button in the navbar switches the language instantly

## Deployment

### Vercel

This project is configured for one-click deployment to [Vercel](https://vercel.com).

```bash
npx vercel deploy
```

Or connect the GitHub repository to Vercel for automatic deployments on push.

## Credits

Inspired by [MLU-Explain](https://mlu-explain.github.io/) by Amazon ML University.  
Article content and visualizations recreated as an educational project.

## License

MIT
