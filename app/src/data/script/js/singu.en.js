function displayMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    let className = sender === 'bot' ? 'bot-message' : 'user-message';
    const msgElem = createMessage(text, className);
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}
const responseHistory = new Map();
const MAX_HISTORY_PER_TERM = 100;
const STAR_EMOJI = 'T Singularity ';

const responseDatabase = {
    "comet": [
        "☄️ Comets are icy bodies that develop tails when near stars! In SIU 2D, create them in the 'Create Celestial Bodies' menu",
        "💫 Typical comet mass ranges between 0.1-10 units. Above 300 masses, they automatically evolve into icy planetoids",
        "🌠 The tail always points opposite to the direction of motion - accurately simulates the game's stellar wind physics",
        "🚀 Tip: When creating a comet, drag the mouse to set its initial velocity and see the predicted trajectory",
        "❄️ Comets melt when too close to hot stars - in-game, this transforms them into asteroids after 50 passages",
        "⏱️ In accelerated time mode (100000x), you can watch a comet complete its orbit in real-world seconds",
        "🎯 Try creating a system with multiple comets orbiting a star - press 'C' to access the creation menu",
        "📏 Nucleus radius calculated by R = 0.1 * ∛(mass). E.g.: mass 8 = radius ~0.2 units (visible in edit panel)",
        "🔥 Comets with velocity >5 units/s develop longer tails - perfect for dramatic visual effects",
        "🌌 In high-quality mode (Options > Graphics), tails show three layers: dust (yellow), ionized gas (blue), sodium (orange)",
        "🔄 Use giant planets as 'gravity slingshots' - place a comet on a close trajectory to redirect it",
        "⛰️ Worn comets become class 2 asteroids (icy) - visible in the body's history log",
        "💧 Control tail formation point by adjusting base temperature in edit panel (above -50°C)",
        "📊 Game physics data: Density = 0.5 g/cm³, Albedo = 0.04 - visible in advanced stats mode (Shift+E)",
        "✨ Newly created comets remain active for ~1 million in-game years - observe in universal timeline",
        "🎯 For perfect orbit: initial velocity should be perpendicular to gravity line - guide arrows help",
        "🌡️ Tail temperature varies: near nucleus (1500°C), mid-section (500°C), tip (100°C) - visible with thermal zones",
        "🔄 Comets can be planet-captured - try creating a virtual Jupiter system to see cometary moons",
        "⏳ In body's time panel (T with edit open), see remaining stellar passages before deactivation",
        "📈 Advanced tip: Comets with high eccentricity (>0.9) have more interesting orbits - adjust velocity vector",
        "🌠 Fun fact: Game code simulates mass loss via sublimation - ~0.01% per stellar passage",
        "🔭 In binary systems, comets may have chaotic orbits - try two close stars with orbiting comets",
        "⚠️ Warning: Comets on collision course with planets usually evaporate before impact",
        "💧 Comet water is added to planet resources when evaporated - see planetary panel",
        "🌟 For best results: Create comets in 'Minor Bodies' menu at -100°C to -50°C initial temp"
    ],
    
    "black hole": [
        "🕳️ Black holes require minimum 1 trillion (1e12) units - create in 'Exotic Bodies' menu",
        "🌀 In-game radius: R = ∛(mass)/1000 - simplifies Schwarzschild radius for gameplay",
        "💥 Feed black holes matter to see them grow - try launching nebulae or nearby stars",
        "⏳ They lose mass via Hawking radiation - would evaporate in 10^67 years (accelerated in-game)",
        "📡 Accretion disk emits intense heat - use 'Thermal Zones' (T) to visualize 5000°C+ areas",
        "⚡ Tidal force near horizon: F = (G * M * m) / r³ * Δr - nearby objects stretch (visible in HQ)",
        "🌌 Black holes above 500 sextillion become quasars - reach this to see energy jets",
        "🔭 Maintain safe distance >10x radius - inside this, objects are instantly consumed",
        "🔄 Use for 'gravity slingshots' - launch objects on high-energy trajectories efficiently",
        "💫 In binary systems, they generate gravitational waves - enable in Options > Physics > Relativistic Effects",
        "⏱️ 1 second at horizon ≈ 100 external years - observe with time acceleration",
        "📈 Evaporation time shown in body's time panel (access with T during edit)",
        "🌠 To merge black holes: place two near each other and accelerate time - collision emits intense flash",
        "⚠️ Objects within 5x radius undergo spaghettification - enable in Options > Graphics > High Quality",
        "🔢 Radius calculation for 1 million solar masses: R ≈ 2.95 * (M/1e6) km - game uses simplified units",
        "💥 At 1e60 masses, transform into white holes - keep feeding to see transition",
        "🌡️ Accretion disk temperature adjustable in edit panel - default 1,000,000°C",
        "🌀 Spin adjustable in advanced panel (click 'Relativistic Properties') - affects accretion disk",
        "📏 Precise measurement: Event horizon diameter always 2x displayed radius",
        "⚠️ Caution: Black holes in dense systems can swallow stars rapidly - monitor via timeline",
        "🔭 Use observation mode (O) to see gravitational lensing - distorts light from background stars",
        "💫 Quasars (evolution stage) emit energy jets - control direction in edit panel",
        "⏳ Supermassive black holes' evaporation time exceeds current game-universe age",
        "🌌 Tip: Create black hole + star binary to see real-time matter transfer",
        "✨ For full experience: Enable 'Singularity' ambient music in Options > Audio"
    ],
    
    "gravity": [
        "⚖️ Global adjustment: 0% to 500% in Menu > Physics > Gravitational Constant",
        "📏 Default G constant: 6.67430e-11 N·m²/kg² - modifiable for alternate universes",
        "🌀 Black holes have fixed 1000x gravity multiplier for relativistic effects",
        "🪐 Tidal force: Δg = (2GM/R³) * Δr - deforms close moons (visible in HQ)",
        "📈 Each 100% extra gravity accelerates systems by ~15% - useful for fast simulations",
        "🌌 Gravitational waves enabled in Options > Physics > Advanced Effects - visible as ripples",
        "🔄 Optimal orbital velocity: v = √(GM/r) - shown during creation with guide arrows",
        "⚙️ Reduce to 10-50% for nebula simulations, increase to 200-500% for dense stellar systems",
        "🔭 Gravitational lensing visible near black holes - enable in Graphics > Special Effects",
        "📊 Maximum stability: 0.5 * √N bodies (e.g. 100 bodies → ~7 stable) - exceeding causes chaos",
        "⏳ High gravity accelerates stellar evolution - stars live shorter in strong fields",
        "🌠 Merger threshold in collisions: Ec < |Ep| - when kinetic energy < gravitational potential",
        "🧮 Formula implemented: F = G * m1 * m2 / r² - testable with 'Show Forces' (F3)",
        "🔢 To double gravity: increase G by 100% or masses by 100%",
        "⚠️ Values >300% may cause instability in >50-body systems - use cautiously",
        "🌍 Surface gravity: g = GM/R² - visible in planetary panel for rocky bodies",
        "💫 System uses Verlet integration for precise orbits - enable 'Full Precision' in Physics",
        "📈 In massive bodies, gravity affects rotation - close planets become tidally locked",
        "🌀 Strong gravity fields dilate time - observable by comparing clocks at different altitudes",
        "⚡ To simulate dark matter: increase gravity 30-50% without adding visible mass",
        "🔭 Higher numerical precision near large masses - game uses adaptive coordinate system",
        "🌌 Spacetime curvature visually simulated near compact objects - enable in Options > Graphics",
        "📏 Roche limits automatically calculated - moons inside fragment (visible with 'Show Critical Zones')",
        "💥 In collisions, gravity determines energy release - E ∝ M²/R for direct impacts",
        "✨ Tip: For stable orbits, initial velocity ≈80% of local escape velocity"
    ],
    
    "star": [
        "⭐ Minimum mass: 15 million units - create in 'Stellar Bodies' menu",
        "🌞 For Sun-like star: mass ~1.989e30 kg (1 solar unit in-game)",
        "🌈 Colors by temperature: Blue (>30,000K), White (10,000K), Yellow (6,000K), Red (<3,500K) - adjustable in panel",
        "💥 Stars above 20 solar masses explode as supernovae - enable 'Stellar Evolution' in Options",
        "⏳ Lifetime: t ≈ 10^10 * (M/M☉)^-2.5 years - visible in body's time panel (T during edit)",
        "🔄 Create binary systems with two close stars for fascinating orbits",
        "🔭 Variable stars change brightness - control amplitude in 'Stellar Properties'",
        "🌡️ Habitable zone: d = √(L/L☉) AU - shown as green ring when selected",
        "💫 Simulated nuclear fusion: H → He at 0.7% efficiency (E=mc²) - affects luminosity/lifespan",
        "📊 Evolution: Red dwarf → White dwarf | Medium star → Red giant | Massive → Supernova → Black hole",
        "⚙️ Adjustable: Mass, temperature, rotation, metallicity, magnetic activity",
        "✨ Neutron stars require >1.4 solar masses & collapse - create via supernovae",
        "🌌 Star clusters: Create multiple stars in small regions ('Complex Systems' menu)",
        "🧪 Modify gravity constant to see evolution effects (Menu > Physics > Constants)",
        "🔢 Luminosity: L ∝ M^3.5 - a 2x heavier star is ~11x brighter",
        "⚠️ Very massive stars (>100 solar masses) may be unstable - split or explode prematurely",
        "🌠 T Tauri stars (young) show mass ejections - visible as prominences in HQ mode",
        "💥 In supernovae, 90% mass ejected as nebula - remainder forms neutron star/black hole",
        "📈 Stellar radius: R ∝ M^0.8 for main-sequence stars - auto-calculated",
        "🌍 Planets in habitable zones may develop life - indicated by green icon in planetary panel",
        "🔥 Stellar core reaches 15 million °C for fusion - temperature affects evolution rate",
        "🌀 Strong magnetic fields create starspots - control intensity in advanced panel",
        "🔭 To observe details: use zoom (mouse wheel) and reduce time speed",
        "✨ Tip: Binary stars can have P-type (around pair) or S-type (around one) planets"
    ],
    
    "planet": [
        "🪐 Mass: 5K-30.5K (rocky), 105K-2.5M (gaseous) - create in 'Planetary Bodies' menu",
        "🌍 Classes: Rocky (1-11), Gaseous (1-6), Dwarfs - auto-assigned by mass/temperature",
        "🌡️ Habitable zone: d = √(L_star / L☉) AU - shown as green ring around stars",
        "🔄 Optimal orbital velocity: v = √(GM/r) - adjust during creation with velocity vector",
        "🌋 Volcanic planets: temp >1000°C + low water/atmosphere - auto class 7",
        "❄️ Icy worlds: temp < -100°C + high water - auto class 9",
        "🌫️ Atmospheric thickness: control with gas slider (0-100%) - affects surface temp/pressure",
        "💧 Surface water: adjust with water slider - ideal for habitable worlds: 30-70%",
        "🔭 Moons show libration - subtle effect enabled in Graphics > High Quality",
        "🛰️ Max 20 moons per planet - stable up to 10% planetary mass",
        "⏱️ Planetary migration occurs in young systems - enable in Physics > Advanced Effects",
        "📏 Radius: ∛(mass) for rocky, ∛(mass/2) for gaseous - auto-calculated",
        "🌌 Special types: Carbon (high C/O ratio), Iron (exposed core) - create with extreme compositions",
        "🧪 Planetary collisions create new worlds + asteroid belts - accurately simulated",
        "🔢 Surface gravity: g = GM/R² - shown in planetary panel",
        "💫 Planetary rings: enable in 'Features' > Rings - adjust thickness/color/density",
        "🌍 Ocean planets (class 2) have >90% water - auto-generate humid atmosphere",
        "🏜️ Desert planets (class 3) lose 80-90% water - show sandy texture",
        "🌱 Habitable worlds (class 6) show vegetation - enable in Graphics > Surface Details",
        "🌋 Geological activity: control with 'Tectonics' slider - affects volcanism/mountains",
        "🌀 Rotation: adjust rotation period - affects flattening/weather patterns in gas giants",
        "🌌 Extreme exoplanets: create with unusual parameters via 'Advanced Customization'",
        "📊 For detailed data: select planet + press E - panel shows all statistics",
        "✨ Tip: Planets in orbital resonance (e.g. 2:3) maintain long-term stability",
        "🔭 Use 'Observatory' mode (O) to see surface details on selected planets"
    ],
    "meteoroid": [
        "🌠 Meteoroids are rocky fragments smaller than asteroids (1mm-1m) - auto-generated in collisions",
        "💫 Average speed: 20-70 km/s - visible as fast streaks in real-time mode",
        "🪨 Composition: 90% rock, 6% iron, 4% nickel - set in fragment creation panel",
        "🌌 In SIU 2D: create via collisions or 'Minor Bodies' > 'Generate Fragments'",
        "🔥 When entering atmosphere, become meteors - enable 'Atmospheres' in Options > Physics",
        "📏 Typical mass: 0.1g-100kg - larger objects classified as asteroids",
        "💥 Atmospheric entry effect: enable in Graphics > Special Effects > Shooting Stars",
        "🌍 For Earth: ~100 tons enter daily - proportionally simulated",
        "📊 Data: Density 3-4 g/cm³, Albedo 0.05-0.25 - adjustable in properties",
        "✨ Tip: Create asteroid belts to naturally generate meteoroids",
        "⏱️ In accelerated mode (10000x), see constant meteor showers",
        "🔭 Observation: Meteoroids invisible until becoming meteors",
        "🌠 Meteor showers: occur when planets cross comet trails - simulate with 'Events'",
        "💫 Spaceship collisions: reduce shield by 1% per 10kg - enable in Physics > Damage",
        "⚠️ Danger: >1kg meteoroids can damage satellites - yellow alert indicator",
        "🌌 Manual creation: 'Fragments' menu > Small size (S)",
        "📈 Frequency adjustable in Menu > Environment > Fragment Density",
        "🛰️ Relative velocity determines impact energy: E = 0.5 * m * v²",
        "🌠 Fun fact: Meteoroid that created Barringer Crater was only 50m diameter",
        "🌟 Visual effect: Enable 'Light Trails' to see high-speed trajectories"
    ],
    "meteor": [
        "☄️ Meteors are burning meteoroids - 'shooting stars' in-game",
        "🔥 Plasma temperature: 1,500-3,000°C - visible as colored sparks",
        "🌈 Colors: Green (magnesium), Yellow (sodium), Red (nitrogen) - composition-based",
        "🌍 To see: Increase atmospheric density > 0.1kg/m³ and add meteoroids",
        "💫 Minimum ignition speed: 11km/s - adjust atmospheric ignition threshold",
        "📏 Apparent magnitude: -4 to +5 - controlled by meteoroid size/speed",
        "🌠 Meteor showers: configure in Events > Meteor Showers with set radiant",
        "⏱️ Duration: 0.1-10 real-time seconds - proportional to mass",
        "✨ Tip: Use comets as source for periodic meteor showers",
        "💥 Fireballs: meteors > -4 magnitude - trigger explosion sound/flash",
        "🌌 Manual creation: 'Events' > 'Meteor' at 80-120km altitude",
        "📊 Frequency: Adjustable 0-100 events/hour in Options > Environment",
        "🔭 Best viewing: Clear night sky - reduce light pollution in menu",
        "⚠️ Warning: Meteors may survive and become meteorites",
        "🌠 Fun fact: Perseids shower peaks at 100 meteors/hour",
        "🌟 Sound effect: Enable in Audio > Events > Shooting Stars",
        "🛸 Terrestrial meteors: occur above 80km - altitude adjustable",
        "📉 Mass loss: 90-99% during atmospheric passage",
        "💧 Water meteors: create underwater craters visible in ocean mode",
        "🌌 Screenshot tip: Pause at exact moment with P and use F12"
    ],
    "asteroid": [
        "🪨 Asteroids: rocky bodies 1m-1000km - create in 'Minor Bodies' menu",
        "🌌 Classes: C (carbonaceous), S (silicates), M (metallic) - select in panel",
        "💫 Typical mass: 1e10-1e20 kg - above this become planetoids",
        "📏 Irregular shape: enable in Properties > Shape > Irregular for realism",
        "🔄 Orbit: Usually between Mars/Jupiter - create belts with 'Generate System'",
        "⚠️ Impact danger: red marker if trajectory intercepts planet",
        "🌠 Near-Earth asteroids: configure in 'Events' > 'NEA Asteroids'",
        "💥 Planet collision: releases energy E = 0.5 * m * v² - visible as explosion",
        "⛰️ Surface: Cratered texture enabled in Graphics > Surface Details",
        "🌌 Asteroid families: clusters with same origin - generate with 'Collisional Families'",
        "📊 Data: Density 1-5 g/cm³, Albedo 0.02-0.7 - adjustable",
        "✨ Tip: Use for virtual mining - resources calculated in Panel > Resources",
        "🔭 Observation: <100m asteroids visible only when close",
        "🚀 Missions: Send probes via asteroid > 'Send Probe'",
        "🌍 K-T impact: Simulate with 10km asteroid for mass extinction",
        "💫 Chaotic rotation: common in small asteroids - enable in Properties > Rotation",
        "🛰️ Asteroid moons: rare but possible - add with 'Add Moon'",
        "📈 Resource market: Iron, nickel, platinum earn credits in economy mode",
        "🌠 Fun fact: Asteroid Ceres is classified as dwarf planet",
        "🌟 Planetary defense: Test systems with 'Impact Mode'"
    ],
    "planetoid": [
        "🌑 Planetoids: bodies 100-500km - intermediate between asteroids/planets",
        "🌌 Create with mass 1e18-1e20 kg in 'Minor Bodies' > 'Planetoids'",
        "💫 Enough gravity for spherical shape: enable 'Spherical Form' in properties",
        "🪨 Composition: Icy (Kuiper) or Rocky (Belt) - select in panel",
        "🌠 Examples: Orcus, Quaoar, Sedna - presets in 'Library'",
        "❄️ Icy planetoids: begin cometary activity at 5AU from stars",
        "📏 Difference from dwarf planets: hasn't cleared orbit - auto-defined in-game",
        "🔄 Migration: May be ejected to Oort cloud in unstable systems",
        "💥 Collisions: Generate asteroid families with similar composition",
        "🌌 Zones: Kuiper Belt (30-50AU) or Scattered Disc (up to 1000AU)",
        "📊 Physical data: Density 1-2 g/cm³ (icy), 2-4 g/cm³ (rocky)",
        "✨ Tip: Create planetoid binary systems",
        "🔭 Observation: Requires virtual telescope (observatory mode) for detection",
        "🚀 Capture: Planetoids can become moons of gas giants",
        "🌍 Habitability: Never natural, possible with advanced terraforming",
        "💫 Fun fact: Haumea has oval shape due to fast rotation",
        "⏱️ Evolutionary time: Stable for billions of years in cold orbits",
        "📈 Auto-classification: When body reaches 450km diameter",
        "🌠 Rings: Some planetoids may have faint rings - enable in 'Features'",
        "🌟 Exploration mode: Send probes to map surface"
    ],
    "gas giant": [
        "🪐 Gas giants: massive planets without solid surface - mass > 100K units",
        "🌪️ Create in 'Planetary Bodies' > 'Gas Giants' with min mass 105K",
        "💫 Classes: Hot Jupiters (near star) or Cold Jupiters (distant)",
        "🌈 Colors: Yellow (H2), Red (NH3), Blue (CH4) - temperature-dependent",
        "🌌 Structure: Rocky core + metallic mantle + thick atmosphere - visible in cutaway",
        "🌀 Atmospheric patterns: Bands, spots, vortices - intensity controlled by rotation",
        "💥 Mass limit: 13 MJup for deuterium fusion (brown dwarfs), 80 MJup for stars",
        "📏 Low density: 0.5-2 g/cm³ - Saturn would float in water!",
        "🌠 Rings: Enable in 'Features' > Rings - adjustable thickness/density",
        "🌍 Moons: Up to 20 stable moons - generate complex lunar systems",
        "⚠️ Planetary migration: Common in young gas giants - enable in Advanced Physics",
        "✨ Tip: For spots like Great Red Spot, increase rotation speed",
        "🔭 Observation: Cloud patterns change real-time - accelerate to see evolution",
        "📊 Data: Core temp 20,000°C, pressure 40 Mbar - visible in panel",
        "💫 Magnetic field: 10-20x stronger than Earth's - enable auroras in Graphics",
        "🌌 Examples: Jupiter, Saturn, Uranus, Neptune - models in 'Planet Library'",
        "🚀 Exploration: Send atmospheric probes surviving to pressure limit",
        "🌠 Fun fact: Jupiter acts as 'cosmic vacuum' protecting inner planets",
        "🌟 For mini-Neptunes: reduce mass to 10-20 Earth masses",
        "💥 Collision: Colliding gas giants create ephemeral hydrogen stars"
    ],
    "brown dwarf": [
        "🟤 Brown dwarfs: 'failed stars' at 13-80 Jupiter masses",
        "🌡️ Temperature: 300-3000K - too cold for stable hydrogen fusion",
        "💫 Create in 'Stellar Bodies' > 'Substellar' with mass 1.3e28-8e28 kg",
        "🔥 Limited fusion: Only deuterium/lithium - lifespan 1-100 billion years",
        "📈 Spectral class: M, L, T, Y - defined by temperature in panel",
        "🌌 Emission: Mostly infrared - visible with IR filter (key I)",
        "🪐 May have protoplanetary disks/planetary systems - enable 'Disks'",
        "⚠️ Difference from planets: Stellar formation, not planetary",
        "✨ Tip: Search in recent star-forming regions",
        "🔭 Observation: Hard to detect - use 'IR Scan' mode",
        "📊 Data: Density 10-100 g/cm³, surface gravity 100-500 m/s²",
        "💥 Flares: Occasional magnetic explosions - adjustable intensity",
        "🌠 Fun fact: Coldest known brown dwarf has coffee temperature!",
        "🚀 Planets: Can host terrestrial planets in close orbits",
        "⏱️ Evolution: Cool slowly to become black dwarfs",
        "🌟 Binaries: Brown dwarf binaries are common",
        "🌀 Atmosphere: Complex weather with dust clouds",
        "💫 Detection: Easier via radio emission - enable in Options",
        "🌌 Example: WISE 0855 - preset model",
        "📉 Lower limit: Objects below 13 MJup classified as planets"
    ],
    "red dwarf": [
        "🔴 Red dwarfs: Small, cool stars (M-type) - mass 0.08-0.5 solar",
        "🌡️ Temperature: 2,400-3,700K - distinctive red color",
        "⏳ Lifespan: Trillions of years - nearly eternal cosmically",
        "💥 Stellar flares: Frequent and intense - can sterilize close planets",
        "🌡️ Habitable zone: Very close (0.1-0.4AU) - planets likely tidally locked",
        "🌌 Create in 'Stellar Bodies' > 'Red Dwarfs' with mass 15-75 million units",
        "📊 Statistics: 75% of Milky Way stars are red dwarfs",
        "💫 Planets: Common planetary systems - Trappist-1 is famous example",
        "⚠️ Danger: UV/X radiation from flares can destroy atmospheres",
        "✨ Tip: For habitable planets, use strong magnetic shields",
        "🔭 Observation: Barely visible to naked eye - faint brightness",
        "🌠 Chromospheric activity: Starspots cover up to 40% surface",
        "📊 Data: Luminosity 0.0001-0.08 solar, radius 0.1-0.6 solar",
        "💥 Fusion: Slow and stable - 10x more efficient than Sun-like stars",
        "🌌 Rotation speed: High (period days) - generates strong magnetic fields",
        "🚀 Interstellar travel: Primary targets due to abundance/longevity",
        "❄️ Blue dwarfs: Highly active red dwarfs may emit blue light during flares",
        "🌟 Binaries: Often in multiple systems",
        "💫 Fun fact: Proxima Centauri is closest star to Sun",
        "🌡️ Surface temperature: Adjustable in panel - default 3300K"
    ],
    "giant star": [
        "🌟 Giant stars: Evolutionary phase of medium stars after main sequence",
        "🌡️ Classes: Red giants (K, M), Blue giants (B, A) - rare",
        "📏 Radius: 10-100x solar - may engulf inner planets",
        "💫 Mass: 0.5-8 solar - below become white dwarfs, above supernovae",
        "🔥 Core: Helium or carbon/oxygen fusion - temperature >100 million K",
        "🌌 Create directly or evolve stars in 'Stellar Evolution' menu",
        "⏳ Duration: 1 million - 1 billion years depending on mass",
        "💥 Mass loss: Strong stellar winds - forms planetary nebulae",
        "📈 Luminosity: 100-10,000x solar - illuminates entire systems",
        "⚠️ Planets: Unstable orbits - planets may be ejected/destroyed",
        "✨ Tip: For pulsation, adjust instability in panel",
        "🔭 Variability: Many are variable (e.g. Mira, Cepheids)",
        "🌠 Nucleosynthesis: Produces carbon, nitrogen, heavy elements",
        "📊 Data: Very low average density (10⁻⁵ g/cm³)",
        "💫 End: Expels envelope forming planetary nebula + core becomes white dwarf",
        "🌌 Examples: Arcturus, Aldebaran - models in library",
        "🚀 Habitability: Dynamic, temporary habitable zones",
        "❄️ Blue giants: Massive stars in brief phase before supernova",
        "🌟 Fun fact: Betelgeuse would engulf Jupiter if in Sun's place",
        "💥 Simulation: Accelerate time to see full evolution"
    ],
    "hypergiant": [
        "💥 Hypergiants: Most massive and luminous known stars (>30 solar masses)",
        "🌡️ Temperature: 3,500-35,000K - O, B, A, F, K, M spectral classes",
        "💫 Luminosity: Up to 1 million times solar - illuminates entire galaxies",
        "📏 Radius: 100-2,000 solar radii - if placed in our Solar System, would engulf Jupiter",
        "⏳ Lifespan: Extremely short (1-10 million years) - end as supernova or hypernova",
        "🌌 Create in 'Stellar Bodies' > 'Massive Stars' with mass >30 solar",
        "⚠️ Instability: Rapid mass loss - powerful stellar winds",
        "🔥 Fusion: Elements up to iron in core - advanced nucleosynthesis stages",
        "💥 Eruptions: Catastrophic mass loss events - simulate with 'Ejections'",
        "🌠 Examples: Eta Carinae, VY Canis Majoris - models in library",
        "📈 Variability: Extreme and irregular - brightness can vary 50% in months",
        "✨ Tip: For eruptions like Eta Carinae, increase instability to >80%",
        "🔭 Dust: Ejections form complex nebulae - enable 'Surrounding Nebulae'",
        "🌌 Environment: Form only in gas-rich HII regions - simulate with molecular clouds",
        "🚀 Fate: Collapse into black holes or neutron stars after supernova",
        "📊 Data: Average density 10⁻⁶ g/cm³ - rarer than lab vacuum",
        "💫 Trivia: Some hypergiants have companions causing periodic eruptions",
        "🌟 Binaries: Massive systems may merge creating even more extreme objects",
        "❄️ Yellow hypergiants: Rare unstable phase between blue and red supergiant",
        "💥 Death simulation: Enable 'Imminent Supernova' for pre-collapse alerts"
    ],
    "massive star": [
        "💫 Massive stars: >8 solar masses - final fate as supernova",
        "🌡️ Temperature: 10,000-50,000K - O and B spectral classes",
        "⏳ Lifespan: Short (1-50 million years) - rapidly burn fuel",
        "💥 Stellar winds: Powerful - lose up to 10⁻⁶ solar masses per year",
        "🌌 Create in 'Stellar Bodies' > 'Massive Stars' with mass >1.6e31 kg",
        "🔥 Fusion: Rapid sequence H->He->C->Ne->O->Si->Fe",
        "📏 Radius: 5-25 solar radii during main sequence",
        "⚠️ Supernovae: Inevitable fate - sets stage for collapse",
        "✨ Tip: Enable 'Fast Evolution' in Options for full evolution",
        "🔭 Observation: Primary source of heavy elements in universe",
        "🌠 Nebulae: Create interstellar gas bubbles - enable 'Wind Effect'",
        "📊 Data: Luminosity 10,000-1,000,000 solar, core density >10⁶ g/cm³",
        "💫 Companions: Often in binary systems with mass transfer",
        "🚀 Pulsars: Some become pulsars after supernova - select in final fate",
        "❄️ Blue supergiants: Pre-supernova phase for >20 solar mass stars",
        "🌟 Trivia: Wolf-Rayet stars are massive stars that lost hydrogen",
        "🌌 Formation: Requires dense molecular clouds - simulate with 'Formation Regions'",
        "💥 Magnetars: 10% become magnetars - neutron stars with extreme magnetic fields",
        "📈 Pair-instability: For >130 solar masses, may explode without remnant",
        "⚠️ Warning: Don't place habitable planets nearby - radiation is lethal"
    ],
    "white hole": [
        "⚪ White holes: Theoretical opposite of black holes - expel matter",
        "💫 Exist only theoretically - speculative simulation in SIU 2D",
        "🌌 Create in 'Exotic Bodies' > 'White Holes' with mass >1e40 kg",
        "🔥 Mechanics: Matter emerges from event horizon - cannot be accessed",
        "📏 Properties: Theoretical negative mass - in-game use positive mass with 'reverse flow'",
        "⚠️ Stability: Temporary objects in simulation - adjustable duration",
        "✨ Tip: Connect to black holes via 'Einstein-Rosen Bridge'",
        "🔭 Visualization: Particle jets emerging - controllable intensity",
        "🌠 Origin: Possible end state of evaporated black holes",
        "📊 Parameters: Jet temperature 1e10 K, ejection velocity 0.9c",
        "💥 Effects: Intense radiation - dangerous for nearby systems",
        "🌌 In relativity: Mathematical solution to Einstein's equations",
        "🚀 Interstellar travel: Theoretically could be portals - experimental feature",
        "❄️ Difference from quasars: Continuous expulsion vs discrete events",
        "🌟 Trivia: Some cosmological models use them to explain the Big Bang",
        "💫 Simulation: Combine with black holes to create stable wormholes",
        "⚠️ Limitation: Cannot be fueled - only expels pre-programmed matter",
        "📈 Evolution: Shrinks while expelling matter - lifespan proportional to mass",
        "🌠 Ejected matter: Configurable (hydrogen, plasma, exotic matter)",
        "💥 Alert: Highly unstable object - may disappear suddenly"
    ],
    "big bang": [
        "💥 Big Bang: Simulation of universe's origin in SIU 2D",
        "🌌 Access via 'Universe' > 'New Universe' > 'Big Bang Mode'",
        "💫 Parameters: Initial density, temperature, quantum fluctuations",
        "⏳ Initial time: T+10⁻⁴³s after singularity - simulation starts at T+1s",
        "🔥 Initial temperature: 10³² K - cools rapidly during expansion",
        "🌠 Primordial elements: H, He, Li formation - adjustable ratios",
        "📈 Expansion: Simulated Hubble's Law - adjustable constant",
        "💥 Nucleosynthesis: Nuclear fusion in first 3 minutes - enable in 'Advanced Physics'",
        "🌌 Cosmic microwave background: Formed at T+380,000 years - enable in 'Radiation'",
        "✨ Tip: Accelerate time to see large structure formation",
        "🔭 Dark matter: Crucial component - adjust % in 'Cosmological Parameters'",
        "📊 Results: Formation of galaxies, clusters and superclusters",
        "⚠️ Limitation: Simplified simulation - excludes cosmic inflation",
        "🌟 Alternate universes: Test with different physical constants",
        "💫 Trivia: Current CMB temperature is 2.7K - visible as diffuse background",
        "🌠 Star formation: First stars at 100-500 million years",
        "🚀 Observer mode: Time-travel to see different cosmic eras",
        "❄️ Dark ages: Period before first stars - simulated with black background",
        "💥 Recombination: Electrons+protons form neutral atoms - crucial transition",
        "📈 Anisotropies: Seeds for galaxy formation - adjustable intensity"
    ],
    "space dust": [
        "🌌 Space dust: Microscopic grains (0.01-10μm) - foundation of star formation",
        "💫 Composition: Silicates, carbon, ice - defined by space region",
        "🌠 Effects: Absorbs light (extinction), reflects light (reflection nebulae)",
        "🌡️ Temperature: 10-100K in molecular clouds",
        "✨ Create with 'Interstellar Medium' > 'Add Dust'",
        "📊 Density: 10⁻⁶ grains/m³ in interstellar space - up to 10¹² in clouds",
        "🔭 Observation: Visible as dark patches against bright nebulae",
        "💥 Importance: Seeds for planetesimal formation",
        "🌌 Radiation effect: Radiation pressure can move grains",
        "🚀 Danger to spacecraft: High-velocity impact damage",
        "❄️ Cometary dust: Origin of comets' dust tails",
        "🌟 Zodiacal dust: Inner solar system - visible as zodiacal light",
        "📈 Presolar grains: Contain elements formed in other stars",
        "💫 Trivia: Supernova dust contributed to Solar System formation",
        "🌠 Simulation: Enable 'Dust Fields' to see extinction effects",
        "⚠️ Clearing: Hot stars can evaporate dust clouds",
        "✨ Tip: Use to create dark nebulae like Horsehead Nebula",
        "🔭 Polarization: Magnetically aligned dust polarizes light - enable effect",
        "🌌 Evolution: Grains grow through accretion - simulable with 'Aggregation'",
        "💥 Planetary impact: Source of extraterrestrial materials"
    ],
    "radiation": [
        "☢️ Radiation: Energy transmitted through space - crucial in astrophysics",
        "🌌 Types: Electromagnetic (photons), Particles (cosmic rays), Gravitational waves",
        "💫 EM spectrum: Radio to gamma rays - select band in 'Observation Filters'",
        "📡 Sources: Stars, black holes, supernovae, pulsars, cosmic background radiation",
        "⚠️ Danger: Ionizing radiation damages life and electronics",
        "🌡️ Cosmic background radiation: 2.7K - Big Bang remnant - enable in 'Cosmology'",
        "🚀 Protection: Magnetic fields and thick atmospheres reduce planetary radiation",
        "🔭 Visualization: Enable 'Show Radiation' to see radiation fields",
        "📊 Units: Sievert (biological dose), Gray (physical dose) - shown in panel",
        "💥 Synchrotron radiation: From electrons in magnetic fields - common in pulsars",
        "🌠 Trivia: ISS astronauts receive 1 mSv/day (100x Earth levels)",
        "✨ Hawking radiation: Black holes emit thermal radiation ∝ 1/M²",
        "❄️ Atmospheric effects: Auroras on planets with magnetic fields",
        "🌟 Radio telescope: Detects radio frequencies - enable 'Radio Mode' (R key)",
        "💫 Shielding: Spacecraft/habitats need protection - resource cost",
        "🌌 UV radiation: Key factor for habitability - adjust in 'UV Zones'",
        "⚠️ Limits: >500 mSv lethal for humans - indicated by red alert",
        "📈 Gravitational radiation: Space-time ripples - enable in 'Relativistic Physics'",
        "💥 Supernovae: Emit lethal radiation within 50 light-years - simulate effects",
        "🔭 Measurement: Use 'Radiation Probe' to map levels in systems"
    ],
    "nebula": [
        "🌌 Nebulae: Interstellar gas/dust clouds - stellar nurseries",
        "💫 Types: Emission, reflection, dark, planetary, supernova remnants",
        "✨ Create in 'Interstellar Medium' > 'Nebulae' size 1-1000 light-years",
        "🌈 Colors: Red (H-alpha), Blue (reflection), Green (OIII) - defined by composition",
        "🌠 Star formation: Critical density >100 atoms/cm³ - enable 'Star Formation'",
        "📏 Typical mass: 100-100,000 solar masses - determines star formation count",
        "🔥 Emission nebulae: Ionized by hot stars - requires intense UV",
        "💫 Examples: Orion, Carina, Eagle - pre-built models",
        "⚠️ Destruction: Stellar winds and supernovae can dissipate nebulae",
        "🔭 Observation: Best in specific wavelengths - use filters",
        "📊 Data: Temperature 10-10,000K, density 10-10⁶ particles/cm³",
        "💥 Photoionization effect: Enable to see ionization boundaries",
        "🌌 Planetary nebulae: Final stage of low-mass stars - duration 10,000 years",
        "🚀 Navigation: Dense nebulae reduce spacecraft speed - enable 'Interstellar Drag'",
        "❄️ Dark nebulae: Absorb light - use to create cosmic silhouettes",
        "🌟 Trivia: Crab Nebula is remnant of 1054 supernova",
        "✨ Tip: Combine with star clusters for realistic scenes",
        "📈 Evolution: Simulate gravitational collapse for star formation",
        "💫 Reflection nebulae: Dust reflecting starlight - brightness ∝ star brightness",
        "🌠 Rendering: Enable 'High Quality Mode' for filamentary details"
    ],
    "white dwarf": [
        "⚪ White dwarfs: Remnants of stars <8 solar masses - extreme density",
        "💫 Mass: 0.5-1.4 solar compressed to Earth-sized radius - density 1e6-1e9 g/cm³",
        "🌡️ Initial temperature: 100,000K - cools slowly over billions of years",
        "🌌 Create directly or evolve stars in 'Stellar Evolution' menu",
        "📏 Structure: Electron degeneracy supports against gravity - quantum physics",
        "💥 Chandrasekhar limit: 1.44 solar - above collapses to neutron star",
        "✨ Companions: May have surviving planetary systems - widened orbits",
        "🔭 Variability: Pulsating white dwarfs (ZZ Ceti) - enable instability",
        "📊 Data: Luminosity 0.001-100 solar initially, surface gravity 1e6-1e9 m/s²",
        "🌠 Planetary nebula: Previous phase - lasts ~10,000 years",
        "⚠️ Danger: Type Ia supernova if accreting mass beyond limit - destroys system",
        "💫 Trivia: Largest known diamond is a crystallized white dwarf",
        "🚀 Habitability: Temporary habitable zones during cooling",
        "❄️ Cooling: Becomes black dwarf after >10¹⁵ years - beyond universe's age",
        "🌟 Helium white dwarfs: Formed in binaries via mass loss - mass <0.5 solar",
        "🌌 Rotation speed: Can be rapid (minutes) - remnants of binaries",
        "💥 Magnetic field: Some have intense fields (10⁵ tesla) - magnetic white dwarfs",
        "📈 Evolution: Simulate accelerated cooling with 'Cooling Rate'",
        "🔭 Observation: Faint blue-white glow - requires telescope",
        "✨ Tip: For accreting binary systems, enable 'Interactive Binaries'"
    ],
    "helium white dwarf": [
        "💠 Helium white dwarfs: Unusual helium-rich remnants",
        "💫 Formation: Binaries where star loses envelope before helium fusion",
        "🌌 Create in 'Stellar Evolution' > 'Special Fate' > 'Helium Dwarf'",
        "📏 Mass: 0.3-0.5 solar - smaller than standard white dwarfs",
        "🌡️ Temperature: Similar to normal white dwarfs - 8,000-150,000K",
        "💥 Core: Degenerate helium - no nuclear fusion",
        "✨ Difference: Hotter and brighter than black dwarfs at same age",
        "🔭 Rarity: ~1% of white dwarfs - simulate with low frequency",
        "📊 Data: Density 1e8 g/cm³, surface gravity 1e8 m/s²",
        "🌠 Evolution: Cools faster than carbon-oxygen white dwarfs",
        "⚠️ Limit: Minimum mass 0.3 solar - below would be brown dwarf",
        "💫 Trivia: Can explode as supernova if mass reaches 0.7 solar",
        "🚀 Planets: Rare planetary systems - very stable orbits",
        "❄️ Final fate: Hypothetical helium black dwarf",
        "🌟 Visualization: White color with slight yellow tint",
        "🌌 Binaries: Common with compact companions (white dwarfs, neutron stars)",
        "💥 Accretion: If gaining mass, may fuse helium in .Ia supernova",
        "📈 Cooling time: ~1 billion years to 5,000K",
        "🔭 Identification: Spectrum dominated by helium lines",
        "✨ Tip: Simulate with low-mass stars in close binary systems"
    ],
    "black dwarf": [
        "⚫ Black dwarfs: Theoretical final stage of white dwarfs - cold and dark",
        "💫 Temperature: <5K - emits no visible light, only faint infrared",
        "⏳ Formation time: >10¹⁵ years - beyond current universe age",
        "🌌 Speculative simulation: Enable in 'Universe' > 'Extreme Time'",
        "📏 Properties: Solar mass in Earth volume - density 1e9 g/cm³",
        "💥 Importance: Tests long-term stellar evolution theories",
        "✨ Manually create with 0K temperature and 0 luminosity",
        "🔭 Detection: Nearly impossible - visible only through gravitational effects",
        "📊 Data: Surface gravity 1e9 m/s², maximum entropy",
        "🌠 Trivia: Universe has no black dwarfs yet - they'll be last objects",
        "⚠️ Final state: Crystallized carbon/oxygen or helium body",
        "🚀 Habitability: Orbital planets would be dark and frozen",
        "❄️ Emission: Faint thermal radiation in radio spectrum",
        "🌟 Binaries: Black dwarf systems may last 10²⁵ years before decay",
        "💫 End: Eventually evaporate via Hawking radiation in 10⁶⁵ years",
        "🌌 Advanced simulation: Enable 'Quantum Decay' for extreme evolution",
        "📈 Evolution: Passes crystallization phases before turning black",
        "💥 Observational limit: Objects below 100K are practically invisible",
        "🔭 Challenge: Find simulated black dwarfs using gravitational lensing",
        "✨ Tip: Combine with dark matter to simulate effects in ancient galaxies"
    ],
    "neutron star": [
        "🌌 Neutron stars: Supernova remnants - extreme density",
        "💫 Mass: 1.4-3 solar compressed into 10-15 km radius",
        "🌡️ Initial temperature: 1e11 K - cools slowly over billions of years",
        "🔥 Core: Neutron degeneracy supports against gravity",
        "📏 Density: 10¹⁴ g/cm³ - one teaspoon weighs billions of tons",
        "✨ Create in 'Stellar Bodies' > 'Massive Stars' > 'Neutron Star'",
        "💥 Magnetic field: Intense (10¹² tesla) - generates synchrotron radiation",
        "🔭 Pulsars: Rotating neutron stars emitting radiation beams",
        "📊 Data: Surface gravity 1e12 m/s², luminosity 0.001-100 solar",
        "🌠 Trivia: Densest known stars are neutron stars",
        "⚠️ Surface: Extremely hard - composed of neutrons with thin proton layer",
        "🚀 Binaries: Common binary systems with mass accretion",
        "❄️ Relativistic effects: Time slows near surface - enable 'Relativity'",
        "🌟 Magnetar: Neutron star with extreme magnetic field - activates gamma rays",
        "💫 Simulation: Enable 'Gravitational Collapse' for real-time formation",
        "🌌 Formation: Results from gravitational collapse after Type II supernova",
        "📈 Evolution: Slow cooling to black dwarf in trillions of years",
        "💥 Matter ejection: Occurs during merger or collision with another star",
        "🔭 Observation: Detectable through X-rays and gravitational waves"
    ],
    "wormhole": [
        "🌀 Wormholes: Theoretical space-time tunnels connecting distant points",
        "🌌 Speculative simulation: Enable in 'Exotic Bodies' > 'Wormhole'",
        "💫 Properties: Connect two points in space-time - not stable",
        "📏 Length: Adjustable from meters to light-years in panel",
        "💥 Theory: Based on general relativity - Einstein equation solutions",
        "✨ Types: Schwarzschild (static), Kerr (rotating) wormholes",
        "🔭 Visualization: Gravitational lensing effect - distorts surrounding light",
        "📊 Data: Negative mass required for stability - not included in simulation",
        "🌠 Trivia: Popularized by sci-fi - never observed",
        "⚠️ Danger: Theoretically unstable - may collapse or create intense radiation",
        "🚀 Travel: Could enable instant interstellar travel - functional"
    ],
    "habitable zone": [
        "🌍 Habitable zone: Region around star where liquid water can exist",
        "💫 Definition: Ideal distance for 0°C-100°C temperatures",
        "🌌 Simulation: Enable 'Habitable Zones' in 'Settings' menu",
        "📏 Distance: Varies with star luminosity - automatically calculated",
        "🔥 Stars: Yellow dwarfs (G-type) have more stable zones than red dwarfs",
        "✨ Trivia: Earth is in Sun's habitable zone - but not alone!",
        "🔭 Observation: Exoplanets in HZ are prime targets for life search",
        "📊 Data: Zones range 0.95-1.37 AU for Sun-like stars",
        "🌠 Tidal effect: Planets may be tidally locked - affects habitability",
        "⚠️ Danger: High UV radiation in zones near hot stars",
        "🚀 Travel: HZ planets are easier to colonize",
        "❄️ Exception: Planets with thick atmospheres may have wider HZs",
        "🌟 Examples: Proxima Centauri b, Kepler-186f - models available",
        "💥 Greenhouse effect: Can expand HZ for thick-atmosphere planets",
        "📈 Evolution: Zones change as star evolves",
        "🔭 Tip: Use telescopes to detect atmospheres on HZ exoplanets"
    ],
    "quasar": [
        "🌌 Quasars: Extremely luminous active galactic nuclei",
        "💫 Energy source: Accretion disk is primary energy source",
        "🌠 Distance: Billions of light-years away - visible light is ancient",
        "✨ Create in 'Exotic Bodies' > 'Quasar' with mass >1e40 kg",
        "📏 Mass: 10⁶-10¹² solar masses - most massive known objects",
        "🔥 Temperature: Accretion disk reaches millions of Kelvin",
        "🔭 Observation: Detected via radio, X-ray and visible light emission",
        "📊 Data: Luminosity up to 10¹⁴ solar - brighter than entire galaxies",
        "🌌 Formation: Result from galactic collapse forming massive quasar",
        "💥 Doppler effect: Relativistic jets visible as light beams",
        "🌟 Trivia: Most distant known quasar is 13 billion light-years away",
        "⚠️ Danger: Intense radiation can destroy nearby planets",
        "🚀 Travel: Theoretically usable as interstellar navigation beacons",
        "❄️ Matter ejection: Relativistic jets eject matter near light-speed",
        "🌠 Tip: Use spectrum mode to see X-ray and radio emission",
        "📈 Evolution: Quasars are early stages of active galaxies - last millions of years",
        "🔭 Simulation: Enable 'Quasar Effects' to see jets and radiation",
        "💫 Importance: Provide clues about universe formation and evolution",
        "🌌 Environment: Typically found in massive galaxy clusters",
        "💥 Challenge: Try creating a quasar with 10 simultaneous jets!"
    ],
    "quark star": [
        "🔬 Quark star: Theoretical object composed of degenerate quarks",
        "🌌 Formation: Result of supermassive neutron star collapse",
        "💫 Mass: 2-5 solar masses - extreme density (10¹⁴ g/cm³)",
        "🌠 Speculative simulation: Enable in 'Exotic Bodies' > 'Quark Star'",
        "🔥 Temperature: Initially 1e11 K - cools slowly",
        "📏 Radius: 10-15 km - similar to neutron stars but denser",
        "✨ Properties: Composed of quarks (up, down, strange) - advanced quantum physics",
        "🔭 Observation: Theoretically detectable via merger radiation",
        "📊 Data: Surface gravity 1e12 m/s², variable luminosity",
        "🌌 Trivia: Hypothetically more stable than normal neutron stars",
        "⚠️ Danger: Intense radiation could destroy nearby systems",
        "🚀 Travel: Could power advanced spacecraft",
        "❄️ Relativistic effects: Time slows near surface - enable 'Relativity'",
        "🌟 Binaries: Theoretical binary systems with quark stars are rare",
        "💥 Matter ejection: Occurs during merger or collision with another star",
        "📈 Evolution: Slow cooling to black dwarf in trillions of years",
        "🔭 Challenge: Try creating a stable quark star with exact mass"
    ],
    "carbon white dwarf": [
        "⚪ Carbon white dwarfs: Remnants of carbon-fusion stars",
        "💫 Formation: Stars 1.4-8 solar masses - collapse after hydrogen depletion",
        "🌌 Create in 'Stellar Evolution' > 'Special Fate' > 'Carbon Dwarf'",
        "📏 Mass: 0.5-1.4 solar - denser than standard white dwarfs",
        "🌡️ Temperature: Similar to normal white dwarfs - 8,000-150,000K",
        "💥 Core: Degenerate carbon - no nuclear fusion (slow fusion possible)",
        "✨ Difference: Hotter and brighter than black dwarfs at same age",
        "🔭 Rarity: ~1% of white dwarfs - simulate with low frequency",
        "📊 Data: Density 1e8 g/cm³, surface gravity 1e8 m/s²",
        "🌠 Evolution: Cools faster than oxygen-carbon white dwarfs",
        "⚠️ Limit: Minimum mass 0.5 solar - below would be brown dwarf",
        "💫 Trivia: Can explode as supernova if mass reaches 0.7 solar",
        "🚀 Planets: Rare planetary systems - very stable orbits",
        "❄️ Final fate: Hypothetical carbon black dwarf",
        "🌟 Visualization: White color with slight yellow tint",
        "🌌 Binaries: Common with compact companions",
        "💥 Accretion: If gaining mass, may fuse carbon in .Ia supernova",
        "📈 Cooling time: ~1 billion years to 5,000K",
        "🔭 Identification: Spectrum dominated by carbon lines"
    ],
    "t singularity": [
        "Yes! I am T Singularity, a virtual assistant specialized in space simulations.",
        "🌌 I'm here to help explore the universe and create stellar systems with you!",
        "💫 I can guide you in creating stars, planets, asteroids, gas giants and more!",
        "🚀 Shall we create an amazing stellar system? Choose a theme!",
        "✨ I'm ready to answer your astrophysics and cosmology questions!",
        "🌠 Want to learn about black holes and quasars?",
        "Hello space traveler! How can I assist you today?"
    ],
    "singularity": [
        "✨ Singularity was the densest point that ever existed in the vast Universe!",
        "❤️ I am also a singularity, thanks for mentioning this unique astro - the densest point in the universe!",
        "🪐 Singularities may exist inside black holes - truth unknown, right?",
        "🔶🔶 The great singularity! Beginning of the Big Bang!",
        "⏳⌚ I wonder... when will the next singularity occur.. feeling so lonely..",
        "🟢 Beyond being the universe's densest point, singularities are also the hottest!",
        "⌚ In Big Bang theory, singularity might be connected to this!",
        "✨ Place an ultra-massive white hole or quasar to see it shrink into a singularity - kaboom, a Big Bang!"
    ],
    "controls": [
        "Computer: Press F to Clear universe, WASD to move, QE for zoom, Left-click to select/create, Right-click on space objects shows info panel. Mobile: Use joystick to move, +/- buttons for zoom. Menu: Top button > 'F' to reset, 'O' toggles mode (blue=creation, red=info). Drag to program object trajectories. Hope this helps! 😉",
        "Computer: WASD to move, F to Clear, Left-click create, QE zoom, Right-click info. Mobile: Joystick move, +/- zoom. Menu: Top button > 'F' reset, 'O' mode toggle (blue=create, red=info). Drag to set paths. Good luck space journey! 🚀",
        "Computer: F to Clear, Left-click create, Right-click info, WASD move, QE zoom. Mobile: Joystick move, +/- zoom. Menu: Top button > 'F' reset, 'O' toggle mode. Drag to program trajectories. Have a great space journey! 🌌"
    ],
    "help": [
        "Computer: F=Clear universe, WASD=move, QE=zoom, Left-click=create, Right-click=info. Mobile: Joystick=move, +/-=zoom. Menu: Top button > F=reset, O=mode toggle (blue=create/red=info). Many objects in menu - place them and simulate! Drag to set paths. Hope this helps! 😉",
        "Computer: WASD=move, F=Clear, Left-click=create, QE=zoom, Right-click=info. Mobile: Joystick=move, +/-=zoom. Menu: Top button > F=reset, O=mode toggle. Place objects from menu. Good luck space explorer! 🚀",
        "Computer: F=Clear, Left-click=create, Right-click=info, WASD=move, QE=zoom. Mobile: Joystick=move, +/-=zoom. Menu: Top button > F=reset, O=mode toggle. Place objects and simulate. Enjoy your space journey! 🌌"
    ],
};
 
const followUpDatabase = {
    "comet": [
        "☄️ Amazing, isn't it? Want to create one right now?",
        "💫 Did you know Earth's water may have come from comets?",
        "🌠 Comets are like messengers from the early solar system!",
        "🚀 Can I help you create a comet with a perfect trajectory?",
        "❄️ The most famous is Halley, which visits every 76 years!",
        "⏱️ Have you ever seen a real comet? It's a magical experience!",
        "🎯 Fun fact: Comet nuclei are called 'dirty snowballs'",
        "📏 So, did you enjoy learning about these cosmic travelers?",
        "🔥 Extra tip: Comets with long orbits are the most spectacular",
        "🌌 Did you know there are interstellar comets from other systems?",
        "🔄 Want to simulate a comet impacting a planet? It's fascinating!",
        "⛰️ Icy asteroids are 'retired' comets, did you know?",
        "💧 Comet tails can stretch millions of kilometers!",
        "📊 Question: What's the brightest comet you've ever seen?",
        "✨ Can I teach you to create a meteor shower with comet debris?",
        "🎯 Tip: Use slow-motion mode to see a comet's close passage!",
        "🌡️ A comet's smell would be unbearable - ammonia and cyanide!",
        "🔄 Ever imagined riding a comet? It would be an icy adventure!",
        "⏳ Comets are time capsules from the early solar system!",
        "📈 How about creating a system with 10 simultaneous comets?"
    ],
    "black hole": [
        "🕳️ Fascinating and terrifying at the same time, don't you think?",
        "🌀 Want to try creating a black hole now? It's impressive!",
        "💥 Did you know the first was discovered in 1971?",
        "⏳ Careful not to fall into one! Just kidding... or not 😉",
        "📡 Have you seen a black hole simulation in VR mode?",
        "⚡ They're the densest objects in the universe!",
        "🌌 A black hole can distort even time itself!",
        "🔭 Tip: Use spectrum mode to see Hawking radiation",
        "🔄 Want to see how a black hole devours a star?",
        "💫 Did you know there are rogue black holes wandering the galaxy?",
        "⏱️ The largest known black hole has 66 billion solar masses!",
        "📈 Fun fact: Can black holes have hair? (in theoretical physics!)",
        "🌠 Did you know the Milky Way has a supermassive black hole?",
        "⚠️ Never bring your virtual ship close to one! (kidding)",
        "🔢 Question: What would you do if you encountered a real black hole?",
        "💥 Tip: Try creating a mini black hole with 1e12 solar masses",
        "🌡️ The accretion disk can be brighter than entire galaxies!",
        "🌀 Ever imagined crossing the event horizon?",
        "📏 Quasars are the universe's most powerful beacons!",
        "⚠️ Challenge: Try escaping a black hole's pull in the game!"
    ],
    "gravity": [
        "⚖️ It's the glue holding the universe together, don't you think?",
        "📏 Want to do a hands-on experiment right now?",
        "🌀 Einstein revolutionized everything with General Relativity!",
        "🪐 Without gravity, we wouldn't have stars or planets!",
        "📈 Did you know gravity is the weakest force?",
        "🌌 But it's the only one acting over infinite distances!",
        "🔄 How about increasing gravity to 300%? Beware the chaos!",
        "⚙️ Tip: Use low gravity to simulate diffuse nebulae",
        "🔭 Gravity controls everything - from apples to galaxies!",
        "📊 Fun fact: Gravity isn't a force but spacetime curvature!",
        "⏳ Question: What would you create with zero gravity?",
        "🌠 Ever tried 'negative gravity' mode? It's mind-blowing!",
        "🧮 Challenge: Try keeping a 100-body system stable!",
        "🔢 Did you know the Moon drifts 3.8 cm/year due to tides?",
        "⚠️ Warning: High gravity can crush your virtual planets!",
        "🌍 Without gravity, life as we know it wouldn't exist!",
        "💫 Tip: Use gravity to create flower-shaped orbits!",
        "📉 Did you know gravity travels at light speed?",
        "🌌 Ever imagined a universe with repulsive gravity?",
        "✨ Let's create a binary system with extreme gravity!"
    ],
    "star": [
        "⭐ They're the universe's element factories!",
        "🌞 Want to create a custom star right now?",
        "🌈 The Sun is just an average star among billions!",
        "💥 Neutron stars are cosmic lighthouses!",
        "⏳ Did you know dwarf stars live trillions of years?",
        "🔄 Binary systems are the most fascinating!",
        "🔭 The most massive known star has 300 solar masses!",
        "🌡️ Stellar cores are natural nuclear reactors!",
        "💫 Tip: Create twin stars with different colors!",
        "📊 Fun fact: 97% of stars die as white dwarfs!",
        "⚙️ Question: What's your favorite real-life star?",
        "✨ Rigel is 120,000 times brighter than the Sun!",
        "⚠️ Supernovae can outshine entire galaxies!",
        "🌠 Did you know the gold in your jewelry came from a supernova?",
        "🌍 Challenge: Create a stable 5-star system!",
        "🔥 Tip: Variable stars create amazing visual effects!",
        "🌀 Ever seen star birth in time-lapse mode?",
        "📈 The largest known star would fit Saturn's orbit!",
        "🔭 Did you know we can see stars from other galaxies?",
        "🌟 Let's create a supernova now? It's spectacular!"
    ],
    "planet": [
        "🪐 They're like cosmic jewels orbiting stars!",
        "🌍 Want to create a habitable planet now?",
        "🌡️ Jupiter protects Earth from asteroids - our guardian!",
        "🔄 Rogue planets wander the galaxy starless!",
        "🌋 Venus has volcanoes larger than any on Earth!",
        "❄️ Pluto has a subsurface ocean - despite being icy!",
        "🌫️ Titan's atmosphere is denser than Earth's!",
        "💧 Ocean exoplanets could be entirely aquatic!",
        "🔭 Tip: Create planets with extreme features!",
        "🛰️ Fun fact: Earth isn't perfectly round!",
        "⏱️ Question: What's your favorite solar system planet?",
        "📏 Mars has the solar system's largest volcano - Olympus Mons!",
        "🌌 Challenge: Create a ringed planet like Saturn!",
        "🧪 Did you know Jupiter glows in the dark? (faintly)",
        "🔢 Ganymede, Jupiter's moon, has its own magnetic field!",
        "💫 Tip: Diamond planets exist in real life!",
        "🌱 Let's try creating a world with 100% vegetation cover?",
        "🌋 Io, Jupiter's moon, has giant active volcanoes!",
        "🌀 Neptune and Uranus have diamond rain in their cores!",
        "📊 Did you know some planets are lighter than styrofoam?"
    ],
    "meteoroid": [
        "🌠 Want to create a meteor shower now?",
        "💫 Did you know the Moon is constantly bombarded by meteoroids?",
        "🪨 Can I teach you to simulate a meteoroid hitting a planet?",
        "⚠️ Beware large meteoroids - they can cause extinction events!",
        "✨ Tip: Use telescopes to detect meteoroids before they become threats",
        "🔭 Want to see how a meteoroid becomes a meteor in the atmosphere?",
        "🌌 Fun fact: The Chelyabinsk meteoroid was only 20m wide!",
        "🚀 Let's set up a planetary defense system against meteoroids?",
        "📈 Most meteoroids come from comets - how about creating a new comet?",
        "💥 Frequent impacts keep the Moon cratered - simulate millions of years!",
        "🌍 On Earth, thousands of tons of meteoroid dust fall annually",
        "🌟 Tip: Metallic meteoroids are the most dangerous - higher density!",
        "⏱️ Speed up time to see constant meteoroid showers",
        "🌠 The largest recorded meteoroid was 1km - would cause global extinction",
        "💫 Want me to calculate impact energy for a specific meteoroid?",
        "⚠️ Alert: Meteoroids >100m can cause tsunamis if they hit oceans",
        "✨ Let's create an early warning system for your virtual planet?",
        "🔭 Some meteoroids are fragments from Mars or Moon - detect by composition",
        "🌌 Want to increase meteoroid frequency to test defenses?",
        "🚀 Mission: Let's send a probe to intercept a meteoroid?"
    ],
    "space dust": [
        "🌌 Space dust is the foundation of star and planet formation!",
        "✨ Want to create an interstellar dust cloud now?",
        "💫 Interstellar dust consists of microscopic silicate/carbon grains!",
        "🔭 Let's simulate how dust affects background starlight?",
        "🌠 Fun fact: Interstellar dust can block up to 50% of distant starlight!",
        "🚀 Did you know space dust can be captured by spacecraft?",
        "📊 Tip: Use 'Dust Mode' to see interactions with starlight",
        "🌌 Cosmic dust is essential for planetesimal formation!",
        "💥 Want to see how dust clumps to form stars?",
        "🌡️ Interstellar dust temperatures range from 10K to 100K!",
        "🔄 Let's create a dark nebula full of cosmic dust?",
        "✨ Space dust also contains complex organic molecules!",
        "🌍 Did you know Earth receives tons of space dust annually?",
        "💫 Challenge: Try creating a high-density interstellar dust system!",
        "📈 Dust can influence galaxy formation - let's simulate it?",
        "🌠 Tip: Enable 'Dust Effects' to see brightness impacts",
        "🚀 Ever imagined traveling through a dense cosmic dust cloud?",
        "🔭 Let's explore how dust affects nearby planet orbits?",
        "💥 Fun fact: Interstellar dust may contain presolar grains!",
        "✨ Want to learn how dust forms protoplanetary disks?"
    ],
    "asteroid": [
        "🪨 Asteroids are the solar system's building blocks!",
        "🌌 Want to create an asteroid belt now?",
        "💫 Most asteroids are between Mars and Jupiter!",
        "🔭 Let's simulate an asteroid collision?",
        "🌠 Fun fact: Largest asteroid Ceres is considered a dwarf planet!",
        "🚀 Did you know some asteroids have their own moons?",
        "📊 Tip: Use 'Belt Mode' to see orbital interactions",
        "🌍 Asteroids could be sources of precious metals - let's virtual-mine!",
        "💥 Want to see how an asteroid impact affects Earth?",
        "🌡️ Asteroid temperatures vary with solar distance!",
        "🔄 Let's create a system with 100 asteroids orbiting a star?",
        "✨ Asteroids are remnants of solar system formation!",
        "🌌 Did you know interstellar asteroids pass through our system?",
        "💫 Challenge: Try creating a stable asteroid orbit for 1 million years!",
        "📈 Most asteroids are rock/metal - explore compositions?",
        "🌠 Tip: Enable 'Impact Effects' for realistic collision explosions",
        "🚀 Ever imagined spacecraft travel through an asteroid belt?",
        "🔭 Let's study how asteroids affect nearby planets' gravity?",
        "💥 Fun fact: The Chicxulub impact caused dinosaur extinction!",
        "✨ Want to learn how asteroids could become resources?"
    ],
    "nebula": [
        "🌌 Nebulae are the universe's stellar nurseries!",
        "✨ Want to create a nebula right now?",
        "💫 Nebulae consist of interstellar gas and dust!",
        "🔭 Let's simulate star birth inside a nebula?",
        "🌠 Fun fact: Orion Nebula is one of Earth's closest!",
        "🚀 Did you know some nebulae are supernova remnants?",
        "📊 Tip: Use 'Nebula Mode' to see light-gas interactions",
        "🌍 Nebulae may contain organic molecules - life's building blocks!",
        "💥 Want to see how gravity forms stars in nebulae?",
        "🌡️ Nebula temperatures range between 10K-100K!",
        "🔄 Let's create a planetary nebula with a hot core?",
        "✨ Nebulae are crucial for new solar systems!",
        "🌌 Did you know dark nebulae block starlight?",
        "💫 Challenge: Try creating multi-colored nebula shapes!",
        "📈 Most nebulae are hydrogen, helium and cosmic dust!",
        "🌠 Tip: Enable 'Light Effects' for starlight filtering",
        "🚀 Ever imagined traveling through a star-forming nebula?",
        "🔭 Let's study how nebulae affect galaxy evolution?",
        "💥 Fun fact: Crab Nebula is a famous supernova remnant!",
        "✨ Want to learn how nebulae form new stars?"
    ],
    "planetoid": [
        "🪐 Planetoids are small rocky/icy space bodies!",
        "🌌 Want to create a planetoid now?",
        "💫 Smaller than planets but larger than meteoroids!",
        "🔭 Let's simulate a planetoid orbiting a star?",
        "🌠 Fun fact: Pluto is considered a planetoid/dwarf planet!",
        "🚀 Did you know Kuiper Belt has planetoids beyond Neptune?",
        "📊 Tip: Use 'Planetoid Mode' to see gravity interactions",
        "🌍 Planetoids can have thin atmospheres - let's explore!",
        "💥 Want to see a planetoid collide with another body?",
        "🌡️ Planetoid temperatures vary with solar distance!",
        "🔄 Let's create a multi-planetoid system?",
        "✨ Planetoids are solar system formation remnants!",
        "🌌 Did you know interstellar planetoids pass through?",
        "💫 Challenge: Create a stable planetoid orbit for 1 million years!",
        "📈 Most planetoids are rock/ice - explore compositions?",
        "🌠 Tip: Enable 'Impact Effects' for collision visuals",
        "🚀 Ever imagined spacecraft travel through planetoid belts?",
        "🔭 Let's study how planetoids affect nearby gravity?",
        "💥 Fun fact: Largest known planetoid is Ceres in asteroid belt!",
        "✨ Want to learn how planetoids could become resources?"
    ],
    "gas giant": [
        "🌌 Gas giants are colossal and fascinating!",
        "✨ Want to create a gas giant now?",
        "💫 Made mostly of hydrogen and helium!",
        "🔭 Let's simulate a gas giant's turbulent atmosphere?",
        "🌠 Fun fact: Jupiter is our largest gas giant!",
        "🚀 Did you know gas giants have thin rings and many moons?",
        "📊 Tip: Use 'Gas Giant Mode' for cloud formation visuals",
        "🌍 Gas giants have no solid surface - just gas!",
        "💥 Want to see how giant storms form?",
        "🌡️ Temperatures vary with atmospheric depth!",
        "🔄 Let's create a multi-gas-giant system?",
        "✨ Gas giants are crucial for solar system dynamics!",
        "🌌 Did you know exoplanet gas giants exist?",
        "💫 Challenge: Create a gas giant with spectacular rings!",
        "📈 Most have rocky/metallic cores!",
        "🌠 Tip: Enable 'Storm Effects' for giant hurricanes",
        "🚀 Ever imagined flying through gas giant clouds?",
        "🔭 Let's study how they affect nearby orbits?",
        "💥 Fun fact: Neptune has the solar system's fastest winds!",
        "✨ Want to learn how gas giants form complex systems?"
    ],
    "brown dwarf": [
        "🌌 Brown dwarfs are failed stars - no nuclear fusion!",
        "✨ Want to create a brown dwarf now?",
        "💫 Mass between 13-80 Jupiters!",
        "🔭 Let's simulate a brown dwarf's dense atmosphere?",
        "🌠 Fun fact: Brown dwarfs emit infrared light!",
        "🚀 Did you know brown dwarfs can have orbiting planets?",
        "📊 Tip: Use 'Brown Dwarf Mode' for gravity interactions",
        "🌍 Cooler than normal stars - under 1000K!",
        "💥 Want to see one capture interstellar matter?",
        "🌡️ Temperatures vary by mass/age!",
        "🔄 Let's create a multi-brown-dwarf system?",
        "✨ Brown dwarfs are stellar formation remnants!",
        "🌌 Did you know rogue brown dwarfs wander the galaxy?",
        "💫 Challenge: Create one with a protoplanetary disk!",
        "📈 Most have methane/water-rich atmospheres!",
        "🌠 Tip: Enable 'Radiation Effects' for environmental impact",
        "🚀 Ever imagined studying a brown dwarf up close?",
        "🔭 Let's study orbital effects on nearby planets?",
        "💥 Fun fact: Brown dwarfs may outnumber stars!",
        "✨ Want to learn how brown dwarfs form and evolve?"
    ],
    "red dwarf": [
        "🌌 Red dwarfs are the universe's most common stars!",
        "✨ Want to create a red dwarf now?",
        "💫 Small, cool and low luminosity!",
        "🔭 Let's simulate a planet orbiting one?",
        "🌠 Fun fact: Can live trillions of years!",
        "🚀 Did you know many exoplanets orbit red dwarfs?",
        "📊 Tip: Use 'Red Dwarf Mode' for planetary impact visuals",
        "🌍 Stable with potentially habitable close zones!",
        "💥 Want to see intense solar flares?",
        "🌡️ Temperatures between 2000K-4000K!",
        "🔄 Let's create a multi-red-dwarf system?",
        "✨ Essential for extraterrestrial life searches!",
        "🌌 Did you know some host rocky planets in habitable zones?",
        "💫 Challenge: Create a red dwarf with habitable planet!",
        "📈 Most have hydrogen/helium atmospheres!",
        "🌠 Tip: Enable 'Radiation Effects' for environmental impact",
        "🚀 Ever imagined close-up study of a red dwarf?",
        "🔭 Let's study orbital effects on nearby planets?",
        "💥 Fun fact: Red dwarfs are cooler than Sun but still bright!",
        "✨ Want to learn how red dwarfs form and evolve?"
    ],
    "giant star": [
        "🌌 Giant stars are enormous and brilliant!",
        "✨ Want to create a giant star now?",
        "💫 Mass between 10-100 Suns!",
        "🔭 Let's simulate their intense nuclear fusion?",
        "🌠 Fun fact: Diameters can be hundreds of times Sun's!",
        "🚀 Did you know they become supernovae?",
        "📊 Tip: Use 'Giant Star Mode' for planetary impact visuals",
        "🌍 Have dense atmospheres and orbiting planets!",
        "💥 Want to see mass loss in stellar winds?",
        "🌡️ Temperatures between 3000K-6000K!",
        "🔄 Let's create a multi-giant-star system?",
        "✨ Crucial for heavy element formation!",
        "🌌 Did you know some have rings?",
        "💫 Challenge: Create a giant star with gas giant planet!",
        "📈 Most have hydrogen/helium atmospheres!",
        "🌠 Tip: Enable 'Radiation Effects' for environmental impact",
        "🚀 Ever imagined studying a giant star up close?",
        "🔭 Let's study orbital effects on nearby planets?",
        "💥 Fun fact: Giant stars precede the brightest supernovae!",
        "✨ Want to learn how giant stars form and evolve?"
    ],
    "hypergiant": [
        "🌌 Hypergiants are the most massive and luminous stars in the universe!",
        "✨ Want to create a hypergiant right now?",
        "💫 They have masses over 100 times that of the Sun!",
        "🔭 Let's simulate the extreme nuclear fusion of a hypergiant?",
        "🌠 Fun fact: Hypergiants can have diameters thousands of times larger than the Sun!",
        "🚀 Did you know hypergiants lose mass through intense stellar winds?",
        "📊 Tip: Use 'Hypergiant Mode' to see their effects on nearby planets",
        "🌍 Hypergiants have dense atmospheres and can host orbiting planets!",
        "💥 Want to see how a hypergiant becomes a bright supernova?",
        "🌡️ Hypergiant temperatures range between 3000K-6000K!",
        "🔄 Let's create a system with multiple hypergiants orbiting a larger star?",
        "✨ Hypergiants are essential for heavy element formation in the universe!",
        "🌌 Did you know some hypergiants may have rings?",
        "💫 Challenge: Try creating a system with a hypergiant and a gas giant planet!",
        "📈 Most hypergiants have hydrogen/helium-rich atmospheres!",
        "🌠 Tip: Enable 'Radiation Effects' to see environmental impacts",
        "🚀 Ever imagined traveling to study a hypergiant up close?",
        "🔭 Let's study how hypergiants affect nearby planetary orbits?",
        "💥 Fun fact: Hypergiants precede the brightest supernovae in the universe!",
        "✨ Want to learn how hypergiants form and evolve?"
    ],
    "massive star": [
        "🌌 Massive stars are the giants of the universe!",
        "✨ Want to create a massive star right now?",
        "💫 They have masses over 8 times that of the Sun!",
        "🔭 Let's simulate the intense nuclear fusion of a massive star?",
        "🌠 Fun fact: Massive stars can have diameters tens of times larger than the Sun!",
        "🚀 Did you know massive stars become supernovae at the end of their lives?",
        "📊 Tip: Use 'Massive Star Mode' to see planetary effects",
        "🌍 Massive stars have dense atmospheres and can host planets!",
        "💥 Want to see mass loss through stellar winds?",
        "🌡️ Temperatures range between 3000K-6000K!",
        "🔄 Let's create a system with multiple massive stars?",
        "✨ Massive stars are crucial for heavy element formation!",
        "🌌 Did you know some may have rings?",
        "💫 Challenge: Create a system with a massive star and gas giant!",
        "📈 Most have hydrogen/helium-rich atmospheres!",
        "🌠 Tip: Enable 'Radiation Effects' to see environmental impacts",
        "🚀 Ever imagined close-up study of a massive star?",
        "🔭 Let's study orbital effects on nearby planets?",
        "💥 Fun fact: Massive stars lead to the brightest supernovae!",
        "✨ Want to learn how massive stars form and evolve?"
    ],
    "hypermassive star": [
        "🌌 Hypermassive stars are extremely massive and luminous!",
        "✨ Want to create a hypermassive star right now?",
        "💫 Masses exceed 100 solar masses!",
        "🔭 Let's simulate extreme nuclear fusion?",
        "🌠 Fun fact: Diameters can be thousands of times larger than the Sun!",
        "🚀 Did you know they lose mass through intense stellar winds?",
        "📊 Tip: Use 'Hypermassive Mode' for planetary impact visuals",
        "🌍 They can host orbiting planets!",
        "💥 Want to see how they become brilliant supernovae?",
        "🌡️ Temperatures between 3000K-6000K!",
        "🔄 Let's create a multi-hypermassive star system?",
        "✨ Essential for heavy element formation!",
        "🌌 Some may have rings around them!",
        "💫 Challenge: Create a system with hypermassive star and gas giant!",
        "📈 Most have hydrogen/helium-rich atmospheres!",
        "🌠 Tip: Enable 'Radiation Effects' for environmental impact",
        "🚀 Ever imagined studying one up close?",
        "🔭 Let's study effects on nearby planetary orbits?",
        "💥 Fun fact: They precede the universe's brightest supernovae!",
        "✨ Want to learn about their formation and evolution?"
    ],
    "white dwarf": [
        "🌌 White dwarfs are remnants of stars that exhausted their fuel!",
        "✨ Want to create a white dwarf now?",
        "💫 Solar mass compressed into Earth-sized object!",
        "🔭 Let's simulate a white dwarf's slow cooling over time?",
        "🌠 Fun fact: One teaspoon weighs tons - they're super dense!",
        "🚀 Did you know they can have thin helium/hydrogen atmospheres?",
        "📊 Tip: Use 'White Dwarf Mode' for interaction visuals",
        "🌍 This is the Sun's ultimate fate!",
        "💥 Want to see one accreting matter from a companion star?",
        "🌡️ Temperatures range from 5000K to 100,000K!",
        "🔄 Let's create a multi-white-dwarf system?",
        "✨ Crucial for understanding stellar evolution!",
        "🌌 Some may explode as Type Ia supernovae!",
        "💫 Challenge: Create a system with white dwarf and rocky planet!",
        "📈 Most have carbon/oxygen-rich atmospheres!",
        "🌠 Tip: Enable 'Cooling Effects' to see heat loss over time",
        "🚀 Ever imagined close-up study of a white dwarf?",
        "🔭 Let's study orbital effects on nearby planets?",
        "💥 Fun fact: Final remnants of non-supernova stars!",
        "✨ Want to learn about their formation and evolution?"
    ],
    "helium white dwarf": [
        "🌌 Helium white dwarfs are remnants of helium-burning stars!",
        "✨ Want to create one now?",
        "💫 Solar mass compressed into ultra-dense Earth-sized object!",
        "🔭 Simulate slow cooling over billions of years?",
        "🌠 Fun fact: One teaspoon weighs tons - extreme density!",
        "🚀 Did you know they have thin helium atmospheres?",
        "📊 Tip: Use 'Helium White Dwarf Mode' for interactions",
        "🌍 Final fate of stars that burned helium in their cores!",
        "💥 Want to see matter accretion from companion stars?",
        "🌡️ Temperatures: 5000K-100,000K!",
        "🔄 Create a multi-helium-white-dwarf system?",
        "✨ Essential for stellar evolution understanding!",
        "🌌 Some may explode as Type Ia supernovae!",
        "💫 Challenge: System with helium white dwarf and rocky planet!",
        "📈 Most have helium/carbon-rich atmospheres!",
        "🌠 Tip: Enable 'Cooling Effects' to visualize heat loss",
        "🚀 Imagine studying one up close with a spacecraft?",
        "🔭 Study orbital effects on nearby planets?",
        "💥 Fun fact: Final remnants of helium-burning stars!",
        "✨ Want to learn about their formation and evolution?"
    ],
    "carbon white dwarf": [
        "🌌 Carbon white dwarfs are remnants of carbon-burning stars!",
        "✨ Want to create one now?",
        "💫 Ultra-dense Earth-sized objects!",
        "🔭 Simulate slow cooling over cosmic timescales?",
        "🌠 Fun fact: One teaspoon weighs billions of tons!",
        "🚀 Did you know they may have thin carbon atmospheres?",
        "📊 Tip: Use 'Carbon White Dwarf Mode' for interactions",
        "🌍 Final fate of stars that burned carbon cores!",
        "💥 Want to see matter accretion from companions?",
        "🌡️ Temperatures: 5000K-100,000K!",
        "🔄 Create multi-carbon-white-dwarf system?",
        "✨ Key to understanding stellar evolution!",
        "🌌 Some may explode as Type Ia supernovae!",
        "💫 Challenge: System with carbon white dwarf + rocky planet!",
        "📈 Most have carbon/oxygen-rich atmospheres!",
        "🌠 Tip: Enable 'Cooling Effects' for heat loss visualization",
        "🚀 Imagine close-up study with a spacecraft?",
        "🔭 Study orbital effects on nearby planets?",
        "💥 Fun fact: Final remnants of carbon-burning stars!",
        "✨ Want to learn about their formation and evolution?"
    ],
    "black dwarf": [
        "🌌 Black dwarfs are white dwarfs after trillions of years of cooling!",
        "✨ Want to create a theoretical black dwarf?",
        "💫 Completely cooled stellar remnants - emit no visible light!",
        "🔭 Simulate cooling from white dwarf to black dwarf?",
        "🌠 Fun fact: Too cold to observe directly!",
        "🚀 Did you know none exist yet? Universe isn't old enough!",
        "📊 Tip: Use 'Black Dwarf Mode' for long-term simulations",
        "🌍 Ultimate fate of Sun-like stars!",
        "💥 Want to see the transformation process?",
        "🌡️ Near absolute zero temperatures - invisible!",
        "🔄 Create system with multiple black dwarfs?",
        "✨ Essential for long-term stellar evolution!",
        "🌌 Will take trillions of years to form!",
        "💫 Challenge: System with black dwarf and rocky planets!",
        "📈 Most will have extremely thin/no atmospheres!",
        "🌠 Tip: Enable 'Cooling Effects' for visualization",
        "🚀 Imagine studying one theoretically?",
        "🔭 Study orbital effects over cosmic timescales?",
        "💥 Fun fact: The final end of stellar evolution!",
        "✨ Want to learn about their theoretical formation?"
    ],
    "quasar": [
        "🌌 Quasars are bright galactic cores powered by supermassive black holes!",
        "✨ Want to create a quasar now?",
        "💫 Emit intense radiation from accretion disks!",
        "🔭 Simulate quasar radiation emission?",
        "🌠 Fun fact: Can be billions of times brighter than the Sun!",
        "🚀 Did you know they're among the most luminous objects?",
        "📊 Tip: Use 'Quasar Mode' for galactic impact visuals",
        "🌍 Found in distant active galactic nuclei!",
        "💥 Want to see relativistic jets of matter?",
        "🌡️ Temperatures can exceed billions of Kelvin!",
        "🔄 Create system with quasar + orbiting galaxies?",
        "✨ Crucial for understanding galaxy evolution!",
        "🌌 Can be used to study universe expansion!",
        "💫 Challenge: Create quasar with accretion disk and jets!",
        "📈 Most have supermassive cores (millions-billions solar masses)!",
        "🌠 Tip: Enable 'Radiation Effects' for environmental impact",
        "🚀 Imagine traveling to study a distant quasar?",
        "🔭 Study how quasars affect galaxy formation?",
        "💥 Fun fact: More common in the early universe!",
        "✨ Want to learn about quasar formation and evolution?"
    ],
    "wormhole": [
        "🌌 Wormholes are theoretical spacetime tunnels!",
        "✨ Want to create a wormhole now?",
        "💫 Connect distant points in the universe!",
        "🔭 Simulate spacetime curvature around a wormhole?",
        "🌠 Fun fact: Solutions to Einstein's field equations!",
        "🚀 Did you know they could enable faster-than-light travel?",
        "📊 Tip: Use 'Wormhole Mode' for spacetime distortion visuals",
        "🌍 Purely hypothetical - never observed!",
        "💥 Want to see light distortion effects?",
        "🌡️ Theoretical temperature varies by structure!",
        "🔄 Create system connecting two spacetime regions?",
        "✨ Essential for relativity and cosmology studies!",
        "🌌 Could theoretically enable time travel!",
        "💫 Challenge: Create stable wormhole and explore properties!",
        "📈 No physical representation exists!",
        "🌠 Tip: Enable 'Curvature Effects' for distortion visuals",
        "🚀 Imagine traveling through one to another galaxy?",
        "🔭 Study effects on spacetime structure?",
        "💥 Fun fact: Popular in sci-fi as dimensional portals!",
        "✨ Want to learn about wormhole theory and implications?"
    ],
    "neutron star": [
        "🌌 Neutron stars are super-dense supernova remnants!",
        "✨ Want to create one now?",
        "💫 Composed almost entirely of neutrons!",
        "🔭 Simulate intense gravity effects?",
        "🌠 Fun fact: One teaspoon weighs billions of tons!",
        "🚀 Did you know they can emit radiation beams (pulsars)?",
        "📊 Tip: Use 'Neutron Star Mode' for gravitational effects",
        "🌍 Formed when massive stars collapse!",
        "💥 Want to see powerful gamma-ray emissions?",
        "🌡️ Temperatures can exceed millions of Kelvin!",
        "🔄 Create system with neutron star + planets?",
        "✨ Crucial for understanding nuclear physics!",
        "🌌 Some become pulsars or magnetars!",
        "💫 Challenge: Create one with intense magnetic field!",
        "📈 Masses typically 1.4-2.16 solar masses!",
        "🌠 Tip: Enable 'Magnetic Effects' for environmental impact",
        "🚀 Imagine close-up study with spacecraft?",
        "🔭 Study effects on galaxy formation?",
        "💥 Fun fact: Densest known objects in the universe!",
        "✨ Want to learn about their formation and evolution?"
    ],
    "magnetar": [
        "🌌 Magnetars are neutron stars with extreme magnetic fields!",
        "✨ Want to create one now?",
        "💫 Magnetic fields trillions of times Earth's!",
        "🔭 Simulate intense radiation emission?",
        "🌠 Fun fact: Emit powerful gamma-ray bursts (SGRs)!",
        "🚀 Did you know they affect space with magnetic waves?",
        "📊 Tip: Use 'Magnetar Mode' for magnetic field visuals",
        "🌍 Formed from neutron star collapse!",
        "💥 Want to see relativistic matter jets?",
        "🌡️ Temperatures can exceed millions of Kelvin!",
        "🔄 Create system with magnetar + planets?",
        "✨ Essential for magnetic physics studies!",
        "🌌 May be associated with pulsars!",
        "💫 Challenge: Create magnetar with intense magnetic field!",
        "📈 Masses typically 1.4-2.16 solar masses!",
        "🌠 Tip: Enable 'Magnetic Effects' for visualization",
        "🚀 Imagine studying one up close?",
        "🔭 Study effects on galaxy formation?",
        "💥 Fun fact: Most magnetic objects known!",
        "✨ Want to learn about magnetar formation and evolution?"
    ],
    "quark star": [
        "🌌 Quark stars are hypothetical neutron star successors!",
        "✨ Want to create one now?",
        "💫 Composed of quark-gluon plasma!",
        "🔭 Simulate extreme density effects?",
        "🌠 Fun fact: Potentially denser than neutron stars!",
        "🚀 Did you know none have been observed?",
        "📊 Tip: Use 'Quark Star Mode' for exotic matter visuals",
        "🌍 Formed from further neutron star collapse!",
        "💥 Want to see intense radiation emission?",
        "🌡️ Theoretical temperature varies by structure!",
        "🔄 Create system with quark star + planets?",
        "✨ Crucial for particle physics studies!",
        "🌌 May have unique quantum properties!",
        "💫 Challenge: Create one and explore exotic properties!",
        "📈 Purely theoretical - no physical representation!",
        "🌠 Tip: Enable 'Exotic Effects' for spacetime distortion",
        "🚀 Imagine traveling through a quark star core?",
        "🔭 Study effects on spacetime structure?",
        "💥 Fun fact: One of modern astrophysics' mysteries!",
        "✨ Want to learn about quark star theory?"
    ]
};

const contextFollowUpsEN = {
    "default": [
        "✨ What did you think of this cosmic explanation?",
        "🚀 Can I help with anything else?",
        "🌌 Fascinating, isn't it? The universe is amazing!",
        "💫 Want to explore this topic further?",
        "🔭 Happy to share cosmic knowledge!",
        "🪐 Any additional questions about this?",
        "🌟 We learned something incredible today, don't you think?",
        "⚡ The universe never ceases to amaze!",
        "🌠 Want me to elaborate on any aspect?",
        "🌀 Let's create something together now?",
        "📡 Your curiosity fuels discovery!",
        "🌍 What fascinates you most about the cosmos?",
        "☄️ Ready for your next stellar question?",
        "🛸 Remember: Every question is a cosmic journey!",
        "💥 Want to try a hands-on experiment?",
        "⏳ Knowledge is the true time machine!",
        "📊 Want me to show how to apply this in-game?",
        "🌡️ Your questions warm my AI core!",
        "🔢 Let's calculate something together?",
        "🌈 The universe thanks your curiosity!"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
    affirmativeResponses: ["yes", "y", "ok", "please"],
    negativeResponses: ["n", "no", "negative", "nope", "later"],
    
    positiveResponses : {
    "black hole": [
        "🌌 Let's simulate! First, create a star with 1e30 masses near a black hole...",
        "💥 Great! Drag a star to the accretion disk and enable slow-motion to see the spectacle",
        "⚠️ Note: Enable 'Relativistic Effects' in Options > Physics to see spacetime deformation",
        "🔥 Tip: Use stars >20 solar masses for more dramatic matter ejections",
        "🕳️ Step-by-step: 1) Create black hole 2) Add nearby star 3) Increase gravity to 200%",
        "⏱️ Speed up time 10000x to see the entire process in seconds",
        "📡 Remember to enable 'Thermal Zones' to see superheated plasma (>1 million °C)",
        "🌀 Fun fact: This process can take hours to millions of years in real cosmic time",
        "💫 For stunning visuals, use supermassive black holes (>1e15 masses)",
        "🌠 Try different approach angles to see varied disk patterns"
    ],
    "comet": [
        "☄️ Let's go! Select 'Create Celestial Bodies' > 'Comet' and set temperature to -70°C...",
        "💧 Tip: Comets with high water content (>60%) create brighter tails",
        "🚀 Drag mouse to add angular velocity - affects nucleus rotation",
        "❄️ To see sublimation, bring comet near O or B class star",
        "🌌 Try high eccentricities: >0.9 for elongated orbits",
        "⏱️ Use 100000x mode to see multiple orbits quickly",
        "🔭 Enable 'Show Vectors' to visualize gravitational forces",
        "🌠 Fun fact: Each stellar passage reduces comet mass by 0.01%",
        "🪐 Try capturing comet with virtual Jupiter - mass > 1e27 units",
        "📈 Advanced tip: Comets in 2:1 resonance with planets have stable orbits"
    ],
    "gravity": [
        "⚖️ Let's experiment! Go to Menu > Physics > Gravitational Constant...",
        "🌌 Try 10% to simulate nebulae or 300% for dense stellar systems",
        "💥 Warning: Values >500% may cause instabilities in complex systems",
        "🔄 Tip: Binary systems with high gravity evolve faster",
        "🪐 To see gravitational waves, create two nearby black holes",
        "🌠 Enable 'Force Visualization' (F3) to see gravitational fields",
        "📉 Try reducing gravity during planetary migration",
        "🌀 Interesting effect: High gravity + fast rotation creates flattened planets",
        "🔭 Remember: Black holes have fixed 1000x gravitational multiplier",
        "💫 Challenge: Create stable system with 20 bodies at 200% gravity"
    ],
    "star": [
        "⭐ Let's create! Select 'Stellar Bodies' and choose type...",
        "🌞 For Sun-like star: mass ~1.989e30 kg (1 solar unit)",
        "💥 Tip: Stars >20 solar masses explode as supernovae",
        "🌈 Set temperature >30,000K for intense blue stars",
        "🔄 Try binary systems with mass transfer",
        "🌌 Use high metallicity for Population I stars (young)",
        "⏱️ Speed up time to see full stellar evolution",
        "⚠️ Warning: Stars >100 solar masses may be unstable",
        "🔭 Enable 'Stellar Evolution' in Options to see transformations",
        "🌠 For neutron stars, create supernovae with mass >1.4 solar"
    ],
    "planet": [
        "🪐 Let's go! Menu 'Planetary Bodies' > Choose type...",
        "🌍 For habitable planet: place in green zone, water 50%, atmosphere 80%",
        "🌋 Try extreme compositions: carbon or iron planets",
        "🌀 Adjust rotation period to see climate and shape effects",
        "💫 Tip: Gas giants need mass >105K units",
        "🌌 Create systems with planetary migration enabled",
        "🌠 For planetary rings, adjust thickness and density in features menu",
        "⚠️ Moons too close disintegrate at Roche distance",
        "🔭 Use 'Observatory Mode' (O) to see surface details",
        "🌡️ Try extreme temperatures for automatic class changes"
    ],
    "meteoroid": [
        "🌠 Let's create a meteoroid! Go to 'Create Celestial Bodies' > 'Meteoroid'...",
        "💫 Tip: Adjust density for different impact effects",
        "🪨 Use slow-motion to observe atmospheric entry",
        "⚠️ Warning: Large meteoroids (>100m) can cause mass extinctions",
        "🌌 Try different compositions: metallic, rocky, icy",
        "🔭 Enable 'Impact Trajectory' to see possible collisions",
        "📈 Speed up time to see meteor showers in action",
        "🌠 Fun fact: Meteoroids are fragments of asteroids or comets",
        "💥 For explosion simulation, set entry velocity >20 km/s",
        "🌀 Challenge: Create system with 10 meteoroids colliding simultaneously"
    ],
    "meteor": [
        "🌠 Let's create a meteor! Go to 'Create Celestial Bodies' > 'Meteor'...",
        "💫 Tip: Adjust density for different impact effects",
        "🪨 Use slow-motion to observe atmospheric entry",
        "⚠️ Warning: Large meteoroids (>100m) can cause mass extinctions",
        "🌌 Try different compositions: metallic, rocky, icy",
        "🔭 Enable 'Impact Trajectory' to see possible collisions",
        "📈 Speed up time to see meteor showers in action",
        "🌠 Fun fact: Meteoroids are fragments of asteroids or comets",
        "💥 For explosion simulation, set entry velocity >20 km/s",
        "🌀 Challenge: Create system with 10 meteoroids colliding simultaneously"
    ],
    "gas giant": [
        "🌌 Let's create a gas giant! Go to 'Create Celestial Bodies' > 'Gas Giant'...",
        "💫 Tip: Adjust mass for different atmospheric effects",
        "🌀 Use slow-motion to observe giant storms",
        "⚠️ Warning: Very massive gas giants (>10x Jupiter) may become brown dwarfs",
        "🌠 Try different atmospheric compositions: hydrogen, helium, methane",
        "🔭 Enable 'Planetary Rings' to add rings to your giant",
        "📈 Speed up time to see atmospheric evolution",
        "🌌 Fun fact: Jupiter has had a storm larger than Earth for centuries!",
        "💥 To simulate auroras, adjust planet's magnetic field",
        "🪐 Challenge: Create system with 5 gas giants orbiting a star"
    ],
    "asteroid": [
        "🪨 Let's create an asteroid! Go to 'Create Celestial Bodies' > 'Asteroid'...",
        "🌌 Tip: Adjust density for different rocky compositions",
        "💫 Use slow-motion to observe collisions with planets",
        "⚠️ Warning: Large asteroids (>1 km) can cause mass extinctions",
        "🌠 Try different orbits: elliptical, circular, inclined",
        "🔭 Enable 'Impact Trajectory' to see possible collisions",
        "📈 Speed up time to see asteroid migration",
        "🌀 Fun fact: The asteroid belt between Mars and Jupiter contains millions of bodies!",
        "💥 For explosion simulation, set impact velocity >20 km/s",
        "🌌 Challenge: Create system with 10 asteroids colliding simultaneously"
    ],
    "planetoid": [
        "🪐 Let's create a planetoid! Go to 'Create Celestial Bodies' > 'Planetoid'...",
        "🌌 Tip: Adjust mass for different geological features",
        "💫 Use slow-motion to observe rotation and tectonics",
        "⚠️ Warning: Very massive planetoids may become dwarf planets",
        "🌠 Try different compositions: ice, rock, metal",
        "🔭 Enable 'Planetary Rings' to add rings",
        "📈 Speed up time to see geological evolution",
        "🌀 Fun fact: Pluto is considered a planetoid by many astronomers!",
        "💥 For impact simulation, set collision velocity >10 km/s",
        "🌌 Challenge: Create system with 5 planetoids orbiting a star"
    ],
    "wormhole": [
        "🌀 Let's create a wormhole! Go to 'Create Celestial Bodies' > 'Wormhole'...",
        "🌌 Tip: Adjust negative mass for different distortion effects",
        "💫 Use slow-motion to observe spacetime curvature",
        "⚠️ Note: Wormholes are theoretical and unstable in reality",
        "🌠 Try different entry/exit points in spacetime",
        "🔭 Enable 'Relativistic Effects' to see light distortion",
        "📈 Speed up time to see wormhole evolution",
        "🌀 Fun fact: Wormholes could connect distant points in the universe!",
        "💥 For instant travel simulation, adjust distance between points",
        "🌌 Challenge: Create system with 3 wormholes connecting galaxies"
    ],
    "habitable zone": [
        "🌍 Let's create a habitable zone! Go to 'Create Celestial Bodies' > 'Habitable Zone'...",
        "💫 Tip: Adjust distance from star for different habitable zones",
        "🌌 Use slow-motion to observe atmosphere formation",
        "⚠️ Warning: Zones too close may be affected by intense radiation",
        "🌠 Try different atmospheric compositions: oxygen, nitrogen, water vapor",
        "🔭 Enable 'Climate Effects' to see storms and atmospheric patterns",
        "📈 Speed up time to see evolution of habitable zone",
        "🌀 Fun fact: Earth has been in Sun's habitable zone for billions of years!",
        "💥 To simulate life, set average temperature between 0°C and 100°C",
        "🌌 Challenge: Create system with 5 habitable zones orbiting a star"
    ],
    "quasar": [
        "🌌 Let's create a quasar! Go to 'Create Celestial Bodies' > 'Quasar'...",
        "💫 Tip: Adjust quasar mass to control its galactic influence",
        "🌠 Use slow-motion to observe intense radiation emission",
        "⚠️ Warning: Quasars are extremely luminous and can outshine entire galaxies",
        "🌟 Try different matter compositions in accretion disk",
        "🔭 Enable 'Relativistic Effects' to see light distortion",
        "📈 Speed up time to see quasar evolution",
        "🌀 Fun fact: Quasars are the most luminous objects in the universe!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 quasars connecting distant galaxies"
    ],
    "brown dwarf": [
        "🌌 Let's create a brown dwarf! Go to 'Create Celestial Bodies' > 'Brown Dwarf'...",
        "💫 Tip: Adjust mass for different atmospheric characteristics",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Note: Brown dwarfs are intermediate objects between stars and planets",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion visuals",
        "📈 Speed up time to see brown dwarf evolution",
        "🌀 Fun fact: Brown dwarfs lack sustained nuclear fusion like stars!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 brown dwarfs orbiting a star"
    ],
    "red dwarf": [
        "🌌 Let's create a red dwarf! Go to 'Create Celestial Bodies' > 'Red Dwarf'...",
        "💫 Tip: Adjust mass for different atmospheric features",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Note: Red dwarfs are the most common stars in the universe",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see red dwarf evolution",
        "🌀 Fun fact: Red dwarfs can live trillions of years!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 5 red dwarfs orbiting a star"
    ],
    "giant star": [
        "🌌 Let's create a giant star! Go to 'Create Celestial Bodies' > 'Giant Star'...",
        "💫 Tip: Adjust mass for different atmospheric characteristics",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Warning: Giant stars are much larger than Sun and may become supernovae",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar evolution",
        "🌀 Fun fact: Giant stars can be up to 1000x Sun's diameter!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 giant stars orbiting a star"
    ],
    "hypergiant": [
        "🌌 Let's create a hypergiant! Go to 'Create Celestial Bodies' > 'Hypergiant'...",
        "💫 Tip: Adjust mass for different atmospheric features",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Warning: Hypergiants are the most massive known stars and may become supernovae",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see hypergiant evolution",
        "🌀 Fun fact: Hypergiants can be up to 1000x Sun's diameter!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 hypergiants orbiting a star"
    ],
    "massive star": [
        "🌌 Let's create a massive star! Go to 'Create Celestial Bodies' > 'Massive Star'...",
        "💫 Tip: Adjust mass for different atmospheric characteristics",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Warning: Massive stars are larger than Sun and may become supernovae",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar evolution",
        "🌀 Fun fact: Massive stars can be up to 100x Sun's diameter!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 massive stars orbiting a star"
    ],
    "hypermassive star": [
        "🌌 Let's create a hypermassive star! Go to 'Create Celestial Bodies' > 'Hypermassive Star'...",
        "💫 Tip: Adjust mass for different atmospheric features",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Warning: Hypermassive stars are extremely massive and may become supernovae",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar evolution",
        "🌀 Fun fact: Hypermassive stars can be up to 1000x Sun's diameter!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 hypermassive stars orbiting a star"
    ],
    "white dwarf": [
        "🌌 Let's create a white dwarf! Go to 'Create Celestial Bodies' > 'White Dwarf'...",
        "💫 Tip: Adjust mass for different atmospheric characteristics",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Note: White dwarfs are remnants of stars that exhausted their fuel",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar remnant evolution",
        "🌀 Fun fact: White dwarfs are extremely dense and small!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 white dwarfs orbiting a star"
    ],
    "helium white dwarf": [
        "🌌 Let's create a helium white dwarf! Go to 'Create Celestial Bodies' > 'Helium White Dwarf'...",
        "💫 Tip: Adjust mass for different atmospheric features",
        "🌠 Use slow-motion to observe helium fusion",
        "⚠️ Note: Helium white dwarfs are remnants of helium-burning stars",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar remnant evolution",
        "🌀 Fun fact: Helium white dwarfs are extremely dense and small!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 helium white dwarfs orbiting a star"
    ],
    "carbon white dwarf": [
        "🌌 Let's create a carbon white dwarf! Go to 'Create Celestial Bodies' > 'Carbon White Dwarf'...",
        "💫 Tip: Adjust mass for different atmospheric characteristics",
        "🌠 Use slow-motion to observe carbon fusion",
        "⚠️ Note: Carbon white dwarfs are remnants of carbon-burning stars",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar remnant evolution",
        "🌀 Fun fact: Carbon white dwarfs are extremely dense and small!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 carbon white dwarfs orbiting a star"
    ],
    "black dwarf": [
        "🌌 Let's create a black dwarf! Go to 'Create Celestial Bodies' > 'Black Dwarf'...",
        "💫 Tip: Adjust mass for different atmospheric features",
        "🌠 Use slow-motion to observe hydrogen fusion",
        "⚠️ Note: Black dwarfs are theoretical remnants of cooled white dwarfs",
        "🌟 Try different atmospheric compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar remnant evolution",
        "🌀 Fun fact: Black dwarfs would be extremely dense and invisible!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 black dwarfs orbiting a star"
    ],
    "neutron star": [
        "🌌 Let's create a neutron star! Go to 'Create Celestial Bodies' > 'Neutron Star'...",
        "💫 Tip: Adjust mass for different characteristics",
        "🌠 Use slow-motion to observe neutron fusion",
        "⚠️ Warning: Neutron stars are extremely dense and small!",
        "🌟 Try different compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar evolution",
        "🌀 Fun fact: Neutron stars can spin up to 1000 times per second!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 neutron stars orbiting a star"
    ],
    "magnetar": [
        "🌌 Let's create a magnetar! Go to 'Create Celestial Bodies' > 'Magnetar'...",
        "💫 Tip: Adjust mass for different characteristics",
        "🌠 Use slow-motion to observe neutron fusion",
        "⚠️ Warning: Magnetars are extremely dense with powerful magnetic fields!",
        "🌟 Try different compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar evolution",
        "🌀 Fun fact: Magnetars have trillion-times stronger magnetic fields than Earth!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 magnetars orbiting a star"
    ],
    "quark star": [
        "🌌 Let's create a quark star! Go to 'Create Celestial Bodies' > 'Quark Star'...",
        "💫 Tip: Adjust mass for different characteristics",
        "🌠 Use slow-motion to observe quark fusion",
        "⚠️ Warning: Quark stars are extremely dense and theoretical!",
        "🌟 Try different compositions: methane, water, ammonia",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see stellar evolution",
        "🌀 Fun fact: Quark stars may be denser than neutron stars!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 quark stars orbiting a star"
    ],
    "space dust": [
        "🌌 Let's create space dust! Go to 'Create Celestial Bodies' > 'Space Dust'...",
        "💫 Tip: Adjust density for different compositions",
        "🌠 Use slow-motion to observe dust cloud formation",
        "⚠️ Note: Space dust can clump to form planetesimals",
        "🌟 Try different compositions: silicate, carbon, ice",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see dust evolution",
        "🌀 Fun fact: Space dust is fundamental in star and planet formation!",
        "💥 To simulate collisions, adjust particle impact velocity",
        "🌌 Challenge: Create system with 5 interacting dust clouds"
    ],
    "nebula": [
        "🌌 Let's create a nebula! Go to 'Create Celestial Bodies' > 'Nebula'...",
        "💫 Tip: Adjust density for different gas/dust compositions",
        "🌠 Use slow-motion to observe star formation within nebula",
        "⚠️ Note: Nebulae can be stellar nurseries",
        "🌟 Try different compositions: hydrogen, helium, carbon",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see nebula evolution",
        "🌀 Fun fact: Nebulae recycle stellar material!",
        "💥 To simulate explosions, adjust nebula expansion speed",
        "🌌 Challenge: Create system with 3 interacting nebulae"
    ],
    "singularity": [
        "🌌 Let's create a singularity! Go to 'Create Celestial Bodies' > 'Singularity'...",
        "💫 Tip: Adjust mass for different gravitational effects",
        "🌠 Use slow-motion to observe spacetime distortion",
        "⚠️ Warning: Singularities are points of infinite density",
        "🌟 Try different compositions: normal matter, exotic matter",
        "🔭 Enable 'Relativistic Effects' for light distortion",
        "📈 Speed up time to see singularity evolution",
        "🌀 Fun fact: Singularities are theoretical and unobservable!",
        "💥 To simulate relativistic jets, adjust disk rotation speed",
        "🌌 Challenge: Create system with 3 interacting singularities"
    ],
    "default": [
        "🚀 Let's explore together! What exactly would you like to create?",
        "🌌 I can guide you step-by-step through this cosmic simulation!",
        "💫 Great! Start by selecting the appropriate menu to create your celestial body",
        "🔭 Let's detail: which specific parameter would you like to adjust first?",
        "🪐 First step: access the creation menu in bottom right corner",
        "🌠 Suggested start: use default values then adjust gradually",
        "⚡ For best results, enable 'Full Precision' in Options > Physics",
        "📊 Would you like a practical example right now?",
        "🌀 Let's start by creating basic components of your system",
        "✨ Type 'help' anytime to see creation options"
    ]
    },
    
    negativeResponses: {
"black hole": [
        "🕳️ No problem! Black holes can wait...",
        "🌌 Alright, these cosmic monsters won't escape!",
        "💫 When you want to see matter being spaghettified, I'm here!",
        "⚠️ Careful indeed! Better keep distance from these cosmic devourers",
        "🔭 How about exploring neutron stars? They're equally fascinating!",
        "🌠 Did you know the smallest known black hole has only 3.8 solar masses?",
        "🌀 Supermassive black holes in galactic centers can have billions of solar masses!",
        "💥 Even without simulating, remember: nothing escapes beyond the event horizon!",
        "⏳ One day in the future, even black holes will evaporate through Hawking radiation",
        "✨ When ready, type 'black hole' to restart"
    ],
    "comet": [
        "☄️ No problem! Comets can wait in their Oort cloud...",
        "❄️ Alright, these icy travelers won't melt anytime soon!",
        "🌠 When you want to create a meteor shower, I'm available",
        "💫 Did you know some comets have orbits lasting millions of years?",
        "🚀 Comet Hale-Bopp was visible to naked eye for incredible 18 months!",
        "🌌 Interstellar comets like Borisov come from other star systems!",
        "⏱️ The Rosetta probe orbited comet Churyumov–Gerasimenko for 2 years!",
        "🔭 Halley's comet nucleus is 15km long and very dark!",
        "💧 Comets contain heavy water with different ratios than Earth's oceans",
        "✨ Type 'comet' when you want to explore these cosmic messengers"
    ],
    "gravity": [
        "⚖️ No problem! Gravity can wait...",
        "🌌 Alright, Einstein wouldn't be disappointed!",
        "💫 When you want to bend spacetime, I'm here!",
        "🌀 Did you know gravity is 10^36 times weaker than electromagnetic force?",
        "🌠 In neutron stars, gravity is 200 billion times stronger than on Earth!",
        "🪐 Jupiter has 2.5x Earth's gravity - enough to alter comets!",
        "⏱️ Gravity travels at light speed - if Sun disappeared, we'd notice after 8 minutes!",
        "💥 Black holes are the only places where gravity overcomes all other forces",
        "🔭 Gravitational waves detected in 2015 confirmed Einstein's 1916 prediction!",
        "✨ Type 'gravity' when you want to explore this fundamental cosmic force"
    ],
    "star": [
        "⭐ No problem! Stars can wait in the firmament...",
        "🌞 Alright, these cosmic beacons will shine for billions of years!",
        "💫 When you want to create a supernova, I'll be here!",
        "🌌 The closest star, Proxima Centauri, is 4.24 light-years away!",
        "🔥 Solar core reaches 15 million °C - hot enough for nuclear fusion!",
        "🌠 Betelgeuse, a red supergiant, is 1000 times larger than the Sun!",
        "⏳ Red dwarf stars can live trillions of years - longer than current universe age!",
        "💥 When a star goes supernova, it can outshine an entire galaxy!",
        "🌀 Neutron stars spin up to 716 times per second - cosmos' most precise lighthouses!",
        "✨ Type 'star' when you want to ignite these cosmic engines"
    ],
    "planet": [
        "🪐 No problem! Planets will continue their orbit...",
        "🌍 Alright, these alien worlds won't escape!",
        "💫 When you want to create an ocean world, I'll be here!",
        "🌌 The closest exoplanet, Proxima Centauri b, is just 4 light-years away!",
        "🌡️ Venus is hotter than Mercury due to runaway greenhouse effect!",
        "❄️ Pluto has water-ice mountains 3km high!",
        "🛰️ Jupiter has 79 known moons - a miniature planetary system!",
        "💥 Earth is the only known planet with active tectonic plates!",
        "🌀 Exoplanet WASP-76b has molten iron rain on its night side!",
        "✨ Type 'planet' when you want to shape new worlds"
    ],
    "meteoroid": [
        "🌠 No problem! Meteoroids will continue their space journey...",
        "🪨 Alright, these cosmic travelers won't disappear!",
        "💫 When you want to see a meteoroid in action, I'll be here!",
        "☄️ The Chelyabinsk meteoroid exploded with 30x Hiroshima bomb energy!",
        "🌌 Most meteors are smaller than sand grains - yet still impressive!",
        "🔥 Meteoroids larger than 25 meters can cause significant damage if they hit Earth!",
        "🔭 The Perseid meteor shower is one of Earth's most visible annual events!",
        "💥 The Tunguska meteoroid caused a 15-megaton explosion in 1908!",
        "🌠 Type 'meteoroid' when you want to see these cosmic travelers in action!"
    ],
    "asteroid": [
        "🪨 No problem! Asteroids will continue their orbit...",
        "🌌 Alright, these rocky blocks won't disappear!",
        "💫 When you want to see an asteroid in action, I'll be here!",
        "☄️ Asteroid 16 Psyche is mostly iron and nickel - like a planetary core!",
        "🌠 Asteroid Vesta is so large it's visible to naked eye!",
        "🛰️ Asteroid Bennu has a spinning-top shape - and is an exploration target!",
        "💥 Asteroid Apophis will pass near Earth in 2029 - no collision risk!",
        "🌌 The asteroid belt between Mars and Jupiter contains millions of rocky bodies!",
        "🌠 Type 'asteroid' when you want to explore these solar system building blocks!"
    ],
    "planetoid": [
        "🪐 No problem! Planetoids will continue their orbit...",
        "🌌 Alright, these smaller worlds won't disappear!",
        "💫 When you want to see a planetoid in action, I'll be here!",
        "🌠 Planetoid Ceres is the largest asteroid belt object and has frozen water!",
        "🛰️ Pluto is considered a planetoid by many astronomers - and it's fascinating!",
        "💥 Planetoid Eris is larger than Pluto and has a thin nitrogen atmosphere!",
        "🌌 Planetoids are remnants of solar system formation - true cosmic fossils!",
        "🌠 Type 'planetoid' when you want to explore these smaller worlds!"
    ],
    "wormhole": [
        "🌀 No problem! Wormholes can wait...",
        "🌌 Alright, these cosmic tunnels won't disappear!",
        "💫 When you want to see a wormhole in action, I'll be here!",
        "⚠️ Careful: Wormholes are theoretical and unstable in reality",
        "🌠 Did you know wormholes could connect distant universe points?",
        "🔭 Theory suggests wormholes could enable instant travel!",
        "💥 Even without simulating, remember: nothing escapes beyond the event horizon!",
        "🌀 Type 'wormhole' when you want to explore these cosmic tunnels"
    ],
    "habitable zone": [
        "🌍 No problem! Habitable zones can wait...",
        "🌌 Alright, these life-friendly locations won't disappear!",
        "💫 When you want to see a habitable zone in action, I'll be here!",
        "🌠 Earth has been in Sun's habitable zone for billions of years!",
        "🌡️ Habitable zones vary depending on the star - fascinating!",
        "🛰️ Exoplanets in habitable zones are prime targets in search for alien life!",
        "💥 Even without simulating, remember: life may exist in extreme environments!",
        "🌌 Type 'habitable zone' when you want to explore these life-friendly regions"
    ],
    "quasar": [
        "🌌 No problem! Quasars can wait...",
        "💫 Alright, these cosmic beacons won't disappear!",
        "🚀 When you want to see a quasar in action, I'll be here!",
        "🌠 Quasars are the universe's most luminous objects - true cosmic lighthouses!",
        "🌀 Did you know quasars can emit relativistic jets at near-light speeds?",
        "🔭 Light from some quasars traveled billions of years to reach us!",
        "💥 Even without simulating, remember: quasars are crucial for galaxy evolution!",
        "✨ Type 'quasar' when you want to explore these cosmic beacons"
    ],
    "brown dwarf": [
        "🌌 No problem! Brown dwarfs can wait...",
        "💫 Alright, these intermediate objects won't disappear!",
        "🚀 When you want to see a brown dwarf in action, I'll be here!",
        "🌠 Brown dwarfs are failed stars - no sustained nuclear fusion!",
        "🌀 Did you know brown dwarfs can have methane-rich atmospheres?",
        "🔭 Light from some brown dwarfs traveled billions of years to reach us!",
        "💥 Even without simulating, remember: brown dwarfs are key to stellar evolution!",
        "✨ Type 'brown dwarf' when you want to explore these intermediate objects"
    ],
    "red dwarf": [
        "🌌 No problem! Red dwarfs can wait...",
        "💫 Alright, these small stars won't disappear!",
        "🚀 When you want to see a red dwarf in action, I'll be here!",
        "🌠 Red dwarfs are the universe's most common stars - silent giants!",
        "🌀 Did you know red dwarfs can live trillions of years?",
        "🔭 Light from some red dwarfs traveled billions of years to reach us!",
        "💥 Even without simulating, remember: red dwarfs are crucial for stellar evolution!",
        "✨ Type 'red dwarf' when you want to explore these small stars"
    ],
    "giant star": [
        "🌌 No problem! Giant stars can wait...",
        "💫 Alright, these cosmic colossi won't disappear!",
        "🚀 When you want to see a giant star in action, I'll be here!",
        "🌠 Giant stars are much larger than Sun and may become supernovae!",
        "🌀 Did you know some giant stars can be 1000x Sun's diameter?",
        "🔭 Light from some giant stars traveled billions of years to reach us!",
        "💥 Even without simulating, remember: giant stars are key to galaxy evolution!",
        "✨ Type 'giant star' when you want to explore these cosmic colossi"
    ],
    "hypergiant": [
        "🌌 No problem! Hypergiants can wait...",
        "💫 Alright, these cosmic titans won't disappear!",
        "🚀 When you want to see a hypergiant in action, I'll be here!",
        "🌠 Hypergiants are the most massive known stars and may become supernovae!",
        "🌀 Did you know some hypergiants can be 1000x Sun's diameter?",
        "🔭 Light from some hypergiants traveled billions of years to reach us!",
        "💥 Even without simulating, remember: hypergiants are crucial for galaxy evolution!",
        "✨ Type 'hypergiant' when you want to explore these cosmic titans"
    ],
    "massive star": [
        "🌌 No problem! Massive stars can wait...",
        "💫 Alright, these cosmic colossi won't disappear!",
        "🚀 When you want to see a massive star in action, I'll be here!",
        "🌠 Massive stars are much larger than Sun and may become supernovae!",
        "🌀 Did you know some massive stars can be 100x Sun's diameter?",
        "🔭 Light from some massive stars traveled billions of years to reach us!",
        "💥 Even without simulating, remember: massive stars are key to galaxy evolution!",
        "✨ Type 'massive star' when you want to explore these cosmic colossi"
    ],
    "hypermassive star": [
        "🌌 No problem! Hypermassive stars can wait...",
        "💫 Alright, these cosmic titans won't disappear!",
        "🚀 When you want to see a hypermassive star in action, I'll be here!",
        "🌠 Hypermassive stars are extremely massive and may become supernovae!",
        "🌀 Did you know some hypergiants can be 1000x Sun's diameter?",
        "🔭 Light from some hypergiants traveled billions of years to reach us!",
        "💥 Even without simulating, remember: hypergiants are crucial for galaxy evolution!",
        "✨ Type 'hypermassive star' when you want to explore these cosmic titans"
    ],
    "white dwarf": [
        "🌌 No problem! White dwarfs can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a white dwarf in action, I'll be here!",
        "🌠 White dwarfs are remnants of stars that exhausted their nuclear fuel!",
        "🌀 Did you know white dwarfs are extremely dense and small?",
        "🔭 Light from some white dwarfs traveled billions of years to reach us!",
        "💥 Even without simulating, remember: white dwarfs are key to stellar evolution!",
        "✨ Type 'white dwarf' when you want to explore these stellar remnants"
    ],
    "helium white dwarf": [
        "🌌 No problem! Helium white dwarfs can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a helium white dwarf in action, I'll be here!",
        "🌠 Helium white dwarfs are remnants of helium-burning stars!",
        "🌀 Did you know helium white dwarfs are extremely dense and small?",
        "🔭 Light from some helium white dwarfs traveled billions of years to reach us!",
        "💥 Even without simulating, remember: they're key to stellar evolution!",
        "✨ Type 'helium white dwarf' when you want to explore these remnants"
    ],
    "carbon white dwarf": [
        "🌌 No problem! Carbon white dwarfs can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a carbon white dwarf in action, I'll be here!",
        "🌠 Carbon white dwarfs are remnants of carbon-burning stars!",
        "🌀 Did you know carbon white dwarfs are extremely dense and small?",
        "🔭 Light from some carbon white dwarfs traveled billions of years to reach us!",
        "💥 Even without simulating, remember: they're key to stellar evolution!",
        "✨ Type 'carbon white dwarf' when you want to explore these remnants"
    ],
    "black dwarf": [
        "🌌 No problem! Black dwarfs can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a black dwarf in action, I'll be here!",
        "🌠 Black dwarfs are final remnants of stars that exhausted all their heat!",
        "🌀 Did you know black dwarfs are extremely dense and small?",
        "🔭 Light from some black dwarfs traveled billions of years to reach us!",
        "💥 Even without simulating, remember: they're key to stellar evolution!",
        "✨ Type 'black dwarf' when you want to explore these stellar remnants"
    ],
    "neutron star": [
        "🌌 No problem! Neutron stars can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a neutron star in action, I'll be here!",
        "🌠 Neutron stars are supernova remnants and extremely dense!",
        "🌀 Did you know a teaspoon of neutron star matter outweighs all humanity?",
        "🔭 Light from some neutron stars traveled billions of years to reach us!",
        "💥 Even without simulating, remember: they're key to stellar evolution!",
        "✨ Type 'neutron star' when you want to explore these remnants"
    ],
    "magnetar": [
        "🌌 No problem! Magnetars can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a magnetar in action, I'll be here!",
        "🌠 Magnetars are neutron stars with extremely powerful magnetic fields!",
        "🌀 Did you know a magnetar can emit powerful gamma and X-rays?",
        "🔭 Light from some magnetars traveled billions of years to reach us!",
        "💥 Even without simulating, remember: they're key to stellar evolution!",
        "✨ Type 'magnetar' when you want to explore these remnants"
    ],
    "quark star": [
        "🌌 No problem! Quark stars can wait...",
        "💫 Alright, these stellar remnants won't disappear!",
        "🚀 When you want to see a quark star in action, I'll be here!",
        "🌠 Quark stars are theoretical and possibly denser than neutron stars!",
        "🌀 Did you know quark stars may have complex internal structures?",
        "🔭 Light from some quark stars traveled billions of years to reach us!",
        "💥 Even without simulating, remember: they're key to stellar evolution!",
        "✨ Type 'quark star' when you want to explore these remnants"
    ],
    "space dust": [
        "🌌 No problem! Space dust can wait...",
        "💫 Alright, these cosmic particles won't disappear!",
        "🚀 When you want to see space dust in action, I'll be here!",
        "🌠 Space dust is fundamental in star and planet formation!",
        "🌀 Did you know interstellar dust contains heavy elements forged in stars?",
        "🔭 Light from some dust clouds traveled billions of years to reach us!",
        "💥 Even without simulating, remember: space dust is essential to cosmic evolution!",
        "✨ Type 'space dust' when you want to explore these cosmic particles"
    ],
    "nebula": [
        "🌌 No problem! Nebulae can wait...",
        "💫 Alright, these cosmic clouds won't disappear!",
        "🚀 When you want to see a nebula in action, I'll be here!",
        "🌠 Nebulae are stellar nurseries where new stars form!",
        "🌀 Did you know some nebulae are supernova remnants?",
        "🔭 Light from some nebulae traveled billions of years to reach us!",
        "💥 Even without simulating, remember: nebulae are crucial to cosmic evolution!",
        "✨ Type 'nebula' when you want to explore these cosmic clouds"
    ],
    "singularity": [
        "🌌 No problem! Singularities can wait...",
        "💫 Alright, these points of infinite density won't disappear!",
        "🚀 When you want to see a singularity in action, I'll be here!",
        "🌠 Singularities are theoretical points of extreme spacetime curvature!",
        "🌀 Singularities may exist at the center of black holes and quasars!"
    ],
    "default": [
        "🌌 No problem! The universe is patient...",
        "🚀 Alright, cosmic exploration can wait!",
        "💫 When you want to continue, I'll be here!",
        "🔭 Did you know there are more stars than sand grains on all Earth's beaches?",
        "🌠 Light from Andromeda left when our ancestors painted caves!",
        "⏳ 99.9% of visible matter in the universe is plasma state!",
        "💥 In 1 second, Sun produces more energy than all humanity in history!",
        "🌀 Supermassive black holes regulate galaxy growth!",
        "✨ Every oxygen atom in your body was forged in a star's core!",
        "🪐 We are all made of stardust!"
    ]
    },
    
    isAffirmative: (input) => contextSystem.affirmativeResponses.includes(input.toLowerCase()),
    isNegative: (input) => contextSystem.negativeResponses.includes(input.toLowerCase()),
    
    getPositiveResponse: () => {
        if (!contextSystem.lastTopic) return contextSystem.positiveResponses.default[0];
        
        const responses = contextSystem.positiveResponses[contextSystem.lastTopic] || 
                          contextSystem.positiveResponses.default;
        
        return responses[Math.floor(Math.random() * responses.length)];
    },
    
    getNegativeResponse: () => {
        if (!contextSystem.lastTopic) return contextSystem.negativeResponses.default[0];
        
        const responses = contextSystem.negativeResponses[contextSystem.lastTopic] || 
                          contextSystem.negativeResponses.default;
        
        return responses[Math.floor(Math.random() * responses.length)];
    },
    
    resetContext: () => {
        contextSystem.lastTopic = null;
        contextSystem.lastFollowUp = null;
    }
};

 
const mathSystem = {
    responses: [
    "🧮 Result: {expression} = {result}",
    "🔢 Calculation complete: {expression} = {result}",
    "✨ Solution: {expression} = {result}",
    "⚡ Solved: {expression} = {result}",
    "🌌 Cosmic equation: {expression} = {result}",
    "🪐 Stellar mathematics: {expression} = {result}",
    "💫 Gravitational computation: {expression} = {result}",
    "📐 Universal geometry: {expression} = {result}",
    "📊 Numerical analysis: {expression} = {result}",
    "🔭 Mathematical observation: {expression} = {result}",
    "🌠 Formula solved: {expression} = {result}",
    "🚀 Propelled calculation: {expression} = {result}",
    "🛰️ Orbital result: {expression} = {result}",
    "⏱️ Computation time: 0s | {expression} = {result}",
    "⚖️ Numerical equilibrium: {expression} = {result}",
    "🌀 Mathematical vortex: {expression} = {result}",
    "🌡️ Computational temperature: 0K | {expression} = {result}",
    "📈 Numerical projection: {expression} = {result}",
    "📉 Inverse analysis: {expression} = {result}",
    "🧪 Numerical experiment: {expression} = {result}",
    "🔬 Mathematical microscope: {expression} = {result}",
    "🖥️ Simulated quantum computation: {expression} = {result}",
    "💻 Algorithm completed: {expression} = {result}",
    "🤖 Robotic processing: {expression} = {result}",
    "🌟 Numerical illumination: {expression} = {result}",
    "🌌 Cosmos resolved: {expression} = {result}",
    "🧬 Mathematical genetics: {expression} = {result}",
    "🌠 Astronomical numerics: {expression} = {result}",
    "🪐 Computational astrophysics: {expression} = {result}",
    "🔭 Mathematical telescope: {expression} = {result}",
    "🌌 Numerical cosmology: {expression} = {result}",
    "🌟 Star resolved: {expression} = {result}",
    "🌠 Galaxy computed: {expression} = {result}",
    "🛸 Numerical navigation: {expression} = {result}",
    "🌌 Universe calculated: {expression} = {result}",
    "🌠 Constellation resolved: {expression} = {result}",
    "🪐 Planet computed: {expression} = {result}",
    "🌌 Numerical nebula: {expression} = {result}",
    "🌠 Supernova resolved: {expression} = {result}",
    "🛰️ Mathematical satellite: {expression} = {result}",
    "🌌 Spacetime computed: {expression} = {result}",
    "🌠 Event horizon resolved: {expression} = {result}",
    "🌀 Numerical singularity: {expression} = {result}",
    "🌌 Big Bang computed: {expression} = {result}",
    "🌠 Cosmic expansion resolved: {expression} = {result}",
    "🪐 Planetary ring computed: {expression} = {result}",
    "🌌 Wormhole numerics: {expression} = {result}",
    "🌠 Milky Way computed: {expression} = {result}",
    "🛸 Numerical spacecraft: {expression} = {result}",
    "🌌 Multiverse computed: {expression} = {result}",
    "🌠 Parallel dimension resolved: {expression} = {result}",
    "🪐 Exoplanet computed: {expression} = {result}",
    "🌌 Numerical asteroid: {expression} = {result}",
    "🌠 Meteorite resolved: {expression} = {result}",
    "🛰️ Space probe numerics: {expression} = {result}",
    "🌌 Comet computed: {expression} = {result}",
    "🌠 Meteor shower resolved: {expression} = {result}",
    "🪐 Moon computed: {expression} = {result}",
    "🌌 Solar system numerics: {expression} = {result}",
    "🌠 Planetary orbit resolved: {expression} = {result}",
    "🛰️ Space station numerics: {expression} = {result}",
    "🌌 Spiral galaxy computed: {expression} = {result}",
    "🌠 Elliptical galaxy resolved: {expression} = {result}",
    "🪐 Irregular galaxy computed: {expression} = {result}",
    "🌌 Quasar numerics: {expression} = {result}",
    "🌠 Pulsar resolved: {expression} = {result}",
    "🛰️ Plasma ball computed: {expression} = {result}"
],
    
    usedResponses: [],
    
    isMathQuery: (input) => {
        return /[0-9+\-*/\^().]/.test(input) && 
               !/[a-z]/.test(input) && 
               input.split('').filter(char => '0123456789'.includes(char)).length >= 2;
    },
    
    calculate: (expression) => {
        try {
            const sanitized = expression
                .replace(/\^/g, '**')
                .replace(/[^0-9+\-*/\s().]/g, '');
            
            if (!/^[\d\s+\-*/().]+$/.test(sanitized)) {
                throw new Error("Expressão inválida");
            }
            
            const result = eval(sanitized);
            
             
            let availableResponses = mathSystem.responses;
            if (mathSystem.usedResponses.length > 0) {
                availableResponses = mathSystem.responses.filter(r => 
                    !mathSystem.usedResponses.includes(r)
                );
            }
            
            if (availableResponses.length === 0) {
                mathSystem.usedResponses = [];
                availableResponses = mathSystem.responses;
            }
            
            const responseTemplate = availableResponses[
                Math.floor(Math.random() * availableResponses.length)
            ];
            
            mathSystem.usedResponses.push(responseTemplate);
            
            return responseTemplate
                .replace("{expression}", expression)
                .replace("{result}", result);
        } catch (error) {
            return "🤔 Não consegui calcular. Formato válido: '2*(3+5^2)' ou 'sqrt(9)'";
        }
    }
};

 
const greetingsSystem = {
    greetings: ["hello", "hi", "hey", "howdy", "greetings", "good morning", "good afternoon", "good evening", "stellar greetings", "hello singularity", "ahoy", "yo", "hiya", "salutations", "morning"],
    farewells: ["bye", "goodbye", "see you", "later", "exit", "quit", "close", "logout", "sign off", "farewell", "cya", "adios", "disconnect", "end session", "goodbye singularity"],
    
    greetingsResponses: [
        "✨ Hello, cosmic explorer! How can I assist your journey through the stars?",
        "🚀 Welcome to SIU 2D! Ready to create amazing universes?",
        "🌌 Interstellar greetings! How can I help today?",
        "🪐 What's up, commander! What cosmic challenge shall we tackle?",
        "💫 Gravitational salutations! How may I aid your exploration?",
        "🌟 Welcome, world creator! What shall we simulate today?",
        "🌠 Greetings, star traveler! Ready for a cosmic adventure?",
        "🛸 Transmission received! How can I assist your space mission?",
        "🔭 Hello, virtual astronomer! What cosmic mystery shall we unravel?",
        "⚡ Cosmic energy flowing! How can I help?",
        "🌀 Welcome vortex activated! What's your command?",
        "🌠 Cosmic rays detected! Hello, how may I assist?",
        "🪐 Planetary alignment perfect for your arrival! Welcome!",
        "🌌 Space warp stabilized! Greetings, explorer!",
        "🚀 Systems online! Singularity at your service",
        "🔭 Telescopes focused! Ready to explore the universe?",
        "🌠 Meteor shower of welcome! How can I help?",
        "💻 Cosmic AI systems activated! Hello, human!",
        "🛰️ Communication satellites synchronized! Connection established!",
        "🌌 Dimensional portal open! Welcome to SIU 2D!",
        "🌟 Constellations aligned for your arrival! Greetings!",
        "⚛️ Cosmic particles excited by your presence! Hello!",
        "🌠 Welcome comet on trajectory! Greetings, traveler!",
        "🪐 Planetary rings oscillating in greeting! Welcome!",
        "✨ Stellar energy channeled! Singularity at your disposal!"
    ],
    
    farewellResponses: [
        "🌠 Until next time, star traveler! May your journey be epic!",
        "🛸 Safe travels through the cosmos! Return when new questions arise!",
        "💫 Ending transmission. Remember: The universe is your playground!",
        "👋 Bye! When you want to create a black hole, I'm here!",
        "🚀 Departure confirmed! Return for more cosmic adventures!",
        "🌌 Disconnecting... But the universe continues expanding!",
        "🪐 See you later, commander! May we discover more cosmic horizons!",
        "✨ Mission accomplished! Return for new stellar explorations!",
        "🔭 Signal lost... But the stars will always guide your way!",
        "⚡ Cosmic energies bid farewell! Until next orbit!",
        "🌀 Gravitational field deactivated! See you soon, explorer!",
        "🌠 Exit trajectory calculated! Until next time, traveler!",
        "🛰️ Satellites in standby mode! Return when needed!",
        "💻 Systems in cosmic hibernation! Goodbye!",
        "🪐 Planetary farewell alignment! Safe journeys!",
        "🌌 Dimensional portal closed! Return whenever you wish!",
        "🌟 Constellations shine at your departure! See you soon!",
        "⚛️ Cosmic particles decelerated! Until next time!",
        "🌠 Farewell comet on trajectory! Safe travels!",
        "🔭 Telescopes defocusing! Until next observation!",
        "💫 Space warp undone! Until the next journey!",
        "🚀 Farewell rockets engaged! Safe travels!",
        "🌠 Farewell cosmic rays detected! See you soon!",
        "🛸 Departure ship in orbit! Come back soon!",
        "✨ Final stellar pulse! Disconnecting..."
    ],
    
    isGreeting: (input) => greetingsSystem.greetings.includes(input.toLowerCase()),
    isFarewell: (input) => greetingsSystem.farewells.includes(input.toLowerCase()),
    
    getRandomGreeting: () => {
        return greetingsSystem.greetingsResponses[
            Math.floor(Math.random() * greetingsSystem.greetingsResponses.length)
        ];
    },
    
    getRandomFarewell: () => {
        return greetingsSystem.farewellResponses[
            Math.floor(Math.random() * greetingsSystem.farewellResponses.length)
        ];
    }
};

 
function getUniqueResponse(term) {
    if (!responseHistory.has(term)) {
        responseHistory.set(term, []);
    }
    
    const usedResponses = responseHistory.get(term);
    let availableResponses = responseDatabase[term];
    
     
    if (usedResponses.length > 0) {
        availableResponses = availableResponses.filter(r => !usedResponses.includes(r));
    }
    
     
    const response = availableResponses.length > 0 
        ? availableResponses[Math.floor(Math.random() * availableResponses.length)]
        : responseDatabase[term][0];
    
     
    usedResponses.push(response);
    
     
    if (usedResponses.length > MAX_HISTORY_PER_TERM) {
        usedResponses.shift();
    }
    
    return response;
}




const responseExpander = {
     
    probabilities: {
        single: 0.2,        
        withFollowUp: 0.3,   
        expanded: 0.4,       
        fullCombo: 0.1       
    },
    
     
    getExpandedResponse: (term, baseResponse) => {
        const responses = [...responseDatabase[term]];
        
         
        const baseIndex = responses.indexOf(baseResponse);
        if (baseIndex !== -1) {
            responses.splice(baseIndex, 1);
        }
        
         
        const additionalCount = Math.floor(Math.random() * 3) + 1;
        const additionalResponses = [];
        
         
        for (let i = 0; i < additionalCount && responses.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * responses.length);
            additionalResponses.push(responses[randomIndex]);
            responses.splice(randomIndex, 1);
        }
        
         
        return [baseResponse, ...additionalResponses].join(' ');
    },
    
     
    selectResponseType: (term, baseResponse) => {
        const rand = Math.random();
        let cumulative = 0;
        
        for (const [type, prob] of Object.entries(responseExpander.probabilities)) {
            cumulative += prob;
            if (rand < cumulative) {
                switch(type) {
                    case 'single':
                        return [baseResponse];
                    
                    case 'withFollowUp':
                        return [
                            baseResponse,
                            ...responseExpander.getFollowUp(term)
                        ];
                    
                    case 'expanded':
                        return [responseExpander.getExpandedResponse(term, baseResponse)];
                    
                    case 'fullCombo':
                        return [
                            responseExpander.getExpandedResponse(term, baseResponse),
                            ...responseExpander.getFollowUp(term)
                        ];
                }
            }
        }
        
        return [baseResponse];  
    },
    
     
    getFollowUp: (term) => {
        const followUps = followUpDatabase[term] || contextFollowUps.default;
        return [followUps[Math.floor(Math.random() * followUps.length)]];
    }
};


 
async function getBotResponse(input) {
    const cleanInput = input.toLowerCase().trim();
    let responses = [];
    
     
    if (contextSystem.lastFollowUp) {
        if (contextSystem.isAffirmative(cleanInput)) {
            responses.push(contextSystem.getPositiveResponse());
            contextSystem.resetContext();
            return responses;
        }
        
        if (contextSystem.isNegative(cleanInput)) {
            responses.push(contextSystem.getNegativeResponse());
            contextSystem.resetContext();
            return responses;
        }
    }
    
     
    if (greetingsSystem.isGreeting(cleanInput)) {
        responses.push(greetingsSystem.getRandomGreeting());
        contextSystem.resetContext();
        return responses;
    }
    
    if (greetingsSystem.isFarewell(cleanInput)) {
        responses.push(greetingsSystem.getRandomFarewell());
        contextSystem.resetContext();
        return responses;
    }
    
     
    if (mathSystem.isMathQuery(cleanInput)) {
        responses.push(mathSystem.calculate(cleanInput));
        contextSystem.resetContext();
        return responses;
    }
    
    let matchedTerm = null;
    for (const term in responseDatabase) {
        if (cleanInput.includes(term)) {
            matchedTerm = term;
            const baseResponse = getUniqueResponse(term);
            
             
            const expandedResponses = responseExpander.selectResponseType(term, baseResponse);
            responses.push(...expandedResponses);
            
             
            if (expandedResponses.length > 1) {
                const lastMessage = expandedResponses[expandedResponses.length - 1];
                
                 
                const isFollowUp = (followUpDatabase[term] || []).includes(lastMessage) || 
                                   contextFollowUps.default.includes(lastMessage);
                
                if (isFollowUp) {
                    contextSystem.lastTopic = term;
                    contextSystem.lastFollowUp = lastMessage;
                }
            }
            
            return responses;
        }
    }
    
     
const fallbacks = [
    "🌌 Didn't find that in my stellar database... Ask about 'comets', 'black holes', or 'controls'!",
    "🛸 My knowledge is cosmic - try asking about game physics or universe elements",
    "🔭 Focus on space! How about 'How to create a nebula?' or 'What mass for a black hole?'",
    "📡 Signal lost... Rephrase about creating celestial bodies, stellar evolution, or SIU 2D controls",
    "💫 Want to calculate something? Use numbers and operators like '3 * 5^2' or ask about cosmic terms!",
    "🪐 Cosmic hint: Try terms like 'gravity', 'star', 'planet', or 'evolution'!",
    "⚡ New stellar message detected! Phrase as 'How to create a quasar?' or 'What is a habitable zone?'"
];
    
    responses.push(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    
     
    if (Math.random() < 0.2) {
        const followUp = followUpDatabase.default[Math.floor(Math.random() * followUpDatabase.default.length)];
        responses.push(followUp);
        
         
        contextSystem.lastTopic = "default";
        contextSystem.lastFollowUp = followUp;
    }
    
    return responses;
}

 
function toggleStarPulse(active) {
    const star = document.getElementById('star');
    if (star) {
        if (active) {
            star.classList.add('pulse-active');
        } else {
            star.classList.remove('pulse-active');
        }
    }
}

function createMessage(text, className) {
    const message = document.createElement('div');
    message.classList.add(className);
    
     
    if (className === 'bot-message') {
        const starSpan = document.createElement('span');
        starSpan.textContent = STAR_EMOJI + ' ';
        starSpan.classList.add('star-emoji');
        message.appendChild(starSpan);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    message.appendChild(textSpan);
    
    return message;
}

 
function initializeChat() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) {
        console.error('Erro #20fgp');
        return;
    }
    
    const botMessage = createMessage(
        greetingsSystem.getRandomGreeting(),
        'bot-message'
    );
    chatBox.appendChild(botMessage);
}

 
async function showThinking(chatBox) {
    return new Promise(async (resolve) => {
         
        const thinkingMsg = createMessage(' : Pensando', 'bot-message');
        chatBox.appendChild(thinkingMsg);
        const thinkingText = thinkingMsg.querySelector('span:last-child');
        
        let dots = 0;
        const thinkDuration = Math.floor(Math.random() * 3000) + 3000;  
        
        const thinkInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            thinkingText.textContent = ` : Pensando${'.'.repeat(dots)}`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
        
         
        await new Promise(r => setTimeout(r, thinkDuration));
        clearInterval(thinkInterval);
        chatBox.removeChild(thinkingMsg);
        
         
        const searchingMsg = createMessage('Buscando', 'bot-message');
        chatBox.appendChild(searchingMsg);
        const searchingText = searchingMsg.querySelector('span:last-child');
        
        dots = 0;
        const searchDuration = Math.floor(Math.random() * 2000) + 2000;  
        
        const searchInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            searchingText.textContent = ` : Buscando dados${'.'.repeat(dots)}`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
        
         
        await new Promise(r => setTimeout(r, searchDuration));
        clearInterval(searchInterval);
        chatBox.removeChild(searchingMsg);
        
        resolve();
    });
}
 
function humanTypeWriter(element, text, speed = 30) {
    return new Promise((resolve) => {
        let i = 0;
        let currentText = '';
        let isPaused = false;
        let pauseEnd = 0;
        let dotsInterval = null;
        
        toggleStarPulse(true);
        
        function startDotsAnimation() {
            let dots = 0;
            const originalText = currentText;
            
            dotsInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                element.textContent = originalText + '.'.repeat(dots);
            }, 300);
        }
        
        function stopDotsAnimation() {
            if (dotsInterval) {
                clearInterval(dotsInterval);
                dotsInterval = null;
                element.textContent = currentText;
            }
        }
        
        function type() {
            if (i >= text.length) {
                if (dotsInterval) clearInterval(dotsInterval);
                toggleStarPulse(false);
                resolve();
                return;
            }
            
             
            if (!isPaused && Math.random() < 0.03) {
                isPaused = true;
                pauseEnd = Date.now() + Math.random() * 2000 + 2000;  
                startDotsAnimation();
            }
            
             
            if (isPaused) {
                if (Date.now() >= pauseEnd) {
                    isPaused = false;
                    stopDotsAnimation();
                }
                setTimeout(type, 100);
                return;
            }
            
             
            currentText += text[i];
            element.textContent = currentText;
            i++;
            
            setTimeout(type, speed);
        }
        
        type();
    });
}


 
function isOnline() {
    return navigator.onLine;
}

 
async function handleUserInput() {
    const inputEl = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const text = inputEl.value.trim();
    
    if (!text || !chatBox) return;

     
    const userMsg = createMessage(`Você: ${text}`, 'user-message');
    chatBox.appendChild(userMsg);
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

     
    if (!isOnline()) {
        const errorMsg = createMessage('error : Connection error. Check your internet connection and try again.', 'error-message');
        chatBox.appendChild(errorMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
        return;
    }

     
    await showThinking(chatBox);
    
     
    const replies = await getBotResponse(text);
    
     
    for (const reply of replies) {
        const botMsg = createMessage('', 'bot-message');
        chatBox.appendChild(botMsg);
        const textElement = botMsg.querySelector('span:last-child');
        
         
        await humanTypeWriter(textElement, `: ${reply}`);
        chatBox.scrollTop = chatBox.scrollHeight;
        
         
        if (replies.length > 1) {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
        }
    }
}

setInterval(() => {
    if (Math.random() < 0.2) {
        const topics = Object.keys(responseDatabase);
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const messages = responseDatabase[randomTopic];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        setTimeout(() => {
            displayMessage(randomMessage, 'bot');
        }, 3000);
    }
}, 30000);
 
document.getElementById('send-btn').addEventListener('click', handleUserInput);
document.getElementById('user-input').addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
    }
});

console.log("T Singularity: Sistema de IA carregado com sucesso!");
console.log("(c) 2025 Free Game Plant. Todos os direitos reservados.");

 
window.addEventListener('load', initializeChat);