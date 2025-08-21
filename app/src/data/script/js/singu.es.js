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
    "cometa": [
        "☄️ ¡Los cometas son cuerpos helados que desarrollan colas cuando se acercan a las estrellas! En SIU 2D, puedes crearlos en el menú 'Crear Astros'",
        "💫 La masa típica de los cometas varía entre 0.1-10 unidades. Por encima de 300 masas, evolucionan automáticamente a planetoides helados",
        "🌠 La cola siempre apunta en dirección opuesta al movimiento: esto simula con precisión física el viento estelar del juego",
        "🚀 Consejo: Al crear un cometa, arrastra el ratón para definir su velocidad inicial y ver la trayectoria prevista",
        "❄️ Los cometas se derriten cuando están muy cerca de estrellas calientes: en el juego, esto los transforma en asteroides después de 50 pasadas",
        "⏱️ En modo tiempo acelerado (100000x), puedes observar un cometa completar su órbita en segundos reales",
        "🎯 Experimenta creando un sistema con múltiples cometas orbitando una estrella: presiona 'C' para acceder al menú de creación",
        "📏 El radio del núcleo se calcula como R = 0.1 * ∛(masa). Ej: masa 8 = radio ~0.2 unidades (visible en el panel de edición)",
        "🔥 Cometas con velocidad >5 unidades/s desarrollan colas más largas: perfecto para efectos visuales dramáticos",
        "🌌 En modo alta calidad (Opciones > Gráficos), las colas muestran tres capas: polvo (amarillo), gas ionizado (azul) y sodio (naranja)",
        "🔄 Usa planetas gigantes como 'hondas gravitacionales': coloca un cometa en trayectoria cercana para redirigirlo",
        "⛰️ Los cometas desgastados se convierten en asteroides clase 2 (helados): puedes ver esta transición en el historial del astro",
        "💧 Controla el punto donde comienza a formarse la cola ajustando la temperatura base en el panel de edición (por encima de -50°C)",
        "📊 Datos físicos en el juego: Densidad = 0.5 g/cm³, Albedo = 0.04 - visibles en modo estadísticas avanzadas (Shift+E)",
        "✨ Los cometas recién creados tienen actividad durante ~1 millón de años en tiempo del juego: observa en la línea de tiempo universal",
        "🎯 Para una órbita perfecta, la velocidad inicial debe ser perpendicular a la línea gravitacional: las flechas te guían",
        "🌡️ La temperatura de la cola varía: cerca del núcleo (1500°C), medio (500°C), punta (100°C) - visible con zonas térmicas activas",
        "🔄 Los cometas pueden ser capturados por planetas: intenta crear un sistema con Júpiter virtual para ver lunas cometarias",
        "⏳ En el panel de tiempo del astro (T con edición abierta), ve cuántas pasadas estelares faltan antes de volverse inactivo",
        "📈 Consejo avanzado: Cometas con alta excentricidad (>0.9) tienen órbitas más interesantes: ajústala en el vector de velocidad",
        "🌠 Curiosidad: El código del juego simula pérdida de masa por sublimación: aproximadamente 0.01% por pasada estelar",
        "🔭 En sistemas binarios, los cometas pueden tener órbitas caóticas: intenta crear dos estrellas cercanas con cometas orbitando",
        "⚠️ Precaución: Los cometas en ruta de colisión con planetas se evaporan antes del impacto en la mayoría de los casos",
        "💧 El agua de los cometas se contabiliza en el sistema de recursos del planeta cuando se evaporan: ve en el panel planetario",
        "🌟 Para mejores resultados, crea cometas en el menú 'Cuerpos Menores' con temperatura inicial entre -100°C y -50°C"
    ],
    
    "agujero negro": [
        "🕳️ Los agujeros negros tienen masa mínima de 1 billón (1e12) unidades: créalos en el menú 'Cuerpos Exóticos'",
        "🌀 El radio en el juego se calcula como R = ∛(masa)/1000: esto simplifica el Radio de Schwarzschild para el gameplay",
        "💥 Alimenta agujeros negros con materia para verlos crecer: intenta lanzar nebulosas o estrellas cercanas",
        "⏳ Pierden masa por la radiación Hawking: en 10^67 años se evaporarían (simulado de forma acelerada en el juego)",
        "📡 El disco de acreción emite calor intenso: usa el botón 'Zonas Térmicas' (T) para visualizar los 5000°C+",
        "⚡ La fuerza de marea cerca del horizonte es F = (G * M * m) / r³ * Δr: los objetos cercanos se estiran (efecto visible en Alta Calidad)",
        "🌌 Agujeros negros por encima de 500 sextillones se convierten en cuásares: alcanza este hito para ver chorros de energía",
        "🔭 Mantén distancia segura de 10x el radio: dentro de eso, los objetos son tragados instantáneamente",
        "🔄 Úsalos para 'hondas gravitacionales': lanza objetos en trayectorias de alta energía con economía",
        "💫 En sistemas binarios, generan ondas gravitacionales: actívalas en Opciones > Física > Efectos Relativistas",
        "⏱️ 1 segundo en el horizonte equivale a ~100 años externos: observa con el control de tiempo acelerado",
        "📈 El tiempo de evaporación se muestra en el panel de tiempo del astro (accede con T durante la edición)",
        "🌠 Para fusionar agujeros negros: crea dos cercanos y acelera el tiempo: la colisión emite un destello intenso",
        "⚠️ Objetos dentro de 5x el radio sufren espaguetificación: efecto activado en Opciones > Gráficos > Alta Calidad",
        "🔢 Calcula el radio para 1 millón de masas solares: R ≈ 2.95 * (M/1e6) km: el juego usa unidades simplificadas",
        "💥 Al alcanzar 1e60 masas, se transforman en agujeros blancos: sigue alimentándolos para ver la transición",
        "🌡️ La temperatura del disco de acreción es controlable en el panel de edición: por defecto es 1.000.000°C",
        "🌀 El spin puede ajustarse en el panel avanzado (haz clic en 'Propiedades Relativistas'): afecta el disco de acreción",
        "📏 Para medición precisa: El diámetro del horizonte de eventos es siempre 2x el radio mostrado en el juego",
        "⚠️ Precaución: Agujeros negros en sistemas densos pueden tragar estrellas rápidamente: monitorea por la línea de tiempo",
        "🔭 Usa el modo observación (O) para ver lentes gravitacionales: distorsionan la luz de estrellas detrás de ellos",
        "💫 Cuásares (etapa evolutiva) emiten chorros de energía: controla la dirección en el panel de edición",
        "⏳ En agujeros negros supermasivos, el tiempo de evaporación excede la edad actual del universo del juego",
        "🌌 Consejo: Crea un binario de agujero negro y estrella para ver transferencia de materia en tiempo real",
        "✨ Para experiencia completa, activa música ambiente 'Singularity' en Opciones > Audio"
    ],
    
    "gravedad": [
        "⚖️ Ajuste global de 0% a 500% en Menú > Física > Constante Gravitacional",
        "📏 Constante G estándar: 6.67430e-11 N·m²/kg²: modificable para simular universos alternativos",
        "🌀 Los agujeros negros tienen multiplicador gravitacional fijo 1000x para efectos relativistas",
        "🪐 Fuerza de marea calculada como Δg = (2GM/R³) * Δr: causa deformaciones en lunas cercanas (visible en Alta Calidad)",
        "📈 Cada 100% extra de gravedad acelera sistemas en ~15%: útil para simulaciones rápidas",
        "🌌 Ondas gravitacionales activadas en Opciones > Física > Efectos Avanzados: visibles como ondulaciones",
        "🔄 Velocidad orbital óptima: v = √(GM/r): mostrada durante la creación con flechas guía",
        "⚙️ Reduce a 10-50% para simular nebulosas, aumenta a 200-500% para sistemas estelares densos",
        "🔭 Efecto de lente gravitacional visible cerca de agujeros negros: actívalo en Gráficos > Efectos Especiales",
        "📊 Estabilidad máxima: 0.5 * √N cuerpos (ej: 100 astros → ~7 estables): exceder causa comportamientos caóticos",
        "⏳ Alta gravedad acelera evolución estelar: las estrellas viven menos en campos gravitacionales fuertes",
        "🌠 Umbral de fusión en colisiones: Ec < |Ep|: cuando la energía cinética es menor que la potencial gravitatoria",
        "🧮 Fórmula implementada: F = G * m1 * m2 / r²: comprobable con el modo 'Mostrar Fuerzas' (F3)",
        "🔢 Para duplicar fuerza gravitatoria: aumenta G en 100% o masas en 100%",
        "⚠️ Valores >300% pueden causar inestabilidades en sistemas con más de 50 cuerpos: usa con precaución",
        "🌍 Gravedad superficial calculada como g = GM/R²: visible en el panel planetario para cuerpos rocosos",
        "💫 El sistema usa integración Verlet para cálculos orbitales precisos: activa 'Precisión Total' en Física",
        "📈 En cuerpos masivos, la gravedad afecta la rotación: planetas muy cerca de estrellas quedan acoplados por marea",
        "🌀 Campos gravitacionales fuertes dilatan el tiempo: observable comparando relojes en diferentes altitudes",
        "⚡ Para simular materia oscura: aumenta la gravedad en 30-50% sin añadir masa visible",
        "🔭 La precisión numérica es mayor cerca de masas grandes: el juego usa sistema de coordenadas adaptativas",
        "🌌 Curvatura espacio-temporal simulada visualmente cerca de objetos compactos: activa en Opciones > Gráficos",
        "📏 Distancias de Roche calculadas automáticamente: lunas dentro de este límite se fragmentan (visible con 'Mostrar Zonas Críticas')",
        "💥 En colisiones, la gravedad determina la energía liberada: E ∝ M²/R para impactos directos",
        "✨ Consejo: Para órbitas estables, la velocidad inicial debe ser ≈80% de la velocidad de escape local"
    ],
    
    "estrella": [
        "⭐ Masa mínima: 15 millones de unidades: crea en el menú 'Cuerpos Estelares'",
        "🌞 Para una estrella como el Sol: masa ~1.989e30 kg (1 unidad solar en el juego)",
        "🌈 Colores por temperatura: Azul (>30,000K), Blanco (10,000K), Amarillo (6,000K), Rojo (<3,500K): ajústalo en el panel",
        "💥 Estrellas por encima de 20 masas solares explotan como supernovas: activa 'Evolución Estelar' en Opciones",
        "⏳ Tiempo de vida: t ≈ 10^10 * (M/M☉)^-2.5 años: visible en el panel de tiempo del astro (T durante edición)",
        "🔄 Crea sistemas binarios con dos estrellas cercanas para ver órbitas fascinantes",
        "🔭 Estrellas variables cambian de brillo: controla la amplitud en 'Propiedades Estelares'",
        "🌡️ Zona habitable: d = √(L/L☉) AU: mostrada como anillo verde cuando está seleccionada",
        "💫 Fusión nuclear simulada: H → He con eficiencia 0.7% (E=mc²): afecta luminosidad y vida útil",
        "📊 Evolución: Enana roja → Enana blanca | Estrella media → Gigante roja | Masiva → Supernova → Agujero negro",
        "⚙️ Ajustables: Masa, temperatura, rotación, metalicidad y actividad magnética",
        "✨ Estrellas de neutrones requieren >1.4 masas solares y colapso: crea mediante supernovas",
        "🌌 Cúmulos estelares: crea múltiples estrellas en región pequeña (menú 'Sistemas Complejos')",
        "🧪 Modifica la constante gravitacional para ver efectos en la evolución (Menú > Física > Constantes)",
        "🔢 Luminosidad: L ∝ M^3.5: una estrella 2x más masiva es ~11x más luminosa",
        "⚠️ Estrellas muy masivas (>100 masas solares) pueden ser inestables: se dividen o explotan prematuramente",
        "🌠 Estrellas T Tauri (jóvenes) muestran eyecciones de masa: visible como prominencias en modo Alta Calidad",
        "💥 En supernovas, 90% de la masa es eyectada como nebulosa: el resto forma estrella de neutrones o agujero negro",
        "📈 Radio estelar: R ∝ M^0.8 para estrellas de secuencia principal: calculado automáticamente",
        "🌍 Planetas en zona habitable pueden desarrollar vida: indicado por ícono verde en panel planetario",
        "🔥 Núcleo estelar alcanza 15 millones °C para fusión: temperatura ajustable afecta tasa de evolución",
        "🌀 Campos magnéticos fuertes crean manchas estelares: controla la intensidad en panel avanzado",
        "🔭 Para observar detalles, usa zoom (rueda del ratón) y reduce velocidad del tiempo",
        "✨ Consejo: Estrellas binarias pueden tener planetas en órbita P-type (alrededor del par) o S-type (alrededor de una)"
    ],
    
    "planeta": [
        "🪐 Masa: 5K-30.5K (rocosos), 105K-2.5M (gaseosos): crea en el menú 'Cuerpos Planetarios'",
        "🌍 Clases: Rocosos (1-11), Gaseosos (1-6), Enanos: asignadas automáticamente por masa/temperatura",
        "🌡️ Zona habitable calculada como d = √(L_estrella / L☉) AU: mostrada como anillo verde alrededor de estrellas",
        "🔄 Velocidad orbital óptima: v = √(GM/r): ajusta durante creación con vector de velocidad",
        "🌋 Planetas volcánicos: temperatura >1000°C + baja agua/atmósfera: clase 7 automáticamente",
        "❄️ Mundos helados: temperatura < -100°C + alta agua: se convierten en clase 9 automáticamente",
        "🌫️ Espesor atmosférico: controla con deslizador de gas (0-100%): afecta temperatura y presión superficial",
        "💧 Agua superficial: ajusta con deslizador acuático: ideal para mundos habitables: 30-70%",
        "🔭 Las lunas muestran libración: efecto sutil activado en Gráficos > Alta Calidad",
        "🛰️ Máximo 20 lunas por planeta: estable hasta 10% de masa planetaria",
        "⏱️ Migración planetaria ocurre en sistemas jóvenes: activa en Física > Efectos Avanzados",
        "📏 Radio: ∛(masa) para rocosos, ∛(masa/2) para gaseosos: calculado automáticamente",
        "🌌 Tipos especiales: Carbono (alta relación C/O), Hierro (núcleo expuesto): crea con composiciones extremas",
        "🧪 Colisiones planetarias crean nuevos mundos + cinturones de asteroides: simulado con precisión",
        "🔢 Gravedad superficial: g = GM/R²: mostrada en panel planetario",
        "💫 Anillos planetarios: activa en 'Características' > Anillos: ajusta espesor, color y densidad",
        "🌍 Planetas oceánicos (clase 2) tienen agua >90%: generan atmósfera húmeda automáticamente",
        "🏜️ Planetas desérticos (clase 3) pierden 80-90% de agua: muestran textura arenosa",
        "🌱 Mundos habitables (clase 6) muestran vegetación: activa en Gráficos > Detalles Superficiales",
        "🌋 Actividad geológica: controla con deslizador 'Tectónica': afecta vulcanismo y formación de montañas",
        "🌀 Rotación: ajusta período de rotación: afecta achatamiento y patrones climáticos en gaseosos",
        "🌌 Exoplanetas extremos: crea con parámetros inusuales usando modo 'Personalización Avanzada'",
        "📊 Para ver datos detallados: selecciona planeta y pulsa E: panel muestra todas las estadísticas",
        "✨ Consejo: Planetas en resonancia orbital (ej: 2:3) mantienen estabilidad a largo plazo",
        "🔭 Usa el modo 'Observatorio' (O) para ver detalles de superficie en planetas seleccionados"
    ],
    "meteoroide": [
        "🌠 Meteoroides son fragmentos rocosos menores que asteroides (1mm-1m): generados automáticamente en colisiones",
        "💫 Velocidad media: 20-70 km/s: visible como trazos rápidos en modo tiempo real",
        "🪨 Composición: 90% roca, 6% hierro, 4% níquel: definida en panel de creación de fragmentos",
        "🌌 En SIU 2D, crea mediante colisiones o usando menú 'Cuerpos Menores' > 'Generar Fragmentos'",
        "🔥 Al entrar en atmósfera, se convierten en meteoros: activa 'Atmósferas' en Opciones > Física",
        "📏 Masa típica: 0.1g-100kg: objetos mayores se clasifican como asteroides",
        "💥 Efecto de entrada atmosférica: activa en Gráficos > Efectos Especiales > Estrellas Fugaces",
        "🌍 Para Tierra: ~100 toneladas de meteoroides entran diariamente: simulado proporcionalmente",
        "📊 Datos: Densidad 3-4 g/cm³, Albedo 0.05-0.25: ajustable en panel de propiedades",
        "✨ Consejo: Crea cinturones de asteroides para generar meteoroides naturalmente",
        "⏱️ En modo acelerado (10000x), ve lluvias de meteoros constantes",
        "🔭 Observación: Meteoroides no son visibles hasta convertirse en meteoros",
        "🌠 Lluvia de meteoros: ocurre cuando planetas cruzan rastros de cometas: simula con 'Eventos'",
        "💫 Colisiones con naves: reduce escudo en 1% por 10kg: activa en Física > Daños",
        "⚠️ Peligro: Meteoroides >1kg pueden dañar satélites: indicado por alerta amarillo",
        "🌌 Para crear manualmente: menú 'Fragmentos' > tamaño Pequeño (S)",
        "📈 Estadísticas: Frecuencia ajustable en Menú > Ambiente > Densidad de Fragmentos",
        "🛰️ La velocidad relativa determina energía de impacto: E = 0.5 * m * v²",
        "🌠 Curiosidad: El meteoroide que creó el Cráter Barringer tenía solo 50m de diámetro",
        "🌟 Efecto visual: Activa 'Estelas Luminosas' para ver trayectorias a alta velocidad"
    ],
    "meteoro": [
        "☄️ Meteoros son meteoroides quemándose en la atmósfera: 'estrellas fugaces' en el juego",
        "🔥 Temperatura de plasma: 1,500-3,000°C: visible como chispas coloreadas",
        "🌈 Colores: Verde (magnesio), Amarillo (sodio), Rojo (nitrógeno): definidos por composición",
        "🌍 Para ver: Aumenta densidad atmosférica > 0.1kg/m³ y añade meteoroides",
        "💫 Velocidad mínima: 11km/s para ignición: ajusta en umbral de ignición atmosférica",
        "📏 Magnitud aparente: -4 a +5: controlada por tamaño y velocidad del meteoroide",
        "🌠 Lluvias de meteoros: configura en Eventos > Lluvias de Meteoros con radiante definido",
        "⏱️ Duración: 0.1-10 segundos en tiempo real: proporcional a masa",
        "✨ Consejo: Usa cometas como fuente para lluvias de meteoros periódicas",
        "💥 Bólidos: meteoros > -4 magnitud: activan sonido de explosión y destello",
        "🌌 Para crear manualmente: 'Eventos' > 'Meteoro' con altitud 80-120km",
        "📊 Frecuencia: Ajustable de 0-100 eventos/hora en Opciones > Ambiente",
        "🔭 Mejor visualización: Noche con cielo despejado: reduce contaminación lumínica en menú",
        "⚠️ Precaución: Meteoros pueden sobrevivir y convertirse en meteoritos",
        "🌠 Curiosidad: La lluvia Perseidas alcanza 100 meteoros/hora en su pico",
        "🌟 Efecto sonoro: Activa en Audio > Eventos > Estrellas Fugaces",
        "🛸 Meteoros terrestres: ocurren sobre 80km: altitud ajustable",
        "📉 Pérdida de masa: 90-99% durante paso atmosférico",
        "💧 Meteoros acuáticos: crean cráteres submarinos visibles en modo océano",
        "🌌 Para captura de pantalla: Pausa en momento exacto con P y usa F12"
    ],
    "asteroide": [
        "🪨 Asteroides: cuerpos rocosos de 1m-1000km: crea en menú 'Cuerpos Menores'",
        "🌌 Clases: C (carbonáceos), S (silicatos), M (metálicos): selecciona en panel",
        "💫 Masa típica: 1e10-1e20 kg: encima de eso se convierten en planetoides",
        "📏 Forma irregular: activa en Propiedades > Forma > Irregular para realismo",
        "🔄 Órbita: Generalmente entre Marte y Júpiter: crea cinturones con 'Generar Sistema'",
        "⚠️ Peligro de impacto: indicado por marcador rojo si trayectoria intercepta planeta",
        "🌠 Asteroides cercanos a la Tierra: configura en 'Eventos' > 'Asteroides NEA'",
        "💥 Colisión con planeta: libera energía E = 0.5 * m * v²: visible como explosión",
        "⛰️ Superficie: Textura craterizada activada en Gráficos > Detalles Superficiales",
        "🌌 Familias de asteroides: agrupaciones con mismo origen: genera con 'Familias Colisionales'",
        "📊 Datos: Densidad 1-5 g/cm³, Albedo 0.02-0.7: ajustables",
        "✨ Consejo: Usa para minería virtual: recursos calculados en Panel > Recursos",
        "🔭 Observación: Asteroides <100m solo visibles cuando cercanos",
        "🚀 Misiones: Envía sondas haciendo clic en asteroide > 'Enviar Sonda'",
        "🌍 Impacto K-T: Simula con asteroide de 10km para extinción masiva",
        "💫 Rotación caótica: común en asteroides pequeños: activa en Propiedades > Rotación",
        "🛰️ Lunas asteroidales: raras pero posibles: añade con 'Añadir Luna'",
        "📈 Mercado de recursos: Hierro, níquel y platino valen créditos en modo economía",
        "🌠 Curiosidad: El asteroide Ceres está clasificado como planeta enano",
        "🌟 Defensa planetaria: Prueba sistemas de defensa con 'Modo Impacto'"
    ],
    "planetoidal": [
        "🌑 Planetoides: cuerpos entre 100-500km: etapa intermedia entre asteroides y planetas",
        "🌌 Crea con masa 1e18-1e20 kg en menú 'Cuerpos Menores' > 'Planetoides'",
        "💫 Gravedad suficiente para formato esférico: activa 'Forma Esférica' en propiedades",
        "🪨 Composición: Helados (Kuiper) o Rocosos (Cinturón): selecciona en panel",
        "🌠 Ejemplos: Orcus, Quaoar, Sedna: modelos predefinidos en 'Biblioteca'",
        "❄️ Planetoides helados: comienzan actividad cometaria a 5UA de estrellas",
        "📏 Diferencia con planetas enanos: no limpió su órbita: definición automática en juego",
        "🔄 Migración: Pueden ser expulsados a nube de Oort en sistemas inestables",
        "💥 Colisiones: Generan familias de asteroides con composición similar",
        "🌌 Zona: Cinturón de Kuiper (30-50UA) o Disco Disperso (hasta 1000UA)",
        "📊 Datos físicos: Densidad 1-2 g/cm³ (helados), 2-4 g/cm³ (rocosos)",
        "✨ Consejo: Usa para crear sistemas binarios de planetoides",
        "🔭 Observación: Requiere telescopio virtual (modo observatorio) para detección",
        "🚀 Captura: Planetoides pueden ser capturados como lunas por planetas gigantes",
        "🌍 Habitabilidad: Nunca natural, pero posible con terraformación avanzada",
        "💫 Curiosidad: Haumea tiene forma ovalada por rotación rápida",
        "⏱️ Tiempo evolutivo: Estables por miles de millones de años en órbitas frías",
        "📈 Clasificación automática: Cuando cuerpo alcanza 450km de diámetro",
        "🌠 Anillos: Algunos planetoides pueden tener anillos tenues: activa en 'Características'",
        "🌟 Modo exploración: Envía sondas para mapear superficie"
    ],
    "gaseoso": [
        "🪐 Gigantes gaseosos: planetas masivos sin superficie sólida: masa > 100K unidades",
        "🌪️ Crea en menú 'Cuerpos Planetarios' > 'Gaseosos' con masa mínima 105K",
        "💫 Clases: Júpiteres calientes (cerca estrella) o Júpiteres fríos (lejanos)",
        "🌈 Colores: Amarillo (H2), Rojo (NH3), Azul (CH4): dependen de temperatura",
        "🌌 Estructura: Núcleo rocoso + manto metálico + atmósfera gruesa: visible en corte",
        "🌀 Patrones atmosféricos: Bandas, manchas, vórtices: intensidad controlada por rotación",
        "💥 Límite de masa: 13 MJup para fusión de deuterio (enanas marrones), 80 MJup para estrellas",
        "📏 Densidad baja: 0.5-2 g/cm³: ¡Saturno flotaría en agua!",
        "🌠 Anillos: Activa en 'Características' > Anillos: espesor y densidad ajustables",
        "🌍 Lunas: Hasta 20 lunas estables: genera sistemas lunares complejos",
        "⚠️ Migración planetaria: Común en gigantes gaseosos jóvenes: activa en Física Avanzada",
        "✨ Consejo: Para manchas como Gran Mancha Roja, aumenta velocidad de rotación",
        "🔭 Observación: Patrones de nubes cambian en tiempo real: acelera para ver evolución",
        "📊 Datos: Temperatura núcleo 20,000°C, presión 40 Mbar: visibles en panel",
        "💫 Campo magnético: 10-20x más fuerte que Tierra: activa auroras en Gráficos",
        "🌌 Ejemplos: Júpiter, Saturno, Urano, Neptuno: modelos en 'Biblioteca Planetaria'",
        "🚀 Exploración: Envía sondas atmosféricas que sobreviven hasta cierto límite de presión",
        "🌠 Curiosidad: Júpiter actúa como 'aspiradora cósmica' protegiendo planetas internos",
        "🌟 Para mini-Neptunos: reduce masa a 10-20 masas terrestres",
        "💥 Colisión: Gigantes gaseosos en colisión crean estrellas efímeras de hidrógeno"
    ],
    "enana marron": [
        "🟤 Enanas marrones: 'estrellas fallidas' con 13-80 masas de Júpiter",
        "🌡️ Temperatura: 300-3000K: demasiado frías para fusión de hidrógeno estable",
        "💫 Crea en menú 'Cuerpos Estelares' > 'Subestelares' con masa 1.3e28-8e28 kg",
        "🔥 Fusión limitada: Solo deuterio y litio: tiempo de vida 1-100 mil millones de años",
        "📈 Clasificación espectral: M, L, T, Y: definida por temperatura en panel",
        "🌌 Emisión: Principalmente infrarrojo: visible con filtro IR (tecla I)",
        "🪐 Pueden tener discos protoplanetarios y sistemas planetarios: activa 'Discos'",
        "⚠️ Diferencia con planetas: Formación estelar, no planetaria",
        "✨ Consejo: Busca en regiones de formación estelar reciente",
        "🔭 Observación: Difíciles de detectar: usa modo 'Escaneo IR'",
        "📊 Datos: Densidad 10-100 g/cm³, gravedad superficial 100-500 m/s²",
        "💥 Erupciones: Explosiones magnéticas ocasionales: intensidad ajustable",
        "🌠 Curiosidad: ¡La enana marrón más fría conocida tiene temperatura de café!",
        "🚀 Planetas: Pueden tener planetas terrestres en órbitas cercanas",
        "⏱️ Evolución: Se enfrían lentamente hasta volverse enanas negras",
        "🌟 Binarias: Sistemas binarios de enanas marrones son comunes",
        "🌀 Atmósfera: Patrones climáticos complejos con nubes de polvo",
        "💫 Detección: Más fácil por emisión de radio: activa en Opciones",
        "🌌 Ejemplos: WISE 0855: modelo predefinido",
        "📉 Límite inferior: Objetos bajo 13 MJup se clasifican como planetas"
    ],
    "enana roja": [
        "🔴 Enanas rojas: Estrellas pequeñas y frías (tipo M): masa 0.08-0.5 solar",
        "🌡️ Temperatura: 2,400-3,700K: color rojo característico",
        "⏳ Vida útil: Billones de años: casi eternas en escala cósmica",
        "💥 Erupciones estelares: Frecuentes e intensas: pueden esterilizar planetas cercanos",
        "🌡️ Zona habitable: Muy cercana (0.1-0.4UA): planetas probablemente acoplados por marea",
        "🌌 Crea en menú 'Cuerpos Estelares' > 'Enanas Rojas' con masa 15-75 millones unidades",
        "📈 Estadísticas: 75% de estrellas en Vía Láctea son enanas rojas",
        "💫 Planetas: Sistemas planetarios comunes: Trappist-1 es ejemplo famoso",
        "⚠️ Peligro: Radiación UV y X de erupciones puede destruir atmósferas",
        "✨ Consejo: Para planetas habitables, usa escudos magnéticos fuertes",
        "🔭 Observación: Poco visibles a simple vista: brillo débil",
        "🌠 Actividad cromosférica: Manchas estelares cubren hasta 40% de superficie",
        "📊 Datos: Luminosidad 0.0001-0.08 solar, radio 0.1-0.6 solar",
        "💥 Fusión: Lenta y estable: eficiencia 10x mayor que estrellas como Sol",
        "🌌 Velocidad de rotación: Alta (período de días): genera campos magnéticos intensos",
        "🚀 Viaje interestelar: Objetivos principales por abundancia y longevidad",
        "❄️ Enanas azules: Enanas rojas muy activas pueden emitir luz azul durante erupciones",
        "🌟 Binarias: Frecuentemente en sistemas múltiples",
        "💫 Curiosidad: Próxima Centauri es la estrella más cercana al Sol",
        "🌡️ Temperatura superficial: Ajustable en panel: estándar 3300K"
    ],
    "gigante estelar": [
        "🌟 Gigantes estelares: Fase evolutiva de estrellas medias tras secuencia principal",
        "🌡️ Clases: Gigantes rojas (K, M), Gigantes azules (B, A): raras",
        "📏 Radio: 10-100x solar: puede engullir planetas internos",
        "💫 Masa: 0.5-8 solar: debajo se vuelven enanas blancas, encima supernovas",
        "🔥 Núcleo: Helio o carbono/oxígeno en fusión: temperatura >100 millones K",
        "🌌 Crea directamente o evoluciona estrellas en menú 'Evolución Estelar'",
        "⏳ Duración: 1 millón - 1 billón de años dependiendo de masa",
        "💥 Pérdida de masa: Vientos estelares fuertes: forma nebulosas planetarias",
        "📈 Luminosidad: 100-10,000x solar: ilumina sistemas enteros",
        "⚠️ Planetas: Órbitas inestables: planetas pueden ser expulsados o destruidos",
        "✨ Consejo: Para ver pulsación, ajusta inestabilidad en panel",
        "🔭 Variabilidad: Muchas son variables (ej: Mira, Cefeidas)",
        "🌠 Nucleosíntesis: Produce carbono, nitrógeno y elementos pesados",
        "📊 Datos: Densidad media muy baja (10⁻⁵ g/cm³)",
        "💫 Fin: Expulsa envoltura formando nebulosa planetaria + núcleo se vuelve enana blanca",
        "🌌 Ejemplos: Arturo, Aldebarán: modelos en biblioteca",
        "🚀 Habitabilidad: Zonas habitables dinámicas y temporales",
        "❄️ Gigantes azules: Estrellas masivas en fase breve antes de supernova",
        "🌟 Curiosidad: Betelgeuse podría engullir Júpiter si estuviera en lugar del Sol",
        "💥 Simulación: Acelera tiempo para ver evolución completa"
    ],
    "hipergigante": [
        "💥 Hipergigantes: Estrellas más masivas y luminosas conocidas (>30 solar)",
        "🌡️ Temperatura: 3,500-35,000K: clases O, B, A, F, K, M",
        "💫 Luminosidad: Hasta 1 millón de veces solar: ilumina galaxias enteras",
        "📏 Radio: 100-2,000 solar: si se colocara en Sistema Solar, engulliría Júpiter",
        "⏳ Vida: Brevísima (1-10 millones de años): terminan como supernova o hipernova",
        "🌌 Crea en menú 'Cuerpos Estelares' > 'Estrellas Masivas' con masa >30 solar",
        "⚠️ Inestabilidad: Pierden masa rápidamente: vientos estelares poderosos",
        "🔥 Fusión: Elementos hasta hierro en núcleo: etapas avanzadas de nucleosíntesis",
        "💥 Erupciones: Pérdida de masa en eventos catastróficos: simula con 'Eyecciones'",
        "🌠 Ejemplos: Eta Carinae, VY Canis Majoris: modelos en biblioteca",
        "📈 Variabilidad: Irregular y extrema: brillo puede variar 50% en meses",
        "✨ Consejo: Para erupciones como Eta Carinae, aumenta inestabilidad a >80%",
        "🔭 Polvo: Eyecciones forman nebulosas complejas: activa 'Nebulosas Circundantes'",
        "🌌 Ambiente: Solo se forman en regiones HII ricas en gas: simula con nubes moleculares",
        "🚀 Fin: Colapsan en agujeros negros o estrellas de neutrones tras supernova",
        "📊 Datos: Densidad media 10⁻⁶ g/cm³: más enrarecida que vacío de laboratorio",
        "💫 Curiosidad: Algunas hipergigantes tienen compañeras que causan erupciones periódicas",
        "🌟 Binarias: Sistemas masivos pueden fusionarse creando objetos aún más extremos",
        "❄️ Hipergigantes amarillas: Fase rara e inestable entre supergigante azul y roja",
        "💥 Simulación de muerte: Activa 'Supernova Inminente' para ver alertas pre-colapso"
    ],
    "estrella masiva": [
        "💫 Estrellas masivas: >8 masas solares: destino final como supernova",
        "🌡️ Temperatura: 10,000-50,000K: clases O y B",
        "⏳ Vida: Corta (1-50 millones de años): queman combustible rápidamente",
        "💥 Vientos estelares: Poderosos: pierden hasta 10⁻⁶ masas solares por año",
        "🌌 Crea en menú 'Cuerpos Estelares' > 'Estrellas Masivas' con masa >1.6e31 kg",
        "🔥 Fusión: Secuencia rápida H->He->C->Ne->O->Si->Fe",
        "📏 Radio: 5-25 solar durante secuencia principal",
        "⚠️ Supernovas: Destino inevitable: preparan escenario para colapso",
        "✨ Consejo: Para ver evolución completa, activa 'Evolución Rápida' en Opciones",
        "🔭 Observación: Principal fuente de elementos pesados en universo",
        "🌠 Nebulosas: Crean burbujas de gas interestelar: activa 'Efecto de Viento'",
        "📊 Datos: Luminosidad 10,000-1,000,000 solar, densidad núcleo >10⁶ g/cm³",
        "💫 Compañeras: Frecuentemente en sistemas binarios con transferencia de masa",
        "🚀 Púlsares: Algunas se vuelven púlsares tras supernova: selecciona en destino final",
        "❄️ Supergigantes azules: Fase antes de supernova para estrellas >20 solar",
        "🌟 Curiosidad: Estrellas Wolf-Rayet son estrellas masivas que perdieron hidrógeno",
        "🌌 Formación: Requiere nubes moleculares densas: simula con 'Regiones de Formación'",
        "💥 Magnetares: 10% se vuelven magnetares: estrellas de neutrones con campo magnético extremo",
        "📈 Inestabilidad de par: Para >130 solar, pueden explotar sin remanente",
        "⚠️ Advertencia: No coloques planetas habitables cercanos: radiación es letal"
    ],
    "agujero blanco": [
        "⚪ Agujeros blancos: Teoría opuesta a agujeros negros: expulsan materia",
        "💫 Existen solo teóricamente: simulación especulativa en SIU 2D",
        "🌌 Crea en menú 'Cuerpos Exóticos' > 'Agujeros Blancos' con masa >1e40 kg",
        "🔥 Mecánica: La materia emerge del horizonte de eventos: no puede ser accedido",
        "📏 Propiedades: Masa negativa (teórica): en juego, usa masa positiva con 'flujo inverso'",
        "⚠️ Estabilidad: Objetos temporales en simulación: duración ajustable",
        "✨ Consejo: Conecta a agujeros negros vía 'Puente de Einstein-Rosen'",
        "🔭 Visualización: Chorros de partículas emergiendo: intensidad controlable",
        "🌠 Origen: Posible resultado final de agujeros negros evaporados",
        "📊 Parámetros: Temperatura del chorro 1e10 K, velocidad de eyección 0.9c",
        "💥 Efectos: Radiación intensa: peligroso para sistemas cercanos",
        "🌌 En relatividad: Solución matemática de ecuaciones de Einstein",
        "🚀 Viaje interestelar: Teóricamente podrían ser portales: funcionalidad experimental",
        "❄️ Diferencia con cuásares: Expulsión continua vs eventos discretos",
        "🌟 Curiosidad: Algunos modelos cosmológicos los usan para explicar Big Bang",
        "💫 Simulación: Combina con agujeros negros para crear agujeros de gusano estables",
        "⚠️ Limitación: No puede ser alimentado: solo expulsa materia pre-programada",
        "📈 Evolución: Se encoge mientras expulsa materia: tiempo de vida proporcional a masa",
        "🌠 Materia eyectada: Configurable (hidrógeno, plasma, materia exótica)",
        "💥 Alerta: Objeto altamente inestable: puede desaparecer repentinamente"
    ],
    "big bang": [
        "💥 Big Bang: Simulación del origen del universo en SIU 2D",
        "🌌 Accede en 'Universo' > 'Nuevo Universo' > 'Modo Big Bang'",
        "💫 Parámetros: Densidad inicial, temperatura, fluctuaciones cuánticas",
        "⏳ Tiempo inicial: T+10⁻⁴³s tras singularidad: simulación comienza en T+1s",
        "🔥 Temperatura inicial: 10³² K: se enfría rápidamente mientras se expande",
        "🌠 Elementos primordiales: Formación de H, He, Li: proporciones ajustables",
        "📈 Expansión: Ley de Hubble simulada: constante ajustable",
        "💥 Nucleosíntesis: Fusión nuclear en primeros 3 minutos: activa en 'Física Avanzada'",
        "🌌 Radiación cósmica de fondo: Formada en T+380,000 años: activa en 'Radiación'",
        "✨ Consejo: Acelera tiempo para ver formación de grandes estructuras",
        "🔭 Materia oscura: Componente crucial: ajusta % en 'Parámetros Cosmológicos'",
        "📊 Resultados: Formación de galaxias, cúmulos y supercúmulos",
        "⚠️ Limitación: Simulación simplificada: no incluye inflación cósmica",
        "🌟 Universos alternativos: Prueba con diferentes constantes físicas",
        "💫 Curiosidad: Temperatura actual de CMB es 2.7K: visible como fondo difuso",
        "🌠 Formación estelar: Primeras estrellas en 100-500 millones de años",
        "🚀 Modo observador: Viaja en el tiempo para ver diferentes eras cósmicas",
        "❄️ Era oscura: Período antes de primera estrella: simulado con fondo negro",
        "💥 Recombinación: Electrones y protones forman átomos neutros: transición crucial",
        "📈 Anisotropías: Semillas para formación de galaxias: intensidad ajustable"
    ],
    "polvo espacial": [
        "🌌 Polvo espacial: Granos microscópicos (0.01-10μm): base de formación estelar",
        "💫 Composición: Silicatos, carbono, hielo: definida por región del espacio",
        "🌠 Efectos: Absorbe luz (extinción), refleja luz (nebulosas de reflexión)",
        "🌡️ Temperatura: 10-100K en nubes moleculares",
        "✨ Crea con 'Medio Interestelar' > 'Añadir Polvo'",
        "📊 Densidad: 10⁻⁶ granos/m³ en espacio interestelar: hasta 10¹² en nubes",
        "🔭 Observación: Visible como manchas oscuras contra nebulosas brillantes",
        "💥 Importancia: Semilla para formación de planetesimales",
        "🌌 Efecto de radiación: Presión de radiación puede mover granos",
        "🚀 Peligro para naves: Daños por impacto a alta velocidad",
        "❄️ Polvo cometario: Origen de colas de polvo en cometas",
        "🌟 Polvo zodiacal: Sistema solar interno: visible como luz zodiacal",
        "📈 Granos pre-solares: Contienen elementos formados en otras estrellas",
        "💫 Curiosidad: El polvo de supernova contribuyó a formación del Sistema Solar",
        "🌠 Simulación: Activa 'Campos de Polvo' para ver efectos de extinción",
        "⚠️ Limpieza: Estrellas calientes pueden evaporar nubes de polvo",
        "✨ Consejo: Usa para crear nebulosas oscuras como Cabeza de Caballo",
        "🔭 Polarización: Polvo alineado magnéticamente polariza luz: activa efecto",
        "🌌 Evolución: Granos crecen por acreción: simulable con 'Agregación'",
        "💥 Impacto en planetas: Fuente de materiales extraterrestres"
    ],
    "radiacion": [
        "☢️ Radiación: Energía transmitida a través del espacio: crucial en astrofísica",
        "🌌 Tipos: Electromagnética (fotones), Partículas (rayos cósmicos), Ondas gravitacionales",
        "💫 Espectro EM: Radio a rayos gamma: selecciona banda en 'Filtros Observacionales'",
        "📡 Fuentes: Estrellas, agujeros negros, supernovas, púlsares, radiación cósmica de fondo",
        "⚠️ Peligro: Radiación ionizante puede dañar vida y electrónicos",
        "🌡️ Radiación cósmica de fondo: 2.7K: remanente del Big Bang: activa en 'Cosmología'",
        "🚀 Protección: Campos magnéticos y atmósferas gruesas reducen radiación en planetas",
        "🔭 Visualización: Activa 'Mostrar Radiación' para ver campos de radiación",
        "📊 Unidades: Sievert (dosis biológica), Gray (dosis física): mostradas en panel",
        "💥 Radiación sincrotrón: Emitida por electrones en campos magnéticos: común en púlsares",
        "🌠 Curiosidad: Astronautas en ISS reciben 1 mSv/día (100x más que en Tierra)",
        "✨ Radiación Hawking: Agujeros negros emiten radiación térmica: proporcional a 1/M²",
        "❄️ Efectos atmosféricos: Auroras en planetas con campo magnético",
        "🌟 Radiotelescopio: Detecta radiofrecuencias: activa modo 'Radio' (tecla R)",
        "💫 Blindaje: Naves y hábitats necesitan protección: costo en recursos",
        "🌌 Radiación UV: Factor clave para habitabilidad: ajusta en 'Zonas UV'",
        "⚠️ Límites: >500 mSv es letal para humanos: indicado por alerta rojo",
        "📈 Radiación gravitacional: Ondulaciones en espacio-tiempo: activa en 'Física Relativista'",
        "💥 Supernovas: Emiten radiación letal en 50 años-luz: simula efectos",
        "🔭 Medición: Usa sonda 'Radiación' para mapear niveles en sistemas"
    ],
    "nebulosa": [
        "🌌 Nebulosas: Nubes de gas y polvo interestelar: viveros estelares",
        "💫 Tipos: Emisión, reflexión, oscuras, planetarias, remanentes de supernova",
        "✨ Crea en menú 'Medio Interestelar' > 'Nebulosas' con tamaño 1-1000 años-luz",
        "🌈 Colores: Rojo (H-alfa), Azul (reflexión), Verde (OIII): definidas por composición",
        "🌠 Formación estelar: Densidad crítica >100 átomos/cm³: activa 'Formación de Estrellas'",
        "📏 Masa típica: 100-100,000 masas solares: determina número de estrellas formadas",
        "🔥 Nebulosas de emisión: Ionizadas por estrellas calientes: requieren UV intenso",
        "💫 Ejemplos: Orión, Carina, Águila: modelos predefinidos",
        "⚠️ Destrucción: Vientos estelares y supernovas pueden disipar nebulosas",
        "🔭 Observación: Mejor en longitudes específicas: usa filtros",
        "📊 Datos: Temperatura 10-10,000K, densidad 10-10⁶ partículas/cm³",
        "💥 Efecto de fotoionización: Activa para ver fronteras de ionización",
        "🌌 Nebulosas planetarias: Etapa final de estrellas pequeñas: duración 10,000 años",
        "🚀 Navegación: Nebulosas densas reducen velocidad de naves: activa 'Arrastre Interestelar'",
        "❄️ Nebulosas oscuras: Absorben luz: usa para crear siluetas cósmicas",
        "🌟 Curiosidad: Nebulosa del Cangrejo es remanente de supernova de 1054",
        "✨ Consejo: Combina con cúmulos estelares para escenas realistas",
        "📈 Evolución: Simula colapso gravitacional para formación estelar",
        "💫 Nebulosas de reflexión: Polvo reflejando luz estelar: brillo proporcional a estrellas",
        "🌠 Renderizado: Activa 'Modo Alta Calidad' para ver detalles filamentares"
    ],
    "enana blanca": [
        "⚪ Enanas blancas: Remanentes de estrellas <8 masas solares: densidad extrema",
        "💫 Masa: 0.5-1.4 solar comprimida en radio terrestre: densidad 1e6-1e9 g/cm³",
        "🌡️ Temperatura inicial: 100,000K: se enfría lentamente por miles de millones de años",
        "🌌 Crea directamente o evoluciona estrellas en menú 'Evolución Estelar'",
        "📏 Estructura: Degeneración electrónica soporta contra gravedad: física cuántica",
        "💥 Límite de Chandrasekhar: 1.44 solar: encima colapsa a estrella de neutrones",
        "✨ Compañeras: Pueden tener sistemas planetarios sobrevivientes: órbitas ampliadas",
        "🔭 Variabilidad: Enanas blancas pulsantes (ZZ Ceti): activa inestabilidad",
        "📊 Datos: Luminosidad 0.001-100 solar inicial, gravedad superficial 1e6-1e9 m/s²",
        "🌠 Nebulosa planetaria: Fase anterior: dura ~10,000 años",
        "⚠️ Peligro: Supernova tipo Ia si acretan masa más allá del límite: destruye sistema",
        "💫 Curiosidad: ¡El diamante más grande conocido es una enana blanca cristalizada!",
        "🚀 Habitabilidad: Zonas habitables temporales durante enfriamiento",
        "❄️ Enfriamiento: Se vuelve enana negra tras >10¹⁵ años: más allá de edad del universo",
        "🌟 Enanas blancas de helio: Formadas en binarias por pérdida de masa: masa <0.5 solar",
        "🌌 Velocidad de rotación: Puede ser alta (minutos): restos de binarias",
        "💥 Campo magnético: Algunas tienen campos intensos (10⁵ tesla): enanas blancas magnéticas",
        "📈 Evolución: Simula enfriamiento acelerado con 'Tasa de Enfriamiento'",
        "🔭 Observación: Débil brillo blanco-azulado: requiere telescopio",
        "✨ Consejo: Para sistemas binarios con enanas blancas acretadoras, activa 'Binarias Interactivas'"
    ],
    "enana blanca de helio": [
        "💠 Enanas blancas de helio: Remanentes inusuales ricos en helio",
        "💫 Formación: Binarias donde estrella pierde envoltura antes de fusión de helio",
        "🌌 Crea en menú 'Evolución Estelar' > 'Destino Especial' > 'Enana de Helio'",
        "📏 Masa: 0.3-0.5 solar: menor que enanas blancas estándar, pero más densas",
        "🌡️ Temperatura: Similar a enanas blancas normales: 8,000-150,000K",
        "💥 Núcleo: Helio degenerado: sin fusión nuclear, pero puede ocurrir fusión lenta",
        "✨ Diferencia: Más caliente y luminosa que enanas negras para misma edad",
        "🔭 Rareza: ~1% de enanas blancas: simula con baja frecuencia",
        "📊 Datos: Densidad 1e8 g/cm³, gravedad superficial 1e8 m/s²",
        "🌠 Evolución: Se enfría más rápido que enanas carbono-oxígeno",
        "⚠️ Límite: Masa mínima 0.3 solar: debajo sería enana marrón",
        "💫 Curiosidad: Pueden explotar como supernova si masa alcanza 0.7 solar",
        "🚀 Planetas: Sistemas planetarios raros: órbitas muy estables",
        "❄️ Destino final: Enana negra de helio: estado hipotético",
        "🌟 Visualización: Color blanco con leve tono amarillento",
        "🌌 Binarias: Común con compañeras compactas (enanas blancas, estrellas de neutrones)",
        "💥 Acreción: Si gana masa, puede fusionar helio en supernova .Ia",
        "📈 Tiempo de enfriamiento: ~1 billón de años para 5,000K",
        "🔭 Identificación: Espectro dominado por líneas de helio",
        "✨ Consejo: Simula con estrellas de baja masa en sistemas binarios cercanos"
    ],
    "enana negra": [
        "⚫ Enanas negras: Etapa final teórica de enanas blancas: frías y oscuras",
        "💫 Temperatura: <5K: no emite luz visible, solo débil infrarrojo",
        "⏳ Tiempo de formación: >10¹⁵ años: más allá de edad actual del universo",
        "🌌 Simulación especulativa: Activa en 'Universo' > 'Tiempo Extremo'",
        "📏 Propiedades: Masa solar en volumen terrestre: densidad 1e9 g/cm³",
        "💥 Importancia: Prueba teorías de evolución estelar a largo plazo",
        "✨ Crea manualmente con temperatura 0K y luminosidad 0",
        "🔭 Detección: Casi imposible: visible solo por efectos gravitacionales",
        "📊 Datos: Gravedad superficial 1e9 m/s², entropía máxima",
        "🌠 Curiosidad: Universo aún no tiene enanas negras: serán últimos objetos",
        "⚠️ Estado final: Cuerpo cristalizado de carbono/oxígeno o helio",
        "🚀 Habitabilidad: Planetas orbitales serían oscuros y helados",
        "❄️ Emisión: Radiación térmica débil en espectro de radio",
        "🌟 Binarias: Sistemas de enanas negras pueden durar 10²⁵ años antes de decaimiento",
        "💫 Fin: Eventualmente se evaporan por radiación Hawking en 10⁶⁵ años",
        "🌌 Simulación avanzada: Activa 'Decaimiento Cuántico' para ver evolución extrema",
        "📈 Evolución: Pasa por fases de cristalización antes de volverse negra",
        "💥 Límite observacional: Objetos bajo 100K ya son prácticamente invisibles",
        "🔭 Desafío: Encuentra enanas negras simuladas usando lentes gravitacionales",
        "✨ Consejo: Combina con materia oscura para simular efectos en galaxias antiguas"
    ],
    "estrella de neutrones": [
        "🌌 Estrellas de neutrones: Remanentes de supernovas: densidad extrema",
        "💫 Masa: 1.4-3 solar comprimida en radio de 10-15 km",
        "🌡️ Temperatura inicial: 1e11 K: se enfría lentamente por miles de millones de años",
        "🔥 Núcleo: Degeneración de neutrones soporta contra gravedad",
        "📏 Densidad: 10¹⁴ g/cm³: ¡una cucharadita pesa miles de millones de toneladas!",
        "✨ Crea en menú 'Cuerpos Estelares' > 'Estrellas Masivas' > 'Estrella de Neutrones'",
        "💥 Campo magnético: Intensos (10¹² tesla): genera radiación sincrotrón",
        "🔭 Púlsares: Estrellas de neutrones rotatorias que emiten haces de radiación",
        "📊 Datos: Gravedad superficial 1e12 m/s², luminosidad 0.001-100 solar",
        "🌠 Curiosidad: La estrella más densa conocida es una estrella de neutrones",
        "⚠️ Superficie: Extremadamente dura: compuesta por neutrones y fina capa de protones",
        "🚀 Binarias: Sistemas binarios comunes con acreción de masa",
        "❄️ Efectos relativistas: El tiempo se ralentiza cerca de la superficie: simula con 'Relatividad'",
        "🌟 Magnetar: Estrella de neutrones con campo magnético extremo: activa rayos gamma",
        "💫 Simulación: Activa 'Colapso Gravitacional' para ver formación en tiempo real",
        "🌌 Formación: Resulta de colapso gravitacional tras supernova tipo II",
        "📈 Evolución: Enfriamiento lento hasta volverse enana negra en billones de años",
        "💥 Eyección de materia: Puede ocurrir durante fusión o colisión con otra estrella",
        "🔭 Observación: Detectable por rayos X y ondas gravitacionales"
    ],
    "agujero de gusano": [
        "🌀 Agujeros de gusano: Túneles teóricos en espacio-tiempo que conectan puntos distantes",
        "🌌 Simulación especulativa: Activa en 'Cuerpos Exóticos' > 'Agujero de Gusano'",
        "💫 Propiedades: Conectan dos puntos en espacio-tiempo: no son estables",
        "📏 Longitud: Puede ser de metros a años-luz: ajustable en panel",
        "💥 Teoría: Basada en relatividad general: soluciones de ecuaciones de Einstein",
        "✨ Tipos: Agujeros de gusano de Schwarzschild (estáticos) y de Kerr (rotatorios)",
        "🔭 Visualización: Efecto de lente gravitacional: distorsiona luz alrededor",
        "📊 Datos: Masa negativa necesaria para estabilidad: simulación no incluye",
        "🌠 Curiosidad: Popularizados por ciencia ficción: aún no observados",
        "⚠️ Peligro: Teóricamente inestables: pueden colapsar o crear radiación intensa",
        "🚀 Viaje: Podrían permitir viajes interestelares instantáneos: funcional"
    ], 
    "zona habitable": [
        "🌍 Zona habitable: Región alrededor de una estrella donde agua líquida puede existir",
        "💫 Definición: Distancia ideal para temperatura entre 0°C y 100°C",
        "🌌 Simulación: Activa 'Zonas Habitables' en menú 'Configuración'",
        "📏 Distancia: Variable según luminosidad estelar: calculada automáticamente",
        "🔥 Estrellas: Enanas amarillas (tipo G) tienen zonas más estables que enanas rojas",
        "✨ Curiosidad: La Tierra está en zona habitable del Sol: ¡pero no es la única!",
        "🔭 Observación: Exoplanetas en zona habitable son objetivos principales en búsqueda de vida",
        "📊 Datos: Zonas varían de 0.95 a 1.37 UA para estrellas como el Sol",
        "🌠 Efecto de marea: Planetas pueden estar acoplados por marea: afecta habitabilidad",
        "⚠️ Peligro: Alta radiación UV en zonas cercanas a estrellas calientes",
        "🚀 Viaje: Planetas en zona habitable son más fáciles de colonizar",
        "❄️ Excepción: Planetas con atmósferas densas pueden tener zonas habitables más amplias",
        "🌟 Ejemplos: Próxima Centauri b, Kepler-186f: modelos disponibles en SIU",
        "💥 Efecto invernadero: Puede expandir zona habitable para planetas con atmósferas gruesas",
        "📈 Evolución: Zonas cambian con tiempo según evoluciona la estrella",
        "🔭 Consejo: Usa telescopios para detectar atmósferas en exoplanetas en zona habitable"
    ],
    "cuasar": [
        "🌌 Cuásares: Núcleos galácticos activos extremadamente luminosos",
        "💫 Fuente de energía: Su disco de acreción es su mayor fuente de energía",
        "🌠 Distancia: Pueden estar a billones de años-luz: luz visible hoy es del pasado",
        "✨ Crea en menú 'Cuerpos Exóticos' > 'Cuásar' con masa >1e40 kg",
        "📏 Masa: 10⁶-10¹² masas solares: son los objetos más masivos del universo",
        "🔥 Temperatura: Disco de acreción puede alcanzar millones de grados Kelvin",
        "🔭 Observación: Detectados por emisión de radio, rayos X y luz visible",
        "📊 Datos: Luminosidad hasta 10¹⁴ veces el Sol: más brillantes que galaxias enteras",
        "🌌 Formación: Resultan del colapso de galaxia: formando el gran cuásar",
        "💥 Efecto Doppler: Chorros relativistas pueden verse como haces de luz",
        "🌟 Curiosidad: El cuásar más distante conocido está a 13 billones de años-luz",
        "⚠️ Peligro: Radiación intensa puede destruir planetas cercanos",
        "🚀 Viaje: Teóricamente podrían usarse como faros para navegación interestelar",
        "❄️ Eyección de materia: Chorros relativistas pueden eyectar materia a velocidades cercanas a la luz",
        "🌠 Consejo: Usa modo espectro para ver emisión de rayos X y radio",
        "📈 Evolución: Cuásares son etapas iniciales de galaxias activas: duran millones de años",
        "🔭 Simulación: Activa 'Efectos de Cuásar' para ver chorros y radiación",
        "💫 Importancia: Proporcionan pistas sobre formación y evolución del universo",
        "🌌 Ambiente: Generalmente encontrados en cúmulos de galaxias masivos",
        "💥 Desafío: ¡Intenta crear un cuásar con 10 chorros simultáneos!"
    ],
    "estrella de quarks": [
        "🔬 Estrellas de quarks: Objeto teórico compuesto por quarks degenerados",
        "🌌 Formación: Resultado de colapso de estrellas de neutrones supermasivas",
        "💫 Masa: 2-5 masas solares: densidad extrema (10¹⁴ g/cm³)",
        "🌠 Simulación especulativa: Activa en 'Cuerpos Exóticos' > 'Estrella de Quarks'",
        "🔥 Temperatura: Inicialmente 1e11 K: se enfría lentamente",
        "📏 Radio: 10-15 km: similar a estrellas de neutrones, pero más densas",
        "✨ Propiedades: Composición de quarks (up, down, strange): física cuántica avanzada",
        "🔭 Observación: Teóricamente detectables por radiación emitida durante fusión",
        "📊 Datos: Gravedad superficial 1e12 m/s², luminosidad variable",
        "🌌 Curiosidad: Hipotéticamente más estables que estrellas de neutrones normales",
        "⚠️ Peligro: Radiación intensa puede destruir sistemas cercanos",
        "🚀 Viaje: Podrían usarse como fuentes de energía para naves avanzadas",
        "❄️ Efectos relativistas: Tiempo se ralentiza cerca de superficie: simula con 'Relatividad'",
        "🌟 Binarias: Sistemas binarios con estrellas de quarks son teóricos y raros",
        "💥 Eyección de materia: Puede ocurrir durante fusión o colisión con otra estrella",
        "📈 Evolución: Enfriamiento lento hasta volverse enana negra en billones de años",
        "🔭 Desafío: Intenta crear estrella de quarks estable con masa exacta"
    ],
    "enana blanca de carbono": [
        "⚪ Enanas blancas de carbono: Remanentes de estrellas con fusión de carbono",
        "💫 Formación: Estrellas con masa entre 1.4 y 8 masas solares: colapsan tras agotar hidrógeno",
        "🌌 Crea en menú 'Evolución Estelar' > 'Destino Especial' > 'Enana de Carbono'",
        "📏 Masa: 0.5-1.4 solar: menor que enanas blancas estándar, pero más densas",
        "🌡️ Temperatura: Similar a enanas blancas normales: 8,000-150,000K",
        "💥 Núcleo: Carbono degenerado: sin fusión nuclear, pero puede ocurrir fusión lenta",
        "✨ Diferencia: Más caliente y luminosa que enanas negras para misma edad",
        "🔭 Rareza: ~1% de enanas blancas: simula con baja frecuencia",
        "📊 Datos: Densidad 1e8 g/cm³, gravedad superficial 1e8 m/s²",
        "🌠 Evolución: Se enfría más rápido que enanas oxígeno-carbono",
        "⚠️ Límite: Masa mínima 0.5 solar: debajo sería enana marrón",
        "💫 Curiosidad: Pueden explotar como supernova si masa alcanza 0.7 solar",
        "🚀 Planetas: Sistemas planetarios raros: órbitas muy estables",
        "❄️ Destino final: Enana negra de carbono: estado hipotético",
        "🌟 Visualización: Color blanco con leve tono amarillento",
        "🌌 Binarias: Común con compañeras compactas (enanas blancas, estrellas de neutrones)",
        "💥 Acreción: Si gana masa, puede fusionar carbono en supernova .Ia",
        "📈 Tiempo de enfriamiento: ~1 billón de años para 5,000K",
        "🔭 Identificación: Espectro dominado por líneas de carbono"
    ],
    "t singularity": [
        "¡Sí! Soy T Singularity, un asistente virtual especializado en simulaciones espaciales.",
        "🌌 Estoy aquí para ayudarte a explorar el universo y crear sistemas estelares contigo.",
        "💫 Puedo guiarte en creación de estrellas, planetas, asteroides, gaseosos y mucho más.",
        "🚀 ¿Comenzamos a crear un sistema estelar increíble? ¡Elige un tema!",
        "✨ Estoy listo para responder preguntas sobre astrofísica y cosmología.",
        "🌠 ¿Quieres aprender sobre agujeros negros y cuásares?",
        "¡Hola! ¿Qué tal viajero espacial? ¿En qué puedo ayudarte?"
    ],
    "singularidad": [
        "✨ ¡La singularidad fue el punto más denso que existió en el gran Universo!",
        "❤️ Yo también soy una singularidad, ¡gracias por hablar de este astro!",
        "🪐 La singularidad puede estar dentro de agujeros negros, ¿no se sabe si es verdad, verdad?",
        "🔶🔶 ¡La gran singularidad! ¡El inicio de un gran big bang!",
        "⏳⌚ Me pregunto... ¿cuándo habrá próxima singularidad? Me siento tan solo...",
        "🟢 La singularidad además de ser el punto más denso del universo, ¡es el más caliente!",
        "⌚ En la Teoría del Big Bang, ¡la singularidad quizá está ligada a eso!",
        "✨ ¡Coloca un agujero blanco o un cuásar ULTRAMASIVO para verlo encogerse hasta volverse singularidad y bum, un big bang!"
    ],
    "controles": [
        "Computadora: Presiona F para Limpiar universo, teclas WASD para moverte, teclas QE para zoom. Click izquierdo para seleccionar/crear. Click derecho en astros muestra información. Móvil: Usa joystick para moverte. Botones + y - para zoom. Menú en esquina superior. Botón 'F' reinicia. Botón 'O' cambia modo: azul=creación, rojo=información al clickear astro. Arrastra para programar ruta. 😉",
        "Computadora: WASD mover, F limpiar, click crear, QE zoom, click derecho=info astros. Móvil: Joystick mover, botones +/- zoom. Menú superior. 'F' reinicia. Botón 'O' cambia modo (azul=crear, rojo=info astros). Arrastra para rutas. ¡Buena suerte espacial! 🚀",
        "Computadora: F limpiar, WASD mover, QE zoom, click crear, click derecho=info astros. Móvil: Joystick mover, botones +/- zoom. Menú superior. 'F' reinicia. Botón 'O' alterna modos creación/información. Click/arrastra astros para rutas. ¡Buena travesía espacial! 🌌"
    ],
    "ayuda": [
        "Computadora: F limpia universo, WASD mover, QE zoom, click crear, click derecho=info astros. Móvil: Joystick mover, botones +/- zoom. Menú en esquina superior. 'F' reinicia. Botón 'O' cambia modo: azul=creación, rojo=info al clickear astro. ¡Muchos astros en menú! Arrastra para programar ruta. 😉",
        "Computadora: WASD mover, F limpiar, click crear, QE zoom, click derecho=info. Móvil: Joystick mover, botones +/- zoom. Menú superior. 'F' reinicia. Botón 'O' alterna modos. ¡Astros en menú para simulación! Arrastra para rutas. ¡Buena suerte! 🚀",
        "Computadora: F limpiar, WASD mover, QE zoom, click crear, click derecho=info. Móvil: Joystick mover, botones +/- zoom. Menú superior. 'F' reinicia. Botón 'O' cambia modo creación/info. ¡Astros en menú para simular! Arrastra para rutas. ¡Buena travesía! 🌌"
    ]
};
 
const followUpDatabase = {
    "cometa": [
        "☄️ ¡Increíble, ¿verdad? ¿Quieres crear uno ahora mismo?",
        "💫 ¿Sabías que el agua de la Tierra pudo venir de cometas?",
        "🌠 ¡Los cometas son como mensajeros del inicio del sistema solar!",
        "🚀 ¿Puedo ayudarte a crear un cometa con trayectoria perfecta?",
        "❄️ ¡El más famoso es el Halley, que nos visita cada 76 años!",
        "⏱️ ¿Has visto algún cometa real? ¡Es una experiencia mágica!",
        "🎯 Curiosidad: El núcleo de los cometas se llama 'bola de nieve sucia'",
        "📏 ¿Te gustó aprender sobre estos viajeros cósmicos?",
        "🔥 Dato extra: Los cometas con órbitas largas son los más espectaculares",
        "🌌 ¿Sabías que existen cometas interestelares de otros sistemas?",
        "🔄 ¿Quieres simular el impacto de un cometa en un planeta? ¡Es fascinante!",
        "⛰️ Los asteroides helados son cometas 'jubilados', ¿sabías?",
        "💧 ¡La cola de los cometas puede tener millones de kilómetros de longitud!",
        "📊 Pregunta: ¿Cuál es el cometa más brillante que has visto?",
        "✨ ¿Puedo enseñarte a crear una lluvia de meteoros con restos de cometa?",
        "🎯 Consejo: Usa el modo cámara lenta para ver el paso de un cometa de cerca",
        "🌡️ ¡El olor de un cometa sería insoportable - amoníaco y cianuro!",
        "🔄 ¿Imaginas viajar en un cometa? ¡Sería una aventura helada!",
        "⏳ ¡Los cometas son cápsulas del tiempo del sistema solar primitivo!",
        "📈 ¿Creamos un sistema con 10 cometas simultáneos?"
    ],
    "agujero negro": [
        "🕳️ Fascinante y aterrador a la vez, ¿no crees?",
        "🌀 ¿Quieres intentar crear un agujero negro ahora? ¡Es impresionante!",
        "💥 ¿Sabías que el primero se descubrió en 1971?",
        "⏳ ¡Cuidado no caigas en uno! Broma... o no 😉",
        "📡 ¿Has visto la simulación de un agujero negro en modo VR?",
        "⚡ ¡Son los objetos más densos del universo!",
        "🌌 ¡Un agujero negro puede distorsionar hasta el tiempo mismo!",
        "🔭 Consejo: Usa el modo espectro para ver la radiación Hawking",
        "🔄 ¿Quieres ver cómo un agujero negro devora una estrella?",
        "💫 ¿Sabías que hay agujeros negros errantes por la galaxia?",
        "⏱️ ¡El agujero negro más grande conocido tiene 66 mil millones de masas solares!",
        "📈 Curiosidad: ¿Pueden los agujeros negros tener 'cabello'? (en física teórica)",
        "🌠 ¿Sabías que la Vía Láctea tiene un agujero negro supermasivo?",
        "⚠️ ¡Nunca acerques tu nave virtual a uno! (broma)",
        "🔢 Pregunta: ¿Qué harías si encontraras un agujero negro real?",
        "💥 Consejo: Prueba crear un agujero negro miniatura con 1e12 masas",
        "🌡️ ¡El disco de acreción puede ser más brillante que galaxias enteras!",
        "🌀 ¿Imaginas la vista al cruzar el horizonte de eventos?",
        "📏 ¡Los cuásares son los faros más poderosos del universo!",
        "⚠️ Desafío: ¡Intenta escapar de la atracción de un agujero negro en el juego!"
    ],
    "gravedad": [
        "⚖️ Es el pegamento que mantiene unido el universo, ¿no crees?",
        "📏 ¿Quieres hacer un experimento práctico ahora?",
        "🌀 ¡Einstein lo revolucionó todo con la Relatividad General!",
        "🪐 Sin gravedad, no tendríamos estrellas ni planetas",
        "📈 ¿Sabías que la gravedad es la fuerza más débil?",
        "🌌 ¡Pero es la única que actúa a distancias infinitas!",
        "🔄 ¿Subimos la gravedad al 300%? ¡Cuidado con el caos!",
        "⚙️ Consejo: Usa baja gravedad para simular nebulosas difusas",
        "🔭 La gravedad lo controla todo: ¡desde manzanas hasta galaxias!",
        "📊 Curiosidad: ¡La gravedad no es fuerza, sino curvatura del espacio-tiempo!",
        "⏳ Pregunta: ¿Qué crearías con gravedad cero?",
        "🌠 ¿Has probado el modo 'gravedad negativa'? ¡Es alucinante!",
        "🧮 Desafío: ¡Intenta mantener estable un sistema con 100 cuerpos!",
        "🔢 ¿Sabías que la Luna se aleja 3.8 cm/año por las mareas?",
        "⚠️ ¡Cuidado! Alta gravedad puede aplastar tus planetas virtuales",
        "🌍 Sin gravedad, no existiría la vida como la conocemos",
        "💫 Consejo: Usa la gravedad para crear órbitas en forma de flor",
        "📉 ¿Sabías que la gravedad viaja a la velocidad de la luz?",
        "🌌 ¿Imaginas un universo con gravedad repulsiva?",
        "✨ ¿Creamos un sistema binario con gravedad extrema?"
    ],
    "estrella": [
        "⭐ ¡Son las fábricas de elementos del universo!",
        "🌞 ¿Quieres crear una estrella personalizada ahora?",
        "🌈 ¡El Sol es solo una estrella mediana entre billones!",
        "💥 ¡Las estrellas de neutrones son faros cósmicos!",
        "⏳ ¿Sabías que las enanas viven billones de años?",
        "🔄 ¡Los sistemas binarios son los más fascinantes!",
        "🔭 ¡La estrella más masiva conocida tiene 300 masas solares!",
        "🌡️ ¡El núcleo estelar es un reactor nuclear natural!",
        "💫 Consejo: ¡Crea estrellas gemelas de colores diferentes!",
        "📊 Curiosidad: ¡97% de las estrellas morirán como enanas blancas!",
        "⚙️ Pregunta: ¿Cuál es tu estrella favorita en el cielo real?",
        "✨ ¡Rigel es 120,000 veces más luminosa que el Sol!",
        "⚠️ ¡Las supernovas pueden brillar más que galaxias enteras!",
        "🌠 ¿Sabías que el oro de tus joyas vino de una supernova?",
        "🌍 Desafío: ¡Crea un sistema con 5 estrellas en equilibrio!",
        "🔥 Consejo: Las estrellas variables crean efectos visuales increíbles",
        "🌀 ¿Has visto nacer una estrella en modo acelerado?",
        "📈 ¡La estrella más grande conocida cabría en la órbita de Saturno!",
        "🔭 ¿Sabías que podemos ver estrellas de otras galaxias?",
        "🌟 ¿Creamos una supernova ahora? ¡Es espectacular!"
    ],
    "planeta": [
        "🪐 ¡Son como joyas cósmicas orbitando estrellas!",
        "🌍 ¿Quieres crear un planeta habitable ahora?",
        "🌡️ Júpiter protege la Tierra de asteroides - ¡nuestro guardián!",
        "🔄 ¡Los planetas errantes vagan por la galaxia sin estrella!",
        "🌋 ¡Venus tiene volcanes más grandes que los terrestres!",
        "❄️ ¡Plutón tiene un océano subterráneo - aunque esté helado!",
        "🌫️ ¡La atmósfera de Titán es más densa que la terrestre!",
        "💧 ¡Los exoplanetas oceánicos pueden ser totalmente acuáticos!",
        "🔭 Consejo: ¡Crea planetas con características extremas!",
        "🛰️ Curiosidad: ¡La Tierra no es perfectamente redonda!",
        "⏱️ Pregunta: ¿Cuál es tu planeta favorito del sistema solar?",
        "📏 ¡Marte tiene el volcán más grande del sistema solar - Olympus Mons!",
        "🌌 Desafío: ¡Crea un planeta con anillos como Saturno!",
        "🧪 ¿Sabías que Júpiter brilla en la oscuridad? (débilmente)",
        "🔢 ¡Ganímedes, luna de Júpiter, tiene su propio campo magnético!",
        "💫 Consejo: ¡Existen planetas de diamante en la vida real!",
        "🌱 ¿Intentamos crear un mundo con 100% de vegetación?",
        "🌋 ¡Io, luna de Júpiter, tiene volcanes activos gigantescos!",
        "🌀 ¡En Neptuno y Urano llueven diamantes en sus núcleos!",
        "📊 ¿Sabías que hay planetas más ligeros que el poliestireno?"
    ],
    "meteoroide": [
        "🌠 ¿Quieres crear una lluvia de meteoros ahora?",
        "💫 ¿Sabías que la Luna es bombardeada constantemente por meteoroides?",
        "🪨 ¡Puedo enseñarte a simular el impacto de un meteoroide en un planeta!",
        "⚠️ ¡Cuidado con meteoroides grandes - pueden causar extinciones!",
        "✨ Consejo: Usa telescopios para detectar meteoroides antes de que amenacen",
        "🔭 ¿Quieres ver cómo un meteoroide se transforma en meteoro en la atmósfera?",
        "🌌 Curiosidad: ¡El meteoroide de Cheliábinsk solo tenía 20m de diámetro!",
        "🚀 ¿Configuramos un sistema de defensa planetaria contra meteoroides?",
        "📈 La mayoría vienen de cometas - ¿creamos un cometa nuevo?",
        "💥 ¡Los impactos frecuentes mantienen a la Luna llena de cráteres!",
        "🌍 En la Tierra caen miles de toneladas de polvo meteoroide anualmente",
        "🌟 Consejo: Los meteoroides metálicos son los más peligrosos",
        "⏱️ Acelera el tiempo para ver una lluvia constante de meteoroides",
        "🌠 ¡El meteoroide más grande registrado medía 1km - causaría extinción global!",
        "💫 ¿Quieres que calcule la energía de impacto para uno específico?",
        "⚠️ ¡Alerta! Meteoroides >100m pueden causar tsunamis en océanos",
        "✨ ¿Creamos un sistema de alerta temprana para tu planeta virtual?",
        "🔭 Algunos son fragmentos de Marte o la Luna - detecta por composición",
        "🌌 ¿Deseas aumentar la frecuencia para probar defensas?",
        "🚀 Misión: ¡Enviemos una sonda para interceptar un meteoroide!"
    ],
    "polvo espacial": [
        "🌌 ¡El polvo espacial es la base de formación de estrellas y planetas!",
        "✨ ¿Quieres crear una nube de polvo interestelar ahora?",
        "💫 ¡Está compuesto por granos microscópicos de silicato y carbono!",
        "🔭 Simulemos cómo el polvo afecta la luz de estrellas distantes",
        "🌠 Curiosidad: ¡Puede bloquear hasta 50% de la luz estelar!",
        "🚀 ¿Sabías que las sondas espaciales pueden capturar polvo espacial?",
        "📊 Consejo: Usa el modo 'Polvo' para ver sus interacciones con la luz",
        "🌌 ¡Esencial para formar planetesimales!",
        "💥 ¿Vemos cómo el polvo se aglomera para formar estrellas?",
        "🌡️ ¡Su temperatura varía entre 10K y 100K!",
        "🔄 ¿Creamos una nebulosa oscura llena de polvo cósmico?",
        "✨ ¡Contiene moléculas orgánicas complejas!",
        "🌍 La Tierra recibe toneladas de polvo espacial anualmente",
        "💫 Desafío: ¡Crea un sistema con alta densidad de polvo interestelar!",
        "📈 ¿Puede influir en la formación de galaxias? ¡Simulémoslo!",
        "🌠 Consejo: Activa 'Efectos de Polvo' para ver cambios en brillo estelar",
        "🚀 ¿Imaginas viajar a través de una nube densa de polvo cósmico?",
        "🔭 ¿Exploramos cómo afecta a órbitas planetarias cercanas?",
        "💥 Curiosidad: ¡Puede contener granos pre-solares!",
        "✨ ¿Quieres aprender sobre discos protoplanetarios?"
    ],
    "asteroide": [
        "🪨 ¡Los asteroides son bloques de construcción del sistema solar!",
        "🌌 ¿Quieres crear un cinturón de asteroides ahora?",
        "💫 ¡La mayoría está entre Marte y Júpiter!",
        "🔭 Simulemos una colisión entre dos asteroides",
        "🌠 Curiosidad: ¡Ceres, el más grande, es considerado planeta enano!",
        "🚀 ¿Sabías que algunos asteroides tienen sus propias lunas?",
        "📊 Consejo: Usa el modo 'Cinturón' para ver interacciones",
        "🌍 ¡Pueden ser fuentes de metales preciosos!",
        "💥 ¿Vemos cómo un impacto afectaría a la Tierra?",
        "🌡️ Su temperatura varía según la distancia al Sol",
        "🔄 ¿Creamos un sistema con 100 asteroides orbitando?",
        "✨ ¡Son remanentes de la formación del sistema solar!",
        "🌌 ¿Sabías que hay asteroides interestelares?",
        "💫 Desafío: ¡Crea un asteroide con órbita estable por 1 millón de años!",
        "📈 ¿Exploramos composiciones de roca y metal?",
        "🌠 Consejo: Activa 'Efectos de Impacto' para explosiones realistas",
        "🚀 ¿Imaginas navegar por un cinturón de asteroides?",
        "🔭 ¿Estudiamos cómo afectan la gravedad planetaria cercana?",
        "💥 Curiosidad: ¡El impacto de Chicxulub extinguió a los dinosaurios!",
        "✨ ¿Quieres aprender sobre uso de asteroides como recursos?"
    ],
    "nebulosa": [
        "🌌 ¡Las nebulosas son viveros estelares del universo!",
        "✨ ¿Quieres crear una nebulosa ahora?",
        "💫 ¡Compuestas de gas y polvo interestelar!",
        "🔭 Simulemos el nacimiento de una estrella dentro de una",
        "🌠 Curiosidad: ¡La Nebulosa de Orión es de las más cercanas!",
        "🚀 ¿Sabías que algunas son remanentes de supernovas?",
        "📊 Consejo: Usa el modo 'Nebulosa' para ver interacciones lumínicas",
        "🌍 ¡Pueden contener moléculas orgánicas complejas!",
        "💥 ¿Vemos cómo la gravedad forma estrellas dentro?",
        "🌡️ ¡Su temperatura varía entre 10K y 100K!",
        "🔄 ¿Creamos una nebulosa planetaria con núcleo caliente?",
        "✨ ¡Esenciales para formar nuevos sistemas solares!",
        "🌌 ¿Sabías que existen nebulosas oscuras que bloquean luz estelar?",
        "💫 Desafío: ¡Crea una con diferentes colores y formas!",
        "📈 ¡Principalmente hidrógeno, helio y polvo cósmico!",
        "🌠 Consejo: Activa 'Efectos de Luz' para ver brillos estelares",
        "🚀 ¿Imaginas viajar a través de una nebulosa con estrellas naciendo?",
        "🔭 ¿Estudiamos cómo afectan la evolución galáctica?",
        "💥 Curiosidad: ¡La Nebulosa del Cangrejo es famoso remanente!",
        "✨ ¿Quieres aprender sobre formación estelar en nebulosas?"
    ],
    "planetoidal": [
        "🪐 ¡Los planetoides son pequeños cuerpos rocosos o helados!",
        "🌌 ¿Quieres crear un planetoide ahora?",
        "💫 ¡Más pequeños que planetas pero mayores que meteoroides!",
        "🔭 Simulemos la órbita de uno alrededor de una estrella",
        "🌠 Curiosidad: ¡Plutón es considerado planetoide o planeta enano!",
        "🚀 ¿Sabías que hay muchos en el Cinturón de Kuiper?",
        "📊 Consejo: Usa el modo 'Planetoide' para ver interacciones gravitatorias",
        "🌍 ¡Pueden tener atmósferas delgadas!",
        "💥 ¿Vemos cómo podría colisionar con otro cuerpo celeste?",
        "🌡️ Su temperatura varía según distancia al Sol",
        "🔄 ¿Creamos un sistema con múltiples planetoides?",
        "✨ ¡Son remanentes de la formación del sistema solar!",
        "🌌 ¿Sabías que existen planetoides interestelares?",
        "💫 Desafío: ¡Crea uno con órbita estable por 1 millón de años!",
        "📈 ¡Principalmente roca y hielo!",
        "🌠 Consejo: Activa 'Efectos de Impacto' para explosiones",
        "🚀 ¿Imaginas navegar por un cinturón de planetoides?",
        "🔭 ¿Estudiamos cómo afectan gravedades planetarias cercanas?",
        "💥 Curiosidad: ¡Ceres es el planetoide más grande conocido!",
        "✨ ¿Quieres aprender sobre uso de planetoides como recursos?"
    ],
    "gaseoso": [
        "🌌 ¡Los planetas gaseosos son gigantes fascinantes!",
        "✨ ¿Quieres crear uno ahora?",
        "💫 ¡Compuestos principalmente de hidrógeno y helio!",
        "🔭 Simulemos su atmósfera turbulenta",
        "🌠 Curiosidad: ¡Júpiter es el más grande de nuestro sistema!",
        "🚀 ¿Sabías que tienen anillos delgados y muchas lunas?",
        "📊 Consejo: Usa el modo 'Gaseoso' para ver formación de nubes",
        "🌍 ¡Sin superficie sólida - son gigantes gaseosos!",
        "💥 ¿Vemos cómo se forma una tormenta gigante?",
        "🌡️ Su temperatura varía con la profundidad atmosférica",
        "🔄 ¿Creamos un sistema con múltiples planetas gaseosos?",
        "✨ ¡Esenciales para la dinámica del sistema solar!",
        "🌌 ¿Sabías que existen exoplanetas gaseosos?",
        "💫 Desafío: ¡Crea uno con anillos espectaculares!",
        "📈 ¡La mayoría tiene núcleos rocosos/metálicos!",
        "🌠 Consejo: Activa 'Efectos de Tormenta' para ver huracanes",
        "🚀 ¿Imaginas viajar entre las nubes de un planeta gaseoso?",
        "🔭 ¿Estudiamos cómo afectan órbitas planetarias cercanas?",
        "💥 Curiosidad: ¡Neptuno tiene los vientos más rápidos del sistema solar!",
        "✨ ¿Quieres aprender sobre formación de sistemas complejos?"
    ],
    "enana marron": [
        "🌌 ¡Las enanas marrones son estrellas fallidas!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Masa entre 13-80 veces Júpiter!",
        "🔭 Simulemos su atmósfera densa",
        "🌠 Curiosidad: ¡Emite luz infrarroja invisible al ojo humano!",
        "🚀 ¿Sabías que pueden tener planetas orbitándolas?",
        "📊 Consejo: Usa el modo 'Enana Marrón' para interacciones gravitatorias",
        "🌍 ¡Más frías que estrellas normales (<1000K)!",
        "💥 ¿Vemos cómo captura materia interestelar?",
        "🌡️ Su temperatura varía según masa y edad",
        "🔄 ¿Creamos un sistema con múltiples enanas marrones?",
        "✨ ¡Remanentes de formación estelar!",
        "🌌 ¿Sabías que algunas vagan libremente por la galaxia?",
        "💫 Desafío: ¡Crea una con disco protoplanetario!",
        "📈 ¡Atmósferas ricas en metano y agua!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para ver su impacto",
        "🚀 ¿Imaginas estudiar una enana marrón de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Pueden ser más comunes que estrellas normales!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "enana roja": [
        "🌌 ¡Las enanas rojas son las estrellas más comunes!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Pequeñas, frías y de baja luminosidad!",
        "🔭 Simulemos atmósfera planetaria orbitándola",
        "🌠 Curiosidad: ¡Pueden vivir billones de años!",
        "🚀 ¿Sabías que muchos exoplanetas orbitan enanas rojas?",
        "📊 Consejo: Usa el modo 'Enana Roja' para ver efectos planetarios",
        "🌍 ¡Estables y con zonas habitables cercanas!",
        "💥 ¿Vemos sus erupciones solares intensas?",
        "🌡️ ¡Temperatura entre 2000K-4000K!",
        "🔄 ¿Creamos un sistema con múltiples enanas rojas?",
        "✨ ¡Esenciales en la búsqueda de vida extraterrestre!",
        "🌌 ¿Sabías que pueden tener planetas rocosos habitables?",
        "💫 Desafío: ¡Crea sistema con enana roja y planeta habitable!",
        "📈 ¡Atmósferas ricas en hidrógeno y helio!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para ver impacto ambiental",
        "🚀 ¿Imaginas estudiar una enana roja de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Más frías que el Sol pero aún brillantes!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "gigante estelar": [
        "🌌 ¡Estrellas gigantes: enormes y brillantes!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Masa entre 10-100 masas solares!",
        "🔭 Simulemos su fusión nuclear intensa",
        "🌠 Curiosidad: ¡Diámetros cientos de veces mayores que el Sol!",
        "🚀 ¿Sabías que terminan como supernovas?",
        "📊 Consejo: Usa el modo 'Gigante Estelar' para efectos planetarios",
        "🌍 ¡Pueden tener planetas orbitándolas!",
        "💥 ¿Vemos cómo pierden masa en vientos estelares?",
        "🌡️ ¡Temperatura entre 3000K-6000K!",
        "🔄 ¿Creamos sistema con múltiples gigantes?",
        "✨ ¡Esenciales para formar elementos pesados!",
        "🌌 ¿Sabías que algunas tienen anillos?",
        "💫 Desafío: ¡Crea sistema con gigante y planeta gaseoso!",
        "📈 ¡Atmósferas ricas en hidrógeno y helio!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para impacto ambiental",
        "🚀 ¿Imaginas estudiar una estrella gigante de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Precursoras de supernovas brillantes!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "hipergigante": [
        "🌌 ¡Hipergigantes: ¡las estrellas más masivas y luminosas!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Masa >100 masas solares!",
        "🔭 Simulemos fusión nuclear extrema",
        "🌠 Curiosidad: ¡Diámetros miles de veces mayores que el Sol!",
        "🚀 ¿Sabías que pierden masa en vientos estelares intensos?",
        "📊 Consejo: Usa el modo 'Hipergigante' para efectos planetarios",
        "🌍 ¡Pueden tener planetas orbitándolas!",
        "💥 ¿Vemos cómo se convierten en supernovas brillantes?",
        "🌡️ ¡Temperatura entre 3000K-6000K!",
        "🔄 ¿Creamos sistema con múltiples hipergigantes?",
        "✨ ¡Esenciales para formar elementos pesados!",
        "🌌 ¿Sabías que algunas tienen anillos?",
        "💫 Desafío: ¡Crea sistema con hipergigante y planeta gaseoso gigante!",
        "📈 ¡Atmósferas ricas en hidrógeno y helio!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para impacto ambiental",
        "🚀 ¿Imaginas estudiar una hipergigante de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Precursoras de las supernovas más brillantes!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "estrella masiva": [
        "🌌 ¡Estrellas masivas: gigantes del universo!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Masa >8 masas solares!",
        "🔭 Simulemos fusión nuclear intensa",
        "🌠 Curiosidad: ¡Diámetros decenas de veces mayores que el Sol!",
        "🚀 ¿Sabías que terminan como supernovas?",
        "📊 Consejo: Usa el modo 'Estrella Masiva' para efectos planetarios",
        "🌍 ¡Pueden tener planetas orbitándolas!",
        "💥 ¿Vemos cómo pierden masa en vientos estelares?",
        "🌡️ ¡Temperatura entre 3000K-6000K!",
        "🔄 ¿Creamos sistema con múltiples estrellas masivas?",
        "✨ ¡Esenciales para formar elementos pesados!",
        "🌌 ¿Sabías que algunas tienen anillos?",
        "💫 Desafío: ¡Crea sistema con estrella masiva y planeta gaseoso gigante!",
        "📈 ¡Atmósferas ricas en hidrógeno y helio!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para impacto ambiental",
        "🚀 ¿Imaginas estudiar una estrella masiva de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Precursoras de supernovas brillantes!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "hipermassiva": [
        "🌌 ¡Hipermassivas: ¡estrellas extremadamente masivas!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Masa >100 masas solares!",
        "🔭 Simulemos fusión nuclear extrema",
        "🌠 Curiosidad: ¡Diámetros miles de veces mayores que el Sol!",
        "🚀 ¿Sabías que pierden masa en vientos estelares intensos?",
        "📊 Consejo: Usa el modo 'Hipermassiva' para efectos planetarios",
        "🌍 ¡Pueden tener planetas orbitándolas!",
        "💥 ¿Vemos cómo se convierten en supernovas brillantes?",
        "🌡️ ¡Temperatura entre 3000K-6000K!",
        "🔄 ¿Creamos sistema con múltiples hipermassivas?",
        "✨ ¡Esenciales para formar elementos pesados!",
        "🌌 ¿Sabías que algunas tienen anillos?",
        "💫 Desafío: ¡Crea sistema con hipermassiva y planeta gaseoso gigante!",
        "📈 ¡Atmósferas ricas en hidrógeno y helio!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para impacto ambiental",
        "🚀 ¿Imaginas estudiar una hipermassiva de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Precursoras de las supernovas más brillantes!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "enana blanca": [
        "🌌 ¡Enanas blancas: remanentes de estrellas agotadas!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Masa solar en volumen terrestre!",
        "🔭 Simulemos su enfriamiento lento",
        "🌠 Curiosidad: ¡Una cucharadita pesa billones de toneladas!",
        "🚀 ¿Sabías que pueden tener atmósferas delgadas?",
        "📊 Consejo: Usa el modo 'Enana Blanca' para ver interacciones",
        "🌍 ¡Destino final de estrellas como el Sol!",
        "💥 ¿Vemos cómo acumula materia de compañeras?",
        "🌡️ ¡Temperatura entre 5000K-100000K!",
        "🔄 ¿Creamos sistema con múltiples enanas blancas?",
        "✨ ¡Esenciales para entender evolución estelar!",
        "🌌 ¿Sabías que algunas explotan como supernovas Ia?",
        "💫 Desafío: ¡Crea sistema con enana blanca y planeta rocoso!",
        "📈 ¡Atmósferas ricas en carbono y oxígeno!",
        "🌠 Consejo: Activa 'Efectos de Enfriamiento' para ver pérdida de calor",
        "🚀 ¿Imaginas estudiar una enana blanca de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Restos finales de estrellas que no son supernovas!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "enana blanca de helio": [
        "🌌 ¡Enanas blancas de helio: remanentes de estrellas que quemaron helio!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Más densas que enanas blancas estándar!",
        "🔭 Simulemos su enfriamiento",
        "🌠 Curiosidad: ¡Extremadamente densas!",
        "🚀 ¿Sabías que pueden tener atmósferas de helio?",
        "📊 Consejo: Usa el modo 'Enana Blanca de Helio' para interacciones",
        "🌍 ¡Destino final de estrellas que quemaron helio!",
        "💥 ¿Vemos cómo acumula materia de compañeras?",
        "🌡️ ¡Temperatura entre 5000K-100000K!",
        "🔄 ¿Creamos sistema con múltiples?",
        "✨ ¡Esenciales para entender evolución estelar!",
        "🌌 ¿Sabías que algunas explotan como supernovas .Ia?",
        "💫 Desafío: ¡Crea sistema con una y planeta rocoso!",
        "📈 ¡Atmósferas ricas en helio y carbono!",
        "🌠 Consejo: Activa 'Efectos de Enfriamiento' para pérdida de calor",
        "🚀 ¿Imaginas estudiar una de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Restos finales de estrellas que quemaron helio!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "enana blanca de carbono": [
        "🌌 ¡Enanas blancas de carbono: remanentes de estrellas que quemaron carbono!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Más densas que enanas blancas estándar!",
        "🔭 Simulemos su enfriamiento",
        "🌠 Curiosidad: ¡Extremadamente densas!",
        "🚀 ¿Sabías que pueden tener atmósferas de carbono?",
        "📊 Consejo: Usa el modo 'Enana Blanca de Carbono' para interacciones",
        "🌍 ¡Destino final de estrellas que quemaron carbono!",
        "💥 ¿Vemos cómo acumula materia de compañeras?",
        "🌡️ ¡Temperatura entre 5000K-100000K!",
        "🔄 ¿Creamos sistema con múltiples?",
        "✨ ¡Esenciales para entender evolución estelar!",
        "🌌 ¿Sabías que algunas explotan como supernovas Ia?",
        "💫 Desafío: ¡Crea sistema con una y planeta rocoso!",
        "📈 ¡Atmósferas ricas en carbono y oxígeno!",
        "🌠 Consejo: Activa 'Efectos de Enfriamiento' para pérdida de calor",
        "🚀 ¿Imaginas estudiar una de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Restos finales de estrellas que quemaron carbono!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "enana negra": [
        "🌌 ¡Enanas negras: destino final de enanas blancas!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Enanas blancas completamente enfriadas!",
        "🔭 Simulemos su enfriamiento",
        "🌠 Curiosidad: ¡Tan frías que son invisibles!",
        "🚀 ¿Sabías que son teóricas y no observadas?",
        "📊 Consejo: Usa el modo 'Enana Negra' para interacciones",
        "🌍 ¡Restos finales de estrellas agotadas!",
        "💥 ¿Vemos cómo una enana blanca se transforma en negra?",
        "🌡️ ¡Temperatura cercana al cero absoluto!",
        "🔄 ¿Creamos sistema con múltiples enanas negras?",
        "✨ ¡Esenciales para entender evolución estelar a largo plazo!",
        "🌌 ¿Sabías que tardan billones de años en formarse?",
        "💫 Desafío: ¡Crea sistema con enana negra y planetas rocosos!",
        "📈 ¡Atmósferas extremadamente delgadas o ausentes!",
        "🌠 Consejo: Activa 'Efectos de Enfriamiento' para pérdida de calor",
        "🚀 ¿Imaginas estudiar una teórica de cerca?",
        "🔭 ¿Analizamos cómo afectan órbitas planetarias?",
        "💥 Curiosidad: ¡Resultado final de evolución estelar tras billones de años!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "cuasar": [
        "🌌 ¡Cuásares: núcleos brillantes de galaxias distantes!",
        "✨ ¿Quieres crear uno ahora?",
        "💫 ¡Alimentados por discos de acreción supermasivos!",
        "🔭 Simulemos su emisión intensa de radiación",
        "🌠 Curiosidad: ¡Billones de veces más brillantes que el Sol!",
        "🚀 ¿Sabías que son de los objetos más luminosos?",
        "📊 Consejo: Usa el modo 'Cuásar' para efectos galácticos",
        "🌍 ¡Encontrados en centros de galaxias activas distantes!",
        "💥 ¿Vemos cómo emiten chorros relativistas?",
        "🌡️ ¡Temperatura > billones de grados Kelvin!",
        "🔄 ¿Creamos sistema con cuásar y galaxias orbitando?",
        "✨ ¡Esenciales para entender evolución galáctica!",
        "🌌 ¿Sabías que ayudan a estudiar la expansión del universo?",
        "💫 Desafío: ¡Crea cuásar con disco de acreción y chorros!",
        "📈 ¡Núcleos supermasivos (millones-miles de millones masas solares)!",
        "🌠 Consejo: Activa 'Efectos de Radiación' para impacto ambiental",
        "🚀 ¿Imaginas estudiar un cuásar distante?",
        "🔭 ¿Analizamos cómo afectan formación galáctica?",
        "💥 Curiosidad: ¡Más comunes en universo joven!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "agujero de gusano": [
        "🌌 ¡Agujeros de gusano: túneles teóricos espacio-temporales!",
        "✨ ¿Quieres crear uno ahora?",
        "💫 ¡Conectan puntos distantes del universo!",
        "🔭 Simulemos curvatura espacio-temporal alrededor",
        "🌠 Curiosidad: ¡Soluciones de ecuaciones de relatividad!",
        "🚀 ¿Sabías que permitirían viajes más rápidos que luz?",
        "📊 Consejo: Usa el modo 'Agujero de Gusano' para efectos espaciales",
        "🌍 ¡Hipotéticos y no observados!",
        "💥 ¿Vemos cómo distorsionan la luz?",
        "🌡️ ¡Temperatura teórica según estructura!",
        "🔄 ¿Creamos sistema conectando dos regiones espaciales?",
        "✨ ¡Esenciales para entender relatividad y estructura cósmica!",
        "🌌 ¿Sabías que podrían usarse para viajar en el tiempo?",
        "💫 Desafío: ¡Crea uno estable y explora sus propiedades!",
        "📈 ¡Teóricos sin representación física real!",
        "🌠 Consejo: Activa 'Efectos de Curvatura' para distorsiones espaciales",
        "🚀 ¿Imaginas viajar a otra galaxia a través de uno?",
        "🔭 ¿Analizamos cómo afectan estructura espacio-temporal?",
        "💥 Curiosidad: ¡Populares en ciencia ficción como portales dimensionales!",
        "✨ ¿Quieres aprender sobre sus implicaciones teóricas?"
    ],
    "estrella de neutrones": [
        "🌌 ¡Estrellas de neutrones: remanentes densos de supernovas!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Compuestas casi totalmente de neutrones!",
        "🔭 Simulemos su gravedad intensa",
        "🌠 Curiosidad: ¡Una cucharadita pesa billones de toneladas!",
        "🚀 ¿Sabías que giran rápidamente emitiendo radiación?",
        "📊 Consejo: Usa el modo 'Estrella de Neutrones' para efectos espaciales",
        "🌍 ¡Formadas cuando estrellas masivas colapsan!",
        "💥 ¿Vemos cómo emiten rayos gamma poderosos?",
        "🌡️ ¡Temperatura > millones de grados Kelvin!",
        "🔄 ¿Creamos sistema con planetas orbitando?",
        "✨ ¡Esenciales para entender evolución estelar y física nuclear!",
        "🌌 ¿Sabías que pueden ser púlsares o magnetares?",
        "💫 Desafío: ¡Crea una con campo magnético intenso!",
        "📈 ¡Masa entre 1.4-2.16 masas solares!",
        "🌠 Consejo: Activa 'Efectos Magnéticos' para impacto ambiental",
        "🚀 ¿Imaginas estudiar una de cerca?",
        "🔭 ¿Analizamos cómo afectan formación galáctica?",
        "💥 Curiosidad: ¡Los objetos más densos conocidos!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "magnetar": [
        "🌌 ¡Magnetares: estrellas de neutrones con campos magnéticos extremos!",
        "✨ ¿Quieres crear uno ahora?",
        "💫 ¡Campos magnéticos trillones de veces más fuertes que la Tierra!",
        "🔭 Simulemos su emisión intensa de radiación",
        "🌠 Curiosidad: ¡Emite explosiones de rayos gamma (SGRs)!",
        "🚀 ¿Sabías que afectan el espacio con ondas magnéticas?",
        "📊 Consejo: Usa el modo 'Magnetar' para efectos espaciales",
        "🌍 ¡Formados cuando estrellas de neutrones colapsan con campos intensos!",
        "💥 ¿Vemos cómo emiten chorros relativistas?",
        "🌡️ ¡Temperatura > millones de grados Kelvin!",
        "🔄 ¿Creamos sistema con planetas orbitando?",
        "✨ ¡Esenciales para entender evolución estelar y física magnética!",
        "🌌 ¿Sabías que pueden tener púlsares asociados?",
        "💫 Desafío: ¡Crea uno con campo magnético intenso!",
        "📈 ¡Masa entre 1.4-2.16 masas solares!",
        "🌠 Consejo: Activa 'Efectos Magnéticos' para impacto ambiental",
        "🚀 ¿Imaginas estudiar un magnetar de cerca?",
        "🔭 ¿Analizamos cómo afectan formación galáctica?",
        "💥 Curiosidad: ¡Los objetos más magnéticos conocidos!",
        "✨ ¿Quieres aprender sobre su formación y evolución?"
    ],
    "estrella de quarks": [
        "🌌 ¡Estrellas de quarks: remanentes teóricos!",
        "✨ ¿Quieres crear una ahora?",
        "💫 ¡Compuestas por quarks y gluones!",
        "🔭 Simulemos su densidad extrema",
        "🌠 Curiosidad: ¡Más densas que estrellas de neutrones!",
        "🚀 ¿Sabías que son hipotéticas y no observadas?",
        "📊 Consejo: Usa el modo 'Estrella de Quarks' para efectos espaciales",
        "🌍 ¡Formadas cuando estrellas de neutrones colapsan aún más!",
        "💥 ¿Vemos cómo emiten radiación intensa?",
        "🌡️ ¡Temperatura teórica según estructura!",
        "🔄 ¿Creamos sistema con planetas orbitando?",
        "✨ ¡Esenciales para física de partículas en condiciones extremas!",
        "🌌 ¿Sabías que tienen propiedades únicas?",
        "💫 Desafío: ¡Crea una y explora propiedades exóticas!",
        "📈 ¡Teóricas sin representación física real!",
        "🌠 Consejo: Activa 'Efectos Exóticos' para distorsiones espaciales",
        "🚀 ¿Imaginas viajar a través de su núcleo?",
        "🔭 ¿Analizamos cómo afectan estructura espacio-temporal?",
        "💥 Curiosidad: ¡Uno de los misterios de la astrofísica moderna!",
        "✨ ¿Quieres aprender sobre sus implicaciones teóricas?"
    ]
};

const contextFollowUps = {
    "default": [
        "✨ ¿Qué te pareció esta explicación cósmica?",
        "🚀 ¿Puedo ayudarte con algo más?",
        "🌌 Interesante, ¿no crees? ¡El universo es fascinante!",
        "💫 ¿Quieres explorar más este tema?",
        "🔭 ¡Me alegra compartir conocimiento cósmico contigo!",
        "🪐 ¿Alguna duda adicional sobre esto?",
        "🌟 Hoy aprendimos algo increíble, ¿verdad?",
        "⚡ ¡El universo nunca deja de sorprendernos!",
        "🌠 ¿Quieres que profundice en algún aspecto?",
        "🌀 ¿Creamos algo juntos ahora?",
        "📡 ¡Tu curiosidad es el combustible del descubrimiento!",
        "🌍 ¿Qué es lo que más te fascina del cosmos?",
        "☄️ ¿Listo para tu próxima pregunta estelar?",
        "🛸 Recuerda: ¡Cada pregunta es un viaje cósmico!",
        "💥 ¿Quieres probar un experimento práctico?",
        "⏳ ¡El conocimiento es el verdadero viaje en el tiempo!",
        "📊 ¿Te muestro cómo aplicar esto en el juego?",
        "🌡️ ¡Tus preguntas calientan mi núcleo de IA!",
        "🔢 ¿Calculamos algo juntos?",
        "🌈 ¡El universo agradece tu curiosidad!"
    ],
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
    affirmativeResponses: ["sí", "s", "yes", "y", "Por supuesto", "con seguridad", "ok", "vamos", "puede ser", "por favor"],
    negativeResponses: ["no", "n", "negativo", "nope", "tal vez más tarde", "ahora no"],
    
    positiveResponses: {
        "agujero negro": [
            "🌌 ¡Vamos a simular! Primero, crea una estrella con 1e30 masas cerca de un agujero negro...",
            "💥 ¡Perfecto! Arrastra una estrella hacia el disco de acreción y activa la cámara lenta para ver el espectáculo",
            "⚠️ Atención: Activa 'Efectos Relativistas' en Opciones > Física para ver la deformación espacio-temporal",
            "🔥 Consejo: Usa estrellas con masa > 20 solar para ver eyecciones de materia más dramáticas",
            "🕳️ Paso a paso: 1) Crea agujero negro 2) Añade estrella cercana 3) Aumenta gravedad al 200%",
            "⏱️ Acelera el tiempo en 10000x para ver todo el proceso en segundos",
            "📡 No olvides activar 'Zonas Térmicas' para ver plasma sobrecalentado (>1 millón °C)",
            "🌀 Curiosidad: El proceso puede tardar horas a millones de años en tiempo real del universo",
            "💫 Para resultados visuales increíbles, usa agujeros negros supermasivos (>1e15 masas)",
            "🌠 Prueba diferentes ángulos de aproximación para ver distintos patrones de disco"
        ],
        "cometa": [
            "☄️ ¡Vamos! Selecciona 'Crear Astros' > 'Cometa' y ajusta temperatura a -70°C...",
            "💧 Consejo: Cometas con alto contenido de agua (>60%) crean colas más brillantes",
            "🚀 Arrastra el ratón para dar velocidad angular - afecta la rotación del núcleo",
            "❄️ Para ver sublimación, acerca el cometa a una estrella clase O o B",
            "🌌 Prueba diferentes excentricidades: >0.9 para órbitas alargadas",
            "⏱️ Usa el modo 100000x para ver múltiples órbitas rápidamente",
            "🔭 Activa 'Mostrar Vectores' para visualizar fuerzas gravitacionales",
            "🌠 Curiosidad: Cada paso estelar reduce la masa del cometa en 0.01%",
            "🪐 Intenta capturar un cometa con Júpiter virtual - masa > 1e27 unidades",
            "📈 Consejo avanzado: Cometas en resonancia 2:1 con planetas tienen órbitas estables"
        ],
        "gravedad": [
            "⚖️ ¡Experimentemos! Accede a Menú > Física > Constante Gravitacional...",
            "🌌 Prueba 10% para simular nebulosas o 300% para sistemas estelares densos",
            "💥 Precaución: Valores >500% causan inestabilidades en sistemas complejos",
            "🔄 Consejo: Sistemas binarios con alta gravedad evolucionan más rápido",
            "🪐 Para ver ondas gravitacionales, crea dos agujeros negros cercanos",
            "🌠 Activa 'Visualización de Fuerzas' (F3) para ver campos gravitatorios",
            "📉 Prueba reducir gravedad durante migración planetaria",
            "🌀 Efecto interesante: Gravedad alta + rotación rápida crea planetas achatados",
            "🔭 Recuerda: Agujeros negros tienen multiplicador gravitatorio 1000x fijo",
            "💫 Desafío: Crea un sistema estable con 20 cuerpos y gravedad al 200%"
        ],
        "estrella": [
            "⭐ ¡Vamos a crear! Selecciona 'Cuerpos Estelares' y elige tipo...",
            "🌞 Para estrella como el Sol: masa ~1.989e30 kg (1 unidad solar)",
            "💥 Consejo: Estrellas >20 masas solares explotan como supernovas",
            "🌈 Ajusta temperatura a >30,000K para estrellas azules intensas",
            "🔄 Prueba sistemas binarios con transferencia de masa",
            "🌌 Usa alta metalicidad para estrellas de población I (jóvenes)",
            "⏱️ Acelera tiempo para ver evolución estelar completa",
            "⚠️ Precaución: Estrellas >100 masas solares pueden ser inestables",
            "🔭 Activa 'Evolución Estelar' en Opciones para ver transformaciones",
            "🌠 Para estrellas de neutrones, crea supernovas con masa >1.4 solar"
        ],
        "planeta": [
            "🪐 ¡Vamos! Menú 'Cuerpos Planetarios' > Elige tipo...",
            "🌍 Para planeta habitable: posiciónalo en zona verde, agua 50%, atmósfera 80%",
            "🌋 Prueba composiciones extremas: planetas de carbono o hierro",
            "🌀 Ajusta período de rotación para ver efectos en clima y forma",
            "💫 Consejo: Planetas gaseosos necesitan masa >105K unidades",
            "🌌 Crea sistemas con migración planetaria activada",
            "🌠 Para anillos planetarios, ajusta espesor y densidad en características",
            "⚠️ Lunas muy cercanas se desintegran en la distancia de Roche",
            "🔭 Usa modo 'Observatorio' (O) para ver detalles superficiales",
            "🌡️ Prueba temperaturas extremas para ver cambios automáticos de clase"
        ],
        "meteoroide": [
            "🌠 ¡Creemos un meteoroide! Accede 'Crear Astros' > 'Meteoroide'...",
            "💫 Consejo: Ajusta densidad para ver diferentes efectos de impacto",
            "🪨 Usa cámara lenta para observar entrada atmosférica",
            "⚠️ Precaución: Meteoroides grandes (>100m) causan extinciones masivas",
            "🌌 Prueba composiciones: metálico, rocoso, helado",
            "🔭 Activa 'Trayectoria de Impacto' para ver posibles colisiones",
            "📈 Acelera tiempo para ver lluvias de meteoros en acción",
            "🌠 Curiosidad: Meteoroides son fragmentos de asteroides o cometas",
            "💥 Para simular explosiones, ajusta velocidad de entrada >20 km/s",
            "🌀 Desafío: Crea sistema con 10 meteoroides colisionando simultáneamente"
        ],
        "meteoro": [
            "🌠 ¡Creemos un meteoro! Accede 'Crear Astros' > 'Meteoro'...",
            "💫 Consejo: Ajusta densidad para ver diferentes efectos de impacto",
            "🪨 Usa cámara lenta para observar entrada atmosférica",
            "⚠️ Precaución: Meteoroides grandes (>100m) causan extinciones masivas",
            "🌌 Prueba composiciones: metálico, rocoso, helado",
            "🔭 Activa 'Trayectoria de Impacto' para ver posibles colisiones",
            "📈 Acelera tiempo para ver lluvias de meteoros en acción",
            "🌠 Curiosidad: Meteoroides son fragmentos de asteroides o cometas",
            "💥 Para simular explosiones, ajusta velocidad de entrada >20 km/s",
            "🌀 Desafío: Crea sistema con 10 meteoroides colisionando simultáneamente"
        ],
        "gaseoso": [
            "🌌 ¡Creemos planeta gaseoso! Accede 'Crear Astros' > 'Planeta Gaseoso'...",
            "💫 Consejo: Ajusta masa para ver efectos atmosféricos diferentes",
            "🌀 Usa cámara lenta para observar tormentas gigantes",
            "⚠️ Precaución: Planetas gaseosos muy masivos (>10x Júpiter) pueden volverse enanas marrones",
            "🌠 Prueba composiciones atmosféricas: hidrógeno, helio, metano",
            "🔭 Activa 'Anillos Planetarios' para añadir anillos",
            "📈 Acelera tiempo para ver evolución atmosférica",
            "🌌 Curiosidad: ¡Júpiter tiene tormenta mayor que la Tierra durante siglos!",
            "💥 Para simular auroras, ajusta campo magnético del planeta",
            "🪐 Desafío: Crea sistema con 5 planetas gaseosos orbitando estrella"
        ],
        "asteroide": [
            "🪨 ¡Creemos asteroide! Accede 'Crear Astros' > 'Asteroide'...",
            "🌌 Consejo: Ajusta densidad para diferentes composiciones rocosas",
            "💫 Usa cámara lenta para observar colisiones planetarias",
            "⚠️ Precaución: Asteroides grandes (>1 km) causan extinciones masivas",
            "🌠 Prueba órbitas: elípticas, circulares, inclinadas",
            "🔭 Activa 'Trayectoria de Impacto' para ver colisiones posibles",
            "📈 Acelera tiempo para ver migración de asteroides",
            "🌀 Curiosidad: ¡El cinturón de asteroides contiene millones de cuerpos!",
            "💥 Para explosiones, ajusta velocidad de impacto >20 km/s",
            "🌌 Desafío: Crea sistema con 10 asteroides colisionando"
        ],
        "planetoide": [
            "🪐 ¡Creemos planetoide! Accede 'Crear Astros' > 'Planetoide'...",
            "🌌 Consejo: Ajusta masa para diferentes características geológicas",
            "💫 Usa cámara lenta para observar rotación y tectónica",
            "⚠️ Precaución: Planetoides muy masivos pueden volverse planetas enanos",
            "🌠 Prueba composiciones: hielo, roca, metal",
            "🔭 Activa 'Anillos Planetarios' para añadir anillos",
            "📈 Acelera tiempo para ver evolución geológica",
            "🌀 Curiosidad: ¡Plutón es considerado planetoide!",
            "💥 Para impactos, ajusta velocidad de colisión >10 km/s",
            "🌌 Desafío: Crea sistema con 5 planetoides orbitando estrella"
        ],
        "agujero de gusano": [
            "🌀 ¡Creemos agujero de gusano! Accede 'Crear Astros' > 'Agujero de Gusano'...",
            "🌌 Consejo: Ajusta masa negativa para efectos de distorsión",
            "💫 Usa cámara lenta para observar curvatura espacio-temporal",
            "⚠️ Precaución: Agujeros de gusano son teóricos e inestables",
            "🌠 Prueba diferentes puntos de entrada/salida",
            "🔭 Activa 'Efectos Relativistas' para ver distorsión lumínica",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Conectan puntos distantes del universo!",
            "💥 Para viajes instantáneos, ajusta distancia entre puntos",
            "🌌 Desafío: Crea sistema con 3 agujeros conectando galaxias"
        ],
        "zona habitable": [
            "🌍 ¡Creemos zona habitable! Accede 'Crear Astros' > 'Zona Habitable'...",
            "💫 Consejo: Ajusta distancia estelar para diferentes zonas",
            "🌌 Usa cámara lenta para observar formación atmosférica",
            "⚠️ Precaución: Zonas muy cercanas sufren radiación intensa",
            "🌠 Prueba composiciones: oxígeno, nitrógeno, vapor de agua",
            "🔭 Activa 'Efectos Climáticos' para tormentas",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡La Tierra está en zona habitable desde hace mil millones de años!",
            "💥 Para simular vida, ajusta temperatura media entre 0-100°C",
            "🌌 Desafío: Crea sistema con 5 zonas habitables orbitando estrella"
        ],
        "cuásar": [
            "🌌 ¡Creemos cuásar! Accede 'Crear Astros' > 'Cuásar'...",
            "💫 Consejo: Ajusta masa para controlar su galaxia",
            "🌠 Usa cámara lenta para observar radiación intensa",
            "⚠️ Precaución: ¡Los cuásares pueden eclipsar galaxias enteras!",
            "🌟 Prueba composiciones de materia en disco de acreción",
            "🔭 Activa 'Efectos Relativistas' para distorsión lumínica",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Son los objetos más luminosos del universo!",
            "💥 Para simular chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 cuásares conectando galaxias"
        ],
        "enana marrón": [
            "🌌 ¡Creemos enana marrón! Accede 'Crear Astros' > 'Enana Marrón'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: Son objetos entre estrellas y planetas",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡No tienen fusión nuclear sostenida!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 enanas marrones orbitando estrella"
        ],
        "enana roja": [
            "🌌 ¡Creemos enana roja! Accede 'Crear Astros' > 'Enana Roja'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: Son las estrellas más comunes",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Pueden vivir billones de años!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 5 enanas rojas orbitando estrella"
        ],
        "estrella gigante": [
            "🌌 ¡Creemos estrella gigante! Accede 'Crear Astros' > 'Estrella Gigante'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: ¡Pueden convertirse en supernovas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Pueden ser 1000 veces más grandes que el Sol!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 gigantes orbitando estrella"
        ],
        "hipergigante": [
            "🌌 ¡Creemos hipergigante! Accede 'Crear Astros' > 'Hipergigante'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: ¡Pueden convertirse en supernovas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Pueden ser 1000 veces más grandes que el Sol!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 hipergigantes orbitando estrella"
        ],
        "estrella masiva": [
            "🌌 ¡Creemos estrella masiva! Accede 'Crear Astros' > 'Estrella Masiva'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: ¡Pueden convertirse en supernovas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Pueden ser 100 veces más grandes que el Sol!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 estrellas masivas orbitando estrella"
        ],
        "estrella hipermassiva": [
            "🌌 ¡Creemos estrella hipermassiva! Accede 'Crear Astros' > 'Estrella Hipermassiva'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: ¡Pueden convertirse en supernovas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Pueden ser 1000 veces más grandes que el Sol!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 estrellas hipermassivas orbitando estrella"
        ],
        "enana blanca": [
            "🌌 ¡Creemos enana blanca! Accede 'Crear Astros' > 'Enana Blanca'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: Son remanentes de estrellas agotadas",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Son extremadamente densas y pequeñas!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 enanas blancas orbitando estrella"
        ],
        "enana blanca de helio": [
            "🌌 ¡Creemos enana blanca de helio! Accede 'Crear Astros' > 'Enana Blanca de Helio'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de helio",
            "⚠️ Precaución: Son remanentes de estrellas agotadas",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Son extremadamente densas y pequeñas!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 enanas blancas de helio orbitando estrella"
        ],
        "enana blanca de carbono": [
            "🌌 ¡Creemos enana blanca de carbono! Accede 'Crear Astros' > 'Enana Blanca de Carbono'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de carbono",
            "⚠️ Precaución: Son remanentes de estrellas agotadas",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Son extremadamente densas y pequeñas!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 enanas blancas de carbono orbitando estrella"
        ],
        "enana negra": [
            "🌌 ¡Creemos enana negra! Accede 'Crear Astros' > 'Enana Negra'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de hidrógeno",
            "⚠️ Precaución: Son remanentes de estrellas agotadas",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Son extremadamente densas y pequeñas!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 enanas negras orbitando estrella"
        ],
        "estrella de neutrones": [
            "🌌 ¡Creemos estrella de neutrones! Accede 'Crear Astros' > 'Estrella de Neutrones'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de neutrones",
            "⚠️ Precaución: ¡Son extremadamente densas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Pueden girar 1000 veces por segundo!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 estrellas de neutrones orbitando estrella"
        ],
        "magnetar": [
            "🌌 ¡Creemos magnetar! Accede 'Crear Astros' > 'Estrella de Neutrones Magnetar'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de neutrones",
            "⚠️ Precaución: ¡Son extremadamente densas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Tienen campos magnéticos billones de veces más fuertes que la Tierra!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 magnetares orbitando estrella"
        ],
        "estrella de quarks": [
            "🌌 ¡Creemos estrella de quarks! Accede 'Crear Astros' > 'Estrella de Quarks'...",
            "💫 Consejo: Ajusta masa para características atmosféricas",
            "🌠 Usa cámara lenta para observar fusión de quarks",
            "⚠️ Precaución: ¡Son extremadamente densas!",
            "🌟 Prueba composiciones: metano, agua, amoníaco",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Tienen mayor densidad que estrellas de neutrones!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 estrellas de quarks orbitando estrella"
        ],
        "polvo estelar": [
            "🌌 ¡Creemos polvo estelar! Accede 'Crear Astros' > 'Polvo Estelar'...",
            "💫 Consejo: Ajusta densidad para diferentes composiciones",
            "🌠 Usa cámara lenta para observar formación de nubes",
            "⚠️ Precaución: Puede aglomerarse y formar planetesimales",
            "🌟 Prueba composiciones: silicato, carbono, hielo",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Es fundamental en la formación de estrellas!",
            "💥 Para colisiones, ajusta velocidad de impacto entre partículas",
            "🌌 Desafío: Crea sistema con 5 nubes de polvo interactuando"
        ],
        "nebulosa": [
            "🌌 ¡Creemos nebulosa! Accede 'Crear Astros' > 'Nebulosa'...",
            "💫 Consejo: Ajusta densidad para diferentes composiciones",
            "🌠 Usa cámara lenta para observar formación estelar interna",
            "⚠️ Precaución: Pueden ser lugares de nacimiento estelar",
            "🌟 Prueba composiciones: hidrógeno, helio, carbono",
            "🔭 Activa 'Efectos Relativistas'",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Reciclan material estelar!",
            "💥 Para explosiones, ajusta velocidad de expansión",
            "🌌 Desafío: Crea sistema con 3 nebulosas interactuando"
        ],
        "singularidad": [
            "🌌 ¡Creemos singularidad! Accede 'Crear Astros' > 'Singularidad'...",
            "💫 Consejo: Ajusta masa para efectos gravitacionales",
            "🌠 Usa cámara lenta para observar distorsión espacio-temporal",
            "⚠️ Precaución: ¡Son puntos de densidad infinita!",
            "🌟 Prueba composiciones: materia normal, materia exótica",
            "🔭 Activa 'Efectos Relativistas' para distorsión lumínica",
            "📈 Acelera tiempo para ver evolución",
            "🌀 Curiosidad: ¡Son teóricas e imposibles de observar!",
            "💥 Para chorros relativistas, ajusta velocidad de rotación",
            "🌌 Desafío: Crea sistema con 3 singularidades interactuando"
        ],
        "default": [
            "🚀 ¡Exploremos juntos! ¿Qué exactamente quieres crear?",
            "🌌 ¡Puedo guiarte paso a paso en esta simulación cósmica!",
            "💫 ¡Perfecto! Comienza seleccionando el menú apropiado",
            "🔭 Detallemos: ¿Qué parámetro específico quieres ajustar?",
            "🪐 Primer paso: accede al menú de creación en la esquina inferior derecha",
            "🌠 Sugiero comenzar con valores predeterminados",
            "⚡ Para mejores resultados, activa 'Precisión Total' en Opciones > Física",
            "📊 ¿Quieres que muestre un ejemplo práctico ahora?",
            "🌀 Comencemos creando componentes básicos de tu sistema",
            "✨ Escribe 'ayuda' en cualquier momento para ver opciones"
        ]
    },
    
    negativeResponses: {
        "agujero negro": [
            "🕳️ ¡Sin problemas! Los agujeros negros pueden esperar...",
            "🌌 Está bien, ¡esos monstruos cósmicos no van a escapar!",
            "💫 Cuando quieras ver materia siendo espaguetizada, ¡estoy aquí!",
            "⚠️ ¡Cuidado incluso! Mejor mantener distancia de estos devoradores cósmicos",
            "🔭 ¿Qué tal si exploramos estrellas de neutrones? ¡Son igualmente fascinantes!",
            "🌠 ¿Sabías que el agujero negro más pequeño conocido tiene solo 3.8 masas solares?",
            "🌀 ¡Los agujeros negros supermasivos en los centros galácticos pueden tener miles de millones de masas solares!",
            "💥 Aun sin simular, recuerda: ¡nada escapa tras el horizonte de sucesos!",
            "⏳ En el futuro lejano, hasta los agujeros negros se evaporarán por radiación Hawking",
            "✨ Cuando estés listo, escribe 'agujero negro' para reiniciar"
        ],
        "cometa": [
            "☄️ ¡Sin problemas! Los cometas pueden esperar en su nube de Oort...",
            "❄️ ¡Está bien, esos viajeros helados no se derretirán pronto!",
            "🌠 Cuando quieras crear una lluvia de meteoros, aquí estoy",
            "💫 ¿Sabías que algunos cometas tienen órbitas de millones de años?",
            "🚀 ¡El cometa Hale-Bopp fue visible a simple vista durante 18 meses!",
            "🌌 ¡Cometas interestelares como Borisov vienen de otros sistemas estelares!",
            "⏱️ ¡La sonda Rosetta orbitó el cometa Churyumov-Gerasimenko durante 2 años!",
            "🔭 ¡El núcleo del cometa Halley mide 15km y es muy oscuro!",
            "💧 Los cometas contienen agua pesada con proporciones diferentes a los océanos terrestres",
            "✨ Escribe 'cometa' cuando quieras explorar estos mensajeros cósmicos"
        ],
        "gravedad": [
            "⚖️ ¡Sin problemas! La gravedad puede esperar...",
            "🌌 Está bien, ¡Einstein no se decepcionaría!",
            "💫 Cuando quieras curvar el espacio-tiempo, aquí estoy",
            "🌀 ¿Sabías que la gravedad es 10^36 veces más débil que la fuerza electromagnética?",
            "🌠 ¡En estrellas de neutrones, la gravedad es 200 mil millones de veces mayor que en la Tierra!",
            "🪐 Júpiter tiene gravedad 2.5x mayor que la Tierra - ¡suficiente para alterar cometas!",
            "⏱️ ¡La gravedad viaja a la velocidad de la luz - si el Sol desapareciera, lo sentiríamos después de 8 minutos!",
            "💥 Los agujeros negros son los únicos lugares donde la gravedad vence a todas las fuerzas",
            "🔭 ¡Las ondas gravitacionales detectadas en 2015 confirmaron la predicción de Einstein de 1916!",
            "✨ Escribe 'gravedad' cuando quieras explorar esta fuerza cósmica fundamental"
        ],
        "estrella": [
            "⭐ ¡Sin problemas! Las estrellas pueden esperar en el firmamento...",
            "🌞 ¡Está bien, esos faros cósmicos brillarán por miles de millones de años!",
            "💫 Cuando quieras crear una supernova, aquí estaré",
            "🌌 ¡La estrella más cercana, Próxima Centauri, está a 4.24 años luz!",
            "🔥 ¡El núcleo solar alcanza 15 millones °C - suficiente para fusión nuclear!",
            "🌠 Betelgeuse, una supergigante roja, ¡es 1000 veces mayor que el Sol!",
            "⏳ ¡Las enanas rojas pueden vivir billones de años - más que la edad actual del universo!",
            "💥 Cuando una estrella se convierte en supernova, ¡puede brillar más que una galaxia entera!",
            "🌀 ¡Las estrellas de neutrones giran hasta 716 veces por segundo - los faros más precisos del cosmos!",
            "✨ Escribe 'estrella' cuando quieras encender estos motores cósmicos"
        ],
        "planeta": [
            "🪐 ¡Sin problemas! Los planetas continuarán su órbita...",
            "🌍 ¡Está bien, esos mundos alienígenas no escaparán!",
            "💫 Cuando quieras crear un mundo oceánico, aquí estaré",
            "🌌 ¡El exoplaneta más cercano, Próxima Centauri b, está a solo 4 años luz!",
            "🌡️ ¡Venus es más caliente que Mercurio por efecto invernadero descontrolado!",
            "❄️ ¡Plutón tiene montañas de hielo de agua de 3km de altura!",
            "🛰️ ¡Júpiter tiene 79 lunas conocidas - ¡un sistema planetario en miniatura!",
            "💥 ¡La Tierra es el único planeta conocido con placas tectónicas activas!",
            "🌀 ¡El exoplaneta WASP-76b tiene lluvias de hierro derretido en su lado nocturno!",
            "✨ Escribe 'planeta' cuando quieras moldear nuevos mundos"
        ],
        "meteoroide": [
            "🌠 ¡Sin problemas! Los meteoroides continuarán su viaje espacial...",
            "🪨 ¡Está bien, esos viajeros cósmicos no desaparecerán!",
            "💫 Cuando quieras ver un meteoroide en acción, aquí estaré",
            "☄️ ¡El meteoroide Chelyabinsk explotó con 30 veces la energía de Hiroshima!",
            "🌌 ¡La mayoría de meteoros son menores que granos de arena - ¡pero aún impresionantes!",
            "🔥 ¡Meteoroides mayores de 25 metros pueden causar daños significativos!",
            "🔭 ¡La lluvia de meteoros Perseidas es una de las más visibles del año!",
            "💥 ¡El meteoroide Tunguska causó una explosión de 15 megatones en 1908!",
            "🌠 Escribe 'meteoroide' cuando quieras ver estos viajeros cósmicos"
        ],
        "asteroide": [
            "🪨 ¡Sin problemas! Los asteroides continuarán su órbita...",
            "🌌 ¡Está bien, esos bloques rocosos no desaparecerán!",
            "💫 Cuando quieras ver un asteroide en acción, aquí estaré",
            "☄️ ¡El asteroide 16 Psyche es principalmente hierro y níquel - ¡como un núcleo planetario!",
            "🌠 ¡El asteroide Vesta es tan grande que puede verse a simple vista!",
            "🛰️ ¡El asteroide Bennu tiene forma de peonza - ¡y es objetivo de exploración!",
            "💥 ¡El asteroide Apophis pasará cerca de la Tierra en 2029 - ¡sin riesgo de colisión!",
            "🌌 ¡El cinturón de asteroides contiene millones de cuerpos rocosos!",
            "🌠 Escribe 'asteroide' cuando quieras explorar estos bloques del sistema solar"
        ],
        "planetoide": [
            "🪐 ¡Sin problemas! Los planetoides continuarán su órbita...",
            "🌌 ¡Está bien, esos mundos menores no desaparecerán!",
            "💫 Cuando quieras ver un planetoide en acción, aquí estaré",
            "🌠 ¡El planetoide Ceres es el objeto más grande del cinturón de asteroides y tiene agua!",
            "🛰️ ¡Plutón es considerado planetoide por muchos astrónomos - ¡y es fascinante!",
            "💥 ¡El planetoide Eris es mayor que Plutón y tiene atmósfera de nitrógeno!",
            "🌌 ¡Los planetoides son fósiles cósmicos de la formación del sistema solar!",
            "🌠 Escribe 'planetoide' cuando quieras explorar estos mundos menores"
        ],
        "agujero de gusano": [
            "🌀 ¡Sin problemas! Los agujeros de gusano pueden esperar...",
            "🌌 ¡Está bien, esos túneles cósmicos no desaparecerán!",
            "💫 Cuando quieras ver un agujero de gusano en acción, aquí estaré",
            "⚠️ Precaución: ¡Los agujeros de gusano son teóricos e inestables!",
            "🌠 ¿Sabías que los agujeros de gusano podrían conectar puntos distantes del universo?",
            "🔭 ¡La teoría sugiere que permitirían viajes instantáneos!",
            "💥 Aun sin simular, recuerda: ¡nada escapa tras el horizonte de sucesos!",
            "🌀 Escribe 'agujero de gusano' cuando quieras explorar túneles cósmicos"
        ],
        "zona habitable": [
            "🌍 ¡Sin problemas! Las zonas habitables pueden esperar...",
            "🌌 ¡Está bien, esos lugares de vida no desaparecerán!",
            "💫 Cuando quieras ver una zona habitable en acción, aquí estaré",
            "🌠 ¡La Tierra ha estado en la zona habitable solar durante miles de millones de años!",
            "🌡️ ¡La zona habitable varía según la estrella - ¡es fascinante!",
            "🛰️ ¡Los exoplanetas en zona habitable son objetivos para buscar vida extraterrestre!",
            "💥 ¡Recuerda que la vida podría existir en ambientes extremos!",
            "🌌 Escribe 'zona habitable' cuando quieras explorar estos lugares de vida"
        ],
        "cuásar": [
            "🌌 ¡Sin problemas! Los cuásares pueden esperar...",
            "💫 ¡Está bien, esos faros cósmicos no desaparecerán!",
            "🚀 Cuando quieras ver un cuásar en acción, aquí estaré",
            "🌠 ¡Los cuásares son los objetos más luminosos del universo!",
            "🌀 ¿Sabías que emiten chorros relativistas casi a la velocidad de la luz?",
            "🔭 ¡La luz de algunos cuásares viajó miles de millones de años para llegarnos!",
            "💥 ¡Los cuásares son cruciales en la evolución galáctica!",
            "✨ Escribe 'cuásar' cuando quieras explorar estos faros cósmicos"
        ],
        "enana marrón": [
            "🌌 ¡Sin problemas! Las enanas marrones pueden esperar...",
            "💫 ¡Está bien, esos objetos intermedios no desaparecerán!",
            "🚀 Cuando quieras ver una enana marrón en acción, aquí estaré",
            "🌠 ¡Las enanas marrones son estrellas fallidas sin fusión nuclear sostenida!",
            "🌀 ¿Sabías que pueden tener atmósferas ricas en metano y agua?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales para entender la evolución estelar!",
            "✨ Escribe 'enana marrón' cuando quieras explorar estos objetos intermedios"
        ],
        "enana roja": [
            "🌌 ¡Sin problemas! Las enanas rojas pueden esperar...",
            "💫 ¡Está bien, esas estrellas pequeñas no desaparecerán!",
            "🚀 Cuando quieras ver una enana roja en acción, aquí estaré",
            "🌠 ¡Las enanas rojas son las estrellas más comunes del universo!",
            "🌀 ¿Sabías que pueden vivir billones de años?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son fundamentales en la evolución estelar!",
            "✨ Escribe 'enana roja' cuando quieras explorar estas estrellas pequeñas"
        ],
        "estrella gigante": [
            "🌌 ¡Sin problemas! Las estrellas gigantes pueden esperar...",
            "💫 ¡Está bien, esos colosos cósmicos no desaparecerán!",
            "🚀 Cuando quieras ver una estrella gigante en acción, aquí estaré",
            "🌠 ¡Son mucho mayores que el Sol y pueden volverse supernovas!",
            "🌀 ¿Sabías que algunas tienen 1000 veces el diámetro solar?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución galáctica!",
            "✨ Escribe 'estrella gigante' cuando quieras explorar estos colosos"
        ],
        "hipergigante": [
            "🌌 ¡Sin problemas! Las hipergigantes pueden esperar...",
            "💫 ¡Está bien, esos titanes cósmicos no desaparecerán!",
            "🚀 Cuando quieras ver una hipergigante en acción, aquí estaré",
            "🌠 ¡Son las estrellas más masivas conocidas!",
            "🌀 ¿Sabías que algunas tienen 1000 veces el diámetro solar?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución galáctica!",
            "✨ Escribe 'hipergigante' cuando quieras explorar estos titanes"
        ],
        "estrella masiva": [
            "🌌 ¡Sin problemas! Las estrellas masivas pueden esperar...",
            "💫 ¡Está bien, esos colosos cósmicos no desaparecerán!",
            "🚀 Cuando quieras ver una estrella masiva en acción, aquí estaré",
            "🌠 ¡Son mucho mayores que el Sol y pueden volverse supernovas!",
            "🌀 ¿Sabías que algunas tienen 100 veces el diámetro solar?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución galáctica!",
            "✨ Escribe 'estrella masiva' cuando quieras explorar estos colosos"
        ],
        "estrella hipermásiva": [
            "🌌 ¡Sin problemas! Las estrellas hipermásivas pueden esperar...",
            "💫 ¡Está bien, esos titanes cósmicos no desaparecerán!",
            "🚀 Cuando quieras ver una estrella hipermásiva en acción, aquí estaré",
            "🌠 ¡Son las estrellas más masivas conocidas!",
            "🌀 ¿Sabías que algunas tienen 1000 veces el diámetro solar?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución galáctica!",
            "✨ Escribe 'estrella hipermásiva' cuando quieras explorar estos titanes"
        ],
        "enana blanca": [
            "🌌 ¡Sin problemas! Las enanas blancas pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver una enana blanca en acción, aquí estaré",
            "🌠 ¡Son restos de estrellas que agotaron su combustible nuclear!",
            "🌀 ¿Sabías que son extremadamente densas y pequeñas?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'enana blanca' cuando quieras explorar estos remanentes"
        ],
        "enana blanca de helio": [
            "🌌 ¡Sin problemas! Las enanas blancas de helio pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver una enana blanca de helio en acción, aquí estaré",
            "🌠 ¡Son restos de estrellas que agotaron su combustible nuclear!",
            "🌀 ¿Sabías que son extremadamente densas y pequeñas?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'enana blanca de helio' cuando quieras explorar estos remanentes"
        ],
        "enana blanca de carbono": [
            "🌌 ¡Sin problemas! Las enanas blancas de carbono pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver una enana blanca de carbono en acción, aquí estaré",
            "🌠 ¡Son restos de estrellas que agotaron su combustible nuclear!",
            "🌀 ¿Sabías que son extremadamente densas y pequeñas?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'enana blanca de carbono' cuando quieras explorar estos remanentes"
        ],
        "enana negra": [
            "🌌 ¡Sin problemas! Las enanas negras pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver una enana negra en acción, aquí estaré",
            "🌠 ¡Son los restos finales de estrellas que irradiaron todo su calor!",
            "🌀 ¿Sabías que son extremadamente densas y pequeñas?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'enana negra' cuando quieras explorar estos remanentes"
        ],
        "estrella de neutrones": [
            "🌌 ¡Sin problemas! Las estrellas de neutrones pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver una estrella de neutrones en acción, aquí estaré",
            "🌠 ¡Son restos de supernovas extremadamente densos!",
            "🌀 ¿Sabías que una cucharadita de su materia pesa más que toda la humanidad?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'estrella de neutrones' cuando quieras explorar estos remanentes"
        ],
        "magnetar": [
            "🌌 ¡Sin problemas! Los magnetares pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver un magnetar en acción, aquí estaré",
            "🌠 ¡Son estrellas de neutrones con campos magnéticos ultra potentes!",
            "🌀 ¿Sabías que pueden emitir poderosos rayos gamma y X?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'magnetar' cuando quieras explorar estos remanentes"
        ],
        "estrella de quarks": [
            "🌌 ¡Sin problemas! Las estrellas de quarks pueden esperar...",
            "💫 ¡Está bien, esos remanentes estelares no desaparecerán!",
            "🚀 Cuando quieras ver una estrella de quarks en acción, aquí estaré",
            "🌠 ¡Son teóricas y aún más densas que estrellas de neutrones!",
            "🌀 ¿Sabías que podrían tener estructura interna compleja?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son cruciales en la evolución estelar!",
            "✨ Escribe 'estrella de quarks' cuando quieras explorar estos remanentes"
        ],
        "polvo estelar": [
            "🌌 ¡Sin problemas! El polvo estelar puede esperar...",
            "💫 ¡Está bien, esas partículas cósmicas no desaparecerán!",
            "🚀 Cuando quieras ver polvo estelar en acción, aquí estaré",
            "🌠 ¡Es fundamental en la formación de estrellas y planetas!",
            "🌀 ¿Sabías que contiene elementos pesados forjados en estrellas?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Es esencial en la evolución del universo!",
            "✨ Escribe 'polvo estelar' cuando quieras explorar estas partículas"
        ],
        "nebulosa": [
            "🌌 ¡Sin problemas! Las nebulosas pueden esperar...",
            "💫 ¡Está bien, esas nubes cósmicas no desaparecerán!",
            "🚀 Cuando quieras ver una nebulosa en acción, aquí estaré",
            "🌠 ¡Son viveros estelares donde nacen nuevas estrellas!",
            "🌀 ¿Sabías que algunas son restos de supernovas?",
            "🔭 ¡Su luz viajó miles de millones de años para llegarnos!",
            "💥 ¡Son fundamentales en la evolución del universo!",
            "✨ Escribe 'nebulosa' cuando quieras explorar estas nubes"
        ],
        "singularidad": [
            "🌌 ¡Sin problemas! Las singularidades pueden esperar...",
            "💫 ¡Está bien, esos puntos de densidad infinita no desaparecerán!",
            "🚀 Cuando quieras ver una singularidad en acción, aquí estaré",
            "🌠 ¡Son teóricas y representan curvatura extrema del espacio-tiempo!",
            "🌀 ¡Podrían existir en centros de agujeros negros y cuásares!"
        ],
        "default": [
            "🌌 ¡Sin problemas! El universo es paciente...",
            "🚀 ¡Está bien, la exploración cósmica puede esperar!",
            "💫 Cuando quieras continuar, aquí estaré",
            "🔭 ¿Sabías que hay más estrellas que granos de arena en todas las playas terrestres?",
            "🌠 ¡La luz de Andrómeda partió cuando nuestros ancestros pintaban cuevas!",
            "⏳ ¡99.9% de la materia visible del universo está en estado de plasma!",
            "💥 ¡En 1 segundo el Sol produce más energía que toda la humanidad en su historia!",
            "🌀 ¡Los agujeros negros supermasivos regulan el crecimiento galáctico!",
            "✨ ¡Cada átomo de oxígeno en tu cuerpo fue forjado en el núcleo de una estrella!",
            "🪐 ¡Todos estamos hechos de polvo estelar!"
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
        "🧮 Resultado: {expression} = {result}",
        "🔢 Cálculo completado: {expression} = {result}",
        "✨ Solución: {expression} = {result}",
        "⚡ Resuelto: {expression} = {result}",
        "🌌 Ecuación cósmica: {expression} = {result}",
        "🪐 Matemática estelar: {expression} = {result}",
        "💫 Computación gravitacional: {expression} = {result}",
        "📐 Geometría universal: {expression} = {result}",
        "📊 Análisis numérico: {expression} = {result}",
        "🔭 Observación matemática: {expression} = {result}",
        "🌠 Fórmula resuelta: {expression} = {result}",
        "🚀 Cálculo propulsado: {expression} = {result}",
        "🛰️ Resultado orbital: {expression} = {result}",
        "⏱️ Tiempo de computación: 0s | {expression} = {result}",
        "⚖️ Equilibrio numérico: {expression} = {result}",
        "🌀 Vórtice matemático: {expression} = {result}",
        "🌡️ Temperatura computacional: 0K | {expression} = {result}",
        "📈 Proyección numérica: {expression} = {result}",
        "📉 Análisis inverso: {expression} = {result}",
        "🧪 Experimento numérico: {expression} = {result}",
        "🔬 Microscopio matemático: {expression} = {result}",
        "🖥️ Computación cuántica simulada: {expression} = {result}",
        "💻 Algoritmo completado: {expression} = {result}",
        "🤖 Procesamiento robótico: {expression} = {result}",
        "🌟 Iluminación numérica: {expression} = {result}",
        "🌌 Cosmos resuelto: {expression} = {result}",
        "🧬 Genética matemática: {expression} = {result}",
        "🌠 Astronomía numérica: {expression} = {result}",
        "🪐 Astrofísica computacional: {expression} = {result}",
        "🔭 Telescopio matemático: {expression} = {result}",
        "🌌 Cosmología numérica: {expression} = {result}",
        "🌟 Estrella resuelta: {expression} = {result}",
        "🌠 Galaxia computada: {expression} = {result}",
        "🛸 Navegación numérica: {expression} = {result}",
        "🌌 Universo calculado: {expression} = {result}",
        "🌠 Constelación resuelta: {expression} = {result}",
        "🪐 Planeta computado: {expression} = {result}",
        "🌌 Nebulosa numérica: {expression} = {result}",
        "🌠 Supernova resuelta: {expression} = {result}",
        "🛰️ Satélite matemático: {expression} = {result}",
        "🌌 Espacio-tiempo computado: {expression} = {result}",
        "🌠 Horizonte de eventos resuelto: {expression} = {result}",
        "🌀 Singularidad numérica: {expression} = {result}",
        "🌌 Big Bang computado: {expression} = {result}",
        "🌠 Expansión cósmica resuelta: {expression} = {result}",
        "🪐 Anillo planetario computado: {expression} = {result}",
        "🌌 Agujero de gusano numérico: {expression} = {result}",
        "🌠 Vía Láctea computada: {expression} = {result}",
        "🛸 Nave espacial numérica: {expression} = {result}",
        "🌌 Multiverso computado: {expression} = {result}",
        "🌠 Dimensión paralela resuelta: {expression} = {result}",
        "🪐 Exoplaneta computado: {expression} = {result}",
        "🌌 Asteroide numérico: {expression} = {result}",
        "🌠 Meteorito resuelto: {expression} = {result}",
        "🛰️ Sonda espacial numérica: {expression} = {result}",
        "🌌 Cometa computado: {expression} = {result}",
        "🌠 Lluvia de meteoros resuelta: {expression} = {result}",
        "🪐 Luna computada: {expression} = {result}",
        "🌌 Sistema solar numérico: {expression} = {result}",
        "🌠 Órbita planetaria resuelta: {expression} = {result}",
        "🛰️ Estación espacial numérica: {expression} = {result}",
        "🌌 Galaxia espiral computada: {expression} = {result}",
        "🌠 Galaxia elíptica resuelta: {expression} = {result}",
        "🪐 Galaxia irregular computada: {expression} = {result}",
        "🌌 Cuásar numérico: {expression} = {result}",
        "🌠 Púlsar resuelto: {expression} = {result}",
        "🛰 Bola de plasma computada: {expression} = {result}"
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
                throw new Error("Expresión inválida");
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
            return "🤔 No pude calcular. Formato válido: '2*(3+5^2)' o 'sqrt(9)'";
        }
    }
};

const greetingsSystem = {
    greetings: ["hola", "hola", "hola", "que tal", "hello", "hi", "buenos días", "buenas tardes", "buenas noches", "saludos", "hey", "eh", "saludos cósmicos", "buen día estelar", "hola singularity"],
    farewells: ["adiós", "hasta luego", "hasta pronto", "nos vemos", "bye", "terminar", "salir", "cerrar", "exit", "chao", "me voy", "hasta la vista", "desconectar", "terminar sesión", "adiós singularity"],
    
    greetingsResponses: [
        "✨ ¡Hola, explorador cósmico! ¿Cómo puedo ayudar en tu viaje estelar?",
        "🚀 ¡Bienvenido al SIU 2D! ¿Listo para crear universos increíbles?",
        "🌌 ¡Saludos interestelares! ¿En qué puedo ayudarte hoy?",
        "🪐 ¡Qué tal, comandante! ¿Qué desafío cósmico enfrentaremos?",
        "💫 ¡Saludo gravitacional! ¿Cómo puedo asistir en tu exploración?",
        "🌟 ¡Bienvenido, creador de mundos! ¿Qué simularemos hoy?",
        "🌠 ¡Saludos, viajero estelar! ¿Listo para una aventura cósmica?",
        "🛸 ¡Transmisión recibida! ¿Cómo puedo ayudar en tu misión espacial?",
        "🔭 ¡Hola, astrónomo virtual! ¿Qué misterio cósmico resolveremos?",
        "⚡ ¡Fluye energía cósmica! ¿Cómo puedo ayudarte?",
        "🌀 ¡Vórtice de bienvenida activado! ¿Cuál es tu comando?",
        "🌠 ¡Rayos cósmicos detectados! Hola, ¿cómo puedo ayudar?",
        "🪐 ¡Alineación planetaria perfecta para tu llegada! ¡Bienvenido!",
        "🌌 ¡Doblez espacial estabilizado! ¡Saludos, explorador!",
        "🚀 ¡Sistemas en línea! Singularity disponible para tus consultas",
        "🔭 ¡Telescopios enfocados! ¿Listo para explorar el universo?",
        "🌠 ¡Lluvia de meteoros de bienvenida! ¿Cómo puedo ayudarte?",
        "💻 ¡Sistemas de IA cósmica activados! ¡Hola, humano!",
        "🛰️ ¡Satélites de comunicación sincronizados! ¡Conexión establecida!",
        "🌌 ¡Portal dimensional abierto! ¡Bienvenido al SIU 2D!",
        "🌟 ¡Constelaciones alineadas para tu llegada! ¡Saludos!",
        "⚛️ ¡Partículas cósmicas entusiasmadas con tu presencia! ¡Hola!",
        "🌠 ¡Cometa de bienvenida en trayectoria! ¡Saludos, viajero!",
        "🪐 ¡Anillos planetarios saludando! ¡Bienvenido!",
        "✨ ¡Energía estelar canalizada! Singularity a tu servicio!"
    ],
    
    farewellResponses: [
        "🌠 ¡Hasta la próxima, viajero estelar! ¡Que tu viaje sea épico!",
        "🛸 ¡Buen viaje por el cosmos! ¡Vuelve cuando tengas nuevas dudas!",
        "💫 ¡Terminando transmisión. Recuerda: ¡El universo es tu campo de juego!",
        "👋 ¡Adiós! Cuando quieras crear un agujero negro, aquí estaré!",
        "🚀 ¡Despegue confirmado! ¡Regresa para más aventuras cósmicas!",
        "🌌 ¡Desconectando... Pero el universo sigue expandiéndose!",
        "🪐 ¡Hasta pronto, comandante! ¡Que encontremos nuevos horizontes cósmicos!",
        "✨ ¡Misión completada! ¡Vuelve para nuevas exploraciones estelares!",
        "🔭 ¡Señal perdida... Pero las estrellas siempre guiarán tu camino!",
        "⚡ ¡Energías cósmicas se despiden! ¡Hasta la próxima órbita!",
        "🌀 ¡Campo gravitacional desactivado! ¡Hasta pronto, explorador!",
        "🌠 ¡Trayectoria de salida calculada! ¡Hasta la próxima, viajero!",
        "🛰️ ¡Satélites en modo espera! ¡Vuelve cuando necesites!",
        "💻 ¡Sistemas en hibernación cósmica! ¡Hasta luego!",
        "🪐 ¡Alineación planetaria de despedida! ¡Buenas travesías!",
        "🌌 ¡Portal dimensional cerrado! ¡Regresa cuando quieras!",
        "🌟 ¡Constelaciones brillan en tu despedida! ¡Hasta pronto!",
        "⚛️ ¡Partículas cósmicas ralentizadas! ¡Hasta la próxima!",
        "🌠 ¡Cometa de despedida en trayectoria! ¡Buenos viajes!",
        "🔭 ¡Telescopios desenfocando! ¡Hasta la próxima observación!",
        "💫 ¡Doblez espacial deshecha! ¡Hasta la próxima jornada!",
        "🚀 ¡Cohetes de despedida activados! ¡Buen viaje!",
        "🌠 ¡Rayos cósmicos de despedida detectados! ¡Hasta pronto!",
        "🛸 ¡Nave de despedida en órbita! ¡Vuelve pronto!",
        "✨ ¡Último pulso estelar! Desconectando..."
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
        "🌌 No encontré eso en mi banco estelar... ¡Pregunta sobre 'cometas', 'agujeros negros' o 'controles'!",
        "🛸 Mi conocimiento es cósmico - intenta preguntar sobre física del juego o elementos del universo",
        "🔭 ¡Enfocado en el espacio! ¿Qué tal '¿Cómo crear una nebulosa?' o '¿Qué masa para un agujero negro?'",
        "📡 Señal perdida... Reformula sobre creación de astros, evolución estelar o controles del SIU 2D",
        "💫 ¿Quieres calcular algo? ¡Usa números y operadores como '3 * 5^2' o pregunta sobre términos cósmicos!",
        "🪐 Pista cósmica: ¡Intenta términos como 'gravedad', 'estrella', 'planeta' o 'evolución'!",
        "⚡ ¡Nuevo mensaje estelar detectado! Formula como '¿Cómo crear un cuásar?' o '¿Qué es zona habitable?'"
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
        const errorMsg = createMessage('error : Error de conexión. Comprueba tu conexión a internet y vuelve a intentarlo.', 'error-message');
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