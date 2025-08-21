self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("siu2d-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app/src/data/html/SIU2Dgame.html",
        "./app/src/data/html/tut.html",
        "./app/src/data/style/css/style.css",
        "./app/src/data/style/css/game.css",
        "./app/src/data/style/css/singu.css",
        "./app/src/data/style/css/SIU2D.css",
        "./app/src/data/style/css/editPanelOverride.css",
        "./app/src/data/style/css/astroTimePanel.css",
        "./app/src/data/script/js/game.js",
        "./app/src/data/script/js/singu.en.js",
        "./app/src/data/script/js/singu.pt.js",
        "./app/src/data/script/js/singu.ar.js",
        "./app/src/data/script/js/singu.de.js",
        "./app/src/data/script/js/singu.fr.js",
        "./app/src/data/script/js/singu.hi.js",
        "./app/src/data/script/js/singu.it.js",
        "./app/src/data/script/js/singu.ja.js",
        "./app/src/data/script/js/singu.ko.js",
        "./app/src/data/script/js/singu.nl.js",
        "./app/src/data/script/js/singu.ru.js",
        "./app/src/data/script/js/singu.tr.js",
        "./app/src/data/script/js/singu.zh.js",
        "./app/src/data/script/js/tut.js",
        "./manifest.json",
        "./app/src/data/assets/img/lOGOFGP.png",
        "./app/src/data/assets/img/singularity.png.png",
        "./app/src/data/assets/locales/ar.json",
        "./app/src/data/assets/locales/de.json",
        "./app/src/data/assets/locales/en.json",
        "./app/src/data/assets/locales/fr.json",
        "./app/src/data/assets/locales/hi.json",
        "./app/src/data/assets/locales/it.json",
        "./app/src/data/assets/locales/ja.json",
        "./app/src/data/assets/locales/ko.json",
        "./app/src/data/assets/locales/nl.json",
        "./app/src/data/assets/locales/pt.json",
        "./app/src/data/assets/locales/ru.json",
        "./app/src/data/assets/locales/tr.json",
        "./app/src/data/assets/locales/zh.json",
        "./app/src/data/assets/audio/SIU2D_soundtrack.mp3",
        "./app/src/data/assets/audio/Sound effect colide 1.mp3",
        "./app/src/data/assets/audio/Sound effect colide 2.mp3",
        "./app/src/data/assets/audio/Sound effect colide 3.mp3",
        "./app/src/data/assets/audio/Sound effect colide 4.mp3",
        "./app/src/data/assets/audio/Sound effect colide 5.mp3",
        "./app/src/data/assets/audio/Sound effect colide 6.mp3",
        "./app/src/data/assets/audio/Sound effect colide 7.mp3",
        "./app/src/data/assets/audio/Sound effect colide 8.mp3",
        "./app/src/data/assets/audio/Sound effect colide 9.mp3",
        "./app/src/data/assets/audio/Sound effect colide 10.mp3",
        "./app/src/data/assets/audio/Sound effect colide 11.mp3",
        "./app/src/data/assets/audio/Sound effect colide 12.mp3",
        "./app/src/data/assets/audio/Sound effect colide 13.mp3",
        "./app/src/data/assets/audio/Sound effect colide 14.mp3",
        "./app/src/data/assets/audio/Sound effect colide 15.mp3",
        "./icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});