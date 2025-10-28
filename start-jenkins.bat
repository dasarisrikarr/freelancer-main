@echo off
REM Jenkins CI/CD Start Script

echo ==========================================
echo   Freelancer Project - Jenkins CI/CD
echo ==========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo Starting Jenkins CI/CD Server...
echo.

REM Navigate to jenkins directory
cd jenkins

REM Check if Jenkins is already running
docker ps | findstr jenkins >nul 2>&1
if not errorlevel 1 (
    echo Jenkins is already running!
    echo.
    echo Access Jenkins at: http://localhost:8080
    echo.
    echo To view logs: docker logs -f jenkins
    echo To stop: cd jenkins ^&^& docker-compose down
    pause
    exit /b 0
)

REM Start Jenkins
echo Starting Jenkins container...
docker-compose up -d

REM Wait for Jenkins to start
echo.
echo Waiting for Jenkins to initialize...
timeout /t 15 /nobreak >nul

REM Get admin password
echo.
echo ==========================================
echo   Jenkins Setup Information
echo ==========================================
echo.
echo URL: http://localhost:8080
echo.
echo Admin Password:
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword 2>nul
echo.
echo ==========================================
echo.
echo Next Steps:
echo 1. Open http://localhost:8080 in your browser
echo 2. Enter the admin password shown above
echo 3. Install suggested plugins
echo 4. Configure tools (Maven, NodeJS)
echo 5. Create a pipeline job
echo.
echo Useful Commands:
echo   View logs:  docker logs -f jenkins
echo   Stop:       cd jenkins ^&^& docker-compose down
echo   Restart:    docker-compose restart jenkins
echo.
echo Detailed documentation: JENKINS_SETUP.md
echo Quick start: CI-CD-QUICK-START.md
echo.
echo Press any key to continue...
pause >nul

cd ..

