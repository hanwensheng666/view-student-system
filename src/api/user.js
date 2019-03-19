import  { getData } from '@/basic/http/getData'


export const login = data => getData('/user/login', data, 'POST')


export const getStudentByClass = (classId,data) => getData(`/user/getStudentByClass/${classId}`, data, 'GET')
