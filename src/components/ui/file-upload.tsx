'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { validateFile, validateFileCount } from '@/lib/validators/upload';
import { MAX_EVIDENCE_FILES } from '@/lib/constants';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  currentCount: number;
  disabled?: boolean;
}

export function FileUpload({ onFilesSelected, currentCount, disabled }: FileUploadProps) {
  const t = useTranslations('common');
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      setError(null);

      const files = Array.from(fileList);
      const countCheck = validateFileCount(currentCount + files.length - 1);
      if (!countCheck.valid) {
        setError(countCheck.error!);
        return;
      }

      const validFiles: File[] = [];
      for (const file of files) {
        const check = validateFile(file);
        if (!check.valid) {
          setError(check.error!);
          return;
        }
        validFiles.push(file);
      }

      onFilesSelected(validFiles);
    },
    [currentCount, onFilesSelected],
  );

  return (
    <div>
      <div
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center
          transition-colors duration-150
          ${dragActive ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          {t('uploadPrompt', { defaultMessage: 'Click or drag files to upload' })}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          JPEG, PNG, PDF - max 5MB ({currentCount}/{MAX_EVIDENCE_FILES})
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,application/pdf"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
