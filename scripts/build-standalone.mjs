import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

console.log('--- Étape 1 : Construction du fichier autonome (standalone HTML) ---');

const distIndexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(distIndexHtmlPath)) {
  console.error('Erreur : dist/index.html introuvable. Exécutez "vite build" d\'abord.');
  process.exit(1);
}

let htmlContent = fs.readFileSync(distIndexHtmlPath, 'utf-8');

// Détection du CSS et du JS
const cssMatch = htmlContent.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["'](\.\/assets\/[^"']+)["'][^>]*>|<link[^>]+href=["'](\.\/assets\/[^"']+)["'][^>]+rel=["']stylesheet["'][^>]*>/i);
const jsMatch = htmlContent.match(/<script[^>]+src=["'](\.\/assets\/[^"']+)["'][^>]*><\/script>/i);

if (!cssMatch || !jsMatch) {
  console.error('Impossible de trouver les balises CSS ou JS dans dist/index.html');
  console.log('HTML extrait :', htmlContent.slice(0, 1000));
  process.exit(1);
}

const cssRelPath = (cssMatch[1] || cssMatch[2]).replace(/^\.\//, '');
const jsRelPath = jsMatch[1].replace(/^\.\//, '');

const cssFullPath = path.join(distDir, cssRelPath);
const jsFullPath = path.join(distDir, jsRelPath);

console.log(`Lecture du CSS : ${cssFullPath} (${fs.statSync(cssFullPath).size} octets)`);
console.log(`Lecture du JS  : ${jsFullPath} (${fs.statSync(jsFullPath).size} octets)`);

const cssContent = fs.readFileSync(cssFullPath, 'utf-8');
const jsContent = fs.readFileSync(jsFullPath, 'utf-8');

// Remplacement du lien CSS par la balise <style>
htmlContent = htmlContent.replace(cssMatch[0], `<style>\n${cssContent}\n</style>`);

// Remplacement du script externe par le script inline
// Sécurité : échapper tout </script> potentiel dans les littéraux
const sanitizedJs = jsContent.replace(/<\/script>/gi, '<\\/script>');
htmlContent = htmlContent.replace(jsMatch[0], `<script type="module">\n${sanitizedJs}\n</script>`);

// Écriture du fichier HTML autonome
const standaloneTargets = [
  path.join(publicDir, 'capdys-v3-standalone.html'),
  path.join(publicDir, 'index.html'),
  path.join(distDir, 'capdys-v3-standalone.html'),
];

for (const target of standaloneTargets) {
  fs.writeFileSync(target, htmlContent, 'utf-8');
  console.log(`Fichier écrit : ${target} (${fs.statSync(target).size} octets)`);
}

console.log('--- Étape 2 : Mise à jour de l\'archive ZIP complète ---');

const zipScript = `
import os
import zipfile

root_dir = '${rootDir}'
public_dir = '${publicDir}'
zip_filename = os.path.join(public_dir, 'capdys-6eme-v3-code-complet.zip')

# Liste des fichiers à inclure
include_root_files = [
    'package.json', 'tsconfig.json', 'vite.config.ts', 'server.ts',
    'metadata.json', 'index.html', '.env.example'
]

with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for rf in include_root_files:
        p = os.path.join(root_dir, rf)
        if os.path.exists(p):
            zipf.write(p, rf)
            print(f'Ajouté : {rf}')

    for folder in ['src', 'public']:
        fpath = os.path.join(root_dir, folder)
        for root, dirs, files in os.walk(fpath):
            for file in files:
                if file.endswith('.zip'):
                    continue # éviter de zipper le zip lui-même
                abs_f = os.path.join(root, file)
                rel_f = os.path.relpath(abs_f, root_dir)
                zipf.write(abs_f, rel_f)

print(f'Archive créée : {zip_filename} ({os.path.getsize(zip_filename)} octets)')
`;

execSync(`python3 -c "${zipScript.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

// Copie également le ZIP dans dist pour servir immédiatement en prod
const distZipPath = path.join(distDir, 'capdys-6eme-v3-code-complet.zip');
fs.copyFileSync(path.join(publicDir, 'capdys-6eme-v3-code-complet.zip'), distZipPath);
console.log(`Archive copiée vers : ${distZipPath}`);

console.log('✅ Recompilation standalone et archivage terminés avec succès !');
