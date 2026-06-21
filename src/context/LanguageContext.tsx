import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Lang = 'en' | 'ru'

export const translations = {
  en: {
    // Navbar
    home: 'Home',
    articles: 'Articles',
    // Hero
    heroBadge: 'Visual explanations of core ML concepts',
    heroSubtitle: 'Visual explanations of core machine learning concepts',
    heroDescription: 'An education initiative teaching important ML concepts through interactive visual essays and hands-on examples.',
    exploreArticles: 'Explore Articles',
    // Landing sections
    explorePublished: 'Explore Published Articles',
    explorePublishedDesc: 'Dive into interactive visual essays covering core machine learning concepts',
    deepLearning: 'Deep Learning',
    deepLearningDesc: 'Advanced architectures and techniques powering modern AI',
    mlFundamentals: 'ML Fundamentals',
    // Article page
    allArticles: 'All Articles',
    theEnd: 'The End',
    referencesTitle: 'References + Open Source',
    articleNotFound: 'Article Not Found',
    backToHome: '← Back to Home',
    threshold: 'Threshold',
    correctA: 'Correct (A)',
    wrongA: 'Wrong (A)',
    correctB: 'Correct (B)',
    wrongB: 'Wrong (B)',
    featureMap: 'Feature Map',
    attentionMatrix: 'Attention Matrix',
    low: 'Low',
    high: 'High',
    interactiveViz: 'Interactive visualization',
    // Footer
    madeWith: 'Made with',
    byTeam: 'by ML Fundamentals Team',
    // App name
    appName: 'ML Fundamentals',
    appTagline: 'A Basic Course in Analysis',
    // Dive In button
    diveIn: 'Dive In',
  },
  ru: {
    // Navbar
    home: 'Главная',
    articles: 'Статьи',
    // Hero
    heroBadge: 'Визуальные объяснения ключевых концепций МО',
    heroSubtitle: 'Визуальные объяснения ключевых концепций машинного обучения',
    heroDescription: 'Образовательная инициатива, объясняющая важные концепции МО через интерактивные визуальные эссе и практические примеры.',
    exploreArticles: 'Открыть статьи',
    // Landing sections
    explorePublished: 'Опубликованные статьи',
    explorePublishedDesc: 'Погрузитесь в интерактивные визуальные эссе по основным концепциям машинного обучения',
    deepLearning: 'Глубокое обучение',
    deepLearningDesc: 'Передовые архитектуры и методы, лежащие в основе современного ИИ',
    mlFundamentals: 'Основы МО',
    // Article page
    allArticles: 'Все статьи',
    theEnd: 'Заключение',
    referencesTitle: 'Ссылки и открытый код',
    articleNotFound: 'Статья не найдена',
    backToHome: '← На главную',
    threshold: 'Порог',
    correctA: 'Верно (A)',
    wrongA: 'Ошибка (A)',
    correctB: 'Верно (B)',
    wrongB: 'Ошибка (B)',
    featureMap: 'Карта признаков',
    attentionMatrix: 'Матрица внимания',
    low: 'Низк.',
    high: 'Высок.',
    interactiveViz: 'Интерактивная визуализация',
    // Footer
    madeWith: 'Сделано с',
    byTeam: 'Основы ML',
    // App name
    appName: 'Основы ML',
    appTagline: 'Базовый курс анализа',
    // Dive In button
    diveIn: 'Читать',
  },
} as const

export type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  lang: Lang
  toggle: () => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggle: () => {},
  t: (key) => translations.en[key],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'ru' : 'en')), [])
  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
