import axios from 'axios'

export const getSubject = async (department, program, session, semester) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/subjects?department=${department}&program=${program}&session=${session}&semester=${semester}`,
  )
 
  return data
}
