# How to Run Docker Compose in Docker Desktop

## Prerequisites
- Docker Desktop must be installed and running on your laptop
- You should see a Docker icon in your system tray

## Step-by-Step Instructions

### Step 1: Start Docker Desktop
1. Launch Docker Desktop from your Start menu
2. Wait for it to fully start (you'll see "Docker is running" in the notification)

### Step 2: Navigate to Your Project
1. Open PowerShell or Command Prompt
2. Change to your project directory:
   ```powershell
   cd "C:\Users\srika\Downloads\resume files\Freelancer-main"
   ```

### Step 3: Run Docker Compose

#### Method 1: Quick Start (Recommended)
Simply double-click the `start-docker.bat` file, or run:
```powershell
.\start-docker.bat
```

#### Method 2: Docker Compose Command
Open PowerShell or Command Prompt in your project directory and run:
```powershell
docker-compose up -d --build
```

This command:
- `-d` runs containers in the background
- `--build` builds/rebuilds the images if needed

### Step 4: Wait for Build and Start
- The first time will take 3-5 minutes to build images
- You'll see progress for building backend, frontend, and starting the database

### Step 5: Verify in Docker Desktop
1. Open Docker Desktop
2. Go to the **Containers** tab
3. You should see three containers running:
   - `freelancer-postgres` (green)
   - `freelancer-backend` (green)
   - `freelancer-frontend` (green)

### Step 6: Access Your Application
- **Frontend**: Open browser and go to http://localhost
- **Backend API**: http://localhost:9090

## Viewing Logs in Docker Desktop

1. Open Docker Desktop
2. Click on a container name (e.g., `freelancer-backend`)
3. Click the **Logs** tab to see real-time logs

## Or View Logs in Terminal
```powershell
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## Common Commands

### Stop All Services
```powershell
docker-compose down
```

### Restart Services
```powershell
docker-compose restart
```

### View Running Containers
```powershell
docker-compose ps
```

### Remove Everything (including data)
```powershell
docker-compose down -v
```

## Troubleshooting

### "Docker is not running"
- Make sure Docker Desktop is running
- Look for the Docker whale icon in your system tray
- If not running, start Docker Desktop

### "Build failed" or "Port already in use"
- Check if ports 80, 9090, or 5432 are already used by other applications
- Stop conflicting services or change ports in `docker-compose.yml`

### Containers keep stopping
1. Check the logs in Docker Desktop
2. Click on the container → Logs tab
3. Look for error messages

### View detailed container status
In Docker Desktop:
1. Go to **Containers** tab
2. Click on any container
3. Check the **Inspect** or **Logs** tabs

## Quick Reference Card

| Task | Command |
|------|---------|
| Start | `docker-compose up -d --build` or `.\start-docker.bat` |
| Stop | `docker-compose down` |
| View Logs | `docker-compose logs -f` |
| Restart | `docker-compose restart` |
| Status | `docker-compose ps` |
| Frontend URL | http://localhost |
| Backend URL | http://localhost:9090 |

## What Happens When You Run

1. **PostgreSQL Database** starts first
2. **Backend (Spring Boot)** builds, then waits for database
3. **Frontend (React)** builds and serves files via Nginx
4. All three services communicate via Docker network







