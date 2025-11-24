// Application principale - Gestion de l'interface utilisateur

class BlockBlastApp {
    constructor() {
        // État de l'application
        this.gameGrid = Array(8).fill(null).map(() => Array(8).fill(0));
        this.selectedBlocks = [];
        this.maxBlocks = 3;
        this.editMode = 'place'; // 'place' ou 'erase'

        // Éléments DOM
        this.gridElement = document.getElementById('gameGrid');
        this.blockPaletteElement = document.getElementById('blockPalette');
        this.selectedBlocksElement = document.getElementById('selectedBlocks');
        this.solutionResultElement = document.getElementById('solutionResult');

        // Initialisation
        this.init();
    }

    init() {
        this.renderGrid();
        this.renderBlockPalette();
        this.attachEventListeners();
        this.updateSelectedBlocksDisplay();
    }

    // Rendu de la grille de jeu
    renderGrid() {
        this.gridElement.innerHTML = '';

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = r;
                cell.dataset.col = c;

                if (this.gameGrid[r][c] === 1) {
                    cell.classList.add('filled');
                }

                cell.addEventListener('click', () => this.handleCellClick(r, c));

                this.gridElement.appendChild(cell);
            }
        }
    }

    // Gestion du clic sur une cellule
    handleCellClick(row, col) {
        if (this.editMode === 'place') {
            this.gameGrid[row][col] = this.gameGrid[row][col] === 1 ? 0 : 1;
        } else {
            this.gameGrid[row][col] = 0;
        }
        this.renderGrid();
        this.clearSolution();
    }

    // Rendu de la palette de blocs
    renderBlockPalette() {
        this.blockPaletteElement.innerHTML = '';

        Object.entries(BLOCK_SHAPES).forEach(([id, blockDef]) => {
            const blockItem = document.createElement('div');
            blockItem.className = 'block-item';
            blockItem.dataset.blockId = id;

            // Nom du bloc
            const blockName = document.createElement('div');
            blockName.className = 'block-name';
            blockName.textContent = blockDef.name;

            // Prévisualisation de la forme
            const blockPreview = this.createBlockPreview(blockDef.shape);

            blockItem.appendChild(blockName);
            blockItem.appendChild(blockPreview);

            blockItem.addEventListener('click', () => this.selectBlock(id, blockDef));

            this.blockPaletteElement.appendChild(blockItem);
        });
    }

    // Créer une prévisualisation d'un bloc
    createBlockPreview(shape) {
        const preview = document.createElement('div');
        preview.className = 'block-preview';

        const height = shape.length;
        const width = shape[0].length;

        preview.style.gridTemplateColumns = `repeat(${width}, 15px)`;
        preview.style.gridTemplateRows = `repeat(${height}, 15px)`;

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                const cell = document.createElement('div');
                cell.className = shape[r][c] === 1 ? 'block-cell' : 'block-cell empty';
                preview.appendChild(cell);
            }
        }

        return preview;
    }

    // Sélectionner un bloc
    selectBlock(id, blockDef) {
        // Permettre les duplicatas - on peut avoir le même bloc plusieurs fois
        if (this.selectedBlocks.length < this.maxBlocks) {
            // Ajouter le bloc (même si déjà sélectionné)
            this.selectedBlocks.push({
                id,
                name: blockDef.name,
                shape: blockDef.shape,
                color: blockDef.color
            });
        } else {
            alert(`Vous avez déjà sélectionné ${this.maxBlocks} blocs. Retirez-en un pour en ajouter un autre.`);
            return;
        }

        this.updateBlockPaletteDisplay();
        this.updateSelectedBlocksDisplay();
        this.clearSolution();
    }

    // Mettre à jour l'affichage de la palette
    updateBlockPaletteDisplay() {
        const allBlockItems = this.blockPaletteElement.querySelectorAll('.block-item');
        allBlockItems.forEach(item => {
            const blockId = item.dataset.blockId;

            // Compter combien de fois ce bloc est sélectionné
            const count = this.selectedBlocks.filter(b => b.id === blockId).length;

            // Retirer l'ancien badge de comptage s'il existe
            const oldBadge = item.querySelector('.selection-badge');
            if (oldBadge) {
                oldBadge.remove();
            }

            // Mettre en surbrillance si sélectionné au moins une fois
            item.classList.toggle('selected', count > 0);

            // Ajouter un badge avec le nombre si sélectionné
            if (count > 0) {
                const badge = document.createElement('div');
                badge.className = 'selection-badge';
                badge.textContent = count;
                item.appendChild(badge);
            }
        });
    }

    // Mettre à jour l'affichage des blocs sélectionnés
    updateSelectedBlocksDisplay() {
        this.selectedBlocksElement.innerHTML = '';

        for (let i = 0; i < this.maxBlocks; i++) {
            if (i < this.selectedBlocks.length) {
                const block = this.selectedBlocks[i];
                const blockDisplay = document.createElement('div');
                blockDisplay.className = 'selected-block-display';

                const blockName = document.createElement('div');
                blockName.className = 'block-name';
                blockName.textContent = block.name;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-block';
                removeBtn.textContent = '×';
                removeBtn.addEventListener('click', () => this.removeBlock(i));

                const preview = this.createBlockPreview(block.shape);

                blockDisplay.appendChild(removeBtn);
                blockDisplay.appendChild(blockName);
                blockDisplay.appendChild(preview);

                this.selectedBlocksElement.appendChild(blockDisplay);
            } else {
                const emptySlot = document.createElement('div');
                emptySlot.className = 'empty-slot';
                emptySlot.textContent = `Slot ${i + 1}`;
                this.selectedBlocksElement.appendChild(emptySlot);
            }
        }
    }

    // Retirer un bloc sélectionné
    removeBlock(index) {
        this.selectedBlocks.splice(index, 1);
        this.updateBlockPaletteDisplay();
        this.updateSelectedBlocksDisplay();
        this.clearSolution();
    }

    // Effacer tous les blocs sélectionnés
    clearAllBlocks() {
        this.selectedBlocks = [];
        this.updateBlockPaletteDisplay();
        this.updateSelectedBlocksDisplay();
        this.clearSolution();
    }

    // Effacer la grille
    clearGrid() {
        this.gameGrid = Array(8).fill(null).map(() => Array(8).fill(0));
        this.renderGrid();
        this.clearSolution();
    }

    // Basculer le mode d'édition
    toggleEditMode() {
        this.editMode = this.editMode === 'place' ? 'erase' : 'place';
        const modeBtn = document.getElementById('toggleMode');
        modeBtn.textContent = `Mode: ${this.editMode === 'place' ? 'Placer' : 'Effacer'}`;
    }

    // Résoudre le puzzle
    solvePuzzle() {
        if (this.selectedBlocks.length === 0) {
            alert('Veuillez sélectionner au moins un bloc');
            return;
        }

        this.solutionResultElement.innerHTML = '<p style="text-align: center; color: #666;">Calcul en cours...</p>';

        // Utiliser setTimeout pour permettre à l'UI de se mettre à jour
        setTimeout(() => {
            try {
                // Utiliser le solveur rapide pour de meilleures performances
                const solver = new FastSolver(this.gameGrid, this.selectedBlocks);
                const solution = solver.solveGreedy();

                if (!solution || solution.placements.length === 0) {
                    this.displayNoSolution();
                } else {
                    this.displaySolution(solution);
                }
            } catch (error) {
                console.error('Erreur lors de la résolution:', error);
                this.solutionResultElement.innerHTML = `
                    <div class="no-solution">
                        Une erreur est survenue lors du calcul. Veuillez réessayer.
                    </div>
                `;
            }
        }, 100);
    }

    // Afficher l'absence de solution
    displayNoSolution() {
        this.solutionResultElement.innerHTML = `
            <div class="no-solution">
                Aucune solution trouvée. Les blocs ne peuvent pas être placés sur la grille actuelle.
            </div>
        `;
    }

    // Afficher la solution
    displaySolution(solution) {
        const steps = getSolutionSteps(solution);

        if (!steps || steps.steps.length === 0) {
            this.displayNoSolution();
            return;
        }

        let html = '<div class="solution-steps">';

        steps.steps.forEach((step, index) => {
            html += `
                <div class="solution-step">
                    <div class="step-header">Étape ${step.stepNumber}: ${step.blockName}</div>
                    <div class="step-info">
                        📍 Position: ${step.position}<br>
                        ${step.clearedLines > 0 ? `✨ ${step.clearedLines} ligne(s) complétée(s)!<br>` : ''}
                        🎯 Points: +${step.score}
                    </div>
                </div>
            `;
        });

        html += '</div>';

        if (steps.incomplete && steps.unblockedBlocks.length > 0) {
            html += `
                <div style="margin-top: 15px; padding: 15px; background: #fef3c7; color: #92400e; border-radius: 10px;">
                    ⚠️ Attention: ${steps.unblockedBlocks.length} bloc(s) n'ont pas pu être placés.
                </div>
            `;
        }

        html += `
            <div class="score-info">
                Score total prévu: ${steps.totalScore} points
            </div>
        `;

        this.solutionResultElement.innerHTML = html;

        // Visualiser la solution sur la grille
        this.visualizeSolution(solution);
    }

    // Visualiser la solution sur la grille
    visualizeSolution(solution) {
        // Reconstruire la grille avec la solution
        let currentGrid = this.gameGrid.map(row => [...row]);

        solution.placements.forEach((placement, index) => {
            const block = this.selectedBlocks.find(b => b.id === placement.blockId);
            if (block) {
                const shape = block.shape;
                const { height, width } = getShapeDimensions(shape);

                for (let r = 0; r < height; r++) {
                    for (let c = 0; c < width; c++) {
                        if (shape[r][c] === 1) {
                            const row = placement.row + r;
                            const col = placement.col + c;
                            const cellElement = this.gridElement.querySelector(
                                `[data-row="${row}"][data-col="${col}"]`
                            );
                            if (cellElement) {
                                cellElement.classList.add('solution');
                                cellElement.dataset.step = index + 1;
                            }
                        }
                    }
                }
            }
        });
    }

    // Effacer la solution affichée
    clearSolution() {
        this.solutionResultElement.innerHTML = `
            <div class="solution-result empty">
                La solution apparaîtra ici après avoir cliqué sur "Trouver la meilleure solution"
            </div>
        `;

        // Retirer les marqueurs de solution de la grille
        const solutionCells = this.gridElement.querySelectorAll('.cell.solution');
        solutionCells.forEach(cell => {
            cell.classList.remove('solution');
            delete cell.dataset.step;
        });
    }

    // Attacher les écouteurs d'événements
    attachEventListeners() {
        document.getElementById('clearGrid').addEventListener('click', () => this.clearGrid());
        document.getElementById('toggleMode').addEventListener('click', () => this.toggleEditMode());
        document.getElementById('clearBlocks').addEventListener('click', () => this.clearAllBlocks());
        document.getElementById('solve').addEventListener('click', () => this.solvePuzzle());
    }
}

// Initialiser l'application au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BlockBlastApp();
    console.log('Block Blast Solver chargé!');
});
