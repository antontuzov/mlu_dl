import { Bot, Github, Twitter, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-700">MLU-Explain</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors">
              <Twitter size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400 fill-red-400" /> by MLU Team
          </p>
        </div>
      </div>
    </footer>
  )
}
