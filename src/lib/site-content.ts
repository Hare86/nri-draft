import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_CONTENT } from "@/content/schema";

export type ContentMap = Record<string, Record<string, unknown>>;

export const contentQueryOptions = queryOptions({
  queryKey: ["site-content"],
  queryFn: async (): Promise<ContentMap> => {
    const { data, error } = await supabase.from("site_content").select("key,value");
    if (error) throw error;
    const map: ContentMap = {};
    for (const row of data ?? []) {
      map[row.key] = (row.value ?? {}) as Record<string, unknown>;
    }
    return map;
  },
  staleTime: 30_000,
});

/** Section content merged over the built-in placeholder defaults. */
export function useContent<T = Record<string, any>>(key: string): T {
  const { data } = useQuery(contentQueryOptions);
  const defaults = DEFAULT_CONTENT[key] ?? {};
  const stored = data?.[key] ?? {};
  return { ...defaults, ...stored } as T;
}

export function useSaveContent() {
  const qc = useQueryClient();
  return async (key: string, value: Record<string, unknown>) => {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from("site_content").upsert(
      {
        key,
        value: value as never,
        updated_at: new Date().toISOString(),
        updated_by: userData.user?.id ?? null,
      },
      { onConflict: "key" },
    );
    if (error) throw error;
    await qc.invalidateQueries({ queryKey: ["site-content"] });
  };
}

export type Photo = { url?: string; alt?: string; caption?: string };

/** Only photos that actually have an uploaded image. */
export function withImages(photos: Photo[] | undefined): Photo[] {
  return (photos ?? []).filter((p) => !!p?.url);
}
