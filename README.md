1️⃣ Create React app with Vite
npm create vite@latest my-app


Choose:

Framework: React

Variant: TypeScript (recommended)

cd my-app
npm install

2️⃣ Install & configure Tailwind CSS (required for shadcn)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

3️⃣ Install shadcn/ui
npx shadcn@latest init


Choose:

Framework: React

Style: Default

Base color: Neutral

CSS file: src/index.css

Tailwind config: tailwind.config.ts

Components dir: src/components

Utils: src/lib/utils.ts

TypeScript: Yes

Add a component (example)
npx shadcn@latest add button


Usage:

import { Button } from "@/components/ui/button"

export default function App() {
  return <Button>Click me</Button>
}

4️⃣ Install TanStack (React Query + Router optional)
React Query
npm install @tanstack/react-query

Setup Query Client
// src/main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

(Optional) TanStack Router
npm install @tanstack/react-router

5️⃣ Install Zustand (state management)
npm install zustand

6️⃣ Recommended Project Structure
src/
├─ components/
│  └─ ui/            # shadcn components
├─ store/            # zustand stores
├─ hooks/
├─ lib/
├─ pages/            # routes
├─ services/         # API calls
├─ main.tsx
└─ App.tsx

7️⃣ Run the app
npm run dev

