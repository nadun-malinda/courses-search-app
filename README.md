# courses-search-app

## Live preview

https://keystone-courses-search-app.vercel.app/

## Technology used

- TypeScript
- NextJS (app router)
- Supabase
- TailwindCSS
- ShadCN
- zod
- Jest

## Project structure

```bash
Keystone Courses Search Project

├── src/                   # Main source code
│   ├── actions/           # Server actions
│   │   ├── course/        # Course related actions
│   │   ├── search/        # Search related actions
│   ├── app/
│   │   ├── applications/      # Course applications page
│   │   ├── favourite-courses/ # Favorite courses page
│   │   ├── saved-searches/    # Saved search page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page
│   ├── components/
│   │   ├── courses/      # Course related components
│   │   ├── empty/        # Empty result components
│   │   ├── navbar/       # Navigation bar
│   │   ├── pagination/   # Pagination components
│   │   ├── search/       # Search components
│   │   ├── ui/           # ShadCN UI components
│   ├── hooks/            # Custom React hooks
│   │   ├── use-debounced-callback.ts  # Debounced callback hook
│   ├── lib/              # Utility functions & constants
│   │   ├── data/         # Server files to call database
│   │   ├── constants.ts  # App-wide constants
│   │   ├── utils.ts      # General utilities
│   ├── types/
│   │   ├── courses.ts    # Course-related types
│   │   ├── filters.ts    # Filter types
│   │   ├── searches.ts   # Search-related types
│   ├── utils/
│   │   ├── __tests__/    # Unit tests for utilities
│   │   ├── superbase/    # Supabase clients
│   │   ├── date.ts       # Date utilities
│   │   ├── url.ts        # URL utilities
├── .env.local             # Environment variables
├── .gitignore
├── components.json        # ShadCN Component metadata
├── eslint.config.mjs      # ESLint configuration
├── jest.config.ts         # Jest test configuration
├── jest.setup.ts          # Jest setup file
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json

```

## Getting Started locally

First, you have to setup Supabase

- Goto https://supabase.com/dashboard/projects
- Create a new project
- You will be provided with a `Project URL` and a `API Key`
- Rename `.env.example` file in the root of the project directory to `.env.local`
- Add `Project URL` as `NEXT_PUBLIC_SUPABASE_URL` and `API Key` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Go to Supabase dashboard SQL Editor https://supabase.com/dashboard/project/xfbuyrtrezunmpczihra/sql/new
- Paste SQL in the `/supabase/schema.sql` and hit `Run`
- Now, you should see 4 tables under `Table Editor` tab
  - `courses`
  - `applications`
  - `favourite_courses`
  - `saved_searches`
- Now, we have to populate the `courses` table with the provided `.csv` file
  - Click on the `courses` table name under `Table Editor`
  - On the top, there is a dropdown called `Insert`
  - Select `Import data from CSV` and choose the `.csv` file with initial courses data
- Now, Supabase should be ready to go!

Then, the easy part, run the development server:

- Install dependancies
  ```bash
  npm install
  ```
- Run the project
  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run unit tests

```bash
npm run test
```

or `watch` mode

```bash
npm run test:watch
```
