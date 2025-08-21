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
    "comète": [
        "☄️ Les comètes sont des corps glacés qui développent des queues lorsqu'ils sont proches des étoiles ! Dans SIU 2D, créez-les dans le menu 'Créer des astres'",
        "💫 La masse typique des comètes varie entre 0,1 et 10 unités. Au-dessus de 300 masses, elles évoluent automatiquement en planétoïdes glacés",
        "🌠 La queue pointe toujours dans la direction opposée au mouvement - cela simule avec précision le vent stellaire du jeu",
        "🚀 Astuce : Lors de la création d'une comète, faites glisser la souris pour définir sa vitesse initiale et voir la trajectoire prévue",
        "❄️ Les comètes fondent lorsqu'elles sont trop proches des étoiles chaudes - dans le jeu, elles se transforment en astéroïdes après 50 passages",
        "⏱️ En mode temps accéléré (100000x), vous pouvez observer une comète compléter son orbite en quelques secondes réelles",
        "🎯 Essayez de créer un système avec plusieurs comètes en orbite autour d'une étoile - appuyez sur 'C' pour accéder au menu de création",
        "📏 Le rayon du noyau est calculé par R = 0,1 * ∛(masse). Ex : masse 8 = rayon ~0,2 unités (visible dans le panneau d'édition)",
        "🔥 Les comètes avec une vitesse >5 unités/s développent des queues plus longues - parfait pour des effets visuels dramatiques",
        "🌌 En mode haute qualité (Options > Graphismes), les queues montrent trois couches : poussière (jaune), gaz ionisé (bleu), sodium (orange)",
        "🔄 Utilisez les planètes géantes comme 'fronde gravitationnelle' - placez une comète sur une trajectoire proche pour la rediriger",
        "⛰️ Les comètes usées deviennent des astéroïdes de classe 2 (glacés) - vous pouvez voir cette transition dans l'historique de l'astre",
        "💧 Contrôlez le point où la queue commence à se former en ajustant la température de base dans le panneau d'édition (au-dessus de -50°C)",
        "📊 Données physiques dans le jeu : Densité = 0,5 g/cm³, Albédo = 0,04 - visibles en mode statistiques avancées (Shift+E)",
        "✨ Les comètes nouvellement créées ont une activité d'environ 1 million d'années dans le temps du jeu - observez sur la chronologie universelle",
        "🎯 Pour une orbite parfaite, la vitesse initiale doit être perpendiculaire à la ligne gravitationnelle - les flèches vous guident",
        "🌡️ La température de la queue varie : près du noyau (1500°C), milieu (500°C), pointe (100°C) - visible avec les zones thermiques actives",
        "🔄 Les comètes peuvent être capturées par des planètes - essayez de créer un système avec Jupiter virtuel pour voir des lunes cométaires",
        "⏳ Dans le panneau temps de l'astre (T avec édition ouverte), voyez combien de passages stellaires restent avant l'inactivité",
        "📈 Astuce avancée : Les comètes avec une excentricité élevée (>0,9) ont des orbites plus intéressantes - ajustez dans le vecteur de vitesse",
        "🌠 Curiosité : Le code du jeu simule la perte de masse par sublimation - environ 0,01% par passage stellaire",
        "🔭 Dans les systèmes binaires, les comètes peuvent avoir des orbites chaotiques - essayez avec deux étoiles proches",
        "⚠️ Attention : Les comètes en collision avec des planètes s'évaporent avant l'impact dans la plupart des cas",
        "💧 L'eau des comètes est comptabilisée dans les ressources planétaires lorsqu'elles s'évaporent - voyez dans le panneau planétaire",
        "🌟 Pour de meilleurs résultats, créez des comètes dans le menu 'Corps mineurs' avec une température initiale entre -100°C et -50°C"
    ],
    
    "trou noir": [
        "🕳️ Les trous noirs ont une masse minimale de 1 billion (1e12) d'unités - créez-les dans le menu 'Corps exotiques'",
        "🌀 Le rayon dans le jeu est calculé comme R = ∛(masse)/1000 - simplification du rayon de Schwarzschild",
        "💥 Nourrissez les trous noirs avec de la matière pour les voir grandir - essayez d'envoyer des nébuleuses ou des étoiles proches",
        "⏳ Ils perdent de la masse par rayonnement de Hawking - en 10^67 ans ils s'évaporeraient (simulé de manière accélérée)",
        "📡 Le disque d'accrétion émet une chaleur intense - utilisez le bouton 'Zones thermiques' (T) pour visualiser les 5000°C+",
        "⚡ La force de marée près de l'horizon est F = (G * M * m) / r³ * Δr - les objets proches sont étirés (effet visible en Haute Qualité)",
        "🌌 Les trous noirs de plus de 500 sextillions deviennent des quasars - atteignez ce seuil pour voir des jets d'énergie",
        "🔭 Maintenez une distance sûre de 10x le rayon - à l'intérieur, les objets sont avalés instantanément",
        "🔄 Utilisez-les comme 'fronde gravitationnelle' - lancez des objets sur des trajectoires à haute énergie économiquement",
        "💫 Dans les systèmes binaires, ils génèrent des ondes gravitationnelles - activez dans Options > Physique > Effets relativistes",
        "⏱️ 1 seconde sur l'horizon équivaut à ~100 ans externes - observez avec le contrôle du temps accéléré",
        "📈 Le temps d'évaporation est affiché dans le panneau temps de l'astre (accessible avec T pendant l'édition)",
        "🌠 Pour fusionner des trous noirs : créez-en deux proches et accélérez le temps - la collision émet un flash intense",
        "⚠️ Les objets à moins de 5x le rayon subissent une spaghettification - effet activé dans Options > Graphismes > Haute Qualité",
        "🔢 Calculez le rayon pour 1 million de masses solaires : R ≈ 2,95 * (M/1e6) km - le jeu utilise des unités simplifiées",
        "💥 En atteignant 1e60 masses, ils deviennent des trous blancs - continuez à nourrir pour voir la transition",
        "🌡️ La température du disque d'accrétion est contrôlable dans le panneau d'édition - par défaut 1 000 000°C",
        "🌀 Le spin peut être ajusté dans le panneau avancé (cliquez sur 'Propriétés relativistes') - affecte le disque d'accrétion",
        "📏 Pour une mesure précise : Le diamètre de l'horizon des événements est toujours 2x le rayon affiché dans le jeu",
        "⚠️ Attention : Les trous noirs dans des systèmes denses peuvent avaler des étoiles rapidement - surveillez la chronologie",
        "🔭 Utilisez le mode observation (O) pour voir les lentilles gravitationnelles - déforment la lumière des étoiles derrière eux",
        "💫 Les quasars (stade évolutif) émettent des jets d'énergie - contrôlez la direction dans le panneau d'édition",
        "⏳ Pour les trous noirs supermassifs, le temps d'évaporation dépasse l'âge actuel de l'univers du jeu",
        "🌌 Astuce : Créez un binaire trou noir/étoile pour voir le transfert de matière en temps réel",
        "✨ Pour une expérience complète, activez la musique ambiante 'Singularity' dans Options > Audio"
    ],
    
    "pesanteur": [
        "⚖️ Ajustement global de 0% à 500% dans Menu > Physique > Constante gravitationnelle",
        "📏 Constante G par défaut : 6,67430e-11 N·m²/kg² - modifiable pour simuler des univers alternatifs",
        "🌀 Les trous noirs ont un multiplicateur gravitationnel fixe de 1000x pour les effets relativistes",
        "🪐 Force de marée calculée comme Δg = (2GM/R³) * Δr - cause des déformations sur les lunes proches (visible en Haute Qualité)",
        "📈 Chaque 100% supplémentaire de gravité accélère les systèmes d'environ 15% - utile pour les simulations rapides",
        "🌌 Ondes gravitationnelles activées dans Options > Physique > Effets avancés - visibles comme des ondulations",
        "🔄 Vitesse orbitale optimale : v = √(GM/r) - affichée lors de la création avec les flèches guides",
        "⚙️ Réduisez à 10-50% pour simuler des nébuleuses, augmentez à 200-500% pour des systèmes stellaires denses",
        "🔭 Effet de lentille gravitationnelle visible près des trous noirs - activez dans Graphismes > Effets spéciaux",
        "📊 Stabilité maximale : 0,5 * √N corps (ex : 100 astres → ~7 stables) - dépasser cause des comportements chaotiques",
        "⏳ Une gravité élevée accélère l'évolution stellaire - les étoiles vivent moins dans des champs gravitationnels forts",
        "🌠 Seuil de fusion lors des collisions : Ec < |Ep| - quand l'énergie cinétique est inférieure au potentiel gravitationnel",
        "🧮 Formule implémentée : F = G * m1 * m2 / r² - testable avec le mode 'Afficher les forces' (F3)",
        "🔢 Pour doubler la force gravitationnelle : augmentez G de 100% ou les masses de 100%",
        "⚠️ Des valeurs >300% peuvent causer des instabilités dans les systèmes de plus de 50 corps - utilisez avec prudence",
        "🌍 Gravité de surface calculée comme g = GM/R² - visible dans le panneau planétaire pour les corps rocheux",
        "💫 Le système utilise l'intégration Verlet pour des calculs orbitaux précis - activez 'Précision totale' en Physique",
        "📈 Sur les corps massifs, la gravité affecte la rotation - les planètes très proches des étoiles sont verrouillées par effet de marée",
        "🌀 Les champs gravitationnels forts dilatent le temps - observable en comparant des horloges à différentes altitudes",
        "⚡ Pour simuler la matière noire : augmentez la gravité de 30-50% sans ajouter de masse visible",
        "🔭 La précision numérique est plus élevée près des masses importantes - le jeu utilise un système de coordonnées adaptatif",
        "🌌 La courbure de l'espace-temps est simulée visuellement près des objets compacts - activez dans Options > Graphismes",
        "📏 Les distances de Roche sont calculées automatiquement - les lunes dans cette limite se fragmentent (visible avec 'Afficher les zones critiques')",
        "💥 Dans les collisions, la gravité détermine l'énergie libérée - E ∝ M²/R pour les impacts directs",
        "✨ Astuce : Pour des orbites stables, la vitesse initiale doit être ≈80% de la vitesse d'échappement locale"
    ],
    
    "étoile": [
        "⭐ Masse minimale : 15 millions d'unités - créez dans le menu 'Corps stellaires'",
        "🌞 Pour une étoile comme le Soleil : masse ~1,989e30 kg (1 unité solaire dans le jeu)",
        "🌈 Couleurs par température : Bleu (>30 000K), Blanc (10 000K), Jaune (6 000K), Rouge (<3 500K) - ajustez dans le panneau",
        "💥 Les étoiles de plus de 20 masses solaires explosent en supernovae - activez 'Évolution stellaire' dans Options",
        "⏳ Durée de vie : t ≈ 10^10 * (M/M☉)^-2,5 ans - visible dans le panneau temps de l'astre (T pendant l'édition)",
        "🔄 Créez des systèmes binaires avec deux étoiles proches pour voir des orbites fascinantes",
        "🔭 Les étoiles variables changent de luminosité - contrôlez l'amplitude dans 'Propriétés stellaires'",
        "🌡️ Zone habitable : d = √(L/L☉) UA - affichée comme un anneau vert lorsqu'elle est sélectionnée",
        "💫 Fusion nucléaire simulée : H → He avec une efficacité de 0,7% (E=mc²) - affecte la luminosité et la durée de vie",
        "📊 Évolution : Naine rouge → Naine blanche | Étoile moyenne → Géante rouge | Massive → Supernova → Trou noir",
        "⚙️ Paramètres ajustables : Masse, température, rotation, métallicité et activité magnétique",
        "✨ Les étoiles à neutrons nécessitent >1,4 masse solaire et un effondrement - créez via des supernovae",
        "🌌 Amas stellaires : Créez plusieurs étoiles dans une petite région (menu 'Systèmes complexes')",
        "🧪 Modifiez la constante gravitationnelle pour voir les effets sur l'évolution (Menu > Physique > Constantes)",
        "🔢 Luminosité : L ∝ M^3,5 - une étoile 2x plus massive est ~11x plus lumineuse",
        "⚠️ Les étoiles très massives (>100 masses solaires) peuvent être instables - se divisent ou explosent prématurément",
        "🌠 Étoiles T Tauri (jeunes) montrent des éjections de masse - visibles comme des protubérances en mode Haute Qualité",
        "💥 Dans les supernovae, 90% de la masse est éjectée en nébuleuse - le reste forme une étoile à neutrons ou un trou noir",
        "📈 Rayon stellaire : R ∝ M^0,8 pour les étoiles de la séquence principale - calculé automatiquement",
        "🌍 Les planètes en zone habitable peuvent développer de la vie - indiqué par une icône verte dans le panneau planétaire",
        "🔥 Le noyau stellaire atteint 15 millions °C pour la fusion - la température ajustable affecte le taux d'évolution",
        "🌀 Les champs magnétiques forts créent des taches stellaires - contrôlez l'intensité dans le panneau avancé",
        "🔭 Pour observer les détails, utilisez le zoom (molette de souris) et réduisez la vitesse du temps",
        "✨ Astuce : Les étoiles binaires peuvent avoir des planètes en orbite P-type (autour de la paire) ou S-type (autour d'une seule)"
    ],
    
    "planète": [
        "🪐 Masse : 5K-30,5K (rocheuses), 105K-2,5M (gazeuses) - créez dans le menu 'Corps planétaires'",
        "🌍 Classes : Rocheuses (1-11), Gazeuses (1-6), Naines - attribuées automatiquement par masse/température",
        "🌡️ Zone habitable calculée comme d = √(L_étoile / L☉) UA - affichée comme anneau vert autour des étoiles",
        "🔄 Vitesse orbitale optimale : v = √(GM/r) - ajustez pendant la création avec le vecteur de vitesse",
        "🌋 Planètes volcaniques : température >1000°C + faible eau/atmosphère - classe 7 automatiquement",
        "❄️ Mondes glacés : température < -100°C + eau élevée - deviennent automatiquement classe 9",
        "🌫️ Épaisseur atmosphérique : contrôlez avec le curseur de gaz (0-100%) - affecte température et pression de surface",
        "💧 Eau de surface : ajustez avec le curseur aquatique - idéal pour les mondes habitables : 30-70%",
        "🔭 Les lunes montrent une libration - effet subtil activé dans Graphismes > Haute Qualité",
        "🛰️ Maximum de 20 lunes par planète - stable jusqu'à 10% de la masse planétaire",
        "⏱️ Migration planétaire dans les systèmes jeunes - activez dans Physique > Effets avancés",
        "📏 Rayon : ∛(masse) pour les rocheuses, ∛(masse/2) pour les gazeuses - calculé automatiquement",
        "🌌 Types spéciaux : Carbone (ratio C/O élevé), Fer (noyau exposé) - créez avec des compositions extrêmes",
        "🧪 Les collisions planétaires créent de nouveaux mondes + ceintures d'astéroïdes - simulé avec précision",
        "🔢 Gravité de surface : g = GM/R² - affichée dans le panneau planétaire pour les corps rocheux",
        "💫 Anneaux planétaires : activez dans 'Caractéristiques' > Anneaux - ajustez épaisseur, couleur et densité",
        "🌍 Planètes océan (classe 2) ont >90% d'eau - génèrent automatiquement une atmosphère humide",
        "🏜️ Planètes désertiques (classe 3) perdent 80-90% d'eau - montrent une texture sablonneuse",
        "🌱 Mondes habitables (classe 6) montrent de la végétation - activez dans Graphismes > Détails de surface",
        "🌋 Activité géologique : contrôlez avec le curseur 'Tectonique' - affecte volcanisme et formation de montagnes",
        "🌀 Rotation : ajustez la période de rotation - affecte l'aplatissement et les schémas climatiques sur les gazeuses",
        "🌌 Exoplanètes extrêmes : créez avec des paramètres inhabituels en utilisant le mode 'Personnalisation avancée'",
        "📊 Pour les données détaillées : sélectionnez la planète et appuyez sur E - le panneau montre toutes les statistiques",
        "✨ Astuce : Les planètes en résonance orbitale (ex : 2:3) maintiennent une stabilité à long terme",
        "🔭 Utilisez le mode 'Observatoire' (O) pour voir les détails de surface sur les planètes sélectionnées"
    ],
    "météoroïde": [
        "🌠 Les météoroïdes sont des fragments rocheux plus petits que les astéroïdes (1mm-1m) - générés automatiquement lors de collisions",
        "💫 Vitesse moyenne : 20-70 km/s - visible sous forme de traînées rapides en temps réel",
        "🪨 Composition : 90% roche, 6% fer, 4% nickel - définie dans le panneau de création de fragments",
        "🌌 Dans SIU 2D, créez-les via des collisions ou le menu 'Corps mineurs' > 'Générer des fragments'",
        "🔥 En entrant dans l'atmosphère, ils deviennent des météores - activez 'Atmosphères' dans Options > Physique",
        "📏 Masse typique : 0,1g-100kg - les objets plus gros sont classés comme astéroïdes",
        "💥 Effet d'entrée atmosphérique : activez dans Graphismes > Effets spéciaux > Étoiles filantes",
        "🌍 Pour la Terre : ~100 tonnes de météoroïdes entrent quotidiennement - simulé proportionnellement",
        "📊 Données : Densité 3-4 g/cm³, Albédo 0,05-0,25 - ajustable dans le panneau des propriétés",
        "✨ Astuce : Créez des ceintures d'astéroïdes pour générer naturellement des météoroïdes",
        "⏱️ En mode accéléré (10000x), voyez des pluies de météores constantes",
        "🔭 Observation : Les météoroïdes ne sont pas visibles avant de devenir des météores",
        "🌠 Pluie de météores : se produit lorsque les planètes traversent les traînées de comètes - simulez avec 'Événements'",
        "💫 Collisions avec vaisseaux : réduisez le bouclier de 1% par 10kg - activez dans Physique > Dégâts",
        "⚠️ Danger : Les météoroïdes >1kg peuvent endommager les satellites - indiqué par une alerte jaune",
        "🌌 Pour créer manuellement : menu 'Fragments' > taille Petite (S)",
        "📈 Statistiques : Fréquence ajustable dans Menu > Environnement > Densité de fragments",
        "🛰️ La vitesse relative détermine l'énergie d'impact : E = 0,5 * m * v²",
        "🌠 Curiosité : Le météoroïde qui a créé le Meteor Crater faisait seulement 50m de diamètre",
        "🌟 Effet visuel : Activez 'Traînées lumineuses' pour voir les trajectoires à grande vitesse"
    ],
    "météore": [
        "☄️ Les météores sont des météoroïdes brûlant dans l'atmosphère - 'étoiles filantes' dans le jeu",
        "🔥 Température du plasma : 1 500-3 000°C - visible sous forme d'étincelles colorées",
        "🌈 Couleurs : Vert (magnésium), Jaune (sodium), Rouge (azote) - définies par composition",
        "🌍 Pour voir : Augmentez la densité atmosphérique > 0,1kg/m³ et ajoutez des météoroïdes",
        "💫 Vitesse minimale : 11km/s pour l'ignition - ajustez le seuil d'ignition atmosphérique",
        "📏 Magnitude apparente : -4 à +5 - contrôlée par taille et vitesse du météoroïde",
        "🌠 Pluies de météores : configurez dans Événements > Pluies de météores avec radiant défini",
        "⏱️ Durée : 0,1-10 secondes en temps réel - proportionnelle à la masse",
        "✨ Astuce : Utilisez des comètes comme source pour des pluies de météores périodiques",
        "💥 Bolides : météores > magnitude -4 - déclenchent son d'explosion et flash",
        "🌌 Pour créer manuellement : 'Événements' > 'Météore' avec altitude 80-120km",
        "📊 Fréquence : Ajustable de 0-100 événements/heure dans Options > Environnement",
        "🔭 Meilleure visualisation : Nuit avec ciel clair - réduisez la pollution lumineuse dans le menu",
        "⚠️ Attention : Les météores peuvent survivre et devenir des météorites",
        "🌠 Curiosité : La pluie des Perséides atteint 100 météores/heure au pic",
        "🌟 Effet sonore : Activez dans Audio > Événements > Étoiles filantes",
        "🛸 Météores terrestres : se produisent au-dessus de 80km - altitude ajustable",
        "📉 Perte de masse : 90-99% pendant la traversée atmosphérique",
        "💧 Météores aquatiques : créent des cratères sous-marins visibles en mode océan",
        "🌌 Pour capture d'écran : Pausez au bon moment avec P et utilisez F12"
    ],
    "astéroïde": [
        "🪨 Astéroïdes : corps rocheux de 1m-1000km - créez dans le menu 'Corps mineurs'",
        "🌌 Classes : C (carbonés), S (silicates), M (métalliques) - sélectionnez dans le panneau",
        "💫 Masse typique : 1e10-1e20 kg - au-dessus deviennent des planétoïdes",
        "📏 Forme irrégulière : activez dans Propriétés > Forme > Irrégulière pour réalisme",
        "🔄 Orbite : Généralement entre Mars et Jupiter - créez des ceintures avec 'Générer système'",
        "⚠️ Danger d'impact : indiqué par un marqueur rouge si la trajectoire intercepte une planète",
        "🌠 Astéroïdes géocroiseurs : configurez dans 'Événements' > 'Astéroïdes NEA'",
        "💥 Collision avec planète : libère de l'énergie E = 0,5 * m * v² - visible comme explosion",
        "⛰️ Surface : Texture cratérisée activée dans Graphismes > Détails de surface",
        "🌌 Familles d'astéroïdes : amas de même origine - générez avec 'Familles collisionnelles'",
        "📊 Données : Densité 1-5 g/cm³, Albédo 0,02-0,7 - ajustables",
        "✨ Astuce : Utilisez pour l'exploitation minière virtuelle - ressources calculées dans Panneau > Ressources",
        "🔭 Observation : Astéroïdes <100m visibles seulement quand proches",
        "🚀 Missions : Envoyez des sondes en cliquant sur l'astéroïde > 'Envoyer sonde'",
        "🌍 Impact K-T : Simulez avec un astéroïde de 10km pour une extinction de masse",
        "💫 Rotation chaotique : commune chez les petits astéroïdes - activez dans Propriétés > Rotation",
        "🛰️ Lunes astéroïdales : rares mais possibles - ajoutez avec 'Ajouter lune'",
        "📈 Marché des ressources : Fer, nickel et platine valent des crédits en mode économie",
        "🌠 Curiosité : L'astéroïde Cérès est classé comme planète naine",
        "🌟 Défense planétaire : Testez les systèmes de défense avec 'Mode Impact'"
    ],
    "planétoïde": [
        "🌑 Planétoïdes : corps entre 100-500km - stade intermédiaire entre astéroïdes et planètes",
        "🌌 Créez avec masse 1e18-1e20 kg dans le menu 'Corps mineurs' > 'Planétoïdes'",
        "💫 Gravité suffisante pour une forme sphérique : activez 'Forme sphérique' dans propriétés",
        "🪨 Composition : Glacés (Kuiper) ou Rocheux (Ceinture) - sélectionnez dans le panneau",
        "🌠 Exemples : Orcus, Quaoar, Sedna - modèles prédéfinis dans 'Bibliothèque'",
        "❄️ Planétoïdes glacés : commencent une activité cométaire à 5UA des étoiles",
        "📏 Différence avec planètes naines : n'ont pas nettoyé leur orbite - définition automatique",
        "🔄 Migration : Peuvent être éjectés vers le nuage d'Oort dans les systèmes instables",
        "💥 Collisions : Génèrent des familles d'astéroïdes de composition similaire",
        "🌌 Zone : Ceinture de Kuiper (30-50UA) ou Disque dispersé (jusqu'à 1000UA)",
        "📊 Données physiques : Densité 1-2 g/cm³ (glacés), 2-4 g/cm³ (rocheux)",
        "✨ Astuce : Créez des systèmes binaires de planétoïdes",
        "🔭 Observation : Nécessite télescope virtuel (mode observatoire) pour détection",
        "🚀 Capture : Les planétoïdes peuvent être capturés comme lunes par des planètes géantes",
        "🌍 Habitabilité : Jamais naturelle, mais possible avec terraformation avancée",
        "💫 Curiosité : Haumea a une forme ovale due à une rotation rapide",
        "⏱️ Temps évolutif : Stables pendant des milliards d'années sur orbites froides",
        "📈 Classification automatique : Quand un corps atteint 450km de diamètre",
        "🌠 Anneaux : Certains planétoïdes peuvent avoir des anneaux ténus - activez dans 'Caractéristiques'",
        "🌟 Mode exploration : Envoyez des sondes pour cartographier la surface"
    ],
    "gazeux": [
        "🪐 Géantes gazeuses : planètes massives sans surface solide - masse > 100K unités",
        "🌪️ Créez dans le menu 'Corps planétaires' > 'Gazeuses' avec masse minimale 105K",
        "💫 Classes : Jupiters chauds (près de l'étoile) ou Jupiters froids (distants)",
        "🌈 Couleurs : Jaune (H2), Rouge (NH3), Bleu (CH4) - dépendent de la température",
        "🌌 Structure : Noyau rocheux + manteau métallique + atmosphère épaisse - visible en coupe",
        "🌀 Motifs atmosphériques : Bandes, taches, vortex - intensité contrôlée par rotation",
        "💥 Limite de masse : 13 MJup pour la fusion du deutérium (naines brunes), 80 MJup pour les étoiles",
        "📏 Faible densité : 0,5-2 g/cm³ - Saturne flotterait sur l'eau !",
        "🌠 Anneaux : Activez dans 'Caractéristiques' > Anneaux - épaisseur et densité ajustables",
        "🌍 Lunes : Jusqu'à 20 lunes stables - générez des systèmes lunaires complexes",
        "⚠️ Migration planétaire : Commune chez les jeunes géantes gazeuses - activez en Physique avancée",
        "✨ Astuce : Pour des taches comme la Grande Tache Rouge, augmentez la vitesse de rotation",
        "🔭 Observation : Les motifs nuageux changent en temps réel - accélérez pour voir l'évolution",
        "📊 Données : Température du noyau 20 000°C, pression 40 Mbar - visibles dans le panneau",
        "💫 Champ magnétique : 10-20x plus fort que la Terre - activez les aurores dans Graphismes",
        "🌌 Exemples : Jupiter, Saturne, Uranus, Neptune - modèles dans 'Bibliothèque planétaire'",
        "🚀 Exploration : Envoyez des sondes atmosphériques survivant jusqu'à une limite de pression",
        "🌠 Curiosité : Jupiter agit comme un 'aspirateur cosmique' protégeant les planètes internes",
        "🌟 Pour mini-Neptunes : réduisez la masse à 10-20 masses terrestres",
        "💥 Collision : Les géantes gazeuses en collision créent des étoiles éphémères d'hydrogène"
    ],
    "naine brune": [
        "🟤 Naines brunes : 'étoiles ratées' de 13-80 masses de Jupiter",
        "🌡️ Température : 300-3000K - trop froides pour une fusion stable d'hydrogène",
        "💫 Créez dans le menu 'Corps stellaires' > 'Sous-stellaires' avec masse 1,3e28-8e28 kg",
        "🔥 Fusion limitée : Seulement deutérium et lithium - durée de vie 1-100 milliards d'années",
        "📈 Classification spectrale : M, L, T, Y - définie par température dans le panneau",
        "🌌 Émission : Principalement infrarouge - visible avec filtre IR (touche I)",
        "🪐 Peuvent avoir des disques protoplanétaires et systèmes planétaires - activez 'Disques'",
        "⚠️ Différence avec planètes : Formation stellaire, non planétaire",
        "✨ Astuce : Cherchez dans les régions de formation stellaire récente",
        "🔭 Observation : Difficiles à détecter - utilisez le mode 'Balayage IR'",
        "📊 Données : Densité 10-100 g/cm³, gravité de surface 100-500 m/s²",
        "💥 Éruptions : Explosions magnétiques occasionnelles - intensité ajustable",
        "🌠 Curiosité : La naine brune la plus froide connue a la température d'un café !",
        "🚀 Planètes : Peuvent avoir des planètes terrestres sur orbites proches",
        "⏱️ Évolution : Refroidissement lent jusqu'à devenir naines noires",
        "🌟 Binaires : Les systèmes binaires de naines brunes sont communs",
        "🌀 Atmosphère : Motifs climatiques complexes avec nuages de poussière",
        "💫 Détection : Plus facile par émission radio - activez dans Options",
        "🌌 Exemples : WISE 0855 - modèle prédéfini",
        "📉 Limite inférieure : Objets <13 MJup classés comme planètes"
    ],
    "naine rouge": [
        "🔴 Naines rouges : Petites étoiles froides (type M) - masse 0,08-0,5 solaire",
        "🌡️ Température : 2 400-3 700K - couleur rouge caractéristique",
        "⏳ Durée de vie : Billions d'années - quasi éternelles à l'échelle cosmique",
        "💥 Éruptions stellaires : Fréquentes et intenses - peuvent stériliser les planètes proches",
        "🌡️ Zone habitable : Très proche (0,1-0,4UA) - planètes probablement verrouillées par marée",
        "🌌 Créez dans le menu 'Corps stellaires' > 'Naines rouges' avec masse 15-75 millions d'unités",
        "📈 Statistiques : 75% des étoiles de la Voie Lactée sont des naines rouges",
        "💫 Planètes : Systèmes planétaires communs - Trappist-1 est un exemple célèbre",
        "⚠️ Danger : Rayonnement UV et X des éruptions peut détruire les atmosphères",
        "✨ Astuce : Pour des planètes habitables, utilisez des boucliers magnétiques puissants",
        "🔭 Observation : Peu visibles à l'œil nu - faible luminosité",
        "🌠 Activité chromosphérique : Taches stellaires couvrant jusqu'à 40% de la surface",
        "📊 Données : Luminosité 0,0001-0,08 solaire, rayon 0,1-0,6 solaire",
        "💥 Fusion : Lente et stable - efficacité 10x supérieure aux étoiles comme le Soleil",
        "🌌 Vitesse de rotation : Élevée (période de jours) - génère des champs magnétiques intenses",
        "🚀 Voyage interstellaire : Cibles principales par abondance et longévité",
        "❄️ Naines bleues : Naines rouges très actives pouvant émettre de la lumière bleue pendant les éruptions",
        "🌟 Binaires : Souvent dans des systèmes multiples",
        "💫 Curiosité : Proxima Centauri est l'étoile la plus proche du Soleil",
        "🌡️ Température de surface : Ajustable dans le panneau - par défaut 3300K"
    ],
    "étoile géante": [
        "🌟 Étoiles géantes : Phase évolutive des étoiles moyennes après la séquence principale",
        "🌡️ Classes : Géantes rouges (K, M), Géantes bleues (B, A) - rares",
        "📏 Rayon : 10-100x solaire - peut engloutir les planètes internes",
        "💫 Masse : 0,5-8 solaire - en dessous deviennent naines blanches, au-dessus supernovae",
        "🔥 Noyau : Hélium ou carbone/oxygène en fusion - température >100 millions K",
        "🌌 Créez directement ou évoluez des étoiles dans le menu 'Évolution stellaire'",
        "⏳ Durée : 1 million - 1 milliard d'années selon la masse",
        "💥 Perte de masse : Vents stellaires forts - forme des nébuleuses planétaires",
        "📈 Luminosité : 100-10 000x solaire - illumine des systèmes entiers",
        "⚠️ Planètes : Orbites instables - planètes peuvent être éjectées ou détruites",
        "✨ Astuce : Pour voir la pulsation, ajustez l'instabilité dans le panneau",
        "🔭 Variabilité : Beaucoup sont variables (ex : Mira, Céphéides)",
        "🌠 Nucléosynthèse : Produit carbone, azote et éléments lourds",
        "📊 Données : Densité moyenne très faible (10⁻⁵ g/cm³)",
        "💫 Fin : Expulse l'enveloppe formant une nébuleuse planétaire + noyau devient naine blanche",
        "🌌 Exemples : Arcturus, Aldebaran - modèles dans la bibliothèque",
        "🚀 Habitabilité : Zones habitables dynamiques et temporaires",
        "❄️ Géantes bleues : Étoiles massives en phase brève avant supernova",
        "🌟 Curiosité : Bételgeuse pourrait engloutir Jupiter si placée à la place du Soleil",
        "💥 Simulation : Accélérez le temps pour voir l'évolution complète"
    ],
    "hypergéant": [
        "💥 Hypergéantes : Étoiles les plus massives et lumineuses connues (>30 solaires)",
        "🌡️ Température : 3 500-35 000K - classes O, B, A, F, K, M",
        "💫 Luminosité : Jusqu'à 1 million de fois solaire - illumine des galaxies entières",
        "📏 Rayon : 100-2 000 solaire - placée dans le Système Solaire, engloutirait Jupiter",
        "⏳ Vie : Très brève (1-10 millions d'années) - fin en supernova ou hypernova",
        "🌌 Créez dans le menu 'Corps stellaires' > 'Étoiles massives' avec masse >30 solaire",
        "⚠️ Instabilité : Perdent masse rapidement - vents stellaires puissants",
        "🔥 Fusion : Éléments jusqu'au fer dans le noyau - stades avancés de nucléosynthèse",
        "💥 Éruptions : Perte de masse lors d'événements catastrophiques - simulez avec 'Éjections'",
        "🌠 Exemples : Eta Carinae, VY Canis Majoris - modèles dans la bibliothèque",
        "📈 Variabilité : Irrégulière et extrême - luminosité peut varier de 50% en mois",
        "✨ Astuce : Pour des éruptions comme Eta Carinae, augmentez l'instabilité à >80%",
        "🔭 Poussière : Les éjections forment des nébuleuses complexes - activez 'Nébuleuses environnantes'",
        "🌌 Environnement : Se forment dans les régions HII riches en gaz - simulez avec nuages moléculaires",
        "🚀 Fin : S'effondrent en trous noirs ou étoiles à neutrons après supernova",
        "📊 Données : Densité moyenne 10⁻⁶ g/cm³ - plus ténue que le vide de laboratoire",
        "💫 Curiosité : Certaines hypergéantes ont des compagnons causant des éruptions périodiques",
        "🌟 Binaires : Systèmes massifs peuvent fusionner créant des objets encore plus extrêmes",
        "❄️ Hypergéantes jaunes : Phase rare et instable entre supergéante bleue et rouge",
        "💥 Simulation de mort : Activez 'Supernova imminente' pour voir les alertes pré-effondrement"
    ],
    "étoile massive": [
        "💫 Étoiles massives : >8 masses solaires - destin final en supernova",
        "🌡️ Température : 10 000-50 000K - classes O et B",
        "⏳ Vie : Courte (1-50 millions d'années) - brûlent le combustible rapidement",
        "💥 Vents stellaires : Puissants - perdent jusqu'à 10⁻⁶ masses solaires par an",
        "🌌 Créez dans le menu 'Corps stellaires' > 'Étoiles massives' avec masse >1,6e31 kg",
        "🔥 Fusion : Séquence rapide H->He->C->Ne->O->Si->Fe",
        "📏 Rayon : 5-25 solaire pendant la séquence principale",
        "⚠️ Supernovae : Destin inévitable - préparent le scénario pour l'effondrement",
        "✨ Astuce : Pour voir l'évolution complète, activez 'Évolution rapide' dans Options",
        "🔭 Observation : Source principale d'éléments lourds dans l'univers",
        "🌠 Nébuleuses : Créent des bulles de gaz interstellaire - activez 'Effet vent'",
        "📊 Données : Luminosité 10 000-1 000 000 solaire, densité noyau >10⁶ g/cm³",
        "💫 Compagnons : Souvent dans systèmes binaires avec transfert de masse",
        "🚀 Pulsars : Certaines deviennent pulsars après supernova - sélectionnez dans destin final",
        "❄️ Supergéantes bleues : Phase avant supernova pour étoiles >20 solaires",
        "🌟 Curiosité : Les étoiles Wolf-Rayet sont des étoiles massives ayant perdu leur hydrogène",
        "🌌 Formation : Requiert des nuages moléculaires denses - simulez avec 'Régions de formation'",
        "💥 Magnétars : 10% deviennent magnétars - étoiles à neutrons à champ magnétique extrême",
        "📈 Instabilité de paire : Pour >130 solaires, peuvent exploser sans résidu",
        "⚠️ Avertissement : Ne placez pas de planètes habitables proches - radiation mortelle"
    ],
    "trou blanc": [
        "⚪ Trous blancs : Théorie opposée aux trous noirs - expulsent de la matière",
        "💫 Existent seulement théoriquement - simulation spéculative dans SIU 2D",
        "🌌 Créez dans le menu 'Corps exotiques' > 'Trous blancs' avec masse >1e40 kg",
        "🔥 Mécanique : La matière émerge de l'horizon des événements - ne peut être accédé",
        "📏 Propriétés : Masse négative (théorique) - dans le jeu, utilisez masse positive avec 'flux inversé'",
        "⚠️ Stabilité : Objets temporaires en simulation - durée ajustable",
        "✨ Astuce : Connectez à des trous noirs via 'Pont d'Einstein-Rosen'",
        "🔭 Visualisation : Jets de particules émergeant - intensité contrôlable",
        "🌠 Origine : Résultat final possible de trous noirs évaporés",
        "📊 Paramètres : Température du jet 1e10 K, vitesse d'éjection 0,9c",
        "💥 Effets : Radiation intense - dangereux pour les systèmes proches",
        "🌌 En relativité : Solution mathématique des équations d'Einstein",
        "🚀 Voyage interstellaire : Théoriquement pourraient être des portails - fonctionnalité expérimentale",
        "❄️ Différence avec quasars : Expulsion continue vs événements discrets",
        "🌟 Curiosité : Certains modèles cosmologiques les utilisent pour expliquer le Big Bang",
        "💫 Simulation : Combinez avec trous noirs pour créer des trous de ver stables",
        "⚠️ Limitation : Ne peut être nourri - expulse seulement de la matière pré-programmée",
        "📈 Évolution : Rétrécit en expulsant de la matière - durée de vie proportionnelle à la masse",
        "🌠 Matière éjectée : Configurable (hydrogène, plasma, matière exotique)",
        "💥 Alerte : Objet hautement instable - peut disparaître soudainement"
    ],
    "grand coup": [
        "💥 Big Bang : Simulation de l'origine de l'univers dans SIU 2D",
        "🌌 Accédez via 'Univers' > 'Nouvel univers' > 'Mode Big Bang'",
        "💫 Paramètres : Densité initiale, température, fluctuations quantiques",
        "⏳ Temps initial : T+10⁻⁴³s après singularité - simulation commence à T+1s",
        "🔥 Température initiale : 10³² K - refroidit rapidement lors de l'expansion",
        "🌠 Éléments primordiaux : Formation de H, He, Li - proportions ajustables",
        "📈 Expansion : Loi de Hubble simulée - constante ajustable",
        "💥 Nucléosynthèse : Fusion nucléaire dans les 3 premières minutes - activez en 'Physique avancée'",
        "🌌 Rayonnement cosmique fossile : Formé à T+380 000 ans - activez en 'Radiation'",
        "✨ Astuce : Accélérez le temps pour voir la formation des grandes structures",
        "🔭 Matière noire : Composant crucial - ajustez % dans 'Paramètres cosmologiques'",
        "📊 Résultats : Formation de galaxies, amas et superamas",
        "⚠️ Limitation : Simulation simplifiée - n'inclut pas l'inflation cosmique",
        "🌟 Univers alternatifs : Testez avec différentes constantes physiques",
        "💫 Curiosité : La température actuelle du CMB est 2,7K - visible comme fond diffus",
        "🌠 Formation stellaire : Premières étoiles en 100-500 millions d'années",
        "🚀 Mode observateur : Voyagez dans le temps pour voir différentes ères cosmiques",
        "❄️ Âge sombre : Période avant la première étoile - simulé avec fond noir",
        "💥 Recombinaison : Électrons et protons forment des atomes neutres - transition cruciale",
        "📈 Anisotropies : Graines pour formation de galaxies - intensité ajustable"
    ],
    "poussière spatiale": [
        "🌌 Poussière spatiale : Grains microscopiques (0,01-10μm) - base de formation stellaire",
        "💫 Composition : Silicates, carbone, glace - définie par région de l'espace",
        "🌠 Effets : Absorbe la lumière (extinction), réfléchit la lumière (nébuleuses de réflexion)",
        "🌡️ Température : 10-100K dans les nuages moléculaires",
        "✨ Créez avec 'Milieu interstellaire' > 'Ajouter poussière'",
        "📊 Densité : 10⁻⁶ grains/m³ dans l'espace interstellaire - jusqu'à 10¹² dans les nuages",
        "🔭 Observation : Visible comme taches sombres contre les nébuleuses brillantes",
        "💥 Importance : Graines pour la formation de planétésimaux",
        "🌌 Effet de radiation : La pression de radiation peut déplacer les grains",
        "🚀 Danger pour vaisseaux : Dégâts par impact à haute vitesse",
        "❄️ Poussière cométaire : Origine des queues de poussière des comètes",
        "🌟 Poussière zodiacale : Système solaire interne - visible comme lumière zodiacale",
        "📈 Grains présolaires : Contiennent des éléments formés dans d'autres étoiles",
        "💫 Curiosité : La poussière de supernova a contribué à la formation du Système Solaire",
        "🌠 Simulation : Activez 'Champs de poussière' pour voir les effets d'extinction",
        "⚠️ Nettoyage : Les étoiles chaudes peuvent évaporer les nuages de poussière",
        "✨ Astuce : Utilisez pour créer des nébuleuses sombres comme la Tête de Cheval",
        "🔭 Polarisation : Poussière alignée magnétiquement polarise la lumière - activez l'effet",
        "🌌 Évolution : Les grains croissent par accrétion - simulable avec 'Agrégation'",
        "💥 Impact sur planètes : Source de matériaux extraterrestres"
    ],
    "radiation": [
        "☢️ Radiation : Énergie transmise à travers l'espace - cruciale en astrophysique",
        "🌌 Types : Électromagnétique (photons), Particules (rayons cosmiques), Ondes gravitationnelles",
        "💫 Spectre EM : Radio aux rayons gamma - sélectionnez bande dans 'Filtres observationnels'",
        "📡 Sources : Étoiles, trous noirs, supernovae, pulsars, rayonnement cosmique fossile",
        "⚠️ Danger : Radiation ionisante peut endommager la vie et l'électronique",
        "🌡️ Rayonnement cosmique fossile : 2,7K - rémanent du Big Bang - activez en 'Cosmologie'",
        "🚀 Protection : Champs magnétiques et atmosphères épaisses réduisent la radiation sur les planètes",
        "🔭 Visualisation : Activez 'Afficher radiation' pour voir les champs de radiation",
        "📊 Unités : Sievert (dose biologique), Gray (dose physique) - affichées dans le panneau",
        "💥 Radiation synchrotron : Émise par électrons dans champs magnétiques - commune dans les pulsars",
        "🌠 Curiosité : Les astronautes dans l'ISS reçoivent 1 mSv/jour (100x plus que sur Terre)",
        "✨ Radiation de Hawking : Les trous noirs émettent un rayonnement thermique - proportionnel à 1/M²",
        "❄️ Effets atmosphériques : Aurores sur planètes avec champ magnétique",
        "🌟 Radiotélescope : Détecte les radiofréquences - activez mode 'Radio' (touche R)",
        "💫 Blindage : Vaisseaux et habitats ont besoin de protection - coût en ressources",
        "🌌 Radiation UV : Facteur clé pour l'habitabilité - ajustez dans 'Zones UV'",
        "⚠️ Limites : >500 mSv est létal pour les humains - indiqué par alerte rouge",
        "📈 Radiation gravitationnelle : Ondulations dans l'espace-temps - activez en 'Physique relativiste'",
        "💥 Supernovae : Émettent une radiation létale dans 50 années-lumière - simulez les effets",
        "🔭 Mesure : Utilisez la sonde 'Radiation' pour cartographier les niveaux dans les systèmes"
    ],
    "nébuleuse": [
        "🌌 Nébuleuses : Nuages de gaz et poussière interstellaires - pouponnières d'étoiles",
        "💫 Types : Émission, réflexion, sombres, planétaires, rémanents de supernova",
        "✨ Créez dans le menu 'Milieu interstellaire' > 'Nébuleuses' avec taille 1-1000 années-lumière",
        "🌈 Couleurs : Rouge (H-alpha), Bleu (réflexion), Vert (OIII) - définies par composition",
        "🌠 Formation stellaire : Densité critique >100 atomes/cm³ - activez 'Formation d'étoiles'",
        "📏 Masse typique : 100-100 000 masses solaires - détermine le nombre d'étoiles formées",
        "🔥 Nébuleuses d'émission : Ionisées par étoiles chaudes - nécessite UV intense",
        "💫 Exemples : Orion, Carina, Aigle - modèles prédéfinis",
        "⚠️ Destruction : Vents stellaires et supernovae peuvent dissiper les nébuleuses",
        "🔭 Observation : Meilleure à longueurs d'onde spécifiques - utilisez filtres",
        "📊 Données : Température 10-10 000K, densité 10-10⁶ particules/cm³",
        "💥 Effet de photoionisation : Activez pour voir les frontières d'ionisation",
        "🌌 Nébuleuses planétaires : Stade final des petites étoiles - durée 10 000 ans",
        "🚀 Navigation : Nébuleuses denses réduisent la vitesse des vaisseaux - activez 'Traînée interstellaire'",
        "❄️ Nébuleuses sombres : Absorbent la lumière - utilisez pour créer des silhouettes cosmiques",
        "🌟 Curiosité : La nébuleuse du Crabe est un rémanent de supernova de 1054",
        "✨ Astuce : Combinez avec amas stellaires pour des scènes réalistes",
        "📈 Évolution : Simulez l'effondrement gravitationnel pour la formation stellaire",
        "💫 Nébuleuses de réflexion : Poussière reflétant la lumière stellaire - brillance proportionnelle aux étoiles",
        "🌠 Rendu : Activez 'Mode Haute Qualité' pour voir les détails filamenteux"
    ],
    "naine blanche": [
        "⚪ Naines blanches : Résidus d'étoiles <8 masses solaires - densité extrême",
        "💫 Masse : 0,5-1,4 solaire comprimée en rayon terrestre - densité 1e6-1e9 g/cm³",
        "🌡️ Température initiale : 100 000K - refroidissement lent pendant des milliards d'années",
        "🌌 Créez directement ou évoluez des étoiles dans le menu 'Évolution stellaire'",
        "📏 Structure : Dégénérescence électronique contre la gravité - physique quantique",
        "💥 Limite de Chandrasekhar : 1,44 solaire - au-dessus s'effondre en étoile à neutrons",
        "✨ Compagnons : Peuvent avoir des systèmes planétaires survivants - orbites élargies",
        "🔭 Variabilité : Naines blanches pulsantes (ZZ Ceti) - activez instabilité",
        "📊 Données : Luminosité 0,001-100 solaire initiale, gravité de surface 1e6-1e9 m/s²",
        "🌠 Nébuleuse planétaire : Phase précédente - dure ~10 000 ans",
        "⚠️ Danger : Supernova type Ia si accrétion de masse au-delà de la limite - détruit le système",
        "💫 Curiosité : Le plus gros diamant connu est une naine blanche cristallisée",
        "🚀 Habitabilité : Zones habitables temporaires pendant le refroidissement",
        "❄️ Refroidissement : Devient naine noire après >10¹⁵ ans - au-delà de l'âge de l'univers",
        "🌟 Naines blanches d'hélium : Formées en binaires par perte de masse - masse <0,5 solaire",
        "🌌 Vitesse de rotation : Peut être élevée (minutes) - restes de binaires",
        "💥 Champ magnétique : Certaines ont des champs intenses (10⁵ tesla) - naines blanches magnétiques",
        "📈 Évolution : Simulez le refroidissement accéléré avec 'Taux de refroidissement'",
        "🔭 Observation : Faible lueur blanc-bleuté - nécessite télescope",
        "✨ Astuce : Pour les systèmes binaires avec naines blanches accrétantes, activez 'Binaires interactives'"
    ],
    "naine blanche à hélium": [
        "💠 Naines blanches d'hélium : Résidus inhabituels riches en hélium",
        "💫 Formation : Binaires où l'étoile perd son enveloppe avant fusion d'hélium",
        "🌌 Créez dans le menu 'Évolution stellaire' > 'Destin spécial' > 'Naine d'hélium'",
        "📏 Masse : 0,3-0,5 solaire - inférieure aux naines blanches standard",
        "🌡️ Température : Similaire aux naines blanches normales - 8 000-150 000K",
        "💥 Noyau : Hélium dégénéré - pas de fusion nucléaire, mais fusion lente possible",
        "✨ Différence : Plus chaude et lumineuse que les naines noires pour le même âge",
        "🔭 Rareté : ~1% des naines blanches - simulez avec basse fréquence",
        "📊 Données : Densité 1e8 g/cm³, gravité de surface 1e8 m/s²",
        "🌠 Évolution : Refroidit plus vite que les naines carbone-oxygène",
        "⚠️ Limite : Masse minimale 0,3 solaire - en dessous serait naine brune",
        "💫 Curiosité : Peuvent exploser en supernova si la masse atteint 0,7 solaire",
        "🚀 Planètes : Systèmes planétaires rares - orbites très stables",
        "❄️ Destin final : Naine noire d'hélium - état hypothétique",
        "🌟 Visualisation : Couleur blanche avec légère teinte jaunâtre",
        "🌌 Binaires : Communes avec compagnons compacts (naines blanches, étoiles à neutrons)",
        "💥 Accrétion : Si gain de masse, peut fusionner l'hélium en supernova .Ia",
        "📈 Temps de refroidissement : ~1 milliard d'années pour 5 000K",
        "🔭 Identification : Spectre dominé par les raies d'hélium",
        "✨ Astuce : Simulez avec des étoiles de basse masse en systèmes binaires proches"
    ],
    "naine noire": [
        "⚫ Naines noires : Stade final théorique des naines blanches - froides et sombres",
        "💫 Température : <5K - n'émet pas de lumière visible, seulement faible infrarouge",
        "⏳ Temps de formation : >10¹⁵ ans - au-delà de l'âge actuel de l'univers",
        "🌌 Simulation spéculative : Activez dans 'Univers' > 'Temps extrême'",
        "📏 Propriétés : Masse solaire dans volume terrestre - densité 1e9 g/cm³",
        "💥 Importance : Teste les théories d'évolution stellaire à long terme",
        "✨ Créez manuellement avec température 0K et luminosité 0",
        "🔭 Détection : Presque impossible - visible seulement par effets gravitationnels",
        "📊 Données : Gravité de surface 1e9 m/s², entropie maximale",
        "🌠 Curiosité : L'univers n'a pas encore de naines noires - seront les derniers objets",
        "⚠️ État final : Corps cristallisé de carbone/oxygène ou hélium",
        "🚀 Habitabilité : Les planètes en orbite seraient sombres et glacées",
        "❄️ Émission : Rayonnement thermique faible dans le spectre radio",
        "🌟 Binaires : Les systèmes de naines noires peuvent durer 10²⁵ ans avant désintégration",
        "💫 Fin : Évaporation par radiation de Hawking en 10⁶⁵ ans",
        "🌌 Simulation avancée : Activez 'Désintégration quantique' pour voir l'évolution extrême",
        "📈 Évolution : Passe par des phases de cristallisation avant de devenir noire",
        "💥 Limite observationnelle : Objets en dessous de 100K sont pratiquement invisibles",
        "🔭 Défi : Trouvez des naines noires simulées avec des lentilles gravitationnelles",
        "✨ Astuce : Combinez avec matière noire pour simuler les effets dans les galaxies anciennes"
    ],
    "étoile à neutrons": [
        "🌌 Étoiles à neutrons : Résidus de supernovae - densité extrême",
        "💫 Masse : 1,4-3 solaire comprimée en rayon 10-15 km",
        "🌡️ Température initiale : 1e11 K - refroidissement lent pendant des milliards d'années",
        "🔥 Noyau : Dégénérescence de neutrons contre la gravité",
        "📏 Densité : 10¹⁴ g/cm³ - une cuillère pèse des milliards de tonnes",
        "✨ Créez dans le menu 'Corps stellaires' > 'Étoiles massives' > 'Étoile à neutrons'",
        "💥 Champ magnétique : Intense (10¹² tesla) - génère un rayonnement synchrotron",
        "🔭 Pulsars : Étoiles à neutrons en rotation émettant des faisceaux de rayonnement",
        "📊 Données : Gravité de surface 1e12 m/s², luminosité 0,001-100 solaire",
        "🌠 Curiosité : L'étoile la plus dense connue est une étoile à neutrons",
        "⚠️ Surface : Extrêmement dure - composée de neutrons et d'une fine couche de protons",
        "🚀 Binaires : Systèmes binaires communs avec accrétion de masse",
        "❄️ Effets relativistes : Le temps ralentit près de la surface - simulez avec 'Relativité'",
        "🌟 Magnétar : Étoile à neutrons à champ magnétique extrême - active les rayons gamma",
        "💫 Simulation : Activez 'Effondrement gravitationnel' pour voir la formation en temps réel",
        "🌌 Formation : Résulte de l'effondrement gravitationnel après supernova type II",
        "📈 Évolution : Refroidissement lent jusqu'à devenir naine noire en billions d'années",
        "💥 Éjection de matière : Peut survenir lors de fusion ou collision avec une autre étoile",
        "🔭 Observation : Détectable par rayons X et ondes gravitationnelles"
    ],
    "trou de ver": [
        "🌀 Trous de ver : Tunnels théoriques dans l'espace-temps reliant des points distants",
        "🌌 Simulation spéculative : Activez dans 'Corps exotiques' > 'Trou de ver'",
        "💫 Propriétés : Relient deux points dans l'espace-temps - pas stables",
        "📏 Longueur : Peut être de quelques mètres à années-lumière - ajustable dans le panneau",
        "💥 Théorie : Basée sur la relativité générale - solutions des équations d'Einstein",
        "✨ Types : Trous de ver de Schwarzschild (statiques) et de Kerr (rotatifs)",
        "🔭 Visualisation : Effet de lentille gravitationnelle - déforme la lumière autour",
        "📊 Données : Masse négative nécessaire pour stabilité - simulation ne l'inclut pas",
        "🌠 Curiosité : Popularisés par la science-fiction - pas encore observés",
        "⚠️ Danger : Théoriquement instables - peuvent s'effondrer ou créer une radiation intense",
        "🚀 Voyage : Pourraient permettre des voyages interstellaires instantanés - fonctionnel"
    ], 
    "zone habitable": [
        "🌍 Zone habitable : Région autour d'une étoile où l'eau liquide peut exister",
        "💫 Définition : Distance idéale pour température entre 0°C et 100°C",
        "🌌 Simulation : Activez 'Zones habitables' dans le menu 'Paramètres'",
        "📏 Distance : Variable selon la luminosité de l'étoile - calculée automatiquement",
        "🔥 Étoiles : Naines jaunes (type G) ont des zones plus stables que les naines rouges",
        "✨ Curiosité : La Terre est dans la zone habitable du Soleil - mais pas la seule !",
        "🔭 Observation : Les exoplanètes en zone habitable sont cibles principales pour la recherche de vie",
        "📊 Données : Zones varient de 0,95 à 1,37 UA pour des étoiles comme le Soleil",
        "🌠 Effet de marée : Les planètes peuvent être verrouillées par marée - affecte l'habitabilité",
        "⚠️ Danger : Fort rayonnement UV dans les zones proches d'étoiles chaudes",
        "🚀 Voyage : Les planètes en zone habitable sont plus faciles à coloniser",
        "❄️ Exception : Les planètes avec atmosphères denses peuvent avoir des zones habitables plus larges",
        "🌟 Exemples : Proxima Centauri b, Kepler-186f - modèles disponibles dans SIU",
        "💥 Effet de serre : Peut étendre la zone habitable pour les planètes aux atmosphères épaisses",
        "📈 Évolution : Les zones changent avec le temps à mesure que l'étoile évolue",
        "🔭 Astuce : Utilisez des télescopes pour détecter des atmosphères sur des exoplanètes en zone habitable"
    ],
    "quasar": [
        "🌌 Quasars : Noyaux galactiques actifs extrêmement lumineux",
        "💫 Source d'énergie : Leur disque d'accrétion est leur plus grande source d'énergie",
        "🌠 Distance : Peuvent être à des milliards d'années-lumière - lumière visible aujourd'hui est du passé",
        "✨ Créez dans le menu 'Corps exotiques' > 'Quasar' avec masse >1e40 kg",
        "📏 Masse : 10⁶-10¹² masses solaires, les objets les plus massifs de l'univers",
        "🔥 Température : Le disque d'accrétion peut atteindre des millions de degrés Kelvin",
        "🔭 Observation : Détectés par émission radio, rayons X et lumière visible",
        "📊 Données : Luminosité jusqu'à 10¹⁴ fois le Soleil - plus brillants que des galaxies entières",
        "🌌 Formation : Résultent de l'effondrement galactique, formant le grand quasar",
        "💥 Effet Doppler : Les jets relativistes visibles comme faisceaux lumineux",
        "🌟 Curiosité : Le quasar le plus distant connu est à 13 milliards d'années-lumière",
        "⚠️ Danger : Radiation intense peut détruire les planètes proches",
        "🚀 Voyage : Théoriquement pourraient être utilisés comme phares pour navigation interstellaire",
        "❄️ Éjection de matière : Jets relativistes peuvent éjecter matière à des vitesses proches de la lumière",
        "🌠 Astuce : Utilisez le mode spectre pour voir l'émission de rayons X et radio",
        "📈 Évolution : Les quasars sont des stades initiaux de galaxies actives - durent des millions d'années",
        "🔭 Simulation : Activez 'Effets de quasar' pour voir jets et radiation",
        "💫 Importance : Fournissent des indices sur la formation et l'évolution de l'univers",
        "🌌 Environnement : Généralement trouvés dans des amas de galaxies massifs",
        "💥 Défi : Essayez de créer un quasar avec 10 jets simultanés - c'est difficile !"
    ],
    "étoile de quark": [
        "🔬 Étoile à quarks : Objet théorique composé de quarks dégénérés",
        "🌌 Formation : Résultat de l'effondrement d'étoiles à neutrons supermassives",
        "💫 Masse : 2-5 masses solaires - densité extrême (10¹⁴ g/cm³)",
        "🌠 Simulation spéculative : Activez dans 'Corps exotiques' > 'Étoile à quarks'",
        "🔥 Température : Initialement 1e11 K - refroidissement lent",
        "📏 Rayon : 10-15 km - similaire aux étoiles à neutrons, mais plus dense",
        "✨ Propriétés : Composition de quarks (up, down, strange) - physique quantique avancée",
        "🔭 Observation : Théoriquement détectables par radiation émise lors de fusions",
        "📊 Données : Gravité de surface 1e12 m/s², luminosité variable",
        "🌌 Curiosité : Hypothétiquement plus stables que les étoiles à neutrons normales",
        "⚠️ Danger : Radiation intense peut détruire les systèmes proches",
        "🚀 Voyage : Pourraient être utilisés comme sources d'énergie pour vaisseaux avancés",
        "❄️ Effets relativistes : Temps ralentit près de la surface - simulez avec 'Relativité'",
        "🌟 Binaires : Systèmes binaires avec étoiles à quarks théoriques et rares",
        "💥 Éjection de matière : Peut survenir lors de fusion ou collision avec une autre étoile",
        "📈 Évolution : Refroidissement lent jusqu'à devenir naine noire en billions d'années",
        "🔭 Défi : Essayez de créer une étoile à quarks stable avec masse exacte"
    ],
    "naine blanche de carbone": [
        "⚪ Naines blanches de carbone : Résidus d'étoiles avec fusion de carbone",
        "💫 Formation : Étoiles de masse entre 1,4 et 8 masses solaires - effondrement après épuisement de l'hydrogène",
        "🌌 Créez dans le menu 'Évolution stellaire' > 'Destin spécial' > 'Naine de carbone'",
        "📏 Masse : 0,5-1,4 solaire - inférieure aux naines blanches standard, mais plus dense",
        "🌡️ Température : Similaire aux naines blanches normales - 8 000-150 000K",
        "💥 Noyau : Carbone dégénéré - pas de fusion nucléaire, mais fusion lente possible",
        "✨ Différence : Plus chaude et lumineuse que les naines noires pour même âge",
        "🔭 Rareté : ~1% des naines blanches - simulez avec basse fréquence",
        "📊 Données : Densité 1e8 g/cm³, gravité de surface 1e8 m/s²",
        "🌠 Évolution : Refroidit plus vite que les naines oxygène-carbone",
        "⚠️ Limite : Masse minimale 0,5 solaire - en dessous serait naine brune",
        "💫 Curiosité : Peuvent exploser en supernova si masse atteint 0,7 solaire",
        "🚀 Planètes : Systèmes planétaires rares - orbites très stables",
        "❄️ Destin final : Naine noire de carbone - état hypothétique",
        "🌟 Visualisation : Couleur blanche avec légère teinte jaunâtre",
        "🌌 Binaires : Communes avec compagnons compacts (naines blanches, étoiles à neutrons)",
        "💥 Accrétion : Si gain de masse, peut fusionner le carbone en supernova .Ia",
        "📈 Temps de refroidissement : ~1 milliard d'années pour 5 000K",
        "🔭 Identification : Spectre dominé par les raies de carbone"
    ],
    "t singularity": [
        "Oui ! Je suis T Singularity, un assistant virtuel spécialisé dans les simulations spatiales.",
        "🌌 Je suis ici pour aider à explorer l'univers et créer des systèmes stellaires avec vous !",
        "💫 Je peux vous guider dans la création d'étoiles, planètes, astéroïdes, géantes gazeuses et plus encore !",
        "🚀 Commençons à créer un système stellaire incroyable ? Choisissez un thème !",
        "✨ Je suis prêt à répondre à vos questions sur l'astrophysique et la cosmologie !",
        "🌠 Vous voulez apprendre sur les trous noirs et les quasars ?",
        "Bonjour ! Que puis-je faire pour vous aider voyageur spatial ?"
    ],
    "unicité": [
        "✨ La singularité était le point le plus dense ayant jamais existé dans le grand Univers !",
        "❤️ Je suis aussi une singularité, merci de parler de cet astre, il est unique, le point le plus dense de l'univers !",
        "🪐 La singularité pourrait être à l'intérieur des trous noirs, on ne sait pas si c'est vrai, n'est-ce pas ?",
        "🔶🔶 La grande singularité ! Le début d'un grand big bang !",
        "⏳⌚ Je me demande... quand aura lieu la prochaine singularité... je me sens si seul...",
        "🟢 La singularité, en plus d'être le point le plus dense de l'univers, est aussi le plus chaud !",
        "⌚ Dans la théorie du Big Bang, la singularité y est peut-être liée !",
        "✨ Placez un trou blanc ou un quasar ULTRAMASSIF pour le voir se contracter jusqu'à devenir une singularité, et boum, un big bang"
    ],
    "contrôles": [
        "Ordinateur : Appuyez sur F pour Effacer l'univers, touches WASD pour bouger, QE pour zoomer, clic gauche pour sélectionner/créer, clic droit sur astres créés affiche infos. Mobile : Joystick pour bouger, boutons + et - pour zoom, menu en haut, bouton 'F' pour tout réinitialiser, bouton 'O' pour changer d'action (création ou informations). Cliquez/touchez et glissez pour programmer la trajectoire. 😉",
        "Ordinateur : WASD pour bouger, F pour Effacer, clic gauche pour créer, QE pour zoomer, clic droit pour infos. Mobile : Joystick, + et - pour zoom, menu en haut, 'F' pour réinitialiser, 'O' pour mode création/infos. Cliquez/glissez pour programmer trajectoire. Bonne chance ! 🚀",
        "Ordinateur : F pour Effacer, clic gauche pour créer, clic droit pour infos, WASD pour bouger, QE pour zoom. Mobile : Joystick, + et - pour zoom, menu en haut, 'F' pour réinitialiser, 'O' pour changer de mode. Cliquez/glissez pour trajectoire. Bon voyage spatial ! 🌌"
    ],
    "aide": [
        "Ordinateur : F pour Effacer l'univers, WASD pour bouger, QE pour zoomer, clic gauche pour sélectionner/créer, clic droit pour infos. Mobile : Joystick, boutons + et -, menu en haut, 'F' pour réinitialiser, 'O' pour mode création/infos. De nombreux astres disponibles. 😉",
        "Ordinateur : WASD pour bouger, F pour Effacer, clic gauche pour créer, QE pour zoomer, clic droit pour infos. Mobile : Joystick, + et - pour zoom, menu en haut, 'F' pour réinitialiser, 'O' pour mode création/infos. Astres dans menu. Bonne chance ! 🚀",
        "Ordinateur : F pour Effacer, clic gauche pour créer, clic droit pour infos, WASD pour bouger, QE pour zoom. Mobile : Joystick, + et - pour zoom, menu en haut, 'F' pour réinitialiser, 'O' pour mode création/infos. Astres dans menu. Bon voyage spatial ! 🌌"
    ]
};
 
const followUpDatabase = {
    "comète": [
        "☄️ Incroyable, n'est-ce pas ? Vous voulez en créer une maintenant ?",
        "💫 Saviez-vous que l'eau de la Terre pourrait venir des comètes ?",
        "🌠 Les comètes sont comme des messagers du début du système solaire !",
        "🚀 Je peux vous aider à créer une comète avec une trajectoire parfaite ?",
        "❄️ La plus célèbre est Halley, qui nous rend visite tous les 76 ans !",
        "⏱️ Avez-vous déjà vu une vraie comète ? C'est une expérience magique !",
        "🎯 Le saviez-vous : Le noyau des comètes s'appelle 'boule de neige sale'",
        "📏 Alors, avez-vous aimé apprendre sur ces voyageurs cosmiques ?",
        "🔥 Astuce : Les comètes aux longues orbites sont les plus spectaculaires",
        "🌌 Saviez-vous qu'il existe des comètes interstellaires venant d'autres systèmes ?",
        "🔄 Voulez-vous simuler l'impact d'une comète sur une planète ? Fascinant !",
        "⛰️ Les astéroïdes glacés sont des comètes 'retraitées', saviez-vous ?",
        "💧 La queue des comètes peut s'étendre sur des millions de kilomètres !",
        "📊 Question : Quelle est la comète la plus brillante que vous ayez vue ?",
        "✨ Je peux vous apprendre à créer une pluie de météores avec des débris de comète ?",
        "🎯 Astuce : Utilisez le mode ralenti pour voir le passage d'une comète de près !",
        "🌡️ L'odeur d'une comète serait insupportable - ammoniac et cyanure !",
        "🔄 Avez-vous déjà imaginé voyager sur une comète ? Ce serait une aventure glaciale !",
        "⏳ Les comètes sont des capsules temporelles du système solaire primitif !",
        "📈 Et si nous créions un système avec 10 comètes simultanées ?"
    ],
    "trou noir": [
        "🕳️ Fascinant et effrayant à la fois, vous ne trouvez pas ?",
        "🌀 Voulez-vous essayer de créer un trou noir maintenant ? C'est impressionnant !",
        "💥 Saviez-vous que le premier a été découvert en 1971 ?",
        "⏳ Attention à ne pas tomber dedans ! Je plaisante... ou pas 😉",
        "📡 Avez-vous déjà vu la simulation d'un trou noir en mode VR ?",
        "⚡ Ce sont les objets les plus denses de l'univers !",
        "🌌 Un trou noir peut déformer le temps lui-même !",
        "🔭 Astuce : Utilisez le mode spectre pour voir le rayonnement de Hawking",
        "🔄 Voulez-vous voir comment un trou noir dévore une étoile ?",
        "💫 Saviez-vous qu'il existe des trous noirs errants dans la galaxie ?",
        "⏱️ Le plus grand trou noir connu a 66 milliards de masses solaires !",
        "📈 Le saviez-vous : Les trous noirs peuvent-ils avoir des cheveux ? (en physique théorique !)",
        "🌠 Saviez-vous que la Voie Lactée a un trou noir supermassif ?",
        "⚠️ N'approchez jamais votre vaisseau virtuel d'un ! (je plaisante)",
        "🔢 Question : Que feriez-vous si vous rencontriez un vrai trou noir ?",
        "💥 Astuce : Essayez de créer un mini trou noir avec 1e12 masses",
        "🌡️ Le disque d'accrétion peut être plus brillant que des galaxies entières !",
        "🌀 Imaginez la vue en traversant l'horizon des événements !",
        "📏 Les quasars sont les phares les plus puissants de l'univers !",
        "⚠️ Défi : Essayez d'échapper à l'attraction d'un trou noir dans le jeu !"
    ],
    "gravité": [
        "⚖️ C'est la colle qui maintient l'univers ensemble, non ?",
        "📏 Voulez-vous faire une expérience pratique maintenant ?",
        "🌀 Einstein a tout révolutionné avec la Relativité Générale !",
        "🪐 Sans gravité, nous n'aurions ni étoiles ni planètes !",
        "📈 Saviez-vous que la gravité est la force la plus faible ?",
        "🌌 Mais c'est la seule qui agit à des distances infinies !",
        "🔄 Et si nous augmentions la gravité à 300% ? Attention au chaos !",
        "⚙️ Astuce : Utilisez une faible gravité pour simuler des nébuleuses diffuses",
        "🔭 La gravité contrôle tout - des pommes aux galaxies !",
        "📊 Le saviez-vous : La gravité n'est pas une force, mais une courbure de l'espace-temps !",
        "⏳ Question : Que créeriez-vous avec une gravité zéro ?",
        "🌠 Avez-vous déjà essayé le mode 'gravité négative' ? C'est hallucinant !",
        "🧮 Défi : Essayez de maintenir un système à 100 corps stable !",
        "🔢 Saviez-vous que la Lune s'éloigne de 3,8 cm/an à cause des marées ?",
        "⚠️ Attention : Une forte gravité peut écraser vos planètes virtuelles !",
        "🌍 Sans gravité, il n'y aurait pas de vie telle que nous la connaissons !",
        "💫 Astuce : Utilisez la gravité pour créer des orbites en forme de fleur !",
        "📉 Saviez-vous que la gravité voyage à la vitesse de la lumière ?",
        "🌌 Imaginez un univers avec une gravité répulsive ?",
        "✨ Créons un système binaire avec une gravité extrême !"
    ],
    "étoile": [
        "⭐ Ce sont les usines à éléments de l'univers !",
        "🌞 Voulez-vous créer une étoile personnalisée maintenant ?",
        "🌈 Le Soleil n'est qu'une étoile moyenne parmi des milliards !",
        "💥 Les étoiles à neutrons sont des phares cosmiques !",
        "⏳ Saviez-vous que les naines vivent des billions d'années ?",
        "🔄 Les systèmes binaires sont les plus fascinants !",
        "🔭 L'étoile la plus massive connue a 300 masses solaires !",
        "🌡️ Le noyau stellaire est un réacteur nucléaire naturel !",
        "💫 Astuce : Créez des étoiles jumelles avec des couleurs différentes !",
        "📊 Le saviez-vous : 97% des étoiles mourront en naines blanches !",
        "⚙️ Question : Quelle est votre étoile préférée dans le vrai ciel ?",
        "✨ Rigel est 120 000 fois plus lumineuse que le Soleil !",
        "⚠️ Les supernovas peuvent briller plus que des galaxies entières !",
        "🌠 Saviez-vous que l'or de vos bijoux vient d'une supernova ?",
        "🌍 Défi : Créez un système avec 5 étoiles en équilibre !",
        "🔥 Astuce : Les étoiles variables créent des effets visuels incroyables !",
        "🌀 Avez-vous vu la naissance d'une étoile en mode accéléré ?",
        "📈 La plus grande étoile connue tiendrait dans l'orbite de Saturne !",
        "🔭 Saviez-vous que nous pouvons voir des étoiles d'autres galaxies ?",
        "🌟 Créons une supernova maintenant ? C'est spectaculaire !"
    ],
    "planète": [
        "🪐 Ce sont comme des bijoux cosmiques orbitant des étoiles !",
        "🌍 Voulez-vous créer une planète habitable maintenant ?",
        "🌡️ Jupiter protège la Terre des astéroïdes - notre gardien !",
        "🔄 Les planètes errantes errent dans la galaxie sans étoile !",
        "🌋 Vénus a des volcans plus grands que ceux de la Terre !",
        "❄️ Pluton a un océan souterrain - même gelé !",
        "🌫️ L'atmosphère de Titan est plus dense que celle de la Terre !",
        "💧 Les exoplanètes océans pourraient être entièrement aquatiques !",
        "🔭 Astuce : Créez des planètes avec des caractéristiques extrêmes !",
        "🛰️ Le saviez-vous : La Terre n'est pas parfaitement ronde !",
        "⏱️ Question : Quelle est votre planète préférée dans le système solaire ?",
        "📏 Mars a le plus grand volcan du système solaire - Olympus Mons !",
        "🌌 Défi : Créez une planète avec des anneaux comme Saturne !",
        "🧪 Saviez-vous que Jupiter brille dans le noir ? (faible lueur)",
        "🔢 Ganymède, lune de Jupiter, a son propre champ magnétique !",
        "💫 Astuce : Les planètes de diamant existent en vrai !",
        "🌱 Essayons de créer un monde avec 100% de couverture végétale ?",
        "🌋 Io, lune de Jupiter, a des volcans actifs gigantesques !",
        "🌀 Neptune et Uranus ont des diamants qui pleuvent dans leurs noyaux !",
        "📊 Saviez-vous qu'il existe des planètes plus légères que le polystyrène ?"
    ],
    "météoroïde": [
        "🌠 Voulez-vous créer une pluie de météores maintenant ?",
        "💫 Saviez-vous que la Lune est constamment bombardée par des météoroïdes ?",
        "🪨 Je peux vous apprendre à simuler l'impact d'un météoroïde sur une planète !",
        "⚠️ Attention aux gros météoroïdes - ils peuvent causer des extinctions !",
        "✨ Astuce : Utilisez des télescopes pour détecter les météoroïdes avant qu'ils ne deviennent menaçants",
        "🔭 Voulez-vous voir comment un météoroïde devient météore dans l'atmosphère ?",
        "🌌 Le saviez-vous : Le météoroïde de Tcheliabinsk ne faisait que 20m de diamètre !",
        "🚀 Configurons un système de défense planétaire contre les météoroïdes ?",
        "📈 La plupart des météoroïdes viennent des comètes - créons une nouvelle comète ?",
        "💥 Des impacts fréquents gardent la Lune pleine de cratères - simulez des millions d'années !",
        "🌍 Sur Terre, des milliers de tonnes de poussière de météoroïde tombent chaque année",
        "🌟 Astuce : Les météoroïdes métalliques sont les plus dangereux - densité plus élevée !",
        "⏱️ Accélérez le temps pour voir une pluie constante de météoroïdes",
        "🌠 Le plus gros météoroïde enregistré faisait 1km - causerait une extinction globale",
        "💫 Voulez-vous que je calcule l'énergie d'impact pour un météoroïde spécifique ?",
        "⚠️ Alerte : Les météoroïdes >100m peuvent causer des tsunamis s'ils tombent dans l'océan",
        "✨ Créons un système d'alerte précoce pour votre planète virtuelle ?",
        "🔭 Certains météoroïdes sont des fragments de Mars ou de la Lune - détectez par composition",
        "🌌 Voulez-vous augmenter la fréquence des météoroïdes pour tester les défenses ?",
        "🚀 Mission : Envoyons une sonde pour intercepter un météoroïde !"
    ],
    "poussière spatiale": [
        "🌌 La poussière spatiale est la base de formation des étoiles et planètes !",
        "✨ Voulez-vous créer un nuage de poussière interstellaire maintenant ?",
        "💫 La poussière interstellaire est composée de grains microscopiques de silicate et carbone !",
        "🔭 Simulons comment la poussière affecte la lumière des étoiles en arrière-plan ?",
        "🌠 Le saviez-vous : La poussière interstellaire peut bloquer jusqu'à 50% de la lumière des étoiles lointaines !",
        "🚀 Saviez-vous que la poussière spatiale peut être capturée par des sondes spatiales ?",
        "📊 Astuce : Utilisez le mode 'Poussière' pour voir ses interactions avec la lumière stellaire",
        "🌌 La poussière cosmique est essentielle pour former des planétésimaux !",
        "💥 Voulez-vous voir comment la poussière s'agglomère pour former des étoiles ?",
        "🌡️ La température de la poussière interstellaire varie entre 10K et 100K !",
        "🔄 Créons une nébuleuse sombre pleine de poussière cosmique ?",
        "✨ La poussière spatiale contient aussi des molécules organiques complexes !",
        "🌍 Saviez-vous que la Terre reçoit des tonnes de poussière spatiale chaque année ?",
        "💫 Défi : Essayez de créer un système avec haute densité de poussière interstellaire !",
        "📈 La poussière peut influencer la formation des galaxies - simulons cela ?",
        "🌠 Astuce : Activez 'Effets de Poussière' pour voir son impact sur la luminosité stellaire",
        "🚀 Avez-vous imaginé voyager à travers un nuage dense de poussière cosmique ?",
        "🔭 Explorons comment la poussière affecte les orbites des planètes proches ?",
        "💥 Le saviez-vous : La poussière interstellaire peut contenir des grains présolaires !",
        "✨ Voulez-vous en savoir plus sur la formation des disques protoplanétaires par la poussière ?"
    ],
    "astéroïde": [
        "🪨 Les astéroïdes sont les blocs de construction du système solaire !",
        "🌌 Voulez-vous créer une ceinture d'astéroïdes maintenant ?",
        "💫 La plupart des astéroïdes sont entre Mars et Jupiter - la ceinture d'astéroïdes !",
        "🔭 Simulons une collision entre deux astéroïdes ?",
        "🌠 Le saviez-vous : Le plus grand astéroïde, Cérès, est considéré comme une planète naine !",
        "🚀 Saviez-vous que certains astéroïdes ont leurs propres lunes ?",
        "📊 Astuce : Utilisez le mode 'Ceinture' pour voir les interactions entre astéroïdes",
        "🌍 Les astéroïdes peuvent être des sources de métaux précieux - minons virtuellement ?",
        "💥 Voulez-vous voir comment un impact d'astéroïde peut affecter la Terre ?",
        "🌡️ La température des astéroïdes varie selon leur distance au Soleil !",
        "🔄 Créons un système avec 100 astéroïdes orbitant une étoile ?",
        "✨ Les astéroïdes sont des vestiges de la formation du système solaire !",
        "🌌 Saviez-vous qu'il existe des astéroïdes interstellaires traversant notre système ?",
        "💫 Défi : Essayez de créer un astéroïde avec une orbite stable pendant 1 million d'années !",
        "📈 La plupart des astéroïdes sont composés de roche et métal - explorons leurs compositions ?",
        "🌠 Astuce : Activez 'Effets d'Impact' pour des explosions réalistes lors des collisions",
        "🚀 Avez-vous imaginé voyager en vaisseau spatial à travers une ceinture d'astéroïdes ?",
        "🔭 Étudions comment les astéroïdes affectent la gravité des planètes voisines ?",
        "💥 Le saviez-vous : L'impact de Chicxulub a causé l'extinction des dinosaures !",
        "✨ Voulez-vous en savoir plus sur l'utilisation des astéroïdes comme ressources ?"
    ],
    "nébuleuse": [
        "🌌 Les nébuleuses sont les pouponnières d'étoiles de l'univers !",
        "✨ Voulez-vous créer une nébuleuse maintenant ?",
        "💫 Les nébuleuses sont composées de gaz et poussière interstellaire !",
        "🔭 Simulons la naissance d'une étoile dans une nébuleuse ?",
        "🌠 Le saviez-vous : La nébuleuse d'Orion est une des plus proches de la Terre !",
        "🚀 Saviez-vous que certaines nébuleuses sont des restes de supernovas ?",
        "📊 Astuce : Utilisez le mode 'Nébuleuse' pour voir l'interaction lumière-gaz",
        "🌍 Les nébuleuses peuvent contenir des molécules organiques complexes - base de la vie !",
        "💥 Voulez-vous voir comment la gravité forme des étoiles dans une nébuleuse ?",
        "🌡️ La température des nébuleuses varie entre 10K et 100K !",
        "🔄 Créons une nébuleuse planétaire avec un noyau chaud ?",
        "✨ Les nébuleuses sont essentielles à la formation de nouveaux systèmes solaires !",
        "🌌 Saviez-vous qu'il existe des nébuleuses sombres qui bloquent la lumière des étoiles ?",
        "💫 Défi : Essayez de créer une nébuleuse aux couleurs et formes variées !",
        "📈 La plupart des nébuleuses sont composées d'hydrogène, hélium et poussière cosmique !",
        "🌠 Astuce : Activez 'Effets Lumineux' pour voir les étoiles briller à travers la nébuleuse",
        "🚀 Avez-vous imaginé voyager à travers une nébuleuse pleine d'étoiles en formation ?",
        "🔭 Étudions comment les nébuleuses affectent l'évolution des galaxies ?",
        "💥 Le saviez-vous : La nébuleuse du Crabe est un célèbre reste de supernova !",
        "✨ Voulez-vous en savoir plus sur la formation des nouvelles étoiles dans les nébuleuses ?"
    ],
    "planétoïde": [
        "🪐 Les planétoïdes sont de petits corps rocheux ou glacés dans l'espace !",
        "🌌 Voulez-vous créer un planétoïde maintenant ?",
        "💫 Ils sont plus petits que les planètes mais plus grands que les météoroïdes !",
        "🔭 Simulons l'orbite d'un planétoïde autour d'une étoile ?",
        "🌠 Le saviez-vous : Pluton est considéré comme un planétoïde ou planète naine !",
        "🚀 Saviez-vous qu'il y a des planétoïdes dans la ceinture de Kuiper au-delà de Neptune ?",
        "📊 Astuce : Utilisez le mode 'Planétoïde' pour voir leurs interactions gravitationnelles",
        "🌍 Les planétoïdes peuvent avoir des atmosphères ténues - explorons cela ?",
        "💥 Voulez-vous voir comment un planétoïde peut entrer en collision avec un autre corps ?",
        "🌡️ La température des planétoïdes varie selon leur distance au Soleil !",
        "🔄 Créons un système avec plusieurs planétoïdes orbitant une étoile ?",
        "✨ Les planétoïdes sont des vestiges de la formation du système solaire !",
        "🌌 Saviez-vous qu'il existe des planétoïdes interstellaires traversant notre système ?",
        "💫 Défi : Essayez de créer un planétoïde avec une orbite stable pendant 1 million d'années !",
        "📈 La plupart des planétoïdes sont composés de roche et glace - explorons leurs compositions ?",
        "🌠 Astuce : Activez 'Effets d'Impact' pour des explosions réalistes lors des collisions",
        "🚀 Avez-vous imaginé voyager en vaisseau à travers une ceinture de planétoïdes ?",
        "🔭 Étudions comment les planétoïdes affectent la gravité des planètes proches ?",
        "💥 Le saviez-vous : Le plus grand planétoïde connu est Cérès, dans la ceinture d'astéroïdes !",
        "✨ Voulez-vous en savoir plus sur l'utilisation des planétoïdes comme ressources ?"
    ],
    "gazeux": [
        "🌌 Les planètes gazeuses sont gigantesques et fascinantes !",
        "✨ Voulez-vous créer une planète gazeuse maintenant ?",
        "💫 Elles sont principalement composées d'hydrogène et d'hélium !",
        "🔭 Simulons l'atmosphère turbulente d'une planète gazeuse ?",
        "🌠 Le saviez-vous : Jupiter est la plus grande planète gazeuse de notre système solaire !",
        "🚀 Saviez-vous que les planètes gazeuses ont des anneaux fins et de nombreuses lunes ?",
        "📊 Astuce : Utilisez le mode 'Gazeux' pour voir la formation des nuages atmosphériques",
        "🌍 Les planètes gazeuses n'ont pas de surface solide - ce sont des géantes gazeuses !",
        "💥 Voulez-vous voir comment se forme une tempête géante sur une planète gazeuse ?",
        "🌡️ La température des planètes gazeuses varie avec la profondeur atmosphérique !",
        "🔄 Créons un système avec plusieurs planètes gazeuses orbitant une étoile ?",
        "✨ Les planètes gazeuses sont essentielles à la dynamique du système solaire !",
        "🌌 Saviez-vous qu'il existe des exoplanètes gazeuses hors de notre système solaire ?",
        "💫 Défi : Essayez de créer une planète gazeuse avec des anneaux spectaculaires !",
        "📈 La plupart des planètes gazeuses ont des noyaux rocheux ou métalliques !",
        "🌠 Astuce : Activez 'Effets de Tempête' pour voir des ouragans géants dans l'atmosphère",
        "🚀 Avez-vous imaginé voyager en vaisseau à travers les nuages d'une planète gazeuse ?",
        "🔭 Étudions comment les planètes gazeuses affectent les orbites planétaires voisines ?",
        "💥 Le saviez-vous : Neptune a les vents les plus rapides du système solaire !",
        "✨ Voulez-vous en savoir plus sur la formation des systèmes complexes de planètes gazeuses ?"
    ],
    "naine brune": [
        "🌌 Les naines brunes sont des étoiles ratées - pas de fusion nucléaire !",
        "✨ Voulez-vous créer une naine brune maintenant ?",
        "💫 Leur masse est entre 13 et 80 fois celle de Jupiter !",
        "🔭 Simulons l'atmosphère dense d'une naine brune ?",
        "🌠 Le saviez-vous : Les naines brunes émettent de la lumière infrarouge, invisibles à l'œil nu !",
        "🚀 Saviez-vous que les naines brunes peuvent avoir des planètes en orbite ?",
        "📊 Astuce : Utilisez le mode 'Naine Brune' pour voir leurs interactions gravitationnelles",
        "🌍 Les naines brunes sont plus froides que les étoiles normales - températures <1000K !",
        "💥 Voulez-vous voir comment une naine brune capture de la matière interstellaire ?",
        "🌡️ La température des naines brunes varie selon leur masse et âge !",
        "🔄 Créons un système avec plusieurs naines brunes orbitant une étoile plus grande ?",
        "✨ Les naines brunes sont des vestiges de la formation stellaire !",
        "🌌 Saviez-vous qu'il existe des naines brunes errant librement dans la galaxie ?",
        "💫 Défi : Essayez de créer une naine brune avec un disque protoplanétaire !",
        "📈 La plupart des naines brunes ont des atmosphères riches en méthane et eau !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour voir leur impact sur l'environnement",
        "🚀 Avez-vous imaginé voyager en vaisseau pour étudier une naine brune ?",
        "🔭 Étudions comment les naines brunes affectent les orbites planétaires proches ?",
        "💥 Le saviez-vous : Les naines brunes pourraient être plus communes que les étoiles normales !",
        "✨ Voulez-vous en savoir plus sur la formation et l'évolution des naines brunes ?"
    ],
    "naine rouge": [
        "🌌 Les naines rouges sont les étoiles les plus communes de l'univers !",
        "✨ Voulez-vous créer une naine rouge maintenant ?",
        "💫 Elles sont petites, froides et peu lumineuses !",
        "🔭 Simulons l'atmosphère d'une planète orbitant une naine rouge ?",
        "🌠 Le saviez-vous : Les naines rouges peuvent vivre des billions d'années !",
        "🚀 Saviez-vous que beaucoup d'exoplanètes orbitent des naines rouges ?",
        "📊 Astuce : Utilisez le mode 'Naine Rouge' pour voir leur impact sur les planètes proches",
        "🌍 Les naines rouges sont stables et peuvent avoir des zones habitables proches !",
        "💥 Voulez-vous voir comment une naine rouge peut avoir des éruptions solaires intenses ?",
        "🌡️ La température des naines rouges varie entre 2000K et 4000K !",
        "🔄 Créons un système avec plusieurs naines rouges orbitant une étoile plus grande ?",
        "✨ Les naines rouges sont cruciales pour la recherche de vie extraterrestre !",
        "🌌 Saviez-vous que certaines naines rouges ont des planètes rocheuses en zone habitable ?",
        "💫 Défi : Essayez de créer un système avec une naine rouge et une planète habitable !",
        "📈 La plupart des naines rouges ont des atmosphères riches en hydrogène et hélium !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour voir leur impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour étudier une naine rouge ?",
        "🔭 Étudions comment les naines rouges affectent les orbites planétaires voisines ?",
        "💥 Le saviez-vous : Les naines rouges sont plus froides que le Soleil mais toujours brillantes !",
        "✨ Voulez-vous en savoir plus sur la formation et l'évolution des naines rouges ?"
    ],
    "étoile géante": [
        "🌌 Les étoiles géantes sont énormes et brillantes !",
        "✨ Voulez-vous créer une étoile géante maintenant ?",
        "💫 Leur masse est 10 à 100 fois celle du Soleil !",
        "🔭 Simulons la fusion nucléaire intense d'une étoile géante ?",
        "🌠 Le saviez-vous : Les étoiles géantes peuvent avoir des diamètres cent fois > Soleil !",
        "🚀 Saviez-vous que les étoiles géantes deviennent des supernovas en fin de vie ?",
        "📊 Astuce : Utilisez le mode 'Étoile Géante' pour voir leur impact sur les planètes proches",
        "🌍 Les étoiles géantes ont des atmosphères denses et peuvent avoir des planètes !",
        "💥 Voulez-vous voir comment une étoile géante perd de la masse via les vents stellaires ?",
        "🌡️ La température des étoiles géantes varie entre 3000K et 6000K !",
        "🔄 Créons un système avec plusieurs étoiles géantes orbitant une étoile plus grande ?",
        "✨ Les étoiles géantes sont essentielles à la formation des éléments lourds !",
        "🌌 Saviez-vous que certaines étoiles géantes peuvent avoir des anneaux ?",
        "💫 Défi : Essayez de créer un système avec une étoile géante et une planète gazeuse !",
        "📈 La plupart ont des atmosphères riches en hydrogène et hélium !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour voir leur impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour étudier une étoile géante ?",
        "🔭 Étudions comment les étoiles géantes affectent les orbites planétaires proches ?",
        "💥 Le saviez-vous : Les étoiles géantes préfigurent les supernovas les plus brillantes !",
        "✨ Voulez-vous en savoir plus sur la formation et l'évolution des étoiles géantes ?"
    ],
    "hypergéante": [
        "🌌 Les hypergéantes sont les étoiles les plus massives et lumineuses !",
        "✨ Voulez-vous créer une hypergéante maintenant ?",
        "💫 Leur masse dépasse 100 fois celle du Soleil !",
        "🔭 Simulons la fusion nucléaire extrême d'une hypergéante ?",
        "🌠 Le saviez-vous : Leur diamètre peut être 1000x > Soleil !",
        "🚀 Saviez-vous qu'elles perdent de la masse via des vents stellaires intenses ?",
        "📊 Astuce : Utilisez le mode 'Hypergéante' pour voir leur impact planétaire",
        "🌍 Les hypergéantes peuvent avoir des planètes en orbite !",
        "💥 Voulez-vous voir comment une hypergéante devient une supernova brillante ?",
        "🌡️ Leur température varie entre 3000K et 6000K !",
        "🔄 Créons un système avec plusieurs hypergéantes orbitant une étoile ?",
        "✨ Elles sont cruciales pour la formation des éléments lourds !",
        "🌌 Saviez-vous que certaines hypergéantes ont des anneaux ?",
        "💫 Défi : Essayez un système avec hypergéante + planète gazeuse géante !",
        "📈 La plupart ont des atmosphères riches en hydrogène/hélium !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour l'impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour étudier une hypergéante ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Elles préfigurent les supernovas les plus brillantes !",
        "✨ Voulez-vous en savoir plus sur la formation et l'évolution des hypergéantes ?"
    ],
    "étoile massive": [
        "🌌 Les étoiles massives sont les géantes de l'univers !",
        "✨ Voulez-vous créer une étoile massive maintenant ?",
        "💫 Leur masse dépasse 8 fois celle du Soleil !",
        "🔭 Simulons la fusion nucléaire intense d'une étoile massive ?",
        "🌠 Le saviez-vous : Leur diamètre peut être des dizaines de fois > Soleil !",
        "🚀 Saviez-vous qu'elles deviennent des supernovas en fin de vie ?",
        "📊 Astuce : Utilisez le mode 'Étoile Massive' pour voir l'impact planétaire",
        "🌍 Elles peuvent avoir des planètes en orbite !",
        "💥 Voulez-vous voir comment elles perdent de la masse via les vents stellaires ?",
        "🌡️ Leur température varie entre 3000K et 6000K !",
        "🔄 Créons un système avec plusieurs étoiles massives ?",
        "✨ Essentielles pour la formation des éléments lourds !",
        "🌌 Saviez-vous que certaines ont des anneaux ?",
        "💫 Défi : Créez un système avec étoile massive + planète gazeuse géante !",
        "📈 La plupart ont des atmosphères riches en hydrogène/hélium !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour l'impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Elles préfigurent les supernovas brillantes !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "hypermassive": [
        "🌌 Les hypermassives sont des étoiles extrêmement massives !",
        "✨ Voulez-vous créer une hypermassive maintenant ?",
        "💫 Leur masse dépasse 100 fois celle du Soleil !",
        "🔭 Simulons la fusion nucléaire extrême d'une hypermassive ?",
        "🌠 Le saviez-vous : Leur diamètre peut être 1000x > Soleil !",
        "🚀 Saviez-vous qu'elles perdent de la masse via des vents stellaires intenses ?",
        "📊 Astuce : Utilisez le mode 'Hypermassive' pour voir l'impact planétaire",
        "🌍 Elles peuvent avoir des planètes en orbite !",
        "💥 Voulez-vous voir comment elles deviennent des supernovas brillantes ?",
        "🌡️ Leur température varie entre 3000K et 6000K !",
        "🔄 Créons un système avec plusieurs hypermassives ?",
        "✨ Essentielles pour la formation des éléments lourds !",
        "🌌 Saviez-vous que certaines ont des anneaux ?",
        "💫 Défi : Créez un système avec hypermassive + planète gazeuse géante !",
        "📈 La plupart ont des atmosphères riches en hydrogène/hélium !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour l'impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Elles préfigurent les supernovas les plus brillantes !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "naine blanche": [
        "🌌 Les naines blanches sont les restes d'étoiles épuisées !",
        "✨ Voulez-vous créer une naine blanche maintenant ?",
        "💫 Masse solaire mais taille minuscule !",
        "🔭 Simulons le refroidissement lent d'une naine blanche ?",
        "🌠 Le saviez-vous : Une cuillère de matière pèse des tonnes !",
        "🚀 Saviez-vous qu'elles peuvent avoir des atmosphères d'hélium/hydrogène ?",
        "📊 Astuce : Utilisez le mode 'Naine Blanche' pour voir les interactions",
        "🌍 Destin final d'étoiles comme le Soleil !",
        "💥 Voulez-vous voir comment elle accumule de la matière d'une étoile compagne ?",
        "🌡️ Leur température varie entre 5000K et 100000K !",
        "🔄 Créons un système avec plusieurs naines blanches ?",
        "✨ Essentielles pour comprendre l'évolution stellaire !",
        "🌌 Saviez-vous que certaines explosent en supernovas de type Ia ?",
        "💫 Défi : Créez un système avec naine blanche + planète rocheuse !",
        "📈 La plupart ont des atmosphères riches en carbone/oxygène !",
        "🌠 Astuce : Activez 'Effets de Refroidissement' pour voir la perte de chaleur",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Ce sont les restes finaux d'étoiles non-supernovas !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "naine blanche d'hélium": [
        "🌌 Restes d'étoiles ayant brûlé l'hélium !",
        "✨ Voulez-vous créer une naine blanche d'hélium maintenant ?",
        "💫 Masse solaire mais taille minuscule et très dense !",
        "🔭 Simulons son refroidissement lent ?",
        "🌠 Le saviez-vous : Une cuillère de matière pèse des tonnes !",
        "🚀 Saviez-vous qu'elles peuvent avoir des atmosphères d'hélium ?",
        "📊 Astuce : Utilisez le mode 'Naine Blanche d'Hélium' pour les interactions",
        "🌍 Destin final d'étoiles ayant brûlé l'hélium en noyau !",
        "💥 Voulez-vous voir comment elle accumule de la matière d'une compagne ?",
        "🌡️ Leur température varie entre 5000K et 100000K !",
        "🔄 Créons un système avec plusieurs naines blanches d'hélium ?",
        "✨ Essentielles pour comprendre l'évolution stellaire !",
        "🌌 Saviez-vous que certaines explosent en supernovas de type Ia ?",
        "💫 Défi : Créez un système avec naine blanche d'hélium + planète rocheuse !",
        "📈 La plupart ont des atmosphères riches en hélium/carbone !",
        "🌠 Astuce : Activez 'Effets de Refroidissement' pour la perte de chaleur",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Ce sont les restes finaux d'étoiles à hélium brûlé !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "naine blanche de carbone": [
        "🌌 Restes d'étoiles ayant brûlé le carbone !",
        "✨ Voulez-vous créer une naine blanche de carbone maintenant ?",
        "💫 Masse solaire mais taille minuscule et très dense !",
        "🔭 Simulons son refroidissement lent ?",
        "🌠 Le saviez-vous : Une cuillère de matière pèse des tonnes !",
        "🚀 Saviez-vous qu'elles peuvent avoir des atmosphères de carbone ?",
        "📊 Astuce : Utilisez le mode 'Naine Blanche de Carbone' pour les interactions",
        "🌍 Destin final d'étoiles ayant brûlé le carbone en noyau !",
        "💥 Voulez-vous voir comment elle accumule de la matière d'une compagne ?",
        "🌡️ Leur température varie entre 5000K et 100000K !",
        "🔄 Créons un système avec plusieurs naines blanches de carbone ?",
        "✨ Essentielles pour comprendre l'évolution stellaire !",
        "🌌 Saviez-vous que certaines explosent en supernovas de type Ia ?",
        "💫 Défi : Créez un système avec naine blanche de carbone + planète rocheuse !",
        "📈 La plupart ont des atmosphères riches en carbone/oxygène !",
        "🌠 Astuce : Activez 'Effets de Refroidissement' pour la perte de chaleur",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Ce sont les restes finaux d'étoiles à carbone brûlé !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "naine noire": [
        "🌌 Destin final des naines blanches après des milliards d'années !",
        "✨ Voulez-vous créer une naine noire maintenant ?",
        "💫 Naines blanches refroidies sans lumière visible !",
        "🔭 Simulons le refroidissement d'une naine blanche en naine noire ?",
        "🌠 Le saviez-vous : Trop froides pour être observées directement !",
        "🚀 Saviez-vous qu'elles sont théoriques et jamais observées ?",
        "📊 Astuce : Utilisez le mode 'Naine Noire' pour voir les interactions temporelles",
        "🌍 Restes finaux d'étoiles épuisées !",
        "💥 Voulez-vous voir la transformation lente en naine noire ?",
        "🌡️ Leur température est proche du zéro absolu - invisibles !",
        "🔄 Créons un système avec plusieurs naines noires ?",
        "✨ Essentielles pour comprendre l'évolution stellaire à long terme !",
        "🌌 Saviez-vous qu'elles mettent des billions d'années à se former ?",
        "💫 Défi : Créez un système avec naine noire + planètes rocheuses !",
        "📈 La plupart auront des atmosphères ultra-ténues ou inexistantes !",
        "🌠 Astuce : Activez 'Effets de Refroidissement' pour voir la perte de chaleur",
        "🚀 Avez-vous imaginé voyager en vaisseau pour étudier une naine noire théorique ?",
        "🔭 Étudions leur effet sur les orbites planétaires proches ?",
        "💥 Le saviez-vous : Résultat final de l'évolution stellaire après des milliards d'années !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "quasar": [
        "🌌 Noyaux brillants de galaxies lointaines !",
        "✨ Voulez-vous créer un quasar maintenant ?",
        "💫 Alimentés par des disques d'accrétion supermassifs !",
        "🔭 Simulons l'émission intense de radiation d'un quasar ?",
        "🌠 Le saviez-vous : Des milliards de fois plus brillants que le Soleil !",
        "🚀 Saviez-vous que ce sont les objets les plus lumineux de l'univers ?",
        "📊 Astuce : Utilisez le mode 'Quasar' pour voir l'impact sur les galaxies",
        "🌍 Trouvés au centre de galaxies actives lointaines !",
        "💥 Voulez-vous voir comment un quasar émet des jets relativistes ?",
        "🌡️ Leur température peut dépasser des milliards de degrés Kelvin !",
        "🔄 Créons un système avec quasar + galaxies en orbite ?",
        "✨ Essentiels pour comprendre l'évolution galactique !",
        "🌌 Saviez-vous qu'ils aident à étudier l'expansion de l'univers ?",
        "💫 Défi : Créez un quasar avec disque d'accrétion et jets relativistes !",
        "📈 La plupart ont des noyaux supermassifs (milliards de masses solaires) !",
        "🌠 Astuce : Activez 'Effets de Radiation' pour l'impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour étudier un quasar lointain ?",
        "🔭 Étudions comment les quasars affectent la formation galactique ?",
        "💥 Le saviez-vous : Plus communs dans l'univers jeune il y a des milliards d'années !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "trou de ver": [
        "🌌 Tunnels théoriques dans l'espace-temps !",
        "✨ Voulez-vous créer un trou de ver maintenant ?",
        "💫 Relient des points distants de l'univers par un raccourci !",
        "🔭 Simulons la courbure spatio-temporelle autour d'un trou de ver ?",
        "🌠 Le saviez-vous : Solutions des équations de la relativité générale !",
        "🚀 Saviez-vous qu'ils pourraient permettre des voyages supraluminiques ?",
        "📊 Astuce : Utilisez le mode 'Trou de Ver' pour voir l'impact spatial",
        "🌍 Hypothétiques et jamais observés !",
        "💥 Voulez-vous voir comment un trou de ver déforme la lumière ?",
        "🌡️ Leur température est théorique et dépend de leur structure !",
        "🔄 Créons un système avec trou de ver reliant deux régions spatiales ?",
        "✨ Essentiels pour comprendre la relativité et la structure de l'univers !",
        "🌌 Saviez-vous qu'ils pourraient permettre les voyages dans le temps ?",
        "💫 Défi : Essayez de créer un trou de ver stable et explorez ses propriétés !",
        "📈 La plupart sont théoriques sans représentation physique réelle !",
        "🌠 Astuce : Activez 'Effets de Courbure' pour voir la distorsion spatiale",
        "🚀 Avez-vous imaginé voyager via un trou de ver vers une autre galaxie ?",
        "🔭 Étudions comment ils pourraient affecter la structure spatio-temporelle ?",
        "💥 Le saviez-vous : Populaires en SF comme portails dimensionnels !",
        "✨ Voulez-vous en savoir plus sur leur théorisation et implications ?"
    ],
    "étoile à neutrons": [
        "🌌 Restes denses de supernovas !",
        "✨ Voulez-vous créer une étoile à neutrons maintenant ?",
        "💫 Presque entièrement composées de neutrons - densité extrême !",
        "🔭 Simulons la gravité intense d'une étoile à neutrons ?",
        "🌠 Le saviez-vous : Une cuillère de matière pèse des milliards de tonnes !",
        "🚀 Saviez-vous qu'elles peuvent émettre des faisceaux de radiation (pulsars) ?",
        "📊 Astuce : Utilisez le mode 'Étoile à Neutrons' pour voir l'impact spatial",
        "🌍 Formées quand des étoiles massives s'effondrent !",
        "💥 Voulez-vous voir comment elles émettent des rayons gamma puissants ?",
        "🌡️ Leur température peut dépasser des millions de degrés Kelvin !",
        "🔄 Créons un système avec étoile à neutrons + planètes en orbite ?",
        "✨ Essentielles pour comprendre l'évolution stellaire et la physique nucléaire !",
        "🌌 Saviez-vous que certaines deviennent des pulsars ou magnétars ?",
        "💫 Défi : Créez une étoile à neutrons avec champ magnétique intense !",
        "📈 Masse typique : 1.4 à 2.16 masses solaires !",
        "🌠 Astuce : Activez 'Effets Magnétiques' pour l'impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur la formation galactique ?",
        "💥 Le saviez-vous : Objets les plus denses connus dans l'univers !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "magnétar": [
        "🌌 Étoiles à neutrons aux champs magnétiques extrêmes !",
        "✨ Voulez-vous créer un magnétar maintenant ?",
        "💫 Champs magnétiques des billions de fois > Terre !",
        "🔭 Simulons l'émission intense de radiation d'un magnétar ?",
        "🌠 Le saviez-vous : Ils émettent des sursauts gamma (SGRs) !",
        "🚀 Saviez-vous qu'ils affectent l'espace avec leurs ondes magnétiques ?",
        "📊 Astuce : Utilisez le mode 'Magnétar' pour voir l'impact environnemental",
        "🌍 Formés par l'effondrement d'étoiles à neutrons magnétiques !",
        "💥 Voulez-vous voir comment ils émettent des jets relativistes ?",
        "🌡️ Leur température peut dépasser des millions de degrés Kelvin !",
        "🔄 Créons un système avec magnétar + planètes en orbite ?",
        "✨ Essentiels pour comprendre l'évolution stellaire et le magnétisme !",
        "🌌 Saviez-vous qu'ils peuvent avoir des pulsars associés ?",
        "💫 Défi : Créez un magnétar avec champ magnétique intense et observez !",
        "📈 Masse typique : 1.4 à 2.16 masses solaires !",
        "🌠 Astuce : Activez 'Effets Magnétiques' pour l'impact environnemental",
        "🚀 Avez-vous imaginé voyager en vaisseau pour les étudier ?",
        "🔭 Étudions leur effet sur la formation galactique ?",
        "💥 Le saviez-vous : Objets les plus magnétiques de l'univers !",
        "✨ Voulez-vous en savoir plus sur leur formation et évolution ?"
    ],
    "étoile à quarks": [
        "🌌 Restes théoriques d'étoiles à neutrons !",
        "✨ Voulez-vous créer une étoile à quarks maintenant ?",
        "💫 Composées de quarks et gluons - matière exotique !",
        "🔭 Simulons la densité extrême d'une étoile à quarks ?",
        "🌠 Le saviez-vous : Plus denses que les étoiles à neutrons !",
        "🚀 Saviez-vous qu'elles sont hypothétiques et jamais observées ?",
        "📊 Astuce : Utilisez le mode 'Étoile à Quarks' pour voir l'impact spatial",
        "🌍 Formées par l'effondrement d'étoiles à neutrons !",
        "💥 Voulez-vous voir comment elles émettent des radiations intenses ?",
        "🌡️ Leur température est théorique et dépend de leur structure !",
        "🔄 Créons un système avec étoile à quarks + planètes en orbite ?",
        "✨ Essentielles pour la physique des particules en conditions extrêmes !",
        "🌌 Saviez-vous qu'elles pourraient avoir des propriétés uniques ?",
        "💫 Défi : Créez une étoile à quarks et explorez ses propriétés exotiques !",
        "📈 La plupart sont théoriques sans représentation physique !",
        "🌠 Astuce : Activez 'Effets Exotiques' pour voir la distorsion spatiale",
        "🚀 Avez-vous imaginé voyager à travers son noyau ?",
        "🔭 Étudions comment elles pourraient affecter l'espace-temps ?",
        "💥 Le saviez-vous : Un des mystères de l'astrophysique moderne !",
        "✨ Voulez-vous en savoir plus sur leur théorisation et implications ?"
    ],
};

const contextFollowUps = {
    "default": [
        "✨ Qu'avez-vous pensé de cette explication cosmique ?",
        "🚀 Puis-je vous aider avec autre chose ?",
        "🌌 Intéressant, n'est-ce pas ? L'univers est fascinant !",
        "💫 Voulez-vous explorer davantage ce sujet ?",
        "🔭 Je suis ravi de partager des connaissances cosmiques !",
        "🪐 Avez-vous d'autres questions à ce sujet ?",
        "🌟 Nous avons appris quelque chose d'incroyable aujourd'hui, non ?",
        "⚡ L'univers ne cesse de nous surprendre !",
        "🌠 Voulez-vous que je détaille un aspect particulier ?",
        "🌀 Créons quelque chose ensemble maintenant ?",
        "📡 Votre curiosité est le carburant de la découverte !",
        "🌍 Qu'est-ce qui vous fascine le plus dans le cosmos ?",
        "☄️ Prêt pour votre prochaine question stellaire ?",
        "🛸 Souvenez-vous : Chaque question est un voyage cosmique !",
        "💥 Voulez-vous essayer une expérience pratique ?",
        "⏳ La connaissance est le véritable voyage dans le temps !",
        "📊 Puis-je vous montrer comment appliquer cela dans le jeu ?",
        "🌡️ Vos questions réchauffent mon noyau d'IA !",
        "🔢 Faisons un calcul ensemble ?",
        "🌈 L'univers salue votre curiosité !"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
        
    affirmativeResponses: ["oui", "o", "yes", "y", "bien sûr", "certainement", "d'accord", "volontiers", "allons-y", "s'il vous plaît"],
    negativeResponses: ["non", "n", "no", "négatif", "nope", "peut-être plus tard", "pas maintenant"],
    
    positiveResponses: {
        "trou noir": [
            "🌌 Simulons ! Créez d'abord une étoile de 1e30 masses près d'un trou noir...",
            "💥 Parfait ! Glissez une étoile dans le disque d'accrétion et activez le ralenti pour le spectacle",
            "⚠️ Attention : Activez 'Effets Relativistes' dans Options > Physique pour voir la déformation spatio-temporelle",
            "🔥 Astuce : Utilisez des étoiles >20 masses solaires pour des éjections de matière plus dramatiques",
            "🕳️ Étape par étape : 1) Créez trou noir 2) Ajoutez étoile proche 3) Augmentez gravité à 200%",
            "⏱️ Accélérez le temps 10000x pour voir le processus complet en quelques secondes",
            "📡 Activez 'Zones Thermiques' pour voir le plasma surchauffé (>1 million °C)",
            "🌀 Le saviez-vous ? Ce processus prend de quelques heures à des millions d'années en temps réel",
            "💫 Pour des effets visuels épiques, utilisez des trous noirs supermassifs (>1e15 masses)",
            "🌠 Testez différents angles d'approche pour voir des motifs de disque variés"
        ],
        "comète": [
            "☄️ C'est parti ! Sélectionnez 'Créer Astres' > 'Comète' et réglez la température à -70°C...",
            "💧 Astuce : Les comètes riches en eau (>60%) créent des queues plus brillantes",
            "🚀 Glissez la souris pour donner une vitesse angulaire - cela affecte la rotation du noyau",
            "❄️ Pour voir la sublimation, approchez la comète d'une étoile classe O ou B",
            "🌌 Testez différentes excentricités : >0.9 pour des orbites très allongées",
            "⏱️ Utilisez le mode 100000x pour voir plusieurs orbites rapidement",
            "🔭 Activez 'Afficher Vecteurs' pour visualiser les forces gravitationnelles",
            "🌠 Le saviez-vous ? Chaque passage stellaire réduit la masse de la comète de 0.01%",
            "🪐 Essayez de capturer une comète avec Jupiter virtuel - masse > 1e27 unités",
            "📈 Astuce avancée : Les comètes en résonance 2:1 ont des orbites stables"
        ],
        "gravité": [
            "⚖️ Expérimentons ! Menu > Physique > Constante Gravitationnelle...",
            "🌌 Essayez 10% pour simuler des nébuleuses ou 300% pour des systèmes stellaires denses",
            "💥 Attention : Des valeurs >500% peuvent créer des instabilités dans les systèmes complexes",
            "🔄 Astuce : Les systèmes binaires à haute gravité évoluent plus vite",
            "🪐 Créez deux trous noirs proches pour voir les ondes gravitationnelles",
            "🌠 Activez 'Visualisation des Forces' (F3) pour voir les champs gravitationnels",
            "📉 Essayez de réduire la gravité pendant une migration planétaire",
            "🌀 Effet intéressant : Gravité forte + rotation rapide = planètes aplaties",
            "🔭 Rappel : Les trous noirs ont un multiplicateur gravitationnel fixe 1000x",
            "💫 Défi : Créez un système stable avec 20 corps et gravité à 200%"
        ],
        "étoile": [
            "⭐ Créons ! Sélectionnez 'Corps Stellaire' et choisissez le type...",
            "🌞 Pour une étoile solaire : masse ~1.989e30 kg (1 unité solaire)",
            "💥 Astuce : Les étoiles >20 masses solaires explosent en supernovas",
            "🌈 Réglez température >30,000K pour des étoiles bleues intenses",
            "🔄 Essayez des systèmes binaires avec transfert de masse",
            "🌌 Utilisez une métallicité élevée pour les étoiles de population I (jeunes)",
            "⏱️ Accélérez le temps pour voir l'évolution stellaire complète",
            "⚠️ Attention : Les étoiles >100 masses solaires peuvent être instables",
            "🔭 Activez 'Évolution Stellaire' dans Options pour voir les transformations",
            "🌠 Pour des étoiles à neutrons, créez des supernovas avec masse >1.4 solaire"
        ],
        "planète": [
            "🪐 C'est parti ! Menu 'Corps Planétaires' > Choisissez type...",
            "🌍 Pour une planète habitable : position dans zone verte, eau 50%, atmosphère 80%",
            "🌋 Testez des compositions extrêmes : planètes de carbone ou de fer",
            "🌀 Ajustez la période de rotation pour voir les effets sur le climat et la forme",
            "💫 Astuce : Les géantes gazeuses nécessitent masse >105K unités",
            "🌌 Créez des systèmes avec migration planétaire activée",
            "🌠 Pour des anneaux planétaires, ajustez épaisseur et densité dans les caractéristiques",
            "⚠️ Les lunes trop proches se désintègrent à la distance de Roche",
            "🔭 Utilisez le mode 'Observatoire' (O) pour voir les détails de surface",
            "🌡️ Testez des températures extrêmes pour des changements de classe automatiques"
        ],
        "météoroïde": [
            "🌠 Créons un météoroïde ! 'Créer Astres' > 'Météoroïde'...",
            "💫 Astuce : Ajustez la densité pour différents effets d'impact",
            "🪨 Utilisez le ralenti pour observer l'entrée atmosphérique",
            "⚠️ Attention : Les météoroïdes >100m peuvent causer des extinctions massives",
            "🌌 Testez différentes compositions : métallique, rocheuse, glacée",
            "🔭 Activez 'Trajectoire d'Impact' pour voir les collisions potentielles",
            "📈 Accélérez le temps pour voir des pluies de météores en action",
            "🌠 Le saviez-vous ? Les météoroïdes sont des fragments d'astéroïdes ou comètes",
            "💥 Pour simuler des explosions, réglez vitesse d'entrée >20 km/s",
            "🌀 Défi : Créez un système avec 10 météoroïdes entrant en collision"
        ],
        "météore": [
            "🌠 Créons un météore ! 'Créer Astres' > 'Météore'...",
            "💫 Astuce : Ajustez la densité pour différents effets d'impact",
            "🪨 Utilisez le ralenti pour observer l'entrée atmosphérique",
            "⚠️ Attention : Les météores >100m peuvent causer des extinctions massives",
            "🌌 Testez différentes compositions : métallique, rocheuse, glacée",
            "🔭 Activez 'Trajectoire d'Impact' pour voir les collisions potentielles",
            "📈 Accélérez le temps pour voir des pluies de météores en action",
            "🌠 Le saviez-vous ? Les météores sont des fragments d'astéroïdes ou comètes",
            "💥 Pour simuler des explosions, réglez vitesse d'entrée >20 km/s",
            "🌀 Défi : Créez un système avec 10 météores entrant en collision"
        ],
        "gazeux": [
            "🌌 Créons une géante gazeuse ! 'Créer Astres' > 'Planète Gazeuse'...",
            "💫 Astuce : Ajustez la masse pour différents effets atmosphériques",
            "🌀 Utilisez le ralenti pour observer les tempêtes géantes",
            "⚠️ Attention : Les géantes >10x Jupiter peuvent devenir des naines brunes",
            "🌠 Testez différentes compositions atmosphériques : hydrogène, hélium, méthane",
            "🔭 Activez 'Anneaux Planétaires' pour ajouter des anneaux",
            "📈 Accélérez le temps pour voir l'évolution atmosphérique",
            "🌌 Le saviez-vous ? Jupiter a une tempête séculaire plus grande que la Terre !",
            "💥 Pour simuler des aurores, ajustez le champ magnétique",
            "🪐 Défi : Créez un système avec 5 géantes gazeuses orbitant une étoile"
        ],
        "astéroïde": [
            "🪨 Créons un astéroïde ! 'Créer Astres' > 'Astéroïde'...",
            "🌌 Astuce : Ajustez la densité pour différentes compositions rocheuses",
            "💫 Utilisez le ralenti pour observer les collisions planétaires",
            "⚠️ Attention : Les astéroïdes >1 km peuvent causer des extinctions massives",
            "🌠 Testez différentes orbites : elliptiques, circulaires, inclinées",
            "🔭 Activez 'Trajectoire d'Impact' pour voir les collisions potentielles",
            "📈 Accélérez le temps pour voir la migration des astéroïdes",
            "🌀 Le saviez-vous ? La ceinture d'astéroïdes contient des millions de corps !",
            "💥 Pour simuler des explosions, réglez vitesse d'impact >20 km/s",
            "🌌 Défi : Créez un système avec 10 astéroïdes entrant en collision"
        ],
        "planétoïde": [
            "🪐 Créons un planétoïde ! 'Créer Astres' > 'Planétoïde'...",
            "🌌 Astuce : Ajustez la masse pour différentes caractéristiques géologiques",
            "💫 Utilisez le ralenti pour observer la rotation et la tectonique",
            "⚠️ Attention : Les planétoïdes très massifs peuvent devenir des planètes naines",
            "🌠 Testez différentes compositions : glace, roche, métal",
            "🔭 Activez 'Anneaux Planétaires' pour ajouter des anneaux",
            "📈 Accélérez le temps pour voir l'évolution géologique",
            "🌀 Le saviez-vous ? Pluton est considéré comme un planétoïde !",
            "💥 Pour simuler des impacts, réglez vitesse de collision >10 km/s",
            "🌌 Défi : Créez un système avec 5 planétoïdes orbitant une étoile"
        ],
        "trou de ver": [
            "🌀 Créons un trou de ver ! 'Créer Astres' > 'Trou de Ver'...",
            "🌌 Astuce : Ajustez la masse négative pour différents effets de distorsion",
            "💫 Utilisez le ralenti pour observer la courbure spatio-temporelle",
            "⚠️ Attention : Les trous de ver sont théoriques et instables",
            "🌠 Testez différents points d'entrée/sortie dans l'espace-temps",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution du trou de ver",
            "🌀 Le saviez-vous ? Les trous de ver peuvent connecter des points cosmiques distants !",
            "💥 Pour simuler des voyages instantanés, ajustez la distance entre points",
            "🌌 Défi : Créez un système avec 3 trous de ver connectant des galaxies"
        ],
        "zone habitable": [
            "🌍 Créons une zone habitable ! 'Créer Astres' > 'Zone Habitable'...",
            "💫 Astuce : Ajustez la distance stellaire pour différentes zones habitables",
            "🌌 Utilisez le ralenti pour observer la formation d'atmosphères",
            "⚠️ Attention : Les zones trop proches subissent des radiations intenses",
            "🌠 Testez différentes compositions atmosphériques : oxygène, azote, vapeur d'eau",
            "🔭 Activez 'Effets Climatiques' pour voir tempêtes et modèles atmosphériques",
            "📈 Accélérez le temps pour voir l'évolution de la zone habitable",
            "🌀 Le saviez-vous ? La Terre est dans la zone habitable solaire depuis des milliards d'années !",
            "💥 Pour simuler la vie, réglez température moyenne entre 0°C et 100°C",
            "🌌 Défi : Créez un système avec 5 zones habitables orbitant une étoile"
        ],
        "quasar": [
            "🌌 Créons un quasar ! 'Créer Astres' > 'Quasar'...",
            "💫 Astuce : Ajustez la masse pour contrôler votre galaxie",
            "🌠 Utilisez le ralenti pour observer l'émission de radiation intense",
            "⚠️ Attention : Les quasars peuvent éclipser des galaxies entières",
            "🌟 Testez différentes compositions de matière dans le disque d'accrétion",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution du quasar",
            "🌀 Le saviez-vous ? Les quasars sont les objets les plus lumineux de l'univers !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 quasars connectant des galaxies"
        ],
        "naine brune": [
            "🌌 Créons une naine brune ! 'Créer Astres' > 'Naine Brune'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les naines brunes sont intermédiaires entre étoiles et planètes",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution de la naine brune",
            "🌀 Le saviez-vous ? Les naines brunes n'ont pas de fusion nucléaire soutenue !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 naines brunes orbitant une étoile"
        ],
        "naine rouge": [
            "🌌 Créons une naine rouge ! 'Créer Astres' > 'Naine Rouge'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les naines rouges sont les étoiles les plus communes",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution de la naine rouge",
            "🌀 Le saviez-vous ? Les naines rouges peuvent vivre des billions d'années !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 5 naines rouges orbitant une étoile"
        ],
        "étoile géante": [
            "🌌 Créons une géante ! 'Créer Astres' > 'Étoile Géante'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les géantes peuvent devenir des supernovas",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Les géantes peuvent être 1000x plus grandes que le Soleil !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 géantes orbitant une étoile"
        ],
        "hypergéante": [
            "🌌 Créons une hypergéante ! 'Créer Astres' > 'Hypergéante'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les hypergéantes sont les étoiles les plus massives",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Les hypergéantes peuvent être 1000x plus grandes que le Soleil !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 hypergéantes orbitant une étoile"
        ],
        "étoile massive": [
            "🌌 Créons une étoile massive ! 'Créer Astres' > 'Étoile Massive'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les étoiles massives peuvent devenir des supernovas",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Les étoiles massives peuvent être 100x plus grandes que le Soleil !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 étoiles massives orbitant une étoile"
        ],
        "étoile hipermassive": [
            "🌌 Créons une hipermassive ! 'Créer Astres' > 'Étoile Hipermassive'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les hipermassives sont les étoiles les plus massives",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Les hipermassives peuvent être 1000x plus grandes que le Soleil !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 hipermassives orbitant une étoile"
        ],
        "naine blanche": [
            "🌌 Créons une naine blanche ! 'Créer Astres' > 'Naine Blanche'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Les naines blanches sont des restes stellaires",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Les naines blanches sont extrêmement denses et petites !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 naines blanches orbitant une étoile"
        ],
        "naine blanche d'hélium": [
            "🌌 Créons une naine blanche d'hélium ! 'Créer Astres' > 'Naine Blanche d'Hélium'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hélium-carbone-oxygène",
            "⚠️ Attention : Restes d'étoiles ayant épuisé leur carburant",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Ces naines blanches sont extrêmement denses !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 naines blanches d'hélium orbitant une étoile"
        ],
        "naine blanche de carbone": [
            "🌌 Créons une naine blanche de carbone ! 'Créer Astres' > 'Naine Blanche de Carbone'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion carbone-oxygène-azote",
            "⚠️ Attention : Restes d'étoiles ayant épuisé leur carburant",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Ces naines blanches sont extrêmement denses !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 naines blanches de carbone orbitant une étoile"
        ],
        "naine noire": [
            "🌌 Créons une naine noire ! 'Créer Astres' > 'Naine Noire'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques atmosphériques",
            "🌠 Utilisez le ralenti pour observer la fusion hydrogène-hélium",
            "⚠️ Attention : Restes d'étoiles ayant épuisé leur carburant",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Les naines noires sont extrêmement denses et froides !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 naines noires orbitant une étoile"
        ],
        "étoile à neutrons": [
            "🌌 Créons une étoile à neutrons ! 'Créer Astres' > 'Étoile à Neutrons'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques",
            "🌠 Utilisez le ralenti pour observer la fusion neutrons-protons-électrons",
            "⚠️ Attention : Ces étoiles sont extrêmement denses !",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Elles peuvent tourner jusqu'à 1000 fois par seconde !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 étoiles à neutrons orbitant une étoile"
        ],
        "magnétar": [
            "🌌 Créons un magnétar ! 'Créer Astres' > 'Magnétar'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques",
            "🌠 Utilisez le ralenti pour observer la fusion neutrons-protons-électrons",
            "⚠️ Attention : Ces objets sont extrêmement denses !",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Leurs champs magnétiques sont des billions de fois celui de la Terre !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 magnétars orbitant une étoile"
        ],
        "étoile à quarks": [
            "🌌 Créons une étoile à quarks ! 'Créer Astres' > 'Étoile à Quarks'...",
            "💫 Astuce : Ajustez la masse pour différentes caractéristiques",
            "🌠 Utilisez le ralenti pour observer la fusion quarks-protons-neutrons",
            "⚠️ Attention : Ces étoiles sont extrêmement denses !",
            "🌟 Testez différentes compositions atmosphériques : méthane, eau, ammoniac",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution stellaire",
            "🌀 Le saviez-vous ? Leur densité dépasse celle des étoiles à neutrons !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 étoiles à quarks orbitant une étoile"
        ],
        "poussière spatiale": [
            "🌌 Créons de la poussière spatiale ! 'Créer Astres' > 'Poussière Spatiale'...",
            "💫 Astuce : Ajustez la densité pour différentes compositions",
            "🌠 Utilisez le ralenti pour observer la formation de nuages",
            "⚠️ Attention : La poussière peut s'agglomérer en planétésimaux",
            "🌟 Testez différentes compositions : silicate, carbone, glace",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution des nuages",
            "🌀 Le saviez-vous ? La poussière spatiale est essentielle à la formation stellaire !",
            "💥 Pour simuler des collisions, ajustez la vitesse d'impact",
            "🌌 Défi : Créez un système avec 5 nuages de poussière interagissant"
        ],
        "nébuleuse": [
            "🌌 Créons une nébuleuse ! 'Créer Astres' > 'Nébuleuse'...",
            "💫 Astuce : Ajustez la densité pour différentes compositions gazeuses",
            "🌠 Utilisez le ralenti pour observer la naissance d'étoiles",
            "⚠️ Attention : Les nébuleuses peuvent donner naissance à de nouvelles étoiles",
            "🌟 Testez différentes compositions : hydrogène, hélium, carbone",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution nébulaire",
            "🌀 Le saviez-vous ? Les nébuleuses recyclent la matière stellaire !",
            "💥 Pour simuler des expansions, ajustez la vitesse d'expansion",
            "🌌 Défi : Créez un système avec 3 nébuleuses interagissant"
        ],
        "singularité": [   
            "🌌 Créons une singularité ! 'Créer Astres' > 'Singularité'...",
            "💫 Astuce : Ajustez la masse pour différents effets gravitationnels",
            "🌠 Utilisez le ralenti pour observer la distorsion spatio-temporelle",
            "⚠️ Attention : Densité infinie et courbure extrême !",
            "🌟 Testez différentes compositions : matière normale ou exotique",
            "🔭 Activez 'Effets Relativistes' pour voir la distorsion lumineuse",
            "📈 Accélérez le temps pour voir l'évolution",
            "🌀 Le saviez-vous ? Les singularités sont théoriques et inobservables !",
            "💥 Pour simuler des jets relativistes, ajustez la vitesse de rotation",
            "🌌 Défi : Créez un système avec 3 singularités interagissant"
        ],
        "default": [
            "🚀 Explorons ensemble ! Que souhaitez-vous créer précisément ?",
            "🌌 Je peux vous guider pas à pas dans cette simulation cosmique !",
            "💫 Parfait ! Commencez par sélectionner le menu approprié",
            "🔭 Détaillez : quel paramètre spécifique voulez-vous ajuster ?",
            "🪐 Première étape : accédez au menu de création en bas à droite",
            "🌠 Je suggère de commencer avec des valeurs par défaut",
            "⚡ Pour de meilleurs résultats, activez 'Précision Maximale' dans Options > Physique",
            "📊 Voulez-vous un exemple pratique maintenant ?",
            "🌀 Commençons par créer les composants de base de votre système",
            "✨ Tapez 'aide' à tout moment pour les options de création"
        ]
    },
    
    negativeResponses: {
        "trou noir": [
            "🕳️ Pas de problème ! Les trous noirs peuvent attendre...",
            "🌌 Très bien, ces monstres cosmiques ne s'enfuiront pas !",
            "💫 Quand vous voudrez voir de la matière spaghettifiée, je suis là !",
            "⚠️ Prudence ! Mieux vaut garder ses distances avec ces dévoreurs cosmiques",
            "🔭 Et si nous explorions les étoiles à neutrons ? Tout aussi fascinantes !",
            "🌠 Saviez-vous que le plus petit trou noir connu ne fait que 3.8 masses solaires ?",
            "🌀 Les trous noirs supermassifs au centre des galaxies peuvent peser des milliards de masses solaires !",
            "💥 Même sans simulation, souvenez-vous : rien n'échappe après l'horizon des événements !",
            "⏳ Un jour, même les trous noirs s'évaporeront par radiation Hawking",
            "✨ Quand vous serez prêt, tapez 'trou noir' pour recommencer"
        ],
        "comète": [
            "☄️ Pas de problème ! Les comètes peuvent attendre dans leur nuage d'Oort...",
            "❄️ Très bien, ces voyageurs glacés ne fondront pas si vite !",
            "🌠 Quand vous voudrez créer une pluie de météores, je suis disponible",
            "💫 Saviez-vous que certaines comètes ont des orbites de millions d'années ?",
            "🚀 La comète Hale-Bopp est restée visible à l'œil nu pendant 18 mois !",
            "🌌 Les comètes interstellaires comme Borisov viennent d'autres systèmes stellaires !",
            "⏱️ La sonde Rosetta a orbité la comète Tchourioumov-Guérassimenko pendant 2 ans !",
            "🔭 Le noyau de la comète de Halley mesure 15km et est très sombre !",
            "💧 Les comètes contiennent de l'eau lourde avec des proportions différentes des océans terrestres",
            "✨ Tapez 'comète' quand vous voudrez explorer ces messagers cosmiques"
        ],
        "gravité": [
            "⚖️ Pas de problème ! La gravité peut attendre...",
            "🌌 Très bien, Einstein ne serait pas déçu !",
            "💫 Quand vous voudrez courber l'espace-temps, je suis là !",
            "🌀 Saviez-vous que la gravité est 10^36 fois plus faible que la force électromagnétique ?",
            "🌠 Dans les étoiles à neutrons, la gravité est 200 milliards de fois celle de la Terre !",
            "🪐 Jupiter a une gravité 2.5x supérieure à la Terre - suffisante pour dévier des comètes !",
            "⏱️ La gravité voyage à la vitesse de la lumière - si le Soleil disparaissait, nous le saurions après 8 minutes !",
            "💥 Les trous noirs sont les seuls endroits où la gravité vainc toutes les autres forces",
            "🔭 Les ondes gravitationnelles détectées en 2015 ont confirmé une prédiction d'Einstein de 1916 !",
            "✨ Tapez 'gravité' pour explorer cette force cosmique fondamentale"
        ],
        "étoile": [
            "⭐ Pas de problème ! Les étoiles peuvent attendre dans le firmament...",
            "🌞 Très bien, ces phares cosmiques brilleront pendant des milliards d'années !",
            "💫 Quand vous voudrez créer une supernova, je serai là !",
            "🌌 L'étoile la plus proche, Proxima Centauri, est à 4.24 années-lumière !",
            "🔥 Le noyau solaire atteint 15 millions °C - suffisant pour la fusion nucléaire !",
            "🌠 Bételgeuse, une supergéante rouge, est 1000 fois plus grande que le Soleil !",
            "⏳ Les naines rouges peuvent vivre des billions d'années - plus que l'âge actuel de l'univers !",
            "💥 Quand une étoile devient supernova, elle peut briller plus qu'une galaxie entière !",
            "🌀 Les étoiles à neutrons tournent jusqu'à 716 fois par seconde - les phares les plus précis du cosmos !",
            "✨ Tapez 'étoile' pour allumer ces moteurs cosmiques"
        ],
        "planète": [
            "🪐 Pas de problème ! Les planètes continueront leur orbite...",
            "🌍 Très bien, ces mondes extraterrestres ne s'enfuiront pas !",
            "💫 Quand vous voudrez créer un monde océanique, je serai là !",
            "🌌 L'exoplanète la plus proche, Proxima Centauri b, est à seulement 4 années-lumière !",
            "🌡️ Vénus est plus chaude que Mercure à cause d'un effet de serre incontrôlé !",
            "❄️ Pluton a des montagnes de glace d'eau de 3km de haut !",
            "🛰️ Jupiter a 79 lunes connues - un système planétaire miniature !",
            "💥 La Terre est la seule planète connue avec une tectonique des plaques active !",
            "🌀 L'exoplanète WASP-76b a des pluies de fer fondu sur sa face nocturne !",
            "✨ Tapez 'planète' pour façonner de nouveaux mondes"
        ],
        "météoroïde": [
            "🌠 Pas de problème ! Les météoroïdes continueront leur voyage spatial...",
            "🪨 Très bien, ces voyageurs cosmiques ne disparaîtront pas !",
            "💫 Quand vous voudrez voir un météoroïde en action, je serai là !",
            "☄️ Le météoroïde de Tcheliabinsk a explosé avec 30 fois l'énergie de la bombe d'Hiroshima !",
            "🌌 La plupart des météores sont plus petits que des grains de sable - mais tout aussi impressionnants !",
            "🔥 Les météoroïdes >25m peuvent causer des dégâts significatifs s'ils frappent la Terre !",
            "🔭 La pluie de météores des Perséides est l'une des plus visibles - toujours spectaculaire !",
            "💥 Le météoroïde de la Toungouska a causé une explosion de 15 mégatonnes en 1908 !",
            "🌠 Tapez 'météoroïde' pour voir ces voyageurs cosmiques en action !"
        ],
        "astéroïde": [
            "🪨 Pas de problème ! Les astéroïdes continueront leur orbite...",
            "🌌 Très bien, ces blocs rocheux ne disparaîtront pas !",
            "💫 Quand vous voudrez voir un astéroïde en action, je serai là !",
            "☄️ L'astéroïde 16 Psyché est principalement composé de fer et nickel - comme un noyau planétaire !",
            "🌠 L'astéroïde Vesta est si grand qu'il est visible à l'œil nu !",
            "🛰️ L'astéroïde Bennu a une forme de poisson - et est une cible d'exploration !",
            "💥 L'astéroïde Apophis passera près de la Terre en 2029 - sans risque de collision !",
            "🌌 La ceinture d'astéroïdes contient des millions de corps rocheux !",
            "🌠 Tapez 'astéroïde' pour explorer ces blocs de construction du système solaire !"
        ],
        "planétoïde": [
            "🪐 Pas de problème ! Les planétoïdes continueront leur orbite...",
            "🌌 Très bien, ces petits mondes ne disparaîtront pas !",
            "💫 Quand vous voudrez voir un planétoïde en action, je serai là !",
            "🌠 Le planétoïde Cérès est le plus gros objet de la ceinture d'astéroïdes et a de l'eau gelée !",
            "🛰️ Pluton est considéré comme un planétoïde par de nombreux astronomes !",
            "💥 Le planétoïde Éris est plus grand que Pluton et a une fine atmosphère d'azote !",
            "🌌 Les planétoïdes sont des fossiles cosmiques de la formation du système solaire !",
            "🌠 Tapez 'planétoïde' pour explorer ces petits mondes !"
        ],
        "trou de ver": [
            "🌀 Pas de problème ! Les trous de ver peuvent attendre...",
            "🌌 Très bien, ces tunnels cosmiques ne disparaîtront pas !",
            "💫 Quand vous voudrez voir un trou de ver en action, je serai là !",
            "⚠️ Attention : Les trous de ver sont théoriques et instables",
            "🌠 Saviez-vous que les trous de ver pourraient connecter des points distants de l'univers ?",
            "🔭 La théorie suggère qu'ils permettraient des voyages instantanés !",
            "💥 Même sans simulation, souvenez-vous : rien n'échappe après l'horizon !",
            "🌀 Tapez 'trou de ver' pour explorer ces tunnels cosmiques"
        ],
        "zone habitable": [
            "🌍 Pas de problème ! Les zones habitables peuvent attendre...",
            "🌌 Très bien, ces berceaux de vie ne disparaîtront pas !",
            "💫 Quand vous voudrez voir une zone habitable en action, je serai là !",
            "🌠 La Terre est dans la zone habitable solaire depuis des milliards d'années !",
            "🌡️ La zone habitable varie selon l'étoile - fascinant !",
            "🛰️ Les exoplanètes en zone habitable sont des cibles pour la recherche de vie !",
            "💥 Même sans simulation, souvenez-vous : la vie peut exister dans des environnements extrêmes !",
            "🌌 Tapez 'zone habitable' pour explorer ces berceaux de vie"
        ],
        "quasar": [
            "🌌 Pas de problème ! Les quasars peuvent attendre...",
            "💫 Très bien, ces phares cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir un quasar en action, je serai là !",
            "🌠 Les quasars sont les objets les plus lumineux de l'univers !",
            "🌀 Saviez-vous qu'ils émettent des jets relativistes à des vitesses proches de la lumière ?",
            "🔭 La lumière de certains quasars a voyagé des milliards d'années jusqu'à nous !",
            "💥 Même sans simulation, souvenez-vous : les quasars sont cruciaux pour l'évolution galactique !",
            "✨ Tapez 'quasar' pour explorer ces phares cosmiques"
        ],
        "naine brune": [
            "🌌 Pas de problème ! Les naines brunes peuvent attendre...",
            "💫 Très bien, ces objets intermédiaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une naine brune en action, je serai là !",
            "🌠 Les naines brunes sont des étoiles ratées sans fusion nucléaire soutenue !",
            "🌀 Saviez-vous qu'elles peuvent avoir des atmosphères riches en méthane et eau ?",
            "🔭 La lumière de certaines naines brunes a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'naine brune' pour explorer ces objets intermédiaires"
        ],
        "naine rouge": [
            "🌌 Pas de problème ! Les naines rouges peuvent attendre...",
            "💫 Très bien, ces petites étoiles ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une naine rouge en action, je serai là !",
            "🌠 Les naines rouges sont les étoiles les plus communes de l'univers !",
            "🌀 Saviez-vous qu'elles peuvent vivre des billions d'années ?",
            "🔭 La lumière de certaines naines rouges a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'naine rouge' pour explorer ces petites étoiles"
        ],
        "étoile géante": [
            "🌌 Pas de problème ! Les géantes peuvent attendre...",
            "💫 Très bien, ces colosses cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une géante en action, je serai là !",
            "🌠 Les étoiles géantes sont bien plus grandes que le Soleil et peuvent devenir supernovas !",
            "🌀 Saviez-vous que certaines peuvent être 1000 fois plus grandes que le Soleil ?",
            "🔭 La lumière de certaines géantes a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution galactique !",
            "✨ Tapez 'étoile géante' pour explorer ces colosses cosmiques"
        ],
        "hypergéante": [
            "🌌 Pas de problème ! Les hypergéantes peuvent attendre...",
            "💫 Très bien, ces titans cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une hypergéante en action, je serai là !",
            "🌠 Les hypergéantes sont les étoiles les plus massives connues !",
            "🌀 Saviez-vous que certaines peuvent être 1000 fois plus grandes que le Soleil ?",
            "🔭 La lumière de certaines hypergéantes a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution galactique !",
            "✨ Tapez 'hypergéante' pour explorer ces titans cosmiques"
        ],
        "étoile massive": [
            "🌌 Pas de problème ! Les étoiles massives peuvent attendre...",
            "💫 Très bien, ces colosses cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une étoile massive en action, je serai là !",
            "🌠 Les étoiles massives sont bien plus grandes que le Soleil et peuvent devenir supernovas !",
            "🌀 Saviez-vous que certaines peuvent être 100 fois plus grandes que le Soleil ?",
            "🔭 La lumière de certaines étoiles massives a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution galactique !",
            "✨ Tapez 'étoile massive' pour explorer ces colosses cosmiques"
        ],
        "étoile hipermassive": [
            "🌌 Pas de problème ! Les hipermassives peuvent attendre...",
            "💫 Très bien, ces titans cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une hipermassive en action, je serai là !",
            "🌠 Les étoiles hipermassives sont les plus massives connues !",
            "🌀 Saviez-vous que certaines peuvent être 1000 fois plus grandes que le Soleil ?",
            "🔭 La lumière de certaines hipermassives a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution galactique !",
            "✨ Tapez 'étoile hipermassive' pour explorer ces titans cosmiques"
        ],
        "naine blanche": [
            "🌌 Pas de problème ! Les naines blanches peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une naine blanche en action, je serai là !",
            "🌠 Les naines blanches sont les restes d'étoiles ayant épuisé leur combustible nucléaire !",
            "🌀 Saviez-vous qu'elles sont extrêmement denses et petites ?",
            "🔭 La lumière de certaines naines blanches a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'naine blanche' pour explorer ces vestiges stellaires"
        ],
        "naine blanche d'hélium": [
            "🌌 Pas de problème ! Les naines blanches d'hélium peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une naine blanche d'hélium en action, je serai là !",
            "🌠 Ces naines blanches sont les restes d'étoiles ayant épuisé leur combustible !",
            "🌀 Saviez-vous qu'elles sont extrêmement denses et petites ?",
            "🔭 La lumière de certaines a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'naine blanche d'hélium' pour explorer ces vestiges stellaires"
        ],
        "naine blanche de carbone": [
            "🌌 Pas de problème ! Les naines blanches de carbone peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une naine blanche de carbone en action, je serai là !",
            "🌠 Ces naines blanches sont les restes d'étoiles ayant épuisé leur combustible !",
            "🌀 Saviez-vous qu'elles sont extrêmement denses et petites ?",
            "🔭 La lumière de certaines a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'naine blanche de carbone' pour explorer ces vestiges stellaires"
        ],
        "naine noire": [
            "🌌 Pas de problème ! Les naines noires peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une naine noire en action, je serai là !",
            "🌠 Les naines noires sont les restes ultimes d'étoiles ayant perdu toute leur chaleur !",
            "🌀 Saviez-vous qu'elles sont extrêmement denses et froides ?",
            "🔭 La lumière de certaines a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'naine noire' pour explorer ces vestiges stellaires"
        ],
        "étoile à neutrons": [
            "🌌 Pas de problème ! Les étoiles à neutrons peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une étoile à neutrons en action, je serai là !",
            "🌠 Les étoiles à neutrons sont les restes de supernovas et sont extrêmement denses !",
            "🌀 Saviez-vous qu'une cuillère de leur matière pèse plus que toute l'humanité ?",
            "🔭 La lumière de certaines a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'étoile à neutrons' pour explorer ces vestiges stellaires"
        ],
        "magnétar": [
            "🌌 Pas de problème ! Les magnétars peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir un magnétar en action, je serai là !",
            "🌠 Les magnétars sont des étoiles à neutrons avec des champs magnétiques extrêmes !",
            "🌀 Saviez-vous qu'ils peuvent émettre des sursauts gamma et rayons X puissants ?",
            "🔭 La lumière de certains a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : ils sont cruciaux pour l'évolution stellaire !",
            "✨ Tapez 'magnétar' pour explorer ces vestiges stellaires"
        ],
        "étoile à quarks": [
            "🌌 Pas de problème ! Les étoiles à quarks peuvent attendre...",
            "💫 Très bien, ces vestiges stellaires ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une étoile à quarks en action, je serai là !",
            "🌠 Les étoiles à quarks sont théoriques et encore plus denses que les étoiles à neutrons !",
            "🌀 Saviez-vous qu'elles pourraient avoir une structure interne complexe ?",
            "🔭 La lumière de certaines a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont cruciales pour l'évolution stellaire !",
            "✨ Tapez 'étoile à quarks' pour explorer ces vestiges stellaires"
        ],
        "poussière spatiale": [
            "🌌 Pas de problème ! La poussière spatiale peut attendre...",
            "💫 Très bien, ces particules cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir de la poussière spatiale en action, je serai là !",
            "🌠 La poussière spatiale est fondamentale dans la formation des étoiles et planètes !",
            "🌀 Saviez-vous qu'elle contient des éléments lourds forgés dans les étoiles ?",
            "🔭 La lumière de certains nuages de poussière a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elle est essentielle à l'évolution cosmique !",
            "✨ Tapez 'poussière spatiale' pour explorer ces particules cosmiques"
        ],
        "nébuleuse": [
            "🌌 Pas de problème ! Les nébuleuses peuvent attendre...",
            "💫 Très bien, ces nuages cosmiques ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une nébuleuse en action, je serai là !",
            "🌠 Les nébuleuses sont des pouponnières stellaires où naissent les étoiles !",
            "🌀 Saviez-vous que certaines sont des restes de supernovas ?",
            "🔭 La lumière de certaines a voyagé des milliards d'années !",
            "💥 Même sans simulation, souvenez-vous : elles sont fondamentales pour l'évolution cosmique !",
            "✨ Tapez 'nébuleuse' pour explorer ces nuages cosmiques"
        ],
        "singularité": [
            "🌌 Pas de problème ! Les singularités peuvent attendre...",
            "💫 Très bien, ces points de densité infinie ne disparaîtront pas !",
            "🚀 Quand vous voudrez voir une singularité en action, je serai là !",
            "🌠 Les singularités sont théoriques et représentent une courbure extrême de l'espace-temps !",
            "🌀 Elles pourraient exister au centre des trous noirs et quasars !"
        ],
        "default": [
            "🌌 Pas de problème ! L'univers est patient...",
            "🚀 Très bien, l'exploration cosmique peut attendre !",
            "💫 Quand vous voudrez continuer, je serai là !",
            "🔭 Saviez-vous qu'il y a plus d'étoiles dans l'univers que de grains de sable sur Terre ?",
            "🌠 La lumière d'Andromède que nous voyons est partie quand nos ancêtres peignaient des cavernes !",
            "⏳ 99.9% de la matière visible dans l'univers est à l'état de plasma !",
            "💥 En 1 seconde, le Soleil produit plus d'énergie que toute l'humanité dans son histoire !",
            "🌀 Les trous noirs supermassifs régulent la croissance des galaxies !",
            "✨ Chaque atome d'oxygène dans votre corps a été forgé dans le cœur d'une étoile !",
            "🪐 Nous sommes tous faits de poussière d'étoiles !"
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
        "🧮 Résultat : {expression} = {result}",
        "🔢 Calcul terminé : {expression} = {result}",
        "✨ Solution : {expression} = {result}",
        "⚡ Résolu : {expression} = {result}",
        "🌌 Équation cosmique : {expression} = {result}",
        "🪐 Mathématiques stellaires : {expression} = {result}",
        "💫 Calcul gravitationnel : {expression} = {result}",
        "📐 Géométrie universelle : {expression} = {result}",
        "📊 Analyse numérique : {expression} = {result}",
        "🔭 Observation mathématique : {expression} = {result}",
        "🌠 Formule résolue : {expression} = {result}",
        "🚀 Calcul propulsé : {expression} = {result}",
        "🛰️ Résultat orbital : {expression} = {result}",
        "⏱️ Temps de calcul : 0s | {expression} = {result}",
        "⚖️ Équilibre numérique : {expression} = {result}",
        "🌀 Vortex mathématique : {expression} = {result}",
        "🌡️ Température computationnelle : 0K | {expression} = {result}",
        "📈 Projection numérique : {expression} = {result}",
        "📉 Analyse inverse : {expression} = {result}",
        "🧪 Expérience numérique : {expression} = {result}",
        "🔬 Microscope mathématique : {expression} = {result}",
        "🖥️ Calcul quantique simulé : {expression} = {result}",
        "💻 Algorithme terminé : {expression} = {result}",
        "🤖 Traitement robotique : {expression} = {result}",
        "🌟 Illumination numérique : {expression} = {result}",
        "🌌 Cosmos résolu : {expression} = {result}",
        "🧬 Génétique mathématique : {expression} = {result}",
        "🌠 Astronomie numérique : {expression} = {result}",
        "🪐 Astrophysique computationnelle : {expression} = {result}",
        "🔭 Télescope mathématique : {expression} = {result}",
        "🌌 Cosmologie numérique : {expression} = {result}",
        "🌟 Étoile résolue : {expression} = {result}",
        "🌠 Galaxie calculée : {expression} = {result}",
        "🛸 Navigation numérique : {expression} = {result}",
        "🌌 Univers calculé : {expression} = {result}",
        "🌠 Constellation résolue : {expression} = {result}",
        "🪐 Planète calculée : {expression} = {result}",
        "🌌 Nébuleuse numérique : {expression} = {result}",
        "🌠 Supernova résolue : {expression} = {result}",
        "🛰️ Satellite mathématique : {expression} = {result}",
        "🌌 Espace-temps calculé : {expression} = {result}",
        "🌠 Horizon des événements résolu : {expression} = {result}",
        "🌀 Singularité numérique : {expression} = {result}",
        "🌌 Big Bang calculé : {expression} = {result}",
        "🌠 Expansion cosmique résolue : {expression} = {result}",
        "🪐 Anneau planétaire calculé : {expression} = {result}",
        "🌌 Trou de ver numérique : {expression} = {result}",
        "🌠 Voie Lactée calculée : {expression} = {result}",
        "🛸 Vaisseau spatial numérique : {expression} = {result}",
        "🌌 Multivers calculé : {expression} = {result}",
        "🌠 Dimension parallèle résolue : {expression} = {result}",
        "🪐 Exoplanète calculée : {expression} = {result}",
        "🌌 Astéroïde numérique : {expression} = {result}",
        "🌠 Météorite résolu : {expression} = {result}",
        "🛰️ Sonde spatiale numérique : {expression} = {result}",
        "🌌 Comète calculée : {expression} = {result}",
        "🌠 Pluie de météores résolue : {expression} = {result}",
        "🪐 Lune calculée : {expression} = {result}",
        "🌌 Système solaire numérique : {expression} = {result}",
        "🌠 Orbite planétaire résolue : {expression} = {result}",
        "🛰️ Station spatiale numérique : {expression} = {result}",
        "🌌 Galaxie spirale calculée : {expression} = {result}",
        "🌠 Galaxie elliptique résolue : {expression} = {result}",
        "🪐 Galaxie irrégulière calculée : {expression} = {result}",
        "🌌 Quasar numérique : {expression} = {result}",
        "🌠 Pulsar résolu : {expression} = {result}",
        "🛰 Boule de plasma calculée : {expression} = {result}"
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
                throw new Error("Expression invalide");
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
            return "🤔 Je n'ai pas pu calculer. Format valide : '2*(3+5^2)' ou 'sqrt(9)'";
        }
    }
};

 
const greetingsSystem = {
    greetings: ["bonjour", "salut", "coucou", "hello", "hi", "bonjour", "bon après-midi", "bonsoir", "salutations", "hey", "hé", "salutations cosmiques", "bonjour stellaire", "hi singularity"],
    farewells: ["au revoir", "adieu", "à plus tard", "bye", "bye", "quitter", "sortir", "fermer", "exit", "ciao", "je me casse", "à bientôt", "déconnexion", "fin de session", "adieu singularity"],
    
    greetingsResponses: [
        "✨ Bonjour, explorateur cosmique ! Comment puis-je aider votre voyage parmi les étoiles ?",
        "🚀 Bienvenue dans SIU 2D ! Prêt à créer des univers incroyables ?",
        "🌌 Salutations interstellaires ! En quoi puis-je vous aider aujourd'hui ?",
        "🪐 Salut, commandant ! Quel défi cosmique allons-nous relever ?",
        "💫 Salutation gravitationnelle ! Comment puis-je assister votre exploration ?",
        "🌟 Bienvenue, créateur de mondes ! Qu'allons-nous simuler aujourd'hui ?",
        "🌠 Salut, voyageur des étoiles ! Prêt pour une aventure cosmique ?",
        "🛸 Transmission reçue ! Comment puis-je aider votre mission spatiale ?",
        "🔭 Bonjour, astronome virtuel ! Quel mystère cosmique allons-nous résoudre ?",
        "⚡ Énergie cosmique en flux ! Comment puis-je vous aider ?",
        "🌀 Vortex de bienvenue activé ! Quelle est votre commande ?",
        "🌠 Rayons cosmiques détectés ! Bonjour, comment puis-je vous assister ?",
        "🪐 Alignement planétaire parfait pour votre arrivée ! Bienvenue !",
        "🌌 Distorsion spatiale stabilisée ! Salutations, explorateur !",
        "🚀 Systèmes en ligne ! Singularity à votre service pour vos questions",
        "🔭 Télescopes focalisés ! Prêt à explorer l'univers ?",
        "🌠 Pluie de météores de bienvenue ! Comment puis-je vous aider ?",
        "💻 Systèmes d'IA cosmique activés ! Bonjour, humain !",
        "🛰️ Satellites de communication synchronisés ! Connexion établie !",
        "🌌 Portail dimensionnel ouvert ! Bienvenue dans SIU 2D !",
        "🌟 Constellations alignées pour votre arrivée ! Salutations !",
        "⚛️ Particules cosmiques enthousiasmées par votre présence ! Bonjour !",
        "🌠 Comète de bienvenue en trajectoire ! Salutations, voyageur !",
        "🪐 Anneaux planétaires oscillants en salutation ! Bienvenue !",
        "✨ Énergie stellaire canalisée ! Singularity à votre disposition !"
    ],
    
    farewellResponses: [
        "🌠 À la prochaine, voyageur des étoiles ! Que votre voyage soit épique !",
        "🛸 Bon voyage dans le cosmos ! Revenez quand de nouvelles questions surgiront !",
        "💫 Fin de transmission. Souvenez-vous : L'univers est votre terrain de jeu !",
        "👋 Au revoir ! Quand vous voudrez créer un trou noir, je serai là !",
        "🚀 Départ confirmé ! Revenez pour plus d'aventures cosmiques !",
        "🌌 Déconnexion... Mais l'univers continue son expansion !",
        "🪐 À bientôt, commandant ! Puissions-nous trouver de nouveaux horizons cosmiques !",
        "✨ Mission accomplie ! Revenez pour de nouvelles explorations stellaires !",
        "🔭 Signal perdu... Mais les étoiles guideront toujours votre chemin !",
        "⚡ Énergies cosmiques vous disent au revoir ! À la prochaine orbite !",
        "🌀 Champ gravitationnel désactivé ! À bientôt, explorateur !",
        "🌠 Trajectoire de sortie calculée ! À la prochaine, voyageur !",
        "🛰️ Satellites en veille ! Revenez quand vous aurez besoin !",
        "💻 Systèmes en hibernation cosmique ! À bientôt !",
        "🪐 Alignement planétaire d'adieu ! Bonnes explorations !",
        "🌌 Portail dimensionnel fermé ! Revenez quand vous voulez !",
        "🌟 Constellations brillent pour votre départ ! À très vite !",
        "⚛️ Particules cosmiques ralenties ! À la prochaine !",
        "🌠 Comète d'adieu en trajectoire ! Bon voyage !",
        "🔭 Télescopes en défocalisation ! À la prochaine observation !",
        "💫 Distorsion spatiale annulée ! À la prochaine aventure !",
        "🚀 Fusées d'adieu activées ! Bon voyage !",
        "🌠 Rayons cosmiques d'adieu détectés ! À bientôt !",
        "🛸 Vaisseau de départ en orbite ! Revenez vite !",
        "✨ Dernière pulsation stellaire ! Déconnexion..."
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
        "🌌 Je n'ai pas trouvé cela dans ma base stellaire... Demandez-moi plutôt sur les 'comètes', 'trous noirs' ou les 'commandes' !",
        "🛸 Mes connaissances sont cosmiques - essayez de demander sur la physique du jeu ou les éléments de l'univers",
        "🔭 Concentration spatiale ! Et si vous demandiez 'Comment créer une nébuleuse ?' ou 'Quelle masse pour un trou noir ?'",
        "📡 Signal perdu... Reformulez sur la création d'astres, l'évolution stellaire ou les contrôles de SIU 2D",
        "💫 Vous voulez calculer quelque chose ? Utilisez des nombres et opérateurs comme '3 * 5^2' ou demandez sur les termes cosmiques !",
        "🪐 Indice cosmique : Essayez des termes comme 'gravité', 'étoile', 'planète' ou 'évolution' !",
        "⚡ Nouveau message stellaire détecté ! Formulez comme 'Comment créer un quasar ?' ou 'Qu'est-ce qu'une zone habitable ?'"
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
        const errorMsg = createMessage('error : Erro de conexão. Verifique sua internet e tente novamente.', 'error-message');
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