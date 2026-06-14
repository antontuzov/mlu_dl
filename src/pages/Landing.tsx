import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ArticleCard from '../components/ArticleCard'
import Footer from '../components/Footer'

const BASE = 'https://mlu-explain.github.io/assets/thumbnails'

const articles = [
  {
    title: 'Neural Networks',
    description: 'Learn about neural networks, the backbone of many popular algorithms today, such as ChatGPT, Stable-Diffusion, and many others.',
    image: `${BASE}/thumbnail-neural-networks.jpg`,
  },
  {
    title: 'Equality of Odds',
    description: 'Explore equality of odds, a metric used to quantify unfairness and remove bias from machine learning models.',
    image: `${BASE}/thumbnail-equality-of-odds.jpg`,
  },
  {
    title: 'Logistic Regression',
    description: 'Learn how logistic regression can be used for binary classification in machine learning through an interactive example.',
    image: `${BASE}/thumbnail-logistic-regression.jpg`,
  },
  {
    title: 'Linear Regression',
    description: 'Interactively learn about linear regression models as they are commonly used in the context of machine learning.',
    image: `${BASE}/thumbnail-linear-regression.jpg`,
  },
  {
    title: 'Reinforcement Learning',
    description: 'Learn about Reinforcement Learning (RL) and the exploration-exploitation dilemma with this interactive article.',
    image: `${BASE}/thumbnail-reinforcement-learning.jpg`,
  },
  {
    title: 'ROC & AUC',
    description: 'A visual explanation of the ROC curve, how it works with a live interactive example, and how it relates to Area Under The Curve.',
    image: `${BASE}/thumbnail-roc-auc.jpg`,
  },
  {
    title: 'Cross-Validation',
    description: 'K-Fold Cross-Validation: a resampling technique to help evaluate estimates of test error rates compared to a simple validation set.',
    image: `${BASE}/thumbnail-cross-validation.jpg`,
  },
  {
    title: 'Train, Test, and Validation Sets',
    description: 'Learn why it is best practice to split your data into training, testing, and validation sets, and explore the utility of each.',
    image: `${BASE}/thumbnail-train-test-validation.jpg`,
  },
  {
    title: 'Precision & Recall',
    description: 'When evaluating classification models, accuracy is often a poor metric. Learn about Precision, Recall, F1-score and Confusion Matrices.',
    image: `${BASE}/thumbnail-precision-recall.jpg`,
  },
  {
    title: 'Random Forest',
    description: 'Learn how majority vote and well-placed randomness can extend the decision tree to one of the most widely-used algorithms.',
    image: `${BASE}/thumbnail-random-forest.jpg`,
  },
  {
    title: 'Decision Trees',
    description: 'Explore one of ML\'s most popular algorithms: learn how trees make splits, Entropy, Information Gain, and why going too deep is problematic.',
    image: `${BASE}/thumbnail-decision-tree.jpg`,
  },
  {
    title: 'Bias Variance Tradeoff',
    description: 'Understand the tradeoff between under- and over-fitting models, how it relates to bias and variance, and explore interactive examples.',
    image: `${BASE}/thumbnail-bias-variance.jpg`,
  },
  {
    title: 'Double Descent: Visual Intro',
    description: 'Meet the double descent phenomenon: what it is, how it relates to the bias-variance tradeoff, the interpolation regime, and a theory behind it.',
    image: `${BASE}/thumbnail-double-descent.jpg`,
  },
  {
    title: 'Double Descent: Mathematical',
    description: 'Deepen your understanding of double descent. Builds on the cubic spline example, describing in mathematical detail what is happening.',
    image: `${BASE}/thumbnail-double-descent2.jpg`,
  },
]

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />

      {/* Articles Section */}
      <section id="articles" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section divider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-primary-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                Explore Published Articles
              </h2>
              <div className="h-px w-16 bg-primary-400" />
            </div>
            <p className="text-gray-500 max-w-lg mx-auto">
              Dive into interactive visual essays covering core machine learning concepts
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <ArticleCard key={article.title} {...article} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
