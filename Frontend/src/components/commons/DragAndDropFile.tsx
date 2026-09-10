import { useRef } from "react";
import { Trash2, UploadCloud } from "lucide-react";

function DragAndDropFile({
  text,
  file,
  setFile,
  removeFile,
  accept = "video/*,image/*",
  hint = "Max 6MB each (12MB for videos)",
}: any) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFile = files[0];
    setFile(newFile);
  };

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    wrapperRef.current?.classList.remove("dragover");
    onFileChange(e.dataTransfer.files);
  };

  const isImage = file?.type?.startsWith("image/");

  return (
    <div>
      <label className="sn-label">
        {text} <span className="text-danger-400">*</span>
      </label>

      <div
        ref={wrapperRef}
        role="button"
        tabIndex={0}
        aria-label={`${text}. Click to browse, or drop a file here.`}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-700 bg-ink-850/60 px-6 py-10 text-center transition-all duration-200 hover:border-brand-400/60 hover:bg-ink-850"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={onDrop}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-800 text-brand-300">
          <UploadCloud className="h-5 w-5" />
        </span>

        <p className="mt-4 text-sm text-ink-300">
          Drag and drop a file, or{" "}
          <span className="font-semibold text-brand-300">browse</span>
        </p>
        <p className="mt-1.5 text-xs text-ink-500">{hint}</p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-600">
          <span>Aspect ratio 16:9</span>
          <span>Recommended 1024×576</span>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files)}
          accept={accept}
        />
      </div>

      {file && (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-ink-800 bg-ink-850 p-3">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={
                isImage
                  ? URL.createObjectURL(file)
                  : "https://img.icons8.com/fluency/48/file.png"
              }
              alt=""
              className="h-11 w-11 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {file.name}
              </p>
              <p className="text-xs text-ink-400">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-danger-500/40 px-3 text-xs font-semibold text-danger-400 transition-all duration-200 hover:bg-danger-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default DragAndDropFile;
