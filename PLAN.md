# homiqhome current implementation plan

## Cursor brief vs current repo

### Already present
- Next.js App Router frontend scaffold
- Home, buy, rent, sell, articles, calculator, about, contact, faq, property detail pages
- Basic Supabase client/server helpers
- Sell inquiry form placeholder UX
- Mock property data and reusable listing components

### Missing / incomplete
- Env names aligned to final brief (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_LINE_URL`)
- Database schema + migrations under `supabase/migrations`
- Seed SQL under `supabase/seed.sql`
- Database TypeScript types for all tables
- Query layer in `src/lib/queries`
- Replace mock property/article/faq reads with Supabase-backed queries
- Connect sell inquiry form to persistence via safe server-side flow
- Article detail route `/articles/[slug]`
- Admin panel and auth flow

## Recommended next order
1. Supabase foundation: env, types, clients, migrations, seed SQL
2. Query layer for published content
3. Replace read paths (home, buy, rent, property detail, related, articles, faq)
4. Connect sell inquiry form to DB
5. Admin panel after data model is stable

## Constraint
- Keep current UI unchanged unless a bug fix requires small structural edits
