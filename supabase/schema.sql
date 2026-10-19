-- RentCheck NG database schema. Run ONLY in the new dedicated Supabase project.
-- Never put a service_role key in website code.
create extension if not exists pgcrypto;
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 role text not null default 'customer' check(role in ('customer','agent','admin')),
 agent_code text unique, status text not null default 'active' check(status in ('active','suspended')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.agent_applications (
 id uuid primary key default gen_random_uuid(), user_id uuid not null unique references public.profiles(id) on delete cascade,
 full_name text not null, phone text not null, whatsapp text not null, operating_state text not null, operating_areas text not null,
 experience text not null default '', references_text text not null default '', id_document_path text, agreed_conduct boolean not null default false,
 status text not null default 'submitted' check(status in ('submitted','under_review','needs_information','approved','rejected','suspended')),
 reviewer_note text, reviewed_by uuid references public.profiles(id) on delete set null, reviewed_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.properties (
 id uuid primary key default gen_random_uuid(), agent_id uuid not null references public.profiles(id) on delete restrict,
 title text not null check(length(trim(title)) between 5 and 180), state text not null, area text not null, property_type text not null,
 bedrooms integer check(bedrooms is null or bedrooms between 0 and 100), bathrooms integer check(bathrooms is null or bathrooms between 0 and 100),
 rent_per_year numeric(14,2) not null check(rent_per_year>0), agency_fee numeric(14,2) not null default 0 check(agency_fee>=0),
 caution_fee numeric(14,2) not null default 0 check(caution_fee>=0), legal_fee numeric(14,2) not null default 0 check(legal_fee>=0),
 description text not null default '', photo_urls text[] not null default '{}',
 status text not null default 'pending_review' check(status in ('draft','pending_review','needs_changes','approved','rejected','hidden','rented')),
 reviewer_note text, published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.verification_records (
 id uuid primary key default gen_random_uuid(), property_id uuid not null references public.properties(id) on delete cascade,
 label text not null check(label in ('agent_identity_checked','property_viewed','owner_authority_checked','details_recently_confirmed')),
 verified_by uuid references public.profiles(id) on delete set null, verified_at timestamptz not null default now(),
 evidence_note text not null check(length(trim(evidence_note))>=3), recheck_by date, created_at timestamptz not null default now()
);
create table if not exists public.audit_log (
 id bigint generated always as identity primary key, actor_id uuid references public.profiles(id) on delete set null,
 action text not null, record_type text not null, record_id text, summary jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create table if not exists public.property_inquiries (
 id uuid primary key default gen_random_uuid(), property_id uuid references public.properties(id) on delete set null,
 customer_id uuid references public.profiles(id) on delete set null, customer_name text not null, customer_email text,
 customer_phone text not null, message text not null, status text not null default 'new' check(status in ('new','contacted','closed','spam')),
 created_at timestamptz not null default now()
);
create table if not exists public.inspection_bookings (
 id uuid primary key default gen_random_uuid(), property_id uuid not null references public.properties(id) on delete restrict,
 customer_id uuid references public.profiles(id) on delete set null, agent_id uuid references public.profiles(id) on delete set null,
 customer_name text not null, customer_phone text not null, requested_at timestamptz not null,
 status text not null default 'requested' check(status in ('requested','confirmed','completed','cancelled','no_show')),
 notes text, created_at timestamptz not null default now()
);
create table if not exists public.complaints (
 id uuid primary key default gen_random_uuid(), property_id uuid references public.properties(id) on delete set null,
 reporter_id uuid references public.profiles(id) on delete set null, reporter_name text, reporter_phone text,
 category text not null, description text not null check(length(trim(description))>=10),
 status text not null default 'received' check(status in ('received','investigating','resolved','dismissed')),
 resolution_note text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.commissions (
 id uuid primary key default gen_random_uuid(), agent_id uuid references public.profiles(id) on delete set null,
 property_id uuid references public.properties(id) on delete set null, amount numeric(14,2) not null check(amount>=0),
 status text not null default 'pending' check(status in ('pending','due','paid','cancelled')),
 due_date date, paid_at timestamptz, reference text, notes text, created_at timestamptz not null default now()
);
create index if not exists properties_public_search_idx on public.properties(status,state,area,rent_per_year);
create index if not exists properties_agent_idx on public.properties(agent_id,created_at desc);
create index if not exists agent_applications_queue_idx on public.agent_applications(status,created_at);
create index if not exists verification_records_property_idx on public.verification_records(property_id,verified_at desc);
create index if not exists audit_log_created_idx on public.audit_log(created_at desc);
create index if not exists complaints_queue_idx on public.complaints(status,created_at desc);
create or replace function public.rc_is_admin() returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='admin' and status='active');
$$;
create or replace function public.rc_is_agent() returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='agent' and status='active');
$$;
create or replace function public.rc_touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end; $$;
drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.rc_touch_updated_at();
drop trigger if exists agent_apps_touch_updated_at on public.agent_applications;
create trigger agent_apps_touch_updated_at before update on public.agent_applications for each row execute function public.rc_touch_updated_at();
drop trigger if exists properties_touch_updated_at on public.properties;
create trigger properties_touch_updated_at before update on public.properties for each row execute function public.rc_touch_updated_at();
drop trigger if exists complaints_touch_updated_at on public.complaints;
create trigger complaints_touch_updated_at before update on public.complaints for each row execute function public.rc_touch_updated_at();
create or replace function public.rc_new_profile() returns trigger language plpgsql security definer set search_path=public as $$
begin
 insert into public.profiles(id,full_name,role) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),'customer') on conflict(id) do nothing;
 return new;
end; $$;
drop trigger if exists rc_auth_user_profile on auth.users;
create trigger rc_auth_user_profile after insert on auth.users for each row execute function public.rc_new_profile();
alter table public.profiles enable row level security;
alter table public.agent_applications enable row level security;
alter table public.properties enable row level security;
alter table public.verification_records enable row level security;
alter table public.audit_log enable row level security;
alter table public.property_inquiries enable row level security;
alter table public.inspection_bookings enable row level security;
alter table public.complaints enable row level security;
alter table public.commissions enable row level security;
create policy profiles_read_self_admin on public.profiles for select to authenticated using(id=auth.uid() or public.rc_is_admin());
create policy profiles_update_self_admin on public.profiles for update to authenticated using(id=auth.uid() or public.rc_is_admin()) with check(public.rc_is_admin() or (id=auth.uid() and role=(select p.role from public.profiles p where p.id=auth.uid())));
create policy apps_read_owner_admin on public.agent_applications for select to authenticated using(user_id=auth.uid() or public.rc_is_admin());
create policy apps_insert_self on public.agent_applications for insert to authenticated with check(user_id=auth.uid() and agreed_conduct=true);
create policy apps_update_owner_admin on public.agent_applications for update to authenticated using(user_id=auth.uid() or public.rc_is_admin()) with check(user_id=auth.uid() or public.rc_is_admin());
create policy properties_public_approved_read on public.properties for select to anon,authenticated using(status='approved' or agent_id=auth.uid() or public.rc_is_admin());
create policy properties_agent_insert on public.properties for insert to authenticated with check(agent_id=auth.uid() and public.rc_is_agent() and status in ('draft','pending_review'));
create policy properties_agent_update on public.properties for update to authenticated using(agent_id=auth.uid() or public.rc_is_admin()) with check(public.rc_is_admin() or (agent_id=auth.uid() and status in ('draft','pending_review','needs_changes')));
create policy verification_admin_or_owner_read on public.verification_records for select to authenticated using(public.rc_is_admin() or exists(select 1 from public.properties p where p.id=property_id and p.agent_id=auth.uid()));
create policy audit_admin_read on public.audit_log for select to authenticated using(public.rc_is_admin());
create policy inquiries_insert_any on public.property_inquiries for insert to anon,authenticated with check(true);
create policy inquiries_admin_read on public.property_inquiries for select to authenticated using(public.rc_is_admin());
create policy inspections_insert_any on public.inspection_bookings for insert to anon,authenticated with check(true);
create policy inspections_read_owner_admin on public.inspection_bookings for select to authenticated using(customer_id=auth.uid() or agent_id=auth.uid() or public.rc_is_admin());
create policy complaints_insert_any on public.complaints for insert to anon,authenticated with check(true);
create policy complaints_admin_manage on public.complaints for all to authenticated using(public.rc_is_admin()) with check(public.rc_is_admin());
create policy commissions_admin_manage on public.commissions for all to authenticated using(public.rc_is_admin()) with check(public.rc_is_admin());
create or replace function public.review_application(p_id uuid,p_status text,p_note text default '') returns void language plpgsql security definer set search_path=public as $$
declare a public.agent_applications%rowtype; code text;
begin
 if not public.rc_is_admin() then raise exception 'Admin access required'; end if;
 if p_status not in ('under_review','needs_information','approved','rejected','suspended') then raise exception 'Invalid application status'; end if;
 select * into a from public.agent_applications where id=p_id for update;
 if not found then raise exception 'Application not found'; end if;
 if p_status in ('needs_information','rejected','suspended') and length(trim(coalesce(p_note,'')))=0 then raise exception 'A decision note is required'; end if;
 update public.agent_applications set status=p_status,reviewer_note=trim(coalesce(p_note,'')),reviewed_by=auth.uid(),reviewed_at=now() where id=p_id;
 if p_status='approved' then code:='RCNG-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,6)); update public.profiles set role='agent',agent_code=coalesce(agent_code,code),status='active',full_name=a.full_name where id=a.user_id;
 elsif p_status='suspended' then update public.profiles set status='suspended' where id=a.user_id; end if;
 insert into public.audit_log(actor_id,action,record_type,record_id,summary) values(auth.uid(),'review_application','agent_application',p_id::text,jsonb_build_object('status',p_status,'note',p_note));
end; $$;
create or replace function public.add_verification(p_property uuid,p_label text,p_note text,p_recheck date default null) returns uuid language plpgsql security definer set search_path=public as $$
declare rid uuid;
begin
 if not public.rc_is_admin() then raise exception 'Admin access required'; end if;
 if p_label not in ('agent_identity_checked','property_viewed','owner_authority_checked','details_recently_confirmed') then raise exception 'Invalid verification label'; end if;
 if length(trim(coalesce(p_note,'')))<3 then raise exception 'Evidence note is required'; end if;
 insert into public.verification_records(property_id,label,verified_by,evidence_note,recheck_by) values(p_property,p_label,auth.uid(),trim(p_note),p_recheck) returning id into rid;
 insert into public.audit_log(actor_id,action,record_type,record_id,summary) values(auth.uid(),'add_verification','property',p_property::text,jsonb_build_object('label',p_label,'note',p_note)); return rid;
end; $$;
create or replace function public.review_property(p_id uuid,p_status text,p_note text default '') returns void language plpgsql security definer set search_path=public as $$
begin
 if not public.rc_is_admin() then raise exception 'Admin access required'; end if;
 if p_status not in ('approved','needs_changes','rejected','hidden') then raise exception 'Invalid property status'; end if;
 if p_status<>'approved' and length(trim(coalesce(p_note,'')))=0 then raise exception 'A decision note is required'; end if;
 if not exists(select 1 from public.properties where id=p_id) then raise exception 'Property not found'; end if;
 if p_status='approved' and not exists(select 1 from public.verification_records where property_id=p_id) then raise exception 'Record at least one verification check before approval'; end if;
 update public.properties set status=p_status,reviewer_note=trim(coalesce(p_note,'')),published_at=case when p_status='approved' then now() else published_at end where id=p_id;
 insert into public.audit_log(actor_id,action,record_type,record_id,summary) values(auth.uid(),'review_property','property',p_id::text,jsonb_build_object('status',p_status,'note',p_note));
end; $$;
create or replace function public.mark_rented(p_id uuid) returns void language plpgsql security definer set search_path=public as $$
begin
 if not exists(select 1 from public.properties where id=p_id and agent_id=auth.uid() and public.rc_is_agent() and status='approved') then raise exception 'Only the assigned active agent can mark an approved listing rented'; end if;
 update public.properties set status='rented' where id=p_id;
 insert into public.audit_log(actor_id,action,record_type,record_id,summary) values(auth.uid(),'mark_rented','property',p_id::text,'{}'::jsonb);
end; $$;
grant execute on function public.review_application(uuid,text,text) to authenticated;
grant execute on function public.add_verification(uuid,text,text,date) to authenticated;
grant execute on function public.review_property(uuid,text,text) to authenticated;
grant execute on function public.mark_rented(uuid) to authenticated;
create or replace view public.public_properties as select p.id,p.title,p.state,p.area,p.property_type,p.bedrooms,p.bathrooms,p.rent_per_year,p.agency_fee,p.caution_fee,p.legal_fee,p.description,p.photo_urls,p.published_at,p.created_at,pr.full_name as agent_name,pr.agent_code from public.properties p join public.profiles pr on pr.id=p.agent_id where p.status='approved' and pr.status='active';
grant select on public.public_properties to anon,authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('agent-docs','agent-docs',false,5242880,array['image/jpeg','image/png','application/pdf']) on conflict(id) do nothing;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('property-photos','property-photos',true,3145728,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy agent_docs_owner_upload on storage.objects for insert to authenticated with check(bucket_id='agent-docs' and (storage.foldername(name))[1]=auth.uid()::text);
create policy agent_docs_admin_read on storage.objects for select to authenticated using(bucket_id='agent-docs' and public.rc_is_admin());
create policy property_photos_agent_upload on storage.objects for insert to authenticated with check(bucket_id='property-photos' and (storage.foldername(name))[1]=auth.uid()::text and public.rc_is_agent());
create policy property_photos_public_read on storage.objects for select to anon,authenticated using(bucket_id='property-photos');
-- First admin bootstrap, run manually only after creating your own staff account:
-- update public.profiles set role='admin' where id=(select id from auth.users where email='YOUR_ADMIN_EMAIL');
