import { useMemo, useState } from 'react';
import { Document, Page } from 'react-pdf';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export type Block = {
  type: string;
  bbox: {
    left: number;
    top: number;
    width: number;
    height: number;
    page: number;
  };
  content?: string;
};

export type ExtractResult = {
  result?: {
    chunks?: Array<{
      blocks?: Block[];
    }>;
  };
};

export default function PdfWithOverlay({
  file,
  extract,
  highlightTypes,
  pageScale = 1.2,
}: {
  file: string | File | ArrayBuffer;
  extract: ExtractResult | null;
  highlightTypes?: string[];
  pageScale?: number;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [activeId, setActiveId] = useState<number | null>(null);

  const boxesByPage = useMemo(() => {
    const map: Record<number, Array<{ id: number; left: number; top: number; width: number; height: number; type: string; content?: string }>> = {};
    const blocks = extract?.result?.chunks?.map((c) => c.blocks ?? []).flat() ?? [];
    blocks.forEach((b, i) => {
      if (highlightTypes && !highlightTypes.includes(b.type)) return;
      const { left, top, width, height, page } = b.bbox || {};
      if (page == null) return;
      (map[page] ??= []).push({
        id: i,
        left, top, width, height,
        type: b.type,
        content: b.content,
      });
    });
    return map;
  }, [extract, highlightTypes]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {Array.from({ length: numPages ?? 0 }, (_, i) => {
          const pageNumber = i + 1;
          const boxes = boxesByPage[pageNumber] ?? [];
          return (
            <div key={pageNumber} style={{ position: 'relative', width: 'fit-content', marginBottom: 24 }}>
              <Page
                pageNumber={pageNumber}
                scale={pageScale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {boxes.map(b => (
                  <div
                    key={b.id}
                    onMouseEnter={() => setActiveId(b.id)}
                    onMouseLeave={() => setActiveId(a => (a === b.id ? null : a))}
                    title={`${b.type}${b.content ? `: ${truncate(b.content)}` : ''}`}
                    style={{
                      position: 'absolute',
                      left: `${b.left * 100}%`,
                      top: `${b.top * 100}%`,
                      width: `${b.width * 100}%`,
                      height: `${b.height * 100}%`,
                      border: activeId === b.id ? '2px solid #2563eb' : '2px solid #f59e0b',
                      background: activeId === b.id ? 'rgba(37,99,235,0.15)' : 'rgba(245,158,11,0.12)',
                      borderRadius: 4,
                      transition: 'border-color 120ms, background 120ms, box-shadow 120ms',
                      boxShadow: activeId === b.id ? '0 0 0 2px rgba(37,99,235,0.35)' : 'none',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </Document>
    </div>
  );
}

function truncate(s?: string, n = 120) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}