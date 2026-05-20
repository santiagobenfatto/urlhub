# UrlHub

A **URL shortening** and **personal hub management** web application. Shorten long URLs, organize them with custom aliases and icons, and display them as button links in a personal hub page.

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **MUI 6** (Material-UI) — Component library with dark theme
- **Redux Toolkit 2** — State management
- **React Router 6** — Client-side routing
- **React Toastify 11** — Toast notifications

## Features

- **URL shortening** — Paste a long URL, optionally customize the alias, and get a short link
- **Personal Hub** — A page that displays your links as styled buttons with icons and titles
- **Dashboard** — Full CRUD for your links (add, edit, delete)
- **Authentication** — Login and register with session-based auth
- **Dark theme** — Black background with amber accent (MUI theme)

## Project Structure

```
src/
  Adapters/        # Transform API snake_case to frontend camelCase
  Components/      # Reusable UI (Hub, LinksTable, NavBar, Icons, etc.)
  Context/         # React Context for link editing state
  Hooks/           # Custom hooks (auth redirect)
  Pages/           # Route-level page components
  Redux/
    slices/        # Redux Toolkit slices (links, hub, user)
    store.js       # Redux store
  Routes/          # React Router configuration
  Service/         # API service layer (links, hub, auth)
  Theme/           # MUI theme customization
  Utils/           # Validation helpers
```

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd urlhub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment config**

   Create a `.env.local` file in the project root:

   ```
   VITE_API_SERVER_URL=http://localhost:3001/
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   Visit [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Script            | Description                   |
|-------------------|-------------------------------|
| `npm run dev`     | Start Vite dev server         |
| `npm run build`   | Build for production          |
| `npm run lint`    | Run ESLint across the project |
| `npm run preview` | Preview the production build  |
| `npm test`        | Run integration tests         |
| `npm run test:watch` | Run tests in watch mode    |

## Tests

Integration tests covering the app's critical flows:

| File | Tests | Description |
|------|-------|-------------|
| `tests/integration/register.test.jsx` | 2 | Success redirects to `/login`; API error shows toast |
| `tests/integration/login.test.jsx` | 2 | Success dispatches user + redirects to `/`; bad credentials show toast |
| `tests/integration/public-links.test.jsx` | 3 | Shorten URL saves to context/localStorage; nested API response; duplicate link shows info toast |
| `tests/integration/private-links.test.jsx` | 4 | Load links table, create, edit, and delete links |
| `tests/integration/hub.test.jsx` | 2 | Fetch hub from API; add link to hub from LinksTable |
| `tests/integration/auth.test.jsx` | 2 | Expired session redirects to `/home`; logout clears store and redirects |

**Stack:** Vitest, Testing Library, user-event, jsdom, MSW-free (service functions mocked directly with `vi.mock`).

```bash
npm test          # Run once
npm run test:watch  # Watch mode
```

## Routes

| Path         | Page       | Description                |
|--------------|------------|----------------------------|
| `/`          | Home       | Landing page with hub demo |
| `/login`     | Login      | User login                 |
| `/register`  | Register   | User registration          |
| `/dashboard` | Dashboard  | Link CRUD management       |
| `/hub`       | User Hub   | Personal hub display       |

## Architectural Notes

- **Redux** manages three slices: `links` (all user links), `hub` (links displayed on the hub page), and `user` (user profile info).
- **Service layer** (`src/Service/`) isolates all `fetch` calls to the backend API.
- **Adapters** (`src/Adapters/`) convert API responses from snake_case to camelCase.
- **Context** (`src/Context/LinksProvider.jsx`) manages editing state separate from Redux.
- **API endpoints** are configured via the `VITE_API_SERVER_URL` environment variable.
