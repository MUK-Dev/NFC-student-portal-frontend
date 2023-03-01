import axios from 'axios'

export const getSections = async (department, program, session) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/sections?department=${department}&program=${program}&session=${session}`,
  )
  return data
}
