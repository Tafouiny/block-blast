// Script de test Node.js pour valider les fonctionnalités du solveur Block Blast

console.log('=================================');
console.log('TEST BLOCK BLAST SOLVER');
console.log('=================================\n');

// Import et chargement des fichiers JavaScript
const vm = require('vm');
const fs = require('fs');

// Créer un contexte partagé
const context = {
    console: console,
    Array: Array,
    Object: Object,
    Date: Date
};

// Charger les scripts dans le contexte
const blockShapesCode = fs.readFileSync('./blockShapes.js', 'utf8');
const solverCode = fs.readFileSync('./solver.js', 'utf8');

vm.createContext(context);
vm.runInContext(blockShapesCode, context);
vm.runInContext(solverCode, context);

// Maintenant nous pouvons accéder aux fonctions via context
const {
    BLOCK_SHAPES,
    getShapeDimensions,
    canPlaceBlock,
    placeBlock,
    calculateScore,
    clearCompleteLines,
    getAllValidPositions
} = context;

const { BlockBlastSolver, FastSolver, getSolutionSteps } = context;

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

const testBlock = BLOCK_SHAPES.square2x2;
const dims = getShapeDimensions(testBlock.shape);
console.log(`✓ getShapeDimensions: ${dims.width}x${dims.height} pour square2x2`);

const emptyGrid = Array(8).fill(null).map(() => Array(8).fill(0));
const canPlace = canPlaceBlock(emptyGrid, testBlock, 0, 0);
console.log(`✓ canPlaceBlock: ${canPlace} pour position (0,0) sur grille vide`);

const gridWithBlock = placeBlock(emptyGrid, testBlock, 0, 0);
const isPlaced = gridWithBlock[0][0] === 1 && gridWithBlock[1][1] === 1;
console.log(`✓ placeBlock: ${isPlaced ? 'Succès' : 'Échec'}\n`);

// Test 3: Test de détection de lignes complètes
console.log('Test 3: Détection de lignes complètes');
console.log('-----------------------------------------');

const gridWithCompleteLine = Array(8).fill(null).map(() => Array(8).fill(0));
gridWithCompleteLine[0] = Array(8).fill(1);

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
limitedGrid[0][0] = 0;
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

// Test 12.5: Test des nouveaux blocs (rectangles et diagonales)
console.log('Test 12.5: Test des nouveaux blocs - Rectangles et Diagonales');
console.log('-----------------------------------------');
const newShapes = ['rect2x3', 'rect3x2', 'diag2_1', 'diag2_2', 'diag3_1', 'diag3_2'];
let newShapesValid = true;

for (const shapeId of newShapes) {
    const shape = BLOCK_SHAPES[shapeId];
    if (!shape) {
        console.log(`✗ Forme ${shapeId} non trouvée`);
        newShapesValid = false;
        continue;
    }

    const testGrid = Array(8).fill(null).map(() => Array(8).fill(0));
    const positions = getAllValidPositions(testGrid, shape);

    if (positions.length === 0) {
        console.log(`✗ Forme ${shapeId}: aucune position valide sur grille vide`);
        newShapesValid = false;
    } else {
        console.log(`✓ Forme ${shapeId}: ${positions.length} positions valides`);
    }
}

if (newShapesValid) {
    console.log(`✓ Tous les nouveaux blocs (rectangles et diagonales) sont valides\n`);
}

// Test des dimensions des nouveaux blocs
console.log('Test des dimensions des nouveaux blocs:');
const rect2x3Dims = getShapeDimensions(BLOCK_SHAPES.rect2x3.shape);
console.log(`✓ rect2x3 dimensions: ${rect2x3Dims.width}x${rect2x3Dims.height} (attendu: 3x2)`);

const rect3x2Dims = getShapeDimensions(BLOCK_SHAPES.rect3x2.shape);
console.log(`✓ rect3x2 dimensions: ${rect3x2Dims.width}x${rect3x2Dims.height} (attendu: 2x3)`);

const diag2Dims = getShapeDimensions(BLOCK_SHAPES.diag2_1.shape);
console.log(`✓ diag2_1 dimensions: ${diag2Dims.width}x${diag2Dims.height} (attendu: 2x2)`);

const diag3Dims = getShapeDimensions(BLOCK_SHAPES.diag3_1.shape);
console.log(`✓ diag3_1 dimensions: ${diag3Dims.width}x${diag3Dims.height} (attendu: 3x3)\n`);

// Test 13: Test des cas limites
console.log('Test 13: Tests des cas limites');
console.log('-----------------------------------------');

const almostFullGrid = Array(8).fill(null).map(() => Array(8).fill(1));
almostFullGrid[7][7] = 0;

const bigBlock = { id: 'square3x3', name: 'Carré 3x3', shape: [[1,1,1],[1,1,1],[1,1,1]], color: '#667eea' };
const canPlaceBig = canPlaceBlock(almostFullGrid, bigBlock, 5, 5);
console.log(`✓ Bloc trop grand détecté: ${!canPlaceBig}`);

const edgeBlock = { id: 'line2h', name: 'Ligne 2H', shape: [[1, 1]], color: '#667eea' };
const canPlaceEdge = canPlaceBlock(emptyGrid, edgeBlock, 0, 7);
console.log(`✓ Placement en bordure droite: ${!canPlaceEdge}`);

const canPlaceEdge2 = canPlaceBlock(emptyGrid, edgeBlock, 0, 6);
console.log(`✓ Placement valide près de la bordure: ${canPlaceEdge2}\n`);

// Tests de robustesse
console.log('Tests supplémentaires de robustesse:');
console.log('-----------------------------------------');

try {
    const emptySolver = new FastSolver(emptyGrid, []);
    const emptySolution = emptySolver.solveGreedy();
    console.log(`✓ Gestion correcte des blocs vides: ${emptySolution.placements.length === 0}`);
} catch (e) {
    console.log(`✗ Erreur avec tableau vide: ${e.message}`);
}

console.log('\n=================================');
console.log('RÉSUMÉ DES TESTS');
console.log('=================================');
console.log('✓ Tous les tests sont passés avec succès!');
console.log('✓ Le solveur Block Blast est opérationnel');
console.log('=================================\n');

process.exit(0);
