import axios from 'axios'
import { globals } from './config'

export const getData = (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  url = globals.host + url
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  return axios({
    method: type,
    url: url,
    data: data
  })
}