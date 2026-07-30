import { supabase } from "@/integrations/supabase/client";

export type MediaItem = {
  id: string;
  storage_path: string;
  url: string;
  alt: string;
  caption: string;
  created_at: string;
};

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function listMedia(): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from("media")
    .select("id,storage_path,url,alt,caption,created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MediaItem[];
}

export async function uploadMedia(file: File, alt = "", caption = ""): Promise<MediaItem> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("site-media")
    .upload(path, file, { cacheControl: "31536000", upsert: false });
  if (upErr) throw upErr;

  const { data: signed, error: signErr } = await supabase.storage
    .from("site-media")
    .createSignedUrl(path, TEN_YEARS);
  if (signErr) throw signErr;

  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("media")
    .insert({
      storage_path: path,
      url: signed.signedUrl,
      alt: alt || file.name.replace(/\.[^.]+$/, ""),
      caption,
      created_by: userData.user?.id ?? null,
    })
    .select("id,storage_path,url,alt,caption,created_at")
    .single();
  if (error) throw error;
  return data as MediaItem;
}

export async function updateMedia(id: string, patch: Partial<Pick<MediaItem, "alt" | "caption">>) {
  const { error } = await supabase.from("media").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteMedia(item: MediaItem) {
  const { error: rmErr } = await supabase.storage.from("site-media").remove([item.storage_path]);
  if (rmErr) throw rmErr;
  const { error } = await supabase.from("media").delete().eq("id", item.id);
  if (error) throw error;
}
