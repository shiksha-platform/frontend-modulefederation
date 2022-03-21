import axios from 'axios'

export async function get(url: string, headers: any = {}) {
  return await axios.get(url, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' }
  })
}

export async function post(url: string, body: any, headers: any = {}) {
  return await axios.post(url, body, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' }
  })
}

export async function update(url: string, body: any, headers: any = {}) {
  return await axios.put(url, body, {
    ...headers,
    headers: { ...headers?.headers, 'Access-Control-Allow-Origin': '*' }
  })
}

//export async function distory(url:string, body:any) {}
