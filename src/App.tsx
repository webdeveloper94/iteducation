import { useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden">
      {/* Animated background circles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl animate-pulse"
          style={{
            background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%)`,
            width: `${Math.random() * 400 + 100}px`,
            height: `${Math.random() * 400 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 5}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Axborot Texnologiyalari
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative"
        >
          <button
            className="px-8 py-4 text-xl font-semibold text-white rounded-full relative overflow-hidden group
                     bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                     transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">Mavzularni ko'rish</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
          
          {/* Animated rings around button when hovered */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.5] : 1,
              opacity: isHovered ? [0.3, 0] : 0
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
          />
          <motion.div
            animate={{
              scale: isHovered ? [1, 2] : 1,
              opacity: isHovered ? [0.3, 0] : 0
            }}
            transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-purple-400"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default App
