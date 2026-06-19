import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ArticleCardProps {
  title: string
  description: string
  image: string
  slug: string
  index: number
  icon?: React.FC<{ size?: number; className?: string }>
}

export default function ArticleCard({ title, description, image, slug, index, icon: Icon }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group card-hover glass-card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Thumbnail image */}
      <Link to={`/article/${slug}`} className="block">
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Icon badge */}
          {Icon && (
            <div className="absolute bottom-3 right-3 w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:bg-white/30 transition-colors">
              <Icon size={24} className="text-white drop-shadow-md" />
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 pt-4">
        <Link to={`/article/${slug}`}>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-gray-800 mb-2 decoration-2 decoration-primary-400 underline underline-offset-[5px] hover:text-primary-700 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        <Link to={`/article/${slug}`}>
          <motion.span
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-lg
                       shadow-md shadow-primary-500/25 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/40
                       transition-all duration-300"
          >
            Dive In
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  )
}
