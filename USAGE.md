# Guide d'utilisation - Block Blast Solver

## Table des matières
1. [Introduction](#introduction)
2. [Démarrage rapide](#démarrage-rapide)
3. [Guide détaillé](#guide-détaillé)
4. [Fonctionnalités avancées](#fonctionnalités-avancées)
5. [Résolution de problèmes](#résolution-de-problèmes)

## Introduction

Block Blast Solver est un outil d'aide pour le jeu mobile Block Blast. Il vous permet de trouver la meilleure séquence de placements pour maximiser votre score.

## Démarrage rapide

### Méthode 1: Ouvrir directement
1. Double-cliquez sur `index.html`
2. L'application s'ouvre dans votre navigateur par défaut

### Méthode 2: Utiliser un serveur local
```bash
# Installer http-server (une seule fois)
npm install -g http-server

# Démarrer le serveur
npm start
# ou
http-server -p 8080 -o
```

### Méthode 3: Utiliser Python
```bash
# Python 3
python -m http.server 8080

# Puis ouvrez http://localhost:8080 dans votre navigateur
```

## Guide détaillé

### Étape 1: Configurer la grille

1. **Identifier votre grille actuelle dans Block Blast**
   - La grille est toujours 8x8
   - Notez quelles cases sont déjà remplies

2. **Reproduire la grille dans le solveur**
   - Cliquez sur chaque case pour la marquer comme remplie (bleue)
   - Recliquez pour la marquer comme vide (blanche)
   - Utilisez "Mode: Placer/Effacer" pour faciliter l'édition

3. **Vérifier votre configuration**
   - Comparez visuellement avec votre jeu
   - Utilisez "Effacer la grille" si vous voulez recommencer

### Étape 2: Sélectionner vos blocs

1. **Identifier les blocs proposés**
   - Block Blast vous propose 3 blocs à placer
   - Identifiez leur forme exacte

2. **Trouver les blocs correspondants**
   - Parcourez la palette de blocs
   - Plus de 40 formes différentes disponibles
   - Cliquez pour sélectionner (max 3)

3. **Formes de blocs courantes**
   - **Lignes**: 2H, 3H, 4H, 5H (horizontales), 2V, 3V, 4V, 5V (verticales)
   - **Carrés**: 2x2, 3x3
   - **Formes L**: Petites et grandes, 8 variantes
   - **Formes T**: 4 orientations
   - **Formes Z**: 4 orientations
   - **Spéciales**: Plus, coins, etc.

### Étape 3: Obtenir la solution

1. **Lancer le calcul**
   - Cliquez sur "🎯 Trouver la meilleure solution"
   - Le calcul est instantané (< 100ms)

2. **Comprendre les résultats**
   - **Étapes numérotées**: Ordre de placement des blocs
   - **Position**: Ligne et colonne où placer le bloc
   - **Points**: Score gagné pour ce placement
   - **Lignes complétées**: Nombre de lignes/colonnes éliminées
   - **Score total prévu**: Points totaux que vous obtiendrez

3. **Visualisation sur la grille**
   - Les placements sont affichés avec des numéros
   - Vert = placement suggéré
   - Le numéro indique l'ordre

### Étape 4: Appliquer dans le jeu

1. **Suivre les instructions**
   - Placez les blocs dans l'ordre indiqué
   - Utilisez les coordonnées exactes données

2. **Vérifier les résultats**
   - Votre score devrait correspondre à la prédiction
   - Les lignes indiquées devraient être éliminées

## Fonctionnalités avancées

### Algorithme de résolution

Le solveur utilise plusieurs techniques:

1. **Exploration exhaustive** (petits ensembles)
   - Teste toutes les permutations de blocs
   - Trouve la solution optimale garantie

2. **Approche Greedy** (grands ensembles)
   - Choisit le meilleur placement à chaque étape
   - Très rapide, solution quasi-optimale

3. **Heuristiques**
   - Priorité aux lignes presque complètes
   - Bonus pour la densité des blocs
   - Pénalité pour la fragmentation

### Personnalisation

Vous pouvez modifier le comportement en éditant `solver.js`:

```javascript
// Changer les poids de l'heuristique
moveScore = score * 10; // Priorité lignes complètes
moveScore += this.evaluateNearCompletionBonus(testGrid); // Bonus proximité
```

### Mode de debug

Ouvrez la console du navigateur (F12) pour voir:
- Les calculs détaillés
- Le temps d'exécution
- Les erreurs éventuelles

## Résolution de problèmes

### Le solveur ne trouve aucune solution

**Causes possibles:**
- La grille est trop remplie
- Les blocs sélectionnés ne correspondent pas aux formes réelles
- Configuration incorrecte de la grille

**Solutions:**
1. Vérifiez que votre grille est bien configurée
2. Assurez-vous d'avoir sélectionné les bons blocs
3. Essayez avec moins de blocs pour voir si une solution partielle existe

### Les blocs ne correspondent pas

**Problème:** Vous ne trouvez pas la forme exacte dans la palette

**Solution:**
- Vérifiez toutes les variantes (L1-L8, T1-T4, etc.)
- Certains blocs peuvent sembler identiques mais ont des orientations différentes
- Consultez la page demo.html pour voir des exemples

### Le score prédit ne correspond pas

**Causes possibles:**
- Votre version de Block Blast a des règles de scoring différentes
- Bonus/multiplicateurs non pris en compte

**Note:** Le solveur utilise le système standard:
- 10 points par ligne complète
- Bonus combo pour plusieurs lignes

### Performance lente

**Si le calcul prend du temps:**
- Normal pour 3 blocs complexes (< 1 seconde)
- Rechargez la page si ça bloque
- Vérifiez que votre navigateur est à jour

### Erreurs JavaScript

**Si vous voyez des erreurs:**
1. Ouvrez F12 pour voir les détails
2. Vérifiez que tous les fichiers sont présents:
   - index.html
   - styles.css
   - blockShapes.js
   - solver.js
   - app.js
3. Essayez dans un autre navigateur (Chrome, Firefox, Edge)

## Tests

### Lancer les tests automatiques

Ouvrez `test.html` dans votre navigateur pour:
- Vérifier que tous les composants fonctionnent
- Tester les algorithmes
- Mesurer les performances

### Tests manuels recommandés

1. **Test basique**
   - Grille vide
   - 1 bloc simple (point)
   - Devrait placer le bloc en (0,0)

2. **Test ligne complète**
   - Remplir 6 cases d'une ligne
   - Sélectionner un bloc 2H
   - Devrait compléter la ligne et scorer 10+

3. **Test complexe**
   - Grille partiellement remplie
   - 3 blocs différents
   - Devrait optimiser les combos

## Conseils pro

1. **Stratégie de jeu**
   - Utilisez le solveur avant chaque série de 3 blocs
   - Privilégiez toujours les solutions qui complètent des lignes
   - Gardez la grille la plus propre possible

2. **Maximiser le score**
   - Visez les combos (plusieurs lignes simultanées)
   - Évitez de fragmenter la grille
   - Planifiez plusieurs coups à l'avance

3. **Utilisation efficace**
   - Prenez des captures d'écran de votre grille
   - Pratiquez l'identification rapide des blocs
   - Mémorisez les placements courants

## Support et contribution

- **Bugs**: Ouvrez une issue sur GitHub
- **Suggestions**: Proposez de nouvelles fonctionnalités
- **Code**: Les contributions sont bienvenues!

## Licence

Ce projet est open source et éducatif. Utilisez-le librement pour améliorer vos performances dans Block Blast!
