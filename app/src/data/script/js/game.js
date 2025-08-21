//#region GAME.JS
//#region consts
const TitleGame = ('SIUD2D');
console.log('SEJA BEM VINDO AO ' + TitleGame)
console.log('Todos Os direitos reservados da FGP.')
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameMenuBtn = document.getElementById('gameMenuBtn');
const inGameMenu = document.getElementById('inGameMenu');
const closeMenuBtn = inGameMenu.querySelector('.close-menu');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const gravityFactorSlider = document.getElementById('gravityFactorSlider');
const gravityFactorValue = document.getElementById('gravityFactorValue');
const dragFactorSlider = document.getElementById('dragFactorSlider');
const dragFactorValue = document.getElementById('dragFactorValue');
const notification = document.getElementById('notification');
const creationModeIndicator = document.getElementById('creationModeIndicator');
const creationModeText = document.getElementById('creationModeText');
const planetPreview = document.getElementById('planetPreview');
const editPanel = document.getElementById('editPanel');
const NEBULA_IGNORE_TYPES = ['radiation', 'spaceDust', 'meteoroid', 'meteorite', 'comet'];
const showTempZones = document.getElementById('showTempZones');
const tempSlider = document.getElementById('tempSlider');
const tempValue = document.getElementById('tempValue');
const universeTimeElem = document.getElementById('universeTime');
const astroCountElem = document.getElementById('astroCount');
const timeScaleElem = document.getElementById('timeScale');
const showNames = document.getElementById('showNames');
const astroTypesElem = document.getElementById('astroTypes');
const collisionSounds = [];
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const ringColor = document.getElementById('ringColor');
const massSlider = document.getElementById('massSlider');
const massValue = document.getElementById('massValue');
const gravitySlider = document.getElementById('gravitySlider');
const gravityValue = document.getElementById('gravityValue');
const rotationSlider = document.getElementById('rotationSlider');
const rotationValue = document.getElementById('rotationValue');
const waterSlider = document.getElementById('waterSlider');
const waterValue = document.getElementById('waterValue');
const cloudsSlider = document.getElementById('cloudsSlider');
const cloudsValue = document.getElementById('cloudsValue');
const gasSlider = document.getElementById('gasSlider');
const gasValue = document.getElementById('gasValue');
const hasRings = document.getElementById('hasRings');
const ringMassSlider = document.getElementById('ringMassSlider');
const ringMassValue = document.getElementById('ringMassValue');
const applySettings = document.getElementById('applySettings');
const resetSettings = document.getElementById('resetSettings');
const editName = document.getElementById('editName');
const editType = document.getElementById('editType');
const editClass = document.getElementById('editClass');
const editTemperature = document.getElementById('editTemperature');
const editColor = document.getElementById('editColor');
const editSecondaryColor = document.getElementById('editSecondaryColor');
const editMass = document.getElementById('editMass');
const editGravity = document.getElementById('editGravity');
const editRotation = document.getElementById('editRotation');
const editWater = document.getElementById('editWater');
const editClouds = document.getElementById('editClouds');
const editGas = document.getElementById('editGas');
const editRingMass = document.getElementById('editRingMass');
const editDescription = document.getElementById('editDescription');
const btnDeleteAstro = document.getElementById('btnDeleteAstro');
const btnApplyChanges = document.getElementById('btnApplyChanges'); 
const G = 6.67430e-2;
const musicTracks = [
    '../assets/audio/SIU2D_soundtrack1.mp3' 
];
const musicInterval = 30000; 
const MAX_ASTROS_RETIRADA = 600;
const btnLock = document.getElementById('btnLock');
const astroPool = (function() {
    const pool = {};
    const DEFAULT_POOL_SIZE = 1000;
    
    
    function initPools() {
        const types = ['spaceDust', 'nebula', 'asteroid', /*...outros tipos...*/];
        types.forEach(type => {
            pool[type] = Array(DEFAULT_POOL_SIZE).fill().map(() => createBaseAstro(type));
        });
    }
    
    function createBaseAstro(type) {
        return {
            type,
            x: 0, y: 0,
            vx: 0, vy: 0,
            mass: 0,
            radius: 0,
            markedForRemoval: false,
            
        };
    }
    
    function acquire(type, config) {
        if (!pool[type] || pool[type].length === 0) {
            console.warn(`Pool esgotada para ${type}, criando novo objeto`);
            return { ...createBaseAstro(type), ...config };
        }
        
        const astro = pool[type].pop();
        return Object.assign(astro, config, { markedForRemoval: false });
    }
    
    function release(astro) {
        if (!pool[astro.type]) {
            pool[astro.type] = [];
        }
        
        
        const baseAstro = createBaseAstro(astro.type);
        Object.assign(astro, baseAstro);
        
        pool[astro.type].push(astro);
    }
    
    
    initPools();
    
    return { acquire, release };
})();
const astroLogger = {
    errors: [],
    warnings: [],
    physicsLog: [],
    
    logError: function(context, error) {
        const entry = {
            timestamp: Date.now(),
            context,
            error: error instanceof Error ? error.message : String(error)
        };
        this.errors.push(entry);
        console.error(`[Astro Error] ${entry.context}: ${entry.error}`);
        
        
        if (this.errors.length > 100) this.errors.shift();
    },
    
    logPhysics: function(action, details) {
        if (this.physicsLog.length > 50) this.physicsLog.shift();
        this.physicsLog.push({ timestamp: Date.now(), action, details });
    },
    
    getStatus: function() {
        return {
            lastError: this.errors[this.errors.length - 1],
            errorCount: this.errors.length,
            physicsEvents: this.physicsLog.length
        };
    }
};
//#endregion
//#region lets
let gameState = 'menu'; 
let camera = { x: 0, y: 0, zoom: 1 };
let planets = [];
let selectedPlanet = null;
let mouse = { x: 0, y: 0, down: false, rightDown: false, downX: 0, downY: 0 };
let mass = 50;
let lastTime = 0;
let fps = 120;
let universeAge = 0;
let universeTime = 0;
let creationMode = null;
let selectedClass = null;
let timeScale = 1; 
let trajectoryPoints = []; 
let temperatureZonesVisible = true;
let namesVisible = true; 
let selectedType = null;
let pulsarCount = 0;
let Fcount = 0;
let warnigCount = 0;
let Acount = 0;
let graphicsQuality = 'medium';
let shadowsEnabled = true;
let spaceColor = '#000000'; 
let gravityFactor = 5.0; 
let dragFactor = 0.0; 
let astroSettings = {
    primaryColor: '#b0bec5', 
    secondaryColor: '#90a4ae', 
    ringColor: 'rgba(180,180,180,0.5)', 
    mass: 50,
    gravity: 9.8,
    temperature: 20,
    rotationSpeed: 0.01,
    water: 70,
    clouds: 30,
    gas: 80,
    hasRings: false,
    ringMass: 0,
    planetClass: null
};
let backgroundMusic = null;
let currentTrackIndex = 0;
let musicTimeout = null;
let modoRetirada = false;
let gameStartCount = parseInt(localStorage.getItem('gameStartCount') || '0');
let playTimer = 0;
let playTimerInterval;
let spaceDustCreated = 0;
//#endregion
if (btnLock) {
    btnLock.addEventListener('click', toggleLock);
}
function initBackgroundMusic() {
    
    const musicVolumeSlider = document.getElementById('musicVolumeSlider');
    const musicVolumeValue = document.getElementById('musicVolumeValue');
    
    
    backgroundMusic = new Audio();
    backgroundMusic.loop = false;
    backgroundMusic.volume = musicVolumeSlider.value / 100;
    
    
    musicVolumeValue.textContent = musicVolumeSlider.value;
    
    
    musicVolumeSlider.addEventListener('input', () => {
        const volume = musicVolumeSlider.value;
        musicVolumeValue.textContent = volume;
        backgroundMusic.volume = volume / 100;
    });
    
    
    
    backgroundMusic.addEventListener('loadedmetadata', () => {
        console.log(`Duração da faixa: ${backgroundMusic.duration} segundos`);
    });

    
    backgroundMusic.addEventListener('ended', () => {
        console.log('Música finalizada. Reiniciando após intervalo.');
        musicTimeout = setTimeout(playNextTrack, musicInterval);
    });

    
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Erro no áudio:', e);
        console.error('Detalhes:', backgroundMusic.error);
        musicTimeout = setTimeout(playNextTrack, 5000);
    });

    playNextTrack();
    
    
    playNextTrack();
}
function toggleLock() {
    if (!selectedPlanet) {
        showNotification("Select a celestial body first!");
        return;
    }
    
    
    selectedPlanet.locked = !selectedPlanet.locked;
    
    if (selectedPlanet.locked) {
        
        if (selectedPlanet.originalVx === undefined) {
            selectedPlanet.originalVx = selectedPlanet.vx;
            selectedPlanet.originalVy = selectedPlanet.vy;
        }
        selectedPlanet.vx = 0;
        selectedPlanet.vy = 0;
        btnLock.textContent = "🔒 Lock";
    } else {
        
        selectedPlanet.vx = selectedPlanet.originalVx || 0;
        selectedPlanet.vy = selectedPlanet.originalVy || 0;
        btnLock.textContent = "🔒 Lock";
    }
    
    showNotification(`Astro ${selectedPlanet.locked ? 'Locked' : 'Unlocked'}: ${selectedPlanet.name}`);
}
function playNextTrack() {
    if (!backgroundMusic) return;
    
    
    backgroundMusic.pause();
    backgroundMusic.src = '';
    backgroundMusic.load();
    
    
    backgroundMusic = new Audio(musicTracks[currentTrackIndex]);
    backgroundMusic.volume = document.getElementById('musicVolumeSlider').value / 100;
    
    
    const MIN_PLAY_TIME = 120; 

    backgroundMusic.play().catch(error => {
        console.log("Reprodução bloqueada:", error);
        document.addEventListener('click', () => {
            backgroundMusic.play().catch(e => console.log("Erro ao reproduzir:", e));
        }, { once: true });
    });

    
    const checkInterval = setInterval(() => {
        if (backgroundMusic.currentTime > 0 && 
            backgroundMusic.currentTime < MIN_PLAY_TIME && 
            backgroundMusic.paused
        ) {
            console.warn('Reprodução interrompida prematuramente!');
            clearInterval(checkInterval);
            backgroundMusic.play().catch(e => console.log("Tentativa de retomada falhou:", e));
        }
        
        if (backgroundMusic.ended) {
            clearInterval(checkInterval);
        }
    }, 1000);
}
function generateRandomName() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÀÁáàéèÈÉóòÒÓùúÚÙçñÑãÃõÕüÜÍÌíìÂâÊêÎîÔôÛû*-$%¨#@!&_,.?´` °ºª²³£¢¬¹²³£¢¬!@#$%¨&*()[]{}/                            :3';
    let name = '';
    const length = Math.max(3, Math.floor(Math.random() * 8) + 3); 
    
    for (let i = 0; i < length; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return name || 'Unnamed'; 
}
document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 't' && editPanel.style.display === 'block') {
        showAstroTimePanel();
    }
});
function init() {
    resizeCanvas();
    initBackgroundMusic();
    document.getElementById('modeRetirada').addEventListener('change', function() {
    modoRetirada = this.checked;
    showNotification(`Withdrawal mode ${modoRetirada ? 'activated' : 'deactivated'}`);
});
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);
    canvas.addEventListener('wheel', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    

    document.getElementById('btnResetAchievements').addEventListener('click', resetAchievements);
    
    document.getElementById('btnPlay').addEventListener('click', startGame);
    gameMenuBtn.addEventListener('click', toggleGameMenu);
    closeMenuBtn.addEventListener('click', toggleGameMenu);
    volumeSlider.addEventListener('input', fgpVolume);
    showTempZones.addEventListener('change', toggleTemperatureZones);
    tempSlider.addEventListener('input', fgpTemperature);
    
    
    showNames.addEventListener('change', toggleNamesVisibility);
    
    
    gravityFactorSlider.value = 500;
    dragFactorSlider.value = 0;
    gravityFactorValue.textContent = 500;
    dragFactorValue.textContent = 0;
    ringMassSlider.value = 30;
    ringMassValue.textContent = 30;
    
    gravityFactorSlider.addEventListener('input', fgpGravityFactor);
    dragFactorSlider.addEventListener('input', fgpDragFactor);
    document.getElementById('shadowsToggle').addEventListener('change', toggleShadows);
    document.getElementById('spaceColor').addEventListener('input', fgpSpaceColor);
    document.getElementById('graphicsQuality').addEventListener('change', fgpGraphicsQuality);
    document.getElementById('btnResetPhysics').addEventListener('click', resetPhysics);
    
    
    
    window.selectedType = null;
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            creationMode = card.dataset.type;
            selectedType = creationMode; 
            creationModeText.textContent = getTypeName(creationMode);
            creationModeIndicator.style.display = 'block';
            toggleGameMenu();
            showNotification(`Creation Mode: ${getTypeName(creationMode)}. Click and drag to set the velocity.`);
        });
    });
    
    
    primaryColor.addEventListener('input', fgpAstroPreview);
    secondaryColor.addEventListener('input', fgpAstroPreview);
    ringColor.addEventListener('input', fgpAstroPreview);
    massSlider.addEventListener('input', fgpMass);
    gravitySlider.addEventListener('input', fgpGravity);
    rotationSlider.addEventListener('input', fgpRotation);
    waterSlider.addEventListener('input', fgpWater);
    cloudsSlider.addEventListener('input', fgpClouds);
    gasSlider.addEventListener('input', fgpGas);
    hasRings.addEventListener('change', fgpAstroPreview);
    ringMassSlider.addEventListener('input', fgpRingMass);
    applySettings.addEventListener('click', applyAstroSettings);
    resetSettings.addEventListener('click', resetAstroSettings);
    
    
    const editPanelCloseBtn = editPanel.querySelector('.close-menu');
    if (editPanelCloseBtn) {
        editPanelCloseBtn.addEventListener('click', () => {
            editPanel.style.display = 'none';
        });
    }
    
    
    btnDeleteAstro.addEventListener('click', deleteSelectedAstro);
    
    

    btnApplyChanges.addEventListener('click', () => {
        if (selectedPlanet && selectedPlanet.type === 'comet') {
            unlockAchievement(42);
        }
        applyAstroChanges();
    });



    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const scale = parseFloat(btn.getAttribute('data-scale'));
            setTimeScale(scale);
        });
    });
    
    
    fgpAstroPreview();
    
    
    requestAnimationFrame(gameLoop);
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function getClassColor(type, classId) {
    const colorMap = {
        'rockyPlanet': {
            1: '#8d6e63',  
            2: '#4fc3f7',  
            3: '#ffb74d',  
            4: '#95b74d',  
            5: '#90a4ae',  
            6: '#66bb6a',  
            7: '#e57373',  
            8: '#bbdefb',  
            9: '#e0f7fa',  
            10: '#ffcc80', 
            11: '#ba68c8'  
        },
        'gasGiant': {
            1: '#ff8a65',  
            2: '#ffb74d',  
            3: '#4fc3f7',  
            4: '#bbdefb',  
            5: '#4db6ac',  
            6: '#9575cd'   
        },
        'planetoid': {
            1: '#a1887f',  
            2: '#e0f7fa',  
            3: '#e0e0e0',  
            4: '#ba68c8'   
        }
    };
    
    return colorMap[type]?.[classId] || '#3498db';
}
function drawPlanet(planet) {


function calculateLightIntensity() {
    let intensity = 0.2;
    const MAX_LIGHT_DISTANCE = 10000;
    
    planets.forEach(other => {
        if (other === planet) return;
        
        const isStar = [
            'star', 'redDwarf', 'brownDwarf', 'ttauriStar', 'carbonStar',
            'giantStar', 'hypergiant', 'massiveStar', 'redGiant', 
            'redSupergiant', 'redHypergiant', 'pulsar', 'quarkStar'
        ].includes(other.type);
        
        if (isStar) {
            const dx = planet.x - other.x;
            const dy = planet.y - other.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < MAX_LIGHT_DISTANCE) {
                const normalizedDistance = distance / MAX_LIGHT_DISTANCE;
                const proximityFactor = 1 - Math.log(1 + 10 * normalizedDistance) / Math.log(11);
                const starIntensity = proximityFactor * (other.radius / 30);
                
                intensity = Math.min(1, intensity + starIntensity);
            }
        }
    });
    
    return Math.min(1, intensity);
}

  const x = (planet.x - camera.x) * camera.zoom + canvas.width / 2;
  const y = (planet.y - camera.y) * camera.zoom + canvas.height / 2;
  let radius = planet.radius * camera.zoom;
  
  
  if (!isFinite(radius) || radius <= 0) {
    console.warn(`Invalid Radius For ${planet.type}: ${radius} (mass: ${planet.mass})`);
    return;
  }
  
  
  if (x + radius < 0 || x - radius > canvas.width || 
      y + radius < 0 || y - radius > canvas.height) {
    return;
  }

  ctx.save();
  ctx.translate(x, y);
    
    
    let pulseFactor = 0.1; 
    let visualTimeScale = 1; 

    
    pulseFactor = (Math.sin(Date.now() * 0.001) + 1) * 0.5;
    visualTimeScale = getTimeScaleFactor() / 1000;

  
  const drawGravitationalLens = () => {
    const lensRadius = radius * 1.5;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, lensRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
    
    ctx.beginPath();
    ctx.arc(0, 0, lensRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  

const drawAccretionDisk = (innerRadius, outerRadius, colors) => {
    ctx.save();
    
    
    const scaledInner = innerRadius * camera.zoom;
    const scaledOuter = outerRadius * camera.zoom;
    
    ctx.rotate((planet.rotation || 0) * visualTimeScale);
    const diskGradient = ctx.createRadialGradient(0, 0, scaledInner, 0, 0, scaledOuter);
    
    colors.forEach((color, i) => {
        const stopPosition = i / (colors.length - 1);
        diskGradient.addColorStop(stopPosition, color);
    });
    
    ctx.beginPath();
    ctx.arc(0, 0, scaledOuter, 0, Math.PI * 2);
    ctx.fillStyle = diskGradient;
    ctx.fill();
    
    ctx.restore();
};


  
  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  };

  
  const drawJet = (length, startWidth, endWidth, colorStops) => {
    
    const jetGradient = ctx.createLinearGradient(0, 0, 0, -length);
    colorStops.forEach(stop => {
      jetGradient.addColorStop(stop.position, stop.color);
    });

    if (planet.jetRotationSpeed > 1.5) {
        const blurIntensity = Math.min(10, planet.jetRotationSpeed * 2);
        ctx.filter = `blur(${blurIntensity}px)`;
    }
    
    ctx.beginPath();
    ctx.moveTo(-startWidth/2, 0);
    ctx.lineTo(startWidth/2, 0);
    ctx.lineTo(endWidth/2, -length);
    ctx.lineTo(-endWidth/2, -length);
    ctx.closePath();
    ctx.fillStyle = jetGradient;
    ctx.fill();
    ctx.filter = 'none';
  };

  
  switch(planet.type) {
    case 'spaceDust':
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1, radius), 0, Math.PI * 2);
      ctx.fillStyle = planet.color || '#888888';
      ctx.fill();
      break;

    case 'asteroid':
    case 'meteoroid':
      if (!planet.shape || planet.shape.length < 3) {
        const points = 12 + Math.floor(Math.random() * 6);
        const irregularity = 0.4;
        planet.shape = [];
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const rand = 1 + (Math.random() - 0.5) * irregularity;
          const r = planet.radius * rand;
          planet.shape.push({
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r
          });
        }
      }
      ctx.rotate((planet.rotation || 0) * visualTimeScale);
      ctx.beginPath();
      planet.shape.forEach((point, i) => {
        const scaledX = point.x * camera.zoom;
        const scaledY = point.y * camera.zoom;
        i === 0 ? ctx.moveTo(scaledX, scaledY) : ctx.lineTo(scaledX, scaledY);
      });
      ctx.closePath();
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, '#ffffff');
      ctx.fillStyle = gradient;
      ctx.fill();
      break;

    case 'planetoid':
      ctx.rotate((planet.rotation || 0) * visualTimeScale);
      ctx.beginPath();
      const safeRx = Math.max(1, (planet.rx || planet.radius) * camera.zoom);
      const safeRy = Math.max(1, (planet.ry || planet.radius) * camera.zoom);
      ctx.ellipse(0, 0, safeRx, safeRy, 0, 0, Math.PI * 2);
      const ellipseGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(safeRx, safeRy));
      ellipseGradient.addColorStop(0, planet.highlight || lightenColor(planet.color || '#555555', 30));
      
      ctx.fillStyle = ellipseGradient;
      ctx.fill();
      break;
    case 'rockyPlanet':
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color || '#3498db';
    ctx.fill();

    
    if (planet.continents && planet.continents.length > 0) {
        ctx.save();
        ctx.rotate((planet.rotation || 0) * visualTimeScale);
        ctx.scale(radius, radius); 

        planet.continents.forEach(continent => {
            ctx.beginPath();
            ctx.moveTo(continent[0].x, continent[0].y);
            for (let i = 1; i < continent.length; i++) {
                ctx.lineTo(continent[i].x, continent[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = planet.landColor || astroSettings.secondaryColor || '#2ecc71';
            ctx.fill();
        });
        ctx.restore();
    }

    
    if (planet.clouds && planet.clouds > 0 && graphicsQuality !== 'low') {
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.02, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${planet.clouds/100 * 0.7})`;
        ctx.fill();
    }

            
        if (planet.waterValue > 0) {
            const oceanLevel = planet.waterValue / 100;
            
        }
        
        
        if (planet.cloudsValue > 0 && graphicsQuality !== 'low') {
            const cloudCover = planet.cloudsValue / 100 * 0.7;
            ctx.fillStyle = `rgba(255, 255, 255, ${cloudCover})`;
            
        }
    break;

    case 'nebula':
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radiusVar = radius * (0.6 + Math.random() * 0.8);
        const xPoint = Math.cos(angle) * radiusVar;
        const yPoint = Math.sin(angle) * radiusVar;
        i === 0 ? ctx.moveTo(xPoint, yPoint) : ctx.lineTo(xPoint, yPoint);
      }
      ctx.closePath();
      const nebulaGradient = ctx.createRadialGradient(0, 0, radius * 0.2, 0, 0, radius);
      nebulaGradient.addColorStop(0, planet.color || '#4682B4');
      nebulaGradient.addColorStop(1, 'rgba(70, 130, 180, 0.1)');
      ctx.fillStyle = nebulaGradient;
      ctx.fill();
      ctx.globalAlpha = 1;
      break;

    case 'comet':
    case 'meteorite':
      
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = planet.color || '#CCCCCC';
      ctx.fill();
      
      
      let tailAngle = 0;
      if (planet.vx !== 0 || planet.vy !== 0) {
        tailAngle = Math.atan2(planet.vy, planet.vx) + Math.PI;
      } else if (planet.tailDirection) {
        tailAngle = planet.tailDirection + Math.PI;
      }
      
      ctx.save();
      ctx.rotate(tailAngle);
      const tailGradient = ctx.createLinearGradient(0, 0, radius * 10, 0);
      tailGradient.addColorStop(0, planet.type === 'comet' 
        ? 'rgba(100, 200, 255, 0.8)' 
        : 'rgba(255, 140, 0, 0.9)');
      tailGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = tailGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 10, -radius * 2);
      ctx.lineTo(radius * 10, radius * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    case 'ttauriStar':
    const scaledRadiusTauri = planet.radius * camera.zoom;
    drawAccretionDisk(0, radius * 2, [
        'rgba(255, 165, 0, 0.3)',
        'rgba(255, 69, 0, 0.1)'
        ]);
        
        ctx.beginPath();
        ctx.arc(0, 0, radius * (1 + pulseFactor * 0.2), 0, Math.PI * 2);
        const ttauriGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        ttauriGradient.addColorStop(0, '#FFD700');
        ttauriGradient.addColorStop(1, '#FF8C00');
        ctx.fillStyle = ttauriGradient;
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -radius);
        ctx.lineTo(0, -radius * 3);
        ctx.moveTo(0, radius);
        ctx.lineTo(0, radius * 3);
        ctx.stroke();
        break;

    case 'star':
    case 'redDwarf':
    case 'brownDwarf':
    case 'whiteDwarf':
    case 'carbonStar':
    case 'giantStar':
    case 'hypergiant':
    case 'massiveStar':
    
    case 'redGiant':
    case 'redSupergiant':
    case 'redHypergiant':
    
    
    
      
      const starConfigs = {
        star: { colors: ['#FFD700', '#FF8C00'], scale: 1 },
        redDwarf: { colors: ['#FF6347', '#8B0000'], scale: 1.2 },
        brownDwarf: { colors: ['#ff0019ff', '#6d0000ff'], scale: 1 },
        whiteDwarf: { colors: ['#E0FFFF', '#000080'], scale: 0.5 },
        carbonStar: { colors: ['#8B2007', '#8B0000'], scale: 1 },
        giantStar: { colors: ['#FF8C00', '#FF4500'], scale: 1 },
        hypergiant: { colors: ['#FF8000', '#0F6347'], scale: 1 },
        massiveStar: { colors: ['#00BFFF', '#00008B'], scale: 1 },
        strangeStar: { colors: ['#8A2BE2', '#4B0082'], scale: 1 },
        redGiant: { colors: ['#DC143C', '#8B0000'], scale: 2 },
        redSupergiant: { colors: ['#FF0000', '#8B0000'], scale: 3 },
        redHypergiant: { colors: ['#DC143C', '#8B0000'], scale: 4 },
        pulsar: { colors: ['#00FFFF', '#E0F0FF'], scale: 0.3 },
        quarkStar: { colors: ['#3A2BE2', '#000080'], scale: 0.3 },
        magnetar: { colors: ['#FFFFFF', '#E0F082'], scale: 0.3 }
      };
      
      const config = starConfigs[planet.type] || starConfigs.star;
      const scaledRadius = Math.max(1, radius * config.scale);
      
      
      ctx.beginPath();
      ctx.arc(0, 0, scaledRadius, 0, Math.PI * 2);
      const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, scaledRadius);
      starGradient.addColorStop(0, config.colors[0]);
      starGradient.addColorStop(1, config.colors[1]);
      ctx.fillStyle = starGradient;
      ctx.fill();
      
      
      if (planet.type === 'pulsar' || planet.type === 'quarkStar') {
        ctx.globalAlpha = 0.3 + pulseFactor * 0.7;
        ctx.rotate(Date.now() * 0.001);
        
        
        const beamLength = scaledRadius * 15; 
        const beamWidthStart = scaledRadius * 0.1;
        const beamWidthEnd = scaledRadius * 2; 
        
        
        drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgb(255, 255, 255)' },
        { position: 0.7, color: 'rgba(239, 255, 255, 0.5)' },
        { position: 1, color: 'rgba(0, 255, 255, 0)' }
        ], planet.jetAngle);
        
        ctx.rotate(Math.PI);
        drawJet(beamLength, beamWidthStart, beamWidthEnd, [
          { position: 0, color: 'rgb(255, 255, 255)' },
          { position: 0.7, color: 'rgba(255, 255, 255, 0.5)' },
          { position: 1, color: 'rgba(0, 255, 255, 0)' }
        ]);
        
        ctx.globalAlpha = 1;
      }
      else if (planet.type === 'magnetar') {
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.arc(0, 0, scaledRadius * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(38, 43, 226, ${0.3 - i * 0.05})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      else if (planet.type === 'redHypergiant' && graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 8; i++) {
          const size = scaledRadius * (0.6 + Math.random() * 0.7);
          const offsetX = (Math.random() - 0.5) * scaledRadius * 0.8;
          const offsetY = (Math.random() - 0.5) * scaledRadius * 0.8;
          ctx.beginPath();
          ctx.arc(offsetX, offsetY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${0.4 + Math.random() * 0.3})`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      
      
      if (['pulsar', 'quarkStar', 'magnetar', 'strangeStar'].includes(planet.type)) {
        drawGravitationalLens();
      }
      break;

    case 'blackHole':
      
    drawGravitationalLens(radius, 'attractive', 1.2);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;


        
        break;
    case 'wormhole':
      const safeRadius = Math.max(1, radius);
      const safeInnerRadius = Math.max(0.1, safeRadius * 0.7);
      
      
      ctx.beginPath();
      ctx.arc(0, 0, safeRadius, 0, Math.PI * 2);
      const ringGradient = ctx.createRadialGradient(0, 0, safeRadius * 0.8, 0, 0, safeRadius);
      ringGradient.addColorStop(0, 'transparent');
      ringGradient.addColorStop(1, '#00FFFF');
      ctx.fillStyle = ringGradient;
      ctx.fill();
      
      
      ctx.beginPath();
      ctx.arc(0, 0, safeInnerRadius, 0, Math.PI * 2);
      const portalGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, safeInnerRadius);
      portalGradient.addColorStop(0, '#000033');
      portalGradient.addColorStop(1, '#000066');
      ctx.fillStyle = portalGradient;
      ctx.fill();
      
      
      if (graphicsQuality !== 'low') {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.7)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const startAngle = (planet.rotation || 0) * visualTimeScale + i * Math.PI * 0.4;
          ctx.beginPath();
          for (let a = 0; a < Math.PI * 2; a += 0.1) {
            const r = safeInnerRadius * (0.8 + Math.sin(a * 5 + (planet.rotation || 0) * visualTimeScale) * 0.2);
            ctx.lineTo(Math.cos(startAngle + a) * r, Math.sin(startAngle + a) * r);
          }

          
        drawGravitationalLens(radius, 'attractive', 0.7);
          ctx.stroke();
        }
      }
      break;

case 'quasar':
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
    
    
    const scaledRadiusQuasar = planet.radius * camera.zoom;
    drawAccretionDisk(scaledRadiusQuasar * 1.2, scaledRadiusQuasar * 4, [
        'rgba(255, 215, 0, 0.6)',
        'rgba(255, 140, 0, 0.4)',
        'rgba(255, 69, 0, 0.2)'
    ]);
    
    
    if (graphicsQuality !== 'low' && planet.jets) {
        const jetLength = radius * 20;
        const jetWidthStart = radius * 0.1;
        const jetWidthEnd = radius * 2.5;
        
        ctx.save();
        ctx.rotate(planet.jetAngle + (planet.rotation || 0));
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255,255,255,1)' },
            { position: 0.5, color: 'rgba(255,255,150,0.5)' },
            { position: 1, color: 'rgba(255,255,100,0.01)' }
        ]);
        
        ctx.rotate(Math.PI);
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255,255,255,1)' },
            { position: 0.5, color: 'rgba(255,255,150,0.5)' },
            { position: 1, color: 'rgba(255,255,100,0.01)' }
        ]);
        ctx.restore();
    }
    
    
    drawGravitationalLens(radius, 'attractive', 1.5);
    break;

case 'whiteHole':
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    const whiteHoleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    whiteHoleGradient.addColorStop(0, '#ffffff');
    whiteHoleGradient.addColorStop(1, '#e0ffff');
    ctx.fillStyle = whiteHoleGradient;
    ctx.fill();
    
    
    if (graphicsQuality !== 'low') {
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.5, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(0, 0, radius, 0, 0, radius * 1.5);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        glowGradient.addColorStop(1, 'rgba(224, 255, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();
    }
    
    
    if (graphicsQuality !== 'low' && planet.jets) {
        const jetLength = radius * 5;
        const jetWidthStart = radius * 0.1;
        const jetWidthEnd = radius * 1.2;
        
        ctx.save();
        ctx.rotate(planet.jetAngle + (planet.rotation || 0));
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255,255,255,1)' },
            { position: 0.5, color: 'rgba(200,220,255,0.6)' },
            { position: 1, color: 'rgba(150,200,255,0.01)' }
        ]);
        
        ctx.rotate(Math.PI);
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255,255,255,1)' },
            { position: 0.5, color: 'rgba(200,220,255,0.6)' },
            { position: 1, color: 'rgba(150,200,255,0.01)' }
        ]);
        ctx.restore();
    }
    
    
    drawGravitationalLens(radius, 'repulsive', 1.0);
    
    
    const expansionFactor = 1 + Math.sin(Date.now() * 0.005) * 0.1;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.8 * expansionFactor, 0, Math.PI * 2);
    const expansionGradient = ctx.createRadialGradient(
        0, 0, radius * 0.5,
        0, 0, radius * 1.8 * expansionFactor
    );
    expansionGradient.addColorStop(0, 'rgba(100, 180, 255, 0.5)');
    expansionGradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
    ctx.fillStyle = expansionGradient;
    ctx.fill();
    break;

case 'neutronStar':
    
    const neutronRadius = planet.radius * camera.zoom;
    const neutronGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, neutronRadius);
    neutronGradient.addColorStop(0, '#6ae1f7');
    neutronGradient.addColorStop(1, '#3498db');
    
    
    ctx.beginPath();
    ctx.arc(0, 0, neutronRadius, 0, Math.PI * 2);
    ctx.fillStyle = neutronGradient;
    ctx.fill();
    
    
    const pulseSize = neutronRadius * (1 + Math.sin(Date.now() * 0.005) * 0.1);
    ctx.beginPath();
    ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    
    drawGravitationalLens(neutronRadius, 'attractive', 0.9);
    break;


case 'pulsar':
    
    const pulsarRadius = planet.radius * camera.zoom;
    const pulsarGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulsarRadius);
    pulsarGradient.addColorStop(0, '#E0FFFF');
    pulsarGradient.addColorStop(1, '#E0FFFF');
    
    
    ctx.beginPath();
    ctx.arc(0, 0, pulsarRadius, 0, Math.PI * 2);
    ctx.fillStyle = pulsarGradient;
    ctx.fill();
    
    
    ctx.globalAlpha = 0.7;
    ctx.rotate(planet.jetAngle);
    
    const beamLength = pulsarRadius * 115;
    const beamWidthStart = pulsarRadius * 0.1;
    const beamWidthEnd = pulsarRadius * 2;
    
    drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgba(220, 225, 225, 1)' },
        { position: 0.7, color: 'rgba(220, 255, 255, 0.5)' },
        { position: 1, color: 'rgba(0, 255, 255, 0)' }
    ]);
    
    ctx.rotate(Math.PI);
    drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgba(220, 255, 255, 1)' },
        { position: 0.7, color: 'rgba(220, 255, 255, 0.5)' },
        { position: 1, color: 'rgba(0, 255, 255, 0)' }
    ]);
    
    ctx.globalAlpha = 1;
    drawGravitationalLens(radius, 'attractive', 0.8);
    break;

case 'quarkStar': {
    
    const quarkScaledRadius = planet.radius * camera.zoom;
    
    
    drawGravitationalLens(quarkScaledRadius, 'attractive', 1.2);
    
    
    const quarkGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, quarkScaledRadius);
    quarkGradient.addColorStop(0, '#8A2BE2');
    quarkGradient.addColorStop(0.7, '#4B0082');
    quarkGradient.addColorStop(1, '#2E0854');
    
    ctx.beginPath();
    ctx.arc(0, 0, quarkScaledRadius, 0, Math.PI * 2);
    ctx.fillStyle = quarkGradient;
    ctx.fill();
    
    
    const quarkPulseSize = quarkScaledRadius * (1 + Math.sin(Date.now() * 0.005) * 0.15);
    ctx.beginPath();
    ctx.arc(0, 0, quarkPulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    
    if (graphicsQuality !== 'low') {
        for (let i = 0; i < 12; i++) {
            const ringSize = quarkScaledRadius * (1.5 + i * 0.25);
            const alpha = 0.4 - i * 0.05;
            
            ctx.beginPath();
            ctx.arc(0, 0, ringSize, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(138, 43, 226, ${alpha})`;
            ctx.lineWidth = 1 + i * 0.3;
            ctx.stroke();
        }
    }
    
    
    ctx.globalAlpha = 0.85;
    
    
    const rotationSpeed = planet.jetRotationSpeed || 3.0;
    planet.jetAngle = (planet.jetAngle || 0) + rotationSpeed * visualTimeScale;
    
    
    const beamLength = quarkScaledRadius * 25;
    const beamWidthStart = quarkScaledRadius * 0.15;
    const beamWidthEnd = quarkScaledRadius * 3.5;
    
    ctx.save();
    ctx.rotate(planet.jetAngle);
    drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgba(138, 43, 226, 1)' },
        { position: 0.3, color: 'rgba(255, 105, 180, 0.8)' },
        { position: 0.6, color: 'rgba(75, 0, 130, 0.6)' },
        { position: 1, color: 'rgba(46, 8, 84, 0)' }
    ]);
    
    
    ctx.rotate(Math.PI);
    drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgba(138, 43, 226, 1)' },
        { position: 0.3, color: 'rgba(255, 105, 180, 0.8)' },
        { position: 0.6, color: 'rgba(75, 0, 130, 0.6)' },
        { position: 1, color: 'rgba(46, 8, 84, 0)' }
    ]);
    ctx.restore();
    
    
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.7;
        for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI/3;
            ctx.save();
            ctx.rotate(planet.jetAngle * 0.5 + angle);
            
            drawJet(
                beamLength * 0.8, 
                beamWidthStart * 0.3, 
                beamWidthEnd * 0.7, 
                [
                    { position: 0, color: 'rgba(0, 255, 255, 0.8)' },
                    { position: 0.5, color: 'rgba(100, 200, 255, 0.5)' },
                    { position: 1, color: 'rgba(0, 0, 255, 0)' }
                ]
            );
            
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
    
    
    ctx.beginPath();
    ctx.arc(0, 0, quarkScaledRadius * 1.5, 0, Math.PI * 2);
    const auraGradient = ctx.createRadialGradient(
        0, 0, quarkScaledRadius * 0.7,
        0, 0, quarkScaledRadius * 1.5
    );
    auraGradient.addColorStop(0, 'rgba(138, 43, 226, 0.3)');
    auraGradient.addColorStop(1, 'rgba(46, 8, 84, 0)');
    ctx.fillStyle = auraGradient;
    ctx.fill();
    break;
}
case 'strangeStar': {
    
    const strangeScaledRadius = planet.radius * camera.zoom;
    
    
    drawGravitationalLens(strangeScaledRadius, 'attractive', 1.5);
    
    
    const strangeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, strangeScaledRadius);
    strangeGradient.addColorStop(0, '#8A00FF');  
    strangeGradient.addColorStop(0.3, '#FF00FF'); 
    strangeGradient.addColorStop(0.7, '#00FFFF'); 
    strangeGradient.addColorStop(1, '#0000FF');   
    
    ctx.beginPath();
    ctx.arc(0, 0, strangeScaledRadius, 0, Math.PI * 2);
    ctx.fillStyle = strangeGradient;
    ctx.fill();
    
    
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.8;
        for (let i = 0; i < 36; i++) {
            const angle = (i / 36) * Math.PI * 2;
            const distance = strangeScaledRadius * (0.6 + Math.random() * 0.3);
            const size = strangeScaledRadius * 0.05 * (0.8 + Math.random() * 0.4);
            
            ctx.save();
            ctx.rotate(angle);
            ctx.translate(distance, 0);
            
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let j = 0; j < 6; j++) {
                const hexAngle = j * Math.PI / 3;
                ctx.lineTo(Math.cos(hexAngle) * size, Math.sin(hexAngle) * size);
            }
            ctx.closePath();
            
            const patternColor = i % 3 === 0 ? '#FF00FF' : 
                               i % 3 === 1 ? '#00FFFF' : '#FFFF00';
            ctx.fillStyle = patternColor;
            ctx.fill();
            
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
    
    
    const pulseSize = strangeScaledRadius * (1 + Math.sin(Date.now() * 0.003) * 0.25);
    ctx.beginPath();
    ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    
    ctx.beginPath();
    ctx.arc(0, 0, strangeScaledRadius * 1.8, 0, Math.PI * 2);
    const fluorescenceGradient = ctx.createRadialGradient(
        0, 0, strangeScaledRadius * 0.5,
        0, 0, strangeScaledRadius * 1.8
    );
    fluorescenceGradient.addColorStop(0, 'rgba(138, 0, 255, 0.5)');
    fluorescenceGradient.addColorStop(0.7, 'rgba(255, 0, 255, 0.3)');
    fluorescenceGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    ctx.fillStyle = fluorescenceGradient;
    ctx.fill();
    
    
    ctx.globalAlpha = 0.9;
    
    
    const rotationSpeed = (planet.jetRotationSpeed || 2.0) + Math.sin(Date.now() * 0.001) * 1.5;
    planet.jetAngle = (planet.jetAngle || 0) + rotationSpeed * visualTimeScale;
    
    
    const beamLength = strangeScaledRadius * 30;
    const beamWidthStart = strangeScaledRadius * 0.2;
    const beamWidthEnd = strangeScaledRadius * 4;
    
    ctx.save();
    ctx.rotate(planet.jetAngle);
    drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgba(138, 43, 226, 1)' },
        { position: 0.2, color: 'rgba(255, 0, 255, 0.9)' },
        { position: 0.4, color: 'rgba(0, 255, 255, 0.8)' },
        { position: 0.6, color: 'rgba(255, 255, 0, 0.6)' },
        { position: 1, color: 'rgba(0, 0, 0, 0)' }
    ]);
    
    
    ctx.rotate(Math.PI);
    drawJet(beamLength, beamWidthStart, beamWidthEnd, [
        { position: 0, color: 'rgba(138, 43, 226, 1)' },
        { position: 0.2, color: 'rgba(255, 0, 255, 0.9)' },
        { position: 0.4, color: 'rgba(0, 255, 255, 0.8)' },
        { position: 0.6, color: 'rgba(255, 255, 0, 0.6)' },
        { position: 1, color: 'rgba(0, 0, 0, 0)' }
    ]);
    ctx.restore();
    
    
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.7;
        for (let i = 0; i < 4; i++) {
            const angle = i * Math.PI/2;
            ctx.save();
            ctx.rotate(planet.jetAngle * 0.5 + angle);
            
            drawJet(
                beamLength * 0.8, 
                beamWidthStart * 0.3, 
                beamWidthEnd * 0.7, 
                [
                    { position: 0, color: 'rgba(0, 255, 255, 0.8)' },
                    { position: 0.5, color: 'rgba(100, 200, 255, 0.5)' },
                    { position: 1, color: 'rgba(0, 0, 255, 0)' }
                ]
            );
            
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
    
    
    ctx.beginPath();
    ctx.arc(0, 0, strangeScaledRadius * 1.5, 0, Math.PI * 2);
    const auraGradient = ctx.createRadialGradient(
        0, 0, strangeScaledRadius * 0.7,
        0, 0, strangeScaledRadius * 1.5
    );
    auraGradient.addColorStop(0, 'rgba(138, 43, 226, 0.3)');
    auraGradient.addColorStop(1, 'rgba(46, 8, 84, 0)');
    ctx.fillStyle = auraGradient;
    ctx.fill();
    break;
}
    case 'magnetar':
        
        drawGravitationalLens(radius, 'attractive', 1.1);
        
        
        for (let i = 0; i < 8; i++) {
            const ringSize = radius * (1.5 + i * 0.3);
            const alpha = 0.4 - i * 0.05;
            
            ctx.beginPath();
            ctx.arc(0, 0, ringSize, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(138, 43, 226, ${alpha})`;
            ctx.lineWidth = 1 + i * 0.5;
            ctx.stroke();
            const pulseSize = radius * (1 + Math.sin(Date.now() * 0.005) * 0.1);
            ctx.beginPath();
            ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            drawGravitationalLens(radius, 'attractive', 1.1);
        }
        break;

    default:
      
      const safeRadiusDefault = Math.max(1, radius);
      ctx.beginPath();
      ctx.arc(0, 0, safeRadiusDefault, 0, Math.PI * 2);
      ctx.fillStyle = planet.color || '#cccccc';
      ctx.fill();
  }

  
if ([
    'blackHole', 'quasar', 'supermassiveStar', 'quarkStar'
].includes(planet.type) && graphicsQuality === 'high') {
    const distortionStrength = Math.min(1.5, planet.mass / 1e15);
    const timeFactor = Date.now() * 0.0005;
    
    ctx.beginPath();
    for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const distortion = Math.sin(angle * 5 + timeFactor) * distortionStrength * 0.2;
        const pointRadius = radius * 1.8 * (1 + distortion);
        const x = Math.cos(angle) * pointRadius;
        const y = Math.sin(angle) * pointRadius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    const distortionGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2);
    distortionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    distortionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = distortionGradient;
    ctx.fill();
}

  ctx.restore();

  if (shadowsEnabled && graphicsQuality ==='medium' && ![
    'star', 'brownDwarf', 'whiteDwarf', 'blackHole', 'quasar',
    'pulsar', 'quarkStar', 'magnetar'
  ].includes(planet.type)) {
        const lightIntensity = calculateLightIntensity();
        const shadowIntensity = 1 - lightIntensity;
        const shadowAlpha = 0.7 * shadowIntensity;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        const shadowGradient = ctx.createRadialGradient(
            x + radius * 1.5, 
            y + radius * 1.5, 
            0,
            x, 
            y, 
            radius * 3.2
        );
        
        shadowGradient.addColorStop(0, `rgba(0, 0, 0, ${0.8 * shadowAlpha})`);
        shadowGradient.addColorStop(0.7, `rgba(0, 0, 0, ${0.4 * shadowAlpha})`);
        shadowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = shadowGradient;
        ctx.fill();
    }

    if (shadowsEnabled && graphicsQuality ==='high' && ![
    'star', 'brownDwarf', 'whiteDwarf', 'blackHole', 'quasar',
    'pulsar', 'quarkStar', 'magnetar'
  ].includes(planet.type)) {
        const lightIntensity = calculateLightIntensity();
        const shadowIntensity = 1 - lightIntensity;
        const shadowAlpha = 10.7 * shadowIntensity;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        const shadowGradient = ctx.createRadialGradient(
            x + radius * 1.5, 
            y + radius * 1.5, 
            0,
            x, 
            y, 
            radius * 3.2
        );
    
        shadowGradient.addColorStop(0, `rgba(0, 0, 0, ${0.8 * shadowAlpha})`);
        shadowGradient.addColorStop(0.7, `rgba(0, 0, 0, ${100.4 * shadowAlpha})`);
        shadowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = shadowGradient;
        ctx.fill();
    }

  if ([
    'star', 'brownDwarf', 'whiteDwarf', 'redDwarf', 'ttauriStar',
    'carbonStar', 'giantStar', 'hypergiant', 'massiveStar', 'strangeStar',
    'redGiant', 'redSupergiant', 'redHypergiant', 'pulsar', 'quarkStar',
  ].includes(planet.type) && graphicsQuality !== 'low') {
    const safeRadius = Math.max(1, radius);
    ctx.beginPath();
    ctx.arc(x, y, safeRadius * 2, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(
      x, y, safeRadius,
      x, y, safeRadius * 3
    );
    glowGradient.addColorStop(0, planet.glowColor || '#ffffff');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.fill();
  }

  
  if (planet.rings && graphicsQuality !== 'low') {
    const safeRadius = Math.max(1, radius);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(planet.ringRotation || 0);

    let ringThickness, ringRadius;
    if (planet.type === 'asteroid') {
      ringThickness = Math.max(1, Math.min(4, (planet.ringMass || 5) * 0.05)) * camera.zoom;
      ringRadius = safeRadius * 1.15;
    } else if (planet.type === 'planetoid') {
      ringThickness = Math.max(1.5, Math.min(6, (planet.ringMass || 8) * 0.07)) * camera.zoom;
      ringRadius = safeRadius * 1.18;
    } else {
      ringThickness = Math.max(2, Math.min(20, planet.ringMass * 0.1)) * camera.zoom;
      ringRadius = safeRadius * 1.8;
    }

    ctx.beginPath();
    ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = planet.ringColor || 'rgba(180,180,180,0.5)';
    ctx.lineWidth = ringThickness;
    ctx.stroke();

    if (graphicsQuality === 'high') {
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = ringThickness * 0.3;
      ctx.stroke();
    }
    ctx.restore();
  }

  
  if (namesVisible && planet.name && graphicsQuality !== 'low') {
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(planet.name, x, y - radius - 10);
    
    if (planet.planetClass && camera.zoom > 0.3) {
      ctx.font = '10px Arial';
      ctx.fillStyle = '#cccccc';
      ctx.fillText(planet.planetClass, x, y - radius - 25);
    }
  }

}
function drawRing(astro, ctx) {
    if (!astro.rings) return; 

    const { x, y, radius, ringColor, ringHighlight, ringRotation } = astro;
    ctx.save(); 
    ctx.globalAlpha = 0.5; 
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); 
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
    ctx.strokeStyle = ringHighlight;
    ctx.lineWidth = 1;
    ctx.setLineDash([]); 
    ctx.stroke();
    ctx.restore(); 
}
function drawTemperatureZones() {
    planets.forEach(planet => {
        
        const heatEmittingTypes = [
            'star', 'ttauriStar', 'carbonStar', 'giantStar', 'hypergiant',
            'massiveStar', 'brownDwarf', 'whiteDwarf', 'redDwarf', 'redGiant',
            'redSupergiant', 'quasar', 'whiteHole', 'pulsar', 'neutronStar', 'quarkStar', 'strangeStar'
        ];
        
        if (!heatEmittingTypes.includes(planet.type)) return;

        
        const starRadius = calculateRadiusForType(planet.type, planet.mass);
        
        
        const zoneMultipliers = [
            2,  
            5,  
            10, 
            15, 
            20, 
            30  
        ];

        
        const baseZoneSizes = zoneMultipliers.map(multiplier => 
            Math.max(starRadius * 2, 50) * multiplier
        );

        
        const scaledZoneSizes = baseZoneSizes.map(size => size * camera.zoom);

        
        const zoneColors = [
            'rgba(255, 0, 0, 0.6)',    
            'rgba(255, 81, 0, 0.6)',   
            'rgba(255, 153, 0, 0.6)',   
            'rgba(51, 204, 51, 0.6)',   
            'rgba(51, 153, 255, 0.6)',  
            'rgba(0, 0, 204, 0.6)'      
        ];

        
        const screenX = (planet.x - camera.x) * camera.zoom + canvas.width / 2;
        const screenY = (planet.y - camera.y) * camera.zoom + canvas.height / 2;

        
        const minVisibleRadius = 10; 
        const zoneSizes = scaledZoneSizes.map(size => 
            Math.max(minVisibleRadius, size)
        );

        
        const maxZoneRadius = Math.max(...zoneSizes);
        const margin = maxZoneRadius * 2;
        
        if (screenX < -margin || screenX > canvas.width + margin || 
            screenY < -margin || screenY > canvas.height + margin) return;

        
        for (let i = 0; i < zoneSizes.length; i++) {
            const radius = zoneSizes[i];
            
            
            if (screenX - radius > canvas.width || screenX + radius < 0 ||
                screenY - radius > canvas.height || screenY + radius < 0) continue;

            ctx.beginPath();
            ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = zoneColors[i];
            ctx.lineWidth = 2;
            ctx.stroke();
            
            
            if (i === 3 && camera.zoom > 0.1) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Zona Habitável', screenX, screenY - radius - 5);
            }
        }
    });
}
function fgpPlanetsTemperature(deltaTime) {
    planets.forEach(planet => {
        
        const water = planet.waterValue;
        const gas = planet.gasValue;
        const clouds = planet.cloudsValue;

        
        if (!['rockyPlanet', 'gasGiant', 'planetoid', 'asteroid', 'meteoroid', 'spaceDust', 'comet', 'meteorite'].includes(planet.type)) return;
        
        let totalHeat = 0;
        
        
        planets.forEach(heatSource => {
            if (heatSource === planet) return;
            
            const heatEmittingTypes = [
                'star', 'ttauriStar', 'carbonStar', 'giantStar', 'hypergiant',
                'massiveStar', 'brownDwarf', 'whiteDwarf', 'redDwarf', 'redGiant',
                'redSupergiant', 'quasar', 'whiteHole'
            ];
            
            if (heatEmittingTypes.includes(heatSource.type)) {
                const dx = planet.x - heatSource.x;
                const dy = planet.y - heatSource.y;
                const distance = Math.hypot(dx, dy);
                const minDistance = 100;
                const effectiveDistance = Math.max(distance, minDistance);
                
                
                const normalizedMass = Math.log(heatSource.mass || 1) * 10;
                const heatIntensity = (heatSource.temperature || 5000) * normalizedMass / effectiveDistance;
                totalHeat += heatIntensity;
            }
        });

        
        const coolingRate = 0.05;
        const heatingRate = 0.1;
        const targetTemp = totalHeat > 0 ? totalHeat * 0.1 : -273.15;
        
        planet.temperature = Math.max(-273.15, planet.temperature) + 
            (targetTemp - planet.temperature) * 
            (totalHeat > 0 ? heatingRate : coolingRate) * 
            (deltaTime / 1000);

                
        function hasConditionsChanged() {
            if (!planet.lastConditionCheck) return false;
            
            const prevTemp = planet.lastConditionCheck.temperature ?? 0;
            const prevWater = planet.lastConditionCheck.waterValue ?? 0;
            const prevGas = planet.lastConditionCheck.gasValue ?? 0;
            const prevClouds = planet.lastConditionCheck.cloudsValue ?? 0;
            
            return (
                Math.abs(planet.temperature - prevTemp) > 5 ||
                Math.abs(planet.waterValue - prevWater) > 10 ||
                Math.abs(planet.gasValue - prevGas) > 10 ||
                Math.abs(planet.cloudsValue - prevClouds) > 10
            );
        }

        
        function initExoticProperties() {
            if (!planet.currentClassTime) planet.currentClassTime = 0;
            if (!planet.originalClass) {
                planet.originalClass = getOriginalClass(planet.type);
            }
            if (!planet.exoticAcquired) planet.exoticAcquired = false;
        }

        
        function checkExoticTransformation(prefixes, cores, suffixes) {

            if (!planet.exoticAcquired && planet.planetClass === planet.originalClass) {
                planet.currentClassTime += deltaTime / 1000 * getTimeScaleFactor();
                const exoticThreshold = 5e6; 
                
                if (planet.currentClassTime >= exoticThreshold && Math.random() < 0.01) {
                    planet.exoticAcquired = true;
                    planet.exoticColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                    planet.exoticName = generateExoticName(prefixes, cores, suffixes);
                unlockAchievement(34);
                }
            }
        }

        
        function applyExoticClass() {
            if (planet.exoticAcquired) {
                planet.color = planet.exoticColor;
                planet.planetClass = planet.exoticName;
            }
        }

        
        function saveCurrentConditions() {
            const conditionProps = {
                rockyPlanet: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                gasGiant: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                planetoid: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                asteroid: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                meteoroid: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                spaceDust: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                comet: ['temperature', 'waterValue', 'gasValue', 'cloudsValue'],
                meteorite: ['temperature', 'waterValue', 'gasValue', 'cloudsValue']
            };

            planet.lastConditionCheck = {};
            if (conditionProps[planet.type]) {
                conditionProps[planet.type].forEach(prop => {
                    planet.lastConditionCheck[prop] = planet[prop];
                });
            }
        }

        
        initExoticProperties();
        const conditionsChanged = hasConditionsChanged();
        
        if (conditionsChanged) {
            planet.exoticAcquired = false;
            planet.currentClassTime = 0;
        }

        saveCurrentConditions();

        
        if (planet.type === 'rockyPlanet') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;

            checkExoticTransformation(
                ['Crystalline', 'Magnetic', 'Radioative', 'Vibrational', 'Quantum'],
                ['Cerium', 'Zirconium', 'Tantalum', 'Ruthenium', 'Hafnium'],
                ['-X', '-Ω', '-Δ', '-Σ', '-Φ']
            );
            
            if (planet.temperature > 100 && planet.cloudsValue < 10 && graphicsQuality != 'high' && planet.cloudsValue < 100 && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#da1600';
                planet.landColor = '#000000ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 0 && planet.cloudsValue < 20 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#da1600';
                planet.landColor = '#000000ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 0 && planet.cloudsValue < 99 && planet.gasValue > 99){  
                planet.planetClass = 'Carbon Lava Planet'; //verificado
                planet.color = '#681f17ff';
                planet.landColor = '#3f0000ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 20 && planet.cloudsValue < 30 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#8b261aff';
                planet.landColor = '#130606ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 20 && planet.cloudsValue < 40 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#a54338ff';
                planet.landColor = '#422020ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 40 && planet.cloudsValue < 50 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#b4554bff';
                planet.landColor = '#492626ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 50 && planet.cloudsValue < 60 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#ad675fff';
                planet.landColor = '#5c3939ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#b89a97ff';
                planet.landColor = '#725454ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 70 && planet.cloudsValue < 80 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#755d5bff';
                planet.landColor = '#3f2929ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 80 && planet.cloudsValue <= 99 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; //verificado
                planet.color = '#362a29ff';
                planet.landColor = '#201717ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 100) {  
                planet.planetClass = 'Cloudy Lava Planet'; //verificado
                planet.color = '#180200ff';
                planet.landColor = '#180200ff';
                unlockAchievement(4)
                if (planet.gasValue > 99) {
                planet.planetClass = 'Acidic Cloudy Lava Planet'; //verificado
                planet.color = '#ffa600ff';
                planet.landColor = '#ffa600ff';
            }
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Cloudy Oceanic Planet'; //verificado
                planet.color = '#94caffff';
                planet.landColor = '#94caffff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Oceanic Planet'; //verificado
                planet.color = '#20ff7dff';
                planet.landColor = '#20ff7dff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Cloudy Oceanic Planet'; //verificado
                planet.color = '#a9ff94ff';
                planet.landColor = '#a9ff94ff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oceanic Planet'; //verificado
                planet.color = '#004e9c';
                planet.landColor = '#004e9c';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 40 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; //verificado
                planet.color = '#004e9c';
                planet.landColor = '#004e9c';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 40 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; //verificado
                planet.color = '#1f61a3ff';
                planet.landColor = '#1f61a3ff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 50 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; //verificado
                planet.color = '#58a5f1ff';
                planet.landColor = '#58a5f1ff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 70 && planet.cloudsValue <= 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; //verificado
                planet.color = '#7397bbff';
                planet.landColor = '#7397bbff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Oceanic Planet'; //verificado
                planet.color = '#9accffff';
                planet.landColor = '#9accffff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue >= 100 &&
                    planet.cloudsValue <= 99) {
                planet.planetClass = 'Oxygenated Oceanic Planet'; //verificado
                planet.color = '#009c4eff';
                planet.landColor = '#009c4eff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue >= 100 &&
                    planet.cloudsValue > 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Oxygenated Oceanic Planet'; //verificado
                planet.color = '#d8ff49ff';
                planet.landColor = '#d8ff49ff';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && graphicsQuality != 'high') {
                planet.planetClass = 'Storm Planet'; //verificado
                planet.color = '#00109cff';
                planet.landColor = '#00109cff';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Storm Planet'; //verificado
                planet.color = '#009c60ff';
                planet.landColor = '#009c60ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet'; //verificado
                planet.color = '#0e1874ff';
                planet.landColor = '#0e1874ff';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 99 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Storm Planet';
                planet.color = '#009c60ff';
                planet.landColor = '#009c60ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet'; //verificado
                planet.color = '#0c1355ff';
                planet.landColor = '#0c1355ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 60 && planet.cloudsValue <= 99 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet'; //verificado
                planet.color = '#060a3aff';
                planet.landColor = '#060a3aff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 99) {
                planet.planetClass = 'Super Storm Planet'; //verificado
                planet.color = '#000538ff';
                planet.landColor = '#000538ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 99) {
                planet.planetClass = 'Super Oxygenated Storm Planet'; //verificado
                planet.color = '#003827ff';
                planet.landColor = '#003827ff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue <= 99 && planet.gasValue <= 99) {
                planet.planetClass = 'Frozen Planet'; //verificado
                planet.color = '#70aeaf';
                planet.landColor = '#ffffffff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Frozen Planet'; //verificado
                planet.color = '#ffffffff';
                planet.landColor = '#ffffffff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue <= 99 && planet.gasValue > 99) {
                planet.planetClass = 'Condensed Air Frozen Planet'; //verificado
                planet.color = '#a3af70ff';
                planet.landColor = '#ffef95ff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Cloudy Condensed Air Frozen Planet'; //verificado
                planet.color = '#eeffa2ff';
                planet.landColor = '#fdff92ff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue <= 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Frozen and Arid Planet'; //verificado
                planet.color = '#aaaaaaff';
                planet.landColor = '#ffffff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Condensed Air Frozen and Arid Planet'; //verificado
                planet.color = '#f1f8afff';
                planet.landColor = '#fffc62ff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Frozen and Arid Planet'; //verificado
                planet.color = '#ffffffff';
                planet.landColor = '#cacacaff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Condensed Air Cloudy Frozen and Arid Planet'; //verificado
                planet.color = '#aaaaaaff';
                planet.landColor = '#ffffff';
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Habitable Planet';//verificado
                planet.color = '#0088e2ff';
                planet.landColor = '#099900';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Planet';//verificado
                planet.color = '#00e284ff';
                planet.landColor = '#529900ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';//verificado
                planet.color = '#0088e2ff';
                planet.landColor = '#099900';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Planet';//verificado
                planet.color = '#4af7afff';
                planet.landColor = '#529900ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Planet';//verificado
                planet.color = '#87f7c8ff';
                planet.landColor = '#69a02bff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Cloudy Planet';//verificado
                planet.color = '#a8ecd0ff';
                planet.landColor = '#b6b851ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 40 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';//verificado
                planet.color = '#1a95e7ff';
                planet.landColor = '#20a017ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 40 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';//verificado
                planet.color = '#3da6ecff';
                planet.landColor = '#3ea737ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';//verificado
                planet.color = '#57aee9ff';
                planet.landColor = '#5ab353ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';//verificado
                planet.color = '#75b7e4ff';
                planet.landColor = '#7bc276ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 70 && planet.cloudsValue <= 80 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Cloudy Habitable Planet';//verificado
                planet.color = '#94ccf1ff';
                planet.landColor = '#9fd49bff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue === 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Habitable Planet';//verificado
                planet.color = '#91d3ffff';
                planet.landColor = '#adfca8ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature > 20 && planet.temperature <= 30 &&   
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue >= 40 && planet.gasValue <= 70) {
                planet.planetClass = 'Cloudy Planet';//verificado
                planet.color = '#add896'; 
                planet.landColor = '#add896';
            } else if (planet.temperature > 20 && planet.temperature <= 30 &&   
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue > 70) {
                planet.planetClass = 'Oxygenated Cloudy Planet';//verificado
                planet.color = '#d8d496ff'; 
                planet.landColor = '#ccd896ff';
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Temperate Planet';//verificado
                planet.color = '#00ffd5ff';
                planet.landColor = '#9bd105ff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Temperate Planet';//verificado
                planet.color = '#00ffd5ff';
                planet.landColor = '#9bd105ff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Temperate Planet';//verificado
                planet.color = '#2ffcffff';
                planet.landColor = '#05d161ff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Cloudy Temperate Planet';//verificado
                planet.color = '#17eef1ff';
                planet.landColor = '#05d18dff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 100 &&  
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue >= 40 && planet.gasValue <= 70) {
                planet.planetClass = 'Temperate Cloudy Planet';//verificado
                planet.color = '#00CED1';
                planet.landColor = '#00CED1';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue <= 99 && planet.gasValue <= 99 && graphicsQuality != 'high') {  
                planet.planetClass = 'Desert Planet';//verificado
                planet.color = '#ff7b00ff';
                planet.landColor = '#FFA500';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality != 'high' && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';//verificado
                planet.color = '#ff1100ff';
                planet.landColor = '#ff5e00ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 20 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';//verificado
                planet.color = '#ff7b00ff';
                planet.landColor = '#FFA500';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 20 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';//verificado
                planet.color = '#ff1100ff';
                planet.landColor = '#ff5e00ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue > 20 && planet.cloudsValue <= 50 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';//verificado
                planet.color = '#ff4c3fff';
                planet.landColor = '#ff3232ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' &&  planet.cloudsValue > 50 && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Semi Cloudy Oxygenated Desert Planet';//verificado
                planet.color = '#ff938bff';
                planet.landColor = '#ff7979ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 30 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';//verificado
                planet.color = '#ff8d23ff';
                planet.landColor = '#faac1cff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue > 30 && planet.cloudsValue < 60 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';//verificado
                planet.color = '#fdb169ff';
                planet.landColor = '#ffc252ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Semi Cloudy Desert Planet';//verificado
                planet.color = '#ffcfa2ff';
                planet.landColor = '#ffd483ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Desert Planet';//verificado
                planet.color = '#ffcfa2ff';
                planet.landColor = '#ffd483ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Cloudy Desert Planet';//verificado
                planet.color = '#ffa2a2ff';
                planet.landColor = '#ff8b83ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality !='high') {  
                planet.planetClass = 'Humid Desert Planet';//verificado
                planet.color = '#00ffddff';
                planet.landColor = '#ffbb00ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 0 && planet.cloudsValue < 30 && planet.gasValue <= 99) {  
                planet.planetClass = 'Humid Desert Planet';//verificado
                planet.color = '#00ffddff';
                planet.landColor = '#ffbb00ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 0 && planet.cloudsValue < 30 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Humid Desert Planet';
                planet.color = '#00ff80ff';
                planet.landColor = '#ff5100ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 30 && planet.cloudsValue < 50 && planet.gasValue <= 99) {  
                planet.planetClass = 'Humid Desert Planet';//verificado
                planet.color = '#58f8e3ff';
                planet.landColor = '#ffca38ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 50 && planet.cloudsValue < 60 && planet.gasValue <= 99) {  
                planet.planetClass = 'Semi Fog Humid Desert Planet';//verificado
                planet.color = '#58f8e3ff';
                planet.landColor = '#ffca38ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Fog Humid Desert Planet';//verificado
                planet.color = '#9cfff2ff';
                planet.landColor = '#ffe59cff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue > 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Super Fog Humid Desert Planet';//verificado
                planet.color = '#76ffedff';
                planet.landColor = '#83e2faff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Fog Humid Desert Planet';//verificado
                planet.color = '#bbff9cff';
                planet.landColor = '#ffe59cff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue > 70 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Super Fog Humid Desert Planet';//verificado
                planet.color = '#56ffbeff';
                planet.landColor = '#60ffa7ff';
            } else if (planet.temperature <= -270 ){
                unlockAchievement(33)
                planet.color = '#ffffffff';
                planet.landColor = '#ffffffff';
                planet.planetClass = 'Extreme Frozen Planet';//verificado
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Tundra Planet';//verificado
                planet.color = '#0c01a7ff';
                planet.landColor = '#e74c50';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';
                planet.color = '#4901a7ff';
                planet.landColor = '#e74cc0ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Tundra Planet';//verificado
                planet.color = '#0c01a7ff';
                planet.landColor = '#e74c50';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';//verificado
                planet.color = '#4901a7ff';
                planet.landColor = '#e74cc0ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';//verificado
                planet.color = '#572c8fff';
                planet.landColor = '#a54e8fff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Tundra Planet';//verificado
                planet.color = '#1e1961ff';
                planet.landColor = '#ad5e61ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Storm Tundra Planet';//verificado
                planet.color = '#13122eff';
                planet.landColor = '#362746ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Storm Tundra Planet';//verificado
                planet.color = '#020041ff';
                planet.landColor = '#211c36ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue > 70) {
                planet.planetClass = 'Super Storm Tundra Planet';//verificado
                planet.color = '#020041ff';
                planet.landColor = '#211c36ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Oxygenated Storm Tundra Planet';//verificado
                planet.color = '#004123ff';
                planet.landColor = '#31361cff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 70) {
                planet.planetClass = 'Oxygenated Super Storm Tundra Planet';//verificado
                planet.color = '#030e09ff';
                planet.landColor = '#0c0e06ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Humid Tundra Planet';//verificado
                planet.color = '#0c01a7ff';
                planet.landColor = '#564ce7ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';
                planet.color = '#1f01a7ff';
                planet.landColor = '#9c4ce7ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Tundra Planet';//verificado
                planet.color = '#070064ff';
                planet.landColor = '#7b4ce7ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';//verificado
                planet.color = '#110027ff';
                planet.landColor = '#5c4ce7ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';//verificado
                planet.color = '#3b2c8fff';
                planet.landColor = '#544ea5ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Tundra Planet';//verificado
                planet.color = '#05004bff';
                planet.landColor = '#765eadff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Semi Storm Tundra Planet';//verificado
                planet.color = '#030055ff';
                planet.landColor = '#25004dff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Humid Storm Tundra Planet';//verificado
                planet.color = '#000c41ff';
                planet.landColor = '#09002cff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue > 70) {
                planet.planetClass = 'Humid Super Storm Tundra Planet';//verificado
                planet.color = '#030218ff';
                planet.landColor = '#070025ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Humid Oxygenated Storm Tundra Planet';//verificado
                planet.color = '#0a0041ff';
                planet.landColor = '#2a1c36ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 70) {
                planet.planetClass = 'Humid Oxygenated Super Storm Tundra Planet';//verificado
                planet.color = '#030a0eff';
                planet.landColor = '#06070eff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality !='high') {
                planet.planetClass = 'Cold Desert Planet';//verificado
                planet.color = '#f85c35ff';
                planet.landColor = '#f83200ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality !='high') {
                planet.planetClass = 'Oxygenated Cold Desert Planet';
                planet.color = '#f83535ff';
                planet.landColor = '#f80000ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality ==='high') {
                planet.planetClass = 'Oxygenated Cold Desert Planet';
                planet.color = '#ff6a6aff';
                planet.landColor = '#ff2d2dff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';//verificado
                planet.color = '#f85c35ff';
                planet.landColor = '#f83200ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';//verificado
                planet.color = '#f83535ff';
                planet.landColor = '#f80000ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 40 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';//verificado
                planet.color = '#ff8d70ff';
                planet.landColor = '#ff5930ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 40 && planet.cloudsValue <= 60 && graphicsQuality ==='high') {
                planet.planetClass = 'Semi Cloudy Cold Desert Planet';//verificado
                planet.color = '#ffb6a3ff';
                planet.landColor = '#ff977dff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 60) {
                planet.planetClass = 'Cloudy Cold Desert Planet';//verificado
                planet.color = '#ffb6a3ff';
                planet.landColor = '#ff977dff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 60) {
                planet.planetClass = 'Oxgenated Cloudy Cold Desert Planet';//verificado
                planet.color = '#ffa3a3ff';
                planet.landColor = '#ff7d7dff';
            } else {
                planet.planetClass = 'Rocky Planet';
                planet.color = '#555555';
                planet.landColor = '#2b2b2bff';
            }

            applyExoticClass();
        }
        
        else if (planet.type === 'gasGiant') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            planet.temperature = planet.temperature || 20;

            checkExoticTransformation(
                ['Plasma', 'Crystalline', 'Magnetic', 'Radioative', 'Vibrational'],
                ['Neptuno', 'Jupiterian', 'Saturnian', 'Hidrogenic'],
                ['-Ω', '-Δ', '-Σ', '-Φ', '-Ψ']
            );
            if (planet.temperature >= 100 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Hot Jupiter';//verificado
                planet.color = '#ff0800ff';
                unlockAchievement(4)
            } else if (planet.temperature >= 70 && planet.temperature <= 100 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Temperate Jupiter';//verificado
                planet.color = '#ff3300ff';
                unlockAchievement(4)
            } else if (planet.temperature <= 0 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 20)  {
                planet.planetClass = 'Ice Giant';//verificado
                planet.color = '#00008B';
            } else if (planet.temperature >= 0 && planet.temperature <= 10 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Cold Water Giant';//verificado
                planet.color = '#008b8bff';
            } else if (planet.temperature >= 10 && planet.temperature <= 30 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Water Giant';//verificado
                planet.color = '#00FFFF';
            } else if (planet.temperature >= 30 && planet.temperature <= 70 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Warm Water Giant';//verificado
                planet.color = '#4dffc4ff';
            } else if (planet.temperature <= 0 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Cold Giant';//verificado
                planet.color = '#4682B4';
                unlockAchievement(37)
            } else if (planet.temperature >= 20 && planet.gasValue >= 100 && planet.cloudsValue >= 100 && planet.waterValue >= 100) {
                planet.planetClass = 'Multielemental';//verificado
                planet.color = '#ff00d4ff';
                unlockAchievement(41)
            } else if (planet.temperature >= 50 && planet.temperature <= 70 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Warm Ammonia Giant';//verificado
                planet.color = '#4aff9cff';
            } else if (planet.temperature >= 40 && planet.temperature <= 50 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Ammonia Giant';//verificado
                planet.color = '#00ff73ff';
            } else if (planet.temperature >= 30 && planet.temperature <= 40 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Cold Ammonia Giant';//verificado
                planet.color = '#158b4bff';
            } else if (planet.temperature >= 40 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Warm Noble Giant';//verificado
                planet.color = '#5ffafaff';
            } else if (planet.temperature >= 20 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Noble Giant';//verificado
                planet.color = '#00FFFF';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Cold Noble Giant';//verificado
                planet.color = '#056868ff';
            } else if (planet.temperature >= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Warm Carbon Giant';//verificado
                planet.color = '#790000ff';
            } else if (planet.temperature >= 60 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Carbon Giant';//verificado
                planet.color = '#792600ff';
            } else if (planet.temperature >= 50 && planet.temperature <= 60 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Cold Carbon Giant';//verificado
                planet.color = '#423d3aff';
            } else if (planet.temperature >= 45 && planet.temperature <= 50 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Warm Methane Giant';//verificado
                planet.color = '#fc5a5aff';
            } else if (planet.temperature >= 40 && planet.temperature <= 45 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Methane Giant';//verificado
                planet.color = '#ff4800ff';
            } else if (planet.temperature >= 30 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Cold Methane Giant';//verificado
                planet.color = '#2c0000ff';
            } else if (planet.temperature >= 20 && planet.temperature <= 45 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Warm Hidrogen Giant';//verificado
                planet.color = '#9fb9ffff';
            } else if (planet.temperature >= -10 && planet.temperature <= 20 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Hidrogen Giant';//verificado
                planet.color = '#0044ffff';
            } else if (planet.temperature >= -30 && planet.temperature <= -10 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Cold Hidrogen Giant';//verificado
                planet.color = '#081331ff';
            } else if (planet.temperature >= 70 && planet.temperature <= 80 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10 ) {
                planet.planetClass = 'Warm Helium Giant';//verificado
                planet.color = '#55f3f3ff';
            } else if (planet.temperature >= 40 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10) {
                planet.planetClass = 'Helium Giant';//verificado
                planet.color = '#00FFFF';
            } else if (planet.temperature >= 0 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10) {
                planet.planetClass = 'Cold Helium Giant';//verificado
                planet.color = '#115252ff';
            } else {
                planet.planetClass = 'Gas Giant';
                planet.color = '#e67e22';
            }

            applyExoticClass();
        }

        
        else if (planet.type === 'planetoid') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            planet.temperature = planet.temperature || 20;

            checkExoticTransformation(
                ['Crystalline', 'Radioative', 'Vibrational', 'Quantum'],
                ['Cerium', 'Zirconium', 'Tantalum', 'Ruthenium'],
                ['-X', '-Ω', '-Δ', '-Σ']
            );

            if (planet.temperature > 100) {
                planet.planetClass = 'Lava Planetoid';//verificado
                planet.color = '#ff0000ff';
                unlockAchievement(4)
            } else if (planet.temperature < -50 && planet.waterValue > 30) {
                planet.planetClass = 'Ice Planetoid';//verificado
                planet.color = '#609899';
            } else if (planet.temperature < -50) {
                planet.planetClass = 'Frozen and Arid Planetoid';//verificado
                planet.color = '#ffffff';
            } else if (planet.temperature > 50 && planet.waterValue < 40) {
                planet.planetClass = 'Desert Planetoid';//verificado
                planet.color = '#ff3300ff';
            } else if (planet.temperature > 0 && planet.temperature < 20) {
                planet.planetClass = 'Cold Planetoid';//verificado
                planet.color = '#a1887f';
            } else {
                planet.planetClass = 'Rocky Planetoid';
                planet.color = '#a1887f';
            }

            applyExoticClass();
        }

        
        else if (planet.type === 'asteroid') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            planet.temperature = planet.temperature || 20;
            checkExoticTransformation(
                ['Crystalline', 'Radioative', 'Vibrational'],
                ['Zirconium', 'Tantalum', 'Ruthenium'],
                ['-X', '-Ω', '-Δ']
            );

            if (planet.temperature > 150) {
                planet.planetClass = 'Flaming Asteroid';
                planet.color = '#FF4500';
                unlockAchievement(4)
            } else if (planet.temperature > 80) {
                planet.planetClass = 'Hot Asteroid';
                planet.color = '#FF8C00';
            } else if (planet.temperature > 30) {
                planet.planetClass = 'Commom Asteroid';
                planet.color = '#95a5a6';
            } else if (planet.temperature < 0 && planet.waterValue > 30) {
                planet.planetClass = 'Frozen Asteroid';
                planet.color = '#4682B4';
            } else if (planet.temperature < 0 && planet.waterValue <= 30) {
                planet.planetClass = 'Cold Asteroid';
                planet.color = '#D3D3D3';
            } else {
                planet.planetClass = 'Commom Asteroid';
                planet.color = '#95a5a6';
            }

            applyExoticClass();
        }

        
        else if (planet.type === 'meteoroid') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            planet.temperature = planet.temperature || 20;
            checkExoticTransformation(
                ['Crystalline', 'Radioative', 'Vibrational'],
                ['Zirconium', 'Tantalum', 'Ruthenium'],
                ['-X', '-Ω', '-Δ']
            );

            if (planet.temperature > 200) {
                planet.planetClass = 'Flaming Meteoroid';
                planet.color = '#FF4500';
                unlockAchievement(4)
            } else if (planet.temperature > 100) {
                planet.planetClass = 'Hot Meteoroid';
                planet.color = '#FF8C00';
            } else if (planet.temperature > 20) {
                planet.planetClass = 'Commom Meteoroid';
                planet.color = '#7f8c8d';
            } else if (planet.temperature < 0 && planet.waterValue > 30) {
                planet.planetClass = 'Frozen Meteoroid';
                planet.color = '#4682B4';
            } else if (planet.temperature < 0 && planet.water <= 30) {
                planet.planetClass = 'Cold Meteoroid';
                planet.color = '#D3D3D3';
            } else {
                planet.planetClass = 'Commom Meteoroid';
                planet.color = '#7f8c8d';
            }

            applyExoticClass();
        }

        
        else if (planet.type === 'spaceDust') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            planet.temperature = planet.temperature || 20;
            checkExoticTransformation(
                ['Cristalina', 'Magnética', 'Radioativa'],
                ['Cerium', 'Hafnium', 'Niobio'],
                ['-X', '-Ω', '-Δ']
            );

            if (planet.temperature > 100) {
                planet.planetClass = 'Hot Space Dust';
                planet.color = '#FFA500';
                unlockAchievement(4)
            } else if (planet.temperature > 30) {
                planet.planetClass = 'Commom Space Dust';
                planet.color = '#888888';
            } else {
                planet.planetClass = 'Cold Space Dust';
                planet.color = '#A9A9A9';
            }

            applyExoticClass();
        }

                
        else if (planet.type === 'comet') {
                    
            planet.waterValue = planet.waterValue || 70;
            planet.gasValue = planet.gasValue || 80;
            planet.cloudsValue = planet.cloudsValue || 50;
            planet.temperature = planet.temperature ||10; 

                        
            
            const waterLossRate = planet.temperature > 100 ? 0.5 : 0.05; 
            planet.waterValue = Math.max(0, planet.waterValue - (deltaTime / 1000 * waterLossRate));
            
            
            planet.waterValue = Math.max(0, planet.waterValue - (deltaTime / 1000 * waterLossRate));
            
            
            checkExoticTransformation(
                ['Congelado', 'Exotic', 'Condensed'],
                ['Hidrogênio', 'Metano', 'Amônia'],
                ['-Ω', '-Δ', '-Σ']
            );

            
            if (planet.waterValue <= 0) {
                const chance = Math.random();
                if (chance < 0.33 && planet.mass > 10) {
                    transformToMeteoroid(planet);
                } else if (chance < 0.66 && planet.mass > 1) {
                    transformToMeteorite(planet);
                } else {
                    planet.markedForRemoval = true;
                }
            }

            
            if (planet.temperature > 100) {
                planet.planetClass = 'Hot Comet';
                planet.color = '#FFA500';
                unlockAchievement(4)
                planet.mass = Math.max(0.1, planet.mass * 0.99); 
            } else if (planet.temperature < -100 && planet.waterValue > 70 && planet.gasValue > 80) {
                planet.planetClass = 'Condensed Comet';
                planet.color = '#00BFFF';
            } else if (planet.temperature < 0 && planet.waterValue < 70) {
                planet.planetClass = 'Frozen Cometa';
                planet.color = '#1E90FF';
            } else {
                planet.planetClass = 'Commom Comet';
                planet.color = '#3498db';
            }

            if (planet.waterValue <= 0) {
                const chance = Math.random();
                if (chance < 0.33 && planet.mass > 10) {
                    transformToMeteoroid(planet);
                } else if (chance < 0.66 && planet.mass > 1) {
                    transformToMeteorite(planet);
                } else {
                    planet.markedForRemoval = true;
                }
            }

            applyExoticClass();
        }

        
        else if (planet.type === 'meteorite') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            planet.temperature = planet.temperature || 20;
            checkExoticTransformation(
                ['Metalic', 'Exotic', 'Quantum'],
                ['Irídio', 'Osmio', 'Platina'],
                ['-Φ', '-Σ', '-Ψ']
            );

            if (planet.temperature > 300) {
                planet.planetClass = 'Super Hot Meteorite';
                planet.color = '#FF0000';
                unlockAchievement(4)
            } else if (planet.temperature > 150) {
                planet.planetClass = 'Commom Meteorite';
                planet.color = '#FFD700';
            } else {
                planet.planetClass = 'Cold Meteorite';
                planet.color = '#D3D3D3';
            }

            applyExoticClass();
        }

    });
}
function getOriginalClass(type) {
    const classMap = {
        rockyPlanet: 'Rocky Planet',
        gasGiant: 'Gas Giant',
        planetoid: 'Rocky Planetoid',
        asteroid: 'Commom Asteroid',
        meteoroid: 'Comom Meteoroid',
        spaceDust: 'Commom Space Dust',
        comet: 'Commom Comet'
    };
    return classMap[type] || '(FGP/Br)Classe Base';
}
function generateExoticName(prefixes, cores, suffixes) {
    return `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${cores[Math.floor(Math.random()*cores.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
}
function gameLoop(timestamp) {
    
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    fps = Math.floor(1000 / deltaTime);
    
        
    ctx.fillStyle = spaceColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (temperatureZonesVisible) {
        drawTemperatureZones(); 
    }

    planets.forEach(planet => drawPlanet(planet)); 
    
    
    if (gameState === 'playing') {
        fgpPhysics(deltaTime * timeScale);
        fgpPlanetsTemperature(deltaTime);
        fgpExoticObjects(deltaTime * timeScale);
        fgpAstroEvolution(deltaTime * Math.abs(timeScale));
        handleCollisions();
        fgpAnimations(deltaTime);

        ctx.fillStyle = spaceColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (temperatureZonesVisible) {
            drawTemperatureZones();
        }

        planets.forEach(planet => drawPlanet(planet));
    

        
        let anosPorSegundo = 0;
        switch (timeScale) {
            case 0:
                anosPorSegundo = 0;
                break;
            case 0.01:
                anosPorSegundo = 1;
                break;
            case 0.1:
                anosPorSegundo = 100;
                break;
            case 1:
                anosPorSegundo = 1000;
                break;
            case 10:
                anosPorSegundo = 100000;
                break;
            default:
                anosPorSegundo = Math.round(1000 * timeScale); 
        }
        universeAge += anosPorSegundo * (deltaTime / 1000);
        universeTime += anosPorSegundo * (deltaTime / 1000);

        
        fgpAstroEvolution(deltaTime * Math.abs(timeScale));

        
        fgpWhiteHoles(deltaTime * Math.abs(timeScale));
        fgpBlackHolesAndQuasars(deltaTime * Math.abs(timeScale)); 
        
        fgpInfoPanel();
    }
    
    
    planets.forEach(planet => drawPlanet(planet));
    
    
    if (gameState !== 'menu') {
        
        if (mouse.down) {
            const startX = (mouse.downX - camera.x) * camera.zoom + canvas.width / 2;
            const startY = (mouse.downY - camera.y) * camera.zoom + canvas.height / 2;
            const endX = (mouse.x - camera.x) * camera.zoom + canvas.width / 2;
            const endY = (mouse.y - camera.y) * camera.zoom + canvas.height / 2;
            
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            
            drawArrow(startX, startY, endX, endY, '#3498db');
            
            
            calculateTrajectory();
            
            
            if (trajectoryPoints.length > 1) {
                ctx.beginPath();
                ctx.moveTo(
                    (trajectoryPoints[0].x - camera.x) * camera.zoom + canvas.width / 2,
                    (trajectoryPoints[0].y - camera.y) * camera.zoom + canvas.height / 2
                );
                
                for (let i = 1; i < trajectoryPoints.length; i++) {
                    ctx.lineTo(
                        (trajectoryPoints[i].x - camera.x) * camera.zoom + canvas.width / 2,
                        (trajectoryPoints[i].y - camera.y) * camera.zoom + canvas.height / 2
                    );
                }
                
                ctx.strokeStyle = 'rgba(46, 204, 113, 0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                
                if (trajectoryPoints.length > 10) {
                    const lastPoint = trajectoryPoints[trajectoryPoints.length - 1];
                    const prevPoint = trajectoryPoints[trajectoryPoints.length - 10];
                    drawArrow(
                        (prevPoint.x - camera.x) * camera.zoom + canvas.width / 2,
                        (prevPoint.y - camera.y) * camera.zoom + canvas.height / 2,
                        (lastPoint.x - camera.x) * camera.zoom + canvas.width / 2,
                        (lastPoint.y - camera.y) * camera.zoom + canvas.height / 2,
                        '#2ecc71'
                    );
                }
            }
        }
    }

    planets.forEach((planet, index) => {
        if (planet.type === 'nebula') {
            planets.forEach((other, otherIndex) => {
                if (index !== otherIndex && !NEBULA_IGNORE_TYPES.includes(other.type)) {
                    handleNebulaConsumption(planet, other, deltaTime);
                }
            });
        }
    });

    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
}
function renderPlanets(ctx, planets) {
    planets.forEach((planet) => {
        
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        
        drawRing(planet, ctx);
    });
}
ctx.globalAlpha = calculateRingTransparency(ringColor);
function calculateRingTransparency(type) {
    switch (type) {
        case 'gasGiant':
            return 0.6;
        case 'planet':
            return 0.3;
        case 'planetoid':
            return 0.3;
        case 'asteroid':
            return 0.2;
        default:
            return 0.5; 
    }
}
function fgpInfoPanel() {
    if (universeAge >= 10000000000000) unlockAchievement(47);
    universeTimeElem.textContent = formatShortNumber(universeAge);
    
    if (document.getElementById('astroExtraInfo')) {
        document.getElementById('astroExtraInfo').remove();
    }
    astroCountElem.textContent = planets.length;
    timeScaleElem.textContent = timeScale + "x";

    
    const typeCounts = {};
    planets.forEach(p => {
        typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
    });
    astroTypesElem.innerHTML = 
        Object.entries(typeCounts).map(([type, count]) => 
            `${getTypeName(type)}: ${count}`
        ).join('<br>');
}
function openEditPanel(planet) {
    if (!planet) return;
    selectedPlanet = planet;
    editPanel.style.display = 'block';
    
    editName.value = planet.name || '';
    editType.value = getTypeName(planet.type);
    editClass.value = planet.planetClass || '';
    editTemperature.value = planet.temperature !== undefined ? planet.temperature + ' °C' : '';
    editColor.value = planet.color || '#3498db';
    editSecondaryColor.value = planet.landColor || '#2ecc71';
    editMass.value = planet.mass !== undefined ? planet.mass : '';
    editGravity.value = planet.gravity !== undefined ? planet.gravity : '';
    editRotation.value = planet.rotationSpeed !== undefined ? planet.rotationSpeed : '';
    editWater.value = planet.water !== undefined ? planet.water : '';
    editClouds.value = planet.clouds !== undefined ? planet.clouds : '';
    editGas.value = planet.gas !== undefined ? planet.gas : '';
    editRingMass.value = planet.ringMass !== undefined ? planet.ringMass : '';
    editDescription.value = planet.description || '';
    
    const astroTimePanel = document.getElementById('astroTimePanel');
    if (astroTimePanel) astroTimePanel.style.display = 'none';

    if (planet.locked) {
        btnLock.textContent = "🔓 Unlock";
    } else {
        btnLock.textContent = "🔒 Lock";
    }
}
function showAstroTimePanel() {
    if (!selectedPlanet) return;
    const planet = selectedPlanet;
    const astroTimePanel = document.getElementById('astroTimePanel');
    const astroTimeAge = document.getElementById('astroTimeAge');
    const astroTimeLifeLeftGroup = document.getElementById('astroTimeLifeLeftGroup');
    const astroTimeLifeLeft = document.getElementById('astroTimeLifeLeft');
    if (astroTimePanel && astroTimeAge && astroTimeLifeLeftGroup && astroTimeLifeLeft) {
        
        let idade = '';
        if (planet.lifeTime !== undefined && planet.lifeTime !== null) {
            if (["ttauriStar","star","giantStar","hypergiant","massiveStar","whiteDwarf","brownDwarf","carbonStar"].includes(planet.type)) {
                idade = formatShortNumber(planet.lifeTime * 1e6) + ' anos';
            } else {
                idade = formatShortNumber(planet.lifeTime) + ' anos';
            }
        } else {
            idade = '0 anos';
        }
        astroTimeAge.value = idade;
        
        let vidaRestante = '';
        let mostrarVidaRestante = false;
        if (["ttauriStar","star","giantStar","hypergiant","massiveStar","whiteDwarf","brownDwarf","carbonStar"].includes(planet.type) && planet.maxLifeTime && planet.maxLifeTime !== Infinity) {
            const falta = Math.max(0, planet.maxLifeTime - (planet.lifeTime || 0));
            vidaRestante = formatShortNumber(falta * 1e6) + ' anos';
            mostrarVidaRestante = true;
        } else if (["blackHole","quasar","whiteHole"].includes(planet.type)) {
            if ((planet.type === 'blackHole' || planet.type === 'quasar')) {
                if (planet.maxLifeTime && planet.lifeTime !== undefined) {
                    const falta = Math.max(0, planet.maxLifeTime - planet.lifeTime);
                    vidaRestante = formatShortNumber(falta) + ' anos';
                    mostrarVidaRestante = true;
                } else if (planet.mass && planet.lifeTime !== undefined) {
                    const vidaTotal = Math.pow(planet.mass, 3);
                    const falta = Math.max(0, vidaTotal - planet.lifeTime);
                    vidaRestante = formatShortNumber(falta) + ' anos';
                    mostrarVidaRestante = true;
                }
            } else if (planet.type === 'whiteHole' && planet.mass && planet.originalMass && planet.lifeTime !== undefined) {
                const taxa = (planet.originalMass - planet.mass) / (planet.lifeTime || 1);
                if (taxa > 0) {
                    const falta = (planet.mass - 1000) / taxa;
                    vidaRestante = formatShortNumber(falta) + ' anos';
                    mostrarVidaRestante = true;
                }
            }
        }
        if (mostrarVidaRestante) {
            astroTimeLifeLeftGroup.style.display = 'block';
            astroTimeLifeLeft.value = vidaRestante;
        } else {
            astroTimeLifeLeftGroup.style.display = 'none';
            astroTimeLifeLeft.value = '';
        }
        astroTimePanel.style.display = 'block';
    }
    
    const closeTimePanelBtn = document.getElementById('closeTimePanel');
    if (closeTimePanelBtn) {
        closeTimePanelBtn.onclick = () => { document.getElementById('astroTimePanel').style.display = 'none'; };
    }
}
function formatShortNumber(num) {
    const absNum = Math.abs(num);
    if (absNum >= 1e33) {
        return (num / 1e33).toFixed(1).replace(/\.0$/, '') + 'd'; 
    } else if (absNum >= 1e30) {
        return (num / 1e30).toFixed(1).replace(/\.0$/, '') + 'n'; 
    } else if (absNum >= 1e27) {
        return (num / 1e27).toFixed(1).replace(/\.0$/, '') + 'o'; 
    } else if (absNum >= 1e24) {
        return (num / 1e24).toFixed(1).replace(/\.0$/, '') + 'sp'; 
    } else if (absNum >= 1e21) {
        return (num / 1e21).toFixed(1).replace(/\.0$/, '') + 'sx'; 
    } else if (absNum >= 1e18) {
        return (num / 1e18).toFixed(1).replace(/\.0$/, '') + 'qi'; 
    } else if (absNum >= 1e15) {
        return (num / 1e15).toFixed(1).replace(/\.0$/, '') + 'qa'; 
    } else if (absNum >= 1e12) {
        return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 't'; 
    } else if (absNum >= 1e9) {
        return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'b'; 
    } else if (absNum >= 1e6) {
        return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'm'; 
    } else if (absNum >= 1e3) {
        return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k'; 
    } else {
        return Math.round(num).toString();
    }
}

    const typeCounts = {};
    planets.forEach(p => {
        typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
    });
    
    
    astroTypesElem.innerHTML = 
        Object.entries(typeCounts).map(([type, count]) => 
            `${getTypeName(type)}: ${count}`
        ).join('<br>');

function drawArrow(fromX, fromY, toX, toY, color) {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.save();
    ctx.translate(toX, toY);
    ctx.rotate(angle);
    
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-headLength, headLength/2);
    ctx.lineTo(-headLength, -headLength/2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.restore();
}
function calculateTrajectory() {
    trajectoryPoints = [];
    const steps = 200; 
    
    
    const tempPlanet = {
        x: mouse.downX,
        y: mouse.downY,
        vx: (mouse.x - mouse.downX) * 0.1,
        vy: (mouse.y - mouse.downY) * 0.1,
        mass: creationMode ? astroSettings.mass : mass,
        radius: Math.cbrt(creationMode ? astroSettings.mass : mass) * 5,
        color: astroSettings.primaryColor,
        type: creationMode || 'spaceDust'
    };
    
    
    for (let step = 0; step < steps; step++) {
        
        trajectoryPoints.push({x: tempPlanet.x, y: tempPlanet.y});
        
        
        planets.forEach(planet => {
            if (planet === tempPlanet) return;
            
            
            const dx = planet.x - tempPlanet.x;
            const dy = planet.y - tempPlanet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            
            const force = gravityFactor * G * tempPlanet.mass * planet.mass / (distance * distance);
            const forceX = force * dx / distance;
            const forceY = force * dy / distance;
            
            
            tempPlanet.vx += forceX / tempPlanet.mass * 0.1;
            tempPlanet.vy += forceY / tempPlanet.mass * 0.1;
        });
        
        
        tempPlanet.x += tempPlanet.vx * 0.1;
        tempPlanet.y += tempPlanet.vy * 0.1;
    }
}
function fgpPhysics(deltaTime) {
    if (timeScale === 0) return;
    
    const delta = deltaTime / 1000;
    const timeFactor = Math.abs(timeScale) * delta;
    
    
    for (let i = 0; i < planets.length; i++) {
        const planetA = planets[i];
        
        for (let j = i + 1; j < planets.length; j++) {
            const planetB = planets[j];
            
            const dx = planetB.x - planetA.x;
            const dy = planetB.y - planetA.y;
            const distance = Math.hypot(dx, dy);
            
            if (distance < 0.1) continue;
            
            let force = (G * gravityFactor * planetA.mass * planetB.mass) / (distance * distance);
            
            if (planetA.type === 'whiteHole' || planetB.type === 'whiteHole') {
                force *= -1;
            }
            
            const angle = Math.atan2(dy, dx);
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            
            const axA = (force / planetA.mass) * cosAngle;
            const ayA = (force / planetA.mass) * sinAngle;
            
            const axB = -(force / planetB.mass) * cosAngle;
            const ayB = -(force / planetB.mass) * sinAngle;
            
            
            if (!planetA.locked) {
                planetA.vx += axA * timeFactor;
                planetA.vy += ayA * timeFactor;
            }
            
            if (!planetB.locked) {
                planetB.vx += axB * timeFactor;
                planetB.vy += ayB * timeFactor;
            }
        }
    }

    
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        
        if (!planet.locked) {
            if (dragFactor > 0 && timeScale > 0) {
                planet.vx *= (1 - dragFactor * 0.01 * timeFactor);
                planet.vy *= (1 - dragFactor * 0.01 * timeFactor);
            }
            
            planet.x += planet.vx * timeFactor;
            planet.y += planet.vy * timeFactor;
        }
    }
  checkRadiationCount();
}
preloadCollisionSounds();
function playRandomCollisionSound() {
    if (collisionSounds.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * collisionSounds.length);
    const sound = collisionSounds[randomIndex];
    
    try {
        
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Autoplay bloqueado:", e));
    } catch (e) {
        console.error("Erro ao reproduzir som:", e);
    }
}
function preloadCollisionSounds() {
    for (let i = 1; i <= 15; i++) {
        const sound = new Audio(`../assets/audio/Sound effect colide ${i}.mp3`);
        collisionSounds.push(sound);
    }
}
function handleCollisions() {
    
    for (let i = 0; i < planets.length; i++) {
        const a = planets[i];
        
        for (let j = i + 1; j < planets.length; j++) {
            const b = planets[j];

            
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);
            const minDistance = (a.radius + b.radius) * 0.8; 
            
            
            if (distance < minDistance) {
                

                
                playRandomCollisionSound();

                if ((a.type === 'nebula' && !['nebula', 'radiation'].includes(b.type)) || 
                    (b.type === 'nebula' && !['nebula', 'radiation'].includes(a.type))) {
                    continue;
                }
                
                
                let larger, smaller;
                if (a.mass >= b.mass) {
                    larger = a;
                    smaller = b;
                } else {
                    larger = b;
                    smaller = a;
                }
                
                
                if (larger.type === 'nebula' && 
                    !['nebula', 'radiation'].includes(smaller.type)) {
                    continue;
                }
                

                if ((a.type === 'rockyPlanet' && b.type === 'asteroid') || 
                    (a.type === 'asteroid' && b.type === 'rockyPlanet')) {
                    unlockAchievement(25);
                }

               if ((a.type === 'quasar' && b.type === 'whiteHole') || 
                    (a.type === 'whiteHole' && b.type === 'quasar')) {
                    unlockAchievement(27);
                }

                if ((a.type === 'pulsar' && b.type === 'blackHole') || 
                (a.type === 'blackHole' && b.type === 'pulsar')) {
                unlockAchievement(43);
                }
                
                const combinedValues = calculateCombinedValues(larger, smaller);
                
                
                larger.mass += smaller.mass;
                larger.radius = calculateRadiusForType(larger.type, larger.mass);
                
                
                const totalMass = larger.mass;
                const smallerRatio = smaller.mass / totalMass;
                
                
                const relativeVx = larger.vx * (1 - smallerRatio) + smaller.vx * smallerRatio;
                const relativeVy = larger.vy * (1 - smallerRatio) + smaller.vy * smallerRatio;
                
                larger.vx = relativeVx;
                larger.vy = relativeVy;
                
                
                larger.waterValue = combinedValues.water;
                larger.gasValue = combinedValues.gas;
                larger.cloudsValue = combinedValues.clouds;
                larger.temperature = combinedValues.temperature;
                
                
                larger.exoticAcquired = false;
                larger.currentClassTime = 0;
                
                
                smaller.markedForRemoval = true;
                unlockAchievement(2);

                if (!larger.locked) {
                    larger.vx = relativeVx;
                    larger.vy = relativeVy;
                }
            }
        }
    }
    
    
    planets = planets.filter(p => !p.markedForRemoval);
}
function calculateCombinedValues(larger, smaller) {
    
    const totalMass = larger.mass + smaller.mass;
    
    
    return {
        water: Math.max(0, Math.min(100, 
            (larger.waterValue || 0) * (larger.mass / totalMass) + 
            (smaller.waterValue || 0) * (smaller.mass / totalMass)
        )),
        gas: Math.max(0, Math.min(100, 
            (larger.gasValue || 0) * (larger.mass / totalMass) + 
            (smaller.gasValue || 0) * (smaller.mass / totalMass)
        )),
        clouds: Math.max(0, Math.min(100, 
            (larger.cloudsValue || 0) * (larger.mass / totalMass) + 
            (smaller.cloudsValue || 0) * (smaller.mass / totalMass)
        )),
        temperature: 
            larger.temperature * (larger.mass / totalMass) + 
            smaller.temperature * (smaller.mass / totalMass)
    };
}
function fgpWhiteHoles(deltaTime) {
  const absDelta = Math.abs(deltaTime / 1000);
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    if (planet.type !== 'whiteHole') continue;
    
    
    planet.mass -= planet.mass * 0.20 * absDelta;
    
    
    planet.lifeTime = (planet.lifeTime || 0) + absDelta;
    
    
    if (planet.lifeTime > 0.5) {
      planet.lifeTime = 0;
      
      
      const count = 10 + Math.floor(Math.random() * 10); 
      for (let j = 0; j < count; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = planet.radius * 5; 
        const speed = 800 + Math.random() * 400; 
        
        createAstro(
          ['spaceDust', 'nebula', 'radiation'][Math.floor(Math.random() * 3)],
          planet.x + Math.cos(angle) * distance,
          planet.y + Math.sin(angle) * distance,
          Math.cos(angle) * speed, 
          Math.sin(angle) * speed
        );
      }
    }
    
    
    if (planet.mass < 1000) {
        planet.markedForRemoval = true;
        unlockAchievement(39);
    }
  }
  
  
  planets = planets.filter(p => !p.markedForRemoval);
}
function generateContinentTexture(width, height, baseColor, temperature) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  
  const color = tinycolor(baseColor);
  let landColor;
  
  if (temperature < 0) {
    landColor = color.lighten(30).toHexString(); 
  } else if (temperature > 40) {
    landColor = color.darken(20).desaturate(30).toHexString(); 
  } else {
    landColor = baseColor;
  }
  
  
  ctx.fillStyle = landColor;
  ctx.fillRect(0, 0, width, height);
  
  
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 64;
  patternCanvas.height = 64;
  const patternCtx = patternCanvas.getContext('2d');
  
  
  patternCtx.fillStyle = landColor;
  patternCtx.fillRect(0, 0, 64, 64);
  
  
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    const size = Math.random() * 3;
    
    
    const elevation = Math.random();
    let shade;
    
    if (elevation > 0.7) {
      shade = tinycolor(landColor).lighten(15 + elevation * 10).toHexString(); 
    } else if (elevation < 0.3) {
      shade = tinycolor(landColor).darken(5 + (0.3 - elevation) * 10).toHexString(); 
    } else {
      shade = landColor; 
    }
    
    patternCtx.fillStyle = shade;
    patternCtx.beginPath();
    patternCtx.arc(x, y, size, 0, Math.PI * 2);
    patternCtx.fill();
  }
  
  
  if (temperature > 10 && temperature < 30) {
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 64;
      const y = Math.random() * 64;
      const greenShade = tinycolor(landColor).mix('#2e8b57', 40).toHexString();
      
      patternCtx.fillStyle = greenShade;
      patternCtx.beginPath();
      patternCtx.arc(x, y, 1, 0, Math.PI * 2);
      patternCtx.fill();
    }
  }
  
  
  if (temperature > 35) {
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 64;
      const y = Math.random() * 64;
      const sandColor = tinycolor(landColor).mix('#e0c070', 60).toHexString();
      
      patternCtx.fillStyle = sandColor;
      patternCtx.beginPath();
      patternCtx.arc(x, y, 2, 0, Math.PI * 2);
      patternCtx.fill();
    }
  }
  
  
  const pattern = ctx.createPattern(patternCanvas, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, width, height);
  
  return canvas;
}
function fgpAstroEvolution(deltaTime) {
    const anosPassados = deltaTime * Math.abs(timeScale) / 1000 * getTimeScaleFactor();
    
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        
        
        if (planet.age === undefined) planet.age = 0;
        if (planet.lifeStage === undefined) planet.lifeStage = 'main-sequence';
        planet.age += anosPassados;

        
        const massEvolution = () => {
            switch(planet.type) {
                case 'radiation':
                    if (planet.mass >= 1.0) {
                        if (Math.random() < 0.5) {
                            planet.type = 'spaceDust';
                            planet.color = '#888888';
                            planet.radius = calculateRadiusForType('spaceDust', planet.mass);
                            showNotification('Radiation has evolved into Space Dust!');
                        } else {
                            planet.type = 'nebula';
                            planet.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
                            planet.radius = calculateRadiusForType('nebula', planet.mass);
                            showNotification('Radiation evolved into Nebula!');
                        }
                    }
                    break;
                    
                case 'meteorite':
                    if (planet.mass > 50) transformToAsteroid(planet);
                    break;
                    
                case 'spaceDust':
                    if (planet.mass > 1) transformToMeteoroid(planet);
                    break;
                    
                case 'meteoroid':
                    if (planet.mass > 50) transformToAsteroid(planet);
                    break;
                    
                case 'asteroid':
                    if (planet.mass > 250) transformToPlanetoid(planet);
                    break;
                    
                case 'planetoid':
                    if (planet.mass > 700) transformToRockyPlanet(planet);
                    break;
                    
                case 'rockyPlanet':
                    if (planet.mass > 30500) transformToGasGiant(planet);
                    break;
                    
                case 'gasGiant':
                    if (planet.mass > 2500000) transformToBrownDwarf(planet);
                    break;
                    
                
                case 'brownDwarf':
                    if (planet.mass > 1e8) transformToRedDwarf(planet);
                    break;
                case 'redDwarf':
                    if (planet.mass > 1e9) transformToStar(planet);
                    break;
                case 'star':
                    if (planet.mass > 1e10) transformToGiantStar(planet);
                    break;
                case 'giantStar':
                    if (planet.mass > 1e11) transformToHypergiant(planet);
                    break;
                case 'hypergiant':
                    if (planet.mass > 1e12) transformToMassiveStar(planet);
                    break;
                case 'massiveStar':
                    if (planet.mass > 1e14) transformTosupermassiveStar(planet);
                    break;
                    
                
                case 'neutronStar':
                    if (planet.mass > 1e18) transformToPulsar(planet);
                    break;
                case 'pulsar':
                    if (planet.mass > 5e19) transformToMagnetar(planet);
                    break;
                case 'magnetar':
                    if (planet.mass > 5e20) transformToQuarkStar(planet);
                    break;
                case 'quarkStar':
                    if (planet.mass > 1e22) transformToStrangeStar(planet);
                    break;
                case 'strangeStar':
                    if (planet.mass > 1e23) transformToBlackHole(planet);
                    break;
                case 'blackHole':
                    if (planet.mass > 1e25) transformToQuasar(planet);
                    break;
            }
        };

        
        const timeEvolution = () => {
            switch(planet.type) {
                case 'nebula':
                    planet.lifeTime = (planet.lifeTime || 0) + anosPassados;
                    if (planet.lifeTime >= 5e6) {
                        if (planet.mass <= 2500000) transformToGasGiant(planet);
                        else if (planet.mass <= 10000000) transformToBrownDwarf(planet);
                        else if (planet.mass <= 15000000) transformToRedDwarf(planet);
                        else transformToTauriStar(planet);
                    }
                    break;
                    
                case 'ttauriStar':
                    if (planet.age > 2e16) {
                        if (planet.mass < 15e9) transformToStar(planet);
                        else if (planet.mass < 30e9) transformToCarbonStar(planet);
                        else if (planet.mass < 50e9) transformToGiantStar(planet);
                        else if (planet.mass < 500e9) transformToHypergiant(planet);
                        else if (planet.mass < 1e12) transformToMassiveStar(planet);
                        else transformTosupermassiveStar(planet);
                    }
                    break;
                    
                case 'star':
                    if (planet.age > 2e20) transformToRedGiant(planet);
                    break;
                    
                case 'redGiant':
                    if (planet.age > 2e19) {
                        transformToWhiteDwarf(planet);
                        createNebulaFromExplosion(planet, 0.6);
                    }
                    break;
                    
                case 'giantStar':
                    if (planet.age > 1e20) transformToRedSupergiant(planet);
                    break;
                    
                case 'redSupergiant':
                    if (planet.age > 1e19) transformToNeutronStar(planet);
                    break;
                case 'carbonStar':
                    if (planet.age > 2e20) {
                        createNebulaFromExplosion(planet, 0.6);
                        transformToHeliumWhiteDwarf(planet);
                    }
                    break;
                    
                case 'hypergiant':
                    if (planet.age > 1e16) {
                        createNebulaFromExplosion(planet, 0.7);
                        transformToPulsar(planet);
                    }
                    break;
                    
                case 'massiveStar':
                    if (planet.age > 2e15) {
                        createNebulaFromExplosion(planet, 0.8);
                        transformToMagnetar(planet);
                    }
                    break;
                    
                case 'supermassiveStar':
                    if (planet.age > 1e15) {
                        createNebulaFromExplosion(planet, 0.9);
                        transformToBlackHole(planet);
                    }
                    break;
                    
                case 'whiteDwarf':
                    if (planet.age > 2e21) transformToBlackDwarf(planet);
                    break;
                    
                case 'brownDwarf':
                    if (planet.age > 3e22) transformToBlackDwarf(planet);
                    break;
                    
                case 'redDwarf':
                    if (planet.age > 1e22) transformToHeliumWhiteDwarf(planet);
                    break;
                    
                case 'heliumWhiteDwarf':
                    if (planet.age > 2e22) transformToBlackDwarf(planet);
                    break;
            }
        };

        
        massEvolution();
        timeEvolution();

        
        switch(planet.type) {
            case 'quasar':
                if (planet.mass >= 9.99e78) {
                    unlockAchievement(16);
                }
                break;
            case 'whiteHole':
                if (planet.mass >= 1e21) {
                    unlockAchievement(17);
                }
                break;
            case 'nebula':
                if (planet.mass >= 5e16) {
                    unlockAchievement(19);
                }
                break;
        }
    }
}
function getTimeScaleFactor() {
    if (timeScale <= 0) return 0;
    
    const factors = {
        0.01: 1,       
        0.1: 100,      
        1: 1000,       
        10: 100000,    
        100: 1000000,  
        1000: 1000000000 
    };
    
    return factors[timeScale] || Math.pow(10, Math.floor(Math.log10(timeScale)) + 3);
}
function transformToRedDwarf(planet) {
    planet.type = 'redDwarf';
    planet.color = '#FF3300';
    planet.glowColor = '#CC0000';
    planet.radius = calculateRadiusForType('redDwarf', planet.mass);
    planet.maxLifeTime = 5e12; 
    planet.age = 0;
    planet.lifeStage = 'main-sequence';
    planet.temperature = 9500;
}
function transformToHeliumWhiteDwarf(planet) {
    planet.type = 'heliumWhiteDwarf';
    planet.color = '#87CEEB';
    planet.glowColor = '#ADD8E6';
    planet.radius = calculateRadiusForType('heliumWhiteDwarf', planet.mass);
    planet.maxLifeTime = 1e12; 
    planet.age = 0;
    planet.lifeStage = 'remnant';
    planet.temperature = 1678;
}
function transformToRedGiant(planet) {
    planet.type = 'redGiant';
    planet.color = '#ff0000ff';
    planet.glowColor = '#ff4747ff';
    planet.radius = calculateRadiusForType('redGiant', planet.mass);
    planet.maxLifeTime = 1e9; 
    planet.age = 0;
    planet.lifeStage = 'giant';
    planet.temperature = 14000;
}
function transformTosupermassiveStar(planet) {
    planet.type = 'supermassiveStar';
    planet.color = '#0000FF';
    planet.glowColor = '#1E90FF';
    planet.radius = calculateRadiusForType('supermassiveStar', planet.mass);
    planet.maxLifeTime = 5e6; 
    planet.age = 0;
    planet.lifeStage = 'hypergiant';
    planet.temperature = 99000;
}
function createNebulaFromExplosion(planet, massFraction) {
    const nebulaMass = planet.mass * massFraction;
    planet.mass *= (1 - massFraction); 
    
    const explosionPower = Math.log10(planet.mass) * 10;
    const fragments = 50 + Math.floor(explosionPower);
    
    for (let i = 0; i < fragments; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = planet.radius * (2 + Math.random() * 4);
        const speed = 0.5 + Math.random() * explosionPower/10;
        
        const fragment = {
            x: planet.x + Math.cos(angle) * distance,
            y: planet.y + Math.sin(angle) * distance,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            mass: nebulaMass / fragments,
            radius: calculateRadiusForType('nebula', nebulaMass / fragments),
            color: `hsla(${Math.random() * 60 + 180}, 70%, 60%, 0.7)`,
            type: 'nebula',
            age: 0,
            temperature: 10000 + Math.random() * 20000,
            name: generateRandomName()
        };     
        planets.push(fragment);
    }
    
    showNotification(`Stellar explosion created ${fragments} nebula fragments!`);
}
function transformToTauriStar(planet) {
    planet.type = 'ttauriStar';
    planet.color = '#FFD700';
    planet.glowColor = '#FF4500';
    planet.radius = calculateRadiusForType('ttauriStar', planet.mass);
    planet.accretionDisk = true;
    planet.diskSize = planet.radius * 4.5;
    planet.maxLifeTime = 0.001 + Math.random() * 0.2;
    planet.lifeTime = 0;
    planet.temperature = 54000;
}
function transformToAsteroid(planet) {
    planet.type = 'asteroid';
    planet.color = '#95a5a6';
    planet.radius = calculateRadiusForType('asteroid', planet.mass);
    planet.shape = generateAsteroidShape(planet.radius);
    planet.rings = astroSettings.hasRings;
    planet.ringColor = astroSettings.ringColor;
    planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
    planet.ringRotation = Math.random() * Math.PI * 2;
}
function transformToPlanetoid(planet) {
    planet.type = 'planetoid';
    planet.color = '#9b59b6';
    planet.radius = calculateRadiusForType('planetoid', planet.mass);
    planet.rx = planet.radius * (1 + Math.random() * 0.3);
    planet.ry = planet.radius * (0.8 + Math.random() * 0.3);
    planet.rotationSpeed = astroSettings.rotationSpeed;
}
function transformToRockyPlanet(planet) {
    planet.type = 'rockyPlanet';
    planet.color = astroSettings.primaryColor;
    planet.landColor = astroSettings.secondaryColor;
    planet.ocean = astroSettings.water / 100;
    planet.oceanColor = '#3498db';
    planet.clouds = astroSettings.clouds / 100;
    planet.continents = generateContinents(5);
    planet.rotationSpeed = astroSettings.rotationSpeed;
    planet.radius = calculateRadiusForType(planet.type, planet.mass);
}
function transformToGasGiant(planet) {
    planet.type = 'gasGiant';
    planet.color = '#e67e22';
    planet.rings = astroSettings.hasRings;
    planet.ringColor = astroSettings.ringColor;
    planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
    planet.ringRotation = Math.random() * Math.PI * 2;
    planet.rotationSpeed = astroSettings.rotationSpeed;
    planet.gas = astroSettings.gas / 100;
    planet.radius = calculateRadiusForType(planet.type, planet.mass);
}
function transformToBrownDwarf(planet) {
    planet.type = 'brownDwarf';
    planet.color = '#8b1313ff';
    planet.glowColor = '#580000ff';
    planet.radius = calculateRadiusForType('brownDwarf', planet.mass);
    planet.temperature = 2300;
    planet.planetClass = ''
}
function transformToStar(planet) {
    planet.type = 'star';
    planet.color = '#FFD700';
    planet.glowColor = '#FF4500';
    planet.radius = calculateRadiusForType('star', planet.mass);
    planet.temperature = 14000;
}
function transformToNeutronStar(planet) {
    planet.type = 'neutronStar';
    planet.color = '#ffffff';
    planet.glowColor = '#3498db';
    planet.radius = calculateRadiusForType('neutronStar', planet.mass);
    planet.rotationSpeed = 0.5 + Math.random() * 2;
    planet.maxLifeTime = 1e6; 
    planet.age = 0;
    planet.temperature = 71778;
}
function transformToBlackHole(planet) {
    try {
        
        const G = 6.67430e-11;
        const c = 299792458;
        const schwarzschildRadius = (2 * G * planet.mass) / (c * c);
        
        
        const diskMass = planet.mass * 0.1;
        planet.mass *= 0.9;
        
        
        planet.type = 'blackHole';
        planet.color = '#000000';
        planet.glowColor = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
        planet.radius = Math.max(schwarzschildRadius, 10);
        planet.accretionDisk = {
            mass: diskMass,
            innerRadius: planet.radius * 1.5,
            outerRadius: planet.radius * 10,
            rotationSpeed: 0.05
        };
        
        
        planet.gravitationalLensing = {
            strength: Math.min(1, planet.mass / 1e30),
            distortion: 0.2
        };
        
        
        delete planet.continents;
        delete planet.ocean;
        delete planet.clouds;
        
        
        const solarMasses = (planet.mass / 1.98847e30).toFixed(2);
        showNotification(`Black hole! ${solarMasses} solar masses. Radius: ~${Math.round(planet.radius)} km`);
        
        return planet;
    } catch (error) {
        console.error('Falha na transformação para buraco negro:', error);
        
        return {
            ...planet,
            type: 'blackHole',
            color: '#000000',
            radius: 10
        };
    }
}
function transformToQuasar(planet) {
    planet.type = 'quasar';
    planet.color = '#000000';
    planet.glowColor = '#fffde4';
    planet.accretionDisk = true;
    planet.diskColor = '#fffde4';
    planet.jets = true;
    planet.jetAngle = Math.random() * Math.PI * 2;
    planet.radius = calculateRadiusForType('blackHole', planet.mass);
    planet.temperature = 557999978;
}
function transformToWhiteHole(planet) {
    planet.type = 'whiteHole';
    planet.color = '#ffffff';
    planet.glowColor = '#3498db';
    planet.lifeTime = 0;
    planet.radius = calculateRadiusForType('blackHole', planet.mass);
    planet.temperature = 5679999978;
}
function transformToBigBang(planet) {
    const index = planets.indexOf(planet);
    if (index !== -1) {
        planets.splice(index, 1);
        
        
        const dustCount = 20000 + Math.floor(Math.random() * 30001); 
        const nebulaCount = 15000 + Math.floor(Math.random() * 15001); 
        const asteroidCount = 10000 + Math.floor(Math.random() * 5001); 
        
        
        for (let i = 0; i < dustCount; i++) {
            createExpelledMatter('spaceDust', planet.x, planet.y, 0.01, 1);
        }
        
        
        for (let i = 0; i < nebulaCount; i++) {
            createExpelledMatter('nebula', planet.x, planet.y, 0.1, 1000);
        }
        
        
        for (let i = 0; i < asteroidCount; i++) {
            createExpelledMatter('asteroid', planet.x, planet.y, 1, 100);
        }
        
        showNotification('BIG BANG! ' + 
                         (dustCount + nebulaCount + asteroidCount));
    }
}
function createExpelledMatter(type, x, y, minMass, maxMass) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100;
    const mass = minMass + Math.random() * (maxMass - minMass);
    const speed = 50 + Math.random() * 100;
    
    const newAstro = {
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        mass: mass,
        radius: calculateRadiusForType(type, mass),
        color: type === 'spaceDust' ? '#888888' : 
               type === 'nebula' ? `hsl(${Math.random() * 360}, 70%, 60%)` : '#95a5a6',
        type: type,
        lifeTime: 0
    };
    
    if (type === 'asteroid') {
        newAstro.shape = generateAsteroidShape(newAstro.radius);
    }
    
    planets.push(newAstro);
}
function calculateRadiusForType(type, mass) {
    
    if (!isFinite(mass) || mass <= 0) {
        console.warn(`Massa inválida para ${type}: ${mass}. Usando valor padrão.`);
        mass = type === 'spaceDust' ? 0.1 : 1000;
    }


        const baseRadius = {
            star: 30,
            redDwarf: 15,
            brownDwarf: 10,
            whiteDwarf: 8,
            giantStar: 50,
            hypergiant: 80,
            redGiant: 60,
            redSupergiant: 100,
            quasar: 120,
            whiteHole: 120,
            blackHole: 10,
            neutronStar: 5,
            pulsar: 5,
            magnetar: 5,
            quarkStar: 5,
            comet: 2,
            meteoroid: 1.5,
            asteroid: 3,
            planetoid: 5,
            spaceDust: 1,
            meteorite: 2,
            rockyPlanet: 10,
            gasGiant: 20,
            planet: 10,
            nebula: 100,
            radiation: 1
        };

    const base = baseRadius[type] || 10;
    return base * Math.pow(mass / 1000, 0.3);
        
    
    const DENSITY_FACTORS = {
        'spaceDust': 0.3,
        'radiation': 0.1,
        'nebula': 1.5,
        'comet': 0.4,
        'meteoroid': 0.5,
        'meteorite': 0.6,
        'asteroid': 0.7,
        'planetoid': 1.0,
        'rockyPlanet': 1.3,
        'gasGiant': 2.0,
        'brownDwarf': 1.8,
        'ttauriStar': 3.0,
        'redDwarf': 1.9,
        'star': 2.5,
        'giantStar': 4.0,
        'redGiant': 5.0,
        'redSupergiant': 7.0,
        'redHypergiant': 9.0,
        'hypergiant': 8.0,
        'massiveStar': 4.0,
        'supermassiveStar': 5.0,
        'carbonStar': 3.5,
        'whiteDwarf': 0.6,
        'heliumWhiteDwarf': 0.7,
        'blackDwarf': 0.6,
        'neutronStar': 0.05,
        'pulsar': 0.06,
        'magnetar': 0.07,
        'quarkStar': 0.08,
        'strangeStar': 0.09,
        'blackHole': 0.02,
        'quasar': 0.03,
        'whiteHole': 0.04,
        'wormhole': 0.05
    };

    
    const MIN_RADII = {
        'spaceDust': 1,
        'radiation': 0.5,
        'nebula': 10,
        'comet': 2,
        'meteoroid': 1.5,
        'meteorite': 2,
        'asteroid': 3,
        'planetoid': 4,
        'rockyPlanet': 6,
        'gasGiant': 12,
        'brownDwarf': 8,
        'ttauriStar': 15,
        'redDwarf': 10,
        'star': 12,
        'giantStar': 25,
        'redGiant': 40,
        'redSupergiant': 60,
        'redHypergiant': 90,
        'hypergiant': 70,
        'massiveStar': 20,
        'supermassiveStar': 30,
        'carbonStar': 20,
        'whiteDwarf': 4,
        'heliumWhiteDwarf': 4,
        'blackDwarf': 4,
        'neutronStar': 2,
        'pulsar': 2.5,
        'magnetar': 3,
        'quarkStar': 3.5,
        'strangeStar': 4,
        'blackHole': 5,
        'quasar': 6,
        'whiteHole': 6,
        'wormhole': 5
    };

    
    const SOLAR_MASS_KG = 1.989e30; 
    const GRAVITATIONAL_CONSTANT = 6.67430e-11; 
    const SPEED_OF_LIGHT = 299792458; 
    const KM_TO_GAME_UNITS = 1e-9; 

    
    switch (type) {

        case 'redGiant':
            return Math.max(40, Math.cbrt(mass) * 3); 
                
        case 'redSupergiant':
            return Math.max(60, Math.cbrt(mass) * 15); 
        
        case 'supermassiveStar':
            return Math.max(MIN_RADII.supermassiveStar || 30, Math.cbrt(mass) * (DENSITY_FACTORS.supermassiveStar || 5.0));
        
        case 'heliumWhiteDwarf':
            return Math.max(MIN_RADII.heliumWhiteDwarf || 4, Math.cbrt(mass) * (DENSITY_FACTORS.heliumWhiteDwarf || 0.7));
        
        case 'whiteDwarf':
            return Math.max(MIN_RADII.whiteDwarf || 4, Math.cbrt(mass) * (DENSITY_FACTORS.whiteDwarf || 0.6));
        
        case 'blackDwarf':
            return Math.max(MIN_RADII.blackDwarf || 4, Math.cbrt(mass) * (DENSITY_FACTORS.blackDwarf || 0.6));
        
        case 'neutronStar':
        case 'pulsar':
        case 'magnetar':
        case 'quarkStar':
        case 'strangeStar': {
            
            const densityFactor = DENSITY_FACTORS[type] || 0.07;
            return Math.max(MIN_RADII[type] || 2, Math.cbrt(mass) * densityFactor);
        }
        
        case 'blackHole': {
            
            const solarMasses = mass / SOLAR_MASS_KG;
            const schwarzschildRadiusKm = 2.95 * solarMasses;
            return Math.max(MIN_RADII.blackHole || 5, schwarzschildRadiusKm * KM_TO_GAME_UNITS);
        }
        
        case 'quasar': {
            
            const solarMasses = mass / SOLAR_MASS_KG;
            return Math.max(MIN_RADII.quasar || 6, (10 + 2 * solarMasses) * KM_TO_GAME_UNITS);
        }
        
        case 'whiteHole': {
            
            const solarMasses = mass / SOLAR_MASS_KG;
            return Math.max(MIN_RADII.whiteHole || 6, (8 + 1.5 * solarMasses) * KM_TO_GAME_UNITS);
        }
        
        case 'wormhole': {
            
            return MIN_RADII.wormhole || 5;
        }
        
        
        default: {
            const factor = DENSITY_FACTORS[type] || 1;
            const minRadius = MIN_RADII[type] || 3;
            
            
            const baseRadius = Math.cbrt(mass) * factor;
            
            return Math.max(minRadius, baseRadius);
        }
    }
    
}

window.addEventListener('DOMContentLoaded', function() {
    
    const btn100x = document.getElementById('btn100x');
    if (btn100x) {
        btn100x.onclick = function() { setTimeScale(100); };
    }

    
    
    const btn1000x = document.createElement('button');
    btn1000x.id = 'btn1000x';
    btn1000x.textContent = '1000x';
    btn1000x.className = 'time-btn';
    btn1000x.setAttribute('data-scale', '1000');
    btn1000x.onclick = function() { setTimeScale(1000); };
    

    const btn10000x = document.createElement('button');
    btn10000x.id = 'btn10000x';
    btn10000x.textContent = '10000x';
    btn10000x.className = 'time-btn';
    btn10000x.setAttribute('data-scale', '10000');
    btn10000x.onclick = function() { setTimeScale(10000); };
    

    
    if (typeof advanceTimeBillionYears !== 'undefined') {
        advanceTimeBillionYears = undefined;
    }
});

function startGame() {
    
    if (!playTimerInterval) {
        playTimerInterval = setInterval(() => {
            playTimer++;
            
            
            if (playTimer >= 300) unlockAchievement(37);
            
            
            if (playTimer >= 3600) unlockAchievement(38);
            
            
            if (playTimer >= 86400) unlockAchievement(39);
            
        }, 1000);
    }

    gameStartCount++;
    localStorage.setItem('gameStartCount', gameStartCount.toString());
    
    if (gameStartCount >= 2) {
        unlockAchievement(26);
    }

    console.log('[DEBUG] startGame chamado');
    if (!inGameMenu) {
        console.warn('[DEBUG] startGame: inGameMenu NÃO encontrado!');
    } else {
        console.log('[DEBUG] startGame: inGameMenu existe. display:', inGameMenu.style.display, 'classList:', inGameMenu.className);
    }
    if (!gameMenuBtn) {
        console.warn('[DEBUG] startGame: gameMenuBtn NÃO encontrado!');
    }
    if (!closeMenuBtn) {
        console.warn('[DEBUG] startGame: closeMenuBtn NÃO encontrado!');
    }
    gameState = 'playing';
    startScreen.style.display = 'none';
    if (!planets || planets.length === 0) {
        planets = [];
        universeAge = 0;
        universeTime = 0;
    }
}
function toggleGameMenu() {
    console.log('[DEBUG] toggleGameMenu chamado. Estado atual:', inGameMenu.classList.contains('active'));
    if (!inGameMenu) {
        console.warn('[DEBUG] toggleGameMenu: inGameMenu NÃO encontrado!');
        return;
    }
    console.log('[DEBUG] toggleGameMenu: display:', inGameMenu.style.display, 'classList:', inGameMenu.className);
    const willActivate = !inGameMenu.classList.contains('active');
    inGameMenu.classList.toggle('active');
    if (willActivate) {
        inGameMenu.style.display = 'block';
    } else {
        inGameMenu.style.display = 'none';
    }
    console.log('[DEBUG] toggleGameMenu finalizado. Novo estado:', inGameMenu.classList.contains('active'), 'display:', inGameMenu.style.display);
    if (!gameMenuBtn) {
        console.warn('[DEBUG] toggleGameMenu: gameMenuBtn NÃO encontrado!');
    }
    if (!closeMenuBtn) {
        console.warn('[DEBUG] toggleGameMenu: closeMenuBtn NÃO encontrado!');
    }
}
function fgpVolume() {
    const volume = volumeSlider.value;
    volumeValue.textContent = volume;
    
}
function fgpGravityFactor() {
    gravityFactor = gravityFactorSlider.value / 100;
    gravityFactorValue.textContent = gravityFactorSlider.value;
}
function fgpDragFactor() {
    dragFactor = dragFactorSlider.value / 100;
    dragFactorValue.textContent = dragFactorSlider.value;
}
function resetPhysics() {
    gravityFactorSlider.value = 500;
    dragFactorSlider.value = 0;
    fgpGravityFactor();
    fgpDragFactor();
    showNotification('Physics reset to default values');
}
function toggleShadows() {
    shadowsEnabled = document.getElementById('shadowsToggle').checked;
}
function fgpSpaceColor() {
    spaceColor = document.getElementById('spaceColor').value;
}
function fgpGraphicsQuality() {
    graphicsQuality = document.getElementById('graphicsQuality').value;
}
function toggleTemperatureZones() {
    temperatureZonesVisible = showTempZones.checked;
}
function toggleNamesVisibility() {
    namesVisible = showNames.checked;
}
function fgpTemperature() {
    const temp = parseInt(tempSlider.value);
    tempValue.textContent = temp + '°C';
    astroSettings.temperature = temp;
    
    
    if (selectedPlanet) {
        selectedPlanet.temperature = temp;
    }
    
    
    planets.forEach(p => {
        if (p.type.includes('Star')) { 
            p.temperature = temp;
        }
    });
}
function setTimeScale(scale) {
    
    let newScale = Number(scale);
    if (!isFinite(newScale) || isNaN(newScale) || newScale < 0) {
        newScale = 0.1;
        showNotification('Error ): (0.1x)');
    } else if (newScale === 0) {
        showNotification('(0x)');
    } else {
        showNotification(`${newScale}x`);
    }
    timeScale = newScale;
    
    document.querySelectorAll('.time-btn').forEach(btn => {
        const btnScale = parseFloat(btn.getAttribute('data-scale'));
        if (!isNaN(btnScale) && Math.abs(btnScale - newScale) < 0.001) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2900);
}
function fgpMass() {
    massValue.textContent = massSlider.value;
    fgpAstroPreview();
}
function fgpGravity() {
    gravityValue.textContent = gravitySlider.value;
}
function fgpRotation() {
    rotationValue.textContent = rotationSlider.value;
}
function fgpWater() {
    waterValue.textContent = waterSlider.value + '%';
    fgpAstroPreview();
}
function fgpClouds() {
    cloudsValue.textContent = cloudsSlider.value + '%';
    fgpAstroPreview();
}
function fgpGas() {
    gasValue.textContent = gasSlider.value + '%';
    fgpAstroPreview();
}
function fgpRingMass() {
    ringMassValue.textContent = ringMassSlider.value;
    fgpAstroPreview();
}
function fgpAstroPreview() {
    const primary = primaryColor.value;
    const secondary = secondaryColor.value;
    
    
    planetPreview.style.background = `radial-gradient(circle at 30% 30%, ${secondary}, ${primary})`;
    
    
    astroSettings.primaryColor = primary;
    astroSettings.secondaryColor = secondary;
    astroSettings.ringColor = ringColor.value || '#cccccc'; 
    astroSettings.mass = parseInt(massSlider.value);
    astroSettings.gravity = parseFloat(gravitySlider.value);
    astroSettings.rotationSpeed = parseFloat(rotationSlider.value);
    astroSettings.water = parseInt(waterSlider.value);
    astroSettings.clouds = parseInt(cloudsSlider.value);
    astroSettings.gas = parseInt(gasSlider.value);
    astroSettings.hasRings = hasRings.checked;
    astroSettings.ringMass = parseInt(ringMassSlider.value);
}
function applyAstroSettings() {
    showNotification('success!');
}
function resetAstroSettings() {
    primaryColor.value = '#3498db';
    secondaryColor.value = '#2ecc71';
    ringColor.value = '#cccccc'; 
    massSlider.value = 50;
    gravitySlider.value = 9.8;
    rotationSlider.value = 0.01;
    waterSlider.value = 70;
    cloudsSlider.value = 30;
    gasSlider.value = 80;
    hasRings.checked = false;
    ringMassSlider.value = 30;
    tempSlider.value = 20;
    
    fgpMass();
    fgpGravity();
    fgpRotation();
    fgpWater();
    fgpClouds();
    fgpGas();
    fgpRingMass();
    fgpTemperature();
    fgpAstroPreview();
    
}
function createAstro(type, x, y, vx = 0, vy = 0, customMass = null) {

    if (type === 'spaceDust') spaceDustCreated++;
    
    if (spaceDustCreated >= 1000) {
        unlockAchievement(29);
    }
    
    let planetClass = '';
    if (type === 'planetoid' || type === 'planetoid') {
        planetClass = 'Rocky Planetoid';
    } else if (type === 'rockyPlanet' || type === 'planet' || type === 'rockyplanet') {
        planetClass = 'Rocky Planet';
    } else if (type === 'gasGiant' || type === 'Gas Giant' || type === 'gasoso') {
        planetClass = 'Gas Giant';
    }

    
    const planet = {
        x, y, vx, vy,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: astroSettings.rotationSpeed || 0.01,
        lifeTime: 0,
        pulseAngle: 0,
        jetAngle: Math.random() * Math.PI * 2,
        ringMass: astroSettings.ringMass || 0,
        temperature: astroSettings.temperature || 20,
        planetClass: planetClass,
        name: generateRandomName(),
        color: '#3498db',
        glowColor: '#2ecc71',
        mass: 1000,
        radius: 10,
        locked: false
    };

    
    const typeMap = {
        'planetoide': 'planetoid',
        'planetoid': 'planetoid',
        'planeta': 'rockyPlanet',
        'rockyplanet': 'rockyPlanet',
        'asteroide': 'asteroid',
        'asteroid': 'asteroid',
        'cometa': 'comet',
        'comet': 'comet',
        'meteoroide': 'meteoroid',
        'meteoroid': 'meteoroid',
        'meteorito': 'meteorite',
        'meteorite': 'meteorite',
        'reddwarf': 'redDwarf',
        'redgiant': 'redGiant',
        'redsupergiant': 'redSupergiant',
        'magnetar': 'magnetar',
        'quarkstar': 'quarkStar',
        'heliumwhitedwarf': 'heliumWhiteDwarf',
        'pulsar': 'pulsar',
        'quasar': 'quasar',
        'whitehole': 'whiteHole'
    };

    
    const normalizedType = (type || '').toLowerCase();
    const astroType = typeMap[normalizedType] || type;
    planet.type = astroType;

    
    switch (astroType) {

        case 'spaceDust':
            planet.mass = Math.max(0.01, customMass || astroSettings.mass * 0.01);
            planet.color = '#888888';
            planet.radius = calculateRadiusForType('spaceDust', planet.mass);
            planet.gas = astroSettings.gas / 100;
            planet.ocean = astroSettings.water / 100;
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            Acount = (Acount || 0) + 1;
            
    
        if (Acount >= 20){
            unlockAchievement(20);
        }
        if (Acount >= 100){
            unlockAchievement(21);
        }
        if (Acount >= 500){
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'radiation':
            planet.mass = Math.max(0.005, customMass || astroSettings.mass * 0.005);
            planet.color = '#ffff66';
            planet.radius = calculateRadiusForType('radiation', planet.mass);
            planet.lifetime = 10; 
            Acount = (Acount || 0) + 1;
            
            if (Acount >= 20){
            unlockAchievement(20);
        }
        if (Acount >= 100){
            unlockAchievement(21);
        }
        if (Acount >= 500){
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'nebula':
            planet.mass = Math.max(0.1, customMass || astroSettings.mass);
            planet.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            planet.radius = calculateRadiusForType('nebula', planet.mass);
            Acount = (Acount || 0) + 1;
            
    
         if (Acount >= 20){
            unlockAchievement(20);
        }
        if (Acount >= 100){
            unlockAchievement(21);
        }
        if (Acount >= 500){
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'comet':
            planet.mass = Math.max(0.1, customMass || astroSettings.mass);
            planet.color = '#3498db';
            planet.radius = calculateRadiusForType('comet', planet.mass);
            planet.tailDirection = Math.random() * Math.PI * 2;
            planet.gas = astroSettings.gas / 100;
            planet.hasCometTail = true;
            planet.ocean = astroSettings.water / 100;
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            unlockAchievement(20);
        }
        if (Acount >= 100){
            unlockAchievement(21);
        }
        if (Acount >= 500){
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'meteoroid':
            planet.mass = Math.max(0.01, customMass || astroSettings.mass);
            planet.color = '#95a5a6';
            planet.radius = calculateRadiusForType('meteoroid', planet.mass);
            planet.shape = generateAsteroidShape(planet.radius);
            planet.ocean = astroSettings.water / 100;
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            planet.gas = astroSettings.gas / 100;
            Acount = (Acount || 0) + 1;
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'meteorite':
            planet.mass = Math.max(0.1, customMass || astroSettings.mass);
            planet.color = '#7f8c8d';
            planet.radius = calculateRadiusForType('meteorite', planet.mass);
            planet.shape = generateAsteroidShape(planet.radius);
            planet.hasFireTail = true;
            planet.tailDirection = Math.random() * Math.PI * 2;
            planet.ocean = astroSettings.water / 100;
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            planet.gas = astroSettings.gas / 100;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'asteroid':
            planet.mass = Math.max(1, customMass || astroSettings.mass);
            planet.color = '#95a5a6';
            planet.radius = calculateRadiusForType('asteroid', planet.mass);
            planet.shape = generateAsteroidShape(planet.radius);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.ocean = astroSettings.water / 100;
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            planet.gas = astroSettings.gas / 100;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'planetoid':
            planet.mass = Math.max(300, customMass || astroSettings.mass);
            planet.color = '#9b59b6';
            planet.radius = calculateRadiusForType('planetoid', planet.mass);
            planet.rx = planet.radius * (1.2 + Math.random() * 0.4);
            planet.ry = planet.radius * (0.8 + Math.random() * 0.3);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.ocean = astroSettings.water / 100;
            planet.oceanColor = '#3498db';
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            planet.gas = astroSettings.gas / 100;
            unlockAchievement(14)
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'rockyPlanet':
            planet.mass = Math.max(5000, customMass || astroSettings.mass * 10);
            planet.color = astroSettings.primaryColor;
            planet.landColor = astroSettings.secondaryColor;
            planet.ocean = astroSettings.water / 100;
            planet.oceanColor = '#3498db';
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            planet.radius = calculateRadiusForType('rockyPlanet', planet.mass);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.gas = astroSettings.gas / 100;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'gasGiant':
            planet.mass = Math.max(105000, customMass || astroSettings.mass * 100);
            planet.color = '#e67e22';
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.gas = astroSettings.gas / 100;
            planet.radius = calculateRadiusForType('gasGiant', planet.mass);
            planet.temperature = 120;
            planet.ocean = astroSettings.water / 100;
            planet.clouds = astroSettings.clouds / 100;
            planet.continents = generateContinents(5);
            Acount = (Acount || 0) + 1;
            planet.temperature = 2;
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'brownDwarf':
            planet.mass = Math.max(2550000, customMass || astroSettings.mass * 1000);
            planet.color = '#d60000ff';
            planet.glowColor = '#570000ff';
            planet.radius = calculateRadiusForType('brownDwarf', planet.mass);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.temperature = 2300;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        case 'ttauriStar':
            planet.mass = Math.max(10000000, customMass || astroSettings.mass * 1000000);
            planet.color = '#FFD700';
            planet.glowColor = '#FF4500';
            planet.radius = calculateRadiusForType('ttauriStar', planet.mass);
            planet.accretionDisk = true;
            planet.diskSize = planet.radius * 4.5;
            planet.maxLifeTime = 0.001 + Math.random() * 2;
            planet.temperature = 54000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'carbonStar':
            planet.mass = Math.max(20000000, customMass || astroSettings.mass * 1000000);
            planet.color = '#C70039';
            planet.glowColor = '#FF5733';
            planet.radius = calculateRadiusForType('carbonStar', planet.mass);
            planet.temperature = 24000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'giantStar':
            planet.mass = Math.max(50000000, customMass || astroSettings.mass * 1000000);
            planet.color = '#ff0000';
            planet.glowColor = '#ff0000';
            planet.radius = calculateRadiusForType('giantStar', planet.mass);
            Acount = (Acount || 0) + 1;
            planet.temperature = 28000;
            
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'hypergiant':
            planet.mass = Math.max(100000000, customMass || astroSettings.mass * 1000000);
            planet.color = '#FF0000';
            planet.glowColor = '#FF6347';
            planet.radius = calculateRadiusForType('hypergiant', planet.mass);
            planet.temperature = 36000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'massiveStar':
            planet.mass = Math.max(500000000, customMass || astroSettings.mass * 1000000);
            planet.color = '#00BFFF';
            planet.glowColor = '#00008B';
            planet.radius = calculateRadiusForType('massiveStar', planet.mass);
            planet.temperature = 50000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'strangeStar':
            planet.mass = Math.max(500000000000, customMass || astroSettings.mass * 1000000000);
            planet.color = '#8A2BE2';
            planet.glowColor = '#9400D3';
            planet.radius = calculateRadiusForType('strangeStar', planet.mass);
            planet.temperature = 25778;
            unlockAchievement(11)
            planet.temperature = 184000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'whiteDwarf':
            planet.mass = Math.max(1e15, customMass || 20500000000);
            planet.color = '#ffffff';
            planet.glowColor = '#3498db';
            planet.radius = calculateRadiusForType('whiteDwarf', planet.mass);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.temperature = 9000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'blackDwarf':
            planet.mass = Math.max(100000, customMass || 100000);
            planet.color = '#181818';
            planet.glowColor = '#2d1a0e';
            planet.radius = calculateRadiusForType('blackDwarf', planet.mass);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.temperature = 28;
            unlockAchievement(30)
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'star':
            planet.mass = Math.max(500000, customMass || 500000);
            planet.color = '#FFD700';
            planet.glowColor = '#FF4500';
            planet.radius = calculateRadiusForType('star', planet.mass);
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.temperature = 14000;
            Acount = (Acount || 0) + 1;
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'neutronStar':
            planet.mass = Math.max(50500000000, customMass || astroSettings.mass * 1000000000);
            planet.color = '#6ae1f7';
            planet.glowColor = '#6ae1f7';
            planet.pulse = true;
            planet.radius = calculateRadiusForType('neutronStar', planet.mass);
            planet.temperature = 71778;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        
        case 'pulsar':
            planet.mass = Math.max(50500000000, customMass || astroSettings.mass * 1000000000);
            planet.color = '#F0FFFF';
            planet.glowColor= '#7E90FF';
            planet.pulse = true;
            planet.jets = true;
            planet.radius = calculateRadiusForType('pulsar', planet.mass);
            planet.jetRotationSpeed = 2.0; 
            planet.jetAngle = Math.random() * Math.PI * 2;
            planet.temperature = 78778;
            unlockAchievement(8)
            pulsarCount = (pulsarCount || 0) + 1;
            if (pulsarCount >= 5) {
                unlockAchievement(13);
            }
            Acount = (Acount || 0) + 1;
         if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'blackHole':
            planet.mass = Math.max(1e12, customMass || astroSettings.mass * 1e12);
            planet.color = '#000000';
            planet.glowColor = '#9b59b6';
            planet.accretionDisk = true;
            planet.diskColor = '#e74c3c';
            planet.radius = calculateRadiusForType('blackHole', planet.mass);
            planet.temperature = 584000;
            unlockAchievement(10)
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'quasar':
            planet.mass = Math.max(1e12, customMass || astroSettings.mass * 1e12);
            planet.color = '#000000';
            planet.glowColor = '#fffde4';
            planet.accretionDisk = true;
            planet.diskColor = '#fffde4';
            planet.jets = true;
            planet.radius = calculateRadiusForType('quasar', planet.mass);
            planet.temperature = 557999978;
            unlockAchievement(15)
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'whiteHole':
            planet.mass = Math.max(5000, customMass || 5000);
            
            planet.color = '#ffffff';
            planet.glowColor = '#3498db';
            planet.radius = calculateRadiusForType('whiteHole', planet.mass);
            
            planet.jets = true;
            planet.temperature = 5679999978;
            unlockAchievement(9)
            Acount = (Acount || 0) + 1;
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;
            
        case 'wormhole':
            planet.mass = Math.max(1e12, customMass || astroSettings.mass * 1e12);
            planet.color = '#ffffff';
            planet.glowColor = '#3498db';
            planet.radius = calculateRadiusForType('wormhole', planet.mass);
            unlockAchievement(18)
            Acount = (Acount || 0) + 1;
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'redDwarf':
            planet.mass = Math.max(2.56e6, customMass || astroSettings.mass * 1000);
            planet.color = '#FF3300';
            planet.glowColor = '#CC0000';
            planet.radius = calculateRadiusForType('redDwarf', planet.mass);
            planet.maxLifeTime = 5e12;
            planet.temperature = 9500;
            Acount = (Acount || 0) + 1;
         if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'heliumWhiteDwarf':
            planet.mass = Math.max(1e15, customMass || astroSettings.mass * 1e12);
            planet.color = '#87CEEB';
            planet.glowColor = '#ADD8E6';
            planet.radius = calculateRadiusForType('heliumWhiteDwarf', planet.mass);
            planet.maxLifeTime = 1e12;
            planet.temperature = 1678;
            Acount = (Acount || 0) + 1;
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'supermassiveStar':
            planet.mass = Math.max(1e16, customMass || astroSettings.mass * 1e13);
            planet.color = '#0000FF';
            planet.glowColor = '#1E90FF';
            planet.radius = calculateRadiusForType('supermassiveStar', planet.mass);
            planet.maxLifeTime = 1e6;
            planet.temperature = 99000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'magnetar':
            planet.mass = Math.max(1e12, customMass || astroSettings.mass * 1e9);
            planet.color = '#E0FBE2';
            planet.glowColor = '#E0B999';
            planet.radius = calculateRadiusForType('magnetar', planet.mass);
            planet.pulse = true;
            planet.pulseAngle = 0;
            planet.magneticField = 1000;
            planet.maxLifeTime = 1e7;
            planet.temperature = 108778;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }
            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'redGiant':
            planet.mass = Math.max(5e13, customMass || astroSettings.mass * 1e10);
            planet.color = '#FF4500';
            planet.glowColor = '#FF0000';
            planet.radius = calculateRadiusForType('redGiant', planet.mass);
            planet.temperature = 14000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

        case 'redSupergiant':
            planet.mass = Math.max(1e14, customMass || astroSettings.mass * 1e11);
            planet.color = '#FF0000';
            planet.glowColor = '#8B0000';
            planet.radius = calculateRadiusForType('redSupergiant', planet.mass);
            planet.temperature = 34000;
            Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
            break;

    case 'quarkStar':
        planet.mass = Math.max(5e12, customMass || astroSettings.mass * 1e10);
        planet.color = '#F0BBE2';
        planet.glowColor = '#AF4082';
        planet.radius = calculateRadiusForType('quarkStar', planet.mass);
        planet.pulse = true;
        planet.jets = true;
        planet.jetRotationSpeed = 3.0; 
        planet.jetAngle = Math.random() * Math.PI * 2;
        planet.temperature = 208778;
        Acount = (Acount || 0) + 1;
    
        if (Acount >= 20){
            
            unlockAchievement(20);
        }
        if (Acount >= 100){
            
            unlockAchievement(21);
        }
        if (Acount >= 500){
            
            unlockAchievement(22);
        }
        if (Acount >= 1000){
            
            unlockAchievement(23);
        }
        if (Acount >= 10000){
            
            unlockAchievement(24);
        }

            
        console.log('Astros no total : ' + Acount + ' quantidades ' )
        break;

        
        default:
            planet.mass = customMass || 1000;
            planet.color = '#cccccc';
            planet.radius = calculateRadiusForType(astroType, planet.mass);
            console.warn(`Tipo de astro desconhecido: ${astroType}, usando configurações padrão`);
            break;
    }


    
    if (!isFinite(planet.mass) || planet.mass <= 0) {
        console.error(`Massa inválida para ${astroType}: ${planet.mass}`);
        planet.mass = astroType === 'spaceDust' ? 0.1 : 1000;
    }
    
    if (!isFinite(planet.radius) || planet.radius <= 0) {
        console.error(`Raio inválido para ${astroType}: ${planet.radius}`);
        planet.radius = calculateRadiusForType(astroType, planet.mass) || 10;
    }

    
    if (["asteroid", "meteorite", "meteoroid"].includes(astroType)) {
        if (!planet.shape || !Array.isArray(planet.shape) || planet.shape.length < 3) {
            planet.shape = generateAsteroidShape(planet.radius);
        }
    }

    
 
    planet.createdManually = false;

    
    planets.push(planet);
    
    
    if (modoRetirada && planets.length > MAX_ASTROS_RETIRADA) {
        
        let ultimoManualIndex = -1;
        for (let i = planets.length - 1; i >= 0; i--) {
            if (planets[i].createdManually) {
                ultimoManualIndex = i;
                break;
            }
        }
        
        
        if (ultimoManualIndex !== -1) {
            const removed = planets.splice(ultimoManualIndex, 1)[0];
            showNotification(`(Withdrawal mode): ${removed.name || removed.type}`);
        }
        
        else {
            const removed = planets.shift();
            showNotification(`(Withdrawal mode): ${removed.name || removed.type}`);
        }
    }
    
    return planet;
}
function getTypeName(type) {
    const names = {
        'spaceDust': 'Space Dust',
        'nebula': 'Nebula',
        'comet': 'Comet',
        'meteoroid': 'meteoroid',
        'meteorite': 'meteorite',
        'rockyPlanet': 'Rocky Planet',
        'star': 'Star',
        'gasGiant': 'gasGiant',
        'asteroid': 'Asteroid',
        'planetoid': 'Planetoid',
        'neutronStar': 'Neutron Star',
        'blackHole': 'Black Hole',
        'quasar': 'Quasar',
        'whiteHole': 'White Hole',
        'brownDwarf': 'Brown Dwarf',
        'whiteDwarf': 'White Dwarf',
        'blackDwarf': 'Black Dwarf',
        'ttauriStar': 'T Tauri Star',
        'carbonStar': 'Carbon Star',
        'giantStar': 'Giant Star',
        'hypergiant': 'Hypergigant',
        'massiveStar': 'Massive Star',
        'strangeStar': 'Strange Star',
        'wormhole': 'Worm Hole',
        'radiation': 'Radiation',
        'redDwarf' : 'Red Dwarf',
        'heliumWhiteDwarf': 'Hellium White Dwarf',
        'redGiant': 'Red Giant',
        'supermassiveStar': 'Supermassive Star',
        'magnetar': 'Magnetar',
        'pulsar': 'Pulsar',
        'quarkStar': 'Quark Pulsar',
        'redSupergiant': 'Red Supergigant'
    };
    return names[type] || 'Astro';
}
function generateContinents(numContinents) {
    const continents = [];
    for (let i = 0; i < numContinents; i++) {
        const continent = [];
        const points = 5 + Math.floor(Math.random() * 6);
        const centerX = -0.3 + Math.random() * 0.6;
        const centerY = -0.3 + Math.random() * 0.6;
        
        for (let j = 0; j < points; j++) {
            const angle = (j / points) * Math.PI * 2;
            const distance = 0.1 + Math.random() * 0.2;
            continent.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance
            });
        }
        continents.push(continent);
    }
    return continents;
}
function createPlanet(astroType, x, y, mass, radius) {
    const planet = {
        type: astroType,
        x,
        y,
        mass,
        radius,
        continents: [],
        
    };

    if (['rockyPlanet', 'planetoid'].includes(astroType)) {
        planet.continents = generateContinents(3);
    }

    return planet;
}
function generateAsteroidShape(size) {
    const points = [];
    const numPoints = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variation = 0.6 + Math.random() * 0.8;
        points.push({
            x: Math.cos(angle) * size * variation,
            y: Math.sin(angle) * size * variation
        });
    }
    return points;
}
function lightenColor(color, percent) {
    
    if (!color || typeof color !== 'string') return '#ffffff';
    
    
    const colorNames = {
        'white': '#ffffff',
        'black': '#000000',
        'red': '#ff0000',
        'green': '#00ff00',
        'blue': '#0000ff',
        
    };
    
    if (colorNames[color.toLowerCase()]) {
        color = colorNames[color.toLowerCase()];
    }
    
    
    let r, g, b;
    if (color.startsWith('#')) {
        
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
    } else if (color.startsWith('rgb')) {
        
        const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            r = parseInt(match[1]);
            g = parseInt(match[2]);
            b = parseInt(match[3]);
        } else {
            return '#ffffff'; 
        }
    } else {
        return '#ffffff'; 
    }
    
    
    
    
    
    
    r = Math.min(255, r + Math.round(255 * percent / 100));
    g = Math.min(255, g + Math.round(255 * percent / 100));
    b = Math.min(255, b + Math.round(255 * percent / 100));
    
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
function openEditPanel(planet) {
    selectedPlanet = planet;
    
    

    editName.value = planet.name || getTypeName(planet.type);
    editType.value = getTypeName(planet.type);
    editClass.value = planet.planetClass || 'Nenhuma';
    editTemperature.value = planet.temperature !== undefined ? planet.temperature + '°C' : 'Desconhecida';
    editColor.value = planet.color;
    editSecondaryColor.value = planet.landColor || planet.glowColor || '#3498db';
    editMass.value = planet.mass;
    editGravity.value = planet.gravity || (planet.mass / 100).toFixed(1);
    editRotation.value = planet.rotationSpeed || 0.01;
    editWater.value = planet.waterValue || 0;
    editClouds.value = planet.cloudsValue || 0;
    editGas.value = planet.gasValue || 0;
    editRingMass.value = planet.ringMass || 30;
    
    editDescription.value = planet.description || `Um ${getTypeName(planet.type)} no vasto universo`;
    
    
    editPanel.style.display = 'block';


    const btnLock = document.getElementById('btnLock');
    if (planet.locked) {
        btnLock.textContent = "🔓 DesLock";
    } else {
        btnLock.textContent = "🔒 Lock";
    }
}
function applyAstroChanges() {
    if (!selectedPlanet) return;
    
    
    selectedPlanet.name = editName.value;
    selectedPlanet.color = editColor.value;
    
    if (selectedPlanet.landColor) selectedPlanet.landColor = editSecondaryColor.value;
    if (selectedPlanet.glowColor) selectedPlanet.glowColor = editSecondaryColor.value;
    
    selectedPlanet.mass = parseFloat(editMass.value);
    selectedPlanet.gravity = parseFloat(editGravity.value);
    selectedPlanet.rotationSpeed = parseFloat(editRotation.value);
    
    if (selectedPlanet.ocean) selectedPlanet.ocean = parseFloat(editWater.value) / 100;
    if (selectedPlanet.clouds) selectedPlanet.clouds = parseFloat(editClouds.value) / 100;
    if (selectedPlanet.gas) selectedPlanet.gas = parseFloat(editGas.value) / 100;

    selectedPlanet.waterValue = parseInt(editWater.value);
    selectedPlanet.cloudsValue = parseInt(editClouds.value);
    selectedPlanet.gasValue = parseInt(editGas.value);
    
    
    selectedPlanet.ringMass = parseFloat(editRingMass.value);
    
    selectedPlanet.description = editDescription.value;
    
    
    selectedPlanet.radius = calculateRadiusForType(selectedPlanet.type, selectedPlanet.mass);
    
    
    editPanel.style.display = 'none';
}
function deleteSelectedAstro() {
    if (!selectedPlanet) return;
    
    const index = planets.indexOf(selectedPlanet);
    if (index !== -1) {
        planets.splice(index, 1);
        editPanel.style.display = 'none';
        selectedPlanet = null;
    }
}
function handleMouseDown(e) {
    if (gameState !== 'playing') return;
    
    if (e.button === 0) { 
        mouse.down = true;
        mouse.downX = mouse.x;
        mouse.downY = mouse.y;
        
        
        if (creationMode) {
            
            return;
        }
    } else if (e.button === 2) { 
        mouse.rightDown = true;
        
        
        for (let i = planets.length - 1; i >= 0; i--) {
            const planet = planets[i];
            const dx = (mouse.x - planet.x) * camera.zoom;
            const dy = (mouse.y - planet.y) * camera.zoom;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < planet.radius * camera.zoom) {
                openEditPanel(planet);
                break;
            }
        }
    }
}
function handleMouseUp(e) {
    if (gameState !== 'playing') return;
    
    if (e.button === 0 && mouse.down) {
        mouse.down = false;

        const vx = (mouse.x - mouse.downX) * 0.1;
        const vy = (mouse.y - mouse.downY) * 0.1;
        
        if (creationMode && mouse.downX !== null && mouse.downY !== null) {
            const vx = (mouse.x - mouse.downX) * 0.1;
            const vy = (mouse.y - mouse.downY) * 0.1;
            
            const newPlanet = createAstro(creationMode, mouse.downX, mouse.downY, vx, vy);
            newPlanet.createdManually = true;
            createAstro(creationMode, mouse.downX, mouse.downY, velX, velY);
            return;
        }
        
        

        
        planets.push({
            x: mouse.downX,
            y: mouse.downY,
            vx: vx,
            vy: vy,
            mass: mass,
            radius: Math.cbrt(mass) * 5,
            color: astroSettings.primaryColor,
            type: 'spaceDust',
            ringMass: astroSettings.ringMass,
            temperature: astroSettings.temperature,
            name: generateRandomName() 
        });
    } else if (e.button === 2) {
        mouse.rightDown = false;
    }
    
    if (e.button === 0) {
        mouse.down = false;
        trajectoryPoints = [];
    }
    if (e.button === 2) {
        mouse.rightDown = false;
    }
}
function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left - canvas.width / 2) / camera.zoom + camera.x;
    mouse.y = (e.clientY - rect.top - canvas.height / 2) / camera.zoom + camera.y;
}
function handleContextMenu(e) {
    e.preventDefault(); 
}
function handleScroll(e) {
    if (gameState !== 'playing') return;
    
    
    mass += e.deltaY > 0 ? -5 : 5;
    mass = Math.max(5, Math.min(500, mass));
}
function handleKeyDown(e) {
    const isEditing = document.activeElement.tagName === 'INPUT' || 
                     document.activeElement.tagName === 'TEXTAREA';
    
    const isMenuOpen = document.getElementById('inGameMenu').style.display === 'block' ||
                      document.getElementById('editPanel').style.display === 'block' ||
                      document.getElementById('achievementsSidebar').style.display !== 'none' ||
                      document.getElementById('savesSidebar').style.display !== 'none' ||
                      document.getElementById('configSidebar').classList.contains('active') ||
                      document.getElementById('warningsSidebar').classList.contains('active');
    

    if (gameState !== 'playing' || isEditing || isMenuOpen) return;
    
    const cameraSpeed = 100 / camera.zoom;
    
    switch(e.key.toLowerCase()) {
        case 'w': 
            camera.y -= cameraSpeed;
            unlockAchievement(48);
            break;
        case 's': 
            camera.y += cameraSpeed;
            unlockAchievement(48); 
            break;
        case 'a': 
            camera.x -= cameraSpeed;
            unlockAchievement(48);
            break;
        case 'd': 
            camera.x += cameraSpeed;
            unlockAchievement(48);
            break;
        case 'q': 
            camera.zoom *= 1.1;
            break;
        case 'e': 
            camera.zoom /= 1.1;
            break; 
        case 'f': 
            if (!isEditing && !isMenuOpen) {
                planets = [];
                camera = { x: 0, y: 0, zoom: 1 };
                universeAge = 0;
                universeTime = 0;
                showNotification('Universe reset');
                Fcount += 1;
                if (Fcount >= 20) {
                    unlockAchievement(45);
                }
            }
            break;
        case 't': 
            if (!isEditing && !isMenuOpen) {
                temperatureZonesVisible = !temperatureZonesVisible;
                showTempZones.checked = temperatureZonesVisible;
                showNotification(`Temperate Zones ${temperatureZonesVisible ? 'activated' : 'deactivated'}`);
            }
            break;
        case 'escape': 
            if (creationMode) {
                creationMode = null;
                creationModeIndicator.style.display = 'none';
                showNotification('Creation mode canceled');
            }
            break;
        case 'n': 
            if (!isEditing && !isMenuOpen) {
                namesVisible = !namesVisible;
                showNames.checked = namesVisible;
                showNotification(`Names ${namesVisible ? 'activated' : 'deactivated'}`);
            }
            break;
    }
}
function transformToGiantStar(planet) {
    planet.type = 'giantStar';
    planet.color = '#FF8C00';
    planet.glowColor = '#FF4500';
    planet.radius = calculateRadiusForType('giantStar', planet.mass);
    let massSolarGiant = planet.mass / 2e30;
    if (massSolarGiant < 0.1) massSolarGiant = 0.1;
    planet.maxLifeTime = 100 / Math.pow(massSolarGiant, 2.5);
    planet.temperature = 28000;
}
function transformToHypergiant(planet) {
    planet.type = 'hypergiant';
    planet.color = '#FF0000';
    planet.glowColor = '#FF6347';
    planet.radius = calculateRadiusForType('hypergiant', planet.mass);
    let massSolarHyper = planet.mass / 2e30;
    if (massSolarHyper < 0.1) massSolarHyper = 0.1;
    planet.maxLifeTime = 10 / Math.pow(massSolarHyper, 2.5);
    planet.temperature = 36000;
}
function transformToMassiveStar(planet) {
    planet.type = 'massiveStar';
    planet.color = '#00BFFF';
    planet.glowColor = '#00008B';
    planet.radius = calculateRadiusForType('massiveStar', planet.mass);
    let massSolarMassive = planet.mass / 2e30;
    if (massSolarMassive < 0.1) massSolarMassive = 0.1;
    planet.maxLifeTime = 3 / Math.pow(massSolarMassive, 2.5);
    planet.temperature = 50000;
}
function transformToMeteorite(planet) {
    planet.type = 'meteorite';
    planet.color = '#FFD700';
    planet.radius = calculateRadiusForType('meteorite', planet.mass);
    planet.shape = generateAsteroidShape(planet.radius);
    planet.originalClass = 'Meteorito Comum';
    planet.planetClass = 'Meteorito Comum';
    
    
    const speedFactor = 1.1;
    planet.vx *= speedFactor;
    planet.vy *= speedFactor;
}
function transformToWhiteDwarf(planet) {
    planet.type = 'whiteDwarf';
    planet.color = '#ffffff';
    planet.glowColor = '#3498db';
    planet.radius = calculateRadiusForType('whiteDwarf', planet.mass);
    planet.maxLifeTime = Infinity;
    planet.temperature = 9000;
}
function transformToBlackDwarf(planet) {
    planet.type = 'blackDwarf';
    planet.color = '#181818'; 
    planet.glowColor = '#2d1a0e'; 
    planet.radius = calculateRadiusForType('whiteDwarf', planet.mass); 
    planet.maxLifeTime = Infinity;
    planet.temperature = 584000;
}
function generateAsteroidShape(size) {
    const points = [];
    const numPoints = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variation = 0.6 + Math.random() * 0.8; 
        points.push({
            x: Math.cos(angle) * size * variation,
            y: Math.sin(angle) * size * variation
        });
    }
    return points;
}
function transformToMeteoroid(planet) {
    planet.type = 'meteoroid';
    planet.color = '#7f8c8d';
    planet.radius = calculateRadiusForType('meteoroid', planet.mass);
    unlockAchievement(3);
    planet.waterValue = 0; 
    planet.gasValue = 0;   
    planet.temperature = 50; 
    planet.originalClass = 'Meteoroide Comum';
    planet.exoticAcquired = false;
}
function calculateGravitationalForce(body1, body2) {
    
        if (body1.type === 'nebula' || body2.type === 'nebula') return;
    
    
    const dx = body2.x - body1.x;
    const dy = body2.y - body1.y;
    const distanceSquared = dx * dx + dy * dy;

    if (distanceSquared < MIN_DISTANCE * MIN_DISTANCE) return;

    const distance = Math.sqrt(distanceSquared);
    const force = (SAFE_G * body1.mass * body2.mass) / distanceSquared;
    const fx = (force * dx) / distance;
    const fy = (force * dy) / distance;

    body1.fx += fx;
    body1.fy += fy;
    body2.fx -= fx;
    body2.fy -= fy;
    
    const MIN_DISTANCE = 10; 
    const SAFE_G = 6.67430e-11; 
    
    try {
        
        const dx = body2.x - body1.x;
        const dy = body2.y - body1.y;
        const distanceSquared = dx * dx + dy * dy;
        
        
        if (distanceSquared === 0 || !isFinite(distanceSquared)) {
            return { fx: 0, fy: 0 };
        }

        
        const logForce = Math.log10(SAFE_G) + 
                         Math.log10(body1.mass) + 
                         Math.log10(body2.mass) - 
                         Math.log10(Math.max(distanceSquared, MIN_DISTANCE * MIN_DISTANCE));
        
        const forceMagnitude = Math.pow(10, logForce);
        
        
        if (!isFinite(forceMagnitude)) {
            console.warn('Força gravitacional inválida calculada', {body1, body2});
            return { fx: 0, fy: 0 };
        }


        
        const distance = Math.sqrt(distanceSquared);
        const forceRatio = forceMagnitude / distance;
        
        return {
            fx: forceRatio * dx,
            fy: forceRatio * dy
        };
    } catch (error) {
        console.error('Erro no cálculo gravitacional:', error);
        return { fx: 0, fy: 0 };
    }
}
function fgpExoticObjects(deltaTime) {
    const absDelta = Math.abs(deltaTime / 1000);
    
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        
        if (planet.type === 'blackHole' || planet.type === 'quasar') {
            
            planet.radiationTimer = (planet.radiationTimer || 0) + absDelta;
            if (planet.radiationTimer > 3) {
                planet.radiationTimer = 0;
                
                const angle = Math.random() * Math.PI * 2;
                const distance = planet.radius * 2.5;
                const speed = 15 + Math.random() * 15; 
                
                createAstro(
                    'radiation',
                    planet.x + Math.cos(angle) * distance,
                    planet.y + Math.sin(angle) * distance,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    0.005 
                );
            }
        }
        
        if (planet.type === 'whiteHole') {
            
            planet.lifeTime = (planet.lifeTime || 0) + absDelta;
            if (planet.lifeTime > 2) {
                planet.lifeTime = 0;
                
                const types = ['spaceDust', 'nebula', 'meteoroid', 'asteroid'];
                const type = types[Math.floor(Math.random() * types.length)];
                const angle = Math.random() * Math.PI * 2;
                const distance = planet.radius * 3.5;
                const speed = 10 + Math.random() * 10; 
                const mass = 0.5 + Math.random() * 20; 
                
                createAstro(
                    type,
                    planet.x + Math.cos(angle) * distance,
                    planet.y + Math.sin(angle) * distance,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    mass
                );
            }
        }
    }
}
function fgpBlackHolesAndQuasars(deltaTime) {
  const absDelta = Math.abs(deltaTime / 1000);
  
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    if (planet.type !== 'blackHole' && planet.type !== 'quasar') continue;
    
    
    const massLossRate = planet.type === 'quasar' ? 0.001 : 0.0005;
    planet.mass -= planet.mass * massLossRate * absDelta;
    
    
    planet.lifeTime = (planet.lifeTime || 0) + absDelta;
    
    
    if (planet.lifeTime > 2) {
      planet.lifeTime = 0;
      
      
      const count = planet.type === 'quasar' ? 8 : 5; 
      for (let j = 0; j < count; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = planet.radius * 3;
        const speed = 10 + Math.random() * 20;
        
        createAstro(
          'radiation',
          planet.x + Math.cos(angle) * distance,
          planet.y + Math.sin(angle) * distance,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          0.005 
        );
      }
    }
    
    
    if (planet.mass < 1000) {
      planet.markedForRemoval = true;
      showNotification(`${getTypeName(planet.type)} evaporated.`);
    }
  }
  
  
  planets = planets.filter(p => !p.markedForRemoval);
}
function transformToRedSupergiant(planet) {
    planet.type = 'redSupergiant';
    planet.color = '#DC143C';
    planet.glowColor = '#B22222';
    planet.radius = calculateRadiusForType('redSupergiant', planet.mass) * 150;
    planet.temperature = 34000;
    planet.lifeStage = 'supergiant';
    planet.maxLifeTime = 1e6; 
    planet.age = 0;
}
function transformToPulsar(planet) {
    planet.type = 'pulsar';
    planet.color = '#00FFFF';
    planet.glowColor = '#1E90FF';
    planet.radius = calculateRadiusForType('pulsar', planet.mass);
    planet.rotationSpeed = 10 + Math.random() * 20;
    planet.pulseFrequency = 0.1 + Math.random() * 0.3;
    planet.jetRotationSpeed = 0.3;
    planet.jetAngle = Math.random() * Math.PI * 2;
    planet.maxLifeTime = 1e5; 
    planet.age = 0;
    unlockAchievement(12)
    planet.temperature = 78778;
}
function transformToMagnetar(planet) {
    planet.type = 'magnetar';
    planet.color = '#8A2BE2';
    planet.glowColor = '#9370DB';
    planet.radius = calculateRadiusForType('magnetar', planet.mass);
    planet.magneticField = 1e11; 
    planet.rotationSpeed = 0.1 + Math.random() * 0.5;
    planet.maxLifeTime = 1e4; 
    planet.age = 0;
    planet.temperature = 108778;
}
function transformToQuarkStar(planet) {
    planet.type = 'quarkStar';
    planet.color = '#BA55D3';
    planet.glowColor = '#8A2BE2';
    planet.radius = calculateRadiusForType('quarkStar', planet.mass);
    planet.rotationSpeed = 15 + Math.random() * 15;
    planet.quarkMatter = true;
    planet.strangeness = 0.3 + Math.random() * 0.4;
    planet.maxLifeTime = 5e3; 
    planet.age = 0;
    planet.temperature = 208778;
}
function transformToSupernova(planet) {
    const explosionPower = Math.log10(planet.mass) * 15;
    const fragments = 100 + Math.floor(explosionPower);
    unlockAchievement(38);
    
    
    createAstro(
        'nebula',
        planet.x,
        planet.y,
        0, 0,
        planet.mass * 0.7
    );
    
    
    if (planet.mass > 3e12) {
        createAstro(
            'blackHole',
            planet.x,
            planet.y,
            0, 0,
            planet.mass * 0.3
        );
    } else {
        createAstro(
            'neutronStar',
            planet.x,
            planet.y,
            0, 0,
            planet.mass * 0.3
        );
    }
    
    
    const index = planets.indexOf(planet);
    if (index !== -1) planets.splice(index, 1);
    
}
function transformToStrangeStar(planet) {
    planet.type = 'strangeStar';
    planet.color = '#FF00FF';
    planet.glowColor = '#8B008B';
    planet.radius = calculateRadiusForType('strangeStar', planet.mass);
    planet.strangeMatter = true;
    planet.jetRotationSpeed = 0.7;
    planet.jetAngle = Math.random() * Math.PI * 2;
    planet.strangeness = 0.8 + Math.random() * 0.2;
    planet.maxLifeTime = 1e3; 
    planet.age = 0;
    planet.temperature = 184000;
}
function transformToRedStar(planet) {
  planet.type = 'redStar'; 
  planet.color = '#FF4500';
  planet.glowColor = '#FF6347';
  planet.radius = calculateRadiusForType('redStar', planet.mass);
  planet.maxLifeTime = 1e9;
}
function handleNebulaConsumption(nebula, other, deltaTime) {
    const distance = Math.hypot(nebula.x - other.x, nebula.y - other.y);
    const minDistance = (nebula.radius + other.radius) * 0.8;

    
    if (distance < minDistance) {
        const transferRate = 0.01; 
        const gasTransferRate = 0.03; 

        
        nebula.mass -= transferRate * nebula.mass * deltaTime;
        nebula.radius = calculateRadiusForType(nebula.type, nebula.mass);

        
        other.mass += transferRate * nebula.mass * deltaTime;
        other.radius = calculateRadiusForType(other.type, other.mass);
        other.gasValue = Math.min(100, (other.gasValue || 0) + gasTransferRate * deltaTime * 100);

        
        if (nebula.mass <= 0.1) {
            nebula.markedForRemoval = true;
        }
    }
}
function isVisible(planet) {
    const screenX = (planet.x - camera.x) * camera.zoom + canvas.width / 2;
    const screenY = (planet.y - camera.y) * camera.zoom + canvas.height / 2;
    const radius = planet.radius * camera.zoom;
    
    return (
        screenX + radius > 0 &&
        screenX - radius < canvas.width &&
        screenY + radius > 0 &&
        screenY - radius < canvas.height
    );
}
function transformToCarbonStar(planet) {
    planet.type = 'carbonStar';
    planet.color = '#C70039'; 
    planet.glowColor = '#FF5733'; 
    planet.radius = calculateRadiusForType('carbonStar', planet.mass);
    planet.maxLifeTime = 1e9; 
    planet.age = 0;
    planet.lifeStage = 'carbon-star';
    planet.temperature = 24000;
}
function sanitizeMass(mass) {
    if (!isFinite(mass) || mass === null || mass === undefined || mass <= 0) return 1;
    return mass;
}
function fgpAnimations(deltaTime) {
    const deltaSeconds = deltaTime / 1000;
    const timeFactor = Math.abs(timeScale) * deltaSeconds;

    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];

        
        if (planet.rotationSpeed) {
            planet.rotation += planet.rotationSpeed * timeFactor;
        }

                
        if (isVisible(planet)) {
            
        }

        
        if (planet.type === 'whiteHole' || planet.type === 'quasar') {
            planet.pulseTime = (planet.pulseTime || 0) + timeFactor;
        }

        
        if (planet.type === 'whiteHole' || planet.type === 'quasar') {
            planet.jetAngle = (planet.jetAngle || 0) + 0.05 * timeFactor;
        }
        
        if (planet.type === 'pulsar' || planet.type === 'quarkStar') {
            
            if (planet.jetRotationSpeed === undefined) {
                
                planet.jetRotationSpeed = (planet.type === 'pulsar') ? 1.0 : 1.5;
            }
            
            
            const speedFactor = Math.max(1, Math.abs(timeScale) * 50);
            
            
            planet.jetAngle += planet.jetRotationSpeed * speedFactor * timeFactor;
            
            
            if (planet.jetAngle > Math.PI * 2) {
                planet.jetAngle -= Math.PI * 2;
            }
        }

            

        if (planet.type === 'quarkStar') {
            
            if (planet.jetRotationSpeed === undefined) {
                planet.jetRotationSpeed = 3.5;
            }
            
            
            const speedFactor = 1 + Math.log10(Math.max(1, Math.abs(timeScale)));
            planet.jetAngle += planet.jetRotationSpeed * speedFactor * timeFactor * (deltaTime / 16.67);
            
            
            planet.jetAngle %= Math.PI * 2;
            
            
            planet.fieldDistortion = (planet.fieldDistortion || 0) + 0.02 * timeFactor;
        }
    }
}
function drawGravitationalLens(radius, type = 'attractive', strength = 1) {
    const lensRadius = radius * (type === 'attractive' ? 2.5 : 3.0);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, lensRadius);
    
    if (type === 'attractive') {
        
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(0.6, 'rgba(50, 50, 50, 0.4)');
        gradient.addColorStop(0.8, 'rgba(100, 100, 100, 0.2)');
        gradient.addColorStop(1, 'rgba(150, 150, 150, 0)');
    } else {
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.6, 'rgba(200, 220, 255, 0.4)');
        gradient.addColorStop(0.8, 'rgba(150, 200, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
    }
    
    ctx.beginPath();
    ctx.arc(0, 0, lensRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    
    if (strength > 0.7 && graphicsQuality === 'high') {
        ctx.strokeStyle = type === 'attractive' 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 3; i++) {
            const waveRadius = lensRadius * (1.1 + i * 0.2);
            const distortion = Math.sin(Date.now() * 0.001 + i) * 0.1 * strength;
            
            ctx.beginPath();
            for (let a = 0; a < Math.PI * 2; a += 0.1) {
                const r = waveRadius * (1 + Math.sin(a * 10) * distortion);
                ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
}
function generateExoticName() {
    const prefixes = ['Crystalline', 'Magnetic', 'Radioative', 'Vibrational', 'Quantum'];
    const cores = ['Cerium', 'Zirconium', 'Tantalum', 'Ruthenium', 'Hafnium'];
    const suffixes = ['-X', '-Ω', '-Δ', '-Σ', '-Φ'];
    
    return `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${cores[Math.floor(Math.random()*cores.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
}
function transformToComet(planet) {
    planet.type = 'comet';
    planet.color = '#3498db';
    planet.radius = calculateRadiusForType('comet', planet.mass);
    planet.originalClass = 'Commom Comet';
    planet.planetClass = 'Commom Comet';
    planet.waterValue = 70;
    planet.gasValue = 30;
    planet.cloudsValue = 0;
}
function generateExoticPlanetoidName() {
    const prefixes = ['Crystalline', 'Magnetic', 'Radioative', 'Vibrational', 'Quantum'];
    const cores = ['Cerium', 'Zirconium', 'Tantalum', 'Ruthenium', 'Hafnium'];
    const suffixes = ['-X', '-Ω', '-Δ', '-Σ', '-Φ'];
    
    return `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${cores[Math.floor(Math.random()*cores.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
}
function generateExoticGasGiantName() {
    const prefixes = ['Plasma', 'Crystalline', 'Magnetic', 'Radioative', 'Vibrational'];
    const cores = ['Neptuno', 'Jupiterian', 'Saturnian', 'Uranian', 'Hydrogenic'];
    const suffixes = ['-Ω', '-Δ', '-Σ', '-Φ', '-Ψ'];
    
    return `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${cores[Math.floor(Math.random()*cores.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
}
function mergeAstroms(a, b) {
    const survivor = a.mass >= b.mass ? a : b;
    const absorber = a.mass >= b.mass ? a : b;
    
    
    survivor.mass += absorber.mass;
    survivor.radius = calculateRadiusForType(survivor.type, survivor.mass);
    survivor.waterValue = Math.max(0, Math.min(100, 
        (survivor.waterValue || 0) * (survivor.mass / (survivor.mass + absorber.mass)) +
        (absorber.waterValue || 0) * (absorber.mass / (survivor.mass + absorber.mass))
    ));
    
    absorber.markedForRemoval = true;
    return survivor;
}
function calculateLuminosity(planet) {
    
    const solarMass = 1e30; 
    const massRatio = planet.mass / solarMass;
    
    
    switch(planet.type) {
        case 'redDwarf':
            return Math.pow(massRatio, 3.5) * 0.01; 
        case 'giantStar':
            return Math.pow(massRatio, 3.5) * 1000; 
        case 'quasar':
            return 1e6; 
        default:
            return Math.pow(massRatio, 3.5); 
    }
}
function generateExoticMeteoriteName() {
    const prefixes = ['Metalic', 'Exotic', 'Quantum'];
    const cores = ['Iridium', 'Osmium', 'Platin'];
    const suffixes = ['-Φ', '-Σ', '-Ψ'];
    
    return `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${cores[Math.floor(Math.random()*cores.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
}

try {
    
} catch (error) {
    astroLogger.logError('fgpPhysics', error);
}

window.addEventListener('load', init);
window.saveUniverseData = function() {
    

    unlockAchievement(32);
    return {
        planets: planets,
        universeAge: universeAge,
        universeTime: universeTime,
        
    };

};

function saveUniverse() {
    const name = prompt("Nome do universo:");
    if (name && name.toLowerCase() === 'nome') {
        unlockAchievement(41);
    }
    
}

window.loadUniverseData = function(data) {
    
    if (!data) return;
    planets = data.planets || [];
    universeAge = data.universeAge || 0;
    universeTime = data.universeTime || 0;
    
    
    
};


let warningCount = 0;

function handleWarningClick() {
    warningCount += 1;
    console.log('agora são ' + warningCount);
    
    if (warningCount >= 10) {
        unlockAchievement(35);
        
        document.getElementById('btnWarnings').removeEventListener('click', handleWarningClick);
    }
}

document.getElementById('btnWarnings').addEventListener('click', handleWarningClick);

console.log ('agora são ' + warnigCount);

document.getElementById('btnDeleteAstro').onclick = () => {
    unlockAchievement(6);
}
        
        const achievements = [
          { id: 1, name: "O Básico", desc: "Conclua o tutorial pela primeira vez.", img: "../assets/img/achv-tutorial.png" },
          { id: 2, name: "A Colisão!!", desc: "Colida seus 2 primeiros astros.", img: "../assets/img/achv-collision.png" },
          { id: 3, name: "Um Núcleo quente..", desc: "Evolua poeira espacial para meteoroide.", img: "../assets/img/achv-meteoroide.png" },
          { id: 4, name: "Pegando FOGO!", desc: "Algum astro passou de 99°C de temperatura.", img: "../assets/img/achv-fire.png" },
          { id: 5, name: "A Vida está vivendo!", desc: "Planeta rochoso com classe Habitável, Temperado ou Tundra.", img: "../assets/img/achv-life.png" },
          { id: 6, name: "NÃO FAÇA ISSO! SEU MONSTRO!", desc: "Deletou um Atro..", img: "../assets/img/achv-monster.png" },
          { id: 7, name: "O Exigente..", desc: "Planeta rochoso habitável pela primeira vez.", img: "../assets/img/achv-demanding.png" },
          { id: 8, name: "O Verdadeiro Farol Cósmico!", desc: "Colocou um Pulsar pela primeira vez.", img: "../assets/img/achv-pulsar.png" },
          { id: 9, name: "Física Reversa", desc: "Criou um buraco branco pela primeira vez.", img: "../assets/img/achv-whitehole.png" },
          { id: 10, name: "Quebra na física", desc: "Criou um buraco negro pela primeira vez.", img: "../assets/img/achv-blackhole.png" },
          { id: 11, name: "Isso Parece estranho..", desc: "Criou uma estrela estranha pela primeira vez.", img: "../assets/img/achv-strangestar.png" },
          { id: 12, name: "Dançe comigo!", desc: "Fundiu estrelas de neutrôns em pulsar.", img: "../assets/img/achv-dance.png" },
          { id: 13, name: "O verdadeiro show!", desc: "5 pulsares no mapa pela primeira vez.", img: "../assets/img/achv-show.png" },
          { id: 14, name: "Tão pequeno..", desc: "Criou um Planetoide pela primeira vez.", img: "../assets/img/achv-planetoid.png" },
          { id: 15, name: "A Luz Do Cosmos", desc: "Criou um quasar pela primeira vez.", img: "../assets/img/achv-risk.png" },
          { id: 16, name: "O Colossal!!", desc: "Quasar com mais de 9.99e+78 de massa.", img: "../assets/img/achv-colossal.png" },
          { id: 17, name: "Big Bang?", desc: "Buraco branco com mais de 1e+21 de massa.", img: "../assets/img/achv-bigbang.png" },
          { id: 18, name: "Portal Cósmico", desc: "Criou um buraco de minhoca.", img: "../assets/img/achv-wormhole.png" },
          { id: 19, name: "Maior que a Tarântula!", desc: "Nebulosa com mais de 5e+16 de massa.", img: "../assets/img/achv-nebula.png" },
          { id: 20, name: "Um Grande Sistema!", desc: "Chegou a 20 astros no jogo.", img: "../assets/img/achv-system20.png" },
          { id: 21, name: "Uma Pequena Galáxia", desc: "Chegou a 100 astros no jogo.", img: "../assets/img/achv-galaxy100.png" },
          { id: 22, name: "A Galáxia!", desc: "Chegou a 500 astros no jogo.", img: "../assets/img/achv-galaxy500.png" },
          { id: 23, name: "Um Novo Universo!", desc: "Chegou a 1000 astros no jogo.", img: "../assets/img/achv-universe1000.png" },
          { id: 24, name: "Um Universo de crashar...", desc: "Passou de 10000 astros no jogo.", img: "../assets/img/achv-crash.png" },
          { id: 25, name: "A Queda...", desc: "Planeta colidiu com um asteroide.", img: "../assets/img/achv-extinction.png" },
          { id: 26, name: "Seja bem vindo mais uma vez!", desc: "Entrou no jogo pela segunda vez.", img: "../assets/img/achv-welcome2.png" },
          { id: 27, name: "Missão Impossível.", desc: "Quasar colidiu com buraco branco.", img: "../assets/img/achv-impossible.png" },
          { id: 28, name: "chernobyl cósmico.", desc: "Chegou a 500 radiações.", img: "../assets/img/achv-chernobyl.png" },
          { id: 29, name: "Vai comer poeira!", desc: "Criou 1000 poeiras espaciais.", img: "../assets/img/achv-dust.png" },
          { id: 30, name: "O Último suspiro..", desc: "Criou uma estrela anã negra.", img: "../assets/img/achv-blackdwarf.png" },
          { id: 31, name: "Congelado.", desc: "Parou o tempo (0x) no menu do universo.", img: "../assets/img/achv-frozen.png" },
          { id: 32, name: "Calma ele não vai fugir.", desc: "Salvou o universo pela primeira vez.", img: "../assets/img/achv-save.png" },
          { id: 33, name: "0 Absoluto!", desc: "Faça o extremo Planeta Rochoso de -270c", img: "../assets/img/achv-absolutezero.png" },
          { id: 34, name: "O Diferentão", desc: "Planeta de classe Exotic pela primeira vez.", img: "../assets/img/achv-exotic.png" },
          { id: 35, name: "Já viu o aviso?", desc: "Você é um verdadeiro detetive! clicou por mais de 10 vezes no botão de avisos.", img: "../assets/img/achv-warning.png" },
          { id: 36, name: "A Endrenagem louca", desc: "Clicou 5 vezes no ⚙️ do menu de opções.", img: "../assets/img/achv-cogbug.png" },
          { id: 37, name: "Frio Demais..", desc: "O Gigante Gasoso frio.", img: "../assets/img/achv-5min.png" },
          { id: 38, name: "É Colorido feito Arco Íris.", desc: "Aconteceu uma supernova!", img: "../assets/img/achv-1h.png" },
          { id: 39, name: "O Pequenino, Sem tempo, evaporou..", desc: "Buraco branco evaporou.", img: "../assets/img/achv-1d.png" },
          { id: 40, name: "Easter egg 4444", desc: "Clicou com o direito no T Singularity do chat.", img: "../assets/img/achv-easter4444.png" },
          { id: 41, name: "?????", desc: "O INCRÍVEL MULTELEMENTAL!!!! O Planeta Gasoso dos 100% elementos...", img: "../assets/img/achv-gasoso.png" },
          { id: 42, name: "Comentando Igual a um Cometa!", desc: "Alterou a descrição do cometa no painel de edição.", img: "../assets/img/achv-cometdesc.png" },
          { id: 43, name: "SACRIFÍCIO!!", desc: "Pulsar colidiu com buraco negro.", img: "../assets/img/achv-sacrifice.png" },
          { id: 44, name: "OLHA! UM ESPAÇO DIFERENTE!", desc: "Alterou a cor do espaço pela primeira vez.", img: "../assets/img/achv-spacecolor.png" },
          { id: 45, name: "O Exterminador..", desc: "F de respeito.. Clicou a tecla 'F' 20 vezes.", img: "../assets/img/achv-exterminator.png" },
          { id: 46, name: "Na velocidade da Luz!", desc: "Selecionou o Modo Ultra rápido (10000x).", img: "../assets/img/achv-ultrafast.png" },
          { id: 47, name: "Ao Infinito e Impossível!", desc: "Parabéns.. você tem o cargo supremo de maior viajante Espacial.. jogou por 1 hora no total..", img: "../assets/img/achv-infinite.png" },
          { id: 48, name: "Olha! ele se mexeu!", desc: "Clicou em WASD pela primeira vez.", img: "../assets/img/achv-wasd.png" },
          { id: 49, name: "Mudou de nome olha!", desc: "Mudou o nome de algum astro.", img: "../assets/img/achv-rename.png" },
          { id: 50, name: ":)", desc: "Concluiu todas as outras 49 conquistas.", img: "../assets/img/achv-all.png" },
          { id: 0, name: "Em Breve pode ter mais conquistas..", desc: "", img: "" },
        ];
       
        let achievementsState = JSON.parse(localStorage.getItem('siu2d_achievements') || '{}');
        function renderAchievementsList() {
          const list = document.getElementById('achievementsList');
          list.innerHTML = '';
          achievements.forEach(a => {
            const unlocked = achievementsState[a.id];
            const card = document.createElement('div');
            card.className = 'achievement-card' + (unlocked ? '' : ' locked');
            card.innerHTML = `
              <div class="achievement-img">
                ${unlocked ? `<img src="${a.img}" alt="${a.name}" style="width:100%;height:100%;">` : `<span class="locked-icon">?</span>`}
              </div>
              <div>
                <div class="achievement-title">${a.name}</div>
                <div class="achievement-desc">${unlocked ? a.desc : ''}</div>
              </div>
            `;
            list.appendChild(card);
          });
        }
        
        const btnAchievements = document.getElementById('btnAchievements');
        const achievementsSidebar = document.getElementById('achievementsSidebar');
        const closeAchievementsBtn = document.getElementById('closeAchievementsBtn');
        if (btnAchievements && achievementsSidebar) {
          btnAchievements.onclick = () => {
            achievementsSidebar.style.display = '';
            setTimeout(() => achievementsSidebar.classList.add('open'), 10);
            renderAchievementsList();
            document.body.style.overflow = 'hidden';
          };
        }
        if (closeAchievementsBtn && achievementsSidebar) {
          closeAchievementsBtn.onclick = () => {
            achievementsSidebar.classList.remove('open');
            setTimeout(() => {
              achievementsSidebar.style.display = 'none';
              document.body.style.overflow = '';
            }, 300);
          };
        }
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && achievementsSidebar.style.display !== 'none') {
            achievementsSidebar.classList.remove('open');
            setTimeout(() => {
              achievementsSidebar.style.display = 'none';
              document.body.style.overflow = '';
            }, 300);
          }
        });
        
        function showAchievementNotification(id) {
        const a = achievements.find(x => x.id === id);
        if (!a) return;
        
        const notif = document.getElementById('achievementNotification');
        notif.innerHTML = `<img src="${a.img}" alt="${a.name}"> <span>Achievement Unlocked :D <b>${a.name}</b></span>`;
        
        notif.classList.remove('show');
        void notif.offsetWidth;
        
        notif.style.display = 'flex';
        notif.classList.add('show');
        
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => {
            notif.style.display = 'none';
            }, 700);
        }, 3500);
        }
        
        function unlockAchievement(id) {
        if (achievementsState[id]) return; 
        achievementsState[id] = true;
        localStorage.setItem('siu2d_achievements', JSON.stringify(achievementsState));
        renderAchievementsList();
        showAchievementNotification(id);
        
        if (id !== 50) {
            const allUnlocked = Object.keys(achievementsState).length >= 49;
            if (allUnlocked) unlockAchievement(50);
        }
    }

        document.getElementById('btn10000x').onclick = () => {
            unlockAchievement(46);
        }    
        document.getElementById('timeStop').onclick = () => {
            unlockAchievement(31);
        }
        document.getElementById('editName').onclick = () => {
            unlockAchievement(49);
        }
        document.getElementById('spaceColor').onclick = () => {
            unlockAchievement(44);
        }
function checkRadiationCount() {
    const radiationCount = planets.filter(p => p.type === 'radiation').length;
    if (radiationCount >= 500) unlockAchievement(28);
}
let settingsClickCount = 0;
crazy.addEventListener('click', () => {
    settingsClickCount++;
    if (settingsClickCount >= 5) unlockAchievement(36);
});
document.getElementById('crazy').addEventListener('click', function() {
    
    let crazyClicks = parseInt(localStorage.getItem('crazyClicks') || '0');
    crazyClicks++;
    localStorage.setItem('crazyClicks', crazyClicks.toString());
    
    
    if (crazyClicks >= 5) {
        unlockAchievement(36);
        
        
        this.style.transition = 'all 1s';
        this.style.transform = 'rotate(360deg) scale(1.5)';
        this.style.color = '#ff00ff';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.color = '';
        }, 1000);
    }
});

function resetAchievements() {
  if (!confirm("Tem certeza que deseja resetar TODAS as suas conquistas?\nIsso não pode ser desfeito!")) return;
  
  achievementsState = {};
  localStorage.setItem('siu2d_achievements', JSON.stringify(achievementsState));
  renderAchievementsList();
  
  const btn = document.getElementById('btnResetAchievements');
  btn.style.background = 'linear-gradient(to bottom, #00cc00, #008800)';
  btn.innerHTML = '<i class="fas fa-check"></i> Resetadas!';
  
  setTimeout(() => {
    btn.style.background = 'linear-gradient(to bottom, #ff4444, #cc0000)';
    btn.innerHTML = '<i class="fas fa-trash-alt"></i> Resetar';
  }, 2000);
}

let minutos = 60;
let segundos = 0;

const contagem = setInterval(() => {
  segundos--;
  
  if (segundos < 0) {
    minutos--;
    segundos = 59;
  }
  
  if (minutos === 0 && segundos === 0) {
    clearInterval(contagem);
    unlockAchievement(47);
    console.log('Parabéns! Você alcançou o tempo máximo de jogo!');
  }
}, 1000);
//#endregion


//#region  My Coments
    //  ¯\_(ツ)_/¯ //
    //Please let
    //  us know if there 
    // is any error
    //  in the game.
    //Thank for gaming :D
//  FGP WORKS  // BRASIL //
//#endregion