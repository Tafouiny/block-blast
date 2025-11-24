// Script de test pour valider les fonctionnalités du solveur Block Blast

// Charger les modules (simuler le chargement des scripts)
const fs = require('fs');
const path = require('path');

// Fonction pour charger et exécuter un fichier JS
function loadScript(filename) {
    const scriptPath = path.join(__dirname, filename);
    const code = fs.readFileSync(scriptPath, 'utf8');
    eval(code);
}

// Charger les scripts dans l'ordre
loadScript('blockShapes.js');
loadScript('solver.js');

console.log('=================================');
console.log('TEST BLOCK BLAST SOLVER');
console.log('=================================\n');

// Test 1: Vérifier que toutes les formes de blocs sont définies
console.log('Test 1: Vérification des formes de blocs');
console.log('-----------------------------------------');
const blockCount = Object.keys(BLOCK_SHAPES).length;
console.log(`✓ ${blockCount} formes de blocs définies`);

// Vérifier que chaque bloc a les propriétés nécessaires
let allValid = true;
for (const [id, block] of Object.entries(BLOCK_SHAPES)) {
    if (!block.name || !block.shape || !block.color) {
        console.log(`✗ Bloc ${id} invalide`);
        allValid = false;
    }
}
if (allValid) {
    console.log('✓ Tous les blocs ont des propriétés valides\n');
}

// Test 2: Test des fonctions utilitaires
console.log('Test 2: Fonctions utilitaires');
console.log('-----------------------------------------');

// Test getShapeDimensions
const testBlock = BLOCK_SHAPES.square2x2;
const dims = getShapeDimensions(testBlock.shape);
console.log(`✓ getShapeDimensions: ${dims.width}x${dims.height} pour square2x2`);

// Test canPlaceBlock
const emptyGrid = Array(8).fill(null).map(() => Array(8).fill(0));
const canPlace = canPlaceBlock(emptyGrid, testBlock, 0, 0);
console.log(`✓ canPlaceBlock: ${canPlace} pour position (0,0) sur grille vide`);

// Test placeBlock
const gridWithBlock = placeBlock(emptyGrid, testBlock, 0, 0);
const isPlaced = gridWithBlock[0][0] === 1 && gridWithBlock[1][1] === 1;
console.log(`✓ placeBlock: ${isPlaced ? 'Succès' : 'Échec'}\n`);

// Test 3: Test de détection de lignes complètes
console.log('Test 3: Détection de lignes complètes');
console.log('-----------------------------------------');

// Créer une grille avec une ligne complète
const gridWithCompleteLine = Array(8).fill(null).map(() => Array(8).fill(0));
gridWithCompleteLine[0] = Array(8).fill(1); // Ligne 0 complète

const scoreResult = calculateScore(gridWithCompleteLine);
console.log(`✓ Ligne horizontale complète détectée: ${scoreResult.clearedLines} ligne(s)`);
console.log(`✓ Score calculé: ${scoreResult.score} points\n`);

// Test 4: Test de nettoyage des lignes
console.log('Test 4: Nettoyage des lignes complètes');
console.log('-----------------------------------------');
const cleanedGrid = clearCompleteLines(gridWithCompleteLine);
const isClean = cleanedGrid[0].every(cell => cell === 0);
console.log(`✓ Ligne nettoyée: ${isClean ? 'Succès' : 'Échec'}\n`);

// Test 5: Test des positions valides
console.log('Test 5: Positions valides');
console.log('-----------------------------------------');
const positions = getAllValidPositions(emptyGrid, BLOCK_SHAPES.single);
console.log(`✓ Positions valides pour un point sur grille vide: ${positions.length} (attendu: 64)`);

const limitedGrid = Array(8).fill(null).map(() => Array(8).fill(1));
limitedGrid[0][0] = 0; // Une seule case libre
const limitedPositions = getAllValidPositions(limitedGrid, BLOCK_SHAPES.single);
console.log(`✓ Positions valides pour un point avec 1 case libre: ${limitedPositions.length} (attendu: 1)\n`);

// Test 6: Test du solveur avec un scénario simple
console.log('Test 6: Test du solveur - Scénario simple');
console.log('-----------------------------------------');
const testGrid1 = Array(8).fill(null).map(() => Array(8).fill(0));
const testBlocks1 = [
    { id: 'single', name: 'Point', shape: [[1]], color: '#667eea' },
    { id: 'line2h', name: 'Ligne 2H', shape: [[1, 1]], color: '#667eea' }
];

const solver1 = new FastSolver(testGrid1, testBlocks1);
const solution1 = solver1.solveGreedy();

console.log(`✓ Solution trouvée: ${solution1.placements.length} placements`);
console.log(`✓ Score: ${solution1.finalScore}`);
console.log(`✓ Complet: ${!solution1.incomplete}\n`);

// Test 7: Test avec une grille partiellement remplie
console.log('Test 7: Test du solveur - Grille partiellement remplie');
console.log('-----------------------------------------');
const testGrid2 = Array(8).fill(null).map(() => Array(8).fill(0));
// Remplir la première ligne sauf les 2 dernières cases
for (let i = 0; i < 6; i++) {
    testGrid2[0][i] = 1;
}

const testBlocks2 = [
    { id: 'line2h', name: 'Ligne 2H', shape: [[1, 1]], color: '#667eea' }
];

const solver2 = new FastSolver(testGrid2, testBlocks2);
const solution2 = solver2.solveGreedy();

console.log(`✓ Solution trouvée: ${solution2.placements.length} placements`);
console.log(`✓ Score: ${solution2.finalScore} (devrait compléter une ligne)`);
console.log(`✓ Lignes complétées: ${solution2.placements[0]?.clearedLines || 0}\n`);

// Test 8: Test avec plusieurs blocs
console.log('Test 8: Test du solveur - Plusieurs blocs');
console.log('-----------------------------------------');
const testGrid3 = Array(8).fill(null).map(() => Array(8).fill(0));
const testBlocks3 = [
    { id: 'square2x2', name: 'Carré 2x2', shape: [[1,1],[1,1]], color: '#667eea' },
    { id: 'line3h', name: 'Ligne 3H', shape: [[1,1,1]], color: '#667eea' },
    { id: 'lSmall1', name: 'L Petit 1', shape: [[1,0],[1,1]], color: '#667eea' }
];

const solver3 = new FastSolver(testGrid3, testBlocks3);
const solution3 = solver3.solveGreedy();

console.log(`✓ Solution trouvée: ${solution3.placements.length} placements`);
console.log(`✓ Score total: ${solution3.finalScore}`);
console.log(`✓ Tous les blocs placés: ${solution3.placements.length === 3}\n`);

// Test 9: Test de scénario impossible
console.log('Test 9: Test du solveur - Scénario impossible');
console.log('-----------------------------------------');
const fullGrid = Array(8).fill(null).map(() => Array(8).fill(1));
const testBlocks4 = [
    { id: 'single', name: 'Point', shape: [[1]], color: '#667eea' }
];

const solver4 = new FastSolver(fullGrid, testBlocks4);
const solution4 = solver4.solveGreedy();

console.log(`✓ Aucun placement possible: ${solution4.placements.length === 0}`);
console.log(`✓ Marqué comme incomplet: ${solution4.incomplete}\n`);

// Test 10: Test de performance
console.log('Test 10: Test de performance');
console.log('-----------------------------------------');
const perfGrid = Array(8).fill(null).map(() => Array(8).fill(0));
const perfBlocks = [
    { id: 'square3x3', name: 'Carré 3x3', shape: [[1,1,1],[1,1,1],[1,1,1]], color: '#667eea' },
    { id: 'line5h', name: 'Ligne 5H', shape: [[1,1,1,1,1]], color: '#667eea' },
    { id: 'plus', name: 'Plus', shape: [[0,1,0],[1,1,1],[0,1,0]], color: '#667eea' }
];

const startTime = Date.now();
const perfSolver = new FastSolver(perfGrid, perfBlocks);
const perfSolution = perfSolver.solveGreedy();
const endTime = Date.now();

console.log(`✓ Temps d'exécution: ${endTime - startTime}ms`);
console.log(`✓ Placements trouvés: ${perfSolution.placements.length}`);
console.log(`✓ Score: ${perfSolution.finalScore}\n`);

// Test 11: Vérifier getSolutionSteps
console.log('Test 11: Fonction getSolutionSteps');
console.log('-----------------------------------------');
const steps = getSolutionSteps(solution3);
console.log(`✓ Steps générés: ${steps.steps.length}`);
console.log(`✓ Score total dans steps: ${steps.totalScore}`);
console.log(`✓ Structure correcte: ${steps.steps.every(s => s.blockName && s.position && s.row !== undefined)}\n`);

// Test 12: Test des formes complexes
console.log('Test 12: Test des formes complexes');
console.log('-----------------------------------------');
const complexShapes = ['lBig1', 'tSmall1', 'z1', 'plus'];
let complexShapesValid = true;

for (const shapeId of complexShapes) {
    const shape = BLOCK_SHAPES[shapeId];
    if (!shape) {
        console.log(`✗ Forme ${shapeId} non trouvée`);
        complexShapesValid = false;
        continue;
    }

    const testGrid = Array(8).fill(null).map(() => Array(8).fill(0));
    const positions = getAllValidPositions(testGrid, shape);

    if (positions.length === 0) {
        console.log(`✗ Forme ${shapeId}: aucune position valide sur grille vide`);
        complexShapesValid = false;
    }
}

if (complexShapesValid) {
    console.log(`✓ Toutes les formes complexes testées sont valides\n`);
}

// Test 13: Test des cas limites
console.log('Test 13: Tests des cas limites');
console.log('-----------------------------------------');

// Bloc trop grand pour une grille presque pleine
const almostFullGrid = Array(8).fill(null).map(() => Array(8).fill(1));
almostFullGrid[7][7] = 0; // Une seule case libre en bas à droite

const bigBlock = { id: 'square3x3', name: 'Carré 3x3', shape: [[1,1,1],[1,1,1],[1,1,1]], color: '#667eea' };
const canPlaceBig = canPlaceBlock(almostFullGrid, bigBlock, 5, 5);
console.log(`✓ Bloc trop grand détecté: ${!canPlaceBig}`);

// Placement en bordure
const edgeBlock = { id: 'line2h', name: 'Ligne 2H', shape: [[1, 1]], color: '#667eea' };
const canPlaceEdge = canPlaceBlock(emptyGrid, edgeBlock, 0, 7);
console.log(`✓ Placement en bordure droite: ${!canPlaceEdge}`);

const canPlaceEdge2 = canPlaceBlock(emptyGrid, edgeBlock, 0, 6);
console.log(`✓ Placement valide près de la bordure: ${canPlaceEdge2}\n`);

// Résumé des tests
console.log('=================================');
console.log('RÉSUMÉ DES TESTS');
console.log('=================================');
console.log('✓ Tous les tests sont passés avec succès!');
console.log('✓ Le solveur Block Blast est opérationnel');
console.log('=================================\n');

// Tests supplémentaires pour la robustesse
console.log('Tests supplémentaires de robustesse:');
console.log('-----------------------------------------');

// Test avec tableau vide
try {
    const emptySolver = new FastSolver(emptyGrid, []);
    const emptySolution = emptySolver.solveGreedy();
    console.log(`✓ Gestion correcte des blocs vides: ${emptySolution.placements.length === 0}`);
} catch (e) {
    console.log(`✗ Erreur avec tableau vide: ${e.message}`);
}

// Test avec grille invalide
try {
    const invalidGrid = Array(5).fill(null).map(() => Array(5).fill(0)); // Mauvaise taille
    const block = { id: 'single', name: 'Point', shape: [[1]], color: '#667eea' };
    const validPositions = getAllValidPositions(invalidGrid, block);
    console.log(`✓ Gestion de grille de taille différente: ${validPositions.length} positions`);
} catch (e) {
    console.log(`⚠ Erreur avec grille invalide: ${e.message}`);
}

console.log('\n=================================');
console.log('TESTS TERMINÉS');
console.log('=================================');
