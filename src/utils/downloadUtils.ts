import { frontendLevels, backendLevels, type Level } from "./hierarchyData";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

type AutoTableJsPDF = jsPDF & {
  autoTable: Function;
  lastAutoTable?: {
    finalY: number;
  };
}

type Format = 'json' | 'csv' | 'pdf';

const convertToCSV = (data: Level[]) => {
  let csv = 'Level ID,Level Number,Title,Skills,Progress\n';

  data.forEach(level => {
    const skillsFormatted = `"${level.skills.join('; ')}"`;
    csv += `${level.id},${level.level},${level.title},${skillsFormatted},${level.progress}\n`;
  });

  return csv;
};

const convertAllToCSV = () => {
  let csv = 'Type,Level ID,Level Number,Title,Skills,Progress\n';
  frontendLevels.forEach(level => {
    const skillsFormatted = `"${level.skills.join('; ')}"`;
    csv += `Frontend,${level.id},${level.level},${level.title},${skillsFormatted},${level.progress}\n`;
  });

  backendLevels.forEach(level => {
    const skillsFormatted = `"${level.skills.join('; ')}"`;
    csv += `Backend,${level.id},${level.level},${level.title},${skillsFormatted},${level.progress}\n`;
  });

  return csv;
};

const generateBasicPDF = (data: Level[], title: string): jsPDF => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  doc.setFontSize(12);
  let yPos = 40;

  doc.setFont('helvetica', 'bold');
  doc.text('Level', 14, yPos);
  doc.text('Title', 30, yPos);
  doc.text('Skills', 100, yPos);
  doc.text('Progress', 180, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'normal');
  data.forEach(level => {
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;

      doc.setFont('helvetica', 'bold');
      doc.text('Level', 14, yPos);
      doc.text('Title', 30, yPos);
      doc.text('Skills', 100, yPos);
      doc.text('Progress', 180, yPos);
      yPos += 10;
      doc.setFont('helvetica', 'normal');
    }

    doc.text(level.level.toString(), 14, yPos);
    doc.text(level.title, 30, yPos);

    const skillsText = level.skills.join(', ');
    const textLines = doc.splitTextToSize(skillsText, 75);
    doc.text(textLines, 100, yPos);

    doc.text(`${level.progress}%`, 180, yPos);

    yPos += Math.max(10, textLines.length * 7);
  });

  return doc;
};

const generatePDF = (data: Level[], title: string): jsPDF => {
  const doc = new jsPDF() as AutoTableJsPDF;

  try {
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = data.map(level => [
      level.level.toString(),
      level.title,
      level.skills.join(', '),
      `${level.progress}%`
    ]);

    if (typeof doc.autoTable === 'function') {
      doc.autoTable({
        startY: 40,
        head: [['Level', 'Title', 'Skills', 'Progress']],
        body: tableData,
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        margin: { top: 40 }
      });
      return doc;
    } else {
      console.warn('autoTable not available, using basic PDF format');
      return generateBasicPDF(data, title);
    }
  } catch (error) {
    console.error('Error generating PDF with autoTable:', error);
    return generateBasicPDF(data, title);
  }
};

// Generate PDF with both frontend and backend levels
const generateCompletePDF = (): jsPDF => {
  const doc = new jsPDF() as AutoTableJsPDF;

  try {
    // Add title
    doc.setFontSize(18);
    doc.text('Complete Developer Hierarchy', 14, 22);

    // Add date
    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

    // Check if autoTable is available
    if (typeof doc.autoTable !== 'function') {
      console.warn('autoTable not available, using basic PDF format');

      // Generate separate PDFs and merge them
      const frontendDoc = generateBasicPDF(frontendLevels, 'Frontend Developer Hierarchy');
      const backendDoc = generateBasicPDF(backendLevels, 'Backend Developer Hierarchy');

      // Create a new PDF with all pages from both docs
      const mergedDoc = new jsPDF();
      mergedDoc.text('Complete Developer Hierarchy', 14, 22);
      mergedDoc.setFontSize(11);
      mergedDoc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

      return mergedDoc;
    }

    // Frontend section
    doc.setFontSize(14);
    doc.text('Frontend Developer Path', 14, 40);

    // Prepare frontend data
    const frontendTableData = frontendLevels.map(level => [
      level.level.toString(),
      level.title,
      level.skills.join(', '),
      `${level.progress}%`
    ]);

    // Add frontend table
    doc.autoTable({
      startY: 45,
      head: [['Level', 'Title', 'Skills', 'Progress']],
      body: frontendTableData,
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: 45 }
    });

    // Backend section - determine position after frontend table
    const lastPosition = (doc.lastAutoTable?.finalY || 140) + 15;
    doc.setFontSize(14);
    doc.text('Backend Developer Path', 14, lastPosition);

    // Prepare backend data
    const backendTableData = backendLevels.map(level => [
      level.level.toString(),
      level.title,
      level.skills.join(', '),
      `${level.progress}%`
    ]);

    // Add backend table
    doc.autoTable({
      startY: lastPosition + 5,
      head: [['Level', 'Title', 'Skills', 'Progress']],
      body: backendTableData,
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: lastPosition + 5 }
    });

    return doc;
  } catch (error) {
    console.error('Error generating complete PDF:', error);
    // Fallback to basic PDF
    return new jsPDF();
  }
};

export const downloadHierarchyData = (type: 'frontend' | 'backend' | 'all', format: Format = 'json') => {
  let data;
  let filename: string;

  if (format === 'pdf') {
    // Handle PDF generation
    let doc: jsPDF;

    if (type === 'frontend') {
      filename = 'frontend-developer-hierarchy.pdf';
      doc = generatePDF(frontendLevels, 'Frontend Developer Hierarchy');
    } else if (type === 'backend') {
      filename = 'backend-developer-hierarchy.pdf';
      doc = generatePDF(backendLevels, 'Backend Developer Hierarchy');
    } else {
      filename = 'developer-hierarchy-complete.pdf';
      doc = generateCompletePDF();
    }

    // Save the PDF
    doc.save(filename);
    return;
  }

  // For JSON and CSV formats
  let mimeType: string;
  let fileContent: string;

  // Determine file extension based on format
  const extension = format === 'json' ? 'json' : 'csv';

  if (type === 'frontend') {
    data = frontendLevels;
    filename = `frontend-developer-hierarchy.${extension}`;
  } else if (type === 'backend') {
    data = backendLevels;
    filename = `backend-developer-hierarchy.${extension}`;
  } else {
    data = { frontend: frontendLevels, backend: backendLevels };
    filename = `developer-hierarchy-complete.${extension}`;
  }

  // Create content based on the format
  if (format === 'json') {
    fileContent = JSON.stringify(data, null, 2);
    mimeType = 'application/json';
  } else {
    if (type === 'frontend') {
      fileContent = convertToCSV(frontendLevels);
    } else if (type === 'backend') {
      fileContent = convertToCSV(backendLevels);
    } else {
      fileContent = convertAllToCSV();
    }
    mimeType = 'text/csv';
  }

  // Create a blob of the data
  const blob = new Blob([fileContent], { type: mimeType });

  // Create an anchor element and trigger a download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // Append to the document, click, and then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release the blob URL
  URL.revokeObjectURL(url);
};
