import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Icosahedron } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const steps = [
  {
    id: 1,
    title: "Data Ingestion & Extraction",
    desc: "Pulling raw, unstructured data from APIs, web scraping, and relational databases (SQL) into a centralized environment."
  },
  {
    id: 2,
    title: "Preprocessing & EDA",
    desc: "Cleaning, transforming, and visualizing datasets using Pandas and NumPy to uncover hidden patterns and handle missing values."
  },
  {
    id: 3,
    title: "Model Engineering",
    desc: "Training and tuning predictive algorithms and Neural Networks using Scikit-Learn and TensorFlow."
  },
  {
    id: 4,
    title: "AI & RAG Integration",
    desc: "Connecting models to Large Language Models and Vector Databases (ChromaDB) for context-aware, generative capabilities."
  },
  {
    id: 5,
    title: "Deployment & APIs",
    desc: "Wrapping the final model in a highly scalable Flask backend and serving predictions via secure REST APIs."
  }
];

const DataCoreScene = ({ activeStep }: { activeStep: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Icosahedron args={[1.5, 0]}>
        <meshStandardMaterial wireframe color="#34d399" emissive="#34d399" emissiveIntensity={0.8} />
      </Icosahedron>
      
      {/* Orbiting Nodes */}
      {steps.map((step, i) => {
        const radius = 3.5;
        const angle = (i / steps.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isActive = activeStep === step.id;

        return (
          <Node 
            key={step.id} 
            position={[x, isActive ? 0.3 : 0, z]} 
            isActive={isActive} 
            stepNum={step.id} 
          />
        );
      })}

      {/* Connection Rings */}
      <Torus args={[3.5, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="rgba(255,255,255,0.1)" />
      </Torus>
    </group>
  );
};

const Node = ({ position, isActive, stepNum }: { position: [number, number, number], isActive: boolean, stepNum: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 3) * 0.2;
      } else {
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1);
      }
    }
  });

  const scale = isActive ? 1.4 : 1;
  const color = isActive ? (stepNum % 2 === 0 ? "#c084fc" : "#34d399") : "#6b7280";
  
  return (
    <Sphere ref={meshRef} args={[0.25, 32, 32]} position={position} scale={[scale, scale, scale]}>
      <meshStandardMaterial ref={materialRef} color={color} emissive={color} emissiveIntensity={isActive ? 0.6 : 0.1} metalness={0.8} roughness={0.2} />
    </Sphere>
  );
};

const DataLifecycle = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section 
      id="datalifecycle"
      className="min-h-screen py-24 relative z-10 pointer-events-none"
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingTop: '100px', 
        paddingBottom: '100px', 
        backgroundColor: 'rgba(10, 15, 22, 0.8)', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div 
        className="pointer-events-auto"
        style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          padding: '0 24px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '50px' 
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'white', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>
            The Data <span style={{ color: '#34d399' }}>Lifecycle</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.2rem', marginTop: '15px' }}>
            Transforming raw data into intelligent architectures.
          </p>
        </div>

        {/* Layout Split */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Side: 3D Canvas */}
          <div style={{
            flex: '1 1 400px',
            height: '600px',
            minHeight: '400px',
            width: '100%',
            backgroundColor: 'rgba(5, 8, 12, 0.6)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }} style={{ width: '100%', height: '100%', minHeight: '400px' }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
              <pointLight position={[-10, 5, -10]} intensity={0.5} color="#c084fc" />
              <DataCoreScene activeStep={activeStep} />
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
          </div>

          {/* Right Side: Accordion Menu */}
          <div style={{
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '12px'
          }}>
            {steps.map((step) => (
              <div 
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                style={{
                  backgroundColor: activeStep === step.id ? 'rgba(52, 211, 153, 0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeStep === step.id ? 'rgba(52, 211, 153, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeStep === step.id ? '0 10px 30px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', 
                    backgroundColor: activeStep === step.id ? '#34d399' : 'rgba(255,255,255,0.05)',
                    color: activeStep === step.id ? '#05080c' : '#9ca3af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    border: activeStep === step.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {step.id}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: activeStep === step.id ? '#fff' : '#d1d5db', fontWeight: 600, transition: 'color 0.3s ease' }}>
                    {step.title}
                  </h3>
                </div>
                
                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ margin: '16px 0 0 0', color: '#9ca3af', lineHeight: 1.6, paddingLeft: '52px', fontSize: '1.05rem' }}>
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default DataLifecycle;
