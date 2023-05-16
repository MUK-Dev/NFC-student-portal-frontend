import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState } from 'react'

import { generateStudentResultReportRequest } from '../Services/API/generateStudentResultReportRequest'

import NFCLogo from '../Assets/Images/NFC Iet Logo.png'

import useAuth from './useAuth'

export default function useStudentResultPDFReport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const generateStudentResultPDF = async studentId => {
    setIsGenerating(prev => true)
    setError(null)
    try {
      const data = await generateStudentResultReportRequest(token)
      const doc = new jsPDF({
        orientation: 'portrait',
      })
      const img = new Image()

      const imgWidth = 30
      const imgHeight = 27

      img.src = NFCLogo

      const pageWidth = doc.internal.pageSize.getWidth()
      const marginX = pageWidth - 15 - imgWidth

      doc.addImage(img, 'png', marginX, 5, imgWidth, imgHeight)

      console.log(data)
      doc.setFontSize(18)
      doc.text('NFC Institute of Engineering & Technology', 15, 15)
      doc.setFontSize(11)
      doc.setTextColor(100)
      doc.text(
        'P.O. Fertilizer Project, Khanewal Road, MULTAN-PAKISTAN',
        15,
        20,
      )
      doc.setFontSize(25)
      doc.setTextColor(112, 35, 29)
      doc.text('Result Card', pageWidth / 2 - 20, 30)
      Object.keys(data.tableColumn)?.map((row, i) => {
        doc.setFontSize(11)
        doc.setTextColor(0, 0, 0)
        doc.text(
          `Semester ${row} Result`,
          15,
          doc.lastAutoTable.finalY + 10 > 60
            ? doc.lastAutoTable.finalY + 8
            : 58,
        )
        doc.autoTable(data.tableColumn[row], data.tableRows[row], {
          theme: 'grid',
          tableWidth: '60%',
          pageBreak: 'avoid',
          startY:
            doc.lastAutoTable.finalY + 10 > 60
              ? doc.lastAutoTable.finalY + 10
              : 60,
          headStyles: {
            fillColor: '#70231d',
            textColor: '#ffffff',
          },
          styles: {
            minCellWidth: 5,
            fontSize: 5,
            halign: 'center',
            overflow: 'hidden',
            pageBreak: 'avoid',
          },
        }),
          console.log(row)
        return
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

  return { generateStudentResultPDF, isGenerating, error }
}
