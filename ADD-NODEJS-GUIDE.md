# How to Add Node.js to Jenkins - Step by Step

## Step 1: Install NodeJS Plugin

### Method 1: Through Plugin Manager (Recommended)

1. **In Jenkins Dashboard**, click **"Manage Jenkins"**
2. Click **"Plugins"** (the puzzle piece icon)
3. Click on **"Available"** tab
4. In the search box, type: `nodejs`
5. Find **"NodeJS Plugin"**
6. ✅ Check the box next to it
7. Click **"Install without restart"** (or **"Download now and install after restart"**)
8. Wait for installation to complete
9. If prompted, click **"Restart Jenkins when installation is complete"**

### Method 2: Through Jenkins Container (Command Line)

If you prefer using terminal:

```bash
# Access Jenkins container
docker exec -it jenkins bash

# Install NodeJS plugin
jenkins-plugin-cli --plugins nodejs

# Exit container
exit

# Restart Jenkins
docker restart jenkins
```

---

## Step 2: Configure Node.js

### After Plugin Installation:

1. Go to **"Manage Jenkins"** → **"Tools"** (wrench icon)
2. Scroll down to find **"NodeJS"** section
3. Click **"Add NodeJS"** button

### Configure Settings:

**Basic Configuration:**
- **Name**: `NodeJS` (or any name you prefer)
- **Version**: Select from dropdown:
  - Recommended: `18.x` or `20.x` (latest LTS)
  - Or choose `install automatically`

**Optional Settings** (you can skip these):
- **Global npm packages**: Leave blank
- **Global packager config**: Leave blank

4. Click **"Save"** button at the bottom of the page

---

## Step 3: Verify Installation

1. Go back to **Dashboard**
2. Click on your pipeline job (or create a new one)
3. In the pipeline configuration, you should now see NodeJS available as a tool

---

## Quick Command Line Check

Verify Node.js is accessible in Jenkins:

```bash
# Access Jenkins container
docker exec -it jenkins bash

# Check if NodeJS is configured
ls /var/jenkins_home/tools/

# Check NodeJS installation
which node
node --version

# Exit
exit
```

---

## Alternative: If Plugin is Already Installed But Not Showing

Sometimes you need to restart Jenkins:

### Via Jenkins UI:
1. **Manage Jenkins** → **Restart Jenkins**
2. Confirm restart

### Via Command Line:
```bash
# Restart Jenkins container
docker restart jenkins

# Or using docker-compose
cd jenkins
docker-compose restart jenkins
```

---

## Troubleshooting

### ❌ "NodeJS Plugin" not found in Available plugins

**Solution 1: Update plugin list**
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Click **"Advanced"** tab
3. Click **"Check now"** button
4. Wait for update
5. Go back to **Available** tab and search again

**Solution 2: Install manually**
```bash
# Download plugin manually
docker exec -it jenkins bash
cd /var/jenkins_home/plugins
wget https://updates.jenkins.io/download/plugins/nodejs/latest/nodejs.hpi
exit
docker restart jenkins
```

### ❌ "NodeJS section not visible in Tools"

**Check:**
1. Go to **Manage Jenkins** → **Manage Plugins** → **Installed** tab
2. Search for "NodeJS" - is it installed?
3. If not, install it (Step 1)
4. Restart Jenkins

### ❌ Build fails with "npm not found"

**Solution:**
1. Verify NodeJS is configured in Tools
2. In Jenkinsfile, make sure you're using NodeJS
3. Check the pipeline logs for exact error

---

## Using Node.js in Jenkinsfile

Once configured, your Jenkinsfile will automatically use Node.js for npm commands:

```groovy
stage('Frontend Build') {
    steps {
        dir('frontend') {
            sh 'npm install'
            sh 'npm run build'
        }
    }
}
```

---

## Quick Reference

**For installation:**
- Plugin name: **NodeJS Plugin**
- Plugin ID: `nodejs`
- Recommended version: 18.x or 20.x

**For configuration:**
- Location: Manage Jenkins → Tools → NodeJS
- Settings: Name, Version, Global npm packages

**For checking:**
- Installed plugins: Manage Jenkins → Manage Plugins → Installed
- Tools configuration: Manage Jenkins → Tools

---

## Next Steps After Adding Node.js

1. ✅ Node.js is now configured
2. ✅ You can create your pipeline
3. ✅ Frontend builds will work

**Continue with:**
- Create pipeline job (see `jenkins/step-by-step-configure.md`)
- Or run: `docker-compose up -d` to start your application

---

Need more help? See `JENKINS_SETUP.md` for complete setup guide.

