// Algorithme de résolution pour trouver la meilleure séquence de placements

class BlockBlastSolver {
    constructor(initialGrid, availableBlocks) {
        this.initialGrid = initialGrid;
        this.availableBlocks = availableBlocks;
        this.bestSolution = null;
        this.bestScore = -1;
    }

    // Fonction principale de résolution
    solve() {
        if (this.availableBlocks.length === 0) {
            return null;
        }

        // Générer toutes les permutations possibles de l'ordre des blocs
        const permutations = this.generatePermutations(this.availableBlocks);

        // Pour chaque permutation, trouver la meilleure séquence de placements
        for (const permutation of permutations) {
            this.explorePlacements(this.initialGrid, permutation, [], 0);
        }

        return this.bestSolution;
    }

    // Exploration récursive des placements possibles
    explorePlacements(currentGrid, remainingBlocks, placementHistory, currentScore) {
        // Cas de base: plus de blocs à placer
        if (remainingBlocks.length === 0) {
            if (currentScore > this.bestScore) {
                this.bestScore = currentScore;
                this.bestSolution = {
                    placements: placementHistory.map(p => ({...p})),
                    finalScore: currentScore,
                    grid: currentGrid.map(row => [...row])
                };
            }
            return;
        }

        const currentBlock = remainingBlocks[0];
        const positions = getAllValidPositions(currentGrid, currentBlock);

        // Si aucune position valide, cette branche ne mène à rien
        if (positions.length === 0) {
            // Mettre à jour quand même si c'est mieux que ce qu'on a
            if (currentScore > this.bestScore) {
                this.bestScore = currentScore;
                this.bestSolution = {
                    placements: placementHistory.map(p => ({...p})),
                    finalScore: currentScore,
                    grid: currentGrid.map(row => [...row]),
                    incomplete: true,
                    unblockedBlocks: remainingBlocks.map(b => b.id)
                };
            }
            return;
        }

        // Essayer chaque position valide
        for (const pos of positions) {
            // Placer le bloc
            const newGrid = placeBlock(currentGrid, currentBlock, pos.row, pos.col);

            // Calculer le score avant nettoyage
            const placementScore = this.evaluatePlacement(newGrid, currentBlock);

            // Nettoyer les lignes complètes
            const cleanedGrid = clearCompleteLines(newGrid);
            const { score: clearScore, clearedLines } = calculateScore(newGrid);

            // Score total: points de placement + points de lignes nettoyées
            const totalScore = currentScore + placementScore + clearScore;

            // Ajouter ce placement à l'historique
            const newPlacement = {
                blockId: currentBlock.id,
                blockName: currentBlock.name,
                row: pos.row,
                col: pos.col,
                score: placementScore + clearScore,
                clearedLines: clearedLines
            };

            placementHistory.push(newPlacement);

            // Explorer récursivement avec le bloc suivant
            this.explorePlacements(
                cleanedGrid,
                remainingBlocks.slice(1),
                placementHistory,
                totalScore
            );

            // Backtrack
            placementHistory.pop();
        }
    }

    // Évaluation heuristique d'un placement
    evaluatePlacement(grid, block) {
        let score = 0;

        // Points de base pour avoir placé le bloc
        const blockSize = this.countBlockCells(block);
        score += blockSize;

        // Bonus pour proximité avec autres blocs (densité)
        score += this.calculateDensityBonus(grid);

        // Pénalité pour fragmentation
        score -= this.calculateFragmentation(grid);

        return score;
    }

    countBlockCells(block) {
        let count = 0;
        for (let r = 0; r < block.shape.length; r++) {
            for (let c = 0; c < block.shape[0].length; c++) {
                if (block.shape[r][c] === 1) count++;
            }
        }
        return count;
    }

    calculateDensityBonus(grid) {
        let bonus = 0;
        // Bonus pour avoir des blocs regroupés
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (grid[r][c] === 1) {
                    // Compter les voisins
                    let neighbors = 0;
                    if (r > 0 && grid[r-1][c] === 1) neighbors++;
                    if (r < 7 && grid[r+1][c] === 1) neighbors++;
                    if (c > 0 && grid[r][c-1] === 1) neighbors++;
                    if (c < 7 && grid[r][c+1] === 1) neighbors++;
                    bonus += neighbors * 0.5;
                }
            }
        }
        return bonus;
    }

    calculateFragmentation(grid) {
        let fragmentation = 0;
        // Pénalité pour avoir des zones isolées
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (grid[r][c] === 0) {
                    // Compter les cellules vides isolées
                    let filledNeighbors = 0;
                    if (r > 0 && grid[r-1][c] === 1) filledNeighbors++;
                    if (r < 7 && grid[r+1][c] === 1) filledNeighbors++;
                    if (c > 0 && grid[r][c-1] === 1) filledNeighbors++;
                    if (c < 7 && grid[r][c+1] === 1) filledNeighbors++;

                    if (filledNeighbors >= 3) {
                        fragmentation += 2; // Cellule presque entourée
                    }
                }
            }
        }
        return fragmentation;
    }

    // Générer toutes les permutations des blocs
    generatePermutations(arr) {
        if (arr.length <= 1) return [arr];

        const permutations = [];
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            const remainingPermutations = this.generatePermutations(remaining);

            for (const perm of remainingPermutations) {
                permutations.push([current].concat(perm));
            }
        }

        return permutations;
    }
}

// Fonction simplifiée pour trouver rapidement une solution
function findBestSolution(grid, blocks) {
    const solver = new BlockBlastSolver(grid, blocks);
    return solver.solve();
}

// Fonction pour obtenir une solution avec visualisation étape par étape
function getSolutionSteps(solution) {
    if (!solution) return null;

    const steps = [];

    for (let i = 0; i < solution.placements.length; i++) {
        const placement = solution.placements[i];
        steps.push({
            stepNumber: i + 1,
            blockName: placement.blockName,
            position: `Ligne ${placement.row + 1}, Colonne ${placement.col + 1}`,
            row: placement.row,
            col: placement.col,
            score: placement.score,
            clearedLines: placement.clearedLines,
            blockId: placement.blockId
        });
    }

    return {
        steps,
        totalScore: solution.finalScore,
        incomplete: solution.incomplete || false,
        unblockedBlocks: solution.unblockedBlocks || []
    };
}

// Version optimisée pour grands ensembles de blocs
class FastSolver {
    constructor(grid, blocks) {
        this.grid = grid;
        this.blocks = blocks;
    }

    // Utilise une approche greedy pour une solution rapide
    solveGreedy() {
        let currentGrid = this.grid.map(row => [...row]);
        let totalScore = 0;
        const placements = [];
        const remainingBlocks = [...this.blocks];

        while (remainingBlocks.length > 0) {
            let bestMove = null;
            let bestMoveScore = -Infinity;
            let bestBlockIndex = -1;

            // Pour chaque bloc restant
            for (let i = 0; i < remainingBlocks.length; i++) {
                const block = remainingBlocks[i];
                const positions = getAllValidPositions(currentGrid, block);

                // Pour chaque position valide
                for (const pos of positions) {
                    const testGrid = placeBlock(currentGrid, block, pos.row, pos.col);
                    const { score, clearedLines } = calculateScore(testGrid);

                    // Score heuristique
                    let moveScore = score * 10; // Priorité aux lignes complètes

                    // Bonus pour placement qui remplit presque une ligne
                    moveScore += this.evaluateNearCompletionBonus(testGrid);

                    if (moveScore > bestMoveScore) {
                        bestMoveScore = moveScore;
                        bestMove = {
                            block,
                            row: pos.row,
                            col: pos.col,
                            score,
                            clearedLines
                        };
                        bestBlockIndex = i;
                    }
                }
            }

            // Si aucun mouvement possible, arrêter
            if (!bestMove) break;

            // Appliquer le meilleur mouvement
            currentGrid = placeBlock(currentGrid, bestMove.block, bestMove.row, bestMove.col);
            currentGrid = clearCompleteLines(currentGrid);
            totalScore += bestMove.score;

            placements.push({
                blockId: bestMove.block.id,
                blockName: bestMove.block.name,
                row: bestMove.row,
                col: bestMove.col,
                score: bestMove.score,
                clearedLines: bestMove.clearedLines
            });

            // Retirer le bloc utilisé
            remainingBlocks.splice(bestBlockIndex, 1);
        }

        return {
            placements,
            finalScore: totalScore,
            grid: currentGrid,
            incomplete: remainingBlocks.length > 0,
            unblockedBlocks: remainingBlocks.map(b => b.id)
        };
    }

    evaluateNearCompletionBonus(grid) {
        let bonus = 0;

        // Vérifier les lignes horizontales
        for (let r = 0; r < 8; r++) {
            const filled = grid[r].filter(cell => cell === 1).length;
            if (filled >= 6) bonus += (filled - 5) * 2;
        }

        // Vérifier les lignes verticales
        for (let c = 0; c < 8; c++) {
            let filled = 0;
            for (let r = 0; r < 8; r++) {
                if (grid[r][c] === 1) filled++;
            }
            if (filled >= 6) bonus += (filled - 5) * 2;
        }

        return bonus;
    }
}
