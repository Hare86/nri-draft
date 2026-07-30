import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImagePlus, Trash2, X } from "lucide-react";
import { deleteMedia, listMedia, uploadMedia, type MediaItem } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function useMedia() {
  return useQuery({ queryKey: ["media"], queryFn: listMedia });
}

export function MediaUploadButton({ onUploaded }: { onUploaded?: (m: MediaItem) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={async (e) => {
          const files = Array.from(e.target.files ?? []);
          if (!files.length) return;
          setBusy(true);
          try {
            for (const f of files) {
              const item = await uploadMedia(f);
              onUploaded?.(item);
            }
            await qc.invalidateQueries({ queryKey: ["media"] });
            toast.success(`${files.length} image(s) uploaded`);
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Upload failed");
          } finally {
            setBusy(false);
            if (inputRef.current) inputRef.current.value = "";
          }
        }}
      />
      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="bg-navy text-cream"
      >
        <ImagePlus className="h-4 w-4" /> {busy ? "Uploading…" : "Upload images"}
      </Button>
    </>
  );
}

export function MediaGrid({
  onPick,
  selectable = false,
}: {
  onPick?: (m: MediaItem) => void;
  selectable?: boolean;
}) {
  const { data, isLoading } = useMedia();
  const qc = useQueryClient();

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading images…</p>;
  if (!data?.length)
    return (
      <p className="rounded-sm border border-dashed border-border p-6 text-sm text-muted-foreground">
        No images yet. Upload photos or logos to use them across the site.
      </p>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {data.map((m) => (
        <figure key={m.id} className="overflow-hidden rounded-sm border border-border bg-card">
          <img
            src={m.url}
            alt={m.alt}
            className="aspect-[4/3] w-full cursor-pointer object-cover"
            onClick={() => onPick?.(m)}
          />
          <figcaption className="space-y-2 p-2 text-xs">
            <p className="truncate text-muted-foreground">{m.alt || "Untitled"}</p>
            <div className="flex gap-2">
              {selectable && (
                <Button type="button" size="sm" className="h-7 flex-1" onClick={() => onPick?.(m)}>
                  Use
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7"
                onClick={async () => {
                  if (!confirm("Delete this image permanently?")) return;
                  try {
                    await deleteMedia(m);
                    await qc.invalidateQueries({ queryKey: ["media"] });
                    toast.success("Image deleted");
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "Delete failed");
                  }
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Single-image picker used by `image` fields. */
export function ImagePicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-start gap-3">
        <div className="grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-sm border border-dashed border-border bg-muted text-xs text-muted-foreground">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span>No image</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Choose image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Select an image</DialogTitle>
              </DialogHeader>
              <div className="mb-4">
                <MediaUploadButton
                  onUploaded={(m) => {
                    onChange(m.url);
                    setOpen(false);
                  }}
                />
              </div>
              <MediaGrid
                selectable
                onPick={(m) => {
                  onChange(m.url);
                  setOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
              <X className="h-3.5 w-3.5" /> Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Multi-image editor used by `images` fields (photo films, gallery). */
export function ImagesEditor({
  value,
  onChange,
  label,
}: {
  value: { url?: string; alt?: string; caption?: string }[];
  onChange: (v: { url?: string; alt?: string; caption?: string }[]) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const items = value ?? [];

  const update = (i: number, patch: Partial<{ url: string; alt: string; caption: string }>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" size="sm" variant="outline">
              Add photo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add a photo</DialogTitle>
            </DialogHeader>
            <div className="mb-4">
              <MediaUploadButton
                onUploaded={(m) => {
                  onChange([...items, { url: m.url, alt: m.alt, caption: m.caption }]);
                  setOpen(false);
                }}
              />
            </div>
            <MediaGrid
              selectable
              onPick={(m) => {
                onChange([...items, { url: m.url, alt: m.alt, caption: m.caption }]);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 && (
        <p className="rounded-sm border border-dashed border-border p-4 text-sm text-muted-foreground">
          No photos yet — a placeholder is shown on the website until you add some.
        </p>
      )}

      <ul className="space-y-3">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex flex-wrap items-start gap-3 rounded-sm border border-border bg-card p-3"
          >
            <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-sm bg-muted text-xs text-muted-foreground">
              {it.url ? (
                <img src={it.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span>Placeholder</span>
              )}
            </div>
            <div className="grid min-w-[220px] flex-1 gap-2">
              <Input
                placeholder="Alt text (for accessibility)"
                value={it.alt ?? ""}
                onChange={(e) => update(i, { alt: e.target.value })}
              />
              <Input
                placeholder="Caption"
                value={it.caption ?? ""}
                onChange={(e) => update(i, { caption: e.target.value })}
              />
            </div>
            <div className="flex gap-1">
              <Button type="button" size="sm" variant="outline" onClick={() => move(i, -1)}>
                ↑
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => move(i, 1)}>
                ↓
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
