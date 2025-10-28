# Jenkins CI/CD Setup Guide

This guide will help you set up Jenkins for automated CI/CD pipeline for the Freelancer project.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Detailed Setup](#detailed-setup)
5. [Pipeline Configuration](#pipeline-configuration)
6. [Troubleshooting](#troubleshooting)

## Overview

This project includes a complete CI/CD pipeline that:

- **Builds** backend (Spring Boot) and frontend (React) applications
- **Tests** the applications automatically
- **Creates** Docker images for deployment
- **Deploys** using Docker Compose
- **Verifies** health of deployed services

## Prerequisites

### Required Software

1. **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
2. **Git** installed and configured
3. **Minimum 4GB RAM** for Jenkins to run properly
4. **Java 17** installed (for running Jenkins builds locally - optional)

### Verify Installation

```bash
# Check Docker
docker --version

# Check Docker Compose
docker-compose --version

# Check Git
git --version
```

## Quick Start

### Windows

1. Run the setup script:
   ```bash
   cd jenkins
   setup.bat
   ```

2. Follow the instructions on screen

### Linux/Mac

1. Make the setup script executable:
   ```bash
   chmod +x jenkins/setup.sh
   ```

2. Run the setup script:
   ```bash
   ./jenkins/setup.sh
   ```

### Manual Setup

1. Start Jenkins:
   ```bash
   cd jenkins
   docker-compose up -d
   ```

2. Get admin password:
   ```bash
   docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```

3. Access Jenkins at `http://localhost:8080`

## Detailed Setup

### Step 1: Start Jenkins

```bash
cd jenkins
docker-compose up -d
```

Wait for Jenkins to start (approximately 1-2 minutes).

### Step 2: Unlock Jenkins

1. Open `http://localhost:8080` in your browser
2. Get the admin password:
   ```bash
   docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Copy and paste the password

### Step 3: Install Plugins

1. Select **Install suggested plugins**
2. Wait for installation to complete
3. Create admin user (or skip)

### Step 4: Configure Tools

#### Configure Maven

1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Find **Maven** section
3. Click **Add Maven**
4. Configure:
   - **Name**: `Maven`
   - **Version**: `3.9.4` or latest
5. Click **Save**

#### Configure NodeJS

1. Ensure **NodeJS Plugin** is installed
2. Go to **Manage Jenkins** → **Global Tool Configuration**
3. Find **NodeJS** section
4. Click **Add NodeJS**
5. Configure:
   - **Name**: `NodeJS`
   - **Version**: `18.x` or latest
6. Click **Save**

### Step 5: Create Pipeline Job

#### Option A: New Pipeline

1. Click **New Item**
2. Enter a name: `freelancer-pipeline`
3. Select **Pipeline**
4. Click **OK**

5. Configure Pipeline:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: Your Git repository URL
     - For local: `file:///workspace` (if mounted)
     - For remote: Your Git repository URL
   - **Branches to build**: `*/main` or `*/master`
   - **Script Path**: `Jenkinsfile`
   - Click **Save**

#### Option B: Multibranch Pipeline

1. Click **New Item**
2. Enter a name: `freelancer-multibranch`
3. Select **Multibranch Pipeline**
4. Click **OK**

5. Configure:
   - **Branch Sources**: Add Git
   - **Repository URL**: Your Git repository URL
   - **Branches to build**: Add `main` or `master`
   - Click **Save**

### Step 6: Run First Build

1. Click on your pipeline job
2. Click **Build Now**
3. Monitor the build progress
4. Click on the build number to see logs

### Step 7: Configure Webhooks (Optional)

To automatically trigger builds on code push:

1. In your Git repository settings, add a webhook:
   - **URL**: `http://your-jenkins-server:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select "Just the push event"

2. In Jenkins:
   - Go to your pipeline configuration
   - Under "Build Triggers", select:
     - ✓ **GitHub hook trigger for GITScm polling**

## Pipeline Configuration

The `Jenkinsfile` defines the following stages:

### Stage 1: Checkout
- Clones the repository from Git

### Stage 2: Backend Build
- Compiles Java Spring Boot application using Maven
- Creates JAR file in `freelancer-backend/target/`

### Stage 3: Frontend Build
- Installs npm dependencies
- Builds React application using Vite
- Creates production build in `frontend/dist/`

### Stage 4: Run Tests
- Runs backend unit tests
- Runs frontend linting

### Stage 5: Build Docker Images
- Builds Docker images for backend and frontend
- Uses multi-stage builds for optimization

### Stage 6: Deploy
- Stops existing containers
- Starts new containers with updated images
- Waits for services to be ready

### Stage 7: Health Check
- Verifies backend health endpoint
- Verifies frontend is accessible

## Troubleshooting

### Jenkins won't start

**Error**: `Cannot connect to the Docker daemon`

**Solution**:
```bash
# On Linux
sudo usermod -aG docker $USER
newgrp docker

# Restart Jenkins
docker-compose restart
```

### Build fails: "Maven not found"

**Solution**:
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Add Maven with version `3.9.4`
3. Ensure name matches Jenkinsfile

### Build fails: "npm not found"

**Solution**:
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Install **NodeJS Plugin**
3. Configure NodeJS in **Global Tool Configuration**

### Docker permission denied

**Error**: `Got permission denied while trying to connect to the Docker daemon`

**Solution**:
```bash
# Fix Docker socket permissions
docker exec -u root -it jenkins chmod 666 /var/run/docker.sock
```

### Port already in use

**Error**: `Port 8080 is already in use`

**Solution**: Change Jenkins port in `jenkins/docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Change 8081 to any available port
```

### Out of memory errors

**Solution**: Increase Docker Desktop memory:
1. Open Docker Desktop settings
2. Go to Resources
3. Increase Memory to at least 4GB

### Build fails on test stage

**Solution**: Check if tests exist in your project. If not, remove the test stage from Jenkinsfile.

### Services not accessible after deployment

**Solution**: Check if ports are available:
```bash
# Check if ports are in use
netstat -an | grep 9090  # Backend
netstat -an | grep 80    # Frontend

# View container logs
docker-compose logs backend
docker-compose logs frontend
```

### View Jenkins Logs

```bash
# Follow logs in real-time
docker logs -f jenkins

# View last 100 lines
docker logs --tail 100 jenkins
```

### Access Jenkins Container

```bash
docker exec -it jenkins bash
```

## Additional Configuration

### Email Notifications

1. Install **Email Extension Plugin**
2. Go to **Manage Jenkins** → **Configure System**
3. Configure SMTP settings
4. In Jenkinsfile, add email notification in post section

### Slack Notifications

1. Install **Slack Notification Plugin**
2. Configure Slack workspace in Jenkins
3. Add Slack notification in Jenkinsfile

### Artifact Archiving

Already configured in Jenkinsfile to archive JAR files.

### Test Reports

Configure test result publishing in Jenkinsfile (already included).

### Pipeline Parameters

Add parameters to build specific branches:
```groovy
parameters {
    choice(name: 'BRANCH', choices: ['main', 'develop'], description: 'Branch to build')
}
```

## Security Best Practices

1. **Change default admin password**
2. **Use credentials management** for sensitive data
3. **Limit Jenkins access** to trusted users
4. **Keep Jenkins updated**
5. **Use HTTPS** in production

## Backup and Restore

### Backup

```bash
# Backup Jenkins configuration
docker exec jenkins tar czf /tmp/jenkins_backup.tar.gz /var/jenkins_home
docker cp jenkins:/tmp/jenkins_backup.tar.gz .

# Backup Docker volumes
docker run --rm -v jenkins_jenkins_home:/data -v $(pwd):/backup ubuntu tar czf /backup/jenkins_home.tar.gz /data
```

### Restore

```bash
# Restore Jenkins configuration
docker cp jenkins_backup.tar.gz jenkins:/tmp/
docker exec jenkins tar xzf /tmp/jenkins_backup.tar.gz -C /
docker restart jenkins
```

## Production Deployment

For production use:

1. Set up reverse proxy (nginx)
2. Enable HTTPS
3. Configure firewall rules
4. Set up monitoring
5. Regular backups
6. Use dedicated Jenkins server
7. Implement role-based access control

## Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Docker Documentation](https://docs.docker.com/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)

## Support

For issues or questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review Jenkins logs
3. Check application logs
4. Consult documentation

---

**Happy Coding! 🚀**

