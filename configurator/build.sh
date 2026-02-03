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

# Clean and move to docs
echo "Moving to ../docs..."
rm -rf ../docs
mv dist ../docs

echo ""
echo "Build complete! Static files are in ../docs/"
