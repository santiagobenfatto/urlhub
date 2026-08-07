## Working with AI Agents

If you are an AI coding assistant, read the files inside the `agents/` directory before making any changes.
Those files define the architecture, conventions, and development rules for this repository.

# UrlHub

A **URL shortening** and **personal hub management** web application. Shorten long URLs, organize them with custom aliases and icons, and display them as button links in a personal hub page.

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **MUI 6** (Material-UI) — Component library with dark theme
- **Redux Toolkit 2** — State management
- **React Router 6** — Client-side routing
- **React Toastify 11** — Toast notifications
- **@dnd-kit** — Drag-and-drop for hub link reordering
- **@fontsource** — Self-hosted fonts (Kalam, Montserrat, Roboto)

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
| `/hub/:hubId` | User Hub  | Public hub by ID           |
| `/*`         | AliasResolver | Resolves alias to public hub |

## Public Link Flow (non-authenticated users)

1. **Shortener** sends `POST /api/v1/links/short` with `{ big_link }`.
2. **Service** normalizes the nested API response (`data.data?.data || data.link || data`) and returns a flat link object.
3. **Shortener** adapts the fields into camelCase and saves via context (`addShortURL`) and to `localStorage` (`publicLinks` key).
4. **LinkDrawer** reads the public link from context, falling back to `localStorage` if the context is empty.
5. **Login** checks `localStorage` for a public link on success. If found, calls `PATCH /api/v1/links/migrate` to associate it with the user, then clears `localStorage`.

## Migration on Register / Login

When a user creates a public link (without logging in) and later registers:

- **Register** creates the account and redirects to `/login`.
- **Login** detects the public link in `localStorage` and calls `migratePublicLink(id)` to associate it with the authenticated user.
- If the backend endpoint is not yet available, the call fails gracefully and shows an informational toast.
- After successful migration, `localStorage` is cleared and the link appears in the user's dashboard.

## Architectural Notes

- **Redux** manages three slices: `links` (all user links), `hub` (links displayed on the hub page), and `user` (user profile info).
- **Service layer** (`src/Service/`) isolates all `fetch` calls to the backend API.
- **Adapters** (`src/Adapters/`) convert API responses from snake_case to camelCase.
- **Context** (`src/Context/LinksProvider.jsx`) manages public link state and editing state.
- **API endpoints** are configured via the `VITE_API_SERVER_URL` environment variable.
