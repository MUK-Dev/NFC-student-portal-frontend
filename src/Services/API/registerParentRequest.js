import axios from 'axios'

export const registerParentRequest = async registerDTO => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/parent/register`,
    method: 'POST',
    data: registerDTO,
  })

  return data
}
