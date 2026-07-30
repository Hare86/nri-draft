create policy "public read site media" on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');
create policy "editors upload site media" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.can_edit(auth.uid()));
create policy "editors update site media" on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.can_edit(auth.uid()))
  with check (bucket_id = 'site-media' and public.can_edit(auth.uid()));
create policy "editors delete site media" on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.can_edit(auth.uid()));