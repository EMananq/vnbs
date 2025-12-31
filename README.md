
# 🎂 Vidya's Birthday Surprise - Deployment Guide

This project is ready to be a beautiful surprise! To make sure your images and music show up after you deploy, follow these steps.

## 1. Prepare your Media
Vite looks for static files in the `public` folder. 

1. Create a folder named `public` in your project root.
2. Inside `public`, create a folder named `images`.
3. Save your 7 photos as `pic1.jpg` through `pic7.jpg` and put them in `public/images/`.
4. (Optional) Put your `music.mp3` in the `public` folder if you have a local file.

## 2. Local Setup & Testing
```bash
# Install dependencies
npm install

# Run the app locally to check images
npm run dev
```
Open `http://localhost:3000`. If you see "Memory Loading..." placeholders, it means your images are not named correctly or are in the wrong folder.

## 3. Deploy to Vercel (Recommended)
1. Push your code (including the `public` folder with your images) to a **GitHub repository**.
2. Go to [Vercel](https://vercel.com) and click **"Add New" > "Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite**. 
5. Click **Deploy**.

## 4. Deploy to Netlify
1. Push your code to GitHub.
2. Log in to Netlify and click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repo.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy**.

**Note:** The images *must* be in `public/images/` for them to be visible on the live website!
