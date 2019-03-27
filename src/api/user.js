import  { getData } from '@/basic/http/getData'


export const regist = data => getData('/user/regist', data, 'POST')


export const login = data => getData('/user/login', data, 'POST')


export const getStudentByClass = (classId,data) => getData(`/user/getStudentByClass/${classId}`, data, 'GET')


export const removeStudentById = (id,data) => getData(`/user/removeStudentById/${id}`,data,'POST')


export const modifyStudent = data => getData(`/user/modifyStudent`,data,'POST')


export const getUserInfo = data => getData(`/user/getUserInfo`,data,'GET')

