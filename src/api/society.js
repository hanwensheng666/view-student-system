

import  { getData } from '@/basic/http/getData'

export const createSocietyApi = data => getData(`/society/create`, data, 'POST')

