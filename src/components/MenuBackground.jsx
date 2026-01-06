import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MAX_COLORS = 8;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-6.0 / exp(6.0 * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export default function MenuBackground({ isOpen = true }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const rafRef = useRef(null);
  const materialRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const geometry = new THREE.PlaneGeometry(2, 2);
      const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));
      
      const material = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uCanvas: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uSpeed: { value: 0.3 },
          uRot: { value: new THREE.Vector2(1, 0) },
          uColorCount: { value: 1 },
          uColors: { value: uColorsArray },
          uTransparent: { value: 1 },
          uScale: { value: 1.2 },
          uFrequency: { value: 1.4 },
          uWarpStrength: { value: 1.2 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uMouseInfluence: { value: 0.8 },
          uParallax: { value: 0.6 },
          uNoise: { value: 0.08 }
        },
        premultipliedAlpha: true,
        transparent: true
      });
      materialRef.current = material;

      // Set dark orange color (#CC5500)
      const darkOrange = new THREE.Vector3(204 / 255, 85 / 255, 0 / 255);
      material.uniforms.uColors.value[0].copy(darkOrange);

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true
      });
      rendererRef.current = renderer;
      
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      
      container.appendChild(renderer.domElement);

      const clock = new THREE.Clock();

      const handleResize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        material.uniforms.uCanvas.value.set(w, h);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const loop = () => {
        const elapsed = clock.elapsedTime;
        material.uniforms.uTime.value = elapsed;

        // Fixed rotation at 60 degrees
        const rad = (60 * Math.PI) / 180;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        material.uniforms.uRot.value.set(c, s);

        renderer.render(scene, camera);
        rafRef.current = requestAnimationFrame(loop);
      };
      
      rafRef.current = requestAnimationFrame(loop);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error('MenuBackground Error:', error);
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
}
