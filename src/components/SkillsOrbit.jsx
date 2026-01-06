import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Single orbiting skill
const OrbitingSkill = ({ skill, index, total, radius, speed, onHover }) => {
    const meshRef = useRef()
    const textRef = useRef()
    const [isHovered, setIsHovered] = useState(false)

    const angle = (index / total) * Math.PI * 2
    const orbitTilt = (index % 3) * 0.3 // Different orbit planes

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.elapsedTime * speed
        const currentAngle = angle + time

        // Calculate 3D position on tilted orbit
        const x = Math.cos(currentAngle) * radius
        const y = Math.sin(currentAngle) * radius * Math.cos(orbitTilt)
        const z = Math.sin(currentAngle) * radius * Math.sin(orbitTilt) - 2

        meshRef.current.position.set(x, y, z)

        // Always face camera
        meshRef.current.lookAt(0, 0, 5)
    })

    return (
        <group
            ref={meshRef}
            onPointerEnter={() => { setIsHovered(true); onHover(skill) }}
            onPointerLeave={() => { setIsHovered(false); onHover(null) }}
        >
            {/* Skill node */}
            <Sphere args={[isHovered ? 0.2 : 0.12, 16, 16]}>
                <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={isHovered ? 0.8 : 0.3}
                    metalness={0.5}
                    roughness={0.3}
                />
            </Sphere>

            {/* Skill label */}
            <Text
                position={[0, 0.3, 0]}
                fontSize={isHovered ? 0.15 : 0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.woff"
            >
                {skill.name}
            </Text>
        </group>
    )
}

// Center core
const CenterCore = ({ hoveredSkill }) => {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Main core */}
                <Sphere args={[0.5, 32, 32]}>
                    <MeshDistortMaterial
                        color={hoveredSkill?.color || "#6366f1"}
                        roughness={0.1}
                        metalness={0.9}
                        distort={0.3}
                        speed={3}
                    />
                </Sphere>

                {/* Inner glow */}
                <Sphere args={[0.3, 32, 32]}>
                    <meshBasicMaterial
                        color={hoveredSkill?.color || "#a855f7"}
                        transparent
                        opacity={0.5}
                    />
                </Sphere>

                {/* Outer ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.7, 0.02, 16, 64]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                </mesh>

                {/* Second ring */}
                <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                    <torusGeometry args={[0.8, 0.015, 16, 64]} />
                    <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
                </mesh>
            </group>
        </Float>
    )
}

// Connection lines from center to skills
const ConnectionLines = ({ skills, radius }) => {
    const linesRef = useRef()

    useFrame((state) => {
        if (!linesRef.current) return

        const positions = linesRef.current.geometry.attributes.position.array
        const time = state.clock.elapsedTime * 0.3

        skills.forEach((skill, i) => {
            const angle = (i / skills.length) * Math.PI * 2 + time
            const orbitTilt = (i % 3) * 0.3

            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius * Math.cos(orbitTilt)
            const z = Math.sin(angle) * radius * Math.sin(orbitTilt) - 2

            const i6 = i * 6
            // Start (center)
            positions[i6] = 0
            positions[i6 + 1] = 0
            positions[i6 + 2] = 0
            // End (skill position)
            positions[i6 + 3] = x
            positions[i6 + 4] = y
            positions[i6 + 5] = z
        })

        linesRef.current.geometry.attributes.position.needsUpdate = true
    })

    const positions = useMemo(() => {
        return new Float32Array(skills.length * 6)
    }, [skills.length])

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={skills.length * 2}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
        </lineSegments>
    )
}

// Main scene
const Scene = ({ skills, onHover, hoveredSkill }) => {
    const radius = 2.5

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
            <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ec4899" />

            <CenterCore hoveredSkill={hoveredSkill} />
            <ConnectionLines skills={skills} radius={radius} />

            {skills.map((skill, i) => (
                <OrbitingSkill
                    key={skill.name}
                    skill={skill}
                    index={i}
                    total={skills.length}
                    radius={radius}
                    speed={0.3}
                    onHover={onHover}
                />
            ))}
        </>
    )
}

// Main exported component
const SkillsOrbit = ({ className = "" }) => {
    const [hoveredSkill, setHoveredSkill] = useState(null)

    const skills = [
        { name: 'React', color: '#61DAFB' },
        { name: 'Node.js', color: '#339933' },
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'Python', color: '#3776AB' },
        { name: 'AWS', color: '#FF9900' },
        { name: 'Docker', color: '#2496ED' },
        { name: 'MongoDB', color: '#47A248' },
        { name: 'PostgreSQL', color: '#336791' },
        { name: 'Solidity', color: '#627EEA' },
        { name: 'GraphQL', color: '#E535AB' },
        { name: 'Next.js', color: '#ffffff' },
        { name: 'Three.js', color: '#049EF4' },
    ]

    return (
        <div className={`relative ${className}`}>
            {/* 3D Canvas */}
            <div className="w-full h-[500px] md:h-[600px]">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <Scene
                        skills={skills}
                        onHover={setHoveredSkill}
                        hoveredSkill={hoveredSkill}
                    />
                </Canvas>
            </div>

            {/* Hovered skill info */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: hoveredSkill ? 1 : 0,
                    y: hoveredSkill ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
            >
                {hoveredSkill && (
                    <div
                        className="px-6 py-3 backdrop-blur-md rounded-full border border-white/20"
                        style={{ backgroundColor: `${hoveredSkill.color}20` }}
                    >
                        <span
                            className="font-bold text-lg"
                            style={{ color: hoveredSkill.color }}
                        >
                            {hoveredSkill.name}
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Instruction text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-wider">
                HOVER TO EXPLORE
            </div>
        </div>
    )
}

export default SkillsOrbit
