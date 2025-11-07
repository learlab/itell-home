# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project is a Next.js 16 marketing website built with React 19, TypeScript, and Tailwind CSS v4. This site has two major modules

- `/`: the homepage showcases iTELL's AI-powered personalized text platform and includes static content

- `/{volumeId}`: dynamic page rendering content from a Strapi CMS, still in early development


### Database

Uses Drizzle ORM with PostgreSQL (hosted on Supabase):
- Schema: `src/db/schema.ts`
- Database client: `src/db/index.ts`
- Configuration: `drizzle.config.ts`
- Tables:
  - `contact_submissions` - Stores form submissions

### Server Actions

Server actions are in `src/actions/`:
- `contact_submissions.ts` - Handles contact form submissions, sends emails via Resend API, and stores in database

### Component Organization

- `src/components/` - Shared components (Header, Footer, Hero, Features, etc.)
- `src/components/ui/` - shadcn/ui components (button, badge, etc.)
- Uses class-variance-authority (cva) for component variants
- Styling with tailwind-merge and clsx for conditional classes

### Styling

- Tailwind CSS v4 with PostCSS
- Custom fonts: Roboto (sans) and Roboto Slab (serif) via next/font/google
- CSS variables in `src/styles/tailwind.css`
- Uses `@tailwindcss/forms` plugin
- Animations via `tw-animate-css`

### Path Aliases

The project uses `@/*` to reference `src/*` (configured in tsconfig.json).

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `RESEND_API_KEY` - API key for Resend email service

## Key Dependencies

- **Next.js 16.0.1** - Latest App Router features
- **React 19.2.0** - Latest React version
- **Drizzle ORM** - Type-safe PostgreSQL ORM
- **Tailwind CSS v4** - Latest version with PostCSS integration
- **Resend** - Email service for contact form
- **Radix UI** - Headless UI components via shadcn/ui
- **Motion** - Animation library (previously Framer Motion)
- **Zod** - Schema validation for CMS data
- **Google Analytics** - Via `@next/third-parties/google`



## Important Notes

- The CMS content is in markdown format and includes custom elements like `<i-question>` tags for interactive questions embedded in markdown, it's the responsibility of the page renderer to handle these correctly and transform them into react components using the `htmr` library

- Page chunks support both `MD` and `MDX` fields - prefer `MD` when available

- Contact form submissions are both emailed and stored in the database

- Blog and research data are currently hardcoded but structured to allow future CMS integration

## Code Structure

Adopt a domain driven design, when developing features

- for business logic: use a folder under `src/features/<feature-name>`, create files such as
  - `utils.ts` - utility functions
  - `request.ts` - api calls related to the feature
  - `schema.ts` - zod schema definitions
  - ...

- for react components, use a folder under `src/components/<feature-name>/`
## Coding conventions

- Use `kebab-case` for file and folder names, use `PascalCase` for React components and `camelCase` for variables and functions

- Avoid explicit return types unless necessary for complex types

- Avoid use default exports, always use named exports

- Only create essential comments before function declarations or complex logic, document the intention rather than the implementation

- Avoid `any` types, if you are unsure about how to type something, ask for help
