// ===========================================
// THREE.JS CUBE - MOBILE OPTIMIZED
// Throttled 30fps, low-res textures, minimal overdraw
// ===========================================

import * as THREE from 'three';

export function initCube(container, logoSrc = '/plexxx.png') {
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
  camera.position.z = 5;
  
  // Force pixel ratio to 1 on mobile for performance
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: !isMobile, // Disable antialiasing on mobile
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  
  container.appendChild(renderer.domElement);
  
  function resize() {
    const rect = container.getBoundingClientRect();
    // Smaller size on mobile
    const maxSize = isMobile ? 180 : 400;
    const size = Math.min(rect.width, rect.height, maxSize);
    renderer.setSize(size, size);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = '0 auto';
  }
  resize();
  
  // Lower resolution textures for mobile (128 vs 256)
  const texSize = isMobile ? 128 : 256;
  
  function createFaceTexture(hasLogo, logoImg) {
    const canvas = document.createElement('canvas');
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext('2d');
    
    // Solid gradient - minty green to light blue
    const gradient = ctx.createLinearGradient(0, 0, texSize, texSize);
    gradient.addColorStop(0, '#3EE4A8');
    gradient.addColorStop(0.5, '#00C2CB');
    gradient.addColorStop(1, '#38BDF8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, texSize, texSize);
    
    // Border
    ctx.strokeStyle = '#00C2CB';
    ctx.lineWidth = isMobile ? 3 : 6;
    ctx.strokeRect(2, 2, texSize - 4, texSize - 4);
    
    // Logo
    if (hasLogo && logoImg) {
      const logoSize = texSize * 0.4;
      const offset = (texSize - logoSize) / 2;
      ctx.globalAlpha = 0.8;
      ctx.drawImage(logoImg, offset, offset, logoSize, logoSize);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }
  
  // Create geometry
  const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  
  // Create initial materials (no logo yet)
  const materials = [];
  for (let i = 0; i < 6; i++) {
    const texture = createFaceTexture(false, null);
    materials.push(new THREE.MeshBasicMaterial({
      map: texture,
      transparent: false, // Solid for performance
      side: THREE.FrontSide
    }));
  }
  
  const cube = new THREE.Mesh(geometry, materials);
  
  // Tilt
  const TILT_X = -35 * Math.PI / 180;
  const TILT_Z = 45 * Math.PI / 180;
  
  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.x = TILT_X;
  tiltGroup.rotation.z = TILT_Z;
  tiltGroup.add(cube);
  scene.add(tiltGroup);
  
  // Load logo and update textures once
  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  logoImg.onload = () => {
    for (let i = 0; i < 6; i++) {
      const texture = createFaceTexture(true, logoImg);
      materials[i].map.dispose();
      materials[i].map = texture;
      materials[i].needsUpdate = true;
    }
  };
  logoImg.src = logoSrc;
  
  // Animation - throttled to 30fps on mobile
  let animationId = null;
  let lastTime = 0;
  const targetFPS = isMobile ? 30 : 60;
  const frameInterval = 1000 / targetFPS;
  const ROTATION_SPEED = (2 * Math.PI) / 20000;
  
  function animate(currentTime) {
    animationId = requestAnimationFrame(animate);
    
    const elapsed = currentTime - lastTime;
    
    if (elapsed < frameInterval) return;
    
    lastTime = currentTime - (elapsed % frameInterval);
    
    cube.rotation.y += ROTATION_SPEED * frameInterval;
    
    renderer.render(scene, camera);
  }
  
  animationId = requestAnimationFrame(animate);
  
  // Debounced resize
  let resizeTimeout;
  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100);
  });
  resizeObserver.observe(container);
  
  return function destroy() {
    if (animationId) cancelAnimationFrame(animationId);
    clearTimeout(resizeTimeout);
    resizeObserver.disconnect();
    
    geometry.dispose();
    materials.forEach(m => {
      if (m.map) m.map.dispose();
      m.dispose();
    });
    renderer.dispose();
    
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}