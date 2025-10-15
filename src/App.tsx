import { useMemo, useState, useEffect } from 'react'
import PdfWithOverlay, { type ExtractResult } from './components/PdfWithOverlay'
import './App.css'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  const [file, setFile] = useState<string>("")
  const [extract, setExtract] = useState<ExtractResult | null>(null)
  const [highlightTypes, setHighlightTypes] = useState<string[]>([])

  const getExtract = useMemo(() => async () => {
    const response = await fetch("https://gist.githubusercontent.com/raunakdoesdev/ac6f2ee2fa4800c37ae73fbfa7d602e4/raw/06b873650604fb7db776dc41a805e99e6b6807ab/reducto-sample-doc.json");
    const data = await response.json();
    return data;
  }, []);

  useEffect(() => {
    if (!file) return;
    const fetchExtract = async () => {
      const extractData = await getExtract();
      setExtract(extractData);
    };
    fetchExtract();
  }, [file, getExtract]);

  useEffect(() => {
    setHighlightTypes(extract?.result?.chunks?.map((c) => c.blocks?.map((block) => block.type) ?? []).flat() ?? [])
  }, [extract]);

  useEffect(() => {
    setFile("https://utfs.io/f/7c8afb03-8a18-49cd-89a7-029331070e11-5pgip1.pdf")
  }, []);

  return (
    <>
      <PdfWithOverlay file={file} extract={extract} highlightTypes={highlightTypes} />
    </>
  )
}

export default App
