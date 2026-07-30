import { createFileRoute } from "@tanstack/react-router";
import { MediaGrid, MediaUploadButton } from "@/components/admin/Media";

export const Route = createFileRoute("/admin/media")({
  component: AdminMedia,
});

function AdminMedia() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Photo & logo library</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Upload every photo and logo here once, then select them inside any section of the site.
        Deleting an image removes it from the library permanently — sections still using it will
        fall back to a placeholder.
      </p>
      <div className="mt-6">
        <MediaUploadButton />
      </div>
      <div className="mt-8">
        <MediaGrid />
      </div>
    </div>
  );
}
