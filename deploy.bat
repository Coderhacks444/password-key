@echo off
echo Building project...
npm run build

echo Initializing git repository...
git init

echo Adding all files...
git add .

echo Committing files...
git commit -m "Initial commit - Password Manager"

echo Adding GitHub remote...
set /p REPO_URL="Enter your GitHub repository URL: "
git remote add origin %REPO_URL%

echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo Deployment complete! Your app will be available at: https://yourusername.github.io/passkey/
pause