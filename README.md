# Ambak Weekly - Release Notes

A Next.js 16 App Router application for displaying weekly product release notes. Built with Server Components and Tailwind CSS, fetching data from Directus CMS.

## Features

- **Server-Side Rendering**: All data fetching happens server-side using Next.js Server Components
- **Directus Integration**: REST API integration with Directus CMS
- **Premium Editorial Design**: Clean, magazine-style layout with alternating contribution rows
- **Scope Filtering**: Server-side filtering by project (Finance, Yoddha, Sangam)
- **Archive Support**: Browse past releases

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Directus instance with the required collections

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Directus Configuration
DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_TOKEN=your-read-only-token-here
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

## Routes

| Route | Description |
|-------|-------------|
| `/release-notes/latest` | Shows the current/latest release |
| `/release-notes/[releaseKey]` | Shows a specific release (e.g., `/release-notes/2025-W52`) |
| `/release-notes/archive` | Lists all past releases |

### Query Parameters

- `scope`: Filter contributions by project scope
  - `/release-notes/latest?scope=finance`
  - `/release-notes/2025-W52?scope=yoddha`

## Directus Collections

### `release_notes`

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key |
| release_key | string | URL-friendly identifier (e.g., "2025-W52") |
| title | string | Release title |
| summary | text | Introduction text |
| status | string | draft, published, or archived |
| published_at | datetime | Publication date |
| sections | O2M | Related sections |

### `release_note_sections`

| Field | Type | Description |
|-------|------|-------------|
| id | string | Primary key |
| release_note | M2O | Parent release |
| title | string | Section title |
| description | text | Section content |
| sort | int | Display order |
| status | string | draft, approved, published |
| scopes | array | Project tags (finance, yoddha, sangam) |
| authors | M2M | Junction to directus_users |
| media_type | string | image, video, or none |
| media_file | file | Directus file reference |
| media_url | string | External media URL |
| cta_link | string | Optional call-to-action link |

### `release_notes_settings`

| Field | Type | Description |
|-------|------|-------------|
| current_release_key | string | Points to the current/latest release |

## Project Structure

```
src/
├── app/
│   ├── globals.css           # Tailwind base styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Redirects to /release-notes/latest
│   └── release-notes/
│       ├── page.tsx          # Redirects to latest
│       ├── not-found.tsx     # 404 page
│       ├── latest/
│       │   └── page.tsx      # Latest release page
│       ├── archive/
│       │   └── page.tsx      # Archive listing
│       └── [releaseKey]/
│           └── page.tsx      # Individual release page
├── components/
│   └── release-notes/
│       ├── index.ts          # Component exports
│       ├── Navigation.tsx    # Sticky nav with filter
│       ├── HeaderHero.tsx    # Metadata + hero section
│       ├── AuthorChip.tsx    # Author avatar chip
│       ├── ContributionRow.tsx  # Individual contribution
│       ├── ContributionList.tsx # Contribution wrapper
│       └── ArchiveList.tsx   # Archive grid
├── lib/
│   └── directus.ts           # Directus API layer
└── types/
    └── directus.ts           # TypeScript types
```

## Caching (Future)

The data layer is prepared for Next.js Data Cache. To enable caching, update `src/lib/directus.ts`:

```typescript
// Change from:
cache: 'no-store',

// To (time-based revalidation):
next: { revalidate: 600 }, // 10 minutes

// Or (tag-based for on-demand revalidation):
next: { tags: ['release-notes'] },
```

## License

Internal use only - Ambak Technologies

