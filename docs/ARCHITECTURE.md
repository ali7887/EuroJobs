## System Overview
The Job Board SaaS platform follows a Clean Layered Architecture designed to ensure:

separation of concerns
maintainability
testability
future database portability
scalable SaaS architecture
The system separates responsibilities across multiple layers so that business logic remains independent of infrastructure and framework concerns.

## High-Level Architecture
Client (Browser / Frontend UI)

↓

Next.js App Router

↓

API Routes (HTTP Layer)

↓

Validation Layer

↓

Service Layer (Business Logic)

↓

Repository Layer (Data Access)

↓

Database Layer

## Technology Stack
Frontend Framework

Next.js 15 (App Router)

Language

TypeScript (strict mode)

Runtime

Node.js

Database (Current)

LowDB (JSON-based development database)

Future Database

PostgreSQL

Validation

Zod

Authentication

JWT + Refresh Tokens

Password Hashing

bcrypt

Testing (Planned)

Vitest / Playwright

## Layered Architecture
1. API Layer
Location

src/app/api

Responsibilities

handle HTTP requests
validate request format
call service layer
format responses
manage HTTP status codes
Rules

no business logic
no database access
must delegate to services
Example routes

/api/jobs

/api/applications

/api/users

/api/auth

2. Validation Layer
Tool

Zod

Responsibilities

validate request body
validate query parameters
validate DTOs
ensure runtime type safety
Validation occurs before service logic executes.

3. Service Layer
Location

src/lib/services

Responsibilities

business logic
authorization rules
domain workflows
orchestration between repositories
Examples

JobService

UserService

ApplicationService

AuthService

Rules

no direct database calls
only communicate with repositories
enforce business rules
4. Repository Layer
Location

src/lib/repositories

Responsibilities

abstract database access
perform CRUD operations
isolate database technology
Examples

JobRepository

UserRepository

ApplicationRepository

Advantages

database implementation can change
easier testing
domain logic stays clean
5. Database Layer
Location

src/lib/db

Files

lowdb.client.ts

schema.ts

Current Database

LowDB (JSON database stored in data/db.json)

Purpose

lightweight development database
allows rapid prototyping
Future Plan

Migrate to PostgreSQL without changing service layer logic.

### Request Flow
The request lifecycle follows this pattern:

Client Request

↓

API Route

↓

Request Validation (Zod)

↓

Service Layer

↓

Repository Layer

↓

Database

↓

Service Response

↓

API Response

### Error Handling Strategy
Errors are categorized into:

Validation Errors

Business Logic Errors

Authentication Errors

Authorization Errors

Database Errors

Services throw structured errors which are translated into HTTP responses in the API layer.

### Security Architecture
Security is implemented across multiple layers.

Authentication

JWT access tokens

Refresh tokens

Token rotation

Password Security

bcrypt hashing

Authorization

RBAC (Role Based Access Control)

Roles

JOBSEEKER

EMPLOYER

ADMIN

Additional protections

login rate limiting

secure environment variable validation

safe user DTOs

### Data Transfer Objects (DTO)
DTOs are used to prevent leaking sensitive fields.

Example

SafeUser

Contains

id

email

name

role

Does NOT include

passwordHash

### Future Architectural Evolution
Planned improvements include:

PostgreSQL migration

Redis caching

search optimization

AI-powered job recommendations

horizontal scaling

microservice readiness

### Architectural Principles
Single Responsibility

Each layer must have one clear responsibility.

Dependency Direction

Upper layers depend on lower layers.

API → Services → Repositories → Database

Isolation

Business logic must remain independent of frameworks and databases.

Security First

Authentication and authorization must be enforced at the service layer.