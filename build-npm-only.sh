#!/bin/bash

echo "🚀 Starting build process with npm only..."

# Force npm usage
export npm_config_package_manager=npm
export npm_config_prefer_npm=true

# Remove any existing lock files
echo "🧹 Cleaning up lock files..."
rm -f pnpm-lock.yaml yarn.lock

# Install dependencies with npm only
echo "📦 Installing dependencies with npm..."
npm install --no-package-lock=false

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build TypeScript
echo "🔨 Building TypeScript..."
npx tsc

# Copy Prisma client to dist
echo "📋 Copying Prisma client to dist..."
cp -r node_modules/.prisma dist/

echo "✅ Build completed successfully with npm!" 