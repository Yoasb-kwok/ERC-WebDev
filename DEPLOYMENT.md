# GitHub Pages Deployment Guide

## Important Note

**GitHub Pages cannot run `npm run dev`** - it only serves static files. Instead, we use `npm run build` to create static files that GitHub Pages can serve.

## Automatic Deployment Setup

I've created a GitHub Actions workflow that will automatically:
1. Install dependencies (`npm install`)
2. Build your project (`npm run build`)
3. Deploy to GitHub Pages

## Steps to Deploy

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

(Replace `main` with `master` if that's your default branch)

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 3. Wait for Deployment

- The workflow will run automatically when you push to `main`/`master`
- You can check the progress in the **Actions** tab
- Once complete, your site will be available at:
  - `https://yourusername.github.io/repository-name` (if using default)
  - `https://e-racingcar.com` (if using your custom domain)

### 4. Custom Domain Setup (Already Configured)

Your `CNAME` file is already set to `e-racingcar.com`. To use it:

1. In GitHub repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `e-racingcar.com`
3. Configure your DNS:
   - Add a CNAME record pointing `e-racingcar.com` to `yourusername.github.io`
   - Or add A records pointing to GitHub's IP addresses

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
cd vue-app
npm install
npm run build
```

Then copy the contents of `vue-app/dist` to the `gh-pages` branch or use a tool like `gh-pages`:

```bash
npm install -g gh-pages
cd vue-app
gh-pages -d dist
```

## Troubleshooting

- **404 errors**: Make sure your router uses hash mode (already configured ✓)
- **Assets not loading**: The build script automatically copies images, CSS, and videos
- **Workflow fails**: Check the Actions tab for error messages
- **Site not updating**: Wait a few minutes for GitHub Pages to refresh
