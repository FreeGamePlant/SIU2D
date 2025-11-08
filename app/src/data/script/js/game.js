//#region game.js
//#region const
const TitleGame = ('SIUD2D');
console.log('SEJA BEM VINDO AO ' + TitleGame)
console.log('Todos Os direitos reservados da FGP.')
const canvas = document.getElementById('gameCanvas');
const versionGame = ('0.0.0=ALPHA');
const ctx = canvas.getContext('2d');
let _fgp_pixelBuffer = null;
let _fgp_pixelBufferCtx = null;
let _fgp_pixelScale = parseInt(localStorage.getItem('siu2d_pixel_mode_scale') || '4', 10) || 4;
function _fgp_ensurePixelBuffer() {
    if (!_fgp_pixelBuffer) {
        _fgp_pixelBuffer = document.createElement('canvas');
        _fgp_pixelBufferCtx = _fgp_pixelBuffer.getContext('2d');
    }
    const w = Math.max(1, Math.floor(canvas.width / _fgp_pixelScale));
    const h = Math.max(1, Math.floor(canvas.height / _fgp_pixelScale));
    if (_fgp_pixelBuffer.width !== w || _fgp_pixelBuffer.height !== h) {
        _fgp_pixelBuffer.width = w;
        _fgp_pixelBuffer.height = h;
    }
    try { _fgp_pixelBufferCtx.imageSmoothingEnabled = false; } catch (e) {  }
}
function _fgp_applyPixelPostprocess() {
    try {
        if (!document.body.classList.contains('pixel-mode')) return;
        _fgp_ensurePixelBuffer();
        _fgp_pixelBufferCtx.clearRect(0, 0, _fgp_pixelBuffer.width, _fgp_pixelBuffer.height);
        _fgp_pixelBufferCtx.drawImage(canvas, 0, 0, _fgp_pixelBuffer.width, _fgp_pixelBuffer.height);
        ctx.save();
        try { ctx.imageSmoothingEnabled = false; } catch (e) {  }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(_fgp_pixelBuffer, 0, 0, canvas.width, canvas.height);
        ctx.restore();
    } catch (err) {
        console.warn('Pixel postprocess failed:', err);
    }
}
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
    '../assets/audio/SIU2D_soundtrack1.mp3',
    '../assets/audio/SIU2D_soundtrack2.mp3',
];
const musicInterval = 30000; 
const MAX_ASTROS_RETIRADA = 600;
const btnLock = document.getElementById('btnLock');
const DEBUG_EVOLUTION = true;
const NITRIC_STAR_PRICE = 20000;
const ADMOB_APP_ID = 'ca-app-pub-3391757604945167~6359035577';
const ADMOB_REWARD_AD_ID = 'ca-app-pub-3391757604945167/9927294235';
const isNewAdAccount = true;
const achievementRewards = {
    1: 100,
    2: 150,
    3: 200,
    4: 250,
    5: 300,
    6: 100, 
    7: 400,
    8: 500,    
    9: 600,    
    10: 700,   
    11: 800,   
    12: 900,   
    13: 1000,  
    14: 350,   
    15: 1200,
    16: 1500,  
    17: 1200,  
    18: 800,   
    19: 1100,  
    20: 400,   
    21: 600, 
    22: 800,   
    23: 1000,  
    24: 1200,  
    25: 300,   
    26: 200,   
    27: 2000,  
    28: 900, 
    29: 700,   
    30: 1300,  
    31: 400,   
    32: 300,   
    33: 800,   
    34: 1100,  
    35: 500,
    36: 400,   
    37: 600,   
    38: 1200,  
    39: 900,   
    40: 700,   
    41: 2000,  
    42: 400,   
    43: 1800,
    44: 300,   
    45: 500,   
    46: 800,   
    47: 2500,  
    48: 200,
    49: 300,
    50: 5000,  
    51: 400,
    52: 450,
    53: 500,
    54: 600,
    55: 700,
    0: 0       
};
function debugLog(...args) {
    if (DEBUG_EVOLUTION) {
        console.log(...args);
    }
}
const astroPool = (function() {
    const pool = {};
    const DEFAULT_POOL_SIZE = 1000;
    function initPools() {
        const types = ['spaceDust', 'nebula', 'asteroid', 'rockyPlanet'];
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
//#region let
let customColorEnabled = false;
let gameState = 'menu'; 
let camera = { x: 0, y: 0, zoom: 10 };
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
    planetClass: null,
    biomass: 0,
    lifeChance: 0,
    population: 0,
    intelligentSpecies: ("None"),
    knowledgePoints: 0,
};
let backgroundMusic = null;
let currentTrackIndex = 0;
let musicTimeout = null;
let modoRetirada = false;
let gameStartCount = parseInt(localStorage.getItem('gameStartCount') || '0');
let playTimer = 0;
let playTimerInterval;
let spaceDustCreated = 0;
let spectateMode = false;
let spectatedAstro = null;
let controlMode = false;
let controlledShip = null;
let keys = {};
let isLandscape = window.innerWidth > window.innerHeight;
let orientationWarning = null;
let touchStartTime = 0;
let lastTouchTime = 0;
let touchStartX = 0;
let touchStartY = 0;
let currentTouches = [];
let touchTimeout = null;
let isDragging = false;
let touchMoveThreshold = 10;
let isEditing = false;
let isMenuOpen = false;
let tsCoins = parseInt(localStorage.getItem('tsCoins') || '0');
let hasAgreedToWarnings = localStorage.getItem('hasAgreedToWarnings') === 'true';
let tsCoinsAnimation = null;
let currentDisplayCoins = tsCoins;
let purchasedItems = JSON.parse(localStorage.getItem('siu2d_purchased_items') || '{}');
let funSpaceMode = false;
let funSpaceHue = 0;
let funSpaceSpeed = 0.5;
let currentManualPage = 1;
let sfxVolume = 1;
const totalManualPages = 5;
let medusaExplosionInterval;
let nitricStarUnlocked = false;
let nitricStarsCreated = 0;
let nitricStarPurchased = false;
let rewardAd = null;
let waitForCoinsInterval;
let dayForCoinsInterval;
let admobInitialized = false;
let isAdLoading = false;
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
    backgroundMusic.addEventListener('ended', () => {
        console.log('Música finalizada. Tocando próxima faixa.');
        playNextTrack();
    });
    backgroundMusic.addEventListener('loadedmetadata', () => {
        console.log(`Duração da faixa: ${backgroundMusic.duration} segundos`);
    });
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Erro no áudio:', e);
        console.error('Detalhes:', backgroundMusic.error);
        setTimeout(playNextTrack, 5000);
    });
    currentTrackIndex = -1;
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
function toggleFunSpace() {
    funSpaceMode = !funSpaceMode;
    if (funSpaceMode) {
        showNotification("Fun Space Mode activated - Space colors will cycle smoothly");
    } else {
        showNotification("Fun Space Mode deactivated - Using default space color");
        spaceColor = '#000000';
        document.getElementById('spaceColor').value = '#000000';
    }
    localStorage.setItem('funSpaceMode', funSpaceMode.toString());
}
function fgpSpaceColor() {
    if (!funSpaceMode) {
        spaceColor = document.getElementById('spaceColor').value;
        localStorage.setItem('siu2d_spaceColor', spaceColor);
    }
}
musicVolumeSlider.addEventListener('input', () => {
    const volume = musicVolumeSlider.value;
    musicVolumeValue.textContent = volume;
    backgroundMusic.volume = volume / 100;
    localStorage.setItem('siu2d_musicVolume', volume);
});
function fgpSfxVolume() {
    sfxVolume = sfxVolumeSlider.value / 100;
    sfxVolumeValue.textContent = sfxVolumeSlider.value;
    collisionSounds.forEach(sound => {
        sound.volume = sfxVolume;
    });
    localStorage.setItem('siu2d_sfxVolume', sfxVolumeSlider.value);
}
document.getElementById('modeRetirada').addEventListener('change', function() {
    modoRetirada = this.checked;
    localStorage.setItem('siu2d_modoRetirada', this.checked);
    showNotification(`Withdrawal mode ${modoRetirada ? 'activated' : 'deactivated'}`);
});
function fgpFunSpaceColors(deltaTime) {
    if (!funSpaceMode) return;
    funSpaceHue = (funSpaceHue + funSpaceSpeed * (deltaTime / 1000)) % 360;
    const hue = funSpaceHue;
    const saturation = 80;
    const lightness = 15;
    const h = hue / 60;
    const c = (1 - Math.abs(2 * (lightness/100) - 1)) * (saturation/100);
    const x = c * (1 - Math.abs(h % 2 - 1));
    const m = (lightness/100) - c/2;
    let r, g, b;
    if (h >= 0 && h < 1) { [r, g, b] = [c, x, 0]; }
    else if (h >= 1 && h < 2) { [r, g, b] = [x, c, 0]; }
    else if (h >= 2 && h < 3) { [r, g, b] = [0, c, x]; }
    else if (h >= 3 && h < 4) { [r, g, b] = [0, x, c]; }
    else if (h >= 4 && h < 5) { [r, g, b] = [x, 0, c]; }
    else { [r, g, b] = [c, 0, x]; }
    const toHex = (color) => {
        const hex = Math.round((color + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    spaceColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    document.getElementById('spaceColor').value = spaceColor;
}
function toggleCustomColor() {
    if (!selectedPlanet) return;
    selectedPlanet.ignoreColorChanges = !selectedPlanet.ignoreColorChanges;
    customColorEnabled = selectedPlanet.ignoreColorChanges;
    const btn = document.getElementById('btnCustomColor');
    if (selectedPlanet.ignoreColorChanges) {
        btn.textContent = '🎨 CCOn';
        btn.style.backgroundColor = '#4CAF50';
        showNotification("Custom color enabled - climate colors ignored");
    } else {
        btn.textContent = '🎨 CCA';
        btn.style.backgroundColor = '';
        showNotification("Custom color disabled - following climate colors");
    }
    fgpAstroPreview();
}
function animateTSCoinsChange(targetCoins, duration = 1000) {
    if (tsCoinsAnimation) {
        cancelAnimationFrame(tsCoinsAnimation);
    }
    const startCoins = currentDisplayCoins;
    const coinDifference = targetCoins - startCoins;
    const startTime = performance.now();
    function fgpAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        currentDisplayCoins = Math.floor(startCoins + (coinDifference * easeOutQuart));
        fgpTSCoinsDisplay();
        if (progress < 1) {
            tsCoinsAnimation = requestAnimationFrame(fgpAnimation);
        } else {
            currentDisplayCoins = targetCoins;
            fgpTSCoinsDisplay();
            tsCoinsAnimation = null;
            if (coinDifference > 0) {
                showCoinGainEffect();
            }
        }
    }
    tsCoinsAnimation = requestAnimationFrame(fgpAnimation);
}
function showCoinGainEffect() {
    const tsCoinsDisplay = document.getElementById('tsCoinsDisplay');
    if (tsCoinsDisplay) {
        tsCoinsDisplay.style.transform = 'scale(1.1)';
        tsCoinsDisplay.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            tsCoinsDisplay.style.transform = 'scale(1)';
        }, 300);
        createCoinParticles();
    }
}
function createCoinParticles() {
    const tsCoinsDisplay = document.getElementById('tsCoinsDisplay');
    if (!tsCoinsDisplay) return;
    const rect = tsCoinsDisplay.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 8; i++) {
        createCoinParticle(centerX, centerY);
    }
}
function createCoinParticle(startX, startY) {
    const particle = document.createElement('div');
    particle.innerHTML = '🪙';
    particle.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        font-size: 16px;
        pointer-events: none;
        z-index: 10000;
        opacity: 1;
        transition: all 0.8s ease-out;
    `;
    document.body.appendChild(particle);
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 80;
    const targetX = startX + Math.cos(angle) * distance;
    const targetY = startY + Math.sin(angle) * distance;
    setTimeout(() => {
        particle.style.left = `${targetX}px`;
        particle.style.top = `${targetY}px`;
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0.5) rotate(360deg)';
    }, 10);
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}
function fgpTSCoinsDisplay() {
    const tsCoinsValue = document.getElementById('tsCoinsValue');
    if (tsCoinsValue) {
        tsCoinsValue.textContent = currentDisplayCoins.toLocaleString();
        if (parseInt(tsCoinsValue.dataset.lastValue || '0') !== currentDisplayCoins) {
            tsCoinsValue.style.color = '#ffd700';
            tsCoinsValue.style.transform = 'scale(1.1)';
            tsCoinsValue.style.transition = 'all 0.2s ease';
            setTimeout(() => {
                tsCoinsValue.style.color = '#8b6914';
                tsCoinsValue.style.transform = 'scale(1)';
            }, 200);
            tsCoinsValue.dataset.lastValue = currentDisplayCoins;
        }
    }
}
function addTSCoins(amount) {
    const oldCoins = tsCoins;
    tsCoins += amount;
    localStorage.setItem('tsCoins', tsCoins.toString());
    animateTSCoinsChange(tsCoins, Math.min(1000, Math.abs(amount) * 50));
    if (amount >= 1000) {
        unlockAchievement(48); 
    }
}
function spendTSCoins(amount) {
    if (tsCoins >= amount) {
        const oldCoins = tsCoins;
        tsCoins -= amount;
        localStorage.setItem('tsCoins', tsCoins.toString());
        animateTSCoinsChange(tsCoins, 800);
        return true;
    } else {
        showNotification("Ops.. - TSCs.");
        const tsCoinsDisplay = document.getElementById('tsCoinsDisplay');
        if (tsCoinsDisplay) {
            tsCoinsDisplay.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                tsCoinsDisplay.style.animation = '';
            }, 500);
        }
        return false;
    }
}
function toggleControlMode() {
    if (!selectedPlanet) {
        showNotification("Select a spaceship, rocket or super ship to control!");
        return;
    }
    const controllableTypes = ['spaceship', 'rocket', 'superShip'];
    if (!controllableTypes.includes(selectedPlanet.type)) {
        showNotification("Only spaceships, rockets and super ships can be controlled!");
        return;
    }
    controlMode = !controlMode;
    if (controlMode) {
        controlledShip = selectedPlanet;
        btnControl.style.backgroundColor = '#4CAF50';
        showNotification(`Controlling ${controlledShip.name}. Use WASD to move. Press B to stop.`);
        if (spectateMode) {
            toggleSpectateMode();
        }
    } else {
        controlledShip = null;
        btnControl.style.backgroundColor = '';
        showNotification("Control mode deactivated.");
    }
}
function playNextTrack() {
    if (!backgroundMusic) return;
    backgroundMusic.pause();
    backgroundMusic.src = '';
    backgroundMusic.load();
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    backgroundMusic.src = musicTracks[currentTrackIndex];
    backgroundMusic.volume = document.getElementById('musicVolumeSlider').value / 100;
    console.log(`Tocando faixa ${currentTrackIndex + 1}/${musicTracks.length}: ${musicTracks[currentTrackIndex]}`);
    const playPromise = backgroundMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Reprodução bloqueada:", error);
            document.addEventListener('click', () => {
                backgroundMusic.play().catch(e => console.log("Erro ao reproduzir:", e));
            }, { once: true });
        });
    }
    if (musicTimeout) {
        clearTimeout(musicTimeout);
    }
    backgroundMusic.addEventListener('loadeddata', function onLoaded() {
        backgroundMusic.removeEventListener('loadeddata', onLoaded);
        musicTimeout = setTimeout(() => {
            playNextTrack();
        }, backgroundMusic.duration * 1000 + 1000);
    }, { once: true });
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Erro no áudio:', e);
        console.error('Detalhes:', backgroundMusic.error);
        if (musicTimeout) {
            clearTimeout(musicTimeout);
        }
        musicTimeout = setTimeout(playNextTrack, 30000);
    });
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
function initAdSystem() {
    updateAdButtonState();
    window.addEventListener('online', () => {
        updateAdButtonState();
    });
    window.addEventListener('offline', () => {
        updateAdButtonState();
    });
}
function showAdDebugInfo() {
    const info = `
AdMob Initialized: ${admobInitialized}
Ad Loading: ${isAdLoading}
Online: ${navigator.onLine}
Ad Loaded: ${rewardAd && rewardAd.isLoaded ? rewardAd.isLoaded() : false}
Ads Watched: ${localStorage.getItem('adsWatched') || 0}
    `;
    console.log('📊 Ad Debug Info:', info);
    showNotification(info, 5000);
}
function updateAdButtonState() {
    const adCard = document.querySelector('#shopSection_givetscoins .shop-item');
    const adStatus = document.getElementById('adStatus');
    if (adCard && adStatus) {
        if (!navigator.onLine) {
            adCard.style.opacity = '0.6';
            adCard.style.cursor = 'not-allowed';
            adCard.title = "Conecte-se à internet para assistir anúncios";
            adStatus.textContent = "❌ Offline";
            adStatus.style.color = '#f44336';
        } else {
            adCard.style.opacity = '1';
            adCard.style.cursor = 'pointer';
            adCard.title = "Assistir anúncio por 1000 TS Coins";
            adStatus.textContent = "✅ Disponível";
            adStatus.style.color = '#4CAF50';
        }
    }
}
function init() {
    resizeCanvas();
    try {
        const pixelEnabled = localStorage.getItem('siu2d_pixel_mode_enabled') === 'true';
        if (pixelEnabled) {
            document.body.classList.add('pixel-mode');
            try { canvas.style.imageRendering = 'pixelated'; } catch (e) {  }
        } else {
            document.body.classList.remove('pixel-mode');
            try { canvas.style.imageRendering = 'auto'; } catch (e) {  }
        }
    } catch (e) {
        console.warn('Could not apply pixel-mode preference:', e);
    }
    initBackgroundMusic();
    document.getElementById('modeRetirada').addEventListener('change', function() {
    modoRetirada = this.checked;
    showNotification(`Withdrawal mode ${modoRetirada ? 'activated' : 'deactivated'}`);
});
    fgpTSCoinsDisplay();
    setTimeout(() => {
        animateTSCoinsChange(tsCoins, 1500);
    }, 1000);
    const tsCoinsDisplay = document.getElementById('tsCoinsDisplay');
    if (tsCoinsDisplay) {
        tsCoinsDisplay.addEventListener('click', () => {
            tsCoinsDisplay.classList.add('ts-coins-pulse');
            setTimeout(() => {
                tsCoinsDisplay.classList.remove('ts-coins-pulse');
            }, 500);
        });
    }
    const cancelBtn = document.getElementById('cancelCreationBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', deactivateCreationMode);
    }
    funSpaceMode = localStorage.getItem('funSpaceMode') === 'true';
    document.getElementById('funSpaceToggle').checked = funSpaceMode;
    document.getElementById('funSpaceToggle').addEventListener('change', toggleFunSpace);
    if (funSpaceMode) {
        funSpaceHue = Math.random() * 360;
    }
    initializeShop();
    Object.keys(purchasedItems).forEach(itemId => {
        if (purchasedItems[itemId]) {
            applyPurchasedItem(itemId);
        }
    });
    fgpCreationGrid();
    const btnResetEverythingDev = document.getElementById('btnResetEverythingDev');
    if (btnResetEverythingDev) {
        btnResetEverythingDev.addEventListener('click', resetEverythingDev);
    }
    const sfxVolumeSlider = document.getElementById('sfxVolumeSlider');
    const sfxVolumeValue = document.getElementById('sfxVolumeValue');
    if (sfxVolumeSlider && sfxVolumeValue) {
        sfxVolume = sfxVolumeSlider.value / 100;
        sfxVolumeValue.textContent = sfxVolumeSlider.value;
        sfxVolumeSlider.addEventListener('input', fgpSfxVolume);
    }
    function fgpSfxVolume() {
        sfxVolume = sfxVolumeSlider.value / 100;
        sfxVolumeValue.textContent = sfxVolumeSlider.value;
        collisionSounds.forEach(sound => {
            sound.volume = sfxVolume;
        });
    }
    window.updateShopDisplay = function() {
        console.log('updateShopDisplay called');
        initializeMedusaStar();
        fgpShopDisplay();
        try {
            const lastTab = sessionStorage.getItem('siu2d_shop_tab') || 'astros';
            if (typeof switchShopTab === 'function') {
                switchShopTab(lastTab);
            }
        } catch (e) {
            console.warn('Could not restore shop tab', e);
        }
    };
        const savedSpaceColor = localStorage.getItem('siu2d_spaceColor');
    if (savedSpaceColor) {
        spaceColor = savedSpaceColor;
        document.getElementById('spaceColor').value = savedSpaceColor;
    }
    const savedMusicVolume = localStorage.getItem('siu2d_musicVolume');
    if (savedMusicVolume && musicVolumeSlider) {
        musicVolumeSlider.value = savedMusicVolume;
        musicVolumeValue.textContent = savedMusicVolume;
    }
    const savedSfxVolume = localStorage.getItem('siu2d_sfxVolume');
    if (savedSfxVolume && sfxVolumeSlider) {
        sfxVolumeSlider.value = savedSfxVolume;
        sfxVolumeValue.textContent = savedSfxVolume;
        sfxVolume = savedSfxVolume / 100;
    }
    const savedModoRetirada = localStorage.getItem('siu2d_modoRetirada');
    if (savedModoRetirada !== null) {
        modoRetirada = savedModoRetirada === 'true';
        document.getElementById('modeRetirada').checked = modoRetirada;
    }
    console.log('Google object:', typeof google);
    if (typeof google === 'undefined') {
        console.log('Tentando carregar SDK manualmente...');
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-app-pub-3391757604945167~6359035577';
        script.crossOrigin = 'anonymous';
        script.async = true;
        script.onload = () => console.log('✅ SDK carregado manualmente');
        script.onerror = () => console.error('❌ Falha ao carregar SDK manualmente');
        document.head.appendChild(script);
    }
    setTimeout(() => {
        initializeAdMob();
        updateAdStatus();
    }, 2000);
    initTimers();
    initAdSystem();
    setTimeout(() => {
        if (navigator.onLine) {
            initializeAdMob();
        } else {
            setupAdFallback();
        }
    }, 2000);
    waterSlider.addEventListener('input', fgpWater);
    cloudsSlider.addEventListener('input', fgpClouds);
    gasSlider.addEventListener('input', fgpGas);
    rotationSlider.addEventListener('input', fgpRotation);
    initializeMedusaStar();
    initializeNitricStar();
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);
    canvas.addEventListener('wheel', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    document.getElementById('btnResetAchievements').addEventListener('click', resetAchievements);
    document.getElementById('btnPlay').addEventListener('click', startGame);
    document.getElementById('btnResetUniverse').addEventListener('click', resetUniverse);
    document.getElementById('btnResetCamera').addEventListener('click', resetCamera);
    gameMenuBtn.addEventListener('click', toggleGameMenu);
    closeMenuBtn.addEventListener('click', toggleGameMenu);
    volumeSlider.addEventListener('input', fgpVolume);
    showTempZones.addEventListener('change', toggleTemperatureZones);
    tempSlider.addEventListener('input', fgpTemperature);
    showNames.addEventListener('change', toggleNamesVisibility);
    gravityFactorSlider.value = 100;
    dragFactorSlider.value = 0;
    gravityFactorValue.textContent = 100;
    dragFactorValue.textContent = 0;
    gravityFactor = 1.0;
    dragFactor = 0.0;
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
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        creationMode = card.dataset.type;
        selectedType = creationMode;
        creationModeText.textContent = getTypeName(creationMode);
        creationModeIndicator.style.display = 'block';
        closeGameMenu();
        showNotification(`Creation Mode: ${getTypeName(creationMode)}. Click and drag to set the velocity.`);
    });
});
    document.getElementById('btnCustomColor').addEventListener('click', toggleCustomColor);
    primaryColor.addEventListener('input', fgpAstroPreview);
    secondaryColor.addEventListener('input', fgpAstroPreview);
    ringColor.addEventListener('input', fgpAstroPreview);
    massSlider.addEventListener('input', fgpMass);
    gravitySlider.addEventListener('input', fgpGravity);
    hasRings.addEventListener('change', fgpAstroPreview);
    ringMassSlider.addEventListener('input', fgpRingMass);
    applySettings.addEventListener('click', applyAstroSettings);
    resetSettings.addEventListener('click', resetAstroSettings);
    document.getElementById('btnSpectate').addEventListener('click', toggleSpectateMode);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
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
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    checkOrientation();
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            activateCreationMode(card.dataset.type);
            toggleGameMenu();
            showNotification(`Creation Mode: ${getTypeName(creationMode)}. Click and drag to set the velocity.`);
        });
    });
    creationMode = 'asteroid';
    selectedType = 'asteroid';
    creationModeText.textContent = getTypeName(creationMode);
    creationModeIndicator.style.display = 'block';
    try {
        const firstVisitModal = document.getElementById('firstVisitModal');
        const warningsSidebar = document.getElementById('warningsSidebar');
        const btnDontShowWarnings = document.getElementById('btnDontShowWarnings');
        const dontShowWarningsCheckbox = document.getElementById('dontShowWarningsCheckbox');
        const firstVisitOpenManual = document.getElementById('firstVisitOpenManual');
        const firstVisitContinue = document.getElementById('firstVisitContinue');
        const isFirstVisit = localStorage.getItem('siu2d_first_visit_done') !== 'true';
        const dontShow = localStorage.getItem('siu2d_dont_show_warnings') === 'true';
        if (isFirstVisit && firstVisitModal) {
            firstVisitModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            firstVisitOpenManual?.addEventListener('click', () => {
                firstVisitModal.style.display = 'none';
                document.body.style.overflow = '';
                localStorage.setItem('siu2d_first_visit_done', 'true');
                if (typeof openManual === 'function') {
                    try { openManual(); } catch (err) { console.error('openManual() threw:', err); }
                } else {
                    const manualOverlay = document.getElementById('manualOverlay');
                    if (manualOverlay) {
                        manualOverlay.style.display = 'flex';
                        setTimeout(() => manualOverlay.classList.add('active'), 10);
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
            firstVisitContinue?.addEventListener('click', () => {
                firstVisitModal.style.display = 'none';
                document.body.style.overflow = '';
                localStorage.setItem('siu2d_first_visit_done', 'true');
                if (!dontShow) {
                    warningsSidebar?.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
        btnDontShowWarnings?.addEventListener('click', () => {
            localStorage.setItem('siu2d_dont_show_warnings', 'true');
            if (dontShowWarningsCheckbox) dontShowWarningsCheckbox.checked = true;
            if (warningsSidebar) {
                warningsSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        dontShowWarningsCheckbox?.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('siu2d_dont_show_warnings', 'true');
            } else {
                localStorage.removeItem('siu2d_dont_show_warnings');
            }
        });
    } catch (e) {
        console.error('Error initializing first-visit/warnings logic', e);
    }
    window.showFirstVisitModal = function() {
        const m = document.getElementById('firstVisitModal');
        if (m) {
            m.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('First visit modal opened (debug)');
        } else console.warn('firstVisitModal element not found');
    };
    window.resetFirstVisitPrefs = function() {
        localStorage.removeItem('siu2d_first_visit_done');
        localStorage.removeItem('siu2d_dont_show_warnings');
        console.log('First-visit preferences cleared from localStorage');
    };
}
function closeGameMenu() {
    if (inGameMenu) {
        inGameMenu.classList.remove('active');
        inGameMenu.style.display = 'none';
        isMenuOpen = false;
    }
}
function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(function(error) {
            console.log('O bloqueio de orientação não é suportado: ', error);
        });
    }
}
function checkOrientation() {
    isLandscape = window.innerWidth > window.innerHeight;
    if (!isLandscape) {
        showOrientationWarning();
    } else {
        hideOrientationWarning();
    }
    resizeCanvas();
}
function showOrientationWarning() {
    if (!orientationWarning) {
        orientationWarning = document.createElement('div');
        orientationWarning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            text-align: center;
            z-index: 10000;
            padding: 20px;
        `;
        orientationWarning.innerHTML = '🔄 Recommended that you rotate your device';
        document.body.appendChild(orientationWarning);
    }
}
function hideOrientationWarning() {
    if (orientationWarning) {
        document.body.removeChild(orientationWarning);
        orientationWarning = null;
    }
}
function resizeCanvas() {
  if (window.innerWidth >= 1025) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    if (isLandscape) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } else {
      const maxWidth = Math.min(window.innerWidth, window.innerHeight * 1.5);
      canvas.width = maxWidth;
      canvas.height = maxWidth / 1.5;
    }
  }
  if (gameState === 'playing') {
    fgpInfoPanel();
  }
}
function calculateMovementDirection(obj) {
    if (obj.vx !== 0 || obj.vy !== 0) {
        obj.direction = Math.atan2(obj.vy, obj.vx);
    }
    return obj.direction || 0;
}
function resetUniverse() {
    if (confirm("Are you sure you want to reset the universe? This will remove ALL celestial bodies!")) {
        planets = [];
        selectedPlanet = null;
        universeAge = 0;
        universeTime = 0;
        spaceDustCreated = 0;
        pulsarCount = 0;
        Fcount += 1;
        if (Fcount >= 20) {
            unlockAchievement(45);
        }
        warnigCount = 0;
        Acount = 0;
        showNotification("Universe has been reset!");
        fgpInfoPanel();
    }
}
function resetCamera() {
    camera.x = 0;
    camera.y = 0;
    camera.zoom = 1;
    showNotification("Camera position reset!");
}
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof radius === 'undefined') radius = 5;
    if (typeof radius === 'number') radius = {tl: radius, tr: radius, br: radius, bl: radius};
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}
function drawSatellite(satellite, ctx, screenRadius) {
    const x = (satellite.x - camera.x) * camera.zoom + canvas.width / 2;
    const y = (satellite.y - camera.y) * camera.zoom + canvas.height / 2;
    const radius = (typeof screenRadius === 'number') ? screenRadius : (satellite.radius * camera.zoom);
    if (!isFinite(x) || !isFinite(y) || !isFinite(radius) || radius <= 0) {
            return; 
    }
    if (x + radius < 0 || x - radius > canvas.width || 
        y + radius < 0 || y - radius > canvas.height) {
        return;
    }
    ctx.save();
    ctx.translate(x, y);
    const direction = calculateMovementDirection(satellite);
    ctx.rotate(direction);
    if (satellite.modules && Array.isArray(satellite.modules)) {
        satellite.modules.forEach((mod, idx) => {
            ctx.save();
            ctx.rotate(mod.angle || 0);
            if (mod.type === 'panel') {
                    const w = Math.max(0.6, radius * (0.9 + Math.min(4, mod.size || 1)));
                    const h = Math.max(0.25, radius * 0.35);
                    const gx = radius * 1.05;
                    const gy = -h/2;
                    const grad = ctx.createLinearGradient(gx, gy, gx + w, gy + h);
                    grad.addColorStop(0, '#2aa3ff');
                    grad.addColorStop(0.5, mod.color || '#1f8fff');
                    grad.addColorStop(1, '#063b5a');
                    ctx.fillStyle = grad;
                    roundRect(ctx, radius * 1.05, -h/2, w, h, Math.max(0.5, 0.18 * radius), true, false);
                    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
                    ctx.lineWidth = Math.max(0.4, 0.08 * radius);
                    ctx.strokeRect(radius * 1.05, -h/2, w, h);
            } else if (mod.type === 'antenna') {
                ctx.fillStyle = mod.color || '#999999';
                ctx.beginPath();
                ctx.moveTo(radius * 1.05, 0);
                ctx.lineTo(radius * 1.6, -radius * 0.4);
                ctx.lineTo(radius * 1.6, radius * 0.4);
                ctx.closePath();
                ctx.fill();
            } else if (mod.type === 'dish') {
                ctx.beginPath();
                ctx.arc(radius * 1.2, 0, Math.max(0.3, radius * 0.5), -Math.PI/3, Math.PI/3);
                ctx.fillStyle = mod.color || '#bbbbbb';
                ctx.fill();
                ctx.strokeStyle = '#666';
                ctx.lineWidth = Math.max(0.3, 0.06 * radius);
                ctx.stroke();
            } else if (mod.type === 'radar') {
                ctx.beginPath();
                ctx.rect(radius * 1.05, -radius * 0.25, Math.max(0.4, radius * 0.6), Math.max(0.25, radius * 0.5));
                ctx.fillStyle = mod.color || '#666666';
                ctx.fill();
            }
            ctx.restore();
        });
    }
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.shadowColor = '#222';
    ctx.fillStyle = satellite.color || '#cccccc';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 0.000000005 * camera.zoom;
    ctx.stroke();
    ctx.restore();
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
                'redSupergiant', 'redHypergiant', 'pulsar', 'quarkStar',
                'chronosStar', 'phantomStar', 'vortexStar', 'crystalStar', 'neuralStar',
                'hologramStar', 'quantumFoamStar', 'prismStar', 'echoStar', 'asciiStar',
                'medusaStar', 'nitricStar', 'singularityStar'
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
    if (isSpaceshipType(planet.type)) {
        radius = Math.max(2, (planet.originalRadius || planet.radius) * camera.zoom);
    } else {
        radius = planet.radius * camera.zoom;
    }
    if (!isFinite(radius) || radius <= 0) {
        console.warn(`Invalid Radius For ${planet.type}: ${radius}`);
        return;
    }
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
        let hex = color.replace('#', '');
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        const num = parseInt(hex, 16);
        const amt = Math.round(2.55 * percent);
        let R = (num >> 16) + amt;
        let G = (num >> 8 & 0x00FF) + amt;
        let B = (num & 0x0000FF) + amt;
        R = Math.min(255, Math.max(0, R));
        G = Math.min(255, Math.max(0, G));
        B = Math.min(255, Math.max(0, B));
        const result = (1 << 24) + (R << 16) + (G << 8) + B;
        return `#${result.toString(16).slice(1).toUpperCase()}`;
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
    let drawColor = planet.color;
    let drawGlowColor = planet.glowColor;
    if (planet.petrified) {
        drawColor = '#666666';
        drawGlowColor = '#444444';
    }
  switch(planet.type) {
case 'rocket':
    ctx.save();
    let angleRocket = Math.atan2(planet.vy, planet.vx);
    ctx.rotate(angleRocket);
    ctx.beginPath();
    ctx.moveTo(radius * 1.5, 0);
    ctx.lineTo(-radius * 1.5, -radius);
    ctx.lineTo(-radius * 1.5, radius);
    ctx.closePath();
    ctx.fillStyle = planet.color || '#ff0000';
    ctx.fill();
    drawRocketDetails(planet, ctx, radius);
    ctx.restore();
    break;
case 'spaceship':
    ctx.save();
    const angleShip = Math.atan2(planet.vy, planet.vx);
    ctx.rotate(angleShip);
    ctx.beginPath();
    ctx.moveTo(radius * 1.5, 0);
    ctx.lineTo(-radius * 1.5, -radius);
    ctx.lineTo(-radius * 1.5, radius);
    ctx.closePath();
    ctx.fillStyle = planet.color || '#00ff00';
    ctx.fill();
    drawSpaceshipDetails(planet, ctx, radius);
    ctx.restore();
    break;
case 'satellite':
    ctx.restore();
    drawSatellite(planet, ctx, radius);
    break;
case 'superShip':
    ctx.restore();
    const sX = (planet.x - camera.x) * camera.zoom + canvas.width / 2;
    const sY = (planet.y - camera.y) * camera.zoom + canvas.height / 2;
    ctx.save();
    ctx.translate(sX, sY);
    const superAngle = Math.atan2(planet.vy, planet.vx);
    ctx.rotate(superAngle || 0);
    drawSuperShipDetails(planet, ctx, radius);
    ctx.restore();
    if (planet.originPlanet) {
        const oX = (planet.originPlanet.x - camera.x) * camera.zoom + canvas.width / 2;
        const oY = (planet.originPlanet.y - camera.y) * camera.zoom + canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(sX, sY);
        ctx.strokeStyle = 'rgba(200,255,255,0.08)';
        ctx.lineWidth = Math.max(1, 2 * camera.zoom);
        const midX = sX + (oX - sX) * 0.5;
        const midY = sY + (oY - sY) * 0.5;
        ctx.quadraticCurveTo(midX, midY, oX, oY);
        ctx.stroke();
    }
    break;
case 'spaceDust':
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1, radius), 0, Math.PI * 2);
      ctx.fillStyle = planet.color || '#888888';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
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
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      break;
case 'planetoid':
    if (!planet.craters) {
        planet.craters = [];
        const numCraters = 3 + Math.floor(Math.random() * 6); 
        for (let i = 0; i < numCraters; i++) {
            let x, y, distance;
            do {
                x = (Math.random() - 0.5) * 1.8; 
                y = (Math.random() - 0.5) * 1.8;
                distance = Math.sqrt(x*x + y*y);
            } while (distance > 0.8); 
            planet.craters.push({
                x: x,
                y: y,
                radius: Math.random() * 0.15 + 0.05 
            });
        }
    }
    ctx.rotate((planet.rotation || 0) * visualTimeScale);
    ctx.beginPath();
    const safeRx = Math.max(1, (planet.rx || planet.radius) * camera.zoom);
    const safeRy = Math.max(1, (planet.ry || planet.radius) * camera.zoom);
    ctx.ellipse(0, 0, safeRx, safeRy, 0, 0, Math.PI * 2);
    const safeColor = (color) => {
        return /^#([A-Fa-f0-9]{3}){1,2}$/.test(color) ? color : '#555555';
    };
    const ellipseGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(safeRx, safeRy));
    ellipseGradient.addColorStop(0, safeColor(planet.highlight || lightenColor(planet.color || '#555555', 30)));
    ctx.fillStyle = ellipseGradient;
    ctx.fill();
    const ZOOM_THRESHOLD = 0.5;
    const ZOOM_RECOVERY = 1.0;
    if (camera.zoom > ZOOM_THRESHOLD) {
        let strokeWidth;
        if (camera.zoom >= ZOOM_RECOVERY) {
            strokeWidth = Math.max(0.5, 1 / camera.zoom);
        } else {
            const progress = (camera.zoom - ZOOM_THRESHOLD) / (ZOOM_RECOVERY - ZOOM_THRESHOLD);
            strokeWidth = Math.max(0.1, (1 / camera.zoom) * progress);
        }
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
    planet.craters.forEach(crater => {
        const craterX = crater.x * safeRx;
        const craterY = crater.y * safeRy;
        const craterRadius = crater.radius * Math.min(safeRx, safeRy);
        const maxDistance = Math.min(safeRx, safeRy) - craterRadius;
        const currentDistance = Math.sqrt(craterX*craterX + craterY*craterY);
        if (currentDistance + craterRadius <= Math.min(safeRx, safeRy)) {
            ctx.beginPath();
            ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
            ctx.fill();
            if (camera.zoom > ZOOM_THRESHOLD) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                let craterStrokeWidth;
                if (camera.zoom >= ZOOM_RECOVERY) {
                    craterStrokeWidth = Math.max(0.3, 0.5 / camera.zoom);
                } else {
                    const progress = (camera.zoom - ZOOM_THRESHOLD) / (ZOOM_RECOVERY - ZOOM_THRESHOLD);
                    craterStrokeWidth = Math.max(0.05, (0.5 / camera.zoom) * progress);
                }
                ctx.lineWidth = craterStrokeWidth;
                ctx.stroke();
            }
        }
    });
    break;
case 'rockyPlanet':
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color || '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
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
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2 / radius;
        ctx.stroke();
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
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
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
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
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
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      break;
case 'ttauriStar':
    const ttauriRadius = planet.radius * camera.zoom;
    const ttauriTime = Date.now() * 0.001;
    drawAccretionDisk(
        ttauriRadius * 1.2, 
        ttauriRadius * 224.5, 
        [
            'rgba(255, 215, 0, 0.8)',
            'rgba(255, 165, 0, 0.6)',
            'rgba(255, 69, 0, 0.4)',
            'rgba(139, 0, 0, 0.2)'
        ],
        (planet.rotation || 0) * visualTimeScale,
        planet
    );
    const ttauriPulse = 1 + Math.sin(ttauriTime * 4) * 0.3;
    const ttauriGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, ttauriRadius);
    ttauriGradient.addColorStop(0, '#FFD700');
    ttauriGradient.addColorStop(0.5, '#FF8C00');
    ttauriGradient.addColorStop(1, '#FF4500');
    ctx.beginPath();
    ctx.arc(0, 0, ttauriRadius * ttauriPulse, 0, Math.PI * 2);
    ctx.fillStyle = ttauriGradient;
    ctx.fill();
    const jetCycle = Math.sin(ttauriTime * 1.5);
    if (jetCycle > 0.7) {
        const jetStrength = (jetCycle - 0.7) / 0.3;
        const jetLength = ttauriRadius * 15 * jetStrength;
        const jetWidthStart = ttauriRadius * 0.4 * jetStrength;
        const jetWidthEnd = ttauriRadius * 2.5 * jetStrength;
        ctx.save();
        ctx.rotate(planet.jetAngle || 0);
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: `rgba(255, 255, 255, ${0.8 * jetStrength})` },
            { position: 0.3, color: `rgba(255, 200, 100, ${0.6 * jetStrength})` },
            { position: 0.6, color: `rgba(255, 100, 50, ${0.4 * jetStrength})` },
            { position: 1, color: `rgba(255, 50, 0, 0)` }
        ]);
        ctx.rotate(Math.PI);
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: `rgba(255, 255, 255, ${0.8 * jetStrength})` },
            { position: 0.3, color: `rgba(255, 200, 100, ${0.6 * jetStrength})` },
            { position: 0.6, color: `rgba(255, 100, 50, ${0.4 * jetStrength})` },
            { position: 1, color: `rgba(255, 50, 0, 0)` }
        ]);
        ctx.restore();
        if (Math.random() < 0.1 * jetStrength) {
            generateTtauriDebris(planet);
        }
    }
    const glowPulse = 1 + Math.sin(ttauriTime * 3) * 0.2;
    ctx.beginPath();
    ctx.arc(0, 0, ttauriRadius * 2.5 * glowPulse, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(0, 0, ttauriRadius, 0, 0, ttauriRadius * 2.5);
    glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
    glowGradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fill();
    for (let i = 0; i < 3; i++) {
        const ringSize = ttauriRadius * (1.5 + i * 0.8);
        const ringPulse = Math.sin(ttauriTime * 2 + i) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 165, 0, ${0.4 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
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
            star: { colors: [drawColor, drawGlowColor], scale: 1 },
            redDwarf: { colors: [drawColor, drawGlowColor], scale: 1.2 },
            brownDwarf: { colors: [drawColor, drawGlowColor], scale: 1 },
            whiteDwarf: { colors: [drawColor, drawGlowColor], scale: 0.5 },
            carbonStar: { colors: [drawColor, drawGlowColor], scale: 1 },
            giantStar: { colors: [drawColor, drawGlowColor], scale: 1 },
            hypergiant: { colors: [drawColor, drawGlowColor], scale: 1 },
            massiveStar: { colors: [drawColor, drawGlowColor], scale: 1 },
            strangeStar: { colors: [drawColor, drawGlowColor], scale: 1 },
            redGiant: { colors: [drawColor, drawGlowColor], scale: 2 },
            redSupergiant: { colors: [drawColor, drawGlowColor], scale: 3 },
            redHypergiant: { colors: [drawColor, drawGlowColor], scale: 4 },
            pulsar: { colors: [drawColor, drawGlowColor], scale: 0.3 },
            quarkStar: { colors: [drawColor, drawGlowColor], scale: 0.3 },
            magnetar: { colors: [drawColor, drawGlowColor], scale: 0.3 }
          };
          const config = starConfigs[planet.type] || starConfigs.star;
      const scaledRadius = Math.max(1, radius * config.scale);
      ctx.beginPath();
      ctx.arc(0, 0, scaledRadius, 0, Math.PI * 2);
      const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, scaledRadius);
      starGradient.addColorStop(0, config.colors[0]);
      ctx.fillStyle = starGradient;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
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
    const blackHoleRadius = planet.radius * camera.zoom;
    const blackHoleTime = Date.now() * 0.001;
    drawAccretionDisk(
        blackHoleRadius * 1.5, 
        blackHoleRadius * 4, 
        [
            'rgba(255, 215, 0, 0.9)',
            'rgba(255, 140, 0, 0.7)',
            'rgba(255, 69, 0, 0.5)',
            'rgba(128, 0, 128, 0.3)',
            'rgba(0, 0, 0, 0.1)'
        ],
        (planet.rotation || 0) * visualTimeScale * 2,
        planet
    );
    ctx.beginPath();
    ctx.arc(0, 0, blackHoleRadius, 0, Math.PI * 2);
    const blackHoleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blackHoleRadius);
    blackHoleGradient.addColorStop(0, '#000000');
    blackHoleGradient.addColorStop(0.7, '#1a1a1a');
    blackHoleGradient.addColorStop(1, '#333333');
    ctx.fillStyle = blackHoleGradient;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, blackHoleRadius * 1.05, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();
    drawGravitationalLens(blackHoleRadius, 'attractive', 2.0);
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < 8; i++) {
            const particleAngle = (i / 8) * Math.PI * 2 + blackHoleTime;
            const spiralProgress = (blackHoleTime * 0.5 + i * 0.2) % 1;
            const spiralRadius = blackHoleRadius * (1.5 + spiralProgress * 2.5);
            const x = Math.cos(particleAngle) * spiralRadius;
            const y = Math.sin(particleAngle) * spiralRadius;
            ctx.beginPath();
            ctx.arc(x, y, blackHoleRadius * 0.1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - spiralProgress})`;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
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
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      break;
case 'quasar':
    const quasarRadius = planet.radius * camera.zoom;
    const quasarTime = Date.now() * 0.001;
    drawAccretionDisk(
        quasarRadius * 1.2, 
        quasarRadius * 6, 
        [
            'rgba(255, 255, 0, 0.9)',
            'rgba(255, 215, 0, 0.8)',
            'rgba(255, 140, 0, 0.7)',
            'rgba(255, 69, 0, 0.6)',
            'rgba(128, 0, 128, 0.4)',
            'rgba(0, 0, 0, 0.2)'
        ],
        (planet.rotation || 0) * visualTimeScale * 3,
        planet
    );
    ctx.beginPath();
    ctx.arc(0, 0, quasarRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
    if (graphicsQuality !== 'low' && planet.jets) {
        const jetLength = quasarRadius * 35;
        const jetWidthStart = quasarRadius * 0.3;
        const jetWidthEnd = quasarRadius * 8;
        ctx.save();
        ctx.rotate(planet.jetAngle + (planet.rotation || 0));
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255, 255, 255, 1)' },
            { position: 0.2, color: 'rgba(255, 255, 200, 0.9)' },
            { position: 0.4, color: 'rgba(255, 255, 150, 0.7)' },
            { position: 0.6, color: 'rgba(255, 255, 100, 0.5)' },
            { position: 0.8, color: 'rgba(255, 255, 50, 0.3)' },
            { position: 1, color: 'rgba(255, 255, 0, 0)' }
        ]);
        ctx.rotate(Math.PI);
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255, 255, 255, 1)' },
            { position: 0.2, color: 'rgba(255, 255, 200, 0.9)' },
            { position: 0.4, color: 'rgba(255, 255, 150, 0.7)' },
            { position: 0.6, color: 'rgba(255, 255, 100, 0.5)' },
            { position: 0.8, color: 'rgba(255, 255, 50, 0.3)' },
            { position: 1, color: 'rgba(255, 255, 0, 0)' }
        ]);
        ctx.restore();
    }
    drawGravitationalLens(quasarRadius, 'attractive', 3.0);
    ctx.beginPath();
    ctx.arc(0, 0, quasarRadius * 8, 0, Math.PI * 2);
    const radiationGradient = ctx.createRadialGradient(0, 0, quasarRadius * 2, 0, 0, quasarRadius * 8);
    radiationGradient.addColorStop(0, 'rgba(255, 255, 0, 0.3)');
    radiationGradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
    ctx.fillStyle = radiationGradient;
    ctx.fill();
    break;
case 'whiteHole':
    const whiteHoleRadius = planet.radius * camera.zoom;
    const whiteHoleTime = Date.now() * 0.001;
    drawAccretionDisk(
        whiteHoleRadius * 1.2, 
        whiteHoleRadius * 5, 
        [
            'rgba(173, 216, 230, 0.9)',
            'rgba(135, 206, 250, 0.8)',
            'rgba(0, 191, 255, 0.7)',
            'rgba(30, 144, 255, 0.6)',
            'rgba(0, 0, 139, 0.4)',
            'rgba(0, 0, 0, 0.2)'
        ],
        (planet.rotation || 0) * visualTimeScale * -2,
        planet
    );
    const whiteHoleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, whiteHoleRadius);
    whiteHoleGradient.addColorStop(0, '#FFFFFF');
    whiteHoleGradient.addColorStop(0.3, '#E6F7FF');
    whiteHoleGradient.addColorStop(0.7, '#B3E0FF');
    whiteHoleGradient.addColorStop(1, '#66C2FF');
    ctx.beginPath();
    ctx.arc(0, 0, whiteHoleRadius, 0, Math.PI * 2);
    ctx.fillStyle = whiteHoleGradient;
    ctx.fill();
    if (graphicsQuality !== 'low' && planet.jets) {
        const jetLength = whiteHoleRadius * 25;
        const jetWidthStart = whiteHoleRadius * 0.3;
        const jetWidthEnd = whiteHoleRadius * 6;
        ctx.save();
        ctx.rotate(planet.jetAngle + (planet.rotation || 0));
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255, 255, 255, 1)' },
            { position: 0.2, color: 'rgba(200, 230, 255, 0.9)' },
            { position: 0.4, color: 'rgba(150, 200, 255, 0.7)' },
            { position: 0.6, color: 'rgba(100, 180, 255, 0.5)' },
            { position: 0.8, color: 'rgba(50, 150, 255, 0.3)' },
            { position: 1, color: 'rgba(0, 100, 255, 0)' }
        ]);
        ctx.rotate(Math.PI);
        drawJet(jetLength, jetWidthStart, jetWidthEnd, [
            { position: 0, color: 'rgba(255, 255, 255, 1)' },
            { position: 0.2, color: 'rgba(200, 230, 255, 0.9)' },
            { position: 0.4, color: 'rgba(150, 200, 255, 0.7)' },
            { position: 0.6, color: 'rgba(100, 180, 255, 0.5)' },
            { position: 0.8, color: 'rgba(50, 150, 255, 0.3)' },
            { position: 1, color: 'rgba(0, 100, 255, 0)' }
        ]);
        ctx.restore();
    }
    drawGravitationalLens(whiteHoleRadius, 'repulsive', 2.0);
    const expansionFactor = 1 + Math.sin(whiteHoleTime * 0.008) * 0.2;
    ctx.beginPath();
    ctx.arc(0, 0, whiteHoleRadius * 2.2 * expansionFactor, 0, Math.PI * 2);
    const expansionGradient = ctx.createRadialGradient(
        0, 0, whiteHoleRadius * 0.8,
        0, 0, whiteHoleRadius * 2.2 * expansionFactor
    );
    expansionGradient.addColorStop(0, 'rgba(173, 216, 230, 0.6)');
    expansionGradient.addColorStop(0.7, 'rgba(135, 206, 250, 0.3)');
    expansionGradient.addColorStop(1, 'rgba(0, 191, 255, 0)');
    ctx.fillStyle = expansionGradient;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.7;
        for (let i = 0; i < 6; i++) {
            const particleAngle = (i / 6) * Math.PI * 2 + whiteHoleTime;
            const particleDistance = whiteHoleRadius * (1.8 + Math.sin(whiteHoleTime * 2 + i) * 0.5);
            const particleSize = whiteHoleRadius * 0.15;
            ctx.beginPath();
            ctx.arc(
                Math.cos(particleAngle) * particleDistance,
                Math.sin(particleAngle) * particleDistance,
                particleSize, 0, Math.PI * 2
            );
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
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
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
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
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
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
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
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
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
    break;
}
case 'chronosStar':
    drawChronosStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'phantomStar':
    drawPhantomStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'vortexStar':
    drawVortexStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'crystalStar':
    drawCrystalStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'neuralStar':
    drawNeuralStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'hologramStar':
    drawHologramStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'quantumFoamStar':
    drawQuantumFoamStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'prismStar':
    drawPrismStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'echoStar':
    drawEchoStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'asciiStar':
    {
        const asciiRadius = planet.radius * camera.zoom;
        const time = Date.now() * 0.001;
        ctx.save();
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, asciiRadius);
        coreGradient.addColorStop(0, '#FFFFFF');
        coreGradient.addColorStop(0.18, '#CCFFFF');
        coreGradient.addColorStop(0.5, '#66CCFF');
        coreGradient.addColorStop(1, 'rgba(50,150,255,0.06)');
        ctx.beginPath();
        ctx.arc(0, 0, asciiRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, asciiRadius * 0.22 * (1 + Math.sin(time * 6) * 0.06), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();
        if (graphicsQuality !== 'low') {
            const chars = ['0','1','<','>','/','\\','[',']','{','}'];
            const count = Math.max(6, Math.floor(6 + asciiRadius * 0.02));
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `${Math.max(6, Math.round(asciiRadius * 0.12))}px monospace`;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 + time * 0.7;
                const dist = asciiRadius * (1.05 + 0.12 * Math.sin(time * 1.5 + i));
                const cx = Math.cos(angle) * dist;
                const cy = Math.sin(angle) * dist;
                const ch = chars[(i + Math.floor(time * 3)) % chars.length];
                ctx.globalAlpha = 0.9 - (i / count) * 0.6;
                ctx.fillText(ch, cx, cy);
            }
            ctx.globalAlpha = 1;
        }
        if (graphicsQuality !== 'low') {
            const glow = ctx.createRadialGradient(0, 0, asciiRadius * 0.25, 0, 0, asciiRadius * 2);
            glow.addColorStop(0, 'rgba(150,220,255,0.35)');
            glow.addColorStop(1, 'rgba(150,220,255,0)');
            ctx.beginPath();
            ctx.arc(0, 0, asciiRadius * 2, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
        }
        ctx.restore();
    }
    break;
case 'jsStar':
    drawJsStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'pyStar':
    drawPyStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'cssStar':
    drawCssStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'csharpStar':
    drawCsharpStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'gmlStar':
    drawGmlStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'javaStar':
    drawJavaStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'phpStar':
    drawPhpStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'rustStar':
    drawRustStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'goStar':
    drawGoStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'kotlinStar':
    drawKotlinStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'swiftStar':
    drawSwiftStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'tsStar':
    drawTsStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'luaStar':
    drawLuaStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'rubyStar':
    drawRubyStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'dartStar':
    drawDartStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'htmlStar':
    drawHtmlStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'jsonStar':
    drawJsonStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'assemblyStar':
    drawAssemblyStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'sqlStar':
    drawSqlStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'medusaStar':
    drawMedusaStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'nitricStar':
    drawNitricStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
case 'singularityStar':
    drawSingularityStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale);
    break;
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
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
    default:
      const safeRadiusDefault = Math.max(1, radius);
      ctx.beginPath();
      ctx.arc(0, 0, safeRadiusDefault, 0, Math.PI * 2);
      ctx.fillStyle = planet.color || '#cccccc';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
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
        'pulsar', 'quarkStar', 'magnetar',
        'chronosStar', 'phantomStar', 'vortexStar', 'crystalStar', 'neuralStar', 'hologramStar', 'quantumFoamStar', 'prismStar', 'echoStar', 'asciiStar', 'medusaStar', 'nitricStar', 'singularityStar'
].includes(planet.type)) {
    if (isFinite(x) && isFinite(y) && isFinite(radius) && radius > 0) {
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
}
if (shadowsEnabled && graphicsQuality ==='high' && ![
    'star', 'brownDwarf', 'whiteDwarf', 'blackHole', 'quasar',
    'pulsar', 'quarkStar', 'magnetar',
    'chronosStar', 'phantomStar', 'vortexStar', 'crystalStar', 'neuralStar', 'hologramStar', 'quantumFoamStar', 'prismStar', 'echoStar', 'asciiStar', 'medusaStar', 'nitricStar', 'singularityStar'
].includes(planet.type)) {
    if (isFinite(x) && isFinite(y) && isFinite(radius) && radius > 0) {
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
}
    if ([
        'star', 'brownDwarf', 'whiteDwarf', 'redDwarf', 'ttauriStar',
        'carbonStar', 'giantStar', 'hypergiant', 'massiveStar', 'strangeStar',
        'redGiant', 'redSupergiant', 'redHypergiant', 'pulsar', 'quarkStar',
        'chronosStar', 'phantomStar', 'vortexStar', 'crystalStar', 'neuralStar', 'hologramStar', 'quantumFoamStar', 'prismStar', 'echoStar', 'asciiStar', 'medusaStar', 'nitricStar', 'singularityStar'
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
function drawJsStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    core.addColorStop(0, '#FFFF00');
    core.addColorStop(0.2, '#FFD700');
    core.addColorStop(0.5, '#FFA500');
    core.addColorStop(0.8, '#FF8C00');
    core.addColorStop(1, 'rgba(255,140,0,0.1)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
    const pulse = 1 + Math.sin(time * 8) * 0.2;
    ctx.beginPath();
    ctx.arc(0, 0, r * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,0,${0.6 + Math.sin(time * 10) * 0.3})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    if (graphicsQuality !== 'low') {
        const codeSnippets = ['function', 'const', 'let', '=>', '{}', '[]', '()', 'await', 'async'];
        const ringCount = 3;
        for (let ring = 0; ring < ringCount; ring++) {
            ctx.save();
            ctx.rotate(time * (1 + ring * 0.5));
            const ringRadius = r * (1.2 + ring * 0.4);
            const snippetCount = 8 + ring * 4;
            for (let i = 0; i < snippetCount; i++) {
                const angle = (i / snippetCount) * Math.PI * 2;
                const snippetAlpha = (Math.sin(time * 4 + i + ring) + 1) * 0.4;
                if (snippetAlpha > 0.3) {
                    const x = Math.cos(angle) * ringRadius;
                    const y = Math.sin(angle) * ringRadius;
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(angle + Math.PI/2);
                    ctx.globalAlpha = snippetAlpha;
                    const snippet = codeSnippets[(i + ring * 3) % codeSnippets.length];
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = `${Math.max(8, Math.round(r * 0.08))}px 'Courier New', monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(snippet, 0, 0);
                    ctx.restore();
                }
            }
            ctx.restore();
        }
    }
    if (planet._jsSpark) {
        const sparkCount = 15;
        ctx.globalAlpha = 0.9;
        for (let i = 0; i < sparkCount; i++) {
            const sparkTime = time * 10 + i;
            const angle = (i / sparkCount) * Math.PI * 2;
            const sparkRadius = r * (0.8 + Math.sin(sparkTime) * 0.4);
            const sparkSize = r * 0.05 * (0.5 + Math.sin(sparkTime * 2) * 0.5);
            ctx.beginPath();
            ctx.arc(
                Math.cos(angle) * sparkRadius,
                Math.sin(angle) * sparkRadius,
                sparkSize, 0, Math.PI * 2
            );
            const sparkGradient = ctx.createRadialGradient(
                Math.cos(angle) * sparkRadius,
                Math.sin(angle) * sparkRadius,
                0,
                Math.cos(angle) * sparkRadius,
                Math.sin(angle) * sparkRadius,
                sparkSize
            );
            sparkGradient.addColorStop(0, '#FFFFFF');
            sparkGradient.addColorStop(0.7, '#FFFF00');
            sparkGradient.addColorStop(1, '#FFA500');
            ctx.fillStyle = sparkGradient;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    const glow = ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r * 3);
    glow.addColorStop(0, 'rgba(255,255,0,0.6)');
    glow.addColorStop(0.3, 'rgba(255,215,0,0.3)');
    glow.addColorStop(1, 'rgba(255,140,0,0)');
    ctx.beginPath();
    ctx.arc(0, 0, r * 3, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.restore();
}
function drawPyStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    core.addColorStop(0, '#FFFFFF');
    core.addColorStop(0.2, '#87CEEB');
    core.addColorStop(0.5, '#4169E1');
    core.addColorStop(0.8, '#0000FF');
    core.addColorStop(1, 'rgba(0,0,255,0.1)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
    const waveCount = 4;
    for (let i = 0; i < waveCount; i++) {
        const waveSize = r * (1.3 + i * 0.3);
        const wavePulse = Math.sin(time * 3 + i) * 0.3 + 0.7;
        const alpha = (0.4 - i * 0.1) * wavePulse;
        ctx.beginPath();
        ctx.arc(0, 0, waveSize, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(135,206,235,${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    if (graphicsQuality !== 'low') {
        const pySnippets = ['def', 'import', 'class', 'if', 'for', 'while', 'lambda', 'with'];
        const floatingCount = 12;
        for (let i = 0; i < floatingCount; i++) {
            const floatTime = time * 2 + i;
            const angle = (i / floatingCount) * Math.PI * 2;
            const distance = r * (1.1 + Math.sin(floatTime) * 0.3);
            const floatAlpha = (Math.sin(floatTime * 3) + 1) * 0.5;
            if (floatAlpha > 0.2) {
                ctx.save();
                ctx.rotate(angle);
                ctx.translate(distance, 0);
                ctx.rotate(Math.PI/2);
                ctx.globalAlpha = floatAlpha;
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `${Math.max(7, Math.round(r * 0.07))}px 'Courier New', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const snippet = pySnippets[i % pySnippets.length];
                ctx.fillText(snippet, 0, 0);
                ctx.restore();
            }
        }
    }
    if (planet._pyCalm) {
        ctx.beginPath();
        ctx.arc(0, 0, r * 2, 0, Math.PI * 2);
        const calmGradient = ctx.createRadialGradient(0, 0, r, 0, 0, r * 2);
        calmGradient.addColorStop(0, 'rgba(135,206,235,0.5)');
        calmGradient.addColorStop(1, 'rgba(135,206,235,0)');
        ctx.fillStyle = calmGradient;
        ctx.fill();
    }
    ctx.restore();
}
function drawCssStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    core.addColorStop(0, '#FFFFFF');
    core.addColorStop(0.2, '#E6E6FA');
    core.addColorStop(0.5, '#9370DB');
    core.addColorStop(0.8, '#8A2BE2');
    core.addColorStop(1, 'rgba(138,43,226,0.1)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
    const propertyRings = 3;
    for (let ring = 0; ring < propertyRings; ring++) {
        ctx.save();
        ctx.rotate(time * (0.8 + ring * 0.4));
        const ringRadius = r * (1.1 + ring * 0.5);
        const cssProperties = ['color', 'margin', 'padding', 'border', 'font', 'display', 'position'];
        const propCount = 6 + ring * 2;
        for (let i = 0; i < propCount; i++) {
            const angle = (i / propCount) * Math.PI * 2;
            const pulse = Math.sin(time * 5 + i + ring) * 0.5 + 0.5;
            ctx.save();
            ctx.rotate(angle);
            ctx.translate(ringRadius, 0);
            ctx.globalAlpha = pulse * 0.8;
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `${Math.max(6, Math.round(r * 0.06))}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const property = cssProperties[(i + ring) % cssProperties.length];
            ctx.fillText(property, 0, 0);
            ctx.restore();
        }
        ctx.restore();
    }
    if (graphicsQuality !== 'low') {
        const selectors = ['.class', '#id', '::before', '::after', '@media', '@keyframes'];
        for (let i = 0; i < selectors.length; i++) {
            const selTime = time * 1.5 + i;
            const distance = r * (0.6 + Math.sin(selTime) * 0.2);
            const angle = (i / selectors.length) * Math.PI * 2;
            const alpha = (Math.sin(selTime * 4) + 1) * 0.4;
            ctx.save();
            ctx.rotate(angle);
            ctx.translate(distance, 0);
            ctx.rotate(-angle);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#FFD700';
            ctx.font = `${Math.max(8, Math.round(r * 0.09))}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(selectors[i], 0, 0);
            ctx.restore();
        }
    }
    if (planet._cssTint) {
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,182,193,${0.3 + Math.sin(time * 6) * 0.2})`;
        ctx.fill();
    }
    ctx.restore();
}
function drawCsharpStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    core.addColorStop(0, '#FFFFFF');
    core.addColorStop(0.2, '#ADD8E6');
    core.addColorStop(0.5, '#0000FF');
    core.addColorStop(0.8, '#000080');
    core.addColorStop(1, 'rgba(0,0,128,0.1)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
    const netLayers = 4;
    for (let layer = 0; layer < netLayers; layer++) {
        ctx.save();
        ctx.rotate(time * (0.5 + layer * 0.3));
        const layerRadius = r * (0.7 + layer * 0.2);
        const dotCount = 8 + layer * 4;
        for (let i = 0; i < dotCount; i++) {
            const angle = (i / dotCount) * Math.PI * 2;
            const x = Math.cos(angle) * layerRadius;
            const y = Math.sin(angle) * layerRadius;
            ctx.beginPath();
            ctx.arc(x, y, r * 0.03, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
        }
        ctx.strokeStyle = `rgba(173,216,230,${0.3 - layer * 0.08})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < dotCount; i++) {
            for (let j = i + 1; j < dotCount; j++) {
                if (Math.random() > 0.7) {
                    const angle1 = (i / dotCount) * Math.PI * 2;
                    const angle2 = (j / dotCount) * Math.PI * 2;
                    ctx.beginPath();
                    ctx.moveTo(
                        Math.cos(angle1) * layerRadius,
                        Math.sin(angle1) * layerRadius
                    );
                    ctx.lineTo(
                        Math.cos(angle2) * layerRadius,
                        Math.sin(angle2) * layerRadius
                    );
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }
    if (graphicsQuality !== 'low') {
        const csharpKeywords = ['public', 'private', 'class', 'void', 'using', 'namespace', 'interface'];
        const keywordCount = 10;
        for (let i = 0; i < keywordCount; i++) {
            const keywordTime = time * 1.8 + i;
            const radiusVar = r * (1.2 + Math.sin(keywordTime) * 0.4);
            const angle = (i / keywordCount) * Math.PI * 2;
            const alpha = (Math.sin(keywordTime * 2) + 1) * 0.6;
            ctx.save();
            ctx.rotate(angle);
            ctx.translate(radiusVar, 0);
            ctx.rotate(Math.PI/2);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `${Math.max(7, Math.round(r * 0.07))}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const keyword = csharpKeywords[i % csharpKeywords.length];
            ctx.fillText(keyword, 0, 0);
            ctx.restore();
        }
    }
    if (planet._csharpLocked) {
        ctx.save();
        ctx.rotate(time * 2);
        const lockSize = r * 0.4;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(-lockSize/2, -lockSize/4, lockSize, lockSize * 0.75);
        ctx.beginPath();
        ctx.arc(0, -lockSize/4, lockSize * 0.2, Math.PI, 0);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.fillStyle = '#FFD700';
        ctx.font = `${Math.max(8, Math.round(r * 0.1))}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', 0, lockSize * 0.1);
        ctx.restore();
    }
    ctx.restore();
}
function drawGmlStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    core.addColorStop(0, '#FFFFFF');
    core.addColorStop(0.2, '#98FB98');
    core.addColorStop(0.5, '#00FF00');
    core.addColorStop(0.8, '#006400');
    core.addColorStop(1, 'rgba(0,100,0,0.1)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        const gridSize = Math.max(3, Math.floor(r * 0.1));
        const pixelSize = r * 0.08;
        for (let x = -gridSize; x <= gridSize; x++) {
            for (let y = -gridSize; y <= gridSize; y++) {
                if (Math.random() > 0.7) {
                    const pulse = Math.sin(time * 3 + x + y) * 0.5 + 0.5;
                    ctx.globalAlpha = pulse * 0.6;
                    ctx.fillStyle = '#00FF00';
                    ctx.fillRect(
                        x * pixelSize - pixelSize/2,
                        y * pixelSize - pixelSize/2,
                        pixelSize, pixelSize
                    );
                }
            }
        }
        ctx.globalAlpha = 1;
    }
    const gmlFunctions = ['create', 'draw', 'step', 'keypress', 'mouse', 'sprite', 'object'];
    const funcCount = 14;
    for (let i = 0; i < funcCount; i++) {
        const funcTime = time * 2.5 + i;
        const spiralRadius = r * (0.8 + (i/funcCount) * 1.2);
        const angle = (i/funcCount) * Math.PI * 6 + funcTime;
        const alpha = (Math.sin(funcTime * 3) + 1) * 0.5;
        if (alpha > 0.3) {
            const x = Math.cos(angle) * spiralRadius;
            const y = Math.sin(angle) * spiralRadius;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI/2);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `${Math.max(6, Math.round(r * 0.06))}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const func = gmlFunctions[i % gmlFunctions.length];
            ctx.fillText(func + '()', 0, 0);
            ctx.restore();
        }
    }
    if (planet._gmlCreating) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particleTime = time * 8 + i;
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = r * (1 + Math.sin(particleTime) * 0.5);
            const size = r * 0.02 * (1 + Math.sin(particleTime * 2));
            ctx.beginPath();
            ctx.arc(
                Math.cos(angle) * distance,
                Math.sin(angle) * distance,
                size, 0, Math.PI * 2
            );
            ctx.fillStyle = `rgba(0,255,0,${0.5 + Math.sin(particleTime) * 0.3})`;
            ctx.fill();
        }
    }
    ctx.restore();
}
function drawJavaStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.2, '#FFE4B5');
    grad.addColorStop(0.6, '#FFB74D');
    grad.addColorStop(1, 'rgba(255,160,50,0.08)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        const classCount = 8;
        ctx.fillStyle = '#FFF7E6';
        ctx.font = `${Math.max(6, Math.round(r * 0.06))}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < classCount; i++) {
            const ang = (i / classCount) * Math.PI * 2 + time * 0.4;
            const dist = r * (1.05 + 0.12 * Math.sin(time + i));
            ctx.globalAlpha = 0.85 - (i / classCount) * 0.5;
            ctx.fillText('class', Math.cos(ang) * dist, Math.sin(ang) * dist);
        }
        ctx.globalAlpha = 1;
    }
    if (planet._javaPulse) {
        ctx.save();
        ctx.globalAlpha = 0.6;
        const pulse = 1 + Math.sin(time * 10) * 0.08;
        ctx.beginPath();
        ctx.arc(0, 0, r * (1.5 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,230,180,0.14)';
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();
}
function drawPhpStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.25, '#E0E0FF');
    grad.addColorStop(0.6, '#9FA8DA');
    grad.addColorStop(1, 'rgba(150,150,255,0.06)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        const ghosts = 6;
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `${Math.max(6, Math.round(r * 0.05))}px monospace`;
        for (let i = 0; i < ghosts; i++) {
            const ang = (i / ghosts) * Math.PI * 2 + time * 0.6;
            const dist = r * (1.1 + 0.08 * Math.cos(time * 2 + i));
            ctx.globalAlpha = 0.7 - (i / ghosts) * 0.5;
            ctx.fillText('echo', Math.cos(ang) * dist, Math.sin(ang) * dist);
        }
        ctx.globalAlpha = 1;
    }
    if (planet._phpFlicker) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,200,255,0.12)';
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();
}
function drawRustStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    grad.addColorStop(0, '#FFFDF6');
    grad.addColorStop(0.3, '#FFDAB9');
    grad.addColorStop(0.7, '#D2691E');
    grad.addColorStop(1, 'rgba(210,120,40,0.08)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        for (let i = 0; i < 12; i++) {
            const ang = (i / 12) * Math.PI * 2 + time * 1.2;
            const dist = r * (0.9 + Math.random() * 0.6);
            ctx.beginPath();
            ctx.arc(Math.cos(ang) * dist, Math.sin(ang) * dist, Math.max(0.6, r * 0.03), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,80,30,${0.4 + Math.random() * 0.6})`;
            ctx.fill();
        }
    }
    if (planet._rustSpark) {
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,200,150,0.5)';
        ctx.lineWidth = Math.max(1, r * 0.02);
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}
function drawGoStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.25, '#DFFFD6');
    grad.addColorStop(0.6, '#A6F78F');
    grad.addColorStop(1, 'rgba(120,220,120,0.06)');
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        const spokes = 6;
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = Math.max(1, r * 0.01);
        for (let i = 0; i < spokes; i++) {
            const ang = (i / spokes) * Math.PI * 2 + time * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(ang) * r * 0.2, Math.sin(ang) * r * 0.2);
            ctx.lineTo(Math.cos(ang) * r * 1.1, Math.sin(ang) * r * 1.1);
            ctx.stroke();
        }
    }
    if (planet._goBurst) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,255,200,0.08)';
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();
}
function drawKotlinStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.25, '#FFEFD5');
    grad.addColorStop(0.6, '#FFD080');
    grad.addColorStop(1, 'rgba(255,190,120,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    if (graphicsQuality !== 'low') {
        ctx.fillStyle = '#FFF8EE';
        ctx.font = `${Math.max(6, Math.round(r * 0.06))}px monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const count = 8;
        for (let i=0;i<count;i++){
            const ang = (i/count)*Math.PI*2 + time*0.3;
            const dist = r*(1.05 + 0.1*Math.sin(time + i));
            ctx.globalAlpha = 0.85 - i*0.08;
            ctx.fillText('suspend', Math.cos(ang)*dist, Math.sin(ang)*dist);
        }
        ctx.globalAlpha = 1;
    }
    if (planet._kotlinPulse) {
        ctx.save(); ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(0,0,r*1.6,0,Math.PI*2);
        ctx.fillStyle = 'rgba(255,235,200,0.12)'; ctx.fill(); ctx.restore();
    }
    ctx.restore();
}
function drawSwiftStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom; const time = Date.now() * 0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0,0,0,0,0,r);
    grad.addColorStop(0,'#FFF'); grad.addColorStop(0.25,'#FFE6F0'); grad.addColorStop(0.6,'#FFB6C1'); grad.addColorStop(1,'rgba(255,180,200,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    if (graphicsQuality !== 'low'){
        const streaks = 10; ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = Math.max(1,r*0.01);
        for (let i=0;i<streaks;i++){ const ang = (i/streaks)*Math.PI*2 + time*2; ctx.beginPath(); ctx.moveTo(Math.cos(ang)*r*0.2,Math.sin(ang)*r*0.2); ctx.lineTo(Math.cos(ang)*r*1.15,Math.sin(ang)*r*1.15); ctx.stroke(); }
    }
    if (planet._swiftFlash){ ctx.save(); ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(0,0,r*1.4,0,Math.PI*2); ctx.fillStyle='rgba(255,230,240,0.12)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawTsStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom; const time = Date.now()*0.001;
    ctx.save();
    const grad = ctx.createRadialGradient(0,0,0,0,0,r);
    grad.addColorStop(0,'#FFFFFF'); grad.addColorStop(0.25,'#E8F7FF'); grad.addColorStop(0.6,'#BEE6FF'); grad.addColorStop(1,'rgba(160,220,255,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    if (graphicsQuality !== 'low'){
        ctx.fillStyle = '#FFFFFF'; ctx.font = `${Math.max(6, Math.round(r * 0.06))}px monospace`;
        const labels = ['type','interface','const','let'];
        for (let i=0;i<6;i++){ const ang = (i/6)*Math.PI*2 + time*0.4; const dist = r*(1.05 + 0.08*Math.sin(time + i)); ctx.globalAlpha = 0.85 - i*0.1; ctx.fillText(labels[i%labels.length], Math.cos(ang)*dist, Math.sin(ang)*dist); }
        ctx.globalAlpha = 1;
    }
    if (planet._tsPulse){ ctx.save(); ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(0,0,r*1.5,0,Math.PI*2); ctx.fillStyle='rgba(200,235,255,0.12)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawLuaStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom; const time = Date.now()*0.001;
    ctx.save(); const grad = ctx.createRadialGradient(0,0,0,0,0,r);
    grad.addColorStop(0,'#FFFFFF'); grad.addColorStop(0.25,'#FFF7E6'); grad.addColorStop(0.6,'#FFE4B5'); grad.addColorStop(1,'rgba(255,230,170,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    if (graphicsQuality !== 'low'){
        const loops = 10; ctx.fillStyle='#FFFFFF'; ctx.font = `${Math.max(6, Math.round(r * 0.05))}px monospace`;
        for (let i=0;i<loops;i++){ const ang = (i/loops)*Math.PI*2 + time*0.5; const dist = r*(1.05 + 0.06*Math.cos(time + i)); ctx.globalAlpha = 0.8 - i*0.06; ctx.fillText('lua', Math.cos(ang)*dist, Math.sin(ang)*dist); }
        ctx.globalAlpha = 1;
    }
    if (planet._luaSwirl){ ctx.save(); ctx.globalAlpha=0.5; ctx.beginPath(); ctx.arc(0,0,r*1.3,0,Math.PI*2); ctx.strokeStyle='rgba(255,210,150,0.12)'; ctx.lineWidth= Math.max(1,r*0.02); ctx.stroke(); ctx.restore(); }
    ctx.restore();
}
function drawRubyStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom; const time = Date.now()*0.001;
    ctx.save(); const grad = ctx.createRadialGradient(0,0,0,0,0,r);
    grad.addColorStop(0,'#FFFFFF'); grad.addColorStop(0.25,'#FFECEC'); grad.addColorStop(0.6,'#FFC4C4'); grad.addColorStop(1,'rgba(255,120,120,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    if (graphicsQuality !== 'low'){
        for (let i=0;i<10;i++){ const ang=(i/10)*Math.PI*2 + time*0.7; ctx.beginPath(); ctx.arc(Math.cos(ang)*r*(0.9+Math.random()*0.4), Math.sin(ang)*r*(0.9+Math.random()*0.4), Math.max(0.5,r*0.03), 0, Math.PI*2); ctx.fillStyle = `rgba(255,80,80,${0.3+Math.random()*0.6})`; ctx.fill(); }
    }
    if (planet._rubyGlow){ ctx.save(); ctx.globalAlpha=0.7; ctx.beginPath(); ctx.arc(0,0,r*1.5,0,Math.PI*2); ctx.fillStyle='rgba(255,200,200,0.12)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawDartStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom; const time = Date.now()*0.001;
    ctx.save(); const grad = ctx.createRadialGradient(0,0,0,0,0,r);
    grad.addColorStop(0,'#FFFFFF'); grad.addColorStop(0.25,'#F7FFF0'); grad.addColorStop(0.6,'#E8FFD0'); grad.addColorStop(1,'rgba(200,255,180,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = grad; ctx.fill();
    if (graphicsQuality !== 'low'){
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = Math.max(1, r*0.01);
        for (let i=0;i<6;i++){ const ang=(i/6)*Math.PI*2 + time*2; ctx.beginPath(); ctx.moveTo(Math.cos(ang)*r*0.3, Math.sin(ang)*r*0.3); ctx.lineTo(Math.cos(ang)*r*1.15, Math.sin(ang)*r*1.15); ctx.stroke(); }
    }
    if (planet._dartBurst){ ctx.save(); ctx.globalAlpha=0.6; ctx.beginPath(); ctx.arc(0,0,r*1.4,0,Math.PI*2); ctx.fillStyle='rgba(220,255,200,0.08)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawHtmlStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0,0,0,0,0,r);
    core.addColorStop(0,'#FFFFFF'); core.addColorStop(0.25,'#FFEDD8'); core.addColorStop(0.6,'#FFD1B3'); core.addColorStop(1,'rgba(255,200,150,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = core; ctx.fill();
    if (graphicsQuality !== 'low'){
        const tags = ['<div>','<span>','<h1>','</>','<a>','<p>'];
        ctx.fillStyle = '#FFFFFF'; ctx.font = `${Math.max(7, Math.round(r * 0.07))}px monospace`;
        for (let i=0;i<8;i++){
            const ang = (i/8)*Math.PI*2 + time*0.6;
            const dist = r*(1.05 + 0.08*Math.sin(time + i));
            ctx.globalAlpha = 0.85 - i*0.08;
            ctx.fillText(tags[i%tags.length], Math.cos(ang)*dist, Math.sin(ang)*dist);
        }
        ctx.globalAlpha = 1;
    }
    if (planet._htmlPulse){ ctx.save(); ctx.globalAlpha=0.6; ctx.beginPath(); ctx.arc(0,0,r*1.5,0,Math.PI*2); ctx.fillStyle='rgba(255,230,200,0.12)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawJsonStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0,0,0,0,0,r);
    core.addColorStop(0,'#FFFFFF'); core.addColorStop(0.25,'#F0FFF4'); core.addColorStop(0.6,'#DFFFE8'); core.addColorStop(1,'rgba(200,255,230,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = core; ctx.fill();
    if (graphicsQuality !== 'low'){
        const bits = ['{','}','[',']',':',','];
        ctx.fillStyle = '#004466'; ctx.font = `${Math.max(7, Math.round(r * 0.06))}px monospace`;
        for (let i=0;i<10;i++){
            const ang = (i/10)*Math.PI*2 + time*0.4;
            const dist = r*(1.05 + 0.06*Math.cos(time + i));
            ctx.globalAlpha = 0.8 - i*0.06;
            ctx.fillText(bits[i%bits.length], Math.cos(ang)*dist, Math.sin(ang)*dist);
        }
        ctx.globalAlpha = 1;
    }
    if (planet._jsonPulse){ ctx.save(); ctx.globalAlpha=0.5; ctx.beginPath(); ctx.arc(0,0,r*1.4,0,Math.PI*2); ctx.fillStyle='rgba(200,255,230,0.12)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawAssemblyStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0,0,0,0,0,r);
    core.addColorStop(0,'#FFFFFF'); core.addColorStop(0.25,'#F5F5F5'); core.addColorStop(0.6,'#E8E8E8'); core.addColorStop(1,'rgba(200,200,200,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = core; ctx.fill();
    if (graphicsQuality !== 'low'){
        ctx.strokeStyle = 'rgba(0,0,0,0.6)'; ctx.lineWidth = Math.max(1, r*0.008);
        for (let i=0;i<12;i++){
            const ang = (i/12)*Math.PI*2 + time*2.5;
            ctx.beginPath(); ctx.moveTo(Math.cos(ang)*r*0.4, Math.sin(ang)*r*0.4); ctx.lineTo(Math.cos(ang)*r*1.05, Math.sin(ang)*r*1.05); ctx.stroke();
        }
        ctx.fillStyle = '#000000'; ctx.font = `${Math.max(6, Math.round(r * 0.06))}px monospace`;
        for (let i=0;i<6;i++){ const ang = (i/6)*Math.PI*2 + time*0.9; const dist = r*(0.8 + Math.sin(time + i)*0.08); ctx.globalAlpha = 0.9 - i*0.1; ctx.fillText((Math.random()*255|0).toString(16).toUpperCase().padStart(2,'0'), Math.cos(ang)*dist, Math.sin(ang)*dist); }
        ctx.globalAlpha = 1;
    }
    if (planet._assemblyBurst){ ctx.save(); ctx.globalAlpha=0.6; ctx.beginPath(); ctx.arc(0,0,r*1.45,0,Math.PI*2); ctx.fillStyle='rgba(220,220,220,0.08)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawSqlStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const r = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    ctx.save();
    const core = ctx.createRadialGradient(0,0,0,0,0,r);
    core.addColorStop(0,'#FFFFFF'); core.addColorStop(0.25,'#F8F9FA'); core.addColorStop(0.6,'#E9F0F7'); core.addColorStop(1,'rgba(200,220,240,0.06)');
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fillStyle = core; ctx.fill();
    if (graphicsQuality !== 'low'){
        ctx.strokeStyle = 'rgba(10,40,80,0.6)';
        ctx.lineWidth = Math.max(1, r*0.006);
        const rows = 4;
        const cols = 6;
        for (let i=0;i<rows;i++){
            const ry = (i/(rows-1) - 0.5) * r * 1.2;
            ctx.beginPath();
            ctx.moveTo(-r*0.9, ry);
            ctx.lineTo(r*0.9, ry);
            ctx.stroke();
        }
        for (let j=0;j<cols;j++){
            const rx = (j/(cols-1) - 0.5) * r * 1.6;
            ctx.beginPath();
            ctx.moveTo(rx, -r*0.9);
            ctx.lineTo(rx, r*0.9);
            ctx.stroke();
        }
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = `${Math.max(6, Math.round(r * 0.05))}px monospace`;
        for (let i=0;i<rows;i++){
            for (let j=0;j<cols;j++){
                if (Math.random() > 0.6) continue;
                const rx = (j/(cols-1) - 0.5) * r * 1.6;
                const ry = (i/(rows-1) - 0.5) * r * 1.2;
                ctx.globalAlpha = 0.6 + 0.4 * Math.sin(time*3 + i + j);
                ctx.fillText('1', rx - r*0.02, ry + r*0.02);
            }
        }
        ctx.globalAlpha = 1;
    }
    if (planet._sqlPulse){ ctx.save(); ctx.globalAlpha=0.6; ctx.beginPath(); ctx.arc(0,0,r*1.4,0,Math.PI*2); ctx.fillStyle='rgba(200,230,255,0.12)'; ctx.fill(); ctx.restore(); }
    ctx.restore();
}
function drawMedusaStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const medusaRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    const primaryGreen = '#00FF00';
    const darkGreen = '#006400';
    const lightGreen = '#90EE90';
    const electricGreen = '#7CFC00';
    const venomGreen = '#39FF14';
    const deepGreen = '#003300';
    const glowGreen = '#32CD32';
    const toxicGreen = '#41FF00';
    const isExplosionActive = planet.explosionActive || false;
    const explosionProgress = planet.explosionProgress || 0;
    const jetsVisible = planet.jetsVisible || false;
    const explosionIntensity = isExplosionActive ? Math.min(1, explosionProgress * 2) : 0;
    ctx.save();
    if (isExplosionActive) {
        drawExpandingShockwave(medusaRadius, ctx, explosionProgress, time, planet);
    }
    if (isExplosionActive && explosionProgress > 0.3) {
        drawAttackGrid(medusaRadius, ctx, explosionProgress, time, planet);
    }
    if (graphicsQuality !== 'low') {
        drawEnhancedAccretionDisk(medusaRadius, planet, ctx, time, visualTimeScale, explosionIntensity);
    }
    drawRadiationAura(medusaRadius, ctx, explosionIntensity, time);
    drawPulsatingCore(medusaRadius, ctx, time, explosionIntensity);
    if (graphicsQuality !== 'low') {
        drawEnergyTentacles(medusaRadius, ctx, time, planet, visualTimeScale, explosionIntensity);
    }
    if (isExplosionActive && jetsVisible) {
        drawExplosionJets(medusaRadius, ctx, planet, explosionProgress);
    }
    if (isExplosionActive) {
        drawRadiationRings(medusaRadius, ctx, explosionProgress, time);
    }
    if (isExplosionActive && explosionProgress > 0.2) {
        drawPetrificationField(medusaRadius, ctx, explosionProgress);
    }
    if (graphicsQuality === 'high') {
        drawFloatingParticles(medusaRadius, ctx, time, explosionIntensity);
    }
    drawVortexCore(medusaRadius, ctx, time, explosionIntensity);
    if (isExplosionActive) {
        drawEnergyPulses(medusaRadius, ctx, explosionProgress, time);
    }
    drawFinalOutline(medusaRadius, ctx, explosionIntensity);
    ctx.restore();
}
function drawExpandingShockwave(medusaRadius, ctx, explosionProgress, time, planet) {
    if (!planet.shockwaveRadius) planet.shockwaveRadius = medusaRadius * 1.5;
    if (!planet.shockwaveMaxRadius) planet.shockwaveMaxRadius = medusaRadius * 25;
    const shockwaveProgress = Math.min(1, explosionProgress * 3);
    const currentRadius = planet.shockwaveRadius + (planet.shockwaveMaxRadius - planet.shockwaveRadius) * shockwaveProgress;
    let shockwaveAlpha = 1.0;
    if (shockwaveProgress < 1) {
        shockwaveAlpha = 1.0;
    } else {
        const fadeStart = 1/3;
        const fadeDuration = 2/3;
        const fadeProgress = (explosionProgress - fadeStart) / fadeDuration;
        shockwaveAlpha = Math.max(0, 1 - fadeProgress * 1.5);
    }
    if (shockwaveAlpha > 0.01) {
        const shockwaveGradient = ctx.createRadialGradient(0, 0, currentRadius - 10, 0, 0, currentRadius + 10);
        shockwaveGradient.addColorStop(0, `rgba(0, 255, 0, ${0.8 * shockwaveAlpha})`);
        shockwaveGradient.addColorStop(0.5, `rgba(0, 255, 0, ${0.4 * shockwaveAlpha})`);
        shockwaveGradient.addColorStop(1, `rgba(0, 255, 0, 0)`);
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = shockwaveGradient;
        ctx.lineWidth = 20 * shockwaveAlpha;
        ctx.stroke();
        const innerShockRadius = currentRadius * 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, innerShockRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * shockwaveAlpha})`;
        ctx.lineWidth = 5 * shockwaveAlpha;
        ctx.stroke();
        if (shockwaveProgress > 0.2 && shockwaveProgress < 0.8 && shockwaveAlpha > 0.5) {
            ctx.globalAlpha = 0.3 * (1 - Math.abs(shockwaveProgress - 0.5) * 2) * shockwaveAlpha;
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + time;
                const distortionRadius = currentRadius * 1.1;
                const distortionSize = currentRadius * 0.1;
                ctx.save();
                ctx.rotate(angle);
                ctx.translate(distortionRadius, 0);
                ctx.beginPath();
                ctx.arc(0, 0, distortionSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 0, ${0.5 * shockwaveAlpha})`;
                ctx.fill();
                ctx.restore();
            }
            ctx.globalAlpha = 1;
        }
    }
    if (explosionProgress >= 1) {
        planet.shockwaveRadius = medusaRadius * 1.5;
    }
}
function drawAttackGrid(medusaRadius, ctx, explosionProgress, time, planet) {
    const gridProgress = Math.max(0, (explosionProgress - 0.3) / 0.7);
    if (!planet.shockwaveRadius) return;
    const gridRadius = planet.shockwaveRadius * 1.1;
    const gridAlpha = 0.6 * (1 - gridProgress);
    if (gridAlpha > 0) {
        ctx.save();
        ctx.rotate(time * 0.5);
        const hexSize = gridRadius / 8;
        const hexCount = Math.floor(gridRadius / hexSize);
        ctx.strokeStyle = `rgba(0, 255, 0, ${gridAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 3]);
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * gridRadius, Math.sin(angle) * gridRadius);
            ctx.stroke();
        }
        for (let ring = 1; ring <= hexCount; ring++) {
            const currentRadius = ring * hexSize;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * currentRadius;
                const y = Math.sin(angle) * currentRadius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
        ctx.fillStyle = `rgba(0, 255, 0, ${gridAlpha * 0.8})`;
        for (let ring = 1; ring <= hexCount; ring++) {
            const currentRadius = ring * hexSize;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * currentRadius;
                const y = Math.sin(angle) * currentRadius;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        const pulse = Math.sin(time * 8) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${gridAlpha * pulse * 0.3})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(0, 0, gridRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        if (gridProgress < 0.7) {
            drawGridParticles(gridRadius, ctx, time, gridAlpha);
        }
    }
}
function drawGridParticles(gridRadius, ctx, time, alpha) {
    const particles = 16;
    ctx.globalAlpha = alpha;
    for (let i = 0; i < particles; i++) {
        const particleProgress = (time * 2 + i / particles) % 1;
        const particleRadius = gridRadius * particleProgress;
        const particleAngle = (i / particles) * Math.PI * 2;
        const particleSize = 3;
        const x = Math.cos(particleAngle) * particleRadius;
        const y = Math.sin(particleAngle) * particleRadius;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = '#00FF00';
        ctx.fill();
        const tailLength = 10;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(particleAngle + Math.PI/2);
        const tailGradient = ctx.createLinearGradient(0, -tailLength, 0, 0);
        tailGradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
        tailGradient.addColorStop(1, 'rgba(0, 255, 0, 0.8)');
        ctx.beginPath();
        ctx.moveTo(-particleSize/2, -tailLength);
        ctx.lineTo(particleSize/2, -tailLength);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = tailGradient;
        ctx.fill();
        ctx.restore();
    }
    ctx.globalAlpha = 1;
}
function drawVortexCore(medusaRadius, ctx, time, explosionIntensity) {
    const coreRadius = medusaRadius * 0.3;
    const vortexIntensity = 1 + explosionIntensity * 2;
    ctx.save();
    ctx.rotate(time * vortexIntensity);
    for (let i = 0; i < 3; i++) {
        const vortexRadius = coreRadius * (0.3 + i * 0.2);
        const vortexGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, vortexRadius);
        if (i === 0) {
            vortexGradient.addColorStop(0, '#FFFFFF');
            vortexGradient.addColorStop(0.7, '#90EE90');
            vortexGradient.addColorStop(1, 'rgba(144, 238, 144, 0)');
        } else if (i === 1) {
            vortexGradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
            vortexGradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
        } else {
            vortexGradient.addColorStop(0, 'rgba(0, 150, 0, 0.6)');
            vortexGradient.addColorStop(1, 'rgba(0, 150, 0, 0)');
        }
        ctx.beginPath();
        ctx.arc(0, 0, vortexRadius, 0, Math.PI * 2);
        ctx.fillStyle = vortexGradient;
        ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        for (let t = 0; t <= 100; t++) {
            const progress = t / 100;
            const angle = progress * Math.PI * 4 + i * Math.PI;
            const spiralRadius = progress * coreRadius;
            const x = Math.cos(angle) * spiralRadius;
            const y = Math.sin(angle) * spiralRadius;
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    ctx.restore();
}
function drawEnergyPulses(medusaRadius, ctx, explosionProgress, time) {
    const pulseCount = 4;
    const basePulseSpeed = 3;
    for (let i = 0; i < pulseCount; i++) {
        const pulsePhase = (time * basePulseSpeed + i / pulseCount) % 1;
        const pulseRadius = medusaRadius * (1 + pulsePhase * 2);
        const pulseAlpha = (1 - pulsePhase) * 0.5;
        if (pulseAlpha > 0) {
            ctx.beginPath();
            ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(57, 255, 20, ${pulseAlpha})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, pulseRadius * 0.9, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${pulseAlpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}
function drawEnhancedAccretionDisk(medusaRadius, planet, ctx, time, visualTimeScale, explosionIntensity) {
    const diskInnerRadius = medusaRadius * 1.2;
    const diskOuterRadius = medusaRadius * (4.0 + explosionIntensity * 2);
    ctx.save();
    ctx.rotate((planet.rotation || 0) * visualTimeScale * (3 + explosionIntensity * 2));
    const diskGradient = ctx.createRadialGradient(0, 0, diskInnerRadius, 0, 0, diskOuterRadius);
    diskGradient.addColorStop(0, `rgba(0, 255, 0, ${0.9 + explosionIntensity * 0.1})`);
    diskGradient.addColorStop(0.3, `rgba(0, 200, 0, ${0.7 + explosionIntensity * 0.1})`);
    diskGradient.addColorStop(0.6, `rgba(0, 150, 0, ${0.5 + explosionIntensity * 0.1})`);
    diskGradient.addColorStop(0.8, `rgba(0, 100, 0, ${0.3 + explosionIntensity * 0.1})`);
    diskGradient.addColorStop(1, 'rgba(0, 50, 0, 0.1)');
    ctx.beginPath();
    ctx.arc(0, 0, diskOuterRadius, 0, Math.PI * 2);
    ctx.fillStyle = diskGradient;
    ctx.fill();
    ctx.strokeStyle = `rgba(0, 255, 0, ${0.4 + explosionIntensity * 0.3})`;
    ctx.lineWidth = 2 + explosionIntensity * 2;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let t = 0; t <= 100; t++) {
            const progress = t / 100;
            const angle = progress * Math.PI * 6 + time * (2 + explosionIntensity * 3) + i * Math.PI * 2/3;
            const spiralRadius = diskInnerRadius + progress * (diskOuterRadius - diskInnerRadius);
            const x = Math.cos(angle) * spiralRadius;
            const y = Math.sin(angle) * spiralRadius;
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    ctx.restore();
}
function drawFinalOutline(medusaRadius, ctx, explosionIntensity) {
    const outlinePulse = 1 + Math.sin(Date.now() * 0.01) * explosionIntensity * 0.2;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2 + explosionIntensity * 2;
    ctx.beginPath();
    ctx.arc(0, 0, medusaRadius * outlinePulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + explosionIntensity * 0.4})`;
    ctx.lineWidth = 1 + explosionIntensity;
    ctx.beginPath();
    ctx.arc(0, 0, medusaRadius * 0.95 * outlinePulse, 0, Math.PI * 2);
    ctx.stroke();
    if (explosionIntensity > 0) {
        ctx.strokeStyle = `rgba(0, 255, 0, ${explosionIntensity * 0.5})`;
        ctx.lineWidth = 3 * explosionIntensity;
        ctx.beginPath();
        ctx.arc(0, 0, medusaRadius * 1.05, 0, Math.PI * 2);
        ctx.stroke();
    }
}
function triggerMedusaExplosion(medusaStar) {
    if (!medusaStar || medusaStar.markedForRemoval) return;
    medusaStar.explosionActive = true;
    medusaStar.explosionStartTime = Date.now();
    medusaStar.explosionProgress = 0;
    medusaStar.jetsVisible = true;
    medusaStar.shockwaveRadius = medusaStar.radius * 1.5;
    medusaStar.shockwaveMaxRadius = medusaStar.radius * 25;
    medusaStar.jetAngle = (medusaStar.rotation || 0) + (Math.random() * Math.PI / 4 - Math.PI / 8);
    applyMedusaExplosionPetrification(medusaStar);
    playRandomCollisionSound();
    createMedusaExplosionEffect(medusaStar);
}
function applyMedusaExplosionPetrification(medusaStar) {
    const explosionRadius = medusaStar.radius * 15;
    planets.forEach(other => {
        if (other === medusaStar || other.markedForRemoval) return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < explosionRadius && canBePetrifiedByMedusa(other)) {
            transformToStone(other);
            createMedusaExplosionPetrificationEffect(other);
        }
    });
}
function createStoneEffect(obj) {
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = obj.radius * 1.2;
        const particle = {
            x: obj.x + Math.cos(angle) * distance,
            y: obj.y + Math.sin(angle) * distance,
            vx: Math.cos(angle) * 1.5,
            vy: Math.sin(angle) * 1.5,
            life: 1,
            maxLife: 2,
            color: '#666666',
            size: obj.radius * 0.2,
            type: 'stone_effect'
        };
    }
}
function transformToStone(obj) {
    if (!obj || obj.markedForRemoval) return;
    if (obj.petrified) return;
    console.log(`🔮 Medusa petrifying: ${obj.type} (changing color to gray)`);
    if (!obj.originalType) obj.originalType = obj.type;
    if (!obj.originalColor) obj.originalColor = obj.color;
    if (!obj.originalGlowColor) obj.originalGlowColor = obj.glowColor;
    obj.petrified = true;
    obj.petrificationTime = Date.now();
    obj.originalVisualColor = obj.color;
    obj.color = '#666666';
    obj.glowColor = '#444444';
    createStoneEffect(obj);
}
function createMedusaPetrificationEffect(obj) {
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = obj.radius * 1.2;
        const particle = {
            x: obj.x + Math.cos(angle) * distance,
            y: obj.y + Math.sin(angle) * distance,
            vx: Math.cos(angle) * 1.5,
            vy: Math.sin(angle) * 1.5,
            life: 1,
            maxLife: 2,
            color: '#00FF00',
            size: obj.radius * 0.2,
            type: 'medusa_petrification'
        };
    }
}
function createMedusaExplosionPetrificationEffect(obj) {
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const speed = 2 + Math.random() * 2;
        const particle = {
            x: obj.x,
            y: obj.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            maxLife: 3,
            color: '#00FF00',
            size: obj.radius * 0.3,
            type: 'medusa_explosion_petrification'
        };
    }
}
function drawNitricStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const nitricRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    const isExplosionActive = planet.explosionActive || false;
    const explosionProgress = planet.explosionProgress || 0;
    const explosionIntensity = isExplosionActive ? Math.min(1, explosionProgress * 3) : 0;
    ctx.save();
    drawNitricSuperCore(nitricRadius, ctx, time, explosionIntensity);
    drawAcidVortex(nitricRadius, ctx, time, planet, visualTimeScale);
    drawCorrosionAura(nitricRadius, ctx, time, explosionIntensity);
    drawToxicEnergyRings(nitricRadius, ctx, time, planet, visualTimeScale, explosionIntensity);
    drawHyperAcidJets(nitricRadius, ctx, time, planet, visualTimeScale, explosionIntensity);
    if (graphicsQuality !== 'low') {
        drawCorrosiveVaporParticles(nitricRadius, ctx, time, explosionIntensity);
    }
    drawAcidForceField(nitricRadius, ctx, time, explosionIntensity);
    if (isExplosionActive) {
        drawNitricExplosion(nitricRadius, ctx, explosionProgress, time, planet);
    }
    drawNitricUltimateOutline(nitricRadius, ctx, explosionIntensity);
    if (graphicsQuality === 'high') drawStandardBoost(planet, ctx, nitricRadius, time);
    ctx.restore();
}
function drawNitricSuperCore(radius, ctx, time, intensity) {
    const corePulse = 1 + Math.sin(time * 8) * 0.3;
    const explosionPulse = 1 + intensity * 0.6;
    const finalRadius = radius * corePulse * explosionPulse;
    const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, finalRadius);
    coreGradient.addColorStop(0, '#FFFFFF');
    coreGradient.addColorStop(0.05, '#FFFF00');
    coreGradient.addColorStop(0.1, '#FFFF00');
    coreGradient.addColorStop(0.2, '#FFA500');
    coreGradient.addColorStop(0.4, '#FF4500');
    coreGradient.addColorStop(0.7, '#FF0000');
    coreGradient.addColorStop(1, '#8B0000');
    ctx.beginPath();
    ctx.arc(0, 0, finalRadius, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();
    const innerCoreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, finalRadius * 0.4);
    innerCoreGradient.addColorStop(0, '#FFFFFF');
    innerCoreGradient.addColorStop(0.3, '#FFFF99');
    innerCoreGradient.addColorStop(0.6, '#FFFF00');
    innerCoreGradient.addColorStop(1, '#FFA500');
    ctx.beginPath();
    ctx.arc(0, 0, finalRadius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = innerCoreGradient;
    ctx.fill();
    const nuclearPulse = Math.sin(time * 10) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, finalRadius * 0.2 * nuclearPulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * nuclearPulse})`;
    ctx.fill();
}
function drawAcidVortex(radius, ctx, time, planet, visualTimeScale) {
    ctx.save();
    ctx.rotate((planet.rotation || 0) * visualTimeScale * 4);
    const vortexLayers = 5;
    for (let layer = 0; layer < vortexLayers; layer++) {
        const layerProgress = (layer / vortexLayers);
        const vortexRadius = radius * (0.8 + layer * 0.3);
        const vortexThickness = radius * 0.1;
        const spinSpeed = 2 + layer * 0.5;
        ctx.save();
        ctx.rotate(time * spinSpeed + layer * Math.PI/4);
        const spiralPoints = 50;
        ctx.beginPath();
        for (let i = 0; i <= spiralPoints; i++) {
            const progress = i / spiralPoints;
            const angle = progress * Math.PI * 4;
            const spiralRadius = vortexRadius * progress;
            const x = Math.cos(angle) * spiralRadius;
            const y = Math.sin(angle) * spiralRadius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        const vortexGradient = ctx.createLinearGradient(0, -vortexRadius, 0, vortexRadius);
        vortexGradient.addColorStop(0, `rgba(255, 255, 0, ${0.8 - layer * 0.15})`);
        vortexGradient.addColorStop(0.5, `rgba(255, 165, 0, ${0.6 - layer * 0.12})`);
        vortexGradient.addColorStop(1, `rgba(255, 69, 0, ${0.4 - layer * 0.08})`);
        ctx.strokeStyle = vortexGradient;
        ctx.lineWidth = vortexThickness;
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}
function drawCorrosionAura(radius, ctx, time, intensity) {
    const baseAuraSize = radius * 4;
    const pulse = 1 + Math.sin(time * 3) * 0.2;
    const auraSize = baseAuraSize * pulse * (1 + intensity);
    const auraGradient = ctx.createRadialGradient(0, 0, radius, 0, 0, auraSize);
    auraGradient.addColorStop(0, `rgba(255, 255, 0, ${0.6 + intensity * 0.3})`);
    auraGradient.addColorStop(0.3, `rgba(255, 200, 0, ${0.4 + intensity * 0.2})`);
    auraGradient.addColorStop(0.6, `rgba(255, 100, 0, ${0.3 + intensity * 0.1})`);
    auraGradient.addColorStop(1, `rgba(255, 50, 0, 0)`);
    ctx.beginPath();
    ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
    ctx.fillStyle = auraGradient;
    ctx.fill();
    for (let i = 0; i < 8; i++) {
        const ringSize = auraSize * (0.3 + i * 0.1);
        const ringPulse = Math.sin(time * 5 + i) * 0.3 + 0.7;
        const alpha = (0.5 - i * 0.06) * (1 + intensity);
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 0, ${alpha})`;
        ctx.lineWidth = 3 + i * 0.5;
        ctx.stroke();
    }
}
function drawToxicEnergyRings(radius, ctx, time, planet, visualTimeScale, intensity) {
    ctx.save();
    ctx.rotate((planet.rotation || 0) * visualTimeScale * -2);
    const ringCount = 6;
    for (let i = 0; i < ringCount; i++) {
        const ringSize = radius * (1.5 + i * 0.7);
        const ringPulse = Math.sin(time * 4 + i) * 0.4 + 0.8;
        const alpha = (0.7 - i * 0.12) * (1 + intensity * 2);
        const ringWidth = 4 + i * 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 0, ${alpha})`;
        ctx.lineWidth = ringWidth;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 165, 0, ${alpha * 0.8})`;
        ctx.lineWidth = ringWidth * 0.6;
        ctx.stroke();
        const energyPoints = 12;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        for (let j = 0; j < energyPoints; j++) {
            const angle = (j / energyPoints) * Math.PI * 2 + time * 3;
            const pointSize = ringWidth * 0.8;
            const x = Math.cos(angle) * ringSize * ringPulse;
            const y = Math.sin(angle) * ringSize * ringPulse;
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.restore();
}
function drawHyperAcidJets(radius, ctx, time, planet, visualTimeScale, intensity) {
    const jetCount = 6;
    const baseJetLength = radius * 12;
    const jetLength = baseJetLength * (1 + intensity * 2);
    const jetWidthStart = radius * 0.3;
    const jetWidthEnd = radius * 2.5;
    ctx.save();
    ctx.rotate((planet.rotation || 0) * visualTimeScale * 5);
    for (let i = 0; i < jetCount; i++) {
        const angle = (i / jetCount) * Math.PI * 2;
        const jetIntensity = (Math.sin(time * 6 + angle * 2) + 1) * 0.5;
        const currentJetLength = jetLength * jetIntensity;
        ctx.save();
        ctx.rotate(angle);
        const jetGradient = ctx.createLinearGradient(0, 0, 0, -currentJetLength);
        jetGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * jetIntensity})`);
        jetGradient.addColorStop(0.1, `rgba(255, 255, 0, ${0.8 * jetIntensity})`);
        jetGradient.addColorStop(0.3, `rgba(255, 165, 0, ${0.7 * jetIntensity})`);
        jetGradient.addColorStop(0.6, `rgba(255, 69, 0, ${0.6 * jetIntensity})`);
        jetGradient.addColorStop(0.8, `rgba(200, 0, 0, ${0.4 * jetIntensity})`);
        jetGradient.addColorStop(1, `rgba(150, 0, 0, 0)`);
        ctx.beginPath();
        ctx.moveTo(-jetWidthStart/2, 0);
        ctx.lineTo(jetWidthStart/2, 0);
        ctx.lineTo(jetWidthEnd/2, -currentJetLength);
        ctx.lineTo(-jetWidthEnd/2, -currentJetLength);
        ctx.closePath();
        ctx.fillStyle = jetGradient;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * jetIntensity})`;
        ctx.lineWidth = 2;
        for (let j = 0; j < 3; j++) {
            const turbulenceProgress = j / 3;
            const turbulenceLength = currentJetLength * turbulenceProgress;
            const turbulenceWidth = jetWidthStart + (jetWidthEnd - jetWidthStart) * turbulenceProgress;
            ctx.beginPath();
            ctx.moveTo(-turbulenceWidth/3, -turbulenceLength);
            ctx.lineTo(turbulenceWidth/3, -turbulenceLength);
            ctx.stroke();
        }
        ctx.restore();
    }
    ctx.restore();
}
function drawCorrosiveVaporParticles(radius, ctx, time, intensity) {
    const particleCount = 50 * (1 + intensity * 3);
    for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time * 2;
        const orbitRadius = radius * (1.2 + Math.sin(time * 3 + i) * 0.5);
        const particleSize = radius * 0.08 * (0.5 + Math.sin(time * 4 + i) * 0.5);
        const pulse = Math.sin(time * 5 + i) * 0.5 + 0.5;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize);
        particleGradient.addColorStop(0, '#FFFFFF');
        particleGradient.addColorStop(0.3, '#FFFF00');
        particleGradient.addColorStop(0.7, '#FFA500');
        particleGradient.addColorStop(1, '#FF4500');
        ctx.fillStyle = particleGradient;
        ctx.fill();
        const tailLength = particleSize * 6 * pulse;
        const tailAngle = angle + Math.PI;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tailAngle);
        const tailGradient = ctx.createLinearGradient(0, 0, tailLength, 0);
        tailGradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
        tailGradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.5)');
        tailGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
        ctx.beginPath();
        ctx.moveTo(-particleSize/2, -particleSize/3);
        ctx.lineTo(tailLength, -particleSize/6);
        ctx.lineTo(tailLength, particleSize/6);
        ctx.lineTo(-particleSize/2, particleSize/3);
        ctx.closePath();
        ctx.fillStyle = tailGradient;
        ctx.fill();
        ctx.restore();
    }
}
function drawAcidForceField(radius, ctx, time, intensity) {
    const fieldRadius = radius * 3.5;
    const fieldPulse = 1 + Math.sin(time * 2) * 0.1;
    const fieldGradient = ctx.createRadialGradient(0, 0, radius * 1.5, 0, 0, fieldRadius);
    fieldGradient.addColorStop(0, `rgba(255, 255, 0, ${0.3 + intensity * 0.2})`);
    fieldGradient.addColorStop(0.5, `rgba(255, 200, 0, ${0.2 + intensity * 0.15})`);
    fieldGradient.addColorStop(0.8, `rgba(255, 100, 0, ${0.1 + intensity * 0.1})`);
    fieldGradient.addColorStop(1, `rgba(255, 50, 0, 0)`);
    ctx.globalAlpha = 0.4 + intensity * 0.3;
    ctx.beginPath();
    ctx.arc(0, 0, fieldRadius * fieldPulse, 0, Math.PI * 2);
    ctx.fillStyle = fieldGradient;
    ctx.fill();
    if (intensity > 0) {
        ctx.strokeStyle = `rgba(255, 255, 0, ${0.6 * intensity})`;
        ctx.lineWidth = 1;
        const hexSize = fieldRadius / 4;
        for (let ring = 1; ring <= 3; ring++) {
            const currentRadius = ring * hexSize;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * currentRadius;
                const y = Math.sin(angle) * currentRadius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
}
function drawNitricExplosion(radius, ctx, progress, time, planet) {
    const baseExplosionRadius = radius * (1 + progress * 15);
    const shockwaveRadius = baseExplosionRadius * 1.5;
    const corrosiveRadius = baseExplosionRadius * 2;
    const explosionIntensity = Math.min(1, progress * 3);
    const alpha = 0.9 * (1 - progress);
    if (alpha > 0.01) {
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, baseExplosionRadius * 0.3);
        coreGradient.addColorStop(0, `rgba(255, 255, 0, ${alpha * 0.9})`);
        coreGradient.addColorStop(0.7, `rgba(255, 200, 0, ${alpha * 0.7})`);
        coreGradient.addColorStop(1, `rgba(255, 100, 0, 0)`);
        ctx.beginPath();
        ctx.arc(0, 0, baseExplosionRadius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
        const mainExplosionGradient = ctx.createRadialGradient(0, 0, baseExplosionRadius * 0.2, 0, 0, baseExplosionRadius);
        mainExplosionGradient.addColorStop(0, `rgba(255, 255, 0, ${alpha * 0.8})`);
        mainExplosionGradient.addColorStop(0.3, `rgba(255, 165, 0, ${alpha * 0.7})`);
        mainExplosionGradient.addColorStop(0.6, `rgba(255, 69, 0, ${alpha * 0.6})`);
        mainExplosionGradient.addColorStop(0.8, `rgba(200, 0, 0, ${alpha * 0.4})`);
        mainExplosionGradient.addColorStop(1, `rgba(150, 0, 0, 0)`);
        ctx.beginPath();
        ctx.arc(0, 0, baseExplosionRadius, 0, Math.PI * 2);
        ctx.fillStyle = mainExplosionGradient;
        ctx.fill();
        for (let i = 0; i < 3; i++) {
            const shockwaveProgress = progress + (i * 0.1);
            if (shockwaveProgress <= 1) {
                const shockSize = shockwaveRadius * (0.8 + i * 0.3) * shockwaveProgress;
                const shockAlpha = alpha * (0.6 - i * 0.2) * (1 - shockwaveProgress);
                ctx.beginPath();
                ctx.arc(0, 0, shockSize, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${shockAlpha})`;
                ctx.lineWidth = 15 * (1 - shockwaveProgress);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = alpha * 0.8;
        const particleCount = 200 * explosionIntensity;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = baseExplosionRadius * (0.1 + Math.random() * 0.9);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = radius * 0.15 * (0.5 + Math.random());
            const colorVariation = Math.random();
            let particleColor;
            if (colorVariation < 0.33) {
                particleColor = `rgba(255, 255, 0, ${0.7 + Math.random() * 0.3})`;
            } else if (colorVariation < 0.66) {
                particleColor = `rgba(255, 165, 0, ${0.7 + Math.random() * 0.3})`;
            } else {
                particleColor = `rgba(255, 69, 0, ${0.7 + Math.random() * 0.3})`;
            }
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
            const tailLength = size * 3;
            const tailAngle = angle + Math.PI;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(tailAngle);
            const tailGradient = ctx.createLinearGradient(0, 0, tailLength, 0);
            tailGradient.addColorStop(0, particleColor);
            tailGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
            ctx.beginPath();
            ctx.moveTo(-size/2, 0);
            ctx.lineTo(tailLength, -size/4);
            ctx.lineTo(tailLength, size/4);
            ctx.lineTo(-size/2, 0);
            ctx.fillStyle = tailGradient;
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
        ctx.globalAlpha = alpha * 0.6;
        const rayCount = 36 * explosionIntensity;
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + time * 2;
            const rayLength = baseExplosionRadius * (1.2 + Math.random() * 0.8);
            const rayWidth = baseExplosionRadius * 0.05;
            ctx.save();
            ctx.rotate(angle);
            const rayGradient = ctx.createLinearGradient(0, 0, rayLength, 0);
            rayGradient.addColorStop(0, 'rgba(255, 255, 0, 0.9)');
            rayGradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.7)');
            rayGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
            ctx.beginPath();
            ctx.moveTo(0, -rayWidth/2);
            ctx.lineTo(rayLength, -rayWidth/4);
            ctx.lineTo(rayLength, rayWidth/4);
            ctx.lineTo(0, rayWidth/2);
            ctx.closePath();
            ctx.fillStyle = rayGradient;
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
        for (let i = 0; i < 5; i++) {
            const ringProgress = progress + (i * 0.15);
            if (ringProgress <= 1) {
                const ringSize = baseExplosionRadius * (0.5 + i * 0.3) * ringProgress;
                const ringAlpha = alpha * (0.5 - i * 0.1) * (1 - ringProgress);
                const pulse = Math.sin(time * 10 + i) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.arc(0, 0, ringSize * pulse, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 0, ${ringAlpha})`;
                ctx.lineWidth = 8 * (1 - ringProgress);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, ringSize * pulse * 0.8, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 165, 0, ${ringAlpha * 0.8})`;
                ctx.lineWidth = 4 * (1 - ringProgress);
                ctx.stroke();
            }
        }
        if (graphicsQuality === 'high') {
            ctx.globalAlpha = alpha * 0.3;
            const distortionPoints = 24;
            for (let i = 0; i < distortionPoints; i++) {
                const angle = (i / distortionPoints) * Math.PI * 2;
                const distortionDistance = baseExplosionRadius * (0.8 + Math.random() * 0.4);
                const distortionSize = baseExplosionRadius * 0.1;
                ctx.save();
                ctx.rotate(angle);
                ctx.translate(distortionDistance, 0);
                const distortionGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, distortionSize);
                distortionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                distortionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.beginPath();
                ctx.arc(0, 0, distortionSize, 0, Math.PI * 2);
                ctx.fillStyle = distortionGradient;
                ctx.fill();
                ctx.restore();
            }
            ctx.globalAlpha = 1;
        }
        ctx.save();
        ctx.rotate(time * 5);
        for (let i = 0; i < 8; i++) {
            const bandAngle = (i / 8) * Math.PI * 2;
            const bandLength = baseExplosionRadius * 1.5;
            const bandWidth = baseExplosionRadius * 0.08;
            ctx.save();
            ctx.rotate(bandAngle);
            const bandGradient = ctx.createLinearGradient(0, 0, bandLength, 0);
            bandGradient.addColorStop(0, 'rgba(255, 255, 0, 0)');
            bandGradient.addColorStop(0.3, 'rgba(255, 255, 0, 0.8)');
            bandGradient.addColorStop(0.7, 'rgba(255, 165, 0, 0.6)');
            bandGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
            ctx.beginPath();
            ctx.moveTo(0, -bandWidth/2);
            ctx.lineTo(bandLength, -bandWidth/4);
            ctx.lineTo(bandLength, bandWidth/4);
            ctx.lineTo(0, bandWidth/2);
            ctx.closePath();
            ctx.fillStyle = bandGradient;
            ctx.fill();
            ctx.restore();
        }
        ctx.restore();
    }
}
function drawNitricUltimateOutline(radius, ctx, intensity) {
    const outlinePulse = 1 + Math.sin(Date.now() * 0.008) * intensity * 0.4;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4 + intensity * 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius * outlinePulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 + intensity * 0.2})`;
    ctx.lineWidth = 2 + intensity;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95 * outlinePulse, 0, Math.PI * 2);
    ctx.stroke();
    if (intensity > 0) {
        ctx.strokeStyle = `rgba(255, 255, 0, ${intensity * 0.7})`;
        ctx.lineWidth = 6 * intensity;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(255, 165, 0, ${intensity * 0.5})`;
        ctx.lineWidth = 3 * intensity;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
        ctx.stroke();
    }
}
function transformToMeteoroid(obj) {
    if (obj.petrified && obj.type === 'meteoroid') return;
    console.log(`Petrifying ${obj.type} into meteoroid`);
    if (!obj.originalType) obj.originalType = obj.type;
    if (!obj.originalColor) obj.originalColor = obj.color;
    if (!obj.originalRadius) obj.originalRadius = obj.radius;
    obj.petrified = true;
    obj.petrificationTime = Date.now();
    obj.type = 'meteoroid';
    obj.color = '#666666';
    obj.radius = Math.max(obj.radius * 0.8, 5);
    obj.rocketBehavior = null;
    obj.spaceshipBehavior = null;
    obj.satelliteBehavior = null;
    obj.superShipBehavior = null;
    createPetrificationEffect(obj);
}
function drawRadiationAura(medusaRadius, ctx, explosionIntensity, time) {
    const baseAuraSize = medusaRadius * 2.5;
    const pulse = 1 + Math.sin(time * 2) * 0.1;
    const auraSize = baseAuraSize * pulse * (1 + explosionIntensity * 0.5);
    const auraGradient = ctx.createRadialGradient(0, 0, medusaRadius, 0, 0, auraSize);
    auraGradient.addColorStop(0, `rgba(0, 255, 0, ${0.4 + explosionIntensity * 0.3})`);
    auraGradient.addColorStop(0.7, `rgba(0, 150, 0, ${0.2 + explosionIntensity * 0.2})`);
    auraGradient.addColorStop(1, 'rgba(0, 50, 0, 0)');
    ctx.beginPath();
    ctx.arc(0, 0, auraSize, 0, Math.PI * 2);
    ctx.fillStyle = auraGradient;
    ctx.fill();
    if (explosionIntensity > 0) {
        ctx.globalAlpha = 0.3 * explosionIntensity;
        for (let i = 0; i < 4; i++) {
            const ringSize = auraSize * (0.8 + i * 0.4);
            const ringPulse = Math.sin(time * 3 + i) * 0.2 + 0.8;
            ctx.beginPath();
            ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 0, ${0.6 - i * 0.15})`;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
}
function drawPulsatingCore(medusaRadius, ctx, time, explosionIntensity) {
    const corePulse = 1 + Math.sin(time * 4) * 0.15;
    const explosionPulse = 1 + explosionIntensity * 0.3;
    const finalRadius = medusaRadius * corePulse * explosionPulse;
    const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, finalRadius);
    starGradient.addColorStop(0, '#FFFFFF');
    starGradient.addColorStop(0.1, '#90EE90');
    starGradient.addColorStop(0.3, '#00FF00');
    starGradient.addColorStop(0.6, '#006400');
    starGradient.addColorStop(1, '#003300');
    ctx.beginPath();
    ctx.arc(0, 0, finalRadius, 0, Math.PI * 2);
    ctx.fillStyle = starGradient;
    ctx.fill();
    ctx.save();
    ctx.rotate(time * 0.5);
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const surfaceDistortion = Math.sin(angle * 3 + time * 2) * 0.1;
        const surfaceRadius = finalRadius * (0.9 + surfaceDistortion);
        ctx.beginPath();
        ctx.arc(0, 0, surfaceRadius, angle - 0.1, angle + 0.1);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + explosionIntensity * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    ctx.restore();
}
function drawEnergyTentacles(medusaRadius, ctx, time, planet, visualTimeScale) {
    ctx.save();
    ctx.rotate((planet.rotation || 0) * visualTimeScale);
    const tentacles = 8;
    for (let i = 0; i < tentacles; i++) {
        const baseAngle = (i / tentacles) * Math.PI * 2;
        const tentacleLength = medusaRadius * 0.6;
        const tentacleWidth = medusaRadius * 0.08;
        const waveOffset = Math.sin(time * 2 + i) * 0.3;
        const currentAngle = baseAngle + waveOffset;
        ctx.save();
        ctx.rotate(currentAngle);
        const tentacleGradient = ctx.createLinearGradient(0, 0, tentacleLength, 0);
        tentacleGradient.addColorStop(0, '#00FF00');
        tentacleGradient.addColorStop(0.5, '#39FF14');
        tentacleGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(0, -tentacleWidth/2);
        ctx.quadraticCurveTo(
            tentacleLength * 0.3, -tentacleWidth/2 * (1 + waveOffset),
            tentacleLength, -tentacleWidth/4
        );
        ctx.lineTo(tentacleLength, tentacleWidth/4);
        ctx.quadraticCurveTo(
            tentacleLength * 0.3, tentacleWidth/2 * (1 + waveOffset),
            0, tentacleWidth/2
        );
        ctx.closePath();
        ctx.fillStyle = tentacleGradient;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -tentacleWidth/4);
        ctx.quadraticCurveTo(
            tentacleLength * 0.3, -tentacleWidth/4 * (1 + waveOffset),
            tentacleLength * 0.8, -tentacleWidth/8
        );
        ctx.lineTo(tentacleLength * 0.8, tentacleWidth/8);
        ctx.quadraticCurveTo(
            tentacleLength * 0.3, tentacleWidth/4 * (1 + waveOffset),
            0, tentacleWidth/4
        );
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();
}
function drawExplosionJets(medusaRadius, ctx, planet, explosionProgress) {
    const jetIntensity = explosionProgress / 0.4;
    const jetLength = medusaRadius * 20 * jetIntensity;
    const jetWidthStart = medusaRadius * 0.4 * jetIntensity;
    const jetWidthEnd = medusaRadius * 3 * jetIntensity;
    ctx.save();
    ctx.rotate(planet.jetAngle || 0);
    const jetGradient = ctx.createLinearGradient(0, 0, 0, -jetLength);
    jetGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    jetGradient.addColorStop(0.1, 'rgba(0, 255, 0, 0.9)');
    jetGradient.addColorStop(0.3, 'rgba(0, 200, 0, 0.8)');
    jetGradient.addColorStop(0.6, 'rgba(0, 150, 0, 0.6)');
    jetGradient.addColorStop(1, 'rgba(0, 100, 0, 0)');
    ctx.globalAlpha = 0.9 * jetIntensity;
    ctx.beginPath();
    ctx.moveTo(-jetWidthStart/2, 0);
    ctx.lineTo(jetWidthStart/2, 0);
    ctx.lineTo(jetWidthEnd/2, -jetLength);
    ctx.lineTo(-jetWidthEnd/2, -jetLength);
    ctx.closePath();
    ctx.fillStyle = jetGradient;
    ctx.fill();
    ctx.rotate(Math.PI);
    ctx.beginPath();
    ctx.moveTo(-jetWidthStart/2, 0);
    ctx.lineTo(jetWidthStart/2, 0);
    ctx.lineTo(jetWidthEnd/2, -jetLength);
    ctx.lineTo(-jetWidthEnd/2, -jetLength);
    ctx.closePath();
    ctx.fillStyle = jetGradient;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
}
function drawRadiationRings(medusaRadius, ctx, explosionProgress, time) {
    const radiationIntensity = explosionProgress;
    for (let i = 0; i < 6; i++) {
        const ringSize = medusaRadius * (1.5 + i * 0.8);
        const ringPulse = Math.sin(time * 4 + i) * 0.3 + 0.7;
        const alpha = (0.5 - i * 0.08) * radiationIntensity;
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124, 252, 0, ${alpha})`;
        ctx.lineWidth = 2 + i * 0.5;
        ctx.stroke();
    }
    ctx.globalAlpha = 0.4 * radiationIntensity;
    const rays = 16;
    for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + time;
        const rayLength = medusaRadius * (6 + radiationIntensity * 4);
        const rayWidth = medusaRadius * 0.15;
        ctx.save();
        ctx.rotate(angle);
        const rayGradient = ctx.createLinearGradient(0, 0, rayLength, 0);
        rayGradient.addColorStop(0, '#7CFC00');
        rayGradient.addColorStop(0.7, 'rgba(124, 252, 0, 0.5)');
        rayGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(0, -rayWidth/2);
        ctx.lineTo(rayLength, -rayWidth/4);
        ctx.lineTo(rayLength, rayWidth/4);
        ctx.lineTo(0, rayWidth/2);
        ctx.closePath();
        ctx.fillStyle = rayGradient;
        ctx.fill();
        ctx.restore();
    }
    ctx.globalAlpha = 1;
}
function drawPetrificationField(medusaRadius, ctx, explosionProgress) {
    const fieldRadius = medusaRadius * 8;
    const fieldIntensity = Math.max(0, (explosionProgress - 0.2) / 0.6);
    if (fieldIntensity > 0) {
        ctx.globalAlpha = 0.2 * fieldIntensity;
        const fieldGradient = ctx.createRadialGradient(0, 0, medusaRadius * 2, 0, 0, fieldRadius);
        fieldGradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
        fieldGradient.addColorStop(0.5, 'rgba(0, 150, 0, 0.2)');
        fieldGradient.addColorStop(1, 'rgba(0, 100, 0, 0)');
        ctx.beginPath();
        ctx.arc(0, 0, fieldRadius, 0, Math.PI * 2);
        ctx.fillStyle = fieldGradient;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 255, 0, ${0.4 * fieldIntensity})`;
        ctx.lineWidth = 1;
        const gridSize = fieldRadius / 4;
        for (let i = -4; i <= 4; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, fieldRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(i * gridSize, -fieldRadius);
            ctx.lineTo(i * gridSize, fieldRadius);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-fieldRadius, i * gridSize);
            ctx.lineTo(fieldRadius, i * gridSize);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
}
function drawFloatingParticles(medusaRadius, ctx, time) {
    ctx.globalAlpha = 0.7;
    const particles = 12;
    for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2 + time;
        const orbitRadius = medusaRadius * (1.3 + Math.sin(time * 1.5 + i) * 0.2);
        const particleSize = medusaRadius * 0.04 * (0.8 + Math.sin(time * 3 + i) * 0.4);
        const pulse = Math.sin(time * 4 + i) * 0.5 + 0.5;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize);
        particleGradient.addColorStop(0, '#FFFFFF');
        particleGradient.addColorStop(0.7, '#90EE90');
        particleGradient.addColorStop(1, '#00FF00');
        ctx.fillStyle = particleGradient;
        ctx.fill();
        const tailLength = particleSize * 3;
        const tailAngle = angle + Math.PI;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tailAngle);
        const tailGradient = ctx.createLinearGradient(0, 0, tailLength, 0);
        tailGradient.addColorStop(0, 'rgba(144, 238, 144, 0.8)');
        tailGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(0, -particleSize/2);
        ctx.lineTo(tailLength, -particleSize/4);
        ctx.lineTo(tailLength, particleSize/4);
        ctx.lineTo(0, particleSize/2);
        ctx.closePath();
        ctx.fillStyle = tailGradient;
        ctx.fill();
        ctx.restore();
    }
    ctx.globalAlpha = 1;
}
function drawNuclearCore(medusaRadius, ctx) {
    const coreRadius = medusaRadius * 0.4;
    const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
    coreGradient.addColorStop(0, '#FFFFFF');
    coreGradient.addColorStop(0.3, '#90EE90');
    coreGradient.addColorStop(0.7, '#00FF00');
    coreGradient.addColorStop(1, '#006400');
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();
    const brightSpot = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius * 0.3);
    brightSpot.addColorStop(0, '#FFFFFF');
    brightSpot.addColorStop(1, 'rgba(144, 238, 144, 0.5)');
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = brightSpot;
    ctx.fill();
}
function drawAccretionDisk(innerRadius, outerRadius, colors, rotation = 0, planet = null) {
    ctx.save();
    ctx.rotate(rotation);
    const diskGradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius);
    colors.forEach((color, i) => {
        const stopPosition = i / (colors.length - 1);
        diskGradient.addColorStop(stopPosition, color);
    });
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = diskGradient;
    ctx.fill();
    if (graphicsQuality === 'high' && planet) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const spiralTurns = 2;
            ctx.beginPath();
            for (let t = 0; t <= 100; t++) {
                const progress = t / 100;
                const angle = progress * Math.PI * 2 * spiralTurns + rotation;
                const spiralRadius = innerRadius + progress * (outerRadius - innerRadius);
                const x = Math.cos(angle) * spiralRadius;
                const y = Math.sin(angle) * spiralRadius;
                if (t === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }
    ctx.restore();
}
function drawJet(length, startWidth, endWidth, colorStops) {
    const jetGradient = ctx.createLinearGradient(0, 0, 0, -length);
    colorStops.forEach(stop => {
        jetGradient.addColorStop(stop.position, stop.color);
    });
    if (length > 100) {
        ctx.filter = `blur(${Math.min(8, length * 0.02)}px)`;
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
    if (graphicsQuality === 'high') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-startWidth/4, 0);
        ctx.lineTo(-endWidth/4, -length);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startWidth/4, 0);
        ctx.lineTo(endWidth/4, -length);
        ctx.stroke();
    }
}
function hexToRgba(hex, alpha) {
    if (!hex) return `rgba(255,255,255,${alpha})`;
    let c = hex.replace('#','');
    if (c.length === 3) c = c.split('').map(ch => ch+ch).join('');
    const r = parseInt(c.substring(0,2),16);
    const g = parseInt(c.substring(2,4),16);
    const b = parseInt(c.substring(4,6),16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function drawChronosStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const chronosRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    const pulse = Math.sin(time * 3) * 0.2 + 1;
    const chronosGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, chronosRadius * pulse);
    chronosGradient.addColorStop(0, '#87CEEB');
    chronosGradient.addColorStop(0.3, '#00BFFF');
    chronosGradient.addColorStop(0.7, '#00008B');
    chronosGradient.addColorStop(1, '#191970');
    ctx.beginPath();
    ctx.arc(0, 0, chronosRadius * pulse, 0, Math.PI * 2);
    ctx.fillStyle = chronosGradient;
    ctx.fill();
    for (let i = 0; i < 6; i++) {
        const ringSize = chronosRadius * (1.3 + i * 0.4);
        const ringSpeed = 0.5 + i * 0.3;
        const rotation = time * ringSpeed;
        ctx.save();
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.arc(0, 0, ringSize, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(135, 206, 235, ${0.5 - i * 0.08})`;
        ctx.lineWidth = 2 + i * 0.5;
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
        for (let j = 0; j < 12; j++) {
            const markerAngle = (j / 12) * Math.PI * 2;
            const markerX = Math.cos(markerAngle) * ringSize;
            const markerY = Math.sin(markerAngle) * ringSize;
            ctx.beginPath();
            ctx.arc(markerX, markerY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - j * 0.06})`;
            ctx.fill();
        }
        ctx.restore();
    }
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 8; i++) {
            const waveSize = chronosRadius * (1.5 + Math.sin(time * 2 + i) * 0.3);
            ctx.beginPath();
            ctx.arc(0, 0, waveSize, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.4 - i * 0.05})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }
    try {
        const now = Date.now();
        if (planet._chronosVisualColor && planet._chronosVisualUntil && now <= planet._chronosVisualUntil) {
            const remaining = planet._chronosVisualUntil - now;
            const total = Math.max(200, (planet._chronosVisualDuration || 1000));
            const t = Math.max(0, Math.min(1, remaining / total));
            ctx.globalCompositeOperation = 'lighter';
            const overlay = ctx.createRadialGradient(0, 0, 0, 0, 0, chronosRadius * 1.2);
            overlay.addColorStop(0, hexToRgba(planet._chronosVisualColor, 0.7 * t));
            overlay.addColorStop(1, hexToRgba(planet._chronosVisualColor, 0));
            ctx.beginPath();
            ctx.arc(0, 0, chronosRadius * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = overlay;
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
    } catch (e) { }
}
function drawPhantomStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const phantomRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.002;
    const phase = (Math.sin(time * 1.5) + Math.sin(time * 0.7)) * 0.25 + 0.5;
    const ghostAlpha = 0.15 + phase * 0.7;
    ctx.save();
    if (graphicsQuality !== 'low') {
        const auraGradient = ctx.createRadialGradient(0, 0, phantomRadius * 0.5, 0, 0, phantomRadius * 3);
        auraGradient.addColorStop(0, 'rgba(148, 0, 211, 0.1)');
        auraGradient.addColorStop(0.3, 'rgba(75, 0, 130, 0.05)');
        auraGradient.addColorStop(1, 'transparent');
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, phantomRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = auraGradient;
        ctx.fill();
        ctx.globalAlpha = ghostAlpha;
    }
    const corePulse = 1 + Math.sin(time * 3) * 0.4;
    const phantomGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, phantomRadius * corePulse);
    phantomGradient.addColorStop(0, '#EE82EE');
    phantomGradient.addColorStop(0.2, '#DA70D6');
    phantomGradient.addColorStop(0.5, '#9400D3');
    phantomGradient.addColorStop(0.8, '#4B0082');
    phantomGradient.addColorStop(1, '#2E004F');
    ctx.beginPath();
    ctx.arc(0, 0, phantomRadius * corePulse, 0, Math.PI * 2);
    ctx.fillStyle = phantomGradient;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.8;
        const fragments = 16;
        for (let i = 0; i < fragments; i++) {
            const fragmentTime = time * 2 + i * 0.4;
            const fragmentAngle = (i / fragments) * Math.PI * 2 + fragmentTime * 0.5;
            const fragmentDistance = phantomRadius * (1.2 + Math.sin(fragmentTime * 1.3) * 0.6);
            const fragmentSize = phantomRadius * 0.15 * (0.7 + Math.sin(fragmentTime * 2) * 0.5);
            const fragmentAlpha = (Math.sin(fragmentTime * 3) + 1) * 0.4;
            ctx.globalAlpha = fragmentAlpha * 0.8;
            ctx.save();
            ctx.rotate(fragmentAngle);
            ctx.translate(fragmentDistance, 0);
            ctx.beginPath();
            for (let j = 0; j < 8; j++) {
                const angle = (j / 8) * Math.PI * 2;
                const irregularity = 0.3 + Math.sin(fragmentTime + j) * 0.2;
                const dist = fragmentSize * (0.7 + Math.sin(angle * 3 + fragmentTime) * irregularity);
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            const fragmentGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, fragmentSize);
            fragmentGradient.addColorStop(0, '#FFFFFF');
            fragmentGradient.addColorStop(0.3, '#DDA0DD');
            fragmentGradient.addColorStop(1, '#9400D3');
            ctx.fillStyle = fragmentGradient;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, fragmentSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fill();
            ctx.restore();
        }
    }
    ctx.globalAlpha = ghostAlpha * 0.7;
    const spectralRays = 24;
    for (let i = 0; i < spectralRays; i++) {
        const rayAngle = (i / spectralRays) * Math.PI * 2 + time;
        const rayPulse = Math.sin(time * 4 + i) * 0.5 + 0.5;
        const rayLength = phantomRadius * (4 + rayPulse * 3);
        const rayWidth = phantomRadius * 0.12;
        ctx.save();
        ctx.rotate(rayAngle);
        const rayGradient = ctx.createLinearGradient(0, 0, 0, -rayLength);
        rayGradient.addColorStop(0, `rgba(238, 130, 238, ${0.9})`);
        rayGradient.addColorStop(0.3, `rgba(218, 112, 214, ${0.7})`);
        rayGradient.addColorStop(0.6, `rgba(148, 0, 211, ${0.5})`);
        rayGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(-rayWidth/2, 0);
        ctx.lineTo(rayWidth/2, 0);
        ctx.lineTo(rayWidth/4, -rayLength);
        ctx.lineTo(-rayWidth/4, -rayLength);
        ctx.closePath();
        ctx.fillStyle = rayGradient;
        ctx.fill();
        ctx.restore();
    }
    ctx.globalAlpha = ghostAlpha * 0.4;
    for (let i = 0; i < 4; i++) {
        const ringSize = phantomRadius * (1.8 + i * 0.7);
        const ringPulse = Math.sin(time * 2 + i) * 0.3 + 0.8;
        const ringAlpha = 0.6 - i * 0.15;
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(218, 112, 214, ${ringAlpha})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.stroke();
        const energyPoints = 8;
        ctx.fillStyle = `rgba(255, 255, 255, ${ringAlpha})`;
        for (let j = 0; j < energyPoints; j++) {
            const pointAngle = (j / energyPoints) * Math.PI * 2 + time;
            const pointX = Math.cos(pointAngle) * ringSize * ringPulse;
            const pointY = Math.sin(pointAngle) * ringSize * ringPulse;
            ctx.beginPath();
            ctx.arc(pointX, pointY, phantomRadius * 0.05, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.restore();
}
function drawVortexStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const vortexRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.002;
    ctx.save();
    ctx.rotate(time * 2);
    for (let layer = 0; layer < 4; layer++) {
        const layerRadius = vortexRadius * (0.4 + layer * 0.2);
        const points = 8 + layer * 4;
        const layerRotation = time * (1 + layer * 0.5);
        ctx.save();
        ctx.rotate(layerRotation);
        ctx.beginPath();
        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const radiusVar = layerRadius * (0.7 + Math.sin(angle * 5 + time * 3) * 0.3);
            const x = Math.cos(angle) * radiusVar;
            const y = Math.sin(angle) * radiusVar;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const vortexGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerRadius);
        vortexGradient.addColorStop(0, '#32CD32');
        vortexGradient.addColorStop(0.7, '#008000');
        vortexGradient.addColorStop(1, '#006400');
        ctx.fillStyle = vortexGradient;
        ctx.fill();
        ctx.restore();
    }
    for (let i = 0; i < 3; i++) {
        const spiralTurns = 3;
        const spiralMaxRadius = vortexRadius * 2.5;
        ctx.beginPath();
        for (let t = 0; t <= 100; t++) {
            const progress = t / 100;
            const angle = progress * Math.PI * 2 * spiralTurns + time * 2 + i * Math.PI * 2/3;
            const spiralRadius = progress * spiralMaxRadius;
            const x = Math.cos(angle) * spiralRadius;
            const y = Math.sin(angle) * spiralRadius;
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(50, 205, 50, ${0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    ctx.restore();
}
function drawCrystalStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const crystalRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    const crystalGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, crystalRadius);
    crystalGradient.addColorStop(0, '#E6E6FA');
    crystalGradient.addColorStop(0.3, '#9370DB');
    crystalGradient.addColorStop(0.7, '#8A2BE2');
    crystalGradient.addColorStop(1, '#4B0082');
    ctx.beginPath();
    ctx.arc(0, 0, crystalRadius, 0, Math.PI * 2);
    ctx.fillStyle = crystalGradient;
    ctx.fill();
    const facets = 16;
    for (let i = 0; i < facets; i++) {
        const angle1 = (i / facets) * Math.PI * 2;
        const angle2 = ((i + 1) / facets) * Math.PI * 2;
        const facetPulse = 1 + Math.sin(time * 2 + i) * 0.2;
        const innerRadius = crystalRadius * 0.6 * facetPulse;
        const outerRadius = crystalRadius * 1.2 * facetPulse;
        const x1 = Math.cos(angle1) * innerRadius;
        const y1 = Math.sin(angle1) * innerRadius;
        const x2 = Math.cos(angle2) * innerRadius;
        const y2 = Math.sin(angle2) * innerRadius;
        const x3 = Math.cos((angle1 + angle2) / 2) * outerRadius;
        const y3 = Math.sin((angle1 + angle2) / 2) * outerRadius;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        const facetGradient = ctx.createLinearGradient(x1, y1, x3, y3);
        facetGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        facetGradient.addColorStop(1, 'rgba(230, 230, 250, 0.3)');
        ctx.fillStyle = facetGradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < 8; i++) {
            const reflexAngle = (i / 8) * Math.PI * 2 + time;
            const reflexDistance = crystalRadius * 0.3;
            const reflexSize = crystalRadius * 0.15;
            ctx.save();
            ctx.rotate(reflexAngle);
            ctx.translate(reflexDistance, 0);
            ctx.beginPath();
            ctx.arc(0, 0, reflexSize, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
}
function drawNeuralStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const neuralRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.002;
    const neuralGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, neuralRadius);
    neuralGradient.addColorStop(0, '#FF69B4');
    neuralGradient.addColorStop(0.5, '#DC143C');
    neuralGradient.addColorStop(1, '#8B0000');
    ctx.beginPath();
    ctx.arc(0, 0, neuralRadius, 0, Math.PI * 2);
    ctx.fillStyle = neuralGradient;
    ctx.fill();
    const neurons = 12;
    const neuronPositions = [];
    for (let i = 0; i < neurons; i++) {
        const angle = (i / neurons) * Math.PI * 2;
        const distance = neuralRadius * (0.4 + Math.random() * 0.4);
        const neuronX = Math.cos(angle) * distance;
        const neuronY = Math.sin(angle) * distance;
        const neuronSize = neuralRadius * 0.1 * (0.8 + Math.sin(time * 3 + i) * 0.4);
        neuronPositions.push({ x: neuronX, y: neuronY, size: neuronSize });
        ctx.beginPath();
        ctx.arc(neuronX, neuronY, neuronSize, 0, Math.PI * 2);
        const neuronGradient = ctx.createRadialGradient(neuronX, neuronY, 0, neuronX, neuronY, neuronSize);
        neuronGradient.addColorStop(0, '#FFFFFF');
        neuronGradient.addColorStop(1, '#FF69B4');
        ctx.fillStyle = neuronGradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(neuronX, neuronY, neuronSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#DC143C';
        ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    for (let i = 0; i < neurons; i++) {
        for (let j = i + 1; j < neurons; j++) {
            if (Math.random() > 0.7) {
                const neuronA = neuronPositions[i];
                const neuronB = neuronPositions[j];
                ctx.beginPath();
                ctx.moveTo(neuronA.x, neuronA.y);
                ctx.lineTo(neuronB.x, neuronB.y);
                ctx.stroke();
                const pulseProgress = (time * 2) % 1;
                const pulseX = neuronA.x + (neuronB.x - neuronA.x) * pulseProgress;
                const pulseY = neuronA.y + (neuronB.y - neuronA.y) * pulseProgress;
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, neuralRadius * 0.03, 0, Math.PI * 2);
                ctx.fillStyle = '#FFFF00';
                ctx.fill();
            }
        }
    }
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, neuralRadius * 1.5, 0, Math.PI * 2);
        const awarenessGradient = ctx.createRadialGradient(0, 0, neuralRadius, 0, 0, neuralRadius * 1.5);
        awarenessGradient.addColorStop(0, 'rgba(255, 105, 180, 0.5)');
        awarenessGradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
        ctx.fillStyle = awarenessGradient;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}
function drawHologramStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const hologramRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.0015;
    const layers = 4;
    for (let layer = 0; layer < layers; layer++) {
        const layerOffset = layer * 0.3;
        const layerSize = hologramRadius * (0.8 + layer * 0.15);
        const layerRotation = time * (0.5 + layer * 0.3);
        ctx.save();
        ctx.rotate(layerRotation);
        ctx.translate(layerOffset, layerOffset);
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - layer * 0.08})`;
        ctx.lineWidth = 1;
        const gridLines = 8;
        for (let i = -gridLines; i <= gridLines; i++) {
            const pos = (i / gridLines) * layerSize;
            ctx.beginPath();
            ctx.moveTo(-layerSize, pos);
            ctx.lineTo(layerSize, pos);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pos, -layerSize);
            ctx.lineTo(pos, layerSize);
            ctx.stroke();
        }
        const projections = 3;
        for (let i = 0; i < projections; i++) {
            const projAngle = (i / projections) * Math.PI * 2 + time;
            const projDistance = layerSize * 0.5;
            const projSize = layerSize * 0.4;
            ctx.save();
            ctx.rotate(projAngle);
            ctx.translate(projDistance, 0);
            ctx.beginPath();
            ctx.arc(0, 0, projSize, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.6})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
    const corePulse = 1 + Math.sin(time * 4) * 0.3;
    const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, hologramRadius * 0.3 * corePulse);
    coreGradient.addColorStop(0, '#00FFFF');
    coreGradient.addColorStop(1, '#008B8B');
    ctx.beginPath();
    ctx.arc(0, 0, hologramRadius * 0.3 * corePulse, 0, Math.PI * 2);
    ctx.fillStyle = coreGradient;
    ctx.fill();
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.2;
        for (let i = 0; i < 20; i++) {
            const noiseX = (Math.random() - 0.5) * hologramRadius * 2;
            const noiseY = (Math.random() - 0.5) * hologramRadius * 2;
            const noiseSize = hologramRadius * 0.1 * Math.random();
            ctx.beginPath();
            ctx.arc(noiseX, noiseY, noiseSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.3})`;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}
function drawQuantumFoamStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const foamRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.004;
    const foamGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, foamRadius);
    foamGradient.addColorStop(0, '#F0E68C');
    foamGradient.addColorStop(0.5, '#DAA520');
    foamGradient.addColorStop(1, '#B8860B');
    ctx.beginPath();
    ctx.arc(0, 0, foamRadius, 0, Math.PI * 2);
    ctx.fillStyle = foamGradient;
    ctx.fill();
    const bubbles = 25;
    for (let i = 0; i < bubbles; i++) {
        const angle = (i / bubbles) * Math.PI * 2;
        const baseDistance = foamRadius * 0.3;
        const wobble = Math.sin(time * 2 + i) * 0.2;
        const distance = baseDistance * (1 + wobble);
        const bubbleX = Math.cos(angle) * distance;
        const bubbleY = Math.sin(angle) * distance;
        const bubbleSize = foamRadius * 0.08 * (0.7 + Math.sin(time * 3 + i) * 0.5);
        const visibility = (Math.sin(time * 4 + i) + 1) / 2;
        if (visibility > 0.3) {
            ctx.globalAlpha = visibility;
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
            const bubbleGradient = ctx.createRadialGradient(bubbleX, bubbleY, 0, bubbleX, bubbleY, bubbleSize);
            bubbleGradient.addColorStop(0, '#FFFFFF');
            bubbleGradient.addColorStop(0.7, '#F0E68C');
            bubbleGradient.addColorStop(1, 'rgba(218, 165, 32, 0)');
            ctx.fillStyle = bubbleGradient;
            ctx.fill();
            ctx.strokeStyle = '#DAA520';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < 15; i++) {
            const fluctuationAngle = Math.random() * Math.PI * 2;
            const fluctuationDistance = foamRadius * (0.5 + Math.random() * 0.5);
            const fluctuationSize = foamRadius * 0.05 * Math.random();
            ctx.save();
            ctx.rotate(fluctuationAngle);
            ctx.translate(fluctuationDistance, 0);
            ctx.beginPath();
            ctx.arc(0, 0, fluctuationSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
    const boilSize = foamRadius * (1 + Math.sin(time * 5) * 0.1);
    ctx.beginPath();
    ctx.arc(0, 0, boilSize, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    try {
        const now = Date.now();
        if (planet._quantumEjectUntil && now <= planet._quantumEjectUntil) {
            const jetAngles = planet._quantumJetAngles || [ -Math.PI/6, Math.PI/6 ];
            const jetLen = foamRadius * 1.6;
            const startW = Math.max(6, foamRadius * 0.25);
            const endW = Math.max(2, foamRadius * 0.05);
            jetAngles.forEach(a => {
                ctx.save();
                ctx.rotate(a);
                const stops = [
                    { position: 0, color: 'rgba(255,255,180,0.9)' },
                    { position: 0.5, color: 'rgba(255,200,80,0.6)' },
                    { position: 1, color: 'rgba(255,120,20,0)' }
                ];
                drawJet(jetLen, startW, endW, stops);
                ctx.restore();
            });
        }
    } catch (e) {}
}
function drawPrismStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const prismRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.003;
    ctx.save();
    const corePulse = 1 + Math.sin(time * 4) * 0.2;
    const prismGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, prismRadius * corePulse);
    prismGradient.addColorStop(0, '#FFFFFF');
    prismGradient.addColorStop(0.1, '#FFFF00');
    prismGradient.addColorStop(0.3, '#FFA500');
    prismGradient.addColorStop(0.6, '#FF4500');
    prismGradient.addColorStop(0.9, '#DC143C');
    prismGradient.addColorStop(1, '#8B0000');
    ctx.beginPath();
    ctx.arc(0, 0, prismRadius * corePulse, 0, Math.PI * 2);
    ctx.fillStyle = prismGradient;
    ctx.fill();
    const spectrum = [
        '#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', 
        '#FFFF00', '#CCFF00', '#99FF00', '#66FF00', '#33FF00',
        '#00FF00', '#00FF33', '#00FF66', '#00FF99', '#00FFCC',
        '#00FFFF', '#00CCFF', '#0099FF', '#0066FF', '#0033FF',
        '#0000FF', '#3300FF', '#6600FF', '#9900FF', '#CC00FF',
        '#FF00FF', '#FF00CC', '#FF0099', '#FF0066', '#FF0033'
    ];
    const rays = 36;
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < rays; i++) {
        const rayAngle = (i / rays) * Math.PI * 2 + time;
        const colorIndex = Math.floor((i / rays) * spectrum.length);
        const nextColorIndex = (colorIndex + 1) % spectrum.length;
        const blendFactor = ((i / rays) * spectrum.length) % 1;
        const currentColor = spectrum[colorIndex];
        const nextColor = spectrum[nextColorIndex];
        const rayLength = prismRadius * 8;
        const rayWidth = Math.PI / 9;
        ctx.save();
        ctx.rotate(rayAngle);
        const rayGradient = ctx.createLinearGradient(0, 0, 0, -rayLength);
        rayGradient.addColorStop(0, currentColor);
        rayGradient.addColorStop(0.3, `rgba(255,255,255,0.8)`);
        rayGradient.addColorStop(0.7, nextColor);
        rayGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, rayLength, -rayWidth, rayWidth);
        ctx.closePath();
        ctx.fillStyle = rayGradient;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, rayLength * 0.7, -rayWidth * 0.5, rayWidth * 0.5);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        ctx.restore();
    }
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.7;
        const refractions = 12;
        for (let i = 0; i < refractions; i++) {
            const refractionAngle = (i / refractions) * Math.PI * 2 + time * 1.5;
            const refractionDistance = prismRadius * (0.8 + Math.sin(time * 2 + i) * 0.4);
            const refractionSize = prismRadius * 0.25;
            const colorIndex = Math.floor((i / refractions) * spectrum.length);
            ctx.save();
            ctx.rotate(refractionAngle);
            ctx.translate(refractionDistance, 0);
            const facets = 6;
            for (let j = 0; j < facets; j++) {
                const facetAngle = (j / facets) * Math.PI * 2;
                ctx.save();
                ctx.rotate(facetAngle);
                const facetGradient = ctx.createLinearGradient(0, -refractionSize, 0, refractionSize);
                facetGradient.addColorStop(0, spectrum[(colorIndex + j) % spectrum.length]);
                facetGradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
                facetGradient.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(refractionSize * 0.3, -refractionSize);
                ctx.lineTo(refractionSize * 0.6, 0);
                ctx.closePath();
                ctx.fillStyle = facetGradient;
                ctx.fill();
                ctx.restore();
            }
            ctx.restore();
        }
    }
    ctx.globalAlpha = 0.3;
    const dispersionLayers = 3;
    for (let layer = 0; layer < dispersionLayers; layer++) {
        const dispersionSize = prismRadius * (1.5 + layer * 0.8 + Math.sin(time * 2 + layer) * 0.3);
        const dispersionGradient = ctx.createRadialGradient(0, 0, prismRadius, 0, 0, dispersionSize);
        dispersionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        dispersionGradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.05)');
        dispersionGradient.addColorStop(0.6, 'rgba(255, 140, 0, 0.03)');
        dispersionGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(0, 0, dispersionSize, 0, Math.PI * 2);
        ctx.fillStyle = dispersionGradient;
        ctx.fill();
    }
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 5; i++) {
        const ringSize = prismRadius * (1.3 + i * 0.5);
        const ringPulse = Math.sin(time * 3 + i) * 0.2 + 0.9;
        const ringColor = spectrum[Math.floor((i / 5) * spectrum.length)];
        ctx.beginPath();
        ctx.arc(0, 0, ringSize * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `${ringColor}80`;
        ctx.lineWidth = 2;
        ctx.stroke();
        const lightPoints = 16;
        ctx.fillStyle = ringColor;
        for (let j = 0; j < lightPoints; j++) {
            const pointAngle = (j / lightPoints) * Math.PI * 2 + time;
            const pointX = Math.cos(pointAngle) * ringSize * ringPulse;
            const pointY = Math.sin(pointAngle) * ringSize * ringPulse;
            ctx.beginPath();
            ctx.arc(pointX, pointY, prismRadius * 0.03, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1;
    ctx.restore();
}
function drawEchoStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const echoRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    const echoGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, echoRadius);
    echoGradient.addColorStop(0, '#98FB98');
    echoGradient.addColorStop(0.4, '#32CD32');
    echoGradient.addColorStop(0.8, '#006400');
    echoGradient.addColorStop(1, '#004d00');
    ctx.beginPath();
    ctx.arc(0, 0, echoRadius, 0, Math.PI * 2);
    ctx.fillStyle = echoGradient;
    ctx.fill();
    const waves = 6;
    for (let i = 0; i < waves; i++) {
        const waveProgress = (time + i * 0.3) % 1;
        const waveSize = echoRadius * (1 + waveProgress * 1.5);
        const alpha = 1 - waveProgress;
        ctx.beginPath();
        ctx.arc(0, 0, waveSize, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(152, 251, 152, ${alpha * 0.7})`;
        ctx.lineWidth = 2 + i * 0.5;
        ctx.stroke();
        for (let j = 0; j < 8; j++) {
            const markerAngle = (j / 8) * Math.PI * 2;
            const markerX = Math.cos(markerAngle) * waveSize;
            const markerY = Math.sin(markerAngle) * waveSize;
            ctx.beginPath();
            ctx.arc(markerX, markerY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.fill();
        }
    }
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < 4; i++) {
            const resonanceSize = echoRadius * (0.8 + i * 0.4);
            const resonanceRotation = time * (1 + i * 0.5);
            ctx.save();
            ctx.rotate(resonanceRotation);
            ctx.beginPath();
            for (let j = 0; j < 12; j++) {
                const angle = (j / 12) * Math.PI * 2;
                const pulse = Math.sin(time * 4 + j) * 0.2 + 1;
                const x = Math.cos(angle) * resonanceSize * pulse;
                const y = Math.sin(angle) * resonanceSize * pulse;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(50, 205, 50, ${0.6 - i * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
}
function onMedusaStarCreated(medusaStar) {
    medusaStar.explosionActive = false;
    medusaStar.explosionProgress = 0;
    medusaStar.jetsVisible = false;
    medusaStar.jetAngle = Math.random() * Math.PI * 2;
    const medusaStars = planets.filter(p => p.type === 'medusaStar');
    if (medusaStars.length === 1) {
        initMedusaStarBehavior();
    }
}
function generateTtauriDebris(ttauriStar) {
    const debrisTypes = ['nebula', 'radiation', 'spaceDust', 'meteoroid', 'asteroid', 'comet','planetoid','rockyPlanet','gasPlanet'];
    const debrisType = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];
    const angle = (ttauriStar.jetAngle || 0) + (Math.random() - 0.5) * Math.PI;
    const minDistance = ttauriStar.radius * 3;
    const maxDistance = ttauriStar.radius * 30;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    const x = ttauriStar.x + Math.cos(angle) * distance;
    const y = ttauriStar.y + Math.sin(angle) * distance;
    const orbitalVelocity = calculateOrbitalVelocity(ttauriStar, distance);
    const tangentAngle = angle + Math.PI / 2;
    const velocityMultiplier = 0.7 + Math.random() * 0.6;
    const finalSpeed = orbitalVelocity * velocityMultiplier;
    const vx = ttauriStar.vx + Math.cos(tangentAngle) * finalSpeed;
    const vy = ttauriStar.vy + Math.sin(tangentAngle) * finalSpeed;
    const mass = debrisType === 'nebula' ? 50 : 
                 debrisType === 'radiation' ? 0.1 :
                 debrisType === 'spaceDust' ? 0.05 : 0.2;
    const newAstro = createAstro(debrisType, x, y, vx, vy, mass);
    if (newAstro) {
        newAstro.origin = 'ttauri';
        newAstro.lifeTime = 15000 + Math.random() * 20000;
        newAstro.creationTime = Date.now();
        newAstro.creationGlow = 1.0;
    }
    return newAstro;
}
function calculateOrbitalVelocity(centralBody, distance) {
    const G = 6.67430e-2;
    const M = centralBody.mass;
    const r = Math.max(distance, centralBody.radius * 1.1);
    const orbitalVelocity = Math.sqrt(G * M / r);
    return orbitalVelocity * 0.8;
}
function drawSingularityStar(planet, ctx, radius, camera, graphicsQuality, visualTimeScale) {
    const singularityRadius = planet.radius * camera.zoom;
    const time = Date.now() * 0.001;
    const centralGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, singularityRadius * 0.8);
    centralGradient.addColorStop(0, '#ffffffff');
    centralGradient.addColorStop(0.3, '#4B0082');
    centralGradient.addColorStop(0.7, '#2E0854');
    centralGradient.addColorStop(1, '#000000');
    ctx.beginPath();
    ctx.arc(0, 0, singularityRadius * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = centralGradient;
    ctx.fill();
    const singularities = 3;
    for (let i = 0; i < singularities; i++) {
        const orbitAngle = (i / singularities) * Math.PI * 2 + time * (1 + i * 0.3);
        const orbitDistance = singularityRadius * 0.6;
        const singRadius = singularityRadius * 0.25;
        const singX = Math.cos(orbitAngle) * orbitDistance;
        const singY = Math.sin(orbitAngle) * orbitDistance;
        ctx.save();
        ctx.translate(singX, singY);
        const singGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, singRadius);
        singGradient.addColorStop(0, '#ffffffff');
        singGradient.addColorStop(0.5, '#9500ffff');
        singGradient.addColorStop(1, '#6919b9ff');
        ctx.beginPath();
        ctx.arc(0, 0, singRadius, 0, Math.PI * 2);
        ctx.fillStyle = singGradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, singRadius * 1.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(138, 43, 226, 0.8)`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
        if (i < singularities - 1) {
            const nextAngle = ((i + 1) / singularities) * Math.PI * 2 + time * (1 + (i + 1) * 0.3);
            const nextX = Math.cos(nextAngle) * orbitDistance;
            const nextY = Math.sin(nextAngle) * orbitDistance;
            ctx.beginPath();
            ctx.moveTo(singX, singY);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = `rgba(134, 21, 215, 0.6)`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    if (graphicsQuality !== 'low') {
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 12; i++) {
            const distortionAngle = (i / 12) * Math.PI * 2;
            const distortionWaves = 5;
            ctx.save();
            ctx.rotate(distortionAngle);
            ctx.beginPath();
            for (let j = 0; j <= 50; j++) {
                const progress = j / 50;
                const wave = Math.sin(progress * Math.PI * distortionWaves + time * 2) * 0.1;
                const distortionRadius = singularityRadius * (1.5 + progress * 0.5 + wave);
                const x = Math.cos(progress * Math.PI) * distortionRadius;
                const y = Math.sin(progress * Math.PI) * distortionRadius;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
    }
    const distortionSize = singularityRadius * (1.2 + Math.sin(time * 2) * 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, distortionSize, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(75, 0, 130, 0.7)';
    ctx.lineWidth = 4;
    ctx.stroke();
}
function createStarParticles(planet, count, color, size) {
    if (!planet.particles) planet.particles = [];
    for (let i = 0; i < count; i++) {
        planet.particles.push({
            x: (Math.random() - 0.5) * planet.radius * 2,
            y: (Math.random() - 0.5) * planet.radius * 2,
            size: size * (0.5 + Math.random() * 0.5),
            color: color,
            life: 1,
            speed: 0.1 + Math.random() * 0.2
        });
    }
}
function drawRocketDetails(rocket, ctx, screenRadius) {
    const radius = (typeof screenRadius === 'number') ? screenRadius : (rocket.radius * camera.zoom);
    ctx.fillStyle = lightenColor(rocket.color || '#ff4444', -10);
    ctx.fillRect(-radius * 1.3, -radius * 0.45, Math.max(0.3, radius * 0.6), Math.max(0.3, radius * 0.9));
    ctx.fillRect(-radius * 0.6, -radius * 0.35, Math.max(0.2, radius * 0.4), Math.max(0.25, radius * 0.7));
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = Math.max(0.2, 0.08 * radius);
    ctx.beginPath();
    ctx.moveTo(-radius * 1.05, -radius * 0.3);
    ctx.lineTo(-radius * 1.05, radius * 0.3);
    ctx.moveTo(-radius * 0.45, -radius * 0.25);
    ctx.lineTo(-radius * 0.45, radius * 0.25);
    ctx.stroke();
    const flameStart = -radius * 1.4;
    const flameEnd = -radius * (2.6 + Math.random() * 0.8);
    const g = ctx.createLinearGradient(flameStart, 0, flameEnd, 0);
    g.addColorStop(0, 'rgba(255,200,40,0.9)');
    g.addColorStop(0.4, 'rgba(255,120,20,0.8)');
    g.addColorStop(0.7, 'rgba(255,60,0,0.6)');
    g.addColorStop(1, 'rgba(255,20,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(flameStart, -radius * 0.6);
    ctx.lineTo(flameEnd, 0);
    ctx.lineTo(flameStart, radius * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = 'rgba(255,180,60,0.25)';
    ctx.beginPath();
    ctx.arc(flameEnd, 0, Math.max(0.6, radius * 0.9), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}
function drawSpaceshipDetails(spaceship, ctx, screenRadius) {
    const radius = (typeof screenRadius === 'number') ? screenRadius : (spaceship.radius * camera.zoom);
    const variant = spaceship.designVariant || 1;
    if (variant === 1) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = lightenColor(spaceship.color || '#88ff88', -10);
        ctx.fill();
    const sqSize = Math.max(0.3, radius * 0.8);
    const sqX = radius * 0.9;
    const sqY = -sqSize / 2;
        ctx.save();
        ctx.fillStyle = spaceship.color || '#88ff88';
    ctx.fillRect(sqX - sqSize/2, sqY, sqSize, sqSize);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = Math.max(0.2, 0.06 * radius);
    ctx.strokeRect(sqX - sqSize/2, sqY, sqSize, sqSize);
        ctx.restore();
    } else if (variant === 2) {
        ctx.fillStyle = lightenColor(spaceship.color || '#88ff88', -5);
    ctx.fillRect(-radius * 0.2, -radius * 0.6, Math.max(0.4, radius * 1.2), Math.max(0.4, radius * 1.2));
        ctx.beginPath();
        ctx.moveTo(radius * 0.9, 0);
        ctx.lineTo(radius * 1.6, -radius * 0.6);
        ctx.lineTo(radius * 1.6, radius * 0.6);
        ctx.closePath();
        ctx.fillStyle = spaceship.color || '#88ff88';
        ctx.fill();
    } else if (variant === 3) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = spaceship.color || '#88ff88';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(radius * 0.4, 0);
        ctx.lineTo(radius * 1.2, -radius * 0.4);
        ctx.lineTo(radius * 1.2, radius * 0.4);
        ctx.closePath();
        ctx.fillStyle = '#666';
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.moveTo(radius * 1.2, 0);
        ctx.lineTo(-radius * 0.8, -radius * 0.8);
        ctx.lineTo(-radius * 0.8, radius * 0.8);
        ctx.closePath();
        ctx.fillStyle = spaceship.color || '#88ff88';
        ctx.fill();
    }
    if (spaceship.subType === 2) {
        ctx.strokeStyle = '#00aaff';
        ctx.lineWidth = Math.max(0.2, 0.08 * radius);
        ctx.beginPath();
        ctx.moveTo(-radius * 0.7, -radius * 0.7);
        ctx.lineTo(radius * 0.7, radius * 0.7);
        ctx.moveTo(radius * 0.7, -radius * 0.7);
        ctx.lineTo(-radius * 0.7, radius * 0.7);
        ctx.stroke();
    } else if (spaceship.subType === 3) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    }
    ctx.lineWidth = Math.max(0.15, 0.05 * radius);
    ctx.beginPath();
    ctx.moveTo(-radius * 0.4, -radius * 0.3);
    ctx.lineTo(-radius * 0.4, radius * 0.3);
    ctx.moveTo(radius * 0.4, -radius * 0.3);
    ctx.lineTo(radius * 0.4, radius * 0.3);
    ctx.stroke();
}
function drawSuperShipDetails(superShip, ctx, screenRadius) {
    const radius = screenRadius ? Math.max(2, screenRadius) : Math.max(4, superShip.radius * camera.zoom);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = superShip.color || '#8A2BE2';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = Math.max(1, 1 * camera.zoom);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    const ringOuter = radius * 3.0;
    const ringInner = radius * 2.4;
    ctx.save();
    ctx.rotate((Date.now() * 0.0002) % (Math.PI * 2));
    ctx.beginPath();
    ctx.arc(0, 0, ringOuter, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = Math.max(2, 6 * camera.zoom);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, ringInner, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.08)';
    ctx.lineWidth = Math.max(1, 3 * camera.zoom);
    ctx.setLineDash([8, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    const segments = 24;
    for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const sx = Math.cos(a) * ((ringInner + ringOuter) / 2);
        const sy = Math.sin(a) * ((ringInner + ringOuter) / 2);
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(a + Math.PI/2);
        ctx.fillStyle = 'rgba(30,120,200,0.9)';
        ctx.fillRect(-radius*0.6, -radius*0.12, radius*1.2, radius*0.24);
        ctx.restore();
    }
    ctx.restore();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#00bfff';
    ctx.beginPath();
    ctx.arc(0, 0, ringOuter * 1.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}
function drawRocket(planet, ctx, x, y, radius) {
    ctx.save();
    ctx.translate(x, y);
    let angle = 0;
    if (planet.vx !== 0 || planet.vy !== 0) {
        angle = Math.atan2(planet.vy, planet.vx);
    }
    ctx.rotate(angle);
    ctx.fillStyle = planet.color || '#ff4444';
    ctx.beginPath();
    ctx.moveTo(radius * 2, 0);
    ctx.lineTo(-radius * 1.5, -radius);
    ctx.lineTo(-radius * 1.5, radius);
    ctx.closePath();
    ctx.fill();
    drawRocketDetails(planet, ctx, radius);
    ctx.restore();
    if (planet.name) {
        drawShipName(planet, ctx, x, y, radius);
    }
}
function drawSpaceship(planet, ctx, x, y, radius) {
    ctx.save();
    ctx.translate(x, y);
    let angle = 0;
    if (planet.vx !== 0 || planet.vy !== 0) {
        angle = Math.atan2(planet.vy, planet.vx);
    }
    ctx.rotate(angle);
    ctx.fillStyle = planet.color || '#44ff44';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#88ff88';
    ctx.fillRect(-radius * 0.5, -radius * 1.5, radius * 0.3, radius * 3);
    ctx.fillRect(radius * 0.2, -radius * 1.5, radius * 0.3, radius * 3);
    ctx.restore();
    if (planet.name) {
        drawShipName(planet, ctx, x, y, radius);
    }
}
function drawShipName(planet, ctx, x, y, radius) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(planet.name, x, y - radius - 12);
}
function initMedusaStarBehavior() {
    if (medusaExplosionInterval) {
        clearInterval(medusaExplosionInterval);
    }
    medusaExplosionInterval = setInterval(() => {
        triggerRandomMedusaExplosion();
    }, 5000 + Math.random() * 10000);
}
function triggerRandomMedusaExplosion() {
    const medusaStars = planets.filter(p => p.type === 'medusaStar' && !p.explosionActive);
    if (medusaStars.length > 0) {
        const randomMedusa = medusaStars[Math.floor(Math.random() * medusaStars.length)];
        triggerMedusaExplosion(randomMedusa);
    }
}
function applyMedusaPetrification(medusaStar) {
    const petrificationRadius = medusaStar.radius * 15;
    planets.forEach(other => {
        if (other === medusaStar || other.markedForRemoval) return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < petrificationRadius) {
            applyPermanentPetrification(other);
            if (isSpaceshipType(other.type)) {
                transformToMeteoroid(other);
            }
        }
    });
}
function applyContinuousPetrification(medusaStar) {
    const petrificationRadius = medusaStar.radius * 15;
    planets.forEach(other => {
        if (other === medusaStar || other.markedForRemoval || other.type === 'medusaStar') return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < petrificationRadius) {
            if (!other.medusaPetrified) {
                applyPermanentPetrification(other);
                other.medusaPetrified = true;
                other.medusaPetrificationSource = medusaStar.id;
            }
        } else {
            if (other.medusaPetrified && other.medusaPetrificationSource === medusaStar.id) {
                removePetrification(other);
                other.medusaPetrified = false;
                delete other.medusaPetrificationSource;
            }
        }
    });
}
function removePetrification(astro) {
    if (astro.originalColor) {
        astro.color = astro.originalColor;
        delete astro.originalColor;
    }
    if (astro.originalGlowColor) {
        astro.glowColor = astro.originalGlowColor;
        delete astro.originalGlowColor;
    }
    if (astro.originalSecondaryColor) {
        astro.secondaryColor = astro.originalSecondaryColor;
        delete astro.originalSecondaryColor;
    }
    if (astro.originalLandColor) {
        astro.landColor = astro.originalLandColor;
        delete astro.originalLandColor;
    }
    if (astro.originalOceanColor) {
        astro.oceanColor = astro.originalOceanColor;
        delete astro.originalOceanColor;
    }
    if (astro.originalType && astro.type === 'meteoroid') {
        astro.type = astro.originalType;
        delete astro.originalType;
    }
    astro.petrified = false;
    delete astro.petrificationTime;
}
function applyPermanentPetrification() {
    for (let i = 0; i < planets.length; i++) {
        const obj = planets[i];
        if (!obj || obj.markedForRemoval) continue;
        if (obj.petrified) {
            obj.color = '#666666';
            obj.glowColor = '#444444';
        }
    }
}
function getGrayColorsByType(type) {
    const colorSets = {
        rockyPlanet: { main: '#888888', glow: '#666666', secondary: '#777777', land: '#999999', ocean: '#777777', ring: '#AAAAAA' },
        gasGiant: { main: '#777777', glow: '#555555', secondary: '#666666', land: null, ocean: null, ring: '#999999' },
        planetoid: { main: '#8A8A8A', glow: '#6A6A6A', secondary: '#7A7A7A', land: '#9A9A9A', ocean: '#7A7A7A', ring: '#ABABAB' },
        star: { main: '#AAAAAA', glow: '#888888', secondary: null, land: null, ocean: null, ring: null },
        redDwarf: { main: '#999999', glow: '#777777', secondary: null, land: null, ocean: null, ring: null },
        brownDwarf: { main: '#777777', glow: '#555555', secondary: null, land: null, ocean: null, ring: null },
        whiteDwarf: { main: '#BBBBBB', glow: '#999999', secondary: null, land: null, ocean: null, ring: null },
        neutronStar: { main: '#CCCCCC', glow: '#AAAAAA', secondary: null, land: null, ocean: null, ring: null },
        pulsar: { main: '#DDDDDD', glow: '#BBBBBB', secondary: null, land: null, ocean: null, ring: null },
        blackHole: { main: '#222222', glow: '#444444', secondary: null, land: null, ocean: null, ring: null },
        asteroid: { main: '#777777', glow: '#555555', secondary: null, land: null, ocean: null, ring: null },
        comet: { main: '#888888', glow: '#666666', secondary: null, land: null, ocean: null, ring: null },
        meteoroid: { main: '#666666', glow: '#444444', secondary: null, land: null, ocean: null, ring: null },
        meteorite: { main: '#6A6A6A', glow: '#484848', secondary: null, land: null, ocean: null, ring: null },
        rocket: { main: '#666666', glow: '#444444', secondary: null, land: null, ocean: null, ring: null },
        spaceship: { main: '#676767', glow: '#454545', secondary: null, land: null, ocean: null, ring: null },
        satellite: { main: '#686868', glow: '#464646', secondary: null, land: null, ocean: null, ring: null },
        superShip: { main: '#696969', glow: '#474747', secondary: null, land: null, ocean: null, ring: null },
        spaceDust: { main: '#555555', glow: '#333333', secondary: null, land: null, ocean: null, ring: null },
        nebula: { main: '#999999', glow: '#777777', secondary: null, land: null, ocean: null, ring: null },
        radiation: { main: '#777777', glow: '#555555', secondary: null, land: null, ocean: null, ring: null }
    };
    return colorSets[type] || { main: '#777777', glow: '#555555', secondary: '#666666', land: null, ocean: null, ring: null };
}
function transformToPetrified(obj) {
    obj.originalType = obj.type;
    obj.originalColor = obj.color;
    obj.originalRadius = obj.radius;
    obj.originalVx = obj.vx;
    obj.originalVy = obj.vy;
    if (obj.originalTemperature === undefined) {
        obj.originalTemperature = obj.temperature;
    }
    obj.petrified = true;
    obj.petrificationTime = Date.now();
    obj.ignoreColorChanges = true;
    obj.color = '#666666';
    obj.radius = obj.radius * 0.9;
    if (isSpaceshipType(obj.type)) {
        obj.vx = 0;
        obj.vy = 0;
        obj.frozen = true;
    }
    createPetrificationEffect(obj);
}
function applyMedusaPetrification(medusaStar) {
    const petrificationRadius = medusaStar.radius * 10;
    planets.forEach(other => {
        if (other === medusaStar || other.markedForRemoval) return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
    });
}
function createPetrificationEffect(obj) {
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = obj.radius * 1.5;
        const particle = {
            x: obj.x + Math.cos(angle) * distance,
            y: obj.y + Math.sin(angle) * distance,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3,
            life: 1.5,
            maxLife: 1.5,
            color: '#888888',
            size: obj.radius * 0.15,
            type: 'petrification'
        };
        if (window.particles) {
            particles.push(particle);
        }
    }
}
function createMedusaExplosionEffect(medusaStar) {
    for (let i = 0; i < 3; i++) {
        const ring = {
            x: medusaStar.x,
            y: medusaStar.y,
            radius: medusaStar.radius * (1 + i * 0.5),
            maxRadius: medusaStar.radius * (3 + i * 2),
            life: 0,
            maxLife: 1.5,
            color: '#00FF00',
            type: 'medusaRadiation'
        };
        if (window.particles) {
            particles.push(ring);
        }
    }
}
function fgpMedusaExplosions(deltaTime) {
    planets.forEach(planet => {
        if (planet.type === 'medusaStar' && planet.explosionActive) {
            const currentTime = Date.now();
            const explosionDuration = 3000;
            planet.explosionProgress = (currentTime - planet.explosionStartTime) / explosionDuration;
            planet.jetsVisible = planet.explosionProgress < 0.4;
            if (planet.explosionProgress >= 1) {
                planet.explosionActive = false;
                planet.explosionProgress = 0;
                planet.jetsVisible = false;
            }
        }
    });
}
function isSpaceshipType(type) {
    return ['rocket', 'spaceship', 'superShip', 'satellite'].includes(type);
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
            (deltaTime / 1000) * timeScale;
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
    if (!planet.ignoreColorChanges){ 
        if (planet.type === 'rockyPlanet') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            checkExoticTransformation(
                ['Crystalline', 'Magnetic', 'Radioative', 'Vibrational', 'Quantum'],
                ['Cerium', 'Zirconium', 'Tantalum', 'Ruthenium', 'Hafnium'],
                ['-X', '-Ω', '-Δ', '-Σ', '-Φ']
            );
            fgpPlanetConditions(planet);
            if (planet.temperature > 100 && planet.cloudsValue < 10 && graphicsQuality != 'high' && planet.cloudsValue < 100 && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#da1600';
                planet.landColor = '#000000ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 0 && planet.cloudsValue < 20 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#da1600';
                planet.landColor = '#000000ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 0 && planet.cloudsValue < 99 && planet.gasValue > 99){  
                planet.planetClass = 'Carbon Lava Planet'; 
                planet.color = '#681f17ff';
                planet.landColor = '#3f0000ff';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 20 && planet.cloudsValue < 30 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#8b261aff';
                planet.landColor = '#130606ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 20 && planet.cloudsValue < 40 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#a54338ff';
                planet.landColor = '#422020ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 40 && planet.cloudsValue < 50 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#b4554bff';
                planet.landColor = '#492626ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 50 && planet.cloudsValue < 60 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#ad675fff';
                planet.landColor = '#5c3939ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#b89a97ff';
                planet.landColor = '#725454ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 70 && planet.cloudsValue < 80 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#755d5bff';
                planet.landColor = '#3f2929ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 80 && planet.cloudsValue <= 99 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.color = '#362a29ff';
                planet.landColor = '#201717ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 100) {  
                planet.planetClass = 'Cloudy Lava Planet'; 
                planet.color = '#180200ff';
                planet.landColor = '#180200ff';
                planet.lifeChance = 0;
                unlockAchievement(4)
                if (planet.gasValue > 99) {
                planet.planetClass = 'Acidic Cloudy Lava Planet'; 
                planet.color = '#ffa600ff';
                planet.landColor = '#ffa600ff';
            }
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Cloudy Oceanic Planet'; 
                planet.color = '#94caffff';
                planet.landColor = '#94caffff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Oceanic Planet'; 
                planet.color = '#20ff7dff';
                planet.landColor = '#20ff7dff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Cloudy Oceanic Planet'; 
                planet.color = '#a9ff94ff';
                planet.landColor = '#a9ff94ff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oceanic Planet'; 
                planet.color = '#004e9c';
                planet.landColor = '#004e9c';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 40 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; 
                planet.color = '#004e9c';
                planet.landColor = '#004e9c';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 40 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; 
                planet.color = '#1f61a3ff';
                planet.landColor = '#1f61a3ff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 50 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; 
                planet.color = '#58a5f1ff';
                planet.landColor = '#58a5f1ff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 70 && planet.cloudsValue <= 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet'; 
                planet.color = '#7397bbff';
                planet.landColor = '#7397bbff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Oceanic Planet'; 
                planet.color = '#9accffff';
                planet.landColor = '#9accffff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue >= 100 &&
                    planet.cloudsValue <= 99) {
                planet.planetClass = 'Oxygenated Oceanic Planet'; 
                planet.color = '#009c4eff';
                planet.landColor = '#009c4eff';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue >= 100 &&
                    planet.cloudsValue > 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Oxygenated Oceanic Planet'; 
                planet.color = '#d8ff49ff';
                planet.landColor = '#d8ff49ff';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && graphicsQuality != 'high') {
                planet.planetClass = 'Storm Planet'; 
                planet.color = '#00109cff';
                planet.landColor = '#00109cff';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Storm Planet'; 
                planet.color = '#009c60ff';
                planet.landColor = '#009c60ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet'; 
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
                planet.planetClass = 'Storm Planet'; 
                planet.color = '#0c1355ff';
                planet.landColor = '#0c1355ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 60 && planet.cloudsValue <= 99 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet'; 
                planet.color = '#060a3aff';
                planet.landColor = '#060a3aff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 99) {
                planet.planetClass = 'Super Storm Planet'; 
                planet.color = '#000538ff';
                planet.landColor = '#000538ff';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 99) {
                planet.planetClass = 'Super Oxygenated Storm Planet'; 
                planet.color = '#003827ff';
                planet.landColor = '#003827ff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue <= 99 && planet.gasValue <= 99) {
                planet.planetClass = 'Frozen Planet'; 
                planet.color = '#70aeaf';
                planet.landColor = '#ffffffff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Frozen Planet'; 
                planet.color = '#ffffffff';
                planet.landColor = '#ffffffff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue <= 99 && planet.gasValue > 99) {
                planet.planetClass = 'Condensed Air Frozen Planet'; 
                planet.color = '#a3af70ff';
                planet.landColor = '#ffef95ff';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Cloudy Condensed Air Frozen Planet'; 
                planet.color = '#eeffa2ff';
                planet.landColor = '#fdff92ff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue <= 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Frozen and Arid Planet'; 
                planet.color = '#aaaaaaff';
                planet.landColor = '#ffffff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Condensed Air Frozen and Arid Planet'; 
                planet.color = '#f1f8afff';
                planet.landColor = '#fffc62ff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Frozen and Arid Planet'; 
                planet.color = '#ffffffff';
                planet.landColor = '#cacacaff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Condensed Air Cloudy Frozen and Arid Planet'; 
                planet.color = '#aaaaaaff';
                planet.landColor = '#ffffff';
                planet.lifeChance = 0;
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Habitable Planet';
                planet.color = '#0088e2ff';
                planet.landColor = '#099900';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Planet';
                planet.color = '#00e284ff';
                planet.landColor = '#529900ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                planet.color = '#0088e2ff';
                planet.landColor = '#099900';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Planet';
                planet.color = '#4af7afff';
                planet.landColor = '#529900ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Planet';
                planet.color = '#87f7c8ff';
                planet.landColor = '#69a02bff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Cloudy Planet';
                planet.color = '#a8ecd0ff';
                planet.landColor = '#b6b851ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 40 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                planet.color = '#1a95e7ff';
                planet.landColor = '#20a017ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 40 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                planet.color = '#3da6ecff';
                planet.landColor = '#3ea737ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                planet.color = '#57aee9ff';
                planet.landColor = '#5ab353ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                planet.color = '#75b7e4ff';
                planet.landColor = '#7bc276ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 70 && planet.cloudsValue <= 80 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Cloudy Habitable Planet';
                planet.color = '#94ccf1ff';
                planet.landColor = '#9fd49bff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue === 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Habitable Planet';
                planet.color = '#91d3ffff';
                planet.landColor = '#adfca8ff';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature > 20 && planet.temperature <= 30 &&   
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue >= 40 && planet.gasValue <= 70) {
                planet.planetClass = 'Cloudy Planet';
                planet.color = '#add896'; 
                planet.landColor = '#add896';
            } else if (planet.temperature > 20 && planet.temperature <= 30 &&   
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue > 70) {
                planet.planetClass = 'Oxygenated Cloudy Planet';
                planet.color = '#d8d496ff'; 
                planet.landColor = '#ccd896ff';
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Temperate Planet';
                planet.color = '#00ffd5ff';
                planet.landColor = '#9bd105ff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Temperate Planet';
                planet.color = '#00ffd5ff';
                planet.landColor = '#9bd105ff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Temperate Planet';
                planet.color = '#2ffcffff';
                planet.landColor = '#05d161ff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Cloudy Temperate Planet';
                planet.color = '#17eef1ff';
                planet.landColor = '#05d18dff';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 100 &&  
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue >= 40 && planet.gasValue <= 70) {
                planet.planetClass = 'Temperate Cloudy Planet';
                planet.color = '#00CED1';
                planet.landColor = '#00CED1';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue <= 99 && planet.gasValue <= 99 && graphicsQuality != 'high') {  
                planet.planetClass = 'Desert Planet';
                planet.color = '#ff7b00ff';
                planet.landColor = '#FFA500';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality != 'high' && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';
                planet.color = '#ff1100ff';
                planet.landColor = '#ff5e00ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 20 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';
                planet.color = '#ff7b00ff';
                planet.landColor = '#FFA500';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 20 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';
                planet.color = '#ff1100ff';
                planet.landColor = '#ff5e00ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue > 20 && planet.cloudsValue <= 50 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';
                planet.color = '#ff4c3fff';
                planet.landColor = '#ff3232ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' &&  planet.cloudsValue > 50 && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Semi Cloudy Oxygenated Desert Planet';
                planet.color = '#ff938bff';
                planet.landColor = '#ff7979ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 30 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';
                planet.color = '#ff8d23ff';
                planet.landColor = '#faac1cff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue > 30 && planet.cloudsValue < 60 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';
                planet.color = '#fdb169ff';
                planet.landColor = '#ffc252ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Semi Cloudy Desert Planet';
                planet.color = '#ffcfa2ff';
                planet.landColor = '#ffd483ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Desert Planet';
                planet.color = '#ffcfa2ff';
                planet.landColor = '#ffd483ff';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Cloudy Desert Planet';
                planet.color = '#ffa2a2ff';
                planet.landColor = '#ff8b83ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality !='high') {  
                planet.planetClass = 'Humid Desert Planet';
                planet.color = '#00ffddff';
                planet.landColor = '#ffbb00ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 0 && planet.cloudsValue < 30 && planet.gasValue <= 99) {  
                planet.planetClass = 'Humid Desert Planet';
                planet.color = '#00ffddff';
                planet.landColor = '#ffbb00ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 0 && planet.cloudsValue < 30 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Humid Desert Planet';
                planet.color = '#00ff80ff';
                planet.landColor = '#ff5100ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 30 && planet.cloudsValue < 50 && planet.gasValue <= 99) {  
                planet.planetClass = 'Humid Desert Planet';
                planet.color = '#58f8e3ff';
                planet.landColor = '#ffca38ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 50 && planet.cloudsValue < 60 && planet.gasValue <= 99) {  
                planet.planetClass = 'Semi Fog Humid Desert Planet';
                planet.color = '#58f8e3ff';
                planet.landColor = '#ffca38ff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Fog Humid Desert Planet';
                planet.color = '#9cfff2ff';
                planet.landColor = '#ffe59cff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue > 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Super Fog Humid Desert Planet';
                planet.color = '#76ffedff';
                planet.landColor = '#83e2faff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Fog Humid Desert Planet';
                planet.color = '#bbff9cff';
                planet.landColor = '#ffe59cff';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue > 70 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Super Fog Humid Desert Planet';
                planet.color = '#56ffbeff';
                planet.landColor = '#60ffa7ff';
            } else if (planet.temperature <= -270 ){
                unlockAchievement(33)
                planet.color = '#ffffffff';
                planet.landColor = '#ffffffff';
                planet.planetClass = 'Extreme Frozen Planet';
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Tundra Planet';
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
                planet.planetClass = 'Tundra Planet';
                planet.color = '#0c01a7ff';
                planet.landColor = '#e74c50';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';
                planet.color = '#4901a7ff';
                planet.landColor = '#e74cc0ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';
                planet.color = '#572c8fff';
                planet.landColor = '#a54e8fff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Tundra Planet';
                planet.color = '#1e1961ff';
                planet.landColor = '#ad5e61ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Storm Tundra Planet';
                planet.color = '#13122eff';
                planet.landColor = '#362746ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Storm Tundra Planet';
                planet.color = '#020041ff';
                planet.landColor = '#211c36ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue > 70) {
                planet.planetClass = 'Super Storm Tundra Planet';
                planet.color = '#020041ff';
                planet.landColor = '#211c36ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Oxygenated Storm Tundra Planet';
                planet.color = '#004123ff';
                planet.landColor = '#31361cff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 70) {
                planet.planetClass = 'Oxygenated Super Storm Tundra Planet';
                planet.color = '#030e09ff';
                planet.landColor = '#0c0e06ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Humid Tundra Planet';
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
                planet.planetClass = 'Humid Tundra Planet';
                planet.color = '#070064ff';
                planet.landColor = '#7b4ce7ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';
                planet.color = '#110027ff';
                planet.landColor = '#5c4ce7ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';
                planet.color = '#3b2c8fff';
                planet.landColor = '#544ea5ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Tundra Planet';
                planet.color = '#05004bff';
                planet.landColor = '#765eadff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Semi Storm Tundra Planet';
                planet.color = '#030055ff';
                planet.landColor = '#25004dff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Humid Storm Tundra Planet';
                planet.color = '#000c41ff';
                planet.landColor = '#09002cff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue > 70) {
                planet.planetClass = 'Humid Super Storm Tundra Planet';
                planet.color = '#030218ff';
                planet.landColor = '#070025ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Humid Oxygenated Storm Tundra Planet';
                planet.color = '#0a0041ff';
                planet.landColor = '#2a1c36ff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 70) {
                planet.planetClass = 'Humid Oxygenated Super Storm Tundra Planet';
                planet.color = '#030a0eff';
                planet.landColor = '#06070eff';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality !='high') {
                planet.planetClass = 'Cold Desert Planet';
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
                planet.planetClass = 'Cold Desert Planet';
                planet.color = '#f85c35ff';
                planet.landColor = '#f83200ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';
                planet.color = '#f83535ff';
                planet.landColor = '#f80000ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 40 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';
                planet.color = '#ff8d70ff';
                planet.landColor = '#ff5930ff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 40 && planet.cloudsValue <= 60 && graphicsQuality ==='high') {
                planet.planetClass = 'Semi Cloudy Cold Desert Planet';
                planet.color = '#ffb6a3ff';
                planet.landColor = '#ff977dff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 60) {
                planet.planetClass = 'Cloudy Cold Desert Planet';
                planet.color = '#ffb6a3ff';
                planet.landColor = '#ff977dff';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 60) {
                planet.planetClass = 'Oxgenated Cloudy Cold Desert Planet';
                planet.color = '#ffa3a3ff';
                planet.landColor = '#ff7d7dff';
            } else {
                planet.planetClass = 'Rocky Planet';
                planet.color = '#555555';
                planet.landColor = '#2b2b2bff';
                planet.lifeChance = 0;
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
                planet.planetClass = 'Hot Jupiter';
                planet.color = '#ff0800ff';
                unlockAchievement(4)
            } else if (planet.temperature >= 70 && planet.temperature <= 100 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Temperate Jupiter';
                planet.color = '#ff3300ff';
                unlockAchievement(4)
            } else if (planet.temperature <= 0 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 20)  {
                planet.planetClass = 'Ice Giant';
                planet.color = '#00008B';
            } else if (planet.temperature >= 0 && planet.temperature <= 10 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Cold Water Giant';
                planet.color = '#008b8bff';
            } else if (planet.temperature >= 10 && planet.temperature <= 30 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Water Giant';
                planet.color = '#00FFFF';
            } else if (planet.temperature >= 30 && planet.temperature <= 70 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Warm Water Giant';
                planet.color = '#4dffc4ff';
            } else if (planet.temperature <= 0 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Cold Giant';
                planet.color = '#4682B4';
                unlockAchievement(37)
            } else if (planet.temperature >= 20 && planet.gasValue >= 100 && planet.cloudsValue >= 100 && planet.waterValue >= 100) {
                planet.planetClass = 'Multielemental';
                planet.color = '#ff00d4ff';
                unlockAchievement(41)
            } else if (planet.temperature >= 50 && planet.temperature <= 70 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Warm Ammonia Giant';
                planet.color = '#4aff9cff';
            } else if (planet.temperature >= 40 && planet.temperature <= 50 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Ammonia Giant';
                planet.color = '#00ff73ff';
            } else if (planet.temperature >= 30 && planet.temperature <= 40 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Cold Ammonia Giant';
                planet.color = '#158b4bff';
            } else if (planet.temperature >= 40 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Warm Noble Giant';
                planet.color = '#5ffafaff';
            } else if (planet.temperature >= 20 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Noble Giant';
                planet.color = '#00FFFF';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Cold Noble Giant';
                planet.color = '#056868ff';
            } else if (planet.temperature >= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Warm Carbon Giant';
                planet.color = '#790000ff';
            } else if (planet.temperature >= 60 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Carbon Giant';
                planet.color = '#792600ff';
            } else if (planet.temperature >= 50 && planet.temperature <= 60 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Cold Carbon Giant';
                planet.color = '#423d3aff';
            } else if (planet.temperature >= 45 && planet.temperature <= 50 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Warm Methane Giant';
                planet.color = '#fc5a5aff';
            } else if (planet.temperature >= 40 && planet.temperature <= 45 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Methane Giant';
                planet.color = '#ff4800ff';
            } else if (planet.temperature >= 30 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Cold Methane Giant';
                planet.color = '#2c0000ff';
            } else if (planet.temperature >= 20 && planet.temperature <= 45 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Warm Hidrogen Giant';
                planet.color = '#9fb9ffff';
            } else if (planet.temperature >= -10 && planet.temperature <= 20 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Hidrogen Giant';
                planet.color = '#0044ffff';
            } else if (planet.temperature >= -30 && planet.temperature <= -10 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Cold Hidrogen Giant';
                planet.color = '#081331ff';
            } else if (planet.temperature >= 70 && planet.temperature <= 80 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10 ) {
                planet.planetClass = 'Warm Helium Giant';
                planet.color = '#55f3f3ff';
            } else if (planet.temperature >= 40 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10) {
                planet.planetClass = 'Helium Giant';
                planet.color = '#00FFFF';
            } else if (planet.temperature >= 0 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10) {
                planet.planetClass = 'Cold Helium Giant';
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
                planet.planetClass = 'Lava Planetoid';
                planet.color = '#ff0000ff';
                unlockAchievement(4)
            } else if (planet.temperature < -50 && planet.waterValue > 30) {
                planet.planetClass = 'Ice Planetoid';
                planet.color = '#609899';
            } else if (planet.temperature < -50) {
                planet.planetClass = 'Frozen and Arid Planetoid';
                planet.color = '#ffffff';
            } else if (planet.temperature > 50 && planet.waterValue < 40) {
                planet.planetClass = 'Desert Planetoid';
                planet.color = '#ff3300ff';
            } else if (planet.temperature > 0 && planet.temperature < 20) {
                planet.planetClass = 'Cold Planetoid';
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
    }
    if (planet.ignoreColorChanges){ 
        if (planet.type === 'rockyPlanet') {
            planet.waterValue = planet.waterValue || 0;
            planet.gasValue = planet.gasValue || 0;
            planet.cloudsValue = planet.cloudsValue || 0;
            checkExoticTransformation(
                ['Crystalline', 'Magnetic', 'Radioative', 'Vibrational', 'Quantum'],
                ['Cerium', 'Zirconium', 'Tantalum', 'Ruthenium', 'Hafnium'],
                ['-X', '-Ω', '-Δ', '-Σ', '-Φ']
            );
            fgpPlanetConditions(planet);
            if (planet.temperature > 100 && planet.cloudsValue < 10 && graphicsQuality != 'high' && planet.cloudsValue < 100 && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 0 && planet.cloudsValue < 20 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 0 && planet.cloudsValue < 99 && planet.gasValue > 99){  
                planet.planetClass = 'Carbon Lava Planet';
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 20 && planet.cloudsValue < 30 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 20 && planet.cloudsValue < 40 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet'; 
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 40 && planet.cloudsValue < 50 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 50 && planet.cloudsValue < 60 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 70 && planet.cloudsValue < 80 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 80 && planet.cloudsValue <= 99 && graphicsQuality === 'high' && planet.gasValue <= 99){  
                planet.planetClass = 'Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
            } else if (planet.temperature > 100 && planet.cloudsValue >= 100) {  
                planet.planetClass = 'Cloudy Lava Planet';
                planet.lifeChance = 0;
                unlockAchievement(4)
                if (planet.gasValue > 99) {
                planet.planetClass = 'Acidic Cloudy Lava Planet';
            }
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Cloudy Oceanic Planet'; 
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Cloudy Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 40 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 40 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 50 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 70 && planet.cloudsValue <= 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue >= 100 &&
                    planet.cloudsValue <= 99) {
                planet.planetClass = 'Oxygenated Oceanic Planet';
            } else if (planet.temperature >= 10 && planet.temperature <= 50 &&  
                    planet.waterValue > 99 && planet.gasValue >= 100 &&
                    planet.cloudsValue > 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Oxygenated Oceanic Planet';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && graphicsQuality != 'high') {
                planet.planetClass = 'Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue <= 99 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature < 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 0 && planet.cloudsValue <= 99 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 60 && planet.cloudsValue <= 99 && graphicsQuality === 'high') {
                planet.planetClass = 'Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue <= 99 &&
                    planet.cloudsValue > 99) {
                planet.planetClass = 'Super Storm Planet';
            } else if (planet.temperature > -50 && planet.temperature <= 10 &&  
                    planet.waterValue > 99 && planet.gasValue > 99 &&
                    planet.cloudsValue > 99) {
                planet.planetClass = 'Super Oxygenated Storm Planet';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue <= 99 && planet.gasValue <= 99) {
                planet.planetClass = 'Frozen Planet';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Frozen Planet';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue <= 99 && planet.gasValue > 99) {
                planet.planetClass = 'Condensed Air Frozen Planet';
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue >= 20 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Cloudy Condensed Air Frozen Planet';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue <= 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Frozen and Arid Planet';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Condensed Air Frozen and Arid Planet';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Frozen and Arid Planet';
                planet.lifeChance = 0;
            } else if (planet.temperature >= - 269 && planet.temperature < 0 && planet.waterValue < 20 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Condensed Air Cloudy Frozen and Arid Planet'; 
                planet.lifeChance = 0;
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Cloudy Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 40 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 40 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 70 && planet.cloudsValue <= 80 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Cloudy Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature >= 20 && planet.temperature <= 30 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue === 90 && graphicsQuality === 'high') {
                planet.planetClass = 'Cloudy Habitable Planet';
                unlockAchievement(5)
                unlockAchievement(7)
            } else if (planet.temperature > 20 && planet.temperature <= 30 &&   
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue >= 40 && planet.gasValue <= 70) {
                planet.planetClass = 'Cloudy Planet';
            } else if (planet.temperature > 20 && planet.temperature <= 30 &&   
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue > 70) {
                planet.planetClass = 'Oxygenated Cloudy Planet';
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 90 && graphicsQuality != 'high') {
                planet.planetClass = 'Temperate Planet';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Temperate Planet';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Temperate Planet';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 50 &&  
                    planet.waterValue >= 30 && planet.waterValue <= 80 &&
                    planet.gasValue >= 50 && planet.gasValue <= 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 70 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Cloudy Temperate Planet';
                unlockAchievement(5)
            } else if (planet.temperature > 30 && planet.temperature <= 100 &&  
                    planet.cloudsValue >= 70 &&
                    planet.waterValue >= 30 && planet.waterValue <= 60 &&
                    planet.gasValue >= 40 && planet.gasValue <= 70) {
                planet.planetClass = 'Temperate Cloudy Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue <= 99 && planet.gasValue <= 99 && graphicsQuality != 'high') {  
                planet.planetClass = 'Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality != 'high' && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 20 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 20 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue > 20 && planet.cloudsValue <= 50 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' &&  planet.cloudsValue > 50 && planet.cloudsValue <= 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Semi Cloudy Oxygenated Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue <= 30 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && graphicsQuality === 'high' && planet.cloudsValue > 30 && planet.cloudsValue < 60 && planet.gasValue <= 99) {  
                planet.planetClass = 'Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Semi Cloudy Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue > 99 && planet.gasValue <= 99) {  
                planet.planetClass = 'Cloudy Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue < 40 && planet.cloudsValue > 99 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Cloudy Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality !='high') {  
                planet.planetClass = 'Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 0 && planet.cloudsValue < 30 && planet.gasValue <= 99) {  
                planet.planetClass = 'Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 0 && planet.cloudsValue < 30 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 30 && planet.cloudsValue < 50 && planet.gasValue <= 99) {  
                planet.planetClass = 'Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 50 && planet.cloudsValue < 60 && planet.gasValue <= 99) {  
                planet.planetClass = 'Semi Fog Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Fog Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue > 70 && planet.gasValue <= 99) {  
                planet.planetClass = 'Super Fog Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue >= 60 && planet.cloudsValue < 70 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Fog Humid Desert Planet';
            } else if (planet.temperature > 50 && planet.waterValue >= 40 && graphicsQuality ==='high' && planet.cloudsValue > 70 && planet.gasValue > 99) {  
                planet.planetClass = 'Oxygenated Super Fog Humid Desert Planet';
            } else if (planet.temperature <= -270 ){
                unlockAchievement(33)
                planet.planetClass = 'Extreme Frozen Planet';
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Oxygenated Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Semi Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue > 70) {
                planet.planetClass = 'Super Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Oxygenated Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue > 0 && planet.waterValue < 20 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 70) {
                planet.planetClass = 'Oxygenated Super Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Humid Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                    planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 60 && graphicsQuality != 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Oxygenated Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 30 && planet.cloudsValue <= 50 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 50 && planet.cloudsValue <= 60 && graphicsQuality === 'high') {
                planet.planetClass = 'Humid Semi Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Humid Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 0 && planet.gasValue < 80 &&
                    planet.cloudsValue > 70) {
                planet.planetClass = 'Humid Super Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue >= 80 &&
                    planet.cloudsValue >= 60 && planet.cloudsValue <= 70) {
                planet.planetClass = 'Humid Oxygenated Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature < 20 &&  
                     planet.waterValue >= 20 &&
                    planet.gasValue > 80 &&
                    planet.cloudsValue >= 70) {
                planet.planetClass = 'Humid Oxygenated Super Storm Tundra Planet';
                unlockAchievement(5)
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality !='high') {
                planet.planetClass = 'Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality !='high') {
                planet.planetClass = 'Oxygenated Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 90 && graphicsQuality ==='high') {
                planet.planetClass = 'Oxygenated Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 20 && planet.cloudsValue <= 40 && graphicsQuality ==='high') {
                planet.planetClass = 'Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 40 && planet.cloudsValue <= 60 && graphicsQuality ==='high') {
                planet.planetClass = 'Semi Cloudy Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 0 && planet.gasValue <= 99 &&
                    planet.cloudsValue >= 60) {
                planet.planetClass = 'Cloudy Cold Desert Planet';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 &&  
                    planet.waterValue < 20 &&
                    planet.gasValue > 99 &&
                    planet.cloudsValue >= 60) {
                planet.planetClass = 'Oxgenated Cloudy Cold Desert Planet';
            } else {
                planet.planetClass = 'Rocky Planet';
                planet.lifeChance = 0;
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
                planet.planetClass = 'Hot Jupiter';
                unlockAchievement(4)
            } else if (planet.temperature >= 70 && planet.temperature <= 100 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Temperate Jupiter';
                unlockAchievement(4)
            } else if (planet.temperature <= 0 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 20)  {
                planet.planetClass = 'Ice Giant';
            } else if (planet.temperature >= 0 && planet.temperature <= 10 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Cold Water Giant';
            } else if (planet.temperature >= 10 && planet.temperature <= 30 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Water Giant';
            } else if (planet.temperature >= 30 && planet.temperature <= 70 && planet.gasValue >= 0 && planet.gasValue <= 20 && planet.cloudsValue >= 0 && planet.cloudsValue <= 20 && planet.waterValue >= 20) {
                planet.planetClass = 'Warm Water Giant';
            } else if (planet.temperature <= 0 && planet.gasValue >= 0 && planet.cloudsValue >= 0 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Cold Giant';
                unlockAchievement(37)
            } else if (planet.temperature >= 20 && planet.gasValue >= 100 && planet.cloudsValue >= 100 && planet.waterValue >= 100) {
                planet.planetClass = 'Multielemental';
                unlockAchievement(41)
            } else if (planet.temperature >= 50 && planet.temperature <= 70 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Warm Ammonia Giant';
            } else if (planet.temperature >= 40 && planet.temperature <= 50 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Ammonia Giant';
            } else if (planet.temperature >= 30 && planet.temperature <= 40 && planet.gasValue >= 10 && planet.gasValue <= 30 && planet.cloudsValue >= 10 && planet.cloudsValue <= 40 && planet.waterValue >= 100) {
                planet.planetClass = 'Cold Ammonia Giant';
            } else if (planet.temperature >= 40 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Warm Noble Giant';
            } else if (planet.temperature >= 20 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Noble Giant';
            } else if (planet.temperature >= 0 && planet.temperature <= 20 && planet.gasValue >= 100 && planet.cloudsValue >= 10 && planet.cloudsValue <= 30 && planet.waterValue >= 0 && planet.waterValue <= 20) {
                planet.planetClass = 'Cold Noble Giant';
            } else if (planet.temperature >= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Warm Carbon Giant';
            } else if (planet.temperature >= 60 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Carbon Giant';
            } else if (planet.temperature >= 50 && planet.temperature <= 60 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0) {
                planet.planetClass = 'Cold Carbon Giant';
            } else if (planet.temperature >= 45 && planet.temperature <= 50 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Warm Methane Giant';
            } else if (planet.temperature >= 40 && planet.temperature <= 45 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Methane Giant';
            } else if (planet.temperature >= 30 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 0 && planet.waterValue >= 0 ) {
                planet.planetClass = 'Cold Methane Giant';
            } else if (planet.temperature >= 20 && planet.temperature <= 45 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Warm Hidrogen Giant';
            } else if (planet.temperature >= -10 && planet.temperature <= 20 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Hidrogen Giant';
            } else if (planet.temperature >= -30 && planet.temperature <= -10 && planet.gasValue >= 80 && planet.cloudsValue >= 10 && planet.waterValue >= 100 ) {
                planet.planetClass = 'Cold Hidrogen Giant';
            } else if (planet.temperature >= 70 && planet.temperature <= 80 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10 ) {
                planet.planetClass = 'Warm Helium Giant';
            } else if (planet.temperature >= 40 && planet.temperature <= 70 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10) {
                planet.planetClass = 'Helium Giant';
            } else if (planet.temperature >= 0 && planet.temperature <= 40 && planet.gasValue >= 100 && planet.cloudsValue >= 70 && planet.waterValue >= 10) {
                planet.planetClass = 'Cold Helium Giant';
            } else {
                planet.planetClass = 'Gas Giant';
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
                planet.planetClass = 'Lava Planetoid';
                unlockAchievement(4)
            } else if (planet.temperature < -50 && planet.waterValue > 30) {
                planet.planetClass = 'Ice Planetoid';
            } else if (planet.temperature < -50) {
                planet.planetClass = 'Frozen and Arid Planetoid';
            } else if (planet.temperature > 50 && planet.waterValue < 40) {
                planet.planetClass = 'Desert Planetoid';
            } else if (planet.temperature > 0 && planet.temperature < 20) {
                planet.planetClass = 'Cold Planetoid';
            } else {
                planet.planetClass = 'Rocky Planetoid';
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
                unlockAchievement(4)
            } else if (planet.temperature > 80) {
                planet.planetClass = 'Hot Asteroid';
            } else if (planet.temperature > 30) {
                planet.planetClass = 'Commom Asteroid';
            } else if (planet.temperature < 0 && planet.waterValue > 30) {
                planet.planetClass = 'Frozen Asteroid';
            } else if (planet.temperature < 0 && planet.waterValue <= 30) {
                planet.planetClass = 'Cold Asteroid';
            } else {
                planet.planetClass = 'Commom Asteroid';
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
            } else if (planet.temperature > 20) {
                planet.planetClass = 'Commom Meteoroid';
            } else if (planet.temperature < 0 && planet.waterValue > 30) {
                planet.planetClass = 'Frozen Meteoroid';
            } else if (planet.temperature < 0 && planet.water <= 30) {
                planet.planetClass = 'Cold Meteoroid';
            } else {
                planet.planetClass = 'Commom Meteoroid';
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
                unlockAchievement(4)
            } else if (planet.temperature > 30) {
                planet.planetClass = 'Commom Space Dust';
            } else {
                planet.planetClass = 'Cold Space Dust';
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
                unlockAchievement(4)
                planet.mass = Math.max(0.1, planet.mass * 0.99); 
            } else if (planet.temperature < -100 && planet.waterValue > 70 && planet.gasValue > 80) {
                planet.planetClass = 'Condensed Comet';
            } else if (planet.temperature < 0 && planet.waterValue < 70) {
                planet.planetClass = 'Frozen Cometa';
            } else {
                planet.planetClass = 'Commom Comet';
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
                unlockAchievement(4)
            } else if (planet.temperature > 150) {
                planet.planetClass = 'Commom Meteorite';
            } else {
                planet.planetClass = 'Cold Meteorite';
            }
            applyExoticClass();
        }
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
    return classMap[type] || '(FGP/br)Base Class';
}
function generateExoticName(prefixes, cores, suffixes) {
    return `${prefixes[Math.floor(Math.random()*prefixes.length)]} ${cores[Math.floor(Math.random()*cores.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
}
let frameCount = 0;
function gameLoop(timestamp) {
    frameCount++;
    if (frameCount % 60 === 0) {
        const nitricStars = planets.filter(p => p.type === 'nitricStar');
        const medusaStars = planets.filter(p => p.type === 'medusaStar');
        console.log(`Frame ${frameCount}:`);
        console.log(`- Nitric Stars: ${nitricStars.length}`);
        console.log(`- Medusa Stars: ${medusaStars.length}`);
        nitricStars.forEach((star, index) => {
            console.log(`  Nitric Star ${index}:`, {
                explosionActive: star.explosionActive,
                explosionProgress: star.explosionProgress,
                timeToNextExplosion: star.lastExplosionTime + star.explosionCooldown - Date.now()
            });
        });
    }
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    fps = Math.floor(1000 / deltaTime);
    ctx.fillStyle = spaceColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (gameState === 'playing') {
        fgpPhysics(deltaTime * timeScale);
        fgpPlanetsTemperature(deltaTime);
        fgpExoticObjects(deltaTime * timeScale);
        fgpAstroEvolution(deltaTime * Math.abs(timeScale));
        handleCollisions();
        cleanupDistantShips();
        fgpAnimations(deltaTime);
        fgpShipMovement(deltaTime);
        cleanupDestroyedShips();
        fgpMedusaExplosions(deltaTime);
        fgpSpectateCamera();
        try {
            applyPermanentPetrification();
        } catch (error) {
            console.error('Error in applyPermanentPetrification:', error);
        }
        if (timestamp % 10000 < deltaTime) {
            if (planets.some(p => p.type === 'medusaStar')) {
                debugMedusaPetrification();
            }
        }
        fgpFunSpaceColors(deltaTime);
        fgpMedusaStarBehavior(deltaTime);
        fgpNitricStarBehavior(deltaTime);
        fgpChronosStarBehavior(deltaTime);
        fgpPhantomStarBehavior(deltaTime);
        fgpVortexStarBehavior(deltaTime);
        fgpCrystalStarBehavior(deltaTime);
        fgpNeuralStarBehavior(deltaTime);
        fgpHologramStarBehavior(deltaTime);
        fgpQuantumFoamStarBehavior(deltaTime);
        fgpPrismStarBehavior(deltaTime);
        fgpEchoStarBehavior(deltaTime);
        fgpAsciiStarBehavior(deltaTime);
        fgpJsStarBehavior(deltaTime);
        fgpPyStarBehavior(deltaTime);
        fgpCssStarBehavior(deltaTime);
        fgpCsharpStarBehavior(deltaTime);
        fgpGmlStarBehavior(deltaTime);
        fgpJavaStarBehavior(deltaTime);
        fgpPhpStarBehavior(deltaTime);
        fgpRustStarBehavior(deltaTime);
        fgpGoStarBehavior(deltaTime);
        fgpKotlinStarBehavior(deltaTime);
        fgpSwiftStarBehavior(deltaTime);
        fgpTsStarBehavior(deltaTime);
        fgpLuaStarBehavior(deltaTime);
        fgpRubyStarBehavior(deltaTime);
        fgpDartStarBehavior(deltaTime);
    fgpHtmlStarBehavior(deltaTime);
    fgpJsonStarBehavior(deltaTime);
    fgpAssemblyStarBehavior(deltaTime);
    fgpSqlStarBehavior(deltaTime);
        planets.forEach(planet => {
            if (planet.type === 'ttauriStar' && planet.debrisGeneration) {
                const currentTime = Date.now();
                if (currentTime - planet.lastDebrisGeneration > planet.debrisCooldown) {
                    if (Math.random() < 0.3) {
                        generateTtauriDebris(planet);
                    }
                    planet.lastDebrisGeneration = currentTime;
                }
            }
        });
        if (gameState === 'playing') {
            fgpRocketGeneration(deltaTime);
        }
        if (timestamp % 5000 < deltaTime) {
            cleanupOrphanedSatellites();
        }
        ctx.fillStyle = spaceColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        planets.forEach(planet => {
            if (planet.markedForRemoval) return;
            if (planet.type === 'rockyPlanet') {
                fgpLifeEvolution(planet);
            }
        });
        planets.forEach(obj => {
            if (obj.markedForRemoval) return;
            if (obj.type === 'spaceship') {
                fgpSpaceshipBehavior(obj, deltaTime);
            } else if (obj.type === 'superShip') {
                fgpSuperShipBehavior(obj, deltaTime);
            } else if (obj.type === 'laser') {
                fgpLaser(obj, deltaTime);
            } else if (obj.type === 'rocket') {
                fgpRocketBehavior(obj, deltaTime);
            }
        });
        planets = planets.filter(p => !p.markedForRemoval);
        planets.forEach(planet => {
            if (planet.markedForRemoval) return;
            if (planet.type === 'rockyPlanet') {
                fgpPlanetLifeChance(planet);
            }
        });
        if (timestamp % 10000 < deltaTime) {
            cleanupDistantObjects();
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
        fgpWhiteHoles(deltaTime * Math.abs(timeScale));
        fgpBlackHolesAndQuasars(deltaTime * Math.abs(timeScale)); 
        fgpInfoPanel();
    }
    if (temperatureZonesVisible) {
            drawTemperatureZones();
    }
        planets.forEach(planet => {
            if (!planet.markedForRemoval) drawPlanet(planet);
        });
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
        if (spectateMode && spectatedAstro) {
        const astroStillValid = planets.find(p => 
            p === spectatedAstro && 
            !p.markedForRemoval && 
            isFinite(p.x) && 
            isFinite(p.y)
        );
        if (!astroStillValid) {
            spectateMode = false;
            spectatedAstro = null;
            btnSpectate.style.backgroundColor = '';
            showNotification("Lost track of spectated astro. Spectate mode deactivated.");
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
    if (document.body.classList && document.body.classList.contains('pixel-mode')) {
        _fgp_applyPixelPostprocess();
    }
    requestAnimationFrame(gameLoop);
}
function initializeExistingMedusas() {
    planets.forEach(planet => {
        if (planet.type === 'medusaStar') {
            if (!planet.lastExplosionTime) {
                planet.lastExplosionTime = Date.now();
                planet.explosionCooldown = 8000 + Math.random() * 7000;
            }
        }
    });
}
setTimeout(initializeExistingMedusas, 1000);
function debugMedusaPetrification() {
    const medusaStars = planets.filter(p => p.type === 'medusaStar' && !p.markedForRemoval);
    const nitricStars = planets.filter(p => p.type === 'nitricStar' && !p.markedForRemoval);
    const petrifiedObjects = planets.filter(p => p.petrified && !p.markedForRemoval);
    console.log('=== MEDUSA SYSTEM DEBUG (STONE VERSION) ===');
    console.log(`Medusa Stars: ${medusaStars.length}`);
    console.log(`Nitric Stars: ${nitricStars.length}`);
    console.log(`Petrified Objects: ${petrifiedObjects.length}`);
    petrifiedObjects.forEach((obj, index) => {
        console.log(`Petrified ${index}:`, {
            type: obj.type,
            originalType: obj.originalType,
            color: obj.color,
            originalColor: obj.originalColor,
            position: { x: obj.x.toFixed(2), y: obj.y.toFixed(2) }
        });
    });
}
function fgpNitricStarBehavior(deltaTime) {
    const currentTime = Date.now();
    planets.forEach(planet => {
        if (planet.type === 'nitricStar' && !planet.markedForRemoval) {
            if (!planet.lastExplosionTime) {
                planet.lastExplosionTime = currentTime;
                planet.explosionCooldown = planet.explosionCooldown || (5000 + Math.random() * 10000);
            }
            if (!planet.explosionActive && 
                currentTime - planet.lastExplosionTime > planet.explosionCooldown) {
                triggerNitricExplosion(planet);
            }
            if (planet.explosionActive) {
                const explosionDuration = 2000;
                planet.explosionProgress += deltaTime / explosionDuration;
                if (planet.explosionProgress >= 1) {
                    planet.explosionActive = false;
                    planet.explosionProgress = 0;
                    planet.lastExplosionTime = currentTime;
                    planet.explosionCooldown = 5000 + Math.random() * 10000;
                }
            }
            applyNitricDepetrification(planet);
        }
    });
}
function initializePetrificationSystem() {
    planets.forEach(obj => {
        if (obj.petrified && obj.type === 'meteoroid' && obj.originalType) {
            console.log(`Converting old petrified object: ${obj.originalType}`);
            obj.type = obj.originalType;
            obj.color = '#666666';
            obj.glowColor = '#444444';
        }
    });
}
setTimeout(initializePetrificationSystem, 1000);
function cleanupInvalidPlanets() {
    const initialLength = planets.length;
    planets = planets.filter(planet => {
        return planet && 
               typeof planet === 'object' && 
               !planet.markedForRemoval &&
               isFinite(planet.x) && 
               isFinite(planet.y) &&
               isFinite(planet.mass) &&
               planet.mass > 0 &&
               isFinite(planet.radius) &&
               planet.radius > 0;
    });
    if (planets.length !== initialLength) {
        console.log(`Cleaned up ${initialLength - planets.length} invalid planets`);
    }
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
    const shipTypes = ['satellite', 'rocket', 'spaceship', 'superShip'];
    const celestialTypes = ['star', 'redDwarf', 'brownDwarf', 'ttauriStar', 'carbonStar', 'giantStar', 'hypergiant', 'massiveStar', 'redGiant', 'redSupergiant', 'redHypergiant', 'pulsar', 'quarkStar', 'blackHole', 'wormhole', 'quasar', 'whiteHole', 'neutronStar', 'strangeStar', 'magnetar', 'rockyPlanet', 'gasGiant', 'planetoid', 'asteroid', 'meteoroid', 'comet', 'meteorite', 'spaceDust', 'nebula', 'radiation'];
    planets.forEach((planet) => {
        if (planet.locked) return;
        if (['rocket', 'spaceship', 'superShip', 'satellite'].includes(planet.type)) {
            calculateMovementDirection(planet);
        }
    });
    for (let i = 0; i < planets.length; i++) {
        const body = planets[i];
        if (body.type === 'satellite' && body.originPlanet) {
            const dx = body.originPlanet.x - body.x;
            const dy = body.originPlanet.y - body.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
                const force = G * gravityFactor * body.originPlanet.mass / (distance * distance);
                body.vx += (dx / distance) * force * timeFactor;
                body.vy += (dy / distance) * force * timeFactor;
                const currentSpeed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
                const desiredSpeed = Math.sqrt(G * gravityFactor * body.originPlanet.mass / distance);
                if (currentSpeed > 0) {
                    const speedRatio = desiredSpeed / currentSpeed;
                    body.vx *= speedRatio;
                    body.vy *= speedRatio;
                }
                if (body.vx !== 0 || body.vy !== 0) {
                    body.direction = Math.atan2(body.vy, body.vx);
                }
            }
        }
        if (body.type === 'rocket') {
            const thrustPower = 0.3;
            body.vx += Math.cos(body.direction || 0) * thrustPower * timeFactor;
            body.vy += Math.sin(body.direction || 0) * thrustPower * timeFactor;
            for (let j = 0; j < planets.length; j++) {
                const other = planets[j];
                if (celestialTypes.includes(other.type) && other !== body) {
                    const dx = other.x - body.x;
                    const dy = other.y - body.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > other.radius + body.radius) {
                        const force = (G * gravityFactor * other.mass) / (distance * distance) * 0.1;
                        body.vx += (dx / distance) * force * timeFactor;
                        body.vy += (dy / distance) * force * timeFactor;
                    }
                }
            }
            if (body.vx !== 0 || body.vy !== 0) {
                body.direction = Math.atan2(body.vy, body.vx);
            }
        }
        if (body.type === 'spaceship' || body.type === 'superShip') {
            const baseThrust = body.type === 'superShip' ? 0.2 : 0.4;
            body.vx += Math.cos(body.direction || 0) * baseThrust * timeFactor;
            body.vy += Math.sin(body.direction || 0) * baseThrust * timeFactor;
            for (let j = 0; j < planets.length; j++) {
                const other = planets[j];
                if (celestialTypes.includes(other.type) && other !== body && other !== body.originPlanet) {
                    const dx = other.x - body.x;
                    const dy = other.y - body.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > other.radius + body.radius + 50) {
                        const force = (G * gravityFactor * other.mass) / (distance * distance) * 0.05;
                        body.vx += (dx / distance) * force * timeFactor;
                        body.vy += (dy / distance) * force * timeFactor;
                    }
                }
            }
            if (body.vx !== 0 || body.vy !== 0) {
                body.direction = Math.atan2(body.vy, body.vx);
            }
            if (body.type === 'superShip') {
                const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
                if (speed > 10) {
                    body.vx *= 0.98;
                    body.vy *= 0.98;
                }
            }
        }
    }
    for (let i = 0; i < planets.length; i++) {
        const planetA = planets[i];
        if (shipTypes.includes(planetA.type)) continue;
        for (let j = i + 1; j < planets.length; j++) {
            const planetB = planets[j];
            if (shipTypes.includes(planetB.type)) continue;
            if (planetA.phased || planetB.phased) continue;
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
        const body = planets[i];
        if (!body.locked) {
            if (dragFactor > 0 && timeScale > 0 && !shipTypes.includes(body.type)) {
                body.vx *= (1 - dragFactor * timeFactor);
                body.vy *= (1 - dragFactor * timeFactor);
            }
            body.x += body.vx * timeFactor;
            body.y += body.vy * timeFactor;
            if (shipTypes.includes(body.type)) {
                const maxSpeed = body.type === 'rocket' ? 20 : 
                               body.type === 'spaceship' ? 15 : 10;
                const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
                if (speed > maxSpeed) {
                    body.vx = (body.vx / speed) * maxSpeed;
                    body.vy = (body.vy / speed) * maxSpeed;
                }
            }
        }
    }
    cleanupDistantShips();
    checkRadiationCount();
}
preloadCollisionSounds();
function cleanupDistantShips() {
    const MAX_DISTANCE = 100000;
    for (let i = planets.length - 1; i >= 0; i--) {
        const obj = planets[i];
        if (['rocket', 'spaceship', 'superShip'].includes(obj.type)) {
            let distanceFromOrigin = Infinity;
            if (obj.originPlanet) {
                const dx = obj.x - obj.originPlanet.x;
                const dy = obj.y - obj.originPlanet.y;
                distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
            } else if (obj.originShip) {
                const dx = obj.x - obj.originShip.x;
                const dy = obj.y - obj.originShip.y;
                distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
            } else {
                distanceFromOrigin = 0;
            }
            if (distanceFromOrigin > MAX_DISTANCE) {
                planets.splice(i, 1);
            }
        }
    }
}
function cleanupDistantObjects() {
    const MAX_DISTANCE = 1000000;
    for (let i = planets.length - 1; i >= 0; i--) {
        const obj = planets[i];
        const distance = Math.sqrt(obj.x * obj.x + obj.y * obj.y);
        if (distance > MAX_DISTANCE && 
            !['star', 'rockyPlanet', 'gasGiant', 'blackHole', 'quasar'].includes(obj.type)) {
            planets.splice(i, 1);
        }
    }
}
function isValidRocketTarget(target) {
    const validTargetTypes = ['meteorite', 'meteoroid', 'comet', 'asteroid', 'planetoid', 'rockyPlanet'];
    return validTargetTypes.includes(target.type);
}
function findNewTargetForRocket(rocket) {
    if (rocket.originPlanet && !rocket.originPlanet.markedForRemoval) {
        return rocket.originPlanet;
    }
    const backupTargets = planets.filter(p => 
        !p.markedForRemoval && 
        (p.type === 'rockyPlanet' || p.type === 'planetoid') &&
        p !== rocket
    );
    if (backupTargets.length > 0) {
        let nearestTarget = null;
        let minDistance = Infinity;
        backupTargets.forEach(target => {
            const dx = target.x - rocket.x;
            const dy = target.y - rocket.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestTarget = target;
            }
        });
        return nearestTarget;
    }
    return null;
}
function shouldAvoidAstro(astro) {
    const avoidTypes = [
        'gasGiant', 'star', 'redDwarf', 'brownDwarf', 'ttauriStar', 
        'carbonStar', 'giantStar', 'hypergiant', 'massiveStar', 
        'redGiant', 'redSupergiant', 'redHypergiant', 'pulsar', 
        'quarkStar', 'blackHole', 'wormhole', 'quasar', 'whiteHole', 
        'neutronStar', 'strangeStar', 'magnetar'
    ];
    return avoidTypes.includes(astro.type);
}
function avoidLargeAstro(rocket, astro, deltaTime) {
    const dx = astro.x - rocket.x;
    const dy = astro.y - rocket.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const safeDistance = astro.radius * 3;
    if (distance < safeDistance) {
        const avoidAngle = Math.atan2(dy, dx) + Math.PI;
        const avoidanceStrength = 0.3 * (1 - (distance / safeDistance));
        rocket.vx += Math.cos(avoidAngle) * avoidanceStrength * (deltaTime / 16);
        rocket.vy += Math.sin(avoidAngle) * avoidanceStrength * (deltaTime / 16);
        return true;
    }
    return false;
}
function handleRocketCollision(rocket, target) {
    if (target === rocket.originPlanet) {
        rocket.markedForRemoval = true;
        return;
    }
    const smallTargets = ['meteorite', 'meteoroid', 'comet', 'asteroid'];
    const largeTargets = ['planetoid', 'rockyPlanet'];
    if (smallTargets.includes(target.type)) {
        rocket.markedForRemoval = true;
        target.markedForRemoval = true;
    } else if (largeTargets.includes(target.type)) {
        rocket.markedForRemoval = true;
    } else {
        rocket.markedForRemoval = true;
    }
}
function fgpShipMovement(deltaTime) {
    if (!controlMode || !controlledShip || controlledShip.markedForRemoval) return;
    const acceleration = 0.5 * (deltaTime / 16); 
    const maxSpeed = 10;
    if (keys['w'] || keys['W'] || keys['ArrowUp']) {
        controlledShip.vy -= acceleration;
    }
    if (keys['s'] || keys['S'] || keys['ArrowDown']) {
        controlledShip.vy += acceleration;
    }
    if (keys['a'] || keys['A'] || keys['ArrowLeft']) {
        controlledShip.vx -= acceleration;
    }
    if (keys['d'] || keys['D'] || keys['ArrowRight']) {
        controlledShip.vx += acceleration;
    }
    const speed = Math.sqrt(controlledShip.vx * controlledShip.vx + controlledShip.vy * controlledShip.vy);
    if (speed > maxSpeed) {
        controlledShip.vx = (controlledShip.vx / speed) * maxSpeed;
        controlledShip.vy = (controlledShip.vy / speed) * maxSpeed;
    }
    camera.x = controlledShip.x;
    camera.y = controlledShip.y;
}
function fgpSpaceshipBehavior(obj, deltaTime) {
    if (obj.type === 'rockyPlanet' && obj.population > 1000) {
        if (!obj.lastShipProduction) obj.lastShipProduction = 0;
        obj.lastShipProduction += deltaTime;
        const productionInterval = Math.max(30000, 60000 - (obj.population / 10000) * 1000);
        if (obj.lastShipProduction >= productionInterval) {
            obj.lastShipProduction = 0;
            const productionChance = Math.min(0.8, obj.population / 100000);
            if (Math.random() < productionChance) {
                produceSpaceship(obj);
            }
        }
    }
    if (obj.type === 'spaceship' || obj.type === 'rocket' || obj.type === 'superShip') {
        if (obj.avoidanceField === undefined) obj.avoidanceField = 80; 
        if (obj.maxSpeed === undefined) obj.maxSpeed = 2; 
        if (obj.steeringStrength === undefined) obj.steeringStrength = 0.02; 
        if (!obj.target) {
            findTargetForSpaceship(obj);
        }
        if (obj.target) {
            const dx = obj.target.x - obj.x;
            const dy = obj.target.y - obj.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const steer = obj.steeringStrength;
            obj.vx += (dx / distance) * steer * (deltaTime / 16);
            obj.vy += (dy / distance) * steer * (deltaTime / 16);
        }
        for (let i = 0; i < planets.length; i++) {
            const other = planets[i];
            if (other === obj || other === obj.originPlanet) continue;
            const dx = other.x - obj.x;
            const dy = other.y - obj.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001;
            const minDistance = obj.avoidanceField + (other.radius || 0);
            if (distance < minDistance && distance > 0) {
                const force = 0.25 * (1 - (distance / minDistance));
                obj.vx -= (dx / distance) * force * (deltaTime / 16);
                obj.vy -= (dy / distance) * force * (deltaTime / 16);
            }
        }
        const speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);
        if (speed > obj.maxSpeed) {
            obj.vx = (obj.vx / speed) * obj.maxSpeed;
            obj.vy = (obj.vy / speed) * obj.maxSpeed;
        }
        if (obj.vx !== 0 || obj.vy !== 0) {
            obj.direction = Math.atan2(obj.vy, obj.vx);
        }
        if (!obj._lastFire) obj._lastFire = 0;
        obj._lastFire += deltaTime;
        const fireCooldown = obj.fireRate || 1200; 
        function ensureRelation(aPlanet, bPlanet) {
            if (!aPlanet || !bPlanet) return null;
            aPlanet._relations = aPlanet._relations || {};
            bPlanet._relations = bPlanet._relations || {};
            const keyA = bPlanet.id || bPlanet._id || (bPlanet.x + '_' + bPlanet.y);
            const keyB = aPlanet.id || aPlanet._id || (aPlanet.x + '_' + aPlanet.y);
            if (aPlanet._relations[keyA] === undefined && bPlanet._relations[keyB] === undefined) {
                const roll = Math.floor(Math.random() * 20) + 1;
                const relation = roll <= 10 ? 'war' : 'peace';
                aPlanet._relations[keyA] = relation;
                bPlanet._relations[keyB] = relation;
                if (relation === 'war') {
                }
            }
            return aPlanet._relations[keyA];
        }
        let nearestThreat = null;
        let threatDist = Infinity;
        for (let i = 0; i < planets.length; i++) {
            const p = planets[i];
            if (p === obj) continue;
            if (['asteroid','meteoroid','meteorite','comet'].includes(p.type)) {
                const dx = p.x - obj.x;
                const dy = p.y - obj.y;
                const d = Math.hypot(dx, dy);
                if (d < 800 && d < threatDist) { 
                    threatDist = d;
                    nearestThreat = p;
                }
            }
        }
        if (nearestThreat && obj._lastFire >= fireCooldown) {
            obj._lastFire = 0;
        }
        for (let i = 0; i < planets.length; i++) {
            const p = planets[i];
            if (p === obj) continue;
            if (!['spaceship','rocket','superShip'].includes(p.type)) continue;
            const sameCivilization = obj.originPlanet && p.originPlanet && (obj.originPlanet === p.originPlanet || obj.originPlanet.id === p.originPlanet.id);
            if (sameCivilization) continue;
            const myOrigin = obj.originPlanet || { _relations: {} };
            const relation = ensureRelation(myOrigin, p.originPlanet || p);
            if (relation === 'war') {
                const dx = p.x - obj.x;
                const dy = p.y - obj.y;
                const d = Math.hypot(dx, dy);
                if (d < 900 && obj._lastFire >= fireCooldown) {
                    obj._lastFire = 0;
                }
            }
        }
    }
}
function produceSpaceship(planet) {
    const shipTypes = ['spaceship', 'rocket'];
    const shipType = shipTypes[Math.floor(Math.random() * shipTypes.length)];
    const newShip = {
        x: planet.x + (Math.random() - 0.5) * planet.radius * 2,
        y: planet.y + (Math.random() - 0.5) * planet.radius * 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        mass: 1,
        radius: 3,
        color: shipType === 'rocket' ? '#ff4444' : '#44ff44',
        type: shipType,
        name: `${planet.name} ${shipType} ${Math.floor(Math.random() * 1000)}`,
        population: 0,
        originalRadius: 3
    };
    newShip.originPlanet = planet;
    newShip.designVariant = Math.floor(Math.random() * 4) + 1;
    newShip.id = newShip.id || Math.random().toString(36).substr(2,9);
    planets.push(newShip);
    showNotification(`🛸 ${planet.name} launched a ${shipType}!`);
}
function findTargetForSpaceship(ship) {
    let nearestTarget = null;
    let minDistance = Infinity;
    planets.forEach(planet => {
        if (planet === ship) return;
        const dx = planet.x - ship.x;
        const dy = planet.y - ship.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isGoodTarget = (planet.type === 'rockyPlanet' && planet.population > 0) || 
                            planet.type === 'gasGiant' ||
                            planet.type === 'asteroid';
        if (isGoodTarget && distance < minDistance && distance > 100) {
            minDistance = distance;
            nearestTarget = planet;
        }
    });
    ship.target = nearestTarget;
}
function fgpSuperShipBehavior(ship, deltaTime) {
    for (let i = 0; i < planets.length; i++) {
        const other = planets[i];
        if (other !== ship && other !== ship.originPlanet) {
            const dx = other.x - ship.x;
            const dy = other.y - ship.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ship.avoidanceField + other.radius) {
                const force = 0.5;
                ship.vx -= (dx / distance) * force;
                ship.vy -= (dy / distance) * force;
            }
        }
    }
    ship.lastProduction += deltaTime;
    if (ship.lastProduction >= ship.productionRate) {
        const productionType = ship.canProduce[Math.floor(Math.random() * ship.canProduce.length)];
        if (productionType === 'satellite') {
            createSatellites(ship.originPlanet, 1);
        } else if (productionType === 'spaceship3') {
            createSpaceship(ship.originPlanet, 3);
        } else if (productionType === 'spaceship4') {
            if (Math.random() < 0.1) {
                createSpaceship(ship.originPlanet, 4);
            }
        }
        ship.lastProduction = 0;
    }
}
function playRandomCollisionSound() {
    if (collisionSounds.length === 0) return;
    const sound = collisionSounds[Math.floor(Math.random() * collisionSounds.length)];
    sound.volume = sfxVolume;
    sound.currentTime = 0;
    const playPromise = sound.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Reprodução de efeito sonoro bloqueada:", error);
        });
    }
}
function createCollisionSound(src) {
    const sound = new Audio(src);
    sound.volume = sfxVolume;
    collisionSounds.push(sound);
    return sound;
}
function preloadCollisionSounds() {
    for (let i = 1; i <= 15; i++) {
        const sound = new Audio(`../assets/audio/Sound effect colide ${i}.mp3`);
        collisionSounds.push(sound);
    }
}
function handleCollisions() {
    const shipPower = {
        'rocket': 1,
        'spaceship': 2,
        'superShip': 3,
        'satellite': 1
    };
    const astroPower = {
        'asteroid': 1,
        'meteoroid': 0.5,
        'meteorite': 0.5,
        'comet': 1,
        'rockyPlanet': 4,
        'planetoid': 3,
        'gasGiant': 3,
        'star': 4,
        'blackHole': 5,
        'quasar': 5,
        'whiteHole': 5,
        'pulsar': 4,
        'neutronStar': 4,
        'medusaStar': 6, 
        'nitricStar': 6 
    };
    for (let i = 0; i < planets.length; i++) {
        const a = planets[i];
        if (a.markedForRemoval) continue;
        for (let j = i + 1; j < planets.length; j++) {
            const b = planets[j];
            if (b.markedForRemoval) continue;
            if (a.phased || b.phased) continue;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);
            const minDistance = (a.radius + b.radius) * 0.8;
            if (distance < minDistance) {
                playRandomCollisionSound();
                if (a.type === 'nitricStar') {
                    if (handleNitricStarCollisions(a, b))
                    continue;
                }
                if (b.type === 'nitricStar') {
                    if (handleNitricStarCollisions(b, a)) continue;
                }
                if (a.type === 'medusaStar') {
                    if (handleMedusaStarCollisions(a, b)) continue;
                }
                if (b.type === 'medusaStar') {
                    if (handleMedusaStarCollisions(b, a)) continue;
                }
                for (const [ship, power] of Object.entries(shipPower)) {
                        if (a.type === ship && astroPower[b.type] !== undefined) {
                            if (a.originPlanet && a.originPlanet === b) {
                                removeFromOriginLists(a);
                                a.markedForRemoval = true;
                            } else if (power >= astroPower[b.type]) {
                                removeFromOriginLists(a);
                                removeFromOriginLists(b);
                                a.markedForRemoval = true;
                                b.markedForRemoval = true;
                            } else {
                                removeFromOriginLists(a);
                                a.markedForRemoval = true;
                            }
                            continue;
                        }
                        if (b.type === ship && astroPower[a.type] !== undefined) {
                            if (b.originPlanet && b.originPlanet === a) {
                                removeFromOriginLists(b);
                                b.markedForRemoval = true;
                            } else if (power >= astroPower[a.type]) {
                                removeFromOriginLists(a);
                                removeFromOriginLists(b);
                                b.markedForRemoval = true;
                                a.markedForRemoval = true;
                            } else {
                                removeFromOriginLists(b);
                                b.markedForRemoval = true;
                            }
                            continue;
                        }
                }
                if ((a.type === 'nebula' && !['nebula', 'radiation'].includes(b.type)) ||
                    (b.type === 'nebula' && !['nebula', 'radiation'].includes(a.type))) {
                    continue;
                }
                const shipTypes = ['rocket', 'spaceship', 'superShip', 'satellite'];
                if (shipTypes.includes(a.type) || shipTypes.includes(b.type)) {
                    if (shipTypes.includes(a.type) && b === a.originPlanet) {
                        removeFromOriginLists(a);
                        a.markedForRemoval = true;
                        continue;
                    }
                    if (shipTypes.includes(b.type) && a === b.originPlanet) {
                        removeFromOriginLists(b);
                        b.markedForRemoval = true;
                        continue;
                    }
                    if (a.mass >= b.mass) {
                        removeFromOriginLists(b);
                        b.markedForRemoval = true;
                    } else {
                        removeFromOriginLists(a);
                        a.markedForRemoval = true;
                    }
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
                if (larger.type === 'nebula' && !['nebula', 'radiation'].includes(smaller.type)) {
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
                if (!isFinite(larger.mass) || !isFinite(smaller.mass)) {
                    console.warn('[WARN] massa inválida detectada durante fusão:', { larger, smaller });
                    if (!isFinite(larger.mass)) larger.markedForRemoval = true;
                    if (!isFinite(smaller.mass)) smaller.markedForRemoval = true;
                    continue;
                }
                const combinedValues = calculateCombinedValues(larger, smaller);
                larger.mass += smaller.mass;
                if (!isFinite(larger.mass) || larger.mass <= 0) {
                    console.warn('[WARN] larger.mass inválida depois da soma, ajustando para 1');
                    larger.mass = 1;
                }
                larger.radius = calculateRadiusForType(larger.type, larger.mass);
                const totalMass = larger.mass;
                if (!isFinite(totalMass) || totalMass <= 0) {
                    console.warn('[WARN] totalMass inválido durante fusão:', totalMass);
                    continue;
                }
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
                removeFromOriginLists(smaller);
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
function handleMedusaCollision(medusa, other) {
    if (other.markedForRemoval) return true;
    if (canBePetrifiedByMedusa(other)) {
        console.log(`🔮 Medusa collision petrifying: ${other.type} (color to gray)`);
        transformToStone(other);
        createMedusaCollisionEffect(other);
        return true;
    }
    console.log(`🔮 Medusa collision with non-petrifiable: ${other.type}`);
    return true;
}
function handleNitricStarCollisions(nitricStar, other) {
    if (nitricStar.explosionActive && other.mass < nitricStar.mass * 0.1) {
        if (!['medusaStar', 'nitricStar', 'blackHole', 'quasar', 'singularityStar', 'star'].includes(other.type)) {
            other.markedForRemoval = true;
            createDestructionEffect(other);
            console.log(`Nitric Star explosion destroyed: ${other.type}`);
        }
        return true;
    }
    if (other.petrified) {
        depetrifyAstro(other);
        return true;
    }
    return false;
}
function handleMedusaStarCollisions(medusaStar, other) {
    if (isSpaceshipType(other.type)) {
        transformToMeteoroid(other);
        return true;
    }   
    return false;
}
function onNitricStarCreated(planet) {
    console.log('Nitric Star created with properties:', {
        mass: planet.mass,
        radius: planet.radius,
        explosionCooldown: planet.explosionCooldown,
        position: { x: planet.x, y: planet.y }
    });
}
function removeFromOriginLists(obj) {
    if (!obj.originPlanet) return;
    if (obj.type === 'satellite' && Array.isArray(obj.originPlanet.satellites)) {
        obj.originPlanet.satellites = obj.originPlanet.satellites.filter(s => s !== obj);
    }
    if (obj.type === 'rockyPlanet') {
        console.log(`🛑 Cleaning up planet: ${obj.name}`);
        if (obj._satelliteSpawnerTimeout) {
            clearTimeout(obj._satelliteSpawnerTimeout);
            obj._satelliteSpawnerTimeout = null;
        }
        obj._satelliteSpawnerActive = false;
        obj._stopSatelliteSpawner = true;
        if (Array.isArray(obj.satellites)) {
            obj.satellites.forEach(satellite => {
                satellite.markedForRemoval = true;
            });
            obj.satellites = [];
        }
    }
    if (obj.type === 'rocket' && Array.isArray(obj.originPlanet.rockets)) {
        obj.originPlanet.rockets = obj.originPlanet.rockets.filter(s => s !== obj);
    }
    if (obj.type === 'spaceship' && Array.isArray(obj.originPlanet.spaceships)) {
        obj.originPlanet.spaceships = obj.originPlanet.spaceships.filter(s => s !== obj);
    }
    if (obj.type === 'superShip' && Array.isArray(obj.originPlanet.superShips)) {
        obj.originPlanet.superShips = obj.originPlanet.superShips.filter(s => s !== obj);
    }
}
function spawnRocketPeriodically() {
}
function isSpaceshipType(type) {
    return ['rocket', 'spaceship', 'superShip', 'satellite'].includes(type);
}
function resetMemoryVariables() {
    tsCoins = 0;
    gameStartCount = 0;
    purchasedItems = {};
    unlockedAstroTypes = [];
    unlockedConfigs = [];
    achievementsState = {};
    hasAgreedToWarnings = false;
    planets = [];
    universeAge = 0;
    universeTime = 0;
    camera = { x: 0, y: 0, zoom: 10 };
    timeScale = 1;
    spaceColor = '#000000';
    gravityFactor = 1.0;
    dragFactor = 0.0;
}
const secretResetBtn = document.getElementById('secretResetBtn');
if (secretResetBtn) {
    secretResetBtn.addEventListener('click', resetEverythingDev);
}
function cleanupDestroyedShips() {
    for (let i = planets.length - 1; i >= 0; i--) {
        const obj = planets[i];
        if (obj.markedForRemoval && isSpaceshipType(obj.type)) {
            planets.splice(i, 1);
            continue;
        }
        if (isSpaceshipType(obj.type)) {
            if (!isFinite(obj.x) || !isFinite(obj.y) || 
                Math.abs(obj.x) > 1e10 || Math.abs(obj.y) > 1e10) {
                obj.markedForRemoval = true;
            }
        }
    }
}
function handleSpaceshipCollision(spaceship, astro) {
    try {
        spaceship.markedForRemoval = true;
        console.log(`💥 ${spaceship.type} destroyed after collision with ${astro.type}`);
    } catch (error) {
        console.error('Error in handleSpaceshipCollision:', error);
        spaceship.markedForRemoval = true;
    }
}
function handleAstroCollision(a, b) {
    if (a.mass > b.mass) {
        a.mass += b.mass;
        a.radius = Math.cbrt(a.mass) * 5;
        b.markedForRemoval = true;
    } else {
        b.mass += a.mass;
        b.radius = Math.cbrt(b.mass) * 5;
        a.markedForRemoval = true;
    }
}
function handleCollisionResponse(a, b, dx, dy, distance, minDistance) {
    if (distance === 0) return;
    const nx = dx / distance;
    const ny = dy / distance;
    const separation = (minDistance - distance) / 2;
    a.x += nx * separation;
    a.y += ny * separation;
    b.x -= nx * separation;
    b.y -= ny * separation;
    if (a.type === 'rocket' && b.mass > a.mass * 10) {
        a.markedForRemoval = true;
    } else if (b.type === 'rocket' && a.mass > b.mass * 10) {
        b.markedForRemoval = true;
    }
}
function handleSpaceshipCombat(a, b) {
    a.markedForRemoval = true;
    b.markedForRemoval = true;
}
function calculateCombinedValues(larger, smaller) {
    const totalMass = larger.mass + smaller.mass;
    const largerRatio = larger.mass / totalMass;
    const smallerRatio = smaller.mass / totalMass;
    return {
        water: Math.max(0, Math.min(100, 
            (larger.waterValue || 0) * largerRatio + 
            (smaller.waterValue || 0) * smallerRatio
        )),
        gas: Math.max(0, Math.min(100, 
            (larger.gasValue || 0) * largerRatio + 
            (smaller.gasValue || 0) * smallerRatio
        )),
        clouds: Math.max(0, Math.min(100, 
            (larger.cloudsValue || 0) * largerRatio + 
            (smaller.cloudsValue || 0) * smallerRatio
        )),
        temperature: 
            larger.temperature * largerRatio + 
            smaller.temperature * smallerRatio,
        biomass: Math.max(0, Math.min(100, 
            (larger.biomass || 0) * largerRatio + 
            (smaller.biomass || 0) * smallerRatio
        )),
        population: Math.max(0, Math.min(100, 
            (larger.population || 0) * largerRatio + 
            (smaller.population || 0) * smallerRatio
        ))
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
function addTSCoins(amount) {
    tsCoins += amount;
    localStorage.setItem('tsCoins', tsCoins.toString());
    fgpTSCoinsDisplay();
    showNotification(`+${amount} TS Coins! Total: ${tsCoins}`);
}
function fgpTSCoinsDisplay() {
    const tsCoinsDisplay = document.getElementById('tsCoinsDisplay');
    if (tsCoinsDisplay) {
        tsCoinsDisplay.textContent = tsCoins;
    }
}
function initializeAdMob() {
    console.log('🔄 Inicializando AdMob...');
    if (isNewAdAccount) {
        console.log('🆕 Conta de anúncios nova - usando modo de desenvolvimento');
        showNotification("🔧 Modo desenvolvimento: Anúncios simulados");
        setupAdFallback();
        return false;
    }
    try {
        if (typeof google === 'undefined' || !google.ads) {
            console.warn('❌ Google Ads SDK não disponível');
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-app-pub-3391757604945167~6359035577';
            script.crossOrigin = 'anonymous';
            script.async = true;
            script.onload = () => {
                console.log('✅ SDK carregado dinamicamente');
                setTimeout(() => initializeAdMobReal(), 1000);
            };
            script.onerror = () => {
                console.error('❌ Falha ao carregar SDK dinamicamente');
                setupAdFallback();
            };
            document.head.appendChild(script);
            return false;
        }
        return initializeAdMobReal();
    } catch (error) {
        console.error('❌ Erro na inicialização do AdMob:', error);
        setupAdFallback();
        return false;
    }
}
function initializeAdMobReal() {
    try {
        console.log('🚀 Inicializando AdMob real...');
        const settings = google.ads.getGoogleAdManagerSettings();
        if (settings) {
            settings.setApplicationVolume(0.5);
        }
        rewardAd = google.ads.getRewardedVideoAd(ADMOB_REWARD_AD_ID);
        if (!rewardAd) {
            throw new Error('Falha ao criar instância do anúncio');
        }
        rewardAd.addEventListener('ad-loaded', () => {
            console.log('✅ Anúncio carregado com sucesso');
            isAdLoading = false;
            updateAdStatus();
            showNotification("✅ Anúncio pronto! Clique para assistir.");
        });
        rewardAd.addEventListener('ad-failed-to-load', (error) => {
            console.error('❌ Falha ao carregar anúncio:', error);
            isAdLoading = false;
            updateAdStatus();
            if (isNewAdAccount) {
                showNotification("🆕 Conta em verificação - Use modo offline");
            } else {
                showNotification("❌ Falha ao carregar anúncio");
            }
            setupAdFallback();
        });
        rewardAd.addEventListener('ad-rewarded', (reward) => {
            console.log('🎁 Recompensa concedida:', reward);
            handleAdReward();
        });
        rewardAd.addEventListener('ad-opened', () => {
            console.log('📱 Anúncio aberto');
            showNotification("🎬 Anúncio em andamento...");
        });
        rewardAd.addEventListener('ad-closed', () => {
            console.log('❎ Anúncio fechado');
            showNotification("✅ Anúncio finalizado");
            setTimeout(loadRewardAd, 2000);
        });
        admobInitialized = true;
        console.log('✅ AdMob inicializado com sucesso');
        loadRewardAd();
        return true;
    } catch (error) {
        console.error('❌ Erro crítico no AdMob real:', error);
        setupAdFallback();
        return false;
    }
}
function debugAdSystem() {
    console.group('🔧 Debug do Sistema de Anúncios');
    console.log('Navigator online:', navigator.onLine);
    console.log('Google object:', typeof google);
    if (typeof google !== 'undefined') {
        console.log('Google.ads:', google.ads);
        console.log('Reward ad loaded:', rewardAd?.isLoaded?.());
    } else {
        console.log('Google.ads: NOT AVAILABLE');
        console.log('Reward ad loaded: N/A (Google not defined)');
    }
    console.log('AdMob initialized:', admobInitialized);
    console.log('Ad loading:', isAdLoading);
    console.log('Reward ad:', rewardAd);
    console.log('Purchased items:', purchasedItems);
    console.log('TS Coins:', tsCoins);
    console.groupEnd();
}
debugAdSystem();
function loadRewardAd() {
    if (!admobInitialized || !rewardAd || isAdLoading) return;
    try {
        isAdLoading = true;
        updateAdStatus();
        rewardAd.load();
    } catch (error) {
        console.error('Erro ao carregar anúncio:', error);
        isAdLoading = false;
        updateAdStatus();
    }
}
function waitForCoins() {
    const now = Date.now();
    const lastWait = parseInt(localStorage.getItem('lastWaitForCoins') || '0');
    const cooldown = 5 * 60 * 1000;
    if (now - lastWait < cooldown) {
        const remaining = cooldown - (now - lastWait);
        return;
    }
    addTSCoins(100);
    localStorage.setItem('lastWaitForCoins', now.toString());
    const card = document.getElementById('waitForCoinsCard');
    card.classList.add('pulse-animation');
    setTimeout(() => card.classList.remove('pulse-animation'), 1000);
    updateWaitForCoinsUI();
}
function dayForCoins() {
    const now = Date.now();
    const lastDaily = parseInt(localStorage.getItem('lastDailyReward') || '0');
    const streak = parseInt(localStorage.getItem('dailyRewardStreak') || '0');
    const oneDay = 23 * 60 * 60 * 1000 + 56 * 60 * 1000;
    if (now - lastDaily < oneDay) {
        const nextAvailable = lastDaily + oneDay;
        return;
    }
    let newStreak = streak;
    let reward = 1000;
    if (streak === 0 || now - lastDaily > oneDay * 2) {
        newStreak = 1;
        reward = 1000;
    } else {
        newStreak = streak + 1;
        reward = 1000 + (newStreak - 1) * 100;
    }
    addTSCoins(reward);
    localStorage.setItem('lastDailyReward', now.toString());
    localStorage.setItem('dailyRewardStreak', newStreak.toString());
    const card = document.getElementById('dayForCoinsCard');
    card.classList.add('pulse-animation');
    setTimeout(() => card.classList.remove('pulse-animation'), 1000);
    updateDayForCoinsUI();
    if (newStreak >= 7) unlockAchievement(51);
    if (newStreak >= 30) unlockAchievement(52);
}
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v < 10 ? '0' + v : v).join(':');
}
function updateWaitForCoinsUI() {
    const lastWait = parseInt(localStorage.getItem('lastWaitForCoins') || '0');
    const cooldown = 5 * 60 * 1000;
    const now = Date.now();
    const remaining = cooldown - (now - lastWait);
    const statusElement = document.getElementById('waitForCoinsStatus');
    const timerElement = document.getElementById('waitForCoinsTimer');
    const card = document.getElementById('waitForCoinsCard');
    if (remaining > 0) {
        statusElement.textContent = "⏳ ...";
        statusElement.style.color = '#f44336';
        timerElement.textContent = `Disponível em: ${formatTime(remaining / 1000)}`;
        card.style.opacity = '0.6';
        card.style.cursor = 'not-allowed';
    } else {
        statusElement.textContent = "✅ Disponível";
        statusElement.style.color = '#4CAF50';
        timerElement.textContent = 'Pronto para coletar!';
        card.style.opacity = '1';
        card.style.cursor = 'pointer';
    }
}
function updateDayForCoinsUI() {
    const lastDaily = parseInt(localStorage.getItem('lastDailyReward') || '0');
    const streak = parseInt(localStorage.getItem('dailyRewardStreak') || '0');
    const oneDay = 23 * 60 * 60 * 1000 + 56 * 60 * 1000;
    const now = Date.now();
    const remaining = lastDaily + oneDay - now;
    const statusElement = document.getElementById('dayForCoinsStatus');
    const timerElement = document.getElementById('dayForCoinsTimer');
    const card = document.getElementById('dayForCoinsCard');
    const rewardAmountElement = document.getElementById('dailyRewardAmount');
    const streakInfoElement = document.getElementById('dailyStreakInfo');
    const descriptionElement = document.getElementById('dailyRewardDescription');
    const nextReward = 1000 + streak * 100;
    streakInfoElement.textContent = `Streak: Day ${Math.max(1, streak)}`;
    descriptionElement.textContent = `${nextReward} TSCs for every day (each day it adds +100).`;
    rewardAmountElement.innerHTML = `+${nextReward} TSCs!<img src="../assets/img/tsCoins.png" class="tsCoinsIcon" alt="">`;
    if (remaining > 0) {
        statusElement.textContent = "⏳ ...";
        statusElement.style.color = '#f44336';
        timerElement.textContent = `Missing: ${formatTime(remaining / 1000)}`;
        card.style.opacity = '0.6';
        card.style.cursor = 'not-allowed';
    } else {
        statusElement.textContent = "✅";
        statusElement.style.color = '#4CAF50';
        timerElement.textContent = 'GET!';
        card.style.opacity = '1';
        card.style.cursor = 'pointer';
    }
}
function initTimers() {
    updateWaitForCoinsUI();
    updateDayForCoinsUI();
    waitForCoinsInterval = setInterval(updateWaitForCoinsUI, 1000);
    dayForCoinsInterval = setInterval(updateDayForCoinsUI, 1000);
}
function stopTimers() {
    if (waitForCoinsInterval) {
        clearInterval(waitForCoinsInterval);
    }
    if (dayForCoinsInterval) {
        clearInterval(dayForCoinsInterval);
    }
}
async function watchAdForCoins() {
    console.log('🎬 Iniciando watchAdForCoins');
    debugAdSystem();
    if (isNewAdAccount) {
        simulateAdForNewAccount();
        return;
    }
    if (!navigator.onLine) {
        showNotification("❌ Sem conexão. Usando modo offline.");
        simulateAdFallback();
        return;
    }
    const hasAdBlock = await checkAdBlock();
    if (hasAdBlock) {
        showNotification("🚫 Bloqueador detectado. Desative para anúncios reais.");
        simulateAdFallback();
        return;
    }
    if (isAdLoading) {
        showNotification("⏳ Anúncio ainda carregando...");
        return;
    }
    if (admobInitialized && rewardAd && rewardAd.isLoaded && rewardAd.isLoaded()) {
        try {
            console.log('📱 Exibindo anúncio do AdMob');
            rewardAd.show();
        } catch (error) {
            console.error('Erro ao exibir anúncio:', error);
            showNotification("❌ Erro ao exibir anúncio. Usando fallback.");
            simulateAdFallback();
        }
    } else {
        console.log('🔄 AdMob não disponível, usando fallback');
        showNotification("🔄 Usando sistema offline...");
        simulateAdFallback();
        if (!admobInitialized) {
            console.log('🔄 Tentando reinicializar AdMob...');
            setTimeout(() => {
                initializeAdMob().catch(console.warn);
            }, 5000);
        }
    }
}
function handleAdReward() {
    console.log('💰 Processando recompensa do anúncio');
    addTSCoins(1000);
    const adsWatched = parseInt(localStorage.getItem('adsWatched') || '0') + 1;
    localStorage.setItem('adsWatched', adsWatched.toString());
    showNotification("✅ +1.000 TS Coins! Obrigado por assistir!");
    setTimeout(() => {
        if (admobInitialized) {
            loadRewardAd();
        }
    }, 3000);
}
function switchAccountMode() {
    isNewAdAccount = !isNewAdAccount;
    document.getElementById('devAccountStatus').textContent = isNewAdAccount ? 'SIM 🆕' : 'NÃO ✅';
    showNotification(`Modo conta nova: ${isNewAdAccount ? 'ATIVADO' : 'DESATIVADO'}`);
    updateAdStatus();
    if (!isNewAdAccount) {
        setTimeout(() => {
            initializeAdMob();
        }, 1000);
    }
}
function updateAdStatus() {
    const adStatus = document.querySelector('#shopSection_givetscoins .shop-item:nth-child(1) #adStatus');
    const adCard = document.querySelector('#shopSection_givetscoins .shop-item:nth-child(1)');
    if (!adStatus || !adCard) return;
    if (isNewAdAccount) {
        adStatus.innerHTML = "🆕 Em Verificação";
        adStatus.style.color = '#FF9800';
        adCard.style.opacity = '1';
        adCard.style.cursor = 'pointer';
        adCard.onclick = watchAdForCoins;
        return;
    }
    if (!navigator.onLine) {
        adStatus.innerHTML = "❌ Offline";
        adStatus.style.color = '#f44336';
        adCard.style.opacity = '0.8';
        adCard.style.cursor = 'pointer';
        adCard.onclick = simulateAdForNewAccount;
    } else if (isAdLoading) {
        adStatus.innerHTML = "⏳ Carregando...";
        adStatus.style.color = '#FFA500';
        adCard.style.opacity = '0.8';
        adCard.style.cursor = 'wait';
    } else if (admobInitialized && rewardAd && rewardAd.isLoaded && rewardAd.isLoaded()) {
        adStatus.innerHTML = "✅ Pronto";
        adStatus.style.color = '#4CAF50';
        adCard.style.opacity = '1';
        adCard.style.cursor = 'pointer';
        adCard.onclick = watchAdForCoins;
    } else {
        adStatus.innerHTML = "🔄 Fallback";
        adStatus.style.color = '#2196F3';
        adCard.style.opacity = '1';
        adCard.style.cursor = 'pointer';
        adCard.onclick = watchAdForCoins;
    }
}
function resetAdStats() {
    if (confirm('Resetar todas as estatísticas de anúncios?')) {
        localStorage.removeItem('adsWatched');
        showNotification("Estatísticas de anúncios resetadas");
    }
}
function addAdDebugButtons() {
    const debugPanel = document.createElement('div');
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        padding: 10px;
        border-radius: 5px;
        z-index: 1000;
        font-size: 12px;
    `;
    debugPanel.innerHTML = `
        <div style="color: white; margin-bottom: 5px;">Debug Anúncios:</div>
        <button onclick="showAdStats()" style="margin: 2px; padding: 5px;">Stats</button>
        <button onclick="loadRewardAd()" style="margin: 2px; padding: 5px;">Recarregar</button>
        <button onclick="resetAdStats()" style="margin: 2px; padding: 5px;">Reset</button>
    `;
    document.body.appendChild(debugPanel);
}
function showAdStats() {
    const adsWatched = parseInt(localStorage.getItem('adsWatched') || '0');
    const totalCoinsFromAds = adsWatched * 1000;
    showNotification(
        `📊 Estatísticas de Anúncios:\n` +
        `Anúncios assistidos: ${adsWatched}\n` +
        `TSCs ganhos: ${totalCoinsFromAds.toLocaleString()}\n` +
        `Status: ${admobInitialized ? 'Inicializado' : 'Não inicializado'}\n` +
        `Anúncio carregado: ${rewardAd && rewardAd.isLoaded() ? 'Sim' : 'Não'}`
    , 5000);
}
function initAdSystem() {
    console.log('🎮 Inicializando sistema de anúncios...');
    updateAdStatus();
    window.addEventListener('online', () => {
        console.log('🌐 Conexão restaurada');
        showNotification("🌐 Conexão restaurada - Tentando carregar anúncios");
        updateAdStatus();
        if (!admobInitialized) {
            setTimeout(() => {
                initializeAdMob().catch(err => {
                    console.warn('Falha na reinicialização do AdMob:', err);
                });
            }, 2000);
        } else {
            loadRewardAd();
        }
    });
    window.addEventListener('offline', () => {
        console.log('❌ Conexão perdida');
        showNotification("❌ Sem conexão - Anúncios indisponíveis");
        updateAdStatus();
        setupAdFallback();
    });
    setTimeout(() => {
        if (navigator.onLine) {
            console.log('🔄 Tentando inicializar AdMob...');
            initializeAdMob().catch(err => {
                console.warn('Falha na inicialização do AdMob:', err);
                setupAdFallback();
            });
        } else {
            console.log('🔌 Dispositivo offline, ativando fallback');
            setupAdFallback();
        }
    }, 3000);
    setInterval(updateAdStatus, 5000);
    setInterval(() => {
        if (navigator.onLine && !admobInitialized && !isAdLoading) {
            console.log('🔄 Tentativa periódica de inicializar AdMob...');
            initializeAdMob().catch(console.warn);
        }
    }, 30000);
}
function checkAdBlock() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = '&nbsp;';
        ad.className = 'adsbox';
        ad.style.position = 'absolute';
        ad.style.left = '-9999px';
        ad.style.top = '-9999px';
        document.body.appendChild(ad);
        setTimeout(() => {
            const isBlocked = ad.offsetHeight === 0;
            document.body.removeChild(ad);
            resolve(isBlocked);
        }, 100);
    });
}
function setupAdFallback() {
    console.log('🔄 Ativando sistema de fallback para conta nova');
    admobInitialized = false;
    updateAdStatus();
    const adItem = document.querySelector('#shopSection_givetscoins .shop-item:nth-child(1)');
    if (adItem) {
        adItem.style.opacity = '1';
        adItem.style.cursor = 'pointer';
        adItem.onclick = watchAdForCoins;
    }
}
function simulateAdForNewAccount() {
    console.log('🎬 Simulando anúncio para conta nova');
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: 3px solid #fff;
        border-radius: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    modal.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">🎮 MODO DESENVOLVIMENTO</div>
        <div style="font-size: 14px; margin-bottom: 20px; padding: 0 10px;">
            Conta de anúncios em verificação<br>
            Simulando anúncio...
        </div>
        <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
            <div id="newAdProgress" style="width: 0%; height: 100%; background: #4CAF50; transition: width 0.1s ease;"></div>
        </div>
        <div style="font-size: 12px; margin-top: 10px; color: #e0e0e0;">
            <span id="newAdProgressText">0%</span>
        </div>
    `;
    document.body.appendChild(modal);
    let progress = 0;
    const progressFill = document.getElementById('newAdProgress');
    const progressText = document.getElementById('newAdProgressText');
    const interval = setInterval(() => {
        progress += 2;
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                addTSCoins(1000);
                const adsWatched = parseInt(localStorage.getItem('adsWatched') || '0') + 1;
                localStorage.setItem('adsWatched', adsWatched.toString());
            }, 500);
        }
    }, 40);
}
function simulateAdFallback() {
    console.log('🎬 Simulando anúncio (fallback)');
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 100px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #4CAF50;
        border-radius: 15px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Arial, sans-serif;
    `;
    progressBar.innerHTML = `
        <div style="margin-bottom: 15px; font-size: 16px;">🎬 Anúncio Simulado</div>
        <div style="width: 250px; height: 20px; background: #333; border-radius: 10px; overflow: hidden;">
            <div id="adProgress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); transition: width 0.1s ease; border-radius: 10px;"></div>
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #ccc;">Carregando: <span id="adProgressText">0%</span></div>
    `;
    document.body.appendChild(progressBar);
    let progress = 0;
    const progressFill = document.getElementById('adProgress');
    const progressText = document.getElementById('adProgressText');
    const interval = setInterval(() => {
        progress += 2;
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (document.body.contains(progressBar)) {
                    document.body.removeChild(progressBar);
                }
                addTSCoins(1000);
                showNotification("✅ +1.000 TS Coins concedidas! (Modo Offline)");
                const adsWatched = parseInt(localStorage.getItem('adsWatched') || '0') + 1;
                localStorage.setItem('adsWatched', adsWatched.toString());
            }, 500);
        }
    }, 50);
}
function simulateAd() {
    return true;
}
function openShop() {
    const shopOverlay = document.getElementById('shopOverlay');
    if (shopOverlay) {
        shopOverlay.style.display = 'flex';
        setTimeout(() => {
            shopOverlay.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
        updateAdStatus();
        fgpShopDisplay();
        setTimeout(() => {
            const allIcons = document.querySelectorAll('.shop-item .tsCoinsIcon');
            allIcons.forEach(icon => {
                icon.style.width = '16px';
                icon.style.height = '16px';
                icon.style.display = 'inline-block';
            });
        }, 100);
    }
}
function closeShop() {
    const shopOverlay = document.getElementById('shopOverlay');
    if (shopOverlay) {
        shopOverlay.classList.remove('active');
        setTimeout(() => {
            shopOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
        stopTimers();
    }
}
const style = document.createElement('style');
style.textContent = `
    .pulse-animation {
        animation: pulse 0.5s ease-in-out;
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    .shop-item {
        transition: all 0.3s ease;
    }
    .shop-item:hover:not([style*="cursor: not-allowed"]) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(style);
function openManual() {
    const manualOverlay = document.getElementById('manualOverlay');
    if (manualOverlay) {
        currentManualPage = 1;
        fgpManualPage();
        manualOverlay.style.display = 'flex';
        setTimeout(() => {
            manualOverlay.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}
let _fgp_pixelUiCanvas = null;
let _fgp_pixelUiCtx = null;
let _fgp_pixelUiState = { shopOpen: false, menuOpen: false };
function _fgp_ensurePixelUiCanvas() {
    if (!_fgp_pixelUiCanvas) {
        _fgp_pixelUiCanvas = document.createElement('canvas');
        _fgp_pixelUiCanvas.id = 'fgpPixelUiCanvas';
        _fgp_pixelUiCanvas.style.position = 'fixed';
        _fgp_pixelUiCanvas.style.left = '0';
        _fgp_pixelUiCanvas.style.top = '0';
        _fgp_pixelUiCanvas.style.zIndex = '100000';
        _fgp_pixelUiCanvas.style.pointerEvents = 'auto';
        document.body.appendChild(_fgp_pixelUiCanvas);
        _fgp_pixelUiCtx = _fgp_pixelUiCanvas.getContext('2d');
        window.addEventListener('resize', _fgp_resizePixelUiCanvas);
        _fgp_pixelUiCanvas.addEventListener('click', _fgp_onPixelUiClick);
    }
    _fgp_resizePixelUiCanvas();
}
function _fgp_resizePixelUiCanvas() {
    if (!_fgp_pixelUiCanvas) return;
    _fgp_pixelUiCanvas.width = window.innerWidth;
    _fgp_pixelUiCanvas.height = window.innerHeight;
}
function _fgp_clearPixelUi() {
    if (!_fgp_pixelUiCtx) return;
    _fgp_pixelUiCtx.clearRect(0, 0, _fgp_pixelUiCanvas.width, _fgp_pixelUiCanvas.height);
}
function closePixelShop() {
    _fgp_pixelUiState.shopOpen = false;
    if (_fgp_pixelUiCanvas) {
        _fgp_pixelUiCanvas.style.display = 'none';
    }
    document.body.style.overflow = '';
}
function _fgp_onPixelUiClick(ev) {
    const rect = _fgp_pixelUiCanvas.getBoundingClientRect();
    const mx = ev.clientX - rect.left;
    const my = ev.clientY - rect.top;
    if (_fgp_pixelUiState.shopOpen) {
        const items = Array.from(document.querySelectorAll('#shopOverlay .shop-item'));
        for (const item of items) {
            const r = item._fgp_pixelRect;
            if (!r) continue;
            if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
                const itemId = item.getAttribute('data-item-id');
                const price = parseInt(item.getAttribute('data-price') || '0', 10);
                return;
            }
        }
    } else if (_fgp_pixelUiState.menuOpen) {
        const controls = ['funSpaceToggle','pixelModeToggle','shadowsToggle'];
        for (const id of controls) {
            const el = document.getElementById(id);
            if (!el || !el._fgp_pixelRect) continue;
            const r = el._fgp_pixelRect;
            if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
                if (id === 'funSpaceToggle') toggleFunSpace();
                else if (id === 'pixelModeToggle') {
                    const elT = document.getElementById('pixelModeToggle'); if (elT) { elT.checked = !elT.checked; elT.dispatchEvent(new Event('change')); }
                } else if (id === 'shadowsToggle') {
                    const elS = document.getElementById('shadowsToggle'); if (elS) { elS.checked = !elS.checked; elS.dispatchEvent(new Event('change')); }
                }
                return;
            }
        }
    }
}
function isItemPurchased(itemId) {
    if (itemId === 'medusaStar') {
        return localStorage.getItem('medusaStarPurchased') === 'true';
    }
    if (itemId === 'nitricStar') {
        return localStorage.getItem('nitricStarPurchased') === 'true';
    }
    return purchasedItems[itemId] === true;
}
function purchaseItem(itemId, price) {
    if (tsCoins >= price) {
        tsCoins -= price;
        localStorage.setItem('tsCoins', tsCoins.toString());
        purchasedItems[itemId] = true;
        localStorage.setItem('siu2d_purchased_items', JSON.stringify(purchasedItems));
        fgpTSCoinsDisplay();
        showNotification(`Purchased ${getItemName(itemId)} for ${price} TS Coins! Reloading...`);
        applyPurchasedItem(itemId);
        setTimeout(() => {
            location.reload();
        }, 1500);
        return true;
    } else {
        showNotification("Not enough TS Coins!");
        return false;
    }
}
function getItemName(itemId) {
    const itemNames = {
        'solar_system': 'Solar System',
        'complete_solar_system': 'Alternative Solar System',
        'past_solar_system': 'Past Solar System',
        'create_random_save': 'Random galaxy',
        'habitable_alpha': 'HABITABLE - ALPHA',
        'trappist_1': 'TRAPPIST-1',
        'bizarre_stars': 'Bizarre Stars',
        'fun_space': 'The Fun Space',
        'codesStar': 'Code Stars Pack',
        'medusaStar': 'Medusa Star',
        'nitricStar': 'Nitric Acid Star'
    };
    return itemNames[itemId] || itemId;
}
function applyPurchasedItem(itemId) {
    switch(itemId) {
        case 'solar_system':
            createSolarSystemSave();
            break;
        case 'past_solar_system':
            createPastSolarSystem();
            break;
        case 'complete_solar_system':
            createCompleteSolarSystemSave();
            break;
        case 'create_random_save':
            createRandomSpaceSave();
            break;
        case 'habitable_alpha':
            createHabitableAlphaSave();
            break;
        case 'trappist_1':
            createTrappist1Save();
            break;
        case 'bizarre_stars':
            unlockBizarreStars();
            break;
        case 'fun_space':
            unlockFunSpace();
            break;
        case 'singularity':
            unlockSingularity();
            break;
                case 'medusaStar':
            unlockMedusaStar();
            break;
        case 'nitricStar':
            if (!unlockedAstroTypes.includes('nitricStar')) {
                unlockedAstroTypes.push('nitricStar');
                localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
            }
            fgpCreationGrid();
            break;
        case 'codesStar':
            if (!localStorage.getItem('siu2d_star_codes_unlocked')) {
                if (typeof unlockCodeStarPack === 'function') {
                    unlockCodeStarPack();
                } else if (window && typeof window.unlockStarCodes === 'function') {
                    window.unlockStarCodes();
                }
            }
            fgpCreationGrid();
            break;
    }
}
function fgpShopDisplay() {
    document.querySelectorAll('.shop-item').forEach(item => {
        const itemId = item.getAttribute('data-item-id');
        if (itemId && purchasedItems[itemId]) {
            item.classList.add('purchased');
            item.style.pointerEvents = 'none';
            item.style.opacity = '0.7';
        }
    });
}
function initializeShop() {
    fgpShopDisplay();
    fgpShopDisplay();
    initializeMedusaStar();
    initializeNitricStar();
    initializeCodesStar();
    document.querySelectorAll('.shop-item').forEach(item => {
        const itemId = item.getAttribute('data-item-id');
        const price = parseInt(item.getAttribute('data-price'));
        if (itemId && price) {
            item.addEventListener('click', function() {
                if (itemId === 'medusaStar') {
                    if (!isItemPurchased(itemId)) {
                        purchaseMedusaStar();
                    }
                } else if (itemId === 'nitricStar') {
                    if (!isItemPurchased(itemId)) {
                        purchaseNitricStar();
                    } else {
                        showNotification("success");
                    }
                } else {
                    if (!isItemPurchased(itemId)) {
                        purchaseItem(itemId, price);
                    } else {
                        applyPurchasedItem(itemId);
                        showNotification(`${getItemName(itemId)} success!`);
                    }
                }
            });
        }
    });
    if (purchasedItems.fun_space) {
        const funSpaceToggle = document.getElementById('funSpaceToggle');
        if (funSpaceToggle) {
            funSpaceToggle.disabled = false;
            funSpaceToggle.parentElement.style.opacity = "1";
        }
    } else {
        const funSpaceToggle = document.getElementById('funSpaceToggle');
        if (funSpaceToggle) {
            funSpaceToggle.disabled = true;
            funSpaceToggle.parentElement.style.opacity = "0.5";
        }
    }
    if (purchasedItems.pixel_mode) {
        const pixelToggle = document.getElementById('pixelModeToggle');
        const pixelGroup = document.getElementById('pixelModeGroup');
        if (pixelToggle) {
            pixelToggle.disabled = false;
            if (pixelGroup) pixelGroup.style.opacity = '1';
            const enabled = localStorage.getItem('siu2d_pixel_mode_enabled') === 'true';
            pixelToggle.checked = enabled;
            if (!pixelToggle.dataset.wired) {
                pixelToggle.addEventListener('change', function() {
                    const want = this.checked;
                    const confirmMsg = want ? 'Enable Pixel By Pixel mode? The game will restart to apply the visual change.' : 'Disable Pixel By Pixel mode? The game will restart to restore the normal visuals.';
                    if (!confirm(confirmMsg)) {
                        this.checked = !want;
                        return;
                    }
                    localStorage.setItem('siu2d_pixel_mode_enabled', want ? 'true' : 'false');
                    setTimeout(() => location.reload(), 300);
                });
                pixelToggle.dataset.wired = '1';
            }
        }
    } else {
        const pixelToggle = document.getElementById('pixelModeToggle');
        const pixelGroup = document.getElementById('pixelModeGroup');
        if (pixelToggle) {
            pixelToggle.disabled = true;
            if (pixelGroup) pixelGroup.style.opacity = '0.5';
        }
    }
    if (purchasedItems.solar_system) {
        const solarSystemItem = document.querySelector('[data-item-id="solar_system"]');
        if (solarSystemItem) {
            solarSystemItem.classList.add('purchased');
        }
    }
    if (purchasedItems.complete_solar_system) {
        const altSolarSystemItem = document.querySelector('[data-item-id="complete_solar_system"]');
        if (altSolarSystemItem) {
            altSolarSystemItem.classList.add('purchased');
        }
    }
    if (purchasedItems.past_solar_system) {
        const altSolarSystemItem = document.querySelector('[data-item-id="past_solar_system"]');
        if (altSolarSystemItem) {
            altSolarSystemItem.classList.add('purchased');
        }
    }
    if (purchasedItems.create_random_save) {
        const altSolarSystemItem = document.querySelector('[data-item-id="create_random_save"]');
        if (altSolarSystemItem) {
            altSolarSystemItem.classList.add('purchased');
        }
    }
    if (purchasedItems.habitable_alpha) {
        const habitableAlphaItem = document.querySelector('[data-item-id="habitable_alpha"]');
        if (habitableAlphaItem) {
            habitableAlphaItem.classList.add('purchased');
        }
    }
    if (purchasedItems.trappist_1) {
        const trappistItem = document.querySelector('[data-item-id="trappist_1"]');
        if (trappistItem) {
            trappistItem.classList.add('purchased');
        }
    }
    if (purchasedItems.bizarre_stars) {
        const bizarreStarsItem = document.querySelector('[data-item-id="bizarre_stars"]');
        if (bizarreStarsItem) {
            bizarreStarsItem.classList.add('purchased');
        }
    }
    document.querySelectorAll('.shop-item').forEach(item => {
        const itemId = item.getAttribute('data-item-id');
        const price = parseInt(item.getAttribute('data-price'));
        if (itemId && price !== null) {
            item.addEventListener('click', function() {
                if (itemId === 'medusaStar') {
                    if (!isItemPurchased(itemId)) {
                        purchaseMedusaStar();
                        item.classList.add('purchased');
                        item.style.pointerEvents = 'none';
                        item.style.opacity = '0.7';
                    }
                } else {
                    if (!isItemPurchased(itemId)) {
                        purchaseItem(itemId, price);
                    } else {
                        applyPurchasedItem(itemId);
                    }
                }
            });
        }
    });
    document.querySelectorAll('.shop-item').forEach(item => {
        const itemId = item.getAttribute('data-item-id');
        if (itemId && purchasedItems[itemId]) {
            item.classList.add('purchased');
            if (!item.querySelector('.purchased-badge')) {
                const badge = document.createElement('div');
                badge.className = 'purchased-badge';
                badge.textContent = 'PURCHASED';
                badge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: #4CAF50;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.7em;
                    font-weight: bold;
                `;
                item.appendChild(badge);
            }
        }
    });
    try { setTimeout(populatePackageSessions, 200); } catch(e) {}
}
function populatePackageSessions() {
    try {
        const extrasGrid = document.getElementById('astroExtrasGrid');
        if (!extrasGrid) return;
        const packages = [
            { key: 'bizarre_stars', title: 'Bizarre Stars', className: 'pkg-bizarre', shopSelectors: ['[data-item-id="bizarre_stars"]'], itemKeys: ['bizarre_stars'] },
            { key: 'petrification_war', title: 'Petrification War', className: 'pkg-petrification', shopSelectors: ['[data-item-id="medusaStar"]','[data-item-id="nitricStar"]'], itemKeys: ['medusaStar','nitricStar'] },
            { key: 'codesStar', title: 'Code Stars', className: 'pkg-codes', shopSelectors: ['[data-item-id="codesStar"]'], itemKeys: ['codesStar'] }
        ];
        packages.forEach(pkg => {
            if (extrasGrid.querySelector(`[data-package-session="${pkg.key}"]`)) return;
            let isPurchased = false;
            if (pkg.itemKeys && pkg.itemKeys.length) {
                isPurchased = pkg.itemKeys.some(k => (typeof isItemPurchased === 'function') ? isItemPurchased(k) : !!purchasedItems[k]);
            } else {
                isPurchased = (typeof isItemPurchased === 'function') ? isItemPurchased(pkg.key) : !!purchasedItems[pkg.key];
            }
            if (!isPurchased) return;
            if (pkg.key === 'petrification_war') {
                ['medusaStar','nitricStar'].forEach(oldKey => {
                    const old = extrasGrid.querySelector(`[data-package-session="${oldKey}"]`);
                    if (old) old.remove();
                });
            }
            const pkgSession = document.createElement('div');
            pkgSession.className = 'astro-session pkg-session';
            pkgSession.setAttribute('data-package-session', pkg.key);
            const title = document.createElement('div');
            title.className = 'astro-session-title';
            title.textContent = pkg.title;
            pkgSession.appendChild(title);
            const grid = document.createElement('div');
            grid.className = 'astro-session-grid';
            grid.setAttribute('data-package-grid', pkg.key);
            const packageTypes = {
                'bizarre_stars': ['chronosStar','phantomStar','vortexStar','crystalStar','neuralStar','hologramStar','quantumFoamStar','prismStar','echoStar','singularityStar'],
                'petrification_war': ['medusaStar','nitricStar'],
                'codesStar': ['asciiStar','jsStar','pyStar','cssStar','csharpStar','gmlStar','javaStar','phpStar','rustStar','goStar','kotlinStar','swiftStar','tsStar','luaStar','rubyStar','dartStar','htmlStar','jsonStar','assemblyStar','sqlStar']
            };
            const types = packageTypes[pkg.key] || [];
            types.forEach(type => {
                try {
                    const astroCard = createAstroCard(type);
                    astroCard.setAttribute('data-package', pkg.key);
                    astroCard.classList.add('pkg-astro-card');
                    grid.appendChild(astroCard);
                } catch (e) {
                    console.warn('Failed to create astro card for', type, e);
                }
            });
            pkgSession.appendChild(grid);
            extrasGrid.appendChild(pkgSession);
        });
    } catch (e) {
        console.error('populatePackageSessions error', e);
    }
}
document.addEventListener('DOMContentLoaded', () => setTimeout(populatePackageSessions, 300));
if (typeof purchaseItem === 'function') {
    const _origPurchaseItem = purchaseItem;
    purchaseItem = function(itemId, price) {
        const res = _origPurchaseItem.apply(this, arguments);
        setTimeout(populatePackageSessions, 300);
        return res;
    };
}
if (typeof purchaseMedusaStar === 'function') {
    const _orig = purchaseMedusaStar;
    purchaseMedusaStar = function() {
        const res = _orig.apply(this, arguments);
        setTimeout(populatePackageSessions, 300);
        return res;
    };
}
if (typeof purchaseNitricStar === 'function') {
    const _orig2 = purchaseNitricStar;
    purchaseNitricStar = function() {
        const res = _orig2.apply(this, arguments);
        setTimeout(populatePackageSessions, 300);
        return res;
    };
}
function switchShopTab(tab) {
    try {
        const tabButtons = document.querySelectorAll('.shop-tab-btn');
        tabButtons.forEach(btn => {
            const t = btn.getAttribute('data-tab');
            if (t === tab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        const sectionMap = {
            'saves': 'shopSection_saves',
            'astros': 'shopSection_astros',
            'mods': 'shopSection_mods',
            'givetscoins': 'shopSection_givetscoins'
        };
        Object.keys(sectionMap).forEach(key => {
            const el = document.getElementById(sectionMap[key]);
            if (el) el.style.display = (key === tab) ? '' : 'none';
        });
        sessionStorage.setItem('siu2d_shop_tab', tab);
    } catch (e) {
        console.warn('switchShopTab error', e);
    }
}
function createSpecialSave(saveName, saveData) {
    const saves = JSON.parse(localStorage.getItem('siu2d_saves') || '[]');
    const existingIndex = saves.findIndex(save => save.name === saveName && save.isSpecial);
    const specialSave = {
        name: saveName,
        date: Date.now(),
        data: saveData,
        isSpecial: true,
        cannotDelete: true,
        description: getSaveDescription(saveName),
        thumbnail: getSaveThumbnail(saveName)
    };
    if (existingIndex !== -1) {
        saves[existingIndex] = specialSave;
    } else {
        saves.push(specialSave);
    }
    localStorage.setItem('siu2d_saves', JSON.stringify(saves));
}
function getSaveDescription(saveName) {
    const descriptions = {
    "Solar System": "Our solar system with all 8 major planets",
    "Habitable System ALPHA": "Star system with a perfectly habitable planet",
    "TRAPPIST-1": "System with 7 rocky planets, 3 in the habitable zone"
    };
    return descriptions[saveName] || "Special Save";
}
function getSaveThumbnail(saveName) {
    return null;
}
function createSolarSystemSave() {
    const G = 6.67430e-2;
    const solarMass = 500000;
    function calculateOrbitalVelocity(centralMass, distance) {
        return Math.sqrt(G * centralMass / distance);
    }
    function calculateMoonVelocity(planetMass, moonDistance) {
        return Math.sqrt(G * planetMass / moonDistance);
    }
    function generateRealisticContinents(numContinents) {
        const continents = [];
        for (let i = 0; i < numContinents; i++) {
            const continent = [];
            const points = 8 + Math.floor(Math.random() * 8);
            const centerX = (Math.random() - 0.5) * 0.6;
            const centerY = (Math.random() - 0.5) * 0.6;
            for (let j = 0; j < points; j++) {
                const angle = (j / points) * Math.PI * 2;
                const distance = 0.1 + Math.random() * 0.2;
                const x = centerX + Math.cos(angle) * distance * (0.8 + Math.random() * 0.4);
                const y = centerY + Math.sin(angle) * distance * (0.8 + Math.random() * 0.4);
                continent.push({x, y});
            }
            continent.push(continent[0]);
            continents.push(continent);
        }
        return continents;
    }
    function generateAsteroidBelt(numAsteroids, minDistance, maxDistance) {
        const asteroids = [];
        for (let i = 0; i < numAsteroids; i++) {
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            asteroids.push({
                type: 'asteroid',
                x: x,
                y: y,
                vx: 0,
                vy: calculateOrbitalVelocity(solarMass, distance),
                mass: 0.1 + Math.random() * 0.4,
                radius: 0.5 + Math.random() * 1.5,
                name: `Ast-${i+1}`,
                color: '#888888',
                locked: false
            });
        }
        return asteroids;
    }
    function generateKuiperBelt(numObjects, minDistance, maxDistance) {
        const kuiperObjects = [];
        for (let i = 0; i < numObjects; i++) {
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            kuiperObjects.push({
                type: Math.random() > 0.7 ? 'planetoid' : 'asteroid',
                x: x,
                y: y,
                vx: 0,
                vy: calculateOrbitalVelocity(solarMass, distance),
                mass: 0.3 + Math.random() * 2,
                radius: 1 + Math.random() * 3,
                name: `KBO-${i+1}`,
                color: '#666666',
                locked: false
            });
        }
        return kuiperObjects;
    }
    const solarSystemData = {
        planets: [
            { 
                type: 'star', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass: solarMass,
                radius: 30,
                name: "Sol",
                color: "#FFD700",
                temperature: 10000,
                locked: true,
                ignoreColorChanges: true
            },
            { 
                type: 'rockyPlanet', 
                x: 0, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 1800), 
                mass: 3.3,
                radius: 3,
                name: "..",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'rockyPlanet', 
                x: 1800, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 1800), 
                mass: 3.3,
                radius: 3,
                name: "Mercúrio",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'rockyPlanet', 
                x: 3500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 3500), 
                mass: 48.7,
                radius: 6,
                name: "Vênus",
                color: "#E6E6FA",
                temperature: 462,
                gasValue: 100,
                waterValue: 0,
                cloudsValue: 100,
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'rockyPlanet', 
                x: 6000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 6000), 
                mass: 50,
                radius: 6.5,
                name: "Terra",
                color: "#1E90FF",
                landColor: "#228B22",
                waterValue: 70,
                cloudsValue: 40,
                gasValue: 75,
                temperature: 15,
                lifeChance: 100,
                biomass: 5000,
                population: 8000000000,
                intelligentSpecies: ["Homo Sapiens"],
                knowledgePoints: 1500,
                locked: false,
                continents: generateRealisticContinents(6),
                ignoreColorChanges: true
            },
            { 
                type: 'planetoid', 
                x: 6100, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 6000) + calculateMoonVelocity(50, 100), 
                mass: 0.6,
                radius: 1.8,
                name: "Lua",
                color: "#C0C0C0",
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'rockyPlanet', 
                x: 9000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 9000), 
                mass: 5.3,
                radius: 4,
                name: "Marte",
                color: "#FF4500",
                temperature: -63,
                waterValue: 15,
                cloudsValue: 5,
                gasValue: 20,
                locked: false,
                continents: generateRealisticContinents(3),
                ignoreColorChanges: true
            },
            { 
                type: 'asteroid', 
                x: 9100, y: 50, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 9000) + calculateMoonVelocity(5.3, 100), 
                mass: 0.2,
                radius: 1,
                name: "Fobos",
                locked: false
            },
            { 
                type: 'asteroid', 
                x: 9200, y: -30, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 9000) + calculateMoonVelocity(5.3, 200), 
                mass: 0.1,
                radius: 0.8,
                name: "Deimos",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12000), 
                mass: 1,
                radius: 2,
                name: "Ceres",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12500, y: 1500, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12500), 
                mass: 0.8,
                radius: 1.8,
                name: "Vesta",
                color: "#888888",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12800, y: -1200, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12800), 
                mass: 0.7,
                radius: 1.6,
                name: "Palas",
                color: "#777777",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12200, y: 1800, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12200), 
                mass: 0.6,
                radius: 1.4,
                name: "Hígia",
                color: "#666666",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 15000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000), 
                mass: 15890,
                radius: 18,
                name: "Júpiter",
                color: "#DAA520",
                temperature: -108,
                gasValue: 95,
                rings: true,
                ringMass: 2,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15200, y: 100, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 200), 
                mass: 0.8,
                radius: 2.5,
                name: "Io",
                color: "#FFA500",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15400, y: -80, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 400), 
                mass: 0.9,
                radius: 2.7,
                name: "Europa",
                color: "#FFD700",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15600, y: 120, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 600), 
                mass: 1.2,
                radius: 3.0,
                name: "Ganimedes",
                color: "#DAA520",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15800, y: -140, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 800), 
                mass: 1.1,
                radius: 2.9,
                name: "Calisto",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 22000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000), 
                mass: 4760,
                radius: 15,
                name: "Saturno",
                color: "#F0E68C",
                temperature: -139,
                gasValue: 90,
                rings: true,
                ringMass: 40,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22200, y: 50, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 200), 
                mass: 0.6,
                radius: 2.2,
                name: "Mimas",
                color: "#C0C0C0",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22400, y: -70, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 400), 
                mass: 0.7,
                radius: 2.5,
                name: "Encélado",
                color: "#F5F5F5",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22600, y: 100, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 600), 
                mass: 1.0,
                radius: 3.0,
                name: "Titã",
                color: "#FFA500",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22800, y: -120, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 800), 
                mass: 0.9,
                radius: 2.8,
                name: "Reia",
                color: "#D3D3D3",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 32000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000), 
                mass: 725,
                radius: 12,
                name: "Urano",
                color: "#AFEEEE",
                temperature: -197,
                gasValue: 85,
                rings: true,
                ringMass: 10,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32200, y: 30, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 200), 
                mass: 0.5,
                radius: 2.0,
                name: "Miranda",
                color: "#D3D3D3",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32400, y: -60, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 400), 
                mass: 0.6,
                radius: 2.3,
                name: "Ariel",
                color: "#F0F8FF",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32600, y: 90, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 600), 
                mass: 0.7,
                radius: 2.5,
                name: "Umbriel",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32800, y: -120, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 800), 
                mass: 0.8,
                radius: 2.7,
                name: "Titânia",
                color: "#F5F5F5",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 33000, y: 150, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 1000), 
                mass: 0.8,
                radius: 2.7,
                name: "Oberon",
                color: "#D3D3D3",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 38000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 38000), 
                mass: 855,
                radius: 11,
                name: "Netuno",
                color: "#1E90FF",
                temperature: -201,
                gasValue: 85,
                rings: true,
                ringMass: 5,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 38200, y: 40, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 38000) + calculateMoonVelocity(855, 200), 
                mass: 0.7,
                radius: 2.5,
                name: "Tritão",
                color: "#ADD8E6",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 38400, y: -80, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 38000) + calculateMoonVelocity(855, 400), 
                mass: 0.3,
                radius: 1.5,
                name: "Nereida",
                color: "#87CEEB",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 45000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 45000), 
                mass: 1.1,
                radius: 1.5,
                name: "Plutão",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 45050, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 45000) + calculateMoonVelocity(1.1, 50), 
                mass: 0.3,
                radius: 1.0,
                name: "Caronte",
                color: "#C0C0C0",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 48000, y: 2000, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 48000), 
                mass: 1.4,
                radius: 1.8,
                name: "Haumea",
                color: "#98FB98",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 52000, y: -1500, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 52000), 
                mass: 1.2,
                radius: 1.6,
                name: "Makemake",
                color: "#DEB887",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 60000, y: 3000, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 60000), 
                mass: 2.2,
                radius: 2.0,
                name: "Éris",
                color: "#F0E68C",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 80000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 80000), 
                mass: 0.8,
                radius: 1.2,
                name: "Sedna",
                color: "#CD5C5C",
                locked: false
            }
        ],
        universeAge: 4.6e9,
        universeTime: 0,
        camera: { x: 0, y: 0, zoom: 0.3 }
    };
    const asteroidBelt = generateAsteroidBelt(50, 10000, 14000);
    solarSystemData.planets.push(...asteroidBelt);
    const kuiperBelt = generateKuiperBelt(30, 40000, 70000);
    solarSystemData.planets.push(...kuiperBelt);
    createSpecialSave("Sistema Solar Completo", solarSystemData);
}
function createCompleteSolarSystemSave() {
    const G = 6.67430e-2;
    const solarMass = 500000;
    const nemisisMass = 10000;
    function calculateOrbitalVelocity(centralMass, distance) {
        return Math.sqrt(G * centralMass / distance);
    }
    function calculateMoonVelocity(planetMass, moonDistance) {
        return Math.sqrt(G * planetMass / moonDistance);
    }
    function generateRealisticContinents(numContinents) {
        const continents = [];
        for (let i = 0; i < numContinents; i++) {
            const continent = [];
            const points = 8 + Math.floor(Math.random() * 8);
            const centerX = (Math.random() - 0.5) * 0.6;
            const centerY = (Math.random() - 0.5) * 0.6;
            for (let j = 0; j < points; j++) {
                const angle = (j / points) * Math.PI * 2;
                const distance = 0.1 + Math.random() * 0.2;
                const x = centerX + Math.cos(angle) * distance * (0.8 + Math.random() * 0.4);
                const y = centerY + Math.sin(angle) * distance * (0.8 + Math.random() * 0.4);
                continent.push({x, y});
            }
            continent.push(continent[0]);
            continents.push(continent);
        }
        return continents;
    }
    function generateAsteroidBelt(numAsteroids, minDistance, maxDistance) {
        const asteroids = [];
        for (let i = 0; i < numAsteroids; i++) {
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            asteroids.push({
                type: 'asteroid',
                x: x,
                y: y,
                vx: 0,
                vy: calculateOrbitalVelocity(solarMass, distance),
                mass: 0.1 + Math.random() * 0.4,
                radius: 0.5 + Math.random() * 1.5,
                name: `Ast-${i+1}`,
                color: '#888888',
                locked: false
            });
        }
        return asteroids;
    }
    function generateKuiperBelt(numObjects, minDistance, maxDistance) {
        const kuiperObjects = [];
        for (let i = 0; i < numObjects; i++) {
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            kuiperObjects.push({
                type: Math.random() > 0.7 ? 'planetoid' : 'asteroid',
                x: x,
                y: y,
                vx: 0,
                vy: calculateOrbitalVelocity(solarMass, distance),
                mass: 0.3 + Math.random() * 2,
                radius: 1 + Math.random() * 3,
                name: `KBO-${i+1}`,
                color: '#666666',
                locked: false
            });
        }
        return kuiperObjects;
    }
    const completeSolarSystemData = {
        planets: [
            { 
                type: 'star', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass: solarMass,
                radius: 30,
                name: "Sol",
                color: "#FFD700",
                temperature: 10000,
                locked: true
            },
            { 
                type: 'rockyPlanet', 
                x: 0, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 1800), 
                mass: 3.3,
                radius: 3,
                name: "..",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'redDwarf', 
                x: 500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 500), 
                mass: nemisisMass,
                radius: 15,
                name: "Nêmisis",
                color: "#f00050",
                temperature: 3500,
                locked: true
            },
            { 
                type: 'rockyPlanet', 
                x: 1800, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 1800), 
                mass: 3.3,
                radius: 3,
                name: "Mercúrio",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false
            },
            { 
                type: 'rockyPlanet', 
                x: 3500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 3500), 
                mass: 48.7,
                radius: 6,
                name: "Vênus",
                color: "#E6E6FA",
                temperature: 462,
                gasValue: 100,
                waterValue: 0,
                cloudsValue: 100,
                locked: false,
            },
            { 
                type: 'rockyPlanet', 
                x: 6000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 6000), 
                mass: 50,
                radius: 6.5,
                name: "Terra",
                color: "#1E90FF",
                landColor: "#228B22",
                waterValue: 70,
                cloudsValue: 40,
                gasValue: 75,
                temperature: 15,
                lifeChance: 100,
                biomass: 5000,
                population: 8000000000,
                intelligentSpecies: ["Homo Sapiens"],
                knowledgePoints: 1500,
                locked: false,
                continents: generateRealisticContinents(6)
            },
            { 
                type: 'planetoid', 
                x: 6100, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 6000) + calculateMoonVelocity(50, 100), 
                mass: 0.6,
                radius: 1.8,
                name: "Lua",
                color: "#C0C0C0",
                locked: false
            },
            { 
                type: 'rockyPlanet', 
                x: 6500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 6500), 
                mass: 15,
                radius: 5,
                name: "Theia",
                color: "#a0f880",
                temperature: -23,
                waterValue: 60,
                cloudsValue: 30,
                gasValue: 60,
                locked: false,
                rings: true,
                ringMass: 20,
                continents: generateRealisticContinents(4)
            },
            { 
                type: 'rockyPlanet', 
                x: 6800, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 6800), 
                mass: 12,
                radius: 4.5,
                name: "Planet V",
                color: "#a0f880",
                temperature: -33,
                waterValue: 50,
                cloudsValue: 25,
                gasValue: 55,
                locked: false,
                rings: true,
                ringMass: 15,
                continents: generateRealisticContinents(3)
            },
            { 
                type: 'rockyPlanet', 
                x: 7200, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 7200), 
                mass: 8,
                radius: 4,
                name: "Faetonte",
                color: "#a0a880",
                temperature: -43,
                waterValue: 30,
                cloudsValue: 15,
                gasValue: 40,
                locked: false,
                continents: generateRealisticContinents(3)
            },
            { 
                type: 'rockyPlanet', 
                x: 9000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 9000), 
                mass: 5.3,
                radius: 3.5,
                name: "Marte",
                color: "#FF4500",
                temperature: -63,
                waterValue: 15,
                cloudsValue: 5,
                gasValue: 20,
                locked: false,
                continents: generateRealisticContinents(3)
            },
            { 
                type: 'asteroid', 
                x: 9100, y: 50, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 9000) + calculateMoonVelocity(5.3, 100), 
                mass: 0.2,
                radius: 1,
                name: "Fobos",
                locked: false
            },
            { 
                type: 'asteroid', 
                x: 9200, y: -30, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 9000) + calculateMoonVelocity(5.3, 200), 
                mass: 0.1,
                radius: 0.8,
                name: "Deimos",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12000), 
                mass: 1,
                radius: 2,
                name: "Ceres",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12500, y: 1500, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12500), 
                mass: 0.8,
                radius: 1.8,
                name: "Vesta",
                color: "#888888",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12800, y: -1200, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12800), 
                mass: 0.7,
                radius: 1.6,
                name: "Palas",
                color: "#777777",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 12200, y: 1800, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 12200), 
                mass: 0.6,
                radius: 1.4,
                name: "Hígia",
                color: "#666666",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 15000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000), 
                mass: 15890,
                radius: 18,
                name: "Júpiter",
                color: "#DAA520",
                temperature: -108,
                gasValue: 95,
                rings: true,
                ringMass: 2,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15200, y: 100, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 200), 
                mass: 0.8,
                radius: 2.5,
                name: "Io",
                color: "#FFA500",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15400, y: -80, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 400), 
                mass: 0.9,
                radius: 2.7,
                name: "Europa",
                color: "#FFD700",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15600, y: 120, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 600), 
                mass: 1.2,
                radius: 3.0,
                name: "Ganimedes",
                color: "#DAA520",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 15800, y: -140, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 15000) + calculateMoonVelocity(15890, 800), 
                mass: 1.1,
                radius: 2.9,
                name: "Calisto",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 22000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000), 
                mass: 4760,
                radius: 15,
                name: "Saturno",
                color: "#F0E68C",
                temperature: -139,
                gasValue: 90,
                rings: true,
                ringMass: 40,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22200, y: 50, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 200), 
                mass: 0.6,
                radius: 2.2,
                name: "Mimas",
                color: "#C0C0C0",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22400, y: -70, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 400), 
                mass: 0.7,
                radius: 2.5,
                name: "Encélado",
                color: "#F5F5F5",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22600, y: 100, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 600), 
                mass: 1.0,
                radius: 3.0,
                name: "Titã",
                color: "#FFA500",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 22800, y: -120, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 22000) + calculateMoonVelocity(4760, 800), 
                mass: 0.9,
                radius: 2.8,
                name: "Reia",
                color: "#D3D3D3",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 32000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000), 
                mass: 725,
                radius: 12,
                name: "Urano",
                color: "#AFEEEE",
                temperature: -197,
                gasValue: 85,
                rings: true,
                ringMass: 10,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32200, y: 30, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 200), 
                mass: 0.5,
                radius: 2.0,
                name: "Miranda",
                color: "#D3D3D3",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32400, y: -60, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 400), 
                mass: 0.6,
                radius: 2.3,
                name: "Ariel",
                color: "#F0F8FF",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32600, y: 90, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 600), 
                mass: 0.7,
                radius: 2.5,
                name: "Umbriel",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 32800, y: -120, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 800), 
                mass: 0.8,
                radius: 2.7,
                name: "Titânia",
                color: "#F5F5F5",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 33000, y: 150, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 32000) + calculateMoonVelocity(725, 1000), 
                mass: 0.8,
                radius: 2.7,
                name: "Oberon",
                color: "#D3D3D3",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 38000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 38000), 
                mass: 855,
                radius: 11,
                name: "Netuno",
                color: "#1E90FF",
                temperature: -201,
                gasValue: 85,
                rings: true,
                ringMass: 5,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 38200, y: 40, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 38000) + calculateMoonVelocity(855, 200), 
                mass: 0.7,
                radius: 2.5,
                name: "Tritão",
                color: "#ADD8E6",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 38400, y: -80, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 38000) + calculateMoonVelocity(855, 400), 
                mass: 0.3,
                radius: 1.5,
                name: "Nereida",
                color: "#87CEEB",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 45000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 45000), 
                mass: 1000,
                radius: 12,
                name: "Planet X",
                color: "#1020FF",
                temperature: -230,
                gasValue: 80,
                rings: true,
                ringMass: 8,
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 50000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 50000), 
                mass: 1.1,
                radius: 1.5,
                name: "Plutão",
                color: "#A9A9A9",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 50050, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 50000) + calculateMoonVelocity(1.1, 50), 
                mass: 0.3,
                radius: 1.0,
                name: "Caronte",
                color: "#C0C0C0",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 48000, y: 2000, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 48000), 
                mass: 1.4,
                radius: 1.8,
                name: "Haumea",
                color: "#98FB98",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 52000, y: -1500, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 52000), 
                mass: 1.2,
                radius: 1.6,
                name: "Makemake",
                color: "#DEB887",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 60000, y: 3000, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 60000), 
                mass: 2.2,
                radius: 2.0,
                name: "Éris",
                color: "#F0E68C",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: 80000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(solarMass, 80000), 
                mass: 0.8,
                radius: 1.2,
                name: "Sedna",
                color: "#CD5C5C",
                locked: false
            }
        ],
        universeAge: 4.6e9,
        universeTime: 0,
        camera: { x: 0, y: 0, zoom: 0.25 }
    };
    const asteroidBelt = generateAsteroidBelt(50, 10000, 14000);
    completeSolarSystemData.planets.push(...asteroidBelt);
    const kuiperBelt = generateKuiperBelt(30, 40000, 70000);
    completeSolarSystemData.planets.push(...kuiperBelt);
    createSpecialSave("Sistema Solar Alternativo Completo", completeSolarSystemData);
}
function createHabitableAlphaSave() {
    const habitableSystem = {
        planets: [
            { 
                type: 'star', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass: 500000,
                radius: calculateRadiusForType(),
                name: "Alpha Centauri A",
                color: "#FFD700",
                temperature: 10000,
                locked: true
            },
            { 
                type: 'rockyPlanet', 
                x: 0, y: 0, 
                vx: 0, vy: 0,
                mass: 3.3,
                radius: 3,
                name: "..",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'meteoroid', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass:50,
                radius: calculateRadiusForType(),
                name: "Alpha Centauri A",
                color: "#FFD700",
                temperature: 10000,
                locked: true
            },
            {
                type: 'rockyPlanet',
                x: 6000, y: 0,
                vx: 0, vy: 5.8,
                mass: 300,
                radius: calculateRadiusForType(),
                name: "Habitable Planet",
                color: "#1E90FF",
                landColor: "#32CD32",
                waterValue: 60,
                gasValue: 60,
                cloudsValue: 60,
                temperature: 18,
                lifeChance: 92,
                biomassValue: 12000,
                populationValue: 25000000,
                intelligentSpecies: ["-.-"],
                knowledgePoints: 800,
                locked: true,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'planetoid',
                x: 6005, y: 20,
                vx: 1.5, vy: 5.7,
                mass: 0.8,
                radius: 2,
                name: "B-0001",
                color: "#D3D3D3",
                locked: true,
            },
            {
                type: 'rockyPlanet',
                x: 1100, y: 0,
                vx: 0, vy: 7.2,
                mass: 45,
                radius: 6,
                name: "Ignis",
                color: "#FF6347",
                temperature: 450,
                cloudsValue: 95,
                locked: true,
            },
            {
                type: 'rockyPlanet',
                x: 7000, y: 0,
                vx: 0, vy: 4.5,
                mass: 28,
                radius: 5,
                name: "Aridus",
                color: "#CD5C5C",
                temperature: -40,
                waterValue: 5,
                locked: true,
            },
            {
                type: 'gasGiant',
                x: 9500, y: 0,
                vx: 0, vy: 3.2,
                mass: 8500,
                radius: 14,
                name: "Jovian",
                color: "#DEB887",
                temperature: -120,
                gasValue: 88,
                rings: true,
                ringMass: 35,
                locked: true,
            }
        ],
        universeAge: 5.2e9,
        universeTime: 0,
        camera: { x: 0, y: 0, zoom: 0.7 }
    };
    createSpecialSave("Sistema Habitável ALPHA", habitableSystem);
}
function resetEverythingDev() {
    const keysToRemove = [
        'siu2d_achievements',
        'siu2d_purchased_items',
        'siu2d_unlocked_astros',
        'siu2d_unlocked_configs',
        'siu2d_saves',
        'tsCoins',
        'siu2d_lang',
        'gameStartCount',
        'hasAgreedToWarnings',
        'crazyClicks',
        'medusaStarUnlocked',
        'medusaStarPurchased',
        'nitricStarUnlocked',
        'nitricStarPurchased',
    ];
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('siu2d_')) {
            localStorage.removeItem(key);
        }
    }
    resetMemoryVariables();
    setTimeout(() => {
        location.reload();
    }, 1000);
}
function createTrappist1Save() {
    const trappistSystem = {
        planets: [
            {
                type: 'redDwarf',
                x: 0, y: 0,
                vx: 0, vy: 0,
                mass: 20000,
                radius: 2,
                name: "TRAPPIST-1",
                color: "#FF4500",
                temperature: 300,
                lock: true
            },
            { 
                type: 'rockyPlanet', 
                x: 0, y: 0, 
                vx: 0, vy: 0,
                mass: 3.3,
                radius: 3,
                name: "..",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            },
            {
                type: 'rockyPlanet',
                x: 25, y: 0,
                vx: 0, vy: 12.5,
                mass: 12,
                radius: 4,
                name: "TRAPPIST-1b",
                color: "#8B4513",
                temperature: 400,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'rockyPlanet',
                x: 40, y: 0,
                vx: 0, vy: 10.0,
                mass: 14,
                radius: 4.5,
                name: "TRAPPIST-1c",
                color: "#A0522D",
                temperature: 340,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'rockyPlanet',
                x: 55, y: 0,
                vx: 0, vy: 8.5,
                mass: 8,
                radius: 3.5,
                name: "TRAPPIST-1d",
                color: "#1E90FF",
                landColor: "#8FBC8F",
                waterValue: 60,
                cloudsValue: 30,
                gasValue: 30,
                temperature: 15,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'rockyPlanet',
                x: 70, y: 0,
                vx: 0, vy: 7.2,
                mass: 22,
                radius: 5,
                name: "TRAPPIST-1e",
                color: "#1E90FF",
                landColor: "#2E8B57",
                waterValue: 65,
                cloudsValue: 50,
                gasValue: 50,
                temperature: 12,
                lifeChance: 78,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'rockyPlanet',
                x: 85, y: 0,
                vx: 0, vy: 6.3,
                mass: 18,
                radius: 4.8,
                name: "TRAPPIST-1f",
                color: "#1E90FF",
                landColor: "#556B2F",
                water: 70,
                clouds: 40,
                temperature: -30,
                lifeChance: 35,
                biomass: 500,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'rockyPlanet',
                x: 100, y: 0,
                vx: 0, vy: 5.6,
                mass: 26,
                radius: 5.5,
                name: "TRAPPIST-1g",
                color: "#1E90FF",
                landColor: "#696969",
                water: 50,
                clouds: 60,
                temperature: -55,
                lifeChance: 20,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            },
            {
                type: 'rockyPlanet',
                x: 120, y: 0,
                vx: 0, vy: 4.8,
                mass: 15,
                radius: 4.2,
                name: "TRAPPIST-1h",
                color: "#778899",
                temperature: -80,
                water: 10,
                continents: [
                    [
                        {x: 0.2, y: 0.3}, {x: 0.4, y: 0.2}, {x: 0.6, y: 0.4}, 
                        {x: 0.5, y: 0.6}, {x: 0.3, y: 0.5}
                    ],
                    [
                        {x: -0.3, y: -0.4}, {x: -0.1, y: -0.2}, {x: 0.1, y: -0.4},
                        {x: 0.0, y: -0.6}
                    ]
                ]
            }
        ],
        universeAge: 7.6e9,
        universeTime: 0,
        camera: { x: 0, y: 0, zoom: 1.2 }
    };
    createSpecialSave("TRAPPIST-1", trappistSystem);
}
function createPastSolarSystem() {
    const G = 6.67430e-2;
    const ttauriMass = 450000;
    function calculateOrbitalVelocity(centralMass, distance) {
        return Math.sqrt(G * centralMass / distance);
    }
    function calculateMoonVelocity(planetMass, moonDistance) {
        return Math.sqrt(G * planetMass / moonDistance);
    }
    function generateProtoplanetContinents() {
        const continents = [];
        const numContinents = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numContinents; i++) {
            const continent = [];
            const points = 5 + Math.floor(Math.random() * 5);
            const centerX = (Math.random() - 0.5) * 0.8;
            const centerY = (Math.random() - 0.5) * 0.8;
            for (let j = 0; j < points; j++) {
                const angle = (j / points) * Math.PI * 2;
                const distance = 0.05 + Math.random() * 0.15;
                const x = centerX + Math.cos(angle) * distance * (0.6 + Math.random() * 0.6);
                const y = centerY + Math.sin(angle) * distance * (0.6 + Math.random() * 0.6);
                continent.push({x, y});
            }
            continent.push(continent[0]);
            continents.push(continent);
        }
        return continents;
    }
    function generateEarlyAsteroidBelt(numAsteroids, minDistance, maxDistance) {
        const asteroids = [];
        for (let i = 0; i < numAsteroids; i++) {
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            asteroids.push({
                type: Math.random() > 0.3 ? 'asteroid' : 'planetoid',
                x: x,
                y: y,
                vx: 0,
                vy: calculateOrbitalVelocity(ttauriMass, distance),
                mass: 0.2 + Math.random() * 1,
                radius: 0.8 + Math.random() * 2,
                name: `Planetesimal-${i+1}`,
                color: '#664422',
                locked: false
            });
        }
        return asteroids;
    }
    const pastSolarSystemData = {
        planets: [
            { 
                type: 'ttauriStar', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass: ttauriMass,
                radius: 35,
                name: "Sol Jovem (T Tauri)",
                color: "#FF4500",
                temperature: 4500,
                rotationSpeed: 0.05,
                jetAngle: Math.random() * Math.PI * 2,
                jetRotationSpeed: 2.0,
                locked: true
            },
            { 
                type: 'rockyPlanet', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass: 3.3,
                radius: 3,
                name: "..",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            },
            { 
                type: 'asteroid', 
                x: 0, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 1500), 
                mass: 1.5,
                radius: 2.5,
                name: "FGPWORK - dsd",
                color: "#5A4A42",
                temperature: 400,
                waterValue: 0,
                cloudsValue: 0,
                gasValue: 5,
                locked: false,
                continents: generateProtoplanetContinents()
            },
            ...generateEarlyAsteroidBelt(80, 800, 5000),
            { 
                type: 'planetoid', 
                x: 1500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 1500), 
                mass: 1.5,
                radius: 2.5,
                name: "Protomercúrio",
                color: "#5A4A42",
                temperature: 400,
                waterValue: 0,
                cloudsValue: 0,
                gasValue: 5,
                locked: false,
                continents: generateProtoplanetContinents()
            },
            { 
                type: 'rockyPlanet', 
                x: 2800, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 2800), 
                mass: 35,
                radius: 5,
                name: "Protovênus",
                color: "#B22222",
                temperature: 800,
                waterValue: 5,
                cloudsValue: 20,
                gasValue: 60,
                locked: false,
                continents: generateProtoplanetContinents()
            },
            { 
                type: 'rockyPlanet', 
                x: 4500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 4500), 
                mass: 35,
                radius: 5.5,
                name: "Proto-Terra",
                color: "#8B4513",
                landColor: "#A0522D",
                waterValue: 15,
                cloudsValue: 10,
                gasValue: 30,
                temperature: 200,
                lifeChance: 0,
                biomass: 0,
                population: 0,
                intelligentSpecies: ["None"],
                knowledgePoints: 0,
                locked: false,
                continents: generateProtoplanetContinents()
            },
            { 
                type: 'planetoid', 
                x: 4700, y: 800, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 4700), 
                mass: 12,
                radius: 3.5,
                name: "Theia",
                color: "#CD853F",
                temperature: 150,
                waterValue: 8,
                cloudsValue: 5,
                gasValue: 15,
                locked: false,
                continents: generateProtoplanetContinents()
            },
            { 
                type: 'planetoid', 
                x: 6500, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 6500), 
                mass: 3,
                radius: 3,
                name: "Protomarte",
                color: "#8B0000",
                temperature: -50,
                waterValue: 25,
                cloudsValue: 8,
                gasValue: 25,
                locked: false,
                continents: generateProtoplanetContinents()
            },
            ...generateEarlyAsteroidBelt(60, 7000, 12000),
            { 
                type: 'planetoid', 
                x: 9000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 9000), 
                mass: 0.8,
                radius: 1.8,
                name: "Protoceres",
                color: "#696969",
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 18000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 18000), 
                mass: 8000,
                radius: 12,
                name: "Protojúpiter",
                color: "#D2691E",
                temperature: -80,
                gasValue: 70,
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 28000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 28000), 
                mass: 3000,
                radius: 10,
                name: "Protosaturno",
                color: "#F4A460",
                temperature: -120,
                gasValue: 65,
                rings: false,
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 38000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 38000), 
                mass: 400,
                radius: 8,
                name: "Protourano",
                color: "#87CEEB",
                temperature: -170,
                gasValue: 60,
                locked: false
            },
            { 
                type: 'gasGiant', 
                x: 48000, y: 0, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 48000), 
                mass: 450,
                radius: 7,
                name: "Protonetuno",
                color: "#1E90FF",
                temperature: -190,
                gasValue: 60,
                locked: false
            },
            ...generateEarlyAsteroidBelt(40, 50000, 80000),
            { 
                type: 'planetoid', 
                x: 35000, y: 10000, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 35000), 
                mass: 8,
                radius: 3,
                name: "Impactador Alpha",
                color: "#8B4513",
                locked: false
            },
            { 
                type: 'planetoid', 
                x: -20000, y: 25000, 
                vx: 0, vy: calculateOrbitalVelocity(ttauriMass, 32000), 
                mass: 6,
                radius: 2.5,
                name: "Impactador Beta",
                color: "#A0522D",
                locked: false
            },
            { 
                type: 'comet', 
                x: -60000, y: 40000, 
                vx: 2, vy: calculateOrbitalVelocity(ttauriMass, 72000), 
                mass: 0.3,
                radius: 1.2,
                name: "Cometa Primordial",
                color: "#F5F5DC",
                temperature: -220,
                locked: false
            },
            { 
                type: 'comet', 
                x: 70000, y: -35000, 
                vx: -1.5, vy: calculateOrbitalVelocity(ttauriMass, 78000), 
                mass: 0.4,
                radius: 1.5,
                name: "Cometa Arcaico",
                color: "#FFF8DC",
                temperature: -230,
                locked: false
            }
        ],
        universeAge: 1e8,
        universeTime: 0,
        camera: { x: 0, y: 0, zoom: 0.15 }
    };
    createSpecialSave("Sistema Solar Primitivo", pastSolarSystemData);
}
function createRandomSpaceSave() {
    const G = 6.67430e-2;
    const galaxyCenterMass = 1e12;
    function calculateOrbitalVelocity(centralMass, distance) {
        return Math.sqrt(G * centralMass / distance);
    }
    function calculateMoonVelocity(planetMass, moonDistance) {
        return Math.sqrt(G * planetMass / moonDistance);
    }
    function getRandomStarType() {
        const commonTypes = ['star', 'redDwarf', 'brownDwarf'];
        const rareTypes = ['carbonStar', 'giantStar', 'redGiant', 'whiteDwarf'];
        const veryRareTypes = ['hypergiant', 'massiveStar', 'redSupergiant', 'pulsar', 'magnetar', 'blackHole'];
        const ultraRareTypes = ['quarkStar', 'strangeStar'];
        const rand = Math.random();
        if (rand < 0.6) return commonTypes[Math.floor(Math.random() * commonTypes.length)];
        if (rand < 0.9) return rareTypes[Math.floor(Math.random() * rareTypes.length)];
        if (rand < 0.98) return veryRareTypes[Math.floor(Math.random() * veryRareTypes.length)];
        return ultraRareTypes[Math.floor(Math.random() * ultraRareTypes.length)];
    }
    function generateStarColor(starType) {
        const colors = {
            'star': '#FFD700', 'redDwarf': '#FF4500', 'brownDwarf': '#8B4513',
            'carbonStar': '#8B0000', 'giantStar': '#FFA500', 'redGiant': '#DC143C',
            'redSupergiant': '#FF0000', 'hypergiant': '#00BFFF', 'massiveStar': '#87CEEB',
            'pulsar': '#E0FFFF', 'magnetar': '#8A2BE2', 'blackHole': '#000000',
            'whiteDwarf': '#F0F8FF', 'quarkStar': '#4B0082', 'strangeStar': '#8A00FF'
        };
        return colors[starType] || '#FFFFFF';
    }
    function generateSimpleContinents() {
        const continents = [];
        const numContinents = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numContinents; i++) {
            const continent = [];
            const points = 4 + Math.floor(Math.random() * 4);
            const centerX = (Math.random() - 0.5) * 0.4;
            const centerY = (Math.random() - 0.5) * 0.4;
            for (let j = 0; j < points; j++) {
                const angle = (j / points) * Math.PI * 2;
                const distance = 0.08 + Math.random() * 0.12;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                continent.push({x, y});
            }
            continent.push(continent[0]);
            continents.push(continent);
        }
        return continents;
    }
    function generateStarSystem(distanceFromCenter, angle) {
        const system = [];
        const starType = getRandomStarType();
        const starMass = 100000 + Math.random() * 900000;
        const star = {
            type: starType,
            x: Math.cos(angle) * distanceFromCenter,
            y: Math.sin(angle) * distanceFromCenter,
            vx: 0,
            vy: calculateOrbitalVelocity(galaxyCenterMass, distanceFromCenter),
            mass: starMass,
            radius: 15 + Math.random() * 15,
            name: `S-${Math.floor(Math.random() * 1000)}`,
            color: generateStarColor(starType),
            temperature: 3000 + Math.random() * 12000,
            locked: false
        };
        system.push(star);
        const numPlanets = Math.floor(Math.random() * 6);
        for (let i = 0; i < numPlanets; i++) {
            const orbitDistance = 800 + (i + 1) * (600 + Math.random() * 800);
            const planetAngle = Math.random() * Math.PI * 2;
            const planetTypes = ['rockyPlanet', 'gasGiant', 'planetoid'];
            const planetType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
            let mass, radius;
            switch(planetType) {
                case 'rockyPlanet':
                    mass = 10 + Math.random() * 40;
                    radius = 2 + Math.random() * 4;
                    break;
                case 'gasGiant':
                    mass = 200 + Math.random() * 800;
                    radius = 6 + Math.random() * 8;
                    break;
                default:
                    mass = 0.5 + Math.random() * 3;
                    radius = 1 + Math.random() * 2;
            }
            const planet = {
                type: planetType,
                x: star.x + Math.cos(planetAngle) * orbitDistance,
                y: star.y + Math.sin(planetAngle) * orbitDistance,
                vx: 0,
                vy: star.vy + calculateOrbitalVelocity(starMass, orbitDistance),
                mass: mass,
                radius: radius,
                name: `P-${Math.floor(Math.random() * 1000)}`,
                color: `#${Math.floor(Math.random()*8388607 + 8388608).toString(16)}`,
                temperature: -200 + Math.random() * 400,
                waterValue: Math.floor(Math.random() * 100),
                gasValue: Math.floor(Math.random() * 100),
                cloudsValue: Math.floor(Math.random() * 100),
                locked: false
            };
            if (planetType === 'rockyPlanet' && Math.random() < 0.3) {
                planet.continents = generateSimpleContinents();
            }
            if (Math.random() < 0.1) {
                planet.rings = true;
                planet.ringMass = Math.floor(Math.random() * 30);
            }
            system.push(planet);
            if (Math.random() < 0.2 && mass > 8) {
                const numMoons = 1 + Math.floor(Math.random() * 2);
                for (let m = 0; m < numMoons; m++) {
                    const moonDistance = (m + 1) * (radius * 2 + 30);
                    const moonAngle = Math.random() * Math.PI * 2;
                    system.push({
                        type: 'planetoid',
                        x: planet.x + Math.cos(moonAngle) * moonDistance,
                        y: planet.y + Math.sin(moonAngle) * moonDistance,
                        vx: 0,
                        vy: planet.vy + calculateMoonVelocity(planet.mass, moonDistance),
                        mass: 0.1 + Math.random() * 1,
                        radius: 0.3 + Math.random() * 1,
                        name: `M-${Math.floor(Math.random() * 1000)}`,
                        color: '#888888',
                        locked: false
                    });
                }
            }
        }
        const numAsteroids = Math.floor(Math.random() * 3);
        for (let i = 0; i < numAsteroids; i++) {
            const asteroidDistance = 500 + Math.random() * 2000;
            const asteroidAngle = Math.random() * Math.PI * 2;
            system.push({
                type: 'asteroid',
                x: star.x + Math.cos(asteroidAngle) * asteroidDistance,
                y: star.y + Math.sin(asteroidAngle) * asteroidDistance,
                vx: 0,
                vy: star.vy + calculateOrbitalVelocity(starMass, asteroidDistance),
                mass: 0.1 + Math.random() * 0.5,
                radius: 0.5 + Math.random() * 1.5,
                name: `A-${Math.floor(Math.random() * 1000)}`,
                color: '#666666',
                locked: false
            });
        }
        return system;
    }
    function generateRoguePlanet() {
        const types = ['rockyPlanet', 'gasGiant', 'planetoid'];
        const type = types[Math.floor(Math.random() * types.length)];
        let mass, radius;
        switch(type) {
            case 'rockyPlanet':
                mass = 5 + Math.random() * 25;
                radius = 1.5 + Math.random() * 2.5;
                break;
            case 'gasGiant':
                mass = 100 + Math.random() * 400;
                radius = 4 + Math.random() * 6;
                break;
            default:
                mass = 0.3 + Math.random() * 2;
                radius = 0.8 + Math.random() * 1.5;
        }
        const distance = 5000 + Math.random() * 100000;
        const angle = Math.random() * Math.PI * 2;
        return {
            type: type,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            mass: mass,
            radius: radius,
            name: `R-${Math.floor(Math.random() * 1000)}`,
            color: '#555555',
            temperature: -250 + Math.random() * 100,
            locked: false
        };
    }
    const randomSpaceData = {
        planets: [
            {
                type: 'quasar',
                x: 0, y: 0,
                vx: 0, vy: 0,
                mass: galaxyCenterMass,
                radius: 40,
                name: "Quasar",
                color: "#000000",
                temperature: 1e6,
                jetAngle: Math.random() * Math.PI * 2,
                locked: true
            },
            { 
                type: 'rockyPlanet', 
                x: 0, y: 0, 
                vx: 0, vy: 0, 
                mass: 3.3,
                radius: 3,
                name: "..",
                color: "#8C7853",
                temperature: 167,
                gasValue: 2,
                waterValue: 1,
                cloudsValue: 0,
                locked: false,
                ignoreColorChanges: true
            }
        ],
        universeAge: 1e10,
        universeTime: 0,
        camera: { x: 0, y: 0, zoom: 0.02 }
    };
    const numStarSystems = 15 + Math.floor(Math.random() * 25);
    for (let i = 0; i < numStarSystems; i++) {
        const distance = 8000 + Math.random() * 80000;
        const angle = Math.random() * Math.PI * 2;
        const starSystem = generateStarSystem(distance, angle);
        randomSpaceData.planets.push(...starSystem);
    }
    const numRoguePlanets = 3 + Math.floor(Math.random() * 7);
    for (let i = 0; i < numRoguePlanets; i++) {
        randomSpaceData.planets.push(generateRoguePlanet());
    }
    if (Math.random() < 0.3) {
        const dwarfDistance = 120000 + Math.random() * 80000;
        const dwarfAngle = Math.random() * Math.PI * 2;
        const numDwarfSystems = 3 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numDwarfSystems; i++) {
            const systemDistance = 1000 + Math.random() * 3000;
            const systemAngle = Math.random() * Math.PI * 2;
            const system = generateStarSystem(systemDistance, systemAngle);
            system.forEach(obj => {
                obj.x += Math.cos(dwarfAngle) * dwarfDistance;
                obj.y += Math.sin(dwarfAngle) * dwarfDistance;
                obj.vy += calculateOrbitalVelocity(galaxyCenterMass, dwarfDistance);
            });
            randomSpaceData.planets.push(...system);
        }
    }
    createSpecialSave("Universo Aleatório Compacto", randomSpaceData);
}
function initializeMedusaStar() {
    console.log('Initializing Medusa Star state...');
    const medusaUnlocked = localStorage.getItem('medusaStarUnlocked') === 'true';
    const medusaPurchased = localStorage.getItem('medusaStarPurchased') === 'true';
    console.log('Medusa unlocked:', medusaUnlocked, 'Medusa purchased:', medusaPurchased);
    const medusaStarItem = document.querySelector('[data-item-id="medusaStar"]');
    if (medusaStarItem) {
        if (medusaUnlocked && !medusaPurchased) {
            medusaStarItem.classList.remove('hidden');
            medusaStarItem.classList.add('visible');
            medusaStarItem.style.display = 'block';
            console.log('Medusa Star card shown in shop');
        } else if (medusaPurchased) {
            medusaStarItem.classList.add('purchased');
            medusaStarItem.classList.remove('hidden');
            medusaStarItem.style.display = 'block';
            console.log('Medusa Star card hidden (already purchased)');
        } else {
            medusaStarItem.classList.add('hidden');
            medusaStarItem.classList.remove('visible');
            medusaStarItem.style.display = 'none';
            console.log('Medusa Star card hidden (not unlocked)');
        }
    } else {
        console.error('Medusa Star item not found!');
    }
    if (medusaPurchased && !unlockedAstroTypes.includes('medusaStar')) {
        unlockedAstroTypes.push('medusaStar');
        localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
        console.log('Medusa Star added to unlocked astros');
    }
}
function initializeNitricStar() {
    console.log('Initializing Nitric Star state...');
    nitricStarUnlocked = localStorage.getItem('nitricStarUnlocked') === 'true';
    nitricStarPurchased = localStorage.getItem('nitricStarPurchased') === 'true';
    const nitricStarItem = document.querySelector('[data-item-id="nitricStar"]');
    if (nitricStarItem) {
        if (nitricStarUnlocked && !nitricStarPurchased) {
            nitricStarItem.classList.remove('hidden');
            nitricStarItem.classList.add('visible');
            nitricStarItem.style.display = 'block';
            console.log('Nitric Star card shown in shop');
        } else if (nitricStarPurchased) {
            nitricStarItem.classList.add('purchased');
            nitricStarItem.classList.remove('hidden');
            nitricStarItem.style.display = 'block';
            console.log('Nitric Star purchased and available');
        } else {
            nitricStarItem.classList.add('hidden');
            nitricStarItem.classList.remove('visible');
            nitricStarItem.style.display = 'none';
            console.log('Nitric Star card hidden (not unlocked)');
        }
    }
    checkNitricStarUnlock();
}
function initializeCodesStar() {
    console.log('Initializing Code Stars shop state...');
    const codesUnlocked = localStorage.getItem('siu2d_star_codes_unlocked') === 'true';
    const codesPurchased = purchasedItems['codesStar'] === true || localStorage.getItem('siu2d_purchased_items') && JSON.parse(localStorage.getItem('siu2d_purchased_items') || '{}')['codesStar'] === true;
    const codesItem = document.querySelector('[data-item-id="codesStar"]');
    if (codesItem) {
        if (codesUnlocked && !codesPurchased) {
            codesItem.classList.remove('hidden');
            codesItem.classList.add('visible');
            codesItem.style.display = 'block';
            console.log('Code Stars card shown in shop (unlocked)');
        } else if (codesPurchased) {
            codesItem.classList.add('purchased');
            codesItem.classList.remove('hidden');
            codesItem.style.display = 'block';
            console.log('Code Stars purchased and available');
        } else {
            codesItem.classList.add('hidden');
            codesItem.classList.remove('visible');
            codesItem.style.display = 'none';
            console.log('Code Stars card hidden (not unlocked)');
        }
    } else {
        console.log('Code Stars shop item not found');
    }
}
function checkNitricStarUnlock() {
    const medusaPurchased = localStorage.getItem('medusaStarPurchased') === 'true';
    const medusaCount = parseInt(localStorage.getItem('medusaStarsCreated') || '0');
    if (medusaPurchased && medusaCount >= 20 && !nitricStarUnlocked) {
        nitricStarUnlocked = true;
        localStorage.setItem('nitricStarUnlocked', 'true');
        initializeNitricStar();
        showNotification('Nitric Star Unlocked!', 5000);
    }
}
function purchaseMedusaStar() {
    console.log('Purchasing Medusa Star...');
    if (!unlockedAstroTypes.includes('medusaStar')) {
        unlockedAstroTypes.push('medusaStar');
        localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
    }
    localStorage.setItem('medusaStarPurchased', 'true');
    const medusaStarItem = document.querySelector('[data-item-id="medusaStar"]');
    if (medusaStarItem) {
        medusaStarItem.classList.add('hidden');
        medusaStarItem.classList.remove('visible');
        medusaStarItem.style.display = 'none';
    }
    fgpCreationGrid();
    showNotification("Medusa Star unlocked! You can now create it in creation mode.");
    console.log('Medusa Star purchased successfully');
}
function purchaseNitricStar() {
    if (tsCoins >= NITRIC_STAR_PRICE) {
        tsCoins -= NITRIC_STAR_PRICE;
        localStorage.setItem('tsCoins', tsCoins.toString());
        nitricStarPurchased = true;
        localStorage.setItem('nitricStarPurchased', 'true');
        if (!unlockedAstroTypes.includes('nitricStar')) {
            unlockedAstroTypes.push('nitricStar');
            localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
        }
        fgpTSCoinsDisplay();
        fgpCreationGrid();
        initializeNitricStar();
        return true;
    } else {
        return false;
    }
}
let unlockedAstroTypes = JSON.parse(localStorage.getItem('siu2d_unlocked_astros') || '[]');
function unlockBizarreStars() {
    const newStarTypes = [
        'chronosStar',
        'phantomStar',
        'vortexStar',
        'crystalStar',
        'neuralStar',
        'hologramStar',
        'quantumFoamStar',
        'prismStar',
        'echoStar',
        'singularityStar'
    ];
    newStarTypes.forEach(starType => {
        if (!unlockedAstroTypes.includes(starType)) {
            unlockedAstroTypes.push(starType);
        }
    });
    localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
    fgpCreationGrid();
}
function unlockMedusaStar() {
    const medusaStarType = 'medusaStar';
    if (!unlockedAstroTypes.includes(medusaStarType)) {
        unlockedAstroTypes.push(medusaStarType);
        localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
        fgpCreationGrid();
    }
}
function unlockSingularity() {
    if (!unlockedAstroTypes.includes('singularity')) {
        unlockedAstroTypes.push('singularity');
        localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
        fgpCreationGrid();
    }
}
function unlockCodeStarPack() {
    const newStarTypes = [
        'asciiStar',
        'jsStar',
        'pyStar',
        'cssStar',
        'csharpStar',
        'gmlStar',
        'javaStar',
        'phpStar',
        'rustStar',
        'goStar',
        'kotlinStar',
        'swiftStar',
        'tsStar',
        'luaStar',
        'rubyStar',
        'dartStar',
        'htmlStar',
        'jsonStar',
        'assemblyStar'
        ,
        'sqlStar'
    ];
    let added = 0;
    newStarTypes.forEach(starType => {
        if (!unlockedAstroTypes.includes(starType)) {
            unlockedAstroTypes.push(starType);
            added++;
        }
    });
    if (added > 0) {
        localStorage.setItem('siu2d_unlocked_astros', JSON.stringify(unlockedAstroTypes));
        localStorage.setItem('siu2d_star_codes_unlocked', 'true');
        if (typeof fgpCreationGrid === 'function') fgpCreationGrid();
        if (typeof showNotification === 'function') showNotification('🎉 Code Star Pack unlocked! Check Creation Mode.');
    } else {
        if (typeof showNotification === 'function') showNotification('Code Star Pack already unlocked.');
    }
}
window.unlockStarCodes = unlockCodeStarPack;
let unlockedConfigs = JSON.parse(localStorage.getItem('siu2d_unlocked_configs') || '[]');
function unlockFunSpace() {
    if (!unlockedConfigs.includes('fun_space')) {
        unlockedConfigs.push('fun_space');
        localStorage.setItem('siu2d_unlocked_configs', JSON.stringify(unlockedConfigs));
        showNotification("Go to Options");
    }
}
function fgpCreationGrid() {
    const optionsGrid = document.querySelector('.options-grid');
    if (!optionsGrid) return;
    unlockedAstroTypes.forEach(astroType => {
        if (!document.querySelector(`[data-type="${astroType}"]`)) {
            const astroCard = createAstroCard(astroType);
            optionsGrid.appendChild(astroCard);
        }
    });
}
function createAstroCard(type) {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.setAttribute('data-type', type);
    const config = getAstroConfig(type);
    card.innerHTML = `
        <h3><i class="${config.icon}"></i>${config.name}</h3>
        <p>${config.description}</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${config.massPercent}%"></div>
        </div>
        <div class="mass-label">Massa: ${config.massRange}</div>
        <div class="${config.rarity}">${config.rarityText}</div>
    `;
    card.addEventListener('click', () => {
        creationMode = type;
        selectedType = type;
        creationModeText.textContent = config.name;
        creationModeIndicator.style.display = 'block';
        toggleGameMenu();
    });
    return card;
}
function getAstroConfig(type) {
    const configs = {
        'chronosStar': {
            icon: 'fas fa-clock',
            name: 'Chronosstar',
            description: '???',
            massPercent: 92,
            massRange: '600M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'phantomStar': {
            icon: 'fas fa-ghost',
            name: 'Phantomstar',
            description: '???',
            massPercent: 85,
            massRange: '300M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'vortexStar': {
            icon: 'fas fa-tornado',
            name: 'Vortexstar',
            description: '???',
            massPercent: 94,
            massRange: '800M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'crystalStar': {
            icon: 'fas fa-gem',
            name: 'Crystalstar',
            description: '???',
            massPercent: 88,
            massRange: '500M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'neuralStar': {
            icon: 'fas fa-brain',
            name: 'Neuralstar',
            description: '???',
            massPercent: 90,
            massRange: '700M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'hologramStar': {
            icon: 'fas fa-project-diagram',
            name: 'Hologramstar',
            description: '???',
            massPercent: 87,
            massRange: '400M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'quantumFoamStar': {
            icon: 'fas fa-water',
            name: 'Quantum Foam Star',
            description: '???',
            massPercent: 96,
            massRange: '1B - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'prismStar': {
            icon: 'fas fa-rainbow',
            name: 'Prismstar',
            description: '???',
            massPercent: 89,
            massRange: '600M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'echoStar': {
            icon: 'fas fa-wave-square',
            name: 'Echostar',
            description: '???',
            massPercent: 91,
            massRange: '750M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        'singularityStar': {
            icon: 'fas fa-infinity',
            name: 'Singularity',
            description: 'The heaviest object in the universe and the origin of the big bang!',
            massPercent: 100,
            massRange: ' "∞" ',
            rarity: 'Ultra-Legendario',
            rarityText: 'Ultra-Legendary'
        },
        "medusaStar":{
            icon: 'fas fa-worm',
            name: 'Medusa Star',
            description: 'A star that petrifies other stars',
            massPercent: 90,
            massRange: '800M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        },
        "nitricStar":{
            icon: 'fas fa-water',
            name: 'Nitric acid star',
            description: 'A star that depetrifies other stars',
            massPercent: 90,
            massRange: '800M - ∞',
            rarity: 'ultra-raro',
            rarityText: 'Unknown...'
        }
        ,
        'asciiStar': {
            icon: 'fas fa-terminal',
            name: 'ASCII Star',
            description: 'A star woven from characters and binary pulses. Emits light in rhythmic code bursts.',
            massPercent: 55,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        }
        ,
        'jsStar': {
            icon: 'fab fa-js-square',
            name: 'JS Star',
            description: 'A star infused with asynchronous sparks and event-loop flares.',
            massPercent: 58,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'pyStar': {
            icon: 'fab fa-python',
            name: 'Py Star',
            description: 'A calm, clear star emitting elegant indentation waves.',
            massPercent: 57,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'cssStar': {
            icon: 'fab fa-css3-alt',
            name: 'CSS Star',
            description: 'A star that styles the void with gradients and subtle shadows.',
            massPercent: 50,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'csharpStar': {
            icon: 'fas fa-hashtag',
            name: 'C# Star',
            description: 'A structured, strongly-typed star with crisp orbits.',
            massPercent: 60,
            massRange: '1K - 700K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'gmlStar': {
            icon: 'fas fa-gamepad',
            name: 'GML Star',
            description: 'A playful star crafted from rapid prototyping loops.',
            massPercent: 52,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        }
        ,
        'javaStar': {
            icon: 'fab fa-java',
            name: 'Java Star',
            description: 'A verbose, steady star that emits class-like orbits.',
            massPercent: 59,
            massRange: '1K - 700K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'phpStar': {
            icon: 'fab fa-php',
            name: 'PHP Star',
            description: 'A pragmatic star with eclectic echoes and legacy charm.',
            massPercent: 56,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'rustStar': {
            icon: 'fas fa-feather',
            name: 'Rust Star',
            description: 'A safe, systems-oriented star that emits precise sparks.',
            massPercent: 60,
            massRange: '1K - 700K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'goStar': {
            icon: 'fas fa-code',
            name: 'Go Star',
            description: 'A concurrent star with clean, fast pulses.',
            massPercent: 54,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        }
        ,
        'kotlinStar': {
            icon: 'fas fa-feather-alt',
            name: 'Kotlin Star',
            description: 'A modern, concise star with smooth coroutines.',
            massPercent: 58,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'swiftStar': {
            icon: 'fas fa-rocket',
            name: 'Swift Star',
            description: 'A fast, expressive star that sends sharp pulses.',
            massPercent: 57,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'tsStar': {
            icon: 'fab fa-js-square',
            name: 'TS Star',
            description: 'A typed star offering predictable, safe flares.',
            massPercent: 56,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'luaStar': {
            icon: 'fas fa-water',
            name: 'Lua Star',
            description: 'A lightweight, embeddable star with nimble sparks.',
            massPercent: 53,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'rubyStar': {
            icon: 'fas fa-gem',
            name: 'Ruby Star',
            description: 'A polished, expressive star that emits elegant reflections.',
            massPercent: 59,
            massRange: '1K - 700K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'dartStar': {
            icon: 'fas fa-bolt',
            name: 'Dart Star',
            description: 'A swift, single-shot star with direct bursts.',
            massPercent: 54,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        }
        ,
        'htmlStar': {
            icon: 'fab fa-html5',
            name: 'HTML Star',
            description: 'A structural star built from tags and nested elements. Emits warm markup halos.',
            massPercent: 55,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'jsonStar': {
            icon: 'fas fa-database',
            name: 'JSON Star',
            description: 'A data-oriented star that radiates paired keys and values in tidy structures.',
            massPercent: 53,
            massRange: '1K - 500K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        },
        'assemblyStar': {
            icon: 'fas fa-microchip',
            name: 'ASSEMBLY Star',
            description: 'A low-level, terse star sending tight, rhythmic machine pulses and hex dust.',
            massPercent: 58,
            massRange: '1K - 700K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        }
        ,
        'sqlStar': {
            icon: 'fas fa-database',
            name: 'SQL Star',
            description: 'A relational star that emits table-like rings and indexed queries of particles.',
            massPercent: 57,
            massRange: '1K - 600K',
            rarity: 'raro',
            rarityText: 'Secret Code Pack'
        }
    };
    return configs[type] || {
        icon: 'fas fa-star',
        name: type,
        description: 'Unknown Astro...',
        massPercent: '?',
        massRange: 'Unknown Range...',
        rarity: 'ultra-raro',
        rarityText: 'Unknown...'
    };
}
function closeManual() {
    const manualOverlay = document.getElementById('manualOverlay');
    if (manualOverlay) {
        manualOverlay.classList.remove('active');
        setTimeout(() => {
            manualOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}
function nextManualPage() {
    if (currentManualPage < totalManualPages) {
        currentManualPage++;
        fgpManualPage();
    }
}
function prevManualPage() {
    if (currentManualPage > 1) {
        currentManualPage--;
        fgpManualPage();
    }
}
function fgpManualPage() {
    const pages = document.querySelectorAll('.manual-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const currentPage = document.querySelector(`.manual-page[data-page="${currentManualPage}"]`);
    if (currentPage) {
        currentPage.classList.add('active');
    }
    const indicator = document.querySelector('.manual-page-indicator');
    if (indicator) {
        indicator.textContent = `Página ${currentManualPage} de ${totalManualPages}`;
    }
    const prevBtn = document.querySelector('.manual-controls .manual-btn:first-child');
    const nextBtn = document.querySelector('.manual-controls .manual-btn:last-child');
    if (prevBtn) {
        prevBtn.disabled = currentManualPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentManualPage === totalManualPages;
    }
}
document.addEventListener('keydown', function(e) {
    const manualOverlay = document.getElementById('manualOverlay');
    if (manualOverlay && manualOverlay.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            nextManualPage();
        } else if (e.key === 'ArrowLeft') {
            prevManualPage();
        } else if (e.key === 'Escape') {
            closeManual();
        }
    }
});
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
        console.trace();
        mass = type === 'spaceDust' ? 0.1 : 1000;
    }
        const baseRadius = {
            star: 30,
            redDwarf: 15,
            brownDwarf: 10,
            whiteDwarf: 0.001,
            heliumWhiteDwarf: 0.001,
            blackDwarf: 0.001,
            ttauriStar: 20,
            carbonStar: 40,
            massiveStar: 70,
            supermassiveStar: 150,
            giantStar: 50,
            hypergiant: 80,
            redGiant: 60,
            redSupergiant: 100,
            quasar: 120,
            whiteHole: 120,
            blackHole: 10,
            neutronStar: 5,
            pulsar: 0.05,
            magnetar: 0.15,
            quarkStar: 0.5,
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
            radiation: 1,
            satellite: 0.1,
            rocket: 0.12,
            spaceship: 0.2,
            superShip: 4,
            chronosStar: 9,
            phantomStar: 11,
            vortexStar: 8,
            crystalStar: 7,
            neuralStar: 7,
            hologramStar: 12,
            quantumFoamStar: 13,
            prismStar: 9.5,
            echoStar: 8.8,
            asciiStar: 6,
            jsStar: 6.5,
            pyStar: 6.5,
            cssStar: 5.5,
            csharpStar: 7,
            gmlStar: 5.5,
            javaStar: 6,
            phpStar: 6.5,
            rustStar: 6,
            goStar: 6,
            kotlinStar: 6,
            swiftStar: 6,
            tsStar: 6,
            luaStar: 5.5,
            rubyStar: 6,
            dartStar: 5.5,
        htmlStar: 6,
        jsonStar: 5.5,
        assemblyStar: 6.5,
        sqlStar: 6,
            singularityStar: 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001,
    };
    const base = baseRadius[type] || 10;
    const calculatedRadius = base * Math.pow(mass / 1000, 0.3);
    if (!isFinite(calculatedRadius) || calculatedRadius <= 0) {
        console.warn(`Raio inválido calculado para ${type}: ${calculatedRadius}. Usando valor base.`);
        return Math.max(0.1, base);
    }
    return Math.max(0.1, calculatedRadius);
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
function startContinuousZoom(direction) {
    stopContinuousZoom();
    zoomInterval = setInterval(() => {
        if (direction === 'in') {
            camera.zoom *= 1.05;
        } else {
            camera.zoom /= 1.05;
        }
        camera.zoom = Math.max(0.001, Math.min(1000, camera.zoom));
    }, 50); 
}
function stopContinuousZoom() {
    if (zoomInterval) {
        clearInterval(zoomInterval);
        zoomInterval = null;
    }
}
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
    lockOrientation();
}
function toggleGameMenu() {
    isMenuOpen = !isMenuOpen;
    if (!inGameMenu) {
        console.warn('inGameMenu not found!');
        return;
    }
    if (isMenuOpen) {
        inGameMenu.classList.add('active');
        inGameMenu.style.display = 'block';
    } else {
        inGameMenu.classList.remove('active');
        inGameMenu.style.display = 'none';
    }
}
function closePixelMenu() {
    _fgp_pixelUiState.menuOpen = false;
    if (_fgp_pixelUiCanvas) _fgp_pixelUiCanvas.style.display = 'none';
    document.body.style.overflow = '';
}
function fgpVolume() {
    const volume = volumeSlider.value;
    volumeValue.textContent = volume;
}
function fgpGravityFactor() {
    gravityFactor = parseFloat(gravityFactorSlider.value) / 100;
    gravityFactorValue.textContent = gravityFactorSlider.value;
}
function fgpDragFactor() {
    dragFactor = parseFloat(dragFactorSlider.value) / 100;
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
function toggleSpectateBtn(show) {
    const exitSpectateBtn = document.getElementById('exitSpectateBtn');
    if (exitSpectateBtn) {
        exitSpectateBtn.style.display = show ? 'block' : 'none';
    }
}
function toggleSpectateMode() {
    if (!selectedPlanet) {
        showNotification("Select a celestial body first!");
        return;
    }
    spectateMode = !spectateMode;
    if (spectateMode) {
        spectatedAstro = selectedPlanet;
        const astroStillExists = planets.find(p => p === spectatedAstro);
        if (!astroStillExists) {
            showNotification("Selected astro no longer exists!");
            spectateMode = false;
            spectatedAstro = null;
            return;
        }
        btnSpectate.style.backgroundColor = '#4CAF50';
        showNotification(`Spectating ${spectatedAstro.name}. Press B to stop.`);
        camera.x = spectatedAstro.x;
        camera.y = spectatedAstro.y;
        if (controlMode) {
            toggleControlMode();
        }
    } else {
        spectatedAstro = null;
        btnSpectate.style.backgroundColor = '';
        showNotification("Spectate mode deactivated.");
    }
}
function fgpSpectateCamera() {
    if (spectateMode && spectatedAstro) {
        const astroExists = planets.find(p => p === spectatedAstro && !p.markedForRemoval);
        if (!astroExists) {
            showNotification("Spectated astro no longer exists. Exiting spectate mode.");
            spectateMode = false;
            spectatedAstro = null;
            btnSpectate.style.backgroundColor = '';
            return;
        }
        const smoothFactor = 0.1;
        camera.x += (spectatedAstro.x - camera.x) * smoothFactor;
        camera.y += (spectatedAstro.y - camera.y) * smoothFactor;
    }
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
function fgpWater() {
    waterValue.textContent = waterSlider.value + '%';
    astroSettings.water = parseInt(waterSlider.value);
    fgpAstroPreview();
}
function fgpClouds() {
    cloudsValue.textContent = cloudsSlider.value + '%';
    astroSettings.clouds = parseInt(cloudsSlider.value);
    fgpAstroPreview();
}
function fgpGas() {
    gasValue.textContent = gasSlider.value + '%';
    astroSettings.gas = parseInt(gasSlider.value);
    fgpAstroPreview();
}
function fgpRotation() {
    rotationValue.textContent = rotationSlider.value;
    astroSettings.rotationSpeed = parseFloat(rotationSlider.value);
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
    if (selectedPlanet) {
        selectedPlanet.color = astroSettings.primaryColor;
        selectedPlanet.landColor = astroSettings.secondaryColor;
        selectedPlanet.ringColor = astroSettings.ringColor;
        selectedPlanet.mass = astroSettings.mass;
        selectedPlanet.gravity = astroSettings.gravity;
        selectedPlanet.temperature = astroSettings.temperature;
        selectedPlanet.rotationSpeed = astroSettings.rotationSpeed;
        selectedPlanet.waterValue = astroSettings.water;
        selectedPlanet.cloudsValue = astroSettings.clouds;
        selectedPlanet.gasValue = astroSettings.gas;
        selectedPlanet.hasRings = astroSettings.hasRings;
        selectedPlanet.ringMass = astroSettings.ringMass;
        selectedPlanet.radius = Math.sqrt(selectedPlanet.mass) * 5;
        showNotification("Success!");
        fgpAstroPreview();
    } else {
        showNotification("Place the camera near a celestial body.");
    }
}
function resetAstroSettings() {
    astroSettings.primaryColor = '#b0bec5';
    astroSettings.secondaryColor = '#90a4ae';
    astroSettings.ringColor = 'rgba(180,180,180,0.5)';
    astroSettings.mass = 50;
    astroSettings.gravity = 9.8;
    astroSettings.temperature = 20;
    astroSettings.rotationSpeed = 0.01;
    astroSettings.water = 0;
    astroSettings.clouds = 0;
    astroSettings.gas = 0;
    astroSettings.hasRings = false;
    astroSettings.ringMass = 30;
    primaryColor.value = astroSettings.primaryColor;
    secondaryColor.value = astroSettings.secondaryColor;
    ringColor.value = astroSettings.ringColor;
    massSlider.value = astroSettings.mass;
    massValue.textContent = astroSettings.mass;
    gravitySlider.value = astroSettings.gravity;
    gravityValue.textContent = astroSettings.gravity;
    tempSlider.value = astroSettings.temperature;
    tempValue.textContent = astroSettings.temperature + '°C';
    rotationSlider.value = astroSettings.rotationSpeed;
    rotationValue.textContent = astroSettings.rotationSpeed;
    waterSlider.value = astroSettings.water;
    waterValue.textContent = astroSettings.water + '%';
    cloudsSlider.value = astroSettings.clouds;
    cloudsValue.textContent = astroSettings.clouds + '%';
    gasSlider.value = astroSettings.gas;
    gasValue.textContent = astroSettings.gas + '%';
    hasRings.checked = astroSettings.hasRings;
    ringMassSlider.value = astroSettings.ringMass;
    ringMassValue.textContent = astroSettings.ringMass;
    fgpAstroPreview();
}
function createAstro(type, x, y, vx = 0, vy = 0, customMass = null, originPlanet = null) {
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
        id: Date.now() + Math.random(),
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
        locked: false,
        lifeChance: 0,
        biomass: 0,
        population: 0,
        knowledge: 0,
        intelligentSpecies: [],
        knowledgePoints: 0,
        affectionColor: null,
        satellites: [],
        rockets: [],
        spaceships: [],
        superShips: [],
        hasIntelligentLife: false,
        ignoreColorChanges: false,
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
    const originalCreateAstro = createAstro;
    createAstro = function(type, x, y, vx = 0, vy = 0, customMass = null) {
        const planet = originalCreateAstro(type, x, y, vx, vy, customMass);
        initializePlanetLifeProperties(planet);
        if (planet.type === 'rockyPlanet' || planet.type === 'planet' || planet.type === 'gasGiant') {
            startPlanetSatelliteSpawner(planet);
        }
        return planet;
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
            planet.waterValue = astroSettings.water || 0;
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
            planet.mass = Math.max(2500000, customMass || astroSettings.mass * 1000);
            planet.color = '#d60000ff';
            planet.glowColor = '#570000ff';
            planet.rings = astroSettings.hasRings;
            planet.ringColor = astroSettings.ringColor;
            planet.ringHighlight = lightenColor(astroSettings.ringColor, 30);
            planet.ringRotation = Math.random() * Math.PI * 2;
            planet.temperature = 2300;
            planet.radius = calculateRadiusForType('brownDwarf', planet.mass);
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
            planet.debrisGeneration = true;
            planet.lastDebrisGeneration = 0;
            planet.debrisCooldown = 2000;
            planet.jetAngle = Math.random() * Math.PI * 2;
            Acount = (Acount || 0) + 1;
            planet.temperature = 50000;
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
        case 'chronosStar':
            planet.mass = Math.max(600000000, customMass || astroSettings.mass * 6000000);
            planet.color = '#87CEEB';
            planet.glowColor = '#00BFFF';
            planet.radius = calculateRadiusForType('chronosStar', planet.mass);
            planet.temperature = 12000;
            planet.timeField = true;
            planet.timeDilation = 2.0;
            break;
        case 'phantomStar':
            planet.mass = Math.max(300000000, customMass || astroSettings.mass * 3000000);
            planet.color = '#DDA0DD';
            planet.glowColor = '#9400D3';
            planet.radius = calculateRadiusForType('phantomStar', planet.mass);
            planet.temperature = 8000;
            planet.phaseShift = true;
            planet.ethereal = true;
            break;
        case 'vortexStar':
            planet.mass = Math.max(800000000, customMass || astroSettings.mass * 8000000);
            planet.color = '#32CD32';
            planet.glowColor = '#008000';
            planet.radius = calculateRadiusForType('vortexStar', planet.mass);
            planet.temperature = 18000;
            planet.vortexLayers = 3;
            planet.dimensionalSpin = true;
            break;
        case 'crystalStar':
            planet.mass = Math.max(500000000, customMass || astroSettings.mass * 5000000);
            planet.color = '#E6E6FA';
            planet.glowColor = '#9370DB';
            planet.radius = calculateRadiusForType('crystalStar', planet.mass);
            planet.temperature = 14000;
            planet.crystalLattice = true;
            planet.refractionIndex = 2.5;
            break;
        case 'neuralStar':
            planet.mass = Math.max(700000000, customMass || astroSettings.mass * 7000000);
            planet.color = '#FF69B4';
            planet.glowColor = '#DC143C';
            planet.radius = calculateRadiusForType('neuralStar', planet.mass);
            planet.temperature = 16000;
            planet.neuralNetwork = true;
            planet.consciousness = true;
            break;
        case 'hologramStar':
            planet.mass = Math.max(400000000, customMass || astroSettings.mass * 4000000);
            planet.color = '#00FFFF';
            planet.glowColor = '#008B8B';
            planet.radius = calculateRadiusForType('hologramStar', planet.mass);
            planet.temperature = 10000;
            planet.holographic = true;
            planet.projections = 3;
            break;
        case 'quantumFoamStar':
            planet.mass = Math.max(1000000000, customMass || astroSettings.mass * 10000000);
            planet.color = '#F0E68C';
            planet.glowColor = '#DAA520';
            planet.radius = calculateRadiusForType('quantumFoamStar', planet.mass);
            planet.temperature = 22000;
            planet.quantumFoam = true;
            planet.vacuumFluctuations = true;
            break;
        case 'prismStar':
            planet.mass = Math.max(600000000, customMass || astroSettings.mass * 6000000);
            planet.color = '#FFD700';
            planet.glowColor = '#FF8C00';
            planet.radius = calculateRadiusForType('prismStar', planet.mass);
            planet.temperature = 13000;
            planet.prismatic = true;
            planet.lightBending = true;
            break;
        case 'echoStar':
            planet.mass = Math.max(750000000, customMass || astroSettings.mass * 7500000);
            planet.color = '#98FB98';
            planet.glowColor = '#006400';
            planet.radius = calculateRadiusForType('echoStar', planet.mass);
            planet.temperature = 15000;
            planet.echoField = true;
            planet.temporalResonance = true;
            break;
        case 'asciiStar':
            planet.mass = Math.max(2000, customMass || 1200);
            planet.color = '#66CCFF';
            planet.glowColor = '#88EEFF';
            planet.radius = calculateRadiusForType('asciiStar', planet.mass);
            planet.temperature = 10000;
            planet.asciiCore = true;
            break;
        case 'jsStar':
            planet.mass = Math.max(2500, customMass || 1400);
            planet.color = '#f0db4f';
            planet.glowColor = '#ffe680';
            planet.radius = calculateRadiusForType('jsStar', planet.mass);
            planet.temperature = 9000;
            planet.isSecretStar = true;
            break;
        case 'pyStar':
            planet.mass = Math.max(2400, customMass || 1300);
            planet.color = '#3572A5';
            planet.glowColor = '#9fd3ff';
            planet.radius = calculateRadiusForType('pyStar', planet.mass);
            planet.temperature = 9200;
            planet.isSecretStar = true;
            break;
        case 'cssStar':
            planet.mass = Math.max(1800, customMass || 1100);
            planet.color = '#2965f1';
            planet.glowColor = '#74a8ff';
            planet.radius = calculateRadiusForType('cssStar', planet.mass);
            planet.temperature = 8000;
            planet.isSecretStar = true;
            break;
        case 'csharpStar':
            planet.mass = Math.max(3000, customMass || 1600);
            planet.color = '#178600';
            planet.glowColor = '#5fe56a';
            planet.radius = calculateRadiusForType('csharpStar', planet.mass);
            planet.temperature = 9800;
            planet.isSecretStar = true;
            break;
        case 'gmlStar':
            planet.mass = Math.max(2000, customMass || 1200);
            planet.color = '#00bcd4';
            planet.glowColor = '#80eaf1';
            planet.radius = calculateRadiusForType('gmlStar', planet.mass);
            planet.temperature = 8600;
            planet.isSecretStar = true;
            break;
        case 'medusaStar':
            planet.mass = Math.max(800000000, customMass || astroSettings.mass * 8000000);
            planet.color = '#00FF00';
            planet.glowColor = '#006400';
            planet.radius = calculateRadiusForType('medusaStar', planet.mass);
            planet.temperature = 18000;
            planet.explosionCooldown = 5000 + Math.random() * 10000;
            planet.explosionActive = false;
            planet.explosionProgress = 0;
            planet.jetAngle = Math.random() * Math.PI * 2;
            planet.petrificationField = true;
            planet.isSecretStar = true;
            Acount = (Acount || 0) + 1;
            setTimeout(() => onMedusaStarCreated(planet), 100);
            const currentMedusaCount = parseInt(localStorage.getItem('medusaStarsCreated') || '0');
            localStorage.setItem('medusaStarsCreated', (currentMedusaCount + 1).toString());
            checkNitricStarUnlock();
            break;
        case 'singularityStar':
            planet.mass = Math.max(5000000000000000000000000000000000000000000000000000000000000000000000000000000000, customMass || astroSettings.mass * 50000000);
            planet.color = '#000000';
            planet.glowColor = '#4B0082';
            planet.radius = calculateRadiusForType('singularityStar', planet.mass);
            planet.temperature = 50000;
            planet.multipleSingularities = true;
            planet.realityDistortion = true;
            break;
        case 'nitricStar':
            planet.mass = Math.max(800000000, customMass || astroSettings.mass * 8000000);
            planet.color = '#FFA500';
            planet.glowColor = '#FFFF00';
            planet.radius = calculateRadiusForType('nitricStar', planet.mass);
            planet.temperature = 20000;
            planet.explosionCooldown = 5000 + Math.random() * 10000;
            planet.explosionActive = false;
            planet.explosionProgress = 0;
            planet.jetAngle = Math.random() * Math.PI * 2;
            planet.depetrificationField = true;
            planet.lastExplosionTime = Date.now();
            planet.isSecretStar = true;
            if (planet.mass < 800000000) {
                planet.mass = 800000000;
            }
            nitricStarsCreated++;
            localStorage.setItem('nitricStarsCreated', nitricStarsCreated.toString());
            Acount = (Acount || 0) + 1;
            setTimeout(() => onNitricStarCreated(planet), 100);
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
function fgpMedusaStarBehavior(deltaTime) {
    const currentTime = Date.now();
    planets.forEach(planet => {
        if (planet.type === 'medusaStar' && !planet.markedForRemoval) {
            if (!planet.lastExplosionTime) {
                planet.lastExplosionTime = currentTime;
                planet.explosionCooldown = planet.explosionCooldown || (8000 + Math.random() * 7000);
            }
            if (!planet.explosionActive && 
                currentTime - planet.lastExplosionTime > planet.explosionCooldown) {
                triggerMedusaExplosion(planet);
            }
            if (planet.explosionActive) {
                const explosionDuration = 5000;
                planet.explosionProgress += deltaTime / explosionDuration;
                if (planet.explosionProgress >= 1) {
                    planet.explosionActive = false;
                    planet.explosionProgress = 0;
                    planet.lastExplosionTime = currentTime;
                    planet.explosionCooldown = 8000 + Math.random() * 7000;
                }
            }
            applyEnhancedMedusaPetrification(planet, deltaTime);
        }
    });
}
function applyEnhancedMedusaPetrification(medusaStar, deltaTime) {
    const petrificationRadius = medusaStar.radius * 8;
    const basePetrificationRate = 0.02;
    planets.forEach(other => {
        if (other === medusaStar || other.markedForRemoval || other.petrified) return;
        if (!canBePetrifiedByMedusa(other)) return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < petrificationRadius) {
            const proximityFactor = 1 - (distance / petrificationRadius);
            const petrificationChance = basePetrificationRate * proximityFactor * (deltaTime / 1000);
            if (Math.random() < petrificationChance) {
                transformToStone(other);
                createMedusaPetrificationEffect(other);
            }
        }
    });
}
function fgpChronosStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'chronosStar' || star.markedForRemoval) return;
        if (!star._chronosNext) star._chronosNext = now + 2000 + Math.random() * 4000;
        if (now >= star._chronosNext) {
            const choices = [-10, -5, -2, 0, 2, 5, 10];
            const choice = choices[Math.floor(Math.random() * choices.length)];
            const factor = choice;
            const duration = 1000 + Math.random() * 3000;
            const radius = star.radius * 8 + 400;
            const colorMap = {
                '-10': '#800080',
                '-5':  '#FF00FF',
                '-2':  '#0000FF',
                '0':   '#00FF00',
                '2':   '#FFFF00',
                '5':   '#FFA500',
                '10':  '#FF0000'
            };
            star._chronosVisualColor = colorMap[String(choice)];
            star._chronosVisualDuration = duration;
            star._chronosVisualUntil = now + duration;
            star._chronosNext = star._chronosVisualUntil + (2000 + Math.random() * 3000);
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius && !p.locked) {
                    p._chronosWarp = { factor, until: now + duration, active: true };
                    if (factor === 0) {
                        p.vx = 0;
                        p.vy = 0;
                    } else {
                        p.vx *= factor;
                        p.vy *= factor;
                    }
                }
            });
        }
    });
    planets.forEach(p => {
        if (p._chronosWarp && p._chronosWarp.active && Date.now() > p._chronosWarp.until) {
            const f = p._chronosWarp.factor || 1;
            if (f !== 0 && isFinite(f)) {
                p.vx /= f;
                p.vy /= f;
            }
            p._chronosWarp = null;
        }
    });
}
function fgpPhantomStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'phantomStar' || star.markedForRemoval) return;
        if (!star._phaseNext) star._phaseNext = now + 5000 + Math.random() * 10000;
        if (!star.phased && now >= star._phaseNext) {
            star.phased = true;
            star._phaseUntil = now + 10000;
        }
        if (star.phased && now >= star._phaseUntil) {
            star.phased = false;
            star._phaseNext = now + 5000 + Math.random() * 10000;
            star._phaseUntil = null;
        }
    });
}
function fgpVortexStarBehavior(deltaTime) {
    const dt = Math.max(1, Math.abs(deltaTime)) / 1000;
    planets.forEach(star => {
        if (star.type !== 'vortexStar' || star.markedForRemoval) return;
        const radius = star.radius * 10 + 600;
        for (let i = 0; i < planets.length; i++) {
            const p = planets[i];
            if (p === star || p.markedForRemoval || p.locked) continue;
            if (p.mass >= star.mass * 0.2) continue;
            const dx = p.x - star.x;
            const dy = p.y - star.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0 && dist < radius) {
                const angle = Math.atan2(dy, dx);
                const perp = angle + Math.PI / 2;
                const desiredSpeed = Math.sqrt(Math.max(1, (G * gravityFactor * star.mass) / dist));
                const desiredVx = Math.cos(perp) * desiredSpeed;
                const desiredVy = Math.sin(perp) * desiredSpeed;
                const steer = 0.02 * dt * 60;
                p.vx += (desiredVx - p.vx) * steer;
                p.vy += (desiredVy - p.vy) * steer;
            }
        }
    });
}
function fgpCrystalStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'crystalStar' || star.markedForRemoval) return;
        if (!star._crystalNext) star._crystalNext = now + 10000 + Math.random() * 10000;
        if (now >= star._crystalNext) {
            star._crystalNext = now + 10000 + Math.random() * 15000;
            const freezeDuration = 5000;
            const radius = star.radius * 6 + 300;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval || p.locked) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    p._crystalFrozenUntil = Date.now() + freezeDuration;
                    p.vx = 0;
                    p.vy = 0;
                }
            });
        }
    });
}
function fgpNeuralStarBehavior(deltaTime) {
    const dt = Math.max(1, Math.abs(deltaTime)) / 1000;
    const shipTypes = ['rocket', 'spaceship', 'superShip', 'satellite'];
    planets.forEach(star => {
        if (star.type !== 'neuralStar' || star.markedForRemoval) return;
        const radius = star.radius * 10 + 600;
        planets.forEach(p => {
            if (!shipTypes.includes(p.type) || p.markedForRemoval) return;
            const dx = star.x - p.x;
            const dy = star.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 0 && dist < radius) {
                const strength = 0.2 * (1 - dist / radius) * dt;
                p.vx += (dx / dist) * strength;
                p.vy += (dy / dist) * strength;
            }
        });
    });
}
function fgpHologramStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'hologramStar' || star.markedForRemoval) return;
        if (!star._holoNext) star._holoNext = now + 10000 + Math.random() * 10000;
        if (now >= star._holoNext) {
            star._holoNext = now + 10000 + Math.random() * 15000;
            const count = 1 + Math.floor(Math.random() * 4);
            const holoTypes = ['spaceDust', 'nebula', 'asteroid', 'planetoid'];
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = star.radius * (1.5 + Math.random() * 6);
                const chosen = holoTypes[Math.floor(Math.random() * holoTypes.length)];
                const hx = star.x + Math.cos(angle) * distance;
                const hy = star.y + Math.sin(angle) * distance;
                const holo = createAstro(chosen, hx, hy, 0, 0, (chosen === 'nebula' ? 0.2 : chosen === 'planetoid' ? 0.3 : 0.01));
                holo.locked = true;
                holo.vx = 0; holo.vy = 0;
                holo.isHologram = true;
                holo.hologramUntil = Date.now() + 8000 + Math.random() * 8000;
            }
        }
    });
    for (let i = planets.length - 1; i >= 0; i--) {
        const p = planets[i];
        if (p.isHologram && p.hologramUntil && Date.now() > p.hologramUntil) {
            planets.splice(i, 1);
        }
    }
}
function fgpQuantumFoamStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'quantumFoamStar' || star.markedForRemoval) return;
        if (!star._foamNext) star._foamNext = now + 3000 + Math.random() * 5000;
        if (now >= star._foamNext) {
            star._foamNext = now + 3000 + Math.random() * 8000;
            const radius = star.radius * 8 + 400;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass <= star.mass * 0.05) {
                    const dx = p.x - star.x;
                    const dy = p.y - star.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < radius) {
                        p.vx += (Math.random() - 0.5) * 2;
                        p.vy += (Math.random() - 0.5) * 2;
                    }
                }
            });
        }
        const ingestRadius = star.radius * 0.9;
        for (let i = planets.length - 1; i >= 0; i--) {
            const p = planets[i];
            if (!p || p === star || p.markedForRemoval || p.locked) continue;
            if (p.mass > star.mass * 0.6) continue;
            const dx = p.x - star.x;
            const dy = p.y - star.y;
            const d = Math.hypot(dx, dy);
            if (d < ingestRadius) {
                p.markedForRemoval = true;
                createMegaDestructionEffect(p);
                const massRatio = p.mass / Math.max(0.001, star.mass);
                let count = Math.max(2, Math.min(18, Math.round(massRatio * 20)));
                if (!isFinite(count) || count < 2) count = 2;
                for (let k = 0; k < count; k++) {
                    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * Math.PI * 0.8;
                    const speed = 2 + Math.random() * 4;
                    const rx = star.x + Math.cos(angle) * (star.radius * 0.6);
                    const ry = star.y + Math.sin(angle) * (star.radius * 0.6);
                    const rvx = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5;
                    const rvy = Math.sin(angle) * speed + (Math.random() - 0.5) * 0.5;
                    const r = createAstro('radiation', rx, ry, rvx, rvy, Math.max(0.002, (p.mass / count)));
                    r.hologramUntil = Date.now() + 2000 + Math.random() * 2000;
                }
                star._quantumEjecting = true;
                star._quantumEjectUntil = Date.now() + 1200 + Math.random() * 800;
                star._quantumJetAngles = [Math.atan2(dy, dx) + Math.PI/2, Math.atan2(dy, dx) - Math.PI/2];
            }
        }
    });
}
function fgpPrismStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'prismStar' || star.markedForRemoval) return;
        if (!star._prismNext) star._prismNext = now + 5000 + Math.random() * 10000;
        if (now >= star._prismNext) {
            star._prismNext = now + 5000 + Math.random() * 10000;
            const count = 6 + Math.floor(Math.random() * 8);
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
                const distance = star.radius * (1 + Math.random() * 6);
                const speed = 0;
                const p = createAstro('nebula', star.x + Math.cos(angle) * distance, star.y + Math.sin(angle) * distance, 0, 0, 0.5);
                p.color = `hsl(${Math.floor(Math.random() * 360)}, 80%, 55%)`;
                p.locked = true;
                p.vx = 0; p.vy = 0;
                p.hologramUntil = Date.now() + 12000 + Math.random() * 8000;
                p.isPrismParticle = true;
            }
        }
    });
    for (let i = planets.length - 1; i >= 0; i--) {
        const p = planets[i];
        if ((p.isPrismParticle || p.hologramUntil) && p.hologramUntil && Date.now() > p.hologramUntil) {
            planets.splice(i, 1);
        }
    }
}
function fgpEchoStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'echoStar' || star.markedForRemoval) return;
        if (!star._echoNext) star._echoNext = now + 10000 + Math.random() * 20000;
        if (now >= star._echoNext) {
            star._echoNext = now + 10000 + Math.random() * 20000;
            const radius = star.radius * 10;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    const protectedTypes = ['medusaStar','nitricStar','blackHole','quasar','singularityStar','star'];
                    if (!protectedTypes.includes(p.type) && !p.locked) {
                        if (p.mass < star.mass * 0.15) {
                            p.markedForRemoval = true;
                            createMegaDestructionEffect(p);
                        }
                    }
                }
            });
        }
    });
}
function fgpAsciiStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'asciiStar' || star.markedForRemoval) return;
        if (!star._asciiNext) star._asciiNext = now + 4000 + Math.random() * 6000;
        if (now >= star._asciiNext) {
            star._asciiNext = now + 4000 + Math.random() * 8000;
            const radius = star.radius * 8 + 200;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval || p.locked) return;
                if (p.mass > star.mass * 0.2) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    const push = 0.5 + Math.random() * 1.2;
                    const nx = dx / Math.max(0.001, dist);
                    const ny = dy / Math.max(0.001, dist);
                    p.vx += nx * push;
                    p.vy += ny * push;
                    p._asciiFlicker = Date.now() + 600;
                }
            });
        }
    });
}
function fgpJsStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'jsStar' || star.markedForRemoval) return;
        if (!star._jsNext) star._jsNext = now + 2000 + Math.random() * 3000;
        if (now >= star._jsNext) {
            star._jsNext = now + 2000 + Math.random() * 4000;
            const radius = star.radius * 8 + 200;
            star._jsSpark = Date.now() + 800;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval || p.locked) return;
                if (p.mass > star.mass * 0.3) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    const jitter = 2 + Math.random() * 3;
                    p.vx += (Math.random() - 0.5) * jitter;
                    p.vy += (Math.random() - 0.5) * jitter;
                    p._jsAffected = Date.now() + 1000;
                }
            });
            if (Math.random() < 0.4) {
                const matterCount = 2 + Math.floor(Math.random() * 3);
                for (let i = 0; i < matterCount; i++) {
                    createExpelledMatter('spaceDust', 
                        star.x + (Math.random()-0.5)*20, 
                        star.y + (Math.random()-0.5)*20, 
                        0.02, 0.3
                    );
                }
            }
        }
        if (star._jsSpark && now > star._jsSpark) {
            star._jsSpark = null;
        }
    });
}
function fgpPyStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'pyStar' || star.markedForRemoval) return;
        if (!star._pyNext) star._pyNext = now + 3000 + Math.random() * 3000;
        if (now >= star._pyNext) {
            star._pyNext = now + 3000 + Math.random() * 5000;
            const radius = star.radius * 7 + 180;
            star._pyCalm = Date.now() + 1200;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval || p.locked) return;
                if (p.mass > star.mass * 0.4) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    p.vx *= 0.7;
                    p.vy *= 0.7;
                    const pull = 0.3 * (1 - dist / radius);
                    p.vx -= (dx / Math.max(dist, 0.001)) * pull;
                    p.vy -= (dy / Math.max(dist, 0.001)) * pull;
                    p._pyOrganized = Date.now() + 1500;
                }
            });
        }
        if (star._pyCalm && now > star._pyCalm) {
            star._pyCalm = null;
        }
    });
}
function fgpCssStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'cssStar' || star.markedForRemoval) return;
        if (!star._cssNext) star._cssNext = now + 2500 + Math.random() * 3500;
        if (now >= star._cssNext) {
            star._cssNext = now + 2500 + Math.random() * 4500;
            const radius = star.radius * 7 + 200;
            const styleEffects = [
                { color: '#FFB6C1', glow: '#FF69B4' },
                { color: '#87CEFA', glow: '#1E90FF' },
                { color: '#98FB98', glow: '#32CD32' },
                { color: '#DDA0DD', glow: '#BA55D3' }
            ];
            const randomEffect = styleEffects[Math.floor(Math.random() * styleEffects.length)];
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    p._cssTint = { 
                        until: Date.now() + 1200, 
                        color: randomEffect.color,
                        glow: randomEffect.glow
                    };
                    p._styled = Date.now() + 1000;
                }
            });
        }
    });
}
function fgpCsharpStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'csharpStar' || star.markedForRemoval) return;
        if (!star._csharpNext) star._csharpNext = now + 4000 + Math.random() * 3000;
        if (now >= star._csharpNext) {
            star._csharpNext = now + 4000 + Math.random() * 6000;
            const radius = star.radius * 6 + 150;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (['medusaStar','nitricStar','blackHole','quasar','singularityStar'].includes(p.type)) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius && !p._csharpLocked) {
                    p._csharpLocked = true;
                    p._csharpUnlock = Date.now() + 2000 + Math.random() * 2000;
                    p.originalVx = p.vx;
                    p.originalVy = p.vy;
                    p.vx = 0;
                    p.vy = 0;
                    p._lockedEffect = Date.now() + 500;
                }
                if (p._csharpLocked && p._csharpUnlock && Date.now() >= p._csharpUnlock) {
                    p._csharpLocked = false;
                    p.vx = p.originalVx || 0;
                    p.vy = p.originalVy || 0;
                    p._csharpUnlock = null;
                    p._unlockedEffect = Date.now() + 500;
                }
            });
        }
    });
}
function fgpGmlStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'gmlStar' || star.markedForRemoval) return;
        if (!star._gmlNext) star._gmlNext = now + 3500 + Math.random() * 3000;
        if (now >= star._gmlNext) {
            star._gmlNext = now + 3500 + Math.random() * 5000;
            const radius = star.radius * 7 + 160;
            star._gmlCreating = Date.now() + 1000;
            if (Math.random() < 0.8) {
                const count = 2 + Math.floor(Math.random() * 4);
                for (let i = 0; i < count; i++) {
                    createExpelledMatter('meteoroid', 
                        star.x + (Math.random()-0.5)*star.radius, 
                        star.y + (Math.random()-0.5)*star.radius, 
                        0.15, 8
                    );
                }
            }
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius && p.mass < star.mass * 0.35) {
                    const kick = 1.5 + Math.random() * 3;
                    const angle = Math.atan2(dy, dx);
                    const spread = (Math.random() - 0.5) * Math.PI / 4;
                    p.vx += Math.cos(angle + spread) * kick;
                    p.vy += Math.sin(angle + spread) * kick;
                    p._gmlKicked = Date.now() + 800;
                }
            });
        }
        if (star._gmlCreating && now > star._gmlCreating) {
            star._gmlCreating = null;
        }
    });
}
function fgpJavaStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'javaStar' || star.markedForRemoval) return;
        if (!star._javaNext) star._javaNext = now + 3000 + Math.random() * 3000;
        if (now >= star._javaNext) {
            star._javaNext = now + 3000 + Math.random() * 5000;
            const radius = star.radius * 7 + 180;
            star._javaPulse = Date.now() + 1000;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval || p.locked) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < radius) {
                    p.vx *= 0.6;
                    p.vy *= 0.6;
                    p._javaStabilized = Date.now() + 1200;
                }
            });
        }
        if (star._javaPulse && now > star._javaPulse) star._javaPulse = null;
    });
}
function fgpPhpStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'phpStar' || star.markedForRemoval) return;
        if (!star._phpNext) star._phpNext = now + 2200 + Math.random() * 3000;
        if (now >= star._phpNext) {
            star._phpNext = now + 2200 + Math.random() * 5000;
            star._phpFlicker = Date.now() + 800;
            if (Math.random() < 0.6) {
                const count = 1 + Math.floor(Math.random() * 3);
                for (let i = 0; i < count; i++) {
                    createExpelledMatter('spaceDust', star.x + (Math.random()-0.5)*star.radius, star.y + (Math.random()-0.5)*star.radius, 0.02, 0.5);
                }
            }
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6 && p.mass < star.mass * 0.3) {
                    p.vx += (Math.random() - 0.5) * 1.5;
                    p.vy += (Math.random() - 0.5) * 1.5;
                    p._phpTouched = Date.now() + 600;
                }
            });
        }
        if (star._phpFlicker && now > star._phpFlicker) star._phpFlicker = null;
    });
}
function fgpRustStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'rustStar' || star.markedForRemoval) return;
        if (!star._rustNext) star._rustNext = now + 2800 + Math.random() * 3200;
        if (now >= star._rustNext) {
            star._rustNext = now + 2800 + Math.random() * 6000;
            star._rustSpark = Date.now() + 700;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval || p.locked) return;
                if (p.mass > star.mass * 0.25) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    const angle = Math.atan2(dy, dx);
                    const push = 1 + Math.random() * 2;
                    p.vx += Math.cos(angle) * push;
                    p.vy += Math.sin(angle) * push;
                    p._rustStamped = Date.now() + 800;
                }
            });
        }
        if (star._rustSpark && now > star._rustSpark) star._rustSpark = null;
    });
}
function fgpGoStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'goStar' || star.markedForRemoval) return;
        if (!star._goNext) star._goNext = now + 1800 + Math.random() * 2000;
        if (now >= star._goNext) {
            star._goNext = now + 1800 + Math.random() * 4000;
            star._goBurst = Date.now() + 600;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.3) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    p.vx += (Math.random() - 0.5) * 3;
                    p.vy += (Math.random() - 0.5) * 3;
                    p._goShaken = Date.now() + 700;
                }
            });
        }
        if (star._goBurst && now > star._goBurst) star._goBurst = null;
    });
}
function fgpKotlinStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'kotlinStar' || star.markedForRemoval) return;
        if (!star._kotlinNext) star._kotlinNext = now + 2600 + Math.random() * 3000;
        if (now >= star._kotlinNext) {
            star._kotlinNext = now + 2600 + Math.random() * 5000;
            star._kotlinPulse = Date.now() + 900;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    p.vx += (Math.random() - 0.5) * 1.8;
                    p.vy += (Math.random() - 0.5) * 1.8;
                    p._kotlinTouched = Date.now() + 700;
                }
            });
        }
        if (star._kotlinPulse && now > star._kotlinPulse) star._kotlinPulse = null;
    });
}
function fgpSwiftStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'swiftStar' || star.markedForRemoval) return;
        if (!star._swiftNext) star._swiftNext = now + 2000 + Math.random() * 3000;
        if (now >= star._swiftNext) {
            star._swiftNext = now + 2000 + Math.random() * 4000;
            star._swiftFlash = Date.now() + 600;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.3) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 5.5) {
                    const kick = 2 + Math.random() * 2;
                    const angle = Math.atan2(dy, dx);
                    p.vx += Math.cos(angle) * kick;
                    p.vy += Math.sin(angle) * kick;
                    p._swiftShaken = Date.now() + 600;
                }
            });
        }
        if (star._swiftFlash && now > star._swiftFlash) star._swiftFlash = null;
    });
}
function fgpTsStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'tsStar' || star.markedForRemoval) return;
        if (!star._tsNext) star._tsNext = now + 2400 + Math.random() * 3200;
        if (now >= star._tsNext) {
            star._tsNext = now + 2400 + Math.random() * 5200;
            star._tsPulse = Date.now() + 800;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    p.vx *= 0.8;
                    p.vy *= 0.8;
                    p._tsCalmed = Date.now() + 900;
                }
            });
        }
        if (star._tsPulse && now > star._tsPulse) star._tsPulse = null;
    });
}
function fgpLuaStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'luaStar' || star.markedForRemoval) return;
        if (!star._luaNext) star._luaNext = now + 3000 + Math.random() * 3000;
        if (now >= star._luaNext) {
            star._luaNext = now + 3000 + Math.random() * 5000;
            star._luaSwirl = Date.now() + 1000;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 5.5) {
                    const angle = Math.atan2(dy, dx);
                    const push = 1 + Math.random() * 1.5;
                    p.vx += Math.cos(angle + 0.3) * push;
                    p.vy += Math.sin(angle + 0.3) * push;
                    p._luaSpun = Date.now() + 700;
                }
            });
        }
        if (star._luaSwirl && now > star._luaSwirl) star._luaSwirl = null;
    });
}
function fgpRubyStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'rubyStar' || star.markedForRemoval) return;
        if (!star._rubyNext) star._rubyNext = now + 2600 + Math.random() * 3400;
        if (now >= star._rubyNext) {
            star._rubyNext = now + 2600 + Math.random() * 5400;
            star._rubyGlow = Date.now() + 900;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    p.vx += (Math.random() - 0.5) * 2.2;
                    p.vy += (Math.random() - 0.5) * 2.2;
                    p._rubyTouched = Date.now() + 800;
                }
            });
        }
        if (star._rubyGlow && now > star._rubyGlow) star._rubyGlow = null;
    });
}
function fgpDartStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'dartStar' || star.markedForRemoval) return;
        if (!star._dartNext) star._dartNext = now + 1800 + Math.random() * 2600;
        if (now >= star._dartNext) {
            star._dartNext = now + 1800 + Math.random() * 4600;
            star._dartBurst = Date.now() + 600;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.3) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 5) {
                    p.vx += (Math.random() - 0.5) * 3.5;
                    p.vy += (Math.random() - 0.5) * 3.5;
                    p._dartShaken = Date.now() + 700;
                }
            });
        }
        if (star._dartBurst && now > star._dartBurst) star._dartBurst = null;
    });
}
function fgpHtmlStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'htmlStar' || star.markedForRemoval) return;
        if (!star._htmlNext) star._htmlNext = now + 2200 + Math.random() * 3000;
        if (now >= star._htmlNext) {
            star._htmlNext = now + 2200 + Math.random() * 5200;
            star._htmlPulse = Date.now() + 800;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    p.vx += (Math.random() - 0.5) * 1.6;
                    p.vy += (Math.random() - 0.5) * 1.6;
                    p._htmlTouched = Date.now() + 700;
                }
            });
        }
        if (star._htmlPulse && now > star._htmlPulse) star._htmlPulse = null;
    });
}
function fgpJsonStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'jsonStar' || star.markedForRemoval) return;
        if (!star._jsonNext) star._jsonNext = now + 2600 + Math.random() * 3000;
        if (now >= star._jsonNext) {
            star._jsonNext = now + 2600 + Math.random() * 5000;
            star._jsonPulse = Date.now() + 900;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.33) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 5.5) {
                    p.vx *= 0.9;
                    p.vy *= 0.9;
                    p._jsonCalmed = Date.now() + 800;
                }
            });
        }
        if (star._jsonPulse && now > star._jsonPulse) star._jsonPulse = null;
    });
}
function fgpAssemblyStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'assemblyStar' || star.markedForRemoval) return;
        if (!star._assemblyNext) star._assemblyNext = now + 1800 + Math.random() * 2600;
        if (now >= star._assemblyNext) {
            star._assemblyNext = now + 1800 + Math.random() * 4600;
            star._assemblyBurst = Date.now() + 600;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.3) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 5) {
                    p.vx += (Math.random() - 0.5) * 3.2;
                    p.vy += (Math.random() - 0.5) * 3.2;
                    p._assemblyShaken = Date.now() + 700;
                }
            });
        }
        if (star._assemblyBurst && now > star._assemblyBurst) star._assemblyBurst = null;
    });
}
function fgpSqlStarBehavior(deltaTime) {
    const now = Date.now();
    planets.forEach(star => {
        if (star.type !== 'sqlStar' || star.markedForRemoval) return;
        if (!star._sqlNext) star._sqlNext = now + 2400 + Math.random() * 3200;
        if (now >= star._sqlNext) {
            star._sqlNext = now + 2400 + Math.random() * 5200;
            star._sqlPulse = Date.now() + 900;
            planets.forEach(p => {
                if (p === star || p.markedForRemoval) return;
                if (p.mass > star.mass * 0.35) return;
                const dx = p.x - star.x;
                const dy = p.y - star.y;
                const dist = Math.hypot(dx, dy);
                if (dist < star.radius * 6) {
                    const angle = Math.atan2(dy, dx);
                    const ringIndex = Math.floor((angle + Math.PI) / (Math.PI / 4));
                    const targetAngle = ringIndex * (Math.PI / 4) - Math.PI + (Math.random() - 0.5) * 0.2;
                    const targetRadius = star.radius * (1.2 + (ringIndex % 4) * 0.2);
                    const tx = Math.cos(targetAngle) * targetRadius + star.x;
                    const ty = Math.sin(targetAngle) * targetRadius + star.y;
                    p.vx += (tx - p.x) * 0.001 + (Math.random() - 0.5) * 0.6;
                    p.vy += (ty - p.y) * 0.001 + (Math.random() - 0.5) * 0.6;
                    p._sqlTouched = Date.now() + 800;
                }
            });
        }
        if (star._sqlPulse && now > star._sqlPulse) star._sqlPulse = null;
    });
}
function canBePetrifiedByMedusa(obj) {
    if (!obj || obj.markedForRemoval || obj.petrified) return false;
    const protectedTypes = ['medusaStar', 'blackHole', 'quasar', 'whiteHole', 'wormhole'];
    if (protectedTypes.includes(obj.type)) return false;
    return true;
}
function applyContinuousMedusaPetrification(medusaStar) {
    const petrificationRadius = medusaStar.radius * 6;
    planets.forEach(other => {
        if (other === medusaStar || other.markedForRemoval || other.petrified) return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < petrificationRadius) {
            const petrificationChance = 1 - (distance / petrificationRadius);
            if (Math.random() < petrificationChance * 0.12) {
                petrifyAstro(other);
            }
        }
    });
}
function applyPetrificationEffect(medusaStar) {
    const petrificationRadius = medusaStar.radius * 8;
    planets.forEach(other => {
        if (other === medusaStar) return;
        const dx = other.x - medusaStar.x;
        const dy = other.y - medusaStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < petrificationRadius) {
            const strongChance = 1 - (distance / petrificationRadius);
            if (Math.random() < strongChance * 0.9) {
                petrifyAstro(other);
                createTransformationEffect(other);
            }
        }
    });
}
function createTransformationEffect(astro) {
    for (let i = 0; i < 10; i++) {
        const particle = {
            x: astro.x,
            y: astro.y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            maxLife: 1,
            color: '#00FF00',
            size: astro.radius * 0.3
        };
    }
}
function petrifyAstro(obj) {
    if (!obj || obj.markedForRemoval || obj.petrified) return;
    if (obj.type === 'medusaStar') return;
    obj.originalType = obj.originalType || obj.type;
    obj.originalColor = obj.originalColor || obj.color;
    obj.originalGlowColor = obj.originalGlowColor || obj.glowColor;
    obj.originalLocked = obj.originalLocked === undefined ? !!obj.locked : obj.originalLocked;
    obj.originalVx = obj.originalVx === undefined ? obj.vx : obj.originalVx;
    obj.originalVy = obj.originalVy === undefined ? obj.vy : obj.originalVy;
    obj.petrified = true;
    obj.petrificationTime = Date.now();
    obj.color = '#7f8c8d';
    obj.glowColor = '#4a4a4a';
    try {
        obj.vx = 0; obj.vy = 0; obj.locked = true;
    } catch (e) { }
}
function playNitricExplosionSound() {
    try {
        playRandomCollisionSound();
    }   catch (error){
        console.log('Audio context not supported, playing fallback sound');
        playRandomCollisionSound();
    }
}
function triggerNitricExplosion(nitricStar) {
    if (!nitricStar || nitricStar.markedForRemoval) return;
    nitricStar.explosionActive = true;
    nitricStar.explosionProgress = 0;
    nitricStar.jetsVisible = true;
    applyNitricExplosionEffects(nitricStar);
    playNitricExplosionSound();
    console.log(`💥 Nitric Star mega explosion at (${nitricStar.x.toFixed(2)}, ${nitricStar.y.toFixed(2)})`);
}
function applyNitricExplosionEffects(nitricStar) {
    const explosionRadius = nitricStar.radius * 12;
    let destroyedCount = 0;
    let depetrifiedCount = 0;
    planets.forEach(other => {
        if (other === nitricStar || other.markedForRemoval) return;
        const dx = other.x - nitricStar.x;
        const dy = other.y - nitricStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < explosionRadius) {
            if (other.petrified && distance < explosionRadius * 0.7) {
                depetrifyAstro(other);
                depetrifiedCount++;
            }
            if (canBeDestroyedByNitricExplosion(other, nitricStar)) {
                const destructionChance = 1 - (distance / explosionRadius);
                if (Math.random() < destructionChance * 0.8) {
                    other.markedForRemoval = true;
                    destroyedCount++;
                    createMegaDestructionEffect(other);
                }
            }
            const force = (1 - (distance / explosionRadius)) * 50;
            const angle = Math.atan2(dy, dx);
            other.vx += Math.cos(angle) * force;
            other.vy += Math.sin(angle) * force;
        }
    });
    if (destroyedCount > 0 || depetrifiedCount > 0) {
        console.log(`💥 Nitric Star MEGA explosion: ${destroyedCount} vaporized, ${depetrifiedCount} depetrified`);
    }
}
function createMegaDestructionEffect(obj) {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = 5 + Math.random() * 3;
        const life = 2 + Math.random() * 2;
        const size = obj.radius * 0.3 * (0.5 + Math.random());
        const colorVariation = Math.random();
        let particleColor;
        if (colorVariation < 0.33) {
            particleColor = `rgba(255, 255, 0, 0.9)`;
        } else if (colorVariation < 0.66) {
            particleColor = `rgba(255, 165, 0, 0.8)`;
        } else {
            particleColor = `rgba(255, 69, 0, 0.7)`;
        }
        const particle = {
            x: obj.x,
            y: obj.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: life,
            maxLife: life,
            color: particleColor,
            size: size,
            type: 'nitric_destruction'
        };
    }
    createShockwaveEffect(obj.x, obj.y, obj.radius * 2);
}
function createShockwaveEffect(x, y, radius) {
    console.log(`Shockwave at (${x}, ${y}) with radius ${radius}`);
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const shockParticle = {
            x: x,
            y: y,
            vx: Math.cos(angle) * 8,
            vy: Math.sin(angle) * 8,
            life: 1,
            maxLife: 1.5,
            color: 'rgba(255, 255, 0, 0.7)',
            size: radius * 0.1,
            type: 'shockwave'
        };
    }
}
function canBeDestroyedByNitricStar(obj) {
    const protectedTypes = [
        'medusaStar', 'nitricStar', 'blackHole', 'quasar', 
        'singularityStar', 'star', 'redGiant', 'redSupergiant',
        'hypergiant', 'massiveStar', 'supermassiveStar'
    ];
    return !protectedTypes.includes(obj.type) && !obj.locked;
}
function canBeDestroyedByNitricExplosion(obj, nitricStar) {
    if (!obj || obj.markedForRemoval) return false;
    if (obj === nitricStar) return false;
    if (obj.locked) return false;
    const protectedTypes = [
        'medusaStar', 'nitricStar', 'blackHole', 'quasar', 
        'singularityStar', 'star', 'redGiant', 'redSupergiant',
        'hypergiant', 'massiveStar', 'supermassiveStar',
        'whiteHole', 'wormhole', 'pulsar', 'neutronStar',
        'quarkStar', 'magnetar', 'brownDwarf', 'redDwarf'
    ];
    if (protectedTypes.includes(obj.type)) return false;
    const massRatio = obj.mass / nitricStar.mass;
    const canDestroyByMass = massRatio < 0.1;
    const isSpecialObject = obj.isSecretStar || obj.ignoreDestruction;
    return canDestroyByMass && !isSpecialObject;
}
function createMegaDestructionEffect(obj) {
    for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI * 2;
        const speed = 5 + Math.random() * 3;
        const particle = {
            x: obj.x,
            y: obj.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            maxLife: 3,
            color: `rgba(255, ${Math.floor(100 + Math.random() * 155)}, 0, 0.8)`,
            size: obj.radius * 0.3,
            type: 'mega_destruction'
        };
    }
}
function applyNitricDepetrification(nitricStar) {
    const depetrificationRadius = nitricStar.radius * 6;
    planets.forEach(other => {
        if (other === nitricStar || other.markedForRemoval || !other.petrified) return;
        const dx = other.x - nitricStar.x;
        const dy = other.y - nitricStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < depetrificationRadius) {
            const depetrificationChance = 1 - (distance / depetrificationRadius);
            if (Math.random() < depetrificationChance * 0.1) {
                depetrifyAstro(other);
            }
        }
    });
}
function checkCollision(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (obj1.radius + obj2.radius) * 0.8;
}
function depetrifyAstro(obj) {
    if (!obj || !obj.petrified) return;
    console.log(`🧪 Nitric depetrifying: ${obj.originalType} (restoring original colors)`);
    obj.petrified = false;
    if (obj.originalType) {
        try { obj.type = obj.originalType; } catch (e) {}
    }
    obj.color = obj.originalColor || obj.originalVisualColor || obj.color;
    obj.glowColor = obj.originalGlowColor || obj.glowColor;
    if (obj.originalVx !== undefined) obj.vx = obj.originalVx;
    if (obj.originalVy !== undefined) obj.vy = obj.originalVy;
    if (obj.originalLocked !== undefined) obj.locked = obj.originalLocked;
    createDepetrificationEffect(obj);
}
function createDepetrificationEffect(obj) {
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = obj.radius * 1.5;
        const particle = {
            x: obj.x + Math.cos(angle) * distance,
            y: obj.y + Math.sin(angle) * distance,
            vx: Math.cos(angle) * 2,
            vy: Math.sin(angle) * 2,
            life: 1,
            maxLife: 1.5,
            color: '#FFFF00',
            size: obj.radius * 0.3,
            type: 'depetrification'
        };
    }
}
function initializePlanetLifeProperties(planet) {
    planet.lifeChance = 0;
    planet.biomass = 0;
    planet.population = 0;
    planet.evolutionTime = 0;
    planet.intelligentSpecies = null;
    planet.knowledgePoints = 0;
    if (planet.type === 'rockyPlanet') {
        planet.lifeChance = calculateLifeChance(planet);
    }
}
function calculateLifeChance(planet) {
    if (planet.type !== 'rockyPlanet') return 0;
    let chance = 0;
    if (planet.temperature >= 18 && planet.temperature <= 32) { 
        chance += 0.3;
    } else if (planet.temperature >= 15 && planet.temperature <= 35) {
        chance += 0.1;
    } else if (planet.temperature >= 10 && planet.temperature <= 40) {
        chance += 0.05; 
    }
    if (planet.waterValue >= 50 && planet.waterValue <= 80) { 
        chance += 0.3;
    } else if (planet.waterValue >= 40 && planet.waterValue <= 85) {
        chance += 0.15; 
    }
    if (planet.gasValue >= 40 && planet.gasValue <= 70) { 
        chance += 0.2;
    } else if (planet.gasValue >= 30 && planet.gasValue <= 75) {
        chance += 0.1; 
    }
    if (planet.cloudsValue >= 25 && planet.cloudsValue <= 65) { 
        chance += 0.2;
    } else if (planet.cloudsValue >= 20 && planet.cloudsValue <= 70) {
        chance += 0.1; 
    }
    if (planet.temperature < -15 || planet.temperature > 75) {
        chance *= 0.1; 
    }
    if (planet.waterValue < 15 || planet.gasValue < 15) {
        chance *= 0.1; 
    }
    if (planet.temperature > 100 || planet.temperature < -50) {
        chance = 0;
    }
    return Math.min(1, Math.max(0, chance));
}
const originalCreateAstro = createAstro;
createAstro = function(type, x, y, vx = 0, vy = 0, customMass = null) {
    const planet = originalCreateAstro(type, x, y, vx, vy, customMass);
    initializePlanetLifeProperties(planet);
    planet.lifeChance = calculateLifeChance(planet);
    return planet;
};
function fgpPlanetLifeChance(planet) {
    planet.lifeChance = calculateLifeChance(planet);
}
const originalGameLoop = gameLoop;
gameLoop = function(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    originalGameLoop(timestamp);
    if (gameState === 'playing') {
        planets.forEach(planet => {
            if (planet.type === 'rockyPlanet') {
                fgpPlanetLifeChance(planet);
            }
        });
    }
    lastTime = timestamp;
};
const originalOpenEditPanel = openEditPanel;
openEditPanel = function(planet) {
    originalOpenEditPanel(planet);
    if (planet.type === 'rockyPlanet') {
        document.getElementById('editLifeChance').value = Math.round((planet.lifeChance || 0) * 100) + '%';
        document.getElementById('editBiomass').value = planet.biomass || 0;
        document.getElementById('editPopulation').value = planet.population || 0;
        if (planet.intelligentSpecies) {
            document.getElementById('editSpeciesName').value = planet.intelligentSpecies.name || 'none';
            document.getElementById('editKnowledge').value = planet.intelligentSpecies.knowledge || 0;
            document.getElementById('editCivilizationStage').value = planet.intelligentSpecies.stage || 0;
        }
    }
};
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
        'redSupergiant': 'Red Supergigant',
        'satellite':'satellite',
        'rocket':'rocket',
        'spaceship':'spaceship',
        'superShip':'Super Ship',
        'redHypergiant' : 'Ultranuclestar',
        'medusaStar': 'Medusa Star',
        'nitricStar': 'Nitric Acid Star',
        'chronosStar':'Chronos Star',
        'phantomStar': 'Phantom Star',
        'vortexStar': 'Vortex Star',
        'crystalStar':'Crystal Star',
        'neuralStar':'Neural Star',
        'hologramStar':'Hologram Star',
        'quantumFoamStar':'Quantum Foam Star',
        'prismStar':'Prism Star',
        'echoStar':'Echo Star',
        'asciiStar':'ASCII Star',
        'jsStar':'JS Star',
        'pyStar':'Py Star',
        'cssStar':'CSS Star',
        'csharpStar':'C# Star',
        'gmlStar':'GML Star',
        'javaStar':'Java Star',
        'phpStar':'PHP Star',
        'rustStar':'Rust Star',
        'goStar':'Go Star',
        'kotlinStar':'Kotlin Star',
        'swiftStar':'Swift Star',
        'tsStar':'TypeScript Star',
        'luaStar':'Lua Star',
        'rubyStar':'Ruby Star',
        'dartStar':'Dart Star',
        'htmlStar':'HTML Star',
        'jsonStar':'JSON Star',
        'assemblyStar':'Assembly Star',
        'singularityStar':'Singularity'
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
function createPlanet(astroType, x, y, mass, color) {
    const planet = {
        id: Math.random().toString(36).substr(2, 9),
        type: astroType,
        x,
        y,
        mass,
        color: color || getDefaultColor(type),
        radius: calculateRadiusForType(type, mass),
        continents: [],
    };
    if (['rockyPlanet', 'planetoid'].includes(astroType)) {
        planet.continents = generateContinents(3);
    }
    planets.push(planet);
    return planet;
}
function fgpLifeEvolution(planet) {
    if (planet.type !== 'rockyPlanet') return;
    let growthRate = 0;
    if (planet.lifeChance >= 0.8) {
        growthRate = (planet.lifeChance / 100) * 1.5;
        if (planet.biomass > 70) {
            growthRate *= 2;
        }
        if (planet.lifeChance >= 0.6) {
            growthRate = Math.max(growthRate, 0.02);
        }
    }
    if (growthRate > 0) {
        planet.biomass = Math.min(100, planet.biomass + growthRate);
    }
    if (planet.biomass >= 100 && !planet.hasIntelligentLife) {
        if (Math.random() < 0.5) {
            planet.hasIntelligentLife = true;
            planet.population = 0.1;
            planet.knowledgePoints = 1;
            planet.affectionColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        }
    }
    if (planet.hasIntelligentLife) {
        if (planet.population < 1000) {
            planet.population = Math.min(1000, planet.population + 1);
        }
        const baseKnowledgeGrowth = 0.0002;
        const stabilityBonus = planet.biomass > 80 ? 0.3 : 0;
        planet.knowledgePoints += baseKnowledgeGrowth + stabilityBonus;
        if (planet.knowledgePoints > 100) {
            planet.knowledgePoints *= 1.005;
        }
        handleKnowledgeMilestones(planet);
    }
}
function startPlanetSatelliteSpawner(planet) {
    if (planet._satelliteSpawnerActive) return;
    if (planet.markedForRemoval || !planet.hasIntelligentLife) {
        return;
    }
    planet._satelliteSpawnerActive = true;
    planet._stopSatelliteSpawner = false;
    function spawnNext() {
        if (planet._stopSatelliteSpawner || 
            planet.markedForRemoval || 
            !planetExists(planet) ||
            !planet.hasIntelligentLife || 
            planet.lifeChance === 0 || 
            planet.population < 100) {
            console.log(`🛑 STOPPING satellite spawner for planet: ${planet.name}`);
            planet._satelliteSpawnerActive = false;
            return;
        }
        createSatellites(planet, 1);
        const nextTime = 1000 + Math.random() * 9000;
        planet._satelliteSpawnerTimeout = setTimeout(spawnNext, nextTime);
    }
    spawnNext();
}
function planetExists(planet) {
    return planets.includes(planet) && !planet.markedForRemoval;
}
function initializeMissingPlanetProperties(planet) {
    const defaultProperties = {
        satellites: [],
        rockets: [],
        spaceships: [],
        superShips: [],
        intelligentSpecies: [],
        biomass: 0,
        population: 0,
        knowledgePoints: 0,
        lifeChance: 0,
        waterValue: 0,
        cloudsValue: 0,
        gasValue: 0,
        ignoreColorChanges: false,
        locked: false
    };
    for (const [key, value] of Object.entries(defaultProperties)) {
        if (typeof planet[key] === 'undefined') {
            planet[key] = value;
        }
    }
    return planet;
}
function safeLoadSave(saveData) {
    if (saveData.planets) {
        saveData.planets = saveData.planets.map(initializeMissingPlanetProperties);
    }
    loadUniverseData(saveData);
}
function handleKnowledgeMilestones(planet) {
    if (!planet.hasIntelligentLife || planet.lifeChance === 0) {
        return;
    }
    if (!planet || !planet.intelligentSpecies) {
        return;
    }
    if (!Array.isArray(planet.intelligentSpecies)) {
        planet.intelligentSpecies = [planet.intelligentSpecies];
    }
    const speciesCount = planet.intelligentSpecies.length;
    if (planet.knowledgePoints >= 1000 && speciesCount > 0) {
    }
    if (planet.biomass < 50 || planet.population < 100) {
        return;
    }
    if (planet.knowledgePoints >= 100 && planet.satellites.length === 0) {
        startPlanetSatelliteSpawner(planet);
        unlockAchievement(51)
    }
    if (planet.knowledgePoints >= 400 && planet.rockets.length === 0) {
        createRockets(planet, 2);
        unlockAchievement(52)
    }
    if (planet.knowledgePoints >= 25000) {
        if (Math.random() < 0.001) {
            createSpaceship(planet, 1);
            unlockAchievement(53)
        }
    }
    if (planet.knowledgePoints >= 95000) {
        if (Math.random() < 0.001) {
            createSpaceship(planet, 2);
        }
    }
    if (planet.knowledgePoints >= 100000) {
        if (Math.random() < 0.001) {
            createSpaceship(planet, 3);
        }
    }
    if (planet.knowledgePoints >= 500000) {
        if (Math.random() < 0.001) {
            createSpaceship(planet, 4);
        }
    }
    if (planet.knowledgePoints >= 900000) {
        if (Math.random() < 0.0005) {
            createSpaceship(planet, 5);
        }
    }
    if (planet.knowledgePoints >= 250000) {
        if (Math.random() < 0.001) {
            createSuperShip(planet);
            unlockAchievement(54);
        }
    }
    if (planet.knowledgePoints >= 1000000) {
            unlockAchievement(55);
    }
}
function createSatellites(planet, count) {
    if (!planetExists(planet) || planet.markedForRemoval || !planet.hasIntelligentLife) {
        console.log(`❌ Cannot create satellites - planet invalid: ${planet.name}`);
        return;
    }
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = planet.radius * 1;
        const numPanels = Math.floor(Math.random() * 10) + 1;
        const modules = [];
        const moduleTypes = ['panel','antenna','dish','radar'];
        for (let p = 0; p < numPanels; p++) {
            const type = moduleTypes[Math.floor(Math.random() * moduleTypes.length)];
            modules.push({
                type: type,
                angle: Math.random() * Math.PI * 2,
                size: 1 + Math.floor(Math.random() * 3),
                color: type === 'panel' ? `hsl(${Math.floor(Math.random()*60)+180},60%,50%)` : undefined
            });
        }
        const satellite = {
            type: 'satellite',
            name: `Satellite-${Math.floor(Math.random() * 10000)}`,
            x: planet.x + Math.cos(angle) * distance,
            y: planet.y + Math.sin(angle) * distance,
            vx: planet.vx - Math.sin(angle) * 2,
            vy: planet.vy + Math.cos(angle) * 2,
            radius: 0.1,
            color: planet.affectionColor || '#cccccc',
            originPlanet: planet,
            orbitSpeed: 0.01,
            angle: angle,
            parentPlanetId: planet.id || Math.random().toString(36).substr(2, 9),
            direction: 0,
            modules: modules,
            markedForRemoval: false
        };
        planets.push(satellite);
        if (!planet.satellites) {
            planet.satellites = [];
        }
        planet.satellites.push(satellite);
        console.log(`🛰️ Created satellite for planet: ${planet.name}`);
    }
}
function cleanupOrphanedSatellites() {
    for (let i = planets.length - 1; i >= 0; i--) {
        const obj = planets[i];
        if (obj.type === 'satellite' && obj.originPlanet) {
            if (!planetExists(obj.originPlanet) || obj.originPlanet.markedForRemoval) {
                console.log(`🗑️ Removing orphaned satellite from destroyed planet`);
                obj.markedForRemoval = true;
            }
        }
    }
}
function activateCreationMode(type) {
    creationMode = type;
    selectedType = type;
    creationModeText.textContent = getTypeName(type);
    creationModeIndicator.style.display = 'block';
    const cancelBtn = document.getElementById('cancelCreationBtn');
    if (cancelBtn) cancelBtn.style.display = 'flex';
}
function deactivateCreationMode() {
    creationMode = null;
    selectedType = null;
    creationModeIndicator.style.display = 'none';
    const cancelBtn = document.getElementById('cancelCreationBtn');
    if (cancelBtn) cancelBtn.style.display = 'none';
}
function createRockets(planet, count) {
    const validTargets = planets.filter(p => 
        p !== planet && ['meteoroid', 'meteorite', 'comet', 'asteroid', 'planetoid'].includes(p.type)
    );
    if (validTargets.length === 0) {
        return;
    }
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * validTargets.length);
        const target = validTargets[randomIndex];
        if (!target) continue;
        const dx = target.x - planet.x;
        const dy = target.y - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const dirX = dx / distance;
        const dirY = dy / distance;
        const baseSpeed = 5;
        const speedVariation = Math.random() * 2;
        const speed = baseSpeed + speedVariation;
        const rocket = {
            type: 'rocket',
            name: `Rocket-${Math.floor(Math.random() * 10000)}`,
            x: planet.x + dirX * (planet.radius * 1.5),
            y: planet.y + dirY * (planet.radius * 1.5),
            vx: planet.vx + dirX * speed,
            vy: planet.vy + dirY * speed,
            radius: 0.12,
            color: planet.affectionColor || '#ff9900',
            originPlanet: planet,
            target: target,
            direction: Math.atan2(dirY, dirX),
            astronauts: Math.floor(Math.random() * 8) + 3,
            lifeTime: 0,
            maxLifeTime: 600000,
            markedForRemoval: false
        };
        planets.push(rocket);
        if (!planet.rockets) planet.rockets = [];
        planet.rockets.push(rocket);
    }
}
function findNearestTarget(source, targets) {
    let nearestTarget = null;
    let minDistance = Infinity;
    targets.forEach(target => {
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            minDistance = distance;
            nearestTarget = target;
        }
    });
    return nearestTarget;
}
function canCreateRockets(planet) {
    const hasValidTargets = planets.some(p => 
        p !== planet && ['meteoroid', 'meteorite', 'comet', 'asteroid', 'planetoid', 'rockyPlanet'].includes(p.type)
    );
    const hasPopulation = planet.type !== 'rockyPlanet' || (planet.population && planet.population > 0);
    return hasValidTargets && hasPopulation;
}
function fgpRocketBehavior(rocket, deltaTime) {
    if (!rocket.target || rocket.target.markedForRemoval) {
        const validTargets = planets.filter(p => 
            p !== rocket.originPlanet && 
            ['meteoroid', 'meteorite', 'comet', 'asteroid', 'planetoid'].includes(p.type)
        );
        if (validTargets.length > 0) {
            let nearestTarget = null;
            let minDistance = Infinity;
            validTargets.forEach(target => {
                const dx = target.x - rocket.x;
                const dy = target.y - rocket.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestTarget = target;
                }
            });
            rocket.target = nearestTarget;
        } else {
            rocket.markedForRemoval = true;
            return;
        }
    }
    if (rocket.target) {
        const dx = rocket.target.x - rocket.x;
        const dy = rocket.target.y - rocket.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 5) {
            const adjustmentStrength = 0.1;
            const dirX = dx / distance;
            const dirY = dy / distance;
            rocket.vx += dirX * adjustmentStrength;
            rocket.vy += dirY * adjustmentStrength;
            const currentSpeed = Math.sqrt(rocket.vx * rocket.vx + rocket.vy * rocket.vy);
            const maxSpeed = 8;
            if (currentSpeed > maxSpeed) {
                rocket.vx = (rocket.vx / currentSpeed) * maxSpeed;
                rocket.vy = (rocket.vy / currentSpeed) * maxSpeed;
            }
            rocket.direction = Math.atan2(rocket.vy, rocket.vx);
        } else {
            handleRocketCollision(rocket, rocket.target);
        }
    }
    if (!rocket.lifeTime) rocket.lifeTime = 0;
    rocket.lifeTime += deltaTime;
    if (!rocket.maxLifeTime) rocket.maxLifeTime = 30000;
    if (rocket.lifeTime > rocket.maxLifeTime) {
        rocket.markedForRemoval = true;
    }
}
let rocketGenerationTimer = 0;
const MIN_ROCKET_INTERVAL = 50000;
const MAX_ROCKET_INTERVAL = 120000;
let nextRocketInterval = getRandomRocketInterval();
function getRandomRocketInterval() {
    return MIN_ROCKET_INTERVAL + Math.random() * (MAX_ROCKET_INTERVAL - MIN_ROCKET_INTERVAL);
}
function fgpRocketGeneration(deltaTime) {
    rocketGenerationTimer += deltaTime;
    if (rocketGenerationTimer >= nextRocketInterval) {
        rocketGenerationTimer = 0;
        nextRocketInterval = getRandomRocketInterval();
        const rocketProducers = planets.filter(planet => 
            planet.type === 'rockyPlanet' && 
            planet.population > 0 &&
            !planet.markedForRemoval
        );
        if (rocketProducers.length > 0) {
            const producer = rocketProducers[Math.floor(Math.random() * rocketProducers.length)];
            createRockets(producer, 1);
        }
    }
}
function fgpRocketBehavior(obj, deltaTime) {
    if (obj.type !== 'rocket') return;
    const rocket = obj;
    if (!rocket.target || rocket.target.markedForRemoval || !isValidRocketTarget(rocket.target)) {
        rocket.target = findNewTargetForRocket(rocket);
    }
    if (!rocket.target) {
        const validTargets = planets.filter(p => 
            !p.markedForRemoval && 
            isValidRocketTarget(p) &&
            p !== rocket.originPlanet
        );
        if (validTargets.length > 0) {
            rocket.target = findNearestTarget(rocket, validTargets);
        } else {
            if (rocket.originPlanet && !rocket.originPlanet.markedForRemoval) {
                rocket.target = rocket.originPlanet;
            } else {
                rocket.markedForRemoval = true;
                return;
            }
        }
    }
    let isAvoiding = false;
    for (let i = 0; i < planets.length; i++) {
        const other = planets[i];
        if (other !== rocket && other !== rocket.target && shouldAvoidAstro(other)) {
            if (avoidLargeAstro(rocket, other, deltaTime)) {
                isAvoiding = true;
                break;
            }
        }
    }
    if (!isAvoiding && rocket.target) {
        const dx = rocket.target.x - rocket.x;
        const dy = rocket.target.y - rocket.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 5) {
            const adjustmentStrength = 0.1;
            const dirX = dx / distance;
            const dirY = dy / distance;
            rocket.vx += dirX * adjustmentStrength * (deltaTime / 16);
            rocket.vy += dirY * adjustmentStrength * (deltaTime / 16);
            const currentSpeed = Math.sqrt(rocket.vx * rocket.vx + rocket.vy * rocket.vy);
            const maxSpeed = 8;
            if (currentSpeed > maxSpeed) {
                rocket.vx = (rocket.vx / currentSpeed) * maxSpeed;
                rocket.vy = (rocket.vy / currentSpeed) * maxSpeed;
            }
            rocket.direction = Math.atan2(rocket.vy, rocket.vx);
        } else {
            handleRocketCollision(rocket, rocket.target);
        }
    }
    if (!rocket.lifeTime) rocket.lifeTime = 0;
    rocket.lifeTime += deltaTime;
    if (!rocket.maxLifeTime) rocket.maxLifeTime = 30000;
    if (rocket.lifeTime > rocket.maxLifeTime) {
        rocket.markedForRemoval = true;
    }
}
function hasValidRocketTargets() {
    return planets.some(p => 
        ['meteoroid', 'meteorite', 'comet', 'asteroid', 'planetoid', 'rockyPlanet'].includes(p.type)
    );
}
function findNearestRocketTarget(originX, originY) {
    let nearestTarget = null;
    let minDistance = Infinity;
    planets.forEach(planet => {
        if (['meteoroid', 'meteorite', 'comet', 'asteroid', 'planetoid', 'rockyPlanet'].includes(planet.type)) {
            const dx = planet.x - originX;
            const dy = planet.y - originY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                minDistance = distance;
                nearestTarget = planet;
            }
        }
    });
    return nearestTarget;
}
function createSpaceship(planet, type) {
    const angle = Math.random() * Math.PI * 2;
    const distance = planet.radius * 2;
    let ship = {
        type: 'spaceship',
        name: 'spaceship',
        x: planet.x + Math.cos(angle) * distance,
        y: planet.y + Math.sin(angle) * distance,
        vx: planet.vx + Math.cos(angle) * 3,
        vy: planet.vy + Math.sin(angle) * 3,
        radius: 0.2,
        color: planet.affectionColor || '#00ccff',
        originPlanet: planet,
        direction: angle,
        designVariant: Math.floor(Math.random() * 4) + 1,
        decisionTimer: null,
        isEnemy: false,
        target: null
    };
    switch (type) {
        case 1:
            ship.subType = 1;
            break;
        case 2:
            ship.subType = 2;
            ship.storedPopulation = Math.floor(100 / (Math.floor(Math.random() * 6) + 5));
            break;
        case 3:
            ship.subType = 3;
            ship.attackPower = 10;
            ship.fireRate = 1000;
            ship.lastFire = 0;
            break;
        case 4:
            ship.subType = 4;
            ship.attackPower = 25;
            ship.fireRate = 800;
            ship.lastFire = 0;
            break;
        case 5:
            ship.subType = 5;
            ship.attackPower = 5;
            ship.fireRate = 1500;
            ship.lastFire = 0;
            ship.productionRate = 30000;
            ship.lastProduction = 0;
            break;
    }
    planets.push(ship);
    planet.spaceships.push(ship);
    return ship;
}
function createSuperShip(planet) {
    const angle = Math.random() * Math.PI * 2;
    const distance = planet.radius * 3;
    const superShip = {
        type: 'superShip',
        name: 'superShip',
        x: planet.x + Math.cos(angle) * distance,
        y: planet.y + Math.sin(angle) * distance,
        vx: planet.vx + Math.cos(angle) * 2,
        vy: planet.vy + Math.sin(angle) * 2,
        radius: 4,
        color: planet.affectionColor || '#ff00ff',
        originPlanet: planet,
        direction: angle,
        population: 100,
        maxPopulation: 100,
        productionRate: 60000,
        lastProduction: 0,
        avoidanceField: 100,
        canProduce: ['satellite', 'spaceship3', 'spaceship4']
    };
    planets.push(superShip);
    planet.superShips.push(superShip);
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
    isEditing = true;
    selectedPlanet = planet;
    editName.value = planet.name || getTypeName(planet.type);
    editType.value = getTypeName(planet.type);
    editClass.value = planet.planetClass || 'Nenhuma';
    editTemperature.value = planet.temperature !== undefined ? planet.temperature : 20;
    editColor.value = planet.color;
    editSecondaryColor.value = planet.landColor || planet.glowColor || '#3498db';
    editMass.value = planet.mass;
    editGravity.value = planet.gravity || (planet.mass / 100).toFixed(1);
    editRotation.value = planet.rotationSpeed || 0.01;
    editWater.value = planet.waterValue || 0;
    editClouds.value = planet.cloudsValue || 0;
    editGas.value = planet.gasValue || 0;
    editRingMass.value = planet.ringMass || 30;
    editDescription.value = planet.description || `${getTypeName(planet.type)}`;
    editPanel.style.display = 'block';
    editKnowledge.value = planet.knowledgePoints || 0;
    document.getElementById('editBiomass').value = Math.round(planet.biomass || 0);
    document.getElementById('editPopulation').value = Math.round(planet.population || 0);
    const btnLock = document.getElementById('btnLock');
    if (planet.locked) {
        btnLock.textContent = "🔓 DesLock";
    } else {
        btnLock.textContent = "🔒 Lock";
    }
    customColorEnabled = planet.ignoreColorChanges || false;
    const btn = document.getElementById('btnCustomColor');
    if (customColorEnabled) {
        btn.textContent = '🎨 CCOn';
        btn.style.backgroundColor = '#4CAF50';
    } else {
        btn.textContent = '🎨 CCA';
        btn.style.backgroundColor = '';
    }
}
function applyAstroChanges() {
    isEditing = false;
    if (editTemperature && selectedPlanet) {
        const temp = parseFloat(editTemperature.value);
        if (!isNaN(temp)) selectedPlanet.temperature = temp;
    }
    if (!selectedPlanet) return;
    try {
        const oldLifeChance = selectedPlanet.lifeChance;
        const newLifeChance = calculateLifeChance(selectedPlanet);
        if (Math.abs(oldLifeChance - newLifeChance) > 0.3) {
            selectedPlanet.hasIntelligentLife = false;
            selectedPlanet.population = 0;
            selectedPlanet.knowledgePoints = 0;
            selectedPlanet.biomass = 0;
            selectedPlanet.satellites = [];
            selectedPlanet.rockets = [];
            selectedPlanet.spaceships = [];
            selectedPlanet.superShips = [];
            selectedPlanet._satelliteSpawnerActive = false;
        }
        selectedPlanet.lifeChance = newLifeChance;
        if (!isSpaceshipType(selectedPlanet.type)) {
            selectedPlanet.mass = parseFloat(editMass.value) || selectedPlanet.mass;
            selectedPlanet.radius = Math.cbrt(selectedPlanet.mass) * 5;
        }
        selectedPlanet.name = editName.value || selectedPlanet.name;
        selectedPlanet.color = editColor.value || selectedPlanet.color;
        showNotification(`✅ ${selectedPlanet.name} successfully`);
        fgpAstroPreview();
    } catch (error) {
        console.error('Error applying astro changes:', error);
        showNotification('❌ Error updating celestial body');
    }
    if (editBiomass.value !== selectedPlanet.biomass + '%') {
            const biomassValue = parseInt(editBiomass.value) || selectedPlanet.biomass;
            selectedPlanet.biomass = Math.max(0, Math.min(100, biomassValue));
        }
    if (editPopulation.value !== selectedPlanet.population + '%') {
        const populationValue = parseInt(editPopulation.value) || selectedPlanet.population;
        selectedPlanet.population = Math.max(0, Math.min(selectedPlanet.biomass, populationValue));
    }
    if (customColorEnabled) {
        selectedPlanet.color = editColor.value;
        selectedPlanet.landColor = editSecondaryColor.value;
    }
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
    if (selectedPlanet.type === 'rockyPlanet') {
        fgpPlanetConditions(selectedPlanet);
    }
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
function handleTouchStart(e) {
    e.preventDefault();
    const currentTime = Date.now();
    const touches = Array.from(e.touches);
    currentTouches = touches;
    if (touches.length === 1) {
        touchStartTime = currentTime;
        touchStartX = touches[0].clientX;
        touchStartY = touches[0].clientY;
        if (currentTime - lastTouchTime < 300) {
            handleDoubleTap(touches[0]);
            lastTouchTime = 0;
        } else {
            touchTimeout = setTimeout(() => {
                handleSingleTap(touches[0]);
            }, 200);
        }
        lastTouchTime = currentTime;
    } else if (touches.length === 2) {
        clearTimeout(touchTimeout);
        touchTimeout = null;
        handleTwoFingerStart(touches);
    }
}
function handleTouchMove(e) {
    unlockAchievement(48);
    e.preventDefault();
    const touches = Array.from(e.touches);
    currentTouches = touches;
    if (touches.length === 1 && !isDragging) {
        const touch = touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX);
        const deltaY = Math.abs(touch.clientY - touchStartY);
        if (deltaX > touchMoveThreshold || deltaY > touchMoveThreshold) {
            clearTimeout(touchTimeout);
            touchTimeout = null;
            isDragging = true;
            handleDragStart(touch);
        }
    }
    if (isDragging && touches.length === 1) {
        handleDragMove(touches[0]);
    }
    if (touches.length === 2) {
        handleTwoFingerMove(touches);
    }
}
function handleTouchEnd(e) {
    e.preventDefault();
    const touches = Array.from(e.touches);
    if (e.touches.length === 0) {
        if (isDragging) {
            handleDragEnd();
            isDragging = false;
        }
        currentTouches = [];
    } else {
        currentTouches = touches;
    }
}
function handleSingleTap(touch) {
    if (creationMode) {
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left - canvas.width / 2) / camera.zoom + camera.x;
        const y = (touch.clientY - rect.top - canvas.height / 2) / camera.zoom + camera.y;
        const newPlanet = createAstro(creationMode, x, y, 0, 0);
        newPlanet.createdManually = true;
        showNotification(`Created ${getTypeName(creationMode)}`);
    } else {
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left - canvas.width / 2) / camera.zoom + camera.x;
        const y = (touch.clientY - rect.top - canvas.height / 2) / camera.zoom + camera.y;
        for (let i = planets.length - 1; i >= 0; i--) {
            const planet = planets[i];
            if (planet.markedForRemoval) continue;
            const dx = x - planet.x;
            const dy = y - planet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < planet.radius * 1.2) {
                selectedPlanet = planet;
                showNotification(`Selected: ${planet.name}`);
                break;
            }
        }
    }
}
function handleDoubleTap(touch) {
    const rect = canvas.getBoundingClientRect();
    const x = (touch.clientX - rect.left - canvas.width / 2) / camera.zoom + camera.x;
    const y = (touch.clientY - rect.top - canvas.height / 2) / camera.zoom + camera.y;
    for (let i = planets.length - 1; i >= 0; i--) {
        const planet = planets[i];
        if (planet.markedForRemoval) continue;
        const dx = x - planet.x;
        const dy = y - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < planet.radius * 1.2) {
            openEditPanel(planet);
            break;
        }
    }
}
function handleDragStart(touch) {
    mouse.down = true;
    mouse.downX = (touch.clientX - canvas.getBoundingClientRect().left - canvas.width / 2) / camera.zoom + camera.x;
    mouse.downY = (touch.clientY - canvas.getBoundingClientRect().top - canvas.height / 2) / camera.zoom + camera.y;
    mouse.x = mouse.downX;
    mouse.y = mouse.downY;
}
function handleDragMove(touch) {
    mouse.x = (touch.clientX - canvas.getBoundingClientRect().left - canvas.width / 2) / camera.zoom + camera.x;
    mouse.y = (touch.clientY - canvas.getBoundingClientRect().top - canvas.height / 2) / camera.zoom + camera.y;
}
function handleDragEnd() {
    if (creationMode && mouse.down) {
        const vx = (mouse.x - mouse.downX) * 0.1;
        const vy = (mouse.y - mouse.downY) * 0.1;
        const newPlanet = createAstro(creationMode, mouse.downX, mouse.downY, vx, vy);
        newPlanet.createdManually = true;
        showNotification(`Created ${getTypeName(creationMode)} with velocity`);
    }
    mouse.down = false;
    trajectoryPoints = [];
}
function handleTwoFingerStart(touches) {
    touchStartX = (touches[0].clientX + touches[1].clientX) / 2;
    touchStartY = (touches[0].clientY + touches[1].clientY) / 2;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    this.initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
    this.initialZoom = camera.zoom;
}
function handleTwoFingerMove(touches) {
    if (touches.length !== 2) return;
    const currentX = (touches[0].clientX + touches[1].clientX) / 2;
    const currentY = (touches[0].clientY + touches[1].clientY) / 2;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        camera.x -= deltaX * 0.5 / camera.zoom;
        camera.y -= deltaY * 0.5 / camera.zoom;
        touchStartX = currentX;
        touchStartY = currentY;
    }
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);
    if (this.initialPinchDistance) {
        const zoomFactor = currentDistance / this.initialPinchDistance;
        camera.zoom = this.initialZoom * zoomFactor;
        camera.zoom = Math.max(0.001, Math.min(1000, camera.zoom));
    }
}
function renderSavesList() {
    const saves = getAllSaves();
    savesList.innerHTML = '';
    if (saves.length === 0) {
        noSavesMsg.style.display = '';
        return;
    }
    noSavesMsg.style.display = 'none';
    saves.forEach((save, idx) => {
        const li = document.createElement('li');
        li.className = 'save-item' + (save.isSpecial ? ' special-save' : '');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.padding = '8px 0';
        li.style.borderBottom = '1px solid #333';
        li.innerHTML = `
            <div style='flex:1;'>
                <div class='save-name' style='font-weight:bold;'>${save.name}</div>
                <div style='color:#aaa;font-size:0.8em;'>
                    ${new Date(save.date).toLocaleString()}
                    ${save.description ? `<br><small>${save.description}</small>` : ''}
                </div>
                ${save.isSpecial ? '<div style="color:gold; margin-top:4px;">⭐ Save Especial</div>' : ''}
            </div>
            <div>
                <button class='btn' style='margin-right:6px;' onclick='loadSave(${idx})'>Carregar</button>
                ${save.cannotDelete ? '' : `<button class='btn secondary' onclick='deleteSave(${idx})'>Excluir</button>`}
            </div>
        `;
        savesList.appendChild(li);
    });
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
    const cameraSpeed = 50 / camera.zoom;
    if (controlMode && (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S' || 
                        e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D' ||
                        e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                        e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        keys[e.key] = true;
    }
    let clickedPlanet = null;
    const mouseX = (mouse.x - canvas.width / 2) / camera.zoom + camera.x;
    const mouseY = (mouse.y - canvas.height / 2) / camera.zoom + camera.y;
    for (let i = planets.length - 1; i >= 0; i--) {
        const planet = planets[i];
        if (planet.markedForRemoval) continue;
        const dx = mouseX - planet.x;
        const dy = mouseY - planet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const clickThreshold = (planet.radius * camera.zoom) * 1.2; 
        if (distance < clickThreshold) {
            clickedPlanet = planet;
            break;
        }
    }
    if (currentTouches.length > 0) {
        return;
    }
    if (clickedPlanet) {
        selectedPlanet = clickedPlanet;
        console.log(`Selected: ${selectedPlanet.name} (${selectedPlanet.type}) at index ${planets.indexOf(selectedPlanet)}`);
    } else {
        selectedPlanet = null;
        editPanel.style.display = 'none';
    }
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
        case 'b':
            if (spectateMode) {
                toggleSpectateMode();
            }
            if (controlMode) {
                toggleControlMode();
            }
            break;
    }
}
function handleKeyUp(e) {
    if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S' || 
        e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D' ||
        e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
        e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;
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
function drawGravitationalLens(radius, type, intensity) {
    const lensRadius = radius * 1.5 * intensity;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, lensRadius);
    switch(type) {
        case 'attractive':
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(0.6, 'rgba(200, 200, 255, 0.05)');
            gradient.addColorStop(0.8, 'rgba(150, 150, 255, 0)');
            gradient.addColorStop(1, 'rgba(100, 100, 255, 0.05)');
            break;
        case 'repulsive':
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            gradient.addColorStop(0.4, 'rgba(200, 230, 255, 0.1)');
            gradient.addColorStop(0.7, 'rgba(150, 200, 255, 0.05)');
            gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
            break;
        case 'energetic':
            gradient.addColorStop(0, 'rgba(255, 255, 0, 0.2)');
            gradient.addColorStop(0.6, 'rgba(255, 200, 0, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 150, 0, 0.05)');
            break;
        default:
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
    }
    ctx.beginPath();
    ctx.arc(0, 0, lensRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
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
window.loadSave = function(idx) {
    const saves = getAllSaves();
    if (typeof loadUniverseData === 'function') {
        const saveData = saves[idx].data;
        safeLoadSave(saveData);
        hideSavesSidebar();
    } else {
        alert('Função loadUniverseData não encontrada!');
    }
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
let achievements = [];
async function loadAchievementsI18n(lang) {
    try {
        const response = await fetch(`../script/js/json/ach.${lang}.json`);
        if (!response.ok) throw new Error('Arquivo de conquistas não encontrado');
        const data = await response.json();
        const imgMap = {
            1: "../script/assets/img/ch2.jpg",
            2: "../script/assets/img/ch3.jpg",
            3: "../script/assets/img/ch1.jpg",
            4: "../script/assets/img/ch4.jpg",
            5: "../script/assets/img/ch5.jpg",
            6: "../script/assets/img/ch6.jpg",
            7: "../script/assets/img/ch7.jpg",
            8: "../script/assets/img/ch8.jpg",
            9: "../script/assets/img/ch9.jpg",
            10: "../script/assets/img/ch10.jpg",
            11: "../script/assets/img/ch11.jpg",
            12: "../script/assets/img/ch12.jpg",
            13: "../script/assets/img/ch13.jpg",
            14: "../script/assets/img/ch14.jpg",
            15: "../script/assets/img/ch15.jpg",
            16: "../script/assets/img/ch16.jpg",
            17: "../script/assets/img/ch17.jpg",
            18: "../script/assets/img/ch18.jpg",
            19: "../script/assets/img/ch19.jpg",
            20: "../script/assets/img/ch20.jpg",
            21: "../script/assets/img/ch21.jpg",
            22: "../script/assets/img/ch22.jpg",
            23: "../script/assets/img/ch23.jpg",
            24: "../script/assets/img/ch24.jpg",
            25: "../script/assets/img/ch25.jpg",
            26: "../script/assets/img/ch26.jpg",
            27: "../script/assets/img/ch27.jpg",
            28: "../script/assets/img/ch28.jpg",
            29: "../script/assets/img/ch29.jpg",
            30: "../script/assets/img/ch30.jpg",
            31: "../script/assets/img/ch31.jpg",
            32: "../script/assets/img/ch32.jpg",
            33: "../script/assets/img/ch33.jpg",
            34: "../script/assets/img/ch34.jpg",
            35: "../script/assets/img/ch35.jpg",
            36: "../script/assets/img/ch36.jpg",
            37: "../script/assets/img/ch37.jpg",
            38: "../script/assets/img/ch38.jpg",
            39: "../script/assets/img/ch39.jpg",
            40: "../script/assets/img/ch40.jpg",
            41: "../script/assets/img/ch41.jpg",
            42: "../script/assets/img/ch42.jpg",
            43: "../script/assets/img/ch43.jpg",
            44: "../script/assets/img/ch44.jpg",
            45: "../script/assets/img/ch45.jpg",
            46: "../script/assets/img/ch46.jpg",
            47: "../script/assets/img/ch47.jpg",
            48: "../script/assets/img/ch48.jpg",
            49: "../script/assets/img/ch49.jpg",
            50: "../script/assets/img/ch50.jpg",
            51: "../script/assets/img/ch51.jpg",
            52: "../script/assets/img/ch52.jpg",
            53: "../script/assets/img/ch53.jpg",
            54: "../script/assets/img/ch54.jpg",
            55: "../script/assets/img/ch55.jpg",
            0: ""
        };
        achievements = data.map(a => ({ ...a, img: imgMap[a.id] || "" }));
        if (typeof renderAchievementsList === 'function') renderAchievementsList();
    } catch (e) {
        console.error('Error loading translated achievements:', e);
    }
}
function getCurrentLang() {
    return localStorage.getItem('siu2d_lang') || navigator.language.slice(0,2) || 'en';
}
loadAchievementsI18n(getCurrentLang());
window.addEventListener('siu2d_lang_changed', function(e) {
    const lang = localStorage.getItem('siu2d_lang') || 'en';
    loadAchievementsI18n(lang);
});
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
    const coins = achievementRewards[id] || 100;
    const notif = document.getElementById('achievementNotification');
    notif.innerHTML = `
        <img src="${a.img}" alt="${a.name}"> 
        <span>
            Achievement Unlocked :D <b>${a.name}</b>
            <br><small>+${coins} TS Coins!</small>
        </span>
    `;
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
    const coins = achievementRewards[id] || 100; 
    addTSCoins(coins);
    if (id !== 55) {
        const allUnlocked = Object.keys(achievementsState).length >= 54;
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
  if (!confirm("Are you sure you want to reset ALL your achievements??\nThis cannot be undone!")) return;
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
function fgpPlanetConditions(planet) {
    if (planet.type !== 'rockyPlanet') return;
    planet.lifeChance = calculateLifeChance(planet);
    if (planet.lifeChance < 0.3) {
        planet.biomass = Math.max(0, planet.biomass - 5);
        planet.population = Math.max(0, planet.population - 10);
    }
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
function adjustOptionsGrid() {
const optionsGrid = document.querySelector('.options-grid');
if (!optionsGrid) return;
const width = window.innerWidth;
if (width <= 768) {
optionsGrid.style.gridTemplateColumns = 'repeat(6, 1fr)';
optionsGrid.style.gap = '8px';
const optionCards = document.querySelectorAll('.option-card');
optionCards.forEach(card => {
    card.style.minWidth = '80px';
    card.style.padding = '8px';
});
} else {
optionsGrid.style.gridTemplateColumns = '';
optionsGrid.style.gap = '';
const optionCards = document.querySelectorAll('.option-card');
optionCards.forEach(card => {
    card.style.minWidth = '';
    card.style.padding = '';
});
}
}
//#endregion
//#region coments
//#region thanks for playing my game :D
//#region this is the first game sa FGP
//#region please, any error, please let us know
//#region if you have any idea to improve the game, please let us know
//#region  ¯\_(ツ)_/¯
console.log(versionGame);
//#endregion