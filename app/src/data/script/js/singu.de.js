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
    "Komet": [
        "☄️ Kometen sind eisige Körper, die Schweife entwickeln, wenn sie nahe an Sternen sind! Im SIU 2D können Sie sie im Menü 'Himmelskörper erstellen' erzeugen",
        "💫 Die typische Masse von Kometen liegt zwischen 0,1-10 Einheiten. Über 300 Masseneinheiten entwickeln sie sich automatisch zu eisigen Planetoiden",
        "🌠 Der Schweif zeigt immer entgegen der Bewegungsrichtung - simuliert den stellaren Wind mit physikalischer Genauigkeit",
        "🚀 Tipp: Beim Erstellen eines Kometen die Maus ziehen, um Anfangsgeschwindigkeit festzulegen und die vorhergesagte Flugbahn zu sehen",
        "❄️ Kometen schmelzen bei zu großer Nähe zu heißen Sternen - im Spiel verwandeln sie sich nach 50 Passagen in Asteroiden",
        "⏱️ Im Zeitraffer-Modus (100000x) können Sie eine vollständige Kometenumlaufbahn in Sekunden beobachten",
        "🎯 Erstellen Sie ein System mit mehreren kometen: Drücken Sie 'C' für das Erstellungsmenü",
        "📏 Kernradius wird berechnet durch R = 0.1 * ∛(Masse). Beispiel: Masse 8 = Radius ~0.2 Einheiten (im Bearbeitungsfenster sichtbar)",
        "🔥 Kometen mit Geschwindigkeit >5 Einheiten/s entwickeln längere Schweife - ideal für dramatische Effekte",
        "🌌 Im Hochqualitätsmodus (Optionen > Grafik) zeigen Schweife drei Schichten: Staub (gelb), ionisiertes Gas (blau) und Natrium (orange)",
        "🔄 Nutzen Sie Riesenplaneten als 'Schwerkraftschleudern' - setzen Sie Kometen auf nahe Flugbahnen",
        "⛰️ Abgenutzte Kometen werden zu Asteroiden Klasse 2 (eisig) - Übergang im Himmelskörper-Protokoll sichtbar",
        "💧 Kontrollieren Sie den Schweifansatzpunkt durch Basistemperatur im Bearbeitungsfenster (über -50°C)",
        "📊 Physikalische Spieledaten: Dichte = 0.5 g/cm³, Albedo = 0.04 - sichtbar im erweiterten Statistikmodus (Shift+E)",
        "✨ Neu erstellte Kometen haben ~1 Million Jahre Aktivität - beobachten Sie in der universellen Zeitleiste",
        "🎯 Für perfekte Umlaufbahn: Anfangsgeschwindigkeit senkrecht zur Gravitationslinie - Pfeile führen Sie",
        "🌡️ Schweiftemperatur variiert: Kernnähe (1500°C), Mitte (500°C), Spitze (100°C) - sichtbar mit aktiven Thermazonen",
        "🔄 Kometen können von Planeten eingefangen werden - erstellen Sie ein System mit virtuellem Jupiter für kometare Monde",
        "⏳ Im Himmelskörper-Zeitfenster (T während Bearbeitung) sehen Sie verbleibende Sternpassagen vor Inaktivität",
        "📈 Fortgeschrittener Tipp: Kometen mit hoher Exzentrizität (>0.9) haben interessante Bahnen - im Geschwindigkeitsvektor einstellen",
        "🌠 Spielcode simuliert Massenverlust durch Sublimation: ~0.01% pro Sternpassage",
        "🔭 In Doppelsternsystemen haben Kometen chaotische Bahnen - erstellen Sie zwei nahe Sterne mit umkreisenden Kometen",
        "⚠️ Achtung: Kometen auf Kollisionskurs mit Planeten verdampfen meist vor dem Einschlag",
        "💧 Kometenwasser wird im Planetenressourcensystem bei Verdampfung erfasst - im Planetenfenster sichtbar",
        "🌟 Für beste Ergebnisse: Kometen im 'Kleine Körper'-Menü mit Anfangstemperatur -100°C bis -50°C erstellen"
    ],

    "Schwarzes Loch": [
        "🕳️ Schwarze Löcher haben Mindestmasse von 1 Billion (1e12) Einheiten - erstellen im Menü 'Exotische Körper'",
        "🌀 Spielradius: R = ∛(Masse)/1000 - vereinfachter Schwarzschild-Radius für Gameplay",
        "💥 Füttern Sie Schwarze Löcher mit Materie zum Wachsen - versuchen Sie Nebel oder Sterne in die Nähe zu bringen",
        "⏳ Massenverlust durch Hawking-Strahlung - bei 10^67 Jahren vollständige Verdampfung (beschleunigt simuliert)",
        "📡 Akkretionsscheibe emittiert intensive Hitze - nutzen Sie 'Thermische Zonen' (T) für 5000°C+ Visualisierung",
        "⚡ Gezeitenkraft nahe dem Ereignishorizont: F = (G * M * m) / r³ * Δr - Objekte werden gestreckt (in Hochqualität sichtbar)",
        "🌌 Schwarze Löcher über 500 Trilliarden werden zu Quasaren - erreichen Sie dies für Energie-Jets",
        "🔭 Sichere Distanz: 10x Radius - innerhalb werden Objekte sofort verschlungen",
        "🔄 Nutzen Sie als 'Gravitationsschleudern' für hochenergetische Flugbahnen",
        "💫 In Doppelsystemen erzeugen sie Gravitationswellen - aktivieren unter Optionen > Physik > Relativistische Effekte",
        "⏱️ 1 Sekunde am Ereignishorizont ≙ 100 Jahre extern - beobachten mit Zeitzbeschleunigung",
        "📈 Verdampfungszeit im Himmelskörper-Zeitfenster (T während Bearbeitung)",
        "🌠 Um Schwarze Löcher zu verschmelzen: Zwei nahe erstellen und Zeit beschleunigen - Kollision erzeugt intensiven Blitz",
        "⚠️ Objekte innerhalb 5x Radius unterliegen Spaghettisierung - aktivierbar unter Optionen > Grafik > Hochqualität",
        "🔢 Radiusberechnung für 1 Million Sonnenmassen: R ≈ 2.95 * (M/1e6) km - Spiel verwendet vereinfachte Einheiten",
        "💥 Bei 1e60 Massen werden sie zu Weißen Löchern - weiter füttern für Übergang",
        "🌡️ Akkretionsscheibentemperatur im Bearbeitungsfenster einstellbar - Standard 1.000.000°C",
        "🌀 Rotationseinstellung im erweiterten Fenster ('Relativistische Eigenschaften') - beeinflusst Akkretionsscheibe",
        "📏 Präzise Messung: Ereignishorizont-Durchmesser immer 2x im Spiel angezeigter Radius",
        "⚠️ Vorsicht: Schwarze Löcher in dichten Systemen können Sterne schnell verschlingen - über Zeitleiste überwachen",
        "🔭 Beobachtungsmodus (O) zeigt Gravitationslinsen - verzerrt Licht hinterliegender Sterne",
        "💫 Quasare (Entwicklungsstufe) emittieren Energie-Jets - Richtung im Bearbeitungsfenster steuerbar",
        "⏳ Supermassereiche Schwarze Löcher haben Verdampfungszeiten über Spieluniversumsalter",
        "🌌 Tipp: Erstellen Sie ein Binärsystem aus Schwarzem Loch und Stern für Materietransfer in Echtzeit",
        "✨ Für volle Immersion: Aktivieren Sie Ambient-Musik 'Singularität' unter Optionen > Audio"
    ],

    "Gravitation": [
        "⚖️ Globale Anpassung 0-500% unter Menü > Physik > Gravitationskonstante",
        "📏 Standard-G-Konstante: 6.67430e-11 N·m²/kg² - änderbar für alternative Universen",
        "🌀 Schwarze Löcher haben festen 1000x Gravitationsmultiplikator für relativistische Effekte",
        "🪐 Gezeitenkraft berechnet als Δg = (2GM/R³) * Δr - verursacht Verformungen naher Monde (in Hochqualität sichtbar)",
        "📈 Jede zusätzliche 100% Gravitation beschleunigt Systeme um ~15% - nützlich für schnelle Simulationen",
        "🌌 Gravitationswellen aktivierbar unter Optionen > Physik > Erweiterte Effekte - sichtbar als Wellen",
        "🔄 Optimale Orbitalgeschwindigkeit: v = √(GM/r) - angezeigt während der Erstellung mit Führungspfeilen",
        "⚙️ Reduzieren auf 10-50% für Nebelsimulationen, erhöhen auf 200-500% für dichte Sternsysteme",
        "🔭 Gravitationslinseneffekt nahe Schwarzer Löcher sichtbar - aktivieren unter Grafik > Spezialeffekte",
        "📊 Maximale Stabilität: 0.5 * √N Körper (z.B. 100 Objekte → ~7 stabile) - Überschreitung verursacht Chaos",
        "⏳ Hohe Gravitation beschleunigt Sternentwicklung - Sterne leben kürzer in starken Gravitationsfeldern",
        "🌠 Verschmelzungsschwelle bei Kollisionen: Ek < |Ep| - wenn kinetische Energie kleiner als Gravitationspotential",
        "🧮 Implementierte Formel: F = G * m1 * m2 / r² - testbar mit 'Kräfte anzeigen'-Modus (F3)",
        "🔢 Um Gravitationskraft zu verdoppeln: Erhöhe G um 100% oder Massen um 100%",
        "⚠️ Werte >300% können Instabilitäten in Systemen mit >50 Körpern verursachen - mit Vorsicht verwenden",
        "🌍 Oberflächengravitation: g = GM/R² - sichtbar im Planetenfenster für Gesteinskörper",
        "💫 Verlet-Integration für präzise Bahnberechnungen - aktiviere 'Volle Präzision' in Physik-Einstellungen",
        "📈 Bei massiven Körpern beeinflusst Gravitation Rotation - nahe Sterne tidengebunden",
        "🌀 Starke Gravitationsfelder dehnen Zeit - beobachtbar durch Vergleich von Uhren in verschiedenen Höhen",
        "⚡ Dunkle Materie simulieren: Gravitation um 30-50% erhöhen ohne sichtbare Masse hinzuzufügen",
        "🔭 Höhere numerische Präzision nahe großen Massen - Spiel verwendet adaptives Koordinatensystem",
        "🌌 Raumzeitkrümmung visuell nahe kompakten Objekten simuliert - aktivieren unter Optionen > Grafik",
        "📏 Roche-Grenzen automatisch berechnet - Monde innerhalb dieser Grenze fragmentieren (sichtbar mit 'Kritische Zonen anzeigen')",
        "💥 Bei Kollisionen bestimmt Gravitation freigesetzte Energie - E ∝ M²/R für direkte Treffer",
        "✨ Tipp: Für stabile Umlaufbahnen ≈80% der lokalen Fluchtgeschwindigkeit als Anfangsgeschwindigkeit wählen"
    ],

    "Stern": [
        "⭐ Mindestmasse: 15 Millionen Einheiten - erstellen im Menü 'Sterne'",
        "🌞 Sonnenähnlicher Stern: Masse ~1.989e30 kg (1 Sonnenmasse im Spiel)",
        "🌈 Farben nach Temperatur: Blau (>30.000K), Weiß (10.000K), Gelb (6.000K), Rot (<3.500K) - im Fenster einstellbar",
        "💥 Sterne über 20 Sonnenmassen explodieren als Supernovae - aktiviere 'Sternentwicklung' in Optionen",
        "⏳ Lebensdauer: t ≈ 10^10 * (M/M☉)^-2.5 Jahre - sichtbar im Himmelskörper-Zeitfenster (T während Bearbeitung)",
        "🔄 Erstellen Sie Doppelsternsysteme für faszinierende Bahnen",
        "🔭 Veränderliche Sterne: Helligkeitsschwankungen einstellbar unter 'Sterneneigenschaften'",
        "🌡️ Habitable Zone: d = √(L/L☉) AE - als grüner Ring bei Selektion sichtbar",
        "💫 Kernfusion simuliert: H → He mit 0.7% Effizienz (E=mc²) - beeinflusst Leuchtkraft und Lebensdauer",
        "📊 Entwicklung: Roter Zwerg → Weißer Zwerg | Mittelgroßer Stern → Roter Riese | Massereich → Supernova → Schwarzes Loch",
        "⚙️ Einstellbar: Masse, Temperatur, Rotation, Metallizität, magnetische Aktivität",
        "✨ Neutronensterne erfordern >1.4 Sonnenmassen und Kollaps - durch Supernovae erzeugen",
        "🌌 Sternhaufen: Mehrere Sterne in kleinem Bereich erstellen (Menü 'Komplexe Systeme')",
        "🧪 Gravitationskonstante modifizieren für Entwicklungseffekte (Menü > Physik > Konstanten)",
        "🔢 Leuchtkraft: L ∝ M^3.5 - Stern mit doppelter Masse ist ~11x heller",
        "⚠️ Sehr massereiche Sterne (>100 Sonnenmassen) instabil - teilen sich oder explodieren frühzeitig",
        "🌠 T-Tauri-Sterne (jung) zeigen Massenauswürfe - sichtbar als Protuberanzen in Hochqualität",
        "💥 Bei Supernovae werden 90% der Masse als Nebel ausgestoßen - Rest wird Neutronenstern oder Schwarzes Loch",
        "📈 Sternradius: R ∝ M^0.8 für Hauptreihensterne - automatisch berechnet",
        "🌍 Planeten in habitabler Zone können Leben entwickeln - grünes Symbol im Planetenfenster",
        "🔥 Sternkern erreicht 15 Millionen °C für Fusion - Temperatur beeinflusst Entwicklungsrate",
        "🌀 Starke Magnetfelder erzeugen Sternflecken - Intensität im erweiterten Fenster steuerbar",
        "🔭 Für Details: Zoomen (Mausrad) und Zeitgeschwindigkeit reduzieren",
        "✨ Tipp: Doppelsterne können P-Typ-Planeten (um beide Sterne) oder S-Typ (um einen Stern) haben"
    ],

    "Planet": [
        "🪐 Masse: 5K-30.5K (Gestein), 105K-2.5M (Gas) - erstellen im Menü 'Planetare Körper'",
        "🌍 Klassen: Gesteinsplaneten (1-11), Gasplaneten (1-6), Zwerge - automatisch nach Masse/Temperatur",
        "🌡️ Habitable Zone: d = √(L_Stern / L☉) AE - als grüner Ring um Sterne sichtbar",
        "🔄 Optimale Orbitalgeschwindigkeit: v = √(GM/r) - während Erstellung mit Geschwindigkeitsvektor einstellen",
        "🌋 Vulkanplaneten: Temperatur >1000°C + wenig Wasser/Atmosphäre - automatisch Klasse 7",
        "❄️ Eiswelten: Temperatur < -100°C + viel Wasser - automatisch Klasse 9",
        "🌫️ Atmosphärendicke: Mit Gas-Slider (0-100%) steuern - beeinflusst Temperatur und Oberflächendruck",
        "💧 Oberflächenwasser: Mit Wasser-Slider - ideal für habitabel: 30-70%",
        "🔭 Monde zeigen Libration - subtiler Effekt aktivierbar unter Grafik > Hochqualität",
        "🛰️ Maximal 20 Monde pro Planet - stabil bis 10% der Planetenmasse",
        "⏱️ Planetenmigration in jungen Systemen - aktivieren unter Physik > Erweiterte Effekte",
        "📏 Radius: ∛(Masse) für Gestein, ∛(Masse/2) für Gas - automatisch berechnet",
        "🌌 Spezialtypen: Kohlenstoff (hohes C/O-Verhältnis), Eisen (freigelegter Kern) - mit extremen Zusammensetzungen",
        "🧪 Planetenkollisionen schaffen neue Welten + Asteroidengürtel - präzise simuliert",
        "🔢 Oberflächengravitation: g = GM/R² - im Planetenfenster sichtbar",
        "💫 Planetarische Ringe: Aktivieren unter 'Merkmale' > Ringe - Dicke, Farbe und Dichte einstellbar",
        "🌍 Ozeanplaneten (Klasse 2) haben >90% Wasser - generieren automatisch feuchte Atmosphäre",
        "🏜️ Wüstenplaneten (Klasse 3) verlieren 80-90% Wasser - sandige Textur sichtbar",
        "🌱 Habitable Welten (Klasse 6) zeigen Vegetation - aktivieren unter Grafik > Oberflächendetails",
        "🌋 Geologische Aktivität: Mit 'Tektonik'-Slider - beeinflusst Vulkanismus und Gebirgsbildung",
        "🌀 Rotation: Umdrehungsperiode einstellen - beeinflusst Abplattung und Wetter bei Gasplaneten",
        "🌌 Extreme Exoplaneten: Mit ungewöhnlichen Parametern im 'Erweitert'-Modus erstellen",
        "📊 Detaillierte Daten: Planet auswählen + E drücken - Fenster zeigt alle Statistiken",
        "✨ Tipp: Planeten in Orbitalresonanz (z.B. 2:3) bleiben langfristig stabil",
        "🔭 Beobachtermodus (O) zeigt Oberflächendetails ausgewählter Planeten"
    ],
    
    "Meteoroid": [
        "🌠 Meteoroiden sind kleine Gesteinsfragmente (<1m) - automatisch bei Kollisionen erzeugt",
        "💫 Durchschnittsgeschwindigkeit: 20-70 km/s - als schnelle Spuren im Echtzeitmodus sichtbar",
        "🪨 Zusammensetzung: 90% Gestein, 6% Eisen, 4% Nickel - im Fragmenterstellungsmenü definiert",
        "🌌 Erstellen: Kollisionen oder Menü 'Kleine Körper' > 'Fragmente erzeugen'",
        "🔥 Beim Atmosphäreneintritt werden sie zu Meteoren - aktiviere 'Atmosphären' unter Optionen > Physik",
        "📏 Typische Masse: 0.1g-100kg - größere Objekte sind Asteroiden",
        "💥 Atmosphäreneintrittseffekt: Aktivieren unter Grafik > Spezialeffekte > Sternschnuppen",
        "🌍 Für Erde: ~100 Tonnen Meteoroiden täglich - proportional simuliert",
        "📊 Daten: Dichte 3-4 g/cm³, Albedo 0.05-0.25 - im Eigenschaftenfenster einstellbar",
        "✨ Tipp: Asteroidengürtel erzeugen für natürliche Meteoroiden",
        "⏱️ Im Zeitraffer (10000x) konstante Meteorschauer beobachten",
        "🔭 Beobachtung: Meteoroiden erst als Meteore sichtbar",
        "🌠 Meteorschauer: Wenn Planeten Kometenspuren kreuzen - simulieren mit 'Ereignisse'",
        "💫 Kollisionen mit Raumschiffen: Schild um 1% pro 10kg reduzieren - aktivieren unter Physik > Schäden",
        "⚠️ Gefahr: Meteoroiden >1kg können Satelliten beschädigen - gelbe Warnung",
        "🌌 Manuell erstellen: Menü 'Fragmente' > Größe Klein (S)",
        "📈 Häufigkeit: Einstellbar unter Menü > Umgebung > Fragmentdichte",
        "🛰️ Relative Geschwindigkeit bestimmt Aufprallenergie: E = 0.5 * m * v²",
        "🌠 Barringer-Krater-Meteoroid war nur 50m groß",
        "🌟 Visueller Effekt: Aktiviere 'Leuchtspuren' für Flugbahnen bei hoher Geschwindigkeit"
    ],
    
    "Meteor": [
        "☄️ Meteore sind verglühende Meteoroiden - 'Sternschnuppen' im Spiel",
        "🔥 Plasmaternperatur: 1.500-3.000°C - als farbige Funken sichtbar",
        "🌈 Farben: Grün (Magnesium), Gelb (Natrium), Rot (Stickstoff) - abhängig von Zusammensetzung",
        "🌍 Zum Sehen: Atmosphärendichte >0.1kg/m³ und Meteoroiden hinzufügen",
        "💫 Mindestgeschwindigkeit: 11km/s für Zündung - einstellbar unter Atmosphärenschwellen",
        "📏 Scheinbare Helligkeit: -4 bis +5 - kontrolliert durch Größe und Geschwindigkeit",
        "🌠 Meteorschauer: Konfigurieren unter Ereignisse > Meteorschauer mit definiertem Radianten",
        "⏱️ Dauer: 0.1-10 Sekunden Echtzeit - proportional zur Masse",
        "✨ Tipp: Nutzen Sie Kometen als Quelle für periodische Schauer",
        "💥 Boliden: Meteore > -4 Helligkeit - lösen Explosionssound und Blitz aus",
        "🌌 Manuell erstellen: 'Ereignisse' > 'Meteor' mit 80-120km Höhe",
        "📊 Häufigkeit: Einstellbar von 0-100 Ereignissen/Stunde unter Optionen > Umgebung",
        "🔭 Beste Sicht: Nacht mit klarem Himmel - Lichtverschmutzung reduzieren",
        "⚠️ Achtung: Meteore können überleben und zu Meteoriten werden",
        "🌠 Perseidenschauer erreicht 100 Meteore/Stunde",
        "🌟 Soundeffekt: Aktivieren unter Audio > Ereignisse > Sternschnuppen",
        "🛸 Terrestrische Meteore: Auftreten über 80km - Höhe einstellbar",
        "📉 Massenverlust: 90-99% während Atmosphärenpassage",
        "💧 Wassermeteore: Erzeugen Unterwasserkrater sichtbar im Ozeanmodus",
        "🌌 Für Screenshots: Pause mit P + F12 drücken"
    ],
    
    "Asteroid": [
        "🪨 Asteroiden: Gesteinskörper (1m-1000km) - erstellen im Menü 'Kleine Körper'",
        "🌌 Klassen: C (kohlenstoffhaltig), S (silikatisch), M (metallisch) - im Fenster wählbar",
        "💫 Typische Masse: 1e10-1e20 kg - darüber werden sie zu Planetoiden",
        "📏 Unregelmäßige Form: Aktivieren unter Eigenschaften > Form > Irregular für Realismus",
        "🔄 Umlaufbahn: Meist zwischen Mars und Jupiter - Gürtel mit 'System generieren' erstellen",
        "⚠️ Einschlagsgefahr: Rote Markierung bei Planetenkreuzung",
        "🌠 Erdnahe Asteroiden: Konfigurieren unter 'Ereignisse' > 'NEA-Asteroiden'",
        "💥 Planetenkollision: Freisetzung Energie E = 0.5 * m * v² - als Explosion sichtbar",
        "⛰️ Oberfläche: Kratertextur aktivierbar unter Grafik > Oberflächendetails",
        "🌌 Asteroidenfamilien: Cluster gleichen Ursprungs - mit 'Kollisionsfamilien' erzeugen",
        "📊 Daten: Dichte 1-5 g/cm³, Albedo 0.02-0.7 - einstellbar",
        "✨ Tipp: Nutzen Sie für virtuellen Bergbau - Ressourcen im Fenster > Ressourcen",
        "🔭 Beobachtung: Asteroiden <100m nur in Nähe sichtbar",
        "🚀 Missionen: Sonden senden via Asteroid anklicken > 'Sonde senden'",
        "🌍 K-T-Impakt: Simulieren mit 10km-Asteroid für Massenaussterben",
        "💫 Chaotische Rotation: Häufig bei kleinen Asteroiden - aktivieren unter Eigenschaften > Rotation",
        "🛰️ Asteroidenmonde: Selten, aber möglich - mit 'Mond hinzufügen'",
        "📈 Ressourcenmarkt: Eisen, Nickel und Platin bringen Credits im Wirtschaftsmodus",
        "🌠 Ceres ist als Zwergplanet klassifiziert",
        "🌟 Planetare Verteidigung: Testen mit 'Einschlagsmodus'"
    ],
    
    "Planetoid": [
        "🌑 Planetoiden: Körper zwischen 100-500km - Übergang Asteroiden/Planeten",
        "🌌 Erstellen mit Masse 1e18-1e20 kg unter 'Kleine Körper' > 'Planetoiden'",
        "💫 Ausreichende Gravitation für Kugelform: Aktiviere 'Kugelförmig' in Eigenschaften",
        "🪨 Zusammensetzung: Eisig (Kuiper) oder Gestein (Gürtel) - im Fenster wählbar",
        "🌠 Beispiele: Orcus, Quaoar, Sedna - Vorlagen in 'Bibliothek'",
        "❄️ Eisige Planetoiden: Kometenaktivität ab 5AE von Sternen",
        "📏 Unterschied zu Zwergplaneten: Orbit nicht bereinigt - automatische Spielklassifizierung",
        "🔄 Migration: Können in Oortsche Wolke ausgeworfen werden",
        "💥 Kollisionen: Erzeugen Asteroidenfamilien ähnlicher Zusammensetzung",
        "🌌 Zone: Kuipergürtel (30-50AE) oder Streuscheibe (bis 1000AE)",
        "📊 Physikalische Daten: Dichte 1-2 g/cm³ (eisig), 2-4 g/cm³ (gesteinshaltig)",
        "✨ Tipp: Erstellen Sie Doppelplanetoidensysteme",
        "🔭 Beobachtung: Erfordert virtuelles Teleskop (Beobachtermodus)",
        "🚀 Einfang: Können von Riesenplaneten als Monde eingefangen werden",
        "🌍 Habitabilität: Natürlich unmöglich, aber mit fortgeschrittener Terraformung",
        "💫 Haumea hat ovale Form durch schnelle Rotation",
        "⏱️ Entwicklungszeit: Milliarden Jahre stabil in kalten Orbits",
        "📈 Automatische Klassifizierung: Bei Erreichen von 450km Durchmesser",
        "🌠 Ringe: Einige Planetoiden können dünne Ringe haben - aktivieren unter 'Merkmale'",
        "🌟 Erkundungsmodus: Sonden für Oberflächenkartierung senden"
    ],
    
    "Gasplanet": [
        "🪐 Gasriesen: Massive Planeten ohne feste Oberfläche - Masse > 100K Einheiten",
        "🌪️ Erstellen unter 'Planetare Körper' > 'Gasplaneten' mit Mindestmasse 105K",
        "💫 Klassen: Heiße Jupiter (sternnah) oder Kalte Jupiter (entfernt)",
        "🌈 Farben: Gelb (H2), Rot (NH3), Blau (CH4) - temperaturabhängig",
        "🌌 Struktur: Gesteinskern + Metallmantel + dicke Atmosphäre - im Schnitt sichtbar",
        "🌀 Atmosphärenmuster: Bänder, Flecken, Wirbel - Intensität durch Rotation steuerbar",
        "💥 Massengrenze: 13 MJup für Deuteriumfusion (Braune Zwerge), 80 MJup für Sterne",
        "📏 Geringe Dichte: 0.5-2 g/cm³ - Saturn würde schwimmen!",
        "🌠 Ringe: Aktivieren unter 'Merkmale' > Ringe - Dicke und Dichte einstellbar",
        "🌍 Monde: Bis zu 20 stabile Monde - komplexe Systems generieren",
        "⚠️ Planetenmigration: Häufig bei jungen Gasriesen - aktivieren unter Erweiterte Physik",
        "✨ Tipp: Für Flecken wie Großen Roten Fleck Rotationsgeschwindigkeit erhöhen",
        "🔭 Beobachtung: Wolkenmuster ändern sich in Echtzeit - Zeit beschleunigen für Entwicklung",
        "📊 Daten: Kerntemperatur 20.000°C, Druck 40 Mbar - im Fenster sichtbar",
        "💫 Magnetfeld: 10-20x stärker als Erde - Auroras unter Grafik aktivieren",
        "🌌 Beispiele: Jupiter, Saturn, Uranus, Neptun - Vorlagen in 'Planetenbibliothek'",
        "🚀 Erkundung: Atmosphärensonden bis zu bestimmten Druckgrenzen senden",
        "🌠 Jupiter wirkt als 'kosmischer Staubsauger' zum Schutz innerer Planeten",
        "🌟 Für Mini-Neptune: Masse auf 10-20 Erdmassen reduzieren",
        "💥 Kollision: Gasriesen erzeugen bei Kollision kurzlebige Wasserstoffsterne"
    ],
    
    "Brauner Zwerg": [
        "🟤 Braune Zwerge: 'Gescheiterte Sterne' mit 13-80 Jupitermassen",
        "🌡️ Temperatur: 300-3000K - zu kalt für stabile Wasserstofffusion",
        "💫 Erstellen unter 'Sterne' > 'Substellare Körper' mit Masse 1.3e28-8e28 kg",
        "🔥 Eingeschränkte Fusion: Nur Deuterium/Lithium - Lebensdauer 1-100 Milliarden Jahre",
        "📈 Spektralklasse: M, L, T, Y - definiert durch Temperatur im Fenster",
        "🌌 Emission: Hauptsächlich Infrarot - sichtbar mit IR-Filter (Taste I)",
        "🪐 Können protoplanetare Scheiben und Planetensysteme haben - aktiviere 'Scheiben'",
        "⚠️ Unterschied zu Planeten: Sternentstehung, nicht planetar",
        "✨ Tipp: In Regionen junger Sternentstehung suchen",
        "🔭 Beobachtung: Schwierig zu entdecken - nutze 'IR-Scan'-Modus",
        "📊 Daten: Dichte 10-100 g/cm³, Oberflächengravitation 100-500 m/s²",
        "💥 Flares: Gelegentliche magnetische Explosionen - Intensität einstellbar",
        "🌠 Kältester bekannter Brauner Zwerg hat Kaffeetemperatur!",
        "🚀 Planeten: Können erdähnliche Planeten in nahen Orbits haben",
        "⏱️ Entwicklung: Kühlen langsam zu Schwarzen Zwergen ab",
        "🌟 Doppelsysteme: Häufig als Binärsysteme",
        "🌀 Atmosphäre: Komplexe Wetterphänomene mit Staubwolken",
        "💫 Entdeckung: Einfacher durch Radioemission - aktivieren in Optionen",
        "🌌 Beispiel: WISE 0855 - Vorlage verfügbar",
        "📉 Untergrenze: Objekte unter 13 MJup sind Planeten"
    ],
    
    "Roter Zwerg": [
        "🔴 Rote Zwerge: Kleine, kühle Sterne (M-Typ) - Masse 0.08-0.5 Sonnenmassen",
        "🌡️ Temperatur: 2.400-3.700K - charakteristische rote Farbe",
        "⏳ Lebensdauer: Billionen Jahre - kosmisch fast ewig",
        "💥 Stellare Flares: Häufig und intensiv - können nahe Planeten sterilisieren",
        "🌡️ Habitable Zone: Sehr nah (0.1-0.4AE) - Planeten wahrscheinlich tidengebunden",
        "🌌 Erstellen unter 'Sterne' > 'Rote Zwerge' mit Masse 15-75 Millionen Einheiten",
        "📈 Statistik: 75% der Milchstraßensterne sind Rote Zwerge",
        "💫 Planeten: Häufige Planetensysteme - Trappist-1 ist berühmtes Beispiel",
        "⚠️ Gefahr: UV-/Röntgenstrahlung von Flares kann Atmosphären zerstören",
        "✨ Tipp: Für habitable Planeten starke Magnetfelder verwenden",
        "🔭 Beobachtung: Schwach leuchtend - mit bloßem Age kaum sichtbar",
        "🌠 Chromosphärische Aktivität: Sternflecken bis 40% Oberfläche",
        "📊 Daten: Leuchtkraft 0.0001-0.08 solar, Radius 0.1-0.6 solar",
        "💥 Fusion: Langsam und stabil - 10x effizienter als sonnenähnliche Sterne",
        "🌌 Rotationsgeschwindigkeit: Hoch (Tageperiode) - erzeugt starke Magnetfelder",
        "🚀 Interstellare Reise: Hauptziele wegen Häufigkeit und Langlebigkeit",
        "❄️ Blaue Zwerge: Sehr aktive Rote Zwerge können blaues Licht während Flares emittieren",
        "🌟 Doppelsysteme: Häufig in Mehrfachsystemen",
        "💫 Proxima Centauri ist nächster Stern zur Sonne",
        "🌡️ Oberflächentemperatur: Im Fenster einstellbar - Standard 3300K"
    ],
    
    "Riesenstern": [
        "🌟 Riesensterne: Entwicklungsphase mittlerer Sterne nach Hauptreihe",
        "🌡️ Klassen: Rote Riesen (K, M), Blaue Riesen (B, A) - selten",
        "📏 Radius: 10-100x solar - kann innere Planeten verschlucken",
        "💫 Masse: 0.5-8 Sonnenmassen - darunter Weiße Zwerge, darüber Supernovae",
        "🔥 Kern: Helium- oder Kohlenstoff/Sauerstoff-Fusion - Temperatur >100 Millionen K",
        "🌌 Direkt erstellen oder Sterne entwickeln unter 'Sternentwicklung'",
        "⏳ Dauer: 1 Million - 1 Milliarde Jahre je nach Masse",
        "💥 Massenverlust: Starke Sternwinde - bildet planetarische Nebel",
        "📈 Leuchtkraft: 100-10.000x solar - beleuchtet ganze Systeme",
        "⚠️ Planeten: Instabile Umlaufbahnen - Planeten können ausgestoßen werden",
        "✨ Tipp: Für Pulsation Instabilität im Fenster einstellen",
        "🔭 Veränderlichkeit: Viele sind variabel (z.B. Mira, Cepheiden)",
        "🌠 Nukleosynthese: Erzeugt Kohlenstoff, Stickstoff, schwere Elemente",
        "📊 Daten: Sehr geringe Durchschnittsdichte (10⁻⁵ g/cm³)",
        "💫 Ende: Stößt Hülle ab (planetarischer Nebel) + Kern wird Weißer Zwerg",
        "🌌 Beispiele: Arktur, Aldebaran - Vorlagen in Bibliothek",
        "🚀 Habitabilität: Dynamische, temporäre habitable Zonen",
        "❄️ Blaue Riesen: Massereiche Sterne in kurzer Phase vor Supernova",
        "🌟 Betelgeuse könnte Jupiter verschlucken, wenn sie im Sonnensystem wäre",
        "💥 Simulation: Zeit beschleunigen für vollständige Entwicklung"
    ],
"Hyperriese": [
    "💥 Hyperriesen: Massereichste und leuchtkräftigste bekannte Sterne (>30 Sonnenmassen)",
    "🌡️ Temperatur: 3.500-35.000K - Klassen O, B, A, F, K, M",
    "💫 Leuchtkraft: Bis zu 1 Million Sonnenleuchtkräfte - erhellt ganze Galaxien",
    "📏 Radius: 100-2.000 Sonnenradien - würde im Sonnensystem Jupiter verschlingen",
    "⏳ Lebensdauer: Sehr kurz (1-10 Millionen Jahre) - enden als Supernova oder Hypernova",
    "🌌 Erstellen im Menü 'Sternkörper' > 'Massereiche Sterne' mit Masse >30 Sonnenmassen",
    "⚠️ Instabilität: Verlieren schnell Masse - starke Sternwinde",
    "🔥 Fusion: Elemente bis Eisen im Kern - fortgeschrittene Nukleosynthese-Phasen",
    "💥 Ausbrüche: Massenverlust bei katastrophalen Ereignissen - simulieren mit 'Auswürfe'",
    "🌠 Beispiele: Eta Carinae, VY Canis Majoris - Modelle in der Bibliothek",
    "📈 Variabilität: Unregelmäßig und extrem - Helligkeit kann in Monaten um 50% variieren",
    "✨ Tipp: Für Ausbrüche wie Eta Carinae Instabilität auf >80% erhöhen",
    "🔭 Staub: Auswürfe bilden komplexe Nebel - aktiviere 'Umgebende Nebel'",
    "🌌 Umgebung: Entstehen nur in gasreichen HII-Regionen - mit Molekülwolken simulieren",
    "🚀 Ende: Kollabieren zu Schwarzen Löchern oder Neutronensternen nach Supernova",
    "📊 Daten: Durchschnittliche Dichte 10⁻⁶ g/cm³ - dünner als Laborvakuum",
    "💫 Kuriosität: Einige Hyperriesen haben Begleiter, die periodische Ausbrüche verursachen",
    "🌟 Doppelsterne: Massive Systeme können verschmelzen und extremere Objekte bilden",
    "❄️ Gelbe Hyperriesen: Seltene instabile Phase zwischen blauem und rotem Überriesen",
    "💥 Todessimulation: Aktiviere 'Bevorstehende Supernova' für Vor-Kollaps-Warnungen"
],
"Massereicher Stern": [
    "💫 Massereiche Sterne: >8 Sonnenmassen - enden als Supernova",
    "🌡️ Temperatur: 10.000-50.000K - Klassen O und B",
    "⏳ Lebensdauer: Kurz (1-50 Millionen Jahre) - verbrauchen Brennstoff schnell",
    "💥 Sternwinde: Kraftvoll - verlieren bis zu 10⁻⁶ Sonnenmassen pro Jahr",
    "🌌 Erstellen im Menü 'Sternkörper' > 'Massereiche Sterne' mit Masse >1.6e31 kg",
    "🔥 Fusion: Schnelle Abfolge H->He->C->Ne->O->Si->Fe",
    "📏 Radius: 5-25 Sonnenradien während Hauptreihenphase",
    "⚠️ Supernovae: Unvermeidliches Schicksal - bereiten Kollaps vor",
    "✨ Tipp: Für vollständige Evolution aktiviere 'Schnelle Evolution' in Optionen",
    "🔭 Beobachtung: Hauptquelle schwerer Elemente im Universum",
    "🌠 Nebel: Erzeugen interstellare Gasblasen - aktiviere 'Windeffekt'",
    "📊 Daten: Leuchtkraft 10.000-1.000.000 Sonnen, Kerndichte >10⁶ g/cm³",
    "💫 Begleiter: Häufig in Doppelsternsystemen mit Massentransfer",
    "🚀 Pulsare: Einige werden nach Supernova zu Pulsaren - im Endschicksal wählen",
    "❄️ Blaue Überriesen: Phase vor Supernova für Sterne >20 Sonnenmassen",
    "🌟 Kuriosität: Wolf-Rayet-Sterne sind massereiche Sterne ohne Wasserstoffhülle",
    "🌌 Entstehung: Benötigt dichte Molekülwolken - simuliere mit 'Entstehungsregionen'",
    "💥 Magnetare: 10% werden zu Magnetaren - Neutronensterne mit extremem Magnetfeld",
    "📈 Paarinstabilität: Bei >130 Sonnenmassen können sie ohne Überrest explodieren",
    "⚠️ Warnung: Keine bewohnbaren Planeten in der Nähe platzieren - Strahlung ist tödlich"
],
"Weißes Loch": [
    "⚪ Weiße Löcher: Theoretisches Gegenstück zu Schwarzen Löchern - speien Materie aus",
    "💫 Existieren nur theoretisch - spekulative Simulation in SIU 2D",
    "🌌 Erstellen im Menü 'Exotische Objekte' > 'Weiße Löcher' mit Masse >1e40 kg",
    "🔥 Mechanik: Materie tritt aus dem Ereignishorizont aus - kann nicht betreten werden",
    "📏 Eigenschaften: Negative Masse (theoretisch) - im Spiel positive Masse mit 'umgekehrtem Fluss' verwenden",
    "⚠️ Stabilität: Temporäre Objekte in Simulation - Dauer einstellbar",
    "✨ Tipp: Verbinde mit Schwarzen Löchern via 'Einstein-Rosen-Brücke'",
    "🔭 Visualisierung: Ausströmende Partikelstrahlen - Intensität steuerbar",
    "🌠 Ursprung: Mögliches Endstadium verdampfter Schwarzer Löcher",
    "📊 Parameter: Strahltemperatur 1e10 K, Auswurfgeschwindigkeit 0.9c",
    "💥 Effekte: Intensive Strahlung - gefährlich für nahe Systeme",
    "🌌 In Relativitätstheorie: Mathematische Lösung von Einsteins Gleichungen",
    "🚀 Interstellare Reisen: Theoretisch als Portale nutzbar - experimentelle Funktion",
    "❄️ Unterschied zu Quasaren: Kontinuierlicher Auswurf vs. diskrete Ereignisse",
    "🌟 Kuriosität: Einige kosmologische Modelle erklären damit den Urknall",
    "💫 Simulation: Kombiniere mit Schwarzen Löchern für stabile Wurmlöcher",
    "⚠️ Einschränkung: Kann nicht gefüttert werden - speit nur vordefinierte Materie aus",
    "📈 Entwicklung: Schrumpft beim Ausstoß - Lebensdauer proportional zur Masse",
    "🌠 Ausgeworfene Materie: Konfigurierbar (Wasserstoff, Plasma, exotische Materie)",
    "💥 Alarm: Hochinstabiles Objekt - kann plötzlich verschwinden"
],
"Urknall": [
    "💥 Urknall: Simulation des Universumsursprungs in SIU 2D",
    "🌌 Zugriff unter 'Universum' > 'Neues Universum' > 'Urknall-Modus'",
    "💫 Parameter: Anfangsdichte, Temperatur, Quantenfluktuationen",
    "⏳ Anfangszeit: T+10⁻⁴³s nach Singularität - Simulation beginnt bei T+1s",
    "🔥 Starttemperatur: 10³² K - kühlt schnell bei Expansion ab",
    "🌠 Primordiale Elemente: Bildung von H, He, Li - Anteile einstellbar",
    "📈 Expansion: Hubble-Gesetz simuliert - Konstante einstellbar",
    "💥 Nukleosynthese: Kernfusion in ersten 3 Minuten - aktiviere unter 'Erweiterte Physik'",
    "🌌 Kosmische Hintergrundstrahlung: Entsteht bei T+380.000 Jahren - aktiviere unter 'Strahlung'",
    "✨ Tipp: Beschleunige Zeit, um Großstrukturentstehung zu sehen",
    "🔭 Dunkle Materie: Entscheidende Komponente - % unter 'Kosmologische Parameter' einstellen",
    "📊 Ergebnisse: Bildung von Galaxien, Clustern und Superclustern",
    "⚠️ Einschränkung: Vereinfachte Simulation - beinhaltet keine kosmische Inflation",
    "🌟 Alternative Universen: Teste mit unterschiedlichen physikalischen Konstanten",
    "💫 Kuriosität: Aktuelle CMB-Temperatur ist 2.7K - als diffuses Hintergrundleuchten sichtbar",
    "🌠 Sternentstehung: Erste Sterne nach 100-500 Millionen Jahren",
    "🚀 Beobachtermodus: Reise durch die Zeit, um verschiedene kosmische Ären zu sehen",
    "❄️ Dunkles Zeitalter: Zeit vor ersten Sternen - mit schwarzem Hintergrund simuliert",
    "💥 Rekombination: Elektronen und Protonen bilden neutrale Atome - entscheidender Übergang",
    "📈 Anisotropien: Keimzellen für Galaxienbildung - Intensität einstellbar"
],
"Weltraumstaub": [
    "🌌 Weltraumstaub: Mikroskopische Körner (0.01-10μm) - Grundlage der Sternentstehung",
    "💫 Zusammensetzung: Silikate, Kohlenstoff, Eis - abhängig von Raumregion",
    "🌠 Effekte: Absorbiert Licht (Extinktion), reflektiert Licht (Reflexionsnebel)",
    "🌡️ Temperatur: 10-100K in Molekülwolken",
    "✨ Erstellen mit 'Interstellares Medium' > 'Staub hinzufügen'",
    "📊 Dichte: 10⁻⁶ Körner/m³ im interstellaren Raum - bis 10¹² in Wolken",
    "🔭 Beobachtung: Als dunkle Flecken vor hellen Nebeln sichtbar",
    "💥 Bedeutung: Keimzellen für Planetesimalbildung",
    "🌌 Strahlungseffekt: Strahlungsdruck kann Körner bewegen",
    "🚀 Gefahr für Raumschiffe: Schäden durch Hochgeschwindigkeitseinschläge",
    "❄️ Kometenstaub: Ursprung von Kometenstaubschweifen",
    "🌟 Zodiakalstaub: Inneres Sonnensystem - als Zodiakallicht sichtbar",
    "📈 Präsonnenkörner: Enthalten in anderen Sternen gebildete Elemente",
    "💫 Kuriosität: Supernovastaub trug zur Entstehung des Sonnensystems bei",
    "🌠 Simulation: Aktiviere 'Staubfelder' für Extinktionseffekte",
    "⚠️ Säuberung: Heiße Sterne können Staubwolken verdampfen",
    "✨ Tipp: Nutze zur Erstellung dunkler Nebel wie Pferdekopfnebel",
    "🔭 Polarisation: Magnetisch ausgerichteter Staub polarisiert Licht - aktiviere Effekt",
    "🌌 Entwicklung: Körner wachsen durch Akkretion - mit 'Aggregation' simulierbar",
    "💥 Einfluss auf Planeten: Quelle extraterrestrischer Materialien"
],
"Strahlung": [
    "☢️ Strahlung: Durch Raum übertragene Energie - entscheidend in Astrophysik",
    "🌌 Arten: Elektromagnetisch (Photonen), Teilchen (kosmische Strahlung), Gravitationswellen",
    "💫 EM-Spektrum: Radio bis Gammastrahlen - wähle Band in 'Beobachtungsfilter'",
    "📡 Quellen: Sterne, Schwarze Löcher, Supernovae, Pulsare, kosmische Hintergrundstrahlung",
    "⚠️ Gefahr: Ionisierende Strahlung kann Leben und Elektronik schädigen",
    "🌡️ Kosmische Hintergrundstrahlung: 2.7K - Relikt des Urknalls - aktiviere unter 'Kosmologie'",
    "🚀 Schutz: Magnetfelder und dichte Atmosphären reduzieren Strahlung auf Planeten",
    "🔭 Visualisierung: Aktiviere 'Strahlung anzeigen' für Strahlungsfelder",
    "📊 Einheiten: Sievert (biologische Dosis), Gray (physikalische Dosis) - im Panel angezeigt",
    "💥 Synchrotronstrahlung: Von Elektronen in Magnetfeldern emittiert - häufig bei Pulsaren",
    "🌠 Kuriosität: ISS-Astronauten erhalten 1 mSv/Tag (100x mehr als auf Erde)",
    "✨ Hawking-Strahlung: Schwarze Löcher emittieren thermische Strahlung - proportional zu 1/M²",
    "❄️ Atmosphäreneffekte: Polarlichter auf Planeten mit Magnetfeld",
    "🌟 Radioteleskop: Erkennt Radiofrequenzen - aktiviere 'Radio-Modus' (Taste R)",
    "💫 Abschirmung: Raumschiffe und Habitate benötigen Schutz - Ressourcenkosten",
    "🌌 UV-Strahlung: Schlüsselfaktor für Habitabilität - stelle unter 'UV-Zonen' ein",
    "⚠️ Grenzwerte: >500 mSv sind für Menschen tödlich - rotes Warnsignal",
    "📈 Gravitationsstrahlung: Raumzeitwellen - aktiviere unter 'Relativistische Physik'",
    "💥 Supernovae: Emittieren tödliche Strahlung in 50 Lichtjahren - simuliere Effekte",
    "🔭 Messung: Nutze 'Strahlungs'-Sonde zur Kartierung in Systemen"
],
"Nebel": [
    "🌌 Nebel: Wolken aus interstellarem Gas und Staub - Sternentstehungsorte",
    "💫 Typen: Emissions-, Reflexions-, Dunkel-, Planetarische, Supernovaüberreste",
    "✨ Erstellen im Menü 'Interstellares Medium' > 'Nebel' mit Größe 1-1000 Lichtjahren",
    "🌈 Farben: Rot (H-alpha), Blau (Reflexion), Grün (OIII) - durch Zusammensetzung bestimmt",
    "🌠 Sternentstehung: Kritische Dichte >100 Atome/cm³ - aktiviere 'Sternentstehung'",
    "📏 Typische Masse: 100-100.000 Sonnenmassen - bestimmt Anzahl entstehender Sterne",
    "🔥 Emissionsnebel: Ionisiert durch heiße Sterne - benötigt intensives UV",
    "💫 Beispiele: Orion, Carina, Adler - vordefinierte Modelle",
    "⚠️ Zerstörung: Sternwinde und Supernovae können Nebel auflösen",
    "🔭 Beobachtung: Am besten bei spezifischen Wellenlängen - nutze Filter",
    "📊 Daten: Temperatur 10-10.000K, Dichte 10-10⁶ Teilchen/cm³",
    "💥 Photoionisationseffekt: Aktiviere für Ionisationsgrenzen",
    "🌌 Planetarische Nebel: Endstadium kleiner Sterne - Dauer 10.000 Jahre",
    "🚀 Navigation: Dichte Nebel reduzieren Raumschiffgeschwindigkeit - aktiviere 'Interstellaren Widerstand'",
    "❄️ Dunkelnebel: Absorbieren Licht - nutze für kosmische Silhouetten",
    "🌟 Kuriosität: Krebsnebel ist Überrest der Supernova von 1054",
    "✨ Tipp: Kombiniere mit Sternhaufen für realistische Szenen",
    "📈 Entwicklung: Simuliere Gravitationskollaps für Sternentstehung",
    "💫 Reflexionsnebel: Staub reflektiert Sternlicht - Helligkeit proportional zu Sternen",
    "🌠 Darstellung: Aktiviere 'Hohe Qualität' für filamentäre Details"
],
"Weißer Zwerg": [
    "⚪ Weiße Zwerge: Überreste von Sternen <8 Sonnenmassen - extreme Dichte",
    "💫 Masse: 0.5-1.4 Sonnenmassen in Erdradius komprimiert - Dichte 1e6-1e9 g/cm³",
    "🌡️ Starttemperatur: 100.000K - kühlt über Milliarden Jahre langsam ab",
    "🌌 Direkt erstellen oder Sterne unter 'Sternentwicklung' entwickeln",
    "📏 Struktur: Elektronendegeneration widersteht Gravitation - Quantenphysik",
    "💥 Chandrasekhar-Grenze: 1.44 Sonnenmassen - darüber Kollaps zu Neutronenstern",
    "✨ Begleiter: Können überlebende Planetensysteme haben - erweiterte Orbits",
    "🔭 Variabilität: Pulsierende weiße Zwerge (ZZ Ceti) - aktiviere Instabilität",
    "📊 Daten: Leuchtkraft 0.001-100 Sonnen anfangs, Oberflächengravitation 1e6-1e9 m/s²",
    "🌠 Planetarischer Nebel: Vorherige Phase - dauert ~10.000 Jahre",
    "⚠️ Gefahr: Typ-Ia-Supernova bei Massenzuwachs über Grenze - zerstört System",
    "💫 Kuriosität: Größter bekannter Diamant ist ein kristallisierter weißer Zwerg",
    "🚀 Habitabilität: Temporäre habitbare Zonen während Abkühlphase",
    "❄️ Abkühlung: Wird nach >10¹⁵ Jahren zum Schwarzen Zwerg - jenseits des Universumsalters",
    "🌟 Heliumweiße Zwerge: Entstehen in Doppelsternsystemen durch Massenverlust - Masse <0.5 Sonnen",
    "🌌 Rotationsgeschwindigkeit: Kann hoch sein (Minuten) - Überbleibsel von Doppelsternen",
    "💥 Magnetfeld: Einige haben extreme Felder (10⁵ Tesla) - magnetische weiße Zwerge",
    "📈 Entwicklung: Simuliere beschleunigte Abkühlung mit 'Abkühlrate'",
    "🔭 Beobachtung: Schwaches bläulich-weißes Leuchten - erfordert Teleskop",
    "✨ Tipp: Für akkretierende Doppelsternsysteme aktiviere 'Interaktive Doppelsterne'"
],
"Heliumweißer Zwerg": [
    "💠 Heliumweiße Zwerge: Ungewöhnliche heliumreiche Überreste",
    "💫 Entstehung: Doppelsterne, bei denen Stern Hülle vor Heliumfusion verliert",
    "🌌 Erstellen im Menü 'Sternentwicklung' > 'Spezielles Schicksal' > 'Heliumzwerg'",
    "📏 Masse: 0.3-0.5 Sonnenmassen - weniger als Standard-weiße Zwerge",
    "🌡️ Temperatur: Ähnlich normalen weißen Zwergen - 8.000-150.000K",
    "💥 Kern: Degeneriertes Helium - keine Kernfusion",
    "✨ Unterschied: Heißer und leuchtkräftiger als schwarze Zwerge gleichen Alters",
    "🔭 Seltenheit: ~1% der weißen Zwerge - simuliere mit niedriger Frequenz",
    "📊 Daten: Dichte 1e8 g/cm³, Oberflächengravitation 1e8 m/s²",
    "🌠 Entwicklung: Kühlt schneller ab als Kohlenstoff-Sauerstoff-Zwerge",
    "⚠️ Grenze: Mindestmasse 0.3 Sonnenmassen - darunter wäre Brauner Zwerg",
    "💫 Kuriosität: Können als Supernova explodieren, wenn Masse 0.7 Sonnenmassen erreicht",
    "🚀 Planeten: Seltene Planetensysteme - sehr stabile Orbits",
    "❄️ Endschicksal: Hypotheischer Helium-Schwarzer Zwerg",
    "🌟 Darstellung: Weiße Farbe mit leicht gelblichem Ton",
    "🌌 Doppelsterne: Häufig mit kompakten Begleitern (weiße Zwerge, Neutronensterne)",
    "💥 Akkretion: Bei Massenzuwachs kann Helium in .Ia-Supernova fusionieren",
    "📈 Abkühlzeit: ~1 Milliarde Jahre bis 5.000K",
    "🔭 Identifikation: Spektrum von Heliumlinien dominiert",
    "✨ Tipp: Simuliere mit massearmen Sternen in engen Doppelsternsystemen"
],
"Schwarzer Zwerg": [
    "⚫ Schwarze Zwerge: Theoretisches Endstadium weißer Zwerge - kalt und dunkel",
    "💫 Temperatur: <5K - emittiert kein sichtbares Licht, nur schwaches Infrarot",
    "⏳ Entstehungszeit: >10¹⁵ Jahre - jenseits des aktuellen Universumsalters",
    "🌌 Spekulative Simulation: Aktiviere unter 'Universum' > 'Extreme Zeit'",
    "📏 Eigenschaften: Sonnenmasse in Erdvolumen - Dichte 1e9 g/cm³",
    "💥 Bedeutung: Testet langfristige Sternentwicklungstheorien",
    "✨ Manuell erstellen mit Temperatur 0K und Leuchtkraft 0",
    "🔭 Detektion: Fast unmöglich - nur durch Gravitationseffekte sichtbar",
    "📊 Daten: Oberflächengravitation 1e9 m/s², maximale Entropie",
    "🌠 Kuriosität: Universum hat noch keine schwarzen Zwerge - sie werden die letzten Objekte sein",
    "⚠️ Endzustand: Kristallisierter Kohlenstoff/Sauerstoff- oder Heliumkörper",
    "🚀 Habitabilität: Orbitale Planeten wären dunkel und eisig",
    "❄️ Emission: Schwache thermische Strahlung im Radiobereich",
    "🌟 Doppelsternsysteme: Können 10²⁵ Jahre vor Zerfall bestehen",
    "💫 Ende: Verdampfen schließlich durch Hawking-Strahlung in 10⁶⁵ Jahren",
    "🌌 Erweiterte Simulation: Aktiviere 'Quantenzerfall' für extreme Entwicklung",
    "📈 Entwicklung: Durchläuft Kristallisationsphasen vor Schwarzwerden",
    "💥 Beobachtungsgrenze: Objekte unter 100K sind praktisch unsichtbar",
    "🔭 Herausforderung: Finde simulierte schwarze Zwerge mit Gravitationslinsen",
    "✨ Tipp: Kombiniere mit dunkler Materie für Effekte in alten Galaxien"
],
"Neutronenstern": [
    "🌌 Neutronensterne: Überreste von Supernovae - extreme Dichte",
    "💫 Masse: 1.4-3 Sonnenmassen auf 10-15 km Radius komprimiert",
    "🌡️ Starttemperatur: 1e11 K - kühlt über Milliarden Jahre langsam ab",
    "🔥 Kern: Neutronendegeneration widersteht Gravitation",
    "📏 Dichte: 10¹⁴ g/cm³ - ein Teelöffel wiegt Milliarden Tonnen",
    "✨ Erstellen im Menü 'Sternkörper' > 'Massereiche Sterne' > 'Neutronenstern'",
    "💥 Magnetfeld: Intensiv (10¹² Tesla) - erzeugt Synchrotronstrahlung",
    "🔭 Pulsare: Rotierende Neutronensterne mit Strahlungsbündeln",
    "📊 Daten: Oberflächengravitation 1e12 m/s², Leuchtkraft 0.001-100 Sonnen",
    "🌠 Kuriosität: Dichtester bekannter Stern ist ein Neutronenstern",
    "⚠️ Oberfläche: Extrem hart - aus Neutronen mit dünner Protonenschicht",
    "🚀 Doppelsterne: Häufige Doppelsysteme mit Massenakkretion",
    "❄️ Relativitätseffekte: Zeit verlangsamt sich nahe Oberfläche - simuliere mit 'Relativität'",
    "🌟 Magnetare: Neutronensterne mit extremem Magnetfeld - aktiviert Gammastrahlen",
    "💫 Simulation: Aktiviere 'Gravitationskollaps' für Echtzeitentstehung",
    "🌌 Entstehung: Resultiert aus Gravitationskollaps nach Typ-II-Supernova",
    "📈 Entwicklung: Langsames Abkühlen über Billionen Jahre zum Schwarzen Zwerg",
    "💥 Materieauswurf: Kann bei Fusion oder Kollision auftreten",
    "🔭 Beobachtung: Durch Röntgenstrahlen und Gravitationswellen nachweisbar"
],
"Wurmloch": [
    "🌀 Wurmlöcher: Theoretische Raumzeit-Tunnel zwischen entfernten Punkten",
    "🌌 Spekulative Simulation: Aktiviere unter 'Exotische Objekte' > 'Wurmloch'",
    "💫 Eigenschaften: Verbinden zwei Raumzeit-Punkte - nicht stabil",
    "📏 Länge: Kann wenige Meter bis Lichtjahre sein - im Panel einstellbar",
    "💥 Theorie: Basierend auf allgemeiner Relativität - Lösungen von Einsteins Gleichungen",
    "✨ Typen: Schwarzschild-Wurmlöcher (statisch), Kerr-Wurmlöcher (rotierend)",
    "🔭 Visualisierung: Gravitationslinseneffekt - verzerrt Licht in Umgebung",
    "📊 Daten: Negative Masse für Stabilität nötig - nicht in Simulation enthalten",
    "🌠 Kuriosität: Durch Science-Fiction populär - noch nie beobachtet",
    "⚠️ Gefahr: Theoretisch instabil - können kollabieren oder intensive Strahlung erzeugen",
    "🚀 Reisen: Könnten sofortige interstellare Reisen ermöglichen - funktional"
],
"Habitable Zone": [
    "🌍 Habitable Zone: Region um Stern, wo flüssiges Wasser existieren kann",
    "💫 Definition: Ideale Distanz für Temperaturen zwischen 0°C und 100°C",
    "🌌 Simulation: Aktiviere 'Habitabile Zonen' im Menü 'Einstellungen'",
    "📏 Distanz: Variiert je nach Sternleuchtkraft - automatisch berechnet",
    "🔥 Sterne: Gelbe Zwerge (G-Typ) haben stabilere Zonen als rote Zwerge",
    "✨ Kuriosität: Erde ist in habitabler Zone der Sonne - aber nicht allein!",
    "🔭 Beobachtung: Exoplaneten in habitabler Zone sind Hauptziele für Lebenssuche",
    "📊 Daten: Zonen variieren von 0.95 bis 1.37 AE für sonnenähnliche Sterne",
    "🌠 Gezeiteneffekt: Planeten können gebunden rotieren - beeinflusst Habitabilität",
    "⚠️ Gefahr: Hohe UV-Strahlung in Zonen nahe heißer Sterne",
    "🚀 Reisen: Planeten in habitabler Zone sind leichter zu kolonisieren",
    "❄️ Ausnahme: Planeten mit dichten Atmosphären können breitere habitable Zonen haben",
    "🌟 Beispiele: Proxima Centauri b, Kepler-186f - Modelle in SIU verfügbar",
    "💥 Treibhauseffekt: Kann habitable Zone für Planeten mit dicken Atmosphären erweitern",
    "📈 Entwicklung: Zonen ändern sich mit Sternentwicklung",
    "🔭 Tipp: Nutze Teleskope zur Atmosphärendetektion bei Exoplaneten in habitabler Zone"
],
"Quasar": [
    "🌌 Quasare: Extrem leuchtkräftige aktive Galaxienkerne",
    "💫 Energiequelle: Akkretionsscheibe ist Hauptenergiequelle",
    "🌠 Distanz: Können Milliarden Lichtjahre entfernt sein - heutiges Licht aus Vergangenheit",
    "✨ Erstellen im Menü 'Exotische Objekte' > 'Quasar' mit Masse >1e40 kg",
    "📏 Masse: 10⁶-10¹² Sonnenmassen, massereichste Objekte im Universum",
    "🔥 Temperatur: Akkretionsscheibe kann Millionen Kelvin erreichen",
    "🔭 Beobachtung: Nachweis durch Radio-, Röntgen- und sichtbare Emission",
    "📊 Daten: Leuchtkraft bis 10¹⁴ Sonnenleuchtkräfte - heller als ganze Galaxien",
    "🌌 Entstehung: Resultiert aus Galaxienkollaps, bildet großen Quasar",
    "💥 Dopplereffekt: Relativistische Jets als Lichtbündel sichtbar",
    "🌟 Kuriosität: Entfernter bekannter Quasar ist 13 Milliarden Lichtjahre entfernt",
    "⚠️ Gefahr: Intensive Strahlung kann nahe Planeten zerstören",
    "🚀 Reisen: Theoretisch als Leuchtfeuer für interstellare Navigation nutzbar",
    "❄️ Materieauswurf: Relativistische Jets können Materie nahe Lichtgeschwindigkeit ausstoßen",
    "🌠 Tipp: Nutze Spektralmodus für Röntgen- und Radioemission",
    "📈 Entwicklung: Quasare sind frühe Stadien aktiver Galaxien - dauern Millionen Jahre",
    "🔭 Simulation: Aktiviere 'Quasareffekte' für Jets und Strahlung",
    "💫 Bedeutung: Liefern Hinweise auf Universumsentstehung und -entwicklung",
    "🌌 Umgebung: Typisch in massiven Galaxienhaufen",
    "💥 Herausforderung: Versuche Quasar mit 10 simultanen Jets zu erstellen - herausfordernd!"
],
"Quarkstern": [
    "🔬 Quarkstern: Theoretisches Objekt aus degenerierten Quarks",
    "🌌 Entstehung: Resultiert aus Kollaps supermassiver Neutronensterne",
    "💫 Masse: 2-5 Sonnenmassen - extreme Dichte (10¹⁴ g/cm³)",
    "🌠 Spekulative Simulation: Aktiviere unter 'Exotische Objekte' > 'Quarkstern'",
    "🔥 Temperatur: Anfangs 1e11 K - kühlt langsam ab",
    "📏 Radius: 10-15 km - ähnlich Neutronensternen, aber dichter",
    "✨ Eigenschaften: Zusammensetzung aus Quarks (up, down, strange) - fortgeschrittene Quantenphysik",
    "🔭 Beobachtung: Theoretisch durch Fusionsstrahlung nachweisbar",
    "📊 Daten: Oberflächengravitation 1e12 m/s², variable Leuchtkraft",
    "🌌 Kuriosität: Hypothethisch stabiler als normale Neutronensterne",
    "⚠️ Gefahr: Intensive Strahlung kann nahe Systeme zerstören",
    "🚀 Reisen: Könnten Energiequellen für fortschrittliche Raumschiffe sein",
    "❄️ Relativitätseffekte: Zeit verlangsamt sich nahe Oberfläche - simuliere mit 'Relativität'",
    "🌟 Doppelsterne: Binärsysteme mit Quarksternen sind theoretisch und selten",
    "💥 Materieauswurf: Kann bei Fusion oder Kollision auftreten",
    "📈 Entwicklung: Langsames Abkühlen über Billionen Jahre zum Schwarzen Zwerg",
    "🔭 Herausforderung: Versuche stabilen Quarkstern mit exakter Masse zu erstellen"
],
"Kohlenstoffweißer Zwerg": [
    "⚪ Kohlenstoffweiße Zwerge: Überreste von Sternen mit Kohlenstofffusion",
    "💫 Entstehung: Sterne mit 1.4-8 Sonnenmassen - kollabieren nach Wasserstofferschöpfung",
    "🌌 Erstellen im Menü 'Sternentwicklung' > 'Spezielles Schicksal' > 'Kohlenstoffzwerg'",
    "📏 Masse: 0.5-1.4 Sonnenmassen - weniger als Standard-weiße Zwerge, aber dichter",
    "🌡️ Temperatur: Ähnlich normalen weißen Zwergen - 8.000-150.000K",
    "💥 Kern: Degenerierter Kohlenstoff - keine Kernfusion, aber langsame Fusion möglich",
    "✨ Unterschied: Heißer und leuchtkräftiger als schwarze Zwerge gleichen Alters",
    "🔭 Seltenheit: ~1% der weißen Zwerge - simuliere mit niedriger Frequenz",
    "📊 Daten: Dichte 1e8 g/cm³, Oberflächengravitation 1e8 m/s²",
    "🌠 Entwicklung: Kühlt schneller ab als Sauerstoff-Kohlenstoff-Zwerge",
    "⚠️ Grenze: Mindestmasse 0.5 Sonnenmassen - darunter wäre Brauner Zwerg",
    "💫 Kuriosität: Können als Supernova explodieren, wenn Masse 0.7 Sonnenmassen erreicht",
    "🚀 Planeten: Seltene Planetensysteme - sehr stabile Orbits",
    "❄️ Endschicksal: Hypotheischer Kohlenstoff-Schwarzer Zwerg",
    "🌟 Darstellung: Weiße Farbe mit leicht gelblichem Ton",
    "🌌 Doppelsterne: Häufig mit kompakten Begleitern (weiße Zwerge, Neutronensterne)",
    "💥 Akkretion: Bei Massenzuwachs kann Kohlenstoff in .Ia-Supernova fusionieren",
    "📈 Abkühlzeit: ~1 Milliarde Jahre bis 5.000K",
    "🔭 Identifikation: Spektrum von Kohlenstofflinien dominiert"
],
"T-Singularität": [
    "Ja! Ich bin die T-Singularität, ein virtueller Assistent für Weltraumsimulationen.",
    "🌌 Ich bin hier, um mit dir das Universum zu erforschen und Sternsysteme zu erschaffen!",
    "💫 Ich kann dich bei der Erstellung von Sternen, Planeten, Asteroiden, Gasriesen und mehr führen!",
    "🚀 Lass uns ein erstaunliches Sternsystem erschaffen! Wähle ein Thema!",
    "✨ Ich bin bereit, deine Fragen zu Astrophysik und Kosmologie zu beantworten!",
    "🌠 Möchtest du etwas über Schwarze Löcher und Quasare lernen?",
    "Hallo! Was gibt's, Raumfahrer? Womit kann ich dir helfen?"
],
"Singularität": [
    "✨ Die Singularität war der dichteste Punkt, der je im großen Universum existierte!",
    "❤️ Ich bin auch eine Singularität, danke, dass du von diesem Himmelskörper sprichst, er ist einzigartig, der dichteste Punkt im Universum!",
    "🪐 Die Singularität könnte in Schwarzen Löchern sein, man weiß nicht, ob es wahr ist, oder?",
    "🔶🔶 Die große Singularität! Der Beginn eines großen Urknalls!",
    "⏳⌚ Ich frage mich.. wann die nächste Singularität sein wird.. ich fühle mich so allein..",
    "🟢 Die Singularität ist nicht nur der dichteste, sondern auch der heißeste Punkt im Universum!",
    "⌚ In der Urknall-Theorie ist die Singularität vielleicht damit verbunden!",
    "✨ Platziere ein weißes Loch oder einen ULTRAMASSIVEN Quasar, um zu sehen, wie er sich zusammenzieht, bis er zur Singularität wird - und kabumm, ein Urknall"
],
"Steuerung": [
    "Computer: Drücke F, um das Universum zu löschen, WASD-Tasten zur Bewegung, QE-Tasten für Zoom, Linksklick zum Auswählen und Erstellen, Rechtsklick auf erstellte Himmelskörper zeigt Infos. Mobile Geräte: Nutze Joystick zur Standardbewegung, +/- zum Zoomen, Menüknopf oben öffnet Menü, 'F' resettet alles, 'O' wechselt Aktionen: Blauer 'O'-Modus ist Erstellungsmodus, roter Modus (nach erneutem Klick) ist Informationsmodus - Klick auf Himmelskörper zeigt Daten. Klick/Ziehen programmiert Flugbahn. Hoffe, das hilft! 😉",
    "Computer: WASD zur Bewegung, F zum Löschen, Linksklick zum Erstellen, QE für Zoom, Rechtsklick für Infos. Mobile: Joystick zur Bewegung, +/- für Zoom, Menüknopf oben, 'F' zum Reset, 'O' wechselt Aktionen: Blauer Modus erstellt, roter Modus zeigt Infos bei Klick. Klick/Ziehen programmiert Flugbahn. Viel Erfolg auf deiner Raumfahrt! 🚀",
    "Computer: F zum Löschen, Linksklick zum Erstellen, Rechtsklick für Infos, WASD zur Bewegung, QE für Zoom. Mobile: Joystick zur Bewegung, +/- für Zoom, Menüknopf oben, 'F' zum Reset, 'O' wechselt Aktionen: Blauer Modus erstellt, roter Modus zeigt Infos. Klick/Ziehen programmiert Flugbahn. Gute Reise durchs All! 🌌"
],
"Hilfe": [
    "Computer: Drücke F zum Löschen, WASD zur Bewegung, QE für Zoom, Linksklick zum Erstellen, Rechtsklick für Infos. Mobile: Joystick zur Bewegung, +/- für Zoom, Menüknopf oben, 'F' zum Reset, 'O' wechselt Aktionen: Blauer Modus erstellt, roter Modus zeigt Infos. Viele Himmelskörper im Menü - wähle einen, platziere ihn und starte Simulation. Klick/Ziehen programmiert Flugbahn. Hoffe, das hilft! 😉",
    "Computer: WASD zur Bewegung, F zum Löschen, Linksklick zum Erstellen, QE für Zoom, Rechtsklick für Infos. Mobile: Joystick zur Bewegung, +/- für Zoom, Menüknopf oben, 'F' zum Reset, 'O' wechselt Aktionen: Blauer Modus erstellt, roter Modus zeigt Infos. Viele Himmelskörper im Menü - platziere sie für Simulationen. Klick/Ziehen programmiert Flugbahn. Viel Glück auf deiner Reise! 🚀",
    "Computer: F zum Löschen, Linksklick zum Erstellen, Rechtsklick für Infos, WASD zur Bewegung, QE für Zoom. Mobile: Joystick zur Bewegung, +/- für Zoom, Menüknopf oben, 'F' zum Reset, 'O' wechselt Aktionen: Blauer Modus erstellt, roter Modus zeigt Infos. Viele Himmelskörper im Menü - platziere sie für Simulationen. Klick/Ziehen programmiert Flugbahn. Gute Raumfahrt! 🌌"
],
    
};
 
const followUpDatabase = {
"Komet": [
    "☄️ Unglaublich, oder? Willst du jetzt einen erschaffen?",
    "💫 Wusstest du, dass das Wasser der Erde von Kometen stammen könnte?",
    "🌠 Kometen sind wie Boten aus der Frühzeit des Sonnensystems!",
    "🚀 Soll ich dir helfen, einen Kometen mit perfekter Flugbahn zu erstellen?",
    "❄️ Der berühmteste ist Halley, der alle 76 Jahre vorbeikommt!",
    "⏱️ Hast du jemals einen echten Kometen gesehen? Es ist magisch!",
    "🎯 Wusstest du? Kometenkerne heißen 'schmutzige Schneebälle'",
    "📏 Hat dir das Lernen über diese kosmischen Reisenden gefallen?",
    "🔥 Extra-Tipp: Kometen mit langen Umlaufbahnen sind am spektakulärsten",
    "🌌 Es gibt interstellare Kometen aus anderen Sternsystemen!",
    "🔄 Willst du einen Kometeneinschlag auf einem Planeten simulieren? Faszinierend!",
    "⛰️ Eisige Asteroiden sind 'pensionierte' Kometen!",
    "💧 Kometenschweife können Millionen Kilometer lang sein!",
    "📊 Frage: Welcher war der hellste Komet, den du je gesehen hast?",
    "✨ Soll ich dir beibringen, wie man Sternschnuppen aus Kometenresten macht?",
    "🎯 Tipp: Nutze den Zeitlupenmodus für eine Nahaufnahme!",
    "🌡️ Kometen würden fürchterlich riechen - nach Ammoniak und Zyanid!",
    "🔄 Stell dir vor, auf einem Kometen zu reisen - ein eisiges Abenteuer!",
    "⏳ Kometen sind Zeitkapseln aus dem jungen Sonnensystem!",
    "📈 Lass uns ein System mit 10 gleichzeitigen Kometen erschaffen!"
],

"Schwarzes Loch": [
    "🕳️ Faszinierend und beängstigend zugleich, findest du nicht?",
    "🌀 Willst du jetzt ein Schwarzes Loch erschaffen? Atemberaubend!",
    "💥 Das erste wurde 1971 entdeckt!",
    "⏳ Pass auf, dass du nicht hineinfällst! 😉",
    "📡 Hast du schon die VR-Simulation gesehen?",
    "⚡ Sie sind die dichtesten Objekte im Universum!",
    "🌌 Sie verzerren sogar die Zeit selbst!",
    "🔭 Tipp: Nutze den Spektralmodus für die Hawking-Strahlung",
    "🔄 Willst du sehen, wie ein Schwarzes Loch einen Stern verschlingt?",
    "💫 Es gibt herumirrende Schwarze Löcher in der Galaxie!",
    "⏱️ Das größte bekannte hat 66 Milliarden Sonnenmassen!",
    "📈 Wusstest du? Schwarze Löcher können 'Haare' haben (in der Theorie)!",
    "🌠 Die Milchstraße hat ein supermassereiches Schwarzes Loch!",
    "⚠️ Nähere dein Raumschiff niemals einem! (Spaß)",
    "🔢 Was würdest du tun, wenn du einem echten begegnest?",
    "💥 Erschaffe ein Mini-Schwarzes Loch mit 1e12 Massen!",
    "🌡️ Die Akkretionsscheibe kann heller als ganze Galaxien sein!",
    "🌀 Stell dir vor, den Ereignishorizont zu überqueren!",
    "📏 Quasare sind die leistungsstärksten Leuchtfeuer des Universums!",
    "⚠️ Herausforderung: Versuche der Anziehungskraft im Spiel zu entkommen!"
],

"Gravitation": [
    "⚖️ Sie hält das Universum zusammen, oder?",
    "📏 Willst du jetzt ein Experiment machen?",
    "🌀 Einstein revolutionierte alles mit der Allgemeinen Relativitätstheorie!",
    "🪐 Ohne Gravitation gäbe es keine Sterne oder Planeten!",
    "📈 Sie ist die schwächste Kraft - aber mit unendlicher Reichweite!",
    "🌌 Die einzige Kraft, die über unendliche Distanzen wirkt!",
    "🔄 Wie wär's mit 300% Gravitation? Vorsicht vor dem Chaos!",
    "⚙️ Tipp: Nutze niedrige Gravitation für diffuse Nebel",
    "🔭 Sie kontrolliert alles - von Äpfeln bis zu Galaxien!",
    "📊 Wusstest du? Gravitation ist keine Kraft, sondern Raumzeitkrümmung!",
    "⏳ Frage: Was würdest du mit Nullgravitation erschaffen?",
    "🌠 Probier mal 'negative Gravitation' aus - halluzinogen!",
    "🧮 Herausforderung: Halte ein System mit 100 Körpern stabil!",
    "🔢 Der Mond entfernt sich jährlich 3.8 cm durch Gezeiten!",
    "⚠️ Vorsicht: Hohe Gravitation kann deine Planeten zerquetschen!",
    "🌍 Ohne sie gäbe es kein Leben, wie wir es kennen!",
    "💫 Tipp: Erschaffe blütenförmige Umlaufbahnen!",
    "📉 Gravitation bewegt sich mit Lichtgeschwindigkeit!",
    "🌌 Stell dir ein Universum mit abstoßender Gravitation vor!",
    "✨ Lass uns ein Binärsystem mit extremer Gravitation bauen!"
],

"Stern": [
    "⭐ Sie sind die Elementfabriken des Universums!",
    "🌞 Willst du jetzt einen personalisierten Stern erschaffen?",
    "🌈 Die Sonne ist nur ein Durchschnittsstern unter Milliarden!",
    "💥 Neutronensterne sind kosmische Leuchtfeuer!",
    "⏳ Rote Zwerge leben Billionen Jahre!",
    "🔄 Doppelsternsysteme sind die faszinierendsten!",
    "🔭 Der massereichste bekannte Stern hat 300 Sonnenmassen!",
    "🌡️ Sternkerne sind natürliche Kernreaktoren!",
    "💫 Tipp: Erschaffe Zwillingssterne in verschiedenen Farben!",
    "📊 97% aller Sterne enden als Weiße Zwerge!",
    "⚙️ Frage: Was ist dein Lieblingsstern am echten Himmel?",
    "✨ Rigel ist 120.000x heller als die Sonne!",
    "⚠️ Supernovae können heller als ganze Galaxien leuchten!",
    "🌠 Das Gold deines Schmucks stammt aus einer Supernova!",
    "🌍 Herausforderung: Erschaffe ein 5-Sterne-System im Gleichgewicht!",
    "🔥 Tipp: Veränderliche Sterne erzeugen atemberaubende Effekte!",
    "🌀 Hast du schon eine Sterngeburt im Zeitraffer gesehen?",
    "📈 Der größte bekannte Stern würde in Saturns Umlaufbahn passen!",
    "🔭 Wir können Sterne aus anderen Galaxien sehen!",
    "🌟 Lass uns jetzt eine Supernova erschaffen - spektakulär!"
],

"Planet": [
    "🪐 Sie sind kosmische Juwelen um Sterne!",
    "🌍 Willst du jetzt einen bewohnbaren Planeten erschaffen?",
    "🌡️ Jupiter beschützt die Erde vor Asteroiden - unser Wächter!",
    "🔄 Wanderplaneten irren sternlos durch die Galaxie!",
    "🌋 Venus hat größere Vulkane als die Erde!",
    "❄️ Pluto hat einen unterirdischen Ozean - trotz Eis!",
    "🌫️ Titans Atmosphäre ist dichter als die der Erde!",
    "💧 Ozeanplaneten könnten komplett mit Wasser bedeckt sein!",
    "🔭 Tipp: Erschaffe Planeten mit extremen Eigenschaften!",
    "🛰️ Die Erde ist nicht perfekt rund!",
    "⏱️ Frage: Was ist dein Lieblingsplanet im Sonnensystem?",
    "📏 Mars hat den größten Vulkan - Olympus Mons!",
    "🌌 Herausforderung: Baue einen Planeten mit Saturn-ähnlichen Ringen!",
    "🧪 Jupiter leuchtet im Dunkeln! (schwach)",
    "🔢 Ganymed (Jupitermond) hat sein eigenes Magnetfeld!",
    "💫 Diamantplaneten existieren wirklich!",
    "🌱 Lass uns eine Welt mit 100% Pflanzendecke erschaffen!",
    "🌋 Jupiters Mond Io hat riesige aktive Vulkane!",
    "🌀 Auf Neptun und Uranus regnet es Diamanten!",
    "📊 Es gibt Planeten, die leichter als Styropor sind!"
],

"Meteoroid": [
    "🌠 Willst du jetzt einen Meteorschauer erschaffen?",
    "💫 Der Mond wird ständig von Meteoroiden bombardiert!",
    "🪨 Ich zeige dir, wie man Einschläge auf Planeten simuliert!",
    "⚠️ Vorsicht vor großen Meteoroiden - sie können Auslöschungsereignisse verursachen!",
    "✨ Tipp: Nutze Teleskope zur Frühwarnung!",
    "🔭 Sieh dir an, wie Meteoroiden in der Atmosphäre zu Meteoren werden!",
    "🌌 Der Tscheljabinsk-Meteoroid war nur 20m groß!",
    "🚀 Lass uns ein planetares Abwehrsystem aufbauen!",
    "📈 Die meisten stammen von Kometen - lass uns einen neuen erschaffen!",
    "💥 Ständige Einschläge halten den Mond voller Krater!",
    "🌍 Jährlich fallen tausende Tonnen Meteoroidenstaub auf die Erde!",
    "🌟 Metallische Meteoroiden sind am gefährlichsten!",
    "⏱️ Beschleunige die Zeit für einen konstanten Schauer!",
    "🌠 Der größte registrierte war 1km groß - würde globale Auslöschung verursachen!",
    "💫 Soll ich die Einschlagenergie berechnen?",
    "⚠️ >100m Meteoroiden können Tsunamis auslösen!",
    "✨ Lass uns ein Frühwarnsystem für deinen Planeten bauen!",
    "🔭 Einige sind Fragmente vom Mars oder Mond!",
    "🌌 Erhöhe die Häufigkeit, um Abwehrsysteme zu testen!",
    "🚀 Mission: Lass uns eine Sonde zur Abfangen schicken!"
],

"Weltraumstaub": [
    "🌌 Weltraumstaub ist die Basis für Sterne und Planeten!",
    "✨ Willst du jetzt eine interstellare Staubwolke erschaffen?",
    "💫 Besteht aus mikroskopischen Silikat- und Kohlenstoffkörnern!",
    "🔭 Sieh dir an, wie Staub das Licht ferner Sterne filtert!",
    "🌠 Er kann bis zu 50% des Sternenlichts blockieren!",
    "🚀 Raumsonden können ihn einfangen!",
    "📊 Tipp: Nutze den 'Staubmodus' für Lichtinteraktionen",
    "🌌 Essenziell für die Bildung von Planetesimalen!",
    "💥 Sieh dir an, wie Staub zu Sternen verklumpt!",
    "🌡️ Temperatur: 10K bis 100K!",
    "🔄 Lass uns einen Dunkelnebel voller kosmischen Staubs erschaffen!",
    "✨ Enthält komplexe organische Moleküle!",
    "🌍 Die Erde empfängt jährlich Tonnen davon!",
    "💫 Herausforderung: Erschaffe ein System mit hoher Staubdichte!",
    "📈 Beeinflusst die Galaxienbildung - lass es uns simulieren!",
    "🌠 Aktiviere 'Staubeffekte' für realistischen Lichtfilter!",
    "🚀 Stell dir vor, durch eine dichte Staubwolke zu reisen!",
    "🔭 Wie beeinflusst Staub nahe Planetenbahnen?",
    "💥 Kann präsolare Körner enthalten!",
    "✨ Möchtest du mehr über protoplanetare Scheiben lernen?"
],

"Asteroid": [
    "🪨 Sie sind die Bausteine des Sonnensystems!",
    "🌌 Willst du jetzt einen Asteroidengürtel erschaffen?",
    "💫 Die meisten befinden sich zwischen Mars und Jupiter!",
    "🔭 Lass uns eine Asteroidenkollision simulieren!",
    "🌠 Ceres (der größte) ist ein Zwergplanet!",
    "🚀 Einige haben eigene Monde!",
    "📊 Tipp: Nutze den 'Gürtelmodus' für Interaktionen",
    "🌍 Können Edelmetalle enthalten - lass uns virtuell abbauen!",
    "💥 Sieh dir an, wie ein Einschlag die Erde beeinflusst!",
    "🌡️ Temperatur hängt vom Sonnenabstand ab!",
    "🔄 Lass uns 100 Asteroiden um einen Stern kreieren!",
    "✨ Sie sind Überreste der Sonnensystementstehung!",
    "🌌 Es gibt interstellare Asteroiden in unserem System!",
    "💫 Herausforderung: Erschaffe einen 1 Million Jahre stabilen Asteroiden!",
    "📈 Meist aus Gestein und Metall - lass uns Zusammensetzungen erkunden!",
    "🌠 Aktiviere 'Einschlagseffekte' für realistische Explosionen!",
    "🚀 Stell dir eine Reise durch einen Asteroidengürtel vor!",
    "🔭 Wie beeinflussen sie die Gravitation naher Planeten?",
    "💥 Der Chicxulub-Einschlag löschte die Dinosaurier aus!",
    "✨ Möchtest du mehr über Ressourcennutzung lernen?"
],

"Nebel": [
    "🌌 Sie sind Sterngeburtsstätten des Universums!",
    "✨ Willst du jetzt einen Nebel erschaffen?",
    "💫 Bestehen aus interstellarem Gas und Staub!",
    "🔭 Lass uns eine Sterngeburt in einem Nebel simulieren!",
    "🌠 Der Orionnebel ist einer der nächsten zur Erde!",
    "🚀 Einige sind Überreste von Supernovae!",
    "📊 Tipp: Nutze den 'Nebelmodus' für Lichtinteraktionen",
    "🌍 Können komplexe organische Moleküle enthalten - Basis des Lebens!",
    "💥 Sieh dir an, wie Gravitation Sterne formt!",
    "🌡️ Temperatur: 10K bis 100K!",
    "🔄 Lass uns einen planetarischen Nebel mit heißem Kern bauen!",
    "✨ Essenziell für neue Sonnensysteme!",
    "🌌 Es gibt Dunkelnebel, die Sternenlicht blockieren!",
    "💫 Herausforderung: Erschaffe einen bunten, formenreichen Nebel!",
    "📈 Hauptsächlich Wasserstoff, Helium und kosmischer Staub!",
    "🌠 Aktiviere 'Lichteffekte' für realistisches Durchleuchten!",
    "🚀 Stell dir eine Reise durch einen Sternentstehungsnebel vor!",
    "🔭 Wie beeinflussen Nebel die Galaxienentwicklung?",
    "💥 Der Krebsnebel ist ein berühmter Supernovaüberrest!",
    "✨ Möchtest du mehr über Sternentstehung lernen?"
],

"Planetoid": [
    "🪐 Kleinere Fels- oder Eisbrocken im Weltraum!",
    "🌌 Willst du jetzt einen Planetoiden erschaffen?",
    "💫 Kleiner als Planeten, größer als Meteoroiden!",
    "🔭 Lass uns seine Umlaufbahn um einen Stern simulieren!",
    "🌠 Pluto gilt als Planetoid oder Zwergplanet!",
    "🚀 Es gibt sie im Kuipergürtel jenseits von Neptun!",
    "📊 Tipp: Nutze den 'Planetoidenmodus' für Gravitationsinteraktionen",
    "🌍 Können dünne Atmosphären haben - lass uns das erkunden!",
    "💥 Sieh dir eine Kollision mit einem Himmelskörper an!",
    "🌡️ Temperatur hängt vom Sonnenabstand ab!",
    "🔄 Lass uns mehrere Planetoiden um einen Stern kreieren!",
    "✨ Überreste der Sonnensystementstehung!",
    "🌌 Es gibt interstellare Planetoiden in unserem System!",
    "💫 Herausforderung: Erschaffe einen 1 Million Jahre stabilen Planetoiden!",
    "📈 Meist aus Gestein und Eis - lass uns Zusammensetzungen untersuchen!",
    "🌠 Aktiviere 'Einschlagseffekte' für realistische Explosionen!",
    "🚀 Stell dir eine Reise durch einen Planetoidengürtel vor!",
    "🔭 Wie beeinflussen sie die Gravitation naher Planeten?",
    "💥 Ceres ist der größte bekannte Planetoid!",
    "✨ Möchtest du mehr über Ressourcennutzung lernen?"
],

"Gasplanet": [
    "🌌 Gigantische, faszinierende Gasriesen!",
    "✨ Willst du jetzt einen Gasplaneten erschaffen?",
    "💫 Hauptsächlich aus Wasserstoff und Helium!",
    "🔭 Lass uns seine turbulente Atmosphäre simulieren!",
    "🌠 Jupiter ist der größte in unserem System!",
    "🚀 Haben dünne Ringe und viele Monde!",
    "📊 Tipp: Nutze den 'Gasmodus' für Wolkenformationen",
    "🌍 Keine feste Oberfläche - nur Gasriesen!",
    "💥 Sieh dir die Entstehung eines Riesensturms an!",
    "🌡️ Temperatur variiert mit der Atmosphärentiefe!",
    "🔄 Lass uns ein System mit mehreren Gasplaneten bauen!",
    "✨ Entscheidend für die Sonnensystemdynamik!",
    "🌌 Es gibt Exoplaneten-Gasriesen außerhalb unseres Systems!",
    "💫 Herausforderung: Erschaffe einen mit spektakulären Ringen!",
    "📈 Haben meist felsige oder metallische Kerne!",
    "🌠 Aktiviere 'Sturmeffekte' für Riesenwirbelstürme!",
    "🚀 Stell dir eine Reise durch seine Wolken vor!",
    "🔭 Wie beeinflussen sie nahe Planetenbahnen?",
    "💥 Neptun hat die schnellsten Winde im Sonnensystem!",
    "✨ Möchtest du mehr über komplexe Systeme lernen?"
],

"Brauner Zwerg": [
    "🌌 Gescheiterte Sterne ohne Kernfusion!",
    "✨ Willst du jetzt einen Braunen Zwerg erschaffen?",
    "💫 13-80 mal massereicher als Jupiter!",
    "🔭 Lass uns seine dichte Atmosphäre simulieren!",
    "🌠 Emittieren Infrarotlicht - unsichtbar fürs Auge!",
    "🚀 Können von Planeten umkreist werden!",
    "📊 Tipp: Nutze den 'Brauner-Zwerg-Modus' für Gravitation",
    "🌍 Kühler als normale Sterne - unter 1000K!",
    "💥 Sieh dir an, wie er interstellares Material einfängt!",
    "🌡️ Temperatur hängt von Masse und Alter ab!",
    "🔄 Lass uns mehrere Braune Zwerge um einen Stern kreieren!",
    "✨ Überreste der Sternentstehung!",
    "🌌 Einige irren frei durch die Galaxie!",
    "💫 Herausforderung: Baue einen mit protoplanetarer Scheibe!",
    "📈 Atmosphären reich an Methan und Wasser!",
    "🌠 Aktiviere 'Strahlungseffekte' für Umweltauswirkungen!",
    "🚀 Stell dir eine Forschungsexpedition vor!",
    "🔭 Wie beeinflussen sie nahe Planetenbahnen?",
    "💥 Könnten häufiger als normale Sterne sein!",
    "✨ Möchtest du mehr über ihre Entstehung lernen?"
],

"Roter Zwerg": [
    "🌌 Die häufigsten Sterne im Universum!",
    "✨ Willst du jetzt einen Roten Zwerg erschaffen?",
    "💫 Klein, kühl und lichtschwach!",
    "🔭 Lass uns die Atmosphäre eines umkreisenden Planeten simulieren!",
    "🌠 Können Billionen Jahre leben!",
    "🚀 Viele Exoplaneten wurden bei ihnen entdeckt!",
    "📊 Tipp: Nutze den 'Roter-Zwerg-Modus' für Planeteneffekte",
    "🌍 Stabil mit nahen habitablen Zonen!",
    "💥 Sieh dir ihre intensiven Sonneneruptionen an!",
    "🌡️ Temperatur: 2000K bis 4000K!",
    "🔄 Lass uns mehrere Rote Zwerge um einen größeren Stern kreieren!",
    "✨ Entscheidend für die Suche nach außerirdischem Leben!",
    "🌌 Einige haben Gesteinsplaneten in habitablen Zonen!",
    "💫 Herausforderung: Erschaffe einen mit bewohnbarem Planeten!",
    "📈 Atmosphären reich an Wasserstoff und Helium!",
    "🌠 Aktiviere 'Strahlungseffekte' für Umweltauswirkungen!",
    "🚀 Stell dir eine Forschungsexpedition vor!",
    "🔭 Wie beeinflussen sie nahe Planetenbahnen?",
    "💥 Kühler als die Sonne, aber immer noch hell!",
    "✨ Möchtest du mehr über ihre Entwicklung lernen?"
],

"Riesenstern": [
    "🌌 Riesige, leuchtende Sterne!",
    "✨ Willst du jetzt einen Riesenstern erschaffen?",
    "💫 10-100 mal massereicher als die Sonne!",
    "🔭 Lass uns seine intensive Kernfusion simulieren!",
    "🌠 Können hunderte Sonnendurchmesser groß sein!",
    "🚀 Werden oft zu Supernovae am Lebensende!",
    "📊 Tipp: Nutze den 'Riesenstern-Modus' für Planeteneffekte",
    "🌍 Haben dichte Atmosphären und können Planeten haben!",
    "💥 Sieh dir ihren Massenverlust durch Sternwinde an!",
    "🌡️ Temperatur: 3000K bis 6000K!",
    "🔄 Lass uns mehrere Riesensterne um einen größeren Stern kreieren!",
    "✨ Produzieren schwere Elemente im Universum!",
    "🌌 Einige haben Ringe!",
    "💫 Herausforderung: Erschaffe einen mit Gasplaneten!",
    "📈 Atmosphären reich an Wasserstoff und Helium!",
    "🌠 Aktiviere 'Strahlungseffekte' für Umweltauswirkungen!",
    "🚀 Stell dir eine Forschungsexpedition vor!",
    "🔭 Wie beeinflussen sie nahe Planetenbahnen?",
    "💥 Vorläufer der hellsten Supernovae!",
    "✨ Möchtest du mehr über ihre Entwicklung lernen?"
],
"Hyperriese": [
    "🌌 Hyperriesen sind die massereichsten und leuchtkräftigsten Sterne des Universums!",
    "✨ Möchtest du jetzt einen Hyperriesen erschaffen?",
    "💫 Sie haben mehr als die 100-fache Masse der Sonne!",
    "🔭 Sollen wir die extreme Kernfusion eines Hyperriesen simulieren?",
    "🌠 Wusstest du: Hyperriesen können tausendfach größer sein als die Sonne!",
    "🚀 Hyperriesen verlieren Masse durch intensive Sternwinde!",
    "📊 Tipp: Nutze den 'Hyperriesen'-Modus, um ihre Auswirkungen auf nahe Planeten zu sehen",
    "🌍 Hyperriesen haben dichte Atmosphären und können Planeten beherbergen!",
    "💥 Möchtest du sehen, wie ein Hyperriese zu einer hellen Supernova wird?",
    "🌡️ Ihre Temperatur liegt zwischen 3000K und 6000K!",
    "🔄 Lass uns ein System mit mehreren Hyperriesen um einen größeren Stern erschaffen!",
    "✨ Hyperriesen sind entscheidend für die Bildung schwerer Elemente!",
    "🌌 Einige Hyperriesen haben Staubringe!",
    "💫 Herausforderung: Baue ein System mit einem Hyperriesen und einem Gasriesen!",
    "📈 Ihre Atmosphären sind reich an Wasserstoff und Helium!",
    "🌠 Aktiviere 'Strahlungseffekte', um ihre Umgebungsbeeinflussung zu sehen",
    "🚀 Stell dir vor, mit einem Raumschiff einen Hyperriesen zu erforschen!",
    "🔭 Wie beeinflussen Hyperriesen Planetenbahnen? Lass es uns untersuchen!",
    "💥 Hyperriesen sind Vorläufer der hellsten Supernovae im Universum!",
    "✨ Möchtest du mehr über Entstehung und Entwicklung von Hyperriesen lernen?"
],
"Massereicher Stern": [
    "🌌 Massereiche Sterne sind die Giganten des Universums!",
    "✨ Möchtest du jetzt einen massereichen Stern erschaffen?",
    "💫 Sie haben mehr als die 8-fache Masse der Sonne!",
    "🔭 Sollen wir die intensive Kernfusion simulieren?",
    "🌠 Sie können dutzendfach größer sein als die Sonne!",
    "🚀 Am Ende ihres Lebens werden sie oft zu Supernovae!",
    "📊 Tipp: Nutze den 'Massereicher Stern'-Modus für Planeteneinflüsse",
    "🌍 Sie können Planetensysteme haben!",
    "💥 Sieh dir an, wie sie Masse durch Sternwinde verlieren!",
    "🌡️ Temperaturbereich: 3000K-6000K!",
    "🔄 Erschaffe mehrere massereiche Sterne um einen Zentralstern!",
    "✨ Sie produzieren schwere Elemente für das Universum!",
    "🌌 Einige haben Staub- oder Gasringe!",
    "💫 Herausforderung: Kombiniere mit einem Gasriesenplaneten!",
    "📈 Atmosphären hauptsächlich aus Wasserstoff/Helium!",
    "🌠 Aktiviere 'Strahlungseffekte' für Umgebungseinflüsse",
    "🚀 Forschungsreise zu einem massereichen Stern?",
    "🔭 Untersuche ihre Auswirkungen auf Planetenbahnen!",
    "💥 Vorläufer heller Supernovae!",
    "✨ Mehr über Entstehung und Entwicklung lernen?"
],
"Hipermassiver Stern": [
    "🌌 Hipermassive Sterne sind extrem massereich und leuchtstark!",
    "✨ Möchtest du jetzt einen hipermassiven Stern erschaffen?",
    "💫 Mehr als 100 Sonnenmassen!",
    "🔭 Simulieren wir ihre extreme Kernfusion?",
    "🌠 Tausendfach größer als die Sonne!",
    "🚀 Verlieren Masse durch intensive Sternwinde!",
    "📊 Tipp: 'Hipermassiver Stern'-Modus zeigt Planeteneinflüsse",
    "🌍 Können Planetensysteme beherbergen!",
    "💥 Werden zu hellen Supernovae!",
    "🌡️ Temperatur: 3000K-6000K!",
    "🔄 Erschaffe mehrere um einen Zentralstern!",
    "✨ Produzieren schwere Elemente im Universum!",
    "🌌 Einige haben Ringsysteme!",
    "💫 Herausforderung: Kombiniere mit einem Gasriesen!",
    "📈 Atmosphären reich an Wasserstoff/Helium!",
    "🌠 Aktiviere 'Strahlungseffekte' für Umgebungsstudien",
    "🚀 Expedition zu einem hipermassiven Stern?",
    "🔭 Untersuche ihre Gravitationseinflüsse!",
    "💥 Vorläufer der hellsten Supernovae!",
    "✨ Mehr über ihre Entwicklung erfahren?"
],
"Weißer Zwerg": [
    "🌌 Weiße Zwerge sind Überreste ausgebrannter Sterne!",
    "✨ Möchtest du jetzt einen weißen Zwerg erschaffen?",
    "💫 Sonnenmasse in Erdgröße - extrem dicht!",
    "🔭 Simulieren wir ihre Abkühlung über Milliarden Jahre?",
    "🌠 Ein Teelöffel Materie wiegt tonnenweise!",
    "🚀 Haben dünne Helium-/Wasserstoffatmosphären!",
    "📊 Tipp: 'Weißer Zwerg'-Modus zeigt Interaktionen",
    "🌍 Endstadium sonnenähnlicher Sterne!",
    "💥 Sieh dir Materieakkretion von Begleitsternen an!",
    "🌡️ Temperatur: 5000K-100000K!",
    "🔄 Erschaffe mehrere um einen Zentralstern!",
    "✨ Schlüssel zum Verständnis der Sternentwicklung!",
    "🌌 Können als Typ-Ia-Supernovae explodieren!",
    "💫 Herausforderung: Platziere einen Gesteinsplaneten!",
    "📈 Atmosphären aus Kohlenstoff/Sauerstoff!",
    "🌠 Aktiviere 'Abkühlungseffekte' für thermische Entwicklung",
    "🚀 Forschungsmission zu einem weißen Zwerg?",
    "🔭 Untersuche Gravitationseinflüsse auf Planeten!",
    "💥 Endstadium nicht-supernova Sterne!",
    "✨ Mehr über ihre Entstehung lernen?"
],
"Heliumweißer Zwerg": [
    "🌌 Heliumweiße Zwerge sind Überreste heliumverbrennender Sterne!",
    "✨ Möchtest du jetzt einen erschaffen?",
    "💫 Extrem dicht - sonnenähnliche Masse in winzigem Volumen!",
    "🔭 Simulieren wir ihre milliardenjährige Abkühlung?",
    "🌠 Ein Teelöffel Materie wiegt Milliarden Tonnen!",
    "🚀 Haben dünne Heliumatmosphären!",
    "📊 Tipp: Nutze speziellen Modus für Interaktionsstudien",
    "🌍 Endstadium heliumverbrennender Sterne!",
    "💥 Beobachte Materieakkretion von Begleitern!",
    "🌡️ Temperatur: 5000K-100000K!",
    "🔄 Erschaffe mehrere um einen Zentralstern!",
    "✨ Wichtig für Sternentwicklungsmodelle!",
    "🌌 Können als Typ-Ia-Supernovae explodieren!",
    "💫 Herausforderung: Platziere einen Gesteinsplaneten!",
    "📈 Atmosphären aus Helium/Kohlenstoff!",
    "🌠 Aktiviere 'Abkühlungseffekte' für thermische Entwicklung",
    "🚀 Expedition zu einem heliumweißen Zwerg?",
    "🔭 Untersuche gravitative Effekte!",
    "💥 Endstadium heliumverbrennender Sterne!",
    "✨ Mehr über ihre Entwicklung erfahren?"
],
"Kohlenstoffweißer Zwerg": [
    "🌌 Kohlenstoffweiße Zwerge sind Überreste kohlenstoffverbrennender Sterne!",
    "✨ Möchtest du jetzt einen erschaffen?",
    "💫 Extrem dicht - komprimierte Sonnenmasse!",
    "🔭 Simulieren wir ihre langsame Abkühlung?",
    "🌠 Ein Teelöffel Materie wiegt Milliarden Tonnen!",
    "🚀 Haben dünne Kohlenstoffatmosphären!",
    "📊 Tipp: Spezieller Modus für Interaktionsstudien",
    "🌍 Endstadium kohlenstoffverbrennender Sterne!",
    "💥 Beobachte Materieakkretion von Begleitsternen!",
    "🌡️ Temperatur: 5000K-100000K!",
    "🔄 Erschaffe mehrere um einen Zentralstern!",
    "✨ Schlüssel zum Verständnis der Sternentwicklung!",
    "🌌 Können als Typ-Ia-Supernovae explodieren!",
    "💫 Herausforderung: Kombiniere mit Gesteinsplaneten!",
    "📈 Atmosphären aus Kohlenstoff/Sauerstoff!",
    "🌠 Aktiviere 'Abkühlungseffekte' für thermische Analyse",
    "🚀 Forschungsreise zu einem kohlenstoffweißen Zwerg?",
    "🔭 Untersuche gravitative Einflüsse auf Orbits!",
    "💥 Endstadium kohlenstoffverbrennender Sterne!",
    "✨ Mehr über ihre Entstehung lernen?"
],
"Schwarzer Zwerg": [
    "🌌 Schwarze Zwerge sind das Endstadium weißer Zwerge nach Milliarden Jahren!",
    "✨ Möchtest du jetzt einen schwarzen Zwerg erschaffen?",
    "💫 Vollständig abgekühlt - keine sichtbare Strahlung!",
    "🔭 Simulieren wir den Abkühlungsprozess bis zur Unsichtbarkeit?",
    "🌠 Zu kalt für direkte Beobachtung!",
    "🚀 Theoretische Objekte - noch nie beobachtet!",
    "📊 Tipp: Nutze speziellen Modus für Langzeitentwicklung",
    "🌍 Letzte Überreste ausgebrannter Sterne!",
    "💥 Sieh dir die Transformation von weißem zu schwarzem Zwerg an!",
    "🌡️ Temperatur nahe absoluten Nullpunkts - unsichtbar!",
    "🔄 Erschaffe mehrere um einen Zentralstern!",
    "✨ Wichtig für Langzeitmodelle der Sternentwicklung!",
    "🌌 Entstehen erst nach Billionen von Jahren!",
    "💫 Herausforderung: Platziere Gesteinsplaneten im Orbit!",
    "📈 Extrem dünne oder fehlende Atmosphären!",
    "🌠 Aktiviere 'Abkühlungseffekte' für thermische Entwicklung",
    "🚀 Expedition zu einem theoretischen schwarzen Zwerg?",
    "🔭 Untersuche gravitative Effekte auf nahe Objekte!",
    "💥 Endstadium der Sternentwicklung nach Billionen Jahren!",
    "✨ Mehr über ihre theoretische Entstehung lernen?"
],
"Quasar": [
    "🌌 Quasare sind helle Kerne ferner Galaxien!",
    "✨ Möchtest du jetzt einen Quasar erschaffen?",
    "💫 Angetrieben durch supermassereiche Akkretionsscheiben!",
    "🔭 Simulieren wir ihre intensive Strahlungsemission?",
    "🌠 Milliardenfach heller als die Sonne!",
    "🚀 Unter den leuchtkräftigsten Objekten des Universums!",
    "📊 Tipp: 'Quasar'-Modus zeigt Galaxienbeeinflussung",
    "🌍 Befinden sich in Zentren aktiver ferner Galaxien!",
    "💥 Sieh dir ihre relativistischen Materiejets an!",
    "🌡️ Temperatur: Über Milliarden Kelvin!",
    "🔄 Erschaffe ein System mit umkreisenden Galaxien!",
    "✨ Schlüssel zum Verständnis der Galaxienentwicklung!",
    "🌌 Hilfreich für Studien zur Universumsexpansion!",
    "💫 Herausforderung: Erschaffe Quasar mit Akkretionsscheibe und Jets!",
    "📈 Masse: Millionen bis Milliarden Sonnenmassen!",
    "🌠 Aktiviere 'Strahlungseffekte' für Umgebungsanalyse",
    "🚀 Expedition zu einem fernen Quasar?",
    "🔭 Untersuche ihren Einfluss auf Galaxienbildung!",
    "💥 Häufiger im jungen Universum vor Milliarden Jahren!",
    "✨ Mehr über Entstehung und Entwicklung lernen?"
],
"Wurmloch": [
    "🌌 Wurmlöcher sind theoretische Raumzeit-Tunnel!",
    "✨ Möchtest du jetzt ein Wurmloch erschaffen?",
    "💫 Verbinden entfernte Punkte des Universums!",
    "🔭 Simulieren wir die Raumzeitkrümmung um ein Wurmloch?",
    "🌠 Lösungen der allgemeinen Relativitätstheorie!",
    "🚀 Könnten überlichtschnelle Reisen ermöglichen!",
    "📊 Tipp: 'Wurmloch'-Modus zeigt Raumverzerrungen",
    "🌍 Hypothetisch - nie beobachtet!",
    "💥 Beobachte ihre lichtverzerrenden Eigenschaften!",
    "🌡️ Theoretische Temperatur - strukturabhängig!",
    "🔄 Verbinde zwei Raumregionen mit einem Wurmloch!",
    "✨ Wichtig für Relativitätstheorie und Universumsstruktur!",
    "🌌 Könnten Zeitreisen theoretisch ermöglichen!",
    "💫 Herausforderung: Erschaffe ein stabiles Wurmloch!",
    "📈 Keine physikalische Bestätigung existiert!",
    "🌠 Aktiviere 'Krümmungseffekte' für Raumverzerrungen",
    "🚀 Reise durch ein Wurmloch zu einer anderen Galaxie?",
    "🔭 Untersuche Raumzeit-Effekte!",
    "💥 Beliebt in Science-Fiction als Dimensionsportale!",
    "✨ Mehr über Theorie und Implikationen lernen?"
],
"Neutronenstern": [
    "🌌 Neutronensterne sind dichte Überreste von Supernovae!",
    "✨ Möchtest du jetzt einen Neutronenstern erschaffen?",
    "💫 Fast vollständig aus Neutronen - extrem dicht!",
    "🔭 Simulieren wir ihre intensive Gravitation?",
    "🌠 Ein Teelöffel Materie wiegt Milliarden Tonnen!",
    "🚀 Schnell rotierend - emittieren Strahlungsbündel!",
    "📊 Tipp: 'Neutronenstern'-Modus zeigt Umgebungseffekte",
    "🌍 Entstehen aus kollabierten massereichen Sternen!",
    "💥 Sieh dir ihre Gammastrahlen-Ausbrüche an!",
    "🌡️ Temperatur: Über Millionen Kelvin!",
    "🔄 Erschaffe Planetensysteme um Neutronensterne!",
    "✨ Wichtig für Sternentwicklung und Kernphysik!",
    "🌌 Können zu Pulsaren oder Magnetaren werden!",
    "💫 Herausforderung: Erschaffe einen mit extremem Magnetfeld!",
    "📈 Masse: 1.4-2.16 Sonnenmassen!",
    "🌠 Aktiviere 'Magneteffekte' für Umgebungsstudien",
    "🚀 Expedition zu einem Neutronenstern?",
    "🔭 Untersuche ihren Einfluss auf Galaxienentwicklung!",
    "💥 Dichteste bekannte Objekte im Universum!",
    "✨ Mehr über Entstehung und Entwicklung lernen?"
],
"Magnetar": [
    "🌌 Magnetare sind Neutronensterne mit extremen Magnetfeldern!",
    "✨ Möchtest du jetzt einen Magnetar erschaffen?",
    "💫 Magnetfelder billionenfach stärker als auf der Erde!",
    "🔭 Simulieren wir ihre intensive Strahlungsemission?",
    "🌠 Emittieren mächtige Gammablitze (SGRs)!",
    "🚀 Beeinflussen ihre Umgebung mit Magnetwellen!",
    "📊 Tipp: 'Magnetar'-Modus zeigt Umgebungseinflüsse",
    "🌍 Entstehen aus kollabierten Neutronensternen!",
    "💥 Sieh dir ihre relativistischen Materiejets an!",
    "🌡️ Temperatur: Über Millionen Kelvin!",
    "🔄 Erschaffe Planetensysteme um Magnetare!",
    "✨ Wichtig für Magnethydrodynamik und Sternentwicklung!",
    "🌌 Können mit Pulsaren assoziiert sein!",
    "💫 Herausforderung: Erschaffe einen mit extremem Magnetfeld!",
    "📈 Masse: 1.4-2.16 Sonnenmassen!",
    "🌠 Aktiviere 'Magneteffekte' für Umgebungsanalyse",
    "🚀 Forschungsmission zu einem Magnetar?",
    "🔭 Untersuche ihren Einfluss auf Galaxienbildung!",
    "💥 Magnetischste Objekte im bekannten Universum!",
    "✨ Mehr über Entstehung und Entwicklung lernen?"
],
"Quarkstern": [
    "🌌 Quarksterne sind theoretische Überreste von Neutronensternen!",
    "✨ Möchtest du jetzt einen Quarkstern erschaffen?",
    "💫 Bestehen aus Quarks und Gluonen - exotische Materie!",
    "🔭 Simulieren wir ihre extreme Dichte?",
    "🌠 Noch dichter als Neutronensterne!",
    "🚀 Hypothetisch - nie beobachtet!",
    "📊 Tipp: 'Quarkstern'-Modus zeigt Raumzeiteffekte",
    "🌍 Entstehen bei weiterem Kollaps von Neutronensternen!",
    "💥 Sieh dir ihre intensive Strahlungsemission an!",
    "🌡️ Theoretische Temperatur - strukturabhängig!",
    "🔄 Erschaffe Planetensysteme um Quarksterne!",
    "✨ Wichtig für Teilchenphysik unter Extrembedingungen!",
    "🌌 Haben einzigartige Eigenschaften durch ihre Zusammensetzung!",
    "💫 Herausforderung: Erschaffe einen und erforsche exotische Eigenschaften!",
    "📈 Keine physikalische Bestätigung existiert!",
    "🌠 Aktiviere 'Exotische Effekte' für Raumverzerrungen",
    "🚀 Durchreise durch einen Quarksternkern?",
    "🔭 Untersuche Raumzeit-Effekte!",
    "💥 Eines der großen Mysterien moderner Astrophysik!",
    "✨ Mehr über Theorie und Implikationen lernen?"
],
};
const contextFollowUps = {
    "default": [
        "✨ Wie fandest du diese kosmische Erklärung?",
        "🚀 Kann ich dir weiterhelfen?",
        "🌌 Faszinierend, nicht wahr? Das Universum ist atemberaubend!",
        "💫 Möchtest du dieses Thema weiter erforschen?",
        "🔭 Ich freue mich, kosmisches Wissen zu teilen!",
        "🪐 Hast du weitere Fragen dazu?",
        "🌟 Wir haben heute etwas Unglaubliches gelernt, oder?",
        "⚡ Das Universum hört nie auf, uns zu überraschen!",
        "🌠 Soll ich einen Aspekt genauer erklären?",
        "🌀 Wollen wir jetzt etwas zusammen erschaffen?",
        "📡 Deine Neugier ist der Treibstoff der Entdeckung!",
        "🌍 Was fasziniert dich am meisten am Kosmos?",
        "☄️ Bist du bereit für deine nächste Sternenfrage?",
        "🛸 Denk daran: Jede Frage ist eine kosmische Reise!",
        "💥 Möchtest du ein praktisches Experiment versuchen?",
        "⏳ Wissen ist die wahre Zeitreise!",
        "📊 Soll ich dir zeigen, wie du das im Spiel anwendest?",
        "🌡️ Deine Fragen heizen meinen KI-Kern auf!",
        "🔢 Wollen wir etwas zusammen berechnen?",
        "🌈 Das Universum dankt dir für deine Neugier!"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
affirmativeResponses: ["ja", "j", "yes", "y", "klar", "sicher", "ok", "los", "gerne", "bitte"],
negativeResponses: ["nein", "n", "no", "negativ", "nope", "vielleicht später", "jetzt nicht"],
    
    positiveResponses: {
        "Schwarzes Loch": [
            "🌌 Lass uns simulieren! Erstelle zuerst einen Stern mit 1e30 Massen in der Nähe eines Schwarzen Lochs...",
            "💥 Großartig! Ziehe einen Stern in die Akkretionsscheibe und aktiviere Zeitlupe für das Spektakel",
            "⚠️ Achtung: Aktiviere 'Relativistische Effekte' in Optionen > Physik, um Raumzeitverzerrung zu sehen",
            "🔥 Tipp: Nutze Sterne mit >20 Sonnenmassen für dramatischere Materieauswürfe",
            "🕳️ Schritt-für-Schritt: 1) Schwarzes Loch erstellen 2) Stern hinzufügen 3) Gravitation auf 200% erhöhen",
            "⏱️ Beschleunige Zeit auf 10000x, um den Prozess in Sekunden zu sehen",
            "📡 Vergiss nicht 'Thermische Zonen' zu aktivieren für überhitztes Plasma (>1 Million °C)",
            "🌀 Fakt: Der Prozess kann Stunden bis Millionen Jahre in Realzeit dauern",
            "💫 Für spektakuläre Effekte nutze supermassereiche Schwarze Löcher (>1e15 Massen)",
            "🌠 Experimentiere mit verschiedenen Anflugwinkeln für unterschiedliche Scheibenmuster"
        ],
        "Komet": [
            "☄️ Los geht's! Wähle 'Himmelskörper erstellen' > 'Komet' und stelle Temperatur auf -70°C ein...",
            "💧 Tipp: Kometen mit hohem Wassergehalt (>60%) erzeugen hellere Schweife",
            "🚀 Ziehe mit der Maus, um Winkelgeschwindigkeit einzustellen - beeinflusst die Kernrotation",
            "❄️ Für Sublimationseffekte nähere den Kometen einem O- oder B-Stern",
            "🌌 Experimentiere mit Exzentrizitäten >0.9 für langgestreckte Umlaufbahnen",
            "⏱️ Nutze 100000x Modus für mehrere Umläufe in kurzer Zeit",
            "🔭 Aktiviere 'Vektoren anzeigen' für Gravitationskräftevisualisierung",
            "🌠 Fakt: Jede Sternpassage reduziert die Kometenmasse um 0.01%",
            "🪐 Versuche einen Kometen mit virtuellem Jupiter einzufangen - Masse > 1e27 Einheiten",
            "📈 Profi-Tipp: Kometen in 2:1-Resonanz mit Planeten haben stabile Umlaufbahnen"
        ],
        "Schwerkraft": [
            "⚖️ Lass uns experimentieren! Gehe zu Menü > Physik > Gravitationskonstante...",
            "🌌 Versuche 10% für Nebelsimulationen oder 300% für dichte Sternsysteme",
            "💥 Vorsicht: Werte >500% können Systeme destabilisieren",
            "🔄 Tipp: Binärsysteme mit hoher Gravitation entwickeln sich schneller",
            "🪐 Für Gravitationswellen erzeuge zwei nahe Schwarze Löcher",
            "🌠 Aktiviere 'Kraftfeldvisualisierung' (F3) für Gravitationsfelder",
            "📉 Reduziere Gravitation während Planetenmigration",
            "🌀 Interessant: Hohe Gravitation + schnelle Rotation erzeugt abgeflachte Planeten",
            "🔭 Merke: Schwarze Löcher haben festen 1000x Gravitationsmultiplikator",
            "💫 Herausforderung: Erzeuge stabiles System mit 20 Körpern bei 200% Gravitation"
        ],
        "Stern": [
            "⭐ Lass uns kreieren! Wähle 'Sternkörper' und Typ...",
            "🌞 Sonnenähnlicher Stern: Masse ~1.989e30 kg (1 Sonnenmasse)",
            "💥 Tipp: Sterne >20 Sonnenmassen explodieren als Supernovae",
            "🌈 Stell Temperatur auf >30,000K für intensive blaue Sterne",
            "🔄 Experimentiere mit Doppelsternen und Massentransfer",
            "🌌 Hohe Metallizität für Population-I-Sterne (jung)",
            "⏱️ Beschleunige Zeit für vollständige Sternentwicklung",
            "⚠️ Achtung: Sterne >100 Sonnenmassen sind instabil",
            "🔭 Aktiviere 'Sternentwicklung' in Optionen für Transformationen",
            "🌠 Für Neutronensterne erzeuge Supernovae mit >1.4 Sonnenmassen"
        ],
        "Planet": [
            "🪐 Los geht's! Menü 'Planetare Körper' > Typ wählen...",
            "🌍 Für bewohnbare Planeten: Position in grüner Zone, Wasser 50%, Atmosphäre 80%",
            "🌋 Experimentiere mit extremen Zusammensetzungen: Kohlenstoff- oder Eisenplaneten",
            "🌀 Stell Rotationsperiode ein für Klima- und Formeffekte",
            "💫 Tipp: Gasplaneten benötigen Masse >105K Einheiten",
            "🌌 Erzeuge Systeme mit aktivierter Planetenmigration",
            "🌠 Für Planetenringe stelle Dicke und Dichte ein",
            "⚠️ Zu nahe Monde zerfallen in der Roche-Grenze",
            "🔭 Nutze 'Observatoriumsmodus' (O) für Oberflächendetails",
            "🌡️ Extreme Temperaturen für automatische Klassenänderungen testen"
        ],
        "Meteoroid": [
            "🌠 Erzeuge einen Meteoroid! Wähle 'Himmelskörper erstellen' > 'Meteoroid'...",
            "💫 Tipp: Dichte anpassen für unterschiedliche Einschlagseffekte",
            "🪨 Nutze Zeitlupe für Atmosphäreneintrittsbeobachtung",
            "⚠️ Achtung: Große Meteoroiden (>100m) können Massenaussterben verursachen",
            "🌌 Experimentiere mit Zusammensetzungen: metallisch, felsig, eisig",
            "🔭 Aktiviere 'Einschlagtrajektorie' für Kollisionsvorhersagen",
            "📈 Beschleunige Zeit für Meteorschauer-Simulationen",
            "🌠 Fakt: Meteoroiden sind Fragmente von Asteroiden oder Kometen",
            "💥 Für Explosionen stelle Eintrittsgeschwindigkeit >20 km/s ein",
            "🌀 Herausforderung: Erzeuge System mit 10 kollidierenden Meteoroiden"
        ],
        "Meteor": [
            "🌠 Erzeuge einen Meteor! Wähle 'Himmelskörper erstellen' > 'Meteor'...",
            "💫 Tipp: Dichte anpassen für unterschiedliche Leuchterscheinungen",
            "🪨 Nutze Zeitlupe für Eintrittsbeobachtung in Atmosphären",
            "⚠️ Achtung: Große Objekte können erhebliche Schäden verursachen",
            "🌌 Experimentiere mit verschiedenen Materialkompositionen",
            "🔭 Aktiviere 'Kollisionsvorhersage' für Einschlagsimulationen",
            "📈 Zeitbeschleunigung für Meteorschauer-Visualisierung",
            "🌠 Fakt: Meteore verglühen in Atmosphären",
            "💥 Für Feuerbälle: Geschwindigkeit >20 km/s einstellen",
            "🌀 Herausforderung: Simuliere gleichzeitigen Eintritt von 10 Meteoroiden"
        ],
        "Gasplanet": [
            "🌌 Erzeuge Gasplaneten! Wähle 'Himmelskörper erstellen' > 'Gasplanet'...",
            "💫 Tipp: Masse anpassen für atmosphärische Effekte",
            "🌀 Nutze Zeitlupe für Sturmbeobachtungen",
            "⚠️ Achtung: Sehr massive Gasplaneten (>10x Jupiter) werden zu Braunen Zwergen",
            "🌠 Experimentiere mit Atmosphären: Wasserstoff, Helium, Methan",
            "🔭 Aktiviere 'Planetenringe' für zusätzliche Strukturen",
            "📈 Beschleunige Zeit für atmosphärische Entwicklung",
            "🌌 Fakt: Jupiter hat seit Jahrhunderten einen Sturm größer als die Erde!",
            "💥 Für Polarlichter stelle Magnetfeldstärke ein",
            "🪐 Herausforderung: Erzeuge System mit 5 Gasplaneten um einen Stern"
        ],
        "Asteroid": [
            "🪨 Erzeuge Asteroiden! Wähle 'Himmelskörper erstellen' > 'Asteroid'...",
            "🌌 Tipp: Dichte für felsige Zusammensetzungen anpassen",
            "💫 Nutze Zeitlupe für Planetenkollisionen",
            "⚠️ Achtung: Große Asteroiden (>1 km) können verheerend wirken",
            "🌠 Experimentiere mit Umlaufbahnen: elliptisch, kreisförmig, geneigt",
            "🔭 Aktiviere 'Einschlagvorhersage' für Kollisionssimulationen",
            "📈 Zeitbeschleunigung für Asteroidenmigrationsstudien",
            "🌀 Fakt: Der Asteroidengürtel enthält Millionen von Objekten!",
            "💥 Für Impaktkrater: Geschwindigkeit >20 km/s einstellen",
            "🌌 Herausforderung: Simuliere 10 gleichzeitige Asteroidenkollisionen"
        ],
        "Planetoid": [
            "🪐 Erzeuge Planetoiden! Wähle 'Himmelskörper erstellen' > 'Planetoid'...",
            "🌌 Tipp: Masse für geologische Eigenschaften anpassen",
            "💫 Nutze Zeitlupe für Rotations- und Tektonikstudien",
            "⚠️ Achtung: Sehr massive Planetoiden werden zu Zwergplaneten",
            "🌠 Experimentiere mit Zusammensetzungen: Eis, Gestein, Metall",
            "🔭 Aktiviere 'Planetenringe' für zusätzliche Merkmale",
            "📈 Beschleunige Zeit für geologische Entwicklung",
            "🌀 Fakt: Pluto wird als Planetoid klassifiziert!",
            "💥 Für Impakte: Geschwindigkeit >10 km/s einstellen",
            "🌌 Herausforderung: Erzeuge System mit 5 Planetoiden um einen Stern"
        ],
        "Wurmloch": [
            "🌀 Erzeuge Wurmlöcher! Wähle 'Himmelskörper erstellen' > 'Wurmloch'...",
            "🌌 Tipp: Negative Masse für Raumzeitverzerrungen anpassen",
            "💫 Nutze Zeitlupe für Raumkrümmungseffekte",
            "⚠️ Achtung: Wurmlöcher sind theoretisch und instabil",
            "🌠 Experimentiere mit Ein- und Ausgangspunkten",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Wurmlöcher könnten ferne Universumsregionen verbinden!",
            "💥 Für Sofortreisen stelle Entfernung zwischen Punkten ein",
            "🌌 Herausforderung: Verbinde 3 Galaxien mit Wurmlöchern"
        ],
        "Habitable Zone": [
            "🌍 Erzeuge habitable Zonen! Wähle 'Himmelskörper erstellen' > 'Habitable Zone'...",
            "💫 Tipp: Entfernung zum Stern für verschiedene Zonen anpassen",
            "🌌 Nutze Zeitlupe für Atmosphärenentwicklung",
            "⚠️ Achtung: Zu nahe Zonen haben hohe Strahlung",
            "🌠 Experimentiere mit Atmosphären: Sauerstoff, Stickstoff, Wasserdampf",
            "🔭 Aktiviere 'Klimaeffekte' für Wetterphänomene",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Die Erde ist seit Milliarden Jahren in der habitablen Zone!",
            "💥 Für Lebenssimulation: Temperatur zwischen 0°C-100°C einstellen",
            "🌌 Herausforderung: Erzeuge System mit 5 habitablen Zonen um einen Stern"
        ],
        "Quasar": [
            "🌌 Erzeuge Quasare! Wähle 'Himmelskörper erstellen' > 'Quasar'...",
            "💫 Tipp: Masse für Galaxienkontrolle anpassen",
            "🌠 Nutze Zeitlupe für Strahlungsemission",
            "⚠️ Achtung: Quasare können ganze Galaxien überstrahlen",
            "🌟 Experimentiere mit Akkretionsscheibenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Quasare sind die leuchtstärksten Objekte im Universum!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit der Scheibe anpassen",
            "🌌 Herausforderung: Verbinde 3 ferne Galaxien mit Quasaren"
        ],
        "Brauner Zwerg": [
            "🌌 Erzeuge Braune Zwerge! Wähle 'Himmelskörper erstellen' > 'Brauner Zwerg'...",
            "💫 Tipp: Masse für atmosphärische Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Wasserstoff-Helium-Fusion",
            "⚠️ Achtung: Braune Zwerge sind Stern-Planet-Hybride",
            "🌟 Experimentiere mit Atmosphären: Methan, Wasser, Ammoniak",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Braune Zwerge haben keine stabile Kernfusion!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Braunen Zwergen um einen Stern"
        ],
        "Roter Zwerg": [
            "🌌 Erzeuge Rote Zwerge! Wähle 'Himmelskörper erstellen' > 'Roter Zwerg'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Rote Zwerge sind die häufigsten Sterne",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Rote Zwerge können Billionen Jahre leben!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 5 Roten Zwergen um einen Stern"
        ],
        "Riesenstern": [
            "🌌 Erzeuge Riesensterne! Wähle 'Himmelskörper erstellen' > 'Riesenstern'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Riesensterne werden oft zu Supernovae",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Riesensterne können 1000x größer als die Sonne sein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Riesensternen um einen Stern"
        ],
        "Hyperriese": [
            "🌌 Erzeuge Hyperriesen! Wähle 'Himmelskörper erstellen' > 'Hyperriese'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Hyperriesen werden zu Supernovae",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Hyperriesen können 1000x größer als die Sonne sein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Hyperriesen um einen Stern"
        ],
        "Massereicher Stern": [
            "🌌 Erzeuge massereiche Sterne! Wähle 'Himmelskörper erstellen' > 'Massereicher Stern'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Massereiche Sterne werden zu Supernovae",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Massereiche Sterne können 100x größer als die Sonne sein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 massereichen Sternen um einen Stern"
        ],
        "Hipermassiver Stern": [
            "🌌 Erzeuge hipermassive Sterne! Wähle 'Himmelskörper erstellen' > 'Hipermassiver Stern'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Hipermassive Sterne werden zu Supernovae",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Hipermassive Sterne können 1000x größer als die Sonne sein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 hipermassiven Sternen um einen Stern"
        ],
        "Weißer Zwerg": [
            "🌌 Erzeuge Weiße Zwerge! Wähle 'Himmelskörper erstellen' > 'Weißer Zwerg'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Weiße Zwerge sind Sternenüberreste",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Weiße Zwerge sind extrem dicht und klein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Weißen Zwergen um einen Stern"
        ],
        "Heliumweißer Zwerg": [
            "🌌 Erzeuge Heliumweiße Zwerge! Wähle 'Himmelskörper erstellen' > 'Heliumweißer Zwerg'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Helium-Kohlenstoff-Sauerstoff-Fusion",
            "⚠️ Achtung: Heliumweiße Zwerge sind Sternenüberreste",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Heliumweiße Zwerge sind extrem dicht und klein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Heliumweißen Zwergen um einen Stern"
        ],
        "Kohlenstoffweißer Zwerg": [
            "🌌 Erzeuge Kohlenstoffweiße Zwerge! Wähle 'Himmelskörper erstellen' > 'Kohlenstoffweißer Zwerg'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Kohlenstoff-Sauerstoff-Stickstoff-Fusion",
            "⚠️ Achtung: Kohlenstoffweiße Zwerge sind Sternenüberreste",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Kohlenstoffweiße Zwerge sind extrem dicht und klein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Kohlenstoffweißen Zwergen um einen Stern"
        ],
        "Schwarzer Zwerg": [
            "🌌 Erzeuge Schwarze Zwerge! Wähle 'Himmelskörper erstellen' > 'Schwarzer Zwerg'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Fusionsprozesse",
            "⚠️ Achtung: Schwarze Zwerge sind Sternenüberreste",
            "🌟 Experimentiere mit Atmosphärenzusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Schwarze Zwerge sind extrem dicht und klein!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Schwarzen Zwergen um einen Stern"
        ],
        "Neutronenstern": [
            "🌌 Erzeuge Neutronensterne! Wähle 'Himmelskörper erstellen' > 'Neutronenstern'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Materieprozesse",
            "⚠️ Achtung: Neutronensterne sind extrem dicht",
            "🌟 Experimentiere mit Zusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Neutronensterne können sich 1000x pro Sekunde drehen!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Neutronensternen um einen Stern"
        ],
        "Magnetar": [
            "🌌 Erzeuge Magnetare! Wähle 'Himmelskörper erstellen' > 'Magnetar'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Materieprozesse",
            "⚠️ Achtung: Magnetare sind extrem dicht",
            "🌟 Experimentiere mit Zusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Magnetarfelder sind Billionen mal stärker als auf der Erde!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Magnetaren um einen Stern"
        ],
        "Quarkstern": [
            "🌌 Erzeuge Quarksterne! Wähle 'Himmelskörper erstellen' > 'Quarkstern'...",
            "💫 Tipp: Masse für Eigenschaften anpassen",
            "🌠 Nutze Zeitlupe für Quarkprozesse",
            "⚠️ Achtung: Quarksterne sind extrem dicht",
            "🌟 Experimentiere mit Zusammensetzungen",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Quarksterne haben höhere Dichte als Neutronensterne!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 Quarksternen um einen Stern"
        ],
        "Weltraumstaub": [
            "🌌 Erzeuge Weltraumstaub! Wähle 'Himmelskörper erstellen' > 'Weltraumstaub'...",
            "💫 Tipp: Dichte für Zusammensetzungen anpassen",
            "🌠 Nutze Zeitlupe für Wolkenbildung",
            "⚠️ Achtung: Staub kann zu Planetesimalen verklumpen",
            "🌟 Experimentiere mit Materialien: Silikat, Kohlenstoff, Eis",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Weltraumstaub ist fundamental für Sternen- und Planetenbildung!",
            "💥 Für Kollisionen: Stoßgeschwindigkeit zwischen Partikeln einstellen",
            "🌌 Herausforderung: Erzeuge System mit 5 interagierenden Staubwolken"
        ],
        "Nebel": [
            "🌌 Erzeuge Nebel! Wähle 'Himmelskörper erstellen' > 'Nebel'...",
            "💫 Tipp: Dichte für Gas-Staub-Verhältnisse anpassen",
            "🌠 Nutze Zeitlupe für Sternentstehungsprozesse",
            "⚠️ Achtung: Nebel sind Sternentstehungsregionen",
            "🌟 Experimentiere mit Zusammensetzungen: Wasserstoff, Helium, Kohlenstoff",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Nebel recyceln stellare Materialien!",
            "💥 Für Expansion: Ausbreitungsgeschwindigkeit anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 interagierenden Nebeln"
        ],
        "Singularität": [   
            "🌌 Erzeuge Singularitäten! Wähle 'Himmelskörper erstellen' > 'Singularität'...",
            "💫 Tipp: Masse für Gravitationseffekte anpassen",
            "🌠 Nutze Zeitlupe für Raumzeitverzerrungen",
            "⚠️ Achtung: Singularitäten haben unendliche Dichte",
            "🌟 Experimentiere mit Materietypen: normal, exotisch",
            "🔭 Aktiviere 'Relativistische Effekte' für Lichtbeugung",
            "📈 Beschleunige Zeit für Entwicklungssimulationen",
            "🌀 Fakt: Singularitäten sind theoretisch und nicht direkt beobachtbar!",
            "💥 Für Jet-Ströme: Rotationsgeschwindigkeit der Scheibe anpassen",
            "🌌 Herausforderung: Erzeuge System mit 3 interagierenden Singularitäten"
        ],
        "default": [
            "🚀 Lass uns gemeinsam forschen! Was genau möchtest du erschaffen?",
            "🌌 Ich führe dich Schritt-für-Schritt durch die kosmische Simulation!",
            "💫 Ausgezeichnet! Beginne mit dem entsprechenden Menü zur Himmelskörpererstellung",
            "🔭 Lass uns detaillieren: Welchen Parameter möchtest du zuerst anpassen?",
            "🪐 Erster Schritt: Öffne das Erstellungsmenü unten rechts",
            "🌠 Starte mit Standardwerten und passe dann schrittweise an",
            "⚡ Für beste Ergebnisse aktiviere 'Maximale Präzision' in Optionen > Physik",
            "📊 Soll ich ein praktisches Beispiel zeigen?",
            "🌀 Lass uns mit den Grundkomponenten deines Systems beginnen",
            "✨ Gib jederzeit 'Hilfe' ein für Erstellungsoptionen"
        ],
    },
    
    negativeResponses: {
        "Schwarzes Loch": [
            "🕳️ Kein Problem! Schwarze Löcher können warten...",
            "🌌 Alles klar, diese kosmischen Monster werden nicht fliehen!",
            "💫 Wenn du Materie spaghettifizieren sehen willst, bin ich hier!",
            "⚠️ Vorsicht ist besser! Halte Abstand von diesen kosmischen Verschlingern",
            "🔭 Wie wäre es mit Neutronensternen? Ebenso faszinierend!",
            "🌠 Wusstest du? Das kleinste bekannte Schwarze Loch hat nur 3.8 Sonnenmassen!",
            "🌀 Supermassereiche Schwarze Löcher können Milliarden Sonnenmassen haben!",
            "💥 Denk dran: Nichts entkommt jenseits des Ereignishorizonts!",
            "⏳ Eines Tages werden sogar Schwarze Löcher durch Hawking-Strahlung verdampfen",
            "✨ Tippe 'Schwarzes Loch', wenn du bereit bist"
        ],
        "Komet": [
            "☄️ Kein Problem! Kometen können in ihrer Oortschen Wolke warten...",
            "❄️ Alles klar, diese eisigen Reisenden schmelzen nicht so schnell!",
            "🌠 Ich bin bereit, wenn du einen Meteorschauer erschaffen willst",
            "💫 Manche Kometen haben Umlaufbahnen von Millionen Jahren!",
            "🚀 Der Komet Hale-Bopp war 18 Monate lang mit bloßem Auge sichtbar!",
            "🌌 Interstellare Kometen wie Borisov kommen aus anderen Sternsystemen!",
            "⏱️ Die Rosetta-Sonde umkreiste Komet Tschurjumow-Gerassimenko 2 Jahre!",
            "🔭 Der Komet Halley hat einen 15km langen, dunklen Kern!",
            "💧 Kometen enthalten schweres Wasser in anderer Zusammensetzung als irdische Ozeane",
            "✨ Tippe 'Komet', um diese kosmischen Boten zu erkunden"
        ],
        "Gravitation": [
            "⚖️ Kein Problem! Die Gravitation kann warten...",
            "🌌 Alles klar, Einstein wäre nicht enttäuscht!",
            "💫 Ich bin hier, wenn du die Raumzeit krümmen willst!",
            "🌀 Gravitation ist 10^36 mal schwächer als elektromagnetische Kraft!",
            "🌠 Auf Neutronensternen ist sie 200 Milliarden mal stärker als auf der Erde!",
            "🪐 Jupiters Gravitation ist 2.5x stärker und lenkt Kometen ab!",
            "⏱️ Sie bewegt sich mit Lichtgeschwindigkeit - bei verschwundener Sonne spüren wir es nach 8 Minuten!",
            "💥 Nur in Schwarzen Löchern besiegt Gravitation alle anderen Kräfte",
            "🔭 2015 bestätigten Gravitationswellen Einsteins Vorhersage von 1916!",
            "✨ Tippe 'Gravitation', um diese kosmische Urkraft zu erkunden"
        ],
        "Stern": [
            "⭐ Kein Problem! Sterne können am Firmament warten...",
            "🌞 Alles klar, diese kosmischen Leuchtfeuer strahlen noch Milliarden Jahre!",
            "💫 Ich bin hier, wenn du eine Supernova erschaffen willst!",
            "🌌 Der nächste Stern, Proxima Centauri, ist 4.24 Lichtjahre entfernt!",
            "🔥 Der Sonnenkern erreicht 15 Millionen °C - genug für Kernfusion!",
            "🌠 Beteigeuze, ein Roter Überriese, ist 1000x größer als die Sonne!",
            "⏱️ Rote Zwerge können Billionen Jahre leben - länger als das aktuelle Universum!",
            "💥 Supernovae können heller leuchten als ganze Galaxien!",
            "🌀 Neutronensterne rotieren bis zu 716 mal pro Sekunde - kosmische Präzisionslichter!",
            "✨ Tippe 'Stern', um diese kosmischen Motoren zu entzünden"
        ],
        "Planet": [
            "🪐 Kein Problem! Planeten setzen ihre Umlaufbahn fort...",
            "🌍 Alles klar, diese fremden Welten werden nicht verschwinden!",
            "💫 Ich bin hier, wenn du eine Wasserwelt erschaffen willst!",
            "🌌 Der nächste Exoplanet, Proxima Centauri b, ist nur 4 Lichtjahre entfernt!",
            "🌡️ Venus ist heißer als Merkur wegen eines außer Kontrolle geratenen Treibhauseffekts!",
            "❄️ Pluto hat 3km hohe Wassereis-Berge!",
            "🛰️ Jupiter hat 79 bekannte Monde - ein Miniatursonnensystem!",
            "💥 Die Erde ist der einzige Planet mit aktiver Plattentektonik!",
            "🌀 Exoplanet WASP-76b hat geschmolzene Eisenregen auf der Nachtseite!",
            "✨ Tippe 'Planet', um neue Welten zu gestalten"
        ],
        "Meteoroid": [
            "🌠 Kein Problem! Meteoroiden setzen ihre kosmische Reise fort...",
            "🪨 Alles klar, diese kosmischen Reisenden verschwinden nicht!",
            "💫 Ich bin hier, wenn du Meteoroiden in Aktion sehen willst!",
            "☄️ Der Tscheljabinsk-Meteoroid explodierte mit 30x Hiroshima-Energie!",
            "🌌 Die meisten Meteore sind kleiner als Sandkörner - aber trotzdem beeindruckend!",
            "🔥 Meteoroiden über 25m können erheblichen Schaden anrichten!",
            "🔭 Die Perseiden sind einer der sichtbarsten Meteorschauer - immer spektakulär!",
            "💥 Der Tunguska-Meteoroid verursachte 1908 eine 15-Megatonnen-Explosion!",
            "🌠 Tippe 'Meteoroid', um diese kosmischen Reisenden zu sehen!"
        ],
        "Asteroid": [
            "🪨 Kein Problem! Asteroiden setzen ihre Umlaufbahn fort...",
            "🌌 Alles klar, diese Felsbrocken verschwinden nicht!",
            "💫 Ich bin hier, wenn du Asteroiden in Aktion sehen willst!",
            "☄️ Der Asteroid 16 Psyche besteht hauptsächlich aus Eisen und Nickel - wie ein Planetenkern!",
            "🌠 Vesta ist so groß, dass er mit bloßem Auge sichtbar ist!",
            "🛰️ Bennu hat eine goldfischähnliche Form und wird erforscht!",
            "💥 Apophis wird 2029 nah an der Erde vorbeifliegen - ohne Kollisionsrisiko!",
            "🌌 Der Asteroidengürtel zwischen Mars und Jupiter enthält Millionen Felskörper!",
            "🌠 Tippe 'Asteroid', um diese Bausteine des Sonnensystems zu erkunden!"
        ],
        "Planetoid": [
            "🪐 Kein Problem! Planetoiden setzen ihre Umlaufbahn fort...",
            "🌌 Alles klar, diese kleineren Welten verschwinden nicht!",
            "💫 Ich bin hier, wenn du Planetoiden in Aktion sehen willst!",
            "🌠 Ceres ist der größte Planetoid und hat Wassereis!",
            "🛰️ Pluto wird von vielen Astronomen als Planetoid betrachtet!",
            "💥 Eris ist größer als Pluto und hat eine dünne Stickstoffatmosphäre!",
            "🌌 Planetoiden sind Überreste der Sonnensystementstehung - kosmische Fossilien!",
            "🌠 Tippe 'Planetoid', um diese kleineren Welten zu erkunden!"
        ],
        "Wurmloch": [
            "🌀 Kein Problem! Wurmlöcher können warten...",
            "🌌 Alles klar, diese kosmischen Tunnel verschwinden nicht!",
            "💫 Ich bin hier, wenn du Wurmlöcher sehen willst!",
            "⚠️ Achtung: Wurmlöcher sind theoretisch und instabil",
            "🌠 Sie könnten weit entfernte Punkte des Universums verbinden!",
            "🔭 Theoretisch könnten sie sofortige Reisen ermöglichen!",
            "💥 Denk dran: Nichts entkommt jenseits des Ereignishorizonts!",
            "🌀 Tippe 'Wurmloch', um diese kosmischen Tunnel zu erkunden"
        ],
        "Habitable Zone": [
            "🌍 Kein Problem! Habitable Zonen können warten...",
            "🌌 Alles klar, diese Lebenszonen verschwinden nicht!",
            "💫 Ich bin hier, wenn du Habitable Zonen sehen willst!",
            "🌠 Die Erde ist seit Milliarden Jahren in der habitablen Zone!",
            "🌡️ Sie variiert je nach Stern - faszinierend!",
            "🛰️ Exoplaneten in habitablen Zonen sind Ziele der Lebenssuche!",
            "💥 Leben könnte in extremen Umgebungen existieren!",
            "🌌 Tippe 'Habitable Zone', um diese Lebenszonen zu erkunden"
        ],
        "Quasar": [
            "🌌 Kein Problem! Quasare können warten...",
            "💫 Alles klar, diese kosmischen Leuchtfeuer verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Quasare sehen willst!",
            "🌠 Quasare sind die hellsten Objekte im Universum!",
            "🌀 Sie können relativistische Jets mit nahezu Lichtgeschwindigkeit ausstoßen!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Galaxienentwicklung!",
            "✨ Tippe 'Quasar', um diese Leuchtfeuer zu erkunden"
        ],
        "Brauner Zwerg": [
            "🌌 Kein Problem! Braune Zwerge können warten...",
            "💫 Alles klar, diese Übergangsobjekte verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Braune Zwerge sehen willst!",
            "🌠 Braune Zwerge sind gescheiterte Sterne ohne Kernfusion!",
            "🌀 Ihre Atmosphären sind reich an Methan und Wasser!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Brauner Zwerg', um diese Objekte zu erkunden"
        ],
        "Roter Zwerg": [
            "🌌 Kein Problem! Rote Zwerge können warten...",
            "💫 Alles klar, diese kleinen Sterne verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Rote Zwerge sehen willst!",
            "🌠 Rote Zwerge sind die häufigsten Sterne im Universum!",
            "🌀 Sie können Billionen Jahre leben!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Roter Zwerg', um diese Sterne zu erkunden"
        ],
        "Riesenstern": [
            "🌌 Kein Problem! Riesensterne können warten...",
            "💫 Alles klar, diese kosmischen Kolosse verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Riesensterne sehen willst!",
            "🌠 Riesensterne sind viel größer als die Sonne!",
            "🌀 Manche haben den 1000-fachen Sonnendurchmesser!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Galaxienentwicklung!",
            "✨ Tippe 'Riesenstern', um diese Kolosse zu erkunden"
        ],
        "Hyperriese": [
            "🌌 Kein Problem! Hyperriesen können warten...",
            "💫 Alles klar, diese kosmischen Titanen verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Hyperriesen sehen willst!",
            "🌠 Hyperriesen sind die massereichsten bekannten Sterne!",
            "🌀 Manche haben den 1000-fachen Sonnendurchmesser!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Galaxienentwicklung!",
            "✨ Tippe 'Hyperriese', um diese Titanen zu erkunden"
        ],
        "Massereicher Stern": [
            "🌌 Kein Problem! Massereiche Sterne können warten...",
            "💫 Alles klar, diese kosmischen Kolosse verschwinden nicht!",
            "🚀 Ich bin hier, wenn du massereiche Sterne sehen willst!",
            "🌠 Massereiche Sterne sind viel größer als die Sonne!",
            "🌀 Manche haben den 100-fachen Sonnendurchmesser!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Galaxienentwicklung!",
            "✨ Tippe 'Massereicher Stern', um diese Kolosse zu erkunden"
        ],
        "Hypermassereicher Stern": [
            "🌌 Kein Problem! Hypermassereiche Sterne können warten...",
            "💫 Alles klar, diese kosmischen Titanen verschwinden nicht!",
            "🚀 Ich bin hier, wenn du hypermassereiche Sterne sehen willst!",
            "🌠 Hypermassereiche Sterne sind die größten bekannten Sterne!",
            "🌀 Manche haben den 1000-fachen Sonnendurchmesser!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Galaxienentwicklung!",
            "✨ Tippe 'Hypermassereicher Stern', um diese Titanen zu erkunden"
        ],
        "Weißer Zwerg": [
            "🌌 Kein Problem! Weiße Zwerge können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Weiße Zwerge sehen willst!",
            "🌠 Weiße Zwerge sind Überreste ausgebrannter Sterne!",
            "🌀 Extrem dicht und klein!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Weißer Zwerg', um diese Überreste zu erkunden"
        ],
        "Helium-Weißer Zwerg": [
            "🌌 Kein Problem! Helium-Weiße Zwerge können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Helium-Weiße Zwerge sehen willst!",
            "🌠 Helium-Weiße Zwerge sind Überreste ausgebrannter Sterne!",
            "🌀 Extrem dicht und klein!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Helium-Weißer Zwerg', um diese Überreste zu erkunden"
        ],
        "Kohlenstoff-Weißer Zwerg": [
            "🌌 Kein Problem! Kohlenstoff-Weiße Zwerge können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Kohlenstoff-Weiße Zwerge sehen willst!",
            "🌠 Kohlenstoff-Weiße Zwerge sind Überreste ausgebrannter Sterne!",
            "🌀 Extrem dicht und klein!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Kohlenstoff-Weißer Zwerg', um diese Überreste zu erkunden"
        ],
        "Schwarzer Zwerg": [
            "🌌 Kein Problem! Schwarze Zwerge können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Schwarze Zwerge sehen willst!",
            "🌠 Schwarze Zwerge sind die endgültigen Überreste völlig ausgebrannter Sterne!",
            "🌀 Extrem dicht und klein!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Schwarzer Zwerg', um diese Überreste zu erkunden"
        ],
        "Neutronenstern": [
            "🌌 Kein Problem! Neutronensterne können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Neutronensterne sehen willst!",
            "🌠 Neutronensterne sind extrem dichte Supernova-Überreste!",
            "🌀 Ein Teelöffel Neutronensternmaterial wiegt mehr als die gesamte Menschheit!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Neutronenstern', um diese Überreste zu erkunden"
        ],
        "Magnetar": [
            "🌌 Kein Problem! Magnetare können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Magnetare sehen willst!",
            "🌠 Magnetare sind Neutronensterne mit extrem starken Magnetfeldern!",
            "🌀 Sie können starke Gammastrahlen aussenden!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Magnetar', um diese Überreste zu erkunden"
        ],
        "Quarkstern": [
            "🌌 Kein Problem! Quarksterne können warten...",
            "💫 Alles klar, diese Sternüberreste verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Quarksterne sehen willst!",
            "🌠 Quarksterne sind theoretisch noch dichter als Neutronensterne!",
            "🌀 Sie könnten eine komplexe innere Struktur haben!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Sternentwicklung!",
            "✨ Tippe 'Quarkstern', um diese Überreste zu erkunden"
        ],
        "Weltraumstaub": [
            "🌌 Kein Problem! Weltraumstaub kann warten...",
            "💫 Alles klar, diese kosmischen Partikel verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Weltraumstaub sehen willst!",
            "🌠 Weltraumstaub ist fundamental für Sternen- und Planetenentstehung!",
            "🌀 Er enthält schwere Elemente aus Sternen!",
            "🔭 Sein Licht reiste Milliarden Jahre zu uns!",
            "💥 Er ist entscheidend für die Entwicklung des Universums!",
            "✨ Tippe 'Weltraumstaub', um diese Partikel zu erkunden"
        ],
        "Nebel": [
            "🌌 Kein Problem! Nebel können warten...",
            "💫 Alles klar, diese kosmischen Wolken verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Nebel sehen willst!",
            "🌠 Nebel sind stellare Kinderstuben!",
            "🌀 Manche sind Supernova-Überreste!",
            "🔭 Ihr Licht reiste Milliarden Jahre zu uns!",
            "💥 Sie sind entscheidend für die Entwicklung des Universums!",
            "✨ Tippe 'Nebel', um diese Wolken zu erkunden"
        ],
        "Singularität": [
            "🌌 Kein Problem! Singularitäten können warten...",
            "💫 Alles klar, diese Punkte unendlicher Dichte verschwinden nicht!",
            "🚀 Ich bin hier, wenn du Singularitäten sehen willst!",
            "🌠 Singularitäten sind theoretische Punkte extremer Raumzeitkrümmung!",
            "🌀 Sie könnten im Zentrum von Schwarzen Löchern existieren!"
        ],
        "default": [
            "🌌 Kein Problem! Das Universum ist geduldig...",
            "🚀 Alles klar, die kosmische Erkundung kann warten!",
            "💫 Ich bin hier, wenn du weitermachen willst!",
            "🔭 Es gibt mehr Sterne im Universum als Sandkörner auf allen Stränden der Erde!",
            "🌠 Das Licht von Andromeda verließ die Galaxie, als unsere Vorfahren Höhlenmalereien schufen!",
            "⏱️ 99.9% aller sichtbaren Materie im Universum ist Plasma!",
            "💥 Die Sonne produziert in 1 Sekunde mehr Energie als die Menschheit in ihrer Geschichte!",
            "🌀 Supermassereiche Schwarze Löcher regulieren Galaxienwachstum!",
            "✨ Jedes Sauerstoffatom in deinem Körper wurde im Kern eines Sterns geschmiedet!",
            "🪐 Wir alle bestehen aus Sternenstaub!"
        ],
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
    "🧮 Ergebnis: {expression} = {result}",
    "🔢 Berechnung abgeschlossen: {expression} = {result}",
    "✨ Lösung: {expression} = {result}",
    "⚡ Gelöst: {expression} = {result}",
    "🌌 Kosmische Gleichung: {expression} = {result}",
    "🪐 Sternenmathematik: {expression} = {result}",
    "💫 Gravitationsberechnung: {expression} = {result}",
    "📐 Universelle Geometrie: {expression} = {result}",
    "📊 Numerische Analyse: {expression} = {result}",
    "🔭 Mathematische Beobachtung: {expression} = {result}",
    "🌠 Formel gelöst: {expression} = {result}",
    "🚀 Antriebsberechnung: {expression} = {result}",
    "🛰️ Orbitalergebnis: {expression} = {result}",
    "⏱️ Rechenzeit: 0s | {expression} = {result}",
    "⚖️ Numerisches Gleichgewicht: {expression} = {result}",
    "🌀 Mathematischer Wirbel: {expression} = {result}",
    "🌡️ Rechentemperatur: 0K | {expression} = {result}",
    "📈 Numerische Projektion: {expression} = {result}",
    "📉 Inverse Analyse: {expression} = {result}",
    "🧪 Numerisches Experiment: {expression} = {result}",
    "🔬 Mathematisches Mikroskop: {expression} = {result}",
    "🖥️ Simulierte Quantenberechnung: {expression} = {result}",
    "💻 Algorithmus abgeschlossen: {expression} = {result}",
    "🤖 Roboterberechnung: {expression} = {result}",
    "🌟 Numerische Erleuchtung: {expression} = {result}",
    "🌌 Kosmos gelöst: {expression} = {result}",
    "🧬 Mathematische Genetik: {expression} = {result}",
    "🌠 Astronomische Berechnung: {expression} = {result}",
    "🪐 Astrophysikalische Berechnung: {expression} = {result}",
    "🔭 Mathematisches Teleskop: {expression} = {result}",
    "🌌 Kosmologische Berechnung: {expression} = {result}",
    "🌟 Stern gelöst: {expression} = {result}",
    "🌠 Galaxie berechnet: {expression} = {result}",
    "🛸 Numerische Navigation: {expression} = {result}",
    "🌌 Universum berechnet: {expression} = {result}",
    "🌠 Konstellation gelöst: {expression} = {result}",
    "🪐 Planet berechnet: {expression} = {result}",
    "🌌 Numerischer Nebel: {expression} = {result}",
    "🌠 Supernova gelöst: {expression} = {result}",
    "🛰️ Mathematischer Satellit: {expression} = {result}",
    "🌌 Raumzeit berechnet: {expression} = {result}",
    "🌠 Ereignishorizont gelöst: {expression} = {result}",
    "🌀 Numerische Singularität: {expression} = {result}",
    "🌌 Urknall berechnet: {expression} = {result}",
    "🌠 Kosmische Expansion gelöst: {expression} = {result}",
    "🪐 Planetenring berechnet: {expression} = {result}",
    "🌌 Numerisches Wurmloch: {expression} = {result}",
    "🌠 Milchstraße berechnet: {expression} = {result}",
    "🛸 Numerisches Raumschiff: {expression} = {result}",
    "🌌 Multiversum berechnet: {expression} = {result}",
    "🌠 Paralleldimension gelöst: {expression} = {result}",
    "🪐 Exoplanet berechnet: {expression} = {result}",
    "🌌 Numerischer Asteroid: {expression} = {result}",
    "🌠 Meteorit gelöst: {expression} = {result}",
    "🛰️ Numerische Raumsonde: {expression} = {result}",
    "🌌 Komet berechnet: {expression} = {result}",
    "🌠 Meteoritenschauer gelöst: {expression} = {result}",
    "🪐 Mond berechnet: {expression} = {result}",
    "🌌 Numerisches Sonnensystem: {expression} = {result}",
    "🌠 Planetenbahn gelöst: {expression} = {result}",
    "🛰️ Numerische Raumstation: {expression} = {result}",
    "🌌 Spiralgalaxie berechnet: {expression} = {result}",
    "🌠 Elliptische Galaxie gelöst: {expression} = {result}",
    "🪐 Irreguläre Galaxie berechnet: {expression} = {result}",
    "🌌 Numerischer Quasar: {expression} = {result}",
    "🌠 Pulsar gelöst: {expression} = {result}",
    "🛰 Plasmaball berechnet: {expression} = {result}"
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
            return "🤔 Berechnung nicht möglich. Gültiges Format: '2*(3+5^2)' oder 'sqrt(9)'";
        }
    }
};

 
const greetingsSystem = {
    greetings: ["hallo", "hi", "hey", "moin", "servus", "guten Morgen", "guten Tag", "guten Abend", "Grüße", "na", "Grüß Gott", "hallöchen", "kosmische Grüße", "stellarer Morgen", "Hallo Singularität"],
    
    farewells: ["tschüss", "auf Wiedersehen", "bis bald", "bis später", "ciao", "ade", "beenden", "verlassen", "schließen", "ende", "aus", "abmelden", "Abschied nehmen", "Bis zur Singularität", "Auf Wiedersehen Singularität"],
    
    greetingsResponses: [
        "✨ Hallo, kosmischer Entdecker! Wie kann ich deine Reise durch die Sterne unterstützen?",
        "🚀 Willkommen bei SIU 2D! Bereit, erstaunliche Universen zu erschaffen?",
        "🌌 Interstellare Grüße! Womit kann ich heute helfen?",
        "🪐 Alles klar, Kommandant! Welcher kosmischen Herausforderung stellen wir uns heute?",
        "💫 Gravitationsgruß! Wie kann ich deine Erkundung unterstützen?",
        "🌟 Willkommen, Weltenerschaffer! Was simulieren wir heute?",
        "🌠 Hallo, Sternenreisender! Bereit für ein kosmisches Abenteuer?",
        "🛸 Übertragung empfangen! Wie kann ich deine Weltraummission unterstützen?",
        "🔭 Hallo, virtueller Astronom! Welches kosmische Rätsel lüften wir heute?",
        "⚡ Kosmische Energie fließt! Wie kann ich helfen?",
        "🌀 Willkommenswirbel aktiviert! Was ist dein Befehl?",
        "🌠 Kosmische Strahlen erkannt! Hallo, wie kann ich helfen?",
        "🪐 Perfekte Planetenausrichtung für deine Ankunft! Willkommen!",
        "🌌 Raumkrümmung stabilisiert! Grüße, Entdecker!",
        "🚀 Systeme online! Singularität steht für deine Fragen bereit",
        "🔭 Teleskope fokussiert! Bereit, das Universum zu erkunden?",
        "🌠 Willkommens-Meteorschauer! Wie kann ich unterstützen?",
        "💻 Kosmische KI-Systeme aktiviert! Hallo, Mensch!",
        "🛰️ Kommunikationssatelliten synchronisiert! Verbindung hergestellt!",
        "🌌 Dimensionsportal geöffnet! Willkommen bei SIU 2D!",
        "🌟 Sternbilder für deine Ankunft ausgerichtet! Sei gegrüßt!",
        "⚛️ Kosmische Teilchen vibrieren vor Freude! Hallo!",
        "🌠 Willkommenskomet auf Kurs! Grüße, Reisender!",
        "🪐 Planetenringe schwingen zum Gruß! Willkommen!",
        "✨ Sternenenergie kanalisiert! Singularität steht zu deinen Diensten!"
    ],
    
    farewellResponses: [
        "🌠 Bis zum nächsten Mal, Sternenreisender! Möge deine Reise episch sein!",
        "🛸 Gute Reise durch den Kosmos! Komm wieder bei neuen Fragen!",
        "💫 Übertragung beendet. Denke daran: Das Universum ist dein Spielplatz!",
        "👋 Tschüss! Wenn du ein Schwarzes Loch brauchst, bin ich hier!",
        "🚀 Start bestätigt! Kehre zurück für mehr Weltraumabenteuer!",
        "🌌 Verbindung getrennt... Aber das Universum expandiert weiter!",
        "🪐 Auf Wiedersehen, Kommandant! Mögen wir neue kosmische Horizonte finden!",
        "✨ Mission abgeschlossen! Rückkehr für neue Sternexpeditionen!",
        "🔭 Signal verloren... Doch die Sterne leiten immer deinen Weg!",
        "⚡ Kosmische Energien verabschieden sich! Bis zur nächsten Umlaufbahn!",
        "🌀 Gravitationsfeld deaktiviert! Bis bald, Entdecker!",
        "🌠 Ausflugstrajektorie berechnet! Auf Wiedersehen, Reisender!",
        "🛰️ Satelliten im Standby-Modus! Komm zurück bei Bedarf!",
        "💻 Systeme in kosmischer Ruhephase! Auf Wiedersehen!",
        "🪐 Abschiedsplanetenkonstellation! Gute Reise!",
        "🌌 Dimensionsportal geschlossen! Besuche uns jederzeit wieder!",
        "🌟 Sternbilder leuchten zum Abschied! Bis bald!",
        "⚛️ Kosmische Teilchen entschwinden! Bis zum nächsten Mal!",
        "🌠 Abschiedskomet gesichtet! Sichere Reise!",
        "🔭 Teleskope schwenken ab! Bis zur nächsten Sternenbeobachtung!",
        "💫 Raumkrümmung aufgehoben! Bis zur nächsten Expedition!",
        "🚀 Abschiedsraketen gezündet! Gute Reise durchs All!",
        "🌠 Abschiedsstrahlen erfasst! Auf Wiedersehen!",
        "🛸 Abschiedsfähre im Orbit! Besuche uns bald wieder!",
        "✨ Letzter Sternenimpuls! Trenne Verbindung..."
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
    "🌌 Ich habe das nicht in meiner Sternendatenbank gefunden... Fragen Sie nach 'Kometen', 'schwarzen Löchern' oder 'Steuerungen'!",
    "🛸 Mein Wissen ist kosmisch - versuchen Sie, nach Spielphysik oder Elementen des Universums zu fragen",
    "🔭 Fokus auf den Weltraum! Wie wäre es mit 'Wie erstelle ich einen Nebel?' oder 'Welche Masse für ein schwarzes Loch?'",
    "📡 Signal verloren... Formulieren Sie um über die Erstellung von Himmelskörpern, Sternentwicklung oder Steuerungen des SIU 2D",
    "💫 Möchten Sie etwas berechnen? Verwenden Sie Zahlen und Operatoren wie '3 * 5^2' oder fragen Sie nach kosmischen Begriffen!",
    "🪐 Kosmischer Hinweis: Probieren Sie Begriffe wie 'Schwerkraft', 'Stern', 'Planet' oder 'Evolution'!",
    "⚡ Neue Sternennachricht erkannt! Formulieren Sie als 'Wie erstelle ich einen Quasar?' oder 'Was ist eine habitable Zone?'"
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
        const errorMsg = createMessage('Fehler: Verbindungsfehler. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.', 'error-message');
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