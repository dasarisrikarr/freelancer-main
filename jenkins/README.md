# Jenkins CI/CD Setup for Freelancer Project

This directory contains the Jenkins setup for automated CI/CD pipeline.

## Prerequisites

- Docker and Docker Compose installed
- Git installed
- At least 4GB of RAM available for Jenkins

## Quick Start

### 1. Start Jenkins Server

```bash
cd jenkins
docker-compose up -d
```

### 2. Access Jenkins

1. Open your browser and navigate to `http://localhost:8080`
2. You'll need the initial admin password. To get it:

```bash
docker exec -it jenkins bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

3. Copy the password and paste it in Jenkins setup wizard

### 3. Install Required Plugins

After logging in, install the following plugins:
- **Pipeline** (usually pre-installed)
- **Docker Pipeline**
- **Docker**
- **Git**
- **NodeJS Plugin**
- **Maven Integration**

To install:
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Search and install the plugins listed above
3. Restart Jenkins after installation

### 4. Configure Tools

1. Go to **Manage Jenkins** → **Global Tool Configuration**

2. Configure **Maven**:
   - Add Maven installation
   - Name: `Maven`
   - Version: `3.9.4` (or latest)

3. Configure **NodeJS**:
   - Add NodeJS installation
   - Name: `NodeJS`
   - Version: `18` (or latest)

4. Configure **Docker** (if needed):
   - Jenkins will use the Docker socket mounted from host

### 5. Configure Docker Credentials (Optional)

If you're using a private Docker registry:

1. Go to **Manage Jenkins** → **Credentials**
2. Add credentials for Docker registry
3. Use the credentials in Jenkinsfile

### 6. Create Jenkins Job

#### Option A: Using Jenkinsfile (Recommended)

1. Create a **New Item** → **Pipeline**
2. Configure:
   - **Pipeline Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: Your Git repository URL
   - **Branch**: main/master
   - **Script Path**: Jenkinsfile (should be in root of your repo)

#### Option B: Multi-branch Pipeline

1. Create a **New Item** → **Multibranch Pipeline**
2. Configure:
   - **Branch Sources**: Git
   - **Repository URL**: Your Git repository URL
   - **Script Path**: Jenkinsfile

### 7. Run Your First Build

1. Click **Build Now** on your pipeline
2. Watch the build progress
3. Check console output for any errors

## Monitoring

### View Jenkins Logs

```bash
docker logs -f jenkins
```

### Access Jenkins Container

```bash
docker exec -it jenkins bash
```

### Stop Jenkins

```bash
docker-compose down
```

### Stop and Remove Data

```bash
docker-compose down -v
```

⚠️ **Warning**: This will delete all Jenkins data including jobs, configurations, and builds.

## Pipeline Overview

The Jenkinsfile implements the following stages:

1. **Checkout**: Clones the repository
2. **Backend Build**: Compiles Java application using Maven
3. **Frontend Build**: Builds React application using npm
4. **Run Tests**: Executes backend tests and frontend linting
5. **Build Docker Images**: Creates Docker images for both services
6. **Deploy**: Starts the application using docker-compose
7. **Health Check**: Verifies all services are running

## Troubleshooting

### Jenkins cannot access Docker

If Jenkins can't access Docker, ensure:
1. Docker socket is mounted correctly
2. Jenkins container has proper permissions
3. Run: `docker exec -it jenkins groups`

### Build fails with "Maven not found"

1. Check if Maven is configured in **Global Tool Configuration**
2. Verify the tool name matches in Jenkinsfile

### Build fails with "npm not found"

1. Check if NodeJS is configured in **Global Tool Configuration**
2. Ensure NodeJS plugin is installed

### Permission Denied Errors

Run the following to fix permissions:
```bash
docker exec -u root -it jenkins chmod 666 /var/run/docker.sock
```

## Advanced Configuration

### Enable HTTPS

1. Use nginx reverse proxy
2. Obtain SSL certificates
3. Configure Jenkins behind HTTPS

### Set up Webhooks

1. Add webhook URL in your Git repository settings
2. URL: `http://your-jenkins-server:8080/github-webhook/`
3. Configure Jenkins pipeline to trigger on push

### Email Notifications

1. Install **Email Extension Plugin**
2. Configure SMTP settings
3. Add post-build action for email notifications

## Backup and Restore

### Backup Jenkins Data

```bash
docker exec jenkins tar czf /tmp/jenkins_backup.tar.gz /var/jenkins_home
docker cp jenkins:/tmp/jenkins_backup.tar.gz .
```

### Restore Jenkins Data

```bash
docker cp jenkins_backup.tar.gz jenkins:/tmp/
docker exec jenkins tar xzf /tmp/jenkins_backup.tar.gz -C /
docker restart jenkins
```

## References

- [Jenkins Official Documentation](https://www.jenkins.io/doc/)
- [Docker Pipeline Plugin](https://plugins.jenkins.io/docker-workflow/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)

