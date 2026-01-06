import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Files, Search, GitBranch, Bug, Blocks, User, Settings,
  ChevronRight, ChevronDown, FileCode, FileJson, FileText,
  Folder, FolderOpen, X, Github, Linkedin, Mail, ExternalLink,
  Terminal, Play, Coffee, Star, GitFork, Gamepad2, Heart, Satellite, Swords, Gem
} from 'lucide-react'

// Import project images
import nextplayImg from '../assets/nextplay-hero.png'
import swasthyaImg from '../assets/swasthya-hero.png'
import stellarImg from '../assets/stellar-hero.png'
import gladiatorImg from '../assets/gladiator-hero.png'
import inceptionImg from '../assets/inception-hero.jpg'

// ============================================================================
// DATA
// ============================================================================

const projects = [
  {
    name: 'nextplay',
    title: 'NextPlay',
    description: 'Game release tracker and countdown for 2026 releases including GTA 6',
    tech: ['React', 'Vite', 'IGDB API', 'Vercel'],
    image: nextplayImg,
    color: '#00d4ff',
    link: 'https://www.nextplaygame.me/',
    github: 'https://github.com/diiviikk5/Nextplay',
    type: 'tsx'
  },
  {
    name: 'swasthya',
    title: 'Swasthya',
    description: 'Holistic wellness platform with AI symptom checker',
    tech: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
    image: swasthyaImg,
    color: '#ff6b35',
    link: 'https://swasthya-gold.vercel.app/',
    github: 'https://github.com/diiviikk5/swasthya',
    type: 'tsx'
  },
  {
    name: 'stellar',
    title: 'Stellar',
    description: 'GNSS satellite forecasting console with AI-powered predictions',
    tech: ['React', 'Three.js', 'Python', 'Space APIs'],
    image: stellarImg,
    color: '#f59e0b',
    link: 'https://stellar-wine.vercel.app/',
    github: 'https://github.com/diiviikk5/stellar',
    type: 'tsx'
  },
  {
    name: 'gladiator',
    title: 'Gladiator',
    description: 'Learn algorithms through interactive gameplay',
    tech: ['React', 'WebSocket', 'Node.js', 'Gamification'],
    image: gladiatorImg,
    color: '#22c55e',
    link: 'https://gladiator-smoky.vercel.app/',
    github: 'https://github.com/diiviikk5/gladiator',
    type: 'tsx'
  },
  {
    name: 'inception',
    title: 'Inception',
    description: 'Gaming arena with NFTs and blockchain integration',
    tech: ['React', 'Solidity', 'Web3.js', 'Ethereum'],
    image: inceptionImg,
    color: '#a855f7',
    link: 'https://inception-mu.vercel.app/',
    github: 'https://github.com/diiviikk5/inception',
    type: 'tsx'
  }
]

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python',
  'C', 'C++', 'HTML', 'CSS', 'JavaScript',
  'Solidity', 'MongoDB', 'Next.js', 'Tailwind CSS'
]

// ============================================================================
// FILE ICON COMPONENT
// ============================================================================

const FileIcon = ({ type }) => {
  const iconProps = { size: 16 }
  switch (type) {
    case 'tsx':
    case 'jsx':
      return <FileCode {...iconProps} className="text-[#519aba]" />
    case 'json':
      return <FileJson {...iconProps} className="text-[#cbcb41]" />
    case 'py':
      return <FileCode {...iconProps} className="text-[#3572A5]" />
    case 'md':
      return <FileText {...iconProps} className="text-[#519aba]" />
    default:
      return <FileCode {...iconProps} className="text-[#858585]" />
  }
}

// ============================================================================
// GITHUB CONTRIBUTION GRAPH - Real Data
// ============================================================================

const GitHubContributions = ({ theme }) => {
  const username = 'diiviikk5'
  const year = 2026

  return (
    <div className="rounded-lg p-5 border transition-colors" style={{ backgroundColor: theme.sidebar, borderColor: theme.border }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github size={18} style={{ color: '#39d353' }} />
          <span className="text-base font-semibold" style={{ color: theme.text }}>{year} Contribution Graph</span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline flex items-center gap-1"
          style={{ color: '#58a6ff' }}
        >
          @{username}
          <ExternalLink size={10} />
        </a>
      </div>

      {/* Real GitHub Contribution Graph */}
      <div className="overflow-x-auto pb-2 rounded-md p-3" style={{ backgroundColor: theme.bg }}>
        <img
          src={`https://ghchart.rshah.org/39d353/${username}`}
          alt={`${username}'s ${year} GitHub Contribution Graph`}
          className="w-full h-auto"
          style={{ minWidth: '650px', filter: theme.name.includes('Light') ? 'invert(1) hue-rotate(180deg) brightness(1.2)' : 'none' }}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs" style={{ color: theme.textMuted }}>Building in public since 2024</span>
        <div className="flex items-center gap-2 text-xs" style={{ color: theme.textMuted }}>
          <span>Less</span>
          {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// THEMES
// ============================================================================

const themes = {
  'dark-plus': {
    name: 'Dark+ (Default)',
    bg: '#1e1e1e',
    sidebar: '#252526',
    activitybar: '#333333',
    tabs: '#2d2d2d',
    border: '#3c3c3c',
    text: '#cccccc',
    textMuted: '#858585',
    accent: '#007acc',
    // Syntax colors
    keyword: '#c586c0',
    function: '#dcdcaa',
    string: '#ce9178',
    type: '#4ec9b0',
    variable: '#569cd6',
    comment: '#6a9955',
    number: '#b5cea8'
  },
  'light': {
    name: 'Light+',
    bg: '#ffffff',
    sidebar: '#f3f3f3',
    activitybar: '#2c2c2c',
    tabs: '#f8f8f8',
    border: '#d4d4d4',
    text: '#1f1f1f',
    textMuted: '#6e6e6e',
    accent: '#0066b8',
    // Syntax colors for light theme
    keyword: '#af00db',
    function: '#795e26',
    string: '#a31515',
    type: '#267f99',
    variable: '#0070c1',
    comment: '#008000',
    number: '#098658'
  },
  'monokai': {
    name: 'Monokai',
    bg: '#272822',
    sidebar: '#1e1f1c',
    activitybar: '#1e1f1c',
    tabs: '#1e1f1c',
    border: '#3e3d32',
    text: '#f8f8f2',
    textMuted: '#75715e',
    accent: '#a6e22e',
    keyword: '#f92672',
    function: '#a6e22e',
    string: '#e6db74',
    type: '#66d9ef',
    variable: '#fd971f',
    comment: '#75715e',
    number: '#ae81ff'
  },
  'dracula': {
    name: 'Dracula',
    bg: '#282a36',
    sidebar: '#21222c',
    activitybar: '#21222c',
    tabs: '#21222c',
    border: '#44475a',
    text: '#f8f8f2',
    textMuted: '#6272a4',
    accent: '#bd93f9',
    keyword: '#ff79c6',
    function: '#50fa7b',
    string: '#f1fa8c',
    type: '#8be9fd',
    variable: '#ffb86c',
    comment: '#6272a4',
    number: '#bd93f9'
  },
  'one-dark': {
    name: 'One Dark Pro',
    bg: '#282c34',
    sidebar: '#21252b',
    activitybar: '#21252b',
    tabs: '#21252b',
    border: '#3e4451',
    text: '#abb2bf',
    textMuted: '#5c6370',
    accent: '#61afef',
    keyword: '#c678dd',
    function: '#61afef',
    string: '#98c379',
    type: '#e5c07b',
    variable: '#e06c75',
    comment: '#5c6370',
    number: '#d19a66'
  }
}

// ============================================================================
// MAIN LANDING - VS CODE LAYOUT
// ============================================================================

const Landing = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedFolders, setExpandedFolders] = useState(['projects', 'skills'])

  // Interactive features states
  const [currentTheme, setCurrentTheme] = useState('dark-plus')
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExtensions, setShowExtensions] = useState(false)
  const [showHireMe, setShowHireMe] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [extensionEnabled, setExtensionEnabled] = useState(false)

  const theme = themes[currentTheme]

  // Sync theme to CSS variables
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--vscode-bg', theme.bg)
    root.style.setProperty('--vscode-sidebar', theme.sidebar)
    root.style.setProperty('--vscode-activitybar', theme.activitybar)
    root.style.setProperty('--vscode-editor', theme.bg)
    root.style.setProperty('--vscode-border', theme.border)
    root.style.setProperty('--vscode-text', theme.text)
    root.style.setProperty('--vscode-text-muted', theme.textMuted)
    root.style.setProperty('--vscode-accent', theme.accent)
    root.style.setProperty('--vscode-keyword', theme.keyword)
    root.style.setProperty('--vscode-function', theme.function)
    root.style.setProperty('--vscode-string', theme.string)
    root.style.setProperty('--vscode-type', theme.type)
    root.style.setProperty('--vscode-variable', theme.variable)
    root.style.setProperty('--vscode-comment', theme.comment)
    root.style.setProperty('--vscode-number', theme.number)
  }, [theme])

  const toggleFolder = (folder) => {
    setExpandedFolders(prev =>
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    )
  }

  const handleShake = () => {
    setExtensionEnabled(true)
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  const searchResults = searchQuery.trim() ?
    [...projects.map(p => ({ type: 'project', name: p.title, id: p.name })),
    { type: 'section', name: 'Skills', id: 'skills' },
    { type: 'section', name: 'Contact', id: 'contact' },
    { type: 'section', name: 'About', id: 'about' }
    ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : []

  const tabs = [
    { id: 'about', name: 'README.md', icon: 'md' },
    { id: 'projects', name: 'projects.tsx', icon: 'tsx' },
    { id: 'contact', name: 'contact.json', icon: 'json' }
  ]

  return (
    <div
      className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${isShaking ? 'animate-shake' : ''}`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              className="w-full max-w-xl rounded-lg overflow-hidden shadow-2xl"
              style={{ backgroundColor: theme.sidebar, border: `1px solid ${theme.border}` }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-3 border-b" style={{ borderColor: theme.border }}>
                <Search size={18} style={{ color: theme.accent }} />
                <input
                  type="text"
                  placeholder="Search projects, skills, contact..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: theme.text }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.border, color: theme.text }}>ESC</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors"
                    style={{
                      borderLeft: activeTab === result.id ? `2px solid ${theme.accent}` : '2px solid transparent'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = `${theme.accent}20`}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => {
                      setActiveTab(result.id)
                      setShowSearch(false)
                      setSearchQuery('')
                    }}
                  >
                    <FileCode size={16} style={{ color: theme.accent }} />
                    <span className="text-sm" style={{ color: theme.text }}>{result.name}</span>
                    <span className="text-xs ml-auto" style={{ color: theme.textMuted }}>{result.type}</span>
                  </div>
                )) : searchQuery.trim() ? (
                  <div className="px-4 py-8 text-center text-sm" style={{ color: theme.textMuted }}>No results found</div>
                ) : (
                  <div className="px-4 py-8 text-center text-sm" style={{ color: theme.textMuted }}>Start typing to search...</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl p-6"
              style={{ backgroundColor: theme.sidebar, border: `1px solid ${theme.border}` }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: theme.text }}>Theme Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 rounded transition-colors"
                  style={{ color: theme.text }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = `${theme.accent}20`}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(themes).map(([key, t]) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                    style={{
                      backgroundColor: currentTheme === key ? `${t.accent}20` : t.bg,
                      color: t.text,
                      border: `1px solid ${currentTheme === key ? t.accent : theme.border}`
                    }}
                    onClick={() => setCurrentTheme(key)}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accent }} />
                    <span className="text-sm font-medium">{t.name}</span>
                    {currentTheme === key && <Star size={14} className="ml-auto" style={{ color: t.accent }} />}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extensions Modal */}
      <AnimatePresence>
        {showExtensions && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExtensions(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl p-6"
              style={{ backgroundColor: theme.sidebar, border: `1px solid ${theme.border}` }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: theme.text }}>Extensions</h3>
                <button
                  onClick={() => setShowExtensions(false)}
                  className="p-1 rounded transition-colors"
                  style={{ color: theme.text }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = `${theme.accent}20`}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={18} />
                </button>
              </div>
              <div
                className="p-4 rounded-lg border cursor-pointer transition-colors"
                style={{
                  borderColor: extensionEnabled ? '#ff4444' : theme.border,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = `${theme.accent}10`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => {
                  handleShake()
                  setShowExtensions(false)
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <Bug size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-red-400">⚠️ Don't Enable This</h4>
                    <p className="text-xs" style={{ color: theme.textMuted }}>v6.6.6 • You've been warned...</p>
                  </div>
                  <div className={`ml-auto px-2 py-1 rounded text-xs ${extensionEnabled ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {extensionEnabled ? 'Enabled' : 'Install'}
                  </div>
                </div>
                <p className="text-xs" style={{ color: theme.text, opacity: 0.7 }}>This extension will cause unexpected behavior. Click to enable at your own risk! 🔥</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Me Modal */}
      <AnimatePresence>
        {showHireMe && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHireMe(false)}
          >
            <motion.div
              className="w-full max-w-sm rounded-lg overflow-hidden shadow-2xl p-8 text-center"
              style={{ backgroundColor: theme.sidebar, border: `1px solid ${theme.border}` }}
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 5 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>Premium Feature</h3>
              <p className="text-sm mb-6" style={{ color: theme.textMuted }}>Hire me to unlock this feature and many more exciting capabilities!</p>
              <a
                href="mailto:divikstudy100@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: theme.accent, color: '#fff' }}
              >
                <Mail size={18} />
                Hire Me Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Bar */}
      <div
        className="h-8 flex items-center justify-between px-4 text-xs select-none"
        style={{ backgroundColor: theme.activitybar, borderBottom: `1px solid ${theme.border}` }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
        </div>
        <span className="font-medium">Divik Arora - Portfolio</span>
        <div className="w-16" />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">

        {/* Activity Bar */}
        <div
          className="w-12 flex flex-col items-center py-2"
          style={{ backgroundColor: theme.activitybar, borderRight: `1px solid ${theme.border}` }}
        >
          <div
            className={`activity-icon ${sidebarOpen ? 'active' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Explorer"
          >
            <Files size={24} />
          </div>
          <div
            className="activity-icon"
            onClick={() => setShowSearch(true)}
            title="Search (Ctrl+P)"
          >
            <Search size={24} />
          </div>
          <div
            className="activity-icon"
            onClick={() => setShowHireMe(true)}
            title="Source Control"
          >
            <GitBranch size={24} />
          </div>
          <div
            className="activity-icon"
            onClick={() => setShowHireMe(true)}
            title="Debug"
          >
            <Bug size={24} />
          </div>
          <div
            className="activity-icon"
            onClick={() => setShowExtensions(true)}
            title="Extensions"
          >
            <Blocks size={24} />
          </div>

          <div className="flex-1" />

          <a
            href="https://github.com/diiviikk5"
            target="_blank"
            rel="noopener noreferrer"
            className="activity-icon"
            title="GitHub"
          >
            <Github size={24} />
          </a>
          <div
            className="activity-icon"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            <Settings size={24} />
          </div>
        </div>

        {/* Sidebar - Explorer */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ backgroundColor: theme.sidebar, borderRight: `1px solid ${theme.border}`, color: theme.text }}
              className="overflow-hidden flex flex-col"
            >
              <div className="p-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.textMuted }}>
                Explorer
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* VIKPORT Section Title */}
                <div
                  className="flex items-center gap-1 py-1 px-4 text-xs font-bold cursor-default select-none transition-colors"
                  style={{ backgroundColor: `${theme.accent}15` }}
                >
                  <ChevronDown size={14} />
                  <span>VIKPORT</span>
                </div>

                <div className="py-2">
                  {/* README.md */}
                  <div
                    className="flex items-center gap-2 py-1 px-6 text-sm cursor-pointer transition-colors"
                    style={{
                      backgroundColor: activeTab === 'about' ? `${theme.accent}20` : 'transparent',
                      color: activeTab === 'about' ? theme.text : theme.textMuted
                    }}
                    onMouseEnter={e => activeTab !== 'about' && (e.currentTarget.style.backgroundColor = `${theme.accent}10`)}
                    onMouseLeave={e => activeTab !== 'about' && (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => setActiveTab('about')}
                  >
                    <FileIcon type="md" />
                    <span>README.md</span>
                  </div>

                  {/* Projects Folder */}
                  <div>
                    <div
                      className="flex items-center gap-2 py-1 px-6 text-sm cursor-pointer transition-colors"
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = `${theme.accent}10`}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => toggleFolder('projects')}
                      style={{ color: expandedFolders.includes('projects') ? theme.text : theme.textMuted }}
                    >
                      {expandedFolders.includes('projects') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <div className="flex items-center gap-2">
                        {expandedFolders.includes('projects') ? <FolderOpen size={16} style={{ color: theme.accent }} /> : <Folder size={16} style={{ color: theme.accent }} />}
                        <span>projects</span>
                      </div>
                    </div>

                    {expandedFolders.includes('projects') && (
                      <div className="pl-4">
                        {projects.map((project) => (
                          <div
                            key={project.name}
                            className="flex items-center gap-2 py-1 px-8 text-sm cursor-pointer transition-colors"
                            style={{
                              backgroundColor: activeTab === project.name ? `${theme.accent}20` : 'transparent',
                              color: activeTab === project.name ? theme.text : theme.textMuted
                            }}
                            onMouseEnter={e => activeTab !== project.name && (e.currentTarget.style.backgroundColor = `${theme.accent}10`)}
                            onMouseLeave={e => activeTab !== project.name && (e.currentTarget.style.backgroundColor = 'transparent')}
                            onClick={() => setActiveTab(project.name)}
                          >
                            <FileIcon type={project.type} />
                            <span>{project.name}.{project.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Skills Folder */}
                  <div>
                    <div
                      className="flex items-center gap-2 py-1 px-6 text-sm cursor-pointer transition-colors"
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = `${theme.accent}10`}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={() => toggleFolder('skills')}
                      style={{ color: expandedFolders.includes('skills') ? theme.text : theme.textMuted }}
                    >
                      {expandedFolders.includes('skills') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <div className="flex items-center gap-2">
                        {expandedFolders.includes('skills') ? <FolderOpen size={16} style={{ color: theme.accent }} /> : <Folder size={16} style={{ color: theme.accent }} />}
                        <span>skills</span>
                      </div>
                    </div>

                    {expandedFolders.includes('skills') && (
                      <div className="pl-4">
                        <div
                          className="flex items-center gap-2 py-1 px-8 text-sm cursor-pointer transition-colors"
                          style={{
                            backgroundColor: activeTab === 'skills' ? `${theme.accent}20` : 'transparent',
                            color: activeTab === 'skills' ? theme.text : theme.textMuted
                          }}
                          onMouseEnter={e => activeTab !== 'skills' && (e.currentTarget.style.backgroundColor = `${theme.accent}10`)}
                          onMouseLeave={e => activeTab !== 'skills' && (e.currentTarget.style.backgroundColor = 'transparent')}
                          onClick={() => setActiveTab('skills')}
                        >
                          <FileIcon type="tsx" />
                          <span>skills.tsx</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Section */}
                  <div
                    className="flex items-center gap-2 py-1 px-6 text-sm cursor-pointer transition-colors"
                    style={{
                      backgroundColor: activeTab === 'contact' ? `${theme.accent}20` : 'transparent',
                      color: activeTab === 'contact' ? theme.text : theme.textMuted
                    }}
                    onMouseEnter={e => activeTab !== 'contact' && (e.currentTarget.style.backgroundColor = `${theme.accent}10`)}
                    onMouseLeave={e => activeTab !== 'contact' && (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => setActiveTab('contact')}
                  >
                    <FileIcon type="json" />
                    <span>contact.json</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: theme.bg }}>

          {/* Tabs */}
          <div className="h-[35px] flex items-center" style={{ backgroundColor: theme.tabs, borderBottom: `1px solid ${theme.border}` }}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="flex items-center gap-2 px-4 h-full text-sm cursor-pointer transition-colors"
                style={{
                  backgroundColor: activeTab === tab.id ? theme.bg : 'transparent',
                  color: activeTab === tab.id ? theme.text : theme.textMuted,
                  borderTop: activeTab === tab.id ? `2px solid ${theme.accent}` : '2px solid transparent',
                  borderRight: `1px solid ${theme.border}`
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <FileIcon type={tab.icon} />
                <span>{tab.name}</span>
              </div>
            ))}
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed">

            {/* ABOUT / README */}
            {activeTab === 'about' && (
              <div className="max-w-4xl">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
                    <span style={{ color: theme.comment }}># </span>
                    Divik Arora
                  </h1>
                  <p className="text-lg" style={{ color: theme.comment }}>
                    // I like  code , and contribute to open source .
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
                    <span style={{ color: theme.comment }}>## </span>
                    About Me
                  </h2>
                  <p className="leading-relaxed mb-4" style={{ color: theme.text }}>
                    i enjoy coding and thats what matters , i like to build things and you can check those out on my github !
                  </p>
                  <p className="leading-relaxed" style={{ color: theme.text }}>
                    Currently into Ai , Fullstack   and just building stuff end to end.
                  </p>
                </div>

                {/* GitHub Contributions */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
                    <span style={{ color: theme.comment }}>## </span>
                    Contributions
                  </h2>
                  <GitHubContributions theme={theme} />
                </div>

                {/* Quick Links */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
                    <span style={{ color: theme.comment }}>## </span>
                    Quick Links
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/diiviikk5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
                      style={{ backgroundColor: theme.sidebar, color: theme.text, border: `1px solid ${theme.border}` }}
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/divik-arora-2b091636b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
                      style={{ backgroundColor: theme.sidebar, color: theme.text, border: `1px solid ${theme.border}` }}
                    >
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="mailto:divikstudy100@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
                      style={{ backgroundColor: theme.sidebar, color: theme.text, border: `1px solid ${theme.border}` }}
                    >
                      <Mail size={16} />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Projects', value: '25+' },
                    { label: 'Years Exp', value: '4+' },
                    { label: 'Commits', value: '1K+' },
                    { label: 'Stars', value: '50+' }
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded"
                      style={{ backgroundColor: theme.sidebar, border: `1px solid ${theme.border}` }}
                    >
                      <div className="text-2xl font-bold" style={{ color: theme.number }}>{stat.value}</div>
                      <div className="text-xs" style={{ color: theme.textMuted }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="max-w-5xl">
                <div className="mb-6">
                  <span style={{ color: theme.keyword }}>const</span>
                  <span style={{ color: theme.variable }}> projects</span>
                  <span style={{ color: theme.text }}> = [</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
                  {projects.map((project, i) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-lg overflow-hidden transition-colors group"
                      style={{ backgroundColor: theme.sidebar, border: `1px solid ${theme.border}` }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60"
                          style={{ background: `linear-gradient(to top, ${theme.sidebar}, transparent)` }}
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileIcon type={project.type} />
                          <h3 className="font-semibold" style={{ color: theme.text }}>{project.title}</h3>
                        </div>

                        <p className="text-sm mb-3" style={{ color: theme.textMuted }}>{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded"
                              style={{ backgroundColor: theme.bg, color: theme.type }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs hover:underline"
                            style={{ color: theme.accent }}
                          >
                            <ExternalLink size={12} />
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs"
                            style={{ color: theme.textMuted }}
                          >
                            <Github size={12} />
                            Source
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <span style={{ color: theme.text }}>];</span>
                </div>
              </div>
            )}

            {/* SKILLS */}
            {activeTab === 'skills' && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <span style={{ color: theme.keyword }}>export const</span>
                  <span style={{ color: theme.variable }}> skills</span>
                  <span style={{ color: theme.text }}> = [</span>
                </div>

                <div className="pl-6 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 group"
                    >
                      <span style={{ color: theme.textMuted }}>{i < 10 ? `0${i}` : i}</span>
                      <span style={{ color: theme.string }} className="group-hover:underline cursor-default">
                        "{skill}"
                      </span>
                      {i < skills.length - 1 && <span style={{ color: theme.text }}>,</span>}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <span style={{ color: theme.text }}>];</span>
                </div>
              </div>
            )}

            {/* CONTACT */}
            {activeTab === 'contact' && (
              <div className="max-w-2xl">
                <div className="mb-4">
                  <span style={{ color: theme.text }}>{'{'}</span>
                </div>

                <div className="pl-4 space-y-2">
                  <div>
                    <span style={{ color: theme.string }}>"name"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <span style={{ color: theme.variable }}>"Divik Arora"</span>
                    <span style={{ color: theme.text }}>,</span>
                  </div>
                  <div>
                    <span style={{ color: theme.string }}>"email"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <a href="mailto:divikstudy100@gmail.com" className="hover:underline" style={{ color: theme.variable }}>"divikstudy100@gmail.com"</a>
                    <span style={{ color: theme.text }}>,</span>
                  </div>
                  <div>
                    <span style={{ color: theme.string }}>"github"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <a href="https://github.com/diiviikk5" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.variable }}>"github.com/diiviikk5"</a>
                    <span style={{ color: theme.text }}>,</span>
                  </div>
                  <div>
                    <span style={{ color: theme.string }}>"linkedin"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <a href="https://www.linkedin.com/in/divik-arora-2b091636b/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.variable }}>"linkedin.com/in/divik-arora"</a>
                    <span style={{ color: theme.text }}>,</span>
                  </div>
                  <div>
                    <span style={{ color: theme.string }}>"location"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <span style={{ color: theme.variable }}>"India"</span>
                    <span style={{ color: theme.text }}>,</span>
                  </div>
                  <div>
                    <span style={{ color: theme.string }}>"available"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <span style={{ color: theme.keyword }}>true</span>
                    <span style={{ color: theme.text }}>,</span>
                  </div>
                  <div>
                    <span style={{ color: theme.string }}>"message"</span>
                    <span style={{ color: theme.text }}>: </span>
                    <span style={{ color: theme.variable }}>"Let's build something amazing together!"</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span style={{ color: theme.text }}>{'}'}</span>
                </div>

                <div className="mt-8">
                  <a
                    href="mailto:divikstudy100@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium transition-colors"
                    style={{ backgroundColor: theme.accent, color: '#ffffff' }}
                  >
                    <Mail size={18} />
                    Send Message
                  </a>
                </div>
              </div>
            )}

            {/* Individual Project View */}
            {projects.find(p => p.name === activeTab) && (
              <div className="max-w-4xl">
                {(() => {
                  const project = projects.find(p => p.name === activeTab)
                  return (
                    <>
                      <div className="mb-6">
                        <span style={{ color: theme.comment }}>// {project.title}</span>
                      </div>

                      <div className="mb-6 rounded-lg overflow-hidden border" style={{ borderColor: theme.border }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      <div className="mb-6">
                        <span style={{ color: theme.keyword }}>export const</span>
                        <span style={{ color: theme.function }}> {project.name.replace('-', '_')}</span>
                        <span style={{ color: theme.text }}> = {'{'}</span>
                      </div>

                      <div className="pl-4 space-y-2">
                        <div>
                          <span style={{ color: theme.variable }}>description</span>
                          <span style={{ color: theme.text }}>: </span>
                          <span style={{ color: theme.string }}>"{project.description}"</span>
                          <span style={{ color: theme.text }}>,</span>
                        </div>
                        <div>
                          <span style={{ color: theme.variable }}>tech</span>
                          <span style={{ color: theme.text }}>: [</span>
                          {project.tech.map((t, i) => (
                            <span key={t}>
                              <span style={{ color: theme.string }}>"{t}"</span>
                              {i < project.tech.length - 1 && <span style={{ color: theme.text }}>, </span>}
                            </span>
                          ))}
                          <span style={{ color: theme.text }}>],</span>
                        </div>
                        <div>
                          <span style={{ color: theme.variable }}>live</span>
                          <span style={{ color: theme.text }}>: </span>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.string }}>"{project.link}"</a>
                          <span style={{ color: theme.text }}>,</span>
                        </div>
                        <div>
                          <span style={{ color: theme.variable }}>github</span>
                          <span style={{ color: theme.text }}>: </span>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: theme.string }}>"{project.github}"</a>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span style={{ color: theme.text }}>{'}'};</span>
                      </div>

                      <div className="mt-8 flex gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2 rounded transition-colors"
                          style={{ backgroundColor: theme.accent, color: '#ffffff' }}
                        >
                          <Play size={16} />
                          View Live
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2 rounded transition-colors"
                          style={{ backgroundColor: theme.sidebar, color: theme.text, border: `1px solid ${theme.border}` }}
                        >
                          <Github size={16} />
                          Source Code
                        </a>
                      </div>
                    </>
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="px-3 py-1 flex items-center justify-between text-xs"
        style={{ backgroundColor: theme.accent, color: '#ffffff' }}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <GitBranch size={14} />
            main
          </span>
          <span className="flex items-center gap-1">
            <Coffee size={14} />
            Available for hire
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>TypeScript React</span>
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  )
}

export default Landing