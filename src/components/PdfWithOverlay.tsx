import { useMemo, useState } from 'react';
import { Document, Page } from 'react-pdf';

import { pdfjs } from 'react-pdf';
import Block, { type BlockType } from './Block';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export type ExtractResult = {
  result?: {
    chunks?: Array<{
      blocks?: BlockType[];
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

  // Transform raw blocks into organized data structure by page
  const blocksByPage = useMemo(() => {
    const byPage: Record<number, Array<{
      id: number;
      left: number;
      top: number;
      width: number;
      height: number;
      type: string;
    }>> = {};
    
    const blocks = extract?.result?.chunks?.flatMap((c) => c.blocks ?? []) ?? [];
    
    blocks.forEach((block, index) => {
      if (highlightTypes && !highlightTypes.includes(block.type)) return;
      
      const { left, top, width, height, page } = block.bbox || {};
      if (page == null) return;
      
      (byPage[page] ??= []).push({
        id: index,
        left,
        top,
        width,
        height,
        type: block.type,
      });
    });
    
    return byPage;
  }, [extract, highlightTypes]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {Array.from({ length: numPages ?? 0 }, (_, i) => {
          const pageNumber = i + 1;
          const blocks = blocksByPage[pageNumber] ?? [];
          
          return (
            <div key={pageNumber} style={{ position: 'relative', width: 'fit-content', marginBottom: 24 }}>
              <Page
                pageNumber={pageNumber}
                scale={pageScale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                {blocks.map((block) => (
                  <Block
                    key={block.id}
                    id={block.id}
                    left={block.left}
                    top={block.top}
                    width={block.width}
                    height={block.height}
                    type={block.type}
                    isActive={activeId === block.id}
                    onMouseEnter={() => setActiveId(block.id)}
                    onMouseLeave={() => setActiveId((current) => (current === block.id ? null : current))}
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