'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.bubble.css';

// Define prop types
interface PreviewProps {
  value: string;
}

export function Preview({ value }: PreviewProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return <ReactQuill theme="bubble" readOnly value={value} />;
}
