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

function showTutorialSingularity(msg, actionHtml = '', highlight = null) {
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

function nextTutorialStep() {
  switch(tutorialStep) {
    case 0:
      showTutorialSingularity('Bem-vindo ao Universo!');
      setTimeout(() => {
        tutorialStep = 1;
        showTutorialSingularity(
          ' Eu sou o T Singularity, seu Treinador, vamos começar?.', 
          '<button id="btnTutContinue1" class="cutscene-btn">Ok!</button>'
        );
        
        document.getElementById('btnTutContinue1').onclick = () => {
          showTutorialSingularity('Clique em qualquer lugar do universo para criar seu primeiro astro.',)
          tutorialSingularityAction.innerHTML = '<span style="color:#aaa;font-size:0.98rem;">Aguardando você criar um astro...</span>';
          
          
          const gameCanvas = document.getElementById('gameCanvas');
          function handleFirstAstroClick(e) {
            if (e.button === 0) {
              gameCanvas.removeEventListener('mousedown', handleFirstAstroClick, true);
              tutorialAstroCreated = true;
              setTimeout(nextTutorialStep, 300);
            }
          }
          
          if (gameCanvas) {
            gameCanvas.addEventListener('mousedown', handleFirstAstroClick, true);
          }
        };
      }, 2200);
      break;
      
    case 1:
      if (tutorialAstroCreated) {
        showTutorialSingularity(
          'Muito bem! Agora experimente dar zoom usando as teclas Q e E, use para se aproximar do astro criado.', 
          '<button id="btnTutContinue2" class="cutscene-btn">Próximo</button>'
        );
        
        document.getElementById('btnTutContinue2').onclick = () => {
          tutorialStep = 2;
          showTutorialSingularity(
            'Você também pode mover a câmera com as teclas W, A, S e D, use eles para ajustar a posição da câmera.', 
            '<button id="btnTutContinue3" class="cutscene-btn">Próximo</button>'
          );
          
          document.getElementById('btnTutContinue3').onclick = () => {
            tutorialStep = 3;
            showTutorialSingularity(
              'Perfeito! você já ajustou a câmera perto do astro né? se sim avance para o próximo passo.', 
              '<button id="btnTutContinue4" class="cutscene-btn">Ok!</button>'
            );
            
            document.getElementById('btnTutContinue4').onclick = () => {
              showTutorialSingularity('Agora, crie outro astro perto do primeiro para ver a interação gravitacional e colisão!'),
              tutorialSingularityAction.innerHTML = '<span style="color:#aaa;font-size:0.98rem;">Aguardando você criar outro astro próximo...</span>';
              
              
              const gameCanvas = document.getElementById('gameCanvas');
              function handleSecondAstroClick(e) {
                if (e.button === 0) {
                  gameCanvas.removeEventListener('mousedown', handleSecondAstroClick, true);
                  tutorialSecondAstroCreated = true;
                  setTimeout(nextTutorialStep, 300);
                }
              }
              
              if (gameCanvas) {
                gameCanvas.addEventListener('mousedown', handleSecondAstroClick, true);
              }
            };
          };
        };
      }
      break;
      
    case 3:
      if (tutorialSecondAstroCreated) {
        tutorialStep = 4;
        showTutorialSingularity(
          'Pronto, espere eles se colidirem para ver o que acontece, se eles se colidirem, você pode avançar para o próximo passo.', 
          '<button id="btnTutContinue5" class="cutscene-btn">Ok!</button>'
        );
        
        document.getElementById('btnTutContinue5').onclick = () => {
          showTutorialSingularity('Agora, crie mais um astro, mas pressione e arraste na tela para definir uma órbita ao redor do outro astro.');
          tutorialSingularityAction.innerHTML = '<span style="color:#aaa;font-size:0.98rem;">Aguardando você criar um astro em órbita (pressione e arraste)...</span>';
          
          
          const gameCanvas = document.getElementById('gameCanvas');
          let dragStarted = false;
          
          function handleOrbitAstroDown(e) {
            if (e.button === 0) dragStarted = true;
          }
          
          function handleOrbitAstroUp(e) {
            if (e.button === 0 && dragStarted) {
              dragStarted = false;
              gameCanvas.removeEventListener('mousedown', handleOrbitAstroDown, true);
              gameCanvas.removeEventListener('mouseup', handleOrbitAstroUp, true);
              setTimeout(() => {
                tutorialStep = 5;
                showTutorialSingularity(
                  'Perfeito! Agora clique com o botão direito em um astro para abrir o painel de edição.', 
                  '<span style="color:#aaa;font-size:0.98rem;">Aguardando você abrir o painel de edição...</span>'
                );
                
                
                const editPanel = document.getElementById('editPanel');
                if (editPanel) {
                  const observer = new MutationObserver(() => {
                    if (editPanel.style.display !== 'none') {
                      observer.disconnect();
                      setTimeout(() => {
                        tutorialStep = 6;
                        showTutorialSingularity(
                          'Ótimo! Agora altere o nome do astro para o que quiser.', 
                          '<span style="color:#aaa;font-size:0.98rem;">Aguardando você mudar o nome...</span>'
                        );
                        
                        
                        const editName = document.getElementById('editName');
                        if (editName) {
                          editName.addEventListener('input', () => {
                            if (editName.value.trim().length > 0) {
                              setTimeout(() => {
                                tutorialStep = 7;
                                showTutorialSingularity(
                                  'Muito bem! Você pode alterar atributos como Água, Gás, Massa e outros.', 
                                  '<button id="btnTutContinueAtributos" class="cutscene-btn">Ok</button>'
                                );
                                
                                document.getElementById('btnTutContinueAtributos').onclick = () => {
                                  tutorialStep = 8;
                                  showTutorialSingularity(
                                    'Você também pode alterar a descrição do astro para personalizá-lo.', 
                                    '<button id="btnTutContinueDescricao" class="cutscene-btn">Ok</button>'
                                  );
                                  
                                  document.getElementById('btnTutContinueDescricao').onclick = () => {
                                    tutorialStep = 9;
                                    showTutorialSingularity(
                                      'Quando terminar, feche o painel de edição, se quiser pode escolher a opção de salvar a alteração ou deletar ele, más, por enquanto feche o painel para continuar o tutorial.', 
                                      '<span style="color:#aaa;font-size:0.98rem;">Aguardando você fechar o painel...</span>'
                                    );
                                    
                                    
                                    const closeBtn = document.querySelector('#editPanel .close-menu');
                                    function closeHandler() {
                                      closeBtn.removeEventListener('click', closeHandler);
                                      setTimeout(() => {
                                        tutorialStep = 10;
                                        showTutorialSingularity(
                                          'Excelente! Agora abra o Menu do Universo.', 
                                          '<span style="color:#aaa;font-size:0.98rem;">Aguardando você abrir o menu...</span>'
                                        );
                                        
                                        
                                        const inGameMenu = document.getElementById('inGameMenu');
                                        if (inGameMenu) {
                                          const menuObserver = new MutationObserver(() => {
                                            if (inGameMenu.style.display !== 'none') {
                                              menuObserver.disconnect();
                                              setTimeout(() => {
                                                tutorialStep = 11;
                                                showTutorialSingularity(
                                                  'Veja a diversidade de astros disponíveis! Role para baixo para ver mais.', 
                                                  '<button id="btnTutContinueScrollAstros" class="cutscene-btn">Ok</button>'
                                                );
                                                
                                                document.getElementById('btnTutContinueScrollAstros').onclick = () => {
                                                  tutorialStep = 12;
                                                  showTutorialSingularity(
                                                    'Agora, escolha a estrela comum no menu e clique no universo para criar sua estrela.', 
                                                    '<span style="color:#aaa;font-size:0.98rem;">Aguardando você criar uma estrela...</span>'
                                                  );
                                                  
                                                  
                                                  const gameCanvas = document.getElementById('gameCanvas');
                                                  function handleCreateStar(e) {
                                                    if (e.button === 0) {
                                                      gameCanvas.removeEventListener('mousedown', handleCreateStar, true);
                                                      tutorialStarCreated = true;
                                                      setTimeout(nextTutorialStep, 300);
                                                    }
                                                  }
                                                  
                                                  gameCanvas.addEventListener('mousedown', handleCreateStar, true);
                                                };
                                              }, 600);
                                            }
                                          });
                                          
                                          menuObserver.observe(inGameMenu, { 
                                            attributes: true, 
                                            attributeFilter: ['style'] 
                                          });
                                        }
                                      }, 600);
                                    }
                                    
                                    if (closeBtn) {
                                      closeBtn.addEventListener('click', closeHandler);
                                    }
                                  };
                                };
                              }, 300);
                            }
                          });
                        }
                      }, 600);
                    }
                  });
                  
                  observer.observe(editPanel, { 
                    attributes: true, 
                    attributeFilter: ['style'] 
                  });
                }
              }, 600);
            }
          }
          
          gameCanvas.addEventListener('mousedown', handleOrbitAstroDown, true);
          gameCanvas.addEventListener('mouseup', handleOrbitAstroUp, true);
        };
      }
      break;
    case 12:
      
      showTutorialSingularity(
        'Abra o Menu do Universo para continuar.',
        '<span style="color:#aaa;font-size:0.98rem;">Aguardando você abrir o menu...</span>'
      );
      const inGameMenu = document.getElementById('inGameMenu');
      function advanceIfMenuOpenRocky() {
        if (inGameMenu && inGameMenu.style.display !== 'none') {
          setTimeout(() => {
            
            showTutorialSingularity(
              'Escolha o planeta Rochoso no menu e clique próximo à estrela para colocá-lo em órbita.',
              '<span style="color:#aaa;font-size:0.98rem;">Aguardando você criar o planeta Rochoso...</span>'
            );
            const gameCanvas = document.getElementById('gameCanvas');
            function handleCreateRocky(e) {
              if (e.button === 0) {
                gameCanvas.removeEventListener('mousedown', handleCreateRocky, true);
                
                showTutorialSingularity(
                  'Observe as alterações climáticas no planeta Rochoso após colocá-lo em órbita.',
                  '<button id="btnTutContinueClima" class="cutscene-btn">Próximo</button>'
                );
                document.getElementById('btnTutContinueClima').onclick = () => {
                  tutorialStarCreated = true;
                  setTimeout(nextTutorialStep, 300);
                  tutorialStep = 13;
                };
              }
            }
            if (gameCanvas) {
              gameCanvas.addEventListener('mousedown', handleCreateRocky, true);
            }
          }, 600);
          return true;
        }
        return false;
      }
      
      if (!advanceIfMenuOpenRocky() && inGameMenu) {
        const menuObserverRocky = new MutationObserver(() => {
          if (advanceIfMenuOpenRocky()) {
            menuObserverRocky.disconnect();
          }
        });
        menuObserverRocky.observe(inGameMenu, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
      break;
      
    case 13:
      if (tutorialStarCreated) {
        tutorialStep = 14;
        showTutorialSingularity(
          'Pressione a tecla F , observe que ela limpa todo o universo.',
          '<span style="color:#aaa;font-size:0.98rem;">Aguardando você pressionar F...</span>'
        );
        function handleFKey(e) {
          if (e.key === 'f' || e.key === 'F') {
            window.removeEventListener('keydown', handleFKey, true);
            setTimeout(() => {
              tutorialStep = 15;
              showTutorialSingularity(
                'Agora, abra novamente o menu do universo.',
                '<span style="color:#aaa;font-size:0.98rem;">Aguardando você abrir o menu...</span>'
              );
              
              const inGameMenu = document.getElementById('inGameMenu');
              function advanceIfMenuOpen() {
                if (inGameMenu && inGameMenu.style.display !== 'none') {
                  setTimeout(() => {
                    tutorialStep = 16;
                    showTutorialSingularity(
                      'Selecione a estrela T Tauri Star no menu.',
                      '<span style="color:#aaa;font-size:0.98rem;">Aguardando você criar a T Tauri Star...</span>'
                    );
                    
                    const gameCanvas = document.getElementById('gameCanvas');
                    function handleCreateTauri(e) {
                      if (e.button === 0) {
                        gameCanvas.removeEventListener('mousedown', handleCreateTauri, true);
                        setTimeout(() => {
                          tutorialStep = 18;
                          showTutorialSingularity(
                            'Abra novamente o menu do universo.',
                            '<span style="color:#aaa;font-size:0.98rem;">Aguardando você abrir o menu...</span>'
                          );
                          
                          const inGameMenu = document.getElementById('inGameMenu');
                          function advanceIfMenuOpen2() {
                            if (inGameMenu && inGameMenu.style.display !== 'none') {
                              setTimeout(() => {
                                tutorialStep = 19;
                                showTutorialSingularity(
                                  'Role o menu até encontrar a sessão Controle de Tempo. Veja os fluxos: Parar(0x), Muito Lento(0.01x), Lento(0.1x), Normal(1x), Rápido(10x), Super Rápido(100x), Hiper Rápido (1000x), Ultra Rápido (10000x).',
                                  'Aguardando você escolher 10x de tempo...'
                                );
                                
                                const fastBtn = document.getElementById('timeDistantFuture');
                                if (fastBtn) {
                                  fastBtn.addEventListener('click', function selectFast() {
                                    fastBtn.removeEventListener('click', selectFast);
                                    setTimeout(() => {
                                      tutorialStep = 20;
                                      showTutorialSingularity(
                                        'volte ao topo do menu e clique no botão X para fechar o menu.',
                                        '<span style="color:#aaa;font-size:0.98rem;">Aguardando você fechar o menu...</span>'
                                      );
                                      const closeBtn = inGameMenu.querySelector('.close-menu');
                                      if (closeBtn) {
                                        closeBtn.addEventListener('click', function closeMenu() {
                                          closeBtn.removeEventListener('click', closeMenu);
                                          setTimeout(() => {
                                            tutorialStep = 21;
                                            showTutorialSingularity(
                                              'Veja as mudanças na T Tauri Star! Ela, como qualquer estrela comum, tem estágios evolutivos.',
                                              '<button id="btnTutContinueEvolucao" class="cutscene-btn">Próximo</button>'
                                            );
                                            document.getElementById('btnTutContinueEvolucao').onclick = () => {
                                              tutorialStep = 22;
                                              showTutorialSingularity(
                                                'Pressione N para alternar nomes dos astros.',
                                                '<span style="color:#aaa;font-size:0.98rem;">Aguardando você pressionar N...</span>'
                                              );
                                              function handleNKey(e) {
                                                if (e.key === 'n' || e.key === 'N') {
                                                  window.removeEventListener('keydown', handleNKey, true);
                                                  setTimeout(() => {
                                                    tutorialStep = 22.5;
                                                    showTutorialSingularity(
                                                      'Agora pressione T para alternar zonas de temperatura das estrelas.',
                                                      '<span style="color:#aaa;font-size:0.98rem;">Aguardando você pressionar T...</span>'
                                                    );
                                                    function handleTKey(e) {
                                                      if (e.key === 't' || e.key === 'T') {
                                                        window.removeEventListener('keydown', handleTKey, true);
                                                        setTimeout(() => {
                                                          tutorialStep = 23;
                                                          showAchievementNotification(1, 'O Básico');
                                                          unlockAchievement(1);
                                                          showTutorialSingularity(
                                                            'Tutorial básico concluído! Boa sorte!',
                                                            '<button id="btnTutFinalOk" class="cutscene-btn">OK</button>'
                                                          );
                                                          document.getElementById('btnTutFinalOk').onclick = () => {
                                                            showTutorialSingularity(
                                                              'Encaminhando...',
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
                                                            document.body.appendChild(fadeDiv);
                                                            setTimeout(() => {
                                                              fadeDiv.style.opacity = '1';
                                                              setTimeout(() => {
                                                                window.location.href = '../html/SIU2Dgame.html';
                                                              }, 5000);
                                                            }, 400);
                                                          };
                                                        }, 1200);
                                                      }
                                                    }
                                                    window.addEventListener('keydown', handleTKey, true);
                                                  }, 1200);
                                                }
                                              }
                                              window.addEventListener('keydown', handleNKey, true);
                                            };
                                          }, 600);
                                        });
                                      }
                                    }, 600);
                                  });
                                }
                              }, 600);
                              return true;
                            }
                            return false;
                          }
                          
                          if (!advanceIfMenuOpen2() && inGameMenu) {
                            const menuObserver2 = new MutationObserver(() => {
                              if (advanceIfMenuOpen2()) {
                                menuObserver2.disconnect();
                              }
                            });
                            menuObserver2.observe(inGameMenu, {
                              attributes: true,
                              attributeFilter: ['style']
                            });
                          }
                        }, 600);
                      }
                    }
                    if (gameCanvas) {
                      gameCanvas.addEventListener('mousedown', handleCreateTauri, true);
                    }
                  }, 600);
                }
              }
              
              if (!advanceIfMenuOpen() && inGameMenu) {
                const menuObserver = new MutationObserver(() => {
                  if (advanceIfMenuOpen()) {
                    menuObserver.disconnect();
                  }
                });
                menuObserver.observe(inGameMenu, {
                  attributes: true,
                  attributeFilter: ['style']
                });
              }
            }, 600);
          }
        }
        window.addEventListener('keydown', handleFKey, true);
      }
      break;
  }
}


window.tutorialNotifyAstroCreated = function(type) {
  if (tutorialStep === 1 && !tutorialAstroCreated) {
    tutorialAstroCreated = true;
    setTimeout(nextTutorialStep, 300);
  } 
  else if (tutorialStep === 3 && !tutorialSecondAstroCreated) {
    tutorialSecondAstroCreated = true;
    setTimeout(nextTutorialStep, 300);
  }
  else if (tutorialStep === 12 && type === 'rocky') {
    tutorialStarCreated = true;
    setTimeout(nextTutorialStep, 300);
  }
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
  typeText(cutsceneDialogue, 'Saudações, viajante do tempo! Você está pronto para explorar o universo comigo?', 28, () => {
    cutsceneChoices.innerHTML = `
      <button class="cutscene-btn" data-choice="1">Estou pronto, T Singularity!</button>
      <button class="cutscene-btn" data-choice="2">Quem é você?</button>
      <button class="cutscene-btn" data-choice="3">O que está acontecendo?</button>
    `;
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
  cutsceneStep = 1;
  cutsceneChoices.innerHTML = '';
  let response = '';
  if (choice === '1') {
    response = 'Excelente! Prepare-se para viajar na velocidade da luz pelo universo.';
  } else if (choice === '2') {
    response = 'Sou T Singularity, sua inteligência guia nesta jornada cósmica.';
  } else {
    response = 'Estamos prestes a atravessar o tempo e o espaço juntos!';
  }
  if (typingTimeout) clearTimeout(typingTimeout);
  typeText(cutsceneDialogue, response, 28, () => {
    setTimeout(dramaticCutsceneEnd, 1200);
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