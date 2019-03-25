

import  { getData } from '@/basic/http/getData'

export const createActApi = data => getData(`/activity/create`, data, 'POST')
