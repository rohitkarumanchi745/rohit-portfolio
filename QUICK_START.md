# Quick Start - AI Chatbot Setup

Your AI chatbot is ready! Just need to add your OpenAI API key.

## Step 1: Get Your API Key

1. Go to: **https://platform.openai.com/api-keys**
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-`)

## Step 2: Add Your API Key

Open the file `.env.local` in your project root and replace `sk-your-key-here` with your actual key:

```bash
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Important**: Keep this key secret! Don't share it or commit it to git.

## Step 3: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test It!

1. Open http://localhost:3000
2. Click the purple chatbot button in bottom-right
3. Try asking:
   - "What are Rohit's strengths?"
   - "Tell me about the Nava project"
   - "Does he know data engineering?"

## That's It! 🎉

Your chatbot will now intelligently answer questions about your entire portfolio using AI.

---

## Need Help?

- **API Key Issues**: Make sure you copied the entire key including `sk-` prefix
- **Still Not Working**: Check the browser console for errors (F12)
- **Cost Concerns**: Don't worry! It's ~$0.10 per 1,000 conversations

## Optional: Free Alternative

If you don't want to use OpenAI (or want to test without cost), you can:

1. Use the keyword-based chatbot (previous version)
2. Use a free AI API like Hugging Face
3. Deploy and use serverless functions with free tiers

See **CHATBOT_SETUP.md** for more details!
