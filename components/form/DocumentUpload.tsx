"use client";

import { useId, useRef, useState } from "react";
import {
  acceptedDocumentExtensions,
  maxFileSizeMb,
  maxFilesPerSubmission,
} from "@/content/form-options";

type DocumentUploadProps = {
  name: string;
  label: string;
  hint?: string;
  wide?: boolean;
};

export default function DocumentUpload({ name, label, hint, wide = true }: DocumentUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  function validateAndSet(fileList: FileList | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const combined = [...files, ...incoming].slice(0, maxFilesPerSubmission);

    for (const file of incoming) {
      const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
      if (!acceptedDocumentExtensions.includes(ext)) {
        setError(`${file.name}: unsupported file type.`);
        return;
      }
      if (file.size > maxFileSizeMb * 1024 * 1024) {
        setError(`${file.name}: exceeds ${maxFileSizeMb}MB limit.`);
        return;
      }
    }

    setError(null);
    setFiles(combined);

    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      combined.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      next.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
    }
  }

  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="block text-sm font-medium text-graphite">
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-graphite/55">{hint}</p> : null}

      <div className="mt-2 flex items-center gap-3">
        <label
          htmlFor={id}
          className="inline-flex cursor-pointer items-center justify-center rounded border border-silver bg-white px-4 py-2.5 text-sm font-medium text-graphite hover:border-sea"
        >
          Choose Files
        </label>
        <span className="text-xs text-graphite/55">
          PDF, DOC, DOCX, XLS, XLSX, JPG, PNG — up to {maxFileSizeMb}MB each, {maxFilesPerSubmission}{" "}
          files max
        </span>
      </div>

      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        multiple
        accept={acceptedDocumentExtensions.join(",")}
        onChange={(e) => validateAndSet(e.target.files)}
        className="sr-only"
      />

      {error ? (
        <p className="mt-2 text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {files.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded bg-silver/30 px-3 py-2 text-xs text-graphite/80"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-3 shrink-0 font-medium text-federal hover:text-ocean"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
