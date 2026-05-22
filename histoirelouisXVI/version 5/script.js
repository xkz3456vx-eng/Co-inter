// ==================== ETAT DU JEU ====================
const state = {
  discret: 0,
  popular: 0,
  human: 0,
  courage: 0,
  path: [],
  current: 'start'
};

const MAX = 100;
const statCap = v => Math.max(-50, Math.min(MAX, v));

// ==================== NAVIGATION ====================
function startGame() {
  showChapter('ch-bloc1');
  state.path = ['Prologue'];
  updateBreadcrumb();
}

function goTo(chapterId, effects, label) {
  applyEffects(effects, label);
  showChapter(chapterId);
  if (label) state.path.push(label);
  updateBreadcrumb();

  // Remplir les stats finales si c'est une fin.
  const finalDiv = document.getElementById('final-stats-' + chapterId.replace('ch-bloc', ''));
  if (finalDiv && finalDiv.children.length === 0) populateFinalStats(finalDiv);
}

function showChapter(id) {
  document.querySelectorAll('.chapter').forEach(chapter => chapter.classList.remove('active'));
  const target = document.getElementById(id);

  if (target) {
    target.classList.add('active');
    state.current = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==================== EFFETS ====================
function applyEffects(effects) {
  if (!effects) return;
  const changes = [];

  if (effects.discret !== undefined) {
    state.discret = statCap(state.discret + effects.discret);
    changes.push(fmt('Discrétion', effects.discret));
  }

  if (effects.popular !== undefined) {
    state.popular = statCap(state.popular + effects.popular);
    changes.push(fmt('Popularité', effects.popular));
  }

  if (effects.human !== undefined) {
    state.human = statCap(state.human + effects.human);
    changes.push(fmt('Humanité', effects.human));
  }

  if (effects.courage !== undefined) {
    state.courage = statCap(state.courage + effects.courage);
    changes.push(fmt('Courage', effects.courage));
  }

  updateBars();
  if (changes.length) showNotif(changes.join('  '));
}

function fmt(name, val) {
  return (val > 0 ? '▲ ' : '▼ ') + name + ' ' + (val > 0 ? '+' : '') + val;
}

// ==================== BARRES ====================
function updateBars() {
  const update = (key, id) => {
    const pct = Math.max(0, Math.min(100, ((state[key] + 50) / 150) * 100));
    document.getElementById('fill-' + id).style.width = pct + '%';
    document.getElementById('num-' + id).textContent = state[key];
  };

  update('discret', 'discret');
  update('popular', 'popular');
  update('human', 'human');
  update('courage', 'courage');
}

// ==================== NOTIFICATION ====================
let notifTimer = null;

function showNotif(text) {
  const el = document.getElementById('statNotif');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ==================== BREADCRUMB ====================
function updateBreadcrumb() {
  const el = document.getElementById('breadcrumb-path');
  if (state.path.length === 0) {
    el.textContent = '—';
    return;
  }

  el.innerHTML = state.path.map((step, index) =>
    index === state.path.length - 1
      ? `<span>${step}</span>`
      : `${step} <span class="sep">›</span> `
  ).join('');
}

// ==================== STATS FINALES ====================
function populateFinalStats(container) {
  const items = [
    { label: 'Discrétion', val: state.discret },
    { label: 'Popularité', val: state.popular },
    { label: 'Humanité', val: state.human },
    { label: 'Courage', val: state.courage }
  ];

  container.innerHTML = items.map(item => `
    <div class="final-stat-card">
      <div class="final-stat-label">${item.label}</div>
      <div class="final-stat-value">${item.val > 0 ? '+' : ''}${item.val}</div>
    </div>
  `).join('');
}

// ==================== RESTART ====================
function restartGame() {
  state.discret = state.popular = state.human = state.courage = 0;
  state.path = [];

  // Reinitialiser les stats finales.
  document.querySelectorAll('[id^="final-stats-"]').forEach(el => {
    el.innerHTML = '';
  });

  updateBars();
  updateBreadcrumb();
  showChapter('ch-start');
}

// Init
updateBars();
