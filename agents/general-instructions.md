# General Instructions

These rules apply to every task.

## Scope

- Modify only what is explicitly requested.
- Do not refactor unrelated code.
- Do not redesign the architecture.
- Keep changes as small as possible.

## Architecture

- Respect the current project architecture.
- Preserve existing API contracts unless explicitly requested.
- Do not introduce new abstractions without justification.
- Do not add dependencies unless explicitly requested.

## Code Style

- Follow the existing code style.
- Keep naming conventions consistent.
- Prefer readability over clever code.
- Reuse existing utilities whenever possible.

## Backend / Frontend

- Do not invent temporary workarounds.
- If backend work is required, clearly state the required API contract.
- Do not modify adapters unless the backend contract changes.

## Planning

- When requested in PLAN mode, do not edit code.
- Explain the implementation before modifying files.
- Mention every file that will be changed.

## Final Output

Always include:

- Files modified
- Brief explanation
- Any backend dependency