import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus, Icosahedron, Octahedron, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Smooth lerp function
const lerp = (start, end, factor) => start + (end - start) * factor

// Main floating geometry that follows cursor
const FloatingGeometry = ({ mouse }) => {
    const meshRef = useRef()
    const targetPosition = useRef({ x: 0, y: 0 })
    const currentPosition = useRef({ x: 0, y: 0 })
    const velocity = useRef({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // Update target based on mouse
        targetPosition.current.x = mouse.current.x * 2
        targetPosition.current.y = mouse.current.y * 2

        // Physics-based smooth following with spring effect
        const springStrength = 0.08
        const damping = 0.85

        velocity.current.x += (targetPosition.current.x - currentPosition.current.x) * springStrength
        velocity.current.y += (targetPosition.current.y - currentPosition.current.y) * springStrength

        velocity.current.x *= damping
        velocity.current.y *= damping

        currentPosition.current.x += velocity.current.x
        currentPosition.current.y += velocity.current.y

        // Apply position
        meshRef.current.position.x = currentPosition.current.x
        meshRef.current.position.y = currentPosition.current.y

        // Rotation based on velocity (tilts in direction of movement)
        meshRef.current.rotation.x = velocity.current.y * 0.5
        meshRef.current.rotation.y = -velocity.current.x * 0.5
        meshRef.current.rotation.z += delta * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Main icosahedron */}
                <Icosahedron args={[0.8, 1]}>
                    <MeshDistortMaterial
                        color="#6366f1"
                        roughness={0.1}
                        metalness={0.9}
                        distort={0.3}
                        speed={2}
                        transparent
                        opacity={0.9}
                    />
                </Icosahedron>

                {/* Inner glow */}
                <Icosahedron args={[0.5, 1]}>
                    <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
                </Icosahedron>

                {/* Orbiting rings */}
                <OrbitingRing radius={1.2} speed={1} color="#ec4899" />
                <OrbitingRing radius={1.4} speed={-0.7} color="#22d3ee" rotationOffset={Math.PI / 4} />
                <OrbitingRing radius={1.0} speed={1.5} color="#f59e0b" rotationOffset={Math.PI / 2} />
            </group>
        </Float>
    )
}

// Orbiting ring component
const OrbitingRing = ({ radius, speed, color, rotationOffset = 0 }) => {
    const ringRef = useRef()

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * speed + rotationOffset
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + rotationOffset
        }
    })

    return (
        <group ref={ringRef}>
            <Torus args={[radius, 0.02, 16, 64]}>
                <meshBasicMaterial color={color} transparent opacity={0.6} />
            </Torus>
            {/* Small orbiting spheres on the ring */}
            {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    )
}

// Particles that react to cursor
const ReactiveParticles = ({ mouse, count = 50 }) => {
    const particlesRef = useRef()
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 8
            pos[i * 3 + 1] = (Math.random() - 0.5) * 8
            pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
        }
        return pos
    }, [count])

    const velocities = useMemo(() => {
        return Array.from({ length: count }, () => ({
            x: 0,
            y: 0,
            z: 0,
            baseX: (Math.random() - 0.5) * 8,
            baseY: (Math.random() - 0.5) * 8,
            baseZ: (Math.random() - 0.5) * 4 - 2
        }))
    }, [count])

    useFrame((state) => {
        if (!particlesRef.current) return

        const positions = particlesRef.current.geometry.attributes.position.array
        const time = state.clock.elapsedTime

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const vel = velocities[i]

            // Calculate distance from mouse
            const mouseX = mouse.current.x * 4
            const mouseY = mouse.current.y * 4
            const dx = positions[i3] - mouseX
            const dy = positions[i3 + 1] - mouseY
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Push away from cursor if close
            if (dist < 2) {
                const force = (2 - dist) * 0.1
                vel.x += (dx / dist) * force
                vel.y += (dy / dist) * force
            }

            // Return to base position
            vel.x += (vel.baseX - positions[i3]) * 0.02
            vel.y += (vel.baseY - positions[i3 + 1]) * 0.02
            vel.z += (vel.baseZ - positions[i3 + 2]) * 0.02

            // Add some floating motion
            vel.y += Math.sin(time + i * 0.1) * 0.002

            // Apply damping
            vel.x *= 0.95
            vel.y *= 0.95
            vel.z *= 0.95

            // Update positions
            positions[i3] += vel.x
            positions[i3 + 1] += vel.y
            positions[i3 + 2] += vel.z
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    )
}

// Connection lines between particles and cursor
const ConnectionLines = ({ mouse }) => {
    const linesRef = useRef()
    const lineCount = 8

    const positions = useMemo(() => {
        return new Float32Array(lineCount * 6) // 2 points per line, 3 coords each
    }, [])

    const basePositions = useMemo(() => {
        return Array.from({ length: lineCount }, (_, i) => {
            const angle = (i / lineCount) * Math.PI * 2
            return {
                x: Math.cos(angle) * 3,
                y: Math.sin(angle) * 3
            }
        })
    }, [])

    useFrame((state) => {
        if (!linesRef.current) return

        const time = state.clock.elapsedTime
        const mouseX = mouse.current.x * 2
        const mouseY = mouse.current.y * 2

        for (let i = 0; i < lineCount; i++) {
            const i6 = i * 6
            const basePos = basePositions[i]

            // Start point (follows base with some wave motion)
            positions[i6] = basePos.x + Math.sin(time + i) * 0.3
            positions[i6 + 1] = basePos.y + Math.cos(time + i) * 0.3
            positions[i6 + 2] = -2

            // End point (towards cursor with offset)
            const targetX = mouseX + Math.sin(time * 2 + i) * 0.2
            const targetY = mouseY + Math.cos(time * 2 + i) * 0.2
            positions[i6 + 3] = lerp(positions[i6], targetX, 0.3)
            positions[i6 + 4] = lerp(positions[i6 + 1], targetY, 0.3)
            positions[i6 + 5] = -1
        }

        linesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={lineCount * 2}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
        </lineSegments>
    )
}

// Main scene
const Scene = () => {
    const mouse = useRef({ x: 0, y: 0 })
    const { viewport } = useThree()

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
            {/* Ambient and point lights */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
            <pointLight position={[0, 10, -10]} intensity={0.5} color="#22d3ee" />

            {/* Main cursor follower */}
            <FloatingGeometry mouse={mouse} />

            {/* Reactive particles */}
            <ReactiveParticles mouse={mouse} count={60} />

            {/* Connection lines */}
            <ConnectionLines mouse={mouse} />
        </>
    )
}

// Main component
const CursorFollower3D = ({ className = "", style = {} }) => {
    return (
        <div
            className={`pointer-events-none ${className}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 5,
                ...style
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <Scene />
            </Canvas>
        </div>
    )
}

export default CursorFollower3D
