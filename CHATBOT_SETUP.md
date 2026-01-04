# AI Chatbot Setup

Your portfolio now includes **Spuff**, an AI-powered chatbot that intelligently answers questions about your experience, projects, and skills using GPT-4o-mini.

## Features

- 🤖 **AI-Powered**: Uses OpenAI's GPT-4o-mini for intelligent, contextual responses
- 📚 **Comprehensive Knowledge**: Has detailed information about all your projects, skills, and experience
- 💬 **Natural Conversation**: Answers questions naturally, not just keyword matching
- ⚡ **Fast & Cost-Effective**: Uses gpt-4o-mini for quick responses at low cost
- 🎨 **Beautiful UI**: Integrated seamlessly with your portfolio's dark theme

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the API key (it starts with `sk-`)

### 2. Add API Key to Your Project

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **IMPORTANT**: Make sure `.env.local` is in your `.gitignore` (it already is by default in Next.js)

### 3. Test the Chatbot

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Click the chatbot button in the bottom-right corner

3. Try asking questions like:
   - "What are Rohit's strengths?"
   - "Tell me about the Nava project"
   - "Does he have experience with data engineering?"
   - "What technologies does he know?"
   - "Tell me about his work at Neiman Marcus"

## How It Works

### Architecture

1. **Frontend** ([src/app/page.tsx](src/app/page.tsx)):
   - Chatbot UI component with message history
   - Sends user messages to `/api/chat` endpoint
   - Shows loading spinner while waiting for response

2. **Backend API** ([src/app/api/chat/route.ts](src/app/api/chat/route.ts)):
   - Receives user messages
   - Sends context about your portfolio + user question to OpenAI
   - Returns AI-generated response

3. **Portfolio Context**:
   - Complete information about your projects, skills, and experience
   - Formatted as system prompt for the AI
   - AI uses this context to answer questions accurately

### Cost Estimate

- **Model**: gpt-4o-mini (fast and cost-effective)
- **Average cost**: ~$0.0001-0.0003 per message
- **Example**: 1,000 chatbot conversations ≈ $0.10-0.30

Very affordable for a portfolio site!

## Customization

### Update Portfolio Information

Edit the `PORTFOLIO_CONTEXT` in [src/app/api/chat/route.ts](src/app/api/chat/route.ts) to:
- Add your education details
- Update project information
- Add new skills or experiences
- Change the chatbot's personality/tone

### Change AI Model

In [src/app/api/chat/route.ts](src/app/api/chat/route.ts), you can change the model:

```typescript
model: 'gpt-4o-mini',  // Fast & cheap (recommended)
// model: 'gpt-4o',    // More capable but more expensive
// model: 'gpt-3.5-turbo', // Cheaper but less capable
```

### Adjust Response Style

Modify these parameters in the API route:

```typescript
{
  model: 'gpt-4o-mini',
  temperature: 0.7,  // 0.0 = more focused, 1.0 = more creative
  max_tokens: 500,   // Max response length
}
```

## Fallback Behavior

If the OpenAI API is unavailable or the API key is missing:
- The chatbot will show a friendly error message
- Users can still contact you via email
- No errors will crash your site

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub (`.env.local` won't be pushed)

2. In Vercel dashboard:
   - Go to your project settings
   - Click "Environment Variables"
   - Add `OPENAI_API_KEY` with your key value
   - Deploy!

### Other Platforms

Set the `OPENAI_API_KEY` environment variable in your hosting platform's dashboard.

## Security Notes

- ✅ API key is stored in `.env.local` (not committed to git)
- ✅ API calls happen on the backend (Next.js API route)
- ✅ API key is never exposed to the browser
- ✅ No sensitive information in the chatbot context
- ✅ Rate limiting is handled by OpenAI

## Troubleshooting

### Chatbot shows error message

1. Check if `.env.local` exists and has the correct API key
2. Restart your dev server after adding the API key
3. Check browser console for error messages
4. Verify your OpenAI API key is valid and has credits

### Responses are slow

- This is normal - AI responses take 1-3 seconds
- gpt-4o-mini is already the fastest model
- Consider upgrading to a paid OpenAI plan for faster API access

### API costs are high

- You're probably getting a lot of visitors (great problem!)
- Consider adding rate limiting
- Monitor usage in OpenAI dashboard

## Future Enhancements

Possible improvements:
- Add conversation memory (multi-turn conversations)
- Add typing indicators
- Stream responses for faster perceived speed
- Add analytics to track popular questions
- Add suggested questions/prompts

## Questions?

If you need help setting up the chatbot, feel free to:
- Check the [Next.js API Routes docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- Check the [OpenAI API docs](https://platform.openai.com/docs/api-reference)
- Email the portfolio owner for specific questions

---

**Note**: The chatbot is optional. Your portfolio works perfectly fine without it if you choose not to add an OpenAI API key.
