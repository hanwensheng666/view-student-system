

import  { getData } from '@/basic/http/getData'

export const createActApi = data => getData(`/activity/create`, data, 'POST')

export const getAct = (socId,data) => getData(`/activity/getAct/${socId}`, data, 'GET')
export const deleteAct = (data) => getData(`/activity/delete`, data, 'POST')
export const editAct = (data) => getData(`/activity/editAct `, data, 'POST')


