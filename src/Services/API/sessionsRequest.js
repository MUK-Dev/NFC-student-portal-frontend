import axios from 'axios'

export const getSessions = async (department, program) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/sessions?department=${department}&program=${program}`,
  )
  return data
}
