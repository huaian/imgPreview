import axios from 'axios'
export const getData = () => { // Make a request for a user with a given ID
  return axios.get('http://localhost:3000/histories/1')
}