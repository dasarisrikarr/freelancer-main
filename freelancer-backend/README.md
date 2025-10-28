# Freelancer Backend (Spring Boot)

This is a ready-to-run Spring Boot backend for your Freelancer frontend.
It includes simple user registration/login and job posting endpoints matching your frontend fields.

## What is included
- Entities: User, Job
- Repositories: UserRepository, JobRepository
- Controllers: /api/auth (register, login), /api/jobs (add, list)
- CORS configured for http://localhost:5173 (your frontend URL)
- PostgreSQL connection configured in `application.properties` (DB: freelancerdb)

## How to run

1. Make sure you have Java 17+ and Maven installed.
2. Start PostgreSQL (or Docker) and create database `freelancerdb` or modify `application.properties`.
3. Run the app:
```bash
cd freelancer-backend
mvn spring-boot:run
```

## Endpoints
- `POST /api/auth/register` {"username","email","password"}
- `POST /api/auth/login` {"email","password"}
- `POST /api/jobs/add` {company,experience,skills,salary,location,description,benefits,responsibilities}
- `GET /api/jobs` -> list jobs

