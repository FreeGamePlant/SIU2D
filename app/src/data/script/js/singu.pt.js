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
        "☄️ Cometas são corpos gelados que desenvolvem caudas quando próximos de estrelas! No SIU 2D, você pode criá-los no menu 'Criar Astros'",
        "💫 A massa típica de cometas varia entre 0.1-10 unidades. Acima de 300 massas, evoluem para planetoides gelados automaticamente",
        "🌠 A cauda sempre aponta na direção oposta ao movimento - isso simula o vento estelar do jogo com precisão física",
        "🚀 Dica: Ao criar um cometa, arraste o mouse para definir sua velocidade inicial e veja a trajetória prevista",
        "❄️ Cometas derretem quando muito próximos de estrelas quentes - no jogo, isso os transforma em asteroides após 50 passagens",
        "⏱️ No modo tempo acelerado (100000x), você pode observar um cometa completar sua órbita em segundos reais",
        "🎯 Experimente criar um sistema com múltiplos cometas orbitando uma estrela - pressione 'C' para acessar o menu de criação",
        "📏 O raio do núcleo é calculado por R = 0.1 * ∛(massa). Ex: massa 8 = raio ~0.2 unidades (visível no painel de edição)",
        "🔥 Cometas com velocidade >5 unidades/s desenvolvem caudas mais longas - perfeito para efeitos visuais dramáticos",
        "🌌 No modo alta qualidade (Opções > Gráficos), as caudas mostram três camadas: poeira (amarelo), gás ionizado (azul) e sódio (laranja)",
        "🔄 Use planetas gigantes como 'estilingues gravitacionais' - coloque um cometa em trajetória próxima para redirecioná-lo",
        "⛰️ Cometas desgastados tornam-se asteroides classe 2 (gelados) - você pode ver essa transição no histórico do astro",
        "💧 Controle o ponto onde a cauda começa a se formar ajustando a temperatura base no painel de edição (acima de -50°C)",
        "📊 Dados físicos no jogo: Densidade = 0.5 g/cm³, Albedo = 0.04 - visíveis no modo estatísticas avançadas (Shift+E)",
        "✨ Cometas recém-criados têm atividade por ~1 milhão de anos no tempo do jogo - observe na linha do tempo universal",
        "🎯 Para uma órbita perfeita, a velocidade inicial deve ser perpendicular à linha gravitacional - as setas guiam você",
        "🌡️ A temperatura da cauda varia: próximo ao núcleo (1500°C), meio (500°C), ponta (100°C) - visível com zonas térmicas ativas",
        "🔄 Cometas podem ser capturados por planetas - tente criar um sistema com Júpiter virtual para ver luas cometárias",
        "⏳ No painel de tempo do astro (T com edição aberta), veja quantas passagens estelares restantes antes de se tornar inativo",
        "📈 Dica avançada: Cometas com alta excentricidade (>0.9) têm órbitas mais interessantes - ajuste no vetor de velocidade",
        "🌠 Curiosidade: O código do jogo simula perda de massa por sublimação - cerca de 0.01% por passagem estelar",
        "🔭 Em sistemas binários, cometas podem ter órbitas caóticas - tente criar duas estrelas próximas com cometas orbitando",
        "⚠️ Cuidado: Cometas em rota de colisão com planetas evaporam-se antes do impacto na maioria dos casos",
        "💧 A água dos cometas é contabilizada no sistema de recursos do planeta quando evaporam - veja no painel planetário",
        "🌟 Para melhores resultados, crie cometas no menu 'Corpos Menores' com temperatura inicial entre -100°C e -50°C"
    ],
    
    "buraco negro": [
        "🕳️ Buracos negros têm massa mínima de 1 trilhão (1e12) unidades - crie-os no menu 'Corpos Exóticos'",
        "🌀 O raio no jogo é calculado como R = ∛(massa)/1000 - isso simplifica o Raio de Schwarzschild para gameplay",
        "💥 Alimente buracos negros com matéria para vê-los crescer - tente lançar nebulosas ou estrelas próximas",
        "⏳ Eles perdem massa pela radiação Hawking - em 10^67 anos evaporariam (simulado de forma acelerada no jogo)",
        "📡 O disco de acreção emite calor intenso - use o botão 'Zonas Térmicas' (T) para visualizar os 5000°C+",
        "⚡ A força de maré perto do horizonte é F = (G * M * m) / r³ * Δr - objetos próximos são esticados (efeito visível em Alta Qualidade)",
        "🌌 Buracos negros acima de 500 sextilhões viram quasares - alcance essa marca para ver jatos de energia",
        "🔭 Mantenha distância safa de 10x o raio - dentro disso, objetos são engolidos instantaneamente",
        "🔄 Use para 'estilingues gravitacionais' - lance objetos em trajetórias de alta energia com economia",
        "💫 Em sistemas binários, geram ondas gravitacionais - ative em Opções > Física > Efeitos Relativísticos",
        "⏱️ 1 segundo no horizonte equivale a ~100 anos externos - observe com o controle de tempo acelerado",
        "📈 O tempo de evaporação é mostrado no painel de tempo do astro (acesse com T durante a edição)",
        "🌠 Para fundir buracos negros: crie dois próximos e acelere o tempo - a colisão emite flash intenso",
        "⚠️ Objetos dentro de 5x o raio sofrem espaguetificação - efeito ativado em Opções > Gráficos > Alta Qualidade",
        "🔢 Calcule o raio para 1 milhão de massas solares: R ≈ 2.95 * (M/1e6) km - o jogo usa unidades simplificadas",
        "💥 Ao atingir 1e60 massas, transformam-se em buracos brancos - continue alimentando para ver a transição",
        "🌡️ A temperatura do disco de acreção é controlável no painel de edição - padrão é 1.000.000°C",
        "🌀 O spin pode ser ajustado no painel avançado (clique em 'Propriedades Relativísticas') - afeta o disco de acreção",
        "📏 Para medição precisa: O diâmetro do horizonte de eventos é sempre 2x o raio mostrado no jogo",
        "⚠️ Cuidado: Buracos negros em sistemas densos podem engolir estrelas rapidamente - monitore pela linha do tempo",
        "🔭 Use o modo observação (O) para ver as lentes gravitacionais - distorcem a luz de estrelas atrás deles",
        "💫 Quasares (estágio evolutivo) emitem jatos de energia - controle a direção no painel de edição",
        "⏳ Em buracos negros supermassivos, o tempo de evaporação excede a idade atual do universo do jogo",
        "🌌 Dica: Crie um binário de buraco negro e estrela para ver transferência de matéria em tempo real",
        "✨ Para experiência completa, ative música ambiente 'Singularity' em Opções > Áudio"
    ],
    
    "gravidade": [
        "⚖️ Ajuste global de 0% a 500% em Menu > Física > Constante Gravitacional",
        "📏 Constante G padrão: 6.67430e-11 N·m²/kg² - modificável para simular universos alternativos",
        "🌀 Buracos negros têm multiplicador gravitacional fixo 1000x para efeitos relativísticos",
        "🪐 Força de maré calculada como Δg = (2GM/R³) * Δr - causa deformações em luas próximas (visível em Alta Qualidade)",
        "📈 Cada 100% extra de gravidade acelera sistemas em ~15% - útil para simulações rápidas",
        "🌌 Ondas gravitacionais ativadas em Opções > Física > Efeitos Avançados - visíveis como ondulações",
        "🔄 Velocidade orbital ótima: v = √(GM/r) - mostrada durante a criação com as setas guia",
        "⚙️ Reduza para 10-50% para simular nebulosas, aumente para 200-500% para sistemas estelares densos",
        "🔭 Efeito de lente gravitacional visível perto de buracos negros - ative em Gráficos > Efeitos Especiais",
        "📊 Estabilidade máxima: 0.5 * √N corpos (ex: 100 astros → ~7 estáveis) - exceder causa comportamentos caóticos",
        "⏳ Alta gravidade acelera evolução estelar - estrelas vivem menos em campos gravitacionais fortes",
        "🌠 Limiar de fusão em colisões: Ec < |Ep| - quando energia cinética é menor que potencial gravitacional",
        "🧮 Fórmula implementada: F = G * m1 * m2 / r² - testável com o modo 'Mostrar Forças' (F3)",
        "🔢 Para duplicar força gravitacional: aumente G em 100% ou massas em 100%",
        "⚠️ Valores >300% podem causar instabilidades em sistemas com mais de 50 corpos - use com cautela",
        "🌍 Gravidade superficial calculada como g = GM/R² - visível no painel planetário para corpos rochosos",
        "💫 O sistema usa integração Verlet para cálculos orbitais precisos - ative 'Precisão Total' em Física",
        "📈 Em corpos massivos, a gravidade afeta a rotação - planetas muito próximos de estrelas ficam tidalmente travados",
        "🌀 Campos gravitacionais fortes dilatam o tempo - observável comparando relógios em diferentes altitudes",
        "⚡ Para simular matéria escura: aumente a gravidade em 30-50% sem adicionar massa visível",
        "🔭 A precisão numérica é maior perto de massas grandes - o jogo usa sistema de coordenadas adaptativas",
        "🌌 Curvatura espaço-temporal é simulada visualmente perto de objetos compactos - ative em Opções > Gráficos",
        "📏 Distâncias de Roche calculadas automaticamente - luas dentro deste limite se fragmentam (visível com 'Mostrar Zonas Críticas')",
        "💥 Em colisões, a gravidade determina a energia liberada - E ∝ M²/R para impactos diretos",
        "✨ Dica: Para órbitas estáveis, a velocidade inicial deve ser ≈80% da velocidade de escape local"
    ],
    
    "estrela": [
        "⭐ Massa mínima: 15 milhões de unidades - crie no menu 'Corpos Estelares'",
        "🌞 Para uma estrela como o Sol: massa ~1.989e30 kg (1 unidade solar no jogo)",
        "🌈 Cores por temperatura: Azul (>30,000K), Branco (10,000K), Amarelo (6,000K), Vermelho (<3,500K) - ajuste no painel",
        "💥 Estrelas acima de 20 massas solares explodem como supernovas - ative 'Evolução Estelar' em Opções",
        "⏳ Tempo de vida: t ≈ 10^10 * (M/M☉)^-2.5 anos - visível no painel de tempo do astro (T durante edição)",
        "🔄 Crie sistemas binários com duas estrelas próximas para ver órbitas fascinantes",
        "🔭 Estrelas variáveis mudam de brilho - controle a amplitude em 'Propriedades Estelares'",
        "🌡️ Zona habitável: d = √(L/L☉) AU - mostrada como anel verde quando selecionada",
        "💫 Fusão nuclear simulada: H → He com eficiência de 0.7% (E=mc²) - afeta luminosidade e vida útil",
        "📊 Evolução: Anã vermelha → Anã branca | Estrela média → Gigante vermelha | Massiva → Supernova → Buraco negro",
        "⚙️ Ajustáveis: Massa, temperatura, rotação, metalicidade e atividade magnética",
        "✨ Estrelas de nêutrons requerem >1.4 massas solares e colapso - crie através de supernovas",
        "🌌 Aglomerados estelares: crie múltiplas estrelas em região pequena (menu 'Sistemas Complexos')",
        "🧪 Modifique a constante gravitacional para ver efeitos na evolução (Menu > Física > Constantes)",
        "🔢 Luminosidade: L ∝ M^3.5 - uma estrela 2x mais massiva é ~11x mais luminosa",
        "⚠️ Estrelas muito massivas (>100 massas solares) podem ser instáveis - dividem-se ou explodem prematuramente",
        "🌠 Estrelas T Tauri (jovens) mostram ejections de massa - visível como proeminências no modo Alta Qualidade",
        "💥 Em supernovas, 90% da massa é ejetada como nebulosa - o resto forma estrela de nêutrons ou buraco negro",
        "📈 Raio estelar: R ∝ M^0.8 para estrelas da sequência principal - calculado automaticamente",
        "🌍 Planetas em zona habitável podem desenvolver vida - indicado por ícone verde no painel planetário",
        "🔥 Núcleo estelar atinge 15 milhões °C para fusão - temperatura ajustável afeta taxa de evolução",
        "🌀 Campos magnéticos fortes criam manchas estelares - controle a intensidade no painel avançado",
        "🔭 Para observar detalhes, use zoom (rodinha do mouse) e reduza velocidade do tempo",
        "✨ Dica: Estrelas binárias podem ter planetas em órbita P-type (em volta do par) ou S-type (em volta de uma)"
    ],
    
    "planeta": [
        "🪐 Massa: 5K-30.5K (rochosos), 105K-2.5M (gasosos) - crie no menu 'Corpos Planetários'",
        "🌍 Classes: Rochosos (1-11), Gasosos (1-6), Anões - atribuídas automaticamente por massa/temperatura",
        "🌡️ Zona habitável calculada como d = √(L_estrela / L☉) AU - mostrada como anel verde ao redor de estrelas",
        "🔄 Velocidade orbital ótima: v = √(GM/r) - ajuste durante criação com o vetor de velocidade",
        "🌋 Planetas vulcânicos: temperatura >1000°C + baixa água/atmosfera - classe 7 automaticamente",
        "❄️ Mundos gelados: temperatura < -100°C + alta água - tornam-se classe 9 automaticamente",
        "🌫️ Espessura atmosférica: controle com slider de gás (0-100%) - afeta temperatura e pressão superficial",
        "💧 Água superficial: ajuste com slider aquático - ideal para mundos habitáveis: 30-70%",
        "🔭 Luas mostram libração - efeito sutil ativado em Gráficos > Alta Qualidade",
        "🛰️ Máximo de 20 luas por planeta - estável até 10% da massa planetária",
        "⏱️ Migração planetária ocorre em sistemas jovens - ative em Física > Efeitos Avançados",
        "📏 Raio: ∛(massa) para rochosos, ∛(massa/2) para gasosos - calculado automaticamente",
        "🌌 Tipos especiais: Carbono (alta razão C/O), Ferro (núcleo exposto) - crie com composições extremas",
        "🧪 Colisões planetárias criam novos mundos + cinturões de asteroides - simulado com precisão",
        "🔢 Gravidade superficial: g = GM/R² - mostrada no painel planetário",
        "💫 Anéis planetários: ative em 'Características' > Anéis - ajuste espessura, cor e densidade",
        "🌍 Planetas oceânicos (classe 2) têm água >90% - geram atmosfera úmida automaticamente",
        "🏜️ Planetas desérticos (classe 3) perdem 80-90% de água - mostram textura arenosa",
        "🌱 Mundos habitáveis (classe 6) mostram vegetação - ative em Gráficos > Detalhes Superficiais",
        "🌋 Atividade geológica: controle com slider 'Tectônica' - afeta vulcanismo e formação de montanhas",
        "🌀 Rotação: ajuste período de rotação - afeta achatamento e padrões climáticos em gasosos",
        "🌌 Exoplanetas extremos: crie com parâmetros incomuns usando o modo 'Personalização Avançada'",
        "📊 Para ver dados detalhados: selecione planeta e pressione E - painel mostra todas estatísticas",
        "✨ Dica: Planetas em ressonância orbital (ex: 2:3) mantêm estabilidade a longo prazo",
        "🔭 Use o modo 'Observatório' (O) para ver detalhes de superfície em planetas selecionados"
    ]
    ,"meteoroide": [
    "🌠 Meteoroides são fragmentos rochosos menores que asteroides (1mm-1m) - gerados automaticamente em colisões",
    "💫 Velocidade média: 20-70 km/s - visível como traços rápidos no modo tempo real",
    "🪨 Composição: 90% rocha, 6% ferro, 4% níquel - definida no painel de criação de fragmentos",
    "🌌 No SIU 2D, crie através de colisões ou usando o menu 'Corpos Menores' > 'Gerar Fragmentos'",
    "🔥 Ao entrar na atmosfera, tornam-se meteoros - ative 'Atmosferas' em Opções > Física",
    "📏 Massa típica: 0.1g-100kg - objetos maiores são classificados como asteroides",
    "💥 Efeito de entrada atmosférica: ative em Gráficos > Efeitos Especiais > Estrelas Cadentes",
    "🌍 Para Terra: ~100 toneladas de meteoroides entram diariamente - simulado proporcionalmente",
    "📊 Dados: Densidade 3-4 g/cm³, Albedo 0.05-0.25 - ajustável no painel de propriedades",
    "✨ Dica: Crie cinturões de asteroides para gerar meteoroides naturalmente",
    "⏱️ No modo acelerado (10000x), veja chuvas de meteoros constantes",
    "🔭 Observação: Meteoroides não são visíveis até se tornarem meteoros",
    "🌠 Chuva de meteoros: ocorre quando planetas cruzam trilhas de cometas - simule com 'Eventos'",
    "💫 Colisões com naves: reduza escudo em 1% por 10kg - ative em Física > Danos",
    "⚠️ Perigo: Meteoroides >1kg podem danificar satélites - indicado por alerta amarelo",
    "🌌 Para criar manualmente: menu 'Fragmentos' > tamanho Pequeno (S)",
    "📈 Estatísticas: Frequência ajustável em Menu > Ambiente > Densidade de Fragmentos",
    "🛰️ A velocidade relativa determina energia de impacto: E = 0.5 * m * v²",
    "🌠 Curiosidade: O meteoroide que criou a Cratera Barringer tinha apenas 50m de diâmetro",
    "🌟 Efeito visual: Ative 'Rastros Luminosos' para ver trajetórias em alta velocidade"
],
    "meteoro": [
    "☄️ Meteoros são meteoroides queimando na atmosfera - 'estrelas cadentes' no jogo",
    "🔥 Temperatura de plasma: 1,500-3,000°C - visível como faíscas coloridas",
    "🌈 Cores: Verde (magnésio), Amarelo (sódio), Vermelho (nitrogênio) - definidas por composição",
    "🌍 Para ver: Aumente densidade atmosférica > 0.1kg/m³ e adicione meteoroides",
    "💫 Velocidade mínima: 11km/s para ignição - ajuste no limiar de ignição atmosférica",
    "📏 Magnitude aparente: -4 a +5 - controlada por tamanho e velocidade do meteoroide",
    "🌠 Chuvas de meteoros: configure em Eventos > Chuvas de Meteoros com radiante definido",
    "⏱️ Duração: 0.1-10 segundos no tempo real - proporcional à massa",
    "✨ Dica: Use cometas como fonte para chuvas de meteoros periódicas",
    "💥 Bólidos: meteoros > -4 magnitude - ativam som de explosão e flash",
    "🌌 Para criar manualmente: 'Eventos' > 'Meteoro' com altitude 80-120km",
    "📊 Frequência: Ajustável de 0-100 eventos/hora em Opções > Ambiente",
    "🔭 Melhor visualização: Noite com céu limpo - reduza poluição luminosa no menu",
    "⚠️ Cuidado: Meteoros podem sobreviver e se tornar meteoritos",
    "🌠 Curiosidade: A chuva Perseidas atinge 100 meteoros/hora no pico",
    "🌟 Efeito sonoro: Ative em Áudio > Eventos > Estrelas Cadentes",
    "🛸 Meteoros terrestres: ocorrem acima de 80km - altitude ajustável",
    "📉 Perda de massa: 90-99% durante a passagem atmosférica",
    "💧 Meteoros aquáticos: criam crateras subaquáticas visíveis no modo oceano",
    "🌌 Para captura de tela: Pause no momento exato com P e use F12"
],
    "asteroide": [
    "🪨 Asteroides: corpos rochosos de 1m-1000km - crie no menu 'Corpos Menores'",
    "🌌 Classes: C (carbonáceos), S (silicatos), M (metálicos) - selecione no painel",
    "💫 Massa típica: 1e10-1e20 kg - acima disso tornam-se planetoides",
    "📏 Forma irregular: ative em Propriedades > Forma > Irregular para realismo",
    "🔄 Órbita: Geralmente entre Marte e Júpiter - crie cinturões com 'Gerar Sistema'",
    "⚠️ Perigo de impacto: indicado por marcador vermelho se trajetória interceptar planeta",
    "🌠 Asteroides próximos à Terra: configure em 'Eventos' > 'Asteroides NEA'",
    "💥 Colisão com planeta: libera energia E = 0.5 * m * v² - visível como explosão",
    "⛰️ Superfície: Textura craterizada ativada em Gráficos > Detalhes Superficiais",
    "🌌 Famílias asteroides: aglomerados com mesma origem - gere com 'Famílias Colisionais'",
    "📊 Dados: Densidade 1-5 g/cm³, Albedo 0.02-0.7 - ajustáveis",
    "✨ Dica: Use para mineração virtual - recursos calculados em Painel > Recursos",
    "🔭 Observação: Asteroides <100m só visíveis quando próximos",
    "🚀 Missões: Envie sondas clicando no asteroide > 'Enviar Sonda'",
    "🌍 Impacto K-T: Simule com asteroide de 10km para extinção em massa",
    "💫 Rotação caótica: comum em asteroides pequenos - ative em Propriedades > Rotação",
    "🛰️ Luas asteroidais: raras, mas possíveis - adicione com 'Adicionar Lua'",
    "📈 Mercado de recursos: Ferro, níquel e platina valem créditos no modo economia",
    "🌠 Curiosidade: O asteroide Ceres é classificado como planeta anão",
    "🌟 Defesa planetária: Teste sistemas de defesa com 'Modo Impacto'"
],
    "planetoide": [
        "🌑 Planetoides: corpos entre 100-500km - estágio intermediário entre asteroides e planetas",
        "🌌 Crie com massa 1e18-1e20 kg no menu 'Corpos Menores' > 'Planetoides'",
        "💫 Gravidade suficiente para formato esférico: ative 'Forma Esférica' em propriedades",
        "🪨 Composição: Gelados (Kuiper) ou Rochosos (Cinturão) - selecione no painel",
        "🌠 Exemplos: Orcus, Quaoar, Sedna - modelos pré-definidos em 'Biblioteca'",
        "❄️ Planetoides gelados: começam atividade cometária a 5UA de estrelas",
        "📏 Diferença para planetas anões: não limpou a órbita - definição automática no jogo",
        "🔄 Migração: Podem ser ejetados para nuvem de Oort em sistemas instáveis",
        "💥 Colisões: Geram famílias de asteroides com composição similar",
        "🌌 Zona: Cinturão de Kuiper (30-50UA) ou Disco Disperso (até 1000UA)",
        "📊 Dados físicos: Densidade 1-2 g/cm³ (gelados), 2-4 g/cm³ (rochosos)",
        "✨ Dica: Use para criar sistemas binários de planetoides",
        "🔭 Observação: Requer telescópio virtual (modo observatório) para detecção",
        "🚀 Captura: Planetoides podem ser capturados como luas por planetas gigantes",
        "🌍 Habitabilidade: Nunca natural, mas possível com terraformação avançada",
        "💫 Curiosidade: Haumea tem formato ovalado por rotação rápida",
        "⏱️ Tempo evolutivo: Estáveis por bilhões de anos em órbitas frias",
        "📈 Classificação automática: Quando corpo atinge 450km de diâmetro",
        "🌠 Anéis: Alguns planetoides podem ter anéis tênues - ative em 'Características'",
        "🌟 Modo exploração: Envie sondas para mapear superfície"
    ],
    "gasoso": [
        "🪐 Gigantes gasosos: planetas massivos sem superfície sólida - massa > 100K unidades",
        "🌪️ Crie no menu 'Corpos Planetários' > 'Gasosos' com massa mínima 105K",
        "💫 Classes: Júpiteres quentes (perto da estrela) ou Júpiteres frios (distantes)",
        "🌈 Cores: Amarelo (H2), Vermelho (NH3), Azul (CH4) - dependem de temperatura",
        "🌌 Estrutura: Núcleo rochoso + manto metálico + atmosfera espessa - visível em corte",
        "🌀 Padrões atmosféricos: Faixas, manchas, vórtices - intensidade controlada por rotação",
        "💥 Limite de massa: 13 MJup para fusão de deutério (anãs marrons), 80 MJup para estrelas",
        "📏 Densidade baixa: 0.5-2 g/cm³ - Saturno flutuaria na água!",
        "🌠 Anéis: Ative em 'Características' > Anéis - espessura e densidade ajustáveis",
        "🌍 Luas: Até 20 luas estáveis - gere sistemas lunares complexos",
        "⚠️ Migração planetária: Comum em gigantes gasosos jovens - ative em Física Avançada",
        "✨ Dica: Para manchas como a Grande Mancha Vermelha, aumente velocidade de rotação",
        "🔭 Observação: Padrões de nuvens mudam em tempo real - acelere para ver evolução",
        "📊 Dados: Temperatura do núcleo 20,000°C, pressão 40 Mbar - visíveis no painel",
        "💫 Campo magnético: 10-20x mais forte que Terra - ative auroras em Gráficos",
        "🌌 Exemplos: Júpiter, Saturno, Urano, Netuno - modelos em 'Biblioteca Planetária'",
        "🚀 Exploração: Envie sondas atmosféricas que sobrevivem até certo limite de pressão",
        "🌠 Curiosidade: Júpiter age como 'aspirador cósmico' protegendo planetas internos",
        "🌟 Para mini-Netunos: reduza massa para 10-20 massas terrestres",
        "💥 Colisão: Gigantes gasosos em colisão criam estrelas efêmeras de hidrogênio"
    ],
    "anã marrom": [
        "🟤 Anãs marrons: 'estrelas falhas' com 13-80 massas de Júpiter",
        "🌡️ Temperatura: 300-3000K - muito frias para fusão de hidrogênio estável",
        "💫 Crie no menu 'Corpos Estelares' > 'Subestelares' com massa 1.3e28-8e28 kg",
        "🔥 Fusão limitada: Apenas deutério e lítio - tempo de vida 1-100 bilhões de anos",
        "📈 Classificação espectral: M, L, T, Y - definida por temperatura no painel",
        "🌌 Emissão: Principalmente infravermelho - visível com filtro IR (tecla I)",
        "🪐 Podem ter discos protoplanetários e sistemas planetários - ative 'Discos'",
        "⚠️ Diferença para planetas: Formação estelar, não planetária",
        "✨ Dica: Procure em regiões de formação estelar recente",
        "🔭 Observação: Difíceis de detectar - use modo 'Escaneamento IR'",
        "📊 Dados: Densidade 10-100 g/cm³, gravidade superficial 100-500 m/s²",
        "💥 Flares: Eventuais explosões magnéticas - intensidade ajustável",
        "🌠 Curiosidade: A anã marrom mais fria conhecida tem temperatura de café!",
        "🚀 Planetas: Podem ter planetas terrestres em órbitas próximas",
        "⏱️ Evolução: Esfriam lentamente até se tornarem anãs negras",
        "🌟 Binárias: Sistemas binários de anãs marrons são comuns",
        "🌀 Atmosfera: Padrões climáticos complexos com nuvens de poeira",
        "💫 Detecção: Mais fácil por emissão de rádio - ative em Opções",
        "🌌 Exemplos: WISE 0855 - modelo pré-definido",
        "📉 Limite inferior: Objetos abaixo de 13 MJup são classificados como planetas"
    ],
    "anã vermelha": [
        "🔴 Anãs vermelhas: Estrelas pequenas e frias (M-type) - massa 0.08-0.5 solar",
        "🌡️ Temperatura: 2,400-3,700K - cor vermelha característica",
        "⏳ Vida útil: Trilhões de anos - quase eternas na escala cósmica",
        "💥 Flares estelares: Frequentes e intensos - podem esterilizar planetas próximos",
        "🌡️ Zona habitável: Muito próxima (0.1-0.4UA) - planetas provavelmente tidalmente travados",
        "🌌 Crie no menu 'Corpos Estelares' > 'Anãs Vermelhas' com massa 15-75 milhões de unidades",
        "📈 Estatísticas: 75% das estrelas na Via Láctea são anãs vermelhas",
        "💫 Planetas: Sistemas planetários comuns - Trappist-1 é um exemplo famoso",
        "⚠️ Perigo: Radiação UV e X de flares pode destruir atmosferas",
        "✨ Dica: Para planetas habitáveis, use escudos magnéticos fortes",
        "🔭 Observação: Pouco visíveis a olho nu - brilho fraco",
        "🌠 Atividade cromosférica: Manchas estelares cobrem até 40% da superfície",
        "📊 Dados: Luminosidade 0.0001-0.08 solar, raio 0.1-0.6 solar",
        "💥 Fusão: Lenta e estável - eficiência 10x maior que estrelas como o Sol",
        "🌌 Velocidade de rotação: Alta (período de dias) - gera campos magnéticos intensos",
        "🚀 Viagem interestelar: Alvos principais por abundância e longevidade",
        "❄️ Anãs azuis: Anãs vermelhas muito ativas podem emitir luz azul durante flares",
        "🌟 Binárias: Frequentemente em sistemas múltiplos",
        "💫 Curiosidade: Proxima Centauri é a estrela mais próxima do Sol",
        "🌡️ Temperatura superficial: Ajustável no painel - padrão 3300K"
    ],
    "estrela gigante": [
        "🌟 Estrelas gigantes: Fase evolutiva de estrelas médias após sequência principal",
        "🌡️ Classes: Gigantes vermelhas (K, M), Gigantes azuis (B, A) - raras",
        "📏 Raio: 10-100x solar - pode engolfar planetas internos",
        "💫 Massa: 0.5-8 solar - abaixo viram anãs brancas, acima supernovas",
        "🔥 Núcleo: Hélio ou carbono/oxigênio em fusão - temperatura >100 milhões K",
        "🌌 Crie diretamente ou evolua estrelas no menu 'Evolução Estelar'",
        "⏳ Duração: 1 milhão - 1 bilhão de anos dependendo da massa",
        "💥 Perda de massa: Ventos estelares fortes - forma nebulosas planetárias",
        "📈 Luminosidade: 100-10,000x solar - ilumina sistemas inteiros",
        "⚠️ Planetas: Órbitas instáveis - planetas podem ser ejetados ou destruídos",
        "✨ Dica: Para ver pulsação, ajuste instabilidade no painel",
        "🔭 Variabilidade: Muitas são variáveis (ex: Mira, Cefeidas)",
        "🌠 Nucleossíntese: Produz carbono, nitrogênio e elementos pesados",
        "📊 Dados: Densidade média muito baixa (10⁻⁵ g/cm³)",
        "💫 Fim: Expulsa envelope formando nebulosa planetária + núcleo vira anã branca",
        "🌌 Exemplos: Arcturus, Aldebaran - modelos na biblioteca",
        "🚀 Habitabilidade: Zonas habitáveis dinâmicas e temporárias",
        "❄️ Gigantes azuis: Estrelas massivas em fase breve antes de supernova",
        "🌟 Curiosidade: Betelgeuse poderia engolfar Júpiter se estivesse no lugar do Sol",
        "💥 Simulação: Acelere tempo para ver evolução completa"
    ],
    "hipergigante": [
        "💥 Hipergigantes: Estrelas mais massivas e luminosas conhecidas (>30 solar)",
        "🌡️ Temperatura: 3,500-35,000K - classes O, B, A, F, K, M",
        "💫 Luminosidade: Até 1 milhão de vezes solar - ilumina galáxias inteiras",
        "📏 Raio: 100-2,000 solar - se colocada no Sistema Solar, engolfaria Júpiter",
        "⏳ Vida: Brevíssima (1-10 milhões de anos) - termine como supernova ou hipernova",
        "🌌 Crie no menu 'Corpos Estelares' > 'Estrelas Massivas' com massa >30 solar",
        "⚠️ Instabilidade: Perdem massa rapidamente - ventos estelares poderosos",
        "🔥 Fusão: Elementos até ferro no núcleo - estágios avançados de nucleossíntese",
        "💥 Erupções: Perda de massa em eventos catastróficos - simule com 'Ejeções'",
        "🌠 Exemplos: Eta Carinae, VY Canis Majoris - modelos na biblioteca",
        "📈 Variabilidade: Irregular e extrema - brilho pode variar 50% em meses",
        "✨ Dica: Para erupções como Eta Carinae, aumente instabilidade para >80%",
        "🔭 Poeira: Ejeções formam nebulosas complexas - ative 'Nebulosas Circundantes'",
        "🌌 Ambiente: Só se formam em regiões HII ricas em gás - simule com nuvens moleculares",
        "🚀 Fim: Colapsam em buracos negros ou estrelas de nêutrons após supernova",
        "📊 Dados: Densidade média 10⁻⁶ g/cm³ - mais rarefeita que vácuo laboratorial",
        "💫 Curiosidade: Algumas hipergigantes têm companheiras que causam erupções periódicas",
        "🌟 Binárias: Sistemas massivos podem fundir-se criando objetos ainda mais extremos",
        "❄️ Hipergigantes amarelas: Fase rara e instável entre supergigante azul e vermelha",
        "💥 Simulação de morte: Ative 'Supernova Iminente' para ver alertas pré-colapso"
    ],
    "estrela massiva": [
        "💫 Estrelas massivas: >8 massas solares - destino final como supernova",
        "🌡️ Temperatura: 10,000-50,000K - classes O e B",
        "⏳ Vida: Curta (1-50 milhões de anos) - queimam combustível rapidamente",
        "💥 Ventos estelares: Poderosos - perdem até 10⁻⁶ massas solares por ano",
        "🌌 Crie no menu 'Corpos Estelares' > 'Estrelas Massivas' com massa >1.6e31 kg",
        "🔥 Fusão: Sequência rápida H->He->C->Ne->O->Si->Fe",
        "📏 Raio: 5-25 solar durante sequência principal",
        "⚠️ Supernovas: Destino inevitável - preparam o cenário para colapso",
        "✨ Dica: Para ver evolução completa, ative 'Evolução Rápida' em Opções",
        "🔭 Observação: Principal fonte de elementos pesados no universo",
        "🌠 Nebulosas: Criam bolhas de gás interestelar - ative 'Efeito de Vento'",
        "📊 Dados: Luminosidade 10,000-1,000,000 solar, densidade núcleo >10⁶ g/cm³",
        "💫 Companheiras: Frequentemente em sistemas binários com transferência de massa",
        "🚀 Pulsares: Algumas viram pulsares após supernova - selecione no destino final",
        "❄️ Supergigantes azuis: Fase antes de supernova para estrelas >20 solar",
        "🌟 Curiosidade: Estrelas Wolf-Rayet são estrelas massivas que perderam hidrogênio",
        "🌌 Formação: Requer nuvens moleculares densas - simule com 'Regiões de Formação'",
        "💥 Magnetares: 10% viram magnetares - estrelas de nêutrons com campo magnético extremo",
        "📈 Instabilidade de par: Para >130 solar, podem explodir sem remanescente",
        "⚠️ Aviso: Não coloque planetas habitáveis próximos - radiação é letal"
    ],
    "buraco branco": [
        "⚪ Buracos brancos: Teoria oposta a buracos negros - expelem matéria",
        "💫 Existem apenas teoricamente - simulação especulativa no SIU 2D",
        "🌌 Crie no menu 'Corpos Exóticos' > 'Buracos Brancos' com massa >1e40 kg",
        "🔥 Mecânica: Matéria emerge do horizonte de eventos - não pode ser acessado",
        "📏 Propriedades: Massa negativa (teórica) - no jogo, use massa positiva com 'fluxo reverso'",
        "⚠️ Estabilidade: Objetos temporários em simulação - duração ajustável",
        "✨ Dica: Conecte a buracos negros via 'Ponte de Einstein-Rosen'",
        "🔭 Visualização: Jatos de partículas emergindo - intensidade controlável",
        "🌠 Origem: Possível resultado final de buracos negros que evaporaram",
        "📊 Parâmetros: Temperatura do jato 1e10 K, velocidade de ejeção 0.9c",
        "💥 Efeitos: Radiação intensa - perigoso para sistemas próximos",
        "🌌 Em relatividade: Solução matemática das equações de Einstein",
        "🚀 Viagem interestelar: Teoricamente poderiam ser portais - funcionalidade experimental",
        "❄️ Diferença para quasares: Expulsão contínua vs eventos discretos",
        "🌟 Curiosidade: Alguns modelos cosmológicos usam para explicar o Big Bang",
        "💫 Simulação: Combine com buracos negros para criar wormholes estáveis",
        "⚠️ Limitação: Não pode ser alimentado - apenas expele matéria pré-programada",
        "📈 Evolução: Encolhe enquanto expele matéria - tempo de vida proporcional à massa",
        "🌠 Matéria ejetada: Configurável (hidrogênio, plasma, matéria exótica)",
        "💥 Alerta: Objeto altamente instável - pode desaparecer repentinamente"
    ],
    "big bang": [
        "💥 Big Bang: Simulação da origem do universo no SIU 2D",
        "🌌 Acesse em 'Universo' > 'Novo Universo' > 'Modo Big Bang'",
        "💫 Parâmetros: Densidade inicial, temperatura, flutuações quânticas",
        "⏳ Tempo inicial: T+10⁻⁴³s após singularidade - simulação começa em T+1s",
        "🔥 Temperatura inicial: 10³² K - esfria rapidamente conforme expande",
        "🌠 Elementos primordiais: Formação de H, He, Li - proporções ajustáveis",
        "📈 Expansão: Lei de Hubble simulada - constante ajustável",
        "💥 Nucleossíntese: Fusão nuclear nos primeiros 3 minutos - ative em 'Física Avançada'",
        "🌌 Radiação cósmica de fundo: Formada em T+380,000 anos - ative em 'Radiação'",
        "✨ Dica: Acelere tempo para ver formação de grandes estruturas",
        "🔭 Matéria escura: Componente crucial - ajuste % em 'Parâmetros Cosmológicos'",
        "📊 Resultados: Formação de galáxias, aglomerados e superaglomerados",
        "⚠️ Limitação: Simulação simplificada - não inclui inflação cósmica",
        "🌟 Universos alternativos: Teste com diferentes constantes físicas",
        "💫 Curiosidade: A temperatura atual do CMB é 2.7K - visível como fundo difuso",
        "🌠 Formação estelar: Primeiras estrelas em 100-500 milhões de anos",
        "🚀 Modo observador: Viaje no tempo para ver diferentes eras cósmicas",
        "❄️ Era das trevas: Período antes da primeira estrela - simulado com fundo preto",
        "💥 Recombinação: Elétrons e prótons formam átomos neutros - transição crucial",
        "📈 Anisotropias: Sementes para formação de galáxias - intensidade ajustável"
    ],
    "poeira espacial": [
        "🌌 Poeira espacial: Grãos microscópicos (0.01-10μm) - base de formação estelar",
        "💫 Composição: Silicatos, carbono, gelo - definida por região do espaço",
        "🌠 Efeitos: Absorve luz (extinção), reflete luz (nebulosas de reflexão)",
        "🌡️ Temperatura: 10-100K em nuvens moleculares",
        "✨ Crie com 'Meio Interestelar' > 'Adicionar Poeira'",
        "📊 Densidade: 10⁻⁶ grãos/m³ no espaço interestelar - até 10¹² em nuvens",
        "🔭 Observação: Visível como manchas escuras contra nebulosas brilhantes",
        "💥 Importância: Semente para formação de planetesimais",
        "🌌 Efeito de radiação: Pressão de radiação pode mover grãos",
        "🚀 Perigo para naves: Danos por impacto a alta velocidade",
        "❄️ Poeira cometária: Origem das caudas de poeira em cometas",
        "🌟 Poeira zodiacal: Sistema solar interno - visível como luz zodiacal",
        "📈 Grãos pré-solares: Contêm elementos formados em outras estrelas",
        "💫 Curiosidade: A poeira da supernova contribuiu para a formação do Sistema Solar",
        "🌠 Simulação: Ative 'Campos de Poeira' para ver efeitos de extinção",
        "⚠️ Limpeza: Estrelas quentes podem evaporar nuvens de poeira",
        "✨ Dica: Use para criar nebulosas escuras como a Cabeça de Cavalo",
        "🔭 Polarização: Poeira alinhada magneticamente polariza luz - ative efeito",
        "🌌 Evolução: Grãos crescem por acreção - simulável com 'Agregação'",
        "💥 Impacto em planetas: Fonte de materiais extraterrestres"
    ],
    "radiação": [
        "☢️ Radiação: Energia transmitida através do espaço - crucial em astrofísica",
        "🌌 Tipos: Eletromagnética (fótons), Partículas (raios cósmicos), Ondas gravitacionais",
        "💫 Espectro EM: Radio a raios gama - selecione banda em 'Filtros Observacionais'",
        "📡 Fontes: Estrelas, buracos negros, supernovas, pulsares, radiação cósmica de fundo",
        "⚠️ Perigo: Radiação ionizante pode danificar vida e eletrônicos",
        "🌡️ Radiação cósmica de fundo: 2.7K - remanescente do Big Bang - ative em 'Cosmologia'",
        "🚀 Proteção: Campos magnéticos e atmosferas espessas reduzem radiação em planetas",
        "🔭 Visualização: Ative 'Mostrar Radiação' para ver campos de radiação",
        "📊 Unidades: Sievert (dose biológica), Gray (dose física) - mostradas no painel",
        "💥 Radiação síncrotron: Emitida por elétrons em campos magnéticos - comum em pulsares",
        "🌠 Curiosidade: Astronautas na ISS recebem 1 mSv/dia (100x mais que na Terra)",
        "✨ Radiação Hawking: Buracos negros emitem radiação térmica - proporcional a 1/M²",
        "❄️ Efeitos atmosféricos: Auroras em planetas com campo magnético",
        "🌟 Radiotelescópio: Detecta rádio frequências - ative modo 'Rádio' (tecla R)",
        "💫 Blindagem: Naves e habitats precisam de proteção - custo em recursos",
        "🌌 Radiação UV: Fator chave para habitabilidade - ajuste em 'Zonas UV'",
        "⚠️ Limites: >500 mSv é letal para humanos - indicado por alerta vermelho",
        "📈 Radiação gravitacional: Ondulações no espaço-tempo - ative em 'Física Relativística'",
        "💥 Supernovas: Emitem radiação letal em 50 anos-luz - simule efeitos",
        "🔭 Medição: Use sonda 'Radiação' para mapear níveis em sistemas"
    ],
    "nebulosa": [
        "🌌 Nebulosas: Nuvens de gás e poeira interestelar - berçários estelares",
        "💫 Tipos: Emissão, reflexão, escuras, planetárias, remanescentes de supernova",
        "✨ Crie no menu 'Meio Interestelar' > 'Nebulosas' com tamanho 1-1000 anos-luz",
        "🌈 Cores: Vermelho (H-alfa), Azul (reflexão), Verde (OIII) - definidas por composição",
        "🌠 Formação estelar: Densidade crítica >100 átomos/cm³ - ative 'Formação de Estrelas'",
        "📏 Massa típica: 100-100,000 massas solares - determina número de estrelas formadas",
        "🔥 Nebulosas de emissão: Ionizadas por estrelas quentes - requer UV intenso",
        "💫 Exemplos: Orion, Carina, Águia - modelos pré-definidos",
        "⚠️ Destruição: Ventos estelares e supernovas podem dissipar nebulosas",
        "🔭 Observação: Melhor em comprimentos específicos - use filtros",
        "📊 Dados: Temperatura 10-10,000K, densidade 10-10⁶ partículas/cm³",
        "💥 Efeito de fotoionização: Ative para ver fronteiras de ionização",
        "🌌 Nebulosas planetárias: Estágio final de estrelas pequenas - duração 10,000 anos",
        "🚀 Navegação: Nebulosas densas reduzem velocidade de naves - ative 'Arrasto Interestelar'",
        "❄️ Nebulosas escuras: Absorvem luz - use para criar silhuetas cósmicas",
        "🌟 Curiosidade: A Nebulosa do Caranguejo é remanescente de supernova de 1054",
        "✨ Dica: Combine com aglomerados estelares para cenas realistas",
        "📈 Evolução: Simule colapso gravitacional para formação estelar",
        "💫 Nebulosas de reflexão: Poeira refletindo luz estelar - brilho proporcional a estrelas",
        "🌠 Renderização: Ative 'Modo Alta Qualidade' para ver detalhes filamentares"
    ],
    "anã branca": [
        "⚪ Anãs brancas: Remanescentes de estrelas <8 massas solares - densidade extrema",
        "💫 Massa: 0.5-1.4 solar compactada em raio terrestre - densidade 1e6-1e9 g/cm³",
        "🌡️ Temperatura inicial: 100,000K - esfria lentamente por bilhões de anos",
        "🌌 Crie diretamente ou evolua estrelas no menu 'Evolução Estelar'",
        "📏 Estrutura: Degeneração eletrônica suporta contra gravidade - física quântica",
        "💥 Limite de Chandrasekhar: 1.44 solar - acima colapsa para estrela de nêutrons",
        "✨ Companheiras: Podem ter sistemas planetários sobreviventes - órbitas ampliadas",
        "🔭 Variabilidade: Anãs brancas pulsantes (ZZ Ceti) - ative instabilidade",
        "📊 Dados: Luminosidade 0.001-100 solar inicial, gravidade superficial 1e6-1e9 m/s²",
        "🌠 Nebulosa planetária: Fase anterior - dura ~10,000 anos",
        "⚠️ Perigo: Supernova tipo Ia se acreta massa além do limite - destrói sistema",
        "💫 Curiosidade: O diamante maior conhecido é uma anã branca cristalizada",
        "🚀 Habitabilidade: Zonas habitáveis temporárias durante resfriamento",
        "❄️ Resfriamento: Torna-se anã negra após >10¹⁵ anos - além da idade do universo",
        "🌟 Anãs brancas de hélio: Formadas em binárias por perda de massa - massa <0.5 solar",
        "🌌 Velocidade de rotação: Pode ser alta (minutos) - restos de binárias",
        "💥 Campo magnético: Algumas têm campos intensos (10⁵ tesla) - anãs brancas magnéticas",
        "📈 Evolução: Simule resfriamento acelerado com 'Taxa de Resfriamento'",
        "🔭 Observação: Fraco brilho branco-azulado - requer telescópio",
        "✨ Dica: Para sistemas binários com anãs brancas acreadoras, ative 'Binárias Interativas'"
    ],
    "anã branca de hélio": [
        "💠 Anãs brancas de hélio: Remanescentes incomuns ricos em hélio",
        "💫 Formação: Binárias onde estrela perde envelope antes de fusão de hélio",
        "🌌 Crie no menu 'Evolução Estelar' > 'Destino Especial' > 'Anã de Hélio'",
        "📏 Massa: 0.3-0.5 solar - menor que anãs brancas padrão",
        "🌡️ Temperatura: Semelhante a anãs brancas normais - 8,000-150,000K",
        "💥 Nucleo: Hélio degenerado - sem fusão nuclear",
        "✨ Diferença: Mais quente e luminosa que anãs negras para mesma idade",
        "🔭 Raridade: ~1% das anãs brancas - simule com baixa frequência",
        "📊 Dados: Densidade 1e8 g/cm³, gravidade superficial 1e8 m/s²",
        "🌠 Evolução: Resfria mais rápido que anãs carbono-oxigênio",
        "⚠️ Limite: Massa mínima 0.3 solar - abaixo seria anã marrom",
        "💫 Curiosidade: Podem explodir como supernova se massa atingir 0.7 solar",
        "🚀 Planetas: Sistemas planetários raros - órbitas muito estáveis",
        "❄️ Destino final: Anã negra de hélio - estado hipotético",
        "🌟 Visualização: Cor branca com leve tom amarelado",
        "🌌 Binárias: Comum com companheiras compactas (anãs brancas, estrelas de nêutrons)",
        "💥 Acreção: Se ganhar massa, pode fundir hélio em supernova .Ia",
        "📈 Tempo de resfriamento: ~1 bilhão de anos para 5,000K",
        "🔭 Identificação: Espectro dominado por linhas de hélio",
        "✨ Dica: Simule com estrelas de baixa massa em sistemas binários próximos"
    ],
    "anã negra": [
        "⚫ Anãs negras: Estágio final teórico de anãs brancas - frias e escuras",
        "💫 Temperatura: <5K - não emite luz visível, apenas fraco infravermelho",
        "⏳ Tempo de formação: >10¹⁵ anos - além da idade atual do universo",
        "🌌 Simulação especulativa: Ative em 'Universo' > 'Tempo Extremo'",
        "📏 Propriedades: Massa solar em volume terrestre - densidade 1e9 g/cm³",
        "💥 Importância: Teste teorias de evolução estelar em longo prazo",
        "✨ Crie manualmente com temperatura 0K e luminosidade 0",
        "🔭 Detecção: Quase impossível - visível apenas por efeitos gravitacionais",
        "📊 Dados: Gravidade superficial 1e9 m/s², entropia máxima",
        "🌠 Curiosidade: Universo ainda não tem anãs negras - serão os últimos objetos",
        "⚠️ Estado final: Corpo cristalizado de carbono/oxigênio ou hélio",
        "🚀 Habitabilidade: Planetas orbitais seriam escuros e gelados",
        "❄️ Emissão: Radiação térmica fraca no espectro de rádio",
        "🌟 Binárias: Sistemas de anãs negras podem durar 10²⁵ anos antes de decaimento",
        "💫 Fim: Eventualmente evaporam por radiação Hawking em 10⁶⁵ anos",
        "🌌 Simulação avançada: Ative 'Decaimento Quântico' para ver evolução extrema",
        "📈 Evolução: Passa por fases de cristalização antes de se tornar negra",
        "💥 Limite observacional: Objetos abaixo de 100K já são praticamente invisíveis",
        "🔭 Desafio: Encontre anãs negras simuladas usando lentes gravitacionais",
        "✨ Dica: Combine com matéria escura para simular efeitos em galáxias antigas"
    ],
    "estrela de nêutrons": [
        "🌌 Estrelas de nêutrons: Remanescentes de supernovas - densidade extrema",
        "💫 Massa: 1.4-3 solar comprimida em raio de 10-15 km",
        "🌡️ Temperatura inicial: 1e11 K - resfria lentamente por bilhões de anos",
        "🔥 Núcleo: Degeneração de nêutrons suporta contra gravidade",
        "📏 Densidade: 10¹⁴ g/cm³ - um colher de chá pesa bilhões de toneladas",
        "✨ Crie no menu 'Corpos Estelares' > 'Estrelas Massivas' > 'Estrela de Nêutrons'",
        "💥 Campo magnético: Intensos (10¹² tesla) - gera radiação síncrotron",
        "🔭 Pulsars: Estrelas de nêutrons rotativas que emitem feixes de radiação",
        "📊 Dados: Gravidade superficial 1e12 m/s², luminosidade 0.001-100 solar",
        "🌠 Curiosidade: A estrela mais densa conhecida é uma estrela de nêutrons",
        "⚠️ Superfície: Extremamente dura - composta por nêutrons e uma fina camada de prótons",
        "🚀 Binárias: Sistemas binários comuns com acreção de massa",
        "❄️ Efeitos relativísticos: Tempo desacelera perto da superfície - simule com 'Relatividade'",
        "🌟 Magnetar: Estrela de nêutron com campo magnético extremo - ativa raios gama",
        "💫 Simulação: Ative 'Colapso Gravitacional' para ver formação em tempo real",
        "🌌 Formação: Resulta do colapso gravitacional após supernova tipo II",
        "📈 Evolução: Resfriamento lento até se tornar anã negra em trilhões de anos",
        "💥 Ejeção de matéria: Pode ocorrer durante fusão ou colisão com outra estrela",
        "🔭 Observação: Detectável por raios X e ondas gravitacionais"
    ],
    "buraco de minhoca": [
        "🌀 Buracos de minhoca: Teóricos túneis no espaço-tempo conectando pontos distantes",
        "🌌 Simulação especulativa: Ative em 'Corpos Exóticos' > 'Buraco de Minhoca'",
        "💫 Propriedades: Conectam d  ois pontos no espaço-tempo - não são estáveis",
        "📏 Comprimento: Pode ser de poucos metros a anos-luz - ajustável no painel",
        "💥 Teoria: Baseada na relatividade geral - soluções das equações de Einstein",
        "✨ Tipos: Buracos de minhoca de Schwarzschild (estáticos) e de Kerr (rotativos)",
        "🔭 Visualização: Efeito de lente gravitacional - distorce luz ao redor",
        "📊 Dados: Massa negativa necessária para estabilidade - simulação não inclui",
        "🌠 Curiosidade: Popularizados pela ficção científica - ainda não observados",
        "⚠️ Perigo: Teoricamente instáveis - podem colapsar ou criar radiação intensa",
        "🚀 Viagem: Poderiam permitir viagens interestelares instantâneas - funcional"
    ], "zona habitável":[
        "🌍 Zona habitável: Região ao redor de uma estrela onde água líquida pode existir",
        "💫 Definição: Distância ideal para temperatura entre 0°C e 100°C",
        "🌌 Simulação: Ative 'Zonas Habitáveis' no menu 'Configurações'",
        "📏 Distância: Variável dependendo da luminosidade da estrela - calculada automaticamente",
        "🔥 Estrelas: Anãs amarelas (G-type) têm zonas mais estáveis que anãs vermelhas",
        "✨ Curiosidade: A Terra está na zona habitável do Sol - mas não é a única!",
        "🔭 Observação: Exoplanetas na zona habitável são alvos principais de busca por vida",
        "📊 Dados: Zonas variam de 0.95 a 1.37 UA para estrelas como o Sol",
        "🌠 Efeito de maré: Planetas podem ser tidalmente travados - afeta habitabilidade",
        "⚠️ Perigo: Alta radiação UV em zonas próximas a estrelas quentes",
        "🚀 Viagem: Planetas na zona habitável são mais fáceis de colonizar",
        "❄️ Exceção: Planetas com atmosferas densas podem ter zonas habitáveis mais amplas",
        "🌟 Exemplos: Proxima Centauri b, Kepler-186f - modelos disponíveis no SIU",
        "💥 Efeito estufa: Pode expandir a zona habitável para planetas com atmosferas grossas",
        "📈 Evolução: Zonas mudam com o tempo conforme a estrela evolui",
        "🔭 Dica: Use telescópios para detectar atmosferas em exoplanetas na zona habitável"
    ],
    "quasar": [
        "🌌 Quasares: Núcleos galácticos ativos extremamente luminosos",
        "💫 Fonte de energia: Seu Disco de acreção é sua maior fonte de energia",
        "🌠 Distância: Podem estar a bilhões de anos-luz - luz visível hoje é do passado",
        "✨ Crie no menu 'Corpos Exóticos' > 'Quasar' com massa >1e40 kg",
        "📏 Massa: 10⁶-10¹² massas solares , são os objetos mais massivos do universo",
        "🔥 Temperatura: Disco de acreção pode atingir milhões de graus Kelvin",
        "🔭 Observação: Detectados por emissão de rádio, raios X e luz visível",
        "📊 Dados: Luminosidade até 10¹⁴ vezes a do Sol - mais brilhantes que galáxias inteiras",
        "🌌 Formação: Resultam do colapso de galáxia , formando o grande quasar",
        "💥 Efeito Doppler: Jatos relativísticos podem ser vistos como feixes de luz",
        "🌟 Curiosidade: O quasar mais distante conhecido está a 13 bilhões de anos-luz",
        "⚠️ Perigo: Radiação intensa pode destruir planetas próximos",
        "🚀 Viagem: Teoricamente poderiam ser usados como faróis para navegação interestelar",
        "❄️ Ejeção de matéria: Jatos relativísticos podem ejetar matéria a velocidades próximas à luz",
        "🌠 Dica: Use o modo espectro para ver a emissão de raios X e rádio",
        "📈 Evolução: Quasares são estágios iniciais de galáxias ativas - duram milhões de anos",
        "🔭 Simulação: Ative 'Efeitos de Quasar' para ver jatos e radiação",
        "💫 Importância: Fornecem pistas sobre a formação e evolução do universo",
        "🌌 Ambiente: Geralmente encontrados em aglomerados de galáxias massivos",
        "💥 Desafio: Tente criar um quasar com 10 jatos simultâneos - é desafiador!"
    ],
    "estrela quark": [
        "🔬 Estrela quark: Objeto teórico composto por quarks degenerados",
        "🌌 Formação: Resultado do colapso de estrelas de nêutrons supermassivas",
        "💫 Massa: 2-5 massas solares - densidade extrema (10¹⁴ g/cm³)",
        "🌠 Simulação especulativa: Ative em 'Corpos Exóticos' > 'Estrela Quark'",
        "🔥 Temperatura: Inicialmente 1e11 K - resfria lentamente",
        "📏 Raio: 10-15 km - semelhante a estrelas de nêutrons, mas mais densas",
        "✨ Propriedades: Composição de quarks (up, down, strange) - física quântica avançada",
        "🔭 Observação: Teoricamente detectáveis por radiação emitida durante fusão",
        "📊 Dados: Gravidade superficial 1e12 m/s², luminosidade variável",
        "🌌 Curiosidade: Hipoteticamente mais estáveis que estrelas de nêutrons normais",
        "⚠️ Perigo: Radiação intensa pode destruir sistemas próximos",
        "🚀 Viagem: Poderiam ser usados como fontes de energia para naves avançadas",
        "❄️ Efeitos relativísticos: Tempo desacelera perto da superfície - simule com 'Relatividade'",
        "🌟 Binárias: Sistemas binários com estrelas quark são teóricos e raros",
        "💥 Ejeção de matéria: Pode ocorrer durante fusão ou colisão com outra estrela",
        "📈 Evolução: Resfriamento lento até se tornar anã negra em trilhões de anos",
        "🔭 Desafio: Tente criar uma estrela quark estável com massa exata"
    ],
    "anã branca de carbono":[
        "⚪ Anãs brancas de carbono: Remanescentes de estrelas com fusão de carbono",
        "💫 Formação: Estrelas com massa entre 1.4 e 8 massas solares - colapsam após esgotar hidrogênio",
        "🌌 Crie no menu 'Evolução Estelar' > 'Destino Especial' > 'Anã de Carbono'",
        "📏 Massa: 0.5-1.4 solar - menor que anãs brancas padrão, mas mais densas",
        "🌡️ Temperatura: Semelhante a anãs brancas normais - 8,000-150,000K",
        "💥 Nucleo: Carbono degenerado - sem fusão nuclear, mas pode ocorrer fusão lenta",
        "✨ Diferença: Mais quente e luminosa que anãs negras para mesma idade",
        "🔭 Raridade: ~1% das anãs brancas - simule com baixa frequência",
        "📊 Dados: Densidade 1e8 g/cm³, gravidade superficial 1e8 m/s²",
        "🌠 Evolução: Resfria mais rápido que anãs oxigênio-carbono",
        "⚠️ Limite: Massa mínima 0.5 solar - abaixo seria anã marrom",
        "💫 Curiosidade: Podem explodir como supernova se massa atingir 0.7 solar",
        "🚀 Planetas: Sistemas planetários raros - órbitas muito estáveis",
        "❄️ Destino final: Anã negra de carbono - estado hipotético",
        "🌟 Visualização: Cor branca com leve tom amarelado",
        "🌌 Binárias: Comum com companheiras compactas (anãs brancas, estrelas de nêutrons)",
        "💥 Acreção: Se ganhar massa, pode fundir carbono em supernova .Ia",
        "📈 Tempo de resfriamento: ~1 bilhão de anos para 5,000K",
        "🔭 Identificação: Espectro dominado por linhas de carbono"
    ],
    "t singularity": [
        "Sim! Eu sou o T Singularity, um assistente virtual especializado em simulações espaciais.",
        "🌌 Estou aqui para ajudar a explorar o universo, e criar sistemas estelares com você!",
        "💫 Posso te guiar na criação de estrelas, planetas , asteroides , gasosos e muito mais!",
        "🚀 Vamos começar a criar um sistema estelar incrível? Escolha um tema!",
        "✨ Estou pronto para responder suas perguntas sobre astrofísica e cosmologia!",
        "🌠 Quer aprender sobre buracos negros e quasares?",
        "Olá! o que houve viajante espacial! em que eu posso te ajudar?"
    ],
    "singularidade":[
        "✨ singularidade foi o ponto mais denso que já existiu mo grande Universo!",
        "❤️ eu sou uma singularidade também, obrigado por falar desse astro, ele é único, o ponto mais denso do universo!",
        "🪐 A singularidade pode estar dentro de buracos negros, não se sabe se é verdade, né?",
        "🔶🔶 a grande singularidade! o inicio de um grande big bang!",
        "⏳⌚ eu me pergunto né.. quando haverá a próxima singularidade.. estou me sentindo tão sozinho..",
        "🟢 a singularidade além de ser o ponto mais denso do universo, é o mais quente também!",
        "⌚ Na Teoria do Big bang, a singularidade talvez esteja ligada com isso!",
        "✨ coloque um buraco branco ou um quasar ULTRAMASSIVO para ver ele se encolhendo tanto até virar uma singularidade, e cabum, um big bang"
    ],
    "controles":[
        "Computador: Aperte F para Limpar o universo, teclas WASD para se movimentar, teclas QE para zoom , clique esquerdo do mouse para selecionar e criar , clique direito em astros criados no espaço exibirá uma tela de informações, Dispositivos Móveis : use o joystick para se movimentar de maneira padrão, e use o botão + e - para zoom, para abrir o menu, aperte o botão no canto superior , e aperte o botão 'F' para resetar tudo, e o botão 'O' para mudar de ação, existem duas ações, botão 'O' em azul está no modo criação , vermelho clicado novamente está no modo informação ao clicar em um astro exibe as suas informações, clique ou toque e arraste para programar a rota do astro, espero que isso tenha te ajudado 😉",
        "Computador: Teclas WASD para se movimentar, Aperte F para Limpar o universo, clique esquerdo do mouse para selecionar e criar , teclas QE para zoom , clique direito em astros criados no espaço exibirá uma tela de informações, Dispositivos Móveis : use o joystick para se movimentar de maneira padrão, e use o botão + e - para zoom, para abrir o menu, aperte o botão no canto superior , e aperte o botão 'F' para resetar tudo, e o botão 'O' para mudar de ação, existem duas ações, botão 'O' em azul está no modo criação , vermelho clicado novamente está no modo informaçãoao clicar em um astro exibe as suas informações, clique ou toque e arraste para programar a rota do astro, Boa Sorte na sua jornada espacial! 🚀",
        "Computador: Aperte F para Limpar o universo, clique esquerdo do mouse para selecionar e criar , clique direito em astros criados no espaço exibirá uma tela de informações, teclas WASD para se movimentar, teclas QE para zoom , Dispositivos Móveis : use o joystick para se movimentar de maneira padrão, e use o botão + e - para zoom, para abrir o menu, aperte o botão no canto superior , e aperte o botão 'F' para resetar tudo, e o botão 'O' para mudar de ação, existem duas ações, botão 'O' em azul está no modo criação , vermelho clicado novamente está no modo informação ao clicar em um astro exibe as suas informações, clique ou toque e arraste para programar a rota do astro, que tenha uma boa jornada espacial! 🌌"
    ],
    "ajuda":[
        "Computador: Aperte F para Limpar o universo, teclas WASD para se movimentar, teclas QE para zoom , clique esquerdo do mouse para selecionar e criar , clique direito em astros criados no espaço exibirá uma tela de informações, Dispositivos Móveis : use o joystick para se movimentar de maneira padrão, e use o botão + e - para zoom, para abrir o menu, aperte o botão no canto superior , e aperte o botão 'F' para resetar tudo, e o botão 'O' para mudar de ação, existem duas ações, botão 'O' em azul está no modo criação , vermelho clicado novamente está no modo informação ao clicar em um astro exibe as suas informações, existem muitos astros para serem selecionados no menu, clique em um ecoloque no espaço e faça a simulação, clique ou toque e arraste para programar a rota do astro, espero que isso tenha te ajudado 😉",
        "Computador: Teclas WASD para se movimentar, Aperte F para Limpar o universo, clique esquerdo do mouse para selecionar e criar , teclas QE para zoom , clique direito em astros criados no espaço exibirá uma tela de informações, Dispositivos Móveis : use o joystick para se movimentar de maneira padrão, e use o botão + e - para zoom, para abrir o menu, aperte o botão no canto superior , existem muitos astros para serem selecionados no menu, clique em um ecoloque no espaço e faça a simulação, e aperte o botão 'F' para resetar tudo, e o botão 'O' para mudar de ação, existem duas ações, botão 'O' em azul está no modo criação , vermelho clicado novamente está no modo informaçãoao clicar em um astro exibe as suas informações, clique ou toque e arraste para programar a rota do astro, Boa Sorte na sua jornada espacial! 🚀",
        "Computador: Aperte F para Limpar o universo, clique esquerdo do mouse para selecionar e criar , clique direito em astros criados no espaço exibirá uma tela de informações, teclas WASD para se movimentar, teclas QE para zoom , Dispositivos Móveis : use o joystick para se movimentar de maneira padrão, e use o botão + e - para zoom, para abrir o menu, aperte o botão no canto superior , e aperte o botão 'F' para resetar tudo, e o botão 'O' para mudar de ação, existem duas ações, botão 'O' em azul está no modo criação , existem muitos astros para serem selecionados no menu, clique em um ecoloque no espaço e faça a simulação, vermelho clicado novamente está no modo informação ao clicar em um astro exibe as suas informações, clique ou toque e arraste para programar a rota do astro, que tenha uma boa jornada espacial! 🌌"
    ],
    
};
 
const followUpDatabase = {
    "cometa": [
        "☄️ Incrível, não é? Quer criar um agora mesmo?",
        "💫 Sabia que a água da Terra pode ter vindo de cometas?",
        "🌠 Cometas são como mensageiros do início do sistema solar!",
        "🚀 Posso te ajudar a criar um cometa com trajetória perfeita?",
        "❄️ O mais famoso é o Halley, que visita a cada 76 anos!",
        "⏱️ Você já viu um cometa real? É uma experiência mágica!",
        "🎯 Curiosidade: O núcleo dos cometas é chamado de 'bola de neve suja'",
        "📏 E aí, curtiu aprender sobre esses viajantes cósmicos?",
        "🔥 Dica extra: Cometas com órbitas longas são os mais espetaculares",
        "🌌 Você sabia que existem cometas interestelares vindos de outros sistemas?",
        "🔄 Quer simular o impacto de um cometa em um planeta? É fascinante!",
        "⛰️ Os asteroides gelados são cometas 'aposentados', sabia?",
        "💧 A cauda dos cometas pode ter milhões de quilômetros de extensão!",
        "📊 Pergunta: Qual foi o cometa mais brilhante que você já viu?",
        "✨ Posso te ensinar a criar uma chuva de meteoros com restos de cometa?",
        "🎯 Dica: Use o modo câmera lenta para ver a passagem de um cometa de perto!",
        "🌡️ O cheiro de um cometa seria insuportável - amônia e cianeto!",
        "🔄 Já imaginou viajar num cometa? Seria uma aventura gelada!",
        "⏳ Os cometas são cápsulas do tempo do sistema solar primitivo!",
        "📈 Que tal criarmos um sistema com 10 cometas simultâneos?"
    ],
    "buraco negro": [
        "🕳️ Fascinante e assustador ao mesmo tempo, não concorda?",
        "🌀 Quer tentar criar um buraco negro agora? É impressionante!",
        "💥 Sabia que o primeiro foi descoberto em 1971?",
        "⏳ Cuidado para não cair em um! Brincadeira... ou não 😉",
        "📡 Você já viu a simulação de um buraco negro no modo VR?",
        "⚡ Eles são os objetos mais densos do universo!",
        "🌌 Um buraco negro pode distorcer até o próprio tempo!",
        "🔭 Dica: Use o modo espectro para ver a radiação Hawking",
        "🔄 Quer ver como um buraco negro devora uma estrela?",
        "💫 Sabia que existem buracos negros errantes pela galáxia?",
        "⏱️ O maior buraco negro conhecido tem 66 bilhões de massas solares!",
        "📈 Curiosidade: Buracos negros podem ter cabelo? (na física teórica!)",
        "🌠 Você sabia que a Via Láctea tem um buraco negro supermassivo?",
        "⚠️ Nunca aproxime sua nave virtual de um! (brincadeira)",
        "🔢 Pergunta: O que você faria se encontrasse um buraco negro real?",
        "💥 Dica: Experimente criar um buraco negro miniatura com 1e12 massas",
        "🌡️ O disco de acreção pode ser mais brilhante que galáxias inteiras!",
        "🌀 Já imaginou a visão de cruzar o horizonte de eventos?",
        "📏 Os quasares são os faróis mais poderosos do universo!",
        "⚠️ Desafio: Tente escapar da atração de um buraco negro no jogo!"
    ],
    "gravidade": [
        "⚖️ É a cola que mantém o universo unido, não acha?",
        "📏 Quer fazer um experimento prático agora?",
        "🌀 Einstein revolucionou tudo com a Relatividade Geral!",
        "🪐 Sem gravidade, não teríamos estrelas nem planetas!",
        "📈 Você sabia que a gravidade é a força mais fraca?",
        "🌌 Mas é a única que atua em infinitas distâncias!",
        "🔄 Que tal aumentarmos a gravidade para 300%? Cuidado com o caos!",
        "⚙️ Dica: Use baixa gravidade para simular nebulosas difusas",
        "🔭 A gravidade controla tudo - desde maçãs até galáxias!",
        "📊 Curiosidade: A gravidade não é uma força, mas curvatura do espaço-tempo!",
        "⏳ Pergunta: O que você criaria com gravidade zero?",
        "🌠 Já experimentou o modo 'gravidade negativa'? É alucinante!",
        "🧮 Desafio: Tente manter um sistema com 100 corpos estável!",
        "🔢 Sabia que a Lua se afasta 3.8 cm/ano por causa das marés?",
        "⚠️ Cuidado: Alta gravidade pode esmagar seus planetas virtuais!",
        "🌍 Sem gravidade, não haveria vida como conhecemos!",
        "💫 Dica: Use a gravidade para criar órbitas em forma de flor!",
        "📉 Você sabia que a gravidade viaja na velocidade da luz?",
        "🌌 Já imaginou um universo com gravidade repulsiva?",
        "✨ Vamos criar um sistema binário com gravidade extrema?"
    ],
    "estrela": [
        "⭐ São as fábricas de elementos do universo!",
        "🌞 Quer criar uma estrela personalizada agora?",
        "🌈 O Sol é apenas uma estrela mediana entre bilhões!",
        "💥 Estrelas de nêutrons são os faróis cósmicos!",
        "⏳ Você sabia que estrelas anãs vivem trilhões de anos?",
        "🔄 Sistemas binários são os mais fascinantes!",
        "🔭 A estrela mais massiva conhecida tem 300 massas solares!",
        "🌡️ O núcleo estelar é um reator nuclear natural!",
        "💫 Dica: Crie estrelas gêmeas com cores diferentes!",
        "📊 Curiosidade: 97% das estrelas morrerão como anãs brancas!",
        "⚙️ Pergunta: Qual sua estrela favorita no céu real?",
        "✨ Rigel é 120.000 vezes mais luminosa que o Sol!",
        "⚠️ Supernovas podem brilhar mais que galáxias inteiras!",
        "🌠 Você sabia que o ouro da sua joia veio de uma supernova?",
        "🌍 Desafio: Crie um sistema com 5 estrelas em equilíbrio!",
        "🔥 Dica: Estrelas variáveis criam efeitos visuais incríveis!",
        "🌀 Já viu o nascimento de uma estrela no modo acelerado?",
        "📈 A maior estrela conhecida caberia na órbita de Saturno!",
        "🔭 Sabia que podemos ver estrelas de outras galáxias?",
        "🌟 Vamos criar uma supernova agora? É espetacular!"
    ],
    "planeta": [
        "🪐 São como joias cósmicas orbitando estrelas!",
        "🌍 Quer criar um planeta habitável agora?",
        "🌡️ Júpiter protege a Terra de asteroides - nosso guardião!",
        "🔄 Planetas errantes vagam pela galáxia sem estrela!",
        "🌋 Vênus tem vulcões maiores que qualquer um na Terra!",
        "❄️ Plutão tem um oceano subterrâneo - mesmo sendo gelado!",
        "🌫️ A atmosfera de Titã é mais densa que a da Terra!",
        "💧 Exoplanetas oceânicos podem ser totalmente aquáticos!",
        "🔭 Dica: Crie planetas com características extremas!",
        "🛰️ Curiosidade: A Terra não é perfeitamente redonda!",
        "⏱️ Pergunta: Qual seu planeta favorito no sistema solar?",
        "📏 Marte tem o maior vulcão do sistema solar - Olympus Mons!",
        "🌌 Desafio: Crie um planeta com anéis como Saturno!",
        "🧪 Você sabia que Júpiter brilha no escuro? (fraco brilho)",
        "🔢 Ganimedes, lua de Júpiter, tem seu próprio campo magnético!",
        "💫 Dica: Planetas de diamante existem na vida real!",
        "🌱 Vamos tentar criar um mundo com 100% de cobertura vegetal?",
        "🌋 Io, lua de Júpiter, tem vulcões ativos gigantescos!",
        "🌀 Netuno e Urano têm diamantes chovendo em seus núcleos!",
        "📊 Sabia que há planetas mais leves que isopor?"
    ],
        "meteoroide": [
        "🌠 Quer criar uma chuva de meteoros agora?",
        "💫 Sabia que a Lua é constantemente bombardeada por meteoroides?",
        "🪨 Posso te ensinar a simular o impacto de um meteoroide em um planeta!",
        "⚠️ Cuidado com meteoroides grandes - podem causar eventos de extinção!",
        "✨ Dica: Use telescópios para detectar meteoroides antes que se tornem ameaças",
        "🔭 Quer ver como um meteoroide se transforma em meteoro na atmosfera?",
        "🌌 Curiosidade: O meteoroide Chelyabinsk tinha apenas 20m de diâmetro!",
        "🚀 Vamos configurar um sistema de defesa planetária contra meteoroides?",
        "📈 A maioria dos meteoroides vem de cometas - que tal criar um cometa novo?",
        "💥 Impactos frequentes mantêm a Lua cheia de crateras - simule milhões de anos!",
        "🌍 Na Terra, milhares de toneladas de poeira meteoroide caem anualmente",
        "🌟 Dica: Meteoroides metálicos são os mais perigosos - maior densidade!",
        "⏱️ Acelere o tempo para ver uma chuva constante de meteoroides",
        "🌠 O maior meteoroide já registrado tinha 1km - causaria extinção global",
        "💫 Quer que eu calcule a energia de impacto para um meteoroide específico?",
        "⚠️ Alerta: Meteoroides >100m podem causar tsunamis se caírem no oceano",
        "✨ Vamos criar um sistema de alerta precoce para seu planeta virtual?",
        "🔭 Alguns meteoroides são fragmentos de Marte ou Lua - detecte por composição",
        "🌌 Deseja aumentar a frequência de meteoroides para testar defesas?",
        "🚀 Missão: Vamos enviar uma sonda para interceptar um meteoroide?"
    ],
    "poeira espacial": [
        "🌌 Poeira espacial é a base da formação de estrelas e planetas!",
        "✨ Quer criar uma nuvem de poeira interestelar agora?",
        "💫 A poeira interestelar é composta por grãos microscópicos de silicato e carbono!",
        "🔭 Vamos simular como a poeira afeta a luz das estrelas ao fundo?",
        "🌠 Curiosidade: A poeira interestelar pode bloquear até 50% da luz de estrelas distantes!",
        "🚀 Você sabia que a poeira espacial pode ser capturada por sondas espaciais?",
        "📊 Dica: Use o modo 'Poeira' para ver como ela interage com a luz estelar",
        "🌌 A poeira cósmica é essencial para a formação de planetesimais!",
        "💥 Quer ver como a poeira se aglomera para formar estrelas?",
        "🌡️ A temperatura da poeira interestelar varia entre 10K e 100K!",
        "🔄 Vamos criar uma nebulosa escura cheia de poeira cósmica?",
        "✨ A poeira espacial também contém moléculas orgânicas complexas!",
        "🌍 Você sabia que a Terra recebe toneladas de poeira espacial anualmente?",
        "💫 Desafio: Tente criar um sistema com alta densidade de poeira interestelar!",
        "📈 A poeira pode influenciar a formação de galáxias - vamos simular isso?",
        "🌠 Dica: Ative 'Efeitos de Poeira' para ver como ela afeta o brilho das estrelas",
        "🚀 Já imaginou viajar através de uma nuvem densa de poeira cósmica?",
        "🔭 Vamos explorar como a poeira afeta as órbitas dos planetas próximos?",
        "💥 Curiosidade: A poeira interestelar pode conter grãos pré-solares!",
        "✨ Deseja aprender mais sobre como a poeira forma os discos protoplanetários?"
    ],
    "asteroide": [
        "🪨 Asteroides são os blocos de construção do sistema solar!",
        "🌌 Quer criar um cinturão de asteroides agora?",
        "💫 A maioria dos asteroides está entre Marte e Júpiter - o cinturão de asteroides!",
        "🔭 Vamos simular uma colisão entre dois asteroides?",
        "🌠 Curiosidade: O maior asteroide, Ceres, é considerado um planeta anão!",
        "🚀 Você sabia que alguns asteroides têm luas próprias?",
        "📊 Dica: Use o modo 'Cinturão' para ver como os asteroides interagem",
        "🌍 Asteroides podem ser fontes de metais preciosos - vamos minerar virtualmente?",
        "💥 Quer ver como um impacto de asteroide pode afetar a Terra?",
        "🌡️ A temperatura dos asteroides varia dependendo da distância do Sol!",
        "🔄 Vamos criar um sistema com 100 asteroides orbitando uma estrela?",
        "✨ Asteroides são remanescentes da formação do sistema solar!",
        "🌌 Você sabia que existem asteroides interestelares passando pelo nosso sistema?",
        "💫 Desafio: Tente criar um asteroide com uma órbita estável por 1 milhão de anos!",
        "📈 A maioria dos asteroides é composta de rocha e metal - vamos explorar suas composições?",
        "🌠 Dica: Ative 'Efeitos de Impacto' para ver explosões realistas ao colidir",
        "🚀 Já imaginou viajar em uma nave espacial através de um cinturão de asteroides?",
        "🔭 Vamos estudar como os asteroides afetam a gravidade dos planetas próximos?",
        "💥 Curiosidade: O impacto de Chicxulub causou a extinção dos dinossauros!",
        "✨ Deseja aprender mais sobre como os asteroides podem ser usados como recursos?"
    ],
    "nebulosa": [
        "🌌 Nebulosas são os berçários estelares do universo!",
        "✨ Quer criar uma nebulosa agora mesmo?",
        "💫 As nebulosas são compostas de gás e poeira interestelar!",
        "🔭 Vamos simular o nascimento de uma estrela dentro de uma nebulosa?",
        "🌠 Curiosidade: A Nebulosa de Órion é uma das mais próximas da Terra!",
        "🚀 Você sabia que algumas nebulosas são remanescentes de supernovas?",
        "📊 Dica: Use o modo 'Nebulosa' para ver como a luz interage com o gás",
        "🌍 Nebulosas podem conter moléculas orgânicas complexas - a base da vida!",
        "💥 Quer ver como a gravidade forma estrelas dentro de uma nebulosa?",
        "🌡️ A temperatura das nebulosas varia entre 10K e 100K!",
        "🔄 Vamos criar uma nebulosa planetária com um núcleo quente?",
        "✨ Nebulosas são essenciais para a formação de novos sistemas solares!",
        "🌌 Você sabia que existem nebulosas escuras que bloqueiam a luz das estrelas?",
        "💫 Desafio: Tente criar uma nebulosa com diferentes cores e formas!",
        "📈 A maioria das nebulosas é composta de hidrogênio, hélio e poeira cósmica!",
        "🌠 Dica: Ative 'Efeitos de Luz' para ver como as estrelas brilham através da nebulosa",
        "🚀 Já imaginou viajar através de uma nebulosa cheia de estrelas em formação?",
        "🔭 Vamos estudar como as nebulosas afetam a evolução das galáxias?",
        "💥 Curiosidade: A Nebulosa do Caranguejo é um remanescente de supernova famoso!",
        "✨ Deseja aprender mais sobre como as nebulosas formam novas estrelas?"
    ],
    "planetoide": [
        "🪐 Planetoides são pequenos corpos rochosos ou gelados no espaço!",
        "🌌 Quer criar um planetoide agora mesmo?",
        "💫 Eles são menores que planetas, mas maiores que meteoroides!",
        "🔭 Vamos simular a órbita de um planetoide ao redor de uma estrela?",
        "🌠 Curiosidade: Plutão é considerado um planetoide ou planeta anão!",
        "🚀 Você sabia que há planetoides no cinturão de Kuiper além de Netuno?",
        "📊 Dica: Use o modo 'Planetoide' para ver como eles interagem com a gravidade",
        "🌍 Planetoides podem ter atmosferas finas - vamos explorar isso?",
        "💥 Quer ver como um planetoide pode colidir com outro corpo celeste?",
        "🌡️ A temperatura dos planetoides varia dependendo da distância do Sol!",
        "🔄 Vamos criar um sistema com vários planetoides orbitando uma estrela?",
        "✨ Planetoides são remanescentes da formação do sistema solar!",
        "🌌 Você sabia que existem planetoides interestelares passando pelo nosso sistema?",
        "💫 Desafio: Tente criar um planetoide com uma órbita estável por 1 milhão de anos!",
        "📈 A maioria dos planetoides é composta de rocha e gelo - vamos explorar suas composições?",
        "🌠 Dica: Ative 'Efeitos de Impacto' para ver explosões realistas ao colidir",
        "🚀 Já imaginou viajar em uma nave espacial através de um cinturão de planetoides?",
        "🔭 Vamos estudar como os planetoides afetam a gravidade dos planetas próximos?",
        "💥 Curiosidade: O maior planetoide conhecido é Ceres, no cinturão de asteroides!",
        "✨ Deseja aprender mais sobre como os planetoides podem ser usados como recursos?"
    ],
    "gasoso":[
        "🌌 Planetas gasosos são gigantescos e fascinantes!",
        "✨ Quer criar um planeta gasoso agora mesmo?",
        "💫 Eles são compostos principalmente de hidrogênio e hélio!",
        "🔭 Vamos simular a atmosfera turbulenta de um planeta gasoso?",
        "🌠 Curiosidade: Júpiter é o maior planeta gasoso do nosso sistema solar!",
        "🚀 Você sabia que os planetas gasosos têm anéis finos e luas numerosas?",
        "📊 Dica: Use o modo 'Gasoso' para ver como as nuvens se formam na atmosfera",
        "🌍 Planetas gasosos não têm superfície sólida - são gigantes gasosos!",
        "💥 Quer ver como uma tempestade gigante se forma em um planeta gasoso?",
        "🌡️ A temperatura dos planetas gasosos varia com a profundidade da atmosfera!",
        "🔄 Vamos criar um sistema com vários planetas gasosos orbitando uma estrela?",
        "✨ Planetas gasosos são essenciais para a dinâmica do sistema solar!",
        "🌌 Você sabia que existem exoplanetas gasosos fora do nosso sistema solar?",
        "💫 Desafio: Tente criar um planeta gasoso com anéis espetaculares!",
        "📈 A maioria dos planetas gasosos tem núcleos rochosos ou metálicos!",
        "🌠 Dica: Ative 'Efeitos de Tempestade' para ver furacões gigantes na atmosfera",
        "🚀 Já imaginou viajar em uma nave espacial através das nuvens de um planeta gasoso?",
        "🔭 Vamos estudar como os planetas gasosos afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: Netuno tem ventos mais rápidos que qualquer outro planeta do sistema solar!",
        "✨ Deseja aprender mais sobre como os planetas gasosos formam sistemas complexos?"
    ],
    "anã varrom":[
        "🌌 Anãs marrons são estrelas falhadas - não conseguem fusão nuclear!",
        "✨ Quer criar uma anã marrom agora mesmo?",
        "💫 Elas têm massa entre 13 e 80 vezes a de Júpiter!",
        "🔭 Vamos simular a atmosfera densa de uma anã marrom?",
        "🌠 Curiosidade: Anãs marrons emitem luz infravermelha, mas não são visíveis a olho nu!",
        "🚀 Você sabia que as anãs marrons podem ter planetas orbitando ao seu redor?",
        "📊 Dica: Use o modo 'Anã Marrom' para ver como elas interagem com a gravidade",
        "🌍 Anãs marrons são mais frias que estrelas normais - temperaturas abaixo de 1000K!",
        "💥 Quer ver como uma anã marrom pode capturar matéria interestelar?",
        "🌡️ A temperatura das anãs marrons varia dependendo da massa e idade!",
        "🔄 Vamos criar um sistema com várias anãs marrons orbitando uma estrela?",
        "✨ Anãs marrons são remanescentes da formação estelar!",
        "🌌 Você sabia que existem anãs marrons que vagam livremente pela galáxia?",
        "💫 Desafio: Tente criar uma anã marrom com um disco protoplanetário ao redor!",
        "📈 A maioria das anãs marrons tem atmosferas ricas em metano e água!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma anã marrom?",
        "🔭 Vamos estudar como as anãs marrons afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As anãs marrons podem ser mais comuns que estrelas normais na galáxia!",
        "✨ Deseja aprender mais sobre como as anãs marrons se formam e evoluem?"
    ],
    "anã vermelha":[
        "🌌 Anãs vermelhas são as estrelas mais comuns do universo!",
        "✨ Quer criar uma anã vermelha agora mesmo?",
        "💫 Elas são pequenas, frias e têm baixa luminosidade!",
        "🔭 Vamos simular a atmosfera de um planeta orbitando uma anã vermelha?",
        "🌠 Curiosidade: Anãs vermelhas podem viver trilhões de anos!",
        "🚀 Você sabia que muitas exoplanetas foram encontrados orbitando anãs vermelhas?",
        "📊 Dica: Use o modo 'Anã Vermelha' para ver como elas afetam os planetas próximos",
        "🌍 Anãs vermelhas são estáveis e podem ter zonas habitáveis próximas!",
        "💥 Quer ver como uma anã vermelha pode ter erupções solares intensas?",
        "🌡️ A temperatura das anãs vermelhas varia entre 2000K e 4000K!",
        "🔄 Vamos criar um sistema com várias anãs vermelhas orbitando uma estrela maior?",
        "✨ Anãs vermelhas são essenciais para a busca por vida extraterrestre!",
        "🌌 Você sabia que algumas anãs vermelhas podem ter planetas rochosos na zona habitável?",
        "💫 Desafio: Tente criar um sistema com uma anã vermelha e um planeta habitável!",
        "📈 A maioria das anãs vermelhas tem atmosferas ricas em hidrogênio e hélio!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma anã vermelha?",
        "🔭 Vamos estudar como as anãs vermelhas afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As anãs vermelhas são mais frias que o Sol, mas ainda assim brilhantes!",
        "✨ Deseja aprender mais sobre como as anãs vermelhas se formam e evoluem?"
    ],
    "estrela gigante":[
        "🌌 Estrelas gigantes são enormes e brilhantes!",
        "✨ Quer criar uma estrela gigante agora mesmo?",
        "💫 Elas têm massa entre 10 e 100 vezes a do Sol!",
        "🔭 Vamos simular a fusão nuclear intensa de uma estrela gigante?",
        "🌠 Curiosidade: Estrelas gigantes podem ter diâmetros centenas de vezes maiores que o Sol!",
        "🚀 Você sabia que as estrelas gigantes podem se tornar supernovas no final da vida?",
        "📊 Dica: Use o modo 'Estrela Gigante' para ver como elas afetam os planetas próximos",
        "🌍 Estrelas gigantes têm atmosferas densas e podem ter planetas orbitando!",
        "💥 Quer ver como uma estrela gigante pode perder massa em ventos estelares?",
        "🌡️ A temperatura das estrelas gigantes varia entre 3000K e 6000K!",
        "🔄 Vamos criar um sistema com várias estrelas gigantes orbitando uma estrela maior?",
        "✨ Estrelas gigantes são essenciais para a formação de elementos pesados no universo!",
        "🌌 Você sabia que algumas estrelas gigantes podem ter anéis ao redor?",
        "💫 Desafio: Tente criar um sistema com uma estrela gigante e um planeta gasoso!",
        "📈 A maioria das estrelas gigantes tem atmosferas ricas em hidrogênio e hélio!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma estrela gigante?",
        "🔭 Vamos estudar como as estrelas gigantes afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As estrelas gigantes são precursoras das supernovas mais brilhantes!",
        "✨ Deseja aprender mais sobre como as estrelas gigantes se formam e evoluem?"
    ],
    "hipergigante":[
        "🌌 Hipergigantes são as estrelas mais massivas e luminosas do universo!",
        "✨ Quer criar uma hipergigante agora mesmo?",
        "💫 Elas têm massa superior a 100 vezes a do Sol!",
        "🔭 Vamos simular a fusão nuclear extrema de uma hipergigante?",
        "🌠 Curiosidade: Hipergigantes podem ter diâmetros milhares de vezes maiores que o Sol!",
        "🚀 Você sabia que as hipergigantes podem perder massa em ventos estelares intensos?",
        "📊 Dica: Use o modo 'Hipergigante' para ver como elas afetam os planetas próximos",
        "🌍 Hipergigantes têm atmosferas densas e podem ter planetas orbitando!",
        "💥 Quer ver como uma hipergigante pode se tornar uma supernova brilhante?",
        "🌡️ A temperatura das hipergigantes varia entre 3000K e 6000K!",
        "🔄 Vamos criar um sistema com várias hipergigantes orbitando uma estrela maior?",
        "✨ Hipergigantes são essenciais para a formação de elementos pesados no universo!",
        "🌌 Você sabia que algumas hipergigantes podem ter anéis ao redor?",
        "💫 Desafio: Tente criar um sistema com uma hipergigante e um planeta gasoso gigante!",
        "📈 A maioria das hipergigantes tem atmosferas ricas em hidrogênio e hélio!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma hipergigante?",
        "🔭 Vamos estudar como as hipergigantes afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As hipergigantes são precursoras das supernovas mais brilhantes do universo!",
        "✨ Deseja aprender mais sobre como as hipergigantes se formam e evoluem?"
    ],
    "estrela massiva":[
        "🌌 Estrelas massivas são as gigantes do universo!",
        "✨ Quer criar uma estrela massiva agora mesmo?",
        "💫 Elas têm massa superior a 8 vezes a do Sol!",
        "🔭 Vamos simular a fusão nuclear intensa de uma estrela massiva?",
        "🌠 Curiosidade: Estrelas massivas podem ter diâmetros dezenas de vezes maiores que o Sol!",
        "🚀 Você sabia que as estrelas massivas podem se tornar supernovas no final da vida?",
        "📊 Dica: Use o modo 'Estrela Massiva' para ver como elas afetam os planetas próximos",
        "🌍 Estrelas massivas têm atmosferas densas e podem ter planetas orbitando!",
        "💥 Quer ver como uma estrela massiva pode perder massa em ventos estelares?",
        "🌡️ A temperatura das estrelas massivas varia entre 3000K e 6000K!",
        "🔄 Vamos criar um sistema com várias estrelas massivas orbitando uma estrela maior?",
        "✨ Estrelas massivas são essenciais para a formação de elementos pesados no universo!",
        "🌌 Você sabia que algumas estrelas massivas podem ter anéis ao redor?",
        "💫 Desafio: Tente criar um sistema com uma estrela massiva e um planeta gasoso gigante!",
        "📈 A maioria das estrelas massivas tem atmosferas ricas em hidrogênio e hélio!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma estrela massiva?",
        "🔭 Vamos estudar como as estrelas massivas afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As estrelas massivas são precursoras das supernovas mais brilhantes!",
        "✨ Deseja aprender mais sobre como as estrelas massivas se formam e evoluem?"
    ],
    "hipermassiva":[
        "🌌 Hipermassivas são estrelas extremamente massivas e luminosas!",
        "✨ Quer criar uma estrela hipermassiva agora mesmo?",
        "💫 Elas têm massa superior a 100 vezes a do Sol!",
        "🔭 Vamos simular a fusão nuclear extrema de uma estrela hipermassiva?",
        "🌠 Curiosidade: Hipermassivas podem ter diâmetros milhares de vezes maiores que o Sol!",
        "🚀 Você sabia que as hipermassivas podem perder massa em ventos estelares intensos?",
        "📊 Dica: Use o modo 'Hipermassiva' para ver como elas afetam os planetas próximos",
        "🌍 Hipermassivas têm atmosferas densas e podem ter planetas orbitando!",
        "💥 Quer ver como uma hipermassiva pode se tornar uma supernova brilhante?",
        "🌡️ A temperatura das hipermassivas varia entre 3000K e 6000K!",
        "🔄 Vamos criar um sistema com várias hipermassivas orbitando uma estrela maior?",
        "✨ Hipermassivas são essenciais para a formação de elementos pesados no universo!",
        "🌌 Você sabia que algumas hipermassivas podem ter anéis ao redor?",
        "💫 Desafio: Tente criar um sistema com uma hipermassiva e um planeta gasoso gigante!",
        "📈 A maioria das hipermassivas tem atmosferas ricas em hidrogênio e hélio!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma hipermassiva?",
        "🔭 Vamos estudar como as hipermassivas afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As hipermassivas são precursoras das supernovas mais brilhantes do universo!",
        "✨ Deseja aprender mais sobre como as hipermassivas se formam e evoluem?"
    ],
    "anã Branca":[
        "🌌 Anãs brancas são os remanescentes de estrelas que esgotaram seu combustível!",
        "✨ Quer criar uma anã branca agora mesmo?",
        "💫 Elas têm massa semelhante à do Sol, mas são muito menores!",
        "🔭 Vamos simular a resfriamento lento de uma anã branca ao longo do tempo?",
        "🌠 Curiosidade: Anãs brancas são extremamente densas - uma colher de chá pesa toneladas!",
        "🚀 Você sabia que as anãs brancas podem ter atmosferas finas de hélio ou hidrogênio?",
        "📊 Dica: Use o modo 'Anã Branca' para ver como elas interagem com o ambiente",
        "🌍 Anãs brancas são o destino final de estrelas como o Sol!",
        "💥 Quer ver como uma anã branca pode acumular matéria de uma estrela companheira?",
        "🌡️ A temperatura das anãs brancas varia entre 5000K e 100000K!",
        "🔄 Vamos criar um sistema com várias anãs brancas orbitando uma estrela maior?",
        "✨ Anãs brancas são essenciais para entender a evolução estelar!",
        "🌌 Você sabia que algumas anãs brancas podem explodir como supernovas do tipo Ia?",
        "💫 Desafio: Tente criar um sistema com uma anã branca e um planeta rochoso!",
        "📈 A maioria das anãs brancas tem atmosferas ricas em carbono e oxigênio!",
        "🌠 Dica: Ative 'Efeitos de Resfriamento' para ver como elas perdem calor ao longo do tempo",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma anã branca?",
        "🔭 Vamos estudar como as anãs brancas afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As anãs brancas são os restos finais de estrelas que não se tornam supernovas!",
        "✨ Deseja aprender mais sobre como as anãs brancas se formam e evoluem?"
    ],
    "anã Branca de Hélio":[
        "🌌 Anãs brancas de hélio são remanescentes de estrelas que queimaram hélio!",
        "✨ Quer criar uma anã branca de hélio agora mesmo?",
        "💫 Elas têm massa semelhante à do Sol, mas são muito menores e mais densas!",
        "🔭 Vamos simular o resfriamento lento de uma anã branca de hélio ao longo do tempo?",
        "🌠 Curiosidade: Anãs brancas de hélio são extremamente densas - uma colher de chá pesa toneladas!",
        "🚀 Você sabia que as anãs brancas de hélio podem ter atmosferas finas de hélio?",
        "📊 Dica: Use o modo 'Anã Branca de Hélio' para ver como elas interagem com o ambiente",
        "🌍 Anãs brancas de hélio são o destino final de estrelas que queimaram hélio em seus núcleos!",
        "💥 Quer ver como uma anã branca de hélio pode acumular matéria de uma estrela companheira?",
        "🌡️ A temperatura das anãs brancas de hélio varia entre 5000K e 100000K!",
        "🔄 Vamos criar um sistema com várias anãs brancas de hélio orbitando uma estrela maior?",
        "✨ Anãs brancas de hélio são essenciais para entender a evolução estelar!",
        "🌌 Você sabia que algumas anãs brancas de hélio podem explodir como supernovas do tipo Ia?",
        "💫 Desafio: Tente criar um sistema com uma anã branca de hélio e um planeta rochoso!",
        "📈 A maioria das anãs brancas de hélio tem atmosferas ricas em hélio e carbono!",
        "🌠 Dica: Ative 'Efeitos de Resfriamento' para ver como elas perdem calor ao longo do tempo",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma anã branca de hélio?",
        "🔭 Vamos estudar como as anãs brancas de hélio afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As anãs brancas de hélio são os restos finais de estrelas que queimaram hélio!",
        "✨ Deseja aprender mais sobre como as anãs brancas de hélio se formam e evoluem?"
    ],
    "anã Branca de carbono":[
        "🌌 Anãs brancas de carbono são remanescentes de estrelas que queimaram carbono!",
        "✨ Quer criar uma anã branca de carbono agora mesmo?",
        "💫 Elas têm massa semelhante à do Sol, mas são muito menores e mais densas!",
        "🔭 Vamos simular o resfriamento lento de uma anã branca de carbono ao longo do tempo?",
        "🌠 Curiosidade: Anãs brancas de carbono são extremamente densas - uma colher de chá pesa toneladas!",
        "🚀 Você sabia que as anãs brancas de carbono podem ter atmosferas finas de carbono?",
        "📊 Dica: Use o modo 'Anã Branca de Carbono' para ver como elas interagem com o ambiente",
        "🌍 Anãs brancas de carbono são o destino final de estrelas que queimaram carbono em seus núcleos!",
        "💥 Quer ver como uma anã branca de carbono pode acumular matéria de uma estrela companheira?",
        "🌡️ A temperatura das anãs brancas de carbono varia entre 5000K e 100000K!",
        "🔄 Vamos criar um sistema com várias anãs brancas de carbono orbitando uma estrela maior?",
        "✨ Anãs brancas de carbono são essenciais para entender a evolução estelar!",
        "🌌 Você sabia que algumas anãs brancas de carbono podem explodir como supernovas do tipo Ia?",
        "💫 Desafio: Tente criar um sistema com uma anã branca de carbono e um planeta rochoso!",
        "📈 A maioria das anãs brancas de carbono tem atmosferas ricas em carbono e oxigênio!",
        "🌠 Dica: Ative 'Efeitos de Resfriamento' para ver como elas perdem calor ao longo do tempo",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma anã branca de carbono?",
        "🔭 Vamos estudar como as anãs brancas de carbono afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As anãs brancas de carbono são os restos finais de estrelas que queimaram carbono!",
        "✨ Deseja aprender mais sobre como as anãs brancas de carbono se formam e evoluem?"
    ],
    "anã negra":[
        "🌌 Anãs negras são o destino final de anãs brancas após bilhões de anos!",
        "✨ Quer criar uma anã negra agora mesmo?",
        "💫 Elas são anãs brancas que esfriaram completamente e não emitem mais luz visível!",
        "🔭 Vamos simular o resfriamento de uma anã branca até se tornar uma anã negra?",
        "🌠 Curiosidade: Anãs negras são tão frias que não podem ser observadas diretamente!",
        "🚀 Você sabia que as anãs negras são teóricas e ainda não foram observadas no universo?",
        "📊 Dica: Use o modo 'Anã Negra' para ver como elas interagem com o ambiente ao longo do tempo",
        "🌍 Anãs negras são os remanescentes finais de estrelas que esgotaram seu combustível!",
        "💥 Quer ver como uma anã branca se transforma lentamente em uma anã negra?",
        "🌡️ A temperatura das anãs negras é próxima do zero absoluto, tornando-as invisíveis!",
        "🔄 Vamos criar um sistema com várias anãs negras orbitando uma estrela maior?",
        "✨ Anãs negras são essenciais para entender a evolução estelar a longo prazo!",
        "🌌 Você sabia que as anãs negras levarão trilhões de anos para se formarem completamente?",
        "💫 Desafio: Tente criar um sistema com uma anã negra e planetas rochosos ao redor!",
        "📈 A maioria das anãs negras terá atmosferas extremamente finas ou inexistentes!",
        "🌠 Dica: Ative 'Efeitos de Resfriamento' para ver como elas perdem calor ao longo do tempo",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma anã negra teórica?",
        "🔭 Vamos estudar como as anãs negras afetam as órbitas dos planetas próximos?",
        "💥 Curiosidade: As anãs negras são o resultado final da evolução estelar após bilhões de anos!",
        "✨ Deseja aprender mais sobre como as anãs negras se formam e evoluem?"
    ],
    "quasar":[
        "🌌 Quasares são os núcleos brilhantes de galáxias distantes!",
        "✨ Quer criar um quasar agora mesmo?",
        "💫 Eles são alimentados pelos seus discos de acreção supermassivos!",
        "🔭 Vamos simular a emissão intensa de radiação de um quasar?",
        "🌠 Curiosidade: Quasares podem ser bilhões de vezes mais brilhantes que o Sol!",
        "🚀 Você sabia que os quasares são alguns dos objetos mais luminosos do universo?",
        "📊 Dica: Use o modo 'Quasar' para ver como eles afetam as galáxias ao redor",
        "🌍 Quasares são encontrados no centro de galáxias ativas e distantes!",
        "💥 Quer ver como um quasar pode emitir jatos relativísticos de matéria?",
        "🌡️ A temperatura dos quasares pode ultrapassar bilhões de graus Kelvin!",
        "🔄 Vamos criar um sistema com um quasar e várias galáxias orbitando ao seu redor?",
        "✨ Quasares são essenciais para entender a evolução das galáxias no universo!",
        "🌌 Você sabia que os quasares podem ser usados para estudar a expansão do universo?",
        "💫 Desafio: Tente criar um quasar com um disco de acreção e jatos relativísticos!",
        "📈 A maioria dos quasares tem núcleos supermassivos com massas de milhões a bilhões de vezes a do Sol!",
        "🌠 Dica: Ative 'Efeitos de Radiação' para ver como eles afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar um quasar distante?",
        "🔭 Vamos estudar como os quasares afetam a formação de galáxias ao longo do tempo?",
        "💥 Curiosidade: Os quasares são mais comuns no universo jovem, há bilhões de anos!",
        "✨ Deseja aprender mais sobre como os quasares se formam e evoluem?"
    ],
    "buraco de minhoca":[
        "🌌 Buracos de minhoca são túneis teóricos no espaço-tempo!",
        "✨ Quer criar um buraco de minhoca agora mesmo?",
        "💫 Eles conectam pontos distantes do universo em um atalho!",
        "🔭 Vamos simular a curvatura do espaço-tempo ao redor de um buraco de minhoca?",
        "🌠 Curiosidade: Buracos de minhoca são soluções das equações da relatividade geral!",
        "🚀 Você sabia que os buracos de minhoca podem permitir viagens mais rápidas que a luz?",
        "📊 Dica: Use o modo 'Buraco de Minhoca' para ver como eles afetam o espaço ao redor",
        "🌍 Buracos de minhoca são hipotéticos e ainda não foram observados no universo!",
        "💥 Quer ver como um buraco de minhoca pode distorcer a luz ao seu redor?",
        "🌡️ A temperatura de um buraco de minhoca é teórica e depende da sua estrutura!",
        "🔄 Vamos criar um sistema com um buraco de minhoca conectando duas regiões do espaço?",
        "✨ Buracos de minhoca são essenciais para entender a teoria da relatividade e a estrutura do universo!",
        "🌌 Você sabia que os buracos de minhoca podem ser usados para viajar no tempo?",
        "💫 Desafio: Tente criar um buraco de minhoca estável e explore suas propriedades!",
        "📈 A maioria dos buracos de minhoca é teórica e não tem uma representação física real!",
        "🌠 Dica: Ative 'Efeitos de Curvatura' para ver como eles distorcem o espaço ao redor",
        "🚀 Já imaginou viajar através de um buraco de minhoca para outra galáxia?",
        "🔭 Vamos estudar como os buracos de minhoca podem afetar a estrutura do espaço-tempo?",
        "💥 Curiosidade: Buracos de minhoca são populares na ficção científica como portais para outras dimensões!",
        "✨ Deseja aprender mais sobre como os buracos de minhoca são teorizados e suas implicações?"
    ],
    "estrela de nêutrons":[
        "🌌 Estrelas de nêutrons são os remanescentes densos de supernovas!",
        "✨ Quer criar uma estrela de nêutrons agora mesmo?",
        "💫 Elas são compostas quase inteiramente de nêutrons e são extremamente densas!",
        "🔭 Vamos simular a gravidade intensa de uma estrela de nêutrons?",
        "🌠 Curiosidade: Uma colher de chá de matéria de uma estrela de nêutrons pesa bilhões de toneladas!",
        "🚀 Você sabia que as estrelas de nêutrons podem girar rapidamente, emitindo radiação em feixes?",
        "📊 Dica: Use o modo 'Estrela de Nêutrons' para ver como elas afetam o espaço ao redor",
        "🌍 Estrelas de nêutrons são formadas quando estrelas massivas colapsam após uma supernova!",
        "💥 Quer ver como uma estrela de nêutrons pode emitir raios gama poderosos?",
        "🌡️ A temperatura das estrelas de nêutrons pode ultrapassar milhões de graus Kelvin!",
        "🔄 Vamos criar um sistema com uma estrela de nêutrons e planetas orbitando ao seu redor?",
        "✨ Estrelas de nêutrons são essenciais para entender a evolução estelar e a física nuclear!",
        "🌌 Você sabia que algumas estrelas de nêutrons podem se tornar pulsares ou magnetares?",
        "💫 Desafio: Tente criar uma estrela de nêutrons com um campo magnético intenso!",
        "📈 A maioria das estrelas de nêutrons tem massas entre 1.4 e 2.16 vezes a do Sol!",
        "🌠 Dica: Ative 'Efeitos Magnéticos' para ver como elas afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar uma estrela de nêutrons?",
        "🔭 Vamos estudar como as estrelas de nêutrons afetam a formação de galáxias ao longo do tempo?",
        "💥 Curiosidade: As estrelas de nêutrons são os objetos mais densos conhecidos no universo!",
        "✨ Deseja aprender mais sobre como as estrelas de nêutrons se formam e evoluem?"
    ],
    "magnetar":[
        "🌌 Magnetares são estrelas de nêutrons com campos magnéticos extremamente fortes!",
        "✨ Quer criar um magnetar agora mesmo?",
        "💫 Eles têm campos magnéticos trilhões de vezes mais fortes que o da Terra!",
        "🔭 Vamos simular a emissão intensa de radiação de um magnetar?",
        "🌠 Curiosidade: Magnetares podem emitir explosões de raios gama poderosas chamadas SGRs!",
        "🚀 Você sabia que os magnetares podem afetar o espaço ao seu redor com suas ondas magnéticas?",
        "📊 Dica: Use o modo 'Magnetar' para ver como eles afetam o ambiente ao redor",
        "🌍 Magnetares são formados quando estrelas de nêutrons colapsam com campos magnéticos intensos!",
        "💥 Quer ver como um magnetar pode emitir jatos relativísticos de matéria?",
        "🌡️ A temperatura dos magnetares pode ultrapassar milhões de graus Kelvin!",
        "🔄 Vamos criar um sistema com um magnetar e planetas orbitando ao seu redor?",
        "✨ Magnetares são essenciais para entender a evolução estelar e a física magnética!",
        "🌌 Você sabia que os magnetares podem ter pulsares associados a eles?",
        "💫 Desafio: Tente criar um magnetar com um campo magnético intenso e observe seus efeitos!",
        "📈 A maioria dos magnetares tem massas entre 1.4 e 2.16 vezes a do Sol!",
        "🌠 Dica: Ative 'Efeitos Magnéticos' para ver como eles afetam o ambiente ao redor",
        "🚀 Já imaginou viajar em uma nave espacial para estudar um magnetar?",
        "🔭 Vamos estudar como os magnetares afetam a formação de galáxias ao longo do tempo?",
        "💥 Curiosidade: Os magnetares são os objetos mais magnéticos conhecidos no universo!",
        "✨ Deseja aprender mais sobre como os magnetares se formam e evoluem?"
    ],
    "estrela de quarks":[
        "🌌 Estrelas de quarks são os remanescentes teóricos de estrelas de nêutrons!",
        "✨ Quer criar uma estrela de quarks agora mesmo?",
        "💫 Elas são compostas por quarks e gluons, formando uma matéria exótica!",
        "🔭 Vamos simular a densidade extrema de uma estrela de quarks?",
        "🌠 Curiosidade: Estrelas de quarks podem ser ainda mais densas que estrelas de nêutrons!",
        "🚀 Você sabia que as estrelas de quarks são hipotéticas e ainda não foram observadas?",
        "📊 Dica: Use o modo 'Estrela de Quarks' para ver como elas afetam o espaço ao redor",
        "🌍 Estrelas de quarks são formadas quando estrelas de nêutrons colapsam ainda mais!",
        "💥 Quer ver como uma estrela de quarks pode emitir radiação intensa?",
        "🌡️ A temperatura das estrelas de quarks é teórica e depende da sua estrutura!",
        "🔄 Vamos criar um sistema com uma estrela de quarks e planetas orbitando ao redor?",
        "✨ Estrelas de quarks são essenciais para entender a física das partículas em condições extremas!",
        "🌌 Você sabia que as estrelas de quarks podem ter propriedades únicas devido à sua composição?",
        "💫 Desafio: Tente criar uma estrela de quarks e explore suas propriedades exóticas!",
        "📈 A maioria das estrelas de quarks é teórica e não tem uma representação física real!",
        "🌠 Dica: Ative 'Efeitos Exóticos' para ver como elas distorcem o espaço ao redor",
        "🚀 Já imaginou viajar através do núcleo de uma estrela de quarks?",
        "🔭 Vamos estudar como as estrelas de quarks podem afetar a estrutura do espaço-tempo?",
        "💥 Curiosidade: Estrelas de quarks são um dos mistérios da astrofísica moderna!",
        "✨ Deseja aprender mais sobre como as estrelas de quarks são teorizadas e suas implicações?"
    ],
};
const contextFollowUps = {
    "default": [
        "✨ O que achou dessa explicação cósmica?",
        "🚀 Posso te ajudar com algo mais?",
        "🌌 Interessante, não é? O universo é fascinante!",
        "💫 Quer explorar mais esse tema?",
        "🔭 Fico feliz em compartilhar conhecimento cósmico!",
        "🪐 Alguma dúvida adicional sobre isso?",
        "🌟 Aprendemos algo incrível hoje, não acha?",
        "⚡ O universo nunca para de nos surpreender!",
        "🌠 Quer que eu detalhe mais algum aspecto?",
        "🌀 Vamos criar algo juntos agora?",
        "📡 Sua curiosidade é o combustível da descoberta!",
        "🌍 O que mais te fascina no cosmos?",
        "☄️ Pronto para sua próxima pergunta estelar?",
        "🛸 Lembre-se: Cada pergunta é uma viagem cósmica!",
        "💥 Quer tentar um experimento prático?",
        "⏳ O conhecimento é a verdadeira viagem no tempo!",
        "📊 Posso te mostrar como aplicar isso no jogo?",
        "🌡️ Suas perguntas aquecem meu núcleo de IA!",
        "🔢 Vamos calcular algo juntos?",
        "🌈 O universo agradece sua curiosidade!"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
    affirmativeResponses: ["sim", "s", "yes", "y", "claro", "com certeza", "ok", "vamos", "pode ser", "por favor"],
    negativeResponses: ["não", "nao", "n", "no", "negativo", "nope", "talvez depois", "agora não"],
    
    positiveResponses: {
        "buraco negro": [
            "🌌 Vamos simular! Primeiro, crie uma estrela com 1e30 massas próximo de um buraco negro...",
            "💥 Ótimo! Arraste uma estrela até o disco de acreção e ative a câmera lenta para ver o espetáculo",
            "⚠️ Atenção: Ative 'Efeitos Relativísticos' em Opções > Física para ver a deformação espaço-temporal",
            "🔥 Dica: Use estrelas com massa > 20 solar para ver ejections de matéria mais dramáticas",
            "🕳️ Passo a passo: 1) Crie buraco negro 2) Adicione estrela próxima 3) Aumente gravidade para 200%",
            "⏱️ Acelere o tempo em 10000x para ver todo o processo em alguns segundos",
            "📡 Não esqueça de ativar 'Zonas Térmicas' para ver o plasma superaquecido (>1 milhão °C)",
            "🌀 Curiosidade: O processo pode levar de horas a milhões de anos no tempo real do universo",
            "💫 Para resultados visuais incríveis, use buracos negros supermassivos (>1e15 massas)",
            "🌠 Experimente diferentes ângulos de aproximação para ver padrões de disco diferentes"
        ],
        "cometa": [
            "☄️ Vamos lá! Selecione 'Criar Astros' > 'Cometa' e ajuste a temperatura para -70°C...",
            "💧 Dica: Cometas com alta água (>60%) criam caudas mais brilhantes",
            "🚀 Arraste o mouse para dar velocidade angular - isso afeta a rotação do núcleo",
            "❄️ Para ver sublimação, aproxime o cometa de uma estrela classe O ou B",
            "🌌 Experimente diferentes excentricidades: >0.9 para órbitas alongadas",
            "⏱️ Use o modo 100000x para ver múltiplas órbitas rapidamente",
            "🔭 Ative 'Mostrar Vetores' para visualizar forças gravitacionais atuantes",
            "🌠 Curiosidade: Cada passagem estelar reduz a massa do cometa em 0.01%",
            "🪐 Tente capturar um cometa com Júpiter virtual - massa > 1e27 unidades",
            "📈 Dica avançada: Cometas em ressonância 2:1 com planetas têm órbitas estáveis"
        ],
        "gravidade": [
            "⚖️ Vamos experimentar! Acesse Menu > Física > Constante Gravitacional...",
            "🌌 Tente 10% para simular nebulosas ou 300% para sistemas estelares densos",
            "💥 Cuidado: Valores >500% podem causar instabilidades em sistemas complexos",
            "🔄 Dica: Sistemas binários com alta gravidade evoluem mais rápido",
            "🪐 Para ver ondas gravitacionais, crie dois buracos negros próximos",
            "🌠 Ative 'Visualização de Forças' (F3) para ver campos gravitacionais",
            "📉 Experimente reduzir gravidade durante migração planetária",
            "🌀 Efeito interessante: Gravidade alta + rotação rápida cria planetas achatados",
            "🔭 Não esqueça: Buracos negros têm multiplicador gravitacional 1000x fixo",
            "💫 Desafio: Crie um sistema estável com 20 corpos e gravidade a 200%"
        ],
        "estrela": [
            "⭐ Vamos criar! Selecione 'Corpos Estelares' e escolha o tipo...",
            "🌞 Para uma estrela como o Sol: massa ~1.989e30 kg (1 unidade solar)",
            "💥 Dica: Estrelas acima de 20 massas solares explodem como supernovas",
            "🌈 Ajuste temperatura para >30,000K para estrelas azuis intensas",
            "🔄 Experimente sistemas binários com transferência de massa",
            "🌌 Use metalicidade alta para estrelas de população I (jovens)",
            "⏱️ Acelere o tempo para ver evolução estelar completa",
            "⚠️ Cuidado: Estrelas >100 massas solares podem ser instáveis",
            "🔭 Ative 'Evolução Estelar' em Opções para ver transformações",
            "🌠 Para estrelas de nêutrons, crie supernovas com massa >1.4 solar"
        ],
        "planeta": [
            "🪐 Vamos lá! Menu 'Corpos Planetários' > Escolha tipo...",
            "🌍 Para planeta habitável: posicione na zona verde, água 50%, atmosfera 80%",
            "🌋 Experimente composições extremas: planetas de carbono ou ferro",
            "🌀 Ajuste período de rotação para ver efeitos no clima e formato",
            "💫 Dica: Planetas gasosos precisam de massa >105K unidades",
            "🌌 Crie sistemas com migração planetária ativada",
            "🌠 Para anéis planetários, ajuste espessura e densidade no menu características",
            "⚠️ Luas muito próximas se desintegram na distância de Roche",
            "🔭 Use o modo 'Observatório' (O) para ver detalhes da superfície",
            "🌡️ Experimente temperaturas extremas para ver mudanças de classe automáticas"
        ],
        "meteoroide": [
            "🌠 Vamos criar um meteoroide! Acesse 'Criar Astros' > 'Meteoroide'...",
            "💫 Dica: Ajuste a densidade para ver diferentes efeitos de impacto",
            "🪨 Use o modo câmera lenta para observar a entrada na atmosfera",
            "⚠️ Cuidado: Meteoroides grandes (>100m) podem causar extinções em massa",
            "🌌 Experimente diferentes composições: metálico, rochoso, gelado",
            "🔭 Ative 'Trajetória de Impacto' para ver possíveis colisões",
            "📈 Acelere o tempo para ver chuvas de meteoros em ação",
            "🌠 Curiosidade: Meteoroides são fragmentos de asteroides ou cometas",
            "💥 Para simular explosões, ajuste velocidade de entrada >20 km/s",
            "🌀 Desafio: Crie um sistema com 10 meteoroides colidindo simultaneamente"
        ],
        "meteoro": [
            "🌠 Vamos criar um meteoro! Acesse 'Criar Astros' > 'Meteoro'...",
            "💫 Dica: Ajuste a densidade para ver diferentes efeitos de impacto",
            "🪨 Use o modo câmera lenta para observar a entrada na atmosfera",
            "⚠️ Cuidado: Meteoroides grandes (>100m) podem causar extinções em massa",
            "🌌 Experimente diferentes composições: metálico, rochoso, gelado",
            "🔭 Ative 'Trajetória de Impacto' para ver possíveis colisões",
            "📈 Acelere o tempo para ver chuvas de meteoros em ação",
            "🌠 Curiosidade: Meteoroides são fragmentos de asteroides ou cometas",
            "💥 Para simular explosões, ajuste velocidade de entrada >20 km/s",
            "🌀 Desafio: Crie um sistema com 10 meteoroides colidindo simultaneamente"
        ],
        "gasoso": [
            "🌌 Vamos criar um planeta gasoso! Acesse 'Criar Astros' > 'Planeta Gasoso'...",
            "💫 Dica: Ajuste a massa para ver diferentes efeitos atmosféricos",
            "🌀 Use o modo câmera lenta para observar tempestades gigantes",
            "⚠️ Cuidado: Planetas gasosos muito massivos (>10x Júpiter) podem se tornar anãs marrons",
            "🌠 Experimente diferentes composições atmosféricas: hidrogênio, hélio, metano",
            "🔭 Ative 'Anéis Planetários' para adicionar anéis ao seu gigante gasoso",
            "📈 Acelere o tempo para ver a evolução atmosférica em ação",
            "🌌 Curiosidade: Júpiter tem uma tempestade maior que a Terra há séculos!",
            "💥 Para simular auroras, ajuste o campo magnético do planeta",
            "🪐 Desafio: Crie um sistema com 5 planetas gasosos orbitando uma estrela"
        ],
        "asteroide": [
            "🪨 Vamos criar um asteroide! Acesse 'Criar Astros' > 'Asteroide'...",
            "🌌 Dica: Ajuste a densidade para ver diferentes composições rochosas",
            "💫 Use o modo câmera lenta para observar colisões com planetas",
            "⚠️ Cuidado: Asteroides grandes (>1 km) podem causar extinções em massa",
            "🌠 Experimente diferentes órbitas: elípticas, circulares, inclinadas",
            "🔭 Ative 'Trajetória de Impacto' para ver possíveis colisões",
            "📈 Acelere o tempo para ver a migração de asteroides em ação",
            "🌀 Curiosidade: O cinturão de asteroides entre Marte e Júpiter contém milhões de corpos!",
            "💥 Para simular explosões, ajuste velocidade de impacto >20 km/s",
            "🌌 Desafio: Crie um sistema com 10 asteroides colidindo simultaneamente"
        ],
        "planetoide": [
            "🪐 Vamos criar um planetoide! Acesse 'Criar Astros' > 'Planetoide'...",
            "🌌 Dica: Ajuste a massa para ver diferentes características geológicas",
            "💫 Use o modo câmera lenta para observar a rotação e tectônica",
            "⚠️ Cuidado: Planetoides muito massivos podem se tornar planetas anões",
            "🌠 Experimente diferentes composições: gelo, rocha, metal",
            "🔭 Ative 'Anéis Planetários' para adicionar anéis ao seu planetoide",
            "📈 Acelere o tempo para ver a evolução geológica em ação",
            "🌀 Curiosidade: Plutão é considerado um planetoide por muitos astrônomos!",
            "💥 Para simular impactos, ajuste velocidade de colisão >10 km/s",
            "🌌 Desafio: Crie um sistema com 5 planetoides orbitando uma estrela"
        ],
        "buraco de minhoca": [
            "🌀 Vamos criar um buraco de minhoca! Acesse 'Criar Astros' > 'Buraco de Minhoca'...",
            "🌌 Dica: Ajuste a massa negativa para ver diferentes efeitos de distorção",
            "💫 Use o modo câmera lenta para observar a curvatura do espaço-tempo",
            "⚠️ Cuidado: Buracos de minhoca são teóricos e instáveis na realidade",
            "🌠 Experimente diferentes pontos de entrada e saída no espaço-tempo",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução do buraco de minhoca em ação",
            "🌀 Curiosidade: Buracos de minhoca podem conectar pontos distantes do universo!",
            "💥 Para simular viagens instantâneas, ajuste a distância entre os pontos",
            "🌌 Desafio: Crie um sistema com 3 buracos de minhoca conectando galáxias"
        ],
        "zona habitável": [
            "🌍 Vamos criar uma zona habitável! Acesse 'Criar Astros' > 'Zona Habitável'...",
            "💫 Dica: Ajuste a distância da estrela para ver diferentes zonas habitáveis",
            "🌌 Use o modo câmera lenta para observar a formação de atmosferas",
            "⚠️ Cuidado: Zonas muito próximas podem ser afetadas por radiação intensa",
            "🌠 Experimente diferentes composições atmosféricas: oxigênio, nitrogênio, vapor d'água",
            "🔭 Ative 'Efeitos Climáticos' para ver tempestades e padrões atmosféricos",
            "📈 Acelere o tempo para ver a evolução da zona habitável em ação",
            "🌀 Curiosidade: A Terra está na zona habitável do Sol há bilhões de anos!",
            "💥 Para simular vida, ajuste a temperatura média entre 0°C e 100°C",
            "🌌 Desafio: Crie um sistema com 5 zonas habitáveis orbitando uma estrela"
        ],
        "quasar":[
            "🌌 Vamos criar um quasar! Acesse 'Criar Astros' > 'Quasar'...",
            "💫 Dica: Ajuste a massa do quasar para controlar bem a sua Galáxia",
            "🌠 Use o modo câmera lenta para observar a emissão de radiação intensa",
            "⚠️ Cuidado: Quasares são extremamente luminosos e podem ofuscar galáxias inteiras",
            "🌟 Experimente diferentes composições de matéria no disco de acreção",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução do quasar em ação",
            "🌀 Curiosidade: Quasares são os objetos mais luminosos do universo!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 quasares conectando galáxias distantes"
        ],
        "anã marrom": [
            "🌌 Vamos criar uma anã marrom! Acesse 'Criar Astros' > 'Anã Marrom'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Anãs marrons são objetos intermediários entre estrelas e planetas",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da anã marrom em ação",
            "🌀 Curiosidade: Anãs marrons não têm fusão nuclear sustentada como estrelas!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 anãs marrons orbitando uma estrela"
        ],
        "anã Vermelha": [
            "🌌 Vamos criar uma anã vermelha! Acesse 'Criar Astros' > 'Anã Vermelha'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Anãs vermelhas são as estrelas mais comuns do universo",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da anã vermelha em ação",
            "🌀 Curiosidade: Anãs vermelhas podem viver trilhões de anos!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 5 anãs vermelhas orbitando uma estrela",
        ],
        "estrela gigante": [
            "🌌 Vamos criar uma estrela gigante! Acesse 'Criar Astros' > 'Estrela Gigante'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Estrelas gigantes são muito maiores que o Sol e podem se tornar supernovas",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da estrela gigante em ação",
            "🌀 Curiosidade: Estrelas gigantes podem ter até 1000 vezes o diâmetro do Sol!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 estrelas gigantes orbitando uma estrela"
        ],
        "hipergigante": [
            "🌌 Vamos criar uma hipergigante! Acesse 'Criar Astros' > 'Hipergigante'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Hipergigantes são as estrelas mais massivas conhecidas e podem se tornar supernovas",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da hipergigante em ação",
            "🌀 Curiosidade: Hipergigantes podem ter até 1000 vezes o diâmetro do Sol!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 hipergigantes orbitando uma estrela"
        ],
        "estrela massiva":[
            "🌌 Vamos criar uma estrela massiva! Acesse 'Criar Astros' > 'Estrela Massiva'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Estrelas massivas são muito maiores que o Sol e podem se tornar supernovas",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da estrela massiva em ação",
            "🌀 Curiosidade: Estrelas massivas podem ter até 100 vezes o diâmetro do Sol!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 estrelas massivas orbitando uma estrela"
        ],
        "estrela hipermassiva":[
            "🌌 Vamos criar uma estrela hipermassiva! Acesse 'Criar Astros' > 'Estrela Hipermassiva'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Estrelas hipermassivas são as estrelas mais massivas conhecidas e podem se tornar supernovas",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da estrela hipermassiva em ação",
            "🌀 Curiosidade: Estrelas hipermassivas podem ter até 1000 vezes o diâmetro do Sol!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 estrelas hipermassivas orbitando uma estrela"
        ],
        "anã branca":[
            "🌌 Vamos criar uma anã branca! Acesse 'Criar Astros' > 'Anã Branca'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Anãs brancas são os remanescentes de estrelas que esgotaram seu combustível",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da anã branca em ação",
            "🌀 Curiosidade: Anãs brancas são extremamente densas e pequenas!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 anãs brancas orbitando uma estrela"
        ],
        "anã branca de hélio":[
            "🌌 Vamos criar uma anã branca de hélio! Acesse 'Criar Astros' > 'Anã Branca de Hélio'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hélio em carbono e oxigênio",
            "⚠️ Cuidado: Anãs brancas de hélio são os remanescentes de estrelas que esgotaram seu combustível",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da anã branca de hélio em ação",
            "🌀 Curiosidade: Anãs brancas de hélio são extremamente densas e pequenas!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 anãs brancas de hélio orbitando uma estrela"
        ],
        "anã branca de carbono":[
            "🌌 Vamos criar uma anã branca de carbono! Acesse 'Criar Astros' > 'Anã Branca de Carbono'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de carbono em oxigênio e nitrogênio",
            "⚠️ Cuidado: Anãs brancas de carbono são os remanescentes de estrelas que esgotaram seu combustível",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da anã branca de carbono em ação",
            "🌀 Curiosidade: Anãs brancas de carbono são extremamente densas e pequenas!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 anãs brancas de carbono orbitando uma estrela"
        ],
        "anã negra":[
            "🌌 Vamos criar uma anã negrá! Acesse 'Criar Astros' > 'Anã Neugra'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de hidrogênio em hélio",
            "⚠️ Cuidado: Anãs negrás são os remanescentes de estrelas que esgotaram seu combustível",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da anã negrá em ação",
            "🌀 Curiosidade: Anãs negrás são extremamente densas e pequenas!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 anãs negrás orbitando uma estrela"
        ],
        "estrela de nêutrons":[
            "🌌 Vamos criar uma estrela de nêutrons! Acesse 'Criar Astros' > 'Estrela de Nêutrons'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de nêutrons em prótons e elétrons",
            "⚠️ Cuidado: Estrelas de nêutrons são extremamente densas e pequenas!",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da estrela de nêutrons em ação",
            "🌀 Curiosidade: Estrelas de nêutrons podem girar até 1000 vezes por segundo!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 estrelas de nêutrons orbitando uma estrela"
        ],
        "magnetar":[
            "🌌 Vamos criar um magnetar! Acesse 'Criar Astros' > 'Estrela de Nêutrons Magnetar'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de nêutrons em prótons e elétrons",
            "⚠️ Cuidado: Estrelas de nêutrons magnetares são extremamente densas e pequenas!",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da estrela de nêutrons magnetar em ação",
            "🌀 Curiosidade: Estrelas de nêutrons magnetares podem ter campos magnéticos trilhões de vezes mais fortes que o da Terra!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 estrelas de nêutrons magnetares orbitando uma estrela"
        ],
        "estrela de quarks":[
            "🌌 Vamos criar uma estrela de quarks! Acesse 'Criar Astros' > 'Estrela de Quarks'...",
            "💫 Dica: Ajuste a massa para ver diferentes características atmosféricas",
            "🌠 Use o modo câmera lenta para observar a fusão de quarks em prótons e nêutrons",
            "⚠️ Cuidado: Estrelas de quarks são extremamente densas e pequenas!",
            "🌟 Experimente diferentes composições atmosféricas: metano, água, amônia",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da estrela de quarks em ação",
            "🌀 Curiosidade: Estrelas de quarks podem ter densidades ainda maiores que as estrelas de nêutrons!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 estrelas de quarks orbitando uma estrela"
        ],
        "poeira espacial":[
            "🌌 Vamos criar poeira espacial! Acesse 'Criar Astros' > 'Poeira Espacial'...",
            "💫 Dica: Ajuste a densidade para ver diferentes composições de poeira",
            "🌠 Use o modo câmera lenta para observar a formação de nuvens de poeira",
            "⚠️ Cuidado: Poeira espacial pode se aglomerar e formar planetesimais",
            "🌟 Experimente diferentes composições: silicato, carbono, gelo",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da poeira espacial em ação",
            "🌀 Curiosidade: Poeira espacial é fundamental na formação de estrelas e planetas!",
            "💥 Para simular colisões, ajuste a velocidade de impacto entre partículas",
            "🌌 Desafio: Crie um sistema com 5 nuvens de poeira espacial interagindo"
        ],
        "nebulosa":[
            "🌌 Vamos criar uma nebulosa! Acesse 'Criar Astros' > 'Nebulosa'...",
            "💫 Dica: Ajuste a densidade para ver diferentes composições de gás e poeira",
            "🌠 Use o modo câmera lenta para observar a formação de estrelas dentro da nebulosa",
            "⚠️ Cuidado: Nebulosas podem ser locais de nascimento de novas estrelas",
            "🌟 Experimente diferentes composições: hidrogênio, hélio, carbono",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da nebulosa em ação",
            "🌀 Curiosidade: Nebulosas são fundamentais na reciclagem de material estelar!",
            "💥 Para simular explosões, ajuste a velocidade de expansão da nebulosa",
            "🌌 Desafio: Crie um sistema com 3 nebulosas interagindo"
        ],
        "Singularidade": [   
            "🌌 Vamos criar uma singularidade! Acesse 'Criar Astros' > 'Singularidade'...",
            "💫 Dica: Ajuste a massa para ver diferentes efeitos gravitacionais",
            "🌠 Use o modo câmera lenta para observar a distorção do espaço-tempo",
            "⚠️ Cuidado: Singularidades são pontos de densidade infinita e curvatura extrema",
            "🌟 Experimente diferentes composições: matéria normal, matéria exótica",
            "🔭 Ative 'Efeitos Relativísticos' para ver a distorção da luz ao redor",
            "📈 Acelere o tempo para ver a evolução da singularidade em ação",
            "🌀 Curiosidade: Singularidades são teóricas e não podem ser observadas diretamente!",
            "💥 Para simular jatos relativísticos, ajuste a velocidade de rotação do disco",
            "🌌 Desafio: Crie um sistema com 3 singularidades interagindo"
        ],
        "default": [
            "🚀 Vamos explorar isso juntos! O que exatamente gostaria de criar?",
            "🌌 Posso te guiar passo a passo nessa simulação cósmica!",
            "💫 Ótimo! Comece selecionando o menu apropriado para criar seu astro",
            "🔭 Vamos detalhar: qual parâmetro específico quer ajustar primeiro?",
            "🪐 Primeiro passo: acesse o menu de criação no canto inferior direito",
            "🌠 Sugiro começar com valores padrão e depois ajustar gradualmente",
            "⚡ Para melhores resultados, ative 'Precisão Total' em Opções > Física",
            "📊 Quer que eu mostre um exemplo prático agora mesmo?",
            "🌀 Vamos começar criando os componentes básicos do seu sistema",
            "✨ Digite 'ajuda' a qualquer momento para ver opções de criação"
        ]
    },
    
    negativeResponses: {
        "buraco negro": [
            "🕳️ Sem problemas! Buracos negros podem esperar...",
            "🌌 Tudo bem, esses monstros cósmicos não vão fugir!",
            "💫 Quando quiser ver matéria sendo espaguetificada, estou aqui!",
            "⚠️ Cuidado mesmo! Melhor manter distância desses devoradores cósmicos",
            "🔭 Que tal explorarmos estrelas de nêutrons? São igualmente fascinantes!",
            "🌠 Sabia que o menor buraco negro conhecido tem apenas 3.8 massas solares?",
            "🌀 Os buracos negros supermassivos no centro das galáxias podem ter bilhões de massas solares!",
            "💥 Mesmo sem simular, lembre-se: nada escapa depois do horizonte de eventos!",
            "⏳ Um dia no futuro, até os buracos negros evaporarão pela radiação Hawking",
            "✨ Quando estiver pronto, digite 'buraco negro' para recomeçarmos"
        ],
        "cometa": [
            "☄️ Sem problemas! Cometas podem esperar em sua nuvem de Oort...",
            "❄️ Tudo bem, esses viajantes gelados não vão derreter tão cedo!",
            "🌠 Quando quiser criar uma chuva de meteoros, estou à disposição",
            "💫 Sabia que alguns cometas têm órbitas de milhões de anos?",
            "🚀 O cometa Hale-Bopp ficou visível a olho nu por incríveis 18 meses!",
            "🌌 Cometas interestelares como o Borisov vêm de outros sistemas estelares!",
            "⏱️ A sonda Rosetta orbitou o cometa Churyumov–Gerasimenko por 2 anos!",
            "🔭 O núcleo do cometa Halley tem 15km de comprimento e é muito escuro!",
            "💧 Cometas contêm água pesada com proporções diferentes dos oceanos terrestres",
            "✨ Digite 'cometa' quando quiser explorar esses mensageiros cósmicos"
        ],
        "gravidade": [
            "⚖️ Sem problemas! A gravidade pode esperar...",
            "🌌 Tudo bem, Einstein não ficaria decepcionado!",
            "💫 Quando quiser dobrar o espaço-tempo, estou aqui!",
            "🌀 Sabia que a gravidade é 10^36 vezes mais fraca que a força eletromagnética?",
            "🌠 Em estrelas de nêutrons, a gravidade é 200 bilhões de vezes maior que na Terra!",
            "🪐 Júpiter tem gravidade 2.5x maior que a Terra - suficiente para alterar cometas!",
            "⏱️ A gravidade viaja na velocidade da luz - se o Sol sumisse, sentiríamos após 8 minutos!",
            "💥 Buracos negros são os únicos lugares onde a gravidade vence todas as outras forças",
            "🔭 Ondas gravitacionais detectadas em 2015 confirmaram previsão de Einstein de 1916!",
            "✨ Digite 'gravidade' quando quiser explorar essa força cósmica fundamental"
        ],
        "estrela": [
            "⭐ Sem problemas! As estrelas podem esperar no firmamento...",
            "🌞 Tudo bem, esses faróis cósmicos brilharão por bilhões de anos!",
            "💫 Quando quiver criar uma supernova, estarei aqui!",
            "🌌 A estrela mais próxima, Proxima Centauri, está a 4.24 anos-luz!",
            "🔥 O núcleo solar atinge 15 milhões °C - suficiente para fusão nuclear!",
            "🌠 Betelgeuse, uma supergigante vermelha, é 1000 vezes maior que o Sol!",
            "⏳ Estrelas anãs vermelhas podem viver por trilhões de anos - mais que a idade atual do universo!",
            "💥 Quando uma estrela vira supernova, pode brilhar mais que uma galáxia inteira!",
            "🌀 Estrelas de nêutrons giram até 716 vezes por segundo - os faróis mais precisos do cosmos!",
            "✨ Digite 'estrela' quando quiser acender esses motores cósmicos"
        ],
        "planeta": [
            "🪐 Sem problemas! Os planetas continuarão sua órbita...",
            "🌍 Tudo bem, esses mundos alienígenas não vão fugir!",
            "💫 Quando quiser criar um mundo oceânico, estarei aqui!",
            "🌌 O exoplaneta mais próximo, Proxima Centauri b, está a apenas 4 anos-luz!",
            "🌡️ Vênus é mais quente que Mercúrio devido ao efeito estufa descontrolado!",
            "❄️ Plutão tem montanhas de gelo de água com 3km de altura!",
            "🛰️ Júpiter tem 79 luas conhecidas - um sistema planetário em miniatura!",
            "💥 A Terra é o único planeta conhecido com placas tectônicas ativas!",
            "🌀 Exoplaneta WASP-76b tem chuvas de ferro derretido no lado noturno!",
            "✨ Digite 'planeta' quando quiser moldar novos mundos"
        ],
        "meteoroide": [
            "🌠 Sem problemas! Os meteoroides continuarão sua jornada pelo espaço...",
            "🪨 Tudo bem, esses viajantes cósmicos não vão desaparecer!",
            "💫 Quando quiser ver um meteoroide em ação, estarei aqui!",
            "☄️ O meteoroide Chelyabinsk explodiu com energia 30 vezes maior que a bomba de Hiroshima!",
            "🌌 A maioria dos meteoros são menores que grãos de areia - mas ainda assim impressionantes!",
            "🔥 Meteoroides maiores que 25 metros podem causar danos significativos se atingirem a Terra!",
            "🔭 A chuva de meteoros Perseidas é uma das mais visíveis do ano - sempre emocionante!",
            "💥 O meteoroide Tunguska causou uma explosão equivalente a 15 megatons de TNT em 1908!",
            "🌠 Digite 'meteoroide' quando quiser ver esses viajantes cósmicos em ação!"
        ],
        "asteroide": [
            "🪨 Sem problemas! Os asteroides continuarão sua órbita...",
            "🌌 Tudo bem, esses blocos de rocha não vão desaparecer!",
            "💫 Quando quiser ver um asteroide em ação, estarei aqui!",
            "☄️ O asteroide 16 Psyche é composto principalmente de ferro e níquel - como um núcleo planetário!",
            "🌠 O asteroide Vesta é tão grande que pode ser visto a olho nu!",
            "🛰️ O asteroide Bennu tem uma forma semelhante a um peixinho - e é um alvo de exploração!",
            "💥 O asteroide Apophis passará perto da Terra em 2029 - mas não há risco de colisão!",
            "🌌 O cinturão de asteroides entre Marte e Júpiter contém milhões de corpos rochosos!",
            "🌠 Digite 'asteroide' quando quiser explorar esses blocos de construção do sistema solar!"
        ],
        "planetoide": [
            "🪐 Sem problemas! Os planetoides continuarão sua órbita...",
            "🌌 Tudo bem, esses mundos menores não vão desaparecer!",
            "💫 Quando quiser ver um planetoide em ação, estarei aqui!",
            "🌠 O planetoide Ceres é o maior objeto do cinturão de asteroides e tem água congelada!",
            "🛰️ Plutão é considerado um planetoide por muitos astrônomos - e é fascinante!",
            "💥 O planetoide Eris é maior que Plutão e tem uma atmosfera fina de nitrogênio!",
            "🌌 Os planetoides são remanescentes da formação do sistema solar - verdadeiros fósseis cósmicos!",
            "🌠 Digite 'planetoide' quando quiser explorar esses mundos menores!"
        ],
        "buraco de minhoca": [
            "🌀 Sem problemas! Os buracos de minhoca podem esperar...",
            "🌌 Tudo bem, esses túneis cósmicos não vão desaparecer!",
            "💫 Quando quiser ver um buraco de minhoca em ação, estarei aqui!",
            "⚠️ Cuidado: Buracos de minhoca são teóricos e instáveis na realidade",
            "🌠 Sabia que buracos de minhoca podem conectar pontos distantes do universo?",
            "🔭 A teoria sugere que buracos de minhoca poderiam permitir viagens instantâneas!",
            "💥 Mesmo sem simular, lembre-se: nada escapa depois do horizonte de eventos!",
            "🌀 Digite 'buraco de minhoca' quando quiser explorar esses túneis cósmicos"
        ],
        "zona habitável": [
            "🌍 Sem problemas! As zonas habitáveis podem esperar...",
            "🌌 Tudo bem, esses locais de vida não vão desaparecer!",
            "💫 Quando quiser ver uma zona habitável em ação, estarei aqui!",
            "🌠 A Terra está na zona habitável do Sol há bilhões de anos!",
            "🌡️ A zona habitável varia dependendo da estrela - é fascinante!",
            "🛰️ Exoplanetas na zona habitável são alvos de busca por vida extraterrestre!",
            "💥 Mesmo sem simular, lembre-se: a vida pode existir em ambientes extremos!",
            "🌌 Digite 'zona habitável' quando quiser explorar esses locais de vida"
        ],
        "quasar": [
            "🌌 Sem problemas! Os quasares podem esperar...",
            "💫 Tudo bem, esses faróis cósmicos não vão desaparecer!",
            "🚀 Quando quiser ver um quasar em ação, estarei aqui!",
            "🌠 Quasares são os objetos mais luminosos do universo - verdadeiros faróis cósmicos!",
            "🌀 Sabia que quasares podem emitir jatos relativísticos a velocidades próximas à luz?",
            "🔭 A luz de alguns quasares viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: quasares são fundamentais na evolução das galáxias!",
            "✨ Digite 'quasar' quando quiser explorar esses faróis cósmicos"
        ],
        "anã marrom": [
            "🌌 Sem problemas! As anãs marrons podem esperar...",
            "💫 Tudo bem, esses objetos intermediários não vão desaparecer!",
            "🚀 Quando quiser ver uma anã marrom em ação, estarei aqui!",
            "🌠 Anãs marrons são estrelas falhadas - não têm fusão nuclear sustentada!",
            "🌀 Sabia que anãs marrons podem ter atmosferas ricas em metano e água?",
            "🔭 A luz de algumas anãs marrons viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: anãs marrons são fundamentais na evolução das estrelas!",
            "✨ Digite 'anã marrom' quando quiser explorar esses objetos intermediários"
        ],
        "anã vermelha": [
            "🌌 Sem problemas! As anãs vermelhas podem esperar...",
            "💫 Tudo bem, essas estrelas pequenas não vão desaparecer!",
            "🚀 Quando quiser ver uma anã vermelha em ação, estarei aqui!",
            "🌠 Anãs vermelhas são as estrelas mais comuns do universo - verdadeiros gigantes silenciosos!",
            "🌀 Sabia que anãs vermelhas podem viver trilhões de anos?",
            "🔭 A luz de algumas anãs vermelhas viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: anãs vermelhas são fundamentais na evolução das estrelas!",
            "✨ Digite 'anã vermelha' quando quiser explorar essas estrelas pequenas"
        ],
        "estrela gigante": [
            "🌌 Sem problemas! As estrelas gigantes podem esperar...",
            "💫 Tudo bem, esses colossos cósmicos não vão desaparecer!",
            "🚀 Quando quiser ver uma estrela gigante em ação, estarei aqui!",
            "🌠 Estrelas gigantes são muito maiores que o Sol e podem se tornar supernovas!",
            "🌀 Sabia que algumas estrelas gigantes podem ter até 1000 vezes o diâmetro do Sol?",
            "🔭 A luz de algumas estrelas gigantes viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: estrelas gigantes são fundamentais na evolução das galáxias!",
            "✨ Digite 'estrela gigante' quando quiser explorar esses colossos cósmicos"
        ],
        "hipergigante": [
            "🌌 Sem problemas! As hipergigantes podem esperar...",
            "💫 Tudo bem, esses titãs cósmicos não vão desaparecer!",
            "🚀 Quando quiser ver uma hipergigante em ação, estarei aqui!",
            "🌠 Hipergigantes são as estrelas mais massivas conhecidas e podem se tornar supernovas!",
            "🌀 Sabia que algumas hipergigantes podem ter até 1000 vezes o diâmetro do Sol?",
            "🔭 A luz de algumas hipergigantes viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: hipergigantes são fundamentais na evolução das galáxias!",
            "✨ Digite 'hipergigante' quando quiser explorar esses titãs cósmicos"
        ],
        "estrela massiva": [
            "🌌 Sem problemas! As estrelas massivas podem esperar...",
            "💫 Tudo bem, esses colossos cósmicos não vão desaparecer!",
            "🚀 Quando quiser ver uma estrela massiva em ação, estarei aqui!",
            "🌠 Estrelas massivas são muito maiores que o Sol e podem se tornar supernovas!",
            "🌀 Sabia que algumas estrelas massivas podem ter até 100 vezes o diâmetro do Sol?",
            "🔭 A luz de algumas estrelas massivas viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: estrelas massivas são fundamentais na evolução das galáxias!",
            "✨ Digite 'estrela massiva' quando quiser explorar esses colossos cósmicos"
        ],
        "estrela hipermassiva": [
            "🌌 Sem problemas! As estrelas hipermassivas podem esperar...",
            "💫 Tudo bem, esses titãs cósmicos não vão desaparecer!",
            "🚀 Quando quiser ver uma estrela hipermassiva em ação, estarei aqui!",
            "🌠 Hipergigantes são as estrelas mais massivas conhecidas e podem se tornar supernovas!",
            "🌀 Sabia que algumas hipergigantes podem ter até 1000 vezes o diâmetro do Sol?",
            "🔭 A luz de algumas hipergigantes viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: hipergigantes são fundamentais na evolução das galáxias!",
            "✨ Digite 'estrela hipermassiva' quando quiser explorar esses titãs cósmicos"
        ],
        "anã branca": [
            "🌌 Sem problemas! As anãs brancas podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver uma anã branca em ação, estarei aqui!",
            "🌠 Anãs brancas são os remanescentes de estrelas que esgotaram seu combustível nuclear!",
            "🌀 Sabia que anãs brancas são extremamente densas e pequenas?",
            "🔭 A luz de algumas anãs brancas viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: anãs brancas são fundamentais na evolução das estrelas!",
            "✨ Digite 'anã branca' quando quiser explorar esses remanescentes estelares"
        ],
        "anã branca de hélio": [
            "🌌 Sem problemas! As anãs brancas de hélio podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver uma anã branca de hélio em ação, estarei aqui!",
            "🌠 Anãs brancas de hélio são os remanescentes de estrelas que esgotaram seu combustível nuclear!",
            "🌀 Sabia que anãs brancas de hélio são extremamente densas e pequenas?",
            "🔭 A luz de algumas anãs brancas de hélio viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: anãs brancas de hélio são fundamentais na evolução das estrelas!",
            "✨ Digite 'anã branca de hélio' quando quiser explorar esses remanescentes estelares"
        ],
        "anã branca de carbono": [
            "🌌 Sem problemas! As anãs brancas de carbono podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver uma anã branca de carbono em ação, estarei aqui!",
            "🌠 Anãs brancas de carbono são os remanescentes de estrelas que esgotaram seu combustível nuclear!",
            "🌀 Sabia que anãs brancas de carbono são extremamente densas e pequenas?",
            "🔭 A luz de algumas anãs brancas de carbono viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: anãs brancas de carbono são fundamentais na evolução das estrelas!",
            "✨ Digite 'anã branca de carbono' quando quiser explorar esses remanescentes estelares"
        ],
        "anã negra": [
            "🌌 Sem problemas! As anãs negras podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver uma anã negra em ação, estarei aqui!",
            "🌠 Anãs negras são os remanescentes finais de estrelas que esgotaram todo o seu calor!",
            "🌀 Sabia que anãs negras são extremamente densas e pequenas?",
            "🔭 A luz de algumas anãs negras viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: anãs negras são fundamentais na evolução das estrelas!",
            "✨ Digite 'anã negra' quando quiser explorar esses remanescentes estelares"
        ],
        "estrela de nêutrons": [
            "🌌 Sem problemas! As estrelas de nêutrons podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver uma estrela de nêutrons em ação, estarei aqui!",
            "🌠 Estrelas de nêutrons são os remanescentes de supernovas e são extremamente densas!",
            "🌀 Sabia que uma colher de chá de matéria de estrela de nêutrons pesa mais que toda a humanidade?",
            "🔭 A luz de algumas estrelas de nêutrons viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: estrelas de nêutrons são fundamentais na evolução das estrelas!",
            "✨ Digite 'estrela de nêutrons' quando quiser explorar esses remanescentes estelares"
        ],
        "magnetar": [
            "🌌 Sem problemas! Os magnetares podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver um magnetar em ação, estarei aqui!",
            "🌠 Magnetares são estrelas de nêutrons com campos magnéticos extremamente fortes!",
            "🌀 Sabia que um magnetar pode emitir raios gama e raios-X poderosos?",
            "🔭 A luz de alguns magnetares viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: magnetares são fundamentais na evolução das estrelas!",
            "✨ Digite 'magnetar' quando quiser explorar esses remanescentes estelares"
        ],
        "estrela de quarks": [
            "🌌 Sem problemas! As estrelas de quarks podem esperar...",
            "💫 Tudo bem, esses remanescentes estelares não vão desaparecer!",
            "🚀 Quando quiser ver uma estrela de quarks em ação, estarei aqui!",
            "🌠 Estrelas de quarks são teóricas e podem ser ainda mais densas que estrelas de nêutrons!",
            "🌀 Sabia que estrelas de quarks podem ter uma estrutura interna complexa?",
            "🔭 A luz de algumas estrelas de quarks viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: estrelas de quarks são fundamentais na evolução das estrelas!",
            "✨ Digite 'estrela de quarks' quando quiser explorar esses remanescentes estelares"
        ],
        "poeira espacial": [
            "🌌 Sem problemas! A poeira espacial pode esperar...",
            "💫 Tudo bem, essas partículas cósmicas não vão desaparecer!",
            "🚀 Quando quiser ver poeira espacial em ação, estarei aqui!",
            "🌠 Poeira espacial é fundamental na formação de estrelas e planetas!",
            "🌀 Sabia que a poeira interestelar contém elementos pesados forjados em estrelas?",
            "🔭 A luz de algumas nuvens de poeira viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: a poeira espacial é essencial na evolução do universo!",
            "✨ Digite 'poeira espacial' quando quiser explorar essas partículas cósmicas"
        ],
        "nebulosa": [
            "🌌 Sem problemas! As nebulosas podem esperar...",
            "💫 Tudo bem, essas nuvens cósmicas não vão desaparecer!",
            "🚀 Quando quiser ver uma nebulosa em ação, estarei aqui!",
            "🌠 Nebulosas são berçários estelares onde novas estrelas se formam!",
            "🌀 Sabia que algumas nebulosas são remanescentes de supernovas?",
            "🔭 A luz de algumas nebulosas viajou bilhões de anos para chegar até nós!",
            "💥 Mesmo sem simular, lembre-se: nebulosas são fundamentais na evolução do universo!",
            "✨ Digite 'nebulosa' quando quiser explorar essas nuvens cósmicas"
        ],
        "Singularidade": [
            "🌌 Sem problemas! As singularidades podem esperar...",
            "💫 Tudo bem, esses pontos de densidade infinita não vão desaparecer!",
            "🚀 Quando quiser ver uma singularidade em ação, estarei aqui!",
            "🌠 Singularidades são teóricas e representam a curvatura extrema do espaço-tempo!",
            "🌀 Singularidades podem existir no centro de buracos negros e quasares !"
        ],
        "default": [
            "🌌 Sem problemas! O universo é paciente...",
            "🚀 Tudo bem, a exploração cósmica pode esperar!",
            "💫 Quando quiser continuar, estarei aqui!",
            "🔭 Sabia que há mais estrelas no universo que grãos de areia em todas as praias da Terra?",
            "🌠 A luz que vemos de Andrômeda saiu quando nossos ancestrais pintavam cavernas!",
            "⏳ 99.9% de toda a matéria visível no universo está no estado de plasma!",
            "💥 Em 1 segundo, o Sol produz mais energia que toda humanidade em sua história!",
            "🌀 Buracos negros supermassivos regulam o crescimento das galáxias!",
            "✨ Cada átomo de oxigênio em seu corpo foi forjado no núcleo de uma estrela!",
            "🪐 Estamos todos feitos de poeira estelar!"
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
        "🔢 Cálculo concluído: {expression} = {result}",
        "✨ Solução: {expression} = {result}",
        "⚡ Resolvido: {expression} = {result}",
        "🌌 Equação cósmica: {expression} = {result}",
        "🪐 Matemática estelar: {expression} = {result}",
        "💫 Computação gravitacional: {expression} = {result}",
        "📐 Geometria universal: {expression} = {result}",
        "📊 Análise numérica: {expression} = {result}",
        "🔭 Observação matemática: {expression} = {result}",
        "🌠 Fórmula resolvida: {expression} = {result}",
        "🚀 Cálculo propulsado: {expression} = {result}",
        "🛰️ Resultado orbital: {expression} = {result}",
        "⏱️ Tempo de computação: 0s | {expression} = {result}",
        "⚖️ Equilíbrio numérico: {expression} = {result}",
        "🌀 Vortex matemático: {expression} = {result}",
        "🌡️ Temperatura computacional: 0K | {expression} = {result}",
        "📈 Projeção numérica: {expression} = {result}",
        "📉 Análise inversa: {expression} = {result}",
        "🧪 Experimento numérico: {expression} = {result}",
        "🔬 Microscópio matemático: {expression} = {result}",
        "🖥️ Computação quântica simulada: {expression} = {result}",
        "💻 Algoritmo concluído: {expression} = {result}",
        "🤖 Processamento robótico: {expression} = {result}",
        "🌟 Iluminação numérica: {expression} = {result}",
        "🌌 Cosmos resolvido: {expression} = {result}",
        "🧬 Genética matemática: {expression} = {result}",
        "🌠 Astronomia numérica: {expression} = {result}",
        "🪐 Astrofísica computacional: {expression} = {result}",
        "🔭 Telescópio matemático: {expression} = {result}",
        "🌌 Cosmologia numérica: {expression} = {result}",
        "🌟 Estrela resolvida: {expression} = {result}",
        "🌠 Galáxia computada: {expression} = {result}",
        "🛸 Navegação numérica: {expression} = {result}",
        "🌌 Universo calculado: {expression} = {result}",
        "🌠 Constelação resolvida: {expression} = {result}",
        "🪐 Planeta computado: {expression} = {result}",
        "🌌 Nebulosa numérica: {expression} = {result}",
        "🌠 Supernova resolvida: {expression} = {result}",
        "🛰️ Satélite matemático: {expression} = {result}",
        "🌌 Espaço-tempo computado: {expression} = {result}",
        "🌠 Horizonte de eventos resolvido: {expression} = {result}",
        "🌀 Singularidade numérica: {expression} = {result}",
        "🌌 Big Bang computado: {expression} = {result}",
        "🌠 Expansão cósmica resolvida: {expression} = {result}",
        "🪐 Anel planetário computado: {expression} = {result}",
        "🌌 Buraco de minhoca numérico: {expression} = {result}",
        "🌠 Via Láctea computada: {expression} = {result}",
        "🛸 Nave espacial numérica: {expression} = {result}",
        "🌌 Multiverso computado: {expression} = {result}",
        "🌠 Dimensão paralela resolvida: {expression} = {result}",
        "🪐 Exoplaneta computado: {expression} = {result}",
        "🌌 Asteroide numérico: {expression} = {result}",
        "🌠 Meteorito resolvido: {expression} = {result}",
        "🛰️ Sonda espacial numérica: {expression} = {result}",
        "🌌 Cometa computado: {expression} = {result}",
        "🌠 Chuva de meteoros resolvida: {expression} = {result}",
        "🪐 Lua computada: {expression} = {result}",
        "🌌 Sistema solar numérico: {expression} = {result}",
        "🌠 Órbita planetária resolvida: {expression} = {result}",
        "🛰️ Estação espacial numérica: {expression} = {result}",
        "🌌 Galáxia espiral computada: {expression} = {result}",
        "🌠 Galáxia elíptica resolvida: {expression} = {result}",
        "🪐 Galáxia irregular computada: {expression} = {result}",
        "🌌 Quasar numérico: {expression} = {result}",
        "🌠 Pulsar resolvido: {expression} = {result}",
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
    greetings: ["ola", "olá", "oi", "eae", "hello", "hi", "bom dia", "boa tarde", "boa noite", "saudações", "hey", "ei", "saudações cósmicas", "bom dia estelar", "oi singularity"],
    farewells: ["tchau", "adeus", "até logo", "flw", "bye", "encerrar", "sair", "fechar", "exit", "xau", "partiu", "até mais", "desconectar", "encerrar sessão", "adeus singularity"],
    
    greetingsResponses: [
        "✨ Olá, explorador cósmico! Como posso ajudar sua jornada pelas estrelas?",
        "🚀 Bem-vindo ao SIU 2D! Pronto para criar universos incríveis?",
        "🌌 Saudações interestelares! Em que posso ajudar hoje?",
        "🪐 E aí, comandante! Qual desafio cósmico vamos enfrentar?",
        "💫 Saudação gravitacional! Como posso auxiliar sua exploração?",
        "🌟 Boas-vindas, criador de mundos! O que vamos simular hoje?",
        "🌠 Salve, viajante das estrelas! Pronto para uma aventura cósmica?",
        "🛸 Transmissão recebida! Como posso ajudar sua missão espacial?",
        "🔭 Olá, astrônomo virtual! Qual mistério cósmico vamos desvandar?",
        "⚡ Energia cósmica fluindo! Como posso ajudar?",
        "🌀 Vortex de boas-vindas ativado! Qual seu comando?",
        "🌠 Raios cósmicos detectados! Olá, como posso ajudar?",
        "🪐 Alinhamento planetário perfeito para sua chegada! Bem-vindo!",
        "🌌 Dobra espacial estabilizada! Saudações, explorador!",
        "🚀 Sistemas online! Singularity à disposição para suas dúvidas",
        "🔭 Telescópios focados! Pronto para explorar o universo?",
        "🌠 Chuva de meteoros de boas-vindas! Como posso ajudar?",
        "💻 Sistemas de IA cósmica ativados! Olá, humano!",
        "🛰️ Satélites de comunicação sincronizados! Conexão estabelecida!",
        "🌌 Portal dimensional aberto! Bem-vindo ao SIU 2D!",
        "🌟 Constelações alinhadas para sua chegada! Saudações!",
        "⚛️ Partículas cósmicas entusiasmadas com sua presença! Olá!",
        "🌠 Cometa de boas-vindas em trajetória! Saudações, viajante!",
        "🪐 Anéis planetários oscilando em saudação! Bem-vindo!",
        "✨ Energia estelar canalizada! Singularity à sua disposição!"
    ],
    
    farewellResponses: [
        "🌠 Até a próxima, viajante das estrelas! Que sua jornada seja épica!",
        "🛸 Boas viagens pelo cosmos! Volte quando novas dúvidas surgirem!",
        "💫 Encerrando transmissão. Lembre-se: O universo é seu playground!",
        "👋 Tchau! Quando quiser criar um buraco negro, estou aqui!",
        "🚀 Partida confirmada! Retorne para mais aventuras cósmicas!",
        "🌌 Desconectando... Mas o universo continua sua expansão!",
        "🪐 Até logo, comandante! Que encontremos mais horizontes cósmicos!",
        "✨ Missão concluída! Volte para novas explorações estelares!",
        "🔭 Sinal perdido... Mas as estrelas sempre guiarão seu caminho!",
        "⚡ Energias cósmicas se despedem! Até a próxima órbita!",
        "🌀 Campo gravitacional desativado! Até breve, explorador!",
        "🌠 Trajetória de saída calculada! Até a próxima, viajante!",
        "🛰️ Satélites em modo de espera! Volte quando precisar!",
        "💻 Sistemas em hibernação cósmica! Até logo!",
        "🪐 Alinhamento planetário de despedida! Boas jornadas!",
        "🌌 Portal dimensional fechado! Retorne quando quiser!",
        "🌟 Constelações brilham em sua despedida! Até breve!",
        "⚛️ Partículas cósmicas desaceleradas! Até a próxima!",
        "🌠 Cometa de despedida em trajetória! Boas viagens!",
        "🔭 Telescópios desfocando! Até a próxima observação!",
        "💫 Dobra espacial desfeita! Até a próxima jornada!",
        "🚀 Foguetes de despedida acionados! Boas viagens!",
        "🌠 Raios cósmicos de despedida detectados! Até breve!",
        "🛸 Nave de despedida em órbita! Volte logo!",
        "✨ Último pulso estelar! Desconectando..."
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
        "🌌 Não encontrei isso no meu banco estelar... Pergunte sobre 'cometas', 'buracos negros' ou 'controles'!",
        "🛸 Meu conhecimento é cósmico - tente perguntar sobre física do jogo ou elementos do universo",
        "🔭 Foco no espaço! Que tal 'Como criar uma nebulosa?' ou 'Qual massa para um buraco negro?'",
        "📡 Sinal perdido... Reformule sobre criação de astros, evolução estelar ou controles do SIU 2D",
        "💫 Deseja calcular algo? Use números e operadores como '3 * 5^2' ou pergunte sobre termos cósmicos!",
        "🪐 Pista cósmica: Tente termos como 'gravidade', 'estrela', 'planeta' ou 'evolução'!",
        "⚡ Nova mensagem estelar detectada! Formule como 'Como criar um quasar?' ou 'O que é zona habitável?'"
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