// ===========================================
// THREE.JS CUBE - GPU ACCELERATED
// One cube for all viewports, responsive sizing
// Isolated from React, runs in own render loop
// ===========================================

import * as THREE from 'three';

export function initCube(container, logoSrc = '/plexxx.png') {
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
  camera.position.z = 5;
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  
  container.appendChild(renderer.domElement);
  
  // Responsive sizing based on container
  function resize() {
    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height, 400);
    renderer.setSize(size, size);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = '0 auto';
  }
  resize();
  
  const textureLoader = new THREE.TextureLoader();
  let logoTexture = null;
  
  textureLoader.load(logoSrc, (texture) => {
    logoTexture = texture;
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    updateFaceMaterials();
  });
  
  function createGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, 'rgba(251, 146, 60, 0.6)');
    gradient.addColorStop(0.35, 'rgba(14, 165, 233, 0.85)');
    gradient.addColorStop(0.65, 'rgba(56, 189, 248, 0.9)');
    gradient.addColorStop(1, 'rgba(186, 230, 253, 0.95)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 248, 248);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
  
  function createFaceTexture(gradientCanvas, logoImg) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(gradientCanvas, 0, 0);
    
    if (logoImg) {
      const logoSize = 256 * 0.6;
      const offset = (256 - logoSize) / 2;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(logoImg, offset, offset, logoSize, logoSize);
    }
    
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 250, 250);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
  
  const gradientCanvas = document.createElement('canvas');
  gradientCanvas.width = 256;
  gradientCanvas.height = 256;
  const gradCtx = gradientCanvas.getContext('2d');
  
  const gradient = gradCtx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, 'rgba(251, 146, 60, 0.6)');
  gradient.addColorStop(0.35, 'rgba(14, 165, 233, 0.85)');
  gradient.addColorStop(0.65, 'rgba(56, 189, 248, 0.9)');
  gradient.addColorStop(1, 'rgba(186, 230, 253, 0.95)');
  gradCtx.fillStyle = gradient;
  gradCtx.fillRect(0, 0, 256, 256);
  
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  
  const materials = [];
  for (let i = 0; i < 6; i++) {
    const texture = createGradientTexture();
    materials.push(new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.FrontSide
    }));
  }
  
  const cube = new THREE.Mesh(geometry, materials);
  
  // Tilt to match original CSS cube
  const TILT_X = -35 * Math.PI / 180;
  const TILT_Z = 45 * Math.PI / 180;
  
  const tiltGroup = new THREE.Group();
  tiltGroup.rotation.x = TILT_X;
  tiltGroup.rotation.z = TILT_Z;
  tiltGroup.add(cube);
  scene.add(tiltGroup);
  
  function updateFaceMaterials() {
    if (!logoTexture) return;
    const logoImg = logoTexture.image;
    for (let i = 0; i < 6; i++) {
      const texture = createFaceTexture(gradientCanvas, logoImg);
      materials[i].map = texture;
      materials[i].needsUpdate = true;
    }
  }
  
  let animationId = null;
  let lastTime = 0;
  const ROTATION_SPEED = (2 * Math.PI) / 20000; // 20s per rotation
  
  function animate(currentTime) {
    const delta = lastTime ? currentTime - lastTime : 16;
    lastTime = currentTime;
    
    cube.rotation.y += ROTATION_SPEED * delta;
    
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }
  
  animationId = requestAnimationFrame(animate);
  
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  
  return function destroy() {
    if (animationId) cancelAnimationFrame(animationId);
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