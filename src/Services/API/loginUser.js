import axios from 'axios'

export const loginRequest = async loginDTO => {
  const { data } = await axios({
    url: 'http://localhost:6000/api/login',
    method: 'POST',
    data: loginDTO,
  })

  return data
}
