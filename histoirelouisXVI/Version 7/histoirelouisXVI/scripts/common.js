/*
 * ============================================================
 * common.js - Fonctions partagees entre toutes les pages
 * Etoiles, particules d'arriere-plan et bouton son
 * ============================================================
 */

// === CREATION DES ETOILES ===
// Genere 80 etoiles scintillantes positionnees aleatoirement
function createStars() {
    var starsContainer = document.getElementById('stars');
    for (var i = 0; i < 80; i++) {
        // Creer un element div pour chaque etoile
        var star = document.createElement('div');
        star.className = 'star';

        // Taille aleatoire entre 1 et 4 pixels
        var size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Position aleatoire sur l'ecran
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Delai d'animation aleatoire pour desynchroniser les scintillements
        star.style.animationDelay = Math.random() * 3 + 's';

        // Ajouter l'etoile au conteneur
        starsContainer.appendChild(star);
    }
}

// === CREATION DES PARTICULES ===
// Genere des particules tombantes toutes les 600ms pour un effet de neige
function createParticles() {
    setInterval(function () {
        // Creer une particule
        var particle = document.createElement('div');
        particle.className = 'particle';

        // Position horizontale aleatoire
        particle.style.left = Math.random() * 100 + '%';

        // Taille aleatoire entre 2 et 6 pixels
        var size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Duree de chute aleatoire entre 5 et 9 secondes
        particle.style.animationDuration = Math.random() * 4 + 5 + 's';

        // Ajouter la particule au corps de la page
        document.body.appendChild(particle);

        // Supprimer la particule apres 9 secondes pour eviter l'accumulation
        setTimeout(function () { particle.remove(); }, 9000);
    }, 600);
}

// === TOGGLE DU BOUTON SON ===
// Bascule l'icone entre volume actif et muet au clic
document.getElementById('soundToggle').addEventListener('click', function () {
    var icon = this.querySelector('i');

    // Alterner entre les classes Font Awesome volume-up et volume-mute
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-volume-mute');
});

// === INITIALISATION AU CHARGEMENT ===
// Lance la creation des etoiles et particules une fois la page chargee
window.addEventListener('load', function () {
    createStars();
    createParticles();
});
