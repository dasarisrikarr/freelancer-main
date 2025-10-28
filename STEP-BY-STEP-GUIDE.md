# Complete Step-by-Step Guide to Run Docker Compose

## 📋 Step-by-Step Instructions

### **STEP 1: Open PowerShell/Command Prompt**

1. Press **Windows Key + R**
2. Type `powershell` and press Enter
3. OR search for "PowerShell" in Start menu and click it

### **STEP 2: Navigate to Your Project Folder**

Copy and paste this command:
```powershell
cd "C:\Users\srika\Downloads\resume files\Freelancer-main"
```

Press Enter.

### **STEP 3: Verify Docker Desktop is Running**

Look at the bottom right corner of your screen (system tray) - you should see a **Docker whale icon** 🐳

If NOT running:
1. Search for "Docker Desktop" in Start menu
2. Open Docker Desktop
3. Wait for it to show "Docker is running"

### **STEP 4: Run Docker Compose**

Choose ONE of these methods:

#### **Method A: Easy Way (Double-click)**
1. Open File Explorer
2. Navigate to: `C:\Users\srika\Downloads\resume files\Freelancer-main`
3. Double-click the file: **`start-docker.bat`**
4. Command window will open and show progress

#### **Method B: Using PowerShell**
In the PowerShell window, type:
```powershell
docker-compose up -d --build
```
Press Enter.

### **STEP 5: Wait for Everything to Build** ⏳

This will take 3-5 minutes the first time:
- You'll see: "Building postgres..."
- You'll see: "Building backend..."
- You'll see: "Building frontend..."
- You'll see: "Starting postgres..."
- You'll see: "Starting backend..."
- You'll see: "Starting frontend..."

Wait until you see:
```
✔ Container freelancer-postgres    Started
✔ Container freelancer-backend     Started
✔ Container freelancer-frontend    Started
```

### **STEP 6: Verify It's Running**

#### **Check in Docker Desktop:**
1. Open Docker Desktop application
2. Click on **"Containers"** tab in the left sidebar
3. You should see 3 green containers:
   - ✓ freelancer-postgres
   - ✓ freelancer-backend
   - ✓ freelancer-frontend

#### **Check in PowerShell:**
Run this command:
```powershell
docker-compose ps
```
You should see all 3 containers showing "Up" status.

### **STEP 7: Access Your Application** 🌐

Open your web browser and go to:

#### **Frontend (Main Application)**
```
http://localhost
```
This is where you'll use your app!

#### **Backend API (For testing)**
```
http://localhost:9090/api/jobs
```
This should return data (or empty array).

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ All 3 containers show "Up" in Docker Desktop
- ✅ You can access http://localhost in your browser
- ✅ No error messages in the PowerShell window

---

## 🔍 How to View Logs

### **Option 1: Docker Desktop GUI**
1. Open Docker Desktop
2. Click on **"Containers"**
3. Click on any container (e.g., `freelancer-backend`)
4. Click **"Logs"** tab
5. See real-time logs

### **Option 2: PowerShell**
```powershell
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 🛑 How to Stop the Application

### **When you want to stop everything:**

```powershell
docker-compose down
```

This stops all containers but keeps the data.

### **When you want to completely remove everything (including data):**

```powershell
docker-compose down -v
```

⚠️ Warning: This deletes all database data!

---

## 🔄 How to Restart After Making Code Changes

1. Stop the containers:
```powershell
docker-compose down
```

2. Start again with rebuild:
```powershell
docker-compose up -d --build
```

---

## ❗ Troubleshooting

### **Problem: "Port already in use"**
Someone is using port 80, 9090, or 5432
**Solution**: Close other applications using these ports

### **Problem: "Docker daemon is not running"**
Docker Desktop is not started
**Solution**: Open Docker Desktop and wait for it to start

### **Problem: Containers keep restarting**
**Solution**: Check logs to see the error:
```powershell
docker-compose logs backend
```

### **Problem: Can't access http://localhost**
**Solution**: Check if frontend container is running:
```powershell
docker-compose ps
```

---

## 📱 Quick Command Reference

| What you want to do | Command |
|---------------------|---------|
| Start everything | `.\start-docker.bat` or `docker-compose up -d --build` |
| Stop everything | `docker-compose down` |
| View logs | `docker-compose logs -f` |
| Check status | `docker-compose ps` |
| Restart one service | `docker-compose restart backend` |
| Open website | Go to http://localhost |

---

## 🎯 Summary

1. Open PowerShell
2. Navigate to project folder
3. Make sure Docker Desktop is running
4. Run: `.\start-docker.bat` or `docker-compose up -d --build`
5. Wait for build to complete
6. Open http://localhost in browser
7. Done! 🎉






