import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState } from 'react'

import { generateSubjectResultReportRequest } from '../Services/API/generateSubjectResultReportRequest'

import NFCLogo from '../Assets/Images/NFC Iet Logo.png'

import useAuth from './useAuth'

export default function useSubjectResultPDFReport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const generateSubjectResultPDF = async sheetId => {
    setIsGenerating(prev => true)
    setError(null)
    try {
      const data = await generateSubjectResultReportRequest(token, sheetId)
      const doc = new jsPDF({
        orientation: 'portrait',
      })
      const img = new Image()

      const imgWidth = 20
      const imgHeight = 18

      img.src = NFCLogo

      const pageWidth = doc.internal.pageSize.getWidth()
      const marginX = (pageWidth - imgWidth) / 2

      doc.addImage(img, 'png', marginX, 2, imgWidth, imgHeight)
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(
        'NFC Institute of Engineering & Technology, Multan',
        pageWidth / 2 - 40,
        30,
      )
      doc.setFontSize(10)
      doc.text(`Award List`, marginX + 2, 35)
      doc.setFontSize(8)
      doc.text(`Program:    ${data.values.program_title}`, 14, 45)
      doc.text(
        `Session:     ${data.values.session_start} - ${data.values.session_end}`,
        14,
        50,
      )
      doc.text(`Course Title:    ${data.values.subject_name}`, marginX + 5, 45)
      doc.text(
        `Semester:        ${data.values.semester_title}`,
        marginX + 5,
        50,
      )
      doc.text(`Course Code:    ${data.values.subject_code}`, 155, 45)
      doc.text(`Instructor:           ${data.values.teacher_name}`, 155, 50)
      doc.autoTable(data.tableColumn, data.tableRows, {
        theme: 'grid',
        startY: 55,
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
          0: { cellWidth: 10, halign: 'center' },
        },
      })
      const date = Date().split(' ')
      const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
      doc.save(`ClassResultReport_${dateStr}.pdf`)
      setIsGenerating(prev => false)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
      setIsGenerating(prev => false)
      return
    }
  }

  return { generateSubjectResultPDF, isGenerating, error }
}
