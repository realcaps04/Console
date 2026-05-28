# Console Project Documentation

## Project Overview

`Console` is a React + Vite web application that serves as a UI portal for an architectural management platform. It includes authentication, dashboard-style interaction, information pages, and a set of modules for learning, project management, and resource discovery.

## Technology Stack

- React 19
- Vite
- Supabase JavaScript client (`@supabase/supabase-js`)
- Lucide React icons (`lucide-react`)
- Plain CSS modules per component
- Environment-based Supabase configuration via `import.meta.env`

## Main Concepts

- **Client-side routing**: custom page selection in `src/App.jsx` using `window.history`, `window.location.pathname`, and `URLSearchParams`.
- **React state management**: `useState`, `useEffect`, `useRef` for active page state, auth banner, toggles, FAQ expansion, and carousel control.
- **Authentication flow**: Supabase password sign-in in `src/SignIn.jsx` and session-aware protected page handling in `src/App.jsx`.
- **Protected UI sections**: certain views are guarded and redirect unauthenticated users to the sign-in page.
- **Dashboard UI**: user-facing dashboard with tabs, navigation menu, notifications, search, inbox/messages, and profile-like panels.
- **Component-based layout**: separate files for each page and feature area, with dedicated CSS files for styling.
- **Supabase integration helper**: `src/utils/supabase.js` creates the Supabase client used across the app.
- **Reusable page/content patterns**: hero sections, cards, info grids, FAQs, review carousel, and call-to-action buttons.

## Project Structure

### Root files

- `index.html`: Vite app entry HTML.
- `package.json`: dependencies and scripts.
- `README.md`: default Vite template README.
- `vite.config.js`: Vite configuration.
- `CONSOLE_PROJECT_DOCUMENTATION.md`: project documentation (this file).

### Source folder: `src/`

- `main.jsx`: React app bootstrap.
- `App.jsx`: central app component, page router, state, authentication guard, and main layout switching.
- `utils/supabase.js`: Supabase client initialization.

### Page components

- `SignIn.jsx` / `SignIn.css`: sign-in page with Supabase password authentication and OAuth button placeholders.
- `UserDashboard.jsx` / `UserDashboard.css`: dashboard interface with sidebar navigation and tabbed content sections.
- `GetStarted.jsx` / `GetStarted.css`: introductory / onboarding page.
- `Documentation.jsx` / `Documentation.css`: documentation content page.
- `Solutions.jsx` / `Solutions.css`: solutions overview page.
- `Resources.jsx` / `Resources.css`: resources and tools page.
- `Jobs.jsx` / `Jobs.css`: jobs module page.
- `OpenPositions.jsx` / `OpenPositions.css`: open positions module.
- `ProjectDevelopment.jsx` / `ProjectDevelopment.css`: project development module.
- `DataFlowManagement.jsx` / `DataFlowManagement.css`: data flow management module.
- `LanguageLearning.jsx` / `LanguageLearning.css`: language learning module.
- `CapsMushLogin.jsx` / `CapsMushLogin.css`: additional branded login page.
- `LearnerLogin.jsx` / `LearnerLogin.css`: learner login page.
- `LearnerRegistration.jsx` / `LearnerRegistration.css`: learner registration page.
- `LearnerDashboard.jsx` / `LearnerDashboard.css`: learner dashboard page.
- `NotFound.jsx` / `NotFound.css`: 404 / fallback page.

### Supporting folders

- `src/assets/`: likely contains static images and assets used by the app.
- `public/`: Vite static public folder.
- `Sup-queries/`: SQL scripts for setting up Supabase tables.
  - `create_learners_table.sql`
  - `create_users_table.sql`

## Key Features Implemented

### Authentication

- Supabase password-based login using `supabase.auth.signInWithPassword`.
- Login form fields: email, password, remember me.
- Success and error state handling.
- Redirect handling after sign-in.

### Navigation and Page Routing

- URL-driven navigation based on `window.location.pathname`.
- Query parameter support to navigate pages via `?page=...`.
- `activePage` state controls which component is rendered.
- `window.history.pushState` maintains clean URLs.

### User experience and UI

- Modern dashboard-style pages with sidebar navigation and header actions.
- Review/testimonial sections and FAQ expanders.
- Search input, notification button, and profile controls in dashboard.
- Auth guard banners that show when protected pages are blocked.

### Supabase and data hooks

- `src/utils/supabase.js` initializes the Supabase client.
- App includes a placeholder for a Supabase query to fetch `todos`, currently commented out because the table does not exist yet.

## Notes and TODOs

- The sign-in page currently navigates to `home` after sign-in; this can be updated to direct the user to `userdashboard` or another authenticated page.
- OAuth buttons and some links are currently placeholders leading to `notfound`.
- Session persistence is stored in `sessionStorage` for `activePage` and `previousPage`.
- `todos` fetch logic exists but is disabled until the database table is created.

## How to Run

From the `Console` folder:

```bash
npm install
npm run dev
```

Then open the local Vite URL displayed in the terminal.

## Recommended Next Steps

- Add full Supabase auth flow with session persistence and sign-out.
- Complete protected routing for learner and dashboard pages.
- Use real Supabase tables from `Sup-queries/` and implement data-driven pages.
- Enhance mobile responsiveness and accessibility.
- Replace placeholder buttons (`notfound`) with real navigation or functionality.
