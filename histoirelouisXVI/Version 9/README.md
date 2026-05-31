# La Fuite de Varennes — Version 9

Livre dont vous êtes le héros sur la fuite de Varennes — Louis XVI, Juin 1791.

Version 9 : refonte visuelle « parchemin clair / grimoire ». Même contenu, même logique de jeu
que la Version 8, mais une ambiance lumineuse de vieux papier, des polices médiévales/fantasy et
des animations renforcées (fondu texturé, lueur magique au survol des choix, popups fluides).

## Structure du projet

```
/
├── index.html              Page d'accueil (prologue et bouton de démarrage)
├── README.md               Documentation
├── assets/
│   ├── css/
│   │   ├── common.css      Styles partagés (variables, body, livre, parchemin, coins, en-tête, images)
│   │   ├── index.css       Styles de la page d'accueil (zone de départ, bouton start)
│   │   └── game.css        Styles du jeu (stats, chapitres, choix, fins, notifications)
│   └── images/
│       ├── 01_depart_paris.jpg
│       ├── 02_voyage_nuit.jpg
│       ├── 03_foule_varennes.jpg
│       ├── 04_arrestation_varennes.jpg
│       ├── 05_maison_sauce.jpg
│       ├── 06_retour_paris.jpg
│       └── 07_fuite_reussie.jpg
├── scripts/
│   ├── common.js           Particules de poussière atmosphériques
│   └── game.js             Logique du jeu (navigation, stats, notifications, fil d'ariane)
└── pages/
    └── game.html           Page du jeu (chapitres I à VIII + 3 fins)
```

## Lancer le site

Ouvrir `index.html` dans un navigateur web. Aucun serveur requis.

## Technologies

- HTML5, CSS3, JavaScript vanilla
- [Google Fonts](https://fonts.google.com/) : MedievalSharp (titres), Cinzel (sous-titres), EB Garamond (texte)
