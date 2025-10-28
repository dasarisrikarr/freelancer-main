# Run Your First Jenkins Build - Step by Step

## 🚀 Current Status ✅
- ✅ Jenkins is running on port 9080
- ✅ Pipeline job "freelancer-pipeline" is created
- ⏳ Ready to run first build!

## 🎯 Next Steps

### **Step 1: Configure Pipeline (Important!)**

Before clicking "Build Now", verify the configuration:

1. Click **"Configure"** in the left sidebar
2. Scroll down to the **"Pipeline"** section
3. Check these settings:

**Pipeline Configuration:**
- **Definition**: "Pipeline script from SCM" ✅
- **SCM**: Git ✅
- **Repository URL**: Should be `file:///workspace` ✅
- **Branches to build**: `*/main` or `*/master` ✅
- **Script Path**: `Jenkinsfile` ✅

4. If any setting is wrong, fix it, then click **"Save"**

---

### **Step 2: Click "Build Now"**

1. On the freelancer-pipeline page (where you are now)
2. Look at the left sidebar
3. Click the **"Build Now"** button
4. You'll see a build appear in the **"Build History"** section

---

### **Step 3: Monitor Your Build**

Watch the build progress:

1. Click on the build number (#1) in the Build History
2. Click **"Console Output"** to see detailed logs
3. You can watch it progress through these stages:

**Pipeline Stages:**
1. ✅ Checkout - Clones code (5 seconds)
2. 🔨 Backend Build - Compiles Java app (60-90 seconds)
3. 🎨 Frontend Build - Builds React app (30-45 seconds)
4. 🧪 Run Tests - Executes tests (20-40 seconds)
5. 🐳 Build Docker Images - Creates containers (2-3 minutes)
6. 🚀 Deploy - Starts application (30 seconds)
7. ❤️ Health Check - Verifies services (30 seconds)

**Total Time**: ~5-7 minutes

---

### **Step 4: Check Results**

After build completes:

#### **If Successful (Blue/Green):**
- ✅ Your application is deployed!
- 🌐 Access it at:
  - **Frontend**: http://localhost:80
  - **Backend**: http://localhost:9090
- 📊 View logs: Click the build number → Console Output

#### **If Failed (Red):**
- ❌ Don't worry! Click the build number
- 📝 Check "Console Output" for errors
- 🔍 Common issues:
  - Maven/NodeJS not configured → Configure in Tools
  - Docker not accessible → Check Docker is running
  - Port conflicts → Check if services are running

---

## 📊 What You'll See During Build

### **Stage View**
- You'll see a visual pipeline diagram
- Each stage will light up as it progresses
- Green = Success, Red = Failed, Blue = In Progress

### **Console Output**
Shows detailed logs like:
```
Started by user admin
[Pipeline] Checkout
[Pipeline] Backend Build
mvn clean package -DskipTests
...
[Pipeline] Frontend Build
npm install
npm run build
...
[Pipeline] Build Docker Images
docker-compose build
...
[Pipeline] Deploy
docker-compose up -d
...
[Pipeline] Health Check
curl http://localhost:9090
...
Finished: SUCCESS
```

---

## 🎯 Quick Actions

### **View Logs:**
- Click build number → Console Output
- Or use: `docker logs -f jenkins`

### **Re-run Build:**
- Click "Build Now" again

### **Stop Build:**
- Click "X" next to the running build

### **Check Application:**
```powershell
# Check if services are running
docker ps

# View logs
docker-compose logs backend
docker-compose logs frontend
```

---

## 🔧 Troubleshooting First Build

### **Build Fails at "Backend Build"?**
- **Error**: "Maven not found"
- **Fix**: Go to Manage Jenkins → Tools → Add Maven → Save

### **Build Fails at "Frontend Build"?**
- **Error**: "npm not found"
- **Fix**: Go to Manage Jenkins → Tools → Add NodeJS → Save

### **Build Fails at "Build Docker Images"?**
- **Error**: "Cannot connect to Docker daemon"
- **Fix**: `docker restart jenkins`

### **Services Don't Start After Build?**
```powershell
# Check container status
docker ps

# Check logs
docker-compose logs
```

---

## ✅ Success Checklist

After first successful build, you should have:

- ✅ Jenkins pipeline running
- ✅ Application deployed at http://localhost:80
- ✅ Backend API at http://localhost:9090
- ✅ Build history tracking
- ✅ Automated CI/CD workflow

---

## 🎉 Congratulations!

Once you see **"Finished: SUCCESS"**, your CI/CD pipeline is fully operational!

**Next:** Try pushing code changes to see automatic deployments!

---

**Ready?** Click **"Build Now"** in Jenkins now! 🚀

