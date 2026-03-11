import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  import.meta.env.BASE_URL + "images/python.webp",
  import.meta.env.BASE_URL + "images/sql.webp",
  import.meta.env.BASE_URL + "images/pandas.webp",
  import.meta.env.BASE_URL + "images/numpy.webp",
  import.meta.env.BASE_URL + "images/scikit.webp",
  import.meta.env.BASE_URL + "images/flask.webp",
  import.meta.env.BASE_URL + "images/powerbi.webp",
  import.meta.env.BASE_URL + "images/html.webp",
  import.meta.env.BASE_URL + "images/css.webp",
  import.meta.env.BASE_URL + "images/github.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

const techCategories = [
  {
    title: "Languages",
    skills: ["Python", "SQL (T-SQL/MySQL)", "JavaScript/TypeScript", "HTML/CSS"]
  },
  {
    title: "Data Science & AI",
    skills: ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "LangChain", "ChromaDB"]
  },
  {
    title: "Backend & Databases",
    skills: ["Flask", "REST APIs", "MS SQL Server", "MySQL", "Power BI"]
  },
  {
    title: "Tools & Environment",
    skills: ["Git/GitHub", "Jupyter", "Colab", "FFmpeg", "Advanced Excel"]
  }
];

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  shakeTrigger: number;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
  shakeTrigger,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useEffect(() => {
    if (shakeTrigger > 0 && api.current) {
      api.current.applyImpulse({
        x: THREE.MathUtils.randFloatSpread(150 * scale),
        y: THREE.MathUtils.randFloatSpread(150 * scale),
        z: THREE.MathUtils.randFloatSpread(150 * scale)
      }, true);
    }
  }, [shakeTrigger, scale]);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.15,
          metalness: 0.8,
          roughness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        })
    );
  }, []);

  return (
    <section id="tech-stack" className="techstack">
      <div className="tech-canvas-container">
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                {...props}
                material={materials[Math.floor(Math.random() * materials.length)]}
                isActive={isActive}
                shakeTrigger={shakeTrigger}
              />
            ))}
          </Physics>
          <Environment
            files={import.meta.env.BASE_URL + "models/char_enviorment.hdr"}
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
      </div>

      <div className="techstack-header">
        <h2>MY <span>TECH STACK</span></h2>
        <p>A comprehensive overview of my capabilities spanning backend architecture, data intelligence, and modern development.</p>
      </div>

      <div className="techstack-spacer"></div>

      <div className="tech-grid">
        {techCategories.map((category, idx) => (
          <div key={idx} className="tech-card pointer-events-auto">
            <h3>{category.title}</h3>
            <div className="tech-tags">
              {category.skills.map((skill, i) => (
                <span key={i} className="tech-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="shake-btn" data-cursor="pointer" onClick={() => setShakeTrigger(s => s + 1)}>Shuffle Tech</button>
    </section>
  );
};

export default TechStack;
