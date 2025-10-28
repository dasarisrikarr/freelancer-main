# Step-by-Step Jenkins Configuration Guide

## After Clicking "Manage Jenkins"

### ⚠️ Step 1: Fix Plugin Dependencies
Click the **"Correct"** button in the red warning box. This will fix the missing gson-api dependency.

---

### 🔧 Step 2: Configure Tools
Click on **"Tools"** (the wrench icon).

#### Configure Maven:
1. Scroll down to **"Maven"** section
2. Click **"Add Maven"** button
3. Configure:
   - **Name**: `Maven`
   - **Version**: `3.9.4` (or latest version)
4. Click **"Save"**

#### Configure NodeJS:
1. Still in the Tools page, find **"NodeJS"** section
2. Click **"Add NodeJS"** button
3. Configure:
   - **Name**: `NodeJS`
   - **Version**: `18.x` or latest
4. Click **"Save"**

---

### 🔌 Step 3: Check/Install Required Plugins
Click on **"Plugins"** (the puzzle piece icon).

#### Check Installed Plugins:
Look for these in the **"Installed"** tab:
- ✅ Pipeline
- ✅ Git
- ✅ Docker Pipeline

#### If Missing - Install:
1. Click **"Available"** tab
2. Search for missing plugins:
   - "Git" - install
   - "Docker Pipeline" or "Docker Workflow" - install
   - "Maven Integration" - install
   - "NodeJS Plugin" - install
3. Check the boxes
4. Click **"Install without restart"**
5. Wait for installation
6. Click **"Restart Jenkins when no jobs are running"** (if prompted)

---

### 🚀 Step 4: Create Your Pipeline
1. Click **"Back to Dashboard"** or the Jenkins logo
2. Click **"New Item"**
3. Enter name: `freelancer-pipeline`
4. Select **"Pipeline"**
5. Click **"OK"**

### Configure the Pipeline:

#### In the Configuration page:

1. **General** (top):
   - ✅ Keep default settings

2. **Build Triggers** (optional):
   - You can enable "GitHub hook trigger" if using webhooks

3. **Pipeline** section:
   - **Definition**: Select **"Pipeline script from SCM"**
   - **SCM**: Select **"Git"**
   - **Repository URL**: 
     - If using local files: `file:///workspace`
     - If using Git: `Your Git repository URL`
   - **Branches to build**: `*/main` or `*/master`
   - **Script Path**: `Jenkinsfile`
   - **Additional Behaviours**: Not needed for now
   
4. Click **"Save"**

---

### ▶️ Step 5: Run Your First Build
1. You'll be taken to the pipeline page
2. Click **"Build Now"** (left sidebar)
3. Watch the build progress in **"Stage View"**
4. Click on the build number (#1, #2, etc.) to see progress
5. Click **"Console Output"** to see detailed logs

---

### 🎯 Step 6: Access Your Application

After build completes (takes ~5-7 minutes):
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:9090
- **Jenkins**: http://localhost:8080

---

## If You See Warnings (Ignore These for Now):

✅ **"New version of Jenkins"** - You can update later  
✅ **"Built-in node security"** - OK for development  
✅ **"Security vulnerabilities"** - Update later if needed  

These don't prevent the pipeline from working!

---

## Quick Reference

### View Logs During Build:
```
# Jenkins logs
docker logs -f jenkins

# Application logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### If Build Fails:
1. Check **"Console Output"** in Jenkins
2. Look for error messages
3. Common issues:
   - Maven/NodeJS not configured → Configure in Tools
   - Docker not accessible → Restart Jenkins container
   - Port conflicts → Change ports in docker-compose.yml

---

## Next Steps

After your first successful build:
1. ✅ Your application is running
2. ✅ Pipeline is working
3. ✅ CI/CD is configured

Optional improvements:
- Add webhooks for automatic builds
- Configure email notifications
- Add more test stages
- Set up production deployment

---

**Need help?** See: `JENKINS_SETUP.md` for detailed troubleshooting

