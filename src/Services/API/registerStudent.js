import axios from 'axios'

export const registerStudentRequest = async registerDTO => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/student/register`,
    method: 'POST',
    data: registerDTO,
  })

  return data
}
