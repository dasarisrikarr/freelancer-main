# Debugging Build Failure

## 🔍 Your Build Failed - Let's Fix It!

### Step 1: View Console Output

1. Click on **"#1"** in the build history (the red X one)
2. You'll see the build details page
3. Click **"Console Output"** in the left menu
4. This will show you exactly what went wrong

---

## 🚨 Common Issues and Fixes

### Issue 1: "Maven not found"

**Error in logs:**
```
mvn: command not found
```

**Fix:**
1. Go to **Manage Jenkins** → **Tools**
2. Under **Maven**, click **"Add Maven"**
3. **Name**: `Maven`
4. **Version**: Select `3.9.4` from dropdown
5. Click **Save**
6. Rebuild: Click **Build Now** again

---

### Issue 2: "npm not found" or "node not found"

**Error in logs:**
```
npm: command not found
```

**Fix:**
1. Go to **Manage Jenkins** → **Tools**
2. Under **NodeJS**, click **"Add NodeJS"**
3. **Name**: `NodeJS`  
4. **Version**: Select `18.x` or `20.x` from dropdown
5. Click **Save**
6. Rebuild: Click **Build Now** again

---

### Issue 3: "Cannot connect to Docker daemon"

**Error in logs:**
```
Cannot connect to the Docker daemon
```

**Fix:**
```bash
# Restart Jenkins
docker restart jenkins
```

---

### Issue 4: "No workspace" or "files not found"

**Error in logs:**
```
No such file or directory
```

**Fix:**
This happens because Jenkins needs to check out code first. We need to update the pipeline script.

---

## ⚡ Quick Fix Script

Copy this updated script to your pipeline configuration:

```
pipeline {
    agent any
    
    stages {
        stage('Workspace Check') {
            steps {
                echo 'Current directory:'
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Backend Build') {
            steps {
                echo 'Building backend...'
                dir('freelancer-backend') {
                    script {
                        sh '''
                            pwd
                            ls -la
                            which mvn || echo "Maven not found"
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            sh 'echo "Build completed"'
        }
    }
}
```

This will help us diagnose the exact issue.

---

## 📋 What to Do Right Now

1. **Click on build #1** (the red X)
2. **Click "Console Output"**
3. **Take a screenshot or copy the error**
4. **Tell me what the error message says**

Then I can give you the exact fix!

