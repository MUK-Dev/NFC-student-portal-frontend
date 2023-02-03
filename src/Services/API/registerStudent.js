import axios from 'axios'

export const registerStudentRequest = async registerDTO => {
  const { data } = await axios({
    url: 'http://localhost:6000/api/student/register',
    method: 'POST',
    data: registerDTO,
  })

  return data
}
