import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ArticleCardProps {
  title: string
  description: string
  image: string
  slug: string
  index: number
}

export default function ArticleCard({ title, description, image, slug, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-hover glass-card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Thumbnail image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay at bottom for depth */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-2 underline decoration-2 decoration-primary-400 underline-offset-4">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>

        <Link to={`/article/${slug}`}>
          <motion.span
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-lg
                       shadow-md shadow-primary-500/25 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/35
                       transition-all duration-300"
          >
            Dive In
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  )
}
