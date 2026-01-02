'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks';

interface HeroCanvasProps {
  className?: string;
}

export default function HeroCanvas({ className = '' }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer - fully transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Colors
    const icyBlue = 0x7DF9FF;
    const lightOrange = 0xFFB347;

    // Cube dimensions - 2X LARGER on mobile
    const cubeSize = isMobile ? 2.4 : 1.6;
    const halfCube = cubeSize / 2;

    // Geometry
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Bright icy blue face material - half transparent
    const faceMaterial = new THREE.MeshBasicMaterial({
      color: icyBlue,
      transparent: true,
      opacity: 0.5,
      side: THREE.FrontSide,
      depthWrite: false,
    });

    const cube = new THREE.Mesh(geometry, faceMaterial);
    cube.rotation.x = THREE.MathUtils.degToRad(-35);
    cube.rotation.z = THREE.MathUtils.degToRad(45);
    scene.add(cube);

    // ORANGE edges
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ 
      color: lightOrange, 
      transparent: true, 
      opacity: 1,
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    edges.rotation.copy(cube.rotation);
    scene.add(edges);

    // ORANGE glow layers around edges
    const glowLayers: THREE.LineSegments[] = [];
    for (let i = 1; i <= 2; i++) {
      const glowGeo = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(cubeSize + i * 0.04, cubeSize + i * 0.04, cubeSize + i * 0.04)
      );
      const glowMat = new THREE.LineBasicMaterial({ 
        color: lightOrange, 
        transparent: true, 
        opacity: 0.4 / i,
      });
      const glow = new THREE.LineSegments(glowGeo, glowMat);
      glow.rotation.copy(cube.rotation);
      glowLayers.push(glow);
      scene.add(glow);
    }

    // Logo texture loader
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

    // Shared logo material
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Logo size - larger on mobile too
    const logoSize = isMobile ? 1.1 : 0.75;
    const logoOffset = 0.01;

    // Face positions/rotations
    const faceData: [number, number, number, number, number, number][] = [
      [0, 0, halfCube + logoOffset, 0, 0, 0],
      [0, 0, -halfCube - logoOffset, 0, Math.PI, 0],
      [halfCube + logoOffset, 0, 0, 0, Math.PI / 2, 0],
      [-halfCube - logoOffset, 0, 0, 0, -Math.PI / 2, 0],
      [0, halfCube + logoOffset, 0, -Math.PI / 2, 0, 0],
      [0, -halfCube - logoOffset, 0, Math.PI / 2, 0, 0],
    ];

    // Single geometry for all logo planes
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

    // Particles - desktop only, orange
    let particlesMesh: THREE.InstancedMesh | null = null;
    const particleCount = 8;
    const particleRadius = 2.0;
    const dummy = new THREE.Object3D();

    if (!isMobile) {
      const particleGeo = new THREE.SphereGeometry(0.03, 6, 6);
      const particleMat = new THREE.MeshBasicMaterial({ color: lightOrange });
      particlesMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
      scene.add(particlesMesh);
    }

    // Orbital ring - desktop only, orange
    let ring: THREE.Mesh | null = null;
    if (!isMobile) {
      const ringGeo = new THREE.RingGeometry(2.0, 2.03, 48);
      const ringMat = new THREE.MeshBasicMaterial({ 
        color: lightOrange, 
        transparent: true, 
        opacity: 0.3, 
        side: THREE.DoubleSide 
      });
      ring = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ring);
    }

    // Animation loop
    const rotationSpeed = isMobile ? 0.003 : 0.004;
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Rotate cube + edges + glow layers
      cube.rotation.y += rotationSpeed;
      edges.rotation.y += rotationSpeed;
      glowLayers.forEach(g => g.rotation.y += rotationSpeed);

      // Update instanced particles
      if (particlesMesh) {
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + time * 0.5;
          dummy.position.set(
            Math.cos(angle) * particleRadius,
            Math.sin(angle) * particleRadius,
            0
          );
          const s = 0.8 + Math.sin(time * 3 + i) * 0.3;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          particlesMesh.setMatrixAt(i, dummy.matrix);
        }
        particlesMesh.instanceMatrix.needsUpdate = true;
      }

      // Rotate ring
      if (ring) {
        ring.rotation.z += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
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

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full min-h-[250px] ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}