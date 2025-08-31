import * as React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ string }) => {
  console.log("string>>>>>>>", string);
  const base64 = `data:application/pdf;base64,${string}`;
  const pdfContentType = "application/pdf";

  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      `data:${pdfContentType};base64,`.length
    );

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: pdfContentType });
  };

  const url = URL.createObjectURL(base64toBlob(base64));

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        height: "750px",
      }}
    >
      <Viewer fileUrl={url} />
    </div>
  );
};

export default PdfViewer;
