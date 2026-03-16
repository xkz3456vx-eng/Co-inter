// Variables globales
        let gameState = {
            trust: 50,
            nobility: 70,
            currentChapter: 'start',
            chapterNumber: 0,
            soundEnabled: true,
            decisionsCount: 0,
            historicalPath: false
        };

        // Données du jeu (structure complète des chapitres)
        const chapters = {
            start: {
                title: "Le Roi Prisonnier",
                icon: "📖",
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
                        icon: "🌙",
                        badge: "historical",
                        badgeText: "Parcours Historique",
                        effects: { trust: -20, nobility: +10 }
                    },
                    {
                        text: "Rester et négocier de bonne foi avec l'Assemblée Nationale",
                        next: "negociation",
                        icon: "🕊️",
                        badge: "peaceful",
                        badgeText: "Voie Pacifique",
                        effects: { trust: +15, nobility: -15 }
                    },
                    {
                        text: "Partir seul, incognito, pour revenir avec une armée étrangère",
                        next: "fuite_seul",
                        icon: "🎭",
                        badge: "risky",
                        badgeText: "Très Risqué",
                        effects: { trust: -30, nobility: +20 }
                    }
                ]
            },

            fuite_seul: {
                title: "Le Roi en Cavale",
                icon: "🎭",
                date: "21 Juin 1791",
                text: `
                    <p>Vous choisissez la fuite solitaire. Sous un déguisement sommaire, vous quittez Paris avant l'aube, laissant Marie-Antoinette et vos enfants derrière vous. Vous gagnez quelques heures de liberté, mais au prix d'une image désastreuse : celle d'un roi qui abandonne les siens.</p>
                    
                    <p>Très vite, la rumeur enfle. Dans les clubs révolutionnaires, on parle d'une désertion. Chez les royalistes, on s'interroge sur votre courage. Aux yeux de tous, la monarchie semble vaciller encore davantage.</p>
                    
                    <p>À mesure que vous progressez vers l'Est, des officiers fidèles vous proposent trois stratégies. Rejoindre les cours étrangères et préparer la guerre. Gagner Montmédy pour négocier en position de force. Ou revenir devant l'Assemblée pour tenter une réconciliation de dernière minute.</p>
                    
                    <p>Vous êtes seul, sans faste, sans escorte, sans filet. Pour la première fois de votre vie, le destin du royaume repose uniquement sur votre décision personnelle.</p>
                `,
                choices: [
                    {
                        text: "Rejoindre les cours étrangères et préparer une intervention armée",
                        next: "appel_etranger",
                        icon: "📯",
                        badge: "dangerous",
                        badgeText: "Provocateur",
                        effects: { trust: -35, nobility: +20 }
                    },
                    {
                        text: "Gagner Montmédy pour négocier en position de force",
                        next: "negociation_montmedy",
                        icon: "⚖️",
                        badge: "peaceful",
                        badgeText: "Sage",
                        effects: { trust: +10, nobility: +10 }
                    },
                    {
                        text: "Revenir vers l'Assemblée et tenter une réconciliation",
                        next: "negociation",
                        icon: "🕊️",
                        badge: "risky",
                        badgeText: "Hasardeux",
                        effects: { trust: +5, nobility: -15 }
                    }
                ]
            },

            fuite_famille: {
                title: "La Fuite de Varennes",
                icon: "🚗",
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
                        icon: "🌲",
                        badge: "risky",
                        badgeText: "Alternatif",
                        effects: { nobility: +10 }
                    }
                ]
            },

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
                        icon: "📜",
                        badge: "historical",
                        badgeText: "Voie Historique",
                        effects: { trust: +10, nobility: -20 }
                    },
                    {
                        text: "Refuser toute collaboration et attendre l'aide des puissances étrangères",
                        next: "refus_collaboration",
                        icon: "🚫",
                        badge: "dangerous",
                        badgeText: "Dangereux",
                        effects: { trust: -20, nobility: +15 }
                    },
                    {
                        text: "Négocier secrètement avec les Girondins modérés",
                        next: "negociation_girondins",
                        icon: "🤝",
                        badge: "peaceful",
                        badgeText: "Diplomatique",
                        effects: { trust: +15, nobility: -10 }
                    }
                ]
            },

            varennes_continue: {
                title: "La Course Contre la Mort",
                icon: "🏃",
                date: "22 Juin 1791",
                text: `
                    <p>"Non ! Plus vite ! Nous ne nous arrêtons pas !" criez-vous au cocher d'une voix que vous ne vous connaissiez pas. Vos mains tremblent, mais votre décision est prise.</p>
                    
                    <p>La berline file dans la nuit noire de Varennes sans ralentir. Derrière vous, des cris, des coups de feu dans l'air, le tocsin qui hurle. Mais vous gardez votre avance précieuse.</p>
                    
                    <p>Les chevaux, fouettés par l'urgence, trouvent des forces insoupçonnées. Marie-Antoinette prie en latin, les mains jointes. Les enfants, terrorisés, se blottissent contre elle. Madame Élisabeth, votre sœur, demeure stoïque.</p>
                    
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
                        icon: "📯",
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

            negociation_montmedy: {
                title: "Le Roi Sage",
                icon: "👑",
                date: "Juillet 1791",
                text: `
                    <p>Depuis les remparts de Montmédy, vous contemplez la France déchirée. Vous avez le pouvoir militaire, mais est-ce vraiment ce que vous voulez ? La guerre civile ? Le sang français versé par des Français ?</p>
                    
                    <p>Non. Vous êtes roi pour protéger votre peuple, pas pour le détruire.</p>
                    
                    <p>Vous envoyez une lettre à l'Assemblée Nationale, lue en séance publique le 14 juillet 1791, anniversaire de la prise de la Bastille - un symbole fort :</p>
                    
                    <p><em>"Messieurs les Députés, je ne suis pas votre ennemi. Je suis venu à Montmédy non pour faire la guerre à la France, mais pour négocier en toute liberté, loin des pressions de Paris. Je propose un nouveau pacte : une monarchie constitutionnelle où le roi conserve certaines prérogatives essentielles - chef des armées, diplomatie, droit de veto suspensif - mais accepte le partage du pouvoir avec une assemblée élue. Construisons ensemble une France nouvelle, sans révolution ni contre-révolution."</em></p>
                    
                    <p>Votre lettre fait sensation. Les modérés comme <strong>Barnave</strong>, <strong>Duport</strong> et le <strong>marquis de Lafayette</strong> y voient une chance de stabiliser la Révolution. Les négociations s'ouvrent.</p>
                    
                    <p>Pendant trois mois, des émissaires font l'aller-retour entre Montmédy et Paris. Les discussions sont difficiles, houleuses. Les Jacobins comme Robespierre dénoncent une trahison. Mais les modérés tiennent bon.</p>
                    
                    <p>À l'automne 1791, un accord de principe se dessine enfin. Mais rien n'est encore acquis. La manière dont vous allez revenir dans le jeu politique décidera de la solidité de la paix.</p>
                    
                    <p>Faut-il rentrer vite à Paris pour sceller le compromis devant l'Assemblée, prendre le temps de consulter les provinces, ou proclamer une amnistie générale afin d'apaiser tous les camps ?</p>
                `,
                choices: [
                    {
                        text: "Rentrer immédiatement à Paris pour faire ratifier le compromis",
                        next: "retour_paris",
                        icon: "🏛️",
                        badge: "peaceful",
                        badgeText: "Décisif",
                        effects: { trust: +10, nobility: +5 }
                    },
                    {
                        text: "Consulter les provinces avant de signer la nouvelle Constitution",
                        next: "consultation_provinces",
                        icon: "🗺️",
                        badge: "balanced",
                        badgeText: "Prudent",
                        effects: { trust: +15, nobility: -5 }
                    },
                    {
                        text: "Proclamer une amnistie générale pour apaiser le royaume",
                        next: "amnistie_royale",
                        icon: "🕊️",
                        badge: "honorable",
                        badgeText: "Clémence",
                        effects: { trust: +20, nobility: -10 }
                    }
                ]
            },

            retour_paris: {
                title: "Le Retour Triomphal",
                icon: "🏛️",
                date: "15 Octobre 1791",
                text: `
                    <p>Vous choisissez de revenir à Paris sans tarder. Le pari est risqué : la capitale vous a hué quelques mois plus tôt. Mais cette fois, vous n'entrez pas comme un prisonnier ; vous revenez comme l'artisan visible d'un compromis.</p>
                    
                    <p>À l'Assemblée, Barnave et Lafayette orchestrent une ratification solennelle de la <strong>Constitution de Montmédy</strong>. Votre discours, bref et ferme, apaise les modérés et désarme une partie des critiques les plus virulentes.</p>
                    
                    <p>Les années suivantes restent tendues, mais le nouvel équilibre tient. En 1815, vous laissez une France pacifiée, protégée de la Terreur et de l'invasion étrangère. Votre fils Louis XVII hérite d'une monarchie parlementaire stable.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "👑",
                    title: "🏆 EXCELLENTE FIN - Le Retour Triomphal 🏆",
                    text: "En revenant au bon moment, vous avez transformé une fuite scandaleuse en retour politique maîtrisé. Votre autorité ne repose plus sur la peur, mais sur le compromis. L'Histoire retient votre sang-froid et votre sens du timing.",
                    stats: {
                        "Popularité finale": "83%",
                        "Vies sauvées": "Plus de 450 000",
                        "Stabilité": "Très forte",
                        "Héritage": "Monarchie parlementaire durable"
                    }
                }
            },

            consultation_provinces: {
                title: "Le Tour du Royaume",
                icon: "🗺️",
                date: "Automne 1791 - Printemps 1792",
                text: `
                    <p>Plutôt que de vous enfermer dans un tête-à-tête parisien avec l'Assemblée, vous envoyez des commissaires dans tout le royaume. Des cahiers d'observations sont recueillis en Bretagne, en Bourgogne, en Provence et jusque dans les villes frontières.</p>
                    
                    <p>Cette consultation élargit la légitimité du compromis. Les députés ne peuvent plus dire que la Constitution n'est qu'une manœuvre de cour ; elle devient un pacte provincial, municipal, national.</p>
                    
                    <p>Quand vous rentrez enfin à Paris au printemps 1792, la tension n'a pas disparu, mais le pays entier a déjà commencé à s'approprier la nouvelle monarchie. La Révolution ralentit, s'institutionnalise, et ne bascule jamais dans la Terreur.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🗺️",
                    title: "✨ EXCELLENTE FIN - Le Roi des Provinces ✨",
                    text: "En prenant le temps de consulter le pays réel, vous avez donné des racines profondes à la paix politique. La France se réforme sans se déchirer, et votre nom reste associé à une réconciliation nationale patiente.",
                    stats: {
                        "Appui provincial": "Massif",
                        "Stabilité": "Exceptionnelle",
                        "Guerre civile évitée": "Oui",
                        "Surnom": "Louis le Pacificateur"
                    }
                }
            },

            amnistie_royale: {
                title: "Le Pari de la Clémence",
                icon: "🕊️",
                date: "Novembre 1791",
                text: `
                    <p>Vous surprenez tout le monde en proclamant une <strong>amnistie politique</strong> pour les révolutionnaires modérés comme pour les nobles compromis mais non violents. Le royaume retient son souffle : un roi peut-il vraiment désarmer la haine par la clémence ?</p>
                    
                    <p>Le geste divise les ultras de votre camp, mais il désarme une partie des rancœurs. Les pamphlets perdent en virulence. Plusieurs clubs modérés acceptent même d'ouvrir des comités de conciliation locale.</p>
                    
                    <p>Vous ne construisez pas un pouvoir éclatant, mais un pays moins vindicatif. Cette paix imparfaite dure assez pour empêcher la spirale des massacres et des purges qui, ailleurs, auraient défiguré la Révolution.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🕊️",
                    title: "🌿 BONNE FIN - Le Roi Clément 🌿",
                    text: "Votre amnistie n'a pas tout réglé, mais elle a changé le ton du siècle. Vous avez renoncé à la revanche pour gagner quelque chose de plus rare : une paix imparfaite, mais vivable.",
                    stats: {
                        "Violences politiques": "Fortement réduites",
                        "Image du roi": "Apaisée",
                        "Durée du règne": "Jusqu'en 1812",
                        "Jugement historique": "Humain et sage"
                    }
                }
            },

            chemin_detourne: {
                title: "Le Piège de la Forêt",
                icon: "🌲",
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
                        icon: "💰",
                        badge: "desperate",
                        badgeText: "Désespéré",
                        effects: { trust: -40, nobility: -20 }
                    },
                    {
                        text: "Assumer dignement votre arrestation",
                        next: "dignite_capture",
                        icon: "👑",
                        badge: "honorable",
                        badgeText: "Honorable",
                        effects: { trust: -10, nobility: +10 }
                    }
                ]
            },

            corruption_echec: {
                title: "L'Humiliation Suprême",
                icon: "💔",
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
                    icon: "💀",
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
                        icon: "📢",
                        badge: "patriotic",
                        badgeText: "Patriote",
                        effects: { trust: +25, nobility: -25 }
                    },
                    {
                        text: "Rester silencieux et neutre",
                        next: "silence_ambigu",
                        icon: "🤐",
                        badge: "historical",
                        badgeText: "Choix Historique",
                        effects: { trust: -15 }
                    }
                ]
            },

            negociation: {
                title: "La Main Tendue",
                icon: "🤝",
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
                        icon: "🇫🇷",
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

            roi_citoyen: {
                title: "Louis, Premier Citoyen de France",
                icon: "🎩",
                date: "14 Juillet 1792",
                text: `
                    <p>Un an après votre décision courageuse, vous vous tenez sur le Champ-de-Mars pour célébrer la Fête de la Fédération. Mais cette année, tout est différent.</p>
                    
                    <p>Vous n'êtes plus "Sa Majesté". Vous êtes simplement "Louis Capet, Premier Citoyen de France". Vous avez abandonné volontairement tous vos titres nobiliaires, vos privilèges, même votre couronne.</p>
                    
                    <p>Vous portez désormais un simple habit bourgeois avec la cocarde tricolore. Vos revenus sont identiques à ceux d'un haut fonctionnaire. Vous avez transformé Versailles en musée public.</p>
                    
                    <p>Votre rôle ? Celui d'un <strong>président d'honneur</strong>, sans pouvoir réel, mais respecté pour votre sagesse et votre connaissance de l'État.</p>
                    
                    <p>Ce sacrifice inouï a transformé l'opinion. Les sans-culottes vous respectent. Les révolutionnaires modérés vous admirent. Même Robespierre a reconnu votre patriotisme.</p>
                    
                    <p>La France évite la guerre civile, la Terreur, l'exécution du roi. Les monarchies européennes, stupéfaites, ne savent comment réagir à ce roi qui a abdiqué volontairement.</p>
                    
                    <p>En 1795, une nouvelle Constitution doit désormais fixer votre place exacte dans le régime. Beaucoup vous admirent, mais personne ne sait encore si la République a besoin d'un arbitre moral... ou de votre retrait complet.</p>
                `,
                choices: [
                    {
                        text: "Accepter un rôle d'arbitre moral au-dessus des partis",
                        next: "magistrat_moral",
                        icon: "⚖️",
                        badge: "honorable",
                        badgeText: "Arbitre",
                        effects: { trust: +10, nobility: -5 }
                    },
                    {
                        text: "Vous retirer complètement pour laisser vivre la République seule",
                        next: "retraite_citoyenne",
                        icon: "🌿",
                        badge: "peaceful",
                        badgeText: "Retrait",
                        effects: { trust: +5, nobility: -10 }
                    }
                ]
            },

            magistrat_moral: {
                title: "Le Sage de la République",
                icon: "⚖️",
                date: "1795 - 1808",
                text: `
                    <p>Vous acceptez d'incarner une magistrature purement morale. Vous ne signez aucune loi, ne commandez aucune armée, ne distribuez aucun ministère. Mais on vous consulte dans chaque crise majeure comme on consulterait un ancien père de la nation.</p>
                    
                    <p>Cette position inédite rassure les modérés sans inquiéter les républicains. Votre palais devient une maison civique ouverte aux savants, aux juristes, aux administrateurs. Versailles, lui, devient musée national et symbole d'un monde dépassé.</p>
                    
                    <p>À votre mort en 1808, des centaines de milliers de citoyens accompagnent votre cercueil. Vous êtes enterré au Panthéon. Votre épitaphe résume toute votre trajectoire : <em>"Louis Capet, qui préféra son peuple à sa couronne."</em></p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🎩",
                    title: "✨ EXCELLENTE FIN - Le Magistrat Moral ✨",
                    text: "Vous avez trouvé une place que personne n'avait imaginée pour un ancien roi : ni monarque, ni exilé, mais conscience publique. Votre exemple donne à la République une mémoire apaisée au lieu d'un martyr.",
                    stats: {
                        "Popularité finale": "94%",
                        "Vies sauvées": "Plus de 600 000",
                        "Famille": "En sécurité",
                        "Héritage": "Panthéon et réconciliation"
                    }
                }
            },

            retraite_citoyenne: {
                title: "La Retraite du Citoyen Louis",
                icon: "🌿",
                date: "1795 - 1812",
                text: `
                    <p>Vous choisissez de disparaître volontairement de la vie publique. Installé dans une propriété discrète, vous vous consacrez à vos enfants, à la serrurerie, aux livres et à l'agronomie. La République apprend à vivre sans ombre monarchique au-dessus d'elle.</p>
                    
                    <p>Ce retrait impressionne durablement. Vos adversaires n'ont plus de tyran à dénoncer, vos partisans les plus exaltés n'ont plus de drapeau à brandir. Peu à peu, la politique française perd le goût de la vengeance.</p>
                    
                    <p>Vous mourez paisiblement en 1812, dans une France stabilisée qui n'a jamais eu besoin ni de Terreur ni d'Empire pour se refonder.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🌿",
                    title: "🌿 BONNE FIN - Le Retrait Salutaire 🌿",
                    text: "En vous effaçant au bon moment, vous avez laissé la République se consolider seule. Votre discrétion a évité bien des rancœurs et transformé votre image en symbole de renoncement digne.",
                    stats: {
                        "Mort": "Paisible en 1812",
                        "France": "Stabilisée sans Terreur",
                        "Image publique": "Respectée",
                        "Leçon historique": "Le pouvoir peut se quitter"
                    }
                }
            },

            roi_constitutionnel: {
                title: "Le Roi Constitutionnel",
                icon: "📜",
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
                        icon: "🏛️",
                        badge: "peaceful",
                        badgeText: "Pacifique",
                        effects: { trust: -20 }
                    },
                    {
                        text: "Négocier avec les insurgés depuis un balcon",
                        next: "negociation_balcon",
                        icon: "🗣️",
                        badge: "risky",
                        badgeText: "Courageux",
                        effects: { trust: +10 }
                    }
                ]
            },

            refus_collaboration: {
                title: "Le Pari de l'Attente",
                icon: "🚫",
                date: "Automne 1791 - Été 1792",
                text: `
                    <p>Vous refusez toute réconciliation sincère avec la Révolution. En public, vous jurez fidélité à la Constitution, mais sans conviction. En privé, vous attendez qu'une crise ou une intervention étrangère renverse la situation en votre faveur.</p>
                    
                    <p>Chaque veto royal, chaque hésitation, chaque silence nourrit la défiance. Aux Tuileries, vos fidèles vous poussent à tenir bon. À l'Assemblée, on vous soupçonne de vouloir livrer la France aux monarchies européennes.</p>
                    
                    <p>Le printemps 1792 aggrave tout. La guerre approche, la Déclaration de Pillnitz hante les esprits, et Paris se radicalise. Votre immobilisme devient en lui-même une décision politique.</p>
                    
                    <p>Il vous reste une dernière chance de choisir clairement votre camp : l'étranger, l'ambiguïté, ou la nation.</p>
                `,
                choices: [
                    {
                        text: "Parier ouvertement sur l'aide militaire étrangère",
                        next: "appel_etranger",
                        icon: "📯",
                        badge: "dangerous",
                        badgeText: "Dangereux",
                        effects: { trust: -35, nobility: +20 }
                    },
                    {
                        text: "Continuer l'ambiguïté et temporiser encore",
                        next: "silence_ambigu",
                        icon: "🤐",
                        badge: "historical",
                        badgeText: "Historique",
                        effects: { trust: -20, nobility: -5 }
                    },
                    {
                        text: "Rompre avec l'étranger et vous rallier publiquement à la nation",
                        next: "denonciation_pillnitz",
                        icon: "🇫🇷",
                        badge: "patriotic",
                        badgeText: "Patriote",
                        effects: { trust: +20, nobility: -10 }
                    }
                ]
            },

            massacre_suisses: {
                title: "Le 10 Août Sanglant",
                icon: "🩸",
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
                    icon: "📜",
                    title: "📜 FIN HISTORIQUE - L'Échafaud 📜",
                    text: "Vous avez suivi le parcours historique authentique de Louis XVI. Votre exécution le 21 janvier 1793 reste l'un des événements les plus traumatisants de l'histoire française. Aujourd'hui encore, les historiens débattent : étiez-vous un tyran, un roi faible, ou une victime des circonstances ? Une chose est sûre : votre mort a changé la France et l'Europe à jamais. Chaque année, des milliers de personnes commémorent votre mémoire place de la Concorde.",
                    stats: {
                        "Date de mort": "21 janvier 1793",
                        "Âge": "38 ans",
                        "Derniers mots": "'Je meurs innocent'",
                        "Authenticité historique": "100%"
                    }
                }
            },

            appel_etranger: {
                title: "L'Invasion",
                icon: "🏰",
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
                    icon: "🗡️",
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
                    icon: "💀",
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

            denonciation_pillnitz: {
                title: "Le Roi Patriote",
                icon: "🇫🇷",
                date: "Septembre 1791",
                text: `
                    <p>Vous publiez une lettre ouverte qui fait sensation : "Je dénonce solennellement la Déclaration de Pillnitz ! Je ne l'ai jamais demandée. Je suis roi de France avant d'être neveu de l'empereur. Si des armées étrangères osent fouler notre sol, je combattrai à la tête de nos troupes !"</p>
                    
                    <p>L'effet est électrique. Les révolutionnaires les plus méfiants sont stupéfaits. Lafayette vous serre dans ses bras en public. Les Jacobins eux-mêmes applaudissent.</p>
                    
                    <p>Votre popularité remonte en flèche. Les caricaturistes qui vous crachaient dessus vous dessinent maintenant en <strong>roi patriote</strong>. On chante dans les rues : "Louis est des nôtres !"</p>
                    
                    <p>Les années 1792-1793 sont tendues mais pacifiques. Vous travaillez main dans la main avec l'Assemblée Législative. La guerre contre l'Autriche est déclarée en avril 1792, mais cette fois vous êtes clairement du côté de la France.</p>
                    
                    <p>Vous visitez même le front, encouragez les soldats. Cette image du "roi-soldat" est puissante. La propagande révolutionnaire ne peut plus vous attaquer sans passer pour anti-patriotique.</p>
                    
                    <p>Le 10 août 1792, quand les sans-culottes marchent sur les Tuileries, ils ne viennent pas pour vous arrêter mais pour vous demander de prendre la tête d'une levée en masse contre l'invasion prussienne !</p>
                    
                    <p>Vous acceptez. En septembre 1792, vous êtes à Valmy aux côtés de Dumouriez et Kellermann quand l'armée prussienne est repoussée. La victoire vous offre un prestige immense, mais aussi une nouvelle responsabilité.</p>
                    
                    <p>Faut-il désormais rester au front comme roi-soldat, ou revenir à Paris pour transformer cet élan patriotique en réconciliation civique durable ?</p>
                `,
                choices: [
                    {
                        text: "Rester au front pour incarner la nation en armes",
                        next: "roi_soldat_valmy",
                        icon: "🎖️",
                        badge: "patriotic",
                        badgeText: "Front",
                        effects: { trust: +10, nobility: -5 }
                    },
                    {
                        text: "Revenir à Paris pour organiser une grande fête de réconciliation",
                        next: "fete_reconciliation",
                        icon: "🎉",
                        badge: "peaceful",
                        badgeText: "Réconciliation",
                        effects: { trust: +15, nobility: +5 }
                    }
                ]
            },

            roi_soldat_valmy: {
                title: "Le Roi-Soldat",
                icon: "🎖️",
                date: "1792 - 1818",
                text: `
                    <p>Vous choisissez de rester proche des armées. Sans redevenir un monarque absolu, vous devenez la figure tutélaire d'une France en guerre mais unie. Votre présence au front calme les soupçons et donne un visage à l'effort national.</p>
                    
                    <p>Les victoires successives renforcent votre prestige. La monarchie se transforme peu à peu en institution patriotique, adossée non plus à la tradition seule, mais à la défense du territoire.</p>
                    
                    <p>À votre mort en 1818, les vétérans de Valmy et de Jemappes défilent derrière votre cercueil. Votre fils hérite d'un royaume constitutionnel fier, stable et réconcilié avec la nation.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🎖️",
                    title: "🏆 EXCELLENTE FIN - Le Roi-Soldat 🏆",
                    text: "En partageant les risques de la guerre avec vos soldats, vous avez définitivement retourné l'opinion. Votre couronne a survécu parce qu'elle a cessé d'apparaître séparée du pays.",
                    stats: {
                        "Popularité finale": "84%",
                        "Armée": "Loyale à la nation et au roi",
                        "Stabilité": "Très solide",
                        "Surnom": "Louis le Roi-Soldat"
                    }
                }
            },

            fete_reconciliation: {
                title: "La Fête de la Réconciliation",
                icon: "🎉",
                date: "Automne 1792",
                text: `
                    <p>Vous rentrez à Paris avec un projet audacieux : transformer la victoire militaire en paix civile. Sur le Champ-de-Mars, une immense cérémonie unit députés, gardes nationaux, soldats, prêtres constitutionnels et délégations de provinces.</p>
                    
                    <p>Le symbole frappe les esprits. La monarchie n'est plus perçue comme un obstacle à la Révolution, mais comme le cadre dans lequel elle peut s'achever sans dévorer ses enfants.</p>
                    
                    <p>La Convention maintient la monarchie constitutionnelle et lance une grande réforme civique. Vous mourez en 1820, après un règne apaisé, dans une France qui n'a jamais connu la Terreur.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🎉",
                    title: "✨ EXCELLENTE FIN - La Réconciliation Nationale ✨",
                    text: "Vous avez compris qu'une victoire militaire ne suffisait pas : il fallait aussi guérir le pays. En donnant un rite commun à la France révolutionnaire, vous avez sauvé la couronne et apaisé la mémoire nationale.",
                    stats: {
                        "Popularité finale": "88%",
                        "Famille royale": "En sécurité",
                        "Terreur évitée": "Oui",
                        "Héritage": "Réconciliation durable"
                    }
                }
            },

            negociation_girondins: {
                title: "L'Alliance des Modérés",
                icon: "🤝",
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
                    
                    <p>En exil, une nouvelle question vous hante : faut-il préparer activement le retour de votre fils sur le trône, ou rester volontairement en retrait pour ne jamais rouvrir la guerre civile française ?</p>
                `,
                choices: [
                    {
                        text: "Préparer patiemment la restauration de votre fils",
                        next: "restauration_fils",
                        icon: "👑",
                        badge: "balanced",
                        badgeText: "Dynastie",
                        effects: { nobility: +10 }
                    },
                    {
                        text: "Rester en retrait et cultiver la mémoire du compromis",
                        next: "memoire_exil",
                        icon: "📚",
                        badge: "honorable",
                        badgeText: "Mémoire",
                        effects: { trust: +10 }
                    }
                ]
            },

            restauration_fils: {
                title: "Le Retour de la Dynastie",
                icon: "👑",
                date: "1793 - 1824",
                text: `
                    <p>Depuis la Suisse puis l'Angleterre, vous tissez patiemment un réseau d'appuis. Vous refusez toute aventure armée, mais vous entretenez l'idée d'une restauration modérée, constitutionnelle, compatible avec les acquis de la Révolution.</p>
                    
                    <p>Lorsque Napoléon tombe, votre prudence est récompensée. En 1815, votre fils Louis XVII est rappelé pour régner non comme restaurateur de l'Ancien Régime, mais comme héritier d'une monarchie réconciliée avec la nation.</p>
                    
                    <p>Vous rentrez à Paris acclamé, non comme un revenant vengeur, mais comme l'homme qui avait préféré l'exil à la guerre civile. Vous mourez en 1824 à Saint-Cloud, entouré de vos petits-enfants.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "👑",
                    title: "✨ EXCELLENTE FIN - La Restauration Modérée ✨",
                    text: "Vous avez gagné bien plus qu'un retour : vous avez obtenu une dynastie transformée par l'exil et vaccinée contre l'absolutisme. La France retrouve des Bourbons, mais pas l'Ancien Régime.",
                    stats: {
                        "Survie": "Oui - mort naturelle à 69 ans",
                        "Famille": "Toute sauvée",
                        "Restauration": "1815 - réussie",
                        "Jugement historique": "Très positif"
                    }
                }
            },

            memoire_exil: {
                title: "Le Roi du Souvenir",
                icon: "📚",
                date: "1793 - 1822",
                text: `
                    <p>Vous choisissez de ne pas agir directement sur la scène politique. À la place, vous écrivez, recevez, racontez. Votre maison d'exil devient un lieu de mémoire où viennent se rencontrer anciens girondins, libéraux britanniques et royalistes modérés.</p>
                    
                    <p>Peu à peu, votre image change. Vous n'êtes plus seulement le roi sauvé par hasard, mais le témoin vivant d'une autre voie révolutionnaire, moins sanglante, plus parlementaire.</p>
                    
                    <p>Vous ne remontez jamais sur le trône, mais vos mémoires influencent durablement la vie politique française au XIXe siècle. Vous mourez en 1822, apaisé, respecté, et presque réconcilié avec votre siècle.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "📚",
                    title: "🌿 BONNE FIN - Le Roi du Souvenir 🌿",
                    text: "En renonçant au retour dynastique immédiat, vous avez laissé une trace plus subtile mais profonde. Votre héritage n'est pas une couronne reprise, mais une mémoire politique qui inspire les modérés pendant des décennies.",
                    stats: {
                        "Retour sur le trône": "Non",
                        "Influence intellectuelle": "Très forte",
                        "Famille": "Protégée",
                        "Mémoire publique": "Durable"
                    }
                }
            },

            silence_ambigu: {
                title: "Le Piège de l'Ambiguïté",
                icon: "🤐",
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
                    title: "📜 FIN HISTORIQUE COMPLÈTE - La Tragédie Royale 📜",
                    text: "Vous avez suivi le parcours historique complet de la famille royale. Le silence et l'ambiguïté ont mené à la catastrophe totale : votre mort, celle de votre épouse, celle de votre fils. Cette trajectoire tragique fascine encore aujourd'hui historiens et romanciers. Étiez-vous victime des circonstances ou de vos propres erreurs ? Le débat reste ouvert.",
                    stats: {
                        "Louis XVI": "Exécuté le 21/01/1793",
                        "Marie-Antoinette": "Exécutée le 16/10/1793",
                        "Louis XVII": "Mort en prison le 08/06/1795",
                        "Marie-Thérèse": "Seule survivante"
                    }
                }
            },

            refuge_assemblee: {
                title: "La Chute du Trône",
                icon: "🏛️",
                date: "10 Août 1792",
                text: `
                    <p>"Messieurs, je viens chercher asile auprès de la Nation", déclarez-vous en entrant précipitamment dans la salle du Manège où siège l'Assemblée Législative.</p>
                    
                    <p>Vous êtes pâle, en sueur, Marie-Antoinette et vos enfants vous suivent. Les députés, stupéfaits, ne savent comment réagir. Vous venez d'abandonner votre palais sans combattre.</p>
                    
                    <p>Pendant que vous êtes assis dans la loge du "logographe" (le stenographe), séparé des députés par une grille comme un criminel, les Tuileries brûlent. Les gardes suisses qui n'ont pas reçu l'ordre de se rendre sont massacrés.</p>
                    
                    <p>L'Assemblée débat de votre sort pendant des heures. Finalement, elle vote votre <strong>suspension</strong>. Vous n'êtes plus roi, mais pas encore jugé. Un statut étrange, précaire.</p>
                    
                    <p>Vous êtes transféré à la prison du Temple. Les semaines deviennent des mois. Votre barbe pousse. Vous lisez beaucoup - Tacite, Hume, les Voyages de Cook. Vous jouez avec vos enfants. Une vie simple mais emprisonnée.</p>
                    
                    <p>Le 21 septembre 1792, la République est proclamée. Vous êtes désormais "Louis Capet", simple citoyen accusé.</p>
                    
                    <p>Votre procès commence le 11 décembre. Il y a peut-être encore une chance...</p>
                `,
                choices: [
                    {
                        text: "Plaider passionnément votre innocence",
                        next: "defense_passionnee",
                        icon: "🗣️",
                        badge: "emotional",
                        badgeText: "Émotionnel",
                        effects: { trust: +15 }
                    },
                    {
                        text: "Rester digne et silencieux",
                        next: "dignite_silencieuse",
                        icon: "🤫",
                        badge: "stoic",
                        badgeText: "Stoïque",
                        effects: { nobility: +20 }
                    },
                    {
                        text: "Proposer d'abdiquer en faveur de votre fils",
                        next: "abdication_desperate",
                        icon: "👶",
                        badge: "sacrifice",
                        badgeText: "Sacrifice",
                        effects: { trust: +20, nobility: +15 }
                    }
                ]
            },

            negociation_balcon: {
                title: "Le Courage du Désespoir",
                icon: "🗣️",
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
                    icon: "🕊️",
                    title: "🏆 EXCELLENTE FIN - Le Négociateur 🏆",
                    text: "Votre courage d'affronter seul une foule en armes a changé le cours de l'Histoire. En trois minutes sur un balcon, vous avez transformé une révolution sanglante en négociation pacifique. Ce moment héroïque est célébré pendant des décennies. Vous mourez en 1815, respecté par tous les camps, ayant réussi l'impossible : réconcilier monarchie et révolution.",
                    stats: {
                        "Vies sauvées le 10 août": "Plus de 2 000",
                        "Popularité finale": "71%",
                        "Règne total": "38 ans",
                        "Surnom historique": "Louis le Négociateur"
                    }
                }
            },

            defense_passionnee: {
                title: "Le Plaidoyer du Roi",
                icon: "💬",
                date: "26 Décembre 1792",
                text: `
                    <p>Vous vous levez devant les 749 députés de la Convention. Votre voix tremble au début, puis s'affermit :</p>
                    
                    <p>"Citoyens députés, on m'accuse de trahison. Moi ? Qui ai accepté la Constitution quand j'aurais pu résister ? Qui ai toujours cherché le bien du peuple, même maladroitement ?"</p>
                    
                    <p>"La fuite à Varennes ? Ce n'était pas une trahison, mais une recherche de sécurité pour ma famille ! J'ai vu ma femme insultée, mes enfants terrorisés ! Quel père n'aurait pas agi de même ?"</p>
                    
                    <p>"Le veto contre les décrets ? C'était mon droit constitutionnel ! Une Constitution que VOUS avez écrite, que VOUS m'avez fait jurer !"</p>
                    
                    <p>Vous parlez pendant deux heures. Certains députés pleurent. <strong>Thomas Paine</strong>, le révolutionnaire américain, prend la parole : "La France ne doit pas tuer son roi. Qu'elle le bannisse, mais qu'elle reste pure de ce sang !"</p>
                    
                    <p>Le vote est déchirant. Peine de mort : 361 voix pour, 360 contre. Une seule voix de différence...</p>
                    
                    <p>Mais un second vote est demandé : faut-il un sursis ? Cette fois, grâce à votre défense émouvante, 380 députés votent pour reporter l'exécution et organiser un référendum national !</p>
                    
                    <p>Ce délai sauve votre vie. Pendant les semaines suivantes, des pétitions affluent de toute la France. Beaucoup demandent votre exil plutôt que votre mort.</p>
                    
                    <p>Le 15 février 1793, la Convention vote finalement : <strong>bannissement à vie</strong>. Vous et votre famille êtes conduits à Bâle, en Suisse, sous escorte. Sauvé, vous devez maintenant choisir comment vivre cet exil.</p>
                `,
                choices: [
                    {
                        text: "Publier des mémoires pour défendre votre version de l'histoire",
                        next: "memoires_exil",
                        icon: "📝",
                        badge: "emotional",
                        badgeText: "Mémoires",
                        effects: { trust: +5 }
                    },
                    {
                        text: "Rester discret et attendre la restauration des Bourbons",
                        next: "attente_bourbon",
                        icon: "⏳",
                        badge: "honorable",
                        badgeText: "Patience",
                        effects: { nobility: +10 }
                    }
                ]
            },

            memoires_exil: {
                title: "Les Mémoires de Bâle",
                icon: "📝",
                date: "1793 - 1816",
                text: `
                    <p>À Bâle, puis à Brunswick et enfin en Angleterre, vous prenez la plume. Vos mémoires racontent la Révolution vue de l'intérieur, vos hésitations, vos fautes, vos peurs, mais aussi votre attachement sincère à la France.</p>
                    
                    <p>Le texte circule d'abord parmi les exilés, puis dans toute l'Europe. On y découvre un homme moins opaque que le roi caricaturé par les pamphlets révolutionnaires. Votre image change lentement, mais durablement.</p>
                    
                    <p>Lorsque les Bourbons reviennent en 1815, vos écrits ont déjà préparé votre réhabilitation. Vous mourez en 1816, loin de Paris mais réconcilié avec une partie de l'opinion.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "📚",
                    title: "✨ BONNE FIN - Le Roi Mémorialiste ✨",
                    text: "Vous n'avez pas retrouvé votre trône, mais vous avez retrouvé une voix. Vos mémoires transforment un exil humiliant en victoire posthume sur l'oubli et la caricature.",
                    stats: {
                        "Survie": "Oui - 23 ans d'exil",
                        "Famille": "Sauvée et unie",
                        "Réhabilitation": "Progressive",
                        "Héritage": "Mémoires lus dans toute l'Europe"
                    }
                }
            },

            attente_bourbon: {
                title: "L'Attente des Bourbons",
                icon: "⏳",
                date: "1793 - 1815",
                text: `
                    <p>Vous choisissez le silence et la patience. Vous refusez de devenir un agitateur d'exil, convaincu que les événements finiront par rappeler un jour les Bourbons au pouvoir.</p>
                    
                    <p>Les années passent dans une retenue mélancolique. Vous observez la Terreur, le Directoire puis l'ascension de Napoléon comme on regarde un pays aimé depuis la rive opposée d'un fleuve impossible à franchir.</p>
                    
                    <p>En 1815, les Bourbons sont effectivement restaurés. Vous ne remontez pas sur le trône, mais vous assistez à l'entrée de votre frère dans Paris. Vous mourez peu après, avec le sentiment d'avoir au moins sauvé votre nom et les vôtres.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🌍",
                    title: "🌍 BONNE FIN - L'Exil Honorable 🌍",
                    text: "Votre patience vous a coûté des années de nostalgie, mais elle a évité de nouvelles convulsions. Vous laissez l'image d'un roi vaincu, mais digne, dont l'exil n'a pas sombré dans la rancœur.",
                    stats: {
                        "Survie": "Oui - jusqu'en 1815",
                        "Famille": "Sauvée",
                        "Retour dynastique": "Indirect",
                        "Réputation": "Digne et honorable"
                    }
                }
            },

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
                    icon: "👑",
                    title: "📜 FIN HISTORIQUE NOBLE - Le Martyr Royal 📜",
                    text: "Vous avez choisi la voie de la dignité silencieuse jusqu'à la mort. Cette attitude stoïque vous vaut une place particulière dans l'imaginaire collectif. Vous n'êtes pas le roi faible de l'historiographie républicaine, mais le martyr noble des romantiques. Votre dernière lettre à votre fils est encore enseignée dans les écoles au XIXe siècle comme modèle de noblesse d'âme.",
                    stats: {
                        "Mort": "21 janvier 1793, avec dignité",
                        "Héritage littéraire": "Considérable",
                        "Statues érigées": "12 en France (XIXe s.)",
                        "Réputation posthume": "Réhabilitée"
                    }
                }
            },

            abdication_desperate: {
                title: "Le Sacrifice du Père",
                icon: "👨‍👦",
                date: "30 Décembre 1792",
                text: `
                    <p>Devant la Convention stupéfaite, vous faites une annonce historique : "Citoyens, si c'est ma couronne qui vous pose problème, je l'abandonne. J'abdique solennellement en faveur de mon fils Louis-Charles."</p>
                    
                    <p>"Laissez-lui une chance ! Il n'a que 7 ans, il est innocent de tout. Élevez-le comme un enfant de la République. Faites de lui un roi-citoyen, un symbole de réconciliation !"</p>
                    
                    <p>"Quant à moi, bannissez-moi, emprisonnez-moi, je m'en remets à votre justice. Mais épargnez mon fils !"</p>
                    
                    <p>Cette proposition audacieuse divise profondément la Convention. Les modérés comme <strong>Condorcet</strong> y voient une solution géniale. Les radicaux comme <strong>Marat</strong> hurlent à la manipulation.</p>
                    
                    <p>Après trois jours de débats houleux, un compromis émerge : votre abdication est acceptée, mais votre fils ne régnera pas. La République est maintenue.</p>
                    
                    <p>En échange de votre abdication volontaire, vous obtenez :</p>
                    <ul style="margin-left: 40px; margin-top: 15px;">
                        <li>L'exil pour toute votre famille (pas d'exécution)</li>
                        <li>Une pension annuelle</li>
                        <li>La protection de vos biens personnels</li>
                    </ul>
                    
                    <p>Le 15 janvier 1793, vous quittez la France avec Marie-Antoinette et vos enfants. Destination : Vienne, chez votre beau-frère l'empereur.</p>
                    
                    <p>Loin de la France, une nouvelle vie commence. Votre fils grandit en sécurité, mais votre famille doit encore choisir ce qu'elle fera de son nom, de sa mémoire et de son avenir.</p>
                `,
                choices: [
                    {
                        text: "Élever votre fils loin de toute ambition dynastique",
                        next: "dynastie_privee",
                        icon: "🏡",
                        badge: "peaceful",
                        badgeText: "Vie privée",
                        effects: { trust: +10 }
                    },
                    {
                        text: "Préparer sans pression un éventuel retour de la dynastie",
                        next: "retour_consenti",
                        icon: "👑",
                        badge: "balanced",
                        badgeText: "Avenir",
                        effects: { nobility: +10 }
                    }
                ]
            },

            dynastie_privee: {
                title: "La Dynastie Privée",
                icon: "🏡",
                date: "1793 - 1823",
                text: `
                    <p>Vous refusez de faire de votre fils un drapeau politique. À Vienne, puis dans plusieurs résidences discrètes d'Autriche, vous l'élevez d'abord comme un homme, non comme un prétendant. Il apprend les langues, les sciences, l'histoire et l'art du gouvernement sans jamais être lancé dans la mêlée des conspirations.</p>
                    
                    <p>Cette paix intérieure sauve votre famille. Louis XVII se marie, a des enfants, et construit une branche des Bourbons respectée mais non menaçante. Vous devenez grand-père dans une maison où le mot "couronne" compte moins que "foyer".</p>
                    
                    <p>Vous mourez en 1823, entouré de trois générations. Votre épitaphe semble évidente à tous ceux qui vous ont connu : <em>"Il préféra ses enfants à sa couronne."</em></p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "💝",
                    title: "🏆 MEILLEURE FIN FAMILIALE - L'Amour Paternel 🏆",
                    text: "Vous avez poussé jusqu'au bout le choix de la famille. Votre dynastie ne domine plus la France, mais elle survit, saine et unie. Vous perdez le trône et gagnez une vie que peu de rois ont connue : une vraie paix domestique.",
                    stats: {
                        "Famille": "Toute sauvée et réunie",
                        "Petits-enfants": "7",
                        "Années d'exil paisible": "30",
                        "Jugement de l'Histoire": "Extrêmement positif"
                    }
                }
            },

            retour_consenti: {
                title: "Le Retour Consenti",
                icon: "👑",
                date: "1793 - 1816",
                text: `
                    <p>Sans jamais pousser votre fils à l'ambition, vous veillez à ce qu'il soit prêt si la France le rappelle un jour. Il reçoit l'éducation d'un prince constitutionnel, formé à respecter les assemblées, les libertés publiques et les limites du pouvoir.</p>
                    
                    <p>Lorsque l'Empire s'effondre, son nom réapparaît comme une solution crédible. Non pas le retour d'un absolutisme nostalgique, mais celui d'une dynastie qui a appris l'exil, la prudence et la mesure.</p>
                    
                    <p>Louis XVII finit par accepter un trône étroitement encadré. Vous voyez revenir votre nom en France sans revoir les erreurs qui l'avaient condamné. Vous mourez peu après, soulagé plus qu'ivre de revanche.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "👑",
                    title: "✨ EXCELLENTE FIN - Le Retour Consenti ✨",
                    text: "Votre abdication n'a pas seulement sauvé vos enfants : elle a permis une restauration plus humble et plus lucide. La dynastie revient transformée, et c'est précisément pour cela qu'elle survit.",
                    stats: {
                        "Famille": "Sauvée",
                        "Retour dynastique": "Oui, constitutionnel",
                        "Réputation": "Père lucide",
                        "Héritage": "Bourbons réinventés"
                    }
                }
            },

            negociation_dure: {
                title: "L'Équilibre des Pouvoirs",
                icon: "⚖️",
                date: "Août - Novembre 1791",
                text: `
                    <p>Les négociations avec l'Assemblée sont âpres. Vous ne cédez pas sur tout. Vous défendez fermement certaines prérogatives royales essentielles.</p>
                    
                    <p>Après trois mois de tractations intenses, une nouvelle Constitution est signée, plus équilibrée que celle prévue initialement :</p>
                    
                    <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-left: 4px solid var(--gold); margin: 20px 0;">
                        <h4 style="color: var(--royal-red); margin-bottom: 10px;">🏛️ Constitution de Novembre 1791</h4>
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
                    
                    <p>Reste désormais à faire vivre cet équilibre. Les clubs modérés veulent une large coalition parlementaire. Les militaires, eux, vous pressent d'utiliser vos nouveaux pouvoirs pour discipliner durement l'Assemblée.</p>
                    
                    <p>Votre prochain choix décidera si ce compromis devient un modèle durable... ou s'il se fissure sous le poids de l'autorité royale.</p>
                `,
                choices: [
                    {
                        text: "Construire une grande coalition durable avec les modérés",
                        next: "coalition_moderee",
                        icon: "🤝",
                        badge: "balanced",
                        badgeText: "Coalition",
                        effects: { trust: +15, nobility: -5 }
                    },
                    {
                        text: "Utiliser le veto royal pour imposer une ligne très ferme",
                        next: "crise_veto",
                        icon: "🛡️",
                        badge: "dangerous",
                        badgeText: "Autoritaire",
                        effects: { trust: -15, nobility: +15 }
                    },
                    {
                        text: "Créer des états provinciaux consultatifs pour équilibrer Paris",
                        next: "etats_provinciaux",
                        icon: "🏰",
                        badge: "honorable",
                        badgeText: "Institutionnel",
                        effects: { trust: +10, nobility: +5 }
                    }
                ]
            },

            coalition_moderee: {
                title: "La Coalition des Raisonnables",
                icon: "🤝",
                date: "1792 - 1815",
                text: `
                    <p>Vous parvenez à réunir autour de vous un bloc hétérogène mais solide : feuillants, constitutionnels modérés, administrateurs pragmatiques, militaires disciplinés. Aucun camp n'obtient tout, mais chacun reçoit assez pour préférer le compromis au chaos.</p>
                    
                    <p>Lorsque la guerre éclate en 1792, cette coalition réagit avec méthode. Les ministres se coordonnent, les généraux sont choisis pour leurs compétences, et la victoire de Valmy devient autant celle de la Nation que de votre monarchie limitée.</p>
                    
                    <p>À votre mort en 1815, la France possède un régime original, robuste et respecté en Europe. On parle alors du <strong>miracle français</strong> : une révolution terminée par l'organisation plutôt que par la Terreur.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "⚖️",
                    title: "🏆 EXCELLENTE FIN - Le Roi l'Équitable 🏆",
                    text: "Vous avez transformé un compromis fragile en système politique durable. Votre génie n'a pas été de vaincre un camp, mais de rendre le pays gouvernable pour tous.",
                    stats: {
                        "Règne total": "41 ans",
                        "Stabilité": "Exceptionnelle",
                        "Modèle politique": "Exporté en Europe",
                        "Surnom": "Louis l'Équitable"
                    }
                }
            },

            crise_veto: {
                title: "La Monarchie Crispée",
                icon: "🛡️",
                date: "1792 - 1794",
                text: `
                    <p>Vous choisissez d'user sans relâche de votre veto et de vos prérogatives militaires. À court terme, la noblesse se rassure et les royalistes exultent. Mais l'Assemblée se braque, les journaux s'enflamment, et Paris retrouve le goût de l'affrontement.</p>
                    
                    <p>Le régime ne s'effondre pas complètement, mais il devient ingouvernable. Les crises ministérielles se succèdent, les provinces se crispent, et les républicains radicaux gagnent une légitimité nouvelle en dénonçant votre raidissement.</p>
                    
                    <p>Vous conservez votre trône, mais au prix d'une France plus dure, plus méfiante, moins libre. Votre héritier reçoit une couronne sauvée, non réconciliée.</p>
                `,
                choices: [],
                ending: {
                    type: "bad",
                    icon: "⚠️",
                    title: "⚠️ FIN AMÈRE - Le Roi du Veto ⚠️",
                    text: "Vous avez préservé l'institution, mais perdu l'esprit du compromis. L'Histoire se souvient d'un roi qui aurait pu pacifier la Révolution et qui choisit finalement de la figer dans la défiance.",
                    stats: {
                        "Trône": "Sauvé mais fragilisé",
                        "Libertés publiques": "Réduites",
                        "Climat politique": "Tendu",
                        "Jugement historique": "Très mitigé"
                    }
                }
            },

            etats_provinciaux: {
                title: "Le Royaume Décentralisé",
                icon: "🏰",
                date: "1792 - 1816",
                text: `
                    <p>Vous créez des <strong>états provinciaux consultatifs</strong> chargés de remonter les plaintes, besoins et propositions des territoires. Paris cesse d'être le seul centre de gravité du régime.</p>
                    
                    <p>Les provinces, enfin écoutées, s'investissent dans la nouvelle monarchie constitutionnelle. Les tensions ne disparaissent pas, mais elles se dispersent, se négocient, se canalisent. La politique française devient moins théâtrale, plus territoriale.</p>
                    
                    <p>À votre mort, le pays fonctionne comme une monarchie parlementaire décentralisée où les villes et régions jouent un rôle décisif. Votre fils hérite d'un royaume moins brillant que Versailles, mais infiniment plus solide.</p>
                `,
                choices: [],
                ending: {
                    type: "good",
                    icon: "🏰",
                    title: "✨ BONNE FIN - Le Roi des Territoires ✨",
                    text: "En desserrant l'étau parisien, vous avez donné à la monarchie constitutionnelle des appuis durables. La France s'est apaisée par la représentation locale plutôt que par la centralisation brutale.",
                    stats: {
                        "Cohésion du royaume": "Très forte",
                        "Influence des provinces": "Décisive",
                        "Stabilité": "Durable",
                        "Héritage": "Monarchie décentralisée"
                    }
                }
            }
        };

        function resetGameState() {
            const soundEnabled = typeof gameState === 'object' ? gameState.soundEnabled : true;
            gameState = {
                trust: 50,
                nobility: 70,
                currentChapter: 'start',
                chapterNumber: 0,
                soundEnabled,
                decisionsCount: 0,
                historicalPath: false,
                decisions: []
            };

            const soundToggle = document.getElementById('soundToggle');
            if (soundToggle) {
                soundToggle.innerHTML = gameState.soundEnabled
                    ? '<i class="fas fa-volume-up"></i>'
                    : '<i class="fas fa-volume-mute"></i>';
            }
        }

        function clampStat(value) {
            return Math.max(0, Math.min(100, value));
        }

        function updateStatsDisplay(chapter) {
            document.getElementById('trustValue').textContent = `${gameState.trust}%`;
            document.getElementById('nobilityValue').textContent = `${gameState.nobility}%`;
            document.getElementById('trustBar').style.width = `${gameState.trust}%`;
            document.getElementById('nobilityBar').style.width = `${gameState.nobility}%`;
            document.getElementById('dateValue').textContent = chapter.date || 'Date inconnue';
            document.getElementById('chapterCount').textContent = gameState.chapterNumber === 0 ? 'Prologue' : `Chapitre ${gameState.chapterNumber}`;
        }

        function createStars() {
            const starsContainer = document.querySelector('.stars');
            if (!starsContainer || starsContainer.children.length > 0) {
                return;
            }

            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = `${Math.random() * 3}px`;
                star.style.height = star.style.width;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 3}s`;
                starsContainer.appendChild(star);
            }
        }

        function createParticles() {
            window.setInterval(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.width = `${Math.random() * 5 + 2}px`;
                particle.style.height = particle.style.width;
                particle.style.animationDuration = `${Math.random() * 3 + 5}s`;
                document.body.appendChild(particle);

                window.setTimeout(() => particle.remove(), 8000);
            }, 300);
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            window.setTimeout(() => notification.remove(), 3000);
        }

        function openModal(title, content) {
            const modal = document.getElementById('infoModal');
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <h3 style="font-family: 'Cinzel', serif; color: var(--royal-red); margin-bottom: 20px;">${title}</h3>
                ${content}
            `;
            modal.style.display = 'block';
        }

        function closeModal() {
            document.getElementById('infoModal').style.display = 'none';
        }

        function buildJourneySummary() {
            if (gameState.decisions.length === 0) {
                return '<p>Vous n\'avez encore pris aucune décision dans cette partie.</p>';
            }

            const items = gameState.decisions.map((decision, index) => `
                <div style="margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                    <strong>Choix ${index + 1}</strong><br>
                    <span>${decision.chapter}</span><br>
                    <em>${decision.choice}</em>
                </div>
            `).join('');

            return `
                <p style="margin-bottom: 20px;">Voici le chemin parcouru dans cette partie.</p>
                ${items}
            `;
        }

        function showJourneySummary() {
            openModal('Résumé de votre parcours', buildJourneySummary());
        }

        function renderChoices(chapter) {
            if (!chapter.choices || chapter.choices.length === 0) {
                return '';
            }

            const choicesHtml = chapter.choices.map((choice, index) => `
                <button type="button" class="choice-card" onclick="makeChoice('${choice.next}', ${index})">
                    <div class="choice-header">
                        <div class="choice-number">${index + 1}</div>
                        <div class="choice-icon">${choice.icon}</div>
                    </div>
                    <div class="choice-content">
                        <div class="choice-text">${choice.text}</div>
                        <div class="choice-badges">
                            ${choice.badgeText ? `<span class="badge ${choice.badge || ''}">${choice.badgeText}</span>` : ''}
                        </div>
                    </div>
                    <div class="choice-arrow"><i class="fas fa-arrow-right"></i></div>
                </button>
            `).join('');

            return `
                <div class="choices-container">
                    <h3 class="choices-title">Quel chemin choisissez-vous ?</h3>
                    <div class="choices">
                        ${choicesHtml}
                    </div>
                </div>
            `;
        }

        function renderEnding(chapter) {
            if (!chapter.ending) {
                return '';
            }

            const endingStats = Object.entries(chapter.ending.stats || {}).map(([label, value]) => `
                <div class="ending-stat">
                    <div class="ending-stat-label">${label}</div>
                    <div class="ending-stat-value">${value}</div>
                </div>
            `).join('');

            return `
                <div class="ending-screen">
                    <div class="ending-icon">${chapter.ending.icon}</div>
                    <div class="ending-box ${chapter.ending.type}">
                        <h3 class="ending-title">${chapter.ending.title}</h3>
                        <p class="ending-text">${chapter.ending.text}</p>
                        <div class="ending-stats">
                            ${endingStats}
                        </div>
                        <div class="action-buttons">
                            <button type="button" class="action-btn continue-btn" onclick="showJourneySummary()">
                                <span><i class="fas fa-scroll"></i> Voir mon parcours</span>
                            </button>
                            <button type="button" class="action-btn restart-btn" onclick="restartGame()">
                                <span><i class="fas fa-redo"></i> Rejouer</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function showChapter(chapterId) {
            const chapter = chapters[chapterId];
            const storyContainer = document.getElementById('storyContainer');

            if (!chapter) {
                showNotification(`Chapitre introuvable : ${chapterId}`);
                return;
            }

            gameState.currentChapter = chapterId;
            gameState.chapterNumber = chapterId === 'start' ? 0 : gameState.decisionsCount + 1;
            updateStatsDisplay(chapter);

            storyContainer.style.opacity = '0';
            storyContainer.style.transform = 'translateY(20px)';

            window.setTimeout(() => {
                storyContainer.innerHTML = `
                    <div class="chapter-header">
                        <div class="chapter-number">${gameState.chapterNumber === 0 ? 'Prologue' : `Chapitre ${gameState.chapterNumber}`}</div>
                        <h2 class="chapter-title"><span class="chapter-icon">${chapter.icon}</span>${chapter.title}</h2>
                        ${chapter.date ? `<div class="chapter-date"><i class="fas fa-calendar-alt"></i> ${chapter.date}</div>` : ''}
                    </div>
                    ${chapter.image ? `<img class="chapter-image" src="${chapter.image}" alt="${chapter.title}">` : ''}
                    <div class="story-text">
                        ${chapter.text}
                    </div>
                    ${chapter.ending ? renderEnding(chapter) : renderChoices(chapter)}
                `;

                storyContainer.style.opacity = '1';
                storyContainer.style.transform = 'translateY(0)';
            }, 180);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function applyChoiceEffects(choice) {
            if (!choice || !choice.effects) {
                return;
            }

            gameState.trust = clampStat(gameState.trust + (choice.effects.trust || 0));
            gameState.nobility = clampStat(gameState.nobility + (choice.effects.nobility || 0));
        }

        function makeChoice(nextChapter, choiceIndex) {
            const currentChapter = chapters[gameState.currentChapter];
            const choice = currentChapter && currentChapter.choices ? currentChapter.choices[choiceIndex] : null;

            if (choice) {
                applyChoiceEffects(choice);
                gameState.decisionsCount += 1;
                gameState.historicalPath = gameState.historicalPath || choice.badge === 'historical';
                gameState.decisions.push({
                    chapter: currentChapter.title,
                    choice: choice.text,
                    nextChapter
                });
            }

            showChapter(nextChapter);
        }

        function startGame() {
            document.getElementById('startMenu').classList.add('hidden');
            document.getElementById('statsBar').classList.remove('hidden');
            document.getElementById('storyContainer').classList.remove('hidden');
            resetGameState();
            showChapter('start');
        }

        function restartGame() {
            resetGameState();
            closeModal();
            document.getElementById('statsBar').classList.remove('hidden');
            document.getElementById('storyContainer').classList.remove('hidden');
            showChapter('start');
        }

        function setupSoundToggle() {
            const soundToggle = document.getElementById('soundToggle');
            soundToggle.addEventListener('click', () => {
                gameState.soundEnabled = !gameState.soundEnabled;
                soundToggle.innerHTML = gameState.soundEnabled
                    ? '<i class="fas fa-volume-up"></i>'
                    : '<i class="fas fa-volume-mute"></i>';
                showNotification(gameState.soundEnabled ? 'Son activé' : 'Son coupé');
            });
        }

        function setupModal() {
            const modal = document.getElementById('infoModal');
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });

            window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeModal();
                }
            });
        }

        window.addEventListener('load', () => {
            resetGameState();
            createStars();
            createParticles();
            setupSoundToggle();
            setupModal();
        });
