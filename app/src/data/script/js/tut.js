function tutT(key) {
  if (window.i18n && typeof window.i18n.t === 'function') {
    return window.i18n.t(key);
  }
  return key;
}

let tutorialStep = 0;
let tutorialAstroCreated = false;
let tutorialSecondAstroCreated = false;
let tutorialStarCreated = false;

const tutorialSingularity = document.getElementById('tutorialSingularity');
if (tutorialSingularity && !document.getElementById('tutorialSingularityText')) {
  tutorialSingularity.innerHTML = `
    <div style="display:flex;align-items:center;gap:18px;">
      <img src="../../data/assets/img/lOGOFGP.png" alt="T Singularity" style="width:54px;height:54px;border-radius:50%;box-shadow:0 0 12px #fff4;">
      <div id="tutorialSingularityText" style="font-size:1.13rem;color:#fff;line-height:1.5;"></div>
    </div>
    <div id="tutorialSingularityAction" style="margin-top:18px;text-align:right;"></div>
  `;
}

const tutorialSingularityText = document.getElementById('tutorialSingularityText');
const tutorialSingularityAction = document.getElementById('tutorialSingularityAction');

let tutTypewriterTimeout = null;
let tutTypewriterId = 0;

function showTutorialSingularity(msgKey, actionHtml = '', highlight = null) {
  const msg = tutT(msgKey) || msgKey;
  tutorialSingularity.style.display = 'block';
  tutorialSingularityText.textContent = '';
  
  if (tutTypewriterTimeout) clearTimeout(tutTypewriterTimeout);
  tutTypewriterId++;
  const thisId = tutTypewriterId;
  let i = 0;
  
  function typeChar() {
    if (thisId !== tutTypewriterId) return;
    if (i < msg.length) {
      tutorialSingularityText.textContent += msg[i];
      i++;
      tutTypewriterTimeout = setTimeout(typeChar, msg[i-1]===' ' ? 18 : 32 + Math.random()*18);
    }
  }
  typeChar();
  
  tutorialSingularityAction.innerHTML = actionHtml;
  if (highlight) {
    highlight.classList.add('tut-highlight');
  }
}

function hideTutorialSingularity() {
  tutorialSingularity.style.display = 'none';
}

function startTutorialSequence() {
  tutorialStep = 0;
  tutorialAstroCreated = false;
  tutorialSecondAstroCreated = false;
  tutorialStarCreated = false;
  nextTutorialStep();
}

function isAnyStarCreated() {
  return typeof window.isAnyStarPresent === 'function' 
    ? window.isAnyStarPresent() 
    : false;
}

function nextTutorialStep(forceReload = false) {
  switch(tutorialStep) {
    case 0:
      showTutorialSingularity('welcome');
      setTimeout(() => {
        tutorialStep = 1;
        showTutorialSingularity(
          'intro',
          `<button id="btnTutContinue1" class="cutscene-btn">${tutT('buttons.ok')}</button>`
        );
        document.getElementById('btnTutContinue1').onclick = () => {
          showTutorialSingularity(
            'click_to_create',
            `<button id="btnTutCreateFirst" class="cutscene-btn">${tutT('buttons.next')}</button>`
          );
          document.getElementById('btnTutCreateFirst').onclick = () => {
            tutorialAstroCreated = true;
            setTimeout(nextTutorialStep, 300);
          };
        };
      }, 2200);
      break;
      
    case 1:
      if (tutorialAstroCreated || forceReload) {
        showTutorialSingularity(
          'zoom_instructions',
          `<button id="btnTutContinue2" class="cutscene-btn">${tutT('buttons.next')}</button>`
        );
        document.getElementById('btnTutContinue2').onclick = () => {
          tutorialStep = 2;
          showTutorialSingularity(
            'move_camera',
            `<button id="btnTutContinue3" class="cutscene-btn">${tutT('buttons.next')}</button>`
          );
          document.getElementById('btnTutContinue3').onclick = () => {
            tutorialStep = 3;
            showTutorialSingularity(
              'camera_adjusted',
              `<button id="btnTutContinue4" class="cutscene-btn">${tutT('buttons.ok')}</button>`
            );
            document.getElementById('btnTutContinue4').onclick = () => {
              showTutorialSingularity(
                'create_second',
                `<button id="btnTutCreateSecond" class="cutscene-btn">${tutT('buttons.next')}</button>`
              );
              document.getElementById('btnTutCreateSecond').onclick = () => {
                tutorialSecondAstroCreated = true;
                setTimeout(nextTutorialStep, 300);
              };
            };
          };
        };
      }
      break;
      
    case 3:
      if (tutorialSecondAstroCreated) {
        tutorialStep = 4;
        showTutorialSingularity(
          'wait_collision',
          `<button id="btnTutContinue5" class="cutscene-btn">${tutT('buttons.ok')}</button>`
        );
        document.getElementById('btnTutContinue5').onclick = () => {
          showTutorialSingularity(
            'create_orbit',
            `<button id="btnTutCreateOrbit" class="cutscene-btn">${tutT('buttons.next')}</button>`
          );
          document.getElementById('btnTutCreateOrbit').onclick = () => {
            tutorialStep = 5;
            showTutorialSingularity(
              'open_edit_panel',
              `<button id="btnTutOpenEdit" class="cutscene-btn">${tutT('buttons.next')}</button>`
            );
            document.getElementById('btnTutOpenEdit').onclick = () => {
              tutorialStep = 6;
              showTutorialSingularity(
                'change_name',
                `<button id="btnTutChangeName" class="cutscene-btn">${tutT('buttons.next')}</button>`
              );
              document.getElementById('btnTutChangeName').onclick = () => {
                tutorialStep = 7;
                showTutorialSingularity(
                  'change_attributes',
                  `<button id="btnTutContinueAtributos" class="cutscene-btn">${tutT('buttons.ok')}</button>`
                );
                document.getElementById('btnTutContinueAtributos').onclick = () => {
                  tutorialStep = 8;
                  showTutorialSingularity(
                    'change_description',
                    `<button id="btnTutContinueDescricao" class="cutscene-btn">${tutT('buttons.ok')}</button>`
                  );
                  document.getElementById('btnTutContinueDescricao').onclick = () => {
                    tutorialStep = 9;
                    showTutorialSingularity(
                      'close_edit',
                      `<button id="btnTutCloseEdit" class="cutscene-btn">${tutT('buttons.next')}</button>`
                    );
                    document.getElementById('btnTutCloseEdit').onclick = () => {
                      tutorialStep = 10;
                      showTutorialSingularity(
                        'open_menu',
                        `<button id="btnTutOpenMenu" class="cutscene-btn">${tutT('buttons.next')}</button>`
                      );
                      document.getElementById('btnTutOpenMenu').onclick = () => {
                        tutorialStep = 11;
                        showTutorialSingularity(
                          'see_variety',
                          `<button id="btnTutContinueScrollAstros" class="cutscene-btn">${tutT('buttons.ok')}</button>`
                        );
                        document.getElementById('btnTutContinueScrollAstros').onclick = () => {
                          tutorialStep = 12;
                          showTutorialSingularity(
                            'create_star',
                            `<button id="btnTutCreateStar" class="cutscene-btn">${tutT('buttons.next')}</button>`
                          );
                          document.getElementById('btnTutCreateStar').onclick = () => {
                            tutorialStarCreated = true;
                            setTimeout(nextTutorialStep, 300);
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      }
      break;
      
    case 12:
      showTutorialSingularity(
        'open_menu_again',
        `<button id="btnTutOpenMenuAgain" class="cutscene-btn">${tutT('buttons.next')}</button>`
      );
      document.getElementById('btnTutOpenMenuAgain').onclick = () => {
        showTutorialSingularity(
          'choose_rocky',
          `<button id="btnTutChooseRocky" class="cutscene-btn">${tutT('buttons.next')}</button>`
        );
        document.getElementById('btnTutChooseRocky').onclick = () => {
          showTutorialSingularity(
            'observe_climate',
            `<button id="btnTutContinueClima" class="cutscene-btn">${tutT('buttons.next')}</button>`
          );
          document.getElementById('btnTutContinueClima').onclick = () => {
            tutorialStarCreated = true;
            setTimeout(nextTutorialStep, 300);
            tutorialStep = 13;
          };
        };
      };
      break;
      
    case 13:
      if (tutorialStarCreated) {
        tutorialStep = 14;
        showTutorialSingularity(
          'press_f',
          `<button id="btnTutPressF" class="cutscene-btn">${tutT('buttons.next')}</button>`
        );
        document.getElementById('btnTutPressF').onclick = () => {
          tutorialStep = 15;
          showTutorialSingularity(
            'open_after_f',
            `<button id="btnTutOpenAfterF" class="cutscene-btn">${tutT('buttons.next')}</button>`
          );
          document.getElementById('btnTutOpenAfterF').onclick = () => {
            tutorialStep = 16;
            showTutorialSingularity(
              'choose_tauri',
              `<button id="btnTutChooseTauri" class="cutscene-btn">${tutT('buttons.next')}</button>`
            );
            document.getElementById('btnTutChooseTauri').onclick = () => {
              tutorialStep = 18;
              showTutorialSingularity(
                'open_after_tauri',
                `<button id="btnTutOpenAfterTauri" class="cutscene-btn">${tutT('buttons.next')}</button>`
              );
              document.getElementById('btnTutOpenAfterTauri').onclick = () => {
                tutorialStep = 19;
                showTutorialSingularity(
                  'time_control',
                  `<button id="btnTutTimeControl" class="cutscene-btn">${tutT('buttons.next')}</button>`
                );
                document.getElementById('btnTutTimeControl').onclick = () => {
                  tutorialStep = 20;
                  showTutorialSingularity(
                    'close_menu',
                    `<button id="btnTutCloseMenu" class="cutscene-btn">${tutT('buttons.next')}</button>`
                  );
                  document.getElementById('btnTutCloseMenu').onclick = () => {
                    tutorialStep = 21;
                    showTutorialSingularity(
                      'see_evolution',
                      `<button id="btnTutContinueEvolucao" class="cutscene-btn">${tutT('buttons.next')}</button>`
                    );
                    document.getElementById('btnTutContinueEvolucao').onclick = () => {
                      tutorialStep = 22;
                      showTutorialSingularity(
                        'press_n',
                        `<button id="btnTutPressN" class="cutscene-btn">${tutT('buttons.next')}</button>`
                      );
                      document.getElementById('btnTutPressN').onclick = () => {
                        tutorialStep = 22.5;
                        showTutorialSingularity(
                          'press_t',
                          `<button id="btnTutPressT" class="cutscene-btn">${tutT('buttons.next')}</button>`
                        );
                        document.getElementById('btnTutPressT').onclick = () => {
                          tutorialStep = 23;
                          showTutorialSingularity(
                            'tutorial_complete',
                            `<button id="btnTutFinalOk" class="cutscene-btn">${tutT('buttons.ok')}</button>`
                          );
                          document.getElementById('btnTutFinalOk').onclick = () => {
                            showTutorialSingularity(
                              'redirecting',
                              ''
                            );
                            const fadeDiv = document.createElement('div');
                            fadeDiv.style.position = 'fixed';
                            fadeDiv.style.left = '0';
                            fadeDiv.style.top = '0';
                            fadeDiv.style.width = '100vw';
                            fadeDiv.style.height = '100vh';
                            fadeDiv.style.background = '#fff';
                            fadeDiv.style.opacity = '0';
                            fadeDiv.style.zIndex = '99999';
                            fadeDiv.style.transition = 'opacity 1.2s';
                            unlockAchievement(1);
                            document.body.appendChild(fadeDiv);
                            setTimeout(() => {
                              fadeDiv.style.opacity = '1';
                              setTimeout(() => {
                                window.location.href = '../html/SIU2Dgame.html';
                              }, 5000);
                            }, 400);
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      }
      break;
  }
}

window.tutorialNotifyAstroCreated = function(type) {

};

function startTutorialAfterCutscene() {
  setTimeout(() => {
    startTutorialSequence();
  }, 100);
}

const cutsceneOverlay = document.getElementById('cutsceneOverlay');
const cutsceneDialogue = document.getElementById('cutsceneDialogue');
const cutsceneChoices = document.getElementById('cutsceneChoices');

let cutsceneStep = 0;
let cutsceneFadeTimeout = null;
let typingTimeout = null;

function typeText(element, text, speed = 28, callback) {
  if (!element) return;
  let i = 0;
  element.textContent = '';
  function typeChar() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      typingTimeout = setTimeout(typeChar, text[i-1]===' '?speed/2:speed + Math.random()*18);
    } else if (callback) {
      callback();
    }
  }
  typeChar();
}

let warpCanvas = null;
let warpCtx = null;
let warpAnimId = null;
let warpStripes = [];
let warpStars = [];
let warpSpeedMultiplier = 1;
let whiteFadeAlpha = 0;
let whiteFadeDirection = 0; 
let whiteFadeCallback = null;

function createWarpElements() {
  if (warpCanvas) return;
  warpCanvas = document.createElement('canvas');
  warpCanvas.style.position = 'fixed';
  warpCanvas.style.left = '0';
  warpCanvas.style.top = '0';
  warpCanvas.style.width = '100vw';
  warpCanvas.style.height = '100vh';
  warpCanvas.style.zIndex = '9999';
  warpCanvas.style.pointerEvents = 'none';
  warpCanvas.width = window.innerWidth;
  warpCanvas.height = window.innerHeight;
  document.body.appendChild(warpCanvas);
  warpCtx = warpCanvas.getContext('2d');
  window.addEventListener('resize', resizeWarpCanvas);
}

function resizeWarpCanvas() {
  if (!warpCanvas) return;
  warpCanvas.width = window.innerWidth;
  warpCanvas.height = window.innerHeight;
}

function initWarpObjects() {
  const w = warpCanvas.width, h = warpCanvas.height;
  warpStripes = [];
  warpStars = [];
  for (let i = 0; i < 32; i++) {
    const angle = Math.random() * Math.PI * 2;
    warpStripes.push({
      x: w/2,
      y: h/2,
      angle,
      speed: 16 + Math.random()*12,
      length: 80 + Math.random()*120,
      width: 1.2 + Math.random()*2.2,
      alpha: 0.18 + Math.random()*0.22
    });
  }
  for (let i = 0; i < 38; i++) {
    const angle = Math.random() * Math.PI * 2;
    warpStars.push({
      x: w/2,
      y: h/2,
      angle,
      speed: 10 + Math.random()*18,
      radius: 0.7 + Math.random()*1.7,
      alpha: 0.25 + Math.random()*0.5
    });
  }
}

function drawWarp() {
  if (!warpCanvas || !warpCtx) return;
  const w = warpCanvas.width, h = warpCanvas.height;
  warpCtx.clearRect(0,0,w,h);
  for (let s of warpStripes) {
    warpCtx.save();
    warpCtx.globalAlpha = s.alpha;
    warpCtx.strokeStyle = '#fff';
    warpCtx.lineWidth = s.width;
    warpCtx.beginPath();
    warpCtx.moveTo(s.x, s.y);
    const ex = s.x + Math.cos(s.angle) * s.length;
    const ey = s.y + Math.sin(s.angle) * s.length;
    warpCtx.lineTo(ex, ey);
    warpCtx.stroke();
    warpCtx.restore();
    s.x += Math.cos(s.angle) * s.speed * warpSpeedMultiplier;
    s.y += Math.sin(s.angle) * s.speed * warpSpeedMultiplier;
    if (s.x < -100 || s.x > w+100 || s.y < -100 || s.y > h+100) {
      s.x = w/2; s.y = h/2;
      s.angle = Math.random() * Math.PI * 2;
      s.speed = 16 + Math.random()*12;
      s.length = 80 + Math.random()*120;
      s.width = 1.2 + Math.random()*2.2;
      s.alpha = 0.18 + Math.random()*0.22;
    }
  }
  for (let star of warpStars) {
    warpCtx.save();
    warpCtx.globalAlpha = star.alpha;
    warpCtx.beginPath();
    warpCtx.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    warpCtx.fillStyle = '#fff';
    warpCtx.shadowColor = '#fff';
    warpCtx.shadowBlur = 8;
    warpCtx.fill();
    warpCtx.restore();
    star.x += Math.cos(star.angle) * star.speed * warpSpeedMultiplier;
    star.y += Math.sin(star.angle) * star.speed * warpSpeedMultiplier;
    if (star.x < -20 || star.x > w+20 || star.y < -20 || star.y > h+20) {
      star.x = w/2; star.y = h/2;
      star.angle = Math.random() * Math.PI * 2;
      star.speed = 10 + Math.random()*18;
      star.radius = 0.7 + Math.random()*1.7;
      star.alpha = 0.25 + Math.random()*0.5;
    }
  }
  if (whiteFadeAlpha > 0) {
    warpCtx.save();
    warpCtx.globalAlpha = whiteFadeAlpha;
    warpCtx.fillStyle = "#fff";
    warpCtx.fillRect(0,0,w,h);
    warpCtx.restore();
  }
  if (whiteFadeDirection === 1) { 
    whiteFadeAlpha += 0.025;
    if (whiteFadeAlpha >= 1) {
      whiteFadeAlpha = 1;
      whiteFadeDirection = 0;
      if (whiteFadeCallback) whiteFadeCallback();
    }
  } else if (whiteFadeDirection === 2) { 
    whiteFadeAlpha -= 0.02;
    if (whiteFadeAlpha <= 0) {
      whiteFadeAlpha = 0;
      whiteFadeDirection = 0;
      if (whiteFadeCallback) whiteFadeCallback();
    }
  }
  warpAnimId = requestAnimationFrame(drawWarp);
}

function startWarpAnimation() {
  createWarpElements();
  resizeWarpCanvas();
  initWarpObjects();
  if (warpAnimId) cancelAnimationFrame(warpAnimId);
  warpAnimId = requestAnimationFrame(drawWarp);
}

function stopWarpAnimation() {
  if (warpAnimId) cancelAnimationFrame(warpAnimId);
  warpAnimId = null;
  if (warpCanvas && warpCanvas.parentNode) {
    warpCanvas.parentNode.removeChild(warpCanvas);
    warpCanvas = null;
    warpCtx = null;
  }
  window.removeEventListener('resize', resizeWarpCanvas);
}

function startCutscene() {
  cutsceneOverlay.style.opacity = '1';
  cutsceneOverlay.style.display = 'flex';
  cutsceneStep = 0;
  startWarpAnimation();
  if (typingTimeout) clearTimeout(typingTimeout);
  typeText(cutsceneDialogue, tutT(':D'), 28, () => {
    cutsceneChoices.innerHTML =
      `<p class="cutscene-btn" data-choice="1">${tutT('cutscene_greeting')}</p>` +
      `<br class="cutscene-btn" data-choice="1">${tutT('')}</br>` +
      `<button class="cutscene-btn" data-choice="1">${tutT('cutscene_btn_ready')}</button>` +
      `<button class="cutscene-btn" data-choice="2">${tutT('cutscene_btn_who')}</button>` +
      `<button class="cutscene-btn" data-choice="3">${tutT('cutscene_btn_happening')}</button>`;
    Array.from(cutsceneChoices.querySelectorAll('button')).forEach(btn => {
      btn.onclick = handleCutsceneChoice;
    });
  });
}

function dramaticCutsceneEnd() {
  warpSpeedMultiplier = 6;
  const avatar = document.querySelector('#cutsceneOverlay img');
  const starPoints = document.querySelectorAll('#cutsceneOverlay .star-point.main');
  const starCore = document.querySelector('#cutsceneOverlay .star-core');
  if (avatar) {
    avatar.style.transition = 'transform 1.2s cubic-bezier(.4,2,.6,1)';
    avatar.style.transform = 'scale(0.1)';
  }
  if (starPoints && starPoints.length) {
    starPoints.forEach(p => {
      p.style.transition = 'transform 1.2s cubic-bezier(.4,2,.6,1), opacity 1.2s';
      p.style.transform = 'scale(0.1)';
      p.style.opacity = '0';
    });
  }
  if (starCore) {
    starCore.style.transition = 'transform 1.2s cubic-bezier(.4,2,.6,1), opacity 1.2s';
    starCore.style.transform = 'scale(0.1)';
    starCore.style.opacity = '0';
  }
  setTimeout(() => {
    if (cutsceneDialogue) cutsceneDialogue.style.opacity = '0';
    if (cutsceneChoices) cutsceneChoices.style.opacity = '0';
    whiteFadeDirection = 1;
    whiteFadeCallback = () => {
      setTimeout(() => {
        cutsceneOverlay.style.display = 'none';
        whiteFadeDirection = 2;
        whiteFadeCallback = () => {
          warpSpeedMultiplier = 1;
          if (avatar) {
            avatar.style.transition = '';
            avatar.style.transform = '';
          }
          if (starPoints && starPoints.length) {
            starPoints.forEach(p => {
              p.style.transition = '';
              p.style.transform = '';
              p.style.opacity = '';
            });
          }
          if (starCore) {
            starCore.style.transition = '';
            starCore.style.transform = '';
            starCore.style.opacity = '';
          }
          if (cutsceneDialogue) cutsceneDialogue.style.opacity = '';
          if (cutsceneChoices) cutsceneChoices.style.opacity = '';
          const cutsceneContent = document.getElementById('cutsceneContent');
          if (cutsceneContent) cutsceneContent.style.display = 'none';
          stopWarpAnimation();
          if (typeof startTutorialAfterCutscene === 'function') startTutorialAfterCutscene();
        };
      }, 5000);
    };
  }, 900);
}

function handleCutsceneChoice(e) {
  const choice = e.target.getAttribute('data-choice');
  if (choice === '1') {
    cutsceneStep = 1;
    const response = tutT('cutscene_response1');
    updateCutsceneDialogue(response, () => {
      setTimeout(dramaticCutsceneEnd, 10000);
    });
  } 
  else if (choice === '2') {
    cutsceneStep = 2;
    const response = tutT('cutscene_response2');
    updateCutsceneDialogue(response, () => {
      showCutsceneOptions([
        { key: 'cutscene_btn_speak', next: '2a' },
        { key: 'cutscene_btn_why_name', next: '2b' },
        { key: 'cutscene_btn_nicknames', next: '2c' }
      ]);
    });
  }
  else if (choice === '3') {
    cutsceneStep = 3;
    const response = tutT('cutscene_response3');
    updateCutsceneDialogue(response, () => {
      setTimeout(dramaticCutsceneEnd, 10000);
    });
  }
  else if (choice === '2a') {
    const response = tutT('cutscene_speak');
    updateCutsceneDialogue(response, () => {
      setTimeout(dramaticCutsceneEnd, 10000);
    });
  }
  else if (choice === '2b') {
    const response = tutT('cutscene_why_name');
    updateCutsceneDialogue(response, () => {
      showCutsceneOptions([
        { key: 'cutscene_btn_letsgo', next: '2b1' },
        { key: 'cutscene_btn_origin', next: '2b2' }
      ]);
    });
  }
  else if (choice === '2c') {
    const response = tutT('cutscene_nicknames');
    updateCutsceneDialogue(response, () => {
      setTimeout(dramaticCutsceneEnd, 10000);
    });
  }
  else if (choice === '2b1') {
    const response = tutT('cutscene_final');
    updateCutsceneDialogue(response, () => {
      setTimeout(dramaticCutsceneEnd, 10000);
    });
  }
  else if (choice === '2b2') {
    const response = tutT('cutscene_origin');
    updateCutsceneDialogue(response, () => {
      setTimeout(dramaticCutsceneEnd, 10000);
    });
  }
}

function updateCutsceneDialogue(text, callback) {
  if (typingTimeout) clearTimeout(typingTimeout);
  cutsceneChoices.innerHTML = '';
  cutsceneDialogue.textContent = '';
  let dotCount = 0;
  const dotsSpan = document.createElement('span');
  dotsSpan.style.fontSize = '2.2rem';
  dotsSpan.style.letterSpacing = '0.3em';
  cutsceneDialogue.appendChild(dotsSpan);
  let dotsInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsSpan.textContent = '.'.repeat(dotCount);
  }, 400);
  setTimeout(() => {
    clearInterval(dotsInterval);
    cutsceneDialogue.innerHTML = `<button class="cutscene-btn" disabled style="pointer-events:none;opacity:1;">${text}</button>`;
    if (callback) callback();
  }, 2000);
}

function showCutsceneOptions(options) {
  cutsceneChoices.innerHTML = '';
  options.forEach((option, idx) => {
    const button = document.createElement('button');
    button.className = 'cutscene-btn';
    button.setAttribute('data-choice', option.next);
    button.textContent = tutT(option.key);
    button.onclick = handleCutsceneChoice;
    cutsceneChoices.appendChild(button);
    if (idx === 0 && option.key === 'cutscene_greeting') {
      cutsceneChoices.appendChild(document.createElement('br'));
    }
  });
}

function startCutscene() {
  cutsceneOverlay.style.opacity = '1';
  cutsceneOverlay.style.display = 'flex';
  cutsceneStep = 0;
  startWarpAnimation();
  if (typingTimeout) clearTimeout(typingTimeout);
  typeText(cutsceneDialogue, tutT(':D'), 28, () => {
    showCutsceneOptions([
      { key: 'cutscene_greeting', next: '0' },
      { key: 'cutscene_btn_ready', next: '1' },
      { key: 'cutscene_btn_who', next: '2' },
      { key: 'cutscene_btn_happening', next: '3' }
    ]);
  });
}

window.addEventListener('DOMContentLoaded', startCutscene);

const gravitySliderConfig = document.getElementById('gravityFactor');
const gravityValueConfig = document.getElementById('gravityValue');
if (gravitySliderConfig && gravityValueConfig) {
  function updateGravityValueConfig() {
    gravityValueConfig.textContent = (gravitySliderConfig.value * 100).toFixed(0) + '%';
  }
  gravitySliderConfig.addEventListener('input', updateGravityValueConfig);
  updateGravityValueConfig();
}

document.querySelectorAll('.setting-control input[type="range"]').forEach(function(slider) {
  slider.classList.add('slider');
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
  });
});

document.getElementById('btnWarnings').addEventListener('click', function() {
  document.getElementById('warningsSidebar').classList.add('active');
});

document.getElementById('closeWarningsBtn').addEventListener('click', function() {
  document.getElementById('warningsSidebar').classList.remove('active');
});

window.addEventListener('DOMContentLoaded', function() {
  if (typeof startGame === 'function') startGame();
  if (typeof startTutorial === 'function') startTutorial();
});

document.getElementById('btnOptions').addEventListener('click', () => {
  document.getElementById('configSidebar').classList.add('active');
});

document.getElementById('closeConfigBtn').addEventListener('click', () => {
  document.getElementById('configSidebar').classList.remove('active');
});

document.getElementById('exitBtn').addEventListener('click', () => {
  if (confirm('Deseja realmente sair do SIU 2D?')) {
    window.close();
  }
});

const btnInstruction = document.getElementById('btnInstruction');
if (btnInstruction) {
  btnInstruction.addEventListener('click', function() {
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
      startScreen.style.transition = 'opacity 0.7s';
      startScreen.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'tut.html';
      }, 700);
    } else {
      window.location.href = 'tut.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const btnTSingularity = document.getElementById('btnTSingularity');
  const tsingularitySidebar = document.getElementById('tsingularitySidebar');
  const closeTSingularityBtn = document.getElementById('closeTSingularityBtn');
  if (btnTSingularity && tsingularitySidebar) {
    btnTSingularity.addEventListener('click', function() {
      tsingularitySidebar.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeTSingularityBtn && tsingularitySidebar) {
    closeTSingularityBtn.addEventListener('click', function() {
      tsingularitySidebar.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tsingularitySidebar.classList.contains('active')) {
      tsingularitySidebar.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  const btnBackToStart = document.getElementById('btnBackToStart');
  if (btnBackToStart) {
    btnBackToStart.onclick = function() {
      if (typeof hideTutorialSingularity === 'function') hideTutorialSingularity();
      const cutsceneOverlay = document.getElementById('cutsceneOverlay');
      if (cutsceneOverlay) cutsceneOverlay.style.display = 'none';
      window.removeEventListener('keydown', window.handleFKey, true);
      window.removeEventListener('keydown', window.handleNKey, true);
      window.removeEventListener('keydown', window.handleTKey, true);
      window.tutorialStep = -1;
      window.tutorialAstroCreated = false;
      window.tutorialSecondAstroCreated = false;
      window.tutorialStarCreated = false;
      if (typeof stopWarpAnimation === 'function') stopWarpAnimation();
      window.location.href = '../html/SIU2Dgame.html';
    };
  }
});