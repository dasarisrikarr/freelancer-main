#!/bin/bash
# Jenkins CI/CD Start Script

echo "=========================================="
echo "   Freelancer Project - Jenkins CI/CD"
echo "=========================================="
echo ""

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "ERROR: Docker is not running!"
    echo "Please start Docker and try again."
    exit 1
fi

echo "Starting Jenkins CI/CD Server..."
echo ""

# Navigate to jenkins directory
cd jenkins

# Check if Jenkins is already running
if docker ps | grep -q jenkins; then
    echo "Jenkins is already running!"
    echo ""
    echo "Access Jenkins at: http://localhost:8080"
    echo ""
    echo "To view logs: docker logs -f jenkins"
    echo "To stop: docker-compose down"
    exit 0
fi

# Start Jenkins
echo "Starting Jenkins container..."
docker-compose up -d

# Wait for Jenkins to start
echo ""
echo "Waiting for Jenkins to initialize..."
sleep 15

# Get admin password
echo ""
echo "=========================================="
echo "   Jenkins Setup Information"
echo "=========================================="
echo ""
echo "URL: http://localhost:8080"
echo ""
echo "Admin Password:"
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null
echo ""
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Open http://localhost:8080 in your browser"
echo "2. Enter the admin password shown above"
echo "3. Install suggested plugins"
echo "4. Configure tools (Maven, NodeJS)"
echo "5. Create a pipeline job"
echo ""
echo "Useful Commands:"
echo "  View logs:  docker logs -f jenkins"
echo "  Stop:       docker-compose down"
echo "  Restart:    docker-compose restart jenkins"
echo ""
echo "Detailed documentation: JENKINS_SETUP.md"
echo "Quick start: CI-CD-QUICK-START.md"
echo ""

cd ..

