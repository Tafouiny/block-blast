# Block Blast Solver

Un solveur intelligent pour le jeu mobile Block Blast qui vous aide à trouver les meilleurs placements pour vos blocs et maximiser votre score.

![Block Blast Solver](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-operational-success)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Fonctionnalités

- 🎮 **Interface interactive** - Configurez facilement l'état de votre grille 8x8
- 🧩 **36+ formes de blocs** - Toutes les variantes de blocs de Block Blast
- 🎯 **Algorithme optimisé** - Résolution rapide (< 100ms) avec heuristiques avancées
- 📊 **Visualisation claire** - Affichage visuel des placements sur la grille
- 💡 **Instructions détaillées** - Suggestions étape par étape avec positions exactes
- ⚡ **Performance** - Calcul instantané même pour configurations complexes
- 📱 **Responsive** - Fonctionne sur mobile, tablette et desktop

## 🚀 Démarrage rapide

### Méthode 1: Utilisation directe (Recommandé)
```bash
# Ouvrir directement dans le navigateur
start index.html
# ou double-cliquez sur index.html
```

### Méthode 2: Serveur local
```bash
# Avec npm
npm start

# Avec Python
python -m http.server 8080

# Avec http-server
npx http-server -p 8080 -o
```

Puis ouvrez `http://localhost:8080` dans votre navigateur.

## 📖 Guide d'utilisation

### Étape 1: Configurer la grille
- Cliquez sur les cases pour marquer celles qui sont déjà remplies dans votre jeu
- Case bleue = remplie, case blanche = vide
- Utilisez "Mode: Placer/Effacer" pour faciliter l'édition
- Bouton "Effacer la grille" pour recommencer

### Étape 2: Sélectionner vos blocs
- Choisissez jusqu'à 3 blocs parmi la palette (36+ formes disponibles)
- Cliquez pour sélectionner/désélectionner
- Les blocs sélectionnés apparaissent dans les slots

### Étape 3: Obtenir la solution
- Cliquez sur "🎯 Trouver la meilleure solution"
- Résultats affichés avec:
  - Ordre de placement optimal
  - Position exacte (ligne, colonne)
  - Score prévu pour chaque placement
  - Nombre de lignes complétées
  - Score total

### Étape 4: Appliquer dans Block Blast
- Suivez les instructions étape par étape
- Placez les blocs dans l'ordre indiqué
- Utilisez les positions exactes données

## 📁 Structure du projet

```
block-blast/
├── index.html          # Application principale
├── demo.html           # Guide et démonstration
├── test.html           # Tests automatiques
├── styles.css          # Styles et design
├── blockShapes.js      # Définitions des 36+ formes de blocs
├── solver.js           # Algorithmes de résolution
├── app.js              # Logique de l'interface utilisateur
├── verify.js           # Script de vérification
├── package.json        # Configuration npm
├── README.md           # Ce fichier
├── USAGE.md            # Guide détaillé d'utilisation
└── .gitignore          # Fichiers à ignorer par git
```

## 🧪 Tests

### Tests automatiques
```bash
# Ouvrir test.html dans le navigateur
start test.html
```

Les tests vérifient:
- ✓ 36+ formes de blocs définies
- ✓ Fonctions utilitaires (placement, détection)
- ✓ Algorithme de résolution
- ✓ Calcul de score
- ✓ Nettoyage des lignes
- ✓ Cas limites et erreurs

### Vérification du projet
```bash
node verify.js
```

Vérifie:
- Présence de tous les fichiers
- Syntaxe JavaScript
- Structure HTML
- Dépendances
- Statistiques du code

## 🔧 Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Algorithmes**: Exploration exhaustive + Greedy avec heuristiques
- **Design**: Responsive, dégradés modernes, animations CSS
- **Compatibilité**: Chrome, Firefox, Safari, Edge (versions récentes)

## 📊 Algorithme

Le solveur utilise deux approches complémentaires:

### 1. Exploration exhaustive (petits ensembles)
- Teste toutes les permutations de placement
- Garantit la solution optimale
- Utilisé pour 1-2 blocs

### 2. Approche Greedy (grands ensembles)
- Sélection du meilleur placement à chaque étape
- Très rapide (< 100ms)
- Solution quasi-optimale
- Heuristiques:
  - Priorité aux lignes presque complètes
  - Bonus pour la densité
  - Pénalité pour la fragmentation

## 🎨 Formes de blocs disponibles

- **Lignes**: 2H, 2V, 3H, 3V, 4H, 4V, 5H, 5V (8 variantes)
- **Carrés**: 2x2, 3x3 (2 variantes)
- **L**: Petits et grands, 8 orientations (12 variantes)
- **T**: 4 orientations (4 variantes)
- **Z**: 4 orientations (4 variantes)
- **Spéciales**: Plus, coins, etc. (6+ variantes)

**Total**: 36+ formes uniques

## 💡 Conseils d'utilisation

- Vérifiez toujours votre configuration de grille
- Identifiez précisément les formes de blocs
- Le solveur privilégie les combos de lignes
- Utilisez demo.html pour voir des exemples
- Consultez USAGE.md pour le guide détaillé

## 🐛 Résolution de problèmes

### Aucune solution trouvée
- Vérifiez que la grille est correctement configurée
- Assurez-vous d'avoir les bonnes formes de blocs
- Essayez avec moins de blocs

### Blocs manquants
- Consultez demo.html pour voir toutes les formes
- Certaines variantes sont similaires mais différentes

### Score différent
- Le scoring peut varier selon la version de Block Blast
- Le solveur utilise le système standard (10 pts/ligne + bonus)

## 📝 Licence

MIT License - Libre d'utilisation pour usage personnel et éducatif

## 🤝 Contribution

Les contributions sont bienvenues! N'hésitez pas à:
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer le code
- Ajouter plus de formes de blocs

## 📧 Support

Pour toute question ou problème:
1. Consultez USAGE.md pour le guide détaillé
2. Ouvrez test.html pour vérifier que tout fonctionne
3. Lancez verify.js pour diagnostiquer les problèmes

---

**Note**: Ce projet est un outil d'aide éducatif pour le jeu Block Blast. Utilisez-le pour apprendre et améliorer votre stratégie!
