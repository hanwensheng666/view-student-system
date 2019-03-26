

import  { getData } from '@/basic/http/getData'

export const createActApi = data => getData(`/activity/create`, data, 'POST')

export const getAct = (socId,data) => getData(`/activity/getAct/${socId}`, data, 'GET')


export const deleteAct = data => getData(`/activity/delete`, data, 'POST')


export const editAct = data => getData(`/activity/editAct `, data, 'POST')


//活动报名
export const signIn = data => getData(`/activity/signUp`, data, 'POST')



//取消报名
export const signOut = data => getData(`/activity/signOut`, data, 'POST')



//获取活动列表，并返回是否报名
export const getAllActivityAndQuerySignIn = (socId,data) => getData(`/activity/getAllActivityAndQuerySignIn/${socId}`, data, 'GET')



//获取活动详情，并返回点赞和评论
export const getActDetial = (actId,data) => getData(`/activity/getActDetial/${actId}`, data, 'GET')



//点赞（取消点赞）活动
export const likeActById = (actId,data) => getData(`/activity/likeActById/${actId}`, data, 'GET')



//添加活动评论

export const addComment = data => getData(`/activity/addComment`, data, 'POST')
