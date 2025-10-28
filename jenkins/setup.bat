@echo off
REM Jenkins CI/CD Setup Script for Freelancer Project (Windows)

echo ==========================================
echo Jenkins CI/CD Setup Script
echo ==========================================
echo.

REM Check prerequisites
echo Checking prerequisites...

docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker Compose is not installed. Please install Docker Desktop which includes Docker Compose.
    pause
    exit /b 1
)

echo All prerequisites met
echo.

REM Check if Jenkins is already running
docker ps | findstr jenkins >nul 2>&1
if not errorlevel 1 (
    echo Jenkins is already running.
    echo.
    set /p answer="Do you want to stop it and start a fresh instance? (y/n): "
    if /i "%answer%"=="y" (
        echo Stopping existing Jenkins...
        docker-compose -f jenkins\docker-compose.yml down
    ) else (
        echo Keeping existing instance.
        pause
        exit /b 0
    )
)

REM Start Jenkins
echo Starting Jenkins...
cd jenkins
docker-compose up -d

REM Wait for Jenkins to be ready
echo.
echo Waiting for Jenkins to start...
timeout /t 10 /nobreak >nul

REM Get initial admin password
echo.
echo Getting initial admin password...
for /l %%i in (1,1,30) do (
    docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword >nul 2>&1
    if not errorlevel 1 (
        echo Jenkins is ready!
        echo.
        echo ==========================================
        echo Jenkins Setup Information
        echo ==========================================
        echo URL: http://localhost:8080
        echo Initial Admin Password:
        docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
        echo.
        echo Next steps:
        echo 1. Open http://localhost:8080 in your browser
        echo 2. Enter the password shown above
        echo 3. Install suggested plugins
        echo 4. Configure tools (Maven, NodeJS)
        echo 5. Create a pipeline job
        echo.
        echo You can view Jenkins logs with:
        echo docker logs -f jenkins
        echo.
        cd ..
        pause
        exit /b 0
    )
    echo Waiting for Jenkins... (%%i/30)
    timeout /t 2 /nobreak >nul
)

echo Failed to get Jenkins admin password
echo Check Jenkins logs with: docker logs jenkins
echo.
echo TROUBLESHOOTING TIPS:
echo 1. Some plugins may fail to install - this is normal
echo 2. Click "Continue anyway" or "Continue with partly installed plugins"
echo 3. Essential plugins will be installed automatically
echo 4. See: jenkins\fix-plugin-installation.md for more help
cd ..
pause
exit /b 1

