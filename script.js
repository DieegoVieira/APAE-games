/* =============================================
   APAE Games — Application Logic
   ============================================= */

// --- Game Data ---
const GAMES = [
  {
    id: 1,
    name: 'Ligue as Sílabas',
    image: 'imagens/ligue-as-silabas.png',
    url: 'https://rafaeltomazgraciano.github.io/ligue-as-silabas/',
    emoji: '🔗'
  },
  {
    id: 2,
    name: 'O Monstrinho Faminto',
    image: 'imagens/monstrinho-faminto.png',
    url: 'https://gabrielwitor.github.io/Monstrinho-Faminto/',
    emoji: '👾'
  },
  {
    id: 3,
    name: 'Caça ao Tesouro',
    image: 'imagens/caca-ao-tesouro.png',
    url: 'https://hedropedro.github.io/CacaAoAbacada/',
    emoji: '🗺️'
  },
  {
    id: 4,
    name: 'Salão das Sílabas',
    image: 'imagens/salao-das-silabas.png',
    url: 'https://juuhgb.github.io/salao-das-silabas/',
    emoji: '💇'
  },
  {
    id: 5,
    name: 'Trem de Sílabas',
    image: 'imagens/trem-de-silabas.png',
    url: 'https://giovanariber.github.io/trem-de-silabas-html/',
    emoji: '🚂'
  },
  {
    id: 6,
    name: 'Robo Montador',
    image: 'imagens/robo-montador.png',
    url: 'https://pauloluzkk.github.io/Game-ABACADA/',
    emoji: '🤖'
  },
  {
    id: 7,
    name: 'Corrida das Sílabas',
    image: 'imagens/corrida-das-silabas.png',
    url: 'https://educalza.github.io/Corrida-das-Silabas/',
    emoji: '🏃'
  },
  {
    id: 8,
    name: 'Bingo de Sílabas',
    image: 'imagens/bingo-de-silabas.png',
    url: 'https://vieiranaju.github.io/bingo-de-silabas-HTML/',
    emoji: '🎯'
  },
  {
    id: 9,
    name: 'Piscina Maluca',
    image: 'imagens/piscina-maluca.png',
    url: 'https://istefanuto.github.io/jogoAbacada/',
    emoji: '🏊'
  },
  {
    id: 10,
    name: 'Escova Escova',
    image: 'imagens/escova-escova.png',
    url: 'https://vitorhhiguchi.github.io/escova-escova-uenp/',
    emoji: '🪥'
  },
  {
    id: 11,
    name: 'Cobrinha das Sílabas',
    image: 'imagens/cobrinha-das-silabas.png',
    url: 'https://dieegovieira.github.io/cobra-das-silabas/',
    emoji: '🐍'
  },
  {
    id: 12,
    name: 'Pesca Sílabas',
    image: 'imagens/pesca-silabas.png',
    url: 'https://m-valentim.github.io/pesca-silabas/',
    emoji: '🎣'
  },
  {
    id: 13,
    name: 'Enigma da Esfinge',
    image: 'imagens/enigma-da-esfinge.png',
    url: 'https://ilhayoshida.github.io/Enigma_da_Esfinge/',
    emoji: '🏛️'
  },
  {
    id: 14,
    name: 'Indicabla',
    image: 'imagens/indicabla.png',
    url: 'https://gustavkeller-23.github.io/DiscoGame/',
    emoji: '🪩'
  },
  {
    id: 15,
    name: 'Penalti Educativo',
    image: 'imagens/penalti-educativo.png',
    url: 'https://ozeiasmoreira.github.io/Penalti_educativo/',
    emoji: '⚽'
  }
];

// --- DOM Elements ---
const gamesGrid = document.getElementById('games-grid');
const searchInput = document.getElementById('search-input');
const gameCounter = document.getElementById('game-counter');
const gameOverlay = document.getElementById('game-overlay');
const gameIframe = document.getElementById('game-iframe');
const gameTopbarTitle = document.getElementById('game-topbar-title');
const gameLoading = document.getElementById('game-loading');
const backBtn = document.getElementById('back-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const noResults = document.getElementById('no-results');

// --- Render Particles ---
function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    'rgba(168, 85, 247, 0.35)',
    'rgba(236, 72, 153, 0.3)',
    'rgba(59, 130, 246, 0.3)',
    'rgba(6, 182, 212, 0.25)',
    'rgba(250, 204, 21, 0.2)',
    'rgba(52, 211, 153, 0.25)'
  ];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 12 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 20;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    container.appendChild(particle);
  }
}

// --- Render Game Cards ---
function renderCards(games) {
  gamesGrid.innerHTML = '';

  if (games.length === 0) {
    noResults.classList.add('visible');
    gameCounter.innerHTML = `<span class="count">0</span> jogos encontrados`;
    return;
  }

  noResults.classList.remove('visible');
  gameCounter.innerHTML = `<span class="count">${games.length}</span> jogo${games.length !== 1 ? 's' : ''} disponíve${games.length !== 1 ? 'is' : 'l'}`;

  games.forEach((game, index) => {
    const card = document.createElement('article');
    card.classList.add('game-card');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Jogar ${game.name}`);
    card.style.animationDelay = `${index * 0.07}s`;

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img
          class="card-image"
          src="${game.image}"
          alt="${game.name}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="card-fallback" style="display: none;">
          <span class="card-fallback-icon">${game.emoji}</span>
          <span class="card-fallback-text">${game.name}</span>
        </div>
        <div class="card-play-overlay">
          <div class="play-btn-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="card-info">
        <span class="card-number">${game.id}</span>
        <h2 class="card-title">${game.name}</h2>
      </div>
    `;

    // Click handler
    card.addEventListener('click', () => openGame(game));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGame(game);
      }
    });

    gamesGrid.appendChild(card);
  });
}

// --- Open Game ---
function openGame(game) {
  // Show overlay
  gameOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Set title
  gameTopbarTitle.textContent = game.name;

  // Show loading
  gameLoading.classList.remove('hidden');

  // Set iframe source
  gameIframe.src = game.url;

  // Hide loading when iframe loads
  gameIframe.onload = () => {
    setTimeout(() => {
      gameLoading.classList.add('hidden');
    }, 400);
  };

  // Fallback: hide loading after timeout
  setTimeout(() => {
    gameLoading.classList.add('hidden');
  }, 6000);
}

// --- Close Game ---
function closeGame() {
  gameOverlay.classList.remove('active');
  document.body.style.overflow = '';

  // Clear iframe after animation
  setTimeout(() => {
    gameIframe.src = 'about:blank';
    gameTopbarTitle.textContent = '';
    gameLoading.classList.remove('hidden');
  }, 400);

  // Exit fullscreen if active
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

// --- Toggle Fullscreen ---
function toggleFullscreen() {
  const container = document.querySelector('.game-iframe-container');
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// --- Search Filter ---
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = GAMES.filter(game =>
    game.name.toLowerCase().includes(query)
  );
  renderCards(filtered);
}

// --- Event Listeners ---
backBtn.addEventListener('click', closeGame);
fullscreenBtn.addEventListener('click', toggleFullscreen);
searchInput.addEventListener('input', handleSearch);

// ESC to close game
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && gameOverlay.classList.contains('active')) {
    closeGame();
  }
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderCards(GAMES);
});
