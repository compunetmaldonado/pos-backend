#!/bin/bash

echo "🚀 Starting server with npm only..."

# Force npm usage
export npm_config_package_manager=npm
export npm_config_prefer_npm=true

# Generate Prisma client if not exists
if [ ! -f "node_modules/.prisma/client/index.js" ]; then
    echo "🗄️ Generating Prisma client..."
    npx prisma generate
fi

# Copy Prisma client to dist if not exists
if [ ! -f "dist/.prisma/client/index.js" ]; then
    echo "📋 Copying Prisma client to dist..."
    cp -r node_modules/.prisma dist/
fi

# Start the server
echo "🌐 Starting Node.js server..."
node dist/server.js 