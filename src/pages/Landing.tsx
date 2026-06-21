import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { chapters } from '../data/articles'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import { articleIcons } from '../components/icons/ArticleIcons'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'



const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Landing() {
  const { t, lang } = useLang()
  // ML articles: original 1-14 + new ML topics (KNN, Gradient Boosting, Hyperparam Tuning, Naive Bayes, Clustering, Time Series, Ranking)
  // DL articles: original 15-24 + new DL topics (GNN, Diffusion, LLM, Recommender, Knowledge Distillation)
  const mlSlugs = new Set(['neural-networks','equality-of-odds','logistic-regression','linear-regression','reinforcement-learning','roc-auc','cross-validation','train-test-validation','precision-recall','random-forest','decision-trees','bias-variance','double-descent','double-descent-2','knn','gradient-boosting','hyperparameter-tuning','naive-bayes','clustering','time-series','ranking','optimization'])
  const mlArticles = chapters.filter(c => mlSlugs.has(c.slug))
  const dlArticles = chapters.filter(c => !mlSlugs.has(c.slug))

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section id="articles" className="relative py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t('explorePublished')}</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">{t('explorePublishedDesc')}</p>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.2 }} className="h-1 w-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* ML Fundamentals label */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-primary-400 to-transparent" />
              <h3 className="text-xl font-bold text-primary-600">{t('mlFundamentals')}</h3>
              <div className="h-px flex-1 bg-gradient-to-l from-primary-400 to-transparent" />
            </div>
          </motion.div>

          {/* ML Article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mlArticles.map((article, i) => {
              const Icon = articleIcons[article.slug]
              return (
                <motion.div
                  key={article.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                >
                  <Link to={`/article/${article.slug}`} className="block group card-hover">
                    <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          {Icon && (
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Icon size={18} className="text-white" />
                            </div>
                          )}
                          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                            {article.authors}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-accent-700 transition-colors leading-tight mb-2">
                          {lang === 'ru' ? article.titleRu : article.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{lang === 'ru' ? article.subtitleRu : article.subtitle}</p>
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-accent-600 transition-colors">
                          <span>{t('diveIn')}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Deep Learning section header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 mt-24">
            <div className="flex items-center justify-center gap-5 mb-5">
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="h-px w-20 bg-gradient-to-r from-transparent to-accent-400 origin-right" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('deepLearning')}</h2>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="h-px w-20 bg-gradient-to-l from-transparent to-accent-400 origin-left" />
            </div>
            <p className="text-gray-500 max-w-xl mx-auto">{t('deepLearningDesc')}</p>
          </motion.div>

          {/* DL Article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dlArticles.map((article, i) => {
              const Icon = articleIcons[article.slug]
              return (
                <motion.div
                  key={article.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                >
                  <Link to={`/article/${article.slug}`} className="block group card-hover">
                    <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          {Icon && (
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <Icon size={18} className="text-white" />
                            </div>
                          )}
                          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                            {article.authors}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-accent-700 transition-colors leading-tight mb-2">
                          {lang === 'ru' ? article.titleRu : article.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{lang === 'ru' ? article.subtitleRu : article.subtitle}</p>
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-accent-600 transition-colors">
                          <span>{t('diveIn')}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
