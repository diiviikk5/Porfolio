import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Konami code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
]

const EasterEgg = () => {
    const [activated, setActivated] = useState(false)
    const [inputSequence, setInputSequence] = useState([])
    const [showHint, setShowHint] = useState(false)

    // Check for Konami code
    const handleKeyDown = useCallback((e) => {
        const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length)
        setInputSequence(newSequence)

        // Check if sequence matches
        if (newSequence.length === KONAMI_CODE.length &&
            newSequence.every((key, i) => key === KONAMI_CODE[i])) {
            setActivated(true)
            // Reset after some time
            setTimeout(() => setActivated(false), 10000)
        }
    }, [inputSequence])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // Show hint after 30 seconds of being on page
    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 30000)
        return () => clearTimeout(timer)
    }, [])

    // Hide hint after it's shown for a bit
    useEffect(() => {
        if (showHint) {
            const timer = setTimeout(() => setShowHint(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [showHint])

    return (
        <>
            {/* Subtle hint */}
            <AnimatePresence>
                {showHint && !activated && (
                    <motion.div
                        className="fixed bottom-4 left-4 text-xs text-white/20 font-mono z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        ↑↑↓↓←→←→BA
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Activated state - special effects! */}
            <AnimatePresence>
                {activated && (
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-[1000]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Rainbow border */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0080ff, #8000ff, #ff0080, #ff0000)',
                                backgroundSize: '200% 100%',
                            }}
                            animate={{
                                backgroundPosition: ['0% 50%', '200% 50%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            <div className="absolute inset-[3px] bg-black" />
                        </motion.div>

                        {/* Celebration text */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                            <div className="text-6xl md:text-8xl mb-4">🎮</div>
                            <div
                                className="font-orbitron text-4xl md:text-6xl font-black"
                                style={{
                                    background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0080ff, #8000ff)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                ACHIEVEMENT UNLOCKED!
                            </div>
                            <div className="text-white/60 mt-4 text-lg">
                                You found the secret Konami code! 🎉
                            </div>
                            <div className="text-white/40 mt-2 text-sm">
                                +100 Developer Points
                            </div>
                        </motion.div>

                        {/* Confetti-like particles */}
                        {Array.from({ length: 50 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: -20,
                                    backgroundColor: ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0080ff', '#8000ff'][Math.floor(Math.random() * 7)],
                                }}
                                animate={{
                                    y: window.innerHeight + 50,
                                    x: (Math.random() - 0.5) * 200,
                                    rotate: Math.random() * 720,
                                    opacity: [1, 1, 0],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                    ease: 'linear',
                                }}
                            />
                        ))}

                        {/* Stars bursting */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={`star-${i}`}
                                className="absolute text-2xl"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 600,
                                    y: (Math.random() - 0.5) * 600,
                                    opacity: [1, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 0.3 + i * 0.05,
                                    ease: 'easeOut',
                                }}
                            >
                                ⭐
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default EasterEgg
