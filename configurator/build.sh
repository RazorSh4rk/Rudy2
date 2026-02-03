#!/bin/bash
set -e

echo "Building Rudy 2 Configurator..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  bun install
fi

# Build static site
echo "Compiling static site..."
bun run build

echo ""
echo "Build complete! Static files are in ./dist/"
echo "You can upload the contents of ./dist/ to any static hosting."
