# Base Anki 1000 Flashcards : Français Expert (C2 / Quasi-Natif)

Structure en **5 champs stricts** séparés par une **tabulation**, optimisée pour la répétition espacée et l'écoute audio (TTS).

---

## 📊 1. Répartition exacte des 1000 Cartes

| Catégorie | Cartes | Sujets clés couverts |
| :--- | :---: | :--- |
| **Orthographe grammaticale** | **200** | Accords complexes des participes passés (*avoir*, pronominaux, impersonnels, infinitifs, verbes de mesure), adjectifs de couleur simples et composés, pluriels particuliers, *tout*, *demi*, *nu*, *quel que*. |
| **Conjugaison et modes verbaux** | **150** | Subjonctif vs indicatif (*après que* vs *avant que*), subjonctif imparfait littéraire, passés simples rares, verbes défectifs (*sourdre*, *gésir*, *clore*, *traire*), conditionnel passé 2e forme. |
| **Syntaxe et construction** | **120** | Ordre des pronoms compléments, anacoluthes, zeugmes, *ne* explétif, inversions oratoires/littéraires, subordonnées corrélatives, répétitions prépositionnelles. |
| **Ponctuation et typographie** | **60** | Normes typographiques de l'Imprimerie nationale et de l'Académie, point-virgule, tirets cadratins de dialogue, majuscules aux gentilés et institutions, espaces insécables. |
| **Homophones et pièges lexicaux** | **120** | Distinctions étymologiques fines (*censé/sensé*, *détoner/détonner*, *session/cession*, *martyre/martyr*, *tribu/tribut*, *pers/pair*, *seing/sein*). |
| **Orthographe lexicale et exceptions** | **80** | Graphies trompeuses, doublement des consonnes, étymologies muettes (*legs*, *pouls*, *sculpteur*), noms à double genre, rectifications de 1990. |
| **Prononciation, liaisons et oral** | **100** | Liaisons obligatoires, interdites (*et*, *h aspiré*, singulier nominal), facultatives, enchaînements, prononciation des finales (*plus*, *tous*, *os*, *bœufs*, *août*, *faon*). |
| **Registre de langue et fautes orales** | **100** | Éradication des pléonasmes (*au jour d'aujourd'hui*, *voire même*, *s'avérer vrai*), barbarismes oraux (*pallier à*, *se rappeler de*, *aller au docteur*, *du coup*). |
| **Faux-amis et anglicismes à éviter** | **70** | Remplacement des calques contemporains (*digital*, *impacter*, *opportunité*, *initier*, *réaliser*, *briefer*, *définitivement*) par le vocabulaire français pur. |
| **TOTAL** | **1000** | **1000 cartes uniques validées sans aucune erreur de syntaxe** |

---

## 🗂️ 2. Structure des 5 Champs

Chaque ligne du fichier contient exactement 5 champs séparés par une **tabulation** :

1. **`Recto`** : Question courte, phrase à trou `{{c1::...}}`, phrase fautive ou consigne productive.
2. **`Verso`** : Réponse + règle concise en une phrase + exemple concret d'application.
3. **`Tag_catégorie`** : Nom de la catégorie thématique pour le filtrage et l'organisation dans Anki.
4. **`Type_de_carte`** : Type pédagogique (`Cloze`, `QR_directe`, `Chasse_erreur`, `QCM`, `Paires_minimales`, `Mnémotechnique`, `Avant_Apres`, `Application`).
5. **`Texte_audio`** : Texte épuré pour la lecture à voix haute / synthèse vocale TTS pour les cartes orales, liaisons, phonétique et homophones (ou `-` si non pertinent).

---

## 📥 3. Procédure d'importation dans Anki

1. Ouvre **Anki** > Clique sur **Fichier > Importer...** (`Ctrl + I`).
2. Sélectionne le fichier `Anki_Francais_Expert_C2_1000_cartes.tsv`.
3. Assure-toi que le séparateur détecté est **Tabulation**.
4. Configure le mappage des 5 champs :
   - Champ 1 ➔ `Recto` (ou `Texte` pour le modèle Cloze)
   - Champ 2 ➔ `Verso` (ou `Extra`)
   - Champ 3 ➔ `Tags`
   - Champ 4 ➔ `Type_de_carte`
   - Champ 5 ➔ `Texte_audio` *(activable avec AwesomeTTS ou synthèse vocale)*
5. Clique sur **Importer** !
