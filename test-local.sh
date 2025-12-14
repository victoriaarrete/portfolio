#!/bin/bash

# Test GitHub Pages deployment locally
echo "🔨 Building static site..."
npm run build:static

echo ""
echo "🚀 Starting local server..."
echo "Visit: http://localhost:3000/portfolio/"
echo "Press Ctrl+C to stop the server"
echo ""

npx serve public -p 3000
