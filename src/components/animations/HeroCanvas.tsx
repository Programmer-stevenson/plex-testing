'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks';

interface HeroCanvasProps {
  className?: string;
}

// ===========================================
// CSS 3D CUBE COMPONENT - MOBILE ONLY
// Pure CSS transforms, no WebGL, 60fps guaranteed
// ===========================================
function CSSCube() {
  return (
    <div className="css-cube-container">
      <div className="css-cube-wrapper">
        <div className="css-cube">
          {/* 6 faces with logo */}
          <div className="css-cube-face front">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face back">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face right">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face left">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face top">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
          <div className="css-cube-face bottom">
            <img src="/plexxx.png" alt="" className="css-cube-logo" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .css-cube-container {
          width: 100%;
          height: 100%;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .css-cube-wrapper {
          width: 150px;
          height: 150px;
          transform-style: preserve-3d;
          transform: rotateX(-35deg) rotateZ(45deg);
        }

        .css-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: css-cube-rotate 15s linear infinite;
        }

        @keyframes css-cube-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .css-cube-face {
          position: absolute;
          width: 150px;
          height: 150px;
          background: rgba(192, 192, 192, 0.5);
          border: 2px solid rgba(192, 192, 192, 1);
          box-shadow: 
            0 0 10px rgba(192, 192, 192, 0.3),
            inset 0 0 20px rgba(192, 192, 192, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: visible;
        }

        .css-cube-logo {
          width: 60%;
          height: 60%;
          object-fit: contain;
        }

        .front  { transform: translateZ(75px); }
        .back   { transform: rotateY(180deg) translateZ(75px); }
        .right  { transform: rotateY(90deg) translateZ(75px); }
        .left   { transform: rotateY(-90deg) translateZ(75px); }
        .top    { transform: rotateX(90deg) translateZ(75px); }
        .bottom { transform: rotateX(-90deg) translateZ(75px); }
      `}</style>
    </div>
  );
}

// ===========================================
// MAIN COMPONENT
// ===========================================
export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // ===========================================
  // THREE.JS - DESKTOP ONLY
  // ===========================================
  useEffect(() => {
    // Skip Three.js on mobile - use CSS cube instead
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const silver = 0xC0C0C0;
    const cubeSize = 1.6;
    const halfCube = cubeSize / 2;

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: silver,
      transparent: true,
      opacity: 0.5,
      side: THREE.FrontSide,
      depthWrite: false,
    });

    const cube = new THREE.Mesh(geometry, faceMaterial);
    cube.rotation.x = THREE.MathUtils.degToRad(-35);
    cube.rotation.z = THREE.MathUtils.degToRad(45);
    scene.add(cube);

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ 
      color: silver, 
      transparent: true, 
      opacity: 1,
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    edges.rotation.copy(cube.rotation);
    scene.add(edges);

    const glowLayers: THREE.LineSegments[] = [];
    for (let i = 1; i <= 2; i++) {
      const glowGeo = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(cubeSize + i * 0.04, cubeSize + i * 0.04, cubeSize + i * 0.04)
      );
      const glowMat = new THREE.LineBasicMaterial({ 
        color: silver, 
        transparent: true, 
        opacity: 0.4 / i,
      });
      const glow = new THREE.LineSegments(glowGeo, glowMat);
      glow.rotation.copy(cube.rotation);
      glowLayers.push(glow);
      scene.add(glow);
    }

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/plexxx.png', (texture) => {
      const imgAspect = texture.image.width / texture.image.height;
      logoPlanes.forEach(plane => {
        if (imgAspect > 1) {
          plane.scale.set(logoSize, logoSize / imgAspect, 1);
        } else {
          plane.scale.set(logoSize * imgAspect, logoSize, 1);
        }
      });
    });
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const logoSize = 0.75;
    const logoOffset = 0.01;

    const faceData: [number, number, number, number, number, number][] = [
      [0, 0, halfCube + logoOffset, 0, 0, 0],
      [0, 0, -halfCube - logoOffset, 0, Math.PI, 0],
      [halfCube + logoOffset, 0, 0, 0, Math.PI / 2, 0],
      [-halfCube - logoOffset, 0, 0, 0, -Math.PI / 2, 0],
      [0, halfCube + logoOffset, 0, -Math.PI / 2, 0, 0],
      [0, -halfCube - logoOffset, 0, Math.PI / 2, 0, 0],
    ];

    const logoGeometry = new THREE.PlaneGeometry(1, 1);
    const logoPlanes: THREE.Mesh[] = [];

    for (let i = 0; i < 6; i++) {
      const [px, py, pz, rx, ry, rz] = faceData[i];
      const mesh = new THREE.Mesh(logoGeometry, logoMaterial);
      mesh.position.set(px, py, pz);
      mesh.rotation.set(rx, ry, rz);
      mesh.scale.set(logoSize, logoSize, 1);
      logoPlanes.push(mesh);
      cube.add(mesh);
    }

    // Particles
    const particleGeo = new THREE.SphereGeometry(0.03, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({ color: silver });
    const particlesMesh = new THREE.InstancedMesh(particleGeo, particleMat, 8);
    scene.add(particlesMesh);

    // Ring
    const ringGeo = new THREE.RingGeometry(1.5, 1.53, 48);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: silver, 
      transparent: true, 
      opacity: 0.3, 
      side: THREE.DoubleSide 
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const dummy = new THREE.Object3D();
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      cube.rotation.y += 0.004;
      edges.rotation.y += 0.004;
      glowLayers.forEach(g => g.rotation.y += 0.004);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.5;
        dummy.position.set(Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0);
        const s = 0.8 + Math.sin(time * 3 + i) * 0.3;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        particlesMesh.setMatrixAt(i, dummy.matrix);
      }
      particlesMesh.instanceMatrix.needsUpdate = true;

      ring.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      faceMaterial.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
      logoGeometry.dispose();
      logoMaterial.dispose();
      logoTexture.dispose();
      glowLayers.forEach(g => {
        g.geometry.dispose();
        (g.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  // ===========================================
  // RENDER
  // ===========================================
  
  // Mobile: CSS 3D Cube (60fps guaranteed)
  if (isMobile) {
    return (
      <div className={`relative w-full h-full min-h-[250px] ${className}`}>
        <CSSCube />
      </div>
    );
  }

  // Desktop: Three.js
  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full min-h-[250px] ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}