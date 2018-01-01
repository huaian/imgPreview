import Vue from 'vue'
import axios from 'axios'
export const historiesResource = {
  get: ({
    id
  }) => { // 获取列表|某项
    return axios.get('http://localhost:3000/histories')
  },
  delete: ({
    id
  }) => { // 删除
    return axios.delete('http://localhost:3000/histories/' + id)
  },
  add: ({
    id,
    data
  }) => {
    if (id) { // 更新
      return axios.put('http://localhost:3000/histories/' + id, data)
    } else { // 新增
      return axios.post('http://localhost:3000/histories', data)
    }
  }
}
