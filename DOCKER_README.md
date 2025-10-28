# Docker Deployment Guide

This project is containerized using Docker Compose for easy deployment.

## Architecture

- **Frontend**: React + Vite served with Nginx
- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL

## Prerequisites

- Docker Desktop installed
- Docker Compose installed (included with Docker Desktop)

## Quick Start

1. **Navigate to the project root directory**
   ```bash
   cd "C:\Users\srika\Downloads\resume files\Freelancer-main"
   ```

2. **Build and start all services**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:9090
   - Database: localhost:5432

## Services

### Frontend
- **Port**: 80
- **Technology**: React with Vite
- **Served by**: Nginx

### Backend
- **Port**: 9090 (mapped from 8080 inside container)
- **Technology**: Spring Boot
- **Database**: PostgreSQL

### Database
- **Port**: 5432
- **Database Name**: freelancerdb
- **Username**: postgres
- **Password**: #Cfyouvuid2

## Docker Compose Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### Stop and remove volumes (WARNING: This deletes the database data)
```bash
docker-compose down -v
```

## Development

### Frontend Development
If you want to modify the frontend:
1. Edit files in `frontend/` directory
2. Rebuild: `docker-compose up -d --build frontend`

### Backend Development
If you want to modify the backend:
1. Edit files in `freelancer-backend/` directory
2. Rebuild: `docker-compose up -d --build backend`

## Troubleshooting

### Check if containers are running
```bash
docker-compose ps
```

### View detailed logs for debugging
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

### Access database directly
```bash
docker exec -it freelancer-postgres psql -U postgres -d freelancerdb
```

### Restart a specific service
```bash
docker-compose restart backend
```

### Clean rebuild (if you're having issues)
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Environment Variables

You can customize the configuration by editing environment variables in `docker-compose.yml`:

- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `SPRING_DATASOURCE_*`: Spring Boot datasource settings

## Notes

- The database data persists in a Docker volume named `postgres_data`
- Frontend API calls are configured to use `localhost:9090` for the backend
- The backend connects to PostgreSQL using the service name `postgres` within the Docker network







