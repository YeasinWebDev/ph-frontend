import { useEffect, useState } from "react";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";

interface MultipleImageUploaderProps {
  value: (string | File)[];
  onChange: (files: (string | File)[]) => void;
}

export default function MultipleImageUploader({
  value,
  onChange,
}: MultipleImageUploaderProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 3;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
      clearFiles, 
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  });

  const [previews, setPreviews] = useState<{ url: string; source: string | File }[]>([]);

  // 🧠 Generate previews from `value` only
  useEffect(() => {
    const newPreviews: { url: string; source: string | File }[] = [];

    value.forEach((item) => {
      if (typeof item === "string") {
        newPreviews.push({ url: item, source: item });
      } else if (item instanceof File) {
        const existing = previews.find((p) => p.source === item);
        if (existing) {
          newPreviews.push(existing);
        } else {
          const url = URL.createObjectURL(item);
          newPreviews.push({ url, source: item });
        }
      }
    });

    setPreviews(newPreviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 📎 Add new uploaded files
  useEffect(() => {
    if (files.length > 0) {
      const newFiles = files.map((f) => f.file);
      const uniqueFiles = newFiles.filter(
        (f) => !value.some((v) => v instanceof File && v === f)
      );

      if (uniqueFiles.length > 0) {
        onChange([...value, ...uniqueFiles]);
      }

      // ✅ Clear uploader after syncing to parent to avoid re-adding old files later
      clearFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // 🧽 Remove image and revoke URLs
  const handleRemove = (item: string | File) => {
    if (item instanceof File) {
      const preview = previews.find((p) => p.source === item);
      if (preview) URL.revokeObjectURL(preview.url);
    }
    const updated = value.filter((v) => v !== item);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={previews.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />

        {previews.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Uploaded Files ({previews.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={previews.length >= maxFiles}
                type="button"
              >
                <UploadIcon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {previews.map((item, index) => (
                <div
                  key={`preview-${index}`}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={item.url}
                    alt="preview"
                    className="size-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => handleRemove(item.source)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                    type="button"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={openFileDialog}
              type="button"
            >
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
