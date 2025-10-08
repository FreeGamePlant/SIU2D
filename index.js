//#region game function
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}
let currentProgress = 0;
function updateSingularityIcon() {
    const bar = document.getElementById('loadingBar');
    const progressBar = document.getElementById('loadingProgress');
    const icon = document.getElementById('singularityIcon');
    if (!bar || !icon || !progressBar) return;
    const barLeft = bar.offsetLeft;
    const progressWidth = progressBar.offsetWidth;
    const iconLeft = barLeft + progressWidth - icon.offsetWidth / 2;
    icon.style.left = iconLeft + 'px';
}
window.addEventListener('resize', function() {
    updateSingularityIcon();
});
function updateLoadingText() {
    const loadingText = document.getElementById('loadingText');
    const messages = [
        'Loading...',
        'Initializing universe...',
        'Preparing simulation...',
        'Almost ready...',
        'Finalizing...'
    ];
    let messageIndex = 0;
    const interval = setInterval(() => {
        if (messageIndex < messages.length) {
            loadingText.textContent = messages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(interval);
        }
    }, 3000);
}
let quoteInterval = null;
function showRandomQuote(loadingQuotesArr) {
    const el = document.getElementById('loadingQuotes');
    if (!el || !Array.isArray(loadingQuotesArr) || loadingQuotesArr.length === 0) return;
    let lastIdx = -1;
    function nextQuote() {
        let idx;
        do {
            idx = Math.floor(Math.random() * loadingQuotesArr.length);
        } while (idx === lastIdx && loadingQuotesArr.length > 1);
        lastIdx = idx;
        el.textContent = loadingQuotesArr[idx];
    }
    nextQuote();
    quoteInterval = setInterval(nextQuote, 8500);
}
(function mainLoading() {
    createParticles();
    let lang = localStorage.getItem('siu2d_lang') || (navigator.language || navigator.userLanguage || 'en').split('-')[0];
    const supportedLangs = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'ru', 'zh', 'ar', 'nl', 'tr', 'hi'];
    if (!supportedLangs.includes(lang)) lang = 'en';
    fetch(`json/lq.${lang}.json`)
        .then(response => response.ok ? response.json() : fetch('json/lq.en.json').then(r => r.json()))
        .then(loadingQuotesArr => {
            setTimeout(() => showRandomQuote(loadingQuotesArr), 100);
        })
        .catch(() => {/* fail silently */});
    setTimeout(updateLoadingText, 5000);
    const minTime = 15000;
    const maxTime = 30000;
    const totalTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    const loadingProgress = document.getElementById('loadingProgress');
    let progress = 0;
    let currentProgress = 0;
    const startTime = Date.now();
    function animateProgress() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / totalTime, 1);
        currentProgress = progress;
        loadingProgress.style.width = (progress * 100) + '%';
        updateSingularityIcon();
        if (progress < 1) {
            requestAnimationFrame(animateProgress);
        }
    }
    animateProgress();
    setTimeout(() => {
        document.getElementById('splashScreen').classList.add('fade-out');
        if (quoteInterval) clearInterval(quoteInterval);
    }, totalTime * 0.8);
    setTimeout(() => {
        window.location.href = "app/src/data/html/SIU2Dgame.html";
    }, totalTime);
})();
//#endregion

//#region game index info
const info = [
    '0.0.3',
    'vs code "Engine"',
    'By Free Game Plant',
    'Thank for gaming :D'
]
console.log(info)
//#endregion