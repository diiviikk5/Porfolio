import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete, minDuration = 2500 }) => {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState('loading') // loading, revealing, complete
    const [glitchText, setGlitchText] = useState('DIVIK ARORA')
    const canvasRef = useRef(null)

    // Glitch text effect
    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'
        const originalText = 'DIVIK ARORA'
        let iterations = 0

        const interval = setInterval(() => {
            if (phase === 'loading' && progress < 70) {
                setGlitchText(
                    originalText
                        .split('')
                        .map((char, i) => {
                            if (char === ' ') return ' '
                            if (i < iterations) return originalText[i]
                            return chars[Math.floor(Math.random() * chars.length)]
                        })
                        .join('')
                )
                iterations += 0.3
            } else {
                setGlitchText(originalText)
            }
        }, 50)

        return () => clearInterval(interval)
    }, [phase, progress])

    // Matrix-like background effect
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const columns = Math.floor(canvas.width / 20)
        const drops = Array(columns).fill(0)
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01'

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = '#6366f130'
            ctx.font = '15px monospace'

            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)]
                const x = i * 20
                ctx.fillText(char, x, y * 20)

                if (y * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            })
        }

        const interval = setInterval(draw, 50)
        return () => clearInterval(interval)
    }, [])

    // Progress simulation
    useEffect(() => {
        const startTime = Date.now()

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const newProgress = Math.min((elapsed / minDuration) * 100, 100)
            setProgress(newProgress)

            if (newProgress >= 100) {
                clearInterval(progressInterval)
                setPhase('revealing')
                setTimeout(() => {
                    setPhase('complete')
                    setTimeout(onComplete, 500)
                }, 1000)
            }
        }, 50)

        return () => clearInterval(progressInterval)
    }, [minDuration, onComplete])

    return (
        <AnimatePresence>
            {phase !== 'complete' && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
                    exit={{
                        clipPath: 'circle(0% at 50% 50%)',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Matrix background */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 opacity-30"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

                    {/* Center content */}
                    <div className="relative z-10 text-center">
                        {/* Logo mark */}
                        <motion.div
                            className="mb-8"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <div className="relative w-32 h-32 mx-auto">
                                {/* Outer ring */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-indigo-500/50 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                />

                                {/* Middle ring */}
                                <motion.div
                                    className="absolute inset-2 border border-purple-500/50 rounded-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                />

                                {/* Inner ring */}
                                <motion.div
                                    className="absolute inset-4 border border-pink-500/50 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                />

                                {/* Center initial */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center font-orbitron font-black text-4xl"
                                    animate={{
                                        textShadow: [
                                            '0 0 10px #6366f1',
                                            '0 0 20px #a855f7',
                                            '0 0 30px #ec4899',
                                            '0 0 20px #a855f7',
                                            '0 0 10px #6366f1',
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    D
                                </motion.div>

                                {/* Orbiting dots */}
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-indigo-500 rounded-full"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            marginTop: -4,
                                            marginLeft: -4,
                                        }}
                                        animate={{
                                            x: Math.cos((i / 4) * Math.PI * 2) * 60,
                                            y: Math.sin((i / 4) * Math.PI * 2) * 60,
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: 'linear',
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Name with glitch effect */}
                        <motion.h1
                            className="font-orbitron text-4xl md:text-6xl font-black tracking-tighter mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <span className="relative">
                                {glitchText}
                                {phase === 'loading' && progress < 70 && (
                                    <>
                                        <span
                                            className="absolute inset-0 text-cyan-400 opacity-50"
                                            style={{ transform: 'translateX(-2px)' }}
                                        >
                                            {glitchText}
                                        </span>
                                        <span
                                            className="absolute inset-0 text-pink-400 opacity-50"
                                            style={{ transform: 'translateX(2px)' }}
                                        >
                                            {glitchText}
                                        </span>
                                    </>
                                )}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="text-white/40 text-sm tracking-[0.5em] uppercase mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Developer • Creator • Innovator
                        </motion.p>

                        {/* Progress bar */}
                        <motion.div
                            className="w-64 mx-auto"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Progress text */}
                            <div className="flex justify-between mt-3 text-xs">
                                <span className="text-white/30 tracking-wider">LOADING EXPERIENCE</span>
                                <span className="font-mono text-white/60">{Math.round(progress)}%</span>
                            </div>
                        </motion.div>

                        {/* Loading indicators */}
                        <motion.div
                            className="flex justify-center gap-2 mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 h-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
                                    animate={{
                                        scaleY: [0.3, 1, 0.3],
                                        opacity: [0.3, 1, 0.3],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-8 left-8 text-xs text-white/20 font-mono">
                        <div>SYSTEM.INIT</div>
                        <div className="text-indigo-500">LOADING_ASSETS...</div>
                    </div>

                    <div className="absolute top-8 right-8 text-xs text-white/20 font-mono text-right">
                        <div>v2.0.25</div>
                        <div>BUILD.{Date.now().toString().slice(-6)}</div>
                    </div>

                    <div className="absolute bottom-8 left-8 text-xs text-white/20 font-mono">
                        <motion.div
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ● ESTABLISHING CONNECTION
                        </motion.div>
                    </div>

                    <div className="absolute bottom-8 right-8 text-xs text-white/20 font-mono text-right">
                        <div>INDIA • IST</div>
                        <div>{new Date().toLocaleTimeString()}</div>
                    </div>

                    {/* Scan line effect */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen
