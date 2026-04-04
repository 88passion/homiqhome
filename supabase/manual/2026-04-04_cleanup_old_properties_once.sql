-- One-time cleanup for old property data
-- Run manually once in Supabase SQL Editor after verifying the rows to remove.
-- Safe-by-default: review the SELECT first, then uncomment DELETE when ready.

begin;

-- 1) Inspect current properties and linked image counts
select p.id, p.code, p.slug, p.title, p.status, count(pi.id) as image_count
from public.properties p
left join public.property_images pi on pi.property_id = p.id
group by p.id, p.code, p.slug, p.title, p.status
order by p.created_at asc;

-- 2) Put the OLD property codes/slugs you want to remove in this temp list
create temp table cleanup_targets (
  code text,
  slug text
) on commit drop;

-- Example targets (replace before running delete)
insert into cleanup_targets (code, slug)
values
  ('HM-001', 'hm-001'),
  ('HM-002', 'hm-002'),
  ('HM-003', 'hm-003');

-- 3) Preview which rows would be removed
select p.id, p.code, p.slug, p.title, p.status
from public.properties p
join cleanup_targets t
  on p.code = t.code
  or p.slug = t.slug
order by p.created_at asc;

-- 4) Uncomment only when ready to actually delete.
-- property_images will be removed automatically via on delete cascade.
-- delete from public.properties p
-- using cleanup_targets t
-- where p.code = t.code
--    or p.slug = t.slug;

-- 5) Commit only after you are confident.
rollback;
-- To execute for real:
--   a) change rollback; -> commit;
--   b) uncomment the delete statement above;
--   c) run once.
