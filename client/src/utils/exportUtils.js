import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export const exportToWord = async (data) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun("Market Analysis Report"),
            new TextRun({
              text: "\n\nSkills Analysis:",
              bold: true
            }),
          ],
        }),
        ...data.map(skill => new Paragraph({
          children: [
            new TextRun(`\n${skill.name}: ${skill.coverage}% coverage (Market demand: ${skill.demand}%)`),
          ],
        })),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "market-analysis-report.docx");
};

export const exportToPDF = (data) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text("Market Analysis Report", 20, 20);
  
  doc.setFontSize(12);
  let yPosition = 40;
  
  data.forEach(skill => {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.text(`${skill.name}: ${skill.coverage}% coverage (Market demand: ${skill.demand}%)`, 20, yPosition);
    yPosition += 10;
  });

  doc.save("market-analysis-report.pdf");
};

export const exportToExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data.map(skill => ({
    "Skill Name": skill.name,
    "Coverage (%)": skill.coverage,
    "Market Demand (%)": skill.demand,
    "Status": skill.status
  })));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Skills Analysis");
  
  XLSX.writeFile(wb, "market-analysis-report.xlsx");
}; 