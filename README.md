# TV MAZE API Dashboard (random SHOWS by Ilijad)

This project is a TV shows dashboard that fetches data from [TVMaze](https://www.tvmaze.com/api). Users can:

- View a paginated list of shows
- Filter and sort shows (by genres, rating, status, etc.)
- Search for shows by name
- Click “I’m Feeling Lucky” to see a random show
- See detailed information about a selected show (episodes, cast, crew, etc.)

## Tech Stack & Framework Choice

- **Vue 3** (with the **Composition API**):

  - Chosen for its reactive system, readability, and reusability of logic via composables.
  - The Composition API makes it straightforward to separate logic from the UI layer and share it across components.

- **Tailwind CSS**:

  - Used for quick and consistent styling (utility-first approach).

- **Vitest** (unit testing) & **Playwright** (e2e testing):
  - Vitest for fast, isolated unit tests.
  - Playwright for end-to-end tests that ensure the app works in real browsers.

## Project Structure

```
├── src
│   ├── assets
│   ├── components
│   │   ├── filters
│   │   ├── show
│   │   ├── ui
│   │   ├──__tests__
│   │   │  └── Example.spec.ts // Vitest unit tests
│   │   └── ...
│   ├── composables
│   │   ├── useShows.ts
│   │   ├── useShowDetails.ts
│   │   └── ...
│   ├── views
│   │   ├── HomeView.vue
│   │   └── ShowDetails.vue
│   ├── router
│   │   └── index.ts
│   └── main.ts
├── e2e
│   └── Example.spec.ts  // Playwright tests
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

- **`src/composables`**: Contains logic for fetching data (`useShows`, `useShowDetails`), search functionality, etc.
- **`src/views`**: Main pages (`HomeView.vue`, `ShowDetails.vue`) that orchestrate data from composables and pass it down to child components.
- **`src/components`**: Reusable UI components (e.g., filters, show cards, rating stars, etc.).
- **`e2e`**: Playwright end-to-end tests.
- **`__tests__`**: Unit tests with Vitest.

## Getting Started

### My Node.js and NPM versions:

- **Node.js** version **v20.11.0+**
- **npm** version **10.9.2+** (or pnpm/Yarn if you prefer to)

Haven't tested on other versions.

### Installation

1. **Clone** the repository:

   ```bash
   git clone https://github.com/your-username/tv-shows-dashboard.git
   cd tv-shows-dashboard
   ```

2. **Install** dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn
   ```

### Running the App

```bash
npm run dev
```

- This starts the Vite dev server at [http://localhost:5173](http://localhost:5173) (by default).

### Building for Production

```bash
npm run build
```

- This creates a `dist` folder with the production-ready files.

---

## Available Scripts

- **`npm run dev`**: Starts a local development server with hot-reload.
- **`npm run build`**: Builds the project for production into `dist`.
- **`npm run preview`**: Serves the built app locally (for checking production build).
- **`npm run test:unit`**: Runs Vitest unit tests.
- **`npm run test:e2e`**: Runs Playwright end-to-end tests.
- **`npm run lint`**: Runs eslint fix.
- **`npm run format`**: Runs prettier fix.

---

## Testing

### Unit Tests (Vitest)

- **Location**: `src/components/__tests__`
- **Run**:
  ```bash
  npm run test:unit
  ```
  or simply:
  ```bash
  npx vitest
  ```

### E2E Tests (Playwright)

- **Location**: `e2e/`
- **Run**:
  ```bash
  npm run test:e2e
  ```
- This will open or run headless browsers to test the app’s real behavior.

---

## Architecture & Design Decisions

1. **Composable-Based Data Fetching**:

   - I used **`useShows.ts`** for general show data (listing, searching) and **`useShowDetails.ts`** for detailed show info.
   - This keeps logic reusable and separate from the components.

2. **Filter & Sorting**:

   - The main `HomeView` fetches all shows (or a page) via `useShows`.
   - A separate `useShowsFilter` composable (or direct computed in `HomeView`) handles filtering and sorting.
   - A `FilterPanel` component manages user input (genres, year, rating, etc.).

3. **Pagination**:

   - I relied on the TVMaze API’s pagination (`/shows?page=N`).
   - The UI handles page state in a composable or in the route’s query param.

4. **Search**:

   - A `searchShows(query)` function in `useShows` calls `https://api.tvmaze.com/search/shows?q=...`.
   - If a query is present, we display search results; otherwise, we show the paginated list.

5. **Error Handling**:

   - I set an `error` ref in the composables if fetching fails. The views display an `ErrorMessage` component.
   - For “I’m Feeling Lucky,” we handle potential 404 or network errors with a retry approach or show an error if repeated attempts fail.

6. **UI & Styling**:

   - I used Tailwind for quick utility classes.
   - The design aims for a clean layout with a filter sidebar, a main table or card list, and a detail page.

7. **Testing**:
   - **Unit Tests** (Vitest) ensure each component and composable logic works in isolation.
   - **End-to-End Tests** (Playwright) verify the entire flow in real browsers.
