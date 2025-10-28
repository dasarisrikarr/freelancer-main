#!/bin/bash

# Jenkins CI/CD Setup Script for Freelancer Project

echo "=========================================="
echo "Jenkins CI/CD Setup Script"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command_exists docker; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command_exists docker-compose; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites met${NC}"

# Create jenkins directory if it doesn't exist
mkdir -p jenkins

# Check if Jenkins is already running
if docker ps | grep -q jenkins; then
    echo -e "\n${YELLOW}Jenkins is already running.${NC}"
    read -p "Do you want to stop it and start a fresh instance? (y/n): " answer
    if [[ $answer == "y" || $answer == "Y" ]]; then
        echo "Stopping existing Jenkins..."
        docker-compose -f jenkins/docker-compose.yml down
    else
        echo "Keeping existing instance."
        exit 0
    fi
fi

# Start Jenkins
echo -e "\n${YELLOW}Starting Jenkins...${NC}"
cd jenkins && docker-compose up -d

# Wait for Jenkins to be ready
echo -e "\n${YELLOW}Waiting for Jenkins to start...${NC}"
sleep 10

# Get initial admin password
echo -e "\n${GREEN}Getting initial admin password...${NC}"
for i in {1..30}; do
    PASSWORD=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null)
    if [ ! -z "$PASSWORD" ]; then
        echo -e "\n${GREEN}✓ Jenkins is ready!${NC}"
        echo -e "\n${YELLOW}=========================================="
        echo "Jenkins Setup Information"
        echo "==========================================${NC}"
        echo -e "URL: ${GREEN}http://localhost:8080${NC}"
        echo -e "Initial Admin Password: ${GREEN}${PASSWORD}${NC}"
        echo -e "\n${YELLOW}Next steps:${NC}"
        echo "1. Open http://localhost:8080 in your browser"
        echo "2. Enter the password shown above"
        echo "3. Install suggested plugins"
        echo "4. Configure tools (Maven, NodeJS)"
        echo "5. Create a pipeline job"
        echo -e "\n${YELLOW}You can view Jenkins logs with:${NC}"
        echo "docker logs -f jenkins"
        echo ""
        exit 0
    fi
    echo "Waiting for Jenkins... ($i/30)"
    sleep 2
done

echo -e "${RED}Failed to get Jenkins admin password${NC}"
echo "Check Jenkins logs with: docker logs jenkins"
echo ""
echo "TROUBLESHOOTING TIPS:"
echo "1. Some plugins may fail to install - this is normal"
echo "2. Click 'Continue anyway' or 'Continue with partly installed plugins'"
echo "3. Essential plugins will be installed automatically"
echo "4. See: jenkins/fix-plugin-installation.md for more help"
exit 1

