import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Icosahedron } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// ─── Data ────────────────────────────────────────────────────────────────────
const steps = [
  {
    id: 1,
    emoji: '🗄️',
    title: 'Data Collection & Architecture',
    desc: 'Extracting unstructured and structured data from APIs, web scraping, and relational databases (SQL) to build a robust foundational dataset.',
    color: '#38bdf8',
  },
  {
    id: 2,
    emoji: '🔬',
    title: 'EDA & Preprocessing',
    desc: 'Executing Exploratory Data Analysis (EDA). Cleaning, transforming, and visualizing data using Pandas, NumPy, and Seaborn to uncover hidden patterns.',
    color: '#fb923c',
  },
  {
    id: 3,
    emoji: '⚙️',
    title: 'Feature Engineering',
    desc: 'Applying statistical modeling, dimensionality reduction, and feature scaling to optimize the dataset for high-performance machine learning algorithms.',
    color: '#a78bfa',
  },
  {
    id: 4,
    emoji: '🧠',
    title: 'Model Training & Tuning',
    desc: 'Architecting and training predictive models and Deep Neural Networks using Scikit-Learn and TensorFlow. Fine-tuning hyperparameters for maximum accuracy.',
    color: '#c084fc',
  },
  {
    id: 5,
    emoji: '🚀',
    title: 'AI Integration & Deployment',
    desc: 'Integrating models with Large Language Models (LLMs) via RAG pipelines (ChromaDB) and deploying them to production using scalable Flask REST APIs.',
    color: '#34d399',
  },
];

// ─── Node positions around the core (on a flat ring) ─────────────────────────
const NODE_RADIUS = 3.6;
const nodeBasePositions: [number, number, number][] = steps.map((_, i) => {
  const angle = (i / steps.length) * Math.PI * 2;
  return [
    Math.cos(angle) * NODE_RADIUS,
    0,
    Math.sin(angle) * NODE_RADIUS,
  ];
});

// ─── Single orbiting node ─────────────────────────────────────────────────────
const OrbNode = ({
  basePosition,
  isActive,
  color,
  activeColor,
}: {
  basePosition: [number, number, number];
  isActive: boolean;
  color: string;
  activeColor: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Pulse scale on active
    const targetScale = isActive ? 1.55 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    // Gentle bob for active node
    meshRef.current.position.y = isActive ? Math.sin(t * 2.5) * 0.25 : 0;
  });

  const endColor = isActive ? activeColor : color;

  return (
    <Sphere ref={meshRef} args={[0.26, 32, 32]} position={basePosition}>
      <meshStandardMaterial
        ref={matRef}
        color={endColor}
        emissive={endColor}
        emissiveIntensity={isActive ? 1.2 : 0.35}
        metalness={0.6}
        roughness={0.2}
      />
    </Sphere>
  );
};

// ─── Lines from core to each node ─────────────────────────────────────────────
const NeuralLines = ({
  activeStep,
}: {
  activeStep: number;
}) => {
  const center: [number, number, number] = [0, 0, 0];
  return (
    <>
      {nodeBasePositions.map((pos, i) => {
        const isActive = steps[i].id === activeStep;
        const lineColor = isActive ? steps[i].color : '#2d3748';
        return (
          <Line
            key={i}
            points={[center, pos]}
            color={lineColor}
            lineWidth={isActive ? 1.8 : 0.7}
          />
        );
      })}
      {/* Cross links between adjacent nodes for neural look */}
      {nodeBasePositions.map((pos, i) => {
        const next = nodeBasePositions[(i + 1) % nodeBasePositions.length];
        return (
          <Line
            key={`cross-${i}`}
            points={[pos, next]}
            color="#1e293b"
            lineWidth={0.5}
          />
        );
      })}
    </>
  );
};

// ─── Central rotating core ────────────────────────────────────────────────────
const NeuralCore = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.18;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <group ref={ref}>
      <Icosahedron args={[1.4, 1]}>
        <meshStandardMaterial
          wireframe
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={0.9}
        />
      </Icosahedron>
      <Icosahedron args={[0.85, 0]}>
        <meshStandardMaterial
          color="#0f172a"
          emissive="#34d399"
          emissiveIntensity={0.15}
          metalness={1}
          roughness={0}
        />
      </Icosahedron>
    </group>
  );
};

// ─── Full scene ───────────────────────────────────────────────────────────────
const NeuralScene = ({ activeStep }: { activeStep: number }) => {
  const orbitGroup = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (orbitGroup.current) {
      // Slow global ring rotation
      orbitGroup.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <NeuralCore />
      <NeuralLines activeStep={activeStep} />
      <group ref={orbitGroup}>
        {steps.map((step, i) => (
          <OrbNode
            key={step.id}
            basePosition={nodeBasePositions[i]}
            isActive={step.id === activeStep}
            color={step.color}
            activeColor={step.id % 2 === 0 ? '#c084fc' : '#34d399'}
          />
        ))}
      </group>
    </>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const AiMlLifeCycle = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section
      id="aiml-lifecycle"
      style={{
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
        backgroundColor: 'rgba(10, 15, 22, 0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        width: '100%',
        padding: '100px 0',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 28px',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '60px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
            End-to-End Process
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#fff',
              margin: 0,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
          >
            Data Science, AI &amp;{' '}
            <span style={{ color: '#34d399' }}>ML Life Cycle</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.15rem', marginTop: '16px', maxWidth: '600px', marginInline: 'auto', lineHeight: 1.65 }}>
            Click any phase below to highlight it in the neural network and explore what I do at each stage.
          </p>
        </div>

        {/* Split Layout */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            alignItems: 'stretch',
          }}
        >
          {/* Left ── 3-D Canvas */}
          <div
            style={{
              flex: '1 1 380px',
              minHeight: '440px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(5, 8, 12, 0.65)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <Canvas
              camera={{ position: [0, 5, 11], fov: 44 }}
              style={{ width: '100%', height: '100%', minHeight: '400px' }}
            >
              <ambientLight intensity={0.35} />
              <pointLight position={[8, 8, 8]} intensity={1.2} color="#ffffff" />
              <pointLight position={[-10, 4, -8]} intensity={0.7} color="#c084fc" />
              <pointLight position={[0, -8, 0]} intensity={0.4} color="#34d399" />
              <NeuralScene activeStep={activeStep} />
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
          </div>

          {/* Right ── Accordion */}
          <div
            style={{
              flex: '1 1 360px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  style={{
                    backgroundColor: isActive ? `${step.color}0d` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? `${step.color}55` : 'rgba(255,255,255,0.05)'}`,
                    backdropFilter: 'blur(10px)',
                    borderRadius: '14px',
                    padding: '18px 22px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isActive ? 'translateX(5px)' : 'translateX(0)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Step indicator */}
                    <div
                      style={{
                        minWidth: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: isActive ? step.color : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isActive ? step.color : 'rgba(255,255,255,0.08)'}`,
                        color: isActive ? '#050810' : '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      }}
                    >
                      {step.id}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '1.3rem' }}>{step.emoji}</span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                          color: isActive ? '#fff' : '#d1d5db',
                          fontWeight: 600,
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          style={{
                            margin: '14px 0 0 0',
                            paddingLeft: '52px',
                            color: '#9ca3af',
                            fontSize: '1rem',
                            lineHeight: 1.7,
                          }}
                        >
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMlLifeCycle;
