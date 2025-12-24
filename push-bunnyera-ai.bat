@echo off
cd /d D:\BunnyEraProjects\bunnyera-ai

echo === Adding files ===
git add .

echo === Committing ===
git commit -m "Initial commit with project files"

echo === Setting branch to main ===
git branch -M main

echo === Pushing to GitHub ===
git push -u origin main

echo === Done! ===
pause