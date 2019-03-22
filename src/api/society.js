

import  { getData } from '@/basic/http/getData'

export const createSocietyApi = data => getData(`/society/create`, data, 'POST')

export const getSocietyList = data => getData(`/society/getAllSociety`, data, 'GET')

export const removeSocietyById = data => getData('/society/removeById',data,'POST')

export const editSocietyApi = data => getData('/society/editSociety',data,'POST')
