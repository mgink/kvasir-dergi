#!/bin/bash

# Render.com Debug Script
echo "🔍 Environment Variables Debug:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT" 
echo "PWD: $PWD"
echo "NODE_VERSION: $(node -v)"
echo "NPM_VERSION: $(npm -v)"

echo "📁 Files Check:"
ls -la

echo "📦 Package.json Scripts:"
cat package.json | grep -A 10 "scripts"

echo "🚀 Starting Next.js on 0.0.0.0:$PORT"
exec npm start
