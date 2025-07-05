#!/bin/bash

# Render.com Build Script
echo "🚀 Starting Kvasir Dergi build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"

# Optional: Health check
echo "🏥 Running post-build health check..."
if [ -d ".next" ]; then
    echo "✅ .next directory created successfully"
else
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "🎉 Kvasir Dergi is ready for deployment!"
