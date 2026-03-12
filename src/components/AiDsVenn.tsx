import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Float } from '@react-three/drei';
import { motion, Variants } from 'framer-motion';
import * as THREE from 'three';
import './styles/AiDsVenn.css';

const VennSpheres = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* AI Sphere - Largest */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[4, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#38bdf8" 
            transparent 
            opacity={0.15} 
            metalness={0.2}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
          <Html distanceFactor={10} position={[0, 4.2, 0]}>
            <div className="label-html">Artificial Intelligence</div>
          </Html>
        </Sphere>
      </Float>

      {/* ML Sphere - Nested in AI */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere args={[2.5, 64, 64]} position={[0, -0.5, 0.5]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.25} 
            metalness={0.4}
            roughness={0.2}
          />
          <Html distanceFactor={10} position={[0, 2.7, 0]}>
            <div className="label-html">Machine Learning</div>
          </Html>
        </Sphere>
      </Float>

      {/* DL Sphere - Nested in ML */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <Sphere args={[1.2, 64, 64]} position={[0, -0.8, 1.2]}>
          <meshStandardMaterial 
            color="#c084fc" 
            transparent 
            opacity={0.4} 
            metalness={0.6}
            roughness={0.1}
            emissive="#c084fc"
            emissiveIntensity={0.2}
          />
          <Html distanceFactor={10} position={[0, 1.4, 0]}>
            <div className="label-html">Deep Learning</div>
          </Html>
        </Sphere>
      </Float>

      {/* Data Science Sphere - Intersecting */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
        <Sphere args={[3, 64, 64]} position={[2.5, 0, 0]}>
          <meshStandardMaterial 
            color="#10b981" 
            transparent 
            opacity={0.2} 
            metalness={0.3}
            roughness={0.2}
          />
          <Html distanceFactor={10} position={[0, 3.2, 0]}>
            <div className="label-html">Data Science</div>
          </Html>
        </Sphere>
      </Float>

      {/* Regression Analysis - Node in DS */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[0.4, 32, 32]} position={[3.5, -0.5, 0.5]}>
          <meshStandardMaterial 
            color="#34d399" 
            emissive="#34d399"
            emissiveIntensity={1}
          />
          <Html distanceFactor={10} position={[0, 0.6, 0]}>
            <div className="label-html">Regression Analysis</div>
          </Html>
        </Sphere>
      </Float>
    </group>
  );
};

const AiDsVenn = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="venn-section" id="vission">
      <motion.div 
        className="venn-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="venn-header">
          <span className="venn-tag">Field Overview</span>
          <h2 className="venn-title">
            The Convergence of <span className="highlight">AI & Data Science</span>
          </h2>
        </div>

        <div className="venn-content-grid">
          <div className="venn-3d-wrapper">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />
              <VennSpheres />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>

          <div className="venn-info">
            <motion.div className="info-card" variants={itemVariants}>
              <h3><span className="dot" style={{ background: '#38bdf8' }}></span> Artificial Intelligence</h3>
              <p>
                A broad field that encompasses various sub-disciplines, including machine learning. It aims to create systems capable of performing tasks that typically require human intelligence.
              </p>
            </motion.div>

            <motion.div className="info-card" variants={itemVariants}>
              <h3><span className="dot" style={{ background: '#8b5cf6' }}></span> Machine & Deep Learning</h3>
              <p>
                ML enables computers to learn from patterns and inference. Deep Learning (a subset of ML) employs multi-layered neural networks to model complex decision-making processes.
              </p>
            </motion.div>

            <motion.div className="info-card" variants={itemVariants}>
              <h3><span className="dot" style={{ background: '#10b981' }}></span> Data Science</h3>
              <p>
                A distinct discipline involving extracting insights from structured/unstructured data. It heavily utilizes statistics, machine learning, and techniques like <strong>Regression Analysis</strong> to predict outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AiDsVenn;
