
import  { getData } from '@/basic/http/getData'


export const getSign = data => getData('/upload/getSign', data, 'GET')


export const uploadImage = data => getData('/upload/uploadImage', data, 'POST')


export const deleteResource = data => getData('/upload/deleteResource', data, 'POST')