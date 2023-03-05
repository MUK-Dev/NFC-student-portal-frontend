import axios from 'axios'

export const getSessions = async (department, program) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/sessions?department=${department}&program=${program}`,
  )

  function compareByName(a, b) {
    return a.session_title.localeCompare(b.session_title)
  }
  data.sort(compareByName)

  return data
}
