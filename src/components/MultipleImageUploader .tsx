import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function MultipleImageUploader({ value, onChange }: any) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 3;

  const [{ files, isDragging, errors }, { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  });

  const [existingPreviews, setExistingPreviews] = useState<string[]>([]);

  // ✅ Whenever "value" from parent changes, update existing previews
  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      const urls = value.map((item) => (typeof item === "string" ? item : URL.createObjectURL(item)));
      setExistingPreviews(urls);
    } else {
      setExistingPreviews([]);
    }
  }, [value]);

  // ✅ Notify parent when files from uploader change
  useEffect(() => {
    if (files.length > 0) {
      onChange([
        ...existingPreviews.filter((url) => typeof url !== "string"), // keep previous file objects if any
        ...files.map((file) => file.file),
      ]);
    } else {
      // if only old images exist
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // ✅ Remove existing image (URLs)
  const handleRemoveExisting = (url: string) => {
    const updated = existingPreviews.filter((item) => item !== url);
    setExistingPreviews(updated);

    // Remove from parent value too
    const updatedValue = value.filter((item: string) => (typeof item === "string" ? item !== url : true));
    onChange(updatedValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />

        {existingPreviews.length > 0 || files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">Uploaded Files ({existingPreviews.length + files.length})</h3>
              <Button variant="outline" size="sm" onClick={openFileDialog} disabled={files.length + existingPreviews.length >= maxFiles} type="button">
                <UploadIcon className="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {/* ✅ Existing preview images */}
              {existingPreviews.map((url, index) => (
                <div key={`existing-${index}`} className="bg-accent relative aspect-square rounded-md">
                  <img src={url} alt="Existing" className="size-full rounded-[inherit] object-cover" />
                  <Button
                    onClick={() => handleRemoveExisting(url)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                    type="button"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}

              {/* ✅ Newly uploaded images */}
              {files.map((file) => (
                <div key={file.id} className="bg-accent relative aspect-square rounded-md">
                  <img src={file.preview} alt={file.file.name} className="size-full rounded-[inherit] object-cover" />
                  <Button
                    onClick={() => removeFile(file.id)}
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
            <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)</p>
            <Button variant="outline" className="mt-4" onClick={openFileDialog} type="button">
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
