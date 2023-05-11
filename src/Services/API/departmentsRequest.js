import axios from 'axios'

export const getDepartments = async () => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/departments`,
    method: 'GET',
  })

  function compareByName(a, b) {
    return a.department_name.localeCompare(b.department_name)
  }
  data.sort(compareByName)

  return data
}
