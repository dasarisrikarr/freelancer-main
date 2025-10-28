pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'localhost:5000' // Optional: local registry
        APP_VERSION = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Backend Build') {
            steps {
                echo 'Building backend application...'
                dir('freelancer-backend') {
                    script {
                        def mavenHome = tool 'Maven'
                        if (isUnix()) {
                            sh "${mavenHome}/bin/mvn clean package -DskipTests"
                        } else {
                            bat "\"${mavenHome}\\bin\\mvn.cmd\" clean package -DskipTests"
                        }
                    }
                }
            }
            post {
                success {
                    echo 'Backend build completed successfully'
                }
                failure {
                    echo 'Backend build failed'
                }
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building frontend application...'
                dir('frontend') {
                    script {
                        if (isUnix()) {
                            sh 'npm install'
                            sh 'npm run build'
                        } else {
                            bat 'npm install'
                            bat 'npm run build'
                        }
                    }
                }
            }
            post {
                success {
                    echo 'Frontend build completed successfully'
                }
                failure {
                    echo 'Frontend build failed'
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        echo 'Running backend tests...'
                        dir('freelancer-backend') {
                            script {
                                def mavenHome = tool 'Maven'
                                if (isUnix()) {
                                    sh "${mavenHome}/bin/mvn test"
                                } else {
                                    bat "\"${mavenHome}\\bin\\mvn.cmd\" test"
                                }
                            }
                        }
                    }
                }
                
                stage('Frontend Lint') {
                    steps {
                        echo 'Running frontend linting...'
                        dir('frontend') {
                            script {
                                if (isUnix()) {
                                    sh 'npm run lint || true' // Continue even if lint fails
                                } else {
                                    bat 'cmd /c npm run lint || exit /b 0' // Continue even if lint fails
                                }
                            }
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                script {
                    if (isUnix()) {
                        sh 'docker compose build || docker-compose build'
                    } else {
                        bat 'cmd /c docker compose build || docker-compose build'
                    }
                }
            }
        }
        
        stage('Deploy to Production') {
            steps {
                echo 'Deploying application...'
                script {
                    // Stop existing containers
                    if (isUnix()) {
                        sh 'docker compose down || docker-compose down || true'
                    } else {
                        bat 'cmd /c docker compose down || docker-compose down || exit /b 0'
                    }
                    
                    // Remove old images to free up space
                    if (isUnix()) {
                        sh 'docker image prune -f'
                    } else {
                        bat 'docker image prune -f'
                    }
                    
                    // Start new containers
                    if (isUnix()) {
                        sh 'docker compose up -d || docker-compose up -d'
                    } else {
                        bat 'cmd /c docker compose up -d || docker-compose up -d'
                    }
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Running health checks...'
                script {
                    // Wait for services to be ready
                    if (isUnix()) {
                        sh 'sleep 30'
                    } else {
                        bat 'timeout /t 30 /nobreak'
                    }
                    
                    // Check backend health (gracefully fail)
                    if (isUnix()) {
                        sh 'curl -fsS http://localhost:9090/actuator/health || echo "Backend health endpoint not available"'
                    } else {
                        bat 'cmd /c curl.exe -f http://localhost:9090/actuator/health || echo Backend health endpoint not available'
                    }
                    
                    // Check frontend (gracefully fail)
                    if (isUnix()) {
                        sh 'curl -fsS http://localhost/ || echo "Frontend not accessible"'
                    } else {
                        bat 'cmd /c curl.exe -f http://localhost:80/ || echo Frontend not accessible'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            // Clean up old images
            script {
                if (isUnix()) {
                    sh 'docker image prune -f'
                } else {
                    bat 'docker image prune -f'
                }
            }
        }
        failure {
            echo 'Pipeline failed!'
            // Keep logs for debugging
            script {
                if (isUnix()) {
                    sh 'docker compose logs --tail=100 || docker-compose logs --tail=100 || true'
                } else {
                    bat 'cmd /c docker compose logs --tail=100 || docker-compose logs --tail=100'
                }
            }
        }
        always {
            // Archive artifacts
            archiveArtifacts artifacts: '**/*.jar', allowEmptyArchive: true
            junit testResults: '**/test-results.xml', allowEmptyResults: true
        }
    }
}

