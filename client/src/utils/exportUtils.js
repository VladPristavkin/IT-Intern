import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('ru-RU');
};

const processData = (data) => {
  if (!data) return [];
  
  // If data is already in the correct format, return it
  if (Array.isArray(data) && data.every(item => item.name && (item.coverage !== undefined || item.value !== undefined))) {
    return data;
  }

  // If data is from a chart
  if (data.chartData) {
    return data.chartData.map(item => ({
      name: item.label || item.name,
      value: item.value,
      additionalInfo: item.additionalInfo || ''
    }));
  }

  // Default case - return empty array
  return [];
};

export const exportToWord = async (data) => {
  const processedData = processData(data);
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Аналитический отчет",
              bold: true,
              size: 32
            }),
            new TextRun({
              text: `\nДата создания: ${formatDate()}`,
              size: 24
            }),
            new TextRun({
              text: "\n\nАнализ данных:",
              bold: true,
              size: 28
            }),
          ],
        }),
        ...processedData.map(item => new Paragraph({
          children: [
            new TextRun({
              text: `\n${item.name}: ${item.value || item.coverage}%`,
              size: 24
            }),
            item.additionalInfo ? new TextRun({
              text: ` (${item.additionalInfo})`,
              size: 24
            }) : new TextRun("")
          ],
        })),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `analytics-report-${formatDate()}.docx`);
};

export const exportToPDF = (data) => {
  const processedData = processData(data);
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text("Аналитический отчет", 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Дата создания: ${formatDate()}`, 20, 30);
  
  doc.setFontSize(16);
  doc.text("Анализ данных:", 20, 45);
  
  doc.setFontSize(12);
  let yPosition = 60;
  
  processedData.forEach(item => {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }
    
    const text = `${item.name}: ${item.value || item.coverage}%${item.additionalInfo ? ` (${item.additionalInfo})` : ''}`;
    doc.text(text, 20, yPosition);
    yPosition += 10;
  });

  doc.save(`analytics-report-${formatDate()}.pdf`);
};

export const exportToExcel = (data) => {
  const processedData = processData(data);
  const ws = XLSX.utils.json_to_sheet(processedData.map(item => ({
    "Название": item.name,
    "Значение (%)": item.value || item.coverage,
    "Дополнительная информация": item.additionalInfo || ''
  })));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Анализ");
  
  XLSX.writeFile(wb, `analytics-report-${formatDate()}.xlsx`);
}; 