# CI/CD Quick Start Guide

Get your Jenkins CI/CD pipeline up and running in minutes!

## 🚀 Quick Start (Windows)

### Step 1: Start Jenkins

```powershell
cd jenkins
.\setup.bat
```

### Step 2: Access Jenkins

1. Open browser: `http://localhost:8080`
2. Enter the admin password from the terminal
3. Install suggested plugins

### Step 3: Configure Tools

**Maven Configuration:**
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Under **Maven**, click **Add Maven**
3. Name: `Maven`, Version: `3.9.4`
4. Click **Save**

**NodeJS Configuration:**
1. Under **NodeJS**, click **Add NodeJS**
2. Name: `NodeJS`, Version: `18`
3. Click **Save**

### Step 4: Create Pipeline

1. Click **New Item** → Name: `freelancer` → Select **Pipeline** → **OK**
2. Under **Pipeline**:
   - **Definition**: Pipeline script
   - Paste the Jenkinsfile content
   - Click **Save**
3. Click **Build Now**

## 🐧 Quick Start (Linux/Mac)

### Step 1: Start Jenkins

```bash
cd jenkins
chmod +x setup.sh
./setup.sh
```

### Step 2-4: Same as Windows

## 📋 What the Pipeline Does

1. ✅ **Checks out** your code
2. ✅ **Builds** backend (Maven)
3. ✅ **Builds** frontend (npm)
4. ✅ **Runs** tests
5. ✅ **Creates** Docker images
6. ✅ **Deploys** application
7. ✅ **Verifies** health

## 🎯 Access Your Application

After successful build:
- **Frontend**: http://localhost:80
- **Backend**: http://localhost:9090
- **Jenkins**: http://localhost:8080

## 🛠️ Common Commands

```bash
# View Jenkins logs
docker logs -f jenkins

# Stop Jenkins
cd jenkins && docker-compose down

# Restart Jenkins
docker-compose restart jenkins

# Get admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## 📚 Need More Help?

See [JENKINS_SETUP.md](JENKINS_SETUP.md) for detailed documentation.

## 🔧 Troubleshooting

**Jenkins won't start?**
- Ensure Docker is running
- Check port 8080 is available

**Build fails?**
- Check Jenkins logs: `docker logs jenkins`
- Ensure Maven and NodeJS are configured

**Can't access application?**
- Wait 1-2 minutes after deployment
- Check logs: `docker-compose logs`

