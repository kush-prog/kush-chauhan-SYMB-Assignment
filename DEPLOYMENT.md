# Smart Parking System - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: smart-parking-system
   - Directory: ./
   - Override settings: No

4. Production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push code to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

6. Click "Deploy"

## Environment Variables

No environment variables required - the app uses browser local storage.

## Post-Deployment

1. Copy the deployment URL from Vercel
2. Update README.md with the live URL
3. Test all features on the live site
4. Record demo video using the live URL

## Troubleshooting

### Build Errors
- Ensure all dependencies are in package.json
- Check TypeScript errors: `npm run build`

### Runtime Errors
- Check browser console for errors
- Verify local storage is enabled in browser

## Demo Video Recording

Use the live URL to record a 2-minute demo showing:
1. Adding parking slots (5-10 seconds)
2. Viewing all slots (5 seconds)
3. Parking vehicles with different requirements (30-40 seconds)
4. "No slot available" scenario (10 seconds)
5. Removing a vehicle (10 seconds)
6. Parking again in freed slot (10 seconds)
