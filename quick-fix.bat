@echo off
echo Fixing Docker authentication issue...
echo.

echo Step 1: Pulling PostgreSQL image...
docker pull postgres:15-alpine

echo.
echo Step 2: Pulling Maven image...
docker pull maven:3.9.4-eclipse-temurin-17

echo.
echo Step 3: Pulling Java runtime image...
docker pull eclipse-temurin:17-jre

echo.
echo Step 4: Pulling Node image...
docker pull node:18

echo.
echo Step 5: Pulling Nginx image...
docker pull nginx:alpine

echo.
echo All images pulled successfully!
echo Now run: docker-compose up -d --build
echo.
pause





