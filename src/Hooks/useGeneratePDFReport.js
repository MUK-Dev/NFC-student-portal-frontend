import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState } from 'react'

import { generateSubjectReportRequest } from '../Services/API/generateSubjectReportRequest'

import NFCLogo from '../Assets/Images/NFC Iet Logo.png'

import useAuth from './useAuth'

export default function useGeneratePDFReport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const generatePDF = async (subjectId, sectionId) => {
    setIsGenerating(prev => true)
    setError(null)
    try {
      const data = await generateSubjectReportRequest(
        token,
        subjectId,
        sectionId,
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
      doc.text(`Course Code: ${data.course_code}`, 14, 39)
      doc.text(`Section: ${data.section}`, 14, 45)
      doc.text(`Semester: ${data.semester}`, 14, 51)
      doc.text(`Session: ${data.session}`, 14, 57)
      doc.text(`Semester start date: ${data.semester_start_date}`, 14, 63)
      doc.autoTable(data.tableColumn, data.tableRows, {
        theme: 'grid',
        startY: 65,
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
          1: { cellWidth: 25, halign: 'left' },
          [data.tableColumn.length - 1]: { cellWidth: 10 },
        },
        didParseCell: function (data) {
          if (data.section !== 'body') return
          if (data.cell.raw === 'P') {
            data.cell.styles.fillColor = [66, 245, 66]
            data.cell.styles.textColor = [0, 0, 0]
          } else if (data.cell.raw === 'A') {
            data.cell.styles.fillColor = [245, 66, 66]
            data.cell.styles.textColor = [255, 255, 255]
          } else {
            data.cell.styles.textColor = [0, 0, 0]
            data.cell.styles.fillColor = [255, 255, 255]
          }
        },
      })
      const date = Date().split(' ')
      const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
      doc.save(`attendance_report_${dateStr}.pdf`)
      setIsGenerating(prev => false)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
      setIsGenerating(prev => false)
      return
    }
  }

  return { generatePDF, isGenerating, error }
}
