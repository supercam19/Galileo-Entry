export interface TranslationDict {
  [key: string]: string | TranslationDict;
}

export type Lang = 'en' | 'fr';

export const translations: Record<Lang, TranslationDict> = {
  en: {
    nav: {
      overview: 'Overview',
      instruments: 'Instrumentation',
      charts: 'Charts',
        descent: "Descent",
    },
    topbar: {
      mission: 'Galileo Atmospheric Probe',
      tagline: 'Entry interface',
    },
    hero: {
      eyebrow: 'Entry telemetry archive',
      titleLine1: "Galileo's Final Descent",
      titleLine2: 'Probing Jupiter',
      body: 'On 7 December 1995, a 339-kilogram probe hit Jupiter\u2019s atmosphere faster than anything humans had built before. Three accelerometers on its heat shield recorded every jolt of the fall. This dashboard turns that raw telemetry into something you can actually read.',
      statVelocity: 'Entry velocity',
      statPeakG: 'Peak deceleration',
      statDuration: 'Signal duration',
      orbCaption: 'From Hubble Space Telescope · NASA',
    },
    instruments: {
      eyebrow: 'Instrumentation',
      title: 'Three sensors, one violent descent',
      intro: 'The Atmospheric Structure Instrument carried two axial accelerometers and a pair of lateral sensors, each switching automatically between measurement ranges as the deceleration grew from a whisper to 228 g.',
      rangesLabel: 'Measurement ranges (m/s\u00b2)',
      resolutionLabel: 'res.',
      z1: {
        code: 'Z1',
        name: 'Primary axial sensor',
        description: 'Recorded deceleration along the probe\u2019s main axis for the full length of entry.',
      },
      z2: {
        code: 'Z2',
        name: 'Secondary axial sensor',
        description: 'A backup axial channel, offset slightly in calibration from Z1, recording the same fall.',
      },
      lat: {
        code: 'LAT',
        name: 'Lateral sensors',
        description: 'Combined the two side-facing accelerometers into a single resultant magnitude.',
      },
    },
    charts: {
      eyebrow: 'Chart bay',
      title: 'Two views into the fall',
      chart1Title: 'Deceleration profile',
      chart1Body: 'Axial acceleration recorded by Z1 and Z2 across the entry sequence, log-scaled to show the full climb from calm cruise to peak deceleration.',
      chart2Title: 'Range coverage',
      chart2Body: 'How many recorded samples on each channel fall within every documented measurement range.',
      status: 'Awaiting dataset',
      timeAxis: 'Time (s)',
      accelAxis: 'Acceleration (m/s\u00b2)',
      scaleLinear: 'Linear',
      scaleLog: 'Log',
      hideFlagged: 'Hide flagged samples',
      suspectNote: 'Points outlined in red are flagged in the ASI documentation as likely range-change artifacts.',
      countMode: 'Count',
      shareMode: 'Share of samples',
      samplesLabel: 'samples',
      rangeAxis: 'Range',
    },
      descent: {
          eyebrow: 'How Deep It Got',
          title: 'How far into Jupiter did the probe get?',
          intro: 'Using its temperature and pressure readings, scientists worked out how deep the probe fell before its signal cut out. That distance turns out to be tiny compared to the size of Jupiter itself.',
          statDepth: 'Depth reached',
          statShare: '% of Jupiter\u2019s radius',
          statPressure: 'Pressure at that depth',
          deploy: 'Parachute opens',
          plus100s: '100 seconds later',
          threeBar: 'Passes 3 bar of pressure \u2014 three times Earth\u2019s sea-level air pressure',
          lossOfSignal: 'Signal lost \u2014 about 24 bar, 160 km down',
          scaleLabel: 'Jupiter\u2019s edge, up close',
          scaleCaption: 'The straight drop shown here is simplified for clarity \u2014 the real probe entered at a shallow angle, not straight down. Illustrative only.',
          zoomCaption: '0\u2013200 km, magnified',
          ofRadius: 'of Jupiter\u2019s radius',
          lossOfSignalShort: 'Loss of signal',
          magnificationLabel: '\u2248{value}\u00d7 magnification',
          footnote: 'Depth is an estimate, calculated from the probe\u2019s temperature and pressure readings assuming the atmosphere was in balance (hydrostatic equilibrium).',
      },


      footer: {
          citation: 'Data described from Knight, Tony, (1996), Galileo Probe ASI Raw Data Archive, PDS Atmospheres (ATM) Node',
          credit: 'Designed by Cameron Labelle',
        },
  },
  fr: {
    nav: {
      overview: 'Aper\u00e7u',
      instruments: 'Instrumentation',
      charts: 'Graphiques',
        descent: "Descente",
    },
    topbar: {
      mission: 'Sonde atmosph\u00e9rique Galileo',
      tagline: 'Interface d\u2019entr\u00e9e',
    },
    hero: {
      eyebrow: 'Archive de t\u00e9l\u00e9m\u00e9trie d\u2019entr\u00e9e',
      titleLine1: 'La descente finale de Galileo',
      titleLine2: 'Sonder Jupiter',
      body: 'Le 7 d\u00e9cembre 1995, une sonde de 339 kilogrammes a percut\u00e9 l\u2019atmosph\u00e8re de Jupiter plus vite que tout ce que l\u2019humain avait construit auparavant. Trois acc\u00e9l\u00e9rom\u00e8tres fix\u00e9s \u00e0 son bouclier thermique ont enregistr\u00e9 chaque secousse de la chute. Ce tableau de bord transforme cette t\u00e9l\u00e9m\u00e9trie brute en quelque chose de lisible.',
      statVelocity: 'Vitesse d\u2019entr\u00e9e',
      statPeakG: 'D\u00e9c\u00e9l\u00e9ration maximale',
      statDuration: 'Dur\u00e9e du signal',
      orbCaption: 'De télescope spatial Hubble · NASA',
    },
    instruments: {
      eyebrow: 'Instrumentation',
      title: 'Trois capteurs, une descente brutale',
      intro: 'L\u2019instrument de structure atmosph\u00e9rique embarquait deux acc\u00e9l\u00e9rom\u00e8tres axiaux et une paire de capteurs lat\u00e9raux, changeant automatiquement de plage de mesure \u00e0 mesure que la d\u00e9c\u00e9l\u00e9ration grimpait jusqu\u2019\u00e0 228 g.',
      rangesLabel: 'Plages de mesure (m/s\u00b2)',
      resolutionLabel: 'r\u00e9s.',
      z1: {
        code: 'Z1',
        name: 'Capteur axial principal',
        description: 'A enregistr\u00e9 la d\u00e9c\u00e9l\u00e9ration le long de l\u2019axe principal de la sonde pendant toute l\u2019entr\u00e9e.',
      },
      z2: {
        code: 'Z2',
        name: 'Capteur axial secondaire',
        description: 'Un canal axial de secours, l\u00e9g\u00e8rement d\u00e9cal\u00e9 en calibration par rapport \u00e0 Z1, enregistrant la m\u00eame chute.',
      },
      lat: {
        code: 'LAT',
        name: 'Capteurs lat\u00e9raux',
        description: 'Combinaient les deux acc\u00e9l\u00e9rom\u00e8tres orient\u00e9s sur les c\u00f4t\u00e9s en une seule magnitude r\u00e9sultante.',
      },
    },
    charts: {
      eyebrow: 'Baie de graphiques',
      title: 'Deux perspectives sur la chute',
      chart1Title: 'Profil de d\u00e9c\u00e9l\u00e9ration',
      chart1Body: 'Acc\u00e9l\u00e9ration axiale enregistr\u00e9e par Z1 et Z2 pendant la s\u00e9quence d\u2019entr\u00e9e, en \u00e9chelle logarithmique pour montrer toute la mont\u00e9e jusqu\u2019\u00e0 la d\u00e9c\u00e9l\u00e9ration maximale.',
      chart2Title: 'Couverture des plages',
      chart2Body: 'Le nombre d\u2019\u00e9chantillons enregistr\u00e9s par chaque capteur qui se situent dans chacune des plages de mesure document\u00e9es.',
      status: 'En attente des donn\u00e9es',
      timeAxis: 'Temps (s)',
      accelAxis: 'Acc\u00e9l\u00e9ration (m/s\u00b2)',
      scaleLinear: 'Lin\u00e9aire',
      scaleLog: 'Log',
      hideFlagged: 'Masquer les \u00e9chantillons signal\u00e9s',
      suspectNote: 'Les points encercl\u00e9s en rouge sont signal\u00e9s dans la documentation ASI comme probables artefacts de changement de plage.',
      countMode: 'Nombre',
      shareMode: 'Part des \u00e9chantillons',
      samplesLabel: '\u00e9chantillons',
      rangeAxis: 'Plage',
    },
      descent: {
          eyebrow: 'La profondeur atteinte',
          title: 'Jusqu\u2019o\u00f9 la sonde est-elle all\u00e9e dans Jupiter\u00a0?',
          intro: '\u00c0 partir de ses mesures de temp\u00e9rature et de pression, les scientifiques ont calcul\u00e9 la profondeur atteinte par la sonde avant la perte du signal. Cette distance est minuscule compar\u00e9e \u00e0 la taille de Jupiter.',
          statDepth: 'Profondeur atteinte',
          statShare: '% du rayon de Jupiter',
          statPressure: 'Pression \u00e0 cette profondeur',
          deploy: 'Ouverture du parachute',
          plus100s: '100 secondes plus tard',
          threeBar: 'Passe 3 bars de pression \u2014 trois fois la pression de l\u2019air au niveau de la mer sur Terre',
          lossOfSignal: 'Signal perdu \u2014 environ 24 bars, 160 km plus bas',
          scaleLabel: 'Le bord de Jupiter, de pr\u00e8s',
          scaleCaption: 'La chute verticale illustr\u00e9e ici est simplifi\u00e9e \u2014 la sonde r\u00e9elle est entr\u00e9e selon un angle tr\u00e8s inclin\u00e9, pas \u00e0 la verticale. \u00c0 titre illustratif seulement.',
          zoomCaption: '0\u2013200 km, agrandi',
          ofRadius: 'du rayon de Jupiter',
          lossOfSignalShort: 'Signal perdu',
          magnificationLabel: 'Grossissement \u2248{value}\u00d7',
          footnote: 'La profondeur est une estimation, calcul\u00e9e \u00e0 partir des mesures de temp\u00e9rature et de pression de la sonde, en supposant que l\u2019atmosph\u00e8re \u00e9tait en \u00e9quilibre (\u00e9quilibre hydrostatique).',
      },





      footer: {
          citation: 'Données décrites par Knight, Tony (1996), Galileo Probe ASI Raw Data Archive, nœud PDS Atmospheres (ATM).',
          credit: 'Con\u00e7u par Cameron Labelle',
        },
  },
};
