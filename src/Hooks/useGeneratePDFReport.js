import jsPDF from 'jspdf'
import 'jspdf-autotable'

import { generateSubjectReportRequest } from '../Services/API/generateSubjectReportRequest'

import NFCLogo from '../Assets/Images/NFC Iet Logo.png'

import useAuth from './useAuth'

export default function useGeneratePDFReport() {
  const { token } = useAuth()
  const generatePDF = async subjectId => {
    try {
      const data = await generateSubjectReportRequest(
        token,
        '63ff16eb005ddd64e4564796',
      )
      const doc = new jsPDF({
        orientation: 'landscape',
      })
      const img = new Image()

      const imgWidth = 20
      const imgHeight = 18

      img.src = NFCLogo

      const pageWidth = doc.internal.pageSize.getWidth()
      const marginX = (pageWidth - imgWidth) / 2

      doc.addImage(img, 'png', marginX, 2, imgWidth, imgHeight)
      doc.text(`Subject: ${data.subject_name}`, 14, 27)
      doc.text(`Teacher: ${data.teacher_name}`, 14, 33)
      doc.autoTable(data.tableColumn, data.tableRows, {
        theme: 'grid',
        startY: 40,
        tableWidth: '100%',
        headStyles: {
          fillColor: '#70231d',
          textColor: '#ffffff',
        },
        styles: {
          minCellWidth: 5,
          fontSize: 5,
          halign: 'center',
        },
        columnStyles: {
          0: { columnWidth: 25, halign: 'left' },
          [data.tableColumn.length - 1]: { columnWidth: 10 },
        },
      })
      const date = Date().split(' ')
      const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
      doc.save(`attendance_report_${dateStr}.pdf`)
    } catch (err) {
      console.log(err)
      return
    }
  }

  return { generatePDF }
}
