revoke execute on function public.has_role(uuid, public.app_role) from anon, authenticated, public;
revoke execute on function public.can_edit(uuid) from anon, authenticated, public;
revoke execute on function public.handle_new_user() from anon, authenticated, public;

drop policy "anyone can submit" on public.contact_messages;
drop policy "auth can submit" on public.contact_messages;
create policy "anyone can submit valid enquiry" on public.contact_messages for insert to anon
  with check (
    length(name) between 1 and 100
    and length(email) between 3 and 255
    and email like '%_@_%'
    and length(message) between 1 and 2000
    and length(subject) <= 120
    and handled = false
  );
create policy "signed in can submit valid enquiry" on public.contact_messages for insert to authenticated
  with check (
    length(name) between 1 and 100
    and length(email) between 3 and 255
    and email like '%_@_%'
    and length(message) between 1 and 2000
    and length(subject) <= 120
    and handled = false
  );