#!/bin/bash

# AWS Deployment Script for rohitkarumanchi.com
# This script helps you deploy your portfolio to AWS Amplify

echo "🚀 AWS Deployment Helper for rohitkarumanchi.com"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit for AWS deployment"
fi

# Check if remote is set
if ! git remote | grep -q 'origin'; then
    echo ""
    echo "📝 GitHub Setup Required"
    echo "========================"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create a repository named: rohit-portfolio"
    echo "3. Copy the repository URL (https://github.com/YOUR_USERNAME/rohit-portfolio.git)"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url

    git remote add origin "$repo_url"
    echo "✅ Remote added: $repo_url"
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo ""
    echo "📦 Committing latest changes..."
    git add .
    git commit -m "Prepare for AWS deployment

- Production-ready Next.js portfolio
- Fixed hydration errors
- Configured for AWS Amplify
- Custom domain: rohitkarumanchi.com

🤖 Generated with Claude Code

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
fi

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎯 Next Steps:"
    echo "=============="
    echo ""
    echo "1. Go to AWS Amplify Console:"
    echo "   https://console.aws.amazon.com/amplify"
    echo ""
    echo "2. Click 'New app' → 'Host web app'"
    echo ""
    echo "3. Connect GitHub and select your repository"
    echo ""
    echo "4. Add Environment Variable:"
    echo "   Key: OPENAI_API_KEY"
    echo "   Value: (from your .env.local file)"
    echo ""
    echo "5. Deploy and wait 3-5 minutes"
    echo ""
    echo "6. Add custom domain:"
    echo "   Domain: rohitkarumanchi.com"
    echo "   Follow Amplify's DNS configuration"
    echo ""
    echo "📚 Full Guide: See AWS_DEPLOYMENT_GUIDE.md"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "Please check your repository URL and credentials"
fi
