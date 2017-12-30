import axios from 'axios'
export const getData = () => { // Make a request for a user with a given ID
  return axios.get('http://localhost:9090/comments/1')
}