import axios from 'axios'

const apiUrl = 'https://viacep.com.br/ws/'

export const getCepApi = axios.create({
  baseURL: apiUrl,
})
