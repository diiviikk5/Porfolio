import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, RoundedBox, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Helper function for smooth interpolation
const lerp = (start, end, factor) => start + (end - start) * factor

// Cute Robot Face that follows cursor
const RobotFace = ({ mouse }) => {
    const headRef = useRef()
    const leftEyeRef = useRef()
    const rightEyeRef = useRef()
    const antennaRef = useRef()

    const targetRotation = useRef({ x: 0, y: 0 })
    const currentRotation = useRef({ x: 0, y: 0 })

    const [isHappy, setIsHappy] = useState(false)
    const [isBlinking, setIsBlinking] = useState(false)

    // Random blinking
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setIsBlinking(true)
                setTimeout(() => setIsBlinking(false), 150)
            }
        }, 2000)

        return () => clearInterval(blinkInterval)
    }, [])

    // Happy expression when cursor is close to center
    useEffect(() => {
        const checkHappy = setInterval(() => {
            const dist = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2)
            setIsHappy(dist < 0.3)
        }, 100)

        return () => clearInterval(checkHappy)
    }, [mouse])

    useFrame((state, delta) => {
        if (!headRef.current) return

        // Calculate target rotation based on mouse
        targetRotation.current.x = -mouse.current.y * 0.3
        targetRotation.current.y = mouse.current.x * 0.4

        // Smooth follow
        currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.08)
        currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.08)

        // Apply rotation to head
        headRef.current.rotation.x = currentRotation.current.x
        headRef.current.rotation.y = currentRotation.current.y

        // Eye pupils follow cursor more
        const eyeOffsetX = mouse.current.x * 0.08
        const eyeOffsetY = mouse.current.y * 0.05

        if (leftEyeRef.current) {
            leftEyeRef.current.position.x = -0.25 + eyeOffsetX
            leftEyeRef.current.position.y = 0.15 + eyeOffsetY
        }
        if (rightEyeRef.current) {
            rightEyeRef.current.position.x = 0.25 + eyeOffsetX
            rightEyeRef.current.position.y = 0.15 + eyeOffsetY
        }

        // Antenna wobble
        if (antennaRef.current) {
            antennaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1 + currentRotation.current.y * 0.5
        }
    })

    const eyeScale = isBlinking ? [1, 0.1, 1] : [1, 1, 1]

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={headRef}>
                {/* Head */}
                <RoundedBox args={[1.2, 1, 0.8]} radius={0.15} smoothness={4}>
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </RoundedBox>

                {/* Face plate */}
                <RoundedBox args={[1, 0.7, 0.1]} radius={0.1} position={[0, 0, 0.4]}>
                    <meshStandardMaterial
                        color="#0f0f1a"
                        metalness={0.5}
                        roughness={0.3}
                    />
                </RoundedBox>

                {/* Left Eye Socket */}
                <mesh position={[-0.25, 0.15, 0.45]}>
                    <circleGeometry args={[0.18, 32]} />
                    <meshBasicMaterial color="#6366f1" />
                </mesh>

                {/* Right Eye Socket */}
                <mesh position={[0.25, 0.15, 0.45]}>
                    <circleGeometry args={[0.18, 32]} />
                    <meshBasicMaterial color="#6366f1" />
                </mesh>

                {/* Left Pupil */}
                <mesh ref={leftEyeRef} position={[-0.25, 0.15, 0.47]} scale={eyeScale}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Right Pupil */}
                <mesh ref={rightEyeRef} position={[0.25, 0.15, 0.47]} scale={eyeScale}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                {/* Mouth */}
                <mesh position={[0, -0.2, 0.46]}>
                    <planeGeometry args={[isHappy ? 0.4 : 0.3, isHappy ? 0.15 : 0.05]} />
                    <meshBasicMaterial color={isHappy ? "#22c55e" : "#6366f1"} />
                </mesh>

                {/* Cheeks glow when happy */}
                {isHappy && (
                    <>
                        <mesh position={[-0.4, 0, 0.42]}>
                            <circleGeometry args={[0.08, 32]} />
                            <meshBasicMaterial color="#ec4899" transparent opacity={0.6} />
                        </mesh>
                        <mesh position={[0.4, 0, 0.42]}>
                            <circleGeometry args={[0.08, 32]} />
                            <meshBasicMaterial color="#ec4899" transparent opacity={0.6} />
                        </mesh>
                    </>
                )}

                {/* Antenna */}
                <group ref={antennaRef} position={[0, 0.6, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <Sphere args={[0.08, 16, 16]} position={[0, 0.2, 0]}>
                        <meshStandardMaterial
                            color="#ec4899"
                            emissive="#ec4899"
                            emissiveIntensity={0.5}
                            metalness={0.5}
                            roughness={0.3}
                        />
                    </Sphere>
                </group>

                {/* Ear pieces */}
                <RoundedBox args={[0.15, 0.3, 0.3]} radius={0.05} position={[-0.65, 0.1, 0]}>
                    <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
                </RoundedBox>
                <RoundedBox args={[0.15, 0.3, 0.3]} radius={0.05} position={[0.65, 0.1, 0]}>
                    <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
                </RoundedBox>

                {/* Status LEDs */}
                <mesh position={[-0.35, -0.35, 0.42]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#22c55e" />
                </mesh>
                <mesh position={[-0.25, -0.35, 0.42]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#f59e0b" />
                </mesh>
                <mesh position={[-0.15, -0.35, 0.42]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#ef4444" />
                </mesh>
            </group>
        </Float>
    )
}

// Scene component
const Scene = () => {
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6366f1" />
            <RobotFace mouse={mouse} />
        </>
    )
}

// Main exported component
const RobotMascot = ({
    className = "",
    size = 200,
    position = { bottom: 30, right: 30 },
    style = {}
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        // Show after a short delay (after loading screen)
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    if (!isVisible) return null

    return (
        <div
            className={`fixed cursor-pointer transition-all duration-500 ease-out ${className}`}
            style={{
                bottom: position.bottom,
                right: position.right,
                width: isExpanded ? size * 1.5 : size,
                height: isExpanded ? size * 1.5 : size,
                zIndex: 50,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                ...style
            }}
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-full opacity-30 blur-xl"
                style={{
                    background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
                }}
            />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <Scene />
            </Canvas>

            {/* Tooltip */}
            <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/80 whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
            >
                👋 Hi there!
            </div>
        </div>
    )
}

export default RobotMascot
