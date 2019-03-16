import  { getData } from '@/basic/http/getData'


export const login = data => getData('/user/login', data, 'POST')
