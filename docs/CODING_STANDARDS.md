Purpose
This document defines the coding standards for the Job Board SaaS project.

All code must follow these standards to ensure:

consistency
readability
maintainability
professional engineering quality
The project is designed as a portfolio-grade SaaS platform and must follow practices used in real software companies.

Language Standards
All code must be written using:

TypeScript (strict mode)

Requirements:

avoid any
prefer explicit typing
use type inference when safe
create reusable types and interfaces
Example

Good

type Job = {

id: string

title: string

company: string

}

Bad

const job: any = {}

File Naming Conventions
Use consistent naming.

Components

PascalCase

Example

JobCard.tsx

ApplicationForm.tsx

Functions

camelCase

Example

createJob()

getUserById()

Constants

UPPER_SNAKE_CASE

Example

MAX_LOGIN_ATTEMPTS

CSS files

kebab-case

Example

job-card.css

Folder Organization
Keep modules grouped by responsibility.

Example

src

app/

components/

lib/

services/

repositories/

types/

utils/

Avoid very large files.

If a file grows beyond ~300 lines it should be refactored.

Component Design
React components should follow these rules.

Single Responsibility

Each component should have a clear purpose.

Example

Good

JobCard → displays job information

Bad

JobCard → fetches data + handles API + renders UI

Component Structure
Recommended order inside components

imports

types

constants

component logic

handlers

render JSX

API Design Standards
API routes must follow REST principles.

Examples

GET /api/jobs

POST /api/jobs

GET /api/jobs/:id

PATCH /api/jobs/:id

DELETE /api/jobs/:id

Error Handling
Errors must be predictable and structured.

Do not return raw errors.

Example structure

{

“error”: {

“code”: “JOB_NOT_FOUND”,

“message”: “The requested job does not exist”

}

}

Logging
Important actions should be logged.

Examples

user login

job creation

job application

authentication failures

Avoid logging sensitive data.

Security Practices
Always follow secure defaults.

Requirements

hash passwords with bcrypt

never expose passwordHash

validate all inputs with Zod

never trust client input

use DTOs for API responses

Animation Standards
Animations must enhance UX without harming performance.

Use:

Framer Motion

GSAP

Rules

animations must be subtle

avoid excessive motion

animations must not block interaction

Three.js Usage
Three.js should be used only for:

hero visual sections

background visual effects

interactive visual components

Avoid heavy 3D scenes that impact performance.

CSS Rules
Only use CSS.

Allowed

global CSS

CSS modules

Not allowed

Tailwind

Styled Components

CSS-in-JS frameworks

CSS guidelines

prefer reusable classes

avoid overly deep selectors

keep styles modular

Code Comments
Use comments only when needed.

Explain:

complex logic

architecture decisions

non-obvious code

Avoid obvious comments.

Bad

// increment counter

Good

// Prevent duplicate job applications from the same user

Git Practices
Use meaningful commit messages.

Examples

feat: add job application endpoint

fix: correct authentication middleware bug

refactor: improve repository abstraction

Code Review Mindset
Before adding new code ask:

Is this reusable?

Does it follow architecture rules?

Is there already an implementation?

Can it be simplified?

Final Principle
Write code that another engineer can understand in less than 30 seconds.