// Définitions de toutes les formes de blocs disponibles dans Block Blast
const BLOCK_SHAPES = {
    // Blocs simples
    single: {
        name: 'Point',
        shape: [[1]],
        color: '#667eea'
    },

    // Lignes
    line2h: {
        name: 'Ligne 2H',
        shape: [[1, 1]],
        color: '#667eea'
    },
    line2v: {
        name: 'Ligne 2V',
        shape: [[1], [1]],
        color: '#667eea'
    },
    line3h: {
        name: 'Ligne 3H',
        shape: [[1, 1, 1]],
        color: '#667eea'
    },
    line3v: {
        name: 'Ligne 3V',
        shape: [[1], [1], [1]],
        color: '#667eea'
    },
    line4h: {
        name: 'Ligne 4H',
        shape: [[1, 1, 1, 1]],
        color: '#667eea'
    },
    line4v: {
        name: 'Ligne 4V',
        shape: [[1], [1], [1], [1]],
        color: '#667eea'
    },
    line5h: {
        name: 'Ligne 5H',
        shape: [[1, 1, 1, 1, 1]],
        color: '#667eea'
    },
    line5v: {
        name: 'Ligne 5V',
        shape: [[1], [1], [1], [1], [1]],
        color: '#667eea'
    },

    // Carrés
    square2x2: {
        name: 'Carré 2x2',
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#667eea'
    },
    square3x3: {
        name: 'Carré 3x3',
        shape: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ],
        color: '#667eea'
    },

    // Rectangles
    rect2x3: {
        name: 'Rectangle 2x3',
        shape: [
            [1, 1, 1],
            [1, 1, 1]
        ],
        color: '#667eea'
    },
    rect3x2: {
        name: 'Rectangle 3x2',
        shape: [
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        color: '#667eea'
    },

    // Diagonales taille 2
    diag2_1: {
        name: 'Diagonale 2-1',
        shape: [
            [1, 0],
            [0, 1]
        ],
        color: '#667eea'
    },
    diag2_2: {
        name: 'Diagonale 2-2',
        shape: [
            [0, 1],
            [1, 0]
        ],
        color: '#667eea'
    },

    // Diagonales taille 3
    diag3_1: {
        name: 'Diagonale 3-1',
        shape: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        color: '#667eea'
    },
    diag3_2: {
        name: 'Diagonale 3-2',
        shape: [
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0]
        ],
        color: '#667eea'
    },

    // Formes L
    lSmall1: {
        name: 'L Petit 1',
        shape: [
            [1, 0],
            [1, 1]
        ],
        color: '#667eea'
    },
    lSmall2: {
        name: 'L Petit 2',
        shape: [
            [1, 1],
            [1, 0]
        ],
        color: '#667eea'
    },
    lSmall3: {
        name: 'L Petit 3',
        shape: [
            [0, 1],
            [1, 1]
        ],
        color: '#667eea'
    },
    lSmall4: {
        name: 'L Petit 4',
        shape: [
            [1, 1],
            [0, 1]
        ],
        color: '#667eea'
    },

    lBig1: {
        name: 'L Grand 1',
        shape: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#667eea'
    },
    lBig2: {
        name: 'L Grand 2',
        shape: [
            [1, 1, 1],
            [1, 0, 0],
            [1, 0, 0]
        ],
        color: '#667eea'
    },
    lBig3: {
        name: 'L Grand 3',
        shape: [
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#667eea'
    },
    lBig4: {
        name: 'L Grand 4',
        shape: [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        color: '#667eea'
    },
    lBig5: {
        name: 'L Grand 5',
        shape: [
            [1, 1, 1],
            [1, 0, 0]
        ],
        color: '#667eea'
    },
    lBig6: {
        name: 'L Grand 6',
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#667eea'
    },
    lBig7: {
        name: 'L Grand 7',
        shape: [
            [1, 1, 1],
            [0, 0, 1]
        ],
        color: '#667eea'
    },
    lBig8: {
        name: 'L Grand 8',
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#667eea'
    },
    lBig9: {
        name: 'L Grand 9',
        shape: [
            [1, 1],
            [1, 0],
            [1, 0]
        ],
        color: '#667eea'
    },
    lBig10: {
        name: 'L Grand 10',
        shape: [
            [1, 0],
            [1, 0],
            [1, 1]
        ],
        color: '#667eea'
    },
    lBig11: {
        name: 'L Grand 11',
        shape: [
            [1, 1],
            [0, 1],
            [0, 1]
        ],
        color: '#667eea'
    },
    lBig12: {
        name: 'L Grand 12',
        shape: [
            [0, 1],
            [0, 1],
            [1, 1]
        ],
        color: '#667eea'
    },

    // Formes T
    tSmall1: {
        name: 'T Petit 1',
        shape: [
            [1, 1, 1],
            [0, 1, 0]
        ],
        color: '#667eea'
    },
    tSmall2: {
        name: 'T Petit 2',
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        color: '#667eea'
    },
    tSmall3: {
        name: 'T Petit 3',
        shape: [
            [1, 0],
            [1, 1],
            [1, 0]
        ],
        color: '#667eea'
    },
    tSmall4: {
        name: 'T Petit 4',
        shape: [
            [0, 1],
            [1, 1],
            [0, 1]
        ],
        color: '#667eea'
    },

    // Formes Z
    z1: {
        name: 'Z 1',
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: '#667eea'
    },
    z2: {
        name: 'Z 2',
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: '#667eea'
    },
    z3: {
        name: 'Z 3',
        shape: [
            [0, 1],
            [1, 1],
            [1, 0]
        ],
        color: '#667eea'
    },
    z4: {
        name: 'Z 4',
        shape: [
            [1, 0],
            [1, 1],
            [0, 1]
        ],
        color: '#667eea'
    },

    // Autres formes
    plus: {
        name: 'Plus',
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        color: '#667eea'
    },
    corner2x2_1: {
        name: 'Coin 1',
        shape: [
            [1, 1],
            [1, 0]
        ],
        color: '#667eea'
    },
    corner2x2_2: {
        name: 'Coin 2',
        shape: [
            [1, 1],
            [0, 1]
        ],
        color: '#667eea'
    },
    corner2x2_3: {
        name: 'Coin 3',
        shape: [
            [1, 0],
            [1, 1]
        ],
        color: '#667eea'
    },
    corner2x2_4: {
        name: 'Coin 4',
        shape: [
            [0, 1],
            [1, 1]
        ],
        color: '#667eea'
    }
};

// Fonction pour obtenir les dimensions d'une forme
function getShapeDimensions(shape) {
    const height = shape.length;
    const width = shape[0].length;
    return { width, height };
}

// Fonction pour vérifier si un bloc peut être placé à une position donnée
function canPlaceBlock(grid, block, row, col) {
    const shape = block.shape;
    const { height, width } = getShapeDimensions(shape);

    // Vérifier si le bloc dépasse de la grille
    if (row + height > 8 || col + width > 8) {
        return false;
    }

    // Vérifier si toutes les cellules nécessaires sont libres
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (shape[r][c] === 1 && grid[row + r][col + c] === 1) {
                return false;
            }
        }
    }

    return true;
}

// Fonction pour placer un bloc sur la grille
function placeBlock(grid, block, row, col) {
    const newGrid = grid.map(row => [...row]);
    const shape = block.shape;
    const { height, width } = getShapeDimensions(shape);

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (shape[r][c] === 1) {
                newGrid[row + r][col + c] = 1;
            }
        }
    }

    return newGrid;
}

// Fonction pour calculer le score d'un placement
function calculateScore(grid) {
    let score = 0;
    let clearedLines = 0;

    // Vérifier les lignes horizontales
    for (let r = 0; r < 8; r++) {
        if (grid[r].every(cell => cell === 1)) {
            clearedLines++;
        }
    }

    // Vérifier les lignes verticales
    for (let c = 0; c < 8; c++) {
        let isComplete = true;
        for (let r = 0; r < 8; r++) {
            if (grid[r][c] === 0) {
                isComplete = false;
                break;
            }
        }
        if (isComplete) {
            clearedLines++;
        }
    }

    // Scoring: 10 points par ligne, avec bonus pour les combos
    if (clearedLines > 0) {
        score = clearedLines * 10;
        if (clearedLines > 1) {
            score += (clearedLines - 1) * 10; // Bonus combo
        }
    }

    return { score, clearedLines };
}

// Fonction pour nettoyer les lignes complètes
function clearCompleteLines(grid) {
    let newGrid = grid.map(row => [...row]);

    // Nettoyer les lignes horizontales
    for (let r = 0; r < 8; r++) {
        if (newGrid[r].every(cell => cell === 1)) {
            newGrid[r] = newGrid[r].map(() => 0);
        }
    }

    // Nettoyer les lignes verticales
    for (let c = 0; c < 8; c++) {
        let isComplete = true;
        for (let r = 0; r < 8; r++) {
            if (newGrid[r][c] === 0) {
                isComplete = false;
                break;
            }
        }
        if (isComplete) {
            for (let r = 0; r < 8; r++) {
                newGrid[r][c] = 0;
            }
        }
    }

    return newGrid;
}

// Fonction pour obtenir toutes les positions valides pour un bloc
function getAllValidPositions(grid, block) {
    const positions = [];
    const shape = block.shape;
    const { height, width } = getShapeDimensions(shape);

    for (let row = 0; row <= 8 - height; row++) {
        for (let col = 0; col <= 8 - width; col++) {
            if (canPlaceBlock(grid, block, row, col)) {
                positions.push({ row, col });
            }
        }
    }

    return positions;
}
