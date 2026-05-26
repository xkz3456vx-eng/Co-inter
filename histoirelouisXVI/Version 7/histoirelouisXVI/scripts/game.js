/*
 * ============================================================
 * game.js - Logique principale du jeu
 * Gestion de l'etat, affichage des chapitres et choix du joueur
 * ============================================================
 */

// === ETAT DU JEU ===
// Variables de suivi : confiance du peuple, soutien de la noblesse, progression
var gameState = {
    trust: 50,
    nobility: 70,
    currentChapter: null,
    chaptersVisited: 0
};

// === AFFICHAGE D'UN CHAPITRE ===
// Construit et affiche le contenu HTML d'un chapitre a partir de son identifiant
function showChapter(chapterId) {
    var chapter = chapters[chapterId];
    if (!chapter) {
        console.error('Chapitre introuvable:', chapterId);
        return;
    }

    // Mettre a jour l'etat du jeu
    gameState.currentChapter = chapterId;
    gameState.chaptersVisited++;

    // Animation de sortie du contenu actuel
    var storyContent = document.getElementById('story-content');
    storyContent.style.opacity = '0';
    storyContent.style.transform = 'translateY(20px)';
    storyContent.style.filter = 'blur(3px)';

    // Apres la transition de sortie, remplacer le contenu
    setTimeout(function () {
        // En-tete du chapitre avec numero, titre, icone et date
        var html = ''
            + '<div class="chapter-header" style="animation: fadeInScale 0.8s ease-out both;">'
            + '    <div class="chapter-number">Chapitre ' + gameState.chaptersVisited + '</div>'
            + '    <h2 class="chapter-title"><span class="chapter-icon">' + chapter.icon + '</span> ' + chapter.title + '</h2>'
            + (chapter.date ? '    <div class="chapter-date"><i class="fas fa-calendar-alt"></i> ' + chapter.date + '</div>' : '')
            + '</div>'

            // Barre de statistiques avec les 4 indicateurs
            + '<div class="stats-bar" style="animation: slideDown 0.6s ease-out 0.2s both;">'
            + '    <div class="stat-card">'
            + '        <div class="stat-icon"><i class="fas fa-heart"></i></div>'
            + '        <div class="stat-label">Confiance du Peuple</div>'
            + '        <div class="stat-value">' + gameState.trust + '%</div>'
            + '        <div class="progress-container">'
            + '            <div class="progress-bar" style="width: ' + gameState.trust + '%"></div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="stat-card">'
            + '        <div class="stat-icon"><i class="fas fa-crown"></i></div>'
            + '        <div class="stat-label">Soutien de la Noblesse</div>'
            + '        <div class="stat-value">' + gameState.nobility + '%</div>'
            + '        <div class="progress-container">'
            + '            <div class="progress-bar" style="width: ' + gameState.nobility + '%"></div>'
            + '        </div>'
            + '    </div>'
            + '    <div class="stat-card">'
            + '        <div class="stat-icon"><i class="fas fa-calendar-alt"></i></div>'
            + '        <div class="stat-label">Date</div>'
            + '        <div class="stat-value" style="font-size: 1.1em">' + (chapter.date || '...') + '</div>'
            + '    </div>'
            + '    <div class="stat-card">'
            + '        <div class="stat-icon"><i class="fas fa-book-open"></i></div>'
            + '        <div class="stat-label">Chapitre</div>'
            + '        <div class="stat-value" style="font-size: 1.1em">' + gameState.chaptersVisited + '</div>'
            + '    </div>'
            + '</div>';

        // Image du chapitre si disponible
        if (chapter.image) {
            html += '<img src="' + chapter.image + '" alt="' + chapter.title + '" class="chapter-image">';
        }

        // Texte narratif du chapitre
        html += '<div class="story-text">' + chapter.text + '</div>';

        // === ECRAN DE FIN ===
        // Si le chapitre est une fin, afficher le resultat et le bouton de recommencement
        if (chapter.ending) {
            html += '<div class="ending-screen">'
                + '    <div class="ending-icon">' + chapter.ending.icon + '</div>'
                + '    <div class="ending-box ' + chapter.ending.type + '">'
                + '        <h3 class="ending-title">' + chapter.ending.title + '</h3>'
                + '        <p class="ending-text">' + chapter.ending.text + '</p>'
                + '        <div class="ending-stats">';

            // Afficher chaque statistique de fin
            var stats = chapter.ending.stats;
            var keys = Object.keys(stats);
            for (var i = 0; i < keys.length; i++) {
                html += '<div class="ending-stat">'
                    + '    <div class="ending-stat-label">' + keys[i] + '</div>'
                    + '    <div class="ending-stat-value">' + stats[keys[i]] + '</div>'
                    + '</div>';
            }

            html += '        </div>'
                + '    </div>'
                + '    <div class="action-buttons">'
                + '        <button class="action-btn restart-btn" onclick="restartGame()">'
                + '            <span><i class="fas fa-redo"></i> Recommencer l\'Aventure</span>'
                + '        </button>'
                + '    </div>'
                + '</div>';

        // === CHOIX DU JOUEUR ===
        // Si le chapitre propose des choix, afficher les cartes de choix
        } else if (chapter.choices && chapter.choices.length > 0) {
            html += '<div class="choices-container" style="animation: choicesAppear 0.8s ease-out 0.8s both;">'
                + '    <h3 class="choices-title">⚜️ Que décidez-vous, Sire ? ⚜️</h3>'
                + '    <div class="choices">';

            // Generer une carte pour chaque choix disponible
            for (var j = 0; j < chapter.choices.length; j++) {
                var choice = chapter.choices[j];
                html += '<div class="choice-card" onclick="makeChoice(\'' + choice.next + '\')" style="animation: choiceSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ' + (1.0 + j * 0.15) + 's both;">'
                    + '    <div class="choice-header">'
                    + '        <div class="choice-icon">' + choice.icon + '</div>'
                    + '        <div class="choice-number">' + (j + 1) + '</div>'
                    + '    </div>'
                    + '    <div class="choice-content">'
                    + '        <div class="choice-text">' + choice.text + '</div>'
                    + '        <div class="choice-badges">'
                    + (choice.badge ? '            <span class="badge ' + choice.badge + '">' + (choice.badgeText || '') + '</span>' : '')
                    + '        </div>'
                    + '    </div>'
                    + '    <div class="choice-arrow">→</div>'
                    + '</div>';
            }

            html += '</div></div>';
        }

        // Injecter le HTML genere dans le conteneur
        storyContent.innerHTML = html;

        // Animation d'entree fluide du nouveau contenu
        requestAnimationFrame(function () {
            storyContent.style.opacity = '1';
            storyContent.style.transform = 'translateY(0)';
            storyContent.style.filter = 'blur(0)';
        });
    }, 500);

    // Remonter en haut de page avec defilement fluide
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === TRAITEMENT D'UN CHOIX ===
// Applique les effets du choix sur les statistiques puis affiche le chapitre suivant
function makeChoice(nextChapterId) {
    var currentChapter = chapters[gameState.currentChapter];
    if (currentChapter && currentChapter.choices) {
        // Trouver le choix correspondant pour appliquer ses effets
        var choice = null;
        for (var i = 0; i < currentChapter.choices.length; i++) {
            if (currentChapter.choices[i].next === nextChapterId) {
                choice = currentChapter.choices[i];
                break;
            }
        }
        // Appliquer les modifications de confiance et noblesse (bornes 0-100)
        if (choice && choice.effects) {
            if (choice.effects.trust) {
                gameState.trust = Math.max(0, Math.min(100, gameState.trust + choice.effects.trust));
            }
            if (choice.effects.nobility) {
                gameState.nobility = Math.max(0, Math.min(100, gameState.nobility + choice.effects.nobility));
            }
        }
    }
    showChapter(nextChapterId);
}

// === RECOMMENCER LE JEU ===
// Reinitialise l'etat du jeu et retourne au premier chapitre
function restartGame() {
    gameState = {
        trust: 50,
        nobility: 70,
        currentChapter: null,
        chaptersVisited: 0
    };
    showChapter('start');
}

// === FERMER LE MODAL ===
// Masque la fenetre modale d'information
function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// === DEMARRAGE AUTOMATIQUE ===
// Lance le premier chapitre des le chargement de la page
window.addEventListener('load', function () {
    showChapter('start');
});
