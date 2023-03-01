import axios from 'axios'

export const getSemester = async (department, program, session) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/semesters?department=${department}&program=${program}&session=${session}`,
  )
  return data
}
