
import  { getData } from '@/basic/http/getData'


export const getAllClassByGrade = (grade,data) => getData(`/class/getAllClassByGrade/${grade}`, data, 'GET')
