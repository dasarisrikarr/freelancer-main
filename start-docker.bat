@echo off
echo Starting Freelancer Application with Docker Compose...
echo.
echo This will:
echo - Build the frontend (React)
echo - Build the backend (Spring Boot)
echo - Start PostgreSQL database
echo - Start all services
echo.
echo Please wait...
echo.

docker-compose up -d --build

echo.
echo ========================================
echo Application is starting!
echo ========================================
echo.
echo Frontend: http://localhost
echo Backend API: http://localhost:9090
echo.
echo To view logs: docker-compose logs -f
echo To stop services: docker-compose down
echo.
pause







