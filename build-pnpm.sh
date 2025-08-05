#!/bin/bash

echo "🚀 Starting build process with pnpm..."

# Install dependencies with pnpm
echo "📦 Installing dependencies with pnpm..."
pnpm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
pnpm prisma generate

# Build TypeScript
echo "🔨 Building TypeScript..."
pnpm tsc

# Copy Prisma client to dist
echo "📋 Copying Prisma client to dist..."
cp -r node_modules/.prisma dist/

echo "✅ Build completed successfully with pnpm!" 