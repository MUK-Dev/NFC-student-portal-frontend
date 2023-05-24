import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState } from 'react'

import { generateStudentResultReportRequest } from '../Services/API/generateStudentResultReportRequest'
import { getStudentById } from '../Services/API/getStudentById'

import NFCLogo from '../Assets/Images/NFC Iet Logo.png'

import useAuth from './useAuth'

export default function useStudentSemesterResultPDFReport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const { token, user } = useAuth()

  const generateStudentSemesterResultPDF = async (studentId, semester) => {
    setIsGenerating(prev => true)
    setError(null)
    try {
      const studentData = await getStudentById(token, studentId)
      const data = await generateStudentResultReportRequest(token, studentId)
      const doc = new jsPDF({
        orientation: 'portrait',
      })

      const img = new Image()

      const imgWidth = 30
      const imgHeight = 27

      img.src = NFCLogo

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHight = doc.internal.pageSize.getHeight()
      const marginX = pageWidth - 15 - imgWidth

      doc.addImage(img, 'png', marginX, 10, imgWidth, imgHeight)
      doc.setFontSize(18)
      doc.text('NFC Institute of Engineering & Technology', 15, 25)
      doc.setFontSize(11)
      doc.setTextColor(100)
      doc.text(
        'P.O. Fertilizer Project, Khanewal Road, MULTAN-PAKISTAN',
        15,
        32,
      )
      doc.setFontSize(25)
      doc.setTextColor(112, 35, 29)
      doc.text('Result Card', pageWidth / 2 - 20, 50)
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`${data.values.program_title}`, pageWidth / 2 - 32, 57)
      doc.text(
        `${data.values.session_start} - ${data.values.session_end}`,
        pageWidth / 2 - 10,
        63,
      )
      doc.text(`Name:      ${studentData?.name}`, 25, 80)
      doc.text(
        `Roll No.:      ${data.values.session_title}-${data.values.program_abbreviation}-${studentData?.rollNo}`,
        pageWidth - 80,
        80,
      )

      Object.keys(data.tableColumn)?.map((row, i) => {
        if (row === semester) {
          doc.setFontSize(11)
          doc.setTextColor(0, 0, 0)
          doc.text(`Semester ${row} Result`, 25, 110)
          doc.autoTable(data.tableColumn[row], data.tableRows[row], {
            theme: 'grid',
            tableWidth: '60%',
            pageBreak: 'avoid',
            margin: { right: 25, left: 25 },
            startY: 113,
            headStyles: {
              fillColor: '#70231d',
              textColor: '#ffffff',
            },
            styles: {
              minCellWidth: 5,
              fontSize: 10,
              halign: 'center',
              overflow: 'hidden',
              pageBreak: 'avoid',
            },
          })
        }
        return
      })

      doc.setFontSize(8)
      doc.text('Deputy Controller of Examinations', 25, pageHight - 30)
      doc.text('Controller of Examinations', pageWidth - 60, pageHight - 30)
      doc.setFontSize(6)
      doc.text(
        'Note: Errors & Omissions Excepted Online Portal Generated',
        pageWidth / 2 - 30,
        pageHight - 10,
      )

      const date = Date().split(' ')
      const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
      doc.save(`StudentResultReport_Semester_${semester}_${dateStr}.pdf`)
      setIsGenerating(prev => false)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
      setIsGenerating(prev => false)
      return
    }
  }

  return { generateStudentSemesterResultPDF, isGenerating, error }
}
