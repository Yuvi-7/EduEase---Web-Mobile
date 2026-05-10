# EduEase Mobile App

React Native mobile app built with Expo, TypeScript, NativeWind, TanStack Query, Expo Router, Zustand, React Hook Form, and FlashList.

## Stack

| Tool | Purpose |
|------|---------|
| Expo SDK 51 | Cross-platform runtime |
| Expo Router 3 | File-based routing |
| TypeScript | Type safety |
| NativeWind 4 | Tailwind CSS for React Native |
| TanStack Query 5 | Server state & caching |
| Zustand | Auth / global state |
| React Hook Form | Form management |
| FlashList | High-performance lists |
| Expo Linear Gradient | Gradient cards |
| Expo Blur | Glassmorphic tab bar |
| Lucide React Native | Icons |

## Folder Structure

```
mobile-app/
├── app/
│   ├── _layout.tsx          # Root layout – auth guard, fonts, QueryClient
│   ├── (auth)/
│   │   └── login.tsx        # Login screen with role switcher
│   ├── (teacher)/
│   │   ├── _layout.tsx      # Teacher tab bar
│   │   ├── index.tsx        # Teacher Home
│   │   ├── attendance.tsx   # Interactive roll call
│   │   ├── classes.tsx      # Class list
│   │   ├── gradebook.tsx    # Grades with segment tabs
│   │   ├── messages.tsx     # Inbox
│   │   └── schedule.tsx     # Daily schedule
│   ├── (student)/
│   │   ├── _layout.tsx      # Student tab bar
│   │   ├── index.tsx        # Student Home
│   │   ├── classes.tsx      # Subject list
│   │   ├── tasks.tsx        # To-do / Done tasks
│   │   ├── badges.tsx       # Achievements
│   │   └── inbox.tsx        # Messages
│   └── (parent)/
│       ├── _layout.tsx      # Parent tab bar
│       ├── index.tsx        # Parent Dashboard
│       ├── attendance.tsx   # Calendar + records
│       ├── fees.tsx         # Fees + payment history
│       ├── messages.tsx     # Inbox
│       └── progress.tsx     # Subject progress + teacher notes
├── src/
│   ├── api/                 # Mock API functions with simulated latency
│   ├── components/
│   │   ├── ui/              # Avatar, Pill, Card, Button, ProgressBar, Shimmer…
│   │   ├── layout/          # Header, SafeLayout, TabBar
│   │   ├── shared/          # GreetingCard, ScheduleRow, MessageRow
│   │   ├── teacher/         # RosterRow, AssignmentCard
│   │   ├── student/         # StreakRibbon, TaskCard
│   │   └── parent/          # StatTile
│   ├── constants/           # Colors, Typography, Layout tokens
│   ├── hooks/               # TanStack Query hooks per role
│   ├── mock/                # credentials.ts, teacherData, studentData, parentData
│   ├── store/               # Zustand authStore
│   └── types/               # auth.ts, teacher.ts, student.ts, parent.ts
├── assets/
│   └── fonts/               # TTF fonts (download via script below)
├── scripts/
│   └── download-fonts.sh
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Setup

### 1. Install dependencies

```bash
cd mobile-app
npm install
```

### 2. Download fonts

The app uses **Inter**, **Space Grotesk**, and **JetBrains Mono**. Run:

```bash
bash scripts/download-fonts.sh
```

Or download manually and place TTF files in `assets/fonts/`:

| File | Source |
|------|--------|
| `Inter-Regular.ttf` | https://fonts.google.com/specimen/Inter |
| `Inter-Medium.ttf` | same |
| `Inter-SemiBold.ttf` | same |
| `Inter-Bold.ttf` | same |
| `SpaceGrotesk-SemiBold.ttf` | https://fonts.google.com/specimen/Space+Grotesk |
| `SpaceGrotesk-Bold.ttf` | same |
| `JetBrainsMono-Regular.ttf` | https://www.jetbrains.com/legalnotice/intellijIDEA_Community_FrontendPlugin.html |

### 3. Add placeholder app icons

Place `icon.png`, `splash.png`, `adaptive-icon.png`, `favicon.png` in `assets/`.  
(Any square PNG works for development.)

### 4. Start the app

```bash
# Expo Go (fastest start)
npm start

# iOS Simulator
npm run ios

# Android Emulator
npm run android
```

## Demo Credentials

All credentials use school code **EDU001**.

| Role | Email | Password |
|------|-------|----------|
| Teacher | teacher@eduease.com | Teacher@123 |
| Student | student@eduease.com | Student@123 |
| Parent | parent@eduease.com | Parent@123 |

Tap **"Fill demo credentials"** on the login screen to auto-fill for the selected role.

## Design Tokens (from EduEase Design System)

| Token | Value |
|-------|-------|
| Scholar Blue | `#5B5BE5` |
| Coral Orange | `#FF8A6A` |
| Mint Green | `#2DBA73` |
| Amber Yellow | `#F0A52A` |
| Rose Red | `#E14B6A` |
| Purple | `#8C5BD6` |
| Surface / Page | `#FAF9F7` |
| Card | `#FFFFFF` |
| Ink 1 (text) | `#1A1830` |

## Architecture Notes

- **Auth guard** in `app/_layout.tsx` reads AsyncStorage on mount and redirects to the correct role group automatically.
- **Mock API** functions in `src/api/` simulate 500–900 ms network latency — swap with real endpoints when ready.
- **TanStack Query** caches data per query key; pull-to-refresh is wired into `SafeLayout`.
- **FlashList** is used for all long lists with `estimatedItemSize` set.
- **Shimmer skeletons** replace loaders — no spinners, matching the design system.
- **Memoization** — all components use `memo()`, callbacks use `useCallback`, derived lists use `useMemo`.
