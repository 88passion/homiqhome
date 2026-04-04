-- Delete old seeded/sample properties from production so admin/public show only real data.
-- Run in Supabase SQL Editor after reviewing the preview query.

begin;

select p.id, p.code, p.slug, p.title, p.status
from public.properties p
where p.code in ('HM-001', 'HM-002', 'HM-003')
   or p.slug in ('hm-001', 'hm-002', 'hm-003')
order by p.created_at asc;

-- Uncomment this delete only after checking the preview rows above.
-- delete from public.properties p
-- where p.code in ('HM-001', 'HM-002', 'HM-003')
--    or p.slug in ('hm-001', 'hm-002', 'hm-003');

rollback;
-- For real execution:
-- 1) uncomment delete
-- 2) change rollback; to commit;
