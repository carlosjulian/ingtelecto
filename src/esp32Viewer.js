import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildEsp32Board } from './stage/esp32Kit.js';

/**
 * Visor interactivo 3D tipo estudio para la ESP32 DevKit V1.
 */
export function initEsp32Viewer(containerEl, infoEl) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1117);

  // Rejilla sutil en el suelo
  const grid = new THREE.GridHelper(160, 32, 0x2e3544, 0x1a1f2c);
  grid.position.y = -2.5;
  scene.add(grid);

  // Cámara en perspectiva de alta definición
  const camera = new THREE.PerspectiveCamera(
    42,
    containerEl.clientWidth / containerEl.clientHeight,
    0.1,
    1000
  );
  camera.position.set(45, 55, 65);

  // Renderizador WebGL de alta precisión
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  containerEl.appendChild(renderer.domElement);

  // Controles orbitales suaves
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 + 0.1; // Permitir ligera vista inferior
  controls.minDistance = 15;
  controls.maxDistance = 220;
  controls.target.set(0, 4, 0);

  // ILUMINACIÓN DE ESTUDIO TÉCNICO
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Luz principal con sombras suaves (Key Light)
  const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.2);
  keyLight.position.set(45, 70, 40);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0004;
  keyLight.shadow.camera.near = 10;
  keyLight.shadow.camera.far = 180;
  keyLight.shadow.camera.left = -40;
  keyLight.shadow.camera.right = 40;
  keyLight.shadow.camera.top = 40;
  keyLight.shadow.camera.bottom = -40;
  scene.add(keyLight);

  // Luz de relleno fría (Fill Light)
  const fillLight = new THREE.DirectionalLight(0x9fc5e8, 1.1);
  fillLight.position.set(-50, 40, -40);
  scene.add(fillLight);

  // Luz de contorno metálico (Rim Light)
  const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
  rimLight.position.set(0, 30, -60);
  scene.add(rimLight);

  // Luz cenital suave
  const topLight = new THREE.PointLight(0xffffff, 0.8, 100);
  topLight.position.set(0, 35, 0);
  scene.add(topLight);

  // CONSTRUCCIÓN E INSERCIÓN DEL MODELO PROCEDURAL ESP32
  const esp32 = buildEsp32Board();
  scene.add(esp32);

  // Raycasting para inspección interactiva
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const PART_INFO = {
    'ESP-WROOM-32_Module': {
      title: 'Módulo ESP-WROOM-32 (Espressif Systems)',
      desc: 'SoC dual-core Tensilica Xtensa 32-bit LX6 a 240 MHz. Integra 520 KB SRAM, 4 MB Flash SPI, Wi-Fi 802.11 b/g/n y Bluetooth v4.2 BR/EDR + BLE con antena de traza MIFA en PCB.',
    },
    'IC_CP2102': {
      title: 'Puente USB a UART CP2102 (Silicon Labs)',
      desc: 'Controlador de función USB 2.0 full-speed en encapsulado QFN-28. Administra la comunicación serial para carga automática de sketches (DTR/RTS) y depuración por monitor serial.',
    },
    'IC_AMS1117_3V3': {
      title: 'Regulador LDO AMS1117-3.3',
      desc: 'Regulador lineal de baja caída de tensión (SOT-223). Convierte los 5V del puerto USB o VIN a la tensión de operación de 3.3V requerida por el ESP32, suministrando hasta 800 mA.',
    },
    'Micro_USB_Port': {
      title: 'Conector Micro-USB Tipo-B',
      desc: 'Entrada de alimentación y canal de comunicación con la PC. Permite flashear firmware y suministrar corriente de hasta 500 mA protegida.',
    },
    'Btn_EN': {
      title: 'Pulsador EN (Reset Hardware)',
      desc: 'Conectado a la línea CHIP_PU con resistencia de pull-up. Llevar este pin a nivel BAJO (LOW) reinicia el microcontrolador desde la dirección 0x40000000.',
    },
    'Btn_BOOT': {
      title: 'Pulsador BOOT (GPIO 0)',
      desc: 'Controla el modo de arranque en ROM. Al mantenerlo presionado durante el reset, el chip entra en modo de descarga de firmware por UART (UART Download Boot).',
    },
  };

  function updateTooltip(partName) {
    if (!infoEl) return;
    const info = PART_INFO[partName];
    if (info) {
      infoEl.innerHTML = `
        <div class="part-badge">INSPECTOR EN TIEMPO REAL</div>
        <h3>${info.title}</h3>
        <p>${info.desc}</p>
      `;
      infoEl.classList.add('is-active');
    } else {
      infoEl.innerHTML = `
        <div class="part-badge">100% PROCEDURAL THREE.JS</div>
        <h3>ESP32 DevKit V1 (ESP-WROOM-32)</h3>
        <p>Pasa el cursor sobre el módulo blindado, el puente USB CP2102, el regulador AMS1117, los pulsadores o el micro-USB para ver sus especificaciones.</p>
      `;
      infoEl.classList.remove('is-active');
    }
  }

  containerEl.addEventListener('pointermove', (e) => {
    const rect = containerEl.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / containerEl.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / containerEl.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(esp32.children, true);

    if (intersects.length > 0) {
      let cur = intersects[0].object;
      let matchedName = null;
      while (cur && cur !== esp32) {
        if (PART_INFO[cur.name]) {
          matchedName = cur.name;
          break;
        }
        cur = cur.parent;
      }
      updateTooltip(matchedName);
    } else {
      updateTooltip(null);
    }
  });

  // Animación del render
  let isAutoRotating = true;
  let animId = null;

  function animate() {
    animId = requestAnimationFrame(animate);

    if (isAutoRotating) {
      esp32.rotation.y += 0.005;
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Redimensionado responsivo
  window.addEventListener('resize', () => {
    camera.aspect = containerEl.clientWidth / containerEl.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
  });

  return {
    toggleRotate: () => {
      isAutoRotating = !isAutoRotating;
      return isAutoRotating;
    },
    resetView: () => {
      esp32.rotation.y = 0;
      camera.position.set(45, 55, 65);
      controls.target.set(0, 4, 0);
      controls.update();
    },
    destroy: () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    },
  };
}
