import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId, filename = 'document.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // OPTIMIZATION 1: Ensure all web fonts are fully loaded before capturing
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // OPTIMIZATION 2: Small artificial delay to allow any pending React re-renders or animations to settle
    await new Promise(resolve => setTimeout(resolve, 150));

    // html-to-image uses SVG foreignObject, which perfectly supports modern CSS like lab() and oklch()
    const imgData = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2, // 2x resolution for crisp text
      skipFonts: false,
      cacheBust: true, // OPTIMIZATION 3: Prevent cached, broken images from ruining the render
    });

    const img = new Image();
    img.src = imgData;
    await new Promise(resolve => img.onload = resolve);
    
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (img.height * pdfWidth) / img.width;
    
    // Create PDF with dynamic height (minimum A4 height 297mm) to prevent content cutoff
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, Math.max(297, pdfHeight)]
    });

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Download the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
