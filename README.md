# 📘 Référence C — Learn C

Une référence interactive et complète du langage C, conçue pour les développeurs qui veulent un accès rapide aux concepts essentiels du C.  
Thème sombre inspiré de VS Code / GitHub Dark, entièrement en vanilla HTML/CSS/JS — aucune dépendance.

---

## ✨ Fonctionnalités

- **Recherche en temps réel** — filtre instantanément les sections par mot-clé (avec gestion des accents)
- **Navigation latérale** — sidebar fixe avec liens ancrés vers chaque section
- **Mise en évidence active** — le lien nav se met en surbrillance selon la section visible à l'écran
- **Raccourcis clavier** — `/` pour focus la barre de recherche, `Escape` pour vider, `Enter` pour sauter au premier résultat
- **Bouton Scroll to Top** — apparaît après 300px de défilement
- **Responsive** — s'adapte aux mobiles et tablettes
- **100% statique** — aucune dépendance, aucun framework, aucun build nécessaire

---

## 📂 Structure du projet

```
learn-c/
├── index.html   # Contenu principal (sections de référence C)
├── style.css    # Thème sombre & mise en page
└── script.js    # Recherche, navigation, interactions
```

---

## 🚀 Utilisation

Cloner le dépôt et ouvrir `index.html` dans un navigateur — c'est tout.

```bash
git clone https://github.com/mtbeard/learn-c.git
cd learn-c
# Ouvrir index.html dans ton navigateur
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Ou simplement déposer le dossier dans **GitHub Pages** / **Netlify** pour un hébergement instantané.

---

## 📖 Sujets couverts

Les grandes catégories de la référence incluent (entre autres) :

- Types de données, variables et constantes
- Opérateurs et expressions
- Structures de contrôle (`if`, `switch`, boucles)
- Fonctions et portée
- Tableaux et chaînes de caractères
- Pointeurs et gestion mémoire (`malloc`, `free`, etc.)
- Structures (`struct`) et unions
- Entrées/sorties (`printf`, `scanf`, fichiers)
- Préprocesseur et directives (`#define`, `#include`)
- Bonnes pratiques et pièges courants

---

## 🛠️ Personnalisation

Toute la syntaxe colorée est gérée via des classes CSS (`c-keyword`, `c-type`, `c-func`, etc.) définies dans `style.css`.  
Pour ajouter une nouvelle section, il suffit d'ajouter une `<div class="card" id="ma-section">` dans `index.html`.

---

## 📄 Licence

MIT — libre d'utilisation, de modification et de distribution.
