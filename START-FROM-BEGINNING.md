# 🚀 Jenkins CI/CD - Fresh Start Complete!

## ✅ Jenkins is Now Running!

### Access Jenkins:
- **URL**: http://localhost:9080
- **Admin Password**: `031aa49ad3fa449bbd91b7ee5da6ba59`

---

## 📋 Step-by-Step Setup

### **Step 1: Complete Jenkins Setup**
1. Open http://localhost:9080 in your browser
2. Paste the admin password: `031aa49ad3fa449bbd91b7ee5da6ba59`
3. Click **"Continue"** or **"Install suggested plugins"**
4. ⚠️ If some plugins fail → Click **"Continue with partly installed plugins"**
5. Create admin user (or click **"Skip and continue as admin"**)

---

### **Step 2: Install NodeJS Plugin**

#### If prompted for plugins:
1. Go to **Manage Jenkins**
2. Click **Plugins** (puzzle piece icon)
3. Click **Available** tab
4. Search for **"NodeJS"** or **"nodejs"**
5. Check the box
6. Click **Install without restart**
7. Wait for installation
8. Restart Jenkins if prompted

---

### **Step 3: Configure Maven and NodeJS**

1. Go to **Manage Jenkins** → **Tools** (wrench icon)
2. Scroll to **Maven** section
   - Click **"Add Maven"**
   - Name: `Maven`
   - Version: `3.9.4` (or latest)
   - Click **Save**

3. Scroll to **NodeJS** section
   - Click **"Add NodeJS"**
   - Name: `NodeJS`
   - Version: `18.x` or `20.x` (latest LTS)
   - Click **Save**

---

### **Step 4: Install Essential Plugins (if needed)**

Go to **Manage Jenkins** → **Plugins** → **Available**:
- Search and install if missing:
  - Git
  - Docker Pipeline (or Docker Workflow)
  - Maven Integration

---

### **Step 5: Create Your Pipeline**

1. Click **"New Item"** or **"+ New Item"**
2. Enter name: `freelancer-pipeline`
3. Select **"Pipeline"**
4. Click **OK**

#### Configure Pipeline:
1. Scroll to **"Pipeline"** section
2. **Definition**: Select **"Pipeline script from SCM"**
3. **SCM**: Select **"Git"**
4. **Repository URL**: Enter `file:///workspace` (for local files)
5. **Branches to build**: Enter `*/main` or `*/master`
6. **Script Path**: Enter `Jenkinsfile`
7. Scroll down and click **"Save"**

---

### **Step 6: Run Your First Build**

1. You'll be on the pipeline page
2. Click **"Build Now"** on the left sidebar
3. Watch the build progress
4. Click on the build number (#1, #2, etc.) to see logs
5. Click **"Console Output"** for detailed logs

Build takes about **5-7 minutes**:
- Checks out code
- Builds backend
- Builds frontend
- Runs tests
- Creates Docker images
- Deploys application
- Health checks

---

### **Step 7: Access Your Application**

After successful build:
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:9090
- **Jenkins**: http://localhost:9080

---

## 🔍 Quick Commands

```powershell
# View Jenkins logs
docker logs -f jenkins

# View application logs
docker-compose logs -f

# Restart Jenkins
docker restart jenkins

# Get admin password again
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

---

## ❓ Troubleshooting

### Jenkins won't start?
```powershell
# Check if running
docker ps | findstr jenkins

# Start if stopped
cd jenkins
docker-compose up -d
```

### Can't access Jenkins?
- Make sure it's running: `docker ps`
- Check logs: `docker logs jenkins`
- Try: http://localhost:9080

### Build fails?
1. Check console output in Jenkins
2. Look for error messages
3. Verify Maven and NodeJS are configured
4. Check: Manage Jenkins → Tools

### Plugins not installing?
1. Go to Manage Jenkins → Plugins
2. Go to Advanced tab
3. Click "Check now"
4. Try installing again

---

## 📚 Documentation

- **Quick Reference**: `CI-CD-QUICK-START.md`
- **Detailed Setup**: `JENKINS_SETUP.md`
- **Architecture**: `CI-CD-ARCHITECTURE.md`
- **Fix Plugins**: `jenkins/fix-plugin-installation.md`

---

## ✅ You're All Set!

Once your first build succeeds:
- ✅ CI/CD pipeline is working
- ✅ Automated builds configured
- ✅ Application deployed
- ✅ Health checks active

**Now you can:**
- Push code to trigger builds (if webhook configured)
- Run builds manually from Jenkins UI
- View build history and logs
- Monitor application health

---

🎉 **Happy CI/CD!**

