# CI/CD Architecture Overview

This document describes the Jenkins CI/CD architecture for the Freelancer project.

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Git Repository                         │
│  (Code Push Triggers Pipeline)                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                       Jenkins Server                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │              CI/CD Pipeline Stages                  │    │
│  │                                                      │    │
│  │  1. Checkout Code                                    │    │
│  │  2. Build Backend (Maven)                            │    │
│  │  3. Build Frontend (npm)                             │    │
│  │  4. Run Tests                                        │    │
│  │  5. Build Docker Images                              │    │
│  │  6. Deploy Application                               │    │
│  │  7. Health Check                                     │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Docker Compose Services                   │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │  Frontend    │───▶│  Backend     │───▶│  PostgreSQL  │ │
│  │  (React)     │    │  (Spring)    │    │  (Database)  │ │
│  │  Port: 80    │    │  Port: 9090  │    │  Port: 5432  │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Components

### 1. Jenkins Server
- **Image**: `jenkins/jenkins:lts-jdk17`
- **Port**: 8080 (Web UI), 50000 (Agent communication)
- **Volume**: Persistent storage for jobs and configurations
- **Features**: Docker-in-Docker support for building images

### 2. Pipeline Definition (Jenkinsfile)
- **Language**: Groovy
- **Type**: Declarative Pipeline
- **Stages**: 7 automated stages
- **Triggers**: Manual or webhook-based

### 3. Application Services
- **Frontend**: React + Vite + Nginx
- **Backend**: Spring Boot + Java 17
- **Database**: PostgreSQL 15
- **Network**: Isolated Docker network

## 🔄 CI/CD Flow

### Pre-Deployment

1. **Code Push**
   - Developer pushes code to Git repository
   - Webhook triggers Jenkins pipeline (if configured)

2. **Code Checkout**
   - Jenkins clones repository
   - Checks out specified branch

3. **Build Stage**
   - Backend: Maven compiles Java code
   - Frontend: npm builds React application
   - Artifacts are generated

4. **Test Stage**
   - Backend unit tests executed
   - Frontend linting performed
   - Test results archived

5. **Image Build**
   - Multi-stage Docker builds
   - Optimized images created
   - Images tagged with version

### Deployment

6. **Deploy Stage**
   - Existing containers stopped
   - Old images cleaned up
   - New containers started

7. **Health Check**
   - Wait for services to be ready
   - Verify endpoint accessibility
   - Report deployment status

### Post-Deployment

8. **Monitoring**
   - Application logs available
   - Container health visible
   - Build history tracked

## 🎯 Benefits

### Automation
- ✅ No manual deployment steps
- ✅ Consistent build process
- ✅ Automated testing

### Quality
- ✅ Tests run before deployment
- ✅ Health checks ensure reliability
- ✅ Build artifacts archived

### Efficiency
- ✅ Parallel test execution
- ✅ Optimized Docker builds
- ✅ Fast feedback loop

### Reliability
- ✅ Rollback capability
- ✅ Health monitoring
- ✅ Comprehensive logging

## 📊 Pipeline Execution

### Typical Duration
- **Checkout**: ~5 seconds
- **Backend Build**: ~60-90 seconds
- **Frontend Build**: ~30-45 seconds
- **Tests**: ~20-40 seconds
- **Docker Build**: ~120-180 seconds
- **Deploy**: ~30 seconds
- **Health Check**: ~30 seconds
- **Total**: ~5-7 minutes

### Resource Usage
- **CPU**: Moderate during builds
- **Memory**: ~2GB for Jenkins + 1GB for application
- **Disk**: ~5GB for images and volumes

## 🔒 Security Considerations

### Current Setup
- Docker socket mounted for builds
- Credentials management support
- Isolated network for services

### Production Recommendations
- Enable HTTPS
- Use private registries
- Implement access control
- Regular security updates
- Backup strategy

## 📈 Scaling

### Vertical Scaling
- Increase Jenkins memory
- Add CPU resources
- Optimize Docker layers

### Horizontal Scaling
- Multiple Jenkins agents
- Distributed builds
- Load balancer for services

### Optimizations
- Build caching
- Layer optimization
- Parallel deployments
- CDN for static assets

## 🛠️ Technologies Used

| Component | Technology |
|-----------|-----------|
| CI/CD Server | Jenkins 2.x |
| Pipeline | Jenkins Pipeline (Groovy) |
| Container Platform | Docker + Docker Compose |
| Backend Build | Maven 3.9+ |
| Frontend Build | npm + Vite |
| Frontend | React 19 |
| Backend | Spring Boot 3.2 |
| Database | PostgreSQL 15 |
| Web Server | Nginx |
| OS | Any (Linux, Windows, Mac) |

## 📝 Configuration

### Environment Variables
```bash
# Jenkins
JENKINS_PORT=8080
JENKINS_HOME=/var/jenkins_home

# Application
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/freelancerdb
POSTGRES_DB=freelancerdb
```

### Ports
```
8080  - Jenkins
80    - Frontend
9090  - Backend
5432  - PostgreSQL
50000 - Jenkins Agent
```

## 🚀 Getting Started

See these documents for implementation:
1. **Quick Start**: [CI-CD-QUICK-START.md](CI-CD-QUICK-START.md)
2. **Detailed Setup**: [JENKINS_SETUP.md](JENKINS_SETUP.md)
3. **This Document**: Architecture overview

## 📚 Related Files

- `Jenkinsfile` - Pipeline definition
- `jenkins/docker-compose.yml` - Jenkins server
- `docker-compose.yml` - Application services
- `jenkins/setup.bat` / `setup.sh` - Setup scripts

## 🎓 Learning Resources

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Spring Boot Deployment](https://spring.io/guides/gs/spring-boot-docker/)
- [React Deployment](https://react.dev/learn)

---

**Architecture designed for scalability and maintainability**

