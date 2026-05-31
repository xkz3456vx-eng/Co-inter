/*
 * ============================================================
 * common.js — Fonctions partagées entre toutes les pages
 * Particules de poussière d'atmosphère
 * ============================================================
 */

// === PARTICULES DE POUSSIÈRE ===
// Génère 12 points dorés flottants pour créer une ambiance de vieux parchemin
function createDustParticles() {
    var count = 12;
    for (var i = 0; i < count; i++) {
        var particle = document.createElement('div');
        particle.className = 'dust-particle';

        // Position horizontale aléatoire
        particle.style.left = Math.random() * 100 + 'vw';

        // Durée de flottement aléatoire entre 12 et 30 secondes
        particle.style.animationDuration = (12 + Math.random() * 18) + 's';

        // Délai aléatoire pour désynchroniser les particules
        particle.style.animationDelay = (Math.random() * 15) + 's';

        // Taille aléatoire entre 2 et 5 pixels
        var size = (2 + Math.random() * 3) + 'px';
        particle.style.width = size;
        particle.style.height = size;

        // Opacité aléatoire pour varier l'intensité
        particle.style.opacity = 0.2 + Math.random() * 0.4;

        document.body.appendChild(particle);
    }
}

// === INITIALISATION ===
// Crée les particules dès le chargement du script (le DOM est déjà disponible)
createDustParticles();
