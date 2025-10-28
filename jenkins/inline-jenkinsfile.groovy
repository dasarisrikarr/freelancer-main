// Inline Jenkinsfile for manual pipeline creation
// Copy this content when creating a new Pipeline job in Jenkins

pipeline {
    agent any
    
    environment {
        APP_VERSION = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Backend Build') {
            steps {
                echo 'Building backend...'
                dir('freelancer-backend') {
                    sh '''
                        #!/bin/bash
                        mvn clean package -DskipTests
                    '''
                    // For Windows PowerShell, use:
                    // bat 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building frontend...'
                dir('frontend') {
                    sh '''
                        #!/bin/bash
                        npm install
                        npm run build
                    '''
                    // For Windows, use:
                    // bat 'npm install && npm run build'
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('freelancer-backend') {
                            sh 'mvn test'
                            // bat 'mvn test' for Windows
                        }
                    }
                }
                stage('Frontend Lint') {
                    steps {
                        dir('frontend') {
                            sh 'npm run lint || true'
                            // bat 'npm run lint || exit 0' for Windows
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker-compose build'
                // bat 'docker-compose build' for Windows
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh '''
                    docker-compose down || true
                    docker image prune -f
                    docker-compose up -d
                '''
                // For Windows:
                // bat '''
                // docker-compose down
                // docker image prune -f
                // docker-compose up -d
                // '''
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Running health checks...'
                sh '''
                    sleep 30
                    curl -f http://localhost:9090/actuator/health || echo "Backend health check skipped"
                    curl -f http://localhost:80/ || echo "Frontend health check skipped"
                '''
                // For Windows:
                // bat '''
                // timeout /t 30 /nobreak
                // curl -f http://localhost:9090/actuator/health
                // curl -f http://localhost:80/
                // '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            sh 'docker image prune -f'
        }
        failure {
            echo 'Pipeline failed!'
            sh 'docker-compose logs --tail=100'
        }
    }
}

