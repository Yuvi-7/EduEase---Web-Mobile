# EduEase Web App — Frontend Standards

> This file is loaded automatically by Claude Code every session.
> It is also the living reference for all human contributors.
> All code in this repo must comply with these standards. No exceptions.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 (concurrent features enabled) |
| Language | TypeScript ~6 — strict mode always on |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 + CSS custom properties (design tokens) |
| State | Zustand 5 — one store per domain, never nested |
| Forms | React Hook Form + Zod — no uncontrolled forms |
| Routing | TanStack Router (currently state-driven; migrate routes progressively) |
| UI Primitives | Radix UI (accessible) — wrap every Radix component before use |
| Icons | Lucide React — never inline raw SVG |
| HTTP | TanStack Query — no raw fetch in components |
| Charts | Recharts — SVG fallback only for micro-charts |

---

## Folder Structure

Every feature lives in its own folder. **Never scatter a feature's files across multiple top-level folders.**

```
src/
├── features/                  # One folder per product feature
│   └── {feature-name}/
│       ├── components/        # UI components used only by this feature
│       ├── hooks/             # Custom hooks scoped to this feature
│       ├── pages/             # Route-level components (one page = one file)
│       ├── store/             # Zustand slice for this feature (if needed)
│       ├── schemas.ts         # Zod schemas — co-located with the feature
│       └── types.ts           # Types private to this feature
│
├── shared/                    # Genuinely reusable across features
│   ├── components/
│   │   ├── ui/                # Design-system primitives (Avatar, Badge, StatCard…)
│   │   └── layout/            # Shell components (Sidebar, TopBar)
│   └── hooks/                 # Global hooks (useDebounce, useMediaQuery…)
│
├── store/                     # Global Zustand stores (auth, nav)
├── types/                     # Shared domain types (Student, Teacher, School…)
├── data/                      # Mock data — replaced by API layer in production
├── lib/
│   ├── utils.ts               # cn(), avatarColor(), initials(), formatINR()
│   └── schemas.ts             # Auth schemas and credential map
├── App.tsx                    # Root shell — routing + role-based layout only
└── main.tsx
```

### Feature naming rules

- Folder name: `kebab-case` (`school-admin`, `network-overview`)
- Page files: `PascalCase.tsx` matching the export name
- Component files: `PascalCase.tsx` matching the export name
- Hook files: `usePascalCase.ts`
- Schema/type files: `camelCase.ts`

### What belongs where

| Item | Location |
|---|---|
| Used by 2+ features | `shared/components/ui/` |
| Used by 1 feature only | `features/{feature}/components/` |
| Page entry point | `features/{feature}/pages/` |
| Domain type shared by features | `types/index.ts` |
| Type used by 1 feature | `features/{feature}/types.ts` |
| Zod schema for auth | `lib/schemas.ts` |
| Zod schema for a form | `features/{feature}/schemas.ts` |
| Global store (auth, nav) | `store/` |
| Feature-local store | `features/{feature}/store/` |

---

## TypeScript Rules

```ts
// ✅ Always explicit return types on exported functions
export function MyComponent({ name }: Props): React.JSX.Element { … }

// ✅ Interface for component props — never inline type literals
interface MyComponentProps {
  name: string
  onSave?: (value: string) => void
}

// ✅ Infer types from Zod schemas — never duplicate
const schema = z.object({ email: z.string().email() })
type FormData = z.infer<typeof schema>   // ← not a hand-written type

// ❌ Never use `any` — use `unknown` and narrow
// ❌ Never use non-null assertion (!) — guard explicitly
// ❌ Never suppress TS errors with @ts-ignore / @ts-expect-error without a comment
// ❌ Never cast with `as` unless you have no alternative and leave a comment
```

### Type import rule

Always use `import type` for type-only imports:

```ts
import type { Student } from '@/types'
import type { Invoice } from '@/types'
import { cn } from '@/lib/utils'          // ← value import stays as-is
```

---

## Component Rules

### One component per file
Every exported component lives in its own file. No `Components.tsx` barrel files with multiple exports.

### Props interface always above the component
```ts
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ label, variant = 'primary', onClick }: ButtonProps) { … }
```

### No default exports for components
```ts
// ✅
export function Dashboard() { … }

// ❌
export default function Dashboard() { … }
```

### Composition over configuration
```ts
// ✅ — Composable
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>{children}</CardBody>
</Card>

// ❌ — God-prop
<Card title="Title" body={…} footer={…} headerColor="blue" />
```

### No business logic in components
Extract data manipulation to hooks or utils:
```ts
// ❌ Filtering inside JSX
{students.filter(s => s.grade === grade).map(…)}

// ✅ Computed outside render
const filtered = students.filter(s => s.grade === grade)
return filtered.map(…)
```

---

## Styling Rules

### Tailwind CSS 4 + CSS custom properties

All colors, spacing tokens, shadows, and motion variables are defined in `src/index.css` as CSS custom properties. **Never hardcode hex or rgb values in component files.**

```tsx
// ✅ Use design tokens
className="text-[var(--ink-1)] bg-[var(--surface-page)]"
style={{ color: 'var(--scholar-600)' }}

// ❌ Never hardcode
className="text-[#1A1726] bg-[#F7F4EE]"
style={{ color: '#5B5BE5' }}
```

### Available design tokens

**Colors:** `--scholar-{50-900}`, `--coral-{50-800}`, `--mint-{50-800}`, `--amber-{50-800}`, `--rose-{50-800}`

**Text:** `--ink-1` (primary), `--ink-2` (secondary), `--ink-3` (tertiary/muted)

**Surfaces:** `--surface-page`, `--surface-card`, `--surface-sunken`, `--surface-overlay`

**Borders:** `--line` (default), `--line-strong` (inputs, cards)

**Shadows:** `--shadow-1` (cards), `--shadow-2` (elevated modals)

**Motion:** `--dur-base` (120ms), `--dur-mid` (200ms), `--dur-slow` (300ms), `--ease`

**Typography:** `--font-body` (Inter), `--font-display` (Inter), `--font-mono` (JetBrains Mono)

### cn() utility — always use it for conditional classes

```tsx
import { cn } from '@/lib/utils'

// ✅
className={cn(
  'base-classes',
  isActive && 'active-class',
  variant === 'primary' && 'primary-class'
)}

// ❌ Never string-concatenate Tailwind classes
className={'base ' + (isActive ? 'active' : '')}
```

### Tailwind class ordering

Follow this order: layout → flex/grid → sizing → spacing → typography → color → border → shadow → motion → state

### No inline `style` for things Tailwind can do

Use `style` only for:
1. Dynamic values computed at runtime (e.g., `style={{ width: `${pct}%` }}`)
2. CSS custom properties not yet in Tailwind theme
3. SVG presentation attributes

---

## State Management Rules

### Zustand store structure

```ts
// store/auth.ts — always type the state and actions separately
interface AuthState {
  role: AppRole | null
  user: AuthUser | null
}

interface AuthActions {
  login: (role: AppRole, user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      role: null,
      user: null,
      login:  (role, user) => set({ role, user }),
      logout: () => set({ role: null, user: null }),
    }),
    { name: 'eduease-auth' }
  )
)
```

### Selector pattern — always select, never subscribe to whole store

```ts
// ✅ Granular selectors — component re-renders only when role changes
const role = useAuthStore(s => s.role)
const logout = useAuthStore(s => s.logout)

// ❌ Subscribes to every store change
const store = useAuthStore()
```

### No derived state in stores

Compute derived values with selectors or `useMemo` in the component, not as extra store fields.

---

## Form Rules

All forms use **React Hook Form + Zod**:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  seats: z.number().int().min(1),
})
type FormData = z.infer<typeof schema>

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  …
}
```

Rules:
- Schema lives in `features/{feature}/schemas.ts`, not inside the component file
- Always display field-level errors immediately below the input
- Disable submit button while `isSubmitting` is true
- Never use `onChange` to reset unrelated state — use `watch()` or `useEffect` with `watch`

---

## Import Rules

### Path aliases — always use `@/` for src imports

```ts
// ✅
import { cn } from '@/lib/utils'
import type { Student } from '@/types'
import { Avatar } from '@/shared/components/ui/Avatar'
import { StudentsTable } from '@/features/students/components/StudentsTable'

// ❌ Relative paths that cross feature boundaries
import { Avatar } from '../../shared/components/ui/Avatar'
```

Relative imports (`../`) are allowed **only within the same feature folder.**

### Import order (enforced by ESLint)

1. React and React ecosystem (`react`, `react-dom`)
2. Third-party packages (`lucide-react`, `zustand`, …)
3. Internal path-aliased imports (`@/shared/…`, `@/features/…`, `@/lib/…`, `@/types`, `@/store/…`)
4. Relative imports (`./`, `../`)

Always use `import type` for type-only imports.

### Barrel exports (`index.ts`)

Each `ui/` and `layout/` folder has an `index.ts` barrel for clean consumer imports:

```ts
// shared/components/ui/index.ts
export { Avatar }    from './Avatar'
export { Badge }     from './Badge'
export { StatCard }  from './StatCard'
export { Skeleton, TableSkeleton } from './Skeleton'
```

Feature `components/` folders should **not** have barrels — import directly from the file.

---

## Data Fetching Rules (for when API layer is added)

- All server state goes through **TanStack Query** — never `useEffect + fetch`
- Query keys follow the pattern: `['entity', { filter }]` e.g. `['students', { grade: '5' }]`
- Keep query functions in `features/{feature}/api.ts` — never inline in components
- Loading states use `<Skeleton />` — never spinner-only
- Error states show an inline error message — never silent failure

---

## Accessibility Rules

- Every interactive element must be a `<button>` or `<a>` — never `<div onClick>`
- All images need `alt` text; decorative images use `alt=""`
- Form inputs must have associated `<label>` elements (htmlFor)
- Modals/drawers use Radix Dialog for focus trapping and keyboard dismissal
- Color alone must never be the only conveyor of meaning (pair with icon or text)
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text

---

## Performance Rules

- Use `React.memo` only when profiling confirms a re-render problem — not preemptively
- `useMemo` / `useCallback` only for genuinely expensive computations or stable references passed to `memo`-ized children
- Code-split route-level components with `React.lazy` once routing is file-based
- Never import entire libraries — always named imports: `import { Check } from 'lucide-react'`
- Avoid anonymous functions in JSX props that create new references on every render; extract handlers

---

## Code Quality Rules

### Comments

Write comments only for the non-obvious WHY. Never describe WHAT the code does.

```tsx
// ✅ Explains a constraint
// Offset by 90° so arc starts at 12 o'clock (SVG default is 3 o'clock)
strokeDashoffset={offset}

// ❌ Describes the obvious
// Set the stroke dash offset
strokeDashoffset={offset}
```

Never write multi-line comment blocks or JSDoc for internal components.

### No dead code

Remove unused imports, variables, and commented-out code before merging. Use `npm run lint` to catch unused imports.

### Magic numbers

Extract magic numbers to named constants at the top of the file:
```ts
// ✅
const DONUT_RADIUS = 60
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS

// ❌
const c = 2 * Math.PI * 60
```

---

## Git & PR Rules

### Branch naming

```
feat/onboard-wizard
fix/student-drawer-close
refactor/fees-to-feature-folder
chore/update-deps
```

### Commit messages

```
feat(students): add drawer with attendance KPIs
fix(fees): correct overdue badge color on partial status
refactor(network): extract MiniSpark to shared component
```

Format: `type(scope): lowercase description` — no period at end.

### PR rules

- One feature or fix per PR — no bundling unrelated changes
- PR description must include: what changed, why, and how to test
- No PR merges without passing `npm run type-check` and `npm run lint`
- Screenshots or Loom for any UI change

---

## Things Claude Must Never Do

- Never hardcode hex/rgb colors — always use CSS custom property tokens
- Never use `any` type
- Never put a component in the wrong feature folder just because it's "close enough"
- Never create a new top-level folder outside the structure above without updating this file
- Never commit `console.log` statements
- Never use inline styles for static values that Tailwind can express
- Never use `export default` for components or pages
- Never call `useAuthStore()` (full store) — always select with a selector function
- Never put business logic or data filtering inside JSX return statements
- Never write a new page without updating the nav store type if a new route is added
- Never add a dependency without checking if an existing package already covers the need
