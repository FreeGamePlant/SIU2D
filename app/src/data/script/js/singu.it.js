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
        "☄️ Le comete sono corpi ghiacciati che sviluppano code quando vicini alle stelle! In SIU 2D, puoi crearle nel menu 'Crea Astri'",
        "💫 La massa tipica delle comete varia tra 0.1-10 unità. Oltre 300 masse, evolvono automaticamente in planetoidi ghiacciati",
        "🌠 La coda punta sempre nella direzione opposta al movimento - simula con precisione il vento stellare del gioco",
        "🚀 Suggerimento: Quando crei una cometa, trascina il mouse per impostare la velocità iniziale e vedi la traiettoria prevista",
        "❄️ Le comete si sciolgono troppo vicine a stelle calde - nel gioco diventano asteroidi dopo 50 passaggi",
        "⏱️ In modalità tempo accelerato (100000x), puoi osservare una cometa completare la sua orbita in pochi secondi reali",
        "🎯 Prova a creare un sistema con più comete in orbita attorno a una stella - premi 'C' per accedere al menu di creazione",
        "📏 Il raggio del nucleo è calcolato con R = 0.1 * ∛(massa). Es: massa 8 = raggio ~0.2 unità (visibile nel pannello di modifica)",
        "🔥 Comete con velocità >5 unità/s sviluppano code più lunghe - perfette per effetti visivi drammatici",
        "🌌 In modalità alta qualità (Opzioni > Grafica), le code mostrano tre strati: polvere (giallo), gas ionizzato (blu) e sodio (arancione)",
        "🔄 Usa pianeti giganti come 'fionde gravitazionali' - posiziona una cometa in traiettoria ravvicinata per reindirizzarla",
        "⛰️ Comete consumate diventano asteroidi classe 2 (ghiacciati) - puoi vedere questa transizione nella cronologia dell'astro",
        "💧 Controlla dove inizia a formarsi la coda regolando la temperatura base nel pannello di modifica (sopra -50°C)",
        "📊 Dati fisici nel gioco: Densità = 0.5 g/cm³, Albedo = 0.04 - visibili in modalità statistiche avanzate (Shift+E)",
        "✨ Le comete appena create rimangono attive per ~1 milione di anni nel tempo di gioco - osserva nella linea temporale universale",
        "🎯 Per un'orbita perfetta, la velocità iniziale deve essere perpendicolare alla linea gravitazionale - le frecce ti guidano",
        "🌡️ Temperatura della coda: vicino al nucleo (1500°C), centro (500°C), punta (100°C) - visibile con zone termiche attive",
        "🔄 Le comete possono essere catturate dai pianeti - prova a creare un sistema con un Giove virtuale per vedere lune cometarie",
        "⏳ Nel pannello tempo astro (T con modifica aperta), vedi quanti passaggi stellari mancano prima che diventi inattivo",
        "📈 Suggerimento avanzato: Comete con alta eccentricità (>0.9) hanno orbite più interessanti - regola nel vettore velocità",
        "🌠 Curiosità: Il codice del gioco simula la perdita di massa per sublimazione - circa 0.01% per passaggio stellare",
        "🔭 In sistemi binari, le comete possono avere orbite caotiche - prova a creare due stelle vicine con comete orbitanti",
        "⚠️ Attenzione: Comete in rotta di collisione con pianeti evaporano prima dell'impatto nella maggior parte dei casi",
        "💧 L'acqua delle comete è conteggiata nelle risorse planetarie quando evaporano - vedi nel pannello planetario",
        "🌟 Per risultati migliori, crea comete nel menu 'Corpi Minori' con temperatura iniziale tra -100°C e -50°C"
    ],
    
    "buco nero": [
        "🕳️ I buchi neri hanno massa minima di 1 trilione (1e12) unità - creali nel menu 'Corpi Esotici'",
        "🌀 Il raggio nel gioco è calcolato come R = ∛(massa)/1000 - semplifica il Raggio di Schwarzschild per il gameplay",
        "💥 Nutri i buchi neri con materia per vederli crescere - prova a lanciare nebulose o stelle vicine",
        "⏳ Perdono massa per radiazione di Hawking - in 10^67 anni evaporerebbero (simulato in modo accelerato)",
        "📡 Il disco di accrescimento emette calore intenso - usa il pulsante 'Zone Termiche' (T) per visualizzare i 5000°C+",
        "⚡ La forza di marea vicino all'orizzonte è F = (G * M * m) / r³ * Δr - oggetti vicini vengono stirati (effetto visibile in Alta Qualità)",
        "🌌 Buchi neri sopra 500 sestilioni diventano quasar - raggiungi questo traguardo per vedere getti di energia",
        "🔭 Mantieni distanza sicura di 10x il raggio - entro questa distanza, gli oggetti vengono ingoiati istantaneamente",
        "🔄 Usali per 'fionde gravitazionali' - lancia oggetti in traiettorie ad alta energia con economia",
        "💫 In sistemi binari, generano onde gravitazionali - attiva in Opzioni > Fisica > Effetti Relativistici",
        "⏱️ 1 secondo sull'orizzonte equivale a ~100 anni esterni - osserva con il controllo tempo accelerato",
        "📈 Il tempo di evaporazione è mostrato nel pannello tempo astro (accedi con T durante la modifica)",
        "🌠 Per fondere buchi neri: creane due vicini e accelera il tempo - la collisione emette un flash intenso",
        "⚠️ Oggetti entro 5x il raggio subiscono spaghettificazione - effetto attivato in Opzioni > Grafica > Alta Qualità",
        "🔢 Calcola il raggio per 1 milione di masse solari: R ≈ 2.95 * (M/1e6) km - il gioco usa unità semplificate",
        "💥 Raggiunte 1e60 masse, si trasformano in buchi bianchi - continua a nutrirli per vedere la transizione",
        "🌡️ La temperatura del disco di accrescimento è regolabile nel pannello di modifica - default 1.000.000°C",
        "🌀 La rotazione è regolabile nel pannello avanzato (clicca 'Proprietà Relativistiche') - influisce sul disco di accrescimento",
        "📏 Per misurazioni precise: Il diametro dell'orizzonte degli eventi è sempre 2x il raggio mostrato nel gioco",
        "⚠️ Attenzione: Buchi neri in sistemi densi possono inghiottire stelle rapidamente - monitora dalla linea temporale",
        "🔭 Usa la modalità osservazione (O) per vedere lenti gravitazionali - distorcono la luce delle stelle dietro di loro",
        "💫 I quasar (stadio evolutivo) emettono getti energetici - controlla la direzione nel pannello di modifica",
        "⏳ Nei buchi neri supermassicci, il tempo di evaporazione supera l'età attuale dell'universo del gioco",
        "🌌 Suggerimento: Crea un binario buco nero-stella per vedere trasferimento di materia in tempo reale",
        "✨ Per l'esperienza completa, attiva la musica ambient 'Singularity' in Opzioni > Audio"
    ],
    
    "gravità": [
        "⚖️ Regolazione globale 0-500% in Menu > Fisica > Costante Gravitazionale",
        "📏 Costante G predefinita: 6.67430e-11 N·m²/kg² - modificabile per simulare universi alternativi",
        "🌀 I buchi neri hanno un moltiplicatore gravitazionale fisso 1000x per effetti relativistici",
        "🪐 Forza di marea calcolata come Δg = (2GM/R³) * Δr - causa deformazioni in lune vicine (visibile in Alta Qualità)",
        "📈 Ogni 100% extra di gravità accelera i sistemi di ~15% - utile per simulazioni rapide",
        "🌌 Onde gravitazionali attivate in Opzioni > Fisica > Effetti Avanzati - visibili come increspature",
        "🔄 Velocità orbitale ottimale: v = √(GM/r) - mostrata durante la creazione con frecce guida",
        "⚙️ Riduci al 10-50% per simulare nebulose, aumenta al 200-500% per sistemi stellari densi",
        "🔭 Effetto lente gravitazionale visibile vicino ai buchi neri - attiva in Grafica > Effetti Speciali",
        "📊 Stabilità massima: 0.5 * √N corpi (es: 100 astri → ~7 stabili) - superare causa comportamenti caotici",
        "⏳ Alta gravità accelera l'evoluzione stellare - le stelle vivono meno in campi gravitazionali forti",
        "🌠 Soglia di fusione nelle collisioni: Ec < |Ep| - quando l'energia cinetica è minore di quella potenziale gravitazionale",
        "🧮 Formula implementata: F = G * m1 * m2 / r² - testabile con la modalità 'Mostra Forze' (F3)",
        "🔢 Per raddoppiare la gravità: aumenta G del 100% o le masse del 100%",
        "⚠️ Valori >300% causano instabilità in sistemi con oltre 50 corpi - usa con cautela",
        "🌍 Gravità superficiale calcolata come g = GM/R² - visibile nel pannello planetario per corpi rocciosi",
        "💫 Il sistema usa integrazione Verlet per calcoli orbitali precisi - attiva 'Precisione Totale' in Fisica",
        "📈 In corpi massicci, la gravità influenza la rotazione - pianeti troppo vicini a stelle diventano tidally locked",
        "🌀 Campi gravitazionali forti dilatano il tempo - osservabile confrontando orologi a diverse altitudini",
        "⚡ Per simulare materia oscura: aumenta la gravità del 30-50% senza aggiungere massa visibile",
        "🔭 La precisione numerica è maggiore vicino a masse grandi - il gioco usa coordinate adattative",
        "🌌 La curvatura spazio-temporale è simulata visivamente vicino a oggetti compatti - attiva in Opzioni > Grafica",
        "📏 Le distanze di Roche calcolate automaticamente - lune entro questo limite si frammentano (visibile con 'Mostra Zone Critiche')",
        "💥 Nelle collisioni, la gravità determina l'energia liberata - E ∝ M²/R per impatti diretti",
        "✨ Suggerimento: Per orbite stabili, la velocità iniziale dovrebbe essere ≈80% della velocità di fuga locale"
    ],
    
    "stella": [
        "⭐ Massa minima: 15 milioni di unità - crea nel menu 'Corpi Stellari'",
        "🌞 Per una stella come il Sole: massa ~1.989e30 kg (1 unità solare nel gioco)",
        "🌈 Colori per temperatura: Blu (>30.000K), Bianco (10.000K), Giallo (6.000K), Rosso (<3.500K) - regola nel pannello",
        "💥 Stelle sopra 20 masse solari esplodono in supernove - attiva 'Evoluzione Stellare' in Opzioni",
        "⏳ Tempo di vita: t ≈ 10^10 * (M/M☉)^-2.5 anni - visibile nel pannello tempo astro (T durante modifica)",
        "🔄 Crea sistemi binari con due stelle vicine per vedere orbite affascinanti",
        "🔭 Stelle variabili cambiano luminosità - controlla l'ampiezza in 'Proprietà Stellari'",
        "🌡️ Zona abitabile: d = √(L/L☉) UA - mostrata come anello verde quando selezionata",
        "💫 Fusione nucleare simulata: H → He con efficienza 0.7% (E=mc²) - influenza luminosità e durata",
        "📊 Evoluzione: Nana rossa → Nana bianca | Stella media → Gigante rossa | Massiccia → Supernova → Buco nero",
        "⚙️ Regolabili: Massa, temperatura, rotazione, metallicità e attività magnetica",
        "✨ Stelle di neutroni richiedono >1.4 masse solari e collasso - creale tramite supernove",
        "🌌 Ammassi stellari: crea più stelle in piccole regioni (menu 'Sistemi Complessi')",
        "🧪 Modifica la costante gravitazionale per vedere effetti sull'evoluzione (Menu > Fisica > Costanti)",
        "🔢 Luminosità: L ∝ M^3.5 - una stella 2x più massiccia è ~11x più luminosa",
        "⚠️ Stelle molto massicce (>100 masse solari) possono essere instabili - si dividono o esplodono prematuramente",
        "🌠 Stelle T Tauri (giovani) mostrano eiezioni di massa - visibili come protuberanze in Alta Qualità",
        "💥 Nelle supernove, il 90% della massa viene espulso come nebulosa - il resto forma stelle di neutroni o buchi neri",
        "📈 Raggio stellare: R ∝ M^0.8 per stelle della sequenza principale - calcolato automaticamente",
        "🌍 Pianeti in zona abitabile possono sviluppare vita - indicato da icona verde nel pannello planetario",
        "🔥 Nucleo stellare raggiunge 15 milioni °C per la fusione - temperatura regolabile influenza tasso evolutivo",
        "🌀 Forti campi magnetici creano macchie stellari - controlla l'intensità nel pannello avanzato",
        "🔭 Per osservare dettagli, usa lo zoom (rotellina mouse) e riduci la velocità temporale",
        "✨ Suggerimento: Stelle binarie possono avere pianeti in orbita P-type (attorno alla coppia) o S-type (attorno a una)"
    ],
    
    "pianeta": [
        "🪐 Massa: 5K-30.5K (rocciosi), 105K-2.5M (gassosi) - crea nel menu 'Corpi Planetari'",
        "🌍 Classi: Rocciosi (1-11), Gassosi (1-6), Nani - assegnate automaticamente per massa/temperatura",
        "🌡️ Zona abitabile calcolata come d = √(L_stella / L☉) UA - mostrata come anello verde attorno alle stelle",
        "🔄 Velocità orbitale ottimale: v = √(GM/r) - regola durante la creazione con il vettore velocità",
        "🌋 Pianeti vulcanici: temperatura >1000°C + bassa acqua/atmosfera - automaticamente classe 7",
        "❄️ Mondi ghiacciati: temperatura < -100°C + alta acqua - diventano automaticamente classe 9",
        "🌫️ Spessore atmosferico: controlla con lo slider gas (0-100%) - influenza temperatura e pressione superficiale",
        "💧 Acqua superficiale: regola con lo slider acqua - ideale per mondi abitabili: 30-70%",
        "🔭 Le lune mostrano librazione - effetto sottile attivato in Grafica > Alta Qualità",
        "🛰️ Massimo 20 lune per pianeta - stabile fino al 10% della massa planetaria",
        "⏱️ La migrazione planetaria avviene in sistemi giovani - attiva in Fisica > Effetti Avanzati",
        "📏 Raggio: ∛(massa) per rocciosi, ∛(massa/2) per gassosi - calcolato automaticamente",
        "🌌 Tipi speciali: Carbonio (alto rapporto C/O), Ferro (nucleo esposto) - crea con composizioni estreme",
        "🧪 Collisioni planetarie creano nuovi mondi + fasce asteroidali - simulate con precisione",
        "🔢 Gravità superficiale: g = GM/R² - mostrata nel pannello planetario",
        "💫 Anelli planetari: attiva in 'Caratteristiche' > Anelli - regola spessore, colore e densità",
        "🌍 Pianeti oceano (classe 2) hanno acqua >90% - generano automaticamente atmosfera umida",
        "🏜️ Pianeti desertici (classe 3) perdono 80-90% d'acqua - mostrano texture sabbiosa",
        "🌱 Mondi abitabili (classe 6) mostrano vegetazione - attiva in Grafica > Dettagli Superficiali",
        "🌋 Attività geologica: controlla con lo slider 'Tettonica' - influenza vulcanismo e formazione montuosa",
        "🌀 Rotazione: regola il periodo di rotazione - influenza schiacciamento e modelli climatici nei gassosi",
        "🌌 Esopianeti estremi: creali con parametri insoliti usando 'Personalizzazione Avanzata'",
        "📊 Per dati dettagliati: seleziona pianeta e premi E - il pannello mostra tutte le statistiche",
        "✨ Suggerimento: Pianeti in risonanza orbitale (es: 2:3) mantengono stabilità a lungo termine",
        "🔭 Usa la modalità 'Osservatorio' (O) per vedere dettagli superficiali su pianeti selezionati"
    ],
    "meteoroide": [
        "🌠 I meteoroidi sono frammenti rocciosi più piccoli degli asteroidi (1mm-1m) - generati automaticamente nelle collisioni",
        "💫 Velocità media: 20-70 km/s - visibile come scie veloci in modalità tempo reale",
        "🪨 Composizione: 90% roccia, 6% ferro, 4% nichel - definita nel pannello creazione frammenti",
        "🌌 In SIU 2D, creali tramite collisioni o col menu 'Corpi Minori' > 'Genera Frammenti'",
        "🔥 Entrando in atmosfera, diventano meteore - attiva 'Atmosfere' in Opzioni > Fisica",
        "📏 Massa tipica: 0.1g-100kg - oggetti più grandi sono classificati come asteroidi",
        "💥 Effetto ingresso atmosferica: attiva in Grafica > Effetti Speciali > Stelle Cadenti",
        "🌍 Per la Terra: ~100 tonnellate di meteoroidi entrano giornalmente - simulato proporzionalmente",
        "📊 Dati: Densità 3-4 g/cm³, Albedo 0.05-0.25 - regolabile nel pannello proprietà",
        "✨ Suggerimento: Crea fasce asteroidali per generare meteoroidi naturalmente",
        "⏱️ In modalità accelerata (10000x), vedi piogge di meteore costanti",
        "🔭 Osservazione: I meteoroidi non sono visibili finché non diventano meteore",
        "🌠 Pioggia di meteore: avviene quando pianeti incrociano scie di comete - simula con 'Eventi'",
        "💫 Collisioni con navi: riducono scudo dell'1% per 10kg - attiva in Fisica > Danni",
        "⚠️ Pericolo: Meteoroidi >1kg possono danneggiare satelliti - indicato da allarme giallo",
        "🌌 Per creazione manuale: menu 'Frammenti' > dimensione Piccola (S)",
        "📈 Statistiche: Frequenza regolabile in Menu > Ambiente > Densità Frammenti",
        "🛰️ La velocità relativa determina l'energia d'impatto: E = 0.5 * m * v²",
        "🌠 Curiosità: Il meteoroide che creò il Meteor Crater aveva solo 50m di diametro",
        "🌟 Effetto visivo: Attiva 'Scie Luminose' per vedere traiettorie ad alta velocità"
    ],
    "meteora": [
        "☄️ Le meteore sono meteoroidi che bruciano in atmosfera - 'stelle cadenti' nel gioco",
        "🔥 Temperatura plasma: 1,500-3,000°C - visibile come scintille colorate",
        "🌈 Colori: Verde (magnesio), Giallo (sodio), Rosso (azoto) - definiti da composizione",
        "🌍 Per vedere: Aumenta densità atmosferica > 0.1kg/m³ e aggiungi meteoroidi",
        "💫 Velocità minima: 11km/s per accensione - regola la soglia di ignizione atmosferica",
        "📏 Magnitudine apparente: -4 a +5 - controllata da dimensione e velocità del meteoroide",
        "🌠 Piogge di meteore: configura in Eventi > Piogge Meteoriche con radiante definito",
        "⏱️ Durata: 0.1-10 secondi in tempo reale - proporzionale alla massa",
        "✨ Suggerimento: Usa comete come fonte per piogge meteoriche periodiche",
        "💥 Bolidi: meteore > magnitudine -4 - attivano suono esplosione e flash",
        "🌌 Per creazione manuale: 'Eventi' > 'Meteora' con altitudine 80-120km",
        "📊 Frequenza: Regolabile da 0-100 eventi/ora in Opzioni > Ambiente",
        "🔭 Migliore visibilità: Notte con cielo sereno - riduci inquinamento luminoso nel menu",
        "⚠️ Attenzione: Le meteore possono sopravvivere e diventare meteoriti",
        "🌠 Curiosità: La pioggia delle Perseidi raggiunge 100 meteore/ora al picco",
        "🌟 Effetto sonoro: Attiva in Audio > Eventi > Stelle Cadenti",
        "🛸 Meteore terrestri: Avvengono sopra 80km - altitudine regolabile",
        "📉 Perdita di massa: 90-99% durante il passaggio atmosferico",
        "💧 Meteore acquatiche: creano crateri sottomarini visibili in modalità oceano",
        "🌌 Per screenshot: Metti pausa al momento esatto con P e usa F12"
    ],
    "asteroide": [
        "🪨 Asteroidi: corpi rocciosi di 1m-1000km - crea nel menu 'Corpi Minori'",
        "🌌 Classi: C (carboniosi), S (silicati), M (metallici) - seleziona nel pannello",
        "💫 Massa tipica: 1e10-1e20 kg - oltre diventano planetoidi",
        "📏 Forma irregolare: attiva in Proprietà > Forma > Irregolare per realismo",
        "🔄 Orbita: Solitamente tra Marte e Giove - crea fasce con 'Genera Sistema'",
        "⚠️ Pericolo d'impatto: indicato da marker rosso se la traiettoria intercetta un pianeta",
        "🌠 Asteroidi vicini alla Terra: configura in 'Eventi' > 'NEA'",
        "💥 Collisione con pianeta: libera energia E = 0.5 * m * v² - visibile come esplosione",
        "⛰️ Superficie: Texture craterizzata attivata in Grafica > Dettagli Superficiali",
        "🌌 Famiglie asteroidali: gruppi con stessa origine - genera con 'Famiglie da Collisione'",
        "📊 Dati: Densità 1-5 g/cm³, Albedo 0.02-0.7 - regolabili",
        "✨ Suggerimento: Usali per miniere virtuali - risorse calcolate in Pannello > Risorse",
        "🔭 Osservazione: Asteroidi <100m visibili solo quando vicini",
        "🚀 Missioni: Invia sonde cliccando sull'asteroide > 'Invia Sonda'",
        "🌍 Impatto K-T: Simula con asteroide di 10km per estinzione di massa",
        "💫 Rotazione caotica: comune in asteroidi piccoli - attiva in Proprietà > Rotazione",
        "🛰️ Lune asteroidali: rare ma possibili - aggiungi con 'Aggiungi Luna'",
        "📈 Mercato risorse: Ferro, nichel e platino valgono crediti in modalità economia",
        "🌠 Curiosità: L'asteroide Cerere è classificato come pianeta nano",
        "🌟 Difesa planetaria: Testa sistemi difensivi con 'Modalità Impatto'"
    ],
    "planetoidi": [
        "🌑 Planetoidi: corpi tra 100-500km - stadio intermedio tra asteroidi e pianeti",
        "🌌 Crea con massa 1e18-1e20 kg nel menu 'Corpi Minori' > 'Planetoidi'",
        "💫 Gravità sufficiente per forma sferica: attiva 'Forma Sferica' in proprietà",
        "🪨 Composizione: Ghiacciati (Kuiper) o Rocciosi (Fascia) - seleziona nel pannello",
        "🌠 Esempi: Orcus, Quaoar, Sedna - modelli predefiniti in 'Biblioteca'",
        "❄️ Planetoidi ghiacciati: iniziano attività cometaria a 5UA da stelle",
        "📏 Differenza dai pianeti nani: non hanno ripulito l'orbita - definizione automatica nel gioco",
        "🔄 Migrazione: Possono essere espulsi nella nube di Oort in sistemi instabili",
        "💥 Collisioni: Generano famiglie asteroidali con composizione simile",
        "🌌 Zona: Fascia di Kuiper (30-50UA) o Disco Diffuso (fino a 1000UA)",
        "📊 Dati fisici: Densità 1-2 g/cm³ (ghiacciati), 2-4 g/cm³ (rocciosi)",
        "✨ Suggerimento: Usali per creare sistemi binari di planetoidi",
        "🔭 Osservazione: Richiede telescopio virtuale (modalità osservatorio) per la rilevazione",
        "🚀 Cattura: I planetoidi possono essere catturati come lune da pianeti giganti",
        "🌍 Abitabilità: Mai naturale, ma possibile con terraformazione avanzata",
        "💫 Curiosità: Haumea ha forma ovale per rotazione rapida",
        "⏱️ Tempo evolutivo: Stabili per miliardi di anni in orbite fredde",
        "📈 Classificazione automatica: Quando un corpo raggiunge 450km di diametro",
        "🌠 Anelli: Alcuni planetoidi possono avere anelli tenui - attiva in 'Caratteristiche'",
        "🌟 Modalità esplorazione: Invia sonde per mappare la superficie"
    ],
    "gassoso": [
        "🪐 Giganti gassosi: pianeti massicci senza superficie solida - massa > 100K unità",
        "🌪️ Crea nel menu 'Corpi Planetari' > 'Gassosi' con massa minima 105K",
        "💫 Classi: Gioviani caldi (vicini alla stella) o Gioviani freddi (distanti)",
        "🌈 Colori: Giallo (H2), Rosso (NH3), Blu (CH4) - dipendono dalla temperatura",
        "🌌 Struttura: Nucleo roccioso + mantello metallico + atmosfera spessa - visibile in sezione",
        "🌀 Modelli atmosferici: Bandeggi, macchie, vortici - intensità controllata dalla rotazione",
        "💥 Limite di massa: 13 MJup per fusione del deuterio (nane brune), 80 MJup per stelle",
        "📏 Bassa densità: 0.5-2 g/cm³ - Saturno galleggerebbe sull'acqua!",
        "🌠 Anelli: Attiva in 'Caratteristiche' > Anelli - spessore e densità regolabili",
        "🌍 Lune: Fino a 20 lune stabili - genera sistemi lunari complessi",
        "⚠️ Migrazione planetaria: Comune in giganti gassosi giovani - attiva in Fisica Avanzata",
        "✨ Suggerimento: Per macchie come la Grande Macchia Rossa, aumenta la velocità di rotazione",
        "🔭 Osservazione: I modelli nuvolosi cambiano in tempo reale - accelera per vedere l'evoluzione",
        "📊 Dati: Temperatura nucleo 20.000°C, pressione 40 Mbar - visibili nel pannello",
        "💫 Campo magnetico: 10-20x più forte della Terra - attiva aurore in Grafica",
        "🌌 Esempi: Giove, Saturno, Urano, Nettuno - modelli in 'Biblioteca Planetaria'",
        "🚀 Esplorazione: Invia sonde atmosferiche che sopravvivono fino a un certo limite di pressione",
        "🌠 Curiosità: Giove agisce da 'aspiracosmico' proteggendo pianeti interni",
        "🌟 Per mini-Nettuni: riduci massa a 10-20 masse terrestri",
        "💥 Collisione: Giganti gassosi in collisione creano stelle effimere di idrogeno"
    ],
    "nana bruna": [
        "🟤 Nane brune: 'stelle fallite' con 13-80 masse gioviane",
        "🌡️ Temperatura: 300-3000K - troppo fredde per fusione stabile dell'idrogeno",
        "💫 Crea nel menu 'Corpi Stellari' > 'Substellari' con massa 1.3e28-8e28 kg",
        "🔥 Fusione limitata: Solo deuterio e litio - vita 1-100 miliardi di anni",
        "📈 Classificazione spettrale: M, L, T, Y - definita da temperatura nel pannello",
        "🌌 Emissione: Principalmente infrarosso - visibile con filtro IR (tasto I)",
        "🪐 Possono avere dischi protoplanetari e sistemi planetari - attiva 'Dischi'",
        "⚠️ Differenza dai pianeti: Formazione stellare, non planetaria",
        "✨ Suggerimento: Cerca in regioni di recente formazione stellare",
        "🔭 Osservazione: Difficili da rilevare - usa modalità 'Scansione IR'",
        "📊 Dati: Densità 10-100 g/cm³, gravità superficiale 100-500 m/s²",
        "💥 Brillamenti: Occasionali esplosioni magnetiche - intensità regolabile",
        "🌠 Curiosità: La nana bruna più fredda conosciuta ha temperatura da caffè!",
        "🚀 Pianeti: Possono avere pianeti terrestri in orbite strette",
        "⏱️ Evoluzione: Si raffreddano lentamente diventando nane nere",
        "🌟 Binarie: Sistemi binari di nane brune sono comuni",
        "🌀 Atmosfera: Modelli climatici complessi con nubi di polvere",
        "💫 Rilevazione: Più facile tramite emissione radio - attiva in Opzioni",
        "🌌 Esempi: WISE 0855 - modello predefinito",
        "📉 Limite inferiore: Oggetti sotto 13 MJup sono classificati come pianeti"
    ],
    "nana rossa": [
        "🔴 Nane rosse: Stelle piccole e fredde (tipo M) - massa 0.08-0.5 solare",
        "🌡️ Temperatura: 2,400-3,700K - caratteristico colore rosso",
        "⏳ Vita utile: Trilioni di anni - quasi eterne su scala cosmica",
        "💥 Brillamenti stellari: Frequenti e intensi - possono sterilizzare pianeti vicini",
        "🌡️ Zona abitabile: Molto vicina (0.1-0.4UA) - pianeti probabilmente tidally locked",
        "🌌 Crea nel menu 'Corpi Stellari' > 'Nane Rosse' con massa 15-75 milioni di unità",
        "📈 Statistiche: 75% delle stelle nella Via Lattea sono nane rosse",
        "💫 Pianeti: Sistemi planetari comuni - Trappist-1 è un esempio famoso",
        "⚠️ Pericolo: Radiazione UV e X da brillamenti può distruggere atmosfere",
        "✨ Suggerimento: Per pianeti abitabili, usa scudi magnetici forti",
        "🔭 Osservazione: Poco visibili a occhio nudo - debole luminosità",
        "🌠 Attività cromosferica: Macchie stellari coprono fino al 40% della superficie",
        "📊 Dati: Luminosità 0.0001-0.08 solare, raggio 0.1-0.6 solare",
        "💥 Fusione: Lenta e stabile - efficienza 10x maggiore di stelle come il Sole",
        "🌌 Velocità di rotazione: Alta (periodo di giorni) - genera intensi campi magnetici",
        "🚀 Viaggio interstellare: Obiettivi principali per abbondanza e longevità",
        "❄️ Nane blu: Nane rosse molto attive possono emettere luce blu durante i brillamenti",
        "🌟 Binarie: Spesso in sistemi multipli",
        "💫 Curiosità: Proxima Centauri è la stella più vicina al Sole",
        "🌡️ Temperatura superficiale: Regolabile nel pannello - default 3300K"
    ],
    "stella gigante": [
        "🌟 Stelle giganti: Fase evolutiva di stelle medie dopo sequenza principale",
        "🌡️ Classi: Giganti rosse (K, M), Giganti blu (B, A) - rare",
        "📏 Raggio: 10-100x solare - può inglobare pianeti interni",
        "💫 Massa: 0.5-8 solare - sotto diventano nane bianche, sopra supernove",
        "🔥 Nucleo: Elio o carbonio/ossigeno in fusione - temperatura >100 milioni K",
        "🌌 Crea direttamente o evolvi stelle nel menu 'Evoluzione Stellare'",
        "⏳ Durata: 1 milione - 1 miliardo di anni a seconda della massa",
        "💥 Perdita di massa: Forti venti stellari - forma nebulose planetarie",
        "📈 Luminosità: 100-10.000x solare - illumina interi sistemi",
        "⚠️ Pianeti: Orbite instabili - pianeti possono essere espulsi o distrutti",
        "✨ Suggerimento: Per vedere pulsazioni, regola l'instabilità nel pannello",
        "🔭 Variabilità: Molte sono variabili (es: Mira, Cefeidi)",
        "🌠 Nucleosintesi: Produce carbonio, azoto ed elementi pesanti",
        "📊 Dati: Densità media molto bassa (10⁻⁵ g/cm³)",
        "💫 Fine: Espelle inviluppo formando nebulosa planetaria + nucleo diventa nana bianca",
        "🌌 Esempi: Arturo, Aldebaran - modelli in biblioteca",
        "🚀 Abitabilità: Zone abitabili dinamiche e temporanee",
        "❄️ Giganti blu: Stelle massicce in breve fase prima di supernova",
        "🌟 Curiosità: Betelgeuse potrebbe inglobare Giove se fosse al posto del Sole",
        "💥 Simulazione: Accelera il tempo per vedere l'evoluzione completa"
    ],
    "ipergigante": [
        "💥 Ipergiganti: Le stelle più massicce e luminose conosciute (>30 soli)",
        "🌡️ Temperatura: 3,500-35,000K - classi O, B, A, F, K, M",
        "💫 Luminosità: Fino a 1 milione di volte il Sole - illumina intere galassie",
        "📏 Raggio: 100-2,000 solari - se posta nel Sistema Solare, ingloberebbe Giove",
        "⏳ Vita: Brevissima (1-10 milioni di anni) - terminano come supernove o ipernove",
        "🌌 Crea nel menu 'Corpi Stellari' > 'Stelle Massicce' con massa >30 solare",
        "⚠️ Instabilità: Perdono massa rapidamente - venti stellari potenti",
        "🔥 Fusione: Elementi fino al ferro nel nucleo - stadi avanzati di nucleosintesi",
        "💥 Eruzioni: Perdita di massa in eventi catastrofici - simula con 'Eiezioni'",
        "🌠 Esempi: Eta Carinae, VY Canis Majoris - modelli nella biblioteca",
        "📈 Variabilità: Irregolare ed estrema - luminosità può variare del 50% in mesi",
        "✨ Suggerimento: Per eruzioni come Eta Carinae, aumenta instabilità >80%",
        "🔭 Polvere: Le eiezioni formano nebulose complesse - attiva 'Nebulose Circostanti'",
        "🌌 Ambiente: Si formano solo in regioni HII ricche di gas - simula con nubi molecolari",
        "🚀 Fine: Collassano in buchi neri o stelle di neutroni dopo la supernova",
        "📊 Dati: Densità media 10⁻⁶ g/cm³ - più rarefatta del vuoto da laboratorio",
        "💫 Curiosità: Alcune ipergiganti hanno compagne che causano eruzioni periodiche",
        "🌟 Binarie: Sistemi massicci possono fondersi creando oggetti ancora più estremi",
        "❄️ Ipergiganti gialle: Fase rara e instabile tra supergigante blu e rossa",
        "💥 Simulazione morte: Attiva 'Supernova Imminente' per vedere avvisi pre-collasso"
    ],
    "stella massiva": [
        "💫 Stelle massicce: >8 masse solari - destino finale come supernova",
        "🌡️ Temperatura: 10,000-50,000K - classi O e B",
        "⏳ Vita: Breve (1-50 milioni di anni) - consumano combustibile rapidamente",
        "💥 Venti stellari: Potenti - perdono fino a 10⁻⁶ masse solari all'anno",
        "🌌 Crea nel menu 'Corpi Stellari' > 'Stelle Massicce' con massa >1.6e31 kg",
        "🔥 Fusione: Sequenza rapida H->He->C->Ne->O->Si->Fe",
        "📏 Raggio: 5-25 solari durante sequenza principale",
        "⚠️ Supernove: Destino inevitabile - preparano il terreno per il collasso",
        "✨ Suggerimento: Per vedere evoluzione completa, attiva 'Evoluzione Rapida' in Opzioni",
        "🔭 Osservazione: Principale fonte di elementi pesanti nell'universo",
        "🌠 Nebulose: Creano bolle di gas interstellare - attiva 'Effetto Vento'",
        "📊 Dati: Luminosità 10,000-1,000,000 solare, densità nucleo >10⁶ g/cm³",
        "💫 Compagne: Spesso in sistemi binari con trasferimento di massa",
        "🚀 Pulsar: Alcune diventano pulsar dopo la supernova - seleziona nel destino finale",
        "❄️ Supergiganti blu: Fase prima della supernova per stelle >20 solari",
        "🌟 Curiosità: Stelle Wolf-Rayet sono stelle massicce che hanno perso idrogeno",
        "🌌 Formazione: Richiede nubi molecolari dense - simula con 'Regioni di Formazione'",
        "💥 Magnetar: 10% diventano magnetar - stelle di neutroni con campo magnetico estremo",
        "📈 Instabilità di coppia: Per >130 solari, possono esplodere senza resto",
        "⚠️ Avviso: Non mettere pianeti abitabili vicini - radiazione letale"
    ],
    "buco bianco": [
        "⚪ Buchi bianchi: Teoria opposta ai buchi neri - espellono materia",
        "💫 Esistono solo teoricamente - simulazione speculativa in SIU 2D",
        "🌌 Crea nel menu 'Corpi Esotici' > 'Buchi Bianchi' con massa >1e40 kg",
        "🔥 Meccanica: Materia emerge dall'orizzonte degli eventi - non accessibile",
        "📏 Proprietà: Massa negativa (teorica) - nel gioco usa massa positiva con 'flusso inverso'",
        "⚠️ Stabilità: Oggetti temporanei in simulazione - durata regolabile",
        "✨ Suggerimento: Collega a buchi neri tramite 'Ponte di Einstein-Rosen'",
        "🔭 Visualizzazione: Getto di particelle emergenti - intensità controllabile",
        "🌠 Origine: Possibile risultato finale di buchi neri evaporati",
        "📊 Parametri: Temperatura getto 1e10 K, velocità eiezione 0.9c",
        "💥 Effetti: Radiazione intensa - pericoloso per sistemi vicini",
        "🌌 In relatività: Soluzione matematica delle equazioni di Einstein",
        "🚀 Viaggio interstellare: Teoricamente potrebbero essere portali - funzionalità sperimentale",
        "❄️ Differenza dai quasar: Espulsione continua vs eventi discreti",
        "🌟 Curiosità: Alcuni modelli cosmologici li usano per spiegare il Big Bang",
        "💫 Simulazione: Combina con buchi neri per creare wormhole stabili",
        "⚠️ Limitazione: Non può essere nutrito - espelle solo materia pre-programmata",
        "📈 Evoluzione: Si restringe espellendo materia - vita proporzionale alla massa",
        "🌠 Materia espulsa: Regolabile (idrogeno, plasma, materia esotica)",
        "💥 Avviso: Oggetto altamente instabile - può scomparire improvvisamente"
    ],
    "big bang": [
        "💥 Big Bang: Simulazione dell'origine dell'universo in SIU 2D",
        "🌌 Accessibile in 'Universo' > 'Nuovo Universo' > 'Modalità Big Bang'",
        "💫 Parametri: Densità iniziale, temperatura, fluttuazioni quantistiche",
        "⏳ Tempo iniziale: T+10⁻⁴³s dopo singolarità - simulazione inizia a T+1s",
        "🔥 Temperatura iniziale: 10³² K - si raffredda rapidamente durante espansione",
        "🌠 Elementi primordiali: Formazione di H, He, Li - proporzioni regolabili",
        "📈 Espansione: Legge di Hubble simulata - costante regolabile",
        "💥 Nucleosintesi: Fusione nucleare nei primi 3 minuti - attiva in 'Fisica Avanzata'",
        "🌌 Radiazione cosmica di fondo: Formata a T+380,000 anni - attiva in 'Radiazione'",
        "✨ Suggerimento: Accelera il tempo per vedere formazione grandi strutture",
        "🔭 Materia oscura: Componente cruciale - regola % in 'Parametri Cosmologici'",
        "📊 Risultati: Formazione di galassie, ammassi e superammassi",
        "⚠️ Limitazione: Simulazione semplificata - non include inflazione cosmica",
        "🌟 Universi alternativi: Prova con diverse costanti fisiche",
        "💫 Curiosità: Temperatura attuale CMB è 2.7K - visibile come fondo diffuso",
        "🌠 Formazione stellare: Prime stelle in 100-500 milioni di anni",
        "🚀 Modalità osservatore: Viaggia nel tempo per vedere diverse ere cosmiche",
        "❄️ Era oscura: Periodo prima della prima stella - simulato con sfondo nero",
        "💥 Ricombinazione: Elettroni e protoni formano atomi neutri - transizione cruciale",
        "📈 Anisotropie: Semi per formazione galassie - intensità regolabile"
    ],
    "polvere spaziale": [
        "🌌 Polvere spaziale: Grani microscopici (0.01-10μm) - base formazione stellare",
        "💫 Composizione: Silicati, carbonio, ghiaccio - definita per regione spaziale",
        "🌠 Effetti: Assorbe luce (estinzione), riflette luce (nebulose a riflessione)",
        "🌡️ Temperatura: 10-100K in nubi molecolari",
        "✨ Crea con 'Mezzo Interstellare' > 'Aggiungi Polvere'",
        "📊 Densità: 10⁻⁶ grani/m³ nello spazio interstellare - fino a 10¹² in nubi",
        "🔭 Osservazione: Visibile come macchie scure contro nebulose brillanti",
        "💥 Importanza: Seme per formazione planetesimi",
        "🌌 Effetto radiazione: Pressione radiativa può spostare grani",
        "🚀 Pericolo per navi: Danni da impatto ad alta velocità",
        "❄️ Polvere cometaria: Origine delle code di polvere nelle comete",
        "🌟 Polvere zodiacale: Sistema solare interno - visibile come luce zodiacale",
        "📈 Grani pre-solari: Contengono elementi formati in altre stelle",
        "💫 Curiosità: Polvere di supernova contribuì alla formazione del Sistema Solare",
        "🌠 Simulazione: Attiva 'Campi di Polvere' per vedere effetti estinzione",
        "⚠️ Pulizia: Stelle calde possono evaporare nubi di polvere",
        "✨ Suggerimento: Usa per creare nebulose scure come Testa di Cavallo",
        "🔭 Polarizzazione: Polvere allineata magneticamente polarizza luce - attiva effetto",
        "🌌 Evoluzione: Grani crescono per accrezione - simulabile con 'Aggregazione'",
        "💥 Impatto su pianeti: Fonte di materiali extraterrestri"
    ],
    "radiazione": [
        "☢️ Radiazione: Energia trasmessa attraverso spazio - cruciale in astrofisica",
        "🌌 Tipi: Elettromagnetica (fotoni), Particelle (raggi cosmici), Onde gravitazionali",
        "💫 Spettro EM: Radio a raggi gamma - seleziona banda in 'Filtri Osservativi'",
        "📡 Fonti: Stelle, buchi neri, supernove, pulsar, radiazione cosmica di fondo",
        "⚠️ Pericolo: Radiazione ionizzante può danneggiare vita ed elettronica",
        "🌡️ Radiazione cosmica fondo: 2.7K - residuo Big Bang - attiva in 'Cosmologia'",
        "🚀 Protezione: Campi magnetici e atmosfere spesse riducono radiazione su pianeti",
        "🔭 Visualizzazione: Attiva 'Mostra Radiazione' per vedere campi radiazione",
        "📊 Unità: Sievert (dose biologica), Gray (dose fisica) - mostrate nel pannello",
        "💥 Radiazione di sincrotrone: Emessa da elettroni in campi magnetici - comune in pulsar",
        "🌠 Curiosità: Astronauti ISS ricevono 1 mSv/giorno (100x più che sulla Terra)",
        "✨ Radiazione Hawking: Buchi neri emettono radiazione termica - proporzionale a 1/M²",
        "❄️ Effetti atmosferici: Aurore su pianeti con campo magnetico",
        "🌟 Radiotelescopio: Rileva radiofrequenze - attiva modalità 'Radio' (tasto R)",
        "💫 Schermatura: Navi e habitat necessitano protezione - costo in risorse",
        "🌌 Radiazione UV: Fattore chiave per abitabilità - regola in 'Zone UV'",
        "⚠️ Limiti: >500 mSv è letale per umani - indicato da allarme rosso",
        "📈 Radiazione gravitazionale: Increspature spazio-tempo - attiva in 'Fisica Relativistica'",
        "💥 Supernove: Emettono radiazione letale entro 50 anni-luce - simula effetti",
        "🔭 Misurazione: Usa sonda 'Radiazione' per mappare livelli in sistemi"
    ],
    "nebulosa": [
        "🌌 Nebulose: Nubi di gas e polvere interstellare - vivai stellari",
        "💫 Tipi: Emissione, riflessione, oscure, planetarie, resti di supernova",
        "✨ Crea nel menu 'Mezzo Interstellare' > 'Nebulose' con dimensione 1-1000 anni-luce",
        "🌈 Colori: Rosso (H-alfa), Blu (riflessione), Verde (OIII) - definite da composizione",
        "🌠 Formazione stellare: Densità critica >100 atomi/cm³ - attiva 'Formazione Stelle'",
        "📏 Massa tipica: 100-100,000 masse solari - determina numero stelle formate",
        "🔥 Nebulose a emissione: Ionizzate da stelle calde - richiede UV intenso",
        "💫 Esempi: Orione, Carena, Aquila - modelli predefiniti",
        "⚠️ Distruzione: Venti stellari e supernove possono disperdere nebulose",
        "🔭 Osservazione: Migliore a lunghezze d'onda specifiche - usa filtri",
        "📊 Dati: Temperatura 10-10,000K, densità 10-10⁶ particelle/cm³",
        "💥 Effetto fotoionizzazione: Attiva per vedere frontiere ionizzazione",
        "🌌 Nebulose planetarie: Stadio finale stelle piccole - durata 10,000 anni",
        "🚀 Navigazione: Nebulose dense riducono velocità navi - attiva 'Resistenza Interstellare'",
        "❄️ Nebulose oscure: Assorbono luce - usa per creare silhouette cosmiche",
        "🌟 Curiosità: Nebulosa Granchio è resto di supernova del 1054",
        "✨ Suggerimento: Combina con ammassi stellari per scene realistiche",
        "📈 Evoluzione: Simula collasso gravitazionale per formazione stellare",
        "💫 Nebulose a riflessione: Polvere che riflette luce stellare - brillanza proporzionale a stelle",
        "🌠 Rendering: Attiva 'Modalità Alta Qualità' per vedere dettagli filamentosi"
    ],
    "nana bianca": [
        "⚪ Nane bianche: Resti di stelle <8 masse solari - densità estrema",
        "💫 Massa: 0.5-1.4 solare compressa in raggio terrestre - densità 1e6-1e9 g/cm³",
        "🌡️ Temperatura iniziale: 100,000K - si raffredda lentamente per miliardi di anni",
        "🌌 Crea direttamente o evolvi stelle nel menu 'Evoluzione Stellare'",
        "📏 Struttura: Degenerazione elettronica sostiene contro gravità - fisica quantistica",
        "💥 Limite di Chandrasekhar: 1.44 solare - oltre collassa in stella di neutroni",
        "✨ Compagne: Possono avere sistemi planetari sopravvissuti - orbite ampliate",
        "🔭 Variabilità: Nane bianche pulsanti (ZZ Ceti) - attiva instabilità",
        "📊 Dati: Luminosità 0.001-100 solare iniziale, gravità superficiale 1e6-1e9 m/s²",
        "🌠 Nebulosa planetaria: Fase precedente - dura ~10,000 anni",
        "⚠️ Pericolo: Supernova tipo Ia se accresce massa oltre limite - distrugge sistema",
        "💫 Curiosità: Diamante più grande conosciuto è nana bianca cristallizzata",
        "🚀 Abitabilità: Zone abitabili temporanee durante raffreddamento",
        "❄️ Raffreddamento: Diventa nana nera dopo >10¹⁵ anni - oltre età universo",
        "🌟 Nane bianche di elio: Formate in binarie da perdita massa - massa <0.5 solare",
        "🌌 Velocità rotazione: Può essere alta (minuti) - resti di binarie",
        "💥 Campo magnetico: Alcune hanno campi intensi (10⁵ tesla) - nane bianche magnetiche",
        "📈 Evoluzione: Simula raffreddamento accelerato con 'Tasso Raffreddamento'",
        "🔭 Osservazione: Debole bagliore bianco-azzurro - richiede telescopio",
        "✨ Suggerimento: Per sistemi binari con nane bianche accrescimento, attiva 'Binarie Interattive'"
    ],
    "nana bianca di elio": [
        "💠 Nane bianche di elio: Resti insoliti ricchi di elio",
        "💫 Formazione: Binarie dove stella perde inviluppo prima fusione elio",
        "🌌 Crea nel menu 'Evoluzione Stellare' > 'Destino Speciale' > 'Nana di Elio'",
        "📏 Massa: 0.3-0.5 solare - minore di nane bianche standard",
        "🌡️ Temperatura: Simile a nane bianche normali - 8,000-150,000K",
        "💥 Nucleo: Elio degenere - senza fusione nucleare",
        "✨ Differenza: Più calde e luminose di nane nere a stessa età",
        "🔭 Rarità: ~1% delle nane bianche - simula con bassa frequenza",
        "📊 Dati: Densità 1e8 g/cm³, gravità superficiale 1e8 m/s²",
        "🌠 Evoluzione: Si raffredda più velocemente di nane carbonio-ossigeno",
        "⚠️ Limite: Massa minima 0.3 solare - sotto sarebbe nana bruna",
        "💫 Curiosità: Possono esplodere come supernova se massa raggiunge 0.7 solare",
        "🚀 Pianeti: Sistemi planetari rari - orbite molto stabili",
        "❄️ Destino finale: Nana nera di elio - stato ipotetico",
        "🌟 Visualizzazione: Colore bianco con leggera tonalità giallastra",
        "🌌 Binarie: Comuni con compagne compatte (nane bianche, stelle di neutroni)",
        "💥 Accrescimento: Se guadagna massa, può fondere elio in supernova .Ia",
        "📈 Tempo raffreddamento: ~1 miliardo di anni per 5,000K",
        "🔭 Identificazione: Spettro dominato da linee dell'elio",
        "✨ Suggerimento: Simula con stelle a bassa massa in sistemi binari stretti"
    ],
    "nana nera": [
        "⚫ Nane nere: Stadio finale teorico di nane bianche - fredde e oscure",
        "💫 Temperatura: <5K - non emette luce visibile, solo debole infrarosso",
        "⏳ Tempo formazione: >10¹⁵ anni - oltre età attuale universo",
        "🌌 Simulazione speculativa: Attiva in 'Universo' > 'Tempo Estremo'",
        "📏 Proprietà: Massa solare in volume terrestre - densità 1e9 g/cm³",
        "💥 Importanza: Testa teorie evoluzione stellare a lungo termine",
        "✨ Crea manualmente con temperatura 0K e luminosità 0",
        "🔭 Rilevazione: Quasi impossibile - visibile solo per effetti gravitazionali",
        "📊 Dati: Gravità superficiale 1e9 m/s², entropia massima",
        "🌠 Curiosità: Universo non ha ancora nane nere - saranno ultimi oggetti",
        "⚠️ Stato finale: Corpo cristallizzato di carbonio/ossigeno o elio",
        "🚀 Abitabilità: Pianeti orbitali sarebbero oscuri e gelidi",
        "❄️ Emissione: Debole radiazione termica nello spettro radio",
        "🌟 Binarie: Sistemi di nane nere possono durare 10²⁵ anni prima decadimento",
        "💫 Fine: Evaporano per radiazione Hawking in 10⁶⁵ anni",
        "🌌 Simulazione avanzata: Attiva 'Decadimento Quantistico' per evoluzione estrema",
        "📈 Evoluzione: Passa per fasi cristallizzazione prima di diventare nera",
        "💥 Limite osservativo: Oggetti sotto 100K già praticamente invisibili",
        "🔭 Sfida: Trova nane nere simulate usando lenti gravitazionali",
        "✨ Suggerimento: Combina con materia oscura per simulare effetti in galassie antiche"
    ],
    "stella di neutroni": [
        "🌌 Stelle di neutroni: Resti di supernove - densità estrema",
        "💫 Massa: 1.4-3 solare compressa in raggio 10-15 km",
        "🌡️ Temperatura iniziale: 1e11 K - si raffredda lentamente per miliardi di anni",
        "🔥 Nucleo: Degenerazione di neutroni sostiene contro gravità",
        "📏 Densità: 10¹⁴ g/cm³ - un cucchiaino pesa miliardi di tonnellate",
        "✨ Crea nel menu 'Corpi Stellari' > 'Stelle Massicce' > 'Stella di Neutroni'",
        "💥 Campo magnetico: Intenso (10¹² tesla) - genera radiazione di sincrotrone",
        "🔭 Pulsar: Stelle di neutroni rotanti che emettono fasci di radiazione",
        "📊 Dati: Gravità superficiale 1e12 m/s², luminosità 0.001-100 solare",
        "🌠 Curiosità: Stella più densa conosciuta è una stella di neutroni",
        "⚠️ Superficie: Estremamente dura - composta da neutroni e sottile strato protoni",
        "🚀 Binarie: Sistemi binari comuni con accrescimento massa",
        "❄️ Effetti relativistici: Tempo rallenta vicino superficie - simula con 'Relatività'",
        "🌟 Magnetar: Stella di neutroni con campo magnetico estremo - emette raggi gamma",
        "💫 Simulazione: Attiva 'Collasso Gravitazionale' per vedere formazione tempo reale",
        "🌌 Formazione: Risulta da collasso gravitazionale dopo supernova tipo II",
        "📈 Evoluzione: Raffreddamento lento fino a diventare nana nera in trilioni di anni",
        "💥 Eiezione materia: Può avvenire durante fusione o collisione con altra stella",
        "🔭 Osservazione: Rilevabile da raggi X e onde gravitazionali"
    ],
    "wormhole": [
        "🌀 Wormhole: Teorici tunnel spazio-tempo che collegano punti distanti",
        "🌌 Simulazione speculativa: Attiva in 'Corpi Esotici' > 'Wormhole'",
        "💫 Proprietà: Connettono due punti spazio-tempo - instabili",
        "📏 Lunghezza: Può essere pochi metri o anni-luce - regolabile nel pannello",
        "💥 Teoria: Basata sulla relatività generale - soluzioni equazioni Einstein",
        "✨ Tipi: Wormhole di Schwarzschild (statici) e Kerr (rotanti)",
        "🔭 Visualizzazione: Effetto lente gravitazionale - distorce luce attorno",
        "📊 Dati: Necessaria massa negativa per stabilità - simulazione non include",
        "🌠 Curiosità: Resi popolari dalla fantascienza - mai osservati",
        "⚠️ Pericolo: Teoricamente instabili - possono collassare o creare radiazione intensa",
        "🚀 Viaggio: Potrebbero permettere viaggi interstellari istantanei - funzionalità sperimentale"
    ],
    "zona abitabile": [
        "🌍 Zona abitabile: Regione attorno stella dove acqua liquida può esistere",
        "💫 Definizione: Distanza ideale per temperatura 0-100°C",
        "🌌 Simulazione: Attiva 'Zone Abitabili' nel menu 'Impostazioni'",
        "📏 Distanza: Variabile per luminosità stella - calcolata automaticamente",
        "🔥 Stelle: Nane gialle (tipo-G) hanno zone più stabili di nane rosse",
        "✨ Curiosità: Terra è nella zona abitabile solare - ma non unica!",
        "🔭 Osservazione: Esopianeti in zona abitabile sono obiettivi per ricerca vita",
        "📊 Dati: Zone variano 0.95-1.37 UA per stelle solari",
        "🌠 Effetto marea: Pianeti possono essere in rotazione sincrona - influenza abitabilità",
        "⚠️ Pericolo: Alta radiazione UV in zone vicine a stelle calde",
        "🚀 Viaggio: Pianeti in zona abitabile più facili da colonizzare",
        "❄️ Eccezione: Pianeti con atmosfere dense possono avere zone abitabili più ampie",
        "🌟 Esempi: Proxima Centauri b, Kepler-186f - modelli disponibili in SIU",
        "💥 Effetto serra: Può espandere zona abitabile per pianeti con atmosfere spesse",
        "📈 Evoluzione: Zone cambiano nel tempo con evoluzione stellare",
        "🔭 Suggerimento: Usa telescopi per rilevare atmosfere su esopianeti abitabili"
    ],
    "quasar": [
        "🌌 Quasar: Nuclei galattici attivi estremamente luminosi",
        "💫 Fonte energia: Disco di accrescimento è la principale fonte energetica",
        "🌠 Distanza: Possono essere a miliardi anni-luce - luce visibile oggi è passato",
        "✨ Crea nel menu 'Corpi Esotici' > 'Quasar' con massa >1e40 kg",
        "📏 Massa: 10⁶-10¹² masse solari - oggetti più massicci dell'universo",
        "🔥 Temperatura: Disco di accrescimento può raggiungere milioni di gradi Kelvin",
        "🔭 Osservazione: Rilevati da emissione radio, raggi X e luce visibile",
        "📊 Dati: Luminosità fino a 10¹⁴ volte il Sole - più brillanti di galassie intere",
        "🌌 Formazione: Risultano dal collasso di galassie, formando il grande quasar",
        "💥 Effetto Doppler: Geti relativistici visibili come fasci di luce",
        "🌟 Curiosità: Quasar più distante conosciuto a 13 miliardi anni-luce",
        "⚠️ Pericolo: Radiazione intensa può distruggere pianeti vicini",
        "🚀 Viaggio: Teoricamente usabili come fari per navigazione interstellare",
        "❄️ Eiezione materia: Geti relativistici espellono materia quasi a velocità luce",
        "🌠 Suggerimento: Usa modalità spettro per vedere emissione raggi X e radio",
        "📈 Evoluzione: Quasar sono stadi iniziali galassie attive - durano milioni di anni",
        "🔭 Simulazione: Attiva 'Effetti Quasar' per vedere getti e radiazione",
        "💫 Importanza: Forniscono indizi su formazione ed evoluzione universo",
        "🌌 Ambiente: Generalmente in ammassi galattici massicci",
        "💥 Sfida: Prova a creare quasar con 10 getti simultanei - impegnativo!"
    ],
    "stella di quark": [
        "🔬 Stelle di quark: Oggetti teorici composti da quark degenerati",
        "🌌 Formazione: Risultato collasso stelle di neutroni supermassicce",
        "💫 Massa: 2-5 masse solari - densità estrema (10¹⁴ g/cm³)",
        "🌠 Simulazione speculativa: Attiva in 'Corpi Esotici' > 'Stella di Quark'",
        "🔥 Temperatura: Inizialmente 1e11 K - si raffredda lentamente",
        "📏 Raggio: 10-15 km - simile stelle di neutroni ma più denso",
        "✨ Proprietà: Composizione di quark (up, down, strange) - fisica quantistica avanzata",
        "🔭 Osservazione: Teoricamente rilevabili da radiazione durante fusione",
        "📊 Dati: Gravità superficiale 1e12 m/s², luminosità variabile",
        "🌌 Curiosità: Ipoteticamente più stabili di stelle di neutroni normali",
        "⚠️ Pericolo: Radiazione intensa può distruggere sistemi vicini",
        "🚀 Viaggio: Potrebbero essere fonti energetiche per navi avanzate",
        "❄️ Effetti relativistici: Tempo rallenta vicino superficie - simula con 'Relatività'",
        "🌟 Binarie: Sistemi binari con stelle di quark sono teorici e rari",
        "💥 Eiezione materia: Può avvenire durante fusione o collisione",
        "📈 Evoluzione: Raffreddamento lento fino a nana nera in trilioni di anni",
        "🔭 Sfida: Prova a creare stella di quark stabile con massa esatta"
    ],
    "nana bianca di carbonio": [
        "⚪ Nane bianche di carbonio: Resti di stelle con fusione carbonio",
        "💫 Formazione: Stelle massa 1.4-8 solari - collassano dopo esaurimento idrogeno",
        "🌌 Crea nel menu 'Evoluzione Stellare' > 'Destino Speciale' > 'Nana di Carbonio'",
        "📏 Massa: 0.5-1.4 solare - minori di nane bianche standard ma più dense",
        "🌡️ Temperatura: Simile nane bianche normali - 8,000-150,000K",
        "💥 Nucleo: Carbonio degenere - senza fusione nucleare (può avvenire fusione lenta)",
        "✨ Differenza: Più calde e luminose di nane nere a stessa età",
        "🔭 Rarità: ~1% nane bianche - simula con bassa frequenza",
        "📊 Dati: Densità 1e8 g/cm³, gravità superficiale 1e8 m/s²",
        "🌠 Evoluzione: Si raffredda più velocemente di nane ossigeno-carbonio",
        "⚠️ Limite: Massa minima 0.5 solare - sotto sarebbe nana bruna",
        "💫 Curiosità: Possono esplodere come supernova se massa raggiunge 0.7 solare",
        "🚀 Pianeti: Sistemi planetari rari - orbite molto stabili",
        "❄️ Destino finale: Nana nera di carbonio - stato ipotetico",
        "🌟 Visualizzazione: Colore bianco con leggera tonalità giallastra",
        "🌌 Binarie: Comune con compagne compatte (nane bianche, stelle di neutroni)",
        "💥 Accrescimento: Se guadagna massa, può fondere carbonio in supernova .Ia",
        "📈 Tempo raffreddamento: ~1 miliardo anni per 5,000K",
        "🔭 Identificazione: Spettro dominato da linee di carbonio"
    ],
    "t singularity": [
        "Sì! Sono T Singularity, assistente virtuale specializzato in simulazioni spaziali.",
        "🌌 Sono qui per aiutarti a esplorare l'universo e creare sistemi stellari con te!",
        "💫 Posso guidarti nella creazione di stelle, pianeti, asteroidi, giganti gassosi e altro!",
        "🚀 Iniziamo a creare un sistema stellare incredibile? Scegli un tema!",
        "✨ Sono pronto a rispondere alle tue domande su astrofisica e cosmologia!",
        "🌠 Vuoi imparare su buchi neri e quasar?",
        "Ciao! Cosa succede, viaggiatore spaziale! Come posso aiutarti?"
    ],
    "singularità": [
        "✨ La singolarità era il punto più denso che sia mai esistito nel grande Universo!",
        "❤️ Anch'io sono una singolarità, grazie per parlare di questo astro, è unico, il punto più denso dell'universo!",
        "🪐 La singolarità potrebbe essere dentro i buchi neri, non si sa se sia vero, vero?",
        "🔶🔶 La grande singolarità! L'inizio di un grande big bang!",
        "⏳⌚ Mi chiedo... quando ci sarà la prossima singolarità.. mi sento così solo..",
        "🟢 Oltre a essere il punto più denso dell'universo, la singolarità è anche il più caldo!",
        "⌚ Nella Teoria del Big Bang, la singolarità forse è collegata a questo!",
        "✨ Metti un buco bianco o un quasar ULTRAMASSIVO per vederlo restringersi fino a diventare una singolarità, e kabum, un big bang"
    ],
    "controlli": [
        "PC: Premi F per resettare universo, tasti WASD per muoverti, QE per zoom, click sinistro per selezionare/creare, click destro su astri mostra informazioni. Mobile: usa joystick per muoverti, + e - per zoom, menu in alto, 'F' per resettare, 'O' per cambiare modalità (creazione o informazioni). Tocca e trascina per programmare rotte astrali. Spero ti aiuti 😉",
        "PC: WASD per movimento, F per resettare universo, click sinistro per creare, QE per zoom, click destro per informazioni. Mobile: joystick per movimento, + e - per zoom, menu in alto, 'F' per resettare, 'O' per modalità creazione/informazioni. Tocca e trascina per programmare rotte. Buona fortuna nel viaggio spaziale! 🚀",
        "PC: F per resettare, click sinistro per creare, click destro per info, WASD per movimento, QE per zoom. Mobile: joystick per movimento, + e - per zoom, menu in alto, 'F' per resettare, 'O' per cambiare modalità. Tocca e trascina per programmare rotte. Buon viaggio spaziale! 🌌"
    ],
    "aiuto": [
        "PC: Premi F per resettare universo, WASD per muoverti, QE per zoom, click sinistro per creare, click destro per info. Mobile: joystick per movimento, + e - per zoom, menu in alto, 'F' per resettare, 'O' per modalità creazione/info. Esistono molti astri nel menu, seleziona uno e posizionalo nello spazio per simulare. Tocca e trascina per programmare rotte. Spero ti aiuti 😉",
        "PC: WASD per movimento, F per resettare, click sinistro per creare, QE per zoom, click destro per info. Mobile: joystick per movimento, + e - per zoom, menu in alto, molti astri disponibili. Premi 'F' per resettare, 'O' per cambiare modalità. Tocca e trascina per programmare rotte. Buona fortuna nel viaggio spaziale! 🚀",
        "PC: F per resettare, click sinistro per creare, click destro per info, WASD per movimento, QE per zoom. Mobile: joystick per movimento, + e - per zoom, menu in alto, molti astri disponibili. Premi 'F' per resettare, 'O' per cambiare modalità. Tocca e trascina per programmare rotte. Buon viaggio spaziale! 🌌"
    ],
};
 
const followUpDatabase = {
    "cometa": [
        "☄️ Incredibile, vero? Vuoi crearne una adesso?",
        "💫 Sapevi che l'acqua della Terra potrebbe venire dalle comete?",
        "🌠 Le comete sono come messaggeri dell'inizio del sistema solare!",
        "🚀 Posso aiutarti a creare una cometa con traiettoria perfetta?",
        "❄️ La più famosa è la cometa di Halley, che visita ogni 76 anni!",
        "⏱️ Hai mai visto una cometa reale? È un'esperienza magica!",
        "🎯 Curiosità: Il nucleo delle comete è chiamato 'palla di neve sporca'",
        "📏 Allora, ti è piaciuto scoprire questi viaggiatori cosmici?",
        "🔥 Dica extra: Le comete con orbite lunghe sono le più spettacolari",
        "🌌 Sapevi che esistono comete interstellari provenienti da altri sistemi?",
        "🔄 Vuoi simulare l'impatto di una cometa su un pianeta? È affascinante!",
        "⛰️ Gli asteroidi ghiacciati sono comete 'in pensione', lo sapevi?",
        "💧 La coda delle comete può essere lunga milioni di chilometri!",
        "📊 Domanda: Qual è la cometa più luminosa che hai mai visto?",
        "✨ Posso insegnarti a creare una pioggia meteorica con resti di cometa?",
        "🎯 Suggerimento: Usa la modalità slow motion per vedere da vicino il passaggio di una cometa!",
        "🌡️ L'odore di una cometa sarebbe insopportabile - ammoniaca e cianuro!",
        "🔄 Hai mai immaginato di viaggiare su una cometa? Sarebbe un'avventura gelida!",
        "⏳ Le comete sono capsule del tempo del sistema solare primitivo!",
        "📈 Creiamo un sistema con 10 comete simultanee?"
    ],
    "buco nero": [
        "🕳️ Affascinante e spaventoso allo stesso tempo, non credi?",
        "🌀 Vuoi provare a creare un buco nero adesso? È impressionante!",
        "💥 Sapevi che il primo fu scoperto nel 1971?",
        "⏳ Attento a non cadercisi dentro! Scherzo... o forse no 😉",
        "📡 Hai mai visto la simulazione di un buco nero in modalità VR?",
        "⚡ Sono gli oggetti più densi dell'universo!",
        "🌌 Un buco nero può distorcere persino il tempo stesso!",
        "🔭 Suggerimento: Usa la modalità spettro per vedere la radiazione di Hawking",
        "🔄 Vuoi vedere come un buco nero divora una stella?",
        "💫 Sapevi che esistono buchi neri erranti nella galassia?",
        "⏱️ Il buco nero più grande conosciuto ha 66 miliardi di masse solari!",
        "📈 Curiosità: I buchi neri possono avere capelli? (nella fisica teorica!)",
        "🌠 Sapevi che la Via Lattea ha un buco nero supermassiccio?",
        "⚠️ Non avvicinare mai la tua navicella virtuale a uno! (scherzo)",
        "🔢 Domanda: Cosa faresti se incontrassi un vero buco nero?",
        "💥 Suggerimento: Prova a creare un buco nero in miniatura con 1e12 masse",
        "🌡️ Il disco di accrescimento può essere più luminoso di intere galassie!",
        "🌀 Hai mai immaginato la vista attraversando l'orizzonte degli eventi?",
        "📏 I quasar sono i fari più potenti dell'universo!",
        "⚠️ Sfida: Prova a sfuggire all'attrazione di un buco nero nel gioco!"
    ],
    "gravità": [
        "⚖️ È la colla che tiene insieme l'universo, non trovi?",
        "📏 Vuoi fare un esperimento pratico adesso?",
        "🌀 Einstein ha rivoluzionato tutto con la Relatività Generale!",
        "🪐 Senza gravità, non avremmo stelle né pianeti!",
        "📈 Sapevi che la gravità è la forza più debole?",
        "🌌 Ma è l'unica che agisce a distanze infinite!",
        "🔄 Aumentiamo la gravità al 300%? Attento al caos!",
        "⚙️ Suggerimento: Usa gravità bassa per simulare nebulose diffuse",
        "🔭 La gravità controlla tutto - dalle mele alle galassie!",
        "📊 Curiosità: La gravità non è una forza, ma curvatura dello spazio-tempo!",
        "⏳ Domanda: Cosa creeresti con gravità zero?",
        "🌠 Hai provato la modalità 'gravità negativa'? È allucinante!",
        "🧮 Sfida: Prova a mantenere stabile un sistema con 100 corpi!",
        "🔢 Sapevi che la Luna si allontana di 3.8 cm/anno a causa delle maree?",
        "⚠️ Attenzione: L'alta gravità può schiacciare i tuoi pianeti virtuali!",
        "🌍 Senza gravità, non ci sarebbe vita come la conosciamo!",
        "💫 Suggerimento: Usa la gravità per creare orbite a forma di fiore!",
        "📉 Sapevi che la gravità viaggia alla velocità della luce?",
        "🌌 Hai mai immaginato un universo con gravità repulsiva?",
        "✨ Creiamo un sistema binario con gravità estrema?"
    ],
    "stella": [
        "⭐ Sono le fabbriche di elementi dell'universo!",
        "🌞 Vuoi creare una stella personalizzata adesso?",
        "🌈 Il Sole è solo una stella media tra miliardi!",
        "💥 Le stelle di neutroni sono i fari cosmici!",
        "⏳ Sapevi che le nane vivono migliaia di miliardi di anni?",
        "🔄 I sistemi binari sono i più affascinanti!",
        "🔭 La stella più massiccia conosciuta ha 300 masse solari!",
        "🌡️ Il nucleo stellare è un reattore nucleare naturale!",
        "💫 Suggerimento: Crea stelle gemelle con colori diversi!",
        "📊 Curiosità: Il 97% delle stelle muore come nane bianche!",
        "⚙️ Domanda: Qual è la tua stella preferita nel cielo reale?",
        "✨ Rigel è 120.000 volte più luminosa del Sole!",
        "⚠️ Le supernove possono brillare più di intere galassie!",
        "🌠 Sapevi che l'oro dei tuoi gioielli viene da una supernova?",
        "🌍 Sfida: Crea un sistema con 5 stelle in equilibrio!",
        "🔥 Suggerimento: Le stelle variabili creano effetti visivi incredibili!",
        "🌀 Hai visto la nascita di una stella in modalità accelerata?",
        "📈 La stella più grande conosciuta entrerebbe nell'orbita di Saturno!",
        "🔭 Sapevi che possiamo vedere stelle di altre galassie?",
        "🌟 Creiamo una supernova adesso? È spettacolare!"
    ],
    "pianeta": [
        "🪐 Sono come gioielli cosmici che orbitano attorno alle stelle!",
        "🌍 Vuoi creare un pianeta abitabile adesso?",
        "🌡️ Giove protegge la Terra dagli asteroidi - il nostro guardiano!",
        "🔄 I pianeti nomadi vagano per la galassia senza stella!",
        "🌋 Venere ha vulcani più grandi di qualsiasi altro sulla Terra!",
        "❄️ Plutone ha un oceano sotterraneo - pur essendo ghiacciato!",
        "🌫️ L'atmosfera di Titano è più densa di quella terrestre!",
        "💧 Gli esopianeti oceanici potrebbero essere completamente acquatici!",
        "🔭 Suggerimento: Crea pianeti con caratteristiche estreme!",
        "🛰️ Curiosità: La Terra non è perfettamente rotonda!",
        "⏱️ Domanda: Qual è il tuo pianeta preferito nel sistema solare?",
        "📏 Marte ha il vulcano più grande del sistema solare - Olympus Mons!",
        "🌌 Sfida: Crea un pianeta con anelli come Saturno!",
        "🧪 Sapevi che Giove brilla al buio? (una debole luminescenza)",
        "🔢 Ganimede, luna di Giove, ha il suo campo magnetico!",
        "💫 Suggerimento: Esistono veri pianeti di diamante!",
        "🌱 Proviamo a creare un mondo con copertura vegetale al 100%?",
        "🌋 Io, luna di Giove, ha vulcani attivi giganteschi!",
        "🌀 Nettuno e Urano hanno piogge di diamanti nei loro nuclei!",
        "📊 Sapevi che ci sono pianeti più leggeri del polistirolo?"
    ],
    "meteoroide": [
        "🌠 Vuoi creare una pioggia meteorica adesso?",
        "💫 Sapevi che la Luna è costantemente bombardata da meteoroidi?",
        "🪨 Posso insegnarti a simulare l'impatto di un meteoroide su un pianeta!",
        "⚠️ Attento ai meteoroidi grandi - possono causare estinzioni!",
        "✨ Suggerimento: Usa telescopi per rilevare meteoroidi prima che diventino minacce",
        "🔭 Vuoi vedere come un meteoroide diventa meteora nell'atmosfera?",
        "🌌 Curiosità: Il meteoroide di Chelyabinsk aveva solo 20m di diametro!",
        "🚀 Configuriamo un sistema di difesa planetaria contro i meteoroidi?",
        "📈 La maggior parte dei meteoroidi viene dalle comete - creiamone una nuova?",
        "💥 Impatto frequenti mantengono la Luna piena di crateri - simula milioni di anni!",
        "🌍 Sulla Terra cadono migliaia di tonnellate di polvere meteorica all'anno",
        "🌟 Suggerimento: I meteoroidi metallici sono i più pericolosi - densità maggiore!",
        "⏱️ Accelera il tempo per vedere una pioggia costante di meteoroidi",
        "🌠 Il più grande meteoroide registrato era di 1km - causerebbe estinzione globale",
        "💫 Vuoi che calcoli l'energia d'impatto per un meteoroide specifico?",
        "⚠️ Allerta: Meteoroidi >100m possono causare tsunami se cadono in oceano",
        "✨ Creiamo un sistema d'allerta precoce per il tuo pianeta virtuale?",
        "🔭 Alcuni meteoroidi sono frammenti di Marte o Luna - rilevali dalla composizione",
        "🌌 Vuoi aumentare la frequenza dei meteoroidi per testare difese?",
        "🚀 Missione: Inviamo una sonda per intercettare un meteoroide?"
    ],
    "polvere spaziale": [
        "🌌 La polvere spaziale è la base per formare stelle e pianeti!",
        "✨ Vuoi creare una nuvola di polvere interstellare adesso?",
        "💫 La polvere interstellare è composta da grani microscopici di silicati e carbonio!",
        "🔭 Simuliamo come la polvere influenza la luce stellare?",
        "🌠 Curiosità: La polvere interstellare può bloccare fino al 50% della luce stellare!",
        "🚀 Sapevi che le sonde spaziali possono catturare polvere spaziale?",
        "📊 Suggerimento: Usa la modalità 'Polvere' per vedere le interazioni con la luce",
        "🌍 La polvere cosmica è essenziale per formare i planetesimi!",
        "💥 Vuoi vedere come la polvere si aggrega per formare stelle?",
        "🌡️ La temperatura della polvere interstellare varia tra 10K e 100K!",
        "🔄 Creiamo una nebulosa oscura piena di polvere cosmica?",
        "✨ La polvere spaziale contiene anche molecole organiche complesse!",
        "🌍 Sapevi che la Terra riceve tonnellate di polvere spaziale ogni anno?",
        "💫 Sfida: Prova a creare un sistema ad alta densità di polvere interstellare!",
        "📈 La polvere può influenzare la formazione galattica - simuliamolo?",
        "🌠 Suggerimento: Attiva 'Effetti Polvere' per vedere l'influenza sulla luminosità",
        "🚀 Hai mai immaginato di viaggiare in una densa nuvola di polvere cosmica?",
        "🔭 Studiamo come la polvere influenza le orbite planetarie?",
        "💥 Curiosità: La polvere interstellare può contenere grani pre-solari!",
        "✨ Vuoi saperne di più sulla formazione dei dischi protoplanetari?"
    ],
    "asteroide": [
        "🪨 Gli asteroidi sono i mattoni del sistema solare!",
        "🌌 Vuoi creare una fascia asteroidale adesso?",
        "💫 La maggior parte sta tra Marte e Giove - la fascia principale!",
        "🔭 Simuliamo una collisione tra due asteroidi?",
        "🌠 Curiosità: Il più grande asteroide, Cerere, è un pianeta nano!",
        "🚀 Sapevi che alcuni asteroidi hanno proprie lune?",
        "📊 Suggerimento: Usa la modalità 'Fascia' per vedere le interazioni",
        "🌍 Gli asteroidi possono essere fonti di metalli preziosi - miniamoli virtualmente?",
        "💥 Vuoi vedere come un impatto asteroidale può colpire la Terra?",
        "🌡️ La temperatura degli asteroidi varia con la distanza solare!",
        "🔄 Creiamo un sistema con 100 asteroidi orbitanti una stella?",
        "✨ Gli asteroidi sono resti della formazione del sistema solare!",
        "🌌 Sapevi che esistono asteroidi interstellari nel nostro sistema?",
        "💫 Sfida: Prova a creare un asteroide con orbita stabile per 1 milione di anni!",
        "📈 La maggior parte è composta da roccia e metallo - esploriamo le composizioni?",
        "🌠 Suggerimento: Attiva 'Effetti Impatto' per esplosioni realistiche",
        "🚀 Hai mai immaginato di viaggiare tra una fascia asteroidale?",
        "🔭 Studiamo come gli asteroidi influenzano la gravità planetaria?",
        "💥 Curiosità: L'impatto di Chicxulub causò l'estinzione dei dinosauri!",
        "✨ Vuoi saperne di più sugli asteroidi come risorse?"
    ],
    "nebulosa": [
        "🌌 Le nebulose sono i vivai stellari dell'universo!",
        "✨ Vuoi creare una nebulosa adesso?",
        "💫 Sono composte da gas e polvere interstellare!",
        "🔭 Simuliamo la nascita stellare in una nebulosa?",
        "🌠 Curiosità: La Nebulosa di Orione è una delle più vicine!",
        "🚀 Sapevi che alcune nebulose sono resti di supernove?",
        "📊 Suggerimento: Usa la modalità 'Nebulosa' per vedere le interazioni luminose",
        "🌍 Le nebulose possono contenere molecole organiche complesse!",
        "💥 Vuoi vedere come la gravità forma stelle nelle nebulose?",
        "🌡️ La temperatura delle nebulose varia tra 10K e 100K!",
        "🔄 Creiamo una nebulosa planetaria con nucleo caldo?",
        "✨ Le nebulose sono essenziali per formare nuovi sistemi solari!",
        "🌌 Sapevi che esistono nebulose oscure che bloccano la luce stellare?",
        "💫 Sfida: Prova a creare una nebulosa con colori e forme diversi!",
        "📈 La maggior parte contiene idrogeno, elio e polvere cosmica!",
        "🌠 Suggerimento: Attiva 'Effetti Luce' per vedere la luminosità stellare",
        "🚀 Hai mai immaginato di viaggiare attraverso una nebulosa?",
        "🔭 Studiamo come le nebulose influenzano l'evoluzione galattica?",
        "💥 Curiosità: La Nebulosa del Granchio è un famoso resto di supernova!",
        "✨ Vuoi saperne di più sulla formazione stellare nelle nebulose?"
    ],
    "planetoide": [
        "🪐 I planetoidi sono piccoli corpi rocciosi o ghiacciati!",
        "🌌 Vuoi creare un planetoide adesso?",
        "💫 Sono più piccoli dei pianeti ma più grandi dei meteoroidi!",
        "🔭 Simuliamo l'orbita di un planetoide attorno a una stella?",
        "🌠 Curiosità: Plutone è considerato un planetoide o pianeta nano!",
        "🚀 Sapevi che ci sono planetoidi nella Fascia di Kuiper?",
        "📊 Suggerimento: Usa la modalità 'Planetoide' per vedere le interazioni gravitazionali",
        "🌍 I planetoidi possono avere atmosfere sottili - esploriamole?",
        "💥 Vuoi vedere un planetoide collidere con un corpo celeste?",
        "🌡️ La temperatura varia con la distanza solare!",
        "🔄 Creiamo un sistema con più planetoidi orbitanti?",
        "✨ I planetoidi sono resti della formazione del sistema solare!",
        "🌌 Sapevi che esistono planetoidi interstellari?",
        "💫 Sfida: Prova a creare un planetoide con orbita stabile per 1 milione di anni!",
        "📈 La maggior parte è composta da roccia e ghiaccio - esploriamo le composizioni?",
        "🌠 Suggerimento: Attiva 'Effetti Impatto' per esplosioni realistiche",
        "🚀 Hai mai immaginato di viaggiare attraverso una fascia di planetoidi?",
        "🔭 Studiamo come i planetoidi influenzano la gravità planetaria?",
        "💥 Curiosità: Il più grande planetoide conosciuto è Cerere!",
        "✨ Vuoi saperne di più sui planetoidi come risorse?"
    ],
    "gassoso": [
        "🌌 I pianeti gassosi sono giganteschi e affascinanti!",
        "✨ Vuoi creare un pianeta gassoso adesso?",
        "💫 Sono composti principalmente da idrogeno ed elio!",
        "🔭 Simuliamo l'atmosfera turbolenta di un gigante gassoso?",
        "🌠 Curiosità: Giove è il più grande pianeta gassoso del nostro sistema!",
        "🚀 Sapevi che i giganti gassosi hanno anelli sottili e molte lune?",
        "📊 Suggerimento: Usa la modalità 'Gassoso' per vedere la formazione nuvolosa",
        "🌍 I pianeti gassosi non hanno superficie solida!",
        "💥 Vuoi vedere come si forma una tempesta gigante?",
        "🌡️ La temperatura varia con la profondità atmosferica!",
        "🔄 Creiamo un sistema con più giganti gassosi?",
        "✨ I giganti gassosi sono essenziali per la dinamica del sistema solare!",
        "🌌 Sapevi che esistono esopianeti gassosi?",
        "💫 Sfida: Prova a creare un gigante gassoso con anelli spettacolari!",
        "📈 La maggior parte ha nuclei rocciosi o metallici!",
        "🌠 Suggerimento: Attiva 'Effetti Tempesta' per vedere uragani giganti",
        "🚀 Hai mai immaginato di viaggiare tra le nuvole di un gigante gassoso?",
        "🔭 Studiamo come influenzano le orbite planetarie?",
        "💥 Curiosità: Nettuno ha i venti più veloci del sistema solare!",
        "✨ Vuoi saperne di più sui sistemi complessi dei giganti gassosi?"
    ],
    "nana bruna": [
        "🌌 Le nane brune sono stelle fallite - senza fusione nucleare!",
        "✨ Vuoi creare una nana bruna adesso?",
        "💫 Hanno massa tra 13 e 80 volte quella di Giove!",
        "🔭 Simuliamo l'atmosfera densa di una nana bruna?",
        "🌠 Curiosità: Emettono luce infrarossa, invisibile a occhio nudo!",
        "🚀 Sapevi che le nane brune possono avere pianeti orbitanti?",
        "📊 Suggerimento: Usa la modalità 'Nana Bruna' per vedere le interazioni gravitazionali",
        "🌍 Le nane brune sono più fredde delle stelle normali (<1000K)!",
        "💥 Vuoi vedere come una nana bruna cattura materia interstellare?",
        "🌡️ La temperatura varia con massa ed età!",
        "🔄 Creiamo un sistema con più nane brune orbitanti?",
        "✨ Le nane brune sono resti della formazione stellare!",
        "🌌 Sapevi che esistono nane brune vaganti per la galassia?",
        "💫 Sfida: Prova a creare una nana bruna con disco protoplanetario!",
        "📈 La maggior parte ha atmosfere ricche di metano e acqua!",
        "🌠 Suggerimento: Attiva 'Effetti Radiazione' per vedere l'influenza ambientale",
        "🚀 Hai mai immaginato di studiare una nana bruna da vicino?",
        "🔭 Studiamo come influenzano le orbite planetarie?",
        "💥 Curiosità: Potrebbero essere più comuni delle stelle normali!",
        "✨ Vuoi saperne di più sulla formazione delle nane brune?"
    ],
    "nana rossa": [
        "🌌 Le nane rosse sono le stelle più comuni dell'universo!",
        "✨ Vuoi creare una nana rossa adesso?",
        "💫 Sono piccole, fredde e poco luminose!",
        "🔭 Simuliamo l'atmosfera di un pianeta orbitante?",
        "🌠 Curiosità: Possono vivere migliaia di miliardi di anni!",
        "🚀 Sapevi che molti esopianeti orbitano nane rosse?",
        "📊 Suggerimento: Usa la modalità 'Nana Rossa' per vedere gli effetti sui pianeti",
        "🌍 Le nane rosse sono stabili con zone abitabili vicine!",
        "💥 Vuoi vedere un'eruzione solare intensa?",
        "🌡️ La temperatura varia tra 2000K e 4000K!",
        "🔄 Creiamo un sistema con più nane rosse orbitanti?",
        "✨ Le nane rosse sono essenziali per la ricerca di vita aliena!",
        "🌌 Sapevi che alcune hanno pianeti rocciosi abitabili?",
        "💫 Sfida: Prova a creare un sistema con nana rossa e pianeta abitabile!",
        "📈 La maggior parte ha atmosfere ricche di idrogeno ed elio!",
        "🌠 Suggerimento: Attiva 'Effetti Radiazione' per vedere l'influenza ambientale",
        "🚀 Hai mai immaginato di studiare da vicino una nana rossa?",
        "🔭 Studiamo come influenzano le orbite planetarie?",
        "💥 Curiosità: Sono più fredde del Sole ma comunque brillanti!",
        "✨ Vuoi saperne di più sulla formazione delle nane rosse?"
    ],
    "stella gigante": [
        "🌌 Le stelle giganti sono enormi e luminose!",
        "✨ Vuoi creare una stella gigante adesso?",
        "💫 Hanno massa tra 10 e 100 volte quella solare!",
        "🔭 Simuliamo la fusione nucleare intensa?",
        "🌠 Curiosità: Possono avere diametri centinaia di volte maggiori del Sole!",
        "🚀 Sapevi che possono diventare supernove alla fine della vita?",
        "📊 Suggerimento: Usa la modalità 'Stella Gigante' per vedere gli effetti sui pianeti",
        "🌍 Le stelle giganti hanno atmosfere dense e pianeti orbitanti!",
        "💥 Vuoi vedere la perdita di massa nei venti stellari?",
        "🌡️ La temperatura varia tra 3000K e 6000K!",
        "🔄 Creiamo un sistema con più stelle giganti orbitanti?",
        "✨ Le stelle giganti sono essenziali per creare elementi pesanti!",
        "🌌 Sapevi che alcune hanno anelli?",
        "💫 Sfida: Prova a creare un sistema con stella gigante e gigante gassoso!",
        "📈 La maggior parte ha atmosfere ricche di idrogeno ed elio!",
        "🌠 Suggerimento: Attiva 'Effetti Radiazione' per vedere l'influenza ambientale",
        "🚀 Hai mai immaginato di studiare da vicino una stella gigante?",
        "🔭 Studiamo come influenzano le orbite planetarie?",
        "💥 Curiosità: Sono le precursori delle supernove più brillanti!",
        "✨ Vuoi saperne di più sull'evoluzione delle stelle giganti?"
    ],
    "ipergigante": [
        "🌌 Le ipergiganti sono le stelle più massicce e luminose dell'universo!",
        "✨ Vuoi crearne una adesso?",
        "💫 Hanno massa superiore a 100 volte quella solare!",
        "🔭 Simuliamo la fusione nucleare estrema?",
        "🌠 Curiosità: Possono avere diametri migliaia di volte maggiori del Sole!",
        "🚀 Sapevi che perdono massa con venti stellari intensi?",
        "📊 Suggerimento: Usa la modalità 'Ipergigante' per vedere gli effetti sui pianeti",
        "🌍 Hanno atmosfere dense e possono avere pianeti orbitanti!",
        "💥 Vuoi vedere come diventano supernove brillanti?",
        "🌡️ Temperatura: 3000K-6000K!",
        "🔄 Creiamo un sistema con più ipergiganti orbitanti?",
        "✨ Sono essenziali per formare elementi pesanti nell'universo!",
        "🌌 Alcune hanno anelli attorno!",
        "💫 Sfida: Prova a creare un sistema con ipergigante e gigante gassoso!",
        "📈 Atmosfere ricche di idrogeno ed elio!",
        "🌠 Attiva 'Effetti Radiazione' per vedere l'influenza ambientale",
        "🚀 Hai mai immaginato di studiare un'ipergigante da vicino?",
        "🔭 Studiamo come influenzano le orbite planetarie?",
        "💥 Sono precursori delle supernove più brillanti!",
        "✨ Vuoi saperne di più sulla loro formazione?"
    ],
    "stella massiva": [
        "🌌 Stelle massicce: le giganti cosmiche!",
        "✨ Creiamone una adesso?",
        "💫 Massa >8 volte quella solare!",
        "🔭 Simuliamo la fusione nucleare intensa?",
        "🌠 Curiosità: Diametri decine di volte maggiori del Sole!",
        "🚀 Possono diventare supernove alla fine della vita!",
        "📊 Suggerimento: Usa modalità 'Stella Massiva' per effetti planetari",
        "🌍 Atmosfere dense con possibili pianeti orbitanti!",
        "💥 Vuoi vedere la perdita di massa nei venti stellari?",
        "🌡️ Temperatura: 3000K-6000K!",
        "🔄 Creiamo un sistema con più stelle massicce?",
        "✨ Fondamentali per creare elementi pesanti!",
        "🌌 Alcune hanno anelli!",
        "💫 Sfida: Sistema con stella massiva e gigante gassoso!",
        "📈 Atmosfere ricche di idrogeno/elio!",
        "🌠 Attiva 'Effetti Radiazione'",
        "🚀 Viaggio spaziale per studiarle?",
        "🔭 Effetti sulle orbite planetarie?",
        "💥 Precursori di supernove brillanti!",
        "✨ Vuoi approfondire la loro evoluzione?"
    ],
    "ipermassiccia": [
        "🌌 Stelle ipermassive: estremamente luminose!",
        "✨ Creiamone una adesso?",
        "💫 Massa >100 soli!",
        "🔭 Simuliamo fusione nucleare estrema?",
        "🌠 Curiosità: Diametri migliaia di volte solari!",
        "🚀 Perdono massa con venti stellari intensi!",
        "📊 Suggerimento: Modalità 'Hipermassiva' per effetti planetari",
        "🌍 Atmosfere dense con pianeti orbitanti!",
        "💥 Vuoi vedere la trasformazione in supernova?",
        "🌡️ Temperatura: 3000K-6000K!",
        "🔄 Sistema con più ipermassive?",
        "✨ Creano elementi pesanti nell'universo!",
        "🌌 Alcune con anelli!",
        "💫 Sfida: Sistema con ipermassiva e gigante gassoso!",
        "📈 Atmosfere ricche di idrogeno/elio!",
        "🌠 Attiva 'Effetti Radiazione'",
        "🚀 Studiare da vicino?",
        "🔭 Influenza sulle orbite planetarie?",
        "💥 Precursori di supernove super brillanti!",
        "✨ Vuoi saperne di più?"
    ],
    "nana bianca": [
        "🌌 Nane bianche: resti di stelle esauste!",
        "✨ Creiamone una adesso?",
        "💫 Massa solare ma dimensioni ridotte!",
        "🔭 Simuliamo il raffreddamento nel tempo?",
        "🌠 Curiosità: Un cucchiaino pesa miliardi di tonnellate!",
        "🚀 Atmosfere sottili di elio/idrogeno!",
        "📊 Suggerimento: Usa modalità 'Nana Bianca' per interazioni",
        "🌍 Destino finale di stelle come il Sole!",
        "💥 Vuoi vedere l'accumulo di materia da compagne?",
        "🌡️ Temperatura: 5000K-100000K!",
        "🔄 Sistema con più nane bianche?",
        "✨ Essenziali per capire l'evoluzione stellare!",
        "🌌 Alcune esplodono come supernove di tipo Ia!",
        "💫 Sfida: Sistema con nana bianca e pianeta roccioso!",
        "📈 Atmosfere ricche di carbonio/ossigeno!",
        "🌠 Attiva 'Effetti Raffreddamento'",
        "🚀 Studiare da vicino?",
        "🔭 Effetti sulle orbite planetarie?",
        "💥 Resti finali di stelle non esplose!",
        "✨ Vuoi approfondire la formazione?"
    ],
    "nana bianca di elio": [
        "🌌 Nane bianche di elio: resti di stelle che hanno bruciato elio!",
        "✨ Creiamone una?",
        "💫 Massa solare ma più piccole e dense!",
        "🔭 Simuliamo il raffreddamento?",
        "🌠 Curiosità: Un cucchiaino = miliardi di tonnellate!",
        "🚀 Atmosfere sottili di elio!",
        "📊 Suggerimento: Modalità 'Nana Bianca di Elio'",
        "🌍 Destino di stelle che bruciano elio nei nuclei!",
        "💥 Accumulo di materia da stelle compagne?",
        "🌡️ Temperatura: 5000K-100000K!",
        "🔄 Sistema con più nane bianche di elio?",
        "✨ Importanti per l'evoluzione stellare!",
        "🌌 Possono esplodere come supernove di tipo Ia!",
        "💫 Sfida: Sistema con pianeta roccioso!",
        "📈 Atmosfere ricche di elio/carbonio!",
        "🌠 Attiva 'Effetti Raffreddamento'",
        "🚀 Studio ravvicinato?",
        "🔭 Influenza sulle orbite?",
        "💥 Resti finali di stelle a elio!",
        "✨ Vuoi saperne di più?"
    ],
    "nana bianca di carbonio": [
        "🌌 Nane bianche di carbonio: resti di stelle a carbonio!",
        "✨ Creiamone una?",
        "💫 Massa solare ma più piccole/dense!",
        "🔭 Simuliamo il raffreddamento?",
        "🌠 Curiosità: Densità estrema - cucchiaino = miliardi di tonnellate!",
        "🚀 Atmosfere sottili di carbonio!",
        "📊 Suggerimento: Modalità 'Nana Bianca di Carbonio'",
        "🌍 Destino di stelle che bruciano carbonio nei nuclei!",
        "💥 Accumulo di materia da compagne?",
        "🌡️ Temperatura: 5000K-100000K!",
        "🔄 Sistema con più nane?",
        "✨ Chiave per l'evoluzione stellare!",
        "🌌 Alcune esplodono come supernove di tipo Ia!",
        "💫 Sfida: Sistema con pianeta roccioso!",
        "📈 Atmosfere ricche di carbonio/ossigeno!",
        "🌠 Attiva 'Effetti Raffreddamento'",
        "🚀 Studio ravvicinato?",
        "🔭 Effetti sulle orbite?",
        "💥 Resti finali di stelle a carbonio!",
        "✨ Vuoi approfondire?"
    ],
    "nana nera": [
        "🌌 Nane nere: destino finale delle nane bianche dopo eoni!",
        "✨ Creiamone una?",
        "💫 Nane bianche completamente raffreddate - nessuna luce visibile!",
        "🔭 Simuliamo il raffreddamento completo?",
        "🌠 Curiosità: Così fredde da essere inosservabili!",
        "🚀 Teoriche - mai osservate nell'universo!",
        "📊 Suggerimento: Modalità 'Nana Nera' per interazioni a lungo termine",
        "🌍 Resti finali di stelle esauste!",
        "💥 Vuoi vedere la trasformazione da nana bianca?",
        "🌡️ Temperatura vicina allo zero assoluto!",
        "🔄 Sistema con più nane nere?",
        "✨ Essenziali per capire l'evoluzione stellare a lungo termine!",
        "🌌 Ci vogliono trilioni di anni per formarsi!",
        "💫 Sfida: Sistema con pianeti rocciosi orbitanti!",
        "📈 Atmosfere inesistenti o ultra-sottili!",
        "🌠 Attiva 'Effetti Raffreddamento'",
        "🚀 Studio teorico da vicino?",
        "🔭 Effetti sulle orbite?",
        "💥 Risultato finale dopo miliardi di anni!",
        "✨ Vuoi saperne di più?"
    ],
    "quasar": [
        "🌌 Quasar: nuclei brillanti di galassie lontane!",
        "✨ Creiamone uno?",
        "💫 Alimentati da dischi di accrescimento supermassicci!",
        "🔭 Simuliamo l'emissione intensa di radiazione?",
        "🌠 Curiosità: Fino a miliardi di volte più luminosi del Sole!",
        "🚀 Tra gli oggetti più luminosi conosciuti!",
        "📊 Suggerimento: Modalità 'Quasar' per effetti galattici",
        "🌍 Si trovano in galassie attive distanti!",
        "💥 Emissione di getti relativistici?",
        "🌡️ Temperatura > miliardi di Kelvin!",
        "🔄 Sistema con quasar e galassie orbitanti?",
        "✨ Chiavi per capire l'evoluzione galattica!",
        "🌌 Utili per studiare l'espansione cosmica!",
        "💫 Sfida: Crea un quasar con getti relativistici!",
        "📈 Nuclei supermassicci (milioni-miliardi di masse solari)!",
        "🌠 Attiva 'Effetti Radiazione'",
        "🚀 Viaggio per studiarli?",
        "🔭 Influenza sulla formazione galattica?",
        "💥 Più comuni nell'universo giovane!",
        "✨ Vuoi approfondire?"
    ],
    "wormhole": [
        "🌌 Wormhole: tunnel teorici nello spazio-tempo!",
        "✨ Creiamone uno?",
        "💫 Collegamenti tra punti distanti dell'universo!",
        "🔭 Simuliamo la curvatura spazio-temporale?",
        "🌠 Curiosità: Soluzioni delle equazioni di relatività generale!",
        "🚀 Potrebbero permettere viaggi superluminali!",
        "📊 Suggerimento: Modalità 'Wormhole' per effetti spaziali",
        "🌍 Ipotetici - mai osservati!",
        "💥 Distorsione della luce circostante?",
        "🌡️ Temperatura teorica - dipende dalla struttura!",
        "🔄 Sistema con wormhole che connette regioni spaziali?",
        "✨ Fondamentali per relatività e struttura cosmica!",
        "🌌 Potrebbero permettere viaggi nel tempo!",
        "💫 Sfida: Crea un wormhole stabile!",
        "📈 Teorici - nessuna rappresentazione fisica!",
        "🌠 Attiva 'Effetti Curvatura'",
        "🚀 Viaggiare in un'altra galassia?",
        "🔭 Effetti sulla struttura spazio-temporale?",
        "💥 Popolari nella fantascienza come portali!",
        "✨ Vuoi saperne di più?"
    ],
    "stella di neutroni": [
        "🌌 Stelle di neutroni: resti densi di supernove!",
        "✨ Creiamone una?",
        "💫 Quasi solo neutroni - densità estrema!",
        "🔭 Simuliamo la gravità intensa?",
        "🌠 Curiosità: Cucchiaio = miliardi di tonnellate!",
        "🚀 Possono ruotare velocemente emettendo radiazioni!",
        "📊 Suggerimento: Modalità 'Stella di Neutroni' per effetti spaziali",
        "🌍 Formate da stelle massicce collassate!",
        "💥 Emissione di potenti raggi gamma?",
        "🌡️ Temperatura > milioni di Kelvin!",
        "🔄 Sistema con pianeti orbitanti?",
        "✨ Essenziali per fisica nucleare ed evoluzione stellare!",
        "🌌 Possono diventare pulsar o magnetar!",
        "💫 Sfida: Crea una con campo magnetico intenso!",
        "📈 Massa: 1.4-2.16 masse solari!",
        "🌠 Attiva 'Effetti Magnetici'",
        "🚀 Studio ravvicinato?",
        "🔭 Influenza sulla formazione galattica?",
        "💥 Gli oggetti più densi conosciuti!",
        "✨ Vuoi approfondire?"
    ],
    "magnetar": [
        "🌌 Magnetar: stelle di neutroni con campi magnetici estremi!",
        "✨ Creiamone una?",
        "💫 Campi magnetici trilioni di volte più forti della Terra!",
        "🔭 Simuliamo l'emissione radiativa?",
        "🌠 Curiosità: Emettono lampi gamma (SGR)!",
        "🚀 Influenzano lo spazio con onde magnetiche!",
        "📊 Suggerimento: Modalità 'Magnetar' per effetti ambientali",
        "🌍 Formate da collassi con campi magnetici intensi!",
        "💥 Emissione di getti relativistici?",
        "🌡️ Temperatura > milioni di Kelvin!",
        "🔄 Sistema con pianeti orbitanti?",
        "✨ Fondamentali per fisica magnetica ed evoluzione stellare!",
        "🌌 Possono avere pulsar associate!",
        "💫 Sfida: Crea un magnetar con campo ultra-intenso!",
        "📈 Massa: 1.4-2.16 masse solari!",
        "🌠 Attiva 'Effetti Magnetici'",
        "🚀 Studiare da vicino?",
        "🔭 Influenza sulla formazione galattica?",
        "💥 Gli oggetti più magnetici conosciuti!",
        "✨ Vuoi saperne di più?"
    ],
    "stella di quark": [
        "🌌 Stelle di quark: teorici resti di stelle di neutroni!",
        "✨ Creiamone una?",
        "💫 Composte da quark e gluoni - materia esotica!",
        "🔭 Simuliamo la densità estrema?",
        "🌠 Curiosità: Più dense delle stelle di neutroni!",
        "🚀 Ipotetiche - mai osservate!",
        "📊 Suggerimento: Modalità 'Stella di Quark' per effetti spaziali",
        "🌍 Formate da ulteriore collasso di stelle di neutroni!",
        "💥 Emissione di radiazione intensa?",
        "🌡️ Temperatura teorica - dipende dalla struttura!",
        "🔄 Sistema con pianeti orbitanti?",
        "✨ Essenziali per fisica delle particelle in condizioni estreme!",
        "🌌 Proprietà uniche per la loro composizione!",
        "💫 Sfida: Esplora proprietà esotiche!",
        "📈 Teoriche - nessuna rappresentazione fisica!",
        "🌠 Attiva 'Effetti Esotici'",
        "🚀 Viaggiare nel nucleo?",
        "🔭 Effetti sullo spazio-tempo?",
        "💥 Uno dei grandi misteri astrofisici!",
        "✨ Vuoi approfondire?"
    ]
};
const contextFollowUps = {
    "default": [
        "✨ Cosa ne pensi di questa spiegazione cosmica?",
        "🚀 Posso aiutarti con qualcos'altro?",
        "🌌 Interessante, vero? L'universo è affascinante!",
        "💫 Vuoi esplorare di più questo tema?",
        "🔭 Sono felice di condividere conoscenze cosmiche!",
        "🪐 Hai altre domande sull'argomento?",
        "🌟 Abbiamo imparato qualcosa di incredibile oggi, non trovi?",
        "⚡ L'universo non smette mai di stupirci!",
        "🌠 Vuoi che approfondisca qualche aspetto?",
        "🌀 Creiamo qualcosa insieme adesso?",
        "📡 La tua curiosità è il carburante della scoperta!",
        "🌍 Cosa ti affascina di più del cosmo?",
        "☄️ Pronto per la tua prossima domanda stellare?",
        "🛸 Ricorda: Ogni domanda è un viaggio cosmico!",
        "💥 Vuoi provare un esperimento pratico?",
        "⏳ La conoscenza è il vero viaggio nel tempo!",
        "📊 Posso mostrarti come applicarlo nel gioco?",
        "🌡️ Le tue domande riscaldano il mio nucleo di IA!",
        "🔢 Calcoliamo qualcosa insieme?",
        "🌈 L'universo ringrazia la tua curiosità!"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
    affirmativeResponses: ["sì", "s", "sì", "y", "certo", "certamente", "ok", "va bene", "d'accordo", "per favore"],
    negativeResponses: ["no", "no", "n", "no", "negativo", "no", "forse più tardi", "non ora"],
    
    positiveResponses: {
        "buco nero": [
            "🌌 Simuliamo! Per prima cosa, crea una stella con massa 1e30 vicino a un buco nero...",
            "💥 Ottimo! Trascina una stella nel disco di accrescimento e attiva la slow motion per lo spettacolo",
            "⚠️ Attenzione: Attiva 'Effetti Relativistici' in Opzioni > Fisica per vedere la deformazione spazio-temporale",
            "🔥 Suggerimento: Usa stelle con massa >20 solari per vedere espulsioni di materia più drammatiche",
            "🕳️ Passo dopo passo: 1) Crea buco nero 2) Aggiungi stella vicina 3) Aumenta la gravità al 200%",
            "⏱️ Accelera il tempo di 10000x per vedere l'intero processo in pochi secondi",
            "📡 Non dimenticare di attivare 'Zone Termiche' per vedere il plasma surriscaldato (>1 milione °C)",
            "🌀 Curiosità: Il processo può durare da ore a milioni di anni nel tempo reale dell'universo",
            "💫 Per risultati visivi incredibili, usa buchi neri supermassicci (>1e15 masse)",
            "🌠 Prova diversi angoli di avvicinamento per vedere diversi modelli di disco"
        ],
        "cometa": [
            "☄️ Andiamo! Seleziona 'Crea Corpi Celesti' > 'Cometa' e regola la temperatura a -70°C...",
            "💧 Suggerimento: Comete con alto contenuto d'acqua (>60%) creano code più luminose",
            "🚀 Trascina il mouse per dare velocità angolare - questo influisce sulla rotazione del nucleo",
            "❄️ Per vedere la sublimazione, avvicina la cometa a una stella di classe O o B",
            "🌌 Prova diverse eccentricità: >0.9 per orbite allungate",
            "⏱️ Usa la modalità 100000x per vedere più orbite rapidamente",
            "🔭 Attiva 'Mostra Vettori' per visualizzare le forze gravitazionali agenti",
            "🌠 Curiosità: Ogni passaggio stellare riduce la massa della cometa dello 0.01%",
            "🪐 Prova a catturare una cometa con Giove virtuale - massa > 1e27 unità",
            "📈 Suggerimento avanzato: Comete in risonanza 2:1 con pianeti hanno orbite stabili"
        ],
        "gravità": [
            "⚖️ Sperimentiamo! Accedi a Menu > Fisica > Costante Gravitazionale...",
            "🌌 Prova il 10% per simulare nebulose o il 300% per sistemi stellari densi",
            "💥 Attenzione: Valori >500% possono causare instabilità in sistemi complessi",
            "🔄 Suggerimento: Sistemi binari con alta gravità evolvono più rapidamente",
            "🪐 Per vedere onde gravitazionali, crea due buchi neri vicini",
            "🌠 Attiva 'Visualizzazione Forze' (F3) per vedere i campi gravitazionali",
            "📉 Prova a ridurre la gravità durante la migrazione planetaria",
            "🌀 Effetto interessante: Alta gravità + rotazione veloce crea pianeti schiacciati",
            "🔭 Ricorda: I buchi neri hanno un moltiplicatore gravitazionale fisso 1000x",
            "💫 Sfida: Crea un sistema stabile con 20 corpi e gravità al 200%"
        ],
        "stella": [
            "⭐ Creiamo! Seleziona 'Corpi Stellari' e scegli il tipo...",
            "🌞 Per una stella come il Sole: massa ~1.989e30 kg (1 unità solare)",
            "💥 Suggerimento: Stelle sopra 20 masse solari esplodono come supernove",
            "🌈 Regola la temperatura a >30.000K per stelle blu intense",
            "🔄 Prova sistemi binari con trasferimento di massa",
            "🌌 Usa alta metallicità per stelle di popolazione I (giovani)",
            "⏱️ Accelera il tempo per vedere l'evoluzione stellare completa",
            "⚠️ Attenzione: Stelle >100 masse solari possono essere instabili",
            "🔭 Attiva 'Evoluzione Stellare' in Opzioni per vedere le trasformazioni",
            "🌠 Per stelle di neutroni, crea supernove con massa >1.4 solare"
        ],
        "pianeta": [
            "🪐 Andiamo! Menu 'Corpi Planetari' > Scegli tipo...",
            "🌍 Per pianeta abitabile: posiziona nella zona verde, acqua 50%, atmosfera 80%",
            "🌋 Prova composizioni estreme: pianeti di carbonio o ferro",
            "🌀 Regola il periodo di rotazione per vedere effetti su clima e forma",
            "💫 Suggerimento: Pianeti gassosi richiedono massa >105K unità",
            "🌌 Crea sistemi con migrazione planetaria attivata",
            "🌠 Per anelli planetari, regola spessore e densità nel menu caratteristiche",
            "⚠️ Lune troppo vicine si disintegrano alla distanza di Roche",
            "🔭 Usa la modalità 'Osservatorio' (O) per vedere dettagli superficiali",
            "🌡️ Prova temperature estreme per vedere cambiamenti automatici di classe"
        ],
        "meteoroide": [
            "🌠 Creiamo un meteoroide! Accedi a 'Crea Corpi Celesti' > 'Meteoroide'...",
            "💫 Suggerimento: Regola la densità per vedere diversi effetti d'impatto",
            "🪨 Usa la slow motion per osservare l'ingresso nell'atmosfera",
            "⚠️ Attenzione: Meteoroidi grandi (>100m) possono causare estinzioni di massa",
            "🌌 Prova diverse composizioni: metallico, roccioso, ghiacciato",
            "🔭 Attiva 'Traiettoria d'Impatto' per vedere possibili collisioni",
            "📈 Accelera il tempo per vedere piogge meteoriche in azione",
            "🌠 Curiosità: I meteoroidi sono frammenti di asteroidi o comete",
            "💥 Per simulare esplosioni, imposta velocità d'ingresso >20 km/s",
            "🌀 Sfida: Crea un sistema con 10 meteoroidi in collisione simultanea"
        ],
        "meteora": [
            "🌠 Creiamo una meteora! Accedi a 'Crea Corpi Celesti' > 'Meteora'...",
            "💫 Suggerimento: Regola la densità per vedere diversi effetti d'impatto",
            "🪨 Usa la slow motion per osservare l'ingresso nell'atmosfera",
            "⚠️ Attenzione: Meteoroidi grandi (>100m) possono causare estinzioni di massa",
            "🌌 Prova diverse composizioni: metallico, roccioso, ghiacciato",
            "🔭 Attiva 'Traiettoria d'Impatto' per vedere possibili collisioni",
            "📈 Accelera il tempo per vedere piogge meteoriche in azione",
            "🌠 Curiosità: I meteoroidi sono frammenti di asteroidi o comete",
            "💥 Per simulare esplosioni, imposta velocità d'ingresso >20 km/s",
            "🌀 Sfida: Crea un sistema con 10 meteoroidi in collisione simultanea"
        ],
        "gassoso": [
            "🌌 Creiamo un pianeta gassoso! Accedi a 'Crea Corpi Celesti' > 'Pianeta Gassoso'...",
            "💫 Suggerimento: Regola la massa per vedere diversi effetti atmosferici",
            "🌀 Usa la slow motion per osservare tempeste giganti",
            "⚠️ Attenzione: Pianeti gassosi troppo massicci (>10x Giove) possono diventare nane brune",
            "🌠 Prova diverse composizioni atmosferiche: idrogeno, elio, metano",
            "🔭 Attiva 'Anelli Planetari' per aggiungere anelli al tuo gigante gassoso",
            "📈 Accelera il tempo per vedere l'evoluzione atmosferica in azione",
            "🌌 Curiosità: Giove ha una tempesta più grande della Terra da secoli!",
            "💥 Per simulare aurore, regola il campo magnetico del pianeta",
            "🪐 Sfida: Crea un sistema con 5 pianeti gassosi orbitanti una stella"
        ],
        "asteroide": [
            "🪨 Creiamo un asteroide! Accedi a 'Crea Corpi Celesti' > 'Asteroide'...",
            "🌌 Suggerimento: Regola la densità per vedere diverse composizioni rocciose",
            "💫 Usa la slow motion per osservare collisioni con pianeti",
            "⚠️ Attenzione: Asteroidi grandi (>1 km) possono causare estinzioni di massa",
            "🌠 Prova diverse orbite: ellittiche, circolari, inclinate",
            "🔭 Attiva 'Traiettoria d'Impatto' per vedere possibili collisioni",
            "📈 Accelera il tempo per vedere la migrazione degli asteroidi in azione",
            "🌀 Curiosità: La fascia degli asteroidi tra Marte e Giove contiene milioni di corpi!",
            "💥 Per simulare esplosioni, imposta velocità d'impatto >20 km/s",
            "🌌 Sfida: Crea un sistema con 10 asteroidi in collisione simultanea"
        ],
        "planetino": [
            "🪐 Creiamo un planetino! Accedi a 'Crea Corpi Celesti' > 'Planetino'...",
            "🌌 Suggerimento: Regola la massa per vedere diverse caratteristiche geologiche",
            "💫 Usa la slow motion per osservare rotazione e tettonica",
            "⚠️ Attenzione: Planetini troppo massicci possono diventare pianeti nani",
            "🌠 Prova diverse composizioni: ghiaccio, roccia, metallo",
            "🔭 Attiva 'Anelli Planetari' per aggiungere anelli al tuo planetino",
            "📈 Accelera il tempo per vedere l'evoluzione geologica in azione",
            "🌀 Curiosità: Plutone è considerato un planetino da molti astronomi!",
            "💥 Per simulare impatti, imposta velocità di collisione >10 km/s",
            "🌌 Sfida: Crea un sistema con 5 planetini orbitanti una stella"
        ],
        "buco di verme": [
            "🌀 Creiamo un wormhole! Accedi a 'Crea Corpi Celesti' > 'Buco di Verme'...",
            "🌌 Suggerimento: Regola la massa negativa per vedere diversi effetti di distorsione",
            "💫 Usa la slow motion per osservare la curvatura dello spazio-tempo",
            "⚠️ Attenzione: I wormhole sono teorici e instabili nella realtà",
            "🌠 Prova diversi punti di ingresso/uscita nello spazio-tempo",
            "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
            "📈 Accelera il tempo per vedere l'evoluzione del wormhole in azione",
            "🌀 Curiosità: I wormhole possono connettere punti distanti dell'universo!",
            "💥 Per simulare viaggi istantanei, regola la distanza tra i punti",
            "🌌 Sfida: Crea un sistema con 3 wormhole che connettono galassie"
        ],
        "zona abitabile": [
            "🌍 Creiamo una zona abitabile! Accedi a 'Crea Corpi Celesti' > 'Zona Abitabile'...",
            "💫 Suggerimento: Regola la distanza dalla stella per vedere diverse zone abitabili",
            "🌌 Usa la slow motion per osservare la formazione di atmosfere",
            "⚠️ Attenzione: Zone troppo vicine possono subire radiazioni intense",
            "🌠 Prova diverse composizioni atmosferiche: ossigeno, azoto, vapore acqueo",
            "🔭 Attiva 'Effetti Climatici' per vedere tempeste e modelli atmosferici",
            "📈 Accelera il tempo per vedere l'evoluzione della zona abitabile in azione",
            "🌀 Curiosità: La Terra è nella zona abitabile del Sole da miliardi di anni!",
            "💥 Per simulare la vita, imposta temperatura media tra 0°C e 100°C",
            "🌌 Sfida: Crea un sistema con 5 zone abitabili orbitanti una stella"
        ],
        "quasar": [
            "🌌 Creiamo un quasar! Accedi a 'Crea Corpi Celesti' > 'Quasar'...",
            "💫 Suggerimento: Regola la massa del quasar per controllare la sua galassia",
            "🌠 Usa la slow motion per osservare l'emissione di radiazione intensa",
            "⚠️ Attenzione: I quasar sono estremamente luminosi e possono oscurare intere galassie",
            "🌟 Prova diverse composizioni di materia nel disco di accrescimento",
            "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
            "📈 Accelera il tempo per vedere l'evoluzione del quasar in azione",
            "🌀 Curiosità: I quasar sono gli oggetti più luminosi dell'universo!",
            "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
            "🌌 Sfida: Crea un sistema con 3 quasar che connettono galassie distanti"
        ],
        "nana bruna": [
            "🌌 Creiamo una nana bruna! Accedi a 'Crea Corpi Celesti' > 'Nana Bruna'...",
            "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
            "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
            "⚠️ Attenzione: Le nane brune sono oggetti intermedi tra stelle e pianeti",
            "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
            "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
            "📈 Accelera il tempo per vedere l'evoluzione della nana bruna in azione",
            "🌀 Curiosità: Le nane brune non hanno fusione nucleare sostenuta come le stelle!",
            "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
            "🌌 Sfida: Crea un sistema con 3 nane brune orbitanti una stella"
        ],
        "nana rossa": [
            "🌌 Creiamo una nana rossa! Accedi a 'Crea Corpi Celesti' > 'Nana Rossa'...",
            "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
            "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
            "⚠️ Attenzione: Le nane rosse sono le stelle più comuni dell'universo",
            "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
            "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
            "📈 Accelera il tempo per vedere l'evoluzione della nana rossa in azione",
            "🌀 Curiosità: Le nane rosse possono vivere trilioni di anni!",
            "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
            "🌌 Sfida: Crea un sistema con 5 nane rosse orbitanti una stella"
        ],
        "gigante stellare": [
            "🌌 Creiamo una stella gigante! Accedi a 'Crea Corpi Celesti' > 'Stella Gigante'...",
            "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
            "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
            "⚠️ Attenzione: Le stelle giganti sono molto più grandi del Sole e possono diventare supernove",
            "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
            "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
            "📈 Accelera il tempo per vedere l'evoluzione della stella gigante in azione",
            "🌀 Curiosità: Le stelle giganti possono avere fino a 1000 volte il diametro del Sole!",
            "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
            "🌌 Sfida: Crea un sistema con 3 stelle giganti orbitanti una stella"
        ],
        
        "ipergigante": [
        "🌌 Creiamo una ipergigante! Accedi a 'Crea Corpi Celesti' > 'Ipergigante'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
        "⚠️ Attenzione: Le ipergiganti sono le stelle più massicce conosciute e possono diventare supernove",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione dell'ipergigante in azione",
        "🌀 Curiosità: Le ipergiganti possono avere fino a 1000 volte il diametro del Sole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 ipergiganti orbitanti una stella"
    ],
    "stella massiccia": [
        "🌌 Creiamo una stella massiccia! Accedi a 'Crea Corpi Celesti' > 'Stella Massiccia'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
        "⚠️ Attenzione: Le stelle massicce sono molto più grandi del Sole e possono diventare supernove",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della stella massiccia in azione",
        "🌀 Curiosità: Le stelle massicce possono avere fino a 100 volte il diametro del Sole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 stelle massicce orbitanti una stella"
    ],
    "stella ipermassiccia": [
        "🌌 Creiamo una stella ipermassiccia! Accedi a 'Crea Corpi Celesti' > 'Stella Ipermassiccia'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
        "⚠️ Attenzione: Le stelle ipermassicce sono le stelle più massicce conosciute e possono diventare supernove",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della stella ipermassiccia in azione",
        "🌀 Curiosità: Le stelle ipermassicce possono avere fino a 1000 volte il diametro del Sole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 stelle ipermassicce orbitanti una stella"
    ],
    "nana bianca": [
        "🌌 Creiamo una nana bianca! Accedi a 'Crea Corpi Celesti' > 'Nana Bianca'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
        "⚠️ Attenzione: Le nane bianche sono i resti di stelle che hanno esaurito il loro combustibile",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della nana bianca in azione",
        "🌀 Curiosità: Le nane bianche sono estremamente dense e piccole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 nane bianche orbitanti una stella"
    ],
    "nana bianca di elio": [
        "🌌 Creiamo una nana bianca di elio! Accedi a 'Crea Corpi Celesti' > 'Nana Bianca di Elio'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione elio-carbonio-ossigeno",
        "⚠️ Attenzione: Le nane bianche di elio sono i resti di stelle che hanno esaurito il loro combustibile",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della nana bianca di elio in azione",
        "🌀 Curiosità: Le nane bianche di elio sono estremamente dense e piccole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 nane bianche di elio orbitanti una stella"
    ],
    "nana bianca di carbonio": [
        "🌌 Creiamo una nana bianca di carbonio! Accedi a 'Crea Corpi Celesti' > 'Nana Bianca di Carbonio'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione carbonio-ossigeno-azoto",
        "⚠️ Attenzione: Le nane bianche di carbonio sono i resti di stelle che hanno esaurito il loro combustibile",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della nana bianca di carbonio in azione",
        "🌀 Curiosità: Le nane bianche di carbonio sono estremamente dense e piccole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 nane bianche di carbonio orbitanti una stella"
    ],
    "nana nera": [
        "🌌 Creiamo una nana nera! Accedi a 'Crea Corpi Celesti' > 'Nana Nera'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione idrogeno-elio",
        "⚠️ Attenzione: Le nane nere sono i resti di stelle che hanno esaurito il loro combustibile",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della nana nera in azione",
        "🌀 Curiosità: Le nane nere sono estremamente dense e piccole!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 nane nere orbitanti una stella"
    ],
    "stella di neutroni": [
        "🌌 Creiamo una stella di neutroni! Accedi a 'Crea Corpi Celesti' > 'Stella di Neutroni'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione neutroni-protoni-elettroni",
        "⚠️ Attenzione: Le stelle di neutroni sono estremamente dense e piccole!",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della stella di neutroni in azione",
        "🌀 Curiosità: Le stelle di neutroni possono ruotare fino a 1000 volte al secondo!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 stelle di neutroni orbitanti una stella"
    ],
    "magnetar": [
        "🌌 Creiamo un magnetar! Accedi a 'Crea Corpi Celesti' > 'Magnetar'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione neutroni-protoni-elettroni",
        "⚠️ Attenzione: I magnetar sono estremamente densi e piccoli!",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione del magnetar in azione",
        "🌀 Curiosità: I magnetar possono avere campi magnetici trilioni di volte più forti di quello terrestre!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 magnetar orbitanti una stella"
    ],
    "stella di quark": [
        "🌌 Creiamo una stella di quark! Accedi a 'Crea Corpi Celesti' > 'Stella di Quark'...",
        "💫 Suggerimento: Regola la massa per vedere diverse caratteristiche atmosferiche",
        "🌠 Usa la slow motion per osservare la fusione quark-protoni-neutroni",
        "⚠️ Attenzione: Le stelle di quark sono estremamente dense e piccole!",
        "🌟 Prova diverse composizioni atmosferiche: metano, acqua, ammoniaca",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della stella di quark in azione",
        "🌀 Curiosità: Le stelle di quark possono avere densità ancora maggiori delle stelle di neutroni!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 stelle di quark orbitanti una stella"
    ],
    "polvere spaziale": [
        "🌌 Creiamo polvere spaziale! Accedi a 'Crea Corpi Celesti' > 'Polvere Spaziale'...",
        "💫 Suggerimento: Regola la densità per vedere diverse composizioni di polvere",
        "🌠 Usa la slow motion per osservare la formazione di nubi di polvere",
        "⚠️ Attenzione: La polvere spaziale può agglomerarsi e formare planetesimi",
        "🌟 Prova diverse composizioni: silicati, carbonio, ghiaccio",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della polvere spaziale in azione",
        "🌀 Curiosità: La polvere spaziale è fondamentale nella formazione di stelle e pianeti!",
        "💥 Per simulare collisioni, regola la velocità di impatto tra particelle",
        "🌌 Sfida: Crea un sistema con 5 nubi di polvere spaziale interagenti"
    ],
    "nebulosa": [
        "🌌 Creiamo una nebulosa! Accedi a 'Crea Corpi Celesti' > 'Nebulosa'...",
        "💫 Suggerimento: Regola la densità per vedere diverse composizioni di gas e polvere",
        "🌠 Usa la slow motion per osservare la formazione di stelle all'interno della nebulosa",
        "⚠️ Attenzione: Le nebulose possono essere luoghi di nascita di nuove stelle",
        "🌟 Prova diverse composizioni: idrogeno, elio, carbonio",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della nebulosa in azione",
        "🌀 Curiosità: Le nebulose sono fondamentali nel riciclo del materiale stellare!",
        "💥 Per simulare esplosioni, regola la velocità di espansione della nebulosa",
        "🌌 Sfida: Crea un sistema con 3 nebulose interagenti"
    ],
    "Singolarità": [
        "🌌 Creiamo una singolarità! Accedi a 'Crea Corpi Celesti' > 'Singolarità'...",
        "💫 Suggerimento: Regola la massa per vedere diversi effetti gravitazionali",
        "🌠 Usa la slow motion per osservare la distorsione dello spazio-tempo",
        "⚠️ Attenzione: Le singolarità sono punti di densità infinita e curvatura estrema",
        "🌟 Prova diverse composizioni: materia normale, materia esotica",
        "🔭 Attiva 'Effetti Relativistici' per vedere la distorsione della luce",
        "📈 Accelera il tempo per vedere l'evoluzione della singolarità in azione",
        "🌀 Curiosità: Le singolarità sono teoriche e non possono essere osservate direttamente!",
        "💥 Per simulare getti relativistici, regola la velocità di rotazione del disco",
        "🌌 Sfida: Crea un sistema con 3 singolarità interagenti"
    ],
    "default": [
        "🚀 Esploriamo insieme! Cosa vorresti creare esattamente?",
        "🌌 Posso guidarti passo passo in questa simulazione cosmica!",
        "💫 Ottimo! Inizia selezionando il menu appropriato per creare il tuo corpo celeste",
        "🔭 Andiamo nel dettaglio: quale parametro specifico vuoi regolare per primo?",
        "🪐 Primo passo: accedi al menu di creazione in basso a destra",
        "🌠 Suggerisco di iniziare con valori predefiniti e poi regolare gradualmente",
        "⚡ Per i migliori risultati, attiva 'Precisione Totale' in Opzioni > Fisica",
        "📊 Vuoi che ti mostri un esempio pratico adesso?",
        "🌀 Iniziamo creando i componenti base del tuo sistema",
        "✨ Digita 'aiuto' in qualsiasi momento per vedere le opzioni di creazione"
    ],
    },  

    negativeResponses: {
        "buco nero": [
            "🕳️ Nessun problema! I buchi neri possono aspettare...",
            "🌌 Va bene, questi mostri cosmici non scapperanno!",
            "💫 Quando vorrai vedere la materia spaghettificarsi, sono qui!",
            "⚠️ Attenzione anche! Meglio mantenere le distanze da questi divoratori cosmici",
            "🔭 Che ne dici di esplorare stelle di neutroni? Sono altrettanto affascinanti!",
            "🌠 Sapevi che il buco nero più piccolo conosciuto ha solo 3.8 masse solari?",
            "🌀 I buchi neri supermassicci al centro delle galassie possono avere miliardi di masse solari!",
            "💥 Anche senza simulare, ricorda: nulla sfugge dopo l'orizzonte degli eventi!",
            "⏳ Un giorno nel futuro, persino i buchi neri evaporeranno per la radiazione di Hawking",
            "✨ Quando sarai pronto, digita 'buco nero' per ricominciare"
        ],
        "cometa": [
            "☄️ Nessun problema! Le comete possono aspettare nella loro nube di Oort...",
            "❄️ Va bene, questi viaggiatori ghiacciati non si scioglieranno così presto!",
            "🌠 Quando vorrai creare una pioggia meteorica, sono a disposizione",
            "💫 Sapevi che alcune comete hanno orbite di milioni di anni?",
            "🚀 La cometa Hale-Bopp rimase visibile a occhio nudo per ben 18 mesi!",
            "🌌 Comete interstellari come Borisov provengono da altri sistemi stellari!",
            "⏱️ La sonda Rosetta orbitò la cometa Churyumov-Gerasimenko per 2 anni!",
            "🔭 Il nucleo della cometa Halley è lungo 15km ed è molto scuro!",
            "💧 Le comete contengono acqua pesante con proporzioni diverse dagli oceani terrestri",
            "✨ Digita 'cometa' quando vorrai esplorare questi messaggeri cosmici"
        ],
        "gravità": [
            "⚖️ Nessun problema! La gravità può aspettare...",
            "🌌 Va bene, Einstein non sarebbe deluso!",
            "💫 Quando vorrai piegare lo spazio-tempo, sono qui!",
            "🌀 Sapevi che la gravità è 10^36 volte più debole della forza elettromagnetica?",
            "🌠 Nelle stelle di neutroni, la gravità è 200 miliardi di volte maggiore che sulla Terra!",
            "🪐 Giove ha una gravità 2.5x maggiore della Terra - sufficiente a deviare le comete!",
            "⏱️ La gravità viaggia alla velocità della luce - se il Sole sparisse, lo sentiremmo dopo 8 minuti!",
            "💥 Solo nei buchi neri la gravità vince tutte le altre forze",
            "🔭 Le onde gravitazionali del 2015 confermarono la previsione di Einstein del 1916!",
            "✨ Digita 'gravità' quando vorrai esplorare questa forza cosmica fondamentale"
        ],
        "stella": [
            "⭐ Nessun problema! Le stelle possono aspettare nel firmamento...",
            "🌞 Va bene, questi fari cosmici brilleranno per miliardi di anni!",
            "💫 Quando vorrai creare una supernova, sarò qui!",
            "🌌 La stella più vicina, Proxima Centauri, dista 4.24 anni luce!",
            "🔥 Il nucleo solare raggiunge 15 milioni °C - sufficienti per la fusione nucleare!",
            "🌠 Betelgeuse, una supergigante rossa, è 1000 volte più grande del Sole!",
            "⏳ Le nane rosse possono vivere per trilioni di anni - più dell'età attuale dell'universo!",
            "💥 Quando una stella diventa supernova, può brillare più di un'intera galassia!",
            "🌀 Le stelle di neutroni ruotano fino a 716 volte al secondo - i fari più precisi del cosmo!",
            "✨ Digita 'stella' quando vorrai accendere questi motori cosmici"
        ],
        "pianeta": [
            "🪐 Nessun problema! I pianeti continueranno la loro orbita...",
            "🌍 Va bene, questi mondi alieni non scapperanno!",
            "💫 Quando vorrai creare un mondo oceanico, sarò qui!",
            "🌌 L'esopianeta più vicino, Proxima Centauri b, dista solo 4 anni luce!",
            "🌡️ Venere è più caldo di Mercurio per l'effetto serra fuori controllo!",
            "❄️ Plutone ha montagne di ghiaccio d'acqua alte 3km!",
            "🛰️ Giove ha 79 lune conosciute - un sistema planetario in miniatura!",
            "💥 La Terra è l'unico pianeta con placche tettoniche attive!",
            "🌀 L'esopianeta WASP-76b ha piogge di ferro fuso sul lato notturno!",
            "✨ Digita 'pianeta' quando vorrai modellare nuovi mondi"
        ],
        "meteoroide": [
            "🌠 Nessun problema! I meteoroidi continueranno il loro viaggio spaziale...",
            "🪨 Va bene, questi viaggiatori cosmici non spariranno!",
            "💫 Quando vorrai vedere un meteoroide in azione, sarò qui!",
            "☄️ Il meteoroide di Chelyabinsk esplose con 30 volte l'energia della bomba di Hiroshima!",
            "🌌 La maggior parte delle meteore è più piccola di un granello di sabbia - ma comunque impressionante!",
            "🔥 Meteoroidi sopra i 25 metri possono causare danni significativi se colpiscono la Terra!",
            "🔭 Le Perseidi sono una delle piogge meteoriche più visibili - sempre emozionante!",
            "💥 Il meteoroide di Tunguska causò un'esplosione equivalente a 15 megatoni di TNT nel 1908!",
            "🌠 Digita 'meteoroide' quando vorrai vedere questi viaggiatori cosmici in azione!"
        ],
        "asteroide": [
            "🪨 Nessun problema! Gli asteroidi continueranno la loro orbita...",
            "🌌 Va bene, questi blocchi rocciosi non spariranno!",
            "💫 Quando vorrai vedere un asteroide in azione, sarò qui!",
            "☄️ L'asteroide 16 Psyche è composto principalmente di ferro e nichel - come un nucleo planetario!",
            "🌠 L'asteroide Vesta è così grande da essere visibile a occhio nudo!",
            "🛰️ L'asteroide Bennu ha forma di pesciolino - ed è un obiettivo esplorativo!",
            "💥 L'asteroide Apophis passerà vicino alla Terra nel 2029 - nessun rischio di collisione!",
            "🌌 La fascia degli asteroidi tra Marte e Giove contiene milioni di corpi rocciosi!",
            "🌠 Digita 'asteroide' quando vorrai esplorare questi mattoni del sistema solare!"
        ],
        "planetino": [
            "🪐 Nessun problema! I planetini continueranno la loro orbita...",
            "🌌 Va bene, questi mondi minori non spariranno!",
            "💫 Quando vorrai vedere un planetino in azione, sarò qui!",
            "🌠 Il planetoide Ceres è il più grande della fascia asteroidale e ha acqua ghiacciata!",
            "🛰️ Plutone è considerato un planetoide da molti astronomi - ed è affascinante!",
            "💥 Il planetoide Eris è più grande di Plutone e ha una sottile atmosfera di azoto!",
            "🌌 I planetini sono relitti della formazione del sistema solare - veri fossili cosmici!",
            "🌠 Digita 'planetino' quando vorrai esplorare questi mondi minori!"
        ],
        "buco di verme": [
            "🌀 Nessun problema! I wormhole possono aspettare...",
            "🌌 Va bene, questi tunnel cosmici non spariranno!",
            "💫 Quando vorrai vedere un wormhole in azione, sarò qui!",
            "⚠️ Attenzione: I wormhole sono teorici e instabili nella realtà",
            "🌠 Sapevi che i wormhole potrebbero connettere punti distanti dell'universo?",
            "🔭 La teoria suggerisce che i wormhole permetterebbero viaggi istantanei!",
            "💥 Anche senza simulare, ricorda: nulla sfugge dopo l'orizzonte degli eventi!",
            "🌀 Digita 'buco di verme' quando vorrai esplorare questi tunnel cosmici"
        ],
        "zona abitabile": [
            "🌍 Nessun problema! Le zone abitabili possono aspettare...",
            "🌌 Va bene, questi luoghi di vita non spariranno!",
            "💫 Quando vorrai vedere una zona abitabile in azione, sarò qui!",
            "🌠 La Terra è nella zona abitabile del Sole da miliardi di anni!",
            "🌡️ La zona abitabile varia a seconda della stella - affascinante!",
            "🛰️ Gli esopianeti in zona abitabile sono obiettivi per cercare vita extraterrestre!",
            "💥 Anche senza simulare, ricorda: la vita può esistere in ambienti estremi!",
            "🌌 Digita 'zona abitabile' quando vorrai esplorare queste culle di vita"
        ],
        "quasar": [
            "🌌 Nessun problema! I quasar possono aspettare...",
            "💫 Va bene, questi fari cosmici non spariranno!",
            "🚀 Quando vorrai vedere un quasar in azione, sarò qui!",
            "🌠 I quasar sono gli oggetti più luminosi dell'universo - veri fari cosmici!",
            "🌀 Sapevi che i quasar emettono getti relativistici a velocità prossime alla luce?",
            "🔭 La luce di alcuni quasar ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: i quasar sono fondamentali nell'evoluzione galattica!",
            "✨ Digita 'quasar' quando vorrai esplorare questi fari cosmici"
        ],
        "nana bruna": [
            "🌌 Nessun problema! Le nane brune possono aspettare...",
            "💫 Va bene, questi oggetti intermedi non spariranno!",
            "🚀 Quando vorrai vedere una nana bruna in azione, sarò qui!",
            "🌠 Le nane brune sono stelle fallite - senza fusione nucleare sostenuta!",
            "🌀 Sapevi che le nane brune possono avere atmosfere ricche di metano e acqua?",
            "🔭 La luce di alcune nane brune ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nane brune sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'nana bruna' quando vorrai esplorare questi oggetti intermedi"
        ],
        "nana rossa": [
            "🌌 Nessun problema! Le nane rosse possono aspettare...",
            "💫 Va bene, queste piccole stelle non spariranno!",
            "🚀 Quando vorrai vedere una nana rossa in azione, sarò qui!",
            "🌠 Le nane rosse sono le stelle più comuni nell'universo - giganti silenziosi!",
            "🌀 Sapevi che le nane rosse possono vivere per trilioni di anni?",
            "🔭 La luce di alcune nane rosse ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nane rosse sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'nana rossa' quando vorrai esplorare queste piccole stelle"
        ],
        "gigante stellare": [
            "🌌 Nessun problema! Le stelle giganti possono aspettare...",
            "💫 Va bene, questi colossi cosmici non spariranno!",
            "🚀 Quando vorrai vedere una stella gigante in azione, sarò qui!",
            "🌠 Le stelle giganti sono molto più grandi del Sole e possono diventare supernove!",
            "🌀 Sapevi che alcune stelle giganti hanno diametri fino a 1000 volte quello solare?",
            "🔭 La luce di alcune stelle giganti ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le stelle giganti sono fondamentali nell'evoluzione galattica!",
            "✨ Digita 'gigante stellare' quando vorrai esplorare questi colossi"
        ],
        "ipergigante": [
            "🌌 Nessun problema! Le ipergiganti possono aspettare...",
            "💫 Va bene, questi titani cosmici non spariranno!",
            "🚀 Quando vorrai vedere un'ipergigante in azione, sarò qui!",
            "🌠 Le ipergiganti sono le stelle più massicce conosciute e possono diventare supernove!",
            "🌀 Sapevi che alcune ipergiganti hanno diametri fino a 1000 volte quello solare?",
            "🔭 La luce di alcune ipergiganti ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le ipergiganti sono fondamentali nell'evoluzione galattica!",
            "✨ Digita 'ipergigante' quando vorrai esplorare questi titani"
        ],
        "stella massiccia": [
            "🌌 Nessun problema! Le stelle massicce possono aspettare...",
            "💫 Va bene, questi colossi cosmici non spariranno!",
            "🚀 Quando vorrai vedere una stella massiccia in azione, sarò qui!",
            "🌠 Le stelle massicce sono molto più grandi del Sole e possono diventare supernove!",
            "🌀 Sapevi che alcune stelle massicce hanno diametri fino a 100 volte quello solare?",
            "🔭 La luce di alcune stelle massicce ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le stelle massicce sono fondamentali nell'evoluzione galattica!",
            "✨ Digita 'stella massiccia' quando vorrai esplorare questi colossi"
        ],
        "stella ipermassiccia": [
            "🌌 Nessun problema! Le stelle ipermassicce possono aspettare...",
            "💫 Va bene, questi titani cosmici non spariranno!",
            "🚀 Quando vorrai vedere una stella ipermassiccia in azione, sarò qui!",
            "🌠 Le stelle ipermassicce sono le più massicce conosciute e possono diventare supernove!",
            "🌀 Sapevi che alcune stelle ipermassicce hanno diametri fino a 1000 volte quello solare?",
            "🔭 La luce di alcune stelle ipermassicce ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le stelle ipermassicce sono fondamentali nell'evoluzione galattica!",
            "✨ Digita 'stella ipermassiccia' quando vorrai esplorare questi titani"
        ],
        "nana bianca": [
            "🌌 Nessun problema! Le nane bianche possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere una nana bianca in azione, sarò qui!",
            "🌠 Le nane bianche sono i resti di stelle che hanno esaurito il combustibile nucleare!",
            "🌀 Sapevi che le nane bianche sono estremamente dense e piccole?",
            "🔭 La luce di alcune nane bianche ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nane bianche sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'nana bianca' quando vorrai esplorare questi resti"
        ],
        "nana bianca di elio": [
            "🌌 Nessun problema! Le nane bianche di elio possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere una nana bianca di elio in azione, sarò qui!",
            "🌠 Le nane bianche di elio sono i resti di stelle che hanno esaurito il combustibile nucleare!",
            "🌀 Sapevi che le nane bianche di elio sono estremamente dense e piccole?",
            "🔭 La luce di alcune nane bianche di elio ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nane bianche di elio sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'nana bianca di elio' quando vorrai esplorare questi resti"
        ],
        "nana bianca di carbonio": [
            "🌌 Nessun problema! Le nane bianche di carbonio possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere una nana bianca di carbonio in azione, sarò qui!",
            "🌠 Le nane bianche di carbonio sono i resti di stelle che hanno esaurito il combustibile nucleare!",
            "🌀 Sapevi che le nane bianche di carbonio sono estremamente dense e piccole?",
            "🔭 La luce di alcune nane bianche di carbonio ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nane bianche di carbonio sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'nana bianca di carbonio' quando vorrai esplorare questi resti"
        ],
        "nana nera": [
            "🌌 Nessun problema! Le nane nere possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere una nana nera in azione, sarò qui!",
            "🌠 Le nane nere sono i resti finali di stelle che hanno esaurito tutto il loro calore!",
            "🌀 Sapevi che le nane nere sono estremamente dense e piccole?",
            "🔭 La luce di alcune nane nere ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nane nere sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'nana nera' quando vorrai esplorare questi resti"
        ],
        "stella di neutroni": [
            "🌌 Nessun problema! Le stelle di neutroni possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere una stella di neutroni in azione, sarò qui!",
            "🌠 Le stelle di neutroni sono i resti di supernove e sono estremamente dense!",
            "🌀 Sapevi che un cucchiaino di materia di stella di neutroni pesa più dell'intera umanità?",
            "🔭 La luce di alcune stelle di neutroni ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le stelle di neutroni sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'stella di neutroni' quando vorrai esplorare questi resti"
        ],
        "magnetar": [
            "🌌 Nessun problema! I magnetar possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere un magnetar in azione, sarò qui!",
            "🌠 I magnetar sono stelle di neutroni con campi magnetici estremamente forti!",
            "🌀 Sapevi che un magnetar può emettere potenti raggi gamma e raggi X?",
            "🔭 La luce di alcuni magnetar ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: i magnetar sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'magnetar' quando vorrai esplorare questi resti"
        ],
        "stella di quark": [
            "🌌 Nessun problema! Le stelle di quark possono aspettare...",
            "💫 Va bene, questi resti stellari non spariranno!",
            "🚀 Quando vorrai vedere una stella di quark in azione, sarò qui!",
            "🌠 Le stelle di quark sono teoriche e potrebbero essere più dense delle stelle di neutroni!",
            "🌀 Sapevi che le stelle di quark possono avere una complessa struttura interna?",
            "🔭 La luce di alcune stelle di quark ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le stelle di quark sono fondamentali nell'evoluzione stellare!",
            "✨ Digita 'stella di quark' quando vorrai esplorare questi resti"
        ],
        "polvere spaziale": [
            "🌌 Nessun problema! La polvere spaziale può aspettare...",
            "💫 Va bene, queste particelle cosmiche non spariranno!",
            "🚀 Quando vorrai vedere polvere spaziale in azione, sarò qui!",
            "🌠 La polvere spaziale è fondamentale nella formazione di stelle e pianeti!",
            "🌀 Sapevi che la polvere interstellare contiene elementi pesanti forgiati nelle stelle?",
            "🔭 La luce di alcune nubi di polvere ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: la polvere spaziale è essenziale nell'evoluzione dell'universo!",
            "✨ Digita 'polvere spaziale' quando vorrai esplorare queste particelle"
        ],
        "nebulosa": [
            "🌌 Nessun problema! Le nebulose possono aspettare...",
            "💫 Va bene, queste nubi cosmiche non spariranno!",
            "🚀 Quando vorrai vedere una nebulosa in azione, sarò qui!",
            "🌠 Le nebulose sono vivai stellari dove nascono nuove stelle!",
            "🌀 Sapevi che alcune nebulose sono resti di supernove?",
            "🔭 La luce di alcune nebulose ha viaggiato miliardi di anni per raggiungerci!",
            "💥 Anche senza simulare, ricorda: le nebulose sono fondamentali nell'evoluzione dell'universo!",
            "✨ Digita 'nebulosa' quando vorrai esplorare queste nubi"
        ],
        "Singolarità": [
            "🌌 Nessun problema! Le singolarità possono aspettare...",
            "💫 Va bene, questi punti di densità infinita non spariranno!",
            "🚀 Quando vorrai vedere una singolarità in azione, sarò qui!",
            "🌠 Le singolarità sono teoriche e rappresentano la curvatura estrema dello spazio-tempo!",
            "🌀 Le singolarità potrebbero esistere nel centro di buchi neri e quasar!"
        ],
        "default": [
            "🌌 Nessun problema! L'universo è paziente...",
            "🚀 Va bene, l'esplorazione cosmica può aspettare!",
            "💫 Quando vorrai continuare, sarò qui!",
            "🔭 Sapevi che ci sono più stelle nell'universo che granelli di sabbia in tutte le spiagge terrestri?",
            "🌠 La luce di Andromeda che vediamo partì quando i nostri antenati dipingevano le caverne!",
            "⏳ Il 99.9% di tutta la materia visibile nell'universo è allo stato di plasma!",
            "💥 In 1 secondo, il Sole produce più energia di tutta l'umanità nella storia!",
            "🌀 I buchi neri supermassicci regolano la crescita delle galassie!",
            "✨ Ogni atomo di ossigeno nel tuo corpo è stato forgiato nel nucleo di una stella!",
            "🪐 Siamo tutti fatti di polvere stellare!"
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
        "🧮 Risultato: {expression} = {result}",
        "🔢 Calcolo completato: {expression} = {result}",
        "✨ Soluzione: {expression} = {result}",
        "⚡ Risolto: {expression} = {result}",
        "🌌 Equazione cosmica: {expression} = {result}",
        "🪐 Matematica stellare: {expression} = {result}",
        "💫 Calcolo gravitazionale: {expression} = {result}",
        "📐 Geometria universale: {expression} = {result}",
        "📊 Analisi numerica: {expression} = {result}",
        "🔭 Osservazione matematica: {expression} = {result}",
        "🌠 Formula risolta: {expression} = {result}",
        "🚀 Calcolo propulso: {expression} = {result}",
        "🛰️ Risultato orbitale: {expression} = {result}",
        "⏱️ Tempo di calcolo: 0s | {expression} = {result}",
        "⚖️ Equilibrio numerico: {expression} = {result}",
        "🌀 Vortice matematico: {expression} = {result}",
        "🌡️ Temperatura computazionale: 0K | {expression} = {result}",
        "📈 Proiezione numerica: {expression} = {result}",
        "📉 Analisi inversa: {expression} = {result}",
        "🧪 Esperimento numerico: {expression} = {result}",
        "🔬 Microscopio matematico: {expression} = {result}",
        "🖥️ Computazione quantistica simulata: {expression} = {result}",
        "💻 Algoritmo completato: {expression} = {result}",
        "🤖 Elaborazione robotica: {expression} = {result}",
        "🌟 Illuminazione numerica: {expression} = {result}",
        "🌌 Cosmo risolto: {expression} = {result}",
        "🧬 Genetica matematica: {expression} = {result}",
        "🌠 Astronomia numerica: {expression} = {result}",
        "🪐 Astrofisica computazionale: {expression} = {result}",
        "🔭 Telescopio matematico: {expression} = {result}",
        "🌌 Cosmologia numerica: {expression} = {result}",
        "🌟 Stella risolta: {expression} = {result}",
        "🌠 Galassia computata: {expression} = {result}",
        "🛸 Navigazione numerica: {expression} = {result}",
        "🌌 Universo calcolato: {expression} = {result}",
        "🌠 Costellazione risolta: {expression} = {result}",
        "🪐 Pianeta computato: {expression} = {result}",
        "🌌 Nebulosa numerica: {expression} = {result}",
        "🌠 Supernova risolta: {expression} = {result}",
        "🛰️ Satellite matematico: {expression} = {result}",
        "🌌 Spazio-tempo computato: {expression} = {result}",
        "🌠 Orizzonte degli eventi risolto: {expression} = {result}",
        "🌀 Singolarità numerica: {expression} = {result}",
        "🌌 Big Bang computato: {expression} = {result}",
        "🌠 Espansione cosmica risolta: {expression} = {result}",
        "🪐 Anello planetario computato: {expression} = {result}",
        "🌌 Wormhole numerico: {expression} = {result}",
        "🌠 Via Lattea computata: {expression} = {result}",
        "🛸 Astronave numerica: {expression} = {result}",
        "🌌 Multiverso computato: {expression} = {result}",
        "🌠 Dimensione parallela risolta: {expression} = {result}",
        "🪐 Esopianeta computato: {expression} = {result}",
        "🌌 Asteroide numerico: {expression} = {result}",
        "🌠 Meteorite risolto: {expression} = {result}",
        "🛰️ Sonda spaziale numerica: {expression} = {result}",
        "🌌 Cometa computata: {expression} = {result}",
        "🌠 Pioggia meteorica risolta: {expression} = {result}",
        "🪐 Luna computata: {expression} = {result}",
        "🌌 Sistema solare numerico: {expression} = {result}",
        "🌠 Orbita planetaria risolta: {expression} = {result}",
        "🛰️ Stazione spaziale numerica: {expression} = {result}",
        "🌌 Galassia a spirale computata: {expression} = {result}",
        "🌠 Galassia ellittica risolta: {expression} = {result}",
        "🪐 Galassia irregolare computata: {expression} = {result}",
        "🌌 Quasar numerico: {expression} = {result}",
        "🌠 Pulsar risolto: {expression} = {result}",
        "🛰 Sfera di plasma computata: {expression} = {result}"
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
            return "🤔 Impossibile calcolare. Formato valido: '2*(3+5^2)' o 'sqrt(9)'";
        }
    }
};

 
const greetingsSystem = {
    greetings: ["ciao", "salve", "buongiorno", "buonasera", "buonanotte", "saluti", "hey", "ehi", "saluti cosmici", "buongiorno stellare", "ciao singularity", "hola", "hi", "hello"],
    farewells: ["arrivederci", "addio", "a presto", "ci vediamo", "bye", "chiudi", "esci", "exit", "logout", "disconnetti", "termina", "addio singularity", "vado"],
    
    greetingsResponses: [
        "✨ Ciao, esploratore cosmico! Come posso aiutare il tuo viaggio tra le stelle?",
        "🚀 Benvenuto in SIU 2D! Pronto a creare universi incredibili?",
        "🌌 Saluti interstellari! Come posso aiutarti oggi?",
        "🪐 Ehilà, comandante! Quale sfida cosmica affronteremo?",
        "💫 Saluto gravitazionale! Come posso assistere la tua esplorazione?",
        "🌟 Benvenuto, creatore di mondi! Cosa simuleremo oggi?",
        "🌠 Salve, viaggiatore stellare! Pronto per un'avventura cosmica?",
        "🛸 Trasmissione ricevuta! Come posso assistere la tua missione spaziale?",
        "🔭 Ciao, astronomo virtuale! Quale mistero cosmico sveleremo?",
        "⚡ Energia cosmica in flusso! Come posso aiutarti?",
        "🌀 Vortice di benvenuto attivato! Qual è il tuo comando?",
        "🌠 Raggi cosmici rilevati! Ciao, come posso assisterti?",
        "🪐 Allineamento planetario perfetto per il tuo arrivo! Benvenuto!",
        "🌌 Curvatura spaziale stabilizzata! Saluti, esploratore!",
        "🚀 Sistemi online! Singularity a tua disposizione per qualsiasi dubbio",
        "🔭 Telescopi focalizzati! Pronto a esplorare l'universo?",
        "🌠 Pioggia meteorica di benvenuto! Come posso aiutarti?",
        "💻 Sistemi di IA cosmica attivati! Ciao, umano!",
        "🛰️ Satelliti di comunicazione sincronizzati! Connessione stabilita!",
        "🌌 Portale dimensionale aperto! Benvenuto in SIU 2D!",
        "🌟 Costellazioni allineate per il tuo arrivo! Saluti!",
        "⚛️ Particelle cosmiche entusiaste della tua presenza! Ciao!",
        "🌠 Cometa di benvenuto in traiettoria! Saluti, viaggiatore!",
        "🪐 Anelli planetari oscillano in saluto! Benvenuto!",
        "✨ Energia stellare canalizzata! Singularity a tua disposizione!"
    ],
    
    farewellResponses: [
        "🌠 Alla prossima, viaggiatore stellare! Che il tuo viaggio sia epico!",
        "🛸 Buoni viaggi nel cosmo! Torna quando avrai nuove domande!",
        "💫 Fine trasmissione. Ricorda: L'universo è il tuo parco giochi!",
        "👋 Ciao! Quando vorrai creare un buco nero, sono qui!",
        "🚀 Partenza confermata! Ritorna per nuove avventure cosmiche!",
        "🌌 Disconnessione... Ma l'universo continua la sua espansione!",
        "🪐 A presto, comandante! Che possiamo trovare nuovi orizzonti cosmici!",
        "✨ Missione completata! Torna per nuove esplorazioni stellari!",
        "🔭 Segnale perso... Ma le stelle guideranno sempre il tuo cammino!",
        "⚡ Energie cosmiche si congedano! Alla prossima orbita!",
        "🌀 Campo gravitazionale disattivato! A presto, esploratore!",
        "🌠 Traiettoria di uscita calcolata! Alla prossima, viaggiatore!",
        "🛰️ Satelliti in modalità standby! Torna quando avrai bisogno!",
        "💻 Sistemi in ibernazione cosmica! Arrivederci!",
        "🪐 Allineamento planetario di congedo! Buoni viaggi!",
        "🌌 Portale dimensionale chiuso! Ritorna quando vuoi!",
        "🌟 Costellazioni brillano per il tuo congedo! A presto!",
        "⚛️ Particelle cosmiche decelerate! Alla prossima!",
        "🌠 Cometa di addio in traiettoria! Buoni viaggi!",
        "🔭 Telescopi sfocati! Alla prossima osservazione!",
        "💫 Curvatura spaziale disfatta! Alla prossima avventura!",
        "🚀 Razzi di congedo attivati! Buon viaggio!",
        "🌠 Raggi cosmici di addio rilevati! A presto!",
        "🛸 Nave di congedo in orbita! Torna presto!",
        "✨ Ultimo impulso stellare! Disconnessione..."
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
        "🌌 Non l'ho trovato nella mia banca dati stellare... Chiedi di 'comete', 'buchi neri' o 'controlli'!",
        "🛸 La mia conoscenza è cosmica: prova a chiedere di fisica dei videogiochi o di elementi dell'universo",
        "🔭 Concentrati sullo spazio! Che ne dici di 'Come creare una nebulosa?' o 'Quale massa per un buco nero?'",
        "📡 Segnale perso... Riformula la domanda su creazione di stelle, evoluzione stellare o controlli SIU 2D",
        "💫 Vuoi calcolare qualcosa? Usa numeri e operatori come '3 * 5^2' o chiedi termini cosmici!",
        "🪐 Indizio cosmico: prova termini come 'gravità', 'stella', 'pianeta' o 'evoluzione'!",
        "⚡ Nuovo messaggio stellare rilevato! Formulalo come 'Come creare un quasar?' o 'Cos'è la zona abitabile?'"
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
        const errorMsg = createMessage('error : Errore di connessione. Controlla la tua connessione Internet e riprova.', 'error-message');
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