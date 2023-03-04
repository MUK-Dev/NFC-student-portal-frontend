import axios from 'axios'

export const getPrograms = async department => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/programs?department=${department}`,
  )

  function compareByName(a, b) {
    return a.program_abbreviation.localeCompare(b.program_abbreviation)
  }
  data.sort(compareByName)

  return data
}
