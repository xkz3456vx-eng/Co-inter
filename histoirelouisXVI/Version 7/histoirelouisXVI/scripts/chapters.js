/*
 * ============================================================
 * chapters.js - Donnees de tous les chapitres du jeu
 * Chaque chapitre contient : titre, icone, date, texte narratif,
 * image optionnelle, choix possibles ou fin de partie
 * ============================================================
 */

// === OBJET PRINCIPAL DES CHAPITRES ===
// Structure arborescente de l'histoire avec 40+ embranchements
const chapters = {

    // === CHAPITRE DE DEPART ===
    // Introduction : le joueur incarne Louis XVI aux Tuileries en 1791
    start: {
        title: "Le Roi Prisonnier",
        icon: "\u{1F4D6}",
        date: "20 Juin 1791",
        text: `
            <p>Vous êtes <strong class="highlight">Louis XVI</strong>, Roi de France et de Navarre par la grâce de Dieu. Mais depuis deux longues années, votre royaume s'est embrasé dans les flammes de la <strong>Révolution</strong>.</p>

            <p>Depuis cette fatidique nuit d'octobre 1789, lorsque la foule en furie a envahi Versailles, vous êtes prisonnier dans votre propre palais des Tuileries à Paris. Surveillé jour et nuit par la Garde Nationale du marquis de Lafayette, vous n'êtes plus qu'un roi fantôme.</p>

            <p>Le peuple, qui vous adulait jadis, vous appelle désormais <em>"Monsieur Veto"</em> avec mépris, car vous avez osé refuser certains décrets révolutionnaires qui détruisaient l'Église et spoliaient les émigrés.</p>

            <p><strong>Marie-Antoinette</strong>, votre épouse bien-aimée, est haïe plus encore que vous. On l'accuse de tous les maux de France : de dilapider le Trésor, de comploter avec l'Autriche, de corrompre le roi. Les pamphlets obscènes la déshumanisent quotidiennement.</p>

            <p>Vos enfants, le Dauphin Louis-Charles et Madame Royale Marie-Thérèse, grandissent dans cette atmosphère empoisonnée de haine et de peur. Leur enfance est volée par la Révolution.</p>

            <p>Ce soir du 20 juin 1791, dans le secret de vos appartements, le <strong>comte Axel de Fersen</strong>, officier suédois et ami fidèle, vous présente un plan audacieux : fuir vers <strong>Montmédy</strong>, près de la frontière luxembourgeoise, où le marquis de Bouillé a rassemblé 20 000 soldats loyalistes.</p>

            <p>Mais est-ce la bonne décision ? Fuir pourrait vous faire passer pour un traître. Rester pourrait vous mener à la mort...</p>

            <p><strong>L'Histoire attend votre décision, Sire.</strong></p>
        `,
        choices: [
            {
                text: "Fuir cette nuit vers Montmédy avec toute la famille royale",
                next: "fuite_famille",
                icon: "\u{1F319}",
                badge: "historical",
                badgeText: "Parcours Historique",
                effects: { trust: -20, nobility: +10 }
            },
            {
                text: "Rester et négocier de bonne foi avec l'Assemblée Nationale",
                next: "negociation",
                icon: "\u{1F54A}️",
                badge: "peaceful",
                badgeText: "Voie Pacifique",
                effects: { trust: +15, nobility: -15 }
            },
            {
                text: "Partir seul, incognito, pour revenir avec une armée étrangère",
                next: "fuite_seul",
                icon: "\u{1F3AD}",
                badge: "risky",
                badgeText: "Très Risqué",
                effects: { trust: -30, nobility: +20 }
            }
        ]
    },

    // === BRANCHE HISTORIQUE : FUITE DE VARENNES ===
    // La famille royale fuit vers Montmedy mais est reconnue
    fuite_famille: {
        title: "La Fuite de Varennes",
        icon: "\u{1F697}",
        date: "21 Juin 1791, Minuit",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Arrestation_de_Louis_XVI_%C3%A0_Varennes.jpg/800px-Arrestation_de_Louis_XVI_%C3%A0_Varennes.jpg",
        text: `
            <p>Le plan est en marche. Cette nuit sans lune, vous avez revêtu un costume de valet du prétendu <em>baron de Korff</em>. Marie-Antoinette est habillée en gouvernante russe, vos enfants sont dissimulés sous les jupes des dames de compagnie.</p>

            <p>À minuit précis, vous descendez l'escalier secret des Tuileries. Votre cœur bat la chamade. Un garde passe à quelques mètres sans vous reconnaître. Vous êtes sauvés... pour l'instant.</p>

            <p>Dans la rue de l'Échelle, une imposante <strong>berline</strong> verte et jaune vous attend. Trop luxueuse, trop voyante - mais Fersen a insisté pour que vous voyagiez confortablement. Il conduit lui-même l'attelage dans les premières lieues.</p>

            <p>Votre destination : <strong>Montmédy</strong>, à 250 kilomètres au nord-est, près de la frontière. Là-bas, Bouillé et ses hussards vous attendent. De là, vous pourrez négocier en position de force.</p>

            <p>Mais tout ne se passe pas comme prévu. La berline est lourde, surchargée, lente. À l'aube, vous devriez déjà être à Châlons, mais vous êtes à peine à Bondy. Les relais de chevaux frais sont mal coordonnés. Le temps vous file entre les doigts...</p>

            <p>L'après-midi du 21 juin, à <strong>Sainte-Menehould</strong>, catastrophe : le maître de poste <strong>Jean-Baptiste Drouet</strong>, ancien dragon de l'armée, vous reconnaît. Votre profil royal sur les assignats (la nouvelle monnaie) vous trahit.</p>

            <p>"C'est le roi ! Je le jure sur ma vie !" s'écrie-t-il après votre passage. Il enfourche son cheval le plus rapide et part vous devancer par des chemins de traverse.</p>

            <p>Le soir tombe. Épuisés, affamés, vos enfants pleurent. Vous arrivez enfin à <strong>Varennes-en-Argonne</strong>, à seulement 40 kilomètres de Montmédy et de la liberté...</p>
        `,
        choices: [
            {
                text: "S'arrêter à Varennes pour changer de chevaux comme prévu",
                next: "varennes_arret",
                icon: "⏸️",
                badge: "historical",
                badgeText: "Choix Historique",
                effects: { trust: -30 }
            },
            {
                text: "Ne pas s'arrêter et continuer coûte que coûte vers Montmédy",
                next: "varennes_continue",
                icon: "⚡",
                badge: "risky",
                badgeText: "Audacieux",
                effects: { nobility: +15 }
            },
            {
                text: "Prendre un chemin détourné à travers les bois pour éviter Varennes",
                next: "chemin_detourne",
                icon: "\u{1F332}",
                badge: "risky",
                badgeText: "Alternatif",
                effects: { nobility: +10 }
            }
        ]
    },

    // === ARRESTATION A VARENNES ===
    // Le roi est arrete par le procureur Sauce
    varennes_arret: {
        title: "L'Arrestation",
        icon: "⚔️",
        date: "22 Juin 1791, 23h",
        text: `
            <p>Vous vous arrêtez devant l'auberge du Bras d'Or à Varennes. Il faut absolument changer de chevaux ; les vôtres sont épuisés, couverts d'écume, au bord de l'écroulement.</p>

            <p>Mais <strong>Drouet</strong> est arrivé avant vous. Il a réveillé le procureur de la commune, <strong>Jean-Baptiste Sauce</strong>, et alerté la Garde Nationale locale.</p>

            <p>En quelques minutes, Varennes s'éveille. Le <strong>tocsin</strong> sonne, ce glas sinistre qui appelle le peuple aux armes. Des dizaines, puis des centaines de citoyens encerclent votre berline, brandissant fourches, fusils et torches.</p>

            <p>"Halte ! Vos papiers !" ordonne Sauce. Vous présentez votre passeport au nom du baron de Korff, mais un ancien serviteur de Versailles vous a reconnu.</p>

            <p>"C'est le roi ! C'est Louis XVI ! Il nous trahit ! Il fuit vers l'étranger pour revenir avec une armée !"</p>

            <p>Vous tentez de nier, mais c'est inutile. Sauce, les larmes aux yeux, déclare solennellement : <em>"Votre Majesté, au nom de la Nation et de la Loi, je vous arrête."</em></p>

            <p>Vous passez la nuit dans la modeste maison de Sauce, gardé par des centaines de villageois armés. Marie-Antoinette est effondrée. Vos enfants ne comprennent pas ce qui se passe.</p>

            <p>Au matin du 22 juin, un décret de l'Assemblée Nationale ordonne votre retour immédiat à Paris. Le 25 juin, après quatre jours d'un voyage de cauchemar sous les huées et les crachats, vous rentrez dans la capitale dans un <strong>silence de mort</strong>.</p>

            <p>Des pancartes sont brandies : <em>"Quiconque applaudira le roi sera battu ; quiconque l'insultera sera pendu."</em> Un silence plus terrifiant que la haine.</p>

            <p>Vous êtes suspendus de vos fonctions royales. La monarchie vacille au bord du gouffre. L'Assemblée débat : faut-il vous juger ? Vous déchoir ? La République est dans tous les esprits...</p>
        `,
        choices: [
            {
                text: "Accepter la Constitution de 1791 et devenir roi constitutionnel",
                next: "roi_constitutionnel",
                icon: "\u{1F4DC}",
                badge: "historical",
                badgeText: "Voie Historique",
                effects: { trust: +10, nobility: -20 }
            },
            {
                text: "Refuser toute collaboration et attendre l'aide des puissances étrangères",
                next: "refus_collaboration",
                icon: "\u{1F6AB}",
                badge: "dangerous",
                badgeText: "Dangereux",
                effects: { trust: -20, nobility: +15 }
            },
            {
                text: "Négocier secrètement avec les Girondins modérés",
                next: "negociation_girondins",
                icon: "\u{1F91D}",
                badge: "peaceful",
                badgeText: "Diplomatique",
                effects: { trust: +15, nobility: -10 }
            }
        ]
    },

    // === FUITE REUSSIE VERS MONTMEDY ===
    // Le roi arrive a Montmedy et doit choisir sa strategie
    varennes_continue: {
        title: "La Course Contre la Mort",
        icon: "\u{1F3C3}",
        date: "22 Juin 1791",
        text: `
            <p>"Non ! Plus vite ! Nous ne nous arrêtons pas !" criez-vous au cocher d'une voix que vous ne vous connaissiez pas. Vos mains tremblent, mais votre décision est prise.</p>

            <p>La berline file dans la nuit noire de Varennes sans ralentir. Derrière vous, des cris, des coups de feu dans l'air, le tocsin qui hurle. Mais vous gardez votre avance précieuse.</p>

            <p>Les chevaux, fouettés par l'urgence, trouvent des forces insoupçonnées. Marie-Antoinette prie en latin, les mains jointes. Les enfants, terrifiés, se blottissent contre elle. Madame Élisabeth, votre sœur, demeure stoïque.</p>

            <p>L'aube du 22 juin se lève enfin. À l'horizon, vous apercevez des <strong>uniformes bleus et rouges</strong> : ce sont les hussards de Bouillé ! Des larmes de soulagement coulent sur vos joues.</p>

            <p>"Vive le Roi ! Vive Louis XVI !" crient les soldats en vous entourant. Vous êtes sauvés ! Une escorte de 500 cavaliers vous accompagne jusqu'à la forteresse de <strong>Montmédy</strong>.</p>

            <p>Depuis cette place forte imprenable, entouré de 20 000 soldats loyalistes et de canons, vous êtes désormais en <strong>position de force</strong> pour négocier avec l'Assemblée Nationale.</p>

            <p>Mais comment procéder ? La France est divisée, au bord de la guerre civile. Votre fuite a choqué, scandalisé. Certains vous accusent de trahison. D'autres vous comprennent.</p>

            <p>Que ferez-vous de cette position de force retrouvée ?</p>
        `,
        choices: [
            {
                text: "Négocier depuis Montmédy une monarchie constitutionnelle équilibrée",
                next: "negociation_montmedy",
                icon: "⚖️",
                badge: "peaceful",
                badgeText: "Sage",
                effects: { trust: +20, nobility: +10 }
            },
            {
                text: "Lancer un appel aux souverains européens pour qu'ils interviennent",
                next: "appel_etranger",
                icon: "\u{1F4EF}",
                badge: "dangerous",
                badgeText: "Provocateur",
                effects: { trust: -40, nobility: +25 }
            },
            {
                text: "Marcher sur Paris à la tête de l'armée loyaliste",
                next: "marche_paris",
                icon: "⚔️",
                badge: "dangerous",
                badgeText: "Guerre Civile",
                effects: { trust: -50, nobility: +30 }
            }
        ]
    },

    // === MEILLEURE FIN : LE ROI SAGE ===
    // Negociation reussie depuis Montmedy
    negociation_montmedy: {
        title: "Le Roi Sage",
        icon: "\u{1F451}",
        date: "Juillet 1791",
        text: `
            <p>Depuis les remparts de Montmédy, vous contemplez la France déchirée. Vous avez le pouvoir militaire, mais est-ce vraiment ce que vous voulez ? La guerre civile ? Le sang français versé par des Français ?</p>

            <p>Non. Vous êtes roi pour protéger votre peuple, pas pour le détruire.</p>

            <p>Vous envoyez une lettre à l'Assemblée Nationale, lue en séance publique le 14 juillet 1791, anniversaire de la prise de la Bastille - un symbole fort :</p>

            <p><em>"Messieurs les Députés, je ne suis pas votre ennemi. Je suis venu à Montmédy non pour faire la guerre à la France, mais pour négocier en toute liberté, loin des pressions de Paris. Je propose un nouveau pacte : une monarchie constitutionnelle où le roi conserve certaines prérogatives essentielles - chef des armées, diplomatie, droit de veto suspensif - mais accepte le partage du pouvoir avec une assemblée élue. Construisons ensemble une France nouvelle, sans révolution ni contre-révolution."</em></p>

            <p>Votre lettre fait sensation. Les modérés comme <strong>Barnave</strong>, <strong>Duport</strong> et le <strong>marquis de Lafayette</strong> y voient une chance de stabiliser la Révolution. Les négociations s'ouvrent.</p>

            <p>Pendant trois mois, des émissaires font l'aller-retour entre Montmédy et Paris. Les discussions sont difficiles, houleuses. Les Jacobins comme Robespierre dénoncent une trahison. Mais les modérés tiennent bon.</p>

            <p>Le <strong>15 octobre 1791</strong>, un accord historique est signé : la <strong>Constitution de Montmédy</strong>. Vous retournez à Paris, acclamé cette fois, car vous revenez de votre plein gré, en roi constitutionnel respecté.</p>

            <p>Les années suivantes ne sont pas faciles. Les tensions demeurent. Mais vous évitez la guerre civile, la Terreur, l'invasion étrangère.</p>

            <p>En 1815, à votre mort naturelle, vous laissez une France apaisée, réconciliée. Votre fils Louis XVII monte sur le trône d'une monarchie parlementaire stable.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F451}",
            title: "\u{1F3C6} MEILLEURE FIN - Le Roi Sage \u{1F3C6}",
            text: "Vous avez trouvé le chemin le plus difficile mais le plus noble : celui de la sagesse et du compromis. En acceptant de partager le pouvoir tout en conservant votre dignité royale, vous avez sauvé la France de la guerre civile et de la Terreur. L'Histoire vous célèbre comme 'Louis le Sage', le roi qui a su adapter la monarchie à son temps. Votre règne est un modèle pour l'Europe entière.",
            stats: {
                "Popularité finale": "85%",
                "Vies sauvées": "Plus de 500 000",
                "Stabilité du royaume": "Excellent",
                "Héritage historique": "Légendaire"
            }
        }
    },

    // === CHEMIN DETOURNE PAR LA FORET ===
    // L'essieu de la berline se brise dans les bois
    chemin_detourne: {
        title: "Le Piège de la Forêt",
        icon: "\u{1F332}",
        date: "22 Juin 1791, Nuit",
        text: `
            <p>"Prenez à gauche ! Par la forêt !" ordonnez-vous au cocher en désignant un sentier sombre qui s'enfonce entre les arbres.</p>

            <p>La berline quitte la route principale et s'engage dans le sous-bois. Les branches griffent les flancs du véhicule. Les roues s'enfoncent dans la terre meuble. Marie-Antoinette vous regarde avec inquiétude.</p>

            <p>Pendant deux heures, vous progressez péniblement dans l'obscurité totale. Le Dauphin dort enfin, épuisé. Vous commencez à espérer...</p>

            <p>Soudain, un craquement sinistre : l'essieu arrière se brise ! La berline s'affaisse brutalement. Vous êtes immobilisés en pleine forêt, à des lieues de tout secours.</p>

            <p>Le cocher tente de réparer, mais c'est impossible sans outils appropriés. Les heures passent. L'aube approche. Vous entendez au loin les cloches de Varennes sonner le tocsin.</p>

            <p>Au matin, des patrouilles vous découvrent. Non seulement vous êtes arrêté, mais les conditions de votre capture - caché dans les bois comme un fugitif - vous font paraître encore plus coupable aux yeux du peuple.</p>
        `,
        choices: [
            {
                text: "Tenter de soudoyer les gardes avec l'or que vous transportez",
                next: "corruption_echec",
                icon: "\u{1F4B0}",
                badge: "desperate",
                badgeText: "Désespéré",
                effects: { trust: -40, nobility: -20 }
            },
            {
                text: "Assumer dignement votre arrestation",
                next: "dignite_capture",
                icon: "\u{1F451}",
                badge: "honorable",
                badgeText: "Honorable",
                effects: { trust: -10, nobility: +10 }
            }
        ]
    },

    // === FIN TRAGIQUE : CORRUPTION ===
    // La tentative de soudoyer les gardes echoue lamentablement
    corruption_echec: {
        title: "L'Humiliation Suprême",
        icon: "\u{1F494}",
        date: "23 Juin 1791",
        text: `
            <p>Vous sortez une bourse pleine de louis d'or. "Je vous en prie, messieurs, laissez-nous passer. Vous serez richement récompensés..."</p>

            <p>Le sergent de la Garde Nationale vous regarde avec un mélange de pitié et de dégoût. "Voilà donc le roi de France ! Un corrupteur, un lâche qui tente d'acheter sa liberté avec l'argent du peuple !"</p>

            <p>Il gifle votre main, l'or se répand dans la boue. Les soldats rient. Cette scène sera racontée dans toute la France, amplifiée, déformée.</p>

            <p>À Paris, les journaux publient des caricatures cruelles : "Le roi couard surpris en train de soudoyer ses geôliers". Votre image est irrémédiablement salie.</p>

            <p>Même vos partisans vous abandonnent. Comment défendre un roi qui a perdu toute dignité ? L'Assemblée vote massivement votre destitution. La République est proclamée le 21 septembre 1791, avec six mois d'avance sur l'Histoire.</p>

            <p>Vous êtes jugé le 10 décembre 1791 pour haute trahison. Le vote est unanime : <strong>mort</strong>.</p>

            <p>Le 21 janvier 1792, vous montez sur l'échafaud place de la Révolution. Vos derniers mots sont couverts par un roulement de tambours. Votre règne s'achève dans la honte et l'oubli.</p>
        `,
        choices: [],
        ending: {
            type: "bad",
            icon: "\u{1F480}",
            title: "☠️ FIN TRAGIQUE - Le Roi Déchu ☠️",
            text: "Votre tentative désespérée de corruption a détruit les derniers vestiges de votre honneur royal. L'Histoire vous juge sévèrement : 'Louis XVI, le roi qui voulut acheter sa liberté'. Même un siècle plus tard, les monarchistes refusent de défendre votre mémoire. Votre fils ne règnera jamais.",
            stats: {
                "Réputation finale": "Désastreuse",
                "Popularité": "2%",
                "Jugement de l'Histoire": "Extrêmement négatif",
                "Destin de la famille": "Dispersée et oubliée"
            }
        }
    },

    // === RETOUR FORCE AVEC DIGNITE ===
    // Le roi assume son arrestation et fait face a la Declaration de Pillnitz
    dignite_capture: {
        title: "Le Retour Forcé",
        icon: "⛓️",
        date: "25 Juin 1791",
        text: `
            <p>Vous vous tenez droit, malgré l'épuisement et l'humiliation. "Je suis le Roi. Je ne résisterai pas à l'arrestation. Mais traitez ma famille avec respect."</p>

            <p>Cette dignité inattendue surprend les gardes. Certains semblent même émus. Le retour à Paris est pénible mais moins violent que dans d'autres scénarios.</p>

            <p>À Paris, l'opinion est divisée. Les radicaux veulent votre tête, mais les modérés plaident pour une seconde chance. <strong>Barnave</strong>, député influent, devient presque un ami après avoir voyagé avec vous depuis Varennes.</p>

            <p>Le 14 septembre 1791, vous acceptez solennellement la Constitution. "Je jure de défendre la Constitution que le peuple français a acceptée", déclarez-vous devant l'Assemblée.</p>

            <p>Mais les tensions montent. L'empereur d'Autriche et le roi de Prusse publient la <strong>Déclaration de Pillnitz</strong> (27 août 1791), menaçant d'intervenir pour vous rétablir dans vos droits.</p>

            <p>Cette déclaration, que vous n'avez pas sollicitée, vous dessert terriblement. Les révolutionnaires vous accusent de double jeu.</p>
        `,
        choices: [
            {
                text: "Dénoncer publiquement la Déclaration de Pillnitz",
                next: "denonciation_pillnitz",
                icon: "\u{1F4E2}",
                badge: "patriotic",
                badgeText: "Patriote",
                effects: { trust: +25, nobility: -25 }
            },
            {
                text: "Rester silencieux et neutre",
                next: "silence_ambigu",
                icon: "\u{1F910}",
                badge: "historical",
                badgeText: "Choix Historique",
                effects: { trust: -15 }
            }
        ]
    },

    // === BRANCHE NEGOCIATION ===
    // Le roi choisit le dialogue avec l'Assemblee
    negociation: {
        title: "La Main Tendue",
        icon: "\u{1F91D}",
        date: "Juillet 1791",
        text: `
            <p>Vous choisissez la voie du dialogue. Plutôt que de fuir, vous demandez une audience solennelle devant l'Assemblée Nationale Constituante.</p>

            <p>Le 15 juillet 1791, vous vous présentez devant les députés. Le silence est assourdissant. Tous les regards convergent vers vous. Vous êtes seul, sans garde, vulnérable.</p>

            <p>"Messieurs les députés", commencez-vous d'une voix ferme, "je ne suis pas votre ennemi. Je suis français comme vous. J'aime ce pays plus que ma propre vie. La Révolution a corrigé des injustices que je reconnaissais moi-même. Mais elle risque de sombrer dans le chaos et la violence."</p>

            <p>"Je vous propose un pacte : travaillons ensemble à bâtir une monarchie nouvelle, où le roi et le peuple partagent le pouvoir. Ni tyrannie, ni anarchie. Un équilibre français."</p>

            <p>Votre discours provoque un tumulte. <strong>Robespierre</strong> vous accuse d'hypocrisie. Mais <strong>Mirabeau</strong>, le grand orateur, se lève et déclare : "Donnons une chance à la réconciliation !"</p>

            <p>Un vote est organisé. Par 530 voix contre 320, l'Assemblée accepte d'ouvrir des négociations sérieuses sur une Constitution équilibrée.</p>

            <p>Les semaines suivantes sont intenses. Vous participez personnellement aux débats constitutionnels. Votre connaissance du droit et de l'administration surprend les députés.</p>
        `,
        choices: [
            {
                text: "Accepter de devenir un roi véritablement constitutionnel",
                next: "roi_citoyen",
                icon: "\u{1F1EB}\u{1F1F7}",
                badge: "revolutionary",
                badgeText: "Révolutionnaire",
                effects: { trust: +40, nobility: -30 }
            },
            {
                text: "Négocier fermement pour conserver plus de pouvoirs",
                next: "negociation_dure",
                icon: "⚖️",
                badge: "balanced",
                badgeText: "Équilibré",
                effects: { trust: +10, nobility: +10 }
            }
        ]
    },

    // === FIN : LE ROI REPUBLICAIN ===
    // Louis XVI devient Premier Citoyen de France
    roi_citoyen: {
        title: "Louis, Premier Citoyen de France",
        icon: "\u{1F3A9}",
        date: "14 Juillet 1792",
        text: `
            <p>Un an après votre décision courageuse, vous vous tenez sur le Champ-de-Mars pour célébrer la Fête de la Fédération. Mais cette année, tout est différent.</p>

            <p>Vous n'êtes plus "Sa Majesté". Vous êtes simplement "Louis Capet, Premier Citoyen de France". Vous avez abandonné volontairement tous vos titres nobiliaires, vos privilèges, même votre couronne.</p>

            <p>Vous portez désormais un simple habit bourgeois avec la cocarde tricolore. Vos revenus sont identiques à ceux d'un haut fonctionnaire. Vous avez transformé Versailles en musée public.</p>

            <p>Votre rôle ? Celui d'un <strong>président d'honneur</strong>, sans pouvoir réel, mais respecté pour votre sagesse et votre connaissance de l'État.</p>

            <p>Ce sacrifice inouï a transformé l'opinion. Les sans-culottes vous respectent. Les révolutionnaires modérés vous admirent. Même Robespierre a reconnu votre patriotisme.</p>

            <p>La France évite la guerre civile, la Terreur, l'exécution du roi. Les monarchies européennes, stupéfaites, ne savent comment réagir à ce roi qui a abdiqué volontairement.</p>

            <p>En 1795, une nouvelle Constitution établit un régime parlementaire stable. Vous devenez une sorte de "sage de la République", consulté mais non décisionnaire.</p>

            <p>À votre mort en 1808, des centaines de milliers de citoyens accompagnent votre cercueil. Vous êtes enterré au Panthéon, honneur suprême, aux côtés de Voltaire et Rousseau.</p>

            <p>Votre épitaphe : <em>"Louis Capet, qui préféra son peuple à sa couronne."</em></p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F3A9}",
            title: "✨ BONNE FIN - Le Roi Républicain ✨",
            text: "Vous avez accompli l'impossible : transformer la monarchie en république sans violence, en donnant l'exemple du sacrifice personnel. Les historiens débattent encore : étiez-vous un génie politique ou un homme brisé par les circonstances ? Peu importe : vous avez sauvé votre famille, votre peuple et votre honneur. La France vous vénère comme le 'Roi qui devint Citoyen'.",
            stats: {
                "Popularité finale": "92%",
                "Vies sauvées": "Plus de 600 000",
                "Famille royale": "En sécurité et respectée",
                "Héritage": "Monument au Panthéon"
            }
        }
    },

    // === BRANCHE HISTORIQUE : ROI CONSTITUTIONNEL ===
    // Le roi accepte la Constitution mais la guerre eclate
    roi_constitutionnel: {
        title: "Le Roi Constitutionnel",
        icon: "\u{1F4DC}",
        date: "14 Septembre 1791",
        text: `
            <p>Dans la salle du Manège, devant tous les députés, vous posez solennellement votre main sur la Constitution et jurez : "Je jure de maintenir la Constitution décidée par l'Assemblée Nationale et acceptée par moi."</p>

            <p>Des applaudissements éclatent. La Fayette pleure de joie. Peut-être la Révolution peut-elle se terminer ainsi, dans la réconciliation ?</p>

            <p>Les mois suivants sont délicats. Vous êtes roi, mais avec des pouvoirs très limités. Vous ne pouvez que suspendre temporairement les lois (veto suspensif), pas les rejeter définitivement.</p>

            <p>La nouvelle <strong>Assemblée Législative</strong>, élue en octobre 1791, est plus radicale que la précédente. Les <strong>Girondins</strong>, belliqueux, poussent à la guerre contre l'Autriche.</p>

            <p>Le 20 avril 1792, sur leur pression, vous devez déclarer la guerre à l'empereur François II - votre propre beau-frère ! C'est un déchirement intime.</p>

            <p>Les premières batailles sont désastreuses. Les généraux incompétents, les soldats désorganisés. Le <strong>manifeste de Brunswick</strong> (25 juillet 1792) menace Paris de destruction totale si on touche à votre famille.</p>

            <p>Cette déclaration vous condamne. Le peuple vous accuse d'avoir comploté avec l'ennemi. Le 10 août 1792, les Tuileries sont envahies...</p>
        `,
        choices: [
            {
                text: "Ordonner aux gardes suisses de se défendre",
                next: "massacre_suisses",
                icon: "⚔️",
                badge: "historical",
                badgeText: "Historique",
                effects: { trust: -40 }
            },
            {
                text: "Vous réfugier immédiatement à l'Assemblée",
                next: "refuge_assemblee",
                icon: "\u{1F3DB}️",
                badge: "peaceful",
                badgeText: "Pacifique",
                effects: { trust: -20 }
            },
            {
                text: "Négocier avec les insurgés depuis un balcon",
                next: "negociation_balcon",
                icon: "\u{1F5E3}️",
                badge: "risky",
                badgeText: "Courageux",
                effects: { trust: +10 }
            }
        ]
    },

    // === LE 10 AOUT SANGLANT ===
    // Massacre des gardes suisses aux Tuileries
    massacre_suisses: {
        title: "Le 10 Août Sanglant",
        icon: "\u{1FA78}",
        date: "10 Août 1792",
        text: `
            <p>"Défendez le palais ! Défendez votre roi !" criez-vous aux 950 gardes suisses loyaux qui protègent les Tuileries.</p>

            <p>Mais face à eux déferle une marée humaine : 20 000 fédérés marseillais, sans-culottes parisiens, gardes nationaux. Armés de canons, de piques, de fusils, de rage.</p>

            <p>Le combat est bref et atroce. Les Suisses tirent, tuent des centaines d'assaillants. Mais ils sont submergés. Massacrés jusqu'au dernier. Certains sont littéralement dépecés vivants par la foule en furie.</p>

            <p>Vous avez fui vers l'Assemblée avec votre famille, mais il est trop tard. Vous êtes associé à ce bain de sang. Les cadavres des Suisses jonchent les Tuileries et les jardins.</p>

            <p>L'Assemblée, terrorisée par la violence populaire, vote votre <strong>suspension</strong> immédiate. Vous êtes emprisonnés à la prison du Temple, toute la famille royale, dans des conditions humiliantes.</p>

            <p>Les semaines suivantes voient le massacre de septembre : 1 400 prisonniers, dont des prêtres et des nobles, égorgés dans les prisons parisiennes. La Terreur commence.</p>

            <p>La République est proclamée le 21 septembre 1792. Vous n'êtes plus roi, mais "Louis Capet", citoyen accusé de trahison.</p>
        `,
        choices: [
            {
                text: "Continuer vers le procès historique",
                next: "proces_historique",
                icon: "⚖️",
                badge: "historical",
                badgeText: "Suite Historique",
                effects: {}
            }
        ]
    },

    // === LE PROCES DU ROI ===
    // Jugement devant la Convention Nationale
    proces_historique: {
        title: "Le Procès du Roi",
        icon: "⚖️",
        date: "11 Décembre 1792 - 15 Janvier 1793",
        text: `
            <p>Vous comparaissez devant la Convention Nationale, transformée en tribunal. 749 députés vont décider de votre sort. Vous êtes seul face à eux, sans perruque, vêtu simplement.</p>

            <p>On vous lit 33 chefs d'accusation : trahison, complot avec l'étranger, tentative de fuite, massacre du Champ-de-Mars, veto contre les lois patriotiques...</p>

            <p>Votre défense, assurée par <strong>Malesherbes</strong>, le vieil homme qui fut votre ministre, est émouvante mais vaine. L'avocat <strong>de Sèze</strong> plaide brillamment : "Je cherche parmi vous des juges, et je ne vois que des accusateurs !"</p>

            <p>Mais le verdict est joué d'avance. L'Europe entière a les yeux rivés sur Paris. Que fera la France révolutionnaire de son roi ?</p>

            <p>Les votes s'enchaînent :</p>
            <ul style="margin-left: 40px; margin-top: 15px;">
                <li><strong>Culpabilité</strong> : 707 voix pour, 0 contre (abstentions)</li>
                <li><strong>Peine de mort</strong> : 361 voix pour, 360 contre (majorité d'une voix !)</li>
                <li><strong>Sursis</strong> : rejeté par 380 voix contre 310</li>
            </ul>

            <p>Votre propre cousin, <strong>Philippe Égalité</strong>, duc d'Orléans, vote pour votre mort. Cette trahison vous blesse plus que le verdict lui-même.</p>

            <p>Le 20 janvier 1793, on vous annonce que vous serez exécuté le lendemain. Vous demandez trois jours pour vous préparer. Refusé.</p>

            <p>Vous passez votre dernière nuit à prier avec l'abbé Edgeworth. Marie-Antoinette et vos enfants viennent vous dire adieu. Les pleurs, les étreintes... insoutenables.</p>
        `,
        choices: [
            {
                text: "Affronter l'échafaud avec dignité",
                next: "execution_historique",
                icon: "⚰️",
                badge: "historical",
                badgeText: "Fin Historique",
                effects: {}
            }
        ]
    },

    // === FIN HISTORIQUE : L'ECHAFAUD ===
    // Execution de Louis XVI le 21 janvier 1793
    execution_historique: {
        title: "21 Janvier 1793",
        icon: "⚰️",
        date: "21 Janvier 1793, 10h22",
        text: `
            <p>Ce matin glacial, vous montez dans une voiture fermée. Aux côtés de votre confesseur, vous récitez les psaumes des morts. Paris est silencieux, 80 000 soldats quadrillent les rues.</p>

            <p>À 10h10, vous arrivez place de la Révolution (aujourd'hui place de la Concorde). L'échafaud se dresse, immense, entouré d'une foule compacte mais étrangement silencieuse.</p>

            <p>Vous montez les marches. Vous tentez de parler : "Je meurs innocent ! Je pardonne à mes ennemis ! Je prie Dieu que mon sang ne retombe pas sur la France !"</p>

            <p>Mais un roulement de tambours couvre votre voix. <strong>Santerre</strong>, commandant de la Garde Nationale, a donné l'ordre de vous faire taire.</p>

            <p>À 10h22, la lame tombe. Votre tête est brandie à la foule. Certains crient "Vive la République !", d'autres pleurent en silence. Des mouchoirs sont trempés dans votre sang comme des reliques.</p>

            <p>Marie-Antoinette vous suivra neuf mois plus tard, le 16 octobre 1793. Votre fils Louis XVII mourra en prison en 1795, à 10 ans, dans des conditions atroces. Seule votre fille survivra.</p>

            <p>La France sombrera dans la Terreur : 40 000 exécutions en un an. Puis viendront les guerres napoléoniennes : 3 millions de morts. L'Europe entière embrasée.</p>

            <p>Votre mort n'a rien résolu. Elle a ouvert l'abîme.</p>
        `,
        choices: [],
        ending: {
            type: "historical",
            icon: "\u{1F4DC}",
            title: "\u{1F4DC} FIN HISTORIQUE - L'Échafaud \u{1F4DC}",
            text: "Vous avez suivi le parcours historique authentique de Louis XVI. Votre exécution le 21 janvier 1793 reste l'un des événements les plus traumatisants de l'histoire française. Aujourd'hui encore, les historiens débattent : étiez-vous un tyran, un roi faible, ou une victime des circonstances ? Une chose est sûre : votre mort a changé la France et l'Europe à jamais. Chaque année, des milliers de personnes commémorent votre mémoire place de la Concorde.",
            stats: {
                "Date de mort": "21 janvier 1793",
                "Âge": "38 ans",
                "Derniers mots": "'Je meurs innocent'",
                "Authenticité historique": "100%"
            }
        }
    },

    // === FIN : L'INVASION ===
    // L'appel aux souverains etrangers declenche une invasion et la haine du peuple
    appel_etranger: {
        title: "L'Invasion",
        icon: "\u{1F3F0}",
        date: "Août 1791",
        text: `
            <p>Depuis Montmédy, vous envoyez des lettres secrètes à votre beau-frère l'empereur d'Autriche, au roi de Prusse, au tsar de Russie. Vous les suppliez d'intervenir militairement pour "sauver la France du chaos révolutionnaire".</p>

            <p>Votre appel est entendu. En avril 1792, une coalition austro-prussienne de 150 000 hommes franchit la frontière française sous le commandement du duc de Brunswick.</p>

            <p>Mais vous avez gravement sous-estimé le patriotisme révolutionnaire. Votre appel aux étrangers fait de vous un <strong>traître</strong> aux yeux de tous les Français, même des modérés.</p>

            <p>Le 20 septembre 1792, à <strong>Valmy</strong>, l'armée révolutionnaire arrête l'invasion. "De ce jour et de ce lieu date une nouvelle ère de l'histoire du monde", écrira Goethe, témoin de la bataille.</p>

            <p>Le peuple français, uni contre l'envahisseur, radicalise la Révolution. La République est proclamée. Vous êtes capturé à Montmédy par une armée française furieuse.</p>

            <p>Votre procès est expéditif. Vous êtes unanimement condamné pour <strong>haute trahison</strong>. Même Malesherbes refuse de vous défendre. "Vous avez livré la France à ses ennemis", vous dit-il avec dégoût.</p>

            <p>Vous êtes exécuté le 21 septembre 1792, le jour même de la proclamation de la République. Votre nom devient synonyme de trahison dans tous les manuels d'histoire.</p>
        `,
        choices: [],
        ending: {
            type: "bad",
            icon: "\u{1F5E1}️",
            title: "⚔️ MAUVAISE FIN - Le Roi Traître ⚔️",
            text: "Votre appel aux puissances étrangères restera comme l'une des plus grandes erreurs politiques de l'Histoire. Vous avez transformé une révolution interne en guerre patriotique, unifiant le peuple français contre vous. Pendant deux siècles, votre nom sera maudit en France. Même les monarchistes ne vous pardonneront jamais d'avoir fait tirer sur des Français par des armées étrangères.",
            stats: {
                "Réputation": "Catastrophique",
                "Morts causées": "Plus de 100 000",
                "Jugement": "Unanime",
                "Mémoire historique": "Infâme"
            }
        }
    },

    // === FIN : LA GUERRE CIVILE ===
    // Le roi marche sur Paris a la tete de son armee
    marche_paris: {
        title: "La Guerre Civile",
        icon: "⚔️",
        date: "Septembre 1791",
        text: `
            <p>"En avant vers Paris ! Nous allons écraser ces régicides !" ordonnez-vous à la tête de l'armée de Bouillé. 20 000 hommes se mettent en marche.</p>

            <p>C'est le début de la <strong>première guerre civile française</strong>. La Révolution, qui aurait pu se terminer pacifiquement, devient un bain de sang.</p>

            <p>L'Assemblée Nationale, paniquée, mobilise en urgence. Lafayette prend la tête d'une armée révolutionnaire de 50 000 hommes. Les deux armées se rencontrent près de <strong>Reims</strong> le 20 septembre 1791.</p>

            <p>La bataille est apocalyptique. Français contre Français, frères contre frères. Les canons tonnent pendant huit heures. À la fin, 12 000 cadavres jonchent le champ de bataille.</p>

            <p>Vous gagnez la bataille militairement. Mais vous avez perdu moralement. Comment un roi peut-il régner après avoir fait tuer son propre peuple ?</p>

            <p>La guerre civile s'étend. Le Sud et l'Ouest se soulèvent pour vous. Paris et l'Est restent révolutionnaires. La France se déchire pendant trois ans dans une guerre totale.</p>

            <p>Les puissances européennes interviennent, profitant du chaos. L'Autriche annexe l'Alsace. La Prusse occupe la Lorraine. L'Espagne envahit le Roussillon.</p>

            <p>En 1794, épuisé, malade, vous signez un armistice désastreux. Vous conservez un petit royaume réduit à la région parisienne. Le reste de la France est perdu ou indépendant.</p>

            <p>Vous mourez en 1800, brisé, détesté, dans un palais des Tuileries délabré. Votre fils héritera d'un pays en ruines.</p>
        `,
        choices: [],
        ending: {
            type: "bad",
            icon: "\u{1F480}",
            title: "☠️ PIRE FIN - Le Roi Fratricide ☠️",
            text: "Vous avez choisi le chemin le plus sanglant. La guerre civile que vous avez déclenchée a fait plus de 300 000 morts et détruit la France. L'Histoire vous juge avec une sévérité absolue : 'Louis XVI, le roi qui préféra son pouvoir à son peuple'. Votre règne s'achève dans le déshonneur et le chaos. La monarchie française ne s'en remettra jamais.",
            stats: {
                "Morts totales": "Plus de 300 000",
                "Territoires perdus": "40% de la France",
                "Jugement historique": "Désastreux",
                "Héritage": "Guerre et ruines"
            }
        }
    },

    // === FIN : LE ROI PATRIOTE ===
    // Denonciation de Pillnitz et alliance avec le peuple
    denonciation_pillnitz: {
        title: "Le Roi Patriote",
        icon: "\u{1F1EB}\u{1F1F7}",
        date: "Septembre 1791",
        text: `
            <p>Vous publiez une lettre ouverte qui fait sensation : "Je dénonce solennellement la Déclaration de Pillnitz ! Je ne l'ai jamais demandée. Je suis roi de France avant d'être neveu de l'empereur. Si des armées étrangères osent fouler notre sol, je combattrai à la tête de nos troupes !"</p>

            <p>L'effet est électrique. Les révolutionnaires les plus méfiants sont stupéfaits. Lafayette vous serre dans ses bras en public. Les Jacobins eux-mêmes applaudissent.</p>

            <p>Votre popularité remonte en flèche. Les caricaturistes qui vous crachaient dessus vous dessinent maintenant en <strong>roi patriote</strong>. On chante dans les rues : "Louis est des nôtres !"</p>

            <p>Les années 1792-1793 sont tendues mais pacifiques. Vous travaillez main dans la main avec l'Assemblée Législative. La guerre contre l'Autriche est déclarée en avril 1792, mais cette fois vous êtes clairement du côté de la France.</p>

            <p>Vous visitez même le front, encouragez les soldats. Cette image du "roi-soldat" est puissante. La propagande révolutionnaire ne peut plus vous attaquer sans passer pour anti-patriotique.</p>

            <p>Le 10 août 1792, quand les sans-culottes marchent sur les Tuileries, ils ne viennent pas pour vous arrêter mais pour vous demander de prendre la tête d'une levée en masse contre l'invasion prussienne !</p>

            <p>Vous acceptez. En septembre 1792, vous êtes à Valmy aux côtés de Dumouriez et Kellermann quand l'armée prussienne est repoussée.</p>

            <p>La Convention, élue en septembre, maintient la monarchie constitutionnelle. Vous n'êtes pas un roi absolu, mais un roi aimé, respecté, légitime.</p>

            <p>Vous mourez en 1820, après 29 ans de règne constitutionnel paisible. Votre fils Louis XVII vous succède dans une France réconciliée.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F396}️",
            title: "\u{1F3C6} BONNE FIN - Le Roi Patriote \u{1F3C6}",
            text: "Vous avez accompli un miracle politique : transformer votre image de roi réactionnaire en celle de patriote révolutionnaire. En choisissant clairement le camp de la France contre les monarchies étrangères, vous avez sauvé votre trône, votre famille et votre pays. L'Histoire vous célèbre comme 'Louis le Patriote', le roi qui sut s'adapter sans perdre son âme.",
            stats: {
                "Popularité finale": "78%",
                "Stabilité": "Excellente",
                "Famille royale": "En sécurité",
                "Héritage": "Dynastie maintenue"
            }
        }
    },

    // === FIN : ALLIANCE DES MODERES ===
    // Negociation secrete avec les Girondins mene a l'exil puis au retour
    negociation_girondins: {
        title: "L'Alliance des Modérés",
        icon: "\u{1F91D}",
        date: "Automne 1791",
        text: `
            <p>Vous entamez des négociations discrètes avec les <strong>Girondins</strong> - Brissot, Vergniaud, Roland - ces révolutionnaires modérés qui dominent la nouvelle Assemblée Législative.</p>

            <p>Contrairement aux Jacobins radicaux de Robespierre, les Girondins croient encore à une monarchie constitutionnelle. Ils sont patriotes mais pas régicides.</p>

            <p>Un accord tacite se dessine : vous acceptez leurs réformes économiques et leur politique extérieure agressive, ils vous protègent contre les Jacobins et la Commune de Paris.</p>

            <p>Cette alliance fonctionne remarquablement bien pendant un an. La guerre contre l'Autriche (avril 1792) se passe bien. Vous nommez des ministres girondins. La France semble stabilisée.</p>

            <p>Mais l'été 1792 apporte son lot de crises. Les défaites militaires, les difficultés économiques, la pression de la rue parisienne...</p>

            <p>Le 10 août 1792, l'insurrection éclate. Mais cette fois, les Girondins vous défendent publiquement. Vergniaud prononce un discours enflammé : "Toucher au roi serait déclencher la guerre civile !"</p>

            <p>L'affrontement est évité de justesse. Vous acceptez de donner encore plus de pouvoirs à l'Assemblée. Vous devenez un roi presque symbolique, mais vivant et respecté.</p>

            <p>Hélas, en 1793, les Girondins sont renversés par les Montagnards de Robespierre. Vous êtes arrêté. Mais votre alliance passée vous vaut des défenseurs acharnés.</p>

            <p>Votre procès en janvier 1793 se solde par... un acquittement à 380 voix contre 361 ! Vous êtes banni de France avec votre famille, mais vivants.</p>

            <p>Vous vous exilez en Suisse, puis en Angleterre. En 1815, après la chute de Napoléon, votre fils Louis XVII est rappelé et monte sur le trône. Vous rentrez à Paris, acclamé comme le "roi martyr qui a sauvé la France de la guerre civile".</p>

            <p>Vous mourez en 1824, entouré de vos petits-enfants, dans votre lit au château de Saint-Cloud.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F54A}️",
            title: "✨ EXCELLENTE FIN - L'Exil Sauveur ✨",
            text: "Votre alliance avec les Girondins vous a sauvé la vie. Certes, vous avez perdu votre trône temporairement, mais vous avez gagné bien plus : votre vie, votre famille, et la possibilité d'un retour triomphal. L'Histoire vous considère comme un roi sage qui sut choisir le compromis plutôt que l'affrontement.",
            stats: {
                "Survie": "OUI - mort naturelle à 69 ans",
                "Famille": "Toute sauvée",
                "Restauration": "1815 - Succès",
                "Jugement historique": "Très positif"
            }
        }
    },

    // === FIN HISTORIQUE : SILENCE AMBIGU ===
    // Le silence du roi mene a la tragedie complete de la famille royale
    silence_ambigu: {
        title: "Le Piège de l'Ambiguïté",
        icon: "\u{1F910}",
        date: "Hiver 1791-1792",
        text: `
            <p>Vous choisissez le silence. Ni condamnation, ni approbation de la Déclaration de Pillnitz. Cette ambiguïté calculée se retourne tragiquement contre vous.</p>

            <p>Les révolutionnaires radicaux y voient la preuve de votre duplicité. Les contre-révolutionnaires y voient de la lâcheté. Les modérés sont déçus. Vous déplaisez à tout le monde.</p>

            <p>La situation se détériore rapidement. En mars 1792, vous opposez votre veto à un décret contre les prêtres réfractaires. Nouvelle vague d'impopularité.</p>

            <p>En avril 1792, la guerre éclate. Les premières défaites sont attribuées à votre "trahison" présumée. Le 20 juin 1792, votre palais est envahi par une foule qui vous coiffe du bonnet phrygien. Humiliation suprême.</p>

            <p>Puis vient le terrible <strong>10 août 1792</strong>. Le palais des Tuileries est pris d'assaut. Le massacre des gardes suisses. Votre fuite vers l'Assemblée. Votre suspension.</p>

            <p>Emprisonné au Temple avec toute votre famille, vous subissez des conditions de détention de plus en plus dures. Votre fils est séparé de vous en juillet 1793 et confié au cordonnier Simon qui le maltraite.</p>

            <p>Le 21 janvier 1793, après votre exécution, commence le calvaire de Marie-Antoinette. Elle sera guillotinée le 16 octobre 1793.</p>

            <p>Votre fils Louis XVII meurt en prison le 8 juin 1795, à 10 ans, probablement de tuberculose et de mauvais traitements. Une fin atroce pour un enfant innocent.</p>

            <p>Seule votre fille Marie-Thérèse survivra, échangée contre des prisonniers en 1795. Elle vivra jusqu'en 1851, hantée par les souvenirs.</p>
        `,
        choices: [],
        ending: {
            type: "historical",
            icon: "⚰️",
            title: "\u{1F4DC} FIN HISTORIQUE COMPLÈTE - La Tragédie Royale \u{1F4DC}",
            text: "Vous avez suivi le parcours historique complet de la famille royale. Le silence et l'ambiguïté ont mené à la catastrophe totale : votre mort, celle de votre épouse, celle de votre fils. Cette trajectoire tragique fascine encore aujourd'hui historiens et romanciers. Étiez-vous victime des circonstances ou de vos propres erreurs ? Le débat reste ouvert.",
            stats: {
                "Louis XVI": "Exécuté le 21/01/1793",
                "Marie-Antoinette": "Exécutée le 16/10/1793",
                "Louis XVII": "Mort en prison le 08/06/1795",
                "Marie-Thérèse": "Seule survivante"
            }
        }
    },

    // === REFUGE A L'ASSEMBLEE ===
    // Le roi fuit vers l'Assemblee le 10 aout 1792
    refuge_assemblee: {
        title: "La Chute du Trône",
        icon: "\u{1F3DB}️",
        date: "10 Août 1792",
        text: `
            <p>"Messieurs, je viens chercher asile auprès de la Nation", déclarez-vous en entrant précipitamment dans la salle du Manège où siège l'Assemblée Législative.</p>

            <p>Vous êtes pâle, en sueur, Marie-Antoinette et vos enfants vous suivent. Les députés, stupéfaits, ne savent comment réagir. Vous venez d'abandonner votre palais sans combattre.</p>

            <p>Pendant que vous êtes assis dans la loge du "logographe" (le sténographe), séparé des députés par une grille comme un criminel, les Tuileries brûlent. Les gardes suisses qui n'ont pas reçu l'ordre de se rendre sont massacrés.</p>

            <p>L'Assemblée débat de votre sort pendant des heures. Finalement, elle vote votre <strong>suspension</strong>. Vous n'êtes plus roi, mais pas encore jugé. Un statut étrange, précaire.</p>

            <p>Vous êtes transféré à la prison du Temple. Les semaines deviennent des mois. Votre barbe pousse. Vous lisez beaucoup - Tacite, Hume, les Voyages de Cook. Vous jouez avec vos enfants. Une vie simple mais emprisonnée.</p>

            <p>Le 21 septembre 1792, la République est proclamée. Vous êtes désormais "Louis Capet", simple citoyen accusé.</p>

            <p>Votre procès commence le 11 décembre. Il y a peut-être encore une chance...</p>
        `,
        choices: [
            {
                text: "Plaider passionnément votre innocence",
                next: "defense_passionnee",
                icon: "\u{1F5E3}️",
                badge: "emotional",
                badgeText: "Émotionnel",
                effects: { trust: +15 }
            },
            {
                text: "Rester digne et silencieux",
                next: "dignite_silencieuse",
                icon: "\u{1F92B}",
                badge: "stoic",
                badgeText: "Stoïque",
                effects: { nobility: +20 }
            },
            {
                text: "Proposer d'abdiquer en faveur de votre fils",
                next: "abdication_desperate",
                icon: "\u{1F476}",
                badge: "sacrifice",
                badgeText: "Sacrifice",
                effects: { trust: +20, nobility: +15 }
            }
        ]
    },

    // === FIN : LE NEGOCIATEUR ===
    // Negociation courageuse depuis le balcon des Tuileries
    negociation_balcon: {
        title: "Le Courage du Désespoir",
        icon: "\u{1F5E3}️",
        date: "10 Août 1792, Matin",
        text: `
            <p>Vous sortez sur le balcon des Tuileries. En bas, une mer humaine de 20 000 insurgés armés. Des canons sont pointés vers le palais. Des piques se balancent comme une forêt de mort.</p>

            <p>"Citoyens !" criez-vous d'une voix forte qui surprend même vos ennemis. "Je suis votre roi ! Mais je suis aussi votre concitoyen ! Pourquoi ce bain de sang ?"</p>

            <p>Un silence incroyable tombe sur la foule. Personne ne s'attendait à vous voir vous adresser directement à eux.</p>

            <p>"Vous m'accusez de trahison ? Venez ! Envoyez une délégation ! Parlons ! Je suis prêt à tout accepter pour éviter que des Français tuent d'autres Français !"</p>

            <p>Ce courage inattendu déstabilise les meneurs. <strong>Danton</strong> lui-même, dans la foule, est impressionné. Des négociateurs montent au palais.</p>

            <p>Vous proposez un compromis audacieux : vous acceptez de <strong>suspendre vous-même vos pouvoirs</strong> pendant trois mois, le temps que l'Assemblée révise la Constitution. En échange, aucune violence.</p>

            <p>Après six heures de tractations tendues, l'accord est accepté ! Les Tuileries ne seront pas prises d'assaut. Pas de massacre des Suisses. Vous avez sauvé des centaines de vies.</p>

            <p>Cette journée du 10 août 1792 entre dans l'histoire comme "le jour où le roi négocia avec le peuple". Votre popularité remonte en flèche, même chez les sans-culottes.</p>

            <p>Pendant les trois mois suivants, une nouvelle Constitution est rédigée. Vous y participez activement. Le résultat : une monarchie parlementaire à l'anglaise.</p>

            <p>En novembre 1792, vous reprenez vos fonctions, mais dans un cadre strictement constitutionnel. Vous êtes devenu "Louis, Premier Serviteur de la Nation".</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F54A}️",
            title: "\u{1F3C6} EXCELLENTE FIN - Le Négociateur \u{1F3C6}",
            text: "Votre courage d'affronter seul une foule en armes a changé le cours de l'Histoire. En trois minutes sur un balcon, vous avez transformé une révolution sanglante en négociation pacifique. Ce moment héroïque est célébré pendant des décennies. Vous mourez en 1815, respecté par tous les camps, ayant réussi l'impossible : réconcilier monarchie et révolution.",
            stats: {
                "Vies sauvées le 10 août": "Plus de 2 000",
                "Popularité finale": "71%",
                "Règne total": "38 ans",
                "Surnom historique": "Louis le Négociateur"
            }
        }
    },

    // === FIN : PLAIDOYER PASSIONNE ===
    // Le roi plaide son innocence et obtient le bannissement
    defense_passionnee: {
        title: "Le Plaidoyer du Roi",
        icon: "\u{1F4AC}",
        date: "26 Décembre 1792",
        text: `
            <p>Vous vous levez devant les 749 députés de la Convention. Votre voix tremble au début, puis s'affermit :</p>

            <p>"Citoyens députés, on m'accuse de trahison. Moi ? Qui ai accepté la Constitution quand j'aurais pu résister ? Qui ai toujours cherché le bien du peuple, même maladroitement ?"</p>

            <p>"La fuite à Varennes ? Ce n'était pas une trahison, mais une recherche de sécurité pour ma famille ! J'ai vu ma femme insultée, mes enfants terrifiés ! Quel père n'aurait pas agi de même ?"</p>

            <p>"Le veto contre les décrets ? C'était mon droit constitutionnel ! Une Constitution que VOUS avez écrite, que VOUS m'avez fait jurer !"</p>

            <p>Vous parlez pendant deux heures. Certains députés pleurent. <strong>Thomas Paine</strong>, le révolutionnaire américain, prend la parole : "La France ne doit pas tuer son roi. Qu'elle le bannisse, mais qu'elle reste pure de ce sang !"</p>

            <p>Le vote est déchirant. Peine de mort : 361 voix pour, 360 contre. Une seule voix de différence...</p>

            <p>Mais un second vote est demandé : faut-il un sursis ? Cette fois, grâce à votre défense émouvante, 380 députés votent pour reporter l'exécution et organiser un référendum national !</p>

            <p>Ce délai sauve votre vie. Pendant les semaines suivantes, des pétitions affluent de toute la France. Beaucoup demandent votre exil plutôt que votre mort.</p>

            <p>Le 15 février 1793, la Convention vote finalement : <strong>bannissement à vie</strong>. Vous et votre famille êtes conduits à Bâle, en Suisse, sous escorte.</p>

            <p>Vous vivrez 22 ans en exil, assistant de loin aux convulsions de la France : la Terreur, le Directoire, Napoléon. Vous mourez en 1815 en Angleterre, le jour même où votre frère Louis XVIII rentre à Paris comme roi.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F30D}",
            title: "✨ BONNE FIN - L'Exil Honorable ✨",
            text: "Votre plaidoyer passionné a touché le cœur de suffisamment de députés pour sauver votre vie. Certes, vous mourrez en exil, loin de votre France bien-aimée, mais entouré de votre famille. Votre dignité face au procès vous vaut le respect posthume de l'Histoire. Des monuments seront érigés en votre honneur dès 1816.",
            stats: {
                "Survie": "OUI - 38 ans d'exil",
                "Famille": "Sauvée et unie",
                "Mort": "Naturelle en 1815",
                "Réhabilitation": "1816 par Louis XVIII"
            }
        }
    },

    // === FIN HISTORIQUE : MARTYR SILENCIEUX ===
    // Le roi refuse de plaider et meurt avec dignite
    dignite_silencieuse: {
        title: "Le Martyr Silencieux",
        icon: "⚖️",
        date: "Décembre 1792 - Janvier 1793",
        text: `
            <p>Vous refusez de plaider. Debout devant la Convention, vous dites simplement : "Je n'ai rien à ajouter à ma défense. Ma conscience est tranquille. L'Histoire jugera."</p>

            <p>Ce silence digne, presque hautain, impressionne mais ne vous aide pas. Les députés veulent des explications, des justifications. Votre mutisme leur semble du mépris.</p>

            <p>Le vote est sans appel : 387 voix pour la mort, 334 contre. Pas de sursis. Exécution immédiate.</p>

            <p>Mais étrangement, votre silence devient légendaire. Les royalistes en font un symbole de noblesse face à la barbarie. "Il était trop grand pour se défendre devant ses assassins", écriront-ils.</p>

            <p>La veille de votre exécution, vous écrivez une lettre magnifique à votre fils Louis XVII :</p>

            <div style="background: rgba(139, 0, 0, 0.1); padding: 20px; border-left: 4px solid var(--royal-red); margin: 20px 0; font-style: italic;">
                <p>"Mon fils, ne cherche jamais à venger ma mort. Pardonne à ceux qui me tuent. Le vrai courage n'est pas dans la vengeance, mais dans le pardon. Sois juste, bon, et tu seras plus grand que ton père ne l'a jamais été."</p>
            </div>

            <p>Le 21 janvier 1793, vous marchez vers l'échafaud avec une sérénité qui glace le sang de vos bourreaux. Pas de larmes, pas de tremblements. Vous êtes roi jusqu'au bout.</p>

            <p>Sur l'échafaud, vous tentez une dernière fois de parler, mais les tambours couvrent votre voix. La lame tombe à 10h22.</p>

            <p>Votre mort dans la dignité absolue marque les esprits pour des générations. Les artistes romantiques du XIXe siècle feront de vous un héros tragique. Votre statue sera érigée place de la Concorde en 1826.</p>
        `,
        choices: [],
        ending: {
            type: "historical",
            icon: "\u{1F451}",
            title: "\u{1F4DC} FIN HISTORIQUE NOBLE - Le Martyr Royal \u{1F4DC}",
            text: "Vous avez choisi la voie de la dignité silencieuse jusqu'à la mort. Cette attitude stoïque vous vaut une place particulière dans l'imaginaire collectif. Vous n'êtes pas le roi faible de l'historiographie républicaine, mais le martyr noble des romantiques. Votre dernière lettre à votre fils est encore enseignée dans les écoles au XIXe siècle comme modèle de noblesse d'âme.",
            stats: {
                "Mort": "21 janvier 1793, avec dignité",
                "Héritage littéraire": "Considérable",
                "Statues érigées": "12 en France (XIXe s.)",
                "Réputation posthume": "Réhabilitée"
            }
        }
    },

    // === FIN : ABDICATION DESESPEREE ===
    // Le roi abdique pour sauver ses enfants
    abdication_desperate: {
        title: "Le Sacrifice du Père",
        icon: "\u{1F468}‍\u{1F466}",
        date: "30 Décembre 1792",
        text: `
            <p>Devant la Convention stupéfaite, vous faites une annonce historique : "Citoyens, si c'est ma couronne qui vous pose problème, je l'abandonne. J'abdique solennellement en faveur de mon fils Louis-Charles."</p>

            <p>"Laissez-lui une chance ! Il n'a que 7 ans, il est innocent de tout. Élevez-le comme un enfant de la République. Faites de lui un roi-citoyen, un symbole de réconciliation !"</p>

            <p>"Quant à moi, bannissez-moi, emprisonnez-moi, je m'en remets à votre justice. Mais épargnez mon fils !"</p>

            <p>Cette proposition audacieuse divise profondément la Convention. Les modérés comme <strong>Condorcet</strong> y voient une solution géniale. Les radicaux comme <strong>Marat</strong> hurlent à la manipulation.</p>

            <p>Après trois jours de débats houleux, un compromis émerge : votre abdication est acceptée, mais votre fils ne règnera pas. La République est maintenue.</p>

            <p>En échange de votre abdication volontaire, vous obtenez :</p>
            <ul style="margin-left: 40px; margin-top: 15px;">
                <li>L'exil pour toute votre famille (pas d'exécution)</li>
                <li>Une pension annuelle</li>
                <li>La protection de vos biens personnels</li>
            </ul>

            <p>Le 15 janvier 1793, vous quittez la France avec Marie-Antoinette et vos enfants. Destination : Vienne, chez votre beau-frère l'empereur.</p>

            <p>Vous vivez 30 ans en exil, mais votre famille est unie et en sécurité. Votre fils Louis XVII grandit normalement, se marie, a des enfants. Vous devenez grand-père.</p>

            <p>En 1814, après la chute de Napoléon, votre fils est brièvement proposé pour le trône français, mais il décline. Il préfère une vie paisible en Autriche.</p>

            <p>Vous mourez en 1823 à Vienne, entouré de trois générations. Votre épitaphe : "Il préféra ses enfants à sa couronne."</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F49D}",
            title: "\u{1F3C6} MEILLEURE FIN FAMILIALE - L'Amour Paternel \u{1F3C6}",
            text: "Vous avez fait le choix le plus difficile mais le plus noble : sacrifier votre couronne pour sauver vos enfants. Cette abdication volontaire, unique dans l'histoire royale, vous vaut le respect même de vos ennemis. Vous perdez votre trône mais gagnez l'essentiel : voir grandir vos enfants, connaître vos petits-enfants, mourir entouré d'amour. L'Histoire vous célèbre comme 'Louis le Bon Père'.",
            stats: {
                "Famille": "Toute sauvée et réunie",
                "Petits-enfants": "7",
                "Années d'exil paisible": "30",
                "Jugement de l'Histoire": "Extrêmement positif"
            }
        }
    },

    // === FIN : EQUILIBRE DES POUVOIRS ===
    // Negociation dure aboutissant a une monarchie constitutionnelle a la francaise
    negociation_dure: {
        title: "L'Équilibre des Pouvoirs",
        icon: "⚖️",
        date: "Août - Novembre 1791",
        text: `
            <p>Les négociations avec l'Assemblée sont âpres. Vous ne cédez pas sur tout. Vous défendez fermement certaines prérogatives royales essentielles.</p>

            <p>Après trois mois de tractations intenses, une nouvelle Constitution est signée, plus équilibrée que celle prévue initialement :</p>

            <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-left: 4px solid var(--gold); margin: 20px 0;">
                <h4 style="color: var(--royal-red); margin-bottom: 10px;">\u{1F3DB}️ Constitution de Novembre 1791</h4>
                <ul style="margin-left: 20px;">
                    <li><strong>Le Roi</strong> nomme les ministres (avec accord de l'Assemblée)</li>
                    <li><strong>Le Roi</strong> commande les armées en temps de guerre</li>
                    <li><strong>Le Roi</strong> dispose d'un veto absolu sur les lois militaires</li>
                    <li><strong>L'Assemblée</strong> vote les lois et le budget</li>
                    <li><strong>L'Assemblée</strong> peut renverser les ministres</li>
                    <li><strong>Suffrage censitaire</strong> élargi (plus de citoyens actifs)</li>
                </ul>
            </div>

            <p>Ce système, inspiré du modèle britannique, fonctionne étonnamment bien. Vous formez un gouvernement avec des ministres modérés acceptables pour les deux camps.</p>

            <p>En 1792, quand la guerre éclate, votre rôle de chef des armées vous donne une légitimité nouvelle. Vous nommez des généraux compétents, supervisez la stratégie.</p>

            <p>La victoire de Valmy (20 septembre 1792) est autant votre victoire que celle de la République. Les soldats crient "Vive le Roi !" autant que "Vive la Nation !"</p>

            <p>Les années suivantes consolidident ce régime hybride. Ce n'est ni l'absolutisme d'avant, ni la république totale. C'est un <strong>compromis à la française</strong>.</p>

            <p>En 1804, quand Napoléon se proclame empereur dans notre chronologie, ici c'est vous qui régniez toujours, mais dans un cadre strictement constitutionnel.</p>

            <p>Vous mourez en 1815, après 41 ans de règne. Votre fils Louis XVII hérite d'une monarchie forte mais limitée, stable et respectée.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "⚖️",
            title: "\u{1F3C6} EXCELLENTE FIN - Le Roi Constitutionnel \u{1F3C6}",
            text: "Vous avez réussi le chef-d'œuvre politique : créer une véritable monarchie constitutionnelle à la française, ni absolutiste ni républicaine. Ce système, que vous avez patiemment négocié, survit à votre mort et devient un modèle pour l'Europe. Les historiens parlent du 'miracle français' : une révolution qui s'achève par la réconciliation. Vous êtes célébré comme 'Louis l'Équitable'.",
            stats: {
                "Règne total": "41 ans",
                "Stabilité": "Exceptionnelle",
                "Modèle politique": "Exporté en Europe",
                "Surnom": "Louis l'Équitable"
            }
        }
    },

    // === BRANCHE FUITE SOLITAIRE ===
    // Le roi part seul, deguise en pretre
    fuite_seul: {
        title: "La Fuite Solitaire",
        icon: "\u{1F3AD}",
        date: "21 Juin 1791, 3h du matin",
        text: `
            <p>Vous prenez la décision la plus déchirante de votre vie : partir <strong>seul</strong>. Marie-Antoinette pleure en silence quand vous lui annoncez. "Je reviendrai vous chercher, je le jure", promettez-vous en serrant vos enfants endormis une dernière fois.</p>

            <p>Déguisé en <strong>prêtre constitutionnel</strong> avec une soutane noire et un chapeau à larges bords, vous quittez les Tuileries par un passage de service. Votre cœur se brise à chaque pas qui vous éloigne de vos enfants.</p>

            <p>Sans la lourde berline, sans les arrêts multiples pour la famille, vous progressez rapidement à cheval. À l'aube, vous êtes déjà à <strong>Meaux</strong>, bien plus loin que vous ne l'auriez été avec toute votre suite.</p>

            <p>Mais Paris se réveille. Votre absence sera bientôt découverte. Les cloches sonneront, les cavaliers seront lancés à vos trousses. Chaque minute compte.</p>

            <p>À un carrefour battu par le vent, trois routes s'offrent à vous. Le nord vers les <strong>Pays-Bas autrichiens</strong>, l'ouest vers la <strong>Normandie</strong> et ses ports, ou le sud vers l'<strong>Espagne</strong> de votre cousin Charles IV.</p>
        `,
        choices: [
            {
                text: "Galoper vers le nord et les Pays-Bas autrichiens",
                next: "fuite_seul_nord",
                icon: "\u{1F3D4}️",
                badge: "risky",
                badgeText: "Risqué",
                effects: { trust: -15, nobility: +5 }
            },
            {
                text: "Filer vers la Normandie pour embarquer vers l'Angleterre",
                next: "fuite_seul_mer",
                icon: "⛵",
                badge: "risky",
                badgeText: "Audacieux",
                effects: { trust: -10, nobility: -5 }
            },
            {
                text: "Prendre la route du sud vers l'Espagne",
                next: "fuite_seul_espagne",
                icon: "☀️",
                badge: "dangerous",
                badgeText: "Long Voyage",
                effects: { trust: -20, nobility: +10 }
            }
        ]
    },

    // === FIN : LE ROI DESERTEUR ===
    // Arrete a la frontiere des Pays-Bas
    fuite_seul_nord: {
        title: "La Frontière si Proche",
        icon: "\u{1F3D4}️",
        date: "23 Juin 1791",
        text: `
            <p>Vous galopez vers le nord, traversant la Picardie sous une pluie battante. Votre déguisement de prêtre tient bon — les rares voyageurs que vous croisez vous saluent respectueusement.</p>

            <p>Après deux jours de chevauchée épuisante, vous apercevez enfin la frontière des <strong>Pays-Bas autrichiens</strong>. La liberté est à portée de main !</p>

            <p>Mais au poste-frontière de <strong>Bavay</strong>, un officier de douane vous dévisage. "Votre passeport, mon père." Vous tendez le faux document d'une main tremblante. L'homme le retourne, le scrute...</p>

            <p>"Ce cachet est contrefait. Arrêtez cet homme !" Vous tentez de fuir, mais des gardes nationaux vous encerclent. En quelques heures, votre identité est confirmée.</p>

            <p>La nouvelle de votre fuite <strong>solitaire</strong> scandalise toute la France. Vous avez abandonné votre femme et vos enfants ! Les pamphétaires se déchaînent : "Le roi lâche qui fuit sans sa famille !" Même vos partisans les plus fidèles sont consternés.</p>

            <p>Marie-Antoinette, restée aux Tuileries, est arrêtée et interrogée brutalement. Vos enfants sont séparés d'elle. Le retour à Paris est un calvaire — la foule vous crache dessus avec une violence inouïe.</p>

            <p>Votre procès est expéditif. Le 15 décembre 1791, vous êtes condamné à mort pour haute trahison et abandon de poste. L'Europe entière est choquée par la rapidité de la justice révolutionnaire.</p>
        `,
        choices: [],
        ending: {
            type: "bad",
            icon: "\u{1F480}",
            title: "☠️ FIN TRAGIQUE - Le Roi Déserteur ☠️",
            text: "Votre fuite solitaire restera comme l'acte le plus déshonorant d'un roi de France. En abandonnant votre famille, vous avez perdu toute sympathie, même celle des monarchistes. L'Histoire vous juge avec une sévérité absolue : un roi qui fuit seul n'est plus un roi. Votre nom devient synonyme de lâcheté.",
            stats: {
                "Réputation": "Catastrophique",
                "Famille": "Séparée et maltraitée",
                "Jugement": "Unanime contre vous",
                "Mémoire historique": "Infâme"
            }
        }
    },

    // === CHOIX EN NORMANDIE ===
    // Le roi hesite a embarquer pour l'Angleterre
    fuite_seul_mer: {
        title: "Les Falaises de Normandie",
        icon: "⛵",
        date: "25 Juin 1791",
        text: `
            <p>Vous filez vers l'ouest, traversant le Vexin puis la Normandie. Les paysages verdoyants défilent, mais votre esprit est torturé par l'image de vos enfants abandonnés.</p>

            <p>Après quatre jours de voyage, vous atteignez <strong>Honfleur</strong>. Un capitaine anglais, <strong>James Crawford</strong>, accepte de vous embarquer pour Portsmouth — contre une somme considérable.</p>

            <p>Alors que le navire s'apprête à lever l'ancre, vous apercevez sur le quai un garçon qui ressemble à votre fils Louis-Charles. Les larmes brouillent votre vue. Êtes-vous vraiment prêt à traverser la Manche et abandonner votre famille au sort que la Révolution leur réserve ?</p>

            <p>Le capitaine s'impatiente : "Now or never, Monsieur !" La marée n'attend pas.</p>
        `,
        choices: [
            {
                text: "Monter à bord et gagner l'Angleterre",
                next: "exil_solitaire",
                icon: "\u{1F6A2}",
                badge: "dangerous",
                badgeText: "Abandon",
                effects: { trust: -30, nobility: -20 }
            },
            {
                text: "Renoncer et retourner à Paris auprès de votre famille",
                next: "retour_remords",
                icon: "❤️",
                badge: "peaceful",
                badgeText: "Courage",
                effects: { trust: +20, nobility: +5 }
            }
        ]
    },

    // === FIN : EXIL SOLITAIRE ===
    // Le roi fuit en Angleterre et perd sa famille
    exil_solitaire: {
        title: "Le Roi Sans Couronne ni Famille",
        icon: "\u{1F327}️",
        date: "1791 - 1793",
        text: `
            <p>Vous montez à bord. Le navire quitte le port d'Honfleur dans la brume du matin. La côte française s'efface lentement. Vous ne la reverrez jamais.</p>

            <p>En Angleterre, le roi George III vous accueille avec une courtoisie glaciale. On vous installe dans un modeste manoir du Surrey. Vous êtes libre, mais prisonnier de votre conscience.</p>

            <p>Les nouvelles de France arrivent avec des semaines de retard, chacune plus terrible que la précédente. Marie-Antoinette est transférée à la Conciergerie. Vos enfants sont confiés au cordonnier Simon. La Convention vous condamne à mort <strong>par contumace</strong>.</p>

            <p>Le 16 octobre 1793, vous apprenez l'exécution de Marie-Antoinette. Vous vous effondrez. Pendant des mois, vous ne quittez plus votre chambre. Vos hôtes anglais vous entendent pleurer la nuit.</p>

            <p>Votre fils Louis XVII meurt en prison le 8 juin 1795. Il avait 10 ans. Vous n'avez même pas pu lui tenir la main.</p>

            <p>Vous vivez encore vingt ans dans une mélancolie noire. Chaque matin, vous vous demandez si tout aurait été différent si vous étiez resté. Vous mourez en 1811, seul, brisé, dans un pays qui n'est pas le vôtre.</p>
        `,
        choices: [],
        ending: {
            type: "bad",
            icon: "\u{1F327}️",
            title: "☠️ FIN TRAGIQUE - L'Exil des Remords ☠️",
            text: "Vous avez sauvé votre vie mais perdu votre âme. La culpabilité d'avoir abandonné votre famille vous hante jusqu'à votre dernier souffle. L'Histoire ne retient de vous qu'un roi lâche qui a choisi sa survie plutôt que ses devoirs de père et d'époux. Votre fille Marie-Thérèse, seule survivante, refusera de vous voir lors de son exil en Angleterre.",
            stats: {
                "Survie personnelle": "Oui, mais à quel prix",
                "Famille": "Détruite",
                "Marie-Antoinette": "Exécutée le 16/10/1793",
                "Louis XVII": "Mort en prison à 10 ans"
            }
        }
    },

    // === FIN : LE ROI HUMAIN ===
    // Retour volontaire a Paris avec confession publique
    retour_remords: {
        title: "Le Retour du Roi Repenti",
        icon: "❤️",
        date: "30 Juin 1791",
        text: `
            <p>"Non. Arrêtez !" criez-vous au capitaine Crawford. "Je ne pars pas. Je ne peux pas." Vous redescendez la passerelle d'un pas décidé, laissant le marin anglais stupéfait.</p>

            <p>Le voyage de retour vers Paris est le plus long de votre vie. À chaque lieue, vous préparez mentalement ce que vous allez dire. Pas de mensonge. Pas d'excuse. La vérité.</p>

            <p>Le 30 juin, vous vous présentez devant l'Assemblée Nationale. Le silence est absolu. Vous prenez la parole d'une voix tremblante mais sincère :</p>

            <p><em>"Messieurs les députés, j'ai fui. J'ai eu peur, j'ai été lâche. J'ai même failli quitter la France. Mais je suis revenu. De mon plein gré. Parce que ma place est ici, auprès de mon peuple et de ma famille. Je vous demande pardon."</em></p>

            <p>Cet aveu d'une sincérité désarmante provoque un effet extraordinaire. Des députés pleurent. Même <strong>Robespierre</strong> reste silencieux, visiblement troublé. <strong>Mirabeau</strong> se lève : "Voilà enfin un roi humain !"</p>

            <p>Votre retour volontaire et votre confession publique vous valent une vague de sympathie inattendue. Le peuple, qui vous haïssait il y a dix jours, est touché par votre honnêteté. "Un roi qui avoue sa faiblesse est plus courageux que celui qui cache ses défauts."</p>

            <p>Les mois suivants, vous travaillez avec acharnement à prouver votre bonne foi. Vous acceptez la Constitution, participez aux fêtes patriotiques, visitez les hôpitaux. Votre transformation est sincère.</p>

            <p>En 1795, après des années turbulentes mais sans violence majeure, une Constitution équilibrée est adoptée. Vous régnez comme roi constitutionnel, aimé pour votre humanité plus que pour votre couronne.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "❤️",
            title: "\u{1F3C6} BONNE FIN - Le Roi Humain \u{1F3C6}",
            text: "Votre aveu de faiblesse est devenu votre plus grande force. En reconnaissant publiquement votre peur et votre lâcheté, vous avez accompli ce qu'aucun roi n'avait fait avant vous : montrer que vous étiez humain. Ce courage paradoxal vous a valu l'amour du peuple et le respect de l'Histoire. On vous surnomme 'Louis le Sincère'.",
            stats: {
                "Popularité finale": "74%",
                "Famille": "Réunie et en sécurité",
                "Innovation politique": "L'aveu royal public",
                "Surnom": "Louis le Sincère"
            }
        }
    },

    // === FIN : EXIL ESPAGNOL ===
    // Le roi traverse la France et s'exile en Espagne
    fuite_seul_espagne: {
        title: "Par-delà les Pyrénées",
        icon: "☀️",
        date: "Juillet 1791",
        text: `
            <p>Vous prenez la route du sud, la plus longue mais peut-être la plus sûre. Personne ne vous cherchera dans cette direction — tous les regards sont tournés vers le nord et l'Autriche.</p>

            <p>Pendant deux semaines, vous traversez la France sous votre déguisement de prêtre. L'Orléanais, le Berry, le Limousin, le Quercy... Vous dormez dans des auberges modestes, mangez avec des paysans. Pour la première fois de votre vie, vous découvrez la vraie France.</p>

            <p>Cette expérience vous transforme profondément. Vous voyez la misère, la faim, mais aussi la générosité et la dignité des gens simples. Vous comprenez enfin pourquoi ils se sont révoltés.</p>

            <p>Mi-juillet, vous franchissez les <strong>Pyrénées</strong> par le col de Roncevaux. En Espagne, votre cousin <strong>Charles IV</strong> vous accueille avec faste mais embarras. Un roi déchu est un hôte encombrant.</p>

            <p>Depuis Madrid, vous écrivez une lettre à l'Assemblée Nationale, publiée dans toute la France : <em>"J'ai quitté la France non par trahison, mais par peur. J'ai vu mon peuple tel qu'il est vraiment. Je comprends ses souffrances. Je renonce à mes droits et je prie pour que la France trouve la paix sans moi."</em></p>

            <p>Cette abdication-confession depuis l'exil émeut l'opinion. La République est proclamée sans violence. Votre famille est autorisée à vous rejoindre en Espagne en 1792.</p>

            <p>Vous vivez modestement près de Barcelone, jardinant, lisant, élevant vos enfants. Vous mourez en 1810, apaisé, réconcilié avec vous-même.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "☀️",
            title: "✨ FIN DOUCE-AMÈRE - L'Exil Espagnol ✨",
            text: "Votre longue traversée de la France vous a ouvert les yeux sur la réalité de votre peuple. Cette prise de conscience tardive, exprimée dans votre lettre d'abdication, vous vaut une place singulière dans l'Histoire : celle du roi qui comprit trop tard, mais qui eut l'honnêteté de l'admettre. Votre famille est sauve, votre conscience apaisée.",
            stats: {
                "Famille": "Réunie en Espagne",
                "Héritage": "Lettre d'abdication célèbre",
                "Années de paix": "19",
                "Jugement historique": "Nuancé mais positif"
            }
        }
    },

    // === BRANCHE REFUS DE COLLABORATION ===
    // Le roi refuse tout compromis apres Varennes
    refus_collaboration: {
        title: "Le Roi Intransigeant",
        icon: "\u{1F6AB}",
        date: "Automne 1791",
        text: `
            <p>De retour à Paris après Varennes, vous refusez catégoriquement tout compromis. "Je suis roi par la grâce de Dieu, pas par la volonté d'une assemblée de factieux !" déclarez-vous en privé à vos conseillers.</p>

            <p>Publiquement, vous maintenez un silence glacial. Vous refusez de signer les décrets, d'assister aux séances de l'Assemblée, de recevoir les délégations. Les Tuileries deviennent une forteresse silencieuse.</p>

            <p>En secret, vous entretenez une correspondance chiffrée avec votre beau-frère l'empereur d'Autriche et avec les princes émigrés à Coblence. Vous préparez la contre-révolution depuis votre prison dorée.</p>

            <p>Marie-Antoinette, plus déterminée que vous encore, orchestre les échanges diplomatiques via des intermédiaires fidèles. Le <strong>chevalier de Jarjayes</strong> fait la navette entre Paris et Vienne.</p>

            <p>Mais les murs ont des oreilles. Les espions de la Commune surveillent chacun de vos gestes...</p>
        `,
        choices: [
            {
                text: "Continuer la correspondance secrète avec l'Autriche",
                next: "armoire_fer",
                icon: "✉️",
                badge: "dangerous",
                badgeText: "Très Dangereux",
                effects: { trust: -30, nobility: +10 }
            },
            {
                text: "Adopter une résistance passive et silencieuse",
                next: "resistance_passive",
                icon: "✊",
                badge: "risky",
                badgeText: "Résistance",
                effects: { trust: -10, nobility: +15 }
            }
        ]
    },

    // === FIN : L'ARMOIRE DE FER ===
    // Decouverte de la correspondance secrete avec l'Autriche
    armoire_fer: {
        title: "L'Armoire de Fer",
        icon: "\u{1F512}",
        date: "20 Novembre 1792",
        text: `
            <p>Pendant des mois, votre correspondance secrète avec Vienne s'intensifie. Vous avez fait aménager dans un mur des Tuileries une <strong>armoire de fer</strong> dissimulée derrière un panneau de boiserie, où vous conservez vos lettres les plus compromettantes.</p>

            <p>Mais le serrurier <strong>François Gamain</strong>, qui a construit cette cache, vous trahit. Rongé par les remords — ou motivé par la récompense —, il révèle son existence au ministre de l'Intérieur <strong>Roland</strong>.</p>

            <p>Le 20 novembre 1792, Roland ouvre l'armoire devant des témoins. Le contenu est accablant : des centaines de lettres prouvant vos contacts avec l'ennemi autrichien, des plans d'invasion, des promesses de rétablir l'Ancien Régime, des paiements à des agents doubles...</p>

            <p>La Convention explose de rage. Même vos derniers défenseurs vous abandonnent. <strong>Vergniaud</strong>, le girondin modéré, déclare : "Les preuves sont irréfutables. Le roi conspirait contre la Nation."</p>

            <p>Votre procès est une formalité. Le 15 décembre 1792, vous êtes condamné à mort par 693 voix contre 56. Aucun sursis. L'armoire de fer a scellé votre destin.</p>

            <p>Le 21 janvier 1793, vous montez sur l'échafaud. Vos dernières paroles sont couvertes par les tambours, comme dans l'Histoire réelle. Mais cette fois, personne ne pleure.</p>
        `,
        choices: [],
        ending: {
            type: "bad",
            icon: "\u{1F512}",
            title: "☠️ FIN TRAGIQUE - L'Armoire de Fer ☠️",
            text: "L'armoire de fer est un événement historique réel (découverte le 20 novembre 1792). Vos lettres secrètes, preuves irréfutables de votre double jeu, ont transformé votre procès en simple formalité. L'Histoire retient la leçon : même les secrets les mieux gardés finissent par être découverts. Votre correspondance avec l'ennemi reste l'une des plus grandes erreurs politiques de l'histoire de France.",
            stats: {
                "Lettres compromettantes": "Plus de 300",
                "Vote de mort": "693 contre 56",
                "Défenseurs restants": "Aucun",
                "Leçon historique": "Ne jamais écrire ce qu'on ne peut assumer"
            }
        }
    },

    // === RESISTANCE PASSIVE ===
    // Le roi oppose son veto a tout sans correspondance compromettante
    resistance_passive: {
        title: "Le Roi qui dit Non",
        icon: "✊",
        date: "1791 - 1792",
        text: `
            <p>Vous choisissez la voie de la résistance silencieuse. Sans correspondance compromettante, sans complot visible, vous opposez simplement votre <strong>veto</strong> à tout. Chaque décret, chaque loi, chaque mesure — vous refusez de signer.</p>

            <p>"Monsieur Veto" devient votre surnom dans tout Paris. Les sans-culottes chantent des chansons moqueuses. Mais personne ne peut vous accuser de trahison — vous exercez un droit constitutionnel.</p>

            <p>Les mois passent. La situation se tend. Le 20 juin 1792, une foule envahit les Tuileries et vous coiffe de force du bonnet phrygien. Vous le gardez trois heures sans broncher, sans un mot, avec une dignité qui impressionne même vos ennemis.</p>

            <p>En septembre 1792, après la chute du trône, vous êtes emprisonné au Temple. Mais contrairement au parcours historique, l'absence de preuves de trahison joue en votre faveur lors du procès.</p>

            <p>Au Temple, vous tombez gravement malade — une pneumonie aggravée par l'humidité de la prison. Votre état alarme même vos geôliers. Le médecin de la prison prévient la Convention : "Si le roi meurt en prison, la France sera accusée d'assassinat."</p>
        `,
        choices: [
            {
                text: "Profiter de la maladie pour négocier votre exil",
                next: "negociation_maladie",
                icon: "\u{1F912}",
                badge: "peaceful",
                badgeText: "Stratégique",
                effects: { trust: +10, nobility: +5 }
            },
            {
                text: "Refuser tout compromis, même malade",
                next: "martyr_silencieux_bis",
                icon: "\u{1F451}",
                badge: "historical",
                badgeText: "Inflexible",
                effects: { trust: -5, nobility: +20 }
            }
        ]
    },

    // === FIN : L'HORLOGER DE PHILADELPHIE ===
    // Exil en Amerique et nouvelle vie comme horloger
    negociation_maladie: {
        title: "La Diplomatie de la Fièvre",
        icon: "\u{1F912}",
        date: "Janvier 1793",
        text: `
            <p>Depuis votre lit de malade au Temple, vous faites passer un message à la Convention par l'intermédiaire de votre médecin : vous acceptez d'abdiquer définitivement et de quitter la France, à condition que votre famille soit épargnée.</p>

            <p>Le timing est parfait. La Convention est divisée sur votre sort. Les Girondins cherchent une alternative à l'exécution qui ne les fasse pas passer pour des faibles. Votre maladie offre une porte de sortie.</p>

            <p><strong>Thomas Paine</strong>, le révolutionnaire américain, plaide pour votre exil : "L'Amérique doit son indépendance à Louis XVI ! Bannissez-le en Amérique, ce sera la plus belle des ironies !"</p>

            <p>Le vote est serré : 401 voix pour l'exil, 348 pour la mort. Vous êtes sauvé de justesse.</p>

            <p>Le 20 février 1793, encore affaibli, vous embarquez avec votre famille au Havre sur un navire américain. Destination : <strong>Philadelphie</strong>.</p>

            <p>En Amérique, vous vous réinventez. Vous devenez horloger — votre passion de toujours. Votre boutique sur Chestnut Street est connue de tout Philadelphie. George Washington vous rend visite. Thomas Jefferson débat philosophie avec vous.</p>

            <p>Vous mourez en 1815 à Philadelphie, citoyen américain respecté, entouré de votre famille. Sur votre tombe : "Louis Capet, horloger de Philadelphie, ancien roi de France."</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F1FA}\u{1F1F8}",
            title: "\u{1F3C6} FIN SURPRENANTE - L'Horloger de Philadelphie \u{1F3C6}",
            text: "Votre exil américain est la plus inattendue des fins. D'un roi absolu à un artisan horloger dans la jeune démocratie américaine — votre trajectoire fascine les romanciers pendant des siècles. Vous avez trouvé la paix dans la simplicité, prouvant que votre vraie passion n'a jamais été le pouvoir mais la mécanique de précision.",
            stats: {
                "Nouvelle carrière": "Horloger réputé",
                "Famille": "Sauve et heureuse",
                "Amis américains": "Washington, Jefferson, Paine",
                "Épitaphe": "Horloger de Philadelphie"
            }
        }
    },

    // === FIN HISTORIQUE ALT : L'INFLEXIBLE ===
    // Le roi refuse tout compromis meme malade et meurt stoiquement
    martyr_silencieux_bis: {
        title: "L'Inflexible",
        icon: "\u{1F451}",
        date: "Février 1793",
        text: `
            <p>Même au seuil de la mort, vous refusez de négocier. "Un roi ne marchande pas sa couronne", murmurerez-vous à Marie-Antoinette depuis votre lit de souffrance.</p>

            <p>Miraculeusement, vous survivez à la pneumonie. Mais votre intransigeance a exaspéré la Convention. Le 15 février 1793, le vote tombe : mort, par 378 voix contre 362.</p>

            <p>Votre exécution, le 21 février 1793, est marquée par votre stoïcisme absolu. Pas une larme, pas un tremblement. Vous refusez même qu'on vous bande les yeux. Votre regard fixe la foule jusqu'au dernier instant.</p>

            <p>Cette mort dans une dignité absolue marque profondément l'imaginaire collectif. Les poètes romantiques du XIXe siècle en feront un symbole de noblesse face à la barbarie.</p>

            <p><strong>Chateaubriand</strong> écrira : "Il mourut comme il avait résisté : en silence, debout, royal."</p>
        `,
        choices: [],
        ending: {
            type: "historical",
            icon: "\u{1F451}",
            title: "\u{1F4DC} FIN HISTORIQUE ALTERNATIVE - Le Roi Inflexible \u{1F4DC}",
            text: "Votre résistance passive suivie de votre mort stoïque crée un puissant mythe royaliste. Contrairement au Louis XVI historique qu'on accuse parfois de faiblesse, cette version inflexible et silencieuse de vous-même inspire le mouvement légitimiste pendant tout le XIXe siècle. Votre silence est devenu plus éloquent que tous les discours.",
            stats: {
                "Résistance": "18 mois sans compromis",
                "Vote de mort": "378 contre 362",
                "Derniers mots": "Aucun — le silence royal",
                "Postérité": "Mythe romantique puissant"
            }
        }
    },

    // === FIN : ABDICATION PRECOCE ===
    // Le roi abdique avant le 10 aout pour eviter le bain de sang
    abdication_precoce: {
        title: "L'Abdication Préventive",
        icon: "\u{1F451}",
        date: "Juillet 1792",
        text: `
            <p>Vous sentez le vent tourner. Les nouvelles du front sont mauvaises, le manifeste de Brunswick a déchaîné la fureur populaire, et vos espions vous avertissent qu'une insurrection se prépare pour le 10 août.</p>

            <p>Le 8 août 1792, deux jours avant l'assaut prévu, vous prenez tout le monde de court. Vous convoquez l'Assemblée Législative et déclarez solennellement :</p>

            <p><em>"Messieurs les députés, je vois la tempête qui se prépare. Plutôt que de voir couler le sang français — celui de mes gardes comme celui du peuple — j'abdique. Je dépose ma couronne entre vos mains. Je demande seulement la sécurité pour ma famille et le droit de vivre en paix dans notre pays."</em></p>

            <p>La stupéfaction est totale. Les députés s'attendaient à un affrontement, pas à une reddition. Les meneurs de l'insurrection prévue, <strong>Danton</strong> et <strong>Santerre</strong>, sont pris de court. On ne peut pas attaquer un roi qui a déjà déposé les armes.</p>

            <p>Le 10 août se passe sans violence. Pas de massacre des Suisses. Pas de prise des Tuileries. Pas de bain de sang. Votre abdication a sauvé des milliers de vies.</p>

            <p>La République est proclamée dans le calme. Vous et votre famille êtes assignés à résidence au château de <strong>Amboise</strong>, loin de l'agitation parisienne. Les conditions sont correctes — vous avez un jardin, vos livres, vos enfants.</p>

            <p>En 1814, après la chute de Napoléon, votre fils Louis XVII — devenu un jeune homme cultivé et modéré — est proposé pour le trône. Il accepte, instaurant une monarchie parlementaire moderne.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F54A}️",
            title: "\u{1F3C6} EXCELLENTE FIN - L'Abdication Salvatrice \u{1F3C6}",
            text: "Votre abdication préventive est un acte de courage politique extraordinaire. En renonçant au pouvoir avant le bain de sang, vous avez sauvé des milliers de vies et préservé la possibilité d'une restauration future. L'Histoire vous célèbre comme le roi qui sut partir au bon moment. Votre fils règne avec sagesse.",
            stats: {
                "Vies sauvées": "Plus de 3 000 (dont 950 Suisses)",
                "Famille": "En sécurité à Amboise",
                "Restauration": "1814 - Louis XVII roi",
                "Surnom": "Louis le Sage"
            }
        }
    },

    // === FIN : LE ROI A GENOUX ===
    // Le roi ordonne le cessez-le-feu et s'agenouille devant le peuple
    cessez_le_feu: {
        title: "L'Ordre Impossible",
        icon: "\u{1F54A}️",
        date: "10 Août 1792, 10h du matin",
        text: `
            <p>Au milieu du fracas des armes, des cris et de la fumée, vous vous précipitez vers le balcon intérieur des Tuileries et hurlez : <strong>"CESSEZ LE FEU ! AU NOM DU ROI, CESSEZ LE FEU !"</strong></p>

            <p>Les gardes suisses, disciplinés jusqu'à la mort, obéissent instantanément. Ils baissent leurs armes. Le silence qui s'ensuit est assourdissant — rompu seulement par les gémissements des blessés des deux camps.</p>

            <p>La foule des insurgés, surprise par ce cessez-le-feu, hésite. Certains veulent continuer l'assaut, mais <strong>Westermann</strong>, un des meneurs, lève la main : "Le roi a parlé ! Qu'on le laisse parler !"</p>

            <p>Vous descendez dans la cour, seul, sans arme, sans escorte. Face à 20 000 insurgés armés de piques et de fusils. C'est l'acte le plus courageux de votre vie.</p>

            <p>"Citoyens, regardez autour de vous. Des Français sont morts. Tués par d'autres Français. Est-ce cela que vous voulez ? Moi, je refuse. Je préfère perdre ma couronne que de voir un seul Français de plus mourir pour elle."</p>

            <p>Vous retirez symboliquement votre épée et la posez au sol. Puis vous vous agenouillez.</p>

            <p>Un roi de France, à genoux devant son peuple. L'image est si puissante qu'elle sera gravée, peinte, et racontée pendant des générations.</p>

            <p>Danton, ému malgré lui, négocie un accord : vous vous rendez à l'Assemblée. Pas de violence. Votre sort sera décidé par la loi, pas par la rue.</p>
        `,
        choices: [],
        ending: {
            type: "good",
            icon: "\u{1F54A}️",
            title: "\u{1F3C6} BONNE FIN - Le Roi à Genoux \u{1F3C6}",
            text: "Votre geste d'agenouillage devant le peuple en armes est l'un des moments les plus dramatiques de l'histoire de France. En choisissant l'humilité plutôt que la force, vous avez évité le massacre du 10 août. Les Suisses survivent, les insurgés rentrent chez eux. Votre procès, en décembre 1792, se conclut par un bannissement plutôt qu'une exécution. Vous mourez en exil en 1820, mais votre image du roi à genoux reste gravée dans la mémoire collective.",
            stats: {
                "Vies sauvées le 10 août": "Plus de 1 500",
                "Image historique": "Le roi agenouillé",
                "Verdict": "Bannissement, pas la mort",
                "Héritage": "Symbole d'humilité royale"
            }
        }
    }
};
