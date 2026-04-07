AI_DEVELOPMENT_WORKFLOW.md
Purpose
This document defines the professional workflow for developing software with AI assistants such as Claude or ChatGPT.

It prevents context loss, architectural drift, and inconsistent code generation.

Core Principles
AI should act as:

Architect
Senior Engineer
Code Generator
Code Reviewer
Not as an uncontrolled code generator.

Development must remain structured and phase‑based.

Project Context System
Every project must maintain a persistent state file.

Required file:

PROJECT_STATE.md

This file contains:

current progress
architecture
completed modules
current phase
next tasks
When starting a new AI conversation, this file must be pasted to restore context.

Master Prompt Strategy
Large projects require a master prompt.

The master prompt defines:

architecture rules
coding standards
security requirements
development phases
constraints
This ensures the AI produces consistent output across sessions.

Phase-Based Development
Each major system should be implemented in separate AI conversations.

Recommended phase structure:

Phase 1 — Architecture

Phase 2 — Authentication

Phase 3 — Core Backend

Phase 4 — Frontend Integration

Phase 5 — AI Features

Phase 6 — Testing

Phase 7 — Deployment

This prevents context overflow.

Context Reset Strategy
Long conversations degrade AI performance.

Symptoms:

inconsistent code
forgetting architecture
hallucinated APIs
repeated mistakes
Solution:

Start a new chat and restore context using:

Master Prompt
PROJECT_STATE.md
Recommended Development Loop
Step 1

Define the current task clearly.

Example:

Implement AuthService with login and JWT token generation.

Step 2

Ask the AI to generate the implementation.

Step 3

Review the generated code.

Step 4

Refactor or request improvements.

Step 5

Update PROJECT_STATE.md.

Code Generation Rules
AI generated code must follow:

strict TypeScript
modular architecture
separation of concerns
secure defaults
Never accept large code blocks without reviewing them.

Architectural Protection
To prevent architecture drift:

Always remind the AI about:

service layer
repository layer
validation layer
DTO patterns
The AI must not bypass layers.

AI as Pair Programmer
Treat the AI like a senior pair programmer.

Responsibilities:

AI:

generate code
explain architecture
suggest improvements
Developer:

validate logic
test functionality
control architecture decisions
Context Optimization Tips
Avoid extremely long conversations.

Prefer:

multiple focused chats instead of one massive chat.

Always maintain:

PROJECT_STATE.md

Long-Term Project Strategy
Large projects should evolve through:

Architecture → Core Systems → Features → Optimization → Deployment

Do not jump randomly between systems.

Follow the defined roadmap.

Final Rule
The AI is a powerful accelerator, but the developer must remain the architect.

Maintain architectural discipline and documentation to ensure long-term scalability.