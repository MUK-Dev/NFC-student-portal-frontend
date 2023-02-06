import axios from 'axios'

export default function useRegisterDepartment() {
  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting },
  ) => {
    setSubmitting(true)
    const d = {
      department_name: values.name,
      department_abbreviation: values.abbreviation,
      no_of_programs: values.noOfPrograms,
      lat: values.lat,
      lng: values.lng,
      description: values.description,
    }
    try {
      const { data } = await axios({
        url: `${import.meta.env.VITE_API_URL}/departments`,
        method: 'POST',
        data: d,
      })
      setSubmitting(false)
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
