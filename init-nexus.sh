#!/bin/bash

APP_NAME="cybershield-nexus"

echo "Initialisation de $APP_NAME (React + Atomic Design + Watch Mode)..."

# 1. Création du projet Vite
npm create vite@latest $APP_NAME -- --template react-ts

cd $APP_NAME || exit

echo "Installation des dépendances (Sass, Icons, Router, Charts)..."
# sass-embedded car Vite v7+ pour de meilleures perfs
npm install react-router-dom chart.js react-chartjs-2 react-icons clsx
npm install -D sass-embedded

echo "Création de l'architecture Atomic Design (PascalCase)..."
# Dossiers de base
mkdir -p src/components/{atoms,molecules,organisms,templates}
mkdir -p src/pages src/hooks src/services src/types src/context src/assets src/styles

# 2. Création des fichiers d'index pour les composants (Barrel exports)
touch src/components/atoms/index.ts
touch src/components/molecules/index.ts
touch src/components/organisms/index.ts

# 3. Préparation des styles
echo "// Couleurs et variables Nexus
\$primary-blue: #3b82f6;
\$dark-bg: #0f172a;
\$card-bg: #1e293b;
\$text-main: #f8fafc;
\$text-muted: #94a3b8;" > src/styles/_variables.scss

echo "@use './styles/variables' as *;
body {
  margin: 0;
  background-color: \$dark-bg;
  color: \$text-main;
  font-family: 'Inter', sans-serif;
}" > src/index.scss

# 4. Nettoyage des fichiers inutiles de Vite
rm -f src/App.css
rm -f src/index.scss

echo "$APP_NAME est configuré avec succès !"
echo "Lancer : npm run dev"