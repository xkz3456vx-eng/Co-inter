/*
 * ============================================================
 * game.js — Logique du jeu : navigation, statistiques, notifications
 * La Fuite de Varennes — Dont vous êtes le héros
 * ============================================================
 */

// === ÉTAT DU JEU ===
// Quatre compteurs de statistiques et historique du parcours
var state = {
    discret: 0,
    popular: 0,
    human:   0,
    courage: 0,
    path:    [],
    current: 'ch-bloc1'
};

// Valeur maximale des statistiques
var MAX = 100;

// Borne les valeurs entre -50 et 100
function statCap(v) {
    return Math.max(-50, Math.min(MAX, v));
}

// === NAVIGATION ===

// Navigue vers un chapitre en appliquant les effets du choix
function goTo(chapterId, effects, label) {
    applyEffects(effects, label);
    showChapter(chapterId);

    // Ajouter l'étape au fil d'ariane si elle est nommée
    if (label) state.path.push(label);
    updateBreadcrumb();

    // Peupler les statistiques finales si ce chapitre en contient
    var finalId = 'final-stats-' + chapterId.replace('ch-bloc', '');
    var finalDiv = document.getElementById(finalId);
    if (finalDiv && finalDiv.children.length === 0) {
        populateFinalStats(finalDiv);
    }
}

// Affiche le chapitre cible avec animation de transition
function showChapter(id) {
    var current = document.querySelector('.chapter.active');
    var target = document.getElementById(id);
    if (!target) return;

    if (current && current.id !== id) {
        // Déclencher l'animation de sortie sur le chapitre actif
        current.classList.add('exiting');
        current.classList.remove('active');

        // Supprimer la classe exiting après la fin de l'animation
        current.addEventListener('animationend', function handler() {
            current.classList.remove('exiting');
            current.style.display = 'none';
            current.removeEventListener('animationend', handler);
        }, { once: true });

        // Afficher le nouveau chapitre après le délai de sortie
        setTimeout(function () {
            target.style.display = '';
            target.classList.add('active');
            state.current = id;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 350);
    } else {
        // Premier affichage sans animation de sortie
        if (current) {
            current.classList.remove('active');
        }
        target.style.display = '';
        target.classList.add('active');
        state.current = id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// === EFFETS DES CHOIX ===

// Applique les variations de statistiques issues du choix effectué
function applyEffects(effects) {
    if (!effects) return;
    var changes = [];

    // Mettre à jour chaque statistique si elle est mentionnée dans les effets
    if (effects.discret !== undefined) {
        state.discret = statCap(state.discret + effects.discret);
        changes.push(fmt('Discrétion', effects.discret));
        animateStatNum('num-discret', effects.discret);
        pulseBar('fill-discret');
    }
    if (effects.popular !== undefined) {
        state.popular = statCap(state.popular + effects.popular);
        changes.push(fmt('Popularité', effects.popular));
        animateStatNum('num-popular', effects.popular);
        pulseBar('fill-popular');
    }
    if (effects.human !== undefined) {
        state.human = statCap(state.human + effects.human);
        changes.push(fmt('Humanité', effects.human));
        animateStatNum('num-human', effects.human);
        pulseBar('fill-human');
    }
    if (effects.courage !== undefined) {
        state.courage = statCap(state.courage + effects.courage);
        changes.push(fmt('Courage', effects.courage));
        animateStatNum('num-courage', effects.courage);
        pulseBar('fill-courage');
    }

    // Mettre à jour toutes les barres puis afficher la notification
    updateBars();
    if (changes.length) showNotif(changes.join('  '));
}

// Formate une variation de statistique avec flèche et signe
function fmt(name, val) {
    return (val > 0 ? '▲ ' : '▼ ') + name + ' ' + (val > 0 ? '+' : '') + val;
}

// Animation de rebond sur le chiffre d'une statistique lors d'un changement
function animateStatNum(id, delta) {
    var el = document.getElementById(id);
    if (!el) return;
    var cls = delta > 0 ? 'bump-up' : 'bump-down';
    el.classList.add(cls);
    setTimeout(function () { el.classList.remove(cls); }, 400);
}

// Déclenche l'animation de pulse sur une barre de statistique
function pulseBar(id) {
    var el = document.getElementById(id);
    if (!el) return;
    // Forcer le recalcul du style pour relancer l'animation
    el.classList.remove('pulse');
    void el.offsetWidth;
    el.classList.add('pulse');
    setTimeout(function () { el.classList.remove('pulse'); }, 700);
}

// === BARRES DE PROGRESSION ===

// Met à jour la largeur des quatre barres en fonction de l'état actuel
function updateBars() {
    // Conversion : stat peut aller de -50 à 100 → affichage 0% à 100%
    function update(key, id) {
        var pct = Math.max(0, Math.min(100, ((state[key] + 50) / 150) * 100));
        document.getElementById('fill-' + id).style.width = pct + '%';
        document.getElementById('num-' + id).textContent = state[key];
    }
    update('discret', 'discret');
    update('popular', 'popular');
    update('human',   'human');
    update('courage', 'courage');
}

// === NOTIFICATION ===

// Temporisateur pour effacer automatiquement la notification
var notifTimer = null;

// Affiche un message de notification temporaire puis le fait disparaître
function showNotif(text) {
    var el = document.getElementById('statNotif');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(notifTimer);
    notifTimer = setTimeout(function () { el.classList.remove('show'); }, 2800);
}

// === FIL D'ARIANE ===

// Met à jour l'affichage du parcours du joueur
function updateBreadcrumb() {
    var el = document.getElementById('breadcrumb-path');
    if (state.path.length === 0) {
        el.textContent = '—';
        return;
    }
    el.innerHTML = state.path.map(function (step, index) {
        var isLast = index === state.path.length - 1;
        return isLast
            ? '<span class="crumb-new">' + step + '</span>'
            : step + ' <span class="sep">›</span> ';
    }).join('');
}

// === STATISTIQUES FINALES ===

// Génère les cartes de bilan dans le conteneur de fin de chapitre
function populateFinalStats(container) {
    var items = [
        { label: 'Discrétion', val: state.discret },
        { label: 'Popularité', val: state.popular },
        { label: 'Humanité',   val: state.human },
        { label: 'Courage',    val: state.courage }
    ];
    container.innerHTML = items.map(function (item) {
        return '<div class="final-stat-card">'
            + '<div class="final-stat-label">' + item.label + '</div>'
            + '<div class="final-stat-value">' + (item.val > 0 ? '+' : '') + item.val + '</div>'
            + '</div>';
    }).join('');
}

// === RECOMMENCER ===

// Réinitialise toutes les statistiques et revient au premier chapitre
function restartGame() {
    state.discret = state.popular = state.human = state.courage = 0;
    state.path = [];

    // Vider les cartes de statistiques finales de tous les chapitres
    var finalDivs = document.querySelectorAll('[id^="final-stats-"]');
    for (var i = 0; i < finalDivs.length; i++) {
        finalDivs[i].innerHTML = '';
    }

    updateBars();
    updateBreadcrumb();
    showChapter('ch-bloc1');
}

// === INITIALISATION ===
// Mettre à jour les barres au chargement (stats à 0 → barres à 33%)
updateBars();

// Démarrer automatiquement au premier chapitre après le chargement de la page
window.addEventListener('load', function () {
    showChapter('ch-bloc1');
    state.path = ['Prologue'];
    updateBreadcrumb();
});
