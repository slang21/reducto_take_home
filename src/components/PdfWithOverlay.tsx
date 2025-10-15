import { useMemo, useState } from 'react';
import { Document, Page } from 'react-pdf';

import { pdfjs } from 'react-pdf';
import Block from './Block';

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
                  <Block
                    key={b.id}
                    id={b.id}
                    left={b.left}
                    top={b.top}
                    width={b.width}
                    height={b.height}
                    type={b.type}
                    content={b.content}
                    isActive={activeId === b.id}
                    onMouseEnter={() => setActiveId(b.id)}
                    onMouseLeave={() => setActiveId(a => (a === b.id ? null : a))}
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