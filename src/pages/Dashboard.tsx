import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Users, TrendingUp, BarChart3,
  Brain, Activity, Eye, ArrowUpRight, ArrowDownRight,
  Clock, Star, ChevronRight, Settings, Bell, Search,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from 'recharts'
import Footer from '../components/Footer'

// ---------- mock data ----------
const engagementData = [
  { month: 'Jan', views: 4200, readers: 2400 },
  { month: 'Feb', views: 5800, readers: 3200 },
  { month: 'Mar', views: 7200, readers: 4100 },
  { month: 'Apr', views: 6800, readers: 3900 },
  { month: 'May', views: 9100, readers: 5200 },
  { month: 'Jun', views: 11200, readers: 6800 },
  { month: 'Jul', views: 13500, readers: 8400 },
]

const topicPopularity = [
  { name: 'Neural Nets', value: 34 },
  { name: 'Regression', value: 22 },
  { name: 'RL', value: 18 },
  { name: 'Trees', value: 14 },
  { name: 'Metrics', value: 12 },
]

const PIE_COLORS = ['#f97316', '#6366f1', '#ec4899', '#10b981', '#06b6d4']

const completionData = [
  { topic: 'Neural Nets', completed: 82, started: 95 },
  { topic: 'Regression', completed: 74, started: 88 },
  { topic: 'RL', completed: 68, started: 82 },
  { topic: 'Trees', completed: 56, started: 70 },
  { topic: 'Metrics', completed: 45, started: 62 },
]

const radarData = [
  { subject: 'Interactivity', A: 92, fullMark: 100 },
  { subject: 'Clarity', A: 88, fullMark: 100 },
  { subject: 'Visuals', A: 95, fullMark: 100 },
  { subject: 'Depth', A: 78, fullMark: 100 },
  { subject: 'Engagement', A: 85, fullMark: 100 },
  { subject: 'Retention', A: 72, fullMark: 100 },
]

const stats = [
  { label: 'Total Articles', value: '14', change: '+2', up: true, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>, color: 'from-primary-500 to-orange-400' },
  { label: 'Active Learners', value: '8.4K', change: '+12%', up: true, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: 'from-accent-500 to-indigo-400' },
  { label: 'Avg. Completion', value: '73%', change: '+5%', up: true, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, color: 'from-emerald-500 to-teal-400' },
  { label: 'Engagement Rate', value: '89%', change: '-2%', up: false, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>, color: 'from-pink-500 to-rose-400' },
]

const recentArticles = [
  { title: 'Double Descent: Mathematical', status: 'Published', views: '2.1K', time: '2h ago', color: 'bg-amber-100 text-amber-700' },
  { title: 'Double Descent: Visual Intro', status: 'Published', views: '3.8K', time: '1d ago', color: 'bg-emerald-100 text-emerald-700' },
  { title: 'Bias Variance Tradeoff', status: 'Published', views: '4.2K', time: '3d ago', color: 'bg-emerald-100 text-emerald-700' },
  { title: 'Decision Trees', status: 'Updating', views: '5.6K', time: '5d ago', color: 'bg-blue-100 text-blue-700' },
  { title: 'Random Forest', status: 'Draft', views: '—', time: '1w ago', color: 'bg-gray-100 text-gray-600' },
]

const sidebarLinks = [
  { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
  { icon: <BookOpen size={20} />, label: 'Articles', active: false },
  { icon: <Users size={20} />, label: 'Learners', active: false },
  { icon: <BarChart3 size={20} />, label: 'Analytics', active: false },
  { icon: <Brain size={20} />, label: 'ML Models', active: false },
  { icon: <Star size={20} />, label: 'Reviews', active: false },
  { icon: <Settings size={20} />, label: 'Settings', active: false },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50/50 pt-20"
    >
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed left-0 top-20 bottom-0 w-[260px] bg-white border-r border-gray-100 p-6 z-40 overflow-y-auto hidden lg:block"
        >
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.label}
                className={`sidebar-link w-full ${link.active ? 'active' : ''}`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar card */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-100">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-accent-600" />
              <span className="text-xs font-semibold text-accent-700">QUICK STATS</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">14</p>
            <p className="text-xs text-gray-500">Published articles</p>
            <div className="mt-3 h-2 bg-accent-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">78% content goal reached</p>
          </div>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-[260px] p-6 md:p-8">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-gray-900"
              >
                Dashboard
              </motion.h1>
              <p className="text-gray-500 mt-1">Welcome back! Here is your ML content overview.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-400 transition-all w-56"
                />
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                <LayoutDashboard size={18} className="text-gray-600" />
              </button>
              <button className="relative p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <Bell size={18} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <span className="text-white">{stat.icon}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                  }`}>
                    {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
            {/* Area chart (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Engagement Over Time</h3>
                  <p className="text-sm text-gray-500">Views and readers per month</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-primary-50 text-primary-600 text-xs font-semibold">Last 7 months</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="readersGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#f97316" strokeWidth={2.5} fill="url(#viewsGrad)" />
                  <Area type="monotone" dataKey="readers" stroke="#6366f1" strokeWidth={2.5} fill="url(#readersGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">Topic Popularity</h3>
              <p className="text-sm text-gray-500 mb-4">Share of reader engagement</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={topicPopularity}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {topicPopularity.map((_entry, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {topicPopularity.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    {item.name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Charts row 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-8">
            {/* Bar chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">Completion Rates</h3>
              <p className="text-sm text-gray-500 mb-4">Started vs. completed by topic</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={completionData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="topic" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="started" fill="#c7d2fe" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="completed" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">Content Quality Score</h3>
              <p className="text-sm text-gray-500 mb-4">Multi-dimensional assessment</p>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Radar name="Score" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.25} strokeWidth={2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent articles table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-6 pb-0 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Recent Articles</h3>
                <p className="text-sm text-gray-500">Latest content activity</p>
              </div>
              <button className="text-sm text-accent-600 font-semibold hover:text-accent-700 flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">Article</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Views</th>
                      <th className="pb-3 font-medium">Updated</th>
                      <th className="pb-3 font-medium w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentArticles.map((article, i) => (
                      <motion.tr
                        key={article.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.05 }}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4 font-medium text-gray-800 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                            <BookOpen size={14} className="text-accent-600" />
                          </div>
                          {article.title}
                        </td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${article.color}`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="py-4 text-gray-600">{article.views}</td>
                        <td className="py-4 text-gray-500 flex items-center gap-1">
                          <Clock size={13} />
                          {article.time}
                        </td>
                        <td className="py-4">
                          <ChevronRight size={16} className="text-gray-400" />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <div className="lg:ml-[260px]">
        <Footer />
      </div>
    </motion.div>
  )
}
