import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { SECTION_MAP, type Field } from "@/content/schema";
import { useContent, useSaveContent } from "@/lib/site-content";
import { ImagePicker, ImagesEditor } from "@/components/admin/Media";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/content/$key")({
  component: SectionEditor,
});

type Value = Record<string, any>;

function emptyItem(fields: Field[]): Value {
  const item: Value = {};
  for (const f of fields) item[f.name] = f.type === "list" ? [] : f.type === "images" ? [] : "";
  return item;
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === "image") {
    return <ImagePicker label={field.label} value={value ?? ""} onChange={onChange} />;
  }
  if (field.type === "images") {
    return <ImagesEditor label={field.label} value={value ?? []} onChange={onChange} />;
  }
  if (field.type === "list") {
    const items: Value[] = Array.isArray(value) ? value : [];
    const update = (i: number, patch: Value) =>
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
          <p className="text-sm font-medium">{field.label}</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onChange([...items, emptyItem(field.fields)])}
          >
            <Plus className="h-3.5 w-3.5" /> Add {field.itemLabel.toLowerCase()}
          </Button>
        </div>
        {items.length === 0 && (
          <p className="rounded-sm border border-dashed border-border p-4 text-sm text-muted-foreground">
            Nothing here yet.
          </p>
        )}
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="rounded-sm border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs tracking-[0.18em] text-maroon uppercase">
                  {field.itemLabel} {i + 1}
                </p>
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
              </div>
              <div className="space-y-4">
                {field.fields.map((sub) => (
                  <FieldEditor
                    key={sub.name}
                    field={sub}
                    value={item[sub.name]}
                    onChange={(v) => update(i, { [sub.name]: v })}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const id = `f-${field.name}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{field.label}</Label>
      {field.type === "textarea" ? (
        <Textarea
          id={id}
          rows={4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input
          id={id}
          type={field.type === "url" ? "url" : "text"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.hint && <p className="text-xs text-muted-foreground">{field.hint}</p>}
    </div>
  );
}

function SectionEditor() {
  const { key } = useParams({ from: "/admin/content/$key" });
  const def = SECTION_MAP[key];
  const stored = useContent(key);
  const save = useSaveContent();
  const [draft, setDraft] = useState<Value>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(stored as Value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, JSON.stringify(stored)]);

  if (!def) {
    return <p className="text-sm text-muted-foreground">Unknown section.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">{def.label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{def.hint ?? `Shown on ${def.page}`}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={def.page} target="_top" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5" /> View page
          </a>
        </Button>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await save(key, draft);
            toast.success("Saved — the website is updated");
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Could not save");
          } finally {
            setBusy(false);
          }
        }}
      >
        {def.fields.map((f) => (
          <FieldEditor
            key={f.name}
            field={f}
            value={draft[f.name]}
            onChange={(v) => setDraft((d) => ({ ...d, [f.name]: v }))}
          />
        ))}

        <div className="sticky bottom-4 flex gap-3 rounded-sm border border-border bg-card/95 p-3 backdrop-blur">
          <Button type="submit" disabled={busy} className="bg-navy text-cream">
            {busy ? "Saving…" : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDraft({ ...def.defaults })}
            disabled={busy}
          >
            Reset to placeholder
          </Button>
        </div>
      </form>
    </div>
  );
}
