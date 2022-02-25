import axios from "axios";

const Logout = (e) => {
  sessionStorage.setItem("token", null);
};

export async function get(url, headers:any = {}) {
  return await axios.get(url, {
    ...headers,
    headers: { ...headers?.headers, "Access-Control-Allow-Origin": "*" },
  });
}

export async function post(url, body, headers:any = {}) {
  return await axios.post(url, body, {
    ...headers,
    headers: { ...headers?.headers, "Access-Control-Allow-Origin": "*" },
  });
}

export async function update(url, body, headers:any = {}) {
  return await axios.put(url, body, {
    ...headers,
    headers: { ...headers?.headers, "Access-Control-Allow-Origin": "*" },
  });
}

export async function distory(url, body) {}
