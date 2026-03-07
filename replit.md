# 沐璿草本護髮中心 (Mu Xuan Herbal Hair Care)

## Overview
A static marketing website for 沐璿草本護髮中心, a herbal hair care business with locations in Taipei, Chiayi, and Singapore.

## Architecture
- **Type**: Pure static site (no backend/server)
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 + Radix UI components
- **Animations**: Framer Motion
- **Routing**: Wouter (client-side SPA)

## Project Structure
```
client/                 # Frontend source
  index.html            # Entry HTML with JSON-LD structured data
  public/               # Static assets (favicon, OG image)
  src/
    components/         # React components
      ui/               # Reusable UI components (shadcn/ui based)
      Hero.tsx           # Hero section with background image
      Navbar.tsx         # Navigation bar
      Features.tsx       # Services/features section
      Audience.tsx       # Target audience section
      Story.tsx          # Brand story section
      Locations.tsx      # Store locations section
      FAQ.tsx            # FAQ accordion section
      Contact.tsx        # Contact info + footer
    pages/              # Page components
    hooks/              # Custom React hooks
    lib/                # Utility functions
    index.css           # Global styles + Tailwind theme
    main.tsx            # App entry point
    App.tsx             # Root component with routing
attached_assets/        # Images and generated assets
vite.config.ts          # Vite configuration
vite-plugin-meta-images.ts  # Plugin for OG image meta tags
tsconfig.json           # TypeScript config
```

## Scripts
- `npm run dev` — Start dev server on port 5000
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview production build on port 5000

## Deployment
- Configured as a **static site** deployment
- Build output: `dist/` directory
- Compatible with Vercel, Netlify, or any static host

## Performance Optimizations
- Hero image uses `fetchPriority="high"` for fast LCP
- Below-fold images use Intersection Observer lazy loading (LazyImage component)
- Audience images converted to WebP (98% size reduction)
- Font loading is non-blocking via media="print" swap pattern
- Vite code splitting: vendor (React) and UI (Framer Motion) chunks

## SEO / GEO
- JSON-LD structured data (HealthAndBeautyBusiness schema)
- Descriptive meta tags and OG/Twitter cards
- Semantic HTML with article tags and aria attributes
- Keyword-rich alt text on all images
