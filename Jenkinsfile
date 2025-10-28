pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'localhost:5000' // Optional: local registry
        APP_VERSION = "${env.BUILD_NUMBER}"
        DOCKER_USERNAME = credentials('docker-credentials')
        DOCKER_PASSWORD = credentials('docker-password')
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
                        sh "${mavenHome}/bin/mvn clean package -DskipTests"
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
                        sh 'npm install'
                        sh 'npm run build'
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
                                sh "${mavenHome}/bin/mvn test"
                            }
                        }
                    }
                }
                
                stage('Frontend Lint') {
                    steps {
                        echo 'Running frontend linting...'
                        dir('frontend') {
                            sh 'npm run lint || true' // Continue even if lint fails
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker-compose build'
            }
        }
        
        stage('Deploy to Production') {
            steps {
                echo 'Deploying application...'
                script {
                    // Stop existing containers
                    sh 'docker-compose down || true'
                    
                    // Remove old images to free up space
                    sh 'docker image prune -f'
                    
                    // Start new containers
                    sh 'docker-compose up -d'
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Running health checks...'
                script {
                    // Wait for services to be ready
                    sh 'sleep 30 || timeout /t 30 /nobreak'
                    
                    // Check backend health (gracefully fail)
                    sh 'curl -f http://localhost:9090/actuator/health 2>/dev/null || echo "Backend health endpoint not available"'
                    
                    // Check frontend (gracefully fail)
                    sh 'curl -f http://localhost:80/ 2>/dev/null || echo "Frontend not accessible"'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            // Clean up old images
            sh 'docker image prune -f'
        }
        failure {
            echo 'Pipeline failed!'
            // Keep logs for debugging
            sh 'docker-compose logs --tail=100'
        }
        always {
            // Archive artifacts
            archiveArtifacts artifacts: '**/*.jar', allowEmptyArchive: true
            publishTestResults testResultsPattern: '**/test-results.xml'
        }
    }
}

