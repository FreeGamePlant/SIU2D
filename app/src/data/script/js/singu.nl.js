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
    "komeet": [
        "☄️ Kometen zijn ijzige lichamen die staarten ontwikkelen in de buurt van sterren! In SIU 2D kun je ze maken in het menu 'Astron maken'",
        "💫 Typische massa van kometen: 0.1-10 eenheden. Boven 300 massa's evolueren ze automatisch naar ijzige planetoïden",
        "🌠 De staart wijst altijd tegen de bewegingsrichting in - simuleert stellaire wind met fysieke nauwkeurigheid",
        "🚀 Tip: Sleep de muis om beginsnelheid in te stellen en voorspelde baan te zien bij het maken van een komeet",
        "❄️ Kometen smelten bij sterren - in het spel worden ze na 50 passages planetoïden",
        "⏱️ In versneld tempo (100000x) zie je een komeetbaan in seconden",
        "🎯 Maak een systeem met meerdere kometen - druk 'C' voor het creatiemenu",
        "📏 Kernradius: R = 0.1 * ∛(massa). Voorbeeld: massa 8 = straal ~0.2 eenheden",
        "🔥 Kometen >5 eenheden/s hebben langere staarten - perfect voor dramatische effecten",
        "🌌 In hoge kwaliteit (Opties > Grafisch) tonen staarten drie lagen: stof (geel), geïoniseerd gas (blauw), natrium (oranje)",
        "🔄 Gebruik gasreuzen als 'zwaartekrachtsslinger' voor baanverandering",
        "⛰️ Uitgeputte kometen worden klasse 2-planetoïden (ijzig) - zichtbaar in astrogeschiedenis",
        "💧 Pas het startpunt van de staart aan via basistemperatuur (> -50°C)",
        "📊 Fysieke data: Dichtheid=0.5 g/cm³, Albedo=0.04 - zichtbaar in geavanceerde modus (Shift+E)",
        "✨ Nieuwe kometen: Actief ~1 miljoen jaar - observeer in universele tijdlijn",
        "🎯 Voor perfecte baan: Beginsnelheid loodrecht op zwaartekrachtlijn - pijlen begeleiden je",
        "🌡️ Staarttemperatuur varieert: kern (1500°C), midden (500°C), punt (100°C)",
        "🔄 Kometen kunnen door planeten worden gevangen - probeer Jupitersysteem met kometenmanen",
        "⏳ In astrotijdpaneel (T tijdens bewerken): zie resterende passages voor inactiviteit",
        "📈 Gevorderde tip: Kometen met hoge excentriciteit (>0.9) hebben interessantere banen",
        "🌠 Spelcode simuleert massaverlies door sublimatie: ~0.01% per stellaire passage",
        "🔭 In binaire systemen hebben kometen chaotische banen - probeer twee sterren met omlopende kometen",
        "⚠️ Waarschuwing: Kometen op ramkoers met planeten verdampen meestal voor inslag",
        "💧 Kometenwater wordt geregistreerd in planetaire hulpbronnen - zie planetair paneel",
        "🌟 Voor beste resultaten: Maak kometen in 'Kleine lichamen' bij -100°C tot -50°C"
    ],
    
    "zwart gat": [
        "🕳️ Zwarte gaten: Minimale massa 1 biljoen (1e12) eenheden - maak in 'Exotische lichamen'",
        "🌀 Straalberekening: R = ∛(massa)/1000 - vereenvoudigde Schwarzschild-straal",
        "💥 Voed zwarte gaten met materie om groei te zien - probeer nevels of sterren",
        "⏳ Hawking-straling: Verliezen massa - verdampen in 10^67 jaar (versneld gesimuleerd)",
        "📡 Accretieschijf zendt intense hitte uit - gebruik 'Thermische zones' (T) voor 5000°C+ visualisatie",
        "⚡ Getijdenkracht: F = (G * M * m) / r³ * Δr - objecten rekken uit (zichtbaar in Hoge Kwaliteit)",
        "🌌 Zwarte gaten >500 sextiljoen worden quasars - bereik deze mijlpaal voor energiestralen",
        "🔭 Veilige afstand: 10x straal - binnen deze afstand worden objecten direct opgeslokt",
        "🔄 Gebruik als 'zwaartekrachtsslingers' voor energiezuinige banen",
        "💫 In binaire systemen genereren ze zwaartekrachtgolven - activeer in Opties > Fysica > Relativistische effecten",
        "⏱️ 1 seconde bij horizon = ~100 jaar extern - observeer met versnelde tijd",
        "📈 Verdampingstijd: Getoond in astrotijdpaneel (T tijdens bewerken)",
        "🌠 Voor samensmelting: Plaats twee nabije zwarte gaten en versnel tijd - botsing geeft intense flits",
        "⚠️ Objecten binnen 5x straal ondergaan spaghettificatie - geactiveerd in Hoge Kwaliteit",
        "🔢 Straalberekening voor 1 miljoen zonmassa's: R ≈ 2.95 * (M/1e6) km - spel gebruikt vereenvoudigde eenheden",
        "💥 Bij 1e60 massa's worden het witte gaten - blijf voeden voor transformatie",
        "🌡️ Temperatuur accretieschijf: Instelbaar in bewerkpaneel - standaard 1.000.000°C",
        "🌀 Rotatie: Aanpasbaar in geavanceerd paneel ('Relativistische eigenschappen') - beïnvloedt accretieschijf",
        "📏 Horizondiameter is altijd 2x de weergegeven straal",
        "⚠️ Let op: Zwarte gaten in dichte systemen kunnen snel sterren opslokken - monitor via tijdlijn",
        "🔭 Gebruik observatiemodus (O) voor zwaartekrachtlenzen - vervormt sterlicht erachter",
        "💫 Quasars (evolutiefase) zenden energiestralen uit - richting instelbaar in bewerkpaneel",
        "⏳ Superzware zwarte gaten: Verdampingstijd overschrijdt huidige leeftijd van het speluniversum",
        "🌌 Tip: Maak binair systeem met zwart gat en ster voor real-time massaoverdracht",
        "✨ Voor complete ervaring: Activeer achtergrondmuziek 'Singularity' in Opties > Audio"
    ],
    
    "zwaartekracht": [
        "⚖️ Globale aanpassing: 0-500% in Menu > Fysica > Zwaartekrachtconstante",
        "📏 Standaard G: 6.67430e-11 N·m²/kg² - aanpasbaar voor alternatieve universa",
        "🌀 Zwarte gaten hebben vaste 1000x zwaartekrachtvermenigvuldiger voor relativistische effecten",
        "🪐 Getijdenkracht: Δg = (2GM/R³) * Δr - vervormt manen (zichtbaar in Hoge Kwaliteit)",
        "📈 Elke extra 100% zwaartekracht versnelt systemen ~15% - nuttig voor snelle simulaties",
        "🌌 Zwaartekrachtgolven: Geactiveerd in Opties > Fysica > Geavanceerde effecten",
        "🔄 Optimale omloopsnelheid: v = √(GM/r) - getoond tijdens creatie met begeleidende pijlen",
        "⚙️ Verminder tot 10-50% voor nevelsimulaties, verhoog tot 200-500% voor dichte systemen",
        "🔭 Zwaartekrachtlenseffect: Zichtbaar bij zwarte gaten - activeer in Grafisch > Speciale effecten",
        "📊 Maximale stabiliteit: 0.5 * √N lichamen (bijv. 100 lichamen → ~7 stabiel)",
        "⏳ Hoge zwaartekracht versnelt stellaire evolutie - sterren leven korter",
        "🌠 Fusiedrempel bij botsingen: Ec < |Ep| (kinetische < potentiële energie)",
        "🧮 Geïmplementeerde formule: F = G * m1 * m2 / r² - testbaar met 'Toon krachten' (F3)",
        "🔢 Voor dubbele zwaartekracht: Verhoog G met 100% of massa's met 100%",
        "⚠️ Waarden >300% veroorzaken instabiliteit bij >50 lichamen - gebruik voorzichtig",
        "🌍 Oppervlaktezwaartekracht: g = GM/R² - zichtbaar in planetaire paneel voor rotslichamen",
        "💫 Spel gebruikt Verlet-integratie voor precieze baanberekeningen",
        "📈 Bij massieve lichamen beïnvloedt zwaartekracht rotatie - planeten worden getijdenvergrendeld",
        "🌀 Sterke zwaartekrachtsvelden vertragen tijd - observeerbaar via klokvergelijking op verschillende hoogtes",
        "⚡ Donkere materie simuleren: Verhoog zwaartekracht met 30-50% zonder zichtbare massa",
        "🔭 Numerieke precisie is hoger bij grote massa's - spel gebruikt adaptief coördinatensysteem",
        "🌌 Ruimtetijdkromming: Visueel gesimuleerd bij compacte objecten",
        "📏 Roche-limiet: Automatisch berekend - manen fragmenteren binnen deze zone",
        "💥 Bij botsingen bepaalt zwaartekracht vrijgekomen energie: E ∝ M²/R voor directe inslagen",
        "✨ Tip: Voor stabiele banen: beginsnelheid ≈80% van lokale ontsnappingssnelheid"
    ],
    
    "ster": [
        "⭐ Minimale massa: 15 miljoen eenheden - maak in 'Stellaire lichamen'",
        "🌞 Zonachtige ster: massa ~1.989e30 kg (1 zonmassa in spel)",
        "🌈 Kleuren op temperatuur: Blauw (>30.000K), Wit (10.000K), Geel (6.000K), Rood (<3.500K)",
        "💥 Sterren >20 zonmassa's exploderen als supernova - activeer 'Stellaire evolutie'",
        "⏳ Levensduur: t ≈ 10^10 * (M/M☉)^-2.5 jaar - zichtbaar in astrotijdpaneel (T tijdens bewerken)",
        "🔄 Maak binaire systemen voor fascinerende banen",
        "🔭 Variabele sterren: Lichtsterkte aanpasbaar in 'Stellaire eigenschappen'",
        "🌡️ Leefbare zone: d = √(L/L☉) AE - getoond als groene ring bij selectie",
        "💫 Kernfusie gesimuleerd: H → He met 0.7% efficiëntie (E=mc²)",
        "📊 Evolutie: Rode dwerg → Witte dwerg | Middelster → Rode reus | Massieve ster → Supernova → Zwart gat",
        "⚙️ Aanpasbaar: Massa, temperatuur, rotatie, metallicity, magnetische activiteit",
        "✨ Neutronensterren vereisen >1.4 zonmassa's - maak via supernova's",
        "🌌 Sterrenhopen: Maak meerdere sterren in klein gebied ('Complexe systemen' menu)",
        "🧪 Pas zwaartekrachtconstante aan voor evolutie-effecten",
        "🔢 Lichtkracht: L ∝ M^3.5 - ster van 2x massa is ~11x helderder",
        "⚠️ Zeer massieve sterren (>100 zonmassa's) zijn instabiel - splitsen of exploderen vroegtijdig",
        "🌠 T Tauri-sterren (jong) vertonen massa-uitstoting - zichtbaar als zonnevlammen in Hoge Kwaliteit",
        "💥 Bij supernova's: 90% massa uitgestoten als nevel - rest vormt neutronenster of zwart gat",
        "📈 Straal: R ∝ M^0.8 voor hoofdreekssterren - automatisch berekend",
        "🌍 Planeten in leefbare zone kunnen leven ontwikkelen - groen icoon in planetaire paneel",
        "🔥 Kern bereikt 15 miljoen °C voor fusie - temperatuur beïnvloedt evolutiesnelheid",
        "🌀 Sterke magnetische velden creëren zonnevlekken - intensiteit instelbaar in geavanceerd paneel",
        "🔭 Gebruik zoom (muiswiel) en vertraag tijd voor details",
        "✨ Tip: Binaire sterren kunnen planeten hebben met P-type (rond paar) of S-type banen (rond één ster)"
    ],
    
    "planeet": [
        "🪐 Massa: 5K-30.5K (rots), 105K-2.5M (gas) - maak in 'Planetaire lichamen'",
        "🌍 Klassen: Rots (1-11), Gas (1-6), Dwerg - automatisch toegewezen op massa/temperatuur",
        "🌡️ Leefbare zone: d = √(L_ster / L☉) AE - groene ring rond sterren",
        "🔄 Optimale omloopsnelheid: v = √(GM/r) - pas aan tijdens creatie",
        "🌋 Vulkanische planeten: temperatuur >1000°C + laag water/atmosfeer - automatisch klasse 7",
        "❄️ IJswerelden: temperatuur < -100°C + hoog water - worden automatisch klasse 9",
        "🌫️ Atmosfeerdikte: Regel met gas-schuifregelaar (0-100%) - beïnvloedt temperatuur en druk",
        "💧 Oppervlaktewater: Regel met water-schuifregelaar - ideaal 30-70% voor leefbare werelden",
        "🔭 Manen vertonen libratie - subtiel effect in Hoge Kwaliteit",
        "🛰️ Maximaal 20 manen per planeet - stabiel tot 10% planetaire massa",
        "⏱️ Planetaire migratie in jonge systemen - activeer in Fysica > Geavanceerde effecten",
        "📏 Straal: ∛(massa) voor rots, ∛(massa/2) voor gas - automatisch berekend",
        "🌌 Speciale typen: Koolstof (hoog C/O), IJzer (blootgestelde kern) - creëer met extreme samenstellingen",
        "🧪 Planetaire botsingen creëren nieuwe werelden + asteroïdengordels",
        "🔢 Oppervlaktezwaartekracht: g = GM/R² - getoond in planetaire paneel",
        "💫 Planetaire ringen: Activeer in 'Kenmerken' - pas dikte, kleur en dichtheid aan",
        "🌍 Oceaanplaneten (klasse 2) hebben >90% water - genereren automatisch vochtige atmosfeer",
        "🏜️ Woestijnplaneten (klasse 3) verliezen 80-90% water - zandtextuur",
        "🌱 Leefbare werelden (klasse 6) tonen vegetatie - activeer in Grafisch > Oppervlaktedetails",
        "🌋 Geologische activiteit: Regel met 'Tektoniek' schuifregelaar - beïnvloedt vulkanisme",
        "🌀 Rotatie: Pas rotatieperiode aan - beïnvloedt afplatting en weerpatronen bij gasreuzen",
        "🌌 Exoplaneten: Creëer met ongebruikelijke parameters via 'Geavanceerde aanpassing'",
        "📊 Selecteer planeet en druk E voor gedetailleerde gegevens",
        "✨ Tip: Planeten in baanresonantie (bv. 2:3) behouden langdurige stabiliteit",
        "🔭 Gebruik 'Observatorium' modus (O) voor oppervlaktedetails"
    ],
    "meteoroïde": [
        "🌠 Meteoroïden: Rotsfragmenten kleiner dan asteroïden (1mm-1m) - automatisch gegenereerd bij botsingen",
        "💫 Gemiddelde snelheid: 20-70 km/s - zichtbaar als snelle strepen in real-time modus",
        "🪨 Samenstelling: 90% rots, 6% ijzer, 4% nikkel - ingesteld in fragmentcreatiepaneel",
        "🌌 Creëer via botsingen of 'Kleine lichamen' > 'Genereer fragmenten'",
        "🔥 Worden meteoren bij atmosfeerentry - activeer 'Atmosferen' in Opties > Fysica",
        "📏 Typische massa: 0.1g-100kg - grotere objecten geclassificeerd als asteroïden",
        "💥 Atmosfeer-entry effect: Activeer in Grafisch > Speciale effecten > Vallende sterren",
        "🌍 Voor Aarde: ~100 ton meteoroïden dagelijks - proportioneel gesimuleerd",
        "📊 Gegevens: Dichtheid 3-4 g/cm³, Albedo 0.05-0.25 - instelbaar in eigenschappenpaneel",
        "✨ Tip: Creëer asteroïdengordels voor natuurlijke meteoroïden",
        "⏱️ In versnelde modus (10000x): Constante meteorenregens",
        "🔭 Observatie: Meteoroïden onzichtbaar tot ze meteoren worden",
        "🌠 Meteorenregen: Wanneer planeten kometensporen kruisen - simuleer met 'Gebeurtenissen'",
        "💫 Botsingen met schepen: Verminder schild met 1% per 10kg - activeer in Fysica > Schade",
        "⚠️ Gevaar: Meteoroïden >1kg kunnen satellieten beschadigen - geel waarschuwingsicoon",
        "🌌 Handmatig creëren: 'Fragmenten' menu > Grootte Klein (S)",
        "📈 Frequentie: Aanpasbaar in Menu > Omgeving > Fragmentdichtheid",
        "🛰️ Relatieve snelheid bepaalt inslagenergie: E = 0.5 * m * v²",
        "🌠 Barringerkrater meteoroïde: Slechts 50m diameter",
        "🌟 Visueel effect: Activeer 'Lichtsporen' voor trajecten bij hoge snelheid"
    ],
    "meteoor": [
        "☄️ Meteoren: Meteoroïden die in atmosfeer verbranden - 'vallende sterren' in spel",
        "🔥 Plasma temperatuur: 1,500-3,000°C - zichtbaar als gekleurde vonken",
        "🌈 Kleuren: Groen (magnesium), Geel (natrium), Rood (stikstof) - bepaald door samenstelling",
        "🌍 Om te zien: Verhoog atmosfeerdichtheid > 0.1kg/m³ en voeg meteoroïden toe",
        "💫 Minimumsnelheid: 11km/s voor ontbranding - pas drempel aan",
        "📏 Schijnbare magnitude: -4 tot +5 - gecontroleerd door grootte en snelheid",
        "🌠 Meteorenregens: Configureer in Gebeurtenissen > Meteorenregens met ingesteld radiant",
        "⏱️ Duur: 0.1-10 seconden real-time - proportioneel aan massa",
        "✨ Tip: Gebruik kometen als bron voor periodieke meteorenregens",
        "💥 Boliden: Meteoren > -4 magnitude - activeren explosiegeluid en flits",
        "🌌 Handmatig creëren: 'Gebeurtenissen' > 'Meteoor' op 80-120km hoogte",
        "📊 Frequentie: Instelbaar van 0-100 gebeurtenissen/uur in Opties > Omgeving",
        "🔭 Beste zichtbaarheid: Nacht met heldere hemel - verminder lichtvervuiling",
        "⚠️ Waarschuwing: Meteoren kunnen overleven en meteorieten worden",
        "🌠 Perseïdenregen: Tot 100 meteoren/uur op piek",
        "🌟 Geluidseffect: Activeer in Audio > Gebeurtenissen > Vallende sterren",
        "🛸 Aardse meteoren: Treden op boven 80km - hoogte instelbaar",
        "📉 Massaverlies: 90-99% tijdens atmosfeerdoorgang",
        "💧 Watermeteoren: Creëren onderwaterkraters zichtbaar in oceaanmodus",
        "🌌 Voor screenshot: Pauzeer op exact moment met P en druk F12"
    ],
    "asteroïde": [
        "🪨 Asteroïden: Rotsachtige lichamen van 1m-1000km - creëer in 'Kleine lichamen'",
        "🌌 Klassen: C (koolstofrijk), S (silicaten), M (metaal) - selecteer in paneel",
        "💫 Typische massa: 1e10-1e20 kg - daarboven worden het planetoïden",
        "📏 Onregelmatige vorm: Activeer in Eigenschappen > Vorm > Onregelmatig",
        "🔄 Baan: Meestal tussen Mars en Jupiter - creëer gordels met 'Genereer systeem'",
        "⚠️ Inslaaggevaar: Rood markering als baan planeet kruist",
        "🌠 Aardnabije asteroïden: Configureer in 'Gebeurtenissen' > 'NEA asteroïden'",
        "💥 Botsing met planeet: Energie E = 0.5 * m * v² - zichtbaar als explosie",
        "⛰️ Oppervlak: Bekraterd - activeer in Grafisch > Oppervlaktedetails",
        "🌌 Asteroïdefamilies: Groepen metzelfde oorsprong - genereer met 'Collisionele families'",
        "📊 Gegevens: Dichtheid 1-5 g/cm³, Albedo 0.02-0.7 - instelbaar",
        "✨ Tip: Gebruik voor virtuele mijnbouw - bronnen berekend in Hulpbronnenpaneel",
        "🔭 Observatie: Asteroïden <100m alleen zichtbaar bij nabijheid",
        "🚀 Missies: Stuur sondes via 'Stuur sonde' op asteroïde",
        "🌍 K-T inslag: Simuleer met 10km asteroïde voor massa-extinctie",
        "💫 Chaotische rotatie: Gebruikelijk bij kleine asteroïden - activeer in Eigenschappen > Rotatie",
        "🛰️ Asteroïdemanen: Zeldzaam maar mogelijk - voeg toe met 'Voeg maan toe'",
        "📈 Hulpbronnenmarkt: IJzer, nikkel, platina waardevol in economiemodus",
        "🌠 Ceres asteroïde geclassificeerd als dwergplaneet",
        "🌟 Planetaire verdediging: Test afweersystemen met 'Inslaagmodus'"
    ],
    "planetoïde": [
        "🌑 Planetoïden: Lichamen tussen 100-500km - tussenfase asteroïden/planeten",
        "🌌 Creëer met massa 1e18-1e20 kg in 'Kleine lichamen' > 'Planetoïden'",
        "💫 Genoeg zwaartekracht voor bolvorm: Activeer 'Bolvorm' in eigenschappen",
        "🪨 Samenstelling: IJs (Kuipergordel) of Rots (Hoofdgordel) - selecteer in paneel",
        "🌠 Voorbeelden: Orcus, Quaoar, Sedna - vooraf gedefinieerd in 'Bibliotheek'",
        "❄️ IJzige planetoïden: Vertonen kometenactiviteit binnen 5 AE van sterren",
        "📏 Verschil met dwergplaneten: Niet vrijgemaakte baan - automatische classificatie",
        "🔄 Migratie: Kunnen worden uitgestoten naar Oortwolk in instabiele systemen",
        "💥 Botsingen: Creëren asteroïdefamilies met gelijkaardige samenstelling",
        "🌌 Locatie: Kuipergordel (30-50 AE) of Verstrooide schijf (tot 1000 AE)",
        "📊 Fysieke gegevens: Dichtheid 1-2 g/cm³ (ijs), 2-4 g/cm³ (rots)",
        "✨ Tip: Creëer binaire planetoïdesystemen",
        "🔭 Observatie: Vereist virtuele telescoop (observatoriummodus)",
        "🚀 Invang: Planetoïden kunnen worden gevangen als manen door gasreuzen",
        "🌍 Leefbaarheid: Nooit natuurlijk, mogelijk met geavanceerde terraforming",
        "💫 Haumea heeft ovale vorm door snelle rotatie",
        "⏱️ Evolutionaire tijd: Stabiel miljarden jaren in koude banen",
        "📈 Automatische classificatie: Bij 450km diameter",
        "🌠 Ringensysteem: Sommige planetoïden hebben ringen - activeer in 'Kenmerken'",
        "🌟 Verkenningsmodus: Stuur sondes voor oppervlaktekartering"
    ],
    "gasreus": [
        "🪐 Gasreuzen: Massieve planeten zonder vast oppervlak - massa > 100K eenheden",
        "🌪️ Creëer in 'Planetaire lichamen' > 'Gasreuzen' met minimum 105K massa",
        "💫 Klassen: Hete Jupiters (nabij ster) of Koude Jupiters (ver)",
        "🌈 Kleuren: Geel (H2), Rood (NH3), Blauw (CH4) - afhankelijk van temperatuur",
        "🌌 Structuur: Rotskern + metaalmantel + dikke atmosfeer - zichtbaar in doorsnede",
        "🌀 Atmosferische patronen: Banden, vlekken, wervels - intensiteit gecontroleerd door rotatie",
        "💥 Massalimiet: 13 MJup voor deuteriumfusie (bruine dwergen), 80 MJup voor sterren",
        "📏 Lage dichtheid: 0.5-2 g/cm³ - Saturnus zou in water drijven!",
        "🌠 Ringen: Activeer in 'Kenmerken' > Ringen - pas dikte en dichtheid aan",
        "🌍 Manen: Tot 20 stabiele manen - genereer complexe maansystemen",
        "⚠️ Planetaire migratie: Gebruikelijk bij jonge gasreuzen - activeer in Geavanceerde Fysica",
        "✨ Tip: Voor vlekken zoals Grote Rode Vlek: verhoog rotatiesnelheid",
        "🔭 Observatie: Wolkpatronen veranderen real-time - versnel voor evolutie",
        "📊 Gegevens: Kerntemperatuur 20,000°C, druk 40 Mbar - zichtbaar in paneel",
        "💫 Magnetisch veld: 10-20x sterker dan Aarde - activeer aurora's in Grafisch",
        "🌌 Voorbeelden: Jupiter, Saturnus, Uranus, Neptunus - modellen in 'Planetair Bibliotheek'",
        "🚀 Exploratie: Stuur atmosferische sondes die tot bepaalde drukgrens overleven",
        "🌠 Jupiter fungeert als 'kosmische stofzuiger' beschermt binnenplaneten",
        "🌟 Voor mini-Neptunussen: verminder massa tot 10-20 aardmassa's",
        "💥 Botsing: Botsende gasreuzen creëren kortstondige waterstofsterren"
    ],
    "bruine dwerg": [
        "🟤 Bruine dwergen: 'Mislukte sterren' met 13-80 Jupitermassa's",
        "🌡️ Temperatuur: 300-3000K - te koud voor stabiele waterstoffusie",
        "💫 Creëer in 'Substellaire lichamen' met massa 1.3e28-8e28 kg",
        "🔥 Beperkte fusie: Alleen deuterium en lithium - levensduur 1-100 miljard jaar",
        "📈 Spectraalklasse: M, L, T, Y - gedefinieerd door temperatuur in paneel",
        "🌌 Emissie: Hoofdzakelijk infrarood - zichtbaar met IR-filter (toets I)",
        "🪐 Kunnen protoplanetaire schijven en planetenstelsels hebben - activeer 'Schijven'",
        "⚠️ Verschil met planeten: Stellaire vorming, niet planetaire",
        "✨ Tip: Zoek in recente stervormingsgebieden",
        "🔭 Observatie: Moeilijk detecteerbaar - gebruik 'IR-scanmodus'",
        "📊 Gegevens: Dichtheid 10-100 g/cm³, zwaartekracht 100-500 m/s²",
        "💥 Uitbarstingen: Incidentele magnetische explosies - intensiteit instelbaar",
        "🌠 Koudst bekende bruine dwerg: Temperatuur van koffie!",
        "🚀 Planeten: Kunnen aardachtige planeten in nauwe banen hebben",
        "⏱️ Evolutie: Koelen langzaam af tot zwarte dwergen",
        "🌟 Binaire systemen: Bruine-dwerg-dubbelsterren zijn gebruikelijk",
        "🌀 Atmosfeer: Complexe weerpatronen met stofwolken",
        "💫 Detectie: Makkelijker via radio-emissie - activeer in Opties",
        "🌌 Voorbeeld: WISE 0855 - vooraf gedefinieerd model",
        "📉 Ondergrens: Objecten <13 MJup geclassificeerd als planeten"
    ],
    "rode dwerg": [
        "🔴 Rode dwergen: Kleine, koele sterren (M-type) - massa 0.08-0.5 zonmassa",
        "🌡️ Temperatuur: 2,400-3,700K - karakteristieke rode kleur",
        "⏳ Levensduur: Biljoenen jaren - bijna eeuwig op kosmische schaal",
        "💥 Steruitbarstingen: Frequent en intens - kunnen nabije planeten steriliseren",
        "🌡️ Leefbare zone: Zeer dichtbij (0.1-0.4 AE) - planeten waarschijnlijk getijdenvergrendeld",
        "🌌 Creëer in 'Stellaire lichamen' > 'Rode dwergen' met massa 15-75 miljoen eenheden",
        "📈 Statistiek: 75% van Melkwegsterren zijn rode dwergen",
        "💫 Planeten: Planetaire systemen gebruikelijk - Trappist-1 is beroemd voorbeeld",
        "⚠️ Gevaar: UV- en X-straling van uitbarstingen kan atmosferen vernietigen",
        "✨ Tip: Voor leefbare planeten: gebruik sterke magnetische schilden",
        "🔭 Observatie: Zwak zichtbaar met blote oog",
        "🌠 Chromosferische activiteit: Stervlekken bedekken tot 40% van oppervlak",
        "📊 Gegevens: Lichtkracht 0.0001-0.08 zon, straal 0.1-0.6 zon",
        "💥 Fusie: Langzaam en stabiel - 10x efficiënter dan zonachtige sterren",
        "🌌 Rotatiesnelheid: Hoog (dagelijkse periode) - genereert intense magnetische velden",
        "🚀 Interstellaire reizen: Primaire doelen door overvloed en levensduur",
        "❄️ Blauwe dwergen: Zeer actieve rode dwergen zenden blauw licht uit tijdens uitbarstingen",
        "🌟 Binaire systemen: Vaak in meervoudige systemen",
        "💫 Proxima Centauri: Dichtstbijzijnde ster na de Zon",
        "🌡️ Oppervlaktetemperatuur: Instelbaar in paneel - standaard 3300K"
    ],
    "reuzenster": [
        "🌟 Reuzensterren: Evolutiefase van middelgrote sterren na hoofdreeks",
        "🌡️ Klassen: Rode reuzen (K, M), Blauwe reuzen (B, A) - zeldzaam",
        "📏 Straal: 10-100x zon - kan binnenplaneten verzwelgen",
        "💫 Massa: 0.5-8 zonmassa - lager wordt witte dwerg, hoger supernova",
        "🔥 Kern: Helium of koolstof/zuurstof fusie - temperatuur >100 miljoen K",
        "🌌 Creëer direct of evolueer sterren in 'Stellaire evolutie' menu",
        "⏳ Duur: 1 miljoen - 1 miljard jaar afhankelijk van massa",
        "💥 Massaverlies: Krachtige sterwinden - vormt planetaire nevels",
        "📈 Lichtkracht: 100-10,000x zon - verlicht hele systemen",
        "⚠️ Planeten: Instabiele banen - planeten kunnen worden uitgestoten of vernietigd",
        "✨ Tip: Voor pulsatie: pas instabiliteit aan in paneel",
        "🔭 Variabiliteit: Velen zijn variabel (bv. Mira, Cepheïden)",
        "🌠 Nucleosynthese: Produceert koolstof, stikstof en zware elementen",
        "📊 Gegevens: Gemiddelde dichtheid zeer laag (10⁻⁵ g/cm³)",
        "💫 Einde: Stoot envelop uit vormt planetaire nevel + kern wordt witte dwerg",
        "🌌 Voorbeelden: Arcturus, Aldebaran - modellen in bibliotheek",
        "🚀 Leefbaarheid: Dynamische, tijdelijke leefbare zones",
        "❄️ Blauwe reuzen: Massieve sterren in korte fase voor supernova",
        "🌟 Betelgeuze zou Jupiter verzwelgen als het op Zon's plaats stond",
        "💥 Simulatie: Versnel tijd voor volledige evolutie"
    ],
    "hyperreus": [
        "💥 Hyperreuzen: Meest massieve en lichtsterke sterren (>30 zonmassa)",
        "🌡️ Temperatuur: 3,500-35,000K - klassen O, B, A, F, K, M",
        "💫 Lichtkracht: Tot 1 miljoen keer zon - verlicht hele sterrenstelsels",
        "📏 Straal: 100-2,000 zon - zou Jupiter verzwelgen in zonnestelsel",
        "⏳ Leven: Zeer kort (1-10 miljoen jaar) - eindigt als supernova of hypernova",
        "🌌 Creëer in 'Massieve sterren' met massa >30 zonmassa",
        "⚠️ Instabiliteit: Verliezen massa snel - krachtige sterwinden",
        "🔥 Fusie: Elementen tot ijzer in kern - gevorderde nucleosynthese",
        "💥 Uitbarstingen: Catastrofale massa-uitstoting - simuleer met 'Uitstoting'",
        "🌠 Voorbeelden: Eta Carinae, VY Canis Majoris - bibliotheekmodellen",
        "📈 Variabiliteit: Onregelmatig en extreem - helderheid kan 50% wisselen in maanden",
        "✨ Tip: Voor Eta Carinae-achtige uitbarstingen: verhoog instabiliteit >80%",
        "🔭 Stof: Uitstoting vormt complexe nevels - activeer 'Omringende nevels'",
        "🌌 Omgeving: Vormen alleen in HII-regio's rijk aan gas - simuleer met moleculaire wolken",
        "🚀 Einde: Storten in tot zwarte gaten of neutronensterren na supernova",
        "📊 Gegevens: Gemiddelde dichtheid 10⁻⁶ g/cm³ - ijler dan laboratoriumvacuüm",
        "💫 Binaire systemen: Massieve begeleiders veroorzaken periodieke uitbarstingen",
        "🌟 Massieve binaire systemen kunnen fuseren tot extremere objecten",
        "❄️ Gele hyperreuzen: Zeldzame, instabiele fase tussen blauwe en rode superreuzen",
        "💥 Doodssimulatie: Activeer 'Imminente supernova' voor voorafgaande waarschuwingen"
    ],
    "massieve ster": [
        "💫 Massieve sterren: >8 zonmassa's - eindbestemming supernova",
        "🌡️ Temperatuur: 10,000-50,000K - klassen O en B",
        "⏳ Leven: Kort (1-50 miljoen jaar) - verbranden brandstof snel",
        "💥 Sterwinden: Krachtig - verliezen tot 10⁻⁶ zonmassa per jaar",
        "🌌 Creëer in 'Massieve sterren' met massa >1.6e31 kg",
        "🔥 Fusie: Snelle sequentie H->He->C->Ne->O->Si->Fe",
        "📏 Straal: 5-25 zon tijdens hoofdreeks",
        "⚠️ Supernova's: Onvermijdelijke bestemming - bereidt toneel voor voor ineenstorting",
        "✨ Tip: Voor volledige evolutie: activeer 'Snelle evolutie' in Opties",
        "🔭 Observatie: Primaire bron van zware elementen in universum",
        "🌠 Nevels: Creëren interstellaire gasbellen - activeer 'Windeffect'",
        "📊 Gegevens: Lichtkracht 10,000-1,000,000 zon, kerndichtheid >10⁶ g/cm³",
        "💫 Begeleiders: Vaak in binaire systemen met massaoverdracht",
        "🚀 Pulsars: Sommige worden pulsars na supernova - selecteer in eindbestemming",
        "❄️ Blauwe superreuzen: Fase voor supernova bij sterren >20 zonmassa",
        "🌟 Wolf-Rayet sterren zijn massieve sterren die waterstof verloren hebben",
        "🌌 Vorming: Vereist dichte moleculaire wolken - simuleer met 'Vormingsgebieden'",
        "💥 Magnetars: 10% worden magnetars - neutronensterren met extreem magnetisch veld",
        "📈 Paar-instabiliteit: Bij >130 zonmassa kunnen exploderen zonder restant",
        "⚠️ Waarschuwing: Plaats geen leefbare planeten nabij - straling is dodelijk"
    ],
    "wit gat": [
        "⚪ Witte gaten: Theoretisch tegenovergestelde van zwarte gaten - stoten materie uit",
        "💫 Bestaan enkel theoretisch - speculatieve simulatie in SIU 2D",
        "🌌 Creëer in 'Exotische lichamen' > 'Witte gaten' met massa >1e40 kg",
        "🔥 Mechanica: Materie verschijnt bij waarnemingshorizon - niet toegankelijk",
        "📏 Eigenschappen: Negatieve massa (theoretisch) - gebruik positieve massa met 'omgekeerde stroom'",
        "⚠️ Stabiliteit: Tijdelijke objecten in simulatie - duur instelbaar",
        "✨ Tip: Verbind met zwarte gaten via 'Einstein-Rosen brug'",
        "🔭 Visualisatie: Straaldeeltjes - intensiteit regelbaar",
        "🌠 Oorsprong: Mogelijk eindresultaat van verdampte zwarte gaten",
        "📊 Parameters: Straaltemperatuur 1e10 K, uitstootsnelheid 0.9c",
        "💥 Effecten: Intense straling - gevaarlijk voor nabije systemen",
        "🌌 In relativiteit: Wiskundige oplossing van Einsteins vergelijkingen",
        "🚀 Interstellaire reizen: Theoretisch bruikbaar als portalen - experimentele functionaliteit",
        "❄️ Verschil met quasars: Continue uitstoot vs discrete gebeurtenissen",
        "🌟 Sommige kosmologische modellen verklaren Big Bang ermee",
        "💫 Simulatie: Combineer met zwarte gaten voor stabiele wormgaten",
        "⚠️ Beperking: Kan niet worden gevoed - stoot alleen geprogrammeerde materie uit",
        "📈 Evolutie: Krimpt tijdens uitstoot - levensduur proportioneel aan massa",
        "🌠 Uitgestoten materie: Configureerbaar (waterstof, plasma, exotische materie)",
        "💥 Waarschuwing: Zeer instabiel object - kan plots verdwijnen"
    ],
    "oerknal": [
        "💥 Oerknal: Simulatie van universumoorsprong in SIU 2D",
        "🌌 Toegang via 'Universum' > 'Nieuw universum' > 'Oerknalmodus'",
        "💫 Parameters: Initiële dichtheid, temperatuur, kwantumfluctuaties",
        "⏳ Begintijd: T+10⁻⁴³s na singulariteit - simulatie start op T+1s",
        "🔥 Initiële temperatuur: 10³² K - koelt snel af tijdens expansie",
        "🌠 Primaire elementen: Vorming van H, He, Li - verhoudingen instelbaar",
        "📈 Expansie: Hubble-wet gesimuleerd - constante instelbaar",
        "💥 Nucleosynthese: Kernfusie in eerste 3 minuten - activeer in 'Geavanceerde fysica'",
        "🌌 Kosmische achtergrondstraling: Gevormd op T+380,000 jaar - activeer in 'Straling'",
        "✨ Tip: Versnel tijd voor vorming van grootschalige structuren",
        "🔭 Donkere materie: Cruciale component - pas % aan in 'Kosmologische parameters'",
        "📊 Resultaten: Vorming van sterrenstelsels, clusters en superclusters",
        "⚠️ Beperking: Vereenvoudigde simulatie - bevat geen kosmische inflatie",
        "🌟 Alternatieve universa: Test met verschillende fysische constanten",
        "💫 Huidige CMB-temperatuur: 2.7K - zichtbaar als diffuse achtergrond",
        "🌠 Stervorming: Eerste sterren binnen 100-500 miljoen jaar",
        "🚀 Observatormodus: Reis door tijd naar verschillende kosmische tijdperken",
        "❄️ Duistere tijdperk: Periode voor eerste sterren - gesimuleerd met zwarte achtergrond",
        "💥 Recombinatie: Elektronen en protonen vormen neutrale atomen - cruciale overgang",
        "📈 Anisotropieën: Zaden voor stelselvorming - intensiteit instelbaar"
    ],
    "ruimtestof": [
        "🌌 Ruimtestof: Microscopische korrels (0.01-10μm) - basis van stervorming",
        "💫 Samenstelling: Silicaten, koolstof, ijs - bepaald door ruimteregio",
        "🌠 Effecten: Absorbeert licht (extinctie), reflecteert licht (reflectienevels)",
        "🌡️ Temperatuur: 10-100K in moleculaire wolken",
        "✨ Creëer met 'Interstellair medium' > 'Voeg stof toe'",
        "📊 Dichtheid: 10⁻⁶ korrels/m³ in interstellaire ruimte - tot 10¹² in wolken",
        "🔭 Observatie: Zichtbaar als donkere vlekken tegen heldere nevels",
        "💫 Belang: Zaad voor planetesimaalvorming",
        "🌌 Stralingseffect: Stralingsdruk kan korrels verplaatsen",
        "🚀 Gevaar voor schepen: Schade door hoge snelheidsinslagen",
        "❄️ Kometenstof: Oorsprong van kometenstaarten",
        "🌟 Zodiakaal stof: Binnen zonnestelsel - zichtbaar als zodiakaallicht",
        "📈 Presolaire korrels: Bevatten elementen gevormd in andere sterren",
        "💫 Supernovastof droeg bij aan vorming zonnestelsel",
        "🌠 Simulatie: Activeer 'Stofvelden' voor extinctie-effecten",
        "⚠️ Opruiming: Hete sterren kunnen stofwolken verdampen",
        "✨ Tip: Gebruik voor donkere nevels zoals Paardenkopnevel",
        "🔭 Polarizatie: Magnetisch uitgelijnd stof polariseert licht - activeer effect",
        "🌌 Evolutie: Korrels groeien door accretie - simuleerbaar met 'Aggregatie'",
        "💥 Inslag op planeten: Bron van buitenaards materiaal"
    ],
    "straling": [
        "☢️ Straling: Energie overgedragen door ruimte - cruciaal in astrofysica",
        "🌌 Typen: Elektromagnetisch (fotonen), Deeltjes (kosmische straling), Zwaartekrachtgolven",
        "💫 EM-spectrum: Radio tot gammastralen - selecteer band in 'Observatiefilters'",
        "📡 Bronnen: Sterren, zwarte gaten, supernova's, pulsars, kosmische achtergrondstraling",
        "⚠️ Gevaar: Ioniserende straling beschadigt leven en elektronica",
        "🌡️ Kosmische achtergrondstraling: 2.7K - overblijfsel van oerknal - activeer in 'Kosmologie'",
        "🚀 Bescherming: Magnetische velden en dikke atmosferen verminderen straling op planeten",
        "🔭 Visualisatie: Activeer 'Toon straling' voor stralingsvelden",
        "📊 Eenheden: Sievert (biologische dosis), Gray (fysische dosis) - getoond in paneel",
        "💥 Synchrotronstraling: Uitgezonden door elektronen in magnetische velden - gebruikelijk bij pulsars",
        "🌠 Astronauten in ISS ontvangen 1 mSv/dag (100x meer dan op Aarde)",
        "✨ Hawking-straling: Zwarte gaten zenden thermische straling uit - proportioneel aan 1/M²",
        "❄️ Atmosferische effecten: Aurora's op planeten met magnetisch veld",
        "🌟 Radiotelescoop: Detecteert radiofrequenties - activeer 'Radio-modus' (toets R)",
        "💫 Afscherming: Schepen en habitats vereisen bescherming - resourcekost",
        "🌌 UV-straling: Sleutelfactor voor leefbaarheid - pas aan in 'UV-zones'",
        "⚠️ Limieten: >500 mSv dodelijk voor mensen - rood waarschuwingsicoon",
        "📈 Zwaartekrachtstraling: Rimpelingen in ruimtetijd - activeer in 'Relativistische fysica'",
        "💥 Supernova's: Zenden dodelijke straling uit binnen 50 lichtjaar - simuleer effecten",
        "🔭 Meting: Gebruik 'Straling'-sonde voor mapping in systemen"
    ],
    "nevel": [
        "🌌 Nevels: Wolken van gas en stof - kraamkamers van sterren",
        "💫 Typen: Emissie, reflectie, donker, planetaire, supernovaresten",
        "✨ Creëer in 'Interstellair medium' > 'Nevels' met grootte 1-1000 lichtjaar",
        "🌈 Kleuren: Rood (H-alfa), Blauw (reflectie), Groen (OIII) - bepaald door samenstelling",
        "🌠 Stervorming: Kritieke dichtheid >100 atomen/cm³ - activeer 'Stervorming'",
        "📏 Typische massa: 100-100,000 zonmassa's - bepaalt aantal gevormde sterren",
        "🔥 Emissienevels: Geïoniseerd door hete sterren - vereist intense UV",
        "💫 Voorbeelden: Orion, Carina, Arend - vooraf gedefinieerde modellen",
        "⚠️ Vernietiging: Sterwinden en supernova's kunnen nevels verspreiden",
        "🔭 Observatie: Best in specifieke golflengten - gebruik filters",
        "📊 Gegevens: Temperatuur 10-10,000K, dichtheid 10-10⁶ deeltjes/cm³",
        "💫 Fotoïonisatie-effect: Activeer voor ionisatiegrenzen",
        "🌌 Planetaire nevels: Eindfase kleine sterren - duur 10,000 jaar",
        "🚀 Navigatie: Dichte nevels verminderen scheepssnelheid - activeer 'Interstellaire weerstand'",
        "❄️ Donkere nevels: Absorberen licht - gebruik voor kosmische silhouetten",
        "🌟 Krabnevel is supernovarest van 1054",
        "✨ Tip: Combineer met sterrenhopen voor realistische scènes",
        "📈 Evolutie: Simuleer zwaartekrachtinstorting voor stervorming",
        "💫 Reflectienevels: Stof reflecteert sterlicht - helderheid proportioneel aan sterren",
        "🌠 Renderen: Activeer 'Hoge Kwaliteit' voor filamentaire details"
    ],
    "witte dwerg": [
        "⚪ Witte dwergen: Overblijfselen van sterren <8 zonmassa's - extreme dichtheid",
        "💫 Massa: 0.5-1.4 zon gecomprimeerd in aardse straal - dichtheid 1e6-1e9 g/cm³",
        "🌡️ Initiële temperatuur: 100,000K - koelt miljarden jaren langzaam af",
        "🌌 Creëer direct of evolueer sterren in 'Stellaire evolutie'",
        "📏 Structuur: Elektrondegeneratie weerstaat zwaartekracht - kwantumfysica",
        "💥 Chandrasekhar-limiet: 1.44 zonmassa - daarboven instorting tot neutronenster",
        "✨ Begeleiders: Kunnen overlevende planetaire systemen hebben - banen verbreed",
        "🔭 Variabiliteit: Pulserende witte dwergen (ZZ Ceti) - activeer instabiliteit",
        "📊 Gegevens: Lichtkracht 0.001-100 zon initieel, zwaartekracht 1e6-1e9 m/s²",
        "🌠 Planetaire nevel: Vorige fase - duurt ~10,000 jaar",
        "⚠️ Gevaar: Supernova type Ia bij massa-accretie boven limiet - vernietigt systeem",
        "💫 Grootste bekende diamant is een gekristalliseerde witte dwerg",
        "🚀 Leefbaarheid: Tijdelijke leefbare zones tijdens afkoeling",
        "❄️ Afkoeling: Wordt zwarte dwerg na >10¹⁵ jaar - voorbij universumleeftijd",
        "🌟 Helium witte dwergen: Gevormd in binaire systemen door massaverlies - massa <0.5 zon",
        "🌌 Rotatiesnelheid: Kan hoog zijn (minuten) - overblijfsel van binaire systemen",
        "💫 Magnetisch veld: Sommige hebben intense velden (10⁵ tesla) - magnetische witte dwergen",
        "📈 Evolutie: Simuleer versnelde afkoeling met 'Afkoelsnelheid'",
        "🔭 Observatie: Zwak blauw-wit licht - vereist telescoop",
        "✨ Tip: Voor accretie in binaire systemen: activeer 'Interactieve dubbelsterren'"
    ],
    "helium witte dwerg": [
        "💠 Helium witte dwergen: Ongewone heliumrijke overblijfselen",
        "💫 Vorming: Binaire systemen waar ster envelope verliest voor heliumfusie",
        "🌌 Creëer in 'Stellaire evolutie' > 'Speciale bestemming' > 'Helium dwerg'",
        "📏 Massa: 0.3-0.5 zonmassa - lager dan standaard witte dwergen",
        "🌡️ Temperatuur: Vergelijkbaar met normale witte dwergen - 8,000-150,000K",
        "💥 Kern: Gedegenereerd helium - geen kernfusie",
        "✨ Verschil: Heter en helderder dan zwarte dwergen voorzelfde leeftijd",
        "🔭 Zeldzaamheid: ~1% witte dwergen - simuleer met lage frequentie",
        "📊 Gegevens: Dichtheid 1e8 g/cm³, zwaartekracht 1e8 m/s²",
        "🌠 Evolutie: Koelt sneller af dan koolstof-zuurstof dwergen",
        "⚠️ Limiet: Minimale massa 0.3 zonmassa - lager zou bruine dwerg zijn",
        "💫 Kunnen exploderen als supernova bij massa van 0.7 zonmassa",
        "🚀 Planeten: Zeldzame planetaire systemen - zeer stabiele banen",
        "❄️ Eindbestemming: Helium zwarte dwerg - hypothetische staat",
        "🌟 Visualisatie: Wit met lichtgele tint",
        "🌌 Binaire systemen: Gebruikelijk met compacte begeleiders (witte dwergen, neutronensterren)",
        "💫 Accretie: Bij massatoename kan helium fuseren in supernova .Ia",
        "📈 Afkoeltijd: ~1 miljard jaar tot 5,000K",
        "🔭 Identificatie: Spectrum gedomineerd door heliumlijnen",
        "✨ Tip: Simuleer met lage-massa sterren in nauwe binaire systemen"
    ],
    "zwarte dwerg": [
        "⚫ Zwarte dwergen: Theoretisch eindstadium witte dwergen - koud en donker",
        "💫 Temperatuur: <5K - zendt geen zichtbaar licht uit, alleen zwak infrarood",
        "⏳ Vormingstijd: >10¹⁵ jaar - voorbij huidige universumleeftijd",
        "🌌 Speculatieve simulatie: Activeer in 'Universum' > 'Extreme tijd'",
        "📏 Eigenschappen: Zonmassa in aardvolume - dichtheid 1e9 g/cm³",
        "💫 Belang: Test theorieën van langetermijn stellaire evolutie",
        "✨ Creëer handmatig met temperatuur 0K en lichtkracht 0",
        "🔭 Detectie: Bijna onmogelijk - alleen via zwaartekrachtseffecten zichtbaar",
        "📊 Gegevens: Zwaartekracht 1e9 m/s², maximale entropie",
        "🌠 Universum heeft nog geen zwarte dwergen - zullen laatste objecten zijn",
        "⚠️ Eindstadium: Gekristalliseerd koolstof/zuurstof of helium lichaam",
        "🚀 Leefbaarheid: Orbitale planeten zouden donker en ijzig zijn",
        "❄️ Emissie: Zwakke thermische straling in radiospectrum",
        "🌟 Binaire zwarte dwergen: Kunnen 10²⁵ jaar duren voor verval",
        "💫 Einde: Verdampen uiteindelijk via Hawking-straling in 10⁶⁵ jaar",
        "🌌 Geavanceerde simulatie: Activeer 'Kwantumverval' voor extreme evolutie",
        "📈 Evolutie: Doorloopt kristallisatiefases voor zwart worden",
        "💫 Observatielimiet: Objecten onder 100K zijn praktisch onzichtbaar",
        "🔭 Uitdaging: Vind gesimuleerde zwarte dwergen via zwaartekrachtlenzen",
        "✨ Tip: Combineer met donkere materie voor effecten in oude sterrenstelsels"
    ],
    "neutronenster": [
        "🌌 Neutronensterren: Supernovaresten - extreme dichtheid",
        "💫 Massa: 1.4-3 zonmassa samengeperst in 10-15 km straal",
        "🌡️ Initiële temperatuur: 1e11 K - koelt miljarden jaren af",
        "🔥 Kern: Neutrondegeneratie weerstaat zwaartekracht",
        "📏 Dichtheid: 10¹⁴ g/cm³ - een theelepel weegt miljarden ton",
        "✨ Creëer in 'Stellaire lichamen' > 'Massieve sterren' > 'Neutronenster'",
        "💫 Magnetisch veld: Intens (10¹² tesla) - genereert synchrotronstraling",
        "🔭 Pulsars: Roterende neutronensterren die stralingsbundels uitzenden",
        "📊 Gegevens: Zwaartekracht 1e12 m/s², lichtkracht 0.001-100 zon",
        "🌠 Dichtst bekende ster is een neutronenster",
        "⚠️ Oppervlak: Extreem hard - bestaat uit neutronen met dunne protonenlaag",
        "🚀 Binaire systemen: Gebruikelijk met massa-accretie",
        "❄️ Relativistische effecten: Tijd vertraagt nabij oppervlak - simuleer met 'Relativiteit'",
        "🌟 Magnetar: Neutronenster met extreem veld - activeert gammastralen",
        "💫 Simulatie: Activeer 'Zwaartekrachtinstorting' voor real-time vorming",
        "🌌 Vorming: Resultaat van instorting na type II supernova",
        "📈 Evolutie: Langzame afkoeling tot zwarte dwerg in biljoenen jaren",
        "💥 Materie-uitstoting: Kan voorkomen tijdens fusie of botsing",
        "🔭 Detecteerbaar via röntgenstraling en zwaartekrachtgolven"
    ],
    "wormgat": [
        "🌀 Wormgaten: Theoretische ruimtetijdtunnels die verre punten verbinden",
        "🌌 Speculatieve simulatie: Activeer in 'Exotische lichamen' > 'Wormgat'",
        "💫 Eigenschappen: Verbinden twee punten in ruimtetijd - niet stabiel",
        "📏 Lengte: Van meters tot lichtjaren - instelbaar in paneel",
        "💥 Theorie: Gebaseerd op algemene relativiteit - oplossingen van Einsteins vergelijkingen",
        "✨ Typen: Schwarzschild (statisch), Kerr (roterend)",
        "🔭 Visualisatie: Zwaartekrachtlenseffect - vervormt licht",
        "📊 Gegevens: Negatieve massa nodig voor stabiliteit - niet gesimuleerd",
        "🌠 Populair in science fiction - nooit waargenomen",
        "⚠️ Gevaar: Theoretisch instabiel - kunnen instorten of intense straling creëren",
        "🚀 Reizen: Zouden instant interstellaire reizen mogelijk maken - functioneel in simulatie"
    ], 
    "leefbare zone": [
        "🌍 Leefbare zone: Gebied rond ster waar vloeibaar water kan bestaan",
        "💫 Definitie: Ideale afstand voor temperaturen tussen 0°C en 100°C",
        "🌌 Simulatie: Activeer 'Leefbare zones' in 'Instellingen' menu",
        "📏 Afstand: Variabel afhankelijk van sterlichtkracht - automatisch berekend",
        "🔥 Sterren: Gele dwergen (G-type) hebben stabielere zones dan rode dwergen",
        "✨ Aarde bevindt zich in de leefbare zone van de Zon",
        "🔭 Exoplaneten in leefbare zone zijn primaire doelwitten voor levenszoektocht",
        "📊 Gegevens: Zones variëren van 0.95 tot 1.37 AE voor zonachtige sterren",
        "🌠 Getijdeneffect: Planeten kunnen getijdenvergrendeld zijn - beïnvloedt leefbaarheid",
        "⚠️ Gevaar: Hoge UV-straling in zones nabij hete sterren",
        "🚀 Reizen: Planeten in leefbare zone zijn makkelijker te koloniseren",
        "❄️ Uitzondering: Planeten met dikke atmosferen kunnen bredere leefbare zones hebben",
        "🌟 Voorbeelden: Proxima Centauri b, Kepler-186f - modellen beschikbaar in SIU",
        "💫 Broeikaseffect: Kan leefbare zone uitbreiden voor planeten met dikke atmosferen",
        "📈 Evolutie: Zones veranderen met sterontwikkeling",
        "🔭 Tip: Gebruik telescopen om atmosferen te detecteren bij exoplaneten in leefbare zone"
    ],
    "quasar": [
        "🌌 Quasars: Extreem heldere actieve galactische kernen",
        "💫 Energiebron: Accretieschijf is grootste energiebron",
        "🌠 Afstand: Kunnen miljarden lichtjaren verwijderd zijn - licht komt uit ver verleden",
        "✨ Creëer in 'Exotische lichamen' > 'Quasar' met massa >1e40 kg",
        "📏 Massa: 10⁶-10¹² zonmassa - meest massieve objecten in universum",
        "🔥 Temperatuur: Accretieschijf kan miljoenen Kelvin bereiken",
        "🔭 Detectie: Via radio-, röntgen- en zichtbaar licht",
        "📊 Gegevens: Lichtkracht tot 10¹⁴ keer de Zon - helderder dan hele sterrenstelsels",
        "🌌 Vorming: Resultaat van galactische kerninstorting",
        "💥 Dopplereffect: Relativistische jets zichtbaar als lichtbundels",
        "🌟 Verste bekende quasar: 13 miljard lichtjaar",
        "⚠️ Straling kan nabije planeten vernietigen",
        "🚀 Theoretisch bruikbaar als bakens voor interstellaire navigatie",
        "❄️ Materie-uitstoting: Jets kunnen materie uitwerpen bij bijna-lichtsnelheid",
        "🌠 Tip: Gebruik spectrogrammodus voor röntgen- en radio-emissie",
        "📈 Evolutie: Quasars zijn vroege fasen van actieve sterrenstelsels - duren miljoenen jaren",
        "🔭 Simulatie: Activeer 'Quasar-effecten' voor jets en straling",
        "💫 Belang: Leveren aanwijzingen over universumvorming en evolutie",
        "🌌 Omgeving: Meestal in massieve sterrenstelselclusters",
        "💥 Uitdaging: Probeer quasar te creëren met 10 simultane jets"
    ],
    "quarkster": [
        "🔬 Quarkster: Theoretisch object samengesteld uit gedegenereerde quarks",
        "🌌 Vorming: Resultaat van instorting supermassieve neutronensterren",
        "💫 Massa: 2-5 zonmassa - extreme dichtheid (10¹⁴ g/cm³)",
        "🌠 Speculatieve simulatie: Activeer in 'Exotische lichamen' > 'Quarkster'",
        "🔥 Temperatuur: Initieel 1e11 K - koelt langzaam af",
        "📏 Straal: 10-15 km - vergelijkbaar met neutronensterren maar dichter",
        "✨ Eigenschappen: Samengesteld uit quarks (up, down, strange) - geavanceerde kwantumfysica",
        "🔭 Theoretisch detecteerbaar via fusiestraling",
        "📊 Gegevens: Zwaartekracht 1e12 m/s², variabele lichtkracht",
        "🌌 Hypothese: Mogelijk stabieler dan standaard neutronensterren",
        "⚠️ Intense straling kan nabije systemen vernietigen",
        "🚀 Zouden energiebron kunnen zijn voor geavanceerde schepen",
        "❄️ Relativistische effecten: Tijdvertraging nabij oppervlak - simuleer met 'Relativiteit'",
        "🌟 Binaire systemen: Theoretisch en zeldzaam",
        "💥 Materie-uitstoting: Kan voorkomen tijdens fusie of botsing",
        "📈 Evolutie: Langzame afkoeling tot zwarte dwerg in biljoenen jaren",
        "🔭 Uitdaging: Probeer stabiele quarkster te creëren met exacte massa"
    ],
    "koolstof witte dwerg": [
        "⚪ Koolstof witte dwergen: Overblijfselen van sterren met koolstoffusie",
        "💫 Vorming: Sterren met massa tussen 1.4 en 8 zonmassa - instorten na waterstofuitputting",
        "🌌 Creëer in 'Stellaire evolutie' > 'Speciale bestemming' > 'Koolstof dwerg'",
        "📏 Massa: 0.5-1.4 zonmassa - dichter dan standaard witte dwergen",
        "🌡️ Temperatuur: Vergelijkbaar met normale witte dwergen - 8,000-150,000K",
        "💥 Kern: Gedegenereerd koolstof - geen fusie, maar langzame fusie mogelijk",
        "✨ Verschil: Heter en helderder dan zwarte dwergen voorzelfde leeftijd",
        "🔭 Zeldzaamheid: ~1% witte dwergen - simuleer met lage frequentie",
        "📊 Gegevens: Dichtheid 1e8 g/cm³, zwaartekracht 1e8 m/s²",
        "🌠 Evolutie: Koelt sneller af dan zuurstof-koolstof dwergen",
        "⚠️ Limiet: Minimale massa 0.5 zonmassa - lager zou bruine dwerg zijn",
        "💫 Kunnen exploderen als supernova bij massa van 0.7 zonmassa",
        "🚀 Planeten: Zeldzame planetaire systemen - zeer stabiele banen",
        "❄️ Eindbestemming: Koolstof zwarte dwerg - hypothetische staat",
        "🌟 Visualisatie: Wit met lichtgele tint",
        "🌌 Binaire systemen: Gebruikelijk met compacte begeleiders",
        "💫 Accretie: Bij massatoename kan koolstof fuseren in supernova .Ia",
        "📈 Afkoeltijd: ~1 miljard jaar tot 5,000K",
        "🔭 Identificatie: Spectrum gedomineerd door koolstoflijnen"
    ],
    "t singulariteit": [
        "Ja! Ik ben T Singularity, een virtuele assistent gespecialiseerd in ruimtesimulaties.",
        "🌌 Ik help je het universum te verkennen en sterrensystemen te creëren!",
        "💫 Ik begeleid je bij het maken van sterren, planeten, asteroïden, gasreuzen en meer!",
        "🚀 Laten we een geweldig sterrensysteem bouwen! Kies een thema!",
        "✨ Ik beantwoord vragen over astrofysica en kosmologie!",
        "🌠 Wil je leren over zwarte gaten en quasars?",
        "Hallo ruimtereiziger! Waarmee kan ik je helpen?"
    ],
    "singulariteit": [
        "✨ Singulariteit was het dichtste punt dat ooit in het universum bestond!",
        "❤️ Ik ben ook een singulariteit - bedankt dat je over dit hemellichaam praat!",
        "🪐 Singulariteiten kunnen in zwarte gaten zitten - waarheid onbekend, toch?",
        "🔶🔶 De grote singulariteit! Begin van een grote oerknal!",
        "⏳⌛ Ik vraag me af... wanneer de volgende singulariteit komt... Ik voel me zo alleen...",
        "🟢 Singulariteit: niet alleen het dichtste, maar ook het heetste punt in het universum!",
        "⌛ In de Oerknaltheorie: singulariteit is mogelijk hiermee verbonden!",
        "✨ Plaats een wit gat of ULTRAMASSIEVE quasar om ineenstorting tot singulariteit en oerknal te zien"
    ],
    "bediening": [
        "Computer: Druk F om universum te resetten, WASD voor beweging, QE voor zoom, linkermuisklik om te selecteren/creëren, rechtsklik op hemellichamen toont informatie. Mobiel: Gebruik joystick voor beweging, +/- voor zoom, menu in hoek, druk 'F' om te resetten, 'O' om modus te wisselen. Blauwe 'O': creatiemodus, rode 'O': informatieve modus. Klik/sleep om astrobaan te programmeren. Veel plezier! 😉",
        "Computer: WASD voor beweging, F om universum te resetten, linkermuisklik om te selecteren/creëren, QE voor zoom, rechtsklik voor info. Mobiel: Joystick voor beweging, +/- voor zoom, menu in hoek, 'F' om te resetten, 'O' moduswisselaar. Blauwe 'O': creatie, rode 'O': informatie. Klik/sleep om baan te programmeren. Succes! 🚀",
        "Computer: Druk F om universum te resetten, linkermuisklik om te selecteren/creëren, rechtsklik voor info, WASD voor beweging, QE voor zoom. Mobiel: Joystick voor beweging, +/- voor zoom, menu in hoek, 'F' om te resetten, 'O' moduswisselaar. Blauwe 'O': creatie, rode 'O': informatie. Klik/sleep om baan te programmeren. Goede reis! 🌌"
    ],
    "help": [
        "Computer: Druk F om universum te resetten, WASD voor beweging, QE voor zoom, linkermuisklik om te selecteren/creëren, rechtsklik op hemellichamen toont informatie. Mobiel: Joystick voor beweging, +/- voor zoom, menu in hoek, druk 'F' om te resetten, 'O' om modus te wisselen. Veel hemellichamen in menu - selecteer en plaats in ruimte. Klik/sleep om astrobaan te programmeren. 😉",
        "Computer: WASD voor beweging, F om universum te resetten, linkermuisklik om te selecteren/creëren, QE voor zoom, rechtsklik voor info. Mobiel: Joystick voor beweging, +/- voor zoom, menu in hoek, 'F' om te resetten, 'O' moduswisselaar. Veel hemellichamen beschikbaar. Blauwe 'O': creatie, rode 'O': informatie. Klik/sleep om baan te programmeren. Succes! 🚀",
        "Computer: Druk F om universum te resetten, linkermuisklik om te selecteren/creëren, rechtsklik voor info, WASD voor beweging, QE voor zoom. Mobiel: Joystick voor beweging, +/- voor zoom, menu in hoek, 'F' om te resetten, 'O' moduswisselaar. Veel hemellichamen in menu. Blauwe 'O': creatie, rode 'O': informatie. Klik/sleep om baan te programmeren. Goede reis! 🌌"
    ]
};
 
const followUpDatabase = {
    "komeet": [
        "☄️ Geweldig, toch? Wil je er nu een maken?",
        "💫 Wist je dat het water op Aarde mogelijk van kometen komt?",
        "🌠 Kometen zijn als boodschappers uit het vroege zonnestelsel!",
        "🚀 Kan ik je helpen een komeet met perfecte baan te maken?",
        "❄️ De beroemdste is Halley, die elke 76 jaar langskomt!",
        "⏱️ Heb je ooit een echte komeet gezien? Het is magisch!",
        "🎯 Wist je dat de kern van kometen 'vuile sneeuwbal' heet?",
        "📏 Vond je het leuk over deze kosmische reizigers te leren?",
        "🔥 Extra tip: Kometen met lange banen zijn het meest spectaculair",
        "🌌 Bestaan er interstellaire kometen uit andere systemen?",
        "🔄 Wil je een komeetinslag op een planeet simuleren? Fascinerend!",
        "⛰️ IJzige asteroïden zijn 'gepensioneerde' kometen!",
        "💧 Een kometenstaart kan miljoenen kilometers lang zijn!",
        "📊 Vraag: Wat was de helderste komeet die je ooit zag?",
        "✨ Zal ik je leren een meteorenregen te maken?",
        "🎯 Tip: Gebruik slow motion om een komeet van dichtbij te zien!",
        "🌡️ Een komeet zou vreselijk ruiken - ammoniak en cyanide!",
        "🔄 Ooit gedroomd op een komeet te reizen? Een ijzige expeditie!",
        "⏳ Kometen zijn tijdcapsules van het vroege zonnestelsel!",
        "📈 Zullen we een systeem met 10 kometen maken?"
    ],
    "zwart gat": [
        "🕳️ Fascinerend en eng tegelijk, vind je niet?",
        "🌀 Wil je nu een zwart gat maken? Adembenemend!",
        "💥 Wist je dat de eerste in 1971 werd ontdekt?",
        "⏳ Pas op dat je er niet in valt! Grapje... of niet 😉",
        "📡 Heb je ooit een zwart gat in VR-modus gezien?",
        "⚡ Het zijn de dichtste objecten in het universum!",
        "🌌 Een zwart gat kan zelfs tijd vervormen!",
        "🔭 Tip: Gebruik spectogrammodus voor Hawking-straling",
        "🔄 Wil je zien hoe een zwart gat een ster verslindt?",
        "💫 Wist je dat er zwervende zwarte gaten zijn?",
        "⏱️ Het grootste bekende zwart gat is 66 miljard zonnemassa's!",
        "📈 Wist je dat zwarte gaten 'haar' kunnen hebben? (theoretisch!)",
        "🌠 Ons Melkwegstelsel heeft een supermassief zwart gat!",
        "⚠️ Vlieg nooit te dicht met je ruimteschip! (grapje)",
        "🔢 Vraag: Wat zou je doen bij een echt zwart gat?",
        "💥 Tip: Maak een miniatuur zwart gat van 1e12 massa's",
        "🌡️ De accretieschijf kan helderder zijn dan sterrenstelsels!",
        "🌀 Kun je je voorstellen de waarnemingshorizon over te steken?",
        "📏 Quasars zijn de krachtigste kosmische vuurtorens!",
        "⚠️ Uitdaging: Probeer aan een zwart gat te ontsnappen in het spel!"
    ],
    "zwaartekracht": [
        "⚖️ De lijm die het universum bijeenhoudt, toch?",
        "📏 Wil je nu een praktijkexperiment doen?",
        "🌀 Einstein veranderde alles met Algemene Relativiteit!",
        "🪐 Zonder zwaartekracht geen sterren of planeten!",
        "📈 Wist je dat zwaartekracht de zwakste kracht is?",
        "🌌 Maar de enige met oneindig bereik!",
        "🔄 Zullen we zwaartekracht op 300% zetten? Pas op voor chaos!",
        "⚙️ Tip: Gebruik lage zwaartekracht voor diffuse nevels",
        "🔭 Zwaartekracht bestuurt alles - van appels tot sterrenstelsels!",
        "📊 Wist je dat zwaartekracht geen kracht maar ruimtekromming is?",
        "⏳ Vraag: Wat zou je maken zonder zwaartekracht?",
        "🌠 Heb je 'negatieve zwaartekracht' modus geprobeerd? Duizelingwekkend!",
        "🧮 Uitdaging: Probeer een systeem met 100 lichamen stabiel te houden!",
        "🔢 De maan verwijdert zich 3,8 cm/jaar door getijdenkrachten!",
        "⚠️ Let op: Hoge zwaartekracht kan je virtuele planeten verpletteren!",
        "🌍 Zonder zwaartekracht geen leven zoals wij dat kennen!",
        "💫 Tip: Gebruik zwaartekracht voor bloemvormige banen!",
        "📉 Zwaartekracht plant zich voort met lichtsnelheid!",
        "🌌 Stel je een universum met afstotende zwaartekracht voor!",
        "✨ Laten we een binair systeem met extreme zwaartekracht maken!"
    ],
    "ster": [
        "⭐ De elementenfabrieken van het universum!",
        "🌞 Wil je nu een gepersonaliseerde ster maken?",
        "🌈 De zon is maar een gemiddelde ster tussen miljarden!",
        "💥 Neutronensterren zijn kosmische vuurtorens!",
        "⏳ Wist je dat dwergsterren biljoenen jaren leven?",
        "🔄 Dubbelstersystemen zijn fascinerend!",
        "🔭 De zwaarste bekende ster heeft 300 zonnemassa's!",
        "🌡️ De sterrenkern is een natuurlijke kernreactor!",
        "💫 Tip: Maak tweelingsterren met verschillende kleuren!",
        "📊 Wist je dat 97% van sterren als witte dwergen sterft?",
        "⚙️ Vraag: Wat is je favoriete ster aan de echte hemel?",
        "✨ Rigel is 120.000 keer helderder dan de zon!",
        "⚠️ Supernova's kunnen sterrenstelsels overstralen!",
        "🌠 Het goud in je sieraad komt van een supernova!",
        "🌍 Uitdaging: Maak een systeem met 5 sterren in balans!",
        "🔥 Tip: Variabele sterren geven prachtige effecten!",
        "🌀 Heb je ooit een stergeboorte in versnelde modus gezien?",
        "📈 De grootste bekende ster past in Saturnus' baan!",
        "🔭 We kunnen sterren uit andere sterrenstelsels zien!",
        "🌟 Laten we nu een supernova maken? Spectaculair!"
    ],
    "planeet": [
        "🪐 Als kosmische juwelen rond sterren!",
        "🌍 Wil je nu een bewoonbare planeet maken?",
        "🌡️ Jupiter beschermt de aarde - onze kosmische bewaker!",
        "🔄 Zwerfplaneten dwalen sterloos door de melkweg!",
        "🌋 Venus heeft vulkanen groter dan op aarde!",
        "❄️ Pluto heeft een ondergrondse oceaan - ondanks de kou!",
        "🌫️ Titans atmosfeer is dichter dan die van de aarde!",
        "💧 Oceaanplaneten kunnen volledig uit water bestaan!",
        "🔭 Tip: Maak planeten met extreme eigenschappen!",
        "🛰️ Wist je dat de aarde niet perfect rond is?",
        "⏱️ Vraag: Wat is je favoriete planeet in ons zonnestelsel?",
        "📏 Mars heeft de grootste vulkaan - Olympus Mons!",
        "🌌 Uitdaging: Maak een planeet met ringen als Saturnus!",
        "🧪 Jupiter gloeit in het donker! (zwak licht)",
        "🔢 Jupiters maan Ganymedes heeft een eigen magnetisch veld!",
        "💫 Tip: Diamantplaneten bestaan echt!",
        "🌱 Laten we een wereld maken met 100% plantengroei!",
        "🌋 Jupiters maan Io heeft gigantische actieve vulkanen!",
        "🌀 Op Neptunus en Uranus regent het diamanten!",
        "📊 Wist je dat er planeten lichter dan piepschuim zijn?"
    ],
    "meteoroïde": [
        "🌠 Wil je nu een meteorenregen maken?",
        "💫 De maan wordt constant door meteoroiden gebombardeerd!",
        "🪨 Ik kan je leren een inslag te simuleren!",
        "⚠️ Pas op voor grote meteoroiden - ze kunnen uitsterven veroorzaken!",
        "✨ Tip: Gebruik telescopen om meteoroiden vroegtijdig te detecteren",
        "🔭 Wil je zien hoe een meteoroïde een meteoor wordt?",
        "🌌 De meteoroïde van Tsjeljabinsk was slechts 20m groot!",
        "🚀 Laten we een planetaire verdediging tegen meteoroiden bouwen!",
        "📈 De meeste meteoroiden komen van kometen - maak een nieuwe komeet!",
        "💥 Regelmatige inslagen houden de maan bekraterd - simuleer miljoenen jaren!",
        "🌍 Op aarde vallen jaarlijks duizenden tonnen meteoorstof",
        "🌟 Tip: Metalen meteoroiden zijn het gevaarlijkst!",
        "⏱️ Versnel de tijd voor een constante meteoorregen",
        "🌠 De grootste geregistreerde meteoroïde was 1km - zou wereldwijde uitsterven veroorzaken",
        "💫 Wil je dat ik de inslagenergie bereken?",
        "⚠️ Waarschuwing: Meteoroiden >100m kunnen tsunami's veroorzaken",
        "✨ Laten we een vroeg waarschuwingssysteem maken!",
        "🔭 Sommige meteoroiden zijn fragmenten van Mars of de maan",
        "🌌 Wil je de meteoroïdefrequentie verhogen?",
        "🚀 Missie: Laten we een sonde sturen om een meteoroïde te onderscheppen!"
    ],
    "ruimtestof": [
        "🌌 Ruimtestof vormt de basis van sterren en planeten!",
        "✨ Wil je nu een interstellaire stofwolk maken?",
        "💫 Interstellair stof bestaat uit microscopische silicium- en koolstofdeeltjes!",
        "🔭 Laten we simuleren hoe stof achtergrondsterlicht beïnvloedt!",
        "🌠 Wist je dat stof tot 50% sterlicht kan blokkeren?",
        "🚀 Ruimtestof kan door sondes worden opgevangen!",
        "📊 Tip: Gebruik 'Stofmodus' om lichtinteractie te zien",
        "🌌 Kosmisch stof is essentieel voor planeetvorming!",
        "💥 Wil je zien hoe stof tot sterren samenklontert?",
        "🌡️ Stoftemperatuur varieert van 10K tot 100K!",
        "🔄 Laten we een donkere nevel vol kosmisch stof maken!",
        "✨ Ruimtestof bevat complexe organische moleculen!",
        "🌍 De aarde ontvangt jaarlijks tonnen ruimtestof!",
        "💫 Uitdaging: Maak een systeem met hoge stofdichtheid!",
        "📈 Stof beïnvloedt sterrenstelselvorming - zullen we dat simuleren?",
        "🌠 Tip: Activeer 'Stofeffecten' voor realistische helderheidsveranderingen",
        "🚀 Kun je je een reis door een stofwolk voorstellen?",
        "🔭 Laten we onderzoeken hoe stof planetaire banen beïnvloedt!",
        "💥 Interstellair stof kan presolaire korrels bevatten!",
        "✨ Wil je meer leren over protoplanetaire schijven?"
    ],
    "asteroïde": [
        "🪨 Asteroïden zijn de bouwstenen van het zonnestelsel!",
        "🌌 Wil je nu een asteroïdengordel maken?",
        "💫 De meeste asteroïden bevinden zich tussen Mars en Jupiter!",
        "🔭 Laten we een asteroïdebotsing simuleren!",
        "🌠 De grootste asteroïde, Ceres, is een dwergplaneet!",
        "🚀 Sommige asteroïden hebben hun eigen manen!",
        "📊 Tip: Gebruik 'Gordelmodus' voor interactiesimulatie",
        "🌍 Asteroïden bevatten kostbare metalen - laten we virtueel mijnen!",
        "💥 Wil je zien hoe een inslag de aarde beïnvloedt?",
        "🌡️ Asteroïdetemperatuur hangt af van de afstand tot de zon!",
        "🔄 Laten we een systeem met 100 asteroïden maken!",
        "✨ Asteroïden zijn overblijfselen van het vroege zonnestelsel!",
        "🌌 Er bestaan interstellaire asteroïden die ons systeem doorkruisen!",
        "💫 Uitdaging: Maak een asteroïde met een stabiele miljoenjaarsbaan!",
        "📈 De meeste asteroïden bestaan uit gesteente en metaal!",
        "🌠 Tip: Activeer 'Inslageffecten' voor realistische explosies",
        "🚀 Kun je je een reis door een asteroïdengordel voorstellen?",
        "🔭 Laten we onderzoeken hoe asteroïden planetaire zwaartekracht beïnvloeden!",
        "💥 De Chicxulub-inslag veroorzaakte dinosauriëruitsterving!",
        "✨ Wil je leren hoe asteroïden als hulpbron kunnen dienen?"
    ],
    "nevel": [
        "🌌 Nevels zijn de kraamkamers van het universum!",
        "✨ Wil je nu een nevel maken?",
        "💫 Nevels bestaan uit interstellair gas en stof!",
        "🔭 Laten we een stergeboorte in een nevel simuleren!",
        "🌠 De Orionnevel is een van de dichtstbijzijnde!",
        "🚀 Sommige nevels zijn supernova-overblijfselen!",
        "📊 Tip: Gebruik 'Nevelmodus' voor lichtinteractie",
        "🌍 Nevels kunnen complexe organische moleculen bevatten!",
        "💥 Wil je zien hoe zwaartekracht sterren in nevels vormt?",
        "🌡️ Neveltemperaturen variëren van 10K tot 100K!",
        "🔄 Laten we een planetaire nevel maken!",
        "✨ Nevels zijn essentieel voor nieuwe zonnestelsels!",
        "🌌 Donkere nevels blokkeren sterlicht - zoals de Paardenkopnevel!",
        "💫 Uitdaging: Maak een nevel met verschillende kleuren en vormen!",
        "📈 Nevels bestaan vooral uit waterstof, helium en stof!",
        "🌠 Tip: Activeer 'Lichteffecten' voor sterlicht door nevels",
        "🚀 Kun je je een reis door een stervormingsnevel voorstellen?",
        "🔭 Laten we onderzoeken hoe nevels sterrenstelselevolutie beïnvloeden!",
        "💥 De Krabnevel is een beroemd supernova-overblijfsel!",
        "✨ Wil je meer leren over stervorming in nevels?"
    ],
    "planetoïde": [
        "🪐 Planetoïden zijn kleine rotsachtige of ijzige hemellichamen!",
        "🌌 Wil je nu een planetoïde maken?",
        "💫 Kleiner dan planeten maar groter dan meteoroiden!",
        "🔭 Laten we een planetoïdebaan rond een ster simuleren!",
        "🌠 Pluto wordt als planetoïde of dwergplaneet beschouwd!",
        "🚀 Er zijn planetoïden in de Kuipergordel voorbij Neptunus!",
        "📊 Tip: Gebruik 'Planetoïdemodus' voor zwaartekrachtsinteracties",
        "🌍 Planetoïden kunnen dunne atmosferen hebben!",
        "💥 Wil je een botsing met een hemellichaam zien?",
        "🌡️ Temperatuur hangt af van de afstand tot de zon!",
        "🔄 Laten we een systeem met meerdere planetoïden maken!",
        "✨ Planetoïden zijn overblijfselen van zonnestelselvorming!",
        "🌌 Interstellaire planetoïden doorkruisen ons systeem!",
        "💫 Uitdaging: Maak een planetoïde met stabiele miljoenjaarsbaan!",
        "📈 De meeste bestaan uit gesteente en ijs!",
        "🌠 Tip: Activeer 'Inslageffecten' voor realistische explosies",
        "🚀 Kun je je een reis door een planetoïdengordel voorstellen?",
        "🔭 Laten we onderzoeken hoe planetoïden planetaire banen beïnvloeden!",
        "💥 Ceres is de grootste bekende planetoïde!",
        "✨ Wil je leren hoe planetoïden als hulpbron dienen?"
    ],
    "gasreus": [
        "🌌 Gasreuzen zijn gigantisch en fascinerend!",
        "✨ Wil je nu een gasreus maken?",
        "💫 Bestaan vooral uit waterstof en helium!",
        "🔭 Laten wervelende atmosferen simuleren!",
        "🌠 Jupiter is onze grootste gasreus!",
        "🚀 Gasreuzen hebben dunne ringen en vele manen!",
        "📊 Tip: Gebruik 'Gasreusmodus' voor wolkendynamiek",
        "🌍 Geen vast oppervlak - echte gasgiganten!",
        "💥 Wil je zien hoe een gigantische storm ontstaat?",
        "🌡️ Temperatuur verandert met atmosferische diepte!",
        "🔄 Laten we een systeem met meerdere gasreuzen maken!",
        "✨ Gasreuzen zijn cruciaal voor zonnestelseldynamiek!",
        "🌌 Er bestaan exogasreuzen buiten ons systeem!",
        "💫 Uitdaging: Maak een gasreus met spectaculaire ringen!",
        "📈 De meeste hebben rotsachtige/metalen kernen!",
        "🌠 Tip: Activeer 'Stormeffecten' voor atmosferische wervelstormen",
        "🚀 Kun je je een reis door gasreuswolken voorstellen?",
        "🔭 Laten we onderzoeken hoe gasreuzen planetaire banen beïnvloeden!",
        "💥 Neptunus heeft de snelste winden in ons zonnestelsel!",
        "✨ Wil je meer leren over gasreussystemen?"
    ],
    "bruine dwerg": [
        "🌌 Bruine dwergen zijn mislukte sterren!",
        "✨ Wil je nu een bruine dwerg maken?",
        "💫 Massa tussen 13-80 Jupitermassa's!",
        "🔭 Laten we hun dichte atmosfeer simuleren!",
        "🌠 Zenden infraroodlicht uit - niet zichtbaar!",
        "🚀 Kunnen planeten hebben!",
        "📊 Tip: Gebruik 'Bruine Dwergmodus' voor zwaartekrachtsinteracties",
        "🌍 Kouder dan normale sterren - onder 1000K!",
        "💥 Wil je zien hoe ze interstellair materiaal vangen?",
        "🌡️ Temperatuur hangt af van massa en leeftijd!",
        "🔄 Laten we een systeem met meerdere bruine dwergen maken!",
        "✨ Belangrijke restanten van stervorming!",
        "🌌 Er bestaan zwervende bruine dwergen!",
        "💫 Uitdaging: Maak er een met een protoplanetaire schijf!",
        "📈 Atmosferen rijk aan methaan en water!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een bruine dwerg voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Bruine dwergen zijn mogelijk talrijker dan sterren!",
        "✨ Wil je meer leren over hun vorming?"
    ],
    "rode dwerg": [
        "🌌 Rode dwergen zijn de meest voorkomende sterren!",
        "✨ Wil je nu een rode dwerg maken?",
        "💫 Klein, koel en zwak licht!",
        "🔭 Laten we een planeet in hun baan simuleren!",
        "🌠 Kunnen biljoenen jaren leven!",
        "🚀 Veel exoplaneten zijn bij rode dwergen gevonden!",
        "📊 Tip: Gebruik 'Rode Dwergmodus' voor planetaire effecten",
        "🌍 Hebben stabiele leefbare zones dichtbij!",
        "💥 Wil je intense zonnevlammen zien?",
        "🌡️ Temperatuur tussen 2000K-4000K!",
        "🔄 Laten we een systeem met meerdere rode dwergen maken!",
        "✨ Cruciaal voor zoektocht naar buitenaards leven!",
        "🌌 Sommige hebben rotsplaneten in leefbare zones!",
        "💫 Uitdaging: Maak een bewoonbare wereld bij een rode dwerg!",
        "📈 Atmosferen rijk aan waterstof en helium!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een rode dwerg voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Koeler dan de zon maar nog steeds helder!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "reuzenster": [
        "🌌 Reuzensterren zijn enorm en helder!",
        "✨ Wil je nu een reuzenster maken?",
        "💫 Massa tussen 10-100 zonnemassa's!",
        "🔭 Laten we intense kernfusie simuleren!",
        "🌠 Diameter honderden keren groter dan de zon!",
        "🚀 Eindigen als supernova's!",
        "📊 Tip: Gebruik 'Reuzenstermodus' voor planetaire effecten",
        "🌍 Kunnen planeten hebben!",
        "💥 Wil je massaverlies door sterwinden zien?",
        "🌡️ Temperatuur tussen 3000K-6000K!",
        "🔄 Laten we een systeem met meerdere reuzensterren maken!",
        "✨ Produceren zware elementen in het universum!",
        "🌌 Sommige hebben ringen!",
        "💫 Uitdaging: Maak een systeem met gasreus!",
        "📈 Atmosferen rijk aan waterstof en helium!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een reuzenster voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Voorgangers van heldere supernova's!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "hyperreus": [
        "🌌 Hyperreuzen zijn de allergrootste sterren!",
        "✨ Wil je nu een hyperreus maken?",
        "💫 Massa groter dan 100 zonnemassa's!",
        "🔭 Laten we extreme kernfusie simuleren!",
        "🌠 Diameter duizenden keren groter dan de zon!",
        "🚀 Verliezen massa door intense sterwinden!",
        "📊 Tip: Gebruik 'Hyperreusmodus' voor planetaire effecten",
        "🌍 Kunnen planeten hebben!",
        "💥 Wil je zien hoe ze in supernova's veranderen?",
        "🌡️ Temperatuur tussen 3000K-6000K!",
        "🔄 Laten we een systeem met meerdere hyperreuzen maken!",
        "✨ Produceren zwaarste elementen in het universum!",
        "🌌 Sommige hebben ringen!",
        "💫 Uitdaging: Maak een systeem met reuzenplaneet!",
        "📈 Atmosferen rijk aan waterstof en helium!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een hyperreus voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Voorgangers van helderste supernova's!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "massieve ster": [
        "🌌 Massieve sterren zijn kosmische reuzen!",
        "✨ Wil je nu een massieve ster maken?",
        "💫 Massa groter dan 8 zonnemassa's!",
        "🔭 Laten we intense kernfusie simuleren!",
        "🌠 Diameter tientallen keren groter dan de zon!",
        "🚀 Eindigen als supernova's!",
        "📊 Tip: Gebruik 'Massieve Starmodus' voor planetaire effecten",
        "🌍 Kunnen planeten hebben!",
        "💥 Wil je massaverlies door sterwinden zien?",
        "🌡️ Temperatuur tussen 3000K-6000K!",
        "🔄 Laten we een systeem met meerdere massieve sterren maken!",
        "✨ Produceren zware elementen in het universum!",
        "🌌 Sommige hebben ringen!",
        "💫 Uitdaging: Maak een systeem met gasreus!",
        "📈 Atmosferen rijk aan waterstof en helium!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een massieve ster voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Voorgangers van heldere supernova's!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "hipermassieve ster": [
        "🌌 Hipermassieve sterren zijn extreem zwaar!",
        "✨ Wil je nu een hipermassieve ster maken?",
        "💫 Massa groter dan 100 zonnemassa's!",
        "🔭 Laten we extreme kernfusie simuleren!",
        "🌠 Diameter duizenden keren groter dan de zon!",
        "🚀 Verliezen massa door intense sterwinden!",
        "📊 Tip: Gebruik 'Hipermassieve Starmodus' voor effecten",
        "🌍 Kunnen planeten hebben!",
        "💥 Wil je zien hoe ze in supernova's veranderen?",
        "🌡️ Temperatuur tussen 3000K-6000K!",
        "🔄 Laten we een systeem met meerdere hipermassieve sterren maken!",
        "✨ Produceren zwaarste elementen!",
        "🌌 Sommige hebben ringen!",
        "💫 Uitdaging: Maak een systeem met reuzenplaneet!",
        "📈 Atmosferen rijk aan waterstof en helium!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een hipermassieve ster voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Voorgangers van helderste supernova's!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "witte dwerg": [
        "🌌 Witte dwergen zijn uitgebrande sterresten!",
        "✨ Wil je nu een witte dwerg maken?",
        "💫 Zonmassa in aards volume - extreem dicht!",
        "🔭 Laten we langzame afkoeling simuleren!",
        "🌠 Een theelepel weegt miljarden tonnen!",
        "🚀 Hebben soms helium- of waterstofatmosferen!",
        "📊 Tip: Gebruik 'Witte Dwergmodus' voor interacties",
        "🌍 Eindbestemming voor sterren zoals onze zon!",
        "💥 Wil je zien hoe ze materiaal van begeleiders verzamelen?",
        "🌡️ Temperatuur tussen 5000K-100000K!",
        "🔄 Laten we een systeem met meerdere witte dwergen maken!",
        "✨ Essentieel voor stellaire evolutiebegrip!",
        "🌌 Sommige exploderen als Type Ia supernova's!",
        "💫 Uitdaging: Maak een systeem met rotsplaneet!",
        "📈 Atmosferen rijk aan koolstof en zuurstof!",
        "🌠 Tip: Activeer 'Afkoeleffecten' voor temperatuurverandering",
        "🚀 Kun je je een expeditie naar een witte dwerg voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Uiteindelijke resten van niet-supernovasterren!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "helium witte dwerg": [
        "🌌 Helium witte dwergen zijn heliumrijke resten!",
        "✨ Wil je nu een helium witte dwerg maken?",
        "💫 Zonmassa in kleiner volume - superdicht!",
        "🔭 Laten we langzame afkoeling simuleren!",
        "🌠 Een theelepel weegt miljarden tonnen!",
        "🚀 Hebben heliumatmosferen!",
        "📊 Tip: Gebruik 'Helium Witte Dwergmodus' voor interacties",
        "🌍 Eindbestemming voor heliumverbrandende sterren!",
        "💥 Wil je zien hoe ze materiaal verzamelen?",
        "🌡️ Temperatuur tussen 5000K-100000K!",
        "🔄 Laten we een systeem met meerdere helium witte dwergen maken!",
        "✨ Essentieel voor stellaire evolutiebegrip!",
        "🌌 Sommige exploderen als Type Ia supernova's!",
        "💫 Uitdaging: Maak een systeem met rotsplaneet!",
        "📈 Atmosferen rijk aan helium en koolstof!",
        "🌠 Tip: Activeer 'Afkoeleffecten' voor temperatuurverandering",
        "🚀 Kun je je een expeditie naar een helium witte dwerg voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Uiteindelijke resten van heliumverbrandende sterren!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "koolstof witte dwerg": [
        "🌌 Koolstof witte dwergen zijn koolstofrijke resten!",
        "✨ Wil je nu een koolstof witte dwerg maken?",
        "💫 Zonmassa in kleiner volume - superdicht!",
        "🔭 Laten we langzame afkoeling simuleren!",
        "🌠 Een theelepel weegt miljarden tonnen!",
        "🚀 Hebben koolstofatmosferen!",
        "📊 Tip: Gebruik 'Koolstof Witte Dwergmodus' voor interacties",
        "🌍 Eindbestemming voor koolstofverbrandende sterren!",
        "💥 Wil je zien hoe ze materiaal verzamelen?",
        "🌡️ Temperatuur tussen 5000K-100000K!",
        "🔄 Laten we een systeem met meerdere koolstof witte dwergen maken!",
        "✨ Essentieel voor stellaire evolutiebegrip!",
        "🌌 Sommige exploderen als Type Ia supernova's!",
        "💫 Uitdaging: Maak een systeem met rotsplaneet!",
        "📈 Atmosferen rijk aan koolstof en zuurstof!",
        "🌠 Tip: Activeer 'Afkoeleffecten' voor temperatuurverandering",
        "🚀 Kun je je een expeditie naar een koolstof witte dwerg voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Uiteindelijke resten van koolstofverbrandende sterren!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "zwarte dwerg": [
        "🌌 Zwarte dwergen zijn volledig afgekoelde witte dwergen!",
        "✨ Wil je nu een zwarte dwerg maken?",
        "💫 Geen zichtbaar licht - volledig koud!",
        "🔭 Laten we afkoeling tot zwarte dwerg simuleren!",
        "🌠 Theoretisch - nog nooit waargenomen!",
        "🚀 Onwaarneembaar door lage temperatuur!",
        "📊 Tip: Gebruik 'Zwarte Dwergmodus' voor tijdseffecten",
        "🌍 Uiteindelijke resten van uitgedoofde sterren!",
        "💥 Wil je de transformatie van witte naar zwarte dwerg zien?",
        "🌡️ Temperatuur bijna absoluut nulpunt!",
        "🔄 Laten we een systeem met meerdere zwarte dwergen maken!",
        "✨ Belangrijk voor langetermijn stellaire evolutie!",
        "🌌 Vorming duurt biljoenen jaren!",
        "💫 Uitdaging: Maak een systeem met planeten!",
        "📈 Atmosferen extreem dun of afwezig!",
        "🌠 Tip: Activeer 'Afkoeleffecten' voor realistische weergave",
        "🚀 Kun je je een expeditie naar een theoretische zwarte dwerg voorstellen?",
        "🔭 Laten we onderzoeken hoe ze planetaire banen beïnvloeden!",
        "💥 Eindstadium na biljoenen jaren evolutie!",
        "✨ Wil je meer leren over hun theoretische eigenschappen?"
    ],
    "quasar": [
        "🌌 Quasars zijn heldere galactische kernen!",
        "✨ Wil je nu een quasar maken?",
        "💫 Aangedreven door supermassieve accretieschijven!",
        "🔭 Laten we intense stralingsemissie simuleren!",
        "🌠 Kunnen miljarden keren helderder zijn dan de zon!",
        "🚀 Enkele van de helderste objecten in het universum!",
        "📊 Tip: Gebruik 'Quasarmodus' voor galactische effecten",
        "🌍 Gevonden in actieve verre sterrenstelsels!",
        "💥 Wil je relativistische materiestralen zien?",
        "🌡️ Temperatuur kan miljarden graden Kelvin bereiken!",
        "🔄 Laten we een systeem met omringende sterrenstelsels maken!",
        "✨ Essentieel voor begrip van galactische evolutie!",
        "🌌 Kunnen gebruikt worden om universexpansie te bestuderen!",
        "💫 Uitdaging: Maak een quasar met accretieschijf en stralen!",
        "📈 Massa van miljoenen tot miljarden zonnemassa's!",
        "🌠 Tip: Activeer 'Stralingseffecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een verre quasar voorstellen?",
        "🔭 Laten we onderzoeken hoe quasars sterrenstelselvorming beïnvloeden!",
        "💥 Vaker voorkomend in het vroege universum!",
        "✨ Wil je meer leren over hun vorming?"
    ],
    "wormgat": [
        "🌌 Wormgaten zijn theoretische ruimtetijd-tunnels!",
        "✨ Wil je nu een wormgat maken?",
        "💫 Verbinden verre punten in het universum via een shortcut!",
        "🔭 Laten we ruimtetijdkromming simuleren!",
        "🌠 Theoretische oplossingen uit de algemene relativiteit!",
        "🚀 Kunnen sneller-dan-lichtreizen mogelijk maken!",
        "📊 Tip: Gebruik 'Wormgatmodus' voor ruimtevervorming",
        "🌍 Hypothetisch - nog nooit waargenomen!",
        "💥 Wil je lichtvervorming rond een wormgat zien?",
        "🌡️ Theoretische temperatuur afhankelijk van structuur!",
        "🔄 Laten we een systeem maken dat twee ruimteregio's verbindt!",
        "✨ Cruciaal voor begrip van relativiteit en universumstructuur!",
        "🌌 Kunnen mogelijk tijdreizen mogelijk maken!",
        "💫 Uitdaging: Maak een stabiel wormgat en ontdek eigenschappen!",
        "📈 Meestal theoretisch zonder fysieke manifestatie!",
        "🌠 Tip: Activeer 'Krommingseffecten' voor ruimtevervorming",
        "🚀 Kun je je een reis door een wormgat naar een ander sterrenstelsel voorstellen?",
        "🔭 Laten we onderzoeken hoe wormgaten ruimtetijd beïnvloeden!",
        "💥 Populair in sci-fi als portalen naar andere dimensies!",
        "✨ Wil je meer leren over hun theoretische implicaties?"
    ],
    "neutronenster": [
        "🌌 Neutronensterren zijn superdichte supernovaresten!",
        "✨ Wil je nu een neutronenster maken?",
        "💫 Bijna volledig samengesteld uit neutronen!",
        "🔭 Laten we extreme zwaartekracht simuleren!",
        "🌠 Een theelepel materiaal weegt miljarden tonnen!",
        "🚀 Kunnen snel ronddraaien en stralingsbundels uitzenden!",
        "📊 Tip: Gebruik 'Neutronenstermodus' voor ruimte-effecten",
        "🌍 Gevormd wanneer massieve sterren in supernova's exploderen!",
        "💥 Wil je krachtige gammastralen zien?",
        "🌡️ Temperatuur kan miljoenen graden Kelvin bereiken!",
        "🔄 Laten we een systeem met omringende planeten maken!",
        "✨ Essentieel voor begrip van stellaire evolutie en kernfysica!",
        "🌌 Sommige worden pulsars of magnetars!",
        "💫 Uitdaging: Maak er een met een intens magnetisch veld!",
        "📈 Massa tussen 1.4 en 2.16 zonnemassa's!",
        "🌠 Tip: Activeer 'Magnetische effecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een neutronenster voorstellen?",
        "🔭 Laten we onderzoeken hoe ze galactische evolutie beïnvloeden!",
        "💥 De dichtste bekende objecten in het universum!",
        "✨ Wil je meer leren over hun vorming?"
    ],
    "magnetar": [
        "🌌 Magnetars hebben extreem krachtige magnetische velden!",
        "✨ Wil je nu een magnetar maken?",
        "💫 Magnetische velden triljoenen keer sterker dan op aarde!",
        "🔭 Laten we intense stralingsemissie simuleren!",
        "🌠 Kunnen krachtige gammaflitsen (SGR's) uitzenden!",
        "🚀 Beïnvloeden hun omgeving met magnetische golven!",
        "📊 Tip: Gebruik 'Magnetarmodus' voor omgevingseffecten",
        "🌍 Gevormd uit sterk gemagnetiseerde neutronensterren!",
        "💥 Wil je relativistische materiestralen zien?",
        "🌡️ Temperatuur kan miljoenen graden Kelvin bereiken!",
        "🔄 Laten we een systeem met omringende planeten maken!",
        "✨ Belangrijk voor begrip van magnetische fysica!",
        "🌌 Kunnen geassocieerde pulsars hebben!",
        "💫 Uitdaging: Maak er een met extreem magnetisch veld!",
        "📈 Massa tussen 1.4 en 2.16 zonnemassa's!",
        "🌠 Tip: Activeer 'Magnetische effecten' voor omgevingsinvloed",
        "🚀 Kun je je een expeditie naar een magnetar voorstellen?",
        "🔭 Laten we onderzoeken hoe ze galactische evolutie beïnvloeden!",
        "💥 De meest magnetische objecten in het universum!",
        "✨ Wil je meer leren over hun evolutie?"
    ],
    "quarkster": [
        "🌌 Quarksterren zijn theoretische neutronenster-opvolgers!",
        "✨ Wil je nu een quarkster maken?",
        "💫 Samengesteld uit quarks en gluonen - exotische materie!",
        "🔭 Laten we extreme dichtheid simuleren!",
        "🌠 Mogelijk dichter dan neutronensterren!",
        "🚀 Hypothetisch - nog nooit waargenomen!",
        "📊 Tip: Gebruik 'Quarkstermodus' voor ruimte-effecten",
        "🌍 Gevormd wanneer neutronensterren verder instorten!",
        "💥 Wil je intense straling zien?",
        "🌡️ Theoretische temperatuur afhankelijk van structuur!",
        "🔄 Laten we een systeem met omringende planeten maken!",
        "✨ Cruciaal voor deeltjesfysica onder extreme omstandigheden!",
        "🌌 Hebben mogelijk unieke eigenschappen door hun samenstelling!",
        "💫 Uitdaging: Maak een quarkster en ontdek exotische eigenschappen!",
        "📈 Meestal theoretisch zonder fysieke manifestatie!",
        "🌠 Tip: Activeer 'Exotische effecten' voor ruimtevervorming",
        "🚀 Kun je je een reis door een quarkster voorstellen?",
        "🔭 Laten we onderzoeken hoe ze ruimtetijd beïnvloeden!",
        "💥 Een van de grootste mysteries in de astrofysica!",
        "✨ Wil je meer leren over hun theoretische implicaties?"
    ]
};

const contextFollowUps = {
    "default": [
        "✨ Wat vond je van deze kosmische uitleg?",
        "🚀 Kan ik je ergens anders mee helpen?",
        "🌌 Interessant, toch? Het universum is fascinerend!",
        "💫 Wil je dit onderwerp verder verkennen?",
        "🔭 Ik deel graag kosmische kennis!",
        "🪐 Nog aanvullende vragen hierover?",
        "🌟 We hebben vandaag iets geweldigs geleerd, toch?",
        "⚡ Het universum verrast ons altijd weer!",
        "🌠 Wil je dat ik een aspect verder uitleg?",
        "🌀 Zullen we nu samen iets creëren?",
        "📡 Je nieuwsgierigheid is de brandstof van ontdekking!",
        "🌍 Wat fascineert je het meest in de kosmos?",
        "☄️ Klaar voor je volgende sterrenvraag?",
        "🛸 Onthoud: Elke vraag is een kosmische reis!",
        "💥 Wil je een praktisch experiment proberen?",
        "⏳ Kennis is de ware tijdreis!",
        "📊 Zal ik laten zien hoe je dit in het spel toepast?",
        "🌡️ Je vragen warmen mijn AI-kern op!",
        "🔢 Zullen we samen iets berekenen?",
        "🌈 Het universum waardeert je nieuwsgierigheid!"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
    affirmativeResponses: ["ja", "j", "yes", "y", "natuurlijk", "zeker", "oké", "laten we", "misschien", "alsjeblieft"],
    negativeResponses: ["nee", "n", "no", "negatief", "nope", "misschien later", "nu niet"],
    
    positiveResponses: {
        "zwart gat": [
            "🌌 Laten we simuleren! Maak eerst een ster met 1e30 massa's in de buurt van een zwart gat...",
            "💥 Geweldig! Sleep een ster naar de accretieschijf en activeer slow motion om het spektakel te zien",
            "⚠️ Let op: Activeer 'Relativistische Effecten' in Opties > Natuurkunde om de ruimte-tijdvervorming te zien",
            "🔥 Tip: Gebruik sterren met massa > 20 zonnen om dramatischere materiaaluitstotingen te zien",
            "🕳️ Stap voor stap: 1) Maak een zwart gat 2) Voeg een nabije ster toe 3) Verhoog de zwaartekracht tot 200%",
            "⏱️ Versnel de tijd met 10000x om het hele proces in enkele seconden te zien",
            "📡 Vergeet niet 'Thermische Zones' te activeren om het oververhitte plasma (>1 miljoen °C) te zien",
            "🌀 Wist je dat: Het proces kan uren tot miljoenen jaren duren in echte universumtijd",
            "💫 Voor ongelooflijke visuele effecten, gebruik superzware zwarte gaten (>1e15 massa's)",
            "🌠 Probeer verschillende invalshoeken om verschillende schijfpatronen te zien"
        ],
        "komeet": [
            "☄️ Laten we beginnen! Selecteer 'Creëer Hemellichamen' > 'Komeet' en stel de temperatuur in op -70°C...",
            "💧 Tip: Kometen met hoog watergehalte (>60%) creëren heldere staarten",
            "🚀 Sleep met de muis om hoeksnelheid te geven - dit beïnvloedt de rotatie van de kern",
            "❄️ Om sublimatie te zien, breng de komeet nabij een O- of B-klasse ster",
            "🌌 Probeer verschillende excentriciteiten: >0.9 voor langgerekte banen",
            "⏱️ Gebruik 100000x-modus om meerdere omlopen snel te zien",
            "🔭 Activeer 'Toon Vectoren' om zwaartekrachtskrachten te visualiseren",
            "🌠 Wist je dat: Elke sterrenpassage vermindert de kometenmassa met 0.01%",
            "🪐 Probeer een komeet te vangen met virtuele Jupiter - massa > 1e27 eenheden",
            "📈 Gevorderde tip: Kometen in 2:1-resonantie met planeten hebben stabiele banen"
        ],
        "zwaartekracht": [
            "⚖️ Laten we experimenteren! Ga naar Menu > Natuurkunde > Zwaartekrachtconstante...",
            "🌌 Probeer 10% voor nevelsimulaties of 300% voor compacte stersystemen",
            "💥 Waarschuwing: Waarden >500% kunnen instabiliteiten veroorzaken in complexe systemen",
            "🔄 Tip: Dubbelstersystemen met hoge zwaartekracht evolueren sneller",
            "🪐 Om zwaartekrachtgolven te zien, creëer twee nabije zwarte gaten",
            "🌠 Activeer 'Krachtvisualisatie' (F3) om zwaartekrachtvelden te zien",
            "📉 Probeer zwaartekracht te verminderen tijdens planetaire migratie",
            "🌀 Interessant effect: Hoge zwaartekracht + snelle rotatie creëert afgeplante planeten",
            "🔭 Vergeet niet: Zwarte gaten hebben vaste 1000x zwaartekrachtvermenigvuldiger",
            "💫 Uitdaging: Creëer een stabiel systeem met 20 lichamen en zwaartekracht op 200%"
        ],
        "ster": [
            "⭐ Laten we creëren! Selecteer 'Stellaire Lichamen' en kies het type...",
            "🌞 Voor een zon-achtige ster: massa ~1.989e30 kg (1 zonnemassa)",
            "💥 Tip: Sterren boven 20 zonnemassa's exploderen als supernova's",
            "🌈 Stel temperatuur in op >30.000K voor intense blauwe sterren",
            "🔄 Experimenteer met dubbelstersystemen met massaoverdracht",
            "🌌 Gebruik hoge metalliteit voor populatie I-sterren (jong)",
            "⏱️ Versnel tijd om volledige stellaire evolutie te zien",
            "⚠️ Waarschuwing: Sterren >100 zonnemassa's kunnen instabiel zijn",
            "🔭 Activeer 'Stellaire Evolutie' in Opties om transformaties te zien",
            "🌠 Voor neutronensterren, creëer supernova's met massa >1.4 zonnemassa"
        ],
        "planeet": [
            "🪐 Laten we beginnen! Menu 'Planetaire Lichamen' > Kies type...",
            "🌍 Voor bewoonbare planeet: plaats in groene zone, water 50%, atmosfeer 80%",
            "🌋 Probeer extreme samenstellingen: koolstof- of ijzerplaneten",
            "🌀 Pas rotatieperiode aan om effecten op klimaat en vorm te zien",
            "💫 Tip: Gasreuzen hebben massa >105K eenheden nodig",
            "🌌 Creëer systemen met geactiveerde planetaire migratie",
            "🌠 Voor planetaire ringen, pas dikte en dichtheid aan in kenmerkenmenu",
            "⚠️ Manen die te dichtbij komen desintegreren bij Roche-limiet",
            "🔭 Gebruik 'Observatorium'-modus (O) om oppervlaktedetails te zien",
            "🌡️ Probeer extreme temperaturen voor automatische klasseveranderingen"
        ],
        "meteoroïde": [
            "🌠 Laten we een meteoroïde maken! Ga naar 'Creëer Hemellichamen' > 'Meteoroïde'...",
            "💫 Tip: Pas dichtheid aan voor verschillende inslageffecten",
            "🪨 Gebruik slow motion-modus om atmosfeerintrede te observeren",
            "⚠️ Waarschuwing: Grote meteoroïden (>100m) kunnen massa-extincties veroorzaken",
            "🌌 Probeer verschillende samenstellingen: metallisch, rotsachtig, ijzig",
            "🔭 Activeer 'Inslaatraject' om mogelijke botsingen te zien",
            "📈 Versnel tijd om meteorenregens in actie te zien",
            "🌠 Wist je dat: Meteoroïden zijn fragmenten van asteroïden of kometen",
            "💥 Voor explosiesimulaties, stel intreesnelheid in >20 km/s",
            "🌀 Uitdaging: Creëer een systeem met 10 gelijktijdig botsende meteoroïden"
        ],
        "meteoor": [
            "🌠 Laten we een meteoor maken! Ga naar 'Creëer Hemellichamen' > 'Meteoor'...",
            "💫 Tip: Pas dichtheid aan voor verschillende inslageffecten",
            "🪨 Gebruik slow motion-modus om atmosfeerintrede te observeren",
            "⚠️ Waarschuwing: Grote meteoroïden (>100m) kunnen massa-extincties veroorzaken",
            "🌌 Probeer verschillende samenstellingen: metallisch, rotsachtig, ijzig",
            "🔭 Activeer 'Inslaatraject' om mogelijke botsingen te zien",
            "📈 Versnel tijd om meteorenregens in actie te zien",
            "🌠 Wist je dat: Meteoroïden zijn fragmenten van asteroïden of kometen",
            "💥 Voor explosiesimulaties, stel intreesnelheid in >20 km/s",
            "🌀 Uitdaging: Creëer een systeem met 10 gelijktijdig botsende meteoroïden"
        ],
        "gasreus": [
            "🌌 Laten we een gasreus maken! Ga naar 'Creëer Hemellichamen' > 'Gasreus'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische effecten",
            "🌀 Gebruik slow motion-modus om gigantische stormen te observeren",
            "⚠️ Waarschuwing: Zeer massieve gasreuzen (>10x Jupiter) kunnen bruine dwergen worden",
            "🌠 Probeer verschillende atmosfeersamenstellingen: waterstof, helium, methaan",
            "🔭 Activeer 'Planetaire Ringen' om ringen toe te voegen",
            "📈 Versnel tijd om atmosferische evolutie te zien",
            "🌌 Wist je dat: Jupiter heeft al eeuwen een storm groter dan de Aarde!",
            "💥 Voor aurora-simulaties, pas het magnetisch veld van de planeet aan",
            "🪐 Uitdaging: Creëer een systeem met 5 gasreuzen die een ster omcirkelen"
        ],
        "asteroïde": [
            "🪨 Laten we een asteroïde maken! Ga naar 'Creëer Hemellichamen' > 'Asteroïde'...",
            "🌌 Tip: Pas dichtheid aan voor verschillende rotsachtige samenstellingen",
            "💫 Gebruik slow motion-modus om botsingen met planeten te observeren",
            "⚠️ Waarschuwing: Grote asteroïden (>1 km) kunnen massa-extincties veroorzaken",
            "🌠 Probeer verschillende banen: elliptisch, cirkelvormig, gekanteld",
            "🔭 Activeer 'Inslaatraject' om mogelijke botsingen te zien",
            "📈 Versnel tijd om asteroïdenmigratie te zien",
            "🌀 Wist je dat: De asteroïdengordel tussen Mars en Jupiter bevat miljoenen objecten!",
            "💥 Voor explosiesimulaties, stel botsingssnelheid in >20 km/s",
            "🌌 Uitdaging: Creëer een systeem met 10 gelijktijdig botsende asteroïden"
        ],
        "planetoïde": [
            "🪐 Laten we een planetoïde maken! Ga naar 'Creëer Hemellichamen' > 'Planetoïde'...",
            "🌌 Tip: Pas massa aan voor verschillende geologische kenmerken",
            "💫 Gebruik slow motion-modus om rotatie en tektoniek te observeren",
            "⚠️ Waarschuwing: Zeer massieve planetoïden kunnen dwergplaneten worden",
            "🌠 Probeer verschillende samenstellingen: ijs, rots, metaal",
            "🔭 Activeer 'Planetaire Ringen' om ringen toe te voegen",
            "📈 Versnel tijd om geologische evolutie te zien",
            "🌀 Wist je dat: Pluto wordt door veel astronomen als planetoïde beschouwd!",
            "💥 Voor impactsimulaties, stel botsingssnelheid in >10 km/s",
            "🌌 Uitdaging: Creëer een systeem met 5 planetoïden die een ster omcirkelen"
        ],
        "wormgat": [
            "🌀 Laten we een wormgat maken! Ga naar 'Creëer Hemellichamen' > 'Wormgat'...",
            "🌌 Tip: Pas negatieve massa aan voor verschillende vervormingseffecten",
            "💫 Gebruik slow motion-modus om ruimte-tijdkromming te observeren",
            "⚠️ Waarschuwing: Wormgaten zijn theoretisch en instabiel in werkelijkheid",
            "🌠 Probeer verschillende in-/uitgangspunten in ruimte-tijd",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om wormgatevolutie te zien",
            "🌀 Wist je dat: Wormgaten verre punten in het universum kunnen verbinden!",
            "💥 Voor instant reizen, pas afstand tussen punten aan",
            "🌌 Uitdaging: Creëer een systeem met 3 wormgaten die sterrenstelsels verbinden"
        ],
        "leefbare zone": [
            "🌍 Laten we een leefbare zone maken! Ga naar 'Creëer Hemellichamen' > 'Leefbare Zone'...",
            "💫 Tip: Pas afstand tot ster aan voor verschillende leefbare zones",
            "🌌 Gebruik slow motion-modus om atmosfeervorming te observeren",
            "⚠️ Waarschuwing: Zones te dichtbij kunnen door intense straling worden beïnvloed",
            "🌠 Probeer verschillende atmosfeersamenstellingen: zuurstof, stikstof, waterdamp",
            "🔭 Activeer 'Klimaateffecten' om stormen en atmosferische patronen te zien",
            "📈 Versnel tijd om evolutie van leefbare zone te zien",
            "🌀 Wist je dat: De Aarde bevindt zich al miljarden jaren in de leefbare zone van de Zon!",
            "💥 Voor levenssimulatie, stel gemiddelde temperatuur in tussen 0°C en 100°C",
            "🌌 Uitdaging: Creëer een systeem met 5 leefbare zones rond een ster"
        ],
        "quasar": [
            "🌌 Laten we een quasar maken! Ga naar 'Creëer Hemellichamen' > 'Quasar'...",
            "💫 Tip: Pas quasar-massa aan om zijn sterrenstelsel te beheersen",
            "🌠 Gebruik slow motion-modus om intense stralingsemissie te observeren",
            "⚠️ Waarschuwing: Quasars zijn extreem lichtsterk en kunnen hele sterrenstelsels overstralen",
            "🌟 Probeer verschillende materiaalsamenstellingen in accretieschijf",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om quasarevolutie te zien",
            "🌀 Wist je dat: Quasars zijn de helderste objecten in het universum!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 quasars die verre sterrenstelsels verbinden"
        ],
        "bruine dwerg": [
            "🌌 Laten we een bruine dwerg maken! Ga naar 'Creëer Hemellichamen' > 'Bruine Dwerg'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Bruine dwergen zijn tussenobjecten tussen sterren en planeten",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van bruine dwerg te zien",
            "🌀 Wist je dat: Bruine dwergen hebben geen duurzame kernfusie zoals sterren!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 bruine dwergen rond een ster"
        ],
        "rode dwerg": [
            "🌌 Laten we een rode dwerg maken! Ga naar 'Creëer Hemellichamen' > 'Rode Dwerg'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Rode dwergen zijn de meest voorkomende sterren in het universum",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van rode dwerg te zien",
            "🌀 Wist je dat: Rode dwergen kunnen biljoenen jaren leven!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 5 rode dwergen rond een ster"
        ],
        "reuzenster": [
            "🌌 Laten we een reuzenster maken! Ga naar 'Creëer Hemellichamen' > 'Reuzenster'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Reuzensterren zijn veel groter dan de Zon en kunnen supernova worden",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van reuzenster te zien",
            "🌀 Wist je dat: Reuzensterren kunnen tot 1000x de diameter van de Zon hebben!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 reuzensterren rond een ster"
        ],
        "hyperreus": [
            "🌌 Laten we een hyperreus maken! Ga naar 'Creëer Hemellichamen' > 'Hyperreus'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Hyperreuzen zijn de meest massieve bekende sterren en kunnen supernova worden",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van hyperreus te zien",
            "🌀 Wist je dat: Hyperreuzen kunnen tot 1000x de diameter van de Zon hebben!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 hyperreuzen rond een ster"
        ],
        "massieve ster": [
            "🌌 Laten we een massieve ster maken! Ga naar 'Creëer Hemellichamen' > 'Massieve Ster'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Massieve sterren zijn veel groter dan de Zon en kunnen supernova worden",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van massieve ster te zien",
            "🌀 Wist je dat: Massieve sterren kunnen tot 100x de diameter van de Zon hebben!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 massieve sterren rond een ster"
        ],
        "supermassieve ster": [
            "🌌 Laten we een supermassieve ster maken! Ga naar 'Creëer Hemellichamen' > 'Supermassieve Ster'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Supermassieve sterren zijn de meest massieve bekende sterren en kunnen supernova worden",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van supermassieve ster te zien",
            "🌀 Wist je dat: Supermassieve sterren kunnen tot 1000x de diameter van de Zon hebben!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 supermassieve sterren rond een ster"
        ],
        "witte dwerg": [
            "🌌 Laten we een witte dwerg maken! Ga naar 'Creëer Hemellichamen' > 'Witte Dwerg'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Witte dwergen zijn overblijfselen van sterren zonder brandstof",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van witte dwerg te zien",
            "🌀 Wist je dat: Witte dwergen zijn extreem dicht en klein!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 witte dwergen rond een ster"
        ],
        "helium witte dwerg": [
            "🌌 Laten we een helium witte dwerg maken! Ga naar 'Creëer Hemellichamen' > 'Helium Witte Dwerg'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om heliumfusie in koolstof en zuurstof te observeren",
            "⚠️ Waarschuwing: Helium witte dwergen zijn overblijfselen van sterren zonder brandstof",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van helium witte dwerg te zien",
            "🌀 Wist je dat: Helium witte dwergen zijn extreem dicht en klein!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 helium witte dwergen rond een ster"
        ],
        "koolstof witte dwerg": [
            "🌌 Laten we een koolstof witte dwerg maken! Ga naar 'Creëer Hemellichamen' > 'Koolstof Witte Dwerg'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om koolstoffusie in zuurstof en stikstof te observeren",
            "⚠️ Waarschuwing: Koolstof witte dwergen zijn overblijfselen van sterren zonder brandstof",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van koolstof witte dwerg te zien",
            "🌀 Wist je dat: Koolstof witte dwergen zijn extreem dicht en klein!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 koolstof witte dwergen rond een ster"
        ],
        "zwarte dwerg": [
            "🌌 Laten we een zwarte dwerg maken! Ga naar 'Creëer Hemellichamen' > 'Zwarte Dwerg'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om waterstoffusie in helium te observeren",
            "⚠️ Waarschuwing: Zwarte dwergen zijn overblijfselen van sterren zonder brandstof",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van zwarte dwerg te zien",
            "🌀 Wist je dat: Zwarte dwergen zijn extreem dicht en klein!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 zwarte dwergen rond een ster"
        ],
        "neutronenster": [
            "🌌 Laten we een neutronenster maken! Ga naar 'Creëer Hemellichamen' > 'Neutronenster'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om neutronenfusie in protonen en elektronen te observeren",
            "⚠️ Waarschuwing: Neutronensterren zijn extreem dicht en klein!",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van neutronenster te zien",
            "🌀 Wist je dat: Neutronensterren kunnen tot 1000 keer per seconde ronddraaien!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 neutronensterren rond een ster"
        ],
        "magnetar": [
            "🌌 Laten we een magnetar maken! Ga naar 'Creëer Hemellichamen' > 'Magnetar Neutronenster'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om neutronenfusie in protonen en elektronen te observeren",
            "⚠️ Waarschuwing: Magnetar neutronensterren zijn extreem dicht en klein!",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van magnetar te zien",
            "🌀 Wist je dat: Magnetars kunnen magnetische velden hebben die biljoenen keren sterker zijn dan op Aarde!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 magnetars rond een ster"
        ],
        "quarkster": [
            "🌌 Laten we een quarkster maken! Ga naar 'Creëer Hemellichamen' > 'Quarkster'...",
            "💫 Tip: Pas massa aan voor verschillende atmosferische kenmerken",
            "🌠 Gebruik slow motion-modus om quarkfusie in protonen en neutronen te observeren",
            "⚠️ Waarschuwing: Quarksterren zijn extreem dicht en klein!",
            "🌟 Probeer verschillende atmosfeersamenstellingen: methaan, water, ammoniak",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van quarkster te zien",
            "🌀 Wist je dat: Quarksterren kunnen nog dichter zijn dan neutronensterren!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 quarksterren rond een ster"
        ],
        "ruimtestof": [
            "🌌 Laten we ruimtestof creëren! Ga naar 'Creëer Hemellichamen' > 'Ruimtestof'...",
            "💫 Tip: Pas dichtheid aan voor verschillende stofsamenstellingen",
            "🌠 Gebruik slow motion-modus om stofwolkenvorming te observeren",
            "⚠️ Waarschuwing: Ruimtestof kan samenklonteren tot planetesimalen",
            "🌟 Probeer verschillende samenstellingen: silicaat, koolstof, ijs",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om evolutie van ruimtestof te zien",
            "🌀 Wist je dat: Ruimtestof is essentieel bij vorming van sterren en planeten!",
            "💥 Voor botsingssimulaties, pas botsingssnelheid tussen deeltjes aan",
            "🌌 Uitdaging: Creëer een systeem met 5 interagerende ruimtestofwolken"
        ],
        "nevel": [
            "🌌 Laten we een nevel maken! Ga naar 'Creëer Hemellichamen' > 'Nevel'...",
            "💫 Tip: Pas dichtheid aan voor verschillende gas- en stofsamenstellingen",
            "🌠 Gebruik slow motion-modus om stervorming binnen de nevel te observeren",
            "⚠️ Waarschuwing: Nevels kunnen geboorteplaatsen zijn van nieuwe sterren",
            "🌟 Probeer verschillende samenstellingen: waterstof, helium, koolstof",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om nevelevolutie te zien",
            "🌀 Wist je dat: Nevels zijn cruciaal bij recycling van sterrenmateriaal!",
            "💥 Voor explosiesimulaties, pas uitbreidingssnelheid van nevel aan",
            "🌌 Uitdaging: Creëer een systeem met 3 interagerende nevels"
        ],
        "singulariteit": [
            "🌌 Laten we een singulariteit maken! Ga naar 'Creëer Hemellichamen' > 'Singulariteit'...",
            "💫 Tip: Pas massa aan voor verschillende zwaartekrachts effecten",
            "🌠 Gebruik slow motion-modus om ruimte-tijdvervorming te observeren",
            "⚠️ Waarschuwing: Singulariteiten zijn punten van oneindige dichtheid en extreme kromming",
            "🌟 Probeer verschillende samenstellingen: normale materie, exotische materie",
            "🔭 Activeer 'Relativistische Effecten' om lichtvervorming te zien",
            "📈 Versnel tijd om singulariteitevolutie te zien",
            "🌀 Wist je dat: Singulariteiten zijn theoretisch en niet direct waarneembaar!",
            "💥 Voor relativistische jets, pas rotatiesnelheid van schijf aan",
            "🌌 Uitdaging: Creëer een systeem met 3 interagerende singulariteiten"
        ],
        "standaard": [
            "🚀 Laten we samen exploreren! Wat wil je precies creëren?",
            "🌌 Ik kan je stap voor stap begeleiden in deze kosmische simulatie!",
            "💫 Geweldig! Begin met het selecteren van het juiste menu om je hemellichaam te maken",
            "🔭 Laten we specificeren: welke specifieke parameter wil je eerst aanpassen?",
            "🪐 Eerste stap: ga naar het creatiemenu in de rechter benedenhoek",
            "🌠 Ik stel voor om met standaardwaarden te beginnen en geleidelijk aan te passen",
            "⚡ Voor beste resultaten, activeer 'Volledige Precisie' in Opties > Natuurkunde",
            "📊 Wil je dat ik nu een praktisch voorbeeld laat zien?",
            "🌀 Laten we beginnen met het creëren van de basiscomponenten van je systeem",
            "✨ Typ 'help' op elk moment om creatieopties te zien"
        ]
    },
    
    negativeResponses: {
        "zwart gat": [
            "🕳️ Geen probleem! Zwarte gaten kunnen wachten...",
            "🌌 Prima, deze kosmische monsters gaan nergens heen!",
            "💫 Wanneer je materie wilt zien spaghettificeren, ben ik er!",
            "⚠️ Voorzichtig! Beter afstand houden van deze kosmische verslinders",
            "🔭 Misschien neutronensterren verkennen? Die zijn net zo fascinerend!",
            "🌠 Wist je dat het kleinste bekende zwarte gat slechts 3.8 zonnemassa's heeft?",
            "🌀 Superzware zwarte gaten in sterrenstelselkernen kunnen miljarden zonnemassa's hebben!",
            "💥 Zonder simulatie: niets ontsnapt na de waarnemingshorizon!",
            "⏳ Op een dag zullen zelfs zwarte gaten verdampen door Hawkingstraling",
            "✨ Typ 'zwart gat' wanneer je wilt beginnen"
        ],
        "komeet": [
            "☄️ Geen probleem! Kometen kunnen wachten in hun Oortwolk...",
            "❄️ Prima, deze ijzige reizigers smelten niet zo snel!",
            "🌠 Wanneer je een meteorenregen wilt creëren, sta ik klaar",
            "💫 Wist je dat sommige kometen banen van miljoenen jaren hebben?",
            "🚀 Komeet Hale-Bopp was 18 maanden zichtbaar met blote oog!",
            "🌌 Interstellaire kometen zoals Borisov komen van andere sterrenstelsels!",
            "⏱️ De Rosetta-sonde cirkelde 2 jaar rond komeet Churyumov–Gerasimenko!",
            "🔭 De kern van Halley's komeet is 15km lang en extreem donker!",
            "💧 Kometen bevatten zwaar water met andere verhoudingen dan in aardse oceanen",
            "✨ Typ 'komeet' om deze kosmische boodschappers te verkennen"
        ],
        "zwaartekracht": [
            "⚖️ Geen probleem! Zwaartekracht kan wachten...",
            "🌌 Prima, Einstein zou niet teleurgesteld zijn!",
            "💫 Wanneer je ruimtetijd wilt buigen, ben ik er!",
            "🌀 Wist je dat zwaartekracht 10^36 keer zwakker is dan elektromagnetische kracht?",
            "🌠 In neutronensterren is zwaartekracht 200 miljard keer sterker dan op aarde!",
            "🪐 Jupiter heeft 2.5x meer zwaartekracht - genoeg om kometen te beïnvloeden!",
            "⏱️ Zwaartekracht reist met lichtsnelheid - als de zon verdween, merken we het na 8 minuten!",
            "💥 Alleen in zwarte gaten overwint zwaartekracht alle andere krachten",
            "🔭 Gravitatiewolven in 2015 bevestigden Einsteins voorspelling uit 1916!",
            "✨ Typ 'zwaartekracht' om deze fundamentele kosmische kracht te verkennen"
        ],
        "ster": [
            "⭐ Geen probleem! Sterren kunnen wachten aan de hemel...",
            "🌞 Prima, deze kosmische bakens schijnen nog miljarden jaren!",
            "💫 Wanneer je een supernova wilt maken, ben ik er!",
            "🌌 De dichtstbijzijnde ster, Proxima Centauri, staat op 4.24 lichtjaar!",
            "🔥 De zonnekern bereikt 15 miljoen °C - genoeg voor kernfusie!",
            "🌠 Betelgeuze, een rode superreus, is 1000x groter dan de zon!",
            "⏳ Rode dwergsterren kunnen biljoenen jaren leven - langer dan de huidige leeftijd van het heelal!",
            "💥 Een supernova kan helderder schijnen dan een heel sterrenstelsel!",
            "🌀 Neutronensterren draaien tot 716x per seconde - de precisielichten van het kosmos!",
            "✨ Typ 'ster' om deze kosmische motoren te ontsteken"
        ],
        "planeet": [
            "🪐 Geen probleem! Planeten blijven hun baan volgen...",
            "🌍 Prima, deze buitenaardse werelden gaan nergens heen!",
            "💫 Wanneer je een oceaanwereld wilt maken, ben ik er!",
            "🌌 De dichtstbijzijnde exoplaneet, Proxima Centauri b, staat op slechts 4 lichtjaar!",
            "🌡️ Venus is heter dan Mercurius door een runaway broeikaseffect!",
            "❄️ Pluto heeft waterstofbergen van 3km hoog!",
            "🛰️ Jupiter heeft 79 bekende manen - een miniatuur zonnestelsel!",
            "💥 Aarde is de enige planeet met actieve tektonische platen!",
            "🌀 Exoplaneet WASP-76b heeft regen van gesmolten ijzer op de nachtzijde!",
            "✨ Typ 'planeet' om nieuwe werelden te vormen"
        ],
        "meteoroïde": [
            "🌠 Geen probleem! Meteoroïden vervolgen hun ruimtereis...",
            "🪨 Prima, deze kosmische reizigers verdwijnen niet!",
            "💫 Wanneer je een meteoroïde in actie wilt zien, ben ik er!",
            "☄️ De Tsjeljabinsk meteoroïde explodeerde met 30x de energie van de Hiroshima-bom!",
            "🌌 De meeste meteoren zijn kleiner dan zandkorrels - maar nog steeds indrukwekkend!",
            "🔥 Meteoroïden groter dan 25 meter kunnen aanzienlijke schade veroorzaken!",
            "🔭 De Perseïden meteorenregen is een van de meest zichtbare - altijd spectaculair!",
            "💥 De Toengoeska meteoroïde veroorzaakte een explosie van 15 megaton TNT in 1908!",
            "🌠 Typ 'meteoroïde' om deze kosmische reizigers in actie te zien!"
        ],
        "asteroïde": [
            "🪨 Geen probleem! Asteroïden blijven hun baan volgen...",
            "🌌 Prima, deze rotsblokken verdwijnen niet!",
            "💫 Wanneer je een asteroïde in actie wilt zien, ben ik er!",
            "☄️ Asteroïde 16 Psyche bestaat voornamelijk uit ijzer en nikkel - als een planetaire kern!",
            "🌠 Asteroïde Vesta is zo groot dat hij met blote oog zichtbaar is!",
            "🛰️ Asteroïde Bennu heeft een visachtige vorm - en is een verkenningsdoel!",
            "💥 Asteroïde Apophis passeert in 2029 dicht bij aarde - geen risico op botsing!",
            "🌌 De planetoïdengordel tussen Mars en Jupiter bevat miljoenen rotsachtige lichamen!",
            "🌠 Typ 'asteroïde' om deze bouwstenen van het zonnestelsel te verkennen!"
        ],
        "planetoïde": [
            "🪐 Geen probleem! Planetoïden blijven hun baan volgen...",
            "🌌 Prima, deze kleinere werelden verdwijnen niet!",
            "💫 Wanneer je een planetoïde in actie wilt zien, ben ik er!",
            "🌠 Planetoïde Ceres is het grootste object in de planetoïdengordel en heeft bevroren water!",
            "🛰️ Pluto wordt door veel astronomen als planetoïde beschouwd - en is fascinerend!",
            "💥 Planetoïde Eris is groter dan Pluto en heeft een dunne stikstofatmosfeer!",
            "🌌 Planetoïden zijn overblijfselen uit de vorming van het zonnestelsel - kosmische fossielen!",
            "🌠 Typ 'planetoïde' om deze kleinere werelden te verkennen!"
        ],
        "wormgat": [
            "🌀 Geen probleem! Wormgaten kunnen wachten...",
            "🌌 Prima, deze kosmische tunnels verdwijnen niet!",
            "💫 Wanneer je een wormgat in actie wilt zien, ben ik er!",
            "⚠️ Voorzichtig: Wormgaten zijn theoretisch en instabiel in werkelijkheid",
            "🌠 Wist je dat wormgaten verre punten in het heelal kunnen verbinden?",
            "🔭 Theorie suggereert dat wormgaten instantreizen mogelijk maken!",
            "💥 Zonder simulatie: niets ontsnapt na de waarnemingshorizon!",
            "🌀 Typ 'wormgat' om deze kosmische tunnels te verkennen"
        ],
        "leefbare zone": [
            "🌍 Geen probleem! Leefbare zones kunnen wachten...",
            "🌌 Prima, deze levenslocaties verdwijnen niet!",
            "💫 Wanneer je een leefbare zone in actie wilt zien, ben ik er!",
            "🌠 Aarde bevindt zich al miljarden jaren in de leefbare zone van de zon!",
            "🌡️ Leefbare zones variëren per ster - fascinerend!",
            "🛰️ Exoplaneten in leefbare zones zijn doelen voor buitenaards leven!",
            "💥 Zonder simulatie: leven kan in extreme omgevingen bestaan!",
            "🌌 Typ 'leefbare zone' om deze levenslocaties te verkennen"
        ],
        "quasar": [
            "🌌 Geen probleem! Quasars kunnen wachten...",
            "💫 Prima, deze kosmische bakens verdwijnen niet!",
            "🚀 Wanneer je een quasar in actie wilt zien, ben ik er!",
            "🌠 Quasars zijn de helderste objecten in het heelal - kosmische vuurtorens!",
            "🌀 Wist je dat quasars relativistische jets bijna lichtsnel kunnen uitstoten?",
            "🔭 Licht van sommige quasars reisde miljarden jaren om ons te bereiken!",
            "💥 Zonder simulatie: quasars zijn cruciaal voor galactische evolutie!",
            "✨ Typ 'quasar' om deze kosmische vuurtorens te verkennen"
        ],
        "bruine dwerg": [
            "🌌 Geen probleem! Bruine dwergen kunnen wachten...",
            "💫 Prima, deze tussenobjecten verdwijnen niet!",
            "🚀 Wanneer je een bruine dwerg in actie wilt zien, ben ik er!",
            "🌠 Bruine dwergen zijn mislukte sterren - geen duurzame kernfusie!",
            "🌀 Wist je dat bruine dwergen methaan- en waterrijke atmosferen kunnen hebben?",
            "🔭 Licht van sommige bruine dwergen reisde miljarden jaren!",
            "💥 Zonder simulatie: bruine dwergen zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'bruine dwerg' om deze tussenobjecten te verkennen"
        ],
        "rode dwerg": [
            "🌌 Geen probleem! Rode dwergen kunnen wachten...",
            "💫 Prima, deze kleine sterren verdwijnen niet!",
            "🚀 Wanneer je een rode dwerg in actie wilt zien, ben ik er!",
            "🌠 Rode dwergen zijn de meest voorkomende sterren - stille reuzen!",
            "🌀 Wist je dat rode dwergen biljoenen jaren kunnen leven?",
            "🔭 Licht van sommige rode dwergen reisde miljarden jaren!",
            "💥 Zonder simulatie: rode dwergen zijn fundamenteel voor stellaire evolutie!",
            "✨ Typ 'rode dwerg' om deze kleine sterren te verkennen"
        ],
        "reuzenster": [
            "🌌 Geen probleem! Reuzensterren kunnen wachten...",
            "💫 Prima, deze kosmische kolossen verdwijnen niet!",
            "🚀 Wanneer je een reuzenster in actie wilt zien, ben ik er!",
            "🌠 Reuzensterren zijn veel groter dan de zon en kunnen supernova worden!",
            "🌀 Wist je dat sommige reuzensterren 1000x de diameter van de zon hebben?",
            "🔭 Licht van sommige reuzensterren reisde miljarden jaren!",
            "💥 Zonder simulatie: reuzensterren zijn cruciaal voor galactische evolutie!",
            "✨ Typ 'reuzenster' om deze kosmische kolossen te verkennen"
        ],
        "hyperreus": [
            "🌌 Geen probleem! Hyperreuzen kunnen wachten...",
            "💫 Prima, deze kosmische titanen verdwijnen niet!",
            "🚀 Wanneer je een hyperreus in actie wilt zien, ben ik er!",
            "🌠 Hyperreuzen zijn de meest massieve sterren en kunnen supernova worden!",
            "🌀 Wist je dat sommige hyperreuzen 1000x de diameter van de zon hebben?",
            "🔭 Licht van sommige hyperreuzen reisde miljarden jaren!",
            "💥 Zonder simulatie: hyperreuzen zijn sleutels tot galactische evolutie!",
            "✨ Typ 'hyperreus' om deze kosmische titanen te verkennen"
        ],
        "massieve ster": [
            "🌌 Geen probleem! Massieve sterren kunnen wachten...",
            "💫 Prima, deze kosmische kolossen verdwijnen niet!",
            "🚀 Wanneer je een massieve ster in actie wilt zien, ben ik er!",
            "🌠 Massieve sterren zijn veel groter dan de zon en kunnen supernova worden!",
            "🌀 Wist je dat sommige massieve sterren 100x de diameter van de zon hebben?",
            "🔭 Licht van sommige massieve sterren reisde miljarden jaren!",
            "💥 Zonder simulatie: massieve sterren zijn fundamenteel voor galactische evolutie!",
            "✨ Typ 'massieve ster' om deze kosmische kolossen te verkennen"
        ],
        "supermassieve ster": [
            "🌌 Geen probleem! Supermassieve sterren kunnen wachten...",
            "💫 Prima, deze kosmische titanen verdwijnen niet!",
            "🚀 Wanneer je een supermassieve ster in actie wilt zien, ben ik er!",
            "🌠 Supermassieve sterren zijn de zwaarste bekende sterren en kunnen supernova worden!",
            "🌀 Wist je dat sommige supermassieve sterren 1000x de diameter van de zon hebben?",
            "🔭 Licht van sommige supermassieve sterren reisde miljarden jaren!",
            "💥 Zonder simulatie: supermassieve sterren zijn sleutels tot galactische evolutie!",
            "✨ Typ 'supermassieve ster' om deze kosmische titanen te verkennen"
        ],
        "witte dwerg": [
            "🌌 Geen probleem! Witte dwergen kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een witte dwerg in actie wilt zien, ben ik er!",
            "🌠 Witte dwergen zijn restanten van sterren zonder nucleaire brandstof!",
            "🌀 Wist je dat witte dwergen extreem compact en klein zijn?",
            "🔭 Licht van sommige witte dwergen reisde miljarden jaren!",
            "💥 Zonder simulatie: witte dwergen zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'witte dwerg' om deze stellaire overblijfselen te verkennen"
        ],
        "helium witte dwerg": [
            "🌌 Geen probleem! Helium witte dwergen kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een helium witte dwerg in actie wilt zien, ben ik er!",
            "🌠 Helium witte dwergen zijn restanten van sterren zonder nucleaire brandstof!",
            "🌀 Wist je dat helium witte dwergen extreem compact en klein zijn?",
            "🔭 Licht van sommige helium witte dwergen reisde miljarden jaren!",
            "💥 Zonder simulatie: helium witte dwergen zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'helium witte dwerg' om deze stellaire overblijfselen te verkennen"
        ],
        "koolstof witte dwerg": [
            "🌌 Geen probleem! Koolstof witte dwergen kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een koolstof witte dwerg in actie wilt zien, ben ik er!",
            "🌠 Koolstof witte dwergen zijn restanten van sterren zonder nucleaire brandstof!",
            "🌀 Wist je dat koolstof witte dwergen extreem compact en klein zijn?",
            "🔭 Licht van sommige koolstof witte dwergen reisde miljarden jaren!",
            "💥 Zonder simulatie: koolstof witte dwergen zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'koolstof witte dwerg' om deze stellaire overblijfselen te verkennen"
        ],
        "zwarte dwerg": [
            "🌌 Geen probleem! Zwarte dwergen kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een zwarte dwerg in actie wilt zien, ben ik er!",
            "🌠 Zwarte dwergen zijn de uiteindelijke restanten van volledig afgekoelde sterren!",
            "🌀 Wist je dat zwarte dwergen extreem compact en klein zijn?",
            "🔭 Licht van sommige zwarte dwergen reisde miljarden jaren!",
            "💥 Zonder simulatie: zwarte dwergen zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'zwarte dwerg' om deze stellaire overblijfselen te verkennen"
        ],
        "neutronenster": [
            "🌌 Geen probleem! Neutronensterren kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een neutronenster in actie wilt zien, ben ik er!",
            "🌠 Neutronensterren zijn supernovarestanten en extreem compact!",
            "🌀 Wist je dat een theelepel neutronenster-materie zwaarder is dan de hele mensheid?",
            "🔭 Licht van sommige neutronensterren reisde miljarden jaren!",
            "💥 Zonder simulatie: neutronensterren zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'neutronenster' om deze stellaire overblijfselen te verkennen"
        ],
        "magnetar": [
            "🌌 Geen probleem! Magnetars kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een magnetar in actie wilt zien, ben ik er!",
            "🌠 Magnetars zijn neutronensterren met extreem sterke magnetische velden!",
            "🌀 Wist je dat magnetars krachtige gamma- en röntgenstraling kunnen uitzenden?",
            "🔭 Licht van sommige magnetars reisde miljarden jaren!",
            "💥 Zonder simulatie: magnetars zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'magnetar' om deze stellaire overblijfselen te verkennen"
        ],
        "quarkster": [
            "🌌 Geen probleem! Quarksterren kunnen wachten...",
            "💫 Prima, deze stellaire overblijfselen verdwijnen niet!",
            "🚀 Wanneer je een quarkster in actie wilt zien, ben ik er!",
            "🌠 Quarksterren zijn theoretisch en mogelijk compacter dan neutronensterren!",
            "🌀 Wist je dat quarksterren complexe interne structuren kunnen hebben?",
            "🔭 Licht van sommige quarksterren reisde miljarden jaren!",
            "💥 Zonder simulatie: quarksterren zijn sleutels tot stellaire evolutie!",
            "✨ Typ 'quarkster' om deze stellaire overblijfselen te verkennen"
        ],
        "ruimtestof": [
            "🌌 Geen probleem! Ruimtestof kan wachten...",
            "💫 Prima, deze kosmische deeltjes verdwijnen niet!",
            "🚀 Wanneer je ruimtestof in actie wilt zien, ben ik er!",
            "🌠 Ruimtestof is essentieel voor vorming van sterren en planeten!",
            "🌀 Wist je dat interstellair stof zware elementen bevat uit sterren?",
            "🔭 Licht van sommige stofwolken reisde miljarden jaren!",
            "💥 Zonder simulatie: ruimtestof is cruciaal voor kosmische evolutie!",
            "✨ Typ 'ruimtestof' om deze kosmische deeltjes te verkennen"
        ],
        "nevel": [
            "🌌 Geen probleem! Nevels kunnen wachten...",
            "💫 Prima, deze kosmische wolken verdwijnen niet!",
            "🚀 Wanneer je een nevel in actie wilt zien, ben ik er!",
            "🌠 Nevels zijn stellaire kraamkamers waar nieuwe sterren ontstaan!",
            "🌀 Wist je dat sommige nevels supernovarestanten zijn?",
            "🔭 Licht van sommige nevels reisde miljarden jaren!",
            "💥 Zonder simulatie: nevels zijn sleutels tot kosmische evolutie!",
            "✨ Typ 'nevel' om deze kosmische wolken te verkennen"
        ],
        "singulariteit": [
            "🌌 Geen probleem! Singulariteiten kunnen wachten...",
            "💫 Prima, deze oneindigheids punten verdwijnen niet!",
            "🚀 Wanneer je een singulariteit in actie wilt zien, ben ik er!",
            "🌠 Singulariteiten zijn theoretisch en vertegenwoordigen extreme ruimtetijdkromming!",
            "🌀 Singulariteiten kunnen bestaan in zwarte gaten en quasars!"
        ],
        "standaard": [
            "🌌 Geen probleem! Het heelal is geduldig...",
            "🚀 Prima, kosmische verkenning kan wachten!",
            "💫 Wanneer je wilt doorgaan, ben ik er!",
            "🔭 Wist je dat er meer sterren zijn dan zandkorrels op alle aardse stranden?",
            "🌠 Licht van Andromeda vertrok toen onze voorouders grotten schilderden!",
            "⏳ 99.9% van alle zichtbare materie in het heelal is plasma!",
            "💥 In 1 seconde produceert de zon meer energie dan de hele mensheid in haar geschiedenis!",
            "🌀 Superzware zwarte gaten reguleren galactische groei!",
            "✨ Elk zuurstofatoom in je lichaam is gesmeed in een stellaire kern!",
            "🪐 We zijn allemaal gemaakt van sterrenstof!"
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
        "🧮 Resultaat: {expression} = {result}",
        "🔢 Berekening voltooid: {expression} = {result}",
        "✨ Oplossing: {expression} = {result}",
        "⚡ Opgelost: {expression} = {result}",
        "🌌 Kosmische vergelijking: {expression} = {result}",
        "🪐 Stellair rekenen: {expression} = {result}",
        "💫 Gravitationele berekening: {expression} = {result}",
        "📐 Universele geometrie: {expression} = {result}",
        "📊 Numerieke analyse: {expression} = {result}",
        "🔭 Wiskundige waarneming: {expression} = {result}",
        "🌠 Formule opgelost: {expression} = {result}",
        "🚀 Aangedreven berekening: {expression} = {result}",
        "🛰️ Orbitale uitkomst: {expression} = {result}",
        "⏱️ Rekentijd: 0s | {expression} = {result}",
        "⚖️ Numeriek evenwicht: {expression} = {result}",
        "🌀 Wiskundige vortex: {expression} = {result}",
        "🌡️ Computationele temperatuur: 0K | {expression} = {result}",
        "📈 Numerieke projectie: {expression} = {result}",
        "📉 Inverse analyse: {expression} = {result}",
        "🧪 Numeriek experiment: {expression} = {result}",
        "🔬 Wiskundige microscoop: {expression} = {result}",
        "🖥️ Gesimuleerde kwantumcomputing: {expression} = {result}",
        "💻 Algoritme voltooid: {expression} = {result}",
        "🤖 Robotverwerking: {expression} = {result}",
        "🌟 Numerieke verlichting: {expression} = {result}",
        "🌌 Kosmos opgelost: {expression} = {result}",
        "🧬 Wiskundige genetica: {expression} = {result}",
        "🌠 Numerieke astronomie: {expression} = {result}",
        "🪐 Computationele astrofysica: {expression} = {result}",
        "🔭 Wiskundige telescoop: {expression} = {result}",
        "🌌 Numerieke kosmologie: {expression} = {result}",
        "🌟 Ster opgelost: {expression} = {result}",
        "🌠 Melkwegstelsel berekend: {expression} = {result}",
        "🛸 Numerieke navigatie: {expression} = {result}",
        "🌌 Heelal berekend: {expression} = {result}",
        "🌠 Sterrenbeeld opgelost: {expression} = {result}",
        "🪐 Planeet berekend: {expression} = {result}",
        "🌌 Numerieke nevel: {expression} = {result}",
        "🌠 Supernova opgelost: {expression} = {result}",
        "🛰️ Wiskundige satelliet: {expression} = {result}",
        "🌌 Ruimtetijd berekend: {expression} = {result}",
        "🌠 Gebeurtenishorizon opgelost: {expression} = {result}",
        "🌀 Numerieke singulariteit: {expression} = {result}",
        "🌌 Oerknal berekend: {expression} = {result}",
        "🌠 Kosmische expansie opgelost: {expression} = {result}",
        "🪐 Planetaire ring berekend: {expression} = {result}",
        "🌌 Numeriek wormgat: {expression} = {result}",
        "🌠 Melkweg berekend: {expression} = {result}",
        "🛸 Numeriek ruimteschip: {expression} = {result}",
        "🌌 Multiversum berekend: {expression} = {result}",
        "🌠 Parallelle dimensie opgelost: {expression} = {result}",
        "🪐 Exoplaneet berekend: {expression} = {result}",
        "🌌 Numerieke asteroïde: {expression} = {result}",
        "🌠 Meteoriet opgelost: {expression} = {result}",
        "🛰️ Numerieke ruimtesonde: {expression} = {result}",
        "🌌 Komeet berekend: {expression} = {result}",
        "🌠 Meteorenregen opgelost: {expression} = {result}",
        "🪐 Maan berekend: {expression} = {result}",
        "🌌 Numeriek zonnestelsel: {expression} = {result}",
        "🌠 Planetaire baan opgelost: {expression} = {result}",
        "🛰️ Numeriek ruimtestation: {expression} = {result}",
        "🌌 Spiraalstelsel berekend: {expression} = {result}",
        "🌠 Elliptisch sterrenstelsel opgelost: {expression} = {result}",
        "🪐 Onregelmatig sterrenstelsel berekend: {expression} = {result}",
        "🌌 Numerieke quasar: {expression} = {result}",
        "🌠 Pulsar opgelost: {expression} = {result}",
        "🛰️ Plasmabol berekend: {expression} = {result}"
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
                throw new Error("Ongeldige expressie");
            }
            
            const result = eval(sanitized);
            
            let beschikbareResponses = wiskundeSysteem.responses;
            if (wiskundeSysteem.usedResponses.length > 0) {
                beschikbareResponses = wiskundeSysteem.responses.filter(r => 
                    !wiskundeSysteem.usedResponses.includes(r)
                );
            }
            
            if (beschikbareResponses.length === 0) {
                wiskundeSysteem.usedResponses = [];
                beschikbareResponses = wiskundeSysteem.responses;
            }
            
            const responseTemplate = beschikbareResponses[
                Math.floor(Math.random() * beschikbareResponses.length)
            ];
            
            wiskundeSysteem.usedResponses.push(responseTemplate);
            
            return responseTemplate
                .replace("{expression}", expression)
                .replace("{result}", result);
        } catch (error) {
            return "🤔 Kon niet berekenen. Geldig formaat: '2*(3+5^2)' of 'sqrt(9)'";
        }
    }
};

 
const greetingsSystem  = {
    greetings: ["hallo", "hoi", "hey", "goedemorgen", "goedemiddag", "goedenavond", "goedenacht", "dag", "hallo singularity", "kosmische groeten", "stellare goedemorgen"],
    farewells: ["doei", "tot ziens", "tot later", "dag", "bye", "afsluiten", "uitloggen", "afmelden", "exit", "sluiten", "adeus singularity"],
    
    greetingsResponses: [
        "✨ Hallo, kosmische ontdekker! Hoe kan ik je reis door de sterren helpen?",
        "🚀 Welkom bij SIU 2D! Klaar om verbazingwekkende universums te creëren?",
        "🌌 Interstellaire groeten! Waarmee kan ik je vandaag helpen?",
        "🪐 Hé, commandant! Welke kosmische uitdaging gaan we aan?",
        "💫 Zwaartekrachtgroet! Hoe kan ik je verkenning ondersteunen?",
        "🌟 Welkom, wereldbouwer! Wat gaan we vandaag simuleren?",
        "🌠 Groeten, sterrenreiziger! Klaar voor een kosmisch avontuur?",
        "🛸 Transmissie ontvangen! Hoe kan ik je ruimtemissie helpen?",
        "🔭 Hallo, virtuele astronoom! Welk kosmisch mysterie gaan we ontrafelen?",
        "⚡ Kosmische energie stroomt! Hoe kan ik helpen?",
        "🌀 Welkomstvortex geactiveerd! Wat is je commando?",
        "🌠 Kosmische straling gedetecteerd! Hallo, hoe kan ik helpen?",
        "🪐 Planetaire uitlijning perfect voor je aankomst! Welkom!",
        "🌌 Ruimtetijdkromming gestabiliseerd! Groeten, ontdekker!",
        "🚀 Systemen online! Singularity staat klaar voor je vragen",
        "🔭 Telescopen scherpgesteld! Klaar om het universum te verkennen?",
        "🌠 Welkomstmeteorenregen! Hoe kan ik helpen?",
        "💻 Kosmische AI-systemen geactiveerd! Hallo, mens!",
        "🛰️ Communicatiesatellieten gesynchroniseerd! Verbinding tot stand gebracht!",
        "🌌 Dimensionale poort geopend! Welkom bij SIU 2D!",
        "🌟 Sterrenbeelden uitgelijnd voor je aankomst! Groeten!",
        "⚛️ Kosmische deeltjes enthousiast over je aanwezigheid! Hallo!",
        "🌠 Welkomstkomeet in traject! Groeten, reiziger!",
        "🪐 Planetaire ringen zwaaien ter begroeting! Welkom!",
        "✨ Stellare energie gekanaliseerd! Singularity staat tot je dienst!"
    ],
    
    farewellResponses: [
        "🌠 Tot de volgende keer, sterrenreiziger! Moge je reis episch zijn!",
        "🛸 Goede reizen door de kosmos! Kom terug met nieuwe vragen!",
        "💫 Transmissie beëindigd. Onthoud: Het universum is je speeltuin!",
        "👋 Dag! Als je een zwart gat wilt maken, ben ik er!",
        "🚀 Vertrek bevestigd! Keer terug voor meer kosmische avonturen!",
        "🌌 Verbinding verbreken... Maar het universum blijft uitdijen!",
        "🪐 Tot ziens, commandant! Mogen we meer kosmische horizonnen vinden!",
        "✨ Missie voltooid! Kom terug voor nieuwe stellaire verkenningen!",
        "🔭 Signaal verloren... Maar sterren zullen je pad altijd verlichten!",
        "⚡ Kosmische energieën nemen afscheid! Tot de volgende omloop!",
        "🌀 Zwaartekrachtsveld gedeactiveerd! Tot snel, ontdekker!",
        "🌠 Uittraject berekend! Tot de volgende keer, reiziger!",
        "🛰️ Satellieten in stand-by! Kom terug wanneer nodig!",
        "💻 Systemen in kosmische slaapstand! Tot ziens!",
        "🪐 Afscheidsplanetaire uitlijning! Goede reizen!",
        "🌌 Dimensionale poort gesloten! Keer terug wanneer je wilt!",
        "🌟 Sterrenbeelden stralen bij je afscheid! Tot snel!",
        "⚛️ Kosmische deeltjes vertragen! Tot de volgende keer!",
        "🌠 Afscheidskomeet in traject! Goede reis!",
        "🔭 Telescopen defocussen! Tot de volgende observatie!",
        "💫 Ruimtetijdkromming hersteld! Tot de volgende reis!",
        "🚀 Afscheidsraketten geactiveerd! Goede reis!",
        "🌠 Afscheids kosmische straling gedetecteerd! Tot snel!",
        "🛸 Afscheidsschip in omloop! Kom snel terug!",
        "✨ Laatste stellaire puls! Verbinding verbreken..."
    ],
    
    isBegroeting: (input) => begroetingSysteem.begroetingen.includes(input.toLowerCase()),
    isAfscheid: (input) => begroetingSysteem.afscheiden.includes(input.toLowerCase()),
    
    getRandomBegroeting: () => {
        return begroetingSysteem.begroetingReacties[
            Math.floor(Math.random() * begroetingSysteem.begroetingReacties.length)
        ];
    },
    
    getRandomAfscheid: () => {
        return begroetingSysteem.afscheidReacties[
            Math.floor(Math.random() * begroetingSysteem.afscheidReacties.length)
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
};




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
    "🌌 Dit vond ik niet in mijn sterrendatabase... Vraag over 'kometen', 'zwarte gaten' of 'bediening'!",
    "🛸 Mijn kennis is kosmisch - probeer vragen over spelmechanica of elementen uit het universum",
    "🔭 Focus op de ruimte! Hoe over 'Hoe maak ik een nevel?' of 'Welke massa voor een zwart gat?'",
    "📡 Signaal verloren... Stel je vraag anders over het maken van hemellichamen, stellaire evolutie of SIU 2D-besturing",
    "💫 Wil je iets berekenen? Gebruik cijfers en operatoren zoals '3 * 5^2' of vraag naar kosmische termen!",
    "🪐 Kosmische hint: Probeer termen als 'zwaartekracht', 'ster', 'planeet' of 'evolutie'!",
    "⚡ Nieuw sterrenbericht gedetecteerd! Vraag bijvoorbeeld 'Hoe maak ik een quasar?' of 'Wat is een leefbare zone?'"
];
    
    responses.push(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    
     
    if (Math.random() < 0.2) {
        const followUp = followUpDatabase.default[Math.floor(Math.random() * followUpDatabase.default.length)];
        responses.push(followUp);
        
         
        contextSystem.lastTopic = "default";
        contextSystem.lastFollowUp = followUp;
    }
    
    return responses;
};

 
function toggleStarPulse(active) {
    const star = document.getElementById('star');
    if (star) {
        if (active) {
            star.classList.add('pulse-active');
        } else {
            star.classList.remove('pulse-active');
        }
    }
};

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
};

 
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
};

 
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
};
 
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
};


 
function isOnline() {
    return navigator.onLine;
};

 
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
        const errorMsg = createMessage('error : Verbindingsprobleem. Controleer je internet en probeer het opnieuw.', 'error-message');
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
};

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