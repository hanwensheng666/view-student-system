import  { getData } from '@/basic/http/getData'


export const  testHttp = data => getData('https://tjbapi.health.ikang.com/tjbapi/portal/index', data, 'GET')
