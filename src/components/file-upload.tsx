'use client';

import { useCallback, useEffect, useState } from 'react';

import { CloudUpload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { Progress } from '~/components/ui/progress';
import { cn } from '~/lib/utils';

// Define props interface
interface UploadDropzoneProps {
  isMulti?: boolean;
  label?: string;
}

// Define the dropped file type (optional)
interface DroppedFile {
  name: string;
  size: number;
  type: string;
}

export function UploadDropzone({
  isMulti = false,
  label,
}: UploadDropzoneProps) {
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[] | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // upload progress utility
  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    const progressInterval = startSimulatedProgress();

    setDroppedFiles(
      acceptedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }))
    );

    setUploadProgress(100);
    clearInterval(progressInterval);
    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    multiple: isMulti,
    // accept: { 'image/jpeg': [], 'image/png': [] }, // Define file types if necessary
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      toast.error('Some files were rejected');
    }
  }, [fileRejections]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        'mt-3 flex cursor-pointer items-center justify-center rounded-md border border-dashed p-3 py-12 hover:bg-muted/30',
        isUploading ? 'pointer-events-none !cursor-not-allowed opacity-80' : ''
      )}
    >
      <input multiple={isMulti} {...getInputProps()} disabled={isUploading} />
      <div className="flex flex-col items-center gap-3 text-center !text-[#858585]">
        <CloudUpload size={48} className="text-gray-600" />
        <h4 className="!font-normal !text-[#858585]">
          <span className="font-semibold text-black underline">
            Click to upload
          </span>{' '}
          or drag and drop <br />
          Maximum file size 50 MB.
        </h4>
        {isUploading && (
          <div className="mx-auto mt-4 w-full max-w-xs">
            <Progress
              value={uploadProgress}
              className="h-1 w-full bg-zinc-200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
