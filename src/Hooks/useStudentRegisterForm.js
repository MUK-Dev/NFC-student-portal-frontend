import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useStudentRegisterPage() {
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('@undergrad.nfciet.edu.pk');
  const sessionRef = useRef('');
  const programRef = useRef('');
  const rollNoRef = useRef('');
  const sectionRef = useRef('');
  const nameRef = useRef('');
  const phoneNoRef = useRef('');
  const passwordRef = useRef('');
  const confirmRef = useRef('');

  const emailDependents = useMemo(
    () => ({
      session: sessionRef.current.toLowerCase(),
      program: programRef.current.toLowerCase(),
      rollNo: rollNoRef.current.toLowerCase(),
    }),
    [sessionRef.current, programRef.current, rollNoRef.current]
  );

  const sendRequest = async () => {
    console.log(email);
    const d = {
      session: sessionRef.current.toLowerCase(),
      program: programRef.current.toLowerCase(),
      rollNo: rollNoRef.current.toLowerCase(),
      section: sectionRef.current.toLowerCase(),
      name: nameRef.current,
      phoneNo: phoneNoRef.current,
      gender: gender.toLowerCase(),
      department: department.toLowerCase(),
      password: passwordRef.current,
      confirm: confirmRef.current,
      email,
    };
    try {
      const { data } = await axios({
        url: 'http://localhost:6000/api/student/register',
        method: 'POST',
        data: d,
        withCredentials: true,
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setEmail(
      `${emailDependents.session}${emailDependents.program}${emailDependents.rollNo}@undergrad.nfciet.edu.pk`
    );
  }, [emailDependents]);

  return {
    nameRef,
    phoneNoRef,
    sessionRef,
    programRef,
    rollNoRef,
    sectionRef,
    gender,
    setGender,
    department,
    setDepartment,
    passwordRef,
    confirmRef,
    email,
    sendRequest,
  };
}
