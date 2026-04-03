# Supabase next steps for homiqhome

Current status:
- App can reach Supabase credentials.
- API write check reached Supabase.
- Error returned: `Could not find the table 'public.inquiries' in the schema cache`.
- Meaning: the project is connected, but the schema/migrations have NOT been applied to the Supabase project yet.

## What needs to happen next

### 1) Apply schema
Use the SQL in:
- `supabase/migrations/001_initial_schema.sql`

Apply it in one of these ways:
- Supabase SQL Editor (paste and run)
- Supabase CLI/db push flow if project linking/network path is available

### 2) Seed starter content
Run the SQL in:
- `supabase/seed.sql`

### 3) Verify tables exist
Expected tables:
- properties
- property_images
- inquiries
- articles
- faqs
- site_settings
- admin_users

### 4) Then test app flows again
After schema exists:
- `/sell` inquiry form should insert into `inquiries`
- home/buy/rent/property detail can begin reading DB-first data more reliably
- articles/faq can read DB-first content

## Suggested execution order
1. Run migration SQL
2. Run seed SQL
3. Re-test `/api/inquiries`
4. Re-test `/buy`, `/rent`, `/properties/[slug]`, `/articles`, `/faq`
5. Continue admin CRUD build-out
