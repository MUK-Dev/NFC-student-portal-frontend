import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState } from 'react'

import { generateStudentResultReportRequest } from '../Services/API/generateStudentResultReportRequest'
import { getStudentById } from '../Services/API/getStudentById'

import NFCLogo from '../Assets/Images/NFC Iet Logo.png'

import useAuth from './useAuth'

export default function useStudentResultPDFReport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const { token, user } = useAuth()

  const generateStudentResultPDF = async studentId => {
    setIsGenerating(prev => true)
    setError(null)
    try {
      const studentData = await getStudentById(token, studentId)
      const data = await generateStudentResultReportRequest(token, studentId)
      const doc = []
      let count = 0
      doc[0] = new jsPDF({
        orientation: 'portrait',
      })
      Object.keys(data.tableColumn).length > 2
        ? ((doc[1] = new jsPDF({
            orientation: 'portrait',
          })),
          count++)
        : null
      Object.keys(data.tableColumn).length > 4
        ? ((doc[2] = new jsPDF({
            orientation: 'portrait',
          })),
          count++)
        : null
      Object.keys(data.tableColumn).length > 6
        ? ((doc[3] = new jsPDF({
            orientation: 'portrait',
          })),
          count++)
        : null
      Object.keys(data.tableColumn).length > 8
        ? ((doc[4] = new jsPDF({
            orientation: 'portrait',
          })),
          count++)
        : null
      const img = new Image()

      const imgWidth = 30
      const imgHeight = 27

      img.src = NFCLogo

      const pageWidth = doc[0].internal.pageSize.getWidth()
      const pageHight = doc[0].internal.pageSize.getHeight()
      const marginX = pageWidth - 15 - imgWidth

      for (let row = 0; row <= count; row++) {
        doc[row].addImage(img, 'png', marginX, 10, imgWidth, imgHeight)
        doc[row].setFontSize(18)
        doc[row].text('NFC Institute of Engineering & Technology', 15, 25)
        doc[row].setFontSize(11)
        doc[row].setTextColor(100)
        doc[row].text(
          'P.O. Fertilizer Project, Khanewal Road, MULTAN-PAKISTAN',
          15,
          32,
        )
        doc[row].setFontSize(25)
        doc[row].setTextColor(112, 35, 29)
        doc[row].text('Result Card', pageWidth / 2 - 20, 50)
        doc[row].setFontSize(12)
        doc[row].setTextColor(0, 0, 0)
        doc[row].text(`${data.values.program_title}`, pageWidth / 2 - 32, 57)
        doc[row].text(
          `${data.values.session_start} - ${data.values.session_end}`,
          pageWidth / 2 - 10,
          63,
        )
        doc[row].text(`Name:      ${studentData?.name}`, 25, 80)
        doc[row].text(
          `Roll No.:      ${data.values.session_title}-${data.values.program_abbreviation}-${studentData?.rollNo}`,
          pageWidth - 80,
          80,
        )
      }
      Object.keys(data.tableColumn)?.map((row, i) => {
        let index = 0
        if (i < 2) {
          index = 0
        } else if (i < 4) {
          index = 1
        } else if (i < 6) {
          index = 2
        } else if (i < 8) {
          index = 3
        } else if (i < 10) {
          index = 4
        } else {
          return
        }
        doc[index].setFontSize(11)
        doc[index].setTextColor(0, 0, 0)
        doc[index].text(
          `Semester ${row} Result`,
          25,
          doc[index].lastAutoTable.finalY + 10 > 110
            ? doc[index].lastAutoTable.finalY + 12
            : 108,
        )
        doc[index].autoTable(data.tableColumn[row], data.tableRows[row], {
          theme: 'grid',
          tableWidth: '60%',
          pageBreak: 'avoid',
          margin: { right: 25, left: 25 },
          startY:
            doc[index]?.lastAutoTable.finalY + 10 > 110
              ? doc[index]?.lastAutoTable.finalY + 15
              : 110,
          headStyles: {
            fillColor: '#70231d',
            textColor: '#ffffff',
          },
          styles: {
            minCellWidth: 5,
            fontSize: 7,
            halign: 'center',
            overflow: 'hidden',
            pageBreak: 'avoid',
          },
        })
        return
      })
      for (let row = 0; row <= count; row++) {
        doc[row].setFontSize(8)
        doc[row].text('Deputy Controller of Examinations', 25, pageHight - 30)
        doc[row].text(
          'Controller of Examinations',
          pageWidth - 60,
          pageHight - 30,
        )
        doc[row].setFontSize(6)
        doc[row].text(
          'Note: Errors & Omissions Excepted Online Portal Generated',
          pageWidth / 2 - 30,
          pageHight - 10,
        )

        const date = Date().split(' ')
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
        doc[row].save(`StudentResultReport_Page_${row + 1}_${dateStr}.pdf`)
      }
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
