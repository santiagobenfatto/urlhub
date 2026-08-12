# General Instructions

These rules apply to every task.

## Filesystem and Project Scope

- Before executing any command, identify and verify the project root.
- Treat the project root as the filesystem boundary for the task.
- Work only inside the project root directory.
- Do NOT access, inspect, read, list, modify, or execute files outside the project root.
- Do NOT use absolute paths pointing outside the project root.
- Do NOT traverse to parent directories (`../`) or inspect sibling projects/directories.
- All file paths used by commands must resolve inside the project root.
- Do NOT read or expose the contents of `.env`, `.env.local`, credentials, secrets, tokens, private keys, or other sensitive files unless the task explicitly requires them.
- Never print, quote, or include secret values in the final response.
- If information outside the project root appears necessary, STOP and ask for permission before accessing it.
- Never execute commands such as `ls ..`, `find ..`, `cat ../...`, or equivalent commands that inspect directories outside the project root.

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