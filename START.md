# Quick Fix for Docker Authentication Issue

## Problem
You're seeing: "authentication required - email must be verified"

## Quick Solution (2 minutes)

### Step 1: Pull the images manually
Run these commands one by one in PowerShell:

```powershell
docker pull postgres:15-alpine
```

Wait for it to complete, then:
```powershell
docker pull maven:3.9.4-eclipse-temurin-17
```

Then:
```powershell
docker pull eclipse-temurin:17-jre
```

Then:
```powershell
docker pull node:18
```

Then:
```powershell
docker pull nginx:alpine
```

### Step 2: Now run docker-compose
```powershell
docker-compose up -d --build
```

---

## OR Use the Quick Fix Script

Double-click the file `quick-fix.bat` in your project folder - it will do everything automatically!

---

## Alternative: Login to Docker Desktop (Long-term fix)

1. Open **Docker Desktop**
2. Click on your profile icon (top right)
3. Click **Sign In** or **Log in to Docker Hub**
4. Enter your Docker Hub credentials (or create account at docker.com)
5. Verify your email if prompted
6. Then run: `docker-compose up -d --build`

---

## After Everything Starts Successfully:

✅ Frontend: http://localhost
✅ Backend API: http://localhost:9090





