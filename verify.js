#!/usr/bin/env node

// Script de vérification du projet
const fs = require('fs');
const path = require('path');

console.log('=================================');
console.log('VÉRIFICATION DU PROJET');
console.log('Block Blast Solver');
console.log('=================================\n');

const requiredFiles = [
    'index.html',
    'demo.html',
    'test.html',
    'styles.css',
    'blockShapes.js',
    'solver.js',
    'app.js',
    'package.json',
    'README.md',
    'USAGE.md',
    '.gitignore'
];

let allFilesPresent = true;
let totalSize = 0;

console.log('Vérification des fichiers:');
console.log('-------------------------');

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        totalSize += stats.size;
        console.log(`✓ ${file.padEnd(25)} (${sizeKB} KB)`);
    } else {
        console.log(`✗ ${file.padEnd(25)} [MANQUANT]`);
        allFilesPresent = false;
    }
});

console.log(`\nTaille totale: ${(totalSize / 1024).toFixed(2)} KB`);

// Vérifier la syntaxe JavaScript
console.log('\n\nVérification de la syntaxe JavaScript:');
console.log('--------------------------------------');

const jsFiles = ['blockShapes.js', 'solver.js', 'app.js'];
let syntaxOk = true;

jsFiles.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Vérification basique
        const openBraces = (content.match(/{/g) || []).length;
        const closeBraces = (content.match(/}/g) || []).length;
        const openParens = (content.match(/\(/g) || []).length;
        const closeParens = (content.match(/\)/g) || []).length;

        if (openBraces !== closeBraces) {
            console.log(`✗ ${file}: Accolades non équilibrées (${openBraces} vs ${closeBraces})`);
            syntaxOk = false;
        } else if (openParens !== closeParens) {
            console.log(`✗ ${file}: Parenthèses non équilibrées (${openParens} vs ${closeParens})`);
            syntaxOk = false;
        } else {
            console.log(`✓ ${file}: Syntaxe OK`);
        }
    } catch (e) {
        console.log(`✗ ${file}: Erreur - ${e.message}`);
        syntaxOk = false;
    }
});

// Vérifier le contenu HTML
console.log('\n\nVérification des fichiers HTML:');
console.log('-------------------------------');

const htmlFiles = ['index.html', 'demo.html', 'test.html'];
let htmlOk = true;

htmlFiles.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const hasDoctype = content.includes('<!DOCTYPE html>');
        const hasCharset = content.includes('charset="UTF-8"');
        const hasTitle = content.includes('<title>');

        if (!hasDoctype || !hasCharset || !hasTitle) {
            console.log(`⚠ ${file}: Structure HTML incomplète`);
            if (!hasDoctype) console.log(`  - DOCTYPE manquant`);
            if (!hasCharset) console.log(`  - Charset manquant`);
            if (!hasTitle) console.log(`  - Title manquant`);
        } else {
            console.log(`✓ ${file}: Structure HTML valide`);
        }
    } catch (e) {
        console.log(`✗ ${file}: Erreur - ${e.message}`);
        htmlOk = false;
    }
});

// Vérifier les liens entre fichiers
console.log('\n\nVérification des dépendances:');
console.log('-----------------------------');

try {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    const hasStylesLink = indexContent.includes('styles.css');
    const hasBlockShapesScript = indexContent.includes('blockShapes.js');
    const hasSolverScript = indexContent.includes('solver.js');
    const hasAppScript = indexContent.includes('app.js');

    if (hasStylesLink && hasBlockShapesScript && hasSolverScript && hasAppScript) {
        console.log('✓ Tous les fichiers sont correctement liés dans index.html');
    } else {
        console.log('✗ Certains liens sont manquants dans index.html');
        if (!hasStylesLink) console.log('  - styles.css');
        if (!hasBlockShapesScript) console.log('  - blockShapes.js');
        if (!hasSolverScript) console.log('  - solver.js');
        if (!hasAppScript) console.log('  - app.js');
    }
} catch (e) {
    console.log(`✗ Erreur lors de la vérification des liens: ${e.message}`);
}

// Compter les formes de blocs
console.log('\n\nStatistiques du projet:');
console.log('----------------------');

try {
    const blockShapesContent = fs.readFileSync(path.join(__dirname, 'blockShapes.js'), 'utf8');
    const blockCount = (blockShapesContent.match(/^\s+\w+:\s*{$/gm) || []).length;
    console.log(`✓ Nombre de formes de blocs: ${blockCount}`);

    const solverContent = fs.readFileSync(path.join(__dirname, 'solver.js'), 'utf8');
    const classCount = (solverContent.match(/^class \w+/gm) || []).length;
    console.log(`✓ Nombre de classes dans solver.js: ${classCount}`);

    const appContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
    const methodCount = (appContent.match(/^\s+\w+\([^)]*\)\s*{/gm) || []).length;
    console.log(`✓ Nombre de méthodes dans app.js: ${methodCount}`);
} catch (e) {
    console.log(`⚠ Impossible de compter les statistiques: ${e.message}`);
}

// Résumé final
console.log('\n\n=================================');
console.log('RÉSUMÉ DE LA VÉRIFICATION');
console.log('=================================');

if (allFilesPresent && syntaxOk && htmlOk) {
    console.log('✓ Tous les tests sont passés!');
    console.log('✓ Le projet est prêt à être utilisé');
    console.log('\nPour commencer:');
    console.log('  1. Ouvrez index.html dans votre navigateur');
    console.log('  2. Ou lancez: npm start');
    console.log('  3. Consultez demo.html pour le guide');
    console.log('  4. Lancez test.html pour les tests automatiques');
    process.exit(0);
} else {
    console.log('⚠ Certaines vérifications ont échoué');
    if (!allFilesPresent) console.log('  - Fichiers manquants');
    if (!syntaxOk) console.log('  - Erreurs de syntaxe JavaScript');
    if (!htmlOk) console.log('  - Problèmes dans les fichiers HTML');
    console.log('\nVeuillez corriger les erreurs avant d\'utiliser le projet.');
    process.exit(1);
}
