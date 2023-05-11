import axios from 'axios'

export const loginRequest = async loginDTO => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/login`,
    method: 'POST',
    data: loginDTO,
  })

  return data
}
