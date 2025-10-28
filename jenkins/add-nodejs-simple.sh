#!/bin/bash
# Quick script to install NodeJS plugin in Jenkins

echo "Installing NodeJS Plugin in Jenkins..."
echo ""

docker exec -it jenkins bash -c "jenkins-plugin-cli --plugins nodejs"
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install NodeJS plugin"
    exit 1
fi

echo ""
echo "NodeJS Plugin installed successfully!"
echo ""
echo "Restarting Jenkins..."
docker restart jenkins
echo ""
echo "Waiting for Jenkins to restart..."
sleep 10
echo ""
echo "Done! NodeJS plugin is now installed."
echo ""
echo "Next steps:"
echo "1. Go to http://localhost:8080"
echo "2. Login to Jenkins"
echo "3. Go to: Manage Jenkins → Tools"
echo "4. Click 'Add NodeJS'"
echo "5. Set Version to 18.x and Save"
echo ""

