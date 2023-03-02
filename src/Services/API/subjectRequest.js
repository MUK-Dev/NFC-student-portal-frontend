import axios from 'axios'

export const getSubject = async (
  token,
  department,
  program,
  session,
  semester,
) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/subjects?department=${department}&program=${program}&session=${session}&semester=${semester}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
