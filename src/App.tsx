import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import ArticlePage from './pages/ArticlePage'
import Navbar from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'

function AppRoutes() {
  const location = useLocation()
  const hideNavbar = location.pathname.startsWith('/article')

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LanguageProvider>
  )
}

export default App
